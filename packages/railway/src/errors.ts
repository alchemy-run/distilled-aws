/**
 * Railway-specific error types — hand-written.
 *
 * Re-exports the common HTTP errors from core and adds typed wrappers for the
 * GraphQL error envelope returned by backboard.railway.com.
 *
 * Railway's gateway is Apollo-flavoured: business failures come back as HTTP
 * **200** with an `errors[]` array whose entries carry a stable
 * `extensions.code`. That is the signal the protocol dispatches on (see
 * `RAILWAY_ERROR_CODE_MAP`); the HTTP status is only meaningful for
 * transport-level failures that never reach the GraphQL layer.
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
// `retryAfter` is a parsed Duration, not a number of seconds — same shape as
// core's TooManyRequests, so throttling handling is uniform across SDKs.
import { DurationSchema } from "@distilled.cloud/core/errors";
import type {
  BadRequest,
  Conflict,
  DefaultErrors as CoreDefaultErrors,
  Forbidden,
  Locked,
  NotFound,
  UnprocessableEntity,
} from "@distilled.cloud/core/errors";

import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

/**
 * Catch-all for Railway GraphQL errors that don't match any other tagged
 * class. Carries the raw envelope and a best-effort `code` / `message`.
 */
export class UnknownRailwayError extends Schema.TaggedError<UnknownRailwayError>()(
  "UnknownRailwayError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Response body did not parse as JSON / did not match the operation schema. */
export class RailwayParseError extends Schema.TaggedError<RailwayParseError>()(
  "RailwayParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * The request carried no usable credential, or the token was rejected
 * (`UNAUTHENTICATED`). Distinct from {@link RailwayForbidden}: retrying with
 * the same token cannot help.
 */
export class RailwayUnauthenticated extends Schema.TaggedError<RailwayUnauthenticated>()(
  "RailwayUnauthenticated",
  {
    message: Schema.String,
  },
).pipe(Category.withAuthError) {}

/**
 * The token authenticated but is not permitted to perform the operation
 * (`FORBIDDEN`) — e.g. a project token reaching outside its environment, or a
 * member without workspace admin.
 */
export class RailwayForbidden extends Schema.TaggedError<RailwayForbidden>()(
  "RailwayForbidden",
  {
    message: Schema.String,
  },
).pipe(Category.withAuthError) {}

/** The addressed resource does not exist (`NOT_FOUND`). */
export class RailwayNotFound extends Schema.TaggedError<RailwayNotFound>()(
  "RailwayNotFound",
  {
    message: Schema.String,
  },
).pipe(Category.withNotFoundError) {}

/**
 * The variables failed validation before the resolver ran
 * (`BAD_USER_INPUT` / `GRAPHQL_VALIDATION_FAILED`). Also raised when a baked
 * document no longer matches the live schema, which is worth surfacing
 * distinctly: it means the spec mirror has drifted.
 */
export class RailwayValidationError extends Schema.TaggedError<RailwayValidationError>()(
  "RailwayValidationError",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * The caller exceeded Railway's request budget (`RATE_LIMITED`). Railway
 * meters the public API in points per window — see the `apiTokenRateLimit`
 * query for the remaining budget.
 */
export class RailwayRateLimited extends Schema.TaggedError<RailwayRateLimited>()(
  "RailwayRateLimited",
  {
    message: Schema.String,
    /** Parsed from the gateway's `Retry-After` header, when it sent one. */
    retryAfter: Schema.optional(DurationSchema),
  },
).pipe(
  Category.withThrottlingError,
  Category.withRetryable({ throttling: true }),
) {}

/**
 * The operation is not available on the workspace's current plan, or would
 * exceed a plan limit (`PLAN_LIMIT` / `SUBSCRIPTION_REQUIRED`).
 */
export class RailwayPlanLimitExceeded extends Schema.TaggedError<RailwayPlanLimitExceeded>()(
  "RailwayPlanLimitExceeded",
  {
    message: Schema.String,
  },
).pipe(Category.withQuotaError) {}

/**
 * Railway asked us to retry a generated `*.up.railway.app` domain create
 * (`Failed to create service domain, please try again`). The service
 * instance is not ready for a domain yet. Transient; retry.
 */
export class RailwayServiceDomainCreateFailed extends Schema.TaggedError<RailwayServiceDomainCreateFailed>()(
  "RailwayServiceDomainCreateFailed",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

/** The resolver failed (`INTERNAL_SERVER_ERROR`). */
export class RailwayInternalError extends Schema.TaggedError<RailwayInternalError>()(
  "RailwayInternalError",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError) {}

/**
 * Map from Railway GraphQL `extensions.code` → typed error class. Consulted
 * by the protocol's error matcher before any HTTP-status fallback.
 */
// oxlint-disable-next-line no-explicit-any -- heterogeneous error class map
export const RAILWAY_ERROR_CODE_MAP: Record<string, any> = {
  UNAUTHENTICATED: RailwayUnauthenticated,
  UNAUTHORIZED: RailwayUnauthenticated,
  FORBIDDEN: RailwayForbidden,
  NOT_FOUND: RailwayNotFound,
  PROJECT_NOT_FOUND: RailwayNotFound,
  SERVICE_NOT_FOUND: RailwayNotFound,
  ENVIRONMENT_NOT_FOUND: RailwayNotFound,
  VOLUME_NOT_FOUND: RailwayNotFound,
  BUCKET_NOT_FOUND: RailwayNotFound,
  RESOURCE_NOT_FOUND: RailwayNotFound,
  BAD_USER_INPUT: RailwayValidationError,
  GRAPHQL_VALIDATION_FAILED: RailwayValidationError,
  BAD_REQUEST: RailwayValidationError,
  RATE_LIMITED: RailwayRateLimited,
  TOO_MANY_REQUESTS: RailwayRateLimited,
  PLAN_LIMIT: RailwayPlanLimitExceeded,
  SUBSCRIPTION_REQUIRED: RailwayPlanLimitExceeded,
  INTERNAL_SERVER_ERROR: RailwayInternalError,
};

/**
 * Message-aware matchers consulted *before* {@link RAILWAY_ERROR_CODE_MAP}.
 * Railway often reuses `INTERNAL_SERVER_ERROR` for authorization failures
 * (`Not Authorized` on `me` for workspace/team tokens).
 */
export const RAILWAY_ERROR_MATCHERS: ReadonlyArray<{
  readonly code?: string;
  readonly messageIncludes?: string;
  // oxlint-disable-next-line no-explicit-any -- heterogeneous error class map
  readonly error: any;
}> = [
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "Not Authorized",
    error: RailwayForbidden,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "creating projects too quickly",
    error: RailwayRateLimited,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "creating volumes too quickly",
    error: RailwayRateLimited,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "creating environments too quickly",
    error: RailwayRateLimited,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "one environment can be created per user every 30s",
    error: RailwayRateLimited,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "Failed to create service domain",
    error: RailwayServiceDomainCreateFailed,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "Invalid project name",
    error: RailwayValidationError,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "is not a valid domain",
    error: RailwayValidationError,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "Project not found",
    error: RailwayNotFound,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "ServiceInstance not found",
    error: RailwayNotFound,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "BucketInstance not found",
    error: RailwayNotFound,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "VolumeInstance not found",
    error: RailwayNotFound,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "Source canvas view not found",
    error: RailwayNotFound,
  },
  {
    code: "INTERNAL_SERVER_ERROR",
    messageIncludes: "Login session",
    error: RailwayNotFound,
  },
];

/** Union of the Railway-specific tagged error classes above. */
export type RailwayTypedErrors =
  | RailwayUnauthenticated
  | RailwayForbidden
  | RailwayNotFound
  | RailwayValidationError
  | RailwayRateLimited
  | RailwayServiceDomainCreateFailed
  | RailwayPlanLimitExceeded
  | RailwayInternalError;

/**
 * Errors any Railway operation may surface beyond the core default classes:
 * the typed GraphQL error-code classes plus the client-level fallbacks.
 */
export type ClientErrors =
  | RailwayTypedErrors
  | UnknownRailwayError
  | RailwayParseError;

/**
 * Default Railway operation errors: the shared HTTP status errors from core
 * (both the always-on defaults and the status-mapped 4xx classes the
 * protocol's HTTP fallback can construct) plus the client-level errors.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | BadRequest
  | Forbidden
  | NotFound
  | Conflict
  | UnprocessableEntity
  | Locked
  | ClientErrors;
