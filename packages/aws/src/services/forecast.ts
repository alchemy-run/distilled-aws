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
  sdkId: "forecast",
  serviceShapeName: "AmazonForecast",
});
const auth = T.AwsAuthSigv4({ name: "forecast" });
const ver = T.ServiceVersion("2018-06-26");
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
              `https://forecast-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://forecast-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://forecast.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://forecast.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError, C.withAlreadyExistsError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type Name = string;
export type ForecastType = string;
export type ForecastTypes = string[];
export const ForecastTypes = /*@__PURE__*/ S.Array(S.String);
export type ForecastDimensions = string[];
export const ForecastDimensions = /*@__PURE__*/ S.Array(S.String);
export type Frequency = string;
export type Arn = string;
export type Value = string;
export type Transformations = { [key: string]: string | undefined };
export const Transformations = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface AttributeConfig {
  AttributeName: string;
  Transformations: { [key: string]: string | undefined };
}
export const AttributeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttributeName: S.String, Transformations: Transformations }),
).annotate({
  identifier: "AttributeConfig",
}) as any as S.Schema<AttributeConfig>;
export type AttributeConfigs = AttributeConfig[];
export const AttributeConfigs = /*@__PURE__*/ S.Array(AttributeConfig);
export type Values = string[];
export const Values = /*@__PURE__*/ S.Array(S.String);
export type Configuration = { [key: string]: string[] | undefined };
export const Configuration = /*@__PURE__*/ S.Record(
  S.String,
  Values.pipe(S.optional),
);
export interface AdditionalDataset {
  Name: string;
  Configuration?: { [key: string]: string[] | undefined };
}
export const AdditionalDataset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Configuration: S.optional(Configuration) }),
).annotate({
  identifier: "AdditionalDataset",
}) as any as S.Schema<AdditionalDataset>;
export type AdditionalDatasets = AdditionalDataset[];
export const AdditionalDatasets = /*@__PURE__*/ S.Array(AdditionalDataset);
export interface DataConfig {
  DatasetGroupArn: string;
  AttributeConfigs?: AttributeConfig[];
  AdditionalDatasets?: AdditionalDataset[];
}
export const DataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetGroupArn: S.String,
    AttributeConfigs: S.optional(AttributeConfigs),
    AdditionalDatasets: S.optional(AdditionalDatasets),
  }),
).annotate({ identifier: "DataConfig" }) as any as S.Schema<DataConfig>;
export type KMSKeyArn = string;
export interface EncryptionConfig {
  RoleArn: string;
  KMSKeyArn: string;
}
export const EncryptionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RoleArn: S.String, KMSKeyArn: S.String }),
).annotate({
  identifier: "EncryptionConfig",
}) as any as S.Schema<EncryptionConfig>;
export type OptimizationMetric =
  | "WAPE"
  | "RMSE"
  | "AverageWeightedQuantileLoss"
  | "MASE"
  | "MAPE"
  | (string & {});
export const OptimizationMetric = /*@__PURE__*/ S.String;

export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  Key: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: SensitiveString, Value: SensitiveString }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface MonitorConfig {
  MonitorName: string;
}
export const MonitorConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MonitorName: S.String }),
).annotate({ identifier: "MonitorConfig" }) as any as S.Schema<MonitorConfig>;
export type Month =
  | "JANUARY"
  | "FEBRUARY"
  | "MARCH"
  | "APRIL"
  | "MAY"
  | "JUNE"
  | "JULY"
  | "AUGUST"
  | "SEPTEMBER"
  | "OCTOBER"
  | "NOVEMBER"
  | "DECEMBER"
  | (string & {});
export const Month = /*@__PURE__*/ S.String;

export type DayOfMonth = number;
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export const DayOfWeek = /*@__PURE__*/ S.String;

export type Hour = number;
export interface TimeAlignmentBoundary {
  Month?: Month;
  DayOfMonth?: number;
  DayOfWeek?: DayOfWeek;
  Hour?: number;
}
export const TimeAlignmentBoundary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Month: S.optional(Month),
    DayOfMonth: S.optional(S.Number),
    DayOfWeek: S.optional(DayOfWeek),
    Hour: S.optional(S.Number),
  }),
).annotate({
  identifier: "TimeAlignmentBoundary",
}) as any as S.Schema<TimeAlignmentBoundary>;
export interface CreateAutoPredictorRequest {
  PredictorName: string;
  ForecastHorizon?: number;
  ForecastTypes?: string[];
  ForecastDimensions?: string[];
  ForecastFrequency?: string;
  DataConfig?: DataConfig;
  EncryptionConfig?: EncryptionConfig;
  ReferencePredictorArn?: string;
  OptimizationMetric?: OptimizationMetric;
  ExplainPredictor?: boolean;
  Tags?: Tag[];
  MonitorConfig?: MonitorConfig;
  TimeAlignmentBoundary?: TimeAlignmentBoundary;
}
export const CreateAutoPredictorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PredictorName: S.String,
    ForecastHorizon: S.optional(S.Number),
    ForecastTypes: S.optional(ForecastTypes),
    ForecastDimensions: S.optional(ForecastDimensions),
    ForecastFrequency: S.optional(S.String),
    DataConfig: S.optional(DataConfig),
    EncryptionConfig: S.optional(EncryptionConfig),
    ReferencePredictorArn: S.optional(S.String),
    OptimizationMetric: S.optional(OptimizationMetric),
    ExplainPredictor: S.optional(S.Boolean),
    Tags: S.optional(Tags),
    MonitorConfig: S.optional(MonitorConfig),
    TimeAlignmentBoundary: S.optional(TimeAlignmentBoundary),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAutoPredictorRequest",
}) as any as S.Schema<CreateAutoPredictorRequest>;
export interface CreateAutoPredictorResponse {
  PredictorArn?: string;
}
export const CreateAutoPredictorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PredictorArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateAutoPredictorResponse",
}) as any as S.Schema<CreateAutoPredictorResponse>;
export type Domain =
  | "RETAIL"
  | "CUSTOM"
  | "INVENTORY_PLANNING"
  | "EC2_CAPACITY"
  | "WORK_FORCE"
  | "WEB_TRAFFIC"
  | "METRICS"
  | (string & {});
export const Domain = /*@__PURE__*/ S.String;

export type DatasetType =
  | "TARGET_TIME_SERIES"
  | "RELATED_TIME_SERIES"
  | "ITEM_METADATA"
  | (string & {});
export const DatasetType = /*@__PURE__*/ S.String;

export type AttributeType =
  | "string"
  | "integer"
  | "float"
  | "timestamp"
  | "geolocation"
  | (string & {});
export const AttributeType = /*@__PURE__*/ S.String;

export interface SchemaAttribute {
  AttributeName?: string;
  AttributeType?: AttributeType;
}
export const SchemaAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeName: S.optional(S.String),
    AttributeType: S.optional(AttributeType),
  }),
).annotate({
  identifier: "SchemaAttribute",
}) as any as S.Schema<SchemaAttribute>;
export type SchemaAttributes = SchemaAttribute[];
export const SchemaAttributes = /*@__PURE__*/ S.Array(SchemaAttribute);
export interface Schema {
  Attributes?: SchemaAttribute[];
}
export const Schema = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Attributes: S.optional(SchemaAttributes) }),
).annotate({ identifier: "Schema" }) as any as S.Schema<Schema>;
export interface CreateDatasetRequest {
  DatasetName: string;
  Domain: Domain;
  DatasetType: DatasetType;
  DataFrequency?: string;
  Schema: Schema;
  EncryptionConfig?: EncryptionConfig;
  Tags?: Tag[];
}
export const CreateDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetName: S.String,
    Domain: Domain,
    DatasetType: DatasetType,
    DataFrequency: S.optional(S.String),
    Schema: Schema,
    EncryptionConfig: S.optional(EncryptionConfig),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDatasetRequest",
}) as any as S.Schema<CreateDatasetRequest>;
export interface CreateDatasetResponse {
  DatasetArn?: string;
}
export const CreateDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateDatasetResponse",
}) as any as S.Schema<CreateDatasetResponse>;
export type ArnList = string[];
export const ArnList = /*@__PURE__*/ S.Array(S.String);
export interface CreateDatasetGroupRequest {
  DatasetGroupName: string;
  Domain: Domain;
  DatasetArns?: string[];
  Tags?: Tag[];
}
export const CreateDatasetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetGroupName: S.String,
    Domain: Domain,
    DatasetArns: S.optional(ArnList),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDatasetGroupRequest",
}) as any as S.Schema<CreateDatasetGroupRequest>;
export interface CreateDatasetGroupResponse {
  DatasetGroupArn?: string;
}
export const CreateDatasetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetGroupArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateDatasetGroupResponse",
}) as any as S.Schema<CreateDatasetGroupResponse>;
export type S3Path = string;
export interface S3Config {
  Path: string;
  RoleArn: string;
  KMSKeyArn?: string;
}
export const S3Config = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Path: S.String,
    RoleArn: S.String,
    KMSKeyArn: S.optional(S.String),
  }),
).annotate({ identifier: "S3Config" }) as any as S.Schema<S3Config>;
export interface DataSource {
  S3Config: S3Config;
}
export const DataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Config: S3Config }),
).annotate({ identifier: "DataSource" }) as any as S.Schema<DataSource>;
export type TimestampFormat = string;
export type TimeZone = string;
export type UseGeolocationForTimeZone = boolean;
export type GeolocationFormat = string;
export type Format = string;
export type ImportMode = "FULL" | "INCREMENTAL" | (string & {});
export const ImportMode = /*@__PURE__*/ S.String;

export interface CreateDatasetImportJobRequest {
  DatasetImportJobName: string;
  DatasetArn: string;
  DataSource: DataSource;
  TimestampFormat?: string;
  TimeZone?: string;
  UseGeolocationForTimeZone?: boolean;
  GeolocationFormat?: string;
  Tags?: Tag[];
  Format?: string;
  ImportMode?: ImportMode;
}
export const CreateDatasetImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetImportJobName: S.String,
    DatasetArn: S.String,
    DataSource: DataSource,
    TimestampFormat: S.optional(S.String),
    TimeZone: S.optional(S.String),
    UseGeolocationForTimeZone: S.optional(S.Boolean),
    GeolocationFormat: S.optional(S.String),
    Tags: S.optional(Tags),
    Format: S.optional(S.String),
    ImportMode: S.optional(ImportMode),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDatasetImportJobRequest",
}) as any as S.Schema<CreateDatasetImportJobRequest>;
export interface CreateDatasetImportJobResponse {
  DatasetImportJobArn?: string;
}
export const CreateDatasetImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetImportJobArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateDatasetImportJobResponse",
}) as any as S.Schema<CreateDatasetImportJobResponse>;
export type TimeSeriesGranularity = "ALL" | "SPECIFIC" | (string & {});
export const TimeSeriesGranularity = /*@__PURE__*/ S.String;

export type TimePointGranularity = "ALL" | "SPECIFIC" | (string & {});
export const TimePointGranularity = /*@__PURE__*/ S.String;

export interface ExplainabilityConfig {
  TimeSeriesGranularity: TimeSeriesGranularity;
  TimePointGranularity: TimePointGranularity;
}
export const ExplainabilityConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeSeriesGranularity: TimeSeriesGranularity,
    TimePointGranularity: TimePointGranularity,
  }),
).annotate({
  identifier: "ExplainabilityConfig",
}) as any as S.Schema<ExplainabilityConfig>;
export type LocalDateTime = string;
export interface CreateExplainabilityRequest {
  ExplainabilityName: string;
  ResourceArn: string;
  ExplainabilityConfig: ExplainabilityConfig;
  DataSource?: DataSource;
  Schema?: Schema;
  EnableVisualization?: boolean;
  StartDateTime?: string;
  EndDateTime?: string;
  Tags?: Tag[];
}
export const CreateExplainabilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExplainabilityName: S.String,
    ResourceArn: S.String,
    ExplainabilityConfig: ExplainabilityConfig,
    DataSource: S.optional(DataSource),
    Schema: S.optional(Schema),
    EnableVisualization: S.optional(S.Boolean),
    StartDateTime: S.optional(S.String),
    EndDateTime: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateExplainabilityRequest",
}) as any as S.Schema<CreateExplainabilityRequest>;
export interface CreateExplainabilityResponse {
  ExplainabilityArn?: string;
}
export const CreateExplainabilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExplainabilityArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateExplainabilityResponse",
}) as any as S.Schema<CreateExplainabilityResponse>;
export interface DataDestination {
  S3Config: S3Config;
}
export const DataDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Config: S3Config }),
).annotate({
  identifier: "DataDestination",
}) as any as S.Schema<DataDestination>;
export interface CreateExplainabilityExportRequest {
  ExplainabilityExportName: string;
  ExplainabilityArn: string;
  Destination: DataDestination;
  Tags?: Tag[];
  Format?: string;
}
export const CreateExplainabilityExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExplainabilityExportName: S.String,
    ExplainabilityArn: S.String,
    Destination: DataDestination,
    Tags: S.optional(Tags),
    Format: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateExplainabilityExportRequest",
}) as any as S.Schema<CreateExplainabilityExportRequest>;
export interface CreateExplainabilityExportResponse {
  ExplainabilityExportArn?: string;
}
export const CreateExplainabilityExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExplainabilityExportArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateExplainabilityExportResponse",
}) as any as S.Schema<CreateExplainabilityExportResponse>;
export interface TimeSeriesIdentifiers {
  DataSource?: DataSource;
  Schema?: Schema;
  Format?: string;
}
export const TimeSeriesIdentifiers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DataSource: S.optional(DataSource),
    Schema: S.optional(Schema),
    Format: S.optional(S.String),
  }),
).annotate({
  identifier: "TimeSeriesIdentifiers",
}) as any as S.Schema<TimeSeriesIdentifiers>;
export interface TimeSeriesSelector {
  TimeSeriesIdentifiers?: TimeSeriesIdentifiers;
}
export const TimeSeriesSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TimeSeriesIdentifiers: S.optional(TimeSeriesIdentifiers) }),
).annotate({
  identifier: "TimeSeriesSelector",
}) as any as S.Schema<TimeSeriesSelector>;
export interface CreateForecastRequest {
  ForecastName: string;
  PredictorArn: string;
  ForecastTypes?: string[];
  Tags?: Tag[];
  TimeSeriesSelector?: TimeSeriesSelector;
}
export const CreateForecastRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForecastName: S.String,
    PredictorArn: S.String,
    ForecastTypes: S.optional(ForecastTypes),
    Tags: S.optional(Tags),
    TimeSeriesSelector: S.optional(TimeSeriesSelector),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateForecastRequest",
}) as any as S.Schema<CreateForecastRequest>;
export interface CreateForecastResponse {
  ForecastArn?: string;
}
export const CreateForecastResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ForecastArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateForecastResponse",
}) as any as S.Schema<CreateForecastResponse>;
export interface CreateForecastExportJobRequest {
  ForecastExportJobName: string;
  ForecastArn: string;
  Destination: DataDestination;
  Tags?: Tag[];
  Format?: string;
}
export const CreateForecastExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForecastExportJobName: S.String,
    ForecastArn: S.String,
    Destination: DataDestination,
    Tags: S.optional(Tags),
    Format: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateForecastExportJobRequest",
}) as any as S.Schema<CreateForecastExportJobRequest>;
export interface CreateForecastExportJobResponse {
  ForecastExportJobArn?: string;
}
export const CreateForecastExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ForecastExportJobArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateForecastExportJobResponse",
}) as any as S.Schema<CreateForecastExportJobResponse>;
export interface CreateMonitorRequest {
  MonitorName: string;
  ResourceArn: string;
  Tags?: Tag[];
}
export const CreateMonitorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.String,
    ResourceArn: S.String,
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateMonitorRequest",
}) as any as S.Schema<CreateMonitorRequest>;
export interface CreateMonitorResponse {
  MonitorArn?: string;
}
export const CreateMonitorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MonitorArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateMonitorResponse",
}) as any as S.Schema<CreateMonitorResponse>;
export type AutoMLOverrideStrategy =
  | "LatencyOptimized"
  | "AccuracyOptimized"
  | (string & {});
export const AutoMLOverrideStrategy = /*@__PURE__*/ S.String;

export type ParameterKey = string;
export type ParameterValue = string;
export type TrainingParameters = { [key: string]: string | undefined };
export const TrainingParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface EvaluationParameters {
  NumberOfBacktestWindows?: number;
  BackTestWindowOffset?: number;
}
export const EvaluationParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumberOfBacktestWindows: S.optional(S.Number),
    BackTestWindowOffset: S.optional(S.Number),
  }),
).annotate({
  identifier: "EvaluationParameters",
}) as any as S.Schema<EvaluationParameters>;
export interface CategoricalParameterRange {
  Name: string;
  Values: string[];
}
export const CategoricalParameterRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: Values }),
).annotate({
  identifier: "CategoricalParameterRange",
}) as any as S.Schema<CategoricalParameterRange>;
export type CategoricalParameterRanges = CategoricalParameterRange[];
export const CategoricalParameterRanges = /*@__PURE__*/ S.Array(
  CategoricalParameterRange,
);
export type ScalingType =
  | "Auto"
  | "Linear"
  | "Logarithmic"
  | "ReverseLogarithmic"
  | (string & {});
export const ScalingType = /*@__PURE__*/ S.String;

export interface ContinuousParameterRange {
  Name: string;
  MaxValue: number;
  MinValue: number;
  ScalingType?: ScalingType;
}
export const ContinuousParameterRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    MaxValue: S.Number,
    MinValue: S.Number,
    ScalingType: S.optional(ScalingType),
  }),
).annotate({
  identifier: "ContinuousParameterRange",
}) as any as S.Schema<ContinuousParameterRange>;
export type ContinuousParameterRanges = ContinuousParameterRange[];
export const ContinuousParameterRanges = /*@__PURE__*/ S.Array(
  ContinuousParameterRange,
);
export interface IntegerParameterRange {
  Name: string;
  MaxValue: number;
  MinValue: number;
  ScalingType?: ScalingType;
}
export const IntegerParameterRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    MaxValue: S.Number,
    MinValue: S.Number,
    ScalingType: S.optional(ScalingType),
  }),
).annotate({
  identifier: "IntegerParameterRange",
}) as any as S.Schema<IntegerParameterRange>;
export type IntegerParameterRanges = IntegerParameterRange[];
export const IntegerParameterRanges = /*@__PURE__*/ S.Array(
  IntegerParameterRange,
);
export interface ParameterRanges {
  CategoricalParameterRanges?: CategoricalParameterRange[];
  ContinuousParameterRanges?: ContinuousParameterRange[];
  IntegerParameterRanges?: IntegerParameterRange[];
}
export const ParameterRanges = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CategoricalParameterRanges: S.optional(CategoricalParameterRanges),
    ContinuousParameterRanges: S.optional(ContinuousParameterRanges),
    IntegerParameterRanges: S.optional(IntegerParameterRanges),
  }),
).annotate({
  identifier: "ParameterRanges",
}) as any as S.Schema<ParameterRanges>;
export interface HyperParameterTuningJobConfig {
  ParameterRanges?: ParameterRanges;
}
export const HyperParameterTuningJobConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ParameterRanges: S.optional(ParameterRanges) }),
).annotate({
  identifier: "HyperParameterTuningJobConfig",
}) as any as S.Schema<HyperParameterTuningJobConfig>;
export interface SupplementaryFeature {
  Name: string;
  Value: string;
}
export const SupplementaryFeature = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({
  identifier: "SupplementaryFeature",
}) as any as S.Schema<SupplementaryFeature>;
export type SupplementaryFeatures = SupplementaryFeature[];
export const SupplementaryFeatures =
  /*@__PURE__*/ S.Array(SupplementaryFeature);
export interface InputDataConfig {
  DatasetGroupArn: string;
  SupplementaryFeatures?: SupplementaryFeature[];
}
export const InputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetGroupArn: S.String,
    SupplementaryFeatures: S.optional(SupplementaryFeatures),
  }),
).annotate({
  identifier: "InputDataConfig",
}) as any as S.Schema<InputDataConfig>;
export type FeaturizationMethodName = "filling" | (string & {});
export const FeaturizationMethodName = /*@__PURE__*/ S.String;

export type FeaturizationMethodParameters = {
  [key: string]: string | undefined;
};
export const FeaturizationMethodParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface FeaturizationMethod {
  FeaturizationMethodName: FeaturizationMethodName;
  FeaturizationMethodParameters?: { [key: string]: string | undefined };
}
export const FeaturizationMethod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeaturizationMethodName: FeaturizationMethodName,
    FeaturizationMethodParameters: S.optional(FeaturizationMethodParameters),
  }),
).annotate({
  identifier: "FeaturizationMethod",
}) as any as S.Schema<FeaturizationMethod>;
export type FeaturizationPipeline = FeaturizationMethod[];
export const FeaturizationPipeline = /*@__PURE__*/ S.Array(FeaturizationMethod);
export interface Featurization {
  AttributeName: string;
  FeaturizationPipeline?: FeaturizationMethod[];
}
export const Featurization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeName: S.String,
    FeaturizationPipeline: S.optional(FeaturizationPipeline),
  }),
).annotate({ identifier: "Featurization" }) as any as S.Schema<Featurization>;
export type Featurizations = Featurization[];
export const Featurizations = /*@__PURE__*/ S.Array(Featurization);
export interface FeaturizationConfig {
  ForecastFrequency: string;
  ForecastDimensions?: string[];
  Featurizations?: Featurization[];
}
export const FeaturizationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForecastFrequency: S.String,
    ForecastDimensions: S.optional(ForecastDimensions),
    Featurizations: S.optional(Featurizations),
  }),
).annotate({
  identifier: "FeaturizationConfig",
}) as any as S.Schema<FeaturizationConfig>;
export interface CreatePredictorRequest {
  PredictorName: string;
  AlgorithmArn?: string;
  ForecastHorizon: number;
  ForecastTypes?: string[];
  PerformAutoML?: boolean;
  AutoMLOverrideStrategy?: AutoMLOverrideStrategy;
  PerformHPO?: boolean;
  TrainingParameters?: { [key: string]: string | undefined };
  EvaluationParameters?: EvaluationParameters;
  HPOConfig?: HyperParameterTuningJobConfig;
  InputDataConfig: InputDataConfig;
  FeaturizationConfig: FeaturizationConfig;
  EncryptionConfig?: EncryptionConfig;
  Tags?: Tag[];
  OptimizationMetric?: OptimizationMetric;
}
export const CreatePredictorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PredictorName: S.String,
    AlgorithmArn: S.optional(S.String),
    ForecastHorizon: S.Number,
    ForecastTypes: S.optional(ForecastTypes),
    PerformAutoML: S.optional(S.Boolean),
    AutoMLOverrideStrategy: S.optional(AutoMLOverrideStrategy),
    PerformHPO: S.optional(S.Boolean),
    TrainingParameters: S.optional(TrainingParameters),
    EvaluationParameters: S.optional(EvaluationParameters),
    HPOConfig: S.optional(HyperParameterTuningJobConfig),
    InputDataConfig: InputDataConfig,
    FeaturizationConfig: FeaturizationConfig,
    EncryptionConfig: S.optional(EncryptionConfig),
    Tags: S.optional(Tags),
    OptimizationMetric: S.optional(OptimizationMetric),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePredictorRequest",
}) as any as S.Schema<CreatePredictorRequest>;
export interface CreatePredictorResponse {
  PredictorArn?: string;
}
export const CreatePredictorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PredictorArn: S.optional(S.String) }),
).annotate({
  identifier: "CreatePredictorResponse",
}) as any as S.Schema<CreatePredictorResponse>;
export interface CreatePredictorBacktestExportJobRequest {
  PredictorBacktestExportJobName: string;
  PredictorArn: string;
  Destination: DataDestination;
  Tags?: Tag[];
  Format?: string;
}
export const CreatePredictorBacktestExportJobRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PredictorBacktestExportJobName: S.String,
      PredictorArn: S.String,
      Destination: DataDestination,
      Tags: S.optional(Tags),
      Format: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreatePredictorBacktestExportJobRequest",
}) as any as S.Schema<CreatePredictorBacktestExportJobRequest>;
export interface CreatePredictorBacktestExportJobResponse {
  PredictorBacktestExportJobArn?: string;
}
export const CreatePredictorBacktestExportJobResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ PredictorBacktestExportJobArn: S.optional(S.String) }),
).annotate({
  identifier: "CreatePredictorBacktestExportJobResponse",
}) as any as S.Schema<CreatePredictorBacktestExportJobResponse>;
export interface CreateWhatIfAnalysisRequest {
  WhatIfAnalysisName: string;
  ForecastArn: string;
  TimeSeriesSelector?: TimeSeriesSelector;
  Tags?: Tag[];
}
export const CreateWhatIfAnalysisRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WhatIfAnalysisName: S.String,
    ForecastArn: S.String,
    TimeSeriesSelector: S.optional(TimeSeriesSelector),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateWhatIfAnalysisRequest",
}) as any as S.Schema<CreateWhatIfAnalysisRequest>;
export interface CreateWhatIfAnalysisResponse {
  WhatIfAnalysisArn?: string;
}
export const CreateWhatIfAnalysisResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WhatIfAnalysisArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateWhatIfAnalysisResponse",
}) as any as S.Schema<CreateWhatIfAnalysisResponse>;
export type Operation =
  | "ADD"
  | "SUBTRACT"
  | "MULTIPLY"
  | "DIVIDE"
  | (string & {});
export const Operation = /*@__PURE__*/ S.String;

export interface Action {
  AttributeName: string;
  Operation: Operation;
  Value: number;
}
export const Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AttributeName: S.String, Operation: Operation, Value: S.Number }),
).annotate({ identifier: "Action" }) as any as S.Schema<Action>;
export type AttributeValue = string;
export type Condition =
  | "EQUALS"
  | "NOT_EQUALS"
  | "LESS_THAN"
  | "GREATER_THAN"
  | (string & {});
export const Condition = /*@__PURE__*/ S.String;

export interface TimeSeriesCondition {
  AttributeName: string;
  AttributeValue: string;
  Condition: Condition;
}
export const TimeSeriesCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeName: S.String,
    AttributeValue: S.String,
    Condition: Condition,
  }),
).annotate({
  identifier: "TimeSeriesCondition",
}) as any as S.Schema<TimeSeriesCondition>;
export type TimeSeriesConditions = TimeSeriesCondition[];
export const TimeSeriesConditions = /*@__PURE__*/ S.Array(TimeSeriesCondition);
export interface TimeSeriesTransformation {
  Action?: Action;
  TimeSeriesConditions?: TimeSeriesCondition[];
}
export const TimeSeriesTransformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    TimeSeriesConditions: S.optional(TimeSeriesConditions),
  }),
).annotate({
  identifier: "TimeSeriesTransformation",
}) as any as S.Schema<TimeSeriesTransformation>;
export type TimeSeriesTransformations = TimeSeriesTransformation[];
export const TimeSeriesTransformations = /*@__PURE__*/ S.Array(
  TimeSeriesTransformation,
);
export interface TimeSeriesReplacementsDataSource {
  S3Config: S3Config;
  Schema: Schema;
  Format?: string;
  TimestampFormat?: string;
}
export const TimeSeriesReplacementsDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Config: S3Config,
    Schema: Schema,
    Format: S.optional(S.String),
    TimestampFormat: S.optional(S.String),
  }),
).annotate({
  identifier: "TimeSeriesReplacementsDataSource",
}) as any as S.Schema<TimeSeriesReplacementsDataSource>;
export interface CreateWhatIfForecastRequest {
  WhatIfForecastName: string;
  WhatIfAnalysisArn: string;
  TimeSeriesTransformations?: TimeSeriesTransformation[];
  TimeSeriesReplacementsDataSource?: TimeSeriesReplacementsDataSource;
  Tags?: Tag[];
}
export const CreateWhatIfForecastRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WhatIfForecastName: S.String,
    WhatIfAnalysisArn: S.String,
    TimeSeriesTransformations: S.optional(TimeSeriesTransformations),
    TimeSeriesReplacementsDataSource: S.optional(
      TimeSeriesReplacementsDataSource,
    ),
    Tags: S.optional(Tags),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateWhatIfForecastRequest",
}) as any as S.Schema<CreateWhatIfForecastRequest>;
export type LongArn = string;
export interface CreateWhatIfForecastResponse {
  WhatIfForecastArn?: string;
}
export const CreateWhatIfForecastResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WhatIfForecastArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateWhatIfForecastResponse",
}) as any as S.Schema<CreateWhatIfForecastResponse>;
export type WhatIfForecastArnListForExport = string[];
export const WhatIfForecastArnListForExport = /*@__PURE__*/ S.Array(S.String);
export interface CreateWhatIfForecastExportRequest {
  WhatIfForecastExportName: string;
  WhatIfForecastArns: string[];
  Destination: DataDestination;
  Tags?: Tag[];
  Format?: string;
}
export const CreateWhatIfForecastExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WhatIfForecastExportName: S.String,
    WhatIfForecastArns: WhatIfForecastArnListForExport,
    Destination: DataDestination,
    Tags: S.optional(Tags),
    Format: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateWhatIfForecastExportRequest",
}) as any as S.Schema<CreateWhatIfForecastExportRequest>;
export interface CreateWhatIfForecastExportResponse {
  WhatIfForecastExportArn?: string;
}
export const CreateWhatIfForecastExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WhatIfForecastExportArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateWhatIfForecastExportResponse",
}) as any as S.Schema<CreateWhatIfForecastExportResponse>;
export interface DeleteDatasetRequest {
  DatasetArn: string;
}
export const DeleteDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDatasetRequest",
}) as any as S.Schema<DeleteDatasetRequest>;
export interface DeleteDatasetResponse {}
export const DeleteDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDatasetResponse",
}) as any as S.Schema<DeleteDatasetResponse>;
export interface DeleteDatasetGroupRequest {
  DatasetGroupArn: string;
}
export const DeleteDatasetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetGroupArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDatasetGroupRequest",
}) as any as S.Schema<DeleteDatasetGroupRequest>;
export interface DeleteDatasetGroupResponse {}
export const DeleteDatasetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDatasetGroupResponse",
}) as any as S.Schema<DeleteDatasetGroupResponse>;
export interface DeleteDatasetImportJobRequest {
  DatasetImportJobArn: string;
}
export const DeleteDatasetImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetImportJobArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDatasetImportJobRequest",
}) as any as S.Schema<DeleteDatasetImportJobRequest>;
export interface DeleteDatasetImportJobResponse {}
export const DeleteDatasetImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDatasetImportJobResponse",
}) as any as S.Schema<DeleteDatasetImportJobResponse>;
export interface DeleteExplainabilityRequest {
  ExplainabilityArn: string;
}
export const DeleteExplainabilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExplainabilityArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteExplainabilityRequest",
}) as any as S.Schema<DeleteExplainabilityRequest>;
export interface DeleteExplainabilityResponse {}
export const DeleteExplainabilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteExplainabilityResponse",
}) as any as S.Schema<DeleteExplainabilityResponse>;
export interface DeleteExplainabilityExportRequest {
  ExplainabilityExportArn: string;
}
export const DeleteExplainabilityExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExplainabilityExportArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteExplainabilityExportRequest",
}) as any as S.Schema<DeleteExplainabilityExportRequest>;
export interface DeleteExplainabilityExportResponse {}
export const DeleteExplainabilityExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteExplainabilityExportResponse",
}) as any as S.Schema<DeleteExplainabilityExportResponse>;
export interface DeleteForecastRequest {
  ForecastArn: string;
}
export const DeleteForecastRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ForecastArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteForecastRequest",
}) as any as S.Schema<DeleteForecastRequest>;
export interface DeleteForecastResponse {}
export const DeleteForecastResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteForecastResponse",
}) as any as S.Schema<DeleteForecastResponse>;
export interface DeleteForecastExportJobRequest {
  ForecastExportJobArn: string;
}
export const DeleteForecastExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ForecastExportJobArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteForecastExportJobRequest",
}) as any as S.Schema<DeleteForecastExportJobRequest>;
export interface DeleteForecastExportJobResponse {}
export const DeleteForecastExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteForecastExportJobResponse",
}) as any as S.Schema<DeleteForecastExportJobResponse>;
export interface DeleteMonitorRequest {
  MonitorArn: string;
}
export const DeleteMonitorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MonitorArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteMonitorRequest",
}) as any as S.Schema<DeleteMonitorRequest>;
export interface DeleteMonitorResponse {}
export const DeleteMonitorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMonitorResponse",
}) as any as S.Schema<DeleteMonitorResponse>;
export interface DeletePredictorRequest {
  PredictorArn: string;
}
export const DeletePredictorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PredictorArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePredictorRequest",
}) as any as S.Schema<DeletePredictorRequest>;
export interface DeletePredictorResponse {}
export const DeletePredictorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePredictorResponse",
}) as any as S.Schema<DeletePredictorResponse>;
export interface DeletePredictorBacktestExportJobRequest {
  PredictorBacktestExportJobArn: string;
}
export const DeletePredictorBacktestExportJobRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ PredictorBacktestExportJobArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeletePredictorBacktestExportJobRequest",
}) as any as S.Schema<DeletePredictorBacktestExportJobRequest>;
export interface DeletePredictorBacktestExportJobResponse {}
export const DeletePredictorBacktestExportJobResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeletePredictorBacktestExportJobResponse",
}) as any as S.Schema<DeletePredictorBacktestExportJobResponse>;
export interface DeleteResourceTreeRequest {
  ResourceArn: string;
}
export const DeleteResourceTreeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResourceTreeRequest",
}) as any as S.Schema<DeleteResourceTreeRequest>;
export interface DeleteResourceTreeResponse {}
export const DeleteResourceTreeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourceTreeResponse",
}) as any as S.Schema<DeleteResourceTreeResponse>;
export interface DeleteWhatIfAnalysisRequest {
  WhatIfAnalysisArn: string;
}
export const DeleteWhatIfAnalysisRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WhatIfAnalysisArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteWhatIfAnalysisRequest",
}) as any as S.Schema<DeleteWhatIfAnalysisRequest>;
export interface DeleteWhatIfAnalysisResponse {}
export const DeleteWhatIfAnalysisResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWhatIfAnalysisResponse",
}) as any as S.Schema<DeleteWhatIfAnalysisResponse>;
export interface DeleteWhatIfForecastRequest {
  WhatIfForecastArn: string;
}
export const DeleteWhatIfForecastRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WhatIfForecastArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteWhatIfForecastRequest",
}) as any as S.Schema<DeleteWhatIfForecastRequest>;
export interface DeleteWhatIfForecastResponse {}
export const DeleteWhatIfForecastResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWhatIfForecastResponse",
}) as any as S.Schema<DeleteWhatIfForecastResponse>;
export interface DeleteWhatIfForecastExportRequest {
  WhatIfForecastExportArn: string;
}
export const DeleteWhatIfForecastExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WhatIfForecastExportArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteWhatIfForecastExportRequest",
}) as any as S.Schema<DeleteWhatIfForecastExportRequest>;
export interface DeleteWhatIfForecastExportResponse {}
export const DeleteWhatIfForecastExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWhatIfForecastExportResponse",
}) as any as S.Schema<DeleteWhatIfForecastExportResponse>;
export interface DescribeAutoPredictorRequest {
  PredictorArn: string;
}
export const DescribeAutoPredictorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PredictorArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAutoPredictorRequest",
}) as any as S.Schema<DescribeAutoPredictorRequest>;
export type State = "Active" | "Deleted" | (string & {});
export const State = /*@__PURE__*/ S.String;

export interface ReferencePredictorSummary {
  Arn?: string;
  State?: State;
}
export const ReferencePredictorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), State: S.optional(State) }),
).annotate({
  identifier: "ReferencePredictorSummary",
}) as any as S.Schema<ReferencePredictorSummary>;
export type Status = string;
export type Message = string;
export interface ExplainabilityInfo {
  ExplainabilityArn?: string;
  Status?: string;
}
export const ExplainabilityInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExplainabilityArn: S.optional(S.String),
    Status: S.optional(S.String),
  }),
).annotate({
  identifier: "ExplainabilityInfo",
}) as any as S.Schema<ExplainabilityInfo>;
export interface MonitorInfo {
  MonitorArn?: string;
  Status?: string;
}
export const MonitorInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MonitorArn: S.optional(S.String), Status: S.optional(S.String) }),
).annotate({ identifier: "MonitorInfo" }) as any as S.Schema<MonitorInfo>;
export interface DescribeAutoPredictorResponse {
  PredictorArn?: string;
  PredictorName?: string;
  ForecastHorizon?: number;
  ForecastTypes?: string[];
  ForecastFrequency?: string;
  ForecastDimensions?: string[];
  DatasetImportJobArns?: string[];
  DataConfig?: DataConfig;
  EncryptionConfig?: EncryptionConfig;
  ReferencePredictorSummary?: ReferencePredictorSummary;
  EstimatedTimeRemainingInMinutes?: number;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  OptimizationMetric?: OptimizationMetric;
  ExplainabilityInfo?: ExplainabilityInfo;
  MonitorInfo?: MonitorInfo;
  TimeAlignmentBoundary?: TimeAlignmentBoundary;
}
export const DescribeAutoPredictorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PredictorArn: S.optional(S.String),
    PredictorName: S.optional(S.String),
    ForecastHorizon: S.optional(S.Number),
    ForecastTypes: S.optional(ForecastTypes),
    ForecastFrequency: S.optional(S.String),
    ForecastDimensions: S.optional(ForecastDimensions),
    DatasetImportJobArns: S.optional(ArnList),
    DataConfig: S.optional(DataConfig),
    EncryptionConfig: S.optional(EncryptionConfig),
    ReferencePredictorSummary: S.optional(ReferencePredictorSummary),
    EstimatedTimeRemainingInMinutes: S.optional(S.Number),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    OptimizationMetric: S.optional(OptimizationMetric),
    ExplainabilityInfo: S.optional(ExplainabilityInfo),
    MonitorInfo: S.optional(MonitorInfo),
    TimeAlignmentBoundary: S.optional(TimeAlignmentBoundary),
  }),
).annotate({
  identifier: "DescribeAutoPredictorResponse",
}) as any as S.Schema<DescribeAutoPredictorResponse>;
export interface DescribeDatasetRequest {
  DatasetArn: string;
}
export const DescribeDatasetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDatasetRequest",
}) as any as S.Schema<DescribeDatasetRequest>;
export interface DescribeDatasetResponse {
  DatasetArn?: string;
  DatasetName?: string;
  Domain?: Domain;
  DatasetType?: DatasetType;
  DataFrequency?: string;
  Schema?: Schema;
  EncryptionConfig?: EncryptionConfig;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const DescribeDatasetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetArn: S.optional(S.String),
    DatasetName: S.optional(S.String),
    Domain: S.optional(Domain),
    DatasetType: S.optional(DatasetType),
    DataFrequency: S.optional(S.String),
    Schema: S.optional(Schema),
    EncryptionConfig: S.optional(EncryptionConfig),
    Status: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeDatasetResponse",
}) as any as S.Schema<DescribeDatasetResponse>;
export interface DescribeDatasetGroupRequest {
  DatasetGroupArn: string;
}
export const DescribeDatasetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetGroupArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDatasetGroupRequest",
}) as any as S.Schema<DescribeDatasetGroupRequest>;
export interface DescribeDatasetGroupResponse {
  DatasetGroupName?: string;
  DatasetGroupArn?: string;
  DatasetArns?: string[];
  Domain?: Domain;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const DescribeDatasetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetGroupName: S.optional(S.String),
    DatasetGroupArn: S.optional(S.String),
    DatasetArns: S.optional(ArnList),
    Domain: S.optional(Domain),
    Status: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeDatasetGroupResponse",
}) as any as S.Schema<DescribeDatasetGroupResponse>;
export interface DescribeDatasetImportJobRequest {
  DatasetImportJobArn: string;
}
export const DescribeDatasetImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetImportJobArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDatasetImportJobRequest",
}) as any as S.Schema<DescribeDatasetImportJobRequest>;
export interface Statistics {
  Count?: number;
  CountDistinct?: number;
  CountNull?: number;
  CountNan?: number;
  Min?: string;
  Max?: string;
  Avg?: number;
  Stddev?: number;
  CountLong?: number;
  CountDistinctLong?: number;
  CountNullLong?: number;
  CountNanLong?: number;
}
export const Statistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Count: S.optional(S.Number),
    CountDistinct: S.optional(S.Number),
    CountNull: S.optional(S.Number),
    CountNan: S.optional(S.Number),
    Min: S.optional(S.String),
    Max: S.optional(S.String),
    Avg: S.optional(S.Number),
    Stddev: S.optional(S.Number),
    CountLong: S.optional(S.Number),
    CountDistinctLong: S.optional(S.Number),
    CountNullLong: S.optional(S.Number),
    CountNanLong: S.optional(S.Number),
  }),
).annotate({ identifier: "Statistics" }) as any as S.Schema<Statistics>;
export type FieldStatistics = { [key: string]: Statistics | undefined };
export const FieldStatistics = /*@__PURE__*/ S.Record(
  S.String,
  Statistics.pipe(S.optional),
);
export interface DescribeDatasetImportJobResponse {
  DatasetImportJobName?: string;
  DatasetImportJobArn?: string;
  DatasetArn?: string;
  TimestampFormat?: string;
  TimeZone?: string;
  UseGeolocationForTimeZone?: boolean;
  GeolocationFormat?: string;
  DataSource?: DataSource;
  EstimatedTimeRemainingInMinutes?: number;
  FieldStatistics?: { [key: string]: Statistics | undefined };
  DataSize?: number;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  Format?: string;
  ImportMode?: ImportMode;
}
export const DescribeDatasetImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetImportJobName: S.optional(S.String),
    DatasetImportJobArn: S.optional(S.String),
    DatasetArn: S.optional(S.String),
    TimestampFormat: S.optional(S.String),
    TimeZone: S.optional(S.String),
    UseGeolocationForTimeZone: S.optional(S.Boolean),
    GeolocationFormat: S.optional(S.String),
    DataSource: S.optional(DataSource),
    EstimatedTimeRemainingInMinutes: S.optional(S.Number),
    FieldStatistics: S.optional(FieldStatistics),
    DataSize: S.optional(S.Number),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Format: S.optional(S.String),
    ImportMode: S.optional(ImportMode),
  }),
).annotate({
  identifier: "DescribeDatasetImportJobResponse",
}) as any as S.Schema<DescribeDatasetImportJobResponse>;
export interface DescribeExplainabilityRequest {
  ExplainabilityArn: string;
}
export const DescribeExplainabilityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExplainabilityArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeExplainabilityRequest",
}) as any as S.Schema<DescribeExplainabilityRequest>;
export interface DescribeExplainabilityResponse {
  ExplainabilityArn?: string;
  ExplainabilityName?: string;
  ResourceArn?: string;
  ExplainabilityConfig?: ExplainabilityConfig;
  EnableVisualization?: boolean;
  DataSource?: DataSource;
  Schema?: Schema;
  StartDateTime?: string;
  EndDateTime?: string;
  EstimatedTimeRemainingInMinutes?: number;
  Message?: string;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const DescribeExplainabilityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExplainabilityArn: S.optional(S.String),
    ExplainabilityName: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    ExplainabilityConfig: S.optional(ExplainabilityConfig),
    EnableVisualization: S.optional(S.Boolean),
    DataSource: S.optional(DataSource),
    Schema: S.optional(Schema),
    StartDateTime: S.optional(S.String),
    EndDateTime: S.optional(S.String),
    EstimatedTimeRemainingInMinutes: S.optional(S.Number),
    Message: S.optional(S.String),
    Status: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeExplainabilityResponse",
}) as any as S.Schema<DescribeExplainabilityResponse>;
export interface DescribeExplainabilityExportRequest {
  ExplainabilityExportArn: string;
}
export const DescribeExplainabilityExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ExplainabilityExportArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeExplainabilityExportRequest",
}) as any as S.Schema<DescribeExplainabilityExportRequest>;
export interface DescribeExplainabilityExportResponse {
  ExplainabilityExportArn?: string;
  ExplainabilityExportName?: string;
  ExplainabilityArn?: string;
  Destination?: DataDestination;
  Message?: string;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  Format?: string;
}
export const DescribeExplainabilityExportResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ExplainabilityExportArn: S.optional(S.String),
      ExplainabilityExportName: S.optional(S.String),
      ExplainabilityArn: S.optional(S.String),
      Destination: S.optional(DataDestination),
      Message: S.optional(S.String),
      Status: S.optional(S.String),
      CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      LastModificationTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      Format: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeExplainabilityExportResponse",
}) as any as S.Schema<DescribeExplainabilityExportResponse>;
export interface DescribeForecastRequest {
  ForecastArn: string;
}
export const DescribeForecastRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ForecastArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeForecastRequest",
}) as any as S.Schema<DescribeForecastRequest>;
export type ErrorMessage = string;
export interface DescribeForecastResponse {
  ForecastArn?: string;
  ForecastName?: string;
  ForecastTypes?: string[];
  PredictorArn?: string;
  DatasetGroupArn?: string;
  EstimatedTimeRemainingInMinutes?: number;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  TimeSeriesSelector?: TimeSeriesSelector;
}
export const DescribeForecastResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForecastArn: S.optional(S.String),
    ForecastName: S.optional(S.String),
    ForecastTypes: S.optional(ForecastTypes),
    PredictorArn: S.optional(S.String),
    DatasetGroupArn: S.optional(S.String),
    EstimatedTimeRemainingInMinutes: S.optional(S.Number),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TimeSeriesSelector: S.optional(TimeSeriesSelector),
  }),
).annotate({
  identifier: "DescribeForecastResponse",
}) as any as S.Schema<DescribeForecastResponse>;
export interface DescribeForecastExportJobRequest {
  ForecastExportJobArn: string;
}
export const DescribeForecastExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ForecastExportJobArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeForecastExportJobRequest",
}) as any as S.Schema<DescribeForecastExportJobRequest>;
export interface DescribeForecastExportJobResponse {
  ForecastExportJobArn?: string;
  ForecastExportJobName?: string;
  ForecastArn?: string;
  Destination?: DataDestination;
  Message?: string;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  Format?: string;
}
export const DescribeForecastExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForecastExportJobArn: S.optional(S.String),
    ForecastExportJobName: S.optional(S.String),
    ForecastArn: S.optional(S.String),
    Destination: S.optional(DataDestination),
    Message: S.optional(S.String),
    Status: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Format: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeForecastExportJobResponse",
}) as any as S.Schema<DescribeForecastExportJobResponse>;
export interface DescribeMonitorRequest {
  MonitorArn: string;
}
export const DescribeMonitorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MonitorArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeMonitorRequest",
}) as any as S.Schema<DescribeMonitorRequest>;
export type EvaluationState = string;
export interface BaselineMetric {
  Name?: string;
  Value?: number;
}
export const BaselineMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.Number) }),
).annotate({ identifier: "BaselineMetric" }) as any as S.Schema<BaselineMetric>;
export type BaselineMetrics = BaselineMetric[];
export const BaselineMetrics = /*@__PURE__*/ S.Array(BaselineMetric);
export interface PredictorBaseline {
  BaselineMetrics?: BaselineMetric[];
}
export const PredictorBaseline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BaselineMetrics: S.optional(BaselineMetrics) }),
).annotate({
  identifier: "PredictorBaseline",
}) as any as S.Schema<PredictorBaseline>;
export interface Baseline {
  PredictorBaseline?: PredictorBaseline;
}
export const Baseline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PredictorBaseline: S.optional(PredictorBaseline) }),
).annotate({ identifier: "Baseline" }) as any as S.Schema<Baseline>;
export interface DescribeMonitorResponse {
  MonitorName?: string;
  MonitorArn?: string;
  ResourceArn?: string;
  Status?: string;
  LastEvaluationTime?: Date;
  LastEvaluationState?: string;
  Baseline?: Baseline;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  EstimatedEvaluationTimeRemainingInMinutes?: number;
}
export const DescribeMonitorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorName: S.optional(S.String),
    MonitorArn: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    Status: S.optional(S.String),
    LastEvaluationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastEvaluationState: S.optional(S.String),
    Baseline: S.optional(Baseline),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EstimatedEvaluationTimeRemainingInMinutes: S.optional(S.Number),
  }),
).annotate({
  identifier: "DescribeMonitorResponse",
}) as any as S.Schema<DescribeMonitorResponse>;
export interface DescribePredictorRequest {
  PredictorArn: string;
}
export const DescribePredictorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PredictorArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribePredictorRequest",
}) as any as S.Schema<DescribePredictorRequest>;
export interface TestWindowSummary {
  TestWindowStart?: Date;
  TestWindowEnd?: Date;
  Status?: string;
  Message?: string;
}
export const TestWindowSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TestWindowStart: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TestWindowEnd: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "TestWindowSummary",
}) as any as S.Schema<TestWindowSummary>;
export type TestWindowDetails = TestWindowSummary[];
export const TestWindowDetails = /*@__PURE__*/ S.Array(TestWindowSummary);
export interface PredictorExecution {
  AlgorithmArn?: string;
  TestWindows?: TestWindowSummary[];
}
export const PredictorExecution = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlgorithmArn: S.optional(S.String),
    TestWindows: S.optional(TestWindowDetails),
  }),
).annotate({
  identifier: "PredictorExecution",
}) as any as S.Schema<PredictorExecution>;
export type PredictorExecutions = PredictorExecution[];
export const PredictorExecutions = /*@__PURE__*/ S.Array(PredictorExecution);
export interface PredictorExecutionDetails {
  PredictorExecutions?: PredictorExecution[];
}
export const PredictorExecutionDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PredictorExecutions: S.optional(PredictorExecutions) }),
).annotate({
  identifier: "PredictorExecutionDetails",
}) as any as S.Schema<PredictorExecutionDetails>;
export interface DescribePredictorResponse {
  PredictorArn?: string;
  PredictorName?: string;
  AlgorithmArn?: string;
  AutoMLAlgorithmArns?: string[];
  ForecastHorizon?: number;
  ForecastTypes?: string[];
  PerformAutoML?: boolean;
  AutoMLOverrideStrategy?: AutoMLOverrideStrategy;
  PerformHPO?: boolean;
  TrainingParameters?: { [key: string]: string | undefined };
  EvaluationParameters?: EvaluationParameters;
  HPOConfig?: HyperParameterTuningJobConfig;
  InputDataConfig?: InputDataConfig;
  FeaturizationConfig?: FeaturizationConfig;
  EncryptionConfig?: EncryptionConfig;
  PredictorExecutionDetails?: PredictorExecutionDetails;
  EstimatedTimeRemainingInMinutes?: number;
  IsAutoPredictor?: boolean;
  DatasetImportJobArns?: string[];
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  OptimizationMetric?: OptimizationMetric;
}
export const DescribePredictorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PredictorArn: S.optional(S.String),
    PredictorName: S.optional(S.String),
    AlgorithmArn: S.optional(S.String),
    AutoMLAlgorithmArns: S.optional(ArnList),
    ForecastHorizon: S.optional(S.Number),
    ForecastTypes: S.optional(ForecastTypes),
    PerformAutoML: S.optional(S.Boolean),
    AutoMLOverrideStrategy: S.optional(AutoMLOverrideStrategy),
    PerformHPO: S.optional(S.Boolean),
    TrainingParameters: S.optional(TrainingParameters),
    EvaluationParameters: S.optional(EvaluationParameters),
    HPOConfig: S.optional(HyperParameterTuningJobConfig),
    InputDataConfig: S.optional(InputDataConfig),
    FeaturizationConfig: S.optional(FeaturizationConfig),
    EncryptionConfig: S.optional(EncryptionConfig),
    PredictorExecutionDetails: S.optional(PredictorExecutionDetails),
    EstimatedTimeRemainingInMinutes: S.optional(S.Number),
    IsAutoPredictor: S.optional(S.Boolean),
    DatasetImportJobArns: S.optional(ArnList),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    OptimizationMetric: S.optional(OptimizationMetric),
  }),
).annotate({
  identifier: "DescribePredictorResponse",
}) as any as S.Schema<DescribePredictorResponse>;
export interface DescribePredictorBacktestExportJobRequest {
  PredictorBacktestExportJobArn: string;
}
export const DescribePredictorBacktestExportJobRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ PredictorBacktestExportJobArn: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribePredictorBacktestExportJobRequest",
  }) as any as S.Schema<DescribePredictorBacktestExportJobRequest>;
export interface DescribePredictorBacktestExportJobResponse {
  PredictorBacktestExportJobArn?: string;
  PredictorBacktestExportJobName?: string;
  PredictorArn?: string;
  Destination?: DataDestination;
  Message?: string;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  Format?: string;
}
export const DescribePredictorBacktestExportJobResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PredictorBacktestExportJobArn: S.optional(S.String),
      PredictorBacktestExportJobName: S.optional(S.String),
      PredictorArn: S.optional(S.String),
      Destination: S.optional(DataDestination),
      Message: S.optional(S.String),
      Status: S.optional(S.String),
      CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      LastModificationTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      Format: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribePredictorBacktestExportJobResponse",
  }) as any as S.Schema<DescribePredictorBacktestExportJobResponse>;
export interface DescribeWhatIfAnalysisRequest {
  WhatIfAnalysisArn: string;
}
export const DescribeWhatIfAnalysisRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WhatIfAnalysisArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeWhatIfAnalysisRequest",
}) as any as S.Schema<DescribeWhatIfAnalysisRequest>;
export interface DescribeWhatIfAnalysisResponse {
  WhatIfAnalysisName?: string;
  WhatIfAnalysisArn?: string;
  ForecastArn?: string;
  EstimatedTimeRemainingInMinutes?: number;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  TimeSeriesSelector?: TimeSeriesSelector;
}
export const DescribeWhatIfAnalysisResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WhatIfAnalysisName: S.optional(S.String),
    WhatIfAnalysisArn: S.optional(S.String),
    ForecastArn: S.optional(S.String),
    EstimatedTimeRemainingInMinutes: S.optional(S.Number),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TimeSeriesSelector: S.optional(TimeSeriesSelector),
  }),
).annotate({
  identifier: "DescribeWhatIfAnalysisResponse",
}) as any as S.Schema<DescribeWhatIfAnalysisResponse>;
export interface DescribeWhatIfForecastRequest {
  WhatIfForecastArn: string;
}
export const DescribeWhatIfForecastRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WhatIfForecastArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeWhatIfForecastRequest",
}) as any as S.Schema<DescribeWhatIfForecastRequest>;
export interface DescribeWhatIfForecastResponse {
  WhatIfForecastName?: string;
  WhatIfForecastArn?: string;
  WhatIfAnalysisArn?: string;
  EstimatedTimeRemainingInMinutes?: number;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  TimeSeriesTransformations?: TimeSeriesTransformation[];
  TimeSeriesReplacementsDataSource?: TimeSeriesReplacementsDataSource;
  ForecastTypes?: string[];
}
export const DescribeWhatIfForecastResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WhatIfForecastName: S.optional(S.String),
    WhatIfForecastArn: S.optional(S.String),
    WhatIfAnalysisArn: S.optional(S.String),
    EstimatedTimeRemainingInMinutes: S.optional(S.Number),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TimeSeriesTransformations: S.optional(TimeSeriesTransformations),
    TimeSeriesReplacementsDataSource: S.optional(
      TimeSeriesReplacementsDataSource,
    ),
    ForecastTypes: S.optional(ForecastTypes),
  }),
).annotate({
  identifier: "DescribeWhatIfForecastResponse",
}) as any as S.Schema<DescribeWhatIfForecastResponse>;
export interface DescribeWhatIfForecastExportRequest {
  WhatIfForecastExportArn: string;
}
export const DescribeWhatIfForecastExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WhatIfForecastExportArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeWhatIfForecastExportRequest",
}) as any as S.Schema<DescribeWhatIfForecastExportRequest>;
export type LongArnList = string[];
export const LongArnList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeWhatIfForecastExportResponse {
  WhatIfForecastExportArn?: string;
  WhatIfForecastExportName?: string;
  WhatIfForecastArns?: string[];
  Destination?: DataDestination;
  Message?: string;
  Status?: string;
  CreationTime?: Date;
  EstimatedTimeRemainingInMinutes?: number;
  LastModificationTime?: Date;
  Format?: string;
}
export const DescribeWhatIfForecastExportResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WhatIfForecastExportArn: S.optional(S.String),
      WhatIfForecastExportName: S.optional(S.String),
      WhatIfForecastArns: S.optional(LongArnList),
      Destination: S.optional(DataDestination),
      Message: S.optional(S.String),
      Status: S.optional(S.String),
      CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      EstimatedTimeRemainingInMinutes: S.optional(S.Number),
      LastModificationTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      Format: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeWhatIfForecastExportResponse",
}) as any as S.Schema<DescribeWhatIfForecastExportResponse>;
export interface GetAccuracyMetricsRequest {
  PredictorArn: string;
}
export const GetAccuracyMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PredictorArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAccuracyMetricsRequest",
}) as any as S.Schema<GetAccuracyMetricsRequest>;
export type EvaluationType = "SUMMARY" | "COMPUTED" | (string & {});
export const EvaluationType = /*@__PURE__*/ S.String;

export interface WeightedQuantileLoss {
  Quantile?: number;
  LossValue?: number;
}
export const WeightedQuantileLoss = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Quantile: S.optional(S.Number), LossValue: S.optional(S.Number) }),
).annotate({
  identifier: "WeightedQuantileLoss",
}) as any as S.Schema<WeightedQuantileLoss>;
export type WeightedQuantileLosses = WeightedQuantileLoss[];
export const WeightedQuantileLosses =
  /*@__PURE__*/ S.Array(WeightedQuantileLoss);
export interface ErrorMetric {
  ForecastType?: string;
  WAPE?: number;
  RMSE?: number;
  MASE?: number;
  MAPE?: number;
}
export const ErrorMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForecastType: S.optional(S.String),
    WAPE: S.optional(S.Number),
    RMSE: S.optional(S.Number),
    MASE: S.optional(S.Number),
    MAPE: S.optional(S.Number),
  }),
).annotate({ identifier: "ErrorMetric" }) as any as S.Schema<ErrorMetric>;
export type ErrorMetrics = ErrorMetric[];
export const ErrorMetrics = /*@__PURE__*/ S.Array(ErrorMetric);
export interface Metrics {
  RMSE?: number;
  WeightedQuantileLosses?: WeightedQuantileLoss[];
  ErrorMetrics?: ErrorMetric[];
  AverageWeightedQuantileLoss?: number;
}
export const Metrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RMSE: S.optional(S.Number),
    WeightedQuantileLosses: S.optional(WeightedQuantileLosses),
    ErrorMetrics: S.optional(ErrorMetrics),
    AverageWeightedQuantileLoss: S.optional(S.Number),
  }),
).annotate({ identifier: "Metrics" }) as any as S.Schema<Metrics>;
export interface WindowSummary {
  TestWindowStart?: Date;
  TestWindowEnd?: Date;
  ItemCount?: number;
  EvaluationType?: EvaluationType;
  Metrics?: Metrics;
}
export const WindowSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TestWindowStart: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TestWindowEnd: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ItemCount: S.optional(S.Number),
    EvaluationType: S.optional(EvaluationType),
    Metrics: S.optional(Metrics),
  }),
).annotate({ identifier: "WindowSummary" }) as any as S.Schema<WindowSummary>;
export type TestWindows = WindowSummary[];
export const TestWindows = /*@__PURE__*/ S.Array(WindowSummary);
export interface EvaluationResult {
  AlgorithmArn?: string;
  TestWindows?: WindowSummary[];
}
export const EvaluationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlgorithmArn: S.optional(S.String),
    TestWindows: S.optional(TestWindows),
  }),
).annotate({
  identifier: "EvaluationResult",
}) as any as S.Schema<EvaluationResult>;
export type PredictorEvaluationResults = EvaluationResult[];
export const PredictorEvaluationResults =
  /*@__PURE__*/ S.Array(EvaluationResult);
export interface GetAccuracyMetricsResponse {
  PredictorEvaluationResults?: EvaluationResult[];
  IsAutoPredictor?: boolean;
  AutoMLOverrideStrategy?: AutoMLOverrideStrategy;
  OptimizationMetric?: OptimizationMetric;
}
export const GetAccuracyMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PredictorEvaluationResults: S.optional(PredictorEvaluationResults),
    IsAutoPredictor: S.optional(S.Boolean),
    AutoMLOverrideStrategy: S.optional(AutoMLOverrideStrategy),
    OptimizationMetric: S.optional(OptimizationMetric),
  }),
).annotate({
  identifier: "GetAccuracyMetricsResponse",
}) as any as S.Schema<GetAccuracyMetricsResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface ListDatasetGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListDatasetGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatasetGroupsRequest",
}) as any as S.Schema<ListDatasetGroupsRequest>;
export interface DatasetGroupSummary {
  DatasetGroupArn?: string;
  DatasetGroupName?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const DatasetGroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetGroupArn: S.optional(S.String),
    DatasetGroupName: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DatasetGroupSummary",
}) as any as S.Schema<DatasetGroupSummary>;
export type DatasetGroups = DatasetGroupSummary[];
export const DatasetGroups = /*@__PURE__*/ S.Array(DatasetGroupSummary);
export interface ListDatasetGroupsResponse {
  DatasetGroups?: DatasetGroupSummary[];
  NextToken?: string;
}
export const ListDatasetGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetGroups: S.optional(DatasetGroups),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasetGroupsResponse",
}) as any as S.Schema<ListDatasetGroupsResponse>;
export type FilterConditionString = "IS" | "IS_NOT" | (string & {});
export const FilterConditionString = /*@__PURE__*/ S.String;

export interface Filter {
  Key: string;
  Value: string;
  Condition: FilterConditionString;
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.String,
    Value: S.String,
    Condition: FilterConditionString,
  }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type Filters = Filter[];
export const Filters = /*@__PURE__*/ S.Array(Filter);
export interface ListDatasetImportJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListDatasetImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatasetImportJobsRequest",
}) as any as S.Schema<ListDatasetImportJobsRequest>;
export interface DatasetImportJobSummary {
  DatasetImportJobArn?: string;
  DatasetImportJobName?: string;
  DataSource?: DataSource;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
  ImportMode?: ImportMode;
}
export const DatasetImportJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetImportJobArn: S.optional(S.String),
    DatasetImportJobName: S.optional(S.String),
    DataSource: S.optional(DataSource),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ImportMode: S.optional(ImportMode),
  }),
).annotate({
  identifier: "DatasetImportJobSummary",
}) as any as S.Schema<DatasetImportJobSummary>;
export type DatasetImportJobs = DatasetImportJobSummary[];
export const DatasetImportJobs = /*@__PURE__*/ S.Array(DatasetImportJobSummary);
export interface ListDatasetImportJobsResponse {
  DatasetImportJobs?: DatasetImportJobSummary[];
  NextToken?: string;
}
export const ListDatasetImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetImportJobs: S.optional(DatasetImportJobs),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDatasetImportJobsResponse",
}) as any as S.Schema<ListDatasetImportJobsResponse>;
export interface ListDatasetsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListDatasetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDatasetsRequest",
}) as any as S.Schema<ListDatasetsRequest>;
export interface DatasetSummary {
  DatasetArn?: string;
  DatasetName?: string;
  DatasetType?: DatasetType;
  Domain?: Domain;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const DatasetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetArn: S.optional(S.String),
    DatasetName: S.optional(S.String),
    DatasetType: S.optional(DatasetType),
    Domain: S.optional(Domain),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "DatasetSummary" }) as any as S.Schema<DatasetSummary>;
export type Datasets = DatasetSummary[];
export const Datasets = /*@__PURE__*/ S.Array(DatasetSummary);
export interface ListDatasetsResponse {
  Datasets?: DatasetSummary[];
  NextToken?: string;
}
export const ListDatasetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Datasets: S.optional(Datasets), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListDatasetsResponse",
}) as any as S.Schema<ListDatasetsResponse>;
export interface ListExplainabilitiesRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListExplainabilitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListExplainabilitiesRequest",
}) as any as S.Schema<ListExplainabilitiesRequest>;
export interface ExplainabilitySummary {
  ExplainabilityArn?: string;
  ExplainabilityName?: string;
  ResourceArn?: string;
  ExplainabilityConfig?: ExplainabilityConfig;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const ExplainabilitySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExplainabilityArn: S.optional(S.String),
    ExplainabilityName: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    ExplainabilityConfig: S.optional(ExplainabilityConfig),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ExplainabilitySummary",
}) as any as S.Schema<ExplainabilitySummary>;
export type Explainabilities = ExplainabilitySummary[];
export const Explainabilities = /*@__PURE__*/ S.Array(ExplainabilitySummary);
export interface ListExplainabilitiesResponse {
  Explainabilities?: ExplainabilitySummary[];
  NextToken?: string;
}
export const ListExplainabilitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Explainabilities: S.optional(Explainabilities),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExplainabilitiesResponse",
}) as any as S.Schema<ListExplainabilitiesResponse>;
export interface ListExplainabilityExportsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListExplainabilityExportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListExplainabilityExportsRequest",
}) as any as S.Schema<ListExplainabilityExportsRequest>;
export interface ExplainabilityExportSummary {
  ExplainabilityExportArn?: string;
  ExplainabilityExportName?: string;
  Destination?: DataDestination;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const ExplainabilityExportSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExplainabilityExportArn: S.optional(S.String),
    ExplainabilityExportName: S.optional(S.String),
    Destination: S.optional(DataDestination),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ExplainabilityExportSummary",
}) as any as S.Schema<ExplainabilityExportSummary>;
export type ExplainabilityExports = ExplainabilityExportSummary[];
export const ExplainabilityExports = /*@__PURE__*/ S.Array(
  ExplainabilityExportSummary,
);
export interface ListExplainabilityExportsResponse {
  ExplainabilityExports?: ExplainabilityExportSummary[];
  NextToken?: string;
}
export const ListExplainabilityExportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExplainabilityExports: S.optional(ExplainabilityExports),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExplainabilityExportsResponse",
}) as any as S.Schema<ListExplainabilityExportsResponse>;
export interface ListForecastExportJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListForecastExportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListForecastExportJobsRequest",
}) as any as S.Schema<ListForecastExportJobsRequest>;
export interface ForecastExportJobSummary {
  ForecastExportJobArn?: string;
  ForecastExportJobName?: string;
  Destination?: DataDestination;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const ForecastExportJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForecastExportJobArn: S.optional(S.String),
    ForecastExportJobName: S.optional(S.String),
    Destination: S.optional(DataDestination),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ForecastExportJobSummary",
}) as any as S.Schema<ForecastExportJobSummary>;
export type ForecastExportJobs = ForecastExportJobSummary[];
export const ForecastExportJobs = /*@__PURE__*/ S.Array(
  ForecastExportJobSummary,
);
export interface ListForecastExportJobsResponse {
  ForecastExportJobs?: ForecastExportJobSummary[];
  NextToken?: string;
}
export const ListForecastExportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForecastExportJobs: S.optional(ForecastExportJobs),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListForecastExportJobsResponse",
}) as any as S.Schema<ListForecastExportJobsResponse>;
export interface ListForecastsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListForecastsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListForecastsRequest",
}) as any as S.Schema<ListForecastsRequest>;
export interface ForecastSummary {
  ForecastArn?: string;
  ForecastName?: string;
  PredictorArn?: string;
  CreatedUsingAutoPredictor?: boolean;
  DatasetGroupArn?: string;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const ForecastSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForecastArn: S.optional(S.String),
    ForecastName: S.optional(S.String),
    PredictorArn: S.optional(S.String),
    CreatedUsingAutoPredictor: S.optional(S.Boolean),
    DatasetGroupArn: S.optional(S.String),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ForecastSummary",
}) as any as S.Schema<ForecastSummary>;
export type Forecasts = ForecastSummary[];
export const Forecasts = /*@__PURE__*/ S.Array(ForecastSummary);
export interface ListForecastsResponse {
  Forecasts?: ForecastSummary[];
  NextToken?: string;
}
export const ListForecastsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Forecasts: S.optional(Forecasts),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListForecastsResponse",
}) as any as S.Schema<ListForecastsResponse>;
export interface ListMonitorEvaluationsRequest {
  NextToken?: string;
  MaxResults?: number;
  MonitorArn: string;
  Filters?: Filter[];
}
export const ListMonitorEvaluationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    MonitorArn: S.String,
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMonitorEvaluationsRequest",
}) as any as S.Schema<ListMonitorEvaluationsRequest>;
export type Detail = string;
export interface PredictorEvent {
  Detail?: string;
  Datetime?: Date;
}
export const PredictorEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Detail: S.optional(S.String),
    Datetime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "PredictorEvent" }) as any as S.Schema<PredictorEvent>;
export interface MonitorDataSource {
  DatasetImportJobArn?: string;
  ForecastArn?: string;
  PredictorArn?: string;
}
export const MonitorDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetImportJobArn: S.optional(S.String),
    ForecastArn: S.optional(S.String),
    PredictorArn: S.optional(S.String),
  }),
).annotate({
  identifier: "MonitorDataSource",
}) as any as S.Schema<MonitorDataSource>;
export type MetricName = string;
export interface MetricResult {
  MetricName?: string;
  MetricValue?: number;
}
export const MetricResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    MetricValue: S.optional(S.Number),
  }),
).annotate({ identifier: "MetricResult" }) as any as S.Schema<MetricResult>;
export type MetricResults = MetricResult[];
export const MetricResults = /*@__PURE__*/ S.Array(MetricResult);
export interface PredictorMonitorEvaluation {
  ResourceArn?: string;
  MonitorArn?: string;
  EvaluationTime?: Date;
  EvaluationState?: string;
  WindowStartDatetime?: Date;
  WindowEndDatetime?: Date;
  PredictorEvent?: PredictorEvent;
  MonitorDataSource?: MonitorDataSource;
  MetricResults?: MetricResult[];
  NumItemsEvaluated?: number;
  Message?: string;
}
export const PredictorMonitorEvaluation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    MonitorArn: S.optional(S.String),
    EvaluationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EvaluationState: S.optional(S.String),
    WindowStartDatetime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    WindowEndDatetime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    PredictorEvent: S.optional(PredictorEvent),
    MonitorDataSource: S.optional(MonitorDataSource),
    MetricResults: S.optional(MetricResults),
    NumItemsEvaluated: S.optional(S.Number),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "PredictorMonitorEvaluation",
}) as any as S.Schema<PredictorMonitorEvaluation>;
export type PredictorMonitorEvaluations = PredictorMonitorEvaluation[];
export const PredictorMonitorEvaluations = /*@__PURE__*/ S.Array(
  PredictorMonitorEvaluation,
);
export interface ListMonitorEvaluationsResponse {
  NextToken?: string;
  PredictorMonitorEvaluations?: PredictorMonitorEvaluation[];
}
export const ListMonitorEvaluationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PredictorMonitorEvaluations: S.optional(PredictorMonitorEvaluations),
  }),
).annotate({
  identifier: "ListMonitorEvaluationsResponse",
}) as any as S.Schema<ListMonitorEvaluationsResponse>;
export interface ListMonitorsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListMonitorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListMonitorsRequest",
}) as any as S.Schema<ListMonitorsRequest>;
export interface MonitorSummary {
  MonitorArn?: string;
  MonitorName?: string;
  ResourceArn?: string;
  Status?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const MonitorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorArn: S.optional(S.String),
    MonitorName: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    Status: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "MonitorSummary" }) as any as S.Schema<MonitorSummary>;
export type Monitors = MonitorSummary[];
export const Monitors = /*@__PURE__*/ S.Array(MonitorSummary);
export interface ListMonitorsResponse {
  Monitors?: MonitorSummary[];
  NextToken?: string;
}
export const ListMonitorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Monitors: S.optional(Monitors), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMonitorsResponse",
}) as any as S.Schema<ListMonitorsResponse>;
export interface ListPredictorBacktestExportJobsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListPredictorBacktestExportJobsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      Filters: S.optional(Filters),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListPredictorBacktestExportJobsRequest",
}) as any as S.Schema<ListPredictorBacktestExportJobsRequest>;
export interface PredictorBacktestExportJobSummary {
  PredictorBacktestExportJobArn?: string;
  PredictorBacktestExportJobName?: string;
  Destination?: DataDestination;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const PredictorBacktestExportJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PredictorBacktestExportJobArn: S.optional(S.String),
    PredictorBacktestExportJobName: S.optional(S.String),
    Destination: S.optional(DataDestination),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PredictorBacktestExportJobSummary",
}) as any as S.Schema<PredictorBacktestExportJobSummary>;
export type PredictorBacktestExportJobs = PredictorBacktestExportJobSummary[];
export const PredictorBacktestExportJobs = /*@__PURE__*/ S.Array(
  PredictorBacktestExportJobSummary,
);
export interface ListPredictorBacktestExportJobsResponse {
  PredictorBacktestExportJobs?: PredictorBacktestExportJobSummary[];
  NextToken?: string;
}
export const ListPredictorBacktestExportJobsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PredictorBacktestExportJobs: S.optional(PredictorBacktestExportJobs),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListPredictorBacktestExportJobsResponse",
}) as any as S.Schema<ListPredictorBacktestExportJobsResponse>;
export interface ListPredictorsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListPredictorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListPredictorsRequest",
}) as any as S.Schema<ListPredictorsRequest>;
export interface PredictorSummary {
  PredictorArn?: string;
  PredictorName?: string;
  DatasetGroupArn?: string;
  IsAutoPredictor?: boolean;
  ReferencePredictorSummary?: ReferencePredictorSummary;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const PredictorSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PredictorArn: S.optional(S.String),
    PredictorName: S.optional(S.String),
    DatasetGroupArn: S.optional(S.String),
    IsAutoPredictor: S.optional(S.Boolean),
    ReferencePredictorSummary: S.optional(ReferencePredictorSummary),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PredictorSummary",
}) as any as S.Schema<PredictorSummary>;
export type Predictors = PredictorSummary[];
export const Predictors = /*@__PURE__*/ S.Array(PredictorSummary);
export interface ListPredictorsResponse {
  Predictors?: PredictorSummary[];
  NextToken?: string;
}
export const ListPredictorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Predictors: S.optional(Predictors),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPredictorsResponse",
}) as any as S.Schema<ListPredictorsResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(Tags) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListWhatIfAnalysesRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListWhatIfAnalysesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListWhatIfAnalysesRequest",
}) as any as S.Schema<ListWhatIfAnalysesRequest>;
export interface WhatIfAnalysisSummary {
  WhatIfAnalysisArn?: string;
  WhatIfAnalysisName?: string;
  ForecastArn?: string;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const WhatIfAnalysisSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WhatIfAnalysisArn: S.optional(S.String),
    WhatIfAnalysisName: S.optional(S.String),
    ForecastArn: S.optional(S.String),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "WhatIfAnalysisSummary",
}) as any as S.Schema<WhatIfAnalysisSummary>;
export type WhatIfAnalyses = WhatIfAnalysisSummary[];
export const WhatIfAnalyses = /*@__PURE__*/ S.Array(WhatIfAnalysisSummary);
export interface ListWhatIfAnalysesResponse {
  WhatIfAnalyses?: WhatIfAnalysisSummary[];
  NextToken?: string;
}
export const ListWhatIfAnalysesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WhatIfAnalyses: S.optional(WhatIfAnalyses),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWhatIfAnalysesResponse",
}) as any as S.Schema<ListWhatIfAnalysesResponse>;
export interface ListWhatIfForecastExportsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListWhatIfForecastExportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListWhatIfForecastExportsRequest",
}) as any as S.Schema<ListWhatIfForecastExportsRequest>;
export interface WhatIfForecastExportSummary {
  WhatIfForecastExportArn?: string;
  WhatIfForecastArns?: string[];
  WhatIfForecastExportName?: string;
  Destination?: DataDestination;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const WhatIfForecastExportSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WhatIfForecastExportArn: S.optional(S.String),
    WhatIfForecastArns: S.optional(WhatIfForecastArnListForExport),
    WhatIfForecastExportName: S.optional(S.String),
    Destination: S.optional(DataDestination),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "WhatIfForecastExportSummary",
}) as any as S.Schema<WhatIfForecastExportSummary>;
export type WhatIfForecastExports = WhatIfForecastExportSummary[];
export const WhatIfForecastExports = /*@__PURE__*/ S.Array(
  WhatIfForecastExportSummary,
);
export interface ListWhatIfForecastExportsResponse {
  WhatIfForecastExports?: WhatIfForecastExportSummary[];
  NextToken?: string;
}
export const ListWhatIfForecastExportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WhatIfForecastExports: S.optional(WhatIfForecastExports),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWhatIfForecastExportsResponse",
}) as any as S.Schema<ListWhatIfForecastExportsResponse>;
export interface ListWhatIfForecastsRequest {
  NextToken?: string;
  MaxResults?: number;
  Filters?: Filter[];
}
export const ListWhatIfForecastsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListWhatIfForecastsRequest",
}) as any as S.Schema<ListWhatIfForecastsRequest>;
export interface WhatIfForecastSummary {
  WhatIfForecastArn?: string;
  WhatIfForecastName?: string;
  WhatIfAnalysisArn?: string;
  Status?: string;
  Message?: string;
  CreationTime?: Date;
  LastModificationTime?: Date;
}
export const WhatIfForecastSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WhatIfForecastArn: S.optional(S.String),
    WhatIfForecastName: S.optional(S.String),
    WhatIfAnalysisArn: S.optional(S.String),
    Status: S.optional(S.String),
    Message: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModificationTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "WhatIfForecastSummary",
}) as any as S.Schema<WhatIfForecastSummary>;
export type WhatIfForecasts = WhatIfForecastSummary[];
export const WhatIfForecasts = /*@__PURE__*/ S.Array(WhatIfForecastSummary);
export interface ListWhatIfForecastsResponse {
  WhatIfForecasts?: WhatIfForecastSummary[];
  NextToken?: string;
}
export const ListWhatIfForecastsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WhatIfForecasts: S.optional(WhatIfForecasts),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWhatIfForecastsResponse",
}) as any as S.Schema<ListWhatIfForecastsResponse>;
export interface ResumeResourceRequest {
  ResourceArn: string;
}
export const ResumeResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ResumeResourceRequest",
}) as any as S.Schema<ResumeResourceRequest>;
export interface ResumeResourceResponse {}
export const ResumeResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ResumeResourceResponse",
}) as any as S.Schema<ResumeResourceResponse>;
export interface StopResourceRequest {
  ResourceArn: string;
}
export const StopResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopResourceRequest",
}) as any as S.Schema<StopResourceRequest>;
export interface StopResourceResponse {}
export const StopResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopResourceResponse",
}) as any as S.Schema<StopResourceResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: Tags }).pipe(
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
export type TagKeys = (string | redacted.Redacted<string>)[];
export const TagKeys = /*@__PURE__*/ S.Array(SensitiveString);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: (string | redacted.Redacted<string>)[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeys }).pipe(
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
export interface UpdateDatasetGroupRequest {
  DatasetGroupArn: string;
  DatasetArns: string[];
}
export const UpdateDatasetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetGroupArn: S.String, DatasetArns: ArnList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDatasetGroupRequest",
}) as any as S.Schema<UpdateDatasetGroupRequest>;
export interface UpdateDatasetGroupResponse {}
export const UpdateDatasetGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateDatasetGroupResponse",
}) as any as S.Schema<UpdateDatasetGroupResponse>;
export type CreateAutoPredictorError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an Amazon Forecast predictor.
 *
 * Amazon Forecast creates predictors with AutoPredictor, which involves applying the
 * optimal combination of algorithms to each time series in your datasets. You can use
 * CreateAutoPredictor to create new predictors or upgrade/retrain
 * existing predictors.
 *
 * **Creating new predictors**
 *
 * The following parameters are required when creating a new predictor:
 *
 * - `PredictorName` - A unique name for the predictor.
 *
 * - `DatasetGroupArn` - The ARN of the dataset group used to train the
 * predictor.
 *
 * - `ForecastFrequency` - The granularity of your forecasts (hourly,
 * daily, weekly, etc).
 *
 * - `ForecastHorizon` - The number of time-steps that the model
 * predicts. The forecast horizon is also called the prediction length.
 *
 * When creating a new predictor, do not specify a value for
 * `ReferencePredictorArn`.
 *
 * **Upgrading and retraining predictors**
 *
 * The following parameters are required when retraining or upgrading a predictor:
 *
 * - `PredictorName` - A unique name for the predictor.
 *
 * - `ReferencePredictorArn` - The ARN of the predictor to retrain or
 * upgrade.
 *
 * When upgrading or retraining a predictor, only specify values for the
 * `ReferencePredictorArn` and `PredictorName`.
 */
export const createAutoPredictor: API.OperationMethod<
  CreateAutoPredictorRequest,
  CreateAutoPredictorResponse,
  CreateAutoPredictorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAutoPredictorRequest,
  output: CreateAutoPredictorResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutoPredictor",
}));

export type CreateDatasetError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | CommonErrors;
/**
 * Creates an Amazon Forecast dataset. The information about the dataset that you provide helps
 * Forecast understand how to consume the data for model training. This includes the
 * following:
 *
 * -
 * `DataFrequency`
 * - How frequently your historical
 * time-series data is collected.
 *
 * -
 * `Domain`
 * and
 *
 * `DatasetType`
 * - Each dataset has an associated dataset
 * domain and a type within the domain. Amazon Forecast provides a list of predefined domains and
 * types within each domain. For each unique dataset domain and type within the domain,
 * Amazon Forecast requires your data to include a minimum set of predefined fields.
 *
 * -
 * `Schema`
 * - A schema specifies the fields in the dataset,
 * including the field name and data type.
 *
 * After creating a dataset, you import your training data into it and add the dataset to a
 * dataset group. You use the dataset group to create a predictor. For more information, see
 * Importing datasets.
 *
 * To get a list of all your datasets, use the ListDatasets operation.
 *
 * For example Forecast datasets, see the Amazon Forecast Sample GitHub
 * repository.
 *
 * The `Status` of a dataset must be `ACTIVE` before you can import
 * training data. Use the DescribeDataset operation to get
 * the status.
 */
export const createDataset: API.OperationMethod<
  CreateDatasetRequest,
  CreateDatasetResponse,
  CreateDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatasetRequest,
  output: CreateDatasetResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDataset",
}));

export type CreateDatasetGroupError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a dataset group, which holds a collection of related datasets. You can add
 * datasets to the dataset group when you create the dataset group, or later by using the UpdateDatasetGroup operation.
 *
 * After creating a dataset group and adding datasets, you use the dataset group when you
 * create a predictor. For more information, see Dataset groups.
 *
 * To get a list of all your datasets groups, use the ListDatasetGroups
 * operation.
 *
 * The `Status` of a dataset group must be `ACTIVE` before you can
 * use the dataset group to create a predictor. To get the status, use the DescribeDatasetGroup operation.
 */
export const createDatasetGroup: API.OperationMethod<
  CreateDatasetGroupRequest,
  CreateDatasetGroupResponse,
  CreateDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatasetGroupRequest,
  output: CreateDatasetGroupResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetGroup",
}));

export type CreateDatasetImportJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Imports your training data to an Amazon Forecast dataset. You provide the location of your
 * training data in an Amazon Simple Storage Service (Amazon S3) bucket and the Amazon Resource Name (ARN) of the dataset
 * that you want to import the data to.
 *
 * You must specify a DataSource object that includes an
 * Identity and Access Management (IAM) role that Amazon Forecast can assume to access the data, as Amazon Forecast makes a copy
 * of your data and processes it in an internal Amazon Web Services system. For more information, see Set up
 * permissions.
 *
 * The training data must be in CSV or Parquet format. The delimiter must be a comma (,).
 *
 * You can specify the path to a specific file, the S3 bucket, or to a folder in the S3
 * bucket. For the latter two cases, Amazon Forecast imports all files up to the limit of 10,000
 * files.
 *
 * Because dataset imports are not aggregated, your most recent dataset import is the one
 * that is used when training a predictor or generating a forecast. Make sure that your most
 * recent dataset import contains all of the data you want to model off of, and not just the new
 * data collected since the previous import.
 *
 * To get a list of all your dataset import jobs, filtered by specified criteria, use the
 * ListDatasetImportJobs operation.
 */
export const createDatasetImportJob: API.OperationMethod<
  CreateDatasetImportJobRequest,
  CreateDatasetImportJobResponse,
  CreateDatasetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDatasetImportJobRequest,
  output: CreateDatasetImportJobResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDatasetImportJob",
}));

export type CreateExplainabilityError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Explainability is only available for Forecasts and Predictors generated from an
 * AutoPredictor (CreateAutoPredictor)
 *
 * Creates an Amazon Forecast Explainability.
 *
 * Explainability helps you better understand how the attributes in your datasets impact
 * forecast. Amazon Forecast uses a metric called Impact scores to quantify the relative
 * impact of each attribute and determine whether they increase or decrease forecast
 * values.
 *
 * To enable Forecast Explainability, your predictor must include at least one of the
 * following: related time series, item metadata, or additional datasets like Holidays and
 * the Weather Index.
 *
 * CreateExplainability accepts either a Predictor ARN or Forecast ARN. To receive
 * aggregated Impact scores for all time series and time points in your datasets, provide a
 * Predictor ARN. To receive Impact scores for specific time series and time points,
 * provide a Forecast ARN.
 *
 * **CreateExplainability with a Predictor ARN**
 *
 * You can only have one Explainability resource per predictor. If you already
 * enabled `ExplainPredictor` in CreateAutoPredictor, that
 * predictor already has an Explainability resource.
 *
 * The following parameters are required when providing a Predictor ARN:
 *
 * - `ExplainabilityName` - A unique name for the Explainability.
 *
 * - `ResourceArn` - The Arn of the predictor.
 *
 * - `TimePointGranularity` - Must be set to “ALL”.
 *
 * - `TimeSeriesGranularity` - Must be set to “ALL”.
 *
 * Do not specify a value for the following parameters:
 *
 * - `DataSource` - Only valid when TimeSeriesGranularity is
 * “SPECIFIC”.
 *
 * - `Schema` - Only valid when TimeSeriesGranularity is
 * “SPECIFIC”.
 *
 * - `StartDateTime` - Only valid when TimePointGranularity is
 * “SPECIFIC”.
 *
 * - `EndDateTime` - Only valid when TimePointGranularity is
 * “SPECIFIC”.
 *
 * **CreateExplainability with a Forecast ARN**
 *
 * You can specify a maximum of 50 time series and 500 time points.
 *
 * The following parameters are required when providing a Predictor ARN:
 *
 * - `ExplainabilityName` - A unique name for the Explainability.
 *
 * - `ResourceArn` - The Arn of the forecast.
 *
 * - `TimePointGranularity` - Either “ALL” or “SPECIFIC”.
 *
 * - `TimeSeriesGranularity` - Either “ALL” or “SPECIFIC”.
 *
 * If you set TimeSeriesGranularity to “SPECIFIC”, you must also provide the
 * following:
 *
 * - `DataSource` - The S3 location of the CSV file specifying your time
 * series.
 *
 * - `Schema` - The Schema defines the attributes and attribute types
 * listed in the Data Source.
 *
 * If you set TimePointGranularity to “SPECIFIC”, you must also provide the
 * following:
 *
 * - `StartDateTime` - The first timestamp in the range of time
 * points.
 *
 * - `EndDateTime` - The last timestamp in the range of time
 * points.
 */
export const createExplainability: API.OperationMethod<
  CreateExplainabilityRequest,
  CreateExplainabilityResponse,
  CreateExplainabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExplainabilityRequest,
  output: CreateExplainabilityResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExplainability",
}));

export type CreateExplainabilityExportError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Exports an Explainability resource created by the CreateExplainability operation. Exported files are exported to an Amazon Simple Storage Service (Amazon
 * S3) bucket.
 *
 * You must specify a DataDestination object that includes an Amazon S3
 * bucket and an Identity and Access Management (IAM) role that Amazon Forecast can assume to access the Amazon S3
 * bucket. For more information, see aws-forecast-iam-roles.
 *
 * The `Status` of the export job must be `ACTIVE` before you
 * can access the export in your Amazon S3 bucket. To get the status, use the DescribeExplainabilityExport operation.
 */
export const createExplainabilityExport: API.OperationMethod<
  CreateExplainabilityExportRequest,
  CreateExplainabilityExportResponse,
  CreateExplainabilityExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExplainabilityExportRequest,
  output: CreateExplainabilityExportResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExplainabilityExport",
}));

export type CreateForecastError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a forecast for each item in the `TARGET_TIME_SERIES` dataset that was
 * used to train the predictor. This is known as inference. To retrieve the forecast for a single
 * item at low latency, use the operation. To
 * export the complete forecast into your Amazon Simple Storage Service (Amazon S3) bucket, use the CreateForecastExportJob operation.
 *
 * The range of the forecast is determined by the `ForecastHorizon` value, which
 * you specify in the CreatePredictor request. When you query a forecast, you
 * can request a specific date range within the forecast.
 *
 * To get a list of all your forecasts, use the ListForecasts
 * operation.
 *
 * The forecasts generated by Amazon Forecast are in the same time zone as the dataset that was
 * used to create the predictor.
 *
 * For more information, see howitworks-forecast.
 *
 * The `Status` of the forecast must be `ACTIVE` before you can query
 * or export the forecast. Use the DescribeForecast operation to get the
 * status.
 *
 * By default, a forecast includes predictions for every item (`item_id`) in the dataset group that was used to train the predictor.
 * However, you can use the `TimeSeriesSelector` object to generate a forecast on a subset of time series. Forecast creation is skipped for any time series that you specify that are not in the input dataset. The forecast export file will not contain these time series or their forecasted values.
 */
export const createForecast: API.OperationMethod<
  CreateForecastRequest,
  CreateForecastResponse,
  CreateForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateForecastRequest,
  output: CreateForecastResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateForecast",
}));

export type CreateForecastExportJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Exports a forecast created by the CreateForecast operation to your
 * Amazon Simple Storage Service (Amazon S3) bucket. The forecast file name will match the following conventions:
 *
 * __
 *
 * where the component is in Java SimpleDateFormat
 * (yyyy-MM-ddTHH-mm-ssZ).
 *
 * You must specify a DataDestination object that includes an Identity and Access Management
 * (IAM) role that Amazon Forecast can assume to access the Amazon S3 bucket. For more information, see
 * aws-forecast-iam-roles.
 *
 * For more information, see howitworks-forecast.
 *
 * To get a list of all your forecast export jobs, use the ListForecastExportJobs operation.
 *
 * The `Status` of the forecast export job must be `ACTIVE` before
 * you can access the forecast in your Amazon S3 bucket. To get the status, use the DescribeForecastExportJob operation.
 */
export const createForecastExportJob: API.OperationMethod<
  CreateForecastExportJobRequest,
  CreateForecastExportJobResponse,
  CreateForecastExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateForecastExportJobRequest,
  output: CreateForecastExportJobResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateForecastExportJob",
}));

export type CreateMonitorError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates a predictor monitor resource for an existing auto predictor. Predictor monitoring allows you to see how your predictor's performance changes over time.
 * For more information, see Predictor Monitoring.
 */
export const createMonitor: API.OperationMethod<
  CreateMonitorRequest,
  CreateMonitorResponse,
  CreateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMonitorRequest,
  output: CreateMonitorResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMonitor",
}));

export type CreatePredictorError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation creates a legacy predictor that does not include all the predictor
 * functionalities provided by Amazon Forecast. To create a predictor that is compatible with all
 * aspects of Forecast, use CreateAutoPredictor.
 *
 * Creates an Amazon Forecast predictor.
 *
 * In the request, provide a dataset group and either specify an algorithm or let Amazon Forecast
 * choose an algorithm for you using AutoML. If you specify an algorithm, you also can override
 * algorithm-specific hyperparameters.
 *
 * Amazon Forecast uses the algorithm to train a predictor using the latest version of the datasets
 * in the specified dataset group. You can then generate a forecast using the CreateForecast operation.
 *
 * To see the evaluation metrics, use the GetAccuracyMetrics operation.
 *
 * You can specify a featurization configuration to fill and aggregate the data fields in the
 * `TARGET_TIME_SERIES` dataset to improve model training. For more information, see
 * FeaturizationConfig.
 *
 * For RELATED_TIME_SERIES datasets, `CreatePredictor` verifies that the
 * `DataFrequency` specified when the dataset was created matches the
 * `ForecastFrequency`. TARGET_TIME_SERIES datasets don't have this restriction.
 * Amazon Forecast also verifies the delimiter and timestamp format. For more information, see howitworks-datasets-groups.
 *
 * By default, predictors are trained and evaluated at the 0.1 (P10), 0.5 (P50), and 0.9
 * (P90) quantiles. You can choose custom forecast types to train and evaluate your predictor by
 * setting the `ForecastTypes`.
 *
 * **AutoML**
 *
 * If you want Amazon Forecast to evaluate each algorithm and choose the one that minimizes the
 * `objective function`, set `PerformAutoML` to `true`. The
 * `objective function` is defined as the mean of the weighted losses over the
 * forecast types. By default, these are the p10, p50, and p90 quantile losses. For more
 * information, see EvaluationResult.
 *
 * When AutoML is enabled, the following properties are disallowed:
 *
 * - `AlgorithmArn`
 *
 * - `HPOConfig`
 *
 * - `PerformHPO`
 *
 * - `TrainingParameters`
 *
 * To get a list of all of your predictors, use the ListPredictors
 * operation.
 *
 * Before you can use the predictor to create a forecast, the `Status` of the
 * predictor must be `ACTIVE`, signifying that training has completed. To get the
 * status, use the DescribePredictor operation.
 */
export const createPredictor: API.OperationMethod<
  CreatePredictorRequest,
  CreatePredictorResponse,
  CreatePredictorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePredictorRequest,
  output: CreatePredictorResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePredictor",
}));

export type CreatePredictorBacktestExportJobError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Exports backtest forecasts and accuracy metrics generated by the CreateAutoPredictor or CreatePredictor operations. Two
 * folders containing CSV or Parquet files are exported to your specified S3 bucket.
 *
 * The export file names will match the following conventions:
 *
 * `__.csv`
 *
 * The component is in Java SimpleDate format
 * (yyyy-MM-ddTHH-mm-ssZ).
 *
 * You must specify a DataDestination object that includes an Amazon S3
 * bucket and an Identity and Access Management (IAM) role that Amazon Forecast can assume to access the Amazon S3
 * bucket. For more information, see aws-forecast-iam-roles.
 *
 * The `Status` of the export job must be `ACTIVE` before you
 * can access the export in your Amazon S3 bucket. To get the status, use the DescribePredictorBacktestExportJob operation.
 */
export const createPredictorBacktestExportJob: API.OperationMethod<
  CreatePredictorBacktestExportJobRequest,
  CreatePredictorBacktestExportJobResponse,
  CreatePredictorBacktestExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePredictorBacktestExportJobRequest,
  output: CreatePredictorBacktestExportJobResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePredictorBacktestExportJob",
}));

export type CreateWhatIfAnalysisError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * What-if analysis is a scenario modeling technique where you make a hypothetical change to a time series and
 * compare the forecasts generated by these changes against the baseline, unchanged time series. It is important to
 * remember that the purpose of a what-if analysis is to understand how a forecast can change given different
 * modifications to the baseline time series.
 *
 * For example, imagine you are a clothing retailer who is considering an end of season sale
 * to clear space for new styles. After creating a baseline forecast, you can use a what-if
 * analysis to investigate how different sales tactics might affect your goals.
 *
 * You could create a scenario where everything is given a 25% markdown, and another where
 * everything is given a fixed dollar markdown. You could create a scenario where the sale lasts for one week and
 * another where the sale lasts for one month.
 * With a what-if analysis, you can compare many different scenarios against each other.
 *
 * Note that a what-if analysis is meant to display what the forecasting model has learned and how it will behave in the scenarios that you are evaluating. Do not blindly use the results of the what-if analysis to make business decisions. For instance, forecasts might not be accurate for novel scenarios where there is no reference available to determine whether a forecast is good.
 *
 * The TimeSeriesSelector object defines the items that you want in the what-if analysis.
 */
export const createWhatIfAnalysis: API.OperationMethod<
  CreateWhatIfAnalysisRequest,
  CreateWhatIfAnalysisResponse,
  CreateWhatIfAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWhatIfAnalysisRequest,
  output: CreateWhatIfAnalysisResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatIfAnalysis",
}));

export type CreateWhatIfForecastError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * A what-if forecast is a forecast that is created from a modified version of the baseline forecast. Each
 * what-if forecast incorporates either a replacement dataset or a set of transformations to the original dataset.
 */
export const createWhatIfForecast: API.OperationMethod<
  CreateWhatIfForecastRequest,
  CreateWhatIfForecastResponse,
  CreateWhatIfForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWhatIfForecastRequest,
  output: CreateWhatIfForecastResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatIfForecast",
}));

export type CreateWhatIfForecastExportError =
  | InvalidInputException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Exports a forecast created by the CreateWhatIfForecast operation to your
 * Amazon Simple Storage Service (Amazon S3) bucket. The forecast file name will match the following conventions:
 *
 * `≈__`
 *
 * The component is in Java SimpleDateFormat
 * (yyyy-MM-ddTHH-mm-ssZ).
 *
 * You must specify a DataDestination object that includes an Identity and Access Management
 * (IAM) role that Amazon Forecast can assume to access the Amazon S3 bucket. For more information, see
 * aws-forecast-iam-roles.
 *
 * For more information, see howitworks-forecast.
 *
 * To get a list of all your what-if forecast export jobs, use the ListWhatIfForecastExports
 * operation.
 *
 * The `Status` of the forecast export job must be `ACTIVE` before
 * you can access the forecast in your Amazon S3 bucket. To get the status, use the DescribeWhatIfForecastExport operation.
 */
export const createWhatIfForecastExport: API.OperationMethod<
  CreateWhatIfForecastExportRequest,
  CreateWhatIfForecastExportResponse,
  CreateWhatIfForecastExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWhatIfForecastExportRequest,
  output: CreateWhatIfForecastExportResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWhatIfForecastExport",
}));

export type DeleteDatasetError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Amazon Forecast dataset that was created using the CreateDataset operation. You can
 * only delete datasets that have a status of `ACTIVE` or `CREATE_FAILED`.
 * To get the status use the DescribeDataset operation.
 *
 * Forecast does not automatically update any dataset groups that contain the deleted dataset.
 * In order to update the dataset group, use the UpdateDatasetGroup operation,
 * omitting the deleted dataset's ARN.
 */
export const deleteDataset: API.OperationMethod<
  DeleteDatasetRequest,
  DeleteDatasetResponse,
  DeleteDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDatasetRequest,
  output: DeleteDatasetResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDataset",
}));

export type DeleteDatasetGroupError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a dataset group created using the CreateDatasetGroup operation.
 * You can only delete dataset groups that have a status of `ACTIVE`,
 * `CREATE_FAILED`, or `UPDATE_FAILED`. To get the status, use the DescribeDatasetGroup operation.
 *
 * This operation deletes only the dataset group, not the datasets in the group.
 */
export const deleteDatasetGroup: API.OperationMethod<
  DeleteDatasetGroupRequest,
  DeleteDatasetGroupResponse,
  DeleteDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDatasetGroupRequest,
  output: DeleteDatasetGroupResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDatasetGroup",
}));

export type DeleteDatasetImportJobError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a dataset import job created using the CreateDatasetImportJob
 * operation. You can delete only dataset import jobs that have a status of `ACTIVE`
 * or `CREATE_FAILED`. To get the status, use the DescribeDatasetImportJob
 * operation.
 */
export const deleteDatasetImportJob: API.OperationMethod<
  DeleteDatasetImportJobRequest,
  DeleteDatasetImportJobResponse,
  DeleteDatasetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDatasetImportJobRequest,
  output: DeleteDatasetImportJobResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDatasetImportJob",
}));

export type DeleteExplainabilityError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Explainability resource.
 *
 * You can delete only predictor that have a status of `ACTIVE` or
 * `CREATE_FAILED`. To get the status, use the DescribeExplainability operation.
 */
export const deleteExplainability: API.OperationMethod<
  DeleteExplainabilityRequest,
  DeleteExplainabilityResponse,
  DeleteExplainabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteExplainabilityRequest,
  output: DeleteExplainabilityResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExplainability",
}));

export type DeleteExplainabilityExportError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Explainability export.
 */
export const deleteExplainabilityExport: API.OperationMethod<
  DeleteExplainabilityExportRequest,
  DeleteExplainabilityExportResponse,
  DeleteExplainabilityExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteExplainabilityExportRequest,
  output: DeleteExplainabilityExportResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExplainabilityExport",
}));

export type DeleteForecastError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a forecast created using the CreateForecast operation. You can
 * delete only forecasts that have a status of `ACTIVE` or `CREATE_FAILED`.
 * To get the status, use the DescribeForecast operation.
 *
 * You can't delete a forecast while it is being exported. After a forecast is deleted, you
 * can no longer query the forecast.
 */
export const deleteForecast: API.OperationMethod<
  DeleteForecastRequest,
  DeleteForecastResponse,
  DeleteForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteForecastRequest,
  output: DeleteForecastResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteForecast",
}));

export type DeleteForecastExportJobError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a forecast export job created using the CreateForecastExportJob
 * operation. You can delete only export jobs that have a status of `ACTIVE` or
 * `CREATE_FAILED`. To get the status, use the DescribeForecastExportJob operation.
 */
export const deleteForecastExportJob: API.OperationMethod<
  DeleteForecastExportJobRequest,
  DeleteForecastExportJobResponse,
  DeleteForecastExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteForecastExportJobRequest,
  output: DeleteForecastExportJobResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteForecastExportJob",
}));

export type DeleteMonitorError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a monitor resource. You can only delete a monitor resource with a status of `ACTIVE`, `ACTIVE_STOPPED`, `CREATE_FAILED`, or `CREATE_STOPPED`.
 */
export const deleteMonitor: API.OperationMethod<
  DeleteMonitorRequest,
  DeleteMonitorResponse,
  DeleteMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMonitorRequest,
  output: DeleteMonitorResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMonitor",
}));

export type DeletePredictorError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a predictor created using the DescribePredictor or CreatePredictor operations. You can delete only predictor that have a status of
 * `ACTIVE` or `CREATE_FAILED`. To get the status, use the DescribePredictor operation.
 */
export const deletePredictor: API.OperationMethod<
  DeletePredictorRequest,
  DeletePredictorResponse,
  DeletePredictorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePredictorRequest,
  output: DeletePredictorResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePredictor",
}));

export type DeletePredictorBacktestExportJobError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a predictor backtest export job.
 */
export const deletePredictorBacktestExportJob: API.OperationMethod<
  DeletePredictorBacktestExportJobRequest,
  DeletePredictorBacktestExportJobResponse,
  DeletePredictorBacktestExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePredictorBacktestExportJobRequest,
  output: DeletePredictorBacktestExportJobResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePredictorBacktestExportJob",
}));

export type DeleteResourceTreeError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an entire resource tree. This operation will delete the parent resource and
 * its child resources.
 *
 * Child resources are resources that were created from another resource. For example,
 * when a forecast is generated from a predictor, the forecast is the child resource and
 * the predictor is the parent resource.
 *
 * Amazon Forecast resources possess the following parent-child resource hierarchies:
 *
 * - **Dataset**: dataset import jobs
 *
 * - **Dataset Group**: predictors, predictor backtest
 * export jobs, forecasts, forecast export jobs
 *
 * - **Predictor**: predictor backtest export jobs,
 * forecasts, forecast export jobs
 *
 * - **Forecast**: forecast export jobs
 *
 * `DeleteResourceTree` will only delete Amazon Forecast resources, and will not
 * delete datasets or exported files stored in Amazon S3.
 */
export const deleteResourceTree: API.OperationMethod<
  DeleteResourceTreeRequest,
  DeleteResourceTreeResponse,
  DeleteResourceTreeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourceTreeRequest,
  output: DeleteResourceTreeResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceTree",
}));

export type DeleteWhatIfAnalysisError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a what-if analysis created using the CreateWhatIfAnalysis
 * operation. You can delete only what-if analyses that have a status of `ACTIVE` or `CREATE_FAILED`. To get the status, use the DescribeWhatIfAnalysis operation.
 *
 * You can't delete a what-if analysis while any of its forecasts are being exported.
 */
export const deleteWhatIfAnalysis: API.OperationMethod<
  DeleteWhatIfAnalysisRequest,
  DeleteWhatIfAnalysisResponse,
  DeleteWhatIfAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWhatIfAnalysisRequest,
  output: DeleteWhatIfAnalysisResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatIfAnalysis",
}));

export type DeleteWhatIfForecastError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a what-if forecast created using the CreateWhatIfForecast
 * operation. You can delete only what-if forecasts that have a status of `ACTIVE` or `CREATE_FAILED`. To get the status, use the DescribeWhatIfForecast operation.
 *
 * You can't delete a what-if forecast while it is being exported. After a what-if forecast is deleted, you can no longer query the what-if analysis.
 */
export const deleteWhatIfForecast: API.OperationMethod<
  DeleteWhatIfForecastRequest,
  DeleteWhatIfForecastResponse,
  DeleteWhatIfForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWhatIfForecastRequest,
  output: DeleteWhatIfForecastResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatIfForecast",
}));

export type DeleteWhatIfForecastExportError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a what-if forecast export created using the CreateWhatIfForecastExport
 * operation. You can delete only what-if forecast exports that have a status of `ACTIVE` or `CREATE_FAILED`. To get the status, use the DescribeWhatIfForecastExport operation.
 */
export const deleteWhatIfForecastExport: API.OperationMethod<
  DeleteWhatIfForecastExportRequest,
  DeleteWhatIfForecastExportResponse,
  DeleteWhatIfForecastExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWhatIfForecastExportRequest,
  output: DeleteWhatIfForecastExportResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWhatIfForecastExport",
}));

export type DescribeAutoPredictorError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a predictor created using the CreateAutoPredictor operation.
 */
export const describeAutoPredictor: API.OperationMethod<
  DescribeAutoPredictorRequest,
  DescribeAutoPredictorResponse,
  DescribeAutoPredictorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAutoPredictorRequest,
  output: DescribeAutoPredictorResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAutoPredictor",
}));

export type DescribeDatasetError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes an Amazon Forecast dataset created using the CreateDataset operation.
 *
 * In addition to listing the parameters specified in the `CreateDataset` request,
 * this operation includes the following dataset properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Status`
 */
