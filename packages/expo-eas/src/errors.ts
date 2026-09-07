/**
 * EAS-specific error types — hand-written.
 *
 * Re-exports common HTTP errors from core and adds typed wrappers for the
 * GraphQL error envelope returned by api.expo.dev. EAS GraphQL errors carry a
 * stable `extensions.errorCode` string we map to dedicated tagged classes
 * (see `EAS_ERROR_CODE_MAP`, consulted by the protocol's error matcher).
 *
 * Ported verbatim from distilled v0 `packages/expo-eas/src/errors.ts`.
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
 * Catch-all for EAS GraphQL errors that don't match any other tagged class.
 * Carries the raw `errors[]` envelope and a best-effort `code` / `message`.
 */
export class UnknownEasError extends Schema.TaggedError<UnknownEasError>()(
  "UnknownEasError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper (response body did not match the operation schema). */
export class EasParseError extends Schema.TaggedError<EasParseError>()(
  "EasParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/**
 * The installed eas-cli / API client is too old. Returned with errorCode
 * `EAS_CLI_UPGRADE_REQUIRED_ERROR` after a backward-incompatible schema change.
 */
export class EasUpgradeRequired extends Schema.TaggedError<EasUpgradeRequired>()(
  "EasUpgradeRequired",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError) {}

/** Generic input validation failure (errorCode `VALIDATION_ERROR`). */
export class EasValidationError extends Schema.TaggedError<EasValidationError>()(
  "EasValidationError",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError) {}

/**
 * Build was submitted using a deprecated job format
 * (errorCode `TURTLE_DEPRECATED_JOB_FORMAT`).
 */
export class EasDeprecatedJobFormat extends Schema.TaggedError<EasDeprecatedJobFormat>()(
  "EasDeprecatedJobFormat",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError) {}

/** EAS Build is temporarily down for maintenance. */
export class EasBuildDownForMaintenance extends Schema.TaggedError<EasBuildDownForMaintenance>()(
  "EasBuildDownForMaintenance",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError) {}

/** Account is on the free tier and EAS Build has been disabled for it. */
export class EasBuildFreeTierDisabled extends Schema.TaggedError<EasBuildFreeTierDisabled>()(
  "EasBuildFreeTierDisabled",
  {
    message: Schema.String,
    platform: Schema.optional(Schema.Literals(["ios", "android"])),
  },
).pipe(Category.withServerError) {}

/** Free-tier monthly build quota has been exhausted. */
export class EasBuildFreeTierLimitExceeded extends Schema.TaggedError<EasBuildFreeTierLimitExceeded>()(
  "EasBuildFreeTierLimitExceeded",
  {
    message: Schema.String,
    platform: Schema.optional(Schema.Literals(["ios", "android"])),
  },
).pipe(Category.withServerError) {}

/** Account already has too many pending builds queued (back-pressure). */
export class EasBuildTooManyPendingBuilds extends Schema.TaggedError<EasBuildTooManyPendingBuilds>()(
  "EasBuildTooManyPendingBuilds",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError) {}

/**
 * The selected build resource class is not available on the free tier
 * (errorCode `EAS_BUILD_RESOURCE_CLASS_NOT_AVAILABLE_IN_FREE_TIER`).
 * Upgrade the account or pick a free-tier-eligible resource class.
 */
export class EasBuildResourceClassNotAvailableInFreeTier extends Schema.TaggedError<EasBuildResourceClassNotAvailableInFreeTier>()(
  "EasBuildResourceClassNotAvailableInFreeTier",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError) {}

/**
 * The requested legacy build resource class has been retired
 * (errorCode `EAS_BUILD_LEGACY_RESOURCE_CLASS_NOT_AVAILABLE`).
 */
export class EasBuildLegacyResourceClassNotAvailable extends Schema.TaggedError<EasBuildLegacyResourceClassNotAvailable>()(
  "EasBuildLegacyResourceClassNotAvailable",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError) {}

/**
 * Update channel with the same name already exists for the app
 * (errorCode `CHANNEL_ALREADY_EXISTS`).
 */
export class EasChannelAlreadyExists extends Schema.TaggedError<EasChannelAlreadyExists>()(
  "EasChannelAlreadyExists",
  {
    message: Schema.String,
  },
).pipe(
  Category.withCategory(Category.ConflictError, Category.AlreadyExistsError),
) {}

/**
 * The authenticated actor does not have permission to perform this operation
 * (errorCode `UNAUTHORIZED_ERROR`). Distinct from a missing/invalid token —
 * the token is valid but lacks the privacy/role grant required for the request.
 */
export class EasUnauthorizedOperation extends Schema.TaggedError<EasUnauthorizedOperation>()(
  "EasUnauthorizedOperation",
  {
    message: Schema.String,
  },
).pipe(Category.withAuthError) {}

/**
 * The Expo experience (project) referenced by slug/account does not exist
 * (errorCode `EXPERIENCE_NOT_FOUND`).
 */
export class EasExperienceNotFound extends Schema.TaggedError<EasExperienceNotFound>()(
  "EasExperienceNotFound",
  {
    message: Schema.String,
  },
).pipe(Category.withNotFoundError) {}

/**
 * The app does not yet have a `*.expo.app` dev domain name assigned
 * (errorCode `APP_NO_DEV_DOMAIN_NAME`). Required before creating
 * a hosting deployment URL — call `assignDevDomainName` first.
 */
export class EasAppNoDevDomainName extends Schema.TaggedError<EasAppNoDevDomainName>()(
  "EasAppNoDevDomainName",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * The requested dev domain name is already taken by another app
 * (errorCode `DEV_DOMAIN_NAME_TAKEN`).
 */
export class EasDevDomainNameTaken extends Schema.TaggedError<EasDevDomainNameTaken>()(
  "EasDevDomainNameTaken",
  {
    message: Schema.String,
  },
).pipe(
  Category.withCategory(Category.ConflictError, Category.AlreadyExistsError),
) {}

/**
 * Map from EAS GraphQL `extensions.errorCode` → typed error class.
 * Used by the protocol to surface known errors with a dedicated tag.
 */
// oxlint-disable-next-line no-explicit-any -- heterogeneous error class map
export const EAS_ERROR_CODE_MAP: Record<string, any> = {
  // The EAS backend emits the bare code `EAS_CLI_UPGRADE_REQUIRED`
  // (see eas-cli's EAS_CLI_UPGRADE_REQUIRED_ERROR_CODE constant which holds
  // the literal "EAS_CLI_UPGRADE_REQUIRED"). We previously mapped the wrong
  // string with a trailing `_ERROR` and missed the upgrade signal entirely.
  EAS_CLI_UPGRADE_REQUIRED: EasUpgradeRequired,
  VALIDATION_ERROR: EasValidationError,
  TURTLE_DEPRECATED_JOB_FORMAT: EasDeprecatedJobFormat,
  EAS_BUILD_DOWN_FOR_MAINTENANCE: EasBuildDownForMaintenance,
  EAS_BUILD_FREE_TIER_DISABLED: EasBuildFreeTierDisabled,
  EAS_BUILD_FREE_TIER_DISABLED_IOS: EasBuildFreeTierDisabled,
  EAS_BUILD_FREE_TIER_DISABLED_ANDROID: EasBuildFreeTierDisabled,
  EAS_BUILD_FREE_TIER_LIMIT_EXCEEDED: EasBuildFreeTierLimitExceeded,
  EAS_BUILD_FREE_TIER_IOS_LIMIT_EXCEEDED: EasBuildFreeTierLimitExceeded,
  EAS_BUILD_FREE_TIER_ANDROID_LIMIT_EXCEEDED: EasBuildFreeTierLimitExceeded,
  EAS_BUILD_TOO_MANY_PENDING_BUILDS: EasBuildTooManyPendingBuilds,
  EAS_BUILD_RESOURCE_CLASS_NOT_AVAILABLE_IN_FREE_TIER:
    EasBuildResourceClassNotAvailableInFreeTier,
  EAS_BUILD_LEGACY_RESOURCE_CLASS_NOT_AVAILABLE:
    EasBuildLegacyResourceClassNotAvailable,
  CHANNEL_ALREADY_EXISTS: EasChannelAlreadyExists,
  UNAUTHORIZED_ERROR: EasUnauthorizedOperation,
  EXPERIENCE_NOT_FOUND: EasExperienceNotFound,
  APP_NO_DEV_DOMAIN_NAME: EasAppNoDevDomainName,
  DEV_DOMAIN_NAME_TAKEN: EasDevDomainNameTaken,
};

/** Union of the EAS-specific tagged error classes above. */
export type EasTypedErrors =
  | EasUpgradeRequired
  | EasValidationError
  | EasDeprecatedJobFormat
  | EasBuildDownForMaintenance
  | EasBuildFreeTierDisabled
  | EasBuildFreeTierLimitExceeded
  | EasBuildTooManyPendingBuilds
  | EasBuildResourceClassNotAvailableInFreeTier
  | EasBuildLegacyResourceClassNotAvailable
  | EasChannelAlreadyExists
  | EasUnauthorizedOperation
  | EasExperienceNotFound
  | EasAppNoDevDomainName
  | EasDevDomainNameTaken;

/**
 * Errors that any EAS operation may surface beyond the core default classes:
 * the typed GraphQL error-code classes plus the client-level fallbacks.
 */
export type ClientErrors = EasTypedErrors | UnknownEasError | EasParseError;

/**
 * Default EAS operation errors: the shared HTTP status errors from core
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
