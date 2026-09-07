/**
 * Hugging Face-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the unknown-error and
 * parse-error wrappers. The Hub types its failures with the plain HTTP
 * vocabulary core already covers (400/404/409/422 per operation,
 * 401/429/5xx via the protocol's status map) — no provider-specific
 * statuses to add.
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
 * Unknown Hugging Face error — returned when a failed response's HTTP status
 * has no mapped error class. Carries the raw body for later cataloging.
 */
export class UnknownHuggingFaceError extends Schema.TaggedError<UnknownHuggingFaceError>()(
  "UnknownHuggingFaceError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class HuggingFaceParseError extends Schema.TaggedError<HuggingFaceParseError>()(
  "HuggingFaceParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any Hugging Face operation may surface in addition to the
 * per-operation typed status errors.
 */
export type ClientErrors = UnknownHuggingFaceError | HuggingFaceParseError;

/**
 * Default Hugging Face operation errors: the shared HTTP status errors from
 * core plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
