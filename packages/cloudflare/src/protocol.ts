/**
 * CloudflareProtocol — hand-written.
 *
 * Speaks Cloudflare's client-v4 JSON protocol. The generic request/response
 * machinery (trait-driven request building, recursive wire-name mapping,
 * typed-error matcher evaluation) lives in
 * `@distilled.cloud/core/protocol-http`; this module supplies what is
 * Cloudflare's own:
 *
 *   request:  credentials → auth headers + API base URL, the Bearer-prefix
 *             quirk for member-supplied Authorization headers, snake_case
 *             wire names for unknown input keys
 *
 *   response: { success, errors, messages, result, result_info }
 *             • success:false / non-2xx → typed error, matched like the
 *               distilled cloudflare client (per-op matchers, global error
 *               codes, throttling, HTTP status, unknown fallback)
 *             • result (the payload) → mapped onto the output schema:
 *                 EnvelopePayload()  → receives the whole `result`
 *                 Header(name?)      → read from a response header
 *                 ResponseCode()     → the HTTP status code
 *                 (otherwise)        → result.<field>
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as AST from "effect/SchemaAST";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as API from "@distilled.cloud/core/api";
import {
  bodySymbol,
  headerSymbol,
  keyDictionarySymbol,
  responseCodeSymbol,
} from "@distilled.cloud/core/trait";
import {
  buildRequest,
  getAnn,
  getProps,
  hasPropAnn,
  mapKeys,
  matchTypedError,
  nameOf,
} from "@distilled.cloud/core/protocol-http";
import { retryableKey } from "@distilled.cloud/core/category";
import {
  ConfigError,
  Forbidden,
  GatewayTimeout,
  HTTP_STATUS_MAP,
  InternalServerError,
  TooManyRequests,
  Unauthorized,
} from "@distilled.cloud/core/errors";
import {
  parseRetryAfterForStatus,
  parseServerRetryHint,
} from "@distilled.cloud/core/retry-after";
import {
  Credentials,
  formatHeaders,
  type OAuthRefreshError,
  type ResolvedCredentials,
} from "./credentials.ts";
import {
  type CloudflareError,
  CloudflareHttpError,
  type CloudflareRateLimited,
  type DefaultErrors,
  InvalidRoute,
  UnknownCloudflareError,
} from "./errors.ts";
import {
  binaryResponseBodySymbol,
  envelopePayloadRootSymbol,
  envelopePayloadSymbol,
  resultInfoSymbol,
} from "./traits.ts";

/**
 * Error channel shared by every generated Cloudflare operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * CloudflareOpError, CloudflareOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type CloudflareOpError =
  | DefaultErrors
  | ConfigError
  | OAuthRefreshError
  // Injected into every generated operation's `errors: [...]` list by the
  // codegen (`operationDecl.commonErrorClasses`), so they belong in the
  // declared union too — otherwise each operation's type claims it can't
  // fail the two ways every operation can.
  | CloudflareError
  | CloudflareRateLimited
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Cloudflare operation. */
export type CloudflareOpContext = Credentials | HttpClient.HttpClient;

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel), but
// Cloudflare failures are real typed errors that an operation re-surfaces via
// its `errors: [...]` list. Fail with the instance and erase the error type
// here; `API.make`'s signature reintroduces it for callers.
const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

/**
 * Mark an error instance retryable regardless of its class categories —
 * used for dual-use Cloudflare codes whose transient variant is only
 * identifiable from the message.
 */
const tagRetryable = <E>(error: E): E => {
  (error as Record<string, unknown>)[retryableKey] = {};
  return error;
};

const GLOBAL_RATE_LIMIT_MESSAGE =
  /\b(rate ?limit(ed|ing)?|throttl(ed|ing) your request)\b/i;

/**
 * Cloudflare error codes that map to global/default errors regardless of
 * operation — infrastructure-level errors that can occur on any endpoint.
 * Transcribed from the distilled cloudflare client.
 */
const GLOBAL_ERROR_CODE_MAP: Record<
  number,
  (message: string, headers?: Record<string, string | undefined>) => unknown
