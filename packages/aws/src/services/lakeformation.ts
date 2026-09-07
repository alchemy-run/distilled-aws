import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "LakeFormation",
  serviceShapeName: "AWSLakeFormation",
});
const auth = T.AwsAuthSigv4({ name: "lakeformation" });
const ver = T.ServiceVersion("2017-03-31");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err(
        "Invalid Configuration: FIPS and custom endpoint are not supported",
      );
    }
    if (UseDualStack === true) {
      return err(
        "Invalid Configuration: Dualstack and custom endpoint are not supported",
      );
    }
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://lakeformation-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://lakeformation-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://lakeformation.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://lakeformation.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EntityNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EntityNotFoundException>()(
    "EntityNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ExpiredException
  extends /*@__PURE__*/ S.TaggedError<ExpiredException>()(
    "ExpiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(410),
  ).pipe(C.withBadRequestError) {}
export class GlueEncryptionException
  extends /*@__PURE__*/ S.TaggedError<GlueEncryptionException>()(
    "GlueEncryptionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidLakeFormationPrincipal
  extends /*@__PURE__*/ S.TaggedError<InvalidLakeFormationPrincipal>()(
    "InvalidLakeFormationPrincipal",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "InvalidInputException",
      message: { includes: "Invalid principal" },
    }),
  ).pipe(C.withBadRequestError, C.withRetryableError) {}
export class LastServiceLinkedRoleRegistration
  extends /*@__PURE__*/ S.TaggedError<LastServiceLinkedRoleRegistration>()(
    "LastServiceLinkedRoleRegistration",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "InvalidInputException",
      message: { includes: "Must manually delete service-linked role" },
    }),
  ).pipe(C.withConflictError) {}
export class OperationTimeoutException
  extends /*@__PURE__*/ S.TaggedError<OperationTimeoutException>()(
    "OperationTimeoutException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class PermissionTypeMismatchException
  extends /*@__PURE__*/ S.TaggedError<PermissionTypeMismatchException>()(
    "PermissionTypeMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotReadyException>()(
    "ResourceNotReadyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNumberLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceNumberLimitExceededException>()(
    "ResourceNumberLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class StatisticsNotReadyYetException
  extends /*@__PURE__*/ S.TaggedError<StatisticsNotReadyYetException>()(
    "StatisticsNotReadyYetException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(420),
  ) {}
export class ThrottledException
  extends /*@__PURE__*/ S.TaggedError<ThrottledException>()(
    "ThrottledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TransactionCanceledException
  extends /*@__PURE__*/ S.TaggedError<TransactionCanceledException>()(
    "TransactionCanceledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TransactionCommitInProgressException
  extends /*@__PURE__*/ S.TaggedError<TransactionCommitInProgressException>()(
    "TransactionCommitInProgressException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TransactionCommittedException
  extends /*@__PURE__*/ S.TaggedError<TransactionCommittedException>()(
    "TransactionCommittedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class WorkUnitsNotReadyYetException
  extends /*@__PURE__*/ S.TaggedError<WorkUnitsNotReadyYetException>()(
    "WorkUnitsNotReadyYetException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(420),
  ) {}
export type CatalogIdString = string;
export interface CatalogResource {
  Id?: string;
}
export const CatalogResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }),
).annotate({
  identifier: "CatalogResource",
}) as any as S.Schema<CatalogResource>;
export type NameString = string;
export interface DatabaseResource {
  CatalogId?: string;
  Name: string;
}
export const DatabaseResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.optional(S.String), Name: S.String }),
).annotate({
  identifier: "DatabaseResource",
}) as any as S.Schema<DatabaseResource>;
export interface TableWildcard {}
export const TableWildcard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({ identifier: "TableWildcard" }) as any as S.Schema<TableWildcard>;
export interface TableResource {
  CatalogId?: string;
  DatabaseName: string;
  Name?: string;
  TableWildcard?: TableWildcard;
}
export const TableResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    Name: S.optional(S.String),
    TableWildcard: S.optional(TableWildcard),
  }),
).annotate({ identifier: "TableResource" }) as any as S.Schema<TableResource>;
export type ColumnNames = string[];
export const ColumnNames = /*@__PURE__*/ S.Array(S.String);
export interface ColumnWildcard {
  ExcludedColumnNames?: string[];
}
export const ColumnWildcard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExcludedColumnNames: S.optional(ColumnNames) }),
).annotate({ identifier: "ColumnWildcard" }) as any as S.Schema<ColumnWildcard>;
export interface TableWithColumnsResource {
  CatalogId?: string;
  DatabaseName: string;
  Name: string;
  ColumnNames?: string[];
  ColumnWildcard?: ColumnWildcard;
}
export const TableWithColumnsResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    Name: S.String,
    ColumnNames: S.optional(ColumnNames),
    ColumnWildcard: S.optional(ColumnWildcard),
  }),
).annotate({
  identifier: "TableWithColumnsResource",
}) as any as S.Schema<TableWithColumnsResource>;
export type ResourceArnString = string;
export interface DataLocationResource {
  CatalogId?: string;
  ResourceArn: string;
}
export const DataLocationResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.optional(S.String), ResourceArn: S.String }),
).annotate({
  identifier: "DataLocationResource",
}) as any as S.Schema<DataLocationResource>;
export interface DataCellsFilterResource {
  TableCatalogId?: string;
  DatabaseName?: string;
  TableName?: string;
  Name?: string;
}
export const DataCellsFilterResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableCatalogId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    TableName: S.optional(S.String),
    Name: S.optional(S.String),
  }),
).annotate({
  identifier: "DataCellsFilterResource",
}) as any as S.Schema<DataCellsFilterResource>;
export type LFTagValue = string;
export type TagValueList = string[];
export const TagValueList = /*@__PURE__*/ S.Array(S.String);
export interface LFTagKeyResource {
  CatalogId?: string;
  TagKey: string;
  TagValues: string[];
}
export const LFTagKeyResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    TagKey: S.String,
    TagValues: TagValueList,
  }),
).annotate({
  identifier: "LFTagKeyResource",
}) as any as S.Schema<LFTagKeyResource>;
export type ResourceType = "DATABASE" | "TABLE" | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export type LFTagKey = string;
export interface LFTag {
  TagKey: string;
  TagValues: string[];
}
export const LFTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagKey: S.String, TagValues: TagValueList }),
).annotate({ identifier: "LFTag" }) as any as S.Schema<LFTag>;
export type Expression = LFTag[];
export const Expression = /*@__PURE__*/ S.Array(LFTag);
export interface LFTagPolicyResource {
  CatalogId?: string;
  ResourceType: ResourceType;
  Expression?: LFTag[];
  ExpressionName?: string;
}
export const LFTagPolicyResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    ResourceType: ResourceType,
    Expression: S.optional(Expression),
    ExpressionName: S.optional(S.String),
  }),
).annotate({
  identifier: "LFTagPolicyResource",
}) as any as S.Schema<LFTagPolicyResource>;
export interface LFTagExpressionResource {
  CatalogId?: string;
  Name: string;
}
export const LFTagExpressionResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.optional(S.String), Name: S.String }),
).annotate({
  identifier: "LFTagExpressionResource",
}) as any as S.Schema<LFTagExpressionResource>;
export interface Resource {
  Catalog?: CatalogResource;
  Database?: DatabaseResource;
  Table?: TableResource;
  TableWithColumns?: TableWithColumnsResource;
  DataLocation?: DataLocationResource;
  DataCellsFilter?: DataCellsFilterResource;
  LFTag?: LFTagKeyResource;
  LFTagPolicy?: LFTagPolicyResource;
  LFTagExpression?: LFTagExpressionResource;
}
export const Resource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Catalog: S.optional(CatalogResource),
    Database: S.optional(DatabaseResource),
    Table: S.optional(TableResource),
    TableWithColumns: S.optional(TableWithColumnsResource),
    DataLocation: S.optional(DataLocationResource),
    DataCellsFilter: S.optional(DataCellsFilterResource),
    LFTag: S.optional(LFTagKeyResource),
    LFTagPolicy: S.optional(LFTagPolicyResource),
    LFTagExpression: S.optional(LFTagExpressionResource),
  }),
).annotate({ identifier: "Resource" }) as any as S.Schema<Resource>;
export interface LFTagPair {
  CatalogId?: string;
  TagKey: string;
  TagValues: string[];
}
export const LFTagPair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    TagKey: S.String,
    TagValues: TagValueList,
  }),
).annotate({ identifier: "LFTagPair" }) as any as S.Schema<LFTagPair>;
export type LFTagsList = LFTagPair[];
export const LFTagsList = /*@__PURE__*/ S.Array(LFTagPair);
export interface AddLFTagsToResourceRequest {
  CatalogId?: string;
  Resource: Resource;
  LFTags: LFTagPair[];
}
export const AddLFTagsToResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Resource: Resource,
    LFTags: LFTagsList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AddLFTagsToResource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AddLFTagsToResourceRequest",
}) as any as S.Schema<AddLFTagsToResourceRequest>;
export type DescriptionString = string;
export interface ErrorDetail {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const ErrorDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorDetail" }) as any as S.Schema<ErrorDetail>;
export interface LFTagError {
  LFTag?: LFTagPair;
  Error?: ErrorDetail;
}
export const LFTagError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LFTag: S.optional(LFTagPair), Error: S.optional(ErrorDetail) }),
).annotate({ identifier: "LFTagError" }) as any as S.Schema<LFTagError>;
export type LFTagErrors = LFTagError[];
export const LFTagErrors = /*@__PURE__*/ S.Array(LFTagError);
export interface AddLFTagsToResourceResponse {
  Failures?: LFTagError[];
}
export const AddLFTagsToResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Failures: S.optional(LFTagErrors) }),
).annotate({
  identifier: "AddLFTagsToResourceResponse",
}) as any as S.Schema<AddLFTagsToResourceResponse>;
export type SAMLAssertionString = string;
export type IAMRoleArn = string;
export type IAMSAMLProviderArn = string;
export type CredentialTimeoutDurationSecondInteger = number;
export interface AssumeDecoratedRoleWithSAMLRequest {
  SAMLAssertion: string;
  RoleArn: string;
  PrincipalArn: string;
  DurationSeconds?: number;
}
export const AssumeDecoratedRoleWithSAMLRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SAMLAssertion: S.String,
    RoleArn: S.String,
    PrincipalArn: S.String,
    DurationSeconds: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/AssumeDecoratedRoleWithSAML" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssumeDecoratedRoleWithSAMLRequest",
}) as any as S.Schema<AssumeDecoratedRoleWithSAMLRequest>;
export type AccessKeyIdString = string;
export type SecretAccessKeyString = string;
export type SessionTokenString = string;
export type ExpirationTimestamp = Date;
export interface AssumeDecoratedRoleWithSAMLResponse {
  AccessKeyId?: string;
  SecretAccessKey?: string | redacted.Redacted<string>;
  SessionToken?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export const AssumeDecoratedRoleWithSAMLResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessKeyId: S.optional(S.String),
    SecretAccessKey: S.optional(SensitiveString),
    SessionToken: S.optional(SensitiveString),
    Expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "AssumeDecoratedRoleWithSAMLResponse",
}) as any as S.Schema<AssumeDecoratedRoleWithSAMLResponse>;
export type Identifier = string;
export type DataLakePrincipalString = string;
export interface DataLakePrincipal {
  DataLakePrincipalIdentifier?: string;
}
export const DataLakePrincipal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataLakePrincipalIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "DataLakePrincipal",
}) as any as S.Schema<DataLakePrincipal>;
export type Permission =
  | "ALL"
  | "SELECT"
  | "ALTER"
  | "DROP"
  | "DELETE"
  | "INSERT"
  | "DESCRIBE"
  | "CREATE_DATABASE"
  | "CREATE_TABLE"
  | "DATA_LOCATION_ACCESS"
  | "CREATE_LF_TAG"
  | "ASSOCIATE"
  | "GRANT_WITH_LF_TAG_EXPRESSION"
  | "CREATE_LF_TAG_EXPRESSION"
  | "CREATE_CATALOG"
  | "SUPER_USER"
  | (string & {});
export const Permission = /*@__PURE__*/ S.String;

