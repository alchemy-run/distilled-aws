/**
 * Common error types shared across SDKs.
 *
 * Each SDK defines its own provider-specific errors (e.g., Unauthorized, NotFound)
 * using the category system. This module provides base error types and utilities
 * that are used across all SDKs.
 */
import * as Duration from "effect/Duration";
import * as Schema from "effect/Schema";
import * as Category from "./category.ts";

// ============================================================================
// Shared Schema Helpers
// ============================================================================

/**
 * Opaque schema for an Effect `Duration.Duration` value.
 *
 * Used on retryable errors to carry a server-provided wait hint (e.g. parsed
 * from `Retry-After` or the IETF `Ratelimit` header). Core does not encode/decode
 * this field over the wire — it is constructed at runtime by `matchError` from
 * whatever the service actually returns (delay-seconds, HTTP-date, epoch, etc.)
 * and consumed at runtime by the retry policy.
 */
export const DurationSchema = Schema.declare<Duration.Duration>(
  Duration.isDuration,
);

// ============================================================================
// Common HTTP Status Error Classes
// ============================================================================

/**
 * Unauthorized - Authentication failure (401).
 */
export class Unauthorized extends Schema.TaggedError<Unauthorized>()(
  "Unauthorized",
  { message: Schema.String },
).pipe(Category.withAuthError) {}

/**
 * Forbidden - Access denied (403).
 */
export class Forbidden extends Schema.TaggedError<Forbidden>()("Forbidden", {
  message: Schema.String,
}).pipe(Category.withAuthError) {}

/**
 * NotFound - Resource not found (404).
 */
export class NotFound extends Schema.TaggedError<NotFound>()("NotFound", {
  message: Schema.String,
}).pipe(Category.withNotFoundError) {}

/**
 * BadRequest - Invalid request (400).
 */
export class BadRequest extends Schema.TaggedError<BadRequest>()("BadRequest", {
  message: Schema.String,
}).pipe(Category.withBadRequestError) {}

/**
 * Conflict - Resource conflict (409).
 */
export class Conflict extends Schema.TaggedError<Conflict>()("Conflict", {
  message: Schema.String,
}).pipe(Category.withConflictError) {}

/**
 * UnprocessableEntity - Validation error (422).
 */
export class UnprocessableEntity extends Schema.TaggedError<UnprocessableEntity>()(
  "UnprocessableEntity",
  { message: Schema.String },
).pipe(Category.withBadRequestError) {}

/**
 * TooManyRequests - Rate limited (429).
 */
export class TooManyRequests extends Schema.TaggedError<TooManyRequests>()(
  "TooManyRequests",
  {
    message: Schema.String,
    retryAfter: Schema.optional(DurationSchema),
  },
).pipe(
  Category.withThrottlingError,
  Category.withRetryable({ throttling: true }),
) {}

/**
 * Locked - Resource locked (423).
 */
export class Locked extends Schema.TaggedError<Locked>()("Locked", {
  message: Schema.String,
  retryAfter: Schema.optional(DurationSchema),
}).pipe(Category.withLockedError, Category.withRetryable()) {}

/**
 * InternalServerError - Server error.
 *
 * Mapped from HTTP 500 by default. Per-service patches may also pin it to a
 * specific in-band error code/message combination (e.g. Cloudflare returns a
 * 200 envelope carrying `{ code: 10002, message: "An unknown error has
 * occurred" }` for transient backend failures on some endpoints).
 */
export class InternalServerError extends Schema.TaggedError<InternalServerError>()(
  "InternalServerError",
  {
    message: Schema.String,
    code: Schema.optional(Schema.Number),
    retryAfter: Schema.optional(DurationSchema),
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

/**
 * BadGateway - Bad gateway (502).
 */
export class BadGateway extends Schema.TaggedError<BadGateway>()("BadGateway", {
  message: Schema.String,
  retryAfter: Schema.optional(DurationSchema),
}).pipe(Category.withServerError, Category.withRetryable()) {}

/**
 * ServiceUnavailable - Service unavailable (503).
 */
export class ServiceUnavailable extends Schema.TaggedError<ServiceUnavailable>()(
  "ServiceUnavailable",
  {
    message: Schema.String,
    retryAfter: Schema.optional(DurationSchema),
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

/**
 * GatewayTimeout - Gateway timeout (504).
 */
export class GatewayTimeout extends Schema.TaggedError<GatewayTimeout>()(
  "GatewayTimeout",
  {
    message: Schema.String,
    retryAfter: Schema.optional(DurationSchema),
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

/**
 * Configuration error - missing or invalid configuration.
 */
export class ConfigError extends Schema.TaggedError<ConfigError>()(
  "ConfigError",
  { message: Schema.String },
).pipe(Category.withConfigurationError) {}

// ============================================================================
// Error Maps
// ============================================================================

/**
 * Mapping from HTTP status codes to common error classes.
 */
export const HTTP_STATUS_MAP = {
  400: BadRequest,
  401: Unauthorized,
  403: Forbidden,
  404: NotFound,
  409: Conflict,
  422: UnprocessableEntity,
  423: Locked,
  429: TooManyRequests,
  500: InternalServerError,
  502: BadGateway,
  503: ServiceUnavailable,
  504: GatewayTimeout,
} as const;

/**
 * HTTP status codes that are considered "default" errors (always present).
 * These are excluded from per-operation error types since they're handled globally.
 */
export const DEFAULT_ERROR_STATUSES = new Set([401, 429, 500, 502, 503, 504]);

/**
 * HTTP status codes whose corresponding error class in {@link HTTP_STATUS_MAP}
 * declares a `retryAfter` field. The retry policy honors `error.retryAfter`
 * with precedence over the default backoff for these.
 *
 * `matchError` implementations should only pass `retryAfter` into the
 * constructor when the status is in this set; passing it on non-retryable
 * classes (BadRequest/Unauthorized/etc.) would silently retain it as a
 * stale field on the instance and pollute serialized output.
 */
export const RETRYABLE_HTTP_STATUSES = new Set([423, 429, 500, 502, 503, 504]);

/**
 * All common API error classes.
 */
export const API_ERRORS = [
  Unauthorized,
  Forbidden,
  NotFound,
  BadRequest,
  Conflict,
  UnprocessableEntity,
  TooManyRequests,
  Locked,
  InternalServerError,
  BadGateway,
  ServiceUnavailable,
  GatewayTimeout,
] as const;

/**
 * Default errors that apply to ALL operations.
 * These are infrastructure-level errors that can occur regardless of the operation.
 */
export const DEFAULT_ERRORS = [
  Unauthorized,
  TooManyRequests,
  InternalServerError,
  BadGateway,
  ServiceUnavailable,
  GatewayTimeout,
] as const;

export type DefaultErrors = InstanceType<(typeof DEFAULT_ERRORS)[number]>;

export const RETRYABLE = "@distilled/errors/retryable" as const;
