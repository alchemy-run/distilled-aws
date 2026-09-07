import * as fs from "fs";
import * as path from "path";
import { Schema as S } from "effect";

/**
 * Schema for service error patches discovered by the AI agent.
 * These are stored in patches/{service}.json and applied during client generation.
 */

/**
 * Error category constants.
 * Matches the categories from the original distilled-aws/src/category.ts.
 */
export const ThrottlingError = "ThrottlingError" as const;
export const RetryableError = "RetryableError" as const;
export const ServerError = "ServerError" as const;
export const AuthError = "AuthError" as const;
export const BadRequestError = "BadRequestError" as const;
export const TimeoutError = "TimeoutError" as const;
export const ConflictError = "ConflictError" as const;
export const QuotaError = "QuotaError" as const;
export const NetworkError = "NetworkError" as const;
export const AbortedError = "AbortedError" as const;
export const NotFoundError = "NotFoundError" as const;
export const AlreadyExistsError = "AlreadyExistsError" as const;
export const DependencyViolationError = "DependencyViolationError" as const;

/**
 * Schema for error category strings.
 */
export const CategorySchema = S.Literals([
  ThrottlingError,
  RetryableError,
  ServerError,
  AuthError,
  BadRequestError,
  TimeoutError,
  ConflictError,
  QuotaError,
  NetworkError,
  AbortedError,
  NotFoundError,
  AlreadyExistsError,
  DependencyViolationError,
]);
export type CategorySchema = typeof CategorySchema.Type;

/**
 * Error alias - maps an error tag to an alternative name
 */
export const ErrorAlias = S.Struct({
  /**
   * The original error tag (e.g., "NotFound")
   */
  from: S.String,
  /**
   * The canonical error tag it should be aliased to (e.g., "NoSuchBucket")
   */
  to: S.String,
});
export type ErrorAlias = typeof ErrorAlias.Type;

/**
 * Message predicate for synthetic error matching.
 * A plain string is an exact match; the object form supports substring
 * (`includes`) and regular-expression (`matches`) predicates. An object
 * must specify at least one of `includes`/`matches` — an empty object
 * matches nothing.
 */
export const MessageMatcher = S.Union([
  S.String,
  S.Struct({
    includes: S.optional(S.String),
    matches: S.optional(S.String),
  }),
]);
export type MessageMatcher = typeof MessageMatcher.Type;

/**
 * Synthetic error - carves a NEW typed error class out of an existing wire
 * error using a message predicate. Some AWS services overload a single wire
 * error (e.g. X-Ray's InvalidRequestException) for semantically distinct
 * failures that are only distinguishable by message text. A synthetic error
 * gives each failure mode its own tag in the operation's typed error union;
 * the runtime checks synthetic matchers BEFORE the base wire-code lookup so
 * the tag specializes the base error.
 */
export const SyntheticError = S.Struct({
  /**
   * The new error tag to synthesize (e.g., "SamplingRuleNotFound").
   */
  name: S.String,
  /**
   * The wire error code this error derives from (e.g., "InvalidRequestException").
   * Compared against the wire code with Exception/Error suffix normalization.
   */
  from: S.String,
  /**
   * The message predicate that selects this error over the base wire error.
   */
  message: MessageMatcher,
});
export type SyntheticError = typeof SyntheticError.Type;

/**
 * Patches for a single operation
 */
export const OperationPatch = S.Struct({
  /**
   * Additional error types that should be included in this operation's error union.
   * These are error shape names (not full shape IDs).
   */
  errors: S.optional(S.Array(S.String)),
  /**
   * Error aliases - when AWS returns an error with one name that should be treated as another.
   * Useful for deduplicating errors like "Error" vs "ErrorException".
   */
  aliases: S.optional(S.Array(ErrorAlias)),
  /**
   * Synthetic errors - new error classes carved out of an existing wire error
   * by message predicate. Checked before the base error at runtime so the
   * synthetic tag specializes the overloaded wire error.
   */
  syntheticErrors: S.optional(S.Array(SyntheticError)),
});
export type OperationPatch = typeof OperationPatch.Type;

/**
 * Member override - specifies that a structure member should be treated differently
 * than what the Smithy model says (e.g., making a required field optional)
 */
export const MemberOverride = S.Struct({
  /**
   * Whether the field should be optional (true) or required (false).
   * If specified, overrides the Smithy model's required trait.
   */
  optional: S.optional(S.Boolean),
  /**
   * Marks a string member as sensitive even though the Smithy model lacks
   * the `@sensitive` trait (e.g. API Gateway's `ApiKey.value`). The member
   * is generated as `SensitiveString`: responses decode to
   * `Redacted<string>` and requests accept either a raw or Redacted value.
   */
  sensitive: S.optional(S.Boolean),
});
export type MemberOverride = typeof MemberOverride.Type;

/**
 * Enum override - specifies additional or replacement values for an enum.
 * Use this when AWS returns values not in the Smithy model, or with different casing.
 */
export const EnumOverride = S.Struct({
  /**
   * Additional values to add to the enum (merged with existing values).
   * Use this when AWS returns values not documented in the Smithy model.
   */
  add: S.optional(S.Array(S.String)),
  /**
   * Completely replace the enum values with these.
   * Use this when the Smithy model is wrong and you need full control.
   */
  replace: S.optional(S.Array(S.String)),
});
export type EnumOverride = typeof EnumOverride.Type;

