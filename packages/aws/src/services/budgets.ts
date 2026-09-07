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
  sdkId: "Budgets",
  serviceShapeName: "AWSBudgetServiceGateway",
});
const auth = T.AwsAuthSigv4({ name: "budgets" });
const ver = T.ServiceVersion("2016-10-20");
const proto = T.AwsProtocolsAwsJson1_1();
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
  const _p0 = () => ({
    authSchemes: [{ name: "sigv4", signingRegion: "eusc-de-east-1" }],
  });
  const _p1 = (_0: unknown) => ({
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
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            "https://budgets.us-east-1.api.aws",
            { authSchemes: [{ name: "sigv4", signingRegion: "us-east-1" }] },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://budgets.global.sc2s.sgov.gov",
            {
              authSchemes: [{ name: "sigv4", signingRegion: "us-isob-east-1" }],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-e" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://budgets.global.cloud.adc-e.uk",
            {
              authSchemes: [{ name: "sigv4", signingRegion: "eu-isoe-west-1" }],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-f" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://budgets.global.csp.hci.ic.gov",
            {
              authSchemes: [
                { name: "sigv4", signingRegion: "us-isof-south-1" },
              ],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-eusc" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://budgets.eusc-de-east-1.api.amazonwebservices.eu",
            _p0(),
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-eusc" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            "https://budgets.eusc-de-east-1.api.amazonwebservices.eu",
            _p0(),
            {},
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://budgets-fips.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p1(PartitionResult),
              {},
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://budgets-fips.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p1(PartitionResult),
              {},
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://budgets.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p1(PartitionResult),
              {},
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://budgets.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class BillingViewHealthStatusException
  extends /*@__PURE__*/ S.TaggedError<BillingViewHealthStatusException>()(
    "BillingViewHealthStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class CreationLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<CreationLimitExceededException>()(
    "CreationLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class DuplicateRecordException
  extends /*@__PURE__*/ S.TaggedError<DuplicateRecordException>()(
    "DuplicateRecordException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ExpiredNextTokenException
  extends /*@__PURE__*/ S.TaggedError<ExpiredNextTokenException>()(
    "ExpiredNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalErrorException>()(
    "InternalErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceLockedException
  extends /*@__PURE__*/ S.TaggedError<ResourceLockedException>()(
    "ResourceLockedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(423),
  ) {}
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
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AccountId = string;
export type BudgetName = string;
export type NumericValue = string;
export type UnitValue = string;
export interface Spend {
  Amount: string;
  Unit: string;
}
export const Spend = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Amount: S.String, Unit: S.String }),
).annotate({ identifier: "Spend" }) as any as S.Schema<Spend>;
export type PlannedBudgetLimits = { [key: string]: Spend | undefined };
export const PlannedBudgetLimits = /*@__PURE__*/ S.Record(
  S.String,
  Spend.pipe(S.optional),
);
export type DimensionValue = string;
export type DimensionValues = string[];
export const DimensionValues = /*@__PURE__*/ S.Array(S.String);
export type CostFilters = { [key: string]: string[] | undefined };
export const CostFilters = /*@__PURE__*/ S.Record(
  S.String,
  DimensionValues.pipe(S.optional),
);
export interface CostTypes {
  IncludeTax?: boolean;
  IncludeSubscription?: boolean;
  UseBlended?: boolean;
  IncludeRefund?: boolean;
  IncludeCredit?: boolean;
  IncludeUpfront?: boolean;
  IncludeRecurring?: boolean;
  IncludeOtherSubscription?: boolean;
  IncludeSupport?: boolean;
  IncludeDiscount?: boolean;
  UseAmortized?: boolean;
}
export const CostTypes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IncludeTax: S.optional(S.Boolean),
    IncludeSubscription: S.optional(S.Boolean),
    UseBlended: S.optional(S.Boolean),
    IncludeRefund: S.optional(S.Boolean),
    IncludeCredit: S.optional(S.Boolean),
    IncludeUpfront: S.optional(S.Boolean),
    IncludeRecurring: S.optional(S.Boolean),
    IncludeOtherSubscription: S.optional(S.Boolean),
    IncludeSupport: S.optional(S.Boolean),
    IncludeDiscount: S.optional(S.Boolean),
    UseAmortized: S.optional(S.Boolean),
  }),
).annotate({ identifier: "CostTypes" }) as any as S.Schema<CostTypes>;
export type TimeUnit =
  | "DAILY"
  | "MONTHLY"
  | "QUARTERLY"
  | "ANNUALLY"
  | "CUSTOM"
  | (string & {});
export const TimeUnit = S.String;

export interface TimePeriod {
  Start?: Date;
  End?: Date;
}
export const TimePeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Start: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    End: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "TimePeriod" }) as any as S.Schema<TimePeriod>;
export interface CalculatedSpend {
  ActualSpend: Spend;
  ForecastedSpend?: Spend;
}
export const CalculatedSpend = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ActualSpend: Spend, ForecastedSpend: S.optional(Spend) }),
).annotate({
  identifier: "CalculatedSpend",
}) as any as S.Schema<CalculatedSpend>;
export type BudgetType =
  | "USAGE"
  | "COST"
  | "RI_UTILIZATION"
  | "RI_COVERAGE"
  | "SAVINGS_PLANS_UTILIZATION"
  | "SAVINGS_PLANS_COVERAGE"
  | (string & {});
export const BudgetType = S.String;

export type AutoAdjustType = "HISTORICAL" | "FORECAST" | (string & {});
export const AutoAdjustType = S.String;

export type AdjustmentPeriod = number;
export interface HistoricalOptions {
  BudgetAdjustmentPeriod: number;
  LookBackAvailablePeriods?: number;
}
export const HistoricalOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BudgetAdjustmentPeriod: S.Number,
    LookBackAvailablePeriods: S.optional(S.Number),
  }),
).annotate({
  identifier: "HistoricalOptions",
}) as any as S.Schema<HistoricalOptions>;
export interface AutoAdjustData {
  AutoAdjustType: AutoAdjustType;
  HistoricalOptions?: HistoricalOptions;
  LastAutoAdjustTime?: Date;
}
export const AutoAdjustData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutoAdjustType: AutoAdjustType,
    HistoricalOptions: S.optional(HistoricalOptions),
    LastAutoAdjustTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "AutoAdjustData" }) as any as S.Schema<AutoAdjustData>;
