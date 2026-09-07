/**
 * Turso-specific error types.
 *
 * Re-exports common HTTP errors from sdk-core and adds the Turso-specific
 * fallback/parse error types (ported from the distilled repo's turso SDK).
 *
 * Turso error bodies have the shape `{ error: string, code?: string }`.
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
import type {
  BadRequest as CoreBadRequest,
  Conflict as CoreConflict,
  DefaultErrors as CoreDefaultErrors,
  Forbidden as CoreForbidden,
  Locked as CoreLocked,
  NotFound as CoreNotFound,
  UnprocessableEntity as CoreUnprocessableEntity,
} from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

/**
 * Unknown Turso error — returned when an error response cannot be mapped to
 * a shared HTTP status class. Carries the raw `code` string Turso sometimes
 * includes in its error body.
 */
export class UnknownTursoError extends Schema.TaggedError<UnknownTursoError>()(
  "UnknownTursoError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/**
 * Schema parse error wrapper — kept for parity with the distilled turso SDK's
 * error surface.
 */
export class TursoParseError extends Schema.TaggedError<TursoParseError>()(
  "TursoParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any Turso operation may surface beyond the core HTTP defaults.
 */
export type ClientErrors = UnknownTursoError | TursoParseError;

/**
 * Default Turso operation errors: the shared HTTP status errors from core
 * (both the always-possible defaults and the status-mapped 4xx classes the
 * protocol's status matcher can produce) plus the Turso client errors.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | CoreUnprocessableEntity
  | CoreLocked
  | ClientErrors;
