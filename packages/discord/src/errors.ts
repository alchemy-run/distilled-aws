/**
 * Discord-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Discord-specific
 * unknown-error and parse-error wrappers.
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
 * Unknown Discord error — returned when a failed response's HTTP status has
 * no mapped error class. `code` is Discord's own JSON error code (e.g. 50001
 * "Missing Access"), which is far more specific than the HTTP status and is
 * the field worth branching on; `errors` carries the per-field validation
 * detail Discord attaches to 400s. See
 * https://discord.com/developers/docs/topics/opcodes-and-status-codes#json.
 */
export class UnknownDiscordError extends Schema.TaggedError<UnknownDiscordError>()(
  "UnknownDiscordError",
  {
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    errors: Schema.optional(Schema.Unknown),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class DiscordParseError extends Schema.TaggedError<DiscordParseError>()(
  "DiscordParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any Discord operation may surface in addition to the shared HTTP
 * status errors.
 */
export type ClientErrors = UnknownDiscordError | DiscordParseError;

/**
 * Default Discord operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
