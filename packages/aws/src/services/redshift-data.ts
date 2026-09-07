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
  sdkId: "Redshift Data",
  serviceShapeName: "RedshiftData",
});
const auth = T.AwsAuthSigv4({ name: "redshift-data" });
const ver = T.ServiceVersion("2019-12-20");
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
              `https://redshift-data-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://redshift-data-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://redshift-data.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://redshift-data.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ActiveSessionsExceededException
  extends /*@__PURE__*/ S.TaggedError<ActiveSessionsExceededException>()(
    "ActiveSessionsExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ActiveStatementsExceededException
  extends /*@__PURE__*/ S.TaggedError<ActiveStatementsExceededException>()(
    "ActiveStatementsExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class BatchExecuteStatementException
  extends /*@__PURE__*/ S.TaggedError<BatchExecuteStatementException>()(
    "BatchExecuteStatementException",
    { message: S.String.pipe(T.ErrorMessage()), StatementId: S.String },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DatabaseConnectionException
  extends /*@__PURE__*/ S.TaggedError<DatabaseConnectionException>()(
    "DatabaseConnectionException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ExecuteStatementException
  extends /*@__PURE__*/ S.TaggedError<ExecuteStatementException>()(
    "ExecuteStatementException",
    { message: S.String.pipe(T.ErrorMessage()), StatementId: S.String },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class QueryTimeoutException
  extends /*@__PURE__*/ S.TaggedError<QueryTimeoutException>()(
    "QueryTimeoutException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()), ResourceId: S.String },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type StatementString = string;
export type SqlList = string[];
export const SqlList = /*@__PURE__*/ S.Array(S.String);
export type ClusterIdentifierString = string;
export type SecretArn = string;
export type StatementNameString = string;
export type ParameterName = string;
export type ParameterValue = string;
export interface SqlParameter {
  name: string;
  value: string;
}
export const SqlParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, value: S.String }),
).annotate({ identifier: "SqlParameter" }) as any as S.Schema<SqlParameter>;
export type SqlParametersList = SqlParameter[];
export const SqlParametersList = /*@__PURE__*/ S.Array(SqlParameter);
export type WorkgroupNameString = string;
export type ClientToken = string;
export type ResultFormatString = string;
export type SessionAliveSeconds = number;
export type UUID = string;
export interface BatchExecuteStatementInput {
  Sqls: string[];
  ClusterIdentifier?: string;
  SecretArn?: string;
  DbUser?: string;
  Database?: string;
  WithEvent?: boolean;
  StatementName?: string;
  Parameters?: SqlParameter[];
  WorkgroupName?: string;
  ClientToken?: string;
  ResultFormat?: string;
  SessionKeepAliveSeconds?: number;
  SessionId?: string;
}
export const BatchExecuteStatementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sqls: SqlList,
    ClusterIdentifier: S.optional(S.String),
    SecretArn: S.optional(S.String),
    DbUser: S.optional(S.String),
    Database: S.optional(S.String),
    WithEvent: S.optional(S.Boolean),
    StatementName: S.optional(S.String),
    Parameters: S.optional(SqlParametersList),
    WorkgroupName: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ResultFormat: S.optional(S.String),
    SessionKeepAliveSeconds: S.optional(S.Number),
    SessionId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "BatchExecuteStatementInput",
}) as any as S.Schema<BatchExecuteStatementInput>;
export type DbGroupList = string[];
export const DbGroupList = /*@__PURE__*/ S.Array(S.String);
export interface BatchExecuteStatementOutput {
  Id?: string;
  CreatedAt?: Date;
  ClusterIdentifier?: string;
  DbUser?: string;
  DbGroups?: string[];
  Database?: string;
  SecretArn?: string;
  WorkgroupName?: string;
  SessionId?: string;
}
export const BatchExecuteStatementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ClusterIdentifier: S.optional(S.String),
    DbUser: S.optional(S.String),
    DbGroups: S.optional(DbGroupList),
    Database: S.optional(S.String),
    SecretArn: S.optional(S.String),
    WorkgroupName: S.optional(S.String),
    SessionId: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchExecuteStatementOutput",
}) as any as S.Schema<BatchExecuteStatementOutput>;
export interface CancelStatementRequest {
  Id: string;
}
export const CancelStatementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelStatementRequest",
}) as any as S.Schema<CancelStatementRequest>;
export interface CancelStatementResponse {
  Status?: boolean;
}
export const CancelStatementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(S.Boolean) }),
).annotate({
  identifier: "CancelStatementResponse",
}) as any as S.Schema<CancelStatementResponse>;
export interface DescribeStatementRequest {
  Id: string;
}
export const DescribeStatementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeStatementRequest",
}) as any as S.Schema<DescribeStatementRequest>;
export type StatusString = string;
export type StatementStatusString = string;
export interface SubStatementData {
  Id: string;
  Duration?: number;
  Error?: string;
  Status?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  QueryString?: string;
  ResultRows?: number;
  ResultSize?: number;
  RedshiftQueryId?: number;
  HasResultSet?: boolean;
}
export const SubStatementData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    Duration: S.optional(S.Number),
    Error: S.optional(S.String),
    Status: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    QueryString: S.optional(S.String),
    ResultRows: S.optional(S.Number),
    ResultSize: S.optional(S.Number),
    RedshiftQueryId: S.optional(S.Number),
    HasResultSet: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SubStatementData",
}) as any as S.Schema<SubStatementData>;
export type SubStatementList = SubStatementData[];
export const SubStatementList = /*@__PURE__*/ S.Array(SubStatementData);
export interface DescribeStatementResponse {
  Id: string;
  SecretArn?: string;
  DbUser?: string;
  Database?: string;
  ClusterIdentifier?: string;
  Duration?: number;
  Error?: string;
  Status?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  RedshiftPid?: number;
  HasResultSet?: boolean;
  QueryString?: string;
  ResultRows?: number;
  ResultSize?: number;
  RedshiftQueryId?: number;
  QueryParameters?: SqlParameter[];
  SubStatements?: SubStatementData[];
  WorkgroupName?: string;
  ResultFormat?: string;
  SessionId?: string;
}
export const DescribeStatementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    SecretArn: S.optional(S.String),
    DbUser: S.optional(S.String),
    Database: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    Duration: S.optional(S.Number),
    Error: S.optional(S.String),
    Status: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RedshiftPid: S.optional(S.Number),
    HasResultSet: S.optional(S.Boolean),
    QueryString: S.optional(S.String),
    ResultRows: S.optional(S.Number),
    ResultSize: S.optional(S.Number),
    RedshiftQueryId: S.optional(S.Number),
    QueryParameters: S.optional(SqlParametersList),
    SubStatements: S.optional(SubStatementList),
    WorkgroupName: S.optional(S.String),
    ResultFormat: S.optional(S.String),
    SessionId: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeStatementResponse",
}) as any as S.Schema<DescribeStatementResponse>;
export type PageSize = number;
export interface DescribeTableRequest {
  ClusterIdentifier?: string;
  SecretArn?: string;
  DbUser?: string;
  Database: string;
  ConnectedDatabase?: string;
  Schema?: string;
  Table?: string;
  NextToken?: string;
  MaxResults?: number;
  WorkgroupName?: string;
}
export const DescribeTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    SecretArn: S.optional(S.String),
    DbUser: S.optional(S.String),
    Database: S.String,
    ConnectedDatabase: S.optional(S.String),
    Schema: S.optional(S.String),
    Table: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    WorkgroupName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeTableRequest",
}) as any as S.Schema<DescribeTableRequest>;
export interface ColumnMetadata {
  isCaseSensitive?: boolean;
  isCurrency?: boolean;
  isSigned?: boolean;
  label?: string;
  name?: string;
  nullable?: number;
  precision?: number;
  scale?: number;
  schemaName?: string;
  tableName?: string;
  typeName?: string;
  length?: number;
  columnDefault?: string;
}
export const ColumnMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    isCaseSensitive: S.optional(S.Boolean),
    isCurrency: S.optional(S.Boolean),
    isSigned: S.optional(S.Boolean),
    label: S.optional(S.String),
    name: S.optional(S.String),
    nullable: S.optional(S.Number),
    precision: S.optional(S.Number),
    scale: S.optional(S.Number),
    schemaName: S.optional(S.String),
    tableName: S.optional(S.String),
    typeName: S.optional(S.String),
    length: S.optional(S.Number),
    columnDefault: S.optional(S.String),
  }),
).annotate({ identifier: "ColumnMetadata" }) as any as S.Schema<ColumnMetadata>;
export type ColumnList = ColumnMetadata[];
export const ColumnList = /*@__PURE__*/ S.Array(ColumnMetadata);
export interface DescribeTableResponse {
  TableName?: string;
  ColumnList?: ColumnMetadata[];
  NextToken?: string;
}
export const DescribeTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String),
    ColumnList: S.optional(ColumnList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeTableResponse",
}) as any as S.Schema<DescribeTableResponse>;
export interface ExecuteStatementInput {
  Sql: string;
  ClusterIdentifier?: string;
  SecretArn?: string;
  DbUser?: string;
  Database?: string;
  WithEvent?: boolean;
  StatementName?: string;
  Parameters?: SqlParameter[];
  WorkgroupName?: string;
  ClientToken?: string;
  ResultFormat?: string;
  SessionKeepAliveSeconds?: number;
  SessionId?: string;
}
export const ExecuteStatementInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sql: S.String,
    ClusterIdentifier: S.optional(S.String),
    SecretArn: S.optional(S.String),
    DbUser: S.optional(S.String),
    Database: S.optional(S.String),
    WithEvent: S.optional(S.Boolean),
    StatementName: S.optional(S.String),
    Parameters: S.optional(SqlParametersList),
    WorkgroupName: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ResultFormat: S.optional(S.String),
    SessionKeepAliveSeconds: S.optional(S.Number),
    SessionId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ExecuteStatementInput",
}) as any as S.Schema<ExecuteStatementInput>;
export interface ExecuteStatementOutput {
  Id?: string;
  CreatedAt?: Date;
  ClusterIdentifier?: string;
  DbUser?: string;
  DbGroups?: string[];
  Database?: string;
  SecretArn?: string;
  WorkgroupName?: string;
  SessionId?: string;
}
export const ExecuteStatementOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ClusterIdentifier: S.optional(S.String),
    DbUser: S.optional(S.String),
    DbGroups: S.optional(DbGroupList),
    Database: S.optional(S.String),
    SecretArn: S.optional(S.String),
    WorkgroupName: S.optional(S.String),
    SessionId: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecuteStatementOutput",
}) as any as S.Schema<ExecuteStatementOutput>;
export interface GetStatementResultRequest {
  Id: string;
  NextToken?: string;
}
export const GetStatementResultRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, NextToken: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetStatementResultRequest",
}) as any as S.Schema<GetStatementResultRequest>;
export type BoxedBoolean = boolean;
export type BoxedLong = number;
export type BoxedDouble = number;
export type Field =
  | {
      isNull: boolean;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
    }
  | {
      isNull?: never;
      booleanValue: boolean;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue: number;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue: number;
      stringValue?: never;
      blobValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue: string;
      blobValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue: Uint8Array;
    };
export const Field = /*@__PURE__*/ S.Union([
  S.Struct({ isNull: S.Boolean }),
  S.Struct({ booleanValue: S.Boolean }),
  S.Struct({ longValue: S.Number }),
  S.Struct({ doubleValue: S.Number }),
  S.Struct({ stringValue: S.String }),
  S.Struct({ blobValue: T.Blob }),
]);
export type FieldList = Field[];
export const FieldList = /*@__PURE__*/ S.Array(Field);
export type SqlRecords = Field[][];
export const SqlRecords = /*@__PURE__*/ S.Array(FieldList);
export type ColumnMetadataList = ColumnMetadata[];
export const ColumnMetadataList = /*@__PURE__*/ S.Array(ColumnMetadata);
export interface GetStatementResultResponse {
  Records: Field[][];
  ColumnMetadata?: ColumnMetadata[];
  TotalNumRows?: number;
  NextToken?: string;
}
export const GetStatementResultResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Records: SqlRecords,
    ColumnMetadata: S.optional(ColumnMetadataList),
    TotalNumRows: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetStatementResultResponse",
}) as any as S.Schema<GetStatementResultResponse>;
export interface GetStatementResultV2Request {
  Id: string;
  NextToken?: string;
}
export const GetStatementResultV2Request = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String, NextToken: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetStatementResultV2Request",
}) as any as S.Schema<GetStatementResultV2Request>;
export type QueryRecords = { CSVRecords: string };
export const QueryRecords = /*@__PURE__*/ S.Union([
  S.Struct({ CSVRecords: S.String }),
]);
export type FormattedSqlRecords = QueryRecords[];
export const FormattedSqlRecords = /*@__PURE__*/ S.Array(QueryRecords);
export interface GetStatementResultV2Response {
  Records: QueryRecords[];
  ColumnMetadata?: ColumnMetadata[];
  TotalNumRows?: number;
  ResultFormat?: string;
  NextToken?: string;
}
export const GetStatementResultV2Response = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Records: FormattedSqlRecords,
    ColumnMetadata: S.optional(ColumnMetadataList),
    TotalNumRows: S.optional(S.Number),
    ResultFormat: S.optional(S.String),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetStatementResultV2Response",
}) as any as S.Schema<GetStatementResultV2Response>;
export interface ListDatabasesRequest {
  ClusterIdentifier?: string;
  Database: string;
  SecretArn?: string;
  DbUser?: string;
  NextToken?: string;
  MaxResults?: number;
  WorkgroupName?: string;
}
export const ListDatabasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    Database: S.String,
    SecretArn: S.optional(S.String),
    DbUser: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    WorkgroupName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatabasesRequest",
}) as any as S.Schema<ListDatabasesRequest>;
export type DatabaseList = string[];
export const DatabaseList = /*@__PURE__*/ S.Array(S.String);
export interface ListDatabasesResponse {
  Databases?: string[];
  NextToken?: string;
}
export const ListDatabasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Databases: S.optional(DatabaseList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatabasesResponse",
}) as any as S.Schema<ListDatabasesResponse>;
export interface ListSchemasRequest {
  ClusterIdentifier?: string;
  SecretArn?: string;
  DbUser?: string;
  Database: string;
  ConnectedDatabase?: string;
  SchemaPattern?: string;
  NextToken?: string;
  MaxResults?: number;
  WorkgroupName?: string;
}
export const ListSchemasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    SecretArn: S.optional(S.String),
    DbUser: S.optional(S.String),
    Database: S.String,
    ConnectedDatabase: S.optional(S.String),
    SchemaPattern: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    WorkgroupName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSchemasRequest",
}) as any as S.Schema<ListSchemasRequest>;
export type SchemaList = string[];
export const SchemaList = /*@__PURE__*/ S.Array(S.String);
export interface ListSchemasResponse {
  Schemas?: string[];
  NextToken?: string;
}
export const ListSchemasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Schemas: S.optional(SchemaList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSchemasResponse",
}) as any as S.Schema<ListSchemasResponse>;
export type ListStatementsLimit = number;
export interface ListStatementsRequest {
  NextToken?: string;
  MaxResults?: number;
  StatementName?: string;
  Status?: string;
  RoleLevel?: boolean;
  Database?: string;
  ClusterIdentifier?: string;
  WorkgroupName?: string;
}
export const ListStatementsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    StatementName: S.optional(S.String),
    Status: S.optional(S.String),
    RoleLevel: S.optional(S.Boolean),
    Database: S.optional(S.String),
    ClusterIdentifier: S.optional(S.String),
    WorkgroupName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListStatementsRequest",
}) as any as S.Schema<ListStatementsRequest>;
export type StatementStringList = string[];
export const StatementStringList = /*@__PURE__*/ S.Array(S.String);
export interface StatementData {
  Id: string;
  QueryString?: string;
  QueryStrings?: string[];
  SecretArn?: string;
  Status?: string;
  StatementName?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  QueryParameters?: SqlParameter[];
  IsBatchStatement?: boolean;
  ResultFormat?: string;
  SessionId?: string;
}
export const StatementData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
    QueryString: S.optional(S.String),
    QueryStrings: S.optional(StatementStringList),
    SecretArn: S.optional(S.String),
    Status: S.optional(S.String),
    StatementName: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    QueryParameters: S.optional(SqlParametersList),
    IsBatchStatement: S.optional(S.Boolean),
    ResultFormat: S.optional(S.String),
    SessionId: S.optional(S.String),
  }),
).annotate({ identifier: "StatementData" }) as any as S.Schema<StatementData>;
export type StatementList = StatementData[];
export const StatementList = /*@__PURE__*/ S.Array(StatementData);
export interface ListStatementsResponse {
  Statements: StatementData[];
  NextToken?: string;
}
export const ListStatementsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Statements: StatementList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListStatementsResponse",
}) as any as S.Schema<ListStatementsResponse>;
export interface ListTablesRequest {
  ClusterIdentifier?: string;
  SecretArn?: string;
  DbUser?: string;
  Database: string;
  ConnectedDatabase?: string;
  SchemaPattern?: string;
  TablePattern?: string;
  NextToken?: string;
  MaxResults?: number;
  WorkgroupName?: string;
}
export const ListTablesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterIdentifier: S.optional(S.String),
    SecretArn: S.optional(S.String),
    DbUser: S.optional(S.String),
    Database: S.String,
    ConnectedDatabase: S.optional(S.String),
    SchemaPattern: S.optional(S.String),
    TablePattern: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    WorkgroupName: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTablesRequest",
}) as any as S.Schema<ListTablesRequest>;
export interface TableMember {
  name?: string;
  type?: string;
  schema?: string;
}
export const TableMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    type: S.optional(S.String),
    schema: S.optional(S.String),
  }),
).annotate({ identifier: "TableMember" }) as any as S.Schema<TableMember>;
export type TableList = TableMember[];
export const TableList = /*@__PURE__*/ S.Array(TableMember);
export interface ListTablesResponse {
  Tables?: TableMember[];
  NextToken?: string;
}
export const ListTablesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tables: S.optional(TableList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTablesResponse",
}) as any as S.Schema<ListTablesResponse>;
export type BatchExecuteStatementError =
  | ActiveSessionsExceededException
  | ActiveStatementsExceededException
  | BatchExecuteStatementException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Runs one or more SQL statements, which can be data manipulation language (DML) or data definition language (DDL). Depending on the authorization method, use one of the following combinations of request parameters:
 *
 * - Secrets Manager - when connecting to a cluster, provide the `secret-arn` of a secret stored in Secrets Manager which has `username` and `password`. The specified secret contains credentials to connect to the `database` you specify. When you are connecting to a cluster, you also supply the database name, If you provide a cluster identifier (`dbClusterIdentifier`), it must match the cluster identifier stored in the secret. When you are connecting to a serverless workgroup, you also supply the database name.
 *
 * - Temporary credentials - when connecting to your data warehouse, choose one of the following options:
 *
 * - When connecting to a serverless workgroup, specify the workgroup name and database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift-serverless:GetCredentials` operation is required.
 *
 * - When connecting to a cluster as an IAM identity, specify the cluster identifier and the database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift:GetClusterCredentialsWithIAM` operation is required.
 *
 * - When connecting to a cluster as a database user, specify the cluster identifier, the database name, and the database user name. Also, permission to call the `redshift:GetClusterCredentials` operation is required.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const batchExecuteStatement: API.OperationMethod<
  BatchExecuteStatementInput,
  BatchExecuteStatementOutput,
  BatchExecuteStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchExecuteStatementInput,
  output: BatchExecuteStatementOutput,
  errors: [
    ActiveSessionsExceededException,
    ActiveStatementsExceededException,
    BatchExecuteStatementException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchExecuteStatement",
}));

export type CancelStatementError =
  | DatabaseConnectionException
  | InternalServerException
  | QueryTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a running query. To be canceled, a query must be running.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
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
    DatabaseConnectionException,
    InternalServerException,
    QueryTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelStatement",
}));

export type DescribeStatementError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the details about a specific instance when a query was run by the Amazon Redshift Data API. The information includes when the query started, when it finished, the query status, the number of rows returned, and the SQL statement.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const describeStatement: API.OperationMethod<
  DescribeStatementRequest,
  DescribeStatementResponse,
  DescribeStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStatementRequest,
  output: DescribeStatementResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStatement",
}));

export type DescribeTableError =
  | DatabaseConnectionException
  | InternalServerException
  | QueryTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the detailed information about a table from metadata in the cluster. The information includes its columns. A token is returned to page through the column list. Depending on the authorization method, use one of the following combinations of request parameters:
 *
 * - Secrets Manager - when connecting to a cluster, provide the `secret-arn` of a secret stored in Secrets Manager which has `username` and `password`. The specified secret contains credentials to connect to the `database` you specify. When you are connecting to a cluster, you also supply the database name, If you provide a cluster identifier (`dbClusterIdentifier`), it must match the cluster identifier stored in the secret. When you are connecting to a serverless workgroup, you also supply the database name.
 *
 * - Temporary credentials - when connecting to your data warehouse, choose one of the following options:
 *
 * - When connecting to a serverless workgroup, specify the workgroup name and database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift-serverless:GetCredentials` operation is required.
 *
 * - When connecting to a cluster as an IAM identity, specify the cluster identifier and the database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift:GetClusterCredentialsWithIAM` operation is required.
 *
 * - When connecting to a cluster as a database user, specify the cluster identifier, the database name, and the database user name. Also, permission to call the `redshift:GetClusterCredentials` operation is required.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const describeTable: API.PaginatedOperationMethod<
  DescribeTableRequest,
  DescribeTableResponse,
  DescribeTableError,
  Credentials | HttpClient.HttpClient,
  ColumnMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeTableRequest,
  output: DescribeTableResponse,
  errors: [
    DatabaseConnectionException,
    InternalServerException,
    QueryTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTable",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ColumnList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ExecuteStatementError =
  | ActiveSessionsExceededException
  | ActiveStatementsExceededException
  | ExecuteStatementException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Runs an SQL statement, which can be data manipulation language (DML) or data definition language (DDL). This statement must be a single SQL statement. Depending on the authorization method, use one of the following combinations of request parameters:
 *
 * - Secrets Manager - when connecting to a cluster, provide the `secret-arn` of a secret stored in Secrets Manager which has `username` and `password`. The specified secret contains credentials to connect to the `database` you specify. When you are connecting to a cluster, you also supply the database name, If you provide a cluster identifier (`dbClusterIdentifier`), it must match the cluster identifier stored in the secret. When you are connecting to a serverless workgroup, you also supply the database name.
 *
 * - Temporary credentials - when connecting to your data warehouse, choose one of the following options:
 *
 * - When connecting to a serverless workgroup, specify the workgroup name and database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift-serverless:GetCredentials` operation is required.
 *
 * - When connecting to a cluster as an IAM identity, specify the cluster identifier and the database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift:GetClusterCredentialsWithIAM` operation is required.
 *
 * - When connecting to a cluster as a database user, specify the cluster identifier, the database name, and the database user name. Also, permission to call the `redshift:GetClusterCredentials` operation is required.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const executeStatement: API.OperationMethod<
  ExecuteStatementInput,
  ExecuteStatementOutput,
  ExecuteStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteStatementInput,
  output: ExecuteStatementOutput,
  errors: [
    ActiveSessionsExceededException,
    ActiveStatementsExceededException,
    ExecuteStatementException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteStatement",
}));

export type GetStatementResultError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetches the temporarily cached result of an SQL statement in JSON format. The `ExecuteStatement` or `BatchExecuteStatement` operation that ran the SQL statement must have specified `ResultFormat` as `JSON` , or let the format default to JSON. A token is returned to page through the statement results.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const getStatementResult: API.PaginatedOperationMethod<
  GetStatementResultRequest,
  GetStatementResultResponse,
  GetStatementResultError,
  Credentials | HttpClient.HttpClient,
  Field[]
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetStatementResultRequest,
  output: GetStatementResultResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStatementResult",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Records",
  } as const,
})) as any;

export type GetStatementResultV2Error =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Fetches the temporarily cached result of an SQL statement in CSV format. The `ExecuteStatement` or `BatchExecuteStatement` operation that ran the SQL statement must have specified `ResultFormat` as `CSV`. A token is returned to page through the statement results.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const getStatementResultV2: API.PaginatedOperationMethod<
  GetStatementResultV2Request,
  GetStatementResultV2Response,
  GetStatementResultV2Error,
  Credentials | HttpClient.HttpClient,
  QueryRecords
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetStatementResultV2Request,
  output: GetStatementResultV2Response,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStatementResultV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Records",
  } as const,
})) as any;

export type ListDatabasesError =
  | DatabaseConnectionException
  | InternalServerException
  | QueryTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List the databases in a cluster. A token is returned to page through the database list. Depending on the authorization method, use one of the following combinations of request parameters:
 *
 * - Secrets Manager - when connecting to a cluster, provide the `secret-arn` of a secret stored in Secrets Manager which has `username` and `password`. The specified secret contains credentials to connect to the `database` you specify. When you are connecting to a cluster, you also supply the database name, If you provide a cluster identifier (`dbClusterIdentifier`), it must match the cluster identifier stored in the secret. When you are connecting to a serverless workgroup, you also supply the database name.
 *
 * - Temporary credentials - when connecting to your data warehouse, choose one of the following options:
 *
 * - When connecting to a serverless workgroup, specify the workgroup name and database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift-serverless:GetCredentials` operation is required.
 *
 * - When connecting to a cluster as an IAM identity, specify the cluster identifier and the database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift:GetClusterCredentialsWithIAM` operation is required.
 *
 * - When connecting to a cluster as a database user, specify the cluster identifier, the database name, and the database user name. Also, permission to call the `redshift:GetClusterCredentials` operation is required.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const listDatabases: API.PaginatedOperationMethod<
  ListDatabasesRequest,
  ListDatabasesResponse,
  ListDatabasesError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatabasesRequest,
  output: ListDatabasesResponse,
  errors: [
    DatabaseConnectionException,
    InternalServerException,
    QueryTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatabases",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Databases",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSchemasError =
  | DatabaseConnectionException
  | InternalServerException
  | QueryTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the schemas in a database. A token is returned to page through the schema list. Depending on the authorization method, use one of the following combinations of request parameters:
 *
 * - Secrets Manager - when connecting to a cluster, provide the `secret-arn` of a secret stored in Secrets Manager which has `username` and `password`. The specified secret contains credentials to connect to the `database` you specify. When you are connecting to a cluster, you also supply the database name, If you provide a cluster identifier (`dbClusterIdentifier`), it must match the cluster identifier stored in the secret. When you are connecting to a serverless workgroup, you also supply the database name.
 *
 * - Temporary credentials - when connecting to your data warehouse, choose one of the following options:
 *
 * - When connecting to a serverless workgroup, specify the workgroup name and database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift-serverless:GetCredentials` operation is required.
 *
 * - When connecting to a cluster as an IAM identity, specify the cluster identifier and the database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift:GetClusterCredentialsWithIAM` operation is required.
 *
 * - When connecting to a cluster as a database user, specify the cluster identifier, the database name, and the database user name. Also, permission to call the `redshift:GetClusterCredentials` operation is required.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const listSchemas: API.PaginatedOperationMethod<
  ListSchemasRequest,
  ListSchemasResponse,
  ListSchemasError,
  Credentials | HttpClient.HttpClient,
  string
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSchemasRequest,
  output: ListSchemasResponse,
  errors: [
    DatabaseConnectionException,
    InternalServerException,
    QueryTimeoutException,
    ResourceNotFoundException,
    ValidationException,
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

export type ListStatementsError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List of SQL statements. By default, only finished statements are shown. A token is returned to page through the statement list.
 *
 * When you use identity-enhanced role sessions to list statements, you must provide either the `cluster-identifier` or `workgroup-name` parameter. This ensures that the IdC user can only access the Amazon Redshift IdC applications they are assigned. For more information, see Trusted identity propagation overview.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const listStatements: API.PaginatedOperationMethod<
  ListStatementsRequest,
  ListStatementsResponse,
  ListStatementsError,
  Credentials | HttpClient.HttpClient,
  StatementData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStatementsRequest,
  output: ListStatementsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStatements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Statements",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTablesError =
  | DatabaseConnectionException
  | InternalServerException
  | QueryTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List the tables in a database. If neither `SchemaPattern` nor `TablePattern` are specified, then all tables in the database are returned. A token is returned to page through the table list. Depending on the authorization method, use one of the following combinations of request parameters:
 *
 * - Secrets Manager - when connecting to a cluster, provide the `secret-arn` of a secret stored in Secrets Manager which has `username` and `password`. The specified secret contains credentials to connect to the `database` you specify. When you are connecting to a cluster, you also supply the database name, If you provide a cluster identifier (`dbClusterIdentifier`), it must match the cluster identifier stored in the secret. When you are connecting to a serverless workgroup, you also supply the database name.
 *
 * - Temporary credentials - when connecting to your data warehouse, choose one of the following options:
 *
 * - When connecting to a serverless workgroup, specify the workgroup name and database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift-serverless:GetCredentials` operation is required.
 *
 * - When connecting to a cluster as an IAM identity, specify the cluster identifier and the database name. The database user name is derived from the IAM identity. For example, `arn:iam::123456789012:user:foo` has the database user name `IAM:foo`. Also, permission to call the `redshift:GetClusterCredentialsWithIAM` operation is required.
 *
 * - When connecting to a cluster as a database user, specify the cluster identifier, the database name, and the database user name. Also, permission to call the `redshift:GetClusterCredentials` operation is required.
 *
 * For more information about the Amazon Redshift Data API and CLI usage examples, see Using the Amazon Redshift Data API in the *Amazon Redshift Management Guide*.
 */
export const listTables: API.PaginatedOperationMethod<
  ListTablesRequest,
  ListTablesResponse,
  ListTablesError,
  Credentials | HttpClient.HttpClient,
  TableMember
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTablesRequest,
  output: ListTablesResponse,
  errors: [
    DatabaseConnectionException,
    InternalServerException,
    QueryTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTables",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tables",
    pageSize: "MaxResults",
  } as const,
})) as any;
