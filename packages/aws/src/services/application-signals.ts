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
  sdkId: "Application Signals",
  serviceShapeName: "ApplicationSignals",
});
const auth = T.AwsAuthSigv4({ name: "application-signals" });
const ver = T.ServiceVersion("2024-04-15");
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
        if (UseFIPS === true) {
          return e(
            `https://application-signals-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        return e(
          `https://application-signals.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      ResourceType: S.String,
      ResourceId: S.String,
      message: S.String.pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "ValidationError", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type InstrumentationType = "BREAKPOINT" | "PROBE" | (string & {});
export const InstrumentationType = /*@__PURE__*/ S.String;

export interface BatchDeleteScope {
  Service: string;
  Environment: string;
  InstrumentationType: InstrumentationType;
}
export const BatchDeleteScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Service: S.String,
    Environment: S.String,
    InstrumentationType: InstrumentationType,
  }),
).annotate({
  identifier: "BatchDeleteScope",
}) as any as S.Schema<BatchDeleteScope>;
export type BatchDeleteResourceArnList = string[];
export const BatchDeleteResourceArnList = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteByResourceArns {
  ResourceArns: string[];
  InstrumentationType: InstrumentationType;
}
export const BatchDeleteByResourceArns = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArns: BatchDeleteResourceArnList,
    InstrumentationType: InstrumentationType,
  }),
).annotate({
  identifier: "BatchDeleteByResourceArns",
}) as any as S.Schema<BatchDeleteByResourceArns>;
export type BatchDeleteDeletionTarget =
  | { Scope: BatchDeleteScope; ResourceArns?: never }
  | { Scope?: never; ResourceArns: BatchDeleteByResourceArns };
export const BatchDeleteDeletionTarget = /*@__PURE__*/ S.Union([
  S.Struct({ Scope: BatchDeleteScope }),
  S.Struct({ ResourceArns: BatchDeleteByResourceArns }),
]);
export interface BatchDeleteInstrumentationConfigurationsRequest {
  DeletionTarget: BatchDeleteDeletionTarget;
}
export const BatchDeleteInstrumentationConfigurationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DeletionTarget: BatchDeleteDeletionTarget }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/batch-delete-instrumentation-configurations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchDeleteInstrumentationConfigurationsRequest",
  }) as any as S.Schema<BatchDeleteInstrumentationConfigurationsRequest>;
export interface BatchDeleteSuccessfulDeletion {
  ResourceArn?: string;
  SignalType?: string;
  LocationHash?: string;
}
export const BatchDeleteSuccessfulDeletion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    SignalType: S.optional(S.String),
    LocationHash: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchDeleteSuccessfulDeletion",
}) as any as S.Schema<BatchDeleteSuccessfulDeletion>;
export type BatchDeleteSuccessfulDeletionList = BatchDeleteSuccessfulDeletion[];
export const BatchDeleteSuccessfulDeletionList = /*@__PURE__*/ S.Array(
  BatchDeleteSuccessfulDeletion,
);
export type BatchDeleteErrorCode =
  | "ResourceNotFoundException"
  | "AccessDeniedException"
  | "InternalServiceException"
  | (string & {});
export const BatchDeleteErrorCode = /*@__PURE__*/ S.String;

export interface BatchDeleteError {
  ResourceArn: string;
  Code: BatchDeleteErrorCode;
  Message: string;
}
export const BatchDeleteError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    Code: BatchDeleteErrorCode,
    Message: S.String,
  }),
).annotate({
  identifier: "BatchDeleteError",
}) as any as S.Schema<BatchDeleteError>;
export type BatchDeleteErrorList = BatchDeleteError[];
export const BatchDeleteErrorList = /*@__PURE__*/ S.Array(BatchDeleteError);
export interface BatchDeleteInstrumentationConfigurationsResponse {
  DeletedCount: number;
  SuccessfulDeletions: BatchDeleteSuccessfulDeletion[];
  Errors: BatchDeleteError[];
}
export const BatchDeleteInstrumentationConfigurationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DeletedCount: S.Number,
      SuccessfulDeletions: BatchDeleteSuccessfulDeletionList,
      Errors: BatchDeleteErrorList,
    }),
  ).annotate({
    identifier: "BatchDeleteInstrumentationConfigurationsResponse",
  }) as any as S.Schema<BatchDeleteInstrumentationConfigurationsResponse>;
export type ServiceLevelObjectiveIds = string[];
export const ServiceLevelObjectiveIds = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetServiceLevelObjectiveBudgetReportInput {
  Timestamp: Date;
  SloIds: string[];
}
export const BatchGetServiceLevelObjectiveBudgetReportInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      SloIds: ServiceLevelObjectiveIds,
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/budget-report" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchGetServiceLevelObjectiveBudgetReportInput",
  }) as any as S.Schema<BatchGetServiceLevelObjectiveBudgetReportInput>;
export type ServiceLevelObjectiveArn = string;
export type ServiceLevelObjectiveName = string;
export type EvaluationType = "PeriodBased" | "RequestBased" | (string & {});
export const EvaluationType = /*@__PURE__*/ S.String;

export type ServiceLevelObjectiveBudgetStatus =
  | "OK"
  | "WARNING"
  | "BREACHED"
  | "INSUFFICIENT_DATA"
  | (string & {});
export const ServiceLevelObjectiveBudgetStatus = /*@__PURE__*/ S.String;

export type Attainment = number;
export type TotalBudgetSeconds = number;
export type BudgetSecondsRemaining = number;
export type TotalBudgetRequests = number;
export type BudgetRequestsRemaining = number;
export type KeyAttributeName = string;
export type KeyAttributeValue = string;
export type Attributes = { [key: string]: string | undefined };
export const Attributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type OperationName = string;
export type ServiceLevelIndicatorMetricType =
  | "LATENCY"
  | "AVAILABILITY"
  | (string & {});
export const ServiceLevelIndicatorMetricType = /*@__PURE__*/ S.String;

export type MetricId = string;
export type Namespace = string;
export type MetricName = string;
export type DimensionName = string;
export type DimensionValue = string;
export interface Dimension {
  Name: string;
  Value: string;
}
export const Dimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({ identifier: "Dimension" }) as any as S.Schema<Dimension>;
export type Dimensions = Dimension[];
export const Dimensions = /*@__PURE__*/ S.Array(Dimension);
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
  | "Microseconds"
  | "Milliseconds"
  | "Seconds"
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
export const StandardUnit = /*@__PURE__*/ S.String;

export interface MetricStat {
  Metric: Metric;
  Period: number;
  Stat: string;
  Unit?: StandardUnit;
}
export const MetricStat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metric: Metric,
    Period: S.Number,
    Stat: S.String,
    Unit: S.optional(StandardUnit),
  }),
).annotate({ identifier: "MetricStat" }) as any as S.Schema<MetricStat>;
export type MetricExpression = string;
export type MetricLabel = string;
export type ReturnData = boolean;
export type AccountId = string;
export interface MetricDataQuery {
  Id: string;
  MetricStat?: MetricStat;
  Expression?: string;
  Label?: string;
  ReturnData?: boolean;
  Period?: number;
  AccountId?: string;
}
export const MetricDataQuery = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String,
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
export interface DependencyConfig {
  DependencyKeyAttributes: { [key: string]: string | undefined };
  DependencyOperationName: string;
}
export const DependencyConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DependencyKeyAttributes: Attributes,
    DependencyOperationName: S.String,
  }),
).annotate({
  identifier: "DependencyConfig",
}) as any as S.Schema<DependencyConfig>;
export interface MetricSource {
  MetricSourceKeyAttributes: { [key: string]: string | undefined };
  MetricSourceAttributes?: { [key: string]: string | undefined };
}
export const MetricSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricSourceKeyAttributes: Attributes,
    MetricSourceAttributes: S.optional(Attributes),
  }),
).annotate({ identifier: "MetricSource" }) as any as S.Schema<MetricSource>;
export type SelectionType = "EXPLICIT" | "PREFIX" | "REGEX" | (string & {});
export const SelectionType = /*@__PURE__*/ S.String;

export type SelectionPattern = string;
export interface SelectionConfig {
  Type: SelectionType;
  Pattern?: string;
}
export const SelectionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: SelectionType, Pattern: S.optional(S.String) }),
).annotate({
  identifier: "SelectionConfig",
}) as any as S.Schema<SelectionConfig>;
export type CompositeSliComponent = { OperationName: string };
export const CompositeSliComponent = /*@__PURE__*/ S.Union([
  S.Struct({ OperationName: S.String }),
]);
export type CompositeSliComponents = CompositeSliComponent[];
export const CompositeSliComponents = /*@__PURE__*/ S.Array(
  CompositeSliComponent,
);
export interface CompositeSliConfig {
  SelectionConfig: SelectionConfig;
  Components?: CompositeSliComponent[];
}
export const CompositeSliConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SelectionConfig: SelectionConfig,
    Components: S.optional(CompositeSliComponents),
  }),
).annotate({
  identifier: "CompositeSliConfig",
}) as any as S.Schema<CompositeSliConfig>;
export interface ServiceLevelIndicatorMetric {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  MetricType?: ServiceLevelIndicatorMetricType;
  MetricDataQueries: MetricDataQuery[];
  DependencyConfig?: DependencyConfig;
  MetricSource?: MetricSource;
  CompositeSliConfig?: CompositeSliConfig;
}
export const ServiceLevelIndicatorMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyAttributes: S.optional(Attributes),
    OperationName: S.optional(S.String),
    MetricType: S.optional(ServiceLevelIndicatorMetricType),
    MetricDataQueries: MetricDataQueries,
    DependencyConfig: S.optional(DependencyConfig),
    MetricSource: S.optional(MetricSource),
    CompositeSliConfig: S.optional(CompositeSliConfig),
  }),
).annotate({
  identifier: "ServiceLevelIndicatorMetric",
}) as any as S.Schema<ServiceLevelIndicatorMetric>;
export type ServiceLevelIndicatorMetricThreshold = number;
export type ServiceLevelIndicatorComparisonOperator =
  | "GreaterThanOrEqualTo"
  | "GreaterThan"
  | "LessThan"
  | "LessThanOrEqualTo"
  | (string & {});
export const ServiceLevelIndicatorComparisonOperator = /*@__PURE__*/ S.String;

export interface ServiceLevelIndicator {
  SliMetric: ServiceLevelIndicatorMetric;
  MetricThreshold: number;
  ComparisonOperator: ServiceLevelIndicatorComparisonOperator;
}
export const ServiceLevelIndicator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SliMetric: ServiceLevelIndicatorMetric,
    MetricThreshold: S.Number,
    ComparisonOperator: ServiceLevelIndicatorComparisonOperator,
  }),
).annotate({
  identifier: "ServiceLevelIndicator",
}) as any as S.Schema<ServiceLevelIndicator>;
export type MonitoredRequestCountMetricDataQueries =
  | { GoodCountMetric: MetricDataQuery[]; BadCountMetric?: never }
  | { GoodCountMetric?: never; BadCountMetric: MetricDataQuery[] };
