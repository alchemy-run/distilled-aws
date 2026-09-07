import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://monitoring.amazonaws.com/doc/2010-08-01/");
const svc = T.AwsApiService({
  sdkId: "CloudWatch",
  serviceShapeName: "GraniteServiceVersion20100801",
});
const auth = T.AwsAuthSigv4({ name: "monitoring" });
const ver = T.ServiceVersion("2010-08-01");
const proto = T.AwsProtocolsAwsJson1_0();
const rules = T.EndpointResolver((p, _) => {
  const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === false
        ) {
          return e(
            `https://monitoring.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-us-gov" &&
          UseFIPS === true &&
          UseDualStack === true
        ) {
          return e(
            `https://monitoring.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://monitoring-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://monitoring-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://monitoring.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://monitoring.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ConcurrentModificationException",
        httpResponseCode: 429,
      }),
      T.HttpError(429),
    ),
  ).pipe(C.withThrottlingError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DashboardInvalidInputError
  extends /*@__PURE__*/ S.TaggedError<DashboardInvalidInputError>()(
    "DashboardInvalidInputError",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      dashboardValidationMessages: S.optional(
        S.suspend(() => DashboardValidationMessages).annotate({
          identifier: "DashboardValidationMessages",
        }),
      ),
    },
    T.all(
      T.AwsQueryError({ code: "InvalidParameterInput", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DashboardNotFoundError
  extends /*@__PURE__*/ S.TaggedError<DashboardNotFoundError>()(
    "DashboardNotFoundError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ResourceNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class InternalServiceFault
  extends /*@__PURE__*/ S.TaggedError<InternalServiceFault>()(
    "InternalServiceFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InternalServiceError", httpResponseCode: 500 }),
      T.HttpError(500),
    ),
  ).pipe(C.withServerError) {}
export class InvalidFormatFault
  extends /*@__PURE__*/ S.TaggedError<InvalidFormatFault>()(
    "InvalidFormatFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidFormat", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextToken
  extends /*@__PURE__*/ S.TaggedError<InvalidNextToken>()(
    "InvalidNextToken",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidNextToken", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterCombinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterCombinationException>()(
    "InvalidParameterCombinationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidParameterCombination",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidParameterValue", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class KmsAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<KmsAccessDeniedException>()(
    "KmsAccessDeniedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withAuthError) {}
export class KmsKeyDisabledException
  extends /*@__PURE__*/ S.TaggedError<KmsKeyDisabledException>()(
    "KmsKeyDisabledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class KmsKeyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<KmsKeyNotFoundException>()(
    "KmsKeyNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "LimitExceededException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededFault
  extends /*@__PURE__*/ S.TaggedError<LimitExceededFault>()(
    "LimitExceededFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "LimitExceeded", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MissingRequiredParameterException
  extends /*@__PURE__*/ S.TaggedError<MissingRequiredParameterException>()(
    "MissingRequiredParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "MissingParameter", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceConflict
  extends /*@__PURE__*/ S.TaggedError<ResourceConflict>()(
    "ResourceConflict",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ResourceConflict", httpResponseCode: 409 }),
      T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class ResourceNotFound
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFound>()(
    "ResourceNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ResourceNotFound", httpResponseCode: 404 }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      ResourceType: S.optional(S.String),
      ResourceId: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "ResourceNotFoundException",
        httpResponseCode: 404,
      }),
      T.HttpError(404),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedOperation
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperation>()(
    "UnsupportedOperation",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export type DatasetIdentifier = string;
export type KmsKeyArn = string;
export interface AssociateDatasetKmsKeyInput {
  DatasetIdentifier?: string;
  KmsKeyArn?: string;
}
export const AssociateDatasetKmsKeyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetIdentifier: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
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
  identifier: "AssociateDatasetKmsKeyInput",
}) as any as S.Schema<AssociateDatasetKmsKeyInput>;
export interface AssociateDatasetKmsKeyOutput {}
export const AssociateDatasetKmsKeyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AssociateDatasetKmsKeyOutput",
}) as any as S.Schema<AssociateDatasetKmsKeyOutput>;
export type Name = string;
export interface DeleteAlarmMuteRuleInput {
  AlarmMuteRuleName?: string;
}
export const DeleteAlarmMuteRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AlarmMuteRuleName: S.optional(S.String) }).pipe(
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
  identifier: "DeleteAlarmMuteRuleInput",
}) as any as S.Schema<DeleteAlarmMuteRuleInput>;
export interface DeleteAlarmMuteRuleResponse {}
export const DeleteAlarmMuteRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAlarmMuteRuleResponse",
}) as any as S.Schema<DeleteAlarmMuteRuleResponse>;
export type AlarmName = string;
export type AlarmNames = string[];
export const AlarmNames = /*@__PURE__*/ S.Array(S.String);
export interface DeleteAlarmsInput {
  AlarmNames?: string[];
}
export const DeleteAlarmsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AlarmNames: S.optional(AlarmNames) }).pipe(
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
  identifier: "DeleteAlarmsInput",
}) as any as S.Schema<DeleteAlarmsInput>;
export interface DeleteAlarmsResponse {}
export const DeleteAlarmsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAlarmsResponse",
}) as any as S.Schema<DeleteAlarmsResponse>;
export type AnomalyDetectorId = string;
export type Namespace = string;
export type MetricName = string;
export type DimensionName = string;
export type DimensionValue = string;
export interface Dimension {
  Name?: string;
  Value?: string;
}
export const Dimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "Dimension" }) as any as S.Schema<Dimension>;
export type Dimensions = Dimension[];
export const Dimensions = /*@__PURE__*/ S.Array(Dimension);
export type AnomalyDetectorMetricStat = string;
export type AccountId = string;
export interface SingleMetricAnomalyDetector {
  AccountId?: string;
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
  Stat?: string;
}
export const SingleMetricAnomalyDetector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    Namespace: S.optional(S.String),
    MetricName: S.optional(S.String),
    Dimensions: S.optional(Dimensions),
    Stat: S.optional(S.String),
  }),
).annotate({
  identifier: "SingleMetricAnomalyDetector",
}) as any as S.Schema<SingleMetricAnomalyDetector>;
export type MetricId = string;
export interface Metric {
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
}
export const Metric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Namespace: S.optional(S.String),
    MetricName: S.optional(S.String),
    Dimensions: S.optional(Dimensions),
  }),
).annotate({ identifier: "Metric" }) as any as S.Schema<Metric>;
export type Period = number;
export type Stat = string;
export type StandardUnit =
  | "Seconds"
  | "Microseconds"
  | "Milliseconds"
  | "Bytes"
  | "Kilobytes"
  | "Megabytes"
  | "Gigabytes"
  | "Terabytes"
  | "Bits"
  | "Kilobits"
  | "Megabits"
  | "Gigabits"
  | "Terabits"
  | "Percent"
  | "Count"
  | "Bytes/Second"
  | "Kilobytes/Second"
  | "Megabytes/Second"
  | "Gigabytes/Second"
  | "Terabytes/Second"
  | "Bits/Second"
  | "Kilobits/Second"
  | "Megabits/Second"
  | "Gigabits/Second"
  | "Terabits/Second"
  | "Count/Second"
  | "None"
  | (string & {});
export const StandardUnit = S.String;

export interface MetricStat {
  Metric?: Metric;
  Period?: number;
  Stat?: string;
  Unit?: StandardUnit;
}
export const MetricStat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metric: S.optional(Metric),
    Period: S.optional(S.Number),
    Stat: S.optional(S.String),
    Unit: S.optional(StandardUnit),
  }),
).annotate({ identifier: "MetricStat" }) as any as S.Schema<MetricStat>;
export type MetricExpression = string;
export type MetricLabel = string;
export type ReturnData = boolean;
export interface MetricDataQuery {
  Id?: string;
  MetricStat?: MetricStat;
  Expression?: string;
  Label?: string;
  ReturnData?: boolean;
  Period?: number;
  AccountId?: string;
}
export const MetricDataQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    MetricStat: S.optional(MetricStat),
    Expression: S.optional(S.String),
    Label: S.optional(S.String),
    ReturnData: S.optional(S.Boolean),
    Period: S.optional(S.Number),
    AccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "MetricDataQuery",
}) as any as S.Schema<MetricDataQuery>;
export type MetricDataQueries = MetricDataQuery[];
export const MetricDataQueries = /*@__PURE__*/ S.Array(MetricDataQuery);
export interface MetricMathAnomalyDetector {
  MetricDataQueries?: MetricDataQuery[];
}
export const MetricMathAnomalyDetector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MetricDataQueries: S.optional(MetricDataQueries) }),
).annotate({
  identifier: "MetricMathAnomalyDetector",
}) as any as S.Schema<MetricMathAnomalyDetector>;
export interface DeleteAnomalyDetectorInput {
  AnomalyDetectorId?: string;
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
  Stat?: string;
  SingleMetricAnomalyDetector?: SingleMetricAnomalyDetector;
  MetricMathAnomalyDetector?: MetricMathAnomalyDetector;
}
export const DeleteAnomalyDetectorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnomalyDetectorId: S.optional(S.String),
    Namespace: S.optional(S.String),
    MetricName: S.optional(S.String),
    Dimensions: S.optional(Dimensions),
    Stat: S.optional(S.String),
    SingleMetricAnomalyDetector: S.optional(SingleMetricAnomalyDetector),
    MetricMathAnomalyDetector: S.optional(MetricMathAnomalyDetector),
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
  identifier: "DeleteAnomalyDetectorInput",
}) as any as S.Schema<DeleteAnomalyDetectorInput>;
export interface DeleteAnomalyDetectorOutput {}
export const DeleteAnomalyDetectorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteAnomalyDetectorOutput",
}) as any as S.Schema<DeleteAnomalyDetectorOutput>;
export type DashboardName = string;
export type DashboardNames = string[];
export const DashboardNames = /*@__PURE__*/ S.Array(S.String);
export interface DeleteDashboardsInput {
  DashboardNames?: string[];
}
export const DeleteDashboardsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DashboardNames: S.optional(DashboardNames) }).pipe(
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
  identifier: "DeleteDashboardsInput",
}) as any as S.Schema<DeleteDashboardsInput>;
export interface DeleteDashboardsOutput {}
export const DeleteDashboardsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteDashboardsOutput",
}) as any as S.Schema<DeleteDashboardsOutput>;
export type InsightRuleName = string;
export type InsightRuleNames = string[];
export const InsightRuleNames = /*@__PURE__*/ S.Array(S.String);
export interface DeleteInsightRulesInput {
  RuleNames?: string[];
}
export const DeleteInsightRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleNames: S.optional(InsightRuleNames) }).pipe(
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
  identifier: "DeleteInsightRulesInput",
}) as any as S.Schema<DeleteInsightRulesInput>;
export type FailureResource = string;
export type ExceptionType = string;
export type FailureCode = string;
export type FailureDescription = string;
export interface PartialFailure {
  FailureResource?: string;
  ExceptionType?: string;
  FailureCode?: string;
  FailureDescription?: string;
}
export const PartialFailure = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FailureResource: S.optional(S.String),
    ExceptionType: S.optional(S.String),
    FailureCode: S.optional(S.String),
    FailureDescription: S.optional(S.String),
  }),
).annotate({ identifier: "PartialFailure" }) as any as S.Schema<PartialFailure>;
export type BatchFailures = PartialFailure[];
export const BatchFailures = /*@__PURE__*/ S.Array(PartialFailure);
export interface DeleteInsightRulesOutput {
  Failures?: PartialFailure[];
}
export const DeleteInsightRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Failures: S.optional(BatchFailures) }).pipe(ns),
).annotate({
  identifier: "DeleteInsightRulesOutput",
}) as any as S.Schema<DeleteInsightRulesOutput>;
export type MetricStreamName = string;
export interface DeleteMetricStreamInput {
  Name?: string;
}
export const DeleteMetricStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
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
  identifier: "DeleteMetricStreamInput",
}) as any as S.Schema<DeleteMetricStreamInput>;
export interface DeleteMetricStreamOutput {}
export const DeleteMetricStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteMetricStreamOutput",
}) as any as S.Schema<DeleteMetricStreamOutput>;
export type NextToken = string;
export interface DescribeAlarmContributorsInput {
  AlarmName?: string;
  NextToken?: string;
}
export const DescribeAlarmContributorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmName: S.optional(S.String),
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
  identifier: "DescribeAlarmContributorsInput",
}) as any as S.Schema<DescribeAlarmContributorsInput>;
export type ContributorId = string;
export type AttributeName = string;
export type AttributeValue = string;
export type ContributorAttributes = { [key: string]: string | undefined };
export const ContributorAttributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type StateReason = string;
export interface AlarmContributor {
  ContributorId?: string;
  ContributorAttributes?: { [key: string]: string | undefined };
  StateReason?: string;
  StateTransitionedTimestamp?: Date;
}
export const AlarmContributor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContributorId: S.optional(S.String),
    ContributorAttributes: S.optional(ContributorAttributes),
    StateReason: S.optional(S.String),
    StateTransitionedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "AlarmContributor",
}) as any as S.Schema<AlarmContributor>;
export type AlarmContributors = AlarmContributor[];
export const AlarmContributors = /*@__PURE__*/ S.Array(AlarmContributor);
export interface DescribeAlarmContributorsOutput {
  AlarmContributors: (AlarmContributor & {
    ContributorId: ContributorId;
    ContributorAttributes: ContributorAttributes;
    StateReason: StateReason;
  })[];
  NextToken?: string;
}
export const DescribeAlarmContributorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmContributors: S.optional(AlarmContributors),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAlarmContributorsOutput",
}) as any as S.Schema<DescribeAlarmContributorsOutput>;
export type AlarmType =
  | "CompositeAlarm"
  | "MetricAlarm"
  | "LogAlarm"
  | (string & {});
export const AlarmType = S.String;

export type AlarmTypes = AlarmType[];
export const AlarmTypes = /*@__PURE__*/ S.Array(AlarmType);
export type HistoryItemType =
  | "ConfigurationUpdate"
  | "StateUpdate"
  | "Action"
  | "AlarmContributorStateUpdate"
  | "AlarmContributorAction"
  | (string & {});
export const HistoryItemType = S.String;

export type MaxRecords = number;
export type ScanBy =
  | "TimestampDescending"
  | "TimestampAscending"
  | (string & {});
export const ScanBy = S.String;

export interface DescribeAlarmHistoryInput {
  AlarmName?: string;
  AlarmContributorId?: string;
  AlarmTypes?: AlarmType[];
  HistoryItemType?: HistoryItemType;
  StartDate?: Date;
  EndDate?: Date;
  MaxRecords?: number;
  NextToken?: string;
  ScanBy?: ScanBy;
}
export const DescribeAlarmHistoryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmName: S.optional(S.String),
    AlarmContributorId: S.optional(S.String),
    AlarmTypes: S.optional(AlarmTypes),
    HistoryItemType: S.optional(HistoryItemType),
    StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MaxRecords: S.optional(S.Number),
    NextToken: S.optional(S.String),
    ScanBy: S.optional(ScanBy),
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
  identifier: "DescribeAlarmHistoryInput",
}) as any as S.Schema<DescribeAlarmHistoryInput>;
export type HistorySummary = string;
export type HistoryData = string;
export interface AlarmHistoryItem {
  AlarmName?: string;
  AlarmContributorId?: string;
  AlarmType?: AlarmType;
  Timestamp?: Date;
  HistoryItemType?: HistoryItemType;
  HistorySummary?: string;
  HistoryData?: string;
  AlarmContributorAttributes?: { [key: string]: string | undefined };
}
export const AlarmHistoryItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmName: S.optional(S.String),
    AlarmContributorId: S.optional(S.String),
    AlarmType: S.optional(AlarmType),
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HistoryItemType: S.optional(HistoryItemType),
    HistorySummary: S.optional(S.String),
    HistoryData: S.optional(S.String),
    AlarmContributorAttributes: S.optional(ContributorAttributes),
  }),
).annotate({
  identifier: "AlarmHistoryItem",
}) as any as S.Schema<AlarmHistoryItem>;
export type AlarmHistoryItems = AlarmHistoryItem[];
export const AlarmHistoryItems = /*@__PURE__*/ S.Array(AlarmHistoryItem);
export interface DescribeAlarmHistoryOutput {
  AlarmHistoryItems?: AlarmHistoryItem[];
  NextToken?: string;
}
export const DescribeAlarmHistoryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmHistoryItems: S.optional(AlarmHistoryItems),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAlarmHistoryOutput",
}) as any as S.Schema<DescribeAlarmHistoryOutput>;
export type AlarmNamePrefix = string;
export type StateValue = "OK" | "ALARM" | "INSUFFICIENT_DATA" | (string & {});
export const StateValue = S.String;

export type ActionPrefix = string;
export interface DescribeAlarmsInput {
  AlarmNames?: string[];
  AlarmNamePrefix?: string;
  AlarmTypes?: AlarmType[];
  ChildrenOfAlarmName?: string;
  ParentsOfAlarmName?: string;
  StateValue?: StateValue;
  ActionPrefix?: string;
  MaxRecords?: number;
  NextToken?: string;
}
export const DescribeAlarmsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmNames: S.optional(AlarmNames),
    AlarmNamePrefix: S.optional(S.String),
    AlarmTypes: S.optional(AlarmTypes),
    ChildrenOfAlarmName: S.optional(S.String),
    ParentsOfAlarmName: S.optional(S.String),
    StateValue: S.optional(StateValue),
    ActionPrefix: S.optional(S.String),
    MaxRecords: S.optional(S.Number),
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
  identifier: "DescribeAlarmsInput",
}) as any as S.Schema<DescribeAlarmsInput>;
export type ActionsEnabled = boolean;
export type ResourceName = string;
export type ResourceList = string[];
export const ResourceList = /*@__PURE__*/ S.Array(S.String);
export type AlarmArn = string;
export type AlarmDescription = string;
export type AlarmRule = string;
export type StateReasonData = string;
export type ActionsSuppressedBy =
  | "WaitPeriod"
  | "ExtensionPeriod"
  | "Alarm"
  | (string & {});
