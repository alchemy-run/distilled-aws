/**
 * Cloudflare-specific error types.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
  UnprocessableEntity,
  HTTP_STATUS_MAP,
  DEFAULT_ERRORS,
  API_ERRORS,
} from "@distilled.cloud/core/errors";
import type { DefaultErrors as CoreDefaultErrors } from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

// Schema parse error wrapper
export class CloudflareParseError extends Schema.TaggedError<CloudflareParseError>()(
  "CloudflareParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Unknown Cloudflare error - returned when an error code is not recognized.
 * Contains the raw error code for later cataloging.
 */
export class UnknownCloudflareError extends Schema.TaggedError<UnknownCloudflareError>()(
  "UnknownCloudflareError",
  {
    code: Schema.optional(Schema.Number),
    message: Schema.String,
  },
) {}

/**
 * Cloudflare error code 7003 — "invalid request: invalid route". Returned when
 * a path component (typically accountId / zoneId) doesn't match a real
 * Cloudflare resource. Mapped globally so every operation surfaces it as
 * InvalidRoute rather than UnknownCloudflareError.
 *
 * Per-operation patches that explicitly map code 7003 still produce their
 * service-local InvalidRoute class with the same `_tag`, so test assertions
 * on `e._tag === "InvalidRoute"` work for both global and per-op variants.
 */
export class InvalidRoute extends Schema.TaggedError<InvalidRoute>()(
  "InvalidRoute",
  {
    code: Schema.optional(Schema.Number),
    message: Schema.String,
  },
) {}

/**
 * HTTP error - non-2xx response without a parseable Cloudflare error body.
 */
export class CloudflareHttpError extends Schema.TaggedError<CloudflareHttpError>()(
  "CloudflareHttpError",
  {
    status: Schema.Number,
    statusText: Schema.String,
    message: Schema.String,
    body: Schema.optional(Schema.String),
  },
) {}

/**
 * Errors that any Cloudflare operation may surface in addition to status/code-
 * matched API errors declared per endpoint.
 */
export type ClientErrors =
  | CloudflareHttpError
  | CloudflareParseError
  | InvalidRoute
  | UnknownCloudflareError;

/**
 * Default Cloudflare operation errors include the shared HTTP status errors from
 * core plus the client-level fallback/decode errors that the Cloudflare client
 * can emit at runtime.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;

// =============================================================================
// Legacy fallback classes (kept for generated-code compatibility)
// =============================================================================

import * as S from "effect/Schema";
import { withThrottlingError } from "@distilled.cloud/core/category";
import { withCategory } from "@distilled.cloud/core/error-category";
import { RETRYABLE } from "@distilled.cloud/core/errors";

/** A single `{ code, message }` entry from the envelope's `errors` array. */
export interface CloudflareApiError {
  readonly code?: number;
  readonly message: string;
}

/**
 * Legacy generic Cloudflare API error. The protocol no longer constructs
 * this (failures map to the distilled-compatible DefaultErrors classes
 * above); it remains exported because generated operations reference it in
 * their `errors` lists.
 */
export class CloudflareError extends S.TaggedError<CloudflareError>()(
  "CloudflareError",
  {
    status: S.Number,
    errors: S.Array(
      S.Struct({
        code: S.optional(S.Number),
        message: S.String,
      }),
    ),
  },
) {}

/** Legacy rate-limit error — see {@link CloudflareError}'s note. */
export class CloudflareRateLimited extends S.TaggedError<CloudflareRateLimited>()(
  "CloudflareRateLimited",
  {
    status: S.Number,
    errors: S.Array(
      S.Struct({
        code: S.optional(S.Number),
        message: S.String,
      }),
    ),
  },
).pipe(withCategory(RETRYABLE), withThrottlingError) {}