export const describeDataset: API.OperationMethod<
  DescribeDatasetRequest,
  DescribeDatasetResponse,
  DescribeDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDatasetRequest,
  output: DescribeDatasetResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDataset",
}));

export type DescribeDatasetGroupError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a dataset group created using the CreateDatasetGroup
 * operation.
 *
 * In addition to listing the parameters provided in the `CreateDatasetGroup`
 * request, this operation includes the following properties:
 *
 * - `DatasetArns` - The datasets belonging to the group.
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Status`
 */
export const describeDatasetGroup: API.OperationMethod<
  DescribeDatasetGroupRequest,
  DescribeDatasetGroupResponse,
  DescribeDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDatasetGroupRequest,
  output: DescribeDatasetGroupResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetGroup",
}));

export type DescribeDatasetImportJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a dataset import job created using the CreateDatasetImportJob
 * operation.
 *
 * In addition to listing the parameters provided in the `CreateDatasetImportJob`
 * request, this operation includes the following properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `DataSize`
 *
 * - `FieldStatistics`
 *
 * - `Status`
 *
 * - `Message` - If an error occurred, information about the error.
 */
export const describeDatasetImportJob: API.OperationMethod<
  DescribeDatasetImportJobRequest,
  DescribeDatasetImportJobResponse,
  DescribeDatasetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDatasetImportJobRequest,
  output: DescribeDatasetImportJobResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDatasetImportJob",
}));

export type DescribeExplainabilityError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes an Explainability resource created using the CreateExplainability operation.
 */
export const describeExplainability: API.OperationMethod<
  DescribeExplainabilityRequest,
  DescribeExplainabilityResponse,
  DescribeExplainabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeExplainabilityRequest,
  output: DescribeExplainabilityResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExplainability",
}));

export type DescribeExplainabilityExportError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes an Explainability export created using the CreateExplainabilityExport operation.
 */
export const describeExplainabilityExport: API.OperationMethod<
  DescribeExplainabilityExportRequest,
  DescribeExplainabilityExportResponse,
  DescribeExplainabilityExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeExplainabilityExportRequest,
  output: DescribeExplainabilityExportResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExplainabilityExport",
}));

export type DescribeForecastError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a forecast created using the CreateForecast operation.
 *
 * In addition to listing the properties provided in the `CreateForecast` request,
 * this operation lists the following properties:
 *
 * - `DatasetGroupArn` - The dataset group that provided the training
 * data.
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Status`
 *
 * - `Message` - If an error occurred, information about the error.
 */
