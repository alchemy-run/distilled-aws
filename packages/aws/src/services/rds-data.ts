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
  sdkId: "RDS Data",
  serviceShapeName: "RdsDataService",
});
const auth = T.AwsAuthSigv4({ name: "rds-data" });
const ver = T.ServiceVersion("2018-08-01");
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
              `https://rds-data-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://rds-data-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://rds-data.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://rds-data.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DatabaseErrorException
  extends /*@__PURE__*/ S.TaggedError<DatabaseErrorException>()(
    "DatabaseErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DatabaseNotFoundException
  extends /*@__PURE__*/ S.TaggedError<DatabaseNotFoundException>()(
    "DatabaseNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class DatabaseResumingException
  extends /*@__PURE__*/ S.TaggedError<DatabaseResumingException>()(
    "DatabaseResumingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DatabaseUnavailableException
  extends /*@__PURE__*/ S.TaggedError<DatabaseUnavailableException>()(
    "DatabaseUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(504),
  ).pipe(C.withTimeoutError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class HttpEndpointNotEnabledException
  extends /*@__PURE__*/ S.TaggedError<HttpEndpointNotEnabledException>()(
    "HttpEndpointNotEnabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidResourceStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceStateException>()(
    "InvalidResourceStateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSecretException
  extends /*@__PURE__*/ S.TaggedError<InvalidSecretException>()(
    "InvalidSecretException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class SecretsErrorException
  extends /*@__PURE__*/ S.TaggedError<SecretsErrorException>()(
    "SecretsErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableError
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableError>()(
    "ServiceUnavailableError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class StatementTimeoutException
  extends /*@__PURE__*/ S.TaggedError<StatementTimeoutException>()(
    "StatementTimeoutException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      dbConnectionId: S.optional(S.Number),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TransactionNotFoundException
  extends /*@__PURE__*/ S.TaggedError<TransactionNotFoundException>()(
    "TransactionNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedResultException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedResultException>()(
    "UnsupportedResultException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Arn = string;
export type SqlStatement = string;
export type DbName = string;
export type ParameterName = string;
export type BoxedBoolean = boolean;
export type BoxedLong = number;
export type BoxedDouble = number;
export type BooleanArray = boolean[];
export const BooleanArray = /*@__PURE__*/ S.Array(S.Boolean).pipe(T.Sparse());
export type LongArray = number[];
export const LongArray = /*@__PURE__*/ S.Array(S.Number).pipe(T.Sparse());
export type DoubleArray = number[];
export const DoubleArray = /*@__PURE__*/ S.Array(S.Number).pipe(T.Sparse());
export type StringArray = string[];
export const StringArray = /*@__PURE__*/ S.Array(S.String).pipe(T.Sparse());
export type ArrayOfArray = ArrayValue[];
export const ArrayOfArray = /*@__PURE__*/ S.Array(
  S.suspend(() => ArrayValue).annotate({ identifier: "ArrayValue" }),
).pipe(T.Sparse()) as any as S.Schema<ArrayOfArray>;
export type ArrayValue =
  | {
      booleanValues: boolean[];
      longValues?: never;
      doubleValues?: never;
      stringValues?: never;
      arrayValues?: never;
    }
  | {
      booleanValues?: never;
      longValues: number[];
      doubleValues?: never;
      stringValues?: never;
      arrayValues?: never;
    }
  | {
      booleanValues?: never;
      longValues?: never;
      doubleValues: number[];
      stringValues?: never;
      arrayValues?: never;
    }
  | {
      booleanValues?: never;
      longValues?: never;
      doubleValues?: never;
      stringValues: string[];
      arrayValues?: never;
    }
  | {
      booleanValues?: never;
      longValues?: never;
      doubleValues?: never;
      stringValues?: never;
      arrayValues: ArrayValue[];
    };
export const ArrayValue = /*@__PURE__*/ S.Union([
  S.Struct({ booleanValues: BooleanArray }),
  S.Struct({ longValues: LongArray }),
  S.Struct({ doubleValues: DoubleArray }),
  S.Struct({ stringValues: StringArray }),
  S.Struct({
    arrayValues: S.suspend(() => ArrayOfArray).annotate({
      identifier: "ArrayOfArray",
    }),
  }),
]) as any as S.Schema<ArrayValue>;
export type Field =
  | {
      isNull: boolean;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValue?: never;
    }
  | {
      isNull?: never;
      booleanValue: boolean;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue: number;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue: number;
      stringValue?: never;
      blobValue?: never;
      arrayValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue: string;
      blobValue?: never;
      arrayValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue: Uint8Array;
      arrayValue?: never;
    }
  | {
      isNull?: never;
      booleanValue?: never;
      longValue?: never;
      doubleValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValue: ArrayValue;
    };
export const Field = /*@__PURE__*/ S.Union([
  S.Struct({ isNull: S.Boolean }),
  S.Struct({ booleanValue: S.Boolean }),
  S.Struct({ longValue: S.Number }),
  S.Struct({ doubleValue: S.Number }),
  S.Struct({ stringValue: S.String }),
  S.Struct({ blobValue: T.Blob }),
  S.Struct({ arrayValue: ArrayValue }),
]);
export type TypeHint =
  | "JSON"
  | "UUID"
  | "TIMESTAMP"
  | "DATE"
  | "TIME"
  | "DECIMAL"
  | (string & {});
export const TypeHint = S.String;

export interface SqlParameter {
  name?: string;
  value?: Field;
  typeHint?: TypeHint;
}
export const SqlParameter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    value: S.optional(Field),
    typeHint: S.optional(TypeHint),
  }),
).annotate({ identifier: "SqlParameter" }) as any as S.Schema<SqlParameter>;
export type SqlParametersList = SqlParameter[];
export const SqlParametersList = /*@__PURE__*/ S.Array(SqlParameter);
export type SqlParameterSets = SqlParameter[][];
export const SqlParameterSets = /*@__PURE__*/ S.Array(SqlParametersList);
export type Id = string;
export interface BatchExecuteStatementRequest {
  resourceArn: string;
  secretArn: string;
  sql: string;
  database?: string;
  schema?: string;
  parameterSets?: SqlParameter[][];
  transactionId?: string;
}
export const BatchExecuteStatementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    secretArn: S.String,
    sql: S.String,
    database: S.optional(S.String),
    schema: S.optional(S.String),
    parameterSets: S.optional(SqlParameterSets),
    transactionId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchExecute" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchExecuteStatementRequest",
}) as any as S.Schema<BatchExecuteStatementRequest>;
export type FieldList = Field[];
export const FieldList = /*@__PURE__*/ S.Array(Field);
export interface UpdateResult {
  generatedFields?: Field[];
}
export const UpdateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ generatedFields: S.optional(FieldList) }),
).annotate({ identifier: "UpdateResult" }) as any as S.Schema<UpdateResult>;
export type UpdateResults = UpdateResult[];
export const UpdateResults = /*@__PURE__*/ S.Array(UpdateResult);
export interface BatchExecuteStatementResponse {
  updateResults?: UpdateResult[];
}
export const BatchExecuteStatementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ updateResults: S.optional(UpdateResults) }),
).annotate({
  identifier: "BatchExecuteStatementResponse",
}) as any as S.Schema<BatchExecuteStatementResponse>;
export interface BeginTransactionRequest {
  resourceArn: string;
  secretArn: string;
  database?: string;
  schema?: string;
}
export const BeginTransactionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    secretArn: S.String,
    database: S.optional(S.String),
    schema: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BeginTransaction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BeginTransactionRequest",
}) as any as S.Schema<BeginTransactionRequest>;
export interface BeginTransactionResponse {
  transactionId?: string;
}
export const BeginTransactionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ transactionId: S.optional(S.String) }),
).annotate({
  identifier: "BeginTransactionResponse",
}) as any as S.Schema<BeginTransactionResponse>;
export interface CommitTransactionRequest {
  resourceArn: string;
  secretArn: string;
  transactionId: string;
}
export const CommitTransactionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    secretArn: S.String,
    transactionId: S.String,
  }).pipe(
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
export type TransactionStatus = string;
export interface CommitTransactionResponse {
  transactionStatus?: string;
}
export const CommitTransactionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ transactionStatus: S.optional(S.String) }),
).annotate({
  identifier: "CommitTransactionResponse",
}) as any as S.Schema<CommitTransactionResponse>;
export interface ExecuteSqlRequest {
  dbClusterOrInstanceArn: string;
  awsSecretStoreArn: string;
  sqlStatements: string;
  database?: string;
  schema?: string;
}
export const ExecuteSqlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dbClusterOrInstanceArn: S.String,
    awsSecretStoreArn: S.String,
    sqlStatements: S.String,
    database: S.optional(S.String),
    schema: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ExecuteSql" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExecuteSqlRequest",
}) as any as S.Schema<ExecuteSqlRequest>;
export interface ColumnMetadata {
  name?: string;
  type?: number;
  typeName?: string;
  label?: string;
  schemaName?: string;
  tableName?: string;
  isAutoIncrement?: boolean;
  isSigned?: boolean;
  isCurrency?: boolean;
  isCaseSensitive?: boolean;
  nullable?: number;
  precision?: number;
  scale?: number;
  arrayBaseColumnType?: number;
}
export const ColumnMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    type: S.optional(S.Number),
    typeName: S.optional(S.String),
    label: S.optional(S.String),
    schemaName: S.optional(S.String),
    tableName: S.optional(S.String),
    isAutoIncrement: S.optional(S.Boolean),
    isSigned: S.optional(S.Boolean),
    isCurrency: S.optional(S.Boolean),
    isCaseSensitive: S.optional(S.Boolean),
    nullable: S.optional(S.Number),
    precision: S.optional(S.Number),
    scale: S.optional(S.Number),
    arrayBaseColumnType: S.optional(S.Number),
  }),
).annotate({ identifier: "ColumnMetadata" }) as any as S.Schema<ColumnMetadata>;
export type Metadata = ColumnMetadata[];
export const Metadata = /*@__PURE__*/ S.Array(ColumnMetadata);
export interface ResultSetMetadata {
  columnCount?: number;
  columnMetadata?: ColumnMetadata[];
}
export const ResultSetMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    columnCount: S.optional(S.Number),
    columnMetadata: S.optional(Metadata),
  }),
).annotate({
  identifier: "ResultSetMetadata",
}) as any as S.Schema<ResultSetMetadata>;
export type BoxedInteger = number;
export type BoxedFloat = number;
export type ArrayValueList = Value[];
export const ArrayValueList = /*@__PURE__*/ S.Array(
  S.suspend(() => Value).annotate({ identifier: "Value" }),
) as any as S.Schema<ArrayValueList>;
export interface StructValue {
  attributes?: Value[];
}
export const StructValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    attributes: S.optional(
      S.suspend(() => ArrayValueList).annotate({
        identifier: "ArrayValueList",
      }),
    ),
  }),
).annotate({ identifier: "StructValue" }) as any as S.Schema<StructValue>;
export type Value =
  | {
      isNull: boolean;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue: boolean;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue: number;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue: number;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue: number;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue: number;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue: string;
      blobValue?: never;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue: Uint8Array;
      arrayValues?: never;
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues: Value[];
      structValue?: never;
    }
  | {
      isNull?: never;
      bitValue?: never;
      bigIntValue?: never;
      intValue?: never;
      doubleValue?: never;
      realValue?: never;
      stringValue?: never;
      blobValue?: never;
      arrayValues?: never;
      structValue: StructValue;
    };
export const Value = /*@__PURE__*/ S.Union([
  S.Struct({ isNull: S.Boolean }),
  S.Struct({ bitValue: S.Boolean }),
  S.Struct({ bigIntValue: S.Number }),
  S.Struct({ intValue: S.Number }),
  S.Struct({ doubleValue: S.Number }),
  S.Struct({ realValue: S.Number }),
  S.Struct({ stringValue: S.String }),
  S.Struct({ blobValue: T.Blob }),
  S.Struct({
    arrayValues: S.suspend(() => ArrayValueList).annotate({
      identifier: "ArrayValueList",
    }),
  }),
  S.Struct({
    structValue: S.suspend((): S.Schema<StructValue> => StructValue).annotate({
      identifier: "StructValue",
    }),
  }),
]) as any as S.Schema<Value>;
export type Row = Value[];
export const Row = /*@__PURE__*/ S.Array(
  S.suspend(() => Value).annotate({ identifier: "Value" }),
);
export interface Record {
  values?: Value[];
}
export const Record = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ values: S.optional(Row) }),
).annotate({ identifier: "Record" }) as any as S.Schema<Record>;
export type Records = Record[];
export const Records = /*@__PURE__*/ S.Array(Record);
export interface ResultFrame {
  resultSetMetadata?: ResultSetMetadata;
  records?: Record[];
}
export const ResultFrame = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resultSetMetadata: S.optional(ResultSetMetadata),
    records: S.optional(Records),
  }),
).annotate({ identifier: "ResultFrame" }) as any as S.Schema<ResultFrame>;
export type RecordsUpdated = number;
export interface SqlStatementResult {
  resultFrame?: ResultFrame;
  numberOfRecordsUpdated?: number;
}
export const SqlStatementResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resultFrame: S.optional(ResultFrame),
    numberOfRecordsUpdated: S.optional(S.Number),
  }),
).annotate({
  identifier: "SqlStatementResult",
}) as any as S.Schema<SqlStatementResult>;
export type SqlStatementResults = SqlStatementResult[];
export const SqlStatementResults = /*@__PURE__*/ S.Array(SqlStatementResult);
export interface ExecuteSqlResponse {
  sqlStatementResults?: SqlStatementResult[];
}
export const ExecuteSqlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sqlStatementResults: S.optional(SqlStatementResults) }),
).annotate({
  identifier: "ExecuteSqlResponse",
}) as any as S.Schema<ExecuteSqlResponse>;
export type DecimalReturnType = "STRING" | "DOUBLE_OR_LONG" | (string & {});
export const DecimalReturnType = S.String;

export type LongReturnType = "STRING" | "LONG" | (string & {});
export const LongReturnType = S.String;

export interface ResultSetOptions {
  decimalReturnType?: DecimalReturnType;
  longReturnType?: LongReturnType;
}
export const ResultSetOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    decimalReturnType: S.optional(DecimalReturnType),
    longReturnType: S.optional(LongReturnType),
  }),
).annotate({
  identifier: "ResultSetOptions",
}) as any as S.Schema<ResultSetOptions>;
export type RecordsFormatType = "NONE" | "JSON" | (string & {});
export const RecordsFormatType = S.String;

export interface ExecuteStatementRequest {
  resourceArn: string;
  secretArn: string;
  sql: string;
  database?: string;
  schema?: string;
  parameters?: SqlParameter[];
  transactionId?: string;
  includeResultMetadata?: boolean;
  continueAfterTimeout?: boolean;
  resultSetOptions?: ResultSetOptions;
  formatRecordsAs?: RecordsFormatType;
}
export const ExecuteStatementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    secretArn: S.String,
    sql: S.String,
    database: S.optional(S.String),
    schema: S.optional(S.String),
    parameters: S.optional(SqlParametersList),
    transactionId: S.optional(S.String),
    includeResultMetadata: S.optional(S.Boolean),
    continueAfterTimeout: S.optional(S.Boolean),
    resultSetOptions: S.optional(ResultSetOptions),
    formatRecordsAs: S.optional(RecordsFormatType),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/Execute" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ExecuteStatementRequest",
}) as any as S.Schema<ExecuteStatementRequest>;
export type SqlRecords = Field[][];
export const SqlRecords = /*@__PURE__*/ S.Array(FieldList);
export type FormattedSqlRecords = string;
export interface ExecuteStatementResponse {
  records?: Field[][];
  columnMetadata?: ColumnMetadata[];
  numberOfRecordsUpdated?: number;
  generatedFields?: Field[];
  formattedRecords?: string;
}
export const ExecuteStatementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    records: S.optional(SqlRecords),
    columnMetadata: S.optional(Metadata),
    numberOfRecordsUpdated: S.optional(S.Number),
    generatedFields: S.optional(FieldList),
    formattedRecords: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecuteStatementResponse",
}) as any as S.Schema<ExecuteStatementResponse>;
export interface RollbackTransactionRequest {
  resourceArn: string;
  secretArn: string;
  transactionId: string;
}
export const RollbackTransactionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    secretArn: S.String,
    transactionId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/RollbackTransaction" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RollbackTransactionRequest",
}) as any as S.Schema<RollbackTransactionRequest>;
export interface RollbackTransactionResponse {
  transactionStatus?: string;
}
export const RollbackTransactionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ transactionStatus: S.optional(S.String) }),
).annotate({
  identifier: "RollbackTransactionResponse",
}) as any as S.Schema<RollbackTransactionResponse>;
export type ErrorMessage = string;
export type BatchExecuteStatementError =
  | AccessDeniedException
  | BadRequestException
  | DatabaseErrorException
  | DatabaseNotFoundException
  | DatabaseResumingException
  | DatabaseUnavailableException
  | ForbiddenException
  | HttpEndpointNotEnabledException
  | InternalServerErrorException
  | InvalidResourceStateException
  | InvalidSecretException
  | SecretsErrorException
  | ServiceUnavailableError
  | StatementTimeoutException
  | TransactionNotFoundException
  | CommonErrors;
/**
 * Runs a batch SQL statement over an array of data.
 *
 * You can run bulk update and insert operations for multiple records using a DML statement with different parameter sets. Bulk operations can provide a significant performance improvement over individual insert and update operations.
 *
 * If a call isn't part of a transaction because it doesn't include the `transactionID` parameter, changes that result from the call are committed automatically.
 *
 * There isn't a fixed upper limit on the number of parameter sets. However, the maximum size of the HTTP request submitted through the Data API is 4 MiB. If the request exceeds this limit, the Data API returns an error and doesn't process the request. This 4-MiB limit includes the size of the HTTP headers and the JSON notation in the request. Thus, the number of parameter sets that you can include depends on a combination of factors, such as the size of the SQL statement and the size of each parameter set.
 *
 * The response size limit is 1 MiB. If the call returns more than 1 MiB of response data, the call is terminated.
 */
export const batchExecuteStatement: API.OperationMethod<
  BatchExecuteStatementRequest,
  BatchExecuteStatementResponse,
  BatchExecuteStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchExecuteStatementRequest,
  output: BatchExecuteStatementResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    DatabaseErrorException,
    DatabaseNotFoundException,
    DatabaseResumingException,
    DatabaseUnavailableException,
    ForbiddenException,
    HttpEndpointNotEnabledException,
    InternalServerErrorException,
    InvalidResourceStateException,
    InvalidSecretException,
    SecretsErrorException,
    ServiceUnavailableError,
    StatementTimeoutException,
    TransactionNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchExecuteStatement",
}));

export type BeginTransactionError =
  | AccessDeniedException
  | BadRequestException
  | DatabaseErrorException
  | DatabaseNotFoundException
  | DatabaseResumingException
  | DatabaseUnavailableException
  | ForbiddenException
  | HttpEndpointNotEnabledException
  | InternalServerErrorException
  | InvalidResourceStateException
  | InvalidSecretException
  | SecretsErrorException
  | ServiceUnavailableError
  | StatementTimeoutException
  | TransactionNotFoundException
  | CommonErrors;
/**
 * Starts a SQL transaction.
 *
 * A transaction can run for a maximum of 24 hours. A transaction is terminated and rolled back automatically after 24 hours.
 *
 * A transaction times out if no calls use its transaction ID in three minutes. If a transaction times out before it's committed, it's rolled back automatically.
 *
 * For Aurora MySQL, DDL statements inside a transaction cause an implicit commit. We recommend that you run each MySQL DDL statement in a separate `ExecuteStatement` call with `continueAfterTimeout` enabled.
 */
export const beginTransaction: API.OperationMethod<
  BeginTransactionRequest,
  BeginTransactionResponse,
  BeginTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BeginTransactionRequest,
  output: BeginTransactionResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    DatabaseErrorException,
    DatabaseNotFoundException,
    DatabaseResumingException,
    DatabaseUnavailableException,
    ForbiddenException,
    HttpEndpointNotEnabledException,
    InternalServerErrorException,
    InvalidResourceStateException,
    InvalidSecretException,
    SecretsErrorException,
    ServiceUnavailableError,
    StatementTimeoutException,
    TransactionNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BeginTransaction",
}));

export type CommitTransactionError =
  | AccessDeniedException
  | BadRequestException
  | DatabaseErrorException
  | DatabaseNotFoundException
  | DatabaseUnavailableException
  | ForbiddenException
  | HttpEndpointNotEnabledException
  | InternalServerErrorException
  | InvalidResourceStateException
  | InvalidSecretException
  | NotFoundException
  | SecretsErrorException
  | ServiceUnavailableError
  | StatementTimeoutException
  | TransactionNotFoundException
  | CommonErrors;
/**
 * Ends a SQL transaction started with the `BeginTransaction` operation and commits the changes.
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
    AccessDeniedException,
    BadRequestException,
    DatabaseErrorException,
    DatabaseNotFoundException,
    DatabaseUnavailableException,
    ForbiddenException,
    HttpEndpointNotEnabledException,
    InternalServerErrorException,
    InvalidResourceStateException,
    InvalidSecretException,
    NotFoundException,
    SecretsErrorException,
    ServiceUnavailableError,
    StatementTimeoutException,
    TransactionNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CommitTransaction",
}));

export type ExecuteSqlError =
  | AccessDeniedException
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | ServiceUnavailableError
  | CommonErrors;
/**
 * Runs one or more SQL statements.
 *
 * This operation is deprecated. Please use the `BatchExecuteStatement` or `ExecuteStatement` operation.
 */
export const executeSql: API.OperationMethod<
  ExecuteSqlRequest,
  ExecuteSqlResponse,
  ExecuteSqlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteSqlRequest,
  output: ExecuteSqlResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    ServiceUnavailableError,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteSql",
}));

export type ExecuteStatementError =
  | AccessDeniedException
  | BadRequestException
  | DatabaseErrorException
  | DatabaseNotFoundException
  | DatabaseResumingException
  | DatabaseUnavailableException
  | ForbiddenException
  | HttpEndpointNotEnabledException
  | InternalServerErrorException
  | InvalidResourceStateException
  | InvalidSecretException
  | SecretsErrorException
  | ServiceUnavailableError
  | StatementTimeoutException
  | TransactionNotFoundException
  | UnsupportedResultException
  | CommonErrors;
/**
 * Runs a SQL statement against a database.
 *
 * If a call isn't part of a transaction because it doesn't include the `transactionID` parameter, changes that result from the call are committed automatically.
 *
 * If the binary response data from the database is more than 1 MB, the call is terminated.
 */
export const executeStatement: API.OperationMethod<
  ExecuteStatementRequest,
  ExecuteStatementResponse,
  ExecuteStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteStatementRequest,
  output: ExecuteStatementResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    DatabaseErrorException,
    DatabaseNotFoundException,
    DatabaseResumingException,
    DatabaseUnavailableException,
    ForbiddenException,
    HttpEndpointNotEnabledException,
    InternalServerErrorException,
    InvalidResourceStateException,
    InvalidSecretException,
    SecretsErrorException,
    ServiceUnavailableError,
    StatementTimeoutException,
    TransactionNotFoundException,
    UnsupportedResultException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteStatement",
}));

export type RollbackTransactionError =
  | AccessDeniedException
  | BadRequestException
  | DatabaseErrorException
  | DatabaseNotFoundException
  | DatabaseUnavailableException
  | ForbiddenException
  | HttpEndpointNotEnabledException
  | InternalServerErrorException
  | InvalidResourceStateException
  | InvalidSecretException
  | NotFoundException
  | SecretsErrorException
  | ServiceUnavailableError
  | StatementTimeoutException
  | TransactionNotFoundException
  | CommonErrors;
/**
 * Performs a rollback of a transaction. Rolling back a transaction cancels its changes.
 */
export const rollbackTransaction: API.OperationMethod<
  RollbackTransactionRequest,
  RollbackTransactionResponse,
  RollbackTransactionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RollbackTransactionRequest,
  output: RollbackTransactionResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    DatabaseErrorException,
    DatabaseNotFoundException,
    DatabaseUnavailableException,
    ForbiddenException,
    HttpEndpointNotEnabledException,
    InternalServerErrorException,
    InvalidResourceStateException,
    InvalidSecretException,
    NotFoundException,
    SecretsErrorException,
    ServiceUnavailableError,
    StatementTimeoutException,
    TransactionNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackTransaction",
}));
