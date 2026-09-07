/**
 * MongoDB Atlas-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Atlas-specific
 * classes (ported from distilled v0). Note the generated service module
 * additionally defines its own per-status matcher classes
 * (BadRequest/PaymentRequired/…) for the statuses each operation declares —
 * those share `_tag`s with the classes here, so `catchTag` works against
 * either.
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

/** Payment Required — billing/quota limit (402). */
export class PaymentRequired extends Schema.TaggedError<PaymentRequired>()(
  "PaymentRequired",
  { message: Schema.String },
).pipe(Category.withBadRequestError) {}

/**
 * Unknown MongoDB Atlas error — returned when nothing else matches the
 * failure. Carries the Atlas error envelope fields
 * (`{ error, errorCode, reason?, detail? }`) for later cataloging.
 */
export class UnknownMongodbAtlasError extends Schema.TaggedError<UnknownMongodbAtlasError>()(
  "UnknownMongodbAtlasError",
  {
    errorCode: Schema.optional(Schema.String),
    reason: Schema.optional(Schema.String),
    detail: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper (kept for v0 surface parity). */
export class MongodbAtlasParseError extends Schema.TaggedError<MongodbAtlasParseError>()(
  "MongodbAtlasParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