export const describeForecast: API.OperationMethod<
  DescribeForecastRequest,
  DescribeForecastResponse,
  DescribeForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeForecastRequest,
  output: DescribeForecastResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeForecast",
}));

export type DescribeForecastExportJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a forecast export job created using the CreateForecastExportJob operation.
 *
 * In addition to listing the properties provided by the user in the
 * `CreateForecastExportJob` request, this operation lists the following
 * properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Status`
 *
 * - `Message` - If an error occurred, information about the error.
 */
export const describeForecastExportJob: API.OperationMethod<
  DescribeForecastExportJobRequest,
  DescribeForecastExportJobResponse,
  DescribeForecastExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeForecastExportJobRequest,
  output: DescribeForecastExportJobResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeForecastExportJob",
}));

export type DescribeMonitorError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a monitor resource. In addition to listing the properties provided in the CreateMonitor request, this operation lists the following properties:
 *
 * - `Baseline`
 *
 * - `CreationTime`
 *
 * - `LastEvaluationTime`
 *
 * - `LastEvaluationState`
 *
 * - `LastModificationTime`
 *
 * - `Message`
 *
 * - `Status`
 */
export const describeMonitor: API.OperationMethod<
  DescribeMonitorRequest,
  DescribeMonitorResponse,
  DescribeMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMonitorRequest,
  output: DescribeMonitorResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMonitor",
}));

export type DescribePredictorError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation is only valid for legacy predictors created with CreatePredictor. If you
 * are not using a legacy predictor, use DescribeAutoPredictor.
 *
 * Describes a predictor created using the CreatePredictor
 * operation.
 *
 * In addition to listing the properties provided in the `CreatePredictor`
 * request, this operation lists the following properties:
 *
 * - `DatasetImportJobArns` - The dataset import jobs used to import training
 * data.
 *
 * - `AutoMLAlgorithmArns` - If AutoML is performed, the algorithms that were
 * evaluated.
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Status`
 *
 * - `Message` - If an error occurred, information about the error.
 */