export const ActionsSuppressedBy = S.String;

export type ActionsSuppressedReason = string;
export type SuppressorPeriod = number;
export interface CompositeAlarm {
  ActionsEnabled?: boolean;
  AlarmActions?: string[];
  AlarmArn?: string;
  AlarmConfigurationUpdatedTimestamp?: Date;
  AlarmDescription?: string;
  AlarmName?: string;
  AlarmRule?: string;
  InsufficientDataActions?: string[];
  OKActions?: string[];
  StateReason?: string;
  StateReasonData?: string;
  StateUpdatedTimestamp?: Date;
  StateValue?: StateValue;
  StateTransitionedTimestamp?: Date;
  ActionsSuppressedBy?: ActionsSuppressedBy;
  ActionsSuppressedReason?: string;
  ActionsSuppressor?: string;
  ActionsSuppressorWaitPeriod?: number;
  ActionsSuppressorExtensionPeriod?: number;
}
export const CompositeAlarm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionsEnabled: S.optional(S.Boolean),
    AlarmActions: S.optional(ResourceList),
    AlarmArn: S.optional(S.String),
    AlarmConfigurationUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AlarmDescription: S.optional(S.String),
    AlarmName: S.optional(S.String),
    AlarmRule: S.optional(S.String),
    InsufficientDataActions: S.optional(ResourceList),
    OKActions: S.optional(ResourceList),
    StateReason: S.optional(S.String),
    StateReasonData: S.optional(S.String),
    StateUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StateValue: S.optional(StateValue),
    StateTransitionedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ActionsSuppressedBy: S.optional(ActionsSuppressedBy),
    ActionsSuppressedReason: S.optional(S.String),
    ActionsSuppressor: S.optional(S.String),
    ActionsSuppressorWaitPeriod: S.optional(S.Number),
    ActionsSuppressorExtensionPeriod: S.optional(S.Number),
  }),
).annotate({ identifier: "CompositeAlarm" }) as any as S.Schema<CompositeAlarm>;
export type CompositeAlarms = CompositeAlarm[];
export const CompositeAlarms = /*@__PURE__*/ S.Array(CompositeAlarm);
export type Statistic =
  | "SampleCount"
  | "Average"
  | "Sum"
  | "Minimum"
  | "Maximum"
  | (string & {});
export const Statistic = S.String;

export type ExtendedStatistic = string;
export type EvaluationPeriods = number;
export type DatapointsToAlarm = number;
export type Threshold = number;
export type ComparisonOperator =
  | "GreaterThanOrEqualToThreshold"
  | "GreaterThanThreshold"
  | "LessThanThreshold"
  | "LessThanOrEqualToThreshold"
  | "LessThanLowerOrGreaterThanUpperThreshold"
  | "LessThanLowerThreshold"
  | "GreaterThanUpperThreshold"
  | (string & {});
export const ComparisonOperator = S.String;

export type TreatMissingData = string;
export type EvaluateLowSampleCountPercentile = string;
export type EvaluationState =
  | "PARTIAL_DATA"
  | "EVALUATION_FAILURE"
  | "EVALUATION_ERROR"
  | (string & {});
export const EvaluationState = S.String;

export type Timezone = string;
export interface WallClockWindow {
  Timezone?: string;
}
export const WallClockWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Timezone: S.optional(S.String) }),
).annotate({
  identifier: "WallClockWindow",
}) as any as S.Schema<WallClockWindow>;
export interface SlidingWindow {}
export const SlidingWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({ identifier: "SlidingWindow" }) as any as S.Schema<SlidingWindow>;
export type EvaluationWindow =
  | { WallClockWindow: WallClockWindow; SlidingWindow?: never }
  | { WallClockWindow?: never; SlidingWindow: SlidingWindow };
export const EvaluationWindow = /*@__PURE__*/ S.Union([
  S.Struct({ WallClockWindow: WallClockWindow }),
  S.Struct({ SlidingWindow: SlidingWindow }),
]);
export type WarmUpPeriodDurationInMinutes = number;
export type OnlyStartEvaluatingAfterWarmUpPeriodEnds = boolean;
export interface WarmUpConfiguration {
  WarmUpPeriodDurationInMinutes?: number;
  OnlyStartEvaluatingAfterWarmUpPeriodEnds?: boolean;
}
export const WarmUpConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WarmUpPeriodDurationInMinutes: S.optional(S.Number),
    OnlyStartEvaluatingAfterWarmUpPeriodEnds: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "WarmUpConfiguration",
}) as any as S.Schema<WarmUpConfiguration>;
export type Query = string;
export type PendingPeriod = number;
export type RecoveryPeriod = number;
export interface AlarmPromQLCriteria {
  Query?: string;
  PendingPeriod?: number;
  RecoveryPeriod?: number;
}
export const AlarmPromQLCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Query: S.optional(S.String),
    PendingPeriod: S.optional(S.Number),
    RecoveryPeriod: S.optional(S.Number),
  }),
).annotate({
  identifier: "AlarmPromQLCriteria",
}) as any as S.Schema<AlarmPromQLCriteria>;
export type EvaluationCriteria = { PromQLCriteria: AlarmPromQLCriteria };
export const EvaluationCriteria = /*@__PURE__*/ S.Union([
  S.Struct({ PromQLCriteria: AlarmPromQLCriteria }),
]);
export type EvaluationInterval = number;
export interface MetricAlarm {
  AlarmName?: string;
  AlarmArn?: string;
  AlarmDescription?: string;
  AlarmConfigurationUpdatedTimestamp?: Date;
  ActionsEnabled?: boolean;
  OKActions?: string[];
  AlarmActions?: string[];
  InsufficientDataActions?: string[];
  StateValue?: StateValue;
  StateReason?: string;
  StateReasonData?: string;
  StateUpdatedTimestamp?: Date;
  MetricName?: string;
  Namespace?: string;
  Statistic?: Statistic;
  ExtendedStatistic?: string;
  Dimensions?: Dimension[];
  Period?: number;
  Unit?: StandardUnit;
  EvaluationPeriods?: number;
  DatapointsToAlarm?: number;
  Threshold?: number;
  ComparisonOperator?: ComparisonOperator;
  TreatMissingData?: string;
  EvaluateLowSampleCountPercentile?: string;
  Metrics?: MetricDataQuery[];
  ThresholdMetricId?: string;
  EvaluationState?: EvaluationState;
  StateTransitionedTimestamp?: Date;
  EvaluationWindow?: EvaluationWindow;
  WarmUpConfiguration?: WarmUpConfiguration;
  EvaluationCriteria?: EvaluationCriteria;
  EvaluationInterval?: number;
}
export const MetricAlarm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmName: S.optional(S.String),
    AlarmArn: S.optional(S.String),
    AlarmDescription: S.optional(S.String),
    AlarmConfigurationUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ActionsEnabled: S.optional(S.Boolean),
    OKActions: S.optional(ResourceList),
    AlarmActions: S.optional(ResourceList),
    InsufficientDataActions: S.optional(ResourceList),
    StateValue: S.optional(StateValue),
    StateReason: S.optional(S.String),
    StateReasonData: S.optional(S.String),
    StateUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    MetricName: S.optional(S.String),
    Namespace: S.optional(S.String),
    Statistic: S.optional(Statistic),
    ExtendedStatistic: S.optional(S.String),
    Dimensions: S.optional(Dimensions),
    Period: S.optional(S.Number),
    Unit: S.optional(StandardUnit),
    EvaluationPeriods: S.optional(S.Number),
    DatapointsToAlarm: S.optional(S.Number),
    Threshold: S.optional(S.Number),
    ComparisonOperator: S.optional(ComparisonOperator),
    TreatMissingData: S.optional(S.String),
    EvaluateLowSampleCountPercentile: S.optional(S.String),
    Metrics: S.optional(MetricDataQueries),
    ThresholdMetricId: S.optional(S.String),
    EvaluationState: S.optional(EvaluationState),
    StateTransitionedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EvaluationWindow: S.optional(EvaluationWindow),
    WarmUpConfiguration: S.optional(WarmUpConfiguration),
    EvaluationCriteria: S.optional(EvaluationCriteria),
    EvaluationInterval: S.optional(S.Number),
  }),
).annotate({ identifier: "MetricAlarm" }) as any as S.Schema<MetricAlarm>;
export type MetricAlarms = MetricAlarm[];
export const MetricAlarms = /*@__PURE__*/ S.Array(MetricAlarm);
export type QueryString = string;
export type AmazonResourceName = string;
export type LogGroupIdentifiers = string[];
export const LogGroupIdentifiers = /*@__PURE__*/ S.Array(S.String);
export type ScheduleExpression = string;
export type StartTimeOffset = number;
export type EndTimeOffset = number;
export interface ScheduleConfiguration {
  ScheduleExpression?: string;
  StartTimeOffset?: number;
  EndTimeOffset?: number;
}
export const ScheduleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduleExpression: S.optional(S.String),
    StartTimeOffset: S.optional(S.Number),
    EndTimeOffset: S.optional(S.Number),
  }),
).annotate({
  identifier: "ScheduleConfiguration",
}) as any as S.Schema<ScheduleConfiguration>;
export type AggregationExpression = string;
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
export interface ScheduledQueryConfiguration {
  QueryString?: string;
  LogGroupIdentifiers?: string[];
  QueryARN?: string;
  ScheduledQueryRoleARN?: string;
  ScheduleConfiguration?: ScheduleConfiguration;
  AggregationExpression?: string;
  Tags?: Tag[];
}
export const ScheduledQueryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QueryString: S.optional(S.String),
    LogGroupIdentifiers: S.optional(LogGroupIdentifiers),
    QueryARN: S.optional(S.String),
    ScheduledQueryRoleARN: S.optional(S.String),
    ScheduleConfiguration: S.optional(ScheduleConfiguration),
    AggregationExpression: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "ScheduledQueryConfiguration",
}) as any as S.Schema<ScheduledQueryConfiguration>;
export type QueryResultsToEvaluate = number;
export type QueryResultsToAlarm = number;
export type ActionLogLineCount = number;
export type ActionLogLineRoleArn = string;
export interface LogAlarm {
  AlarmName?: string;
  AlarmArn?: string;
  AlarmDescription?: string;
  AlarmConfigurationUpdatedTimestamp?: Date;
  ActionsEnabled?: boolean;
  OKActions?: string[];
  AlarmActions?: string[];
  InsufficientDataActions?: string[];
  StateValue?: StateValue;
  StateReason?: string;
  StateReasonData?: string;
  StateUpdatedTimestamp?: Date;
  ScheduledQueryConfiguration?: ScheduledQueryConfiguration;
  QueryResultsToEvaluate?: number;
  QueryResultsToAlarm?: number;
  Threshold?: number;
  ComparisonOperator?: ComparisonOperator;
  TreatMissingData?: string;
  StateTransitionedTimestamp?: Date;
  EvaluationState?: EvaluationState;
  ActionLogLineCount?: number;
  ActionLogLineRoleArn?: string;
  WarmUpConfiguration?: WarmUpConfiguration;
}
export const LogAlarm = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmName: S.optional(S.String),
    AlarmArn: S.optional(S.String),
    AlarmDescription: S.optional(S.String),
    AlarmConfigurationUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ActionsEnabled: S.optional(S.Boolean),
    OKActions: S.optional(ResourceList),
    AlarmActions: S.optional(ResourceList),
    InsufficientDataActions: S.optional(ResourceList),
    StateValue: S.optional(StateValue),
    StateReason: S.optional(S.String),
    StateReasonData: S.optional(S.String),
    StateUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ScheduledQueryConfiguration: S.optional(ScheduledQueryConfiguration),
    QueryResultsToEvaluate: S.optional(S.Number),
    QueryResultsToAlarm: S.optional(S.Number),
    Threshold: S.optional(S.Number),
    ComparisonOperator: S.optional(ComparisonOperator),
    TreatMissingData: S.optional(S.String),
    StateTransitionedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EvaluationState: S.optional(EvaluationState),
    ActionLogLineCount: S.optional(S.Number),
    ActionLogLineRoleArn: S.optional(S.String),
    WarmUpConfiguration: S.optional(WarmUpConfiguration),
  }),
).annotate({ identifier: "LogAlarm" }) as any as S.Schema<LogAlarm>;
export type LogAlarms = LogAlarm[];
export const LogAlarms = /*@__PURE__*/ S.Array(LogAlarm);
export interface DescribeAlarmsOutput {
  CompositeAlarms?: CompositeAlarm[];
  MetricAlarms?: (MetricAlarm & {
    Dimensions: (Dimension & { Name: DimensionName; Value: DimensionValue })[];
    Metrics: (MetricDataQuery & {
      Id: MetricId;
      MetricStat: MetricStat & {
        Metric: Metric & {
          Dimensions: (Dimension & {
            Name: DimensionName;
            Value: DimensionValue;
          })[];
        };
        Period: Period;
        Stat: Stat;
      };
    })[];
    WarmUpConfiguration: WarmUpConfiguration & {
      WarmUpPeriodDurationInMinutes: WarmUpPeriodDurationInMinutes;
    };
  })[];
  LogAlarms?: (LogAlarm & {
    ScheduledQueryConfiguration: ScheduledQueryConfiguration & {
      QueryString: QueryString;
      ScheduledQueryRoleARN: AmazonResourceName;
      ScheduleConfiguration: ScheduleConfiguration & {
        ScheduleExpression: ScheduleExpression;
        StartTimeOffset: StartTimeOffset;
      };
      AggregationExpression: AggregationExpression;
      Tags: (Tag & { Key: TagKey; Value: TagValue })[];
    };
    WarmUpConfiguration: WarmUpConfiguration & {
      WarmUpPeriodDurationInMinutes: WarmUpPeriodDurationInMinutes;
    };
  })[];
  NextToken?: string;
}
export const DescribeAlarmsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CompositeAlarms: S.optional(CompositeAlarms),
    MetricAlarms: S.optional(MetricAlarms),
    LogAlarms: S.optional(LogAlarms),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAlarmsOutput",
}) as any as S.Schema<DescribeAlarmsOutput>;
export interface DescribeAlarmsForMetricInput {
  MetricName?: string;
  Namespace?: string;
  Statistic?: Statistic;
  ExtendedStatistic?: string;
  Dimensions?: Dimension[];
  Period?: number;
  Unit?: StandardUnit;
}
export const DescribeAlarmsForMetricInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    Namespace: S.optional(S.String),
    Statistic: S.optional(Statistic),
    ExtendedStatistic: S.optional(S.String),
    Dimensions: S.optional(Dimensions),
    Period: S.optional(S.Number),
    Unit: S.optional(StandardUnit),
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
  identifier: "DescribeAlarmsForMetricInput",
}) as any as S.Schema<DescribeAlarmsForMetricInput>;
export interface DescribeAlarmsForMetricOutput {
  MetricAlarms?: (MetricAlarm & {
    Dimensions: (Dimension & { Name: DimensionName; Value: DimensionValue })[];
    Metrics: (MetricDataQuery & {
      Id: MetricId;
      MetricStat: MetricStat & {
        Metric: Metric & {
          Dimensions: (Dimension & {
            Name: DimensionName;
            Value: DimensionValue;
          })[];
        };
        Period: Period;
        Stat: Stat;
      };
    })[];
    WarmUpConfiguration: WarmUpConfiguration & {
      WarmUpPeriodDurationInMinutes: WarmUpPeriodDurationInMinutes;
    };
  })[];
}
export const DescribeAlarmsForMetricOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MetricAlarms: S.optional(MetricAlarms) }).pipe(ns),
).annotate({
  identifier: "DescribeAlarmsForMetricOutput",
}) as any as S.Schema<DescribeAlarmsForMetricOutput>;
export type AnomalyDetectorIds = string[];
export const AnomalyDetectorIds = /*@__PURE__*/ S.Array(S.String);
export type MaxReturnedResultsCount = number;
export type AnomalyDetectorType =
  | "SINGLE_METRIC"
  | "METRIC_MATH"
  | (string & {});
export const AnomalyDetectorType = S.String;

export type AnomalyDetectorTypes = AnomalyDetectorType[];
export const AnomalyDetectorTypes = /*@__PURE__*/ S.Array(AnomalyDetectorType);
export interface DescribeAnomalyDetectorsInput {
  AnomalyDetectorIds?: string[];
  NextToken?: string;
  MaxResults?: number;
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
  AnomalyDetectorTypes?: AnomalyDetectorType[];
}
export const DescribeAnomalyDetectorsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnomalyDetectorIds: S.optional(AnomalyDetectorIds),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Namespace: S.optional(S.String),
    MetricName: S.optional(S.String),
    Dimensions: S.optional(Dimensions),
    AnomalyDetectorTypes: S.optional(AnomalyDetectorTypes),
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
  identifier: "DescribeAnomalyDetectorsInput",
}) as any as S.Schema<DescribeAnomalyDetectorsInput>;
export interface Range {
  StartTime?: Date;
  EndTime?: Date;
}
export const Range = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Range" }) as any as S.Schema<Range>;
export type AnomalyDetectorExcludedTimeRanges = Range[];
export const AnomalyDetectorExcludedTimeRanges = /*@__PURE__*/ S.Array(Range);
export type AnomalyDetectorMetricTimezone = string;
export interface AnomalyDetectorConfiguration {
  ExcludedTimeRanges?: Range[];
  MetricTimezone?: string;
}
export const AnomalyDetectorConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExcludedTimeRanges: S.optional(AnomalyDetectorExcludedTimeRanges),
    MetricTimezone: S.optional(S.String),
  }),
).annotate({
  identifier: "AnomalyDetectorConfiguration",
}) as any as S.Schema<AnomalyDetectorConfiguration>;
export type AnomalyDetectorStateValue =
  | "PENDING_TRAINING"
  | "TRAINED_INSUFFICIENT_DATA"
  | "TRAINED"
  | (string & {});
export const AnomalyDetectorStateValue = S.String;