export type PermissionList = Permission[];
export const PermissionList = /*@__PURE__*/ S.Array(Permission);
export type ExpressionString = string;
export interface Condition {
  Expression?: string;
}
export const Condition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Expression: S.optional(S.String) }),
).annotate({ identifier: "Condition" }) as any as S.Schema<Condition>;
export interface BatchPermissionsRequestEntry {
  Id: string;
  Principal?: DataLakePrincipal;
  Resource?: Resource;
  Permissions?: Permission[];
  Condition?: Condition;
  PermissionsWithGrantOption?: Permission[];
}
export const BatchPermissionsRequestEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Principal: S.optional(DataLakePrincipal),
    Resource: S.optional(Resource),
    Permissions: S.optional(PermissionList),
    Condition: S.optional(Condition),
    PermissionsWithGrantOption: S.optional(PermissionList),
  }),
).annotate({
  identifier: "BatchPermissionsRequestEntry",
}) as any as S.Schema<BatchPermissionsRequestEntry>;
export type BatchPermissionsRequestEntryList = BatchPermissionsRequestEntry[];
export const BatchPermissionsRequestEntryList = /*@__PURE__*/ S.Array(
  BatchPermissionsRequestEntry,
);
export interface BatchGrantPermissionsRequest {
  CatalogId?: string;
  Entries: BatchPermissionsRequestEntry[];
}
export const BatchGrantPermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Entries: BatchPermissionsRequestEntryList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGrantPermissions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGrantPermissionsRequest",
}) as any as S.Schema<BatchGrantPermissionsRequest>;
export interface BatchPermissionsFailureEntry {
  RequestEntry?: BatchPermissionsRequestEntry;
  Error?: ErrorDetail;
}
export const BatchPermissionsFailureEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RequestEntry: S.optional(BatchPermissionsRequestEntry),
    Error: S.optional(ErrorDetail),
  }),
).annotate({
  identifier: "BatchPermissionsFailureEntry",
}) as any as S.Schema<BatchPermissionsFailureEntry>;
export type BatchPermissionsFailureList = BatchPermissionsFailureEntry[];
export const BatchPermissionsFailureList = /*@__PURE__*/ S.Array(
  BatchPermissionsFailureEntry,
);
export interface BatchGrantPermissionsResponse {
  Failures?: BatchPermissionsFailureEntry[];
}
export const BatchGrantPermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Failures: S.optional(BatchPermissionsFailureList) }),
).annotate({
  identifier: "BatchGrantPermissionsResponse",
}) as any as S.Schema<BatchGrantPermissionsResponse>;
export interface BatchRevokePermissionsRequest {
  CatalogId?: string;
  Entries: BatchPermissionsRequestEntry[];
}
export const BatchRevokePermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Entries: BatchPermissionsRequestEntryList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchRevokePermissions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchRevokePermissionsRequest",
}) as any as S.Schema<BatchRevokePermissionsRequest>;
export interface BatchRevokePermissionsResponse {
  Failures?: BatchPermissionsFailureEntry[];
}
export const BatchRevokePermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Failures: S.optional(BatchPermissionsFailureList) }),
).annotate({
  identifier: "BatchRevokePermissionsResponse",
}) as any as S.Schema<BatchRevokePermissionsResponse>;
export type TransactionIdString = string;
export interface CancelTransactionRequest {
  TransactionId: string;
}
export const CancelTransactionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransactionId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CancelTransaction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelTransactionRequest",
}) as any as S.Schema<CancelTransactionRequest>;
export interface CancelTransactionResponse {}
export const CancelTransactionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelTransactionResponse",
}) as any as S.Schema<CancelTransactionResponse>;
export interface CommitTransactionRequest {
  TransactionId: string;
}
export const CommitTransactionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransactionId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CommitTransaction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CommitTransactionRequest",
}) as any as S.Schema<CommitTransactionRequest>;
export type TransactionStatus =
  | "ACTIVE"
  | "COMMITTED"
  | "ABORTED"
  | "COMMIT_IN_PROGRESS"
  | (string & {});
export const TransactionStatus = /*@__PURE__*/ S.String;

export interface CommitTransactionResponse {
  TransactionStatus?: TransactionStatus;
}
export const CommitTransactionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransactionStatus: S.optional(TransactionStatus) }),
).annotate({
  identifier: "CommitTransactionResponse",
}) as any as S.Schema<CommitTransactionResponse>;
export type PredicateString = string;
export interface AllRowsWildcard {}
export const AllRowsWildcard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AllRowsWildcard",
}) as any as S.Schema<AllRowsWildcard>;
export interface RowFilter {
  FilterExpression?: string;
  AllRowsWildcard?: AllRowsWildcard;
}
export const RowFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterExpression: S.optional(S.String),
    AllRowsWildcard: S.optional(AllRowsWildcard),
  }),
).annotate({ identifier: "RowFilter" }) as any as S.Schema<RowFilter>;
export type VersionString = string;
export interface DataCellsFilter {
  TableCatalogId: string;
  DatabaseName: string;
  TableName: string;
  Name: string;
  RowFilter?: RowFilter;
  ColumnNames?: string[];
  ColumnWildcard?: ColumnWildcard;
  VersionId?: string;
}
export const DataCellsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableCatalogId: S.String,
    DatabaseName: S.String,
    TableName: S.String,
    Name: S.String,
    RowFilter: S.optional(RowFilter),
    ColumnNames: S.optional(ColumnNames),
    ColumnWildcard: S.optional(ColumnWildcard),
    VersionId: S.optional(S.String),
  }),
).annotate({
  identifier: "DataCellsFilter",
}) as any as S.Schema<DataCellsFilter>;
export interface CreateDataCellsFilterRequest {
  TableData: DataCellsFilter;
}
export const CreateDataCellsFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableData: DataCellsFilter }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateDataCellsFilter" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDataCellsFilterRequest",
}) as any as S.Schema<CreateDataCellsFilterRequest>;
export interface CreateDataCellsFilterResponse {}
export const CreateDataCellsFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateDataCellsFilterResponse",
}) as any as S.Schema<CreateDataCellsFilterResponse>;
export type IdentityCenterInstanceArn = string;
export type EnableStatus = "ENABLED" | "DISABLED" | (string & {});
export const EnableStatus = /*@__PURE__*/ S.String;

export type ScopeTarget = string;
export type ScopeTargets = string[];
export const ScopeTargets = /*@__PURE__*/ S.Array(S.String);
export interface ExternalFilteringConfiguration {
  Status: EnableStatus;
  AuthorizedTargets: string[];
}
export const ExternalFilteringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: EnableStatus, AuthorizedTargets: ScopeTargets }),
).annotate({
  identifier: "ExternalFilteringConfiguration",
}) as any as S.Schema<ExternalFilteringConfiguration>;
export type DataLakePrincipalList = DataLakePrincipal[];
export const DataLakePrincipalList = /*@__PURE__*/ S.Array(DataLakePrincipal);
export type ServiceAuthorization = "ENABLED" | "DISABLED" | (string & {});
export const ServiceAuthorization = /*@__PURE__*/ S.String;

export interface RedshiftConnect {
  Authorization: ServiceAuthorization;
}
export const RedshiftConnect = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Authorization: ServiceAuthorization }),
).annotate({
  identifier: "RedshiftConnect",
}) as any as S.Schema<RedshiftConnect>;
export type RedshiftScopeUnion = { RedshiftConnect: RedshiftConnect };
export const RedshiftScopeUnion = /*@__PURE__*/ S.Union([
  S.Struct({ RedshiftConnect: RedshiftConnect }),
]);
export type RedshiftServiceIntegrations = RedshiftScopeUnion[];
export const RedshiftServiceIntegrations =
  /*@__PURE__*/ S.Array(RedshiftScopeUnion);
export type ServiceIntegrationUnion = { Redshift: RedshiftScopeUnion[] };
export const ServiceIntegrationUnion = /*@__PURE__*/ S.Union([
  S.Struct({ Redshift: RedshiftServiceIntegrations }),
]);
export type ServiceIntegrationList = ServiceIntegrationUnion[];
export const ServiceIntegrationList = /*@__PURE__*/ S.Array(
  ServiceIntegrationUnion,
);
export interface CreateLakeFormationIdentityCenterConfigurationRequest {
  CatalogId?: string;
  InstanceArn?: string;
  ExternalFiltering?: ExternalFilteringConfiguration;
  ShareRecipients?: DataLakePrincipal[];
  ServiceIntegrations?: ServiceIntegrationUnion[];
}
export const CreateLakeFormationIdentityCenterConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CatalogId: S.optional(S.String),
      InstanceArn: S.optional(S.String),
      ExternalFiltering: S.optional(ExternalFilteringConfiguration),
      ShareRecipients: S.optional(DataLakePrincipalList),
      ServiceIntegrations: S.optional(ServiceIntegrationList),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/CreateLakeFormationIdentityCenterConfiguration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateLakeFormationIdentityCenterConfigurationRequest",
  }) as any as S.Schema<CreateLakeFormationIdentityCenterConfigurationRequest>;
export type ApplicationArn = string;
export interface CreateLakeFormationIdentityCenterConfigurationResponse {
  ApplicationArn?: string;
}
export const CreateLakeFormationIdentityCenterConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ApplicationArn: S.optional(S.String) }),
  ).annotate({
    identifier: "CreateLakeFormationIdentityCenterConfigurationResponse",
  }) as any as S.Schema<CreateLakeFormationIdentityCenterConfigurationResponse>;
export interface CreateLakeFormationOptInRequest {
  Principal: DataLakePrincipal;
  Resource: Resource;
  Condition?: Condition;
}
export const CreateLakeFormationOptInRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Principal: DataLakePrincipal,
    Resource: Resource,
    Condition: S.optional(Condition),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateLakeFormationOptIn" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLakeFormationOptInRequest",
}) as any as S.Schema<CreateLakeFormationOptInRequest>;
export interface CreateLakeFormationOptInResponse {}
export const CreateLakeFormationOptInResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateLakeFormationOptInResponse",
}) as any as S.Schema<CreateLakeFormationOptInResponse>;
export interface CreateLFTagRequest {
  CatalogId?: string;
  TagKey: string;
  TagValues: string[];
}
export const CreateLFTagRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    TagKey: S.String,
    TagValues: TagValueList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateLFTag" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLFTagRequest",
}) as any as S.Schema<CreateLFTagRequest>;
export interface CreateLFTagResponse {}
export const CreateLFTagResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateLFTagResponse",
}) as any as S.Schema<CreateLFTagResponse>;
export interface CreateLFTagExpressionRequest {
  Name: string;
  Description?: string;
  CatalogId?: string;
  Expression: LFTag[];
}
export const CreateLFTagExpressionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    CatalogId: S.optional(S.String),
    Expression: Expression,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateLFTagExpression" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLFTagExpressionRequest",
}) as any as S.Schema<CreateLFTagExpressionRequest>;
export interface CreateLFTagExpressionResponse {}
export const CreateLFTagExpressionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateLFTagExpressionResponse",
}) as any as S.Schema<CreateLFTagExpressionResponse>;
export interface DeleteDataCellsFilterRequest {
  TableCatalogId?: string;
  DatabaseName?: string;
  TableName?: string;
  Name?: string;
}
export const DeleteDataCellsFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableCatalogId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    TableName: S.optional(S.String),
    Name: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteDataCellsFilter" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDataCellsFilterRequest",
}) as any as S.Schema<DeleteDataCellsFilterRequest>;
export interface DeleteDataCellsFilterResponse {}
export const DeleteDataCellsFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDataCellsFilterResponse",
}) as any as S.Schema<DeleteDataCellsFilterResponse>;
export interface DeleteLakeFormationIdentityCenterConfigurationRequest {
  CatalogId?: string;
}
export const DeleteLakeFormationIdentityCenterConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ CatalogId: S.optional(S.String) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/DeleteLakeFormationIdentityCenterConfiguration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteLakeFormationIdentityCenterConfigurationRequest",
  }) as any as S.Schema<DeleteLakeFormationIdentityCenterConfigurationRequest>;
export interface DeleteLakeFormationIdentityCenterConfigurationResponse {}
export const DeleteLakeFormationIdentityCenterConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteLakeFormationIdentityCenterConfigurationResponse",
  }) as any as S.Schema<DeleteLakeFormationIdentityCenterConfigurationResponse>;
export interface DeleteLakeFormationOptInRequest {
  Principal: DataLakePrincipal;
  Resource: Resource;
  Condition?: Condition;
}
export const DeleteLakeFormationOptInRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Principal: DataLakePrincipal,
    Resource: Resource,
    Condition: S.optional(Condition),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteLakeFormationOptIn" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLakeFormationOptInRequest",
}) as any as S.Schema<DeleteLakeFormationOptInRequest>;
export interface DeleteLakeFormationOptInResponse {}
export const DeleteLakeFormationOptInResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLakeFormationOptInResponse",
}) as any as S.Schema<DeleteLakeFormationOptInResponse>;
export interface DeleteLFTagRequest {
  CatalogId?: string;
  TagKey: string;
}
export const DeleteLFTagRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.optional(S.String), TagKey: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteLFTag" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLFTagRequest",
}) as any as S.Schema<DeleteLFTagRequest>;
export interface DeleteLFTagResponse {}
export const DeleteLFTagResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLFTagResponse",
}) as any as S.Schema<DeleteLFTagResponse>;
export interface DeleteLFTagExpressionRequest {
  Name: string;
  CatalogId?: string;
}
export const DeleteLFTagExpressionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, CatalogId: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteLFTagExpression" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLFTagExpressionRequest",
}) as any as S.Schema<DeleteLFTagExpressionRequest>;
export interface DeleteLFTagExpressionResponse {}
export const DeleteLFTagExpressionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLFTagExpressionResponse",
}) as any as S.Schema<DeleteLFTagExpressionResponse>;
export type URI = string;
export type ETagString = string;
export interface VirtualObject {
  Uri: string;
  ETag?: string;
}
export const VirtualObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Uri: S.String, ETag: S.optional(S.String) }),
).annotate({ identifier: "VirtualObject" }) as any as S.Schema<VirtualObject>;
export type VirtualObjectList = VirtualObject[];
export const VirtualObjectList = /*@__PURE__*/ S.Array(VirtualObject);
export interface DeleteObjectsOnCancelRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  TransactionId: string;
  Objects: VirtualObject[];
}
export const DeleteObjectsOnCancelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    TransactionId: S.String,
    Objects: VirtualObjectList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteObjectsOnCancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteObjectsOnCancelRequest",
}) as any as S.Schema<DeleteObjectsOnCancelRequest>;
export interface DeleteObjectsOnCancelResponse {}
export const DeleteObjectsOnCancelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteObjectsOnCancelResponse",
}) as any as S.Schema<DeleteObjectsOnCancelResponse>;
export interface DeregisterResourceRequest {
  ResourceArn: string;
}
export const DeregisterResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeregisterResource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeregisterResourceRequest",
}) as any as S.Schema<DeregisterResourceRequest>;
export interface DeregisterResourceResponse {}
export const DeregisterResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeregisterResourceResponse",
}) as any as S.Schema<DeregisterResourceResponse>;
export interface DescribeLakeFormationIdentityCenterConfigurationRequest {
  CatalogId?: string;
}
export const DescribeLakeFormationIdentityCenterConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ CatalogId: S.optional(S.String) }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/DescribeLakeFormationIdentityCenterConfiguration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeLakeFormationIdentityCenterConfigurationRequest",
  }) as any as S.Schema<DescribeLakeFormationIdentityCenterConfigurationRequest>;
