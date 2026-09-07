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
  sdkId: "BCM Data Exports",
  serviceShapeName: "AWSBillingAndCostManagementDataExports",
});
const auth = T.AwsAuthSigv4({ name: "bcm-data-exports" });
const ver = T.ServiceVersion("2023-11-26");
const proto = T.AwsProtocolsAwsJson1_1();
const rules = T.EndpointResolver((p, _) => {
  const { UseFIPS = false, Endpoint, Region } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  const _p0 = (_0: unknown) => ({
    authSchemes: [
      {
        name: "sigv4",
        signingRegion: `${_.getAttr(_0, "implicitGlobalRegion")}`,
      },
    ],
  });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err(
        "Invalid Configuration: FIPS and custom endpoint are not supported",
      );
    }
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso" &&
          UseFIPS === false
        ) {
          return e(
            "https://bcm-data-exports.us-iso-east-1.c2s.ic.gov",
            {
              authSchemes: [{ name: "sigv4", signingRegion: "us-iso-east-1" }],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
          UseFIPS === false
        ) {
          return e(
            "https://bcm-data-exports.us-isob-east-1.sc2s.sgov.gov",
            {
              authSchemes: [{ name: "sigv4", signingRegion: "us-isob-east-1" }],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
          UseFIPS === false
        ) {
          return e(
            "https://bcm-data-exports.eu-isoe-west-1.cloud.adc-e.uk",
            {
              authSchemes: [{ name: "sigv4", signingRegion: "eu-isoe-west-1" }],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
          UseFIPS === false
        ) {
          return e(
            "https://bcm-data-exports.us-isof-south-1.csp.hci.ic.gov",
            {
              authSchemes: [
                { name: "sigv4", signingRegion: "us-isof-south-1" },
              ],
            },
            {},
          );
        }
        if (UseFIPS === true) {
          return e(
            `https://bcm-data-exports-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(PartitionResult),
            {},
          );
        }
        return e(
          `https://bcm-data-exports.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          _p0(PartitionResult),
          {},
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.String,
      ResourceType: S.String,
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      ResourceId: S.optional(S.String),
      ResourceType: S.optional(S.String),
      QuotaCode: S.String,
      ServiceCode: S.String,
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      QuotaCode: S.optional(S.String),
      ServiceCode: S.optional(S.String),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      Reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      Fields: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Arn = string;
export type ExportName = string;
export type QueryStatement = string;
export type TableName = string;
export type TableProperty = string;
export type TablePropertyGenericString = string;
export type TableProperties = { [key: string]: string | undefined };
export const TableProperties = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type TableConfigurations = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export const TableConfigurations = /*@__PURE__*/ S.Record(
  S.String,
  TableProperties.pipe(S.optional),
);
export interface DataQuery {
  QueryStatement: string;
  TableConfigurations?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
}
export const DataQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryStatement: S.String,
    TableConfigurations: S.optional(TableConfigurations),
  }),
).annotate({ identifier: "DataQuery" }) as any as S.Schema<DataQuery>;
export type AccountId = string;
export type S3OutputType = "CUSTOM" | "ATHENA" | "REDSHIFT" | (string & {});
export const S3OutputType = S.String;

export type FormatOption = "TEXT_OR_CSV" | "PARQUET" | (string & {});
export const FormatOption = S.String;

export type CompressionOption = "GZIP" | "PARQUET" | "ZIP" | (string & {});
export const CompressionOption = S.String;

export type OverwriteOption =
  | "CREATE_NEW_REPORT"
  | "OVERWRITE_REPORT"
  | (string & {});
export const OverwriteOption = S.String;

export interface S3OutputConfigurations {
  OutputType: S3OutputType;
  Format: FormatOption;
  Compression: CompressionOption;
  Overwrite: OverwriteOption;
}
export const S3OutputConfigurations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputType: S3OutputType,
    Format: FormatOption,
    Compression: CompressionOption,
    Overwrite: OverwriteOption,
  }),
).annotate({
  identifier: "S3OutputConfigurations",
}) as any as S.Schema<S3OutputConfigurations>;
export interface S3Destination {
  S3Bucket: string;
  S3BucketOwner?: string;
  S3Prefix: string;
  S3Region: string;
  S3OutputConfigurations: S3OutputConfigurations;
}
export const S3Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Bucket: S.String,
    S3BucketOwner: S.optional(S.String),
    S3Prefix: S.String,
    S3Region: S.String,
    S3OutputConfigurations: S3OutputConfigurations,
  }),
).annotate({ identifier: "S3Destination" }) as any as S.Schema<S3Destination>;
export interface DestinationConfigurations {
  S3Destination: S3Destination;
}
export const DestinationConfigurations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Destination: S3Destination }),
).annotate({
  identifier: "DestinationConfigurations",
}) as any as S.Schema<DestinationConfigurations>;
export type FrequencyOption = "SYNCHRONOUS" | (string & {});
export const FrequencyOption = S.String;