export const MonitoredRequestCountMetricDataQueries = /*@__PURE__*/ S.Union([
  S.Struct({ GoodCountMetric: MetricDataQueries }),
  S.Struct({ BadCountMetric: MetricDataQueries }),
]);
export interface RequestBasedServiceLevelIndicatorMetric {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  MetricType?: ServiceLevelIndicatorMetricType;
  TotalRequestCountMetric: MetricDataQuery[];
  MonitoredRequestCountMetric: MonitoredRequestCountMetricDataQueries;
  DependencyConfig?: DependencyConfig;
  MetricSource?: MetricSource;
  CompositeSliConfig?: CompositeSliConfig;
}
export const RequestBasedServiceLevelIndicatorMetric = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      KeyAttributes: S.optional(Attributes),
      OperationName: S.optional(S.String),
      MetricType: S.optional(ServiceLevelIndicatorMetricType),
      TotalRequestCountMetric: MetricDataQueries,
      MonitoredRequestCountMetric: MonitoredRequestCountMetricDataQueries,
      DependencyConfig: S.optional(DependencyConfig),
      MetricSource: S.optional(MetricSource),
      CompositeSliConfig: S.optional(CompositeSliConfig),
    }),
).annotate({
  identifier: "RequestBasedServiceLevelIndicatorMetric",
}) as any as S.Schema<RequestBasedServiceLevelIndicatorMetric>;
export interface RequestBasedServiceLevelIndicator {
  RequestBasedSliMetric: RequestBasedServiceLevelIndicatorMetric;
  MetricThreshold?: number;
  ComparisonOperator?: ServiceLevelIndicatorComparisonOperator;
}
export const RequestBasedServiceLevelIndicator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RequestBasedSliMetric: RequestBasedServiceLevelIndicatorMetric,
    MetricThreshold: S.optional(S.Number),
    ComparisonOperator: S.optional(ServiceLevelIndicatorComparisonOperator),
  }),
).annotate({
  identifier: "RequestBasedServiceLevelIndicator",
}) as any as S.Schema<RequestBasedServiceLevelIndicator>;
export type DurationUnit = "MINUTE" | "HOUR" | "DAY" | "MONTH" | (string & {});
export const DurationUnit = /*@__PURE__*/ S.String;

export type RollingIntervalDuration = number;
export interface RollingInterval {
  DurationUnit: DurationUnit;
  Duration: number;
}
export const RollingInterval = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DurationUnit: DurationUnit, Duration: S.Number }),
).annotate({
  identifier: "RollingInterval",
}) as any as S.Schema<RollingInterval>;
export type CalendarIntervalDuration = number;
export interface CalendarInterval {
  StartTime: Date;
  DurationUnit: DurationUnit;
  Duration: number;
}
export const CalendarInterval = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    DurationUnit: DurationUnit,
    Duration: S.Number,
  }),
).annotate({
  identifier: "CalendarInterval",
}) as any as S.Schema<CalendarInterval>;
export type Interval =
  | { RollingInterval: RollingInterval; CalendarInterval?: never }
  | { RollingInterval?: never; CalendarInterval: CalendarInterval };
export const Interval = /*@__PURE__*/ S.Union([
  S.Struct({ RollingInterval: RollingInterval }),
  S.Struct({ CalendarInterval: CalendarInterval }),
]);
export type AttainmentGoal = number;
export type WarningThreshold = number;
export interface Goal {
  Interval?: Interval;
  AttainmentGoal?: number;
  WarningThreshold?: number;
}
export const Goal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Interval: S.optional(Interval),
    AttainmentGoal: S.optional(S.Number),
    WarningThreshold: S.optional(S.Number),
  }),
).annotate({ identifier: "Goal" }) as any as S.Schema<Goal>;
export interface ServiceLevelObjectiveBudgetReport {
  Arn: string;
  Name: string;
  EvaluationType?: EvaluationType;
  BudgetStatus: ServiceLevelObjectiveBudgetStatus;
  Attainment?: number;
  TotalBudgetSeconds?: number;
  BudgetSecondsRemaining?: number;
  TotalBudgetRequests?: number;
  BudgetRequestsRemaining?: number;
  Sli?: ServiceLevelIndicator;
  RequestBasedSli?: RequestBasedServiceLevelIndicator;
  Goal?: Goal;
}
export const ServiceLevelObjectiveBudgetReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    EvaluationType: S.optional(EvaluationType),
    BudgetStatus: ServiceLevelObjectiveBudgetStatus,
    Attainment: S.optional(S.Number),
    TotalBudgetSeconds: S.optional(S.Number),
    BudgetSecondsRemaining: S.optional(S.Number),
    TotalBudgetRequests: S.optional(S.Number),
    BudgetRequestsRemaining: S.optional(S.Number),
    Sli: S.optional(ServiceLevelIndicator),
    RequestBasedSli: S.optional(RequestBasedServiceLevelIndicator),
    Goal: S.optional(Goal),
  }),
).annotate({
  identifier: "ServiceLevelObjectiveBudgetReport",
}) as any as S.Schema<ServiceLevelObjectiveBudgetReport>;
export type ServiceLevelObjectiveBudgetReports =
  ServiceLevelObjectiveBudgetReport[];
export const ServiceLevelObjectiveBudgetReports = /*@__PURE__*/ S.Array(
  ServiceLevelObjectiveBudgetReport,
);
export type ServiceLevelObjectiveBudgetReportErrorCode = string;
export type ServiceLevelObjectiveBudgetReportErrorMessage = string;
export interface ServiceLevelObjectiveBudgetReportError {
  Name?: string;
  Arn: string;
  ErrorCode: string;
  ErrorMessage: string;
}
export const ServiceLevelObjectiveBudgetReportError = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Name: S.optional(S.String),
      Arn: S.String,
      ErrorCode: S.String,
      ErrorMessage: S.String,
    }),
).annotate({
  identifier: "ServiceLevelObjectiveBudgetReportError",
}) as any as S.Schema<ServiceLevelObjectiveBudgetReportError>;
export type ServiceLevelObjectiveBudgetReportErrors =
  ServiceLevelObjectiveBudgetReportError[];
export const ServiceLevelObjectiveBudgetReportErrors = /*@__PURE__*/ S.Array(
  ServiceLevelObjectiveBudgetReportError,
);
export interface BatchGetServiceLevelObjectiveBudgetReportOutput {
  Timestamp: Date;
  Reports: ServiceLevelObjectiveBudgetReport[];
  Errors: ServiceLevelObjectiveBudgetReportError[];
}
export const BatchGetServiceLevelObjectiveBudgetReportOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      Reports: ServiceLevelObjectiveBudgetReports,
      Errors: ServiceLevelObjectiveBudgetReportErrors,
    }),
  ).annotate({
    identifier: "BatchGetServiceLevelObjectiveBudgetReportOutput",
  }) as any as S.Schema<BatchGetServiceLevelObjectiveBudgetReportOutput>;
export type ExclusionDuration = number;
export interface Window {
  DurationUnit: DurationUnit;
  Duration: number;
}
export const Window = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DurationUnit: DurationUnit, Duration: S.Number }),
).annotate({ identifier: "Window" }) as any as S.Schema<Window>;
export type Expression = string;
export interface RecurrenceRule {
  Expression?: string;
}
export const RecurrenceRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Expression: S.optional(S.String) }),
).annotate({ identifier: "RecurrenceRule" }) as any as S.Schema<RecurrenceRule>;
export type ExclusionReason = string;
export interface ExclusionWindow {
  Window: Window;
  StartTime?: Date;
  RecurrenceRule?: RecurrenceRule;
  Reason?: string;
}
export const ExclusionWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Window: Window,
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RecurrenceRule: S.optional(RecurrenceRule),
    Reason: S.optional(S.String),
  }),
).annotate({
  identifier: "ExclusionWindow",
}) as any as S.Schema<ExclusionWindow>;
export type ExclusionWindows = ExclusionWindow[];
export const ExclusionWindows = /*@__PURE__*/ S.Array(ExclusionWindow);
export interface BatchUpdateExclusionWindowsInput {
  SloIds: string[];
  AddExclusionWindows?: ExclusionWindow[];
  RemoveExclusionWindows?: ExclusionWindow[];
}
export const BatchUpdateExclusionWindowsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SloIds: ServiceLevelObjectiveIds,
    AddExclusionWindows: S.optional(ExclusionWindows),
    RemoveExclusionWindows: S.optional(ExclusionWindows),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/exclusion-windows" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchUpdateExclusionWindowsInput",
}) as any as S.Schema<BatchUpdateExclusionWindowsInput>;
export type ServiceLevelObjectiveId = string;
export type ExclusionWindowErrorCode = string;
export type ExclusionWindowErrorMessage = string;
export interface BatchUpdateExclusionWindowsError_ {
  SloId: string;
  ErrorCode: string;
  ErrorMessage: string;
}
export const BatchUpdateExclusionWindowsError_ = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SloId: S.String, ErrorCode: S.String, ErrorMessage: S.String }),
).annotate({
  identifier: "BatchUpdateExclusionWindowsError",
}) as any as S.Schema<BatchUpdateExclusionWindowsError_>;
export type BatchUpdateExclusionWindowsErrors =
  BatchUpdateExclusionWindowsError_[];
export const BatchUpdateExclusionWindowsErrors = /*@__PURE__*/ S.Array(
  BatchUpdateExclusionWindowsError_,
);
export interface BatchUpdateExclusionWindowsOutput {
  SloIds: string[];
  Errors: BatchUpdateExclusionWindowsError_[];
}
export const BatchUpdateExclusionWindowsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SloIds: ServiceLevelObjectiveIds,
    Errors: BatchUpdateExclusionWindowsErrors,
  }),
).annotate({
  identifier: "BatchUpdateExclusionWindowsOutput",
}) as any as S.Schema<BatchUpdateExclusionWindowsOutput>;
export type DynamicInstrumentationSignalType = "SNAPSHOT" | (string & {});
export const DynamicInstrumentationSignalType = /*@__PURE__*/ S.String;

export type ProgrammingLanguage =
  | "Java"
  | "Python"
  | "Javascript"
  | (string & {});
export const ProgrammingLanguage = /*@__PURE__*/ S.String;

export interface CodeLocation {
  Language: ProgrammingLanguage;
  CodeUnit?: string;
  ClassName?: string;
  MethodName?: string;
  FilePath: string;
  LineNumber?: number;
}
export const CodeLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Language: ProgrammingLanguage,
    CodeUnit: S.optional(S.String),
    ClassName: S.optional(S.String),
    MethodName: S.optional(S.String),
    FilePath: S.String,
    LineNumber: S.optional(S.Number),
  }),
).annotate({ identifier: "CodeLocation" }) as any as S.Schema<CodeLocation>;
export type Location = { CodeLocation: CodeLocation };
export const Location = /*@__PURE__*/ S.Union([
  S.Struct({ CodeLocation: CodeLocation }),
]);
export type DynamicInstrumentationAttributeFilterGroup = {
  [key: string]: string | undefined;
};
export const DynamicInstrumentationAttributeFilterGroup =
  /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type DynamicInstrumentationAttributeFilters = {
  [key: string]: string | undefined;
}[];
export const DynamicInstrumentationAttributeFilters = /*@__PURE__*/ S.Array(
  DynamicInstrumentationAttributeFilterGroup,
);
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface CaptureLimitsConfig {
  MaxHits?: number;
  MaxStringLength?: number;
  MaxCollectionWidth?: number;
  MaxCollectionDepth?: number;
  MaxStackFrames?: number;
  MaxStackTraceSize?: number;
  MaxObjectDepth?: number;
  MaxFieldsPerObject?: number;
}
export const CaptureLimitsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxHits: S.optional(S.Number),
    MaxStringLength: S.optional(S.Number),
    MaxCollectionWidth: S.optional(S.Number),
    MaxCollectionDepth: S.optional(S.Number),
    MaxStackFrames: S.optional(S.Number),
    MaxStackTraceSize: S.optional(S.Number),
    MaxObjectDepth: S.optional(S.Number),
    MaxFieldsPerObject: S.optional(S.Number),
  }),
).annotate({
  identifier: "CaptureLimitsConfig",
}) as any as S.Schema<CaptureLimitsConfig>;
export interface CodeCaptureConfiguration {
  CaptureArguments?: string[];
  CaptureReturn?: boolean;
  CaptureStackTrace?: boolean;
  CaptureLocals?: string[];
  CaptureLimits: CaptureLimitsConfig;
}
export const CodeCaptureConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CaptureArguments: S.optional(StringList),
    CaptureReturn: S.optional(S.Boolean),
    CaptureStackTrace: S.optional(S.Boolean),
    CaptureLocals: S.optional(StringList),
    CaptureLimits: CaptureLimitsConfig,
  }),
).annotate({
  identifier: "CodeCaptureConfiguration",
}) as any as S.Schema<CodeCaptureConfiguration>;
export type CaptureConfiguration = { CodeCapture: CodeCaptureConfiguration };
export const CaptureConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({ CodeCapture: CodeCaptureConfiguration }),
]);
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
export interface CreateInstrumentationConfigurationRequest {
  InstrumentationType: InstrumentationType;
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  Location: Location;
  Description?: string;
  ExpiresAt?: Date;
  AttributeFilters?: { [key: string]: string | undefined }[];
  CaptureConfiguration: CaptureConfiguration;
  Tags?: Tag[];
}
export const CreateInstrumentationConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstrumentationType: InstrumentationType,
      Service: S.String,
      Environment: S.String,
      SignalType: DynamicInstrumentationSignalType,
      Location: Location,
      Description: S.optional(S.String),
      ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      AttributeFilters: S.optional(DynamicInstrumentationAttributeFilters),
      CaptureConfiguration: CaptureConfiguration,
      Tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/create-instrumentation-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateInstrumentationConfigurationRequest",
  }) as any as S.Schema<CreateInstrumentationConfigurationRequest>;