export type PeriodicSpikes = boolean;
export interface MetricCharacteristics {
  PeriodicSpikes?: boolean;
}
export const MetricCharacteristics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PeriodicSpikes: S.optional(S.Boolean) }),
).annotate({
  identifier: "MetricCharacteristics",
}) as any as S.Schema<MetricCharacteristics>;
export interface AnomalyDetector {
  AnomalyDetectorId?: string;
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
  Stat?: string;
  Configuration?: AnomalyDetectorConfiguration;
  StateValue?: AnomalyDetectorStateValue;
  MetricCharacteristics?: MetricCharacteristics;
  SingleMetricAnomalyDetector?: SingleMetricAnomalyDetector;
  MetricMathAnomalyDetector?: MetricMathAnomalyDetector;
}
export const AnomalyDetector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnomalyDetectorId: S.optional(S.String),
    Namespace: S.optional(S.String),
    MetricName: S.optional(S.String),
    Dimensions: S.optional(Dimensions),
    Stat: S.optional(S.String),
    Configuration: S.optional(AnomalyDetectorConfiguration),
    StateValue: S.optional(AnomalyDetectorStateValue),
    MetricCharacteristics: S.optional(MetricCharacteristics),
    SingleMetricAnomalyDetector: S.optional(SingleMetricAnomalyDetector),
    MetricMathAnomalyDetector: S.optional(MetricMathAnomalyDetector),
  }),
).annotate({
  identifier: "AnomalyDetector",
}) as any as S.Schema<AnomalyDetector>;
export type AnomalyDetectors = AnomalyDetector[];
export const AnomalyDetectors = /*@__PURE__*/ S.Array(AnomalyDetector);
export interface DescribeAnomalyDetectorsOutput {
  AnomalyDetectors?: (AnomalyDetector & {
    Dimensions: (Dimension & { Name: DimensionName; Value: DimensionValue })[];
    Configuration: AnomalyDetectorConfiguration & {
      ExcludedTimeRanges: (Range & { StartTime: Date; EndTime: Date })[];
    };
    SingleMetricAnomalyDetector: SingleMetricAnomalyDetector & {
      Dimensions: (Dimension & {
        Name: DimensionName;
        Value: DimensionValue;
      })[];
    };
    MetricMathAnomalyDetector: MetricMathAnomalyDetector & {
      MetricDataQueries: (MetricDataQuery & {
        Id: MetricId;
        MetricStat: MetricStat & {
          Metric: Metric & {
            Dimensions: (Dimension & {
              Name: DimensionName;
              Value: DimensionValue;
            })[];
          };
          Period: Period;
          Stat: Stat;
        };
      })[];
    };
  })[];
  NextToken?: string;
}
export const DescribeAnomalyDetectorsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnomalyDetectors: S.optional(AnomalyDetectors),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeAnomalyDetectorsOutput",
}) as any as S.Schema<DescribeAnomalyDetectorsOutput>;
export type InsightRuleMaxResults = number;
export interface DescribeInsightRulesInput {
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeInsightRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
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
  identifier: "DescribeInsightRulesInput",
}) as any as S.Schema<DescribeInsightRulesInput>;
export type InsightRuleState = string;
export type InsightRuleSchema = string;
export type InsightRuleDefinition = string;
export type InsightRuleIsManaged = boolean;
export type InsightRuleOnTransformedLogs = boolean;
export interface InsightRule {
  Name?: string;
  State?: string;
  Schema?: string;
  Definition?: string;
  ManagedRule?: boolean;
  ApplyOnTransformedLogs?: boolean;
}
export const InsightRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    State: S.optional(S.String),
    Schema: S.optional(S.String),
    Definition: S.optional(S.String),
    ManagedRule: S.optional(S.Boolean),
    ApplyOnTransformedLogs: S.optional(S.Boolean),
  }),
).annotate({ identifier: "InsightRule" }) as any as S.Schema<InsightRule>;
export type InsightRules = InsightRule[];
export const InsightRules = /*@__PURE__*/ S.Array(InsightRule);
export interface DescribeInsightRulesOutput {
  NextToken?: string;
  InsightRules?: (InsightRule & {
    Name: InsightRuleName;
    State: InsightRuleState;
    Schema: InsightRuleSchema;
    Definition: InsightRuleDefinition;
  })[];
}
export const DescribeInsightRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    InsightRules: S.optional(InsightRules),
  }).pipe(ns),
).annotate({
  identifier: "DescribeInsightRulesOutput",
}) as any as S.Schema<DescribeInsightRulesOutput>;
export interface DisableAlarmActionsInput {
  AlarmNames?: string[];
}
export const DisableAlarmActionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AlarmNames: S.optional(AlarmNames) }).pipe(
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
  identifier: "DisableAlarmActionsInput",
}) as any as S.Schema<DisableAlarmActionsInput>;
export interface DisableAlarmActionsResponse {}
export const DisableAlarmActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisableAlarmActionsResponse",
}) as any as S.Schema<DisableAlarmActionsResponse>;
export interface DisableInsightRulesInput {
  RuleNames?: string[];
}
export const DisableInsightRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleNames: S.optional(InsightRuleNames) }).pipe(
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
  identifier: "DisableInsightRulesInput",
}) as any as S.Schema<DisableInsightRulesInput>;
export interface DisableInsightRulesOutput {
  Failures?: PartialFailure[];
}
export const DisableInsightRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Failures: S.optional(BatchFailures) }).pipe(ns),
).annotate({
  identifier: "DisableInsightRulesOutput",
}) as any as S.Schema<DisableInsightRulesOutput>;
export interface DisassociateDatasetKmsKeyInput {
  DatasetIdentifier?: string;
}
export const DisassociateDatasetKmsKeyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "DisassociateDatasetKmsKeyInput",
}) as any as S.Schema<DisassociateDatasetKmsKeyInput>;
export interface DisassociateDatasetKmsKeyOutput {}
export const DisassociateDatasetKmsKeyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisassociateDatasetKmsKeyOutput",
}) as any as S.Schema<DisassociateDatasetKmsKeyOutput>;
export interface EnableAlarmActionsInput {
  AlarmNames?: string[];
}
export const EnableAlarmActionsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AlarmNames: S.optional(AlarmNames) }).pipe(
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
  identifier: "EnableAlarmActionsInput",
}) as any as S.Schema<EnableAlarmActionsInput>;
export interface EnableAlarmActionsResponse {}
export const EnableAlarmActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "EnableAlarmActionsResponse",
}) as any as S.Schema<EnableAlarmActionsResponse>;
export interface EnableInsightRulesInput {
  RuleNames?: string[];
}
export const EnableInsightRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleNames: S.optional(InsightRuleNames) }).pipe(
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
  identifier: "EnableInsightRulesInput",
}) as any as S.Schema<EnableInsightRulesInput>;
export interface EnableInsightRulesOutput {
  Failures?: PartialFailure[];
}
export const EnableInsightRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Failures: S.optional(BatchFailures) }).pipe(ns),
).annotate({
  identifier: "EnableInsightRulesOutput",
}) as any as S.Schema<EnableInsightRulesOutput>;
export interface GetAlarmMuteRuleInput {
  AlarmMuteRuleName?: string;
}
export const GetAlarmMuteRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AlarmMuteRuleName: S.optional(S.String) }).pipe(
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
  identifier: "GetAlarmMuteRuleInput",
}) as any as S.Schema<GetAlarmMuteRuleInput>;
export type Arn = string;
export type Expression = string;
export type Duration = string;
export interface Schedule {
  Expression?: string;
  Duration?: string;
  Timezone?: string;
}
export const Schedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Expression: S.optional(S.String),
    Duration: S.optional(S.String),
    Timezone: S.optional(S.String),
  }),
).annotate({ identifier: "Schedule" }) as any as S.Schema<Schedule>;
export interface Rule {
  Schedule?: Schedule;
}
export const Rule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Schedule: S.optional(Schedule) }),
).annotate({ identifier: "Rule" }) as any as S.Schema<Rule>;
export type MuteTargetAlarmNameList = string[];
export const MuteTargetAlarmNameList = /*@__PURE__*/ S.Array(S.String);
export interface MuteTargets {
  AlarmNames?: string[];
}
export const MuteTargets = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AlarmNames: S.optional(MuteTargetAlarmNameList) }),
).annotate({ identifier: "MuteTargets" }) as any as S.Schema<MuteTargets>;
export type AlarmMuteRuleStatus =
  | "SCHEDULED"
  | "ACTIVE"
  | "EXPIRED"
  | (string & {});
export const AlarmMuteRuleStatus = S.String;

export type MuteType = string;
export interface GetAlarmMuteRuleOutput {
  Name?: string;
  AlarmMuteRuleArn?: string;
  Description?: string;
  Rule?: Rule & {
    Schedule: Schedule & { Expression: Expression; Duration: Duration };
  };
  MuteTargets?: MuteTargets & { AlarmNames: MuteTargetAlarmNameList };
  StartDate?: Date;
  ExpireDate?: Date;
  Status?: AlarmMuteRuleStatus;
  LastUpdatedTimestamp?: Date;
  MuteType?: string;
}
export const GetAlarmMuteRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    AlarmMuteRuleArn: S.optional(S.String),
    Description: S.optional(S.String),
    Rule: S.optional(Rule),
    MuteTargets: S.optional(MuteTargets),
    StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExpireDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(AlarmMuteRuleStatus),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    MuteType: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetAlarmMuteRuleOutput",
}) as any as S.Schema<GetAlarmMuteRuleOutput>;
export interface GetDashboardInput {
  DashboardName?: string;
}
export const GetDashboardInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DashboardName: S.optional(S.String) }).pipe(
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
  identifier: "GetDashboardInput",
}) as any as S.Schema<GetDashboardInput>;
export type DashboardArn = string;
export type DashboardBody = string;
export interface GetDashboardOutput {
  DashboardArn?: string;
  DashboardBody?: string;
  DashboardName?: string;
}
export const GetDashboardOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardArn: S.optional(S.String),
    DashboardBody: S.optional(S.String),
    DashboardName: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetDashboardOutput",
}) as any as S.Schema<GetDashboardOutput>;
export interface GetDatasetInput {
  DatasetIdentifier?: string;
}
export const GetDatasetInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DatasetIdentifier: S.optional(S.String) }).pipe(
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
  identifier: "GetDatasetInput",
}) as any as S.Schema<GetDatasetInput>;
export type DatasetId = string;
export type DatasetArn = string;
export interface GetDatasetOutput {
  DatasetId: string;
  Arn: string;
  KmsKeyArn?: string;
}
export const GetDatasetOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DatasetId: S.optional(S.String),
    Arn: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "GetDatasetOutput",
}) as any as S.Schema<GetDatasetOutput>;
export type InsightRuleUnboundInteger = number;
export type InsightRuleMetricName = string;
export type InsightRuleMetricList = string[];
export const InsightRuleMetricList = /*@__PURE__*/ S.Array(S.String);
export type InsightRuleOrderBy = string;
export interface GetInsightRuleReportInput {
  RuleName?: string;
  StartTime?: Date;
  EndTime?: Date;
  Period?: number;
  MaxContributorCount?: number;
  Metrics?: string[];
  OrderBy?: string;
}
export const GetInsightRuleReportInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Period: S.optional(S.Number),
    MaxContributorCount: S.optional(S.Number),
    Metrics: S.optional(InsightRuleMetricList),
    OrderBy: S.optional(S.String),
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
  identifier: "GetInsightRuleReportInput",
}) as any as S.Schema<GetInsightRuleReportInput>;
export type InsightRuleContributorKeyLabel = string;
export type InsightRuleContributorKeyLabels = string[];
export const InsightRuleContributorKeyLabels = /*@__PURE__*/ S.Array(S.String);
export type InsightRuleAggregationStatistic = string;
export type InsightRuleUnboundDouble = number;
export type InsightRuleUnboundLong = number;
export type InsightRuleContributorKey = string;
export type InsightRuleContributorKeys = string[];
export const InsightRuleContributorKeys = /*@__PURE__*/ S.Array(S.String);
export interface InsightRuleContributorDatapoint {
  Timestamp?: Date;
  ApproximateValue?: number;
}
export const InsightRuleContributorDatapoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ApproximateValue: S.optional(S.Number),
  }),
).annotate({
  identifier: "InsightRuleContributorDatapoint",
}) as any as S.Schema<InsightRuleContributorDatapoint>;
export type InsightRuleContributorDatapoints =
  InsightRuleContributorDatapoint[];
export const InsightRuleContributorDatapoints = /*@__PURE__*/ S.Array(
  InsightRuleContributorDatapoint,
);
export interface InsightRuleContributor {
  Keys?: string[];
  ApproximateAggregateValue?: number;
  Datapoints?: InsightRuleContributorDatapoint[];
}
export const InsightRuleContributor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Keys: S.optional(InsightRuleContributorKeys),
    ApproximateAggregateValue: S.optional(S.Number),
    Datapoints: S.optional(InsightRuleContributorDatapoints),
  }),
).annotate({
  identifier: "InsightRuleContributor",
}) as any as S.Schema<InsightRuleContributor>;
export type InsightRuleContributors = InsightRuleContributor[];
export const InsightRuleContributors = /*@__PURE__*/ S.Array(
  InsightRuleContributor,
);
export interface InsightRuleMetricDatapoint {
  Timestamp?: Date;
  UniqueContributors?: number;
  MaxContributorValue?: number;
  SampleCount?: number;
  Average?: number;
  Sum?: number;
  Minimum?: number;
  Maximum?: number;
}
export const InsightRuleMetricDatapoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UniqueContributors: S.optional(S.Number),
    MaxContributorValue: S.optional(S.Number),
    SampleCount: S.optional(S.Number),
    Average: S.optional(S.Number),
    Sum: S.optional(S.Number),
    Minimum: S.optional(S.Number),
    Maximum: S.optional(S.Number),
  }),
).annotate({
  identifier: "InsightRuleMetricDatapoint",
}) as any as S.Schema<InsightRuleMetricDatapoint>;
export type InsightRuleMetricDatapoints = InsightRuleMetricDatapoint[];
export const InsightRuleMetricDatapoints = /*@__PURE__*/ S.Array(
  InsightRuleMetricDatapoint,
);
export interface GetInsightRuleReportOutput {
  KeyLabels?: string[];
  AggregationStatistic?: string;
  AggregateValue?: number;
  ApproximateUniqueCount?: number;
  Contributors?: (InsightRuleContributor & {
    Keys: InsightRuleContributorKeys;
    ApproximateAggregateValue: InsightRuleUnboundDouble;
    Datapoints: (InsightRuleContributorDatapoint & {
      Timestamp: Date;
      ApproximateValue: InsightRuleUnboundDouble;
    })[];
  })[];
  MetricDatapoints?: (InsightRuleMetricDatapoint & { Timestamp: Date })[];
}
export const GetInsightRuleReportOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyLabels: S.optional(InsightRuleContributorKeyLabels),
    AggregationStatistic: S.optional(S.String),
    AggregateValue: S.optional(S.Number),
    ApproximateUniqueCount: S.optional(S.Number),
    Contributors: S.optional(InsightRuleContributors),
    MetricDatapoints: S.optional(InsightRuleMetricDatapoints),
  }).pipe(ns),
).annotate({
  identifier: "GetInsightRuleReportOutput",
}) as any as S.Schema<GetInsightRuleReportOutput>;
export type GetMetricDataMaxDatapoints = number;
export type GetMetricDataLabelTimezone = string;
export interface LabelOptions {
  Timezone?: string;
}
export const LabelOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Timezone: S.optional(S.String) }),
).annotate({ identifier: "LabelOptions" }) as any as S.Schema<LabelOptions>;
export interface GetMetricDataInput {
  MetricDataQueries?: MetricDataQuery[];
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  ScanBy?: ScanBy;
  MaxDatapoints?: number;
  LabelOptions?: LabelOptions;
}
export const GetMetricDataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricDataQueries: S.optional(MetricDataQueries),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    NextToken: S.optional(S.String),
    ScanBy: S.optional(ScanBy),
    MaxDatapoints: S.optional(S.Number),
    LabelOptions: S.optional(LabelOptions),
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
  identifier: "GetMetricDataInput",
}) as any as S.Schema<GetMetricDataInput>;
export type Timestamps = Date[];
export const Timestamps = /*@__PURE__*/ S.Array(
  S.Date.pipe(T.TimestampFormat("epoch-seconds")),
);
export type DatapointValue = number;
export type DatapointValues = number[];
export const DatapointValues = /*@__PURE__*/ S.Array(S.Number);
export type StatusCode =
  | "Complete"
  | "InternalError"
  | "PartialData"
  | "Forbidden"
  | (string & {});
export const StatusCode = S.String;

