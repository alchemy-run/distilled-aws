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
  sdkId: "Timestream Query",
  serviceShapeName: "Timestream_20181101",
});
const auth = T.AwsAuthSigv4({ name: "timestream" });
const ver = T.ServiceVersion("2018-11-01");
const proto = T.AwsProtocolsAwsJson1_0();
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
            if ("aws" === _.getAttr(PartitionResult, "name")) {
              return e(`https://timestream-query-fips.${Region}.api.aws`);
            }
            if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
              return e(`https://timestream-query.${Region}.api.aws`);
            }
            return e(
              `https://query.timestream-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://query.timestream.${Region}.amazonaws.com`);
            }
            return e(
              `https://query.timestream-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            if ("aws" === _.getAttr(PartitionResult, "name")) {
              return e(`https://timestream-query.${Region}.api.aws`);
            }
            if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
              return e(`https://timestream-query.${Region}.api.aws`);
            }
            return e(
              `https://query.timestream.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://query.timestream.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.all(
      T.AwsQueryError({ code: "AccessDenied", httpResponseCode: 403 }),
      T.HttpError(403),
    ),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidEndpointException
  extends /*@__PURE__*/ S.TaggedError<InvalidEndpointException>()(
    "InvalidEndpointException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(421),
  ) {}
export class QueryExecutionException
  extends /*@__PURE__*/ S.TaggedError<QueryExecutionException>()(
    "QueryExecutionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ScheduledQueryArn: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TimestreamNotOnboarded
  extends /*@__PURE__*/ S.TaggedError<TimestreamNotOnboarded>()(
    "TimestreamNotOnboarded",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "AccessDeniedException",
      message: {
        includes: "Only existing Timestream for LiveAnalytics customers",
      },
    }),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type QueryId = string;
export interface CancelQueryRequest {
  QueryId: string;
}
export const CancelQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ QueryId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CancelQueryRequest",
}) as any as S.Schema<CancelQueryRequest>;
export interface CancelQueryResponse {
  CancellationMessage?: string;
}
export const CancelQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CancellationMessage: S.optional(S.String) }),
).annotate({
  identifier: "CancelQueryResponse",
}) as any as S.Schema<CancelQueryResponse>;
export type ScheduledQueryName = string;
export type QueryString = string | redacted.Redacted<string>;
export type ScheduleExpression = string;
export interface ScheduleConfiguration {
  ScheduleExpression: string;
}
export const ScheduleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduleExpression: S.String }),
).annotate({
  identifier: "ScheduleConfiguration",
}) as any as S.Schema<ScheduleConfiguration>;
export type AmazonResourceName = string;
export interface SnsConfiguration {
  TopicArn: string;
}
export const SnsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TopicArn: S.String }),
).annotate({
  identifier: "SnsConfiguration",
}) as any as S.Schema<SnsConfiguration>;
export interface NotificationConfiguration {
  SnsConfiguration: SnsConfiguration;
}
export const NotificationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SnsConfiguration: SnsConfiguration }),
).annotate({
  identifier: "NotificationConfiguration",
}) as any as S.Schema<NotificationConfiguration>;
export type ResourceName = string;
export type SchemaName = string;
export type DimensionValueType = "VARCHAR" | (string & {});
export const DimensionValueType = S.String;

export interface DimensionMapping {
  Name: string;
  DimensionValueType: DimensionValueType;
}
export const DimensionMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, DimensionValueType: DimensionValueType }),
).annotate({
  identifier: "DimensionMapping",
}) as any as S.Schema<DimensionMapping>;
export type DimensionMappingList = DimensionMapping[];
export const DimensionMappingList = /*@__PURE__*/ S.Array(DimensionMapping);
export type ScalarMeasureValueType =
  | "BIGINT"
  | "BOOLEAN"
  | "DOUBLE"
  | "VARCHAR"
  | "TIMESTAMP"
  | (string & {});
export const ScalarMeasureValueType = S.String;

export interface MultiMeasureAttributeMapping {
  SourceColumn: string;
  TargetMultiMeasureAttributeName?: string;
  MeasureValueType: ScalarMeasureValueType;
}
export const MultiMeasureAttributeMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceColumn: S.String,
    TargetMultiMeasureAttributeName: S.optional(S.String),
    MeasureValueType: ScalarMeasureValueType,
  }),
).annotate({
  identifier: "MultiMeasureAttributeMapping",
}) as any as S.Schema<MultiMeasureAttributeMapping>;
export type MultiMeasureAttributeMappingList = MultiMeasureAttributeMapping[];
export const MultiMeasureAttributeMappingList = /*@__PURE__*/ S.Array(
  MultiMeasureAttributeMapping,
);
export interface MultiMeasureMappings {
  TargetMultiMeasureName?: string;
  MultiMeasureAttributeMappings: MultiMeasureAttributeMapping[];
}
export const MultiMeasureMappings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetMultiMeasureName: S.optional(S.String),
    MultiMeasureAttributeMappings: MultiMeasureAttributeMappingList,
  }),
).annotate({
  identifier: "MultiMeasureMappings",
}) as any as S.Schema<MultiMeasureMappings>;
export type MeasureValueType =
  | "BIGINT"
  | "BOOLEAN"
  | "DOUBLE"
  | "VARCHAR"
  | "MULTI"
  | (string & {});
export const MeasureValueType = S.String;

export interface MixedMeasureMapping {
  MeasureName?: string;
  SourceColumn?: string;
  TargetMeasureName?: string;
  MeasureValueType: MeasureValueType;
  MultiMeasureAttributeMappings?: MultiMeasureAttributeMapping[];
}
export const MixedMeasureMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MeasureName: S.optional(S.String),
    SourceColumn: S.optional(S.String),
    TargetMeasureName: S.optional(S.String),
    MeasureValueType: MeasureValueType,
    MultiMeasureAttributeMappings: S.optional(MultiMeasureAttributeMappingList),
  }),
).annotate({
  identifier: "MixedMeasureMapping",
}) as any as S.Schema<MixedMeasureMapping>;
export type MixedMeasureMappingList = MixedMeasureMapping[];
export const MixedMeasureMappingList =
  /*@__PURE__*/ S.Array(MixedMeasureMapping);
export interface TimestreamConfiguration {
  DatabaseName: string;
  TableName: string;
  TimeColumn: string;
  DimensionMappings: DimensionMapping[];
  MultiMeasureMappings?: MultiMeasureMappings;
  MixedMeasureMappings?: MixedMeasureMapping[];
  MeasureNameColumn?: string;
}
export const TimestreamConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.String,
    TableName: S.String,
    TimeColumn: S.String,
    DimensionMappings: DimensionMappingList,
    MultiMeasureMappings: S.optional(MultiMeasureMappings),
    MixedMeasureMappings: S.optional(MixedMeasureMappingList),
    MeasureNameColumn: S.optional(S.String),
  }),
).annotate({
  identifier: "TimestreamConfiguration",
}) as any as S.Schema<TimestreamConfiguration>;
export interface TargetConfiguration {
  TimestreamConfiguration: TimestreamConfiguration;
}
export const TargetConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TimestreamConfiguration: TimestreamConfiguration }),
).annotate({
  identifier: "TargetConfiguration",
}) as any as S.Schema<TargetConfiguration>;
export type ClientToken = string | redacted.Redacted<string>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type StringValue2048 = string;
export type S3BucketName = string;
export type S3ObjectKeyPrefix = string;
export type S3EncryptionOption = "SSE_S3" | "SSE_KMS" | (string & {});
export const S3EncryptionOption = S.String;

export interface S3Configuration {
  BucketName: string;
  ObjectKeyPrefix?: string;
  EncryptionOption?: S3EncryptionOption;
}
export const S3Configuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketName: S.String,
    ObjectKeyPrefix: S.optional(S.String),
    EncryptionOption: S.optional(S3EncryptionOption),
  }),
).annotate({
  identifier: "S3Configuration",
}) as any as S.Schema<S3Configuration>;
export interface ErrorReportConfiguration {
  S3Configuration: S3Configuration;
}
export const ErrorReportConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Configuration: S3Configuration }),
).annotate({
  identifier: "ErrorReportConfiguration",
}) as any as S.Schema<ErrorReportConfiguration>;
export interface CreateScheduledQueryRequest {
  Name: string;
  QueryString: string | redacted.Redacted<string>;
  ScheduleConfiguration: ScheduleConfiguration;
  NotificationConfiguration: NotificationConfiguration;
  TargetConfiguration?: TargetConfiguration;
  ClientToken?: string | redacted.Redacted<string>;
  ScheduledQueryExecutionRoleArn: string;
  Tags?: Tag[];
  KmsKeyId?: string;
  ErrorReportConfiguration: ErrorReportConfiguration;
}
export const CreateScheduledQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    QueryString: SensitiveString,
    ScheduleConfiguration: ScheduleConfiguration,
    NotificationConfiguration: NotificationConfiguration,
    TargetConfiguration: S.optional(TargetConfiguration),
    ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    ScheduledQueryExecutionRoleArn: S.String,
    Tags: S.optional(TagList),
    KmsKeyId: S.optional(S.String),
    ErrorReportConfiguration: ErrorReportConfiguration,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateScheduledQueryRequest",
}) as any as S.Schema<CreateScheduledQueryRequest>;
export interface CreateScheduledQueryResponse {
  Arn: string;
}
export const CreateScheduledQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String }),
).annotate({
  identifier: "CreateScheduledQueryResponse",
}) as any as S.Schema<CreateScheduledQueryResponse>;
export interface DeleteScheduledQueryRequest {
  ScheduledQueryArn: string;
}
export const DeleteScheduledQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduledQueryArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteScheduledQueryRequest",
}) as any as S.Schema<DeleteScheduledQueryRequest>;
export interface DeleteScheduledQueryResponse {}
export const DeleteScheduledQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteScheduledQueryResponse",
}) as any as S.Schema<DeleteScheduledQueryResponse>;
export interface DescribeAccountSettingsRequest {}
export const DescribeAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAccountSettingsRequest",
}) as any as S.Schema<DescribeAccountSettingsRequest>;
export type MaxQueryCapacity = number;
export type QueryPricingModel =
  | "BYTES_SCANNED"
  | "COMPUTE_UNITS"
  | (string & {});
export const QueryPricingModel = S.String;

export type ComputeMode = "ON_DEMAND" | "PROVISIONED" | (string & {});
export const ComputeMode = S.String;

export type QueryTCU = number;
export interface AccountSettingsNotificationConfiguration {
  SnsConfiguration?: SnsConfiguration;
  RoleArn: string;
}
export const AccountSettingsNotificationConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SnsConfiguration: S.optional(SnsConfiguration),
      RoleArn: S.String,
    }),
).annotate({
  identifier: "AccountSettingsNotificationConfiguration",
}) as any as S.Schema<AccountSettingsNotificationConfiguration>;
export type LastUpdateStatus =
  | "PENDING"
  | "FAILED"
  | "SUCCEEDED"
  | (string & {});
export const LastUpdateStatus = S.String;

export interface LastUpdate {
  TargetQueryTCU?: number;
  Status?: LastUpdateStatus;
  StatusMessage?: string;
}
export const LastUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetQueryTCU: S.optional(S.Number),
    Status: S.optional(LastUpdateStatus),
    StatusMessage: S.optional(S.String),
  }),
).annotate({ identifier: "LastUpdate" }) as any as S.Schema<LastUpdate>;
export interface ProvisionedCapacityResponse {
  ActiveQueryTCU?: number;
  NotificationConfiguration?: AccountSettingsNotificationConfiguration;
  LastUpdate?: LastUpdate;
}
export const ProvisionedCapacityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActiveQueryTCU: S.optional(S.Number),
    NotificationConfiguration: S.optional(
      AccountSettingsNotificationConfiguration,
    ),
    LastUpdate: S.optional(LastUpdate),
  }),
).annotate({
  identifier: "ProvisionedCapacityResponse",
}) as any as S.Schema<ProvisionedCapacityResponse>;
export interface QueryComputeResponse {
  ComputeMode?: ComputeMode;
  ProvisionedCapacity?: ProvisionedCapacityResponse;
}
export const QueryComputeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComputeMode: S.optional(ComputeMode),
    ProvisionedCapacity: S.optional(ProvisionedCapacityResponse),
  }),
).annotate({
  identifier: "QueryComputeResponse",
}) as any as S.Schema<QueryComputeResponse>;
export interface DescribeAccountSettingsResponse {
  MaxQueryTCU?: number;
  QueryPricingModel?: QueryPricingModel;
  QueryCompute?: QueryComputeResponse;
}
export const DescribeAccountSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxQueryTCU: S.optional(S.Number),
    QueryPricingModel: S.optional(QueryPricingModel),
    QueryCompute: S.optional(QueryComputeResponse),
  }),
).annotate({
  identifier: "DescribeAccountSettingsResponse",
}) as any as S.Schema<DescribeAccountSettingsResponse>;
export interface DescribeEndpointsRequest {}
export const DescribeEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeEndpointsRequest",
}) as any as S.Schema<DescribeEndpointsRequest>;
export interface Endpoint {
  Address: string;
  CachePeriodInMinutes: number;
}
export const Endpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Address: S.String, CachePeriodInMinutes: S.Number }),
).annotate({ identifier: "Endpoint" }) as any as S.Schema<Endpoint>;
export type Endpoints = Endpoint[];
export const Endpoints = /*@__PURE__*/ S.Array(Endpoint);
export interface DescribeEndpointsResponse {
  Endpoints: Endpoint[];
}
export const DescribeEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Endpoints: Endpoints }),
).annotate({
  identifier: "DescribeEndpointsResponse",
}) as any as S.Schema<DescribeEndpointsResponse>;
export interface DescribeScheduledQueryRequest {
  ScheduledQueryArn: string;
}
export const DescribeScheduledQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduledQueryArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeScheduledQueryRequest",
}) as any as S.Schema<DescribeScheduledQueryRequest>;
export type ScheduledQueryState = "ENABLED" | "DISABLED" | (string & {});
export const ScheduledQueryState = S.String;

export type ScheduledQueryRunStatus =
  | "AUTO_TRIGGER_SUCCESS"
  | "AUTO_TRIGGER_FAILURE"
  | "MANUAL_TRIGGER_SUCCESS"
  | "MANUAL_TRIGGER_FAILURE"
  | (string & {});
export const ScheduledQueryRunStatus = S.String;

export interface ExecutionStats {
  ExecutionTimeInMillis?: number;
  DataWrites?: number;
  BytesMetered?: number;
  CumulativeBytesScanned?: number;
  RecordsIngested?: number;
  QueryResultRows?: number;
}
export const ExecutionStats = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExecutionTimeInMillis: S.optional(S.Number),
    DataWrites: S.optional(S.Number),
    BytesMetered: S.optional(S.Number),
    CumulativeBytesScanned: S.optional(S.Number),
    RecordsIngested: S.optional(S.Number),
    QueryResultRows: S.optional(S.Number),
  }),
).annotate({ identifier: "ExecutionStats" }) as any as S.Schema<ExecutionStats>;
export type PartitionKey = string;
export type PartitionKeyList = string[];
export const PartitionKeyList = /*@__PURE__*/ S.Array(S.String);
export interface QuerySpatialCoverageMax {
  Value?: number;
  TableArn?: string;
  PartitionKey?: string[];
}
export const QuerySpatialCoverageMax = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(S.Number),
    TableArn: S.optional(S.String),
    PartitionKey: S.optional(PartitionKeyList),
  }),
).annotate({
  identifier: "QuerySpatialCoverageMax",
}) as any as S.Schema<QuerySpatialCoverageMax>;
export interface QuerySpatialCoverage {
  Max?: QuerySpatialCoverageMax;
}
export const QuerySpatialCoverage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Max: S.optional(QuerySpatialCoverageMax) }),
).annotate({
  identifier: "QuerySpatialCoverage",
}) as any as S.Schema<QuerySpatialCoverage>;
export interface QueryTemporalRangeMax {
  Value?: number;
  TableArn?: string;
}
export const QueryTemporalRangeMax = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.Number), TableArn: S.optional(S.String) }),
).annotate({
  identifier: "QueryTemporalRangeMax",
}) as any as S.Schema<QueryTemporalRangeMax>;
export interface QueryTemporalRange {
  Max?: QueryTemporalRangeMax;
}
export const QueryTemporalRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Max: S.optional(QueryTemporalRangeMax) }),
).annotate({
  identifier: "QueryTemporalRange",
}) as any as S.Schema<QueryTemporalRange>;
export interface ScheduledQueryInsightsResponse {
  QuerySpatialCoverage?: QuerySpatialCoverage;
  QueryTemporalRange?: QueryTemporalRange;
  QueryTableCount?: number;
  OutputRows?: number;
  OutputBytes?: number;
}
export const ScheduledQueryInsightsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuerySpatialCoverage: S.optional(QuerySpatialCoverage),
    QueryTemporalRange: S.optional(QueryTemporalRange),
    QueryTableCount: S.optional(S.Number),
    OutputRows: S.optional(S.Number),
    OutputBytes: S.optional(S.Number),
  }),
).annotate({
  identifier: "ScheduledQueryInsightsResponse",
}) as any as S.Schema<ScheduledQueryInsightsResponse>;
export type S3ObjectKey = string;
export interface S3ReportLocation {
  BucketName?: string;
  ObjectKey?: string;
}
export const S3ReportLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BucketName: S.optional(S.String),
    ObjectKey: S.optional(S.String),
  }),
).annotate({
  identifier: "S3ReportLocation",
}) as any as S.Schema<S3ReportLocation>;
export interface ErrorReportLocation {
  S3ReportLocation?: S3ReportLocation;
}
export const ErrorReportLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3ReportLocation: S.optional(S3ReportLocation) }),
).annotate({
  identifier: "ErrorReportLocation",
}) as any as S.Schema<ErrorReportLocation>;
export type ErrorMessage = string;
export interface ScheduledQueryRunSummary {
  InvocationTime?: Date;
  TriggerTime?: Date;
  RunStatus?: ScheduledQueryRunStatus;
  ExecutionStats?: ExecutionStats;
  QueryInsightsResponse?: ScheduledQueryInsightsResponse;
  ErrorReportLocation?: ErrorReportLocation;
  FailureReason?: string;
}
export const ScheduledQueryRunSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InvocationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TriggerTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RunStatus: S.optional(ScheduledQueryRunStatus),
    ExecutionStats: S.optional(ExecutionStats),
    QueryInsightsResponse: S.optional(ScheduledQueryInsightsResponse),
    ErrorReportLocation: S.optional(ErrorReportLocation),
    FailureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ScheduledQueryRunSummary",
}) as any as S.Schema<ScheduledQueryRunSummary>;
export type ScheduledQueryRunSummaryList = ScheduledQueryRunSummary[];
export const ScheduledQueryRunSummaryList = /*@__PURE__*/ S.Array(
  ScheduledQueryRunSummary,
);
export interface ScheduledQueryDescription {
  Arn: string;
  Name: string;
  QueryString: string | redacted.Redacted<string>;
  CreationTime?: Date;
  State: ScheduledQueryState;
  PreviousInvocationTime?: Date;
  NextInvocationTime?: Date;
  ScheduleConfiguration: ScheduleConfiguration;
  NotificationConfiguration: NotificationConfiguration;
  TargetConfiguration?: TargetConfiguration;
  ScheduledQueryExecutionRoleArn?: string;
  KmsKeyId?: string;
  ErrorReportConfiguration?: ErrorReportConfiguration;
  LastRunSummary?: ScheduledQueryRunSummary;
  RecentlyFailedRuns?: ScheduledQueryRunSummary[];
}
export const ScheduledQueryDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    QueryString: SensitiveString,
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    State: ScheduledQueryState,
    PreviousInvocationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    NextInvocationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ScheduleConfiguration: ScheduleConfiguration,
    NotificationConfiguration: NotificationConfiguration,
    TargetConfiguration: S.optional(TargetConfiguration),
    ScheduledQueryExecutionRoleArn: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    ErrorReportConfiguration: S.optional(ErrorReportConfiguration),
    LastRunSummary: S.optional(ScheduledQueryRunSummary),
    RecentlyFailedRuns: S.optional(ScheduledQueryRunSummaryList),
  }),
).annotate({
  identifier: "ScheduledQueryDescription",
}) as any as S.Schema<ScheduledQueryDescription>;
export interface DescribeScheduledQueryResponse {
  ScheduledQuery: ScheduledQueryDescription;
}
export const DescribeScheduledQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduledQuery: ScheduledQueryDescription }),
).annotate({
  identifier: "DescribeScheduledQueryResponse",
}) as any as S.Schema<DescribeScheduledQueryResponse>;
export type ScheduledQueryInsightsMode =
  | "ENABLED_WITH_RATE_CONTROL"
  | "DISABLED"
  | (string & {});
export const ScheduledQueryInsightsMode = S.String;

export interface ScheduledQueryInsights {
  Mode: ScheduledQueryInsightsMode;
}
export const ScheduledQueryInsights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Mode: ScheduledQueryInsightsMode }),
).annotate({
  identifier: "ScheduledQueryInsights",
}) as any as S.Schema<ScheduledQueryInsights>;
export interface ExecuteScheduledQueryRequest {
  ScheduledQueryArn: string;
  InvocationTime: Date;
  ClientToken?: string | redacted.Redacted<string>;
  QueryInsights?: ScheduledQueryInsights;
}
export const ExecuteScheduledQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledQueryArn: S.String,
    InvocationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    QueryInsights: S.optional(ScheduledQueryInsights),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ExecuteScheduledQueryRequest",
}) as any as S.Schema<ExecuteScheduledQueryRequest>;
export interface ExecuteScheduledQueryResponse {}
export const ExecuteScheduledQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ExecuteScheduledQueryResponse",
}) as any as S.Schema<ExecuteScheduledQueryResponse>;
export type MaxScheduledQueriesResults = number;
export type NextScheduledQueriesResultsToken = string;
export interface ListScheduledQueriesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListScheduledQueriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListScheduledQueriesRequest",
}) as any as S.Schema<ListScheduledQueriesRequest>;
export interface TimestreamDestination {
  DatabaseName?: string;
  TableName?: string;
}
export const TimestreamDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatabaseName: S.optional(S.String),
    TableName: S.optional(S.String),
  }),
).annotate({
  identifier: "TimestreamDestination",
}) as any as S.Schema<TimestreamDestination>;
export interface TargetDestination {
  TimestreamDestination?: TimestreamDestination;
}
export const TargetDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TimestreamDestination: S.optional(TimestreamDestination) }),
).annotate({
  identifier: "TargetDestination",
}) as any as S.Schema<TargetDestination>;
export interface ScheduledQuery {
  Arn: string;
  Name: string;
  CreationTime?: Date;
  State: ScheduledQueryState;
  PreviousInvocationTime?: Date;
  NextInvocationTime?: Date;
  ErrorReportConfiguration?: ErrorReportConfiguration;
  TargetDestination?: TargetDestination;
  LastRunStatus?: ScheduledQueryRunStatus;
}
export const ScheduledQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    State: ScheduledQueryState,
    PreviousInvocationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    NextInvocationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ErrorReportConfiguration: S.optional(ErrorReportConfiguration),
    TargetDestination: S.optional(TargetDestination),
    LastRunStatus: S.optional(ScheduledQueryRunStatus),
  }),
).annotate({ identifier: "ScheduledQuery" }) as any as S.Schema<ScheduledQuery>;
export type ScheduledQueryList = ScheduledQuery[];
export const ScheduledQueryList = /*@__PURE__*/ S.Array(ScheduledQuery);
export interface ListScheduledQueriesResponse {
  ScheduledQueries: ScheduledQuery[];
  NextToken?: string;
}
export const ListScheduledQueriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledQueries: ScheduledQueryList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListScheduledQueriesResponse",
}) as any as S.Schema<ListScheduledQueriesResponse>;
export type MaxTagsForResourceResult = number;
export type NextTagsForResourceResultsToken = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags: Tag[];
  NextToken?: string;
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: TagList, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PrepareQueryRequest {
  QueryString: string | redacted.Redacted<string>;
  ValidateOnly?: boolean;
}
export const PrepareQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryString: SensitiveString,
    ValidateOnly: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PrepareQueryRequest",
}) as any as S.Schema<PrepareQueryRequest>;
export type ScalarType =
  | "VARCHAR"
  | "BOOLEAN"
  | "BIGINT"
  | "DOUBLE"
  | "TIMESTAMP"
  | "DATE"
  | "TIME"
  | "INTERVAL_DAY_TO_SECOND"
  | "INTERVAL_YEAR_TO_MONTH"
  | "UNKNOWN"
  | "INTEGER"
  | (string & {});
export const ScalarType = S.String;

export interface ColumnInfo {
  Name?: string;
  Type: Type;
}
export const ColumnInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.suspend((): S.Schema<Type> => Type).annotate({
      identifier: "Type",
    }),
  }),
).annotate({ identifier: "ColumnInfo" }) as any as S.Schema<ColumnInfo>;
export type ColumnInfoList = ColumnInfo[];
export const ColumnInfoList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<ColumnInfo> => ColumnInfo).annotate({
    identifier: "ColumnInfo",
  }),
) as any as S.Schema<ColumnInfoList>;
export interface Type {
  ScalarType?: ScalarType;
  ArrayColumnInfo?: ColumnInfo;
  TimeSeriesMeasureValueColumnInfo?: ColumnInfo;
  RowColumnInfo?: ColumnInfo[];
}
export const Type = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalarType: S.optional(ScalarType),
    ArrayColumnInfo: S.optional(
      S.suspend((): S.Schema<ColumnInfo> => ColumnInfo).annotate({
        identifier: "ColumnInfo",
      }),
    ),
    TimeSeriesMeasureValueColumnInfo: S.optional(
      S.suspend((): S.Schema<ColumnInfo> => ColumnInfo).annotate({
        identifier: "ColumnInfo",
      }),
    ),
    RowColumnInfo: S.optional(
      S.suspend(() => ColumnInfoList).annotate({
        identifier: "ColumnInfoList",
      }),
    ),
  }),
).annotate({ identifier: "Type" }) as any as S.Schema<Type>;
export interface SelectColumn {
  Name?: string;
  Type?: Type;
  DatabaseName?: string;
  TableName?: string;
  Aliased?: boolean;
}
export const SelectColumn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Type: S.optional(Type),
    DatabaseName: S.optional(S.String),
    TableName: S.optional(S.String),
    Aliased: S.optional(S.Boolean),
  }),
).annotate({ identifier: "SelectColumn" }) as any as S.Schema<SelectColumn>;
export type SelectColumnList = SelectColumn[];
export const SelectColumnList = /*@__PURE__*/ S.Array(SelectColumn);
export interface ParameterMapping {
  Name: string;
  Type: Type;
}
export const ParameterMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Type: Type }),
).annotate({
  identifier: "ParameterMapping",
}) as any as S.Schema<ParameterMapping>;
export type ParameterMappingList = ParameterMapping[];
export const ParameterMappingList = /*@__PURE__*/ S.Array(ParameterMapping);
export interface PrepareQueryResponse {
  QueryString: string | redacted.Redacted<string>;
  Columns: SelectColumn[];
  Parameters: ParameterMapping[];
}
export const PrepareQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryString: SensitiveString,
    Columns: SelectColumnList,
    Parameters: ParameterMappingList,
  }),
).annotate({
  identifier: "PrepareQueryResponse",
}) as any as S.Schema<PrepareQueryResponse>;
export type ClientRequestToken = string | redacted.Redacted<string>;
export type PaginationToken = string;
export type MaxQueryResults = number;
export type QueryInsightsMode =
  | "ENABLED_WITH_RATE_CONTROL"
  | "DISABLED"
  | (string & {});
export const QueryInsightsMode = S.String;

export interface QueryInsights {
  Mode: QueryInsightsMode;
}
export const QueryInsights = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Mode: QueryInsightsMode }),
).annotate({ identifier: "QueryInsights" }) as any as S.Schema<QueryInsights>;
export interface QueryRequest {
  QueryString: string | redacted.Redacted<string>;
  ClientToken?: string | redacted.Redacted<string>;
  NextToken?: string;
  MaxRows?: number;
  QueryInsights?: QueryInsights;
}
export const QueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryString: SensitiveString,
    ClientToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    NextToken: S.optional(S.String),
    MaxRows: S.optional(S.Number),
    QueryInsights: S.optional(QueryInsights),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "QueryRequest" }) as any as S.Schema<QueryRequest>;
export type ScalarValue = string;
export interface TimeSeriesDataPoint {
  Time: string;
  Value: Datum;
}
export const TimeSeriesDataPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Time: S.String,
    Value: S.suspend((): S.Schema<Datum> => Datum).annotate({
      identifier: "Datum",
    }),
  }),
).annotate({
  identifier: "TimeSeriesDataPoint",
}) as any as S.Schema<TimeSeriesDataPoint>;
export type TimeSeriesDataPointList = TimeSeriesDataPoint[];
export const TimeSeriesDataPointList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<TimeSeriesDataPoint> => TimeSeriesDataPoint).annotate({
    identifier: "TimeSeriesDataPoint",
  }),
) as any as S.Schema<TimeSeriesDataPointList>;
export interface Datum {
  ScalarValue?: string;
  TimeSeriesValue?: TimeSeriesDataPoint[];
  ArrayValue?: Datum[];
  RowValue?: Row;
  NullValue?: boolean;
}
export const Datum = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScalarValue: S.optional(S.String),
    TimeSeriesValue: S.optional(
      S.suspend(() => TimeSeriesDataPointList).annotate({
        identifier: "TimeSeriesDataPointList",
      }),
    ),
    ArrayValue: S.optional(
      S.suspend(() => DatumList).annotate({ identifier: "DatumList" }),
    ),
    RowValue: S.optional(
      S.suspend((): S.Schema<Row> => Row).annotate({ identifier: "Row" }),
    ),
    NullValue: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Datum" }) as any as S.Schema<Datum>;
export type DatumList = Datum[];
export const DatumList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Datum> => Datum).annotate({ identifier: "Datum" }),
) as any as S.Schema<DatumList>;
export interface Row {
  Data: Datum[];
}
export const Row = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Data: S.suspend(() => DatumList).annotate({ identifier: "DatumList" }),
  }),
).annotate({ identifier: "Row" }) as any as S.Schema<Row>;
export type RowList = Row[];
export const RowList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Row> => Row).annotate({ identifier: "Row" }),
);
export interface QueryStatus {
  ProgressPercentage?: number;
  CumulativeBytesScanned?: number;
  CumulativeBytesMetered?: number;
}
export const QueryStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProgressPercentage: S.optional(S.Number),
    CumulativeBytesScanned: S.optional(S.Number),
    CumulativeBytesMetered: S.optional(S.Number),
  }),
).annotate({ identifier: "QueryStatus" }) as any as S.Schema<QueryStatus>;
export interface QueryInsightsResponse {
  QuerySpatialCoverage?: QuerySpatialCoverage;
  QueryTemporalRange?: QueryTemporalRange;
  QueryTableCount?: number;
  OutputRows?: number;
  OutputBytes?: number;
  UnloadPartitionCount?: number;
  UnloadWrittenRows?: number;
  UnloadWrittenBytes?: number;
}
export const QueryInsightsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QuerySpatialCoverage: S.optional(QuerySpatialCoverage),
    QueryTemporalRange: S.optional(QueryTemporalRange),
    QueryTableCount: S.optional(S.Number),
    OutputRows: S.optional(S.Number),
    OutputBytes: S.optional(S.Number),
    UnloadPartitionCount: S.optional(S.Number),
    UnloadWrittenRows: S.optional(S.Number),
    UnloadWrittenBytes: S.optional(S.Number),
  }),
).annotate({
  identifier: "QueryInsightsResponse",
}) as any as S.Schema<QueryInsightsResponse>;
export interface QueryResponse {
  QueryId: string;
  NextToken?: string;
  Rows: Row[];
  ColumnInfo: ColumnInfo[];
  QueryStatus?: QueryStatus;
  QueryInsightsResponse?: QueryInsightsResponse;
}
export const QueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryId: S.String,
    NextToken: S.optional(S.String),
    Rows: RowList,
    ColumnInfo: ColumnInfoList,
    QueryStatus: S.optional(QueryStatus),
    QueryInsightsResponse: S.optional(QueryInsightsResponse),
  }),
).annotate({ identifier: "QueryResponse" }) as any as S.Schema<QueryResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
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
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
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
export interface ProvisionedCapacityRequest {
  TargetQueryTCU: number;
  NotificationConfiguration?: AccountSettingsNotificationConfiguration;
}
export const ProvisionedCapacityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TargetQueryTCU: S.Number,
    NotificationConfiguration: S.optional(
      AccountSettingsNotificationConfiguration,
    ),
  }),
).annotate({
  identifier: "ProvisionedCapacityRequest",
}) as any as S.Schema<ProvisionedCapacityRequest>;
export interface QueryComputeRequest {
  ComputeMode?: ComputeMode;
  ProvisionedCapacity?: ProvisionedCapacityRequest;
}
export const QueryComputeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComputeMode: S.optional(ComputeMode),
    ProvisionedCapacity: S.optional(ProvisionedCapacityRequest),
  }),
).annotate({
  identifier: "QueryComputeRequest",
}) as any as S.Schema<QueryComputeRequest>;
export interface UpdateAccountSettingsRequest {
  MaxQueryTCU?: number;
  QueryPricingModel?: QueryPricingModel;
  QueryCompute?: QueryComputeRequest;
}
export const UpdateAccountSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxQueryTCU: S.optional(S.Number),
    QueryPricingModel: S.optional(QueryPricingModel),
    QueryCompute: S.optional(QueryComputeRequest),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAccountSettingsRequest",
}) as any as S.Schema<UpdateAccountSettingsRequest>;
export interface UpdateAccountSettingsResponse {
  MaxQueryTCU?: number;
  QueryPricingModel?: QueryPricingModel;
  QueryCompute?: QueryComputeResponse;
}
export const UpdateAccountSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxQueryTCU: S.optional(S.Number),
    QueryPricingModel: S.optional(QueryPricingModel),
    QueryCompute: S.optional(QueryComputeResponse),
  }),
).annotate({
  identifier: "UpdateAccountSettingsResponse",
}) as any as S.Schema<UpdateAccountSettingsResponse>;
export interface UpdateScheduledQueryRequest {
  ScheduledQueryArn: string;
  State: ScheduledQueryState;
}
export const UpdateScheduledQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduledQueryArn: S.String, State: ScheduledQueryState }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateScheduledQueryRequest",
}) as any as S.Schema<UpdateScheduledQueryRequest>;
export interface UpdateScheduledQueryResponse {}
export const UpdateScheduledQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateScheduledQueryResponse",
}) as any as S.Schema<UpdateScheduledQueryResponse>;
export type ServiceErrorMessage = string;
export type CancelQueryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a query that has been issued. Cancellation is provided only if the query has
 * not completed running before the cancellation request was issued. Because cancellation
 * is an idempotent operation, subsequent cancellation requests will return a
 * `CancellationMessage`, indicating that the query has already been
 * canceled. See code
 * sample for details.
 */
export const cancelQuery: API.OperationMethod<
  CancelQueryRequest,
  CancelQueryResponse,
  CancelQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelQueryRequest,
  output: CancelQueryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelQuery",
}));

export type CreateScheduledQueryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidEndpointException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a scheduled query that will be run on your behalf at the configured schedule.
 * Timestream assumes the execution role provided as part of the
 * `ScheduledQueryExecutionRoleArn` parameter to run the query. You can use
 * the `NotificationConfiguration` parameter to configure notification for your
 * scheduled query operations.
 */
export const createScheduledQuery: API.OperationMethod<
  CreateScheduledQueryRequest,
  CreateScheduledQueryResponse,
  CreateScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateScheduledQueryRequest,
  output: CreateScheduledQueryResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidEndpointException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduledQuery",
}));

export type DeleteScheduledQueryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a given scheduled query. This is an irreversible operation.
 */
export const deleteScheduledQuery: API.OperationMethod<
  DeleteScheduledQueryRequest,
  DeleteScheduledQueryResponse,
  DeleteScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteScheduledQueryRequest,
  output: DeleteScheduledQueryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduledQuery",
}));

export type DescribeAccountSettingsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the settings for your account that include the query pricing model and the configured maximum TCUs the service can use for your query workload.
 *
 * You're charged only for the duration of compute units used for your workloads.
 */
export const describeAccountSettings: API.OperationMethod<
  DescribeAccountSettingsRequest,
  DescribeAccountSettingsResponse,
  DescribeAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAccountSettingsRequest,
  output: DescribeAccountSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountSettings",
}));

export type DescribeEndpointsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | TimestreamNotOnboarded
  | CommonErrors;
/**
 * DescribeEndpoints returns a list of available endpoints to make Timestream
 * API calls against. This API is available through both Write and Query.
 *
 * Because the Timestream SDKs are designed to transparently work with the
 * service’s architecture, including the management and mapping of the service endpoints,
 * *it is not recommended that you use this API unless*:
 *
 * - You are using VPC endpoints (Amazon Web Services PrivateLink) with Timestream
 *
 * - Your application uses a programming language that does not yet have SDK
 * support
 *
 * - You require better control over the client-side implementation
 *
 * For detailed information on how and when to use and implement DescribeEndpoints, see
 * The Endpoint Discovery Pattern.
 */
export const describeEndpoints: API.OperationMethod<
  DescribeEndpointsRequest,
  DescribeEndpointsResponse,
  DescribeEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEndpointsRequest,
  output: DescribeEndpointsResponse,
  errors: [
    InternalServerException,
    ThrottlingException,
    ValidationException,
    TimestreamNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoints",
}));

export type DescribeScheduledQueryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides detailed information about a scheduled query.
 */
export const describeScheduledQuery: API.OperationMethod<
  DescribeScheduledQueryRequest,
  DescribeScheduledQueryResponse,
  DescribeScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeScheduledQueryRequest,
  output: DescribeScheduledQueryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScheduledQuery",
}));

export type ExecuteScheduledQueryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * You can use this API to run a scheduled query manually.
 *
 * If you enabled `QueryInsights`, this API also returns insights and metrics related to the query that you executed as part of an Amazon SNS notification. `QueryInsights` helps with performance tuning of your query. For more information about `QueryInsights`, see Using query insights to optimize queries in Amazon Timestream.
 */
export const executeScheduledQuery: API.OperationMethod<
  ExecuteScheduledQueryRequest,
  ExecuteScheduledQueryResponse,
  ExecuteScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteScheduledQueryRequest,
  output: ExecuteScheduledQueryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteScheduledQuery",
}));

export type ListScheduledQueriesError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of all scheduled queries in the caller's Amazon account and Region.
 * `ListScheduledQueries` is eventually consistent.
 */
export const listScheduledQueries: API.PaginatedOperationMethod<
  ListScheduledQueriesRequest,
  ListScheduledQueriesResponse,
  ListScheduledQueriesError,
  Credentials | HttpClient.HttpClient,
  ScheduledQuery
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListScheduledQueriesRequest,
  output: ListScheduledQueriesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScheduledQueries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScheduledQueries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all tags on a Timestream query resource.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
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

export type PrepareQueryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * A synchronous operation that allows you to submit a query with parameters to be stored
 * by Timestream for later running. Timestream only supports using this operation with
 * `ValidateOnly` set to `true`.
 */
export const prepareQuery: API.OperationMethod<
  PrepareQueryRequest,
  PrepareQueryResponse,
  PrepareQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PrepareQueryRequest,
  output: PrepareQueryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PrepareQuery",
}));

export type QueryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidEndpointException
  | QueryExecutionException
  | ThrottlingException
  | ValidationException
  | TimestreamNotOnboarded
  | CommonErrors;
/**
 * `Query` is a synchronous operation that enables you to run a query against
 * your Amazon Timestream data.
 *
 * If you enabled `QueryInsights`, this API also returns insights and metrics related to the query that you executed. `QueryInsights` helps with performance tuning of your query. For more information about `QueryInsights`, see Using query insights to optimize queries in Amazon Timestream.
 *
 * The maximum number of `Query` API requests you're allowed to make with `QueryInsights` enabled is 1 query per second (QPS). If you exceed this query rate, it might result in throttling.
 *
 * `Query` will time out after 60 seconds.
 * You must update the default timeout in the SDK to support a timeout of 60 seconds. See
 * the code
 * sample for details.
 *
 * Your query request will fail in the following cases:
 *
 * - If you submit a `Query` request with the same client token outside
 * of the 5-minute idempotency window.
 *
 * - If you submit a `Query` request with the same client token, but
 * change other parameters, within the 5-minute idempotency window.
 *
 * - If the size of the row (including the query metadata) exceeds 1 MB, then the
 * query will fail with the following error message:
 *
 * Query aborted as max page response size has been exceeded by the output
 * result row
 *
 * - If the IAM principal of the query initiator and the result reader are not the
 * same and/or the query initiator and the result reader do not have the same query
 * string in the query requests, the query will fail with an Invalid
 * pagination token error.
 */
export const query: API.PaginatedOperationMethod<
  QueryRequest,
  QueryResponse,
  QueryError,
  Credentials | HttpClient.HttpClient,
  Row
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: QueryRequest,
  output: QueryResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidEndpointException,
    QueryExecutionException,
    ThrottlingException,
    ValidationException,
    TimestreamNotOnboarded,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Query",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rows",
    pageSize: "MaxRows",
  } as const,
})) as any;

export type TagResourceError =
  | InvalidEndpointException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate a set of tags with a Timestream resource. You can then activate these
 * user-defined tags so that they appear on the Billing and Cost Management console for
 * cost allocation tracking.
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
    InvalidEndpointException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association of tags from a Timestream query resource.
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
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccountSettingsError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Transitions your account to use TCUs for query pricing and modifies the maximum query compute units that you've configured. If you reduce the value of `MaxQueryTCU` to a desired configuration, the new value can take up to 24 hours to be effective.
 *
 * After you've transitioned your account to use TCUs for query pricing, you can't transition to using bytes scanned for query pricing.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsRequest,
  UpdateAccountSettingsResponse,
  UpdateAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountSettingsRequest,
  output: UpdateAccountSettingsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
}));

export type UpdateScheduledQueryError =
  | AccessDeniedException
  | InternalServerException
  | InvalidEndpointException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a scheduled query.
 */
export const updateScheduledQuery: API.OperationMethod<
  UpdateScheduledQueryRequest,
  UpdateScheduledQueryResponse,
  UpdateScheduledQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateScheduledQueryRequest,
  output: UpdateScheduledQueryResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidEndpointException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScheduledQuery",
}));
