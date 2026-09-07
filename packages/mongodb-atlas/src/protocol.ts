/**
 * MongodbAtlasProtocol — hand-written.
 *
 * Atlas speaks bearer-authenticated JSON REST with one wrinkle the shared
 * `makeRestProtocol` factory can't express: every operation must send a
 * date-versioned `Accept` header (`application/vnd.atlas.YYYY-MM-DD+json`) —
 * plain `application/json` draws a 406 from the live API. The version is
 * per-operation data, carried as an `accept` extension on the `Http` trait
 * (stamped from the spec's vendor media types by scripts/convert.ts), so
 * this protocol is a small bespoke build on the same core helpers:
 *
 *   request:  credentials → `Authorization: Bearer <oauth token>` + base URL
 *             (default https://cloud.mongodb.com), resolved from the calling
 *             fiber on every request (picking up cached-token refreshes);
 *             `Accept` from the operation's `Http` trait
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx Atlas envelopes
 *             `{ error, errorCode, reason?, detail? }` map to the
 *             operation's typed error classes by status, then the shared
 *             HTTP-status classes (402 → PaymentRequired, v0 parity), then
 *             {@link UnknownMongodbAtlasError} — with `retryAfter` stamped
 *             from the standard hint headers on retryable statuses.
 */
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as AST from "effect/SchemaAST";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";
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
  type API_ERRORS,
  type ConfigError,
  HTTP_STATUS_MAP,
  InternalServerError,
} from "@distilled.cloud/core/errors";
import { parseRetryAfterForStatus } from "@distilled.cloud/core/retry-after";
import { Credentials, type Config } from "./credentials.ts";
import { PaymentRequired, UnknownMongodbAtlasError } from "./errors.ts";

/**
 * Error channel shared by every generated Atlas operation. Generated service
 * files annotate operations with `API.OperationMethod<I, O,
 * MongodbAtlasOpError, MongodbAtlasOpContext>` explicitly so the compiler
 * never infers these back out of the schema generics.
 */
export type MongodbAtlasOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | PaymentRequired
  | UnknownMongodbAtlasError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Atlas operation. */
export type MongodbAtlasOpContext = Credentials | HttpClient.HttpClient;

/** The v0 Atlas status map: core's HTTP classes plus 402 → PaymentRequired. */
const STATUS_MAP: Readonly<
  Record<number, (new (args: any) => any) | undefined>
> = {
  ...HTTP_STATUS_MAP,
  402: PaymentRequired,
};

// Bridge: Protocol.decode is typed as Effect<unknown> (no error channel),
// but Atlas failures are real typed errors that operations re-surface via
// their `errors: [...]` lists. Fail with the instance and erase the type
// here; the generated operation annotations reintroduce it for callers.
const fail = (e: unknown): Effect.Effect<never> =>
  Effect.fail(e) as Effect.Effect<never>;

/** The Atlas ApiError envelope: `{ error, errorCode, reason?, detail? }`. */
interface AtlasErrorEnvelope {
  readonly errorCode?: string;
  readonly reason?: string;
  readonly detail?: string;
}

const errorEnvelope = (body: unknown): AtlasErrorEnvelope => {
  if (body === null || typeof body !== "object") return {};
  const b = body as Record<string, unknown>;
  return {
    errorCode: typeof b.errorCode === "string" ? b.errorCode : undefined,
    reason: typeof b.reason === "string" ? b.reason : undefined,
    detail: typeof b.detail === "string" ? b.detail : undefined,
  };
};

// The protocol layer is memoized per process by `API.make`, so the build
// must not capture credentials — `encode` resolves the Credentials service
// from the calling fiber's context on every request instead (picking up the
// cached-token refresh in credentials.ts). The service's ConfigError channel
// is erased at this boundary (Protocol effects carry none) and reintroduced
// for callers by the generated `MongodbAtlasOpError` annotations.
const encode = ({
  input,
  inputAst,
}: {
  readonly input: unknown;
  readonly inputAst: AST.AST;
}) =>
  Effect.gen(function* () {
    const resolve = yield* Credentials;
    const creds = yield* resolve as Effect.Effect<Config>;
    // The versioned Accept media type stamped on the operation's Http trait
    // by scripts/convert.ts. `application/json` alone is a 406; the API
    // serves the newest resource version ≤ the requested date.
    const http = getAnn(inputAst, httpSymbol) as HttpTrait | undefined;
    return buildRequest({
      input: unwrapRedactedDeep(input),
      inputAst,
      baseUrl: creds.apiBaseUrl,
      headers: {
        Authorization: `Bearer ${Redacted.value(creds.accessToken)}`,
        Accept: http?.accept ?? "application/json",
      },
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
      const env = nonJson ? {} : errorEnvelope(json);
      // v0 parity: `detail` first, then `reason`.
      const message =
        env.detail ??
        env.reason ??
        (nonJson && text.trim() ? text.trim() : `HTTP ${status}`);

      // 1. Per-operation typed error (matcher metadata on the class).
      const typed = matchTypedError(errorClasses, status, [{ message }]);
      if (typed !== undefined) return yield* fail(typed);

      // 2. Status-mapped class (retryAfter only stamps on retryable
      //    statuses — parseRetryAfterForStatus gates on that).
      const StatusErrorClass = STATUS_MAP[status];
      if (StatusErrorClass) {
        return yield* fail(
          new StatusErrorClass({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 3. Unmapped 5xx → retryable server error.
      if (status >= 500) {
        return yield* fail(
          new InternalServerError({
            message,
            retryAfter: parseRetryAfterForStatus(status, headers),
          }),
        );
      }

      // 4. Unknown Atlas error (carries the envelope for cataloging).
      return yield* fail(
        new UnknownMongodbAtlasError({
          errorCode: env.errorCode,
          reason: env.reason,
          detail: env.detail,
          body: nonJson ? text : json,
        }),
      );
    }

    // 2xx: the response body IS the payload (no envelope; the optional
    // `?envelope=true` wrapper is never requested by the SDK — v0 parity).
    // Wire→TS key mapping is schema-driven; `RawResponseRoot` responses are
    // the body verbatim (mapKeys handles arrays/scalars structurally).
    const body: unknown = nonJson ? text : (json ?? {});
    return wrapSensitive(outputAst, mapKeys(outputAst, body, "decode"));
  });

export const MongodbAtlasProtocol: Layer.Layer<API.Protocol> = Layer.succeed(
  API.Protocol,
  API.Protocol.of({
    // Erase encode's Credentials requirement (resolved on the calling
    // fiber; see the comment above `encode`).
    encode: (args) =>
      encode(args) as Effect.Effect<HttpClientRequest.HttpClientRequest>,
    decode,
  }),
);
