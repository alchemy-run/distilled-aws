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
  sdkId: "Sustainability",
  serviceShapeName: "AwsSustainabilityApiService",
});
const auth = T.AwsAuthSigv4({ name: "sustainability" });
const ver = T.ServiceVersion("2018-05-10");
const proto = T.AwsProtocolsRestJson1();
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
  const _p0 = () => ({
    authSchemes: [
      { name: "sigv4a", signingRegionSet: ["*"] },
      { name: "sigv4", signingRegion: "us-gov-west-1" },
    ],
  });
  const _p1 = (_0: unknown) => ({
    authSchemes: [
      { name: "sigv4a", signingRegionSet: ["*"] },
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
    return e(
      Endpoint,
      {
        authSchemes: [
          { name: "sigv4a", signingRegionSet: ["*"] },
          { name: "sigv4" },
        ],
      },
      {},
    );
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (_.getAttr(PartitionResult, "name") === "aws" && UseFIPS === false) {
          return e(
            `https://api.sustainability.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            {
              authSchemes: [
                { name: "sigv4a", signingRegionSet: ["*"] },
                { name: "sigv4", signingRegion: "us-east-1" },
              ],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === false
        ) {
          return e(
            `https://sustainability.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(),
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true
        ) {
          return e(
            `https://sustainability-fips.us-gov.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p0(),
            {},
          );
        }
        if (UseFIPS === true) {
          return e(
            `https://sustainability-fips.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            _p1(PartitionResult),
            {},
          );
        }
        return e(
          `https://sustainability.global.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          _p1(PartitionResult),
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
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export interface TimePeriod {
  Start: Date;
  End: Date;
}
export const TimePeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Start: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    End: T.DateFromString.pipe(T.TimestampFormat("date-time")),
  }),
).annotate({ identifier: "TimePeriod" }) as any as S.Schema<TimePeriod>;
export type Dimension =
  | "USAGE_ACCOUNT_ID"
  | "REGION"
  | "SERVICE"
  | (string & {});
export const Dimension = /*@__PURE__*/ S.String;

export type DimensionList = Dimension[];
export const DimensionList = /*@__PURE__*/ S.Array(Dimension);
export type DimensionValueList = string[];
export const DimensionValueList = /*@__PURE__*/ S.Array(S.String);
export type DimensionListMap = { [key in Dimension]?: string[] };
export const DimensionListMap = /*@__PURE__*/ S.Record(
  Dimension,
  DimensionValueList.pipe(S.optional),
);
export interface FilterExpression {
  Dimensions?: { [key: string]: string[] | undefined };
}
export const FilterExpression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Dimensions: S.optional(DimensionListMap) }),
).annotate({
  identifier: "FilterExpression",
}) as any as S.Schema<FilterExpression>;
export type EmissionsType =
  | "TOTAL_LBM_CARBON_EMISSIONS"
  | "TOTAL_MBM_CARBON_EMISSIONS"
  | "TOTAL_SCOPE_1_CARBON_EMISSIONS"
  | "TOTAL_SCOPE_2_LBM_CARBON_EMISSIONS"
  | "TOTAL_SCOPE_2_MBM_CARBON_EMISSIONS"
  | "TOTAL_SCOPE_3_LBM_CARBON_EMISSIONS"
  | "TOTAL_SCOPE_3_MBM_CARBON_EMISSIONS"
  | (string & {});
export const EmissionsType = /*@__PURE__*/ S.String;

export type EmissionsTypeList = EmissionsType[];
export const EmissionsTypeList = /*@__PURE__*/ S.Array(EmissionsType);
export type TimeGranularity =
  | "YEARLY_CALENDAR"
  | "YEARLY_FISCAL"
  | "QUARTERLY_CALENDAR"
  | "QUARTERLY_FISCAL"
  | "MONTHLY"
  | (string & {});
export const TimeGranularity = /*@__PURE__*/ S.String;

export type Month = number;
export interface GranularityConfiguration {
  FiscalYearStartMonth?: number;
}
export const GranularityConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FiscalYearStartMonth: S.optional(S.Number) }),
).annotate({
  identifier: "GranularityConfiguration",
}) as any as S.Schema<GranularityConfiguration>;
export type MaxResults = number;
export type NextToken = string;
export interface GetEstimatedCarbonEmissionsRequest {
  TimePeriod: TimePeriod;
  GroupBy?: Dimension[];
  FilterBy?: FilterExpression;
  EmissionsTypes?: EmissionsType[];
  Granularity?: TimeGranularity;
  GranularityConfiguration?: GranularityConfiguration;
  MaxResults?: number;
  NextToken?: string;
}
export const GetEstimatedCarbonEmissionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: TimePeriod,
    GroupBy: S.optional(DimensionList),
    FilterBy: S.optional(FilterExpression),
    EmissionsTypes: S.optional(EmissionsTypeList),
    Granularity: S.optional(TimeGranularity),
    GranularityConfiguration: S.optional(GranularityConfiguration),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/estimated-carbon-emissions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEstimatedCarbonEmissionsRequest",
}) as any as S.Schema<GetEstimatedCarbonEmissionsRequest>;
export type DimensionsMap = { [key in Dimension]?: string };
export const DimensionsMap = /*@__PURE__*/ S.Record(
  Dimension,
  S.String.pipe(S.optional),
);
export type ModelVersion = string;
export type EmissionsUnit = "MTCO2e" | (string & {});
export const EmissionsUnit = /*@__PURE__*/ S.String;

export interface Emissions {
  Value: number;
  Unit: EmissionsUnit;
}
export const Emissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.Number, Unit: EmissionsUnit }),
).annotate({ identifier: "Emissions" }) as any as S.Schema<Emissions>;
export type EmissionsMap = { [key in EmissionsType]?: Emissions };
export const EmissionsMap = /*@__PURE__*/ S.Record(
  EmissionsType,
  Emissions.pipe(S.optional),
);
export interface EstimatedCarbonEmissions {
  TimePeriod: TimePeriod;
  DimensionsValues: { [key: string]: string | undefined };
  ModelVersion: string;
  EmissionsValues: { [key: string]: Emissions | undefined };
}
export const EstimatedCarbonEmissions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: TimePeriod,
    DimensionsValues: DimensionsMap,
    ModelVersion: S.String,
    EmissionsValues: EmissionsMap,
  }),
).annotate({
  identifier: "EstimatedCarbonEmissions",
}) as any as S.Schema<EstimatedCarbonEmissions>;
export type EstimatedCarbonEmissionsList = EstimatedCarbonEmissions[];
export const EstimatedCarbonEmissionsList = /*@__PURE__*/ S.Array(
  EstimatedCarbonEmissions,
);
export interface GetEstimatedCarbonEmissionsResponse {
  Results: EstimatedCarbonEmissions[];
  NextToken?: string;
}
export const GetEstimatedCarbonEmissionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Results: EstimatedCarbonEmissionsList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetEstimatedCarbonEmissionsResponse",
}) as any as S.Schema<GetEstimatedCarbonEmissionsResponse>;
export interface GetEstimatedCarbonEmissionsDimensionValuesRequest {
  TimePeriod: TimePeriod;
  Dimensions: Dimension[];
  MaxResults?: number;
  NextToken?: string;
}
export const GetEstimatedCarbonEmissionsDimensionValuesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TimePeriod: TimePeriod,
      Dimensions: DimensionList,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v1/estimated-carbon-emissions-dimension-values",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetEstimatedCarbonEmissionsDimensionValuesRequest",
  }) as any as S.Schema<GetEstimatedCarbonEmissionsDimensionValuesRequest>;
export interface DimensionEntry {
  Dimension: Dimension;
  Value: string;
}
export const DimensionEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Dimension: Dimension, Value: S.String }),
).annotate({ identifier: "DimensionEntry" }) as any as S.Schema<DimensionEntry>;
export type DimensionEntryList = DimensionEntry[];
export const DimensionEntryList = /*@__PURE__*/ S.Array(DimensionEntry);
export interface GetEstimatedCarbonEmissionsDimensionValuesResponse {
  Results?: DimensionEntry[];
  NextToken?: string;
}
export const GetEstimatedCarbonEmissionsDimensionValuesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Results: S.optional(DimensionEntryList),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetEstimatedCarbonEmissionsDimensionValuesResponse",
  }) as any as S.Schema<GetEstimatedCarbonEmissionsDimensionValuesResponse>;
export type GetEstimatedCarbonEmissionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns estimated carbon emission values based on customer grouping and filtering parameters. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const getEstimatedCarbonEmissions: API.PaginatedOperationMethod<
  GetEstimatedCarbonEmissionsRequest,
  GetEstimatedCarbonEmissionsResponse,
  GetEstimatedCarbonEmissionsError,
  Credentials | HttpClient.HttpClient,
  EstimatedCarbonEmissions
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetEstimatedCarbonEmissionsRequest,
  output: GetEstimatedCarbonEmissionsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEstimatedCarbonEmissions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetEstimatedCarbonEmissionsDimensionValuesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the possible dimension values available for a customer's account. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const getEstimatedCarbonEmissionsDimensionValues: API.PaginatedOperationMethod<
  GetEstimatedCarbonEmissionsDimensionValuesRequest,
  GetEstimatedCarbonEmissionsDimensionValuesResponse,
  GetEstimatedCarbonEmissionsDimensionValuesError,
  Credentials | HttpClient.HttpClient,
  DimensionEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetEstimatedCarbonEmissionsDimensionValuesRequest,
  output: GetEstimatedCarbonEmissionsDimensionValuesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEstimatedCarbonEmissionsDimensionValues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Results",
    pageSize: "MaxResults",
  } as const,
})) as any;
