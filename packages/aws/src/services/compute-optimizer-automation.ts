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
  sdkId: "Compute Optimizer Automation",
  serviceShapeName: "ComputeOptimizerAutomationService",
});
const auth = T.AwsAuthSigv4({ name: "aco-automation" });
const ver = T.ServiceVersion("2025-09-22");
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
            return e(
              `https://aco-automation-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://aco-automation-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://aco-automation.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://aco-automation.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class IdempotencyTokenInUseException
  extends /*@__PURE__*/ S.TaggedError<IdempotencyTokenInUseException>()(
    "IdempotencyTokenInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class IdempotentParameterMismatchException
  extends /*@__PURE__*/ S.TaggedError<IdempotentParameterMismatchException>()(
    "IdempotentParameterMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotManagementAccountException
  extends /*@__PURE__*/ S.TaggedError<NotManagementAccountException>()(
    "NotManagementAccountException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class OptInRequiredException
  extends /*@__PURE__*/ S.TaggedError<OptInRequiredException>()(
    "OptInRequiredException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type AccountId = string;
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(S.String);
export type ClientToken = string;
export interface AssociateAccountsRequest {
  accountIds: string[];
  clientToken?: string;
}
export const AssociateAccountsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountIds: AccountIdList,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateAccountsRequest",
}) as any as S.Schema<AssociateAccountsRequest>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface AssociateAccountsResponse {
  accountIds?: string[];
  errors?: string[];
}
export const AssociateAccountsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountIds: S.optional(AccountIdList),
    errors: S.optional(StringList),
  }),
).annotate({
  identifier: "AssociateAccountsResponse",
}) as any as S.Schema<AssociateAccountsResponse>;
export type RuleName = string;
export type RuleDescription = string;
export type RuleType = "OrganizationRule" | "AccountRule" | (string & {});
export const RuleType = /*@__PURE__*/ S.String;

export type RuleApplyOrder =
  | "BeforeAccountRules"
  | "AfterAccountRules"
  | (string & {});
export const RuleApplyOrder = /*@__PURE__*/ S.String;

export type OrganizationConfigurationAccountIds = string[];
export const OrganizationConfigurationAccountIds = /*@__PURE__*/ S.Array(
  S.String,
);
export interface OrganizationConfiguration {
  ruleApplyOrder?: RuleApplyOrder;
  accountIds?: string[];
}
export const OrganizationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleApplyOrder: S.optional(RuleApplyOrder),
    accountIds: S.optional(OrganizationConfigurationAccountIds),
  }),
).annotate({
  identifier: "OrganizationConfiguration",
}) as any as S.Schema<OrganizationConfiguration>;
export type RecommendedActionType =
  | "SnapshotAndDeleteUnattachedEbsVolume"
  | "UpgradeEbsVolumeType"
  | (string & {});
export const RecommendedActionType = /*@__PURE__*/ S.String;

export type RecommendedActionTypeList = RecommendedActionType[];
export const RecommendedActionTypeList = /*@__PURE__*/ S.Array(
  RecommendedActionType,
);
export type ComparisonOperator =
  | "StringEquals"
  | "StringNotEquals"
  | "StringEqualsIgnoreCase"
  | "StringNotEqualsIgnoreCase"
  | "StringLike"
  | "StringNotLike"
  | "NumericEquals"
  | "NumericNotEquals"
  | "NumericLessThan"
  | "NumericLessThanEquals"
  | "NumericGreaterThan"
  | "NumericGreaterThanEquals"
  | "StringEqualsIfExists"
  | "StringNotEqualsIfExists"
  | "StringEqualsIgnoreCaseIfExists"
  | "StringNotEqualsIgnoreCaseIfExists"
  | "StringLikeIfExists"
  | "StringNotLikeIfExists"
  | "NumericEqualsIfExists"
  | "NumericNotEqualsIfExists"
  | "NumericLessThanIfExists"
  | "NumericLessThanEqualsIfExists"
  | "NumericGreaterThanIfExists"
  | "NumericGreaterThanEqualsIfExists"
  | (string & {});
export const ComparisonOperator = /*@__PURE__*/ S.String;

export type StringCriteriaValue = string;
export type StringCriteriaValues = string[];
export const StringCriteriaValues = /*@__PURE__*/ S.Array(S.String);
export interface StringCriteriaCondition {
  comparison?: ComparisonOperator;
  values?: string[];
}
export const StringCriteriaCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparison: S.optional(ComparisonOperator),
    values: S.optional(StringCriteriaValues),
  }),
).annotate({
  identifier: "StringCriteriaCondition",
}) as any as S.Schema<StringCriteriaCondition>;
export type StringCriteriaConditionList = StringCriteriaCondition[];
export const StringCriteriaConditionList = /*@__PURE__*/ S.Array(
  StringCriteriaCondition,
);
export type IntegerList = number[];
export const IntegerList = /*@__PURE__*/ S.Array(S.Number);
export interface IntegerCriteriaCondition {
  comparison?: ComparisonOperator;
  values?: number[];
}
export const IntegerCriteriaCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparison: S.optional(ComparisonOperator),
    values: S.optional(IntegerList),
  }),
).annotate({
  identifier: "IntegerCriteriaCondition",
}) as any as S.Schema<IntegerCriteriaCondition>;
export type IntegerCriteriaConditionList = IntegerCriteriaCondition[];
export const IntegerCriteriaConditionList = /*@__PURE__*/ S.Array(
  IntegerCriteriaCondition,
);
export type DoubleList = number[];
export const DoubleList = /*@__PURE__*/ S.Array(S.Number);
export interface DoubleCriteriaCondition {
  comparison?: ComparisonOperator;
  values?: number[];
}
export const DoubleCriteriaCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparison: S.optional(ComparisonOperator),
    values: S.optional(DoubleList),
  }),
).annotate({
  identifier: "DoubleCriteriaCondition",
}) as any as S.Schema<DoubleCriteriaCondition>;
export type DoubleCriteriaConditionList = DoubleCriteriaCondition[];
export const DoubleCriteriaConditionList = /*@__PURE__*/ S.Array(
  DoubleCriteriaCondition,
);
export interface ResourceTagsCriteriaCondition {
  comparison?: ComparisonOperator;
  key?: string;
  values?: string[];
}
export const ResourceTagsCriteriaCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    comparison: S.optional(ComparisonOperator),
    key: S.optional(S.String),
    values: S.optional(StringCriteriaValues),
  }),
).annotate({
  identifier: "ResourceTagsCriteriaCondition",
}) as any as S.Schema<ResourceTagsCriteriaCondition>;
export type ResourceTagsCriteriaConditionList = ResourceTagsCriteriaCondition[];
export const ResourceTagsCriteriaConditionList = /*@__PURE__*/ S.Array(
  ResourceTagsCriteriaCondition,
);
export interface Criteria {
  region?: StringCriteriaCondition[];
  resourceArn?: StringCriteriaCondition[];
  ebsVolumeType?: StringCriteriaCondition[];
  ebsVolumeSizeInGib?: IntegerCriteriaCondition[];
  estimatedMonthlySavings?: DoubleCriteriaCondition[];
  resourceTag?: ResourceTagsCriteriaCondition[];
  lookBackPeriodInDays?: IntegerCriteriaCondition[];
  restartNeeded?: StringCriteriaCondition[];
}
export const Criteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    region: S.optional(StringCriteriaConditionList),
    resourceArn: S.optional(StringCriteriaConditionList),
    ebsVolumeType: S.optional(StringCriteriaConditionList),
    ebsVolumeSizeInGib: S.optional(IntegerCriteriaConditionList),
    estimatedMonthlySavings: S.optional(DoubleCriteriaConditionList),
    resourceTag: S.optional(ResourceTagsCriteriaConditionList),
    lookBackPeriodInDays: S.optional(IntegerCriteriaConditionList),
    restartNeeded: S.optional(StringCriteriaConditionList),
  }),
).annotate({ identifier: "Criteria" }) as any as S.Schema<Criteria>;
export interface Schedule {
  scheduleExpression?: string;
  scheduleExpressionTimezone?: string;
  executionWindowInMinutes?: number;
}
export const Schedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scheduleExpression: S.optional(S.String),
    scheduleExpressionTimezone: S.optional(S.String),
    executionWindowInMinutes: S.optional(S.Number),
  }),
).annotate({ identifier: "Schedule" }) as any as S.Schema<Schedule>;
export type RuleStatus = "Active" | "Inactive" | (string & {});
export const RuleStatus = /*@__PURE__*/ S.String;

export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateAutomationRuleRequest {
  name: string;
  description?: string;
  ruleType: RuleType;
  organizationConfiguration?: OrganizationConfiguration;
  priority?: string;
  recommendedActionTypes: RecommendedActionType[];
  criteria?: Criteria;
  schedule: Schedule;
  status: RuleStatus;
  tags?: Tag[];
  clientToken?: string;
}
export const CreateAutomationRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    ruleType: RuleType,
    organizationConfiguration: S.optional(OrganizationConfiguration),
    priority: S.optional(S.String),
    recommendedActionTypes: RecommendedActionTypeList,
    criteria: S.optional(Criteria),
    schedule: Schedule,
    status: RuleStatus,
    tags: S.optional(TagList),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateAutomationRuleRequest",
}) as any as S.Schema<CreateAutomationRuleRequest>;
export type RuleArn = string;
export type RuleId = string;
export interface CreateAutomationRuleResponse {
  ruleArn?: string;
  ruleId?: string;
  name?: string;
  description?: string;
  ruleType?: RuleType;
  ruleRevision?: number;
  organizationConfiguration?: OrganizationConfiguration;
  priority?: string;
  recommendedActionTypes?: RecommendedActionType[];
  criteria?: Criteria;
  schedule?: Schedule;
  status?: RuleStatus;
  tags?: Tag[];
  createdTimestamp?: Date;
}
export const CreateAutomationRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleArn: S.optional(S.String),
    ruleId: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    ruleType: S.optional(RuleType),
    ruleRevision: S.optional(S.Number),
    organizationConfiguration: S.optional(OrganizationConfiguration),
    priority: S.optional(S.String),
    recommendedActionTypes: S.optional(RecommendedActionTypeList),
    criteria: S.optional(Criteria),
    schedule: S.optional(Schedule),
    status: S.optional(RuleStatus),
    tags: S.optional(TagList),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CreateAutomationRuleResponse",
}) as any as S.Schema<CreateAutomationRuleResponse>;
export interface DeleteAutomationRuleRequest {
  ruleArn: string;
  ruleRevision: number;
  clientToken?: string;
}
export const DeleteAutomationRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleArn: S.String,
    ruleRevision: S.Number,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteAutomationRuleRequest",
}) as any as S.Schema<DeleteAutomationRuleRequest>;
export interface DeleteAutomationRuleResponse {}
export const DeleteAutomationRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAutomationRuleResponse",
}) as any as S.Schema<DeleteAutomationRuleResponse>;
export interface DisassociateAccountsRequest {
  accountIds: string[];
  clientToken?: string;
}
export const DisassociateAccountsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountIds: AccountIdList,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateAccountsRequest",
}) as any as S.Schema<DisassociateAccountsRequest>;
export interface DisassociateAccountsResponse {
  accountIds?: string[];
  errors?: string[];
}
export const DisassociateAccountsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountIds: S.optional(AccountIdList),
    errors: S.optional(StringList),
  }),
).annotate({
  identifier: "DisassociateAccountsResponse",
}) as any as S.Schema<DisassociateAccountsResponse>;
export type EventId = string;
export interface GetAutomationEventRequest {
  eventId: string;
}
export const GetAutomationEventRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ eventId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAutomationEventRequest",
}) as any as S.Schema<GetAutomationEventRequest>;
export type EventType =
  | "SnapshotAndDeleteUnattachedEbsVolume"
  | "UpgradeEbsVolumeType"
  | (string & {});
export const EventType = /*@__PURE__*/ S.String;

export type EventStatus =
  | "Ready"
  | "InProgress"
  | "Complete"
  | "Failed"
  | "Cancelled"
  | "RollbackReady"
  | "RollbackInProgress"
  | "RollbackComplete"
  | "RollbackFailed"
  | (string & {});
export const EventStatus = /*@__PURE__*/ S.String;

export type ResourceArn = string;
export type ResourceId = string;
export type RecommendedActionId = string;
export type ResourceType = "EbsVolume" | (string & {});
export const ResourceType = /*@__PURE__*/ S.String;

export type SavingsEstimationMode =
  | "BeforeDiscount"
  | "AfterDiscount"
  | (string & {});
export const SavingsEstimationMode = /*@__PURE__*/ S.String;

export interface EstimatedMonthlySavings {
  currency: string;
  beforeDiscountSavings: number;
  afterDiscountSavings: number;
  savingsEstimationMode: SavingsEstimationMode;
}
export const EstimatedMonthlySavings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    currency: S.String,
    beforeDiscountSavings: S.Number,
    afterDiscountSavings: S.Number,
    savingsEstimationMode: SavingsEstimationMode,
  }),
).annotate({
  identifier: "EstimatedMonthlySavings",
}) as any as S.Schema<EstimatedMonthlySavings>;
export interface GetAutomationEventResponse {
  eventId?: string;
  eventDescription?: string;
  eventType?: EventType;
  eventStatus?: EventStatus;
  eventStatusReason?: string;
  resourceArn?: string;
  resourceId?: string;
  recommendedActionId?: string;
  accountId?: string;
  region?: string;
  ruleId?: string;
  resourceType?: ResourceType;
  createdTimestamp?: Date;
  completedTimestamp?: Date;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
}
export const GetAutomationEventResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.optional(S.String),
    eventDescription: S.optional(S.String),
    eventType: S.optional(EventType),
    eventStatus: S.optional(EventStatus),
    eventStatusReason: S.optional(S.String),
    resourceArn: S.optional(S.String),
    resourceId: S.optional(S.String),
    recommendedActionId: S.optional(S.String),
    accountId: S.optional(S.String),
    region: S.optional(S.String),
    ruleId: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    completedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    estimatedMonthlySavings: S.optional(EstimatedMonthlySavings),
  }),
).annotate({
  identifier: "GetAutomationEventResponse",
}) as any as S.Schema<GetAutomationEventResponse>;
export interface GetAutomationRuleRequest {
  ruleArn: string;
}
export const GetAutomationRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetAutomationRuleRequest",
}) as any as S.Schema<GetAutomationRuleRequest>;
export interface GetAutomationRuleResponse {
  ruleArn?: string;
  ruleId?: string;
  name?: string;
  description?: string;
  ruleType?: RuleType;
  ruleRevision?: number;
  accountId?: string;
  organizationConfiguration?: OrganizationConfiguration;
  priority?: string;
  recommendedActionTypes?: RecommendedActionType[];
  criteria?: Criteria;
  schedule?: Schedule;
  status?: RuleStatus;
  tags?: Tag[];
  createdTimestamp?: Date;
  lastUpdatedTimestamp?: Date;
}
export const GetAutomationRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleArn: S.optional(S.String),
    ruleId: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    ruleType: S.optional(RuleType),
    ruleRevision: S.optional(S.Number),
    accountId: S.optional(S.String),
    organizationConfiguration: S.optional(OrganizationConfiguration),
    priority: S.optional(S.String),
    recommendedActionTypes: S.optional(RecommendedActionTypeList),
    criteria: S.optional(Criteria),
    schedule: S.optional(Schedule),
    status: S.optional(RuleStatus),
    tags: S.optional(TagList),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetAutomationRuleResponse",
}) as any as S.Schema<GetAutomationRuleResponse>;
export interface GetEnrollmentConfigurationRequest {}
export const GetEnrollmentConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetEnrollmentConfigurationRequest",
}) as any as S.Schema<GetEnrollmentConfigurationRequest>;
export type EnrollmentStatus =
  | "Active"
  | "Inactive"
  | "Pending"
  | "Failed"
  | (string & {});
export const EnrollmentStatus = /*@__PURE__*/ S.String;

export type OrganizationRuleMode = "AnyAllowed" | "NoneAllowed" | (string & {});
export const OrganizationRuleMode = /*@__PURE__*/ S.String;

export interface GetEnrollmentConfigurationResponse {
  status: EnrollmentStatus;
  statusReason?: string;
  organizationRuleMode?: OrganizationRuleMode;
  lastUpdatedTimestamp?: Date;
}
export const GetEnrollmentConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    status: EnrollmentStatus,
    statusReason: S.optional(S.String),
    organizationRuleMode: S.optional(OrganizationRuleMode),
    lastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetEnrollmentConfigurationResponse",
}) as any as S.Schema<GetEnrollmentConfigurationResponse>;
export type NextToken = string;
export interface ListAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListAccountsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAccountsRequest",
}) as any as S.Schema<ListAccountsRequest>;
export interface AccountInfo {
  accountId: string;
  status: EnrollmentStatus;
  organizationRuleMode: OrganizationRuleMode;
  statusReason?: string;
  lastUpdatedTimestamp: Date;
}
export const AccountInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.String,
    status: EnrollmentStatus,
    organizationRuleMode: OrganizationRuleMode,
    statusReason: S.optional(S.String),
    lastUpdatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "AccountInfo" }) as any as S.Schema<AccountInfo>;
export type AccountInfoList = AccountInfo[];
export const AccountInfoList = /*@__PURE__*/ S.Array(AccountInfo);
export interface ListAccountsResponse {
  accounts: AccountInfo[];
  nextToken?: string;
}
export const ListAccountsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accounts: AccountInfoList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListAccountsResponse",
}) as any as S.Schema<ListAccountsResponse>;
export type AutomationEventFilterName = string;
export type FilterValue = string;
export type FilterValues = string[];
export const FilterValues = /*@__PURE__*/ S.Array(S.String);
export interface AutomationEventFilter {
  name: string;
  values: string[];
}
export const AutomationEventFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: FilterValues }),
).annotate({
  identifier: "AutomationEventFilter",
}) as any as S.Schema<AutomationEventFilter>;
export type AutomationEventFilterList = AutomationEventFilter[];
export const AutomationEventFilterList = /*@__PURE__*/ S.Array(
  AutomationEventFilter,
);
export interface ListAutomationEventsRequest {
  filters?: AutomationEventFilter[];
  startTimeInclusive?: Date;
  endTimeExclusive?: Date;
  maxResults?: number;
  nextToken?: string;
}
export const ListAutomationEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(AutomationEventFilterList),
    startTimeInclusive: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    endTimeExclusive: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAutomationEventsRequest",
}) as any as S.Schema<ListAutomationEventsRequest>;
export interface AutomationEvent {
  eventId?: string;
  eventDescription?: string;
  eventType?: EventType;
  eventStatus?: EventStatus;
  eventStatusReason?: string;
  resourceArn?: string;
  resourceId?: string;
  recommendedActionId?: string;
  accountId?: string;
  region?: string;
  ruleId?: string;
  resourceType?: ResourceType;
  createdTimestamp?: Date;
  completedTimestamp?: Date;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
}
export const AutomationEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.optional(S.String),
    eventDescription: S.optional(S.String),
    eventType: S.optional(EventType),
    eventStatus: S.optional(EventStatus),
    eventStatusReason: S.optional(S.String),
    resourceArn: S.optional(S.String),
    resourceId: S.optional(S.String),
    recommendedActionId: S.optional(S.String),
    accountId: S.optional(S.String),
    region: S.optional(S.String),
    ruleId: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    completedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    estimatedMonthlySavings: S.optional(EstimatedMonthlySavings),
  }),
).annotate({
  identifier: "AutomationEvent",
}) as any as S.Schema<AutomationEvent>;
export type AutomationEvents = AutomationEvent[];
export const AutomationEvents = /*@__PURE__*/ S.Array(AutomationEvent);
export interface ListAutomationEventsResponse {
  automationEvents?: AutomationEvent[];
  nextToken?: string;
}
export const ListAutomationEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    automationEvents: S.optional(AutomationEvents),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAutomationEventsResponse",
}) as any as S.Schema<ListAutomationEventsResponse>;
export interface ListAutomationEventStepsRequest {
  eventId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAutomationEventStepsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.String,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAutomationEventStepsRequest",
}) as any as S.Schema<ListAutomationEventStepsRequest>;
export type StepId = string;
export type StepType =
  | "CreateEbsSnapshot"
  | "DeleteEbsVolume"
  | "ModifyEbsVolume"
  | "CreateEbsVolume"
  | (string & {});
export const StepType = /*@__PURE__*/ S.String;

export type StepStatus =
  | "Ready"
  | "InProgress"
  | "Complete"
  | "Failed"
  | (string & {});
export const StepStatus = /*@__PURE__*/ S.String;

export interface AutomationEventStep {
  eventId?: string;
  stepId?: string;
  stepType?: StepType;
  stepStatus?: StepStatus;
  resourceId?: string;
  startTimestamp?: Date;
  completedTimestamp?: Date;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
}
export const AutomationEventStep = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.optional(S.String),
    stepId: S.optional(S.String),
    stepType: S.optional(StepType),
    stepStatus: S.optional(StepStatus),
    resourceId: S.optional(S.String),
    startTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    estimatedMonthlySavings: S.optional(EstimatedMonthlySavings),
  }),
).annotate({
  identifier: "AutomationEventStep",
}) as any as S.Schema<AutomationEventStep>;
export type AutomationEventSteps = AutomationEventStep[];
export const AutomationEventSteps = /*@__PURE__*/ S.Array(AutomationEventStep);
export interface ListAutomationEventStepsResponse {
  automationEventSteps?: AutomationEventStep[];
  nextToken?: string;
}
export const ListAutomationEventStepsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    automationEventSteps: S.optional(AutomationEventSteps),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAutomationEventStepsResponse",
}) as any as S.Schema<ListAutomationEventStepsResponse>;
export interface ListAutomationEventSummariesRequest {
  filters?: AutomationEventFilter[];
  startDateInclusive?: string;
  endDateExclusive?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListAutomationEventSummariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(AutomationEventFilterList),
    startDateInclusive: S.optional(S.String),
    endDateExclusive: S.optional(S.String),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAutomationEventSummariesRequest",
}) as any as S.Schema<ListAutomationEventSummariesRequest>;
export type SummaryDimensionKey = string;
export interface SummaryDimension {
  key: string;
  value: string;
}
export const SummaryDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({
  identifier: "SummaryDimension",
}) as any as S.Schema<SummaryDimension>;
export type SummaryDimensions = SummaryDimension[];
export const SummaryDimensions = /*@__PURE__*/ S.Array(SummaryDimension);
export interface TimePeriod {
  startTimeInclusive?: Date;
  endTimeExclusive?: Date;
}
export const TimePeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTimeInclusive: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    endTimeExclusive: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "TimePeriod" }) as any as S.Schema<TimePeriod>;
export interface SummaryTotals {
  automationEventCount?: number;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
}
export const SummaryTotals = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    automationEventCount: S.optional(S.Number),
    estimatedMonthlySavings: S.optional(EstimatedMonthlySavings),
  }),
).annotate({ identifier: "SummaryTotals" }) as any as S.Schema<SummaryTotals>;
export interface AutomationEventSummary {
  key?: string;
  dimensions?: SummaryDimension[];
  timePeriod?: TimePeriod;
  total?: SummaryTotals;
}
export const AutomationEventSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    key: S.optional(S.String),
    dimensions: S.optional(SummaryDimensions),
    timePeriod: S.optional(TimePeriod),
    total: S.optional(SummaryTotals),
  }),
).annotate({
  identifier: "AutomationEventSummary",
}) as any as S.Schema<AutomationEventSummary>;
export type AutomationEventSummaryList = AutomationEventSummary[];
export const AutomationEventSummaryList = /*@__PURE__*/ S.Array(
  AutomationEventSummary,
);
export interface ListAutomationEventSummariesResponse {
  automationEventSummaries?: AutomationEventSummary[];
  nextToken?: string;
}
export const ListAutomationEventSummariesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      automationEventSummaries: S.optional(AutomationEventSummaryList),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListAutomationEventSummariesResponse",
}) as any as S.Schema<ListAutomationEventSummariesResponse>;
export interface OrganizationScope {
  accountIds?: string[];
}
export const OrganizationScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountIds: S.optional(OrganizationConfigurationAccountIds) }),
).annotate({
  identifier: "OrganizationScope",
}) as any as S.Schema<OrganizationScope>;
export interface ListAutomationRulePreviewRequest {
  ruleType: RuleType;
  organizationScope?: OrganizationScope;
  recommendedActionTypes: RecommendedActionType[];
  criteria?: Criteria;
  maxResults?: number;
  nextToken?: string;
}
export const ListAutomationRulePreviewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleType: RuleType,
    organizationScope: S.optional(OrganizationScope),
    recommendedActionTypes: RecommendedActionTypeList,
    criteria: S.optional(Criteria),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAutomationRulePreviewRequest",
}) as any as S.Schema<ListAutomationRulePreviewRequest>;
export interface EbsVolumeConfiguration {
  type?: string;
  sizeInGib?: number;
  iops?: number;
  throughput?: number;
}
export const EbsVolumeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(S.String),
    sizeInGib: S.optional(S.Number),
    iops: S.optional(S.Number),
    throughput: S.optional(S.Number),
  }),
).annotate({
  identifier: "EbsVolumeConfiguration",
}) as any as S.Schema<EbsVolumeConfiguration>;
export interface EbsVolume {
  configuration?: EbsVolumeConfiguration;
}
export const EbsVolume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configuration: S.optional(EbsVolumeConfiguration) }),
).annotate({ identifier: "EbsVolume" }) as any as S.Schema<EbsVolume>;
export type ResourceDetails = { ebsVolume: EbsVolume };
export const ResourceDetails = /*@__PURE__*/ S.Union([
  S.Struct({ ebsVolume: EbsVolume }),
]);
export interface PreviewResult {
  recommendedActionId?: string;
  resourceArn?: string;
  resourceId?: string;
  accountId?: string;
  region?: string;
  resourceType?: ResourceType;
  lookBackPeriodInDays?: number;
  recommendedActionType?: RecommendedActionType;
  currentResourceSummary?: string;
  currentResourceDetails?: ResourceDetails;
  recommendedResourceSummary?: string;
  recommendedResourceDetails?: ResourceDetails;
  restartNeeded?: boolean;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
  resourceTags?: Tag[];
}
export const PreviewResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendedActionId: S.optional(S.String),
    resourceArn: S.optional(S.String),
    resourceId: S.optional(S.String),
    accountId: S.optional(S.String),
    region: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    lookBackPeriodInDays: S.optional(S.Number),
    recommendedActionType: S.optional(RecommendedActionType),
    currentResourceSummary: S.optional(S.String),
    currentResourceDetails: S.optional(ResourceDetails),
    recommendedResourceSummary: S.optional(S.String),
    recommendedResourceDetails: S.optional(ResourceDetails),
    restartNeeded: S.optional(S.Boolean),
    estimatedMonthlySavings: S.optional(EstimatedMonthlySavings),
    resourceTags: S.optional(TagList),
  }),
).annotate({ identifier: "PreviewResult" }) as any as S.Schema<PreviewResult>;
export type PreviewResults = PreviewResult[];
export const PreviewResults = /*@__PURE__*/ S.Array(PreviewResult);
export interface ListAutomationRulePreviewResponse {
  previewResults?: PreviewResult[];
  nextToken?: string;
}
export const ListAutomationRulePreviewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    previewResults: S.optional(PreviewResults),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAutomationRulePreviewResponse",
}) as any as S.Schema<ListAutomationRulePreviewResponse>;
export interface ListAutomationRulePreviewSummariesRequest {
  ruleType: RuleType;
  organizationScope?: OrganizationScope;
  recommendedActionTypes: RecommendedActionType[];
  criteria?: Criteria;
  maxResults?: number;
  nextToken?: string;
}
export const ListAutomationRulePreviewSummariesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ruleType: RuleType,
      organizationScope: S.optional(OrganizationScope),
      recommendedActionTypes: RecommendedActionTypeList,
      criteria: S.optional(Criteria),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListAutomationRulePreviewSummariesRequest",
  }) as any as S.Schema<ListAutomationRulePreviewSummariesRequest>;
export interface RulePreviewTotal {
  recommendedActionCount: number;
  estimatedMonthlySavings: EstimatedMonthlySavings;
}
export const RulePreviewTotal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendedActionCount: S.Number,
    estimatedMonthlySavings: EstimatedMonthlySavings,
  }),
).annotate({
  identifier: "RulePreviewTotal",
}) as any as S.Schema<RulePreviewTotal>;
export interface PreviewResultSummary {
  key: string;
  total: RulePreviewTotal;
}
export const PreviewResultSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, total: RulePreviewTotal }),
).annotate({
  identifier: "PreviewResultSummary",
}) as any as S.Schema<PreviewResultSummary>;
export type PreviewResultSummaries = PreviewResultSummary[];
export const PreviewResultSummaries =
  /*@__PURE__*/ S.Array(PreviewResultSummary);
export interface ListAutomationRulePreviewSummariesResponse {
  previewResultSummaries?: PreviewResultSummary[];
  nextToken?: string;
}
export const ListAutomationRulePreviewSummariesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      previewResultSummaries: S.optional(PreviewResultSummaries),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListAutomationRulePreviewSummariesResponse",
  }) as any as S.Schema<ListAutomationRulePreviewSummariesResponse>;
export type AutomationRuleFilterName = string;
export interface Filter {
  name: string;
  values: string[];
}
export const Filter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: FilterValues }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type FilterList = Filter[];
export const FilterList = /*@__PURE__*/ S.Array(Filter);
export interface ListAutomationRulesRequest {
  filters?: Filter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListAutomationRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(FilterList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAutomationRulesRequest",
}) as any as S.Schema<ListAutomationRulesRequest>;
export interface AutomationRule {
  ruleArn?: string;
  ruleId?: string;
  name?: string;
  description?: string;
  ruleType?: RuleType;
  ruleRevision?: number;
  accountId?: string;
  organizationConfiguration?: OrganizationConfiguration;
  priority?: string;
  recommendedActionTypes?: RecommendedActionType[];
  schedule?: Schedule;
  status?: RuleStatus;
  createdTimestamp?: Date;
  lastUpdatedTimestamp?: Date;
}
export const AutomationRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleArn: S.optional(S.String),
    ruleId: S.optional(S.String),
    name: S.optional(S.String),
    description: S.optional(S.String),
    ruleType: S.optional(RuleType),
    ruleRevision: S.optional(S.Number),
    accountId: S.optional(S.String),
    organizationConfiguration: S.optional(OrganizationConfiguration),
    priority: S.optional(S.String),
    recommendedActionTypes: S.optional(RecommendedActionTypeList),
    schedule: S.optional(Schedule),
    status: S.optional(RuleStatus),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "AutomationRule" }) as any as S.Schema<AutomationRule>;
export type AutomationRules = AutomationRule[];
export const AutomationRules = /*@__PURE__*/ S.Array(AutomationRule);
export interface ListAutomationRulesResponse {
  automationRules?: AutomationRule[];
  nextToken?: string;
}
export const ListAutomationRulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    automationRules: S.optional(AutomationRules),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAutomationRulesResponse",
}) as any as S.Schema<ListAutomationRulesResponse>;
export type RecommendedActionFilterName = string;
export interface RecommendedActionFilter {
  name: string;
  values: string[];
}
export const RecommendedActionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, values: FilterValues }),
).annotate({
  identifier: "RecommendedActionFilter",
}) as any as S.Schema<RecommendedActionFilter>;
export type RecommendedActionFilterList = RecommendedActionFilter[];
export const RecommendedActionFilterList = /*@__PURE__*/ S.Array(
  RecommendedActionFilter,
);
export interface ListRecommendedActionsRequest {
  filters?: RecommendedActionFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListRecommendedActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filters: S.optional(RecommendedActionFilterList),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRecommendedActionsRequest",
}) as any as S.Schema<ListRecommendedActionsRequest>;
export interface RecommendedAction {
  recommendedActionId?: string;
  resourceArn?: string;
  resourceId?: string;
  accountId?: string;
  region?: string;
  resourceType?: ResourceType;
  lookBackPeriodInDays?: number;
  recommendedActionType?: RecommendedActionType;
  currentResourceSummary?: string;
  currentResourceDetails?: ResourceDetails;
  recommendedResourceSummary?: string;
  recommendedResourceDetails?: ResourceDetails;
  restartNeeded?: boolean;
  estimatedMonthlySavings?: EstimatedMonthlySavings;
  resourceTags?: Tag[];
}
export const RecommendedAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendedActionId: S.optional(S.String),
    resourceArn: S.optional(S.String),
    resourceId: S.optional(S.String),
    accountId: S.optional(S.String),
    region: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    lookBackPeriodInDays: S.optional(S.Number),
    recommendedActionType: S.optional(RecommendedActionType),
    currentResourceSummary: S.optional(S.String),
    currentResourceDetails: S.optional(ResourceDetails),
    recommendedResourceSummary: S.optional(S.String),
    recommendedResourceDetails: S.optional(ResourceDetails),
    restartNeeded: S.optional(S.Boolean),
    estimatedMonthlySavings: S.optional(EstimatedMonthlySavings),
    resourceTags: S.optional(TagList),
  }),
).annotate({
  identifier: "RecommendedAction",
}) as any as S.Schema<RecommendedAction>;
export type RecommendedActions = RecommendedAction[];
export const RecommendedActions = /*@__PURE__*/ S.Array(RecommendedAction);
export interface ListRecommendedActionsResponse {
  recommendedActions?: RecommendedAction[];
  nextToken?: string;
}
export const ListRecommendedActionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendedActions: S.optional(RecommendedActions),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecommendedActionsResponse",
}) as any as S.Schema<ListRecommendedActionsResponse>;
export interface ListRecommendedActionSummariesRequest {
  filters?: RecommendedActionFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListRecommendedActionSummariesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      filters: S.optional(RecommendedActionFilterList),
      maxResults: S.optional(S.Number),
      nextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListRecommendedActionSummariesRequest",
}) as any as S.Schema<ListRecommendedActionSummariesRequest>;
export interface RecommendedActionTotal {
  recommendedActionCount: number;
  estimatedMonthlySavings: EstimatedMonthlySavings;
}
export const RecommendedActionTotal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendedActionCount: S.Number,
    estimatedMonthlySavings: EstimatedMonthlySavings,
  }),
).annotate({
  identifier: "RecommendedActionTotal",
}) as any as S.Schema<RecommendedActionTotal>;
export interface RecommendedActionSummary {
  key: string;
  total: RecommendedActionTotal;
}
export const RecommendedActionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ key: S.String, total: RecommendedActionTotal }),
).annotate({
  identifier: "RecommendedActionSummary",
}) as any as S.Schema<RecommendedActionSummary>;
export type RecommendedActionSummaries = RecommendedActionSummary[];
export const RecommendedActionSummaries = /*@__PURE__*/ S.Array(
  RecommendedActionSummary,
);
export interface ListRecommendedActionSummariesResponse {
  recommendedActionSummaries?: RecommendedActionSummary[];
  nextToken?: string;
}
export const ListRecommendedActionSummariesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      recommendedActionSummaries: S.optional(RecommendedActionSummaries),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListRecommendedActionSummariesResponse",
}) as any as S.Schema<ListRecommendedActionSummariesResponse>;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface RollbackAutomationEventRequest {
  eventId: string;
  clientToken?: string;
}
export const RollbackAutomationEventRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RollbackAutomationEventRequest",
}) as any as S.Schema<RollbackAutomationEventRequest>;
export interface RollbackAutomationEventResponse {
  eventId?: string;
  eventStatus?: EventStatus;
}
export const RollbackAutomationEventResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    eventId: S.optional(S.String),
    eventStatus: S.optional(EventStatus),
  }),
).annotate({
  identifier: "RollbackAutomationEventResponse",
}) as any as S.Schema<RollbackAutomationEventResponse>;
export interface StartAutomationEventRequest {
  recommendedActionId: string;
  clientToken?: string;
}
export const StartAutomationEventRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendedActionId: S.String,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartAutomationEventRequest",
}) as any as S.Schema<StartAutomationEventRequest>;
export interface StartAutomationEventResponse {
  recommendedActionId?: string;
  eventId?: string;
  eventStatus?: EventStatus;
}
export const StartAutomationEventResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendedActionId: S.optional(S.String),
    eventId: S.optional(S.String),
    eventStatus: S.optional(EventStatus),
  }),
).annotate({
  identifier: "StartAutomationEventResponse",
}) as any as S.Schema<StartAutomationEventResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  ruleRevision: number;
  tags: Tag[];
  clientToken?: string;
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    ruleRevision: S.Number,
    tags: TagList,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
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
  resourceArn: string;
  ruleRevision: number;
  tagKeys: string[];
  clientToken?: string;
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String,
    ruleRevision: S.Number,
    tagKeys: TagKeyList,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
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
export interface UpdateAutomationRuleRequest {
  ruleArn: string;
  ruleRevision: number;
  name?: string;
  description?: string;
  ruleType?: RuleType;
  organizationConfiguration?: OrganizationConfiguration;
  priority?: string;
  recommendedActionTypes?: RecommendedActionType[];
  criteria?: Criteria;
  schedule?: Schedule;
  status?: RuleStatus;
  clientToken?: string;
}
export const UpdateAutomationRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleArn: S.String,
    ruleRevision: S.Number,
    name: S.optional(S.String),
    description: S.optional(S.String),
    ruleType: S.optional(RuleType),
    organizationConfiguration: S.optional(OrganizationConfiguration),
    priority: S.optional(S.String),
    recommendedActionTypes: S.optional(RecommendedActionTypeList),
    criteria: S.optional(Criteria),
    schedule: S.optional(Schedule),
    status: S.optional(RuleStatus),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateAutomationRuleRequest",
}) as any as S.Schema<UpdateAutomationRuleRequest>;
export interface UpdateAutomationRuleResponse {
  ruleArn?: string;
  ruleRevision?: number;
  name?: string;
  description?: string;
  ruleType?: RuleType;
  organizationConfiguration?: OrganizationConfiguration;
  priority?: string;
  recommendedActionTypes?: RecommendedActionType[];
  criteria?: Criteria;
  schedule?: Schedule;
  status?: RuleStatus;
  createdTimestamp?: Date;
  lastUpdatedTimestamp?: Date;
}
export const UpdateAutomationRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleArn: S.optional(S.String),
    ruleRevision: S.optional(S.Number),
    name: S.optional(S.String),
    description: S.optional(S.String),
    ruleType: S.optional(RuleType),
    organizationConfiguration: S.optional(OrganizationConfiguration),
    priority: S.optional(S.String),
    recommendedActionTypes: S.optional(RecommendedActionTypeList),
    criteria: S.optional(Criteria),
    schedule: S.optional(Schedule),
    status: S.optional(RuleStatus),
    createdTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "UpdateAutomationRuleResponse",
}) as any as S.Schema<UpdateAutomationRuleResponse>;
export interface UpdateEnrollmentConfigurationRequest {
  status: EnrollmentStatus;
  clientToken?: string;
}
export const UpdateEnrollmentConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      status: EnrollmentStatus,
      clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "UpdateEnrollmentConfigurationRequest",
}) as any as S.Schema<UpdateEnrollmentConfigurationRequest>;
export interface UpdateEnrollmentConfigurationResponse {
  status: EnrollmentStatus;
  statusReason?: string;
  lastUpdatedTimestamp: Date;
}
export const UpdateEnrollmentConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      status: EnrollmentStatus,
      statusReason: S.optional(S.String),
      lastUpdatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "UpdateEnrollmentConfigurationResponse",
}) as any as S.Schema<UpdateEnrollmentConfigurationResponse>;
export type AssociateAccountsError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | NotManagementAccountException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates one or more member accounts with your organization's management account, enabling centralized implementation of optimization actions across those accounts. Once associated, the management account (or a delegated administrator) can apply recommended actions to the member account. When you associate a member account, its organization rule mode is automatically set to "Any allowed," which permits the management account to create Automation rules that automatically apply actions to that account. If the member account has not previously enabled the Automation feature, the association process automatically enables it.
 *
 * Only the management account or a delegated administrator can perform this action.
 */
export const associateAccounts: API.OperationMethod<
  AssociateAccountsRequest,
  AssociateAccountsResponse,
  AssociateAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateAccountsRequest,
  output: AssociateAccountsResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    NotManagementAccountException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAccounts",
}));

export type CreateAutomationRuleError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new automation rule to apply recommended actions to resources based on specified criteria.
 */
export const createAutomationRule: API.OperationMethod<
  CreateAutomationRuleRequest,
  CreateAutomationRuleResponse,
  CreateAutomationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAutomationRuleRequest,
  output: CreateAutomationRuleResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutomationRule",
}));

export type DeleteAutomationRuleError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes an existing automation rule.
 */
export const deleteAutomationRule: API.OperationMethod<
  DeleteAutomationRuleRequest,
  DeleteAutomationRuleResponse,
  DeleteAutomationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAutomationRuleRequest,
  output: DeleteAutomationRuleResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutomationRule",
}));

export type DisassociateAccountsError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | NotManagementAccountException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates member accounts from your organization's management account, removing centralized automation capabilities. Once disassociated, organization rules no longer apply to the member account, and the management account (or delegated administrator) cannot create Automation rules for that account.
 *
 * Only the management account or a delegated administrator can perform this action.
 */
export const disassociateAccounts: API.OperationMethod<
  DisassociateAccountsRequest,
  DisassociateAccountsResponse,
  DisassociateAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateAccountsRequest,
  output: DisassociateAccountsResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    NotManagementAccountException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAccounts",
}));

export type GetAutomationEventError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves details about a specific automation event.
 */
export const getAutomationEvent: API.OperationMethod<
  GetAutomationEventRequest,
  GetAutomationEventResponse,
  GetAutomationEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutomationEventRequest,
  output: GetAutomationEventResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomationEvent",
}));

export type GetAutomationRuleError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves details about a specific automation rule.
 */
export const getAutomationRule: API.OperationMethod<
  GetAutomationRuleRequest,
  GetAutomationRuleResponse,
  GetAutomationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAutomationRuleRequest,
  output: GetAutomationRuleResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomationRule",
}));

export type GetEnrollmentConfigurationError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the current enrollment configuration for Compute Optimizer Automation.
 */
export const getEnrollmentConfiguration: API.OperationMethod<
  GetEnrollmentConfigurationRequest,
  GetEnrollmentConfigurationResponse,
  GetEnrollmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEnrollmentConfigurationRequest,
  output: GetEnrollmentConfigurationResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEnrollmentConfiguration",
}));

export type ListAccountsError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | NotManagementAccountException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the accounts in your organization that are enrolled in Compute Optimizer and whether they have enabled Automation.
 *
 * Only the management account or a delegated administrator can perform this action.
 */
export const listAccounts: API.PaginatedOperationMethod<
  ListAccountsRequest,
  ListAccountsResponse,
  ListAccountsError,
  Credentials | HttpClient.HttpClient,
  AccountInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    NotManagementAccountException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomationEventsError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists automation events based on specified filters. You can retrieve events that were created within the past year.
 */
export const listAutomationEvents: API.PaginatedOperationMethod<
  ListAutomationEventsRequest,
  ListAutomationEventsResponse,
  ListAutomationEventsError,
  Credentials | HttpClient.HttpClient,
  AutomationEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutomationEventsRequest,
  output: ListAutomationEventsResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "automationEvents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomationEventStepsError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the steps for a specific automation event. You can only list steps for events created within the past year.
 */
export const listAutomationEventSteps: API.PaginatedOperationMethod<
  ListAutomationEventStepsRequest,
  ListAutomationEventStepsResponse,
  ListAutomationEventStepsError,
  Credentials | HttpClient.HttpClient,
  AutomationEventStep
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutomationEventStepsRequest,
  output: ListAutomationEventStepsResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationEventSteps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "automationEventSteps",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomationEventSummariesError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides a summary of automation events based on specified filters. Only events created within the past year will be included in the summary.
 */
export const listAutomationEventSummaries: API.PaginatedOperationMethod<
  ListAutomationEventSummariesRequest,
  ListAutomationEventSummariesResponse,
  ListAutomationEventSummariesError,
  Credentials | HttpClient.HttpClient,
  AutomationEventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutomationEventSummariesRequest,
  output: ListAutomationEventSummariesResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationEventSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "automationEventSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomationRulePreviewError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a preview of the recommended actions that match your Automation rule's configuration and criteria.
 */
export const listAutomationRulePreview: API.PaginatedOperationMethod<
  ListAutomationRulePreviewRequest,
  ListAutomationRulePreviewResponse,
  ListAutomationRulePreviewError,
  Credentials | HttpClient.HttpClient,
  PreviewResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutomationRulePreviewRequest,
  output: ListAutomationRulePreviewResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationRulePreview",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "previewResults",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomationRulePreviewSummariesError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a summary of the recommended actions that match your rule preview configuration and criteria.
 */
export const listAutomationRulePreviewSummaries: API.PaginatedOperationMethod<
  ListAutomationRulePreviewSummariesRequest,
  ListAutomationRulePreviewSummariesResponse,
  ListAutomationRulePreviewSummariesError,
  Credentials | HttpClient.HttpClient,
  PreviewResultSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutomationRulePreviewSummariesRequest,
  output: ListAutomationRulePreviewSummariesResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationRulePreviewSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "previewResultSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomationRulesError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the automation rules that match specified filters.
 */
export const listAutomationRules: API.PaginatedOperationMethod<
  ListAutomationRulesRequest,
  ListAutomationRulesResponse,
  ListAutomationRulesError,
  Credentials | HttpClient.HttpClient,
  AutomationRule
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAutomationRulesRequest,
  output: ListAutomationRulesResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomationRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "automationRules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendedActionsError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the recommended actions based that match specified filters.
 *
 * Management accounts and delegated administrators can retrieve recommended actions that include associated member accounts. You can associate a member account using `AssociateAccounts`.
 */
export const listRecommendedActions: API.PaginatedOperationMethod<
  ListRecommendedActionsRequest,
  ListRecommendedActionsResponse,
  ListRecommendedActionsError,
  Credentials | HttpClient.HttpClient,
  RecommendedAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecommendedActionsRequest,
  output: ListRecommendedActionsResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendedActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendedActions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendedActionSummariesError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Provides a summary of recommended actions based on specified filters.
 *
 * Management accounts and delegated administrators can retrieve recommended actions that include associated member accounts. You can associate a member account using `AssociateAccounts`.
 */
export const listRecommendedActionSummaries: API.PaginatedOperationMethod<
  ListRecommendedActionSummariesRequest,
  ListRecommendedActionSummariesResponse,
  ListRecommendedActionSummariesError,
  Credentials | HttpClient.HttpClient,
  RecommendedActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecommendedActionSummariesRequest,
  output: ListRecommendedActionSummariesResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendedActionSummaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendedActionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ForbiddenException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the tags for a specified resource.
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
    ForbiddenException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type RollbackAutomationEventError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Initiates a rollback for a completed automation event.
 *
 * Management accounts and delegated administrators can only initiate a rollback for events belonging to associated member accounts. You can associate a member account using `AssociateAccounts`.
 */
export const rollbackAutomationEvent: API.OperationMethod<
  RollbackAutomationEventRequest,
  RollbackAutomationEventResponse,
  RollbackAutomationEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RollbackAutomationEventRequest,
  output: RollbackAutomationEventResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RollbackAutomationEvent",
}));

export type StartAutomationEventError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Initiates a one-time, on-demand automation for the specified recommended action.
 *
 * Management accounts and delegated administrators can only initiate recommended actions for associated member accounts. You can associate a member account using `AssociateAccounts`.
 */
export const startAutomationEvent: API.OperationMethod<
  StartAutomationEventRequest,
  StartAutomationEventResponse,
  StartAutomationEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartAutomationEventRequest,
  output: StartAutomationEventResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAutomationEvent",
}));

export type TagResourceError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds tags to the specified resource.
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
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes tags from the specified resource.
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
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAutomationRuleError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an existing automation rule.
 */
export const updateAutomationRule: API.OperationMethod<
  UpdateAutomationRuleRequest,
  UpdateAutomationRuleResponse,
  UpdateAutomationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAutomationRuleRequest,
  output: UpdateAutomationRuleResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutomationRule",
}));

export type UpdateEnrollmentConfigurationError =
  | AccessDeniedException
  | ForbiddenException
  | IdempotencyTokenInUseException
  | IdempotentParameterMismatchException
  | InternalServerException
  | InvalidParameterValueException
  | NotManagementAccountException
  | OptInRequiredException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates your account’s Compute Optimizer Automation enrollment configuration.
 */
export const updateEnrollmentConfiguration: API.OperationMethod<
  UpdateEnrollmentConfigurationRequest,
  UpdateEnrollmentConfigurationResponse,
  UpdateEnrollmentConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEnrollmentConfigurationRequest,
  output: UpdateEnrollmentConfigurationResponse,
  errors: [
    AccessDeniedException,
    ForbiddenException,
    IdempotencyTokenInUseException,
    IdempotentParameterMismatchException,
    InternalServerException,
    InvalidParameterValueException,
    NotManagementAccountException,
    OptInRequiredException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEnrollmentConfiguration",
}));