export type InstrumentationConfigurationArn = string;
export interface CreateInstrumentationConfigurationResponse {
  InstrumentationType: InstrumentationType;
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  Location: Location;
  LocationHash: string;
  Description?: string;
  ExpiresAt?: Date;
  AttributeFilters?: { [key: string]: string | undefined }[];
  CaptureConfiguration: CaptureConfiguration;
  CreatedAt: Date;
  ARN: string;
}
export const CreateInstrumentationConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstrumentationType: InstrumentationType,
      Service: S.String,
      Environment: S.String,
      SignalType: DynamicInstrumentationSignalType,
      Location: Location,
      LocationHash: S.String,
      Description: S.optional(S.String),
      ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      AttributeFilters: S.optional(DynamicInstrumentationAttributeFilters),
      CaptureConfiguration: CaptureConfiguration,
      CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ARN: S.String,
    }),
  ).annotate({
    identifier: "CreateInstrumentationConfigurationResponse",
  }) as any as S.Schema<CreateInstrumentationConfigurationResponse>;
export type ServiceLevelObjectiveDescription = string;
export type ServiceLevelIndicatorStatistic = string;
export type SLIPeriodSeconds = number;
export interface ServiceLevelIndicatorMetricConfig {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  MetricType?: ServiceLevelIndicatorMetricType;
  MetricName?: string;
  Statistic?: string;
  PeriodSeconds?: number;
  MetricSource?: MetricSource;
  MetricDataQueries?: MetricDataQuery[];
  DependencyConfig?: DependencyConfig;
  CompositeSliConfig?: CompositeSliConfig;
}
export const ServiceLevelIndicatorMetricConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyAttributes: S.optional(Attributes),
    OperationName: S.optional(S.String),
    MetricType: S.optional(ServiceLevelIndicatorMetricType),
    MetricName: S.optional(S.String),
    Statistic: S.optional(S.String),
    PeriodSeconds: S.optional(S.Number),
    MetricSource: S.optional(MetricSource),
    MetricDataQueries: S.optional(MetricDataQueries),
    DependencyConfig: S.optional(DependencyConfig),
    CompositeSliConfig: S.optional(CompositeSliConfig),
  }),
).annotate({
  identifier: "ServiceLevelIndicatorMetricConfig",
}) as any as S.Schema<ServiceLevelIndicatorMetricConfig>;
export interface ServiceLevelIndicatorConfig {
  SliMetricConfig: ServiceLevelIndicatorMetricConfig;
  MetricThreshold?: number;
  ComparisonOperator?: ServiceLevelIndicatorComparisonOperator;
}
export const ServiceLevelIndicatorConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SliMetricConfig: ServiceLevelIndicatorMetricConfig,
    MetricThreshold: S.optional(S.Number),
    ComparisonOperator: S.optional(ServiceLevelIndicatorComparisonOperator),
  }),
).annotate({
  identifier: "ServiceLevelIndicatorConfig",
}) as any as S.Schema<ServiceLevelIndicatorConfig>;
export interface RequestBasedServiceLevelIndicatorMetricConfig {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  MetricType?: ServiceLevelIndicatorMetricType;
  TotalRequestCountMetric?: MetricDataQuery[];
  MonitoredRequestCountMetric?: MonitoredRequestCountMetricDataQueries;
  DependencyConfig?: DependencyConfig;
  MetricSource?: MetricSource;
  MetricName?: string;
  CompositeSliConfig?: CompositeSliConfig;
}
export const RequestBasedServiceLevelIndicatorMetricConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      KeyAttributes: S.optional(Attributes),
      OperationName: S.optional(S.String),
      MetricType: S.optional(ServiceLevelIndicatorMetricType),
      TotalRequestCountMetric: S.optional(MetricDataQueries),
      MonitoredRequestCountMetric: S.optional(
        MonitoredRequestCountMetricDataQueries,
      ),
      DependencyConfig: S.optional(DependencyConfig),
      MetricSource: S.optional(MetricSource),
      MetricName: S.optional(S.String),
      CompositeSliConfig: S.optional(CompositeSliConfig),
    }),
  ).annotate({
    identifier: "RequestBasedServiceLevelIndicatorMetricConfig",
  }) as any as S.Schema<RequestBasedServiceLevelIndicatorMetricConfig>;
export interface RequestBasedServiceLevelIndicatorConfig {
  RequestBasedSliMetricConfig: RequestBasedServiceLevelIndicatorMetricConfig;
  MetricThreshold?: number;
  ComparisonOperator?: ServiceLevelIndicatorComparisonOperator;
}
export const RequestBasedServiceLevelIndicatorConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RequestBasedSliMetricConfig:
        RequestBasedServiceLevelIndicatorMetricConfig,
      MetricThreshold: S.optional(S.Number),
      ComparisonOperator: S.optional(ServiceLevelIndicatorComparisonOperator),
    }),
).annotate({
  identifier: "RequestBasedServiceLevelIndicatorConfig",
}) as any as S.Schema<RequestBasedServiceLevelIndicatorConfig>;
export type BurnRateLookBackWindowMinutes = number;
export interface BurnRateConfiguration {
  LookBackWindowMinutes: number;
}
export const BurnRateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LookBackWindowMinutes: S.Number }),
).annotate({
  identifier: "BurnRateConfiguration",
}) as any as S.Schema<BurnRateConfiguration>;
export type BurnRateConfigurations = BurnRateConfiguration[];
export const BurnRateConfigurations = /*@__PURE__*/ S.Array(
  BurnRateConfiguration,
);
export interface CreateServiceLevelObjectiveInput {
  Name: string;
  Description?: string;
  SliConfig?: ServiceLevelIndicatorConfig;
  RequestBasedSliConfig?: RequestBasedServiceLevelIndicatorConfig;
  Goal?: Goal;
  Tags?: Tag[];
  BurnRateConfigurations?: BurnRateConfiguration[];
  CreateRecommendedSlo?: boolean;
  AutoInvestigationEnabled?: boolean;
}
export const CreateServiceLevelObjectiveInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    SliConfig: S.optional(ServiceLevelIndicatorConfig),
    RequestBasedSliConfig: S.optional(RequestBasedServiceLevelIndicatorConfig),
    Goal: S.optional(Goal),
    Tags: S.optional(TagList),
    BurnRateConfigurations: S.optional(BurnRateConfigurations),
    CreateRecommendedSlo: S.optional(S.Boolean),
    AutoInvestigationEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/slo" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateServiceLevelObjectiveInput",
}) as any as S.Schema<CreateServiceLevelObjectiveInput>;
export type MetricSourceType =
  | "ServiceOperation"
  | "CloudWatchMetric"
  | "ServiceDependency"
  | "AppMonitor"
  | "Canary"
  | "Service"
  | (string & {});
export const MetricSourceType = /*@__PURE__*/ S.String;

export interface ServiceLevelObjective {
  Arn: string;
  Name: string;
  Description?: string;
  CreatedTime: Date;
  LastUpdatedTime: Date;
  Sli?: ServiceLevelIndicator;
  RequestBasedSli?: RequestBasedServiceLevelIndicator;
  EvaluationType?: EvaluationType;
  Goal: Goal;
  BurnRateConfigurations?: BurnRateConfiguration[];
  MetricSourceType?: MetricSourceType;
  AutoInvestigationEnabled?: boolean;
}
export const ServiceLevelObjective = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    Description: S.optional(S.String),
    CreatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LastUpdatedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Sli: S.optional(ServiceLevelIndicator),
    RequestBasedSli: S.optional(RequestBasedServiceLevelIndicator),
    EvaluationType: S.optional(EvaluationType),
    Goal: Goal,
    BurnRateConfigurations: S.optional(BurnRateConfigurations),
    MetricSourceType: S.optional(MetricSourceType),
    AutoInvestigationEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ServiceLevelObjective",
}) as any as S.Schema<ServiceLevelObjective>;
export interface CreateServiceLevelObjectiveOutput {
  Slo: ServiceLevelObjective;
}
export const CreateServiceLevelObjectiveOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Slo: ServiceLevelObjective }),
).annotate({
  identifier: "CreateServiceLevelObjectiveOutput",
}) as any as S.Schema<CreateServiceLevelObjectiveOutput>;
export interface DeleteGroupingConfigurationRequest {}
export const DeleteGroupingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/grouping-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGroupingConfigurationRequest",
}) as any as S.Schema<DeleteGroupingConfigurationRequest>;
export interface DeleteGroupingConfigurationOutput {}
export const DeleteGroupingConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGroupingConfigurationOutput",
}) as any as S.Schema<DeleteGroupingConfigurationOutput>;
export type LocationIdentifier =
  | { CodeLocation: CodeLocation; LocationHash?: never }
  | { CodeLocation?: never; LocationHash: string };
export const LocationIdentifier = /*@__PURE__*/ S.Union([
  S.Struct({ CodeLocation: CodeLocation }),
  S.Struct({ LocationHash: S.String }),
]);
export interface DeleteInstrumentationConfigurationRequest {
  InstrumentationType: InstrumentationType;
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  LocationIdentifier: LocationIdentifier;
}
export const DeleteInstrumentationConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstrumentationType: InstrumentationType,
      Service: S.String,
      Environment: S.String,
      SignalType: DynamicInstrumentationSignalType,
      LocationIdentifier: LocationIdentifier,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/delete-instrumentation-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteInstrumentationConfigurationRequest",
  }) as any as S.Schema<DeleteInstrumentationConfigurationRequest>;
export type DynamicInstrumentationDeletionStatus = "DELETED" | (string & {});
export const DynamicInstrumentationDeletionStatus = /*@__PURE__*/ S.String;

export interface DeleteInstrumentationConfigurationResponse {
  DeletionStatus: DynamicInstrumentationDeletionStatus;
}
export const DeleteInstrumentationConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ DeletionStatus: DynamicInstrumentationDeletionStatus }),
  ).annotate({
    identifier: "DeleteInstrumentationConfigurationResponse",
  }) as any as S.Schema<DeleteInstrumentationConfigurationResponse>;
