/**
 * Prisma Postgres-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Prisma
 * Postgres-specific fallback/decode error types. The API's error envelope is
 * `{ error: { code, message, hint? } }` — status-mapped failures surface as
 * the shared core classes (message only, like distilled v0); the envelope's
 * `code`/`hint` only surface on {@link UnknownPrismaPostgresError}.
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
 * Unknown Prisma Postgres error — returned when a failure matches no
 * per-operation error class and no HTTP status class. Carries the envelope's
 * `code`/`message`/`hint` and the raw body for later cataloging.
 */
export class UnknownPrismaPostgresError extends Schema.TaggedError<UnknownPrismaPostgresError>()(
  "UnknownPrismaPostgresError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    hint: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper (kept for v0 API compatibility). */
export class PrismaPostgresParseError extends Schema.TaggedError<PrismaPostgresParseError>()(
  "PrismaPostgresParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any Prisma Postgres operation may surface in addition to the
 * status-matched API errors declared per endpoint.
 */
export type ClientErrors =
  | UnknownPrismaPostgresError
  | PrismaPostgresParseError;

/**
 * Default Prisma Postgres operation errors: the shared HTTP status errors
 * from core plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
