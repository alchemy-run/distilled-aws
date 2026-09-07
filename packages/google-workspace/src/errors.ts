/**
 * Google Workspace-specific error types.
 */
export {
  BadGateway,
  BadRequest,
  Conflict,
  ConfigError,
  Forbidden,
  GatewayTimeout,
  InternalServerError,
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

/** Unknown Google Workspace error - returned when an error status is not recognized. */
export class UnknownGoogleWorkspaceError extends Schema.TaggedError<UnknownGoogleWorkspaceError>()(
  "UnknownGoogleWorkspaceError",
  {
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper. */
export class GoogleWorkspaceParseError extends Schema.TaggedError<GoogleWorkspaceParseError>()(
  "GoogleWorkspaceParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * Errors any Google Workspace operation may surface in addition to the per-operation
 * 4xx classes declared in each generated service module.
 */
export type ClientErrors =
  | UnknownGoogleWorkspaceError
  | GoogleWorkspaceParseError;