export interface DeleteServiceLevelObjectiveInput {
  Id: string;
}
export const DeleteServiceLevelObjectiveInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/slo/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteServiceLevelObjectiveInput",
}) as any as S.Schema<DeleteServiceLevelObjectiveInput>;
export interface DeleteServiceLevelObjectiveOutput {}
export const DeleteServiceLevelObjectiveOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteServiceLevelObjectiveOutput",
}) as any as S.Schema<DeleteServiceLevelObjectiveOutput>;
export interface GetInstrumentationConfigurationRequest {
  InstrumentationType: InstrumentationType;
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  LocationIdentifier: LocationIdentifier;
}
export const GetInstrumentationConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      InstrumentationType: InstrumentationType,
      Service: S.String,
      Environment: S.String,
      SignalType: DynamicInstrumentationSignalType,
      LocationIdentifier: LocationIdentifier,
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/get-instrumentation-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetInstrumentationConfigurationRequest",
}) as any as S.Schema<GetInstrumentationConfigurationRequest>;
export interface InstrumentationConfiguration {
  InstrumentationType: InstrumentationType;
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  Location: Location;
  LocationHash: string;
  Description?: string;
  ExpiresAt?: Date;
  AttributeFilters?: { [key: string]: string | undefined }[];
  CaptureConfiguration: CaptureConfiguration;
  CreatedAt: Date;
  ARN: string;
}
export const InstrumentationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstrumentationType: InstrumentationType,
    Service: S.String,
    Environment: S.String,
    SignalType: DynamicInstrumentationSignalType,
    Location: Location,
    LocationHash: S.String,
    Description: S.optional(S.String),
    ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AttributeFilters: S.optional(DynamicInstrumentationAttributeFilters),
    CaptureConfiguration: CaptureConfiguration,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ARN: S.String,
  }),
).annotate({
  identifier: "InstrumentationConfiguration",
}) as any as S.Schema<InstrumentationConfiguration>;
export interface GetInstrumentationConfigurationResponse {
  Configuration: InstrumentationConfiguration;
}
export const GetInstrumentationConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Configuration: InstrumentationConfiguration }),
).annotate({
  identifier: "GetInstrumentationConfigurationResponse",
}) as any as S.Schema<GetInstrumentationConfigurationResponse>;
export type InstrumentationConfigurationStatus =
  | "READY"
  | "ERROR"
  | "ACTIVE"
  | "DISABLED"
  | (string & {});
export const InstrumentationConfigurationStatus = /*@__PURE__*/ S.String;

export type NextToken = string;
export interface GetInstrumentationConfigurationStatusRequest {
  InstrumentationType: InstrumentationType;
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  LocationIdentifier: LocationIdentifier;
  Status?: InstrumentationConfigurationStatus;
  StartTime?: Date;
  EndTime?: Date;
  MaxResults?: number;
  NextToken?: string;
}
export const GetInstrumentationConfigurationStatusRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstrumentationType: InstrumentationType,
      Service: S.String,
      Environment: S.String,
      SignalType: DynamicInstrumentationSignalType,
      LocationIdentifier: LocationIdentifier,
      Status: S.optional(InstrumentationConfigurationStatus),
      StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/get-instrumentation-configuration-status",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetInstrumentationConfigurationStatusRequest",
  }) as any as S.Schema<GetInstrumentationConfigurationStatusRequest>;
export type InstrumentationErrorCause =
  | "FILE_NOT_FOUND"
  | "METHOD_NOT_FOUND"
  | "LINE_NOT_EXECUTABLE"
  | "OVERLOADED_METHODS"
  | "LANGUAGE_MISMATCH"
  | "RUNTIME_ERROR"
  | (string & {});
export const InstrumentationErrorCause = /*@__PURE__*/ S.String;

export interface InstrumentationStatusEvent {
  Time: Date;
  ErrorCause?: InstrumentationErrorCause;
}
export const InstrumentationStatusEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Time: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ErrorCause: S.optional(InstrumentationErrorCause),
  }),
).annotate({
  identifier: "InstrumentationStatusEvent",
}) as any as S.Schema<InstrumentationStatusEvent>;
export type InstrumentationStatusEventList = InstrumentationStatusEvent[];
export const InstrumentationStatusEventList = /*@__PURE__*/ S.Array(
  InstrumentationStatusEvent,
);
export interface GetInstrumentationConfigurationStatusResponse {
  Service: string;
  Environment: string;
  SignalType: DynamicInstrumentationSignalType;
  Location: Location;
  Status: InstrumentationConfigurationStatus;
  Events: InstrumentationStatusEvent[];
  NextToken?: string;
}
export const GetInstrumentationConfigurationStatusResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Service: S.String,
      Environment: S.String,
      SignalType: DynamicInstrumentationSignalType,
      Location: Location,
      Status: InstrumentationConfigurationStatus,
      Events: InstrumentationStatusEventList,
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetInstrumentationConfigurationStatusResponse",
  }) as any as S.Schema<GetInstrumentationConfigurationStatusResponse>;
export interface GetServiceInput {
  StartTime: Date;
  EndTime: Date;
  KeyAttributes: { [key: string]: string | undefined };
}
export const GetServiceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartTime"),
    ),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndTime"),
    ),
    KeyAttributes: Attributes,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/service" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceInput",
}) as any as S.Schema<GetServiceInput>;
export type AttributeMap = { [key: string]: string | undefined };
export const AttributeMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type AttributeMaps = { [key: string]: string | undefined }[];
export const AttributeMaps = /*@__PURE__*/ S.Array(AttributeMap);
export type GroupName = string;
export type GroupValue = string;
export type GroupSource = string;
export type GroupIdentifier = string;
export interface ServiceGroup {
  GroupName: string;
  GroupValue: string;
  GroupSource: string;
  GroupIdentifier: string;
}
export const ServiceGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.String,
    GroupValue: S.String,
    GroupSource: S.String,
    GroupIdentifier: S.String,
  }),
).annotate({ identifier: "ServiceGroup" }) as any as S.Schema<ServiceGroup>;
export type ServiceGroups = ServiceGroup[];
export const ServiceGroups = /*@__PURE__*/ S.Array(ServiceGroup);
export type MetricType = string;
export type AwsAccountId = string;
export interface MetricReference {
  Namespace: string;
  MetricType: string;
  Dimensions?: Dimension[];
  MetricName: string;
  AccountId?: string;
}
export const MetricReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Namespace: S.String,
    MetricType: S.String,
    Dimensions: S.optional(Dimensions),
    MetricName: S.String,
    AccountId: S.optional(S.String),
  }),
).annotate({
  identifier: "MetricReference",
}) as any as S.Schema<MetricReference>;
export type MetricReferences = MetricReference[];
export const MetricReferences = /*@__PURE__*/ S.Array(MetricReference);
export type LogGroupReferences = { [key: string]: string | undefined }[];
export const LogGroupReferences = /*@__PURE__*/ S.Array(Attributes);
export interface Service {
  KeyAttributes?: { [key: string]: string | undefined };
  AttributeMaps?: { [key: string]: string | undefined }[];
  ServiceGroups?: ServiceGroup[];
  MetricReferences?: MetricReference[];
  LogGroupReferences?: { [key: string]: string | undefined }[];
}
export const Service = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyAttributes: S.optional(Attributes),
    AttributeMaps: S.optional(AttributeMaps),
    ServiceGroups: S.optional(ServiceGroups),
    MetricReferences: S.optional(MetricReferences),
    LogGroupReferences: S.optional(LogGroupReferences),
  }),
).annotate({ identifier: "Service" }) as any as S.Schema<Service>;
export interface GetServiceOutput {
  Service: Service;
  StartTime: Date;
  EndTime: Date;
  LogGroupReferences?: { [key: string]: string | undefined }[];
}
export const GetServiceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Service: Service,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    LogGroupReferences: S.optional(LogGroupReferences),
  }),
).annotate({
  identifier: "GetServiceOutput",
}) as any as S.Schema<GetServiceOutput>;
export interface GetServiceLevelObjectiveInput {
  Id: string;
}
export const GetServiceLevelObjectiveInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/slo/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceLevelObjectiveInput",
}) as any as S.Schema<GetServiceLevelObjectiveInput>;
export interface GetServiceLevelObjectiveOutput {
  Slo: ServiceLevelObjective;
}
export const GetServiceLevelObjectiveOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Slo: ServiceLevelObjective }),
).annotate({
  identifier: "GetServiceLevelObjectiveOutput",
}) as any as S.Schema<GetServiceLevelObjectiveOutput>;
export type Auditors = string[];
export const Auditors = /*@__PURE__*/ S.Array(S.String);
export interface ServiceEntity {
  Type?: string;
  Name?: string;
  Environment?: string;
  AwsAccountId?: string;
}
export const ServiceEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    Name: S.optional(S.String),
    Environment: S.optional(S.String),
    AwsAccountId: S.optional(S.String),
  }),
).annotate({ identifier: "ServiceEntity" }) as any as S.Schema<ServiceEntity>;
export interface ServiceLevelObjectiveEntity {
  SloName?: string;
  SloArn?: string;
}
export const ServiceLevelObjectiveEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SloName: S.optional(S.String), SloArn: S.optional(S.String) }),
).annotate({
  identifier: "ServiceLevelObjectiveEntity",
}) as any as S.Schema<ServiceLevelObjectiveEntity>;
export interface ServiceOperationEntity {
  Service?: ServiceEntity;
  Operation?: string;
  MetricType?: string;
}
export const ServiceOperationEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Service: S.optional(ServiceEntity),
    Operation: S.optional(S.String),
    MetricType: S.optional(S.String),
  }),
).annotate({
  identifier: "ServiceOperationEntity",
}) as any as S.Schema<ServiceOperationEntity>;
export interface CanaryEntity {
  CanaryName: string;
}
export const CanaryEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CanaryName: S.String }),
).annotate({ identifier: "CanaryEntity" }) as any as S.Schema<CanaryEntity>;
export type AuditTargetEntity =
  | {
      Service: ServiceEntity;
      Slo?: never;
      ServiceOperation?: never;
      Canary?: never;
    }
  | {
      Service?: never;
      Slo: ServiceLevelObjectiveEntity;
      ServiceOperation?: never;
      Canary?: never;
    }
  | {
      Service?: never;
      Slo?: never;
      ServiceOperation: ServiceOperationEntity;
      Canary?: never;
    }
  | {
      Service?: never;
      Slo?: never;
      ServiceOperation?: never;
      Canary: CanaryEntity;
    };
export const AuditTargetEntity = /*@__PURE__*/ S.Union([
  S.Struct({ Service: ServiceEntity }),
  S.Struct({ Slo: ServiceLevelObjectiveEntity }),
  S.Struct({ ServiceOperation: ServiceOperationEntity }),
  S.Struct({ Canary: CanaryEntity }),
]);
export interface AuditTarget {
  Type: string;
  Data: AuditTargetEntity;
}
export const AuditTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.String, Data: AuditTargetEntity }),
).annotate({ identifier: "AuditTarget" }) as any as S.Schema<AuditTarget>;
export type AuditTargets = AuditTarget[];
export const AuditTargets = /*@__PURE__*/ S.Array(AuditTarget);
export type DetailLevel = "BRIEF" | "DETAILED" | (string & {});
export const DetailLevel = /*@__PURE__*/ S.String;