export type Expressions = Expression[];
export const Expressions = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<Expression> => Expression).annotate({
    identifier: "Expression",
  }),
) as any as S.Schema<Expressions>;
export type Dimension =
  | "AZ"
  | "INSTANCE_TYPE"
  | "LINKED_ACCOUNT"
  | "LINKED_ACCOUNT_NAME"
  | "OPERATION"
  | "PURCHASE_TYPE"
  | "REGION"
  | "SERVICE"
  | "SERVICE_CODE"
  | "USAGE_TYPE"
  | "USAGE_TYPE_GROUP"
  | "RECORD_TYPE"
  | "OPERATING_SYSTEM"
  | "TENANCY"
  | "SCOPE"
  | "PLATFORM"
  | "SUBSCRIPTION_ID"
  | "LEGAL_ENTITY_NAME"
  | "INVOICING_ENTITY"
  | "DEPLOYMENT_OPTION"
  | "DATABASE_ENGINE"
  | "CACHE_ENGINE"
  | "INSTANCE_TYPE_FAMILY"
  | "BILLING_ENTITY"
  | "RESERVATION_ID"
  | "RESOURCE_ID"
  | "RIGHTSIZING_TYPE"
  | "SAVINGS_PLANS_TYPE"
  | "SAVINGS_PLAN_ARN"
  | "PAYMENT_OPTION"
  | "RESERVATION_MODIFIED"
  | "TAG_KEY"
  | "COST_CATEGORY_NAME"
  | (string & {});
export const Dimension = S.String;

export type Value = string;
export type Values = string[];
export const Values = /*@__PURE__*/ S.Array(S.String);
export type MatchOption =
  | "EQUALS"
  | "ABSENT"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "CONTAINS"
  | "GREATER_THAN_OR_EQUAL"
  | "CASE_SENSITIVE"
  | "CASE_INSENSITIVE"
  | (string & {});
export const MatchOption = S.String;

export type MatchOptions = MatchOption[];
export const MatchOptions = /*@__PURE__*/ S.Array(MatchOption);
export interface ExpressionDimensionValues {
  Key: Dimension;
  Values: string[];
  MatchOptions?: MatchOption[];
}
export const ExpressionDimensionValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: Dimension,
    Values: Values,
    MatchOptions: S.optional(MatchOptions),
  }),
).annotate({
  identifier: "ExpressionDimensionValues",
}) as any as S.Schema<ExpressionDimensionValues>;
export type TagKey = string;
export interface TagValues {
  Key?: string;
  Values?: string[];
  MatchOptions?: MatchOption[];
}
export const TagValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Values: S.optional(Values),
    MatchOptions: S.optional(MatchOptions),
  }),
).annotate({ identifier: "TagValues" }) as any as S.Schema<TagValues>;
export type CostCategoryName = string;
export interface CostCategoryValues {
  Key?: string;
  Values?: string[];
  MatchOptions?: MatchOption[];
}
export const CostCategoryValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Values: S.optional(Values),
    MatchOptions: S.optional(MatchOptions),
  }),
).annotate({
  identifier: "CostCategoryValues",
}) as any as S.Schema<CostCategoryValues>;
export interface Expression {
  Or?: Expression[];
  And?: Expression[];
  Not?: Expression;
  Dimensions?: ExpressionDimensionValues;
  Tags?: TagValues;
  CostCategories?: CostCategoryValues;
}
export const Expression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Or: S.optional(
      S.suspend(() => Expressions).annotate({ identifier: "Expressions" }),
    ),
    And: S.optional(
      S.suspend(() => Expressions).annotate({ identifier: "Expressions" }),
    ),
    Not: S.optional(
      S.suspend((): S.Schema<Expression> => Expression).annotate({
        identifier: "Expression",
      }),
    ),
    Dimensions: S.optional(ExpressionDimensionValues),
    Tags: S.optional(TagValues),
    CostCategories: S.optional(CostCategoryValues),
  }),
).annotate({ identifier: "Expression" }) as any as S.Schema<Expression>;
export type Metric =
  | "BlendedCost"
  | "UnblendedCost"
  | "AmortizedCost"
  | "NetUnblendedCost"
  | "NetAmortizedCost"
  | "UsageQuantity"
  | "NormalizedUsageAmount"
  | "Hours"
  | (string & {});
export const Metric = S.String;

export type Metrics = Metric[];
export const Metrics = /*@__PURE__*/ S.Array(Metric);
export type BillingViewArn = string;
export type HealthStatusValue = "HEALTHY" | "UNHEALTHY" | (string & {});
export const HealthStatusValue = S.String;

export type HealthStatusReason =
  | "BILLING_VIEW_NO_ACCESS"
  | "BILLING_VIEW_UNHEALTHY"
  | "FILTER_INVALID"
  | "MULTI_YEAR_HISTORICAL_DATA_DISABLED"
  | (string & {});
export const HealthStatusReason = S.String;

export interface HealthStatus {
  Status?: HealthStatusValue;
  StatusReason?: HealthStatusReason;
  LastUpdatedTime?: Date;
}
export const HealthStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(HealthStatusValue),
    StatusReason: S.optional(HealthStatusReason),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "HealthStatus" }) as any as S.Schema<HealthStatus>;
export interface Budget {
  BudgetName: string;
  BudgetLimit?: Spend;
  PlannedBudgetLimits?: { [key: string]: Spend | undefined };
  CostFilters?: { [key: string]: string[] | undefined };
  CostTypes?: CostTypes;
  TimeUnit: TimeUnit;
  TimePeriod?: TimePeriod;
  CalculatedSpend?: CalculatedSpend;
  BudgetType: BudgetType;
  LastUpdatedTime?: Date;
  AutoAdjustData?: AutoAdjustData;
  FilterExpression?: Expression;
  Metrics?: Metric[];
  BillingViewArn?: string;
  HealthStatus?: HealthStatus;
}
export const Budget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BudgetName: S.String,
    BudgetLimit: S.optional(Spend),
    PlannedBudgetLimits: S.optional(PlannedBudgetLimits),
    CostFilters: S.optional(CostFilters),
    CostTypes: S.optional(CostTypes),
    TimeUnit: TimeUnit,
    TimePeriod: S.optional(TimePeriod),
    CalculatedSpend: S.optional(CalculatedSpend),
    BudgetType: BudgetType,
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AutoAdjustData: S.optional(AutoAdjustData),
    FilterExpression: S.optional(Expression),
    Metrics: S.optional(Metrics),
    BillingViewArn: S.optional(S.String),
    HealthStatus: S.optional(HealthStatus),
  }),
).annotate({ identifier: "Budget" }) as any as S.Schema<Budget>;
export type NotificationType = "ACTUAL" | "FORECASTED" | (string & {});
export const NotificationType = S.String;

