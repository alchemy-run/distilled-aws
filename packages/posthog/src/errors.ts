/**
 * PostHog-specific error types.
 *
 * Re-exports common HTTP errors from core and adds PostHog-specific error
 * types. Per-operation typed errors (BadRequest / Forbidden / NotFound / …)
 * are generated into each service module with status matchers; the classes
 * here cover everything the protocol can emit beyond those.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
  Locked,
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

/**
 * Unknown PostHog error — returned when a failure matches neither a
 * per-operation typed error nor an HTTP-status class. Carries the raw body
 * (PostHog's DRF error envelope) for later cataloging.
 */
export class UnknownPosthogError extends Schema.TaggedError<UnknownPosthogError>()(
  "UnknownPosthogError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class PosthogParseError extends Schema.TaggedError<PosthogParseError>()(
  "PosthogParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any PostHog operation may surface in addition to the status-matched
 * typed errors declared per endpoint.
 */
export type ClientErrors = UnknownPosthogError | PosthogParseError;

/**
 * Default PostHog operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
