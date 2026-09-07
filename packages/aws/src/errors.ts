import * as S from "effect/Schema";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import * as Category from "./category.ts";
// Imported from the leaf module, not `traits.ts`: that one imports every
// protocol, and each protocol imports this file, so the annotation would not
// yet exist when these classes are built. See error-message.ts.
import * as T from "./error-message.ts";

/**
 * The canonical message member every error class carries.
 *
 * Tagged with `T.ErrorMessage` so the response parser can find the message
 * without guessing at spelling — see the trait's docs and distilled #160.
 */
const ErrorMessage = /*@__PURE__*/ S.optional(S.String).pipe(T.ErrorMessage());

//==== Common AWS Errors ====
export class AccessDeniedException extends S.TaggedError<AccessDeniedException>()(
  "AccessDeniedException",
  {
    // AWS explains WHICH action/resource was denied in the message — keep it
    // so callers (and test logs) can see the actual authorization failure.
    message: ErrorMessage,
  },
).pipe(Category.withAuthError) {}

export class ExpiredTokenException extends S.TaggedError<ExpiredTokenException>()(
  "ExpiredTokenException",
  { message: ErrorMessage },
).pipe(Category.withAuthError) {}

export class IncompleteSignature extends S.TaggedError<IncompleteSignature>()(
  "IncompleteSignature",
  { message: ErrorMessage },
).pipe(Category.withAuthError) {}

export class InternalFailure extends S.TaggedError<InternalFailure>()(
  "InternalFailure",
  { message: ErrorMessage },
).pipe(Category.withServerError) {}

export class MalformedHttpRequestException extends S.TaggedError<MalformedHttpRequestException>()(
  "MalformedHttpRequestException",
  { message: ErrorMessage },
).pipe(Category.withBadRequestError) {}

export class NotAuthorized extends S.TaggedError<NotAuthorized>()(
  "NotAuthorized",
  { message: ErrorMessage },
).pipe(Category.withAuthError) {}

export class OptInRequired extends S.TaggedError<OptInRequired>()(
  "OptInRequired",
  { message: ErrorMessage },
).pipe(Category.withAuthError) {}

export class RequestAbortedException extends S.TaggedError<RequestAbortedException>()(
  "RequestAbortedException",
  { message: ErrorMessage },
).pipe(Category.withAbortedError) {}

export class RequestEntityTooLargeException extends S.TaggedError<RequestEntityTooLargeException>()(
  "RequestEntityTooLargeException",
  { message: ErrorMessage },
).pipe(Category.withBadRequestError) {}

export class RequestExpired extends S.TaggedError<RequestExpired>()(
  "RequestExpired",
  { message: ErrorMessage },
).pipe(Category.withBadRequestError, Category.withTimeoutError) {}

export class RequestTimeoutException extends S.TaggedError<RequestTimeoutException>()(
  "RequestTimeoutException",
  { message: ErrorMessage },
).pipe(Category.withTimeoutError) {}

export class ServiceUnavailable extends S.TaggedError<ServiceUnavailable>()(
  "ServiceUnavailable",
  { message: ErrorMessage },
).pipe(Category.withServerError) {}

export class ThrottlingException extends S.TaggedError<ThrottlingException>()(
  "ThrottlingException",
  { message: ErrorMessage },
).pipe(Category.withThrottlingError) {}

export class UnrecognizedClientException extends S.TaggedError<UnrecognizedClientException>()(
  "UnrecognizedClientException",
  { message: ErrorMessage },
).pipe(Category.withAuthError) {}

export class UnknownOperationException extends S.TaggedError<UnknownOperationException>()(
  "UnknownOperationException",
  { message: ErrorMessage },
).pipe(Category.withBadRequestError) {}

export class ValidationError extends S.TaggedError<ValidationError>()(
  "ValidationError",
  { message: ErrorMessage },
).pipe(Category.withBadRequestError) {}

export class ValidationException extends S.TaggedError<ValidationException>()(
  "ValidationException",
  {
    /** The human-readable validation failure reason from the service. */
    message: ErrorMessage,
    /** Machine-readable reason code (e.g. "FIELD_VALIDATION_FAILED"). */
    reason: S.optional(S.String),
    /** Per-field validation failures, when the service reports them. */
    fieldList: S.optional(S.Any),
  },
).pipe(Category.withBadRequestError) {}

