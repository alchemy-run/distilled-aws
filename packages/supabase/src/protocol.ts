/**
 * SupabaseProtocol — hand-written.
 *
 * Speaks the Supabase Management API's plain-JSON REST protocol. This is
 * `core/protocol-rest`'s bearer-REST behavior with two Supabase error quirks
 * the factory's hooks can't express (both ported from the distilled v0
 * client, which tests rely on):
 *
 *   1. message substring "active free projects" → FreeProjectLimitReached
 *      (quota error), checked BEFORE any status mapping so callers can react
 *      to the free-tier active-project ceiling as a typed error;
 *   2. status 406 is remapped to 404/NotFound before per-op matcher and
 *      status-map evaluation (snippets return 406 for not-found).
 *
 * Everything else mirrors `makeRestProtocol`:
 *
 *   request:  credentials resolved from the calling fiber per request →
 *             `Authorization: Bearer <accessToken>` + API base URL (default
 *             `https://api.supabase.com`), `Redacted` input values deep-
 *             unwrapped, request built by `buildRequest`
 *
 *   response: no envelope — 2xx bodies decode directly against the output
 *             schema (wire→TS via `mapKeys`, sensitive members wrapped in
 *             `Redacted`); non-2xx → typed error: per-op matcher classes,
 *             core HTTP_STATUS_MAP (retryAfter honored), InternalServerError
 *             for unmapped 5xx, UnknownSupabaseError fallback.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import type * as AST from "effect/SchemaAST";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
import * as HttpClientRequestModule from "effect/unstable/http/HttpClientRequest";
import * as API from "@distilled.cloud/core/api";
import { httpSymbol, type HttpTrait } from "@distilled.cloud/core/trait";
import {
  buildRequest,
  getAnn,
  mapKeys,
  matchTypedError,
} from "@distilled.cloud/core/protocol-http";
import {
  unwrapRedactedDeep,
  wrapSensitive,
} from "@distilled.cloud/core/protocol-rest";
import {
  type ConfigError,
  HTTP_STATUS_MAP,
  InternalServerError,
} from "@distilled.cloud/core/errors";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { Credentials, formatHeaders, type Config } from "./credentials.ts";
import {
  type DefaultErrors,
  FreeProjectLimitReached,
  UnknownSupabaseError,
} from "./errors.ts";

/**
 * Error channel shared by every generated Supabase operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * SupabaseOpError, SupabaseOpContext>` explicitly so the compiler never
 * infers these back out of the schema generics.
 */
export type SupabaseOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Supabase operation. */
export type SupabaseOpContext = Credentials | HttpClient.HttpClient;

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel), but
// Supabase failures are real typed errors that an operation re-surfaces via
// its `errors: [...]` list. Fail with the instance and erase the error type
// here; `API.make`'s signature reintroduces it for callers.
const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

// The protocol layer is memoized per process by `API.make` (see
// `OperationConfig.protocol`), so the build must not capture credentials —
// `encode` resolves Credentials from the calling fiber's context on every
// request instead. Like the error channel above, the requirement is erased
// at this boundary (Protocol effects are typed with no requirements) and
// reintroduced for callers by the generated `SupabaseOpContext` annotations.
/**
 * Re-encode a JSON request body as `application/x-www-form-urlencoded`.
 * `buildRequest` understands `multipart` but leaves other non-JSON
 * encodings to the provider protocol — Supabase's OAuth token exchange
 * (`POST /v1/oauth/token`) takes a urlencoded form (v0 parity: the same
 * op carried `contentType: "form-urlencoded"` there too).
 */
const toUrlEncodedBody = (
  request: HttpClientRequest.HttpClientRequest,
): HttpClientRequest.HttpClientRequest => {
  const body = request.body as {
    readonly _tag: string;
    readonly body?: unknown;
    readonly contentType?: string;
  };
  if (body._tag !== "Uint8Array" || !/json/i.test(body.contentType ?? "")) {
    return request;
  }
  const parsed = JSON.parse(
    new TextDecoder().decode(body.body as Uint8Array),
  ) as Record<string, unknown>;
  const entries: Array<[string, string]> = [];
  for (const [k, v] of Object.entries(parsed)) {
    if (v === undefined || v === null) continue;
    entries.push([k, typeof v === "object" ? JSON.stringify(v) : String(v)]);
  }
  return HttpClientRequestModule.bodyUrlParams(request, entries);
};

const encode = ({
  input,
  inputAst,
}: {
  readonly input: unknown;
  readonly inputAst: AST.AST;
}) =>
  Effect.gen(function* () {
    const resolveCredentials = yield* Credentials;
    const creds = yield* resolveCredentials as Effect.Effect<Config>;
    const request = buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: creds.apiBaseUrl,
      headers: formatHeaders(creds),
    });
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    return (http as { contentType?: string } | undefined)?.contentType ===
      "form-urlencoded"
      ? toUrlEncodedBody(request)
      : request;
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
      console.error(`[distilled] <- ${response.status} ${text.slice(0, 400)}`);
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
      const body = nonJson ? text : json;
      const message =
        !nonJson &&
        json !== null &&
        typeof json === "object" &&
        typeof (json as Record<string, unknown>).message === "string"
          ? ((json as Record<string, unknown>).message as string)
          : nonJson && text.trim()
            ? text.trim()
            : `HTTP ${status}`;

      // 1. Supabase has no error code on the wire; the only signal for the
      //    free-tier active-project limit is a literal substring of the
      //    message. Detect it before any status mapping so tests and
      //    callers can react to it as a typed error.
      if (message.includes("active free projects")) {
        return yield* fail(new FreeProjectLimitReached({ message }));
      }

      // Supabase returns 406 for some "not found" conditions (e.g.
      // snippets) — remap before matcher/status evaluation.
      const effectiveStatus = status === 406 ? 404 : status;

      // 2. Per-operation typed error (matcher metadata on the class).
      const typed = matchTypedError(errorClasses, effectiveStatus, [
        { message },
      ]);
      if (typed !== undefined) return yield* fail(typed);

      // 3. HTTP-status classes from the shared core map (retryAfter only
      //    stamps on retryable statuses).
      const StatusErrorClass =
        HTTP_STATUS_MAP[effectiveStatus as keyof typeof HTTP_STATUS_MAP];
      if (StatusErrorClass) {
        return yield* fail(
          new StatusErrorClass({
            message,
            retryAfter: parseRetryAfterForStatus(effectiveStatus, headers),
          } as any),
        );
      }

      // 4. Unmapped 5xx → retryable server error.
      if (status >= 500) {
        return yield* fail(
          new InternalServerError({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 5. Unknown Supabase error.
      return yield* fail(new UnknownSupabaseError({ message, body }));
    }

    // 2xx: the response body IS the payload (no envelope). Wire→TS key
    // mapping is schema-driven; `RawResponseRoot` responses are the body
    // verbatim (mapKeys handles arrays/scalars structurally either way).
    const body: unknown = nonJson ? text : (json ?? {});
    return wrapSensitive(outputAst, mapKeys(outputAst, body, "decode"));
  });

export const SupabaseProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    // Erase encode's Credentials requirement (see comment above).
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode,
  }),
);