export const describePredictor: API.OperationMethod<
  DescribePredictorRequest,
  DescribePredictorResponse,
  DescribePredictorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePredictorRequest,
  output: DescribePredictorResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePredictor",
}));

export type DescribePredictorBacktestExportJobError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes a predictor backtest export job created using the CreatePredictorBacktestExportJob operation.
 *
 * In addition to listing the properties provided by the user in the
 * `CreatePredictorBacktestExportJob` request, this operation lists the
 * following properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Status`
 *
 * - `Message` (if an error occurred)
 */
export const describePredictorBacktestExportJob: API.OperationMethod<
  DescribePredictorBacktestExportJobRequest,
  DescribePredictorBacktestExportJobResponse,
  DescribePredictorBacktestExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePredictorBacktestExportJobRequest,
  output: DescribePredictorBacktestExportJobResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePredictorBacktestExportJob",
}));

export type DescribeWhatIfAnalysisError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the what-if analysis created using the CreateWhatIfAnalysis operation.
 *
 * In addition to listing the properties provided in the `CreateWhatIfAnalysis` request, this operation lists the following properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Message` - If an error occurred, information about the error.
 *
 * - `Status`
 */
export const describeWhatIfAnalysis: API.OperationMethod<
  DescribeWhatIfAnalysisRequest,
  DescribeWhatIfAnalysisResponse,
  DescribeWhatIfAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWhatIfAnalysisRequest,
  output: DescribeWhatIfAnalysisResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWhatIfAnalysis",
}));