export type MessageDataCode = string;
export type MessageDataValue = string;
export interface MessageData {
  Code?: string;
  Value?: string;
}
export const MessageData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "MessageData" }) as any as S.Schema<MessageData>;
export type MetricDataResultMessages = MessageData[];
export const MetricDataResultMessages = /*@__PURE__*/ S.Array(MessageData);
export interface MetricDataResult {
  Id?: string;
  Label?: string;
  Timestamps?: Date[];
  Values?: number[];
  StatusCode?: StatusCode;
  Messages?: MessageData[];
}
export const MetricDataResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Label: S.optional(S.String),
    Timestamps: S.optional(Timestamps),
    Values: S.optional(DatapointValues),
    StatusCode: S.optional(StatusCode),
    Messages: S.optional(MetricDataResultMessages),
  }),
).annotate({
  identifier: "MetricDataResult",
}) as any as S.Schema<MetricDataResult>;
export type MetricDataResults = MetricDataResult[];
export const MetricDataResults = /*@__PURE__*/ S.Array(MetricDataResult);
export interface GetMetricDataOutput {
  MetricDataResults?: MetricDataResult[];
  NextToken?: string;
  Messages?: MessageData[];
}
export const GetMetricDataOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricDataResults: S.optional(MetricDataResults),
    NextToken: S.optional(S.String),
    Messages: S.optional(MetricDataResultMessages),
  }).pipe(ns),
).annotate({
  identifier: "GetMetricDataOutput",
}) as any as S.Schema<GetMetricDataOutput>;
export type Statistics = Statistic[];
export const Statistics = /*@__PURE__*/ S.Array(Statistic);
export type ExtendedStatistics = string[];
export const ExtendedStatistics = /*@__PURE__*/ S.Array(S.String);
export interface GetMetricStatisticsInput {
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
  StartTime?: Date;
  EndTime?: Date;
  Period?: number;
  Statistics?: Statistic[];
  ExtendedStatistics?: string[];
  Unit?: StandardUnit;
}
export const GetMetricStatisticsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Namespace: S.optional(S.String),
    MetricName: S.optional(S.String),
    Dimensions: S.optional(Dimensions),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Period: S.optional(S.Number),
    Statistics: S.optional(Statistics),
    ExtendedStatistics: S.optional(ExtendedStatistics),
    Unit: S.optional(StandardUnit),
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
  identifier: "GetMetricStatisticsInput",
}) as any as S.Schema<GetMetricStatisticsInput>;
export type DatapointValueMap = { [key: string]: number | undefined };
export const DatapointValueMap = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface Datapoint {
  Timestamp?: Date;
  SampleCount?: number;
  Average?: number;
  Sum?: number;
  Minimum?: number;
  Maximum?: number;
  Unit?: StandardUnit;
  ExtendedStatistics?: { [key: string]: number | undefined };
}
export const Datapoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SampleCount: S.optional(S.Number),
    Average: S.optional(S.Number),
    Sum: S.optional(S.Number),
    Minimum: S.optional(S.Number),
    Maximum: S.optional(S.Number),
    Unit: S.optional(StandardUnit),
    ExtendedStatistics: S.optional(DatapointValueMap),
  }),
).annotate({ identifier: "Datapoint" }) as any as S.Schema<Datapoint>;
export type Datapoints = Datapoint[];
export const Datapoints = /*@__PURE__*/ S.Array(Datapoint);
export interface GetMetricStatisticsOutput {
  Label?: string;
  Datapoints?: Datapoint[];
}
export const GetMetricStatisticsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Label: S.optional(S.String),
    Datapoints: S.optional(Datapoints),
  }).pipe(ns),
).annotate({
  identifier: "GetMetricStatisticsOutput",
}) as any as S.Schema<GetMetricStatisticsOutput>;
export interface GetMetricStreamInput {
  Name?: string;
}
export const GetMetricStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }).pipe(
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
  identifier: "GetMetricStreamInput",
}) as any as S.Schema<GetMetricStreamInput>;
export type MetricStreamFilterMetricNames = string[];
export const MetricStreamFilterMetricNames = /*@__PURE__*/ S.Array(S.String);
export interface MetricStreamFilter {
  Namespace?: string;
  MetricNames?: string[];
}
export const MetricStreamFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Namespace: S.optional(S.String),
    MetricNames: S.optional(MetricStreamFilterMetricNames),
  }),
).annotate({
  identifier: "MetricStreamFilter",
}) as any as S.Schema<MetricStreamFilter>;
export type MetricStreamFilters = MetricStreamFilter[];
export const MetricStreamFilters = /*@__PURE__*/ S.Array(MetricStreamFilter);
export type MetricStreamState = string;
export type MetricStreamOutputFormat =
  | "json"
  | "opentelemetry0.7"
  | "opentelemetry1.0"
  | (string & {});
export const MetricStreamOutputFormat = S.String;

export interface MetricStreamStatisticsMetric {
  Namespace?: string;
  MetricName?: string;
}
export const MetricStreamStatisticsMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Namespace: S.optional(S.String),
    MetricName: S.optional(S.String),
  }),
).annotate({
  identifier: "MetricStreamStatisticsMetric",
}) as any as S.Schema<MetricStreamStatisticsMetric>;
export type MetricStreamStatisticsIncludeMetrics =
  MetricStreamStatisticsMetric[];
export const MetricStreamStatisticsIncludeMetrics = /*@__PURE__*/ S.Array(
  MetricStreamStatisticsMetric,
);
export type MetricStreamStatistic = string;
export type MetricStreamStatisticsAdditionalStatistics = string[];
export const MetricStreamStatisticsAdditionalStatistics = /*@__PURE__*/ S.Array(
  S.String,
);
export interface MetricStreamStatisticsConfiguration {
  IncludeMetrics?: MetricStreamStatisticsMetric[];
  AdditionalStatistics?: string[];
}
export const MetricStreamStatisticsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IncludeMetrics: S.optional(MetricStreamStatisticsIncludeMetrics),
    AdditionalStatistics: S.optional(
      MetricStreamStatisticsAdditionalStatistics,
    ),
  }),
).annotate({
  identifier: "MetricStreamStatisticsConfiguration",
}) as any as S.Schema<MetricStreamStatisticsConfiguration>;
export type MetricStreamStatisticsConfigurations =
  MetricStreamStatisticsConfiguration[];
export const MetricStreamStatisticsConfigurations = /*@__PURE__*/ S.Array(
  MetricStreamStatisticsConfiguration,
);
export type IncludeLinkedAccountsMetrics = boolean;
export interface GetMetricStreamOutput {
  Arn?: string;
  Name?: string;
  IncludeFilters?: MetricStreamFilter[];
  ExcludeFilters?: MetricStreamFilter[];
  FirehoseArn?: string;
  RoleArn?: string;
  State?: string;
  CreationDate?: Date;
  LastUpdateDate?: Date;
  OutputFormat?: MetricStreamOutputFormat;
  StatisticsConfigurations?: (MetricStreamStatisticsConfiguration & {
    IncludeMetrics: (MetricStreamStatisticsMetric & {
      Namespace: Namespace;
      MetricName: MetricName;
    })[];
    AdditionalStatistics: MetricStreamStatisticsAdditionalStatistics;
  })[];
  IncludeLinkedAccountsMetrics?: boolean;
}
export const GetMetricStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    IncludeFilters: S.optional(MetricStreamFilters),
    ExcludeFilters: S.optional(MetricStreamFilters),
    FirehoseArn: S.optional(S.String),
    RoleArn: S.optional(S.String),
    State: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    OutputFormat: S.optional(MetricStreamOutputFormat),
    StatisticsConfigurations: S.optional(MetricStreamStatisticsConfigurations),
    IncludeLinkedAccountsMetrics: S.optional(S.Boolean),
  }).pipe(ns),
).annotate({
  identifier: "GetMetricStreamOutput",
}) as any as S.Schema<GetMetricStreamOutput>;
export type MetricWidget = string;
export type OutputFormat = string;
export interface GetMetricWidgetImageInput {
  MetricWidget?: string;
  OutputFormat?: string;
}
export const GetMetricWidgetImageInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricWidget: S.optional(S.String),
    OutputFormat: S.optional(S.String),
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
  identifier: "GetMetricWidgetImageInput",
}) as any as S.Schema<GetMetricWidgetImageInput>;
export type MetricWidgetImage = Uint8Array;
export interface GetMetricWidgetImageOutput {
  MetricWidgetImage?: Uint8Array;
}
export const GetMetricWidgetImageOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MetricWidgetImage: S.optional(T.Blob) }).pipe(ns),
).annotate({
  identifier: "GetMetricWidgetImageOutput",
}) as any as S.Schema<GetMetricWidgetImageOutput>;
export interface GetOTelEnrichmentInput {}
export const GetOTelEnrichmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
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
  identifier: "GetOTelEnrichmentInput",
}) as any as S.Schema<GetOTelEnrichmentInput>;
export type OTelEnrichmentStatus = "Running" | "Stopped" | (string & {});
export const OTelEnrichmentStatus = S.String;

export interface GetOTelEnrichmentOutput {
  Status: OTelEnrichmentStatus;
}
export const GetOTelEnrichmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: S.optional(OTelEnrichmentStatus) }).pipe(ns),
).annotate({
  identifier: "GetOTelEnrichmentOutput",
}) as any as S.Schema<GetOTelEnrichmentOutput>;
export type AlarmMuteRuleStatuses = AlarmMuteRuleStatus[];
export const AlarmMuteRuleStatuses = /*@__PURE__*/ S.Array(AlarmMuteRuleStatus);
export interface ListAlarmMuteRulesInput {
  AlarmName?: string;
  Statuses?: AlarmMuteRuleStatus[];
  MaxRecords?: number;
  NextToken?: string;
}
export const ListAlarmMuteRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmName: S.optional(S.String),
    Statuses: S.optional(AlarmMuteRuleStatuses),
    MaxRecords: S.optional(S.Number),
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
  identifier: "ListAlarmMuteRulesInput",
}) as any as S.Schema<ListAlarmMuteRulesInput>;
export interface AlarmMuteRuleSummary {
  AlarmMuteRuleArn?: string;
  ExpireDate?: Date;
  Status?: AlarmMuteRuleStatus;
  MuteType?: string;
  LastUpdatedTimestamp?: Date;
}
export const AlarmMuteRuleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmMuteRuleArn: S.optional(S.String),
    ExpireDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Status: S.optional(AlarmMuteRuleStatus),
    MuteType: S.optional(S.String),
    LastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "AlarmMuteRuleSummary",
}) as any as S.Schema<AlarmMuteRuleSummary>;
export type AlarmMuteRuleSummaries = AlarmMuteRuleSummary[];
export const AlarmMuteRuleSummaries =
  /*@__PURE__*/ S.Array(AlarmMuteRuleSummary);
export interface ListAlarmMuteRulesOutput {
  AlarmMuteRuleSummaries?: AlarmMuteRuleSummary[];
  NextToken?: string;
}
export const ListAlarmMuteRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmMuteRuleSummaries: S.optional(AlarmMuteRuleSummaries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAlarmMuteRulesOutput",
}) as any as S.Schema<ListAlarmMuteRulesOutput>;
export type DashboardNamePrefix = string;
export interface ListDashboardsInput {
  DashboardNamePrefix?: string;
  NextToken?: string;
}
export const ListDashboardsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardNamePrefix: S.optional(S.String),
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
  identifier: "ListDashboardsInput",
}) as any as S.Schema<ListDashboardsInput>;
export type LastModified = Date;
export type Size = number;
export interface DashboardEntry {
  DashboardName?: string;
  DashboardArn?: string;
  LastModified?: Date;
  Size?: number;
}
export const DashboardEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardName: S.optional(S.String),
    DashboardArn: S.optional(S.String),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Size: S.optional(S.Number),
  }),
).annotate({ identifier: "DashboardEntry" }) as any as S.Schema<DashboardEntry>;
export type DashboardEntries = DashboardEntry[];
export const DashboardEntries = /*@__PURE__*/ S.Array(DashboardEntry);
export interface ListDashboardsOutput {
  DashboardEntries?: DashboardEntry[];
  NextToken?: string;
}
export const ListDashboardsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardEntries: S.optional(DashboardEntries),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListDashboardsOutput",
}) as any as S.Schema<ListDashboardsOutput>;
export interface ListManagedInsightRulesInput {
  ResourceARN?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListManagedInsightRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
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
  identifier: "ListManagedInsightRulesInput",
}) as any as S.Schema<ListManagedInsightRulesInput>;
export type TemplateName = string;
export interface ManagedRuleState {
  RuleName?: string;
  State?: string;
}
export const ManagedRuleState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleName: S.optional(S.String), State: S.optional(S.String) }),
).annotate({
  identifier: "ManagedRuleState",
}) as any as S.Schema<ManagedRuleState>;
export interface ManagedRuleDescription {
  TemplateName?: string;
  ResourceARN?: string;
  RuleState?: ManagedRuleState;
}
export const ManagedRuleDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.optional(S.String),
    ResourceARN: S.optional(S.String),
    RuleState: S.optional(ManagedRuleState),
  }),
).annotate({
  identifier: "ManagedRuleDescription",
}) as any as S.Schema<ManagedRuleDescription>;
export type ManagedRuleDescriptions = ManagedRuleDescription[];
export const ManagedRuleDescriptions = /*@__PURE__*/ S.Array(
  ManagedRuleDescription,
);
export interface ListManagedInsightRulesOutput {
  ManagedRules?: (ManagedRuleDescription & {
    RuleState: ManagedRuleState & {
      RuleName: InsightRuleName;
      State: InsightRuleState;
    };
  })[];
  NextToken?: string;
}
export const ListManagedInsightRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManagedRules: S.optional(ManagedRuleDescriptions),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListManagedInsightRulesOutput",
}) as any as S.Schema<ListManagedInsightRulesOutput>;
export interface DimensionFilter {
  Name?: string;
  Value?: string;
}
export const DimensionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({
  identifier: "DimensionFilter",
}) as any as S.Schema<DimensionFilter>;
export type DimensionFilters = DimensionFilter[];
export const DimensionFilters = /*@__PURE__*/ S.Array(DimensionFilter);
export type RecentlyActive = "PT3H" | (string & {});
export const RecentlyActive = S.String;

