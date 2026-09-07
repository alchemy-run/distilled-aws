/**
 * Supabase-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Supabase-specific
 * error classes (ported verbatim from the distilled repo's supabase SDK).
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

// Unknown Supabase error - returned when an error code is not recognized
export class UnknownSupabaseError extends Schema.TaggedError<UnknownSupabaseError>()(
  "UnknownSupabaseError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

// Returned when v1CreateAProject is called against an org whose owner has
// already hit the free-tier active-project ceiling (currently 2). Supabase
// surfaces this as a generic 4xx with the literal message
//   "The following organization members have reached their maximum limits
//    for the number of active free projects within organizations where
//    they are an administrator or owner: <email> (<n> project limit)..."
// We tag it explicitly so tests can detect it, clean up stale projects,
// and retry — and so callers can distinguish it from a real BadRequest.
export class FreeProjectLimitReached extends Schema.TaggedError<FreeProjectLimitReached>()(
  "FreeProjectLimitReached",
  {
    message: Schema.String,
  },
).pipe(Category.withQuotaError) {}

// Schema parse error wrapper
export class SupabaseParseError extends Schema.TaggedError<SupabaseParseError>()(
  "SupabaseParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors that any Supabase operation may surface in addition to the
 * status-matched API errors declared per endpoint.
 */
export type ClientErrors =
  | FreeProjectLimitReached
  | SupabaseParseError
  | UnknownSupabaseError;

/**
 * Default Supabase operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors the Supabase client can emit
 * at runtime.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