export type DescribeWhatIfForecastError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the what-if forecast created using the CreateWhatIfForecast operation.
 *
 * In addition to listing the properties provided in the `CreateWhatIfForecast` request, this operation lists the following properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Message` - If an error occurred, information about the error.
 *
 * - `Status`
 */
export const describeWhatIfForecast: API.OperationMethod<
  DescribeWhatIfForecastRequest,
  DescribeWhatIfForecastResponse,
  DescribeWhatIfForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWhatIfForecastRequest,
  output: DescribeWhatIfForecastResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWhatIfForecast",
}));

export type DescribeWhatIfForecastExportError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the what-if forecast export created using the CreateWhatIfForecastExport operation.
 *
 * In addition to listing the properties provided in the `CreateWhatIfForecastExport` request, this operation lists the following properties:
 *
 * - `CreationTime`
 *
 * - `LastModificationTime`
 *
 * - `Message` - If an error occurred, information about the error.
 *
 * - `Status`
 */
export const describeWhatIfForecastExport: API.OperationMethod<
  DescribeWhatIfForecastExportRequest,
  DescribeWhatIfForecastExportResponse,
  DescribeWhatIfForecastExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWhatIfForecastExportRequest,
  output: DescribeWhatIfForecastExportResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWhatIfForecastExport",
}));

export type GetAccuracyMetricsError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provides metrics on the accuracy of the models that were trained by the CreatePredictor operation. Use metrics to see how well the model performed and
 * to decide whether to use the predictor to generate a forecast. For more information, see
 * Predictor
 * Metrics.
 *
 * This operation generates metrics for each backtest window that was evaluated. The number
 * of backtest windows (`NumberOfBacktestWindows`) is specified using the EvaluationParameters object, which is optionally included in the
 * `CreatePredictor` request. If `NumberOfBacktestWindows` isn't
 * specified, the number defaults to one.
 *
 * The parameters of the `filling` method determine which items contribute to the
 * metrics. If you want all items to contribute, specify `zero`. If you want only
 * those items that have complete data in the range being evaluated to contribute, specify
 * `nan`. For more information, see FeaturizationMethod.
 *
 * Before you can get accuracy metrics, the `Status` of the predictor must be
 * `ACTIVE`, signifying that training has completed. To get the status, use the
 * DescribePredictor operation.
 */
export const getAccuracyMetrics: API.OperationMethod<
  GetAccuracyMetricsRequest,
  GetAccuracyMetricsResponse,
  GetAccuracyMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccuracyMetricsRequest,
  output: GetAccuracyMetricsResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccuracyMetrics",
}));

export type ListDatasetGroupsError = InvalidNextTokenException | CommonErrors;
/**
 * Returns a list of dataset groups created using the CreateDatasetGroup operation.
 * For each dataset group, this operation returns a summary of its properties, including its
 * Amazon Resource Name (ARN). You can retrieve the complete set of properties by using the
 * dataset group ARN with the DescribeDatasetGroup
 * operation.
 */
export const listDatasetGroups: API.PaginatedOperationMethod<
  ListDatasetGroupsRequest,
  ListDatasetGroupsResponse,
  ListDatasetGroupsError,
  Credentials | HttpClient.HttpClient,
  DatasetGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetGroupsRequest,
  output: ListDatasetGroupsResponse,
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatasetGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatasetImportJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of dataset import jobs created using the CreateDatasetImportJob
 * operation. For each import job, this operation returns a summary of its properties, including
 * its Amazon Resource Name (ARN). You can retrieve the complete set of properties by using the
 * ARN with the DescribeDatasetImportJob
 * operation. You can filter the list by providing an array of Filter objects.
 */
export const listDatasetImportJobs: API.PaginatedOperationMethod<
  ListDatasetImportJobsRequest,
  ListDatasetImportJobsResponse,
  ListDatasetImportJobsError,
  Credentials | HttpClient.HttpClient,
  DatasetImportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetImportJobsRequest,
  output: ListDatasetImportJobsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasetImportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DatasetImportJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDatasetsError = InvalidNextTokenException | CommonErrors;
/**
 * Returns a list of datasets created using the CreateDataset operation. For each
 * dataset, a summary of its properties, including its Amazon Resource Name (ARN), is returned.
 * To retrieve the complete set of properties, use the ARN with the DescribeDataset operation.
 */
export const listDatasets: API.PaginatedOperationMethod<
  ListDatasetsRequest,
  ListDatasetsResponse,
  ListDatasetsError,
  Credentials | HttpClient.HttpClient,
  DatasetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDatasetsRequest,
  output: ListDatasetsResponse,
  errors: [InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDatasets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Datasets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExplainabilitiesError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of Explainability resources created using the CreateExplainability operation. This operation returns a summary for
 * each Explainability. You can filter the list using an array of Filter
 * objects.
 *
 * To retrieve the complete set of properties for a particular Explainability resource,
 * use the ARN with the DescribeExplainability operation.
 */
export const listExplainabilities: API.PaginatedOperationMethod<
  ListExplainabilitiesRequest,
  ListExplainabilitiesResponse,
  ListExplainabilitiesError,
  Credentials | HttpClient.HttpClient,
  ExplainabilitySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExplainabilitiesRequest,
  output: ListExplainabilitiesResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExplainabilities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Explainabilities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListExplainabilityExportsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of Explainability exports created using the CreateExplainabilityExport operation. This operation returns a summary
 * for each Explainability export. You can filter the list using an array of Filter objects.
 *
 * To retrieve the complete set of properties for a particular Explainability export, use
 * the ARN with the DescribeExplainability operation.
 */
export const listExplainabilityExports: API.PaginatedOperationMethod<
  ListExplainabilityExportsRequest,
  ListExplainabilityExportsResponse,
  ListExplainabilityExportsError,
  Credentials | HttpClient.HttpClient,
  ExplainabilityExportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExplainabilityExportsRequest,
  output: ListExplainabilityExportsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExplainabilityExports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExplainabilityExports",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListForecastExportJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of forecast export jobs created using the CreateForecastExportJob operation. For each forecast export job, this operation
 * returns a summary of its properties, including its Amazon Resource Name (ARN). To retrieve the
 * complete set of properties, use the ARN with the DescribeForecastExportJob
 * operation. You can filter the list using an array of Filter objects.
 */
export const listForecastExportJobs: API.PaginatedOperationMethod<
  ListForecastExportJobsRequest,
  ListForecastExportJobsResponse,
  ListForecastExportJobsError,
  Credentials | HttpClient.HttpClient,
  ForecastExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListForecastExportJobsRequest,
  output: ListForecastExportJobsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListForecastExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ForecastExportJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListForecastsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of forecasts created using the CreateForecast operation.
 * For each forecast, this operation returns a summary of its properties, including its Amazon
 * Resource Name (ARN). To retrieve the complete set of properties, specify the ARN with the
 * DescribeForecast operation. You can filter the list using an array of
 * Filter objects.
 */
export const listForecasts: API.PaginatedOperationMethod<
  ListForecastsRequest,
  ListForecastsResponse,
  ListForecastsError,
  Credentials | HttpClient.HttpClient,
  ForecastSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListForecastsRequest,
  output: ListForecastsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListForecasts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Forecasts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMonitorEvaluationsError =
  | InvalidInputException
  | InvalidNextTokenException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of the monitoring evaluation results and predictor events collected by
 * the monitor resource during different windows of time.
 *
 * For information about monitoring see predictor-monitoring. For
 * more information about retrieving monitoring results see Viewing Monitoring Results.
 */
export const listMonitorEvaluations: API.PaginatedOperationMethod<
  ListMonitorEvaluationsRequest,
  ListMonitorEvaluationsResponse,
  ListMonitorEvaluationsError,
  Credentials | HttpClient.HttpClient,
  PredictorMonitorEvaluation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMonitorEvaluationsRequest,
  output: ListMonitorEvaluationsResponse,
  errors: [
    InvalidInputException,
    InvalidNextTokenException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitorEvaluations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PredictorMonitorEvaluations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMonitorsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of monitors created with the CreateMonitor operation and CreateAutoPredictor operation. For each monitor resource, this operation returns of a summary of its properties, including its Amazon Resource Name (ARN). You
 * can retrieve a complete set of properties of a monitor resource by specify the monitor's ARN in the DescribeMonitor operation.
 */
export const listMonitors: API.PaginatedOperationMethod<
  ListMonitorsRequest,
  ListMonitorsResponse,
  ListMonitorsError,
  Credentials | HttpClient.HttpClient,
  MonitorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMonitorsRequest,
  output: ListMonitorsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMonitors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Monitors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPredictorBacktestExportJobsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of predictor backtest export jobs created using the CreatePredictorBacktestExportJob operation. This operation returns a
 * summary for each backtest export job. You can filter the list using an array of Filter objects.
 *
 * To retrieve the complete set of properties for a particular backtest export job, use
 * the ARN with the DescribePredictorBacktestExportJob operation.
 */
export const listPredictorBacktestExportJobs: API.PaginatedOperationMethod<
  ListPredictorBacktestExportJobsRequest,
  ListPredictorBacktestExportJobsResponse,
  ListPredictorBacktestExportJobsError,
  Credentials | HttpClient.HttpClient,
  PredictorBacktestExportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPredictorBacktestExportJobsRequest,
  output: ListPredictorBacktestExportJobsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPredictorBacktestExportJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PredictorBacktestExportJobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPredictorsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of predictors created using the CreateAutoPredictor or
 * CreatePredictor operations. For each predictor, this operation returns a
 * summary of its properties, including its Amazon Resource Name (ARN).
 *
 * You can retrieve the complete set of properties by using the ARN with the DescribeAutoPredictor and DescribePredictor operations. You
 * can filter the list using an array of Filter objects.
 */
export const listPredictors: API.PaginatedOperationMethod<
  ListPredictorsRequest,
  ListPredictorsResponse,
  ListPredictorsError,
  Credentials | HttpClient.HttpClient,
  PredictorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPredictorsRequest,
  output: ListPredictorsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPredictors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Predictors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the tags for an Amazon Forecast resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWhatIfAnalysesError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of what-if analyses created using the CreateWhatIfAnalysis operation. For each what-if analysis, this operation returns a summary of its properties, including its Amazon Resource Name (ARN). You can retrieve the complete set of properties by using the what-if analysis ARN with the DescribeWhatIfAnalysis operation.
 */
export const listWhatIfAnalyses: API.PaginatedOperationMethod<
  ListWhatIfAnalysesRequest,
  ListWhatIfAnalysesResponse,
  ListWhatIfAnalysesError,
  Credentials | HttpClient.HttpClient,
  WhatIfAnalysisSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWhatIfAnalysesRequest,
  output: ListWhatIfAnalysesResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatIfAnalyses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WhatIfAnalyses",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWhatIfForecastExportsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of what-if forecast exports created using the CreateWhatIfForecastExport operation. For each what-if forecast export, this operation returns a summary of its properties, including its Amazon Resource Name (ARN). You can retrieve the complete set of properties by using the what-if forecast export ARN with the DescribeWhatIfForecastExport operation.
 */
export const listWhatIfForecastExports: API.PaginatedOperationMethod<
  ListWhatIfForecastExportsRequest,
  ListWhatIfForecastExportsResponse,
  ListWhatIfForecastExportsError,
  Credentials | HttpClient.HttpClient,
  WhatIfForecastExportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWhatIfForecastExportsRequest,
  output: ListWhatIfForecastExportsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatIfForecastExports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WhatIfForecastExports",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWhatIfForecastsError =
  | InvalidInputException
  | InvalidNextTokenException
  | CommonErrors;
/**
 * Returns a list of what-if forecasts created using the CreateWhatIfForecast operation. For each what-if forecast, this operation returns a summary of its properties, including its Amazon Resource Name (ARN). You can retrieve the complete set of properties by using the what-if forecast ARN with the DescribeWhatIfForecast operation.
 */
export const listWhatIfForecasts: API.PaginatedOperationMethod<
  ListWhatIfForecastsRequest,
  ListWhatIfForecastsResponse,
  ListWhatIfForecastsError,
  Credentials | HttpClient.HttpClient,
  WhatIfForecastSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWhatIfForecastsRequest,
  output: ListWhatIfForecastsResponse,
  errors: [InvalidInputException, InvalidNextTokenException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWhatIfForecasts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WhatIfForecasts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ResumeResourceError =
  | InvalidInputException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Resumes a stopped monitor resource.
 */
export const resumeResource: API.OperationMethod<
  ResumeResourceRequest,
  ResumeResourceResponse,
  ResumeResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResumeResourceRequest,
  output: ResumeResourceResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeResource",
}));

export type StopResourceError =
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Stops a resource.
 *
 * The resource undergoes the following states: `CREATE_STOPPING` and
 * `CREATE_STOPPED`. You cannot resume a resource once it has been
 * stopped.
 *
 * This operation can be applied to the following resources (and their corresponding child
 * resources):
 *
 * - Dataset Import Job
 *
 * - Predictor Job
 *
 * - Forecast Job
 *
 * - Forecast Export Job
 *
 * - Predictor Backtest Export Job
 *
 * - Explainability Job
 *
 * - Explainability Export Job
 */
export const stopResource: API.OperationMethod<
  StopResourceRequest,
  StopResourceResponse,
  StopResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopResourceRequest,
  output: StopResourceResponse,
  errors: [
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopResource",
}));

export type TagResourceError =
  | InvalidInputException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates the specified tags to a resource with the specified `resourceArn`.
 * If existing tags on a resource are not specified in the request parameters, they are not
 * changed. When a resource is deleted, the tags associated with that resource are also
 * deleted.
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
    InvalidInputException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [InvalidInputException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDatasetGroupError =
  | InvalidInputException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Replaces the datasets in a dataset group with the specified datasets.
 *
 * The `Status` of the dataset group must be `ACTIVE` before you can
 * use the dataset group to create a predictor. Use the DescribeDatasetGroup
 * operation to get the status.
 */
export const updateDatasetGroup: API.OperationMethod<
  UpdateDatasetGroupRequest,
  UpdateDatasetGroupResponse,
  UpdateDatasetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDatasetGroupRequest,
  output: UpdateDatasetGroupResponse,
  errors: [
    InvalidInputException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDatasetGroup",
}));