export type IncludeLinkedAccounts = boolean;
export interface ListMetricsInput {
  Namespace?: string;
  MetricName?: string;
  Dimensions?: DimensionFilter[];
  NextToken?: string;
  RecentlyActive?: RecentlyActive;
  IncludeLinkedAccounts?: boolean;
  OwningAccount?: string;
}
export const ListMetricsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Namespace: S.optional(S.String),
    MetricName: S.optional(S.String),
    Dimensions: S.optional(DimensionFilters),
    NextToken: S.optional(S.String),
    RecentlyActive: S.optional(RecentlyActive),
    IncludeLinkedAccounts: S.optional(S.Boolean),
    OwningAccount: S.optional(S.String),
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
  identifier: "ListMetricsInput",
}) as any as S.Schema<ListMetricsInput>;
export type Metrics = Metric[];
export const Metrics = /*@__PURE__*/ S.Array(Metric);
export type OwningAccounts = string[];
export const OwningAccounts = /*@__PURE__*/ S.Array(S.String);
export interface ListMetricsOutput {
  Metrics?: (Metric & {
    Dimensions: (Dimension & { Name: DimensionName; Value: DimensionValue })[];
  })[];
  NextToken?: string;
  OwningAccounts?: string[];
}
export const ListMetricsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metrics: S.optional(Metrics),
    NextToken: S.optional(S.String),
    OwningAccounts: S.optional(OwningAccounts),
  }).pipe(ns),
).annotate({
  identifier: "ListMetricsOutput",
}) as any as S.Schema<ListMetricsOutput>;
export type ListMetricStreamsMaxResults = number;
export interface ListMetricStreamsInput {
  NextToken?: string;
  MaxResults?: number;
}
export const ListMetricStreamsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
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
  identifier: "ListMetricStreamsInput",
}) as any as S.Schema<ListMetricStreamsInput>;
export interface MetricStreamEntry {
  Arn?: string;
  CreationDate?: Date;
  LastUpdateDate?: Date;
  Name?: string;
  FirehoseArn?: string;
  State?: string;
  OutputFormat?: MetricStreamOutputFormat;
}
export const MetricStreamEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.optional(S.String),
    FirehoseArn: S.optional(S.String),
    State: S.optional(S.String),
    OutputFormat: S.optional(MetricStreamOutputFormat),
  }),
).annotate({
  identifier: "MetricStreamEntry",
}) as any as S.Schema<MetricStreamEntry>;
export type MetricStreamEntries = MetricStreamEntry[];
export const MetricStreamEntries = /*@__PURE__*/ S.Array(MetricStreamEntry);
export interface ListMetricStreamsOutput {
  NextToken?: string;
  Entries?: MetricStreamEntry[];
}
export const ListMetricStreamsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Entries: S.optional(MetricStreamEntries),
  }).pipe(ns),
).annotate({
  identifier: "ListMetricStreamsOutput",
}) as any as S.Schema<ListMetricStreamsOutput>;
export interface ListTagsForResourceInput {
  ResourceARN?: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.optional(S.String) }).pipe(
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
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  Tags?: (Tag & { Key: TagKey; Value: TagValue })[];
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface PutAlarmMuteRuleInput {
  Name?: string;
  Description?: string;
  Rule?: Rule;
  MuteTargets?: MuteTargets;
  Tags?: Tag[];
  StartDate?: Date;
  ExpireDate?: Date;
}
export const PutAlarmMuteRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Rule: S.optional(Rule),
    MuteTargets: S.optional(MuteTargets),
    Tags: S.optional(TagList),
    StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ExpireDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
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
  identifier: "PutAlarmMuteRuleInput",
}) as any as S.Schema<PutAlarmMuteRuleInput>;
export interface PutAlarmMuteRuleResponse {}
export const PutAlarmMuteRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutAlarmMuteRuleResponse",
}) as any as S.Schema<PutAlarmMuteRuleResponse>;
export interface PutAnomalyDetectorInput {
  Namespace?: string;
  MetricName?: string;
  Dimensions?: Dimension[];
  Stat?: string;
  Configuration?: AnomalyDetectorConfiguration;
  MetricCharacteristics?: MetricCharacteristics;
  SingleMetricAnomalyDetector?: SingleMetricAnomalyDetector;
  MetricMathAnomalyDetector?: MetricMathAnomalyDetector;
}
export const PutAnomalyDetectorInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Namespace: S.optional(S.String),
    MetricName: S.optional(S.String),
    Dimensions: S.optional(Dimensions),
    Stat: S.optional(S.String),
    Configuration: S.optional(AnomalyDetectorConfiguration),
    MetricCharacteristics: S.optional(MetricCharacteristics),
    SingleMetricAnomalyDetector: S.optional(SingleMetricAnomalyDetector),
    MetricMathAnomalyDetector: S.optional(MetricMathAnomalyDetector),
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
  identifier: "PutAnomalyDetectorInput",
}) as any as S.Schema<PutAnomalyDetectorInput>;
export interface PutAnomalyDetectorOutput {
  AnomalyDetectorId?: string;
}
export const PutAnomalyDetectorOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AnomalyDetectorId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "PutAnomalyDetectorOutput",
}) as any as S.Schema<PutAnomalyDetectorOutput>;
export interface PutCompositeAlarmInput {
  ActionsEnabled?: boolean;
  AlarmActions?: string[];
  AlarmDescription?: string;
  AlarmName?: string;
  AlarmRule?: string;
  InsufficientDataActions?: string[];
  OKActions?: string[];
  Tags?: Tag[];
  ActionsSuppressor?: string;
  ActionsSuppressorWaitPeriod?: number;
  ActionsSuppressorExtensionPeriod?: number;
}
export const PutCompositeAlarmInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionsEnabled: S.optional(S.Boolean),
    AlarmActions: S.optional(ResourceList),
    AlarmDescription: S.optional(S.String),
    AlarmName: S.optional(S.String),
    AlarmRule: S.optional(S.String),
    InsufficientDataActions: S.optional(ResourceList),
    OKActions: S.optional(ResourceList),
    Tags: S.optional(TagList),
    ActionsSuppressor: S.optional(S.String),
    ActionsSuppressorWaitPeriod: S.optional(S.Number),
    ActionsSuppressorExtensionPeriod: S.optional(S.Number),
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
  identifier: "PutCompositeAlarmInput",
}) as any as S.Schema<PutCompositeAlarmInput>;
export interface PutCompositeAlarmResponse {}
export const PutCompositeAlarmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutCompositeAlarmResponse",
}) as any as S.Schema<PutCompositeAlarmResponse>;
export interface PutDashboardInput {
  DashboardName?: string;
  DashboardBody?: string;
  Tags?: Tag[];
}
export const PutDashboardInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardName: S.optional(S.String),
    DashboardBody: S.optional(S.String),
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
  identifier: "PutDashboardInput",
}) as any as S.Schema<PutDashboardInput>;
export type DataPath = string;
export type Message = string;
export interface DashboardValidationMessage {
  DataPath?: string;
  Message?: string;
}
export const DashboardValidationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataPath: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({
  identifier: "DashboardValidationMessage",
}) as any as S.Schema<DashboardValidationMessage>;
export type DashboardValidationMessages = DashboardValidationMessage[];
export const DashboardValidationMessages = /*@__PURE__*/ S.Array(
  DashboardValidationMessage,
);
export interface PutDashboardOutput {
  DashboardValidationMessages?: DashboardValidationMessage[];
}
export const PutDashboardOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashboardValidationMessages: S.optional(DashboardValidationMessages),
  }).pipe(ns),
).annotate({
  identifier: "PutDashboardOutput",
}) as any as S.Schema<PutDashboardOutput>;
export interface PutInsightRuleInput {
  RuleName?: string;
  RuleState?: string;
  RuleDefinition?: string;
  Tags?: Tag[];
  ApplyOnTransformedLogs?: boolean;
}
export const PutInsightRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.optional(S.String),
    RuleState: S.optional(S.String),
    RuleDefinition: S.optional(S.String),
    Tags: S.optional(TagList),
    ApplyOnTransformedLogs: S.optional(S.Boolean),
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
  identifier: "PutInsightRuleInput",
}) as any as S.Schema<PutInsightRuleInput>;
export interface PutInsightRuleOutput {}
export const PutInsightRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutInsightRuleOutput",
}) as any as S.Schema<PutInsightRuleOutput>;
export interface PutLogAlarmInput {
  AlarmName?: string;
  AlarmDescription?: string;
  ScheduledQueryConfiguration?: ScheduledQueryConfiguration;
  ActionLogLineCount?: number;
  ActionLogLineRoleArn?: string;
  ActionsEnabled?: boolean;
  OKActions?: string[];
  AlarmActions?: string[];
  InsufficientDataActions?: string[];
  QueryResultsToEvaluate?: number;
  QueryResultsToAlarm?: number;
  Threshold?: number;
  ComparisonOperator?: ComparisonOperator;
  TreatMissingData?: string;
  Tags?: Tag[];
  WarmUpConfiguration?: WarmUpConfiguration;
}
export const PutLogAlarmInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmName: S.optional(S.String),
    AlarmDescription: S.optional(S.String),
    ScheduledQueryConfiguration: S.optional(ScheduledQueryConfiguration),
    ActionLogLineCount: S.optional(S.Number),
    ActionLogLineRoleArn: S.optional(S.String),
    ActionsEnabled: S.optional(S.Boolean),
    OKActions: S.optional(ResourceList),
    AlarmActions: S.optional(ResourceList),
    InsufficientDataActions: S.optional(ResourceList),
    QueryResultsToEvaluate: S.optional(S.Number),
    QueryResultsToAlarm: S.optional(S.Number),
    Threshold: S.optional(S.Number),
    ComparisonOperator: S.optional(ComparisonOperator),
    TreatMissingData: S.optional(S.String),
    Tags: S.optional(TagList),
    WarmUpConfiguration: S.optional(WarmUpConfiguration),
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
  identifier: "PutLogAlarmInput",
}) as any as S.Schema<PutLogAlarmInput>;
export interface PutLogAlarmResponse {}
export const PutLogAlarmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutLogAlarmResponse",
}) as any as S.Schema<PutLogAlarmResponse>;
export interface ManagedRule {
  TemplateName?: string;
  ResourceARN?: string;
  Tags?: Tag[];
}
export const ManagedRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.optional(S.String),
    ResourceARN: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({ identifier: "ManagedRule" }) as any as S.Schema<ManagedRule>;
export type ManagedRules = ManagedRule[];
export const ManagedRules = /*@__PURE__*/ S.Array(ManagedRule);
export interface PutManagedInsightRulesInput {
  ManagedRules?: ManagedRule[];
}
export const PutManagedInsightRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManagedRules: S.optional(ManagedRules) }).pipe(
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
  identifier: "PutManagedInsightRulesInput",
}) as any as S.Schema<PutManagedInsightRulesInput>;
export interface PutManagedInsightRulesOutput {
  Failures?: PartialFailure[];
}
export const PutManagedInsightRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Failures: S.optional(BatchFailures) }).pipe(ns),
).annotate({
  identifier: "PutManagedInsightRulesOutput",
}) as any as S.Schema<PutManagedInsightRulesOutput>;
export interface PutMetricAlarmInput {
  AlarmName?: string;
  AlarmDescription?: string;
  ActionsEnabled?: boolean;
  OKActions?: string[];
  AlarmActions?: string[];
  InsufficientDataActions?: string[];
  MetricName?: string;
  Namespace?: string;
  Statistic?: Statistic;
  ExtendedStatistic?: string;
  Dimensions?: Dimension[];
  Period?: number;
  Unit?: StandardUnit;
  EvaluationPeriods?: number;
  DatapointsToAlarm?: number;
  Threshold?: number;
  ComparisonOperator?: ComparisonOperator;
  TreatMissingData?: string;
  EvaluateLowSampleCountPercentile?: string;
  Metrics?: MetricDataQuery[];
  Tags?: Tag[];
  ThresholdMetricId?: string;
  EvaluationWindow?: EvaluationWindow;
  WarmUpConfiguration?: WarmUpConfiguration;
  EvaluationCriteria?: EvaluationCriteria;
  EvaluationInterval?: number;
}
export const PutMetricAlarmInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmName: S.optional(S.String),
    AlarmDescription: S.optional(S.String),
    ActionsEnabled: S.optional(S.Boolean),
    OKActions: S.optional(ResourceList),
    AlarmActions: S.optional(ResourceList),
    InsufficientDataActions: S.optional(ResourceList),
    MetricName: S.optional(S.String),
    Namespace: S.optional(S.String),
    Statistic: S.optional(Statistic),
    ExtendedStatistic: S.optional(S.String),
    Dimensions: S.optional(Dimensions),
    Period: S.optional(S.Number),
    Unit: S.optional(StandardUnit),
    EvaluationPeriods: S.optional(S.Number),
    DatapointsToAlarm: S.optional(S.Number),
    Threshold: S.optional(S.Number),
    ComparisonOperator: S.optional(ComparisonOperator),
    TreatMissingData: S.optional(S.String),
    EvaluateLowSampleCountPercentile: S.optional(S.String),
    Metrics: S.optional(MetricDataQueries),
    Tags: S.optional(TagList),
    ThresholdMetricId: S.optional(S.String),
    EvaluationWindow: S.optional(EvaluationWindow),
    WarmUpConfiguration: S.optional(WarmUpConfiguration),
    EvaluationCriteria: S.optional(EvaluationCriteria),
    EvaluationInterval: S.optional(S.Number),
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
  identifier: "PutMetricAlarmInput",
}) as any as S.Schema<PutMetricAlarmInput>;
export interface PutMetricAlarmResponse {}
export const PutMetricAlarmResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutMetricAlarmResponse",
}) as any as S.Schema<PutMetricAlarmResponse>;
export interface StatisticSet {
  SampleCount?: number;
  Sum?: number;
  Minimum?: number;
  Maximum?: number;
}
export const StatisticSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SampleCount: S.optional(S.Number),
    Sum: S.optional(S.Number),
    Minimum: S.optional(S.Number),
    Maximum: S.optional(S.Number),
  }),
).annotate({ identifier: "StatisticSet" }) as any as S.Schema<StatisticSet>;
export type Values = number[];
export const Values = /*@__PURE__*/ S.Array(S.Number);
export type Counts = number[];
export const Counts = /*@__PURE__*/ S.Array(S.Number);
export type StorageResolution = number;
export interface MetricDatum {
  MetricName?: string;
  Dimensions?: Dimension[];
  Timestamp?: Date;
  Value?: number;
  StatisticValues?: StatisticSet;
  Values?: number[];
  Counts?: number[];
  Unit?: StandardUnit;
  StorageResolution?: number;
}
export const MetricDatum = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricName: S.optional(S.String),
    Dimensions: S.optional(Dimensions),
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Value: S.optional(S.Number),
    StatisticValues: S.optional(StatisticSet),
    Values: S.optional(Values),
    Counts: S.optional(Counts),
    Unit: S.optional(StandardUnit),
    StorageResolution: S.optional(S.Number),
  }),
).annotate({ identifier: "MetricDatum" }) as any as S.Schema<MetricDatum>;
export type MetricData = MetricDatum[];
export const MetricData = /*@__PURE__*/ S.Array(MetricDatum);
export type EntityKeyAttributesMapKeyString = string;
export type EntityKeyAttributesMapValueString = string;
export type EntityKeyAttributesMap = { [key: string]: string | undefined };
export const EntityKeyAttributesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type EntityAttributesMapKeyString = string;
export type EntityAttributesMapValueString = string;
export type EntityAttributesMap = { [key: string]: string | undefined };
export const EntityAttributesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface Entity {
  KeyAttributes?: { [key: string]: string | undefined };
  Attributes?: { [key: string]: string | undefined };
}
export const Entity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyAttributes: S.optional(EntityKeyAttributesMap),
    Attributes: S.optional(EntityAttributesMap),
  }),
).annotate({ identifier: "Entity" }) as any as S.Schema<Entity>;
export interface EntityMetricData {
  Entity?: Entity;
  MetricData?: MetricDatum[];
}
export const EntityMetricData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Entity: S.optional(Entity), MetricData: S.optional(MetricData) }),
).annotate({
  identifier: "EntityMetricData",
}) as any as S.Schema<EntityMetricData>;
export type EntityMetricDataList = EntityMetricData[];
export const EntityMetricDataList = /*@__PURE__*/ S.Array(EntityMetricData);
export type StrictEntityValidation = boolean;
export interface PutMetricDataInput {
  Namespace?: string;
  MetricData?: MetricDatum[];
  EntityMetricData?: EntityMetricData[];
  StrictEntityValidation?: boolean;
}
export const PutMetricDataInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Namespace: S.optional(S.String),
    MetricData: S.optional(MetricData),
    EntityMetricData: S.optional(EntityMetricDataList),
    StrictEntityValidation: S.optional(S.Boolean),
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
  identifier: "PutMetricDataInput",
}) as any as S.Schema<PutMetricDataInput>;
export interface PutMetricDataResponse {}
export const PutMetricDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutMetricDataResponse",
}) as any as S.Schema<PutMetricDataResponse>;
export interface PutMetricStreamInput {
  Name?: string;
  IncludeFilters?: MetricStreamFilter[];
  ExcludeFilters?: MetricStreamFilter[];
  FirehoseArn?: string;
  RoleArn?: string;
  OutputFormat?: MetricStreamOutputFormat;
  Tags?: Tag[];
  StatisticsConfigurations?: MetricStreamStatisticsConfiguration[];
  IncludeLinkedAccountsMetrics?: boolean;
}
export const PutMetricStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    IncludeFilters: S.optional(MetricStreamFilters),
    ExcludeFilters: S.optional(MetricStreamFilters),
    FirehoseArn: S.optional(S.String),
    RoleArn: S.optional(S.String),
    OutputFormat: S.optional(MetricStreamOutputFormat),
    Tags: S.optional(TagList),
    StatisticsConfigurations: S.optional(MetricStreamStatisticsConfigurations),
    IncludeLinkedAccountsMetrics: S.optional(S.Boolean),
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
  identifier: "PutMetricStreamInput",
}) as any as S.Schema<PutMetricStreamInput>;
export interface PutMetricStreamOutput {
  Arn?: string;
}
export const PutMetricStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "PutMetricStreamOutput",
}) as any as S.Schema<PutMetricStreamOutput>;
export interface SetAlarmStateInput {
  AlarmName?: string;
  StateValue?: StateValue;
  StateReason?: string;
  StateReasonData?: string;
}
export const SetAlarmStateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlarmName: S.optional(S.String),
    StateValue: S.optional(StateValue),
    StateReason: S.optional(S.String),
    StateReasonData: S.optional(S.String),
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
  identifier: "SetAlarmStateInput",
}) as any as S.Schema<SetAlarmStateInput>;
export interface SetAlarmStateResponse {}
export const SetAlarmStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetAlarmStateResponse",
}) as any as S.Schema<SetAlarmStateResponse>;
export type MetricStreamNames = string[];
export const MetricStreamNames = /*@__PURE__*/ S.Array(S.String);
export interface StartMetricStreamsInput {
  Names?: string[];
}
export const StartMetricStreamsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Names: S.optional(MetricStreamNames) }).pipe(
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
  identifier: "StartMetricStreamsInput",
}) as any as S.Schema<StartMetricStreamsInput>;
export interface StartMetricStreamsOutput {}
export const StartMetricStreamsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StartMetricStreamsOutput",
}) as any as S.Schema<StartMetricStreamsOutput>;
export interface StartOTelEnrichmentInput {}
export const StartOTelEnrichmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
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
  identifier: "StartOTelEnrichmentInput",
}) as any as S.Schema<StartOTelEnrichmentInput>;
export interface StartOTelEnrichmentOutput {}
export const StartOTelEnrichmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StartOTelEnrichmentOutput",
}) as any as S.Schema<StartOTelEnrichmentOutput>;
export interface StopMetricStreamsInput {
  Names?: string[];
}
export const StopMetricStreamsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Names: S.optional(MetricStreamNames) }).pipe(
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
  identifier: "StopMetricStreamsInput",
}) as any as S.Schema<StopMetricStreamsInput>;
export interface StopMetricStreamsOutput {}
export const StopMetricStreamsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StopMetricStreamsOutput",
}) as any as S.Schema<StopMetricStreamsOutput>;
export interface StopOTelEnrichmentInput {}
export const StopOTelEnrichmentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
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
  identifier: "StopOTelEnrichmentInput",
}) as any as S.Schema<StopOTelEnrichmentInput>;
export interface StopOTelEnrichmentOutput {}
export const StopOTelEnrichmentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "StopOTelEnrichmentOutput",
}) as any as S.Schema<StopOTelEnrichmentOutput>;
export interface TagResourceInput {
  ResourceARN?: string;
  Tags?: Tag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
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
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  ResourceARN?: string;
  TagKeys?: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceARN: S.optional(S.String),
    TagKeys: S.optional(TagKeyList),
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
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export type ErrorMessage = string;
export type ResourceType = string;
export type ResourceId = string;
export type FaultDescription = string;
export type AwsQueryErrorMessage = string;
export type DashboardErrorMessage = string;
export type AssociateDatasetKmsKeyError =
  | ConflictException
  | KmsAccessDeniedException
  | KmsKeyDisabledException
  | KmsKeyNotFoundException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates an Amazon Web Services Key Management Service (Amazon Web Services KMS)
 * customer managed key with the specified dataset. After this operation completes, all
 * data published to the dataset is encrypted at rest using the specified KMS key.
 * Callers must have `kms:Decrypt` permission on the key to read the
 * encrypted data.
 *
 * Only the `default` dataset is supported. The `default` dataset
 * is implicit for every account in every Region — you do not need to create it before
 * calling this operation.
 *
 * You can call `AssociateDatasetKmsKey` on a dataset that is already
 * associated with a KMS key to replace the existing key with a different one. The
 * caller must have `kms:Decrypt` permission on both the current key and
 * the new key.
 *
 * If the currently associated key has been deleted, is scheduled for deletion,
 * is pending import, is unavailable, or has been disabled, Amazon CloudWatch
 * does not require `kms:Decrypt` permission on the current key and
 * the rotation proceeds. If the key was only disabled, consider re-enabling it
 * instead of rotating, because re-enabling allows Amazon CloudWatch to
 * resume decrypting your existing metric data encrypted with that key.
 *
 * The KMS key that you specify must meet all of the following requirements:
 *
 * - It must be a symmetric encryption KMS key (key spec
 * `SYMMETRIC_DEFAULT`, key usage `ENCRYPT_DECRYPT`).
 * Asymmetric keys, HMAC keys, and key material types other than
 * `SYMMETRIC_DEFAULT` are not supported.
 *
 * - It must be enabled and not pending deletion.
 *
 * - Its key policy must grant the CloudWatch service principal
 * (`cloudwatch.amazonaws.com`) these permissions:
 * `kms:DescribeKey`, `kms:GenerateDataKey`,
 * `kms:Encrypt`, `kms:Decrypt`, and
 * `kms:ReEncrypt*`. Amazon CloudWatch requires these permissions
 * to manage the data on your behalf.
 *
 * - The calling principal must have `kms:Decrypt` permission on the
 * key.
 *
 * - It must be specified as a fully qualified key ARN. Key IDs, aliases, and
 * alias ARNs are not accepted.
 *
 * - It must be in the same Amazon Web Services Region as the dataset.
 *
 * Before completing the association, Amazon CloudWatch validates the key by
 * performing a series of dry-run KMS operations. Service-principal checks run first to
 * verify that the key policy grants the required access to Amazon CloudWatch. These
 * checks include `kms:DescribeKey`, `kms:GenerateDataKey`,
 * `kms:Encrypt`, `kms:Decrypt`, and `kms:ReEncrypt*`.
 * After those succeed, a `kms:Decrypt` dry-run is run with the caller's
 * credentials to verify that the calling principal can use the new key. When you are
 * replacing an existing key, the caller's `kms:Decrypt` dry-run is also run
 * on the current key.
 *
 * If any of these checks on the new key fails, the operation fails and the existing
 * key association (if any) remains unchanged. Common failure causes include the new key
 * being disabled, the key policy not granting the required permissions to
 * Amazon CloudWatch, or the caller lacking `kms:Decrypt` permission on
 * the new key.
 *
 * For more information about using customer managed keys with Amazon CloudWatch,
 * see Encryption at rest
 * with customer managed keys in the Amazon CloudWatch User
 * Guide.
 */
export const associateDatasetKmsKey: API.OperationMethod<
  AssociateDatasetKmsKeyInput,
  AssociateDatasetKmsKeyOutput,
  AssociateDatasetKmsKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateDatasetKmsKeyInput,
  output: AssociateDatasetKmsKeyOutput,
  errors: [
    ConflictException,
    KmsAccessDeniedException,
    KmsKeyDisabledException,
    KmsKeyNotFoundException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateDatasetKmsKey",
}));