export type ComparisonOperator =
  | "GREATER_THAN"
  | "LESS_THAN"
  | "EQUAL_TO"
  | (string & {});
export const ComparisonOperator = S.String;

export type NotificationThreshold = number;
export type ThresholdType = "PERCENTAGE" | "ABSOLUTE_VALUE" | (string & {});
export const ThresholdType = S.String;

export type NotificationState = "OK" | "ALARM" | (string & {});
export const NotificationState = S.String;

export interface Notification {
  NotificationType: NotificationType;
  ComparisonOperator: ComparisonOperator;
  Threshold: number;
  ThresholdType?: ThresholdType;
  NotificationState?: NotificationState;
}
export const Notification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotificationType: NotificationType,
    ComparisonOperator: ComparisonOperator,
    Threshold: S.Number,
    ThresholdType: S.optional(ThresholdType),
    NotificationState: S.optional(NotificationState),
  }),
).annotate({ identifier: "Notification" }) as any as S.Schema<Notification>;
export type SubscriptionType = "SNS" | "EMAIL" | (string & {});
export const SubscriptionType = S.String;

export type SubscriberAddress = string | redacted.Redacted<string>;
export interface Subscriber {
  SubscriptionType: SubscriptionType;
  Address: string | redacted.Redacted<string>;
}
export const Subscriber = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubscriptionType: SubscriptionType, Address: SensitiveString }),
).annotate({ identifier: "Subscriber" }) as any as S.Schema<Subscriber>;
export type Subscribers = Subscriber[];
export const Subscribers = /*@__PURE__*/ S.Array(Subscriber);
export interface NotificationWithSubscribers {
  Notification: Notification;
  Subscribers: Subscriber[];
}
export const NotificationWithSubscribers = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Notification: Notification, Subscribers: Subscribers }),
).annotate({
  identifier: "NotificationWithSubscribers",
}) as any as S.Schema<NotificationWithSubscribers>;
export type NotificationWithSubscribersList = NotificationWithSubscribers[];
export const NotificationWithSubscribersList = /*@__PURE__*/ S.Array(
  NotificationWithSubscribers,
);
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
export interface CreateBudgetRequest {
  AccountId: string;
  Budget: Budget;
  NotificationsWithSubscribers?: NotificationWithSubscribers[];
  ResourceTags?: ResourceTag[];
}
export const CreateBudgetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    Budget: Budget,
    NotificationsWithSubscribers: S.optional(NotificationWithSubscribersList),
    ResourceTags: S.optional(ResourceTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateBudgetRequest",
}) as any as S.Schema<CreateBudgetRequest>;
export interface CreateBudgetResponse {}
export const CreateBudgetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateBudgetResponse",
}) as any as S.Schema<CreateBudgetResponse>;
export type ActionType =
  | "APPLY_IAM_POLICY"
  | "APPLY_SCP_POLICY"
  | "RUN_SSM_DOCUMENTS"
  | (string & {});
export const ActionType = S.String;

export interface ActionThreshold {
  ActionThresholdValue: number;
  ActionThresholdType: ThresholdType;
}
export const ActionThreshold = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionThresholdValue: S.Number,
    ActionThresholdType: ThresholdType,
  }),
).annotate({
  identifier: "ActionThreshold",
}) as any as S.Schema<ActionThreshold>;
export type PolicyArn = string;
export type Role = string;
export type Roles = string[];
export const Roles = /*@__PURE__*/ S.Array(S.String);
export type Group = string;
export type Groups = string[];
export const Groups = /*@__PURE__*/ S.Array(S.String);
export type User = string;
export type Users = string[];
export const Users = /*@__PURE__*/ S.Array(S.String);
export interface IamActionDefinition {
  PolicyArn: string;
  Roles?: string[];
  Groups?: string[];
  Users?: string[];
}
export const IamActionDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyArn: S.String,
    Roles: S.optional(Roles),
    Groups: S.optional(Groups),
    Users: S.optional(Users),
  }),
).annotate({
  identifier: "IamActionDefinition",
}) as any as S.Schema<IamActionDefinition>;
export type PolicyId = string;
export type TargetId = string;
export type TargetIds = string[];
export const TargetIds = /*@__PURE__*/ S.Array(S.String);
export interface ScpActionDefinition {
  PolicyId: string;
  TargetIds: string[];
}
export const ScpActionDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyId: S.String, TargetIds: TargetIds }),
).annotate({
  identifier: "ScpActionDefinition",
}) as any as S.Schema<ScpActionDefinition>;
export type ActionSubType =
  | "STOP_EC2_INSTANCES"
  | "STOP_RDS_INSTANCES"
  | (string & {});
export const ActionSubType = S.String;

export type Region = string;
export type InstanceId = string;
export type InstanceIds = string[];
export const InstanceIds = /*@__PURE__*/ S.Array(S.String);
export interface SsmActionDefinition {
  ActionSubType: ActionSubType;
  Region: string;
  InstanceIds: string[];
}
export const SsmActionDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionSubType: ActionSubType,
    Region: S.String,
    InstanceIds: InstanceIds,
  }),
).annotate({
  identifier: "SsmActionDefinition",
}) as any as S.Schema<SsmActionDefinition>;
export interface Definition {
  IamActionDefinition?: IamActionDefinition;
  ScpActionDefinition?: ScpActionDefinition;
  SsmActionDefinition?: SsmActionDefinition;
}
export const Definition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IamActionDefinition: S.optional(IamActionDefinition),
    ScpActionDefinition: S.optional(ScpActionDefinition),
    SsmActionDefinition: S.optional(SsmActionDefinition),
  }),
).annotate({ identifier: "Definition" }) as any as S.Schema<Definition>;
export type RoleArn = string;
export type ApprovalModel = "AUTOMATIC" | "MANUAL" | (string & {});
export const ApprovalModel = S.String;

