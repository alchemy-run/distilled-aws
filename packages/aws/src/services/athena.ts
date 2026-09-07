import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({
  sdkId: "Athena",
  serviceShapeName: "AmazonAthena",
});
const auth = T.AwsAuthSigv4({ name: "athena" });
const ver = T.ServiceVersion("2017-05-18");
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
              `https://athena-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://athena-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://athena.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://athena.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class DataCatalogNotFound
  extends /*@__PURE__*/ S.TaggedError<DataCatalogNotFound>()(
    "DataCatalogNotFound",
    {
      AthenaErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "DataCatalog.*not found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    {
      AthenaErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
  ) {}
export class MetadataException
  extends /*@__PURE__*/ S.TaggedError<MetadataException>()(
    "MetadataException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NamedQueryNotFound
  extends /*@__PURE__*/ S.TaggedError<NamedQueryNotFound>()(
    "NamedQueryNotFound",
    {
      AthenaErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "NamedQuery.*does not exist" },
    }),
  ).pipe(C.withNotFoundError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
  ) {}
export class SessionAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<SessionAlreadyExistsException>()(
    "SessionAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ThrottleReason).annotate({
          identifier: "ThrottleReason",
        }),
      ),
    },
  ) {}
export class WorkGroupNotFound
  extends /*@__PURE__*/ S.TaggedError<WorkGroupNotFound>()(
    "WorkGroupNotFound",
    {
      AthenaErrorCode: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: "WorkGroup.*not found" },
    }),
  ).pipe(C.withNotFoundError) {}
export type NamedQueryId = string;
export type NamedQueryIdList = string[];
export const NamedQueryIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetNamedQueryInput {
  NamedQueryIds: string[];
}
export const BatchGetNamedQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NamedQueryIds: NamedQueryIdList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetNamedQueryInput",
}) as any as S.Schema<BatchGetNamedQueryInput>;
export type NameString = string;
export type DescriptionString = string;
export type DatabaseString = string;
export type QueryString = string;
export type WorkGroupName = string;
export interface NamedQuery {
  Name: string;
  Description?: string;
  Database: string;
  QueryString: string;
  NamedQueryId?: string;
  WorkGroup?: string;
}
export const NamedQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Database: S.String,
    QueryString: S.String,
    NamedQueryId: S.optional(S.String),
    WorkGroup: S.optional(S.String),
  }),
).annotate({ identifier: "NamedQuery" }) as any as S.Schema<NamedQuery>;
export type NamedQueryList = NamedQuery[];
export const NamedQueryList = /*@__PURE__*/ S.Array(NamedQuery);
export type ErrorCode = string;
export type ErrorMessage = string;
export interface UnprocessedNamedQueryId {
  NamedQueryId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const UnprocessedNamedQueryId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamedQueryId: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "UnprocessedNamedQueryId",
}) as any as S.Schema<UnprocessedNamedQueryId>;
export type UnprocessedNamedQueryIdList = UnprocessedNamedQueryId[];
export const UnprocessedNamedQueryIdList = /*@__PURE__*/ S.Array(
  UnprocessedNamedQueryId,
);
export interface BatchGetNamedQueryOutput {
  NamedQueries?: NamedQuery[];
  UnprocessedNamedQueryIds?: UnprocessedNamedQueryId[];
}
export const BatchGetNamedQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamedQueries: S.optional(NamedQueryList),
    UnprocessedNamedQueryIds: S.optional(UnprocessedNamedQueryIdList),
  }),
).annotate({
  identifier: "BatchGetNamedQueryOutput",
}) as any as S.Schema<BatchGetNamedQueryOutput>;
export type StatementName = string;
export type PreparedStatementNameList = string[];
export const PreparedStatementNameList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetPreparedStatementInput {
  PreparedStatementNames: string[];
  WorkGroup: string;
}
export const BatchGetPreparedStatementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PreparedStatementNames: PreparedStatementNameList,
    WorkGroup: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetPreparedStatementInput",
}) as any as S.Schema<BatchGetPreparedStatementInput>;
export interface PreparedStatement {
  StatementName?: string;
  QueryStatement?: string;
  WorkGroupName?: string;
  Description?: string;
  LastModifiedTime?: Date;
}
export const PreparedStatement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatementName: S.optional(S.String),
    QueryStatement: S.optional(S.String),
    WorkGroupName: S.optional(S.String),
    Description: S.optional(S.String),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PreparedStatement",
}) as any as S.Schema<PreparedStatement>;
export type PreparedStatementDetailsList = PreparedStatement[];
export const PreparedStatementDetailsList =
  /*@__PURE__*/ S.Array(PreparedStatement);
export interface UnprocessedPreparedStatementName {
  StatementName?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const UnprocessedPreparedStatementName = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatementName: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "UnprocessedPreparedStatementName",
}) as any as S.Schema<UnprocessedPreparedStatementName>;
export type UnprocessedPreparedStatementNameList =
  UnprocessedPreparedStatementName[];
export const UnprocessedPreparedStatementNameList = /*@__PURE__*/ S.Array(
  UnprocessedPreparedStatementName,
);
export interface BatchGetPreparedStatementOutput {
  PreparedStatements?: PreparedStatement[];
  UnprocessedPreparedStatementNames?: UnprocessedPreparedStatementName[];
}
export const BatchGetPreparedStatementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PreparedStatements: S.optional(PreparedStatementDetailsList),
    UnprocessedPreparedStatementNames: S.optional(
      UnprocessedPreparedStatementNameList,
    ),
  }),
).annotate({
  identifier: "BatchGetPreparedStatementOutput",
}) as any as S.Schema<BatchGetPreparedStatementOutput>;
export type QueryExecutionId = string;
export type QueryExecutionIdList = string[];
export const QueryExecutionIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetQueryExecutionInput {
  QueryExecutionIds: string[];
}
export const BatchGetQueryExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QueryExecutionIds: QueryExecutionIdList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchGetQueryExecutionInput",
}) as any as S.Schema<BatchGetQueryExecutionInput>;
export type StatementType = "DDL" | "DML" | "UTILITY" | (string & {});
export const StatementType = S.String;

export type KmsKey = string;
export interface ManagedQueryResultsEncryptionConfiguration {
  KmsKey: string;
}
export const ManagedQueryResultsEncryptionConfiguration =
  /*@__PURE__*/ S.suspend(() => S.Struct({ KmsKey: S.String })).annotate({
    identifier: "ManagedQueryResultsEncryptionConfiguration",
  }) as any as S.Schema<ManagedQueryResultsEncryptionConfiguration>;
export interface ManagedQueryResultsConfiguration {
  Enabled: boolean;
  EncryptionConfiguration?: ManagedQueryResultsEncryptionConfiguration;
}
export const ManagedQueryResultsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.Boolean,
    EncryptionConfiguration: S.optional(
      ManagedQueryResultsEncryptionConfiguration,
    ),
  }),
).annotate({
  identifier: "ManagedQueryResultsConfiguration",
}) as any as S.Schema<ManagedQueryResultsConfiguration>;
export type ResultOutputLocation = string;
export type EncryptionOption = "SSE_S3" | "SSE_KMS" | "CSE_KMS" | (string & {});
export const EncryptionOption = S.String;

export interface EncryptionConfiguration {
  EncryptionOption: EncryptionOption;
  KmsKey?: string;
}
export const EncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionOption: EncryptionOption,
    KmsKey: S.optional(S.String),
  }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export type AwsAccountId = string;
export type S3AclOption = "BUCKET_OWNER_FULL_CONTROL" | (string & {});
export const S3AclOption = S.String;

export interface AclConfiguration {
  S3AclOption: S3AclOption;
}
export const AclConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3AclOption: S3AclOption }),
).annotate({
  identifier: "AclConfiguration",
}) as any as S.Schema<AclConfiguration>;
export interface ResultConfiguration {
  OutputLocation?: string;
  EncryptionConfiguration?: EncryptionConfiguration;
  ExpectedBucketOwner?: string;
  AclConfiguration?: AclConfiguration;
}
export const ResultConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputLocation: S.optional(S.String),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    ExpectedBucketOwner: S.optional(S.String),
    AclConfiguration: S.optional(AclConfiguration),
  }),
).annotate({
  identifier: "ResultConfiguration",
}) as any as S.Schema<ResultConfiguration>;
export type Age = number;
export interface ResultReuseByAgeConfiguration {
  Enabled: boolean;
  MaxAgeInMinutes?: number;
}
export const ResultReuseByAgeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.Boolean, MaxAgeInMinutes: S.optional(S.Number) }),
).annotate({
  identifier: "ResultReuseByAgeConfiguration",
}) as any as S.Schema<ResultReuseByAgeConfiguration>;
export interface ResultReuseConfiguration {
  ResultReuseByAgeConfiguration?: ResultReuseByAgeConfiguration;
}
export const ResultReuseConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResultReuseByAgeConfiguration: S.optional(ResultReuseByAgeConfiguration),
  }),
).annotate({
  identifier: "ResultReuseConfiguration",
}) as any as S.Schema<ResultReuseConfiguration>;
export type CatalogNameString = string;
export interface QueryExecutionContext {
  Database?: string;
  Catalog?: string;
}
export const QueryExecutionContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Database: S.optional(S.String), Catalog: S.optional(S.String) }),
).annotate({
  identifier: "QueryExecutionContext",
}) as any as S.Schema<QueryExecutionContext>;
export type QueryExecutionState =
  | "QUEUED"
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export const QueryExecutionState = S.String;

export type ErrorCategory = number;
export type ErrorType = number;
export interface AthenaError {
  ErrorCategory?: number;
  ErrorType?: number;
  Retryable?: boolean;
  ErrorMessage?: string;
}
export const AthenaError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorCategory: S.optional(S.Number),
    ErrorType: S.optional(S.Number),
    Retryable: S.optional(S.Boolean),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({ identifier: "AthenaError" }) as any as S.Schema<AthenaError>;
export interface QueryExecutionStatus {
  State?: QueryExecutionState;
  StateChangeReason?: string;
  SubmissionDateTime?: Date;
  CompletionDateTime?: Date;
  AthenaError?: AthenaError;
}
export const QueryExecutionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    State: S.optional(QueryExecutionState),
    StateChangeReason: S.optional(S.String),
    SubmissionDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CompletionDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AthenaError: S.optional(AthenaError),
  }),
).annotate({
  identifier: "QueryExecutionStatus",
}) as any as S.Schema<QueryExecutionStatus>;
export interface ResultReuseInformation {
  ReusedPreviousResult: boolean;
}
export const ResultReuseInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReusedPreviousResult: S.Boolean }),
).annotate({
  identifier: "ResultReuseInformation",
}) as any as S.Schema<ResultReuseInformation>;
export type DpuCount = number;
export interface QueryExecutionStatistics {
  EngineExecutionTimeInMillis?: number;
  DataScannedInBytes?: number;
  DataManifestLocation?: string;
  TotalExecutionTimeInMillis?: number;
  QueryQueueTimeInMillis?: number;
  ServicePreProcessingTimeInMillis?: number;
  QueryPlanningTimeInMillis?: number;
  ServiceProcessingTimeInMillis?: number;
  ResultReuseInformation?: ResultReuseInformation;
  DpuCount?: number;
}
export const QueryExecutionStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineExecutionTimeInMillis: S.optional(S.Number),
    DataScannedInBytes: S.optional(S.Number),
    DataManifestLocation: S.optional(S.String),
    TotalExecutionTimeInMillis: S.optional(S.Number),
    QueryQueueTimeInMillis: S.optional(S.Number),
    ServicePreProcessingTimeInMillis: S.optional(S.Number),
    QueryPlanningTimeInMillis: S.optional(S.Number),
    ServiceProcessingTimeInMillis: S.optional(S.Number),
    ResultReuseInformation: S.optional(ResultReuseInformation),
    DpuCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "QueryExecutionStatistics",
}) as any as S.Schema<QueryExecutionStatistics>;
export interface EngineVersion {
  SelectedEngineVersion?: string;
  EffectiveEngineVersion?: string;
}
export const EngineVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SelectedEngineVersion: S.optional(S.String),
    EffectiveEngineVersion: S.optional(S.String),
  }),
).annotate({ identifier: "EngineVersion" }) as any as S.Schema<EngineVersion>;
export type ExecutionParameter = string;
export type ExecutionParameters = string[];
export const ExecutionParameters = /*@__PURE__*/ S.Array(S.String);
export type BoxedBoolean = boolean;
export type AuthenticationType = "DIRECTORY_IDENTITY" | (string & {});
export const AuthenticationType = S.String;

export interface QueryResultsS3AccessGrantsConfiguration {
  EnableS3AccessGrants: boolean;
  CreateUserLevelPrefix?: boolean;
  AuthenticationType: AuthenticationType;
}
export const QueryResultsS3AccessGrantsConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EnableS3AccessGrants: S.Boolean,
      CreateUserLevelPrefix: S.optional(S.Boolean),
      AuthenticationType: AuthenticationType,
    }),
).annotate({
  identifier: "QueryResultsS3AccessGrantsConfiguration",
}) as any as S.Schema<QueryResultsS3AccessGrantsConfiguration>;
export interface QueryExecution {
  QueryExecutionId?: string;
  Query?: string;
  StatementType?: StatementType;
  ManagedQueryResultsConfiguration?: ManagedQueryResultsConfiguration;
  ResultConfiguration?: ResultConfiguration;
  ResultReuseConfiguration?: ResultReuseConfiguration;
  QueryExecutionContext?: QueryExecutionContext;
  Status?: QueryExecutionStatus;
  Statistics?: QueryExecutionStatistics;
  WorkGroup?: string;
  EngineVersion?: EngineVersion;
  ExecutionParameters?: string[];
  SubstatementType?: string;
  QueryResultsS3AccessGrantsConfiguration?: QueryResultsS3AccessGrantsConfiguration;
}
export const QueryExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryExecutionId: S.optional(S.String),
    Query: S.optional(S.String),
    StatementType: S.optional(StatementType),
    ManagedQueryResultsConfiguration: S.optional(
      ManagedQueryResultsConfiguration,
    ),
    ResultConfiguration: S.optional(ResultConfiguration),
    ResultReuseConfiguration: S.optional(ResultReuseConfiguration),
    QueryExecutionContext: S.optional(QueryExecutionContext),
    Status: S.optional(QueryExecutionStatus),
    Statistics: S.optional(QueryExecutionStatistics),
    WorkGroup: S.optional(S.String),
    EngineVersion: S.optional(EngineVersion),
    ExecutionParameters: S.optional(ExecutionParameters),
    SubstatementType: S.optional(S.String),
    QueryResultsS3AccessGrantsConfiguration: S.optional(
      QueryResultsS3AccessGrantsConfiguration,
    ),
  }),
).annotate({ identifier: "QueryExecution" }) as any as S.Schema<QueryExecution>;
export type QueryExecutionList = QueryExecution[];
export const QueryExecutionList = /*@__PURE__*/ S.Array(QueryExecution);
export interface UnprocessedQueryExecutionId {
  QueryExecutionId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export const UnprocessedQueryExecutionId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryExecutionId: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "UnprocessedQueryExecutionId",
}) as any as S.Schema<UnprocessedQueryExecutionId>;
export type UnprocessedQueryExecutionIdList = UnprocessedQueryExecutionId[];
export const UnprocessedQueryExecutionIdList = /*@__PURE__*/ S.Array(
  UnprocessedQueryExecutionId,
);
export interface BatchGetQueryExecutionOutput {
  QueryExecutions?: QueryExecution[];
  UnprocessedQueryExecutionIds?: UnprocessedQueryExecutionId[];
}
export const BatchGetQueryExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryExecutions: S.optional(QueryExecutionList),
    UnprocessedQueryExecutionIds: S.optional(UnprocessedQueryExecutionIdList),
  }),
).annotate({
  identifier: "BatchGetQueryExecutionOutput",
}) as any as S.Schema<BatchGetQueryExecutionOutput>;
export type CapacityReservationName = string;
export interface CancelCapacityReservationInput {
  Name: string;
}
export const CancelCapacityReservationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelCapacityReservationInput",
}) as any as S.Schema<CancelCapacityReservationInput>;
export interface CancelCapacityReservationOutput {}
export const CancelCapacityReservationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelCapacityReservationOutput",
}) as any as S.Schema<CancelCapacityReservationOutput>;
export type TargetDpusInteger = number;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key?: string;
  Value?: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateCapacityReservationInput {
  TargetDpus: number;
  Name: string;
  Tags?: Tag[];
}
export const CreateCapacityReservationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetDpus: S.Number,
    Name: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateCapacityReservationInput",
}) as any as S.Schema<CreateCapacityReservationInput>;
export interface CreateCapacityReservationOutput {}
export const CreateCapacityReservationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateCapacityReservationOutput",
}) as any as S.Schema<CreateCapacityReservationOutput>;
export type DataCatalogType =
  | "LAMBDA"
  | "GLUE"
  | "HIVE"
  | "FEDERATED"
  | (string & {});
export const DataCatalogType = S.String;

export type KeyString = string;
export type ParametersMapValue = string;
export type ParametersMap = { [key: string]: string | undefined };
export const ParametersMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateDataCatalogInput {
  Name: string;
  Type: DataCatalogType;
  Description?: string;
  Parameters?: { [key: string]: string | undefined };
  Tags?: Tag[];
}
export const CreateDataCatalogInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Type: DataCatalogType,
    Description: S.optional(S.String),
    Parameters: S.optional(ParametersMap),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDataCatalogInput",
}) as any as S.Schema<CreateDataCatalogInput>;
export type DataCatalogStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "CREATE_FAILED_CLEANUP_IN_PROGRESS"
  | "CREATE_FAILED_CLEANUP_COMPLETE"
  | "CREATE_FAILED_CLEANUP_FAILED"
  | "DELETE_IN_PROGRESS"
  | "DELETE_COMPLETE"
  | "DELETE_FAILED"
  | (string & {});
export const DataCatalogStatus = S.String;

export type ConnectionType =
  | "DYNAMODB"
  | "MYSQL"
  | "POSTGRESQL"
  | "REDSHIFT"
  | "ORACLE"
  | "SYNAPSE"
  | "SQLSERVER"
  | "DB2"
  | "OPENSEARCH"
  | "BIGQUERY"
  | "GOOGLECLOUDSTORAGE"
  | "HBASE"
  | "DOCUMENTDB"
  | "CMDB"
  | "TPCDS"
  | "TIMESTREAM"
  | "SAPHANA"
  | "SNOWFLAKE"
  | "DATALAKEGEN2"
  | "DB2AS400"
  | (string & {});
export const ConnectionType = S.String;

export interface DataCatalog {
  Name: string;
  Description?: string;
  Type: DataCatalogType;
  Parameters?: { [key: string]: string | undefined };
  Status?: DataCatalogStatus;
  ConnectionType?: ConnectionType;
  Error?: string;
}
export const DataCatalog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Type: DataCatalogType,
    Parameters: S.optional(ParametersMap),
    Status: S.optional(DataCatalogStatus),
    ConnectionType: S.optional(ConnectionType),
    Error: S.optional(S.String),
  }),
).annotate({ identifier: "DataCatalog" }) as any as S.Schema<DataCatalog>;
export interface CreateDataCatalogOutput {
  DataCatalog?: DataCatalog;
}
export const CreateDataCatalogOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataCatalog: S.optional(DataCatalog) }),
).annotate({
  identifier: "CreateDataCatalogOutput",
}) as any as S.Schema<CreateDataCatalogOutput>;
export type IdempotencyToken = string;
export interface CreateNamedQueryInput {
  Name: string;
  Description?: string;
  Database: string;
  QueryString: string;
  ClientRequestToken?: string;
  WorkGroup?: string;
}
export const CreateNamedQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Database: S.String,
    QueryString: S.String,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    WorkGroup: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateNamedQueryInput",
}) as any as S.Schema<CreateNamedQueryInput>;
export interface CreateNamedQueryOutput {
  NamedQueryId?: string;
}
export const CreateNamedQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NamedQueryId: S.optional(S.String) }),
).annotate({
  identifier: "CreateNamedQueryOutput",
}) as any as S.Schema<CreateNamedQueryOutput>;
export type NotebookName = string;
export type ClientRequestToken = string;
export interface CreateNotebookInput {
  WorkGroup: string;
  Name: string;
  ClientRequestToken?: string;
}
export const CreateNotebookInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkGroup: S.String,
    Name: S.String,
    ClientRequestToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateNotebookInput",
}) as any as S.Schema<CreateNotebookInput>;
export type NotebookId = string;
export interface CreateNotebookOutput {
  NotebookId?: string;
}
export const CreateNotebookOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NotebookId: S.optional(S.String) }),
).annotate({
  identifier: "CreateNotebookOutput",
}) as any as S.Schema<CreateNotebookOutput>;
export interface CreatePreparedStatementInput {
  StatementName: string;
  WorkGroup: string;
  QueryStatement: string;
  Description?: string;
}
export const CreatePreparedStatementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatementName: S.String,
    WorkGroup: S.String,
    QueryStatement: S.String,
    Description: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePreparedStatementInput",
}) as any as S.Schema<CreatePreparedStatementInput>;
export interface CreatePreparedStatementOutput {}
export const CreatePreparedStatementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreatePreparedStatementOutput",
}) as any as S.Schema<CreatePreparedStatementOutput>;
export type SessionId = string;
export interface CreatePresignedNotebookUrlRequest {
  SessionId: string;
}
export const CreatePresignedNotebookUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePresignedNotebookUrlRequest",
}) as any as S.Schema<CreatePresignedNotebookUrlRequest>;
export type AuthToken = string;
export interface CreatePresignedNotebookUrlResponse {
  NotebookUrl: string;
  AuthToken: string;
  AuthTokenExpirationTime: number;
}
export const CreatePresignedNotebookUrlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotebookUrl: S.String,
    AuthToken: S.String,
    AuthTokenExpirationTime: S.Number,
  }),
).annotate({
  identifier: "CreatePresignedNotebookUrlResponse",
}) as any as S.Schema<CreatePresignedNotebookUrlResponse>;
export type BytesScannedCutoffValue = number;
export type RoleArn = string;
export type LogGroupName = string;
export type LogStreamNamePrefix = string;
export type LogTypeKey = string;
export type LogTypeValue = string;
export type LogTypeValuesList = string[];
export const LogTypeValuesList = /*@__PURE__*/ S.Array(S.String);
export type LogTypesMap = { [key: string]: string[] | undefined };
export const LogTypesMap = /*@__PURE__*/ S.Record(
  S.String,
  LogTypeValuesList.pipe(S.optional),
);
export interface CloudWatchLoggingConfiguration {
  Enabled: boolean;
  LogGroup?: string;
  LogStreamNamePrefix?: string;
  LogTypes?: { [key: string]: string[] | undefined };
}
export const CloudWatchLoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.Boolean,
    LogGroup: S.optional(S.String),
    LogStreamNamePrefix: S.optional(S.String),
    LogTypes: S.optional(LogTypesMap),
  }),
).annotate({
  identifier: "CloudWatchLoggingConfiguration",
}) as any as S.Schema<CloudWatchLoggingConfiguration>;
export interface ManagedLoggingConfiguration {
  Enabled: boolean;
  KmsKey?: string;
}
export const ManagedLoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.Boolean, KmsKey: S.optional(S.String) }),
).annotate({
  identifier: "ManagedLoggingConfiguration",
}) as any as S.Schema<ManagedLoggingConfiguration>;
export type S3OutputLocation = string;
export interface S3LoggingConfiguration {
  Enabled: boolean;
  KmsKey?: string;
  LogLocation?: string;
}
export const S3LoggingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.Boolean,
    KmsKey: S.optional(S.String),
    LogLocation: S.optional(S.String),
  }),
).annotate({
  identifier: "S3LoggingConfiguration",
}) as any as S.Schema<S3LoggingConfiguration>;
export interface MonitoringConfiguration {
  CloudWatchLoggingConfiguration?: CloudWatchLoggingConfiguration;
  ManagedLoggingConfiguration?: ManagedLoggingConfiguration;
  S3LoggingConfiguration?: S3LoggingConfiguration;
}
export const MonitoringConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchLoggingConfiguration: S.optional(CloudWatchLoggingConfiguration),
    ManagedLoggingConfiguration: S.optional(ManagedLoggingConfiguration),
    S3LoggingConfiguration: S.optional(S3LoggingConfiguration),
  }),
).annotate({
  identifier: "MonitoringConfiguration",
}) as any as S.Schema<MonitoringConfiguration>;
export type CoordinatorDpuSize = number;
export type MaxConcurrentDpus = number;
export type DefaultExecutorDpuSize = number;
export interface Classification {
  Name?: string;
  Properties?: { [key: string]: string | undefined };
}
export const Classification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Properties: S.optional(ParametersMap),
  }),
).annotate({ identifier: "Classification" }) as any as S.Schema<Classification>;
export type ClassificationList = Classification[];
export const ClassificationList = /*@__PURE__*/ S.Array(Classification);
export interface EngineConfiguration {
  CoordinatorDpuSize?: number;
  MaxConcurrentDpus?: number;
  DefaultExecutorDpuSize?: number;
  AdditionalConfigs?: { [key: string]: string | undefined };
  SparkProperties?: { [key: string]: string | undefined };
  Classifications?: Classification[];
}
export const EngineConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CoordinatorDpuSize: S.optional(S.Number),
    MaxConcurrentDpus: S.optional(S.Number),
    DefaultExecutorDpuSize: S.optional(S.Number),
    AdditionalConfigs: S.optional(ParametersMap),
    SparkProperties: S.optional(ParametersMap),
    Classifications: S.optional(ClassificationList),
  }),
).annotate({
  identifier: "EngineConfiguration",
}) as any as S.Schema<EngineConfiguration>;
export interface CustomerContentEncryptionConfiguration {
  KmsKey: string;
}
export const CustomerContentEncryptionConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ KmsKey: S.String }),
).annotate({
  identifier: "CustomerContentEncryptionConfiguration",
}) as any as S.Schema<CustomerContentEncryptionConfiguration>;
export type IdentityCenterInstanceArn = string;
export interface IdentityCenterConfiguration {
  EnableIdentityCenter?: boolean;
  IdentityCenterInstanceArn?: string;
}
export const IdentityCenterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnableIdentityCenter: S.optional(S.Boolean),
    IdentityCenterInstanceArn: S.optional(S.String),
  }),
).annotate({
  identifier: "IdentityCenterConfiguration",
}) as any as S.Schema<IdentityCenterConfiguration>;
export interface WorkGroupConfiguration {
  ResultConfiguration?: ResultConfiguration;
  ManagedQueryResultsConfiguration?: ManagedQueryResultsConfiguration;
  EnforceWorkGroupConfiguration?: boolean;
  PublishCloudWatchMetricsEnabled?: boolean;
  BytesScannedCutoffPerQuery?: number;
  RequesterPaysEnabled?: boolean;
  EngineVersion?: EngineVersion;
  AdditionalConfiguration?: string;
  ExecutionRole?: string;
  MonitoringConfiguration?: MonitoringConfiguration;
  EngineConfiguration?: EngineConfiguration;
  CustomerContentEncryptionConfiguration?: CustomerContentEncryptionConfiguration;
  EnableMinimumEncryptionConfiguration?: boolean;
  IdentityCenterConfiguration?: IdentityCenterConfiguration;
  QueryResultsS3AccessGrantsConfiguration?: QueryResultsS3AccessGrantsConfiguration;
}
export const WorkGroupConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResultConfiguration: S.optional(ResultConfiguration),
    ManagedQueryResultsConfiguration: S.optional(
      ManagedQueryResultsConfiguration,
    ),
    EnforceWorkGroupConfiguration: S.optional(S.Boolean),
    PublishCloudWatchMetricsEnabled: S.optional(S.Boolean),
    BytesScannedCutoffPerQuery: S.optional(S.Number),
    RequesterPaysEnabled: S.optional(S.Boolean),
    EngineVersion: S.optional(EngineVersion),
    AdditionalConfiguration: S.optional(S.String),
    ExecutionRole: S.optional(S.String),
    MonitoringConfiguration: S.optional(MonitoringConfiguration),
    EngineConfiguration: S.optional(EngineConfiguration),
    CustomerContentEncryptionConfiguration: S.optional(
      CustomerContentEncryptionConfiguration,
    ),
    EnableMinimumEncryptionConfiguration: S.optional(S.Boolean),
    IdentityCenterConfiguration: S.optional(IdentityCenterConfiguration),
    QueryResultsS3AccessGrantsConfiguration: S.optional(
      QueryResultsS3AccessGrantsConfiguration,
    ),
  }),
).annotate({
  identifier: "WorkGroupConfiguration",
}) as any as S.Schema<WorkGroupConfiguration>;
export type WorkGroupDescriptionString = string;
export interface CreateWorkGroupInput {
  Name: string;
  Configuration?: WorkGroupConfiguration;
  Description?: string;
  Tags?: Tag[];
}
export const CreateWorkGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Configuration: S.optional(WorkGroupConfiguration),
    Description: S.optional(S.String),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateWorkGroupInput",
}) as any as S.Schema<CreateWorkGroupInput>;
export interface CreateWorkGroupOutput {}
export const CreateWorkGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateWorkGroupOutput",
}) as any as S.Schema<CreateWorkGroupOutput>;
export interface DeleteCapacityReservationInput {
  Name: string;
}
export const DeleteCapacityReservationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteCapacityReservationInput",
}) as any as S.Schema<DeleteCapacityReservationInput>;
export interface DeleteCapacityReservationOutput {}
export const DeleteCapacityReservationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCapacityReservationOutput",
}) as any as S.Schema<DeleteCapacityReservationOutput>;
export interface DeleteDataCatalogInput {
  Name: string;
  DeleteCatalogOnly?: boolean;
}
export const DeleteDataCatalogInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, DeleteCatalogOnly: S.optional(S.Boolean) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDataCatalogInput",
}) as any as S.Schema<DeleteDataCatalogInput>;
export interface DeleteDataCatalogOutput {
  DataCatalog?: DataCatalog;
}
export const DeleteDataCatalogOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataCatalog: S.optional(DataCatalog) }),
).annotate({
  identifier: "DeleteDataCatalogOutput",
}) as any as S.Schema<DeleteDataCatalogOutput>;
export interface DeleteNamedQueryInput {
  NamedQueryId: string;
}
export const DeleteNamedQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NamedQueryId: S.String.pipe(T.IdempotencyToken()) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteNamedQueryInput",
}) as any as S.Schema<DeleteNamedQueryInput>;
export interface DeleteNamedQueryOutput {}
export const DeleteNamedQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteNamedQueryOutput",
}) as any as S.Schema<DeleteNamedQueryOutput>;
export interface DeleteNotebookInput {
  NotebookId: string;
}
export const DeleteNotebookInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NotebookId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteNotebookInput",
}) as any as S.Schema<DeleteNotebookInput>;
export interface DeleteNotebookOutput {}
export const DeleteNotebookOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteNotebookOutput",
}) as any as S.Schema<DeleteNotebookOutput>;
export interface DeletePreparedStatementInput {
  StatementName: string;
  WorkGroup: string;
}
export const DeletePreparedStatementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StatementName: S.String, WorkGroup: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePreparedStatementInput",
}) as any as S.Schema<DeletePreparedStatementInput>;
export interface DeletePreparedStatementOutput {}
export const DeletePreparedStatementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePreparedStatementOutput",
}) as any as S.Schema<DeletePreparedStatementOutput>;
export interface DeleteWorkGroupInput {
  WorkGroup: string;
  RecursiveDeleteOption?: boolean;
}
export const DeleteWorkGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkGroup: S.String,
    RecursiveDeleteOption: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteWorkGroupInput",
}) as any as S.Schema<DeleteWorkGroupInput>;
export interface DeleteWorkGroupOutput {}
export const DeleteWorkGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWorkGroupOutput",
}) as any as S.Schema<DeleteWorkGroupOutput>;
export interface ExportNotebookInput {
  NotebookId: string;
}
export const ExportNotebookInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NotebookId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ExportNotebookInput",
}) as any as S.Schema<ExportNotebookInput>;
export type NotebookType = "IPYNB" | (string & {});
export const NotebookType = S.String;

export interface NotebookMetadata {
  NotebookId?: string;
  Name?: string;
  WorkGroup?: string;
  CreationTime?: Date;
  Type?: NotebookType;
  LastModifiedTime?: Date;
}
export const NotebookMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotebookId: S.optional(S.String),
    Name: S.optional(S.String),
    WorkGroup: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Type: S.optional(NotebookType),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "NotebookMetadata",
}) as any as S.Schema<NotebookMetadata>;
export type Payload = string;
export interface ExportNotebookOutput {
  NotebookMetadata?: NotebookMetadata;
  Payload?: string;
}
export const ExportNotebookOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotebookMetadata: S.optional(NotebookMetadata),
    Payload: S.optional(S.String),
  }),
).annotate({
  identifier: "ExportNotebookOutput",
}) as any as S.Schema<ExportNotebookOutput>;
export type CalculationExecutionId = string;
export interface GetCalculationExecutionRequest {
  CalculationExecutionId: string;
}
export const GetCalculationExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CalculationExecutionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCalculationExecutionRequest",
}) as any as S.Schema<GetCalculationExecutionRequest>;
export type S3Uri = string;
export type CalculationExecutionState =
  | "CREATING"
  | "CREATED"
  | "QUEUED"
  | "RUNNING"
  | "CANCELING"
  | "CANCELED"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const CalculationExecutionState = S.String;

export interface CalculationStatus {
  SubmissionDateTime?: Date;
  CompletionDateTime?: Date;
  State?: CalculationExecutionState;
  StateChangeReason?: string;
}
export const CalculationStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubmissionDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CompletionDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    State: S.optional(CalculationExecutionState),
    StateChangeReason: S.optional(S.String),
  }),
).annotate({
  identifier: "CalculationStatus",
}) as any as S.Schema<CalculationStatus>;
export interface CalculationStatistics {
  DpuExecutionInMillis?: number;
  Progress?: string;
}
export const CalculationStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DpuExecutionInMillis: S.optional(S.Number),
    Progress: S.optional(S.String),
  }),
).annotate({
  identifier: "CalculationStatistics",
}) as any as S.Schema<CalculationStatistics>;
export type CalculationResultType = string;
export interface CalculationResult {
  StdOutS3Uri?: string;
  StdErrorS3Uri?: string;
  ResultS3Uri?: string;
  ResultType?: string;
}
export const CalculationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StdOutS3Uri: S.optional(S.String),
    StdErrorS3Uri: S.optional(S.String),
    ResultS3Uri: S.optional(S.String),
    ResultType: S.optional(S.String),
  }),
).annotate({
  identifier: "CalculationResult",
}) as any as S.Schema<CalculationResult>;
export interface GetCalculationExecutionResponse {
  CalculationExecutionId?: string;
  SessionId?: string;
  Description?: string;
  WorkingDirectory?: string;
  Status?: CalculationStatus;
  Statistics?: CalculationStatistics;
  Result?: CalculationResult;
}
export const GetCalculationExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculationExecutionId: S.optional(S.String),
    SessionId: S.optional(S.String),
    Description: S.optional(S.String),
    WorkingDirectory: S.optional(S.String),
    Status: S.optional(CalculationStatus),
    Statistics: S.optional(CalculationStatistics),
    Result: S.optional(CalculationResult),
  }),
).annotate({
  identifier: "GetCalculationExecutionResponse",
}) as any as S.Schema<GetCalculationExecutionResponse>;
export interface GetCalculationExecutionCodeRequest {
  CalculationExecutionId: string;
}
export const GetCalculationExecutionCodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CalculationExecutionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCalculationExecutionCodeRequest",
}) as any as S.Schema<GetCalculationExecutionCodeRequest>;
export type CodeBlock = string;
export interface GetCalculationExecutionCodeResponse {
  CodeBlock?: string;
}
export const GetCalculationExecutionCodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CodeBlock: S.optional(S.String) }),
).annotate({
  identifier: "GetCalculationExecutionCodeResponse",
}) as any as S.Schema<GetCalculationExecutionCodeResponse>;
export interface GetCalculationExecutionStatusRequest {
  CalculationExecutionId: string;
}
export const GetCalculationExecutionStatusRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ CalculationExecutionId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetCalculationExecutionStatusRequest",
}) as any as S.Schema<GetCalculationExecutionStatusRequest>;
export interface GetCalculationExecutionStatusResponse {
  Status?: CalculationStatus;
  Statistics?: CalculationStatistics;
}
export const GetCalculationExecutionStatusResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Status: S.optional(CalculationStatus),
      Statistics: S.optional(CalculationStatistics),
    }),
).annotate({
  identifier: "GetCalculationExecutionStatusResponse",
}) as any as S.Schema<GetCalculationExecutionStatusResponse>;
export interface GetCapacityAssignmentConfigurationInput {
  CapacityReservationName: string;
}
export const GetCapacityAssignmentConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ CapacityReservationName: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetCapacityAssignmentConfigurationInput",
}) as any as S.Schema<GetCapacityAssignmentConfigurationInput>;
export type WorkGroupNamesList = string[];
export const WorkGroupNamesList = /*@__PURE__*/ S.Array(S.String);
export interface CapacityAssignment {
  WorkGroupNames?: string[];
}
export const CapacityAssignment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkGroupNames: S.optional(WorkGroupNamesList) }),
).annotate({
  identifier: "CapacityAssignment",
}) as any as S.Schema<CapacityAssignment>;
export type CapacityAssignmentsList = CapacityAssignment[];
export const CapacityAssignmentsList =
  /*@__PURE__*/ S.Array(CapacityAssignment);
export interface CapacityAssignmentConfiguration {
  CapacityReservationName?: string;
  CapacityAssignments?: CapacityAssignment[];
}
export const CapacityAssignmentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityReservationName: S.optional(S.String),
    CapacityAssignments: S.optional(CapacityAssignmentsList),
  }),
).annotate({
  identifier: "CapacityAssignmentConfiguration",
}) as any as S.Schema<CapacityAssignmentConfiguration>;
export interface GetCapacityAssignmentConfigurationOutput {
  CapacityAssignmentConfiguration: CapacityAssignmentConfiguration;
}
export const GetCapacityAssignmentConfigurationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CapacityAssignmentConfiguration: CapacityAssignmentConfiguration,
    }),
).annotate({
  identifier: "GetCapacityAssignmentConfigurationOutput",
}) as any as S.Schema<GetCapacityAssignmentConfigurationOutput>;
export interface GetCapacityReservationInput {
  Name: string;
}
export const GetCapacityReservationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCapacityReservationInput",
}) as any as S.Schema<GetCapacityReservationInput>;
export type CapacityReservationStatus =
  | "PENDING"
  | "ACTIVE"
  | "CANCELLING"
  | "CANCELLED"
  | "FAILED"
  | "UPDATE_PENDING"
  | (string & {});
export const CapacityReservationStatus = S.String;

export type AllocatedDpusInteger = number;
export type CapacityAllocationStatus =
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export const CapacityAllocationStatus = S.String;

export interface CapacityAllocation {
  Status: CapacityAllocationStatus;
  StatusMessage?: string;
  RequestTime: Date;
  RequestCompletionTime?: Date;
}
export const CapacityAllocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: CapacityAllocationStatus,
    StatusMessage: S.optional(S.String),
    RequestTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    RequestCompletionTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CapacityAllocation",
}) as any as S.Schema<CapacityAllocation>;
export interface CapacityReservation {
  Name: string;
  Status: CapacityReservationStatus;
  TargetDpus: number;
  AllocatedDpus: number;
  LastAllocation?: CapacityAllocation;
  LastSuccessfulAllocationTime?: Date;
  CreationTime: Date;
}
export const CapacityReservation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Status: CapacityReservationStatus,
    TargetDpus: S.Number,
    AllocatedDpus: S.Number,
    LastAllocation: S.optional(CapacityAllocation),
    LastSuccessfulAllocationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CreationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CapacityReservation",
}) as any as S.Schema<CapacityReservation>;
export interface GetCapacityReservationOutput {
  CapacityReservation: CapacityReservation;
}
export const GetCapacityReservationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CapacityReservation: CapacityReservation }),
).annotate({
  identifier: "GetCapacityReservationOutput",
}) as any as S.Schema<GetCapacityReservationOutput>;
export interface GetDatabaseInput {
  CatalogName: string;
  DatabaseName: string;
  WorkGroup?: string;
}
export const GetDatabaseInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogName: S.String,
    DatabaseName: S.String,
    WorkGroup: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDatabaseInput",
}) as any as S.Schema<GetDatabaseInput>;
export interface Database {
  Name: string;
  Description?: string;
  Parameters?: { [key: string]: string | undefined };
}
export const Database = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    Parameters: S.optional(ParametersMap),
  }),
).annotate({ identifier: "Database" }) as any as S.Schema<Database>;
export interface GetDatabaseOutput {
  Database?: Database;
}
export const GetDatabaseOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Database: S.optional(Database) }),
).annotate({
  identifier: "GetDatabaseOutput",
}) as any as S.Schema<GetDatabaseOutput>;
export interface GetDataCatalogInput {
  Name: string;
  WorkGroup?: string;
}
export const GetDataCatalogInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, WorkGroup: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDataCatalogInput",
}) as any as S.Schema<GetDataCatalogInput>;
export interface GetDataCatalogOutput {
  DataCatalog?: DataCatalog;
}
export const GetDataCatalogOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataCatalog: S.optional(DataCatalog) }),
).annotate({
  identifier: "GetDataCatalogOutput",
}) as any as S.Schema<GetDataCatalogOutput>;
export interface GetNamedQueryInput {
  NamedQueryId: string;
}
export const GetNamedQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NamedQueryId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetNamedQueryInput",
}) as any as S.Schema<GetNamedQueryInput>;
export interface GetNamedQueryOutput {
  NamedQuery?: NamedQuery;
}
export const GetNamedQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NamedQuery: S.optional(NamedQuery) }),
).annotate({
  identifier: "GetNamedQueryOutput",
}) as any as S.Schema<GetNamedQueryOutput>;
export interface GetNotebookMetadataInput {
  NotebookId: string;
}
export const GetNotebookMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NotebookId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetNotebookMetadataInput",
}) as any as S.Schema<GetNotebookMetadataInput>;
export interface GetNotebookMetadataOutput {
  NotebookMetadata?: NotebookMetadata;
}
export const GetNotebookMetadataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NotebookMetadata: S.optional(NotebookMetadata) }),
).annotate({
  identifier: "GetNotebookMetadataOutput",
}) as any as S.Schema<GetNotebookMetadataOutput>;
export interface GetPreparedStatementInput {
  StatementName: string;
  WorkGroup: string;
}
export const GetPreparedStatementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StatementName: S.String, WorkGroup: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetPreparedStatementInput",
}) as any as S.Schema<GetPreparedStatementInput>;
export interface GetPreparedStatementOutput {
  PreparedStatement?: PreparedStatement;
}
export const GetPreparedStatementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PreparedStatement: S.optional(PreparedStatement) }),
).annotate({
  identifier: "GetPreparedStatementOutput",
}) as any as S.Schema<GetPreparedStatementOutput>;
export interface GetQueryExecutionInput {
  QueryExecutionId: string;
}
export const GetQueryExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QueryExecutionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetQueryExecutionInput",
}) as any as S.Schema<GetQueryExecutionInput>;
export interface GetQueryExecutionOutput {
  QueryExecution?: QueryExecution;
}
export const GetQueryExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QueryExecution: S.optional(QueryExecution) }),
).annotate({
  identifier: "GetQueryExecutionOutput",
}) as any as S.Schema<GetQueryExecutionOutput>;
export type Token = string;
export type MaxQueryResults = number;
export type QueryResultType = "DATA_MANIFEST" | "DATA_ROWS" | (string & {});
export const QueryResultType = S.String;

export interface GetQueryResultsInput {
  QueryExecutionId: string;
  NextToken?: string;
  MaxResults?: number;
  QueryResultType?: QueryResultType;
}
export const GetQueryResultsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryExecutionId: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    QueryResultType: S.optional(QueryResultType),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetQueryResultsInput",
}) as any as S.Schema<GetQueryResultsInput>;
export type DatumString = string;
export interface Datum {
  VarCharValue?: string;
}
export const Datum = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VarCharValue: S.optional(S.String) }),
).annotate({ identifier: "Datum" }) as any as S.Schema<Datum>;
export type DatumList = Datum[];
export const DatumList = /*@__PURE__*/ S.Array(Datum);
export interface Row {
  Data?: Datum[];
}
export const Row = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Data: S.optional(DatumList) }),
).annotate({ identifier: "Row" }) as any as S.Schema<Row>;
export type RowList = Row[];
export const RowList = /*@__PURE__*/ S.Array(Row);
export type ColumnNullable =
  | "NOT_NULL"
  | "NULLABLE"
  | "UNKNOWN"
  | (string & {});
export const ColumnNullable = S.String;

export interface ColumnInfo {
  CatalogName?: string;
  SchemaName?: string;
  TableName?: string;
  Name: string;
  Label?: string;
  Type: string;
  Precision?: number;
  Scale?: number;
  Nullable?: ColumnNullable;
  CaseSensitive?: boolean;
}
export const ColumnInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogName: S.optional(S.String),
    SchemaName: S.optional(S.String),
    TableName: S.optional(S.String),
    Name: S.String,
    Label: S.optional(S.String),
    Type: S.String,
    Precision: S.optional(S.Number),
    Scale: S.optional(S.Number),
    Nullable: S.optional(ColumnNullable),
    CaseSensitive: S.optional(S.Boolean),
  }),
).annotate({ identifier: "ColumnInfo" }) as any as S.Schema<ColumnInfo>;
export type ColumnInfoList = ColumnInfo[];
export const ColumnInfoList = /*@__PURE__*/ S.Array(ColumnInfo);
export interface ResultSetMetadata {
  ColumnInfo?: ColumnInfo[];
}
export const ResultSetMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ColumnInfo: S.optional(ColumnInfoList) }),
).annotate({
  identifier: "ResultSetMetadata",
}) as any as S.Schema<ResultSetMetadata>;
export interface ResultSet {
  Rows?: Row[];
  ResultSetMetadata?: ResultSetMetadata;
}
export const ResultSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Rows: S.optional(RowList),
    ResultSetMetadata: S.optional(ResultSetMetadata),
  }),
).annotate({ identifier: "ResultSet" }) as any as S.Schema<ResultSet>;
export interface GetQueryResultsOutput {
  UpdateCount?: number;
  ResultSet?: ResultSet;
  NextToken?: string;
}
export const GetQueryResultsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UpdateCount: S.optional(S.Number),
    ResultSet: S.optional(ResultSet),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetQueryResultsOutput",
}) as any as S.Schema<GetQueryResultsOutput>;
export interface GetQueryRuntimeStatisticsInput {
  QueryExecutionId: string;
}
export const GetQueryRuntimeStatisticsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QueryExecutionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetQueryRuntimeStatisticsInput",
}) as any as S.Schema<GetQueryRuntimeStatisticsInput>;
export interface QueryRuntimeStatisticsTimeline {
  QueryQueueTimeInMillis?: number;
  ServicePreProcessingTimeInMillis?: number;
  QueryPlanningTimeInMillis?: number;
  EngineExecutionTimeInMillis?: number;
  ServiceProcessingTimeInMillis?: number;
  TotalExecutionTimeInMillis?: number;
}
export const QueryRuntimeStatisticsTimeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryQueueTimeInMillis: S.optional(S.Number),
    ServicePreProcessingTimeInMillis: S.optional(S.Number),
    QueryPlanningTimeInMillis: S.optional(S.Number),
    EngineExecutionTimeInMillis: S.optional(S.Number),
    ServiceProcessingTimeInMillis: S.optional(S.Number),
    TotalExecutionTimeInMillis: S.optional(S.Number),
  }),
).annotate({
  identifier: "QueryRuntimeStatisticsTimeline",
}) as any as S.Schema<QueryRuntimeStatisticsTimeline>;
export interface QueryRuntimeStatisticsRows {
  InputRows?: number;
  InputBytes?: number;
  OutputBytes?: number;
  OutputRows?: number;
}
export const QueryRuntimeStatisticsRows = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputRows: S.optional(S.Number),
    InputBytes: S.optional(S.Number),
    OutputBytes: S.optional(S.Number),
    OutputRows: S.optional(S.Number),
  }),
).annotate({
  identifier: "QueryRuntimeStatisticsRows",
}) as any as S.Schema<QueryRuntimeStatisticsRows>;
export type QueryStagePlanNodes = QueryStagePlanNode[];
export const QueryStagePlanNodes = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<QueryStagePlanNode> => QueryStagePlanNode).annotate({
    identifier: "QueryStagePlanNode",
  }),
) as any as S.Schema<QueryStagePlanNodes>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface QueryStagePlanNode {
  Name?: string;
  Identifier?: string;
  Children?: QueryStagePlanNode[];
  RemoteSources?: string[];
}
export const QueryStagePlanNode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Identifier: S.optional(S.String),
    Children: S.optional(
      S.suspend(() => QueryStagePlanNodes).annotate({
        identifier: "QueryStagePlanNodes",
      }),
    ),
    RemoteSources: S.optional(StringList),
  }),
).annotate({
  identifier: "QueryStagePlanNode",
}) as any as S.Schema<QueryStagePlanNode>;
export type QueryStages = QueryStage[];
export const QueryStages = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<QueryStage> => QueryStage).annotate({
    identifier: "QueryStage",
  }),
) as any as S.Schema<QueryStages>;
export interface QueryStage {
  StageId?: number;
  State?: string;
  OutputBytes?: number;
  OutputRows?: number;
  InputBytes?: number;
  InputRows?: number;
  ExecutionTime?: number;
  QueryStagePlan?: QueryStagePlanNode;
  SubStages?: QueryStage[];
}
export const QueryStage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StageId: S.optional(S.Number),
    State: S.optional(S.String),
    OutputBytes: S.optional(S.Number),
    OutputRows: S.optional(S.Number),
    InputBytes: S.optional(S.Number),
    InputRows: S.optional(S.Number),
    ExecutionTime: S.optional(S.Number),
    QueryStagePlan: S.optional(
      S.suspend(
        (): S.Schema<QueryStagePlanNode> => QueryStagePlanNode,
      ).annotate({ identifier: "QueryStagePlanNode" }),
    ),
    SubStages: S.optional(
      S.suspend(() => QueryStages).annotate({ identifier: "QueryStages" }),
    ),
  }),
).annotate({ identifier: "QueryStage" }) as any as S.Schema<QueryStage>;
export interface QueryRuntimeStatistics {
  Timeline?: QueryRuntimeStatisticsTimeline;
  Rows?: QueryRuntimeStatisticsRows;
  OutputStage?: QueryStage;
}
export const QueryRuntimeStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timeline: S.optional(QueryRuntimeStatisticsTimeline),
    Rows: S.optional(QueryRuntimeStatisticsRows),
    OutputStage: S.optional(QueryStage),
  }),
).annotate({
  identifier: "QueryRuntimeStatistics",
}) as any as S.Schema<QueryRuntimeStatistics>;
export interface GetQueryRuntimeStatisticsOutput {
  QueryRuntimeStatistics?: QueryRuntimeStatistics;
}
export const GetQueryRuntimeStatisticsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QueryRuntimeStatistics: S.optional(QueryRuntimeStatistics) }),
).annotate({
  identifier: "GetQueryRuntimeStatisticsOutput",
}) as any as S.Schema<GetQueryRuntimeStatisticsOutput>;
export type AmazonResourceName = string;
export interface GetResourceDashboardRequest {
  ResourceARN: string;
}
export const GetResourceDashboardRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourceDashboardRequest",
}) as any as S.Schema<GetResourceDashboardRequest>;
export interface GetResourceDashboardResponse {
  Url: string;
}
export const GetResourceDashboardResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Url: S.String }),
).annotate({
  identifier: "GetResourceDashboardResponse",
}) as any as S.Schema<GetResourceDashboardResponse>;
export interface GetSessionRequest {
  SessionId: string;
}
export const GetSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSessionRequest",
}) as any as S.Schema<GetSessionRequest>;
export type SessionIdleTimeoutInMinutes = number;
export interface SessionConfiguration {
  ExecutionRole?: string;
  WorkingDirectory?: string;
  IdleTimeoutSeconds?: number;
  SessionIdleTimeoutInMinutes?: number;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export const SessionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutionRole: S.optional(S.String),
    WorkingDirectory: S.optional(S.String),
    IdleTimeoutSeconds: S.optional(S.Number),
    SessionIdleTimeoutInMinutes: S.optional(S.Number),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
  }),
).annotate({
  identifier: "SessionConfiguration",
}) as any as S.Schema<SessionConfiguration>;
export type SessionState =
  | "CREATING"
  | "CREATED"
  | "IDLE"
  | "BUSY"
  | "TERMINATING"
  | "TERMINATED"
  | "DEGRADED"
  | "FAILED"
  | (string & {});
export const SessionState = S.String;

export interface SessionStatus {
  StartDateTime?: Date;
  LastModifiedDateTime?: Date;
  EndDateTime?: Date;
  IdleSinceDateTime?: Date;
  State?: SessionState;
  StateChangeReason?: string;
}
export const SessionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EndDateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IdleSinceDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    State: S.optional(SessionState),
    StateChangeReason: S.optional(S.String),
  }),
).annotate({ identifier: "SessionStatus" }) as any as S.Schema<SessionStatus>;
export interface SessionStatistics {
  DpuExecutionInMillis?: number;
}
export const SessionStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DpuExecutionInMillis: S.optional(S.Number) }),
).annotate({
  identifier: "SessionStatistics",
}) as any as S.Schema<SessionStatistics>;
export interface GetSessionResponse {
  SessionId?: string;
  Description?: string;
  WorkGroup?: string;
  EngineVersion?: string;
  EngineConfiguration?: EngineConfiguration;
  NotebookVersion?: string;
  MonitoringConfiguration?: MonitoringConfiguration;
  SessionConfiguration?: SessionConfiguration;
  Status?: SessionStatus;
  Statistics?: SessionStatistics;
}
export const GetSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.optional(S.String),
    Description: S.optional(S.String),
    WorkGroup: S.optional(S.String),
    EngineVersion: S.optional(S.String),
    EngineConfiguration: S.optional(EngineConfiguration),
    NotebookVersion: S.optional(S.String),
    MonitoringConfiguration: S.optional(MonitoringConfiguration),
    SessionConfiguration: S.optional(SessionConfiguration),
    Status: S.optional(SessionStatus),
    Statistics: S.optional(SessionStatistics),
  }),
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
export interface GetSessionEndpointResponse {
  EndpointUrl: string;
  AuthToken: string;
  AuthTokenExpirationTime: Date;
}
export const GetSessionEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointUrl: S.String,
    AuthToken: S.String,
    AuthTokenExpirationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetSessionEndpointResponse",
}) as any as S.Schema<GetSessionEndpointResponse>;
export interface GetSessionStatusRequest {
  SessionId: string;
}
export const GetSessionStatusRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSessionStatusRequest",
}) as any as S.Schema<GetSessionStatusRequest>;
export interface GetSessionStatusResponse {
  SessionId?: string;
  Status?: SessionStatus;
}
export const GetSessionStatusResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.optional(S.String),
    Status: S.optional(SessionStatus),
  }),
).annotate({
  identifier: "GetSessionStatusResponse",
}) as any as S.Schema<GetSessionStatusResponse>;
export interface GetTableMetadataInput {
  CatalogName: string;
  DatabaseName: string;
  TableName: string;
  WorkGroup?: string;
}
export const GetTableMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogName: S.String,
    DatabaseName: S.String,
    TableName: S.String,
    WorkGroup: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTableMetadataInput",
}) as any as S.Schema<GetTableMetadataInput>;
export type TableTypeString = string;
export type TypeString = string;
export type CommentString = string;
export interface Column {
  Name: string;
  Type?: string;
  Comment?: string;
}
export const Column = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Type: S.optional(S.String),
    Comment: S.optional(S.String),
  }),
).annotate({ identifier: "Column" }) as any as S.Schema<Column>;
export type ColumnList = Column[];
export const ColumnList = /*@__PURE__*/ S.Array(Column);
export interface TableMetadata {
  Name: string;
  CreateTime?: Date;
  LastAccessTime?: Date;
  TableType?: string;
  Columns?: Column[];
  PartitionKeys?: Column[];
  Parameters?: { [key: string]: string | undefined };
}
export const TableMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastAccessTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TableType: S.optional(S.String),
    Columns: S.optional(ColumnList),
    PartitionKeys: S.optional(ColumnList),
    Parameters: S.optional(ParametersMap),
  }),
).annotate({ identifier: "TableMetadata" }) as any as S.Schema<TableMetadata>;
export interface GetTableMetadataOutput {
  TableMetadata?: TableMetadata;
}
export const GetTableMetadataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TableMetadata: S.optional(TableMetadata) }),
).annotate({
  identifier: "GetTableMetadataOutput",
}) as any as S.Schema<GetTableMetadataOutput>;
export interface GetWorkGroupInput {
  WorkGroup: string;
}
export const GetWorkGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkGroup: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetWorkGroupInput",
}) as any as S.Schema<GetWorkGroupInput>;
export type WorkGroupState = "ENABLED" | "DISABLED" | (string & {});
export const WorkGroupState = S.String;

export type IdentityCenterApplicationArn = string;
export interface WorkGroup {
  Name: string;
  State?: WorkGroupState;
  Configuration?: WorkGroupConfiguration;
  Description?: string;
  CreationTime?: Date;
  IdentityCenterApplicationArn?: string;
}
export const WorkGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    State: S.optional(WorkGroupState),
    Configuration: S.optional(WorkGroupConfiguration),
    Description: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    IdentityCenterApplicationArn: S.optional(S.String),
  }),
).annotate({ identifier: "WorkGroup" }) as any as S.Schema<WorkGroup>;
export interface GetWorkGroupOutput {
  WorkGroup?: WorkGroup;
}
export const GetWorkGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WorkGroup: S.optional(WorkGroup) }),
).annotate({
  identifier: "GetWorkGroupOutput",
}) as any as S.Schema<GetWorkGroupOutput>;
export interface ImportNotebookInput {
  WorkGroup: string;
  Name: string;
  Payload?: string;
  Type: NotebookType;
  NotebookS3LocationUri?: string;
  ClientRequestToken?: string;
}
export const ImportNotebookInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkGroup: S.String,
    Name: S.String,
    Payload: S.optional(S.String),
    Type: NotebookType,
    NotebookS3LocationUri: S.optional(S.String),
    ClientRequestToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ImportNotebookInput",
}) as any as S.Schema<ImportNotebookInput>;
export interface ImportNotebookOutput {
  NotebookId?: string;
}
export const ImportNotebookOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NotebookId: S.optional(S.String) }),
).annotate({
  identifier: "ImportNotebookOutput",
}) as any as S.Schema<ImportNotebookOutput>;
export type MaxApplicationDPUSizesCount = number;
export interface ListApplicationDPUSizesInput {
  MaxResults?: number;
  NextToken?: string;
}
export const ListApplicationDPUSizesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListApplicationDPUSizesInput",
}) as any as S.Schema<ListApplicationDPUSizesInput>;
export type SupportedDPUSizeList = number[];
export const SupportedDPUSizeList = /*@__PURE__*/ S.Array(S.Number);
export interface ApplicationDPUSizes {
  ApplicationRuntimeId?: string;
  SupportedDPUSizes?: number[];
}
export const ApplicationDPUSizes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationRuntimeId: S.optional(S.String),
    SupportedDPUSizes: S.optional(SupportedDPUSizeList),
  }),
).annotate({
  identifier: "ApplicationDPUSizes",
}) as any as S.Schema<ApplicationDPUSizes>;
export type ApplicationDPUSizesList = ApplicationDPUSizes[];
export const ApplicationDPUSizesList =
  /*@__PURE__*/ S.Array(ApplicationDPUSizes);
export interface ListApplicationDPUSizesOutput {
  ApplicationDPUSizes?: ApplicationDPUSizes[];
  NextToken?: string;
}
export const ListApplicationDPUSizesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationDPUSizes: S.optional(ApplicationDPUSizesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListApplicationDPUSizesOutput",
}) as any as S.Schema<ListApplicationDPUSizesOutput>;
export type MaxCalculationsCount = number;
export type SessionManagerToken = string;
export interface ListCalculationExecutionsRequest {
  SessionId: string;
  StateFilter?: CalculationExecutionState;
  MaxResults?: number;
  NextToken?: string;
}
export const ListCalculationExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.String,
    StateFilter: S.optional(CalculationExecutionState),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCalculationExecutionsRequest",
}) as any as S.Schema<ListCalculationExecutionsRequest>;
export interface CalculationSummary {
  CalculationExecutionId?: string;
  Description?: string;
  Status?: CalculationStatus;
}
export const CalculationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculationExecutionId: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(CalculationStatus),
  }),
).annotate({
  identifier: "CalculationSummary",
}) as any as S.Schema<CalculationSummary>;
export type CalculationsList = CalculationSummary[];
export const CalculationsList = /*@__PURE__*/ S.Array(CalculationSummary);
export interface ListCalculationExecutionsResponse {
  NextToken?: string;
  Calculations?: CalculationSummary[];
}
export const ListCalculationExecutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Calculations: S.optional(CalculationsList),
  }),
).annotate({
  identifier: "ListCalculationExecutionsResponse",
}) as any as S.Schema<ListCalculationExecutionsResponse>;
export type MaxCapacityReservationsCount = number;
export interface ListCapacityReservationsInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListCapacityReservationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCapacityReservationsInput",
}) as any as S.Schema<ListCapacityReservationsInput>;
export type CapacityReservationsList = CapacityReservation[];
export const CapacityReservationsList =
  /*@__PURE__*/ S.Array(CapacityReservation);
export interface ListCapacityReservationsOutput {
  NextToken?: string;
  CapacityReservations: CapacityReservation[];
}
export const ListCapacityReservationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    CapacityReservations: CapacityReservationsList,
  }),
).annotate({
  identifier: "ListCapacityReservationsOutput",
}) as any as S.Schema<ListCapacityReservationsOutput>;
export type MaxDatabasesCount = number;
export interface ListDatabasesInput {
  CatalogName: string;
  NextToken?: string;
  MaxResults?: number;
  WorkGroup?: string;
}
export const ListDatabasesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogName: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    WorkGroup: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatabasesInput",
}) as any as S.Schema<ListDatabasesInput>;
export type DatabaseList = Database[];
export const DatabaseList = /*@__PURE__*/ S.Array(Database);
export interface ListDatabasesOutput {
  DatabaseList?: Database[];
  NextToken?: string;
}
export const ListDatabasesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseList: S.optional(DatabaseList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatabasesOutput",
}) as any as S.Schema<ListDatabasesOutput>;
export type MaxDataCatalogsCount = number;
export interface ListDataCatalogsInput {
  NextToken?: string;
  MaxResults?: number;
  WorkGroup?: string;
}
export const ListDataCatalogsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    WorkGroup: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDataCatalogsInput",
}) as any as S.Schema<ListDataCatalogsInput>;
export interface DataCatalogSummary {
  CatalogName?: string;
  Type?: DataCatalogType;
  Status?: DataCatalogStatus;
  ConnectionType?: ConnectionType;
  Error?: string;
}
export const DataCatalogSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogName: S.optional(S.String),
    Type: S.optional(DataCatalogType),
    Status: S.optional(DataCatalogStatus),
    ConnectionType: S.optional(ConnectionType),
    Error: S.optional(S.String),
  }),
).annotate({
  identifier: "DataCatalogSummary",
}) as any as S.Schema<DataCatalogSummary>;
export type DataCatalogSummaryList = DataCatalogSummary[];
export const DataCatalogSummaryList = /*@__PURE__*/ S.Array(DataCatalogSummary);
export interface ListDataCatalogsOutput {
  DataCatalogsSummary?: DataCatalogSummary[];
  NextToken?: string;
}
export const ListDataCatalogsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataCatalogsSummary: S.optional(DataCatalogSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDataCatalogsOutput",
}) as any as S.Schema<ListDataCatalogsOutput>;
export type MaxEngineVersionsCount = number;
export interface ListEngineVersionsInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListEngineVersionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListEngineVersionsInput",
}) as any as S.Schema<ListEngineVersionsInput>;
export type EngineVersionsList = EngineVersion[];
export const EngineVersionsList = /*@__PURE__*/ S.Array(EngineVersion);
export interface ListEngineVersionsOutput {
  EngineVersions?: EngineVersion[];
  NextToken?: string;
}
export const ListEngineVersionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EngineVersions: S.optional(EngineVersionsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEngineVersionsOutput",
}) as any as S.Schema<ListEngineVersionsOutput>;
export type ExecutorState =
  | "CREATING"
  | "CREATED"
  | "REGISTERED"
  | "TERMINATING"
  | "TERMINATED"
  | "FAILED"
  | (string & {});
export const ExecutorState = S.String;

export type MaxListExecutorsCount = number;
export interface ListExecutorsRequest {
  SessionId: string;
  ExecutorStateFilter?: ExecutorState;
  MaxResults?: number;
  NextToken?: string;
}
export const ListExecutorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.String,
    ExecutorStateFilter: S.optional(ExecutorState),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListExecutorsRequest",
}) as any as S.Schema<ListExecutorsRequest>;
export type ExecutorId = string;
export type ExecutorType = "COORDINATOR" | "GATEWAY" | "WORKER" | (string & {});
export const ExecutorType = S.String;

export interface ExecutorsSummary {
  ExecutorId: string;
  ExecutorType?: ExecutorType;
  StartDateTime?: number;
  TerminationDateTime?: number;
  ExecutorState?: ExecutorState;
  ExecutorSize?: number;
}
export const ExecutorsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutorId: S.String,
    ExecutorType: S.optional(ExecutorType),
    StartDateTime: S.optional(S.Number),
    TerminationDateTime: S.optional(S.Number),
    ExecutorState: S.optional(ExecutorState),
    ExecutorSize: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExecutorsSummary",
}) as any as S.Schema<ExecutorsSummary>;
export type ExecutorsSummaryList = ExecutorsSummary[];
export const ExecutorsSummaryList = /*@__PURE__*/ S.Array(ExecutorsSummary);
export interface ListExecutorsResponse {
  SessionId: string;
  NextToken?: string;
  ExecutorsSummary?: ExecutorsSummary[];
}
export const ListExecutorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.String,
    NextToken: S.optional(S.String),
    ExecutorsSummary: S.optional(ExecutorsSummaryList),
  }),
).annotate({
  identifier: "ListExecutorsResponse",
}) as any as S.Schema<ListExecutorsResponse>;
export type MaxNamedQueriesCount = number;
export interface ListNamedQueriesInput {
  NextToken?: string;
  MaxResults?: number;
  WorkGroup?: string;
}
export const ListNamedQueriesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    WorkGroup: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListNamedQueriesInput",
}) as any as S.Schema<ListNamedQueriesInput>;
export interface ListNamedQueriesOutput {
  NamedQueryIds?: string[];
  NextToken?: string;
}
export const ListNamedQueriesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamedQueryIds: S.optional(NamedQueryIdList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNamedQueriesOutput",
}) as any as S.Schema<ListNamedQueriesOutput>;
export interface FilterDefinition {
  Name?: string;
}
export const FilterDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "FilterDefinition",
}) as any as S.Schema<FilterDefinition>;
export type MaxNotebooksCount = number;
export interface ListNotebookMetadataInput {
  Filters?: FilterDefinition;
  NextToken?: string;
  MaxResults?: number;
  WorkGroup: string;
}
export const ListNotebookMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filters: S.optional(FilterDefinition),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    WorkGroup: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListNotebookMetadataInput",
}) as any as S.Schema<ListNotebookMetadataInput>;
export type NotebookMetadataArray = NotebookMetadata[];
export const NotebookMetadataArray = /*@__PURE__*/ S.Array(NotebookMetadata);
export interface ListNotebookMetadataOutput {
  NextToken?: string;
  NotebookMetadataList?: NotebookMetadata[];
}
export const ListNotebookMetadataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    NotebookMetadataList: S.optional(NotebookMetadataArray),
  }),
).annotate({
  identifier: "ListNotebookMetadataOutput",
}) as any as S.Schema<ListNotebookMetadataOutput>;
export type MaxSessionsCount = number;
export interface ListNotebookSessionsRequest {
  NotebookId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListNotebookSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotebookId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListNotebookSessionsRequest",
}) as any as S.Schema<ListNotebookSessionsRequest>;
export interface NotebookSessionSummary {
  SessionId?: string;
  CreationTime?: Date;
}
export const NotebookSessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "NotebookSessionSummary",
}) as any as S.Schema<NotebookSessionSummary>;
export type NotebookSessionsList = NotebookSessionSummary[];
export const NotebookSessionsList = /*@__PURE__*/ S.Array(
  NotebookSessionSummary,
);
export interface ListNotebookSessionsResponse {
  NotebookSessionsList: NotebookSessionSummary[];
  NextToken?: string;
}
export const ListNotebookSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotebookSessionsList: NotebookSessionsList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNotebookSessionsResponse",
}) as any as S.Schema<ListNotebookSessionsResponse>;
export type MaxPreparedStatementsCount = number;
export interface ListPreparedStatementsInput {
  WorkGroup: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListPreparedStatementsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkGroup: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPreparedStatementsInput",
}) as any as S.Schema<ListPreparedStatementsInput>;
export interface PreparedStatementSummary {
  StatementName?: string;
  LastModifiedTime?: Date;
}
export const PreparedStatementSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatementName: S.optional(S.String),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PreparedStatementSummary",
}) as any as S.Schema<PreparedStatementSummary>;
export type PreparedStatementsList = PreparedStatementSummary[];
export const PreparedStatementsList = /*@__PURE__*/ S.Array(
  PreparedStatementSummary,
);
export interface ListPreparedStatementsOutput {
  PreparedStatements?: PreparedStatementSummary[];
  NextToken?: string;
}
export const ListPreparedStatementsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PreparedStatements: S.optional(PreparedStatementsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPreparedStatementsOutput",
}) as any as S.Schema<ListPreparedStatementsOutput>;
export type MaxQueryExecutionsCount = number;
export interface ListQueryExecutionsInput {
  NextToken?: string;
  MaxResults?: number;
  WorkGroup?: string;
}
export const ListQueryExecutionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    WorkGroup: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListQueryExecutionsInput",
}) as any as S.Schema<ListQueryExecutionsInput>;
export interface ListQueryExecutionsOutput {
  QueryExecutionIds?: string[];
  NextToken?: string;
}
export const ListQueryExecutionsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryExecutionIds: S.optional(QueryExecutionIdList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListQueryExecutionsOutput",
}) as any as S.Schema<ListQueryExecutionsOutput>;
export interface ListSessionsRequest {
  WorkGroup: string;
  StateFilter?: SessionState;
  MaxResults?: number;
  NextToken?: string;
}
export const ListSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkGroup: S.String,
    StateFilter: S.optional(SessionState),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSessionsRequest",
}) as any as S.Schema<ListSessionsRequest>;
export interface SessionSummary {
  SessionId?: string;
  Description?: string;
  EngineVersion?: EngineVersion;
  NotebookVersion?: string;
  Status?: SessionStatus;
}
export const SessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.optional(S.String),
    Description: S.optional(S.String),
    EngineVersion: S.optional(EngineVersion),
    NotebookVersion: S.optional(S.String),
    Status: S.optional(SessionStatus),
  }),
).annotate({ identifier: "SessionSummary" }) as any as S.Schema<SessionSummary>;
export type SessionsList = SessionSummary[];
export const SessionsList = /*@__PURE__*/ S.Array(SessionSummary);
export interface ListSessionsResponse {
  NextToken?: string;
  Sessions?: SessionSummary[];
}
export const ListSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Sessions: S.optional(SessionsList),
  }),
).annotate({
  identifier: "ListSessionsResponse",
}) as any as S.Schema<ListSessionsResponse>;
export type ExpressionString = string;
export type MaxTableMetadataCount = number;
export interface ListTableMetadataInput {
  CatalogName: string;
  DatabaseName: string;
  Expression?: string;
  NextToken?: string;
  MaxResults?: number;
  WorkGroup?: string;
}
export const ListTableMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CatalogName: S.String,
    DatabaseName: S.String,
    Expression: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    WorkGroup: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTableMetadataInput",
}) as any as S.Schema<ListTableMetadataInput>;
export type TableMetadataList = TableMetadata[];
export const TableMetadataList = /*@__PURE__*/ S.Array(TableMetadata);
export interface ListTableMetadataOutput {
  TableMetadataList?: TableMetadata[];
  NextToken?: string;
}
export const ListTableMetadataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableMetadataList: S.optional(TableMetadataList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTableMetadataOutput",
}) as any as S.Schema<ListTableMetadataOutput>;
export type MaxTagsCount = number;
export interface ListTagsForResourceInput {
  ResourceARN: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.String,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  Tags?: Tag[];
  NextToken?: string;
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export type MaxWorkGroupsCount = number;
export interface ListWorkGroupsInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListWorkGroupsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListWorkGroupsInput",
}) as any as S.Schema<ListWorkGroupsInput>;
export interface WorkGroupSummary {
  Name?: string;
  State?: WorkGroupState;
  Description?: string;
  CreationTime?: Date;
  EngineVersion?: EngineVersion;
  IdentityCenterApplicationArn?: string;
}
export const WorkGroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    State: S.optional(WorkGroupState),
    Description: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EngineVersion: S.optional(EngineVersion),
    IdentityCenterApplicationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "WorkGroupSummary",
}) as any as S.Schema<WorkGroupSummary>;
export type WorkGroupsList = WorkGroupSummary[];
export const WorkGroupsList = /*@__PURE__*/ S.Array(WorkGroupSummary);
export interface ListWorkGroupsOutput {
  WorkGroups?: WorkGroupSummary[];
  NextToken?: string;
}
export const ListWorkGroupsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkGroups: S.optional(WorkGroupsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWorkGroupsOutput",
}) as any as S.Schema<ListWorkGroupsOutput>;
export interface PutCapacityAssignmentConfigurationInput {
  CapacityReservationName: string;
  CapacityAssignments: CapacityAssignment[];
}
export const PutCapacityAssignmentConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CapacityReservationName: S.String,
      CapacityAssignments: CapacityAssignmentsList,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "PutCapacityAssignmentConfigurationInput",
}) as any as S.Schema<PutCapacityAssignmentConfigurationInput>;
export interface PutCapacityAssignmentConfigurationOutput {}
export const PutCapacityAssignmentConfigurationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutCapacityAssignmentConfigurationOutput",
}) as any as S.Schema<PutCapacityAssignmentConfigurationOutput>;
export interface CalculationConfiguration {
  CodeBlock?: string;
}
export const CalculationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CodeBlock: S.optional(S.String) }),
).annotate({
  identifier: "CalculationConfiguration",
}) as any as S.Schema<CalculationConfiguration>;
export interface StartCalculationExecutionRequest {
  SessionId: string;
  Description?: string;
  CalculationConfiguration?: CalculationConfiguration;
  CodeBlock?: string;
  ClientRequestToken?: string;
}
export const StartCalculationExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.String,
    Description: S.optional(S.String),
    CalculationConfiguration: S.optional(CalculationConfiguration),
    CodeBlock: S.optional(S.String),
    ClientRequestToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartCalculationExecutionRequest",
}) as any as S.Schema<StartCalculationExecutionRequest>;
export interface StartCalculationExecutionResponse {
  CalculationExecutionId?: string;
  State?: CalculationExecutionState;
}
export const StartCalculationExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CalculationExecutionId: S.optional(S.String),
    State: S.optional(CalculationExecutionState),
  }),
).annotate({
  identifier: "StartCalculationExecutionResponse",
}) as any as S.Schema<StartCalculationExecutionResponse>;
export interface StartQueryExecutionInput {
  QueryString: string;
  ClientRequestToken?: string;
  QueryExecutionContext?: QueryExecutionContext;
  ResultConfiguration?: ResultConfiguration;
  WorkGroup?: string;
  ExecutionParameters?: string[];
  ResultReuseConfiguration?: ResultReuseConfiguration;
  EngineConfiguration?: EngineConfiguration;
}
export const StartQueryExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryString: S.String,
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    QueryExecutionContext: S.optional(QueryExecutionContext),
    ResultConfiguration: S.optional(ResultConfiguration),
    WorkGroup: S.optional(S.String),
    ExecutionParameters: S.optional(ExecutionParameters),
    ResultReuseConfiguration: S.optional(ResultReuseConfiguration),
    EngineConfiguration: S.optional(EngineConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartQueryExecutionInput",
}) as any as S.Schema<StartQueryExecutionInput>;
export interface StartQueryExecutionOutput {
  QueryExecutionId?: string;
}
export const StartQueryExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QueryExecutionId: S.optional(S.String) }),
).annotate({
  identifier: "StartQueryExecutionOutput",
}) as any as S.Schema<StartQueryExecutionOutput>;
export interface StartSessionRequest {
  Description?: string;
  WorkGroup: string;
  EngineConfiguration: EngineConfiguration;
  ExecutionRole?: string;
  MonitoringConfiguration?: MonitoringConfiguration;
  NotebookVersion?: string;
  SessionIdleTimeoutInMinutes?: number;
  ClientRequestToken?: string;
  Tags?: Tag[];
  CopyWorkGroupTags?: boolean;
}
export const StartSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    WorkGroup: S.String,
    EngineConfiguration: EngineConfiguration,
    ExecutionRole: S.optional(S.String),
    MonitoringConfiguration: S.optional(MonitoringConfiguration),
    NotebookVersion: S.optional(S.String),
    SessionIdleTimeoutInMinutes: S.optional(S.Number),
    ClientRequestToken: S.optional(S.String),
    Tags: S.optional(TagList),
    CopyWorkGroupTags: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartSessionRequest",
}) as any as S.Schema<StartSessionRequest>;
export interface StartSessionResponse {
  SessionId?: string;
  State?: SessionState;
}
export const StartSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.optional(S.String),
    State: S.optional(SessionState),
  }),
).annotate({
  identifier: "StartSessionResponse",
}) as any as S.Schema<StartSessionResponse>;
export interface StopCalculationExecutionRequest {
  CalculationExecutionId: string;
}
export const StopCalculationExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CalculationExecutionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopCalculationExecutionRequest",
}) as any as S.Schema<StopCalculationExecutionRequest>;
export interface StopCalculationExecutionResponse {
  State?: CalculationExecutionState;
}
export const StopCalculationExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ State: S.optional(CalculationExecutionState) }),
).annotate({
  identifier: "StopCalculationExecutionResponse",
}) as any as S.Schema<StopCalculationExecutionResponse>;
export interface StopQueryExecutionInput {
  QueryExecutionId: string;
}
export const StopQueryExecutionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QueryExecutionId: S.String.pipe(T.IdempotencyToken()) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopQueryExecutionInput",
}) as any as S.Schema<StopQueryExecutionInput>;
export interface StopQueryExecutionOutput {}
export const StopQueryExecutionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopQueryExecutionOutput",
}) as any as S.Schema<StopQueryExecutionOutput>;
export interface TagResourceInput {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export interface TerminateSessionRequest {
  SessionId: string;
}
export const TerminateSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TerminateSessionRequest",
}) as any as S.Schema<TerminateSessionRequest>;
export interface TerminateSessionResponse {
  State?: SessionState;
}
export const TerminateSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ State: S.optional(SessionState) }),
).annotate({
  identifier: "TerminateSessionResponse",
}) as any as S.Schema<TerminateSessionResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UpdateCapacityReservationInput {
  TargetDpus: number;
  Name: string;
}
export const UpdateCapacityReservationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TargetDpus: S.Number, Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateCapacityReservationInput",
}) as any as S.Schema<UpdateCapacityReservationInput>;
export interface UpdateCapacityReservationOutput {}
export const UpdateCapacityReservationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCapacityReservationOutput",
}) as any as S.Schema<UpdateCapacityReservationOutput>;
export interface UpdateDataCatalogInput {
  Name: string;
  Type: DataCatalogType;
  Description?: string;
  Parameters?: { [key: string]: string | undefined };
}
export const UpdateDataCatalogInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Type: DataCatalogType,
    Description: S.optional(S.String),
    Parameters: S.optional(ParametersMap),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDataCatalogInput",
}) as any as S.Schema<UpdateDataCatalogInput>;
export interface UpdateDataCatalogOutput {}
export const UpdateDataCatalogOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDataCatalogOutput",
}) as any as S.Schema<UpdateDataCatalogOutput>;
export type NamedQueryDescriptionString = string;
export interface UpdateNamedQueryInput {
  NamedQueryId: string;
  Name: string;
  Description?: string;
  QueryString: string;
}
export const UpdateNamedQueryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NamedQueryId: S.String,
    Name: S.String,
    Description: S.optional(S.String),
    QueryString: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateNamedQueryInput",
}) as any as S.Schema<UpdateNamedQueryInput>;
export interface UpdateNamedQueryOutput {}
export const UpdateNamedQueryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateNamedQueryOutput",
}) as any as S.Schema<UpdateNamedQueryOutput>;
export interface UpdateNotebookInput {
  NotebookId: string;
  Payload: string;
  Type: NotebookType;
  SessionId?: string;
  ClientRequestToken?: string;
}
export const UpdateNotebookInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotebookId: S.String,
    Payload: S.String,
    Type: NotebookType,
    SessionId: S.optional(S.String),
    ClientRequestToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateNotebookInput",
}) as any as S.Schema<UpdateNotebookInput>;
export interface UpdateNotebookOutput {}
export const UpdateNotebookOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateNotebookOutput",
}) as any as S.Schema<UpdateNotebookOutput>;
export interface UpdateNotebookMetadataInput {
  NotebookId: string;
  ClientRequestToken?: string;
  Name: string;
}
export const UpdateNotebookMetadataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotebookId: S.String,
    ClientRequestToken: S.optional(S.String),
    Name: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateNotebookMetadataInput",
}) as any as S.Schema<UpdateNotebookMetadataInput>;
export interface UpdateNotebookMetadataOutput {}
export const UpdateNotebookMetadataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateNotebookMetadataOutput",
}) as any as S.Schema<UpdateNotebookMetadataOutput>;
export interface UpdatePreparedStatementInput {
  StatementName: string;
  WorkGroup: string;
  QueryStatement: string;
  Description?: string;
}
export const UpdatePreparedStatementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatementName: S.String,
    WorkGroup: S.String,
    QueryStatement: S.String,
    Description: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePreparedStatementInput",
}) as any as S.Schema<UpdatePreparedStatementInput>;
export interface UpdatePreparedStatementOutput {}
export const UpdatePreparedStatementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdatePreparedStatementOutput",
}) as any as S.Schema<UpdatePreparedStatementOutput>;
export interface ResultConfigurationUpdates {
  OutputLocation?: string;
  RemoveOutputLocation?: boolean;
  EncryptionConfiguration?: EncryptionConfiguration;
  RemoveEncryptionConfiguration?: boolean;
  ExpectedBucketOwner?: string;
  RemoveExpectedBucketOwner?: boolean;
  AclConfiguration?: AclConfiguration;
  RemoveAclConfiguration?: boolean;
}
export const ResultConfigurationUpdates = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputLocation: S.optional(S.String),
    RemoveOutputLocation: S.optional(S.Boolean),
    EncryptionConfiguration: S.optional(EncryptionConfiguration),
    RemoveEncryptionConfiguration: S.optional(S.Boolean),
    ExpectedBucketOwner: S.optional(S.String),
    RemoveExpectedBucketOwner: S.optional(S.Boolean),
    AclConfiguration: S.optional(AclConfiguration),
    RemoveAclConfiguration: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResultConfigurationUpdates",
}) as any as S.Schema<ResultConfigurationUpdates>;
export interface ManagedQueryResultsConfigurationUpdates {
  Enabled?: boolean;
  EncryptionConfiguration?: ManagedQueryResultsEncryptionConfiguration;
  RemoveEncryptionConfiguration?: boolean;
}
export const ManagedQueryResultsConfigurationUpdates = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Enabled: S.optional(S.Boolean),
      EncryptionConfiguration: S.optional(
        ManagedQueryResultsEncryptionConfiguration,
      ),
      RemoveEncryptionConfiguration: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "ManagedQueryResultsConfigurationUpdates",
}) as any as S.Schema<ManagedQueryResultsConfigurationUpdates>;
export interface WorkGroupConfigurationUpdates {
  EnforceWorkGroupConfiguration?: boolean;
  ResultConfigurationUpdates?: ResultConfigurationUpdates;
  ManagedQueryResultsConfigurationUpdates?: ManagedQueryResultsConfigurationUpdates;
  PublishCloudWatchMetricsEnabled?: boolean;
  BytesScannedCutoffPerQuery?: number;
  RemoveBytesScannedCutoffPerQuery?: boolean;
  RequesterPaysEnabled?: boolean;
  EngineVersion?: EngineVersion;
  RemoveCustomerContentEncryptionConfiguration?: boolean;
  AdditionalConfiguration?: string;
  ExecutionRole?: string;
  CustomerContentEncryptionConfiguration?: CustomerContentEncryptionConfiguration;
  EnableMinimumEncryptionConfiguration?: boolean;
  QueryResultsS3AccessGrantsConfiguration?: QueryResultsS3AccessGrantsConfiguration;
  MonitoringConfiguration?: MonitoringConfiguration;
  EngineConfiguration?: EngineConfiguration;
}
export const WorkGroupConfigurationUpdates = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EnforceWorkGroupConfiguration: S.optional(S.Boolean),
    ResultConfigurationUpdates: S.optional(ResultConfigurationUpdates),
    ManagedQueryResultsConfigurationUpdates: S.optional(
      ManagedQueryResultsConfigurationUpdates,
    ),
    PublishCloudWatchMetricsEnabled: S.optional(S.Boolean),
    BytesScannedCutoffPerQuery: S.optional(S.Number),
    RemoveBytesScannedCutoffPerQuery: S.optional(S.Boolean),
    RequesterPaysEnabled: S.optional(S.Boolean),
    EngineVersion: S.optional(EngineVersion),
    RemoveCustomerContentEncryptionConfiguration: S.optional(S.Boolean),
    AdditionalConfiguration: S.optional(S.String),
    ExecutionRole: S.optional(S.String),
    CustomerContentEncryptionConfiguration: S.optional(
      CustomerContentEncryptionConfiguration,
    ),
    EnableMinimumEncryptionConfiguration: S.optional(S.Boolean),
    QueryResultsS3AccessGrantsConfiguration: S.optional(
      QueryResultsS3AccessGrantsConfiguration,
    ),
    MonitoringConfiguration: S.optional(MonitoringConfiguration),
    EngineConfiguration: S.optional(EngineConfiguration),
  }),
).annotate({
  identifier: "WorkGroupConfigurationUpdates",
}) as any as S.Schema<WorkGroupConfigurationUpdates>;
export interface UpdateWorkGroupInput {
  WorkGroup: string;
  Description?: string;
  ConfigurationUpdates?: WorkGroupConfigurationUpdates;
  State?: WorkGroupState;
}
export const UpdateWorkGroupInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WorkGroup: S.String,
    Description: S.optional(S.String),
    ConfigurationUpdates: S.optional(WorkGroupConfigurationUpdates),
    State: S.optional(WorkGroupState),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateWorkGroupInput",
}) as any as S.Schema<UpdateWorkGroupInput>;
export interface UpdateWorkGroupOutput {}
export const UpdateWorkGroupOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateWorkGroupOutput",
}) as any as S.Schema<UpdateWorkGroupOutput>;
export type ThrottleReason = "CONCURRENT_QUERY_LIMIT_EXCEEDED" | (string & {});
export const ThrottleReason = S.String;

export type BatchGetNamedQueryError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns the details of a single named query or a list of up to 50 queries, which you
 * provide as an array of query ID strings. Requires you to have access to the workgroup in
 * which the queries were saved. Use ListNamedQueriesInput to get the
 * list of named query IDs in the specified workgroup. If information could not be
 * retrieved for a submitted query ID, information about the query ID submitted is listed
 * under UnprocessedNamedQueryId. Named queries differ from executed
 * queries. Use BatchGetQueryExecutionInput to get details about each
 * unique query execution, and ListQueryExecutionsInput to get a list of
 * query execution IDs.
 */
export const batchGetNamedQuery: API.OperationMethod<
  BatchGetNamedQueryInput,
  BatchGetNamedQueryOutput,
  BatchGetNamedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetNamedQueryInput,
  output: BatchGetNamedQueryOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetNamedQuery",
}));

export type BatchGetPreparedStatementError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns the details of a single prepared statement or a list of up to 256 prepared
 * statements for the array of prepared statement names that you provide. Requires you to
 * have access to the workgroup to which the prepared statements belong. If a prepared
 * statement cannot be retrieved for the name specified, the statement is listed in
 * `UnprocessedPreparedStatementNames`.
 */
export const batchGetPreparedStatement: API.OperationMethod<
  BatchGetPreparedStatementInput,
  BatchGetPreparedStatementOutput,
  BatchGetPreparedStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetPreparedStatementInput,
  output: BatchGetPreparedStatementOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetPreparedStatement",
}));

export type BatchGetQueryExecutionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns the details of a single query execution or a list of up to 50 query
 * executions, which you provide as an array of query execution ID strings. Requires you to
 * have access to the workgroup in which the queries ran. To get a list of query execution
 * IDs, use ListQueryExecutionsInput$WorkGroup. Query executions differ
 * from named (saved) queries. Use BatchGetNamedQueryInput to get details
 * about named queries.
 */
export const batchGetQueryExecution: API.OperationMethod<
  BatchGetQueryExecutionInput,
  BatchGetQueryExecutionOutput,
  BatchGetQueryExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetQueryExecutionInput,
  output: BatchGetQueryExecutionOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetQueryExecution",
}));

export type CancelCapacityReservationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Cancels the capacity reservation with the specified name. Cancelled reservations
 * remain in your account and will be deleted 45 days after cancellation. During the 45
 * days, you cannot re-purpose or reuse a reservation that has been cancelled, but you can
 * refer to its tags and view it for historical reference.
 */
export const cancelCapacityReservation: API.OperationMethod<
  CancelCapacityReservationInput,
  CancelCapacityReservationOutput,
  CancelCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelCapacityReservationInput,
  output: CancelCapacityReservationOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelCapacityReservation",
}));

export type CreateCapacityReservationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a capacity reservation with the specified name and number of requested data
 * processing units.
 */
export const createCapacityReservation: API.OperationMethod<
  CreateCapacityReservationInput,
  CreateCapacityReservationOutput,
  CreateCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCapacityReservationInput,
  output: CreateCapacityReservationOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCapacityReservation",
}));

export type CreateDataCatalogError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates (registers) a data catalog with the specified name and properties. Catalogs
 * created are visible to all users of the same Amazon Web Services account.
 *
 * For a `FEDERATED` catalog, this API operation creates the following
 * resources.
 *
 * - CFN Stack Name with a maximum length of 128 characters and prefix
 * `athenafederatedcatalog-CATALOG_NAME_SANITIZED` with length 23
 * characters.
 *
 * - Lambda Function Name with a maximum length of 64 characters and prefix
 * `athenafederatedcatalog_CATALOG_NAME_SANITIZED` with length 23
 * characters.
 *
 * - Glue Connection Name with a maximum length of 255 characters and a prefix
 * `athenafederatedcatalog_CATALOG_NAME_SANITIZED` with length 23
 * characters.
 */
export const createDataCatalog: API.OperationMethod<
  CreateDataCatalogInput,
  CreateDataCatalogOutput,
  CreateDataCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDataCatalogInput,
  output: CreateDataCatalogOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataCatalog",
}));

export type CreateNamedQueryError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a named query in the specified workgroup. Requires that you have access to the
 * workgroup.
 */
export const createNamedQuery: API.OperationMethod<
  CreateNamedQueryInput,
  CreateNamedQueryOutput,
  CreateNamedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNamedQueryInput,
  output: CreateNamedQueryOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNamedQuery",
}));

export type CreateNotebookError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an empty `ipynb` file in the specified Apache Spark enabled
 * workgroup. Throws an error if a file in the workgroup with the same name already
 * exists.
 */
export const createNotebook: API.OperationMethod<
  CreateNotebookInput,
  CreateNotebookOutput,
  CreateNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNotebookInput,
  output: CreateNotebookOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotebook",
}));

export type CreatePreparedStatementError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a prepared statement for use with SQL queries in Athena.
 */
export const createPreparedStatement: API.OperationMethod<
  CreatePreparedStatementInput,
  CreatePreparedStatementOutput,
  CreatePreparedStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePreparedStatementInput,
  output: CreatePreparedStatementOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePreparedStatement",
}));

export type CreatePresignedNotebookUrlError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets an authentication token and the URL at which the notebook can be accessed. During
 * programmatic access, `CreatePresignedNotebookUrl` must be called every 10
 * minutes to refresh the authentication token. For information about granting programmatic
 * access, see Grant
 * programmatic access.
 */
export const createPresignedNotebookUrl: API.OperationMethod<
  CreatePresignedNotebookUrlRequest,
  CreatePresignedNotebookUrlResponse,
  CreatePresignedNotebookUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePresignedNotebookUrlRequest,
  output: CreatePresignedNotebookUrlResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePresignedNotebookUrl",
}));

export type CreateWorkGroupError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Creates a workgroup with the specified name. A workgroup can be an Apache Spark
 * enabled workgroup or an Athena SQL workgroup.
 */
export const createWorkGroup: API.OperationMethod<
  CreateWorkGroupInput,
  CreateWorkGroupOutput,
  CreateWorkGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWorkGroupInput,
  output: CreateWorkGroupOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWorkGroup",
}));

export type DeleteCapacityReservationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Deletes a cancelled capacity reservation. A reservation must be cancelled before it
 * can be deleted. A deleted reservation is immediately removed from your account and can
 * no longer be referenced, including by its ARN. A deleted reservation cannot be called by
 * `GetCapacityReservation`, and deleted reservations do not appear in the
 * output of `ListCapacityReservations`.
 */
export const deleteCapacityReservation: API.OperationMethod<
  DeleteCapacityReservationInput,
  DeleteCapacityReservationOutput,
  DeleteCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCapacityReservationInput,
  output: DeleteCapacityReservationOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCapacityReservation",
}));

export type DeleteDataCatalogError =
  | InternalServerException
  | InvalidRequestException
  | DataCatalogNotFound
  | CommonErrors;
/**
 * Deletes a data catalog.
 */
export const deleteDataCatalog: API.OperationMethod<
  DeleteDataCatalogInput,
  DeleteDataCatalogOutput,
  DeleteDataCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDataCatalogInput,
  output: DeleteDataCatalogOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    DataCatalogNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataCatalog",
}));

export type DeleteNamedQueryError =
  | InternalServerException
  | InvalidRequestException
  | NamedQueryNotFound
  | CommonErrors;
/**
 * Deletes the named query if you have access to the workgroup in which the query was
 * saved.
 */
export const deleteNamedQuery: API.OperationMethod<
  DeleteNamedQueryInput,
  DeleteNamedQueryOutput,
  DeleteNamedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNamedQueryInput,
  output: DeleteNamedQueryOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    NamedQueryNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNamedQuery",
}));

export type DeleteNotebookError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified notebook.
 */
export const deleteNotebook: API.OperationMethod<
  DeleteNotebookInput,
  DeleteNotebookOutput,
  DeleteNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNotebookInput,
  output: DeleteNotebookOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotebook",
}));

export type DeletePreparedStatementError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | WorkGroupNotFound
  | CommonErrors;
/**
 * Deletes the prepared statement with the specified name from the specified
 * workgroup.
 */
export const deletePreparedStatement: API.OperationMethod<
  DeletePreparedStatementInput,
  DeletePreparedStatementOutput,
  DeletePreparedStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePreparedStatementInput,
  output: DeletePreparedStatementOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    WorkGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePreparedStatement",
}));

export type DeleteWorkGroupError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Deletes the workgroup with the specified name. The primary workgroup cannot be
 * deleted.
 */
export const deleteWorkGroup: API.OperationMethod<
  DeleteWorkGroupInput,
  DeleteWorkGroupOutput,
  DeleteWorkGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWorkGroupInput,
  output: DeleteWorkGroupOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWorkGroup",
}));

export type ExportNotebookError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Exports the specified notebook and its metadata.
 */
export const exportNotebook: API.OperationMethod<
  ExportNotebookInput,
  ExportNotebookOutput,
  ExportNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExportNotebookInput,
  output: ExportNotebookOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportNotebook",
}));

export type GetCalculationExecutionError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a previously submitted calculation execution.
 */
export const getCalculationExecution: API.OperationMethod<
  GetCalculationExecutionRequest,
  GetCalculationExecutionResponse,
  GetCalculationExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCalculationExecutionRequest,
  output: GetCalculationExecutionResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalculationExecution",
}));

export type GetCalculationExecutionCodeError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the unencrypted code that was executed for the calculation.
 */
export const getCalculationExecutionCode: API.OperationMethod<
  GetCalculationExecutionCodeRequest,
  GetCalculationExecutionCodeResponse,
  GetCalculationExecutionCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCalculationExecutionCodeRequest,
  output: GetCalculationExecutionCodeResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalculationExecutionCode",
}));

export type GetCalculationExecutionStatusError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the status of a current calculation.
 */
export const getCalculationExecutionStatus: API.OperationMethod<
  GetCalculationExecutionStatusRequest,
  GetCalculationExecutionStatusResponse,
  GetCalculationExecutionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCalculationExecutionStatusRequest,
  output: GetCalculationExecutionStatusResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCalculationExecutionStatus",
}));

export type GetCapacityAssignmentConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Gets the capacity assignment configuration for a capacity reservation, if one
 * exists.
 */
export const getCapacityAssignmentConfiguration: API.OperationMethod<
  GetCapacityAssignmentConfigurationInput,
  GetCapacityAssignmentConfigurationOutput,
  GetCapacityAssignmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCapacityAssignmentConfigurationInput,
  output: GetCapacityAssignmentConfigurationOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapacityAssignmentConfiguration",
}));

export type GetCapacityReservationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns information about the capacity reservation with the specified name.
 */
export const getCapacityReservation: API.OperationMethod<
  GetCapacityReservationInput,
  GetCapacityReservationOutput,
  GetCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCapacityReservationInput,
  output: GetCapacityReservationOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCapacityReservation",
}));

export type GetDatabaseError =
  | InternalServerException
  | InvalidRequestException
  | MetadataException
  | CommonErrors;
/**
 * Returns a database object for the specified database and data catalog.
 */
export const getDatabase: API.OperationMethod<
  GetDatabaseInput,
  GetDatabaseOutput,
  GetDatabaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDatabaseInput,
  output: GetDatabaseOutput,
  errors: [InternalServerException, InvalidRequestException, MetadataException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDatabase",
}));

export type GetDataCatalogError =
  | InternalServerException
  | InvalidRequestException
  | DataCatalogNotFound
  | CommonErrors;
/**
 * Returns the specified data catalog.
 */
export const getDataCatalog: API.OperationMethod<
  GetDataCatalogInput,
  GetDataCatalogOutput,
  GetDataCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataCatalogInput,
  output: GetDataCatalogOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    DataCatalogNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataCatalog",
}));

export type GetNamedQueryError =
  | InternalServerException
  | InvalidRequestException
  | NamedQueryNotFound
  | CommonErrors;
/**
 * Returns information about a single query. Requires that you have access to the
 * workgroup in which the query was saved.
 */
export const getNamedQuery: API.OperationMethod<
  GetNamedQueryInput,
  GetNamedQueryOutput,
  GetNamedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNamedQueryInput,
  output: GetNamedQueryOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    NamedQueryNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNamedQuery",
}));

export type GetNotebookMetadataError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves notebook metadata for the specified notebook ID.
 */
export const getNotebookMetadata: API.OperationMethod<
  GetNotebookMetadataInput,
  GetNotebookMetadataOutput,
  GetNotebookMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetNotebookMetadataInput,
  output: GetNotebookMetadataOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotebookMetadata",
}));

export type GetPreparedStatementError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | WorkGroupNotFound
  | CommonErrors;
/**
 * Retrieves the prepared statement with the specified name from the specified
 * workgroup.
 */
export const getPreparedStatement: API.OperationMethod<
  GetPreparedStatementInput,
  GetPreparedStatementOutput,
  GetPreparedStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPreparedStatementInput,
  output: GetPreparedStatementOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    WorkGroupNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPreparedStatement",
}));

export type GetQueryExecutionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns information about a single execution of a query if you have access to the
 * workgroup in which the query ran. Each time a query executes, information about the
 * query execution is saved with a unique ID.
 */
export const getQueryExecution: API.OperationMethod<
  GetQueryExecutionInput,
  GetQueryExecutionOutput,
  GetQueryExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQueryExecutionInput,
  output: GetQueryExecutionOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryExecution",
}));

export type GetQueryResultsError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Streams the results of a single query execution specified by
 * `QueryExecutionId` from the Athena query results location in
 * Amazon S3. For more information, see Working with query results, recent queries, and
 * output files in the *Amazon Athena User Guide*.
 * This request does not execute the query but returns results. Use StartQueryExecution to run a query.
 *
 * To stream query results successfully, the IAM principal with permission to call
 * `GetQueryResults` also must have permissions to the Amazon S3
 * `GetObject` action for the Athena query results location.
 *
 * IAM principals with permission to the Amazon S3
 * `GetObject` action for the query results location are able to retrieve
 * query results from Amazon S3 even if permission to the
 * `GetQueryResults` action is denied. To restrict user or role access,
 * ensure that Amazon S3 permissions to the Athena query location
 * are denied.
 */
export const getQueryResults: API.PaginatedOperationMethod<
  GetQueryResultsInput,
  GetQueryResultsOutput,
  GetQueryResultsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetQueryResultsInput,
  output: GetQueryResultsOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetQueryRuntimeStatisticsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns query execution runtime statistics related to a single execution of a query if
 * you have access to the workgroup in which the query ran. Statistics from the
 * `Timeline` section of the response object are available as soon as QueryExecutionStatus$State is in a SUCCEEDED or FAILED state. The
 * remaining non-timeline statistics in the response (like stage-level input and output row
 * count and data size) are updated asynchronously and may not be available immediately
 * after a query completes or, in some cases, may not be returned. The non-timeline
 * statistics are also not included when a query has row-level filters defined in Lake Formation.
 */
export const getQueryRuntimeStatistics: API.OperationMethod<
  GetQueryRuntimeStatisticsInput,
  GetQueryRuntimeStatisticsOutput,
  GetQueryRuntimeStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQueryRuntimeStatisticsInput,
  output: GetQueryRuntimeStatisticsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueryRuntimeStatistics",
}));

export type GetResourceDashboardError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the Live UI/Persistence UI for a session.
 */
export const getResourceDashboard: API.OperationMethod<
  GetResourceDashboardRequest,
  GetResourceDashboardResponse,
  GetResourceDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceDashboardRequest,
  output: GetResourceDashboardResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceDashboard",
}));

export type GetSessionError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the full details of a previously created session, including the session status
 * and configuration.
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
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

export type GetSessionEndpointError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a connection endpoint and authentication token for a given session Id.
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
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionEndpoint",
}));

export type GetSessionStatusError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the current status of a session.
 */
export const getSessionStatus: API.OperationMethod<
  GetSessionStatusRequest,
  GetSessionStatusResponse,
  GetSessionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSessionStatusRequest,
  output: GetSessionStatusResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSessionStatus",
}));

export type GetTableMetadataError =
  | InternalServerException
  | InvalidRequestException
  | MetadataException
  | CommonErrors;
/**
 * Returns table metadata for the specified catalog, database, and table.
 */
export const getTableMetadata: API.OperationMethod<
  GetTableMetadataInput,
  GetTableMetadataOutput,
  GetTableMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTableMetadataInput,
  output: GetTableMetadataOutput,
  errors: [InternalServerException, InvalidRequestException, MetadataException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTableMetadata",
}));

export type GetWorkGroupError =
  | InternalServerException
  | InvalidRequestException
  | WorkGroupNotFound
  | CommonErrors;
/**
 * Returns information about the workgroup with the specified name.
 */
export const getWorkGroup: API.OperationMethod<
  GetWorkGroupInput,
  GetWorkGroupOutput,
  GetWorkGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetWorkGroupInput,
  output: GetWorkGroupOutput,
  errors: [InternalServerException, InvalidRequestException, WorkGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkGroup",
}));

export type ImportNotebookError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Imports a single `ipynb` file to a Spark enabled workgroup. To import the
 * notebook, the request must specify a value for either `Payload` or
 * `NoteBookS3LocationUri`. If neither is specified or both are specified,
 * an `InvalidRequestException` occurs. The maximum file size that can be
 * imported is 10 megabytes. If an `ipynb` file with the same name already
 * exists in the workgroup, throws an error.
 */
export const importNotebook: API.OperationMethod<
  ImportNotebookInput,
  ImportNotebookOutput,
  ImportNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportNotebookInput,
  output: ImportNotebookOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportNotebook",
}));

export type ListApplicationDPUSizesError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the supported DPU sizes for the supported application runtimes (for example,
 * `Athena notebook version 1`).
 */
export const listApplicationDPUSizes: API.PaginatedOperationMethod<
  ListApplicationDPUSizesInput,
  ListApplicationDPUSizesOutput,
  ListApplicationDPUSizesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListApplicationDPUSizesInput,
  output: ListApplicationDPUSizesOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApplicationDPUSizes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCalculationExecutionsError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the calculations that have been submitted to a session in descending order.
 * Newer calculations are listed first; older calculations are listed later.
 */
export const listCalculationExecutions: API.PaginatedOperationMethod<
  ListCalculationExecutionsRequest,
  ListCalculationExecutionsResponse,
  ListCalculationExecutionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCalculationExecutionsRequest,
  output: ListCalculationExecutionsResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCalculationExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCapacityReservationsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists the capacity reservations for the current account.
 */
export const listCapacityReservations: API.PaginatedOperationMethod<
  ListCapacityReservationsInput,
  ListCapacityReservationsOutput,
  ListCapacityReservationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCapacityReservationsInput,
  output: ListCapacityReservationsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCapacityReservations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatabasesError =
  | InternalServerException
  | InvalidRequestException
  | MetadataException
  | CommonErrors;
/**
 * Lists the databases in the specified data catalog.
 */
export const listDatabases: API.PaginatedOperationMethod<
  ListDatabasesInput,
  ListDatabasesOutput,
  ListDatabasesError,
  Credentials | HttpClient.HttpClient,
  Database
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatabasesInput,
  output: ListDatabasesOutput,
  errors: [InternalServerException, InvalidRequestException, MetadataException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatabases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatabaseList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDataCatalogsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists the data catalogs in the current Amazon Web Services account.
 *
 * In the Athena console, data catalogs are listed as "data sources" on
 * the **Data sources** page under the **Data source name** column.
 */
export const listDataCatalogs: API.PaginatedOperationMethod<
  ListDataCatalogsInput,
  ListDataCatalogsOutput,
  ListDataCatalogsError,
  Credentials | HttpClient.HttpClient,
  DataCatalogSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDataCatalogsInput,
  output: ListDataCatalogsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataCatalogs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DataCatalogsSummary",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEngineVersionsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns a list of engine versions that are available to choose from, including the
 * Auto option.
 */
export const listEngineVersions: API.PaginatedOperationMethod<
  ListEngineVersionsInput,
  ListEngineVersionsOutput,
  ListEngineVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEngineVersionsInput,
  output: ListEngineVersionsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEngineVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExecutorsError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists, in descending order, the executors that joined a session. Newer executors are
 * listed first; older executors are listed later. The result can be optionally filtered by
 * state.
 */
export const listExecutors: API.PaginatedOperationMethod<
  ListExecutorsRequest,
  ListExecutorsResponse,
  ListExecutorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExecutorsRequest,
  output: ListExecutorsResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExecutors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNamedQueriesError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides a list of available query IDs only for queries saved in the specified
 * workgroup. Requires that you have access to the specified workgroup. If a workgroup is
 * not specified, lists the saved queries for the primary workgroup.
 */
export const listNamedQueries: API.PaginatedOperationMethod<
  ListNamedQueriesInput,
  ListNamedQueriesOutput,
  ListNamedQueriesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNamedQueriesInput,
  output: ListNamedQueriesOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNamedQueries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNotebookMetadataError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Displays the notebook files for the specified workgroup in paginated format.
 */
export const listNotebookMetadata: API.OperationMethod<
  ListNotebookMetadataInput,
  ListNotebookMetadataOutput,
  ListNotebookMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListNotebookMetadataInput,
  output: ListNotebookMetadataOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookMetadata",
}));

export type ListNotebookSessionsError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists, in descending order, the sessions that have been created in a notebook that are
 * in an active state like `CREATING`, `CREATED`, `IDLE`
 * or `BUSY`. Newer sessions are listed first; older sessions are listed
 * later.
 */
export const listNotebookSessions: API.OperationMethod<
  ListNotebookSessionsRequest,
  ListNotebookSessionsResponse,
  ListNotebookSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListNotebookSessionsRequest,
  output: ListNotebookSessionsResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotebookSessions",
}));

export type ListPreparedStatementsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists the prepared statements in the specified workgroup.
 */
export const listPreparedStatements: API.PaginatedOperationMethod<
  ListPreparedStatementsInput,
  ListPreparedStatementsOutput,
  ListPreparedStatementsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPreparedStatementsInput,
  output: ListPreparedStatementsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPreparedStatements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQueryExecutionsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Provides a list of available query execution IDs for the queries in the specified
 * workgroup. Athena keeps a query history for 45 days. If a workgroup is not
 * specified, returns a list of query execution IDs for the primary workgroup. Requires you
 * to have access to the workgroup in which the queries ran.
 */
export const listQueryExecutions: API.PaginatedOperationMethod<
  ListQueryExecutionsInput,
  ListQueryExecutionsOutput,
  ListQueryExecutionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQueryExecutionsInput,
  output: ListQueryExecutionsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueryExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the sessions in a workgroup that are in an active state like
 * `CREATING`, `CREATED`, `IDLE`, or
 * `BUSY`. Newer sessions are listed first; older sessions are listed
 * later.
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
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
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

export type ListTableMetadataError =
  | InternalServerException
  | InvalidRequestException
  | MetadataException
  | CommonErrors;
/**
 * Lists the metadata for the tables in the specified data catalog database.
 */
export const listTableMetadata: API.PaginatedOperationMethod<
  ListTableMetadataInput,
  ListTableMetadataOutput,
  ListTableMetadataError,
  Credentials | HttpClient.HttpClient,
  TableMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTableMetadataInput,
  output: ListTableMetadataOutput,
  errors: [InternalServerException, InvalidRequestException, MetadataException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTableMetadata",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TableMetadataList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the tags associated with an Athena resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkGroupsError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists available workgroups for the account.
 */
export const listWorkGroups: API.PaginatedOperationMethod<
  ListWorkGroupsInput,
  ListWorkGroupsOutput,
  ListWorkGroupsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWorkGroupsInput,
  output: ListWorkGroupsOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutCapacityAssignmentConfigurationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Puts a new capacity assignment configuration for a specified capacity reservation. If
 * a capacity assignment configuration already exists for the capacity reservation,
 * replaces the existing capacity assignment configuration.
 */
export const putCapacityAssignmentConfiguration: API.OperationMethod<
  PutCapacityAssignmentConfigurationInput,
  PutCapacityAssignmentConfigurationOutput,
  PutCapacityAssignmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutCapacityAssignmentConfigurationInput,
  output: PutCapacityAssignmentConfigurationOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCapacityAssignmentConfiguration",
}));

export type StartCalculationExecutionError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Submits calculations for execution within a session. You can supply the code to run as
 * an inline code block within the request.
 *
 * The request syntax requires the StartCalculationExecutionRequest$CodeBlock parameter or the CalculationConfiguration$CodeBlock parameter, but not both. Because
 * CalculationConfiguration$CodeBlock is deprecated, use the
 * StartCalculationExecutionRequest$CodeBlock parameter
 * instead.
 */
export const startCalculationExecution: API.OperationMethod<
  StartCalculationExecutionRequest,
  StartCalculationExecutionResponse,
  StartCalculationExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCalculationExecutionRequest,
  output: StartCalculationExecutionResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCalculationExecution",
}));

export type StartQueryExecutionError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Runs the SQL query statements contained in the `Query`. Requires you to
 * have access to the workgroup in which the query ran. Running queries against an external
 * catalog requires GetDataCatalog permission to the catalog. For code
 * samples using the Amazon Web Services SDK for Java, see Examples and
 * Code Samples in the Amazon Athena User
 * Guide.
 */
export const startQueryExecution: API.OperationMethod<
  StartQueryExecutionInput,
  StartQueryExecutionOutput,
  StartQueryExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartQueryExecutionInput,
  output: StartQueryExecutionOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartQueryExecution",
}));

export type StartSessionError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | SessionAlreadyExistsException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a session for running calculations within a workgroup. The session is ready
 * when it reaches an `IDLE` state.
 */
export const startSession: API.OperationMethod<
  StartSessionRequest,
  StartSessionResponse,
  StartSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSessionRequest,
  output: StartSessionResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    SessionAlreadyExistsException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSession",
}));

export type StopCalculationExecutionError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Requests the cancellation of a calculation. A `StopCalculationExecution`
 * call on a calculation that is already in a terminal state (for example,
 * `STOPPED`, `FAILED`, or `COMPLETED`) succeeds but
 * has no effect.
 *
 * Cancelling a calculation is done on a best effort basis. If a calculation cannot
 * be cancelled, you can be charged for its completion. If you are concerned about
 * being charged for a calculation that cannot be cancelled, consider terminating the
 * session in which the calculation is running.
 */
export const stopCalculationExecution: API.OperationMethod<
  StopCalculationExecutionRequest,
  StopCalculationExecutionResponse,
  StopCalculationExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopCalculationExecutionRequest,
  output: StopCalculationExecutionResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCalculationExecution",
}));

export type StopQueryExecutionError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Stops a query execution. Requires you to have access to the workgroup in which the
 * query ran.
 */
export const stopQueryExecution: API.OperationMethod<
  StopQueryExecutionInput,
  StopQueryExecutionOutput,
  StopQueryExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopQueryExecutionInput,
  output: StopQueryExecutionOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopQueryExecution",
}));

export type TagResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more tags to an Athena resource. A tag is a label that you
 * assign to a resource. Each tag consists of a key and an optional value, both of which
 * you define. For example, you can use tags to categorize Athena workgroups,
 * data catalogs, or capacity reservations by purpose, owner, or environment. Use a
 * consistent set of tag keys to make it easier to search and filter the resources in your
 * account. For best practices, see Tagging
 * Best Practices. Tag keys can be from 1 to 128 UTF-8 Unicode characters, and
 * tag values can be from 0 to 256 UTF-8 Unicode characters. Tags can use letters and
 * numbers representable in UTF-8, and the following characters: + - = . _ : / @. Tag keys
 * and values are case-sensitive. Tag keys must be unique per resource. If you specify more
 * than one tag, separate them by commas.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TerminateSessionError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Terminates an active session. A `TerminateSession` call on a session that
 * is already inactive (for example, in a `FAILED`, `TERMINATED` or
 * `TERMINATING` state) succeeds but has no effect. Calculations running in
 * the session when `TerminateSession` is called are forcefully stopped, but may
 * display as `FAILED` instead of `STOPPED`.
 */
export const terminateSession: API.OperationMethod<
  TerminateSessionRequest,
  TerminateSessionResponse,
  TerminateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TerminateSessionRequest,
  output: TerminateSessionResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TerminateSession",
}));

export type UntagResourceError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from an Athena resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCapacityReservationError =
  | InternalServerException
  | InvalidRequestException
  | CommonErrors;
/**
 * Updates the number of requested data processing units for the capacity reservation
 * with the specified name.
 */
export const updateCapacityReservation: API.OperationMethod<
  UpdateCapacityReservationInput,
  UpdateCapacityReservationOutput,
  UpdateCapacityReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCapacityReservationInput,
  output: UpdateCapacityReservationOutput,
  errors: [InternalServerException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCapacityReservation",
}));

export type UpdateDataCatalogError =
  | InternalServerException
  | InvalidRequestException
  | DataCatalogNotFound
  | CommonErrors;
/**
 * Updates the data catalog that has the specified name.
 */
export const updateDataCatalog: API.OperationMethod<
  UpdateDataCatalogInput,
  UpdateDataCatalogOutput,
  UpdateDataCatalogError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataCatalogInput,
  output: UpdateDataCatalogOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    DataCatalogNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataCatalog",
}));

export type UpdateNamedQueryError =
  | InternalServerException
  | InvalidRequestException
  | NamedQueryNotFound
  | CommonErrors;
/**
 * Updates a NamedQuery object. The database or workgroup cannot be
 * updated.
 */
export const updateNamedQuery: API.OperationMethod<
  UpdateNamedQueryInput,
  UpdateNamedQueryOutput,
  UpdateNamedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNamedQueryInput,
  output: UpdateNamedQueryOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    NamedQueryNotFound,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNamedQuery",
}));

export type UpdateNotebookError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the contents of a Spark notebook.
 */
export const updateNotebook: API.OperationMethod<
  UpdateNotebookInput,
  UpdateNotebookOutput,
  UpdateNotebookError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNotebookInput,
  output: UpdateNotebookOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotebook",
}));

export type UpdateNotebookMetadataError =
  | InternalServerException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the metadata for a notebook.
 */
export const updateNotebookMetadata: API.OperationMethod<
  UpdateNotebookMetadataInput,
  UpdateNotebookMetadataOutput,
  UpdateNotebookMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNotebookMetadataInput,
  output: UpdateNotebookMetadataOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotebookMetadata",
}));

export type UpdatePreparedStatementError =
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates a prepared statement.
 */
export const updatePreparedStatement: API.OperationMethod<
  UpdatePreparedStatementInput,
  UpdatePreparedStatementOutput,
  UpdatePreparedStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePreparedStatementInput,
  output: UpdatePreparedStatementOutput,
  errors: [
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePreparedStatement",
}));

export type UpdateWorkGroupError =
  | InternalServerException
  | InvalidRequestException
  | WorkGroupNotFound
  | CommonErrors;
/**
 * Updates the workgroup with the specified name. The workgroup's name cannot be changed.
 * Only `ConfigurationUpdates` can be specified.
 */
export const updateWorkGroup: API.OperationMethod<
  UpdateWorkGroupInput,
  UpdateWorkGroupOutput,
  UpdateWorkGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWorkGroupInput,
  output: UpdateWorkGroupOutput,
  errors: [InternalServerException, InvalidRequestException, WorkGroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWorkGroup",
}));