export type RAMResourceShareArn = string;
export interface DescribeLakeFormationIdentityCenterConfigurationResponse {
  CatalogId?: string;
  InstanceArn?: string;
  ApplicationArn?: string;
  ExternalFiltering?: ExternalFilteringConfiguration;
  ShareRecipients?: DataLakePrincipal[];
  ServiceIntegrations?: ServiceIntegrationUnion[];
  ResourceShare?: string;
}
export const DescribeLakeFormationIdentityCenterConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CatalogId: S.optional(S.String),
      InstanceArn: S.optional(S.String),
      ApplicationArn: S.optional(S.String),
      ExternalFiltering: S.optional(ExternalFilteringConfiguration),
      ShareRecipients: S.optional(DataLakePrincipalList),
      ServiceIntegrations: S.optional(ServiceIntegrationList),
      ResourceShare: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeLakeFormationIdentityCenterConfigurationResponse",
  }) as any as S.Schema<DescribeLakeFormationIdentityCenterConfigurationResponse>;
export interface DescribeResourceRequest {
  ResourceArn: string;
}
export const DescribeResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeResource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeResourceRequest",
}) as any as S.Schema<DescribeResourceRequest>;
export type LastModifiedTimestamp = Date;
export type VerificationStatus =
  | "VERIFIED"
  | "VERIFICATION_FAILED"
  | "NOT_VERIFIED"
  | (string & {});
export const VerificationStatus = /*@__PURE__*/ S.String;

export type AccountIdString = string;
export interface ResourceInfo {
  ResourceArn?: string;
  RoleArn?: string;
  LastModified?: Date;
  WithFederation?: boolean;
  HybridAccessEnabled?: boolean;
  WithPrivilegedAccess?: boolean;
  VerificationStatus?: VerificationStatus;
  ExpectedResourceOwnerAccount?: string;
}
export const ResourceInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    RoleArn: S.optional(S.String),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    WithFederation: S.optional(S.Boolean),
    HybridAccessEnabled: S.optional(S.Boolean),
    WithPrivilegedAccess: S.optional(S.Boolean),
    VerificationStatus: S.optional(VerificationStatus),
    ExpectedResourceOwnerAccount: S.optional(S.String),
  }),
).annotate({ identifier: "ResourceInfo" }) as any as S.Schema<ResourceInfo>;
export interface DescribeResourceResponse {
  ResourceInfo?: ResourceInfo;
}
export const DescribeResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceInfo: S.optional(ResourceInfo) }),
).annotate({
  identifier: "DescribeResourceResponse",
}) as any as S.Schema<DescribeResourceResponse>;
export interface DescribeTransactionRequest {
  TransactionId: string;
}
export const DescribeTransactionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransactionId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DescribeTransaction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTransactionRequest",
}) as any as S.Schema<DescribeTransactionRequest>;
export interface TransactionDescription {
  TransactionId?: string;
  TransactionStatus?: TransactionStatus;
  TransactionStartTime?: Date;
  TransactionEndTime?: Date;
}
export const TransactionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransactionId: S.optional(S.String),
    TransactionStatus: S.optional(TransactionStatus),
    TransactionStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TransactionEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "TransactionDescription",
}) as any as S.Schema<TransactionDescription>;
export interface DescribeTransactionResponse {
  TransactionDescription?: TransactionDescription;
}
export const DescribeTransactionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransactionDescription: S.optional(TransactionDescription) }),
).annotate({
  identifier: "DescribeTransactionResponse",
}) as any as S.Schema<DescribeTransactionResponse>;
export interface ExtendTransactionRequest {
  TransactionId?: string;
}
export const ExtendTransactionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransactionId: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ExtendTransaction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExtendTransactionRequest",
}) as any as S.Schema<ExtendTransactionRequest>;
export interface ExtendTransactionResponse {}
export const ExtendTransactionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ExtendTransactionResponse",
}) as any as S.Schema<ExtendTransactionResponse>;
export interface GetDataCellsFilterRequest {
  TableCatalogId: string;
  DatabaseName: string;
  TableName: string;
  Name: string;
}
export const GetDataCellsFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableCatalogId: S.String,
    DatabaseName: S.String,
    TableName: S.String,
    Name: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetDataCellsFilter" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataCellsFilterRequest",
}) as any as S.Schema<GetDataCellsFilterRequest>;
export interface GetDataCellsFilterResponse {
  DataCellsFilter?: DataCellsFilter;
}
export const GetDataCellsFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataCellsFilter: S.optional(DataCellsFilter) }),
).annotate({
  identifier: "GetDataCellsFilterResponse",
}) as any as S.Schema<GetDataCellsFilterResponse>;
export interface GetDataLakePrincipalRequest {}
export const GetDataLakePrincipalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetDataLakePrincipal" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataLakePrincipalRequest",
}) as any as S.Schema<GetDataLakePrincipalRequest>;
export type IdentityString = string;
export interface GetDataLakePrincipalResponse {
  Identity?: string;
}
export const GetDataLakePrincipalResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identity: S.optional(S.String) }),
).annotate({
  identifier: "GetDataLakePrincipalResponse",
}) as any as S.Schema<GetDataLakePrincipalResponse>;
export interface GetDataLakeSettingsRequest {
  CatalogId?: string;
}
export const GetDataLakeSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetDataLakeSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataLakeSettingsRequest",
}) as any as S.Schema<GetDataLakeSettingsRequest>;
export interface PrincipalPermissions {
  Principal?: DataLakePrincipal;
  Permissions?: Permission[];
}
export const PrincipalPermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Principal: S.optional(DataLakePrincipal),
    Permissions: S.optional(PermissionList),
  }),
).annotate({
  identifier: "PrincipalPermissions",
}) as any as S.Schema<PrincipalPermissions>;
export type PrincipalPermissionsList = PrincipalPermissions[];
export const PrincipalPermissionsList =
  /*@__PURE__*/ S.Array(PrincipalPermissions);
export type KeyString = string;
export type ParametersMapValue = string;
export type ParametersMap = { [key: string]: string | undefined };
export const ParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type TrustedResourceOwners = string[];
export const TrustedResourceOwners = /*@__PURE__*/ S.Array(S.String);
export type AuthorizedSessionTagValueList = string[];
export const AuthorizedSessionTagValueList = /*@__PURE__*/ S.Array(S.String);
export interface DataLakeSettings {
  DataLakeAdmins?: DataLakePrincipal[];
  ReadOnlyAdmins?: DataLakePrincipal[];
  CreateDatabaseDefaultPermissions?: PrincipalPermissions[];
  CreateTableDefaultPermissions?: PrincipalPermissions[];
  Parameters?: { [key: string]: string | undefined };
  TrustedResourceOwners?: string[];
  AllowExternalDataFiltering?: boolean;
  AllowFullTableExternalDataAccess?: boolean;
  ExternalDataFilteringAllowList?: DataLakePrincipal[];
  AuthorizedSessionTagValueList?: string[];
}
export const DataLakeSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataLakeAdmins: S.optional(DataLakePrincipalList),
    ReadOnlyAdmins: S.optional(DataLakePrincipalList),
    CreateDatabaseDefaultPermissions: S.optional(PrincipalPermissionsList),
    CreateTableDefaultPermissions: S.optional(PrincipalPermissionsList),
    Parameters: S.optional(ParametersMap),
    TrustedResourceOwners: S.optional(TrustedResourceOwners),
    AllowExternalDataFiltering: S.optional(S.Boolean),
    AllowFullTableExternalDataAccess: S.optional(S.Boolean),
    ExternalDataFilteringAllowList: S.optional(DataLakePrincipalList),
    AuthorizedSessionTagValueList: S.optional(AuthorizedSessionTagValueList),
  }),
).annotate({
  identifier: "DataLakeSettings",
}) as any as S.Schema<DataLakeSettings>;
export interface GetDataLakeSettingsResponse {
  DataLakeSettings?: DataLakeSettings;
}
export const GetDataLakeSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataLakeSettings: S.optional(DataLakeSettings) }),
).annotate({
  identifier: "GetDataLakeSettingsResponse",
}) as any as S.Schema<GetDataLakeSettingsResponse>;
export type Token = string;
export type PageSize = number;
export interface GetEffectivePermissionsForPathRequest {
  CatalogId?: string;
  ResourceArn: string;
  NextToken?: string;
  MaxResults?: number;
}
export const GetEffectivePermissionsForPathRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CatalogId: S.optional(S.String),
      ResourceArn: S.String,
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/GetEffectivePermissionsForPath" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetEffectivePermissionsForPathRequest",
}) as any as S.Schema<GetEffectivePermissionsForPathRequest>;
export type ResourceShareList = string[];
export const ResourceShareList = /*@__PURE__*/ S.Array(S.String);
export interface DetailsMap {
  ResourceShare?: string[];
}
export const DetailsMap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceShare: S.optional(ResourceShareList) }),
).annotate({ identifier: "DetailsMap" }) as any as S.Schema<DetailsMap>;
export interface PrincipalResourcePermissions {
  Principal?: DataLakePrincipal;
  Resource?: Resource;
  Condition?: Condition;
  Permissions?: Permission[];
  PermissionsWithGrantOption?: Permission[];
  AdditionalDetails?: DetailsMap;
  LastUpdated?: Date;
  LastUpdatedBy?: string;
}
export const PrincipalResourcePermissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Principal: S.optional(DataLakePrincipal),
    Resource: S.optional(Resource),
    Condition: S.optional(Condition),
    Permissions: S.optional(PermissionList),
    PermissionsWithGrantOption: S.optional(PermissionList),
    AdditionalDetails: S.optional(DetailsMap),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "PrincipalResourcePermissions",
}) as any as S.Schema<PrincipalResourcePermissions>;
export type PrincipalResourcePermissionsList = PrincipalResourcePermissions[];
export const PrincipalResourcePermissionsList = /*@__PURE__*/ S.Array(
  PrincipalResourcePermissions,
);
export interface GetEffectivePermissionsForPathResponse {
  Permissions?: PrincipalResourcePermissions[];
  NextToken?: string;
}
export const GetEffectivePermissionsForPathResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Permissions: S.optional(PrincipalResourcePermissionsList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "GetEffectivePermissionsForPathResponse",
}) as any as S.Schema<GetEffectivePermissionsForPathResponse>;
export interface GetLFTagRequest {
  CatalogId?: string;
  TagKey: string;
}
export const GetLFTagRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.optional(S.String), TagKey: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetLFTag" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLFTagRequest",
}) as any as S.Schema<GetLFTagRequest>;
export interface GetLFTagResponse {
  CatalogId?: string;
  TagKey?: string;
  TagValues?: string[];
}
export const GetLFTagResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    TagKey: S.optional(S.String),
    TagValues: S.optional(TagValueList),
  }),
).annotate({
  identifier: "GetLFTagResponse",
}) as any as S.Schema<GetLFTagResponse>;
export interface GetLFTagExpressionRequest {
  Name: string;
  CatalogId?: string;
}
export const GetLFTagExpressionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, CatalogId: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetLFTagExpression" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLFTagExpressionRequest",
}) as any as S.Schema<GetLFTagExpressionRequest>;
export interface GetLFTagExpressionResponse {
  Name?: string;
  Description?: string;
  CatalogId?: string;
  Expression?: LFTag[];
}
export const GetLFTagExpressionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CatalogId: S.optional(S.String),
    Expression: S.optional(Expression),
  }),
).annotate({
  identifier: "GetLFTagExpressionResponse",
}) as any as S.Schema<GetLFTagExpressionResponse>;
export type GetQueryStateRequestQueryIdString = string;
export interface GetQueryStateRequest {
  QueryId: string;
}
export const GetQueryStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QueryId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetQueryState" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQueryStateRequest",
}) as any as S.Schema<GetQueryStateRequest>;
export type ErrorMessageString = string;
export type QueryStateString =
  | "PENDING"
  | "WORKUNITS_AVAILABLE"
  | "ERROR"
  | "FINISHED"
  | "EXPIRED"
  | (string & {});
export const QueryStateString = /*@__PURE__*/ S.String;

