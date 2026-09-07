/**
 * GitHub-specific error types.
 *
 * Re-exports the common HTTP errors from core and adds the GitHub-specific
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
 * HTTP 410 — the resource existed and no longer serves: issues disabled on a
 * repository, a migration archive that has been deleted, a gist that was
 * removed. Core's shared status map has no entry for it (410 is rare outside
 * GitHub), so the package adds one; generated operations that declare a 410
 * response emit their own identically-tagged `Gone` class, exactly as they do
 * for `NotFound`.
 */
export class Gone extends Schema.TaggedError<Gone>()("Gone", {
  message: Schema.String,
}).pipe(Category.withNotFoundError) {}

/**
 * Unknown GitHub error — returned when a failed response's HTTP status has no
 * mapped error class. Carries the raw body for later cataloging.
 */
export class UnknownGithubError extends Schema.TaggedError<UnknownGithubError>()(
  "UnknownGithubError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class GithubParseError extends Schema.TaggedError<GithubParseError>()(
  "GithubParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any GitHub operation may surface in addition to the per-operation
 * typed status errors.
 */
export type ClientErrors = UnknownGithubError | GithubParseError | Gone;

/**
 * Default GitHub operation errors: the shared HTTP status errors from core
 * plus the client-level fallback/decode errors.
 */
export type DefaultErrors = CoreDefaultErrors | ClientErrors;