export type ListAuditFindingMaxResults = number;
export interface ListAuditFindingsInput {
  StartTime: Date;
  EndTime: Date;
  Auditors?: string[];
  AuditTargets: AuditTarget[];
  DetailLevel?: DetailLevel;
  NextToken?: string;
  MaxResults?: number;
}
export const ListAuditFindingsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartTime"),
    ),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndTime"),
    ),
    Auditors: S.optional(Auditors),
    AuditTargets: AuditTargets,
    DetailLevel: S.optional(DetailLevel),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/auditFindings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAuditFindingsInput",
}) as any as S.Schema<ListAuditFindingsInput>;
export type DataMap = { [key: string]: string | undefined };
export const DataMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Severity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "NONE"
  | (string & {});
export const Severity = /*@__PURE__*/ S.String;

export interface AuditorResult {
  Auditor?: string;
  Description?: string;
  Data?: { [key: string]: string | undefined };
  Severity?: Severity;
}
export const AuditorResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Auditor: S.optional(S.String),
    Description: S.optional(S.String),
    Data: S.optional(DataMap),
    Severity: S.optional(Severity),
  }),
).annotate({ identifier: "AuditorResult" }) as any as S.Schema<AuditorResult>;
export type AuditorResults = AuditorResult[];
export const AuditorResults = /*@__PURE__*/ S.Array(AuditorResult);
export interface MetricGraph {
  MetricDataQueries?: MetricDataQuery[];
  StartTime?: Date;
  EndTime?: Date;
}
export const MetricGraph = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MetricDataQueries: S.optional(MetricDataQueries),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "MetricGraph" }) as any as S.Schema<MetricGraph>;
export interface Node {
  KeyAttributes: { [key: string]: string | undefined };
  Name: string;
  NodeId: string;
  Operation?: string;
  Type?: string;
  Duration?: number;
  Status?: string;
}
export const Node = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyAttributes: Attributes,
    Name: S.String,
    NodeId: S.String,
    Operation: S.optional(S.String),
    Type: S.optional(S.String),
    Duration: S.optional(S.Number),
    Status: S.optional(S.String),
  }),
).annotate({ identifier: "Node" }) as any as S.Schema<Node>;
export type Nodes = Node[];
export const Nodes = /*@__PURE__*/ S.Array(Node);
export type ConnectionType = "INDIRECT" | "DIRECT" | (string & {});
export const ConnectionType = /*@__PURE__*/ S.String;

export interface Edge {
  SourceNodeId?: string;
  DestinationNodeId?: string;
  Duration?: number;
  ConnectionType?: ConnectionType;
}
export const Edge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceNodeId: S.optional(S.String),
    DestinationNodeId: S.optional(S.String),
    Duration: S.optional(S.Number),
    ConnectionType: S.optional(ConnectionType),
  }),
).annotate({ identifier: "Edge" }) as any as S.Schema<Edge>;
export type Edges = Edge[];
export const Edges = /*@__PURE__*/ S.Array(Edge);
export interface DependencyGraph {
  Nodes?: Node[];
  Edges?: Edge[];
}
export const DependencyGraph = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Nodes: S.optional(Nodes), Edges: S.optional(Edges) }),
).annotate({
  identifier: "DependencyGraph",
}) as any as S.Schema<DependencyGraph>;
export interface AuditFinding {
  KeyAttributes: { [key: string]: string | undefined };
  AuditorResults?: AuditorResult[];
  Operation?: string;
  MetricGraph?: MetricGraph;
  DependencyGraph?: DependencyGraph;
  Type?: string;
}
export const AuditFinding = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyAttributes: Attributes,
    AuditorResults: S.optional(AuditorResults),
    Operation: S.optional(S.String),
    MetricGraph: S.optional(MetricGraph),
    DependencyGraph: S.optional(DependencyGraph),
    Type: S.optional(S.String),
  }),
).annotate({ identifier: "AuditFinding" }) as any as S.Schema<AuditFinding>;
export type AuditFindings = AuditFinding[];
export const AuditFindings = /*@__PURE__*/ S.Array(AuditFinding);
export interface ListAuditFindingsOutput {
  StartTime?: Date;
  EndTime?: Date;
  AuditFindings: AuditFinding[];
  NextToken?: string;
}
export const ListAuditFindingsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    AuditFindings: AuditFindings,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAuditFindingsOutput",
}) as any as S.Schema<ListAuditFindingsOutput>;
export type ListEntityEventsMaxResults = number;
export interface ListEntityEventsInput {
  Entity: { [key: string]: string | undefined };
  StartTime: Date;
  EndTime: Date;
  MaxResults?: number;
  NextToken?: string;
}
export const ListEntityEventsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Entity: Attributes,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEntityEventsInput",
}) as any as S.Schema<ListEntityEventsInput>;
export type ChangeEventType = "DEPLOYMENT" | "CONFIGURATION" | (string & {});
export const ChangeEventType = /*@__PURE__*/ S.String;

export interface ChangeEvent {
  Timestamp: Date;
  AccountId: string;
  Region: string;
  Entity: { [key: string]: string | undefined };
  ChangeEventType: ChangeEventType;
  EventId: string;
  UserName?: string;
  EventName?: string;
}
export const ChangeEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    AccountId: S.String,
    Region: S.String,
    Entity: Attributes,
    ChangeEventType: ChangeEventType,
    EventId: S.String,
    UserName: S.optional(S.String),
    EventName: S.optional(S.String),
  }),
).annotate({ identifier: "ChangeEvent" }) as any as S.Schema<ChangeEvent>;
export type ChangeEvents = ChangeEvent[];
export const ChangeEvents = /*@__PURE__*/ S.Array(ChangeEvent);
export interface ListEntityEventsOutput {
  StartTime: Date;
  EndTime: Date;
  ChangeEvents: ChangeEvent[];
  NextToken?: string;
}
export const ListEntityEventsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ChangeEvents: ChangeEvents,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEntityEventsOutput",
}) as any as S.Schema<ListEntityEventsOutput>;
export interface ListGroupingAttributeDefinitionsInput {
  NextToken?: string;
  AwsAccountId?: string;
  IncludeLinkedAccounts?: boolean;
}
export const ListGroupingAttributeDefinitionsInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      AwsAccountId: S.optional(S.String).pipe(T.HttpQuery("AwsAccountId")),
      IncludeLinkedAccounts: S.optional(S.Boolean).pipe(
        T.HttpQuery("IncludeLinkedAccounts"),
      ),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/grouping-attribute-definitions" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListGroupingAttributeDefinitionsInput",
}) as any as S.Schema<ListGroupingAttributeDefinitionsInput>;
export type GroupingString = string;
export type GroupingSourceKeyStringList = string[];
export const GroupingSourceKeyStringList = /*@__PURE__*/ S.Array(S.String);
export interface GroupingAttributeDefinition {
  GroupingName: string;
  GroupingSourceKeys?: string[];
  DefaultGroupingValue?: string;
}
export const GroupingAttributeDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupingName: S.String,
    GroupingSourceKeys: S.optional(GroupingSourceKeyStringList),
    DefaultGroupingValue: S.optional(S.String),
  }),
).annotate({
  identifier: "GroupingAttributeDefinition",
}) as any as S.Schema<GroupingAttributeDefinition>;
export type GroupingAttributeDefinitions = GroupingAttributeDefinition[];
export const GroupingAttributeDefinitions = /*@__PURE__*/ S.Array(
  GroupingAttributeDefinition,
);
export interface ListGroupingAttributeDefinitionsOutput {
  GroupingAttributeDefinitions: GroupingAttributeDefinition[];
  UpdatedAt?: Date;
  NextToken?: string;
}
export const ListGroupingAttributeDefinitionsOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      GroupingAttributeDefinitions: GroupingAttributeDefinitions,
      UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListGroupingAttributeDefinitionsOutput",
}) as any as S.Schema<ListGroupingAttributeDefinitionsOutput>;
export interface ListInstrumentationConfigurationsRequest {
  Service: string;
  Environment: string;
  InstrumentationType: InstrumentationType;
  SyncedAt?: Date;
  MaxResults?: number;
  NextToken?: string;
}
export const ListInstrumentationConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Service: S.String,
      Environment: S.String,
      InstrumentationType: InstrumentationType,
      SyncedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/list-instrumentation-configurations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListInstrumentationConfigurationsRequest",
}) as any as S.Schema<ListInstrumentationConfigurationsRequest>;
export interface InstrumentationConfigurationWithoutServiceEnv {
  InstrumentationType: InstrumentationType;
  SignalType: DynamicInstrumentationSignalType;
  Location: Location;
  LocationHash: string;
  Description?: string;
  ExpiresAt?: Date;
  AttributeFilters?: { [key: string]: string | undefined }[];
  CaptureConfiguration: CaptureConfiguration;
  CreatedAt: Date;
  ARN: string;
}
export const InstrumentationConfigurationWithoutServiceEnv =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      InstrumentationType: InstrumentationType,
      SignalType: DynamicInstrumentationSignalType,
      Location: Location,
      LocationHash: S.String,
      Description: S.optional(S.String),
      ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      AttributeFilters: S.optional(DynamicInstrumentationAttributeFilters),
      CaptureConfiguration: CaptureConfiguration,
      CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ARN: S.String,
    }),
  ).annotate({
    identifier: "InstrumentationConfigurationWithoutServiceEnv",
  }) as any as S.Schema<InstrumentationConfigurationWithoutServiceEnv>;
export type InstrumentationConfigurationsWithoutServiceEnv =
  InstrumentationConfigurationWithoutServiceEnv[];
export const InstrumentationConfigurationsWithoutServiceEnv =
  /*@__PURE__*/ S.Array(InstrumentationConfigurationWithoutServiceEnv);
export interface InstrumentationConfigurationsPage {
  Service: string;
  Environment: string;
  Changed: boolean;
  LatestConfigurations?: InstrumentationConfigurationWithoutServiceEnv[];
  SyncedAt: Date;
  SyncInterval: number;
  NextToken?: string;
}
export const InstrumentationConfigurationsPage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Service: S.String,
    Environment: S.String,
    Changed: S.Boolean,
    LatestConfigurations: S.optional(
      InstrumentationConfigurationsWithoutServiceEnv,
    ),
    SyncedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    SyncInterval: S.Number,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "InstrumentationConfigurationsPage",
}) as any as S.Schema<InstrumentationConfigurationsPage>;
export type ListServiceDependenciesMaxResults = number;
export interface ListServiceDependenciesInput {
  StartTime: Date;
  EndTime: Date;
  KeyAttributes: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export const ListServiceDependenciesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartTime"),
    ),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndTime"),
    ),
    KeyAttributes: Attributes,
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/service-dependencies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceDependenciesInput",
}) as any as S.Schema<ListServiceDependenciesInput>;
export interface ServiceDependency {
  OperationName: string;
  DependencyKeyAttributes: { [key: string]: string | undefined };
  DependencyOperationName: string;
  MetricReferences: MetricReference[];
}
export const ServiceDependency = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperationName: S.String,
    DependencyKeyAttributes: Attributes,
    DependencyOperationName: S.String,
    MetricReferences: MetricReferences,
  }),
).annotate({
  identifier: "ServiceDependency",
}) as any as S.Schema<ServiceDependency>;
export type ServiceDependencies = ServiceDependency[];
export const ServiceDependencies = /*@__PURE__*/ S.Array(ServiceDependency);
export interface ListServiceDependenciesOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceDependencies: ServiceDependency[];
  NextToken?: string;
}
export const ListServiceDependenciesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ServiceDependencies: ServiceDependencies,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceDependenciesOutput",
}) as any as S.Schema<ListServiceDependenciesOutput>;
export type ListServiceDependentsMaxResults = number;
export interface ListServiceDependentsInput {
  StartTime: Date;
  EndTime: Date;
  KeyAttributes: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export const ListServiceDependentsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartTime"),
    ),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndTime"),
    ),
    KeyAttributes: Attributes,
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/service-dependents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceDependentsInput",
}) as any as S.Schema<ListServiceDependentsInput>;
export interface ServiceDependent {
  OperationName?: string;
  DependentKeyAttributes: { [key: string]: string | undefined };
  DependentOperationName?: string;
  MetricReferences: MetricReference[];
}
export const ServiceDependent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OperationName: S.optional(S.String),
    DependentKeyAttributes: Attributes,
    DependentOperationName: S.optional(S.String),
    MetricReferences: MetricReferences,
  }),
).annotate({
  identifier: "ServiceDependent",
}) as any as S.Schema<ServiceDependent>;
export type ServiceDependents = ServiceDependent[];
export const ServiceDependents = /*@__PURE__*/ S.Array(ServiceDependent);
export interface ListServiceDependentsOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceDependents: ServiceDependent[];
  NextToken?: string;
}
export const ListServiceDependentsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ServiceDependents: ServiceDependents,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceDependentsOutput",
}) as any as S.Schema<ListServiceDependentsOutput>;
export type ListServiceLevelObjectiveExclusionWindowsMaxResults = number;
export interface ListServiceLevelObjectiveExclusionWindowsInput {
  Id: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListServiceLevelObjectiveExclusionWindowsInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Id: S.String.pipe(T.HttpLabel("Id")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/slo/{Id}/exclusion-windows" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListServiceLevelObjectiveExclusionWindowsInput",
  }) as any as S.Schema<ListServiceLevelObjectiveExclusionWindowsInput>;
