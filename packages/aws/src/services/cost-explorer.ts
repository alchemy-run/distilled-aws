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
  sdkId: "Cost Explorer",
  serviceShapeName: "AWSInsightsIndexService",
});
const auth = T.AwsAuthSigv4({ name: "ce" });
const ver = T.ServiceVersion("2017-10-25");
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
            "https://ce.us-east-1.api.aws",
            { authSchemes: [{ name: "sigv4", signingRegion: "us-east-1" }] },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-cn" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            "https://ce.cn-northwest-1.api.amazonwebservices.com.cn",
            {
              authSchemes: [{ name: "sigv4", signingRegion: "cn-northwest-1" }],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://ce.us-iso-east-1.c2s.ic.gov",
            {
              authSchemes: [{ name: "sigv4", signingRegion: "us-iso-east-1" }],
            },
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-iso-b" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://ce.us-isob-east-1.sc2s.sgov.gov",
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
            "https://ce.eu-isoe-west-1.cloud.adc-e.uk",
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
            "https://ce.us-isof-south-1.csp.hci.ic.gov",
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
          UseDualStack === true
        ) {
          return e(
            "https://ce.eusc-de-east-1.api.amazonwebservices.eu",
            _p0(),
            {},
          );
        }
        if (
          _.getAttr(PartitionResult, "name") === "aws-eusc" &&
          UseFIPS === false &&
          UseDualStack === false
        ) {
          return e(
            "https://ce.eusc-de-east-1.api.amazonwebservices.eu",
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
              `https://ce-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
              `https://ce-fips.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
              `https://ce.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              _p1(PartitionResult),
              {},
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ce.${_.getAttr(PartitionResult, "implicitGlobalRegion")}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          _p1(PartitionResult),
          {},
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AnalysisNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AnalysisNotFoundException>()(
    "AnalysisNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class AnomalyMonitorAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<AnomalyMonitorAlreadyExists>()(
    "AnomalyMonitorAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ValidationException",
      message: { includes: "same monitor name as an existing monitor" },
    }),
  ).pipe(C.withAlreadyExistsError, C.withConflictError) {}
export class AnomalySubscriptionAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<AnomalySubscriptionAlreadyExists>()(
    "AnomalySubscriptionAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ValidationException",
      message: {
        includes: "same subscription name as an existing subscription",
      },
    }),
  ).pipe(C.withAlreadyExistsError, C.withConflictError) {}
export class BackfillLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<BackfillLimitExceededException>()(
    "BackfillLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class BillExpirationException
  extends /*@__PURE__*/ S.TaggedError<BillExpirationException>()(
    "BillExpirationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class BillingViewHealthStatusException
  extends /*@__PURE__*/ S.TaggedError<BillingViewHealthStatusException>()(
    "BillingViewHealthStatusException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class DataUnavailableException
  extends /*@__PURE__*/ S.TaggedError<DataUnavailableException>()(
    "DataUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class GenerationExistsException
  extends /*@__PURE__*/ S.TaggedError<GenerationExistsException>()(
    "GenerationExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class RequestChangedException
  extends /*@__PURE__*/ S.TaggedError<RequestChangedException>()(
    "RequestChangedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RightsizingRecommendationNotEnabled
  extends /*@__PURE__*/ S.TaggedError<RightsizingRecommendationNotEnabled>()(
    "RightsizingRecommendationNotEnabled",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "AccessDeniedException",
      message: { includes: "opt-in only feature" },
    }),
  ) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnknownMonitorException
  extends /*@__PURE__*/ S.TaggedError<UnknownMonitorException>()(
    "UnknownMonitorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class UnknownSubscriptionException
  extends /*@__PURE__*/ S.TaggedError<UnknownSubscriptionException>()(
    "UnknownSubscriptionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class UnresolvableUsageUnitException
  extends /*@__PURE__*/ S.TaggedError<UnresolvableUsageUnitException>()(
    "UnresolvableUsageUnitException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export type YearMonthDay = string;
export type MonitorType = "DIMENSIONAL" | "CUSTOM" | (string & {});
export const MonitorType = S.String;

export type MonitorDimension =
  | "SERVICE"
  | "LINKED_ACCOUNT"
  | "TAG"
  | "COST_CATEGORY"
  | (string & {});
export const MonitorDimension = S.String;

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
  | "PAYER_ACCOUNT"
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
  | "AGREEMENT_END_DATE_TIME_AFTER"
  | "AGREEMENT_END_DATE_TIME_BEFORE"
  | "INVOICING_ENTITY"
  | "ANOMALY_TOTAL_IMPACT_ABSOLUTE"
  | "ANOMALY_TOTAL_IMPACT_PERCENTAGE"
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
  | "CASE_SENSITIVE"
  | "CASE_INSENSITIVE"
  | "GREATER_THAN_OR_EQUAL"
  | (string & {});
export const MatchOption = S.String;

export type MatchOptions = MatchOption[];
export const MatchOptions = /*@__PURE__*/ S.Array(MatchOption);
export interface DimensionValues {
  Key?: Dimension;
  Values?: string[];
  MatchOptions?: MatchOption[];
}
export const DimensionValues = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(Dimension),
    Values: S.optional(Values),
    MatchOptions: S.optional(MatchOptions),
  }),
).annotate({
  identifier: "DimensionValues",
}) as any as S.Schema<DimensionValues>;
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
  Dimensions?: DimensionValues;
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
    Dimensions: S.optional(DimensionValues),
    Tags: S.optional(TagValues),
    CostCategories: S.optional(CostCategoryValues),
  }),
).annotate({ identifier: "Expression" }) as any as S.Schema<Expression>;
export type NonNegativeInteger = number;
export interface AnomalyMonitor {
  MonitorArn?: string;
  MonitorName: string;
  CreationDate?: string;
  LastUpdatedDate?: string;
  LastEvaluatedDate?: string;
  MonitorType: MonitorType;
  MonitorDimension?: MonitorDimension;
  MonitorSpecification?: Expression;
  DimensionalValueCount?: number;
}
export const AnomalyMonitor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorArn: S.optional(S.String),
    MonitorName: S.String,
    CreationDate: S.optional(S.String),
    LastUpdatedDate: S.optional(S.String),
    LastEvaluatedDate: S.optional(S.String),
    MonitorType: MonitorType,
    MonitorDimension: S.optional(MonitorDimension),
    MonitorSpecification: S.optional(Expression),
    DimensionalValueCount: S.optional(S.Number),
  }),
).annotate({ identifier: "AnomalyMonitor" }) as any as S.Schema<AnomalyMonitor>;
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
export interface CreateAnomalyMonitorRequest {
  AnomalyMonitor: AnomalyMonitor;
  ResourceTags?: ResourceTag[];
}
export const CreateAnomalyMonitorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnomalyMonitor: AnomalyMonitor,
    ResourceTags: S.optional(ResourceTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAnomalyMonitorRequest",
}) as any as S.Schema<CreateAnomalyMonitorRequest>;
export interface CreateAnomalyMonitorResponse {
  MonitorArn: string;
}
export const CreateAnomalyMonitorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MonitorArn: S.String }),
).annotate({
  identifier: "CreateAnomalyMonitorResponse",
}) as any as S.Schema<CreateAnomalyMonitorResponse>;
export type Arn = string;
export type MonitorArnList = string[];
export const MonitorArnList = /*@__PURE__*/ S.Array(S.String);
export type SubscriberAddress = string;
export type SubscriberType = "EMAIL" | "SNS" | (string & {});
export const SubscriberType = S.String;

export type SubscriberStatus = "CONFIRMED" | "DECLINED" | (string & {});
export const SubscriberStatus = S.String;

export interface Subscriber {
  Address?: string;
  Type?: SubscriberType;
  Status?: SubscriberStatus;
}
export const Subscriber = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: S.optional(S.String),
    Type: S.optional(SubscriberType),
    Status: S.optional(SubscriberStatus),
  }),
).annotate({ identifier: "Subscriber" }) as any as S.Schema<Subscriber>;
export type Subscribers = Subscriber[];
export const Subscribers = /*@__PURE__*/ S.Array(Subscriber);
export type NullableNonNegativeDouble = number;
export type AnomalySubscriptionFrequency =
  | "DAILY"
  | "IMMEDIATE"
  | "WEEKLY"
  | (string & {});
export const AnomalySubscriptionFrequency = S.String;

export interface AnomalySubscription {
  SubscriptionArn?: string;
  AccountId?: string;
  MonitorArnList: string[];
  Subscribers: Subscriber[];
  Threshold?: number;
  Frequency: AnomalySubscriptionFrequency;
  SubscriptionName: string;
  ThresholdExpression?: Expression;
}
export const AnomalySubscription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionArn: S.optional(S.String),
    AccountId: S.optional(S.String),
    MonitorArnList: MonitorArnList,
    Subscribers: Subscribers,
    Threshold: S.optional(S.Number),
    Frequency: AnomalySubscriptionFrequency,
    SubscriptionName: S.String,
    ThresholdExpression: S.optional(Expression),
  }),
).annotate({
  identifier: "AnomalySubscription",
}) as any as S.Schema<AnomalySubscription>;
export interface CreateAnomalySubscriptionRequest {
  AnomalySubscription: AnomalySubscription;
  ResourceTags?: ResourceTag[];
}
export const CreateAnomalySubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnomalySubscription: AnomalySubscription,
    ResourceTags: S.optional(ResourceTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAnomalySubscriptionRequest",
}) as any as S.Schema<CreateAnomalySubscriptionRequest>;
export interface CreateAnomalySubscriptionResponse {
  SubscriptionArn: string;
}
export const CreateAnomalySubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubscriptionArn: S.String }),
).annotate({
  identifier: "CreateAnomalySubscriptionResponse",
}) as any as S.Schema<CreateAnomalySubscriptionResponse>;
export type ZonedDateTime = string;
export type CostCategoryRuleVersion =
  | "CostCategoryExpression.v1"
  | (string & {});
export const CostCategoryRuleVersion = S.String;

export type CostCategoryValue = string;
export type CostCategoryInheritedValueDimensionName =
  | "LINKED_ACCOUNT_NAME"
  | "TAG"
  | (string & {});
export const CostCategoryInheritedValueDimensionName = S.String;

export interface CostCategoryInheritedValueDimension {
  DimensionName?: CostCategoryInheritedValueDimensionName;
  DimensionKey?: string;
}
export const CostCategoryInheritedValueDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DimensionName: S.optional(CostCategoryInheritedValueDimensionName),
    DimensionKey: S.optional(S.String),
  }),
).annotate({
  identifier: "CostCategoryInheritedValueDimension",
}) as any as S.Schema<CostCategoryInheritedValueDimension>;
export type CostCategoryRuleType =
  | "REGULAR"
  | "INHERITED_VALUE"
  | (string & {});
export const CostCategoryRuleType = S.String;

export interface CostCategoryRule {
  Value?: string;
  Rule?: Expression;
  InheritedValue?: CostCategoryInheritedValueDimension;
  Type?: CostCategoryRuleType;
}
export const CostCategoryRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Value: S.optional(S.String),
    Rule: S.optional(Expression),
    InheritedValue: S.optional(CostCategoryInheritedValueDimension),
    Type: S.optional(CostCategoryRuleType),
  }),
).annotate({
  identifier: "CostCategoryRule",
}) as any as S.Schema<CostCategoryRule>;
export type CostCategoryRulesList = CostCategoryRule[];
export const CostCategoryRulesList = /*@__PURE__*/ S.Array(CostCategoryRule);
export type CostCategorySplitChargeRuleTargetsList = string[];
export const CostCategorySplitChargeRuleTargetsList = /*@__PURE__*/ S.Array(
  S.String,
);
export type CostCategorySplitChargeMethod =
  | "FIXED"
  | "PROPORTIONAL"
  | "EVEN"
  | (string & {});
export const CostCategorySplitChargeMethod = S.String;

export type CostCategorySplitChargeRuleParameterType =
  | "ALLOCATION_PERCENTAGES"
  | (string & {});
export const CostCategorySplitChargeRuleParameterType = S.String;

export type CostCategorySplitChargeRuleParameterValuesList = string[];
export const CostCategorySplitChargeRuleParameterValuesList =
  /*@__PURE__*/ S.Array(S.String);
export interface CostCategorySplitChargeRuleParameter {
  Type: CostCategorySplitChargeRuleParameterType;
  Values: string[];
}
export const CostCategorySplitChargeRuleParameter = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Type: CostCategorySplitChargeRuleParameterType,
      Values: CostCategorySplitChargeRuleParameterValuesList,
    }),
).annotate({
  identifier: "CostCategorySplitChargeRuleParameter",
}) as any as S.Schema<CostCategorySplitChargeRuleParameter>;
export type CostCategorySplitChargeRuleParametersList =
  CostCategorySplitChargeRuleParameter[];
export const CostCategorySplitChargeRuleParametersList = /*@__PURE__*/ S.Array(
  CostCategorySplitChargeRuleParameter,
);
export interface CostCategorySplitChargeRule {
  Source: string;
  Targets: string[];
  Method: CostCategorySplitChargeMethod;
  Parameters?: CostCategorySplitChargeRuleParameter[];
}
export const CostCategorySplitChargeRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Source: S.String,
    Targets: CostCategorySplitChargeRuleTargetsList,
    Method: CostCategorySplitChargeMethod,
    Parameters: S.optional(CostCategorySplitChargeRuleParametersList),
  }),
).annotate({
  identifier: "CostCategorySplitChargeRule",
}) as any as S.Schema<CostCategorySplitChargeRule>;
export type CostCategorySplitChargeRulesList = CostCategorySplitChargeRule[];
export const CostCategorySplitChargeRulesList = /*@__PURE__*/ S.Array(
  CostCategorySplitChargeRule,
);
export interface CreateCostCategoryDefinitionRequest {
  Name: string;
  EffectiveStart?: string;
  RuleVersion: CostCategoryRuleVersion;
  Rules: CostCategoryRule[];
  DefaultValue?: string;
  SplitChargeRules?: CostCategorySplitChargeRule[];
  ResourceTags?: ResourceTag[];
}
export const CreateCostCategoryDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    EffectiveStart: S.optional(S.String),
    RuleVersion: CostCategoryRuleVersion,
    Rules: CostCategoryRulesList,
    DefaultValue: S.optional(S.String),
    SplitChargeRules: S.optional(CostCategorySplitChargeRulesList),
    ResourceTags: S.optional(ResourceTagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateCostCategoryDefinitionRequest",
}) as any as S.Schema<CreateCostCategoryDefinitionRequest>;
export interface CreateCostCategoryDefinitionResponse {
  CostCategoryArn?: string;
  EffectiveStart?: string;
}
export const CreateCostCategoryDefinitionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CostCategoryArn: S.optional(S.String),
      EffectiveStart: S.optional(S.String),
    }),
).annotate({
  identifier: "CreateCostCategoryDefinitionResponse",
}) as any as S.Schema<CreateCostCategoryDefinitionResponse>;
export interface DeleteAnomalyMonitorRequest {
  MonitorArn: string;
}
export const DeleteAnomalyMonitorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MonitorArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAnomalyMonitorRequest",
}) as any as S.Schema<DeleteAnomalyMonitorRequest>;
export interface DeleteAnomalyMonitorResponse {}
export const DeleteAnomalyMonitorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAnomalyMonitorResponse",
}) as any as S.Schema<DeleteAnomalyMonitorResponse>;
export interface DeleteAnomalySubscriptionRequest {
  SubscriptionArn: string;
}
export const DeleteAnomalySubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubscriptionArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAnomalySubscriptionRequest",
}) as any as S.Schema<DeleteAnomalySubscriptionRequest>;
export interface DeleteAnomalySubscriptionResponse {}
export const DeleteAnomalySubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAnomalySubscriptionResponse",
}) as any as S.Schema<DeleteAnomalySubscriptionResponse>;
export interface DeleteCostCategoryDefinitionRequest {
  CostCategoryArn: string;
}
export const DeleteCostCategoryDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CostCategoryArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteCostCategoryDefinitionRequest",
}) as any as S.Schema<DeleteCostCategoryDefinitionRequest>;
export interface DeleteCostCategoryDefinitionResponse {
  CostCategoryArn?: string;
  EffectiveEnd?: string;
}
export const DeleteCostCategoryDefinitionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CostCategoryArn: S.optional(S.String),
      EffectiveEnd: S.optional(S.String),
    }),
).annotate({
  identifier: "DeleteCostCategoryDefinitionResponse",
}) as any as S.Schema<DeleteCostCategoryDefinitionResponse>;
export interface DescribeCostCategoryDefinitionRequest {
  CostCategoryArn: string;
  EffectiveOn?: string;
}
export const DescribeCostCategoryDefinitionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CostCategoryArn: S.String,
      EffectiveOn: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeCostCategoryDefinitionRequest",
}) as any as S.Schema<DescribeCostCategoryDefinitionRequest>;
export type CostCategoryStatusComponent = "COST_EXPLORER" | (string & {});
export const CostCategoryStatusComponent = S.String;

export type CostCategoryStatus = "PROCESSING" | "APPLIED" | (string & {});
export const CostCategoryStatus = S.String;

export interface CostCategoryProcessingStatus {
  Component?: CostCategoryStatusComponent;
  Status?: CostCategoryStatus;
}
export const CostCategoryProcessingStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Component: S.optional(CostCategoryStatusComponent),
    Status: S.optional(CostCategoryStatus),
  }),
).annotate({
  identifier: "CostCategoryProcessingStatus",
}) as any as S.Schema<CostCategoryProcessingStatus>;
export type CostCategoryProcessingStatusList = CostCategoryProcessingStatus[];
export const CostCategoryProcessingStatusList = /*@__PURE__*/ S.Array(
  CostCategoryProcessingStatus,
);
export interface CostCategory {
  CostCategoryArn: string;
  EffectiveStart: string;
  EffectiveEnd?: string;
  Name: string;
  RuleVersion: CostCategoryRuleVersion;
  Rules: CostCategoryRule[];
  SplitChargeRules?: CostCategorySplitChargeRule[];
  ProcessingStatus?: CostCategoryProcessingStatus[];
  DefaultValue?: string;
}
export const CostCategory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CostCategoryArn: S.String,
    EffectiveStart: S.String,
    EffectiveEnd: S.optional(S.String),
    Name: S.String,
    RuleVersion: CostCategoryRuleVersion,
    Rules: CostCategoryRulesList,
    SplitChargeRules: S.optional(CostCategorySplitChargeRulesList),
    ProcessingStatus: S.optional(CostCategoryProcessingStatusList),
    DefaultValue: S.optional(S.String),
  }),
).annotate({ identifier: "CostCategory" }) as any as S.Schema<CostCategory>;
export interface DescribeCostCategoryDefinitionResponse {
  CostCategory?: CostCategory;
}
export const DescribeCostCategoryDefinitionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ CostCategory: S.optional(CostCategory) }),
).annotate({
  identifier: "DescribeCostCategoryDefinitionResponse",
}) as any as S.Schema<DescribeCostCategoryDefinitionResponse>;
export interface AnomalyDateInterval {
  StartDate: string;
  EndDate?: string;
}
export const AnomalyDateInterval = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StartDate: S.String, EndDate: S.optional(S.String) }),
).annotate({
  identifier: "AnomalyDateInterval",
}) as any as S.Schema<AnomalyDateInterval>;
export type AnomalyFeedbackType =
  | "YES"
  | "NO"
  | "PLANNED_ACTIVITY"
  | (string & {});
export const AnomalyFeedbackType = S.String;

export type NumericOperator =
  | "EQUAL"
  | "GREATER_THAN_OR_EQUAL"
  | "LESS_THAN_OR_EQUAL"
  | "GREATER_THAN"
  | "LESS_THAN"
  | "BETWEEN"
  | (string & {});
export const NumericOperator = S.String;

export interface TotalImpactFilter {
  NumericOperator: NumericOperator;
  StartValue: number;
  EndValue?: number;
}
export const TotalImpactFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumericOperator: NumericOperator,
    StartValue: S.Number,
    EndValue: S.optional(S.Number),
  }),
).annotate({
  identifier: "TotalImpactFilter",
}) as any as S.Schema<TotalImpactFilter>;
export type NextPageToken = string;
export type PageSize = number;
export interface GetAnomaliesRequest {
  MonitorArn?: string;
  DateInterval: AnomalyDateInterval;
  Feedback?: AnomalyFeedbackType;
  TotalImpact?: TotalImpactFilter;
  NextPageToken?: string;
  MaxResults?: number;
}
export const GetAnomaliesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorArn: S.optional(S.String),
    DateInterval: AnomalyDateInterval,
    Feedback: S.optional(AnomalyFeedbackType),
    TotalImpact: S.optional(TotalImpactFilter),
    NextPageToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAnomaliesRequest",
}) as any as S.Schema<GetAnomaliesRequest>;
export interface RootCauseImpact {
  Contribution: number;
}
export const RootCauseImpact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Contribution: S.Number }),
).annotate({
  identifier: "RootCauseImpact",
}) as any as S.Schema<RootCauseImpact>;
export interface RootCause {
  Service?: string;
  Region?: string;
  LinkedAccount?: string;
  LinkedAccountName?: string;
  UsageType?: string;
  Impact?: RootCauseImpact;
}
export const RootCause = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Service: S.optional(S.String),
    Region: S.optional(S.String),
    LinkedAccount: S.optional(S.String),
    LinkedAccountName: S.optional(S.String),
    UsageType: S.optional(S.String),
    Impact: S.optional(RootCauseImpact),
  }),
).annotate({ identifier: "RootCause" }) as any as S.Schema<RootCause>;
export type RootCauses = RootCause[];
export const RootCauses = /*@__PURE__*/ S.Array(RootCause);
export interface AnomalyScore {
  MaxScore: number;
  CurrentScore: number;
}
export const AnomalyScore = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaxScore: S.Number, CurrentScore: S.Number }),
).annotate({ identifier: "AnomalyScore" }) as any as S.Schema<AnomalyScore>;
export interface Impact {
  MaxImpact: number;
  TotalImpact?: number;
  TotalActualSpend?: number;
  TotalExpectedSpend?: number;
  TotalImpactPercentage?: number;
}
export const Impact = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxImpact: S.Number,
    TotalImpact: S.optional(S.Number),
    TotalActualSpend: S.optional(S.Number),
    TotalExpectedSpend: S.optional(S.Number),
    TotalImpactPercentage: S.optional(S.Number),
  }),
).annotate({ identifier: "Impact" }) as any as S.Schema<Impact>;
export interface Anomaly {
  AnomalyId: string;
  AnomalyStartDate?: string;
  AnomalyEndDate?: string;
  DimensionValue?: string;
  RootCauses?: RootCause[];
  AnomalyScore: AnomalyScore;
  Impact: Impact;
  MonitorArn: string;
  Feedback?: AnomalyFeedbackType;
}
export const Anomaly = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnomalyId: S.String,
    AnomalyStartDate: S.optional(S.String),
    AnomalyEndDate: S.optional(S.String),
    DimensionValue: S.optional(S.String),
    RootCauses: S.optional(RootCauses),
    AnomalyScore: AnomalyScore,
    Impact: Impact,
    MonitorArn: S.String,
    Feedback: S.optional(AnomalyFeedbackType),
  }),
).annotate({ identifier: "Anomaly" }) as any as S.Schema<Anomaly>;
export type Anomalies = Anomaly[];
export const Anomalies = /*@__PURE__*/ S.Array(Anomaly);
export interface GetAnomaliesResponse {
  Anomalies: Anomaly[];
  NextPageToken?: string;
}
export const GetAnomaliesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Anomalies: Anomalies, NextPageToken: S.optional(S.String) }),
).annotate({
  identifier: "GetAnomaliesResponse",
}) as any as S.Schema<GetAnomaliesResponse>;
export interface GetAnomalyMonitorsRequest {
  MonitorArnList?: string[];
  NextPageToken?: string;
  MaxResults?: number;
}
export const GetAnomalyMonitorsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MonitorArnList: S.optional(Values),
    NextPageToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAnomalyMonitorsRequest",
}) as any as S.Schema<GetAnomalyMonitorsRequest>;
export type AnomalyMonitors = AnomalyMonitor[];
export const AnomalyMonitors = /*@__PURE__*/ S.Array(AnomalyMonitor);
export interface GetAnomalyMonitorsResponse {
  AnomalyMonitors: AnomalyMonitor[];
  NextPageToken?: string;
}
export const GetAnomalyMonitorsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnomalyMonitors: AnomalyMonitors,
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAnomalyMonitorsResponse",
}) as any as S.Schema<GetAnomalyMonitorsResponse>;
export interface GetAnomalySubscriptionsRequest {
  SubscriptionArnList?: string[];
  MonitorArn?: string;
  NextPageToken?: string;
  MaxResults?: number;
}
export const GetAnomalySubscriptionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionArnList: S.optional(Values),
    MonitorArn: S.optional(S.String),
    NextPageToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAnomalySubscriptionsRequest",
}) as any as S.Schema<GetAnomalySubscriptionsRequest>;
export type AnomalySubscriptions = AnomalySubscription[];
export const AnomalySubscriptions = /*@__PURE__*/ S.Array(AnomalySubscription);
export interface GetAnomalySubscriptionsResponse {
  AnomalySubscriptions: AnomalySubscription[];
  NextPageToken?: string;
}
export const GetAnomalySubscriptionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnomalySubscriptions: AnomalySubscriptions,
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetAnomalySubscriptionsResponse",
}) as any as S.Schema<GetAnomalySubscriptionsResponse>;
export type Granularity = "DAILY" | "MONTHLY" | "HOURLY" | (string & {});
export const Granularity = S.String;

export type UsageServices = string[];
export const UsageServices = /*@__PURE__*/ S.Array(S.String);
export type ApproximationDimension = "SERVICE" | "RESOURCE" | (string & {});
export const ApproximationDimension = S.String;

export interface GetApproximateUsageRecordsRequest {
  Granularity: Granularity;
  Services?: string[];
  ApproximationDimension: ApproximationDimension;
}
export const GetApproximateUsageRecordsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Granularity: Granularity,
    Services: S.optional(UsageServices),
    ApproximationDimension: ApproximationDimension,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetApproximateUsageRecordsRequest",
}) as any as S.Schema<GetApproximateUsageRecordsRequest>;
export type NonNegativeLong = number;
export type ApproximateUsageRecordsPerService = {
  [key: string]: number | undefined;
};
export const ApproximateUsageRecordsPerService = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface DateInterval {
  Start: string;
  End: string;
}
export const DateInterval = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Start: S.String, End: S.String }),
).annotate({ identifier: "DateInterval" }) as any as S.Schema<DateInterval>;
export interface GetApproximateUsageRecordsResponse {
  Services?: { [key: string]: number | undefined };
  TotalRecords?: number;
  LookbackPeriod?: DateInterval;
}
export const GetApproximateUsageRecordsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Services: S.optional(ApproximateUsageRecordsPerService),
    TotalRecords: S.optional(S.Number),
    LookbackPeriod: S.optional(DateInterval),
  }),
).annotate({
  identifier: "GetApproximateUsageRecordsResponse",
}) as any as S.Schema<GetApproximateUsageRecordsResponse>;
export type AnalysisId = string;
export interface GetCommitmentPurchaseAnalysisRequest {
  AnalysisId: string;
}
export const GetCommitmentPurchaseAnalysisRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AnalysisId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetCommitmentPurchaseAnalysisRequest",
}) as any as S.Schema<GetCommitmentPurchaseAnalysisRequest>;
export type AnalysisStatus =
  | "SUCCEEDED"
  | "PROCESSING"
  | "FAILED"
  | (string & {});
export const AnalysisStatus = S.String;

export type ErrorCode =
  | "NO_USAGE_FOUND"
  | "INTERNAL_FAILURE"
  | "INVALID_SAVINGS_PLANS_TO_ADD"
  | "INVALID_SAVINGS_PLANS_TO_EXCLUDE"
  | "INVALID_ACCOUNT_ID"
  | (string & {});
export const ErrorCode = S.String;

export interface RecommendationDetailHourlyMetrics {
  StartTime?: string;
  EstimatedOnDemandCost?: string;
  CurrentCoverage?: string;
  EstimatedCoverage?: string;
  EstimatedNewCommitmentUtilization?: string;
}
export const RecommendationDetailHourlyMetrics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.String),
    EstimatedOnDemandCost: S.optional(S.String),
    CurrentCoverage: S.optional(S.String),
    EstimatedCoverage: S.optional(S.String),
    EstimatedNewCommitmentUtilization: S.optional(S.String),
  }),
).annotate({
  identifier: "RecommendationDetailHourlyMetrics",
}) as any as S.Schema<RecommendationDetailHourlyMetrics>;
export type MetricsOverLookbackPeriod = RecommendationDetailHourlyMetrics[];
export const MetricsOverLookbackPeriod = /*@__PURE__*/ S.Array(
  RecommendationDetailHourlyMetrics,
);
export interface SavingsPlansPurchaseAnalysisDetails {
  CurrencyCode?: string;
  LookbackPeriodInHours?: string;
  CurrentAverageCoverage?: string;
  CurrentAverageHourlyOnDemandSpend?: string;
  CurrentMaximumHourlyOnDemandSpend?: string;
  CurrentMinimumHourlyOnDemandSpend?: string;
  CurrentOnDemandSpend?: string;
  ExistingHourlyCommitment?: string;
  HourlyCommitmentToPurchase?: string;
  EstimatedAverageCoverage?: string;
  EstimatedAverageUtilization?: string;
  EstimatedMonthlySavingsAmount?: string;
  EstimatedOnDemandCost?: string;
  EstimatedOnDemandCostWithCurrentCommitment?: string;
  EstimatedROI?: string;
  EstimatedSavingsAmount?: string;
  EstimatedSavingsPercentage?: string;
  EstimatedCommitmentCost?: string;
  LatestUsageTimestamp?: string;
  UpfrontCost?: string;
  AdditionalMetadata?: string;
  MetricsOverLookbackPeriod?: RecommendationDetailHourlyMetrics[];
}
export const SavingsPlansPurchaseAnalysisDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CurrencyCode: S.optional(S.String),
    LookbackPeriodInHours: S.optional(S.String),
    CurrentAverageCoverage: S.optional(S.String),
    CurrentAverageHourlyOnDemandSpend: S.optional(S.String),
    CurrentMaximumHourlyOnDemandSpend: S.optional(S.String),
    CurrentMinimumHourlyOnDemandSpend: S.optional(S.String),
    CurrentOnDemandSpend: S.optional(S.String),
    ExistingHourlyCommitment: S.optional(S.String),
    HourlyCommitmentToPurchase: S.optional(S.String),
    EstimatedAverageCoverage: S.optional(S.String),
    EstimatedAverageUtilization: S.optional(S.String),
    EstimatedMonthlySavingsAmount: S.optional(S.String),
    EstimatedOnDemandCost: S.optional(S.String),
    EstimatedOnDemandCostWithCurrentCommitment: S.optional(S.String),
    EstimatedROI: S.optional(S.String),
    EstimatedSavingsAmount: S.optional(S.String),
    EstimatedSavingsPercentage: S.optional(S.String),
    EstimatedCommitmentCost: S.optional(S.String),
    LatestUsageTimestamp: S.optional(S.String),
    UpfrontCost: S.optional(S.String),
    AdditionalMetadata: S.optional(S.String),
    MetricsOverLookbackPeriod: S.optional(MetricsOverLookbackPeriod),
  }),
).annotate({
  identifier: "SavingsPlansPurchaseAnalysisDetails",
}) as any as S.Schema<SavingsPlansPurchaseAnalysisDetails>;
export interface AnalysisDetails {
  SavingsPlansPurchaseAnalysisDetails?: SavingsPlansPurchaseAnalysisDetails;
}
export const AnalysisDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SavingsPlansPurchaseAnalysisDetails: S.optional(
      SavingsPlansPurchaseAnalysisDetails,
    ),
  }),
).annotate({
  identifier: "AnalysisDetails",
}) as any as S.Schema<AnalysisDetails>;
export type AccountScope = "PAYER" | "LINKED" | (string & {});
export const AccountScope = S.String;

export type AccountId = string;
export type AnalysisType =
  | "MAX_SAVINGS"
  | "CUSTOM_COMMITMENT"
  | "TARGET_AVERAGE_COVERAGE"
  | (string & {});
export const AnalysisType = S.String;

export type PaymentOption =
  | "NO_UPFRONT"
  | "PARTIAL_UPFRONT"
  | "ALL_UPFRONT"
  | "LIGHT_UTILIZATION"
  | "MEDIUM_UTILIZATION"
  | "HEAVY_UTILIZATION"
  | (string & {});
export const PaymentOption = S.String;

export type SupportedSavingsPlansType =
  | "COMPUTE_SP"
  | "EC2_INSTANCE_SP"
  | "SAGEMAKER_SP"
  | "DATABASE_SP"
  | (string & {});
export const SupportedSavingsPlansType = S.String;

export type TermInYears = "ONE_YEAR" | "THREE_YEARS" | (string & {});
export const TermInYears = S.String;

export type SavingsPlansCommitment = number;
export interface SavingsPlans {
  PaymentOption?: PaymentOption;
  SavingsPlansType?: SupportedSavingsPlansType;
  Region?: string;
  InstanceFamily?: string;
  TermInYears?: TermInYears;
  SavingsPlansCommitment?: number;
  OfferingId?: string;
}
export const SavingsPlans = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PaymentOption: S.optional(PaymentOption),
    SavingsPlansType: S.optional(SupportedSavingsPlansType),
    Region: S.optional(S.String),
    InstanceFamily: S.optional(S.String),
    TermInYears: S.optional(TermInYears),
    SavingsPlansCommitment: S.optional(S.Number),
    OfferingId: S.optional(S.String),
  }),
).annotate({ identifier: "SavingsPlans" }) as any as S.Schema<SavingsPlans>;
export type SavingsPlansToAdd = SavingsPlans[];
export const SavingsPlansToAdd = /*@__PURE__*/ S.Array(SavingsPlans);
export type SavingsPlansId = string;
export type SavingsPlansToExclude = string[];
export const SavingsPlansToExclude = /*@__PURE__*/ S.Array(S.String);
export type SavingsPlansTargetCoverage = number;
export interface SavingsPlansPurchaseAnalysisConfiguration {
  AccountScope?: AccountScope;
  AccountId?: string;
  AnalysisType: AnalysisType;
  SavingsPlansToAdd: SavingsPlans[];
  SavingsPlansToExclude?: string[];
  LookBackTimePeriod: DateInterval;
  SavingsPlansTargetCoverage?: number;
}
export const SavingsPlansPurchaseAnalysisConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountScope: S.optional(AccountScope),
      AccountId: S.optional(S.String),
      AnalysisType: AnalysisType,
      SavingsPlansToAdd: SavingsPlansToAdd,
      SavingsPlansToExclude: S.optional(SavingsPlansToExclude),
      LookBackTimePeriod: DateInterval,
      SavingsPlansTargetCoverage: S.optional(S.Number),
    }),
  ).annotate({
    identifier: "SavingsPlansPurchaseAnalysisConfiguration",
  }) as any as S.Schema<SavingsPlansPurchaseAnalysisConfiguration>;
export interface CommitmentPurchaseAnalysisConfiguration {
  SavingsPlansPurchaseAnalysisConfiguration?: SavingsPlansPurchaseAnalysisConfiguration;
}
export const CommitmentPurchaseAnalysisConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SavingsPlansPurchaseAnalysisConfiguration: S.optional(
        SavingsPlansPurchaseAnalysisConfiguration,
      ),
    }),
).annotate({
  identifier: "CommitmentPurchaseAnalysisConfiguration",
}) as any as S.Schema<CommitmentPurchaseAnalysisConfiguration>;
export interface GetCommitmentPurchaseAnalysisResponse {
  EstimatedCompletionTime: string;
  AnalysisCompletionTime?: string;
  AnalysisStartedTime: string;
  AnalysisId: string;
  AnalysisStatus: AnalysisStatus;
  ErrorCode?: ErrorCode;
  AnalysisDetails?: AnalysisDetails;
  CommitmentPurchaseAnalysisConfiguration: CommitmentPurchaseAnalysisConfiguration;
}
export const GetCommitmentPurchaseAnalysisResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EstimatedCompletionTime: S.String,
      AnalysisCompletionTime: S.optional(S.String),
      AnalysisStartedTime: S.String,
      AnalysisId: S.String,
      AnalysisStatus: AnalysisStatus,
      ErrorCode: S.optional(ErrorCode),
      AnalysisDetails: S.optional(AnalysisDetails),
      CommitmentPurchaseAnalysisConfiguration:
        CommitmentPurchaseAnalysisConfiguration,
    }),
).annotate({
  identifier: "GetCommitmentPurchaseAnalysisResponse",
}) as any as S.Schema<GetCommitmentPurchaseAnalysisResponse>;
export type MetricName = string;
export type MetricNames = string[];
export const MetricNames = /*@__PURE__*/ S.Array(S.String);
export type GroupDefinitionType =
  | "DIMENSION"
  | "TAG"
  | "COST_CATEGORY"
  | (string & {});
export const GroupDefinitionType = S.String;

export type GroupDefinitionKey = string;
export interface GroupDefinition {
  Type?: GroupDefinitionType;
  Key?: string;
}
export const GroupDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(GroupDefinitionType),
    Key: S.optional(S.String),
  }),
).annotate({
  identifier: "GroupDefinition",
}) as any as S.Schema<GroupDefinition>;
export type GroupDefinitions = GroupDefinition[];
export const GroupDefinitions = /*@__PURE__*/ S.Array(GroupDefinition);
export type BillingViewArn = string;
export interface GetCostAndUsageRequest {
  TimePeriod: DateInterval;
  Granularity: Granularity;
  Filter?: Expression;
  Metrics: string[];
  GroupBy?: GroupDefinition[];
  BillingViewArn?: string;
  NextPageToken?: string;
}
export const GetCostAndUsageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: DateInterval,
    Granularity: Granularity,
    Filter: S.optional(Expression),
    Metrics: MetricNames,
    GroupBy: S.optional(GroupDefinitions),
    BillingViewArn: S.optional(S.String),
    NextPageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCostAndUsageRequest",
}) as any as S.Schema<GetCostAndUsageRequest>;
export type MetricAmount = string;
export type MetricUnit = string;
export interface MetricValue {
  Amount?: string;
  Unit?: string;
}
export const MetricValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Amount: S.optional(S.String), Unit: S.optional(S.String) }),
).annotate({ identifier: "MetricValue" }) as any as S.Schema<MetricValue>;
export type Metrics = { [key: string]: MetricValue | undefined };
export const Metrics = /*@__PURE__*/ S.Record(
  S.String,
  MetricValue.pipe(S.optional),
);
export type Key = string;
export type Keys = string[];
export const Keys = /*@__PURE__*/ S.Array(S.String);
export interface Group {
  Keys?: string[];
  Metrics?: { [key: string]: MetricValue | undefined };
}
export const Group = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Keys: S.optional(Keys), Metrics: S.optional(Metrics) }),
).annotate({ identifier: "Group" }) as any as S.Schema<Group>;
export type Groups = Group[];
export const Groups = /*@__PURE__*/ S.Array(Group);
export type Estimated = boolean;
export interface ResultByTime {
  TimePeriod?: DateInterval;
  Total?: { [key: string]: MetricValue | undefined };
  Groups?: Group[];
  Estimated?: boolean;
}
export const ResultByTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: S.optional(DateInterval),
    Total: S.optional(Metrics),
    Groups: S.optional(Groups),
    Estimated: S.optional(S.Boolean),
  }),
).annotate({ identifier: "ResultByTime" }) as any as S.Schema<ResultByTime>;
export type ResultsByTime = ResultByTime[];
export const ResultsByTime = /*@__PURE__*/ S.Array(ResultByTime);
export type AttributeType = string;
export type AttributeValue = string;
export type Attributes = { [key: string]: string | undefined };
export const Attributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DimensionValuesWithAttributes {
  Value?: string;
  Attributes?: { [key: string]: string | undefined };
}
export const DimensionValuesWithAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.String), Attributes: S.optional(Attributes) }),
).annotate({
  identifier: "DimensionValuesWithAttributes",
}) as any as S.Schema<DimensionValuesWithAttributes>;
export type DimensionValuesWithAttributesList = DimensionValuesWithAttributes[];
export const DimensionValuesWithAttributesList = /*@__PURE__*/ S.Array(
  DimensionValuesWithAttributes,
);
export interface GetCostAndUsageResponse {
  NextPageToken?: string;
  GroupDefinitions?: GroupDefinition[];
  ResultsByTime?: ResultByTime[];
  DimensionValueAttributes?: DimensionValuesWithAttributes[];
}
export const GetCostAndUsageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextPageToken: S.optional(S.String),
    GroupDefinitions: S.optional(GroupDefinitions),
    ResultsByTime: S.optional(ResultsByTime),
    DimensionValueAttributes: S.optional(DimensionValuesWithAttributesList),
  }),
).annotate({
  identifier: "GetCostAndUsageResponse",
}) as any as S.Schema<GetCostAndUsageResponse>;
export type CostAndUsageComparisonsMaxResults = number;
export interface GetCostAndUsageComparisonsRequest {
  BillingViewArn?: string;
  BaselineTimePeriod: DateInterval;
  ComparisonTimePeriod: DateInterval;
  MetricForComparison: string;
  Filter?: Expression;
  GroupBy?: GroupDefinition[];
  MaxResults?: number;
  NextPageToken?: string;
}
export const GetCostAndUsageComparisonsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingViewArn: S.optional(S.String),
    BaselineTimePeriod: DateInterval,
    ComparisonTimePeriod: DateInterval,
    MetricForComparison: S.String,
    Filter: S.optional(Expression),
    GroupBy: S.optional(GroupDefinitions),
    MaxResults: S.optional(S.Number),
    NextPageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCostAndUsageComparisonsRequest",
}) as any as S.Schema<GetCostAndUsageComparisonsRequest>;
export interface ComparisonMetricValue {
  BaselineTimePeriodAmount?: string;
  ComparisonTimePeriodAmount?: string;
  Difference?: string;
  Unit?: string;
}
export const ComparisonMetricValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaselineTimePeriodAmount: S.optional(S.String),
    ComparisonTimePeriodAmount: S.optional(S.String),
    Difference: S.optional(S.String),
    Unit: S.optional(S.String),
  }),
).annotate({
  identifier: "ComparisonMetricValue",
}) as any as S.Schema<ComparisonMetricValue>;
export type ComparisonMetrics = {
  [key: string]: ComparisonMetricValue | undefined;
};
export const ComparisonMetrics = /*@__PURE__*/ S.Record(
  S.String,
  ComparisonMetricValue.pipe(S.optional),
);
export interface CostAndUsageComparison {
  CostAndUsageSelector?: Expression;
  Metrics?: { [key: string]: ComparisonMetricValue | undefined };
}
export const CostAndUsageComparison = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CostAndUsageSelector: S.optional(Expression),
    Metrics: S.optional(ComparisonMetrics),
  }),
).annotate({
  identifier: "CostAndUsageComparison",
}) as any as S.Schema<CostAndUsageComparison>;
export type CostAndUsageComparisons = CostAndUsageComparison[];
export const CostAndUsageComparisons = /*@__PURE__*/ S.Array(
  CostAndUsageComparison,
);
export interface GetCostAndUsageComparisonsResponse {
  CostAndUsageComparisons?: CostAndUsageComparison[];
  TotalCostAndUsage?: { [key: string]: ComparisonMetricValue | undefined };
  NextPageToken?: string;
}
export const GetCostAndUsageComparisonsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CostAndUsageComparisons: S.optional(CostAndUsageComparisons),
    TotalCostAndUsage: S.optional(ComparisonMetrics),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCostAndUsageComparisonsResponse",
}) as any as S.Schema<GetCostAndUsageComparisonsResponse>;
export interface GetCostAndUsageWithResourcesRequest {
  TimePeriod: DateInterval;
  Granularity: Granularity;
  Filter: Expression;
  Metrics?: string[];
  GroupBy?: GroupDefinition[];
  BillingViewArn?: string;
  NextPageToken?: string;
}
export const GetCostAndUsageWithResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: DateInterval,
    Granularity: Granularity,
    Filter: Expression,
    Metrics: S.optional(MetricNames),
    GroupBy: S.optional(GroupDefinitions),
    BillingViewArn: S.optional(S.String),
    NextPageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCostAndUsageWithResourcesRequest",
}) as any as S.Schema<GetCostAndUsageWithResourcesRequest>;
export interface GetCostAndUsageWithResourcesResponse {
  NextPageToken?: string;
  GroupDefinitions?: GroupDefinition[];
  ResultsByTime?: ResultByTime[];
  DimensionValueAttributes?: DimensionValuesWithAttributes[];
}
export const GetCostAndUsageWithResourcesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextPageToken: S.optional(S.String),
      GroupDefinitions: S.optional(GroupDefinitions),
      ResultsByTime: S.optional(ResultsByTime),
      DimensionValueAttributes: S.optional(DimensionValuesWithAttributesList),
    }),
).annotate({
  identifier: "GetCostAndUsageWithResourcesResponse",
}) as any as S.Schema<GetCostAndUsageWithResourcesResponse>;
export type SearchString = string;
export type SortDefinitionKey = string;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = S.String;

export interface SortDefinition {
  Key: string;
  SortOrder?: SortOrder;
}
export const SortDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, SortOrder: S.optional(SortOrder) }),
).annotate({ identifier: "SortDefinition" }) as any as S.Schema<SortDefinition>;
export type SortDefinitions = SortDefinition[];
export const SortDefinitions = /*@__PURE__*/ S.Array(SortDefinition);
export type MaxResults = number;
export interface GetCostCategoriesRequest {
  SearchString?: string;
  TimePeriod: DateInterval;
  CostCategoryName?: string;
  Filter?: Expression;
  SortBy?: SortDefinition[];
  BillingViewArn?: string;
  MaxResults?: number;
  NextPageToken?: string;
}
export const GetCostCategoriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchString: S.optional(S.String),
    TimePeriod: DateInterval,
    CostCategoryName: S.optional(S.String),
    Filter: S.optional(Expression),
    SortBy: S.optional(SortDefinitions),
    BillingViewArn: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextPageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCostCategoriesRequest",
}) as any as S.Schema<GetCostCategoriesRequest>;
export type CostCategoryNamesList = string[];
export const CostCategoryNamesList = /*@__PURE__*/ S.Array(S.String);
export type CostCategoryValuesList = string[];
export const CostCategoryValuesList = /*@__PURE__*/ S.Array(S.String);
export interface GetCostCategoriesResponse {
  NextPageToken?: string;
  CostCategoryNames?: string[];
  CostCategoryValues?: string[];
  ReturnSize: number;
  TotalSize: number;
}
export const GetCostCategoriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextPageToken: S.optional(S.String),
    CostCategoryNames: S.optional(CostCategoryNamesList),
    CostCategoryValues: S.optional(CostCategoryValuesList),
    ReturnSize: S.Number,
    TotalSize: S.Number,
  }),
).annotate({
  identifier: "GetCostCategoriesResponse",
}) as any as S.Schema<GetCostCategoriesResponse>;
export type CostComparisonDriversMaxResults = number;
export interface GetCostComparisonDriversRequest {
  BillingViewArn?: string;
  BaselineTimePeriod: DateInterval;
  ComparisonTimePeriod: DateInterval;
  MetricForComparison: string;
  Filter?: Expression;
  GroupBy?: GroupDefinition[];
  MaxResults?: number;
  NextPageToken?: string;
}
export const GetCostComparisonDriversRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BillingViewArn: S.optional(S.String),
    BaselineTimePeriod: DateInterval,
    ComparisonTimePeriod: DateInterval,
    MetricForComparison: S.String,
    Filter: S.optional(Expression),
    GroupBy: S.optional(GroupDefinitions),
    MaxResults: S.optional(S.Number),
    NextPageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCostComparisonDriversRequest",
}) as any as S.Schema<GetCostComparisonDriversRequest>;
export interface CostDriver {
  Type?: string;
  Name?: string;
  Metrics?: { [key: string]: ComparisonMetricValue | undefined };
}
export const CostDriver = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(S.String),
    Name: S.optional(S.String),
    Metrics: S.optional(ComparisonMetrics),
  }),
).annotate({ identifier: "CostDriver" }) as any as S.Schema<CostDriver>;
export type CostDrivers = CostDriver[];
export const CostDrivers = /*@__PURE__*/ S.Array(CostDriver);
export interface CostComparisonDriver {
  CostSelector?: Expression;
  Metrics?: { [key: string]: ComparisonMetricValue | undefined };
  CostDrivers?: CostDriver[];
}
export const CostComparisonDriver = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CostSelector: S.optional(Expression),
    Metrics: S.optional(ComparisonMetrics),
    CostDrivers: S.optional(CostDrivers),
  }),
).annotate({
  identifier: "CostComparisonDriver",
}) as any as S.Schema<CostComparisonDriver>;
export type CostComparisonDrivers = CostComparisonDriver[];
export const CostComparisonDrivers =
  /*@__PURE__*/ S.Array(CostComparisonDriver);
export interface GetCostComparisonDriversResponse {
  CostComparisonDrivers?: CostComparisonDriver[];
  NextPageToken?: string;
}
export const GetCostComparisonDriversResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CostComparisonDrivers: S.optional(CostComparisonDrivers),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetCostComparisonDriversResponse",
}) as any as S.Schema<GetCostComparisonDriversResponse>;
export type Metric =
  | "BLENDED_COST"
  | "UNBLENDED_COST"
  | "AMORTIZED_COST"
  | "NET_UNBLENDED_COST"
  | "NET_AMORTIZED_COST"
  | "USAGE_QUANTITY"
  | "NORMALIZED_USAGE_AMOUNT"
  | (string & {});
export const Metric = S.String;

export type PredictionIntervalLevel = number;
export interface GetCostForecastRequest {
  TimePeriod: DateInterval;
  Metric: Metric;
  Granularity: Granularity;
  Filter?: Expression;
  BillingViewArn?: string;
  PredictionIntervalLevel?: number;
}
export const GetCostForecastRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: DateInterval,
    Metric: Metric,
    Granularity: Granularity,
    Filter: S.optional(Expression),
    BillingViewArn: S.optional(S.String),
    PredictionIntervalLevel: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetCostForecastRequest",
}) as any as S.Schema<GetCostForecastRequest>;
export interface ForecastResult {
  TimePeriod?: DateInterval;
  MeanValue?: string;
  PredictionIntervalLowerBound?: string;
  PredictionIntervalUpperBound?: string;
}
export const ForecastResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: S.optional(DateInterval),
    MeanValue: S.optional(S.String),
    PredictionIntervalLowerBound: S.optional(S.String),
    PredictionIntervalUpperBound: S.optional(S.String),
  }),
).annotate({ identifier: "ForecastResult" }) as any as S.Schema<ForecastResult>;
export type ForecastResultsByTime = ForecastResult[];
export const ForecastResultsByTime = /*@__PURE__*/ S.Array(ForecastResult);
export interface GetCostForecastResponse {
  Total?: MetricValue;
  ForecastResultsByTime?: ForecastResult[];
}
export const GetCostForecastResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Total: S.optional(MetricValue),
    ForecastResultsByTime: S.optional(ForecastResultsByTime),
  }),
).annotate({
  identifier: "GetCostForecastResponse",
}) as any as S.Schema<GetCostForecastResponse>;
export type Context =
  | "COST_AND_USAGE"
  | "RESERVATIONS"
  | "SAVINGS_PLANS"
  | (string & {});
export const Context = S.String;

export interface GetDimensionValuesRequest {
  SearchString?: string;
  TimePeriod: DateInterval;
  Dimension: Dimension;
  Context?: Context;
  Filter?: Expression;
  SortBy?: SortDefinition[];
  BillingViewArn?: string;
  MaxResults?: number;
  NextPageToken?: string;
}
export const GetDimensionValuesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchString: S.optional(S.String),
    TimePeriod: DateInterval,
    Dimension: Dimension,
    Context: S.optional(Context),
    Filter: S.optional(Expression),
    SortBy: S.optional(SortDefinitions),
    BillingViewArn: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextPageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDimensionValuesRequest",
}) as any as S.Schema<GetDimensionValuesRequest>;
export interface GetDimensionValuesResponse {
  DimensionValues: DimensionValuesWithAttributes[];
  ReturnSize: number;
  TotalSize: number;
  NextPageToken?: string;
}
export const GetDimensionValuesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DimensionValues: DimensionValuesWithAttributesList,
    ReturnSize: S.Number,
    TotalSize: S.Number,
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDimensionValuesResponse",
}) as any as S.Schema<GetDimensionValuesResponse>;
export interface GetReservationCoverageRequest {
  TimePeriod: DateInterval;
  GroupBy?: GroupDefinition[];
  Granularity?: Granularity;
  Filter?: Expression;
  Metrics?: string[];
  NextPageToken?: string;
  SortBy?: SortDefinition;
  MaxResults?: number;
}
export const GetReservationCoverageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: DateInterval,
    GroupBy: S.optional(GroupDefinitions),
    Granularity: S.optional(Granularity),
    Filter: S.optional(Expression),
    Metrics: S.optional(MetricNames),
    NextPageToken: S.optional(S.String),
    SortBy: S.optional(SortDefinition),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetReservationCoverageRequest",
}) as any as S.Schema<GetReservationCoverageRequest>;
export type OnDemandHours = string;
export type ReservedHours = string;
export type TotalRunningHours = string;
export type CoverageHoursPercentage = string;
export interface CoverageHours {
  OnDemandHours?: string;
  ReservedHours?: string;
  TotalRunningHours?: string;
  CoverageHoursPercentage?: string;
}
export const CoverageHours = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OnDemandHours: S.optional(S.String),
    ReservedHours: S.optional(S.String),
    TotalRunningHours: S.optional(S.String),
    CoverageHoursPercentage: S.optional(S.String),
  }),
).annotate({ identifier: "CoverageHours" }) as any as S.Schema<CoverageHours>;
export type OnDemandNormalizedUnits = string;
export type ReservedNormalizedUnits = string;
export type TotalRunningNormalizedUnits = string;
export type CoverageNormalizedUnitsPercentage = string;
export interface CoverageNormalizedUnits {
  OnDemandNormalizedUnits?: string;
  ReservedNormalizedUnits?: string;
  TotalRunningNormalizedUnits?: string;
  CoverageNormalizedUnitsPercentage?: string;
}
export const CoverageNormalizedUnits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OnDemandNormalizedUnits: S.optional(S.String),
    ReservedNormalizedUnits: S.optional(S.String),
    TotalRunningNormalizedUnits: S.optional(S.String),
    CoverageNormalizedUnitsPercentage: S.optional(S.String),
  }),
).annotate({
  identifier: "CoverageNormalizedUnits",
}) as any as S.Schema<CoverageNormalizedUnits>;
export type OnDemandCost = string;
export interface CoverageCost {
  OnDemandCost?: string;
}
export const CoverageCost = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OnDemandCost: S.optional(S.String) }),
).annotate({ identifier: "CoverageCost" }) as any as S.Schema<CoverageCost>;
export interface Coverage {
  CoverageHours?: CoverageHours;
  CoverageNormalizedUnits?: CoverageNormalizedUnits;
  CoverageCost?: CoverageCost;
}
export const Coverage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CoverageHours: S.optional(CoverageHours),
    CoverageNormalizedUnits: S.optional(CoverageNormalizedUnits),
    CoverageCost: S.optional(CoverageCost),
  }),
).annotate({ identifier: "Coverage" }) as any as S.Schema<Coverage>;
export interface ReservationCoverageGroup {
  Attributes?: { [key: string]: string | undefined };
  Coverage?: Coverage;
}
export const ReservationCoverageGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(Attributes),
    Coverage: S.optional(Coverage),
  }),
).annotate({
  identifier: "ReservationCoverageGroup",
}) as any as S.Schema<ReservationCoverageGroup>;
export type ReservationCoverageGroups = ReservationCoverageGroup[];
export const ReservationCoverageGroups = /*@__PURE__*/ S.Array(
  ReservationCoverageGroup,
);
export interface CoverageByTime {
  TimePeriod?: DateInterval;
  Groups?: ReservationCoverageGroup[];
  Total?: Coverage;
}
export const CoverageByTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: S.optional(DateInterval),
    Groups: S.optional(ReservationCoverageGroups),
    Total: S.optional(Coverage),
  }),
).annotate({ identifier: "CoverageByTime" }) as any as S.Schema<CoverageByTime>;
export type CoveragesByTime = CoverageByTime[];
export const CoveragesByTime = /*@__PURE__*/ S.Array(CoverageByTime);
export interface GetReservationCoverageResponse {
  CoveragesByTime: CoverageByTime[];
  Total?: Coverage;
  NextPageToken?: string;
}
export const GetReservationCoverageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CoveragesByTime: CoveragesByTime,
    Total: S.optional(Coverage),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetReservationCoverageResponse",
}) as any as S.Schema<GetReservationCoverageResponse>;
export type LookbackPeriodInDays =
  | "SEVEN_DAYS"
  | "THIRTY_DAYS"
  | "SIXTY_DAYS"
  | (string & {});
export const LookbackPeriodInDays = S.String;

export type OfferingClass = "STANDARD" | "CONVERTIBLE" | (string & {});
export const OfferingClass = S.String;

export interface EC2Specification {
  OfferingClass?: OfferingClass;
}
export const EC2Specification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OfferingClass: S.optional(OfferingClass) }),
).annotate({
  identifier: "EC2Specification",
}) as any as S.Schema<EC2Specification>;
export interface ServiceSpecification {
  EC2Specification?: EC2Specification;
}
export const ServiceSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EC2Specification: S.optional(EC2Specification) }),
).annotate({
  identifier: "ServiceSpecification",
}) as any as S.Schema<ServiceSpecification>;
export type RecommendationsPageSize = number;
export interface GetReservationPurchaseRecommendationRequest {
  AccountId?: string;
  Service: string;
  Filter?: Expression;
  AccountScope?: AccountScope;
  LookbackPeriodInDays?: LookbackPeriodInDays;
  TermInYears?: TermInYears;
  PaymentOption?: PaymentOption;
  ServiceSpecification?: ServiceSpecification;
  PageSize?: number;
  NextPageToken?: string;
}
export const GetReservationPurchaseRecommendationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      AccountId: S.optional(S.String),
      Service: S.String,
      Filter: S.optional(Expression),
      AccountScope: S.optional(AccountScope),
      LookbackPeriodInDays: S.optional(LookbackPeriodInDays),
      TermInYears: S.optional(TermInYears),
      PaymentOption: S.optional(PaymentOption),
      ServiceSpecification: S.optional(ServiceSpecification),
      PageSize: S.optional(S.Number),
      NextPageToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetReservationPurchaseRecommendationRequest",
  }) as any as S.Schema<GetReservationPurchaseRecommendationRequest>;
export interface ReservationPurchaseRecommendationMetadata {
  RecommendationId?: string;
  GenerationTimestamp?: string;
  AdditionalMetadata?: string;
}
export const ReservationPurchaseRecommendationMetadata =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RecommendationId: S.optional(S.String),
      GenerationTimestamp: S.optional(S.String),
      AdditionalMetadata: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ReservationPurchaseRecommendationMetadata",
  }) as any as S.Schema<ReservationPurchaseRecommendationMetadata>;
export interface EC2InstanceDetails {
  Family?: string;
  InstanceType?: string;
  Region?: string;
  AvailabilityZone?: string;
  Platform?: string;
  Tenancy?: string;
  CurrentGeneration?: boolean;
  SizeFlexEligible?: boolean;
}
export const EC2InstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Family: S.optional(S.String),
    InstanceType: S.optional(S.String),
    Region: S.optional(S.String),
    AvailabilityZone: S.optional(S.String),
    Platform: S.optional(S.String),
    Tenancy: S.optional(S.String),
    CurrentGeneration: S.optional(S.Boolean),
    SizeFlexEligible: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "EC2InstanceDetails",
}) as any as S.Schema<EC2InstanceDetails>;
export interface RDSInstanceDetails {
  Family?: string;
  InstanceType?: string;
  Region?: string;
  DatabaseEngine?: string;
  DatabaseEdition?: string;
  DeploymentOption?: string;
  LicenseModel?: string;
  CurrentGeneration?: boolean;
  SizeFlexEligible?: boolean;
  DeploymentModel?: string;
}
export const RDSInstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Family: S.optional(S.String),
    InstanceType: S.optional(S.String),
    Region: S.optional(S.String),
    DatabaseEngine: S.optional(S.String),
    DatabaseEdition: S.optional(S.String),
    DeploymentOption: S.optional(S.String),
    LicenseModel: S.optional(S.String),
    CurrentGeneration: S.optional(S.Boolean),
    SizeFlexEligible: S.optional(S.Boolean),
    DeploymentModel: S.optional(S.String),
  }),
).annotate({
  identifier: "RDSInstanceDetails",
}) as any as S.Schema<RDSInstanceDetails>;
export interface RedshiftInstanceDetails {
  Family?: string;
  NodeType?: string;
  Region?: string;
  CurrentGeneration?: boolean;
  SizeFlexEligible?: boolean;
}
export const RedshiftInstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Family: S.optional(S.String),
    NodeType: S.optional(S.String),
    Region: S.optional(S.String),
    CurrentGeneration: S.optional(S.Boolean),
    SizeFlexEligible: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "RedshiftInstanceDetails",
}) as any as S.Schema<RedshiftInstanceDetails>;
export interface ElastiCacheInstanceDetails {
  Family?: string;
  NodeType?: string;
  Region?: string;
  ProductDescription?: string;
  CurrentGeneration?: boolean;
  SizeFlexEligible?: boolean;
}
export const ElastiCacheInstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Family: S.optional(S.String),
    NodeType: S.optional(S.String),
    Region: S.optional(S.String),
    ProductDescription: S.optional(S.String),
    CurrentGeneration: S.optional(S.Boolean),
    SizeFlexEligible: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ElastiCacheInstanceDetails",
}) as any as S.Schema<ElastiCacheInstanceDetails>;
export interface ESInstanceDetails {
  InstanceClass?: string;
  InstanceSize?: string;
  Region?: string;
  CurrentGeneration?: boolean;
  SizeFlexEligible?: boolean;
}
export const ESInstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InstanceClass: S.optional(S.String),
    InstanceSize: S.optional(S.String),
    Region: S.optional(S.String),
    CurrentGeneration: S.optional(S.Boolean),
    SizeFlexEligible: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ESInstanceDetails",
}) as any as S.Schema<ESInstanceDetails>;
export interface MemoryDBInstanceDetails {
  Family?: string;
  NodeType?: string;
  Region?: string;
  CurrentGeneration?: boolean;
  SizeFlexEligible?: boolean;
}
export const MemoryDBInstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Family: S.optional(S.String),
    NodeType: S.optional(S.String),
    Region: S.optional(S.String),
    CurrentGeneration: S.optional(S.Boolean),
    SizeFlexEligible: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "MemoryDBInstanceDetails",
}) as any as S.Schema<MemoryDBInstanceDetails>;
export interface InstanceDetails {
  EC2InstanceDetails?: EC2InstanceDetails;
  RDSInstanceDetails?: RDSInstanceDetails;
  RedshiftInstanceDetails?: RedshiftInstanceDetails;
  ElastiCacheInstanceDetails?: ElastiCacheInstanceDetails;
  ESInstanceDetails?: ESInstanceDetails;
  MemoryDBInstanceDetails?: MemoryDBInstanceDetails;
}
export const InstanceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EC2InstanceDetails: S.optional(EC2InstanceDetails),
    RDSInstanceDetails: S.optional(RDSInstanceDetails),
    RedshiftInstanceDetails: S.optional(RedshiftInstanceDetails),
    ElastiCacheInstanceDetails: S.optional(ElastiCacheInstanceDetails),
    ESInstanceDetails: S.optional(ESInstanceDetails),
    MemoryDBInstanceDetails: S.optional(MemoryDBInstanceDetails),
  }),
).annotate({
  identifier: "InstanceDetails",
}) as any as S.Schema<InstanceDetails>;
export interface DynamoDBCapacityDetails {
  CapacityUnits?: string;
  Region?: string;
}
export const DynamoDBCapacityDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CapacityUnits: S.optional(S.String),
    Region: S.optional(S.String),
  }),
).annotate({
  identifier: "DynamoDBCapacityDetails",
}) as any as S.Schema<DynamoDBCapacityDetails>;
export interface ReservedCapacityDetails {
  DynamoDBCapacityDetails?: DynamoDBCapacityDetails;
}
export const ReservedCapacityDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DynamoDBCapacityDetails: S.optional(DynamoDBCapacityDetails) }),
).annotate({
  identifier: "ReservedCapacityDetails",
}) as any as S.Schema<ReservedCapacityDetails>;
export interface ReservationPurchaseRecommendationDetail {
  AccountId?: string;
  InstanceDetails?: InstanceDetails;
  RecommendedNumberOfInstancesToPurchase?: string;
  RecommendedNormalizedUnitsToPurchase?: string;
  MinimumNumberOfInstancesUsedPerHour?: string;
  MinimumNormalizedUnitsUsedPerHour?: string;
  MaximumNumberOfInstancesUsedPerHour?: string;
  MaximumNormalizedUnitsUsedPerHour?: string;
  AverageNumberOfInstancesUsedPerHour?: string;
  AverageNormalizedUnitsUsedPerHour?: string;
  AverageUtilization?: string;
  EstimatedBreakEvenInMonths?: string;
  CurrencyCode?: string;
  EstimatedMonthlySavingsAmount?: string;
  EstimatedMonthlySavingsPercentage?: string;
  EstimatedMonthlyOnDemandCost?: string;
  EstimatedReservationCostForLookbackPeriod?: string;
  UpfrontCost?: string;
  RecurringStandardMonthlyCost?: string;
  ReservedCapacityDetails?: ReservedCapacityDetails;
  RecommendedNumberOfCapacityUnitsToPurchase?: string;
  MinimumNumberOfCapacityUnitsUsedPerHour?: string;
  MaximumNumberOfCapacityUnitsUsedPerHour?: string;
  AverageNumberOfCapacityUnitsUsedPerHour?: string;
}
export const ReservationPurchaseRecommendationDetail = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AccountId: S.optional(S.String),
      InstanceDetails: S.optional(InstanceDetails),
      RecommendedNumberOfInstancesToPurchase: S.optional(S.String),
      RecommendedNormalizedUnitsToPurchase: S.optional(S.String),
      MinimumNumberOfInstancesUsedPerHour: S.optional(S.String),
      MinimumNormalizedUnitsUsedPerHour: S.optional(S.String),
      MaximumNumberOfInstancesUsedPerHour: S.optional(S.String),
      MaximumNormalizedUnitsUsedPerHour: S.optional(S.String),
      AverageNumberOfInstancesUsedPerHour: S.optional(S.String),
      AverageNormalizedUnitsUsedPerHour: S.optional(S.String),
      AverageUtilization: S.optional(S.String),
      EstimatedBreakEvenInMonths: S.optional(S.String),
      CurrencyCode: S.optional(S.String),
      EstimatedMonthlySavingsAmount: S.optional(S.String),
      EstimatedMonthlySavingsPercentage: S.optional(S.String),
      EstimatedMonthlyOnDemandCost: S.optional(S.String),
      EstimatedReservationCostForLookbackPeriod: S.optional(S.String),
      UpfrontCost: S.optional(S.String),
      RecurringStandardMonthlyCost: S.optional(S.String),
      ReservedCapacityDetails: S.optional(ReservedCapacityDetails),
      RecommendedNumberOfCapacityUnitsToPurchase: S.optional(S.String),
      MinimumNumberOfCapacityUnitsUsedPerHour: S.optional(S.String),
      MaximumNumberOfCapacityUnitsUsedPerHour: S.optional(S.String),
      AverageNumberOfCapacityUnitsUsedPerHour: S.optional(S.String),
    }),
).annotate({
  identifier: "ReservationPurchaseRecommendationDetail",
}) as any as S.Schema<ReservationPurchaseRecommendationDetail>;
export type ReservationPurchaseRecommendationDetails =
  ReservationPurchaseRecommendationDetail[];
export const ReservationPurchaseRecommendationDetails = /*@__PURE__*/ S.Array(
  ReservationPurchaseRecommendationDetail,
);
export interface ReservationPurchaseRecommendationSummary {
  TotalEstimatedMonthlySavingsAmount?: string;
  TotalEstimatedMonthlySavingsPercentage?: string;
  CurrencyCode?: string;
}
export const ReservationPurchaseRecommendationSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TotalEstimatedMonthlySavingsAmount: S.optional(S.String),
      TotalEstimatedMonthlySavingsPercentage: S.optional(S.String),
      CurrencyCode: S.optional(S.String),
    }),
).annotate({
  identifier: "ReservationPurchaseRecommendationSummary",
}) as any as S.Schema<ReservationPurchaseRecommendationSummary>;
export interface ReservationPurchaseRecommendation {
  AccountScope?: AccountScope;
  LookbackPeriodInDays?: LookbackPeriodInDays;
  TermInYears?: TermInYears;
  PaymentOption?: PaymentOption;
  ServiceSpecification?: ServiceSpecification;
  RecommendationDetails?: ReservationPurchaseRecommendationDetail[];
  RecommendationSummary?: ReservationPurchaseRecommendationSummary;
}
export const ReservationPurchaseRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountScope: S.optional(AccountScope),
    LookbackPeriodInDays: S.optional(LookbackPeriodInDays),
    TermInYears: S.optional(TermInYears),
    PaymentOption: S.optional(PaymentOption),
    ServiceSpecification: S.optional(ServiceSpecification),
    RecommendationDetails: S.optional(ReservationPurchaseRecommendationDetails),
    RecommendationSummary: S.optional(ReservationPurchaseRecommendationSummary),
  }),
).annotate({
  identifier: "ReservationPurchaseRecommendation",
}) as any as S.Schema<ReservationPurchaseRecommendation>;
export type ReservationPurchaseRecommendations =
  ReservationPurchaseRecommendation[];
export const ReservationPurchaseRecommendations = /*@__PURE__*/ S.Array(
  ReservationPurchaseRecommendation,
);
export interface GetReservationPurchaseRecommendationResponse {
  Metadata?: ReservationPurchaseRecommendationMetadata;
  Recommendations?: ReservationPurchaseRecommendation[];
  NextPageToken?: string;
}
export const GetReservationPurchaseRecommendationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Metadata: S.optional(ReservationPurchaseRecommendationMetadata),
      Recommendations: S.optional(ReservationPurchaseRecommendations),
      NextPageToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetReservationPurchaseRecommendationResponse",
  }) as any as S.Schema<GetReservationPurchaseRecommendationResponse>;
export interface GetReservationUtilizationRequest {
  TimePeriod: DateInterval;
  GroupBy?: GroupDefinition[];
  Granularity?: Granularity;
  Filter?: Expression;
  SortBy?: SortDefinition;
  NextPageToken?: string;
  MaxResults?: number;
}
export const GetReservationUtilizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: DateInterval,
    GroupBy: S.optional(GroupDefinitions),
    Granularity: S.optional(Granularity),
    Filter: S.optional(Expression),
    SortBy: S.optional(SortDefinition),
    NextPageToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetReservationUtilizationRequest",
}) as any as S.Schema<GetReservationUtilizationRequest>;
export type ReservationGroupKey = string;
export type ReservationGroupValue = string;
export type UtilizationPercentage = string;
export type UtilizationPercentageInUnits = string;
export type PurchasedHours = string;
export type PurchasedUnits = string;
export type TotalActualHours = string;
export type TotalActualUnits = string;
export type UnusedHours = string;
export type UnusedUnits = string;
export type OnDemandCostOfRIHoursUsed = string;
export type NetRISavings = string;
export type TotalPotentialRISavings = string;
export type AmortizedUpfrontFee = string;
export type AmortizedRecurringFee = string;
export type TotalAmortizedFee = string;
export type RICostForUnusedHours = string;
export type RealizedSavings = string;
export type UnrealizedSavings = string;
export interface ReservationAggregates {
  UtilizationPercentage?: string;
  UtilizationPercentageInUnits?: string;
  PurchasedHours?: string;
  PurchasedUnits?: string;
  TotalActualHours?: string;
  TotalActualUnits?: string;
  UnusedHours?: string;
  UnusedUnits?: string;
  OnDemandCostOfRIHoursUsed?: string;
  NetRISavings?: string;
  TotalPotentialRISavings?: string;
  AmortizedUpfrontFee?: string;
  AmortizedRecurringFee?: string;
  TotalAmortizedFee?: string;
  RICostForUnusedHours?: string;
  RealizedSavings?: string;
  UnrealizedSavings?: string;
}
export const ReservationAggregates = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UtilizationPercentage: S.optional(S.String),
    UtilizationPercentageInUnits: S.optional(S.String),
    PurchasedHours: S.optional(S.String),
    PurchasedUnits: S.optional(S.String),
    TotalActualHours: S.optional(S.String),
    TotalActualUnits: S.optional(S.String),
    UnusedHours: S.optional(S.String),
    UnusedUnits: S.optional(S.String),
    OnDemandCostOfRIHoursUsed: S.optional(S.String),
    NetRISavings: S.optional(S.String),
    TotalPotentialRISavings: S.optional(S.String),
    AmortizedUpfrontFee: S.optional(S.String),
    AmortizedRecurringFee: S.optional(S.String),
    TotalAmortizedFee: S.optional(S.String),
    RICostForUnusedHours: S.optional(S.String),
    RealizedSavings: S.optional(S.String),
    UnrealizedSavings: S.optional(S.String),
  }),
).annotate({
  identifier: "ReservationAggregates",
}) as any as S.Schema<ReservationAggregates>;
export interface ReservationUtilizationGroup {
  Key?: string;
  Value?: string;
  Attributes?: { [key: string]: string | undefined };
  Utilization?: ReservationAggregates;
}
export const ReservationUtilizationGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Value: S.optional(S.String),
    Attributes: S.optional(Attributes),
    Utilization: S.optional(ReservationAggregates),
  }),
).annotate({
  identifier: "ReservationUtilizationGroup",
}) as any as S.Schema<ReservationUtilizationGroup>;
export type ReservationUtilizationGroups = ReservationUtilizationGroup[];
export const ReservationUtilizationGroups = /*@__PURE__*/ S.Array(
  ReservationUtilizationGroup,
);
export interface UtilizationByTime {
  TimePeriod?: DateInterval;
  Groups?: ReservationUtilizationGroup[];
  Total?: ReservationAggregates;
}
export const UtilizationByTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: S.optional(DateInterval),
    Groups: S.optional(ReservationUtilizationGroups),
    Total: S.optional(ReservationAggregates),
  }),
).annotate({
  identifier: "UtilizationByTime",
}) as any as S.Schema<UtilizationByTime>;
export type UtilizationsByTime = UtilizationByTime[];
export const UtilizationsByTime = /*@__PURE__*/ S.Array(UtilizationByTime);
export interface GetReservationUtilizationResponse {
  UtilizationsByTime: UtilizationByTime[];
  Total?: ReservationAggregates;
  NextPageToken?: string;
}
export const GetReservationUtilizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UtilizationsByTime: UtilizationsByTime,
    Total: S.optional(ReservationAggregates),
    NextPageToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetReservationUtilizationResponse",
}) as any as S.Schema<GetReservationUtilizationResponse>;
export type RecommendationTarget =
  | "SAME_INSTANCE_FAMILY"
  | "CROSS_INSTANCE_FAMILY"
  | (string & {});
export const RecommendationTarget = S.String;

export interface RightsizingRecommendationConfiguration {
  RecommendationTarget: RecommendationTarget;
  BenefitsConsidered: boolean;
}
export const RightsizingRecommendationConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RecommendationTarget: RecommendationTarget,
      BenefitsConsidered: S.Boolean,
    }),
).annotate({
  identifier: "RightsizingRecommendationConfiguration",
}) as any as S.Schema<RightsizingRecommendationConfiguration>;
export interface GetRightsizingRecommendationRequest {
  Filter?: Expression;
  Configuration?: RightsizingRecommendationConfiguration;
  Service: string;
  PageSize?: number;
  NextPageToken?: string;
}
export const GetRightsizingRecommendationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filter: S.optional(Expression),
    Configuration: S.optional(RightsizingRecommendationConfiguration),
    Service: S.String,
    PageSize: S.optional(S.Number),
    NextPageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetRightsizingRecommendationRequest",
}) as any as S.Schema<GetRightsizingRecommendationRequest>;
export interface RightsizingRecommendationMetadata {
  RecommendationId?: string;
  GenerationTimestamp?: string;
  LookbackPeriodInDays?: LookbackPeriodInDays;
  AdditionalMetadata?: string;
}
export const RightsizingRecommendationMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecommendationId: S.optional(S.String),
    GenerationTimestamp: S.optional(S.String),
    LookbackPeriodInDays: S.optional(LookbackPeriodInDays),
    AdditionalMetadata: S.optional(S.String),
  }),
).annotate({
  identifier: "RightsizingRecommendationMetadata",
}) as any as S.Schema<RightsizingRecommendationMetadata>;
export interface RightsizingRecommendationSummary {
  TotalRecommendationCount?: string;
  EstimatedTotalMonthlySavingsAmount?: string;
  SavingsCurrencyCode?: string;
  SavingsPercentage?: string;
}
export const RightsizingRecommendationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalRecommendationCount: S.optional(S.String),
    EstimatedTotalMonthlySavingsAmount: S.optional(S.String),
    SavingsCurrencyCode: S.optional(S.String),
    SavingsPercentage: S.optional(S.String),
  }),
).annotate({
  identifier: "RightsizingRecommendationSummary",
}) as any as S.Schema<RightsizingRecommendationSummary>;
export type TagValuesList = TagValues[];
export const TagValuesList = /*@__PURE__*/ S.Array(TagValues);
export interface EC2ResourceDetails {
  HourlyOnDemandRate?: string;
  InstanceType?: string;
  Platform?: string;
  Region?: string;
  Sku?: string;
  Memory?: string;
  NetworkPerformance?: string;
  Storage?: string;
  Vcpu?: string;
}
export const EC2ResourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HourlyOnDemandRate: S.optional(S.String),
    InstanceType: S.optional(S.String),
    Platform: S.optional(S.String),
    Region: S.optional(S.String),
    Sku: S.optional(S.String),
    Memory: S.optional(S.String),
    NetworkPerformance: S.optional(S.String),
    Storage: S.optional(S.String),
    Vcpu: S.optional(S.String),
  }),
).annotate({
  identifier: "EC2ResourceDetails",
}) as any as S.Schema<EC2ResourceDetails>;
export interface ResourceDetails {
  EC2ResourceDetails?: EC2ResourceDetails;
}
export const ResourceDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EC2ResourceDetails: S.optional(EC2ResourceDetails) }),
).annotate({
  identifier: "ResourceDetails",
}) as any as S.Schema<ResourceDetails>;
export interface EBSResourceUtilization {
  EbsReadOpsPerSecond?: string;
  EbsWriteOpsPerSecond?: string;
  EbsReadBytesPerSecond?: string;
  EbsWriteBytesPerSecond?: string;
}
export const EBSResourceUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EbsReadOpsPerSecond: S.optional(S.String),
    EbsWriteOpsPerSecond: S.optional(S.String),
    EbsReadBytesPerSecond: S.optional(S.String),
    EbsWriteBytesPerSecond: S.optional(S.String),
  }),
).annotate({
  identifier: "EBSResourceUtilization",
}) as any as S.Schema<EBSResourceUtilization>;
export interface DiskResourceUtilization {
  DiskReadOpsPerSecond?: string;
  DiskWriteOpsPerSecond?: string;
  DiskReadBytesPerSecond?: string;
  DiskWriteBytesPerSecond?: string;
}
export const DiskResourceUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DiskReadOpsPerSecond: S.optional(S.String),
    DiskWriteOpsPerSecond: S.optional(S.String),
    DiskReadBytesPerSecond: S.optional(S.String),
    DiskWriteBytesPerSecond: S.optional(S.String),
  }),
).annotate({
  identifier: "DiskResourceUtilization",
}) as any as S.Schema<DiskResourceUtilization>;
export interface NetworkResourceUtilization {
  NetworkInBytesPerSecond?: string;
  NetworkOutBytesPerSecond?: string;
  NetworkPacketsInPerSecond?: string;
  NetworkPacketsOutPerSecond?: string;
}
export const NetworkResourceUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkInBytesPerSecond: S.optional(S.String),
    NetworkOutBytesPerSecond: S.optional(S.String),
    NetworkPacketsInPerSecond: S.optional(S.String),
    NetworkPacketsOutPerSecond: S.optional(S.String),
  }),
).annotate({
  identifier: "NetworkResourceUtilization",
}) as any as S.Schema<NetworkResourceUtilization>;
export interface EC2ResourceUtilization {
  MaxCpuUtilizationPercentage?: string;
  MaxMemoryUtilizationPercentage?: string;
  MaxStorageUtilizationPercentage?: string;
  EBSResourceUtilization?: EBSResourceUtilization;
  DiskResourceUtilization?: DiskResourceUtilization;
  NetworkResourceUtilization?: NetworkResourceUtilization;
}
export const EC2ResourceUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxCpuUtilizationPercentage: S.optional(S.String),
    MaxMemoryUtilizationPercentage: S.optional(S.String),
    MaxStorageUtilizationPercentage: S.optional(S.String),
    EBSResourceUtilization: S.optional(EBSResourceUtilization),
    DiskResourceUtilization: S.optional(DiskResourceUtilization),
    NetworkResourceUtilization: S.optional(NetworkResourceUtilization),
  }),
).annotate({
  identifier: "EC2ResourceUtilization",
}) as any as S.Schema<EC2ResourceUtilization>;
export interface ResourceUtilization {
  EC2ResourceUtilization?: EC2ResourceUtilization;
}
export const ResourceUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EC2ResourceUtilization: S.optional(EC2ResourceUtilization) }),
).annotate({
  identifier: "ResourceUtilization",
}) as any as S.Schema<ResourceUtilization>;
export interface CurrentInstance {
  ResourceId?: string;
  InstanceName?: string;
  Tags?: TagValues[];
  ResourceDetails?: ResourceDetails;
  ResourceUtilization?: ResourceUtilization;
  ReservationCoveredHoursInLookbackPeriod?: string;
  SavingsPlansCoveredHoursInLookbackPeriod?: string;
  OnDemandHoursInLookbackPeriod?: string;
  TotalRunningHoursInLookbackPeriod?: string;
  MonthlyCost?: string;
  CurrencyCode?: string;
}
export const CurrentInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceId: S.optional(S.String),
    InstanceName: S.optional(S.String),
    Tags: S.optional(TagValuesList),
    ResourceDetails: S.optional(ResourceDetails),
    ResourceUtilization: S.optional(ResourceUtilization),
    ReservationCoveredHoursInLookbackPeriod: S.optional(S.String),
    SavingsPlansCoveredHoursInLookbackPeriod: S.optional(S.String),
    OnDemandHoursInLookbackPeriod: S.optional(S.String),
    TotalRunningHoursInLookbackPeriod: S.optional(S.String),
    MonthlyCost: S.optional(S.String),
    CurrencyCode: S.optional(S.String),
  }),
).annotate({
  identifier: "CurrentInstance",
}) as any as S.Schema<CurrentInstance>;
export type RightsizingType = "TERMINATE" | "MODIFY" | (string & {});
export const RightsizingType = S.String;

export type PlatformDifference =
  | "HYPERVISOR"
  | "NETWORK_INTERFACE"
  | "STORAGE_INTERFACE"
  | "INSTANCE_STORE_AVAILABILITY"
  | "VIRTUALIZATION_TYPE"
  | (string & {});
export const PlatformDifference = S.String;

export type PlatformDifferences = PlatformDifference[];
export const PlatformDifferences = /*@__PURE__*/ S.Array(PlatformDifference);
export interface TargetInstance {
  EstimatedMonthlyCost?: string;
  EstimatedMonthlySavings?: string;
  CurrencyCode?: string;
  DefaultTargetInstance?: boolean;
  ResourceDetails?: ResourceDetails;
  ExpectedResourceUtilization?: ResourceUtilization;
  PlatformDifferences?: PlatformDifference[];
}
export const TargetInstance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EstimatedMonthlyCost: S.optional(S.String),
    EstimatedMonthlySavings: S.optional(S.String),
    CurrencyCode: S.optional(S.String),
    DefaultTargetInstance: S.optional(S.Boolean),
    ResourceDetails: S.optional(ResourceDetails),
    ExpectedResourceUtilization: S.optional(ResourceUtilization),
    PlatformDifferences: S.optional(PlatformDifferences),
  }),
).annotate({ identifier: "TargetInstance" }) as any as S.Schema<TargetInstance>;
export type TargetInstancesList = TargetInstance[];
export const TargetInstancesList = /*@__PURE__*/ S.Array(TargetInstance);
export interface ModifyRecommendationDetail {
  TargetInstances?: TargetInstance[];
}
export const ModifyRecommendationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TargetInstances: S.optional(TargetInstancesList) }),
).annotate({
  identifier: "ModifyRecommendationDetail",
}) as any as S.Schema<ModifyRecommendationDetail>;
export interface TerminateRecommendationDetail {
  EstimatedMonthlySavings?: string;
  CurrencyCode?: string;
}
export const TerminateRecommendationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EstimatedMonthlySavings: S.optional(S.String),
    CurrencyCode: S.optional(S.String),
  }),
).annotate({
  identifier: "TerminateRecommendationDetail",
}) as any as S.Schema<TerminateRecommendationDetail>;
export type FindingReasonCode =
  | "CPU_OVER_PROVISIONED"
  | "CPU_UNDER_PROVISIONED"
  | "MEMORY_OVER_PROVISIONED"
  | "MEMORY_UNDER_PROVISIONED"
  | "EBS_THROUGHPUT_OVER_PROVISIONED"
  | "EBS_THROUGHPUT_UNDER_PROVISIONED"
  | "EBS_IOPS_OVER_PROVISIONED"
  | "EBS_IOPS_UNDER_PROVISIONED"
  | "NETWORK_BANDWIDTH_OVER_PROVISIONED"
  | "NETWORK_BANDWIDTH_UNDER_PROVISIONED"
  | "NETWORK_PPS_OVER_PROVISIONED"
  | "NETWORK_PPS_UNDER_PROVISIONED"
  | "DISK_IOPS_OVER_PROVISIONED"
  | "DISK_IOPS_UNDER_PROVISIONED"
  | "DISK_THROUGHPUT_OVER_PROVISIONED"
  | "DISK_THROUGHPUT_UNDER_PROVISIONED"
  | (string & {});
export const FindingReasonCode = S.String;

export type FindingReasonCodes = FindingReasonCode[];
export const FindingReasonCodes = /*@__PURE__*/ S.Array(FindingReasonCode);
export interface RightsizingRecommendation {
  AccountId?: string;
  CurrentInstance?: CurrentInstance;
  RightsizingType?: RightsizingType;
  ModifyRecommendationDetail?: ModifyRecommendationDetail;
  TerminateRecommendationDetail?: TerminateRecommendationDetail;
  FindingReasonCodes?: FindingReasonCode[];
}
export const RightsizingRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountId: S.optional(S.String),
    CurrentInstance: S.optional(CurrentInstance),
    RightsizingType: S.optional(RightsizingType),
    ModifyRecommendationDetail: S.optional(ModifyRecommendationDetail),
    TerminateRecommendationDetail: S.optional(TerminateRecommendationDetail),
    FindingReasonCodes: S.optional(FindingReasonCodes),
  }),
).annotate({
  identifier: "RightsizingRecommendation",
}) as any as S.Schema<RightsizingRecommendation>;
export type RightsizingRecommendationList = RightsizingRecommendation[];
export const RightsizingRecommendationList = /*@__PURE__*/ S.Array(
  RightsizingRecommendation,
);
export interface GetRightsizingRecommendationResponse {
  Metadata?: RightsizingRecommendationMetadata;
  Summary?: RightsizingRecommendationSummary;
  RightsizingRecommendations?: RightsizingRecommendation[];
  NextPageToken?: string;
  Configuration?: RightsizingRecommendationConfiguration;
}
export const GetRightsizingRecommendationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Metadata: S.optional(RightsizingRecommendationMetadata),
      Summary: S.optional(RightsizingRecommendationSummary),
      RightsizingRecommendations: S.optional(RightsizingRecommendationList),
      NextPageToken: S.optional(S.String),
      Configuration: S.optional(RightsizingRecommendationConfiguration),
    }),
).annotate({
  identifier: "GetRightsizingRecommendationResponse",
}) as any as S.Schema<GetRightsizingRecommendationResponse>;
export type RecommendationDetailId = string;
export interface GetSavingsPlanPurchaseRecommendationDetailsRequest {
  RecommendationDetailId: string;
}
export const GetSavingsPlanPurchaseRecommendationDetailsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ RecommendationDetailId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetSavingsPlanPurchaseRecommendationDetailsRequest",
  }) as any as S.Schema<GetSavingsPlanPurchaseRecommendationDetailsRequest>;
export interface RecommendationDetailData {
  AccountScope?: AccountScope;
  LookbackPeriodInDays?: LookbackPeriodInDays;
  SavingsPlansType?: SupportedSavingsPlansType;
  TermInYears?: TermInYears;
  PaymentOption?: PaymentOption;
  AccountId?: string;
  CurrencyCode?: string;
  InstanceFamily?: string;
  Region?: string;
  OfferingId?: string;
  GenerationTimestamp?: string;
  LatestUsageTimestamp?: string;
  CurrentAverageHourlyOnDemandSpend?: string;
  CurrentMaximumHourlyOnDemandSpend?: string;
  CurrentMinimumHourlyOnDemandSpend?: string;
  EstimatedAverageUtilization?: string;
  EstimatedMonthlySavingsAmount?: string;
  EstimatedOnDemandCost?: string;
  EstimatedOnDemandCostWithCurrentCommitment?: string;
  EstimatedROI?: string;
  EstimatedSPCost?: string;
  EstimatedSavingsAmount?: string;
  EstimatedSavingsPercentage?: string;
  ExistingHourlyCommitment?: string;
  HourlyCommitmentToPurchase?: string;
  UpfrontCost?: string;
  CurrentAverageCoverage?: string;
  EstimatedAverageCoverage?: string;
  MetricsOverLookbackPeriod?: RecommendationDetailHourlyMetrics[];
}
export const RecommendationDetailData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountScope: S.optional(AccountScope),
    LookbackPeriodInDays: S.optional(LookbackPeriodInDays),
    SavingsPlansType: S.optional(SupportedSavingsPlansType),
    TermInYears: S.optional(TermInYears),
    PaymentOption: S.optional(PaymentOption),
    AccountId: S.optional(S.String),
    CurrencyCode: S.optional(S.String),
    InstanceFamily: S.optional(S.String),
    Region: S.optional(S.String),
    OfferingId: S.optional(S.String),
    GenerationTimestamp: S.optional(S.String),
    LatestUsageTimestamp: S.optional(S.String),
    CurrentAverageHourlyOnDemandSpend: S.optional(S.String),
    CurrentMaximumHourlyOnDemandSpend: S.optional(S.String),
    CurrentMinimumHourlyOnDemandSpend: S.optional(S.String),
    EstimatedAverageUtilization: S.optional(S.String),
    EstimatedMonthlySavingsAmount: S.optional(S.String),
    EstimatedOnDemandCost: S.optional(S.String),
    EstimatedOnDemandCostWithCurrentCommitment: S.optional(S.String),
    EstimatedROI: S.optional(S.String),
    EstimatedSPCost: S.optional(S.String),
    EstimatedSavingsAmount: S.optional(S.String),
    EstimatedSavingsPercentage: S.optional(S.String),
    ExistingHourlyCommitment: S.optional(S.String),
    HourlyCommitmentToPurchase: S.optional(S.String),
    UpfrontCost: S.optional(S.String),
    CurrentAverageCoverage: S.optional(S.String),
    EstimatedAverageCoverage: S.optional(S.String),
    MetricsOverLookbackPeriod: S.optional(MetricsOverLookbackPeriod),
  }),
).annotate({
  identifier: "RecommendationDetailData",
}) as any as S.Schema<RecommendationDetailData>;
export interface GetSavingsPlanPurchaseRecommendationDetailsResponse {
  RecommendationDetailId?: string;
  RecommendationDetailData?: RecommendationDetailData;
}
export const GetSavingsPlanPurchaseRecommendationDetailsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RecommendationDetailId: S.optional(S.String),
      RecommendationDetailData: S.optional(RecommendationDetailData),
    }),
  ).annotate({
    identifier: "GetSavingsPlanPurchaseRecommendationDetailsResponse",
  }) as any as S.Schema<GetSavingsPlanPurchaseRecommendationDetailsResponse>;
export interface GetSavingsPlansCoverageRequest {
  TimePeriod: DateInterval;
  GroupBy?: GroupDefinition[];
  Granularity?: Granularity;
  Filter?: Expression;
  Metrics?: string[];
  NextToken?: string;
  MaxResults?: number;
  SortBy?: SortDefinition;
}
export const GetSavingsPlansCoverageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: DateInterval,
    GroupBy: S.optional(GroupDefinitions),
    Granularity: S.optional(Granularity),
    Filter: S.optional(Expression),
    Metrics: S.optional(MetricNames),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    SortBy: S.optional(SortDefinition),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSavingsPlansCoverageRequest",
}) as any as S.Schema<GetSavingsPlansCoverageRequest>;
export interface SavingsPlansCoverageData {
  SpendCoveredBySavingsPlans?: string;
  OnDemandCost?: string;
  TotalCost?: string;
  CoveragePercentage?: string;
}
export const SavingsPlansCoverageData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SpendCoveredBySavingsPlans: S.optional(S.String),
    OnDemandCost: S.optional(S.String),
    TotalCost: S.optional(S.String),
    CoveragePercentage: S.optional(S.String),
  }),
).annotate({
  identifier: "SavingsPlansCoverageData",
}) as any as S.Schema<SavingsPlansCoverageData>;
export interface SavingsPlansCoverage {
  Attributes?: { [key: string]: string | undefined };
  Coverage?: SavingsPlansCoverageData;
  TimePeriod?: DateInterval;
}
export const SavingsPlansCoverage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(Attributes),
    Coverage: S.optional(SavingsPlansCoverageData),
    TimePeriod: S.optional(DateInterval),
  }),
).annotate({
  identifier: "SavingsPlansCoverage",
}) as any as S.Schema<SavingsPlansCoverage>;
export type SavingsPlansCoverages = SavingsPlansCoverage[];
export const SavingsPlansCoverages =
  /*@__PURE__*/ S.Array(SavingsPlansCoverage);
export interface GetSavingsPlansCoverageResponse {
  SavingsPlansCoverages: SavingsPlansCoverage[];
  NextToken?: string;
}
export const GetSavingsPlansCoverageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SavingsPlansCoverages: SavingsPlansCoverages,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSavingsPlansCoverageResponse",
}) as any as S.Schema<GetSavingsPlansCoverageResponse>;
export interface GetSavingsPlansPurchaseRecommendationRequest {
  SavingsPlansType: SupportedSavingsPlansType;
  TermInYears: TermInYears;
  PaymentOption: PaymentOption;
  AccountScope?: AccountScope;
  NextPageToken?: string;
  PageSize?: number;
  LookbackPeriodInDays: LookbackPeriodInDays;
  Filter?: Expression;
}
export const GetSavingsPlansPurchaseRecommendationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      SavingsPlansType: SupportedSavingsPlansType,
      TermInYears: TermInYears,
      PaymentOption: PaymentOption,
      AccountScope: S.optional(AccountScope),
      NextPageToken: S.optional(S.String),
      PageSize: S.optional(S.Number),
      LookbackPeriodInDays: LookbackPeriodInDays,
      Filter: S.optional(Expression),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetSavingsPlansPurchaseRecommendationRequest",
  }) as any as S.Schema<GetSavingsPlansPurchaseRecommendationRequest>;
export interface SavingsPlansPurchaseRecommendationMetadata {
  RecommendationId?: string;
  GenerationTimestamp?: string;
  AdditionalMetadata?: string;
}
export const SavingsPlansPurchaseRecommendationMetadata =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RecommendationId: S.optional(S.String),
      GenerationTimestamp: S.optional(S.String),
      AdditionalMetadata: S.optional(S.String),
    }),
  ).annotate({
    identifier: "SavingsPlansPurchaseRecommendationMetadata",
  }) as any as S.Schema<SavingsPlansPurchaseRecommendationMetadata>;
export interface SavingsPlansDetails {
  Region?: string;
  InstanceFamily?: string;
  OfferingId?: string;
}
export const SavingsPlansDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Region: S.optional(S.String),
    InstanceFamily: S.optional(S.String),
    OfferingId: S.optional(S.String),
  }),
).annotate({
  identifier: "SavingsPlansDetails",
}) as any as S.Schema<SavingsPlansDetails>;
export interface SavingsPlansPurchaseRecommendationDetail {
  SavingsPlansDetails?: SavingsPlansDetails;
  AccountId?: string;
  UpfrontCost?: string;
  EstimatedROI?: string;
  CurrencyCode?: string;
  EstimatedSPCost?: string;
  EstimatedOnDemandCost?: string;
  EstimatedOnDemandCostWithCurrentCommitment?: string;
  EstimatedSavingsAmount?: string;
  EstimatedSavingsPercentage?: string;
  HourlyCommitmentToPurchase?: string;
  EstimatedAverageUtilization?: string;
  EstimatedMonthlySavingsAmount?: string;
  CurrentMinimumHourlyOnDemandSpend?: string;
  CurrentMaximumHourlyOnDemandSpend?: string;
  CurrentAverageHourlyOnDemandSpend?: string;
  RecommendationDetailId?: string;
}
export const SavingsPlansPurchaseRecommendationDetail = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SavingsPlansDetails: S.optional(SavingsPlansDetails),
      AccountId: S.optional(S.String),
      UpfrontCost: S.optional(S.String),
      EstimatedROI: S.optional(S.String),
      CurrencyCode: S.optional(S.String),
      EstimatedSPCost: S.optional(S.String),
      EstimatedOnDemandCost: S.optional(S.String),
      EstimatedOnDemandCostWithCurrentCommitment: S.optional(S.String),
      EstimatedSavingsAmount: S.optional(S.String),
      EstimatedSavingsPercentage: S.optional(S.String),
      HourlyCommitmentToPurchase: S.optional(S.String),
      EstimatedAverageUtilization: S.optional(S.String),
      EstimatedMonthlySavingsAmount: S.optional(S.String),
      CurrentMinimumHourlyOnDemandSpend: S.optional(S.String),
      CurrentMaximumHourlyOnDemandSpend: S.optional(S.String),
      CurrentAverageHourlyOnDemandSpend: S.optional(S.String),
      RecommendationDetailId: S.optional(S.String),
    }),
).annotate({
  identifier: "SavingsPlansPurchaseRecommendationDetail",
}) as any as S.Schema<SavingsPlansPurchaseRecommendationDetail>;
export type SavingsPlansPurchaseRecommendationDetailList =
  SavingsPlansPurchaseRecommendationDetail[];
export const SavingsPlansPurchaseRecommendationDetailList =
  /*@__PURE__*/ S.Array(SavingsPlansPurchaseRecommendationDetail);
export interface SavingsPlansPurchaseRecommendationSummary {
  EstimatedROI?: string;
  CurrencyCode?: string;
  EstimatedTotalCost?: string;
  CurrentOnDemandSpend?: string;
  EstimatedSavingsAmount?: string;
  TotalRecommendationCount?: string;
  DailyCommitmentToPurchase?: string;
  HourlyCommitmentToPurchase?: string;
  EstimatedSavingsPercentage?: string;
  EstimatedMonthlySavingsAmount?: string;
  EstimatedOnDemandCostWithCurrentCommitment?: string;
}
export const SavingsPlansPurchaseRecommendationSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EstimatedROI: S.optional(S.String),
      CurrencyCode: S.optional(S.String),
      EstimatedTotalCost: S.optional(S.String),
      CurrentOnDemandSpend: S.optional(S.String),
      EstimatedSavingsAmount: S.optional(S.String),
      TotalRecommendationCount: S.optional(S.String),
      DailyCommitmentToPurchase: S.optional(S.String),
      HourlyCommitmentToPurchase: S.optional(S.String),
      EstimatedSavingsPercentage: S.optional(S.String),
      EstimatedMonthlySavingsAmount: S.optional(S.String),
      EstimatedOnDemandCostWithCurrentCommitment: S.optional(S.String),
    }),
  ).annotate({
    identifier: "SavingsPlansPurchaseRecommendationSummary",
  }) as any as S.Schema<SavingsPlansPurchaseRecommendationSummary>;
export interface SavingsPlansPurchaseRecommendation {
  AccountScope?: AccountScope;
  SavingsPlansType?: SupportedSavingsPlansType;
  TermInYears?: TermInYears;
  PaymentOption?: PaymentOption;
  LookbackPeriodInDays?: LookbackPeriodInDays;
  SavingsPlansPurchaseRecommendationDetails?: SavingsPlansPurchaseRecommendationDetail[];
  SavingsPlansPurchaseRecommendationSummary?: SavingsPlansPurchaseRecommendationSummary;
}
export const SavingsPlansPurchaseRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountScope: S.optional(AccountScope),
    SavingsPlansType: S.optional(SupportedSavingsPlansType),
    TermInYears: S.optional(TermInYears),
    PaymentOption: S.optional(PaymentOption),
    LookbackPeriodInDays: S.optional(LookbackPeriodInDays),
    SavingsPlansPurchaseRecommendationDetails: S.optional(
      SavingsPlansPurchaseRecommendationDetailList,
    ),
    SavingsPlansPurchaseRecommendationSummary: S.optional(
      SavingsPlansPurchaseRecommendationSummary,
    ),
  }),
).annotate({
  identifier: "SavingsPlansPurchaseRecommendation",
}) as any as S.Schema<SavingsPlansPurchaseRecommendation>;
export interface GetSavingsPlansPurchaseRecommendationResponse {
  Metadata?: SavingsPlansPurchaseRecommendationMetadata;
  SavingsPlansPurchaseRecommendation?: SavingsPlansPurchaseRecommendation;
  NextPageToken?: string;
}
export const GetSavingsPlansPurchaseRecommendationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Metadata: S.optional(SavingsPlansPurchaseRecommendationMetadata),
      SavingsPlansPurchaseRecommendation: S.optional(
        SavingsPlansPurchaseRecommendation,
      ),
      NextPageToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetSavingsPlansPurchaseRecommendationResponse",
  }) as any as S.Schema<GetSavingsPlansPurchaseRecommendationResponse>;
export interface GetSavingsPlansUtilizationRequest {
  TimePeriod: DateInterval;
  Granularity?: Granularity;
  Filter?: Expression;
  SortBy?: SortDefinition;
}
export const GetSavingsPlansUtilizationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: DateInterval,
    Granularity: S.optional(Granularity),
    Filter: S.optional(Expression),
    SortBy: S.optional(SortDefinition),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetSavingsPlansUtilizationRequest",
}) as any as S.Schema<GetSavingsPlansUtilizationRequest>;
export interface SavingsPlansUtilization {
  TotalCommitment?: string;
  UsedCommitment?: string;
  UnusedCommitment?: string;
  UtilizationPercentage?: string;
}
export const SavingsPlansUtilization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TotalCommitment: S.optional(S.String),
    UsedCommitment: S.optional(S.String),
    UnusedCommitment: S.optional(S.String),
    UtilizationPercentage: S.optional(S.String),
  }),
).annotate({
  identifier: "SavingsPlansUtilization",
}) as any as S.Schema<SavingsPlansUtilization>;
export interface SavingsPlansSavings {
  NetSavings?: string;
  OnDemandCostEquivalent?: string;
}
export const SavingsPlansSavings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetSavings: S.optional(S.String),
    OnDemandCostEquivalent: S.optional(S.String),
  }),
).annotate({
  identifier: "SavingsPlansSavings",
}) as any as S.Schema<SavingsPlansSavings>;
export interface SavingsPlansAmortizedCommitment {
  AmortizedRecurringCommitment?: string;
  AmortizedUpfrontCommitment?: string;
  TotalAmortizedCommitment?: string;
}
export const SavingsPlansAmortizedCommitment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AmortizedRecurringCommitment: S.optional(S.String),
    AmortizedUpfrontCommitment: S.optional(S.String),
    TotalAmortizedCommitment: S.optional(S.String),
  }),
).annotate({
  identifier: "SavingsPlansAmortizedCommitment",
}) as any as S.Schema<SavingsPlansAmortizedCommitment>;
export interface SavingsPlansUtilizationByTime {
  TimePeriod: DateInterval;
  Utilization: SavingsPlansUtilization;
  Savings?: SavingsPlansSavings;
  AmortizedCommitment?: SavingsPlansAmortizedCommitment;
}
export const SavingsPlansUtilizationByTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: DateInterval,
    Utilization: SavingsPlansUtilization,
    Savings: S.optional(SavingsPlansSavings),
    AmortizedCommitment: S.optional(SavingsPlansAmortizedCommitment),
  }),
).annotate({
  identifier: "SavingsPlansUtilizationByTime",
}) as any as S.Schema<SavingsPlansUtilizationByTime>;
export type SavingsPlansUtilizationsByTime = SavingsPlansUtilizationByTime[];
export const SavingsPlansUtilizationsByTime = /*@__PURE__*/ S.Array(
  SavingsPlansUtilizationByTime,
);
export interface SavingsPlansUtilizationAggregates {
  Utilization: SavingsPlansUtilization;
  Savings?: SavingsPlansSavings;
  AmortizedCommitment?: SavingsPlansAmortizedCommitment;
}
export const SavingsPlansUtilizationAggregates = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Utilization: SavingsPlansUtilization,
    Savings: S.optional(SavingsPlansSavings),
    AmortizedCommitment: S.optional(SavingsPlansAmortizedCommitment),
  }),
).annotate({
  identifier: "SavingsPlansUtilizationAggregates",
}) as any as S.Schema<SavingsPlansUtilizationAggregates>;
export interface GetSavingsPlansUtilizationResponse {
  SavingsPlansUtilizationsByTime?: SavingsPlansUtilizationByTime[];
  Total: SavingsPlansUtilizationAggregates;
}
export const GetSavingsPlansUtilizationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SavingsPlansUtilizationsByTime: S.optional(SavingsPlansUtilizationsByTime),
    Total: SavingsPlansUtilizationAggregates,
  }),
).annotate({
  identifier: "GetSavingsPlansUtilizationResponse",
}) as any as S.Schema<GetSavingsPlansUtilizationResponse>;
export type SavingsPlansDataType =
  | "ATTRIBUTES"
  | "UTILIZATION"
  | "AMORTIZED_COMMITMENT"
  | "SAVINGS"
  | (string & {});
export const SavingsPlansDataType = S.String;

export type SavingsPlansDataTypes = SavingsPlansDataType[];
export const SavingsPlansDataTypes =
  /*@__PURE__*/ S.Array(SavingsPlansDataType);
export interface GetSavingsPlansUtilizationDetailsRequest {
  TimePeriod: DateInterval;
  Filter?: Expression;
  DataType?: SavingsPlansDataType[];
  NextToken?: string;
  MaxResults?: number;
  SortBy?: SortDefinition;
}
export const GetSavingsPlansUtilizationDetailsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TimePeriod: DateInterval,
      Filter: S.optional(Expression),
      DataType: S.optional(SavingsPlansDataTypes),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      SortBy: S.optional(SortDefinition),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "GetSavingsPlansUtilizationDetailsRequest",
}) as any as S.Schema<GetSavingsPlansUtilizationDetailsRequest>;
export type SavingsPlanArn = string;
export interface SavingsPlansUtilizationDetail {
  SavingsPlanArn?: string;
  Attributes?: { [key: string]: string | undefined };
  Utilization?: SavingsPlansUtilization;
  Savings?: SavingsPlansSavings;
  AmortizedCommitment?: SavingsPlansAmortizedCommitment;
}
export const SavingsPlansUtilizationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SavingsPlanArn: S.optional(S.String),
    Attributes: S.optional(Attributes),
    Utilization: S.optional(SavingsPlansUtilization),
    Savings: S.optional(SavingsPlansSavings),
    AmortizedCommitment: S.optional(SavingsPlansAmortizedCommitment),
  }),
).annotate({
  identifier: "SavingsPlansUtilizationDetail",
}) as any as S.Schema<SavingsPlansUtilizationDetail>;
export type SavingsPlansUtilizationDetails = SavingsPlansUtilizationDetail[];
export const SavingsPlansUtilizationDetails = /*@__PURE__*/ S.Array(
  SavingsPlansUtilizationDetail,
);
export interface GetSavingsPlansUtilizationDetailsResponse {
  SavingsPlansUtilizationDetails: SavingsPlansUtilizationDetail[];
  Total?: SavingsPlansUtilizationAggregates;
  TimePeriod: DateInterval;
  NextToken?: string;
}
export const GetSavingsPlansUtilizationDetailsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      SavingsPlansUtilizationDetails: SavingsPlansUtilizationDetails,
      Total: S.optional(SavingsPlansUtilizationAggregates),
      TimePeriod: DateInterval,
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "GetSavingsPlansUtilizationDetailsResponse",
  }) as any as S.Schema<GetSavingsPlansUtilizationDetailsResponse>;
export interface GetTagsRequest {
  SearchString?: string;
  TimePeriod: DateInterval;
  TagKey?: string;
  Filter?: Expression;
  SortBy?: SortDefinition[];
  BillingViewArn?: string;
  MaxResults?: number;
  NextPageToken?: string;
}
export const GetTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SearchString: S.optional(S.String),
    TimePeriod: DateInterval,
    TagKey: S.optional(S.String),
    Filter: S.optional(Expression),
    SortBy: S.optional(SortDefinitions),
    BillingViewArn: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextPageToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "GetTagsRequest" }) as any as S.Schema<GetTagsRequest>;
export type Entity = string;
export type TagList = string[];
export const TagList = /*@__PURE__*/ S.Array(S.String);
export interface GetTagsResponse {
  NextPageToken?: string;
  Tags: string[];
  ReturnSize: number;
  TotalSize: number;
}
export const GetTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextPageToken: S.optional(S.String),
    Tags: TagList,
    ReturnSize: S.Number,
    TotalSize: S.Number,
  }),
).annotate({
  identifier: "GetTagsResponse",
}) as any as S.Schema<GetTagsResponse>;
export interface GetUsageForecastRequest {
  TimePeriod: DateInterval;
  Metric: Metric;
  Granularity: Granularity;
  Filter?: Expression;
  BillingViewArn?: string;
  PredictionIntervalLevel?: number;
}
export const GetUsageForecastRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimePeriod: DateInterval,
    Metric: Metric,
    Granularity: Granularity,
    Filter: S.optional(Expression),
    BillingViewArn: S.optional(S.String),
    PredictionIntervalLevel: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetUsageForecastRequest",
}) as any as S.Schema<GetUsageForecastRequest>;
export interface GetUsageForecastResponse {
  Total?: MetricValue;
  ForecastResultsByTime?: ForecastResult[];
}
export const GetUsageForecastResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Total: S.optional(MetricValue),
    ForecastResultsByTime: S.optional(ForecastResultsByTime),
  }),
).annotate({
  identifier: "GetUsageForecastResponse",
}) as any as S.Schema<GetUsageForecastResponse>;
export type AnalysesPageSize = number;
export type AnalysisIds = string[];
export const AnalysisIds = /*@__PURE__*/ S.Array(S.String);
export interface ListCommitmentPurchaseAnalysesRequest {
  AnalysisStatus?: AnalysisStatus;
  NextPageToken?: string;
  PageSize?: number;
  AnalysisIds?: string[];
}
export const ListCommitmentPurchaseAnalysesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AnalysisStatus: S.optional(AnalysisStatus),
      NextPageToken: S.optional(S.String),
      PageSize: S.optional(S.Number),
      AnalysisIds: S.optional(AnalysisIds),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListCommitmentPurchaseAnalysesRequest",
}) as any as S.Schema<ListCommitmentPurchaseAnalysesRequest>;
export interface AnalysisSummary {
  EstimatedCompletionTime?: string;
  AnalysisCompletionTime?: string;
  AnalysisStartedTime?: string;
  AnalysisStatus?: AnalysisStatus;
  ErrorCode?: ErrorCode;
  AnalysisId?: string;
  CommitmentPurchaseAnalysisConfiguration?: CommitmentPurchaseAnalysisConfiguration;
}
export const AnalysisSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EstimatedCompletionTime: S.optional(S.String),
    AnalysisCompletionTime: S.optional(S.String),
    AnalysisStartedTime: S.optional(S.String),
    AnalysisStatus: S.optional(AnalysisStatus),
    ErrorCode: S.optional(ErrorCode),
    AnalysisId: S.optional(S.String),
    CommitmentPurchaseAnalysisConfiguration: S.optional(
      CommitmentPurchaseAnalysisConfiguration,
    ),
  }),
).annotate({
  identifier: "AnalysisSummary",
}) as any as S.Schema<AnalysisSummary>;
export type AnalysisSummaryList = AnalysisSummary[];
export const AnalysisSummaryList = /*@__PURE__*/ S.Array(AnalysisSummary);
export interface ListCommitmentPurchaseAnalysesResponse {
  AnalysisSummaryList?: AnalysisSummary[];
  NextPageToken?: string;
}
export const ListCommitmentPurchaseAnalysesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AnalysisSummaryList: S.optional(AnalysisSummaryList),
      NextPageToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListCommitmentPurchaseAnalysesResponse",
}) as any as S.Schema<ListCommitmentPurchaseAnalysesResponse>;
export type CostAllocationTagsMaxResults = number;
export interface ListCostAllocationTagBackfillHistoryRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListCostAllocationTagBackfillHistoryRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListCostAllocationTagBackfillHistoryRequest",
  }) as any as S.Schema<ListCostAllocationTagBackfillHistoryRequest>;
export type CostAllocationTagBackfillStatus =
  | "SUCCEEDED"
  | "PROCESSING"
  | "FAILED"
  | (string & {});
export const CostAllocationTagBackfillStatus = S.String;

export interface CostAllocationTagBackfillRequest {
  BackfillFrom?: string;
  RequestedAt?: string;
  CompletedAt?: string;
  BackfillStatus?: CostAllocationTagBackfillStatus;
  LastUpdatedAt?: string;
}
export const CostAllocationTagBackfillRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackfillFrom: S.optional(S.String),
    RequestedAt: S.optional(S.String),
    CompletedAt: S.optional(S.String),
    BackfillStatus: S.optional(CostAllocationTagBackfillStatus),
    LastUpdatedAt: S.optional(S.String),
  }),
).annotate({
  identifier: "CostAllocationTagBackfillRequest",
}) as any as S.Schema<CostAllocationTagBackfillRequest>;
export type CostAllocationTagBackfillRequestList =
  CostAllocationTagBackfillRequest[];
export const CostAllocationTagBackfillRequestList = /*@__PURE__*/ S.Array(
  CostAllocationTagBackfillRequest,
);
export interface ListCostAllocationTagBackfillHistoryResponse {
  BackfillRequests?: CostAllocationTagBackfillRequest[];
  NextToken?: string;
}
export const ListCostAllocationTagBackfillHistoryResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      BackfillRequests: S.optional(CostAllocationTagBackfillRequestList),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListCostAllocationTagBackfillHistoryResponse",
  }) as any as S.Schema<ListCostAllocationTagBackfillHistoryResponse>;
export type CostAllocationTagStatus = "Active" | "Inactive" | (string & {});
export const CostAllocationTagStatus = S.String;

export type CostAllocationTagKeyList = string[];
export const CostAllocationTagKeyList = /*@__PURE__*/ S.Array(S.String);
export type CostAllocationTagType =
  | "AWSGenerated"
  | "UserDefined"
  | (string & {});
export const CostAllocationTagType = S.String;

export interface ListCostAllocationTagsRequest {
  Status?: CostAllocationTagStatus;
  TagKeys?: string[];
  Type?: CostAllocationTagType;
  NextToken?: string;
  MaxResults?: number;
}
export const ListCostAllocationTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(CostAllocationTagStatus),
    TagKeys: S.optional(CostAllocationTagKeyList),
    Type: S.optional(CostAllocationTagType),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCostAllocationTagsRequest",
}) as any as S.Schema<ListCostAllocationTagsRequest>;
export interface CostAllocationTag {
  TagKey: string;
  Type: CostAllocationTagType;
  Status: CostAllocationTagStatus;
  LastUpdatedDate?: string;
  LastUsedDate?: string;
}
export const CostAllocationTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TagKey: S.String,
    Type: CostAllocationTagType,
    Status: CostAllocationTagStatus,
    LastUpdatedDate: S.optional(S.String),
    LastUsedDate: S.optional(S.String),
  }),
).annotate({
  identifier: "CostAllocationTag",
}) as any as S.Schema<CostAllocationTag>;
export type CostAllocationTagList = CostAllocationTag[];
export const CostAllocationTagList = /*@__PURE__*/ S.Array(CostAllocationTag);
export interface ListCostAllocationTagsResponse {
  CostAllocationTags?: CostAllocationTag[];
  NextToken?: string;
}
export const ListCostAllocationTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CostAllocationTags: S.optional(CostAllocationTagList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCostAllocationTagsResponse",
}) as any as S.Schema<ListCostAllocationTagsResponse>;
export type CostCategoryMaxResults = number;
export type ResourceType = string;
export type ResourceTypesFilterInput = string[];
export const ResourceTypesFilterInput = /*@__PURE__*/ S.Array(S.String);
export interface ListCostCategoryDefinitionsRequest {
  EffectiveOn?: string;
  NextToken?: string;
  MaxResults?: number;
  SupportedResourceTypes?: string[];
}
export const ListCostCategoryDefinitionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EffectiveOn: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    SupportedResourceTypes: S.optional(ResourceTypesFilterInput),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListCostCategoryDefinitionsRequest",
}) as any as S.Schema<ListCostCategoryDefinitionsRequest>;
export type ResourceTypes = string[];
export const ResourceTypes = /*@__PURE__*/ S.Array(S.String);
export interface CostCategoryReference {
  CostCategoryArn?: string;
  Name?: string;
  EffectiveStart?: string;
  EffectiveEnd?: string;
  NumberOfRules?: number;
  ProcessingStatus?: CostCategoryProcessingStatus[];
  Values?: string[];
  DefaultValue?: string;
  SupportedResourceTypes?: string[];
}
export const CostCategoryReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CostCategoryArn: S.optional(S.String),
    Name: S.optional(S.String),
    EffectiveStart: S.optional(S.String),
    EffectiveEnd: S.optional(S.String),
    NumberOfRules: S.optional(S.Number),
    ProcessingStatus: S.optional(CostCategoryProcessingStatusList),
    Values: S.optional(CostCategoryValuesList),
    DefaultValue: S.optional(S.String),
    SupportedResourceTypes: S.optional(ResourceTypes),
  }),
).annotate({
  identifier: "CostCategoryReference",
}) as any as S.Schema<CostCategoryReference>;
export type CostCategoryReferencesList = CostCategoryReference[];
export const CostCategoryReferencesList = /*@__PURE__*/ S.Array(
  CostCategoryReference,
);
export interface ListCostCategoryDefinitionsResponse {
  CostCategoryReferences?: CostCategoryReference[];
  NextToken?: string;
}
export const ListCostCategoryDefinitionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CostCategoryReferences: S.optional(CostCategoryReferencesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCostCategoryDefinitionsResponse",
}) as any as S.Schema<ListCostCategoryDefinitionsResponse>;
export interface ListCostCategoryResourceAssociationsRequest {
  CostCategoryArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListCostCategoryResourceAssociationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CostCategoryArn: S.optional(S.String),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListCostCategoryResourceAssociationsRequest",
  }) as any as S.Schema<ListCostCategoryResourceAssociationsRequest>;
export type GenericArn = string;
export interface CostCategoryResourceAssociation {
  ResourceArn?: string;
  CostCategoryName?: string;
  CostCategoryArn?: string;
}
export const CostCategoryResourceAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    CostCategoryName: S.optional(S.String),
    CostCategoryArn: S.optional(S.String),
  }),
).annotate({
  identifier: "CostCategoryResourceAssociation",
}) as any as S.Schema<CostCategoryResourceAssociation>;
export type CostCategoryResourceAssociations =
  CostCategoryResourceAssociation[];
export const CostCategoryResourceAssociations = /*@__PURE__*/ S.Array(
  CostCategoryResourceAssociation,
);
export interface ListCostCategoryResourceAssociationsResponse {
  CostCategoryResourceAssociations?: CostCategoryResourceAssociation[];
  NextToken?: string;
}
export const ListCostCategoryResourceAssociationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CostCategoryResourceAssociations: S.optional(
        CostCategoryResourceAssociations,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListCostCategoryResourceAssociationsResponse",
  }) as any as S.Schema<ListCostCategoryResourceAssociationsResponse>;
export type GenerationStatus =
  | "SUCCEEDED"
  | "PROCESSING"
  | "FAILED"
  | (string & {});
export const GenerationStatus = S.String;

export type RecommendationId = string;
export type RecommendationIdList = string[];
export const RecommendationIdList = /*@__PURE__*/ S.Array(S.String);
export interface ListSavingsPlansPurchaseRecommendationGenerationRequest {
  GenerationStatus?: GenerationStatus;
  RecommendationIds?: string[];
  PageSize?: number;
  NextPageToken?: string;
}
export const ListSavingsPlansPurchaseRecommendationGenerationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      GenerationStatus: S.optional(GenerationStatus),
      RecommendationIds: S.optional(RecommendationIdList),
      PageSize: S.optional(S.Number),
      NextPageToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListSavingsPlansPurchaseRecommendationGenerationRequest",
  }) as any as S.Schema<ListSavingsPlansPurchaseRecommendationGenerationRequest>;
export interface GenerationSummary {
  RecommendationId?: string;
  GenerationStatus?: GenerationStatus;
  GenerationStartedTime?: string;
  GenerationCompletionTime?: string;
  EstimatedCompletionTime?: string;
}
export const GenerationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecommendationId: S.optional(S.String),
    GenerationStatus: S.optional(GenerationStatus),
    GenerationStartedTime: S.optional(S.String),
    GenerationCompletionTime: S.optional(S.String),
    EstimatedCompletionTime: S.optional(S.String),
  }),
).annotate({
  identifier: "GenerationSummary",
}) as any as S.Schema<GenerationSummary>;
export type GenerationSummaryList = GenerationSummary[];
export const GenerationSummaryList = /*@__PURE__*/ S.Array(GenerationSummary);
export interface ListSavingsPlansPurchaseRecommendationGenerationResponse {
  GenerationSummaryList?: GenerationSummary[];
  NextPageToken?: string;
}
export const ListSavingsPlansPurchaseRecommendationGenerationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      GenerationSummaryList: S.optional(GenerationSummaryList),
      NextPageToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListSavingsPlansPurchaseRecommendationGenerationResponse",
  }) as any as S.Schema<ListSavingsPlansPurchaseRecommendationGenerationResponse>;
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
  ResourceTags?: ResourceTag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceTags: S.optional(ResourceTagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ProvideAnomalyFeedbackRequest {
  AnomalyId: string;
  Feedback: AnomalyFeedbackType;
}
export const ProvideAnomalyFeedbackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AnomalyId: S.String, Feedback: AnomalyFeedbackType }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ProvideAnomalyFeedbackRequest",
}) as any as S.Schema<ProvideAnomalyFeedbackRequest>;
export interface ProvideAnomalyFeedbackResponse {
  AnomalyId: string;
}
export const ProvideAnomalyFeedbackResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AnomalyId: S.String }),
).annotate({
  identifier: "ProvideAnomalyFeedbackResponse",
}) as any as S.Schema<ProvideAnomalyFeedbackResponse>;
export interface StartCommitmentPurchaseAnalysisRequest {
  CommitmentPurchaseAnalysisConfiguration: CommitmentPurchaseAnalysisConfiguration;
}
export const StartCommitmentPurchaseAnalysisRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CommitmentPurchaseAnalysisConfiguration:
        CommitmentPurchaseAnalysisConfiguration,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "StartCommitmentPurchaseAnalysisRequest",
}) as any as S.Schema<StartCommitmentPurchaseAnalysisRequest>;
export interface StartCommitmentPurchaseAnalysisResponse {
  AnalysisId: string;
  AnalysisStartedTime: string;
  EstimatedCompletionTime: string;
}
export const StartCommitmentPurchaseAnalysisResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AnalysisId: S.String,
      AnalysisStartedTime: S.String,
      EstimatedCompletionTime: S.String,
    }),
).annotate({
  identifier: "StartCommitmentPurchaseAnalysisResponse",
}) as any as S.Schema<StartCommitmentPurchaseAnalysisResponse>;
export interface StartCostAllocationTagBackfillRequest {
  BackfillFrom: string;
}
export const StartCostAllocationTagBackfillRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ BackfillFrom: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "StartCostAllocationTagBackfillRequest",
}) as any as S.Schema<StartCostAllocationTagBackfillRequest>;
export interface StartCostAllocationTagBackfillResponse {
  BackfillRequest?: CostAllocationTagBackfillRequest;
}
export const StartCostAllocationTagBackfillResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ BackfillRequest: S.optional(CostAllocationTagBackfillRequest) }),
).annotate({
  identifier: "StartCostAllocationTagBackfillResponse",
}) as any as S.Schema<StartCostAllocationTagBackfillResponse>;
export interface StartSavingsPlansPurchaseRecommendationGenerationRequest {}
export const StartSavingsPlansPurchaseRecommendationGenerationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "StartSavingsPlansPurchaseRecommendationGenerationRequest",
  }) as any as S.Schema<StartSavingsPlansPurchaseRecommendationGenerationRequest>;
export interface StartSavingsPlansPurchaseRecommendationGenerationResponse {
  RecommendationId?: string;
  GenerationStartedTime?: string;
  EstimatedCompletionTime?: string;
}
export const StartSavingsPlansPurchaseRecommendationGenerationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RecommendationId: S.optional(S.String),
      GenerationStartedTime: S.optional(S.String),
      EstimatedCompletionTime: S.optional(S.String),
    }),
  ).annotate({
    identifier: "StartSavingsPlansPurchaseRecommendationGenerationResponse",
  }) as any as S.Schema<StartSavingsPlansPurchaseRecommendationGenerationResponse>;
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
export interface UpdateAnomalyMonitorRequest {
  MonitorArn: string;
  MonitorName?: string;
}
export const UpdateAnomalyMonitorRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MonitorArn: S.String, MonitorName: S.optional(S.String) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAnomalyMonitorRequest",
}) as any as S.Schema<UpdateAnomalyMonitorRequest>;
export interface UpdateAnomalyMonitorResponse {
  MonitorArn: string;
}
export const UpdateAnomalyMonitorResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MonitorArn: S.String }),
).annotate({
  identifier: "UpdateAnomalyMonitorResponse",
}) as any as S.Schema<UpdateAnomalyMonitorResponse>;
export interface UpdateAnomalySubscriptionRequest {
  SubscriptionArn: string;
  Threshold?: number;
  Frequency?: AnomalySubscriptionFrequency;
  MonitorArnList?: string[];
  Subscribers?: Subscriber[];
  SubscriptionName?: string;
  ThresholdExpression?: Expression;
}
export const UpdateAnomalySubscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SubscriptionArn: S.String,
    Threshold: S.optional(S.Number),
    Frequency: S.optional(AnomalySubscriptionFrequency),
    MonitorArnList: S.optional(MonitorArnList),
    Subscribers: S.optional(Subscribers),
    SubscriptionName: S.optional(S.String),
    ThresholdExpression: S.optional(Expression),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAnomalySubscriptionRequest",
}) as any as S.Schema<UpdateAnomalySubscriptionRequest>;
export interface UpdateAnomalySubscriptionResponse {
  SubscriptionArn: string;
}
export const UpdateAnomalySubscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SubscriptionArn: S.String }),
).annotate({
  identifier: "UpdateAnomalySubscriptionResponse",
}) as any as S.Schema<UpdateAnomalySubscriptionResponse>;
export interface CostAllocationTagStatusEntry {
  TagKey: string;
  Status: CostAllocationTagStatus;
}
export const CostAllocationTagStatusEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagKey: S.String, Status: CostAllocationTagStatus }),
).annotate({
  identifier: "CostAllocationTagStatusEntry",
}) as any as S.Schema<CostAllocationTagStatusEntry>;
export type CostAllocationTagStatusList = CostAllocationTagStatusEntry[];
export const CostAllocationTagStatusList = /*@__PURE__*/ S.Array(
  CostAllocationTagStatusEntry,
);
export interface UpdateCostAllocationTagsStatusRequest {
  CostAllocationTagsStatus: CostAllocationTagStatusEntry[];
}
export const UpdateCostAllocationTagsStatusRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ CostAllocationTagsStatus: CostAllocationTagStatusList }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateCostAllocationTagsStatusRequest",
}) as any as S.Schema<UpdateCostAllocationTagsStatusRequest>;
export type ErrorMessage = string;
export interface UpdateCostAllocationTagsStatusError_ {
  TagKey?: string;
  Code?: string;
  Message?: string;
}
export const UpdateCostAllocationTagsStatusError_ = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TagKey: S.optional(S.String),
      Code: S.optional(S.String),
      Message: S.optional(S.String),
    }),
).annotate({
  identifier: "UpdateCostAllocationTagsStatusError",
}) as any as S.Schema<UpdateCostAllocationTagsStatusError_>;
export type UpdateCostAllocationTagsStatusErrors =
  UpdateCostAllocationTagsStatusError_[];
export const UpdateCostAllocationTagsStatusErrors = /*@__PURE__*/ S.Array(
  UpdateCostAllocationTagsStatusError_,
);
export interface UpdateCostAllocationTagsStatusResponse {
  Errors?: UpdateCostAllocationTagsStatusError_[];
}
export const UpdateCostAllocationTagsStatusResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Errors: S.optional(UpdateCostAllocationTagsStatusErrors) }),
).annotate({
  identifier: "UpdateCostAllocationTagsStatusResponse",
}) as any as S.Schema<UpdateCostAllocationTagsStatusResponse>;
export interface UpdateCostCategoryDefinitionRequest {
  CostCategoryArn: string;
  EffectiveStart?: string;
  RuleVersion: CostCategoryRuleVersion;
  Rules: CostCategoryRule[];
  DefaultValue?: string;
  SplitChargeRules?: CostCategorySplitChargeRule[];
}
export const UpdateCostCategoryDefinitionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CostCategoryArn: S.String,
    EffectiveStart: S.optional(S.String),
    RuleVersion: CostCategoryRuleVersion,
    Rules: CostCategoryRulesList,
    DefaultValue: S.optional(S.String),
    SplitChargeRules: S.optional(CostCategorySplitChargeRulesList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateCostCategoryDefinitionRequest",
}) as any as S.Schema<UpdateCostCategoryDefinitionRequest>;
export interface UpdateCostCategoryDefinitionResponse {
  CostCategoryArn?: string;
  EffectiveStart?: string;
}
export const UpdateCostCategoryDefinitionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CostCategoryArn: S.optional(S.String),
      EffectiveStart: S.optional(S.String),
    }),
).annotate({
  identifier: "UpdateCostCategoryDefinitionResponse",
}) as any as S.Schema<UpdateCostCategoryDefinitionResponse>;
export type CreateAnomalyMonitorError =
  | LimitExceededException
  | AnomalyMonitorAlreadyExists
  | CommonErrors;
/**
 * Creates a new cost anomaly detection monitor with the requested type and monitor
 * specification.
 */
export const createAnomalyMonitor: API.OperationMethod<
  CreateAnomalyMonitorRequest,
  CreateAnomalyMonitorResponse,
  CreateAnomalyMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAnomalyMonitorRequest,
  output: CreateAnomalyMonitorResponse,
  errors: [LimitExceededException, AnomalyMonitorAlreadyExists],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAnomalyMonitor",
}));

export type CreateAnomalySubscriptionError =
  | LimitExceededException
  | UnknownMonitorException
  | AnomalySubscriptionAlreadyExists
  | CommonErrors;
/**
 * Adds an alert subscription to a cost anomaly detection monitor. You can use each
 * subscription to define subscribers with email or SNS notifications. Email subscribers can set
 * an absolute or percentage threshold and a time frequency for receiving notifications.
 */
export const createAnomalySubscription: API.OperationMethod<
  CreateAnomalySubscriptionRequest,
  CreateAnomalySubscriptionResponse,
  CreateAnomalySubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAnomalySubscriptionRequest,
  output: CreateAnomalySubscriptionResponse,
  errors: [
    LimitExceededException,
    UnknownMonitorException,
    AnomalySubscriptionAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAnomalySubscription",
}));

export type CreateCostCategoryDefinitionError =
  | LimitExceededException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Creates a new cost category with the requested name and rules.
 */
export const createCostCategoryDefinition: API.OperationMethod<
  CreateCostCategoryDefinitionRequest,
  CreateCostCategoryDefinitionResponse,
  CreateCostCategoryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCostCategoryDefinitionRequest,
  output: CreateCostCategoryDefinitionResponse,
  errors: [LimitExceededException, ServiceQuotaExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCostCategoryDefinition",
}));

export type DeleteAnomalyMonitorError =
  | LimitExceededException
  | UnknownMonitorException
  | CommonErrors;
/**
 * Deletes a cost anomaly monitor.
 */
export const deleteAnomalyMonitor: API.OperationMethod<
  DeleteAnomalyMonitorRequest,
  DeleteAnomalyMonitorResponse,
  DeleteAnomalyMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAnomalyMonitorRequest,
  output: DeleteAnomalyMonitorResponse,
  errors: [LimitExceededException, UnknownMonitorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnomalyMonitor",
}));

export type DeleteAnomalySubscriptionError =
  | LimitExceededException
  | UnknownSubscriptionException
  | CommonErrors;
/**
 * Deletes a cost anomaly subscription.
 */
export const deleteAnomalySubscription: API.OperationMethod<
  DeleteAnomalySubscriptionRequest,
  DeleteAnomalySubscriptionResponse,
  DeleteAnomalySubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAnomalySubscriptionRequest,
  output: DeleteAnomalySubscriptionResponse,
  errors: [LimitExceededException, UnknownSubscriptionException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAnomalySubscription",
}));

export type DeleteCostCategoryDefinitionError =
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a cost category. Expenses from this month going forward will no longer be
 * categorized with this cost category.
 */
export const deleteCostCategoryDefinition: API.OperationMethod<
  DeleteCostCategoryDefinitionRequest,
  DeleteCostCategoryDefinitionResponse,
  DeleteCostCategoryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCostCategoryDefinitionRequest,
  output: DeleteCostCategoryDefinitionResponse,
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCostCategoryDefinition",
}));

export type DescribeCostCategoryDefinitionError =
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the name, Amazon Resource Name (ARN), rules, definition, and effective dates of a
 * cost category that's defined in the account.
 *
 * You have the option to use `EffectiveOn` to return a cost category that's
 * active on a specific date. If there's no `EffectiveOn` specified, you see a Cost
 * Category that's effective on the current date. If cost category is still effective,
 * `EffectiveEnd` is omitted in the response.
 */
export const describeCostCategoryDefinition: API.OperationMethod<
  DescribeCostCategoryDefinitionRequest,
  DescribeCostCategoryDefinitionResponse,
  DescribeCostCategoryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCostCategoryDefinitionRequest,
  output: DescribeCostCategoryDefinitionResponse,
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCostCategoryDefinition",
}));

export type GetAnomaliesError =
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves all of the cost anomalies detected on your account during the time period that's
 * specified by the `DateInterval` object. Anomalies are available for up to 90
 * days.
 */
export const getAnomalies: API.PaginatedOperationMethod<
  GetAnomaliesRequest,
  GetAnomaliesResponse,
  GetAnomaliesError,
  Credentials | HttpClient.HttpClient,
  Anomaly
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetAnomaliesRequest,
  output: GetAnomaliesResponse,
  errors: [InvalidNextTokenException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnomalies",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "Anomalies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetAnomalyMonitorsError =
  | InvalidNextTokenException
  | LimitExceededException
  | UnknownMonitorException
  | CommonErrors;
/**
 * Retrieves the cost anomaly monitor definitions for your account. You can filter using a
 * list of cost anomaly monitor Amazon Resource Names (ARNs).
 */
export const getAnomalyMonitors: API.PaginatedOperationMethod<
  GetAnomalyMonitorsRequest,
  GetAnomalyMonitorsResponse,
  GetAnomalyMonitorsError,
  Credentials | HttpClient.HttpClient,
  AnomalyMonitor
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetAnomalyMonitorsRequest,
  output: GetAnomalyMonitorsResponse,
  errors: [
    InvalidNextTokenException,
    LimitExceededException,
    UnknownMonitorException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnomalyMonitors",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "AnomalyMonitors",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetAnomalySubscriptionsError =
  | InvalidNextTokenException
  | LimitExceededException
  | UnknownSubscriptionException
  | CommonErrors;
/**
 * Retrieves the cost anomaly subscription objects for your account. You can filter using a
 * list of cost anomaly monitor Amazon Resource Names (ARNs).
 */
export const getAnomalySubscriptions: API.PaginatedOperationMethod<
  GetAnomalySubscriptionsRequest,
  GetAnomalySubscriptionsResponse,
  GetAnomalySubscriptionsError,
  Credentials | HttpClient.HttpClient,
  AnomalySubscription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetAnomalySubscriptionsRequest,
  output: GetAnomalySubscriptionsResponse,
  errors: [
    InvalidNextTokenException,
    LimitExceededException,
    UnknownSubscriptionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnomalySubscriptions",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "AnomalySubscriptions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetApproximateUsageRecordsError =
  | DataUnavailableException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves estimated usage records for hourly granularity or resource-level data at daily
 * granularity.
 */
export const getApproximateUsageRecords: API.OperationMethod<
  GetApproximateUsageRecordsRequest,
  GetApproximateUsageRecordsResponse,
  GetApproximateUsageRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApproximateUsageRecordsRequest,
  output: GetApproximateUsageRecordsResponse,
  errors: [DataUnavailableException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApproximateUsageRecords",
}));

export type GetCommitmentPurchaseAnalysisError =
  | AnalysisNotFoundException
  | DataUnavailableException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves a commitment purchase analysis result based on the
 * `AnalysisId`.
 */
export const getCommitmentPurchaseAnalysis: API.OperationMethod<
  GetCommitmentPurchaseAnalysisRequest,
  GetCommitmentPurchaseAnalysisResponse,
  GetCommitmentPurchaseAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCommitmentPurchaseAnalysisRequest,
  output: GetCommitmentPurchaseAnalysisResponse,
  errors: [
    AnalysisNotFoundException,
    DataUnavailableException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCommitmentPurchaseAnalysis",
}));

export type GetCostAndUsageError =
  | BillExpirationException
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | RequestChangedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves cost and usage metrics for your account. You can specify which cost and
 * usage-related metric that you want the request to return. For example, you can specify
 * `BlendedCosts` or `UsageQuantity`. You can also filter and group your
 * data by various dimensions, such as `SERVICE` or `AZ`, in a specific
 * time range. For a complete list of valid dimensions, see the GetDimensionValues operation. Management account in an organization in Organizations have access to all member accounts.
 *
 * For information about filter limitations, see Quotas and restrictions
 * in the *Billing and Cost Management User Guide*.
 */
export const getCostAndUsage: API.OperationMethod<
  GetCostAndUsageRequest,
  GetCostAndUsageResponse,
  GetCostAndUsageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCostAndUsageRequest,
  output: GetCostAndUsageResponse,
  errors: [
    BillExpirationException,
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    RequestChangedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostAndUsage",
}));

export type GetCostAndUsageComparisonsError =
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves cost and usage comparisons for your account between two periods within the last
 * 13 months. If you have enabled multi-year data at monthly granularity, you can go back up to
 * 38 months.
 */
export const getCostAndUsageComparisons: API.PaginatedOperationMethod<
  GetCostAndUsageComparisonsRequest,
  GetCostAndUsageComparisonsResponse,
  GetCostAndUsageComparisonsError,
  Credentials | HttpClient.HttpClient,
  CostAndUsageComparison
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetCostAndUsageComparisonsRequest,
  output: GetCostAndUsageComparisonsResponse,
  errors: [
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostAndUsageComparisons",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "CostAndUsageComparisons",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCostAndUsageWithResourcesError =
  | BillExpirationException
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | RequestChangedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves cost and usage metrics with resources for your account. You can specify which
 * cost and usage-related metric, such as `BlendedCosts` or
 * `UsageQuantity`, that you want the request to return. You can also filter and group
 * your data by various dimensions, such as `SERVICE` or `AZ`, in a
 * specific time range. For a complete list of valid dimensions, see the GetDimensionValues operation. Management account in an organization in Organizations have access to all member accounts.
 *
 * Hourly granularity is only available for EC2-Instances (Elastic Compute Cloud)
 * resource-level data. All other resource-level data is available at daily
 * granularity.
 *
 * This is an opt-in only feature. You can enable this feature from the Cost Explorer
 * Settings page. For information about how to access the Settings page, see Controlling
 * Access for Cost Explorer in the Billing and Cost Management User
 * Guide.
 */
export const getCostAndUsageWithResources: API.OperationMethod<
  GetCostAndUsageWithResourcesRequest,
  GetCostAndUsageWithResourcesResponse,
  GetCostAndUsageWithResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCostAndUsageWithResourcesRequest,
  output: GetCostAndUsageWithResourcesResponse,
  errors: [
    BillExpirationException,
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    RequestChangedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostAndUsageWithResources",
}));

export type GetCostCategoriesError =
  | BillExpirationException
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | RequestChangedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves an array of cost category names and values incurred cost.
 *
 * If some cost category names and values are not associated with any cost, they will not
 * be returned by this API.
 */
export const getCostCategories: API.OperationMethod<
  GetCostCategoriesRequest,
  GetCostCategoriesResponse,
  GetCostCategoriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCostCategoriesRequest,
  output: GetCostCategoriesResponse,
  errors: [
    BillExpirationException,
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    RequestChangedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostCategories",
}));

export type GetCostComparisonDriversError =
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves key factors driving cost changes between two time periods within the last 13
 * months, such as usage changes, discount changes, and commitment-based savings. If you have
 * enabled multi-year data at monthly granularity, you can go back up to 38 months.
 */
export const getCostComparisonDrivers: API.PaginatedOperationMethod<
  GetCostComparisonDriversRequest,
  GetCostComparisonDriversResponse,
  GetCostComparisonDriversError,
  Credentials | HttpClient.HttpClient,
  CostComparisonDriver
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetCostComparisonDriversRequest,
  output: GetCostComparisonDriversResponse,
  errors: [
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostComparisonDrivers",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "CostComparisonDrivers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetCostForecastError =
  | BillingViewHealthStatusException
  | DataUnavailableException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a forecast for how much Amazon Web Services predicts that you will spend over
 * the forecast time period that you select, based on your past costs.
 */
export const getCostForecast: API.OperationMethod<
  GetCostForecastRequest,
  GetCostForecastResponse,
  GetCostForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCostForecastRequest,
  output: GetCostForecastResponse,
  errors: [
    BillingViewHealthStatusException,
    DataUnavailableException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCostForecast",
}));

export type GetDimensionValuesError =
  | BillExpirationException
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | RequestChangedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves all available filter values for a specified filter over a period of time. You
 * can search the dimension values for an arbitrary string.
 */
export const getDimensionValues: API.OperationMethod<
  GetDimensionValuesRequest,
  GetDimensionValuesResponse,
  GetDimensionValuesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDimensionValuesRequest,
  output: GetDimensionValuesResponse,
  errors: [
    BillExpirationException,
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    RequestChangedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDimensionValues",
}));

export type GetReservationCoverageError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the reservation coverage for your account, which you can use to see how much
 * of your Amazon Elastic Compute Cloud, Amazon ElastiCache, Amazon Relational Database Service,
 * or Amazon Redshift usage is covered by a reservation. An organization's management account can
 * see the coverage of the associated member accounts. This supports dimensions, cost categories,
 * and nested expressions. For any time period, you can filter data about reservation usage by
 * the following dimensions:
 *
 * - AZ
 *
 * - CACHE_ENGINE
 *
 * - DATABASE_ENGINE
 *
 * - DEPLOYMENT_OPTION
 *
 * - INSTANCE_TYPE
 *
 * - LINKED_ACCOUNT
 *
 * - OPERATING_SYSTEM
 *
 * - PLATFORM
 *
 * - REGION
 *
 * - SERVICE
 *
 * - TAG
 *
 * - TENANCY
 *
 * To determine valid values for a dimension, use the `GetDimensionValues`
 * operation.
 */
export const getReservationCoverage: API.OperationMethod<
  GetReservationCoverageRequest,
  GetReservationCoverageResponse,
  GetReservationCoverageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReservationCoverageRequest,
  output: GetReservationCoverageResponse,
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservationCoverage",
}));

export type GetReservationPurchaseRecommendationError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Gets recommendations for reservation purchases. These recommendations might help you to
 * reduce your costs. Reservations provide a discounted hourly rate (up to 75%) compared to
 * On-Demand pricing.
 *
 * Amazon Web Services generates your recommendations by identifying your On-Demand usage
 * during a specific time period and collecting your usage into categories that are eligible for
 * a reservation. After Amazon Web Services has these categories, it simulates every combination
 * of reservations in each category of usage to identify the best number of each type of Reserved
 * Instance (RI) to purchase to maximize your estimated savings.
 *
 * For example, Amazon Web Services automatically aggregates your Amazon EC2 Linux, shared
 * tenancy, and c4 family usage in the US West (Oregon) Region and recommends that you buy
 * size-flexible regional reservations to apply to the c4 family usage. Amazon Web Services
 * recommends the smallest size instance in an instance family. This makes it easier to purchase
 * a size-flexible Reserved Instance (RI). Amazon Web Services also shows the equal number of
 * normalized units. This way, you can purchase any instance size that you want. For this
 * example, your RI recommendation is for `c4.large` because that is the smallest size
 * instance in the c4 instance family.
 */
export const getReservationPurchaseRecommendation: API.PaginatedOperationMethod<
  GetReservationPurchaseRecommendationRequest,
  GetReservationPurchaseRecommendationResponse,
  GetReservationPurchaseRecommendationError,
  Credentials | HttpClient.HttpClient,
  ReservationPurchaseRecommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetReservationPurchaseRecommendationRequest,
  output: GetReservationPurchaseRecommendationResponse,
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservationPurchaseRecommendation",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "Recommendations",
    pageSize: "PageSize",
  } as const,
})) as any;

export type GetReservationUtilizationError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the reservation utilization for your account. Management account in an
 * organization have access to member accounts. You can filter data by dimensions in a time
 * period. You can use `GetDimensionValues` to determine the possible dimension
 * values. Currently, you can group only by `SUBSCRIPTION_ID`.
 */
export const getReservationUtilization: API.OperationMethod<
  GetReservationUtilizationRequest,
  GetReservationUtilizationResponse,
  GetReservationUtilizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetReservationUtilizationRequest,
  output: GetReservationUtilizationResponse,
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetReservationUtilization",
}));

export type GetRightsizingRecommendationError =
  | InvalidNextTokenException
  | LimitExceededException
  | RightsizingRecommendationNotEnabled
  | CommonErrors;
/**
 * Creates recommendations that help you save cost by identifying idle and underutilized
 * Amazon EC2 instances.
 *
 * Recommendations are generated to either downsize or terminate instances, along with
 * providing savings detail and metrics. For more information about calculation and function, see
 * Optimizing Your Cost with Rightsizing Recommendations in the *Billing and Cost Management User Guide*.
 */
export const getRightsizingRecommendation: API.PaginatedOperationMethod<
  GetRightsizingRecommendationRequest,
  GetRightsizingRecommendationResponse,
  GetRightsizingRecommendationError,
  Credentials | HttpClient.HttpClient,
  RightsizingRecommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetRightsizingRecommendationRequest,
  output: GetRightsizingRecommendationResponse,
  errors: [
    InvalidNextTokenException,
    LimitExceededException,
    RightsizingRecommendationNotEnabled,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRightsizingRecommendation",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "RightsizingRecommendations",
    pageSize: "PageSize",
  } as const,
})) as any;

export type GetSavingsPlanPurchaseRecommendationDetailsError =
  | DataUnavailableException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the details for a Savings Plan recommendation. These details include the hourly
 * data-points that construct the cost, coverage, and utilization charts.
 */
export const getSavingsPlanPurchaseRecommendationDetails: API.OperationMethod<
  GetSavingsPlanPurchaseRecommendationDetailsRequest,
  GetSavingsPlanPurchaseRecommendationDetailsResponse,
  GetSavingsPlanPurchaseRecommendationDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSavingsPlanPurchaseRecommendationDetailsRequest,
  output: GetSavingsPlanPurchaseRecommendationDetailsResponse,
  errors: [DataUnavailableException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlanPurchaseRecommendationDetails",
}));

export type GetSavingsPlansCoverageError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the Savings Plans covered for your account. This enables you to see how much of
 * your cost is covered by a Savings Plan. An organization’s management account can see the
 * coverage of the associated member accounts. This supports dimensions, cost categories, and
 * nested expressions. For any time period, you can filter data for Savings Plans usage with the
 * following dimensions:
 *
 * - `LINKED_ACCOUNT`
 *
 * - `REGION`
 *
 * - `SERVICE`
 *
 * - `INSTANCE_FAMILY`
 *
 * To determine valid values for a dimension, use the `GetDimensionValues`
 * operation.
 */
export const getSavingsPlansCoverage: API.PaginatedOperationMethod<
  GetSavingsPlansCoverageRequest,
  GetSavingsPlansCoverageResponse,
  GetSavingsPlansCoverageError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetSavingsPlansCoverageRequest,
  output: GetSavingsPlansCoverageResponse,
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlansCoverage",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetSavingsPlansPurchaseRecommendationError =
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the Savings Plans recommendations for your account. First use
 * `StartSavingsPlansPurchaseRecommendationGeneration` to generate a new set of
 * recommendations, and then use `GetSavingsPlansPurchaseRecommendation` to retrieve
 * them.
 */
export const getSavingsPlansPurchaseRecommendation: API.OperationMethod<
  GetSavingsPlansPurchaseRecommendationRequest,
  GetSavingsPlansPurchaseRecommendationResponse,
  GetSavingsPlansPurchaseRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSavingsPlansPurchaseRecommendationRequest,
  output: GetSavingsPlansPurchaseRecommendationResponse,
  errors: [InvalidNextTokenException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlansPurchaseRecommendation",
}));

export type GetSavingsPlansUtilizationError =
  | DataUnavailableException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves the Savings Plans utilization for your account across date ranges with daily or
 * monthly granularity. Management account in an organization have access to member accounts. You
 * can use `GetDimensionValues` in `SAVINGS_PLANS` to determine the
 * possible dimension values.
 *
 * You can't group by any dimension values for
 * `GetSavingsPlansUtilization`.
 */
export const getSavingsPlansUtilization: API.OperationMethod<
  GetSavingsPlansUtilizationRequest,
  GetSavingsPlansUtilizationResponse,
  GetSavingsPlansUtilizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSavingsPlansUtilizationRequest,
  output: GetSavingsPlansUtilizationResponse,
  errors: [DataUnavailableException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlansUtilization",
}));

export type GetSavingsPlansUtilizationDetailsError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves attribute data along with aggregate utilization and savings data for a given
 * time period. This doesn't support granular or grouped data (daily/monthly) in response. You
 * can't retrieve data by dates in a single response similar to
 * `GetSavingsPlanUtilization`, but you have the option to make multiple calls to
 * `GetSavingsPlanUtilizationDetails` by providing individual dates. You can use
 * `GetDimensionValues` in `SAVINGS_PLANS` to determine the possible
 * dimension values.
 *
 * `GetSavingsPlanUtilizationDetails` internally groups data by
 * `SavingsPlansArn`.
 */
export const getSavingsPlansUtilizationDetails: API.PaginatedOperationMethod<
  GetSavingsPlansUtilizationDetailsRequest,
  GetSavingsPlansUtilizationDetailsResponse,
  GetSavingsPlansUtilizationDetailsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetSavingsPlansUtilizationDetailsRequest,
  output: GetSavingsPlansUtilizationDetailsResponse,
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSavingsPlansUtilizationDetails",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetTagsError =
  | BillExpirationException
  | BillingViewHealthStatusException
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | RequestChangedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Queries for available tag keys and tag values for a specified period. You can search
 * the tag values for an arbitrary string.
 */
export const getTags: API.OperationMethod<
  GetTagsRequest,
  GetTagsResponse,
  GetTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTagsRequest,
  output: GetTagsResponse,
  errors: [
    BillExpirationException,
    BillingViewHealthStatusException,
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
    RequestChangedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
}));

export type GetUsageForecastError =
  | BillingViewHealthStatusException
  | DataUnavailableException
  | LimitExceededException
  | ResourceNotFoundException
  | UnresolvableUsageUnitException
  | CommonErrors;
/**
 * Retrieves a forecast for how much Amazon Web Services predicts that you will use
 * over the forecast time period that you select, based on your past usage.
 */
export const getUsageForecast: API.OperationMethod<
  GetUsageForecastRequest,
  GetUsageForecastResponse,
  GetUsageForecastError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUsageForecastRequest,
  output: GetUsageForecastResponse,
  errors: [
    BillingViewHealthStatusException,
    DataUnavailableException,
    LimitExceededException,
    ResourceNotFoundException,
    UnresolvableUsageUnitException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUsageForecast",
}));

export type ListCommitmentPurchaseAnalysesError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists the commitment purchase analyses for your account.
 */
export const listCommitmentPurchaseAnalyses: API.PaginatedOperationMethod<
  ListCommitmentPurchaseAnalysesRequest,
  ListCommitmentPurchaseAnalysesResponse,
  ListCommitmentPurchaseAnalysesError,
  Credentials | HttpClient.HttpClient,
  AnalysisSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCommitmentPurchaseAnalysesRequest,
  output: ListCommitmentPurchaseAnalysesResponse,
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCommitmentPurchaseAnalyses",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "AnalysisSummaryList",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListCostAllocationTagBackfillHistoryError =
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves a list of your historical cost allocation tag backfill requests.
 */
export const listCostAllocationTagBackfillHistory: API.PaginatedOperationMethod<
  ListCostAllocationTagBackfillHistoryRequest,
  ListCostAllocationTagBackfillHistoryResponse,
  ListCostAllocationTagBackfillHistoryError,
  Credentials | HttpClient.HttpClient,
  CostAllocationTagBackfillRequest
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCostAllocationTagBackfillHistoryRequest,
  output: ListCostAllocationTagBackfillHistoryResponse,
  errors: [InvalidNextTokenException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCostAllocationTagBackfillHistory",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "BackfillRequests",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCostAllocationTagsError =
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Get a list of cost allocation tags. All inputs in the API are optional and serve as
 * filters. By default, all cost allocation tags are returned.
 */
export const listCostAllocationTags: API.PaginatedOperationMethod<
  ListCostAllocationTagsRequest,
  ListCostAllocationTagsResponse,
  ListCostAllocationTagsError,
  Credentials | HttpClient.HttpClient,
  CostAllocationTag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCostAllocationTagsRequest,
  output: ListCostAllocationTagsResponse,
  errors: [InvalidNextTokenException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCostAllocationTags",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CostAllocationTags",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCostCategoryDefinitionsError =
  | LimitExceededException
  | CommonErrors;
/**
 * Returns the name, Amazon Resource Name (ARN), `NumberOfRules` and effective
 * dates of all cost categories defined in the account. You have the option to use
 * `EffectiveOn` and `SupportedResourceTypes` to return a list of cost categories that were active on a specific
 * date. If there is no `EffectiveOn` specified, you’ll see cost categories that are
 * effective on the current date. If cost category is still effective, `EffectiveEnd`
 * is omitted in the response. `ListCostCategoryDefinitions` supports pagination. The
 * request can have a `MaxResults` range up to 100.
 */
export const listCostCategoryDefinitions: API.PaginatedOperationMethod<
  ListCostCategoryDefinitionsRequest,
  ListCostCategoryDefinitionsResponse,
  ListCostCategoryDefinitionsError,
  Credentials | HttpClient.HttpClient,
  CostCategoryReference
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCostCategoryDefinitionsRequest,
  output: ListCostCategoryDefinitionsResponse,
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCostCategoryDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CostCategoryReferences",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCostCategoryResourceAssociationsError =
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns resource associations of all cost categories defined in the account. You have the option to use `CostCategoryArn` to get the association for a specific cost category. `ListCostCategoryResourceAssociations` supports pagination. The request can have a `MaxResults` range up to 100.
 */
export const listCostCategoryResourceAssociations: API.PaginatedOperationMethod<
  ListCostCategoryResourceAssociationsRequest,
  ListCostCategoryResourceAssociationsResponse,
  ListCostCategoryResourceAssociationsError,
  Credentials | HttpClient.HttpClient,
  CostCategoryResourceAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCostCategoryResourceAssociationsRequest,
  output: ListCostCategoryResourceAssociationsResponse,
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCostCategoryResourceAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CostCategoryResourceAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSavingsPlansPurchaseRecommendationGenerationError =
  | DataUnavailableException
  | InvalidNextTokenException
  | LimitExceededException
  | CommonErrors;
/**
 * Retrieves a list of your historical recommendation generations within the past 30
 * days.
 */
export const listSavingsPlansPurchaseRecommendationGeneration: API.PaginatedOperationMethod<
  ListSavingsPlansPurchaseRecommendationGenerationRequest,
  ListSavingsPlansPurchaseRecommendationGenerationResponse,
  ListSavingsPlansPurchaseRecommendationGenerationError,
  Credentials | HttpClient.HttpClient,
  GenerationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSavingsPlansPurchaseRecommendationGenerationRequest,
  output: ListSavingsPlansPurchaseRecommendationGenerationResponse,
  errors: [
    DataUnavailableException,
    InvalidNextTokenException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSavingsPlansPurchaseRecommendationGeneration",
  pagination: {
    inputToken: "NextPageToken",
    outputToken: "NextPageToken",
    items: "GenerationSummaryList",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of resource tags associated with the resource specified by the Amazon
 * Resource Name (ARN).
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ProvideAnomalyFeedbackError = LimitExceededException | CommonErrors;
/**
 * Modifies the feedback property of a given cost anomaly.
 */
export const provideAnomalyFeedback: API.OperationMethod<
  ProvideAnomalyFeedbackRequest,
  ProvideAnomalyFeedbackResponse,
  ProvideAnomalyFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ProvideAnomalyFeedbackRequest,
  output: ProvideAnomalyFeedbackResponse,
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ProvideAnomalyFeedback",
}));

export type StartCommitmentPurchaseAnalysisError =
  | DataUnavailableException
  | GenerationExistsException
  | LimitExceededException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Specifies the parameters of a planned commitment purchase and starts the generation of the
 * analysis. This enables you to estimate the cost, coverage, and utilization impact of your
 * planned commitment purchases.
 */
export const startCommitmentPurchaseAnalysis: API.OperationMethod<
  StartCommitmentPurchaseAnalysisRequest,
  StartCommitmentPurchaseAnalysisResponse,
  StartCommitmentPurchaseAnalysisError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCommitmentPurchaseAnalysisRequest,
  output: StartCommitmentPurchaseAnalysisResponse,
  errors: [
    DataUnavailableException,
    GenerationExistsException,
    LimitExceededException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCommitmentPurchaseAnalysis",
}));

export type StartCostAllocationTagBackfillError =
  | BackfillLimitExceededException
  | LimitExceededException
  | CommonErrors;
/**
 * Request a cost allocation tag backfill. This will backfill the activation status (either `active` or `inactive`) for all tag keys from `para:BackfillFrom` up to the time this request is made.
 *
 * You can request a backfill once every 24 hours.
 */
export const startCostAllocationTagBackfill: API.OperationMethod<
  StartCostAllocationTagBackfillRequest,
  StartCostAllocationTagBackfillResponse,
  StartCostAllocationTagBackfillError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCostAllocationTagBackfillRequest,
  output: StartCostAllocationTagBackfillResponse,
  errors: [BackfillLimitExceededException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCostAllocationTagBackfill",
}));

export type StartSavingsPlansPurchaseRecommendationGenerationError =
  | DataUnavailableException
  | GenerationExistsException
  | LimitExceededException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Requests a Savings Plans recommendation generation. This enables you to calculate a fresh
 * set of Savings Plans recommendations that takes your latest usage data and current Savings
 * Plans inventory into account. You can refresh Savings Plans recommendations up to three times
 * daily for a consolidated billing family.
 *
 * `StartSavingsPlansPurchaseRecommendationGeneration` has no request syntax
 * because no input parameters are needed to support this operation.
 */
export const startSavingsPlansPurchaseRecommendationGeneration: API.OperationMethod<
  StartSavingsPlansPurchaseRecommendationGenerationRequest,
  StartSavingsPlansPurchaseRecommendationGenerationResponse,
  StartSavingsPlansPurchaseRecommendationGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSavingsPlansPurchaseRecommendationGenerationRequest,
  output: StartSavingsPlansPurchaseRecommendationGenerationResponse,
  errors: [
    DataUnavailableException,
    GenerationExistsException,
    LimitExceededException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSavingsPlansPurchaseRecommendationGeneration",
}));

export type TagResourceError =
  | LimitExceededException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * An API operation for adding one or more tags (key-value pairs) to a resource.
 *
 * You can use the `TagResource` operation with a resource that already has tags.
 * If you specify a new tag key for the resource, this tag is appended to the list of tags
 * associated with the resource. If you specify a tag key that is already associated with the
 * resource, the new tag value you specify replaces the previous value for that tag.
 *
 * Although the maximum number of array members is 200, user-tag maximum is 50. The remaining
 * are reserved for Amazon Web Services use.
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
    LimitExceededException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from a resource. Specify only tag keys in your request. Don't
 * specify the value.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAnomalyMonitorError =
  | LimitExceededException
  | UnknownMonitorException
  | CommonErrors;
/**
 * Updates an existing cost anomaly monitor. The changes made are applied going forward, and
 * doesn't change anomalies detected in the past.
 */
export const updateAnomalyMonitor: API.OperationMethod<
  UpdateAnomalyMonitorRequest,
  UpdateAnomalyMonitorResponse,
  UpdateAnomalyMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAnomalyMonitorRequest,
  output: UpdateAnomalyMonitorResponse,
  errors: [LimitExceededException, UnknownMonitorException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnomalyMonitor",
}));

export type UpdateAnomalySubscriptionError =
  | LimitExceededException
  | UnknownMonitorException
  | UnknownSubscriptionException
  | CommonErrors;
/**
 * Updates an existing cost anomaly subscription. Specify the fields that you want to update.
 * Omitted fields are unchanged.
 *
 * The JSON below describes the generic construct for each type. See Request Parameters for possible values as they apply to
 * `AnomalySubscription`.
 */
export const updateAnomalySubscription: API.OperationMethod<
  UpdateAnomalySubscriptionRequest,
  UpdateAnomalySubscriptionResponse,
  UpdateAnomalySubscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAnomalySubscriptionRequest,
  output: UpdateAnomalySubscriptionResponse,
  errors: [
    LimitExceededException,
    UnknownMonitorException,
    UnknownSubscriptionException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAnomalySubscription",
}));

export type UpdateCostAllocationTagsStatusError =
  | LimitExceededException
  | CommonErrors;
/**
 * Updates status for cost allocation tags in bulk, with maximum batch size of 20. If the tag
 * status that's updated is the same as the existing tag status, the request doesn't fail.
 * Instead, it doesn't have any effect on the tag status (for example, activating the active
 * tag).
 */
export const updateCostAllocationTagsStatus: API.OperationMethod<
  UpdateCostAllocationTagsStatusRequest,
  UpdateCostAllocationTagsStatusResponse,
  UpdateCostAllocationTagsStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCostAllocationTagsStatusRequest,
  output: UpdateCostAllocationTagsStatusResponse,
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCostAllocationTagsStatus",
}));

export type UpdateCostCategoryDefinitionError =
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | CommonErrors;
/**
 * Updates an existing cost category. Changes made to the cost category rules will be used to
 * categorize the current month’s expenses and future expenses. This won’t change categorization
 * for the previous months.
 */
export const updateCostCategoryDefinition: API.OperationMethod<
  UpdateCostCategoryDefinitionRequest,
  UpdateCostCategoryDefinitionResponse,
  UpdateCostCategoryDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCostCategoryDefinitionRequest,
  output: UpdateCostCategoryDefinitionResponse,
  errors: [
    LimitExceededException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCostCategoryDefinition",
}));