export interface CreateBudgetActionRequest {
  AccountId: string;
  BudgetName: string;
  NotificationType: NotificationType;
  ActionType: ActionType;
  ActionThreshold: ActionThreshold;
  Definition: Definition;
  ExecutionRoleArn: string;
  ApprovalModel: ApprovalModel;
  Subscribers: Subscriber[];
  ResourceTags?: ResourceTag[];
}
export const CreateBudgetActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    NotificationType: NotificationType,
    ActionType: ActionType,
    ActionThreshold: ActionThreshold,
    Definition: Definition,
    ExecutionRoleArn: S.String,
    ApprovalModel: ApprovalModel,
    Subscribers: Subscribers,
    ResourceTags: S.optional(ResourceTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateBudgetActionRequest",
}) as any as S.Schema<CreateBudgetActionRequest>;
export type ActionId = string;
export interface CreateBudgetActionResponse {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
}
export const CreateBudgetActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String, BudgetName: S.String, ActionId: S.String }),
).annotate({
  identifier: "CreateBudgetActionResponse",
}) as any as S.Schema<CreateBudgetActionResponse>;
export interface CreateNotificationRequest {
  AccountId: string;
  BudgetName: string;
  Notification: Notification;
  Subscribers: Subscriber[];
}
export const CreateNotificationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    Notification: Notification,
    Subscribers: Subscribers,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateNotificationRequest",
}) as any as S.Schema<CreateNotificationRequest>;
export interface CreateNotificationResponse {}
export const CreateNotificationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateNotificationResponse",
}) as any as S.Schema<CreateNotificationResponse>;
export interface CreateSubscriberRequest {
  AccountId: string;
  BudgetName: string;
  Notification: Notification;
  Subscriber: Subscriber;
}
export const CreateSubscriberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    Notification: Notification,
    Subscriber: Subscriber,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateSubscriberRequest",
}) as any as S.Schema<CreateSubscriberRequest>;
export interface CreateSubscriberResponse {}
export const CreateSubscriberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateSubscriberResponse",
}) as any as S.Schema<CreateSubscriberResponse>;
export interface DeleteBudgetRequest {
  AccountId: string;
  BudgetName: string;
}
export const DeleteBudgetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String, BudgetName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteBudgetRequest",
}) as any as S.Schema<DeleteBudgetRequest>;
export interface DeleteBudgetResponse {}
export const DeleteBudgetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBudgetResponse",
}) as any as S.Schema<DeleteBudgetResponse>;
export interface DeleteBudgetActionRequest {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
}
export const DeleteBudgetActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    ActionId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteBudgetActionRequest",
}) as any as S.Schema<DeleteBudgetActionRequest>;
export type ActionStatus =
  | "STANDBY"
  | "PENDING"
  | "EXECUTION_IN_PROGRESS"
  | "EXECUTION_SUCCESS"
  | "EXECUTION_FAILURE"
  | "REVERSE_IN_PROGRESS"
  | "REVERSE_SUCCESS"
  | "REVERSE_FAILURE"
  | "RESET_IN_PROGRESS"
  | "RESET_FAILURE"
  | (string & {});
export const ActionStatus = S.String;

export interface Action {
  ActionId: string;
  BudgetName: string;
  NotificationType: NotificationType;
  ActionType: ActionType;
  ActionThreshold: ActionThreshold;
  Definition: Definition;
  ExecutionRoleArn: string;
  ApprovalModel: ApprovalModel;
  Status: ActionStatus;
  Subscribers: Subscriber[];
}
export const Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionId: S.String,
    BudgetName: S.String,
    NotificationType: NotificationType,
    ActionType: ActionType,
    ActionThreshold: ActionThreshold,
    Definition: Definition,
    ExecutionRoleArn: S.String,
    ApprovalModel: ApprovalModel,
    Status: ActionStatus,
    Subscribers: Subscribers,
  }),
).annotate({ identifier: "Action" }) as any as S.Schema<Action>;
export interface DeleteBudgetActionResponse {
  AccountId: string;
  BudgetName: string;
  Action: Action;
}
export const DeleteBudgetActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String, BudgetName: S.String, Action: Action }),
).annotate({
  identifier: "DeleteBudgetActionResponse",
}) as any as S.Schema<DeleteBudgetActionResponse>;
export interface DeleteNotificationRequest {
  AccountId: string;
  BudgetName: string;
  Notification: Notification;
}
export const DeleteNotificationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    Notification: Notification,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteNotificationRequest",
}) as any as S.Schema<DeleteNotificationRequest>;
export interface DeleteNotificationResponse {}
export const DeleteNotificationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteNotificationResponse",
}) as any as S.Schema<DeleteNotificationResponse>;
export interface DeleteSubscriberRequest {
  AccountId: string;
  BudgetName: string;
  Notification: Notification;
  Subscriber: Subscriber;
}
export const DeleteSubscriberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    Notification: Notification,
    Subscriber: Subscriber,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteSubscriberRequest",
}) as any as S.Schema<DeleteSubscriberRequest>;
export interface DeleteSubscriberResponse {}
export const DeleteSubscriberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSubscriberResponse",
}) as any as S.Schema<DeleteSubscriberResponse>;
export interface DescribeBudgetRequest {
  AccountId: string;
  BudgetName: string;
  ShowFilterExpression?: boolean;
}
export const DescribeBudgetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    ShowFilterExpression: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeBudgetRequest",
}) as any as S.Schema<DescribeBudgetRequest>;
export interface DescribeBudgetResponse {
  Budget?: Budget;
}
export const DescribeBudgetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Budget: S.optional(Budget) }),
).annotate({
  identifier: "DescribeBudgetResponse",
}) as any as S.Schema<DescribeBudgetResponse>;
export interface DescribeBudgetActionRequest {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
}
export const DescribeBudgetActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    ActionId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeBudgetActionRequest",
}) as any as S.Schema<DescribeBudgetActionRequest>;
export interface DescribeBudgetActionResponse {
  AccountId: string;
  BudgetName: string;
  Action: Action;
}
export const DescribeBudgetActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String, BudgetName: S.String, Action: Action }),
).annotate({
  identifier: "DescribeBudgetActionResponse",
}) as any as S.Schema<DescribeBudgetActionResponse>;
export type MaxResults = number;
export interface DescribeBudgetActionHistoriesRequest {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
  TimePeriod?: TimePeriod;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeBudgetActionHistoriesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String,
      BudgetName: S.String,
      ActionId: S.String,
      TimePeriod: S.optional(TimePeriod),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeBudgetActionHistoriesRequest",
}) as any as S.Schema<DescribeBudgetActionHistoriesRequest>;
export type EventType =
  | "SYSTEM"
  | "CREATE_ACTION"
  | "DELETE_ACTION"
  | "UPDATE_ACTION"
  | "EXECUTE_ACTION"
  | (string & {});