export interface RefreshCadence {
  Frequency: FrequencyOption;
}
export const RefreshCadence = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Frequency: FrequencyOption }),
).annotate({ identifier: "RefreshCadence" }) as any as S.Schema<RefreshCadence>;
export interface Export {
  ExportArn?: string;
  Name: string;
  Description?: string;
  DataQuery: DataQuery;
  DestinationConfigurations: DestinationConfigurations;
  RefreshCadence: RefreshCadence;
}
export const Export = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportArn: S.optional(S.String),
    Name: S.String,
    Description: S.optional(S.String),
    DataQuery: DataQuery,
    DestinationConfigurations: DestinationConfigurations,
    RefreshCadence: RefreshCadence,
  }),
).annotate({ identifier: "Export" }) as any as S.Schema<Export>;
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  Key: string;
  Value: string;
}
export const ResourceTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "ResourceTag" }) as any as S.Schema<ResourceTag>;
export type ResourceTagList = ResourceTag[];
export const ResourceTagList = /*@__PURE__*/ S.Array(ResourceTag);
export interface CreateExportRequest {
  Export: Export;
  ResourceTags?: ResourceTag[];
}
export const CreateExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Export: Export, ResourceTags: S.optional(ResourceTagList) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateExportRequest",
}) as any as S.Schema<CreateExportRequest>;
export interface CreateExportResponse {
  ExportArn?: string;
}
export const CreateExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateExportResponse",
}) as any as S.Schema<CreateExportResponse>;
export interface DeleteExportRequest {
  ExportArn: string;
}
export const DeleteExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteExportRequest",
}) as any as S.Schema<DeleteExportRequest>;
export interface DeleteExportResponse {
  ExportArn?: string;
}
export const DeleteExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportArn: S.optional(S.String) }),
).annotate({
  identifier: "DeleteExportResponse",
}) as any as S.Schema<DeleteExportResponse>;
export interface GetExecutionRequest {
  ExportArn: string;
  ExecutionId: string;
}
export const GetExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportArn: S.String, ExecutionId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetExecutionRequest",
}) as any as S.Schema<GetExecutionRequest>;
export type ExecutionStatusCode =
  | "INITIATION_IN_PROCESS"
  | "QUERY_QUEUED"
  | "QUERY_IN_PROCESS"
  | "QUERY_FAILURE"
  | "DELIVERY_IN_PROCESS"
  | "DELIVERY_SUCCESS"
  | "DELIVERY_FAILURE"
  | (string & {});
export const ExecutionStatusCode = S.String;

export type ExecutionStatusReason =
  | "INSUFFICIENT_PERMISSION"
  | "BILL_OWNER_CHANGED"
  | "INTERNAL_FAILURE"
  | "DEPRECATED"
  | (string & {});
export const ExecutionStatusReason = S.String;

export interface ExecutionStatus {
  StatusCode?: ExecutionStatusCode;
  StatusReason?: ExecutionStatusReason;
  CreatedAt?: Date;
  CompletedAt?: Date;
  LastUpdatedAt?: Date;
}
export const ExecutionStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusCode: S.optional(ExecutionStatusCode),
    StatusReason: S.optional(ExecutionStatusReason),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    CompletedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ExecutionStatus",
}) as any as S.Schema<ExecutionStatus>;
export interface GetExecutionResponse {
  ExecutionId?: string;
  Export?: Export;
  ExecutionStatus?: ExecutionStatus;
}
export const GetExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutionId: S.optional(S.String),
    Export: S.optional(Export),
    ExecutionStatus: S.optional(ExecutionStatus),
  }),
).annotate({
  identifier: "GetExecutionResponse",
}) as any as S.Schema<GetExecutionResponse>;
export interface GetExportRequest {
  ExportArn: string;
}
export const GetExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetExportRequest",
}) as any as S.Schema<GetExportRequest>;
export type ExportStatusCode = "HEALTHY" | "UNHEALTHY" | (string & {});
export const ExportStatusCode = S.String;