export interface GetQueryStateResponse {
  Error?: string;
  State: QueryStateString;
}
export const GetQueryStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Error: S.optional(S.String), State: QueryStateString }),
).annotate({
  identifier: "GetQueryStateResponse",
}) as any as S.Schema<GetQueryStateResponse>;
export type GetQueryStatisticsRequestQueryIdString = string;
export interface GetQueryStatisticsRequest {
  QueryId: string;
}
export const GetQueryStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QueryId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetQueryStatistics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQueryStatisticsRequest",
}) as any as S.Schema<GetQueryStatisticsRequest>;
export type NumberOfMilliseconds = number;
export type NumberOfBytes = number;
export type NumberOfItems = number;
export interface ExecutionStatistics {
  AverageExecutionTimeMillis?: number;
  DataScannedBytes?: number;
  WorkUnitsExecutedCount?: number;
}
export const ExecutionStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AverageExecutionTimeMillis: S.optional(S.Number),
    DataScannedBytes: S.optional(S.Number),
    WorkUnitsExecutedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExecutionStatistics",
}) as any as S.Schema<ExecutionStatistics>;
export interface PlanningStatistics {
  EstimatedDataToScanBytes?: number;
  PlanningTimeMillis?: number;
  QueueTimeMillis?: number;
  WorkUnitsGeneratedCount?: number;
}
export const PlanningStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EstimatedDataToScanBytes: S.optional(S.Number),
    PlanningTimeMillis: S.optional(S.Number),
    QueueTimeMillis: S.optional(S.Number),
    WorkUnitsGeneratedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "PlanningStatistics",
}) as any as S.Schema<PlanningStatistics>;
export interface GetQueryStatisticsResponse {
  ExecutionStatistics?: ExecutionStatistics;
  PlanningStatistics?: PlanningStatistics;
  QuerySubmissionTime?: Date;
}
export const GetQueryStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutionStatistics: S.optional(ExecutionStatistics),
    PlanningStatistics: S.optional(PlanningStatistics),
    QuerySubmissionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "GetQueryStatisticsResponse",
}) as any as S.Schema<GetQueryStatisticsResponse>;
export type BooleanNullable = boolean;
export interface GetResourceLFTagsRequest {
  CatalogId?: string;
  Resource: Resource;
  ShowAssignedLFTags?: boolean;
}
export const GetResourceLFTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Resource: Resource,
    ShowAssignedLFTags: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetResourceLFTags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceLFTagsRequest",
}) as any as S.Schema<GetResourceLFTagsRequest>;
export interface ColumnLFTag {
  Name?: string;
  LFTags?: LFTagPair[];
}
export const ColumnLFTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), LFTags: S.optional(LFTagsList) }),
).annotate({ identifier: "ColumnLFTag" }) as any as S.Schema<ColumnLFTag>;
export type ColumnLFTagsList = ColumnLFTag[];
export const ColumnLFTagsList = /*@__PURE__*/ S.Array(ColumnLFTag);
export interface GetResourceLFTagsResponse {
  LFTagOnDatabase?: LFTagPair[];
  LFTagsOnTable?: LFTagPair[];
  LFTagsOnColumns?: ColumnLFTag[];
}
export const GetResourceLFTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LFTagOnDatabase: S.optional(LFTagsList),
    LFTagsOnTable: S.optional(LFTagsList),
    LFTagsOnColumns: S.optional(ColumnLFTagsList),
  }),
).annotate({
  identifier: "GetResourceLFTagsResponse",
}) as any as S.Schema<GetResourceLFTagsResponse>;
export type TokenString = string;
export interface GetTableObjectsRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  TransactionId?: string;
  QueryAsOfTime?: Date;
  PartitionPredicate?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetTableObjectsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    TransactionId: S.optional(S.String),
    QueryAsOfTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PartitionPredicate: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetTableObjects" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTableObjectsRequest",
}) as any as S.Schema<GetTableObjectsRequest>;
export type PartitionValueString = string;
export type PartitionValuesList = string[];
export const PartitionValuesList = /*@__PURE__*/ S.Array(S.String);
export type ObjectSize = number;
export interface TableObject {
  Uri?: string;
  ETag?: string;
  Size?: number;
}
export const TableObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Uri: S.optional(S.String),
    ETag: S.optional(S.String),
    Size: S.optional(S.Number),
  }),
).annotate({ identifier: "TableObject" }) as any as S.Schema<TableObject>;
export type TableObjectList = TableObject[];
export const TableObjectList = /*@__PURE__*/ S.Array(TableObject);
export interface PartitionObjects {
  PartitionValues?: string[];
  Objects?: TableObject[];
}
export const PartitionObjects = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PartitionValues: S.optional(PartitionValuesList),
    Objects: S.optional(TableObjectList),
  }),
).annotate({
  identifier: "PartitionObjects",
}) as any as S.Schema<PartitionObjects>;
export type PartitionedTableObjectsList = PartitionObjects[];
export const PartitionedTableObjectsList =
  /*@__PURE__*/ S.Array(PartitionObjects);
export interface GetTableObjectsResponse {
  Objects?: PartitionObjects[];
  NextToken?: string;
}
export const GetTableObjectsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Objects: S.optional(PartitionedTableObjectsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTableObjectsResponse",
}) as any as S.Schema<GetTableObjectsResponse>;
export type AuditContextString = string;
export interface AuditContext {
  AdditionalAuditContext?: string;
}
export const AuditContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AdditionalAuditContext: S.optional(S.String) }),
).annotate({ identifier: "AuditContext" }) as any as S.Schema<AuditContext>;
export type PathString = string;
export type PathStringList = string[];
export const PathStringList = /*@__PURE__*/ S.Array(S.String);
export type CredentialsScope = "READ" | "READWRITE" | (string & {});
export const CredentialsScope = /*@__PURE__*/ S.String;

export interface GetTemporaryDataLocationCredentialsRequest {
  DurationSeconds?: number;
  AuditContext?: AuditContext;
  DataLocations?: string[];
  CredentialsScope?: CredentialsScope;
}
export const GetTemporaryDataLocationCredentialsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DurationSeconds: S.optional(S.Number),
      AuditContext: S.optional(AuditContext),
      DataLocations: S.optional(PathStringList),
      CredentialsScope: S.optional(CredentialsScope),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/GetTemporaryDataLocationCredentials" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetTemporaryDataLocationCredentialsRequest",
  }) as any as S.Schema<GetTemporaryDataLocationCredentialsRequest>;
export interface TemporaryCredentials {
  AccessKeyId?: string;
  SecretAccessKey?: string | redacted.Redacted<string>;
  SessionToken?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export const TemporaryCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessKeyId: S.optional(S.String),
    SecretAccessKey: S.optional(SensitiveString),
    SessionToken: S.optional(SensitiveString),
    Expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "TemporaryCredentials",
}) as any as S.Schema<TemporaryCredentials>;
export interface GetTemporaryDataLocationCredentialsResponse {
  Credentials?: TemporaryCredentials;
  AccessibleDataLocations?: string[];
  CredentialsScope?: CredentialsScope;
}
export const GetTemporaryDataLocationCredentialsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Credentials: S.optional(TemporaryCredentials),
      AccessibleDataLocations: S.optional(PathStringList),
      CredentialsScope: S.optional(CredentialsScope),
    }),
  ).annotate({
    identifier: "GetTemporaryDataLocationCredentialsResponse",
  }) as any as S.Schema<GetTemporaryDataLocationCredentialsResponse>;
export type ValueString = string;
export type ValueStringList = string[];
export const ValueStringList = /*@__PURE__*/ S.Array(S.String);
export interface PartitionValueList {
  Values: string[];
}
export const PartitionValueList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Values: ValueStringList }),
).annotate({
  identifier: "PartitionValueList",
}) as any as S.Schema<PartitionValueList>;
export type PermissionType =
  | "COLUMN_PERMISSION"
  | "CELL_FILTER_PERMISSION"
  | "NESTED_PERMISSION"
  | "NESTED_CELL_PERMISSION"
  | (string & {});
export const PermissionType = /*@__PURE__*/ S.String;

export type PermissionTypeList = PermissionType[];
export const PermissionTypeList = /*@__PURE__*/ S.Array(PermissionType);
export interface GetTemporaryGluePartitionCredentialsRequest {
  TableArn: string;
  Partition: PartitionValueList;
  Permissions?: Permission[];
  DurationSeconds?: number;
  AuditContext?: AuditContext;
  SupportedPermissionTypes?: PermissionType[];
}
export const GetTemporaryGluePartitionCredentialsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TableArn: S.String,
      Partition: PartitionValueList,
      Permissions: S.optional(PermissionList),
      DurationSeconds: S.optional(S.Number),
      AuditContext: S.optional(AuditContext),
      SupportedPermissionTypes: S.optional(PermissionTypeList),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/GetTemporaryGluePartitionCredentials",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetTemporaryGluePartitionCredentialsRequest",
  }) as any as S.Schema<GetTemporaryGluePartitionCredentialsRequest>;
export interface GetTemporaryGluePartitionCredentialsResponse {
  AccessKeyId?: string;
  SecretAccessKey?: string | redacted.Redacted<string>;
  SessionToken?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export const GetTemporaryGluePartitionCredentialsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccessKeyId: S.optional(S.String),
      SecretAccessKey: S.optional(SensitiveString),
      SessionToken: S.optional(SensitiveString),
      Expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
  ).annotate({
    identifier: "GetTemporaryGluePartitionCredentialsResponse",
  }) as any as S.Schema<GetTemporaryGluePartitionCredentialsResponse>;
export type HashString = string;
export type NullableString = string;
export type ContextKey = string;
export type ContextValue = string;
export type AdditionalContextMap = { [key: string]: string | undefined };
export const AdditionalContextMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface QuerySessionContext {
  QueryId?: string;
  QueryStartTime?: Date;
  ClusterId?: string;
  QueryAuthorizationId?: string;
  AdditionalContext?: { [key: string]: string | undefined };
}
export const QuerySessionContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryId: S.optional(S.String),
    QueryStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ClusterId: S.optional(S.String),
    QueryAuthorizationId: S.optional(S.String),
    AdditionalContext: S.optional(AdditionalContextMap),
  }),
).annotate({
  identifier: "QuerySessionContext",
}) as any as S.Schema<QuerySessionContext>;
export interface GetTemporaryGlueTableCredentialsRequest {
  TableArn: string;
  Permissions?: Permission[];
  DurationSeconds?: number;
  AuditContext?: AuditContext;
  SupportedPermissionTypes?: PermissionType[];
  S3Path?: string;
  QuerySessionContext?: QuerySessionContext;
}
export const GetTemporaryGlueTableCredentialsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TableArn: S.String,
      Permissions: S.optional(PermissionList),
      DurationSeconds: S.optional(S.Number),
      AuditContext: S.optional(AuditContext),
      SupportedPermissionTypes: S.optional(PermissionTypeList),
      S3Path: S.optional(S.String),
      QuerySessionContext: S.optional(QuerySessionContext),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/GetTemporaryGlueTableCredentials" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetTemporaryGlueTableCredentialsRequest",
}) as any as S.Schema<GetTemporaryGlueTableCredentialsRequest>;
export interface GetTemporaryGlueTableCredentialsResponse {
  AccessKeyId?: string;
  SecretAccessKey?: string | redacted.Redacted<string>;
  SessionToken?: string | redacted.Redacted<string>;
  Expiration?: Date;
  VendedS3Path?: string[];
}
export const GetTemporaryGlueTableCredentialsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccessKeyId: S.optional(S.String),
      SecretAccessKey: S.optional(SensitiveString),
      SessionToken: S.optional(SensitiveString),
      Expiration: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      VendedS3Path: S.optional(PathStringList),
    }),
).annotate({
  identifier: "GetTemporaryGlueTableCredentialsResponse",
}) as any as S.Schema<GetTemporaryGlueTableCredentialsResponse>;
export type GetWorkUnitResultsRequestQueryIdString = string;
export type GetWorkUnitResultsRequestWorkUnitIdLong = number;
export type SyntheticGetWorkUnitResultsRequestWorkUnitTokenString =
  | string
  | redacted.Redacted<string>;
export interface GetWorkUnitResultsRequest {
  QueryId: string;
  WorkUnitId: number;
  WorkUnitToken: string | redacted.Redacted<string>;
}
export const GetWorkUnitResultsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryId: S.String,
    WorkUnitId: S.Number,
    WorkUnitToken: SensitiveString,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetWorkUnitResults" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkUnitResultsRequest",
}) as any as S.Schema<GetWorkUnitResultsRequest>;
export interface GetWorkUnitResultsResponse {
  ResultStream?: T.StreamingOutputBody;
}
export const GetWorkUnitResultsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResultStream: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
  }),
).annotate({
  identifier: "GetWorkUnitResultsResponse",
}) as any as S.Schema<GetWorkUnitResultsResponse>;
export type GetWorkUnitsRequestQueryIdString = string;
export interface GetWorkUnitsRequest {
  NextToken?: string;
  PageSize?: number;
  QueryId: string;
}
export const GetWorkUnitsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PageSize: S.optional(S.Number),
    QueryId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetWorkUnits" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetWorkUnitsRequest",
}) as any as S.Schema<GetWorkUnitsRequest>;
export type QueryIdString = string;
export type WorkUnitIdLong = number;
export type WorkUnitTokenString = string;
export interface WorkUnitRange {
  WorkUnitIdMax: number;
  WorkUnitIdMin: number;
  WorkUnitToken: string;
}
export const WorkUnitRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkUnitIdMax: S.Number,
    WorkUnitIdMin: S.Number,
    WorkUnitToken: S.String,
  }),
).annotate({ identifier: "WorkUnitRange" }) as any as S.Schema<WorkUnitRange>;
export type WorkUnitRangeList = WorkUnitRange[];
export const WorkUnitRangeList = /*@__PURE__*/ S.Array(WorkUnitRange);
export interface GetWorkUnitsResponse {
  NextToken?: string;
  QueryId: string;
  WorkUnitRanges: WorkUnitRange[];
}
export const GetWorkUnitsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    QueryId: S.String,
    WorkUnitRanges: WorkUnitRangeList,
  }),
).annotate({
  identifier: "GetWorkUnitsResponse",
}) as any as S.Schema<GetWorkUnitsResponse>;
export interface GrantPermissionsRequest {
  CatalogId?: string;
  Principal: DataLakePrincipal;
  Resource: Resource;
  Permissions: Permission[];
  Condition?: Condition;
  PermissionsWithGrantOption?: Permission[];
}
export const GrantPermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Principal: DataLakePrincipal,
    Resource: Resource,
    Permissions: PermissionList,
    Condition: S.optional(Condition),
    PermissionsWithGrantOption: S.optional(PermissionList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GrantPermissions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GrantPermissionsRequest",
}) as any as S.Schema<GrantPermissionsRequest>;
export interface GrantPermissionsResponse {}
export const GrantPermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "GrantPermissionsResponse",
}) as any as S.Schema<GrantPermissionsResponse>;
export interface ListDataCellsFilterRequest {
  Table?: TableResource;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDataCellsFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Table: S.optional(TableResource),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListDataCellsFilter" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDataCellsFilterRequest",
}) as any as S.Schema<ListDataCellsFilterRequest>;
export type DataCellsFilterList = DataCellsFilter[];
export const DataCellsFilterList = /*@__PURE__*/ S.Array(DataCellsFilter);
export interface ListDataCellsFilterResponse {
  DataCellsFilters?: DataCellsFilter[];
  NextToken?: string;
}
export const ListDataCellsFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataCellsFilters: S.optional(DataCellsFilterList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataCellsFilterResponse",
}) as any as S.Schema<ListDataCellsFilterResponse>;
export interface ListLakeFormationOptInsRequest {
  Principal?: DataLakePrincipal;
  Resource?: Resource;
  MaxResults?: number;
  NextToken?: string;
}
export const ListLakeFormationOptInsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Principal: S.optional(DataLakePrincipal),
    Resource: S.optional(Resource),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListLakeFormationOptIns" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLakeFormationOptInsRequest",
}) as any as S.Schema<ListLakeFormationOptInsRequest>;
export interface LakeFormationOptInsInfo {
  Resource?: Resource;
  Principal?: DataLakePrincipal;
  Condition?: Condition;
  LastModified?: Date;
  LastUpdatedBy?: string;
}
export const LakeFormationOptInsInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Resource: S.optional(Resource),
    Principal: S.optional(DataLakePrincipal),
    Condition: S.optional(Condition),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "LakeFormationOptInsInfo",
}) as any as S.Schema<LakeFormationOptInsInfo>;
export type LakeFormationOptInsInfoList = LakeFormationOptInsInfo[];
export const LakeFormationOptInsInfoList = /*@__PURE__*/ S.Array(
  LakeFormationOptInsInfo,
);
export interface ListLakeFormationOptInsResponse {
  LakeFormationOptInsInfoList?: LakeFormationOptInsInfo[];
  NextToken?: string;
}
export const ListLakeFormationOptInsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LakeFormationOptInsInfoList: S.optional(LakeFormationOptInsInfoList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLakeFormationOptInsResponse",
}) as any as S.Schema<ListLakeFormationOptInsResponse>;
export interface ListLFTagExpressionsRequest {
  CatalogId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListLFTagExpressionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListLFTagExpressions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLFTagExpressionsRequest",
}) as any as S.Schema<ListLFTagExpressionsRequest>;
export interface LFTagExpression {
  Name?: string;
  Description?: string;
  CatalogId?: string;
  Expression?: LFTag[];
}
export const LFTagExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CatalogId: S.optional(S.String),
    Expression: S.optional(Expression),
  }),
).annotate({
  identifier: "LFTagExpression",
}) as any as S.Schema<LFTagExpression>;
export type LFTagExpressionsList = LFTagExpression[];
export const LFTagExpressionsList = /*@__PURE__*/ S.Array(LFTagExpression);
export interface ListLFTagExpressionsResponse {
  LFTagExpressions?: LFTagExpression[];
  NextToken?: string;
}
export const ListLFTagExpressionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LFTagExpressions: S.optional(LFTagExpressionsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLFTagExpressionsResponse",
}) as any as S.Schema<ListLFTagExpressionsResponse>;
export type ResourceShareType = "FOREIGN" | "ALL" | (string & {});
export const ResourceShareType = /*@__PURE__*/ S.String;

