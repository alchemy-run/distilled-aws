/**
 * Generic REST protocol factory for simple bearer/header-auth JSON APIs
 * (Neon, Fly.io, PlanetScale, Supabase, Turso, …).
 *
 * `makeRestProtocol(options)` builds a core {@link API.Protocol} layer:
 *
 *   request:  credentials resolved from the CALLING fiber's context on every
 *             request (the layer itself is memoized per process — see
 *             `core/api`), auth headers + base URL from the provider's
 *             options, request built by `buildRequest` from
 *             `core/protocol-http` (deep-unwrapping any `Redacted` input
 *             values first)
 *
 *   response: 2xx JSON → optional `transformResponse` → recursive wire→TS
 *             key mapping (`mapKeys`) → `Redacted` wrapping of members
 *             marked with {@link SensitiveValue}; non-2xx → typed error:
 *             per-op matcher classes (`matchTypedError`), then the status
 *             map (default `HTTP_STATUS_MAP`), then an `InternalServerError`
 *             for unmapped 5xx, then the provider's `unknownError` fallback
 *             — with `retryAfter` durations stamped from the standard hint
 *             headers on retryable statuses.
 *
 * Anything provider-specific (envelope quirks, bespoke error codes) belongs
 * in the provider package — via these options or a hand-written protocol.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as API from "./api.ts";
import { makeAnnotation } from "./trait.ts";
import {
  buildRequest,
  getPropAnn,
  getProps,
  isOpaqueValue,
  mapKeys,
  matchTypedError,
  resolveNode,
} from "./protocol-http.ts";
import { HTTP_STATUS_MAP, InternalServerError } from "./errors.ts";
import { parseRetryAfterForStatus } from "./retry-after.ts";

// =============================================================================
// Traits
// =============================================================================

export const sensitiveValueSymbol = Symbol.for(
  "@distilled.cloud/core/sensitive-value",
);
/**
 * Marks a string member as sensitive (mirrors `smithy.api#sensitive`).
 * The REST protocol wraps decoded values in `Redacted` on the way out and
 * accepts `string | Redacted<string>` on the way in (unwrapped before
 * serialization). Takes an ignored argument so generators can inline the
 * smithy trait value (`T.SensitiveValue({})`).
 */
export const SensitiveValue = (_value?: unknown) =>
  makeAnnotation(sensitiveValueSymbol, true);

export const rawResponseSymbol = Symbol.for(
  "@distilled.cloud/core/raw-response",
);
/**
 * Marks the sole output member that carries a bare (array/scalar) response
 * body (mirrors `com.distilled.openapi#rawResponse`).
 */
export const RawResponse = (_value?: unknown) =>
  makeAnnotation(rawResponseSymbol, true);

export const rawResponseRootSymbol = Symbol.for(
  "@distilled.cloud/core/raw-response-root",
);
/**
 * Marks a response schema whose ENTIRE value is the response body (the
 * generator's `rootPipe` for synthesized bare-payload wrappers): the emitted
 * response type IS the payload type and the protocol returns the mapped body
 * directly.
 */
export const RawResponseRoot = () =>
  makeAnnotation(rawResponseRootSymbol, true);

// =============================================================================
// Value helpers
// =============================================================================

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  v !== null &&
  typeof v === "object" &&
  !Array.isArray(v) &&
  !isOpaqueValue(v) &&
  (Object.getPrototypeOf(v) === Object.prototype ||
    Object.getPrototypeOf(v) === null);

/**
 * Deep-unwrap `Redacted` values in an input (plain objects/arrays only —
 * class instances, files, and binary payloads pass through untouched).
 * Sensitive input members accept `string | Redacted<string>`; the wire wants
 * the raw string.
 */
export const unwrapRedactedDeep = (value: unknown): unknown => {
  if (Redacted.isRedacted(value)) return Redacted.value(value);
  if (Array.isArray(value)) return value.map(unwrapRedactedDeep);
  if (isPlainObject(value)) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue;
      out[k] = unwrapRedactedDeep(v);
    }
    return out;
  }
  return value;
};