export interface ListServiceLevelObjectiveExclusionWindowsOutput {
  ExclusionWindows: ExclusionWindow[];
  NextToken?: string;
}
export const ListServiceLevelObjectiveExclusionWindowsOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ExclusionWindows: ExclusionWindows,
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListServiceLevelObjectiveExclusionWindowsOutput",
  }) as any as S.Schema<ListServiceLevelObjectiveExclusionWindowsOutput>;
export type ListServiceLevelObjectivesMaxResults = number;
export type MetricSourceTypes = MetricSourceType[];
export const MetricSourceTypes = /*@__PURE__*/ S.Array(MetricSourceType);
export interface ListServiceLevelObjectivesInput {
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  DependencyConfig?: DependencyConfig;
  MaxResults?: number;
  NextToken?: string;
  MetricSourceTypes?: MetricSourceType[];
  IncludeLinkedAccounts?: boolean;
  SloOwnerAwsAccountId?: string;
  MetricSource?: MetricSource;
}
export const ListServiceLevelObjectivesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyAttributes: S.optional(Attributes),
    OperationName: S.optional(S.String).pipe(T.HttpQuery("OperationName")),
    DependencyConfig: S.optional(DependencyConfig),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MetricSourceTypes: S.optional(MetricSourceTypes),
    IncludeLinkedAccounts: S.optional(S.Boolean).pipe(
      T.HttpQuery("IncludeLinkedAccounts"),
    ),
    SloOwnerAwsAccountId: S.optional(S.String).pipe(
      T.HttpQuery("SloOwnerAwsAccountId"),
    ),
    MetricSource: S.optional(MetricSource),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/slos" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceLevelObjectivesInput",
}) as any as S.Schema<ListServiceLevelObjectivesInput>;
export interface ServiceLevelObjectiveSummary {
  Arn: string;
  Name: string;
  KeyAttributes?: { [key: string]: string | undefined };
  OperationName?: string;
  DependencyConfig?: DependencyConfig;
  CreatedTime?: Date;
  EvaluationType?: EvaluationType;
  MetricSourceType?: MetricSourceType;
  MetricSource?: MetricSource;
  CompositeSliConfig?: CompositeSliConfig;
}
export const ServiceLevelObjectiveSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Name: S.String,
    KeyAttributes: S.optional(Attributes),
    OperationName: S.optional(S.String),
    DependencyConfig: S.optional(DependencyConfig),
    CreatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EvaluationType: S.optional(EvaluationType),
    MetricSourceType: S.optional(MetricSourceType),
    MetricSource: S.optional(MetricSource),
    CompositeSliConfig: S.optional(CompositeSliConfig),
  }),
).annotate({
  identifier: "ServiceLevelObjectiveSummary",
}) as any as S.Schema<ServiceLevelObjectiveSummary>;
export type ServiceLevelObjectiveSummaries = ServiceLevelObjectiveSummary[];
export const ServiceLevelObjectiveSummaries = /*@__PURE__*/ S.Array(
  ServiceLevelObjectiveSummary,
);
export interface ListServiceLevelObjectivesOutput {
  SloSummaries?: ServiceLevelObjectiveSummary[];
  NextToken?: string;
}
export const ListServiceLevelObjectivesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SloSummaries: S.optional(ServiceLevelObjectiveSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceLevelObjectivesOutput",
}) as any as S.Schema<ListServiceLevelObjectivesOutput>;
export type ListServiceOperationMaxResults = number;
export interface ListServiceOperationsInput {
  StartTime: Date;
  EndTime: Date;
  KeyAttributes: { [key: string]: string | undefined };
  MaxResults?: number;
  NextToken?: string;
}
export const ListServiceOperationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartTime"),
    ),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndTime"),
    ),
    KeyAttributes: Attributes,
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/service-operations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceOperationsInput",
}) as any as S.Schema<ListServiceOperationsInput>;
export interface ServiceOperation {
  Name: string;
  MetricReferences: MetricReference[];
}
export const ServiceOperation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, MetricReferences: MetricReferences }),
).annotate({
  identifier: "ServiceOperation",
}) as any as S.Schema<ServiceOperation>;
export type ServiceOperations = ServiceOperation[];
export const ServiceOperations = /*@__PURE__*/ S.Array(ServiceOperation);
export interface ListServiceOperationsOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceOperations: ServiceOperation[];
  NextToken?: string;
}
export const ListServiceOperationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ServiceOperations: ServiceOperations,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceOperationsOutput",
}) as any as S.Schema<ListServiceOperationsOutput>;
export type ListServicesMaxResults = number;
export interface ListServicesInput {
  StartTime: Date;
  EndTime: Date;
  MaxResults?: number;
  NextToken?: string;
  IncludeLinkedAccounts?: boolean;
  AwsAccountId?: string;
}
export const ListServicesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartTime"),
    ),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndTime"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    IncludeLinkedAccounts: S.optional(S.Boolean).pipe(
      T.HttpQuery("IncludeLinkedAccounts"),
    ),
    AwsAccountId: S.optional(S.String).pipe(T.HttpQuery("AwsAccountId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/services" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServicesInput",
}) as any as S.Schema<ListServicesInput>;
export interface ServiceSummary {
  KeyAttributes: { [key: string]: string | undefined };
  AttributeMaps?: { [key: string]: string | undefined }[];
  MetricReferences: MetricReference[];
  ServiceGroups?: ServiceGroup[];
}
export const ServiceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyAttributes: Attributes,
    AttributeMaps: S.optional(AttributeMaps),
    MetricReferences: MetricReferences,
    ServiceGroups: S.optional(ServiceGroups),
  }),
).annotate({ identifier: "ServiceSummary" }) as any as S.Schema<ServiceSummary>;
export type ServiceSummaries = ServiceSummary[];
export const ServiceSummaries = /*@__PURE__*/ S.Array(ServiceSummary);
export interface ListServicesOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceSummaries: ServiceSummary[];
  NextToken?: string;
}
export const ListServicesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ServiceSummaries: ServiceSummaries,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServicesOutput",
}) as any as S.Schema<ListServicesOutput>;
export type ListServiceStatesMaxResults = number;
export type AttributeFilterName = string;
export type AttributeFilterValue = string;
export type AttributeFilterValues = string[];
export const AttributeFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface AttributeFilter {
  AttributeFilterName: string;
  AttributeFilterValues: string[];
}
export const AttributeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeFilterName: S.String,
    AttributeFilterValues: AttributeFilterValues,
  }),
).annotate({
  identifier: "AttributeFilter",
}) as any as S.Schema<AttributeFilter>;
export type AttributeFilters = AttributeFilter[];
export const AttributeFilters = /*@__PURE__*/ S.Array(AttributeFilter);
export interface ListServiceStatesInput {
  StartTime: Date;
  EndTime: Date;
  MaxResults?: number;
  NextToken?: string;
  IncludeLinkedAccounts?: boolean;
  AwsAccountId?: string;
  AttributeFilters?: AttributeFilter[];
}
export const ListServiceStatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    IncludeLinkedAccounts: S.optional(S.Boolean),
    AwsAccountId: S.optional(S.String),
    AttributeFilters: S.optional(AttributeFilters),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/service/states" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListServiceStatesInput",
}) as any as S.Schema<ListServiceStatesInput>;
export type LatestChangeEvents = ChangeEvent[];
export const LatestChangeEvents = /*@__PURE__*/ S.Array(ChangeEvent);
export interface ServiceState {
  AttributeFilters?: AttributeFilter[];
  Service: { [key: string]: string | undefined };
  LatestChangeEvents: ChangeEvent[];
}
export const ServiceState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeFilters: S.optional(AttributeFilters),
    Service: Attributes,
    LatestChangeEvents: LatestChangeEvents,
  }),
).annotate({ identifier: "ServiceState" }) as any as S.Schema<ServiceState>;
export type ServiceStates = ServiceState[];
export const ServiceStates = /*@__PURE__*/ S.Array(ServiceState);
export interface ListServiceStatesOutput {
  StartTime: Date;
  EndTime: Date;
  ServiceStates: ServiceState[];
  NextToken?: string;
}
export const ListServiceStatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ServiceStates: ServiceStates,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListServiceStatesOutput",
}) as any as S.Schema<ListServiceStatesOutput>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpQuery("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags" }),
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
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutGroupingConfigurationInput {
  GroupingAttributeDefinitions: GroupingAttributeDefinition[];
}
export const PutGroupingConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupingAttributeDefinitions: GroupingAttributeDefinitions }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/grouping-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutGroupingConfigurationInput",
}) as any as S.Schema<PutGroupingConfigurationInput>;
export interface GroupingConfiguration {
  GroupingAttributeDefinitions: GroupingAttributeDefinition[];
  UpdatedAt: Date;
}
export const GroupingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupingAttributeDefinitions: GroupingAttributeDefinitions,
    UpdatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GroupingConfiguration",
}) as any as S.Schema<GroupingConfiguration>;
export interface PutGroupingConfigurationOutput {
  GroupingConfiguration: GroupingConfiguration;
}
export const PutGroupingConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupingConfiguration: GroupingConfiguration }),
).annotate({
  identifier: "PutGroupingConfigurationOutput",
}) as any as S.Schema<PutGroupingConfigurationOutput>;
export interface InstrumentationConfigurationStatusReport {
  InstrumentationType: InstrumentationType;
  SignalType: DynamicInstrumentationSignalType;
  LocationHash: string;
  Status: InstrumentationConfigurationStatus;
  Time: Date;
  ErrorCause?: InstrumentationErrorCause;
}
export const InstrumentationConfigurationStatusReport = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      InstrumentationType: InstrumentationType,
      SignalType: DynamicInstrumentationSignalType,
      LocationHash: S.String,
      Status: InstrumentationConfigurationStatus,
      Time: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ErrorCause: S.optional(InstrumentationErrorCause),
    }),
).annotate({
  identifier: "InstrumentationConfigurationStatusReport",
}) as any as S.Schema<InstrumentationConfigurationStatusReport>;
export type InstrumentationConfigurationStatusList =
  InstrumentationConfigurationStatusReport[];