export interface ListLFTagsRequest {
  CatalogId?: string;
  ResourceShareType?: ResourceShareType;
  MaxResults?: number;
  NextToken?: string;
}
export const ListLFTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    ResourceShareType: S.optional(ResourceShareType),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListLFTags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLFTagsRequest",
}) as any as S.Schema<ListLFTagsRequest>;
export interface ListLFTagsResponse {
  LFTags?: LFTagPair[];
  NextToken?: string;
}
export const ListLFTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LFTags: S.optional(LFTagsList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListLFTagsResponse",
}) as any as S.Schema<ListLFTagsResponse>;
export type DataLakeResourceType =
  | "CATALOG"
  | "DATABASE"
  | "TABLE"
  | "DATA_LOCATION"
  | "LF_TAG"
  | "LF_TAG_POLICY"
  | "LF_TAG_POLICY_DATABASE"
  | "LF_TAG_POLICY_TABLE"
  | "LF_NAMED_TAG_EXPRESSION"
  | (string & {});
export const DataLakeResourceType = /*@__PURE__*/ S.String;

export type TrueFalseString = string;
export interface ListPermissionsRequest {
  CatalogId?: string;
  Principal?: DataLakePrincipal;
  ResourceType?: DataLakeResourceType;
  Resource?: Resource;
  NextToken?: string;
  MaxResults?: number;
  IncludeRelated?: string;
}
export const ListPermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Principal: S.optional(DataLakePrincipal),
    ResourceType: S.optional(DataLakeResourceType),
    Resource: S.optional(Resource),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    IncludeRelated: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListPermissions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPermissionsRequest",
}) as any as S.Schema<ListPermissionsRequest>;
export interface ListPermissionsResponse {
  PrincipalResourcePermissions?: PrincipalResourcePermissions[];
  NextToken?: string;
}
export const ListPermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrincipalResourcePermissions: S.optional(PrincipalResourcePermissionsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPermissionsResponse",
}) as any as S.Schema<ListPermissionsResponse>;
export type FieldNameString =
  | "RESOURCE_ARN"
  | "ROLE_ARN"
  | "LAST_MODIFIED"
  | (string & {});
export const FieldNameString = /*@__PURE__*/ S.String;

export type ComparisonOperator =
  | "EQ"
  | "NE"
  | "LE"
  | "LT"
  | "GE"
  | "GT"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "BEGINS_WITH"
  | "IN"
  | "BETWEEN"
  | (string & {});
export const ComparisonOperator = /*@__PURE__*/ S.String;

export type StringValue = string;
export type StringValueList = string[];
export const StringValueList = /*@__PURE__*/ S.Array(S.String);
export interface FilterCondition {
  Field?: FieldNameString;
  ComparisonOperator?: ComparisonOperator;
  StringValueList?: string[];
}
export const FilterCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Field: S.optional(FieldNameString),
    ComparisonOperator: S.optional(ComparisonOperator),
    StringValueList: S.optional(StringValueList),
  }),
).annotate({
  identifier: "FilterCondition",
}) as any as S.Schema<FilterCondition>;
export type FilterConditionList = FilterCondition[];
export const FilterConditionList = /*@__PURE__*/ S.Array(FilterCondition);
export interface ListResourcesRequest {
  FilterConditionList?: FilterCondition[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterConditionList: S.optional(FilterConditionList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListResources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourcesRequest",
}) as any as S.Schema<ListResourcesRequest>;
export type ResourceInfoList = ResourceInfo[];
export const ResourceInfoList = /*@__PURE__*/ S.Array(ResourceInfo);
export interface ListResourcesResponse {
  ResourceInfoList?: ResourceInfo[];
  NextToken?: string;
}
export const ListResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceInfoList: S.optional(ResourceInfoList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourcesResponse",
}) as any as S.Schema<ListResourcesResponse>;
export type OptimizerType =
  | "COMPACTION"
  | "GARBAGE_COLLECTION"
  | "ALL"
  | (string & {});
export const OptimizerType = /*@__PURE__*/ S.String;

export interface ListTableStorageOptimizersRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  StorageOptimizerType?: OptimizerType;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTableStorageOptimizersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    StorageOptimizerType: S.optional(OptimizerType),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTableStorageOptimizers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTableStorageOptimizersRequest",
}) as any as S.Schema<ListTableStorageOptimizersRequest>;
export type StorageOptimizerConfigKey = string;
export type StorageOptimizerConfigValue = string;
export type StorageOptimizerConfig = { [key: string]: string | undefined };
export const StorageOptimizerConfig = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type MessageString = string;
export interface StorageOptimizer {
  StorageOptimizerType?: OptimizerType;
  Config?: { [key: string]: string | undefined };
  ErrorMessage?: string;
  Warnings?: string;
  LastRunDetails?: string;
}
export const StorageOptimizer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageOptimizerType: S.optional(OptimizerType),
    Config: S.optional(StorageOptimizerConfig),
    ErrorMessage: S.optional(S.String),
    Warnings: S.optional(S.String),
    LastRunDetails: S.optional(S.String),
  }),
).annotate({
  identifier: "StorageOptimizer",
}) as any as S.Schema<StorageOptimizer>;
export type StorageOptimizerList = StorageOptimizer[];
export const StorageOptimizerList = /*@__PURE__*/ S.Array(StorageOptimizer);
export interface ListTableStorageOptimizersResponse {
  StorageOptimizerList?: StorageOptimizer[];
  NextToken?: string;
}
export const ListTableStorageOptimizersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StorageOptimizerList: S.optional(StorageOptimizerList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTableStorageOptimizersResponse",
}) as any as S.Schema<ListTableStorageOptimizersResponse>;
export type TransactionStatusFilter =
  | "ALL"
  | "COMPLETED"
  | "ACTIVE"
  | "COMMITTED"
  | "ABORTED"
  | (string & {});
export const TransactionStatusFilter = /*@__PURE__*/ S.String;

export interface ListTransactionsRequest {
  CatalogId?: string;
  StatusFilter?: TransactionStatusFilter;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTransactionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    StatusFilter: S.optional(TransactionStatusFilter),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTransactions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTransactionsRequest",
}) as any as S.Schema<ListTransactionsRequest>;
export type TransactionDescriptionList = TransactionDescription[];
export const TransactionDescriptionList = /*@__PURE__*/ S.Array(
  TransactionDescription,
);
export interface ListTransactionsResponse {
  Transactions?: TransactionDescription[];
  NextToken?: string;
}
export const ListTransactionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Transactions: S.optional(TransactionDescriptionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTransactionsResponse",
}) as any as S.Schema<ListTransactionsResponse>;
export interface PutDataLakeSettingsRequest {
  CatalogId?: string;
  DataLakeSettings: DataLakeSettings;
}
export const PutDataLakeSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DataLakeSettings: DataLakeSettings,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutDataLakeSettings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutDataLakeSettingsRequest",
}) as any as S.Schema<PutDataLakeSettingsRequest>;
export interface PutDataLakeSettingsResponse {}
export const PutDataLakeSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutDataLakeSettingsResponse",
}) as any as S.Schema<PutDataLakeSettingsResponse>;
export interface RegisterResourceRequest {
  ResourceArn: string;
  UseServiceLinkedRole?: boolean;
  RoleArn?: string;
  WithFederation?: boolean;
  HybridAccessEnabled?: boolean;
  WithPrivilegedAccess?: boolean;
  ExpectedResourceOwnerAccount?: string;
}
export const RegisterResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    UseServiceLinkedRole: S.optional(S.Boolean),
    RoleArn: S.optional(S.String),
    WithFederation: S.optional(S.Boolean),
    HybridAccessEnabled: S.optional(S.Boolean),
    WithPrivilegedAccess: S.optional(S.Boolean),
    ExpectedResourceOwnerAccount: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/RegisterResource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RegisterResourceRequest",
}) as any as S.Schema<RegisterResourceRequest>;
export interface RegisterResourceResponse {}
export const RegisterResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RegisterResourceResponse",
}) as any as S.Schema<RegisterResourceResponse>;
export interface RemoveLFTagsFromResourceRequest {
  CatalogId?: string;
  Resource: Resource;
  LFTags: LFTagPair[];
}
export const RemoveLFTagsFromResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Resource: Resource,
    LFTags: LFTagsList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/RemoveLFTagsFromResource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveLFTagsFromResourceRequest",
}) as any as S.Schema<RemoveLFTagsFromResourceRequest>;
export interface RemoveLFTagsFromResourceResponse {
  Failures?: LFTagError[];
}
export const RemoveLFTagsFromResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Failures: S.optional(LFTagErrors) }),
).annotate({
  identifier: "RemoveLFTagsFromResourceResponse",
}) as any as S.Schema<RemoveLFTagsFromResourceResponse>;
export interface RevokePermissionsRequest {
  CatalogId?: string;
  Principal: DataLakePrincipal;
  Resource: Resource;
  Permissions: Permission[];
  Condition?: Condition;
  PermissionsWithGrantOption?: Permission[];
}
export const RevokePermissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Principal: DataLakePrincipal,
    Resource: Resource,
    Permissions: PermissionList,
    Condition: S.optional(Condition),
    PermissionsWithGrantOption: S.optional(PermissionList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/RevokePermissions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RevokePermissionsRequest",
}) as any as S.Schema<RevokePermissionsRequest>;
export interface RevokePermissionsResponse {}
export const RevokePermissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RevokePermissionsResponse",
}) as any as S.Schema<RevokePermissionsResponse>;
export type SearchPageSize = number;
export interface SearchDatabasesByLFTagsRequest {
  NextToken?: string;
  MaxResults?: number;
  CatalogId?: string;
  Expression: LFTag[];
}
export const SearchDatabasesByLFTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    CatalogId: S.optional(S.String),
    Expression: Expression,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/SearchDatabasesByLFTags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchDatabasesByLFTagsRequest",
}) as any as S.Schema<SearchDatabasesByLFTagsRequest>;
export interface TaggedDatabase {
  Database?: DatabaseResource;
  LFTags?: LFTagPair[];
}
export const TaggedDatabase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Database: S.optional(DatabaseResource),
    LFTags: S.optional(LFTagsList),
  }),
).annotate({ identifier: "TaggedDatabase" }) as any as S.Schema<TaggedDatabase>;
export type DatabaseLFTagsList = TaggedDatabase[];
export const DatabaseLFTagsList = /*@__PURE__*/ S.Array(TaggedDatabase);
export interface SearchDatabasesByLFTagsResponse {
  NextToken?: string;
  DatabaseList?: TaggedDatabase[];
}
export const SearchDatabasesByLFTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    DatabaseList: S.optional(DatabaseLFTagsList),
  }),
).annotate({
  identifier: "SearchDatabasesByLFTagsResponse",
}) as any as S.Schema<SearchDatabasesByLFTagsResponse>;
export interface SearchTablesByLFTagsRequest {
  NextToken?: string;
  MaxResults?: number;
  CatalogId?: string;
  Expression: LFTag[];
}
export const SearchTablesByLFTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    CatalogId: S.optional(S.String),
    Expression: Expression,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/SearchTablesByLFTags" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchTablesByLFTagsRequest",
}) as any as S.Schema<SearchTablesByLFTagsRequest>;
export interface TaggedTable {
  Table?: TableResource;
  LFTagOnDatabase?: LFTagPair[];
  LFTagsOnTable?: LFTagPair[];
  LFTagsOnColumns?: ColumnLFTag[];
}
export const TaggedTable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Table: S.optional(TableResource),
    LFTagOnDatabase: S.optional(LFTagsList),
    LFTagsOnTable: S.optional(LFTagsList),
    LFTagsOnColumns: S.optional(ColumnLFTagsList),
  }),
).annotate({ identifier: "TaggedTable" }) as any as S.Schema<TaggedTable>;
export type TableLFTagsList = TaggedTable[];
export const TableLFTagsList = /*@__PURE__*/ S.Array(TaggedTable);
export interface SearchTablesByLFTagsResponse {
  NextToken?: string;
  TableList?: TaggedTable[];
}
export const SearchTablesByLFTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    TableList: S.optional(TableLFTagsList),
  }),
).annotate({
  identifier: "SearchTablesByLFTagsResponse",
}) as any as S.Schema<SearchTablesByLFTagsResponse>;
export type QueryPlanningContextDatabaseNameString = string;
export type QueryParameterMap = { [key: string]: string | undefined };
export const QueryParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface QueryPlanningContext {
  CatalogId?: string;
  DatabaseName: string;
  QueryAsOfTime?: Date;
  QueryParameters?: { [key: string]: string | undefined };
  TransactionId?: string;
}
export const QueryPlanningContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    QueryAsOfTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    QueryParameters: S.optional(QueryParameterMap),
    TransactionId: S.optional(S.String),
  }),
).annotate({
  identifier: "QueryPlanningContext",
}) as any as S.Schema<QueryPlanningContext>;
export type SyntheticStartQueryPlanningRequestQueryString =
  | string
  | redacted.Redacted<string>;
