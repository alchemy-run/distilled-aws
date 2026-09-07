/**
 * Coinbase-specific error types.
 *
 * Re-exports common HTTP errors from sdk-core and adds Coinbase CDP-specific
 * error types based on the `ErrorType` enum from the OpenAPI spec.
 *
 * Coinbase errors have the shape:
 * ```json
 * {
 *   "errorType": "invalid_request",
 *   "errorMessage": "Invalid request.",
 *   "correlationId": "41deb8d59a9dc9a7-IAD",
 *   "errorLink": "https://docs.cdp.coinbase.com/api-reference/v2/errors#invalid-request"
 * }
 * ```
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
  BadRequest as CoreBadRequest,
  Conflict as CoreConflict,
  DefaultErrors as CoreDefaultErrors,
  Forbidden as CoreForbidden,
  Locked as CoreLocked,
  NotFound as CoreNotFound,
  UnprocessableEntity as CoreUnprocessableEntity,
} from "@distilled.cloud/core/errors";

import {
  BadGateway,
  BadRequest,
  Forbidden,
  InternalServerError,
  NotFound,
  ServiceUnavailable,
  TooManyRequests,
  Unauthorized,
} from "@distilled.cloud/core/errors";
import * as Schema from "effect/Schema";
import * as Category from "@distilled.cloud/core/category";

// ============================================================================
// Base fields shared by all Coinbase CDP errors
// ============================================================================

const CoinbaseErrorFields = {
  errorType: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
  correlationId: Schema.optional(Schema.String),
  errorLink: Schema.optional(Schema.String),
};

// ============================================================================
// Coinbase-specific error types (from the ErrorType enum in the OpenAPI spec)
// ============================================================================

// --- Payment / Billing ---

/**
 * Payment method required — a valid payment method is required (HTTP 402).
 * errorType: "payment_method_required" | "payment_required"
 */