export const EventType = S.String;

export interface ActionHistoryDetails {
  Message: string;
  Action: Action;
}
export const ActionHistoryDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.String, Action: Action }),
).annotate({
  identifier: "ActionHistoryDetails",
}) as any as S.Schema<ActionHistoryDetails>;
export interface ActionHistory {
  Timestamp: Date;
  Status: ActionStatus;
  EventType: EventType;
  ActionHistoryDetails: ActionHistoryDetails;
}
export const ActionHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Status: ActionStatus,
    EventType: EventType,
    ActionHistoryDetails: ActionHistoryDetails,
  }),
).annotate({ identifier: "ActionHistory" }) as any as S.Schema<ActionHistory>;
export type ActionHistories = ActionHistory[];
export const ActionHistories = /*@__PURE__*/ S.Array(ActionHistory);
export interface DescribeBudgetActionHistoriesResponse {
  ActionHistories: ActionHistory[];
  NextToken?: string;
}
export const DescribeBudgetActionHistoriesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ActionHistories: ActionHistories,
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeBudgetActionHistoriesResponse",
}) as any as S.Schema<DescribeBudgetActionHistoriesResponse>;
export interface DescribeBudgetActionsForAccountRequest {
  AccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeBudgetActionsForAccountRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeBudgetActionsForAccountRequest",
}) as any as S.Schema<DescribeBudgetActionsForAccountRequest>;
export type Actions = Action[];
export const Actions = /*@__PURE__*/ S.Array(Action);
export interface DescribeBudgetActionsForAccountResponse {
  Actions: Action[];
  NextToken?: string;
}
export const DescribeBudgetActionsForAccountResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Actions: Actions, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeBudgetActionsForAccountResponse",
}) as any as S.Schema<DescribeBudgetActionsForAccountResponse>;
export interface DescribeBudgetActionsForBudgetRequest {
  AccountId: string;
  BudgetName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeBudgetActionsForBudgetRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String,
      BudgetName: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeBudgetActionsForBudgetRequest",
}) as any as S.Schema<DescribeBudgetActionsForBudgetRequest>;
export interface DescribeBudgetActionsForBudgetResponse {
  Actions: Action[];
  NextToken?: string;
}
export const DescribeBudgetActionsForBudgetResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Actions: Actions, NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeBudgetActionsForBudgetResponse",
}) as any as S.Schema<DescribeBudgetActionsForBudgetResponse>;
export type MaxResultsBudgetNotifications = number;
export interface DescribeBudgetNotificationsForAccountRequest {
  AccountId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeBudgetNotificationsForAccountRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeBudgetNotificationsForAccountRequest",
  }) as any as S.Schema<DescribeBudgetNotificationsForAccountRequest>;
export type Notifications = Notification[];
export const Notifications = /*@__PURE__*/ S.Array(Notification);
export interface BudgetNotificationsForAccount {
  Notifications?: Notification[];
  BudgetName?: string;
}
export const BudgetNotificationsForAccount = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Notifications: S.optional(Notifications),
    BudgetName: S.optional(S.String),
  }),
).annotate({
  identifier: "BudgetNotificationsForAccount",
}) as any as S.Schema<BudgetNotificationsForAccount>;
export type BudgetNotificationsForAccountList = BudgetNotificationsForAccount[];
export const BudgetNotificationsForAccountList = /*@__PURE__*/ S.Array(
  BudgetNotificationsForAccount,
);
export interface DescribeBudgetNotificationsForAccountResponse {
  BudgetNotificationsForAccount?: BudgetNotificationsForAccount[];
  NextToken?: string;
}
export const DescribeBudgetNotificationsForAccountResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BudgetNotificationsForAccount: S.optional(
        BudgetNotificationsForAccountList,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeBudgetNotificationsForAccountResponse",
  }) as any as S.Schema<DescribeBudgetNotificationsForAccountResponse>;