export interface StartQueryPlanningRequest {
  QueryPlanningContext: QueryPlanningContext;
  QueryString: string | redacted.Redacted<string>;
}
export const StartQueryPlanningRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryPlanningContext: QueryPlanningContext,
    QueryString: SensitiveString,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartQueryPlanning" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartQueryPlanningRequest",
}) as any as S.Schema<StartQueryPlanningRequest>;
export interface StartQueryPlanningResponse {
  QueryId: string;
}
export const StartQueryPlanningResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QueryId: S.String }),
).annotate({
  identifier: "StartQueryPlanningResponse",
}) as any as S.Schema<StartQueryPlanningResponse>;
export type TransactionType = "READ_AND_WRITE" | "READ_ONLY" | (string & {});
export const TransactionType = /*@__PURE__*/ S.String;

export interface StartTransactionRequest {
  TransactionType?: TransactionType;
}
export const StartTransactionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransactionType: S.optional(TransactionType) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartTransaction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTransactionRequest",
}) as any as S.Schema<StartTransactionRequest>;
export interface StartTransactionResponse {
  TransactionId?: string;
}
export const StartTransactionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransactionId: S.optional(S.String) }),
).annotate({
  identifier: "StartTransactionResponse",
}) as any as S.Schema<StartTransactionResponse>;
export interface UpdateDataCellsFilterRequest {
  TableData: DataCellsFilter;
}
export const UpdateDataCellsFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableData: DataCellsFilter }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateDataCellsFilter" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDataCellsFilterRequest",
}) as any as S.Schema<UpdateDataCellsFilterRequest>;
export interface UpdateDataCellsFilterResponse {}
export const UpdateDataCellsFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDataCellsFilterResponse",
}) as any as S.Schema<UpdateDataCellsFilterResponse>;
export type ApplicationStatus = "ENABLED" | "DISABLED" | (string & {});
export const ApplicationStatus = /*@__PURE__*/ S.String;

export interface UpdateLakeFormationIdentityCenterConfigurationRequest {
  CatalogId?: string;
  ShareRecipients?: DataLakePrincipal[];
  ServiceIntegrations?: ServiceIntegrationUnion[];
  ApplicationStatus?: ApplicationStatus;
  ExternalFiltering?: ExternalFilteringConfiguration;
}
export const UpdateLakeFormationIdentityCenterConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CatalogId: S.optional(S.String),
      ShareRecipients: S.optional(DataLakePrincipalList),
      ServiceIntegrations: S.optional(ServiceIntegrationList),
      ApplicationStatus: S.optional(ApplicationStatus),
      ExternalFiltering: S.optional(ExternalFilteringConfiguration),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/UpdateLakeFormationIdentityCenterConfiguration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateLakeFormationIdentityCenterConfigurationRequest",
  }) as any as S.Schema<UpdateLakeFormationIdentityCenterConfigurationRequest>;
export interface UpdateLakeFormationIdentityCenterConfigurationResponse {}
export const UpdateLakeFormationIdentityCenterConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateLakeFormationIdentityCenterConfigurationResponse",
  }) as any as S.Schema<UpdateLakeFormationIdentityCenterConfigurationResponse>;
export interface UpdateLFTagRequest {
  CatalogId?: string;
  TagKey: string;
  TagValuesToDelete?: string[];
  TagValuesToAdd?: string[];
}
export const UpdateLFTagRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    TagKey: S.String,
    TagValuesToDelete: S.optional(TagValueList),
    TagValuesToAdd: S.optional(TagValueList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateLFTag" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLFTagRequest",
}) as any as S.Schema<UpdateLFTagRequest>;
export interface UpdateLFTagResponse {}
export const UpdateLFTagResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLFTagResponse",
}) as any as S.Schema<UpdateLFTagResponse>;
export interface UpdateLFTagExpressionRequest {
  Name: string;
  Description?: string;
  CatalogId?: string;
  Expression: LFTag[];
}
export const UpdateLFTagExpressionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    CatalogId: S.optional(S.String),
    Expression: Expression,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateLFTagExpression" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLFTagExpressionRequest",
}) as any as S.Schema<UpdateLFTagExpressionRequest>;
export interface UpdateLFTagExpressionResponse {}
export const UpdateLFTagExpressionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateLFTagExpressionResponse",
}) as any as S.Schema<UpdateLFTagExpressionResponse>;
export interface UpdateResourceRequest {
  RoleArn: string;
  ResourceArn: string;
  WithFederation?: boolean;
  HybridAccessEnabled?: boolean;
  ExpectedResourceOwnerAccount?: string;
}
export const UpdateResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoleArn: S.String,
    ResourceArn: S.String,
    WithFederation: S.optional(S.Boolean),
    HybridAccessEnabled: S.optional(S.Boolean),
    ExpectedResourceOwnerAccount: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateResource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResourceRequest",
}) as any as S.Schema<UpdateResourceRequest>;
export interface UpdateResourceResponse {}
export const UpdateResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateResourceResponse",
}) as any as S.Schema<UpdateResourceResponse>;
export interface AddObjectInput {
  Uri: string;
  ETag: string;
  Size: number;
  PartitionValues?: string[];
}
export const AddObjectInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Uri: S.String,
    ETag: S.String,
    Size: S.Number,
    PartitionValues: S.optional(PartitionValuesList),
  }),
).annotate({ identifier: "AddObjectInput" }) as any as S.Schema<AddObjectInput>;
export interface DeleteObjectInput {
  Uri: string;
  ETag?: string;
  PartitionValues?: string[];
}
export const DeleteObjectInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Uri: S.String,
    ETag: S.optional(S.String),
    PartitionValues: S.optional(PartitionValuesList),
  }),
).annotate({
  identifier: "DeleteObjectInput",
}) as any as S.Schema<DeleteObjectInput>;
export interface WriteOperation {
  AddObject?: AddObjectInput;
  DeleteObject?: DeleteObjectInput;
}
export const WriteOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddObject: S.optional(AddObjectInput),
    DeleteObject: S.optional(DeleteObjectInput),
  }),
).annotate({ identifier: "WriteOperation" }) as any as S.Schema<WriteOperation>;
export type WriteOperationList = WriteOperation[];
export const WriteOperationList = /*@__PURE__*/ S.Array(WriteOperation);
export interface UpdateTableObjectsRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  TransactionId?: string;
  WriteOperations: WriteOperation[];
}
export const UpdateTableObjectsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    TransactionId: S.optional(S.String),
    WriteOperations: WriteOperationList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateTableObjects" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTableObjectsRequest",
}) as any as S.Schema<UpdateTableObjectsRequest>;
export interface UpdateTableObjectsResponse {}
export const UpdateTableObjectsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTableObjectsResponse",
}) as any as S.Schema<UpdateTableObjectsResponse>;
export type StorageOptimizerConfigMap = {
  [key in OptimizerType]?: { [key: string]: string | undefined };
};
export const StorageOptimizerConfigMap = /*@__PURE__*/ S.Record(
  OptimizerType,
  StorageOptimizerConfig.pipe(S.optional),
);
export interface UpdateTableStorageOptimizerRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  StorageOptimizerConfig: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
}
export const UpdateTableStorageOptimizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    StorageOptimizerConfig: StorageOptimizerConfigMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateTableStorageOptimizer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTableStorageOptimizerRequest",
}) as any as S.Schema<UpdateTableStorageOptimizerRequest>;
export type Result = string;
export interface UpdateTableStorageOptimizerResponse {
  Result?: string;
}
export const UpdateTableStorageOptimizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Result: S.optional(S.String) }),
).annotate({
  identifier: "UpdateTableStorageOptimizerResponse",
}) as any as S.Schema<UpdateTableStorageOptimizerResponse>;
export type AddLFTagsToResourceError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Attaches one or more LF-tags to an existing resource.
 */
export const addLFTagsToResource: API.OperationMethod<
  AddLFTagsToResourceRequest,
  AddLFTagsToResourceResponse,
  AddLFTagsToResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AddLFTagsToResourceRequest,
  output: AddLFTagsToResourceResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddLFTagsToResource",
}));

export type AssumeDecoratedRoleWithSAMLError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Allows a caller to assume an IAM role decorated as the SAML user specified in the SAML assertion included in the request. This decoration allows Lake Formation to enforce access policies against the SAML users and groups. This API operation requires SAML federation setup in the caller’s account as it can only be called with valid SAML assertions.
 * Lake Formation does not scope down the permission of the assumed role. All permissions attached to the role via the SAML federation setup will be included in the role session.
 *
 * This decorated role is expected to access data in Amazon S3 by getting temporary access from Lake Formation which is authorized via the virtual API `GetDataAccess`.
 * Therefore, all SAML roles that can be assumed via `AssumeDecoratedRoleWithSAML` must at a minimum include `lakeformation:GetDataAccess` in their role policies.
 * A typical IAM policy attached to such a role would include the following actions:
 *
 * - glue:*Database*
 *
 * - glue:*Table*
 *
 * - glue:*Partition*
 *
 * - glue:*UserDefinedFunction*
 *
 * - lakeformation:GetDataAccess
 */
export const assumeDecoratedRoleWithSAML: API.OperationMethod<
  AssumeDecoratedRoleWithSAMLRequest,
  AssumeDecoratedRoleWithSAMLResponse,
  AssumeDecoratedRoleWithSAMLError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssumeDecoratedRoleWithSAMLRequest,
  output: AssumeDecoratedRoleWithSAMLResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssumeDecoratedRoleWithSAML",
}));

export type BatchGrantPermissionsError =
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Batch operation to grant permissions to the principal.
 */
export const batchGrantPermissions: API.OperationMethod<
  BatchGrantPermissionsRequest,
  BatchGrantPermissionsResponse,
  BatchGrantPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGrantPermissionsRequest,
  output: BatchGrantPermissionsResponse,
  errors: [InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGrantPermissions",
}));

export type BatchRevokePermissionsError =
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Batch operation to revoke permissions from the principal.
 */
export const batchRevokePermissions: API.OperationMethod<
  BatchRevokePermissionsRequest,
  BatchRevokePermissionsResponse,
  BatchRevokePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchRevokePermissionsRequest,
  output: BatchRevokePermissionsResponse,
  errors: [InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchRevokePermissions",
}));

export type CancelTransactionError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | TransactionCommitInProgressException
  | TransactionCommittedException
  | CommonErrors;
/**
 * Attempts to cancel the specified transaction. Returns an exception if the transaction was previously committed.
 */
export const cancelTransaction: API.OperationMethod<
  CancelTransactionRequest,
  CancelTransactionResponse,
  CancelTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelTransactionRequest,
  output: CancelTransactionResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    TransactionCommitInProgressException,
    TransactionCommittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTransaction",
}));

export type CommitTransactionError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | TransactionCanceledException
  | CommonErrors;
/**
 * Attempts to commit the specified transaction. Returns an exception if the transaction was previously aborted. This API action is idempotent if called multiple times for the same transaction.
 */
export const commitTransaction: API.OperationMethod<
  CommitTransactionRequest,
  CommitTransactionResponse,
  CommitTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CommitTransactionRequest,
  output: CommitTransactionResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    TransactionCanceledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CommitTransaction",
}));

export type CreateDataCellsFilterError =
  | AccessDeniedException
  | AlreadyExistsException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a data cell filter to allow one to grant access to certain columns on certain rows.
 */
export const createDataCellsFilter: API.OperationMethod<
  CreateDataCellsFilterRequest,
  CreateDataCellsFilterResponse,
  CreateDataCellsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataCellsFilterRequest,
  output: CreateDataCellsFilterResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataCellsFilter",
}));

export type CreateLakeFormationIdentityCenterConfigurationError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Creates an IAM Identity Center connection with Lake Formation to allow IAM Identity Center users and groups to access Data Catalog resources.
 */
export const createLakeFormationIdentityCenterConfiguration: API.OperationMethod<
  CreateLakeFormationIdentityCenterConfigurationRequest,
  CreateLakeFormationIdentityCenterConfigurationResponse,
  CreateLakeFormationIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLakeFormationIdentityCenterConfigurationRequest,
  output: CreateLakeFormationIdentityCenterConfigurationResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLakeFormationIdentityCenterConfiguration",
}));

export type CreateLakeFormationOptInError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Enforce Lake Formation permissions for the given databases, tables, and principals.
 */
export const createLakeFormationOptIn: API.OperationMethod<
  CreateLakeFormationOptInRequest,
  CreateLakeFormationOptInResponse,
  CreateLakeFormationOptInError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLakeFormationOptInRequest,
  output: CreateLakeFormationOptInResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLakeFormationOptIn",
}));

export type CreateLFTagError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates an LF-tag with the specified name and values.
 */