/**
 * Walk a decoded (TS-named) value alongside its schema AST, wrapping members
 * marked {@link SensitiveValue} in `Redacted`. Keys the schema doesn't model
 * pass through verbatim.
 */
export const wrapSensitive = (ast: AST.AST, value: unknown): unknown => {
  if (value === null || typeof value !== "object" || isOpaqueValue(value)) {
    return value;
  }
  const node = resolveNode(ast);
  if (node._tag === "Arrays") {
    if (!Array.isArray(value)) return value;
    const elem = (node as any).rest?.[0] as AST.AST | undefined;
    return elem ? value.map((v) => wrapSensitive(elem, v)) : value;
  }
  if (node._tag === "Objects" && !Array.isArray(value)) {
    const props = getProps(node);
    if (props.length === 0) return value;
    const byName = new Map(props.map((p) => [String(p.name), p]));
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (v === undefined) continue;
      const prop = byName.get(k);
      if (!prop) {
        out[k] = v;
      } else if (
        getPropAnn(prop, sensitiveValueSymbol) !== undefined &&
        typeof v === "string"
      ) {
        out[k] = Redacted.make(v);
      } else {
        out[k] = wrapSensitive(prop.type, v);
      }
    }
    return out;
  }
  return value;
};

// =============================================================================
// Protocol factory
// =============================================================================

/** What the wire said about a failure, for the `unknownError` fallback. */
export interface RestErrorInfo {
  readonly status: number;
  /** Error code from the envelope (services vary between string and number). */
  readonly code?: string | number;
  readonly message: string;
  /** Parsed JSON body, or the raw text when the body wasn't JSON. */
  readonly body: unknown;
  readonly headers: Record<string, string | undefined>;
}

export interface RestErrorEnvelope {
  readonly code?: string | number;
  readonly message?: string;
}

export interface RestProtocolOptions<C> {
  /**
   * Resolve credentials ON THE CALLING FIBER — evaluated per request, never
   * at layer build time, so context-provided credentials and token refreshes
   * are picked up. Typically `Effect.gen(function* () { const resolve =
   * yield* Credentials; return yield* resolve; })` for the distilled
   * credentials-service convention. Its error/requirement channels are
   * erased at the protocol boundary (Protocol effects carry none) and
   * reintroduced for callers by the generated `<Sdk>OpError` /
   * `<Sdk>OpContext` annotations.
   */
  readonly credentials: Effect.Effect<C, any, any>;
  /** API base URL from the resolved credentials. */
  readonly baseUrl: (credentials: C) => string;
  /** Auth (and any fixed) headers from the resolved credentials. */
  readonly headers: (credentials: C) => Record<string, string>;
  /**
   * Extract `{ code?, message? }` from a parsed non-2xx JSON body. Default:
   * lenient `{ code?, message? | error? }` (covers the common REST error
   * envelopes).
   */
  readonly errorEnvelope?: (body: unknown) => RestErrorEnvelope | undefined;
  /**
   * HTTP status → error class constructed as `new Cls({ message, retryAfter
   * })`. Default: core `HTTP_STATUS_MAP`. Consulted after per-op typed error
   * matching; unmapped 5xx fall back to `InternalServerError`, everything
   * else to {@link unknownError}.
   */
  readonly statusMap?: Readonly<Record<number, new (args: any) => any>>;
  /** Fallback error for failures nothing else matched. */
  readonly unknownError: (info: RestErrorInfo) => unknown;
  /** Transform the parsed 2xx JSON before decoding (e.g. stripNulls). */
  readonly transformResponse?: (body: unknown) => unknown;
  /** Passed through to `buildRequest` (member-header transforms). */
  readonly mapMemberHeader?: (name: string, value: string) => string;
  /** Passed through to `buildRequest` (wire names for unmodeled input keys). */
  readonly unknownKeyToWire?: (key: string) => string;
}

const defaultErrorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const code =
    typeof b.code === "string" || typeof b.code === "number"
      ? b.code
      : undefined;
  const message =
    typeof b.message === "string"
      ? b.message
      : typeof b.error === "string"
        ? b.error
        : undefined;
  return { code, message };
};

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel),
// but REST failures are real typed errors that operations re-surface via
// their `errors: [...]` lists. Fail with the instance and erase the type
// here; the generated operation annotations reintroduce it for callers.
const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