> = {
  // "Please wait and consider throttling your request speed" — returned
  // inside envelopes with arbitrary HTTP status (often 200).
  971: (message, headers) =>
    new TooManyRequests({
      message,
      retryAfter: parseServerRetryHint(headers),
    }),
  // Authentication-related codes — Cloudflare frequently returns these
  // inside a 400/403 envelope rather than 401.
  6003: (message) => new Unauthorized({ message }),
  9103: (message) => new Unauthorized({ message }),
  9106: (message) => new Unauthorized({ message }),
  9109: (message) => new Unauthorized({ message }),
  // "Authentication error" is tagged retryable: under high request
  // concurrency Cloudflare intermittently rejects valid, long-lived tokens
  // with this message (the same call against the same zone succeeds in
  // isolation — verified in alchemy's provider suite, which previously
  // carried this as a custom retry predicate). A genuinely invalid token
  // produces the same message persistently, but the default retry policy is
  // bounded, so it still fails within seconds of backoff instead of looping;
  // the win is that valid tokens stop flaking under load.
  10000: (message) => {
    const error = new Unauthorized({ message });
    return /authentication error/i.test(message) ? tagRetryable(error) : error;
  },
  // Dual-use: "Method not allowed for token" is a real permission denial
  // (NOT retryable); "internal error" is a CF hiccup mistagged as 403, and
  // "Unable to authenticate request" is a transient auth/edge blip against
  // otherwise-valid credentials (real credential problems surface as code
  // 10000 instead) — those two variants are tagged retryable.
  10001: (message) => {
    const error = new Forbidden({ message });
    return /internal error|unable to authenticate request/i.test(message)
      ? tagRetryable(error)
      : error;
  },
  // "Invalid request: invalid route" — a path component (typically
  // accountId/zoneId) doesn't resolve to a real resource.
  7003: (message) => new InvalidRoute({ code: 7003, message }),
  // Dual-use code 1000: several unrelated conditions, each unambiguous from
  // the message.
  1000: (message) => {
    if (/\btimeout\b/i.test(message)) {
      return new GatewayTimeout({ message });
    }
    if (/internal (server )?error/i.test(message)) {
      return new InternalServerError({ message });
    }
    return new UnknownCloudflareError({ code: 1000, message });
  },
};

/**
 * Typed error for an HTTP status: the mapped class when one exists (with
 * retry categories for 5xx), InternalServerError for unmapped 5xx (e.g.
 * Cloudflare-specific 520-530), CloudflareHttpError otherwise.
 */
const httpStatusError = (
  status: number,
  body?: string,
  headers?: Record<string, string | undefined>,
): unknown => {
  const ErrorClass = HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
  const message = body ?? String(status);
  if (ErrorClass) {
    return new ErrorClass({
      message,
      retryAfter: parseRetryAfterForStatus(status, headers),
    } as any);
  }
  if (status >= 500) {
    return new InternalServerError({
      message,
      retryAfter: parseRetryAfterForStatus(status, headers),
    });
  }
  return new CloudflareHttpError({
    status,
    statusText: String(status),
    body: message,
    message,
  });
};

/** Callers write camelCase; Cloudflare's wire is snake_case. */
const camelToSnake = (key: string): string =>
  key.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();

/**
 * A member-supplied Authorization header (e.g. the asset-upload session JWT)
 * is a raw token — Bearer-prefix it like distilled's request transform does.
 */
const bearerPrefixAuthorization = (name: string, value: string): string =>
  name === "authorization" && !/^Bearer\s/i.test(value)
    ? `Bearer ${value}`
    : value;

// The protocol layer is memoized per process by `API.make` (see
// `OperationConfig.protocol`), so the build must not capture credentials —
// `encode` resolves Credentials from the calling fiber's context on
// every request instead. Like the error channel above, the requirement is
// erased at this boundary (Protocol effects are typed with no requirements)
// and reintroduced for callers by the generated `CloudflareOpContext`
// annotations.
const encode = ({
  input,
  inputAst,
}: {
  readonly input: unknown;
  readonly inputAst: AST.AST;
}) =>
  Effect.gen(function* () {
    // The Credentials service holds an effect — resolving it here (per
    // request) picks up token refreshes. Its ConfigError/OAuthRefreshError
    // channel is erased at this boundary like the rest of encode's
    // requirements; CloudflareOpError reintroduces it for callers.
    const resolveCredentials = yield* Credentials;
    const creds =
      yield* resolveCredentials as Effect.Effect<ResolvedCredentials>;
    return buildRequest({
      input,
      inputAst,
      baseUrl: creds.apiBaseUrl,
      headers: formatHeaders(creds),
      mapMemberHeader: bearerPrefixAuthorization,
      unknownKeyToWire: camelToSnake,
    });
  });

/** Shallow-camelCase the keys of the envelope's `result_info` block. */
const camelizeKeys = (v: unknown): unknown => {
  if (v === null || typeof v !== "object" || Array.isArray(v)) return v;
  return Object.fromEntries(
    Object.entries(v).map(([k, val]) => [
      k.replace(/_+([a-z0-9])/gi, (_, c: string) => c.toUpperCase()),
      val,
    ]),
  );
};