export interface DescribeBudgetPerformanceHistoryRequest {
  AccountId: string;
  BudgetName: string;
  TimePeriod?: TimePeriod;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeBudgetPerformanceHistoryRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String,
      BudgetName: S.String,
      TimePeriod: S.optional(TimePeriod),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeBudgetPerformanceHistoryRequest",
}) as any as S.Schema<DescribeBudgetPerformanceHistoryRequest>;
export interface BudgetedAndActualAmounts {
  BudgetedAmount?: Spend;
  ActualAmount?: Spend;
  TimePeriod?: TimePeriod;
}
export const BudgetedAndActualAmounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BudgetedAmount: S.optional(Spend),
    ActualAmount: S.optional(Spend),
    TimePeriod: S.optional(TimePeriod),
  }),
).annotate({
  identifier: "BudgetedAndActualAmounts",
}) as any as S.Schema<BudgetedAndActualAmounts>;
export type BudgetedAndActualAmountsList = BudgetedAndActualAmounts[];
export const BudgetedAndActualAmountsList = /*@__PURE__*/ S.Array(
  BudgetedAndActualAmounts,
);
export interface BudgetPerformanceHistory {
  BudgetName?: string;
  BudgetType?: BudgetType;
  CostFilters?: { [key: string]: string[] | undefined };
  CostTypes?: CostTypes;
  TimeUnit?: TimeUnit;
  BillingViewArn?: string;
  BudgetedAndActualAmountsList?: BudgetedAndActualAmounts[];
  FilterExpression?: Expression;
  Metrics?: Metric[];
}
export const BudgetPerformanceHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BudgetName: S.optional(S.String),
    BudgetType: S.optional(BudgetType),
    CostFilters: S.optional(CostFilters),
    CostTypes: S.optional(CostTypes),
    TimeUnit: S.optional(TimeUnit),
    BillingViewArn: S.optional(S.String),
    BudgetedAndActualAmountsList: S.optional(BudgetedAndActualAmountsList),
    FilterExpression: S.optional(Expression),
    Metrics: S.optional(Metrics),
  }),
).annotate({
  identifier: "BudgetPerformanceHistory",
}) as any as S.Schema<BudgetPerformanceHistory>;
export interface DescribeBudgetPerformanceHistoryResponse {
  BudgetPerformanceHistory?: BudgetPerformanceHistory;
  NextToken?: string;
}
export const DescribeBudgetPerformanceHistoryResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      BudgetPerformanceHistory: S.optional(BudgetPerformanceHistory),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeBudgetPerformanceHistoryResponse",
}) as any as S.Schema<DescribeBudgetPerformanceHistoryResponse>;
export type MaxResultsDescribeBudgets = number;
export interface DescribeBudgetsRequest {
  AccountId: string;
  MaxResults?: number;
  NextToken?: string;
  ShowFilterExpression?: boolean;
}
export const DescribeBudgetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    ShowFilterExpression: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeBudgetsRequest",
}) as any as S.Schema<DescribeBudgetsRequest>;
export type Budgets = Budget[];
export const Budgets = /*@__PURE__*/ S.Array(Budget);
export interface DescribeBudgetsResponse {
  Budgets?: Budget[];
  NextToken?: string;
}
export const DescribeBudgetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Budgets: S.optional(Budgets), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "DescribeBudgetsResponse",
}) as any as S.Schema<DescribeBudgetsResponse>;
export interface DescribeNotificationsForBudgetRequest {
  AccountId: string;
  BudgetName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeNotificationsForBudgetRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.String,
      BudgetName: S.String,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeNotificationsForBudgetRequest",
}) as any as S.Schema<DescribeNotificationsForBudgetRequest>;
export interface DescribeNotificationsForBudgetResponse {
  Notifications?: Notification[];
  NextToken?: string;
}
export const DescribeNotificationsForBudgetResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Notifications: S.optional(Notifications),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeNotificationsForBudgetResponse",
}) as any as S.Schema<DescribeNotificationsForBudgetResponse>;
export interface DescribeSubscribersForNotificationRequest {
  AccountId: string;
  BudgetName: string;
  Notification: Notification;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeSubscribersForNotificationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.String,
      BudgetName: S.String,
      Notification: Notification,
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeSubscribersForNotificationRequest",
  }) as any as S.Schema<DescribeSubscribersForNotificationRequest>;
export interface DescribeSubscribersForNotificationResponse {
  Subscribers?: Subscriber[];
  NextToken?: string;
}
export const DescribeSubscribersForNotificationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Subscribers: S.optional(Subscribers),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeSubscribersForNotificationResponse",
  }) as any as S.Schema<DescribeSubscribersForNotificationResponse>;
export type ExecutionType =
  | "APPROVE_BUDGET_ACTION"
  | "RETRY_BUDGET_ACTION"
  | "REVERSE_BUDGET_ACTION"
  | "RESET_BUDGET_ACTION"
  | (string & {});
export const ExecutionType = S.String;

export interface ExecuteBudgetActionRequest {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
  ExecutionType: ExecutionType;
}
export const ExecuteBudgetActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    ActionId: S.String,
    ExecutionType: ExecutionType,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ExecuteBudgetActionRequest",
}) as any as S.Schema<ExecuteBudgetActionRequest>;
export interface ExecuteBudgetActionResponse {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
  ExecutionType: ExecutionType;
}
export const ExecuteBudgetActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    ActionId: S.String,
    ExecutionType: ExecutionType,
  }),
).annotate({
  identifier: "ExecuteBudgetActionResponse",
}) as any as S.Schema<ExecuteBudgetActionResponse>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  ResourceTags?: ResourceTag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceTags: S.optional(ResourceTagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  ResourceTags: ResourceTag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, ResourceTags: ResourceTagList }).pipe(
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
  ResourceARN: string;
  ResourceTagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, ResourceTagKeys: ResourceTagKeyList }).pipe(
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
export interface UpdateBudgetRequest {
  AccountId: string;
  NewBudget: Budget;
}
export const UpdateBudgetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountId: S.String, NewBudget: Budget }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateBudgetRequest",
}) as any as S.Schema<UpdateBudgetRequest>;
export interface UpdateBudgetResponse {}
export const UpdateBudgetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateBudgetResponse",
}) as any as S.Schema<UpdateBudgetResponse>;
export interface UpdateBudgetActionRequest {
  AccountId: string;
  BudgetName: string;
  ActionId: string;
  NotificationType?: NotificationType;
  ActionThreshold?: ActionThreshold;
  Definition?: Definition;
  ExecutionRoleArn?: string;
  ApprovalModel?: ApprovalModel;
  Subscribers?: Subscriber[];
}
export const UpdateBudgetActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    ActionId: S.String,
    NotificationType: S.optional(NotificationType),
    ActionThreshold: S.optional(ActionThreshold),
    Definition: S.optional(Definition),
    ExecutionRoleArn: S.optional(S.String),
    ApprovalModel: S.optional(ApprovalModel),
    Subscribers: S.optional(Subscribers),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateBudgetActionRequest",
}) as any as S.Schema<UpdateBudgetActionRequest>;
export interface UpdateBudgetActionResponse {
  AccountId: string;
  BudgetName: string;
  OldAction: Action;
  NewAction: Action;
}
export const UpdateBudgetActionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    OldAction: Action,
    NewAction: Action,
  }),
).annotate({
  identifier: "UpdateBudgetActionResponse",
}) as any as S.Schema<UpdateBudgetActionResponse>;
export interface UpdateNotificationRequest {
  AccountId: string;
  BudgetName: string;
  OldNotification: Notification;
  NewNotification: Notification;
}
export const UpdateNotificationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    OldNotification: Notification,
    NewNotification: Notification,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateNotificationRequest",
}) as any as S.Schema<UpdateNotificationRequest>;
export interface UpdateNotificationResponse {}
export const UpdateNotificationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateNotificationResponse",
}) as any as S.Schema<UpdateNotificationResponse>;
export interface UpdateSubscriberRequest {
  AccountId: string;
  BudgetName: string;
  Notification: Notification;
  OldSubscriber: Subscriber;
  NewSubscriber: Subscriber;
}
export const UpdateSubscriberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.String,
    BudgetName: S.String,
    Notification: Notification,
    OldSubscriber: Subscriber,
    NewSubscriber: Subscriber,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSubscriberRequest",
}) as any as S.Schema<UpdateSubscriberRequest>;
export interface UpdateSubscriberResponse {}
export const UpdateSubscriberResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateSubscriberResponse",
}) as any as S.Schema<UpdateSubscriberResponse>;
export type ErrorMessage = string;
export type CreateBudgetError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | CreationLimitExceededException
  | DuplicateRecordException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a budget and, if included, notifications and subscribers.
 *
 * Only one of `BudgetLimit` or `PlannedBudgetLimits` can be present in
 * the syntax at one time. Use the syntax that matches your use case. The Request Syntax
 * section shows the `BudgetLimit` syntax. For `PlannedBudgetLimits`,
 * see the Examples section.
 *
 * Similarly, only one set of filter and metric selections can be present in the syntax
 * at one time. Either `FilterExpression` and `Metrics` or
 * `CostFilters` and `CostTypes`, not both or a different
 * combination. We recommend using `FilterExpression` and `Metrics`
 * as they provide more flexible and powerful filtering capabilities. The Request Syntax
 * section shows the `FilterExpression`/`Metrics` syntax.
 */
