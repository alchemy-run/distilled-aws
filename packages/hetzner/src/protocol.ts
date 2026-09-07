/**
 * HetznerProtocol — the shared bearer-REST protocol instantiated for Hetzner
 * Cloud.
 *
 * Hetzner speaks plain JSON with no success envelope: a single-resource read
 * returns `{ "server": {...} }`, a list returns
 * `{ "servers": [...], "meta": { "pagination": {...} } }` — the generated
 * response shapes model those keys directly. FAILURES are enveloped, and
 * uniformly so: `{ "error": { "code": "invalid_input", "message": "...",
 * "details": {...} } }`, where `code` is the machine-readable half and
 * `details`' schema depends on it.
 *
 * The API version is part of the base URL's PATH (`/v1`), not a header, so
 * the generated operations carry version-less routes.
 *
 * Rate limits (429 `rate_limit_exceeded`) come back with `RateLimit-Limit`,
 * `RateLimit-Remaining` and `RateLimit-Reset` — the pre-IETF spelling, which
 * core's `RateLimit`-dictionary parser does not read, so `TooManyRequests`
 * carries no `retryAfter` and the default policy's backoff applies. That is
 * the right answer here rather than a gap to plug: `RateLimit-Reset` is the
 * timestamp at which the FULL hourly quota is restored — up to an hour out —
 * while Hetzner refills the budget gradually (one request per second at the
 * default 3600/hour), so a caller that slept until the reset would wait
 * orders of magnitude longer than it needs to.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import type { ConfigError } from "@distilled.cloud/core/errors";
import { HTTP_STATUS_MAP } from "@distilled.cloud/core/errors";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
} from "@distilled.cloud/core/protocol-rest";
import { Credentials, type Config } from "./credentials.ts";
import {
  Gone,
  MethodNotAllowed,
  PreconditionFailed,
  UnknownHetznerError,
  type DefaultErrors,
} from "./errors.ts";

/**
 * Error channel shared by every generated Hetzner operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * HetznerOpError, HetznerOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type HetznerOpError =
  | DefaultErrors
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Hetzner operation. */
export type HetznerOpContext = Credentials | HttpClient.HttpClient;

/**
 * Hetzner error bodies nest under `error`: `{ error: { code, message,
 * details } }`. A response that arrives without that envelope (a proxy 502,
 * an HTML error page) falls through to the protocol's `HTTP <status>`
 * default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const err = (body as Record<string, unknown>).error;
  if (err === null || typeof err !== "object") return undefined;
  const e = err as Record<string, unknown>;
  return {
    code: typeof e.code === "string" ? e.code : undefined,
    message: typeof e.message === "string" ? e.message : undefined,
  };
};

/** The code-dependent `error.details` object, when the envelope carries one. */
const errorDetails = (body: unknown): unknown => {
  if (body === null || typeof body !== "object") return undefined;
  const err = (body as Record<string, unknown>).error;
  if (err === null || typeof err !== "object") return undefined;
  return (err as Record<string, unknown>).details ?? undefined;
};

export const HetznerProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // Resolved on the CALLING fiber per request (the layer is memoized per
    // process); the Credentials service holds an effect, so a token rotated
    // between calls is picked up without rebuilding the layer.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: `Bearer ${Redacted.value(creds.token)}`,
    }),
    errorEnvelope,
    // Core's shared map plus the three statuses in Hetzner's documented
    // error table that it doesn't cover: 405, 410 and 412. Leaving them
    // unmapped would funnel a sold-out Server type (412) into the same
    // UnknownHetznerError as a genuinely unrecognized failure.
    statusMap: {
      ...HTTP_STATUS_MAP,
      405: MethodNotAllowed,
      410: Gone,
      412: PreconditionFailed,
    },
    unknownError: ({ code, message, body }) =>
      new UnknownHetznerError({
        code:
          typeof code === "string"
            ? code
            : code !== undefined
              ? String(code)
              : undefined,
        message,
        details: errorDetails(body),
        body,
      }),
  });
