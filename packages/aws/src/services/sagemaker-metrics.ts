import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({
  sdkId: "SageMaker Metrics",
  serviceShapeName: "SageMakerMetricsService",
});
const auth = T.AwsAuthSigv4({ name: "sagemaker" });
const ver = T.ServiceVersion("2022-09-30");
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
              `https://metrics.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws") {
              return e(
                `https://metrics-fips.sagemaker.${Region}.amazonaws.com`,
              );
            }
            return e(
              `https://metrics.sagemaker-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://metrics.sagemaker.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://metrics.sagemaker.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export type MetricName = string;
export type SageMakerResourceArn = string;
export type MetricStatistic =
  | "Min"
  | "Max"
  | "Avg"
  | "Count"
  | "StdDev"
  | "Last"
  | (string & {});
export const MetricStatistic = /*@__PURE__*/ S.String;

export type Period =
  | "OneMinute"
  | "FiveMinute"
  | "OneHour"
  | "IterationNumber"
  | (string & {});
export const Period = /*@__PURE__*/ S.String;

export type XAxisType = "IterationNumber" | "Timestamp" | (string & {});
export const XAxisType = /*@__PURE__*/ S.String;

export interface MetricQuery {
  MetricName?: string;
  ResourceArn?: string;
  MetricStat?: MetricStatistic;
  Period?: Period;
  XAxisType?: XAxisType;
  Start?: number;
  End?: number;
}
export const MetricQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    ResourceArn: S.optional(S.String),
    MetricStat: S.optional(MetricStatistic),
    Period: S.optional(Period),
    XAxisType: S.optional(XAxisType),
    Start: S.optional(S.Number),
    End: S.optional(S.Number),
  }),
).annotate({ identifier: "MetricQuery" }) as any as S.Schema<MetricQuery>;
export type MetricQueryList = MetricQuery[];
export const MetricQueryList = /*@__PURE__*/ S.Array(MetricQuery);
export interface BatchGetMetricsRequest {
  MetricQueries?: MetricQuery[];
}
export const BatchGetMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MetricQueries: S.optional(MetricQueryList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/BatchGetMetrics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetMetricsRequest",
}) as any as S.Schema<BatchGetMetricsRequest>;
export type MetricQueryResultStatus =
  | "Complete"
  | "Truncated"
  | "InternalError"
  | "ValidationError"
  | (string & {});
export const MetricQueryResultStatus = /*@__PURE__*/ S.String;

export type Message = string;
export type XAxisValues = number[];
export const XAxisValues = /*@__PURE__*/ S.Array(S.Number);
export type MetricValues = number[];
export const MetricValues = /*@__PURE__*/ S.Array(S.Number);
export interface MetricQueryResult {
  Status?: MetricQueryResultStatus;
  Message?: string;
  XAxisValues?: number[];
  MetricValues?: number[];
}
export const MetricQueryResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(MetricQueryResultStatus),
    Message: S.optional(S.String),
    XAxisValues: S.optional(XAxisValues),
    MetricValues: S.optional(MetricValues),
  }),
).annotate({
  identifier: "MetricQueryResult",
}) as any as S.Schema<MetricQueryResult>;
export type MetricQueryResultList = MetricQueryResult[];
export const MetricQueryResultList = /*@__PURE__*/ S.Array(MetricQueryResult);
export interface BatchGetMetricsResponse {
  MetricQueryResults?: (MetricQueryResult & {
    Status: MetricQueryResultStatus;
    XAxisValues: XAxisValues;
    MetricValues: MetricValues;
  })[];
}
export const BatchGetMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MetricQueryResults: S.optional(MetricQueryResultList) }),
).annotate({
  identifier: "BatchGetMetricsResponse",
}) as any as S.Schema<BatchGetMetricsResponse>;
export type ExperimentEntityName = string;
export type Step = number;
export interface RawMetricData {
  MetricName?: string;
  Timestamp?: Date;
  Step?: number;
  Value?: number;
}
export const RawMetricData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Step: S.optional(S.Number),
    Value: S.optional(S.Number),
  }),
).annotate({ identifier: "RawMetricData" }) as any as S.Schema<RawMetricData>;
export type RawMetricDataList = RawMetricData[];
export const RawMetricDataList = /*@__PURE__*/ S.Array(RawMetricData);
export interface BatchPutMetricsRequest {
  TrialComponentName?: string;
  MetricData?: RawMetricData[];
}
export const BatchPutMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TrialComponentName: S.optional(S.String),
    MetricData: S.optional(RawMetricDataList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/BatchPutMetrics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchPutMetricsRequest",
}) as any as S.Schema<BatchPutMetricsRequest>;
export type PutMetricsErrorCode =
  | "METRIC_LIMIT_EXCEEDED"
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | "CONFLICT_ERROR"
  | (string & {});
export const PutMetricsErrorCode = /*@__PURE__*/ S.String;

export interface BatchPutMetricsError_ {
  Code?: PutMetricsErrorCode;
  MetricIndex?: number;
}
export const BatchPutMetricsError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Code: S.optional(PutMetricsErrorCode),
    MetricIndex: S.optional(S.Number),
  }),
).annotate({
  identifier: "BatchPutMetricsError",
}) as any as S.Schema<BatchPutMetricsError_>;
export type BatchPutMetricsErrorList = BatchPutMetricsError_[];
export const BatchPutMetricsErrorList = /*@__PURE__*/ S.Array(
  BatchPutMetricsError_,
);
export interface BatchPutMetricsResponse {
  Errors?: BatchPutMetricsError_[];
}
export const BatchPutMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Errors: S.optional(BatchPutMetricsErrorList) }),
).annotate({
  identifier: "BatchPutMetricsResponse",
}) as any as S.Schema<BatchPutMetricsResponse>;
export type BatchGetMetricsError = CommonErrors;
/**
 * Used to retrieve training metrics from SageMaker.
 */
export const batchGetMetrics: API.OperationMethod<
  BatchGetMetricsRequest,
  BatchGetMetricsResponse,
  BatchGetMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetMetricsRequest,
  output: BatchGetMetricsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetMetrics",
}));

export type BatchPutMetricsError = CommonErrors;
/**
 * Used to ingest training metrics into SageMaker. These metrics can be visualized in SageMaker Studio.
 */
export const batchPutMetrics: API.OperationMethod<
  BatchPutMetricsRequest,
  BatchPutMetricsResponse,
  BatchPutMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchPutMetricsRequest,
  output: BatchPutMetricsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchPutMetrics",
}));