export interface ExportStatus {
  StatusCode?: ExportStatusCode;
  StatusReason?: ExecutionStatusReason;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  LastRefreshedAt?: Date;
}
export const ExportStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusCode: S.optional(ExportStatusCode),
    StatusReason: S.optional(ExecutionStatusReason),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastRefreshedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "ExportStatus" }) as any as S.Schema<ExportStatus>;
export interface GetExportResponse {
  Export?: Export;
  ExportStatus?: ExportStatus;
}
export const GetExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Export: S.optional(Export),
    ExportStatus: S.optional(ExportStatus),
  }),
).annotate({
  identifier: "GetExportResponse",
}) as any as S.Schema<GetExportResponse>;
export interface GetTableRequest {
  TableName: string;
  TableProperties?: { [key: string]: string | undefined };
}
export const GetTableRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.String,
    TableProperties: S.optional(TableProperties),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTableRequest",
}) as any as S.Schema<GetTableRequest>;
export interface Column {
  Name?: string;
  Type?: string;
  Description?: string;
}
export const Column = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "Column" }) as any as S.Schema<Column>;
export type ColumnList = Column[];
export const ColumnList = /*@__PURE__*/ S.Array(Column);
export interface GetTableResponse {
  TableName?: string;
  Description?: string;
  TableProperties?: { [key: string]: string | undefined };
  Schema?: Column[];
}
export const GetTableResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String),
    Description: S.optional(S.String),
    TableProperties: S.optional(TableProperties),
    Schema: S.optional(ColumnList),
  }),
).annotate({
  identifier: "GetTableResponse",
}) as any as S.Schema<GetTableResponse>;
export type MaxResults = number;
export type NextPageToken = string;
export interface ListExecutionsRequest {
  ExportArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListExecutionsRequest",
}) as any as S.Schema<ListExecutionsRequest>;
export interface ExecutionReference {
  ExecutionId: string;
  ExecutionStatus: ExecutionStatus;
}
export const ExecutionReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExecutionId: S.String, ExecutionStatus: ExecutionStatus }),
).annotate({
  identifier: "ExecutionReference",
}) as any as S.Schema<ExecutionReference>;
export type ExecutionReferenceList = ExecutionReference[];
export const ExecutionReferenceList = /*@__PURE__*/ S.Array(ExecutionReference);
export interface ListExecutionsResponse {
  Executions?: ExecutionReference[];
  NextToken?: string;
}
export const ListExecutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Executions: S.optional(ExecutionReferenceList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExecutionsResponse",
}) as any as S.Schema<ListExecutionsResponse>;
export interface ListExportsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListExportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListExportsRequest",
}) as any as S.Schema<ListExportsRequest>;
export interface ExportReference {
  ExportArn: string;
  ExportName: string;
  ExportStatus: ExportStatus;
}
export const ExportReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportArn: S.String,
    ExportName: S.String,
    ExportStatus: ExportStatus,
  }),
).annotate({
  identifier: "ExportReference",
}) as any as S.Schema<ExportReference>;
export type ExportReferenceList = ExportReference[];
export const ExportReferenceList = /*@__PURE__*/ S.Array(ExportReference);
export interface ListExportsResponse {
  Exports?: ExportReference[];
  NextToken?: string;
}
export const ListExportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Exports: S.optional(ExportReferenceList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExportsResponse",
}) as any as S.Schema<ListExportsResponse>;
export interface ListTablesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListTablesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTablesRequest",
}) as any as S.Schema<ListTablesRequest>;
export type GenericStringList = string[];
export const GenericStringList = /*@__PURE__*/ S.Array(S.String);
export interface TablePropertyDescription {
  Name?: string;
  ValidValues?: string[];
  DefaultValue?: string;
  Description?: string;
}
export const TablePropertyDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ValidValues: S.optional(GenericStringList),
    DefaultValue: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "TablePropertyDescription",
}) as any as S.Schema<TablePropertyDescription>;
export type TablePropertyDescriptionList = TablePropertyDescription[];
export const TablePropertyDescriptionList = /*@__PURE__*/ S.Array(
  TablePropertyDescription,
);
export interface Table {
  TableName?: string;
  Description?: string;
  TableProperties?: TablePropertyDescription[];
}
export const Table = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TableName: S.optional(S.String),
    Description: S.optional(S.String),
    TableProperties: S.optional(TablePropertyDescriptionList),
  }),
).annotate({ identifier: "Table" }) as any as S.Schema<Table>;
export type TableList = Table[];
export const TableList = /*@__PURE__*/ S.Array(Table);
export interface ListTablesResponse {
  Tables?: Table[];
  NextToken?: string;
}
export const ListTablesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tables: S.optional(TableList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTablesResponse",
}) as any as S.Schema<ListTablesResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  ResourceTags?: ResourceTag[];
  NextToken?: string;
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceTags: S.optional(ResourceTagList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  ResourceTags: ResourceTag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, ResourceTags: ResourceTagList }).pipe(
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
export type ResourceTagKeyList = string[];
export const ResourceTagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  ResourceTagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, ResourceTagKeys: ResourceTagKeyList }).pipe(
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
export interface UpdateExportRequest {
  ExportArn: string;
  Export: Export;
}
export const UpdateExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportArn: S.String, Export: Export }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateExportRequest",
}) as any as S.Schema<UpdateExportRequest>;
export interface UpdateExportResponse {
  ExportArn?: string;
}
export const UpdateExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExportArn: S.optional(S.String) }),
).annotate({
  identifier: "UpdateExportResponse",
}) as any as S.Schema<UpdateExportResponse>;
export type ValidationExceptionReason =
  | "unknownOperation"
  | "cannotParse"
  | "fieldValidationFailed"
  | "other"
  | (string & {});