export const createLFTag: API.OperationMethod<
  CreateLFTagRequest,
  CreateLFTagResponse,
  CreateLFTagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLFTagRequest,
  output: CreateLFTagResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLFTag",
}));

export type CreateLFTagExpressionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new LF-Tag expression with the provided name, description, catalog ID, and
 * expression body. This call fails if a LF-Tag expression with the same name already exists in
 * the caller’s account or if the underlying LF-Tags don't exist. To call this API operation,
 * caller needs the following Lake Formation permissions:
 *
 * `CREATE_LF_TAG_EXPRESSION` on the root catalog resource.
 *
 * `GRANT_WITH_LF_TAG_EXPRESSION` on all underlying LF-Tag key:value pairs
 * included in the expression.
 */
export const createLFTagExpression: API.OperationMethod<
  CreateLFTagExpressionRequest,
  CreateLFTagExpressionResponse,
  CreateLFTagExpressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLFTagExpressionRequest,
  output: CreateLFTagExpressionResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLFTagExpression",
}));

export type DeleteDataCellsFilterError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a data cell filter.
 */
export const deleteDataCellsFilter: API.OperationMethod<
  DeleteDataCellsFilterRequest,
  DeleteDataCellsFilterResponse,
  DeleteDataCellsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataCellsFilterRequest,
  output: DeleteDataCellsFilterResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataCellsFilter",
}));

export type DeleteLakeFormationIdentityCenterConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes an IAM Identity Center connection with Lake Formation.
 */
export const deleteLakeFormationIdentityCenterConfiguration: API.OperationMethod<
  DeleteLakeFormationIdentityCenterConfigurationRequest,
  DeleteLakeFormationIdentityCenterConfigurationResponse,
  DeleteLakeFormationIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLakeFormationIdentityCenterConfigurationRequest,
  output: DeleteLakeFormationIdentityCenterConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLakeFormationIdentityCenterConfiguration",
}));

export type DeleteLakeFormationOptInError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Remove the Lake Formation permissions enforcement of the given databases, tables, and principals.
 */
export const deleteLakeFormationOptIn: API.OperationMethod<
  DeleteLakeFormationOptInRequest,
  DeleteLakeFormationOptInResponse,
  DeleteLakeFormationOptInError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLakeFormationOptInRequest,
  output: DeleteLakeFormationOptInResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLakeFormationOptIn",
}));

export type DeleteLFTagError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes an LF-tag by its key name. The operation fails if the specified tag key doesn't
 * exist. When you delete an LF-Tag:
 *
 * - The associated LF-Tag policy becomes invalid.
 *
 * - Resources that had this tag assigned will no longer have the tag policy applied to
 * them.
 */
export const deleteLFTag: API.OperationMethod<
  DeleteLFTagRequest,
  DeleteLFTagResponse,
  DeleteLFTagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLFTagRequest,
  output: DeleteLFTagResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLFTag",
}));

export type DeleteLFTagExpressionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes the LF-Tag expression. The caller must be a data lake admin or have `DROP` permissions on the LF-Tag expression.
 * Deleting a LF-Tag expression will also delete all `LFTagPolicy` permissions referencing the LF-Tag expression.
 */
export const deleteLFTagExpression: API.OperationMethod<
  DeleteLFTagExpressionRequest,
  DeleteLFTagExpressionResponse,
  DeleteLFTagExpressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLFTagExpressionRequest,
  output: DeleteLFTagExpressionResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLFTagExpression",
}));

export type DeleteObjectsOnCancelError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | TransactionCanceledException
  | TransactionCommittedException
  | CommonErrors;
/**
 * For a specific governed table, provides a list of Amazon S3 objects that will be written during the current transaction and that can be automatically deleted
 * if the transaction is canceled. Without this call, no Amazon S3 objects are automatically deleted when a transaction cancels.
 *
 * The Glue ETL library function `write_dynamic_frame.from_catalog()` includes an option to automatically
 * call `DeleteObjectsOnCancel` before writes. For more information, see
 * Rolling Back Amazon S3 Writes.
 */
export const deleteObjectsOnCancel: API.OperationMethod<
  DeleteObjectsOnCancelRequest,
  DeleteObjectsOnCancelResponse,
  DeleteObjectsOnCancelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteObjectsOnCancelRequest,
  output: DeleteObjectsOnCancelResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
    TransactionCanceledException,
    TransactionCommittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteObjectsOnCancel",
}));

export type DeregisterResourceError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | LastServiceLinkedRoleRegistration
  | CommonErrors;
/**
 * Deregisters the resource as managed by the Data Catalog.
 *
 * When you deregister a path, Lake Formation removes the path from the inline policy attached to your service-linked role.
 */
export const deregisterResource: API.OperationMethod<
  DeregisterResourceRequest,
  DeregisterResourceResponse,
  DeregisterResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeregisterResourceRequest,
  output: DeregisterResourceResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    LastServiceLinkedRoleRegistration,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterResource",
}));

export type DescribeLakeFormationIdentityCenterConfigurationError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the instance ARN and application ARN for the connection.
 */
export const describeLakeFormationIdentityCenterConfiguration: API.OperationMethod<
  DescribeLakeFormationIdentityCenterConfigurationRequest,
  DescribeLakeFormationIdentityCenterConfigurationResponse,
  DescribeLakeFormationIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLakeFormationIdentityCenterConfigurationRequest,
  output: DescribeLakeFormationIdentityCenterConfigurationResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLakeFormationIdentityCenterConfiguration",
}));

export type DescribeResourceError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the current data access role for the given resource registered in Lake Formation.
 */
export const describeResource: API.OperationMethod<
  DescribeResourceRequest,
  DescribeResourceResponse,
  DescribeResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeResourceRequest,
  output: DescribeResourceResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResource",
}));

export type DescribeTransactionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the details of a single transaction.
 */
export const describeTransaction: API.OperationMethod<
  DescribeTransactionRequest,
  DescribeTransactionResponse,
  DescribeTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTransactionRequest,
  output: DescribeTransactionResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTransaction",
}));

export type ExtendTransactionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | TransactionCanceledException
  | TransactionCommitInProgressException
  | TransactionCommittedException
  | CommonErrors;
/**
 * Indicates to the service that the specified transaction is still active and should not be treated as idle and aborted.
 *
 * Write transactions that remain idle for a long period are automatically aborted unless explicitly extended.
 */
export const extendTransaction: API.OperationMethod<
  ExtendTransactionRequest,
  ExtendTransactionResponse,
  ExtendTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExtendTransactionRequest,
  output: ExtendTransactionResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    TransactionCanceledException,
    TransactionCommitInProgressException,
    TransactionCommittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExtendTransaction",
}));

export type GetDataCellsFilterError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a data cells filter.
 */
export const getDataCellsFilter: API.OperationMethod<
  GetDataCellsFilterRequest,
  GetDataCellsFilterResponse,
  GetDataCellsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataCellsFilterRequest,
  output: GetDataCellsFilterResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataCellsFilter",
}));

export type GetDataLakePrincipalError =
  | AccessDeniedException
  | InternalServiceException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the identity of the invoking principal.
 */
export const getDataLakePrincipal: API.OperationMethod<
  GetDataLakePrincipalRequest,
  GetDataLakePrincipalResponse,
  GetDataLakePrincipalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataLakePrincipalRequest,
  output: GetDataLakePrincipalResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataLakePrincipal",
}));

export type GetDataLakeSettingsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Retrieves the list of the data lake administrators of a Lake Formation-managed data lake.
 */
export const getDataLakeSettings: API.OperationMethod<
  GetDataLakeSettingsRequest,
  GetDataLakeSettingsResponse,
  GetDataLakeSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataLakeSettingsRequest,
  output: GetDataLakeSettingsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataLakeSettings",
}));

export type GetEffectivePermissionsForPathError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the Lake Formation permissions for a specified table or database resource located
 * at a path in Amazon S3. `GetEffectivePermissionsForPath` will not return databases and tables if the catalog is encrypted.
 */
export const getEffectivePermissionsForPath: API.PaginatedOperationMethod<
  GetEffectivePermissionsForPathRequest,
  GetEffectivePermissionsForPathResponse,
  GetEffectivePermissionsForPathError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetEffectivePermissionsForPathRequest,
  output: GetEffectivePermissionsForPathResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEffectivePermissionsForPath",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetLFTagError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns an LF-tag definition.
 */
export const getLFTag: API.OperationMethod<
  GetLFTagRequest,
  GetLFTagResponse,
  GetLFTagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLFTagRequest,
  output: GetLFTagResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLFTag",
}));

export type GetLFTagExpressionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the details about the LF-Tag expression. The caller must be a data lake admin or must have `DESCRIBE` permission on the LF-Tag expression resource.
 */
export const getLFTagExpression: API.OperationMethod<
  GetLFTagExpressionRequest,
  GetLFTagExpressionResponse,
  GetLFTagExpressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLFTagExpressionRequest,
  output: GetLFTagExpressionResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLFTagExpression",
}));

export type GetQueryStateError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns the state of a query previously submitted. Clients are expected to poll `GetQueryState` to monitor the current state of the planning before retrieving the work units. A query state is only visible to the principal that made the initial call to `StartQueryPlanning`.
 */
export const getQueryState: API.OperationMethod<
  GetQueryStateRequest,
  GetQueryStateResponse,
  GetQueryStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQueryStateRequest,
  output: GetQueryStateResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryState",
  endpointHostPrefix: "query-",
}));

export type GetQueryStatisticsError =
  | AccessDeniedException
  | ExpiredException
  | InternalServiceException
  | InvalidInputException
  | StatisticsNotReadyYetException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves statistics on the planning and execution of a query.
 */
export const getQueryStatistics: API.OperationMethod<
  GetQueryStatisticsRequest,
  GetQueryStatisticsResponse,
  GetQueryStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQueryStatisticsRequest,
  output: GetQueryStatisticsResponse,
  errors: [
    AccessDeniedException,
    ExpiredException,
    InternalServiceException,
    InvalidInputException,
    StatisticsNotReadyYetException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryStatistics",
  endpointHostPrefix: "query-",
}));

export type GetResourceLFTagsError =
  | AccessDeniedException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the LF-tags applied to a resource.
 */
export const getResourceLFTags: API.OperationMethod<
  GetResourceLFTagsRequest,
  GetResourceLFTagsResponse,
  GetResourceLFTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceLFTagsRequest,
  output: GetResourceLFTagsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceLFTags",
}));

export type GetTableObjectsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | TransactionCanceledException
  | TransactionCommittedException
  | CommonErrors;
/**
 * Returns the set of Amazon S3 objects that make up the specified governed table. A transaction ID or timestamp can be specified for time-travel queries.
 */
export const getTableObjects: API.PaginatedOperationMethod<
  GetTableObjectsRequest,
  GetTableObjectsResponse,
  GetTableObjectsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetTableObjectsRequest,
  output: GetTableObjectsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
    TransactionCanceledException,
    TransactionCommittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableObjects",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetTemporaryDataLocationCredentialsError =
  | AccessDeniedException
  | ConflictException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Allows a user or application in a secure environment to access data in a specific Amazon S3 location registered with Lake Formation by providing temporary scoped credentials that are limited to the requested data location and
 * the caller's authorized access level.
 *
 * `GetDataAccess` is logged in CloudTrail whenever a principal requests temporary data location credentials to access data in a data lake location that is registered with Lake Formation.
 *
 * The API operation returns an error in the following scenarios:
 *
 * - The data location is not registered with Lake Formation.
 *
 * - No Glue table is associated with the data location.
 *
 * - The caller doesn't have required permissions on the associated table. The caller must have
 * `SELECT` or `SUPER` permissions on the associated table, and
 * credential vending for full table access must be enabled in the data lake settings.
 *
 * For more information, see Application integration for full table access.
 *
 * - The data location is in a different Amazon Web Services Region. Lake Formation doesn't
 * support cross-Region access when vending credentials for a data location. Lake Formation only supports Amazon S3 paths registered within the same Region as the API
 * call.
 */
export const getTemporaryDataLocationCredentials: API.OperationMethod<
  GetTemporaryDataLocationCredentialsRequest,
  GetTemporaryDataLocationCredentialsResponse,
  GetTemporaryDataLocationCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTemporaryDataLocationCredentialsRequest,
  output: GetTemporaryDataLocationCredentialsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemporaryDataLocationCredentials",
}));

export type GetTemporaryGluePartitionCredentialsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | PermissionTypeMismatchException
  | CommonErrors;
/**
 * This API is identical to `GetTemporaryTableCredentials` except that this is used when the target Data Catalog resource is of type Partition. Lake Formation restricts the permission of the vended credentials with the same scope down policy which restricts access to a single Amazon S3 prefix.
 */
export const getTemporaryGluePartitionCredentials: API.OperationMethod<
  GetTemporaryGluePartitionCredentialsRequest,
  GetTemporaryGluePartitionCredentialsResponse,
  GetTemporaryGluePartitionCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTemporaryGluePartitionCredentialsRequest,
  output: GetTemporaryGluePartitionCredentialsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    PermissionTypeMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemporaryGluePartitionCredentials",
}));

export type GetTemporaryGlueTableCredentialsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | PermissionTypeMismatchException
  | CommonErrors;
/**
 * Allows a caller in a secure environment to assume a role with permission to access Amazon S3. In order to vend such credentials, Lake Formation assumes the role associated with a registered location, for example an Amazon S3 bucket, with a scope down policy which restricts the access to a single prefix.
 *
 * To call this API, the role that the service assumes must have `lakeformation:GetDataAccess` permission on the resource.
 */
export const getTemporaryGlueTableCredentials: API.OperationMethod<
  GetTemporaryGlueTableCredentialsRequest,
  GetTemporaryGlueTableCredentialsResponse,
  GetTemporaryGlueTableCredentialsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTemporaryGlueTableCredentialsRequest,
  output: GetTemporaryGlueTableCredentialsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    PermissionTypeMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemporaryGlueTableCredentials",
}));

export type GetWorkUnitResultsError =
  | AccessDeniedException
  | ExpiredException
  | InternalServiceException
  | InvalidInputException
  | ThrottledException
  | CommonErrors;
