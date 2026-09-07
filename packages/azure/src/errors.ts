/**
 * Azure-specific error types — hand-written (ported verbatim from
 * distilled v0's `packages/azure/src/errors.ts`).
 *
 * Re-exports common HTTP errors from core and adds Azure-specific
 * error matching and API error types.
 *
 * Azure Resource Manager (ARM) returns errors in the format:
 * ```json
 * { "error": { "code": "ResourceNotFound", "message": "..." } }
 * ```
 *
 * The `code` field contains a machine-readable error code that can be
 * matched to typed error classes for precise error handling.
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

// ---------------------------------------------------------------------------
// Azure ARM error field schemas (shared by all Azure-specific errors)
// ---------------------------------------------------------------------------

const AzureErrorFields = {
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
};

const AzureAuthErrorFields = {
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
};

// ---------------------------------------------------------------------------
// Not-found errors
// ---------------------------------------------------------------------------

/**
 * Returned when the specified resource does not exist.
 * Azure error code: `ResourceNotFound`
 */
export class ResourceNotFound extends Schema.TaggedError<ResourceNotFound>()(
  "ResourceNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when the specified resource group does not exist.
 * Azure error code: `ResourceGroupNotFound`
 */
export class ResourceGroupNotFound extends Schema.TaggedError<ResourceGroupNotFound>()(
  "ResourceGroupNotFound",
  AzureErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Returned when the subscription ID is missing or invalid.
 * Azure error code: `MissingSubscription` or `SubscriptionNotFound`
 */
export class SubscriptionNotFound extends Schema.TaggedError<SubscriptionNotFound>()(
  "SubscriptionNotFound",
  AzureAuthErrorFields,
).pipe(Category.withNotFoundError) {}

// ---------------------------------------------------------------------------
// Auth errors
// ---------------------------------------------------------------------------

/**
 * Returned when the caller does not have permission to perform the operation.
 * Azure error code: `AuthorizationFailed`
 */
export class AuthorizationFailed extends Schema.TaggedError<AuthorizationFailed>()(
  "AuthorizationFailed",
  AzureAuthErrorFields,
).pipe(Category.withAuthError) {}

/**
 * Returned when the bearer token is invalid, expired, or missing required claims.
 * Azure error code: `InvalidAuthenticationToken`
 */
export class InvalidAuthenticationToken extends Schema.TaggedError<InvalidAuthenticationToken>()(
  "InvalidAuthenticationToken",
  AzureAuthErrorFields,
).pipe(Category.withAuthError) {}

/**
 * Returned when the token audience does not match the expected audience for
 * the resource being accessed.
 * Azure error code: `InvalidAuthenticationTokenAudience`
 */
export class InvalidAuthenticationTokenAudience extends Schema.TaggedError<InvalidAuthenticationTokenAudience>()(
  "InvalidAuthenticationTokenAudience",
  AzureAuthErrorFields,
).pipe(Category.withAuthError) {}

/**
 * Returned when the token tenant does not match the subscription tenant.
 * Azure error code: `InvalidAuthenticationTokenTenant`
 */
export class InvalidAuthenticationTokenTenant extends Schema.TaggedError<InvalidAuthenticationTokenTenant>()(
  "InvalidAuthenticationTokenTenant",
  AzureAuthErrorFields,
).pipe(Category.withAuthError) {}

/**
 * Returned when linked authorization for the request has failed.
 * Azure error code: `LinkedAuthorizationFailed`
 */
export class LinkedAuthorizationFailed extends Schema.TaggedError<LinkedAuthorizationFailed>()(
  "LinkedAuthorizationFailed",
  AzureAuthErrorFields,
).pipe(Category.withAuthError) {}

// ---------------------------------------------------------------------------
// Bad request / validation errors
// ---------------------------------------------------------------------------

/**
 * Returned when a request parameter is invalid.
 * Azure error code: `InvalidParameter`
 */
export class InvalidParameter extends Schema.TaggedError<InvalidParameter>()(
  "InvalidParameter",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when the resource type in the request is not valid.
 * Azure error code: `InvalidResourceType`
 */
export class InvalidResourceType extends Schema.TaggedError<InvalidResourceType>()(
  "InvalidResourceType",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when the resource name in the request is not valid.
 * Azure error code: `InvalidResourceName` or `InvalidResourceNameFormat`
 */
export class InvalidResourceName extends Schema.TaggedError<InvalidResourceName>()(
  "InvalidResourceName",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when the request template is not valid.
 * Azure error code: `InvalidRequestContent`
 */
export class InvalidRequestContent extends Schema.TaggedError<InvalidRequestContent>()(
  "InvalidRequestContent",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when a required property is missing from the request body.
 * Azure error code: `MissingRequiredProperty` or `PropertyRequired`
 */
export class MissingRequiredProperty extends Schema.TaggedError<MissingRequiredProperty>()(
  "MissingRequiredProperty",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when a request property value exceeds the allowed maximum.
 * Azure error code: `PropertyValueExceedsMaxLength` or similar
 */
export class InvalidPropertyValue extends Schema.TaggedError<InvalidPropertyValue>()(
  "InvalidPropertyValue",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

// ---------------------------------------------------------------------------
// Conflict errors
// ---------------------------------------------------------------------------

/**
 * Returned when a resource with the same name already exists and the operation
 * would conflict.
 * Azure error code: `Conflict`
 */
export class ResourceConflict extends Schema.TaggedError<ResourceConflict>()(
  "ResourceConflict",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Returned when a resource is being updated and a concurrent update conflicts.
 * Azure error code: `PreconditionFailed` or `ConditionNotMet`
 */
export class PreconditionFailed extends Schema.TaggedError<PreconditionFailed>()(
  "PreconditionFailed",
  AzureErrorFields,
).pipe(Category.withConflictError) {}

// ---------------------------------------------------------------------------
// Operation errors
// ---------------------------------------------------------------------------

/**
 * Returned when the requested operation is not allowed in the current state.
 * Azure error code: `OperationNotAllowed`
 */
export class OperationNotAllowed extends Schema.TaggedError<OperationNotAllowed>()(
  "OperationNotAllowed",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when the resource provider is not registered for the subscription.
 * Azure error code: `MissingRegistrationForType` or `MissingSubscriptionRegistration`
 */
export class MissingRegistration extends Schema.TaggedError<MissingRegistration>()(
  "MissingRegistration",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

// ---------------------------------------------------------------------------
// Throttling / quota errors
// ---------------------------------------------------------------------------

/**
 * Returned when a quota has been exceeded for the subscription.
 * Azure error code: `QuotaExceeded` or `ExceededMaxAccountCount`
 */
export class QuotaExceeded extends Schema.TaggedError<QuotaExceeded>()(
  "QuotaExceeded",
  AzureErrorFields,
).pipe(Category.withThrottlingError) {}

/**
 * Returned when the request has been throttled due to too many operations.
 * Azure error code: `RequestRateLimitExceeded` or `TooManyRequests`
 */
export class RequestRateLimitExceeded extends Schema.TaggedError<RequestRateLimitExceeded>()(
  "RequestRateLimitExceeded",
  AzureErrorFields,
).pipe(Category.withThrottlingError) {}

// ---------------------------------------------------------------------------
// Scope / location errors
// ---------------------------------------------------------------------------

/**
 * Returned when the requested location is not available for the resource type.
 * Azure error code: `LocationNotAvailableForResourceType`
 */
export class LocationNotAvailable extends Schema.TaggedError<LocationNotAvailable>()(
  "LocationNotAvailable",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Returned when the targeted scope is invalid for the operation.
 * Azure error code: `InvalidResourceScope` or `ScopeNotValid`
 */
export class InvalidScope extends Schema.TaggedError<InvalidScope>()(
  "InvalidScope",
  AzureErrorFields,
).pipe(Category.withBadRequestError) {}

// ---------------------------------------------------------------------------
// Azure error code → typed error class mapping
// ---------------------------------------------------------------------------

/**
 * Azure error code to typed error class mapping.
 * Used by the protocol's error matching to dispatch by ARM error code.
 */
export const AZURE_ERROR_CODE_MAP: Record<string, new (props: any) => unknown> =
  {
    // Not-found
    ResourceNotFound: ResourceNotFound,
    ResourceGroupNotFound: ResourceGroupNotFound,
    MissingSubscription: SubscriptionNotFound,
    SubscriptionNotFound: SubscriptionNotFound,

    // Auth
    AuthorizationFailed: AuthorizationFailed,
    InvalidAuthenticationToken: InvalidAuthenticationToken,
    InvalidAuthenticationTokenAudience: InvalidAuthenticationTokenAudience,
    InvalidAuthenticationTokenTenant: InvalidAuthenticationTokenTenant,
    LinkedAuthorizationFailed: LinkedAuthorizationFailed,

    // Bad request / validation
    InvalidParameter: InvalidParameter,
    InvalidParameterValue: InvalidParameter,
    InvalidResourceType: InvalidResourceType,
    InvalidResourceName: InvalidResourceName,
    InvalidResourceNameFormat: InvalidResourceName,
    InvalidRequestContent: InvalidRequestContent,
    MissingRequiredProperty: MissingRequiredProperty,
    PropertyRequired: MissingRequiredProperty,
    InvalidPropertyValue: InvalidPropertyValue,
    PropertyValueExceedsMaxLength: InvalidPropertyValue,

    // Conflict
    Conflict: ResourceConflict,
    PreconditionFailed: PreconditionFailed,
    ConditionNotMet: PreconditionFailed,

    // Operation / registration
    OperationNotAllowed: OperationNotAllowed,
    MissingRegistrationForType: MissingRegistration,
    MissingSubscriptionRegistration: MissingRegistration,

    // Throttling / quota
    QuotaExceeded: QuotaExceeded,
    ExceededMaxAccountCount: QuotaExceeded,
    RequestRateLimitExceeded: RequestRateLimitExceeded,
    TooManyRequests: RequestRateLimitExceeded,

    // Location / scope
    LocationNotAvailableForResourceType: LocationNotAvailable,
    InvalidResourceScope: InvalidScope,
    ScopeNotValid: InvalidScope,
  };

// ---------------------------------------------------------------------------
// Catch-all error classes
// ---------------------------------------------------------------------------

/** Unknown Azure error — returned when an error code is not recognized. */
export class UnknownAzureError extends Schema.TaggedError<UnknownAzureError>()(
  "UnknownAzureError",
  {
    code: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
    target: Schema.optional(Schema.String),
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/** Schema parse error wrapper for Azure responses. */
export class AzureParseError extends Schema.TaggedError<AzureParseError>()(
  "AzureParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

/** Union of every ARM-code-mapped typed error class. */
export type AzureApiError =
  | ResourceNotFound
  | ResourceGroupNotFound
  | SubscriptionNotFound
  | AuthorizationFailed
  | InvalidAuthenticationToken
  | InvalidAuthenticationTokenAudience
  | InvalidAuthenticationTokenTenant
  | LinkedAuthorizationFailed
  | InvalidParameter
  | InvalidResourceType
  | InvalidResourceName
  | InvalidRequestContent
  | MissingRequiredProperty
  | InvalidPropertyValue
  | ResourceConflict
  | PreconditionFailed
  | OperationNotAllowed
  | MissingRegistration
  | QuotaExceeded
  | RequestRateLimitExceeded
  | LocationNotAvailable
  | InvalidScope;