export type DeleteAlarmMuteRuleError = CommonErrors;
/**
 * Deletes a specific alarm mute rule.
 *
 * When you delete a mute rule, any alarms that are currently being muted by that rule
 * are immediately unmuted. If those alarms are in an ALARM state, their configured actions
 * will trigger.
 *
 * This operation is idempotent. If you delete a mute rule that does not exist, the
 * operation succeeds without returning an error.
 *
 * **Permissions**
 *
 * To delete a mute rule, you need the `cloudwatch:DeleteAlarmMuteRule`
 * permission on the alarm mute rule resource.
 */
export const deleteAlarmMuteRule: API.OperationMethod<
  DeleteAlarmMuteRuleInput,
  DeleteAlarmMuteRuleResponse,
  DeleteAlarmMuteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAlarmMuteRuleInput,
  output: DeleteAlarmMuteRuleResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlarmMuteRule",
}));

export type DeleteAlarmsError =
  | ResourceConflict
  | ResourceNotFound
  | CommonErrors;
/**
 * Deletes the specified alarms. You can delete up to 100 alarms in one operation.
 * However, this total can include no more than one composite alarm. For example, you could
 * delete 99 metric alarms and one composite alarms with one operation, but you can't
 * delete two composite alarms with one operation. Log alarms cannot be batch deleted.
 *
 * If you specify any incorrect alarm names, the alarms you specify with correct
 * names are still deleted. Other syntax errors might result in no alarms being deleted. To
 * confirm that alarms were deleted successfully, you can use the DescribeAlarms operation after using `DeleteAlarms`.
 *
 * It is possible to create a loop or cycle of composite alarms, where composite
 * alarm A depends on composite alarm B, and composite alarm B also depends on
 * composite alarm A. In this scenario, you can't delete any composite alarm that is
 * part of the cycle because there is always still a composite alarm that depends on
 * that alarm that you want to delete.
 *
 * To get out of such a situation, you must break the cycle by changing the rule of
 * one of the composite alarms in the cycle to remove a dependency that creates the
 * cycle. The simplest change to make to break a cycle is to change the
 * `AlarmRule` of one of the alarms to `false`.
 *
 * Additionally, the evaluation of composite alarms stops if CloudWatch
 * detects a cycle in the evaluation path.
 */
export const deleteAlarms: API.OperationMethod<
  DeleteAlarmsInput,
  DeleteAlarmsResponse,
  DeleteAlarmsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAlarmsInput,
  output: DeleteAlarmsResponse,
  errors: [ResourceConflict, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlarms",
}));

export type DeleteAnomalyDetectorError =
  | InternalServiceFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified anomaly detection model from your account. For more information
 * about how to delete an anomaly detection model, see Deleting an anomaly detection model in the CloudWatch User
 * Guide.
 */
export const deleteAnomalyDetector: API.OperationMethod<
  DeleteAnomalyDetectorInput,
  DeleteAnomalyDetectorOutput,
  DeleteAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAnomalyDetectorInput,
  output: DeleteAnomalyDetectorOutput,
  errors: [
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnomalyDetector",
}));

export type DeleteDashboardsError =
  | ConflictException
  | InternalServiceFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Deletes all dashboards that you specify. You can specify up to 100 dashboards to
 * delete. If there is an error during this call, the operation attempts to delete as many
 * dashboards as possible.
 */
export const deleteDashboards: API.OperationMethod<
  DeleteDashboardsInput,
  DeleteDashboardsOutput,
  DeleteDashboardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDashboardsInput,
  output: DeleteDashboardsOutput,
  errors: [
    ConflictException,
    InternalServiceFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDashboards",
}));

export type DeleteInsightRulesError =
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Permanently deletes the specified Contributor Insights rules.
 *
 * If you create a rule, delete it, and then re-create it with the same name, historical
 * data from the first time the rule was created might not be available.
 */
export const deleteInsightRules: API.OperationMethod<
  DeleteInsightRulesInput,
  DeleteInsightRulesOutput,
  DeleteInsightRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInsightRulesInput,
  output: DeleteInsightRulesOutput,
  errors: [InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInsightRules",
}));

export type DeleteMetricStreamError =
  | InternalServiceFault
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Permanently deletes the metric stream that you specify.
 */
export const deleteMetricStream: API.OperationMethod<
  DeleteMetricStreamInput,
  DeleteMetricStreamOutput,
  DeleteMetricStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMetricStreamInput,
  output: DeleteMetricStreamOutput,
  errors: [
    InternalServiceFault,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMetricStream",
}));

export type DescribeAlarmContributorsError =
  | InvalidNextToken
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns the information of the current alarm contributors that are in
 * `ALARM` state. This operation returns details about the individual time
 * series that contribute to the alarm's state.
 */
export const describeAlarmContributors: API.OperationMethod<
  DescribeAlarmContributorsInput,
  DescribeAlarmContributorsOutput,
  DescribeAlarmContributorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAlarmContributorsInput,
  output: DescribeAlarmContributorsOutput,
  errors: [InvalidNextToken, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlarmContributors",
}));

export type DescribeAlarmHistoryError = InvalidNextToken | CommonErrors;
/**
 * Retrieves the history for the specified alarm. You can filter the results by date
 * range or item type. If an alarm name is not specified, the histories for either all
 * metric alarms or all composite alarms are returned.
 *
 * CloudWatch retains the history of an alarm even if you delete the alarm.
 *
 * To use this operation and return information about a composite alarm, you must be
 * signed on with the `cloudwatch:DescribeAlarmHistory` permission that is
 * scoped to `*`. You can't return information about composite alarms if your
 * `cloudwatch:DescribeAlarmHistory` permission has a narrower scope.
 */
export const describeAlarmHistory: API.PaginatedOperationMethod<
  DescribeAlarmHistoryInput,
  DescribeAlarmHistoryOutput,
  DescribeAlarmHistoryError,
  Credentials | HttpClient.HttpClient,
  AlarmHistoryItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAlarmHistoryInput,
  output: DescribeAlarmHistoryOutput,
  errors: [InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlarmHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AlarmHistoryItems",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeAlarmsError = InvalidNextToken | CommonErrors;
/**
 * Retrieves the specified alarms. You can filter the results by specifying a prefix
 * for the alarm name, the alarm state, or a prefix for any action.
 *
 * To use this operation and return information about composite alarms, you must be
 * signed on with the `cloudwatch:DescribeAlarms` permission that is scoped to
 * `*`. You can't return information about composite alarms if your
 * `cloudwatch:DescribeAlarms` permission has a narrower scope.
 */
export const describeAlarms: API.PaginatedOperationMethod<
  DescribeAlarmsInput,
  DescribeAlarmsOutput,
  DescribeAlarmsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAlarmsInput,
  output: DescribeAlarmsOutput,
  errors: [InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlarms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type DescribeAlarmsForMetricError = CommonErrors;
/**
 * Retrieves the alarms for the specified metric. To filter the results, specify a
 * statistic, period, or unit.
 *
 * This operation retrieves only standard alarms that are based on the specified
 * metric. It does not return alarms based on math expressions that use the specified
 * metric, or composite alarms that use the specified metric.
 */
export const describeAlarmsForMetric: API.OperationMethod<
  DescribeAlarmsForMetricInput,
  DescribeAlarmsForMetricOutput,
  DescribeAlarmsForMetricError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAlarmsForMetricInput,
  output: DescribeAlarmsForMetricOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlarmsForMetric",
}));

export type DescribeAnomalyDetectorsError =
  | InternalServiceFault
  | InvalidNextToken
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Lists the anomaly detection models that you have created in your account. For single
 * metric anomaly detectors, you can list all of the models in your account or filter the
 * results to only the models that are related to a certain namespace, metric name, or
 * metric dimension. For metric math anomaly detectors, you can list them by adding
 * `METRIC_MATH` to the `AnomalyDetectorTypes` array. This will
 * return all metric math anomaly detectors in your account.
 */
export const describeAnomalyDetectors: API.PaginatedOperationMethod<
  DescribeAnomalyDetectorsInput,
  DescribeAnomalyDetectorsOutput,
  DescribeAnomalyDetectorsError,
  Credentials | HttpClient.HttpClient,
  AnomalyDetector
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAnomalyDetectorsInput,
  output: DescribeAnomalyDetectorsOutput,
  errors: [
    InternalServiceFault,
    InvalidNextToken,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAnomalyDetectors",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AnomalyDetectors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeInsightRulesError =
  | InvalidNextToken
  | UnsupportedOperation
  | CommonErrors;
/**
 * Returns a list of all the Contributor Insights rules in your account.
 *
 * For more information about Contributor Insights, see Using Contributor
 * Insights to Analyze High-Cardinality Data.
 */
export const describeInsightRules: API.PaginatedOperationMethod<
  DescribeInsightRulesInput,
  DescribeInsightRulesOutput,
  DescribeInsightRulesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeInsightRulesInput,
  output: DescribeInsightRulesOutput,
  errors: [InvalidNextToken, UnsupportedOperation],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInsightRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisableAlarmActionsError = CommonErrors;
/**
 * Disables the actions for the specified alarms. When an alarm's actions are
 * disabled, the alarm actions do not execute when the alarm state changes.
 */
export const disableAlarmActions: API.OperationMethod<
  DisableAlarmActionsInput,
  DisableAlarmActionsResponse,
  DisableAlarmActionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableAlarmActionsInput,
  output: DisableAlarmActionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableAlarmActions",
}));

export type DisableInsightRulesError =
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Disables the specified Contributor Insights rules. When rules are disabled, they do
 * not analyze log groups and do not incur costs.
 */
export const disableInsightRules: API.OperationMethod<
  DisableInsightRulesInput,
  DisableInsightRulesOutput,
  DisableInsightRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisableInsightRulesInput,
  output: DisableInsightRulesOutput,
  errors: [InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableInsightRules",
}));

export type DisassociateDatasetKmsKeyError =
  | ConflictException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes the customer managed Amazon Web Services Key Management Service
 * (Amazon Web Services KMS) key association from the specified dataset. After this
 * operation completes, data that you publish to the dataset is encrypted at rest using
 * an Amazon Web Services owned key managed by Amazon CloudWatch.
 *
 * Only the `default` dataset is supported. To call this operation, the
 * dataset must currently have a customer managed KMS key associated with it. If the
 * dataset has no associated KMS key, the operation fails with
 * `ResourceNotFoundException`.
 *
 * Amazon CloudWatch performs a dry-run `kms:Decrypt` call on the
 * currently associated key as part of this operation. The caller must have
 * `kms:Decrypt` permission on the currently associated key. If the key is
 * accessible but the caller lacks `kms:Decrypt` permission, the operation
 * fails with `AccessDeniedException`.
 *
 * If the currently associated key has been deleted, is scheduled for deletion,
 * is pending import, is unavailable, or has been disabled, Amazon CloudWatch
 * does not require `kms:Decrypt` permission on that key and the
 * disassociation proceeds. If the key was only disabled, consider re-enabling it
 * instead of disassociating, because re-enabling allows Amazon CloudWatch to
 * resume decrypting your existing metric data.
 *
 * Disassociating a KMS key from a dataset does not immediately remove the
 * `kms:Decrypt` requirement on data plane operations. For up to three
 * hours after disassociation, callers must continue to have
 * `kms:Decrypt` permission on the previously associated key. Some data
 * might still be encrypted with that key during this window. After this enforcement
 * window elapses, the `kms:Decrypt` requirement is lifted.
 *
 * For more information about using customer managed keys with Amazon CloudWatch,
 * see Encryption at rest
 * with customer managed keys in the Amazon CloudWatch User
 * Guide.
 */
export const disassociateDatasetKmsKey: API.OperationMethod<
  DisassociateDatasetKmsKeyInput,
  DisassociateDatasetKmsKeyOutput,
  DisassociateDatasetKmsKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateDatasetKmsKeyInput,
  output: DisassociateDatasetKmsKeyOutput,
  errors: [ConflictException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateDatasetKmsKey",
}));

export type EnableAlarmActionsError = CommonErrors;
/**
 * Enables the actions for the specified alarms.
 */
export const enableAlarmActions: API.OperationMethod<
  EnableAlarmActionsInput,
  EnableAlarmActionsResponse,
  EnableAlarmActionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableAlarmActionsInput,
  output: EnableAlarmActionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAlarmActions",
}));

export type EnableInsightRulesError =
  | InvalidParameterValueException
  | LimitExceededException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Enables the specified Contributor Insights rules. When rules are enabled, they
 * immediately begin analyzing log data.
 */
export const enableInsightRules: API.OperationMethod<
  EnableInsightRulesInput,
  EnableInsightRulesOutput,
  EnableInsightRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EnableInsightRulesInput,
  output: EnableInsightRulesOutput,
  errors: [
    InvalidParameterValueException,
    LimitExceededException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableInsightRules",
}));

export type GetAlarmMuteRuleError = ResourceNotFoundException | CommonErrors;
/**
 * Retrieves details for a specific alarm mute rule.
 *
 * This operation returns complete information about the mute rule, including its
 * configuration, status, targeted alarms, and metadata.
 *
 * The returned status indicates the current state of the mute rule:
 *
 * - **SCHEDULED**: The mute rule is configured and
 * will become active in the future
 *
 * - **ACTIVE**: The mute rule is currently muting
 * alarm actions
 *
 * - **EXPIRED**: The mute rule has passed its
 * expiration date and will no longer become active
 *
 * **Permissions**
 *
 * To retrieve details for a mute rule, you need the
 * `cloudwatch:GetAlarmMuteRule` permission on the alarm mute rule
 * resource.
 */
export const getAlarmMuteRule: API.OperationMethod<
  GetAlarmMuteRuleInput,
  GetAlarmMuteRuleOutput,
  GetAlarmMuteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAlarmMuteRuleInput,
  output: GetAlarmMuteRuleOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAlarmMuteRule",
}));

export type GetDashboardError =
  | DashboardNotFoundError
  | InternalServiceFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Displays the details of the dashboard that you specify.
 *
 * To copy an existing dashboard, use `GetDashboard`, and then use the data
 * returned within `DashboardBody` as the template for the new dashboard when
 * you call `PutDashboard` to create the copy.
 */
export const getDashboard: API.OperationMethod<
  GetDashboardInput,
  GetDashboardOutput,
  GetDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDashboardInput,
  output: GetDashboardOutput,
  errors: [
    DashboardNotFoundError,
    InternalServiceFault,
    InvalidParameterValueException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDashboard",
}));

export type GetDatasetError = ResourceNotFoundException | CommonErrors;
/**
 * Returns information about the specified dataset. This includes its identifier,
 * Amazon Resource Name (ARN), and any customer managed Amazon Web Services Key
 * Management Service (Amazon Web Services KMS) key that is currently associated with
 * it.
 *
 * Only the `default` dataset is supported. The `default` dataset
 * is implicit for every account in every Region — you can call `GetDataset`
 * for it without first creating it. If no customer managed KMS key has been associated
 * with the dataset, the response omits the `KmsKeyArn` field, indicating that
 * data is encrypted at rest using an Amazon Web Services owned key managed by
 * Amazon CloudWatch.
 *
 * To associate a customer managed KMS key with a dataset, use AssociateDatasetKmsKey. To remove the association, use DisassociateDatasetKmsKey.
 */
export const getDataset: API.OperationMethod<
  GetDatasetInput,
  GetDatasetOutput,
  GetDatasetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDatasetInput,
  output: GetDatasetOutput,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataset",
}));

export type GetInsightRuleReportError =
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation returns the time series data collected by a Contributor Insights rule.
 * The data includes the identity and number of contributors to the log group.
 *
 * You can also optionally return one or more statistics about each data point in the
 * time series. These statistics can include the following:
 *
 * - `UniqueContributors` -- the number of unique contributors for each
 * data point.
 *
 * - `MaxContributorValue` -- the value of the top contributor for each
 * data point. The identity of the contributor might change for each data point in
 * the graph.
 *
 * If this rule aggregates by COUNT, the top contributor for each data point is
 * the contributor with the most occurrences in that period. If the rule aggregates
 * by SUM, the top contributor is the contributor with the highest sum in the log
 * field specified by the rule's `Value`, during that period.
 *
 * - `SampleCount` -- the number of data points matched by the
 * rule.
 *
 * - `Sum` -- the sum of the values from all contributors during the
 * time period represented by that data point.
 *
 * - `Minimum` -- the minimum value from a single observation during the
 * time period represented by that data point.
 *
 * - `Maximum` -- the maximum value from a single observation during the
 * time period represented by that data point.
 *
 * - `Average` -- the average value from all contributors during the
 * time period represented by that data point.
 */