export class PaymentRequired extends Schema.TaggedError<PaymentRequired>()(
  "PaymentRequired",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

// --- Idempotency ---

/**
 * Idempotency key conflict — the same key was used with different request params (HTTP 422).
 * errorType: "idempotency_error"
 */
export class IdempotencyError extends Schema.TaggedError<IdempotencyError>()(
  "IdempotencyError",
  CoinbaseErrorFields,
).pipe(Category.withConflictError) {}

// --- Resource Conflicts ---

/**
 * Resource already exists — trying to create a duplicate resource (HTTP 409).
 * errorType: "already_exists"
 */
export class AlreadyExists extends Schema.TaggedError<AlreadyExists>()(
  "AlreadyExists",
  CoinbaseErrorFields,
).pipe(Category.withAlreadyExistsError) {}

// --- Faucet ---

/**
 * Faucet limit exceeded — too many faucet requests.
 * errorType: "faucet_limit_exceeded"
 */
export class FaucetLimitExceeded extends Schema.TaggedError<FaucetLimitExceeded>()(
  "FaucetLimitExceeded",
  CoinbaseErrorFields,
).pipe(Category.withQuotaError) {}

// --- Query ---

/**
 * Invalid SQL query — the underlying SQL string is invalid.
 * errorType: "invalid_sql_query"
 */
export class InvalidSqlQuery extends Schema.TaggedError<InvalidSqlQuery>()(
  "InvalidSqlQuery",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

// --- Signing / Transaction ---

/**
 * Invalid signature — the transaction or message signature is invalid.
 * errorType: "invalid_signature"
 */
export class InvalidSignature extends Schema.TaggedError<InvalidSignature>()(
  "InvalidSignature",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Malformed transaction — the transaction data is malformed.
 * errorType: "malformed_transaction"
 */
export class MalformedTransaction extends Schema.TaggedError<MalformedTransaction>()(
  "MalformedTransaction",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Settlement failed — payment settlement could not be completed.
 * errorType: "settlement_failed"
 */
export class SettlementFailed extends Schema.TaggedError<SettlementFailed>()(
  "SettlementFailed",
  CoinbaseErrorFields,
).pipe(Category.withServerError) {}

// --- Timeout / Abort ---

/**
 * Request timed out — the server did not respond in time.
 * errorType: "timed_out"
 */
export class TimedOut extends Schema.TaggedError<TimedOut>()(
  "TimedOut",
  CoinbaseErrorFields,
).pipe(Category.withTimeoutError, Category.withRetryable()) {}

/**
 * Client closed request — the client disconnected before the response.
 * errorType: "client_closed_request"
 */
export class ClientClosedRequest extends Schema.TaggedError<ClientClosedRequest>()(
  "ClientClosedRequest",
  CoinbaseErrorFields,
).pipe(Category.withAbortedError) {}

/**
 * Request canceled — the request was canceled.
 * errorType: "request_canceled"
 */
export class RequestCanceled extends Schema.TaggedError<RequestCanceled>()(
  "RequestCanceled",
  CoinbaseErrorFields,
).pipe(Category.withAbortedError) {}

// --- Policy ---

/**
 * Policy violation — the request violated an account or project policy.
 * errorType: "policy_violation"
 */
export class PolicyViolation extends Schema.TaggedError<PolicyViolation>()(
  "PolicyViolation",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Policy in use — the policy cannot be deleted because it's in use.
 * errorType: "policy_in_use"
 */
export class PolicyInUse extends Schema.TaggedError<PolicyInUse>()(
  "PolicyInUse",
  CoinbaseErrorFields,
).pipe(Category.withConflictError) {}

// --- Account Limits / State ---

/**
 * Account limit exceeded — too many accounts created.
 * errorType: "account_limit_exceeded"
 */
export class AccountLimitExceeded extends Schema.TaggedError<AccountLimitExceeded>()(
  "AccountLimitExceeded",
  CoinbaseErrorFields,
).pipe(Category.withQuotaError) {}

/**
 * Insufficient balance — the account does not have enough funds.
 * errorType: "insufficient_balance"
 */
export class InsufficientBalance extends Schema.TaggedError<InsufficientBalance>()(
  "InsufficientBalance",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Account not ready — the account is not in a ready state for the operation.
 * errorType: "account_not_ready"
 */
export class AccountNotReady extends Schema.TaggedError<AccountNotReady>()(
  "AccountNotReady",
  CoinbaseErrorFields,
).pipe(Category.withRetryableError, Category.withRetryable()) {}

// --- MFA ---

/**
 * MFA required — multi-factor authentication is required.
 * errorType: "mfa_required"
 */
export class MfaRequired extends Schema.TaggedError<MfaRequired>()(
  "MfaRequired",
  CoinbaseErrorFields,
).pipe(Category.withAuthError) {}

/**
 * MFA already enrolled — the user already has MFA set up.
 * errorType: "mfa_already_enrolled"
 */
export class MfaAlreadyEnrolled extends Schema.TaggedError<MfaAlreadyEnrolled>()(
  "MfaAlreadyEnrolled",
  CoinbaseErrorFields,
).pipe(Category.withConflictError) {}

/**
 * MFA invalid code — the provided MFA code is incorrect.
 * errorType: "mfa_invalid_code"
 */
export class MfaInvalidCode extends Schema.TaggedError<MfaInvalidCode>()(
  "MfaInvalidCode",
  CoinbaseErrorFields,
).pipe(Category.withAuthError) {}

/**
 * MFA flow expired — the MFA verification flow has expired.
 * errorType: "mfa_flow_expired"
 */
export class MfaFlowExpired extends Schema.TaggedError<MfaFlowExpired>()(
  "MfaFlowExpired",
  CoinbaseErrorFields,
).pipe(Category.withAuthError) {}

/**
 * MFA not enrolled — the user has not set up MFA.
 * errorType: "mfa_not_enrolled"
 */
export class MfaNotEnrolled extends Schema.TaggedError<MfaNotEnrolled>()(
  "MfaNotEnrolled",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

// --- Network / Swap ---

/**
 * Network not tradable — the specified network does not support trading.
 * errorType: "network_not_tradable"
 */
export class NetworkNotTradable extends Schema.TaggedError<NetworkNotTradable>()(
  "NetworkNotTradable",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

// --- Guest (Onramp) ---

/**
 * Guest permission denied — the guest user does not have permission for this action.
 * errorType: "guest_permission_denied"
 */
export class GuestPermissionDenied extends Schema.TaggedError<GuestPermissionDenied>()(
  "GuestPermissionDenied",
  CoinbaseErrorFields,
).pipe(Category.withAuthError) {}

/**
 * Guest region forbidden — the guest user's region is not supported.
 * errorType: "guest_region_forbidden"
 */
export class GuestRegionForbidden extends Schema.TaggedError<GuestRegionForbidden>()(
  "GuestRegionForbidden",
  CoinbaseErrorFields,
).pipe(Category.withAuthError) {}

/**
 * Guest transaction limit — the guest user has exceeded their transaction amount limit.
 * errorType: "guest_transaction_limit"
 */
export class GuestTransactionLimit extends Schema.TaggedError<GuestTransactionLimit>()(
  "GuestTransactionLimit",
  CoinbaseErrorFields,
).pipe(Category.withQuotaError) {}

/**
 * Guest transaction count — the guest user has exceeded their transaction count limit.
 * errorType: "guest_transaction_count"
 */
export class GuestTransactionCount extends Schema.TaggedError<GuestTransactionCount>()(
  "GuestTransactionCount",
  CoinbaseErrorFields,
).pipe(Category.withQuotaError) {}

// --- Verification ---

/**
 * Phone number verification expired — the phone number verification has expired.
 * errorType: "phone_number_verification_expired"
 */
export class PhoneNumberVerificationExpired extends Schema.TaggedError<PhoneNumberVerificationExpired>()(
  "PhoneNumberVerificationExpired",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Document verification failed — the document verification check failed.
 * errorType: "document_verification_failed"
 */
export class DocumentVerificationFailed extends Schema.TaggedError<DocumentVerificationFailed>()(
  "DocumentVerificationFailed",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

// --- Recipient Allowlist ---

/**
 * Recipient allowlist violation — the recipient address is not on the allowlist.
 * errorType: "recipient_allowlist_violation"
 */
export class RecipientAllowlistViolation extends Schema.TaggedError<RecipientAllowlistViolation>()(
  "RecipientAllowlistViolation",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Recipient allowlist pending — the recipient address is pending allowlist approval.
 * errorType: "recipient_allowlist_pending"
 */
export class RecipientAllowlistPending extends Schema.TaggedError<RecipientAllowlistPending>()(
  "RecipientAllowlistPending",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

// --- Travel Rules ---

/**
 * Travel rules recipient violation — the recipient violates travel rule requirements.
 * errorType: "travel_rules_recipient_violation"
 */
export class TravelRulesRecipientViolation extends Schema.TaggedError<TravelRulesRecipientViolation>()(
  "TravelRulesRecipientViolation",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Travel rules field missing — a required travel rules field is missing.
 * errorType: "travel_rules_field_missing"
 */
export class TravelRulesFieldMissing extends Schema.TaggedError<TravelRulesFieldMissing>()(
  "TravelRulesFieldMissing",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

// --- Account Validation ---

/**
 * Source account invalid — the source account is not valid for this operation.
 * errorType: "source_account_invalid"
 */
export class SourceAccountInvalid extends Schema.TaggedError<SourceAccountInvalid>()(
  "SourceAccountInvalid",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Target account invalid — the target account is not valid for this operation.
 * errorType: "target_account_invalid"
 */
export class TargetAccountInvalid extends Schema.TaggedError<TargetAccountInvalid>()(
  "TargetAccountInvalid",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Source account not found — the source account does not exist.
 * errorType: "source_account_not_found"
 */
export class SourceAccountNotFound extends Schema.TaggedError<SourceAccountNotFound>()(
  "SourceAccountNotFound",
  CoinbaseErrorFields,
).pipe(Category.withNotFoundError) {}

/**
 * Target account not found — the target account does not exist.
 * errorType: "target_account_not_found"
 */
export class TargetAccountNotFound extends Schema.TaggedError<TargetAccountNotFound>()(
  "TargetAccountNotFound",
  CoinbaseErrorFields,
).pipe(Category.withNotFoundError) {}

// --- Asset Support ---

/**
 * Source asset not supported — the source asset is not supported for this operation.
 * errorType: "source_asset_not_supported"
 */
export class SourceAssetNotSupported extends Schema.TaggedError<SourceAssetNotSupported>()(
  "SourceAssetNotSupported",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Target asset not supported — the target asset is not supported for this operation.
 * errorType: "target_asset_not_supported"
 */
export class TargetAssetNotSupported extends Schema.TaggedError<TargetAssetNotSupported>()(
  "TargetAssetNotSupported",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Transfer asset not supported — the asset is not supported for transfers.
 * errorType: "transfer_asset_not_supported"
 */
export class TransferAssetNotSupported extends Schema.TaggedError<TransferAssetNotSupported>()(
  "TransferAssetNotSupported",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Asset mismatch — the source and target assets do not match as expected.
 * errorType: "asset_mismatch"
 */
export class AssetMismatch extends Schema.TaggedError<AssetMismatch>()(
  "AssetMismatch",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

// --- Transfer Validation ---

/**
 * Target email invalid — the target email address is not valid.
 * errorType: "target_email_invalid"
 */
export class TargetEmailInvalid extends Schema.TaggedError<TargetEmailInvalid>()(
  "TargetEmailInvalid",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Target onchain address invalid — the target onchain address is not valid.
 * errorType: "target_onchain_address_invalid"
 */
export class TargetOnchainAddressInvalid extends Schema.TaggedError<TargetOnchainAddressInvalid>()(
  "TargetOnchainAddressInvalid",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Transfer amount invalid — the transfer amount is not valid.
 * errorType: "transfer_amount_invalid"
 */
export class TransferAmountInvalid extends Schema.TaggedError<TransferAmountInvalid>()(
  "TransferAmountInvalid",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

// --- Metadata ---

/**
 * Metadata too many entries — too many metadata entries were provided.
 * errorType: "metadata_too_many_entries"
 */
export class MetadataTooManyEntries extends Schema.TaggedError<MetadataTooManyEntries>()(
  "MetadataTooManyEntries",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Metadata key too long — a metadata key exceeds the maximum length.
 * errorType: "metadata_key_too_long"
 */
export class MetadataKeyTooLong extends Schema.TaggedError<MetadataKeyTooLong>()(
  "MetadataKeyTooLong",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Metadata value too long — a metadata value exceeds the maximum length.
 * errorType: "metadata_value_too_long"
 */
export class MetadataValueTooLong extends Schema.TaggedError<MetadataValueTooLong>()(
  "MetadataValueTooLong",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

// --- Order ---

/**
 * Order quote expired — the order quote has expired and must be refreshed.
 * errorType: "order_quote_expired"
 */
export class OrderQuoteExpired extends Schema.TaggedError<OrderQuoteExpired>()(
  "OrderQuoteExpired",
  CoinbaseErrorFields,
).pipe(Category.withBadRequestError) {}

/**
 * Order already filled — the order has already been filled.
 * errorType: "order_already_filled"
 */
export class OrderAlreadyFilled extends Schema.TaggedError<OrderAlreadyFilled>()(
  "OrderAlreadyFilled",
  CoinbaseErrorFields,
).pipe(Category.withConflictError) {}

/**
 * Order already canceled — the order has already been canceled.
 * errorType: "order_already_canceled"
 */
export class OrderAlreadyCanceled extends Schema.TaggedError<OrderAlreadyCanceled>()(
  "OrderAlreadyCanceled",
  CoinbaseErrorFields,
).pipe(Category.withConflictError) {}

// ============================================================================
// Coinbase-specific HTTP status code mappings
// ============================================================================

/**
 * Coinbase HTTP status code to error class mapping.
 * Extends core HTTP_STATUS_MAP with Coinbase-specific statuses.
 */
export const COINBASE_HTTP_STATUS_MAP = {
  402: PaymentRequired,
} as const;

// ============================================================================
// Error type to error class mapping (for errorType-based dispatching)
// ============================================================================

/**
 * Maps standard Coinbase `errorType` values to core HTTP error classes.
 * These represent generic error types that map directly to HTTP status codes.
 */
export const STANDARD_ERROR_TYPE_MAP: Record<
  string,
  new (props: any) => unknown
> = {
  bad_gateway: BadGateway,
  forbidden: Forbidden,
  internal_server_error: InternalServerError,
  invalid_request: BadRequest,
  not_found: NotFound,
  rate_limit_exceeded: TooManyRequests,
  service_unavailable: ServiceUnavailable,
  unauthorized: Unauthorized,
} as const;

/**
 * Maps Coinbase-specific `errorType` values to their corresponding error classes.
 * Used by the protocol's matchError function for type-based error dispatching.
 */
export const ERROR_TYPE_MAP: Record<string, new (props: any) => unknown> = {
  // Resource conflicts
  already_exists: AlreadyExists,
  idempotency_error: IdempotencyError,
  policy_in_use: PolicyInUse,

  // Quota / limits
  faucet_limit_exceeded: FaucetLimitExceeded,
  account_limit_exceeded: AccountLimitExceeded,
  guest_transaction_limit: GuestTransactionLimit,
  guest_transaction_count: GuestTransactionCount,

  // Payment / billing
  payment_method_required: PaymentRequired,
  payment_required: PaymentRequired,
  settlement_failed: SettlementFailed,

  // Signing / transaction
  invalid_signature: InvalidSignature,
  invalid_sql_query: InvalidSqlQuery,
  malformed_transaction: MalformedTransaction,
  network_not_tradable: NetworkNotTradable,

  // Timeout / abort
  timed_out: TimedOut,
  client_closed_request: ClientClosedRequest,
  request_canceled: RequestCanceled,

  // Policy
  policy_violation: PolicyViolation,

  // Account state
  insufficient_balance: InsufficientBalance,
  account_not_ready: AccountNotReady,

  // MFA
  mfa_required: MfaRequired,
  mfa_already_enrolled: MfaAlreadyEnrolled,
  mfa_invalid_code: MfaInvalidCode,
  mfa_flow_expired: MfaFlowExpired,
  mfa_not_enrolled: MfaNotEnrolled,

  // Guest (onramp)
  guest_permission_denied: GuestPermissionDenied,
  guest_region_forbidden: GuestRegionForbidden,

  // Verification
  phone_number_verification_expired: PhoneNumberVerificationExpired,
  document_verification_failed: DocumentVerificationFailed,

  // Recipient allowlist
  recipient_allowlist_violation: RecipientAllowlistViolation,
  recipient_allowlist_pending: RecipientAllowlistPending,

  // Travel rules
  travel_rules_recipient_violation: TravelRulesRecipientViolation,
  travel_rules_field_missing: TravelRulesFieldMissing,

  // Account validation
  source_account_invalid: SourceAccountInvalid,
  target_account_invalid: TargetAccountInvalid,
  source_account_not_found: SourceAccountNotFound,
  target_account_not_found: TargetAccountNotFound,

  // Asset support
  source_asset_not_supported: SourceAssetNotSupported,
  target_asset_not_supported: TargetAssetNotSupported,
  transfer_asset_not_supported: TransferAssetNotSupported,
  asset_mismatch: AssetMismatch,

  // Transfer validation
  target_email_invalid: TargetEmailInvalid,
  target_onchain_address_invalid: TargetOnchainAddressInvalid,
  transfer_amount_invalid: TransferAmountInvalid,

  // Metadata
  metadata_too_many_entries: MetadataTooManyEntries,
  metadata_key_too_long: MetadataKeyTooLong,
  metadata_value_too_long: MetadataValueTooLong,

  // Order
  order_quote_expired: OrderQuoteExpired,
  order_already_filled: OrderAlreadyFilled,
  order_already_canceled: OrderAlreadyCanceled,
} as const;

// ============================================================================
// Catch-all errors
// ============================================================================

/**
 * Unknown Coinbase error — returned when an errorType is not recognized.
 */
export class UnknownCoinbaseError extends Schema.TaggedError<UnknownCoinbaseError>()(
  "UnknownCoinbaseError",
  {
    ...CoinbaseErrorFields,
    body: Schema.Unknown,
  },
).pipe(Category.withServerError) {}

/**
 * Schema parse error wrapper — returned when the response body fails schema decoding.
 */
export class CoinbaseParseError extends Schema.TaggedError<CoinbaseParseError>()(
  "CoinbaseParseError",
  {
    body: Schema.Unknown,
    cause: Schema.Unknown,
  },
).pipe(Category.withParseError) {}

// ============================================================================
// Error unions (the error channel of every generated operation)
// ============================================================================

/**
 * All Coinbase CDP typed errors that `errorType` dispatch can produce.
 */
export type CoinbaseTypedErrors =
  | PaymentRequired
  | IdempotencyError
  | AlreadyExists
  | FaucetLimitExceeded
  | InvalidSqlQuery
  | InvalidSignature
  | MalformedTransaction
  | SettlementFailed
  | TimedOut
  | ClientClosedRequest
  | RequestCanceled
  | PolicyViolation
  | PolicyInUse
  | AccountLimitExceeded
  | InsufficientBalance
  | AccountNotReady
  | MfaRequired
  | MfaAlreadyEnrolled
  | MfaInvalidCode
  | MfaFlowExpired
  | MfaNotEnrolled
  | NetworkNotTradable
  | GuestPermissionDenied
  | GuestRegionForbidden
  | GuestTransactionLimit
  | GuestTransactionCount
  | PhoneNumberVerificationExpired
  | DocumentVerificationFailed
  | RecipientAllowlistViolation
  | RecipientAllowlistPending
  | TravelRulesRecipientViolation
  | TravelRulesFieldMissing
  | SourceAccountInvalid
  | TargetAccountInvalid
  | SourceAccountNotFound
  | TargetAccountNotFound
  | SourceAssetNotSupported
  | TargetAssetNotSupported
  | TransferAssetNotSupported
  | AssetMismatch
  | TargetEmailInvalid
  | TargetOnchainAddressInvalid
  | TransferAmountInvalid
  | MetadataTooManyEntries
  | MetadataKeyTooLong
  | MetadataValueTooLong
  | OrderQuoteExpired
  | OrderAlreadyFilled
  | OrderAlreadyCanceled;

/**
 * Errors any Coinbase operation may surface beyond the core HTTP defaults:
 * the typed CDP errors plus the client-level fallback/decode errors.
 */
export type ClientErrors =
  | CoinbaseTypedErrors
  | UnknownCoinbaseError
  | CoinbaseParseError;

/**
 * Default Coinbase operation errors: the shared HTTP status errors from core
 * (both the always-possible defaults and the status-mapped 4xx classes the
 * global matcher can produce) plus the Coinbase client errors.
 */
export type DefaultErrors =
  | CoreDefaultErrors
  | CoreBadRequest
  | CoreForbidden
  | CoreNotFound
  | CoreConflict
  | CoreUnprocessableEntity
  | CoreLocked
  | ClientErrors;