export const InstrumentationConfigurationStatusList = /*@__PURE__*/ S.Array(
  InstrumentationConfigurationStatusReport,
);
export interface ReportInstrumentationConfigurationStatusRequest {
  Service: string;
  Environment: string;
  Configurations: InstrumentationConfigurationStatusReport[];
}
export const ReportInstrumentationConfigurationStatusRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Service: S.String,
      Environment: S.String,
      Configurations: InstrumentationConfigurationStatusList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/report-instrumentation-configuration-status",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ReportInstrumentationConfigurationStatusRequest",
  }) as any as S.Schema<ReportInstrumentationConfigurationStatusRequest>;
export type UnprocessedStatusEventFailureReason =
  | "THROTTLED"
  | "INTERNAL_ERROR"
  | "VALIDATION_ERROR"
  | (string & {});
export const UnprocessedStatusEventFailureReason = /*@__PURE__*/ S.String;

export interface UnprocessedStatusEvent {
  InstrumentationType: InstrumentationType;
  SignalType: DynamicInstrumentationSignalType;
  LocationHash: string;
  Status: InstrumentationConfigurationStatus;
  Time: Date;
  FailedReason: UnprocessedStatusEventFailureReason;
}
export const UnprocessedStatusEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstrumentationType: InstrumentationType,
    SignalType: DynamicInstrumentationSignalType,
    LocationHash: S.String,
    Status: InstrumentationConfigurationStatus,
    Time: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    FailedReason: UnprocessedStatusEventFailureReason,
  }),
).annotate({
  identifier: "UnprocessedStatusEvent",
}) as any as S.Schema<UnprocessedStatusEvent>;
export type UnprocessedStatusEventList = UnprocessedStatusEvent[];
export const UnprocessedStatusEventList = /*@__PURE__*/ S.Array(
  UnprocessedStatusEvent,
);
export interface ReportInstrumentationConfigurationStatusResponse {
  Service: string;
  Environment: string;
  UnprocessedStatusEvents: UnprocessedStatusEvent[];
}
export const ReportInstrumentationConfigurationStatusResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Service: S.String,
      Environment: S.String,
      UnprocessedStatusEvents: UnprocessedStatusEventList,
    }),
  ).annotate({
    identifier: "ReportInstrumentationConfigurationStatusResponse",
  }) as any as S.Schema<ReportInstrumentationConfigurationStatusResponse>;
export interface StartDiscoveryInput {}
export const StartDiscoveryInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/start-discovery" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDiscoveryInput",
}) as any as S.Schema<StartDiscoveryInput>;
export interface StartDiscoveryOutput {}
export const StartDiscoveryOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartDiscoveryOutput",
}) as any as S.Schema<StartDiscoveryOutput>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tag-resource" }),
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
  S.Struct({}),
).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/untag-resource" }),
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
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateServiceLevelObjectiveInput {
  Id: string;
  Description?: string;
  SliConfig?: ServiceLevelIndicatorConfig;
  RequestBasedSliConfig?: RequestBasedServiceLevelIndicatorConfig;
  Goal?: Goal;
  BurnRateConfigurations?: BurnRateConfiguration[];
  AutoInvestigationEnabled?: boolean;
}
export const UpdateServiceLevelObjectiveInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.String.pipe(T.HttpLabel("Id")),
    Description: S.optional(S.String),
    SliConfig: S.optional(ServiceLevelIndicatorConfig),
    RequestBasedSliConfig: S.optional(RequestBasedServiceLevelIndicatorConfig),
    Goal: S.optional(Goal),
    BurnRateConfigurations: S.optional(BurnRateConfigurations),
    AutoInvestigationEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/slo/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateServiceLevelObjectiveInput",
}) as any as S.Schema<UpdateServiceLevelObjectiveInput>;
export interface UpdateServiceLevelObjectiveOutput {
  Slo: ServiceLevelObjective;
}
export const UpdateServiceLevelObjectiveOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Slo: ServiceLevelObjective }),
).annotate({
  identifier: "UpdateServiceLevelObjectiveOutput",
}) as any as S.Schema<UpdateServiceLevelObjectiveOutput>;
export type ValidationExceptionMessage = string;
export type ResourceType = string;
export type ResourceId = string;
export type FaultDescription = string;
export type ServiceErrorMessage = string;
export type BatchDeleteInstrumentationConfigurationsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes multiple instrumentation configurations in a single request.
 * Supports two mutually exclusive selection methods:
 * - By scope: Delete all configurations matching a Service + Environment + InstrumentationType
 * - By ARN list: Delete specific configurations by providing a list of resource ARNs
 */
export const batchDeleteInstrumentationConfigurations: API.OperationMethod<
  BatchDeleteInstrumentationConfigurationsRequest,
  BatchDeleteInstrumentationConfigurationsResponse,
  BatchDeleteInstrumentationConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteInstrumentationConfigurationsRequest,
  output: BatchDeleteInstrumentationConfigurationsResponse,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteInstrumentationConfigurations",
}));

export type BatchGetServiceLevelObjectiveBudgetReportError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to retrieve one or more *service level objective (SLO) budget reports*.
 *
 * An *error budget* is the amount of time or requests in an unhealthy state that your service can accumulate during an interval before your overall SLO budget health is breached and the SLO is considered to be unmet. For example, an SLO with a threshold of 99.95% and a monthly interval translates to an error budget of 21.9 minutes of downtime in a 30-day month.
 *
 * Budget reports include a health indicator, the attainment value, and remaining budget.
 *
 * For more information about SLO error budgets, see SLO concepts.
 */
export const batchGetServiceLevelObjectiveBudgetReport: API.OperationMethod<
  BatchGetServiceLevelObjectiveBudgetReportInput,
  BatchGetServiceLevelObjectiveBudgetReportOutput,
  BatchGetServiceLevelObjectiveBudgetReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchGetServiceLevelObjectiveBudgetReportInput,
  output: BatchGetServiceLevelObjectiveBudgetReportOutput,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetServiceLevelObjectiveBudgetReport",
}));

export type BatchUpdateExclusionWindowsError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add or remove time window exclusions for one or more Service Level Objectives (SLOs).
 */
export const batchUpdateExclusionWindows: API.OperationMethod<
  BatchUpdateExclusionWindowsInput,
  BatchUpdateExclusionWindowsOutput,
  BatchUpdateExclusionWindowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateExclusionWindowsInput,
  output: BatchUpdateExclusionWindowsOutput,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateExclusionWindows",
}));

export type CreateInstrumentationConfigurationError =
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a dynamic instrumentation configuration for a specific code or endpoint location within a service and environment. Configurations are immutable after creation.
 *
 * For `BREAKPOINT` type configurations, they expire after 24 hours unless a shorter expiration is provided. For `PROBE` type configurations, they persist until explicitly deleted; an expiration cannot be set for `PROBE` configurations.
 *
 * If a configuration already exists for the same service, environment, signal type, and location, this operation returns a conflict instead of overwriting it. Use attribute filters and capture settings to control where the instrumentation runs and which data is collected.
 */
export const createInstrumentationConfiguration: API.OperationMethod<
  CreateInstrumentationConfigurationRequest,
  CreateInstrumentationConfigurationResponse,
  CreateInstrumentationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInstrumentationConfigurationRequest,
  output: CreateInstrumentationConfigurationResponse,
  errors: [
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInstrumentationConfiguration",
}));

export type CreateServiceLevelObjectiveError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service level objective (SLO), which can help you ensure that your critical business operations are meeting customer expectations. Use SLOs to set and track specific target levels for the reliability and availability of your applications and services. SLOs use service level indicators (SLIs) to calculate whether the application is performing at the level that you want.
 *
 * Create an SLO to set a target for a service or operation’s availability or latency. CloudWatch measures this target frequently you can find whether it has been breached.
 *
 * The target performance quality that is defined for an SLO is the *attainment goal*.
 *
 * You can set SLO targets for your applications that are discovered by Application Signals, using critical metrics such as latency and availability. You can also set SLOs against any CloudWatch metric or math expression that produces a time series.
 *
 * You can't create an SLO for a service operation that was discovered by Application Signals until after that operation has reported standard metrics to Application Signals.
 *
 * When you create an SLO, you specify whether it is a *period-based SLO* or a *request-based SLO*. Each type of SLO has a different way of evaluating your application's performance against its attainment goal.
 *
 * - A *period-based SLO* uses defined *periods* of time within a specified total time interval. For each period of time, Application Signals determines whether the application met its goal. The attainment rate is calculated as the `number of good periods/number of total periods`.
 *
 * For example, for a period-based SLO, meeting an attainment goal of 99.9% means that within your interval, your application must meet its performance goal during at least 99.9% of the time periods.
 *
 * - A *request-based SLO* doesn't use pre-defined periods of time. Instead, the SLO measures `number of good requests/number of total requests` during the interval. At any time, you can find the ratio of good requests to total requests for the interval up to the time stamp that you specify, and measure that ratio against the goal set in your SLO.
 *
 * After you have created an SLO, you can retrieve error budget reports for it. An *error budget* is the amount of time or amount of requests that your application can be non-compliant with the SLO's goal, and still have your application meet the goal.
 *
 * - For a period-based SLO, the error budget starts at a number defined by the highest number of periods that can fail to meet the threshold, while still meeting the overall goal. The *remaining error budget* decreases with every failed period that is recorded. The error budget within one interval can never increase.
 *
 * For example, an SLO with a threshold that 99.95% of requests must be completed under 2000ms every month translates to an error budget of 21.9 minutes of downtime per month.
 *
 * - For a request-based SLO, the remaining error budget is dynamic and can increase or decrease, depending on the ratio of good requests to total requests.
 *
 * For more information about SLOs, see Service level objectives (SLOs).
 *
 * When you perform a `CreateServiceLevelObjective` operation, Application Signals creates the *AWSServiceRoleForCloudWatchApplicationSignals* service-linked role, if it doesn't already exist in your account. This service- linked role has the following permissions:
 *
 * - `xray:GetServiceGraph`
 *
 * - `logs:StartQuery`
 *
 * - `logs:GetQueryResults`
 *
 * - `cloudwatch:GetMetricData`
 *
 * - `cloudwatch:ListMetrics`
 *
 * - `tag:GetResources`
 *
 * - `autoscaling:DescribeAutoScalingGroups`
 */
export const createServiceLevelObjective: API.OperationMethod<
  CreateServiceLevelObjectiveInput,
  CreateServiceLevelObjectiveOutput,
  CreateServiceLevelObjectiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateServiceLevelObjectiveInput,
  output: CreateServiceLevelObjectiveOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceLevelObjective",
}));

export type DeleteGroupingConfigurationError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the grouping configuration for this account. This removes all custom grouping attribute definitions that were previously configured.
 */
export const deleteGroupingConfiguration: API.OperationMethod<
  DeleteGroupingConfigurationRequest,
  DeleteGroupingConfigurationOutput,
  DeleteGroupingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGroupingConfigurationRequest,
  output: DeleteGroupingConfigurationOutput,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroupingConfiguration",
}));

export type DeleteInstrumentationConfigurationError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified instrumentation configuration. SDKs remove the instrumentation during their next sync after the configuration is deleted or expires.
 */
export const deleteInstrumentationConfiguration: API.OperationMethod<
  DeleteInstrumentationConfigurationRequest,
  DeleteInstrumentationConfigurationResponse,
  DeleteInstrumentationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInstrumentationConfigurationRequest,
  output: DeleteInstrumentationConfigurationResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstrumentationConfiguration",
}));

