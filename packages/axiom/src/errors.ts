/**
 * Axiom-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the Axiom fallback
 * errors. Note the generated service modules additionally define their own
 * per-status matcher classes (BadRequest/NotFound/…) for the statuses each
 * operation declares — those share `_tag`s with the core classes here, so
 * `catchTag` works against either.
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

/** Unknown Axiom error — returned when nothing else matches the failure. */
export class UnknownAxiomError extends Schema.TaggedError<UnknownAxiomError>()(
  "UnknownAxiomError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper (kept for v0 surface parity). */
export class AxiomParseError extends Schema.TaggedError<AxiomParseError>()(
  "AxiomParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}
