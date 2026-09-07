/**
 * Forgejo-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Forgejo-specific
 * unknown-error and parse-error wrappers.
 *
 * Forgejo's failure envelope is `{ message, url }` — a human-readable message
 * and a link to the API documentation. There is no machine-readable code, so
 * the SDK dispatches on the HTTP status: the per-operation classes generated
 * from each operation's declared responses (`NotFound`, `Forbidden`,
 * `Conflict`, `UnprocessableEntity`, `Locked`, …) first, then core's shared
 * status map, then {@link UnknownForgejoError}. The handful of failures
 * Forgejo reports under a misleading status — an organization delete refused
 * because it still owns repositories answers `500` — are typed per operation
 * by message under `patches/`.
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
 * Unknown Forgejo error — returned when a failed response's HTTP status has
 * no mapped error class. Carries the raw body for later cataloging.
 */
export class UnknownForgejoError extends Schema.TaggedError<UnknownForgejoError>()(
  "UnknownForgejoError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class ForgejoParseError extends Schema.TaggedError<ForgejoParseError>()(
  "ForgejoParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any Forgejo operation may surface in addition to the per-operation
 * typed status errors.
 */
export type ClientErrors = UnknownForgejoError | ForgejoParseError;

/**
 * Default Forgejo operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
