/**
 * Typesense-specific error types.
 *
 * Re-exports common HTTP errors from core and adds Typesense-specific
 * error types (unknown-error fallback + parse-error wrapper), matching the
 * distilled repo's typesense error surface.
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

// Unknown Typesense error - returned when an error code is not recognized
export class UnknownTypesenseError extends Schema.TaggedError<UnknownTypesenseError>()(
  "UnknownTypesenseError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

// Schema parse error wrapper
export class TypesenseParseError extends Schema.TaggedError<TypesenseParseError>()(
  "TypesenseParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors that any Typesense operation may surface in addition to
 * status-matched API errors declared per endpoint.
 */
export type ClientErrors = TypesenseParseError | UnknownTypesenseError;

/**
 * Default Typesense operation errors: the shared HTTP status errors from
 * core plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