export const createBudget: API.OperationMethod<
  CreateBudgetRequest,
  CreateBudgetResponse,
  CreateBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBudgetRequest,
  output: CreateBudgetResponse,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    CreationLimitExceededException,
    DuplicateRecordException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBudget",
}));

export type CreateBudgetActionError =
  | AccessDeniedException
  | CreationLimitExceededException
  | DuplicateRecordException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a budget action.
 */
export const createBudgetAction: API.OperationMethod<
  CreateBudgetActionRequest,
  CreateBudgetActionResponse,
  CreateBudgetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBudgetActionRequest,
  output: CreateBudgetActionResponse,
  errors: [
    AccessDeniedException,
    CreationLimitExceededException,
    DuplicateRecordException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBudgetAction",
}));

export type CreateNotificationError =
  | AccessDeniedException
  | CreationLimitExceededException
  | DuplicateRecordException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a notification. You must create the budget before you create the associated notification.
 */
export const createNotification: API.OperationMethod<
  CreateNotificationRequest,
  CreateNotificationResponse,
  CreateNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNotificationRequest,
  output: CreateNotificationResponse,
  errors: [
    AccessDeniedException,
    CreationLimitExceededException,
    DuplicateRecordException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotification",
}));

export type CreateSubscriberError =
  | AccessDeniedException
  | CreationLimitExceededException
  | DuplicateRecordException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a subscriber. You must create the associated budget and notification before you create the subscriber.
 */
export const createSubscriber: API.OperationMethod<
  CreateSubscriberRequest,
  CreateSubscriberResponse,
  CreateSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSubscriberRequest,
  output: CreateSubscriberResponse,
  errors: [
    AccessDeniedException,
    CreationLimitExceededException,
    DuplicateRecordException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSubscriber",
}));

export type DeleteBudgetError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a budget. You can delete your budget at any time.
 *
 * Deleting a budget also deletes the notifications and subscribers that are associated with that budget.
 */
export const deleteBudget: API.OperationMethod<
  DeleteBudgetRequest,
  DeleteBudgetResponse,
  DeleteBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBudgetRequest,
  output: DeleteBudgetResponse,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBudget",
}));

export type DeleteBudgetActionError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ResourceLockedException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a budget action.
 */
export const deleteBudgetAction: API.OperationMethod<
  DeleteBudgetActionRequest,
  DeleteBudgetActionResponse,
  DeleteBudgetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBudgetActionRequest,
  output: DeleteBudgetActionResponse,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ResourceLockedException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBudgetAction",
}));

export type DeleteNotificationError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a notification.
 *
 * Deleting a notification also deletes the subscribers that are associated with the notification.
 */
export const deleteNotification: API.OperationMethod<
  DeleteNotificationRequest,
  DeleteNotificationResponse,
  DeleteNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNotificationRequest,
  output: DeleteNotificationResponse,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotification",
}));

export type DeleteSubscriberError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a subscriber.
 *
 * Deleting the last subscriber to a notification also deletes the notification.
 */
export const deleteSubscriber: API.OperationMethod<
  DeleteSubscriberRequest,
  DeleteSubscriberResponse,
  DeleteSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSubscriberRequest,
  output: DeleteSubscriberResponse,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSubscriber",
}));

export type DescribeBudgetError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a budget.
 *
 * The Request Syntax section shows the `BudgetLimit` syntax. For
 * `PlannedBudgetLimits`, see the Examples section.
 */
export const describeBudget: API.OperationMethod<
  DescribeBudgetRequest,
  DescribeBudgetResponse,
  DescribeBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBudgetRequest,
  output: DescribeBudgetResponse,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudget",
}));

export type DescribeBudgetActionError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a budget action detail.
 */
export const describeBudgetAction: API.OperationMethod<
  DescribeBudgetActionRequest,
  DescribeBudgetActionResponse,
  DescribeBudgetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBudgetActionRequest,
  output: DescribeBudgetActionResponse,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgetAction",
}));

export type DescribeBudgetActionHistoriesError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes a budget action history detail.
 */
export const describeBudgetActionHistories: API.PaginatedOperationMethod<
  DescribeBudgetActionHistoriesRequest,
  DescribeBudgetActionHistoriesResponse,
  DescribeBudgetActionHistoriesError,
  Credentials | HttpClient.HttpClient,
  ActionHistory
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeBudgetActionHistoriesRequest,
  output: DescribeBudgetActionHistoriesResponse,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgetActionHistories",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ActionHistories",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeBudgetActionsForAccountError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes all of the budget actions for an account.
 */
export const describeBudgetActionsForAccount: API.PaginatedOperationMethod<
  DescribeBudgetActionsForAccountRequest,
  DescribeBudgetActionsForAccountResponse,
  DescribeBudgetActionsForAccountError,
  Credentials | HttpClient.HttpClient,
  Action
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeBudgetActionsForAccountRequest,
  output: DescribeBudgetActionsForAccountResponse,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgetActionsForAccount",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Actions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeBudgetActionsForBudgetError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes all of the budget actions for a budget.
 */
