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
  sdkId: "forecastquery",
  serviceShapeName: "AmazonForecastRuntime",
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
              `https://forecastquery-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://forecastquery-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://forecastquery.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://forecastquery.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export type Arn = string;
export type AttributeName = string;
export type AttributeValue = string;
export type Filters = { [key: string]: string | undefined };
export const Filters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type NextToken = string;
export interface QueryForecastRequest {
  ForecastArn: string;
  StartDate?: string;
  EndDate?: string;
  Filters: { [key: string]: string | undefined };
  NextToken?: string;
}
export const QueryForecastRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ForecastArn: S.String,
    StartDate: S.optional(S.String),
    EndDate: S.optional(S.String),
    Filters: Filters,
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "QueryForecastRequest",
}) as any as S.Schema<QueryForecastRequest>;
export type Statistic = string;
export interface DataPoint {
  Timestamp?: string;
  Value?: number;
}
export const DataPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Timestamp: S.optional(S.String), Value: S.optional(S.Number) }),
).annotate({ identifier: "DataPoint" }) as any as S.Schema<DataPoint>;
export type TimeSeries = DataPoint[];
export const TimeSeries = /*@__PURE__*/ S.Array(DataPoint);
export type Predictions = { [key: string]: DataPoint[] | undefined };
export const Predictions = /*@__PURE__*/ S.Record(
  S.String,
  TimeSeries.pipe(S.optional),
);
export interface Forecast {
  Predictions?: { [key: string]: DataPoint[] | undefined };
}
export const Forecast = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Predictions: S.optional(Predictions) }),
).annotate({ identifier: "Forecast" }) as any as S.Schema<Forecast>;
export interface QueryForecastResponse {
  Forecast?: Forecast;
}
export const QueryForecastResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Forecast: S.optional(Forecast) }),
).annotate({
  identifier: "QueryForecastResponse",
}) as any as S.Schema<QueryForecastResponse>;
export type LongArn = string;
export interface QueryWhatIfForecastRequest {
  WhatIfForecastArn: string;
  StartDate?: string;
  EndDate?: string;
  Filters: { [key: string]: string | undefined };
  NextToken?: string;
}
export const QueryWhatIfForecastRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WhatIfForecastArn: S.String,
    StartDate: S.optional(S.String),
    EndDate: S.optional(S.String),
    Filters: Filters,
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "QueryWhatIfForecastRequest",
}) as any as S.Schema<QueryWhatIfForecastRequest>;
export interface QueryWhatIfForecastResponse {
  Forecast?: Forecast;
}
export const QueryWhatIfForecastResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Forecast: S.optional(Forecast) }),
).annotate({
  identifier: "QueryWhatIfForecastResponse",
}) as any as S.Schema<QueryWhatIfForecastResponse>;
export type ErrorMessage = string;
export type QueryForecastError =
  | InvalidInputException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a forecast for a single item, filtered by the supplied criteria.
 *
 * The criteria is a key-value pair. The key is either `item_id` (or the
 * equivalent non-timestamp, non-target field) from the `TARGET_TIME_SERIES` dataset,
 * or one of the forecast dimensions specified as part of the `FeaturizationConfig`
 * object.
 *
 * By default, `QueryForecast` returns the complete date range for the filtered
 * forecast. You can request a specific date range.
 *
 * To get the full forecast, use the CreateForecastExportJob operation.
 *
 * The forecasts generated by Amazon Forecast are in the same timezone as the dataset that was
 * used to create the predictor.
 */
export const queryForecast: API.OperationMethod<
  QueryForecastRequest,
  QueryForecastResponse,
  QueryForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: QueryForecastRequest,
  output: QueryForecastResponse,
  errors: [
    InvalidInputException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QueryForecast",
}));

export type QueryWhatIfForecastError =
  | InvalidInputException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a what-if forecast.
 */
export const queryWhatIfForecast: API.OperationMethod<
  QueryWhatIfForecastRequest,
  QueryWhatIfForecastResponse,
  QueryWhatIfForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: QueryWhatIfForecastRequest,
  output: QueryWhatIfForecastResponse,
  errors: [
    InvalidInputException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QueryWhatIfForecast",
}));