/**
 * Build a `Layer<Protocol>` for a simple REST JSON API. Assign the result to
 * a module-level const in the provider's `protocol.ts` — `API.make` memoizes
 * protocol layers by value identity.
 */
export const makeRestProtocol = <C>(
  options: RestProtocolOptions<C>,
): Layer.Layer<API.Protocol> => {
  const errorEnvelope = options.errorEnvelope ?? defaultErrorEnvelope;
  const statusMap: Readonly<
    Record<number, (new (args: any) => any) | undefined>
  > = options.statusMap ?? HTTP_STATUS_MAP;

  const encode = ({
    input,
    inputAst,
  }: {
    readonly input: unknown;
    readonly inputAst: AST.AST;
  }) =>
    Effect.gen(function* () {
      const creds = yield* options.credentials as Effect.Effect<C>;
      return buildRequest({
        input: unwrapRedactedDeep(input),
        inputAst,
        baseUrl: options.baseUrl(creds),
        headers: options.headers(creds),
        mapMemberHeader: options.mapMemberHeader,
        unknownKeyToWire: options.unknownKeyToWire,
      });
    });

  const decode = ({
    response,
    outputAst,
    errors: errorClasses,
  }: {
    readonly response: HttpClientResponse.HttpClientResponse;
    readonly outputAst: AST.AST;
    readonly errors: ReadonlyArray<unknown>;
  }) =>
    Effect.gen(function* () {
      // Read as text and parse tolerantly — error pages are often non-JSON.
      const text = (yield* response.text.pipe(Effect.orDie)) ?? "";
      if (process.env.DISTILLED_DEBUG_HTTP) {
        console.error(
          `[distilled] <- ${response.status} ${text.slice(0, 400)}`,
        );
      }
      let json: unknown;
      let nonJson = false;
      if (text.trim().length > 0) {
        try {
          json = JSON.parse(text);
        } catch {
          nonJson = true;
        }
      }
      const status = response.status;
      const headers = response.headers as Record<string, string | undefined>;

      if (status >= 400) {
        const env = (nonJson ? undefined : errorEnvelope(json)) ?? {};
        const message =
          env.message ??
          (nonJson && text.trim() ? text.trim() : `HTTP ${status}`);

        // 1. Per-operation typed error (matcher metadata on the class).
        const typed = matchTypedError(errorClasses, status, [
          {
            code: typeof env.code === "number" ? env.code : undefined,
            message,
          },
        ]);
        if (typed !== undefined) return yield* fail(typed);

        // 2. Status-mapped class (retryAfter only stamps on retryable
        //    statuses — parseRetryAfterForStatus gates on that).
        const StatusErrorClass = statusMap[status];
        if (StatusErrorClass) {
          return yield* fail(
            new StatusErrorClass({
              message,
              retryAfter: parseRetryAfterForStatus(status, headers),
            }),
          );
        }

        // 3. Unmapped 5xx (e.g. proxy-specific statuses) → retryable server
        //    error rather than the unknown fallback.
        if (status >= 500) {
          return yield* fail(
            new InternalServerError({
              message,
              retryAfter: parseRetryAfterForStatus(status, headers),
            }),
          );
        }

        // 4. Provider fallback.
        return yield* fail(
          options.unknownError({
            status,
            code: env.code,
            message,
            body: nonJson ? text : json,
            headers,
          }),
        );
      }

      // 2xx: the response body IS the payload (no envelope). Wire→TS key
      // mapping is schema-driven; `RawResponseRoot` responses are the body
      // verbatim (mapKeys handles arrays/scalars structurally either way).
      let body: unknown = nonJson ? text : (json ?? {});
      if (options.transformResponse) body = options.transformResponse(body);
      return wrapSensitive(outputAst, mapKeys(outputAst, body, "decode"));
    });

  return Layer.succeed(
    API.Protocol,
    API.Protocol.of({
      // Erase encode's credentials requirement (resolved on the calling
      // fiber; see RestProtocolOptions.credentials).
      encode: (args) =>
        encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
      decode,
    }),
  );
};