export type DeleteServiceLevelObjectiveError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified service level objective.
 */
export const deleteServiceLevelObjective: API.OperationMethod<
  DeleteServiceLevelObjectiveInput,
  DeleteServiceLevelObjectiveOutput,
  DeleteServiceLevelObjectiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteServiceLevelObjectiveInput,
  output: DeleteServiceLevelObjectiveOutput,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceLevelObjective",
}));

export type GetInstrumentationConfigurationError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details of a single instrumentation configuration identified by service, environment, signal type, and location. Use this to audit or display configuration details.
 */
export const getInstrumentationConfiguration: API.OperationMethod<
  GetInstrumentationConfigurationRequest,
  GetInstrumentationConfigurationResponse,
  GetInstrumentationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstrumentationConfigurationRequest,
  output: GetInstrumentationConfigurationResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstrumentationConfiguration",
}));

export type GetInstrumentationConfigurationStatusError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status history for a single instrumentation configuration during a specified time range. The response lists when the configuration was ACTIVE, READY, ERROR, or DISABLED.
 *
 * If no status or time window is provided, the operation defaults to ACTIVE events from the last hour.
 */
export const getInstrumentationConfigurationStatus: API.PaginatedOperationMethod<
  GetInstrumentationConfigurationStatusRequest,
  GetInstrumentationConfigurationStatusResponse,
  GetInstrumentationConfigurationStatusError,
  Credentials | HttpClient.HttpClient,
  InstrumentationStatusEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetInstrumentationConfigurationStatusRequest,
  output: GetInstrumentationConfigurationStatusResponse,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstrumentationConfigurationStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Events",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetServiceError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a service discovered by Application Signals.
 */
export const getService: API.OperationMethod<
  GetServiceInput,
  GetServiceOutput,
  GetServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceInput,
  output: GetServiceOutput,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
}));

export type GetServiceLevelObjectiveError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about one SLO created in the account.
 */
export const getServiceLevelObjective: API.OperationMethod<
  GetServiceLevelObjectiveInput,
  GetServiceLevelObjectiveOutput,
  GetServiceLevelObjectiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetServiceLevelObjectiveInput,
  output: GetServiceLevelObjectiveOutput,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceLevelObjective",
}));

export type ListAuditFindingsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of audit findings that provide automated analysis of service behavior and root cause analysis. These findings help identify the most significant observations about your services, including performance issues, anomalies, and potential problems. The findings are generated using heuristic algorithms based on established troubleshooting patterns.
 */
export const listAuditFindings: API.OperationMethod<
  ListAuditFindingsInput,
  ListAuditFindingsOutput,
  ListAuditFindingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListAuditFindingsInput,
  output: ListAuditFindingsOutput,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAuditFindings",
}));

export type ListEntityEventsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of change events for a specific entity, such as deployments, configuration changes, or other state-changing activities. This operation helps track the history of changes that may have affected service performance.
 */
export const listEntityEvents: API.PaginatedOperationMethod<
  ListEntityEventsInput,
  ListEntityEventsOutput,
  ListEntityEventsError,
  Credentials | HttpClient.HttpClient,
  ChangeEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEntityEventsInput,
  output: ListEntityEventsOutput,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEntityEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ChangeEvents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupingAttributeDefinitionsError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the current grouping configuration for this account, including all custom grouping attribute definitions that have been configured. These definitions determine how services are logically grouped based on telemetry attributes, Amazon Web Services tags, or predefined mappings.
 */
export const listGroupingAttributeDefinitions: API.OperationMethod<
  ListGroupingAttributeDefinitionsInput,
  ListGroupingAttributeDefinitionsOutput,
  ListGroupingAttributeDefinitionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListGroupingAttributeDefinitionsInput,
  output: ListGroupingAttributeDefinitionsOutput,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupingAttributeDefinitions",
}));

export type ListInstrumentationConfigurationsError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns all active instrumentation configurations for a service and environment. SDKs use this operation to sync configurations and apply client-side filters locally.
 *
 * Include the previous `SyncedAt` value to perform incremental syncs. When no changes are detected, the response sets `Changed` to `false` and omits configuration details.
 */
export const listInstrumentationConfigurations: API.PaginatedOperationMethod<
  ListInstrumentationConfigurationsRequest,
  InstrumentationConfigurationsPage,
  ListInstrumentationConfigurationsError,
  Credentials | HttpClient.HttpClient,
  InstrumentationConfigurationWithoutServiceEnv
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInstrumentationConfigurationsRequest,
  output: InstrumentationConfigurationsPage,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInstrumentationConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "LatestConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceDependenciesError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of service dependencies of the service that you specify. A dependency is an infrastructure component that an operation of this service connects with. Dependencies can include Amazon Web Services services, Amazon Web Services resources, and third-party services.
 */
export const listServiceDependencies: API.PaginatedOperationMethod<
  ListServiceDependenciesInput,
  ListServiceDependenciesOutput,
  ListServiceDependenciesError,
  Credentials | HttpClient.HttpClient,
  ServiceDependency
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceDependenciesInput,
  output: ListServiceDependenciesOutput,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceDependencies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceDependencies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceDependentsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the list of dependents that invoked the specified service during the provided time range. Dependents include other services, CloudWatch Synthetics canaries, and clients that are instrumented with CloudWatch RUM app monitors.
 */
export const listServiceDependents: API.PaginatedOperationMethod<
  ListServiceDependentsInput,
  ListServiceDependentsOutput,
  ListServiceDependentsError,
  Credentials | HttpClient.HttpClient,
  ServiceDependent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceDependentsInput,
  output: ListServiceDependentsOutput,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceDependents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceDependents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceLevelObjectiveExclusionWindowsError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all exclusion windows configured for a specific SLO.
 */
export const listServiceLevelObjectiveExclusionWindows: API.PaginatedOperationMethod<
  ListServiceLevelObjectiveExclusionWindowsInput,
  ListServiceLevelObjectiveExclusionWindowsOutput,
  ListServiceLevelObjectiveExclusionWindowsError,
  Credentials | HttpClient.HttpClient,
  ExclusionWindow
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceLevelObjectiveExclusionWindowsInput,
  output: ListServiceLevelObjectiveExclusionWindowsOutput,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceLevelObjectiveExclusionWindows",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ExclusionWindows",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceLevelObjectivesError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of SLOs created in this account.
 */
export const listServiceLevelObjectives: API.PaginatedOperationMethod<
  ListServiceLevelObjectivesInput,
  ListServiceLevelObjectivesOutput,
  ListServiceLevelObjectivesError,
  Credentials | HttpClient.HttpClient,
  ServiceLevelObjectiveSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceLevelObjectivesInput,
  output: ListServiceLevelObjectivesOutput,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceLevelObjectives",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SloSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceOperationsError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the *operations* of this service that have been discovered by Application Signals. Only the operations that were invoked during the specified time range are returned.
 */
export const listServiceOperations: API.PaginatedOperationMethod<
  ListServiceOperationsInput,
  ListServiceOperationsOutput,
  ListServiceOperationsError,
  Credentials | HttpClient.HttpClient,
  ServiceOperation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceOperationsInput,
  output: ListServiceOperationsOutput,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceOperations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServicesError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of services that have been discovered by Application Signals. A service represents a minimum logical and transactional unit that completes a business function. Services are discovered through Application Signals instrumentation.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesInput,
  ListServicesOutput,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  ServiceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServicesInput,
  output: ListServicesOutput,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListServiceStatesError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the last deployment and other change states of services. This API provides visibility into recent changes that may have affected service performance, helping with troubleshooting and change correlation.
 */
export const listServiceStates: API.PaginatedOperationMethod<
  ListServiceStatesInput,
  ListServiceStatesOutput,
  ListServiceStatesError,
  Credentials | HttpClient.HttpClient,
  ServiceState
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListServiceStatesInput,
  output: ListServiceStatesOutput,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceStates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ServiceStates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Displays the tags associated with a CloudWatch resource. Tags can be assigned to service level objectives.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ResourceNotFoundException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutGroupingConfigurationError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the grouping configuration for this account. This operation allows you to define custom grouping attributes that determine how services are logically grouped based on telemetry attributes, Amazon Web Services tags, or predefined mappings. These grouping attributes can then be used to organize and filter services in the Application Signals console and APIs.
 */
export const putGroupingConfiguration: API.OperationMethod<
  PutGroupingConfigurationInput,
  PutGroupingConfigurationOutput,
  PutGroupingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutGroupingConfigurationInput,
  output: PutGroupingConfigurationOutput,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutGroupingConfiguration",
}));

export type ReportInstrumentationConfigurationStatusError =
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reports the status of one or more instrumentation configurations from SDK instances. Use this to record when configurations become ready, hit errors, become active, or are disabled by limits.
 *
 * Report `READY`, `ERROR`, and `DISABLED` when the status changes. Report `ACTIVE` periodically (for example, every minute) while instrumentation is running.
 */
export const reportInstrumentationConfigurationStatus: API.OperationMethod<
  ReportInstrumentationConfigurationStatusRequest,
  ReportInstrumentationConfigurationStatusResponse,
  ReportInstrumentationConfigurationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReportInstrumentationConfigurationStatusRequest,
  output: ReportInstrumentationConfigurationStatusResponse,
  errors: [ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReportInstrumentationConfigurationStatus",
}));

export type StartDiscoveryError =
  | AccessDeniedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables this Amazon Web Services account to be able to use CloudWatch Application Signals by creating the *AWSServiceRoleForCloudWatchApplicationSignals* service-linked role. This service- linked role has the following permissions:
 *
 * - `xray:GetServiceGraph`
 *
 * - `logs:StartQuery`
 *
 * - `logs:GetQueryResults`
 *
 * - `cloudwatch:GetMetricData`
 *
 * - `cloudwatch:ListMetrics`
 *
 * - `tag:GetResources`
 *
 * - `autoscaling:DescribeAutoScalingGroups`
 *
 * A service-linked CloudTrail event channel is created to process CloudTrail events and return change event information. This includes last deployment time, userName, eventName, and other event metadata.
 *
 * After completing this step, you still need to instrument your Java and Python applications to send data to Application Signals. For more information, see Enabling Application Signals.
 */
export const startDiscovery: API.OperationMethod<
  StartDiscoveryInput,
  StartDiscoveryOutput,
  StartDiscoveryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDiscoveryInput,
  output: StartDiscoveryOutput,
  errors: [AccessDeniedException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDiscovery",
}));

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified CloudWatch resource, such as a service level objective.
 *
 * Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values.
 *
 * Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as strings of characters.
 *
 * You can use the `TagResource` action with an alarm that already has tags. If you specify a new tag key for the alarm, this tag is appended to the list of tags associated with the alarm. If you specify a tag key that is already associated with the alarm, the new tag value that you specify replaces the previous value for that tag.
 *
 * You can associate as many as 50 tags with a CloudWatch resource.
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
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ResourceNotFoundException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateServiceLevelObjectiveError =
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing service level objective (SLO). If you omit parameters, the previous values of those parameters are retained.
 *
 * You cannot change from a period-based SLO to a request-based SLO, or change from a request-based SLO to a period-based SLO.
 */
export const updateServiceLevelObjective: API.OperationMethod<
  UpdateServiceLevelObjectiveInput,
  UpdateServiceLevelObjectiveOutput,
  UpdateServiceLevelObjectiveError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateServiceLevelObjectiveInput,
  output: UpdateServiceLevelObjectiveOutput,
  errors: [ResourceNotFoundException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceLevelObjective",
}));
