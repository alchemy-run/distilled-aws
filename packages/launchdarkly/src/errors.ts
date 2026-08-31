/**
 * LaunchDarkly-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the LaunchDarkly
 * fallback errors. Note the generated service module additionally defines
 * its own per-status matcher classes (BadRequest/NotFound/…) for the statuses
 * each operation declares — those share `_tag`s with the core classes here,
 * so `catchTag` works against either.
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
export type { DefaultErrors } from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

/** Unknown LaunchDarkly error — returned when nothing else matches the failure. */
export class UnknownLaunchDarklyError extends Schema.TaggedError<UnknownLaunchDarklyError>()(
  "UnknownLaunchDarklyError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper (kept for v0 surface parity). */
export class LaunchDarklyParseError extends Schema.TaggedError<LaunchDarklyParseError>()(
  "LaunchDarklyParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