/**
 * Returns the work units resulting from the query. Work units can be executed in any order and in parallel.
 */
export const getWorkUnitResults: API.OperationMethod<
  GetWorkUnitResultsRequest,
  GetWorkUnitResultsResponse,
  GetWorkUnitResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkUnitResultsRequest,
  output: GetWorkUnitResultsResponse,
  errors: [
    AccessDeniedException,
    ExpiredException,
    InternalServiceException,
    InvalidInputException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkUnitResults",
  endpointHostPrefix: "data-",
}));

export type GetWorkUnitsError =
  | AccessDeniedException
  | ExpiredException
  | InternalServiceException
  | InvalidInputException
  | WorkUnitsNotReadyYetException
  | CommonErrors;
/**
 * Retrieves the work units generated by the `StartQueryPlanning` operation.
 */
export const getWorkUnits: API.PaginatedOperationMethod<
  GetWorkUnitsRequest,
  GetWorkUnitsResponse,
  GetWorkUnitsError,
  Credentials | HttpClient.HttpClient,
  WorkUnitRange
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetWorkUnitsRequest,
  output: GetWorkUnitsResponse,
  errors: [
    AccessDeniedException,
    ExpiredException,
    InternalServiceException,
    InvalidInputException,
    WorkUnitsNotReadyYetException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkUnits",
  endpointHostPrefix: "query-",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WorkUnitRanges",
    pageSize: "PageSize",
  } as const,
})) as any;

export type GrantPermissionsError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InvalidInputException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Grants permissions to the principal to access metadata in the Data Catalog and data organized in underlying data storage such as Amazon S3.
 *
 * For information about permissions, see Security and Access Control to Metadata and Data.
 */
export const grantPermissions: API.OperationMethod<
  GrantPermissionsRequest,
  GrantPermissionsResponse,
  GrantPermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GrantPermissionsRequest,
  output: GrantPermissionsResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GrantPermissions",
}));

export type ListDataCellsFilterError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists all the data cell filters on a table.
 */
export const listDataCellsFilter: API.PaginatedOperationMethod<
  ListDataCellsFilterRequest,
  ListDataCellsFilterResponse,
  ListDataCellsFilterError,
  Credentials | HttpClient.HttpClient,
  DataCellsFilter
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataCellsFilterRequest,
  output: ListDataCellsFilterResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataCellsFilter",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataCellsFilters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLakeFormationOptInsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | EntityNotFoundException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Retrieve the current list of resources and principals that are opt in to enforce Lake Formation permissions.
 */
export const listLakeFormationOptIns: API.PaginatedOperationMethod<
  ListLakeFormationOptInsRequest,
  ListLakeFormationOptInsResponse,
  ListLakeFormationOptInsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLakeFormationOptInsRequest,
  output: ListLakeFormationOptInsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    EntityNotFoundException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLakeFormationOptIns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLFTagExpressionsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the LF-Tag expressions in caller’s account filtered based on caller's permissions. Data Lake and read only admins implicitly can see all tag expressions in their account, else caller needs DESCRIBE permissions on tag expression.
 */
export const listLFTagExpressions: API.PaginatedOperationMethod<
  ListLFTagExpressionsRequest,
  ListLFTagExpressionsResponse,
  ListLFTagExpressionsError,
  Credentials | HttpClient.HttpClient,
  LFTagExpression
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLFTagExpressionsRequest,
  output: ListLFTagExpressionsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLFTagExpressions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LFTagExpressions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLFTagsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists LF-tags that the requester has permission to view.
 */
export const listLFTags: API.PaginatedOperationMethod<
  ListLFTagsRequest,
  ListLFTagsResponse,
  ListLFTagsError,
  Credentials | HttpClient.HttpClient,
  LFTagPair
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLFTagsRequest,
  output: ListLFTagsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLFTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LFTags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPermissionsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Returns a list of the principal permissions on the resource, filtered by the permissions of the caller. For example, if you are granted an ALTER permission, you are able to see only the principal permissions for ALTER.
 *
 * This operation returns only those permissions that have been explicitly granted. If both
 * `Principal` and `Resource` parameters are provided, the response
 * returns effective permissions rather than the explicitly granted permissions.
 *
 * For information about permissions, see Security and Access Control to Metadata and Data.
 */
export const listPermissions: API.PaginatedOperationMethod<
  ListPermissionsRequest,
  ListPermissionsResponse,
  ListPermissionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPermissionsRequest,
  output: ListPermissionsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPermissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourcesError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists the resources registered to be managed by the Data Catalog.
 */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesRequest,
  ListResourcesResponse,
  ListResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourcesRequest,
  output: ListResourcesResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTableStorageOptimizersError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns the configuration of all storage optimizers associated with a specified table.
 */
export const listTableStorageOptimizers: API.PaginatedOperationMethod<
  ListTableStorageOptimizersRequest,
  ListTableStorageOptimizersResponse,
  ListTableStorageOptimizersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTableStorageOptimizersRequest,
  output: ListTableStorageOptimizersResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTableStorageOptimizers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTransactionsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns metadata about transactions and their status. To prevent the response from growing indefinitely, only uncommitted transactions and those available for time-travel queries are returned.
 *
 * This operation can help you identify uncommitted transactions or to get information about transactions.
 */
export const listTransactions: API.PaginatedOperationMethod<
  ListTransactionsRequest,
  ListTransactionsResponse,
  ListTransactionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTransactionsRequest,
  output: ListTransactionsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTransactions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutDataLakeSettingsError =
  | InternalServiceException
  | InvalidInputException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Sets the list of data lake administrators who have admin privileges on all resources managed by Lake Formation. For more information on admin privileges, see Granting Lake Formation Permissions.
 *
 * This API replaces the current list of data lake admins with the new list being passed. To add an admin, fetch the current list and add the new admin to that list and pass that list in this API.
 */
export const putDataLakeSettings: API.OperationMethod<
  PutDataLakeSettingsRequest,
  PutDataLakeSettingsResponse,
  PutDataLakeSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDataLakeSettingsRequest,
  output: PutDataLakeSettingsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataLakeSettings",
}));

export type RegisterResourceError =
  | AccessDeniedException
  | AlreadyExistsException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Registers the resource as managed by the Data Catalog.
 *
 * To add or update data, Lake Formation needs read/write access to the chosen data location. Choose a role that you know has permission to do this, or choose the AWSServiceRoleForLakeFormationDataAccess service-linked role. When you register the first Amazon S3 path, the service-linked role and a new inline policy are created on your behalf. Lake Formation adds the first path to the inline policy and attaches it to the service-linked role. When you register subsequent paths, Lake Formation adds the path to the existing policy.
 *
 * The following request registers a new location and gives Lake Formation permission to use the service-linked role to access that location.
 *
 * ResourceArn = arn:aws:s3:::my-bucket/
 * UseServiceLinkedRole = true
 *
 * If `UseServiceLinkedRole` is not set to true, you must provide or set the `RoleArn`:
 *
 * `arn:aws:iam::12345:role/my-data-access-role`
 */
export const registerResource: API.OperationMethod<
  RegisterResourceRequest,
  RegisterResourceResponse,
  RegisterResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterResourceRequest,
  output: RegisterResourceResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterResource",
}));

export type RemoveLFTagsFromResourceError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Removes an LF-tag from the resource. Only database, table, or tableWithColumns resource are allowed. To tag columns, use the column inclusion list in `tableWithColumns` to specify column input.
 */
export const removeLFTagsFromResource: API.OperationMethod<
  RemoveLFTagsFromResourceRequest,
  RemoveLFTagsFromResourceResponse,
  RemoveLFTagsFromResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveLFTagsFromResourceRequest,
  output: RemoveLFTagsFromResourceResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveLFTagsFromResource",
}));

export type RevokePermissionsError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InvalidInputException
  | InvalidLakeFormationPrincipal
  | CommonErrors;
/**
 * Revokes permissions to the principal to access metadata in the Data Catalog and data organized in underlying data storage such as Amazon S3.
 */
export const revokePermissions: API.OperationMethod<
  RevokePermissionsRequest,
  RevokePermissionsResponse,
  RevokePermissionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RevokePermissionsRequest,
  output: RevokePermissionsResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
    InvalidLakeFormationPrincipal,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RevokePermissions",
}));

export type SearchDatabasesByLFTagsError =
  | AccessDeniedException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * This operation allows a search on `DATABASE` resources by `TagCondition`. This operation is used by admins who want to grant user permissions on certain `TagConditions`. Before making a grant, the admin can use `SearchDatabasesByTags` to find all resources where the given `TagConditions` are valid to verify whether the returned resources can be shared.
 */
export const searchDatabasesByLFTags: API.PaginatedOperationMethod<
  SearchDatabasesByLFTagsRequest,
  SearchDatabasesByLFTagsResponse,
  SearchDatabasesByLFTagsError,
  Credentials | HttpClient.HttpClient,
  TaggedDatabase
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchDatabasesByLFTagsRequest,
  output: SearchDatabasesByLFTagsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchDatabasesByLFTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatabaseList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchTablesByLFTagsError =
  | AccessDeniedException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * This operation allows a search on `TABLE` resources by `LFTag`s. This will be used by admins who want to grant user permissions on certain LF-tags. Before making a grant, the admin can use `SearchTablesByLFTags` to find all resources where the given `LFTag`s are valid to verify whether the returned resources can be shared.
 */
export const searchTablesByLFTags: API.PaginatedOperationMethod<
  SearchTablesByLFTagsRequest,
  SearchTablesByLFTagsResponse,
  SearchTablesByLFTagsError,
  Credentials | HttpClient.HttpClient,
  TaggedTable
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchTablesByLFTagsRequest,
  output: SearchTablesByLFTagsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchTablesByLFTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TableList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartQueryPlanningError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ThrottledException
  | CommonErrors;
/**
 * Submits a request to process a query statement.
 *
 * This operation generates work units that can be retrieved with the `GetWorkUnits` operation as soon as the query state is WORKUNITS_AVAILABLE or FINISHED.
 */
export const startQueryPlanning: API.OperationMethod<
  StartQueryPlanningRequest,
  StartQueryPlanningResponse,
  StartQueryPlanningError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartQueryPlanningRequest,
  output: StartQueryPlanningResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQueryPlanning",
  endpointHostPrefix: "query-",
}));

export type StartTransactionError =
  | InternalServiceException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Starts a new transaction and returns its transaction ID. Transaction IDs are opaque objects that you can use to identify a transaction.
 */
export const startTransaction: API.OperationMethod<
  StartTransactionRequest,
  StartTransactionResponse,
  StartTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTransactionRequest,
  output: StartTransactionResponse,
  errors: [InternalServiceException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTransaction",
}));

export type UpdateDataCellsFilterError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates a data cell filter.
 */
export const updateDataCellsFilter: API.OperationMethod<
  UpdateDataCellsFilterRequest,
  UpdateDataCellsFilterResponse,
  UpdateDataCellsFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataCellsFilterRequest,
  output: UpdateDataCellsFilterResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataCellsFilter",
}));

export type UpdateLakeFormationIdentityCenterConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates the IAM Identity Center connection parameters.
 */
export const updateLakeFormationIdentityCenterConfiguration: API.OperationMethod<
  UpdateLakeFormationIdentityCenterConfigurationRequest,
  UpdateLakeFormationIdentityCenterConfigurationResponse,
  UpdateLakeFormationIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLakeFormationIdentityCenterConfigurationRequest,
  output: UpdateLakeFormationIdentityCenterConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLakeFormationIdentityCenterConfiguration",
}));

export type UpdateLFTagError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates the list of possible values for the specified LF-tag key. If the LF-tag does not exist, the operation throws an EntityNotFoundException. The values in the delete key values will be deleted from list of possible values. If any value in the delete key values is attached to a resource, then API errors out with a 400 Exception - "Update not allowed". Untag the attribute before deleting the LF-tag key's value.
 */
export const updateLFTag: API.OperationMethod<
  UpdateLFTagRequest,
  UpdateLFTagResponse,
  UpdateLFTagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLFTagRequest,
  output: UpdateLFTagResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLFTag",
}));

export type UpdateLFTagExpressionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Updates the name of the LF-Tag expression to the new description and expression body provided.
 * Updating a LF-Tag expression immediately changes the permission boundaries of all existing `LFTagPolicy` permission grants that reference the given LF-Tag expression.
 */
export const updateLFTagExpression: API.OperationMethod<
  UpdateLFTagExpressionRequest,
  UpdateLFTagExpressionResponse,
  UpdateLFTagExpressionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLFTagExpressionRequest,
  output: UpdateLFTagExpressionResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLFTagExpression",
}));

export type UpdateResourceError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates the data access role used for vending access to the given (registered) resource in Lake Formation.
 */
export const updateResource: API.OperationMethod<
  UpdateResourceRequest,
  UpdateResourceResponse,
  UpdateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResourceRequest,
  output: UpdateResourceResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResource",
}));

export type UpdateTableObjectsError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | TransactionCanceledException
  | TransactionCommitInProgressException
  | TransactionCommittedException
  | CommonErrors;
/**
 * Updates the manifest of Amazon S3 objects that make up the specified governed table.
 */
export const updateTableObjects: API.OperationMethod<
  UpdateTableObjectsRequest,
  UpdateTableObjectsResponse,
  UpdateTableObjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTableObjectsRequest,
  output: UpdateTableObjectsResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
    TransactionCanceledException,
    TransactionCommitInProgressException,
    TransactionCommittedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTableObjects",
}));

export type UpdateTableStorageOptimizerError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Updates the configuration of the storage optimizers for a table.
 */
export const updateTableStorageOptimizer: API.OperationMethod<
  UpdateTableStorageOptimizerRequest,
  UpdateTableStorageOptimizerResponse,
  UpdateTableStorageOptimizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTableStorageOptimizerRequest,
  output: UpdateTableStorageOptimizerResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTableStorageOptimizer",
}));