export const getInsightRuleReport: API.OperationMethod<
  GetInsightRuleReportInput,
  GetInsightRuleReportOutput,
  GetInsightRuleReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInsightRuleReportInput,
  output: GetInsightRuleReportOutput,
  errors: [
    InvalidParameterValueException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightRuleReport",
}));

export type GetMetricDataError = InvalidNextToken | CommonErrors;
/**
 * You can use the `GetMetricData` API to retrieve CloudWatch metric
 * values. The operation can also include a CloudWatch Metrics Insights query, and
 * one or more metric math functions.
 *
 * A `GetMetricData` operation that does not include a query can retrieve
 * as many as 500 different metrics in a single request, with a total of as many as 100,800
 * data points. You can also optionally perform metric math expressions on the values of
 * the returned statistics, to create new time series that represent new insights into your
 * data. For example, using Lambda metrics, you could divide the Errors metric by the
 * Invocations metric to get an error rate time series. For more information about metric
 * math expressions, see Metric Math Syntax and Functions in the Amazon CloudWatch User
 * Guide.
 *
 * If you include a Metrics Insights query, each `GetMetricData` operation can
 * include only one query. But the same `GetMetricData` operation can also
 * retrieve other metrics. Metrics Insights queries can query only the most recent three
 * hours of metric data. For more information about Metrics Insights, see Query your metrics with CloudWatch Metrics Insights.
 *
 * Calls to the `GetMetricData` API have a different pricing structure than
 * calls to `GetMetricStatistics`. For more information about pricing, see
 * Amazon CloudWatch
 * Pricing.
 *
 * Amazon CloudWatch retains metric data as follows:
 *
 * - Data points with a period of less than 60 seconds are available for 3
 * hours. These data points are high-resolution metrics and are available only for
 * custom metrics that have been defined with a `StorageResolution` of
 * 1.
 *
 * - Data points with a period of 60 seconds (1-minute) are available for 15
 * days.
 *
 * - Data points with a period of 300 seconds (5-minute) are available for 63
 * days.
 *
 * - Data points with a period of 3600 seconds (1 hour) are available for 455
 * days (15 months).
 *
 * Data points that are initially published with a shorter period are aggregated
 * together for long-term storage. For example, if you collect data using a period of 1
 * minute, the data remains available for 15 days with 1-minute resolution. After 15 days,
 * this data is still available, but is aggregated and retrievable only with a resolution
 * of 5 minutes. After 63 days, the data is further aggregated and is available with a
 * resolution of 1 hour.
 *
 * If you omit `Unit` in your request, all data that was collected with any
 * unit is returned, along with the corresponding units that were specified when the data
 * was reported to CloudWatch. If you specify a unit, the operation returns only data that
 * was collected with that unit specified. If you specify a unit that does not match the
 * data collected, the results of the operation are null. CloudWatch does not perform unit
 * conversions.
 *
 * Using Metrics Insights queries with metric
 * math
 *
 * You can't mix a Metric Insights query and metric math syntax in the same expression,
 * but you can reference results from a Metrics Insights query within other Metric math
 * expressions. A Metrics Insights query without a GROUP
 * BY clause returns a single time-series (TS), and can be used as input for
 * a metric math expression that expects a single time series. A Metrics Insights query
 * with a **GROUP BY** clause returns an array of time-series
 * (TS[]), and can be used as input for a metric math expression that expects an array of
 * time series.
 */
export const getMetricData: API.PaginatedOperationMethod<
  GetMetricDataInput,
  GetMetricDataOutput,
  GetMetricDataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetMetricDataInput,
  output: GetMetricDataOutput,
  errors: [InvalidNextToken],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricData",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxDatapoints",
  } as const,
})) as any;

export type GetMetricStatisticsError =
  | InternalServiceFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Gets statistics for the specified metric.
 *
 * The maximum number of data points returned from a single call is 1,440. If you
 * request more than 1,440 data points, CloudWatch returns an error. To reduce the number
 * of data points, you can narrow the specified time range and make multiple requests
 * across adjacent time ranges, or you can increase the specified period. Data points are
 * not returned in chronological order.
 *
 * CloudWatch aggregates data points based on the length of the period that you
 * specify. For example, if you request statistics with a one-hour period, CloudWatch
 * aggregates all data points with time stamps that fall within each one-hour period.
 * Therefore, the number of values aggregated by CloudWatch is larger than the number of
 * data points returned.
 *
 * CloudWatch needs raw data points to calculate percentile statistics. If you publish
 * data using a statistic set instead, you can only retrieve percentile statistics for this
 * data if one of the following conditions is true:
 *
 * - The SampleCount value of the statistic set is 1.
 *
 * - The Min and the Max values of the statistic set are equal.
 *
 * Percentile statistics are not available for metrics when any of the metric values
 * are negative numbers.
 *
 * Amazon CloudWatch retains metric data as follows:
 *
 * - Data points with a period of less than 60 seconds are available for 3
 * hours. These data points are high-resolution metrics and are available only for
 * custom metrics that have been defined with a `StorageResolution` of
 * 1.
 *
 * - Data points with a period of 60 seconds (1-minute) are available for 15
 * days.
 *
 * - Data points with a period of 300 seconds (5-minute) are available for 63
 * days.
 *
 * - Data points with a period of 3600 seconds (1 hour) are available for 455
 * days (15 months).
 *
 * Data points that are initially published with a shorter period are aggregated
 * together for long-term storage. For example, if you collect data using a period of 1
 * minute, the data remains available for 15 days with 1-minute resolution. After 15 days,
 * this data is still available, but is aggregated and retrievable only with a resolution
 * of 5 minutes. After 63 days, the data is further aggregated and is available with a
 * resolution of 1 hour.
 *
 * CloudWatch started retaining 5-minute and 1-hour metric data as of July 9,
 * 2016.
 *
 * For information about metrics and dimensions supported by Amazon Web Services
 * services, see the Amazon CloudWatch
 * Metrics and Dimensions Reference in the Amazon CloudWatch User
 * Guide.
 */
export const getMetricStatistics: API.OperationMethod<
  GetMetricStatisticsInput,
  GetMetricStatisticsOutput,
  GetMetricStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMetricStatisticsInput,
  output: GetMetricStatisticsOutput,
  errors: [
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricStatistics",
}));

export type GetMetricStreamError =
  | InternalServiceFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the metric stream that you specify.
 */
export const getMetricStream: API.OperationMethod<
  GetMetricStreamInput,
  GetMetricStreamOutput,
  GetMetricStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMetricStreamInput,
  output: GetMetricStreamOutput,
  errors: [
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MissingRequiredParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricStream",
}));

export type GetMetricWidgetImageError = CommonErrors;
/**
 * You can use the `GetMetricWidgetImage` API to retrieve a snapshot graph
 * of one or more Amazon CloudWatch metrics as a bitmap image. You can then embed this
 * image into your services and products, such as wiki pages, reports, and documents. You
 * could also retrieve images regularly, such as every minute, and create your own custom
 * live dashboard.
 *
 * The graph you retrieve can include all CloudWatch metric graph features, including
 * metric math and horizontal and vertical annotations.
 *
 * There is a limit of 20 transactions per second for this API. Each
 * `GetMetricWidgetImage` action has the following limits:
 *
 * - As many as 100 metrics in the graph.
 *
 * - Up to 100 KB uncompressed payload.
 */
export const getMetricWidgetImage: API.OperationMethod<
  GetMetricWidgetImageInput,
  GetMetricWidgetImageOutput,
  GetMetricWidgetImageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMetricWidgetImageInput,
  output: GetMetricWidgetImageOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMetricWidgetImage",
}));

export type GetOTelEnrichmentError = CommonErrors;
/**
 * Returns the current status of vended metric enrichment for the account, including
 * whether CloudWatch vended metrics are enriched with resource ARN and resource tag labels
 * and queryable using PromQL. For the list of supported resources, see Supported Amazon Web Services infrastructure metrics.
 */
export const getOTelEnrichment: API.OperationMethod<
  GetOTelEnrichmentInput,
  GetOTelEnrichmentOutput,
  GetOTelEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOTelEnrichmentInput,
  output: GetOTelEnrichmentOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOTelEnrichment",
}));

export type ListAlarmMuteRulesError =
  | InvalidNextToken
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists alarm mute rules in your Amazon Web Services account and region.
 *
 * You can filter the results by alarm name to find all mute rules targeting a specific
 * alarm, or by status to find rules that are scheduled, active, or expired.
 *
 * This operation supports pagination for accounts with many mute rules. Use the
 * `MaxRecords` and `NextToken` parameters to retrieve results in
 * multiple calls.
 *
 * **Permissions**
 *
 * To list mute rules, you need the `cloudwatch:ListAlarmMuteRules`
 * permission.
 */
export const listAlarmMuteRules: API.PaginatedOperationMethod<
  ListAlarmMuteRulesInput,
  ListAlarmMuteRulesOutput,
  ListAlarmMuteRulesError,
  Credentials | HttpClient.HttpClient,
  AlarmMuteRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAlarmMuteRulesInput,
  output: ListAlarmMuteRulesOutput,
  errors: [InvalidNextToken, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAlarmMuteRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AlarmMuteRuleSummaries",
    pageSize: "MaxRecords",
  } as const,
})) as any;

export type ListDashboardsError =
  | InternalServiceFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * Returns a list of the dashboards for your account. If you include
 * `DashboardNamePrefix`, only those dashboards with names starting with the
 * prefix are listed. Otherwise, all dashboards in your account are listed.
 *
 * `ListDashboards` returns up to 1000 results on one page. If there are
 * more than 1000 dashboards, you can call `ListDashboards` again and include
 * the value you received for `NextToken` in the first call, to receive the next
 * 1000 results.
 */
export const listDashboards: API.PaginatedOperationMethod<
  ListDashboardsInput,
  ListDashboardsOutput,
  ListDashboardsError,
  Credentials | HttpClient.HttpClient,
  DashboardEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDashboardsInput,
  output: ListDashboardsOutput,
  errors: [InternalServiceFault, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDashboards",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DashboardEntries",
  } as const,
})) as any;

export type ListManagedInsightRulesError =
  | InvalidNextToken
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Returns a list that contains the number of managed Contributor Insights rules in your
 * account.
 */
export const listManagedInsightRules: API.PaginatedOperationMethod<
  ListManagedInsightRulesInput,
  ListManagedInsightRulesOutput,
  ListManagedInsightRulesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListManagedInsightRulesInput,
  output: ListManagedInsightRulesOutput,
  errors: [
    InvalidNextToken,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedInsightRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMetricsError =
  | InternalServiceFault
  | InvalidParameterValueException
  | CommonErrors;
/**
 * List the specified metrics. You can use the returned metrics with GetMetricData or GetMetricStatistics to get statistical data.
 *
 * Up to 500 results are returned for any one call. To retrieve additional results,
 * use the returned token with subsequent calls.
 *
 * After you create a metric, allow up to 15 minutes for the metric to appear. To see
 * metric statistics sooner, use GetMetricData or GetMetricStatistics.
 *
 * If you are using CloudWatch cross-account observability, you can use this
 * operation in a monitoring account and view metrics from the linked source accounts. For
 * more information, see CloudWatch cross-account observability.
 *
 * `ListMetrics` doesn't return information about metrics if those metrics
 * haven't reported data in the past two weeks. To retrieve those metrics, use GetMetricData or GetMetricStatistics.
 */
export const listMetrics: API.PaginatedOperationMethod<
  ListMetricsInput,
  ListMetricsOutput,
  ListMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMetricsInput,
  output: ListMetricsOutput,
  errors: [InternalServiceFault, InvalidParameterValueException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetrics",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type ListMetricStreamsError =
  | InternalServiceFault
  | InvalidNextToken
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Returns a list of metric streams in this account.
 */
export const listMetricStreams: API.PaginatedOperationMethod<
  ListMetricStreamsInput,
  ListMetricStreamsOutput,
  ListMetricStreamsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMetricStreamsInput,
  output: ListMetricStreamsOutput,
  errors: [
    InternalServiceFault,
    InvalidNextToken,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetricStreams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceFault
  | InvalidParameterValueException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Displays the tags associated with a CloudWatch resource. Currently, alarms,
 * dashboards, metric streams and Contributor Insights rules support tagging.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    InternalServiceFault,
    InvalidParameterValueException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutAlarmMuteRuleError = LimitExceededFault | CommonErrors;
/**
 * Creates or updates an alarm mute rule.
 *
 * Alarm mute rules automatically mute alarm actions during predefined time windows. When
 * a mute rule is active, targeted alarms continue to evaluate metrics and transition
 * between states, but their configured actions (such as Amazon SNS notifications
 * or Auto Scaling actions) are muted.
 *
 * You can create mute rules with recurring schedules using `cron` expressions
 * or one-time mute windows using `at` expressions. Each mute rule can target up
 * to 100 specific alarms by name.
 *
 * If you specify a rule name that already exists, this operation updates the existing
 * rule with the new configuration.
 *
 * **Permissions**
 *
 * To create or update a mute rule, you must have the
 * `cloudwatch:PutAlarmMuteRule` permission on two types of resources: the
 * alarm mute rule resource itself, and each alarm that the rule targets.
 *
 * For example, If you want to allow a user to create mute rules that target only
 * specific alarms named "WebServerCPUAlarm" and "DatabaseConnectionAlarm", you would
 * create an IAM policy with one statement granting
 * `cloudwatch:PutAlarmMuteRule` on the alarm mute rule resource
 * (`arn:aws:cloudwatch:[REGION]:123456789012:alarm-mute-rule:*`), and
 * another statement granting `cloudwatch:PutAlarmMuteRule` on the targeted
 * alarm resources
 * (`arn:aws:cloudwatch:[REGION]:123456789012:alarm:WebServerCPUAlarm` and
 * `arn:aws:cloudwatch:[REGION]:123456789012:alarm:DatabaseConnectionAlarm`).
 *
 * You can also use IAM policy conditions to allow targeting alarms based on resource
 * tags. For example, you can restrict users to create/update mute rules to only target
 * alarms that have a specific tag key-value pair, such as `Team=TeamA`.
 */
export const putAlarmMuteRule: API.OperationMethod<
  PutAlarmMuteRuleInput,
  PutAlarmMuteRuleResponse,
  PutAlarmMuteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAlarmMuteRuleInput,
  output: PutAlarmMuteRuleResponse,
  errors: [LimitExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAlarmMuteRule",
}));

export type PutAnomalyDetectorError =
  | InternalServiceFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | LimitExceededException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Creates an anomaly detection model for a CloudWatch metric. You can use the model to
 * display a band of expected normal values when the metric is graphed.
 *
 * If you have enabled unified cross-account observability, and this account is a
 * monitoring account, the metric can be in the same account or a source account. You can
 * specify the account ID in the object you specify in the
 * `SingleMetricAnomalyDetector` parameter.
 *
 * For more information, see CloudWatch Anomaly Detection.
 */
export const putAnomalyDetector: API.OperationMethod<
  PutAnomalyDetectorInput,
  PutAnomalyDetectorOutput,
  PutAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAnomalyDetectorInput,
  output: PutAnomalyDetectorOutput,
  errors: [
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    LimitExceededException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAnomalyDetector",
}));

export type PutCompositeAlarmError = LimitExceededFault | CommonErrors;
/**
 * Creates or updates a *composite alarm*. When you create a composite
 * alarm, you specify a rule expression for the alarm that takes into account the alarm
 * states of other alarms that you have created. The composite alarm goes into ALARM state
 * only if all conditions of the rule are met.
 *
 * The alarms specified in a composite alarm's rule expression can include metric alarms
 * and other composite alarms. The rule expression of a composite alarm can include as many
 * as 100 underlying alarms. Any single alarm can be included in the rule expressions of as
 * many as 150 composite alarms.
 *
 * Using composite alarms can reduce alarm noise. You can create multiple metric alarms,
 * and also create a composite alarm and set up alerts only for the composite alarm. For
 * example, you could create a composite alarm that goes into ALARM state only when more
 * than one of the underlying metric alarms are in ALARM state.
 *
 * Composite alarms can take the following actions:
 *
 * - Notify Amazon SNS topics.
 *
 * - Invoke Lambda functions.
 *
 * - Create OpsItems in Systems Manager Ops Center.
 *
 * - Create incidents in Systems Manager Incident Manager.
 *
 * It is possible to create a loop or cycle of composite alarms, where composite
 * alarm A depends on composite alarm B, and composite alarm B also depends on
 * composite alarm A. In this scenario, you can't delete any composite alarm that is
 * part of the cycle because there is always still a composite alarm that depends on
 * that alarm that you want to delete.
 *
 * To get out of such a situation, you must break the cycle by changing the rule of
 * one of the composite alarms in the cycle to remove a dependency that creates the
 * cycle. The simplest change to make to break a cycle is to change the
 * `AlarmRule` of one of the alarms to `false`.
 *
 * Additionally, the evaluation of composite alarms stops if CloudWatch detects a
 * cycle in the evaluation path.
 *
 * When this operation creates an alarm, the alarm state is immediately set to
 * `INSUFFICIENT_DATA`. The alarm is then evaluated and its state is set
 * appropriately. Any actions associated with the new state are then executed. For a
 * composite alarm, this initial time after creation is the only time that the alarm can be
 * in `INSUFFICIENT_DATA` state.
 *
 * When you update an existing alarm, its state is left unchanged, but the update
 * completely overwrites the previous configuration of the alarm.
 *
 * To use this operation, you must be signed on with the
 * `cloudwatch:PutCompositeAlarm` permission that is scoped to
 * `*`. You can't create a composite alarms if your
 * `cloudwatch:PutCompositeAlarm` permission has a narrower scope.
 *
 * If you are an IAM user, you must have
 * `iam:CreateServiceLinkedRole` to create a composite alarm that has
 * Systems Manager OpsItem actions.
 */
