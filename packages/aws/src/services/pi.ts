import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString } from "../sensitive.ts";
const ns = T.XmlNamespace("http://pi.amazonaws.com/doc/2018-02-27/");
const svc = T.AwsApiService({
  sdkId: "PI",
  serviceShapeName: "PerformanceInsightsv20180227",
});
const auth = T.AwsAuthSigv4({ name: "pi" });
const ver = T.ServiceVersion("2018-02-27");
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
              `https://pi-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://pi-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://pi.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://pi.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class InternalServiceError
  extends /*@__PURE__*/ S.TaggedError<InternalServiceError>()(
    "InternalServiceError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()(
    "InvalidArgumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class NotAuthorizedException
  extends /*@__PURE__*/ S.TaggedError<NotAuthorizedException>()(
    "NotAuthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type ServiceType = "RDS" | "DOCDB" | (string & {});
export const ServiceType = S.String;

export type IdentifierString = string;
export type ISOTimestamp = Date;
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
export interface CreatePerformanceAnalysisReportRequest {
  ServiceType: ServiceType;
  Identifier: string;
  StartTime: Date;
  EndTime?: Date;
  Tags?: Tag[];
}
export const CreatePerformanceAnalysisReportRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServiceType: ServiceType,
      Identifier: S.String,
      StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      Tags: S.optional(TagList),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePerformanceAnalysisReportRequest",
}) as any as S.Schema<CreatePerformanceAnalysisReportRequest>;
export type AnalysisReportId = string;
export interface CreatePerformanceAnalysisReportResponse {
  AnalysisReportId?: string;
}
export const CreatePerformanceAnalysisReportResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ AnalysisReportId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreatePerformanceAnalysisReportResponse",
}) as any as S.Schema<CreatePerformanceAnalysisReportResponse>;
export interface DeletePerformanceAnalysisReportRequest {
  ServiceType: ServiceType;
  Identifier: string;
  AnalysisReportId: string;
}
export const DeletePerformanceAnalysisReportRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServiceType: ServiceType,
      Identifier: S.String,
      AnalysisReportId: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeletePerformanceAnalysisReportRequest",
}) as any as S.Schema<DeletePerformanceAnalysisReportRequest>;
export interface DeletePerformanceAnalysisReportResponse {}
export const DeletePerformanceAnalysisReportResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeletePerformanceAnalysisReportResponse",
}) as any as S.Schema<DeletePerformanceAnalysisReportResponse>;
export type RequestString = string;
export type SanitizedString = string;
export type SanitizedStringList = string[];
export const SanitizedStringList = /*@__PURE__*/ S.Array(S.String);
export type Limit = number;
export interface DimensionGroup {
  Group: string;
  Dimensions?: string[];
  Limit?: number;
}
export const DimensionGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Group: S.String,
    Dimensions: S.optional(SanitizedStringList),
    Limit: S.optional(S.Number),
  }),
).annotate({ identifier: "DimensionGroup" }) as any as S.Schema<DimensionGroup>;
export type AdditionalMetricsList = string[];
export const AdditionalMetricsList = /*@__PURE__*/ S.Array(S.String);
export type MetricQueryFilterMap = { [key: string]: string | undefined };
export const MetricQueryFilterMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type MaxResults = number;
export type NextToken = string;
export interface DescribeDimensionKeysRequest {
  ServiceType: ServiceType;
  Identifier: string;
  StartTime: Date;
  EndTime: Date;
  Metric: string;
  PeriodInSeconds?: number;
  GroupBy: DimensionGroup;
  AdditionalMetrics?: string[];
  PartitionBy?: DimensionGroup;
  Filter?: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeDimensionKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceType: ServiceType,
    Identifier: S.String,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Metric: S.String,
    PeriodInSeconds: S.optional(S.Number),
    GroupBy: DimensionGroup,
    AdditionalMetrics: S.optional(AdditionalMetricsList),
    PartitionBy: S.optional(DimensionGroup),
    Filter: S.optional(MetricQueryFilterMap),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDimensionKeysRequest",
}) as any as S.Schema<DescribeDimensionKeysRequest>;
export type DimensionMap = { [key: string]: string | undefined };
export const DimensionMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ResponsePartitionKey {
  Dimensions: { [key: string]: string | undefined };
}
export const ResponsePartitionKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Dimensions: DimensionMap }),
).annotate({
  identifier: "ResponsePartitionKey",
}) as any as S.Schema<ResponsePartitionKey>;
export type ResponsePartitionKeyList = ResponsePartitionKey[];
export const ResponsePartitionKeyList =
  /*@__PURE__*/ S.Array(ResponsePartitionKey);
export type AdditionalMetricsMap = { [key: string]: number | undefined };
export const AdditionalMetricsMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export type MetricValuesList = number[];
export const MetricValuesList = /*@__PURE__*/ S.Array(S.Number);
export interface DimensionKeyDescription {
  Dimensions?: { [key: string]: string | undefined };
  Total?: number;
  AdditionalMetrics?: { [key: string]: number | undefined };
  Partitions?: number[];
}
export const DimensionKeyDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dimensions: S.optional(DimensionMap),
    Total: S.optional(S.Number),
    AdditionalMetrics: S.optional(AdditionalMetricsMap),
    Partitions: S.optional(MetricValuesList),
  }),
).annotate({
  identifier: "DimensionKeyDescription",
}) as any as S.Schema<DimensionKeyDescription>;
export type DimensionKeyDescriptionList = DimensionKeyDescription[];
export const DimensionKeyDescriptionList = /*@__PURE__*/ S.Array(
  DimensionKeyDescription,
);
export interface DescribeDimensionKeysResponse {
  AlignedStartTime?: Date;
  AlignedEndTime?: Date;
  PartitionKeys?: ResponsePartitionKey[];
  Keys?: DimensionKeyDescription[];
  NextToken?: string;
}
export const DescribeDimensionKeysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlignedStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AlignedEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PartitionKeys: S.optional(ResponsePartitionKeyList),
    Keys: S.optional(DimensionKeyDescriptionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeDimensionKeysResponse",
}) as any as S.Schema<DescribeDimensionKeysResponse>;
export type RequestedDimensionList = string[];
export const RequestedDimensionList = /*@__PURE__*/ S.Array(S.String);
export interface GetDimensionKeyDetailsRequest {
  ServiceType: ServiceType;
  Identifier: string;
  Group: string;
  GroupIdentifier: string;
  RequestedDimensions?: string[];
}
export const GetDimensionKeyDetailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceType: ServiceType,
    Identifier: S.String,
    Group: S.String,
    GroupIdentifier: S.String,
    RequestedDimensions: S.optional(RequestedDimensionList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDimensionKeyDetailsRequest",
}) as any as S.Schema<GetDimensionKeyDetailsRequest>;
export type DetailStatus =
  | "AVAILABLE"
  | "PROCESSING"
  | "UNAVAILABLE"
  | (string & {});
export const DetailStatus = S.String;

export interface DimensionKeyDetail {
  Value?: string;
  Dimension?: string;
  Status?: DetailStatus;
}
export const DimensionKeyDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(S.String),
    Dimension: S.optional(S.String),
    Status: S.optional(DetailStatus),
  }),
).annotate({
  identifier: "DimensionKeyDetail",
}) as any as S.Schema<DimensionKeyDetail>;
export type DimensionKeyDetailList = DimensionKeyDetail[];
export const DimensionKeyDetailList = /*@__PURE__*/ S.Array(DimensionKeyDetail);
export interface GetDimensionKeyDetailsResponse {
  Dimensions?: DimensionKeyDetail[];
}
export const GetDimensionKeyDetailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Dimensions: S.optional(DimensionKeyDetailList) }).pipe(ns),
).annotate({
  identifier: "GetDimensionKeyDetailsResponse",
}) as any as S.Schema<GetDimensionKeyDetailsResponse>;
export type TextFormat = "PLAIN_TEXT" | "MARKDOWN" | (string & {});
export const TextFormat = S.String;

export type AcceptLanguage = "EN_US" | (string & {});
export const AcceptLanguage = S.String;

export interface GetPerformanceAnalysisReportRequest {
  ServiceType: ServiceType;
  Identifier: string;
  AnalysisReportId: string;
  TextFormat?: TextFormat;
  AcceptLanguage?: AcceptLanguage;
}
export const GetPerformanceAnalysisReportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceType: ServiceType,
    Identifier: S.String,
    AnalysisReportId: S.String,
    TextFormat: S.optional(TextFormat),
    AcceptLanguage: S.optional(AcceptLanguage),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPerformanceAnalysisReportRequest",
}) as any as S.Schema<GetPerformanceAnalysisReportRequest>;
export type AnalysisStatus = "RUNNING" | "SUCCEEDED" | "FAILED" | (string & {});
export const AnalysisStatus = S.String;

export type ContextType = "CAUSAL" | "CONTEXTUAL" | (string & {});
export const ContextType = S.String;

export type Severity = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export const Severity = S.String;

export type MarkdownString = string | redacted.Redacted<string>;
export interface Recommendation {
  RecommendationId?: string;
  RecommendationDescription?: string | redacted.Redacted<string>;
  RecommendationDetails?: string | redacted.Redacted<string>;
}
export const Recommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecommendationId: S.optional(S.String),
    RecommendationDescription: S.optional(SensitiveString),
    RecommendationDetails: S.optional(SensitiveString),
  }),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export type RecommendationList = Recommendation[];
export const RecommendationList = /*@__PURE__*/ S.Array(Recommendation);
export type DescriptiveString = string;
export type DescriptiveMap = { [key: string]: string | undefined };
export const DescriptiveMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface PerformanceInsightsMetric {
  Metric?: string;
  DisplayName?: string;
  Dimensions?: { [key: string]: string | undefined };
  Filter?: { [key: string]: string | undefined };
  Value?: number;
}
export const PerformanceInsightsMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metric: S.optional(S.String),
    DisplayName: S.optional(S.String),
    Dimensions: S.optional(DescriptiveMap),
    Filter: S.optional(DescriptiveMap),
    Value: S.optional(S.Number),
  }),
).annotate({
  identifier: "PerformanceInsightsMetric",
}) as any as S.Schema<PerformanceInsightsMetric>;
export interface Data {
  PerformanceInsightsMetric?: PerformanceInsightsMetric;
}
export const Data = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PerformanceInsightsMetric: S.optional(PerformanceInsightsMetric),
  }),
).annotate({ identifier: "Data" }) as any as S.Schema<Data>;
export type DataList = Data[];
export const DataList = /*@__PURE__*/ S.Array(Data);
export interface Insight {
  InsightId: string;
  InsightType?: string;
  Context?: ContextType;
  StartTime?: Date;
  EndTime?: Date;
  Severity?: Severity;
  SupportingInsights?: Insight[];
  Description?: string | redacted.Redacted<string>;
  Recommendations?: Recommendation[];
  InsightData?: Data[];
  BaselineData?: Data[];
}
export const Insight = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightId: S.String,
    InsightType: S.optional(S.String),
    Context: S.optional(ContextType),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Severity: S.optional(Severity),
    SupportingInsights: S.optional(
      S.suspend(() => InsightList).annotate({ identifier: "InsightList" }),
    ),
    Description: S.optional(SensitiveString),
    Recommendations: S.optional(RecommendationList),
    InsightData: S.optional(DataList),
    BaselineData: S.optional(DataList),
  }),
).annotate({ identifier: "Insight" }) as any as S.Schema<Insight>;
export type InsightList = Insight[];
export const InsightList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Insight> => Insight).annotate({
    identifier: "Insight",
  }),
) as any as S.Schema<InsightList>;
export interface AnalysisReport {
  AnalysisReportId: string;
  Identifier?: string;
  ServiceType?: ServiceType;
  CreateTime?: Date;
  StartTime?: Date;
  EndTime?: Date;
  Status?: AnalysisStatus;
  Insights?: Insight[];
}
export const AnalysisReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnalysisReportId: S.String,
    Identifier: S.optional(S.String),
    ServiceType: S.optional(ServiceType),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(AnalysisStatus),
    Insights: S.optional(InsightList),
  }),
).annotate({ identifier: "AnalysisReport" }) as any as S.Schema<AnalysisReport>;
export interface GetPerformanceAnalysisReportResponse {
  AnalysisReport?: AnalysisReport;
}
export const GetPerformanceAnalysisReportResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ AnalysisReport: S.optional(AnalysisReport) }).pipe(ns),
).annotate({
  identifier: "GetPerformanceAnalysisReportResponse",
}) as any as S.Schema<GetPerformanceAnalysisReportResponse>;
export interface GetResourceMetadataRequest {
  ServiceType: ServiceType;
  Identifier: string;
}
export const GetResourceMetadataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceType: ServiceType, Identifier: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceMetadataRequest",
}) as any as S.Schema<GetResourceMetadataRequest>;
export type FeatureStatus =
  | "ENABLED"
  | "DISABLED"
  | "UNSUPPORTED"
  | "ENABLED_PENDING_REBOOT"
  | "DISABLED_PENDING_REBOOT"
  | "UNKNOWN"
  | (string & {});
export const FeatureStatus = S.String;

export interface FeatureMetadata {
  Status?: FeatureStatus;
}
export const FeatureMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(FeatureStatus) }),
).annotate({
  identifier: "FeatureMetadata",
}) as any as S.Schema<FeatureMetadata>;
export type FeatureMetadataMap = { [key: string]: FeatureMetadata | undefined };
export const FeatureMetadataMap = /*@__PURE__*/ S.Record(
  S.String,
  FeatureMetadata.pipe(S.optional),
);
export interface GetResourceMetadataResponse {
  Identifier?: string;
  Features?: { [key: string]: FeatureMetadata | undefined };
}
export const GetResourceMetadataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.optional(S.String),
    Features: S.optional(FeatureMetadataMap),
  }).pipe(ns),
).annotate({
  identifier: "GetResourceMetadataResponse",
}) as any as S.Schema<GetResourceMetadataResponse>;
export interface MetricQuery {
  Metric: string;
  GroupBy?: DimensionGroup;
  Filter?: { [key: string]: string | undefined };
}
export const MetricQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metric: S.String,
    GroupBy: S.optional(DimensionGroup),
    Filter: S.optional(MetricQueryFilterMap),
  }),
).annotate({ identifier: "MetricQuery" }) as any as S.Schema<MetricQuery>;
export type MetricQueryList = MetricQuery[];
export const MetricQueryList = /*@__PURE__*/ S.Array(MetricQuery);
export type PeriodAlignment = "END_TIME" | "START_TIME" | (string & {});
export const PeriodAlignment = S.String;

export interface GetResourceMetricsRequest {
  ServiceType: ServiceType;
  Identifier: string;
  MetricQueries: MetricQuery[];
  StartTime: Date;
  EndTime: Date;
  PeriodInSeconds?: number;
  MaxResults?: number;
  NextToken?: string;
  PeriodAlignment?: PeriodAlignment;
}
export const GetResourceMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceType: ServiceType,
    Identifier: S.String,
    MetricQueries: MetricQueryList,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    PeriodInSeconds: S.optional(S.Number),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    PeriodAlignment: S.optional(PeriodAlignment),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetResourceMetricsRequest",
}) as any as S.Schema<GetResourceMetricsRequest>;
export interface ResponseResourceMetricKey {
  Metric: string;
  Dimensions?: { [key: string]: string | undefined };
}
export const ResponseResourceMetricKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Metric: S.String, Dimensions: S.optional(DimensionMap) }),
).annotate({
  identifier: "ResponseResourceMetricKey",
}) as any as S.Schema<ResponseResourceMetricKey>;
export interface DataPoint {
  Timestamp: Date;
  Value: number;
}
export const DataPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Value: S.Number,
  }),
).annotate({ identifier: "DataPoint" }) as any as S.Schema<DataPoint>;
export type DataPointsList = DataPoint[];
export const DataPointsList = /*@__PURE__*/ S.Array(DataPoint);
export interface MetricKeyDataPoints {
  Key?: ResponseResourceMetricKey;
  DataPoints?: DataPoint[];
}
export const MetricKeyDataPoints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(ResponseResourceMetricKey),
    DataPoints: S.optional(DataPointsList),
  }),
).annotate({
  identifier: "MetricKeyDataPoints",
}) as any as S.Schema<MetricKeyDataPoints>;
export type MetricKeyDataPointsList = MetricKeyDataPoints[];
export const MetricKeyDataPointsList =
  /*@__PURE__*/ S.Array(MetricKeyDataPoints);
export interface GetResourceMetricsResponse {
  AlignedStartTime?: Date;
  AlignedEndTime?: Date;
  Identifier?: string;
  MetricList?: MetricKeyDataPoints[];
  NextToken?: string;
}
export const GetResourceMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlignedStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AlignedEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Identifier: S.optional(S.String),
    MetricList: S.optional(MetricKeyDataPointsList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetResourceMetricsResponse",
}) as any as S.Schema<GetResourceMetricsResponse>;
export type DimensionsMetricList = string[];
export const DimensionsMetricList = /*@__PURE__*/ S.Array(S.String);
export type FineGrainedAction =
  | "DescribeDimensionKeys"
  | "GetDimensionKeyDetails"
  | "GetResourceMetrics"
  | (string & {});
export const FineGrainedAction = S.String;

export type AuthorizedActionsList = FineGrainedAction[];
export const AuthorizedActionsList = /*@__PURE__*/ S.Array(FineGrainedAction);
export interface ListAvailableResourceDimensionsRequest {
  ServiceType: ServiceType;
  Identifier: string;
  Metrics: string[];
  MaxResults?: number;
  NextToken?: string;
  AuthorizedActions?: FineGrainedAction[];
}
export const ListAvailableResourceDimensionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServiceType: ServiceType,
      Identifier: S.String,
      Metrics: DimensionsMetricList,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      AuthorizedActions: S.optional(AuthorizedActionsList),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListAvailableResourceDimensionsRequest",
}) as any as S.Schema<ListAvailableResourceDimensionsRequest>;
export interface DimensionDetail {
  Identifier?: string;
}
export const DimensionDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.optional(S.String) }),
).annotate({
  identifier: "DimensionDetail",
}) as any as S.Schema<DimensionDetail>;
export type DimensionDetailList = DimensionDetail[];
export const DimensionDetailList = /*@__PURE__*/ S.Array(DimensionDetail);
export interface DimensionGroupDetail {
  Group?: string;
  Dimensions?: DimensionDetail[];
}
export const DimensionGroupDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Group: S.optional(S.String),
    Dimensions: S.optional(DimensionDetailList),
  }),
).annotate({
  identifier: "DimensionGroupDetail",
}) as any as S.Schema<DimensionGroupDetail>;
export type DimensionGroupDetailList = DimensionGroupDetail[];
export const DimensionGroupDetailList =
  /*@__PURE__*/ S.Array(DimensionGroupDetail);
export interface MetricDimensionGroups {
  Metric?: string;
  Groups?: DimensionGroupDetail[];
}
export const MetricDimensionGroups = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metric: S.optional(S.String),
    Groups: S.optional(DimensionGroupDetailList),
  }),
).annotate({
  identifier: "MetricDimensionGroups",
}) as any as S.Schema<MetricDimensionGroups>;
export type MetricDimensionsList = MetricDimensionGroups[];
export const MetricDimensionsList = /*@__PURE__*/ S.Array(
  MetricDimensionGroups,
);
export interface ListAvailableResourceDimensionsResponse {
  MetricDimensions?: MetricDimensionGroups[];
  NextToken?: string;
}
export const ListAvailableResourceDimensionsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MetricDimensions: S.optional(MetricDimensionsList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListAvailableResourceDimensionsResponse",
}) as any as S.Schema<ListAvailableResourceDimensionsResponse>;
export type MetricTypeList = string[];
export const MetricTypeList = /*@__PURE__*/ S.Array(S.String);
export interface ListAvailableResourceMetricsRequest {
  ServiceType: ServiceType;
  Identifier: string;
  MetricTypes: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListAvailableResourceMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceType: ServiceType,
    Identifier: S.String,
    MetricTypes: MetricTypeList,
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAvailableResourceMetricsRequest",
}) as any as S.Schema<ListAvailableResourceMetricsRequest>;
export type Description = string;
export interface ResponseResourceMetric {
  Metric?: string;
  Description?: string;
  Unit?: string;
}
export const ResponseResourceMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metric: S.optional(S.String),
    Description: S.optional(S.String),
    Unit: S.optional(S.String),
  }),
).annotate({
  identifier: "ResponseResourceMetric",
}) as any as S.Schema<ResponseResourceMetric>;
export type ResponseResourceMetricList = ResponseResourceMetric[];
export const ResponseResourceMetricList = /*@__PURE__*/ S.Array(
  ResponseResourceMetric,
);
export interface ListAvailableResourceMetricsResponse {
  Metrics?: ResponseResourceMetric[];
  NextToken?: string;
}
export const ListAvailableResourceMetricsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Metrics: S.optional(ResponseResourceMetricList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListAvailableResourceMetricsResponse",
}) as any as S.Schema<ListAvailableResourceMetricsResponse>;
export type RecommendationIdList = string[];
export const RecommendationIdList = /*@__PURE__*/ S.Array(S.String);
export interface ListPerformanceAnalysisReportRecommendationsRequest {
  ServiceType: ServiceType;
  Identifier: string;
  AnalysisReportId: string;
  RecommendationIds?: string[];
  MaxResults?: number;
  NextToken?: string;
}
export const ListPerformanceAnalysisReportRecommendationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ServiceType: ServiceType,
      Identifier: S.String,
      AnalysisReportId: S.String,
      RecommendationIds: S.optional(RecommendationIdList),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListPerformanceAnalysisReportRecommendationsRequest",
  }) as any as S.Schema<ListPerformanceAnalysisReportRecommendationsRequest>;
export interface ListPerformanceAnalysisReportRecommendationsResponse {
  Recommendations?: Recommendation[];
  NextToken?: string;
}
export const ListPerformanceAnalysisReportRecommendationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Recommendations: S.optional(RecommendationList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListPerformanceAnalysisReportRecommendationsResponse",
  }) as any as S.Schema<ListPerformanceAnalysisReportRecommendationsResponse>;
export interface ListPerformanceAnalysisReportsRequest {
  ServiceType: ServiceType;
  Identifier: string;
  NextToken?: string;
  MaxResults?: number;
  ListTags?: boolean;
}
export const ListPerformanceAnalysisReportsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ServiceType: ServiceType,
      Identifier: S.String,
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      ListTags: S.optional(S.Boolean),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListPerformanceAnalysisReportsRequest",
}) as any as S.Schema<ListPerformanceAnalysisReportsRequest>;
export interface AnalysisReportSummary {
  AnalysisReportId?: string;
  CreateTime?: Date;
  StartTime?: Date;
  EndTime?: Date;
  Status?: AnalysisStatus;
  Tags?: Tag[];
}
export const AnalysisReportSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnalysisReportId: S.optional(S.String),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(AnalysisStatus),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "AnalysisReportSummary",
}) as any as S.Schema<AnalysisReportSummary>;
export type AnalysisReportSummaryList = AnalysisReportSummary[];
export const AnalysisReportSummaryList = /*@__PURE__*/ S.Array(
  AnalysisReportSummary,
);
export interface ListPerformanceAnalysisReportsResponse {
  AnalysisReports?: AnalysisReportSummary[];
  NextToken?: string;
}
export const ListPerformanceAnalysisReportsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AnalysisReports: S.optional(AnalysisReportSummaryList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListPerformanceAnalysisReportsResponse",
}) as any as S.Schema<ListPerformanceAnalysisReportsResponse>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ServiceType: ServiceType;
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceType: ServiceType, ResourceARN: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  ServiceType: ServiceType;
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceType: ServiceType,
    ResourceARN: S.String,
    Tags: TagList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ServiceType: ServiceType;
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ServiceType: ServiceType,
    ResourceARN: S.String,
    TagKeys: TagKeyList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type ErrorString = string;
export type CreatePerformanceAnalysisReportError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Creates a new performance analysis report for a specific time period for the
 * DB instance.
 */
export const createPerformanceAnalysisReport: API.OperationMethod<
  CreatePerformanceAnalysisReportRequest,
  CreatePerformanceAnalysisReportResponse,
  CreatePerformanceAnalysisReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePerformanceAnalysisReportRequest,
  output: CreatePerformanceAnalysisReportResponse,
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePerformanceAnalysisReport",
}));

export type DeletePerformanceAnalysisReportError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Deletes a performance analysis report.
 */
export const deletePerformanceAnalysisReport: API.OperationMethod<
  DeletePerformanceAnalysisReportRequest,
  DeletePerformanceAnalysisReportResponse,
  DeletePerformanceAnalysisReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePerformanceAnalysisReportRequest,
  output: DeletePerformanceAnalysisReportResponse,
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePerformanceAnalysisReport",
}));

export type DescribeDimensionKeysError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * For a specific time period, retrieve the top `N` dimension keys for a metric.
 *
 * Each response element returns a maximum of 500 bytes. For larger elements, such as SQL statements,
 * only the first 500 bytes are returned.
 */
export const describeDimensionKeys: API.PaginatedOperationMethod<
  DescribeDimensionKeysRequest,
  DescribeDimensionKeysResponse,
  DescribeDimensionKeysError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeDimensionKeysRequest,
  output: DescribeDimensionKeysResponse,
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDimensionKeys",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetDimensionKeyDetailsError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Get the attributes of the specified dimension group for a DB instance or data source. For example, if you specify a SQL ID,
 * `GetDimensionKeyDetails` retrieves the full text of the dimension `db.sql.statement` associated with this ID.
 * This operation is useful because `GetResourceMetrics` and `DescribeDimensionKeys` don't support retrieval of large
 * SQL statement text, lock snapshots, and execution plans.
 */
export const getDimensionKeyDetails: API.OperationMethod<
  GetDimensionKeyDetailsRequest,
  GetDimensionKeyDetailsResponse,
  GetDimensionKeyDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDimensionKeyDetailsRequest,
  output: GetDimensionKeyDetailsResponse,
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDimensionKeyDetails",
}));

export type GetPerformanceAnalysisReportError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieves the report including the report ID, status, time details, and the insights
 * with recommendations. The report status can be `RUNNING`,
 * `SUCCEEDED`, or `FAILED`. The insights include the
 * `description` and `recommendation` fields.
 */
export const getPerformanceAnalysisReport: API.OperationMethod<
  GetPerformanceAnalysisReportRequest,
  GetPerformanceAnalysisReportResponse,
  GetPerformanceAnalysisReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPerformanceAnalysisReportRequest,
  output: GetPerformanceAnalysisReportResponse,
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPerformanceAnalysisReport",
}));

export type GetResourceMetadataError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieve the metadata for different features. For example, the metadata might indicate
 * that a feature is turned on or off on a specific DB instance.
 */
export const getResourceMetadata: API.OperationMethod<
  GetResourceMetadataRequest,
  GetResourceMetadataResponse,
  GetResourceMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourceMetadataRequest,
  output: GetResourceMetadataResponse,
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceMetadata",
}));

export type GetResourceMetricsError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieve Performance Insights metrics for a set of data sources over a time period. You can provide
 * specific dimension groups and dimensions, and provide filtering criteria for each group. You must specify an aggregate function for
 * each metric.
 *
 * Each response element returns a maximum of 500 bytes. For larger elements, such as SQL statements,
 * only the first 500 bytes are returned.
 */
export const getResourceMetrics: API.PaginatedOperationMethod<
  GetResourceMetricsRequest,
  GetResourceMetricsResponse,
  GetResourceMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetResourceMetricsRequest,
  output: GetResourceMetricsResponse,
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceMetrics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAvailableResourceDimensionsError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieve the dimensions that can be queried for each specified metric type on a specified DB instance.
 */
export const listAvailableResourceDimensions: API.PaginatedOperationMethod<
  ListAvailableResourceDimensionsRequest,
  ListAvailableResourceDimensionsResponse,
  ListAvailableResourceDimensionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAvailableResourceDimensionsRequest,
  output: ListAvailableResourceDimensionsResponse,
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableResourceDimensions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAvailableResourceMetricsError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieve metrics of the specified types that can be queried for a specified DB instance.
 */
export const listAvailableResourceMetrics: API.PaginatedOperationMethod<
  ListAvailableResourceMetricsRequest,
  ListAvailableResourceMetricsResponse,
  ListAvailableResourceMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAvailableResourceMetricsRequest,
  output: ListAvailableResourceMetricsResponse,
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableResourceMetrics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPerformanceAnalysisReportRecommendationsError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieves recommendations for a performance analysis report.
 */
export const listPerformanceAnalysisReportRecommendations: API.PaginatedOperationMethod<
  ListPerformanceAnalysisReportRecommendationsRequest,
  ListPerformanceAnalysisReportRecommendationsResponse,
  ListPerformanceAnalysisReportRecommendationsError,
  Credentials | HttpClient.HttpClient,
  Recommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPerformanceAnalysisReportRecommendationsRequest,
  output: ListPerformanceAnalysisReportRecommendationsResponse,
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPerformanceAnalysisReportRecommendations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Recommendations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPerformanceAnalysisReportsError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Lists all the analysis reports created for the DB instance. The reports are sorted based on the start time of each report.
 */
export const listPerformanceAnalysisReports: API.PaginatedOperationMethod<
  ListPerformanceAnalysisReportsRequest,
  ListPerformanceAnalysisReportsResponse,
  ListPerformanceAnalysisReportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPerformanceAnalysisReportsRequest,
  output: ListPerformanceAnalysisReportsResponse,
  errors: [
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPerformanceAnalysisReports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Retrieves all the metadata tags associated with Amazon RDS Performance Insights resource.
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
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Adds metadata tags to the Amazon RDS Performance Insights resource.
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
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServiceError
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Deletes the metadata tags from the Amazon RDS Performance Insights resource.
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
    InternalServiceError,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