export class OperationAborted extends S.TaggedError<OperationAborted>()(
  "OperationAborted",
  { message: ErrorMessage },
).pipe(Category.withAbortedError) {}

export class UnknownAwsError extends S.TaggedError<UnknownAwsError>()(
  "UnknownAwsError",
  {
    errorTag: S.String,
    errorData: S.Any,
    /** The AWS service SDK ID (e.g., "S3", "DynamoDB") */
    service: S.optional(S.String),
    /** The operation name (e.g., "createBucket", "putObject") */
    operation: S.optional(S.String),
    message: S.String.pipe(T.ErrorMessage()),
  },
) {}

/**
 * Check if an error is a transient network error that should be retried.
 * These are low-level fetch/socket errors that indicate temporary connectivity issues.
 */
export const isTransientNetworkError = (err: unknown): boolean => {
  if (typeof err !== "object" || err === null) return false;
  const e = err as { code?: string; name?: string; cause?: unknown };
  // Check for common transient error codes
  if (
    e.code === "UND_ERR_SOCKET" ||
    e.code === "ECONNRESET" ||
    e.code === "UND_ERR_CONNECT_TIMEOUT" ||
    e.code === "EPIPE" ||
    e.name === "FetchError"
  ) {
    return true;
  }
  // Also check the cause chain for nested errors (fetch wraps errors)
  if (e.cause) {
    return isTransientNetworkError(e.cause);
  }
  return false;
};

/**
 * Error thrown when a fetch request fails due to a transient network issue.
 * Marked as retryable so the default retry policy will automatically retry these.
 */
export class TransientFetchError extends S.TaggedError<TransientFetchError>()(
  "TransientFetchError",
  {
    message: S.String.pipe(T.ErrorMessage()),
    cause: S.Any,
  },
).pipe(Category.withNetworkError) {}

export class InternalError extends S.TaggedError<InternalError>()(
  "InternalError",
  { message: ErrorMessage },
).pipe(Category.withServerError) {}

/** Error when endpoint resolution fails due to a rule error */
export class EndpointError extends S.TaggedError<EndpointError>()(
  "EndpointError",
  { message: S.String.pipe(T.ErrorMessage()) },
).pipe(Category.withServerError) {}

/** Error when no rule matches in the ruleset */
export class NoMatchingRuleError extends S.TaggedError<NoMatchingRuleError>()(
  "NoMatchingRuleError",
  { message: ErrorMessage },
) {}

export class ParseError extends S.TaggedError<ParseError>()("ParseError", {
  message: S.String.pipe(T.ErrorMessage()),
}) {}

export const COMMON_ERRORS = [
  AccessDeniedException,
  ExpiredTokenException,
  IncompleteSignature,
  InternalError,
  InternalFailure,
  MalformedHttpRequestException,
  NotAuthorized,
  OperationAborted,
  OptInRequired,
  RequestAbortedException,
  RequestEntityTooLargeException,
  RequestExpired,
  RequestTimeoutException,
  ServiceUnavailable,
  ThrottlingException,
  UnknownOperationException,
  UnrecognizedClientException,
  ValidationError,
  ValidationException,
] as const;

export type CommonAwsError =
  | AccessDeniedException
  | ExpiredTokenException
  | IncompleteSignature
  | InternalFailure
  | MalformedHttpRequestException
  | NotAuthorized
  | OptInRequired
  | RequestAbortedException
  | RequestEntityTooLargeException
  | RequestExpired
  | RequestTimeoutException
  | ServiceUnavailable
  | ThrottlingException
  | UnrecognizedClientException
  | UnknownOperationException
  | ValidationError
  | ValidationException
  | OperationAborted;

/**
 * All error types that can be returned by AWS operations.
 *
 * `HttpClientError` belongs here because `API.make` puts it in every
 * operation's error channel (the request can fail before any AWS response
 * exists — DNS, TLS, connection reset). Leaving it out made each generated
 * operation's declared type narrower than what it can actually fail with.
 */
export type CommonErrors =
  | UnknownAwsError
  | CommonAwsError
  | EndpointError
  | NoMatchingRuleError
  | HttpClientError.HttpClientError;