export const putCompositeAlarm: API.OperationMethod<
  PutCompositeAlarmInput,
  PutCompositeAlarmResponse,
  PutCompositeAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutCompositeAlarmInput,
  output: PutCompositeAlarmResponse,
  errors: [LimitExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutCompositeAlarm",
}));

export type PutDashboardError =
  | ConflictException
  | DashboardInvalidInputError
  | InternalServiceFault
  | CommonErrors;
/**
 * Creates a dashboard if it does not already exist, or updates an existing dashboard.
 * If you update a dashboard, the entire contents are replaced with what you specify
 * here.
 *
 * All dashboards in your account are global, not region-specific.
 *
 * A simple way to create a dashboard using `PutDashboard` is to copy an
 * existing dashboard. To copy an existing dashboard using the console, you can load the
 * dashboard and then use the View/edit source command in the Actions menu to display the
 * JSON block for that dashboard. Another way to copy a dashboard is to use
 * `GetDashboard`, and then use the data returned within
 * `DashboardBody` as the template for the new dashboard when you call
 * `PutDashboard`.
 *
 * When you create a dashboard with `PutDashboard`, a good practice is to
 * add a text widget at the top of the dashboard with a message that the dashboard was
 * created by script and should not be changed in the console. This message could also
 * point console users to the location of the `DashboardBody` script or the
 * CloudFormation template used to create the dashboard.
 */
export const putDashboard: API.OperationMethod<
  PutDashboardInput,
  PutDashboardOutput,
  PutDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDashboardInput,
  output: PutDashboardOutput,
  errors: [ConflictException, DashboardInvalidInputError, InternalServiceFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDashboard",
}));

export type PutInsightRuleError =
  | InvalidParameterValueException
  | LimitExceededException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Creates a Contributor Insights rule. Rules evaluate log events in a CloudWatch Logs
 * log group, enabling you to find contributor data for the log events in that log group.
 * For more information, see Using Contributor
 * Insights to Analyze High-Cardinality Data.
 *
 * If you create a rule, delete it, and then re-create it with the same name, historical
 * data from the first time the rule was created might not be available.
 */
export const putInsightRule: API.OperationMethod<
  PutInsightRuleInput,
  PutInsightRuleOutput,
  PutInsightRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutInsightRuleInput,
  output: PutInsightRuleOutput,
  errors: [
    InvalidParameterValueException,
    LimitExceededException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInsightRule",
}));

export type PutLogAlarmError =
  | LimitExceededFault
  | ResourceConflict
  | CommonErrors;
/**
 * Creates or updates a log alarm. A log alarm evaluates the results of a CloudWatch Logs scheduled query against the configured threshold and comparison operator to determine its state.
 *
 * When you create a log alarm, the operation creates a service-managed CloudWatch Logs scheduled query that runs the query string you provide on the schedule you configure. Each scheduled query execution returns one or more aggregated values determined by the `AggregationExpression`, and each aggregated value is compared against the alarm `Threshold` to determine the alarm state. The alarm uses M-out-of-N evaluation: if `QueryResultsToAlarm` out of the most recent `QueryResultsToEvaluate` query results breach the threshold, the alarm transitions to `ALARM`.
 *
 * Log alarms support the alarm states (`OK`, `ALARM`, `INSUFFICIENT_DATA`). Configure transition actions using `OKActions`, `AlarmActions`, and `InsufficientDataActions`.
 *
 * If you call this operation with the name of an existing log alarm, the operation replaces the previous configuration of that alarm.
 *
 * **Permissions**
 *
 * To create or update a log alarm, you must have the `cloudwatch:PutLogAlarm` permission. The IAM role specified in `ScheduledQueryRoleARN` must grant the CloudWatch Alarms service permission to execute scheduled queries on the specified log groups. If you set `ActionLogLineCount`, the role specified in `ActionLogLineRoleArn` must grant permission to retrieve log events for inclusion in alarm notifications.
 */
export const putLogAlarm: API.OperationMethod<
  PutLogAlarmInput,
  PutLogAlarmResponse,
  PutLogAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutLogAlarmInput,
  output: PutLogAlarmResponse,
  errors: [LimitExceededFault, ResourceConflict],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLogAlarm",
}));

export type PutManagedInsightRulesError =
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Creates a managed Contributor Insights rule for a specified Amazon Web Services
 * resource. When you enable a managed rule, you create a Contributor Insights rule that
 * collects data from Amazon Web Services services. You cannot edit these rules with
 * `PutInsightRule`. The rules can be enabled, disabled, and deleted using
 * `EnableInsightRules`, `DisableInsightRules`, and
 * `DeleteInsightRules`. If a previously created managed rule is currently
 * disabled, a subsequent call to this API will re-enable it. Use
 * `ListManagedInsightRules` to describe all available rules.
 */
export const putManagedInsightRules: API.OperationMethod<
  PutManagedInsightRulesInput,
  PutManagedInsightRulesOutput,
  PutManagedInsightRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutManagedInsightRulesInput,
  output: PutManagedInsightRulesOutput,
  errors: [InvalidParameterValueException, MissingRequiredParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutManagedInsightRules",
}));

export type PutMetricAlarmError = LimitExceededFault | CommonErrors;
/**
 * Creates or updates an alarm and associates it with the specified metric, metric
 * math expression, anomaly detection model, Metrics Insights query, or PromQL query. For
 * more information about using a Metrics Insights query for an alarm, see Create
 * alarms on Metrics Insights queries.
 *
 * Alarms based on anomaly detection models cannot have Auto Scaling actions.
 *
 * When this operation creates an alarm, the alarm state is immediately set to
 * `INSUFFICIENT_DATA`. For PromQL alarms, the alarm state is instead
 * immediately set to `OK`. The alarm is then evaluated and its state is set
 * appropriately. Any actions associated with the new state are then executed.
 *
 * When you update an existing alarm, its state is left unchanged, but the update
 * completely overwrites the previous configuration of the alarm.
 *
 * If you are an IAM user, you must have Amazon EC2 permissions for
 * some alarm operations:
 *
 * - The `iam:CreateServiceLinkedRole` permission for all alarms with
 * EC2 actions
 *
 * - The `iam:CreateServiceLinkedRole` permissions to create an alarm
 * with Systems Manager OpsItem or response plan actions.
 *
 * The first time you create an alarm in the Amazon Web Services Management Console, the CLI, or by using the PutMetricAlarm API, CloudWatch creates the necessary
 * service-linked role for you. The service-linked roles are called
 * `AWSServiceRoleForCloudWatchEvents` and
 * `AWSServiceRoleForCloudWatchAlarms_ActionSSM`. For more information, see
 * Amazon Web Services service-linked role.
 *
 * Each `PutMetricAlarm` action has a maximum uncompressed payload of 120
 * KB.
 *
 * **Cross-account alarms**
 *
 * You can set an alarm on metrics in the current account, or in another account. To
 * create a cross-account alarm that watches a metric in a different account, you must have
 * completed the following pre-requisites:
 *
 * - The account where the metrics are located (the sharing
 * account) must already have a sharing role named **CloudWatch-CrossAccountSharingRole**. If it does not
 * already have this role, you must create it using the instructions in **Set up a sharing account** in Cross-account cross-Region CloudWatch console. The policy
 * for that role must grant access to the ID of the account where you are creating
 * the alarm.
 *
 * - The account where you are creating the alarm (the monitoring
 * account) must already have a service-linked role named **AWSServiceRoleForCloudWatchCrossAccount** to allow
 * CloudWatch to assume the sharing role in the sharing account. If it
 * does not, you must create it following the directions in **Set up a monitoring account** in Cross-account cross-Region CloudWatch console.
 */
export const putMetricAlarm: API.OperationMethod<
  PutMetricAlarmInput,
  PutMetricAlarmResponse,
  PutMetricAlarmError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMetricAlarmInput,
  output: PutMetricAlarmResponse,
  errors: [LimitExceededFault],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetricAlarm",
}));

export type PutMetricDataError =
  | InternalServiceFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Publishes metric data to Amazon CloudWatch. CloudWatch associates the data with the
 * specified metric. If the specified metric does not exist, CloudWatch creates the metric.
 * When CloudWatch creates a metric, it can take up to fifteen minutes for the metric to
 * appear in calls to ListMetrics.
 *
 * You can publish metrics with associated entity data (so that related telemetry can be
 * found and viewed together), or publish metric data by itself. To send entity data with
 * your metrics, use the `EntityMetricData` parameter. To send metrics without
 * entity data, use the `MetricData` parameter. The
 * `EntityMetricData` structure includes `MetricData` structures
 * for the metric data.
 *
 * You can publish either individual values in the `Value` field, or arrays of
 * values and the number of times each value occurred during the period by using the
 * `Values` and `Counts` fields in the `MetricData`
 * structure. Using the `Values` and `Counts` method enables you to
 * publish up to 150 values per metric with one `PutMetricData` request, and
 * supports retrieving percentile statistics on this data.
 *
 * Each `PutMetricData` request is limited to 1 MB in size for HTTP POST
 * requests. You can send a payload compressed by gzip. Each request is also limited to no
 * more than 1000 different metrics (across both the `MetricData` and
 * `EntityMetricData` properties).
 *
 * Although the `Value` parameter accepts numbers of type `Double`,
 * CloudWatch rejects values that are either too small or too large. Values must be in the
 * range of -2^360 to 2^360. In addition, special values (for example, NaN, +Infinity,
 * -Infinity) are not supported.
 *
 * You can use up to 30 dimensions per metric to further clarify what data the metric
 * collects. Each dimension consists of a Name and Value pair. For more information about
 * specifying dimensions, see Publishing
 * Metrics in the *Amazon CloudWatch User Guide*.
 *
 * You specify the time stamp to be associated with each data point. You can specify time
 * stamps that are as much as two weeks before the current date, and as much as 2 hours
 * after the current day and time.
 *
 * Data points with time stamps from 24 hours ago or longer can take at least 48 hours to
 * become available for GetMetricData or GetMetricStatistics from the time they are submitted. Data points with time
 * stamps between 3 and 24 hours ago can take as much as 2 hours to become available for
 * GetMetricData or GetMetricStatistics.
 *
 * CloudWatch needs raw data points to calculate percentile statistics. If you publish
 * data using a statistic set instead, you can only retrieve percentile statistics for this
 * data if one of the following conditions is true:
 *
 * - The `SampleCount` value of the statistic set is 1 and
 * `Min`, `Max`, and `Sum` are all
 * equal.
 *
 * - The `Min` and `Max` are equal, and `Sum`
 * is equal to `Min` multiplied by `SampleCount`.
 */
export const putMetricData: API.OperationMethod<
  PutMetricDataInput,
  PutMetricDataResponse,
  PutMetricDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMetricDataInput,
  output: PutMetricDataResponse,
  errors: [
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetricData",
}));

export type PutMetricStreamError =
  | ConcurrentModificationException
  | InternalServiceFault
  | InvalidParameterCombinationException
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Creates or updates a metric stream. Metric streams can automatically stream CloudWatch
 * metrics to Amazon Web Services destinations, including Amazon S3, and to many third-party
 * solutions.
 *
 * For more information, see Using
 * Metric Streams.
 *
 * To create a metric stream, you must be signed in to an account that has the
 * `iam:PassRole` permission and either the
 * `CloudWatchFullAccess` policy or the
 * `cloudwatch:PutMetricStream` permission.
 *
 * When you create or update a metric stream, you choose one of the following:
 *
 * - Stream metrics from all metric namespaces in the account.
 *
 * - Stream metrics from all metric namespaces in the account, except for the
 * namespaces that you list in `ExcludeFilters`.
 *
 * - Stream metrics from only the metric namespaces that you list in
 * `IncludeFilters`.
 *
 * By default, a metric stream always sends the `MAX`, `MIN`,
 * `SUM`, and `SAMPLECOUNT` statistics for each metric that is
 * streamed. You can use the `StatisticsConfigurations` parameter to have the
 * metric stream send additional statistics in the stream. Streaming additional statistics
 * incurs additional costs. For more information, see Amazon CloudWatch Pricing.
 *
 * When you use `PutMetricStream` to create a new metric stream, the stream is
 * created in the `running` state. If you use it to update an existing stream,
 * the state of the stream is not changed.
 *
 * If you are using CloudWatch cross-account observability and you create a metric
 * stream in a monitoring account, you can choose whether to include metrics from source
 * accounts in the stream. For more information, see CloudWatch cross-account observability.
 */
export const putMetricStream: API.OperationMethod<
  PutMetricStreamInput,
  PutMetricStreamOutput,
  PutMetricStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMetricStreamInput,
  output: PutMetricStreamOutput,
  errors: [
    ConcurrentModificationException,
    InternalServiceFault,
    InvalidParameterCombinationException,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMetricStream",
}));

export type SetAlarmStateError =
  | InvalidFormatFault
  | ResourceNotFound
  | CommonErrors;
/**
 * Temporarily sets the state of an alarm for testing purposes. When the updated state
 * differs from the previous value, the action configured for the appropriate state is
 * invoked. For example, if your alarm is configured to send an Amazon SNS message when an
 * alarm is triggered, temporarily changing the alarm state to `ALARM` sends an
 * SNS message.
 *
 * Metric alarms returns to their actual state quickly, often within seconds. Because
 * the metric alarm state change happens quickly, it is typically only visible in the
 * alarm's **History** tab in the Amazon CloudWatch console or
 * through DescribeAlarmHistory.
 *
 * If you use `SetAlarmState` on a composite alarm, the composite alarm is
 * not guaranteed to return to its actual state. It returns to its actual state only once
 * any of its children alarms change state. It is also reevaluated if you update its
 * configuration.
 *
 * If an alarm triggers EC2 Auto Scaling policies or application Auto Scaling
 * policies, you must include information in the `StateReasonData` parameter to
 * enable the policy to take the correct action.
 */
export const setAlarmState: API.OperationMethod<
  SetAlarmStateInput,
  SetAlarmStateResponse,
  SetAlarmStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetAlarmStateInput,
  output: SetAlarmStateResponse,
  errors: [InvalidFormatFault, ResourceNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetAlarmState",
}));

export type StartMetricStreamsError =
  | InternalServiceFault
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Starts the streaming of metrics for one or more of your metric streams.
 */
export const startMetricStreams: API.OperationMethod<
  StartMetricStreamsInput,
  StartMetricStreamsOutput,
  StartMetricStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMetricStreamsInput,
  output: StartMetricStreamsOutput,
  errors: [
    InternalServiceFault,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMetricStreams",
}));

export type StartOTelEnrichmentError = CommonErrors;
/**
 * Enables enrichment and PromQL access for CloudWatch vended metrics for supported Amazon Web Services resources in the account. Once enabled,
 * metrics that contain a resource identifier dimension (for example, EC2
 * `CPUUtilization` with an `InstanceId` dimension) are enriched
 * with resource ARN and resource tag labels and become queryable using PromQL.
 *
 * Before calling this operation, you must enable resource tags on telemetry for your
 * account. For more information, see Enable
 * resource tags on telemetry.
 */
export const startOTelEnrichment: API.OperationMethod<
  StartOTelEnrichmentInput,
  StartOTelEnrichmentOutput,
  StartOTelEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartOTelEnrichmentInput,
  output: StartOTelEnrichmentOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartOTelEnrichment",
}));

export type StopMetricStreamsError =
  | InternalServiceFault
  | InvalidParameterValueException
  | MissingRequiredParameterException
  | CommonErrors;
/**
 * Stops the streaming of metrics for one or more of your metric streams.
 */
export const stopMetricStreams: API.OperationMethod<
  StopMetricStreamsInput,
  StopMetricStreamsOutput,
  StopMetricStreamsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopMetricStreamsInput,
  output: StopMetricStreamsOutput,
  errors: [
    InternalServiceFault,
    InvalidParameterValueException,
    MissingRequiredParameterException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMetricStreams",
}));

export type StopOTelEnrichmentError = CommonErrors;
/**
 * Disables enrichment and PromQL access for CloudWatch vended metrics for supported Amazon Web Services resources in the account. After disabling,
 * these metrics are no longer enriched with resource ARN and resource tag labels, and
 * cannot be queried using PromQL.
 */
export const stopOTelEnrichment: API.OperationMethod<
  StopOTelEnrichmentInput,
  StopOTelEnrichmentOutput,
  StopOTelEnrichmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopOTelEnrichmentInput,
  output: StopOTelEnrichmentOutput,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopOTelEnrichment",
}));

export type TagResourceError =
  | ConcurrentModificationException
  | ConflictException
  | InternalServiceFault
  | InvalidParameterValueException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified CloudWatch resource.
 * Currently, the only CloudWatch resources that can be tagged are alarms, dashboards,
 * metric streams and Contributor Insights rules.
 *
 * Tags can help you organize and categorize your resources. You can also use them to
 * scope user permissions by granting a user permission to access or change only resources
 * with certain tag values.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted
 * strictly as strings of characters.
 *
 * You can use the `TagResource` action with an alarm that already has tags.
 * If you specify a new tag key for the alarm, this tag is appended to the list of tags
 * associated with the alarm. If you specify a tag key that is already associated with the
 * alarm, the new tag value that you specify replaces the previous value for that
 * tag.
 *
 * You can associate as many as 50 tags with a CloudWatch resource.
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
    ConcurrentModificationException,
    ConflictException,
    InternalServiceFault,
    InvalidParameterValueException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ConcurrentModificationException
  | ConflictException
  | InternalServiceFault
  | InvalidParameterValueException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource. Currently, alarms, dashboards,
 * metric streams and Contributor Insights rules support tagging.
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
    ConcurrentModificationException,
    ConflictException,
    InternalServiceFault,
    InvalidParameterValueException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