/**
 * Whether an output member's AST expects a number — used to convert
 * header-projected values (headers arrive as strings; e.g.
 * `content-length`).
 */
const wantsNumber = (ast: AST.AST): boolean =>
  ast._tag === "Number" ||
  (ast._tag === "Union" &&
    (ast as { types?: readonly AST.AST[] }).types?.some(wantsNumber) === true);

/**
 * Build a decode implementation. `resultInfo: true` (the paginated protocol)
 * additionally maps the envelope's top-level `result_info` onto the output
 * member marked with `T.ResultInfo()`, camelCased.
 */
const makeDecode =
  (options: { readonly resultInfo: boolean }) =>
  ({
    response,
    outputAst,
    errors: errorClasses,
  }: {
    readonly response: HttpClientResponse.HttpClientResponse;
    readonly outputAst: AST.AST;
    readonly errors: ReadonlyArray<unknown>;
  }) =>
    Effect.gen(function* () {
      // Raw binary response: when an output member carries
      // `BinaryResponseBody()`, a successful response is decoded from the
      // response headers plus the body as a lazy byte stream — the body is
      // never consumed as text. Error statuses (JSON envelopes) fall
      // through to the normal path below.
      if (response.status < 400) {
        const props = getProps(outputAst);
        const binary = props.find((p) =>
          hasPropAnn(p, binaryResponseBodySymbol),
        );
        if (binary !== undefined) {
          const result: Record<string, unknown> = {};
          for (const prop of props) {
            const key = String(prop.name);
            if (prop === binary) {
              result[key] = response.stream;
            } else if (hasPropAnn(prop, headerSymbol)) {
              const v =
                response.headers[nameOf(prop, headerSymbol).toLowerCase()];
              if (v !== undefined) {
                result[key] = wantsNumber(prop.type) ? Number(v) : v;
              }
            } else if (hasPropAnn(prop, responseCodeSymbol)) {
              result[key] = response.status;
            }
          }
          return result;
        }
      }

      // Read as text and parse tolerantly — Cloudflare answers some errors
      // (HTML 5xx pages, bare plain-text 4xx) with non-JSON bodies.
      const text = (yield* response.text.pipe(Effect.orDie)) ?? "";
      if (process.env.DISTILLED_DEBUG_HTTP) {
        console.error(
          `[distilled] <- ${response.status} ${text.slice(0, 400)}`,
        );
      }
      let json: Record<string, unknown> = {};
      let nonJson = false;
      if (text.trim().length > 0) {
        try {
          const parsed = JSON.parse(text);
          if (parsed !== null && typeof parsed === "object") {
            json = parsed as Record<string, unknown>;
          } else {
            nonJson = true;
          }
        } catch {
          nonJson = true;
        }
      }
      const status = response.status;
      const headers = response.headers as Record<string, string | undefined>;

      // Error envelope or non-2xx → typed error, matched like the distilled
      // cloudflare client: per-operation matchers, then global error codes,
      // then throttling, then HTTP-status classes, then the unknown fallback.
      const failed = status >= 400 || (!nonJson && json.success === false);
      if (failed) {
        const rawErrors =
          !nonJson && Array.isArray(json.errors) ? json.errors : [];
        const first = rawErrors[0] as
          | { code?: number; message?: string }
          | undefined;
        // Cloudflare sometimes omits the code entirely (e.g. webhook errors);
        // treat missing code as 0 so `{ code: 0 }` matchers can match.
        const errorCode = first
          ? typeof first.code === "number"
            ? first.code
            : 0
          : undefined;
        const errorMessage = nonJson
          ? text
          : (first?.message ?? `HTTP ${status}`);

        // Transient auth blips must be tagged retryable on EVERY error path,
        // including per-operation typed errors — an op-declared class with a
        // status/code matcher (e.g. a plain Forbidden) otherwise intercepts
        // the blip before the global map's tagging and the retry policy never
        // sees it. Message evidence (see GLOBAL_ERROR_CODE_MAP for the field
        // history): "Authentication error" (code 10000 family, valid tokens
        // flake under concurrency), "Unable to authenticate request" and the
        // code-10001 "internal error" variant (auth/edge hiccups).
        const isTransientAuthBlip =
          /authentication error|unable to authenticate request/i.test(
            errorMessage,
          ) ||
          (errorCode === 10001 && /internal error/i.test(errorMessage));
        const tagBlip = <E>(error: E): E =>
          isTransientAuthBlip ? tagRetryable(error) : error;

        // 1. Per-operation typed error (matcher metadata on the class).
        const typed = matchTypedError(errorClasses, status, [
          { code: errorCode, message: errorMessage },
        ]);
        if (typed !== undefined) {
          return yield* Effect.fail(tagBlip(typed)) as Effect.Effect<never>;
        }

        // 2. Global/infrastructure error codes (any endpoint, any status).
        if (errorCode !== undefined && errorCode in GLOBAL_ERROR_CODE_MAP) {
          return yield* fail(
            tagBlip(GLOBAL_ERROR_CODE_MAP[errorCode]!(errorMessage, headers)),
          );
        }

        // 3. Throttling — 429 or the global rate-limit message (Cloudflare
        // returns it inside envelopes with arbitrary HTTP status, often 200).
        if (status === 429 || GLOBAL_RATE_LIMIT_MESSAGE.test(errorMessage)) {
          return yield* fail(
            new TooManyRequests({
              message: errorMessage,
              retryAfter: parseServerRetryHint(headers),
            }),
          );
        }

        // 4. HTTP-status classes (4xx) / retryable 5xx.
        if (status >= 400 && status < 500) {
          const StatusErrorClass =
            HTTP_STATUS_MAP[status as keyof typeof HTTP_STATUS_MAP];
          if (StatusErrorClass) {
            return yield* fail(
              tagBlip(
                new StatusErrorClass({
                  message: errorMessage,
                  retryAfter: parseRetryAfterForStatus(status, headers),
                } as any),
              ),
            );
          }
        }
        if (status >= 500) {
          return yield* fail(httpStatusError(status, errorMessage, headers));
        }

        // 5. Unknown envelope error.
        return yield* fail(
          new UnknownCloudflareError({
            code: errorCode,
            message: errorMessage,
          }),
        );
      }

      if (nonJson) json = {};

      // Unwrap the envelope: the payload is `result` (fall back to the whole
      // body for the handful of endpoints that don't use the envelope). A
      // successful non-JSON body is the payload verbatim — e.g. the
      // security.txt GET answers an unconfigured zone with a bare non-JSON
      // sentinel that callers detect by `typeof === "string"`.
      const payload = (
        nonJson ? text : "result" in json ? json.result : json
      ) as Record<string, unknown> | unknown;
      const rootDict = getAnn(outputAst, keyDictionarySymbol) as
        | Record<string, string>
        | undefined;

      // Bare-payload response: the whole value IS the envelope's `result`
      // (array/scalar), returned directly rather than wrapped in a struct.
      if (getAnn(outputAst, envelopePayloadRootSymbol) !== undefined) {
        return mapKeys(outputAst, payload, "decode", rootDict);
      }

      const result: Record<string, unknown> = {};

      for (const prop of getProps(outputAst)) {
        const key = String(prop.name);
        if (options.resultInfo && hasPropAnn(prop, resultInfoSymbol)) {
          if (json.result_info !== undefined) {
            result[key] = camelizeKeys(json.result_info);
          }
        } else if (hasPropAnn(prop, envelopePayloadSymbol)) {
          result[key] = mapKeys(prop.type, payload, "decode", rootDict);
        } else if (hasPropAnn(prop, headerSymbol)) {
          const v = response.headers[nameOf(prop, headerSymbol).toLowerCase()];
          if (v !== undefined) result[key] = v;
        } else if (hasPropAnn(prop, responseCodeSymbol)) {
          result[key] = response.status;
        } else {
          // The schema's own wire name first; fall back to the service key
          // dictionary (mined from the distilled SDK) — the docs sometimes
          // document a field under a name the live wire doesn't use (e.g. R2
          // event notifications document `queueId` but the wire sends
          // `queue`), and the dictionary carries the real mapping.
          const wire = nameOf(prop, bodySymbol);
          const dictWire = rootDict?.[key];
          const src =
            payload && typeof payload === "object"
              ? wire in payload
                ? wire
                : dictWire !== undefined && dictWire in payload
                  ? dictWire
                  : undefined
              : undefined;
          if (src !== undefined) {
            result[key] = mapKeys(
              prop.type,
              (payload as Record<string, unknown>)[src],
              "decode",
              rootDict,
            );
          }
        }
      }
      return result;
    });

export const CloudflareProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    // Erase encode's Credentials requirement (see comment above).
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode: makeDecode({ resultInfo: false }),
  }),
);

/**
 * Protocol for paginated operations: identical to {@link CloudflareProtocol}
 * except the envelope's top-level `result_info` is kept on the response (as
 * the member marked `T.ResultInfo()`, camelCased) so `.pages()` / `.items()`
 * can advance and callers can read totals.
 */
export const CloudflarePaginatedProtocol: Layer.Layer<API.Protocol> =
  Layer.succeed(
    API.Protocol,
    API.Protocol.of({
      encode: (args) =>
        encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
      decode: makeDecode({ resultInfo: true }),
    }),
  );