/**
 * Structure override - specifies member overrides for a specific structure
 */
export const StructureOverride = S.Struct({
  /**
   * Map of member names to their overrides
   */
  members: S.Record(S.String, MemberOverride),
});
export type StructureOverride = typeof StructureOverride.Type;

/**
 * Union override - adds members to a Smithy union shape.
 * Use this when the live API returns a union variant that the published
 * Smithy model is missing (e.g. DataZone's ProvisioningProperties returns
 * `{ "manual": {} }` for CustomAwsService blueprints, but the model only
 * declares `cloudFormation`). The patch is applied to the loaded model
 * before code generation.
 */
export const UnionOverride = S.Struct({
  /**
   * Map of member names to their target shape ids (e.g. "smithy.api#Unit"
   * for an empty-struct variant, or a fully-qualified shape id already
   * present in the model). Members that already exist are left untouched.
   */
  add: S.Record(S.String, S.String),
});
export type UnionOverride = typeof UnionOverride.Type;

/**
 * Error member patch - adds a member to an error schema.
 * Use this for errors not fully documented in Smithy (e.g., PermanentRedirect).
 */
export const ErrorMemberPatch = S.Struct({
  /**
   * The type of the member (e.g., "string", "boolean", "number")
   */
  type: S.String,
  /**
   * Whether the field is optional (default: true)
   */
  optional: S.optional(S.Boolean),
  /**
   * HTTP header to extract this value from (e.g., "x-amz-bucket-region")
   */
  httpHeader: S.optional(S.String),
});
export type ErrorMemberPatch = typeof ErrorMemberPatch.Type;

/**
 * Error override - specifies members to add to an error schema
 */
export const ErrorOverride = S.Record(S.String, ErrorMemberPatch);
export type ErrorOverride = typeof ErrorOverride.Type;

/**
 * All patches for a service
 */
export const ServiceSpec = S.Struct({
  /**
   * Map of operation names to their patches
   */
  operations: S.optional(S.Record(S.String, OperationPatch)),
  /**
   * Map of structure names to their member overrides.
   * Use this to fix discrepancies between AWS Smithy models and actual API behavior.
   * For example, when AWS returns undefined for a field marked as required.
   */
  structures: S.optional(S.Record(S.String, StructureOverride)),
  /**
   * Map of union shape names to their member additions.
   * Use this when the live API returns union variants missing from the
   * published Smithy model. Applied to the loaded model before generation.
   */
  unions: S.optional(S.Record(S.String, UnionOverride)),
  /**
   * Map of enum names to their value overrides.
   * Use this to fix enums where AWS returns values not in the Smithy model,
   * or with different casing than documented.
   */
  enums: S.optional(S.Record(S.String, EnumOverride)),
  /**
   * Map of error names to their member patches.
   * Use this for errors not fully documented in Smithy models (e.g., PermanentRedirect).
   * Members can include traits like httpHeader to extract values from response headers.
   */
  errors: S.optional(S.Record(S.String, ErrorOverride)),
  /**
   * Map of error names to their categories.
   * Use this to add categories (like ThrottlingError) to errors that don't have
   * the @retryable trait in the Smithy model but should be treated as retryable.
   * Categories are applied globally to the error class, not per-operation.
   */
  errorCategories: S.optional(S.Record(S.String, S.Array(CategorySchema))),
  /**
   * Map of error names to the HTTP status code they arrive with on the wire.
   * Use this when a service returns REST errors that carry NO error code
   * (no X-Amzn-Errortype header, no __type/code body field) AND the Smithy
   * model lacks the `smithy.api#httpError` trait on the error shape — the
   * response parser's status-based fallback then has nothing to match (e.g.
   * MWAA's InvokeRestApi webserver proxy returns a bare 404
   * `{"message":"Environment not found"}` for ResourceNotFoundException).
   * The status is emitted as a `T.HttpError(n)` annotation on the error class.
   */
  errorHttpStatus: S.optional(S.Record(S.String, S.Number)),
});
export type ServiceSpec = typeof ServiceSpec.Type;

/**
 * Load spec patches for a service from patches/{sdkId}.json
 *
 * @param serviceSdkId - The SDK ID of the service (e.g., "S3", "DynamoDB")
 * @param baseDir - Base directory to resolve patches from (defaults to the aws-sdk package root)
 * @returns The parsed ServiceSpec, or a default empty spec if no patch file exists
 */
export const loadServiceSpecPatch = (
  serviceSdkId: string,
  baseDir?: string,
): ServiceSpec => {
  const root = baseDir ?? path.join(__dirname, "..");
  const specPath = path.join(
    root,
    "patches",
    `${serviceSdkId.toLowerCase().replaceAll(" ", "-")}.json`,
  );

  if (!fs.existsSync(specPath)) {
    return { operations: {} } as ServiceSpec;
  }
  const content = fs.readFileSync(specPath, "utf-8");
  const parsed = JSON.parse(content);
  try {
    return S.decodeUnknownSync(ServiceSpec)(parsed);
  } catch (error) {
    throw new Error(
      `Failed to decode patch file at ${specPath}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
