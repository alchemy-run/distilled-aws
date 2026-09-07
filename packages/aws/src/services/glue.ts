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
const svc = T.AwsApiService({ sdkId: "Glue", serviceShapeName: "AWSGlue" });
const auth = T.AwsAuthSigv4({ name: "glue" });
const ver = T.ServiceVersion("2017-03-31");
const proto = T.AwsProtocolsAwsJson1_1();
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
              `https://glue-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://glue-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://glue.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://glue.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  ).pipe(C.withAuthError) {}
export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class ColumnStatisticsTaskNotRunningException
  extends /*@__PURE__*/ S.TaggedError<ColumnStatisticsTaskNotRunningException>()(
    "ColumnStatisticsTaskNotRunningException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ColumnStatisticsTaskRunningException
  extends /*@__PURE__*/ S.TaggedError<ColumnStatisticsTaskRunningException>()(
    "ColumnStatisticsTaskRunningException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ColumnStatisticsTaskStoppingException
  extends /*@__PURE__*/ S.TaggedError<ColumnStatisticsTaskStoppingException>()(
    "ColumnStatisticsTaskStoppingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConcurrentRunsExceededException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentRunsExceededException>()(
    "ConcurrentRunsExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConditionCheckFailureException
  extends /*@__PURE__*/ S.TaggedError<ConditionCheckFailureException>()(
    "ConditionCheckFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CrawlerNotRunningException
  extends /*@__PURE__*/ S.TaggedError<CrawlerNotRunningException>()(
    "CrawlerNotRunningException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CrawlerRunningException
  extends /*@__PURE__*/ S.TaggedError<CrawlerRunningException>()(
    "CrawlerRunningException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class CrawlerStoppingException
  extends /*@__PURE__*/ S.TaggedError<CrawlerStoppingException>()(
    "CrawlerStoppingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class EntityNotFoundException
  extends /*@__PURE__*/ S.TaggedError<EntityNotFoundException>()(
    "EntityNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      FromFederationSource: S.optional(S.Boolean),
    },
  ) {}
export class FederatedResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<FederatedResourceAlreadyExistsException>()(
    "FederatedResourceAlreadyExistsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      AssociatedGlueResource: S.optional(S.String),
    },
  ).pipe(C.withAlreadyExistsError) {}
export class FederationSourceException
  extends /*@__PURE__*/ S.TaggedError<FederationSourceException>()(
    "FederationSourceException",
    {
      FederationSourceErrorCode: S.optional(
        S.suspend(() => FederationSourceErrorCode).annotate({
          identifier: "FederationSourceErrorCode",
        }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ) {}
export class FederationSourceRetryableException
  extends /*@__PURE__*/ S.TaggedError<FederationSourceRetryableException>()(
    "FederationSourceRetryableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class GlueEncryptionException
  extends /*@__PURE__*/ S.TaggedError<GlueEncryptionException>()(
    "GlueEncryptionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class GlueRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<GlueRoleNotAssumable>()(
    "GlueRoleNotAssumable",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      FromFederationSource: S.optional(S.Boolean),
    },
    T.SyntheticError({
      from: "InvalidInputException",
      message: { includes: "unable to assume" },
    }),
  ).pipe(C.withRetryableError) {}
export class GlueS3TargetNotReady
  extends /*@__PURE__*/ S.TaggedError<GlueS3TargetNotReady>()(
    "GlueS3TargetNotReady",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      FromFederationSource: S.optional(S.Boolean),
    },
    T.SyntheticError({
      from: "InvalidInputException",
      message: { includes: "InvalidAccessKeyId" },
    }),
  ).pipe(C.withRetryableError) {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IllegalBlueprintStateException
  extends /*@__PURE__*/ S.TaggedError<IllegalBlueprintStateException>()(
    "IllegalBlueprintStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IllegalSessionStateException
  extends /*@__PURE__*/ S.TaggedError<IllegalSessionStateException>()(
    "IllegalSessionStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IllegalWorkflowStateException
  extends /*@__PURE__*/ S.TaggedError<IllegalWorkflowStateException>()(
    "IllegalWorkflowStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class IntegrationConflictOperationFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationConflictOperationFault>()(
    "IntegrationConflictOperationFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class IntegrationNotFoundFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationNotFoundFault>()(
    "IntegrationNotFoundFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class IntegrationQuotaExceededFault
  extends /*@__PURE__*/ S.TaggedError<IntegrationQuotaExceededFault>()(
    "IntegrationQuotaExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()(
    "InternalServiceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      FromFederationSource: S.optional(S.Boolean),
    },
  ) {}
export class InvalidIntegrationStateFault
  extends /*@__PURE__*/ S.TaggedError<InvalidIntegrationStateFault>()(
    "InvalidIntegrationStateFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class KMSKeyNotAccessibleFault
  extends /*@__PURE__*/ S.TaggedError<KMSKeyNotAccessibleFault>()(
    "KMSKeyNotAccessibleFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MaterializedViewRefreshTaskNotRunningException
  extends /*@__PURE__*/ S.TaggedError<MaterializedViewRefreshTaskNotRunningException>()(
    "MaterializedViewRefreshTaskNotRunningException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MaterializedViewRefreshTaskRunningException
  extends /*@__PURE__*/ S.TaggedError<MaterializedViewRefreshTaskRunningException>()(
    "MaterializedViewRefreshTaskRunningException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MaterializedViewRefreshTaskStoppingException
  extends /*@__PURE__*/ S.TaggedError<MaterializedViewRefreshTaskStoppingException>()(
    "MaterializedViewRefreshTaskStoppingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class MLTransformNotReadyException
  extends /*@__PURE__*/ S.TaggedError<MLTransformNotReadyException>()(
    "MLTransformNotReadyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NoScheduleException
  extends /*@__PURE__*/ S.TaggedError<NoScheduleException>()(
    "NoScheduleException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class OperationNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotSupportedException>()(
    "OperationNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
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
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotReadyException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotReadyException>()(
    "ResourceNotReadyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNumberLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceNumberLimitExceededException>()(
    "ResourceNumberLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class SchedulerNotRunningException
  extends /*@__PURE__*/ S.TaggedError<SchedulerNotRunningException>()(
    "SchedulerNotRunningException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class SchedulerRunningException
  extends /*@__PURE__*/ S.TaggedError<SchedulerRunningException>()(
    "SchedulerRunningException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class SchedulerTransitioningException
  extends /*@__PURE__*/ S.TaggedError<SchedulerTransitioningException>()(
    "SchedulerTransitioningException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class SessionBusyException
  extends /*@__PURE__*/ S.TaggedError<SessionBusyException>()(
    "SessionBusyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class TargetResourceNotFound
  extends /*@__PURE__*/ S.TaggedError<TargetResourceNotFound>()(
    "TargetResourceNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class VersionMismatchException
  extends /*@__PURE__*/ S.TaggedError<VersionMismatchException>()(
    "VersionMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type AssetId = string;
export type GlossaryTermId = string;
export type GlossaryTermIdList = string[];
export const GlossaryTermIdList = /*@__PURE__*/ S.Array(S.String);
export type HashString = string;
export interface AssociateGlossaryTermsRequest {
  AssetIdentifier: string;
  GlossaryTermIdentifiers: string[];
  ClientToken?: string;
}
export const AssociateGlossaryTermsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetIdentifier: S.String.pipe(T.HttpLabel("AssetIdentifier")),
    GlossaryTermIdentifiers: GlossaryTermIdList,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/assets/{AssetIdentifier}/associate-glossary-terms",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateGlossaryTermsRequest",
}) as any as S.Schema<AssociateGlossaryTermsRequest>;
export interface AssociateGlossaryTermsResponse {
  AssetIdentifier?: string;
  GlossaryTerms?: string[];
}
export const AssociateGlossaryTermsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetIdentifier: S.optional(S.String),
    GlossaryTerms: S.optional(GlossaryTermIdList),
  }),
).annotate({
  identifier: "AssociateGlossaryTermsResponse",
}) as any as S.Schema<AssociateGlossaryTermsResponse>;
export type CatalogIdString = string;
export type NameString = string;
export type ValueString = string;
export type ValueStringList = string[];
export const ValueStringList = /*@__PURE__*/ S.Array(S.String);
export type ColumnTypeString = string;
export type CommentString = string;
export type KeyString = string;
export type ParametersMapValue = string;
export type ParametersMap = { [key: string]: string | undefined };
export const ParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Column {
  Name: string;
  Type?: string;
  Comment?: string;
  Parameters?: { [key: string]: string | undefined };
}
export const Column = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Type: S.optional(S.String),
    Comment: S.optional(S.String),
    Parameters: S.optional(ParametersMap),
  }),
).annotate({ identifier: "Column" }) as any as S.Schema<Column>;
export type ColumnList = Column[];
export const ColumnList = /*@__PURE__*/ S.Array(Column);
export type LocationString = string;
export type LocationStringList = string[];
export const LocationStringList = /*@__PURE__*/ S.Array(S.String);
export type FormatString = string;
export interface SerDeInfo {
  Name?: string;
  SerializationLibrary?: string;
  Parameters?: { [key: string]: string | undefined };
}
export const SerDeInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SerializationLibrary: S.optional(S.String),
    Parameters: S.optional(ParametersMap),
  }),
).annotate({ identifier: "SerDeInfo" }) as any as S.Schema<SerDeInfo>;
export type NameStringList = string[];
export const NameStringList = /*@__PURE__*/ S.Array(S.String);
export type IntegerFlag = number;
export interface Order {
  Column: string;
  SortOrder: number;
}
export const Order = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Column: S.String, SortOrder: S.Number }),
).annotate({ identifier: "Order" }) as any as S.Schema<Order>;
export type OrderList = Order[];
export const OrderList = /*@__PURE__*/ S.Array(Order);
export type ColumnValuesString = string;
export type ColumnValueStringList = string[];
export const ColumnValueStringList = /*@__PURE__*/ S.Array(S.String);
export type LocationMap = { [key: string]: string | undefined };
export const LocationMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface SkewedInfo {
  SkewedColumnNames?: string[];
  SkewedColumnValues?: string[];
  SkewedColumnValueLocationMaps?: { [key: string]: string | undefined };
}
export const SkewedInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SkewedColumnNames: S.optional(NameStringList),
    SkewedColumnValues: S.optional(ColumnValueStringList),
    SkewedColumnValueLocationMaps: S.optional(LocationMap),
  }),
).annotate({ identifier: "SkewedInfo" }) as any as S.Schema<SkewedInfo>;
export type GlueResourceArn = string;
export type SchemaRegistryNameString = string;
export interface SchemaId {
  SchemaArn?: string;
  SchemaName?: string;
  RegistryName?: string;
}
export const SchemaId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaArn: S.optional(S.String),
    SchemaName: S.optional(S.String),
    RegistryName: S.optional(S.String),
  }),
).annotate({ identifier: "SchemaId" }) as any as S.Schema<SchemaId>;
export type SchemaVersionIdString = string;
export type VersionLongNumber = number;
export interface SchemaReference {
  SchemaId?: SchemaId;
  SchemaVersionId?: string;
  SchemaVersionNumber?: number;
}
export const SchemaReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: S.optional(SchemaId),
    SchemaVersionId: S.optional(S.String),
    SchemaVersionNumber: S.optional(S.Number),
  }),
).annotate({
  identifier: "SchemaReference",
}) as any as S.Schema<SchemaReference>;
export interface StorageDescriptor {
  Columns?: Column[];
  Location?: string;
  AdditionalLocations?: string[];
  InputFormat?: string;
  OutputFormat?: string;
  Compressed?: boolean;
  NumberOfBuckets?: number;
  SerdeInfo?: SerDeInfo;
  BucketColumns?: string[];
  SortColumns?: Order[];
  Parameters?: { [key: string]: string | undefined };
  SkewedInfo?: SkewedInfo;
  StoredAsSubDirectories?: boolean;
  SchemaReference?: SchemaReference;
}
export const StorageDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Columns: S.optional(ColumnList),
    Location: S.optional(S.String),
    AdditionalLocations: S.optional(LocationStringList),
    InputFormat: S.optional(S.String),
    OutputFormat: S.optional(S.String),
    Compressed: S.optional(S.Boolean),
    NumberOfBuckets: S.optional(S.Number),
    SerdeInfo: S.optional(SerDeInfo),
    BucketColumns: S.optional(NameStringList),
    SortColumns: S.optional(OrderList),
    Parameters: S.optional(ParametersMap),
    SkewedInfo: S.optional(SkewedInfo),
    StoredAsSubDirectories: S.optional(S.Boolean),
    SchemaReference: S.optional(SchemaReference),
  }),
).annotate({
  identifier: "StorageDescriptor",
}) as any as S.Schema<StorageDescriptor>;
export interface PartitionInput {
  Values?: string[];
  LastAccessTime?: Date;
  StorageDescriptor?: StorageDescriptor;
  Parameters?: { [key: string]: string | undefined };
  LastAnalyzedTime?: Date;
}
export const PartitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Values: S.optional(ValueStringList),
    LastAccessTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StorageDescriptor: S.optional(StorageDescriptor),
    Parameters: S.optional(ParametersMap),
    LastAnalyzedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "PartitionInput" }) as any as S.Schema<PartitionInput>;
export type PartitionInputList = PartitionInput[];
export const PartitionInputList = /*@__PURE__*/ S.Array(PartitionInput);
export interface BatchCreatePartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionInputList: PartitionInput[];
}
export const BatchCreatePartitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    PartitionInputList: PartitionInputList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchCreatePartitionRequest",
}) as any as S.Schema<BatchCreatePartitionRequest>;
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
export interface PartitionError {
  PartitionValues?: string[];
  ErrorDetail?: ErrorDetail;
}
export const PartitionError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PartitionValues: S.optional(ValueStringList),
    ErrorDetail: S.optional(ErrorDetail),
  }),
).annotate({ identifier: "PartitionError" }) as any as S.Schema<PartitionError>;
export type PartitionErrors = PartitionError[];
export const PartitionErrors = /*@__PURE__*/ S.Array(PartitionError);
export interface BatchCreatePartitionResponse {
  Errors?: PartitionError[];
}
export const BatchCreatePartitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Errors: S.optional(PartitionErrors) }),
).annotate({
  identifier: "BatchCreatePartitionResponse",
}) as any as S.Schema<BatchCreatePartitionResponse>;
export type DeleteConnectionNameList = string[];
export const DeleteConnectionNameList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteConnectionRequest {
  CatalogId?: string;
  ConnectionNameList: string[];
}
export const BatchDeleteConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    ConnectionNameList: DeleteConnectionNameList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchDeleteConnectionRequest",
}) as any as S.Schema<BatchDeleteConnectionRequest>;
export type ErrorByName = { [key: string]: ErrorDetail | undefined };
export const ErrorByName = /*@__PURE__*/ S.Record(
  S.String,
  ErrorDetail.pipe(S.optional),
);
export interface BatchDeleteConnectionResponse {
  Succeeded?: string[];
  Errors?: { [key: string]: ErrorDetail | undefined };
}
export const BatchDeleteConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Succeeded: S.optional(NameStringList),
    Errors: S.optional(ErrorByName),
  }),
).annotate({
  identifier: "BatchDeleteConnectionResponse",
}) as any as S.Schema<BatchDeleteConnectionResponse>;
export interface PartitionValueList {
  Values: string[];
}
export const PartitionValueList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Values: ValueStringList }),
).annotate({
  identifier: "PartitionValueList",
}) as any as S.Schema<PartitionValueList>;
export type BatchDeletePartitionValueList = PartitionValueList[];
export const BatchDeletePartitionValueList =
  /*@__PURE__*/ S.Array(PartitionValueList);
export interface BatchDeletePartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionsToDelete: PartitionValueList[];
}
export const BatchDeletePartitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    PartitionsToDelete: BatchDeletePartitionValueList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchDeletePartitionRequest",
}) as any as S.Schema<BatchDeletePartitionRequest>;
export interface BatchDeletePartitionResponse {
  Errors?: PartitionError[];
}
export const BatchDeletePartitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Errors: S.optional(PartitionErrors) }),
).annotate({
  identifier: "BatchDeletePartitionResponse",
}) as any as S.Schema<BatchDeletePartitionResponse>;
export type BatchDeleteTableNameList = string[];
export const BatchDeleteTableNameList = /*@__PURE__*/ S.Array(S.String);
export type TransactionIdString = string;
export interface BatchDeleteTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  TablesToDelete: string[];
  TransactionId?: string;
}
export const BatchDeleteTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TablesToDelete: BatchDeleteTableNameList,
    TransactionId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchDeleteTableRequest",
}) as any as S.Schema<BatchDeleteTableRequest>;
export interface TableError {
  TableName?: string;
  ErrorDetail?: ErrorDetail;
}
export const TableError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String),
    ErrorDetail: S.optional(ErrorDetail),
  }),
).annotate({ identifier: "TableError" }) as any as S.Schema<TableError>;
export type TableErrors = TableError[];
export const TableErrors = /*@__PURE__*/ S.Array(TableError);
export interface BatchDeleteTableResponse {
  Errors?: TableError[];
}
export const BatchDeleteTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Errors: S.optional(TableErrors) }),
).annotate({
  identifier: "BatchDeleteTableResponse",
}) as any as S.Schema<BatchDeleteTableResponse>;
export type VersionString = string;
export type BatchDeleteTableVersionList = string[];
export const BatchDeleteTableVersionList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteTableVersionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  VersionIds: string[];
}
export const BatchDeleteTableVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    VersionIds: BatchDeleteTableVersionList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchDeleteTableVersionRequest",
}) as any as S.Schema<BatchDeleteTableVersionRequest>;
export interface TableVersionError {
  TableName?: string;
  VersionId?: string;
  ErrorDetail?: ErrorDetail;
}
export const TableVersionError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String),
    VersionId: S.optional(S.String),
    ErrorDetail: S.optional(ErrorDetail),
  }),
).annotate({
  identifier: "TableVersionError",
}) as any as S.Schema<TableVersionError>;
export type TableVersionErrors = TableVersionError[];
export const TableVersionErrors = /*@__PURE__*/ S.Array(TableVersionError);
export interface BatchDeleteTableVersionResponse {
  Errors?: TableVersionError[];
}
export const BatchDeleteTableVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Errors: S.optional(TableVersionErrors) }),
).annotate({
  identifier: "BatchDeleteTableVersionResponse",
}) as any as S.Schema<BatchDeleteTableVersionResponse>;
export type OrchestrationNameString = string;
export type BatchGetBlueprintNames = string[];
export const BatchGetBlueprintNames = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetBlueprintsRequest {
  Names: string[];
  IncludeBlueprint?: boolean;
  IncludeParameterSpec?: boolean;
}
export const BatchGetBlueprintsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Names: BatchGetBlueprintNames,
    IncludeBlueprint: S.optional(S.Boolean),
    IncludeParameterSpec: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetBlueprintsRequest",
}) as any as S.Schema<BatchGetBlueprintsRequest>;
export type Generic512CharString = string;
export type TimestampValue = Date;
export type BlueprintParameterSpec = string;
export type BlueprintStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "FAILED"
  | (string & {});
export const BlueprintStatus = /*@__PURE__*/ S.String;

export type ErrorString = string;
export interface LastActiveDefinition {
  Description?: string;
  LastModifiedOn?: Date;
  ParameterSpec?: string;
  BlueprintLocation?: string;
  BlueprintServiceLocation?: string;
}
export const LastActiveDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ParameterSpec: S.optional(S.String),
    BlueprintLocation: S.optional(S.String),
    BlueprintServiceLocation: S.optional(S.String),
  }),
).annotate({
  identifier: "LastActiveDefinition",
}) as any as S.Schema<LastActiveDefinition>;
export interface Blueprint {
  Name?: string;
  Description?: string;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  ParameterSpec?: string;
  BlueprintLocation?: string;
  BlueprintServiceLocation?: string;
  Status?: BlueprintStatus;
  ErrorMessage?: string;
  LastActiveDefinition?: LastActiveDefinition;
}
export const Blueprint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ParameterSpec: S.optional(S.String),
    BlueprintLocation: S.optional(S.String),
    BlueprintServiceLocation: S.optional(S.String),
    Status: S.optional(BlueprintStatus),
    ErrorMessage: S.optional(S.String),
    LastActiveDefinition: S.optional(LastActiveDefinition),
  }),
).annotate({ identifier: "Blueprint" }) as any as S.Schema<Blueprint>;
export type Blueprints = Blueprint[];
export const Blueprints = /*@__PURE__*/ S.Array(Blueprint);
export type BlueprintNames = string[];
export const BlueprintNames = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetBlueprintsResponse {
  Blueprints?: Blueprint[];
  MissingBlueprints?: string[];
}
export const BatchGetBlueprintsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blueprints: S.optional(Blueprints),
    MissingBlueprints: S.optional(BlueprintNames),
  }),
).annotate({
  identifier: "BatchGetBlueprintsResponse",
}) as any as S.Schema<BatchGetBlueprintsResponse>;
export type CrawlerNameList = string[];
export const CrawlerNameList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetCrawlersRequest {
  CrawlerNames: string[];
}
export const BatchGetCrawlersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CrawlerNames: CrawlerNameList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetCrawlersRequest",
}) as any as S.Schema<BatchGetCrawlersRequest>;
export type Role = string;
export type Path = string;
export type PathList = string[];
export const PathList = /*@__PURE__*/ S.Array(S.String);
export type ConnectionName = string;
export type EventQueueArn = string;
export interface S3Target {
  Path?: string;
  Exclusions?: string[];
  ConnectionName?: string;
  SampleSize?: number;
  EventQueueArn?: string;
  DlqEventQueueArn?: string;
}
export const S3Target = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Path: S.optional(S.String),
    Exclusions: S.optional(PathList),
    ConnectionName: S.optional(S.String),
    SampleSize: S.optional(S.Number),
    EventQueueArn: S.optional(S.String),
    DlqEventQueueArn: S.optional(S.String),
  }),
).annotate({ identifier: "S3Target" }) as any as S.Schema<S3Target>;
export type S3TargetList = S3Target[];
export const S3TargetList = /*@__PURE__*/ S.Array(S3Target);
export type JdbcMetadataEntry = "COMMENTS" | "RAWTYPES" | (string & {});
export const JdbcMetadataEntry = /*@__PURE__*/ S.String;

export type EnableAdditionalMetadata = JdbcMetadataEntry[];
export const EnableAdditionalMetadata =
  /*@__PURE__*/ S.Array(JdbcMetadataEntry);
export interface JdbcTarget {
  ConnectionName?: string;
  Path?: string;
  Exclusions?: string[];
  EnableAdditionalMetadata?: JdbcMetadataEntry[];
}
export const JdbcTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionName: S.optional(S.String),
    Path: S.optional(S.String),
    Exclusions: S.optional(PathList),
    EnableAdditionalMetadata: S.optional(EnableAdditionalMetadata),
  }),
).annotate({ identifier: "JdbcTarget" }) as any as S.Schema<JdbcTarget>;
export type JdbcTargetList = JdbcTarget[];
export const JdbcTargetList = /*@__PURE__*/ S.Array(JdbcTarget);
export interface MongoDBTarget {
  ConnectionName?: string;
  Path?: string;
  ScanAll?: boolean;
}
export const MongoDBTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionName: S.optional(S.String),
    Path: S.optional(S.String),
    ScanAll: S.optional(S.Boolean),
  }),
).annotate({ identifier: "MongoDBTarget" }) as any as S.Schema<MongoDBTarget>;
export type MongoDBTargetList = MongoDBTarget[];
export const MongoDBTargetList = /*@__PURE__*/ S.Array(MongoDBTarget);
export interface DynamoDBTarget {
  Path?: string;
  scanAll?: boolean;
  scanRate?: number;
}
export const DynamoDBTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Path: S.optional(S.String),
    scanAll: S.optional(S.Boolean),
    scanRate: S.optional(S.Number),
  }),
).annotate({ identifier: "DynamoDBTarget" }) as any as S.Schema<DynamoDBTarget>;
export type DynamoDBTargetList = DynamoDBTarget[];
export const DynamoDBTargetList = /*@__PURE__*/ S.Array(DynamoDBTarget);
export type CatalogTablesList = string[];
export const CatalogTablesList = /*@__PURE__*/ S.Array(S.String);
export interface CatalogTarget {
  DatabaseName: string;
  Tables: string[];
  ConnectionName?: string;
  EventQueueArn?: string;
  DlqEventQueueArn?: string;
}
export const CatalogTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.String,
    Tables: CatalogTablesList,
    ConnectionName: S.optional(S.String),
    EventQueueArn: S.optional(S.String),
    DlqEventQueueArn: S.optional(S.String),
  }),
).annotate({ identifier: "CatalogTarget" }) as any as S.Schema<CatalogTarget>;
export type CatalogTargetList = CatalogTarget[];
export const CatalogTargetList = /*@__PURE__*/ S.Array(CatalogTarget);
export interface DeltaTarget {
  DeltaTables?: string[];
  ConnectionName?: string;
  WriteManifest?: boolean;
  CreateNativeDeltaTable?: boolean;
}
export const DeltaTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeltaTables: S.optional(PathList),
    ConnectionName: S.optional(S.String),
    WriteManifest: S.optional(S.Boolean),
    CreateNativeDeltaTable: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DeltaTarget" }) as any as S.Schema<DeltaTarget>;
export type DeltaTargetList = DeltaTarget[];
export const DeltaTargetList = /*@__PURE__*/ S.Array(DeltaTarget);
export interface IcebergTarget {
  Paths?: string[];
  ConnectionName?: string;
  Exclusions?: string[];
  MaximumTraversalDepth?: number;
}
export const IcebergTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Paths: S.optional(PathList),
    ConnectionName: S.optional(S.String),
    Exclusions: S.optional(PathList),
    MaximumTraversalDepth: S.optional(S.Number),
  }),
).annotate({ identifier: "IcebergTarget" }) as any as S.Schema<IcebergTarget>;
export type IcebergTargetList = IcebergTarget[];
export const IcebergTargetList = /*@__PURE__*/ S.Array(IcebergTarget);
export interface HudiTarget {
  Paths?: string[];
  ConnectionName?: string;
  Exclusions?: string[];
  MaximumTraversalDepth?: number;
}
export const HudiTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Paths: S.optional(PathList),
    ConnectionName: S.optional(S.String),
    Exclusions: S.optional(PathList),
    MaximumTraversalDepth: S.optional(S.Number),
  }),
).annotate({ identifier: "HudiTarget" }) as any as S.Schema<HudiTarget>;
export type HudiTargetList = HudiTarget[];
export const HudiTargetList = /*@__PURE__*/ S.Array(HudiTarget);
export interface CrawlerTargets {
  S3Targets?: S3Target[];
  JdbcTargets?: JdbcTarget[];
  MongoDBTargets?: MongoDBTarget[];
  DynamoDBTargets?: DynamoDBTarget[];
  CatalogTargets?: CatalogTarget[];
  DeltaTargets?: DeltaTarget[];
  IcebergTargets?: IcebergTarget[];
  HudiTargets?: HudiTarget[];
}
export const CrawlerTargets = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Targets: S.optional(S3TargetList),
    JdbcTargets: S.optional(JdbcTargetList),
    MongoDBTargets: S.optional(MongoDBTargetList),
    DynamoDBTargets: S.optional(DynamoDBTargetList),
    CatalogTargets: S.optional(CatalogTargetList),
    DeltaTargets: S.optional(DeltaTargetList),
    IcebergTargets: S.optional(IcebergTargetList),
    HudiTargets: S.optional(HudiTargetList),
  }),
).annotate({ identifier: "CrawlerTargets" }) as any as S.Schema<CrawlerTargets>;
export type DatabaseName = string;
export type ClassifierNameList = string[];
export const ClassifierNameList = /*@__PURE__*/ S.Array(S.String);
export type RecrawlBehavior =
  | "CRAWL_EVERYTHING"
  | "CRAWL_NEW_FOLDERS_ONLY"
  | "CRAWL_EVENT_MODE"
  | (string & {});
export const RecrawlBehavior = /*@__PURE__*/ S.String;

export interface RecrawlPolicy {
  RecrawlBehavior?: RecrawlBehavior;
}
export const RecrawlPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecrawlBehavior: S.optional(RecrawlBehavior) }),
).annotate({ identifier: "RecrawlPolicy" }) as any as S.Schema<RecrawlPolicy>;
export type UpdateBehavior = "LOG" | "UPDATE_IN_DATABASE" | (string & {});
export const UpdateBehavior = /*@__PURE__*/ S.String;

export type DeleteBehavior =
  | "LOG"
  | "DELETE_FROM_DATABASE"
  | "DEPRECATE_IN_DATABASE"
  | (string & {});
export const DeleteBehavior = /*@__PURE__*/ S.String;

export interface SchemaChangePolicy {
  UpdateBehavior?: UpdateBehavior;
  DeleteBehavior?: DeleteBehavior;
}
export const SchemaChangePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateBehavior: S.optional(UpdateBehavior),
    DeleteBehavior: S.optional(DeleteBehavior),
  }),
).annotate({
  identifier: "SchemaChangePolicy",
}) as any as S.Schema<SchemaChangePolicy>;
export type CrawlerLineageSettings = "ENABLE" | "DISABLE" | (string & {});
export const CrawlerLineageSettings = /*@__PURE__*/ S.String;

export interface LineageConfiguration {
  CrawlerLineageSettings?: CrawlerLineageSettings;
}
export const LineageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CrawlerLineageSettings: S.optional(CrawlerLineageSettings) }),
).annotate({
  identifier: "LineageConfiguration",
}) as any as S.Schema<LineageConfiguration>;
export type CrawlerState = "READY" | "RUNNING" | "STOPPING" | (string & {});
export const CrawlerState = /*@__PURE__*/ S.String;

export type TablePrefix = string;
export type CronExpression = string;
export type ScheduleState =
  | "SCHEDULED"
  | "NOT_SCHEDULED"
  | "TRANSITIONING"
  | (string & {});
export const ScheduleState = /*@__PURE__*/ S.String;

export interface Schedule {
  ScheduleExpression?: string;
  State?: ScheduleState;
}
export const Schedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduleExpression: S.optional(S.String),
    State: S.optional(ScheduleState),
  }),
).annotate({ identifier: "Schedule" }) as any as S.Schema<Schedule>;
export type MillisecondsCount = number;
export type LastCrawlStatus =
  | "SUCCEEDED"
  | "CANCELLED"
  | "FAILED"
  | (string & {});
export const LastCrawlStatus = /*@__PURE__*/ S.String;

export type LogGroup = string;
export type LogStream = string;
export type MessagePrefix = string;
export interface LastCrawlInfo {
  Status?: LastCrawlStatus;
  ErrorMessage?: string;
  LogGroup?: string;
  LogStream?: string;
  MessagePrefix?: string;
  StartTime?: Date;
}
export const LastCrawlInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(LastCrawlStatus),
    ErrorMessage: S.optional(S.String),
    LogGroup: S.optional(S.String),
    LogStream: S.optional(S.String),
    MessagePrefix: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "LastCrawlInfo" }) as any as S.Schema<LastCrawlInfo>;
export type VersionId = number;
export type CrawlerConfiguration = string;
export type CrawlerSecurityConfiguration = string;
export type AccountId = string;
export interface LakeFormationConfiguration {
  UseLakeFormationCredentials?: boolean;
  AccountId?: string;
}
export const LakeFormationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UseLakeFormationCredentials: S.optional(S.Boolean),
    AccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "LakeFormationConfiguration",
}) as any as S.Schema<LakeFormationConfiguration>;
export interface Crawler {
  Name?: string;
  Role?: string;
  Targets?: CrawlerTargets;
  DatabaseName?: string;
  Description?: string;
  Classifiers?: string[];
  RecrawlPolicy?: RecrawlPolicy;
  SchemaChangePolicy?: SchemaChangePolicy;
  LineageConfiguration?: LineageConfiguration;
  State?: CrawlerState;
  TablePrefix?: string;
  Schedule?: Schedule;
  CrawlElapsedTime?: number;
  CreationTime?: Date;
  LastUpdated?: Date;
  LastCrawl?: LastCrawlInfo;
  Version?: number;
  Configuration?: string;
  CrawlerSecurityConfiguration?: string;
  LakeFormationConfiguration?: LakeFormationConfiguration;
}
export const Crawler = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Role: S.optional(S.String),
    Targets: S.optional(CrawlerTargets),
    DatabaseName: S.optional(S.String),
    Description: S.optional(S.String),
    Classifiers: S.optional(ClassifierNameList),
    RecrawlPolicy: S.optional(RecrawlPolicy),
    SchemaChangePolicy: S.optional(SchemaChangePolicy),
    LineageConfiguration: S.optional(LineageConfiguration),
    State: S.optional(CrawlerState),
    TablePrefix: S.optional(S.String),
    Schedule: S.optional(Schedule),
    CrawlElapsedTime: S.optional(S.Number),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastCrawl: S.optional(LastCrawlInfo),
    Version: S.optional(S.Number),
    Configuration: S.optional(S.String),
    CrawlerSecurityConfiguration: S.optional(S.String),
    LakeFormationConfiguration: S.optional(LakeFormationConfiguration),
  }),
).annotate({ identifier: "Crawler" }) as any as S.Schema<Crawler>;
export type CrawlerList = Crawler[];
export const CrawlerList = /*@__PURE__*/ S.Array(Crawler);
export interface BatchGetCrawlersResponse {
  Crawlers?: Crawler[];
  CrawlersNotFound?: string[];
}
export const BatchGetCrawlersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Crawlers: S.optional(CrawlerList),
    CrawlersNotFound: S.optional(CrawlerNameList),
  }),
).annotate({
  identifier: "BatchGetCrawlersResponse",
}) as any as S.Schema<BatchGetCrawlersResponse>;
export type CustomEntityTypeNames = string[];
export const CustomEntityTypeNames = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetCustomEntityTypesRequest {
  Names: string[];
}
export const BatchGetCustomEntityTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Names: CustomEntityTypeNames }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetCustomEntityTypesRequest",
}) as any as S.Schema<BatchGetCustomEntityTypesRequest>;
export type ContextWords = string[];
export const ContextWords = /*@__PURE__*/ S.Array(S.String);
export interface CustomEntityType {
  Name: string;
  RegexString: string;
  ContextWords?: string[];
}
export const CustomEntityType = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    RegexString: S.String,
    ContextWords: S.optional(ContextWords),
  }),
).annotate({
  identifier: "CustomEntityType",
}) as any as S.Schema<CustomEntityType>;
export type CustomEntityTypes = CustomEntityType[];
export const CustomEntityTypes = /*@__PURE__*/ S.Array(CustomEntityType);
export interface BatchGetCustomEntityTypesResponse {
  CustomEntityTypes?: CustomEntityType[];
  CustomEntityTypesNotFound?: string[];
}
export const BatchGetCustomEntityTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomEntityTypes: S.optional(CustomEntityTypes),
    CustomEntityTypesNotFound: S.optional(CustomEntityTypeNames),
  }),
).annotate({
  identifier: "BatchGetCustomEntityTypesResponse",
}) as any as S.Schema<BatchGetCustomEntityTypesResponse>;
export type DataQualityResultIds = string[];
export const DataQualityResultIds = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetDataQualityResultRequest {
  ResultIds: string[];
}
export const BatchGetDataQualityResultRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResultIds: DataQualityResultIds }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetDataQualityResultRequest",
}) as any as S.Schema<BatchGetDataQualityResultRequest>;
export type GenericBoundedDouble = number;
export type GlueTableAdditionalOptions = { [key: string]: string | undefined };
export const GlueTableAdditionalOptions = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GlueTable {
  DatabaseName: string;
  TableName: string;
  CatalogId?: string;
  ConnectionName?: string;
  AdditionalOptions?: { [key: string]: string | undefined };
}
export const GlueTable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.String,
    TableName: S.String,
    CatalogId: S.optional(S.String),
    ConnectionName: S.optional(S.String),
    AdditionalOptions: S.optional(GlueTableAdditionalOptions),
  }),
).annotate({ identifier: "GlueTable" }) as any as S.Schema<GlueTable>;
export type PreProcessingQueryString = string;
export interface DataQualityGlueTable {
  DatabaseName: string;
  TableName: string;
  CatalogId?: string;
  ConnectionName?: string;
  AdditionalOptions?: { [key: string]: string | undefined };
  PreProcessingQuery?: string;
}
export const DataQualityGlueTable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.String,
    TableName: S.String,
    CatalogId: S.optional(S.String),
    ConnectionName: S.optional(S.String),
    AdditionalOptions: S.optional(GlueTableAdditionalOptions),
    PreProcessingQuery: S.optional(S.String),
  }),
).annotate({
  identifier: "DataQualityGlueTable",
}) as any as S.Schema<DataQualityGlueTable>;
export interface DataSource {
  GlueTable?: GlueTable;
  DataQualityGlueTable?: DataQualityGlueTable;
}
export const DataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlueTable: S.optional(GlueTable),
    DataQualityGlueTable: S.optional(DataQualityGlueTable),
  }),
).annotate({ identifier: "DataSource" }) as any as S.Schema<DataSource>;
export type DataQualityRuleResultDescription =
  | string
  | redacted.Redacted<string>;
export type DataQualityRuleResultStatus =
  | "PASS"
  | "FAIL"
  | "ERROR"
  | (string & {});
export const DataQualityRuleResultStatus = /*@__PURE__*/ S.String;

export type EvaluatedMetricsMap = { [key: string]: number | undefined };
export const EvaluatedMetricsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export type RuleMetricsMap = { [key: string]: number | undefined };
export const RuleMetricsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export type Labels = { [key: string]: string | undefined };
export const Labels = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DataQualityRuleResult {
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  EvaluationMessage?: string | redacted.Redacted<string>;
  Result?: DataQualityRuleResultStatus;
  EvaluatedMetrics?: { [key: string]: number | undefined };
  EvaluatedRule?: string | redacted.Redacted<string>;
  RuleMetrics?: { [key: string]: number | undefined };
  Labels?: { [key: string]: string | undefined };
}
export const DataQualityRuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
    EvaluationMessage: S.optional(SensitiveString),
    Result: S.optional(DataQualityRuleResultStatus),
    EvaluatedMetrics: S.optional(EvaluatedMetricsMap),
    EvaluatedRule: S.optional(SensitiveString),
    RuleMetrics: S.optional(RuleMetricsMap),
    Labels: S.optional(Labels),
  }),
).annotate({
  identifier: "DataQualityRuleResult",
}) as any as S.Schema<DataQualityRuleResult>;
export type DataQualityRuleResults = DataQualityRuleResult[];
export const DataQualityRuleResults = /*@__PURE__*/ S.Array(
  DataQualityRuleResult,
);
export interface DataQualityAnalyzerResult {
  Name?: string;
  Description?: string | redacted.Redacted<string>;
  EvaluationMessage?: string | redacted.Redacted<string>;
  EvaluatedMetrics?: { [key: string]: number | undefined };
}
export const DataQualityAnalyzerResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(SensitiveString),
    EvaluationMessage: S.optional(SensitiveString),
    EvaluatedMetrics: S.optional(EvaluatedMetricsMap),
  }),
).annotate({
  identifier: "DataQualityAnalyzerResult",
}) as any as S.Schema<DataQualityAnalyzerResult>;
export type DataQualityAnalyzerResults = DataQualityAnalyzerResult[];
export const DataQualityAnalyzerResults = /*@__PURE__*/ S.Array(
  DataQualityAnalyzerResult,
);
export type DataQualityObservationDescription =
  | string
  | redacted.Redacted<string>;
export interface DataQualityMetricValues {
  ActualValue?: number;
  ExpectedValue?: number;
  LowerLimit?: number;
  UpperLimit?: number;
}
export const DataQualityMetricValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActualValue: S.optional(S.Number),
    ExpectedValue: S.optional(S.Number),
    LowerLimit: S.optional(S.Number),
    UpperLimit: S.optional(S.Number),
  }),
).annotate({
  identifier: "DataQualityMetricValues",
}) as any as S.Schema<DataQualityMetricValues>;
export type NewRules = string[];
export const NewRules = /*@__PURE__*/ S.Array(S.String);
export interface MetricBasedObservation {
  MetricName?: string;
  StatisticId?: string;
  MetricValues?: DataQualityMetricValues;
  NewRules?: string[];
}
export const MetricBasedObservation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    StatisticId: S.optional(S.String),
    MetricValues: S.optional(DataQualityMetricValues),
    NewRules: S.optional(NewRules),
  }),
).annotate({
  identifier: "MetricBasedObservation",
}) as any as S.Schema<MetricBasedObservation>;
export interface DataQualityObservation {
  Description?: string | redacted.Redacted<string>;
  MetricBasedObservation?: MetricBasedObservation;
}
export const DataQualityObservation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(SensitiveString),
    MetricBasedObservation: S.optional(MetricBasedObservation),
  }),
).annotate({
  identifier: "DataQualityObservation",
}) as any as S.Schema<DataQualityObservation>;
export type DataQualityObservations = DataQualityObservation[];
export const DataQualityObservations = /*@__PURE__*/ S.Array(
  DataQualityObservation,
);
export interface DataQualityAggregatedMetrics {
  TotalRowsProcessed?: number;
  TotalRowsPassed?: number;
  TotalRowsFailed?: number;
  TotalRulesProcessed?: number;
  TotalRulesPassed?: number;
  TotalRulesFailed?: number;
}
export const DataQualityAggregatedMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalRowsProcessed: S.optional(S.Number),
    TotalRowsPassed: S.optional(S.Number),
    TotalRowsFailed: S.optional(S.Number),
    TotalRulesProcessed: S.optional(S.Number),
    TotalRulesPassed: S.optional(S.Number),
    TotalRulesFailed: S.optional(S.Number),
  }),
).annotate({
  identifier: "DataQualityAggregatedMetrics",
}) as any as S.Schema<DataQualityAggregatedMetrics>;
export interface DataQualityResult {
  ResultId?: string;
  ProfileId?: string;
  Score?: number;
  DataSource?: DataSource;
  RulesetName?: string;
  EvaluationContext?: string;
  StartedOn?: Date;
  CompletedOn?: Date;
  JobName?: string;
  JobRunId?: string;
  RulesetEvaluationRunId?: string;
  RuleResults?: DataQualityRuleResult[];
  AnalyzerResults?: DataQualityAnalyzerResult[];
  Observations?: DataQualityObservation[];
  AggregatedMetrics?: DataQualityAggregatedMetrics;
}
export const DataQualityResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResultId: S.optional(S.String),
    ProfileId: S.optional(S.String),
    Score: S.optional(S.Number),
    DataSource: S.optional(DataSource),
    RulesetName: S.optional(S.String),
    EvaluationContext: S.optional(S.String),
    StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    JobName: S.optional(S.String),
    JobRunId: S.optional(S.String),
    RulesetEvaluationRunId: S.optional(S.String),
    RuleResults: S.optional(DataQualityRuleResults),
    AnalyzerResults: S.optional(DataQualityAnalyzerResults),
    Observations: S.optional(DataQualityObservations),
    AggregatedMetrics: S.optional(DataQualityAggregatedMetrics),
  }),
).annotate({
  identifier: "DataQualityResult",
}) as any as S.Schema<DataQualityResult>;
export type DataQualityResultsList = DataQualityResult[];
export const DataQualityResultsList = /*@__PURE__*/ S.Array(DataQualityResult);
export interface BatchGetDataQualityResultResponse {
  Results: DataQualityResult[];
  ResultsNotFound?: string[];
}
export const BatchGetDataQualityResultResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Results: DataQualityResultsList,
    ResultsNotFound: S.optional(DataQualityResultIds),
  }),
).annotate({
  identifier: "BatchGetDataQualityResultResponse",
}) as any as S.Schema<BatchGetDataQualityResultResponse>;
export type DevEndpointNames = string[];
export const DevEndpointNames = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetDevEndpointsRequest {
  DevEndpointNames: string[];
}
export const BatchGetDevEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DevEndpointNames: DevEndpointNames }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetDevEndpointsRequest",
}) as any as S.Schema<BatchGetDevEndpointsRequest>;
export type RoleArn = string;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export type IntegerValue = number;
export type WorkerType =
  | "Standard"
  | "G.1X"
  | "G.2X"
  | "G.025X"
  | "G.4X"
  | "G.8X"
  | "Z.2X"
  | (string & {});
export const WorkerType = /*@__PURE__*/ S.String;

export type GlueVersionString = string;
export type PublicKeysList = string[];
export const PublicKeysList = /*@__PURE__*/ S.Array(S.String);
export type MapValue = { [key: string]: string | undefined };
export const MapValue = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DevEndpoint {
  EndpointName?: string;
  RoleArn?: string;
  SecurityGroupIds?: string[];
  SubnetId?: string;
  YarnEndpointAddress?: string;
  PrivateAddress?: string;
  ZeppelinRemoteSparkInterpreterPort?: number;
  PublicAddress?: string;
  Status?: string;
  WorkerType?: WorkerType;
  GlueVersion?: string;
  NumberOfWorkers?: number;
  NumberOfNodes?: number;
  AvailabilityZone?: string;
  VpcId?: string;
  ExtraPythonLibsS3Path?: string;
  ExtraJarsS3Path?: string;
  FailureReason?: string;
  LastUpdateStatus?: string;
  CreatedTimestamp?: Date;
  LastModifiedTimestamp?: Date;
  PublicKey?: string;
  PublicKeys?: string[];
  SecurityConfiguration?: string;
  Arguments?: { [key: string]: string | undefined };
}
export const DevEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointName: S.optional(S.String),
    RoleArn: S.optional(S.String),
    SecurityGroupIds: S.optional(StringList),
    SubnetId: S.optional(S.String),
    YarnEndpointAddress: S.optional(S.String),
    PrivateAddress: S.optional(S.String),
    ZeppelinRemoteSparkInterpreterPort: S.optional(S.Number),
    PublicAddress: S.optional(S.String),
    Status: S.optional(S.String),
    WorkerType: S.optional(WorkerType),
    GlueVersion: S.optional(S.String),
    NumberOfWorkers: S.optional(S.Number),
    NumberOfNodes: S.optional(S.Number),
    AvailabilityZone: S.optional(S.String),
    VpcId: S.optional(S.String),
    ExtraPythonLibsS3Path: S.optional(S.String),
    ExtraJarsS3Path: S.optional(S.String),
    FailureReason: S.optional(S.String),
    LastUpdateStatus: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastModifiedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    PublicKey: S.optional(S.String),
    PublicKeys: S.optional(PublicKeysList),
    SecurityConfiguration: S.optional(S.String),
    Arguments: S.optional(MapValue),
  }),
).annotate({ identifier: "DevEndpoint" }) as any as S.Schema<DevEndpoint>;
export type DevEndpointList = DevEndpoint[];
export const DevEndpointList = /*@__PURE__*/ S.Array(DevEndpoint);
export interface BatchGetDevEndpointsResponse {
  DevEndpoints?: DevEndpoint[];
  DevEndpointsNotFound?: string[];
}
export const BatchGetDevEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DevEndpoints: S.optional(DevEndpointList),
    DevEndpointsNotFound: S.optional(DevEndpointNames),
  }),
).annotate({
  identifier: "BatchGetDevEndpointsResponse",
}) as any as S.Schema<BatchGetDevEndpointsResponse>;
export type IterableFormName = string;
export type ItemIdentifier = string;
export type ItemIdentifierList = string[];
export const ItemIdentifierList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetIterableFormsRequest {
  AssetIdentifier: string;
  IterableFormName: string;
  ItemIdentifiers: string[];
}
export const BatchGetIterableFormsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetIdentifier: S.String.pipe(T.HttpLabel("AssetIdentifier")),
    IterableFormName: S.String.pipe(T.HttpLabel("IterableFormName")),
    ItemIdentifiers: ItemIdentifierList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/assets/{AssetIdentifier}/iterable-forms/{IterableFormName}/batch-get",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetIterableFormsRequest",
}) as any as S.Schema<BatchGetIterableFormsRequest>;
export type ItemId = string;
export type ItemName = string;
export type AssetFormKey = string;
export type FormTypeId = string;
export type FormContent = string;
export interface AssetFormEntry {
  FormTypeId?: string;
  Content?: string;
}
export const AssetFormEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FormTypeId: S.optional(S.String), Content: S.optional(S.String) }),
).annotate({ identifier: "AssetFormEntry" }) as any as S.Schema<AssetFormEntry>;
export type AssetFormMap = { [key: string]: AssetFormEntry | undefined };
export const AssetFormMap = /*@__PURE__*/ S.Record(
  S.String,
  AssetFormEntry.pipe(S.optional),
);
export interface IterableFormItem {
  ItemId?: string;
  ItemName?: string;
  GlossaryTerms?: string[];
  Forms?: { [key: string]: AssetFormEntry | undefined };
  Attachments?: { [key: string]: AssetFormEntry | undefined };
}
export const IterableFormItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ItemId: S.optional(S.String),
    ItemName: S.optional(S.String),
    GlossaryTerms: S.optional(GlossaryTermIdList),
    Forms: S.optional(AssetFormMap),
    Attachments: S.optional(AssetFormMap),
  }),
).annotate({
  identifier: "IterableFormItem",
}) as any as S.Schema<IterableFormItem>;
export type IterableFormItemList = IterableFormItem[];
export const IterableFormItemList = /*@__PURE__*/ S.Array(IterableFormItem);
export type ItemErrorCode = string;
export type ItemErrorMessage = string;
export interface ItemError {
  ItemIdentifier?: string;
  Code?: string;
  Message?: string;
}
export const ItemError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ItemIdentifier: S.optional(S.String),
    Code: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({ identifier: "ItemError" }) as any as S.Schema<ItemError>;
export type ItemErrorList = ItemError[];
export const ItemErrorList = /*@__PURE__*/ S.Array(ItemError);
export interface BatchGetIterableFormsResponse {
  Items?: IterableFormItem[];
  Errors?: ItemError[];
}
export const BatchGetIterableFormsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(IterableFormItemList),
    Errors: S.optional(ItemErrorList),
  }),
).annotate({
  identifier: "BatchGetIterableFormsResponse",
}) as any as S.Schema<BatchGetIterableFormsResponse>;
export type JobNameList = string[];
export const JobNameList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetJobsRequest {
  JobNames: string[];
}
export const BatchGetJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobNames: JobNameList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetJobsRequest",
}) as any as S.Schema<BatchGetJobsRequest>;
export type JobMode = "SCRIPT" | "VISUAL" | "NOTEBOOK" | (string & {});
export const JobMode = /*@__PURE__*/ S.String;

export type UriString = string;
export type RoleString = string;
export type MaxConcurrentRuns = number;
export interface ExecutionProperty {
  MaxConcurrentRuns?: number;
}
export const ExecutionProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaxConcurrentRuns: S.optional(S.Number) }),
).annotate({
  identifier: "ExecutionProperty",
}) as any as S.Schema<ExecutionProperty>;
export type ScriptLocationString = string;
export type PythonVersionString = string;
export type RuntimeNameString = string;
export interface JobCommand {
  Name?: string;
  ScriptLocation?: string;
  PythonVersion?: string;
  Runtime?: string;
}
export const JobCommand = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ScriptLocation: S.optional(S.String),
    PythonVersion: S.optional(S.String),
    Runtime: S.optional(S.String),
  }),
).annotate({ identifier: "JobCommand" }) as any as S.Schema<JobCommand>;
export type GenericMap = { [key: string]: string | undefined };
export const GenericMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ConnectionString = string;
export type ConnectionStringList = string[];
export const ConnectionStringList = /*@__PURE__*/ S.Array(S.String);
export interface ConnectionsList {
  Connections?: string[];
}
export const ConnectionsList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connections: S.optional(ConnectionStringList) }),
).annotate({
  identifier: "ConnectionsList",
}) as any as S.Schema<ConnectionsList>;
export type MaxRetries = number;
export type Timeout = number;
export type NotifyDelayAfter = number;
export interface NotificationProperty {
  NotifyDelayAfter?: number;
}
export const NotificationProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NotifyDelayAfter: S.optional(S.Number) }),
).annotate({
  identifier: "NotificationProperty",
}) as any as S.Schema<NotificationProperty>;
export type NodeId = string;
export type NodeName = string;
export type EnclosedInStringProperty = string;
export type EnclosedInStringPropertyWithQuote = string;
export type GlueStudioColumnNameString = string;
export interface GlueStudioSchemaColumn {
  Name: string;
  Type?: string;
  GlueStudioType?: string;
}
export const GlueStudioSchemaColumn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Type: S.optional(S.String),
    GlueStudioType: S.optional(S.String),
  }),
).annotate({
  identifier: "GlueStudioSchemaColumn",
}) as any as S.Schema<GlueStudioSchemaColumn>;
export type GlueStudioSchemaColumnList = GlueStudioSchemaColumn[];
export const GlueStudioSchemaColumnList = /*@__PURE__*/ S.Array(
  GlueStudioSchemaColumn,
);
export interface GlueSchema {
  Columns?: GlueStudioSchemaColumn[];
}
export const GlueSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Columns: S.optional(GlueStudioSchemaColumnList) }),
).annotate({ identifier: "GlueSchema" }) as any as S.Schema<GlueSchema>;
export type GlueSchemas = GlueSchema[];
export const GlueSchemas = /*@__PURE__*/ S.Array(GlueSchema);
export interface AthenaConnectorSource {
  Name: string;
  ConnectionName: string;
  ConnectorName: string;
  ConnectionType: string;
  ConnectionTable?: string;
  SchemaName: string;
  OutputSchemas?: GlueSchema[];
}
export const AthenaConnectorSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ConnectionName: S.String,
    ConnectorName: S.String,
    ConnectionType: S.String,
    ConnectionTable: S.optional(S.String),
    SchemaName: S.String,
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "AthenaConnectorSource",
}) as any as S.Schema<AthenaConnectorSource>;
export type BoxedNonNegativeLong = number;
export type EnclosedInStringProperties = string[];
export const EnclosedInStringProperties = /*@__PURE__*/ S.Array(S.String);
export type JDBCDataType =
  | "ARRAY"
  | "BIGINT"
  | "BINARY"
  | "BIT"
  | "BLOB"
  | "BOOLEAN"
  | "CHAR"
  | "CLOB"
  | "DATALINK"
  | "DATE"
  | "DECIMAL"
  | "DISTINCT"
  | "DOUBLE"
  | "FLOAT"
  | "INTEGER"
  | "JAVA_OBJECT"
  | "LONGNVARCHAR"
  | "LONGVARBINARY"
  | "LONGVARCHAR"
  | "NCHAR"
  | "NCLOB"
  | "NULL"
  | "NUMERIC"
  | "NVARCHAR"
  | "OTHER"
  | "REAL"
  | "REF"
  | "REF_CURSOR"
  | "ROWID"
  | "SMALLINT"
  | "SQLXML"
  | "STRUCT"
  | "TIME"
  | "TIME_WITH_TIMEZONE"
  | "TIMESTAMP"
  | "TIMESTAMP_WITH_TIMEZONE"
  | "TINYINT"
  | "VARBINARY"
  | "VARCHAR"
  | (string & {});
export const JDBCDataType = /*@__PURE__*/ S.String;

export type GlueRecordType =
  | "DATE"
  | "STRING"
  | "TIMESTAMP"
  | "INT"
  | "FLOAT"
  | "LONG"
  | "BIGDECIMAL"
  | "BYTE"
  | "SHORT"
  | "DOUBLE"
  | (string & {});
export const GlueRecordType = /*@__PURE__*/ S.String;

export type JDBCDataTypeMapping = { [key in JDBCDataType]?: GlueRecordType };
export const JDBCDataTypeMapping = /*@__PURE__*/ S.Record(
  JDBCDataType,
  GlueRecordType.pipe(S.optional),
);
export interface JDBCConnectorOptions {
  FilterPredicate?: string;
  PartitionColumn?: string;
  LowerBound?: number;
  UpperBound?: number;
  NumPartitions?: number;
  JobBookmarkKeys?: string[];
  JobBookmarkKeysSortOrder?: string;
  DataTypeMapping?: { [key: string]: GlueRecordType | undefined };
}
export const JDBCConnectorOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterPredicate: S.optional(S.String),
    PartitionColumn: S.optional(S.String),
    LowerBound: S.optional(S.Number),
    UpperBound: S.optional(S.Number),
    NumPartitions: S.optional(S.Number),
    JobBookmarkKeys: S.optional(EnclosedInStringProperties),
    JobBookmarkKeysSortOrder: S.optional(S.String),
    DataTypeMapping: S.optional(JDBCDataTypeMapping),
  }),
).annotate({
  identifier: "JDBCConnectorOptions",
}) as any as S.Schema<JDBCConnectorOptions>;
export type SqlQuery = string;
export interface JDBCConnectorSource {
  Name: string;
  ConnectionName: string;
  ConnectorName: string;
  ConnectionType: string;
  AdditionalOptions?: JDBCConnectorOptions;
  ConnectionTable?: string;
  Query?: string;
  OutputSchemas?: GlueSchema[];
}
export const JDBCConnectorSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ConnectionName: S.String,
    ConnectorName: S.String,
    ConnectionType: S.String,
    AdditionalOptions: S.optional(JDBCConnectorOptions),
    ConnectionTable: S.optional(S.String),
    Query: S.optional(S.String),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "JDBCConnectorSource",
}) as any as S.Schema<JDBCConnectorSource>;
export type AdditionalOptions = { [key: string]: string | undefined };
export const AdditionalOptions = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface SparkConnectorSource {
  Name: string;
  ConnectionName: string;
  ConnectorName: string;
  ConnectionType: string;
  AdditionalOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export const SparkConnectorSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ConnectionName: S.String,
    ConnectorName: S.String,
    ConnectionType: S.String,
    AdditionalOptions: S.optional(AdditionalOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "SparkConnectorSource",
}) as any as S.Schema<SparkConnectorSource>;
export interface CatalogSource {
  Name: string;
  Database: string;
  Table: string;
  PartitionPredicate?: string;
  OutputSchemas?: GlueSchema[];
}
export const CatalogSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Database: S.String,
    Table: S.String,
    PartitionPredicate: S.optional(S.String),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({ identifier: "CatalogSource" }) as any as S.Schema<CatalogSource>;
export interface RedshiftSource {
  Name: string;
  Database: string;
  Table: string;
  RedshiftTmpDir?: string;
  TmpDirIAMRole?: string;
}
export const RedshiftSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Database: S.String,
    Table: S.String,
    RedshiftTmpDir: S.optional(S.String),
    TmpDirIAMRole: S.optional(S.String),
  }),
).annotate({ identifier: "RedshiftSource" }) as any as S.Schema<RedshiftSource>;
export type BoxedLong = number;
export interface S3SourceAdditionalOptions {
  BoundedSize?: number;
  BoundedFiles?: number;
}
export const S3SourceAdditionalOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundedSize: S.optional(S.Number),
    BoundedFiles: S.optional(S.Number),
  }),
).annotate({
  identifier: "S3SourceAdditionalOptions",
}) as any as S.Schema<S3SourceAdditionalOptions>;
export interface S3CatalogSource {
  Name: string;
  Database: string;
  Table: string;
  PartitionPredicate?: string;
  AdditionalOptions?: S3SourceAdditionalOptions;
}
export const S3CatalogSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Database: S.String,
    Table: S.String,
    PartitionPredicate: S.optional(S.String),
    AdditionalOptions: S.optional(S3SourceAdditionalOptions),
  }),
).annotate({
  identifier: "S3CatalogSource",
}) as any as S.Schema<S3CatalogSource>;
export type CompressionType = "gzip" | "bzip2" | (string & {});
export const CompressionType = /*@__PURE__*/ S.String;

export type BoxedBoolean = boolean;
export type BoxedNonNegativeInt = number;
export interface S3DirectSourceAdditionalOptions {
  BoundedSize?: number;
  BoundedFiles?: number;
  EnableSamplePath?: boolean;
  SamplePath?: string;
}
export const S3DirectSourceAdditionalOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoundedSize: S.optional(S.Number),
    BoundedFiles: S.optional(S.Number),
    EnableSamplePath: S.optional(S.Boolean),
    SamplePath: S.optional(S.String),
  }),
).annotate({
  identifier: "S3DirectSourceAdditionalOptions",
}) as any as S.Schema<S3DirectSourceAdditionalOptions>;
export type Separator =
  | "comma"
  | "ctrla"
  | "pipe"
  | "semicolon"
  | "tab"
  | (string & {});
export const Separator = /*@__PURE__*/ S.String;

export type QuoteChar =
  | "quote"
  | "quillemet"
  | "single_quote"
  | "disabled"
  | (string & {});
export const QuoteChar = /*@__PURE__*/ S.String;

export interface S3CsvSource {
  Name: string;
  Paths: string[];
  CompressionType?: CompressionType;
  Exclusions?: string[];
  GroupSize?: string;
  GroupFiles?: string;
  Recurse?: boolean;
  MaxBand?: number;
  MaxFilesInBand?: number;
  AdditionalOptions?: S3DirectSourceAdditionalOptions;
  Separator: Separator;
  Escaper?: string;
  QuoteChar: QuoteChar;
  Multiline?: boolean;
  WithHeader?: boolean;
  WriteHeader?: boolean;
  SkipFirst?: boolean;
  OptimizePerformance?: boolean;
  OutputSchemas?: GlueSchema[];
}
export const S3CsvSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Paths: EnclosedInStringProperties,
    CompressionType: S.optional(CompressionType),
    Exclusions: S.optional(EnclosedInStringProperties),
    GroupSize: S.optional(S.String),
    GroupFiles: S.optional(S.String),
    Recurse: S.optional(S.Boolean),
    MaxBand: S.optional(S.Number),
    MaxFilesInBand: S.optional(S.Number),
    AdditionalOptions: S.optional(S3DirectSourceAdditionalOptions),
    Separator: Separator,
    Escaper: S.optional(S.String),
    QuoteChar: QuoteChar,
    Multiline: S.optional(S.Boolean),
    WithHeader: S.optional(S.Boolean),
    WriteHeader: S.optional(S.Boolean),
    SkipFirst: S.optional(S.Boolean),
    OptimizePerformance: S.optional(S.Boolean),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({ identifier: "S3CsvSource" }) as any as S.Schema<S3CsvSource>;
export interface S3JsonSource {
  Name: string;
  Paths: string[];
  CompressionType?: CompressionType;
  Exclusions?: string[];
  GroupSize?: string;
  GroupFiles?: string;
  Recurse?: boolean;
  MaxBand?: number;
  MaxFilesInBand?: number;
  AdditionalOptions?: S3DirectSourceAdditionalOptions;
  JsonPath?: string;
  Multiline?: boolean;
  OutputSchemas?: GlueSchema[];
}
export const S3JsonSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Paths: EnclosedInStringProperties,
    CompressionType: S.optional(CompressionType),
    Exclusions: S.optional(EnclosedInStringProperties),
    GroupSize: S.optional(S.String),
    GroupFiles: S.optional(S.String),
    Recurse: S.optional(S.Boolean),
    MaxBand: S.optional(S.Number),
    MaxFilesInBand: S.optional(S.Number),
    AdditionalOptions: S.optional(S3DirectSourceAdditionalOptions),
    JsonPath: S.optional(S.String),
    Multiline: S.optional(S.Boolean),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({ identifier: "S3JsonSource" }) as any as S.Schema<S3JsonSource>;
export type ParquetCompressionType =
  | "snappy"
  | "lzo"
  | "gzip"
  | "brotli"
  | "lz4"
  | "uncompressed"
  | "none"
  | (string & {});
export const ParquetCompressionType = /*@__PURE__*/ S.String;

export interface S3ParquetSource {
  Name: string;
  Paths: string[];
  CompressionType?: ParquetCompressionType;
  Exclusions?: string[];
  GroupSize?: string;
  GroupFiles?: string;
  Recurse?: boolean;
  MaxBand?: number;
  MaxFilesInBand?: number;
  AdditionalOptions?: S3DirectSourceAdditionalOptions;
  OutputSchemas?: GlueSchema[];
}
export const S3ParquetSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Paths: EnclosedInStringProperties,
    CompressionType: S.optional(ParquetCompressionType),
    Exclusions: S.optional(EnclosedInStringProperties),
    GroupSize: S.optional(S.String),
    GroupFiles: S.optional(S.String),
    Recurse: S.optional(S.Boolean),
    MaxBand: S.optional(S.Number),
    MaxFilesInBand: S.optional(S.Number),
    AdditionalOptions: S.optional(S3DirectSourceAdditionalOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "S3ParquetSource",
}) as any as S.Schema<S3ParquetSource>;
export interface RelationalCatalogSource {
  Name: string;
  Database: string;
  Table: string;
}
export const RelationalCatalogSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Database: S.String, Table: S.String }),
).annotate({
  identifier: "RelationalCatalogSource",
}) as any as S.Schema<RelationalCatalogSource>;
export interface DDBELTCatalogAdditionalOptions {
  DynamodbExport?: string;
  DynamodbUnnestDDBJson?: boolean;
}
export const DDBELTCatalogAdditionalOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DynamodbExport: S.optional(S.String),
    DynamodbUnnestDDBJson: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DDBELTCatalogAdditionalOptions",
}) as any as S.Schema<DDBELTCatalogAdditionalOptions>;
export interface DynamoDBCatalogSource {
  Name: string;
  Database: string;
  Table: string;
  PitrEnabled?: boolean;
  AdditionalOptions?: DDBELTCatalogAdditionalOptions;
}
export const DynamoDBCatalogSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Database: S.String,
    Table: S.String,
    PitrEnabled: S.optional(S.Boolean),
    AdditionalOptions: S.optional(DDBELTCatalogAdditionalOptions),
  }),
).annotate({
  identifier: "DynamoDBCatalogSource",
}) as any as S.Schema<DynamoDBCatalogSource>;
export type OneInput = string[];
export const OneInput = /*@__PURE__*/ S.Array(S.String);
export interface JDBCConnectorTarget {
  Name: string;
  Inputs: string[];
  ConnectionName: string;
  ConnectionTable: string;
  ConnectorName: string;
  ConnectionType: string;
  AdditionalOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export const JDBCConnectorTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    ConnectionName: S.String,
    ConnectionTable: S.String,
    ConnectorName: S.String,
    ConnectionType: S.String,
    AdditionalOptions: S.optional(AdditionalOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "JDBCConnectorTarget",
}) as any as S.Schema<JDBCConnectorTarget>;
export interface SparkConnectorTarget {
  Name: string;
  Inputs: string[];
  ConnectionName: string;
  ConnectorName: string;
  ConnectionType: string;
  AdditionalOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export const SparkConnectorTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    ConnectionName: S.String,
    ConnectorName: S.String,
    ConnectionType: S.String,
    AdditionalOptions: S.optional(AdditionalOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "SparkConnectorTarget",
}) as any as S.Schema<SparkConnectorTarget>;
export type GlueStudioPathList = string[][];
export const GlueStudioPathList = /*@__PURE__*/ S.Array(
  EnclosedInStringProperties,
);
export interface BasicCatalogTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Database: string;
  Table: string;
}
export const BasicCatalogTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    PartitionKeys: S.optional(GlueStudioPathList),
    Database: S.String,
    Table: S.String,
  }),
).annotate({
  identifier: "BasicCatalogTarget",
}) as any as S.Schema<BasicCatalogTarget>;
export type EnclosedInStringPropertiesMinOne = string[];
export const EnclosedInStringPropertiesMinOne = /*@__PURE__*/ S.Array(S.String);
export interface UpsertRedshiftTargetOptions {
  TableLocation?: string;
  ConnectionName?: string;
  UpsertKeys?: string[];
}
export const UpsertRedshiftTargetOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableLocation: S.optional(S.String),
    ConnectionName: S.optional(S.String),
    UpsertKeys: S.optional(EnclosedInStringPropertiesMinOne),
  }),
).annotate({
  identifier: "UpsertRedshiftTargetOptions",
}) as any as S.Schema<UpsertRedshiftTargetOptions>;
export interface RedshiftTarget {
  Name: string;
  Inputs: string[];
  Database: string;
  Table: string;
  RedshiftTmpDir?: string;
  TmpDirIAMRole?: string;
  UpsertRedshiftOptions?: UpsertRedshiftTargetOptions;
}
export const RedshiftTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    Database: S.String,
    Table: S.String,
    RedshiftTmpDir: S.optional(S.String),
    TmpDirIAMRole: S.optional(S.String),
    UpsertRedshiftOptions: S.optional(UpsertRedshiftTargetOptions),
  }),
).annotate({ identifier: "RedshiftTarget" }) as any as S.Schema<RedshiftTarget>;
export type UpdateCatalogBehavior =
  | "UPDATE_IN_DATABASE"
  | "LOG"
  | (string & {});
export const UpdateCatalogBehavior = /*@__PURE__*/ S.String;

export interface CatalogSchemaChangePolicy {
  EnableUpdateCatalog?: boolean;
  UpdateBehavior?: UpdateCatalogBehavior;
}
export const CatalogSchemaChangePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnableUpdateCatalog: S.optional(S.Boolean),
    UpdateBehavior: S.optional(UpdateCatalogBehavior),
  }),
).annotate({
  identifier: "CatalogSchemaChangePolicy",
}) as any as S.Schema<CatalogSchemaChangePolicy>;
export interface AutoDataQuality {
  IsEnabled?: boolean;
  EvaluationContext?: string;
}
export const AutoDataQuality = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsEnabled: S.optional(S.Boolean),
    EvaluationContext: S.optional(S.String),
  }),
).annotate({
  identifier: "AutoDataQuality",
}) as any as S.Schema<AutoDataQuality>;
export interface S3CatalogTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Table: string;
  Database: string;
  SchemaChangePolicy?: CatalogSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
}
export const S3CatalogTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    PartitionKeys: S.optional(GlueStudioPathList),
    Table: S.String,
    Database: S.String,
    SchemaChangePolicy: S.optional(CatalogSchemaChangePolicy),
    AutoDataQuality: S.optional(AutoDataQuality),
  }),
).annotate({
  identifier: "S3CatalogTarget",
}) as any as S.Schema<S3CatalogTarget>;
export type NumberTargetPartitionsString = string;
export interface DirectSchemaChangePolicy {
  EnableUpdateCatalog?: boolean;
  UpdateBehavior?: UpdateCatalogBehavior;
  Table?: string;
  Database?: string;
}
export const DirectSchemaChangePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnableUpdateCatalog: S.optional(S.Boolean),
    UpdateBehavior: S.optional(UpdateCatalogBehavior),
    Table: S.optional(S.String),
    Database: S.optional(S.String),
  }),
).annotate({
  identifier: "DirectSchemaChangePolicy",
}) as any as S.Schema<DirectSchemaChangePolicy>;
export interface S3GlueParquetTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Path: string;
  Compression?: ParquetCompressionType;
  NumberTargetPartitions?: string;
  SchemaChangePolicy?: DirectSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
}
export const S3GlueParquetTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    PartitionKeys: S.optional(GlueStudioPathList),
    Path: S.String,
    Compression: S.optional(ParquetCompressionType),
    NumberTargetPartitions: S.optional(S.String),
    SchemaChangePolicy: S.optional(DirectSchemaChangePolicy),
    AutoDataQuality: S.optional(AutoDataQuality),
  }),
).annotate({
  identifier: "S3GlueParquetTarget",
}) as any as S.Schema<S3GlueParquetTarget>;
export type TargetFormat =
  | "json"
  | "csv"
  | "avro"
  | "orc"
  | "parquet"
  | "hudi"
  | "delta"
  | "iceberg"
  | "hyper"
  | "xml"
  | (string & {});
export const TargetFormat = /*@__PURE__*/ S.String;

export interface S3DirectTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Path: string;
  Compression?: string;
  NumberTargetPartitions?: string;
  Format: TargetFormat;
  SchemaChangePolicy?: DirectSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
  OutputSchemas?: GlueSchema[];
}
export const S3DirectTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    PartitionKeys: S.optional(GlueStudioPathList),
    Path: S.String,
    Compression: S.optional(S.String),
    NumberTargetPartitions: S.optional(S.String),
    Format: TargetFormat,
    SchemaChangePolicy: S.optional(DirectSchemaChangePolicy),
    AutoDataQuality: S.optional(AutoDataQuality),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({ identifier: "S3DirectTarget" }) as any as S.Schema<S3DirectTarget>;
export interface Mapping {
  ToKey?: string;
  FromPath?: string[];
  FromType?: string;
  ToType?: string;
  Dropped?: boolean;
  Children?: Mapping[];
}
export const Mapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ToKey: S.optional(S.String),
    FromPath: S.optional(EnclosedInStringProperties),
    FromType: S.optional(S.String),
    ToType: S.optional(S.String),
    Dropped: S.optional(S.Boolean),
    Children: S.optional(
      S.suspend(() => Mappings).annotate({ identifier: "Mappings" }),
    ),
  }),
).annotate({ identifier: "Mapping" }) as any as S.Schema<Mapping>;
export type Mappings = Mapping[];
export const Mappings = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Mapping> => Mapping).annotate({
    identifier: "Mapping",
  }),
) as any as S.Schema<Mappings>;
export interface ApplyMapping {
  Name: string;
  Inputs: string[];
  Mapping: Mapping[];
}
export const ApplyMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Inputs: OneInput, Mapping: Mappings }),
).annotate({ identifier: "ApplyMapping" }) as any as S.Schema<ApplyMapping>;
export interface SelectFields {
  Name: string;
  Inputs: string[];
  Paths: string[][];
}
export const SelectFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Inputs: OneInput, Paths: GlueStudioPathList }),
).annotate({ identifier: "SelectFields" }) as any as S.Schema<SelectFields>;
export interface DropFields {
  Name: string;
  Inputs: string[];
  Paths: string[][];
}
export const DropFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Inputs: OneInput, Paths: GlueStudioPathList }),
).annotate({ identifier: "DropFields" }) as any as S.Schema<DropFields>;
export interface RenameField {
  Name: string;
  Inputs: string[];
  SourcePath: string[];
  TargetPath: string[];
}
export const RenameField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    SourcePath: EnclosedInStringProperties,
    TargetPath: EnclosedInStringProperties,
  }),
).annotate({ identifier: "RenameField" }) as any as S.Schema<RenameField>;
export type Topk = number;
export type Prob = number;
export interface Spigot {
  Name: string;
  Inputs: string[];
  Path: string;
  Topk?: number;
  Prob?: number;
}
export const Spigot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    Path: S.String,
    Topk: S.optional(S.Number),
    Prob: S.optional(S.Number),
  }),
).annotate({ identifier: "Spigot" }) as any as S.Schema<Spigot>;
export type TwoInputs = string[];
export const TwoInputs = /*@__PURE__*/ S.Array(S.String);
export type JoinType =
  | "equijoin"
  | "left"
  | "right"
  | "outer"
  | "leftsemi"
  | "leftanti"
  | (string & {});
export const JoinType = /*@__PURE__*/ S.String;

export interface JoinColumn {
  From: string;
  Keys: string[][];
}
export const JoinColumn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ From: S.String, Keys: GlueStudioPathList }),
).annotate({ identifier: "JoinColumn" }) as any as S.Schema<JoinColumn>;
export type JoinColumns = JoinColumn[];
export const JoinColumns = /*@__PURE__*/ S.Array(JoinColumn);
export interface Join {
  Name: string;
  Inputs: string[];
  JoinType: JoinType;
  Columns: JoinColumn[];
}
export const Join = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: TwoInputs,
    JoinType: JoinType,
    Columns: JoinColumns,
  }),
).annotate({ identifier: "Join" }) as any as S.Schema<Join>;
export interface SplitFields {
  Name: string;
  Inputs: string[];
  Paths: string[][];
}
export const SplitFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Inputs: OneInput, Paths: GlueStudioPathList }),
).annotate({ identifier: "SplitFields" }) as any as S.Schema<SplitFields>;
export type NonNegativeInt = number;
export interface SelectFromCollection {
  Name: string;
  Inputs: string[];
  Index: number;
}
export const SelectFromCollection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Inputs: OneInput, Index: S.Number }),
).annotate({
  identifier: "SelectFromCollection",
}) as any as S.Schema<SelectFromCollection>;
export interface FillMissingValues {
  Name: string;
  Inputs: string[];
  ImputedPath: string;
  FilledPath?: string;
}
export const FillMissingValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    ImputedPath: S.String,
    FilledPath: S.optional(S.String),
  }),
).annotate({
  identifier: "FillMissingValues",
}) as any as S.Schema<FillMissingValues>;
export type FilterLogicalOperator = "AND" | "OR" | (string & {});
export const FilterLogicalOperator = /*@__PURE__*/ S.String;

export type FilterOperation =
  | "EQ"
  | "LT"
  | "GT"
  | "LTE"
  | "GTE"
  | "REGEX"
  | "ISNULL"
  | (string & {});
export const FilterOperation = /*@__PURE__*/ S.String;

export type FilterValueType = "COLUMNEXTRACTED" | "CONSTANT" | (string & {});
export const FilterValueType = /*@__PURE__*/ S.String;

export interface FilterValue {
  Type: FilterValueType;
  Value: string[];
}
export const FilterValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: FilterValueType, Value: EnclosedInStringProperties }),
).annotate({ identifier: "FilterValue" }) as any as S.Schema<FilterValue>;
export type FilterValues = FilterValue[];
export const FilterValues = /*@__PURE__*/ S.Array(FilterValue);
export interface FilterExpression {
  Operation: FilterOperation;
  Negated?: boolean;
  Values: FilterValue[];
}
export const FilterExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Operation: FilterOperation,
    Negated: S.optional(S.Boolean),
    Values: FilterValues,
  }),
).annotate({
  identifier: "FilterExpression",
}) as any as S.Schema<FilterExpression>;
export type FilterExpressions = FilterExpression[];
export const FilterExpressions = /*@__PURE__*/ S.Array(FilterExpression);
export interface Filter {
  Name: string;
  Inputs: string[];
  LogicalOperator: FilterLogicalOperator;
  Filters: FilterExpression[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    LogicalOperator: FilterLogicalOperator,
    Filters: FilterExpressions,
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type ManyInputs = string[];
export const ManyInputs = /*@__PURE__*/ S.Array(S.String);
export type ExtendedString = string;
export interface CustomCode {
  Name: string;
  Inputs: string[];
  Code: string;
  ClassName: string;
  OutputSchemas?: GlueSchema[];
}
export const CustomCode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: ManyInputs,
    Code: S.String,
    ClassName: S.String,
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({ identifier: "CustomCode" }) as any as S.Schema<CustomCode>;
export interface SqlAlias {
  From: string;
  Alias: string;
}
export const SqlAlias = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ From: S.String, Alias: S.String }),
).annotate({ identifier: "SqlAlias" }) as any as S.Schema<SqlAlias>;
export type SqlAliases = SqlAlias[];
export const SqlAliases = /*@__PURE__*/ S.Array(SqlAlias);
export interface SparkSQL {
  Name: string;
  Inputs: string[];
  SqlQuery: string;
  SqlAliases: SqlAlias[];
  OutputSchemas?: GlueSchema[];
}
export const SparkSQL = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: ManyInputs,
    SqlQuery: S.String,
    SqlAliases: SqlAliases,
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({ identifier: "SparkSQL" }) as any as S.Schema<SparkSQL>;
export type BoxedPositiveInt = number;
export type StartingPosition =
  | "latest"
  | "trim_horizon"
  | "earliest"
  | "timestamp"
  | (string & {});
export const StartingPosition = /*@__PURE__*/ S.String;

export type Iso8601DateTime = Date;
export interface KinesisStreamingSourceOptions {
  EndpointUrl?: string;
  StreamName?: string;
  Classification?: string;
  Delimiter?: string;
  StartingPosition?: StartingPosition;
  MaxFetchTimeInMs?: number;
  MaxFetchRecordsPerShard?: number;
  MaxRecordPerRead?: number;
  AddIdleTimeBetweenReads?: boolean;
  IdleTimeBetweenReadsInMs?: number;
  DescribeShardInterval?: number;
  NumRetries?: number;
  RetryIntervalMs?: number;
  MaxRetryIntervalMs?: number;
  AvoidEmptyBatches?: boolean;
  StreamArn?: string;
  RoleArn?: string;
  RoleSessionName?: string;
  AddRecordTimestamp?: string;
  EmitConsumerLagMetrics?: string;
  StartingTimestamp?: Date;
  FanoutConsumerARN?: string;
}
export const KinesisStreamingSourceOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointUrl: S.optional(S.String),
    StreamName: S.optional(S.String),
    Classification: S.optional(S.String),
    Delimiter: S.optional(S.String),
    StartingPosition: S.optional(StartingPosition),
    MaxFetchTimeInMs: S.optional(S.Number),
    MaxFetchRecordsPerShard: S.optional(S.Number),
    MaxRecordPerRead: S.optional(S.Number),
    AddIdleTimeBetweenReads: S.optional(S.Boolean),
    IdleTimeBetweenReadsInMs: S.optional(S.Number),
    DescribeShardInterval: S.optional(S.Number),
    NumRetries: S.optional(S.Number),
    RetryIntervalMs: S.optional(S.Number),
    MaxRetryIntervalMs: S.optional(S.Number),
    AvoidEmptyBatches: S.optional(S.Boolean),
    StreamArn: S.optional(S.String),
    RoleArn: S.optional(S.String),
    RoleSessionName: S.optional(S.String),
    AddRecordTimestamp: S.optional(S.String),
    EmitConsumerLagMetrics: S.optional(S.String),
    StartingTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    FanoutConsumerARN: S.optional(S.String),
  }),
).annotate({
  identifier: "KinesisStreamingSourceOptions",
}) as any as S.Schema<KinesisStreamingSourceOptions>;
export type PollingTime = number;
export type PositiveLong = number;
export interface StreamingDataPreviewOptions {
  PollingTime?: number;
  RecordPollingLimit?: number;
}
export const StreamingDataPreviewOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PollingTime: S.optional(S.Number),
    RecordPollingLimit: S.optional(S.Number),
  }),
).annotate({
  identifier: "StreamingDataPreviewOptions",
}) as any as S.Schema<StreamingDataPreviewOptions>;
export interface DirectKinesisSource {
  Name: string;
  WindowSize?: number;
  DetectSchema?: boolean;
  StreamingOptions?: KinesisStreamingSourceOptions;
  DataPreviewOptions?: StreamingDataPreviewOptions;
}
export const DirectKinesisSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    WindowSize: S.optional(S.Number),
    DetectSchema: S.optional(S.Boolean),
    StreamingOptions: S.optional(KinesisStreamingSourceOptions),
    DataPreviewOptions: S.optional(StreamingDataPreviewOptions),
  }),
).annotate({
  identifier: "DirectKinesisSource",
}) as any as S.Schema<DirectKinesisSource>;
export interface KafkaStreamingSourceOptions {
  BootstrapServers?: string;
  SecurityProtocol?: string;
  ConnectionName?: string;
  TopicName?: string;
  Assign?: string;
  SubscribePattern?: string;
  Classification?: string;
  Delimiter?: string;
  StartingOffsets?: string;
  EndingOffsets?: string;
  PollTimeoutMs?: number;
  NumRetries?: number;
  RetryIntervalMs?: number;
  MaxOffsetsPerTrigger?: number;
  MinPartitions?: number;
  IncludeHeaders?: boolean;
  AddRecordTimestamp?: string;
  EmitConsumerLagMetrics?: string;
  StartingTimestamp?: Date;
}
export const KafkaStreamingSourceOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BootstrapServers: S.optional(S.String),
    SecurityProtocol: S.optional(S.String),
    ConnectionName: S.optional(S.String),
    TopicName: S.optional(S.String),
    Assign: S.optional(S.String),
    SubscribePattern: S.optional(S.String),
    Classification: S.optional(S.String),
    Delimiter: S.optional(S.String),
    StartingOffsets: S.optional(S.String),
    EndingOffsets: S.optional(S.String),
    PollTimeoutMs: S.optional(S.Number),
    NumRetries: S.optional(S.Number),
    RetryIntervalMs: S.optional(S.Number),
    MaxOffsetsPerTrigger: S.optional(S.Number),
    MinPartitions: S.optional(S.Number),
    IncludeHeaders: S.optional(S.Boolean),
    AddRecordTimestamp: S.optional(S.String),
    EmitConsumerLagMetrics: S.optional(S.String),
    StartingTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "KafkaStreamingSourceOptions",
}) as any as S.Schema<KafkaStreamingSourceOptions>;
export interface DirectKafkaSource {
  Name: string;
  StreamingOptions?: KafkaStreamingSourceOptions;
  WindowSize?: number;
  DetectSchema?: boolean;
  DataPreviewOptions?: StreamingDataPreviewOptions;
}
export const DirectKafkaSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    StreamingOptions: S.optional(KafkaStreamingSourceOptions),
    WindowSize: S.optional(S.Number),
    DetectSchema: S.optional(S.Boolean),
    DataPreviewOptions: S.optional(StreamingDataPreviewOptions),
  }),
).annotate({
  identifier: "DirectKafkaSource",
}) as any as S.Schema<DirectKafkaSource>;
export interface CatalogKinesisSource {
  Name: string;
  WindowSize?: number;
  DetectSchema?: boolean;
  Table: string;
  Database: string;
  StreamingOptions?: KinesisStreamingSourceOptions;
  DataPreviewOptions?: StreamingDataPreviewOptions;
}
export const CatalogKinesisSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    WindowSize: S.optional(S.Number),
    DetectSchema: S.optional(S.Boolean),
    Table: S.String,
    Database: S.String,
    StreamingOptions: S.optional(KinesisStreamingSourceOptions),
    DataPreviewOptions: S.optional(StreamingDataPreviewOptions),
  }),
).annotate({
  identifier: "CatalogKinesisSource",
}) as any as S.Schema<CatalogKinesisSource>;
export interface CatalogKafkaSource {
  Name: string;
  WindowSize?: number;
  DetectSchema?: boolean;
  Table: string;
  Database: string;
  StreamingOptions?: KafkaStreamingSourceOptions;
  DataPreviewOptions?: StreamingDataPreviewOptions;
}
export const CatalogKafkaSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    WindowSize: S.optional(S.Number),
    DetectSchema: S.optional(S.Boolean),
    Table: S.String,
    Database: S.String,
    StreamingOptions: S.optional(KafkaStreamingSourceOptions),
    DataPreviewOptions: S.optional(StreamingDataPreviewOptions),
  }),
).annotate({
  identifier: "CatalogKafkaSource",
}) as any as S.Schema<CatalogKafkaSource>;
export interface NullCheckBoxList {
  IsEmpty?: boolean;
  IsNullString?: boolean;
  IsNegOne?: boolean;
}
export const NullCheckBoxList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsEmpty: S.optional(S.Boolean),
    IsNullString: S.optional(S.Boolean),
    IsNegOne: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "NullCheckBoxList",
}) as any as S.Schema<NullCheckBoxList>;
export type GenericLimitedString = string;
export interface Datatype {
  Id: string;
  Label: string;
}
export const Datatype = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, Label: S.String }),
).annotate({ identifier: "Datatype" }) as any as S.Schema<Datatype>;
export interface NullValueField {
  Value: string;
  Datatype: Datatype;
}
export const NullValueField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.String, Datatype: Datatype }),
).annotate({ identifier: "NullValueField" }) as any as S.Schema<NullValueField>;
export type NullValueFields = NullValueField[];
export const NullValueFields = /*@__PURE__*/ S.Array(NullValueField);
export interface DropNullFields {
  Name: string;
  Inputs: string[];
  NullCheckBoxList?: NullCheckBoxList;
  NullTextList?: NullValueField[];
}
export const DropNullFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    NullCheckBoxList: S.optional(NullCheckBoxList),
    NullTextList: S.optional(NullValueFields),
  }),
).annotate({ identifier: "DropNullFields" }) as any as S.Schema<DropNullFields>;
export interface Merge {
  Name: string;
  Inputs: string[];
  Source: string;
  PrimaryKeys: string[][];
}
export const Merge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: TwoInputs,
    Source: S.String,
    PrimaryKeys: GlueStudioPathList,
  }),
).annotate({ identifier: "Merge" }) as any as S.Schema<Merge>;
export type UnionType = "ALL" | "DISTINCT" | (string & {});
export const UnionType = /*@__PURE__*/ S.String;

export interface Union {
  Name: string;
  Inputs: string[];
  UnionType: UnionType;
}
export const Union = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Inputs: TwoInputs, UnionType: UnionType }),
).annotate({ identifier: "Union" }) as any as S.Schema<Union>;
export type PiiType =
  | "RowAudit"
  | "RowHashing"
  | "RowMasking"
  | "RowPartialMasking"
  | "ColumnAudit"
  | "ColumnHashing"
  | "ColumnMasking"
  | (string & {});
export const PiiType = /*@__PURE__*/ S.String;

export type BoxedDoubleFraction = number;
export type MaskValue = string;
export interface PIIDetection {
  Name: string;
  Inputs: string[];
  PiiType: PiiType;
  EntityTypesToDetect: string[];
  OutputColumnName?: string;
  SampleFraction?: number;
  ThresholdFraction?: number;
  MaskValue?: string;
  RedactText?: string;
  RedactChar?: string;
  MatchPattern?: string;
  NumLeftCharsToExclude?: number;
  NumRightCharsToExclude?: number;
  DetectionParameters?: string;
  DetectionSensitivity?: string;
}
export const PIIDetection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    PiiType: PiiType,
    EntityTypesToDetect: EnclosedInStringProperties,
    OutputColumnName: S.optional(S.String),
    SampleFraction: S.optional(S.Number),
    ThresholdFraction: S.optional(S.Number),
    MaskValue: S.optional(S.String),
    RedactText: S.optional(S.String),
    RedactChar: S.optional(S.String),
    MatchPattern: S.optional(S.String),
    NumLeftCharsToExclude: S.optional(S.Number),
    NumRightCharsToExclude: S.optional(S.Number),
    DetectionParameters: S.optional(S.String),
    DetectionSensitivity: S.optional(S.String),
  }),
).annotate({ identifier: "PIIDetection" }) as any as S.Schema<PIIDetection>;
export type AggFunction =
  | "avg"
  | "countDistinct"
  | "count"
  | "first"
  | "last"
  | "kurtosis"
  | "max"
  | "min"
  | "skewness"
  | "stddev_samp"
  | "stddev_pop"
  | "sum"
  | "sumDistinct"
  | "var_samp"
  | "var_pop"
  | (string & {});
export const AggFunction = /*@__PURE__*/ S.String;

export interface AggregateOperation {
  Column: string[];
  AggFunc: AggFunction;
}
export const AggregateOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Column: EnclosedInStringProperties, AggFunc: AggFunction }),
).annotate({
  identifier: "AggregateOperation",
}) as any as S.Schema<AggregateOperation>;
export type AggregateOperations = AggregateOperation[];
export const AggregateOperations = /*@__PURE__*/ S.Array(AggregateOperation);
export interface Aggregate {
  Name: string;
  Inputs: string[];
  Groups: string[][];
  Aggs: AggregateOperation[];
}
export const Aggregate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    Groups: GlueStudioPathList,
    Aggs: AggregateOperations,
  }),
).annotate({ identifier: "Aggregate" }) as any as S.Schema<Aggregate>;
export type LimitedStringList = string[];
export const LimitedStringList = /*@__PURE__*/ S.Array(S.String);
export type LimitedPathList = string[][];
export const LimitedPathList = /*@__PURE__*/ S.Array(LimitedStringList);
export interface DropDuplicates {
  Name: string;
  Inputs: string[];
  Columns?: string[][];
}
export const DropDuplicates = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    Columns: S.optional(LimitedPathList),
  }),
).annotate({ identifier: "DropDuplicates" }) as any as S.Schema<DropDuplicates>;
export interface GovernedCatalogTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Table: string;
  Database: string;
  SchemaChangePolicy?: CatalogSchemaChangePolicy;
}
export const GovernedCatalogTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    PartitionKeys: S.optional(GlueStudioPathList),
    Table: S.String,
    Database: S.String,
    SchemaChangePolicy: S.optional(CatalogSchemaChangePolicy),
  }),
).annotate({
  identifier: "GovernedCatalogTarget",
}) as any as S.Schema<GovernedCatalogTarget>;
export interface GovernedCatalogSource {
  Name: string;
  Database: string;
  Table: string;
  PartitionPredicate?: string;
  AdditionalOptions?: S3SourceAdditionalOptions;
}
export const GovernedCatalogSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Database: S.String,
    Table: S.String,
    PartitionPredicate: S.optional(S.String),
    AdditionalOptions: S.optional(S3SourceAdditionalOptions),
  }),
).annotate({
  identifier: "GovernedCatalogSource",
}) as any as S.Schema<GovernedCatalogSource>;
export interface MicrosoftSQLServerCatalogSource {
  Name: string;
  Database: string;
  Table: string;
}
export const MicrosoftSQLServerCatalogSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Database: S.String, Table: S.String }),
).annotate({
  identifier: "MicrosoftSQLServerCatalogSource",
}) as any as S.Schema<MicrosoftSQLServerCatalogSource>;
export interface MySQLCatalogSource {
  Name: string;
  Database: string;
  Table: string;
}
export const MySQLCatalogSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Database: S.String, Table: S.String }),
).annotate({
  identifier: "MySQLCatalogSource",
}) as any as S.Schema<MySQLCatalogSource>;
export interface OracleSQLCatalogSource {
  Name: string;
  Database: string;
  Table: string;
}
export const OracleSQLCatalogSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Database: S.String, Table: S.String }),
).annotate({
  identifier: "OracleSQLCatalogSource",
}) as any as S.Schema<OracleSQLCatalogSource>;
export interface PostgreSQLCatalogSource {
  Name: string;
  Database: string;
  Table: string;
}
export const PostgreSQLCatalogSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Database: S.String, Table: S.String }),
).annotate({
  identifier: "PostgreSQLCatalogSource",
}) as any as S.Schema<PostgreSQLCatalogSource>;
export interface MicrosoftSQLServerCatalogTarget {
  Name: string;
  Inputs: string[];
  Database: string;
  Table: string;
}
export const MicrosoftSQLServerCatalogTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    Database: S.String,
    Table: S.String,
  }),
).annotate({
  identifier: "MicrosoftSQLServerCatalogTarget",
}) as any as S.Schema<MicrosoftSQLServerCatalogTarget>;
export interface MySQLCatalogTarget {
  Name: string;
  Inputs: string[];
  Database: string;
  Table: string;
}
export const MySQLCatalogTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    Database: S.String,
    Table: S.String,
  }),
).annotate({
  identifier: "MySQLCatalogTarget",
}) as any as S.Schema<MySQLCatalogTarget>;
export interface OracleSQLCatalogTarget {
  Name: string;
  Inputs: string[];
  Database: string;
  Table: string;
}
export const OracleSQLCatalogTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    Database: S.String,
    Table: S.String,
  }),
).annotate({
  identifier: "OracleSQLCatalogTarget",
}) as any as S.Schema<OracleSQLCatalogTarget>;
export interface PostgreSQLCatalogTarget {
  Name: string;
  Inputs: string[];
  Database: string;
  Table: string;
}
export const PostgreSQLCatalogTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    Database: S.String,
    Table: S.String,
  }),
).annotate({
  identifier: "PostgreSQLCatalogTarget",
}) as any as S.Schema<PostgreSQLCatalogTarget>;
export interface GroupFilters {
  GroupName: string;
  Filters: FilterExpression[];
  LogicalOperator: FilterLogicalOperator;
}
export const GroupFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.String,
    Filters: FilterExpressions,
    LogicalOperator: FilterLogicalOperator,
  }),
).annotate({ identifier: "GroupFilters" }) as any as S.Schema<GroupFilters>;
export type GroupFiltersList = GroupFilters[];
export const GroupFiltersList = /*@__PURE__*/ S.Array(GroupFilters);
export interface Route {
  Name: string;
  Inputs: string[];
  GroupFiltersList: GroupFilters[];
}
export const Route = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    GroupFiltersList: GroupFiltersList,
  }),
).annotate({ identifier: "Route" }) as any as S.Schema<Route>;
export type ParamType =
  | "str"
  | "int"
  | "float"
  | "complex"
  | "bool"
  | "list"
  | "null"
  | (string & {});
export const ParamType = /*@__PURE__*/ S.String;

export interface TransformConfigParameter {
  Name: string;
  Type: ParamType;
  ValidationRule?: string;
  ValidationMessage?: string;
  Value?: string[];
  ListType?: ParamType;
  IsOptional?: boolean;
}
export const TransformConfigParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Type: ParamType,
    ValidationRule: S.optional(S.String),
    ValidationMessage: S.optional(S.String),
    Value: S.optional(EnclosedInStringProperties),
    ListType: S.optional(ParamType),
    IsOptional: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "TransformConfigParameter",
}) as any as S.Schema<TransformConfigParameter>;
export type TransformConfigParameterList = TransformConfigParameter[];
export const TransformConfigParameterList = /*@__PURE__*/ S.Array(
  TransformConfigParameter,
);
export interface DynamicTransform {
  Name: string;
  TransformName: string;
  Inputs: string[];
  Parameters?: TransformConfigParameter[];
  FunctionName: string;
  Path: string;
  Version?: string;
  OutputSchemas?: GlueSchema[];
}
export const DynamicTransform = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    TransformName: S.String,
    Inputs: OneInput,
    Parameters: S.optional(TransformConfigParameterList),
    FunctionName: S.String,
    Path: S.String,
    Version: S.optional(S.String),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "DynamicTransform",
}) as any as S.Schema<DynamicTransform>;
export type DQDLString = string;
export type DQTransformOutput =
  | "PrimaryInput"
  | "EvaluationResults"
  | (string & {});
export const DQTransformOutput = /*@__PURE__*/ S.String;

export interface DQResultsPublishingOptions {
  EvaluationContext?: string;
  ResultsS3Prefix?: string;
  CloudWatchMetricsEnabled?: boolean;
  ResultsPublishingEnabled?: boolean;
}
export const DQResultsPublishingOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EvaluationContext: S.optional(S.String),
    ResultsS3Prefix: S.optional(S.String),
    CloudWatchMetricsEnabled: S.optional(S.Boolean),
    ResultsPublishingEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DQResultsPublishingOptions",
}) as any as S.Schema<DQResultsPublishingOptions>;
export type DQStopJobOnFailureTiming =
  | "Immediate"
  | "AfterDataLoad"
  | (string & {});
export const DQStopJobOnFailureTiming = /*@__PURE__*/ S.String;

export interface DQStopJobOnFailureOptions {
  StopJobOnFailureTiming?: DQStopJobOnFailureTiming;
}
export const DQStopJobOnFailureOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StopJobOnFailureTiming: S.optional(DQStopJobOnFailureTiming) }),
).annotate({
  identifier: "DQStopJobOnFailureOptions",
}) as any as S.Schema<DQStopJobOnFailureOptions>;
export interface EvaluateDataQuality {
  Name: string;
  Inputs: string[];
  Ruleset: string;
  Output?: DQTransformOutput;
  PublishingOptions?: DQResultsPublishingOptions;
  StopJobOnFailureOptions?: DQStopJobOnFailureOptions;
}
export const EvaluateDataQuality = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    Ruleset: S.String,
    Output: S.optional(DQTransformOutput),
    PublishingOptions: S.optional(DQResultsPublishingOptions),
    StopJobOnFailureOptions: S.optional(DQStopJobOnFailureOptions),
  }),
).annotate({
  identifier: "EvaluateDataQuality",
}) as any as S.Schema<EvaluateDataQuality>;
export interface S3CatalogHudiSource {
  Name: string;
  Database: string;
  Table: string;
  AdditionalHudiOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export const S3CatalogHudiSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Database: S.String,
    Table: S.String,
    AdditionalHudiOptions: S.optional(AdditionalOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "S3CatalogHudiSource",
}) as any as S.Schema<S3CatalogHudiSource>;
export interface CatalogHudiSource {
  Name: string;
  Database: string;
  Table: string;
  AdditionalHudiOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export const CatalogHudiSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Database: S.String,
    Table: S.String,
    AdditionalHudiOptions: S.optional(AdditionalOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "CatalogHudiSource",
}) as any as S.Schema<CatalogHudiSource>;
export interface S3HudiSource {
  Name: string;
  Paths: string[];
  AdditionalHudiOptions?: { [key: string]: string | undefined };
  AdditionalOptions?: S3DirectSourceAdditionalOptions;
  OutputSchemas?: GlueSchema[];
}
export const S3HudiSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Paths: EnclosedInStringProperties,
    AdditionalHudiOptions: S.optional(AdditionalOptions),
    AdditionalOptions: S.optional(S3DirectSourceAdditionalOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({ identifier: "S3HudiSource" }) as any as S.Schema<S3HudiSource>;
export interface S3HudiCatalogTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Table: string;
  Database: string;
  AdditionalOptions: { [key: string]: string | undefined };
  SchemaChangePolicy?: CatalogSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
  OutputSchemas?: GlueSchema[];
}
export const S3HudiCatalogTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    PartitionKeys: S.optional(GlueStudioPathList),
    Table: S.String,
    Database: S.String,
    AdditionalOptions: AdditionalOptions,
    SchemaChangePolicy: S.optional(CatalogSchemaChangePolicy),
    AutoDataQuality: S.optional(AutoDataQuality),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "S3HudiCatalogTarget",
}) as any as S.Schema<S3HudiCatalogTarget>;
export type HudiTargetCompressionType =
  | "gzip"
  | "lzo"
  | "uncompressed"
  | "snappy"
  | (string & {});
export const HudiTargetCompressionType = /*@__PURE__*/ S.String;

export interface S3HudiDirectTarget {
  Name: string;
  Inputs: string[];
  Path: string;
  Compression: HudiTargetCompressionType;
  NumberTargetPartitions?: string;
  PartitionKeys?: string[][];
  Format: TargetFormat;
  AdditionalOptions: { [key: string]: string | undefined };
  SchemaChangePolicy?: DirectSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
}
export const S3HudiDirectTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    Path: S.String,
    Compression: HudiTargetCompressionType,
    NumberTargetPartitions: S.optional(S.String),
    PartitionKeys: S.optional(GlueStudioPathList),
    Format: TargetFormat,
    AdditionalOptions: AdditionalOptions,
    SchemaChangePolicy: S.optional(DirectSchemaChangePolicy),
    AutoDataQuality: S.optional(AutoDataQuality),
  }),
).annotate({
  identifier: "S3HudiDirectTarget",
}) as any as S.Schema<S3HudiDirectTarget>;
export type JDBCConnectionType =
  | "sqlserver"
  | "mysql"
  | "oracle"
  | "postgresql"
  | "redshift"
  | (string & {});
export const JDBCConnectionType = /*@__PURE__*/ S.String;

export interface DirectJDBCSource {
  Name: string;
  Database: string;
  Table: string;
  ConnectionName: string;
  ConnectionType: JDBCConnectionType;
  RedshiftTmpDir?: string;
  OutputSchemas?: GlueSchema[];
}
export const DirectJDBCSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Database: S.String,
    Table: S.String,
    ConnectionName: S.String,
    ConnectionType: JDBCConnectionType,
    RedshiftTmpDir: S.optional(S.String),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "DirectJDBCSource",
}) as any as S.Schema<DirectJDBCSource>;
export interface S3CatalogDeltaSource {
  Name: string;
  Database: string;
  Table: string;
  AdditionalDeltaOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export const S3CatalogDeltaSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Database: S.String,
    Table: S.String,
    AdditionalDeltaOptions: S.optional(AdditionalOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "S3CatalogDeltaSource",
}) as any as S.Schema<S3CatalogDeltaSource>;
export interface CatalogDeltaSource {
  Name: string;
  Database: string;
  Table: string;
  AdditionalDeltaOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export const CatalogDeltaSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Database: S.String,
    Table: S.String,
    AdditionalDeltaOptions: S.optional(AdditionalOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "CatalogDeltaSource",
}) as any as S.Schema<CatalogDeltaSource>;
export interface S3DeltaSource {
  Name: string;
  Paths: string[];
  AdditionalDeltaOptions?: { [key: string]: string | undefined };
  AdditionalOptions?: S3DirectSourceAdditionalOptions;
  OutputSchemas?: GlueSchema[];
}
export const S3DeltaSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Paths: EnclosedInStringProperties,
    AdditionalDeltaOptions: S.optional(AdditionalOptions),
    AdditionalOptions: S.optional(S3DirectSourceAdditionalOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({ identifier: "S3DeltaSource" }) as any as S.Schema<S3DeltaSource>;
export interface S3DeltaCatalogTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Table: string;
  Database: string;
  AdditionalOptions?: { [key: string]: string | undefined };
  SchemaChangePolicy?: CatalogSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
  OutputSchemas?: GlueSchema[];
}
export const S3DeltaCatalogTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    PartitionKeys: S.optional(GlueStudioPathList),
    Table: S.String,
    Database: S.String,
    AdditionalOptions: S.optional(AdditionalOptions),
    SchemaChangePolicy: S.optional(CatalogSchemaChangePolicy),
    AutoDataQuality: S.optional(AutoDataQuality),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "S3DeltaCatalogTarget",
}) as any as S.Schema<S3DeltaCatalogTarget>;
export type DeltaTargetCompressionType =
  | "uncompressed"
  | "snappy"
  | (string & {});
export const DeltaTargetCompressionType = /*@__PURE__*/ S.String;

export interface S3DeltaDirectTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Path: string;
  Compression: DeltaTargetCompressionType;
  NumberTargetPartitions?: string;
  Format: TargetFormat;
  AdditionalOptions?: { [key: string]: string | undefined };
  SchemaChangePolicy?: DirectSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
}
export const S3DeltaDirectTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    PartitionKeys: S.optional(GlueStudioPathList),
    Path: S.String,
    Compression: DeltaTargetCompressionType,
    NumberTargetPartitions: S.optional(S.String),
    Format: TargetFormat,
    AdditionalOptions: S.optional(AdditionalOptions),
    SchemaChangePolicy: S.optional(DirectSchemaChangePolicy),
    AutoDataQuality: S.optional(AutoDataQuality),
  }),
).annotate({
  identifier: "S3DeltaDirectTarget",
}) as any as S.Schema<S3DeltaDirectTarget>;
export interface Option {
  Value?: string;
  Label?: string;
  Description?: string;
}
export const Option = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(S.String),
    Label: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "Option" }) as any as S.Schema<Option>;
export interface AmazonRedshiftAdvancedOption {
  Key?: string;
  Value?: string;
}
export const AmazonRedshiftAdvancedOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "AmazonRedshiftAdvancedOption",
}) as any as S.Schema<AmazonRedshiftAdvancedOption>;
export type AmazonRedshiftAdvancedOptions = AmazonRedshiftAdvancedOption[];
export const AmazonRedshiftAdvancedOptions = /*@__PURE__*/ S.Array(
  AmazonRedshiftAdvancedOption,
);
export type OptionList = Option[];
export const OptionList = /*@__PURE__*/ S.Array(Option);
export interface AmazonRedshiftNodeData {
  AccessType?: string;
  SourceType?: string;
  Connection?: Option;
  Schema?: Option;
  Table?: Option;
  CatalogDatabase?: Option;
  CatalogTable?: Option;
  CatalogRedshiftSchema?: string;
  CatalogRedshiftTable?: string;
  TempDir?: string;
  IamRole?: Option;
  AdvancedOptions?: AmazonRedshiftAdvancedOption[];
  SampleQuery?: string;
  PreAction?: string;
  PostAction?: string;
  Action?: string;
  TablePrefix?: string;
  Upsert?: boolean;
  MergeAction?: string;
  MergeWhenMatched?: string;
  MergeWhenNotMatched?: string;
  MergeClause?: string;
  CrawlerConnection?: string;
  TableSchema?: Option[];
  StagingTable?: string;
  SelectedColumns?: Option[];
}
export const AmazonRedshiftNodeData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessType: S.optional(S.String),
    SourceType: S.optional(S.String),
    Connection: S.optional(Option),
    Schema: S.optional(Option),
    Table: S.optional(Option),
    CatalogDatabase: S.optional(Option),
    CatalogTable: S.optional(Option),
    CatalogRedshiftSchema: S.optional(S.String),
    CatalogRedshiftTable: S.optional(S.String),
    TempDir: S.optional(S.String),
    IamRole: S.optional(Option),
    AdvancedOptions: S.optional(AmazonRedshiftAdvancedOptions),
    SampleQuery: S.optional(S.String),
    PreAction: S.optional(S.String),
    PostAction: S.optional(S.String),
    Action: S.optional(S.String),
    TablePrefix: S.optional(S.String),
    Upsert: S.optional(S.Boolean),
    MergeAction: S.optional(S.String),
    MergeWhenMatched: S.optional(S.String),
    MergeWhenNotMatched: S.optional(S.String),
    MergeClause: S.optional(S.String),
    CrawlerConnection: S.optional(S.String),
    TableSchema: S.optional(OptionList),
    StagingTable: S.optional(S.String),
    SelectedColumns: S.optional(OptionList),
  }),
).annotate({
  identifier: "AmazonRedshiftNodeData",
}) as any as S.Schema<AmazonRedshiftNodeData>;
export interface AmazonRedshiftSource {
  Name?: string;
  Data?: AmazonRedshiftNodeData;
}
export const AmazonRedshiftSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Data: S.optional(AmazonRedshiftNodeData),
  }),
).annotate({
  identifier: "AmazonRedshiftSource",
}) as any as S.Schema<AmazonRedshiftSource>;
export interface AmazonRedshiftTarget {
  Name?: string;
  Data?: AmazonRedshiftNodeData;
  Inputs?: string[];
}
export const AmazonRedshiftTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Data: S.optional(AmazonRedshiftNodeData),
    Inputs: S.optional(OneInput),
  }),
).annotate({
  identifier: "AmazonRedshiftTarget",
}) as any as S.Schema<AmazonRedshiftTarget>;
export type DQDLAliases = { [key: string]: string | undefined };
export const DQDLAliases = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type AdditionalOptionKeys =
  | "performanceTuning.caching"
  | "observations.scope"
  | "compositeRuleEvaluation.method"
  | (string & {});
export const AdditionalOptionKeys = /*@__PURE__*/ S.String;

export type DQAdditionalOptions = { [key in AdditionalOptionKeys]?: string };
export const DQAdditionalOptions = /*@__PURE__*/ S.Record(
  AdditionalOptionKeys,
  S.String.pipe(S.optional),
);
export interface EvaluateDataQualityMultiFrame {
  Name: string;
  Inputs: string[];
  AdditionalDataSources?: { [key: string]: string | undefined };
  Ruleset: string;
  PublishingOptions?: DQResultsPublishingOptions;
  AdditionalOptions?: { [key: string]: string | undefined };
  StopJobOnFailureOptions?: DQStopJobOnFailureOptions;
}
export const EvaluateDataQualityMultiFrame = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: ManyInputs,
    AdditionalDataSources: S.optional(DQDLAliases),
    Ruleset: S.String,
    PublishingOptions: S.optional(DQResultsPublishingOptions),
    AdditionalOptions: S.optional(DQAdditionalOptions),
    StopJobOnFailureOptions: S.optional(DQStopJobOnFailureOptions),
  }),
).annotate({
  identifier: "EvaluateDataQualityMultiFrame",
}) as any as S.Schema<EvaluateDataQualityMultiFrame>;
export type RecipeVersion = string;
export interface RecipeReference {
  RecipeArn: string;
  RecipeVersion: string;
}
export const RecipeReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecipeArn: S.String, RecipeVersion: S.String }),
).annotate({
  identifier: "RecipeReference",
}) as any as S.Schema<RecipeReference>;
export type Operation = string;
export type ParameterName = string;
export type ParameterValue = string;
export type ParameterMap = { [key: string]: string | undefined };
export const ParameterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface RecipeAction {
  Operation: string;
  Parameters?: { [key: string]: string | undefined };
}
export const RecipeAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Operation: S.String, Parameters: S.optional(ParameterMap) }),
).annotate({ identifier: "RecipeAction" }) as any as S.Schema<RecipeAction>;
export type DatabrewCondition = string;
export type DatabrewConditionValue = string;
export type TargetColumn = string;
export interface ConditionExpression {
  Condition: string;
  Value?: string;
  TargetColumn: string;
}
export const ConditionExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Condition: S.String,
    Value: S.optional(S.String),
    TargetColumn: S.String,
  }),
).annotate({
  identifier: "ConditionExpression",
}) as any as S.Schema<ConditionExpression>;
export type ConditionExpressionList = ConditionExpression[];
export const ConditionExpressionList =
  /*@__PURE__*/ S.Array(ConditionExpression);
export interface RecipeStep {
  Action: RecipeAction;
  ConditionExpressions?: ConditionExpression[];
}
export const RecipeStep = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: RecipeAction,
    ConditionExpressions: S.optional(ConditionExpressionList),
  }),
).annotate({ identifier: "RecipeStep" }) as any as S.Schema<RecipeStep>;
export type RecipeSteps = RecipeStep[];
export const RecipeSteps = /*@__PURE__*/ S.Array(RecipeStep);
export interface Recipe {
  Name: string;
  Inputs: string[];
  RecipeReference?: RecipeReference;
  RecipeSteps?: RecipeStep[];
}
export const Recipe = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    RecipeReference: S.optional(RecipeReference),
    RecipeSteps: S.optional(RecipeSteps),
  }),
).annotate({ identifier: "Recipe" }) as any as S.Schema<Recipe>;
export interface SnowflakeNodeData {
  SourceType?: string;
  Connection?: Option;
  Schema?: string;
  Table?: string;
  Database?: string;
  TempDir?: string;
  IamRole?: Option;
  AdditionalOptions?: { [key: string]: string | undefined };
  SampleQuery?: string;
  PreAction?: string;
  PostAction?: string;
  Action?: string;
  Upsert?: boolean;
  MergeAction?: string;
  MergeWhenMatched?: string;
  MergeWhenNotMatched?: string;
  MergeClause?: string;
  StagingTable?: string;
  SelectedColumns?: Option[];
  AutoPushdown?: boolean;
  TableSchema?: Option[];
}
export const SnowflakeNodeData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: S.optional(S.String),
    Connection: S.optional(Option),
    Schema: S.optional(S.String),
    Table: S.optional(S.String),
    Database: S.optional(S.String),
    TempDir: S.optional(S.String),
    IamRole: S.optional(Option),
    AdditionalOptions: S.optional(AdditionalOptions),
    SampleQuery: S.optional(S.String),
    PreAction: S.optional(S.String),
    PostAction: S.optional(S.String),
    Action: S.optional(S.String),
    Upsert: S.optional(S.Boolean),
    MergeAction: S.optional(S.String),
    MergeWhenMatched: S.optional(S.String),
    MergeWhenNotMatched: S.optional(S.String),
    MergeClause: S.optional(S.String),
    StagingTable: S.optional(S.String),
    SelectedColumns: S.optional(OptionList),
    AutoPushdown: S.optional(S.Boolean),
    TableSchema: S.optional(OptionList),
  }),
).annotate({
  identifier: "SnowflakeNodeData",
}) as any as S.Schema<SnowflakeNodeData>;
export interface SnowflakeSource {
  Name: string;
  Data: SnowflakeNodeData;
  OutputSchemas?: GlueSchema[];
}
export const SnowflakeSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Data: SnowflakeNodeData,
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "SnowflakeSource",
}) as any as S.Schema<SnowflakeSource>;
export interface SnowflakeTarget {
  Name: string;
  Data: SnowflakeNodeData;
  Inputs?: string[];
}
export const SnowflakeTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Data: SnowflakeNodeData,
    Inputs: S.optional(OneInput),
  }),
).annotate({
  identifier: "SnowflakeTarget",
}) as any as S.Schema<SnowflakeTarget>;
export type ConnectorOptions = { [key: string]: string | undefined };
export const ConnectorOptions = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ConnectorDataSource {
  Name: string;
  ConnectionType: string;
  Data: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export const ConnectorDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ConnectionType: S.String,
    Data: ConnectorOptions,
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "ConnectorDataSource",
}) as any as S.Schema<ConnectorDataSource>;
export interface ConnectorDataTarget {
  Name: string;
  ConnectionType: string;
  Data: { [key: string]: string | undefined };
  Inputs?: string[];
}
export const ConnectorDataTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ConnectionType: S.String,
    Data: ConnectorOptions,
    Inputs: S.optional(OneInput),
  }),
).annotate({
  identifier: "ConnectorDataTarget",
}) as any as S.Schema<ConnectorDataTarget>;
export interface S3CatalogIcebergSource {
  Name: string;
  Database: string;
  Table: string;
  AdditionalIcebergOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export const S3CatalogIcebergSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Database: S.String,
    Table: S.String,
    AdditionalIcebergOptions: S.optional(AdditionalOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "S3CatalogIcebergSource",
}) as any as S.Schema<S3CatalogIcebergSource>;
export interface CatalogIcebergSource {
  Name: string;
  Database: string;
  Table: string;
  AdditionalIcebergOptions?: { [key: string]: string | undefined };
  OutputSchemas?: GlueSchema[];
}
export const CatalogIcebergSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Database: S.String,
    Table: S.String,
    AdditionalIcebergOptions: S.optional(AdditionalOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "CatalogIcebergSource",
}) as any as S.Schema<CatalogIcebergSource>;
export interface S3IcebergCatalogTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Table: string;
  Database: string;
  AdditionalOptions?: { [key: string]: string | undefined };
  SchemaChangePolicy?: CatalogSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
}
export const S3IcebergCatalogTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    PartitionKeys: S.optional(GlueStudioPathList),
    Table: S.String,
    Database: S.String,
    AdditionalOptions: S.optional(AdditionalOptions),
    SchemaChangePolicy: S.optional(CatalogSchemaChangePolicy),
    AutoDataQuality: S.optional(AutoDataQuality),
  }),
).annotate({
  identifier: "S3IcebergCatalogTarget",
}) as any as S.Schema<S3IcebergCatalogTarget>;
export type IcebergTargetCompressionType =
  | "gzip"
  | "lzo"
  | "uncompressed"
  | "snappy"
  | (string & {});
export const IcebergTargetCompressionType = /*@__PURE__*/ S.String;

export interface S3IcebergDirectTarget {
  Name: string;
  Inputs: string[];
  PartitionKeys?: string[][];
  Path: string;
  Format: TargetFormat;
  AdditionalOptions?: { [key: string]: string | undefined };
  SchemaChangePolicy?: DirectSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
  Compression: IcebergTargetCompressionType;
  NumberTargetPartitions?: string;
  OutputSchemas?: GlueSchema[];
}
export const S3IcebergDirectTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    PartitionKeys: S.optional(GlueStudioPathList),
    Path: S.String,
    Format: TargetFormat,
    AdditionalOptions: S.optional(AdditionalOptions),
    SchemaChangePolicy: S.optional(DirectSchemaChangePolicy),
    AutoDataQuality: S.optional(AutoDataQuality),
    Compression: IcebergTargetCompressionType,
    NumberTargetPartitions: S.optional(S.String),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "S3IcebergDirectTarget",
}) as any as S.Schema<S3IcebergDirectTarget>;
export interface S3ExcelSource {
  Name: string;
  Paths: string[];
  CompressionType?: ParquetCompressionType;
  Exclusions?: string[];
  GroupSize?: string;
  GroupFiles?: string;
  Recurse?: boolean;
  MaxBand?: number;
  MaxFilesInBand?: number;
  AdditionalOptions?: S3DirectSourceAdditionalOptions;
  NumberRows?: number;
  SkipFooter?: number;
  OutputSchemas?: GlueSchema[];
}
export const S3ExcelSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Paths: EnclosedInStringProperties,
    CompressionType: S.optional(ParquetCompressionType),
    Exclusions: S.optional(EnclosedInStringProperties),
    GroupSize: S.optional(S.String),
    GroupFiles: S.optional(S.String),
    Recurse: S.optional(S.Boolean),
    MaxBand: S.optional(S.Number),
    MaxFilesInBand: S.optional(S.Number),
    AdditionalOptions: S.optional(S3DirectSourceAdditionalOptions),
    NumberRows: S.optional(S.Number),
    SkipFooter: S.optional(S.Number),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({ identifier: "S3ExcelSource" }) as any as S.Schema<S3ExcelSource>;
export type HyperTargetCompressionType = "uncompressed" | (string & {});
export const HyperTargetCompressionType = /*@__PURE__*/ S.String;

export interface S3HyperDirectTarget {
  Name: string;
  Inputs: string[];
  Format?: TargetFormat;
  PartitionKeys?: string[][];
  Path: string;
  Compression?: HyperTargetCompressionType;
  SchemaChangePolicy?: DirectSchemaChangePolicy;
  AutoDataQuality?: AutoDataQuality;
  OutputSchemas?: GlueSchema[];
}
export const S3HyperDirectTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Inputs: OneInput,
    Format: S.optional(TargetFormat),
    PartitionKeys: S.optional(GlueStudioPathList),
    Path: S.String,
    Compression: S.optional(HyperTargetCompressionType),
    SchemaChangePolicy: S.optional(DirectSchemaChangePolicy),
    AutoDataQuality: S.optional(AutoDataQuality),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "S3HyperDirectTarget",
}) as any as S.Schema<S3HyperDirectTarget>;
export type DdbExportType = "ddb" | "s3" | (string & {});
export const DdbExportType = /*@__PURE__*/ S.String;

export interface DDBELTConnectionOptions {
  DynamodbExport?: DdbExportType;
  DynamodbUnnestDDBJson?: boolean;
  DynamodbTableArn: string;
  DynamodbS3Bucket?: string;
  DynamodbS3Prefix?: string;
  DynamodbS3BucketOwner?: string;
  DynamodbStsRoleArn?: string;
}
export const DDBELTConnectionOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DynamodbExport: S.optional(DdbExportType),
    DynamodbUnnestDDBJson: S.optional(S.Boolean),
    DynamodbTableArn: S.String,
    DynamodbS3Bucket: S.optional(S.String),
    DynamodbS3Prefix: S.optional(S.String),
    DynamodbS3BucketOwner: S.optional(S.String),
    DynamodbStsRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DDBELTConnectionOptions",
}) as any as S.Schema<DDBELTConnectionOptions>;
export interface DynamoDBELTConnectorSource {
  Name: string;
  ConnectionOptions?: DDBELTConnectionOptions;
  OutputSchemas?: GlueSchema[];
}
export const DynamoDBELTConnectorSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    ConnectionOptions: S.optional(DDBELTConnectionOptions),
    OutputSchemas: S.optional(GlueSchemas),
  }),
).annotate({
  identifier: "DynamoDBELTConnectorSource",
}) as any as S.Schema<DynamoDBELTConnectorSource>;
export interface CodeGenConfigurationNode {
  AthenaConnectorSource?: AthenaConnectorSource;
  JDBCConnectorSource?: JDBCConnectorSource;
  SparkConnectorSource?: SparkConnectorSource;
  CatalogSource?: CatalogSource;
  RedshiftSource?: RedshiftSource;
  S3CatalogSource?: S3CatalogSource;
  S3CsvSource?: S3CsvSource;
  S3JsonSource?: S3JsonSource;
  S3ParquetSource?: S3ParquetSource;
  RelationalCatalogSource?: RelationalCatalogSource;
  DynamoDBCatalogSource?: DynamoDBCatalogSource;
  JDBCConnectorTarget?: JDBCConnectorTarget;
  SparkConnectorTarget?: SparkConnectorTarget;
  CatalogTarget?: BasicCatalogTarget;
  RedshiftTarget?: RedshiftTarget;
  S3CatalogTarget?: S3CatalogTarget;
  S3GlueParquetTarget?: S3GlueParquetTarget;
  S3DirectTarget?: S3DirectTarget;
  ApplyMapping?: ApplyMapping;
  SelectFields?: SelectFields;
  DropFields?: DropFields;
  RenameField?: RenameField;
  Spigot?: Spigot;
  Join?: Join;
  SplitFields?: SplitFields;
  SelectFromCollection?: SelectFromCollection;
  FillMissingValues?: FillMissingValues;
  Filter?: Filter;
  CustomCode?: CustomCode;
  SparkSQL?: SparkSQL;
  DirectKinesisSource?: DirectKinesisSource;
  DirectKafkaSource?: DirectKafkaSource;
  CatalogKinesisSource?: CatalogKinesisSource;
  CatalogKafkaSource?: CatalogKafkaSource;
  DropNullFields?: DropNullFields;
  Merge?: Merge;
  Union?: Union;
  PIIDetection?: PIIDetection;
  Aggregate?: Aggregate;
  DropDuplicates?: DropDuplicates;
  GovernedCatalogTarget?: GovernedCatalogTarget;
  GovernedCatalogSource?: GovernedCatalogSource;
  MicrosoftSQLServerCatalogSource?: MicrosoftSQLServerCatalogSource;
  MySQLCatalogSource?: MySQLCatalogSource;
  OracleSQLCatalogSource?: OracleSQLCatalogSource;
  PostgreSQLCatalogSource?: PostgreSQLCatalogSource;
  MicrosoftSQLServerCatalogTarget?: MicrosoftSQLServerCatalogTarget;
  MySQLCatalogTarget?: MySQLCatalogTarget;
  OracleSQLCatalogTarget?: OracleSQLCatalogTarget;
  PostgreSQLCatalogTarget?: PostgreSQLCatalogTarget;
  Route?: Route;
  DynamicTransform?: DynamicTransform;
  EvaluateDataQuality?: EvaluateDataQuality;
  S3CatalogHudiSource?: S3CatalogHudiSource;
  CatalogHudiSource?: CatalogHudiSource;
  S3HudiSource?: S3HudiSource;
  S3HudiCatalogTarget?: S3HudiCatalogTarget;
  S3HudiDirectTarget?: S3HudiDirectTarget;
  DirectJDBCSource?: DirectJDBCSource;
  S3CatalogDeltaSource?: S3CatalogDeltaSource;
  CatalogDeltaSource?: CatalogDeltaSource;
  S3DeltaSource?: S3DeltaSource;
  S3DeltaCatalogTarget?: S3DeltaCatalogTarget;
  S3DeltaDirectTarget?: S3DeltaDirectTarget;
  AmazonRedshiftSource?: AmazonRedshiftSource;
  AmazonRedshiftTarget?: AmazonRedshiftTarget;
  EvaluateDataQualityMultiFrame?: EvaluateDataQualityMultiFrame;
  Recipe?: Recipe;
  SnowflakeSource?: SnowflakeSource;
  SnowflakeTarget?: SnowflakeTarget;
  ConnectorDataSource?: ConnectorDataSource;
  ConnectorDataTarget?: ConnectorDataTarget;
  S3CatalogIcebergSource?: S3CatalogIcebergSource;
  CatalogIcebergSource?: CatalogIcebergSource;
  S3IcebergCatalogTarget?: S3IcebergCatalogTarget;
  S3IcebergDirectTarget?: S3IcebergDirectTarget;
  S3ExcelSource?: S3ExcelSource;
  S3HyperDirectTarget?: S3HyperDirectTarget;
  DynamoDBELTConnectorSource?: DynamoDBELTConnectorSource;
}
export const CodeGenConfigurationNode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AthenaConnectorSource: S.optional(AthenaConnectorSource),
    JDBCConnectorSource: S.optional(JDBCConnectorSource),
    SparkConnectorSource: S.optional(SparkConnectorSource),
    CatalogSource: S.optional(CatalogSource),
    RedshiftSource: S.optional(RedshiftSource),
    S3CatalogSource: S.optional(S3CatalogSource),
    S3CsvSource: S.optional(S3CsvSource),
    S3JsonSource: S.optional(S3JsonSource),
    S3ParquetSource: S.optional(S3ParquetSource),
    RelationalCatalogSource: S.optional(RelationalCatalogSource),
    DynamoDBCatalogSource: S.optional(DynamoDBCatalogSource),
    JDBCConnectorTarget: S.optional(JDBCConnectorTarget),
    SparkConnectorTarget: S.optional(SparkConnectorTarget),
    CatalogTarget: S.optional(BasicCatalogTarget),
    RedshiftTarget: S.optional(RedshiftTarget),
    S3CatalogTarget: S.optional(S3CatalogTarget),
    S3GlueParquetTarget: S.optional(S3GlueParquetTarget),
    S3DirectTarget: S.optional(S3DirectTarget),
    ApplyMapping: S.optional(ApplyMapping),
    SelectFields: S.optional(SelectFields),
    DropFields: S.optional(DropFields),
    RenameField: S.optional(RenameField),
    Spigot: S.optional(Spigot),
    Join: S.optional(Join),
    SplitFields: S.optional(SplitFields),
    SelectFromCollection: S.optional(SelectFromCollection),
    FillMissingValues: S.optional(FillMissingValues),
    Filter: S.optional(Filter),
    CustomCode: S.optional(CustomCode),
    SparkSQL: S.optional(SparkSQL),
    DirectKinesisSource: S.optional(DirectKinesisSource),
    DirectKafkaSource: S.optional(DirectKafkaSource),
    CatalogKinesisSource: S.optional(CatalogKinesisSource),
    CatalogKafkaSource: S.optional(CatalogKafkaSource),
    DropNullFields: S.optional(DropNullFields),
    Merge: S.optional(Merge),
    Union: S.optional(Union),
    PIIDetection: S.optional(PIIDetection),
    Aggregate: S.optional(Aggregate),
    DropDuplicates: S.optional(DropDuplicates),
    GovernedCatalogTarget: S.optional(GovernedCatalogTarget),
    GovernedCatalogSource: S.optional(GovernedCatalogSource),
    MicrosoftSQLServerCatalogSource: S.optional(
      MicrosoftSQLServerCatalogSource,
    ),
    MySQLCatalogSource: S.optional(MySQLCatalogSource),
    OracleSQLCatalogSource: S.optional(OracleSQLCatalogSource),
    PostgreSQLCatalogSource: S.optional(PostgreSQLCatalogSource),
    MicrosoftSQLServerCatalogTarget: S.optional(
      MicrosoftSQLServerCatalogTarget,
    ),
    MySQLCatalogTarget: S.optional(MySQLCatalogTarget),
    OracleSQLCatalogTarget: S.optional(OracleSQLCatalogTarget),
    PostgreSQLCatalogTarget: S.optional(PostgreSQLCatalogTarget),
    Route: S.optional(Route),
    DynamicTransform: S.optional(DynamicTransform),
    EvaluateDataQuality: S.optional(EvaluateDataQuality),
    S3CatalogHudiSource: S.optional(S3CatalogHudiSource),
    CatalogHudiSource: S.optional(CatalogHudiSource),
    S3HudiSource: S.optional(S3HudiSource),
    S3HudiCatalogTarget: S.optional(S3HudiCatalogTarget),
    S3HudiDirectTarget: S.optional(S3HudiDirectTarget),
    DirectJDBCSource: S.optional(DirectJDBCSource),
    S3CatalogDeltaSource: S.optional(S3CatalogDeltaSource),
    CatalogDeltaSource: S.optional(CatalogDeltaSource),
    S3DeltaSource: S.optional(S3DeltaSource),
    S3DeltaCatalogTarget: S.optional(S3DeltaCatalogTarget),
    S3DeltaDirectTarget: S.optional(S3DeltaDirectTarget),
    AmazonRedshiftSource: S.optional(AmazonRedshiftSource),
    AmazonRedshiftTarget: S.optional(AmazonRedshiftTarget),
    EvaluateDataQualityMultiFrame: S.optional(EvaluateDataQualityMultiFrame),
    Recipe: S.optional(Recipe),
    SnowflakeSource: S.optional(SnowflakeSource),
    SnowflakeTarget: S.optional(SnowflakeTarget),
    ConnectorDataSource: S.optional(ConnectorDataSource),
    ConnectorDataTarget: S.optional(ConnectorDataTarget),
    S3CatalogIcebergSource: S.optional(S3CatalogIcebergSource),
    CatalogIcebergSource: S.optional(CatalogIcebergSource),
    S3IcebergCatalogTarget: S.optional(S3IcebergCatalogTarget),
    S3IcebergDirectTarget: S.optional(S3IcebergDirectTarget),
    S3ExcelSource: S.optional(S3ExcelSource),
    S3HyperDirectTarget: S.optional(S3HyperDirectTarget),
    DynamoDBELTConnectorSource: S.optional(DynamoDBELTConnectorSource),
  }),
).annotate({
  identifier: "CodeGenConfigurationNode",
}) as any as S.Schema<CodeGenConfigurationNode>;
export type CodeGenConfigurationNodes = {
  [key: string]: CodeGenConfigurationNode | undefined;
};
export const CodeGenConfigurationNodes = /*@__PURE__*/ S.Record(
  S.String,
  CodeGenConfigurationNode.pipe(S.optional),
);
export type ExecutionClass = "FLEX" | "STANDARD" | (string & {});
export const ExecutionClass = /*@__PURE__*/ S.String;

export type SourceControlProvider =
  | "GITHUB"
  | "GITLAB"
  | "BITBUCKET"
  | "AWS_CODE_COMMIT"
  | (string & {});
export const SourceControlProvider = /*@__PURE__*/ S.String;

export type SourceControlAuthStrategy =
  | "PERSONAL_ACCESS_TOKEN"
  | "AWS_SECRETS_MANAGER"
  | (string & {});
export const SourceControlAuthStrategy = /*@__PURE__*/ S.String;

export interface SourceControlDetails {
  Provider?: SourceControlProvider;
  Repository?: string;
  Owner?: string;
  Branch?: string;
  Folder?: string;
  LastCommitId?: string;
  AuthStrategy?: SourceControlAuthStrategy;
  AuthToken?: string;
}
export const SourceControlDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Provider: S.optional(SourceControlProvider),
    Repository: S.optional(S.String),
    Owner: S.optional(S.String),
    Branch: S.optional(S.String),
    Folder: S.optional(S.String),
    LastCommitId: S.optional(S.String),
    AuthStrategy: S.optional(SourceControlAuthStrategy),
    AuthToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceControlDetails",
}) as any as S.Schema<SourceControlDetails>;
export type MaintenanceWindow = string;
export interface Job {
  Name?: string;
  JobMode?: JobMode;
  JobRunQueuingEnabled?: boolean;
  Description?: string;
  LogUri?: string;
  Role?: string;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  ExecutionProperty?: ExecutionProperty;
  Command?: JobCommand;
  DefaultArguments?: { [key: string]: string | undefined };
  NonOverridableArguments?: { [key: string]: string | undefined };
  Connections?: ConnectionsList;
  MaxRetries?: number;
  AllocatedCapacity?: number;
  Timeout?: number;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  SecurityConfiguration?: string;
  NotificationProperty?: NotificationProperty;
  GlueVersion?: string;
  CodeGenConfigurationNodes?: {
    [key: string]: CodeGenConfigurationNode | undefined;
  };
  ExecutionClass?: ExecutionClass;
  SourceControlDetails?: SourceControlDetails;
  MaintenanceWindow?: string;
  ProfileName?: string;
}
export const Job = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    JobMode: S.optional(JobMode),
    JobRunQueuingEnabled: S.optional(S.Boolean),
    Description: S.optional(S.String),
    LogUri: S.optional(S.String),
    Role: S.optional(S.String),
    CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExecutionProperty: S.optional(ExecutionProperty),
    Command: S.optional(JobCommand),
    DefaultArguments: S.optional(GenericMap),
    NonOverridableArguments: S.optional(GenericMap),
    Connections: S.optional(ConnectionsList),
    MaxRetries: S.optional(S.Number),
    AllocatedCapacity: S.optional(S.Number),
    Timeout: S.optional(S.Number),
    MaxCapacity: S.optional(S.Number),
    WorkerType: S.optional(WorkerType),
    NumberOfWorkers: S.optional(S.Number),
    SecurityConfiguration: S.optional(S.String),
    NotificationProperty: S.optional(NotificationProperty),
    GlueVersion: S.optional(S.String),
    CodeGenConfigurationNodes: S.optional(CodeGenConfigurationNodes),
    ExecutionClass: S.optional(ExecutionClass),
    SourceControlDetails: S.optional(SourceControlDetails),
    MaintenanceWindow: S.optional(S.String),
    ProfileName: S.optional(S.String),
  }),
).annotate({ identifier: "Job" }) as any as S.Schema<Job>;
export type JobList = Job[];
export const JobList = /*@__PURE__*/ S.Array(Job);
export interface BatchGetJobsResponse {
  Jobs?: Job[];
  JobsNotFound?: string[];
}
export const BatchGetJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Jobs: S.optional(JobList),
    JobsNotFound: S.optional(JobNameList),
  }),
).annotate({
  identifier: "BatchGetJobsResponse",
}) as any as S.Schema<BatchGetJobsResponse>;
export type BatchGetPartitionValueList = PartitionValueList[];
export const BatchGetPartitionValueList =
  /*@__PURE__*/ S.Array(PartitionValueList);
export type AuditContextString = string;
export type ColumnNameString = string;
export type AuditColumnNamesList = string[];
export const AuditColumnNamesList = /*@__PURE__*/ S.Array(S.String);
export interface AuditContext {
  AdditionalAuditContext?: string;
  RequestedColumns?: string[];
  AllColumnsRequested?: boolean;
}
export const AuditContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdditionalAuditContext: S.optional(S.String),
    RequestedColumns: S.optional(AuditColumnNamesList),
    AllColumnsRequested: S.optional(S.Boolean),
  }),
).annotate({ identifier: "AuditContext" }) as any as S.Schema<AuditContext>;
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
export interface BatchGetPartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionsToGet: PartitionValueList[];
  AuditContext?: AuditContext;
  QuerySessionContext?: QuerySessionContext;
}
export const BatchGetPartitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    PartitionsToGet: BatchGetPartitionValueList,
    AuditContext: S.optional(AuditContext),
    QuerySessionContext: S.optional(QuerySessionContext),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetPartitionRequest",
}) as any as S.Schema<BatchGetPartitionRequest>;
export interface Partition {
  Values?: string[];
  DatabaseName?: string;
  TableName?: string;
  CreationTime?: Date;
  LastAccessTime?: Date;
  StorageDescriptor?: StorageDescriptor;
  Parameters?: { [key: string]: string | undefined };
  LastAnalyzedTime?: Date;
  CatalogId?: string;
}
export const Partition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Values: S.optional(ValueStringList),
    DatabaseName: S.optional(S.String),
    TableName: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastAccessTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StorageDescriptor: S.optional(StorageDescriptor),
    Parameters: S.optional(ParametersMap),
    LastAnalyzedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CatalogId: S.optional(S.String),
  }),
).annotate({ identifier: "Partition" }) as any as S.Schema<Partition>;
export type PartitionList = Partition[];
export const PartitionList = /*@__PURE__*/ S.Array(Partition);
export interface BatchGetPartitionResponse {
  Partitions?: Partition[];
  UnprocessedKeys?: PartitionValueList[];
}
export const BatchGetPartitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Partitions: S.optional(PartitionList),
    UnprocessedKeys: S.optional(BatchGetPartitionValueList),
  }),
).annotate({
  identifier: "BatchGetPartitionResponse",
}) as any as S.Schema<BatchGetPartitionResponse>;
export type DatabaseNameString = string;
export type TableNameString = string;
export type TableOptimizerType =
  | "compaction"
  | "retention"
  | "orphan_file_deletion"
  | (string & {});
export const TableOptimizerType = /*@__PURE__*/ S.String;

export interface BatchGetTableOptimizerEntry {
  catalogId?: string;
  databaseName?: string;
  tableName?: string;
  type?: TableOptimizerType;
}
export const BatchGetTableOptimizerEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    catalogId: S.optional(S.String),
    databaseName: S.optional(S.String),
    tableName: S.optional(S.String),
    type: S.optional(TableOptimizerType),
  }),
).annotate({
  identifier: "BatchGetTableOptimizerEntry",
}) as any as S.Schema<BatchGetTableOptimizerEntry>;
export type BatchGetTableOptimizerEntries = BatchGetTableOptimizerEntry[];
export const BatchGetTableOptimizerEntries = /*@__PURE__*/ S.Array(
  BatchGetTableOptimizerEntry,
);
export interface BatchGetTableOptimizerRequest {
  Entries: BatchGetTableOptimizerEntry[];
}
export const BatchGetTableOptimizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Entries: BatchGetTableOptimizerEntries }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetTableOptimizerRequest",
}) as any as S.Schema<BatchGetTableOptimizerRequest>;
export type ArnString = string;
export type GlueConnectionNameString = string;
export type TableOptimizerVpcConfiguration = { glueConnectionName: string };
export const TableOptimizerVpcConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ glueConnectionName: S.String }),
]);
export type CompactionStrategy = "binpack" | "sort" | "z-order" | (string & {});
export const CompactionStrategy = /*@__PURE__*/ S.String;

export interface IcebergCompactionConfiguration {
  strategy?: CompactionStrategy;
  minInputFiles?: number;
  deleteFileThreshold?: number;
}
export const IcebergCompactionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    strategy: S.optional(CompactionStrategy),
    minInputFiles: S.optional(S.Number),
    deleteFileThreshold: S.optional(S.Number),
  }),
).annotate({
  identifier: "IcebergCompactionConfiguration",
}) as any as S.Schema<IcebergCompactionConfiguration>;
export interface CompactionConfiguration {
  icebergConfiguration?: IcebergCompactionConfiguration;
}
export const CompactionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    icebergConfiguration: S.optional(IcebergCompactionConfiguration),
  }),
).annotate({
  identifier: "CompactionConfiguration",
}) as any as S.Schema<CompactionConfiguration>;
export interface IcebergRetentionConfiguration {
  snapshotRetentionPeriodInDays?: number;
  numberOfSnapshotsToRetain?: number;
  cleanExpiredFiles?: boolean;
  runRateInHours?: number;
}
export const IcebergRetentionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    snapshotRetentionPeriodInDays: S.optional(S.Number),
    numberOfSnapshotsToRetain: S.optional(S.Number),
    cleanExpiredFiles: S.optional(S.Boolean),
    runRateInHours: S.optional(S.Number),
  }),
).annotate({
  identifier: "IcebergRetentionConfiguration",
}) as any as S.Schema<IcebergRetentionConfiguration>;
export interface RetentionConfiguration {
  icebergConfiguration?: IcebergRetentionConfiguration;
}
export const RetentionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ icebergConfiguration: S.optional(IcebergRetentionConfiguration) }),
).annotate({
  identifier: "RetentionConfiguration",
}) as any as S.Schema<RetentionConfiguration>;
export type MessageString = string;
export interface IcebergOrphanFileDeletionConfiguration {
  orphanFileRetentionPeriodInDays?: number;
  location?: string;
  runRateInHours?: number;
}
export const IcebergOrphanFileDeletionConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      orphanFileRetentionPeriodInDays: S.optional(S.Number),
      location: S.optional(S.String),
      runRateInHours: S.optional(S.Number),
    }),
).annotate({
  identifier: "IcebergOrphanFileDeletionConfiguration",
}) as any as S.Schema<IcebergOrphanFileDeletionConfiguration>;
export interface OrphanFileDeletionConfiguration {
  icebergConfiguration?: IcebergOrphanFileDeletionConfiguration;
}
export const OrphanFileDeletionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    icebergConfiguration: S.optional(IcebergOrphanFileDeletionConfiguration),
  }),
).annotate({
  identifier: "OrphanFileDeletionConfiguration",
}) as any as S.Schema<OrphanFileDeletionConfiguration>;
export interface TableOptimizerConfiguration {
  roleArn?: string;
  enabled?: boolean;
  vpcConfiguration?: TableOptimizerVpcConfiguration;
  compactionConfiguration?: CompactionConfiguration;
  retentionConfiguration?: RetentionConfiguration;
  orphanFileDeletionConfiguration?: OrphanFileDeletionConfiguration;
}
export const TableOptimizerConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    roleArn: S.optional(S.String),
    enabled: S.optional(S.Boolean),
    vpcConfiguration: S.optional(TableOptimizerVpcConfiguration),
    compactionConfiguration: S.optional(CompactionConfiguration),
    retentionConfiguration: S.optional(RetentionConfiguration),
    orphanFileDeletionConfiguration: S.optional(
      OrphanFileDeletionConfiguration,
    ),
  }),
).annotate({
  identifier: "TableOptimizerConfiguration",
}) as any as S.Schema<TableOptimizerConfiguration>;
export type TableOptimizerEventType =
  | "starting"
  | "completed"
  | "failed"
  | "in_progress"
  | (string & {});
export const TableOptimizerEventType = /*@__PURE__*/ S.String;

export type TableOptimizerRunTimestamp = Date;
export interface RunMetrics {
  NumberOfBytesCompacted?: string;
  NumberOfFilesCompacted?: string;
  NumberOfDpus?: string;
  JobDurationInHour?: string;
}
export const RunMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumberOfBytesCompacted: S.optional(S.String),
    NumberOfFilesCompacted: S.optional(S.String),
    NumberOfDpus: S.optional(S.String),
    JobDurationInHour: S.optional(S.String),
  }),
).annotate({ identifier: "RunMetrics" }) as any as S.Schema<RunMetrics>;
export type MetricCounts = number;
export type DpuHours = number;
export type DpuCounts = number;
export type DpuDurationInHour = number;
export interface IcebergCompactionMetrics {
  NumberOfBytesCompacted?: number;
  NumberOfFilesCompacted?: number;
  DpuHours?: number;
  NumberOfDpus?: number;
  JobDurationInHour?: number;
}
export const IcebergCompactionMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumberOfBytesCompacted: S.optional(S.Number),
    NumberOfFilesCompacted: S.optional(S.Number),
    DpuHours: S.optional(S.Number),
    NumberOfDpus: S.optional(S.Number),
    JobDurationInHour: S.optional(S.Number),
  }),
).annotate({
  identifier: "IcebergCompactionMetrics",
}) as any as S.Schema<IcebergCompactionMetrics>;
export interface CompactionMetrics {
  IcebergMetrics?: IcebergCompactionMetrics;
}
export const CompactionMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IcebergMetrics: S.optional(IcebergCompactionMetrics) }),
).annotate({
  identifier: "CompactionMetrics",
}) as any as S.Schema<CompactionMetrics>;
export interface IcebergRetentionMetrics {
  NumberOfDataFilesDeleted?: number;
  NumberOfManifestFilesDeleted?: number;
  NumberOfManifestListsDeleted?: number;
  DpuHours?: number;
  NumberOfDpus?: number;
  JobDurationInHour?: number;
}
export const IcebergRetentionMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumberOfDataFilesDeleted: S.optional(S.Number),
    NumberOfManifestFilesDeleted: S.optional(S.Number),
    NumberOfManifestListsDeleted: S.optional(S.Number),
    DpuHours: S.optional(S.Number),
    NumberOfDpus: S.optional(S.Number),
    JobDurationInHour: S.optional(S.Number),
  }),
).annotate({
  identifier: "IcebergRetentionMetrics",
}) as any as S.Schema<IcebergRetentionMetrics>;
export interface RetentionMetrics {
  IcebergMetrics?: IcebergRetentionMetrics;
}
export const RetentionMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IcebergMetrics: S.optional(IcebergRetentionMetrics) }),
).annotate({
  identifier: "RetentionMetrics",
}) as any as S.Schema<RetentionMetrics>;
export interface IcebergOrphanFileDeletionMetrics {
  NumberOfOrphanFilesDeleted?: number;
  DpuHours?: number;
  NumberOfDpus?: number;
  JobDurationInHour?: number;
}
export const IcebergOrphanFileDeletionMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumberOfOrphanFilesDeleted: S.optional(S.Number),
    DpuHours: S.optional(S.Number),
    NumberOfDpus: S.optional(S.Number),
    JobDurationInHour: S.optional(S.Number),
  }),
).annotate({
  identifier: "IcebergOrphanFileDeletionMetrics",
}) as any as S.Schema<IcebergOrphanFileDeletionMetrics>;
export interface OrphanFileDeletionMetrics {
  IcebergMetrics?: IcebergOrphanFileDeletionMetrics;
}
export const OrphanFileDeletionMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IcebergMetrics: S.optional(IcebergOrphanFileDeletionMetrics) }),
).annotate({
  identifier: "OrphanFileDeletionMetrics",
}) as any as S.Schema<OrphanFileDeletionMetrics>;
export interface TableOptimizerRun {
  eventType?: TableOptimizerEventType;
  startTimestamp?: Date;
  endTimestamp?: Date;
  metrics?: RunMetrics;
  error?: string;
  compactionMetrics?: CompactionMetrics;
  compactionStrategy?: CompactionStrategy;
  retentionMetrics?: RetentionMetrics;
  orphanFileDeletionMetrics?: OrphanFileDeletionMetrics;
}
export const TableOptimizerRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventType: S.optional(TableOptimizerEventType),
    startTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    metrics: S.optional(RunMetrics),
    error: S.optional(S.String),
    compactionMetrics: S.optional(CompactionMetrics),
    compactionStrategy: S.optional(CompactionStrategy),
    retentionMetrics: S.optional(RetentionMetrics),
    orphanFileDeletionMetrics: S.optional(OrphanFileDeletionMetrics),
  }),
).annotate({
  identifier: "TableOptimizerRun",
}) as any as S.Schema<TableOptimizerRun>;
export type ConfigurationSource = "catalog" | "table" | (string & {});
export const ConfigurationSource = /*@__PURE__*/ S.String;

export interface TableOptimizer {
  type?: TableOptimizerType;
  configuration?: TableOptimizerConfiguration;
  lastRun?: TableOptimizerRun;
  configurationSource?: ConfigurationSource;
}
export const TableOptimizer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(TableOptimizerType),
    configuration: S.optional(TableOptimizerConfiguration),
    lastRun: S.optional(TableOptimizerRun),
    configurationSource: S.optional(ConfigurationSource),
  }),
).annotate({ identifier: "TableOptimizer" }) as any as S.Schema<TableOptimizer>;
export interface BatchTableOptimizer {
  catalogId?: string;
  databaseName?: string;
  tableName?: string;
  tableOptimizer?: TableOptimizer;
}
export const BatchTableOptimizer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    catalogId: S.optional(S.String),
    databaseName: S.optional(S.String),
    tableName: S.optional(S.String),
    tableOptimizer: S.optional(TableOptimizer),
  }),
).annotate({
  identifier: "BatchTableOptimizer",
}) as any as S.Schema<BatchTableOptimizer>;
export type BatchTableOptimizers = BatchTableOptimizer[];
export const BatchTableOptimizers = /*@__PURE__*/ S.Array(BatchTableOptimizer);
export interface BatchGetTableOptimizerError_ {
  error?: ErrorDetail;
  catalogId?: string;
  databaseName?: string;
  tableName?: string;
  type?: TableOptimizerType;
}
export const BatchGetTableOptimizerError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    error: S.optional(ErrorDetail),
    catalogId: S.optional(S.String),
    databaseName: S.optional(S.String),
    tableName: S.optional(S.String),
    type: S.optional(TableOptimizerType),
  }),
).annotate({
  identifier: "BatchGetTableOptimizerError",
}) as any as S.Schema<BatchGetTableOptimizerError_>;
export type BatchGetTableOptimizerErrors = BatchGetTableOptimizerError_[];
export const BatchGetTableOptimizerErrors = /*@__PURE__*/ S.Array(
  BatchGetTableOptimizerError_,
);
export interface BatchGetTableOptimizerResponse {
  TableOptimizers?: BatchTableOptimizer[];
  Failures?: BatchGetTableOptimizerError_[];
}
export const BatchGetTableOptimizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableOptimizers: S.optional(BatchTableOptimizers),
    Failures: S.optional(BatchGetTableOptimizerErrors),
  }),
).annotate({
  identifier: "BatchGetTableOptimizerResponse",
}) as any as S.Schema<BatchGetTableOptimizerResponse>;
export type TriggerNameList = string[];
export const TriggerNameList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetTriggersRequest {
  TriggerNames: string[];
}
export const BatchGetTriggersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TriggerNames: TriggerNameList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetTriggersRequest",
}) as any as S.Schema<BatchGetTriggersRequest>;
export type IdString = string;
export type TriggerType =
  | "SCHEDULED"
  | "CONDITIONAL"
  | "ON_DEMAND"
  | "EVENT"
  | (string & {});
export const TriggerType = /*@__PURE__*/ S.String;

export type TriggerState =
  | "CREATING"
  | "CREATED"
  | "ACTIVATING"
  | "ACTIVATED"
  | "DEACTIVATING"
  | "DEACTIVATED"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export const TriggerState = /*@__PURE__*/ S.String;

export interface Action {
  JobName?: string;
  Arguments?: { [key: string]: string | undefined };
  Timeout?: number;
  SecurityConfiguration?: string;
  NotificationProperty?: NotificationProperty;
  CrawlerName?: string;
}
export const Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    Arguments: S.optional(GenericMap),
    Timeout: S.optional(S.Number),
    SecurityConfiguration: S.optional(S.String),
    NotificationProperty: S.optional(NotificationProperty),
    CrawlerName: S.optional(S.String),
  }),
).annotate({ identifier: "Action" }) as any as S.Schema<Action>;
export type ActionList = Action[];
export const ActionList = /*@__PURE__*/ S.Array(Action);
export type Logical = "AND" | "ANY" | (string & {});
export const Logical = /*@__PURE__*/ S.String;

export type LogicalOperator = "EQUALS" | (string & {});
export const LogicalOperator = /*@__PURE__*/ S.String;

export type JobRunState =
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMEOUT"
  | "ERROR"
  | "WAITING"
  | "EXPIRED"
  | (string & {});
export const JobRunState = /*@__PURE__*/ S.String;

export type CrawlState =
  | "RUNNING"
  | "CANCELLING"
  | "CANCELLED"
  | "SUCCEEDED"
  | "FAILED"
  | "ERROR"
  | (string & {});
export const CrawlState = /*@__PURE__*/ S.String;

export interface Condition {
  LogicalOperator?: LogicalOperator;
  JobName?: string;
  State?: JobRunState;
  CrawlerName?: string;
  CrawlState?: CrawlState;
}
export const Condition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogicalOperator: S.optional(LogicalOperator),
    JobName: S.optional(S.String),
    State: S.optional(JobRunState),
    CrawlerName: S.optional(S.String),
    CrawlState: S.optional(CrawlState),
  }),
).annotate({ identifier: "Condition" }) as any as S.Schema<Condition>;
export type ConditionList = Condition[];
export const ConditionList = /*@__PURE__*/ S.Array(Condition);
export interface Predicate {
  Logical?: Logical;
  Conditions?: Condition[];
}
export const Predicate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Logical: S.optional(Logical),
    Conditions: S.optional(ConditionList),
  }),
).annotate({ identifier: "Predicate" }) as any as S.Schema<Predicate>;
export type BatchSize = number;
export type BatchWindow = number;
export interface EventBatchingCondition {
  BatchSize: number;
  BatchWindow?: number;
}
export const EventBatchingCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BatchSize: S.Number, BatchWindow: S.optional(S.Number) }),
).annotate({
  identifier: "EventBatchingCondition",
}) as any as S.Schema<EventBatchingCondition>;
export interface Trigger {
  Name?: string;
  WorkflowName?: string;
  Id?: string;
  Type?: TriggerType;
  State?: TriggerState;
  Description?: string;
  Schedule?: string;
  Actions?: Action[];
  Predicate?: Predicate;
  EventBatchingCondition?: EventBatchingCondition;
}
export const Trigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    WorkflowName: S.optional(S.String),
    Id: S.optional(S.String),
    Type: S.optional(TriggerType),
    State: S.optional(TriggerState),
    Description: S.optional(S.String),
    Schedule: S.optional(S.String),
    Actions: S.optional(ActionList),
    Predicate: S.optional(Predicate),
    EventBatchingCondition: S.optional(EventBatchingCondition),
  }),
).annotate({ identifier: "Trigger" }) as any as S.Schema<Trigger>;
export type TriggerList = Trigger[];
export const TriggerList = /*@__PURE__*/ S.Array(Trigger);
export interface BatchGetTriggersResponse {
  Triggers?: Trigger[];
  TriggersNotFound?: string[];
}
export const BatchGetTriggersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Triggers: S.optional(TriggerList),
    TriggersNotFound: S.optional(TriggerNameList),
  }),
).annotate({
  identifier: "BatchGetTriggersResponse",
}) as any as S.Schema<BatchGetTriggersResponse>;
export type WorkflowNames = string[];
export const WorkflowNames = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetWorkflowsRequest {
  Names: string[];
  IncludeGraph?: boolean;
}
export const BatchGetWorkflowsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Names: WorkflowNames, IncludeGraph: S.optional(S.Boolean) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetWorkflowsRequest",
}) as any as S.Schema<BatchGetWorkflowsRequest>;
export type WorkflowRunProperties = { [key: string]: string | undefined };
export const WorkflowRunProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type WorkflowRunStatus =
  | "RUNNING"
  | "COMPLETED"
  | "STOPPING"
  | "STOPPED"
  | "ERROR"
  | (string & {});
export const WorkflowRunStatus = /*@__PURE__*/ S.String;

export interface WorkflowRunStatistics {
  TotalActions?: number;
  TimeoutActions?: number;
  FailedActions?: number;
  StoppedActions?: number;
  SucceededActions?: number;
  RunningActions?: number;
  ErroredActions?: number;
  WaitingActions?: number;
}
export const WorkflowRunStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalActions: S.optional(S.Number),
    TimeoutActions: S.optional(S.Number),
    FailedActions: S.optional(S.Number),
    StoppedActions: S.optional(S.Number),
    SucceededActions: S.optional(S.Number),
    RunningActions: S.optional(S.Number),
    ErroredActions: S.optional(S.Number),
    WaitingActions: S.optional(S.Number),
  }),
).annotate({
  identifier: "WorkflowRunStatistics",
}) as any as S.Schema<WorkflowRunStatistics>;
export type NodeType = "CRAWLER" | "JOB" | "TRIGGER" | (string & {});
export const NodeType = /*@__PURE__*/ S.String;

export interface TriggerNodeDetails {
  Trigger?: Trigger;
}
export const TriggerNodeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Trigger: S.optional(Trigger) }),
).annotate({
  identifier: "TriggerNodeDetails",
}) as any as S.Schema<TriggerNodeDetails>;
export type AttemptCount = number;
export interface Predecessor {
  JobName?: string;
  RunId?: string;
}
export const Predecessor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobName: S.optional(S.String), RunId: S.optional(S.String) }),
).annotate({ identifier: "Predecessor" }) as any as S.Schema<Predecessor>;
export type PredecessorList = Predecessor[];
export const PredecessorList = /*@__PURE__*/ S.Array(Predecessor);
export type ExecutionTime = number;
export type OrchestrationMessageString = string;
export type OrchestrationPolicyJsonString = string;
export interface JobRun {
  Id?: string;
  Attempt?: number;
  PreviousRunId?: string;
  TriggerName?: string;
  JobName?: string;
  JobMode?: JobMode;
  JobRunQueuingEnabled?: boolean;
  StartedOn?: Date;
  LastModifiedOn?: Date;
  CompletedOn?: Date;
  JobRunState?: JobRunState;
  Arguments?: { [key: string]: string | undefined };
  ErrorMessage?: string;
  PredecessorRuns?: Predecessor[];
  AllocatedCapacity?: number;
  ExecutionTime?: number;
  Timeout?: number;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  SecurityConfiguration?: string;
  LogGroupName?: string;
  NotificationProperty?: NotificationProperty;
  GlueVersion?: string;
  DPUSeconds?: number;
  ExecutionClass?: ExecutionClass;
  MaintenanceWindow?: string;
  ProfileName?: string;
  StateDetail?: string;
  ExecutionRoleSessionPolicy?: string;
}
export const JobRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Attempt: S.optional(S.Number),
    PreviousRunId: S.optional(S.String),
    TriggerName: S.optional(S.String),
    JobName: S.optional(S.String),
    JobMode: S.optional(JobMode),
    JobRunQueuingEnabled: S.optional(S.Boolean),
    StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    JobRunState: S.optional(JobRunState),
    Arguments: S.optional(GenericMap),
    ErrorMessage: S.optional(S.String),
    PredecessorRuns: S.optional(PredecessorList),
    AllocatedCapacity: S.optional(S.Number),
    ExecutionTime: S.optional(S.Number),
    Timeout: S.optional(S.Number),
    MaxCapacity: S.optional(S.Number),
    WorkerType: S.optional(WorkerType),
    NumberOfWorkers: S.optional(S.Number),
    SecurityConfiguration: S.optional(S.String),
    LogGroupName: S.optional(S.String),
    NotificationProperty: S.optional(NotificationProperty),
    GlueVersion: S.optional(S.String),
    DPUSeconds: S.optional(S.Number),
    ExecutionClass: S.optional(ExecutionClass),
    MaintenanceWindow: S.optional(S.String),
    ProfileName: S.optional(S.String),
    StateDetail: S.optional(S.String),
    ExecutionRoleSessionPolicy: S.optional(S.String),
  }),
).annotate({ identifier: "JobRun" }) as any as S.Schema<JobRun>;
export type JobRunList = JobRun[];
export const JobRunList = /*@__PURE__*/ S.Array(JobRun);
export interface JobNodeDetails {
  JobRuns?: JobRun[];
}
export const JobNodeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobRuns: S.optional(JobRunList) }),
).annotate({ identifier: "JobNodeDetails" }) as any as S.Schema<JobNodeDetails>;
export interface Crawl {
  State?: CrawlState;
  StartedOn?: Date;
  CompletedOn?: Date;
  ErrorMessage?: string;
  LogGroup?: string;
  LogStream?: string;
}
export const Crawl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(CrawlState),
    StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ErrorMessage: S.optional(S.String),
    LogGroup: S.optional(S.String),
    LogStream: S.optional(S.String),
  }),
).annotate({ identifier: "Crawl" }) as any as S.Schema<Crawl>;
export type CrawlList = Crawl[];
export const CrawlList = /*@__PURE__*/ S.Array(Crawl);
export interface CrawlerNodeDetails {
  Crawls?: Crawl[];
}
export const CrawlerNodeDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Crawls: S.optional(CrawlList) }),
).annotate({
  identifier: "CrawlerNodeDetails",
}) as any as S.Schema<CrawlerNodeDetails>;
export interface Node {
  Type?: NodeType;
  Name?: string;
  UniqueId?: string;
  TriggerDetails?: TriggerNodeDetails;
  JobDetails?: JobNodeDetails;
  CrawlerDetails?: CrawlerNodeDetails;
}
export const Node = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(NodeType),
    Name: S.optional(S.String),
    UniqueId: S.optional(S.String),
    TriggerDetails: S.optional(TriggerNodeDetails),
    JobDetails: S.optional(JobNodeDetails),
    CrawlerDetails: S.optional(CrawlerNodeDetails),
  }),
).annotate({ identifier: "Node" }) as any as S.Schema<Node>;
export type NodeList = Node[];
export const NodeList = /*@__PURE__*/ S.Array(Node);
export interface Edge {
  SourceId?: string;
  DestinationId?: string;
}
export const Edge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceId: S.optional(S.String),
    DestinationId: S.optional(S.String),
  }),
).annotate({ identifier: "Edge" }) as any as S.Schema<Edge>;
export type EdgeList = Edge[];
export const EdgeList = /*@__PURE__*/ S.Array(Edge);
export interface WorkflowGraph {
  Nodes?: Node[];
  Edges?: Edge[];
}
export const WorkflowGraph = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Nodes: S.optional(NodeList), Edges: S.optional(EdgeList) }),
).annotate({ identifier: "WorkflowGraph" }) as any as S.Schema<WorkflowGraph>;
export interface StartingEventBatchCondition {
  BatchSize?: number;
  BatchWindow?: number;
}
export const StartingEventBatchCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BatchSize: S.optional(S.Number),
    BatchWindow: S.optional(S.Number),
  }),
).annotate({
  identifier: "StartingEventBatchCondition",
}) as any as S.Schema<StartingEventBatchCondition>;
export interface WorkflowRun {
  Name?: string;
  WorkflowRunId?: string;
  PreviousRunId?: string;
  WorkflowRunProperties?: { [key: string]: string | undefined };
  StartedOn?: Date;
  CompletedOn?: Date;
  Status?: WorkflowRunStatus;
  ErrorMessage?: string;
  Statistics?: WorkflowRunStatistics;
  Graph?: WorkflowGraph;
  StartingEventBatchCondition?: StartingEventBatchCondition;
}
export const WorkflowRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    WorkflowRunId: S.optional(S.String),
    PreviousRunId: S.optional(S.String),
    WorkflowRunProperties: S.optional(WorkflowRunProperties),
    StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(WorkflowRunStatus),
    ErrorMessage: S.optional(S.String),
    Statistics: S.optional(WorkflowRunStatistics),
    Graph: S.optional(WorkflowGraph),
    StartingEventBatchCondition: S.optional(StartingEventBatchCondition),
  }),
).annotate({ identifier: "WorkflowRun" }) as any as S.Schema<WorkflowRun>;
export interface BlueprintDetails {
  BlueprintName?: string;
  RunId?: string;
}
export const BlueprintDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlueprintName: S.optional(S.String),
    RunId: S.optional(S.String),
  }),
).annotate({
  identifier: "BlueprintDetails",
}) as any as S.Schema<BlueprintDetails>;
export interface Workflow {
  Name?: string;
  Description?: string;
  DefaultRunProperties?: { [key: string]: string | undefined };
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  LastRun?: WorkflowRun;
  Graph?: WorkflowGraph;
  MaxConcurrentRuns?: number;
  BlueprintDetails?: BlueprintDetails;
}
export const Workflow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    DefaultRunProperties: S.optional(WorkflowRunProperties),
    CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastRun: S.optional(WorkflowRun),
    Graph: S.optional(WorkflowGraph),
    MaxConcurrentRuns: S.optional(S.Number),
    BlueprintDetails: S.optional(BlueprintDetails),
  }),
).annotate({ identifier: "Workflow" }) as any as S.Schema<Workflow>;
export type Workflows = Workflow[];
export const Workflows = /*@__PURE__*/ S.Array(Workflow);
export interface BatchGetWorkflowsResponse {
  Workflows?: Workflow[];
  MissingWorkflows?: string[];
}
export const BatchGetWorkflowsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Workflows: S.optional(Workflows),
    MissingWorkflows: S.optional(WorkflowNames),
  }),
).annotate({
  identifier: "BatchGetWorkflowsResponse",
}) as any as S.Schema<BatchGetWorkflowsResponse>;
export type InclusionAnnotationValue = "INCLUDE" | "EXCLUDE" | (string & {});
export const InclusionAnnotationValue = /*@__PURE__*/ S.String;

export interface DatapointInclusionAnnotation {
  ProfileId?: string;
  StatisticId?: string;
  InclusionAnnotation?: InclusionAnnotationValue;
}
export const DatapointInclusionAnnotation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileId: S.optional(S.String),
    StatisticId: S.optional(S.String),
    InclusionAnnotation: S.optional(InclusionAnnotationValue),
  }),
).annotate({
  identifier: "DatapointInclusionAnnotation",
}) as any as S.Schema<DatapointInclusionAnnotation>;
export type InclusionAnnotationList = DatapointInclusionAnnotation[];
export const InclusionAnnotationList = /*@__PURE__*/ S.Array(
  DatapointInclusionAnnotation,
);
export interface BatchPutDataQualityStatisticAnnotationRequest {
  InclusionAnnotations: DatapointInclusionAnnotation[];
  ClientToken?: string;
}
export const BatchPutDataQualityStatisticAnnotationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InclusionAnnotations: InclusionAnnotationList,
      ClientToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "BatchPutDataQualityStatisticAnnotationRequest",
  }) as any as S.Schema<BatchPutDataQualityStatisticAnnotationRequest>;
export interface AnnotationError {
  ProfileId?: string;
  StatisticId?: string;
  FailureReason?: string;
}
export const AnnotationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileId: S.optional(S.String),
    StatisticId: S.optional(S.String),
    FailureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "AnnotationError",
}) as any as S.Schema<AnnotationError>;
export type AnnotationErrorList = AnnotationError[];
export const AnnotationErrorList = /*@__PURE__*/ S.Array(AnnotationError);
export interface BatchPutDataQualityStatisticAnnotationResponse {
  FailedInclusionAnnotations?: AnnotationError[];
}
export const BatchPutDataQualityStatisticAnnotationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ FailedInclusionAnnotations: S.optional(AnnotationErrorList) }),
  ).annotate({
    identifier: "BatchPutDataQualityStatisticAnnotationResponse",
  }) as any as S.Schema<BatchPutDataQualityStatisticAnnotationResponse>;
export type BatchStopJobRunJobRunIdList = string[];
export const BatchStopJobRunJobRunIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchStopJobRunRequest {
  JobName: string;
  JobRunIds: string[];
}
export const BatchStopJobRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobName: S.String, JobRunIds: BatchStopJobRunJobRunIdList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchStopJobRunRequest",
}) as any as S.Schema<BatchStopJobRunRequest>;
export interface BatchStopJobRunSuccessfulSubmission {
  JobName?: string;
  JobRunId?: string;
}
export const BatchStopJobRunSuccessfulSubmission = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobName: S.optional(S.String), JobRunId: S.optional(S.String) }),
).annotate({
  identifier: "BatchStopJobRunSuccessfulSubmission",
}) as any as S.Schema<BatchStopJobRunSuccessfulSubmission>;
export type BatchStopJobRunSuccessfulSubmissionList =
  BatchStopJobRunSuccessfulSubmission[];
export const BatchStopJobRunSuccessfulSubmissionList = /*@__PURE__*/ S.Array(
  BatchStopJobRunSuccessfulSubmission,
);
export interface BatchStopJobRunError_ {
  JobName?: string;
  JobRunId?: string;
  ErrorDetail?: ErrorDetail;
}
export const BatchStopJobRunError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    JobRunId: S.optional(S.String),
    ErrorDetail: S.optional(ErrorDetail),
  }),
).annotate({
  identifier: "BatchStopJobRunError",
}) as any as S.Schema<BatchStopJobRunError_>;
export type BatchStopJobRunErrorList = BatchStopJobRunError_[];
export const BatchStopJobRunErrorList = /*@__PURE__*/ S.Array(
  BatchStopJobRunError_,
);
export interface BatchStopJobRunResponse {
  SuccessfulSubmissions?: BatchStopJobRunSuccessfulSubmission[];
  Errors?: BatchStopJobRunError_[];
}
export const BatchStopJobRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SuccessfulSubmissions: S.optional(BatchStopJobRunSuccessfulSubmissionList),
    Errors: S.optional(BatchStopJobRunErrorList),
  }),
).annotate({
  identifier: "BatchStopJobRunResponse",
}) as any as S.Schema<BatchStopJobRunResponse>;
export type BoundedPartitionValueList = string[];
export const BoundedPartitionValueList = /*@__PURE__*/ S.Array(S.String);
export interface BatchUpdatePartitionRequestEntry {
  PartitionValueList: string[];
  PartitionInput: PartitionInput;
}
export const BatchUpdatePartitionRequestEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PartitionValueList: BoundedPartitionValueList,
    PartitionInput: PartitionInput,
  }),
).annotate({
  identifier: "BatchUpdatePartitionRequestEntry",
}) as any as S.Schema<BatchUpdatePartitionRequestEntry>;
export type BatchUpdatePartitionRequestEntryList =
  BatchUpdatePartitionRequestEntry[];
export const BatchUpdatePartitionRequestEntryList = /*@__PURE__*/ S.Array(
  BatchUpdatePartitionRequestEntry,
);
export interface BatchUpdatePartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  Entries: BatchUpdatePartitionRequestEntry[];
}
export const BatchUpdatePartitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    Entries: BatchUpdatePartitionRequestEntryList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchUpdatePartitionRequest",
}) as any as S.Schema<BatchUpdatePartitionRequest>;
export interface BatchUpdatePartitionFailureEntry {
  PartitionValueList?: string[];
  ErrorDetail?: ErrorDetail;
}
export const BatchUpdatePartitionFailureEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PartitionValueList: S.optional(BoundedPartitionValueList),
    ErrorDetail: S.optional(ErrorDetail),
  }),
).annotate({
  identifier: "BatchUpdatePartitionFailureEntry",
}) as any as S.Schema<BatchUpdatePartitionFailureEntry>;
export type BatchUpdatePartitionFailureList =
  BatchUpdatePartitionFailureEntry[];
export const BatchUpdatePartitionFailureList = /*@__PURE__*/ S.Array(
  BatchUpdatePartitionFailureEntry,
);
export interface BatchUpdatePartitionResponse {
  Errors?: BatchUpdatePartitionFailureEntry[];
}
export const BatchUpdatePartitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Errors: S.optional(BatchUpdatePartitionFailureList) }),
).annotate({
  identifier: "BatchUpdatePartitionResponse",
}) as any as S.Schema<BatchUpdatePartitionResponse>;
export interface CancelDataQualityRuleRecommendationRunRequest {
  RunId: string;
}
export const CancelDataQualityRuleRecommendationRunRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RunId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "CancelDataQualityRuleRecommendationRunRequest",
  }) as any as S.Schema<CancelDataQualityRuleRecommendationRunRequest>;
export interface CancelDataQualityRuleRecommendationRunResponse {}
export const CancelDataQualityRuleRecommendationRunResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "CancelDataQualityRuleRecommendationRunResponse",
  }) as any as S.Schema<CancelDataQualityRuleRecommendationRunResponse>;
export interface CancelDataQualityRulesetEvaluationRunRequest {
  RunId: string;
}
export const CancelDataQualityRulesetEvaluationRunRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RunId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "CancelDataQualityRulesetEvaluationRunRequest",
  }) as any as S.Schema<CancelDataQualityRulesetEvaluationRunRequest>;
export interface CancelDataQualityRulesetEvaluationRunResponse {}
export const CancelDataQualityRulesetEvaluationRunResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "CancelDataQualityRulesetEvaluationRunResponse",
  }) as any as S.Schema<CancelDataQualityRulesetEvaluationRunResponse>;
export interface CancelMLTaskRunRequest {
  TransformId: string;
  TaskRunId: string;
}
export const CancelMLTaskRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransformId: S.String, TaskRunId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelMLTaskRunRequest",
}) as any as S.Schema<CancelMLTaskRunRequest>;
export type TaskStatusType =
  | "STARTING"
  | "RUNNING"
  | "STOPPING"
  | "STOPPED"
  | "SUCCEEDED"
  | "FAILED"
  | "TIMEOUT"
  | (string & {});
export const TaskStatusType = /*@__PURE__*/ S.String;

export interface CancelMLTaskRunResponse {
  TransformId?: string;
  TaskRunId?: string;
  Status?: TaskStatusType;
}
export const CancelMLTaskRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransformId: S.optional(S.String),
    TaskRunId: S.optional(S.String),
    Status: S.optional(TaskStatusType),
  }),
).annotate({
  identifier: "CancelMLTaskRunResponse",
}) as any as S.Schema<CancelMLTaskRunResponse>;
export interface CancelStatementRequest {
  SessionId: string;
  Id: number;
  RequestOrigin?: string;
}
export const CancelStatementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.String,
    Id: S.Number,
    RequestOrigin: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelStatementRequest",
}) as any as S.Schema<CancelStatementRequest>;
export interface CancelStatementResponse {}
export const CancelStatementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelStatementResponse",
}) as any as S.Schema<CancelStatementResponse>;
export type DataFormat = "AVRO" | "JSON" | "PROTOBUF" | (string & {});
export const DataFormat = /*@__PURE__*/ S.String;

export type SchemaDefinitionString = string;
export interface CheckSchemaVersionValidityInput {
  DataFormat: DataFormat;
  SchemaDefinition: string;
}
export const CheckSchemaVersionValidityInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataFormat: DataFormat, SchemaDefinition: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CheckSchemaVersionValidityInput",
}) as any as S.Schema<CheckSchemaVersionValidityInput>;
export type IsVersionValid = boolean;
export type SchemaValidationError = string;
export interface CheckSchemaVersionValidityResponse {
  Valid?: boolean;
  Error?: string;
}
export const CheckSchemaVersionValidityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Valid: S.optional(S.Boolean), Error: S.optional(S.String) }),
).annotate({
  identifier: "CheckSchemaVersionValidityResponse",
}) as any as S.Schema<CheckSchemaVersionValidityResponse>;
export type OrchestrationS3Location = string;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export const TagsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateBlueprintRequest {
  Name: string;
  Description?: string;
  BlueprintLocation: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateBlueprintRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    BlueprintLocation: S.String,
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateBlueprintRequest",
}) as any as S.Schema<CreateBlueprintRequest>;
export interface CreateBlueprintResponse {
  Name?: string;
}
export const CreateBlueprintResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "CreateBlueprintResponse",
}) as any as S.Schema<CreateBlueprintResponse>;
export type CatalogNameString = string;
export type FederationIdentifier = string;
export interface FederatedCatalog {
  Identifier?: string;
  ConnectionName?: string;
  ConnectionType?: string;
}
export const FederatedCatalog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.optional(S.String),
    ConnectionName: S.optional(S.String),
    ConnectionType: S.optional(S.String),
  }),
).annotate({
  identifier: "FederatedCatalog",
}) as any as S.Schema<FederatedCatalog>;
export type ResourceArnString = string;
export interface TargetRedshiftCatalog {
  CatalogArn: string;
}
export const TargetRedshiftCatalog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogArn: S.String }),
).annotate({
  identifier: "TargetRedshiftCatalog",
}) as any as S.Schema<TargetRedshiftCatalog>;
export type IAMRoleArn = string;
export interface DataLakeAccessProperties {
  DataLakeAccess?: boolean;
  DataTransferRole?: string;
  KmsKey?: string;
  CatalogType?: string;
}
export const DataLakeAccessProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataLakeAccess: S.optional(S.Boolean),
    DataTransferRole: S.optional(S.String),
    KmsKey: S.optional(S.String),
    CatalogType: S.optional(S.String),
  }),
).annotate({
  identifier: "DataLakeAccessProperties",
}) as any as S.Schema<DataLakeAccessProperties>;
export interface IcebergOptimizationProperties {
  RoleArn?: string;
  Compaction?: { [key: string]: string | undefined };
  Retention?: { [key: string]: string | undefined };
  OrphanFileDeletion?: { [key: string]: string | undefined };
}
export const IcebergOptimizationProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoleArn: S.optional(S.String),
    Compaction: S.optional(ParametersMap),
    Retention: S.optional(ParametersMap),
    OrphanFileDeletion: S.optional(ParametersMap),
  }),
).annotate({
  identifier: "IcebergOptimizationProperties",
}) as any as S.Schema<IcebergOptimizationProperties>;
export interface CatalogProperties {
  DataLakeAccessProperties?: DataLakeAccessProperties;
  IcebergOptimizationProperties?: IcebergOptimizationProperties;
  CustomProperties?: { [key: string]: string | undefined };
}
export const CatalogProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataLakeAccessProperties: S.optional(DataLakeAccessProperties),
    IcebergOptimizationProperties: S.optional(IcebergOptimizationProperties),
    CustomProperties: S.optional(ParametersMap),
  }),
).annotate({
  identifier: "CatalogProperties",
}) as any as S.Schema<CatalogProperties>;
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
  | "CREATE_DATABASE"
  | "CREATE_TABLE"
  | "DATA_LOCATION_ACCESS"
  | (string & {});
export const Permission = /*@__PURE__*/ S.String;

export type PermissionList = Permission[];
export const PermissionList = /*@__PURE__*/ S.Array(Permission);
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
export type AllowFullTableExternalDataAccessEnum =
  | "True"
  | "False"
  | (string & {});
export const AllowFullTableExternalDataAccessEnum = /*@__PURE__*/ S.String;

export type OverwriteChildResourcePermissionsWithDefaultEnum =
  | "Accept"
  | "Deny"
  | (string & {});
export const OverwriteChildResourcePermissionsWithDefaultEnum =
  /*@__PURE__*/ S.String;

export interface CatalogInput {
  Description?: string;
  FederatedCatalog?: FederatedCatalog;
  Parameters?: { [key: string]: string | undefined };
  TargetRedshiftCatalog?: TargetRedshiftCatalog;
  CatalogProperties?: CatalogProperties;
  CreateTableDefaultPermissions?: PrincipalPermissions[];
  CreateDatabaseDefaultPermissions?: PrincipalPermissions[];
  AllowFullTableExternalDataAccess?: AllowFullTableExternalDataAccessEnum;
  OverwriteChildResourcePermissionsWithDefault?: OverwriteChildResourcePermissionsWithDefaultEnum;
}
export const CatalogInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    FederatedCatalog: S.optional(FederatedCatalog),
    Parameters: S.optional(ParametersMap),
    TargetRedshiftCatalog: S.optional(TargetRedshiftCatalog),
    CatalogProperties: S.optional(CatalogProperties),
    CreateTableDefaultPermissions: S.optional(PrincipalPermissionsList),
    CreateDatabaseDefaultPermissions: S.optional(PrincipalPermissionsList),
    AllowFullTableExternalDataAccess: S.optional(
      AllowFullTableExternalDataAccessEnum,
    ),
    OverwriteChildResourcePermissionsWithDefault: S.optional(
      OverwriteChildResourcePermissionsWithDefaultEnum,
    ),
  }),
).annotate({ identifier: "CatalogInput" }) as any as S.Schema<CatalogInput>;
export interface CreateCatalogRequest {
  Name: string;
  CatalogInput: CatalogInput;
  Tags?: { [key: string]: string | undefined };
}
export const CreateCatalogRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    CatalogInput: CatalogInput,
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateCatalogRequest",
}) as any as S.Schema<CreateCatalogRequest>;
export interface CreateCatalogResponse {}
export const CreateCatalogResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateCatalogResponse",
}) as any as S.Schema<CreateCatalogResponse>;
export type Classification = string;
export type GrokPattern = string;
export type CustomPatterns = string;
export interface CreateGrokClassifierRequest {
  Classification: string;
  Name: string;
  GrokPattern: string;
  CustomPatterns?: string;
}
export const CreateGrokClassifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Classification: S.String,
    Name: S.String,
    GrokPattern: S.String,
    CustomPatterns: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateGrokClassifierRequest",
}) as any as S.Schema<CreateGrokClassifierRequest>;
export type RowTag = string;
export interface CreateXMLClassifierRequest {
  Classification: string;
  Name: string;
  RowTag?: string;
}
export const CreateXMLClassifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Classification: S.String,
    Name: S.String,
    RowTag: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateXMLClassifierRequest",
}) as any as S.Schema<CreateXMLClassifierRequest>;
export type JsonPath = string;
export interface CreateJsonClassifierRequest {
  Name: string;
  JsonPath: string;
}
export const CreateJsonClassifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, JsonPath: S.String }),
).annotate({
  identifier: "CreateJsonClassifierRequest",
}) as any as S.Schema<CreateJsonClassifierRequest>;
export type CsvColumnDelimiter = string;
export type CsvQuoteSymbol = string;
export type CsvHeaderOption = "UNKNOWN" | "PRESENT" | "ABSENT" | (string & {});
export const CsvHeaderOption = /*@__PURE__*/ S.String;

export type CsvHeader = string[];
export const CsvHeader = /*@__PURE__*/ S.Array(S.String);
export type CustomDatatypes = string[];
export const CustomDatatypes = /*@__PURE__*/ S.Array(S.String);
export type CsvSerdeOption =
  | "OpenCSVSerDe"
  | "LazySimpleSerDe"
  | "None"
  | (string & {});
export const CsvSerdeOption = /*@__PURE__*/ S.String;

export interface CreateCsvClassifierRequest {
  Name: string;
  Delimiter?: string;
  QuoteSymbol?: string;
  ContainsHeader?: CsvHeaderOption;
  Header?: string[];
  DisableValueTrimming?: boolean;
  AllowSingleColumn?: boolean;
  CustomDatatypeConfigured?: boolean;
  CustomDatatypes?: string[];
  Serde?: CsvSerdeOption;
}
export const CreateCsvClassifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Delimiter: S.optional(S.String),
    QuoteSymbol: S.optional(S.String),
    ContainsHeader: S.optional(CsvHeaderOption),
    Header: S.optional(CsvHeader),
    DisableValueTrimming: S.optional(S.Boolean),
    AllowSingleColumn: S.optional(S.Boolean),
    CustomDatatypeConfigured: S.optional(S.Boolean),
    CustomDatatypes: S.optional(CustomDatatypes),
    Serde: S.optional(CsvSerdeOption),
  }),
).annotate({
  identifier: "CreateCsvClassifierRequest",
}) as any as S.Schema<CreateCsvClassifierRequest>;
export interface CreateClassifierRequest {
  GrokClassifier?: CreateGrokClassifierRequest;
  XMLClassifier?: CreateXMLClassifierRequest;
  JsonClassifier?: CreateJsonClassifierRequest;
  CsvClassifier?: CreateCsvClassifierRequest;
}
export const CreateClassifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GrokClassifier: S.optional(CreateGrokClassifierRequest),
    XMLClassifier: S.optional(CreateXMLClassifierRequest),
    JsonClassifier: S.optional(CreateJsonClassifierRequest),
    CsvClassifier: S.optional(CreateCsvClassifierRequest),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateClassifierRequest",
}) as any as S.Schema<CreateClassifierRequest>;
export interface CreateClassifierResponse {}
export const CreateClassifierResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateClassifierResponse",
}) as any as S.Schema<CreateClassifierResponse>;
export type ColumnNameList = string[];
export const ColumnNameList = /*@__PURE__*/ S.Array(S.String);
export type SampleSizePercentage = number;
export interface CreateColumnStatisticsTaskSettingsRequest {
  DatabaseName: string;
  TableName: string;
  Role: string;
  Schedule?: string;
  ColumnNameList?: string[];
  SampleSize?: number;
  CatalogID?: string;
  SecurityConfiguration?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateColumnStatisticsTaskSettingsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DatabaseName: S.String,
      TableName: S.String,
      Role: S.String,
      Schedule: S.optional(S.String),
      ColumnNameList: S.optional(ColumnNameList),
      SampleSize: S.optional(S.Number),
      CatalogID: S.optional(S.String),
      SecurityConfiguration: S.optional(S.String),
      Tags: S.optional(TagsMap),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "CreateColumnStatisticsTaskSettingsRequest",
  }) as any as S.Schema<CreateColumnStatisticsTaskSettingsRequest>;
export interface CreateColumnStatisticsTaskSettingsResponse {}
export const CreateColumnStatisticsTaskSettingsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "CreateColumnStatisticsTaskSettingsResponse",
  }) as any as S.Schema<CreateColumnStatisticsTaskSettingsResponse>;
export type ConnectionType =
  | "JDBC"
  | "SFTP"
  | "MONGODB"
  | "KAFKA"
  | "NETWORK"
  | "MARKETPLACE"
  | "CUSTOM"
  | "SALESFORCE"
  | "VIEW_VALIDATION_REDSHIFT"
  | "VIEW_VALIDATION_ATHENA"
  | "GOOGLEADS"
  | "GOOGLESHEETS"
  | "GOOGLEANALYTICS4"
  | "SERVICENOW"
  | "MARKETO"
  | "SAPODATA"
  | "ZENDESK"
  | "JIRACLOUD"
  | "NETSUITEERP"
  | "HUBSPOT"
  | "FACEBOOKADS"
  | "INSTAGRAMADS"
  | "ZOHOCRM"
  | "SALESFORCEPARDOT"
  | "SALESFORCEMARKETINGCLOUD"
  | "ADOBEANALYTICS"
  | "SLACK"
  | "LINKEDIN"
  | "MIXPANEL"
  | "ASANA"
  | "STRIPE"
  | "SMARTSHEET"
  | "DATADOG"
  | "WOOCOMMERCE"
  | "INTERCOM"
  | "SNAPCHATADS"
  | "PAYPAL"
  | "QUICKBOOKS"
  | "FACEBOOKPAGEINSIGHTS"
  | "FRESHDESK"
  | "TWILIO"
  | "DOCUSIGNMONITOR"
  | "FRESHSALES"
  | "ZOOM"
  | "GOOGLESEARCHCONSOLE"
  | "SALESFORCECOMMERCECLOUD"
  | "SAPCONCUR"
  | "DYNATRACE"
  | "MICROSOFTDYNAMIC365FINANCEANDOPS"
  | "MICROSOFTTEAMS"
  | "BLACKBAUDRAISEREDGENXT"
  | "MAILCHIMP"
  | "GITLAB"
  | "PENDO"
  | "PRODUCTBOARD"
  | "CIRCLECI"
  | "PIPEDIVE"
  | "SENDGRID"
  | "AZURECOSMOS"
  | "AZURESQL"
  | "BIGQUERY"
  | "BLACKBAUD"
  | "CLOUDERAHIVE"
  | "CLOUDERAIMPALA"
  | "CLOUDWATCH"
  | "CLOUDWATCHMETRICS"
  | "CMDB"
  | "DATALAKEGEN2"
  | "DB2"
  | "DB2AS400"
  | "DOCUMENTDB"
  | "DOMO"
  | "DYNAMODB"
  | "GOOGLECLOUDSTORAGE"
  | "HBASE"
  | "KUSTOMER"
  | "MICROSOFTDYNAMICS365CRM"
  | "MONDAY"
  | "MYSQL"
  | "OKTA"
  | "OPENSEARCH"
  | "ORACLE"
  | "PIPEDRIVE"
  | "POSTGRESQL"
  | "SAPHANA"
  | "SQLSERVER"
  | "SYNAPSE"
  | "TERADATA"
  | "TERADATANOS"
  | "TIMESTREAM"
  | "TPCDS"
  | "VERTICA"
  | (string & {});
export const ConnectionType = /*@__PURE__*/ S.String;

export type MatchCriteria = string[];
export const MatchCriteria = /*@__PURE__*/ S.Array(S.String);
export type ConnectionPropertyKey =
  | "HOST"
  | "PORT"
  | "USERNAME"
  | "PASSWORD"
  | "ENCRYPTED_PASSWORD"
  | "JDBC_DRIVER_JAR_URI"
  | "JDBC_DRIVER_CLASS_NAME"
  | "JDBC_ENGINE"
  | "JDBC_ENGINE_VERSION"
  | "CONFIG_FILES"
  | "INSTANCE_ID"
  | "JDBC_CONNECTION_URL"
  | "JDBC_ENFORCE_SSL"
  | "CUSTOM_JDBC_CERT"
  | "SKIP_CUSTOM_JDBC_CERT_VALIDATION"
  | "CUSTOM_JDBC_CERT_STRING"
  | "CONNECTION_URL"
  | "KAFKA_BOOTSTRAP_SERVERS"
  | "KAFKA_SSL_ENABLED"
  | "KAFKA_CUSTOM_CERT"
  | "KAFKA_SKIP_CUSTOM_CERT_VALIDATION"
  | "KAFKA_CLIENT_KEYSTORE"
  | "KAFKA_CLIENT_KEYSTORE_PASSWORD"
  | "KAFKA_CLIENT_KEY_PASSWORD"
  | "ENCRYPTED_KAFKA_CLIENT_KEYSTORE_PASSWORD"
  | "ENCRYPTED_KAFKA_CLIENT_KEY_PASSWORD"
  | "KAFKA_SASL_MECHANISM"
  | "KAFKA_SASL_PLAIN_USERNAME"
  | "KAFKA_SASL_PLAIN_PASSWORD"
  | "ENCRYPTED_KAFKA_SASL_PLAIN_PASSWORD"
  | "KAFKA_SASL_SCRAM_USERNAME"
  | "KAFKA_SASL_SCRAM_PASSWORD"
  | "KAFKA_SASL_SCRAM_SECRETS_ARN"
  | "ENCRYPTED_KAFKA_SASL_SCRAM_PASSWORD"
  | "KAFKA_SASL_GSSAPI_KEYTAB"
  | "KAFKA_SASL_GSSAPI_KRB5_CONF"
  | "KAFKA_SASL_GSSAPI_SERVICE"
  | "KAFKA_SASL_GSSAPI_PRINCIPAL"
  | "SECRET_ID"
  | "CONNECTOR_URL"
  | "CONNECTOR_TYPE"
  | "CONNECTOR_CLASS_NAME"
  | "ENDPOINT"
  | "ENDPOINT_TYPE"
  | "ROLE_ARN"
  | "REGION"
  | "WORKGROUP_NAME"
  | "CLUSTER_IDENTIFIER"
  | "DATABASE"
  | (string & {});
export const ConnectionPropertyKey = /*@__PURE__*/ S.String;

export type ConnectionProperties = { [key in ConnectionPropertyKey]?: string };
export const ConnectionProperties = /*@__PURE__*/ S.Record(
  ConnectionPropertyKey,
  S.String.pipe(S.optional),
);
export type PropertyKey = string;
export type PropertyValue = string;
export type PropertyMap = { [key: string]: string | undefined };
export const PropertyMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type SecurityGroupIdList = string[];
export const SecurityGroupIdList = /*@__PURE__*/ S.Array(S.String);
export interface PhysicalConnectionRequirements {
  SubnetId?: string;
  SecurityGroupIdList?: string[];
  AvailabilityZone?: string;
}
export const PhysicalConnectionRequirements = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubnetId: S.optional(S.String),
    SecurityGroupIdList: S.optional(SecurityGroupIdList),
    AvailabilityZone: S.optional(S.String),
  }),
).annotate({
  identifier: "PhysicalConnectionRequirements",
}) as any as S.Schema<PhysicalConnectionRequirements>;
export type AuthenticationType =
  | "BASIC"
  | "OAUTH2"
  | "CUSTOM"
  | "IAM"
  | (string & {});
export const AuthenticationType = /*@__PURE__*/ S.String;

export type OAuth2GrantType =
  | "AUTHORIZATION_CODE"
  | "CLIENT_CREDENTIALS"
  | "JWT_BEARER"
  | (string & {});
export const OAuth2GrantType = /*@__PURE__*/ S.String;

export type UserManagedClientApplicationClientId = string;
export type AWSManagedClientApplicationReference = string;
export interface OAuth2ClientApplication {
  UserManagedClientApplicationClientId?: string;
  AWSManagedClientApplicationReference?: string;
}
export const OAuth2ClientApplication = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserManagedClientApplicationClientId: S.optional(S.String),
    AWSManagedClientApplicationReference: S.optional(S.String),
  }),
).annotate({
  identifier: "OAuth2ClientApplication",
}) as any as S.Schema<OAuth2ClientApplication>;
export type TokenUrl = string;
export type TokenUrlParameterKey = string;
export type TokenUrlParameterValue = string;
export type TokenUrlParametersMap = { [key: string]: string | undefined };
export const TokenUrlParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type AuthorizationCode = string | redacted.Redacted<string>;
export type RedirectUri = string;
export interface AuthorizationCodeProperties {
  AuthorizationCode?: string | redacted.Redacted<string>;
  RedirectUri?: string;
}
export const AuthorizationCodeProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthorizationCode: S.optional(SensitiveString),
    RedirectUri: S.optional(S.String),
  }),
).annotate({
  identifier: "AuthorizationCodeProperties",
}) as any as S.Schema<AuthorizationCodeProperties>;
export type UserManagedClientApplicationClientSecret =
  | string
  | redacted.Redacted<string>;
export type AccessToken = string | redacted.Redacted<string>;
export type RefreshToken = string | redacted.Redacted<string>;
export type JwtToken = string | redacted.Redacted<string>;
export interface OAuth2Credentials {
  UserManagedClientApplicationClientSecret?: string | redacted.Redacted<string>;
  AccessToken?: string | redacted.Redacted<string>;
  RefreshToken?: string | redacted.Redacted<string>;
  JwtToken?: string | redacted.Redacted<string>;
}
export const OAuth2Credentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserManagedClientApplicationClientSecret: S.optional(SensitiveString),
    AccessToken: S.optional(SensitiveString),
    RefreshToken: S.optional(SensitiveString),
    JwtToken: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "OAuth2Credentials",
}) as any as S.Schema<OAuth2Credentials>;
export interface OAuth2PropertiesInput {
  OAuth2GrantType?: OAuth2GrantType;
  OAuth2ClientApplication?: OAuth2ClientApplication;
  TokenUrl?: string;
  TokenUrlParametersMap?: { [key: string]: string | undefined };
  AuthorizationCodeProperties?: AuthorizationCodeProperties;
  OAuth2Credentials?: OAuth2Credentials;
}
export const OAuth2PropertiesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OAuth2GrantType: S.optional(OAuth2GrantType),
    OAuth2ClientApplication: S.optional(OAuth2ClientApplication),
    TokenUrl: S.optional(S.String),
    TokenUrlParametersMap: S.optional(TokenUrlParametersMap),
    AuthorizationCodeProperties: S.optional(AuthorizationCodeProperties),
    OAuth2Credentials: S.optional(OAuth2Credentials),
  }),
).annotate({
  identifier: "OAuth2PropertiesInput",
}) as any as S.Schema<OAuth2PropertiesInput>;
export type SecretArn = string;
export type KmsKeyArn = string;
export type Username = string;
export type Password = string | redacted.Redacted<string>;
export interface BasicAuthenticationCredentials {
  Username?: string;
  Password?: string | redacted.Redacted<string>;
}
export const BasicAuthenticationCredentials = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.optional(S.String),
    Password: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "BasicAuthenticationCredentials",
}) as any as S.Schema<BasicAuthenticationCredentials>;
export type CredentialKey = string;
export type CredentialValue = string;
export type CredentialMap = { [key: string]: string | undefined };
export const CredentialMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AuthenticationConfigurationInput {
  AuthenticationType?: AuthenticationType;
  OAuth2Properties?: OAuth2PropertiesInput;
  SecretArn?: string;
  KmsKeyArn?: string;
  BasicAuthenticationCredentials?: BasicAuthenticationCredentials;
  CustomAuthenticationCredentials?: { [key: string]: string | undefined };
}
export const AuthenticationConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationType: S.optional(AuthenticationType),
    OAuth2Properties: S.optional(OAuth2PropertiesInput),
    SecretArn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    BasicAuthenticationCredentials: S.optional(BasicAuthenticationCredentials),
    CustomAuthenticationCredentials: S.optional(CredentialMap),
  }),
).annotate({
  identifier: "AuthenticationConfigurationInput",
}) as any as S.Schema<AuthenticationConfigurationInput>;
export type ComputeEnvironment = "SPARK" | "ATHENA" | "PYTHON" | (string & {});
export const ComputeEnvironment = /*@__PURE__*/ S.String;

export type ComputeEnvironmentList = ComputeEnvironment[];
export const ComputeEnvironmentList = /*@__PURE__*/ S.Array(ComputeEnvironment);
export interface ConnectionInput {
  Name: string;
  Description?: string;
  ConnectionType: ConnectionType;
  MatchCriteria?: string[];
  ConnectionProperties: { [key: string]: string | undefined };
  SparkProperties?: { [key: string]: string | undefined };
  AthenaProperties?: { [key: string]: string | undefined };
  PythonProperties?: { [key: string]: string | undefined };
  PhysicalConnectionRequirements?: PhysicalConnectionRequirements;
  AuthenticationConfiguration?: AuthenticationConfigurationInput;
  ValidateCredentials?: boolean;
  ValidateForComputeEnvironments?: ComputeEnvironment[];
}
export const ConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    ConnectionType: ConnectionType,
    MatchCriteria: S.optional(MatchCriteria),
    ConnectionProperties: ConnectionProperties,
    SparkProperties: S.optional(PropertyMap),
    AthenaProperties: S.optional(PropertyMap),
    PythonProperties: S.optional(PropertyMap),
    PhysicalConnectionRequirements: S.optional(PhysicalConnectionRequirements),
    AuthenticationConfiguration: S.optional(AuthenticationConfigurationInput),
    ValidateCredentials: S.optional(S.Boolean),
    ValidateForComputeEnvironments: S.optional(ComputeEnvironmentList),
  }),
).annotate({
  identifier: "ConnectionInput",
}) as any as S.Schema<ConnectionInput>;
export interface CreateConnectionRequest {
  CatalogId?: string;
  ConnectionInput: ConnectionInput;
  Tags?: { [key: string]: string | undefined };
}
export const CreateConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    ConnectionInput: ConnectionInput,
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateConnectionRequest",
}) as any as S.Schema<CreateConnectionRequest>;
export type ConnectionStatus =
  | "READY"
  | "IN_PROGRESS"
  | "FAILED"
  | (string & {});
export const ConnectionStatus = /*@__PURE__*/ S.String;

export interface CreateConnectionResponse {
  CreateConnectionStatus?: ConnectionStatus;
}
export const CreateConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CreateConnectionStatus: S.optional(ConnectionStatus) }),
).annotate({
  identifier: "CreateConnectionResponse",
}) as any as S.Schema<CreateConnectionResponse>;
export interface CreateCrawlerRequest {
  Name: string;
  Role: string;
  DatabaseName?: string;
  Description?: string;
  Targets: CrawlerTargets;
  Schedule?: string;
  Classifiers?: string[];
  TablePrefix?: string;
  SchemaChangePolicy?: SchemaChangePolicy;
  RecrawlPolicy?: RecrawlPolicy;
  LineageConfiguration?: LineageConfiguration;
  LakeFormationConfiguration?: LakeFormationConfiguration;
  Configuration?: string;
  CrawlerSecurityConfiguration?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateCrawlerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Role: S.String,
    DatabaseName: S.optional(S.String),
    Description: S.optional(S.String),
    Targets: CrawlerTargets,
    Schedule: S.optional(S.String),
    Classifiers: S.optional(ClassifierNameList),
    TablePrefix: S.optional(S.String),
    SchemaChangePolicy: S.optional(SchemaChangePolicy),
    RecrawlPolicy: S.optional(RecrawlPolicy),
    LineageConfiguration: S.optional(LineageConfiguration),
    LakeFormationConfiguration: S.optional(LakeFormationConfiguration),
    Configuration: S.optional(S.String),
    CrawlerSecurityConfiguration: S.optional(S.String),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateCrawlerRequest",
}) as any as S.Schema<CreateCrawlerRequest>;
export interface CreateCrawlerResponse {}
export const CreateCrawlerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateCrawlerResponse",
}) as any as S.Schema<CreateCrawlerResponse>;
export interface CreateCustomEntityTypeRequest {
  Name: string;
  RegexString: string;
  ContextWords?: string[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateCustomEntityTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    RegexString: S.String,
    ContextWords: S.optional(ContextWords),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateCustomEntityTypeRequest",
}) as any as S.Schema<CreateCustomEntityTypeRequest>;
export interface CreateCustomEntityTypeResponse {
  Name?: string;
}
export const CreateCustomEntityTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "CreateCustomEntityTypeResponse",
}) as any as S.Schema<CreateCustomEntityTypeResponse>;
export type URI = string;
export interface DatabaseIdentifier {
  CatalogId?: string;
  DatabaseName?: string;
  Region?: string;
}
export const DatabaseIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    Region: S.optional(S.String),
  }),
).annotate({
  identifier: "DatabaseIdentifier",
}) as any as S.Schema<DatabaseIdentifier>;
export interface FederatedDatabase {
  Identifier?: string;
  ConnectionName?: string;
  ConnectionType?: string;
}
export const FederatedDatabase = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.optional(S.String),
    ConnectionName: S.optional(S.String),
    ConnectionType: S.optional(S.String),
  }),
).annotate({
  identifier: "FederatedDatabase",
}) as any as S.Schema<FederatedDatabase>;
export interface DatabaseInput {
  Name: string;
  Description?: string;
  LocationUri?: string;
  Parameters?: { [key: string]: string | undefined };
  CreateTableDefaultPermissions?: PrincipalPermissions[];
  TargetDatabase?: DatabaseIdentifier;
  FederatedDatabase?: FederatedDatabase;
}
export const DatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    LocationUri: S.optional(S.String),
    Parameters: S.optional(ParametersMap),
    CreateTableDefaultPermissions: S.optional(PrincipalPermissionsList),
    TargetDatabase: S.optional(DatabaseIdentifier),
    FederatedDatabase: S.optional(FederatedDatabase),
  }),
).annotate({ identifier: "DatabaseInput" }) as any as S.Schema<DatabaseInput>;
export interface CreateDatabaseRequest {
  CatalogId?: string;
  DatabaseInput: DatabaseInput;
  Tags?: { [key: string]: string | undefined };
}
export const CreateDatabaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseInput: DatabaseInput,
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDatabaseRequest",
}) as any as S.Schema<CreateDatabaseRequest>;
export interface CreateDatabaseResponse {}
export const CreateDatabaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateDatabaseResponse",
}) as any as S.Schema<CreateDatabaseResponse>;
export type DataQualityRulesetString = string;
export interface DataQualityTargetTable {
  TableName: string;
  DatabaseName: string;
  CatalogId?: string;
}
export const DataQualityTargetTable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String,
    DatabaseName: S.String,
    CatalogId: S.optional(S.String),
  }),
).annotate({
  identifier: "DataQualityTargetTable",
}) as any as S.Schema<DataQualityTargetTable>;
export interface CreateDataQualityRulesetRequest {
  Name: string;
  Description?: string;
  Ruleset: string;
  Tags?: { [key: string]: string | undefined };
  TargetTable?: DataQualityTargetTable;
  DataQualitySecurityConfiguration?: string;
  ClientToken?: string;
}
export const CreateDataQualityRulesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Ruleset: S.String,
    Tags: S.optional(TagsMap),
    TargetTable: S.optional(DataQualityTargetTable),
    DataQualitySecurityConfiguration: S.optional(S.String),
    ClientToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDataQualityRulesetRequest",
}) as any as S.Schema<CreateDataQualityRulesetRequest>;
export interface CreateDataQualityRulesetResponse {
  Name?: string;
}
export const CreateDataQualityRulesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "CreateDataQualityRulesetResponse",
}) as any as S.Schema<CreateDataQualityRulesetResponse>;
export interface CreateDevEndpointRequest {
  EndpointName: string;
  RoleArn: string;
  SecurityGroupIds?: string[];
  SubnetId?: string;
  PublicKey?: string;
  PublicKeys?: string[];
  NumberOfNodes?: number;
  WorkerType?: WorkerType;
  GlueVersion?: string;
  NumberOfWorkers?: number;
  ExtraPythonLibsS3Path?: string;
  ExtraJarsS3Path?: string;
  SecurityConfiguration?: string;
  Tags?: { [key: string]: string | undefined };
  Arguments?: { [key: string]: string | undefined };
}
export const CreateDevEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointName: S.String,
    RoleArn: S.String,
    SecurityGroupIds: S.optional(StringList),
    SubnetId: S.optional(S.String),
    PublicKey: S.optional(S.String),
    PublicKeys: S.optional(PublicKeysList),
    NumberOfNodes: S.optional(S.Number),
    WorkerType: S.optional(WorkerType),
    GlueVersion: S.optional(S.String),
    NumberOfWorkers: S.optional(S.Number),
    ExtraPythonLibsS3Path: S.optional(S.String),
    ExtraJarsS3Path: S.optional(S.String),
    SecurityConfiguration: S.optional(S.String),
    Tags: S.optional(TagsMap),
    Arguments: S.optional(MapValue),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDevEndpointRequest",
}) as any as S.Schema<CreateDevEndpointRequest>;
export interface CreateDevEndpointResponse {
  EndpointName?: string;
  Status?: string;
  SecurityGroupIds?: string[];
  SubnetId?: string;
  RoleArn?: string;
  YarnEndpointAddress?: string;
  ZeppelinRemoteSparkInterpreterPort?: number;
  NumberOfNodes?: number;
  WorkerType?: WorkerType;
  GlueVersion?: string;
  NumberOfWorkers?: number;
  AvailabilityZone?: string;
  VpcId?: string;
  ExtraPythonLibsS3Path?: string;
  ExtraJarsS3Path?: string;
  FailureReason?: string;
  SecurityConfiguration?: string;
  CreatedTimestamp?: Date;
  Arguments?: { [key: string]: string | undefined };
}
export const CreateDevEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointName: S.optional(S.String),
    Status: S.optional(S.String),
    SecurityGroupIds: S.optional(StringList),
    SubnetId: S.optional(S.String),
    RoleArn: S.optional(S.String),
    YarnEndpointAddress: S.optional(S.String),
    ZeppelinRemoteSparkInterpreterPort: S.optional(S.Number),
    NumberOfNodes: S.optional(S.Number),
    WorkerType: S.optional(WorkerType),
    GlueVersion: S.optional(S.String),
    NumberOfWorkers: S.optional(S.Number),
    AvailabilityZone: S.optional(S.String),
    VpcId: S.optional(S.String),
    ExtraPythonLibsS3Path: S.optional(S.String),
    ExtraJarsS3Path: S.optional(S.String),
    FailureReason: S.optional(S.String),
    SecurityConfiguration: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Arguments: S.optional(MapValue),
  }),
).annotate({
  identifier: "CreateDevEndpointResponse",
}) as any as S.Schema<CreateDevEndpointResponse>;
export type GlossaryName = string;
export type MetadataDescription = string;
export interface CreateGlossaryRequest {
  Name: string;
  Description?: string;
  ClientToken?: string;
}
export const CreateGlossaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/glossaries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGlossaryRequest",
}) as any as S.Schema<CreateGlossaryRequest>;
export type GlossaryId = string;
export interface CreateGlossaryResponse {
  Id?: string;
  Name?: string;
  Description?: string;
}
export const CreateGlossaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateGlossaryResponse",
}) as any as S.Schema<CreateGlossaryResponse>;
export type GlossaryTermName = string;
export type GlossaryShortDescription = string;
export type GlossaryLongDescription = string;
export interface CreateGlossaryTermRequest {
  GlossaryIdentifier: string;
  Name: string;
  ShortDescription?: string;
  LongDescription?: string;
  ClientToken?: string;
}
export const CreateGlossaryTermRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlossaryIdentifier: S.String,
    Name: S.String,
    ShortDescription: S.optional(S.String),
    LongDescription: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/glossary-terms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGlossaryTermRequest",
}) as any as S.Schema<CreateGlossaryTermRequest>;
export interface CreateGlossaryTermResponse {
  Id?: string;
  GlossaryId?: string;
  Name?: string;
  ShortDescription?: string;
  LongDescription?: string;
}
export const CreateGlossaryTermResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    GlossaryId: S.optional(S.String),
    Name: S.optional(S.String),
    ShortDescription: S.optional(S.String),
    LongDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateGlossaryTermResponse",
}) as any as S.Schema<CreateGlossaryTermResponse>;
export type IdentityCenterInstanceArn = string;
export type IdentityCenterScope = string;
export type IdentityCenterScopesList = string[];
export const IdentityCenterScopesList = /*@__PURE__*/ S.Array(S.String);
export interface CreateGlueIdentityCenterConfigurationRequest {
  InstanceArn: string;
  Scopes?: string[];
  UserBackgroundSessionsEnabled?: boolean;
}
export const CreateGlueIdentityCenterConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstanceArn: S.String,
      Scopes: S.optional(IdentityCenterScopesList),
      UserBackgroundSessionsEnabled: S.optional(S.Boolean),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "CreateGlueIdentityCenterConfigurationRequest",
  }) as any as S.Schema<CreateGlueIdentityCenterConfigurationRequest>;
export type ApplicationArn = string;
export interface CreateGlueIdentityCenterConfigurationResponse {
  ApplicationArn?: string;
}
export const CreateGlueIdentityCenterConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ApplicationArn: S.optional(S.String) }),
  ).annotate({
    identifier: "CreateGlueIdentityCenterConfigurationResponse",
  }) as any as S.Schema<CreateGlueIdentityCenterConfigurationResponse>;
export type String128 = string;
export type String512 = string;
export type IntegrationDescription = string;
export type String2048 = string;
export type IntegrationString = string;
export type IntegrationAdditionalEncryptionContextMap = {
  [key: string]: string | undefined;
};
export const IntegrationAdditionalEncryptionContextMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Tag {
  key?: string;
  value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.optional(S.String), value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type IntegrationTagsList = Tag[];
export const IntegrationTagsList = /*@__PURE__*/ S.Array(Tag);
export type IntegrationSourcePropertiesMap = {
  [key: string]: string | undefined;
};
export const IntegrationSourcePropertiesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ContinuousSync = boolean;
export interface IntegrationConfig {
  RefreshInterval?: string;
  SourceProperties?: { [key: string]: string | undefined };
  ContinuousSync?: boolean;
}
export const IntegrationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RefreshInterval: S.optional(S.String),
    SourceProperties: S.optional(IntegrationSourcePropertiesMap),
    ContinuousSync: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "IntegrationConfig",
}) as any as S.Schema<IntegrationConfig>;
export interface CreateIntegrationRequest {
  IntegrationName: string;
  SourceArn: string;
  TargetArn: string;
  Description?: string;
  DataFilter?: string;
  KmsKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
  IntegrationConfig?: IntegrationConfig;
}
export const CreateIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegrationName: S.String,
    SourceArn: S.String,
    TargetArn: S.String,
    Description: S.optional(S.String),
    DataFilter: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    AdditionalEncryptionContext: S.optional(
      IntegrationAdditionalEncryptionContextMap,
    ),
    Tags: S.optional(IntegrationTagsList),
    IntegrationConfig: S.optional(IntegrationConfig),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateIntegrationRequest",
}) as any as S.Schema<CreateIntegrationRequest>;
export type IntegrationStatus =
  | "CREATING"
  | "ACTIVE"
  | "MODIFYING"
  | "FAILED"
  | "DELETING"
  | "SYNCING"
  | "NEEDS_ATTENTION"
  | (string & {});
export const IntegrationStatus = /*@__PURE__*/ S.String;

export type IntegrationTimestamp = Date;
export interface IntegrationError {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const IntegrationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "IntegrationError",
}) as any as S.Schema<IntegrationError>;
export type IntegrationErrorList = IntegrationError[];
export const IntegrationErrorList = /*@__PURE__*/ S.Array(IntegrationError);
export interface CreateIntegrationResponse {
  SourceArn: string;
  TargetArn: string;
  IntegrationName: string;
  Description?: string;
  IntegrationArn: string;
  KmsKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
  Status: IntegrationStatus;
  CreateTime: Date;
  Errors?: IntegrationError[];
  DataFilter?: string;
  IntegrationConfig?: IntegrationConfig;
}
export const CreateIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceArn: S.String,
    TargetArn: S.String,
    IntegrationName: S.String,
    Description: S.optional(S.String),
    IntegrationArn: S.String,
    KmsKeyId: S.optional(S.String),
    AdditionalEncryptionContext: S.optional(
      IntegrationAdditionalEncryptionContextMap,
    ),
    Tags: S.optional(IntegrationTagsList),
    Status: IntegrationStatus,
    CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Errors: S.optional(IntegrationErrorList),
    DataFilter: S.optional(S.String),
    IntegrationConfig: S.optional(IntegrationConfig),
  }),
).annotate({
  identifier: "CreateIntegrationResponse",
}) as any as S.Schema<CreateIntegrationResponse>;
export interface SourceProcessingProperties {
  RoleArn?: string;
}
export const SourceProcessingProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoleArn: S.optional(S.String) }),
).annotate({
  identifier: "SourceProcessingProperties",
}) as any as S.Schema<SourceProcessingProperties>;
export interface TargetProcessingProperties {
  RoleArn?: string;
  KmsArn?: string;
  ConnectionName?: string;
  EventBusArn?: string;
}
export const TargetProcessingProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoleArn: S.optional(S.String),
    KmsArn: S.optional(S.String),
    ConnectionName: S.optional(S.String),
    EventBusArn: S.optional(S.String),
  }),
).annotate({
  identifier: "TargetProcessingProperties",
}) as any as S.Schema<TargetProcessingProperties>;
export interface CreateIntegrationResourcePropertyRequest {
  ResourceArn: string;
  SourceProcessingProperties?: SourceProcessingProperties;
  TargetProcessingProperties?: TargetProcessingProperties;
  Tags?: Tag[];
}
export const CreateIntegrationResourcePropertyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceArn: S.String,
      SourceProcessingProperties: S.optional(SourceProcessingProperties),
      TargetProcessingProperties: S.optional(TargetProcessingProperties),
      Tags: S.optional(IntegrationTagsList),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateIntegrationResourcePropertyRequest",
}) as any as S.Schema<CreateIntegrationResourcePropertyRequest>;
export interface CreateIntegrationResourcePropertyResponse {
  ResourceArn: string;
  ResourcePropertyArn?: string;
  SourceProcessingProperties?: SourceProcessingProperties;
  TargetProcessingProperties?: TargetProcessingProperties;
}
export const CreateIntegrationResourcePropertyResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ResourceArn: S.String,
      ResourcePropertyArn: S.optional(S.String),
      SourceProcessingProperties: S.optional(SourceProcessingProperties),
      TargetProcessingProperties: S.optional(TargetProcessingProperties),
    }),
  ).annotate({
    identifier: "CreateIntegrationResourcePropertyResponse",
  }) as any as S.Schema<CreateIntegrationResourcePropertyResponse>;
export type SourceTableFieldsList = string[];
export const SourceTableFieldsList = /*@__PURE__*/ S.Array(S.String);
export type PrimaryKeyList = string[];
export const PrimaryKeyList = /*@__PURE__*/ S.Array(S.String);
export interface SourceTableConfig {
  Fields?: string[];
  FilterPredicate?: string;
  PrimaryKey?: string[];
  RecordUpdateField?: string;
}
export const SourceTableConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Fields: S.optional(SourceTableFieldsList),
    FilterPredicate: S.optional(S.String),
    PrimaryKey: S.optional(PrimaryKeyList),
    RecordUpdateField: S.optional(S.String),
  }),
).annotate({
  identifier: "SourceTableConfig",
}) as any as S.Schema<SourceTableConfig>;
export type UnnestSpec = "TOPLEVEL" | "FULL" | "NOUNNEST" | (string & {});
export const UnnestSpec = /*@__PURE__*/ S.String;

export interface IntegrationPartition {
  FieldName?: string;
  FunctionSpec?: string;
  ConversionSpec?: string;
}
export const IntegrationPartition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(S.String),
    FunctionSpec: S.optional(S.String),
    ConversionSpec: S.optional(S.String),
  }),
).annotate({
  identifier: "IntegrationPartition",
}) as any as S.Schema<IntegrationPartition>;
export type IntegrationPartitionSpecList = IntegrationPartition[];
export const IntegrationPartitionSpecList =
  /*@__PURE__*/ S.Array(IntegrationPartition);
export interface TargetTableConfig {
  UnnestSpec?: UnnestSpec;
  PartitionSpec?: IntegrationPartition[];
  TargetTableName?: string;
}
export const TargetTableConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UnnestSpec: S.optional(UnnestSpec),
    PartitionSpec: S.optional(IntegrationPartitionSpecList),
    TargetTableName: S.optional(S.String),
  }),
).annotate({
  identifier: "TargetTableConfig",
}) as any as S.Schema<TargetTableConfig>;
export interface CreateIntegrationTablePropertiesRequest {
  ResourceArn: string;
  TableName: string;
  SourceTableConfig?: SourceTableConfig;
  TargetTableConfig?: TargetTableConfig;
}
export const CreateIntegrationTablePropertiesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceArn: S.String,
      TableName: S.String,
      SourceTableConfig: S.optional(SourceTableConfig),
      TargetTableConfig: S.optional(TargetTableConfig),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateIntegrationTablePropertiesRequest",
}) as any as S.Schema<CreateIntegrationTablePropertiesRequest>;
export interface CreateIntegrationTablePropertiesResponse {}
export const CreateIntegrationTablePropertiesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "CreateIntegrationTablePropertiesResponse",
}) as any as S.Schema<CreateIntegrationTablePropertiesResponse>;
export interface CreateJobRequest {
  Name: string;
  JobMode?: JobMode;
  JobRunQueuingEnabled?: boolean;
  Description?: string;
  LogUri?: string;
  Role: string;
  ExecutionProperty?: ExecutionProperty;
  Command: JobCommand;
  DefaultArguments?: { [key: string]: string | undefined };
  NonOverridableArguments?: { [key: string]: string | undefined };
  Connections?: ConnectionsList;
  MaxRetries?: number;
  AllocatedCapacity?: number;
  Timeout?: number;
  MaxCapacity?: number;
  SecurityConfiguration?: string;
  Tags?: { [key: string]: string | undefined };
  NotificationProperty?: NotificationProperty;
  GlueVersion?: string;
  NumberOfWorkers?: number;
  WorkerType?: WorkerType;
  CodeGenConfigurationNodes?: {
    [key: string]: CodeGenConfigurationNode | undefined;
  };
  ExecutionClass?: ExecutionClass;
  SourceControlDetails?: SourceControlDetails;
  MaintenanceWindow?: string;
}
export const CreateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    JobMode: S.optional(JobMode),
    JobRunQueuingEnabled: S.optional(S.Boolean),
    Description: S.optional(S.String),
    LogUri: S.optional(S.String),
    Role: S.String,
    ExecutionProperty: S.optional(ExecutionProperty),
    Command: JobCommand,
    DefaultArguments: S.optional(GenericMap),
    NonOverridableArguments: S.optional(GenericMap),
    Connections: S.optional(ConnectionsList),
    MaxRetries: S.optional(S.Number),
    AllocatedCapacity: S.optional(S.Number),
    Timeout: S.optional(S.Number),
    MaxCapacity: S.optional(S.Number),
    SecurityConfiguration: S.optional(S.String),
    Tags: S.optional(TagsMap),
    NotificationProperty: S.optional(NotificationProperty),
    GlueVersion: S.optional(S.String),
    NumberOfWorkers: S.optional(S.Number),
    WorkerType: S.optional(WorkerType),
    CodeGenConfigurationNodes: S.optional(CodeGenConfigurationNodes),
    ExecutionClass: S.optional(ExecutionClass),
    SourceControlDetails: S.optional(SourceControlDetails),
    MaintenanceWindow: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateJobRequest",
}) as any as S.Schema<CreateJobRequest>;
export interface CreateJobResponse {
  Name?: string;
}
export const CreateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "CreateJobResponse",
}) as any as S.Schema<CreateJobResponse>;
export type GlueTables = GlueTable[];
export const GlueTables = /*@__PURE__*/ S.Array(GlueTable);
export type TransformType = "FIND_MATCHES" | (string & {});
export const TransformType = /*@__PURE__*/ S.String;

export interface FindMatchesParameters {
  PrimaryKeyColumnName?: string;
  PrecisionRecallTradeoff?: number;
  AccuracyCostTradeoff?: number;
  EnforceProvidedLabels?: boolean;
}
export const FindMatchesParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PrimaryKeyColumnName: S.optional(S.String),
    PrecisionRecallTradeoff: S.optional(S.Number),
    AccuracyCostTradeoff: S.optional(S.Number),
    EnforceProvidedLabels: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "FindMatchesParameters",
}) as any as S.Schema<FindMatchesParameters>;
export interface TransformParameters {
  TransformType: TransformType;
  FindMatchesParameters?: FindMatchesParameters;
}
export const TransformParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransformType: TransformType,
    FindMatchesParameters: S.optional(FindMatchesParameters),
  }),
).annotate({
  identifier: "TransformParameters",
}) as any as S.Schema<TransformParameters>;
export type MLUserDataEncryptionModeString =
  | "DISABLED"
  | "SSE-KMS"
  | (string & {});
export const MLUserDataEncryptionModeString = /*@__PURE__*/ S.String;

export interface MLUserDataEncryption {
  MlUserDataEncryptionMode: MLUserDataEncryptionModeString;
  KmsKeyId?: string;
}
export const MLUserDataEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MlUserDataEncryptionMode: MLUserDataEncryptionModeString,
    KmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "MLUserDataEncryption",
}) as any as S.Schema<MLUserDataEncryption>;
export interface TransformEncryption {
  MlUserDataEncryption?: MLUserDataEncryption;
  TaskRunSecurityConfigurationName?: string;
}
export const TransformEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MlUserDataEncryption: S.optional(MLUserDataEncryption),
    TaskRunSecurityConfigurationName: S.optional(S.String),
  }),
).annotate({
  identifier: "TransformEncryption",
}) as any as S.Schema<TransformEncryption>;
export interface CreateMLTransformRequest {
  Name: string;
  Description?: string;
  InputRecordTables: GlueTable[];
  Parameters: TransformParameters;
  Role: string;
  GlueVersion?: string;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  Timeout?: number;
  MaxRetries?: number;
  Tags?: { [key: string]: string | undefined };
  TransformEncryption?: TransformEncryption;
}
export const CreateMLTransformRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    InputRecordTables: GlueTables,
    Parameters: TransformParameters,
    Role: S.String,
    GlueVersion: S.optional(S.String),
    MaxCapacity: S.optional(S.Number),
    WorkerType: S.optional(WorkerType),
    NumberOfWorkers: S.optional(S.Number),
    Timeout: S.optional(S.Number),
    MaxRetries: S.optional(S.Number),
    Tags: S.optional(TagsMap),
    TransformEncryption: S.optional(TransformEncryption),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateMLTransformRequest",
}) as any as S.Schema<CreateMLTransformRequest>;
export interface CreateMLTransformResponse {
  TransformId?: string;
}
export const CreateMLTransformResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransformId: S.optional(S.String) }),
).annotate({
  identifier: "CreateMLTransformResponse",
}) as any as S.Schema<CreateMLTransformResponse>;
export interface CreatePartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionInput: PartitionInput;
}
export const CreatePartitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    PartitionInput: PartitionInput,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePartitionRequest",
}) as any as S.Schema<CreatePartitionRequest>;
export interface CreatePartitionResponse {}
export const CreatePartitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreatePartitionResponse",
}) as any as S.Schema<CreatePartitionResponse>;
export type KeyList = string[];
export const KeyList = /*@__PURE__*/ S.Array(S.String);
export interface PartitionIndex {
  Keys: string[];
  IndexName: string;
}
export const PartitionIndex = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Keys: KeyList, IndexName: S.String }),
).annotate({ identifier: "PartitionIndex" }) as any as S.Schema<PartitionIndex>;
export interface CreatePartitionIndexRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionIndex: PartitionIndex;
}
export const CreatePartitionIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    PartitionIndex: PartitionIndex,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePartitionIndexRequest",
}) as any as S.Schema<CreatePartitionIndexRequest>;
export interface CreatePartitionIndexResponse {}
export const CreatePartitionIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreatePartitionIndexResponse",
}) as any as S.Schema<CreatePartitionIndexResponse>;
export interface CreateRegistryInput {
  RegistryName: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateRegistryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryName: S.String,
    Description: S.optional(S.String),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRegistryInput",
}) as any as S.Schema<CreateRegistryInput>;
export interface CreateRegistryResponse {
  RegistryArn?: string;
  RegistryName?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateRegistryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryArn: S.optional(S.String),
    RegistryName: S.optional(S.String),
    Description: S.optional(S.String),
    Tags: S.optional(TagsMap),
  }),
).annotate({
  identifier: "CreateRegistryResponse",
}) as any as S.Schema<CreateRegistryResponse>;
export interface RegistryId {
  RegistryName?: string;
  RegistryArn?: string;
}
export const RegistryId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryName: S.optional(S.String),
    RegistryArn: S.optional(S.String),
  }),
).annotate({ identifier: "RegistryId" }) as any as S.Schema<RegistryId>;
export type Compatibility =
  | "NONE"
  | "DISABLED"
  | "BACKWARD"
  | "BACKWARD_ALL"
  | "FORWARD"
  | "FORWARD_ALL"
  | "FULL"
  | "FULL_ALL"
  | (string & {});
export const Compatibility = /*@__PURE__*/ S.String;

export interface CreateSchemaInput {
  RegistryId?: RegistryId;
  SchemaName: string;
  DataFormat: DataFormat;
  Compatibility?: Compatibility;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
  SchemaDefinition?: string;
}
export const CreateSchemaInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryId: S.optional(RegistryId),
    SchemaName: S.String,
    DataFormat: DataFormat,
    Compatibility: S.optional(Compatibility),
    Description: S.optional(S.String),
    Tags: S.optional(TagsMap),
    SchemaDefinition: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateSchemaInput",
}) as any as S.Schema<CreateSchemaInput>;
export type SchemaCheckpointNumber = number;
export type SchemaStatus = "AVAILABLE" | "PENDING" | "DELETING" | (string & {});
export const SchemaStatus = /*@__PURE__*/ S.String;

export type SchemaVersionStatus =
  | "AVAILABLE"
  | "PENDING"
  | "FAILURE"
  | "DELETING"
  | (string & {});
export const SchemaVersionStatus = /*@__PURE__*/ S.String;

export interface CreateSchemaResponse {
  RegistryName?: string;
  RegistryArn?: string;
  SchemaName?: string;
  SchemaArn?: string;
  Description?: string;
  DataFormat?: DataFormat;
  Compatibility?: Compatibility;
  SchemaCheckpoint?: number;
  LatestSchemaVersion?: number;
  NextSchemaVersion?: number;
  SchemaStatus?: SchemaStatus;
  Tags?: { [key: string]: string | undefined };
  SchemaVersionId?: string;
  SchemaVersionStatus?: SchemaVersionStatus;
}
export const CreateSchemaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryName: S.optional(S.String),
    RegistryArn: S.optional(S.String),
    SchemaName: S.optional(S.String),
    SchemaArn: S.optional(S.String),
    Description: S.optional(S.String),
    DataFormat: S.optional(DataFormat),
    Compatibility: S.optional(Compatibility),
    SchemaCheckpoint: S.optional(S.Number),
    LatestSchemaVersion: S.optional(S.Number),
    NextSchemaVersion: S.optional(S.Number),
    SchemaStatus: S.optional(SchemaStatus),
    Tags: S.optional(TagsMap),
    SchemaVersionId: S.optional(S.String),
    SchemaVersionStatus: S.optional(SchemaVersionStatus),
  }),
).annotate({
  identifier: "CreateSchemaResponse",
}) as any as S.Schema<CreateSchemaResponse>;
export type CodeGenIdentifier = string;
export type CodeGenNodeType = string;
export type CodeGenArgName = string;
export type CodeGenArgValue = string;
export interface CodeGenNodeArg {
  Name: string;
  Value: string;
  Param?: boolean;
}
export const CodeGenNodeArg = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String, Param: S.optional(S.Boolean) }),
).annotate({ identifier: "CodeGenNodeArg" }) as any as S.Schema<CodeGenNodeArg>;
export type CodeGenNodeArgs = CodeGenNodeArg[];
export const CodeGenNodeArgs = /*@__PURE__*/ S.Array(CodeGenNodeArg);
export interface CodeGenNode {
  Id: string;
  NodeType: string;
  Args: CodeGenNodeArg[];
  LineNumber?: number;
}
export const CodeGenNode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    NodeType: S.String,
    Args: CodeGenNodeArgs,
    LineNumber: S.optional(S.Number),
  }),
).annotate({ identifier: "CodeGenNode" }) as any as S.Schema<CodeGenNode>;
export type DagNodes = CodeGenNode[];
export const DagNodes = /*@__PURE__*/ S.Array(CodeGenNode);
export interface CodeGenEdge {
  Source: string;
  Target: string;
  TargetParameter?: string;
}
export const CodeGenEdge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Source: S.String,
    Target: S.String,
    TargetParameter: S.optional(S.String),
  }),
).annotate({ identifier: "CodeGenEdge" }) as any as S.Schema<CodeGenEdge>;
export type DagEdges = CodeGenEdge[];
export const DagEdges = /*@__PURE__*/ S.Array(CodeGenEdge);
export type Language = "PYTHON" | "SCALA" | (string & {});
export const Language = /*@__PURE__*/ S.String;

export interface CreateScriptRequest {
  DagNodes?: CodeGenNode[];
  DagEdges?: CodeGenEdge[];
  Language?: Language;
}
export const CreateScriptRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DagNodes: S.optional(DagNodes),
    DagEdges: S.optional(DagEdges),
    Language: S.optional(Language),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateScriptRequest",
}) as any as S.Schema<CreateScriptRequest>;
export type PythonScript = string;
export type ScalaCode = string;
export interface CreateScriptResponse {
  PythonScript?: string;
  ScalaCode?: string;
}
export const CreateScriptResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PythonScript: S.optional(S.String),
    ScalaCode: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateScriptResponse",
}) as any as S.Schema<CreateScriptResponse>;
export type S3EncryptionMode =
  | "DISABLED"
  | "SSE-KMS"
  | "SSE-S3"
  | (string & {});
export const S3EncryptionMode = /*@__PURE__*/ S.String;

export interface S3Encryption {
  S3EncryptionMode?: S3EncryptionMode;
  KmsKeyArn?: string;
}
export const S3Encryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3EncryptionMode: S.optional(S3EncryptionMode),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "S3Encryption" }) as any as S.Schema<S3Encryption>;
export type S3EncryptionList = S3Encryption[];
export const S3EncryptionList = /*@__PURE__*/ S.Array(S3Encryption);
export type CloudWatchEncryptionMode = "DISABLED" | "SSE-KMS" | (string & {});
export const CloudWatchEncryptionMode = /*@__PURE__*/ S.String;

export interface CloudWatchEncryption {
  CloudWatchEncryptionMode?: CloudWatchEncryptionMode;
  KmsKeyArn?: string;
}
export const CloudWatchEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchEncryptionMode: S.optional(CloudWatchEncryptionMode),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CloudWatchEncryption",
}) as any as S.Schema<CloudWatchEncryption>;
export type JobBookmarksEncryptionMode = "DISABLED" | "CSE-KMS" | (string & {});
export const JobBookmarksEncryptionMode = /*@__PURE__*/ S.String;

export interface JobBookmarksEncryption {
  JobBookmarksEncryptionMode?: JobBookmarksEncryptionMode;
  KmsKeyArn?: string;
}
export const JobBookmarksEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobBookmarksEncryptionMode: S.optional(JobBookmarksEncryptionMode),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "JobBookmarksEncryption",
}) as any as S.Schema<JobBookmarksEncryption>;
export type DataQualityEncryptionMode = "DISABLED" | "SSE-KMS" | (string & {});
export const DataQualityEncryptionMode = /*@__PURE__*/ S.String;

export interface DataQualityEncryption {
  DataQualityEncryptionMode?: DataQualityEncryptionMode;
  KmsKeyArn?: string;
}
export const DataQualityEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataQualityEncryptionMode: S.optional(DataQualityEncryptionMode),
    KmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "DataQualityEncryption",
}) as any as S.Schema<DataQualityEncryption>;
export interface EncryptionConfiguration {
  S3Encryption?: S3Encryption[];
  CloudWatchEncryption?: CloudWatchEncryption;
  JobBookmarksEncryption?: JobBookmarksEncryption;
  DataQualityEncryption?: DataQualityEncryption;
}
export const EncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Encryption: S.optional(S3EncryptionList),
    CloudWatchEncryption: S.optional(CloudWatchEncryption),
    JobBookmarksEncryption: S.optional(JobBookmarksEncryption),
    DataQualityEncryption: S.optional(DataQualityEncryption),
  }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export interface CreateSecurityConfigurationRequest {
  Name: string;
  EncryptionConfiguration: EncryptionConfiguration;
}
export const CreateSecurityConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    EncryptionConfiguration: EncryptionConfiguration,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateSecurityConfigurationRequest",
}) as any as S.Schema<CreateSecurityConfigurationRequest>;
export interface CreateSecurityConfigurationResponse {
  Name?: string;
  CreatedTimestamp?: Date;
}
export const CreateSecurityConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CreateSecurityConfigurationResponse",
}) as any as S.Schema<CreateSecurityConfigurationResponse>;
export type OrchestrationRoleArn = string;
export interface SessionCommand {
  Name?: string;
  PythonVersion?: string;
}
export const SessionCommand = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), PythonVersion: S.optional(S.String) }),
).annotate({ identifier: "SessionCommand" }) as any as S.Schema<SessionCommand>;
export type OrchestrationArgumentsValue = string;
export type OrchestrationArgumentsMap = { [key: string]: string | undefined };
export const OrchestrationArgumentsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type SessionType = "LIVY" | "SPARK_CONNECT" | (string & {});
export const SessionType = /*@__PURE__*/ S.String;

export interface CreateSessionRequest {
  Id: string;
  Description?: string;
  Role: string;
  Command: SessionCommand;
  Timeout?: number;
  IdleTimeout?: number;
  DefaultArguments?: { [key: string]: string | undefined };
  Connections?: ConnectionsList;
  MaxCapacity?: number;
  NumberOfWorkers?: number;
  WorkerType?: WorkerType;
  SecurityConfiguration?: string;
  GlueVersion?: string;
  Tags?: { [key: string]: string | undefined };
  RequestOrigin?: string;
  SessionType?: SessionType;
}
export const CreateSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Description: S.optional(S.String),
    Role: S.String,
    Command: SessionCommand,
    Timeout: S.optional(S.Number),
    IdleTimeout: S.optional(S.Number),
    DefaultArguments: S.optional(OrchestrationArgumentsMap),
    Connections: S.optional(ConnectionsList),
    MaxCapacity: S.optional(S.Number),
    NumberOfWorkers: S.optional(S.Number),
    WorkerType: S.optional(WorkerType),
    SecurityConfiguration: S.optional(S.String),
    GlueVersion: S.optional(S.String),
    Tags: S.optional(TagsMap),
    RequestOrigin: S.optional(S.String),
    SessionType: S.optional(SessionType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateSessionRequest",
}) as any as S.Schema<CreateSessionRequest>;
export type SessionStatus =
  | "PROVISIONING"
  | "READY"
  | "FAILED"
  | "TIMEOUT"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export const SessionStatus = /*@__PURE__*/ S.String;

export type DoubleValue = number;
export type IdleTimeout = number;
export interface Session {
  Id?: string;
  CreatedOn?: Date;
  Status?: SessionStatus;
  ErrorMessage?: string;
  Description?: string;
  Role?: string;
  Command?: SessionCommand;
  DefaultArguments?: { [key: string]: string | undefined };
  Connections?: ConnectionsList;
  Progress?: number;
  MaxCapacity?: number;
  SecurityConfiguration?: string;
  GlueVersion?: string;
  NumberOfWorkers?: number;
  WorkerType?: WorkerType;
  CompletedOn?: Date;
  ExecutionTime?: number;
  DPUSeconds?: number;
  IdleTimeout?: number;
  ProfileName?: string;
  SessionType?: SessionType;
}
export const Session = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(SessionStatus),
    ErrorMessage: S.optional(S.String),
    Description: S.optional(S.String),
    Role: S.optional(S.String),
    Command: S.optional(SessionCommand),
    DefaultArguments: S.optional(OrchestrationArgumentsMap),
    Connections: S.optional(ConnectionsList),
    Progress: S.optional(S.Number),
    MaxCapacity: S.optional(S.Number),
    SecurityConfiguration: S.optional(S.String),
    GlueVersion: S.optional(S.String),
    NumberOfWorkers: S.optional(S.Number),
    WorkerType: S.optional(WorkerType),
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExecutionTime: S.optional(S.Number),
    DPUSeconds: S.optional(S.Number),
    IdleTimeout: S.optional(S.Number),
    ProfileName: S.optional(S.String),
    SessionType: S.optional(SessionType),
  }),
).annotate({ identifier: "Session" }) as any as S.Schema<Session>;
export interface CreateSessionResponse {
  Session?: Session;
}
export const CreateSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Session: S.optional(Session) }),
).annotate({
  identifier: "CreateSessionResponse",
}) as any as S.Schema<CreateSessionResponse>;
export type NonNegativeInteger = number;
export type ViewTextString = string;
export type TableTypeString = string;
export interface TableIdentifier {
  CatalogId?: string;
  DatabaseName?: string;
  Name?: string;
  Region?: string;
}
export const TableIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    Name: S.optional(S.String),
    Region: S.optional(S.String),
  }),
).annotate({
  identifier: "TableIdentifier",
}) as any as S.Schema<TableIdentifier>;
export type ViewDialect = "REDSHIFT" | "ATHENA" | "SPARK" | (string & {});
export const ViewDialect = /*@__PURE__*/ S.String;

export type ViewDialectVersionString = string;
export interface ViewRepresentationInput {
  Dialect?: ViewDialect;
  DialectVersion?: string;
  ViewOriginalText?: string;
  ValidationConnection?: string;
  ViewExpandedText?: string;
}
export const ViewRepresentationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dialect: S.optional(ViewDialect),
    DialectVersion: S.optional(S.String),
    ViewOriginalText: S.optional(S.String),
    ValidationConnection: S.optional(S.String),
    ViewExpandedText: S.optional(S.String),
  }),
).annotate({
  identifier: "ViewRepresentationInput",
}) as any as S.Schema<ViewRepresentationInput>;
export type ViewRepresentationInputList = ViewRepresentationInput[];
export const ViewRepresentationInputList = /*@__PURE__*/ S.Array(
  ViewRepresentationInput,
);
export type TableVersionId = number;
export type RefreshSeconds = number;
export type LastRefreshType = "FULL" | "INCREMENTAL" | (string & {});
export const LastRefreshType = /*@__PURE__*/ S.String;

export type ViewSubObjectsList = string[];
export const ViewSubObjectsList = /*@__PURE__*/ S.Array(S.String);
export type ViewSubObjectVersionIdsList = number[];
export const ViewSubObjectVersionIdsList = /*@__PURE__*/ S.Array(S.Number);
export interface ViewDefinitionInput {
  IsProtected?: boolean;
  Definer?: string;
  Representations?: ViewRepresentationInput[];
  ViewVersionId?: number;
  ViewVersionToken?: string;
  RefreshSeconds?: number;
  LastRefreshType?: LastRefreshType;
  SubObjects?: string[];
  SubObjectVersionIds?: number[];
}
export const ViewDefinitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsProtected: S.optional(S.Boolean),
    Definer: S.optional(S.String),
    Representations: S.optional(ViewRepresentationInputList),
    ViewVersionId: S.optional(S.Number),
    ViewVersionToken: S.optional(S.String),
    RefreshSeconds: S.optional(S.Number),
    LastRefreshType: S.optional(LastRefreshType),
    SubObjects: S.optional(ViewSubObjectsList),
    SubObjectVersionIds: S.optional(ViewSubObjectVersionIdsList),
  }),
).annotate({
  identifier: "ViewDefinitionInput",
}) as any as S.Schema<ViewDefinitionInput>;
export interface TableInput {
  Name: string;
  Description?: string;
  Owner?: string;
  LastAccessTime?: Date;
  LastAnalyzedTime?: Date;
  Retention?: number;
  StorageDescriptor?: StorageDescriptor;
  PartitionKeys?: Column[];
  ViewOriginalText?: string;
  ViewExpandedText?: string;
  TableType?: string;
  Parameters?: { [key: string]: string | undefined };
  TargetTable?: TableIdentifier;
  ViewDefinition?: ViewDefinitionInput;
}
export const TableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Owner: S.optional(S.String),
    LastAccessTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastAnalyzedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Retention: S.optional(S.Number),
    StorageDescriptor: S.optional(StorageDescriptor),
    PartitionKeys: S.optional(ColumnList),
    ViewOriginalText: S.optional(S.String),
    ViewExpandedText: S.optional(S.String),
    TableType: S.optional(S.String),
    Parameters: S.optional(ParametersMap),
    TargetTable: S.optional(TableIdentifier),
    ViewDefinition: S.optional(ViewDefinitionInput),
  }),
).annotate({ identifier: "TableInput" }) as any as S.Schema<TableInput>;
export type PartitionIndexList = PartitionIndex[];
export const PartitionIndexList = /*@__PURE__*/ S.Array(PartitionIndex);
export type MetadataOperation = "CREATE" | (string & {});
export const MetadataOperation = /*@__PURE__*/ S.String;

export type IntegerList = number[];
export const IntegerList = /*@__PURE__*/ S.Array(S.Number);
export type IcebergStructTypeEnum = "struct" | (string & {});
export const IcebergStructTypeEnum = /*@__PURE__*/ S.String;

export type IcebergDocument = unknown;
export interface IcebergStructField {
  Id: number;
  Name: string;
  Type: any;
  Required: boolean;
  Doc?: string;
  InitialDefault?: any;
  WriteDefault?: any;
}
export const IcebergStructField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.Number,
    Name: S.String,
    Type: S.Any,
    Required: S.Boolean,
    Doc: S.optional(S.String),
    InitialDefault: S.optional(S.Any),
    WriteDefault: S.optional(S.Any),
  }),
).annotate({
  identifier: "IcebergStructField",
}) as any as S.Schema<IcebergStructField>;
export type IcebergStructFieldList = IcebergStructField[];
export const IcebergStructFieldList = /*@__PURE__*/ S.Array(IcebergStructField);
export interface IcebergSchema {
  SchemaId?: number;
  IdentifierFieldIds?: number[];
  Type?: IcebergStructTypeEnum;
  Fields: IcebergStructField[];
}
export const IcebergSchema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: S.optional(S.Number),
    IdentifierFieldIds: S.optional(IntegerList),
    Type: S.optional(IcebergStructTypeEnum),
    Fields: IcebergStructFieldList,
  }),
).annotate({ identifier: "IcebergSchema" }) as any as S.Schema<IcebergSchema>;
export type IcebergTransformString = string;
export interface IcebergPartitionField {
  SourceId: number;
  Transform: string;
  Name: string;
  FieldId?: number;
}
export const IcebergPartitionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceId: S.Number,
    Transform: S.String,
    Name: S.String,
    FieldId: S.optional(S.Number),
  }),
).annotate({
  identifier: "IcebergPartitionField",
}) as any as S.Schema<IcebergPartitionField>;
export type IcebergPartitionSpecFieldList = IcebergPartitionField[];
export const IcebergPartitionSpecFieldList = /*@__PURE__*/ S.Array(
  IcebergPartitionField,
);
export interface IcebergPartitionSpec {
  Fields: IcebergPartitionField[];
  SpecId?: number;
}
export const IcebergPartitionSpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Fields: IcebergPartitionSpecFieldList,
    SpecId: S.optional(S.Number),
  }),
).annotate({
  identifier: "IcebergPartitionSpec",
}) as any as S.Schema<IcebergPartitionSpec>;
export type IcebergSortDirection = "asc" | "desc" | (string & {});
export const IcebergSortDirection = /*@__PURE__*/ S.String;

export type IcebergNullOrder = "nulls-first" | "nulls-last" | (string & {});
export const IcebergNullOrder = /*@__PURE__*/ S.String;

export interface IcebergSortField {
  SourceId: number;
  Transform: string;
  Direction: IcebergSortDirection;
  NullOrder: IcebergNullOrder;
}
export const IcebergSortField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceId: S.Number,
    Transform: S.String,
    Direction: IcebergSortDirection,
    NullOrder: IcebergNullOrder,
  }),
).annotate({
  identifier: "IcebergSortField",
}) as any as S.Schema<IcebergSortField>;
export type IcebergSortOrderFieldList = IcebergSortField[];
export const IcebergSortOrderFieldList =
  /*@__PURE__*/ S.Array(IcebergSortField);
export interface IcebergSortOrder {
  OrderId: number;
  Fields: IcebergSortField[];
}
export const IcebergSortOrder = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OrderId: S.Number, Fields: IcebergSortOrderFieldList }),
).annotate({
  identifier: "IcebergSortOrder",
}) as any as S.Schema<IcebergSortOrder>;
export type StringToStringMap = { [key: string]: string | undefined };
export const StringToStringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateIcebergTableInput {
  Location: string;
  Schema: IcebergSchema;
  PartitionSpec?: IcebergPartitionSpec;
  WriteOrder?: IcebergSortOrder;
  Properties?: { [key: string]: string | undefined };
}
export const CreateIcebergTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Location: S.String,
    Schema: IcebergSchema,
    PartitionSpec: S.optional(IcebergPartitionSpec),
    WriteOrder: S.optional(IcebergSortOrder),
    Properties: S.optional(StringToStringMap),
  }),
).annotate({
  identifier: "CreateIcebergTableInput",
}) as any as S.Schema<CreateIcebergTableInput>;
export interface IcebergInput {
  MetadataOperation: MetadataOperation;
  Version?: string;
  CreateIcebergTableInput?: CreateIcebergTableInput;
}
export const IcebergInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetadataOperation: MetadataOperation,
    Version: S.optional(S.String),
    CreateIcebergTableInput: S.optional(CreateIcebergTableInput),
  }),
).annotate({ identifier: "IcebergInput" }) as any as S.Schema<IcebergInput>;
export interface OpenTableFormatInput {
  IcebergInput?: IcebergInput;
}
export const OpenTableFormatInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IcebergInput: S.optional(IcebergInput) }),
).annotate({
  identifier: "OpenTableFormatInput",
}) as any as S.Schema<OpenTableFormatInput>;
export interface CreateTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  Name?: string;
  TableInput?: TableInput;
  PartitionIndexes?: PartitionIndex[];
  TransactionId?: string;
  OpenTableFormatInput?: OpenTableFormatInput;
}
export const CreateTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    Name: S.optional(S.String),
    TableInput: S.optional(TableInput),
    PartitionIndexes: S.optional(PartitionIndexList),
    TransactionId: S.optional(S.String),
    OpenTableFormatInput: S.optional(OpenTableFormatInput),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateTableRequest",
}) as any as S.Schema<CreateTableRequest>;
export interface CreateTableResponse {}
export const CreateTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateTableResponse",
}) as any as S.Schema<CreateTableResponse>;
export interface CreateTableOptimizerRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  Type: TableOptimizerType;
  TableOptimizerConfiguration: TableOptimizerConfiguration;
}
export const CreateTableOptimizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.String,
    DatabaseName: S.String,
    TableName: S.String,
    Type: TableOptimizerType,
    TableOptimizerConfiguration: TableOptimizerConfiguration,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateTableOptimizerRequest",
}) as any as S.Schema<CreateTableOptimizerRequest>;
export interface CreateTableOptimizerResponse {}
export const CreateTableOptimizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateTableOptimizerResponse",
}) as any as S.Schema<CreateTableOptimizerResponse>;
export interface CreateTriggerRequest {
  Name: string;
  WorkflowName?: string;
  Type: TriggerType;
  Schedule?: string;
  Predicate?: Predicate;
  Actions: Action[];
  Description?: string;
  StartOnCreation?: boolean;
  Tags?: { [key: string]: string | undefined };
  EventBatchingCondition?: EventBatchingCondition;
}
export const CreateTriggerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    WorkflowName: S.optional(S.String),
    Type: TriggerType,
    Schedule: S.optional(S.String),
    Predicate: S.optional(Predicate),
    Actions: ActionList,
    Description: S.optional(S.String),
    StartOnCreation: S.optional(S.Boolean),
    Tags: S.optional(TagsMap),
    EventBatchingCondition: S.optional(EventBatchingCondition),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateTriggerRequest",
}) as any as S.Schema<CreateTriggerRequest>;
export interface CreateTriggerResponse {
  Name?: string;
}
export const CreateTriggerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "CreateTriggerResponse",
}) as any as S.Schema<CreateTriggerResponse>;
export type ConfigValueString = string;
export type AllowedValuesStringList = string[];
export const AllowedValuesStringList = /*@__PURE__*/ S.Array(S.String);
export interface ConfigurationObject {
  DefaultValue?: string;
  AllowedValues?: string[];
  MinValue?: string;
  MaxValue?: string;
}
export const ConfigurationObject = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultValue: S.optional(S.String),
    AllowedValues: S.optional(AllowedValuesStringList),
    MinValue: S.optional(S.String),
    MaxValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationObject",
}) as any as S.Schema<ConfigurationObject>;
export type ConfigurationMap = {
  [key: string]: ConfigurationObject | undefined;
};
export const ConfigurationMap = /*@__PURE__*/ S.Record(
  S.String,
  ConfigurationObject.pipe(S.optional),
);
export interface ProfileConfiguration {
  SessionConfiguration?: { [key: string]: ConfigurationObject | undefined };
  JobConfiguration?: { [key: string]: ConfigurationObject | undefined };
}
export const ProfileConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionConfiguration: S.optional(ConfigurationMap),
    JobConfiguration: S.optional(ConfigurationMap),
  }),
).annotate({
  identifier: "ProfileConfiguration",
}) as any as S.Schema<ProfileConfiguration>;
export interface CreateUsageProfileRequest {
  Name: string;
  Description?: string;
  Configuration: ProfileConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export const CreateUsageProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Configuration: ProfileConfiguration,
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateUsageProfileRequest",
}) as any as S.Schema<CreateUsageProfileRequest>;
export interface CreateUsageProfileResponse {
  Name?: string;
}
export const CreateUsageProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "CreateUsageProfileResponse",
}) as any as S.Schema<CreateUsageProfileResponse>;
export type FunctionType =
  | "REGULAR_FUNCTION"
  | "AGGREGATE_FUNCTION"
  | "STORED_PROCEDURE"
  | (string & {});
export const FunctionType = /*@__PURE__*/ S.String;

export type PrincipalType = "USER" | "ROLE" | "GROUP" | (string & {});
export const PrincipalType = /*@__PURE__*/ S.String;

export type ResourceType = "JAR" | "FILE" | "ARCHIVE" | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export interface ResourceUri {
  ResourceType?: ResourceType;
  Uri?: string;
}
export const ResourceUri = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.optional(ResourceType),
    Uri: S.optional(S.String),
  }),
).annotate({ identifier: "ResourceUri" }) as any as S.Schema<ResourceUri>;
export type ResourceUriList = ResourceUri[];
export const ResourceUriList = /*@__PURE__*/ S.Array(ResourceUri);
export interface UserDefinedFunctionInput {
  FunctionName?: string;
  ClassName?: string;
  OwnerName?: string;
  FunctionType?: FunctionType;
  OwnerType?: PrincipalType;
  ResourceUris?: ResourceUri[];
}
export const UserDefinedFunctionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.optional(S.String),
    ClassName: S.optional(S.String),
    OwnerName: S.optional(S.String),
    FunctionType: S.optional(FunctionType),
    OwnerType: S.optional(PrincipalType),
    ResourceUris: S.optional(ResourceUriList),
  }),
).annotate({
  identifier: "UserDefinedFunctionInput",
}) as any as S.Schema<UserDefinedFunctionInput>;
export interface CreateUserDefinedFunctionRequest {
  CatalogId?: string;
  DatabaseName: string;
  FunctionInput: UserDefinedFunctionInput;
}
export const CreateUserDefinedFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    FunctionInput: UserDefinedFunctionInput,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateUserDefinedFunctionRequest",
}) as any as S.Schema<CreateUserDefinedFunctionRequest>;
export interface CreateUserDefinedFunctionResponse {}
export const CreateUserDefinedFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateUserDefinedFunctionResponse",
}) as any as S.Schema<CreateUserDefinedFunctionResponse>;
export type WorkflowDescriptionString = string;
export interface CreateWorkflowRequest {
  Name: string;
  Description?: string;
  DefaultRunProperties?: { [key: string]: string | undefined };
  Tags?: { [key: string]: string | undefined };
  MaxConcurrentRuns?: number;
}
export const CreateWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    DefaultRunProperties: S.optional(WorkflowRunProperties),
    Tags: S.optional(TagsMap),
    MaxConcurrentRuns: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateWorkflowRequest",
}) as any as S.Schema<CreateWorkflowRequest>;
export interface CreateWorkflowResponse {
  Name?: string;
}
export const CreateWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "CreateWorkflowResponse",
}) as any as S.Schema<CreateWorkflowResponse>;
export interface DeleteAssetRequest {
  Identifier: string;
}
export const DeleteAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/assets/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssetRequest",
}) as any as S.Schema<DeleteAssetRequest>;
export interface DeleteAssetResponse {}
export const DeleteAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAssetResponse",
}) as any as S.Schema<DeleteAssetResponse>;
export type AssetTypeId = string;
export interface DeleteAssetTypeRequest {
  Identifier: string;
}
export const DeleteAssetTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/asset-types/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssetTypeRequest",
}) as any as S.Schema<DeleteAssetTypeRequest>;
export interface DeleteAssetTypeResponse {}
export const DeleteAssetTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAssetTypeResponse",
}) as any as S.Schema<DeleteAssetTypeResponse>;
export type AttachmentName = string;
export interface DeleteAttachmentRequest {
  AssetIdentifier: string;
  IterableFormName?: string;
  ItemIdentifier?: string;
  AttachmentName: string;
}
export const DeleteAttachmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetIdentifier: S.String.pipe(T.HttpLabel("AssetIdentifier")),
    IterableFormName: S.optional(S.String).pipe(
      T.HttpQuery("iterableFormName"),
    ),
    ItemIdentifier: S.optional(S.String).pipe(T.HttpQuery("itemIdentifier")),
    AttachmentName: S.String.pipe(T.HttpLabel("AttachmentName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/assets/{AssetIdentifier}/attachments/{AttachmentName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAttachmentRequest",
}) as any as S.Schema<DeleteAttachmentRequest>;
export interface DeleteAttachmentResponse {
  AssetIdentifier?: string;
}
export const DeleteAttachmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AssetIdentifier: S.optional(S.String) }),
).annotate({
  identifier: "DeleteAttachmentResponse",
}) as any as S.Schema<DeleteAttachmentResponse>;
export interface DeleteBlueprintRequest {
  Name: string;
}
export const DeleteBlueprintRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteBlueprintRequest",
}) as any as S.Schema<DeleteBlueprintRequest>;
export interface DeleteBlueprintResponse {
  Name?: string;
}
export const DeleteBlueprintResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "DeleteBlueprintResponse",
}) as any as S.Schema<DeleteBlueprintResponse>;
export interface DeleteCatalogRequest {
  CatalogId: string;
}
export const DeleteCatalogRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteCatalogRequest",
}) as any as S.Schema<DeleteCatalogRequest>;
export interface DeleteCatalogResponse {}
export const DeleteCatalogResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCatalogResponse",
}) as any as S.Schema<DeleteCatalogResponse>;
export interface DeleteClassifierRequest {
  Name: string;
}
export const DeleteClassifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteClassifierRequest",
}) as any as S.Schema<DeleteClassifierRequest>;
export interface DeleteClassifierResponse {}
export const DeleteClassifierResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteClassifierResponse",
}) as any as S.Schema<DeleteClassifierResponse>;
export interface DeleteColumnStatisticsForPartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionValues: string[];
  ColumnName: string;
}
export const DeleteColumnStatisticsForPartitionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CatalogId: S.optional(S.String),
      DatabaseName: S.String,
      TableName: S.String,
      PartitionValues: ValueStringList,
      ColumnName: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteColumnStatisticsForPartitionRequest",
  }) as any as S.Schema<DeleteColumnStatisticsForPartitionRequest>;
export interface DeleteColumnStatisticsForPartitionResponse {}
export const DeleteColumnStatisticsForPartitionResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteColumnStatisticsForPartitionResponse",
  }) as any as S.Schema<DeleteColumnStatisticsForPartitionResponse>;
export interface DeleteColumnStatisticsForTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  ColumnName: string;
}
export const DeleteColumnStatisticsForTableRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CatalogId: S.optional(S.String),
      DatabaseName: S.String,
      TableName: S.String,
      ColumnName: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteColumnStatisticsForTableRequest",
}) as any as S.Schema<DeleteColumnStatisticsForTableRequest>;
export interface DeleteColumnStatisticsForTableResponse {}
export const DeleteColumnStatisticsForTableResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteColumnStatisticsForTableResponse",
}) as any as S.Schema<DeleteColumnStatisticsForTableResponse>;
export interface DeleteColumnStatisticsTaskSettingsRequest {
  DatabaseName: string;
  TableName: string;
}
export const DeleteColumnStatisticsTaskSettingsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DatabaseName: S.String, TableName: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteColumnStatisticsTaskSettingsRequest",
  }) as any as S.Schema<DeleteColumnStatisticsTaskSettingsRequest>;
export interface DeleteColumnStatisticsTaskSettingsResponse {}
export const DeleteColumnStatisticsTaskSettingsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteColumnStatisticsTaskSettingsResponse",
  }) as any as S.Schema<DeleteColumnStatisticsTaskSettingsResponse>;
export interface DeleteConnectionRequest {
  CatalogId?: string;
  ConnectionName: string;
}
export const DeleteConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.optional(S.String), ConnectionName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteConnectionRequest",
}) as any as S.Schema<DeleteConnectionRequest>;
export interface DeleteConnectionResponse {}
export const DeleteConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConnectionResponse",
}) as any as S.Schema<DeleteConnectionResponse>;
export interface DeleteConnectionTypeRequest {
  ConnectionType: string;
}
export const DeleteConnectionTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionType: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteConnectionTypeRequest",
}) as any as S.Schema<DeleteConnectionTypeRequest>;
export interface DeleteConnectionTypeResponse {}
export const DeleteConnectionTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConnectionTypeResponse",
}) as any as S.Schema<DeleteConnectionTypeResponse>;
export interface DeleteCrawlerRequest {
  Name: string;
}
export const DeleteCrawlerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteCrawlerRequest",
}) as any as S.Schema<DeleteCrawlerRequest>;
export interface DeleteCrawlerResponse {}
export const DeleteCrawlerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCrawlerResponse",
}) as any as S.Schema<DeleteCrawlerResponse>;
export interface DeleteCustomEntityTypeRequest {
  Name: string;
}
export const DeleteCustomEntityTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteCustomEntityTypeRequest",
}) as any as S.Schema<DeleteCustomEntityTypeRequest>;
export interface DeleteCustomEntityTypeResponse {
  Name?: string;
}
export const DeleteCustomEntityTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "DeleteCustomEntityTypeResponse",
}) as any as S.Schema<DeleteCustomEntityTypeResponse>;
export interface DeleteDatabaseRequest {
  CatalogId?: string;
  Name: string;
}
export const DeleteDatabaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.optional(S.String), Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDatabaseRequest",
}) as any as S.Schema<DeleteDatabaseRequest>;
export interface DeleteDatabaseResponse {}
export const DeleteDatabaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDatabaseResponse",
}) as any as S.Schema<DeleteDatabaseResponse>;
export interface DeleteDataQualityRulesetRequest {
  Name: string;
}
export const DeleteDataQualityRulesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDataQualityRulesetRequest",
}) as any as S.Schema<DeleteDataQualityRulesetRequest>;
export interface DeleteDataQualityRulesetResponse {}
export const DeleteDataQualityRulesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDataQualityRulesetResponse",
}) as any as S.Schema<DeleteDataQualityRulesetResponse>;
export interface DeleteDevEndpointRequest {
  EndpointName: string;
}
export const DeleteDevEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDevEndpointRequest",
}) as any as S.Schema<DeleteDevEndpointRequest>;
export interface DeleteDevEndpointResponse {}
export const DeleteDevEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDevEndpointResponse",
}) as any as S.Schema<DeleteDevEndpointResponse>;
export interface DeleteFormTypeRequest {
  Identifier: string;
}
export const DeleteFormTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/form-types/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFormTypeRequest",
}) as any as S.Schema<DeleteFormTypeRequest>;
export interface DeleteFormTypeResponse {}
export const DeleteFormTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFormTypeResponse",
}) as any as S.Schema<DeleteFormTypeResponse>;
export interface DeleteGlossaryRequest {
  Identifier: string;
}
export const DeleteGlossaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/glossaries/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGlossaryRequest",
}) as any as S.Schema<DeleteGlossaryRequest>;
export interface DeleteGlossaryResponse {}
export const DeleteGlossaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGlossaryResponse",
}) as any as S.Schema<DeleteGlossaryResponse>;
export interface DeleteGlossaryTermRequest {
  Identifier: string;
}
export const DeleteGlossaryTermRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/glossary-terms/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGlossaryTermRequest",
}) as any as S.Schema<DeleteGlossaryTermRequest>;
export interface DeleteGlossaryTermResponse {}
export const DeleteGlossaryTermResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGlossaryTermResponse",
}) as any as S.Schema<DeleteGlossaryTermResponse>;
export interface DeleteGlueIdentityCenterConfigurationRequest {}
export const DeleteGlueIdentityCenterConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteGlueIdentityCenterConfigurationRequest",
  }) as any as S.Schema<DeleteGlueIdentityCenterConfigurationRequest>;
export interface DeleteGlueIdentityCenterConfigurationResponse {}
export const DeleteGlueIdentityCenterConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteGlueIdentityCenterConfigurationResponse",
  }) as any as S.Schema<DeleteGlueIdentityCenterConfigurationResponse>;
export interface DeleteIntegrationRequest {
  IntegrationIdentifier: string;
}
export const DeleteIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IntegrationIdentifier: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteIntegrationRequest",
}) as any as S.Schema<DeleteIntegrationRequest>;
export interface DeleteIntegrationResponse {
  SourceArn: string;
  TargetArn: string;
  IntegrationName: string;
  Description?: string;
  IntegrationArn: string;
  KmsKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
  Status: IntegrationStatus;
  CreateTime: Date;
  Errors?: IntegrationError[];
  DataFilter?: string;
}
export const DeleteIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceArn: S.String,
    TargetArn: S.String,
    IntegrationName: S.String,
    Description: S.optional(S.String),
    IntegrationArn: S.String,
    KmsKeyId: S.optional(S.String),
    AdditionalEncryptionContext: S.optional(
      IntegrationAdditionalEncryptionContextMap,
    ),
    Tags: S.optional(IntegrationTagsList),
    Status: IntegrationStatus,
    CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Errors: S.optional(IntegrationErrorList),
    DataFilter: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteIntegrationResponse",
}) as any as S.Schema<DeleteIntegrationResponse>;
export interface DeleteIntegrationResourcePropertyRequest {
  ResourceArn: string;
}
export const DeleteIntegrationResourcePropertyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ResourceArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteIntegrationResourcePropertyRequest",
}) as any as S.Schema<DeleteIntegrationResourcePropertyRequest>;
export interface DeleteIntegrationResourcePropertyResponse {}
export const DeleteIntegrationResourcePropertyResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteIntegrationResourcePropertyResponse",
  }) as any as S.Schema<DeleteIntegrationResourcePropertyResponse>;
export interface DeleteIntegrationTablePropertiesRequest {
  ResourceArn: string;
  TableName: string;
}
export const DeleteIntegrationTablePropertiesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ResourceArn: S.String, TableName: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteIntegrationTablePropertiesRequest",
}) as any as S.Schema<DeleteIntegrationTablePropertiesRequest>;
export interface DeleteIntegrationTablePropertiesResponse {}
export const DeleteIntegrationTablePropertiesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteIntegrationTablePropertiesResponse",
}) as any as S.Schema<DeleteIntegrationTablePropertiesResponse>;
export interface DeleteJobRequest {
  JobName: string;
}
export const DeleteJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteJobRequest",
}) as any as S.Schema<DeleteJobRequest>;
export interface DeleteJobResponse {
  JobName?: string;
}
export const DeleteJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobName: S.optional(S.String) }),
).annotate({
  identifier: "DeleteJobResponse",
}) as any as S.Schema<DeleteJobResponse>;
export interface DeleteMLTransformRequest {
  TransformId: string;
}
export const DeleteMLTransformRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransformId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteMLTransformRequest",
}) as any as S.Schema<DeleteMLTransformRequest>;
export interface DeleteMLTransformResponse {
  TransformId?: string;
}
export const DeleteMLTransformResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransformId: S.optional(S.String) }),
).annotate({
  identifier: "DeleteMLTransformResponse",
}) as any as S.Schema<DeleteMLTransformResponse>;
export interface DeletePartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionValues: string[];
}
export const DeletePartitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    PartitionValues: ValueStringList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePartitionRequest",
}) as any as S.Schema<DeletePartitionRequest>;
export interface DeletePartitionResponse {}
export const DeletePartitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePartitionResponse",
}) as any as S.Schema<DeletePartitionResponse>;
export interface DeletePartitionIndexRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  IndexName: string;
}
export const DeletePartitionIndexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    IndexName: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePartitionIndexRequest",
}) as any as S.Schema<DeletePartitionIndexRequest>;
export interface DeletePartitionIndexResponse {}
export const DeletePartitionIndexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePartitionIndexResponse",
}) as any as S.Schema<DeletePartitionIndexResponse>;
export interface DeleteRegistryInput {
  RegistryId: RegistryId;
}
export const DeleteRegistryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegistryId: RegistryId }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRegistryInput",
}) as any as S.Schema<DeleteRegistryInput>;
export type RegistryStatus = "AVAILABLE" | "DELETING" | (string & {});
export const RegistryStatus = /*@__PURE__*/ S.String;

export interface DeleteRegistryResponse {
  RegistryName?: string;
  RegistryArn?: string;
  Status?: RegistryStatus;
}
export const DeleteRegistryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryName: S.optional(S.String),
    RegistryArn: S.optional(S.String),
    Status: S.optional(RegistryStatus),
  }),
).annotate({
  identifier: "DeleteRegistryResponse",
}) as any as S.Schema<DeleteRegistryResponse>;
export interface DeleteResourcePolicyRequest {
  PolicyHashCondition?: string;
  ResourceArn?: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyHashCondition: S.optional(S.String),
    ResourceArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResponse {}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export interface DeleteSchemaInput {
  SchemaId: SchemaId;
}
export const DeleteSchemaInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SchemaId: SchemaId }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteSchemaInput",
}) as any as S.Schema<DeleteSchemaInput>;
export interface DeleteSchemaResponse {
  SchemaArn?: string;
  SchemaName?: string;
  Status?: SchemaStatus;
}
export const DeleteSchemaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaArn: S.optional(S.String),
    SchemaName: S.optional(S.String),
    Status: S.optional(SchemaStatus),
  }),
).annotate({
  identifier: "DeleteSchemaResponse",
}) as any as S.Schema<DeleteSchemaResponse>;
export type VersionsString = string;
export interface DeleteSchemaVersionsInput {
  SchemaId: SchemaId;
  Versions: string;
}
export const DeleteSchemaVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SchemaId: SchemaId, Versions: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteSchemaVersionsInput",
}) as any as S.Schema<DeleteSchemaVersionsInput>;
export type ErrorCodeString = string;
export type ErrorMessageString = string;
export interface ErrorDetails {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const ErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "ErrorDetails" }) as any as S.Schema<ErrorDetails>;
export interface SchemaVersionErrorItem {
  VersionNumber?: number;
  ErrorDetails?: ErrorDetails;
}
export const SchemaVersionErrorItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VersionNumber: S.optional(S.Number),
    ErrorDetails: S.optional(ErrorDetails),
  }),
).annotate({
  identifier: "SchemaVersionErrorItem",
}) as any as S.Schema<SchemaVersionErrorItem>;
export type SchemaVersionErrorList = SchemaVersionErrorItem[];
export const SchemaVersionErrorList = /*@__PURE__*/ S.Array(
  SchemaVersionErrorItem,
);
export interface DeleteSchemaVersionsResponse {
  SchemaVersionErrors?: SchemaVersionErrorItem[];
}
export const DeleteSchemaVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SchemaVersionErrors: S.optional(SchemaVersionErrorList) }),
).annotate({
  identifier: "DeleteSchemaVersionsResponse",
}) as any as S.Schema<DeleteSchemaVersionsResponse>;
export interface DeleteSecurityConfigurationRequest {
  Name: string;
}
export const DeleteSecurityConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteSecurityConfigurationRequest",
}) as any as S.Schema<DeleteSecurityConfigurationRequest>;
export interface DeleteSecurityConfigurationResponse {}
export const DeleteSecurityConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSecurityConfigurationResponse",
}) as any as S.Schema<DeleteSecurityConfigurationResponse>;
export interface DeleteSessionRequest {
  Id: string;
  RequestOrigin?: string;
}
export const DeleteSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, RequestOrigin: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteSessionRequest",
}) as any as S.Schema<DeleteSessionRequest>;
export interface DeleteSessionResponse {
  Id?: string;
}
export const DeleteSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }),
).annotate({
  identifier: "DeleteSessionResponse",
}) as any as S.Schema<DeleteSessionResponse>;
export interface DeleteTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  Name: string;
  TransactionId?: string;
}
export const DeleteTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    Name: S.String,
    TransactionId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteTableRequest",
}) as any as S.Schema<DeleteTableRequest>;
export interface DeleteTableResponse {}
export const DeleteTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTableResponse",
}) as any as S.Schema<DeleteTableResponse>;
export interface DeleteTableOptimizerRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  Type: TableOptimizerType;
}
export const DeleteTableOptimizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.String,
    DatabaseName: S.String,
    TableName: S.String,
    Type: TableOptimizerType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteTableOptimizerRequest",
}) as any as S.Schema<DeleteTableOptimizerRequest>;
export interface DeleteTableOptimizerResponse {}
export const DeleteTableOptimizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTableOptimizerResponse",
}) as any as S.Schema<DeleteTableOptimizerResponse>;
export interface DeleteTableVersionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  VersionId: string;
}
export const DeleteTableVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    VersionId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteTableVersionRequest",
}) as any as S.Schema<DeleteTableVersionRequest>;
export interface DeleteTableVersionResponse {}
export const DeleteTableVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTableVersionResponse",
}) as any as S.Schema<DeleteTableVersionResponse>;
export interface DeleteTriggerRequest {
  Name: string;
}
export const DeleteTriggerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteTriggerRequest",
}) as any as S.Schema<DeleteTriggerRequest>;
export interface DeleteTriggerResponse {
  Name?: string;
}
export const DeleteTriggerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "DeleteTriggerResponse",
}) as any as S.Schema<DeleteTriggerResponse>;
export interface DeleteUsageProfileRequest {
  Name: string;
}
export const DeleteUsageProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteUsageProfileRequest",
}) as any as S.Schema<DeleteUsageProfileRequest>;
export interface DeleteUsageProfileResponse {}
export const DeleteUsageProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteUsageProfileResponse",
}) as any as S.Schema<DeleteUsageProfileResponse>;
export interface DeleteUserDefinedFunctionRequest {
  CatalogId?: string;
  DatabaseName: string;
  FunctionName: string;
}
export const DeleteUserDefinedFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    FunctionName: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteUserDefinedFunctionRequest",
}) as any as S.Schema<DeleteUserDefinedFunctionRequest>;
export interface DeleteUserDefinedFunctionResponse {}
export const DeleteUserDefinedFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteUserDefinedFunctionResponse",
}) as any as S.Schema<DeleteUserDefinedFunctionResponse>;
export interface DeleteWorkflowRequest {
  Name: string;
}
export const DeleteWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteWorkflowRequest",
}) as any as S.Schema<DeleteWorkflowRequest>;
export interface DeleteWorkflowResponse {
  Name?: string;
}
export const DeleteWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "DeleteWorkflowResponse",
}) as any as S.Schema<DeleteWorkflowResponse>;
export interface DescribeConnectionTypeRequest {
  ConnectionType: string;
}
export const DescribeConnectionTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionType: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeConnectionTypeRequest",
}) as any as S.Schema<DescribeConnectionTypeRequest>;
export type Description = string;
export type AuthenticationTypes = AuthenticationType[];
export const AuthenticationTypes = /*@__PURE__*/ S.Array(AuthenticationType);
export type DataOperation = "READ" | "WRITE" | (string & {});
export const DataOperation = /*@__PURE__*/ S.String;

export type DataOperations = DataOperation[];
export const DataOperations = /*@__PURE__*/ S.Array(DataOperation);
export type ComputeEnvironments = ComputeEnvironment[];
export const ComputeEnvironments = /*@__PURE__*/ S.Array(ComputeEnvironment);
export interface Capabilities {
  SupportedAuthenticationTypes: AuthenticationType[];
  SupportedDataOperations: DataOperation[];
  SupportedComputeEnvironments: ComputeEnvironment[];
}
export const Capabilities = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SupportedAuthenticationTypes: AuthenticationTypes,
    SupportedDataOperations: DataOperations,
    SupportedComputeEnvironments: ComputeEnvironments,
  }),
).annotate({ identifier: "Capabilities" }) as any as S.Schema<Capabilities>;
export type PropertyName = string;
export type PropertyDescriptionString = string;
export type PropertyType =
  | "USER_INPUT"
  | "SECRET"
  | "READ_ONLY"
  | "UNUSED"
  | "SECRET_OR_USER_INPUT"
  | (string & {});
export const PropertyType = /*@__PURE__*/ S.String;

export type PropertyTypes = PropertyType[];
export const PropertyTypes = /*@__PURE__*/ S.Array(PropertyType);
export type AllowedValueDescriptionString = string;
export type AllowedValueValueString = string;
export interface AllowedValue {
  Description?: string;
  Value: string;
}
export const AllowedValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Description: S.optional(S.String), Value: S.String }),
).annotate({ identifier: "AllowedValue" }) as any as S.Schema<AllowedValue>;
export type AllowedValues = AllowedValue[];
export const AllowedValues = /*@__PURE__*/ S.Array(AllowedValue);
export type PropertyLocation =
  | "HEADER"
  | "BODY"
  | "QUERY_PARAM"
  | "PATH"
  | (string & {});
export const PropertyLocation = /*@__PURE__*/ S.String;

export interface Property {
  Name: string;
  Description: string;
  Required: boolean;
  DefaultValue?: string;
  PropertyTypes: PropertyType[];
  AllowedValues?: AllowedValue[];
  DataOperationScopes?: DataOperation[];
  KeyOverride?: string;
  PropertyLocation?: PropertyLocation;
}
export const Property = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.String,
    Required: S.Boolean,
    DefaultValue: S.optional(S.String),
    PropertyTypes: PropertyTypes,
    AllowedValues: S.optional(AllowedValues),
    DataOperationScopes: S.optional(DataOperations),
    KeyOverride: S.optional(S.String),
    PropertyLocation: S.optional(PropertyLocation),
  }),
).annotate({ identifier: "Property" }) as any as S.Schema<Property>;
export type PropertiesMap = { [key: string]: Property | undefined };
export const PropertiesMap = /*@__PURE__*/ S.Record(
  S.String,
  Property.pipe(S.optional),
);
export interface AuthConfiguration {
  AuthenticationType: Property;
  SecretArn?: Property;
  OAuth2Properties?: { [key: string]: Property | undefined };
  BasicAuthenticationProperties?: { [key: string]: Property | undefined };
  CustomAuthenticationProperties?: { [key: string]: Property | undefined };
}
export const AuthConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationType: Property,
    SecretArn: S.optional(Property),
    OAuth2Properties: S.optional(PropertiesMap),
    BasicAuthenticationProperties: S.optional(PropertiesMap),
    CustomAuthenticationProperties: S.optional(PropertiesMap),
  }),
).annotate({
  identifier: "AuthConfiguration",
}) as any as S.Schema<AuthConfiguration>;
export type ComputeEnvironmentName = string;
export type ComputeEnvironmentConfigurationDescriptionString = string;
export type PropertyNameOverrides = { [key: string]: string | undefined };
export const PropertyNameOverrides = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ListOfString = string[];
export const ListOfString = /*@__PURE__*/ S.Array(S.String);
export interface ComputeEnvironmentConfiguration {
  Name: string;
  Description: string;
  ComputeEnvironment: ComputeEnvironment;
  SupportedAuthenticationTypes: AuthenticationType[];
  ConnectionOptions: { [key: string]: Property | undefined };
  ConnectionPropertyNameOverrides: { [key: string]: string | undefined };
  ConnectionOptionNameOverrides: { [key: string]: string | undefined };
  ConnectionPropertiesRequiredOverrides: string[];
  PhysicalConnectionPropertiesRequired?: boolean;
}
export const ComputeEnvironmentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.String,
    ComputeEnvironment: ComputeEnvironment,
    SupportedAuthenticationTypes: AuthenticationTypes,
    ConnectionOptions: PropertiesMap,
    ConnectionPropertyNameOverrides: PropertyNameOverrides,
    ConnectionOptionNameOverrides: PropertyNameOverrides,
    ConnectionPropertiesRequiredOverrides: ListOfString,
    PhysicalConnectionPropertiesRequired: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ComputeEnvironmentConfiguration",
}) as any as S.Schema<ComputeEnvironmentConfiguration>;
export type ComputeEnvironmentConfigurationMap = {
  [key: string]: ComputeEnvironmentConfiguration | undefined;
};
export const ComputeEnvironmentConfigurationMap = /*@__PURE__*/ S.Record(
  S.String,
  ComputeEnvironmentConfiguration.pipe(S.optional),
);
export type HTTPMethod = "GET" | "POST" | (string & {});
export const HTTPMethod = /*@__PURE__*/ S.String;

export type PathString = string;
export type ConnectorPropertyKey = string;
export interface ConnectorProperty {
  Name: string;
  KeyOverride?: string;
  Required: boolean;
  DefaultValue?: string;
  AllowedValues?: string[];
  PropertyLocation?: PropertyLocation;
  PropertyType: PropertyType;
}
export const ConnectorProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    KeyOverride: S.optional(S.String),
    Required: S.Boolean,
    DefaultValue: S.optional(S.String),
    AllowedValues: S.optional(ListOfString),
    PropertyLocation: S.optional(PropertyLocation),
    PropertyType: PropertyType,
  }),
).annotate({
  identifier: "ConnectorProperty",
}) as any as S.Schema<ConnectorProperty>;
export type ConnectorPropertyList = ConnectorProperty[];
export const ConnectorPropertyList = /*@__PURE__*/ S.Array(ConnectorProperty);
export type JsonPathString = string;
export interface ResponseConfiguration {
  ResultPath: string;
  ErrorPath?: string;
}
export const ResponseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResultPath: S.String, ErrorPath: S.optional(S.String) }),
).annotate({
  identifier: "ResponseConfiguration",
}) as any as S.Schema<ResponseConfiguration>;
export type DefaultValue = string;
export interface ResponseExtractionMapping {
  ContentPath?: string;
  HeaderKey?: string;
}
export const ResponseExtractionMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentPath: S.optional(S.String),
    HeaderKey: S.optional(S.String),
  }),
).annotate({
  identifier: "ResponseExtractionMapping",
}) as any as S.Schema<ResponseExtractionMapping>;
export interface ExtractedParameter {
  Key?: string;
  DefaultValue?: string;
  PropertyLocation?: PropertyLocation;
  Value?: ResponseExtractionMapping;
}
export const ExtractedParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    DefaultValue: S.optional(S.String),
    PropertyLocation: S.optional(PropertyLocation),
    Value: S.optional(ResponseExtractionMapping),
  }),
).annotate({
  identifier: "ExtractedParameter",
}) as any as S.Schema<ExtractedParameter>;
export interface CursorConfiguration {
  NextPage: ExtractedParameter;
  LimitParameter?: ExtractedParameter;
}
export const CursorConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextPage: ExtractedParameter,
    LimitParameter: S.optional(ExtractedParameter),
  }),
).annotate({
  identifier: "CursorConfiguration",
}) as any as S.Schema<CursorConfiguration>;
export interface OffsetConfiguration {
  OffsetParameter: ExtractedParameter;
  LimitParameter: ExtractedParameter;
}
export const OffsetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OffsetParameter: ExtractedParameter,
    LimitParameter: ExtractedParameter,
  }),
).annotate({
  identifier: "OffsetConfiguration",
}) as any as S.Schema<OffsetConfiguration>;
export interface PaginationConfiguration {
  CursorConfiguration?: CursorConfiguration;
  OffsetConfiguration?: OffsetConfiguration;
}
export const PaginationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CursorConfiguration: S.optional(CursorConfiguration),
    OffsetConfiguration: S.optional(OffsetConfiguration),
  }),
).annotate({
  identifier: "PaginationConfiguration",
}) as any as S.Schema<PaginationConfiguration>;
export interface SourceConfiguration {
  RequestMethod?: HTTPMethod;
  RequestPath?: string;
  RequestParameters?: ConnectorProperty[];
  ResponseConfiguration?: ResponseConfiguration;
  PaginationConfiguration?: PaginationConfiguration;
}
export const SourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RequestMethod: S.optional(HTTPMethod),
    RequestPath: S.optional(S.String),
    RequestParameters: S.optional(ConnectorPropertyList),
    ResponseConfiguration: S.optional(ResponseConfiguration),
    PaginationConfiguration: S.optional(PaginationConfiguration),
  }),
).annotate({
  identifier: "SourceConfiguration",
}) as any as S.Schema<SourceConfiguration>;
export type EntityConfigurationMapKeyString = string;
export type FieldDefinitionMapKeyString = string;
export type FieldDataType =
  | "INT"
  | "SMALLINT"
  | "BIGINT"
  | "FLOAT"
  | "LONG"
  | "DATE"
  | "BOOLEAN"
  | "MAP"
  | "ARRAY"
  | "STRING"
  | "TIMESTAMP"
  | "DECIMAL"
  | "BYTE"
  | "SHORT"
  | "DOUBLE"
  | "STRUCT"
  | "BINARY"
  | "UNION"
  | (string & {});
export const FieldDataType = /*@__PURE__*/ S.String;

export interface FieldDefinition {
  Name: string;
  FieldDataType: FieldDataType;
}
export const FieldDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, FieldDataType: FieldDataType }),
).annotate({
  identifier: "FieldDefinition",
}) as any as S.Schema<FieldDefinition>;
export type FieldDefinitionMap = { [key: string]: FieldDefinition | undefined };
export const FieldDefinitionMap = /*@__PURE__*/ S.Record(
  S.String,
  FieldDefinition.pipe(S.optional),
);
export interface EntityConfiguration {
  SourceConfiguration?: SourceConfiguration;
  Schema?: { [key: string]: FieldDefinition | undefined };
}
export const EntityConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceConfiguration: S.optional(SourceConfiguration),
    Schema: S.optional(FieldDefinitionMap),
  }),
).annotate({
  identifier: "EntityConfiguration",
}) as any as S.Schema<EntityConfiguration>;
export type EntityConfigurationMap = {
  [key: string]: EntityConfiguration | undefined;
};
export const EntityConfigurationMap = /*@__PURE__*/ S.Record(
  S.String,
  EntityConfiguration.pipe(S.optional),
);
export interface RestConfiguration {
  GlobalSourceConfiguration?: SourceConfiguration;
  ValidationEndpointConfiguration?: SourceConfiguration;
  EntityConfigurations?: { [key: string]: EntityConfiguration | undefined };
}
export const RestConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalSourceConfiguration: S.optional(SourceConfiguration),
    ValidationEndpointConfiguration: S.optional(SourceConfiguration),
    EntityConfigurations: S.optional(EntityConfigurationMap),
  }),
).annotate({
  identifier: "RestConfiguration",
}) as any as S.Schema<RestConfiguration>;
export interface DescribeConnectionTypeResponse {
  ConnectionType?: string;
  Description?: string;
  Capabilities?: Capabilities;
  ConnectionProperties?: { [key: string]: Property | undefined };
  ConnectionOptions?: { [key: string]: Property | undefined };
  AuthenticationConfiguration?: AuthConfiguration;
  ComputeEnvironmentConfigurations?: {
    [key: string]: ComputeEnvironmentConfiguration | undefined;
  };
  PhysicalConnectionRequirements?: { [key: string]: Property | undefined };
  AthenaConnectionProperties?: { [key: string]: Property | undefined };
  PythonConnectionProperties?: { [key: string]: Property | undefined };
  SparkConnectionProperties?: { [key: string]: Property | undefined };
  RestConfiguration?: RestConfiguration;
}
export const DescribeConnectionTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionType: S.optional(S.String),
    Description: S.optional(S.String),
    Capabilities: S.optional(Capabilities),
    ConnectionProperties: S.optional(PropertiesMap),
    ConnectionOptions: S.optional(PropertiesMap),
    AuthenticationConfiguration: S.optional(AuthConfiguration),
    ComputeEnvironmentConfigurations: S.optional(
      ComputeEnvironmentConfigurationMap,
    ),
    PhysicalConnectionRequirements: S.optional(PropertiesMap),
    AthenaConnectionProperties: S.optional(PropertiesMap),
    PythonConnectionProperties: S.optional(PropertiesMap),
    SparkConnectionProperties: S.optional(PropertiesMap),
    RestConfiguration: S.optional(RestConfiguration),
  }),
).annotate({
  identifier: "DescribeConnectionTypeResponse",
}) as any as S.Schema<DescribeConnectionTypeResponse>;
export type EntityName = string;
export type NextToken = string;
export type ApiVersion = string;
export interface DescribeEntityRequest {
  ConnectionName: string;
  CatalogId?: string;
  EntityName: string;
  NextToken?: string;
  DataStoreApiVersion?: string;
}
export const DescribeEntityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionName: S.String,
    CatalogId: S.optional(S.String),
    EntityName: S.String,
    NextToken: S.optional(S.String),
    DataStoreApiVersion: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeEntityRequest",
}) as any as S.Schema<DescribeEntityRequest>;
export type EntityFieldName = string;
export type FieldLabel = string;
export type FieldDescription = string;
export type FieldFilterOperator =
  | "LESS_THAN"
  | "GREATER_THAN"
  | "BETWEEN"
  | "EQUAL_TO"
  | "NOT_EQUAL_TO"
  | "GREATER_THAN_OR_EQUAL_TO"
  | "LESS_THAN_OR_EQUAL_TO"
  | "CONTAINS"
  | "ORDER_BY"
  | (string & {});
export const FieldFilterOperator = /*@__PURE__*/ S.String;

export type FieldFilterOperatorsList = FieldFilterOperator[];
export const FieldFilterOperatorsList =
  /*@__PURE__*/ S.Array(FieldFilterOperator);
export type CustomProperties = { [key: string]: string | undefined };
export const CustomProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Field {
  FieldName?: string;
  Label?: string;
  Description?: string;
  FieldType?: FieldDataType;
  IsPrimaryKey?: boolean;
  IsNullable?: boolean;
  IsRetrievable?: boolean;
  IsFilterable?: boolean;
  IsPartitionable?: boolean;
  IsCreateable?: boolean;
  IsUpdateable?: boolean;
  IsUpsertable?: boolean;
  IsDefaultOnCreate?: boolean;
  SupportedValues?: string[];
  SupportedFilterOperators?: FieldFilterOperator[];
  ParentField?: string;
  NativeDataType?: string;
  CustomProperties?: { [key: string]: string | undefined };
}
export const Field = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(S.String),
    Label: S.optional(S.String),
    Description: S.optional(S.String),
    FieldType: S.optional(FieldDataType),
    IsPrimaryKey: S.optional(S.Boolean),
    IsNullable: S.optional(S.Boolean),
    IsRetrievable: S.optional(S.Boolean),
    IsFilterable: S.optional(S.Boolean),
    IsPartitionable: S.optional(S.Boolean),
    IsCreateable: S.optional(S.Boolean),
    IsUpdateable: S.optional(S.Boolean),
    IsUpsertable: S.optional(S.Boolean),
    IsDefaultOnCreate: S.optional(S.Boolean),
    SupportedValues: S.optional(ListOfString),
    SupportedFilterOperators: S.optional(FieldFilterOperatorsList),
    ParentField: S.optional(S.String),
    NativeDataType: S.optional(S.String),
    CustomProperties: S.optional(CustomProperties),
  }),
).annotate({ identifier: "Field" }) as any as S.Schema<Field>;
export type FieldsList = Field[];
export const FieldsList = /*@__PURE__*/ S.Array(Field);
export interface DescribeEntityResponse {
  Fields?: Field[];
  NextToken?: string;
}
export const DescribeEntityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fields: S.optional(FieldsList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeEntityResponse",
}) as any as S.Schema<DescribeEntityResponse>;
export type IntegrationInteger = number;
export interface DescribeInboundIntegrationsRequest {
  IntegrationArn?: string;
  Marker?: string;
  MaxRecords?: number;
  TargetArn?: string;
}
export const DescribeInboundIntegrationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegrationArn: S.optional(S.String),
    Marker: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    TargetArn: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeInboundIntegrationsRequest",
}) as any as S.Schema<DescribeInboundIntegrationsRequest>;
export interface InboundIntegration {
  SourceArn: string;
  TargetArn: string;
  IntegrationArn: string;
  Status: IntegrationStatus;
  CreateTime: Date;
  IntegrationConfig?: IntegrationConfig;
  Errors?: IntegrationError[];
}
export const InboundIntegration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceArn: S.String,
    TargetArn: S.String,
    IntegrationArn: S.String,
    Status: IntegrationStatus,
    CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    IntegrationConfig: S.optional(IntegrationConfig),
    Errors: S.optional(IntegrationErrorList),
  }),
).annotate({
  identifier: "InboundIntegration",
}) as any as S.Schema<InboundIntegration>;
export type InboundIntegrationsList = InboundIntegration[];
export const InboundIntegrationsList =
  /*@__PURE__*/ S.Array(InboundIntegration);
export interface DescribeInboundIntegrationsResponse {
  InboundIntegrations?: InboundIntegration[];
  Marker?: string;
}
export const DescribeInboundIntegrationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InboundIntegrations: S.optional(InboundIntegrationsList),
    Marker: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeInboundIntegrationsResponse",
}) as any as S.Schema<DescribeInboundIntegrationsResponse>;
export type IntegrationFilterValues = string[];
export const IntegrationFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface IntegrationFilter {
  Name?: string;
  Values?: string[];
}
export const IntegrationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Values: S.optional(IntegrationFilterValues),
  }),
).annotate({
  identifier: "IntegrationFilter",
}) as any as S.Schema<IntegrationFilter>;
export type IntegrationFilterList = IntegrationFilter[];
export const IntegrationFilterList = /*@__PURE__*/ S.Array(IntegrationFilter);
export interface DescribeIntegrationsRequest {
  IntegrationIdentifier?: string;
  Marker?: string;
  MaxRecords?: number;
  Filters?: IntegrationFilter[];
}
export const DescribeIntegrationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegrationIdentifier: S.optional(S.String),
    Marker: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
    Filters: S.optional(IntegrationFilterList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeIntegrationsRequest",
}) as any as S.Schema<DescribeIntegrationsRequest>;
export interface Integration {
  SourceArn: string;
  TargetArn: string;
  Description?: string;
  IntegrationName: string;
  IntegrationArn: string;
  KmsKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
  Status: IntegrationStatus;
  CreateTime: Date;
  IntegrationConfig?: IntegrationConfig;
  Errors?: IntegrationError[];
  DataFilter?: string;
}
export const Integration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceArn: S.String,
    TargetArn: S.String,
    Description: S.optional(S.String),
    IntegrationName: S.String,
    IntegrationArn: S.String,
    KmsKeyId: S.optional(S.String),
    AdditionalEncryptionContext: S.optional(
      IntegrationAdditionalEncryptionContextMap,
    ),
    Tags: S.optional(IntegrationTagsList),
    Status: IntegrationStatus,
    CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    IntegrationConfig: S.optional(IntegrationConfig),
    Errors: S.optional(IntegrationErrorList),
    DataFilter: S.optional(S.String),
  }),
).annotate({ identifier: "Integration" }) as any as S.Schema<Integration>;
export type IntegrationsList = Integration[];
export const IntegrationsList = /*@__PURE__*/ S.Array(Integration);
export interface DescribeIntegrationsResponse {
  Integrations?: Integration[];
  Marker?: string;
}
export const DescribeIntegrationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Integrations: S.optional(IntegrationsList),
    Marker: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeIntegrationsResponse",
}) as any as S.Schema<DescribeIntegrationsResponse>;
export interface DisassociateGlossaryTermsRequest {
  AssetIdentifier: string;
  GlossaryTermIdentifiers: string[];
  ClientToken?: string;
}
export const DisassociateGlossaryTermsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetIdentifier: S.String.pipe(T.HttpLabel("AssetIdentifier")),
    GlossaryTermIdentifiers: GlossaryTermIdList,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/assets/{AssetIdentifier}/disassociate-glossary-terms",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateGlossaryTermsRequest",
}) as any as S.Schema<DisassociateGlossaryTermsRequest>;
export interface DisassociateGlossaryTermsResponse {
  AssetIdentifier?: string;
  GlossaryTerms?: string[];
}
export const DisassociateGlossaryTermsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetIdentifier: S.optional(S.String),
    GlossaryTerms: S.optional(GlossaryTermIdList),
  }),
).annotate({
  identifier: "DisassociateGlossaryTermsResponse",
}) as any as S.Schema<DisassociateGlossaryTermsResponse>;
export interface GetAssetInput {
  Identifier: string;
}
export const GetAssetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assets/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetAssetInput" }) as any as S.Schema<GetAssetInput>;
export type AssetName = string;
export type AssetDescription = string;
export type CreatedAt = Date;
export type UpdatedAt = Date;
export type IterableFormKey = string;
export interface IterableFormEntry {
  FormTypeId?: string;
}
export const IterableFormEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FormTypeId: S.optional(S.String) }),
).annotate({
  identifier: "IterableFormEntry",
}) as any as S.Schema<IterableFormEntry>;
export type IterableFormMap = { [key: string]: IterableFormEntry | undefined };
export const IterableFormMap = /*@__PURE__*/ S.Record(
  S.String,
  IterableFormEntry.pipe(S.optional),
);
export interface GetAssetOutput {
  Id: string;
  Name?: string;
  Description?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  AssetTypeId: string;
  GlossaryTerms?: string[];
  Forms?: { [key: string]: AssetFormEntry | undefined };
  Attachments?: { [key: string]: AssetFormEntry | undefined };
  IterableForms?: { [key: string]: IterableFormEntry | undefined };
}
export const GetAssetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AssetTypeId: S.String,
    GlossaryTerms: S.optional(GlossaryTermIdList),
    Forms: S.optional(AssetFormMap),
    Attachments: S.optional(AssetFormMap),
    IterableForms: S.optional(IterableFormMap),
  }),
).annotate({ identifier: "GetAssetOutput" }) as any as S.Schema<GetAssetOutput>;
export interface GetAssetTypeRequest {
  Identifier: string;
}
export const GetAssetTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/asset-types/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAssetTypeRequest",
}) as any as S.Schema<GetAssetTypeRequest>;
export type AssetTypeName = string;
export type AssetTypeFormKey = string;
export interface AssetTypeFormReference {
  FormTypeIdentifier: string;
}
export const AssetTypeFormReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FormTypeIdentifier: S.String }),
).annotate({
  identifier: "AssetTypeFormReference",
}) as any as S.Schema<AssetTypeFormReference>;
export type AssetTypeFormsMap = {
  [key: string]: AssetTypeFormReference | undefined;
};
export const AssetTypeFormsMap = /*@__PURE__*/ S.Record(
  S.String,
  AssetTypeFormReference.pipe(S.optional),
);
export interface GetAssetTypeResponse {
  Id?: string;
  Name?: string;
  Forms?: { [key: string]: AssetTypeFormReference | undefined };
}
export const GetAssetTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Forms: S.optional(AssetTypeFormsMap),
  }),
).annotate({
  identifier: "GetAssetTypeResponse",
}) as any as S.Schema<GetAssetTypeResponse>;
export interface GetBlueprintRequest {
  Name: string;
  IncludeBlueprint?: boolean;
  IncludeParameterSpec?: boolean;
}
export const GetBlueprintRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    IncludeBlueprint: S.optional(S.Boolean),
    IncludeParameterSpec: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetBlueprintRequest",
}) as any as S.Schema<GetBlueprintRequest>;
export interface GetBlueprintResponse {
  Blueprint?: Blueprint;
}
export const GetBlueprintResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Blueprint: S.optional(Blueprint) }),
).annotate({
  identifier: "GetBlueprintResponse",
}) as any as S.Schema<GetBlueprintResponse>;
export interface GetBlueprintRunRequest {
  BlueprintName: string;
  RunId: string;
}
export const GetBlueprintRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BlueprintName: S.String, RunId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetBlueprintRunRequest",
}) as any as S.Schema<GetBlueprintRunRequest>;
export type BlueprintRunState =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "ROLLING_BACK"
  | (string & {});
export const BlueprintRunState = /*@__PURE__*/ S.String;

export type BlueprintParameters = string;
export type OrchestrationIAMRoleArn = string;
export interface BlueprintRun {
  BlueprintName?: string;
  RunId?: string;
  WorkflowName?: string;
  State?: BlueprintRunState;
  StartedOn?: Date;
  CompletedOn?: Date;
  ErrorMessage?: string;
  RollbackErrorMessage?: string;
  Parameters?: string;
  RoleArn?: string;
}
export const BlueprintRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlueprintName: S.optional(S.String),
    RunId: S.optional(S.String),
    WorkflowName: S.optional(S.String),
    State: S.optional(BlueprintRunState),
    StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ErrorMessage: S.optional(S.String),
    RollbackErrorMessage: S.optional(S.String),
    Parameters: S.optional(S.String),
    RoleArn: S.optional(S.String),
  }),
).annotate({ identifier: "BlueprintRun" }) as any as S.Schema<BlueprintRun>;
export interface GetBlueprintRunResponse {
  BlueprintRun?: BlueprintRun;
}
export const GetBlueprintRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BlueprintRun: S.optional(BlueprintRun) }),
).annotate({
  identifier: "GetBlueprintRunResponse",
}) as any as S.Schema<GetBlueprintRunResponse>;
export type PageSize = number;
export interface GetBlueprintRunsRequest {
  BlueprintName: string;
  NextToken?: string;
  MaxResults?: number;
}
export const GetBlueprintRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlueprintName: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetBlueprintRunsRequest",
}) as any as S.Schema<GetBlueprintRunsRequest>;
export type BlueprintRuns = BlueprintRun[];
export const BlueprintRuns = /*@__PURE__*/ S.Array(BlueprintRun);
export interface GetBlueprintRunsResponse {
  BlueprintRuns?: BlueprintRun[];
  NextToken?: string;
}
export const GetBlueprintRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlueprintRuns: S.optional(BlueprintRuns),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBlueprintRunsResponse",
}) as any as S.Schema<GetBlueprintRunsResponse>;
export interface GetCatalogRequest {
  CatalogId: string;
}
export const GetCatalogRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCatalogRequest",
}) as any as S.Schema<GetCatalogRequest>;
export interface DataLakeAccessPropertiesOutput {
  DataLakeAccess?: boolean;
  DataTransferRole?: string;
  KmsKey?: string;
  ManagedWorkgroupName?: string;
  ManagedWorkgroupStatus?: string;
  RedshiftDatabaseName?: string;
  StatusMessage?: string;
  CatalogType?: string;
}
export const DataLakeAccessPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataLakeAccess: S.optional(S.Boolean),
    DataTransferRole: S.optional(S.String),
    KmsKey: S.optional(S.String),
    ManagedWorkgroupName: S.optional(S.String),
    ManagedWorkgroupStatus: S.optional(S.String),
    RedshiftDatabaseName: S.optional(S.String),
    StatusMessage: S.optional(S.String),
    CatalogType: S.optional(S.String),
  }),
).annotate({
  identifier: "DataLakeAccessPropertiesOutput",
}) as any as S.Schema<DataLakeAccessPropertiesOutput>;
export interface IcebergOptimizationPropertiesOutput {
  RoleArn?: string;
  Compaction?: { [key: string]: string | undefined };
  Retention?: { [key: string]: string | undefined };
  OrphanFileDeletion?: { [key: string]: string | undefined };
  LastUpdatedTime?: Date;
}
export const IcebergOptimizationPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoleArn: S.optional(S.String),
    Compaction: S.optional(ParametersMap),
    Retention: S.optional(ParametersMap),
    OrphanFileDeletion: S.optional(ParametersMap),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "IcebergOptimizationPropertiesOutput",
}) as any as S.Schema<IcebergOptimizationPropertiesOutput>;
export interface CatalogPropertiesOutput {
  DataLakeAccessProperties?: DataLakeAccessPropertiesOutput;
  IcebergOptimizationProperties?: IcebergOptimizationPropertiesOutput;
  CustomProperties?: { [key: string]: string | undefined };
}
export const CatalogPropertiesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataLakeAccessProperties: S.optional(DataLakeAccessPropertiesOutput),
    IcebergOptimizationProperties: S.optional(
      IcebergOptimizationPropertiesOutput,
    ),
    CustomProperties: S.optional(ParametersMap),
  }),
).annotate({
  identifier: "CatalogPropertiesOutput",
}) as any as S.Schema<CatalogPropertiesOutput>;
export interface Catalog {
  CatalogId?: string;
  Name: string;
  ResourceArn?: string;
  Description?: string;
  Parameters?: { [key: string]: string | undefined };
  CreateTime?: Date;
  UpdateTime?: Date;
  TargetRedshiftCatalog?: TargetRedshiftCatalog;
  FederatedCatalog?: FederatedCatalog;
  CatalogProperties?: CatalogPropertiesOutput;
  CreateTableDefaultPermissions?: PrincipalPermissions[];
  CreateDatabaseDefaultPermissions?: PrincipalPermissions[];
  AllowFullTableExternalDataAccess?: AllowFullTableExternalDataAccessEnum;
}
export const Catalog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Name: S.String,
    ResourceArn: S.optional(S.String),
    Description: S.optional(S.String),
    Parameters: S.optional(ParametersMap),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TargetRedshiftCatalog: S.optional(TargetRedshiftCatalog),
    FederatedCatalog: S.optional(FederatedCatalog),
    CatalogProperties: S.optional(CatalogPropertiesOutput),
    CreateTableDefaultPermissions: S.optional(PrincipalPermissionsList),
    CreateDatabaseDefaultPermissions: S.optional(PrincipalPermissionsList),
    AllowFullTableExternalDataAccess: S.optional(
      AllowFullTableExternalDataAccessEnum,
    ),
  }),
).annotate({ identifier: "Catalog" }) as any as S.Schema<Catalog>;
export interface GetCatalogResponse {
  Catalog?: Catalog;
}
export const GetCatalogResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Catalog: S.optional(Catalog) }),
).annotate({
  identifier: "GetCatalogResponse",
}) as any as S.Schema<GetCatalogResponse>;
export interface GetCatalogImportStatusRequest {
  CatalogId?: string;
}
export const GetCatalogImportStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCatalogImportStatusRequest",
}) as any as S.Schema<GetCatalogImportStatusRequest>;
export interface CatalogImportStatus {
  ImportCompleted?: boolean;
  ImportTime?: Date;
  ImportedBy?: string;
}
export const CatalogImportStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportCompleted: S.optional(S.Boolean),
    ImportTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ImportedBy: S.optional(S.String),
  }),
).annotate({
  identifier: "CatalogImportStatus",
}) as any as S.Schema<CatalogImportStatus>;
export interface GetCatalogImportStatusResponse {
  ImportStatus?: CatalogImportStatus;
}
export const GetCatalogImportStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImportStatus: S.optional(CatalogImportStatus) }),
).annotate({
  identifier: "GetCatalogImportStatusResponse",
}) as any as S.Schema<GetCatalogImportStatusResponse>;
export type Token = string;
export interface GetCatalogsRequest {
  ParentCatalogId?: string;
  NextToken?: string;
  MaxResults?: number;
  Recursive?: boolean;
  IncludeRoot?: boolean;
  HasDatabases?: boolean;
}
export const GetCatalogsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParentCatalogId: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Recursive: S.optional(S.Boolean),
    IncludeRoot: S.optional(S.Boolean),
    HasDatabases: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCatalogsRequest",
}) as any as S.Schema<GetCatalogsRequest>;
export type CatalogList = Catalog[];
export const CatalogList = /*@__PURE__*/ S.Array(Catalog);
export interface GetCatalogsResponse {
  CatalogList: Catalog[];
  NextToken?: string;
}
export const GetCatalogsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogList: CatalogList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "GetCatalogsResponse",
}) as any as S.Schema<GetCatalogsResponse>;
export interface GetClassifierRequest {
  Name: string;
}
export const GetClassifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetClassifierRequest",
}) as any as S.Schema<GetClassifierRequest>;
export interface GrokClassifier {
  Name: string;
  Classification: string;
  CreationTime?: Date;
  LastUpdated?: Date;
  Version?: number;
  GrokPattern: string;
  CustomPatterns?: string;
}
export const GrokClassifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Classification: S.String,
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Version: S.optional(S.Number),
    GrokPattern: S.String,
    CustomPatterns: S.optional(S.String),
  }),
).annotate({ identifier: "GrokClassifier" }) as any as S.Schema<GrokClassifier>;
export interface XMLClassifier {
  Name: string;
  Classification: string;
  CreationTime?: Date;
  LastUpdated?: Date;
  Version?: number;
  RowTag?: string;
}
export const XMLClassifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Classification: S.String,
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Version: S.optional(S.Number),
    RowTag: S.optional(S.String),
  }),
).annotate({ identifier: "XMLClassifier" }) as any as S.Schema<XMLClassifier>;
export interface JsonClassifier {
  Name: string;
  CreationTime?: Date;
  LastUpdated?: Date;
  Version?: number;
  JsonPath: string;
}
export const JsonClassifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Version: S.optional(S.Number),
    JsonPath: S.String,
  }),
).annotate({ identifier: "JsonClassifier" }) as any as S.Schema<JsonClassifier>;
export interface CsvClassifier {
  Name: string;
  CreationTime?: Date;
  LastUpdated?: Date;
  Version?: number;
  Delimiter?: string;
  QuoteSymbol?: string;
  ContainsHeader?: CsvHeaderOption;
  Header?: string[];
  DisableValueTrimming?: boolean;
  AllowSingleColumn?: boolean;
  CustomDatatypeConfigured?: boolean;
  CustomDatatypes?: string[];
  Serde?: CsvSerdeOption;
}
export const CsvClassifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Version: S.optional(S.Number),
    Delimiter: S.optional(S.String),
    QuoteSymbol: S.optional(S.String),
    ContainsHeader: S.optional(CsvHeaderOption),
    Header: S.optional(CsvHeader),
    DisableValueTrimming: S.optional(S.Boolean),
    AllowSingleColumn: S.optional(S.Boolean),
    CustomDatatypeConfigured: S.optional(S.Boolean),
    CustomDatatypes: S.optional(CustomDatatypes),
    Serde: S.optional(CsvSerdeOption),
  }),
).annotate({ identifier: "CsvClassifier" }) as any as S.Schema<CsvClassifier>;
export interface Classifier {
  GrokClassifier?: GrokClassifier;
  XMLClassifier?: XMLClassifier;
  JsonClassifier?: JsonClassifier;
  CsvClassifier?: CsvClassifier;
}
export const Classifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GrokClassifier: S.optional(GrokClassifier),
    XMLClassifier: S.optional(XMLClassifier),
    JsonClassifier: S.optional(JsonClassifier),
    CsvClassifier: S.optional(CsvClassifier),
  }),
).annotate({ identifier: "Classifier" }) as any as S.Schema<Classifier>;
export interface GetClassifierResponse {
  Classifier?: Classifier;
}
export const GetClassifierResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Classifier: S.optional(Classifier) }),
).annotate({
  identifier: "GetClassifierResponse",
}) as any as S.Schema<GetClassifierResponse>;
export interface GetClassifiersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const GetClassifiersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetClassifiersRequest",
}) as any as S.Schema<GetClassifiersRequest>;
export type ClassifierList = Classifier[];
export const ClassifierList = /*@__PURE__*/ S.Array(Classifier);
export interface GetClassifiersResponse {
  Classifiers?: Classifier[];
  NextToken?: string;
}
export const GetClassifiersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Classifiers: S.optional(ClassifierList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetClassifiersResponse",
}) as any as S.Schema<GetClassifiersResponse>;
export type GetColumnNamesList = string[];
export const GetColumnNamesList = /*@__PURE__*/ S.Array(S.String);
export interface GetColumnStatisticsForPartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionValues: string[];
  ColumnNames: string[];
}
export const GetColumnStatisticsForPartitionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CatalogId: S.optional(S.String),
      DatabaseName: S.String,
      TableName: S.String,
      PartitionValues: ValueStringList,
      ColumnNames: GetColumnNamesList,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetColumnStatisticsForPartitionRequest",
}) as any as S.Schema<GetColumnStatisticsForPartitionRequest>;
export type TypeString = string;
export type ColumnStatisticsType =
  | "BOOLEAN"
  | "DATE"
  | "DECIMAL"
  | "DOUBLE"
  | "LONG"
  | "STRING"
  | "BINARY"
  | (string & {});
export const ColumnStatisticsType = /*@__PURE__*/ S.String;

export type NonNegativeLong = number;
export interface BooleanColumnStatisticsData {
  NumberOfTrues: number;
  NumberOfFalses: number;
  NumberOfNulls: number;
}
export const BooleanColumnStatisticsData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumberOfTrues: S.Number,
    NumberOfFalses: S.Number,
    NumberOfNulls: S.Number,
  }),
).annotate({
  identifier: "BooleanColumnStatisticsData",
}) as any as S.Schema<BooleanColumnStatisticsData>;
export interface DateColumnStatisticsData {
  MinimumValue?: Date;
  MaximumValue?: Date;
  NumberOfNulls: number;
  NumberOfDistinctValues: number;
}
export const DateColumnStatisticsData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinimumValue: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MaximumValue: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NumberOfNulls: S.Number,
    NumberOfDistinctValues: S.Number,
  }),
).annotate({
  identifier: "DateColumnStatisticsData",
}) as any as S.Schema<DateColumnStatisticsData>;
export interface DecimalNumber {
  UnscaledValue: Uint8Array;
  Scale: number;
}
export const DecimalNumber = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UnscaledValue: T.Blob, Scale: S.Number }),
).annotate({ identifier: "DecimalNumber" }) as any as S.Schema<DecimalNumber>;
export interface DecimalColumnStatisticsData {
  MinimumValue?: DecimalNumber;
  MaximumValue?: DecimalNumber;
  NumberOfNulls: number;
  NumberOfDistinctValues: number;
}
export const DecimalColumnStatisticsData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinimumValue: S.optional(DecimalNumber),
    MaximumValue: S.optional(DecimalNumber),
    NumberOfNulls: S.Number,
    NumberOfDistinctValues: S.Number,
  }),
).annotate({
  identifier: "DecimalColumnStatisticsData",
}) as any as S.Schema<DecimalColumnStatisticsData>;
export interface DoubleColumnStatisticsData {
  MinimumValue?: number;
  MaximumValue?: number;
  NumberOfNulls: number;
  NumberOfDistinctValues: number;
}
export const DoubleColumnStatisticsData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinimumValue: S.optional(S.Number),
    MaximumValue: S.optional(S.Number),
    NumberOfNulls: S.Number,
    NumberOfDistinctValues: S.Number,
  }),
).annotate({
  identifier: "DoubleColumnStatisticsData",
}) as any as S.Schema<DoubleColumnStatisticsData>;
export interface LongColumnStatisticsData {
  MinimumValue?: number;
  MaximumValue?: number;
  NumberOfNulls: number;
  NumberOfDistinctValues: number;
}
export const LongColumnStatisticsData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MinimumValue: S.optional(S.Number),
    MaximumValue: S.optional(S.Number),
    NumberOfNulls: S.Number,
    NumberOfDistinctValues: S.Number,
  }),
).annotate({
  identifier: "LongColumnStatisticsData",
}) as any as S.Schema<LongColumnStatisticsData>;
export type NonNegativeDouble = number;
export interface StringColumnStatisticsData {
  MaximumLength: number;
  AverageLength: number;
  NumberOfNulls: number;
  NumberOfDistinctValues: number;
}
export const StringColumnStatisticsData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaximumLength: S.Number,
    AverageLength: S.Number,
    NumberOfNulls: S.Number,
    NumberOfDistinctValues: S.Number,
  }),
).annotate({
  identifier: "StringColumnStatisticsData",
}) as any as S.Schema<StringColumnStatisticsData>;
export interface BinaryColumnStatisticsData {
  MaximumLength: number;
  AverageLength: number;
  NumberOfNulls: number;
}
export const BinaryColumnStatisticsData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaximumLength: S.Number,
    AverageLength: S.Number,
    NumberOfNulls: S.Number,
  }),
).annotate({
  identifier: "BinaryColumnStatisticsData",
}) as any as S.Schema<BinaryColumnStatisticsData>;
export interface ColumnStatisticsData {
  Type: ColumnStatisticsType;
  BooleanColumnStatisticsData?: BooleanColumnStatisticsData;
  DateColumnStatisticsData?: DateColumnStatisticsData;
  DecimalColumnStatisticsData?: DecimalColumnStatisticsData;
  DoubleColumnStatisticsData?: DoubleColumnStatisticsData;
  LongColumnStatisticsData?: LongColumnStatisticsData;
  StringColumnStatisticsData?: StringColumnStatisticsData;
  BinaryColumnStatisticsData?: BinaryColumnStatisticsData;
}
export const ColumnStatisticsData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: ColumnStatisticsType,
    BooleanColumnStatisticsData: S.optional(BooleanColumnStatisticsData),
    DateColumnStatisticsData: S.optional(DateColumnStatisticsData),
    DecimalColumnStatisticsData: S.optional(DecimalColumnStatisticsData),
    DoubleColumnStatisticsData: S.optional(DoubleColumnStatisticsData),
    LongColumnStatisticsData: S.optional(LongColumnStatisticsData),
    StringColumnStatisticsData: S.optional(StringColumnStatisticsData),
    BinaryColumnStatisticsData: S.optional(BinaryColumnStatisticsData),
  }),
).annotate({
  identifier: "ColumnStatisticsData",
}) as any as S.Schema<ColumnStatisticsData>;
export interface ColumnStatistics {
  ColumnName: string;
  ColumnType: string;
  AnalyzedTime: Date;
  StatisticsData: ColumnStatisticsData;
}
export const ColumnStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColumnName: S.String,
    ColumnType: S.String,
    AnalyzedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    StatisticsData: ColumnStatisticsData,
  }),
).annotate({
  identifier: "ColumnStatistics",
}) as any as S.Schema<ColumnStatistics>;
export type ColumnStatisticsList = ColumnStatistics[];
export const ColumnStatisticsList = /*@__PURE__*/ S.Array(ColumnStatistics);
export interface ColumnError {
  ColumnName?: string;
  Error?: ErrorDetail;
}
export const ColumnError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColumnName: S.optional(S.String),
    Error: S.optional(ErrorDetail),
  }),
).annotate({ identifier: "ColumnError" }) as any as S.Schema<ColumnError>;
export type ColumnErrors = ColumnError[];
export const ColumnErrors = /*@__PURE__*/ S.Array(ColumnError);
export interface GetColumnStatisticsForPartitionResponse {
  ColumnStatisticsList?: ColumnStatistics[];
  Errors?: ColumnError[];
}
export const GetColumnStatisticsForPartitionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ColumnStatisticsList: S.optional(ColumnStatisticsList),
      Errors: S.optional(ColumnErrors),
    }),
).annotate({
  identifier: "GetColumnStatisticsForPartitionResponse",
}) as any as S.Schema<GetColumnStatisticsForPartitionResponse>;
export interface GetColumnStatisticsForTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  ColumnNames: string[];
}
export const GetColumnStatisticsForTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    ColumnNames: GetColumnNamesList,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetColumnStatisticsForTableRequest",
}) as any as S.Schema<GetColumnStatisticsForTableRequest>;
export interface GetColumnStatisticsForTableResponse {
  ColumnStatisticsList?: ColumnStatistics[];
  Errors?: ColumnError[];
}
export const GetColumnStatisticsForTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColumnStatisticsList: S.optional(ColumnStatisticsList),
    Errors: S.optional(ColumnErrors),
  }),
).annotate({
  identifier: "GetColumnStatisticsForTableResponse",
}) as any as S.Schema<GetColumnStatisticsForTableResponse>;
export interface GetColumnStatisticsTaskRunRequest {
  ColumnStatisticsTaskRunId: string;
}
export const GetColumnStatisticsTaskRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ColumnStatisticsTaskRunId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetColumnStatisticsTaskRunRequest",
}) as any as S.Schema<GetColumnStatisticsTaskRunRequest>;
export type TableName = string;
export type PositiveInteger = number;
export type ComputationType = "FULL" | "INCREMENTAL" | (string & {});
export const ComputationType = /*@__PURE__*/ S.String;

export type ColumnStatisticsState =
  | "STARTING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "STOPPED"
  | (string & {});
export const ColumnStatisticsState = /*@__PURE__*/ S.String;

export interface ColumnStatisticsTaskRun {
  CustomerId?: string;
  ColumnStatisticsTaskRunId?: string;
  DatabaseName?: string;
  TableName?: string;
  ColumnNameList?: string[];
  CatalogID?: string;
  Role?: string;
  SampleSize?: number;
  SecurityConfiguration?: string;
  NumberOfWorkers?: number;
  WorkerType?: string;
  ComputationType?: ComputationType;
  Status?: ColumnStatisticsState;
  CreationTime?: Date;
  LastUpdated?: Date;
  StartTime?: Date;
  EndTime?: Date;
  ErrorMessage?: string;
  DPUSeconds?: number;
}
export const ColumnStatisticsTaskRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomerId: S.optional(S.String),
    ColumnStatisticsTaskRunId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    TableName: S.optional(S.String),
    ColumnNameList: S.optional(ColumnNameList),
    CatalogID: S.optional(S.String),
    Role: S.optional(S.String),
    SampleSize: S.optional(S.Number),
    SecurityConfiguration: S.optional(S.String),
    NumberOfWorkers: S.optional(S.Number),
    WorkerType: S.optional(S.String),
    ComputationType: S.optional(ComputationType),
    Status: S.optional(ColumnStatisticsState),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ErrorMessage: S.optional(S.String),
    DPUSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "ColumnStatisticsTaskRun",
}) as any as S.Schema<ColumnStatisticsTaskRun>;
export interface GetColumnStatisticsTaskRunResponse {
  ColumnStatisticsTaskRun?: ColumnStatisticsTaskRun;
}
export const GetColumnStatisticsTaskRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ColumnStatisticsTaskRun: S.optional(ColumnStatisticsTaskRun) }),
).annotate({
  identifier: "GetColumnStatisticsTaskRunResponse",
}) as any as S.Schema<GetColumnStatisticsTaskRunResponse>;
export interface GetColumnStatisticsTaskRunsRequest {
  DatabaseName: string;
  TableName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetColumnStatisticsTaskRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.String,
    TableName: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetColumnStatisticsTaskRunsRequest",
}) as any as S.Schema<GetColumnStatisticsTaskRunsRequest>;
export type ColumnStatisticsTaskRunsList = ColumnStatisticsTaskRun[];
export const ColumnStatisticsTaskRunsList = /*@__PURE__*/ S.Array(
  ColumnStatisticsTaskRun,
);
export interface GetColumnStatisticsTaskRunsResponse {
  ColumnStatisticsTaskRuns?: ColumnStatisticsTaskRun[];
  NextToken?: string;
}
export const GetColumnStatisticsTaskRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColumnStatisticsTaskRuns: S.optional(ColumnStatisticsTaskRunsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetColumnStatisticsTaskRunsResponse",
}) as any as S.Schema<GetColumnStatisticsTaskRunsResponse>;
export interface GetColumnStatisticsTaskSettingsRequest {
  DatabaseName: string;
  TableName: string;
}
export const GetColumnStatisticsTaskSettingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ DatabaseName: S.String, TableName: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetColumnStatisticsTaskSettingsRequest",
}) as any as S.Schema<GetColumnStatisticsTaskSettingsRequest>;
export type ScheduleType = "CRON" | "AUTO" | (string & {});
export const ScheduleType = /*@__PURE__*/ S.String;

export type SettingSource = "CATALOG" | "TABLE" | (string & {});
export const SettingSource = /*@__PURE__*/ S.String;

export type ExecutionStatus = "FAILED" | "STARTED" | (string & {});
export const ExecutionStatus = /*@__PURE__*/ S.String;

export interface ExecutionAttempt {
  Status?: ExecutionStatus;
  ColumnStatisticsTaskRunId?: string;
  ExecutionTimestamp?: Date;
  ErrorMessage?: string;
}
export const ExecutionAttempt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(ExecutionStatus),
    ColumnStatisticsTaskRunId: S.optional(S.String),
    ExecutionTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecutionAttempt",
}) as any as S.Schema<ExecutionAttempt>;
export interface ColumnStatisticsTaskSettings {
  DatabaseName?: string;
  TableName?: string;
  Schedule?: Schedule;
  ColumnNameList?: string[];
  CatalogID?: string;
  Role?: string;
  SampleSize?: number;
  SecurityConfiguration?: string;
  ScheduleType?: ScheduleType;
  SettingSource?: SettingSource;
  LastExecutionAttempt?: ExecutionAttempt;
}
export const ColumnStatisticsTaskSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.optional(S.String),
    TableName: S.optional(S.String),
    Schedule: S.optional(Schedule),
    ColumnNameList: S.optional(ColumnNameList),
    CatalogID: S.optional(S.String),
    Role: S.optional(S.String),
    SampleSize: S.optional(S.Number),
    SecurityConfiguration: S.optional(S.String),
    ScheduleType: S.optional(ScheduleType),
    SettingSource: S.optional(SettingSource),
    LastExecutionAttempt: S.optional(ExecutionAttempt),
  }),
).annotate({
  identifier: "ColumnStatisticsTaskSettings",
}) as any as S.Schema<ColumnStatisticsTaskSettings>;
export interface GetColumnStatisticsTaskSettingsResponse {
  ColumnStatisticsTaskSettings?: ColumnStatisticsTaskSettings;
}
export const GetColumnStatisticsTaskSettingsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ColumnStatisticsTaskSettings: S.optional(ColumnStatisticsTaskSettings),
    }),
).annotate({
  identifier: "GetColumnStatisticsTaskSettingsResponse",
}) as any as S.Schema<GetColumnStatisticsTaskSettingsResponse>;
export interface GetConnectionRequest {
  CatalogId?: string;
  Name: string;
  HidePassword?: boolean;
  ApplyOverrideForComputeEnvironment?: ComputeEnvironment;
}
export const GetConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Name: S.String,
    HidePassword: S.optional(S.Boolean),
    ApplyOverrideForComputeEnvironment: S.optional(ComputeEnvironment),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetConnectionRequest",
}) as any as S.Schema<GetConnectionRequest>;
export type LongValueString = string;
export interface OAuth2Properties {
  OAuth2GrantType?: OAuth2GrantType;
  OAuth2ClientApplication?: OAuth2ClientApplication;
  TokenUrl?: string;
  TokenUrlParametersMap?: { [key: string]: string | undefined };
}
export const OAuth2Properties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OAuth2GrantType: S.optional(OAuth2GrantType),
    OAuth2ClientApplication: S.optional(OAuth2ClientApplication),
    TokenUrl: S.optional(S.String),
    TokenUrlParametersMap: S.optional(TokenUrlParametersMap),
  }),
).annotate({
  identifier: "OAuth2Properties",
}) as any as S.Schema<OAuth2Properties>;
export interface AuthenticationConfiguration {
  AuthenticationType?: AuthenticationType;
  SecretArn?: string;
  KmsKeyArn?: string;
  OAuth2Properties?: OAuth2Properties;
}
export const AuthenticationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationType: S.optional(AuthenticationType),
    SecretArn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    OAuth2Properties: S.optional(OAuth2Properties),
  }),
).annotate({
  identifier: "AuthenticationConfiguration",
}) as any as S.Schema<AuthenticationConfiguration>;
export type ConnectionSchemaVersion = number;
export interface Connection {
  Name?: string;
  Description?: string;
  ConnectionType?: ConnectionType;
  MatchCriteria?: string[];
  ConnectionProperties?: { [key: string]: string | undefined };
  SparkProperties?: { [key: string]: string | undefined };
  AthenaProperties?: { [key: string]: string | undefined };
  PythonProperties?: { [key: string]: string | undefined };
  PhysicalConnectionRequirements?: PhysicalConnectionRequirements;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  LastUpdatedBy?: string;
  Status?: ConnectionStatus;
  StatusReason?: string;
  LastConnectionValidationTime?: Date;
  AuthenticationConfiguration?: AuthenticationConfiguration;
  ConnectionSchemaVersion?: number;
  CompatibleComputeEnvironments?: ComputeEnvironment[];
}
export const Connection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    ConnectionType: S.optional(ConnectionType),
    MatchCriteria: S.optional(MatchCriteria),
    ConnectionProperties: S.optional(ConnectionProperties),
    SparkProperties: S.optional(PropertyMap),
    AthenaProperties: S.optional(PropertyMap),
    PythonProperties: S.optional(PropertyMap),
    PhysicalConnectionRequirements: S.optional(PhysicalConnectionRequirements),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedBy: S.optional(S.String),
    Status: S.optional(ConnectionStatus),
    StatusReason: S.optional(S.String),
    LastConnectionValidationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AuthenticationConfiguration: S.optional(AuthenticationConfiguration),
    ConnectionSchemaVersion: S.optional(S.Number),
    CompatibleComputeEnvironments: S.optional(ComputeEnvironmentList),
  }),
).annotate({ identifier: "Connection" }) as any as S.Schema<Connection>;
export interface GetConnectionResponse {
  Connection?: Connection;
}
export const GetConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Connection: S.optional(Connection) }),
).annotate({
  identifier: "GetConnectionResponse",
}) as any as S.Schema<GetConnectionResponse>;
export interface GetConnectionsFilter {
  MatchCriteria?: string[];
  ConnectionType?: ConnectionType;
  ConnectionSchemaVersion?: number;
}
export const GetConnectionsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MatchCriteria: S.optional(MatchCriteria),
    ConnectionType: S.optional(ConnectionType),
    ConnectionSchemaVersion: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetConnectionsFilter",
}) as any as S.Schema<GetConnectionsFilter>;
export interface GetConnectionsRequest {
  CatalogId?: string;
  Filter?: GetConnectionsFilter;
  HidePassword?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export const GetConnectionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Filter: S.optional(GetConnectionsFilter),
    HidePassword: S.optional(S.Boolean),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetConnectionsRequest",
}) as any as S.Schema<GetConnectionsRequest>;
export type ConnectionList = Connection[];
export const ConnectionList = /*@__PURE__*/ S.Array(Connection);
export interface GetConnectionsResponse {
  ConnectionList?: Connection[];
  NextToken?: string;
}
export const GetConnectionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionList: S.optional(ConnectionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetConnectionsResponse",
}) as any as S.Schema<GetConnectionsResponse>;
export interface GetCrawlerRequest {
  Name: string;
}
export const GetCrawlerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCrawlerRequest",
}) as any as S.Schema<GetCrawlerRequest>;
export interface GetCrawlerResponse {
  Crawler?: Crawler;
}
export const GetCrawlerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Crawler: S.optional(Crawler) }),
).annotate({
  identifier: "GetCrawlerResponse",
}) as any as S.Schema<GetCrawlerResponse>;
export interface GetCrawlerMetricsRequest {
  CrawlerNameList?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const GetCrawlerMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CrawlerNameList: S.optional(CrawlerNameList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCrawlerMetricsRequest",
}) as any as S.Schema<GetCrawlerMetricsRequest>;
export interface CrawlerMetrics {
  CrawlerName?: string;
  TimeLeftSeconds?: number;
  StillEstimating?: boolean;
  LastRuntimeSeconds?: number;
  MedianRuntimeSeconds?: number;
  TablesCreated?: number;
  TablesUpdated?: number;
  TablesDeleted?: number;
}
export const CrawlerMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CrawlerName: S.optional(S.String),
    TimeLeftSeconds: S.optional(S.Number),
    StillEstimating: S.optional(S.Boolean),
    LastRuntimeSeconds: S.optional(S.Number),
    MedianRuntimeSeconds: S.optional(S.Number),
    TablesCreated: S.optional(S.Number),
    TablesUpdated: S.optional(S.Number),
    TablesDeleted: S.optional(S.Number),
  }),
).annotate({ identifier: "CrawlerMetrics" }) as any as S.Schema<CrawlerMetrics>;
export type CrawlerMetricsList = CrawlerMetrics[];
export const CrawlerMetricsList = /*@__PURE__*/ S.Array(CrawlerMetrics);
export interface GetCrawlerMetricsResponse {
  CrawlerMetricsList?: CrawlerMetrics[];
  NextToken?: string;
}
export const GetCrawlerMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CrawlerMetricsList: S.optional(CrawlerMetricsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCrawlerMetricsResponse",
}) as any as S.Schema<GetCrawlerMetricsResponse>;
export interface GetCrawlersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const GetCrawlersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCrawlersRequest",
}) as any as S.Schema<GetCrawlersRequest>;
export interface GetCrawlersResponse {
  Crawlers?: Crawler[];
  NextToken?: string;
}
export const GetCrawlersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Crawlers: S.optional(CrawlerList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCrawlersResponse",
}) as any as S.Schema<GetCrawlersResponse>;
export interface GetCustomEntityTypeRequest {
  Name: string;
}
export const GetCustomEntityTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCustomEntityTypeRequest",
}) as any as S.Schema<GetCustomEntityTypeRequest>;
export interface GetCustomEntityTypeResponse {
  Name?: string;
  RegexString?: string;
  ContextWords?: string[];
}
export const GetCustomEntityTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    RegexString: S.optional(S.String),
    ContextWords: S.optional(ContextWords),
  }),
).annotate({
  identifier: "GetCustomEntityTypeResponse",
}) as any as S.Schema<GetCustomEntityTypeResponse>;
export type GlueResourceType = "JOB" | "SESSION" | (string & {});
export const GlueResourceType = /*@__PURE__*/ S.String;

export interface GetDashboardUrlRequest {
  ResourceId: string;
  ResourceType: GlueResourceType;
  RequestOrigin?: string;
}
export const GetDashboardUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    ResourceType: GlueResourceType,
    RequestOrigin: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDashboardUrlRequest",
}) as any as S.Schema<GetDashboardUrlRequest>;
export type SensitiveUrl = string | redacted.Redacted<string>;
export interface GetDashboardUrlResponse {
  Url: string | redacted.Redacted<string>;
}
export const GetDashboardUrlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Url: SensitiveString }),
).annotate({
  identifier: "GetDashboardUrlResponse",
}) as any as S.Schema<GetDashboardUrlResponse>;
export interface GetDatabaseRequest {
  CatalogId?: string;
  Name: string;
}
export const GetDatabaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.optional(S.String), Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDatabaseRequest",
}) as any as S.Schema<GetDatabaseRequest>;
export interface Database {
  Name: string;
  Description?: string;
  LocationUri?: string;
  Parameters?: { [key: string]: string | undefined };
  CreateTime?: Date;
  CreateTableDefaultPermissions?: PrincipalPermissions[];
  TargetDatabase?: DatabaseIdentifier;
  CatalogId?: string;
  FederatedDatabase?: FederatedDatabase;
}
export const Database = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    LocationUri: S.optional(S.String),
    Parameters: S.optional(ParametersMap),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreateTableDefaultPermissions: S.optional(PrincipalPermissionsList),
    TargetDatabase: S.optional(DatabaseIdentifier),
    CatalogId: S.optional(S.String),
    FederatedDatabase: S.optional(FederatedDatabase),
  }),
).annotate({ identifier: "Database" }) as any as S.Schema<Database>;
export interface GetDatabaseResponse {
  Database?: Database;
}
export const GetDatabaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Database: S.optional(Database) }),
).annotate({
  identifier: "GetDatabaseResponse",
}) as any as S.Schema<GetDatabaseResponse>;
export type CatalogGetterPageSize = number;
export type ResourceShareType = "FOREIGN" | "ALL" | "FEDERATED" | (string & {});
export const ResourceShareType = /*@__PURE__*/ S.String;

export type DatabaseAttributes = "NAME" | "TARGET_DATABASE" | (string & {});
export const DatabaseAttributes = /*@__PURE__*/ S.String;

export type DatabaseAttributesList = DatabaseAttributes[];
export const DatabaseAttributesList = /*@__PURE__*/ S.Array(DatabaseAttributes);
export interface GetDatabasesRequest {
  CatalogId?: string;
  NextToken?: string;
  MaxResults?: number;
  ResourceShareType?: ResourceShareType;
  AttributesToGet?: DatabaseAttributes[];
}
export const GetDatabasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ResourceShareType: S.optional(ResourceShareType),
    AttributesToGet: S.optional(DatabaseAttributesList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDatabasesRequest",
}) as any as S.Schema<GetDatabasesRequest>;
export type DatabaseList = Database[];
export const DatabaseList = /*@__PURE__*/ S.Array(Database);
export interface GetDatabasesResponse {
  DatabaseList: Database[];
  NextToken?: string;
}
export const GetDatabasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatabaseList: DatabaseList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "GetDatabasesResponse",
}) as any as S.Schema<GetDatabasesResponse>;
export interface GetDataCatalogEncryptionSettingsRequest {
  CatalogId?: string;
}
export const GetDataCatalogEncryptionSettingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ CatalogId: S.optional(S.String) }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetDataCatalogEncryptionSettingsRequest",
}) as any as S.Schema<GetDataCatalogEncryptionSettingsRequest>;
export type CatalogEncryptionMode =
  | "DISABLED"
  | "SSE-KMS"
  | "SSE-KMS-WITH-SERVICE-ROLE"
  | (string & {});
export const CatalogEncryptionMode = /*@__PURE__*/ S.String;

export interface EncryptionAtRest {
  CatalogEncryptionMode: CatalogEncryptionMode;
  SseAwsKmsKeyId?: string;
  CatalogEncryptionServiceRole?: string;
}
export const EncryptionAtRest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogEncryptionMode: CatalogEncryptionMode,
    SseAwsKmsKeyId: S.optional(S.String),
    CatalogEncryptionServiceRole: S.optional(S.String),
  }),
).annotate({
  identifier: "EncryptionAtRest",
}) as any as S.Schema<EncryptionAtRest>;
export interface ConnectionPasswordEncryption {
  ReturnConnectionPasswordEncrypted: boolean;
  AwsKmsKeyId?: string;
}
export const ConnectionPasswordEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReturnConnectionPasswordEncrypted: S.Boolean,
    AwsKmsKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "ConnectionPasswordEncryption",
}) as any as S.Schema<ConnectionPasswordEncryption>;
export interface DataCatalogEncryptionSettings {
  EncryptionAtRest?: EncryptionAtRest;
  ConnectionPasswordEncryption?: ConnectionPasswordEncryption;
}
export const DataCatalogEncryptionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionAtRest: S.optional(EncryptionAtRest),
    ConnectionPasswordEncryption: S.optional(ConnectionPasswordEncryption),
  }),
).annotate({
  identifier: "DataCatalogEncryptionSettings",
}) as any as S.Schema<DataCatalogEncryptionSettings>;
export interface GetDataCatalogEncryptionSettingsResponse {
  DataCatalogEncryptionSettings?: DataCatalogEncryptionSettings;
}
export const GetDataCatalogEncryptionSettingsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DataCatalogEncryptionSettings: S.optional(DataCatalogEncryptionSettings),
    }),
).annotate({
  identifier: "GetDataCatalogEncryptionSettingsResponse",
}) as any as S.Schema<GetDataCatalogEncryptionSettingsResponse>;
export interface GetDataflowGraphRequest {
  PythonScript?: string;
}
export const GetDataflowGraphRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PythonScript: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDataflowGraphRequest",
}) as any as S.Schema<GetDataflowGraphRequest>;
export interface GetDataflowGraphResponse {
  DagNodes?: CodeGenNode[];
  DagEdges?: CodeGenEdge[];
}
export const GetDataflowGraphResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DagNodes: S.optional(DagNodes), DagEdges: S.optional(DagEdges) }),
).annotate({
  identifier: "GetDataflowGraphResponse",
}) as any as S.Schema<GetDataflowGraphResponse>;
export interface GetDataQualityModelRequest {
  StatisticId?: string;
  ProfileId: string;
}
export const GetDataQualityModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StatisticId: S.optional(S.String), ProfileId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDataQualityModelRequest",
}) as any as S.Schema<GetDataQualityModelRequest>;
export type DataQualityModelStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const DataQualityModelStatus = /*@__PURE__*/ S.String;

export interface GetDataQualityModelResponse {
  Status?: DataQualityModelStatus;
  StartedOn?: Date;
  CompletedOn?: Date;
  FailureReason?: string;
}
export const GetDataQualityModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(DataQualityModelStatus),
    StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FailureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDataQualityModelResponse",
}) as any as S.Schema<GetDataQualityModelResponse>;
export interface GetDataQualityModelResultRequest {
  StatisticId: string;
  ProfileId: string;
}
export const GetDataQualityModelResultRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StatisticId: S.String, ProfileId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDataQualityModelResultRequest",
}) as any as S.Schema<GetDataQualityModelResultRequest>;
export interface StatisticModelResult {
  LowerBound?: number;
  UpperBound?: number;
  PredictedValue?: number;
  ActualValue?: number;
  Date?: Date;
  InclusionAnnotation?: InclusionAnnotationValue;
}
export const StatisticModelResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LowerBound: S.optional(S.Number),
    UpperBound: S.optional(S.Number),
    PredictedValue: S.optional(S.Number),
    ActualValue: S.optional(S.Number),
    Date: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InclusionAnnotation: S.optional(InclusionAnnotationValue),
  }),
).annotate({
  identifier: "StatisticModelResult",
}) as any as S.Schema<StatisticModelResult>;
export type StatisticModelResults = StatisticModelResult[];
export const StatisticModelResults =
  /*@__PURE__*/ S.Array(StatisticModelResult);
export interface GetDataQualityModelResultResponse {
  CompletedOn?: Date;
  Model?: StatisticModelResult[];
}
export const GetDataQualityModelResultResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Model: S.optional(StatisticModelResults),
  }),
).annotate({
  identifier: "GetDataQualityModelResultResponse",
}) as any as S.Schema<GetDataQualityModelResultResponse>;
export interface GetDataQualityResultRequest {
  ResultId: string;
}
export const GetDataQualityResultRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResultId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDataQualityResultRequest",
}) as any as S.Schema<GetDataQualityResultRequest>;
export interface GetDataQualityResultResponse {
  ResultId?: string;
  ProfileId?: string;
  Score?: number;
  DataSource?: DataSource;
  RulesetName?: string;
  EvaluationContext?: string;
  StartedOn?: Date;
  CompletedOn?: Date;
  JobName?: string;
  JobRunId?: string;
  RulesetEvaluationRunId?: string;
  RuleResults?: DataQualityRuleResult[];
  AnalyzerResults?: DataQualityAnalyzerResult[];
  Observations?: DataQualityObservation[];
  AggregatedMetrics?: DataQualityAggregatedMetrics;
}
export const GetDataQualityResultResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResultId: S.optional(S.String),
    ProfileId: S.optional(S.String),
    Score: S.optional(S.Number),
    DataSource: S.optional(DataSource),
    RulesetName: S.optional(S.String),
    EvaluationContext: S.optional(S.String),
    StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    JobName: S.optional(S.String),
    JobRunId: S.optional(S.String),
    RulesetEvaluationRunId: S.optional(S.String),
    RuleResults: S.optional(DataQualityRuleResults),
    AnalyzerResults: S.optional(DataQualityAnalyzerResults),
    Observations: S.optional(DataQualityObservations),
    AggregatedMetrics: S.optional(DataQualityAggregatedMetrics),
  }),
).annotate({
  identifier: "GetDataQualityResultResponse",
}) as any as S.Schema<GetDataQualityResultResponse>;
export interface GetDataQualityRuleRecommendationRunRequest {
  RunId: string;
}
export const GetDataQualityRuleRecommendationRunRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RunId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetDataQualityRuleRecommendationRunRequest",
  }) as any as S.Schema<GetDataQualityRuleRecommendationRunRequest>;
export interface GetDataQualityRuleRecommendationRunResponse {
  RunId?: string;
  DataSource?: DataSource;
  Role?: string;
  NumberOfWorkers?: number;
  Timeout?: number;
  Status?: TaskStatusType;
  ErrorString?: string;
  StartedOn?: Date;
  LastModifiedOn?: Date;
  CompletedOn?: Date;
  ExecutionTime?: number;
  RecommendedRuleset?: string;
  CreatedRulesetName?: string;
  DataQualitySecurityConfiguration?: string;
}
export const GetDataQualityRuleRecommendationRunResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RunId: S.optional(S.String),
      DataSource: S.optional(DataSource),
      Role: S.optional(S.String),
      NumberOfWorkers: S.optional(S.Number),
      Timeout: S.optional(S.Number),
      Status: S.optional(TaskStatusType),
      ErrorString: S.optional(S.String),
      StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      LastModifiedOn: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      ExecutionTime: S.optional(S.Number),
      RecommendedRuleset: S.optional(S.String),
      CreatedRulesetName: S.optional(S.String),
      DataQualitySecurityConfiguration: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetDataQualityRuleRecommendationRunResponse",
  }) as any as S.Schema<GetDataQualityRuleRecommendationRunResponse>;
export interface GetDataQualityRulesetRequest {
  Name: string;
}
export const GetDataQualityRulesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDataQualityRulesetRequest",
}) as any as S.Schema<GetDataQualityRulesetRequest>;
export interface GetDataQualityRulesetResponse {
  Name?: string;
  Description?: string;
  Ruleset?: string;
  TargetTable?: DataQualityTargetTable;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  RecommendationRunId?: string;
  DataQualitySecurityConfiguration?: string;
}
export const GetDataQualityRulesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Ruleset: S.optional(S.String),
    TargetTable: S.optional(DataQualityTargetTable),
    CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RecommendationRunId: S.optional(S.String),
    DataQualitySecurityConfiguration: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDataQualityRulesetResponse",
}) as any as S.Schema<GetDataQualityRulesetResponse>;
export interface GetDataQualityRulesetEvaluationRunRequest {
  RunId: string;
}
export const GetDataQualityRulesetEvaluationRunRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RunId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetDataQualityRulesetEvaluationRunRequest",
  }) as any as S.Schema<GetDataQualityRulesetEvaluationRunRequest>;
export type DQCompositeRuleEvaluationMethod = "COLUMN" | "ROW" | (string & {});
export const DQCompositeRuleEvaluationMethod = /*@__PURE__*/ S.String;

export interface DataQualityEvaluationRunAdditionalRunOptions {
  CloudWatchMetricsEnabled?: boolean;
  ResultsS3Prefix?: string;
  CompositeRuleEvaluationMethod?: DQCompositeRuleEvaluationMethod;
  CustomLogGroupPrefix?: string;
}
export const DataQualityEvaluationRunAdditionalRunOptions =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CloudWatchMetricsEnabled: S.optional(S.Boolean),
      ResultsS3Prefix: S.optional(S.String),
      CompositeRuleEvaluationMethod: S.optional(
        DQCompositeRuleEvaluationMethod,
      ),
      CustomLogGroupPrefix: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DataQualityEvaluationRunAdditionalRunOptions",
  }) as any as S.Schema<DataQualityEvaluationRunAdditionalRunOptions>;
export type RulesetNames = string[];
export const RulesetNames = /*@__PURE__*/ S.Array(S.String);
export type DataQualityResultIdList = string[];
export const DataQualityResultIdList = /*@__PURE__*/ S.Array(S.String);
export type DataSourceMap = { [key: string]: DataSource | undefined };
export const DataSourceMap = /*@__PURE__*/ S.Record(
  S.String,
  DataSource.pipe(S.optional),
);
export interface GetDataQualityRulesetEvaluationRunResponse {
  RunId?: string;
  DataSource?: DataSource;
  Role?: string;
  NumberOfWorkers?: number;
  Timeout?: number;
  AdditionalRunOptions?: DataQualityEvaluationRunAdditionalRunOptions;
  Status?: TaskStatusType;
  ErrorString?: string;
  StartedOn?: Date;
  LastModifiedOn?: Date;
  CompletedOn?: Date;
  ExecutionTime?: number;
  RulesetNames?: string[];
  ResultIds?: string[];
  AdditionalDataSources?: { [key: string]: DataSource | undefined };
}
export const GetDataQualityRulesetEvaluationRunResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RunId: S.optional(S.String),
      DataSource: S.optional(DataSource),
      Role: S.optional(S.String),
      NumberOfWorkers: S.optional(S.Number),
      Timeout: S.optional(S.Number),
      AdditionalRunOptions: S.optional(
        DataQualityEvaluationRunAdditionalRunOptions,
      ),
      Status: S.optional(TaskStatusType),
      ErrorString: S.optional(S.String),
      StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      LastModifiedOn: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      ExecutionTime: S.optional(S.Number),
      RulesetNames: S.optional(RulesetNames),
      ResultIds: S.optional(DataQualityResultIdList),
      AdditionalDataSources: S.optional(DataSourceMap),
    }),
  ).annotate({
    identifier: "GetDataQualityRulesetEvaluationRunResponse",
  }) as any as S.Schema<GetDataQualityRulesetEvaluationRunResponse>;
export interface GetDevEndpointRequest {
  EndpointName: string;
}
export const GetDevEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDevEndpointRequest",
}) as any as S.Schema<GetDevEndpointRequest>;
export interface GetDevEndpointResponse {
  DevEndpoint?: DevEndpoint;
}
export const GetDevEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DevEndpoint: S.optional(DevEndpoint) }),
).annotate({
  identifier: "GetDevEndpointResponse",
}) as any as S.Schema<GetDevEndpointResponse>;
export interface GetDevEndpointsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const GetDevEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDevEndpointsRequest",
}) as any as S.Schema<GetDevEndpointsRequest>;
export interface GetDevEndpointsResponse {
  DevEndpoints?: DevEndpoint[];
  NextToken?: string;
}
export const GetDevEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DevEndpoints: S.optional(DevEndpointList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDevEndpointsResponse",
}) as any as S.Schema<GetDevEndpointsResponse>;
export type OptionKey = string;
export type OptionValue = string;
export type ConnectionOptions = { [key: string]: string | undefined };
export const ConnectionOptions = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type FilterPredicate = string;
export type Limit = number;
export type SelectedFields = string[];
export const SelectedFields = /*@__PURE__*/ S.Array(S.String);
export interface GetEntityRecordsRequest {
  ConnectionName?: string;
  CatalogId?: string;
  EntityName: string;
  NextToken?: string;
  DataStoreApiVersion?: string;
  ConnectionOptions?: { [key: string]: string | undefined };
  FilterPredicate?: string;
  Limit: number;
  OrderBy?: string;
  SelectedFields?: string[];
}
export const GetEntityRecordsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionName: S.optional(S.String),
    CatalogId: S.optional(S.String),
    EntityName: S.String,
    NextToken: S.optional(S.String),
    DataStoreApiVersion: S.optional(S.String),
    ConnectionOptions: S.optional(ConnectionOptions),
    FilterPredicate: S.optional(S.String),
    Limit: S.Number,
    OrderBy: S.optional(S.String),
    SelectedFields: S.optional(SelectedFields),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetEntityRecordsRequest",
}) as any as S.Schema<GetEntityRecordsRequest>;
export type Record = unknown;
export type Records = any[];
export const Records = /*@__PURE__*/ S.Array(S.Any);
export interface GetEntityRecordsResponse {
  Records?: any[];
  NextToken?: string;
}
export const GetEntityRecordsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Records: S.optional(Records), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "GetEntityRecordsResponse",
}) as any as S.Schema<GetEntityRecordsResponse>;
export interface GetFormTypeRequest {
  Identifier: string;
}
export const GetFormTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/form-types/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFormTypeRequest",
}) as any as S.Schema<GetFormTypeRequest>;
export type FormTypeName = string;
export type FormTypeSchema = string;
export interface GetFormTypeResponse {
  Id?: string;
  Name?: string;
  Schema?: string;
}
export const GetFormTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Schema: S.optional(S.String),
  }),
).annotate({
  identifier: "GetFormTypeResponse",
}) as any as S.Schema<GetFormTypeResponse>;
export interface GetGlossaryRequest {
  Identifier: string;
}
export const GetGlossaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/glossaries/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGlossaryRequest",
}) as any as S.Schema<GetGlossaryRequest>;
export interface GetGlossaryResponse {
  Id?: string;
  Name?: string;
  Description?: string;
}
export const GetGlossaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "GetGlossaryResponse",
}) as any as S.Schema<GetGlossaryResponse>;
export interface GetGlossaryTermRequest {
  Identifier: string;
}
export const GetGlossaryTermRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/glossary-terms/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGlossaryTermRequest",
}) as any as S.Schema<GetGlossaryTermRequest>;
export interface GetGlossaryTermResponse {
  Id?: string;
  GlossaryId?: string;
  Name?: string;
  ShortDescription?: string;
  LongDescription?: string;
}
export const GetGlossaryTermResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    GlossaryId: S.optional(S.String),
    Name: S.optional(S.String),
    ShortDescription: S.optional(S.String),
    LongDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "GetGlossaryTermResponse",
}) as any as S.Schema<GetGlossaryTermResponse>;
export interface GetGlueIdentityCenterConfigurationRequest {}
export const GetGlueIdentityCenterConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetGlueIdentityCenterConfigurationRequest",
  }) as any as S.Schema<GetGlueIdentityCenterConfigurationRequest>;
export type OrchestrationStringList = string[];
export const OrchestrationStringList = /*@__PURE__*/ S.Array(S.String);
export interface GetGlueIdentityCenterConfigurationResponse {
  ApplicationArn?: string;
  InstanceArn?: string;
  Scopes?: string[];
  UserBackgroundSessionsEnabled?: boolean;
}
export const GetGlueIdentityCenterConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationArn: S.optional(S.String),
      InstanceArn: S.optional(S.String),
      Scopes: S.optional(OrchestrationStringList),
      UserBackgroundSessionsEnabled: S.optional(S.Boolean),
    }),
  ).annotate({
    identifier: "GetGlueIdentityCenterConfigurationResponse",
  }) as any as S.Schema<GetGlueIdentityCenterConfigurationResponse>;
export interface GetIntegrationResourcePropertyRequest {
  ResourceArn: string;
}
export const GetIntegrationResourcePropertyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ResourceArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetIntegrationResourcePropertyRequest",
}) as any as S.Schema<GetIntegrationResourcePropertyRequest>;
export interface GetIntegrationResourcePropertyResponse {
  ResourceArn?: string;
  ResourcePropertyArn?: string;
  SourceProcessingProperties?: SourceProcessingProperties;
  TargetProcessingProperties?: TargetProcessingProperties;
}
export const GetIntegrationResourcePropertyResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceArn: S.optional(S.String),
      ResourcePropertyArn: S.optional(S.String),
      SourceProcessingProperties: S.optional(SourceProcessingProperties),
      TargetProcessingProperties: S.optional(TargetProcessingProperties),
    }),
).annotate({
  identifier: "GetIntegrationResourcePropertyResponse",
}) as any as S.Schema<GetIntegrationResourcePropertyResponse>;
export interface GetIntegrationTablePropertiesRequest {
  ResourceArn: string;
  TableName: string;
}
export const GetIntegrationTablePropertiesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ResourceArn: S.String, TableName: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetIntegrationTablePropertiesRequest",
}) as any as S.Schema<GetIntegrationTablePropertiesRequest>;
export interface GetIntegrationTablePropertiesResponse {
  ResourceArn?: string;
  TableName?: string;
  SourceTableConfig?: SourceTableConfig;
  TargetTableConfig?: TargetTableConfig;
}
export const GetIntegrationTablePropertiesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceArn: S.optional(S.String),
      TableName: S.optional(S.String),
      SourceTableConfig: S.optional(SourceTableConfig),
      TargetTableConfig: S.optional(TargetTableConfig),
    }),
).annotate({
  identifier: "GetIntegrationTablePropertiesResponse",
}) as any as S.Schema<GetIntegrationTablePropertiesResponse>;
export interface GetJobRequest {
  JobName: string;
}
export const GetJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "GetJobRequest" }) as any as S.Schema<GetJobRequest>;
export interface GetJobResponse {
  Job?: Job;
}
export const GetJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Job: S.optional(Job) }),
).annotate({ identifier: "GetJobResponse" }) as any as S.Schema<GetJobResponse>;
export type JobName = string;
export type RunId = string;
export interface GetJobBookmarkRequest {
  JobName: string;
  RunId?: string;
}
export const GetJobBookmarkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobName: S.String, RunId: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetJobBookmarkRequest",
}) as any as S.Schema<GetJobBookmarkRequest>;
export type JsonValue = string;
export interface JobBookmarkEntry {
  JobName?: string;
  Version?: number;
  Run?: number;
  Attempt?: number;
  PreviousRunId?: string;
  RunId?: string;
  JobBookmark?: string;
}
export const JobBookmarkEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    Version: S.optional(S.Number),
    Run: S.optional(S.Number),
    Attempt: S.optional(S.Number),
    PreviousRunId: S.optional(S.String),
    RunId: S.optional(S.String),
    JobBookmark: S.optional(S.String),
  }),
).annotate({
  identifier: "JobBookmarkEntry",
}) as any as S.Schema<JobBookmarkEntry>;
export interface GetJobBookmarkResponse {
  JobBookmarkEntry?: JobBookmarkEntry;
}
export const GetJobBookmarkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobBookmarkEntry: S.optional(JobBookmarkEntry) }),
).annotate({
  identifier: "GetJobBookmarkResponse",
}) as any as S.Schema<GetJobBookmarkResponse>;
export interface GetJobRunRequest {
  JobName: string;
  RunId: string;
  PredecessorsIncluded?: boolean;
}
export const GetJobRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.String,
    RunId: S.String,
    PredecessorsIncluded: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetJobRunRequest",
}) as any as S.Schema<GetJobRunRequest>;
export interface GetJobRunResponse {
  JobRun?: JobRun;
}
export const GetJobRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobRun: S.optional(JobRun) }),
).annotate({
  identifier: "GetJobRunResponse",
}) as any as S.Schema<GetJobRunResponse>;
export type OrchestrationPageSize200 = number;
export interface GetJobRunsRequest {
  JobName: string;
  NextToken?: string;
  MaxResults?: number;
}
export const GetJobRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetJobRunsRequest",
}) as any as S.Schema<GetJobRunsRequest>;
export interface GetJobRunsResponse {
  JobRuns?: JobRun[];
  NextToken?: string;
}
export const GetJobRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobRuns: S.optional(JobRunList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetJobRunsResponse",
}) as any as S.Schema<GetJobRunsResponse>;
export interface GetJobsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const GetJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "GetJobsRequest" }) as any as S.Schema<GetJobsRequest>;
export interface GetJobsResponse {
  Jobs?: Job[];
  NextToken?: string;
}
export const GetJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Jobs: S.optional(JobList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "GetJobsResponse",
}) as any as S.Schema<GetJobsResponse>;
export interface CatalogEntry {
  DatabaseName: string;
  TableName: string;
}
export const CatalogEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatabaseName: S.String, TableName: S.String }),
).annotate({ identifier: "CatalogEntry" }) as any as S.Schema<CatalogEntry>;
export type CatalogEntries = CatalogEntry[];
export const CatalogEntries = /*@__PURE__*/ S.Array(CatalogEntry);
export interface Location {
  Jdbc?: CodeGenNodeArg[];
  S3?: CodeGenNodeArg[];
  DynamoDB?: CodeGenNodeArg[];
}
export const Location = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Jdbc: S.optional(CodeGenNodeArgs),
    S3: S.optional(CodeGenNodeArgs),
    DynamoDB: S.optional(CodeGenNodeArgs),
  }),
).annotate({ identifier: "Location" }) as any as S.Schema<Location>;
export interface GetMappingRequest {
  Source: CatalogEntry;
  Sinks?: CatalogEntry[];
  Location?: Location;
}
export const GetMappingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Source: CatalogEntry,
    Sinks: S.optional(CatalogEntries),
    Location: S.optional(Location),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetMappingRequest",
}) as any as S.Schema<GetMappingRequest>;
export type SchemaPathString = string;
export type FieldType = string;
export interface MappingEntry {
  SourceTable?: string;
  SourcePath?: string;
  SourceType?: string;
  TargetTable?: string;
  TargetPath?: string;
  TargetType?: string;
}
export const MappingEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceTable: S.optional(S.String),
    SourcePath: S.optional(S.String),
    SourceType: S.optional(S.String),
    TargetTable: S.optional(S.String),
    TargetPath: S.optional(S.String),
    TargetType: S.optional(S.String),
  }),
).annotate({ identifier: "MappingEntry" }) as any as S.Schema<MappingEntry>;
export type MappingList = MappingEntry[];
export const MappingList = /*@__PURE__*/ S.Array(MappingEntry);
export interface GetMappingResponse {
  Mapping: MappingEntry[];
}
export const GetMappingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Mapping: MappingList }),
).annotate({
  identifier: "GetMappingResponse",
}) as any as S.Schema<GetMappingResponse>;
export type UUIDv4 = string;
export interface GetMaterializedViewRefreshTaskRunRequest {
  CatalogId: string;
  MaterializedViewRefreshTaskRunId: string;
}
export const GetMaterializedViewRefreshTaskRunRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CatalogId: S.String,
      MaterializedViewRefreshTaskRunId: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetMaterializedViewRefreshTaskRunRequest",
}) as any as S.Schema<GetMaterializedViewRefreshTaskRunRequest>;
export type MaterializedViewRefreshState =
  | "STARTING"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "STOPPED"
  | (string & {});
export const MaterializedViewRefreshState = /*@__PURE__*/ S.String;

export type MaterializedViewRefreshType =
  | "FULL"
  | "INCREMENTAL"
  | (string & {});
export const MaterializedViewRefreshType = /*@__PURE__*/ S.String;

export type ByteCount = number;
export interface MaterializedViewRefreshTaskRun {
  CustomerId?: string;
  MaterializedViewRefreshTaskRunId?: string;
  DatabaseName?: string;
  TableName?: string;
  CatalogId?: string;
  Role?: string;
  Status?: MaterializedViewRefreshState;
  CreationTime?: Date;
  LastUpdated?: Date;
  StartTime?: Date;
  EndTime?: Date;
  ErrorMessage?: string;
  DPUSeconds?: number;
  RefreshType?: MaterializedViewRefreshType;
  ProcessedBytes?: number;
}
export const MaterializedViewRefreshTaskRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomerId: S.optional(S.String),
    MaterializedViewRefreshTaskRunId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    TableName: S.optional(S.String),
    CatalogId: S.optional(S.String),
    Role: S.optional(S.String),
    Status: S.optional(MaterializedViewRefreshState),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ErrorMessage: S.optional(S.String),
    DPUSeconds: S.optional(S.Number),
    RefreshType: S.optional(MaterializedViewRefreshType),
    ProcessedBytes: S.optional(S.Number),
  }),
).annotate({
  identifier: "MaterializedViewRefreshTaskRun",
}) as any as S.Schema<MaterializedViewRefreshTaskRun>;
export interface GetMaterializedViewRefreshTaskRunResponse {
  MaterializedViewRefreshTaskRun?: MaterializedViewRefreshTaskRun;
}
export const GetMaterializedViewRefreshTaskRunResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MaterializedViewRefreshTaskRun: S.optional(
        MaterializedViewRefreshTaskRun,
      ),
    }),
  ).annotate({
    identifier: "GetMaterializedViewRefreshTaskRunResponse",
  }) as any as S.Schema<GetMaterializedViewRefreshTaskRunResponse>;
export interface GetMLTaskRunRequest {
  TransformId: string;
  TaskRunId: string;
}
export const GetMLTaskRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransformId: S.String, TaskRunId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetMLTaskRunRequest",
}) as any as S.Schema<GetMLTaskRunRequest>;
export type TaskType =
  | "EVALUATION"
  | "LABELING_SET_GENERATION"
  | "IMPORT_LABELS"
  | "EXPORT_LABELS"
  | "FIND_MATCHES"
  | (string & {});
export const TaskType = /*@__PURE__*/ S.String;

export type ReplaceBoolean = boolean;
export interface ImportLabelsTaskRunProperties {
  InputS3Path?: string;
  Replace?: boolean;
}
export const ImportLabelsTaskRunProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputS3Path: S.optional(S.String),
    Replace: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ImportLabelsTaskRunProperties",
}) as any as S.Schema<ImportLabelsTaskRunProperties>;
export interface ExportLabelsTaskRunProperties {
  OutputS3Path?: string;
}
export const ExportLabelsTaskRunProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OutputS3Path: S.optional(S.String) }),
).annotate({
  identifier: "ExportLabelsTaskRunProperties",
}) as any as S.Schema<ExportLabelsTaskRunProperties>;
export interface LabelingSetGenerationTaskRunProperties {
  OutputS3Path?: string;
}
export const LabelingSetGenerationTaskRunProperties = /*@__PURE__*/ S.suspend(
  () => S.Struct({ OutputS3Path: S.optional(S.String) }),
).annotate({
  identifier: "LabelingSetGenerationTaskRunProperties",
}) as any as S.Schema<LabelingSetGenerationTaskRunProperties>;
export interface FindMatchesTaskRunProperties {
  JobId?: string;
  JobName?: string;
  JobRunId?: string;
}
export const FindMatchesTaskRunProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobName: S.optional(S.String),
    JobRunId: S.optional(S.String),
  }),
).annotate({
  identifier: "FindMatchesTaskRunProperties",
}) as any as S.Schema<FindMatchesTaskRunProperties>;
export interface TaskRunProperties {
  TaskType?: TaskType;
  ImportLabelsTaskRunProperties?: ImportLabelsTaskRunProperties;
  ExportLabelsTaskRunProperties?: ExportLabelsTaskRunProperties;
  LabelingSetGenerationTaskRunProperties?: LabelingSetGenerationTaskRunProperties;
  FindMatchesTaskRunProperties?: FindMatchesTaskRunProperties;
}
export const TaskRunProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskType: S.optional(TaskType),
    ImportLabelsTaskRunProperties: S.optional(ImportLabelsTaskRunProperties),
    ExportLabelsTaskRunProperties: S.optional(ExportLabelsTaskRunProperties),
    LabelingSetGenerationTaskRunProperties: S.optional(
      LabelingSetGenerationTaskRunProperties,
    ),
    FindMatchesTaskRunProperties: S.optional(FindMatchesTaskRunProperties),
  }),
).annotate({
  identifier: "TaskRunProperties",
}) as any as S.Schema<TaskRunProperties>;
export interface GetMLTaskRunResponse {
  TransformId?: string;
  TaskRunId?: string;
  Status?: TaskStatusType;
  LogGroupName?: string;
  Properties?: TaskRunProperties;
  ErrorString?: string;
  StartedOn?: Date;
  LastModifiedOn?: Date;
  CompletedOn?: Date;
  ExecutionTime?: number;
}
export const GetMLTaskRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransformId: S.optional(S.String),
    TaskRunId: S.optional(S.String),
    Status: S.optional(TaskStatusType),
    LogGroupName: S.optional(S.String),
    Properties: S.optional(TaskRunProperties),
    ErrorString: S.optional(S.String),
    StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExecutionTime: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetMLTaskRunResponse",
}) as any as S.Schema<GetMLTaskRunResponse>;
export type PaginationToken = string;
export interface TaskRunFilterCriteria {
  TaskRunType?: TaskType;
  Status?: TaskStatusType;
  StartedBefore?: Date;
  StartedAfter?: Date;
}
export const TaskRunFilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskRunType: S.optional(TaskType),
    Status: S.optional(TaskStatusType),
    StartedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "TaskRunFilterCriteria",
}) as any as S.Schema<TaskRunFilterCriteria>;
export type TaskRunSortColumnType =
  | "TASK_RUN_TYPE"
  | "STATUS"
  | "STARTED"
  | (string & {});
export const TaskRunSortColumnType = /*@__PURE__*/ S.String;

export type SortDirectionType = "DESCENDING" | "ASCENDING" | (string & {});
export const SortDirectionType = /*@__PURE__*/ S.String;

export interface TaskRunSortCriteria {
  Column: TaskRunSortColumnType;
  SortDirection: SortDirectionType;
}
export const TaskRunSortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Column: TaskRunSortColumnType, SortDirection: SortDirectionType }),
).annotate({
  identifier: "TaskRunSortCriteria",
}) as any as S.Schema<TaskRunSortCriteria>;
export interface GetMLTaskRunsRequest {
  TransformId: string;
  NextToken?: string;
  MaxResults?: number;
  Filter?: TaskRunFilterCriteria;
  Sort?: TaskRunSortCriteria;
}
export const GetMLTaskRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransformId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filter: S.optional(TaskRunFilterCriteria),
    Sort: S.optional(TaskRunSortCriteria),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetMLTaskRunsRequest",
}) as any as S.Schema<GetMLTaskRunsRequest>;
export interface TaskRun {
  TransformId?: string;
  TaskRunId?: string;
  Status?: TaskStatusType;
  LogGroupName?: string;
  Properties?: TaskRunProperties;
  ErrorString?: string;
  StartedOn?: Date;
  LastModifiedOn?: Date;
  CompletedOn?: Date;
  ExecutionTime?: number;
}
export const TaskRun = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransformId: S.optional(S.String),
    TaskRunId: S.optional(S.String),
    Status: S.optional(TaskStatusType),
    LogGroupName: S.optional(S.String),
    Properties: S.optional(TaskRunProperties),
    ErrorString: S.optional(S.String),
    StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExecutionTime: S.optional(S.Number),
  }),
).annotate({ identifier: "TaskRun" }) as any as S.Schema<TaskRun>;
export type TaskRunList = TaskRun[];
export const TaskRunList = /*@__PURE__*/ S.Array(TaskRun);
export interface GetMLTaskRunsResponse {
  TaskRuns?: TaskRun[];
  NextToken?: string;
}
export const GetMLTaskRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TaskRuns: S.optional(TaskRunList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetMLTaskRunsResponse",
}) as any as S.Schema<GetMLTaskRunsResponse>;
export interface GetMLTransformRequest {
  TransformId: string;
}
export const GetMLTransformRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransformId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetMLTransformRequest",
}) as any as S.Schema<GetMLTransformRequest>;
export type TransformStatusType =
  | "NOT_READY"
  | "READY"
  | "DELETING"
  | (string & {});
export const TransformStatusType = /*@__PURE__*/ S.String;

export type RecordsCount = number;
export interface ConfusionMatrix {
  NumTruePositives?: number;
  NumFalsePositives?: number;
  NumTrueNegatives?: number;
  NumFalseNegatives?: number;
}
export const ConfusionMatrix = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumTruePositives: S.optional(S.Number),
    NumFalsePositives: S.optional(S.Number),
    NumTrueNegatives: S.optional(S.Number),
    NumFalseNegatives: S.optional(S.Number),
  }),
).annotate({
  identifier: "ConfusionMatrix",
}) as any as S.Schema<ConfusionMatrix>;
export interface ColumnImportance {
  ColumnName?: string;
  Importance?: number;
}
export const ColumnImportance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColumnName: S.optional(S.String),
    Importance: S.optional(S.Number),
  }),
).annotate({
  identifier: "ColumnImportance",
}) as any as S.Schema<ColumnImportance>;
export type ColumnImportanceList = ColumnImportance[];
export const ColumnImportanceList = /*@__PURE__*/ S.Array(ColumnImportance);
export interface FindMatchesMetrics {
  AreaUnderPRCurve?: number;
  Precision?: number;
  Recall?: number;
  F1?: number;
  ConfusionMatrix?: ConfusionMatrix;
  ColumnImportances?: ColumnImportance[];
}
export const FindMatchesMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AreaUnderPRCurve: S.optional(S.Number),
    Precision: S.optional(S.Number),
    Recall: S.optional(S.Number),
    F1: S.optional(S.Number),
    ConfusionMatrix: S.optional(ConfusionMatrix),
    ColumnImportances: S.optional(ColumnImportanceList),
  }),
).annotate({
  identifier: "FindMatchesMetrics",
}) as any as S.Schema<FindMatchesMetrics>;
export interface EvaluationMetrics {
  TransformType: TransformType;
  FindMatchesMetrics?: FindMatchesMetrics;
}
export const EvaluationMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransformType: TransformType,
    FindMatchesMetrics: S.optional(FindMatchesMetrics),
  }),
).annotate({
  identifier: "EvaluationMetrics",
}) as any as S.Schema<EvaluationMetrics>;
export type LabelCount = number;
export interface SchemaColumn {
  Name?: string;
  DataType?: string;
}
export const SchemaColumn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), DataType: S.optional(S.String) }),
).annotate({ identifier: "SchemaColumn" }) as any as S.Schema<SchemaColumn>;
export type TransformSchema = SchemaColumn[];
export const TransformSchema = /*@__PURE__*/ S.Array(SchemaColumn);
export interface GetMLTransformResponse {
  TransformId?: string;
  Name?: string;
  Description?: string;
  Status?: TransformStatusType;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  InputRecordTables?: GlueTable[];
  Parameters?: TransformParameters;
  EvaluationMetrics?: EvaluationMetrics;
  LabelCount?: number;
  Schema?: SchemaColumn[];
  Role?: string;
  GlueVersion?: string;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  Timeout?: number;
  MaxRetries?: number;
  TransformEncryption?: TransformEncryption;
}
export const GetMLTransformResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransformId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(TransformStatusType),
    CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InputRecordTables: S.optional(GlueTables),
    Parameters: S.optional(TransformParameters),
    EvaluationMetrics: S.optional(EvaluationMetrics),
    LabelCount: S.optional(S.Number),
    Schema: S.optional(TransformSchema),
    Role: S.optional(S.String),
    GlueVersion: S.optional(S.String),
    MaxCapacity: S.optional(S.Number),
    WorkerType: S.optional(WorkerType),
    NumberOfWorkers: S.optional(S.Number),
    Timeout: S.optional(S.Number),
    MaxRetries: S.optional(S.Number),
    TransformEncryption: S.optional(TransformEncryption),
  }),
).annotate({
  identifier: "GetMLTransformResponse",
}) as any as S.Schema<GetMLTransformResponse>;
export interface TransformFilterCriteria {
  Name?: string;
  TransformType?: TransformType;
  Status?: TransformStatusType;
  GlueVersion?: string;
  CreatedBefore?: Date;
  CreatedAfter?: Date;
  LastModifiedBefore?: Date;
  LastModifiedAfter?: Date;
  Schema?: SchemaColumn[];
}
export const TransformFilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    TransformType: S.optional(TransformType),
    Status: S.optional(TransformStatusType),
    GlueVersion: S.optional(S.String),
    CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastModifiedAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Schema: S.optional(TransformSchema),
  }),
).annotate({
  identifier: "TransformFilterCriteria",
}) as any as S.Schema<TransformFilterCriteria>;
export type TransformSortColumnType =
  | "NAME"
  | "TRANSFORM_TYPE"
  | "STATUS"
  | "CREATED"
  | "LAST_MODIFIED"
  | (string & {});
export const TransformSortColumnType = /*@__PURE__*/ S.String;

export interface TransformSortCriteria {
  Column: TransformSortColumnType;
  SortDirection: SortDirectionType;
}
export const TransformSortCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Column: TransformSortColumnType,
    SortDirection: SortDirectionType,
  }),
).annotate({
  identifier: "TransformSortCriteria",
}) as any as S.Schema<TransformSortCriteria>;
export interface GetMLTransformsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filter?: TransformFilterCriteria;
  Sort?: TransformSortCriteria;
}
export const GetMLTransformsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filter: S.optional(TransformFilterCriteria),
    Sort: S.optional(TransformSortCriteria),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetMLTransformsRequest",
}) as any as S.Schema<GetMLTransformsRequest>;
export interface MLTransform {
  TransformId?: string;
  Name?: string;
  Description?: string;
  Status?: TransformStatusType;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  InputRecordTables?: GlueTable[];
  Parameters?: TransformParameters;
  EvaluationMetrics?: EvaluationMetrics;
  LabelCount?: number;
  Schema?: SchemaColumn[];
  Role?: string;
  GlueVersion?: string;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  Timeout?: number;
  MaxRetries?: number;
  TransformEncryption?: TransformEncryption;
}
export const MLTransform = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransformId: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(TransformStatusType),
    CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InputRecordTables: S.optional(GlueTables),
    Parameters: S.optional(TransformParameters),
    EvaluationMetrics: S.optional(EvaluationMetrics),
    LabelCount: S.optional(S.Number),
    Schema: S.optional(TransformSchema),
    Role: S.optional(S.String),
    GlueVersion: S.optional(S.String),
    MaxCapacity: S.optional(S.Number),
    WorkerType: S.optional(WorkerType),
    NumberOfWorkers: S.optional(S.Number),
    Timeout: S.optional(S.Number),
    MaxRetries: S.optional(S.Number),
    TransformEncryption: S.optional(TransformEncryption),
  }),
).annotate({ identifier: "MLTransform" }) as any as S.Schema<MLTransform>;
export type TransformList = MLTransform[];
export const TransformList = /*@__PURE__*/ S.Array(MLTransform);
export interface GetMLTransformsResponse {
  Transforms: MLTransform[];
  NextToken?: string;
}
export const GetMLTransformsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Transforms: TransformList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "GetMLTransformsResponse",
}) as any as S.Schema<GetMLTransformsResponse>;
export interface GetPartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionValues: string[];
  AuditContext?: AuditContext;
}
export const GetPartitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    PartitionValues: ValueStringList,
    AuditContext: S.optional(AuditContext),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPartitionRequest",
}) as any as S.Schema<GetPartitionRequest>;
export interface GetPartitionResponse {
  Partition?: Partition;
}
export const GetPartitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Partition: S.optional(Partition) }),
).annotate({
  identifier: "GetPartitionResponse",
}) as any as S.Schema<GetPartitionResponse>;
export interface GetPartitionIndexesRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  NextToken?: string;
}
export const GetPartitionIndexesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPartitionIndexesRequest",
}) as any as S.Schema<GetPartitionIndexesRequest>;
export interface KeySchemaElement {
  Name: string;
  Type: string;
}
export const KeySchemaElement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Type: S.String }),
).annotate({
  identifier: "KeySchemaElement",
}) as any as S.Schema<KeySchemaElement>;
export type KeySchemaElementList = KeySchemaElement[];
export const KeySchemaElementList = /*@__PURE__*/ S.Array(KeySchemaElement);
export type PartitionIndexStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const PartitionIndexStatus = /*@__PURE__*/ S.String;

export type BackfillErrorCode =
  | "ENCRYPTED_PARTITION_ERROR"
  | "INTERNAL_ERROR"
  | "INVALID_PARTITION_TYPE_DATA_ERROR"
  | "MISSING_PARTITION_VALUE_ERROR"
  | "UNSUPPORTED_PARTITION_CHARACTER_ERROR"
  | (string & {});
export const BackfillErrorCode = /*@__PURE__*/ S.String;

export type BackfillErroredPartitionsList = PartitionValueList[];
export const BackfillErroredPartitionsList =
  /*@__PURE__*/ S.Array(PartitionValueList);
export interface BackfillError {
  Code?: BackfillErrorCode;
  Partitions?: PartitionValueList[];
}
export const BackfillError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(BackfillErrorCode),
    Partitions: S.optional(BackfillErroredPartitionsList),
  }),
).annotate({ identifier: "BackfillError" }) as any as S.Schema<BackfillError>;
export type BackfillErrors = BackfillError[];
export const BackfillErrors = /*@__PURE__*/ S.Array(BackfillError);
export interface PartitionIndexDescriptor {
  IndexName: string;
  Keys: KeySchemaElement[];
  IndexStatus: PartitionIndexStatus;
  BackfillErrors?: BackfillError[];
}
export const PartitionIndexDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexName: S.String,
    Keys: KeySchemaElementList,
    IndexStatus: PartitionIndexStatus,
    BackfillErrors: S.optional(BackfillErrors),
  }),
).annotate({
  identifier: "PartitionIndexDescriptor",
}) as any as S.Schema<PartitionIndexDescriptor>;
export type PartitionIndexDescriptorList = PartitionIndexDescriptor[];
export const PartitionIndexDescriptorList = /*@__PURE__*/ S.Array(
  PartitionIndexDescriptor,
);
export interface GetPartitionIndexesResponse {
  PartitionIndexDescriptorList?: PartitionIndexDescriptor[];
  NextToken?: string;
}
export const GetPartitionIndexesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PartitionIndexDescriptorList: S.optional(PartitionIndexDescriptorList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPartitionIndexesResponse",
}) as any as S.Schema<GetPartitionIndexesResponse>;
export type PredicateString = string;
export type TotalSegmentsInteger = number;
export interface Segment {
  SegmentNumber: number;
  TotalSegments: number;
}
export const Segment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SegmentNumber: S.Number, TotalSegments: S.Number }),
).annotate({ identifier: "Segment" }) as any as S.Schema<Segment>;
export type BooleanNullable = boolean;
export interface GetPartitionsRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  Expression?: string;
  NextToken?: string;
  Segment?: Segment;
  MaxResults?: number;
  ExcludeColumnSchema?: boolean;
  TransactionId?: string;
  QueryAsOfTime?: Date;
  AuditContext?: AuditContext;
}
export const GetPartitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    Expression: S.optional(S.String),
    NextToken: S.optional(S.String),
    Segment: S.optional(Segment),
    MaxResults: S.optional(S.Number),
    ExcludeColumnSchema: S.optional(S.Boolean),
    TransactionId: S.optional(S.String),
    QueryAsOfTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AuditContext: S.optional(AuditContext),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPartitionsRequest",
}) as any as S.Schema<GetPartitionsRequest>;
export interface GetPartitionsResponse {
  Partitions?: Partition[];
  NextToken?: string;
}
export const GetPartitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Partitions: S.optional(PartitionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPartitionsResponse",
}) as any as S.Schema<GetPartitionsResponse>;
export type AdditionalPlanOptionsMap = { [key: string]: string | undefined };
export const AdditionalPlanOptionsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GetPlanRequest {
  Mapping: MappingEntry[];
  Source: CatalogEntry;
  Sinks?: CatalogEntry[];
  Location?: Location;
  Language?: Language;
  AdditionalPlanOptionsMap?: { [key: string]: string | undefined };
}
export const GetPlanRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Mapping: MappingList,
    Source: CatalogEntry,
    Sinks: S.optional(CatalogEntries),
    Location: S.optional(Location),
    Language: S.optional(Language),
    AdditionalPlanOptionsMap: S.optional(AdditionalPlanOptionsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "GetPlanRequest" }) as any as S.Schema<GetPlanRequest>;
export interface GetPlanResponse {
  PythonScript?: string;
  ScalaCode?: string;
}
export const GetPlanResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PythonScript: S.optional(S.String),
    ScalaCode: S.optional(S.String),
  }),
).annotate({
  identifier: "GetPlanResponse",
}) as any as S.Schema<GetPlanResponse>;
export interface GetRegistryInput {
  RegistryId: RegistryId;
}
export const GetRegistryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegistryId: RegistryId }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRegistryInput",
}) as any as S.Schema<GetRegistryInput>;
export type CreatedTimestamp = string;
export type UpdatedTimestamp = string;
export interface GetRegistryResponse {
  RegistryName?: string;
  RegistryArn?: string;
  Description?: string;
  Status?: RegistryStatus;
  CreatedTime?: string;
  UpdatedTime?: string;
}
export const GetRegistryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryName: S.optional(S.String),
    RegistryArn: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(RegistryStatus),
    CreatedTime: S.optional(S.String),
    UpdatedTime: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRegistryResponse",
}) as any as S.Schema<GetRegistryResponse>;
export interface GetResourcePoliciesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const GetResourcePoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourcePoliciesRequest",
}) as any as S.Schema<GetResourcePoliciesRequest>;
export type PolicyJsonString = string;
export interface GluePolicy {
  PolicyInJson?: string;
  PolicyHash?: string;
  CreateTime?: Date;
  UpdateTime?: Date;
}
export const GluePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyInJson: S.optional(S.String),
    PolicyHash: S.optional(S.String),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "GluePolicy" }) as any as S.Schema<GluePolicy>;
export type GetResourcePoliciesResponseList = GluePolicy[];
export const GetResourcePoliciesResponseList =
  /*@__PURE__*/ S.Array(GluePolicy);
export interface GetResourcePoliciesResponse {
  GetResourcePoliciesResponseList?: GluePolicy[];
  NextToken?: string;
}
export const GetResourcePoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GetResourcePoliciesResponseList: S.optional(
      GetResourcePoliciesResponseList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetResourcePoliciesResponse",
}) as any as S.Schema<GetResourcePoliciesResponse>;
export interface GetResourcePolicyRequest {
  ResourceArn?: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export interface GetResourcePolicyResponse {
  PolicyInJson?: string;
  PolicyHash?: string;
  CreateTime?: Date;
  UpdateTime?: Date;
}
export const GetResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyInJson: S.optional(S.String),
    PolicyHash: S.optional(S.String),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetResourcePolicyResponse",
}) as any as S.Schema<GetResourcePolicyResponse>;
export interface GetSchemaInput {
  SchemaId: SchemaId;
}
export const GetSchemaInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SchemaId: SchemaId }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "GetSchemaInput" }) as any as S.Schema<GetSchemaInput>;
export interface GetSchemaResponse {
  RegistryName?: string;
  RegistryArn?: string;
  SchemaName?: string;
  SchemaArn?: string;
  Description?: string;
  DataFormat?: DataFormat;
  Compatibility?: Compatibility;
  SchemaCheckpoint?: number;
  LatestSchemaVersion?: number;
  NextSchemaVersion?: number;
  SchemaStatus?: SchemaStatus;
  CreatedTime?: string;
  UpdatedTime?: string;
}
export const GetSchemaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryName: S.optional(S.String),
    RegistryArn: S.optional(S.String),
    SchemaName: S.optional(S.String),
    SchemaArn: S.optional(S.String),
    Description: S.optional(S.String),
    DataFormat: S.optional(DataFormat),
    Compatibility: S.optional(Compatibility),
    SchemaCheckpoint: S.optional(S.Number),
    LatestSchemaVersion: S.optional(S.Number),
    NextSchemaVersion: S.optional(S.Number),
    SchemaStatus: S.optional(SchemaStatus),
    CreatedTime: S.optional(S.String),
    UpdatedTime: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSchemaResponse",
}) as any as S.Schema<GetSchemaResponse>;
export interface GetSchemaByDefinitionInput {
  SchemaId: SchemaId;
  SchemaDefinition: string;
}
export const GetSchemaByDefinitionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SchemaId: SchemaId, SchemaDefinition: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSchemaByDefinitionInput",
}) as any as S.Schema<GetSchemaByDefinitionInput>;
export interface GetSchemaByDefinitionResponse {
  SchemaVersionId?: string;
  SchemaArn?: string;
  DataFormat?: DataFormat;
  Status?: SchemaVersionStatus;
  CreatedTime?: string;
}
export const GetSchemaByDefinitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaVersionId: S.optional(S.String),
    SchemaArn: S.optional(S.String),
    DataFormat: S.optional(DataFormat),
    Status: S.optional(SchemaVersionStatus),
    CreatedTime: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSchemaByDefinitionResponse",
}) as any as S.Schema<GetSchemaByDefinitionResponse>;
export type LatestSchemaVersionBoolean = boolean;
export interface SchemaVersionNumber {
  LatestVersion?: boolean;
  VersionNumber?: number;
}
export const SchemaVersionNumber = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LatestVersion: S.optional(S.Boolean),
    VersionNumber: S.optional(S.Number),
  }),
).annotate({
  identifier: "SchemaVersionNumber",
}) as any as S.Schema<SchemaVersionNumber>;
export interface GetSchemaVersionInput {
  SchemaId?: SchemaId;
  SchemaVersionId?: string;
  SchemaVersionNumber?: SchemaVersionNumber;
}
export const GetSchemaVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: S.optional(SchemaId),
    SchemaVersionId: S.optional(S.String),
    SchemaVersionNumber: S.optional(SchemaVersionNumber),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSchemaVersionInput",
}) as any as S.Schema<GetSchemaVersionInput>;
export interface GetSchemaVersionResponse {
  SchemaVersionId?: string;
  SchemaDefinition?: string;
  DataFormat?: DataFormat;
  SchemaArn?: string;
  VersionNumber?: number;
  Status?: SchemaVersionStatus;
  CreatedTime?: string;
}
export const GetSchemaVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaVersionId: S.optional(S.String),
    SchemaDefinition: S.optional(S.String),
    DataFormat: S.optional(DataFormat),
    SchemaArn: S.optional(S.String),
    VersionNumber: S.optional(S.Number),
    Status: S.optional(SchemaVersionStatus),
    CreatedTime: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSchemaVersionResponse",
}) as any as S.Schema<GetSchemaVersionResponse>;
export type SchemaDiffType = "SYNTAX_DIFF" | (string & {});
export const SchemaDiffType = /*@__PURE__*/ S.String;

export interface GetSchemaVersionsDiffInput {
  SchemaId: SchemaId;
  FirstSchemaVersionNumber: SchemaVersionNumber;
  SecondSchemaVersionNumber: SchemaVersionNumber;
  SchemaDiffType: SchemaDiffType;
}
export const GetSchemaVersionsDiffInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: SchemaId,
    FirstSchemaVersionNumber: SchemaVersionNumber,
    SecondSchemaVersionNumber: SchemaVersionNumber,
    SchemaDiffType: SchemaDiffType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSchemaVersionsDiffInput",
}) as any as S.Schema<GetSchemaVersionsDiffInput>;
export type SchemaDefinitionDiff = string;
export interface GetSchemaVersionsDiffResponse {
  Diff?: string;
}
export const GetSchemaVersionsDiffResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Diff: S.optional(S.String) }),
).annotate({
  identifier: "GetSchemaVersionsDiffResponse",
}) as any as S.Schema<GetSchemaVersionsDiffResponse>;
export interface GetSecurityConfigurationRequest {
  Name: string;
}
export const GetSecurityConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSecurityConfigurationRequest",
}) as any as S.Schema<GetSecurityConfigurationRequest>;
export interface SecurityConfiguration {
  Name?: string;
  CreatedTimeStamp?: Date;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export const SecurityConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    CreatedTimeStamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
  }),
).annotate({
  identifier: "SecurityConfiguration",
}) as any as S.Schema<SecurityConfiguration>;
export interface GetSecurityConfigurationResponse {
  SecurityConfiguration?: SecurityConfiguration;
}
export const GetSecurityConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecurityConfiguration: S.optional(SecurityConfiguration) }),
).annotate({
  identifier: "GetSecurityConfigurationResponse",
}) as any as S.Schema<GetSecurityConfigurationResponse>;
export interface GetSecurityConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const GetSecurityConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSecurityConfigurationsRequest",
}) as any as S.Schema<GetSecurityConfigurationsRequest>;
export type SecurityConfigurationList = SecurityConfiguration[];
export const SecurityConfigurationList = /*@__PURE__*/ S.Array(
  SecurityConfiguration,
);
export interface GetSecurityConfigurationsResponse {
  SecurityConfigurations?: SecurityConfiguration[];
  NextToken?: string;
}
export const GetSecurityConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityConfigurations: S.optional(SecurityConfigurationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSecurityConfigurationsResponse",
}) as any as S.Schema<GetSecurityConfigurationsResponse>;
export interface GetSessionRequest {
  Id: string;
  RequestOrigin?: string;
}
export const GetSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, RequestOrigin: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSessionRequest",
}) as any as S.Schema<GetSessionRequest>;
export interface GetSessionResponse {
  Session?: Session;
}
export const GetSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Session: S.optional(Session) }),
).annotate({
  identifier: "GetSessionResponse",
}) as any as S.Schema<GetSessionResponse>;
export interface GetSessionEndpointRequest {
  SessionId: string;
}
export const GetSessionEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSessionEndpointRequest",
}) as any as S.Schema<GetSessionEndpointRequest>;
export type SparkConnectEndpointUrl = string;
export type SensitiveString = string | redacted.Redacted<string>;
export interface SessionEndpoint {
  Url: string;
  AuthToken: string | redacted.Redacted<string>;
  AuthTokenExpirationTime: Date;
}
export const SessionEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Url: S.String,
    AuthToken: SensitiveString,
    AuthTokenExpirationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "SessionEndpoint",
}) as any as S.Schema<SessionEndpoint>;
export interface GetSessionEndpointResponse {
  SparkConnect: SessionEndpoint;
}
export const GetSessionEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SparkConnect: SessionEndpoint }).pipe(
    S.encodeKeys({ SparkConnect: "SPARK_CONNECT" }),
  ),
).annotate({
  identifier: "GetSessionEndpointResponse",
}) as any as S.Schema<GetSessionEndpointResponse>;
export interface GetStatementRequest {
  SessionId: string;
  Id: number;
  RequestOrigin?: string;
}
export const GetStatementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.String,
    Id: S.Number,
    RequestOrigin: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetStatementRequest",
}) as any as S.Schema<GetStatementRequest>;
export type StatementState =
  | "WAITING"
  | "RUNNING"
  | "AVAILABLE"
  | "CANCELLING"
  | "CANCELLED"
  | "ERROR"
  | (string & {});
export const StatementState = /*@__PURE__*/ S.String;

export interface StatementOutputData {
  TextPlain?: string;
}
export const StatementOutputData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TextPlain: S.optional(S.String) }),
).annotate({
  identifier: "StatementOutputData",
}) as any as S.Schema<StatementOutputData>;
export interface StatementOutput {
  Data?: StatementOutputData;
  ExecutionCount?: number;
  Status?: StatementState;
  ErrorName?: string;
  ErrorValue?: string;
  Traceback?: string[];
}
export const StatementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Data: S.optional(StatementOutputData),
    ExecutionCount: S.optional(S.Number),
    Status: S.optional(StatementState),
    ErrorName: S.optional(S.String),
    ErrorValue: S.optional(S.String),
    Traceback: S.optional(OrchestrationStringList),
  }),
).annotate({
  identifier: "StatementOutput",
}) as any as S.Schema<StatementOutput>;
export type LongValue = number;
export interface Statement {
  Id?: number;
  Code?: string;
  State?: StatementState;
  Output?: StatementOutput;
  Progress?: number;
  StartedOn?: number;
  CompletedOn?: number;
}
export const Statement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.Number),
    Code: S.optional(S.String),
    State: S.optional(StatementState),
    Output: S.optional(StatementOutput),
    Progress: S.optional(S.Number),
    StartedOn: S.optional(S.Number),
    CompletedOn: S.optional(S.Number),
  }),
).annotate({ identifier: "Statement" }) as any as S.Schema<Statement>;
export interface GetStatementResponse {
  Statement?: Statement;
}
export const GetStatementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Statement: S.optional(Statement) }),
).annotate({
  identifier: "GetStatementResponse",
}) as any as S.Schema<GetStatementResponse>;
export type TableAttributes =
  | "NAME"
  | "TABLE_TYPE"
  | "DEFAULT"
  | "LATEST_ICEBERG_METADATA"
  | (string & {});
export const TableAttributes = /*@__PURE__*/ S.String;

export type TableAttributesList = TableAttributes[];
export const TableAttributesList = /*@__PURE__*/ S.Array(TableAttributes);
export interface GetTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  Name: string;
  TransactionId?: string;
  QueryAsOfTime?: Date;
  AuditContext?: AuditContext;
  IncludeStatusDetails?: boolean;
  AttributesToGet?: TableAttributes[];
}
export const GetTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    Name: S.String,
    TransactionId: S.optional(S.String),
    QueryAsOfTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AuditContext: S.optional(AuditContext),
    IncludeStatusDetails: S.optional(S.Boolean),
    AttributesToGet: S.optional(TableAttributesList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTableRequest",
}) as any as S.Schema<GetTableRequest>;
export interface FederatedTable {
  Identifier?: string;
  DatabaseIdentifier?: string;
  ConnectionName?: string;
  ConnectionType?: string;
}
export const FederatedTable = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.optional(S.String),
    DatabaseIdentifier: S.optional(S.String),
    ConnectionName: S.optional(S.String),
    ConnectionType: S.optional(S.String),
  }),
).annotate({ identifier: "FederatedTable" }) as any as S.Schema<FederatedTable>;
export interface ViewRepresentation {
  Dialect?: ViewDialect;
  DialectVersion?: string;
  ViewOriginalText?: string;
  ViewExpandedText?: string;
  ValidationConnection?: string;
  IsStale?: boolean;
}
export const ViewRepresentation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dialect: S.optional(ViewDialect),
    DialectVersion: S.optional(S.String),
    ViewOriginalText: S.optional(S.String),
    ViewExpandedText: S.optional(S.String),
    ValidationConnection: S.optional(S.String),
    IsStale: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ViewRepresentation",
}) as any as S.Schema<ViewRepresentation>;
export type ViewRepresentationList = ViewRepresentation[];
export const ViewRepresentationList = /*@__PURE__*/ S.Array(ViewRepresentation);
export interface ViewDefinition {
  IsProtected?: boolean;
  Definer?: string;
  ViewVersionId?: number;
  ViewVersionToken?: string;
  RefreshSeconds?: number;
  LastRefreshType?: LastRefreshType;
  SubObjects?: string[];
  SubObjectVersionIds?: number[];
  Representations?: ViewRepresentation[];
}
export const ViewDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsProtected: S.optional(S.Boolean),
    Definer: S.optional(S.String),
    ViewVersionId: S.optional(S.Number),
    ViewVersionToken: S.optional(S.String),
    RefreshSeconds: S.optional(S.Number),
    LastRefreshType: S.optional(LastRefreshType),
    SubObjects: S.optional(ViewSubObjectsList),
    SubObjectVersionIds: S.optional(ViewSubObjectVersionIdsList),
    Representations: S.optional(ViewRepresentationList),
  }),
).annotate({ identifier: "ViewDefinition" }) as any as S.Schema<ViewDefinition>;
export type TableIdString = string;
export type IcebergSchemaList = IcebergSchema[];
export const IcebergSchemaList = /*@__PURE__*/ S.Array(IcebergSchema);
export type IcebergPartitionSpecList = IcebergPartitionSpec[];
export const IcebergPartitionSpecList =
  /*@__PURE__*/ S.Array(IcebergPartitionSpec);
export type IcebergSortOrderList = IcebergSortOrder[];
export const IcebergSortOrderList = /*@__PURE__*/ S.Array(IcebergSortOrder);
export interface IcebergTableMetadata {
  FormatVersion?: string;
  TableUuid?: string;
  Location?: string;
  Properties?: { [key: string]: string | undefined };
  Schemas?: IcebergSchema[];
  CurrentSchemaId?: number;
  LastColumnId?: number;
  PartitionSpecs?: IcebergPartitionSpec[];
  DefaultSpecId?: number;
  LastPartitionId?: number;
  SortOrders?: IcebergSortOrder[];
  DefaultSortOrderId?: number;
}
export const IcebergTableMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FormatVersion: S.optional(S.String),
    TableUuid: S.optional(S.String),
    Location: S.optional(S.String),
    Properties: S.optional(StringToStringMap),
    Schemas: S.optional(IcebergSchemaList),
    CurrentSchemaId: S.optional(S.Number),
    LastColumnId: S.optional(S.Number),
    PartitionSpecs: S.optional(IcebergPartitionSpecList),
    DefaultSpecId: S.optional(S.Number),
    LastPartitionId: S.optional(S.Number),
    SortOrders: S.optional(IcebergSortOrderList),
    DefaultSortOrderId: S.optional(S.Number),
  }),
).annotate({
  identifier: "IcebergTableMetadata",
}) as any as S.Schema<IcebergTableMetadata>;
export type ResourceAction = "UPDATE" | "CREATE" | (string & {});
export const ResourceAction = /*@__PURE__*/ S.String;

export type ResourceState =
  | "QUEUED"
  | "IN_PROGRESS"
  | "SUCCESS"
  | "STOPPED"
  | "FAILED"
  | (string & {});
export const ResourceState = /*@__PURE__*/ S.String;

export interface ViewValidation {
  Dialect?: ViewDialect;
  DialectVersion?: string;
  ViewValidationText?: string;
  UpdateTime?: Date;
  State?: ResourceState;
  Error?: ErrorDetail;
}
export const ViewValidation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dialect: S.optional(ViewDialect),
    DialectVersion: S.optional(S.String),
    ViewValidationText: S.optional(S.String),
    UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    State: S.optional(ResourceState),
    Error: S.optional(ErrorDetail),
  }),
).annotate({ identifier: "ViewValidation" }) as any as S.Schema<ViewValidation>;
export type ViewValidationList = ViewValidation[];
export const ViewValidationList = /*@__PURE__*/ S.Array(ViewValidation);
export interface StatusDetails {
  RequestedChange?: Table;
  ViewValidations?: ViewValidation[];
}
export const StatusDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RequestedChange: S.optional(
      S.suspend((): S.Schema<Table> => Table).annotate({ identifier: "Table" }),
    ),
    ViewValidations: S.optional(ViewValidationList),
  }),
).annotate({ identifier: "StatusDetails" }) as any as S.Schema<StatusDetails>;
export interface TableStatus {
  RequestedBy?: string;
  UpdatedBy?: string;
  RequestTime?: Date;
  UpdateTime?: Date;
  Action?: ResourceAction;
  State?: ResourceState;
  Error?: ErrorDetail;
  Details?: StatusDetails;
}
export const TableStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RequestedBy: S.optional(S.String),
    UpdatedBy: S.optional(S.String),
    RequestTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Action: S.optional(ResourceAction),
    State: S.optional(ResourceState),
    Error: S.optional(ErrorDetail),
    Details: S.optional(
      S.suspend((): S.Schema<StatusDetails> => StatusDetails).annotate({
        identifier: "StatusDetails",
      }),
    ),
  }),
).annotate({ identifier: "TableStatus" }) as any as S.Schema<TableStatus>;
export interface Table {
  Name: string;
  DatabaseName?: string;
  Description?: string;
  Owner?: string;
  CreateTime?: Date;
  UpdateTime?: Date;
  LastAccessTime?: Date;
  LastAnalyzedTime?: Date;
  Retention?: number;
  StorageDescriptor?: StorageDescriptor;
  PartitionKeys?: Column[];
  ViewOriginalText?: string;
  ViewExpandedText?: string;
  TableType?: string;
  Parameters?: { [key: string]: string | undefined };
  CreatedBy?: string;
  IsRegisteredWithLakeFormation?: boolean;
  TargetTable?: TableIdentifier;
  CatalogId?: string;
  VersionId?: string;
  FederatedTable?: FederatedTable;
  ViewDefinition?: ViewDefinition;
  IsMultiDialectView?: boolean;
  IsMaterializedView?: boolean;
  IcebergTableMetadata?: IcebergTableMetadata;
  Status?: TableStatus;
}
export const Table = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    DatabaseName: S.optional(S.String),
    Description: S.optional(S.String),
    Owner: S.optional(S.String),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastAccessTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastAnalyzedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Retention: S.optional(S.Number),
    StorageDescriptor: S.optional(StorageDescriptor),
    PartitionKeys: S.optional(ColumnList),
    ViewOriginalText: S.optional(S.String),
    ViewExpandedText: S.optional(S.String),
    TableType: S.optional(S.String),
    Parameters: S.optional(ParametersMap),
    CreatedBy: S.optional(S.String),
    IsRegisteredWithLakeFormation: S.optional(S.Boolean),
    TargetTable: S.optional(TableIdentifier),
    CatalogId: S.optional(S.String),
    VersionId: S.optional(S.String),
    FederatedTable: S.optional(FederatedTable),
    ViewDefinition: S.optional(ViewDefinition),
    IsMultiDialectView: S.optional(S.Boolean),
    IsMaterializedView: S.optional(S.Boolean),
    IcebergTableMetadata: S.optional(IcebergTableMetadata),
    Status: S.optional(
      S.suspend((): S.Schema<TableStatus> => TableStatus).annotate({
        identifier: "TableStatus",
      }),
    ),
  }),
).annotate({ identifier: "Table" }) as any as S.Schema<Table>;
export interface GetTableResponse {
  Table?: Table;
}
export const GetTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Table: S.optional(Table) }),
).annotate({
  identifier: "GetTableResponse",
}) as any as S.Schema<GetTableResponse>;
export interface GetTableOptimizerRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  Type: TableOptimizerType;
}
export const GetTableOptimizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.String,
    DatabaseName: S.String,
    TableName: S.String,
    Type: TableOptimizerType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTableOptimizerRequest",
}) as any as S.Schema<GetTableOptimizerRequest>;
export interface GetTableOptimizerResponse {
  CatalogId?: string;
  DatabaseName?: string;
  TableName?: string;
  TableOptimizer?: TableOptimizer;
}
export const GetTableOptimizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    TableName: S.optional(S.String),
    TableOptimizer: S.optional(TableOptimizer),
  }),
).annotate({
  identifier: "GetTableOptimizerResponse",
}) as any as S.Schema<GetTableOptimizerResponse>;
export type FilterString = string;
export interface GetTablesRequest {
  CatalogId?: string;
  DatabaseName: string;
  Expression?: string;
  NextToken?: string;
  MaxResults?: number;
  TransactionId?: string;
  QueryAsOfTime?: Date;
  AuditContext?: AuditContext;
  IncludeStatusDetails?: boolean;
  AttributesToGet?: TableAttributes[];
}
export const GetTablesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    Expression: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    TransactionId: S.optional(S.String),
    QueryAsOfTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AuditContext: S.optional(AuditContext),
    IncludeStatusDetails: S.optional(S.Boolean),
    AttributesToGet: S.optional(TableAttributesList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTablesRequest",
}) as any as S.Schema<GetTablesRequest>;
export type TableList = Table[];
export const TableList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Table> => Table).annotate({ identifier: "Table" }),
);
export interface GetTablesResponse {
  TableList?: Table[];
  NextToken?: string;
}
export const GetTablesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableList: S.optional(TableList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTablesResponse",
}) as any as S.Schema<GetTablesResponse>;
export interface GetTableVersionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  VersionId?: string;
  AuditContext?: AuditContext;
}
export const GetTableVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    VersionId: S.optional(S.String),
    AuditContext: S.optional(AuditContext),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTableVersionRequest",
}) as any as S.Schema<GetTableVersionRequest>;
export interface TableVersion {
  Table?: Table;
  VersionId?: string;
}
export const TableVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Table: S.optional(Table), VersionId: S.optional(S.String) }),
).annotate({ identifier: "TableVersion" }) as any as S.Schema<TableVersion>;
export interface GetTableVersionResponse {
  TableVersion?: TableVersion;
}
export const GetTableVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableVersion: S.optional(TableVersion) }),
).annotate({
  identifier: "GetTableVersionResponse",
}) as any as S.Schema<GetTableVersionResponse>;
export interface GetTableVersionsRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  NextToken?: string;
  MaxResults?: number;
  AuditContext?: AuditContext;
}
export const GetTableVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    AuditContext: S.optional(AuditContext),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTableVersionsRequest",
}) as any as S.Schema<GetTableVersionsRequest>;
export type GetTableVersionsList = TableVersion[];
export const GetTableVersionsList = /*@__PURE__*/ S.Array(TableVersion);
export interface GetTableVersionsResponse {
  TableVersions?: TableVersion[];
  NextToken?: string;
}
export const GetTableVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableVersions: S.optional(GetTableVersionsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTableVersionsResponse",
}) as any as S.Schema<GetTableVersionsResponse>;
export interface GetTagsRequest {
  ResourceArn: string;
}
export const GetTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "GetTagsRequest" }) as any as S.Schema<GetTagsRequest>;
export interface GetTagsResponse {
  Tags?: { [key: string]: string | undefined };
}
export const GetTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagsMap) }),
).annotate({
  identifier: "GetTagsResponse",
}) as any as S.Schema<GetTagsResponse>;
export interface GetTriggerRequest {
  Name: string;
}
export const GetTriggerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTriggerRequest",
}) as any as S.Schema<GetTriggerRequest>;
export interface GetTriggerResponse {
  Trigger?: Trigger;
}
export const GetTriggerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Trigger: S.optional(Trigger) }),
).annotate({
  identifier: "GetTriggerResponse",
}) as any as S.Schema<GetTriggerResponse>;
export interface GetTriggersRequest {
  NextToken?: string;
  DependentJobName?: string;
  MaxResults?: number;
}
export const GetTriggersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    DependentJobName: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTriggersRequest",
}) as any as S.Schema<GetTriggersRequest>;
export interface GetTriggersResponse {
  Triggers?: Trigger[];
  NextToken?: string;
}
export const GetTriggersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Triggers: S.optional(TriggerList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTriggersResponse",
}) as any as S.Schema<GetTriggersResponse>;
export type PermissionType =
  | "COLUMN_PERMISSION"
  | "CELL_FILTER_PERMISSION"
  | "NESTED_PERMISSION"
  | "NESTED_CELL_PERMISSION"
  | (string & {});
export const PermissionType = /*@__PURE__*/ S.String;

export type PermissionTypeList = PermissionType[];
export const PermissionTypeList = /*@__PURE__*/ S.Array(PermissionType);
export interface GetUnfilteredPartitionMetadataRequest {
  Region?: string;
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  PartitionValues: string[];
  AuditContext?: AuditContext;
  SupportedPermissionTypes: PermissionType[];
  QuerySessionContext?: QuerySessionContext;
}
export const GetUnfilteredPartitionMetadataRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Region: S.optional(S.String),
      CatalogId: S.String,
      DatabaseName: S.String,
      TableName: S.String,
      PartitionValues: ValueStringList,
      AuditContext: S.optional(AuditContext),
      SupportedPermissionTypes: PermissionTypeList,
      QuerySessionContext: S.optional(QuerySessionContext),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetUnfilteredPartitionMetadataRequest",
}) as any as S.Schema<GetUnfilteredPartitionMetadataRequest>;
export interface GetUnfilteredPartitionMetadataResponse {
  Partition?: Partition;
  AuthorizedColumns?: string[];
  IsRegisteredWithLakeFormation?: boolean;
}
export const GetUnfilteredPartitionMetadataResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Partition: S.optional(Partition),
      AuthorizedColumns: S.optional(NameStringList),
      IsRegisteredWithLakeFormation: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "GetUnfilteredPartitionMetadataResponse",
}) as any as S.Schema<GetUnfilteredPartitionMetadataResponse>;
export interface GetUnfilteredPartitionsMetadataRequest {
  Region?: string;
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  Expression?: string;
  AuditContext?: AuditContext;
  SupportedPermissionTypes: PermissionType[];
  NextToken?: string;
  Segment?: Segment;
  MaxResults?: number;
  QuerySessionContext?: QuerySessionContext;
}
export const GetUnfilteredPartitionsMetadataRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Region: S.optional(S.String),
      CatalogId: S.String,
      DatabaseName: S.String,
      TableName: S.String,
      Expression: S.optional(S.String),
      AuditContext: S.optional(AuditContext),
      SupportedPermissionTypes: PermissionTypeList,
      NextToken: S.optional(S.String),
      Segment: S.optional(Segment),
      MaxResults: S.optional(S.Number),
      QuerySessionContext: S.optional(QuerySessionContext),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetUnfilteredPartitionsMetadataRequest",
}) as any as S.Schema<GetUnfilteredPartitionsMetadataRequest>;
export interface UnfilteredPartition {
  Partition?: Partition;
  AuthorizedColumns?: string[];
  IsRegisteredWithLakeFormation?: boolean;
}
export const UnfilteredPartition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Partition: S.optional(Partition),
    AuthorizedColumns: S.optional(NameStringList),
    IsRegisteredWithLakeFormation: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "UnfilteredPartition",
}) as any as S.Schema<UnfilteredPartition>;
export type UnfilteredPartitionList = UnfilteredPartition[];
export const UnfilteredPartitionList =
  /*@__PURE__*/ S.Array(UnfilteredPartition);
export interface GetUnfilteredPartitionsMetadataResponse {
  UnfilteredPartitions?: UnfilteredPartition[];
  NextToken?: string;
}
export const GetUnfilteredPartitionsMetadataResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      UnfilteredPartitions: S.optional(UnfilteredPartitionList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "GetUnfilteredPartitionsMetadataResponse",
}) as any as S.Schema<GetUnfilteredPartitionsMetadataResponse>;
export interface SupportedDialect {
  Dialect?: ViewDialect;
  DialectVersion?: string;
}
export const SupportedDialect = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dialect: S.optional(ViewDialect),
    DialectVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "SupportedDialect",
}) as any as S.Schema<SupportedDialect>;
export interface GetUnfilteredTableMetadataRequest {
  Region?: string;
  CatalogId: string;
  DatabaseName: string;
  Name: string;
  AuditContext?: AuditContext;
  SupportedPermissionTypes: PermissionType[];
  ParentResourceArn?: string;
  RootResourceArn?: string;
  SupportedDialect?: SupportedDialect;
  Permissions?: Permission[];
  QuerySessionContext?: QuerySessionContext;
}
export const GetUnfilteredTableMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Region: S.optional(S.String),
    CatalogId: S.String,
    DatabaseName: S.String,
    Name: S.String,
    AuditContext: S.optional(AuditContext),
    SupportedPermissionTypes: PermissionTypeList,
    ParentResourceArn: S.optional(S.String),
    RootResourceArn: S.optional(S.String),
    SupportedDialect: S.optional(SupportedDialect),
    Permissions: S.optional(PermissionList),
    QuerySessionContext: S.optional(QuerySessionContext),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetUnfilteredTableMetadataRequest",
}) as any as S.Schema<GetUnfilteredTableMetadataRequest>;
export interface ColumnRowFilter {
  ColumnName?: string;
  RowFilterExpression?: string;
}
export const ColumnRowFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColumnName: S.optional(S.String),
    RowFilterExpression: S.optional(S.String),
  }),
).annotate({
  identifier: "ColumnRowFilter",
}) as any as S.Schema<ColumnRowFilter>;
export type ColumnRowFilterList = ColumnRowFilter[];
export const ColumnRowFilterList = /*@__PURE__*/ S.Array(ColumnRowFilter);
export interface GetUnfilteredTableMetadataResponse {
  Table?: Table;
  AuthorizedColumns?: string[];
  IsRegisteredWithLakeFormation?: boolean;
  CellFilters?: ColumnRowFilter[];
  QueryAuthorizationId?: string;
  IsMultiDialectView?: boolean;
  IsMaterializedView?: boolean;
  ResourceArn?: string;
  IsProtected?: boolean;
  Permissions?: Permission[];
  RowFilter?: string;
}
export const GetUnfilteredTableMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Table: S.optional(Table),
    AuthorizedColumns: S.optional(NameStringList),
    IsRegisteredWithLakeFormation: S.optional(S.Boolean),
    CellFilters: S.optional(ColumnRowFilterList),
    QueryAuthorizationId: S.optional(S.String),
    IsMultiDialectView: S.optional(S.Boolean),
    IsMaterializedView: S.optional(S.Boolean),
    ResourceArn: S.optional(S.String),
    IsProtected: S.optional(S.Boolean),
    Permissions: S.optional(PermissionList),
    RowFilter: S.optional(S.String),
  }),
).annotate({
  identifier: "GetUnfilteredTableMetadataResponse",
}) as any as S.Schema<GetUnfilteredTableMetadataResponse>;
export interface GetUsageProfileRequest {
  Name: string;
}
export const GetUsageProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetUsageProfileRequest",
}) as any as S.Schema<GetUsageProfileRequest>;
export interface GetUsageProfileResponse {
  Name?: string;
  Description?: string;
  Configuration?: ProfileConfiguration;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
}
export const GetUsageProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Configuration: S.optional(ProfileConfiguration),
    CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetUsageProfileResponse",
}) as any as S.Schema<GetUsageProfileResponse>;
export interface GetUserDefinedFunctionRequest {
  CatalogId?: string;
  DatabaseName: string;
  FunctionName: string;
}
export const GetUserDefinedFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    FunctionName: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetUserDefinedFunctionRequest",
}) as any as S.Schema<GetUserDefinedFunctionRequest>;
export interface UserDefinedFunction {
  FunctionName?: string;
  DatabaseName?: string;
  ClassName?: string;
  OwnerName?: string;
  FunctionType?: FunctionType;
  OwnerType?: PrincipalType;
  CreateTime?: Date;
  ResourceUris?: ResourceUri[];
  CatalogId?: string;
}
export const UserDefinedFunction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionName: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    ClassName: S.optional(S.String),
    OwnerName: S.optional(S.String),
    FunctionType: S.optional(FunctionType),
    OwnerType: S.optional(PrincipalType),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ResourceUris: S.optional(ResourceUriList),
    CatalogId: S.optional(S.String),
  }),
).annotate({
  identifier: "UserDefinedFunction",
}) as any as S.Schema<UserDefinedFunction>;
export interface GetUserDefinedFunctionResponse {
  UserDefinedFunction?: UserDefinedFunction;
}
export const GetUserDefinedFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UserDefinedFunction: S.optional(UserDefinedFunction) }),
).annotate({
  identifier: "GetUserDefinedFunctionResponse",
}) as any as S.Schema<GetUserDefinedFunctionResponse>;
export interface GetUserDefinedFunctionsRequest {
  CatalogId?: string;
  DatabaseName?: string;
  Pattern: string;
  FunctionType?: FunctionType;
  NextToken?: string;
  MaxResults?: number;
}
export const GetUserDefinedFunctionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    Pattern: S.String,
    FunctionType: S.optional(FunctionType),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetUserDefinedFunctionsRequest",
}) as any as S.Schema<GetUserDefinedFunctionsRequest>;
export type UserDefinedFunctionList = UserDefinedFunction[];
export const UserDefinedFunctionList =
  /*@__PURE__*/ S.Array(UserDefinedFunction);
export interface GetUserDefinedFunctionsResponse {
  UserDefinedFunctions?: UserDefinedFunction[];
  NextToken?: string;
}
export const GetUserDefinedFunctionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserDefinedFunctions: S.optional(UserDefinedFunctionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetUserDefinedFunctionsResponse",
}) as any as S.Schema<GetUserDefinedFunctionsResponse>;
export interface GetWorkflowRequest {
  Name: string;
  IncludeGraph?: boolean;
}
export const GetWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, IncludeGraph: S.optional(S.Boolean) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetWorkflowRequest",
}) as any as S.Schema<GetWorkflowRequest>;
export interface GetWorkflowResponse {
  Workflow?: Workflow;
}
export const GetWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Workflow: S.optional(Workflow) }),
).annotate({
  identifier: "GetWorkflowResponse",
}) as any as S.Schema<GetWorkflowResponse>;
export interface GetWorkflowRunRequest {
  Name: string;
  RunId: string;
  IncludeGraph?: boolean;
}
export const GetWorkflowRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    RunId: S.String,
    IncludeGraph: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetWorkflowRunRequest",
}) as any as S.Schema<GetWorkflowRunRequest>;
export interface GetWorkflowRunResponse {
  Run?: WorkflowRun;
}
export const GetWorkflowRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Run: S.optional(WorkflowRun) }),
).annotate({
  identifier: "GetWorkflowRunResponse",
}) as any as S.Schema<GetWorkflowRunResponse>;
export interface GetWorkflowRunPropertiesRequest {
  Name: string;
  RunId: string;
}
export const GetWorkflowRunPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, RunId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetWorkflowRunPropertiesRequest",
}) as any as S.Schema<GetWorkflowRunPropertiesRequest>;
export interface GetWorkflowRunPropertiesResponse {
  RunProperties?: { [key: string]: string | undefined };
}
export const GetWorkflowRunPropertiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RunProperties: S.optional(WorkflowRunProperties) }),
).annotate({
  identifier: "GetWorkflowRunPropertiesResponse",
}) as any as S.Schema<GetWorkflowRunPropertiesResponse>;
export interface GetWorkflowRunsRequest {
  Name: string;
  IncludeGraph?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export const GetWorkflowRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    IncludeGraph: S.optional(S.Boolean),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetWorkflowRunsRequest",
}) as any as S.Schema<GetWorkflowRunsRequest>;
export type WorkflowRuns = WorkflowRun[];
export const WorkflowRuns = /*@__PURE__*/ S.Array(WorkflowRun);
export interface GetWorkflowRunsResponse {
  Runs?: WorkflowRun[];
  NextToken?: string;
}
export const GetWorkflowRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Runs: S.optional(WorkflowRuns), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "GetWorkflowRunsResponse",
}) as any as S.Schema<GetWorkflowRunsResponse>;
export interface ImportCatalogToGlueRequest {
  CatalogId?: string;
}
export const ImportCatalogToGlueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ImportCatalogToGlueRequest",
}) as any as S.Schema<ImportCatalogToGlueRequest>;
export interface ImportCatalogToGlueResponse {}
export const ImportCatalogToGlueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ImportCatalogToGlueResponse",
}) as any as S.Schema<ImportCatalogToGlueResponse>;
export interface ListAssetTypesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListAssetTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/asset-types" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetTypesRequest",
}) as any as S.Schema<ListAssetTypesRequest>;
export interface AssetTypeItem {
  Id?: string;
  Name?: string;
}
export const AssetTypeItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({ identifier: "AssetTypeItem" }) as any as S.Schema<AssetTypeItem>;
export type AssetTypeItemList = AssetTypeItem[];
export const AssetTypeItemList = /*@__PURE__*/ S.Array(AssetTypeItem);
export interface ListAssetTypesResponse {
  Items?: AssetTypeItem[];
  NextToken?: string;
}
export const ListAssetTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(AssetTypeItemList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAssetTypesResponse",
}) as any as S.Schema<ListAssetTypesResponse>;
export type OrchestrationPageSize25 = number;
export interface ListBlueprintsRequest {
  NextToken?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
}
export const ListBlueprintsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListBlueprintsRequest",
}) as any as S.Schema<ListBlueprintsRequest>;
export interface ListBlueprintsResponse {
  Blueprints?: string[];
  NextToken?: string;
}
export const ListBlueprintsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Blueprints: S.optional(BlueprintNames),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBlueprintsResponse",
}) as any as S.Schema<ListBlueprintsResponse>;
export interface ListColumnStatisticsTaskRunsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListColumnStatisticsTaskRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListColumnStatisticsTaskRunsRequest",
}) as any as S.Schema<ListColumnStatisticsTaskRunsRequest>;
export type ColumnStatisticsTaskRunIdList = string[];
export const ColumnStatisticsTaskRunIdList = /*@__PURE__*/ S.Array(S.String);
export interface ListColumnStatisticsTaskRunsResponse {
  ColumnStatisticsTaskRunIds?: string[];
  NextToken?: string;
}
export const ListColumnStatisticsTaskRunsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ColumnStatisticsTaskRunIds: S.optional(ColumnStatisticsTaskRunIdList),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListColumnStatisticsTaskRunsResponse",
}) as any as S.Schema<ListColumnStatisticsTaskRunsResponse>;
export type MaxResults = number;
export interface ListConnectionTypesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListConnectionTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListConnectionTypesRequest",
}) as any as S.Schema<ListConnectionTypesRequest>;
export type DisplayName = string;
export type Vendor = string;
export type UrlString = string;
export interface ConnectionTypeVariant {
  ConnectionTypeVariantName?: string;
  DisplayName?: string;
  Description?: string;
  LogoUrl?: string;
}
export const ConnectionTypeVariant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionTypeVariantName: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Description: S.optional(S.String),
    LogoUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "ConnectionTypeVariant",
}) as any as S.Schema<ConnectionTypeVariant>;
export type ConnectionTypeVariantList = ConnectionTypeVariant[];
export const ConnectionTypeVariantList = /*@__PURE__*/ S.Array(
  ConnectionTypeVariant,
);
export interface ConnectionTypeBrief {
  ConnectionType?: ConnectionType;
  DisplayName?: string;
  Vendor?: string;
  Description?: string;
  Categories?: string[];
  Capabilities?: Capabilities;
  LogoUrl?: string;
  ConnectionTypeVariants?: ConnectionTypeVariant[];
}
export const ConnectionTypeBrief = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionType: S.optional(ConnectionType),
    DisplayName: S.optional(S.String),
    Vendor: S.optional(S.String),
    Description: S.optional(S.String),
    Categories: S.optional(ListOfString),
    Capabilities: S.optional(Capabilities),
    LogoUrl: S.optional(S.String),
    ConnectionTypeVariants: S.optional(ConnectionTypeVariantList),
  }),
).annotate({
  identifier: "ConnectionTypeBrief",
}) as any as S.Schema<ConnectionTypeBrief>;
export type ConnectionTypeList = ConnectionTypeBrief[];
export const ConnectionTypeList = /*@__PURE__*/ S.Array(ConnectionTypeBrief);
export interface ListConnectionTypesResponse {
  ConnectionTypes?: ConnectionTypeBrief[];
  NextToken?: string;
}
export const ListConnectionTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionTypes: S.optional(ConnectionTypeList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConnectionTypesResponse",
}) as any as S.Schema<ListConnectionTypesResponse>;
export interface ListCrawlersRequest {
  MaxResults?: number;
  NextToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const ListCrawlersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCrawlersRequest",
}) as any as S.Schema<ListCrawlersRequest>;
export interface ListCrawlersResponse {
  CrawlerNames?: string[];
  NextToken?: string;
}
export const ListCrawlersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CrawlerNames: S.optional(CrawlerNameList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCrawlersResponse",
}) as any as S.Schema<ListCrawlersResponse>;
export type FieldName =
  | "CRAWL_ID"
  | "STATE"
  | "START_TIME"
  | "END_TIME"
  | "DPU_HOUR"
  | (string & {});
export const FieldName = /*@__PURE__*/ S.String;

export type FilterOperator =
  | "GT"
  | "GE"
  | "LT"
  | "LE"
  | "EQ"
  | "NE"
  | (string & {});
export const FilterOperator = /*@__PURE__*/ S.String;

export interface CrawlsFilter {
  FieldName?: FieldName;
  FilterOperator?: FilterOperator;
  FieldValue?: string;
}
export const CrawlsFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldName: S.optional(FieldName),
    FilterOperator: S.optional(FilterOperator),
    FieldValue: S.optional(S.String),
  }),
).annotate({ identifier: "CrawlsFilter" }) as any as S.Schema<CrawlsFilter>;
export type CrawlsFilterList = CrawlsFilter[];
export const CrawlsFilterList = /*@__PURE__*/ S.Array(CrawlsFilter);
export interface ListCrawlsRequest {
  CrawlerName: string;
  MaxResults?: number;
  Filters?: CrawlsFilter[];
  NextToken?: string;
}
export const ListCrawlsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CrawlerName: S.String,
    MaxResults: S.optional(S.Number),
    Filters: S.optional(CrawlsFilterList),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCrawlsRequest",
}) as any as S.Schema<ListCrawlsRequest>;
export type CrawlId = string;
export type CrawlerHistoryState =
  | "RUNNING"
  | "COMPLETED"
  | "FAILED"
  | "STOPPED"
  | (string & {});
export const CrawlerHistoryState = /*@__PURE__*/ S.String;

export interface CrawlerHistory {
  CrawlId?: string;
  State?: CrawlerHistoryState;
  StartTime?: Date;
  EndTime?: Date;
  Summary?: string;
  ErrorMessage?: string;
  LogGroup?: string;
  LogStream?: string;
  MessagePrefix?: string;
  DPUHour?: number;
}
export const CrawlerHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CrawlId: S.optional(S.String),
    State: S.optional(CrawlerHistoryState),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Summary: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    LogGroup: S.optional(S.String),
    LogStream: S.optional(S.String),
    MessagePrefix: S.optional(S.String),
    DPUHour: S.optional(S.Number),
  }),
).annotate({ identifier: "CrawlerHistory" }) as any as S.Schema<CrawlerHistory>;
export type CrawlerHistoryList = CrawlerHistory[];
export const CrawlerHistoryList = /*@__PURE__*/ S.Array(CrawlerHistory);
export interface ListCrawlsResponse {
  Crawls?: CrawlerHistory[];
  NextToken?: string;
}
export const ListCrawlsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Crawls: S.optional(CrawlerHistoryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCrawlsResponse",
}) as any as S.Schema<ListCrawlsResponse>;
export interface ListCustomEntityTypesRequest {
  NextToken?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
}
export const ListCustomEntityTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCustomEntityTypesRequest",
}) as any as S.Schema<ListCustomEntityTypesRequest>;
export interface ListCustomEntityTypesResponse {
  CustomEntityTypes?: CustomEntityType[];
  NextToken?: string;
}
export const ListCustomEntityTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomEntityTypes: S.optional(CustomEntityTypes),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCustomEntityTypesResponse",
}) as any as S.Schema<ListCustomEntityTypesResponse>;
export interface DataQualityResultFilterCriteria {
  DataSource?: DataSource;
  JobName?: string;
  JobRunId?: string;
  StartedAfter?: Date;
  StartedBefore?: Date;
}
export const DataQualityResultFilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSource: S.optional(DataSource),
    JobName: S.optional(S.String),
    JobRunId: S.optional(S.String),
    StartedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DataQualityResultFilterCriteria",
}) as any as S.Schema<DataQualityResultFilterCriteria>;
export interface ListDataQualityResultsRequest {
  Filter?: DataQualityResultFilterCriteria;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDataQualityResultsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filter: S.optional(DataQualityResultFilterCriteria),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDataQualityResultsRequest",
}) as any as S.Schema<ListDataQualityResultsRequest>;
export interface DataQualityResultDescription {
  ResultId?: string;
  DataSource?: DataSource;
  JobName?: string;
  JobRunId?: string;
  StartedOn?: Date;
}
export const DataQualityResultDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResultId: S.optional(S.String),
    DataSource: S.optional(DataSource),
    JobName: S.optional(S.String),
    JobRunId: S.optional(S.String),
    StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DataQualityResultDescription",
}) as any as S.Schema<DataQualityResultDescription>;
export type DataQualityResultDescriptionList = DataQualityResultDescription[];
export const DataQualityResultDescriptionList = /*@__PURE__*/ S.Array(
  DataQualityResultDescription,
);
export interface ListDataQualityResultsResponse {
  Results: DataQualityResultDescription[];
  NextToken?: string;
}
export const ListDataQualityResultsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Results: DataQualityResultDescriptionList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataQualityResultsResponse",
}) as any as S.Schema<ListDataQualityResultsResponse>;
export interface DataQualityRuleRecommendationRunFilter {
  DataSource: DataSource;
  StartedBefore?: Date;
  StartedAfter?: Date;
}
export const DataQualityRuleRecommendationRunFilter = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DataSource: DataSource,
      StartedBefore: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      StartedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    }),
).annotate({
  identifier: "DataQualityRuleRecommendationRunFilter",
}) as any as S.Schema<DataQualityRuleRecommendationRunFilter>;
export interface ListDataQualityRuleRecommendationRunsRequest {
  Filter?: DataQualityRuleRecommendationRunFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDataQualityRuleRecommendationRunsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Filter: S.optional(DataQualityRuleRecommendationRunFilter),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListDataQualityRuleRecommendationRunsRequest",
  }) as any as S.Schema<ListDataQualityRuleRecommendationRunsRequest>;
export interface DataQualityRuleRecommendationRunDescription {
  RunId?: string;
  Status?: TaskStatusType;
  StartedOn?: Date;
  DataSource?: DataSource;
}
export const DataQualityRuleRecommendationRunDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RunId: S.optional(S.String),
      Status: S.optional(TaskStatusType),
      StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      DataSource: S.optional(DataSource),
    }),
  ).annotate({
    identifier: "DataQualityRuleRecommendationRunDescription",
  }) as any as S.Schema<DataQualityRuleRecommendationRunDescription>;
export type DataQualityRuleRecommendationRunList =
  DataQualityRuleRecommendationRunDescription[];
export const DataQualityRuleRecommendationRunList = /*@__PURE__*/ S.Array(
  DataQualityRuleRecommendationRunDescription,
);
export interface ListDataQualityRuleRecommendationRunsResponse {
  Runs?: DataQualityRuleRecommendationRunDescription[];
  NextToken?: string;
}
export const ListDataQualityRuleRecommendationRunsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Runs: S.optional(DataQualityRuleRecommendationRunList),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListDataQualityRuleRecommendationRunsResponse",
  }) as any as S.Schema<ListDataQualityRuleRecommendationRunsResponse>;
export interface DataQualityRulesetEvaluationRunFilter {
  DataSource: DataSource;
  StartedBefore?: Date;
  StartedAfter?: Date;
  RulesetName?: string;
}
export const DataQualityRulesetEvaluationRunFilter = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DataSource: DataSource,
      StartedBefore: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      StartedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      RulesetName: S.optional(S.String),
    }),
).annotate({
  identifier: "DataQualityRulesetEvaluationRunFilter",
}) as any as S.Schema<DataQualityRulesetEvaluationRunFilter>;
export interface ListDataQualityRulesetEvaluationRunsRequest {
  Filter?: DataQualityRulesetEvaluationRunFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListDataQualityRulesetEvaluationRunsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Filter: S.optional(DataQualityRulesetEvaluationRunFilter),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListDataQualityRulesetEvaluationRunsRequest",
  }) as any as S.Schema<ListDataQualityRulesetEvaluationRunsRequest>;
export interface DataQualityRulesetEvaluationRunDescription {
  RunId?: string;
  Status?: TaskStatusType;
  StartedOn?: Date;
  DataSource?: DataSource;
}
export const DataQualityRulesetEvaluationRunDescription =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RunId: S.optional(S.String),
      Status: S.optional(TaskStatusType),
      StartedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      DataSource: S.optional(DataSource),
    }),
  ).annotate({
    identifier: "DataQualityRulesetEvaluationRunDescription",
  }) as any as S.Schema<DataQualityRulesetEvaluationRunDescription>;
export type DataQualityRulesetEvaluationRunList =
  DataQualityRulesetEvaluationRunDescription[];
export const DataQualityRulesetEvaluationRunList = /*@__PURE__*/ S.Array(
  DataQualityRulesetEvaluationRunDescription,
);
export interface ListDataQualityRulesetEvaluationRunsResponse {
  Runs?: DataQualityRulesetEvaluationRunDescription[];
  NextToken?: string;
}
export const ListDataQualityRulesetEvaluationRunsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Runs: S.optional(DataQualityRulesetEvaluationRunList),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListDataQualityRulesetEvaluationRunsResponse",
  }) as any as S.Schema<ListDataQualityRulesetEvaluationRunsResponse>;
export interface DataQualityRulesetFilterCriteria {
  Name?: string;
  Description?: string;
  CreatedBefore?: Date;
  CreatedAfter?: Date;
  LastModifiedBefore?: Date;
  LastModifiedAfter?: Date;
  TargetTable?: DataQualityTargetTable;
}
export const DataQualityRulesetFilterCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreatedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedBefore: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastModifiedAfter: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TargetTable: S.optional(DataQualityTargetTable),
  }),
).annotate({
  identifier: "DataQualityRulesetFilterCriteria",
}) as any as S.Schema<DataQualityRulesetFilterCriteria>;
export interface ListDataQualityRulesetsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filter?: DataQualityRulesetFilterCriteria;
  Tags?: { [key: string]: string | undefined };
}
export const ListDataQualityRulesetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filter: S.optional(DataQualityRulesetFilterCriteria),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDataQualityRulesetsRequest",
}) as any as S.Schema<ListDataQualityRulesetsRequest>;
export interface DataQualityRulesetListDetails {
  Name?: string;
  Description?: string;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
  TargetTable?: DataQualityTargetTable;
  RecommendationRunId?: string;
  RuleCount?: number;
}
export const DataQualityRulesetListDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TargetTable: S.optional(DataQualityTargetTable),
    RecommendationRunId: S.optional(S.String),
    RuleCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "DataQualityRulesetListDetails",
}) as any as S.Schema<DataQualityRulesetListDetails>;
export type DataQualityRulesetList = DataQualityRulesetListDetails[];
export const DataQualityRulesetList = /*@__PURE__*/ S.Array(
  DataQualityRulesetListDetails,
);
export interface ListDataQualityRulesetsResponse {
  Rulesets?: DataQualityRulesetListDetails[];
  NextToken?: string;
}
export const ListDataQualityRulesetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Rulesets: S.optional(DataQualityRulesetList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataQualityRulesetsResponse",
}) as any as S.Schema<ListDataQualityRulesetsResponse>;
export interface TimestampFilter {
  RecordedBefore?: Date;
  RecordedAfter?: Date;
}
export const TimestampFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecordedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RecordedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "TimestampFilter",
}) as any as S.Schema<TimestampFilter>;
export interface ListDataQualityStatisticAnnotationsRequest {
  StatisticId?: string;
  ProfileId?: string;
  TimestampFilter?: TimestampFilter;
  MaxResults?: number;
  NextToken?: string;
}
export const ListDataQualityStatisticAnnotationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StatisticId: S.optional(S.String),
      ProfileId: S.optional(S.String),
      TimestampFilter: S.optional(TimestampFilter),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListDataQualityStatisticAnnotationsRequest",
  }) as any as S.Schema<ListDataQualityStatisticAnnotationsRequest>;
export interface TimestampedInclusionAnnotation {
  Value?: InclusionAnnotationValue;
  LastModifiedOn?: Date;
}
export const TimestampedInclusionAnnotation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(InclusionAnnotationValue),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "TimestampedInclusionAnnotation",
}) as any as S.Schema<TimestampedInclusionAnnotation>;
export interface StatisticAnnotation {
  ProfileId?: string;
  StatisticId?: string;
  StatisticRecordedOn?: Date;
  InclusionAnnotation?: TimestampedInclusionAnnotation;
}
export const StatisticAnnotation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProfileId: S.optional(S.String),
    StatisticId: S.optional(S.String),
    StatisticRecordedOn: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    InclusionAnnotation: S.optional(TimestampedInclusionAnnotation),
  }),
).annotate({
  identifier: "StatisticAnnotation",
}) as any as S.Schema<StatisticAnnotation>;
export type AnnotationList = StatisticAnnotation[];
export const AnnotationList = /*@__PURE__*/ S.Array(StatisticAnnotation);
export interface ListDataQualityStatisticAnnotationsResponse {
  Annotations?: StatisticAnnotation[];
  NextToken?: string;
}
export const ListDataQualityStatisticAnnotationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Annotations: S.optional(AnnotationList),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListDataQualityStatisticAnnotationsResponse",
  }) as any as S.Schema<ListDataQualityStatisticAnnotationsResponse>;
export interface ListDataQualityStatisticsRequest {
  StatisticId?: string;
  ProfileId?: string;
  TimestampFilter?: TimestampFilter;
  MaxResults?: number;
  NextToken?: string;
}
export const ListDataQualityStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatisticId: S.optional(S.String),
    ProfileId: S.optional(S.String),
    TimestampFilter: S.optional(TimestampFilter),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDataQualityStatisticsRequest",
}) as any as S.Schema<ListDataQualityStatisticsRequest>;
export interface RunIdentifier {
  RunId?: string;
  JobRunId?: string;
}
export const RunIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RunId: S.optional(S.String), JobRunId: S.optional(S.String) }),
).annotate({ identifier: "RunIdentifier" }) as any as S.Schema<RunIdentifier>;
export type StatisticNameString = string;
export type StatisticEvaluationLevel =
  | "Dataset"
  | "Column"
  | "Multicolumn"
  | (string & {});
export const StatisticEvaluationLevel = /*@__PURE__*/ S.String;

export type ReferenceDatasetsList = string[];
export const ReferenceDatasetsList = /*@__PURE__*/ S.Array(S.String);
export type StatisticPropertiesMap = { [key: string]: string | undefined };
export const StatisticPropertiesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface StatisticSummary {
  StatisticId?: string;
  ProfileId?: string;
  RunIdentifier?: RunIdentifier;
  StatisticName?: string;
  DoubleValue?: number;
  EvaluationLevel?: StatisticEvaluationLevel;
  ColumnsReferenced?: string[];
  ReferencedDatasets?: string[];
  StatisticProperties?: { [key: string]: string | undefined };
  RecordedOn?: Date;
  InclusionAnnotation?: TimestampedInclusionAnnotation;
}
export const StatisticSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatisticId: S.optional(S.String),
    ProfileId: S.optional(S.String),
    RunIdentifier: S.optional(RunIdentifier),
    StatisticName: S.optional(S.String),
    DoubleValue: S.optional(S.Number),
    EvaluationLevel: S.optional(StatisticEvaluationLevel),
    ColumnsReferenced: S.optional(ColumnNameList),
    ReferencedDatasets: S.optional(ReferenceDatasetsList),
    StatisticProperties: S.optional(StatisticPropertiesMap),
    RecordedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InclusionAnnotation: S.optional(TimestampedInclusionAnnotation),
  }),
).annotate({
  identifier: "StatisticSummary",
}) as any as S.Schema<StatisticSummary>;
export type StatisticSummaryList = StatisticSummary[];
export const StatisticSummaryList = /*@__PURE__*/ S.Array(StatisticSummary);
export interface ListDataQualityStatisticsResponse {
  Statistics?: StatisticSummary[];
  NextToken?: string;
}
export const ListDataQualityStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Statistics: S.optional(StatisticSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataQualityStatisticsResponse",
}) as any as S.Schema<ListDataQualityStatisticsResponse>;
export interface ListDevEndpointsRequest {
  NextToken?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
}
export const ListDevEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDevEndpointsRequest",
}) as any as S.Schema<ListDevEndpointsRequest>;
export type DevEndpointNameList = string[];
export const DevEndpointNameList = /*@__PURE__*/ S.Array(S.String);
export interface ListDevEndpointsResponse {
  DevEndpointNames?: string[];
  NextToken?: string;
}
export const ListDevEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DevEndpointNames: S.optional(DevEndpointNameList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDevEndpointsResponse",
}) as any as S.Schema<ListDevEndpointsResponse>;
export interface ListEntitiesRequest {
  ConnectionName?: string;
  CatalogId?: string;
  ParentEntityName?: string;
  NextToken?: string;
  DataStoreApiVersion?: string;
}
export const ListEntitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionName: S.optional(S.String),
    CatalogId: S.optional(S.String),
    ParentEntityName: S.optional(S.String),
    NextToken: S.optional(S.String),
    DataStoreApiVersion: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEntitiesRequest",
}) as any as S.Schema<ListEntitiesRequest>;
export type EntityLabel = string;
export type IsParentEntity = boolean;
export type EntityDescription = string;
export type Category = string;
export interface Entity {
  EntityName?: string;
  Label?: string;
  IsParentEntity?: boolean;
  Description?: string;
  Category?: string;
  CustomProperties?: { [key: string]: string | undefined };
}
export const Entity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EntityName: S.optional(S.String),
    Label: S.optional(S.String),
    IsParentEntity: S.optional(S.Boolean),
    Description: S.optional(S.String),
    Category: S.optional(S.String),
    CustomProperties: S.optional(CustomProperties),
  }),
).annotate({ identifier: "Entity" }) as any as S.Schema<Entity>;
export type EntityList = Entity[];
export const EntityList = /*@__PURE__*/ S.Array(Entity);
export interface ListEntitiesResponse {
  Entities?: Entity[];
  NextToken?: string;
}
export const ListEntitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entities: S.optional(EntityList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEntitiesResponse",
}) as any as S.Schema<ListEntitiesResponse>;
export interface ListFormTypesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListFormTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/form-types" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFormTypesRequest",
}) as any as S.Schema<ListFormTypesRequest>;
export interface FormTypeItem {
  Id?: string;
  Name?: string;
}
export const FormTypeItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({ identifier: "FormTypeItem" }) as any as S.Schema<FormTypeItem>;
export type FormTypeItemList = FormTypeItem[];
export const FormTypeItemList = /*@__PURE__*/ S.Array(FormTypeItem);
export interface ListFormTypesResponse {
  Items: FormTypeItem[];
  NextToken?: string;
}
export const ListFormTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Items: FormTypeItemList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFormTypesResponse",
}) as any as S.Schema<ListFormTypesResponse>;
export interface ListGlossariesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListGlossariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/glossaries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGlossariesRequest",
}) as any as S.Schema<ListGlossariesRequest>;
export interface GlossaryItem {
  Id?: string;
  Name?: string;
  Description?: string;
}
export const GlossaryItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "GlossaryItem" }) as any as S.Schema<GlossaryItem>;
export type GlossaryItemList = GlossaryItem[];
export const GlossaryItemList = /*@__PURE__*/ S.Array(GlossaryItem);
export interface ListGlossariesResponse {
  Items?: GlossaryItem[];
  NextToken?: string;
}
export const ListGlossariesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(GlossaryItemList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGlossariesResponse",
}) as any as S.Schema<ListGlossariesResponse>;
export interface ListGlossaryTermsRequest {
  GlossaryIdentifier: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListGlossaryTermsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlossaryIdentifier: S.String.pipe(T.HttpQuery("glossaryIdentifier")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/glossary-terms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListGlossaryTermsRequest",
}) as any as S.Schema<ListGlossaryTermsRequest>;
export interface GlossaryTermItem {
  Id?: string;
  Name?: string;
  ShortDescription?: string;
}
export const GlossaryTermItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    ShortDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "GlossaryTermItem",
}) as any as S.Schema<GlossaryTermItem>;
export type GlossaryTermItemList = GlossaryTermItem[];
export const GlossaryTermItemList = /*@__PURE__*/ S.Array(GlossaryTermItem);
export interface ListGlossaryTermsResponse {
  Items?: GlossaryTermItem[];
  NextToken?: string;
}
export const ListGlossaryTermsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(GlossaryTermItemList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListGlossaryTermsResponse",
}) as any as S.Schema<ListGlossaryTermsResponse>;
export type String1024 = string;
export type IntegrationResourcePropertyFilterValues = string[];
export const IntegrationResourcePropertyFilterValues = /*@__PURE__*/ S.Array(
  S.String,
);
export interface IntegrationResourcePropertyFilter {
  Name?: string;
  Values?: string[];
}
export const IntegrationResourcePropertyFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Values: S.optional(IntegrationResourcePropertyFilterValues),
  }),
).annotate({
  identifier: "IntegrationResourcePropertyFilter",
}) as any as S.Schema<IntegrationResourcePropertyFilter>;
export type IntegrationResourcePropertyFilterList =
  IntegrationResourcePropertyFilter[];
export const IntegrationResourcePropertyFilterList = /*@__PURE__*/ S.Array(
  IntegrationResourcePropertyFilter,
);
export interface ListIntegrationResourcePropertiesRequest {
  Marker?: string;
  Filters?: IntegrationResourcePropertyFilter[];
  MaxRecords?: number;
}
export const ListIntegrationResourcePropertiesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Marker: S.optional(S.String),
      Filters: S.optional(IntegrationResourcePropertyFilterList),
      MaxRecords: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListIntegrationResourcePropertiesRequest",
}) as any as S.Schema<ListIntegrationResourcePropertiesRequest>;
export interface IntegrationResourceProperty {
  ResourceArn: string;
  ResourcePropertyArn?: string;
  SourceProcessingProperties?: SourceProcessingProperties;
  TargetProcessingProperties?: TargetProcessingProperties;
}
export const IntegrationResourceProperty = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    ResourcePropertyArn: S.optional(S.String),
    SourceProcessingProperties: S.optional(SourceProcessingProperties),
    TargetProcessingProperties: S.optional(TargetProcessingProperties),
  }),
).annotate({
  identifier: "IntegrationResourceProperty",
}) as any as S.Schema<IntegrationResourceProperty>;
export type IntegrationResourcePropertyList = IntegrationResourceProperty[];
export const IntegrationResourcePropertyList = /*@__PURE__*/ S.Array(
  IntegrationResourceProperty,
);
export interface ListIntegrationResourcePropertiesResponse {
  IntegrationResourcePropertyList?: IntegrationResourceProperty[];
  Marker?: string;
}
export const ListIntegrationResourcePropertiesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      IntegrationResourcePropertyList: S.optional(
        IntegrationResourcePropertyList,
      ),
      Marker: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListIntegrationResourcePropertiesResponse",
  }) as any as S.Schema<ListIntegrationResourcePropertiesResponse>;
export interface ListIterableFormsRequest {
  AssetIdentifier: string;
  IterableFormName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListIterableFormsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetIdentifier: S.String.pipe(T.HttpLabel("AssetIdentifier")),
    IterableFormName: S.String.pipe(T.HttpLabel("IterableFormName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/assets/{AssetIdentifier}/iterable-forms/{IterableFormName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIterableFormsRequest",
}) as any as S.Schema<ListIterableFormsRequest>;
export type ItemDescription = string;
export interface IterableFormListItem {
  ItemId?: string;
  ItemName?: string;
  Description?: string;
  GlossaryTerms?: string[];
}
export const IterableFormListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ItemId: S.optional(S.String),
    ItemName: S.optional(S.String),
    Description: S.optional(S.String),
    GlossaryTerms: S.optional(GlossaryTermIdList),
  }),
).annotate({
  identifier: "IterableFormListItem",
}) as any as S.Schema<IterableFormListItem>;
export type IterableFormListItemList = IterableFormListItem[];
export const IterableFormListItemList =
  /*@__PURE__*/ S.Array(IterableFormListItem);
export interface ListIterableFormsResponse {
  Items?: IterableFormListItem[];
  NextToken?: string;
}
export const ListIterableFormsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(IterableFormListItemList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIterableFormsResponse",
}) as any as S.Schema<ListIterableFormsResponse>;
export interface ListJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
}
export const ListJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListJobsRequest",
}) as any as S.Schema<ListJobsRequest>;
export interface ListJobsResponse {
  JobNames?: string[];
  NextToken?: string;
}
export const ListJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobNames: S.optional(JobNameList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListJobsResponse",
}) as any as S.Schema<ListJobsResponse>;
export interface ListMaterializedViewRefreshTaskRunsRequest {
  CatalogId: string;
  DatabaseName?: string;
  TableName?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListMaterializedViewRefreshTaskRunsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CatalogId: S.String,
      DatabaseName: S.optional(S.String),
      TableName: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListMaterializedViewRefreshTaskRunsRequest",
  }) as any as S.Schema<ListMaterializedViewRefreshTaskRunsRequest>;
export type MaterializedViewRefreshTaskRunsList =
  MaterializedViewRefreshTaskRun[];
export const MaterializedViewRefreshTaskRunsList = /*@__PURE__*/ S.Array(
  MaterializedViewRefreshTaskRun,
);
export interface ListMaterializedViewRefreshTaskRunsResponse {
  MaterializedViewRefreshTaskRuns?: MaterializedViewRefreshTaskRun[];
  NextToken?: string;
}
export const ListMaterializedViewRefreshTaskRunsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MaterializedViewRefreshTaskRuns: S.optional(
        MaterializedViewRefreshTaskRunsList,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListMaterializedViewRefreshTaskRunsResponse",
  }) as any as S.Schema<ListMaterializedViewRefreshTaskRunsResponse>;
export interface ListMLTransformsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filter?: TransformFilterCriteria;
  Sort?: TransformSortCriteria;
  Tags?: { [key: string]: string | undefined };
}
export const ListMLTransformsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filter: S.optional(TransformFilterCriteria),
    Sort: S.optional(TransformSortCriteria),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMLTransformsRequest",
}) as any as S.Schema<ListMLTransformsRequest>;
export type TransformIdList = string[];
export const TransformIdList = /*@__PURE__*/ S.Array(S.String);
export interface ListMLTransformsResponse {
  TransformIds: string[];
  NextToken?: string;
}
export const ListMLTransformsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransformIds: TransformIdList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMLTransformsResponse",
}) as any as S.Schema<ListMLTransformsResponse>;
export type MaxResultsNumber = number;
export type SchemaRegistryTokenString = string;
export interface ListRegistriesInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListRegistriesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRegistriesInput",
}) as any as S.Schema<ListRegistriesInput>;
export interface RegistryListItem {
  RegistryName?: string;
  RegistryArn?: string;
  Description?: string;
  Status?: RegistryStatus;
  CreatedTime?: string;
  UpdatedTime?: string;
}
export const RegistryListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryName: S.optional(S.String),
    RegistryArn: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(RegistryStatus),
    CreatedTime: S.optional(S.String),
    UpdatedTime: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistryListItem",
}) as any as S.Schema<RegistryListItem>;
export type RegistryListDefinition = RegistryListItem[];
export const RegistryListDefinition = /*@__PURE__*/ S.Array(RegistryListItem);
export interface ListRegistriesResponse {
  Registries?: RegistryListItem[];
  NextToken?: string;
}
export const ListRegistriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Registries: S.optional(RegistryListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRegistriesResponse",
}) as any as S.Schema<ListRegistriesResponse>;
export interface ListSchemasInput {
  RegistryId?: RegistryId;
  MaxResults?: number;
  NextToken?: string;
}
export const ListSchemasInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryId: S.optional(RegistryId),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSchemasInput",
}) as any as S.Schema<ListSchemasInput>;
export interface SchemaListItem {
  RegistryName?: string;
  SchemaName?: string;
  SchemaArn?: string;
  Description?: string;
  SchemaStatus?: SchemaStatus;
  CreatedTime?: string;
  UpdatedTime?: string;
}
export const SchemaListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryName: S.optional(S.String),
    SchemaName: S.optional(S.String),
    SchemaArn: S.optional(S.String),
    Description: S.optional(S.String),
    SchemaStatus: S.optional(SchemaStatus),
    CreatedTime: S.optional(S.String),
    UpdatedTime: S.optional(S.String),
  }),
).annotate({ identifier: "SchemaListItem" }) as any as S.Schema<SchemaListItem>;
export type SchemaListDefinition = SchemaListItem[];
export const SchemaListDefinition = /*@__PURE__*/ S.Array(SchemaListItem);
export interface ListSchemasResponse {
  Schemas?: SchemaListItem[];
  NextToken?: string;
}
export const ListSchemasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Schemas: S.optional(SchemaListDefinition),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSchemasResponse",
}) as any as S.Schema<ListSchemasResponse>;
export interface ListSchemaVersionsInput {
  SchemaId: SchemaId;
  MaxResults?: number;
  NextToken?: string;
}
export const ListSchemaVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: SchemaId,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSchemaVersionsInput",
}) as any as S.Schema<ListSchemaVersionsInput>;
export interface SchemaVersionListItem {
  SchemaArn?: string;
  SchemaVersionId?: string;
  VersionNumber?: number;
  Status?: SchemaVersionStatus;
  CreatedTime?: string;
}
export const SchemaVersionListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaArn: S.optional(S.String),
    SchemaVersionId: S.optional(S.String),
    VersionNumber: S.optional(S.Number),
    Status: S.optional(SchemaVersionStatus),
    CreatedTime: S.optional(S.String),
  }),
).annotate({
  identifier: "SchemaVersionListItem",
}) as any as S.Schema<SchemaVersionListItem>;
export type SchemaVersionList = SchemaVersionListItem[];
export const SchemaVersionList = /*@__PURE__*/ S.Array(SchemaVersionListItem);
export interface ListSchemaVersionsResponse {
  Schemas?: SchemaVersionListItem[];
  NextToken?: string;
}
export const ListSchemaVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Schemas: S.optional(SchemaVersionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSchemaVersionsResponse",
}) as any as S.Schema<ListSchemaVersionsResponse>;
export type OrchestrationToken = string;
export interface ListSessionsRequest {
  NextToken?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
  RequestOrigin?: string;
}
export const ListSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Tags: S.optional(TagsMap),
    RequestOrigin: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSessionsRequest",
}) as any as S.Schema<ListSessionsRequest>;
export type SessionIdList = string[];
export const SessionIdList = /*@__PURE__*/ S.Array(S.String);
export type SessionList = Session[];
export const SessionList = /*@__PURE__*/ S.Array(Session);
export interface ListSessionsResponse {
  Ids?: string[];
  Sessions?: Session[];
  NextToken?: string;
}
export const ListSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ids: S.optional(SessionIdList),
    Sessions: S.optional(SessionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSessionsResponse",
}) as any as S.Schema<ListSessionsResponse>;
export interface ListStatementsRequest {
  SessionId: string;
  RequestOrigin?: string;
  NextToken?: string;
}
export const ListStatementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.String,
    RequestOrigin: S.optional(S.String),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListStatementsRequest",
}) as any as S.Schema<ListStatementsRequest>;
export type StatementList = Statement[];
export const StatementList = /*@__PURE__*/ S.Array(Statement);
export interface ListStatementsResponse {
  Statements?: Statement[];
  NextToken?: string;
}
export const ListStatementsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Statements: S.optional(StatementList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListStatementsResponse",
}) as any as S.Schema<ListStatementsResponse>;
export type MaxListTableOptimizerRunsTokenResults = number;
export type ListTableOptimizerRunsToken = string;
export interface ListTableOptimizerRunsRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  Type: TableOptimizerType;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTableOptimizerRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.String,
    DatabaseName: S.String,
    TableName: S.String,
    Type: TableOptimizerType,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTableOptimizerRunsRequest",
}) as any as S.Schema<ListTableOptimizerRunsRequest>;
export type TableOptimizerRuns = TableOptimizerRun[];
export const TableOptimizerRuns = /*@__PURE__*/ S.Array(TableOptimizerRun);
export interface ListTableOptimizerRunsResponse {
  CatalogId?: string;
  DatabaseName?: string;
  TableName?: string;
  NextToken?: string;
  TableOptimizerRuns?: TableOptimizerRun[];
}
export const ListTableOptimizerRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    TableName: S.optional(S.String),
    NextToken: S.optional(S.String),
    TableOptimizerRuns: S.optional(TableOptimizerRuns),
  }),
).annotate({
  identifier: "ListTableOptimizerRunsResponse",
}) as any as S.Schema<ListTableOptimizerRunsResponse>;
export interface ListTriggersRequest {
  NextToken?: string;
  DependentJobName?: string;
  MaxResults?: number;
  Tags?: { [key: string]: string | undefined };
}
export const ListTriggersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    DependentJobName: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTriggersRequest",
}) as any as S.Schema<ListTriggersRequest>;
export interface ListTriggersResponse {
  TriggerNames?: string[];
  NextToken?: string;
}
export const ListTriggersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TriggerNames: S.optional(TriggerNameList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTriggersResponse",
}) as any as S.Schema<ListTriggersResponse>;
export interface ListUsageProfilesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListUsageProfilesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListUsageProfilesRequest",
}) as any as S.Schema<ListUsageProfilesRequest>;
export interface UsageProfileDefinition {
  Name?: string;
  Description?: string;
  CreatedOn?: Date;
  LastModifiedOn?: Date;
}
export const UsageProfileDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    CreatedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedOn: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "UsageProfileDefinition",
}) as any as S.Schema<UsageProfileDefinition>;
export type UsageProfileDefinitionList = UsageProfileDefinition[];
export const UsageProfileDefinitionList = /*@__PURE__*/ S.Array(
  UsageProfileDefinition,
);
export interface ListUsageProfilesResponse {
  Profiles?: UsageProfileDefinition[];
  NextToken?: string;
}
export const ListUsageProfilesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Profiles: S.optional(UsageProfileDefinitionList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListUsageProfilesResponse",
}) as any as S.Schema<ListUsageProfilesResponse>;
export interface ListWorkflowsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListWorkflowsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListWorkflowsRequest",
}) as any as S.Schema<ListWorkflowsRequest>;
export interface ListWorkflowsResponse {
  Workflows?: string[];
  NextToken?: string;
}
export const ListWorkflowsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Workflows: S.optional(WorkflowNames),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkflowsResponse",
}) as any as S.Schema<ListWorkflowsResponse>;
export interface ModifyIntegrationRequest {
  IntegrationIdentifier: string;
  Description?: string;
  DataFilter?: string;
  IntegrationConfig?: IntegrationConfig;
  IntegrationName?: string;
}
export const ModifyIntegrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegrationIdentifier: S.String,
    Description: S.optional(S.String),
    DataFilter: S.optional(S.String),
    IntegrationConfig: S.optional(IntegrationConfig),
    IntegrationName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ModifyIntegrationRequest",
}) as any as S.Schema<ModifyIntegrationRequest>;
export interface ModifyIntegrationResponse {
  SourceArn: string;
  TargetArn: string;
  IntegrationName: string;
  Description?: string;
  IntegrationArn: string;
  KmsKeyId?: string;
  AdditionalEncryptionContext?: { [key: string]: string | undefined };
  Tags?: Tag[];
  Status: IntegrationStatus;
  CreateTime: Date;
  Errors?: IntegrationError[];
  DataFilter?: string;
  IntegrationConfig?: IntegrationConfig;
}
export const ModifyIntegrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceArn: S.String,
    TargetArn: S.String,
    IntegrationName: S.String,
    Description: S.optional(S.String),
    IntegrationArn: S.String,
    KmsKeyId: S.optional(S.String),
    AdditionalEncryptionContext: S.optional(
      IntegrationAdditionalEncryptionContextMap,
    ),
    Tags: S.optional(IntegrationTagsList),
    Status: IntegrationStatus,
    CreateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Errors: S.optional(IntegrationErrorList),
    DataFilter: S.optional(S.String),
    IntegrationConfig: S.optional(IntegrationConfig),
  }),
).annotate({
  identifier: "ModifyIntegrationResponse",
}) as any as S.Schema<ModifyIntegrationResponse>;
export interface PutAssetRequest {
  AssetTypeId: string;
  Identifier: string;
  Name: string;
  Description?: string;
  Forms: { [key: string]: AssetFormEntry | undefined };
  ClientToken?: string;
}
export const PutAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetTypeId: S.String,
    Identifier: S.String,
    Name: S.String,
    Description: S.optional(S.String),
    Forms: AssetFormMap,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/assets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAssetRequest",
}) as any as S.Schema<PutAssetRequest>;
export interface PutAssetResponse {
  Id: string;
  Name: string;
  Description?: string;
  CreatedAt?: Date;
  Forms?: { [key: string]: AssetFormEntry | undefined };
}
export const PutAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Name: S.String,
    Description: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Forms: S.optional(AssetFormMap),
  }),
).annotate({
  identifier: "PutAssetResponse",
}) as any as S.Schema<PutAssetResponse>;
export interface PutAssetTypeRequest {
  Name: string;
  Forms: { [key: string]: AssetTypeFormReference | undefined };
  ClientToken?: string;
}
export const PutAssetTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Forms: AssetTypeFormsMap,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/asset-types" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAssetTypeRequest",
}) as any as S.Schema<PutAssetTypeRequest>;
export interface PutAssetTypeResponse {
  Id?: string;
  Name?: string;
  Forms?: { [key: string]: AssetTypeFormReference | undefined };
}
export const PutAssetTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Forms: S.optional(AssetTypeFormsMap),
  }),
).annotate({
  identifier: "PutAssetTypeResponse",
}) as any as S.Schema<PutAssetTypeResponse>;
export interface PutAttachmentRequest {
  AssetIdentifier: string;
  IterableFormName?: string;
  ItemIdentifier?: string;
  AttachmentName: string;
  Content: string;
  FormTypeId: string;
  ClientToken?: string;
}
export const PutAttachmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetIdentifier: S.String.pipe(T.HttpLabel("AssetIdentifier")),
    IterableFormName: S.optional(S.String),
    ItemIdentifier: S.optional(S.String),
    AttachmentName: S.String,
    Content: S.String,
    FormTypeId: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/assets/{AssetIdentifier}/attachment" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAttachmentRequest",
}) as any as S.Schema<PutAttachmentRequest>;
export interface PutAttachmentResponse {
  AssetIdentifier?: string;
  IterableFormName?: string;
  ItemIdentifier?: string;
  AttachmentName?: string;
  FormTypeId?: string;
}
export const PutAttachmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AssetIdentifier: S.optional(S.String),
    IterableFormName: S.optional(S.String),
    ItemIdentifier: S.optional(S.String),
    AttachmentName: S.optional(S.String),
    FormTypeId: S.optional(S.String),
  }),
).annotate({
  identifier: "PutAttachmentResponse",
}) as any as S.Schema<PutAttachmentResponse>;
export interface PutDataCatalogEncryptionSettingsRequest {
  CatalogId?: string;
  DataCatalogEncryptionSettings: DataCatalogEncryptionSettings;
}
export const PutDataCatalogEncryptionSettingsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CatalogId: S.optional(S.String),
      DataCatalogEncryptionSettings: DataCatalogEncryptionSettings,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "PutDataCatalogEncryptionSettingsRequest",
}) as any as S.Schema<PutDataCatalogEncryptionSettingsRequest>;
export interface PutDataCatalogEncryptionSettingsResponse {}
export const PutDataCatalogEncryptionSettingsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutDataCatalogEncryptionSettingsResponse",
}) as any as S.Schema<PutDataCatalogEncryptionSettingsResponse>;
export interface PutDataQualityProfileAnnotationRequest {
  ProfileId: string;
  InclusionAnnotation: InclusionAnnotationValue;
}
export const PutDataQualityProfileAnnotationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProfileId: S.String,
      InclusionAnnotation: InclusionAnnotationValue,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "PutDataQualityProfileAnnotationRequest",
}) as any as S.Schema<PutDataQualityProfileAnnotationRequest>;
export interface PutDataQualityProfileAnnotationResponse {}
export const PutDataQualityProfileAnnotationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutDataQualityProfileAnnotationResponse",
}) as any as S.Schema<PutDataQualityProfileAnnotationResponse>;
export interface PutFormTypeRequest {
  Name: string;
  Schema: string;
  ClientToken?: string;
}
export const PutFormTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Schema: S.String,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/form-types" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutFormTypeRequest",
}) as any as S.Schema<PutFormTypeRequest>;
export interface PutFormTypeResponse {
  Id?: string;
  Name?: string;
  Schema?: string;
}
export const PutFormTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Schema: S.optional(S.String),
  }),
).annotate({
  identifier: "PutFormTypeResponse",
}) as any as S.Schema<PutFormTypeResponse>;
export type ExistCondition =
  | "MUST_EXIST"
  | "NOT_EXIST"
  | "NONE"
  | (string & {});
export const ExistCondition = /*@__PURE__*/ S.String;

export type EnableHybridValues = "TRUE" | "FALSE" | (string & {});
export const EnableHybridValues = /*@__PURE__*/ S.String;

export interface PutResourcePolicyRequest {
  PolicyInJson: string;
  ResourceArn?: string;
  PolicyHashCondition?: string;
  PolicyExistsCondition?: ExistCondition;
  EnableHybrid?: EnableHybridValues;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyInJson: S.String,
    ResourceArn: S.optional(S.String),
    PolicyHashCondition: S.optional(S.String),
    PolicyExistsCondition: S.optional(ExistCondition),
    EnableHybrid: S.optional(EnableHybridValues),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResponse {
  PolicyHash?: string;
}
export const PutResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyHash: S.optional(S.String) }),
).annotate({
  identifier: "PutResourcePolicyResponse",
}) as any as S.Schema<PutResourcePolicyResponse>;
export type MetadataKeyString = string;
export type MetadataValueString = string;
export interface MetadataKeyValuePair {
  MetadataKey?: string;
  MetadataValue?: string;
}
export const MetadataKeyValuePair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetadataKey: S.optional(S.String),
    MetadataValue: S.optional(S.String),
  }),
).annotate({
  identifier: "MetadataKeyValuePair",
}) as any as S.Schema<MetadataKeyValuePair>;
export interface PutSchemaVersionMetadataInput {
  SchemaId?: SchemaId;
  SchemaVersionNumber?: SchemaVersionNumber;
  SchemaVersionId?: string;
  MetadataKeyValue: MetadataKeyValuePair;
}
export const PutSchemaVersionMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: S.optional(SchemaId),
    SchemaVersionNumber: S.optional(SchemaVersionNumber),
    SchemaVersionId: S.optional(S.String),
    MetadataKeyValue: MetadataKeyValuePair,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutSchemaVersionMetadataInput",
}) as any as S.Schema<PutSchemaVersionMetadataInput>;
export interface PutSchemaVersionMetadataResponse {
  SchemaArn?: string;
  SchemaName?: string;
  RegistryName?: string;
  LatestVersion?: boolean;
  VersionNumber?: number;
  SchemaVersionId?: string;
  MetadataKey?: string;
  MetadataValue?: string;
}
export const PutSchemaVersionMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaArn: S.optional(S.String),
    SchemaName: S.optional(S.String),
    RegistryName: S.optional(S.String),
    LatestVersion: S.optional(S.Boolean),
    VersionNumber: S.optional(S.Number),
    SchemaVersionId: S.optional(S.String),
    MetadataKey: S.optional(S.String),
    MetadataValue: S.optional(S.String),
  }),
).annotate({
  identifier: "PutSchemaVersionMetadataResponse",
}) as any as S.Schema<PutSchemaVersionMetadataResponse>;
export interface PutWorkflowRunPropertiesRequest {
  Name: string;
  RunId: string;
  RunProperties: { [key: string]: string | undefined };
}
export const PutWorkflowRunPropertiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    RunId: S.String,
    RunProperties: WorkflowRunProperties,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutWorkflowRunPropertiesRequest",
}) as any as S.Schema<PutWorkflowRunPropertiesRequest>;
export interface PutWorkflowRunPropertiesResponse {}
export const PutWorkflowRunPropertiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutWorkflowRunPropertiesResponse",
}) as any as S.Schema<PutWorkflowRunPropertiesResponse>;
export type MetadataList = MetadataKeyValuePair[];
export const MetadataList = /*@__PURE__*/ S.Array(MetadataKeyValuePair);
export type QuerySchemaVersionMetadataMaxResults = number;
export interface QuerySchemaVersionMetadataInput {
  SchemaId?: SchemaId;
  SchemaVersionNumber?: SchemaVersionNumber;
  SchemaVersionId?: string;
  MetadataList?: MetadataKeyValuePair[];
  MaxResults?: number;
  NextToken?: string;
}
export const QuerySchemaVersionMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: S.optional(SchemaId),
    SchemaVersionNumber: S.optional(SchemaVersionNumber),
    SchemaVersionId: S.optional(S.String),
    MetadataList: S.optional(MetadataList),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "QuerySchemaVersionMetadataInput",
}) as any as S.Schema<QuerySchemaVersionMetadataInput>;
export interface OtherMetadataValueListItem {
  MetadataValue?: string;
  CreatedTime?: string;
}
export const OtherMetadataValueListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetadataValue: S.optional(S.String),
    CreatedTime: S.optional(S.String),
  }),
).annotate({
  identifier: "OtherMetadataValueListItem",
}) as any as S.Schema<OtherMetadataValueListItem>;
export type OtherMetadataValueList = OtherMetadataValueListItem[];
export const OtherMetadataValueList = /*@__PURE__*/ S.Array(
  OtherMetadataValueListItem,
);
export interface MetadataInfo {
  MetadataValue?: string;
  CreatedTime?: string;
  OtherMetadataValueList?: OtherMetadataValueListItem[];
}
export const MetadataInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetadataValue: S.optional(S.String),
    CreatedTime: S.optional(S.String),
    OtherMetadataValueList: S.optional(OtherMetadataValueList),
  }),
).annotate({ identifier: "MetadataInfo" }) as any as S.Schema<MetadataInfo>;
export type MetadataInfoMap = { [key: string]: MetadataInfo | undefined };
export const MetadataInfoMap = /*@__PURE__*/ S.Record(
  S.String,
  MetadataInfo.pipe(S.optional),
);
export interface QuerySchemaVersionMetadataResponse {
  MetadataInfoMap?: { [key: string]: MetadataInfo | undefined };
  SchemaVersionId?: string;
  NextToken?: string;
}
export const QuerySchemaVersionMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetadataInfoMap: S.optional(MetadataInfoMap),
    SchemaVersionId: S.optional(S.String),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "QuerySchemaVersionMetadataResponse",
}) as any as S.Schema<QuerySchemaVersionMetadataResponse>;
export type IntegrationType = "REST" | (string & {});
export const IntegrationType = /*@__PURE__*/ S.String;

export interface ConnectionPropertiesConfiguration {
  Url?: ConnectorProperty;
  AdditionalRequestParameters?: ConnectorProperty[];
}
export const ConnectionPropertiesConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Url: S.optional(ConnectorProperty),
    AdditionalRequestParameters: S.optional(ConnectorPropertyList),
  }),
).annotate({
  identifier: "ConnectionPropertiesConfiguration",
}) as any as S.Schema<ConnectionPropertiesConfiguration>;
export type ConnectorOAuth2GrantType =
  | "CLIENT_CREDENTIALS"
  | "JWT_BEARER"
  | "AUTHORIZATION_CODE"
  | (string & {});
export const ConnectorOAuth2GrantType = /*@__PURE__*/ S.String;

export type ContentType = "APPLICATION_JSON" | "URL_ENCODED" | (string & {});
export const ContentType = /*@__PURE__*/ S.String;

export interface ClientCredentialsProperties {
  TokenUrl?: ConnectorProperty;
  RequestMethod?: HTTPMethod;
  ContentType?: ContentType;
  ClientId?: ConnectorProperty;
  ClientSecret?: ConnectorProperty;
  Scope?: ConnectorProperty;
  TokenUrlParameters?: ConnectorProperty[];
}
export const ClientCredentialsProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TokenUrl: S.optional(ConnectorProperty),
    RequestMethod: S.optional(HTTPMethod),
    ContentType: S.optional(ContentType),
    ClientId: S.optional(ConnectorProperty),
    ClientSecret: S.optional(ConnectorProperty),
    Scope: S.optional(ConnectorProperty),
    TokenUrlParameters: S.optional(ConnectorPropertyList),
  }),
).annotate({
  identifier: "ClientCredentialsProperties",
}) as any as S.Schema<ClientCredentialsProperties>;
export interface JWTBearerProperties {
  TokenUrl?: ConnectorProperty;
  RequestMethod?: HTTPMethod;
  ContentType?: ContentType;
  JwtToken?: ConnectorProperty;
  TokenUrlParameters?: ConnectorProperty[];
}
export const JWTBearerProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TokenUrl: S.optional(ConnectorProperty),
    RequestMethod: S.optional(HTTPMethod),
    ContentType: S.optional(ContentType),
    JwtToken: S.optional(ConnectorProperty),
    TokenUrlParameters: S.optional(ConnectorPropertyList),
  }),
).annotate({
  identifier: "JWTBearerProperties",
}) as any as S.Schema<JWTBearerProperties>;
export interface ConnectorAuthorizationCodeProperties {
  AuthorizationCodeUrl?: ConnectorProperty;
  AuthorizationCode?: ConnectorProperty;
  RedirectUri?: ConnectorProperty;
  TokenUrl?: ConnectorProperty;
  RequestMethod?: HTTPMethod;
  ContentType?: ContentType;
  ClientId?: ConnectorProperty;
  ClientSecret?: ConnectorProperty;
  Scope?: ConnectorProperty;
  Prompt?: ConnectorProperty;
  TokenUrlParameters?: ConnectorProperty[];
}
export const ConnectorAuthorizationCodeProperties = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AuthorizationCodeUrl: S.optional(ConnectorProperty),
      AuthorizationCode: S.optional(ConnectorProperty),
      RedirectUri: S.optional(ConnectorProperty),
      TokenUrl: S.optional(ConnectorProperty),
      RequestMethod: S.optional(HTTPMethod),
      ContentType: S.optional(ContentType),
      ClientId: S.optional(ConnectorProperty),
      ClientSecret: S.optional(ConnectorProperty),
      Scope: S.optional(ConnectorProperty),
      Prompt: S.optional(ConnectorProperty),
      TokenUrlParameters: S.optional(ConnectorPropertyList),
    }),
).annotate({
  identifier: "ConnectorAuthorizationCodeProperties",
}) as any as S.Schema<ConnectorAuthorizationCodeProperties>;
export interface ConnectorOAuth2Properties {
  OAuth2GrantType: ConnectorOAuth2GrantType;
  ClientCredentialsProperties?: ClientCredentialsProperties;
  JWTBearerProperties?: JWTBearerProperties;
  AuthorizationCodeProperties?: ConnectorAuthorizationCodeProperties;
}
export const ConnectorOAuth2Properties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OAuth2GrantType: ConnectorOAuth2GrantType,
    ClientCredentialsProperties: S.optional(ClientCredentialsProperties),
    JWTBearerProperties: S.optional(JWTBearerProperties),
    AuthorizationCodeProperties: S.optional(
      ConnectorAuthorizationCodeProperties,
    ),
  }),
).annotate({
  identifier: "ConnectorOAuth2Properties",
}) as any as S.Schema<ConnectorOAuth2Properties>;
export interface BasicAuthenticationProperties {
  Username?: ConnectorProperty;
  Password?: ConnectorProperty;
}
export const BasicAuthenticationProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Username: S.optional(ConnectorProperty),
    Password: S.optional(ConnectorProperty),
  }),
).annotate({
  identifier: "BasicAuthenticationProperties",
}) as any as S.Schema<BasicAuthenticationProperties>;
export interface CustomAuthenticationProperties {
  AuthenticationParameters: ConnectorProperty[];
}
export const CustomAuthenticationProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AuthenticationParameters: ConnectorPropertyList }),
).annotate({
  identifier: "CustomAuthenticationProperties",
}) as any as S.Schema<CustomAuthenticationProperties>;
export interface ConnectorAuthenticationConfiguration {
  AuthenticationTypes: AuthenticationType[];
  OAuth2Properties?: ConnectorOAuth2Properties;
  BasicAuthenticationProperties?: BasicAuthenticationProperties;
  CustomAuthenticationProperties?: CustomAuthenticationProperties;
}
export const ConnectorAuthenticationConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AuthenticationTypes: AuthenticationTypes,
      OAuth2Properties: S.optional(ConnectorOAuth2Properties),
      BasicAuthenticationProperties: S.optional(BasicAuthenticationProperties),
      CustomAuthenticationProperties: S.optional(
        CustomAuthenticationProperties,
      ),
    }),
).annotate({
  identifier: "ConnectorAuthenticationConfiguration",
}) as any as S.Schema<ConnectorAuthenticationConfiguration>;
export interface RegisterConnectionTypeRequest {
  ConnectionType: string;
  IntegrationType: IntegrationType;
  Description?: string;
  ConnectionProperties: ConnectionPropertiesConfiguration;
  ConnectorAuthenticationConfiguration: ConnectorAuthenticationConfiguration;
  RestConfiguration: RestConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export const RegisterConnectionTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionType: S.String,
    IntegrationType: IntegrationType,
    Description: S.optional(S.String),
    ConnectionProperties: ConnectionPropertiesConfiguration,
    ConnectorAuthenticationConfiguration: ConnectorAuthenticationConfiguration,
    RestConfiguration: RestConfiguration,
    Tags: S.optional(TagsMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RegisterConnectionTypeRequest",
}) as any as S.Schema<RegisterConnectionTypeRequest>;
export interface RegisterConnectionTypeResponse {
  ConnectionTypeArn?: string;
}
export const RegisterConnectionTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConnectionTypeArn: S.optional(S.String) }),
).annotate({
  identifier: "RegisterConnectionTypeResponse",
}) as any as S.Schema<RegisterConnectionTypeResponse>;
export interface RegisterSchemaVersionInput {
  SchemaId: SchemaId;
  SchemaDefinition: string;
}
export const RegisterSchemaVersionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SchemaId: SchemaId, SchemaDefinition: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RegisterSchemaVersionInput",
}) as any as S.Schema<RegisterSchemaVersionInput>;
export interface RegisterSchemaVersionResponse {
  SchemaVersionId?: string;
  VersionNumber?: number;
  Status?: SchemaVersionStatus;
}
export const RegisterSchemaVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaVersionId: S.optional(S.String),
    VersionNumber: S.optional(S.Number),
    Status: S.optional(SchemaVersionStatus),
  }),
).annotate({
  identifier: "RegisterSchemaVersionResponse",
}) as any as S.Schema<RegisterSchemaVersionResponse>;
export interface RemoveSchemaVersionMetadataInput {
  SchemaId?: SchemaId;
  SchemaVersionNumber?: SchemaVersionNumber;
  SchemaVersionId?: string;
  MetadataKeyValue: MetadataKeyValuePair;
}
export const RemoveSchemaVersionMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: S.optional(SchemaId),
    SchemaVersionNumber: S.optional(SchemaVersionNumber),
    SchemaVersionId: S.optional(S.String),
    MetadataKeyValue: MetadataKeyValuePair,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RemoveSchemaVersionMetadataInput",
}) as any as S.Schema<RemoveSchemaVersionMetadataInput>;
export interface RemoveSchemaVersionMetadataResponse {
  SchemaArn?: string;
  SchemaName?: string;
  RegistryName?: string;
  LatestVersion?: boolean;
  VersionNumber?: number;
  SchemaVersionId?: string;
  MetadataKey?: string;
  MetadataValue?: string;
}
export const RemoveSchemaVersionMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaArn: S.optional(S.String),
    SchemaName: S.optional(S.String),
    RegistryName: S.optional(S.String),
    LatestVersion: S.optional(S.Boolean),
    VersionNumber: S.optional(S.Number),
    SchemaVersionId: S.optional(S.String),
    MetadataKey: S.optional(S.String),
    MetadataValue: S.optional(S.String),
  }),
).annotate({
  identifier: "RemoveSchemaVersionMetadataResponse",
}) as any as S.Schema<RemoveSchemaVersionMetadataResponse>;
export interface ResetJobBookmarkRequest {
  JobName: string;
  RunId?: string;
}
export const ResetJobBookmarkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobName: S.String, RunId: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ResetJobBookmarkRequest",
}) as any as S.Schema<ResetJobBookmarkRequest>;
export interface ResetJobBookmarkResponse {
  JobBookmarkEntry?: JobBookmarkEntry;
}
export const ResetJobBookmarkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobBookmarkEntry: S.optional(JobBookmarkEntry) }),
).annotate({
  identifier: "ResetJobBookmarkResponse",
}) as any as S.Schema<ResetJobBookmarkResponse>;
export type NodeIdList = string[];
export const NodeIdList = /*@__PURE__*/ S.Array(S.String);
export interface ResumeWorkflowRunRequest {
  Name: string;
  RunId: string;
  NodeIds: string[];
}
export const ResumeWorkflowRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, RunId: S.String, NodeIds: NodeIdList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ResumeWorkflowRunRequest",
}) as any as S.Schema<ResumeWorkflowRunRequest>;
export interface ResumeWorkflowRunResponse {
  RunId?: string;
  NodeIds?: string[];
}
export const ResumeWorkflowRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RunId: S.optional(S.String), NodeIds: S.optional(NodeIdList) }),
).annotate({
  identifier: "ResumeWorkflowRunResponse",
}) as any as S.Schema<ResumeWorkflowRunResponse>;
export type OrchestrationStatementCodeString = string;
export interface RunStatementRequest {
  SessionId: string;
  Code: string;
  RequestOrigin?: string;
}
export const RunStatementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.String,
    Code: S.String,
    RequestOrigin: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RunStatementRequest",
}) as any as S.Schema<RunStatementRequest>;
export interface RunStatementResponse {
  Id?: number;
}
export const RunStatementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.Number) }),
).annotate({
  identifier: "RunStatementResponse",
}) as any as S.Schema<RunStatementResponse>;
export type SearchText = string;
export type SearchMaxResults = number;
export type SearchNextToken = string;
export type SearchAttribute = string;
export type SearchSortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SearchSortOrder = /*@__PURE__*/ S.String;

export interface SearchSort {
  Attribute: string;
  Order?: SearchSortOrder;
}
export const SearchSort = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Attribute: S.String, Order: S.optional(SearchSortOrder) }),
).annotate({ identifier: "SearchSort" }) as any as S.Schema<SearchSort>;
export type SearchFilterClauseList = SearchFilterClause[];
export const SearchFilterClauseList = /*@__PURE__*/ S.Array(
  S.suspend(() => SearchFilterClause).annotate({
    identifier: "SearchFilterClause",
  }),
) as any as S.Schema<SearchFilterClauseList>;
export type SearchFilterOperator =
  | "equals"
  | "greaterThan"
  | "greaterThanOrEquals"
  | "lessThan"
  | "lessThanOrEquals"
  | "notExists"
  | (string & {});
export const SearchFilterOperator = /*@__PURE__*/ S.String;

export type SearchFilterStringValue = string;
export type SearchFilterLongValue = number;
export type SearchFilterValue =
  | { StringValue: string; LongValue?: never }
  | { StringValue?: never; LongValue: number };
export const SearchFilterValue = /*@__PURE__*/ S.Union([
  S.Struct({ StringValue: S.String }),
  S.Struct({ LongValue: S.Number }),
]);
export interface SearchAttributeFilter {
  Attribute: string;
  Operator: SearchFilterOperator;
  Value?: SearchFilterValue;
}
export const SearchAttributeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attribute: S.String,
    Operator: SearchFilterOperator,
    Value: S.optional(SearchFilterValue),
  }),
).annotate({
  identifier: "SearchAttributeFilter",
}) as any as S.Schema<SearchAttributeFilter>;
export type SearchMapKey = string;
export type SearchMapFilterValue = { StringValue: string };
export const SearchMapFilterValue = /*@__PURE__*/ S.Union([
  S.Struct({ StringValue: S.String }),
]);
export interface SearchMapFilter {
  Attribute: string;
  Key: string;
  Value: SearchMapFilterValue;
}
export const SearchMapFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Attribute: S.String, Key: S.String, Value: SearchMapFilterValue }),
).annotate({
  identifier: "SearchMapFilter",
}) as any as S.Schema<SearchMapFilter>;
export type SearchFilterClause =
  | {
      AndAllFilters: SearchFilterClause[];
      OrAnyFilters?: never;
      AttributeFilter?: never;
      MapFilter?: never;
    }
  | {
      AndAllFilters?: never;
      OrAnyFilters: SearchFilterClause[];
      AttributeFilter?: never;
      MapFilter?: never;
    }
  | {
      AndAllFilters?: never;
      OrAnyFilters?: never;
      AttributeFilter: SearchAttributeFilter;
      MapFilter?: never;
    }
  | {
      AndAllFilters?: never;
      OrAnyFilters?: never;
      AttributeFilter?: never;
      MapFilter: SearchMapFilter;
    };
export const SearchFilterClause = /*@__PURE__*/ S.Union([
  S.Struct({
    AndAllFilters: S.suspend(() => SearchFilterClauseList).annotate({
      identifier: "SearchFilterClauseList",
    }),
  }),
  S.Struct({
    OrAnyFilters: S.suspend(() => SearchFilterClauseList).annotate({
      identifier: "SearchFilterClauseList",
    }),
  }),
  S.Struct({ AttributeFilter: SearchAttributeFilter }),
  S.Struct({ MapFilter: SearchMapFilter }),
]) as any as S.Schema<SearchFilterClause>;
export interface SearchAssetsInput {
  SearchText?: string;
  MaxResults?: number;
  NextToken?: string;
  Sort?: SearchSort;
  FilterClause?: SearchFilterClause;
}
export const SearchAssetsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchText: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Sort: S.optional(SearchSort),
    FilterClause: S.optional(SearchFilterClause),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/search-assets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchAssetsInput",
}) as any as S.Schema<SearchAssetsInput>;
export type SearchResultName = string;
export interface SearchResultItem {
  Id?: string;
  AssetName?: string;
  AssetDescription?: string;
  UpdatedAt?: Date;
  AssetTypeId?: string;
}
export const SearchResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    AssetName: S.optional(S.String),
    AssetDescription: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AssetTypeId: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchResultItem",
}) as any as S.Schema<SearchResultItem>;
export type SearchResultItemList = SearchResultItem[];
export const SearchResultItemList = /*@__PURE__*/ S.Array(SearchResultItem);
export interface SearchAssetsOutput {
  Items?: SearchResultItem[];
  NextToken?: string;
}
export const SearchAssetsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(SearchResultItemList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SearchAssetsOutput",
}) as any as S.Schema<SearchAssetsOutput>;
export type Comparator =
  | "EQUALS"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "GREATER_THAN_EQUALS"
  | "LESS_THAN_EQUALS"
  | (string & {});
export const Comparator = /*@__PURE__*/ S.String;

export interface PropertyPredicate {
  Key?: string;
  Value?: string;
  Comparator?: Comparator;
}
export const PropertyPredicate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Value: S.optional(S.String),
    Comparator: S.optional(Comparator),
  }),
).annotate({
  identifier: "PropertyPredicate",
}) as any as S.Schema<PropertyPredicate>;
export type SearchPropertyPredicates = PropertyPredicate[];
export const SearchPropertyPredicates =
  /*@__PURE__*/ S.Array(PropertyPredicate);
export type Sort = "ASC" | "DESC" | (string & {});
export const Sort = /*@__PURE__*/ S.String;

export interface SortCriterion {
  FieldName?: string;
  Sort?: Sort;
}
export const SortCriterion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FieldName: S.optional(S.String), Sort: S.optional(Sort) }),
).annotate({ identifier: "SortCriterion" }) as any as S.Schema<SortCriterion>;
export type SortCriteria = SortCriterion[];
export const SortCriteria = /*@__PURE__*/ S.Array(SortCriterion);
export interface SearchTablesRequest {
  CatalogId?: string;
  NextToken?: string;
  Filters?: PropertyPredicate[];
  SearchText?: string;
  SortCriteria?: SortCriterion[];
  MaxResults?: number;
  ResourceShareType?: ResourceShareType;
  IncludeStatusDetails?: boolean;
}
export const SearchTablesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    NextToken: S.optional(S.String),
    Filters: S.optional(SearchPropertyPredicates),
    SearchText: S.optional(S.String),
    SortCriteria: S.optional(SortCriteria),
    MaxResults: S.optional(S.Number),
    ResourceShareType: S.optional(ResourceShareType),
    IncludeStatusDetails: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SearchTablesRequest",
}) as any as S.Schema<SearchTablesRequest>;
export interface SearchTablesResponse {
  NextToken?: string;
  TableList?: Table[];
}
export const SearchTablesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    TableList: S.optional(TableList),
  }),
).annotate({
  identifier: "SearchTablesResponse",
}) as any as S.Schema<SearchTablesResponse>;
export interface StartBlueprintRunRequest {
  BlueprintName: string;
  Parameters?: string;
  RoleArn: string;
}
export const StartBlueprintRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlueprintName: S.String,
    Parameters: S.optional(S.String),
    RoleArn: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartBlueprintRunRequest",
}) as any as S.Schema<StartBlueprintRunRequest>;
export interface StartBlueprintRunResponse {
  RunId?: string;
}
export const StartBlueprintRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RunId: S.optional(S.String) }),
).annotate({
  identifier: "StartBlueprintRunResponse",
}) as any as S.Schema<StartBlueprintRunResponse>;
export interface StartColumnStatisticsTaskRunRequest {
  DatabaseName: string;
  TableName: string;
  ColumnNameList?: string[];
  Role: string;
  SampleSize?: number;
  CatalogID?: string;
  SecurityConfiguration?: string;
}
export const StartColumnStatisticsTaskRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.String,
    TableName: S.String,
    ColumnNameList: S.optional(ColumnNameList),
    Role: S.String,
    SampleSize: S.optional(S.Number),
    CatalogID: S.optional(S.String),
    SecurityConfiguration: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartColumnStatisticsTaskRunRequest",
}) as any as S.Schema<StartColumnStatisticsTaskRunRequest>;
export interface StartColumnStatisticsTaskRunResponse {
  ColumnStatisticsTaskRunId?: string;
}
export const StartColumnStatisticsTaskRunResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ ColumnStatisticsTaskRunId: S.optional(S.String) }),
).annotate({
  identifier: "StartColumnStatisticsTaskRunResponse",
}) as any as S.Schema<StartColumnStatisticsTaskRunResponse>;
export interface StartColumnStatisticsTaskRunScheduleRequest {
  DatabaseName: string;
  TableName: string;
}
export const StartColumnStatisticsTaskRunScheduleRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DatabaseName: S.String, TableName: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "StartColumnStatisticsTaskRunScheduleRequest",
  }) as any as S.Schema<StartColumnStatisticsTaskRunScheduleRequest>;
export interface StartColumnStatisticsTaskRunScheduleResponse {}
export const StartColumnStatisticsTaskRunScheduleResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "StartColumnStatisticsTaskRunScheduleResponse",
  }) as any as S.Schema<StartColumnStatisticsTaskRunScheduleResponse>;
export interface StartCrawlerRequest {
  Name: string;
}
export const StartCrawlerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartCrawlerRequest",
}) as any as S.Schema<StartCrawlerRequest>;
export interface StartCrawlerResponse {}
export const StartCrawlerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartCrawlerResponse",
}) as any as S.Schema<StartCrawlerResponse>;
export interface StartCrawlerScheduleRequest {
  CrawlerName: string;
}
export const StartCrawlerScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CrawlerName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartCrawlerScheduleRequest",
}) as any as S.Schema<StartCrawlerScheduleRequest>;
export interface StartCrawlerScheduleResponse {}
export const StartCrawlerScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartCrawlerScheduleResponse",
}) as any as S.Schema<StartCrawlerScheduleResponse>;
export interface StartDataQualityRuleRecommendationRunRequest {
  DataSource: DataSource;
  Role: string;
  NumberOfWorkers?: number;
  Timeout?: number;
  CreatedRulesetName?: string;
  DataQualitySecurityConfiguration?: string;
  ClientToken?: string;
}
export const StartDataQualityRuleRecommendationRunRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DataSource: DataSource,
      Role: S.String,
      NumberOfWorkers: S.optional(S.Number),
      Timeout: S.optional(S.Number),
      CreatedRulesetName: S.optional(S.String),
      DataQualitySecurityConfiguration: S.optional(S.String),
      ClientToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "StartDataQualityRuleRecommendationRunRequest",
  }) as any as S.Schema<StartDataQualityRuleRecommendationRunRequest>;
export interface StartDataQualityRuleRecommendationRunResponse {
  RunId?: string;
}
export const StartDataQualityRuleRecommendationRunResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RunId: S.optional(S.String) }),
  ).annotate({
    identifier: "StartDataQualityRuleRecommendationRunResponse",
  }) as any as S.Schema<StartDataQualityRuleRecommendationRunResponse>;
export interface StartDataQualityRulesetEvaluationRunRequest {
  DataSource: DataSource;
  Role: string;
  NumberOfWorkers?: number;
  Timeout?: number;
  ClientToken?: string;
  AdditionalRunOptions?: DataQualityEvaluationRunAdditionalRunOptions;
  RulesetNames: string[];
  AdditionalDataSources?: { [key: string]: DataSource | undefined };
}
export const StartDataQualityRulesetEvaluationRunRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DataSource: DataSource,
      Role: S.String,
      NumberOfWorkers: S.optional(S.Number),
      Timeout: S.optional(S.Number),
      ClientToken: S.optional(S.String),
      AdditionalRunOptions: S.optional(
        DataQualityEvaluationRunAdditionalRunOptions,
      ),
      RulesetNames: RulesetNames,
      AdditionalDataSources: S.optional(DataSourceMap),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "StartDataQualityRulesetEvaluationRunRequest",
  }) as any as S.Schema<StartDataQualityRulesetEvaluationRunRequest>;
export interface StartDataQualityRulesetEvaluationRunResponse {
  RunId?: string;
}
export const StartDataQualityRulesetEvaluationRunResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RunId: S.optional(S.String) }),
  ).annotate({
    identifier: "StartDataQualityRulesetEvaluationRunResponse",
  }) as any as S.Schema<StartDataQualityRulesetEvaluationRunResponse>;
export interface StartExportLabelsTaskRunRequest {
  TransformId: string;
  OutputS3Path: string;
}
export const StartExportLabelsTaskRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransformId: S.String, OutputS3Path: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartExportLabelsTaskRunRequest",
}) as any as S.Schema<StartExportLabelsTaskRunRequest>;
export interface StartExportLabelsTaskRunResponse {
  TaskRunId?: string;
}
export const StartExportLabelsTaskRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskRunId: S.optional(S.String) }),
).annotate({
  identifier: "StartExportLabelsTaskRunResponse",
}) as any as S.Schema<StartExportLabelsTaskRunResponse>;
export interface StartImportLabelsTaskRunRequest {
  TransformId: string;
  InputS3Path: string;
  ReplaceAllLabels?: boolean;
}
export const StartImportLabelsTaskRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransformId: S.String,
    InputS3Path: S.String,
    ReplaceAllLabels: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartImportLabelsTaskRunRequest",
}) as any as S.Schema<StartImportLabelsTaskRunRequest>;
export interface StartImportLabelsTaskRunResponse {
  TaskRunId?: string;
}
export const StartImportLabelsTaskRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskRunId: S.optional(S.String) }),
).annotate({
  identifier: "StartImportLabelsTaskRunResponse",
}) as any as S.Schema<StartImportLabelsTaskRunResponse>;
export interface StartJobRunRequest {
  JobName: string;
  JobRunQueuingEnabled?: boolean;
  JobRunId?: string;
  Arguments?: { [key: string]: string | undefined };
  AllocatedCapacity?: number;
  Timeout?: number;
  MaxCapacity?: number;
  SecurityConfiguration?: string;
  NotificationProperty?: NotificationProperty;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  ExecutionClass?: ExecutionClass;
  ExecutionRoleSessionPolicy?: string;
}
export const StartJobRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.String,
    JobRunQueuingEnabled: S.optional(S.Boolean),
    JobRunId: S.optional(S.String),
    Arguments: S.optional(GenericMap),
    AllocatedCapacity: S.optional(S.Number),
    Timeout: S.optional(S.Number),
    MaxCapacity: S.optional(S.Number),
    SecurityConfiguration: S.optional(S.String),
    NotificationProperty: S.optional(NotificationProperty),
    WorkerType: S.optional(WorkerType),
    NumberOfWorkers: S.optional(S.Number),
    ExecutionClass: S.optional(ExecutionClass),
    ExecutionRoleSessionPolicy: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartJobRunRequest",
}) as any as S.Schema<StartJobRunRequest>;
export interface StartJobRunResponse {
  JobRunId?: string;
}
export const StartJobRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobRunId: S.optional(S.String) }),
).annotate({
  identifier: "StartJobRunResponse",
}) as any as S.Schema<StartJobRunResponse>;
export interface StartMaterializedViewRefreshTaskRunRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  FullRefresh?: boolean;
}
export const StartMaterializedViewRefreshTaskRunRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CatalogId: S.String,
      DatabaseName: S.String,
      TableName: S.String,
      FullRefresh: S.optional(S.Boolean),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "StartMaterializedViewRefreshTaskRunRequest",
  }) as any as S.Schema<StartMaterializedViewRefreshTaskRunRequest>;
export interface StartMaterializedViewRefreshTaskRunResponse {
  MaterializedViewRefreshTaskRunId?: string;
}
export const StartMaterializedViewRefreshTaskRunResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ MaterializedViewRefreshTaskRunId: S.optional(S.String) }),
  ).annotate({
    identifier: "StartMaterializedViewRefreshTaskRunResponse",
  }) as any as S.Schema<StartMaterializedViewRefreshTaskRunResponse>;
export interface StartMLEvaluationTaskRunRequest {
  TransformId: string;
}
export const StartMLEvaluationTaskRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransformId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartMLEvaluationTaskRunRequest",
}) as any as S.Schema<StartMLEvaluationTaskRunRequest>;
export interface StartMLEvaluationTaskRunResponse {
  TaskRunId?: string;
}
export const StartMLEvaluationTaskRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskRunId: S.optional(S.String) }),
).annotate({
  identifier: "StartMLEvaluationTaskRunResponse",
}) as any as S.Schema<StartMLEvaluationTaskRunResponse>;
export interface StartMLLabelingSetGenerationTaskRunRequest {
  TransformId: string;
  OutputS3Path: string;
}
export const StartMLLabelingSetGenerationTaskRunRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ TransformId: S.String, OutputS3Path: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "StartMLLabelingSetGenerationTaskRunRequest",
  }) as any as S.Schema<StartMLLabelingSetGenerationTaskRunRequest>;
export interface StartMLLabelingSetGenerationTaskRunResponse {
  TaskRunId?: string;
}
export const StartMLLabelingSetGenerationTaskRunResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ TaskRunId: S.optional(S.String) }),
  ).annotate({
    identifier: "StartMLLabelingSetGenerationTaskRunResponse",
  }) as any as S.Schema<StartMLLabelingSetGenerationTaskRunResponse>;
export interface StartTriggerRequest {
  Name: string;
}
export const StartTriggerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartTriggerRequest",
}) as any as S.Schema<StartTriggerRequest>;
export interface StartTriggerResponse {
  Name?: string;
}
export const StartTriggerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "StartTriggerResponse",
}) as any as S.Schema<StartTriggerResponse>;
export interface StartWorkflowRunRequest {
  Name: string;
  RunProperties?: { [key: string]: string | undefined };
}
export const StartWorkflowRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    RunProperties: S.optional(WorkflowRunProperties),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartWorkflowRunRequest",
}) as any as S.Schema<StartWorkflowRunRequest>;
export interface StartWorkflowRunResponse {
  RunId?: string;
}
export const StartWorkflowRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RunId: S.optional(S.String) }),
).annotate({
  identifier: "StartWorkflowRunResponse",
}) as any as S.Schema<StartWorkflowRunResponse>;
export interface StopColumnStatisticsTaskRunRequest {
  DatabaseName: string;
  TableName: string;
}
export const StopColumnStatisticsTaskRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatabaseName: S.String, TableName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopColumnStatisticsTaskRunRequest",
}) as any as S.Schema<StopColumnStatisticsTaskRunRequest>;
export interface StopColumnStatisticsTaskRunResponse {}
export const StopColumnStatisticsTaskRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopColumnStatisticsTaskRunResponse",
}) as any as S.Schema<StopColumnStatisticsTaskRunResponse>;
export interface StopColumnStatisticsTaskRunScheduleRequest {
  DatabaseName: string;
  TableName: string;
}
export const StopColumnStatisticsTaskRunScheduleRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DatabaseName: S.String, TableName: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "StopColumnStatisticsTaskRunScheduleRequest",
  }) as any as S.Schema<StopColumnStatisticsTaskRunScheduleRequest>;
export interface StopColumnStatisticsTaskRunScheduleResponse {}
export const StopColumnStatisticsTaskRunScheduleResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "StopColumnStatisticsTaskRunScheduleResponse",
  }) as any as S.Schema<StopColumnStatisticsTaskRunScheduleResponse>;
export interface StopCrawlerRequest {
  Name: string;
}
export const StopCrawlerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopCrawlerRequest",
}) as any as S.Schema<StopCrawlerRequest>;
export interface StopCrawlerResponse {}
export const StopCrawlerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopCrawlerResponse",
}) as any as S.Schema<StopCrawlerResponse>;
export interface StopCrawlerScheduleRequest {
  CrawlerName: string;
}
export const StopCrawlerScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CrawlerName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopCrawlerScheduleRequest",
}) as any as S.Schema<StopCrawlerScheduleRequest>;
export interface StopCrawlerScheduleResponse {}
export const StopCrawlerScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopCrawlerScheduleResponse",
}) as any as S.Schema<StopCrawlerScheduleResponse>;
export interface StopMaterializedViewRefreshTaskRunRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
}
export const StopMaterializedViewRefreshTaskRunRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CatalogId: S.String,
      DatabaseName: S.String,
      TableName: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "StopMaterializedViewRefreshTaskRunRequest",
  }) as any as S.Schema<StopMaterializedViewRefreshTaskRunRequest>;
export interface StopMaterializedViewRefreshTaskRunResponse {}
export const StopMaterializedViewRefreshTaskRunResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "StopMaterializedViewRefreshTaskRunResponse",
  }) as any as S.Schema<StopMaterializedViewRefreshTaskRunResponse>;
export interface StopSessionRequest {
  Id: string;
  RequestOrigin?: string;
}
export const StopSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, RequestOrigin: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopSessionRequest",
}) as any as S.Schema<StopSessionRequest>;
export interface StopSessionResponse {
  Id?: string;
}
export const StopSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }),
).annotate({
  identifier: "StopSessionResponse",
}) as any as S.Schema<StopSessionResponse>;
export interface StopTriggerRequest {
  Name: string;
}
export const StopTriggerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopTriggerRequest",
}) as any as S.Schema<StopTriggerRequest>;
export interface StopTriggerResponse {
  Name?: string;
}
export const StopTriggerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "StopTriggerResponse",
}) as any as S.Schema<StopTriggerResponse>;
export interface StopWorkflowRunRequest {
  Name: string;
  RunId: string;
}
export const StopWorkflowRunRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, RunId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopWorkflowRunRequest",
}) as any as S.Schema<StopWorkflowRunRequest>;
export interface StopWorkflowRunResponse {}
export const StopWorkflowRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopWorkflowRunResponse",
}) as any as S.Schema<StopWorkflowRunResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  TagsToAdd: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagsToAdd: TagsMap }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export interface TestConnectionInput {
  ConnectionType: ConnectionType;
  ConnectionProperties: { [key: string]: string | undefined };
  AuthenticationConfiguration?: AuthenticationConfigurationInput;
}
export const TestConnectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionType: ConnectionType,
    ConnectionProperties: ConnectionProperties,
    AuthenticationConfiguration: S.optional(AuthenticationConfigurationInput),
  }),
).annotate({
  identifier: "TestConnectionInput",
}) as any as S.Schema<TestConnectionInput>;
export interface TestConnectionRequest {
  ConnectionName?: string;
  CatalogId?: string;
  TestConnectionInput?: TestConnectionInput;
}
export const TestConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionName: S.optional(S.String),
    CatalogId: S.optional(S.String),
    TestConnectionInput: S.optional(TestConnectionInput),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TestConnectionRequest",
}) as any as S.Schema<TestConnectionRequest>;
export interface TestConnectionResponse {}
export const TestConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TestConnectionResponse",
}) as any as S.Schema<TestConnectionResponse>;
export type TagKeysList = string[];
export const TagKeysList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagsToRemove: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagsToRemove: TagKeysList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateAssetRequest {
  Identifier: string;
  Name?: string;
  Description?: string;
  ClientToken?: string;
}
export const UpdateAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/assets/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAssetRequest",
}) as any as S.Schema<UpdateAssetRequest>;
export interface UpdateAssetResponse {
  Id: string;
  Name?: string;
  Description?: string;
  UpdatedAt?: Date;
}
export const UpdateAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "UpdateAssetResponse",
}) as any as S.Schema<UpdateAssetResponse>;
export interface UpdateBlueprintRequest {
  Name: string;
  Description?: string;
  BlueprintLocation: string;
}
export const UpdateBlueprintRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    BlueprintLocation: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateBlueprintRequest",
}) as any as S.Schema<UpdateBlueprintRequest>;
export interface UpdateBlueprintResponse {
  Name?: string;
}
export const UpdateBlueprintResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "UpdateBlueprintResponse",
}) as any as S.Schema<UpdateBlueprintResponse>;
export interface UpdateCatalogRequest {
  CatalogId: string;
  CatalogInput: CatalogInput;
}
export const UpdateCatalogRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CatalogId: S.String, CatalogInput: CatalogInput }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateCatalogRequest",
}) as any as S.Schema<UpdateCatalogRequest>;
export interface UpdateCatalogResponse {}
export const UpdateCatalogResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCatalogResponse",
}) as any as S.Schema<UpdateCatalogResponse>;
export interface UpdateGrokClassifierRequest {
  Name: string;
  Classification?: string;
  GrokPattern?: string;
  CustomPatterns?: string;
}
export const UpdateGrokClassifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Classification: S.optional(S.String),
    GrokPattern: S.optional(S.String),
    CustomPatterns: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateGrokClassifierRequest",
}) as any as S.Schema<UpdateGrokClassifierRequest>;
export interface UpdateXMLClassifierRequest {
  Name: string;
  Classification?: string;
  RowTag?: string;
}
export const UpdateXMLClassifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Classification: S.optional(S.String),
    RowTag: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateXMLClassifierRequest",
}) as any as S.Schema<UpdateXMLClassifierRequest>;
export interface UpdateJsonClassifierRequest {
  Name: string;
  JsonPath?: string;
}
export const UpdateJsonClassifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, JsonPath: S.optional(S.String) }),
).annotate({
  identifier: "UpdateJsonClassifierRequest",
}) as any as S.Schema<UpdateJsonClassifierRequest>;
export interface UpdateCsvClassifierRequest {
  Name: string;
  Delimiter?: string;
  QuoteSymbol?: string;
  ContainsHeader?: CsvHeaderOption;
  Header?: string[];
  DisableValueTrimming?: boolean;
  AllowSingleColumn?: boolean;
  CustomDatatypeConfigured?: boolean;
  CustomDatatypes?: string[];
  Serde?: CsvSerdeOption;
}
export const UpdateCsvClassifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Delimiter: S.optional(S.String),
    QuoteSymbol: S.optional(S.String),
    ContainsHeader: S.optional(CsvHeaderOption),
    Header: S.optional(CsvHeader),
    DisableValueTrimming: S.optional(S.Boolean),
    AllowSingleColumn: S.optional(S.Boolean),
    CustomDatatypeConfigured: S.optional(S.Boolean),
    CustomDatatypes: S.optional(CustomDatatypes),
    Serde: S.optional(CsvSerdeOption),
  }),
).annotate({
  identifier: "UpdateCsvClassifierRequest",
}) as any as S.Schema<UpdateCsvClassifierRequest>;
export interface UpdateClassifierRequest {
  GrokClassifier?: UpdateGrokClassifierRequest;
  XMLClassifier?: UpdateXMLClassifierRequest;
  JsonClassifier?: UpdateJsonClassifierRequest;
  CsvClassifier?: UpdateCsvClassifierRequest;
}
export const UpdateClassifierRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GrokClassifier: S.optional(UpdateGrokClassifierRequest),
    XMLClassifier: S.optional(UpdateXMLClassifierRequest),
    JsonClassifier: S.optional(UpdateJsonClassifierRequest),
    CsvClassifier: S.optional(UpdateCsvClassifierRequest),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateClassifierRequest",
}) as any as S.Schema<UpdateClassifierRequest>;
export interface UpdateClassifierResponse {}
export const UpdateClassifierResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateClassifierResponse",
}) as any as S.Schema<UpdateClassifierResponse>;
export type UpdateColumnStatisticsList = ColumnStatistics[];
export const UpdateColumnStatisticsList =
  /*@__PURE__*/ S.Array(ColumnStatistics);
export interface UpdateColumnStatisticsForPartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionValues: string[];
  ColumnStatisticsList: ColumnStatistics[];
}
export const UpdateColumnStatisticsForPartitionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CatalogId: S.optional(S.String),
      DatabaseName: S.String,
      TableName: S.String,
      PartitionValues: ValueStringList,
      ColumnStatisticsList: UpdateColumnStatisticsList,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "UpdateColumnStatisticsForPartitionRequest",
  }) as any as S.Schema<UpdateColumnStatisticsForPartitionRequest>;
export interface ColumnStatisticsError {
  ColumnStatistics?: ColumnStatistics;
  Error?: ErrorDetail;
}
export const ColumnStatisticsError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColumnStatistics: S.optional(ColumnStatistics),
    Error: S.optional(ErrorDetail),
  }),
).annotate({
  identifier: "ColumnStatisticsError",
}) as any as S.Schema<ColumnStatisticsError>;
export type ColumnStatisticsErrors = ColumnStatisticsError[];
export const ColumnStatisticsErrors = /*@__PURE__*/ S.Array(
  ColumnStatisticsError,
);
export interface UpdateColumnStatisticsForPartitionResponse {
  Errors?: ColumnStatisticsError[];
}
export const UpdateColumnStatisticsForPartitionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Errors: S.optional(ColumnStatisticsErrors) }),
  ).annotate({
    identifier: "UpdateColumnStatisticsForPartitionResponse",
  }) as any as S.Schema<UpdateColumnStatisticsForPartitionResponse>;
export interface UpdateColumnStatisticsForTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  ColumnStatisticsList: ColumnStatistics[];
}
export const UpdateColumnStatisticsForTableRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CatalogId: S.optional(S.String),
      DatabaseName: S.String,
      TableName: S.String,
      ColumnStatisticsList: UpdateColumnStatisticsList,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateColumnStatisticsForTableRequest",
}) as any as S.Schema<UpdateColumnStatisticsForTableRequest>;
export interface UpdateColumnStatisticsForTableResponse {
  Errors?: ColumnStatisticsError[];
}
export const UpdateColumnStatisticsForTableResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Errors: S.optional(ColumnStatisticsErrors) }),
).annotate({
  identifier: "UpdateColumnStatisticsForTableResponse",
}) as any as S.Schema<UpdateColumnStatisticsForTableResponse>;
export interface UpdateColumnStatisticsTaskSettingsRequest {
  DatabaseName: string;
  TableName: string;
  Role?: string;
  Schedule?: string;
  ColumnNameList?: string[];
  SampleSize?: number;
  CatalogID?: string;
  SecurityConfiguration?: string;
}
export const UpdateColumnStatisticsTaskSettingsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DatabaseName: S.String,
      TableName: S.String,
      Role: S.optional(S.String),
      Schedule: S.optional(S.String),
      ColumnNameList: S.optional(ColumnNameList),
      SampleSize: S.optional(S.Number),
      CatalogID: S.optional(S.String),
      SecurityConfiguration: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "UpdateColumnStatisticsTaskSettingsRequest",
  }) as any as S.Schema<UpdateColumnStatisticsTaskSettingsRequest>;
export interface UpdateColumnStatisticsTaskSettingsResponse {}
export const UpdateColumnStatisticsTaskSettingsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateColumnStatisticsTaskSettingsResponse",
  }) as any as S.Schema<UpdateColumnStatisticsTaskSettingsResponse>;
export interface UpdateConnectionRequest {
  CatalogId?: string;
  Name: string;
  ConnectionInput: ConnectionInput;
}
export const UpdateConnectionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Name: S.String,
    ConnectionInput: ConnectionInput,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateConnectionRequest",
}) as any as S.Schema<UpdateConnectionRequest>;
export interface UpdateConnectionResponse {}
export const UpdateConnectionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateConnectionResponse",
}) as any as S.Schema<UpdateConnectionResponse>;
export type DescriptionStringRemovable = string;
export interface UpdateCrawlerRequest {
  Name: string;
  Role?: string;
  DatabaseName?: string;
  Description?: string;
  Targets?: CrawlerTargets;
  Schedule?: string;
  Classifiers?: string[];
  TablePrefix?: string;
  SchemaChangePolicy?: SchemaChangePolicy;
  RecrawlPolicy?: RecrawlPolicy;
  LineageConfiguration?: LineageConfiguration;
  LakeFormationConfiguration?: LakeFormationConfiguration;
  Configuration?: string;
  CrawlerSecurityConfiguration?: string;
}
export const UpdateCrawlerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Role: S.optional(S.String),
    DatabaseName: S.optional(S.String),
    Description: S.optional(S.String),
    Targets: S.optional(CrawlerTargets),
    Schedule: S.optional(S.String),
    Classifiers: S.optional(ClassifierNameList),
    TablePrefix: S.optional(S.String),
    SchemaChangePolicy: S.optional(SchemaChangePolicy),
    RecrawlPolicy: S.optional(RecrawlPolicy),
    LineageConfiguration: S.optional(LineageConfiguration),
    LakeFormationConfiguration: S.optional(LakeFormationConfiguration),
    Configuration: S.optional(S.String),
    CrawlerSecurityConfiguration: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateCrawlerRequest",
}) as any as S.Schema<UpdateCrawlerRequest>;
export interface UpdateCrawlerResponse {}
export const UpdateCrawlerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCrawlerResponse",
}) as any as S.Schema<UpdateCrawlerResponse>;
export interface UpdateCrawlerScheduleRequest {
  CrawlerName: string;
  Schedule?: string;
}
export const UpdateCrawlerScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CrawlerName: S.String, Schedule: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateCrawlerScheduleRequest",
}) as any as S.Schema<UpdateCrawlerScheduleRequest>;
export interface UpdateCrawlerScheduleResponse {}
export const UpdateCrawlerScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCrawlerScheduleResponse",
}) as any as S.Schema<UpdateCrawlerScheduleResponse>;
export interface UpdateDatabaseRequest {
  CatalogId?: string;
  Name: string;
  DatabaseInput: DatabaseInput;
}
export const UpdateDatabaseRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    Name: S.String,
    DatabaseInput: DatabaseInput,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDatabaseRequest",
}) as any as S.Schema<UpdateDatabaseRequest>;
export interface UpdateDatabaseResponse {}
export const UpdateDatabaseResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDatabaseResponse",
}) as any as S.Schema<UpdateDatabaseResponse>;
export interface UpdateDataQualityRulesetRequest {
  Name: string;
  Description?: string;
  Ruleset?: string;
}
export const UpdateDataQualityRulesetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Ruleset: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDataQualityRulesetRequest",
}) as any as S.Schema<UpdateDataQualityRulesetRequest>;
export interface UpdateDataQualityRulesetResponse {
  Name?: string;
  Description?: string;
  Ruleset?: string;
}
export const UpdateDataQualityRulesetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Ruleset: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateDataQualityRulesetResponse",
}) as any as S.Schema<UpdateDataQualityRulesetResponse>;
export interface DevEndpointCustomLibraries {
  ExtraPythonLibsS3Path?: string;
  ExtraJarsS3Path?: string;
}
export const DevEndpointCustomLibraries = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExtraPythonLibsS3Path: S.optional(S.String),
    ExtraJarsS3Path: S.optional(S.String),
  }),
).annotate({
  identifier: "DevEndpointCustomLibraries",
}) as any as S.Schema<DevEndpointCustomLibraries>;
export interface UpdateDevEndpointRequest {
  EndpointName: string;
  PublicKey?: string;
  AddPublicKeys?: string[];
  DeletePublicKeys?: string[];
  CustomLibraries?: DevEndpointCustomLibraries;
  UpdateEtlLibraries?: boolean;
  DeleteArguments?: string[];
  AddArguments?: { [key: string]: string | undefined };
}
export const UpdateDevEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointName: S.String,
    PublicKey: S.optional(S.String),
    AddPublicKeys: S.optional(PublicKeysList),
    DeletePublicKeys: S.optional(PublicKeysList),
    CustomLibraries: S.optional(DevEndpointCustomLibraries),
    UpdateEtlLibraries: S.optional(S.Boolean),
    DeleteArguments: S.optional(StringList),
    AddArguments: S.optional(MapValue),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDevEndpointRequest",
}) as any as S.Schema<UpdateDevEndpointRequest>;
export interface UpdateDevEndpointResponse {}
export const UpdateDevEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDevEndpointResponse",
}) as any as S.Schema<UpdateDevEndpointResponse>;
export interface UpdateGlossaryRequest {
  Identifier: string;
  Name?: string;
  Description?: string;
  ClientToken?: string;
}
export const UpdateGlossaryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/glossaries/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGlossaryRequest",
}) as any as S.Schema<UpdateGlossaryRequest>;
export interface UpdateGlossaryResponse {
  Id?: string;
  Name?: string;
  Description?: string;
}
export const UpdateGlossaryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateGlossaryResponse",
}) as any as S.Schema<UpdateGlossaryResponse>;
export interface UpdateGlossaryTermRequest {
  Identifier: string;
  Name?: string;
  ShortDescription?: string;
  LongDescription?: string;
  ClientToken?: string;
}
export const UpdateGlossaryTermRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    Name: S.optional(S.String),
    ShortDescription: S.optional(S.String),
    LongDescription: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/glossary-terms/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGlossaryTermRequest",
}) as any as S.Schema<UpdateGlossaryTermRequest>;
export interface UpdateGlossaryTermResponse {
  Id?: string;
  GlossaryId?: string;
  Name?: string;
  ShortDescription?: string;
  LongDescription?: string;
}
export const UpdateGlossaryTermResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    GlossaryId: S.optional(S.String),
    Name: S.optional(S.String),
    ShortDescription: S.optional(S.String),
    LongDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateGlossaryTermResponse",
}) as any as S.Schema<UpdateGlossaryTermResponse>;
export interface UpdateGlueIdentityCenterConfigurationRequest {
  Scopes?: string[];
  UserBackgroundSessionsEnabled?: boolean;
}
export const UpdateGlueIdentityCenterConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Scopes: S.optional(IdentityCenterScopesList),
      UserBackgroundSessionsEnabled: S.optional(S.Boolean),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "UpdateGlueIdentityCenterConfigurationRequest",
  }) as any as S.Schema<UpdateGlueIdentityCenterConfigurationRequest>;
export interface UpdateGlueIdentityCenterConfigurationResponse {}
export const UpdateGlueIdentityCenterConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateGlueIdentityCenterConfigurationResponse",
  }) as any as S.Schema<UpdateGlueIdentityCenterConfigurationResponse>;
export interface UpdateIntegrationResourcePropertyRequest {
  ResourceArn: string;
  SourceProcessingProperties?: SourceProcessingProperties;
  TargetProcessingProperties?: TargetProcessingProperties;
}
export const UpdateIntegrationResourcePropertyRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceArn: S.String,
      SourceProcessingProperties: S.optional(SourceProcessingProperties),
      TargetProcessingProperties: S.optional(TargetProcessingProperties),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateIntegrationResourcePropertyRequest",
}) as any as S.Schema<UpdateIntegrationResourcePropertyRequest>;
export interface UpdateIntegrationResourcePropertyResponse {
  ResourceArn?: string;
  ResourcePropertyArn?: string;
  SourceProcessingProperties?: SourceProcessingProperties;
  TargetProcessingProperties?: TargetProcessingProperties;
}
export const UpdateIntegrationResourcePropertyResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ResourceArn: S.optional(S.String),
      ResourcePropertyArn: S.optional(S.String),
      SourceProcessingProperties: S.optional(SourceProcessingProperties),
      TargetProcessingProperties: S.optional(TargetProcessingProperties),
    }),
  ).annotate({
    identifier: "UpdateIntegrationResourcePropertyResponse",
  }) as any as S.Schema<UpdateIntegrationResourcePropertyResponse>;
export interface UpdateIntegrationTablePropertiesRequest {
  ResourceArn: string;
  TableName: string;
  SourceTableConfig?: SourceTableConfig;
  TargetTableConfig?: TargetTableConfig;
}
export const UpdateIntegrationTablePropertiesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ResourceArn: S.String,
      TableName: S.String,
      SourceTableConfig: S.optional(SourceTableConfig),
      TargetTableConfig: S.optional(TargetTableConfig),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateIntegrationTablePropertiesRequest",
}) as any as S.Schema<UpdateIntegrationTablePropertiesRequest>;
export interface UpdateIntegrationTablePropertiesResponse {}
export const UpdateIntegrationTablePropertiesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateIntegrationTablePropertiesResponse",
}) as any as S.Schema<UpdateIntegrationTablePropertiesResponse>;
export interface JobUpdate {
  JobMode?: JobMode;
  JobRunQueuingEnabled?: boolean;
  Description?: string;
  LogUri?: string;
  Role?: string;
  ExecutionProperty?: ExecutionProperty;
  Command?: JobCommand;
  DefaultArguments?: { [key: string]: string | undefined };
  NonOverridableArguments?: { [key: string]: string | undefined };
  Connections?: ConnectionsList;
  MaxRetries?: number;
  AllocatedCapacity?: number;
  Timeout?: number;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  SecurityConfiguration?: string;
  NotificationProperty?: NotificationProperty;
  GlueVersion?: string;
  CodeGenConfigurationNodes?: {
    [key: string]: CodeGenConfigurationNode | undefined;
  };
  ExecutionClass?: ExecutionClass;
  SourceControlDetails?: SourceControlDetails;
  MaintenanceWindow?: string;
}
export const JobUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobMode: S.optional(JobMode),
    JobRunQueuingEnabled: S.optional(S.Boolean),
    Description: S.optional(S.String),
    LogUri: S.optional(S.String),
    Role: S.optional(S.String),
    ExecutionProperty: S.optional(ExecutionProperty),
    Command: S.optional(JobCommand),
    DefaultArguments: S.optional(GenericMap),
    NonOverridableArguments: S.optional(GenericMap),
    Connections: S.optional(ConnectionsList),
    MaxRetries: S.optional(S.Number),
    AllocatedCapacity: S.optional(S.Number),
    Timeout: S.optional(S.Number),
    MaxCapacity: S.optional(S.Number),
    WorkerType: S.optional(WorkerType),
    NumberOfWorkers: S.optional(S.Number),
    SecurityConfiguration: S.optional(S.String),
    NotificationProperty: S.optional(NotificationProperty),
    GlueVersion: S.optional(S.String),
    CodeGenConfigurationNodes: S.optional(CodeGenConfigurationNodes),
    ExecutionClass: S.optional(ExecutionClass),
    SourceControlDetails: S.optional(SourceControlDetails),
    MaintenanceWindow: S.optional(S.String),
  }),
).annotate({ identifier: "JobUpdate" }) as any as S.Schema<JobUpdate>;
export interface UpdateJobRequest {
  JobName: string;
  JobUpdate: JobUpdate;
}
export const UpdateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobName: S.String, JobUpdate: JobUpdate }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateJobRequest",
}) as any as S.Schema<UpdateJobRequest>;
export interface UpdateJobResponse {
  JobName?: string;
}
export const UpdateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobName: S.optional(S.String) }),
).annotate({
  identifier: "UpdateJobResponse",
}) as any as S.Schema<UpdateJobResponse>;
export type CommitIdString = string;
export type AuthTokenString = string;
export interface UpdateJobFromSourceControlRequest {
  JobName?: string;
  Provider?: SourceControlProvider;
  RepositoryName?: string;
  RepositoryOwner?: string;
  BranchName?: string;
  Folder?: string;
  CommitId?: string;
  AuthStrategy?: SourceControlAuthStrategy;
  AuthToken?: string;
}
export const UpdateJobFromSourceControlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    Provider: S.optional(SourceControlProvider),
    RepositoryName: S.optional(S.String),
    RepositoryOwner: S.optional(S.String),
    BranchName: S.optional(S.String),
    Folder: S.optional(S.String),
    CommitId: S.optional(S.String),
    AuthStrategy: S.optional(SourceControlAuthStrategy),
    AuthToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateJobFromSourceControlRequest",
}) as any as S.Schema<UpdateJobFromSourceControlRequest>;
export interface UpdateJobFromSourceControlResponse {
  JobName?: string;
}
export const UpdateJobFromSourceControlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobName: S.optional(S.String) }),
).annotate({
  identifier: "UpdateJobFromSourceControlResponse",
}) as any as S.Schema<UpdateJobFromSourceControlResponse>;
export interface UpdateMLTransformRequest {
  TransformId: string;
  Name?: string;
  Description?: string;
  Parameters?: TransformParameters;
  Role?: string;
  GlueVersion?: string;
  MaxCapacity?: number;
  WorkerType?: WorkerType;
  NumberOfWorkers?: number;
  Timeout?: number;
  MaxRetries?: number;
}
export const UpdateMLTransformRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TransformId: S.String,
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Parameters: S.optional(TransformParameters),
    Role: S.optional(S.String),
    GlueVersion: S.optional(S.String),
    MaxCapacity: S.optional(S.Number),
    WorkerType: S.optional(WorkerType),
    NumberOfWorkers: S.optional(S.Number),
    Timeout: S.optional(S.Number),
    MaxRetries: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateMLTransformRequest",
}) as any as S.Schema<UpdateMLTransformRequest>;
export interface UpdateMLTransformResponse {
  TransformId?: string;
}
export const UpdateMLTransformResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransformId: S.optional(S.String) }),
).annotate({
  identifier: "UpdateMLTransformResponse",
}) as any as S.Schema<UpdateMLTransformResponse>;
export interface UpdatePartitionRequest {
  CatalogId?: string;
  DatabaseName: string;
  TableName: string;
  PartitionValueList: string[];
  PartitionInput: PartitionInput;
}
export const UpdatePartitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    TableName: S.String,
    PartitionValueList: BoundedPartitionValueList,
    PartitionInput: PartitionInput,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePartitionRequest",
}) as any as S.Schema<UpdatePartitionRequest>;
export interface UpdatePartitionResponse {}
export const UpdatePartitionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePartitionResponse",
}) as any as S.Schema<UpdatePartitionResponse>;
export interface UpdateRegistryInput {
  RegistryId: RegistryId;
  Description: string;
}
export const UpdateRegistryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegistryId: RegistryId, Description: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateRegistryInput",
}) as any as S.Schema<UpdateRegistryInput>;
export interface UpdateRegistryResponse {
  RegistryName?: string;
  RegistryArn?: string;
}
export const UpdateRegistryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistryName: S.optional(S.String),
    RegistryArn: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateRegistryResponse",
}) as any as S.Schema<UpdateRegistryResponse>;
export interface UpdateSchemaInput {
  SchemaId: SchemaId;
  SchemaVersionNumber?: SchemaVersionNumber;
  Compatibility?: Compatibility;
  Description?: string;
}
export const UpdateSchemaInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaId: SchemaId,
    SchemaVersionNumber: S.optional(SchemaVersionNumber),
    Compatibility: S.optional(Compatibility),
    Description: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSchemaInput",
}) as any as S.Schema<UpdateSchemaInput>;
export interface UpdateSchemaResponse {
  SchemaArn?: string;
  SchemaName?: string;
  RegistryName?: string;
}
export const UpdateSchemaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SchemaArn: S.optional(S.String),
    SchemaName: S.optional(S.String),
    RegistryName: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateSchemaResponse",
}) as any as S.Schema<UpdateSchemaResponse>;
export interface UpdateSourceControlFromJobRequest {
  JobName?: string;
  Provider?: SourceControlProvider;
  RepositoryName?: string;
  RepositoryOwner?: string;
  BranchName?: string;
  Folder?: string;
  CommitId?: string;
  AuthStrategy?: SourceControlAuthStrategy;
  AuthToken?: string;
}
export const UpdateSourceControlFromJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    Provider: S.optional(SourceControlProvider),
    RepositoryName: S.optional(S.String),
    RepositoryOwner: S.optional(S.String),
    BranchName: S.optional(S.String),
    Folder: S.optional(S.String),
    CommitId: S.optional(S.String),
    AuthStrategy: S.optional(SourceControlAuthStrategy),
    AuthToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSourceControlFromJobRequest",
}) as any as S.Schema<UpdateSourceControlFromJobRequest>;
export interface UpdateSourceControlFromJobResponse {
  JobName?: string;
}
export const UpdateSourceControlFromJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobName: S.optional(S.String) }),
).annotate({
  identifier: "UpdateSourceControlFromJobResponse",
}) as any as S.Schema<UpdateSourceControlFromJobResponse>;
export type ViewUpdateAction =
  | "ADD"
  | "REPLACE"
  | "ADD_OR_REPLACE"
  | "DROP"
  | (string & {});
export const ViewUpdateAction = /*@__PURE__*/ S.String;

export type IcebergUpdateAction =
  | "add-schema"
  | "set-current-schema"
  | "add-spec"
  | "set-default-spec"
  | "add-sort-order"
  | "set-default-sort-order"
  | "set-location"
  | "set-properties"
  | "remove-properties"
  | "add-encryption-key"
  | "remove-encryption-key"
  | (string & {});
export const IcebergUpdateAction = /*@__PURE__*/ S.String;

export type EncryptionKeyIdString = string;
export type EncryptedKeyMetadataString = string;
export interface IcebergEncryptedKey {
  KeyId: string;
  EncryptedKeyMetadata: string;
  EncryptedById?: string;
  Properties?: { [key: string]: string | undefined };
}
export const IcebergEncryptedKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyId: S.String,
    EncryptedKeyMetadata: S.String,
    EncryptedById: S.optional(S.String),
    Properties: S.optional(StringToStringMap),
  }),
).annotate({
  identifier: "IcebergEncryptedKey",
}) as any as S.Schema<IcebergEncryptedKey>;
export interface IcebergTableUpdate {
  Schema: IcebergSchema;
  PartitionSpec?: IcebergPartitionSpec;
  SortOrder?: IcebergSortOrder;
  Location: string;
  Properties?: { [key: string]: string | undefined };
  Action?: IcebergUpdateAction;
  EncryptionKey?: IcebergEncryptedKey;
  KeyId?: string;
}
export const IcebergTableUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Schema: IcebergSchema,
    PartitionSpec: S.optional(IcebergPartitionSpec),
    SortOrder: S.optional(IcebergSortOrder),
    Location: S.String,
    Properties: S.optional(StringToStringMap),
    Action: S.optional(IcebergUpdateAction),
    EncryptionKey: S.optional(IcebergEncryptedKey),
    KeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "IcebergTableUpdate",
}) as any as S.Schema<IcebergTableUpdate>;
export type IcebergTableUpdateList = IcebergTableUpdate[];
export const IcebergTableUpdateList = /*@__PURE__*/ S.Array(IcebergTableUpdate);
export interface UpdateIcebergTableInput {
  Updates: IcebergTableUpdate[];
}
export const UpdateIcebergTableInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Updates: IcebergTableUpdateList }),
).annotate({
  identifier: "UpdateIcebergTableInput",
}) as any as S.Schema<UpdateIcebergTableInput>;
export interface UpdateIcebergInput {
  UpdateIcebergTableInput: UpdateIcebergTableInput;
}
export const UpdateIcebergInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UpdateIcebergTableInput: UpdateIcebergTableInput }),
).annotate({
  identifier: "UpdateIcebergInput",
}) as any as S.Schema<UpdateIcebergInput>;
export interface UpdateOpenTableFormatInput {
  UpdateIcebergInput?: UpdateIcebergInput;
}
export const UpdateOpenTableFormatInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ UpdateIcebergInput: S.optional(UpdateIcebergInput) }),
).annotate({
  identifier: "UpdateOpenTableFormatInput",
}) as any as S.Schema<UpdateOpenTableFormatInput>;
export interface UpdateTableRequest {
  CatalogId?: string;
  DatabaseName: string;
  Name?: string;
  TableInput?: TableInput;
  SkipArchive?: boolean;
  TransactionId?: string;
  VersionId?: string;
  ViewUpdateAction?: ViewUpdateAction;
  Force?: boolean;
  UpdateOpenTableFormatInput?: UpdateOpenTableFormatInput;
}
export const UpdateTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    Name: S.optional(S.String),
    TableInput: S.optional(TableInput),
    SkipArchive: S.optional(S.Boolean),
    TransactionId: S.optional(S.String),
    VersionId: S.optional(S.String),
    ViewUpdateAction: S.optional(ViewUpdateAction),
    Force: S.optional(S.Boolean),
    UpdateOpenTableFormatInput: S.optional(UpdateOpenTableFormatInput),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateTableRequest",
}) as any as S.Schema<UpdateTableRequest>;
export interface UpdateTableResponse {}
export const UpdateTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTableResponse",
}) as any as S.Schema<UpdateTableResponse>;
export interface UpdateTableOptimizerRequest {
  CatalogId: string;
  DatabaseName: string;
  TableName: string;
  Type: TableOptimizerType;
  TableOptimizerConfiguration: TableOptimizerConfiguration;
}
export const UpdateTableOptimizerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.String,
    DatabaseName: S.String,
    TableName: S.String,
    Type: TableOptimizerType,
    TableOptimizerConfiguration: TableOptimizerConfiguration,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateTableOptimizerRequest",
}) as any as S.Schema<UpdateTableOptimizerRequest>;
export interface UpdateTableOptimizerResponse {}
export const UpdateTableOptimizerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateTableOptimizerResponse",
}) as any as S.Schema<UpdateTableOptimizerResponse>;
export interface TriggerUpdate {
  Name?: string;
  Description?: string;
  Schedule?: string;
  Actions?: Action[];
  Predicate?: Predicate;
  EventBatchingCondition?: EventBatchingCondition;
}
export const TriggerUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Schedule: S.optional(S.String),
    Actions: S.optional(ActionList),
    Predicate: S.optional(Predicate),
    EventBatchingCondition: S.optional(EventBatchingCondition),
  }),
).annotate({ identifier: "TriggerUpdate" }) as any as S.Schema<TriggerUpdate>;
export interface UpdateTriggerRequest {
  Name: string;
  TriggerUpdate: TriggerUpdate;
}
export const UpdateTriggerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, TriggerUpdate: TriggerUpdate }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateTriggerRequest",
}) as any as S.Schema<UpdateTriggerRequest>;
export interface UpdateTriggerResponse {
  Trigger?: Trigger;
}
export const UpdateTriggerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Trigger: S.optional(Trigger) }),
).annotate({
  identifier: "UpdateTriggerResponse",
}) as any as S.Schema<UpdateTriggerResponse>;
export interface UpdateUsageProfileRequest {
  Name: string;
  Description?: string;
  Configuration: ProfileConfiguration;
}
export const UpdateUsageProfileRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Configuration: ProfileConfiguration,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateUsageProfileRequest",
}) as any as S.Schema<UpdateUsageProfileRequest>;
export interface UpdateUsageProfileResponse {
  Name?: string;
}
export const UpdateUsageProfileResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "UpdateUsageProfileResponse",
}) as any as S.Schema<UpdateUsageProfileResponse>;
export interface UpdateUserDefinedFunctionRequest {
  CatalogId?: string;
  DatabaseName: string;
  FunctionName: string;
  FunctionInput: UserDefinedFunctionInput;
}
export const UpdateUserDefinedFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogId: S.optional(S.String),
    DatabaseName: S.String,
    FunctionName: S.String,
    FunctionInput: UserDefinedFunctionInput,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateUserDefinedFunctionRequest",
}) as any as S.Schema<UpdateUserDefinedFunctionRequest>;
export interface UpdateUserDefinedFunctionResponse {}
export const UpdateUserDefinedFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateUserDefinedFunctionResponse",
}) as any as S.Schema<UpdateUserDefinedFunctionResponse>;
export interface UpdateWorkflowRequest {
  Name: string;
  Description?: string;
  DefaultRunProperties?: { [key: string]: string | undefined };
  MaxConcurrentRuns?: number;
}
export const UpdateWorkflowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    DefaultRunProperties: S.optional(WorkflowRunProperties),
    MaxConcurrentRuns: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateWorkflowRequest",
}) as any as S.Schema<UpdateWorkflowRequest>;
export interface UpdateWorkflowResponse {
  Name?: string;
}
export const UpdateWorkflowResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "UpdateWorkflowResponse",
}) as any as S.Schema<UpdateWorkflowResponse>;
export type FederationSourceErrorCode =
  | "AccessDeniedException"
  | "EntityNotFoundException"
  | "InvalidCredentialsException"
  | "InvalidInputException"
  | "InvalidResponseException"
  | "OperationTimeoutException"
  | "OperationNotSupportedException"
  | "InternalServiceException"
  | "PartialFailureException"
  | "ThrottlingException"
  | (string & {});
export const FederationSourceErrorCode = /*@__PURE__*/ S.String;

export type IntegrationErrorMessage = string;
export type AssociateGlossaryTermsError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates one or more glossary terms with an asset in Glue Data Catalog.
 */
export const associateGlossaryTerms: API.OperationMethod<
  AssociateGlossaryTermsRequest,
  AssociateGlossaryTermsResponse,
  AssociateGlossaryTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateGlossaryTermsRequest,
  output: AssociateGlossaryTermsResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateGlossaryTerms",
}));

export type BatchCreatePartitionError =
  | AlreadyExistsException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates one or more partitions in a batch operation.
 */
export const batchCreatePartition: API.OperationMethod<
  BatchCreatePartitionRequest,
  BatchCreatePartitionResponse,
  BatchCreatePartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchCreatePartitionRequest,
  output: BatchCreatePartitionResponse,
  errors: [
    AlreadyExistsException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreatePartition",
}));

export type BatchDeleteConnectionError =
  | InternalServiceException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a list of connection definitions from the Data Catalog.
 */
export const batchDeleteConnection: API.OperationMethod<
  BatchDeleteConnectionRequest,
  BatchDeleteConnectionResponse,
  BatchDeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteConnectionRequest,
  output: BatchDeleteConnectionResponse,
  errors: [InternalServiceException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteConnection",
}));

export type BatchDeletePartitionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes one or more partitions in a batch operation.
 */
export const batchDeletePartition: API.OperationMethod<
  BatchDeletePartitionRequest,
  BatchDeletePartitionResponse,
  BatchDeletePartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeletePartitionRequest,
  output: BatchDeletePartitionResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeletePartition",
}));

export type BatchDeleteTableError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | CommonErrors;
/**
 * Deletes multiple tables at once.
 *
 * After completing this operation, you no longer have access to the table versions and
 * partitions that belong to the deleted table. Glue deletes these "orphaned" resources
 * asynchronously in a timely manner, at the discretion of the service.
 *
 * To ensure the immediate deletion of all related resources, before calling
 * `BatchDeleteTable`, use `DeleteTableVersion` or
 * `BatchDeleteTableVersion`, and `DeletePartition` or
 * `BatchDeletePartition`, to delete any resources that belong to the
 * table.
 */
export const batchDeleteTable: API.OperationMethod<
  BatchDeleteTableRequest,
  BatchDeleteTableResponse,
  BatchDeleteTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteTableRequest,
  output: BatchDeleteTableResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteTable",
}));

export type BatchDeleteTableVersionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified batch of versions of a table.
 */
export const batchDeleteTableVersion: API.OperationMethod<
  BatchDeleteTableVersionRequest,
  BatchDeleteTableVersionResponse,
  BatchDeleteTableVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteTableVersionRequest,
  output: BatchDeleteTableVersionResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteTableVersion",
}));

export type BatchGetBlueprintsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves information about a list of blueprints.
 */
export const batchGetBlueprints: API.OperationMethod<
  BatchGetBlueprintsRequest,
  BatchGetBlueprintsResponse,
  BatchGetBlueprintsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetBlueprintsRequest,
  output: BatchGetBlueprintsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetBlueprints",
}));

export type BatchGetCrawlersError =
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a list of resource metadata for a given list of crawler names. After calling the `ListCrawlers` operation, you can call this operation to access the data to which you have been granted permissions. This operation supports all IAM permissions, including permission conditions that uses tags.
 */
export const batchGetCrawlers: API.OperationMethod<
  BatchGetCrawlersRequest,
  BatchGetCrawlersResponse,
  BatchGetCrawlersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetCrawlersRequest,
  output: BatchGetCrawlersResponse,
  errors: [InvalidInputException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCrawlers",
}));

export type BatchGetCustomEntityTypesError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the details for the custom patterns specified by a list of names.
 */
export const batchGetCustomEntityTypes: API.OperationMethod<
  BatchGetCustomEntityTypesRequest,
  BatchGetCustomEntityTypesResponse,
  BatchGetCustomEntityTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetCustomEntityTypesRequest,
  output: BatchGetCustomEntityTypesResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetCustomEntityTypes",
}));

export type BatchGetDataQualityResultError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a list of data quality results for the specified result IDs.
 */
export const batchGetDataQualityResult: API.OperationMethod<
  BatchGetDataQualityResultRequest,
  BatchGetDataQualityResultResponse,
  BatchGetDataQualityResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetDataQualityResultRequest,
  output: BatchGetDataQualityResultResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDataQualityResult",
}));

export type BatchGetDevEndpointsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a list of resource metadata for a given list of development endpoint names. After
 * calling the `ListDevEndpoints` operation, you can call this operation to access the
 * data to which you have been granted permissions. This operation supports all IAM permissions,
 * including permission conditions that uses tags.
 */
export const batchGetDevEndpoints: API.OperationMethod<
  BatchGetDevEndpointsRequest,
  BatchGetDevEndpointsResponse,
  BatchGetDevEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetDevEndpointsRequest,
  output: BatchGetDevEndpointsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetDevEndpoints",
}));

export type BatchGetIterableFormsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves multiple items from an iterable form on an asset in Glue Data Catalog in a single request.
 */
export const batchGetIterableForms: API.OperationMethod<
  BatchGetIterableFormsRequest,
  BatchGetIterableFormsResponse,
  BatchGetIterableFormsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetIterableFormsRequest,
  output: BatchGetIterableFormsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetIterableForms",
}));

export type BatchGetJobsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a list of resource metadata for a given list of job names. After calling the `ListJobs` operation, you can call this operation to access the data to which you have been granted permissions. This operation supports all IAM permissions, including permission conditions that uses tags.
 */
export const batchGetJobs: API.OperationMethod<
  BatchGetJobsRequest,
  BatchGetJobsResponse,
  BatchGetJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetJobsRequest,
  output: BatchGetJobsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetJobs",
}));

export type BatchGetPartitionError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | InvalidStateException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves partitions in a batch request.
 */
export const batchGetPartition: API.OperationMethod<
  BatchGetPartitionRequest,
  BatchGetPartitionResponse,
  BatchGetPartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetPartitionRequest,
  output: BatchGetPartitionResponse,
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    InvalidStateException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPartition",
}));

export type BatchGetTableOptimizerError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the configuration for the specified table optimizers.
 */
export const batchGetTableOptimizer: API.OperationMethod<
  BatchGetTableOptimizerRequest,
  BatchGetTableOptimizerResponse,
  BatchGetTableOptimizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetTableOptimizerRequest,
  output: BatchGetTableOptimizerResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTableOptimizer",
}));

export type BatchGetTriggersError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a list of resource metadata for a given list of trigger names. After calling the `ListTriggers` operation, you can call this operation to access the data to which you have been granted permissions. This operation supports all IAM permissions, including permission conditions that uses tags.
 */
export const batchGetTriggers: API.OperationMethod<
  BatchGetTriggersRequest,
  BatchGetTriggersResponse,
  BatchGetTriggersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetTriggersRequest,
  output: BatchGetTriggersResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTriggers",
}));

export type BatchGetWorkflowsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a list of resource metadata for a given list of workflow names. After calling the `ListWorkflows` operation, you can call this operation to access the data to which you have been granted permissions. This operation supports all IAM permissions, including permission conditions that uses tags.
 */
export const batchGetWorkflows: API.OperationMethod<
  BatchGetWorkflowsRequest,
  BatchGetWorkflowsResponse,
  BatchGetWorkflowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetWorkflowsRequest,
  output: BatchGetWorkflowsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetWorkflows",
}));

export type BatchPutDataQualityStatisticAnnotationError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Annotate datapoints over time for a specific data quality statistic.
 * The API requires both profileID and statisticID as part of the InclusionAnnotation input.
 * The API only works for a single statisticId across multiple profiles.
 */
export const batchPutDataQualityStatisticAnnotation: API.OperationMethod<
  BatchPutDataQualityStatisticAnnotationRequest,
  BatchPutDataQualityStatisticAnnotationResponse,
  BatchPutDataQualityStatisticAnnotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchPutDataQualityStatisticAnnotationRequest,
  output: BatchPutDataQualityStatisticAnnotationResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutDataQualityStatisticAnnotation",
}));

export type BatchStopJobRunError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops one or more job runs for a specified job definition.
 */
export const batchStopJobRun: API.OperationMethod<
  BatchStopJobRunRequest,
  BatchStopJobRunResponse,
  BatchStopJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchStopJobRunRequest,
  output: BatchStopJobRunResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStopJobRun",
}));

export type BatchUpdatePartitionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates one or more partitions in a batch operation.
 */
export const batchUpdatePartition: API.OperationMethod<
  BatchUpdatePartitionRequest,
  BatchUpdatePartitionResponse,
  BatchUpdatePartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdatePartitionRequest,
  output: BatchUpdatePartitionResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdatePartition",
}));

export type CancelDataQualityRuleRecommendationRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Cancels the specified recommendation run that was being used to generate rules.
 */
export const cancelDataQualityRuleRecommendationRun: API.OperationMethod<
  CancelDataQualityRuleRecommendationRunRequest,
  CancelDataQualityRuleRecommendationRunResponse,
  CancelDataQualityRuleRecommendationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelDataQualityRuleRecommendationRunRequest,
  output: CancelDataQualityRuleRecommendationRunResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDataQualityRuleRecommendationRun",
}));

export type CancelDataQualityRulesetEvaluationRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Cancels a run where a ruleset is being evaluated against a data source.
 */
export const cancelDataQualityRulesetEvaluationRun: API.OperationMethod<
  CancelDataQualityRulesetEvaluationRunRequest,
  CancelDataQualityRulesetEvaluationRunResponse,
  CancelDataQualityRulesetEvaluationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelDataQualityRulesetEvaluationRunRequest,
  output: CancelDataQualityRulesetEvaluationRunResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelDataQualityRulesetEvaluationRun",
}));

export type CancelMLTaskRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Cancels (stops) a task run. Machine learning task runs are asynchronous tasks that Glue runs on your behalf as part of various machine learning workflows. You can cancel a
 * machine learning task run at any time by calling `CancelMLTaskRun` with a task
 * run's parent transform's `TransformID` and the task run's `TaskRunId`.
 */
export const cancelMLTaskRun: API.OperationMethod<
  CancelMLTaskRunRequest,
  CancelMLTaskRunResponse,
  CancelMLTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelMLTaskRunRequest,
  output: CancelMLTaskRunResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelMLTaskRun",
}));

export type CancelStatementError =
  | AccessDeniedException
  | EntityNotFoundException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Cancels the statement.
 */
export const cancelStatement: API.OperationMethod<
  CancelStatementRequest,
  CancelStatementResponse,
  CancelStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelStatementRequest,
  output: CancelStatementResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelStatement",
}));

export type CheckSchemaVersionValidityError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Validates the supplied schema. This call has no side effects, it simply validates using the supplied schema using `DataFormat` as the format. Since it does not take a schema set name, no compatibility checks are performed.
 */
export const checkSchemaVersionValidity: API.OperationMethod<
  CheckSchemaVersionValidityInput,
  CheckSchemaVersionValidityResponse,
  CheckSchemaVersionValidityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CheckSchemaVersionValidityInput,
  output: CheckSchemaVersionValidityResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CheckSchemaVersionValidity",
}));

export type CreateBlueprintError =
  | AlreadyExistsException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Registers a blueprint with Glue.
 */
export const createBlueprint: API.OperationMethod<
  CreateBlueprintRequest,
  CreateBlueprintResponse,
  CreateBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBlueprintRequest,
  output: CreateBlueprintResponse,
  errors: [
    AlreadyExistsException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBlueprint",
}));

export type CreateCatalogError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederatedResourceAlreadyExistsException
  | FederationSourceException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new catalog in the Glue Data Catalog.
 */
export const createCatalog: API.OperationMethod<
  CreateCatalogRequest,
  CreateCatalogResponse,
  CreateCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCatalogRequest,
  output: CreateCatalogResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    FederatedResourceAlreadyExistsException,
    FederationSourceException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCatalog",
}));

export type CreateClassifierError =
  | AlreadyExistsException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Creates a classifier in the user's account. This can be a `GrokClassifier`, an
 * `XMLClassifier`, a `JsonClassifier`, or a `CsvClassifier`,
 * depending on which field of the request is present.
 */
export const createClassifier: API.OperationMethod<
  CreateClassifierRequest,
  CreateClassifierResponse,
  CreateClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClassifierRequest,
  output: CreateClassifierResponse,
  errors: [
    AlreadyExistsException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateClassifier",
}));

export type CreateColumnStatisticsTaskSettingsError =
  | AccessDeniedException
  | AlreadyExistsException
  | ColumnStatisticsTaskRunningException
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates settings for a column statistics task.
 */
export const createColumnStatisticsTaskSettings: API.OperationMethod<
  CreateColumnStatisticsTaskSettingsRequest,
  CreateColumnStatisticsTaskSettingsResponse,
  CreateColumnStatisticsTaskSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateColumnStatisticsTaskSettingsRequest,
  output: CreateColumnStatisticsTaskSettingsResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ColumnStatisticsTaskRunningException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateColumnStatisticsTaskSettings",
}));

export type CreateConnectionError =
  | AlreadyExistsException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a connection definition in the Data Catalog.
 *
 * Connections used for creating federated resources require the IAM `glue:PassConnection` permission.
 */
export const createConnection: API.OperationMethod<
  CreateConnectionRequest,
  CreateConnectionResponse,
  CreateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConnectionRequest,
  output: CreateConnectionResponse,
  errors: [
    AlreadyExistsException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConnection",
}));

export type CreateCrawlerError =
  | AlreadyExistsException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | GlueRoleNotAssumable
  | GlueS3TargetNotReady
  | CommonErrors;
/**
 * Creates a new crawler with specified targets, role, configuration, and optional schedule.
 * At least one crawl target must be specified, in the `s3Targets` field, the
 * `jdbcTargets` field, or the `DynamoDBTargets` field.
 */
export const createCrawler: API.OperationMethod<
  CreateCrawlerRequest,
  CreateCrawlerResponse,
  CreateCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCrawlerRequest,
  output: CreateCrawlerResponse,
  errors: [
    AlreadyExistsException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    GlueRoleNotAssumable,
    GlueS3TargetNotReady,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCrawler",
}));

export type CreateCustomEntityTypeError =
  | AccessDeniedException
  | AlreadyExistsException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a custom pattern that is used to detect sensitive data across the columns and rows of your structured data.
 *
 * Each custom pattern you create specifies a regular expression and an optional list of context words. If no context words are passed only a regular expression is checked.
 */
export const createCustomEntityType: API.OperationMethod<
  CreateCustomEntityTypeRequest,
  CreateCustomEntityTypeResponse,
  CreateCustomEntityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomEntityTypeRequest,
  output: CreateCustomEntityTypeResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomEntityType",
}));

export type CreateDatabaseError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | FederatedResourceAlreadyExistsException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new database in a Data Catalog.
 */
export const createDatabase: API.OperationMethod<
  CreateDatabaseRequest,
  CreateDatabaseResponse,
  CreateDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatabaseRequest,
  output: CreateDatabaseResponse,
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    FederatedResourceAlreadyExistsException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatabase",
}));

export type CreateDataQualityRulesetError =
  | AlreadyExistsException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a data quality ruleset with DQDL rules applied to a specified Glue table.
 *
 * You create the ruleset using the Data Quality Definition Language (DQDL). For more information, see the Glue developer guide.
 */
export const createDataQualityRuleset: API.OperationMethod<
  CreateDataQualityRulesetRequest,
  CreateDataQualityRulesetResponse,
  CreateDataQualityRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataQualityRulesetRequest,
  output: CreateDataQualityRulesetResponse,
  errors: [
    AlreadyExistsException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataQualityRuleset",
}));

export type CreateDevEndpointError =
  | AccessDeniedException
  | AlreadyExistsException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new development endpoint.
 */
export const createDevEndpoint: API.OperationMethod<
  CreateDevEndpointRequest,
  CreateDevEndpointResponse,
  CreateDevEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDevEndpointRequest,
  output: CreateDevEndpointResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDevEndpoint",
}));

export type CreateGlossaryError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a business glossary in Glue Data Catalog. A glossary is a container for glossary terms that define business concepts.
 */
export const createGlossary: API.OperationMethod<
  CreateGlossaryRequest,
  CreateGlossaryResponse,
  CreateGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGlossaryRequest,
  output: CreateGlossaryResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlossary",
}));

export type CreateGlossaryTermError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a glossary term within a business glossary in Glue Data Catalog.
 */
export const createGlossaryTerm: API.OperationMethod<
  CreateGlossaryTermRequest,
  CreateGlossaryTermResponse,
  CreateGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGlossaryTermRequest,
  output: CreateGlossaryTermResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlossaryTerm",
}));

export type CreateGlueIdentityCenterConfigurationError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Creates a new Glue Identity Center configuration to enable integration between Glue and Amazon Web Services IAM
 * Identity Center for authentication and authorization.
 */
export const createGlueIdentityCenterConfiguration: API.OperationMethod<
  CreateGlueIdentityCenterConfigurationRequest,
  CreateGlueIdentityCenterConfigurationResponse,
  CreateGlueIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGlueIdentityCenterConfigurationRequest,
  output: CreateGlueIdentityCenterConfigurationResponse,
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
  operationName: "CreateGlueIdentityCenterConfiguration",
}));

export type CreateIntegrationError =
  | AccessDeniedException
  | ConflictException
  | EntityNotFoundException
  | IntegrationConflictOperationFault
  | IntegrationQuotaExceededFault
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | KMSKeyNotAccessibleFault
  | ResourceNotFoundException
  | ResourceNumberLimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Zero-ETL integration in the caller's account between two resources with Amazon Resource Names (ARNs): the `SourceArn` and `TargetArn`.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationRequest,
  CreateIntegrationResponse,
  CreateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIntegrationRequest,
  output: CreateIntegrationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    EntityNotFoundException,
    IntegrationConflictOperationFault,
    IntegrationQuotaExceededFault,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    KMSKeyNotAccessibleFault,
    ResourceNotFoundException,
    ResourceNumberLimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegration",
}));

export type CreateIntegrationResourcePropertyError =
  | AccessDeniedException
  | ConflictException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API can be used for setting up the `ResourceProperty` of the Glue connection (for the source) or Glue database ARN (for the target). These properties can include the role to access the connection or database. To set both source and target properties the same API needs to be invoked with the Glue connection ARN as `ResourceArn` with `SourceProcessingProperties` and the Glue database ARN as `ResourceArn` with `TargetProcessingProperties` respectively.
 */
export const createIntegrationResourceProperty: API.OperationMethod<
  CreateIntegrationResourcePropertyRequest,
  CreateIntegrationResourcePropertyResponse,
  CreateIntegrationResourcePropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIntegrationResourcePropertyRequest,
  output: CreateIntegrationResourcePropertyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegrationResourceProperty",
}));

export type CreateIntegrationTablePropertiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API is used to provide optional override properties for the the tables that need to be replicated. These properties can include properties for filtering and partitioning for the source and target tables. To set both source and target properties the same API need to be invoked with the Glue connection ARN as `ResourceArn` with `SourceTableConfig`, and the Glue database ARN as `ResourceArn` with `TargetTableConfig` respectively.
 */
export const createIntegrationTableProperties: API.OperationMethod<
  CreateIntegrationTablePropertiesRequest,
  CreateIntegrationTablePropertiesResponse,
  CreateIntegrationTablePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIntegrationTablePropertiesRequest,
  output: CreateIntegrationTablePropertiesResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntegrationTableProperties",
}));

export type CreateJobError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | GlueRoleNotAssumable
  | CommonErrors;
/**
 * Creates a new job definition.
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJobRequest,
  output: CreateJobResponse,
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    GlueRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
}));

export type CreateMLTransformError =
  | AccessDeniedException
  | AlreadyExistsException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates an Glue machine learning transform. This operation creates the transform and
 * all the necessary parameters to train it.
 *
 * Call this operation as the first step in the process of using a machine learning transform
 * (such as the `FindMatches` transform) for deduplicating data. You can provide an
 * optional `Description`, in addition to the parameters that you want to use for your
 * algorithm.
 *
 * You must also specify certain parameters for the tasks that Glue runs on your
 * behalf as part of learning from your data and creating a high-quality machine learning
 * transform. These parameters include `Role`, and optionally,
 * `AllocatedCapacity`, `Timeout`, and `MaxRetries`. For more
 * information, see Jobs.
 */
export const createMLTransform: API.OperationMethod<
  CreateMLTransformRequest,
  CreateMLTransformResponse,
  CreateMLTransformError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMLTransformRequest,
  output: CreateMLTransformResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMLTransform",
}));

export type CreatePartitionError =
  | AlreadyExistsException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new partition.
 */
export const createPartition: API.OperationMethod<
  CreatePartitionRequest,
  CreatePartitionResponse,
  CreatePartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePartitionRequest,
  output: CreatePartitionResponse,
  errors: [
    AlreadyExistsException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePartition",
}));

export type CreatePartitionIndexError =
  | AlreadyExistsException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a specified partition index in an existing table.
 */
export const createPartitionIndex: API.OperationMethod<
  CreatePartitionIndexRequest,
  CreatePartitionIndexResponse,
  CreatePartitionIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePartitionIndexRequest,
  output: CreatePartitionIndexResponse,
  errors: [
    AlreadyExistsException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePartitionIndex",
}));

export type CreateRegistryError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new registry which may be used to hold a collection of schemas.
 */
export const createRegistry: API.OperationMethod<
  CreateRegistryInput,
  CreateRegistryResponse,
  CreateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRegistryInput,
  output: CreateRegistryResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegistry",
}));

export type CreateSchemaError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new schema set and registers the schema definition. Returns an error if the schema set already exists without actually registering the version.
 *
 * When the schema set is created, a version checkpoint will be set to the first version. Compatibility mode "DISABLED" restricts any additional schema versions from being added after the first schema version. For all other compatibility modes, validation of compatibility settings will be applied only from the second version onwards when the `RegisterSchemaVersion` API is used.
 *
 * When this API is called without a `RegistryId`, this will create an entry for a "default-registry" in the registry database tables, if it is not already present.
 */
export const createSchema: API.OperationMethod<
  CreateSchemaInput,
  CreateSchemaResponse,
  CreateSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSchemaInput,
  output: CreateSchemaResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchema",
}));

export type CreateScriptError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Transforms a directed acyclic graph (DAG) into code.
 */
export const createScript: API.OperationMethod<
  CreateScriptRequest,
  CreateScriptResponse,
  CreateScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateScriptRequest,
  output: CreateScriptResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScript",
}));

export type CreateSecurityConfigurationError =
  | AlreadyExistsException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new security configuration. A security configuration is a set of security properties that can be used by Glue. You can use a security configuration to encrypt data at rest. For information about using security configurations in Glue, see Encrypting Data Written by Crawlers, Jobs, and Development Endpoints.
 */
export const createSecurityConfiguration: API.OperationMethod<
  CreateSecurityConfigurationRequest,
  CreateSecurityConfigurationResponse,
  CreateSecurityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSecurityConfigurationRequest,
  output: CreateSecurityConfigurationResponse,
  errors: [
    AlreadyExistsException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSecurityConfiguration",
}));

export type CreateSessionError =
  | AccessDeniedException
  | AlreadyExistsException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new session.
 */
export const createSession: API.OperationMethod<
  CreateSessionRequest,
  CreateSessionResponse,
  CreateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSessionRequest,
  output: CreateSessionResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSession",
}));

export type CreateTableError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new table definition in the Data Catalog.
 */
export const createTable: API.OperationMethod<
  CreateTableRequest,
  CreateTableResponse,
  CreateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTableRequest,
  output: CreateTableResponse,
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTable",
}));

export type CreateTableOptimizerError =
  | AccessDeniedException
  | AlreadyExistsException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new table optimizer for a specific function.
 */
export const createTableOptimizer: API.OperationMethod<
  CreateTableOptimizerRequest,
  CreateTableOptimizerResponse,
  CreateTableOptimizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTableOptimizerRequest,
  output: CreateTableOptimizerResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTableOptimizer",
}));

export type CreateTriggerError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new trigger.
 *
 * Job arguments may be logged. Do not pass plaintext secrets as arguments. Retrieve secrets from a Glue Connection, Amazon Web Services Secrets Manager or other secret management mechanism if you intend to keep them within the Job.
 */
export const createTrigger: API.OperationMethod<
  CreateTriggerRequest,
  CreateTriggerResponse,
  CreateTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTriggerRequest,
  output: CreateTriggerResponse,
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTrigger",
}));

export type CreateUsageProfileError =
  | AlreadyExistsException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates an Glue usage profile.
 */
export const createUsageProfile: API.OperationMethod<
  CreateUsageProfileRequest,
  CreateUsageProfileResponse,
  CreateUsageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUsageProfileRequest,
  output: CreateUsageProfileResponse,
  errors: [
    AlreadyExistsException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUsageProfile",
}));

export type CreateUserDefinedFunctionError =
  | AlreadyExistsException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new function definition in the Data Catalog.
 */
export const createUserDefinedFunction: API.OperationMethod<
  CreateUserDefinedFunctionRequest,
  CreateUserDefinedFunctionResponse,
  CreateUserDefinedFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUserDefinedFunctionRequest,
  output: CreateUserDefinedFunctionResponse,
  errors: [
    AlreadyExistsException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserDefinedFunction",
}));

export type CreateWorkflowError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Creates a new workflow.
 */
export const createWorkflow: API.OperationMethod<
  CreateWorkflowRequest,
  CreateWorkflowResponse,
  CreateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkflowRequest,
  output: CreateWorkflowResponse,
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkflow",
}));

export type DeleteAssetError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an asset from Glue Data Catalog.
 */
export const deleteAsset: API.OperationMethod<
  DeleteAssetRequest,
  DeleteAssetResponse,
  DeleteAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssetRequest,
  output: DeleteAssetResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAsset",
}));

export type DeleteAssetTypeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an asset type from Glue Data Catalog.
 */
export const deleteAssetType: API.OperationMethod<
  DeleteAssetTypeRequest,
  DeleteAssetTypeResponse,
  DeleteAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssetTypeRequest,
  output: DeleteAssetTypeResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssetType",
}));

export type DeleteAttachmentError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a form attachment from an asset in Glue Data Catalog.
 */
export const deleteAttachment: API.OperationMethod<
  DeleteAttachmentRequest,
  DeleteAttachmentResponse,
  DeleteAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAttachmentRequest,
  output: DeleteAttachmentResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAttachment",
}));

export type DeleteBlueprintError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes an existing blueprint.
 */
export const deleteBlueprint: API.OperationMethod<
  DeleteBlueprintRequest,
  DeleteBlueprintResponse,
  DeleteBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBlueprintRequest,
  output: DeleteBlueprintResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBlueprint",
}));

export type DeleteCatalogError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Removes the specified catalog from the Glue Data Catalog.
 *
 * After completing this operation, you no longer have access to the databases, tables (and all table versions and partitions that might belong to the tables) and the user-defined functions in the deleted catalog. Glue deletes these "orphaned" resources asynchronously in a timely manner, at the discretion of the service.
 *
 * To ensure the immediate deletion of all related resources before calling the `DeleteCatalog` operation, use `DeleteTableVersion` (or `BatchDeleteTableVersion`), `DeletePartition` (or `BatchDeletePartition`), `DeleteTable` (or `BatchDeleteTable`), `DeleteUserDefinedFunction` and `DeleteDatabase` to delete any resources that belong to the catalog.
 */
export const deleteCatalog: API.OperationMethod<
  DeleteCatalogRequest,
  DeleteCatalogResponse,
  DeleteCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCatalogRequest,
  output: DeleteCatalogResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCatalog",
}));

export type DeleteClassifierError =
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Removes a classifier from the Data Catalog.
 */
export const deleteClassifier: API.OperationMethod<
  DeleteClassifierRequest,
  DeleteClassifierResponse,
  DeleteClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClassifierRequest,
  output: DeleteClassifierResponse,
  errors: [EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteClassifier",
}));

export type DeleteColumnStatisticsForPartitionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Delete the partition column statistics of a column.
 *
 * The Identity and Access Management (IAM) permission required for this operation is `DeletePartition`.
 */
export const deleteColumnStatisticsForPartition: API.OperationMethod<
  DeleteColumnStatisticsForPartitionRequest,
  DeleteColumnStatisticsForPartitionResponse,
  DeleteColumnStatisticsForPartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteColumnStatisticsForPartitionRequest,
  output: DeleteColumnStatisticsForPartitionResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteColumnStatisticsForPartition",
}));

export type DeleteColumnStatisticsForTableError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves table statistics of columns.
 *
 * The Identity and Access Management (IAM) permission required for this operation is `DeleteTable`.
 */
export const deleteColumnStatisticsForTable: API.OperationMethod<
  DeleteColumnStatisticsForTableRequest,
  DeleteColumnStatisticsForTableResponse,
  DeleteColumnStatisticsForTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteColumnStatisticsForTableRequest,
  output: DeleteColumnStatisticsForTableResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteColumnStatisticsForTable",
}));

export type DeleteColumnStatisticsTaskSettingsError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes settings for a column statistics task.
 */
export const deleteColumnStatisticsTaskSettings: API.OperationMethod<
  DeleteColumnStatisticsTaskSettingsRequest,
  DeleteColumnStatisticsTaskSettingsResponse,
  DeleteColumnStatisticsTaskSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteColumnStatisticsTaskSettingsRequest,
  output: DeleteColumnStatisticsTaskSettingsResponse,
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteColumnStatisticsTaskSettings",
}));

export type DeleteConnectionError =
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a connection from the Data Catalog.
 */
export const deleteConnection: API.OperationMethod<
  DeleteConnectionRequest,
  DeleteConnectionResponse,
  DeleteConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectionRequest,
  output: DeleteConnectionResponse,
  errors: [EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnection",
}));

export type DeleteConnectionTypeError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom connection type in Glue.
 *
 * The connection type must exist and be registered before it can be deleted. This operation supports cleanup of connection type resources and helps maintain proper lifecycle management of custom connection types.
 */
export const deleteConnectionType: API.OperationMethod<
  DeleteConnectionTypeRequest,
  DeleteConnectionTypeResponse,
  DeleteConnectionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectionTypeRequest,
  output: DeleteConnectionTypeResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectionType",
}));

export type DeleteCrawlerError =
  | CrawlerRunningException
  | EntityNotFoundException
  | OperationTimeoutException
  | SchedulerTransitioningException
  | CommonErrors;
/**
 * Removes a specified crawler from the Glue Data Catalog, unless the crawler state is
 * `RUNNING`.
 */
export const deleteCrawler: API.OperationMethod<
  DeleteCrawlerRequest,
  DeleteCrawlerResponse,
  DeleteCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCrawlerRequest,
  output: DeleteCrawlerResponse,
  errors: [
    CrawlerRunningException,
    EntityNotFoundException,
    OperationTimeoutException,
    SchedulerTransitioningException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCrawler",
}));

export type DeleteCustomEntityTypeError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a custom pattern by specifying its name.
 */
export const deleteCustomEntityType: API.OperationMethod<
  DeleteCustomEntityTypeRequest,
  DeleteCustomEntityTypeResponse,
  DeleteCustomEntityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomEntityTypeRequest,
  output: DeleteCustomEntityTypeResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomEntityType",
}));

export type DeleteDatabaseError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Removes a specified database from a Data Catalog.
 *
 * After completing this operation, you no longer have access to the tables (and all table
 * versions and partitions that might belong to the tables) and the user-defined functions in
 * the deleted database. Glue deletes these "orphaned" resources asynchronously in a timely
 * manner, at the discretion of the service.
 *
 * To ensure the immediate deletion of all related resources, before calling
 * `DeleteDatabase`, use `DeleteTableVersion` or
 * `BatchDeleteTableVersion`, `DeletePartition` or
 * `BatchDeletePartition`, `DeleteUserDefinedFunction`, and
 * `DeleteTable` or `BatchDeleteTable`, to delete any resources that
 * belong to the database.
 */
export const deleteDatabase: API.OperationMethod<
  DeleteDatabaseRequest,
  DeleteDatabaseResponse,
  DeleteDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDatabaseRequest,
  output: DeleteDatabaseResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDatabase",
}));

export type DeleteDataQualityRulesetError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a data quality ruleset.
 */
export const deleteDataQualityRuleset: API.OperationMethod<
  DeleteDataQualityRulesetRequest,
  DeleteDataQualityRulesetResponse,
  DeleteDataQualityRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataQualityRulesetRequest,
  output: DeleteDataQualityRulesetResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataQualityRuleset",
}));

export type DeleteDevEndpointError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified development endpoint.
 */
export const deleteDevEndpoint: API.OperationMethod<
  DeleteDevEndpointRequest,
  DeleteDevEndpointResponse,
  DeleteDevEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDevEndpointRequest,
  output: DeleteDevEndpointResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDevEndpoint",
}));

export type DeleteFormTypeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | ConflictException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a form type from Glue Data Catalog. A form type cannot be deleted if it is still referenced by an asset type.
 */
export const deleteFormType: API.OperationMethod<
  DeleteFormTypeRequest,
  DeleteFormTypeResponse,
  DeleteFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFormTypeRequest,
  output: DeleteFormTypeResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    ConflictException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFormType",
}));

export type DeleteGlossaryError =
  | AccessDeniedException
  | ConcurrentModificationException
  | ConflictException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a business glossary from Glue Data Catalog. A glossary cannot be deleted if it still contains glossary terms.
 */
export const deleteGlossary: API.OperationMethod<
  DeleteGlossaryRequest,
  DeleteGlossaryResponse,
  DeleteGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGlossaryRequest,
  output: DeleteGlossaryResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    ConflictException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlossary",
}));

export type DeleteGlossaryTermError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a glossary term from Glue Data Catalog.
 */
export const deleteGlossaryTerm: API.OperationMethod<
  DeleteGlossaryTermRequest,
  DeleteGlossaryTermResponse,
  DeleteGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGlossaryTermRequest,
  output: DeleteGlossaryTermResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGlossaryTerm",
}));

export type DeleteGlueIdentityCenterConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes the existing Glue Identity Center configuration, removing the integration between Glue and
 * Amazon Web Services IAM Identity Center.
 */
export const deleteGlueIdentityCenterConfiguration: API.OperationMethod<
  DeleteGlueIdentityCenterConfigurationRequest,
  DeleteGlueIdentityCenterConfigurationResponse,
  DeleteGlueIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGlueIdentityCenterConfigurationRequest,
  output: DeleteGlueIdentityCenterConfigurationResponse,
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
  operationName: "DeleteGlueIdentityCenterConfiguration",
}));

export type DeleteIntegrationError =
  | AccessDeniedException
  | ConflictException
  | EntityNotFoundException
  | IntegrationConflictOperationFault
  | IntegrationNotFoundFault
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | InvalidIntegrationStateFault
  | InvalidStateException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified Zero-ETL integration.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationRequest,
  DeleteIntegrationResponse,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIntegrationRequest,
  output: DeleteIntegrationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    EntityNotFoundException,
    IntegrationConflictOperationFault,
    IntegrationNotFoundFault,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    InvalidIntegrationStateFault,
    InvalidStateException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
}));

export type DeleteIntegrationResourcePropertyError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API is used for deleting the `ResourceProperty` of the Glue connection (for the source) or Glue database ARN (for the target).
 */
export const deleteIntegrationResourceProperty: API.OperationMethod<
  DeleteIntegrationResourcePropertyRequest,
  DeleteIntegrationResourcePropertyResponse,
  DeleteIntegrationResourcePropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIntegrationResourcePropertyRequest,
  output: DeleteIntegrationResourcePropertyResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegrationResourceProperty",
}));

export type DeleteIntegrationTablePropertiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the table properties that have been created for the tables that need to be replicated.
 */
export const deleteIntegrationTableProperties: API.OperationMethod<
  DeleteIntegrationTablePropertiesRequest,
  DeleteIntegrationTablePropertiesResponse,
  DeleteIntegrationTablePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIntegrationTablePropertiesRequest,
  output: DeleteIntegrationTablePropertiesResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegrationTableProperties",
}));

export type DeleteJobError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified job definition. If the job definition
 * is not found, no exception is thrown.
 */
export const deleteJob: API.OperationMethod<
  DeleteJobRequest,
  DeleteJobResponse,
  DeleteJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteJobRequest,
  output: DeleteJobResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJob",
}));

export type DeleteMLTransformError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes an Glue machine learning transform. Machine learning transforms are a special
 * type of transform that use machine learning to learn the details of the transformation to be
 * performed by learning from examples provided by humans. These transformations are then saved
 * by Glue. If you no longer need a transform, you can delete it by calling
 * `DeleteMLTransforms`. However, any Glue jobs that still reference the deleted
 * transform will no longer succeed.
 */
export const deleteMLTransform: API.OperationMethod<
  DeleteMLTransformRequest,
  DeleteMLTransformResponse,
  DeleteMLTransformError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMLTransformRequest,
  output: DeleteMLTransformResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMLTransform",
}));

export type DeletePartitionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified partition.
 */
export const deletePartition: API.OperationMethod<
  DeletePartitionRequest,
  DeletePartitionResponse,
  DeletePartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePartitionRequest,
  output: DeletePartitionResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePartition",
}));

export type DeletePartitionIndexError =
  | ConflictException
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified partition index from an existing table.
 */
export const deletePartitionIndex: API.OperationMethod<
  DeletePartitionIndexRequest,
  DeletePartitionIndexResponse,
  DeletePartitionIndexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePartitionIndexRequest,
  output: DeletePartitionIndexResponse,
  errors: [
    ConflictException,
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePartitionIndex",
}));

export type DeleteRegistryError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InvalidInputException
  | CommonErrors;
/**
 * Delete the entire registry including schema and all of its versions. To get the status of the delete operation, you can call the `GetRegistry` API after the asynchronous call. Deleting a registry will deactivate all online operations for the registry such as the `UpdateRegistry`, `CreateSchema`, `UpdateSchema`, and `RegisterSchemaVersion` APIs.
 */
export const deleteRegistry: API.OperationMethod<
  DeleteRegistryInput,
  DeleteRegistryResponse,
  DeleteRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRegistryInput,
  output: DeleteRegistryResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRegistry",
}));

export type DeleteResourcePolicyError =
  | ConditionCheckFailureException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified policy.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
  errors: [
    ConditionCheckFailureException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteSchemaError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InvalidInputException
  | CommonErrors;
/**
 * Deletes the entire schema set, including the schema set and all of its versions. To get the status of the delete operation, you can call `GetSchema` API after the asynchronous call. Deleting a registry will deactivate all online operations for the schema, such as the `GetSchemaByDefinition`, and `RegisterSchemaVersion` APIs.
 */
export const deleteSchema: API.OperationMethod<
  DeleteSchemaInput,
  DeleteSchemaResponse,
  DeleteSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSchemaInput,
  output: DeleteSchemaResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchema",
}));

export type DeleteSchemaVersionsError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InvalidInputException
  | CommonErrors;
/**
 * Remove versions from the specified schema. A version number or range may be supplied. If the compatibility mode forbids deleting of a version that is necessary, such as BACKWARDS_FULL, an error is returned. Calling the `GetSchemaVersions` API after this call will list the status of the deleted versions.
 *
 * When the range of version numbers contain check pointed version, the API will return a 409 conflict and will not proceed with the deletion. You have to remove the checkpoint first using the `DeleteSchemaCheckpoint` API before using this API.
 *
 * You cannot use the `DeleteSchemaVersions` API to delete the first schema version in the schema set. The first schema version can only be deleted by the `DeleteSchema` API. This operation will also delete the attached `SchemaVersionMetadata` under the schema versions. Hard deletes will be enforced on the database.
 *
 * If the compatibility mode forbids deleting of a version that is necessary, such as BACKWARDS_FULL, an error is returned.
 */
export const deleteSchemaVersions: API.OperationMethod<
  DeleteSchemaVersionsInput,
  DeleteSchemaVersionsResponse,
  DeleteSchemaVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSchemaVersionsInput,
  output: DeleteSchemaVersionsResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchemaVersions",
}));

export type DeleteSecurityConfigurationError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified security configuration.
 */
export const deleteSecurityConfiguration: API.OperationMethod<
  DeleteSecurityConfigurationRequest,
  DeleteSecurityConfigurationResponse,
  DeleteSecurityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSecurityConfigurationRequest,
  output: DeleteSecurityConfigurationResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSecurityConfiguration",
}));

export type DeleteSessionError =
  | AccessDeniedException
  | ConcurrentModificationException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes the session.
 */
export const deleteSession: API.OperationMethod<
  DeleteSessionRequest,
  DeleteSessionResponse,
  DeleteSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSessionRequest,
  output: DeleteSessionResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSession",
}));

export type DeleteTableError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | CommonErrors;
/**
 * Removes a table definition from the Data Catalog.
 *
 * After completing this operation, you no longer have access to the table versions and
 * partitions that belong to the deleted table. Glue deletes these "orphaned" resources
 * asynchronously in a timely manner, at the discretion of the service.
 *
 * To ensure the immediate deletion of all related resources, before calling
 * `DeleteTable`, use `DeleteTableVersion` or
 * `BatchDeleteTableVersion`, and `DeletePartition` or
 * `BatchDeletePartition`, to delete any resources that belong to the
 * table.
 */
export const deleteTable: API.OperationMethod<
  DeleteTableRequest,
  DeleteTableResponse,
  DeleteTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTableRequest,
  output: DeleteTableResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTable",
}));

export type DeleteTableOptimizerError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an optimizer and all associated metadata for a table. The optimization will no longer be performed on the table.
 */
export const deleteTableOptimizer: API.OperationMethod<
  DeleteTableOptimizerRequest,
  DeleteTableOptimizerResponse,
  DeleteTableOptimizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTableOptimizerRequest,
  output: DeleteTableOptimizerResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTableOptimizer",
}));

export type DeleteTableVersionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified version of a table.
 */
export const deleteTableVersion: API.OperationMethod<
  DeleteTableVersionRequest,
  DeleteTableVersionResponse,
  DeleteTableVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTableVersionRequest,
  output: DeleteTableVersionResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTableVersion",
}));

export type DeleteTriggerError =
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a specified trigger. If the trigger is not found, no
 * exception is thrown.
 */
export const deleteTrigger: API.OperationMethod<
  DeleteTriggerRequest,
  DeleteTriggerResponse,
  DeleteTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTriggerRequest,
  output: DeleteTriggerResponse,
  errors: [
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTrigger",
}));

export type DeleteUsageProfileError =
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes the Glue specified usage profile.
 */
export const deleteUsageProfile: API.OperationMethod<
  DeleteUsageProfileRequest,
  DeleteUsageProfileResponse,
  DeleteUsageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUsageProfileRequest,
  output: DeleteUsageProfileResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUsageProfile",
}));

export type DeleteUserDefinedFunctionError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes an existing function definition from the Data Catalog.
 */
export const deleteUserDefinedFunction: API.OperationMethod<
  DeleteUserDefinedFunctionRequest,
  DeleteUserDefinedFunctionResponse,
  DeleteUserDefinedFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserDefinedFunctionRequest,
  output: DeleteUserDefinedFunctionResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserDefinedFunction",
}));

export type DeleteWorkflowError =
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Deletes a workflow.
 */
export const deleteWorkflow: API.OperationMethod<
  DeleteWorkflowRequest,
  DeleteWorkflowResponse,
  DeleteWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkflowRequest,
  output: DeleteWorkflowResponse,
  errors: [
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkflow",
}));

export type DescribeConnectionTypeError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ValidationException
  | CommonErrors;
/**
 * The `DescribeConnectionType` API provides full details of the supported options for a given connection type in Glue. The response includes authentication configuration details that show supported authentication types and properties, and RestConfiguration for custom REST-based connection types registered via `RegisterConnectionType`.
 *
 * See also: `ListConnectionTypes`, `RegisterConnectionType`, `DeleteConnectionType`
 */
export const describeConnectionType: API.OperationMethod<
  DescribeConnectionTypeRequest,
  DescribeConnectionTypeResponse,
  DescribeConnectionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConnectionTypeRequest,
  output: DescribeConnectionTypeResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConnectionType",
}));

export type DescribeEntityError =
  | AccessDeniedException
  | EntityNotFoundException
  | FederationSourceException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Provides details regarding the entity used with the connection type, with a description of the data model for each field in the selected entity.
 *
 * The response includes all the fields which make up the entity.
 */
export const describeEntity: API.PaginatedOperationMethod<
  DescribeEntityRequest,
  DescribeEntityResponse,
  DescribeEntityError,
  Credentials | HttpClient.HttpClient,
  Field
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEntityRequest,
  output: DescribeEntityResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    FederationSourceException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEntity",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Fields",
  } as const,
})) as any;

export type DescribeInboundIntegrationsError =
  | AccessDeniedException
  | EntityNotFoundException
  | IntegrationNotFoundFault
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | TargetResourceNotFound
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of inbound integrations for the specified integration.
 */
export const describeInboundIntegrations: API.OperationMethod<
  DescribeInboundIntegrationsRequest,
  DescribeInboundIntegrationsResponse,
  DescribeInboundIntegrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInboundIntegrationsRequest,
  output: DescribeInboundIntegrationsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IntegrationNotFoundFault,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    TargetResourceNotFound,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInboundIntegrations",
}));

export type DescribeIntegrationsError =
  | AccessDeniedException
  | EntityNotFoundException
  | IntegrationNotFoundFault
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ValidationException
  | CommonErrors;
/**
 * The API is used to retrieve a list of integrations.
 */
export const describeIntegrations: API.OperationMethod<
  DescribeIntegrationsRequest,
  DescribeIntegrationsResponse,
  DescribeIntegrationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeIntegrationsRequest,
  output: DescribeIntegrationsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IntegrationNotFoundFault,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIntegrations",
}));

export type DisassociateGlossaryTermsError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the association of one or more glossary terms from an asset in Glue Data Catalog.
 */
export const disassociateGlossaryTerms: API.OperationMethod<
  DisassociateGlossaryTermsRequest,
  DisassociateGlossaryTermsResponse,
  DisassociateGlossaryTermsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateGlossaryTermsRequest,
  output: DisassociateGlossaryTermsResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateGlossaryTerms",
}));

export type GetAssetError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for an asset in Glue Data Catalog, including its forms, additional attachments, and associated glossary terms.
 */
export const getAsset: API.OperationMethod<
  GetAssetInput,
  GetAssetOutput,
  GetAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssetInput,
  output: GetAssetOutput,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAsset",
}));

export type GetAssetTypeError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves an asset type in Glue Data Catalog by its identifier.
 */
export const getAssetType: API.OperationMethod<
  GetAssetTypeRequest,
  GetAssetTypeResponse,
  GetAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAssetTypeRequest,
  output: GetAssetTypeResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssetType",
}));

export type GetBlueprintError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the details of a blueprint.
 */
export const getBlueprint: API.OperationMethod<
  GetBlueprintRequest,
  GetBlueprintResponse,
  GetBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBlueprintRequest,
  output: GetBlueprintResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprint",
}));

export type GetBlueprintRunError =
  | EntityNotFoundException
  | InternalServiceException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the details of a blueprint run.
 */
export const getBlueprintRun: API.OperationMethod<
  GetBlueprintRunRequest,
  GetBlueprintRunResponse,
  GetBlueprintRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBlueprintRunRequest,
  output: GetBlueprintRunResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprintRun",
}));

export type GetBlueprintRunsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the details of blueprint runs for a specified blueprint.
 */
export const getBlueprintRuns: API.PaginatedOperationMethod<
  GetBlueprintRunsRequest,
  GetBlueprintRunsResponse,
  GetBlueprintRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBlueprintRunsRequest,
  output: GetBlueprintRunsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlueprintRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCatalogError =
  | AccessDeniedException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * The name of the Catalog to retrieve. This should be all lowercase.
 */
export const getCatalog: API.OperationMethod<
  GetCatalogRequest,
  GetCatalogResponse,
  GetCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCatalogRequest,
  output: GetCatalogResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCatalog",
}));

export type GetCatalogImportStatusError =
  | InternalServiceException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the status of a migration operation.
 */
export const getCatalogImportStatus: API.OperationMethod<
  GetCatalogImportStatusRequest,
  GetCatalogImportStatusResponse,
  GetCatalogImportStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCatalogImportStatusRequest,
  output: GetCatalogImportStatusResponse,
  errors: [InternalServiceException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCatalogImportStatus",
}));

export type GetCatalogsError =
  | AccessDeniedException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves all catalogs defined in a catalog in the Glue Data Catalog. For a Redshift-federated catalog use case, this operation returns the list of catalogs mapped to Redshift databases in the Redshift namespace catalog.
 */
export const getCatalogs: API.OperationMethod<
  GetCatalogsRequest,
  GetCatalogsResponse,
  GetCatalogsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCatalogsRequest,
  output: GetCatalogsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCatalogs",
}));

export type GetClassifierError =
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieve a classifier by name.
 */
export const getClassifier: API.OperationMethod<
  GetClassifierRequest,
  GetClassifierResponse,
  GetClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetClassifierRequest,
  output: GetClassifierResponse,
  errors: [EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClassifier",
}));

export type GetClassifiersError = OperationTimeoutException | CommonErrors;
/**
 * Lists all classifier objects in the Data Catalog.
 */
export const getClassifiers: API.PaginatedOperationMethod<
  GetClassifiersRequest,
  GetClassifiersResponse,
  GetClassifiersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetClassifiersRequest,
  output: GetClassifiersResponse,
  errors: [OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetClassifiers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetColumnStatisticsForPartitionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves partition statistics of columns.
 *
 * The Identity and Access Management (IAM) permission required for this operation is `GetPartition`.
 */
export const getColumnStatisticsForPartition: API.OperationMethod<
  GetColumnStatisticsForPartitionRequest,
  GetColumnStatisticsForPartitionResponse,
  GetColumnStatisticsForPartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetColumnStatisticsForPartitionRequest,
  output: GetColumnStatisticsForPartitionResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetColumnStatisticsForPartition",
}));

export type GetColumnStatisticsForTableError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves table statistics of columns.
 *
 * The Identity and Access Management (IAM) permission required for this operation is `GetTable`.
 */
export const getColumnStatisticsForTable: API.OperationMethod<
  GetColumnStatisticsForTableRequest,
  GetColumnStatisticsForTableResponse,
  GetColumnStatisticsForTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetColumnStatisticsForTableRequest,
  output: GetColumnStatisticsForTableResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetColumnStatisticsForTable",
}));

export type GetColumnStatisticsTaskRunError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Get the associated metadata/information for a task run, given a task run ID.
 */
export const getColumnStatisticsTaskRun: API.OperationMethod<
  GetColumnStatisticsTaskRunRequest,
  GetColumnStatisticsTaskRunResponse,
  GetColumnStatisticsTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetColumnStatisticsTaskRunRequest,
  output: GetColumnStatisticsTaskRunResponse,
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetColumnStatisticsTaskRun",
}));

export type GetColumnStatisticsTaskRunsError =
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves information about all runs associated with the specified table.
 */
export const getColumnStatisticsTaskRuns: API.PaginatedOperationMethod<
  GetColumnStatisticsTaskRunsRequest,
  GetColumnStatisticsTaskRunsResponse,
  GetColumnStatisticsTaskRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetColumnStatisticsTaskRunsRequest,
  output: GetColumnStatisticsTaskRunsResponse,
  errors: [OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetColumnStatisticsTaskRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetColumnStatisticsTaskSettingsError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets settings for a column statistics task.
 */
export const getColumnStatisticsTaskSettings: API.OperationMethod<
  GetColumnStatisticsTaskSettingsRequest,
  GetColumnStatisticsTaskSettingsResponse,
  GetColumnStatisticsTaskSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetColumnStatisticsTaskSettingsRequest,
  output: GetColumnStatisticsTaskSettingsResponse,
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetColumnStatisticsTaskSettings",
}));

export type GetConnectionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a connection definition from the Data Catalog.
 */
export const getConnection: API.OperationMethod<
  GetConnectionRequest,
  GetConnectionResponse,
  GetConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectionRequest,
  output: GetConnectionResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnection",
}));

export type GetConnectionsError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a list of connection definitions from the Data Catalog.
 */
export const getConnections: API.PaginatedOperationMethod<
  GetConnectionsRequest,
  GetConnectionsResponse,
  GetConnectionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetConnectionsRequest,
  output: GetConnectionsResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnections",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCrawlerError =
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves metadata for a specified crawler.
 */
export const getCrawler: API.OperationMethod<
  GetCrawlerRequest,
  GetCrawlerResponse,
  GetCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCrawlerRequest,
  output: GetCrawlerResponse,
  errors: [EntityNotFoundException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCrawler",
}));

export type GetCrawlerMetricsError = OperationTimeoutException | CommonErrors;
/**
 * Retrieves metrics about specified crawlers.
 */
export const getCrawlerMetrics: API.PaginatedOperationMethod<
  GetCrawlerMetricsRequest,
  GetCrawlerMetricsResponse,
  GetCrawlerMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetCrawlerMetricsRequest,
  output: GetCrawlerMetricsResponse,
  errors: [OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCrawlerMetrics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCrawlersError = OperationTimeoutException | CommonErrors;
/**
 * Retrieves metadata for all crawlers defined in the customer
 * account.
 */
export const getCrawlers: API.PaginatedOperationMethod<
  GetCrawlersRequest,
  GetCrawlersResponse,
  GetCrawlersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetCrawlersRequest,
  output: GetCrawlersResponse,
  errors: [OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCrawlers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCustomEntityTypeError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the details of a custom pattern by specifying its name.
 */
export const getCustomEntityType: API.OperationMethod<
  GetCustomEntityTypeRequest,
  GetCustomEntityTypeResponse,
  GetCustomEntityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCustomEntityTypeRequest,
  output: GetCustomEntityTypeResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomEntityType",
}));

export type GetDashboardUrlError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | CommonErrors;
/**
 * Retrieves the URL for the Spark monitoring dashboard for a Glue resource.
 */
export const getDashboardUrl: API.OperationMethod<
  GetDashboardUrlRequest,
  GetDashboardUrlResponse,
  GetDashboardUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDashboardUrlRequest,
  output: GetDashboardUrlResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboardUrl",
}));

export type GetDatabaseError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the definition of a specified database.
 */
export const getDatabase: API.OperationMethod<
  GetDatabaseRequest,
  GetDatabaseResponse,
  GetDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDatabaseRequest,
  output: GetDatabaseResponse,
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatabase",
}));

export type GetDatabasesError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves all databases defined in a given Data Catalog.
 */
export const getDatabases: API.PaginatedOperationMethod<
  GetDatabasesRequest,
  GetDatabasesResponse,
  GetDatabasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetDatabasesRequest,
  output: GetDatabasesResponse,
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatabases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetDataCatalogEncryptionSettingsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the security configuration for a specified catalog.
 */
export const getDataCatalogEncryptionSettings: API.OperationMethod<
  GetDataCatalogEncryptionSettingsRequest,
  GetDataCatalogEncryptionSettingsResponse,
  GetDataCatalogEncryptionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataCatalogEncryptionSettingsRequest,
  output: GetDataCatalogEncryptionSettingsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataCatalogEncryptionSettings",
}));

export type GetDataflowGraphError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Transforms a Python script into a directed acyclic graph (DAG).
 */
export const getDataflowGraph: API.OperationMethod<
  GetDataflowGraphRequest,
  GetDataflowGraphResponse,
  GetDataflowGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataflowGraphRequest,
  output: GetDataflowGraphResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataflowGraph",
}));

export type GetDataQualityModelError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieve the training status of the model along with more information (CompletedOn, StartedOn, FailureReason).
 */
export const getDataQualityModel: API.OperationMethod<
  GetDataQualityModelRequest,
  GetDataQualityModelResponse,
  GetDataQualityModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataQualityModelRequest,
  output: GetDataQualityModelResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityModel",
}));

export type GetDataQualityModelResultError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieve a statistic's predictions for a given Profile ID.
 */
export const getDataQualityModelResult: API.OperationMethod<
  GetDataQualityModelResultRequest,
  GetDataQualityModelResultResponse,
  GetDataQualityModelResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataQualityModelResultRequest,
  output: GetDataQualityModelResultResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityModelResult",
}));

export type GetDataQualityResultError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the result of a data quality rule evaluation.
 */
export const getDataQualityResult: API.OperationMethod<
  GetDataQualityResultRequest,
  GetDataQualityResultResponse,
  GetDataQualityResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataQualityResultRequest,
  output: GetDataQualityResultResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityResult",
}));

export type GetDataQualityRuleRecommendationRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets the specified recommendation run that was used to generate rules.
 */
export const getDataQualityRuleRecommendationRun: API.OperationMethod<
  GetDataQualityRuleRecommendationRunRequest,
  GetDataQualityRuleRecommendationRunResponse,
  GetDataQualityRuleRecommendationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataQualityRuleRecommendationRunRequest,
  output: GetDataQualityRuleRecommendationRunResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityRuleRecommendationRun",
}));

export type GetDataQualityRulesetError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns an existing ruleset by identifier or name.
 */
export const getDataQualityRuleset: API.OperationMethod<
  GetDataQualityRulesetRequest,
  GetDataQualityRulesetResponse,
  GetDataQualityRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataQualityRulesetRequest,
  output: GetDataQualityRulesetResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityRuleset",
}));

export type GetDataQualityRulesetEvaluationRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a specific run where a ruleset is evaluated against a data source.
 */
export const getDataQualityRulesetEvaluationRun: API.OperationMethod<
  GetDataQualityRulesetEvaluationRunRequest,
  GetDataQualityRulesetEvaluationRunResponse,
  GetDataQualityRulesetEvaluationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataQualityRulesetEvaluationRunRequest,
  output: GetDataQualityRulesetEvaluationRunResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataQualityRulesetEvaluationRun",
}));

export type GetDevEndpointError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves information about a specified development endpoint.
 *
 * When you create a development endpoint in a virtual private cloud (VPC), Glue returns only
 * a private IP address, and the public IP address field is not populated. When you create a
 * non-VPC development endpoint, Glue returns only a public IP address.
 */
export const getDevEndpoint: API.OperationMethod<
  GetDevEndpointRequest,
  GetDevEndpointResponse,
  GetDevEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDevEndpointRequest,
  output: GetDevEndpointResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevEndpoint",
}));

export type GetDevEndpointsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves all the development endpoints in this Amazon Web Services account.
 *
 * When you create a development endpoint in a virtual private cloud (VPC), Glue returns only a private IP address
 * and the public IP address field is not populated. When you create a non-VPC development
 * endpoint, Glue returns only a public IP address.
 */
export const getDevEndpoints: API.PaginatedOperationMethod<
  GetDevEndpointsRequest,
  GetDevEndpointsResponse,
  GetDevEndpointsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetDevEndpointsRequest,
  output: GetDevEndpointsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDevEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetEntityRecordsError =
  | AccessDeniedException
  | EntityNotFoundException
  | FederationSourceException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * This API is used to query preview data from a given connection type or from a native Amazon S3 based Glue Data Catalog.
 *
 * Returns records as an array of JSON blobs. Each record is formatted using Jackson JsonNode based on the field type defined by the `DescribeEntity` API.
 *
 * Spark connectors generate schemas according to the same data type mapping as in the `DescribeEntity` API. Spark connectors convert data to the appropriate data types matching the schema when returning rows.
 */
export const getEntityRecords: API.OperationMethod<
  GetEntityRecordsRequest,
  GetEntityRecordsResponse,
  GetEntityRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEntityRecordsRequest,
  output: GetEntityRecordsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    FederationSourceException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEntityRecords",
}));

export type GetFormTypeError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a form type in Glue Data Catalog by its identifier.
 */
export const getFormType: API.OperationMethod<
  GetFormTypeRequest,
  GetFormTypeResponse,
  GetFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFormTypeRequest,
  output: GetFormTypeResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFormType",
}));

export type GetGlossaryError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a business glossary in Glue Data Catalog by its identifier.
 */
export const getGlossary: API.OperationMethod<
  GetGlossaryRequest,
  GetGlossaryResponse,
  GetGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGlossaryRequest,
  output: GetGlossaryResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlossary",
}));

export type GetGlossaryTermError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a glossary term in Glue Data Catalog by its identifier.
 */
export const getGlossaryTerm: API.OperationMethod<
  GetGlossaryTermRequest,
  GetGlossaryTermResponse,
  GetGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGlossaryTermRequest,
  output: GetGlossaryTermResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlossaryTerm",
}));

export type GetGlueIdentityCenterConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the current Glue Identity Center configuration details, including the associated Identity Center instance and
 * application information.
 */
export const getGlueIdentityCenterConfiguration: API.OperationMethod<
  GetGlueIdentityCenterConfigurationRequest,
  GetGlueIdentityCenterConfigurationResponse,
  GetGlueIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGlueIdentityCenterConfigurationRequest,
  output: GetGlueIdentityCenterConfigurationResponse,
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
  operationName: "GetGlueIdentityCenterConfiguration",
}));

export type GetIntegrationResourcePropertyError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API is used for fetching the `ResourceProperty` of the Glue connection (for the source) or Glue database ARN (for the target)
 */
export const getIntegrationResourceProperty: API.OperationMethod<
  GetIntegrationResourcePropertyRequest,
  GetIntegrationResourcePropertyResponse,
  GetIntegrationResourcePropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIntegrationResourcePropertyRequest,
  output: GetIntegrationResourcePropertyResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationResourceProperty",
}));

export type GetIntegrationTablePropertiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API is used to retrieve optional override properties for the tables that need to be replicated. These properties can include properties for filtering and partition for source and target tables.
 */
export const getIntegrationTableProperties: API.OperationMethod<
  GetIntegrationTablePropertiesRequest,
  GetIntegrationTablePropertiesResponse,
  GetIntegrationTablePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIntegrationTablePropertiesRequest,
  output: GetIntegrationTablePropertiesResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegrationTableProperties",
}));

export type GetJobError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves an existing job definition.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResponse,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobRequest,
  output: GetJobResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
}));

export type GetJobBookmarkError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Returns information on a job bookmark entry.
 *
 * For more information about enabling and using job bookmarks, see:
 *
 * - Tracking processed data using job bookmarks
 *
 * - Job parameters used by Glue
 *
 * - Job structure
 */
export const getJobBookmark: API.OperationMethod<
  GetJobBookmarkRequest,
  GetJobBookmarkResponse,
  GetJobBookmarkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobBookmarkRequest,
  output: GetJobBookmarkResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobBookmark",
}));

export type GetJobRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the metadata for a given job run. Job run history is accessible for 365 days for your workflow and job run.
 */
export const getJobRun: API.OperationMethod<
  GetJobRunRequest,
  GetJobRunResponse,
  GetJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobRunRequest,
  output: GetJobRunResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobRun",
}));

export type GetJobRunsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves metadata for all runs of a given job definition.
 *
 * `GetJobRuns` returns the job runs in chronological order, with the newest jobs returned first.
 */
export const getJobRuns: API.PaginatedOperationMethod<
  GetJobRunsRequest,
  GetJobRunsResponse,
  GetJobRunsError,
  Credentials | HttpClient.HttpClient,
  JobRun
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetJobRunsRequest,
  output: GetJobRunsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobRuns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetJobsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves all current job definitions.
 */
export const getJobs: API.PaginatedOperationMethod<
  GetJobsRequest,
  GetJobsResponse,
  GetJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetJobsRequest,
  output: GetJobsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Jobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetMappingError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Creates mappings.
 */
export const getMapping: API.OperationMethod<
  GetMappingRequest,
  GetMappingResponse,
  GetMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMappingRequest,
  output: GetMappingResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMapping",
}));

export type GetMaterializedViewRefreshTaskRunError =
  | AccessDeniedException
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Get the associated metadata/information for a task run, given a task run ID.
 */
export const getMaterializedViewRefreshTaskRun: API.OperationMethod<
  GetMaterializedViewRefreshTaskRunRequest,
  GetMaterializedViewRefreshTaskRunResponse,
  GetMaterializedViewRefreshTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMaterializedViewRefreshTaskRunRequest,
  output: GetMaterializedViewRefreshTaskRunResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMaterializedViewRefreshTaskRun",
}));

export type GetMLTaskRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets details for a specific task run on a machine learning transform. Machine learning
 * task runs are asynchronous tasks that Glue runs on your behalf as part of various machine
 * learning workflows. You can check the stats of any task run by calling
 * `GetMLTaskRun` with the `TaskRunID` and its parent transform's
 * `TransformID`.
 */
export const getMLTaskRun: API.OperationMethod<
  GetMLTaskRunRequest,
  GetMLTaskRunResponse,
  GetMLTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMLTaskRunRequest,
  output: GetMLTaskRunResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLTaskRun",
}));

export type GetMLTaskRunsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets a list of runs for a machine learning transform. Machine learning task runs are
 * asynchronous tasks that Glue runs on your behalf as part of various machine learning
 * workflows. You can get a sortable, filterable list of machine learning task runs by calling
 * `GetMLTaskRuns` with their parent transform's `TransformID` and other
 * optional parameters as documented in this section.
 *
 * This operation returns a list of historic runs and must be paginated.
 */
export const getMLTaskRuns: API.PaginatedOperationMethod<
  GetMLTaskRunsRequest,
  GetMLTaskRunsResponse,
  GetMLTaskRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetMLTaskRunsRequest,
  output: GetMLTaskRunsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLTaskRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetMLTransformError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets an Glue machine learning transform artifact and all its corresponding metadata.
 * Machine learning transforms are a special type of transform that use machine learning to learn
 * the details of the transformation to be performed by learning from examples provided by
 * humans. These transformations are then saved by Glue. You can retrieve their metadata by
 * calling `GetMLTransform`.
 */
export const getMLTransform: API.OperationMethod<
  GetMLTransformRequest,
  GetMLTransformResponse,
  GetMLTransformError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMLTransformRequest,
  output: GetMLTransformResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLTransform",
}));

export type GetMLTransformsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets a sortable, filterable list of existing Glue machine learning transforms. Machine
 * learning transforms are a special type of transform that use machine learning to learn the
 * details of the transformation to be performed by learning from examples provided by humans.
 * These transformations are then saved by Glue, and you can retrieve their metadata by
 * calling `GetMLTransforms`.
 */
export const getMLTransforms: API.PaginatedOperationMethod<
  GetMLTransformsRequest,
  GetMLTransformsResponse,
  GetMLTransformsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetMLTransformsRequest,
  output: GetMLTransformsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMLTransforms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetPartitionError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves information about a specified partition.
 */
export const getPartition: API.OperationMethod<
  GetPartitionRequest,
  GetPartitionResponse,
  GetPartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPartitionRequest,
  output: GetPartitionResponse,
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPartition",
}));

export type GetPartitionIndexesError =
  | ConflictException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the partition indexes associated with a table.
 */
export const getPartitionIndexes: API.PaginatedOperationMethod<
  GetPartitionIndexesRequest,
  GetPartitionIndexesResponse,
  GetPartitionIndexesError,
  Credentials | HttpClient.HttpClient,
  PartitionIndexDescriptor
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetPartitionIndexesRequest,
  output: GetPartitionIndexesResponse,
  errors: [
    ConflictException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPartitionIndexes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PartitionIndexDescriptorList",
  } as const,
})) as any;

export type GetPartitionsError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | InvalidStateException
  | OperationTimeoutException
  | ResourceNotReadyException
  | CommonErrors;
/**
 * Retrieves information about the partitions in a table.
 */
export const getPartitions: API.PaginatedOperationMethod<
  GetPartitionsRequest,
  GetPartitionsResponse,
  GetPartitionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetPartitionsRequest,
  output: GetPartitionsResponse,
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    InvalidStateException,
    OperationTimeoutException,
    ResourceNotReadyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPartitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetPlanError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets code to perform a specified mapping.
 */
export const getPlan: API.OperationMethod<
  GetPlanRequest,
  GetPlanResponse,
  GetPlanError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPlanRequest,
  output: GetPlanResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlan",
}));

export type GetRegistryError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the specified registry in detail.
 */
export const getRegistry: API.OperationMethod<
  GetRegistryInput,
  GetRegistryResponse,
  GetRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRegistryInput,
  output: GetRegistryResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRegistry",
}));

export type GetResourcePoliciesError =
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the resource policies set on individual resources by Resource Access Manager
 * during cross-account permission grants. Also retrieves the Data Catalog resource
 * policy.
 *
 * If you enabled metadata encryption in Data Catalog settings, and you do not have
 * permission on the KMS key, the operation can't return the Data Catalog resource
 * policy.
 */
export const getResourcePolicies: API.PaginatedOperationMethod<
  GetResourcePoliciesRequest,
  GetResourcePoliciesResponse,
  GetResourcePoliciesError,
  Credentials | HttpClient.HttpClient,
  GluePolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetResourcePoliciesRequest,
  output: GetResourcePoliciesResponse,
  errors: [
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GetResourcePoliciesResponseList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetResourcePolicyError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a specified resource policy.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type GetSchemaError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Describes the specified schema in detail.
 */
export const getSchema: API.OperationMethod<
  GetSchemaInput,
  GetSchemaResponse,
  GetSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSchemaInput,
  output: GetSchemaResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchema",
}));

export type GetSchemaByDefinitionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Retrieves a schema by the `SchemaDefinition`. The schema definition is sent to the Schema Registry, canonicalized, and hashed. If the hash is matched within the scope of the `SchemaName` or ARN (or the default registry, if none is supplied), that schema’s metadata is returned. Otherwise, a 404 or NotFound error is returned. Schema versions in `Deleted` statuses will not be included in the results.
 */
export const getSchemaByDefinition: API.OperationMethod<
  GetSchemaByDefinitionInput,
  GetSchemaByDefinitionResponse,
  GetSchemaByDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSchemaByDefinitionInput,
  output: GetSchemaByDefinitionResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaByDefinition",
}));

export type GetSchemaVersionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Get the specified schema by its unique ID assigned when a version of the schema is created or registered. Schema versions in Deleted status will not be included in the results.
 */
export const getSchemaVersion: API.OperationMethod<
  GetSchemaVersionInput,
  GetSchemaVersionResponse,
  GetSchemaVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSchemaVersionInput,
  output: GetSchemaVersionResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaVersion",
}));

export type GetSchemaVersionsDiffError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Fetches the schema version difference in the specified difference type between two stored schema versions in the Schema Registry.
 *
 * This API allows you to compare two schema versions between two schema definitions under the same schema.
 */
export const getSchemaVersionsDiff: API.OperationMethod<
  GetSchemaVersionsDiffInput,
  GetSchemaVersionsDiffResponse,
  GetSchemaVersionsDiffError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSchemaVersionsDiffInput,
  output: GetSchemaVersionsDiffResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchemaVersionsDiff",
}));

export type GetSecurityConfigurationError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a specified security configuration.
 */
export const getSecurityConfiguration: API.OperationMethod<
  GetSecurityConfigurationRequest,
  GetSecurityConfigurationResponse,
  GetSecurityConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSecurityConfigurationRequest,
  output: GetSecurityConfigurationResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityConfiguration",
}));

export type GetSecurityConfigurationsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a list of all security configurations.
 */
export const getSecurityConfigurations: API.PaginatedOperationMethod<
  GetSecurityConfigurationsRequest,
  GetSecurityConfigurationsResponse,
  GetSecurityConfigurationsError,
  Credentials | HttpClient.HttpClient,
  SecurityConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetSecurityConfigurationsRequest,
  output: GetSecurityConfigurationsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSecurityConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SecurityConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetSessionError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the session.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionRequest,
  output: GetSessionResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

export type GetSessionEndpointError =
  | AccessDeniedException
  | EntityNotFoundException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns the Spark Connect endpoint URL and authentication token for an interactive session.
 */
export const getSessionEndpoint: API.OperationMethod<
  GetSessionEndpointRequest,
  GetSessionEndpointResponse,
  GetSessionEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionEndpointRequest,
  output: GetSessionEndpointResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionEndpoint",
}));

export type GetStatementError =
  | AccessDeniedException
  | EntityNotFoundException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the statement.
 */
export const getStatement: API.OperationMethod<
  GetStatementRequest,
  GetStatementResponse,
  GetStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStatementRequest,
  output: GetStatementResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStatement",
}));

export type GetTableError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | CommonErrors;
/**
 * Retrieves the `Table` definition in a Data Catalog for
 * a specified table.
 */
export const getTable: API.OperationMethod<
  GetTableRequest,
  GetTableResponse,
  GetTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTableRequest,
  output: GetTableResponse,
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTable",
}));

export type GetTableOptimizerError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the configuration of all optimizers associated with a specified table.
 */
export const getTableOptimizer: API.OperationMethod<
  GetTableOptimizerRequest,
  GetTableOptimizerResponse,
  GetTableOptimizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTableOptimizerRequest,
  output: GetTableOptimizerResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableOptimizer",
}));

export type GetTablesError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the definitions of some or all of the tables in a given
 * `Database`.
 */
export const getTables: API.PaginatedOperationMethod<
  GetTablesRequest,
  GetTablesResponse,
  GetTablesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetTablesRequest,
  output: GetTablesResponse,
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTables",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetTableVersionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a specified version of a table.
 */
export const getTableVersion: API.OperationMethod<
  GetTableVersionRequest,
  GetTableVersionResponse,
  GetTableVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTableVersionRequest,
  output: GetTableVersionResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableVersion",
}));

export type GetTableVersionsError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a list of strings that identify available versions of
 * a specified table.
 */
export const getTableVersions: API.PaginatedOperationMethod<
  GetTableVersionsRequest,
  GetTableVersionsResponse,
  GetTableVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetTableVersionsRequest,
  output: GetTableVersionsResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetTagsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a list of tags associated with a resource.
 */
export const getTags: API.OperationMethod<
  GetTagsRequest,
  GetTagsResponse,
  GetTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTagsRequest,
  output: GetTagsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
}));

export type GetTriggerError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the definition of a trigger.
 */
export const getTrigger: API.OperationMethod<
  GetTriggerRequest,
  GetTriggerResponse,
  GetTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTriggerRequest,
  output: GetTriggerResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTrigger",
}));

export type GetTriggersError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Gets all the triggers associated with a job.
 */
export const getTriggers: API.PaginatedOperationMethod<
  GetTriggersRequest,
  GetTriggersResponse,
  GetTriggersError,
  Credentials | HttpClient.HttpClient,
  Trigger
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetTriggersRequest,
  output: GetTriggersResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTriggers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Triggers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetUnfilteredPartitionMetadataError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | PermissionTypeMismatchException
  | CommonErrors;
/**
 * Retrieves partition metadata from the Data Catalog that contains unfiltered
 * metadata.
 *
 * For IAM authorization, the public IAM action associated with this API is `glue:GetPartition`.
 */
export const getUnfilteredPartitionMetadata: API.OperationMethod<
  GetUnfilteredPartitionMetadataRequest,
  GetUnfilteredPartitionMetadataResponse,
  GetUnfilteredPartitionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUnfilteredPartitionMetadataRequest,
  output: GetUnfilteredPartitionMetadataResponse,
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    PermissionTypeMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUnfilteredPartitionMetadata",
}));

export type GetUnfilteredPartitionsMetadataError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | PermissionTypeMismatchException
  | CommonErrors;
/**
 * Retrieves partition metadata from the Data Catalog that contains unfiltered
 * metadata.
 *
 * For IAM authorization, the public IAM action associated with this API is `glue:GetPartitions`.
 */
export const getUnfilteredPartitionsMetadata: API.PaginatedOperationMethod<
  GetUnfilteredPartitionsMetadataRequest,
  GetUnfilteredPartitionsMetadataResponse,
  GetUnfilteredPartitionsMetadataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetUnfilteredPartitionsMetadataRequest,
  output: GetUnfilteredPartitionsMetadataResponse,
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    PermissionTypeMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUnfilteredPartitionsMetadata",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetUnfilteredTableMetadataError =
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | PermissionTypeMismatchException
  | CommonErrors;
/**
 * Allows a third-party analytical engine to retrieve unfiltered table metadata from the Data Catalog.
 *
 * For IAM authorization, the public IAM action associated with this API is `glue:GetTable`.
 */
export const getUnfilteredTableMetadata: API.OperationMethod<
  GetUnfilteredTableMetadataRequest,
  GetUnfilteredTableMetadataResponse,
  GetUnfilteredTableMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUnfilteredTableMetadataRequest,
  output: GetUnfilteredTableMetadataResponse,
  errors: [
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    PermissionTypeMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUnfilteredTableMetadata",
}));

export type GetUsageProfileError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves information about the specified Glue usage profile.
 */
export const getUsageProfile: API.OperationMethod<
  GetUsageProfileRequest,
  GetUsageProfileResponse,
  GetUsageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUsageProfileRequest,
  output: GetUsageProfileResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsageProfile",
}));

export type GetUserDefinedFunctionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a specified function definition from the Data Catalog.
 */
export const getUserDefinedFunction: API.OperationMethod<
  GetUserDefinedFunctionRequest,
  GetUserDefinedFunctionResponse,
  GetUserDefinedFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserDefinedFunctionRequest,
  output: GetUserDefinedFunctionResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserDefinedFunction",
}));

export type GetUserDefinedFunctionsError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves multiple function definitions from the Data Catalog.
 */
export const getUserDefinedFunctions: API.PaginatedOperationMethod<
  GetUserDefinedFunctionsRequest,
  GetUserDefinedFunctionsResponse,
  GetUserDefinedFunctionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetUserDefinedFunctionsRequest,
  output: GetUserDefinedFunctionsResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserDefinedFunctions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetWorkflowError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves resource metadata for a workflow.
 */
export const getWorkflow: API.OperationMethod<
  GetWorkflowRequest,
  GetWorkflowResponse,
  GetWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkflowRequest,
  output: GetWorkflowResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflow",
}));

export type GetWorkflowRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the metadata for a given workflow run. Job run history is accessible for 90 days for your workflow and job run.
 */
export const getWorkflowRun: API.OperationMethod<
  GetWorkflowRunRequest,
  GetWorkflowRunResponse,
  GetWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkflowRunRequest,
  output: GetWorkflowRunResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRun",
}));

export type GetWorkflowRunPropertiesError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the workflow run properties which were set during the run.
 */
export const getWorkflowRunProperties: API.OperationMethod<
  GetWorkflowRunPropertiesRequest,
  GetWorkflowRunPropertiesResponse,
  GetWorkflowRunPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkflowRunPropertiesRequest,
  output: GetWorkflowRunPropertiesResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRunProperties",
}));

export type GetWorkflowRunsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves metadata for all runs of a given workflow.
 */
export const getWorkflowRuns: API.PaginatedOperationMethod<
  GetWorkflowRunsRequest,
  GetWorkflowRunsResponse,
  GetWorkflowRunsError,
  Credentials | HttpClient.HttpClient,
  WorkflowRun
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetWorkflowRunsRequest,
  output: GetWorkflowRunsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkflowRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Runs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ImportCatalogToGlueError =
  | InternalServiceException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Imports an existing Amazon Athena Data Catalog to Glue.
 */
export const importCatalogToGlue: API.OperationMethod<
  ImportCatalogToGlueRequest,
  ImportCatalogToGlueResponse,
  ImportCatalogToGlueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportCatalogToGlueRequest,
  output: ImportCatalogToGlueResponse,
  errors: [InternalServiceException, OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportCatalogToGlue",
}));

export type ListAssetTypesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the asset types defined in Glue Data Catalog.
 */
export const listAssetTypes: API.PaginatedOperationMethod<
  ListAssetTypesRequest,
  ListAssetTypesResponse,
  ListAssetTypesError,
  Credentials | HttpClient.HttpClient,
  AssetTypeItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetTypesRequest,
  output: ListAssetTypesResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssetTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListBlueprintsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists all the blueprint names in an account.
 */
export const listBlueprints: API.PaginatedOperationMethod<
  ListBlueprintsRequest,
  ListBlueprintsResponse,
  ListBlueprintsError,
  Credentials | HttpClient.HttpClient,
  OrchestrationNameString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBlueprintsRequest,
  output: ListBlueprintsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBlueprints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Blueprints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListColumnStatisticsTaskRunsError =
  | OperationTimeoutException
  | CommonErrors;
/**
 * List all task runs for a particular account.
 */
export const listColumnStatisticsTaskRuns: API.PaginatedOperationMethod<
  ListColumnStatisticsTaskRunsRequest,
  ListColumnStatisticsTaskRunsResponse,
  ListColumnStatisticsTaskRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListColumnStatisticsTaskRunsRequest,
  output: ListColumnStatisticsTaskRunsResponse,
  errors: [OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListColumnStatisticsTaskRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListConnectionTypesError =
  | AccessDeniedException
  | InternalServiceException
  | CommonErrors;
/**
 * The `ListConnectionTypes` API provides a discovery mechanism to learn available connection types in Glue. The response contains a list of connection types with high-level details of what is supported for each connection type, including both built-in connection types and custom connection types registered via `RegisterConnectionType`. The connection types listed are the set of supported options for the `ConnectionType` value in the `CreateConnection` API.
 *
 * See also: `DescribeConnectionType`, `RegisterConnectionType`, `DeleteConnectionType`
 */
export const listConnectionTypes: API.PaginatedOperationMethod<
  ListConnectionTypesRequest,
  ListConnectionTypesResponse,
  ListConnectionTypesError,
  Credentials | HttpClient.HttpClient,
  ConnectionTypeBrief
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectionTypesRequest,
  output: ListConnectionTypesResponse,
  errors: [AccessDeniedException, InternalServiceException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectionTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConnectionTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCrawlersError = OperationTimeoutException | CommonErrors;
/**
 * Retrieves the names of all crawler resources in this Amazon Web Services account, or the
 * resources with the specified tag. This operation allows you to see which
 * resources are available in your account, and their names.
 *
 * This operation takes the optional `Tags` field, which you can use as a filter on
 * the response so that tagged resources can be retrieved as a group. If you choose to use tags
 * filtering, only resources with the tag are retrieved.
 */
export const listCrawlers: API.PaginatedOperationMethod<
  ListCrawlersRequest,
  ListCrawlersResponse,
  ListCrawlersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCrawlersRequest,
  output: ListCrawlersResponse,
  errors: [OperationTimeoutException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrawlers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCrawlsError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns all the crawls of a specified crawler. Returns only the crawls that have occurred since the launch date of the crawler history feature, and only retains up to 12 months of crawls. Older crawls will not be returned.
 *
 * You may use this API to:
 *
 * - Retrive all the crawls of a specified crawler.
 *
 * - Retrieve all the crawls of a specified crawler within a limited count.
 *
 * - Retrieve all the crawls of a specified crawler in a specific time range.
 *
 * - Retrieve all the crawls of a specified crawler with a particular state, crawl ID, or DPU hour value.
 */
export const listCrawls: API.OperationMethod<
  ListCrawlsRequest,
  ListCrawlsResponse,
  ListCrawlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListCrawlsRequest,
  output: ListCrawlsResponse,
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCrawls",
}));

export type ListCustomEntityTypesError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists all the custom patterns that have been created.
 */
export const listCustomEntityTypes: API.PaginatedOperationMethod<
  ListCustomEntityTypesRequest,
  ListCustomEntityTypesResponse,
  ListCustomEntityTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomEntityTypesRequest,
  output: ListCustomEntityTypesResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomEntityTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataQualityResultsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns all data quality execution results for your account.
 */
export const listDataQualityResults: API.PaginatedOperationMethod<
  ListDataQualityResultsRequest,
  ListDataQualityResultsResponse,
  ListDataQualityResultsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataQualityResultsRequest,
  output: ListDataQualityResultsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataQualityRuleRecommendationRunsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists the recommendation runs meeting the filter criteria.
 */
export const listDataQualityRuleRecommendationRuns: API.PaginatedOperationMethod<
  ListDataQualityRuleRecommendationRunsRequest,
  ListDataQualityRuleRecommendationRunsResponse,
  ListDataQualityRuleRecommendationRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataQualityRuleRecommendationRunsRequest,
  output: ListDataQualityRuleRecommendationRunsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityRuleRecommendationRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataQualityRulesetEvaluationRunsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists all the runs meeting the filter criteria, where a ruleset is evaluated against a data source.
 */
export const listDataQualityRulesetEvaluationRuns: API.PaginatedOperationMethod<
  ListDataQualityRulesetEvaluationRunsRequest,
  ListDataQualityRulesetEvaluationRunsResponse,
  ListDataQualityRulesetEvaluationRunsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataQualityRulesetEvaluationRunsRequest,
  output: ListDataQualityRulesetEvaluationRunsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityRulesetEvaluationRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataQualityRulesetsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Returns a paginated list of rulesets for the specified list of Glue tables.
 */
export const listDataQualityRulesets: API.PaginatedOperationMethod<
  ListDataQualityRulesetsRequest,
  ListDataQualityRulesetsResponse,
  ListDataQualityRulesetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataQualityRulesetsRequest,
  output: ListDataQualityRulesetsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityRulesets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataQualityStatisticAnnotationsError =
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Retrieve annotations for a data quality statistic.
 */
export const listDataQualityStatisticAnnotations: API.OperationMethod<
  ListDataQualityStatisticAnnotationsRequest,
  ListDataQualityStatisticAnnotationsResponse,
  ListDataQualityStatisticAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDataQualityStatisticAnnotationsRequest,
  output: ListDataQualityStatisticAnnotationsResponse,
  errors: [InternalServiceException, InvalidInputException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityStatisticAnnotations",
}));

export type ListDataQualityStatisticsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Retrieves a list of data quality statistics.
 */
export const listDataQualityStatistics: API.OperationMethod<
  ListDataQualityStatisticsRequest,
  ListDataQualityStatisticsResponse,
  ListDataQualityStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListDataQualityStatisticsRequest,
  output: ListDataQualityStatisticsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataQualityStatistics",
}));

export type ListDevEndpointsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the names of all `DevEndpoint` resources in this Amazon Web Services account, or the
 * resources with the specified tag. This operation allows you to see which resources are
 * available in your account, and their names.
 *
 * This operation takes the optional `Tags` field, which you can use as a filter on
 * the response so that tagged resources can be retrieved as a group. If you choose to use tags
 * filtering, only resources with the tag are retrieved.
 */
export const listDevEndpoints: API.PaginatedOperationMethod<
  ListDevEndpointsRequest,
  ListDevEndpointsResponse,
  ListDevEndpointsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDevEndpointsRequest,
  output: ListDevEndpointsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEntitiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | FederationSourceException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Returns the available entities supported by the connection type.
 */
export const listEntities: API.PaginatedOperationMethod<
  ListEntitiesRequest,
  ListEntitiesResponse,
  ListEntitiesError,
  Credentials | HttpClient.HttpClient,
  Entity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEntitiesRequest,
  output: ListEntitiesResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    FederationSourceException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Entities",
  } as const,
})) as any;

export type ListFormTypesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the form types defined in Glue Data Catalog.
 */
export const listFormTypes: API.PaginatedOperationMethod<
  ListFormTypesRequest,
  ListFormTypesResponse,
  ListFormTypesError,
  Credentials | HttpClient.HttpClient,
  FormTypeItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFormTypesRequest,
  output: ListFormTypesResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFormTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGlossariesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists business glossaries in Glue Data Catalog.
 */
export const listGlossaries: API.PaginatedOperationMethod<
  ListGlossariesRequest,
  ListGlossariesResponse,
  ListGlossariesError,
  Credentials | HttpClient.HttpClient,
  GlossaryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGlossariesRequest,
  output: ListGlossariesResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGlossaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGlossaryTermsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists glossary terms within a business glossary in Glue Data Catalog.
 */
export const listGlossaryTerms: API.PaginatedOperationMethod<
  ListGlossaryTermsRequest,
  ListGlossaryTermsResponse,
  ListGlossaryTermsError,
  Credentials | HttpClient.HttpClient,
  GlossaryTermItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListGlossaryTermsRequest,
  output: ListGlossaryTermsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGlossaryTerms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIntegrationResourcePropertiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List integration resource properties for a single customer. It supports the filters, maxRecords and markers.
 */
export const listIntegrationResourceProperties: API.OperationMethod<
  ListIntegrationResourcePropertiesRequest,
  ListIntegrationResourcePropertiesResponse,
  ListIntegrationResourcePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListIntegrationResourcePropertiesRequest,
  output: ListIntegrationResourcePropertiesResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntegrationResourceProperties",
}));

export type ListIterableFormsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the items in an iterable form on an asset in Glue Data Catalog. For example, lists the columns of a table asset.
 */
export const listIterableForms: API.PaginatedOperationMethod<
  ListIterableFormsRequest,
  ListIterableFormsResponse,
  ListIterableFormsError,
  Credentials | HttpClient.HttpClient,
  IterableFormListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIterableFormsRequest,
  output: ListIterableFormsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIterableForms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the names of all job resources in this Amazon Web Services account, or the resources with the specified tag. This operation allows you to see which resources are available in your account, and their names.
 *
 * This operation takes the optional `Tags` field, which you can use as a filter on
 * the response so that tagged resources can be retrieved as a group. If you choose to use tags
 * filtering, only resources with the tag are retrieved.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  NameString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobNames",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMaterializedViewRefreshTaskRunsError =
  | AccessDeniedException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * List all task runs for a particular account.
 */
export const listMaterializedViewRefreshTaskRuns: API.PaginatedOperationMethod<
  ListMaterializedViewRefreshTaskRunsRequest,
  ListMaterializedViewRefreshTaskRunsResponse,
  ListMaterializedViewRefreshTaskRunsError,
  Credentials | HttpClient.HttpClient,
  MaterializedViewRefreshTaskRun
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMaterializedViewRefreshTaskRunsRequest,
  output: ListMaterializedViewRefreshTaskRunsResponse,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMaterializedViewRefreshTaskRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MaterializedViewRefreshTaskRuns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMLTransformsError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves a sortable, filterable list of existing Glue machine learning transforms in this Amazon Web Services account,
 * or the resources with the specified tag. This operation takes the optional `Tags` field, which you can use as
 * a filter of the responses so that tagged resources can be retrieved as a group. If you choose to use tag
 * filtering, only resources with the tags are retrieved.
 */
export const listMLTransforms: API.PaginatedOperationMethod<
  ListMLTransformsRequest,
  ListMLTransformsResponse,
  ListMLTransformsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMLTransformsRequest,
  output: ListMLTransformsResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMLTransforms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRegistriesError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of registries that you have created, with minimal registry information. Registries in the `Deleting` status will not be included in the results. Empty results will be returned if there are no registries available.
 */
export const listRegistries: API.PaginatedOperationMethod<
  ListRegistriesInput,
  ListRegistriesResponse,
  ListRegistriesError,
  Credentials | HttpClient.HttpClient,
  RegistryListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRegistriesInput,
  output: ListRegistriesResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegistries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Registries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSchemasError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of schemas with minimal details. Schemas in Deleting status will not be included in the results. Empty results will be returned if there are no schemas available.
 *
 * When the `RegistryId` is not provided, all the schemas across registries will be part of the API response.
 */
export const listSchemas: API.PaginatedOperationMethod<
  ListSchemasInput,
  ListSchemasResponse,
  ListSchemasError,
  Credentials | HttpClient.HttpClient,
  SchemaListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSchemasInput,
  output: ListSchemasResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemas",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Schemas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSchemaVersionsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Returns a list of schema versions that you have created, with minimal information. Schema versions in Deleted status will not be included in the results. Empty results will be returned if there are no schema versions available.
 */
export const listSchemaVersions: API.PaginatedOperationMethod<
  ListSchemaVersionsInput,
  ListSchemaVersionsResponse,
  ListSchemaVersionsError,
  Credentials | HttpClient.HttpClient,
  SchemaVersionListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSchemaVersionsInput,
  output: ListSchemaVersionsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemaVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Schemas",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieve a list of sessions.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionsRequest,
  output: ListSessionsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStatementsError =
  | AccessDeniedException
  | EntityNotFoundException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists statements for the session.
 */
export const listStatements: API.OperationMethod<
  ListStatementsRequest,
  ListStatementsResponse,
  ListStatementsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListStatementsRequest,
  output: ListStatementsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStatements",
}));

export type ListTableOptimizerRunsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the history of previous optimizer runs for a specific table.
 */
export const listTableOptimizerRuns: API.PaginatedOperationMethod<
  ListTableOptimizerRunsRequest,
  ListTableOptimizerRunsResponse,
  ListTableOptimizerRunsError,
  Credentials | HttpClient.HttpClient,
  TableOptimizerRun
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTableOptimizerRunsRequest,
  output: ListTableOptimizerRunsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTableOptimizerRuns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TableOptimizerRuns",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTriggersError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Retrieves the names of all trigger resources in this Amazon Web Services account, or the resources with the specified tag. This operation allows you to see which resources are available in your account, and their names.
 *
 * This operation takes the optional `Tags` field, which you can use as a filter on
 * the response so that tagged resources can be retrieved as a group. If you choose to use tags
 * filtering, only resources with the tag are retrieved.
 */
export const listTriggers: API.PaginatedOperationMethod<
  ListTriggersRequest,
  ListTriggersResponse,
  ListTriggersError,
  Credentials | HttpClient.HttpClient,
  NameString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTriggersRequest,
  output: ListTriggersResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTriggers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TriggerNames",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListUsageProfilesError =
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | CommonErrors;
/**
 * List all the Glue usage profiles.
 */
export const listUsageProfiles: API.PaginatedOperationMethod<
  ListUsageProfilesRequest,
  ListUsageProfilesResponse,
  ListUsageProfilesError,
  Credentials | HttpClient.HttpClient,
  UsageProfileDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUsageProfilesRequest,
  output: ListUsageProfilesResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUsageProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Profiles",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkflowsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Lists names of workflows created in the account.
 */
export const listWorkflows: API.PaginatedOperationMethod<
  ListWorkflowsRequest,
  ListWorkflowsResponse,
  ListWorkflowsError,
  Credentials | HttpClient.HttpClient,
  NameString
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkflowsRequest,
  output: ListWorkflowsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkflows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Workflows",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ModifyIntegrationError =
  | AccessDeniedException
  | ConflictException
  | EntityNotFoundException
  | IntegrationConflictOperationFault
  | IntegrationNotFoundFault
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | InvalidIntegrationStateFault
  | InvalidStateException
  | ValidationException
  | CommonErrors;
/**
 * Modifies a Zero-ETL integration in the caller's account.
 */
export const modifyIntegration: API.OperationMethod<
  ModifyIntegrationRequest,
  ModifyIntegrationResponse,
  ModifyIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ModifyIntegrationRequest,
  output: ModifyIntegrationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    EntityNotFoundException,
    IntegrationConflictOperationFault,
    IntegrationNotFoundFault,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    InvalidIntegrationStateFault,
    InvalidStateException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyIntegration",
}));

export type PutAssetError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates an asset in Glue Data Catalog. If the asset already exists, this operation updates it; otherwise, a new asset is created.
 */
export const putAsset: API.OperationMethod<
  PutAssetRequest,
  PutAssetResponse,
  PutAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAssetRequest,
  output: PutAssetResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAsset",
}));

export type PutAssetTypeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates an asset type in Glue Data Catalog. An asset type defines the structure of assets by specifying which forms they include. If an asset type with the given name already exists, it is updated.
 */
export const putAssetType: API.OperationMethod<
  PutAssetTypeRequest,
  PutAssetTypeResponse,
  PutAssetTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAssetTypeRequest,
  output: PutAssetTypeResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAssetType",
}));

export type PutAttachmentError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Attaches a form to an asset or an iterable form item in Glue Data Catalog. If an attachment with the same name already exists, it is overwritten.
 */
export const putAttachment: API.OperationMethod<
  PutAttachmentRequest,
  PutAttachmentResponse,
  PutAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAttachmentRequest,
  output: PutAttachmentResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAttachment",
}));

export type PutDataCatalogEncryptionSettingsError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Sets the security configuration for a specified catalog. After the configuration has been
 * set, the specified encryption is applied to every catalog write thereafter.
 */
export const putDataCatalogEncryptionSettings: API.OperationMethod<
  PutDataCatalogEncryptionSettingsRequest,
  PutDataCatalogEncryptionSettingsResponse,
  PutDataCatalogEncryptionSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDataCatalogEncryptionSettingsRequest,
  output: PutDataCatalogEncryptionSettingsResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataCatalogEncryptionSettings",
}));

export type PutDataQualityProfileAnnotationError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Annotate all datapoints for a Profile.
 */
export const putDataQualityProfileAnnotation: API.OperationMethod<
  PutDataQualityProfileAnnotationRequest,
  PutDataQualityProfileAnnotationResponse,
  PutDataQualityProfileAnnotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDataQualityProfileAnnotationRequest,
  output: PutDataQualityProfileAnnotationResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDataQualityProfileAnnotation",
}));

export type PutFormTypeError =
  | AccessDeniedException
  | ConcurrentModificationException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates a form type in Glue Data Catalog. A form type defines the schema for structured metadata that can be attached to assets.
 */
export const putFormType: API.OperationMethod<
  PutFormTypeRequest,
  PutFormTypeResponse,
  PutFormTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutFormTypeRequest,
  output: PutFormTypeResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFormType",
}));

export type PutResourcePolicyError =
  | ConditionCheckFailureException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Sets the Data Catalog resource policy for access control.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResponse,
  errors: [
    ConditionCheckFailureException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type PutSchemaVersionMetadataError =
  | AccessDeniedException
  | AlreadyExistsException
  | EntityNotFoundException
  | InvalidInputException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Puts the metadata key value pair for a specified schema version ID. A maximum of 10 key value pairs will be allowed per schema version. They can be added over one or more calls.
 */
export const putSchemaVersionMetadata: API.OperationMethod<
  PutSchemaVersionMetadataInput,
  PutSchemaVersionMetadataResponse,
  PutSchemaVersionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSchemaVersionMetadataInput,
  output: PutSchemaVersionMetadataResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    EntityNotFoundException,
    InvalidInputException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSchemaVersionMetadata",
}));

export type PutWorkflowRunPropertiesError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Puts the specified workflow run properties for the given workflow run. If a property already exists for the specified run, then it overrides the value otherwise adds the property to existing properties.
 */
export const putWorkflowRunProperties: API.OperationMethod<
  PutWorkflowRunPropertiesRequest,
  PutWorkflowRunPropertiesResponse,
  PutWorkflowRunPropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutWorkflowRunPropertiesRequest,
  output: PutWorkflowRunPropertiesResponse,
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutWorkflowRunProperties",
}));

export type QuerySchemaVersionMetadataError =
  | AccessDeniedException
  | EntityNotFoundException
  | InvalidInputException
  | CommonErrors;
/**
 * Queries for the schema version metadata information.
 */
export const querySchemaVersionMetadata: API.OperationMethod<
  QuerySchemaVersionMetadataInput,
  QuerySchemaVersionMetadataResponse,
  QuerySchemaVersionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: QuerySchemaVersionMetadataInput,
  output: QuerySchemaVersionMetadataResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QuerySchemaVersionMetadata",
}));

export type RegisterConnectionTypeError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Registers a custom connection type in Glue based on the configuration provided. This operation enables customers to configure custom connectors for any data source with REST-based APIs, eliminating the need for building custom Lambda connectors.
 *
 * The registered connection type stores details about how requests and responses are interpreted by REST sources, including connection properties, authentication configuration, and REST configuration with entity definitions. Once registered, customers can create connections using this connection type and work with them the same way as natively supported Glue connectors.
 *
 * Supports multiple authentication types including Basic, OAuth2 (Client Credentials, JWT Bearer, Authorization Code), and Custom Auth configurations.
 */
export const registerConnectionType: API.OperationMethod<
  RegisterConnectionTypeRequest,
  RegisterConnectionTypeResponse,
  RegisterConnectionTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterConnectionTypeRequest,
  output: RegisterConnectionTypeResponse,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterConnectionType",
}));

export type RegisterSchemaVersionError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Adds a new version to the existing schema. Returns an error if new version of schema does not meet the compatibility requirements of the schema set. This API will not create a new schema set and will return a 404 error if the schema set is not already present in the Schema Registry.
 *
 * If this is the first schema definition to be registered in the Schema Registry, this API will store the schema version and return immediately. Otherwise, this call has the potential to run longer than other operations due to compatibility modes. You can call the `GetSchemaVersion` API with the `SchemaVersionId` to check compatibility modes.
 *
 * If the same schema definition is already stored in Schema Registry as a version, the schema ID of the existing schema is returned to the caller.
 */
export const registerSchemaVersion: API.OperationMethod<
  RegisterSchemaVersionInput,
  RegisterSchemaVersionResponse,
  RegisterSchemaVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RegisterSchemaVersionInput,
  output: RegisterSchemaVersionResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterSchemaVersion",
}));

export type RemoveSchemaVersionMetadataError =
  | AccessDeniedException
  | EntityNotFoundException
  | InvalidInputException
  | CommonErrors;
/**
 * Removes a key value pair from the schema version metadata for the specified schema version ID.
 */
export const removeSchemaVersionMetadata: API.OperationMethod<
  RemoveSchemaVersionMetadataInput,
  RemoveSchemaVersionMetadataResponse,
  RemoveSchemaVersionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveSchemaVersionMetadataInput,
  output: RemoveSchemaVersionMetadataResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveSchemaVersionMetadata",
}));

export type ResetJobBookmarkError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Resets a bookmark entry.
 *
 * For more information about enabling and using job bookmarks, see:
 *
 * - Tracking processed data using job bookmarks
 *
 * - Job parameters used by Glue
 *
 * - Job structure
 */
export const resetJobBookmark: API.OperationMethod<
  ResetJobBookmarkRequest,
  ResetJobBookmarkResponse,
  ResetJobBookmarkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetJobBookmarkRequest,
  output: ResetJobBookmarkResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResetJobBookmark",
}));

export type ResumeWorkflowRunError =
  | ConcurrentRunsExceededException
  | EntityNotFoundException
  | IllegalWorkflowStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Restarts selected nodes of a previous partially completed workflow run and resumes the workflow run. The selected nodes and all nodes that are downstream from the selected nodes are run.
 */
export const resumeWorkflowRun: API.OperationMethod<
  ResumeWorkflowRunRequest,
  ResumeWorkflowRunResponse,
  ResumeWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResumeWorkflowRunRequest,
  output: ResumeWorkflowRunResponse,
  errors: [
    ConcurrentRunsExceededException,
    EntityNotFoundException,
    IllegalWorkflowStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeWorkflowRun",
}));

export type RunStatementError =
  | AccessDeniedException
  | EntityNotFoundException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | SessionBusyException
  | ValidationException
  | CommonErrors;
/**
 * Executes the statement.
 */
export const runStatement: API.OperationMethod<
  RunStatementRequest,
  RunStatementResponse,
  RunStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RunStatementRequest,
  output: RunStatementResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    SessionBusyException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RunStatement",
}));

export type SearchAssetsError =
  | AccessDeniedException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Searches for assets in Glue Data Catalog using full-text search, filters, sorting, and aggregations. Returns matching assets with relevance-ranked results.
 */
export const searchAssets: API.PaginatedOperationMethod<
  SearchAssetsInput,
  SearchAssetsOutput,
  SearchAssetsError,
  Credentials | HttpClient.HttpClient,
  SearchResultItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchAssetsInput,
  output: SearchAssetsOutput,
  errors: [
    AccessDeniedException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAssets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SearchTablesError =
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Searches a set of tables based on properties in the table metadata as well as on the parent database. You can search against text or filter conditions.
 *
 * You can only get tables that you have access to based on the security policies defined in Lake Formation. You need at least a read-only access to the table for it to be returned. If you do not have access to all the columns in the table, these columns will not be searched against when returning the list of tables back to you. If you have access to the columns but not the data in the columns, those columns and the associated metadata for those columns will be included in the search.
 */
export const searchTables: API.PaginatedOperationMethod<
  SearchTablesRequest,
  SearchTablesResponse,
  SearchTablesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchTablesRequest,
  output: SearchTablesResponse,
  errors: [
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchTables",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartBlueprintRunError =
  | EntityNotFoundException
  | IllegalBlueprintStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Starts a new run of the specified blueprint.
 */
export const startBlueprintRun: API.OperationMethod<
  StartBlueprintRunRequest,
  StartBlueprintRunResponse,
  StartBlueprintRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartBlueprintRunRequest,
  output: StartBlueprintRunResponse,
  errors: [
    EntityNotFoundException,
    IllegalBlueprintStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBlueprintRun",
}));

export type StartColumnStatisticsTaskRunError =
  | AccessDeniedException
  | ColumnStatisticsTaskRunningException
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Starts a column statistics task run, for a specified table and columns.
 */
export const startColumnStatisticsTaskRun: API.OperationMethod<
  StartColumnStatisticsTaskRunRequest,
  StartColumnStatisticsTaskRunResponse,
  StartColumnStatisticsTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartColumnStatisticsTaskRunRequest,
  output: StartColumnStatisticsTaskRunResponse,
  errors: [
    AccessDeniedException,
    ColumnStatisticsTaskRunningException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartColumnStatisticsTaskRun",
}));

export type StartColumnStatisticsTaskRunScheduleError =
  | AccessDeniedException
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Starts a column statistics task run schedule.
 */
export const startColumnStatisticsTaskRunSchedule: API.OperationMethod<
  StartColumnStatisticsTaskRunScheduleRequest,
  StartColumnStatisticsTaskRunScheduleResponse,
  StartColumnStatisticsTaskRunScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartColumnStatisticsTaskRunScheduleRequest,
  output: StartColumnStatisticsTaskRunScheduleResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartColumnStatisticsTaskRunSchedule",
}));

export type StartCrawlerError =
  | CrawlerRunningException
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Starts a crawl using the specified crawler, regardless
 * of what is scheduled. If the crawler is already running, returns a
 * CrawlerRunningException.
 */
export const startCrawler: API.OperationMethod<
  StartCrawlerRequest,
  StartCrawlerResponse,
  StartCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCrawlerRequest,
  output: StartCrawlerResponse,
  errors: [
    CrawlerRunningException,
    EntityNotFoundException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCrawler",
}));

export type StartCrawlerScheduleError =
  | EntityNotFoundException
  | NoScheduleException
  | OperationTimeoutException
  | SchedulerRunningException
  | SchedulerTransitioningException
  | CommonErrors;
/**
 * Changes the schedule state of the specified crawler to
 * `SCHEDULED`, unless the crawler is already running or the
 * schedule state is already `SCHEDULED`.
 */
export const startCrawlerSchedule: API.OperationMethod<
  StartCrawlerScheduleRequest,
  StartCrawlerScheduleResponse,
  StartCrawlerScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCrawlerScheduleRequest,
  output: StartCrawlerScheduleResponse,
  errors: [
    EntityNotFoundException,
    NoScheduleException,
    OperationTimeoutException,
    SchedulerRunningException,
    SchedulerTransitioningException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCrawlerSchedule",
}));

export type StartDataQualityRuleRecommendationRunError =
  | ConflictException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Starts a recommendation run that is used to generate rules when you don't know what rules to write. Glue Data Quality analyzes the data and comes up with recommendations for a potential ruleset. You can then triage the ruleset and modify the generated ruleset to your liking.
 *
 * Recommendation runs are automatically deleted after 90 days.
 */
export const startDataQualityRuleRecommendationRun: API.OperationMethod<
  StartDataQualityRuleRecommendationRunRequest,
  StartDataQualityRuleRecommendationRunResponse,
  StartDataQualityRuleRecommendationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDataQualityRuleRecommendationRunRequest,
  output: StartDataQualityRuleRecommendationRunResponse,
  errors: [
    ConflictException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataQualityRuleRecommendationRun",
}));

export type StartDataQualityRulesetEvaluationRunError =
  | ConflictException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Once you have a ruleset definition (either recommended or your own), you call this operation to evaluate the ruleset against a data source (Glue table). The evaluation computes results which you can retrieve with the `GetDataQualityResult` API.
 */
export const startDataQualityRulesetEvaluationRun: API.OperationMethod<
  StartDataQualityRulesetEvaluationRunRequest,
  StartDataQualityRulesetEvaluationRunResponse,
  StartDataQualityRulesetEvaluationRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDataQualityRulesetEvaluationRunRequest,
  output: StartDataQualityRulesetEvaluationRunResponse,
  errors: [
    ConflictException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDataQualityRulesetEvaluationRun",
}));

export type StartExportLabelsTaskRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Begins an asynchronous task to export all labeled data for a particular transform. This
 * task is the only label-related API call that is not part of the typical active learning
 * workflow. You typically use `StartExportLabelsTaskRun` when you want to work with
 * all of your existing labels at the same time, such as when you want to remove or change labels
 * that were previously submitted as truth. This API operation accepts the
 * `TransformId` whose labels you want to export and an Amazon Simple Storage
 * Service (Amazon S3) path to export the labels to. The operation returns a
 * `TaskRunId`. You can check on the status of your task run by calling the
 * `GetMLTaskRun` API.
 */
export const startExportLabelsTaskRun: API.OperationMethod<
  StartExportLabelsTaskRunRequest,
  StartExportLabelsTaskRunResponse,
  StartExportLabelsTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartExportLabelsTaskRunRequest,
  output: StartExportLabelsTaskRunResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExportLabelsTaskRun",
}));

export type StartImportLabelsTaskRunError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Enables you to provide additional labels (examples of truth) to be used to teach the
 * machine learning transform and improve its quality. This API operation is generally used as
 * part of the active learning workflow that starts with the
 * `StartMLLabelingSetGenerationTaskRun` call and that ultimately results in
 * improving the quality of your machine learning transform.
 *
 * After the `StartMLLabelingSetGenerationTaskRun` finishes, Glue machine learning
 * will have generated a series of questions for humans to answer. (Answering these questions is
 * often called 'labeling' in the machine learning workflows). In the case of the
 * `FindMatches` transform, these questions are of the form, “What is the correct
 * way to group these rows together into groups composed entirely of matching records?” After the
 * labeling process is finished, users upload their answers/labels with a call to
 * `StartImportLabelsTaskRun`. After `StartImportLabelsTaskRun` finishes,
 * all future runs of the machine learning transform use the new and improved labels and perform
 * a higher-quality transformation.
 *
 * By default, `StartMLLabelingSetGenerationTaskRun` continually learns from and
 * combines all labels that you upload unless you set `Replace` to true. If you set
 * `Replace` to true, `StartImportLabelsTaskRun` deletes and forgets all
 * previously uploaded labels and learns only from the exact set that you upload. Replacing
 * labels can be helpful if you realize that you previously uploaded incorrect labels, and you
 * believe that they are having a negative effect on your transform quality.
 *
 * You can check on the status of your task run by calling the `GetMLTaskRun`
 * operation.
 */
export const startImportLabelsTaskRun: API.OperationMethod<
  StartImportLabelsTaskRunRequest,
  StartImportLabelsTaskRunResponse,
  StartImportLabelsTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartImportLabelsTaskRunRequest,
  output: StartImportLabelsTaskRunResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportLabelsTaskRun",
}));

export type StartJobRunError =
  | ConcurrentRunsExceededException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | GlueRoleNotAssumable
  | CommonErrors;
/**
 * Starts a job run using a job definition.
 */
export const startJobRun: API.OperationMethod<
  StartJobRunRequest,
  StartJobRunResponse,
  StartJobRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartJobRunRequest,
  output: StartJobRunResponse,
  errors: [
    ConcurrentRunsExceededException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
    GlueRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJobRun",
}));

export type StartMaterializedViewRefreshTaskRunError =
  | AccessDeniedException
  | EntityNotFoundException
  | InvalidInputException
  | MaterializedViewRefreshTaskRunningException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Starts a materialized view refresh task run, for a specified table and columns.
 */
export const startMaterializedViewRefreshTaskRun: API.OperationMethod<
  StartMaterializedViewRefreshTaskRunRequest,
  StartMaterializedViewRefreshTaskRunResponse,
  StartMaterializedViewRefreshTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMaterializedViewRefreshTaskRunRequest,
  output: StartMaterializedViewRefreshTaskRunResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
    MaterializedViewRefreshTaskRunningException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMaterializedViewRefreshTaskRun",
}));

export type StartMLEvaluationTaskRunError =
  | ConcurrentRunsExceededException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | MLTransformNotReadyException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Starts a task to estimate the quality of the transform.
 *
 * When you provide label sets as examples of truth, Glue machine learning uses some of
 * those examples to learn from them. The rest of the labels are used as a test to estimate
 * quality.
 *
 * Returns a unique identifier for the run. You can call `GetMLTaskRun` to get more
 * information about the stats of the `EvaluationTaskRun`.
 */
export const startMLEvaluationTaskRun: API.OperationMethod<
  StartMLEvaluationTaskRunRequest,
  StartMLEvaluationTaskRunResponse,
  StartMLEvaluationTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMLEvaluationTaskRunRequest,
  output: StartMLEvaluationTaskRunResponse,
  errors: [
    ConcurrentRunsExceededException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    MLTransformNotReadyException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMLEvaluationTaskRun",
}));

export type StartMLLabelingSetGenerationTaskRunError =
  | ConcurrentRunsExceededException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Starts the active learning workflow for your machine learning transform to improve the
 * transform's quality by generating label sets and adding labels.
 *
 * When the `StartMLLabelingSetGenerationTaskRun` finishes, Glue will have
 * generated a "labeling set" or a set of questions for humans to answer.
 *
 * In the case of the `FindMatches` transform, these questions are of the form,
 * “What is the correct way to group these rows together into groups composed entirely of
 * matching records?”
 *
 * After the labeling process is finished, you can upload your labels with a call to
 * `StartImportLabelsTaskRun`. After `StartImportLabelsTaskRun` finishes,
 * all future runs of the machine learning transform will use the new and improved labels and
 * perform a higher-quality transformation.
 *
 * Note: The role used to write the generated labeling set to the `OutputS3Path` is the role
 * associated with the Machine Learning Transform, specified in the `CreateMLTransform` API.
 */
export const startMLLabelingSetGenerationTaskRun: API.OperationMethod<
  StartMLLabelingSetGenerationTaskRunRequest,
  StartMLLabelingSetGenerationTaskRunResponse,
  StartMLLabelingSetGenerationTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMLLabelingSetGenerationTaskRunRequest,
  output: StartMLLabelingSetGenerationTaskRunResponse,
  errors: [
    ConcurrentRunsExceededException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMLLabelingSetGenerationTaskRun",
}));

export type StartTriggerError =
  | ConcurrentRunsExceededException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Starts an existing trigger. See Triggering
 * Jobs for information about how different types of trigger are
 * started.
 */
export const startTrigger: API.OperationMethod<
  StartTriggerRequest,
  StartTriggerResponse,
  StartTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTriggerRequest,
  output: StartTriggerResponse,
  errors: [
    ConcurrentRunsExceededException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTrigger",
}));

export type StartWorkflowRunError =
  | ConcurrentRunsExceededException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Starts a new run of the specified workflow.
 */
export const startWorkflowRun: API.OperationMethod<
  StartWorkflowRunRequest,
  StartWorkflowRunResponse,
  StartWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartWorkflowRunRequest,
  output: StartWorkflowRunResponse,
  errors: [
    ConcurrentRunsExceededException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartWorkflowRun",
}));

export type StopColumnStatisticsTaskRunError =
  | ColumnStatisticsTaskNotRunningException
  | ColumnStatisticsTaskStoppingException
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops a task run for the specified table.
 */
export const stopColumnStatisticsTaskRun: API.OperationMethod<
  StopColumnStatisticsTaskRunRequest,
  StopColumnStatisticsTaskRunResponse,
  StopColumnStatisticsTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopColumnStatisticsTaskRunRequest,
  output: StopColumnStatisticsTaskRunResponse,
  errors: [
    ColumnStatisticsTaskNotRunningException,
    ColumnStatisticsTaskStoppingException,
    EntityNotFoundException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopColumnStatisticsTaskRun",
}));

export type StopColumnStatisticsTaskRunScheduleError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops a column statistics task run schedule.
 */
export const stopColumnStatisticsTaskRunSchedule: API.OperationMethod<
  StopColumnStatisticsTaskRunScheduleRequest,
  StopColumnStatisticsTaskRunScheduleResponse,
  StopColumnStatisticsTaskRunScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopColumnStatisticsTaskRunScheduleRequest,
  output: StopColumnStatisticsTaskRunScheduleResponse,
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopColumnStatisticsTaskRunSchedule",
}));

export type StopCrawlerError =
  | CrawlerNotRunningException
  | CrawlerStoppingException
  | EntityNotFoundException
  | OperationTimeoutException
  | CommonErrors;
/**
 * If the specified crawler is running, stops the crawl.
 */
export const stopCrawler: API.OperationMethod<
  StopCrawlerRequest,
  StopCrawlerResponse,
  StopCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopCrawlerRequest,
  output: StopCrawlerResponse,
  errors: [
    CrawlerNotRunningException,
    CrawlerStoppingException,
    EntityNotFoundException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCrawler",
}));

export type StopCrawlerScheduleError =
  | EntityNotFoundException
  | OperationTimeoutException
  | SchedulerNotRunningException
  | SchedulerTransitioningException
  | CommonErrors;
/**
 * Sets the schedule state of the specified crawler to
 * `NOT_SCHEDULED`, but does not stop the crawler if it is
 * already running.
 */
export const stopCrawlerSchedule: API.OperationMethod<
  StopCrawlerScheduleRequest,
  StopCrawlerScheduleResponse,
  StopCrawlerScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopCrawlerScheduleRequest,
  output: StopCrawlerScheduleResponse,
  errors: [
    EntityNotFoundException,
    OperationTimeoutException,
    SchedulerNotRunningException,
    SchedulerTransitioningException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCrawlerSchedule",
}));

export type StopMaterializedViewRefreshTaskRunError =
  | AccessDeniedException
  | InvalidInputException
  | MaterializedViewRefreshTaskNotRunningException
  | MaterializedViewRefreshTaskStoppingException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops a materialized view refresh task run, for a specified table and columns.
 */
export const stopMaterializedViewRefreshTaskRun: API.OperationMethod<
  StopMaterializedViewRefreshTaskRunRequest,
  StopMaterializedViewRefreshTaskRunResponse,
  StopMaterializedViewRefreshTaskRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopMaterializedViewRefreshTaskRunRequest,
  output: StopMaterializedViewRefreshTaskRunResponse,
  errors: [
    AccessDeniedException,
    InvalidInputException,
    MaterializedViewRefreshTaskNotRunningException,
    MaterializedViewRefreshTaskStoppingException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMaterializedViewRefreshTaskRun",
}));

export type StopSessionError =
  | AccessDeniedException
  | ConcurrentModificationException
  | IllegalSessionStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops the session.
 */
export const stopSession: API.OperationMethod<
  StopSessionRequest,
  StopSessionResponse,
  StopSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopSessionRequest,
  output: StopSessionResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    IllegalSessionStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSession",
}));

export type StopTriggerError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops a specified trigger.
 */
export const stopTrigger: API.OperationMethod<
  StopTriggerRequest,
  StopTriggerResponse,
  StopTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopTriggerRequest,
  output: StopTriggerResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTrigger",
}));

export type StopWorkflowRunError =
  | EntityNotFoundException
  | IllegalWorkflowStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Stops the execution of the specified workflow run.
 */
export const stopWorkflowRun: API.OperationMethod<
  StopWorkflowRunRequest,
  StopWorkflowRunResponse,
  StopWorkflowRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopWorkflowRunRequest,
  output: StopWorkflowRunResponse,
  errors: [
    EntityNotFoundException,
    IllegalWorkflowStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopWorkflowRun",
}));

export type TagResourceError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Adds tags to a resource. A tag is a label you can assign to an Amazon Web Services resource.
 * In Glue, you can tag only certain resources. For information about what
 * resources you can tag, see Amazon Web Services Tags in Glue.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TestConnectionError =
  | AccessDeniedException
  | ConflictException
  | EntityNotFoundException
  | FederationSourceException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Tests a connection to a service to validate the service credentials that you provide.
 *
 * You can either provide an existing connection name or a `TestConnectionInput` for testing a non-existing connection input. Providing both at the same time will cause an error.
 *
 * If the action is successful, the service sends back an HTTP 200 response.
 */
export const testConnection: API.OperationMethod<
  TestConnectionRequest,
  TestConnectionResponse,
  TestConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestConnectionRequest,
  output: TestConnectionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    EntityNotFoundException,
    FederationSourceException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestConnection",
}));

export type UntagResourceError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAssetError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the name and description of an existing asset in Glue Data Catalog. Only the fields that you provide are updated.
 */
export const updateAsset: API.OperationMethod<
  UpdateAssetRequest,
  UpdateAssetResponse,
  UpdateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAssetRequest,
  output: UpdateAssetResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAsset",
}));

export type UpdateBlueprintError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | IllegalBlueprintStateException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates a registered blueprint.
 */
export const updateBlueprint: API.OperationMethod<
  UpdateBlueprintRequest,
  UpdateBlueprintResponse,
  UpdateBlueprintError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBlueprintRequest,
  output: UpdateBlueprintResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    IllegalBlueprintStateException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBlueprint",
}));

export type UpdateCatalogError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates an existing catalog's properties in the Glue Data Catalog.
 */
export const updateCatalog: API.OperationMethod<
  UpdateCatalogRequest,
  UpdateCatalogResponse,
  UpdateCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCatalogRequest,
  output: UpdateCatalogResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCatalog",
}));

export type UpdateClassifierError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | VersionMismatchException
  | CommonErrors;
/**
 * Modifies an existing classifier (a `GrokClassifier`,
 * an `XMLClassifier`, a `JsonClassifier`, or a `CsvClassifier`, depending on
 * which field is present).
 */
export const updateClassifier: API.OperationMethod<
  UpdateClassifierRequest,
  UpdateClassifierResponse,
  UpdateClassifierError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateClassifierRequest,
  output: UpdateClassifierResponse,
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateClassifier",
}));

export type UpdateColumnStatisticsForPartitionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Creates or updates partition statistics of columns.
 *
 * The Identity and Access Management (IAM) permission required for this operation is `UpdatePartition`.
 */
export const updateColumnStatisticsForPartition: API.OperationMethod<
  UpdateColumnStatisticsForPartitionRequest,
  UpdateColumnStatisticsForPartitionResponse,
  UpdateColumnStatisticsForPartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateColumnStatisticsForPartitionRequest,
  output: UpdateColumnStatisticsForPartitionResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateColumnStatisticsForPartition",
}));

export type UpdateColumnStatisticsForTableError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Creates or updates table statistics of columns.
 *
 * The Identity and Access Management (IAM) permission required for this operation is `UpdateTable`.
 */
export const updateColumnStatisticsForTable: API.OperationMethod<
  UpdateColumnStatisticsForTableRequest,
  UpdateColumnStatisticsForTableResponse,
  UpdateColumnStatisticsForTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateColumnStatisticsForTableRequest,
  output: UpdateColumnStatisticsForTableResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateColumnStatisticsForTable",
}));

export type UpdateColumnStatisticsTaskSettingsError =
  | AccessDeniedException
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | VersionMismatchException
  | CommonErrors;
/**
 * Updates settings for a column statistics task.
 */
export const updateColumnStatisticsTaskSettings: API.OperationMethod<
  UpdateColumnStatisticsTaskSettingsRequest,
  UpdateColumnStatisticsTaskSettingsResponse,
  UpdateColumnStatisticsTaskSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateColumnStatisticsTaskSettingsRequest,
  output: UpdateColumnStatisticsTaskSettingsResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateColumnStatisticsTaskSettings",
}));

export type UpdateConnectionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates a connection definition in the Data Catalog.
 */
export const updateConnection: API.OperationMethod<
  UpdateConnectionRequest,
  UpdateConnectionResponse,
  UpdateConnectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConnectionRequest,
  output: UpdateConnectionResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConnection",
}));

export type UpdateCrawlerError =
  | CrawlerRunningException
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | VersionMismatchException
  | GlueRoleNotAssumable
  | GlueS3TargetNotReady
  | CommonErrors;
/**
 * Updates a crawler. If a crawler is
 * running, you must stop it using `StopCrawler` before updating
 * it.
 */
export const updateCrawler: API.OperationMethod<
  UpdateCrawlerRequest,
  UpdateCrawlerResponse,
  UpdateCrawlerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCrawlerRequest,
  output: UpdateCrawlerResponse,
  errors: [
    CrawlerRunningException,
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    VersionMismatchException,
    GlueRoleNotAssumable,
    GlueS3TargetNotReady,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCrawler",
}));

export type UpdateCrawlerScheduleError =
  | EntityNotFoundException
  | InvalidInputException
  | OperationTimeoutException
  | SchedulerTransitioningException
  | VersionMismatchException
  | CommonErrors;
/**
 * Updates the schedule of a crawler using a `cron` expression.
 */
export const updateCrawlerSchedule: API.OperationMethod<
  UpdateCrawlerScheduleRequest,
  UpdateCrawlerScheduleResponse,
  UpdateCrawlerScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCrawlerScheduleRequest,
  output: UpdateCrawlerScheduleResponse,
  errors: [
    EntityNotFoundException,
    InvalidInputException,
    OperationTimeoutException,
    SchedulerTransitioningException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCrawlerSchedule",
}));

export type UpdateDatabaseError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates an existing database definition in a Data Catalog.
 */
export const updateDatabase: API.OperationMethod<
  UpdateDatabaseRequest,
  UpdateDatabaseResponse,
  UpdateDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDatabaseRequest,
  output: UpdateDatabaseResponse,
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDatabase",
}));

export type UpdateDataQualityRulesetError =
  | AlreadyExistsException
  | EntityNotFoundException
  | IdempotentParameterMismatchException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Updates the specified data quality ruleset.
 */
export const updateDataQualityRuleset: API.OperationMethod<
  UpdateDataQualityRulesetRequest,
  UpdateDataQualityRulesetResponse,
  UpdateDataQualityRulesetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataQualityRulesetRequest,
  output: UpdateDataQualityRulesetResponse,
  errors: [
    AlreadyExistsException,
    EntityNotFoundException,
    IdempotentParameterMismatchException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataQualityRuleset",
}));

export type UpdateDevEndpointError =
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified development endpoint.
 */
export const updateDevEndpoint: API.OperationMethod<
  UpdateDevEndpointRequest,
  UpdateDevEndpointResponse,
  UpdateDevEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDevEndpointRequest,
  output: UpdateDevEndpointResponse,
  errors: [
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDevEndpoint",
}));

export type UpdateGlossaryError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a business glossary in Glue Data Catalog.
 */
export const updateGlossary: API.OperationMethod<
  UpdateGlossaryRequest,
  UpdateGlossaryResponse,
  UpdateGlossaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGlossaryRequest,
  output: UpdateGlossaryResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlossary",
}));

export type UpdateGlossaryTermError =
  | AccessDeniedException
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a glossary term in Glue Data Catalog.
 */
export const updateGlossaryTerm: API.OperationMethod<
  UpdateGlossaryTermRequest,
  UpdateGlossaryTermResponse,
  UpdateGlossaryTermError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGlossaryTermRequest,
  output: UpdateGlossaryTermResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlossaryTerm",
}));

export type UpdateGlueIdentityCenterConfigurationError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates the existing Glue Identity Center configuration, allowing modification of scopes and permissions for the integration.
 */
export const updateGlueIdentityCenterConfiguration: API.OperationMethod<
  UpdateGlueIdentityCenterConfigurationRequest,
  UpdateGlueIdentityCenterConfigurationResponse,
  UpdateGlueIdentityCenterConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGlueIdentityCenterConfigurationRequest,
  output: UpdateGlueIdentityCenterConfigurationResponse,
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
  operationName: "UpdateGlueIdentityCenterConfiguration",
}));

export type UpdateIntegrationResourcePropertyError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API can be used for updating the `ResourceProperty` of the Glue connection (for the source) or Glue database ARN (for the target). These properties can include the role to access the connection or database. Since the same resource can be used across multiple integrations, updating resource properties will impact all the integrations using it.
 */
export const updateIntegrationResourceProperty: API.OperationMethod<
  UpdateIntegrationResourcePropertyRequest,
  UpdateIntegrationResourcePropertyResponse,
  UpdateIntegrationResourcePropertyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIntegrationResourcePropertyRequest,
  output: UpdateIntegrationResourcePropertyResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegrationResourceProperty",
}));

export type UpdateIntegrationTablePropertiesError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServerException
  | InternalServiceException
  | InvalidInputException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This API is used to provide optional override properties for the tables that need to be replicated. These properties can include properties for filtering and partitioning for the source and target tables. To set both source and target properties the same API need to be invoked with the Glue connection ARN as `ResourceArn` with `SourceTableConfig`, and the Glue database ARN as `ResourceArn` with `TargetTableConfig` respectively.
 *
 * The override will be reflected across all the integrations using same `ResourceArn` and source table.
 */
export const updateIntegrationTableProperties: API.OperationMethod<
  UpdateIntegrationTablePropertiesRequest,
  UpdateIntegrationTablePropertiesResponse,
  UpdateIntegrationTablePropertiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIntegrationTablePropertiesRequest,
  output: UpdateIntegrationTablePropertiesResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServerException,
    InternalServiceException,
    InvalidInputException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegrationTableProperties",
}));

export type UpdateJobError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | GlueRoleNotAssumable
  | CommonErrors;
/**
 * Updates an existing job definition. The previous job definition is completely overwritten by this information.
 */
export const updateJob: API.OperationMethod<
  UpdateJobRequest,
  UpdateJobResponse,
  UpdateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJobRequest,
  output: UpdateJobResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    GlueRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJob",
}));

export type UpdateJobFromSourceControlError =
  | AccessDeniedException
  | AlreadyExistsException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Synchronizes a job from the source control repository. This operation takes the job artifacts that are located in the remote repository and updates the Glue internal stores with these artifacts.
 *
 * This API supports optional parameters which take in the repository information.
 */
export const updateJobFromSourceControl: API.OperationMethod<
  UpdateJobFromSourceControlRequest,
  UpdateJobFromSourceControlResponse,
  UpdateJobFromSourceControlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJobFromSourceControlRequest,
  output: UpdateJobFromSourceControlResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobFromSourceControl",
}));

export type UpdateMLTransformError =
  | AccessDeniedException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates an existing machine learning transform. Call this operation to tune the algorithm parameters to achieve better results.
 *
 * After calling this operation, you can call the `StartMLEvaluationTaskRun`
 * operation to assess how well your new parameters achieved your goals (such as improving the
 * quality of your machine learning transform, or making it more cost-effective).
 */
export const updateMLTransform: API.OperationMethod<
  UpdateMLTransformRequest,
  UpdateMLTransformResponse,
  UpdateMLTransformError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMLTransformRequest,
  output: UpdateMLTransformResponse,
  errors: [
    AccessDeniedException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMLTransform",
}));

export type UpdatePartitionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates a partition.
 */
export const updatePartition: API.OperationMethod<
  UpdatePartitionRequest,
  UpdatePartitionResponse,
  UpdatePartitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePartitionRequest,
  output: UpdatePartitionResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePartition",
}));

export type UpdateRegistryError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Updates an existing registry which is used to hold a collection of schemas. The updated properties relate to the registry, and do not modify any of the schemas within the registry.
 */
export const updateRegistry: API.OperationMethod<
  UpdateRegistryInput,
  UpdateRegistryResponse,
  UpdateRegistryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRegistryInput,
  output: UpdateRegistryResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRegistry",
}));

export type UpdateSchemaError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | CommonErrors;
/**
 * Updates the description, compatibility setting, or version checkpoint for a schema set.
 *
 * For updating the compatibility setting, the call will not validate compatibility for the entire set of schema versions with the new compatibility setting. If the value for `Compatibility` is provided, the `VersionNumber` (a checkpoint) is also required. The API will validate the checkpoint version number for consistency.
 *
 * If the value for the `VersionNumber` (checkpoint) is provided, `Compatibility` is optional and this can be used to set/reset a checkpoint for the schema.
 *
 * This update will happen only if the schema is in the AVAILABLE state.
 */
export const updateSchema: API.OperationMethod<
  UpdateSchemaInput,
  UpdateSchemaResponse,
  UpdateSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSchemaInput,
  output: UpdateSchemaResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSchema",
}));

export type UpdateSourceControlFromJobError =
  | AccessDeniedException
  | AlreadyExistsException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ValidationException
  | CommonErrors;
/**
 * Synchronizes a job to the source control repository. This operation takes the job artifacts from the Glue internal stores and makes a commit to the remote repository that is configured on the job.
 *
 * This API supports optional parameters which take in the repository information.
 */
export const updateSourceControlFromJob: API.OperationMethod<
  UpdateSourceControlFromJobRequest,
  UpdateSourceControlFromJobResponse,
  UpdateSourceControlFromJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSourceControlFromJobRequest,
  output: UpdateSourceControlFromJobResponse,
  errors: [
    AccessDeniedException,
    AlreadyExistsException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceControlFromJob",
}));

export type UpdateTableError =
  | AlreadyExistsException
  | ConcurrentModificationException
  | EntityNotFoundException
  | FederationSourceException
  | FederationSourceRetryableException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | ResourceNotReadyException
  | ResourceNumberLimitExceededException
  | CommonErrors;
/**
 * Updates a metadata table in the Data Catalog.
 */
export const updateTable: API.OperationMethod<
  UpdateTableRequest,
  UpdateTableResponse,
  UpdateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTableRequest,
  output: UpdateTableResponse,
  errors: [
    AlreadyExistsException,
    ConcurrentModificationException,
    EntityNotFoundException,
    FederationSourceException,
    FederationSourceRetryableException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
    ResourceNotReadyException,
    ResourceNumberLimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTable",
}));

export type UpdateTableOptimizerError =
  | AccessDeniedException
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration for an existing table optimizer.
 */
export const updateTableOptimizer: API.OperationMethod<
  UpdateTableOptimizerRequest,
  UpdateTableOptimizerResponse,
  UpdateTableOptimizerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTableOptimizerRequest,
  output: UpdateTableOptimizerResponse,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTableOptimizer",
}));

export type UpdateTriggerError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates a trigger definition.
 *
 * Job arguments may be logged. Do not pass plaintext secrets as arguments. Retrieve secrets from a Glue Connection, Amazon Web Services Secrets Manager or other secret management mechanism if you intend to keep them within the Job.
 */
export const updateTrigger: API.OperationMethod<
  UpdateTriggerRequest,
  UpdateTriggerResponse,
  UpdateTriggerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTriggerRequest,
  output: UpdateTriggerResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTrigger",
}));

export type UpdateUsageProfileError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationNotSupportedException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Update an Glue usage profile.
 */
export const updateUsageProfile: API.OperationMethod<
  UpdateUsageProfileRequest,
  UpdateUsageProfileResponse,
  UpdateUsageProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUsageProfileRequest,
  output: UpdateUsageProfileResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationNotSupportedException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUsageProfile",
}));

export type UpdateUserDefinedFunctionError =
  | EntityNotFoundException
  | GlueEncryptionException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates an existing function definition in the Data Catalog.
 */
export const updateUserDefinedFunction: API.OperationMethod<
  UpdateUserDefinedFunctionRequest,
  UpdateUserDefinedFunctionResponse,
  UpdateUserDefinedFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateUserDefinedFunctionRequest,
  output: UpdateUserDefinedFunctionResponse,
  errors: [
    EntityNotFoundException,
    GlueEncryptionException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserDefinedFunction",
}));

export type UpdateWorkflowError =
  | ConcurrentModificationException
  | EntityNotFoundException
  | InternalServiceException
  | InvalidInputException
  | OperationTimeoutException
  | CommonErrors;
/**
 * Updates an existing workflow.
 */
export const updateWorkflow: API.OperationMethod<
  UpdateWorkflowRequest,
  UpdateWorkflowResponse,
  UpdateWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkflowRequest,
  output: UpdateWorkflowResponse,
  errors: [
    ConcurrentModificationException,
    EntityNotFoundException,
    InternalServiceException,
    InvalidInputException,
    OperationTimeoutException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkflow",
}));