export const describeBudgetActionsForBudget: API.PaginatedOperationMethod<
  DescribeBudgetActionsForBudgetRequest,
  DescribeBudgetActionsForBudgetResponse,
  DescribeBudgetActionsForBudgetError,
  Credentials | HttpClient.HttpClient,
  Action
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeBudgetActionsForBudgetRequest,
  output: DescribeBudgetActionsForBudgetResponse,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgetActionsForBudget",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Actions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeBudgetNotificationsForAccountError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the budget names and notifications that are associated with an account.
 */
export const describeBudgetNotificationsForAccount: API.PaginatedOperationMethod<
  DescribeBudgetNotificationsForAccountRequest,
  DescribeBudgetNotificationsForAccountResponse,
  DescribeBudgetNotificationsForAccountError,
  Credentials | HttpClient.HttpClient,
  BudgetNotificationsForAccount
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeBudgetNotificationsForAccountRequest,
  output: DescribeBudgetNotificationsForAccountResponse,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgetNotificationsForAccount",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BudgetNotificationsForAccount",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeBudgetPerformanceHistoryError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Describes the history for `DAILY`, `MONTHLY`, and `QUARTERLY` budgets. Budget history isn't available for `ANNUAL` budgets.
 */
export const describeBudgetPerformanceHistory: API.PaginatedOperationMethod<
  DescribeBudgetPerformanceHistoryRequest,
  DescribeBudgetPerformanceHistoryResponse,
  DescribeBudgetPerformanceHistoryError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeBudgetPerformanceHistoryRequest,
  output: DescribeBudgetPerformanceHistoryResponse,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgetPerformanceHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeBudgetsError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the budgets that are associated with an account.
 *
 * The Request Syntax section shows the `BudgetLimit` syntax. For
 * `PlannedBudgetLimits`, see the Examples section.
 */
export const describeBudgets: API.PaginatedOperationMethod<
  DescribeBudgetsRequest,
  DescribeBudgetsResponse,
  DescribeBudgetsError,
  Credentials | HttpClient.HttpClient,
  Budget
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeBudgetsRequest,
  output: DescribeBudgetsResponse,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBudgets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Budgets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeNotificationsForBudgetError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the notifications that are associated with a budget.
 */
export const describeNotificationsForBudget: API.PaginatedOperationMethod<
  DescribeNotificationsForBudgetRequest,
  DescribeNotificationsForBudgetResponse,
  DescribeNotificationsForBudgetError,
  Credentials | HttpClient.HttpClient,
  Notification
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeNotificationsForBudgetRequest,
  output: DescribeNotificationsForBudgetResponse,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotificationsForBudget",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Notifications",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSubscribersForNotificationError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InternalErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the subscribers that are associated with a notification.
 */
export const describeSubscribersForNotification: API.PaginatedOperationMethod<
  DescribeSubscribersForNotificationRequest,
  DescribeSubscribersForNotificationResponse,
  DescribeSubscribersForNotificationError,
  Credentials | HttpClient.HttpClient,
  Subscriber
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSubscribersForNotificationRequest,
  output: DescribeSubscribersForNotificationResponse,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InternalErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSubscribersForNotification",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Subscribers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ExecuteBudgetActionError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ResourceLockedException
  | ThrottlingException
  | CommonErrors;
/**
 * Executes a budget action.
 */
export const executeBudgetAction: API.OperationMethod<
  ExecuteBudgetActionRequest,
  ExecuteBudgetActionResponse,
  ExecuteBudgetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ExecuteBudgetActionRequest,
  output: ExecuteBudgetActionResponse,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ResourceLockedException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExecuteBudgetAction",
}));

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists tags associated with a budget or budget action resource.
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
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates tags for a budget or budget action resource.
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
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes tags associated with a budget or budget action resource.
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
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateBudgetError =
  | AccessDeniedException
  | BillingViewHealthStatusException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a budget. You can change every part of a budget except for the `budgetName` and the `calculatedSpend`. When you modify a budget, the `calculatedSpend` drops to zero until Amazon Web Services has new usage data to use for forecasting.
 *
 * Only one of `BudgetLimit` or `PlannedBudgetLimits` can be present in
 * the syntax at one time. Use the syntax that matches your case. The Request Syntax
 * section shows the `BudgetLimit` syntax. For `PlannedBudgetLimits`,
 * see the Examples section.
 *
 * Similarly, only one set of filter and metric selections can be present in the syntax
 * at one time. Either `FilterExpression` and `Metrics` or
 * `CostFilters` and `CostTypes`, not both or a different
 * combination. We recommend using `FilterExpression` and `Metrics`
 * as they provide more flexible and powerful filtering capabilities. The Request Syntax
 * section shows the `FilterExpression`/`Metrics` syntax.
 */
export const updateBudget: API.OperationMethod<
  UpdateBudgetRequest,
  UpdateBudgetResponse,
  UpdateBudgetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBudgetRequest,
  output: UpdateBudgetResponse,
  errors: [
    AccessDeniedException,
    BillingViewHealthStatusException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBudget",
}));

export type UpdateBudgetActionError =
  | AccessDeniedException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ResourceLockedException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a budget action.
 */
export const updateBudgetAction: API.OperationMethod<
  UpdateBudgetActionRequest,
  UpdateBudgetActionResponse,
  UpdateBudgetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBudgetActionRequest,
  output: UpdateBudgetActionResponse,
  errors: [
    AccessDeniedException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ResourceLockedException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBudgetAction",
}));

export type UpdateNotificationError =
  | AccessDeniedException
  | DuplicateRecordException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a notification.
 */
export const updateNotification: API.OperationMethod<
  UpdateNotificationRequest,
  UpdateNotificationResponse,
  UpdateNotificationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNotificationRequest,
  output: UpdateNotificationResponse,
  errors: [
    AccessDeniedException,
    DuplicateRecordException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotification",
}));

export type UpdateSubscriberError =
  | AccessDeniedException
  | DuplicateRecordException
  | InternalErrorException
  | InvalidParameterException
  | NotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a subscriber.
 */
export const updateSubscriber: API.OperationMethod<
  UpdateSubscriberRequest,
  UpdateSubscriberResponse,
  UpdateSubscriberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSubscriberRequest,
  output: UpdateSubscriberResponse,
  errors: [
    AccessDeniedException,
    DuplicateRecordException,
    InternalErrorException,
    InvalidParameterException,
    NotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubscriber",
}));