export const ValidationExceptionReason = S.String;

export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type CreateExportError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a data export and specifies the data query, the delivery preference, and any optional resource tags.
 *
 * A `DataQuery` consists of both a `QueryStatement` and `TableConfigurations`.
 *
 * The `QueryStatement` is an SQL statement. Data Exports only supports a limited subset of the SQL syntax. For more information on the SQL syntax that is supported, see Data query. To view the available tables and columns, see the Data Exports table dictionary.
 *
 * The `TableConfigurations` is a collection of specified `TableProperties` for the table being queried in the `QueryStatement`. TableProperties are additional configurations you can provide to change the data and schema of a table. Each table can have different TableProperties. However, tables are not required to have any TableProperties. Each table property has a default value that it assumes if not specified. For more information on table configurations, see Data query. To view the table properties available for each table, see the Data Exports table dictionary or use the `ListTables` API to get a response of all tables and their available properties.
 */
export const createExport: API.OperationMethod<
  CreateExportRequest,
  CreateExportResponse,
  CreateExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExportRequest,
  output: CreateExportResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExport",
}));

export type DeleteExportError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing data export.
 */
export const deleteExport: API.OperationMethod<
  DeleteExportRequest,
  DeleteExportResponse,
  DeleteExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteExportRequest,
  output: DeleteExportResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExport",
}));

export type GetExecutionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Exports data based on the source data update.
 */
export const getExecution: API.OperationMethod<
  GetExecutionRequest,
  GetExecutionResponse,
  GetExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExecutionRequest,
  output: GetExecutionResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExecution",
}));

export type GetExportError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Views the definition of an existing data export.
 */
export const getExport: API.OperationMethod<
  GetExportRequest,
  GetExportResponse,
  GetExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExportRequest,
  output: GetExportResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExport",
}));

export type GetTableError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the metadata for the specified table and table properties. This includes the list of columns in the table schema, their data types, and column descriptions.
 */
export const getTable: API.OperationMethod<
  GetTableRequest,
  GetTableResponse,
  GetTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTableRequest,
  output: GetTableResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTable",
}));

export type ListExecutionsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the historical executions for the export.
 */
export const listExecutions: API.PaginatedOperationMethod<
  ListExecutionsRequest,
  ListExecutionsResponse,
  ListExecutionsError,
  Credentials | HttpClient.HttpClient,
  ExecutionReference
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExecutionsRequest,
  output: ListExecutionsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExecutions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Executions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExportsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all data export definitions.
 */
export const listExports: API.PaginatedOperationMethod<
  ListExportsRequest,
  ListExportsResponse,
  ListExportsError,
  Credentials | HttpClient.HttpClient,
  ExportReference
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExportsRequest,
  output: ListExportsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Exports",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTablesError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all available tables in data exports.
 */
export const listTables: API.PaginatedOperationMethod<
  ListTablesRequest,
  ListTablesResponse,
  ListTablesError,
  Credentials | HttpClient.HttpClient,
  Table
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTablesRequest,
  output: ListTablesResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
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

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List tags associated with an existing data export.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags for an existing data export definition.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes tags associated with an existing data export definition.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateExportError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing data export by overwriting all export parameters. All export parameters must be provided in the UpdateExport request.
 */
export const updateExport: API.OperationMethod<
  UpdateExportRequest,
  UpdateExportResponse,
  UpdateExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateExportRequest,
  output: UpdateExportResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExport",
}));
