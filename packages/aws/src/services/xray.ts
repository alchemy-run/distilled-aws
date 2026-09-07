import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({ sdkId: "XRay", serviceShapeName: "AWSXRay" });
const auth = T.AwsAuthSigv4({ name: "xray" });
const ver = T.ServiceVersion("2016-04-12");
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
              `https://xray-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://xray-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://xray.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://xray.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class GroupAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<GroupAlreadyExists>()(
    "GroupAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { matches: " already exists$" },
    }),
  ).pipe(C.withAlreadyExistsError, C.withConflictError) {}
export class GroupNotFound
  extends /*@__PURE__*/ S.TaggedError<GroupNotFound>()(
    "GroupNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: "Group not found",
    }),
  ).pipe(C.withNotFoundError) {}
export class InvalidPolicyRevisionIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyRevisionIdException>()(
    "InvalidPolicyRevisionIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class LockoutPreventionException
  extends /*@__PURE__*/ S.TaggedError<LockoutPreventionException>()(
    "LockoutPreventionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MalformedPolicyDocumentException
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicyDocumentException>()(
    "MalformedPolicyDocumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PolicyCountLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<PolicyCountLimitExceededException>()(
    "PolicyCountLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class PolicySizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<PolicySizeLimitExceededException>()(
    "PolicySizeLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RuleLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<RuleLimitExceededException>()(
    "RuleLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class SamplingRuleAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<SamplingRuleAlreadyExists>()(
    "SamplingRuleAlreadyExists",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: "Sampling rule already exists",
    }),
  ).pipe(C.withAlreadyExistsError, C.withConflictError) {}
export class SamplingRuleNotFound
  extends /*@__PURE__*/ S.TaggedError<SamplingRuleNotFound>()(
    "SamplingRuleNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: "Sampling rule does not exist",
    }),
  ).pipe(C.withNotFoundError) {}
export class ThrottledException
  extends /*@__PURE__*/ S.TaggedError<ThrottledException>()(
    "ThrottledException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceName: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type TraceId = string;
export type TraceIdList = string[];
export const TraceIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetTracesRequest {
  TraceIds: string[];
  NextToken?: string;
}
export const BatchGetTracesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TraceIds: TraceIdList, NextToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/Traces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BatchGetTracesRequest",
}) as any as S.Schema<BatchGetTracesRequest>;
export type SegmentId = string;
export type SegmentDocument = string;
export interface Segment {
  Id?: string;
  Document?: string;
}
export const Segment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Document: S.optional(S.String) }),
).annotate({ identifier: "Segment" }) as any as S.Schema<Segment>;
export type SegmentList = Segment[];
export const SegmentList = /*@__PURE__*/ S.Array(Segment);
export interface Trace {
  Id?: string;
  Duration?: number;
  LimitExceeded?: boolean;
  Segments?: Segment[];
}
export const Trace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Duration: S.optional(S.Number),
    LimitExceeded: S.optional(S.Boolean),
    Segments: S.optional(SegmentList),
  }),
).annotate({ identifier: "Trace" }) as any as S.Schema<Trace>;
export type TraceList = Trace[];
export const TraceList = /*@__PURE__*/ S.Array(Trace);
export type UnprocessedTraceIdList = string[];
export const UnprocessedTraceIdList = /*@__PURE__*/ S.Array(S.String);
export interface BatchGetTracesResult {
  Traces?: Trace[];
  UnprocessedTraceIds?: string[];
  NextToken?: string;
}
export const BatchGetTracesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Traces: S.optional(TraceList),
    UnprocessedTraceIds: S.optional(UnprocessedTraceIdList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "BatchGetTracesResult",
}) as any as S.Schema<BatchGetTracesResult>;
export type RetrievalToken = string;
export interface CancelTraceRetrievalRequest {
  RetrievalToken: string;
}
export const CancelTraceRetrievalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RetrievalToken: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CancelTraceRetrieval" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelTraceRetrievalRequest",
}) as any as S.Schema<CancelTraceRetrievalRequest>;
export interface CancelTraceRetrievalResult {}
export const CancelTraceRetrievalResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelTraceRetrievalResult",
}) as any as S.Schema<CancelTraceRetrievalResult>;
export type GroupName = string;
export type FilterExpression = string;
export interface InsightsConfiguration {
  InsightsEnabled?: boolean;
  NotificationsEnabled?: boolean;
}
export const InsightsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightsEnabled: S.optional(S.Boolean),
    NotificationsEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "InsightsConfiguration",
}) as any as S.Schema<InsightsConfiguration>;
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
export interface CreateGroupRequest {
  GroupName: string;
  FilterExpression?: string;
  InsightsConfiguration?: InsightsConfiguration;
  Tags?: Tag[];
}
export const CreateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.String,
    FilterExpression: S.optional(S.String),
    InsightsConfiguration: S.optional(InsightsConfiguration),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateGroupRequest",
}) as any as S.Schema<CreateGroupRequest>;
export interface Group {
  GroupName?: string;
  GroupARN?: string;
  FilterExpression?: string;
  InsightsConfiguration?: InsightsConfiguration;
}
export const Group = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    GroupARN: S.optional(S.String),
    FilterExpression: S.optional(S.String),
    InsightsConfiguration: S.optional(InsightsConfiguration),
  }),
).annotate({ identifier: "Group" }) as any as S.Schema<Group>;
export interface CreateGroupResult {
  Group?: Group;
}
export const CreateGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.optional(Group) }),
).annotate({
  identifier: "CreateGroupResult",
}) as any as S.Schema<CreateGroupResult>;
export type RuleName = string;
export type ResourceARN = string;
export type Priority = number;
export type FixedRate = number;
export type ReservoirSize = number;
export type ServiceName = string;
export type ServiceType = string;
export type Host = string;
export type HTTPMethod = string;
export type URLPath = string;
export type Version = number;
export type AttributeKey = string;
export type AttributeValue = string;
export type AttributeMap = { [key: string]: string | undefined };
export const AttributeMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type MaxRate = number;
export type CooldownWindowMinutes = number;
export interface SamplingRateBoost {
  MaxRate: number;
  CooldownWindowMinutes: number;
}
export const SamplingRateBoost = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaxRate: S.Number, CooldownWindowMinutes: S.Number }),
).annotate({
  identifier: "SamplingRateBoost",
}) as any as S.Schema<SamplingRateBoost>;
export interface SamplingRule {
  RuleName?: string;
  RuleARN?: string;
  ResourceARN: string;
  Priority: number;
  FixedRate: number;
  ReservoirSize: number;
  ServiceName: string;
  ServiceType: string;
  Host: string;
  HTTPMethod: string;
  URLPath: string;
  Version: number;
  Attributes?: { [key: string]: string | undefined };
  SamplingRateBoost?: SamplingRateBoost;
}
export const SamplingRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.optional(S.String),
    RuleARN: S.optional(S.String),
    ResourceARN: S.String,
    Priority: S.Number,
    FixedRate: S.Number,
    ReservoirSize: S.Number,
    ServiceName: S.String,
    ServiceType: S.String,
    Host: S.String,
    HTTPMethod: S.String,
    URLPath: S.String,
    Version: S.Number,
    Attributes: S.optional(AttributeMap),
    SamplingRateBoost: S.optional(SamplingRateBoost),
  }),
).annotate({ identifier: "SamplingRule" }) as any as S.Schema<SamplingRule>;
export interface CreateSamplingRuleRequest {
  SamplingRule: SamplingRule;
  Tags?: Tag[];
}
export const CreateSamplingRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SamplingRule: SamplingRule, Tags: S.optional(TagList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateSamplingRule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSamplingRuleRequest",
}) as any as S.Schema<CreateSamplingRuleRequest>;
export interface SamplingRuleRecord {
  SamplingRule?: SamplingRule;
  CreatedAt?: Date;
  ModifiedAt?: Date;
}
export const SamplingRuleRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SamplingRule: S.optional(SamplingRule),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "SamplingRuleRecord",
}) as any as S.Schema<SamplingRuleRecord>;
export interface CreateSamplingRuleResult {
  SamplingRuleRecord?: SamplingRuleRecord;
}
export const CreateSamplingRuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SamplingRuleRecord: S.optional(SamplingRuleRecord) }),
).annotate({
  identifier: "CreateSamplingRuleResult",
}) as any as S.Schema<CreateSamplingRuleResult>;
export type GroupARN = string;
export interface DeleteGroupRequest {
  GroupName?: string;
  GroupARN?: string;
}
export const DeleteGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    GroupARN: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGroupRequest",
}) as any as S.Schema<DeleteGroupRequest>;
export interface DeleteGroupResult {}
export const DeleteGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteGroupResult",
}) as any as S.Schema<DeleteGroupResult>;
export type PolicyName = string;
export type PolicyRevisionId = string;
export interface DeleteResourcePolicyRequest {
  PolicyName: string;
  PolicyRevisionId?: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyName: S.String,
    PolicyRevisionId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteResourcePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export interface DeleteResourcePolicyResult {}
export const DeleteResourcePolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteResourcePolicyResult",
}) as any as S.Schema<DeleteResourcePolicyResult>;
export interface DeleteSamplingRuleRequest {
  RuleName?: string;
  RuleARN?: string;
}
export const DeleteSamplingRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.optional(S.String),
    RuleARN: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteSamplingRule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSamplingRuleRequest",
}) as any as S.Schema<DeleteSamplingRuleRequest>;
export interface DeleteSamplingRuleResult {
  SamplingRuleRecord?: SamplingRuleRecord;
}
export const DeleteSamplingRuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SamplingRuleRecord: S.optional(SamplingRuleRecord) }),
).annotate({
  identifier: "DeleteSamplingRuleResult",
}) as any as S.Schema<DeleteSamplingRuleResult>;
export interface GetEncryptionConfigRequest {}
export const GetEncryptionConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/EncryptionConfig" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEncryptionConfigRequest",
}) as any as S.Schema<GetEncryptionConfigRequest>;
export type EncryptionStatus = "UPDATING" | "ACTIVE" | (string & {});
export const EncryptionStatus = S.String;

export type EncryptionType = "NONE" | "KMS" | (string & {});
export const EncryptionType = S.String;

export interface EncryptionConfig {
  KeyId?: string;
  Status?: EncryptionStatus;
  Type?: EncryptionType;
}
export const EncryptionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyId: S.optional(S.String),
    Status: S.optional(EncryptionStatus),
    Type: S.optional(EncryptionType),
  }),
).annotate({
  identifier: "EncryptionConfig",
}) as any as S.Schema<EncryptionConfig>;
export interface GetEncryptionConfigResult {
  EncryptionConfig?: EncryptionConfig;
}
export const GetEncryptionConfigResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EncryptionConfig: S.optional(EncryptionConfig) }),
).annotate({
  identifier: "GetEncryptionConfigResult",
}) as any as S.Schema<GetEncryptionConfigResult>;
export interface GetGroupRequest {
  GroupName?: string;
  GroupARN?: string;
}
export const GetGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    GroupARN: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGroupRequest",
}) as any as S.Schema<GetGroupRequest>;
export interface GetGroupResult {
  Group?: Group;
}
export const GetGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.optional(Group) }),
).annotate({ identifier: "GetGroupResult" }) as any as S.Schema<GetGroupResult>;
export type GetGroupsNextToken = string;
export interface GetGroupsRequest {
  NextToken?: string;
}
export const GetGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/Groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGroupsRequest",
}) as any as S.Schema<GetGroupsRequest>;
export interface GroupSummary {
  GroupName?: string;
  GroupARN?: string;
  FilterExpression?: string;
  InsightsConfiguration?: InsightsConfiguration;
}
export const GroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    GroupARN: S.optional(S.String),
    FilterExpression: S.optional(S.String),
    InsightsConfiguration: S.optional(InsightsConfiguration),
  }),
).annotate({ identifier: "GroupSummary" }) as any as S.Schema<GroupSummary>;
export type GroupSummaryList = GroupSummary[];
export const GroupSummaryList = /*@__PURE__*/ S.Array(GroupSummary);
export interface GetGroupsResult {
  Groups?: GroupSummary[];
  NextToken?: string;
}
export const GetGroupsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Groups: S.optional(GroupSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetGroupsResult",
}) as any as S.Schema<GetGroupsResult>;
export interface GetIndexingRulesRequest {
  NextToken?: string;
}
export const GetIndexingRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetIndexingRules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIndexingRulesRequest",
}) as any as S.Schema<GetIndexingRulesRequest>;
export interface ProbabilisticRuleValue {
  DesiredSamplingPercentage: number;
  ActualSamplingPercentage?: number;
}
export const ProbabilisticRuleValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DesiredSamplingPercentage: S.Number,
    ActualSamplingPercentage: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProbabilisticRuleValue",
}) as any as S.Schema<ProbabilisticRuleValue>;
export type IndexingRuleValue = { Probabilistic: ProbabilisticRuleValue };
export const IndexingRuleValue = /*@__PURE__*/ S.Union([
  S.Struct({ Probabilistic: ProbabilisticRuleValue }),
]);
export interface IndexingRule {
  Name?: string;
  ModifiedAt?: Date;
  Rule?: IndexingRuleValue;
}
export const IndexingRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    ModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Rule: S.optional(IndexingRuleValue),
  }),
).annotate({ identifier: "IndexingRule" }) as any as S.Schema<IndexingRule>;
export type IndexingRuleList = IndexingRule[];
export const IndexingRuleList = /*@__PURE__*/ S.Array(IndexingRule);
export interface GetIndexingRulesResult {
  IndexingRules?: IndexingRule[];
  NextToken?: string;
}
export const GetIndexingRulesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IndexingRules: S.optional(IndexingRuleList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetIndexingRulesResult",
}) as any as S.Schema<GetIndexingRulesResult>;
export type InsightId = string;
export interface GetInsightRequest {
  InsightId: string;
}
export const GetInsightRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InsightId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/Insight" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInsightRequest",
}) as any as S.Schema<GetInsightRequest>;
export type ServiceNames = string[];
export const ServiceNames = /*@__PURE__*/ S.Array(S.String);
export interface ServiceId {
  Name?: string;
  Names?: string[];
  AccountId?: string;
  Type?: string;
}
export const ServiceId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Names: S.optional(ServiceNames),
    AccountId: S.optional(S.String),
    Type: S.optional(S.String),
  }),
).annotate({ identifier: "ServiceId" }) as any as S.Schema<ServiceId>;
export type InsightCategory = "FAULT" | (string & {});
export const InsightCategory = S.String;

export type InsightCategoryList = InsightCategory[];
export const InsightCategoryList = /*@__PURE__*/ S.Array(InsightCategory);
export type InsightState = "ACTIVE" | "CLOSED" | (string & {});
export const InsightState = S.String;

export type InsightSummaryText = string;
export interface RequestImpactStatistics {
  FaultCount?: number;
  OkCount?: number;
  TotalCount?: number;
}
export const RequestImpactStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FaultCount: S.optional(S.Number),
    OkCount: S.optional(S.Number),
    TotalCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "RequestImpactStatistics",
}) as any as S.Schema<RequestImpactStatistics>;
export interface AnomalousService {
  ServiceId?: ServiceId;
}
export const AnomalousService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ServiceId: S.optional(ServiceId) }),
).annotate({
  identifier: "AnomalousService",
}) as any as S.Schema<AnomalousService>;
export type AnomalousServiceList = AnomalousService[];
export const AnomalousServiceList = /*@__PURE__*/ S.Array(AnomalousService);
export interface Insight {
  InsightId?: string;
  GroupARN?: string;
  GroupName?: string;
  RootCauseServiceId?: ServiceId;
  Categories?: InsightCategory[];
  State?: InsightState;
  StartTime?: Date;
  EndTime?: Date;
  Summary?: string;
  ClientRequestImpactStatistics?: RequestImpactStatistics;
  RootCauseServiceRequestImpactStatistics?: RequestImpactStatistics;
  TopAnomalousServices?: AnomalousService[];
}
export const Insight = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightId: S.optional(S.String),
    GroupARN: S.optional(S.String),
    GroupName: S.optional(S.String),
    RootCauseServiceId: S.optional(ServiceId),
    Categories: S.optional(InsightCategoryList),
    State: S.optional(InsightState),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Summary: S.optional(S.String),
    ClientRequestImpactStatistics: S.optional(RequestImpactStatistics),
    RootCauseServiceRequestImpactStatistics: S.optional(
      RequestImpactStatistics,
    ),
    TopAnomalousServices: S.optional(AnomalousServiceList),
  }),
).annotate({ identifier: "Insight" }) as any as S.Schema<Insight>;
export interface GetInsightResult {
  Insight?: Insight;
}
export const GetInsightResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Insight: S.optional(Insight) }),
).annotate({
  identifier: "GetInsightResult",
}) as any as S.Schema<GetInsightResult>;
export type GetInsightEventsMaxResults = number;
export type Token = string;
export interface GetInsightEventsRequest {
  InsightId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const GetInsightEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/InsightEvents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInsightEventsRequest",
}) as any as S.Schema<GetInsightEventsRequest>;
export type EventSummaryText = string;
export interface InsightEvent {
  Summary?: string;
  EventTime?: Date;
  ClientRequestImpactStatistics?: RequestImpactStatistics;
  RootCauseServiceRequestImpactStatistics?: RequestImpactStatistics;
  TopAnomalousServices?: AnomalousService[];
}
export const InsightEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Summary: S.optional(S.String),
    EventTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ClientRequestImpactStatistics: S.optional(RequestImpactStatistics),
    RootCauseServiceRequestImpactStatistics: S.optional(
      RequestImpactStatistics,
    ),
    TopAnomalousServices: S.optional(AnomalousServiceList),
  }),
).annotate({ identifier: "InsightEvent" }) as any as S.Schema<InsightEvent>;
export type InsightEventList = InsightEvent[];
export const InsightEventList = /*@__PURE__*/ S.Array(InsightEvent);
export interface GetInsightEventsResult {
  InsightEvents?: InsightEvent[];
  NextToken?: string;
}
export const GetInsightEventsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightEvents: S.optional(InsightEventList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetInsightEventsResult",
}) as any as S.Schema<GetInsightEventsResult>;
export interface GetInsightImpactGraphRequest {
  InsightId: string;
  StartTime: Date;
  EndTime: Date;
  NextToken?: string;
}
export const GetInsightImpactGraphRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightId: S.String,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/InsightImpactGraph" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInsightImpactGraphRequest",
}) as any as S.Schema<GetInsightImpactGraphRequest>;
export interface InsightImpactGraphEdge {
  ReferenceId?: number;
}
export const InsightImpactGraphEdge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReferenceId: S.optional(S.Number) }),
).annotate({
  identifier: "InsightImpactGraphEdge",
}) as any as S.Schema<InsightImpactGraphEdge>;
export type InsightImpactGraphEdgeList = InsightImpactGraphEdge[];
export const InsightImpactGraphEdgeList = /*@__PURE__*/ S.Array(
  InsightImpactGraphEdge,
);
export interface InsightImpactGraphService {
  ReferenceId?: number;
  Type?: string;
  Name?: string;
  Names?: string[];
  AccountId?: string;
  Edges?: InsightImpactGraphEdge[];
}
export const InsightImpactGraphService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReferenceId: S.optional(S.Number),
    Type: S.optional(S.String),
    Name: S.optional(S.String),
    Names: S.optional(ServiceNames),
    AccountId: S.optional(S.String),
    Edges: S.optional(InsightImpactGraphEdgeList),
  }),
).annotate({
  identifier: "InsightImpactGraphService",
}) as any as S.Schema<InsightImpactGraphService>;
export type InsightImpactGraphServiceList = InsightImpactGraphService[];
export const InsightImpactGraphServiceList = /*@__PURE__*/ S.Array(
  InsightImpactGraphService,
);
export interface GetInsightImpactGraphResult {
  InsightId?: string;
  StartTime?: Date;
  EndTime?: Date;
  ServiceGraphStartTime?: Date;
  ServiceGraphEndTime?: Date;
  Services?: InsightImpactGraphService[];
  NextToken?: string;
}
export const GetInsightImpactGraphResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightId: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ServiceGraphStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ServiceGraphEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Services: S.optional(InsightImpactGraphServiceList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetInsightImpactGraphResult",
}) as any as S.Schema<GetInsightImpactGraphResult>;
export type InsightStateList = InsightState[];
export const InsightStateList = /*@__PURE__*/ S.Array(InsightState);
export type GetInsightSummariesMaxResults = number;
export interface GetInsightSummariesRequest {
  States?: InsightState[];
  GroupARN?: string;
  GroupName?: string;
  StartTime: Date;
  EndTime: Date;
  MaxResults?: number;
  NextToken?: string;
}
export const GetInsightSummariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    States: S.optional(InsightStateList),
    GroupARN: S.optional(S.String),
    GroupName: S.optional(S.String),
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/InsightSummaries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInsightSummariesRequest",
}) as any as S.Schema<GetInsightSummariesRequest>;
export interface InsightSummary {
  InsightId?: string;
  GroupARN?: string;
  GroupName?: string;
  RootCauseServiceId?: ServiceId;
  Categories?: InsightCategory[];
  State?: InsightState;
  StartTime?: Date;
  EndTime?: Date;
  Summary?: string;
  ClientRequestImpactStatistics?: RequestImpactStatistics;
  RootCauseServiceRequestImpactStatistics?: RequestImpactStatistics;
  TopAnomalousServices?: AnomalousService[];
  LastUpdateTime?: Date;
}
export const InsightSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightId: S.optional(S.String),
    GroupARN: S.optional(S.String),
    GroupName: S.optional(S.String),
    RootCauseServiceId: S.optional(ServiceId),
    Categories: S.optional(InsightCategoryList),
    State: S.optional(InsightState),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Summary: S.optional(S.String),
    ClientRequestImpactStatistics: S.optional(RequestImpactStatistics),
    RootCauseServiceRequestImpactStatistics: S.optional(
      RequestImpactStatistics,
    ),
    TopAnomalousServices: S.optional(AnomalousServiceList),
    LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "InsightSummary" }) as any as S.Schema<InsightSummary>;
export type InsightSummaryList = InsightSummary[];
export const InsightSummaryList = /*@__PURE__*/ S.Array(InsightSummary);
export interface GetInsightSummariesResult {
  InsightSummaries?: InsightSummary[];
  NextToken?: string;
}
export const GetInsightSummariesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsightSummaries: S.optional(InsightSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetInsightSummariesResult",
}) as any as S.Schema<GetInsightSummariesResult>;
export interface GetRetrievedTracesGraphRequest {
  RetrievalToken: string;
  NextToken?: string;
}
export const GetRetrievedTracesGraphRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RetrievalToken: S.String, NextToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetRetrievedTracesGraph" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRetrievedTracesGraphRequest",
}) as any as S.Schema<GetRetrievedTracesGraphRequest>;
export type RetrievalStatus =
  | "SCHEDULED"
  | "RUNNING"
  | "COMPLETE"
  | "FAILED"
  | "CANCELLED"
  | "TIMEOUT"
  | (string & {});
export const RetrievalStatus = S.String;

export interface ErrorStatistics {
  ThrottleCount?: number;
  OtherCount?: number;
  TotalCount?: number;
}
export const ErrorStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ThrottleCount: S.optional(S.Number),
    OtherCount: S.optional(S.Number),
    TotalCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "ErrorStatistics",
}) as any as S.Schema<ErrorStatistics>;
export interface FaultStatistics {
  OtherCount?: number;
  TotalCount?: number;
}
export const FaultStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OtherCount: S.optional(S.Number),
    TotalCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "FaultStatistics",
}) as any as S.Schema<FaultStatistics>;
export interface EdgeStatistics {
  OkCount?: number;
  ErrorStatistics?: ErrorStatistics;
  FaultStatistics?: FaultStatistics;
  TotalCount?: number;
  TotalResponseTime?: number;
}
export const EdgeStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OkCount: S.optional(S.Number),
    ErrorStatistics: S.optional(ErrorStatistics),
    FaultStatistics: S.optional(FaultStatistics),
    TotalCount: S.optional(S.Number),
    TotalResponseTime: S.optional(S.Number),
  }),
).annotate({ identifier: "EdgeStatistics" }) as any as S.Schema<EdgeStatistics>;
export interface HistogramEntry {
  Value?: number;
  Count?: number;
}
export const HistogramEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Value: S.optional(S.Number), Count: S.optional(S.Number) }),
).annotate({ identifier: "HistogramEntry" }) as any as S.Schema<HistogramEntry>;
export type Histogram = HistogramEntry[];
export const Histogram = /*@__PURE__*/ S.Array(HistogramEntry);
export type AliasNames = string[];
export const AliasNames = /*@__PURE__*/ S.Array(S.String);
export interface Alias {
  Name?: string;
  Names?: string[];
  Type?: string;
}
export const Alias = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Names: S.optional(AliasNames),
    Type: S.optional(S.String),
  }),
).annotate({ identifier: "Alias" }) as any as S.Schema<Alias>;
export type AliasList = Alias[];
export const AliasList = /*@__PURE__*/ S.Array(Alias);
export interface Edge {
  ReferenceId?: number;
  StartTime?: Date;
  EndTime?: Date;
  SummaryStatistics?: EdgeStatistics;
  ResponseTimeHistogram?: HistogramEntry[];
  Aliases?: Alias[];
  EdgeType?: string;
  ReceivedEventAgeHistogram?: HistogramEntry[];
}
export const Edge = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReferenceId: S.optional(S.Number),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SummaryStatistics: S.optional(EdgeStatistics),
    ResponseTimeHistogram: S.optional(Histogram),
    Aliases: S.optional(AliasList),
    EdgeType: S.optional(S.String),
    ReceivedEventAgeHistogram: S.optional(Histogram),
  }),
).annotate({ identifier: "Edge" }) as any as S.Schema<Edge>;
export type EdgeList = Edge[];
export const EdgeList = /*@__PURE__*/ S.Array(Edge);
export interface ServiceStatistics {
  OkCount?: number;
  ErrorStatistics?: ErrorStatistics;
  FaultStatistics?: FaultStatistics;
  TotalCount?: number;
  TotalResponseTime?: number;
}
export const ServiceStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OkCount: S.optional(S.Number),
    ErrorStatistics: S.optional(ErrorStatistics),
    FaultStatistics: S.optional(FaultStatistics),
    TotalCount: S.optional(S.Number),
    TotalResponseTime: S.optional(S.Number),
  }),
).annotate({
  identifier: "ServiceStatistics",
}) as any as S.Schema<ServiceStatistics>;
export interface Service {
  ReferenceId?: number;
  Name?: string;
  Names?: string[];
  Root?: boolean;
  AccountId?: string;
  Type?: string;
  State?: string;
  StartTime?: Date;
  EndTime?: Date;
  Edges?: Edge[];
  SummaryStatistics?: ServiceStatistics;
  DurationHistogram?: HistogramEntry[];
  ResponseTimeHistogram?: HistogramEntry[];
}
export const Service = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReferenceId: S.optional(S.Number),
    Name: S.optional(S.String),
    Names: S.optional(ServiceNames),
    Root: S.optional(S.Boolean),
    AccountId: S.optional(S.String),
    Type: S.optional(S.String),
    State: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Edges: S.optional(EdgeList),
    SummaryStatistics: S.optional(ServiceStatistics),
    DurationHistogram: S.optional(Histogram),
    ResponseTimeHistogram: S.optional(Histogram),
  }),
).annotate({ identifier: "Service" }) as any as S.Schema<Service>;
export interface GraphLink {
  ReferenceType?: string;
  SourceTraceId?: string;
  DestinationTraceIds?: string[];
}
export const GraphLink = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReferenceType: S.optional(S.String),
    SourceTraceId: S.optional(S.String),
    DestinationTraceIds: S.optional(TraceIdList),
  }),
).annotate({ identifier: "GraphLink" }) as any as S.Schema<GraphLink>;
export type LinksList = GraphLink[];
export const LinksList = /*@__PURE__*/ S.Array(GraphLink);
export interface RetrievedService {
  Service?: Service;
  Links?: GraphLink[];
}
export const RetrievedService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Service: S.optional(Service), Links: S.optional(LinksList) }),
).annotate({
  identifier: "RetrievedService",
}) as any as S.Schema<RetrievedService>;
export type RetrievedServicesList = RetrievedService[];
export const RetrievedServicesList = /*@__PURE__*/ S.Array(RetrievedService);
export interface GetRetrievedTracesGraphResult {
  RetrievalStatus?: RetrievalStatus;
  Services?: RetrievedService[];
  NextToken?: string;
}
export const GetRetrievedTracesGraphResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RetrievalStatus: S.optional(RetrievalStatus),
    Services: S.optional(RetrievedServicesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetRetrievedTracesGraphResult",
}) as any as S.Schema<GetRetrievedTracesGraphResult>;
export interface GetSamplingRulesRequest {
  NextToken?: string;
}
export const GetSamplingRulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetSamplingRules" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSamplingRulesRequest",
}) as any as S.Schema<GetSamplingRulesRequest>;
export type SamplingRuleRecordList = SamplingRuleRecord[];
export const SamplingRuleRecordList = /*@__PURE__*/ S.Array(SamplingRuleRecord);
export interface GetSamplingRulesResult {
  SamplingRuleRecords?: SamplingRuleRecord[];
  NextToken?: string;
}
export const GetSamplingRulesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SamplingRuleRecords: S.optional(SamplingRuleRecordList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSamplingRulesResult",
}) as any as S.Schema<GetSamplingRulesResult>;
export interface GetSamplingStatisticSummariesRequest {
  NextToken?: string;
}
export const GetSamplingStatisticSummariesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ NextToken: S.optional(S.String) }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/SamplingStatisticSummaries" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetSamplingStatisticSummariesRequest",
}) as any as S.Schema<GetSamplingStatisticSummariesRequest>;
export interface SamplingStatisticSummary {
  RuleName?: string;
  Timestamp?: Date;
  RequestCount?: number;
  BorrowCount?: number;
  SampledCount?: number;
}
export const SamplingStatisticSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.optional(S.String),
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RequestCount: S.optional(S.Number),
    BorrowCount: S.optional(S.Number),
    SampledCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "SamplingStatisticSummary",
}) as any as S.Schema<SamplingStatisticSummary>;
export type SamplingStatisticSummaryList = SamplingStatisticSummary[];
export const SamplingStatisticSummaryList = /*@__PURE__*/ S.Array(
  SamplingStatisticSummary,
);
export interface GetSamplingStatisticSummariesResult {
  SamplingStatisticSummaries?: SamplingStatisticSummary[];
  NextToken?: string;
}
export const GetSamplingStatisticSummariesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SamplingStatisticSummaries: S.optional(SamplingStatisticSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSamplingStatisticSummariesResult",
}) as any as S.Schema<GetSamplingStatisticSummariesResult>;
export type ClientID = string;
export type RequestCount = number;
export type SampledCount = number;
export type BorrowCount = number;
export interface SamplingStatisticsDocument {
  RuleName: string;
  ClientID: string;
  Timestamp: Date;
  RequestCount: number;
  SampledCount: number;
  BorrowCount?: number;
}
export const SamplingStatisticsDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.String,
    ClientID: S.String,
    Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    RequestCount: S.Number,
    SampledCount: S.Number,
    BorrowCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "SamplingStatisticsDocument",
}) as any as S.Schema<SamplingStatisticsDocument>;
export type SamplingStatisticsDocumentList = SamplingStatisticsDocument[];
export const SamplingStatisticsDocumentList = /*@__PURE__*/ S.Array(
  SamplingStatisticsDocument,
);
export type AnomalyCount = number;
export type TotalCount = number;
export type SampledAnomalyCount = number;
export interface SamplingBoostStatisticsDocument {
  RuleName: string;
  ServiceName: string;
  Timestamp: Date;
  AnomalyCount: number;
  TotalCount: number;
  SampledAnomalyCount: number;
}
export const SamplingBoostStatisticsDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.String,
    ServiceName: S.String,
    Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    AnomalyCount: S.Number,
    TotalCount: S.Number,
    SampledAnomalyCount: S.Number,
  }),
).annotate({
  identifier: "SamplingBoostStatisticsDocument",
}) as any as S.Schema<SamplingBoostStatisticsDocument>;
export type SamplingBoostStatisticsDocumentList =
  SamplingBoostStatisticsDocument[];
export const SamplingBoostStatisticsDocumentList = /*@__PURE__*/ S.Array(
  SamplingBoostStatisticsDocument,
);
export interface GetSamplingTargetsRequest {
  SamplingStatisticsDocuments: SamplingStatisticsDocument[];
  SamplingBoostStatisticsDocuments?: SamplingBoostStatisticsDocument[];
}
export const GetSamplingTargetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SamplingStatisticsDocuments: SamplingStatisticsDocumentList,
    SamplingBoostStatisticsDocuments: S.optional(
      SamplingBoostStatisticsDocumentList,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/SamplingTargets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSamplingTargetsRequest",
}) as any as S.Schema<GetSamplingTargetsRequest>;
export interface SamplingBoost {
  BoostRate: number;
  BoostRateTTL: Date;
}
export const SamplingBoost = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BoostRate: S.Number,
    BoostRateTTL: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "SamplingBoost" }) as any as S.Schema<SamplingBoost>;
export interface SamplingTargetDocument {
  RuleName?: string;
  FixedRate?: number;
  ReservoirQuota?: number;
  ReservoirQuotaTTL?: Date;
  Interval?: number;
  SamplingBoost?: SamplingBoost;
}
export const SamplingTargetDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.optional(S.String),
    FixedRate: S.optional(S.Number),
    ReservoirQuota: S.optional(S.Number),
    ReservoirQuotaTTL: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Interval: S.optional(S.Number),
    SamplingBoost: S.optional(SamplingBoost),
  }),
).annotate({
  identifier: "SamplingTargetDocument",
}) as any as S.Schema<SamplingTargetDocument>;
export type SamplingTargetDocumentList = SamplingTargetDocument[];
export const SamplingTargetDocumentList = /*@__PURE__*/ S.Array(
  SamplingTargetDocument,
);
export interface UnprocessedStatistics {
  RuleName?: string;
  ErrorCode?: string;
  Message?: string;
}
export const UnprocessedStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "UnprocessedStatistics",
}) as any as S.Schema<UnprocessedStatistics>;
export type UnprocessedStatisticsList = UnprocessedStatistics[];
export const UnprocessedStatisticsList = /*@__PURE__*/ S.Array(
  UnprocessedStatistics,
);
export interface GetSamplingTargetsResult {
  SamplingTargetDocuments?: SamplingTargetDocument[];
  LastRuleModification?: Date;
  UnprocessedStatistics?: UnprocessedStatistics[];
  UnprocessedBoostStatistics?: UnprocessedStatistics[];
}
export const GetSamplingTargetsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SamplingTargetDocuments: S.optional(SamplingTargetDocumentList),
    LastRuleModification: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UnprocessedStatistics: S.optional(UnprocessedStatisticsList),
    UnprocessedBoostStatistics: S.optional(UnprocessedStatisticsList),
  }),
).annotate({
  identifier: "GetSamplingTargetsResult",
}) as any as S.Schema<GetSamplingTargetsResult>;
export interface GetServiceGraphRequest {
  StartTime: Date;
  EndTime: Date;
  GroupName?: string;
  GroupARN?: string;
  NextToken?: string;
}
export const GetServiceGraphRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    GroupName: S.optional(S.String),
    GroupARN: S.optional(S.String),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ServiceGraph" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetServiceGraphRequest",
}) as any as S.Schema<GetServiceGraphRequest>;
export type ServiceList = Service[];
export const ServiceList = /*@__PURE__*/ S.Array(Service);
export interface GetServiceGraphResult {
  StartTime?: Date;
  EndTime?: Date;
  Services?: Service[];
  ContainsOldGroupVersions?: boolean;
  NextToken?: string;
}
export const GetServiceGraphResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Services: S.optional(ServiceList),
    ContainsOldGroupVersions: S.optional(S.Boolean),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetServiceGraphResult",
}) as any as S.Schema<GetServiceGraphResult>;
export type EntitySelectorExpression = string;
export interface GetTimeSeriesServiceStatisticsRequest {
  StartTime: Date;
  EndTime: Date;
  GroupName?: string;
  GroupARN?: string;
  EntitySelectorExpression?: string;
  Period?: number;
  ForecastStatistics?: boolean;
  NextToken?: string;
}
export const GetTimeSeriesServiceStatisticsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      GroupName: S.optional(S.String),
      GroupARN: S.optional(S.String),
      EntitySelectorExpression: S.optional(S.String),
      Period: S.optional(S.Number),
      ForecastStatistics: S.optional(S.Boolean),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/TimeSeriesServiceStatistics" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetTimeSeriesServiceStatisticsRequest",
}) as any as S.Schema<GetTimeSeriesServiceStatisticsRequest>;
export interface ForecastStatistics {
  FaultCountHigh?: number;
  FaultCountLow?: number;
}
export const ForecastStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FaultCountHigh: S.optional(S.Number),
    FaultCountLow: S.optional(S.Number),
  }),
).annotate({
  identifier: "ForecastStatistics",
}) as any as S.Schema<ForecastStatistics>;
export interface TimeSeriesServiceStatistics {
  Timestamp?: Date;
  EdgeSummaryStatistics?: EdgeStatistics;
  ServiceSummaryStatistics?: ServiceStatistics;
  ServiceForecastStatistics?: ForecastStatistics;
  ResponseTimeHistogram?: HistogramEntry[];
}
export const TimeSeriesServiceStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EdgeSummaryStatistics: S.optional(EdgeStatistics),
    ServiceSummaryStatistics: S.optional(ServiceStatistics),
    ServiceForecastStatistics: S.optional(ForecastStatistics),
    ResponseTimeHistogram: S.optional(Histogram),
  }),
).annotate({
  identifier: "TimeSeriesServiceStatistics",
}) as any as S.Schema<TimeSeriesServiceStatistics>;
export type TimeSeriesServiceStatisticsList = TimeSeriesServiceStatistics[];
export const TimeSeriesServiceStatisticsList = /*@__PURE__*/ S.Array(
  TimeSeriesServiceStatistics,
);
export interface GetTimeSeriesServiceStatisticsResult {
  TimeSeriesServiceStatistics?: TimeSeriesServiceStatistics[];
  ContainsOldGroupVersions?: boolean;
  NextToken?: string;
}
export const GetTimeSeriesServiceStatisticsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TimeSeriesServiceStatistics: S.optional(TimeSeriesServiceStatisticsList),
      ContainsOldGroupVersions: S.optional(S.Boolean),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "GetTimeSeriesServiceStatisticsResult",
}) as any as S.Schema<GetTimeSeriesServiceStatisticsResult>;
export interface GetTraceGraphRequest {
  TraceIds: string[];
  NextToken?: string;
}
export const GetTraceGraphRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TraceIds: TraceIdList, NextToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TraceGraph" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTraceGraphRequest",
}) as any as S.Schema<GetTraceGraphRequest>;
export interface GetTraceGraphResult {
  Services?: Service[];
  NextToken?: string;
}
export const GetTraceGraphResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Services: S.optional(ServiceList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTraceGraphResult",
}) as any as S.Schema<GetTraceGraphResult>;
export interface GetTraceSegmentDestinationRequest {}
export const GetTraceSegmentDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetTraceSegmentDestination" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTraceSegmentDestinationRequest",
}) as any as S.Schema<GetTraceSegmentDestinationRequest>;
export type TraceSegmentDestination = "XRay" | "CloudWatchLogs" | (string & {});
export const TraceSegmentDestination = S.String;

export type TraceSegmentDestinationStatus =
  | "PENDING"
  | "ACTIVE"
  | (string & {});
export const TraceSegmentDestinationStatus = S.String;

export interface GetTraceSegmentDestinationResult {
  Destination?: TraceSegmentDestination;
  Status?: TraceSegmentDestinationStatus;
}
export const GetTraceSegmentDestinationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: S.optional(TraceSegmentDestination),
    Status: S.optional(TraceSegmentDestinationStatus),
  }),
).annotate({
  identifier: "GetTraceSegmentDestinationResult",
}) as any as S.Schema<GetTraceSegmentDestinationResult>;
export type TimeRangeType = "TraceId" | "Event" | "Service" | (string & {});
export const TimeRangeType = S.String;

export type SamplingStrategyName = "PartialScan" | "FixedRate" | (string & {});
export const SamplingStrategyName = S.String;

export interface SamplingStrategy {
  Name?: SamplingStrategyName;
  Value?: number;
}
export const SamplingStrategy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(SamplingStrategyName),
    Value: S.optional(S.Number),
  }),
).annotate({
  identifier: "SamplingStrategy",
}) as any as S.Schema<SamplingStrategy>;
export interface GetTraceSummariesRequest {
  StartTime: Date;
  EndTime: Date;
  TimeRangeType?: TimeRangeType;
  Sampling?: boolean;
  SamplingStrategy?: SamplingStrategy;
  FilterExpression?: string;
  NextToken?: string;
}
export const GetTraceSummariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    TimeRangeType: S.optional(TimeRangeType),
    Sampling: S.optional(S.Boolean),
    SamplingStrategy: S.optional(SamplingStrategy),
    FilterExpression: S.optional(S.String),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TraceSummaries" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTraceSummariesRequest",
}) as any as S.Schema<GetTraceSummariesRequest>;
export interface Http {
  HttpURL?: string;
  HttpStatus?: number;
  HttpMethod?: string;
  UserAgent?: string;
  ClientIp?: string;
}
export const Http = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HttpURL: S.optional(S.String),
    HttpStatus: S.optional(S.Number),
    HttpMethod: S.optional(S.String),
    UserAgent: S.optional(S.String),
    ClientIp: S.optional(S.String),
  }),
).annotate({ identifier: "Http" }) as any as S.Schema<Http>;
export type AnnotationKey = string;
export type AnnotationValue =
  | { NumberValue: number; BooleanValue?: never; StringValue?: never }
  | { NumberValue?: never; BooleanValue: boolean; StringValue?: never }
  | { NumberValue?: never; BooleanValue?: never; StringValue: string };
export const AnnotationValue = /*@__PURE__*/ S.Union([
  S.Struct({ NumberValue: S.Number }),
  S.Struct({ BooleanValue: S.Boolean }),
  S.Struct({ StringValue: S.String }),
]);
export type ServiceIds = ServiceId[];
export const ServiceIds = /*@__PURE__*/ S.Array(ServiceId);
export interface ValueWithServiceIds {
  AnnotationValue?: AnnotationValue;
  ServiceIds?: ServiceId[];
}
export const ValueWithServiceIds = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AnnotationValue: S.optional(AnnotationValue),
    ServiceIds: S.optional(ServiceIds),
  }),
).annotate({
  identifier: "ValueWithServiceIds",
}) as any as S.Schema<ValueWithServiceIds>;
export type ValuesWithServiceIds = ValueWithServiceIds[];
export const ValuesWithServiceIds = /*@__PURE__*/ S.Array(ValueWithServiceIds);
export type Annotations = { [key: string]: ValueWithServiceIds[] | undefined };
export const Annotations = /*@__PURE__*/ S.Record(
  S.String,
  ValuesWithServiceIds.pipe(S.optional),
);
export interface TraceUser {
  UserName?: string;
  ServiceIds?: ServiceId[];
}
export const TraceUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserName: S.optional(S.String),
    ServiceIds: S.optional(ServiceIds),
  }),
).annotate({ identifier: "TraceUser" }) as any as S.Schema<TraceUser>;
export type TraceUsers = TraceUser[];
export const TraceUsers = /*@__PURE__*/ S.Array(TraceUser);
export interface ResourceARNDetail {
  ARN?: string;
}
export const ResourceARNDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ARN: S.optional(S.String) }),
).annotate({
  identifier: "ResourceARNDetail",
}) as any as S.Schema<ResourceARNDetail>;
export type TraceResourceARNs = ResourceARNDetail[];
export const TraceResourceARNs = /*@__PURE__*/ S.Array(ResourceARNDetail);
export interface InstanceIdDetail {
  Id?: string;
}
export const InstanceIdDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }),
).annotate({
  identifier: "InstanceIdDetail",
}) as any as S.Schema<InstanceIdDetail>;
export type TraceInstanceIds = InstanceIdDetail[];
export const TraceInstanceIds = /*@__PURE__*/ S.Array(InstanceIdDetail);
export interface AvailabilityZoneDetail {
  Name?: string;
}
export const AvailabilityZoneDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String) }),
).annotate({
  identifier: "AvailabilityZoneDetail",
}) as any as S.Schema<AvailabilityZoneDetail>;
export type TraceAvailabilityZones = AvailabilityZoneDetail[];
export const TraceAvailabilityZones = /*@__PURE__*/ S.Array(
  AvailabilityZoneDetail,
);
export interface RootCauseException {
  Name?: string;
  Message?: string;
}
export const RootCauseException = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Message: S.optional(S.String) }),
).annotate({
  identifier: "RootCauseException",
}) as any as S.Schema<RootCauseException>;
export type RootCauseExceptions = RootCauseException[];
export const RootCauseExceptions = /*@__PURE__*/ S.Array(RootCauseException);
export interface FaultRootCauseEntity {
  Name?: string;
  Exceptions?: RootCauseException[];
  Remote?: boolean;
}
export const FaultRootCauseEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Exceptions: S.optional(RootCauseExceptions),
    Remote: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "FaultRootCauseEntity",
}) as any as S.Schema<FaultRootCauseEntity>;
export type FaultRootCauseEntityPath = FaultRootCauseEntity[];
export const FaultRootCauseEntityPath =
  /*@__PURE__*/ S.Array(FaultRootCauseEntity);
export interface FaultRootCauseService {
  Name?: string;
  Names?: string[];
  Type?: string;
  AccountId?: string;
  EntityPath?: FaultRootCauseEntity[];
  Inferred?: boolean;
}
export const FaultRootCauseService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Names: S.optional(ServiceNames),
    Type: S.optional(S.String),
    AccountId: S.optional(S.String),
    EntityPath: S.optional(FaultRootCauseEntityPath),
    Inferred: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "FaultRootCauseService",
}) as any as S.Schema<FaultRootCauseService>;
export type FaultRootCauseServices = FaultRootCauseService[];
export const FaultRootCauseServices = /*@__PURE__*/ S.Array(
  FaultRootCauseService,
);
export interface FaultRootCause {
  Services?: FaultRootCauseService[];
  ClientImpacting?: boolean;
}
export const FaultRootCause = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Services: S.optional(FaultRootCauseServices),
    ClientImpacting: S.optional(S.Boolean),
  }),
).annotate({ identifier: "FaultRootCause" }) as any as S.Schema<FaultRootCause>;
export type FaultRootCauses = FaultRootCause[];
export const FaultRootCauses = /*@__PURE__*/ S.Array(FaultRootCause);
export interface ErrorRootCauseEntity {
  Name?: string;
  Exceptions?: RootCauseException[];
  Remote?: boolean;
}
export const ErrorRootCauseEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Exceptions: S.optional(RootCauseExceptions),
    Remote: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ErrorRootCauseEntity",
}) as any as S.Schema<ErrorRootCauseEntity>;
export type ErrorRootCauseEntityPath = ErrorRootCauseEntity[];
export const ErrorRootCauseEntityPath =
  /*@__PURE__*/ S.Array(ErrorRootCauseEntity);
export interface ErrorRootCauseService {
  Name?: string;
  Names?: string[];
  Type?: string;
  AccountId?: string;
  EntityPath?: ErrorRootCauseEntity[];
  Inferred?: boolean;
}
export const ErrorRootCauseService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Names: S.optional(ServiceNames),
    Type: S.optional(S.String),
    AccountId: S.optional(S.String),
    EntityPath: S.optional(ErrorRootCauseEntityPath),
    Inferred: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ErrorRootCauseService",
}) as any as S.Schema<ErrorRootCauseService>;
export type ErrorRootCauseServices = ErrorRootCauseService[];
export const ErrorRootCauseServices = /*@__PURE__*/ S.Array(
  ErrorRootCauseService,
);
export interface ErrorRootCause {
  Services?: ErrorRootCauseService[];
  ClientImpacting?: boolean;
}
export const ErrorRootCause = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Services: S.optional(ErrorRootCauseServices),
    ClientImpacting: S.optional(S.Boolean),
  }),
).annotate({ identifier: "ErrorRootCause" }) as any as S.Schema<ErrorRootCause>;
export type ErrorRootCauses = ErrorRootCause[];
export const ErrorRootCauses = /*@__PURE__*/ S.Array(ErrorRootCause);
export interface ResponseTimeRootCauseEntity {
  Name?: string;
  Coverage?: number;
  Remote?: boolean;
}
export const ResponseTimeRootCauseEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Coverage: S.optional(S.Number),
    Remote: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResponseTimeRootCauseEntity",
}) as any as S.Schema<ResponseTimeRootCauseEntity>;
export type ResponseTimeRootCauseEntityPath = ResponseTimeRootCauseEntity[];
export const ResponseTimeRootCauseEntityPath = /*@__PURE__*/ S.Array(
  ResponseTimeRootCauseEntity,
);
export interface ResponseTimeRootCauseService {
  Name?: string;
  Names?: string[];
  Type?: string;
  AccountId?: string;
  EntityPath?: ResponseTimeRootCauseEntity[];
  Inferred?: boolean;
}
export const ResponseTimeRootCauseService = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Names: S.optional(ServiceNames),
    Type: S.optional(S.String),
    AccountId: S.optional(S.String),
    EntityPath: S.optional(ResponseTimeRootCauseEntityPath),
    Inferred: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResponseTimeRootCauseService",
}) as any as S.Schema<ResponseTimeRootCauseService>;
export type ResponseTimeRootCauseServices = ResponseTimeRootCauseService[];
export const ResponseTimeRootCauseServices = /*@__PURE__*/ S.Array(
  ResponseTimeRootCauseService,
);
export interface ResponseTimeRootCause {
  Services?: ResponseTimeRootCauseService[];
  ClientImpacting?: boolean;
}
export const ResponseTimeRootCause = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Services: S.optional(ResponseTimeRootCauseServices),
    ClientImpacting: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResponseTimeRootCause",
}) as any as S.Schema<ResponseTimeRootCause>;
export type ResponseTimeRootCauses = ResponseTimeRootCause[];
export const ResponseTimeRootCauses = /*@__PURE__*/ S.Array(
  ResponseTimeRootCause,
);
export interface TraceSummary {
  Id?: string;
  StartTime?: Date;
  Duration?: number;
  ResponseTime?: number;
  HasFault?: boolean;
  HasError?: boolean;
  HasThrottle?: boolean;
  IsPartial?: boolean;
  Http?: Http;
  Annotations?: { [key: string]: ValueWithServiceIds[] | undefined };
  Users?: TraceUser[];
  ServiceIds?: ServiceId[];
  ResourceARNs?: ResourceARNDetail[];
  InstanceIds?: InstanceIdDetail[];
  AvailabilityZones?: AvailabilityZoneDetail[];
  EntryPoint?: ServiceId;
  FaultRootCauses?: FaultRootCause[];
  ErrorRootCauses?: ErrorRootCause[];
  ResponseTimeRootCauses?: ResponseTimeRootCause[];
  Revision?: number;
  MatchedEventTime?: Date;
}
export const TraceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Duration: S.optional(S.Number),
    ResponseTime: S.optional(S.Number),
    HasFault: S.optional(S.Boolean),
    HasError: S.optional(S.Boolean),
    HasThrottle: S.optional(S.Boolean),
    IsPartial: S.optional(S.Boolean),
    Http: S.optional(Http),
    Annotations: S.optional(Annotations),
    Users: S.optional(TraceUsers),
    ServiceIds: S.optional(ServiceIds),
    ResourceARNs: S.optional(TraceResourceARNs),
    InstanceIds: S.optional(TraceInstanceIds),
    AvailabilityZones: S.optional(TraceAvailabilityZones),
    EntryPoint: S.optional(ServiceId),
    FaultRootCauses: S.optional(FaultRootCauses),
    ErrorRootCauses: S.optional(ErrorRootCauses),
    ResponseTimeRootCauses: S.optional(ResponseTimeRootCauses),
    Revision: S.optional(S.Number),
    MatchedEventTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "TraceSummary" }) as any as S.Schema<TraceSummary>;
export type TraceSummaryList = TraceSummary[];
export const TraceSummaryList = /*@__PURE__*/ S.Array(TraceSummary);
export interface GetTraceSummariesResult {
  TraceSummaries?: TraceSummary[];
  ApproximateTime?: Date;
  TracesProcessedCount?: number;
  NextToken?: string;
}
export const GetTraceSummariesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TraceSummaries: S.optional(TraceSummaryList),
    ApproximateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    TracesProcessedCount: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetTraceSummariesResult",
}) as any as S.Schema<GetTraceSummariesResult>;
export type ResourcePolicyNextToken = string;
export interface ListResourcePoliciesRequest {
  NextToken?: string;
}
export const ListResourcePoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListResourcePolicies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListResourcePoliciesRequest",
}) as any as S.Schema<ListResourcePoliciesRequest>;
export type PolicyDocument = string;
export interface ResourcePolicy {
  PolicyName?: string;
  PolicyDocument?: string;
  PolicyRevisionId?: string;
  LastUpdatedTime?: Date;
}
export const ResourcePolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyName: S.optional(S.String),
    PolicyDocument: S.optional(S.String),
    PolicyRevisionId: S.optional(S.String),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "ResourcePolicy" }) as any as S.Schema<ResourcePolicy>;
export type ResourcePolicyList = ResourcePolicy[];
export const ResourcePolicyList = /*@__PURE__*/ S.Array(ResourcePolicy);
export interface ListResourcePoliciesResult {
  ResourcePolicies?: ResourcePolicy[];
  NextToken?: string;
}
export const ListResourcePoliciesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourcePolicies: S.optional(ResourcePolicyList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListResourcePoliciesResult",
}) as any as S.Schema<ListResourcePoliciesResult>;
export type TraceFormatType = "XRAY" | "OTEL" | (string & {});
export const TraceFormatType = S.String;

export interface ListRetrievedTracesRequest {
  RetrievalToken: string;
  TraceFormat?: TraceFormatType;
  NextToken?: string;
}
export const ListRetrievedTracesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RetrievalToken: S.String,
    TraceFormat: S.optional(TraceFormatType),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListRetrievedTraces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRetrievedTracesRequest",
}) as any as S.Schema<ListRetrievedTracesRequest>;
export type SpanId = string;
export type SpanDocument = string;
export interface Span {
  Id?: string;
  Document?: string;
}
export const Span = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Document: S.optional(S.String) }),
).annotate({ identifier: "Span" }) as any as S.Schema<Span>;
export type SpanList = Span[];
export const SpanList = /*@__PURE__*/ S.Array(Span);
export interface RetrievedTrace {
  Id?: string;
  Duration?: number;
  Spans?: Span[];
}
export const RetrievedTrace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Duration: S.optional(S.Number),
    Spans: S.optional(SpanList),
  }),
).annotate({ identifier: "RetrievedTrace" }) as any as S.Schema<RetrievedTrace>;
export type TraceSpanList = RetrievedTrace[];
export const TraceSpanList = /*@__PURE__*/ S.Array(RetrievedTrace);
export interface ListRetrievedTracesResult {
  RetrievalStatus?: RetrievalStatus;
  TraceFormat?: TraceFormatType;
  Traces?: RetrievedTrace[];
  NextToken?: string;
}
export const ListRetrievedTracesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RetrievalStatus: S.optional(RetrievalStatus),
    TraceFormat: S.optional(TraceFormatType),
    Traces: S.optional(TraceSpanList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRetrievedTracesResult",
}) as any as S.Schema<ListRetrievedTracesResult>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
  NextToken?: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, NextToken: S.optional(S.String) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListTagsForResource" }),
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
  NextToken?: string;
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type EncryptionKeyId = string;
export interface PutEncryptionConfigRequest {
  KeyId?: string;
  Type: EncryptionType;
}
export const PutEncryptionConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KeyId: S.optional(S.String), Type: EncryptionType }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutEncryptionConfig" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutEncryptionConfigRequest",
}) as any as S.Schema<PutEncryptionConfigRequest>;
export interface PutEncryptionConfigResult {
  EncryptionConfig?: EncryptionConfig;
}
export const PutEncryptionConfigResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EncryptionConfig: S.optional(EncryptionConfig) }),
).annotate({
  identifier: "PutEncryptionConfigResult",
}) as any as S.Schema<PutEncryptionConfigResult>;
export interface PutResourcePolicyRequest {
  PolicyName: string;
  PolicyDocument: string;
  PolicyRevisionId?: string;
  BypassPolicyLockoutCheck?: boolean;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PolicyName: S.String,
    PolicyDocument: S.String,
    PolicyRevisionId: S.optional(S.String),
    BypassPolicyLockoutCheck: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/PutResourcePolicy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResult {
  ResourcePolicy?: ResourcePolicy;
}
export const PutResourcePolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourcePolicy: S.optional(ResourcePolicy) }),
).annotate({
  identifier: "PutResourcePolicyResult",
}) as any as S.Schema<PutResourcePolicyResult>;
export interface BackendConnectionErrors {
  TimeoutCount?: number;
  ConnectionRefusedCount?: number;
  HTTPCode4XXCount?: number;
  HTTPCode5XXCount?: number;
  UnknownHostCount?: number;
  OtherCount?: number;
}
export const BackendConnectionErrors = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimeoutCount: S.optional(S.Number),
    ConnectionRefusedCount: S.optional(S.Number),
    HTTPCode4XXCount: S.optional(S.Number),
    HTTPCode5XXCount: S.optional(S.Number),
    UnknownHostCount: S.optional(S.Number),
    OtherCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "BackendConnectionErrors",
}) as any as S.Schema<BackendConnectionErrors>;
export interface TelemetryRecord {
  Timestamp: Date;
  SegmentsReceivedCount?: number;
  SegmentsSentCount?: number;
  SegmentsSpilloverCount?: number;
  SegmentsRejectedCount?: number;
  BackendConnectionErrors?: BackendConnectionErrors;
}
export const TelemetryRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    SegmentsReceivedCount: S.optional(S.Number),
    SegmentsSentCount: S.optional(S.Number),
    SegmentsSpilloverCount: S.optional(S.Number),
    SegmentsRejectedCount: S.optional(S.Number),
    BackendConnectionErrors: S.optional(BackendConnectionErrors),
  }),
).annotate({
  identifier: "TelemetryRecord",
}) as any as S.Schema<TelemetryRecord>;
export type TelemetryRecordList = TelemetryRecord[];
export const TelemetryRecordList = /*@__PURE__*/ S.Array(TelemetryRecord);
export type EC2InstanceId = string;
export type Hostname = string;
export interface PutTelemetryRecordsRequest {
  TelemetryRecords: TelemetryRecord[];
  EC2InstanceId?: string;
  Hostname?: string;
  ResourceARN?: string;
}
export const PutTelemetryRecordsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TelemetryRecords: TelemetryRecordList,
    EC2InstanceId: S.optional(S.String),
    Hostname: S.optional(S.String),
    ResourceARN: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TelemetryRecords" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutTelemetryRecordsRequest",
}) as any as S.Schema<PutTelemetryRecordsRequest>;
export interface PutTelemetryRecordsResult {}
export const PutTelemetryRecordsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutTelemetryRecordsResult",
}) as any as S.Schema<PutTelemetryRecordsResult>;
export type TraceSegmentDocument = string;
export type TraceSegmentDocumentList = string[];
export const TraceSegmentDocumentList = /*@__PURE__*/ S.Array(S.String);
export interface PutTraceSegmentsRequest {
  TraceSegmentDocuments: string[];
}
export const PutTraceSegmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TraceSegmentDocuments: TraceSegmentDocumentList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TraceSegments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutTraceSegmentsRequest",
}) as any as S.Schema<PutTraceSegmentsRequest>;
export interface UnprocessedTraceSegment {
  Id?: string;
  ErrorCode?: string;
  Message?: string;
}
export const UnprocessedTraceSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ErrorCode: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "UnprocessedTraceSegment",
}) as any as S.Schema<UnprocessedTraceSegment>;
export type UnprocessedTraceSegmentList = UnprocessedTraceSegment[];
export const UnprocessedTraceSegmentList = /*@__PURE__*/ S.Array(
  UnprocessedTraceSegment,
);
export interface PutTraceSegmentsResult {
  UnprocessedTraceSegments?: UnprocessedTraceSegment[];
}
export const PutTraceSegmentsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UnprocessedTraceSegments: S.optional(UnprocessedTraceSegmentList),
  }),
).annotate({
  identifier: "PutTraceSegmentsResult",
}) as any as S.Schema<PutTraceSegmentsResult>;
export type TraceIdListForRetrieval = string[];
export const TraceIdListForRetrieval = /*@__PURE__*/ S.Array(S.String);
export interface StartTraceRetrievalRequest {
  TraceIds: string[];
  StartTime: Date;
  EndTime: Date;
}
export const StartTraceRetrievalRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TraceIds: TraceIdListForRetrieval,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartTraceRetrieval" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTraceRetrievalRequest",
}) as any as S.Schema<StartTraceRetrievalRequest>;
export interface StartTraceRetrievalResult {
  RetrievalToken?: string;
}
export const StartTraceRetrievalResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RetrievalToken: S.optional(S.String) }),
).annotate({
  identifier: "StartTraceRetrievalResult",
}) as any as S.Schema<StartTraceRetrievalResult>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/TagResource" }),
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
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UntagResource" }),
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
export interface UpdateGroupRequest {
  GroupName?: string;
  GroupARN?: string;
  FilterExpression?: string;
  InsightsConfiguration?: InsightsConfiguration;
}
export const UpdateGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupName: S.optional(S.String),
    GroupARN: S.optional(S.String),
    FilterExpression: S.optional(S.String),
    InsightsConfiguration: S.optional(InsightsConfiguration),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGroupRequest",
}) as any as S.Schema<UpdateGroupRequest>;
export interface UpdateGroupResult {
  Group?: Group;
}
export const UpdateGroupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Group: S.optional(Group) }),
).annotate({
  identifier: "UpdateGroupResult",
}) as any as S.Schema<UpdateGroupResult>;
export interface ProbabilisticRuleValueUpdate {
  DesiredSamplingPercentage: number;
}
export const ProbabilisticRuleValueUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DesiredSamplingPercentage: S.Number }),
).annotate({
  identifier: "ProbabilisticRuleValueUpdate",
}) as any as S.Schema<ProbabilisticRuleValueUpdate>;
export type IndexingRuleValueUpdate = {
  Probabilistic: ProbabilisticRuleValueUpdate;
};
export const IndexingRuleValueUpdate = /*@__PURE__*/ S.Union([
  S.Struct({ Probabilistic: ProbabilisticRuleValueUpdate }),
]);
export interface UpdateIndexingRuleRequest {
  Name: string;
  Rule: IndexingRuleValueUpdate;
}
export const UpdateIndexingRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Rule: IndexingRuleValueUpdate }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateIndexingRule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIndexingRuleRequest",
}) as any as S.Schema<UpdateIndexingRuleRequest>;
export interface UpdateIndexingRuleResult {
  IndexingRule?: IndexingRule;
}
export const UpdateIndexingRuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IndexingRule: S.optional(IndexingRule) }),
).annotate({
  identifier: "UpdateIndexingRuleResult",
}) as any as S.Schema<UpdateIndexingRuleResult>;
export interface SamplingRuleUpdate {
  RuleName?: string;
  RuleARN?: string;
  ResourceARN?: string;
  Priority?: number;
  FixedRate?: number;
  ReservoirSize?: number;
  Host?: string;
  ServiceName?: string;
  ServiceType?: string;
  HTTPMethod?: string;
  URLPath?: string;
  Attributes?: { [key: string]: string | undefined };
  SamplingRateBoost?: SamplingRateBoost;
}
export const SamplingRuleUpdate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.optional(S.String),
    RuleARN: S.optional(S.String),
    ResourceARN: S.optional(S.String),
    Priority: S.optional(S.Number),
    FixedRate: S.optional(S.Number),
    ReservoirSize: S.optional(S.Number),
    Host: S.optional(S.String),
    ServiceName: S.optional(S.String),
    ServiceType: S.optional(S.String),
    HTTPMethod: S.optional(S.String),
    URLPath: S.optional(S.String),
    Attributes: S.optional(AttributeMap),
    SamplingRateBoost: S.optional(SamplingRateBoost),
  }),
).annotate({
  identifier: "SamplingRuleUpdate",
}) as any as S.Schema<SamplingRuleUpdate>;
export interface UpdateSamplingRuleRequest {
  SamplingRuleUpdate: SamplingRuleUpdate;
}
export const UpdateSamplingRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SamplingRuleUpdate: SamplingRuleUpdate }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateSamplingRule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSamplingRuleRequest",
}) as any as S.Schema<UpdateSamplingRuleRequest>;
export interface UpdateSamplingRuleResult {
  SamplingRuleRecord?: SamplingRuleRecord;
}
export const UpdateSamplingRuleResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SamplingRuleRecord: S.optional(SamplingRuleRecord) }),
).annotate({
  identifier: "UpdateSamplingRuleResult",
}) as any as S.Schema<UpdateSamplingRuleResult>;
export interface UpdateTraceSegmentDestinationRequest {
  Destination?: TraceSegmentDestination;
}
export const UpdateTraceSegmentDestinationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Destination: S.optional(TraceSegmentDestination) }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/UpdateTraceSegmentDestination" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateTraceSegmentDestinationRequest",
}) as any as S.Schema<UpdateTraceSegmentDestinationRequest>;
export interface UpdateTraceSegmentDestinationResult {
  Destination?: TraceSegmentDestination;
  Status?: TraceSegmentDestinationStatus;
}
export const UpdateTraceSegmentDestinationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: S.optional(TraceSegmentDestination),
    Status: S.optional(TraceSegmentDestinationStatus),
  }),
).annotate({
  identifier: "UpdateTraceSegmentDestinationResult",
}) as any as S.Schema<UpdateTraceSegmentDestinationResult>;
export type ErrorMessage = string;
export type BatchGetTracesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * You cannot find traces through this API if Transaction Search is enabled since trace is not indexed in X-Ray.
 *
 * Retrieves a list of traces specified by ID. Each trace is a collection of segment
 * documents that originates from a single request. Use `GetTraceSummaries` to get a
 * list of trace IDs.
 */
export const batchGetTraces: API.PaginatedOperationMethod<
  BatchGetTracesRequest,
  BatchGetTracesResult,
  BatchGetTracesError,
  Credentials | HttpClient.HttpClient,
  Trace
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: BatchGetTracesRequest,
  output: BatchGetTracesResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetTraces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Traces",
  } as const,
})) as any;

export type CancelTraceRetrievalError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Cancels an ongoing trace retrieval job initiated by `StartTraceRetrieval` using the provided `RetrievalToken`. A successful cancellation will return an HTTP 200 response.
 */
export const cancelTraceRetrieval: API.OperationMethod<
  CancelTraceRetrievalRequest,
  CancelTraceRetrievalResult,
  CancelTraceRetrievalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelTraceRetrievalRequest,
  output: CancelTraceRetrievalResult,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTraceRetrieval",
}));

export type CreateGroupError =
  | InvalidRequestException
  | ThrottledException
  | GroupAlreadyExists
  | CommonErrors;
/**
 * Creates a group resource with a name and a filter expression.
 */
export const createGroup: API.OperationMethod<
  CreateGroupRequest,
  CreateGroupResult,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateGroupRequest,
  output: CreateGroupResult,
  errors: [InvalidRequestException, ThrottledException, GroupAlreadyExists],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

export type CreateSamplingRuleError =
  | InvalidRequestException
  | RuleLimitExceededException
  | ThrottledException
  | SamplingRuleAlreadyExists
  | CommonErrors;
/**
 * Creates a rule to control sampling behavior for instrumented applications. Services
 * retrieve rules with GetSamplingRules, and evaluate each rule in ascending
 * order of *priority* for each request. If a rule matches, the service
 * records a trace, borrowing it from the reservoir size. After 10 seconds, the service
 * reports back to X-Ray with GetSamplingTargets to get updated versions of
 * each in-use rule. The updated rule contains a trace quota that the service can use instead
 * of borrowing from the reservoir.
 */
export const createSamplingRule: API.OperationMethod<
  CreateSamplingRuleRequest,
  CreateSamplingRuleResult,
  CreateSamplingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSamplingRuleRequest,
  output: CreateSamplingRuleResult,
  errors: [
    InvalidRequestException,
    RuleLimitExceededException,
    ThrottledException,
    SamplingRuleAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSamplingRule",
}));

export type DeleteGroupError =
  | InvalidRequestException
  | ThrottledException
  | GroupNotFound
  | CommonErrors;
/**
 * Deletes a group resource.
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupRequest,
  DeleteGroupResult,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGroupRequest,
  output: DeleteGroupResult,
  errors: [InvalidRequestException, ThrottledException, GroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

export type DeleteResourcePolicyError =
  | InvalidPolicyRevisionIdException
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Deletes a resource policy from the target Amazon Web Services account.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResult,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResult,
  errors: [
    InvalidPolicyRevisionIdException,
    InvalidRequestException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteSamplingRuleError =
  | InvalidRequestException
  | ThrottledException
  | SamplingRuleNotFound
  | CommonErrors;
/**
 * Deletes a sampling rule.
 */
export const deleteSamplingRule: API.OperationMethod<
  DeleteSamplingRuleRequest,
  DeleteSamplingRuleResult,
  DeleteSamplingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSamplingRuleRequest,
  output: DeleteSamplingRuleResult,
  errors: [InvalidRequestException, ThrottledException, SamplingRuleNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSamplingRule",
}));

export type GetEncryptionConfigError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves the current encryption configuration for X-Ray data.
 */
export const getEncryptionConfig: API.OperationMethod<
  GetEncryptionConfigRequest,
  GetEncryptionConfigResult,
  GetEncryptionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEncryptionConfigRequest,
  output: GetEncryptionConfigResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEncryptionConfig",
}));

export type GetGroupError =
  | InvalidRequestException
  | ThrottledException
  | GroupNotFound
  | CommonErrors;
/**
 * Retrieves group resource details.
 */
export const getGroup: API.OperationMethod<
  GetGroupRequest,
  GetGroupResult,
  GetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGroupRequest,
  output: GetGroupResult,
  errors: [InvalidRequestException, ThrottledException, GroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
}));

export type GetGroupsError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves all active group details.
 */
export const getGroups: API.PaginatedOperationMethod<
  GetGroupsRequest,
  GetGroupsResult,
  GetGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetGroupsRequest,
  output: GetGroupsResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Groups",
  } as const,
})) as any;

export type GetIndexingRulesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves all indexing rules.
 *
 * Indexing rules are used to determine the server-side sampling rate for spans ingested through the CloudWatchLogs destination and indexed by X-Ray. For more information, see Transaction Search.
 */
export const getIndexingRules: API.OperationMethod<
  GetIndexingRulesRequest,
  GetIndexingRulesResult,
  GetIndexingRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIndexingRulesRequest,
  output: GetIndexingRulesResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIndexingRules",
}));

export type GetInsightError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves the summary information of an insight. This includes impact to clients and
 * root cause services, the top anomalous services, the category, the state of the insight,
 * and the start and end time of the insight.
 */
export const getInsight: API.OperationMethod<
  GetInsightRequest,
  GetInsightResult,
  GetInsightError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInsightRequest,
  output: GetInsightResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsight",
}));

export type GetInsightEventsError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * X-Ray reevaluates insights periodically until they're resolved, and records each intermediate state as an
 * event. You can review an insight's events in the Impact Timeline on the Inspect page in the X-Ray
 * console.
 */
export const getInsightEvents: API.PaginatedOperationMethod<
  GetInsightEventsRequest,
  GetInsightEventsResult,
  GetInsightEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetInsightEventsRequest,
  output: GetInsightEventsResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightEvents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetInsightImpactGraphError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves a service graph structure filtered by the specified insight. The service graph is limited to only
 * structural information. For a complete service graph, use this API with the GetServiceGraph API.
 */
export const getInsightImpactGraph: API.OperationMethod<
  GetInsightImpactGraphRequest,
  GetInsightImpactGraphResult,
  GetInsightImpactGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInsightImpactGraphRequest,
  output: GetInsightImpactGraphResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightImpactGraph",
}));

export type GetInsightSummariesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves the summaries of all insights in the specified group matching the provided filter values.
 */
export const getInsightSummaries: API.PaginatedOperationMethod<
  GetInsightSummariesRequest,
  GetInsightSummariesResult,
  GetInsightSummariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetInsightSummariesRequest,
  output: GetInsightSummariesResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInsightSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetRetrievedTracesGraphError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves a service graph for traces based on the specified `RetrievalToken` from the CloudWatch log group generated by Transaction Search. This API does not initiate a retrieval job. You must first execute `StartTraceRetrieval` to obtain the required `RetrievalToken`.
 *
 * The trace graph describes services that process incoming requests and any downstream services they call, which may include Amazon Web Services resources, external APIs, or databases.
 *
 * The response is empty until the `RetrievalStatus` is *COMPLETE*. Retry the request after the status changes from *RUNNING* or *SCHEDULED* to *COMPLETE* to access the full service graph.
 *
 * When CloudWatch log is the destination, this API can support cross-account observability and service graph retrieval across linked accounts.
 *
 * For retrieving graphs from X-Ray directly as opposed to the Transaction-Search Log group, see GetTraceGraph.
 */
export const getRetrievedTracesGraph: API.OperationMethod<
  GetRetrievedTracesGraphRequest,
  GetRetrievedTracesGraphResult,
  GetRetrievedTracesGraphError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRetrievedTracesGraphRequest,
  output: GetRetrievedTracesGraphResult,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRetrievedTracesGraph",
}));

export type GetSamplingRulesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves all sampling rules.
 */
export const getSamplingRules: API.PaginatedOperationMethod<
  GetSamplingRulesRequest,
  GetSamplingRulesResult,
  GetSamplingRulesError,
  Credentials | HttpClient.HttpClient,
  SamplingRuleRecord
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetSamplingRulesRequest,
  output: GetSamplingRulesResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSamplingRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SamplingRuleRecords",
  } as const,
})) as any;

export type GetSamplingStatisticSummariesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves information about recent sampling results for all sampling rules.
 */
export const getSamplingStatisticSummaries: API.PaginatedOperationMethod<
  GetSamplingStatisticSummariesRequest,
  GetSamplingStatisticSummariesResult,
  GetSamplingStatisticSummariesError,
  Credentials | HttpClient.HttpClient,
  SamplingStatisticSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetSamplingStatisticSummariesRequest,
  output: GetSamplingStatisticSummariesResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSamplingStatisticSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SamplingStatisticSummaries",
  } as const,
})) as any;

export type GetSamplingTargetsError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Requests a sampling quota for rules that the service is using to sample requests.
 */
export const getSamplingTargets: API.OperationMethod<
  GetSamplingTargetsRequest,
  GetSamplingTargetsResult,
  GetSamplingTargetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSamplingTargetsRequest,
  output: GetSamplingTargetsResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSamplingTargets",
}));

export type GetServiceGraphError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves a document that describes services that process incoming requests, and
 * downstream services that they call as a result. Root services process incoming requests and
 * make calls to downstream services. Root services are applications that use the Amazon Web Services X-Ray SDK.
 * Downstream services can be other applications, Amazon Web Services resources, HTTP web APIs, or SQL
 * databases.
 */
export const getServiceGraph: API.PaginatedOperationMethod<
  GetServiceGraphRequest,
  GetServiceGraphResult,
  GetServiceGraphError,
  Credentials | HttpClient.HttpClient,
  Service
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetServiceGraphRequest,
  output: GetServiceGraphResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceGraph",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Services",
  } as const,
})) as any;

export type GetTimeSeriesServiceStatisticsError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Get an aggregation of service statistics defined by a specific time
 * range.
 */
export const getTimeSeriesServiceStatistics: API.PaginatedOperationMethod<
  GetTimeSeriesServiceStatisticsRequest,
  GetTimeSeriesServiceStatisticsResult,
  GetTimeSeriesServiceStatisticsError,
  Credentials | HttpClient.HttpClient,
  TimeSeriesServiceStatistics
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetTimeSeriesServiceStatisticsRequest,
  output: GetTimeSeriesServiceStatisticsResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTimeSeriesServiceStatistics",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TimeSeriesServiceStatistics",
  } as const,
})) as any;

export type GetTraceGraphError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves a service graph for one or more specific trace IDs.
 */
export const getTraceGraph: API.PaginatedOperationMethod<
  GetTraceGraphRequest,
  GetTraceGraphResult,
  GetTraceGraphError,
  Credentials | HttpClient.HttpClient,
  Service
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetTraceGraphRequest,
  output: GetTraceGraphResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTraceGraph",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Services",
  } as const,
})) as any;

export type GetTraceSegmentDestinationError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves the current destination of data sent to `PutTraceSegments` and *OpenTelemetry protocol (OTLP)* endpoint. The Transaction Search feature requires a CloudWatchLogs destination. For more information, see Transaction Search and OpenTelemetry.
 */
export const getTraceSegmentDestination: API.OperationMethod<
  GetTraceSegmentDestinationRequest,
  GetTraceSegmentDestinationResult,
  GetTraceSegmentDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTraceSegmentDestinationRequest,
  output: GetTraceSegmentDestinationResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTraceSegmentDestination",
}));

export type GetTraceSummariesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves IDs and annotations for traces available for a specified time frame using an
 * optional filter. To get the full traces, pass the trace IDs to
 * `BatchGetTraces`.
 *
 * A filter expression can target traced requests that hit specific service nodes or
 * edges, have errors, or come from a known user. For example, the following filter expression
 * targets traces that pass through `api.example.com`:
 *
 * `service("api.example.com")`
 *
 * This filter expression finds traces that have an annotation named `account`
 * with the value `12345`:
 *
 * `annotation.account = "12345"`
 *
 * For a full list of indexed fields and keywords that you can use in filter expressions,
 * see Use filter
 * expressions in the *Amazon Web Services X-Ray Developer Guide*.
 */
export const getTraceSummaries: API.PaginatedOperationMethod<
  GetTraceSummariesRequest,
  GetTraceSummariesResult,
  GetTraceSummariesError,
  Credentials | HttpClient.HttpClient,
  TraceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetTraceSummariesRequest,
  output: GetTraceSummariesResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTraceSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TraceSummaries",
  } as const,
})) as any;

export type ListResourcePoliciesError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Returns the list of resource policies in the target Amazon Web Services account.
 */
export const listResourcePolicies: API.PaginatedOperationMethod<
  ListResourcePoliciesRequest,
  ListResourcePoliciesResult,
  ListResourcePoliciesError,
  Credentials | HttpClient.HttpClient,
  ResourcePolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListResourcePoliciesRequest,
  output: ListResourcePoliciesResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourcePolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourcePolicies",
  } as const,
})) as any;

export type ListRetrievedTracesError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Retrieves a list of traces for a given `RetrievalToken` from the CloudWatch log group generated by Transaction Search. For information on what each trace returns, see BatchGetTraces.
 *
 * This API does not initiate a retrieval process. To start a trace retrieval, use `StartTraceRetrieval`, which generates the required `RetrievalToken`.
 *
 * When the `RetrievalStatus` is not *COMPLETE*, the API will return an empty response. Retry the request once the retrieval has completed to access the full list of traces.
 *
 * For cross-account observability, this API can retrieve traces from linked accounts when CloudWatch log is set as the destination across relevant accounts. For more details, see CloudWatch cross-account observability.
 *
 * For retrieving data from X-Ray directly as opposed to the Transaction Search generated log group, see BatchGetTraces.
 */
export const listRetrievedTraces: API.OperationMethod<
  ListRetrievedTracesRequest,
  ListRetrievedTracesResult,
  ListRetrievedTracesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListRetrievedTracesRequest,
  output: ListRetrievedTracesResult,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRetrievedTraces",
}));

export type ListTagsForResourceError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Returns a list of tags that are applied to the specified Amazon Web Services X-Ray group or sampling rule.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
  } as const,
})) as any;

export type PutEncryptionConfigError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Updates the encryption configuration for X-Ray data.
 */
export const putEncryptionConfig: API.OperationMethod<
  PutEncryptionConfigRequest,
  PutEncryptionConfigResult,
  PutEncryptionConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEncryptionConfigRequest,
  output: PutEncryptionConfigResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEncryptionConfig",
}));

export type PutResourcePolicyError =
  | InvalidPolicyRevisionIdException
  | LockoutPreventionException
  | MalformedPolicyDocumentException
  | PolicyCountLimitExceededException
  | PolicySizeLimitExceededException
  | ThrottledException
  | CommonErrors;
/**
 * Sets the resource policy to grant one or more Amazon Web Services services and accounts permissions to
 * access X-Ray. Each resource policy will be associated with a specific Amazon Web Services account.
 * Each Amazon Web Services account can have a maximum of 5 resource policies, and each policy name must be
 * unique within that account. The maximum size of each resource policy is 5KB.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResult,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutResourcePolicyRequest,
  output: PutResourcePolicyResult,
  errors: [
    InvalidPolicyRevisionIdException,
    LockoutPreventionException,
    MalformedPolicyDocumentException,
    PolicyCountLimitExceededException,
    PolicySizeLimitExceededException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type PutTelemetryRecordsError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Used by the Amazon Web Services X-Ray daemon to upload telemetry.
 */
export const putTelemetryRecords: API.OperationMethod<
  PutTelemetryRecordsRequest,
  PutTelemetryRecordsResult,
  PutTelemetryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutTelemetryRecordsRequest,
  output: PutTelemetryRecordsResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTelemetryRecords",
}));

export type PutTraceSegmentsError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Uploads segment documents to Amazon Web Services X-Ray.
 * A segment document can be a completed segment, an in-progress segment, or an array of
 * subsegments.
 *
 * Segments must include the following fields. For the full segment document schema, see
 * Amazon Web Services X-Ray
 * Segment Documents in the *Amazon Web Services X-Ray Developer Guide*.
 *
 * **Required segment document fields**
 *
 * - `name` - The name of the service that handled the request.
 *
 * - `id` - A 64-bit identifier for the segment, unique among segments in the same trace, in 16
 * hexadecimal digits.
 *
 * - `trace_id` - A unique identifier that connects all segments and subsegments originating from
 * a single client request.
 *
 * - `start_time` - Time the segment or subsegment was created, in floating point seconds in
 * epoch time, accurate to milliseconds. For example, `1480615200.010` or
 * `1.480615200010E9`.
 *
 * - `end_time` - Time the segment or subsegment was closed. For example,
 * `1480615200.090` or `1.480615200090E9`. Specify either an `end_time` or
 * `in_progress`.
 *
 * - `in_progress` - Set to `true` instead of specifying an `end_time` to
 * record that a segment has been started, but is not complete. Send an in-progress segment when your application
 * receives a request that will take a long time to serve, to trace that the request was received. When the
 * response is sent, send the complete segment to overwrite the in-progress segment.
 *
 * A `trace_id` consists of three numbers separated by hyphens. For example,
 * 1-58406520-a006649127e371903a2de979. For trace IDs created by an X-Ray SDK, or by Amazon Web Services services
 * integrated with X-Ray, a trace ID includes:
 *
 * **Trace ID Format**
 *
 * - The version number, for instance, `1`.
 *
 * - The time of the original request, in Unix epoch time, in 8 hexadecimal digits. For
 * example, 10:00AM December 2nd, 2016 PST in epoch time is `1480615200` seconds,
 * or `58406520` in hexadecimal.
 *
 * - A 96-bit identifier for the trace, globally unique, in 24 hexadecimal
 * digits.
 *
 * Trace IDs created via OpenTelemetry have a different format based on the
 * W3C Trace Context specification.
 * A W3C trace ID must be formatted in the X-Ray trace ID format when sending to X-Ray. For example, a W3C
 * trace ID `4efaaf4d1e8720b39541901950019ee5` should be formatted as
 * `1-4efaaf4d-1e8720b39541901950019ee5` when sending to X-Ray. While X-Ray trace IDs include
 * the original request timestamp in Unix epoch time, this is not required or validated.
 */
export const putTraceSegments: API.OperationMethod<
  PutTraceSegmentsRequest,
  PutTraceSegmentsResult,
  PutTraceSegmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutTraceSegmentsRequest,
  output: PutTraceSegmentsResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTraceSegments",
}));

export type StartTraceRetrievalError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Initiates a trace retrieval process using the specified time range and for the given trace IDs in the Transaction Search generated CloudWatch log group. For more information, see Transaction Search.
 *
 * API returns a `RetrievalToken`, which can be used with `ListRetrievedTraces` or `GetRetrievedTracesGraph` to fetch results. Retrievals will time out after 60 minutes. To execute long time ranges, consider segmenting into multiple retrievals.
 *
 * If you are using CloudWatch cross-account observability, you can use this operation in a monitoring account to retrieve data from a linked source account, as long as both accounts have transaction search enabled.
 *
 * For retrieving data from X-Ray directly as opposed to the Transaction-Search Log group, see BatchGetTraces.
 */
export const startTraceRetrieval: API.OperationMethod<
  StartTraceRetrievalRequest,
  StartTraceRetrievalResult,
  StartTraceRetrievalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTraceRetrievalRequest,
  output: StartTraceRetrievalResult,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTraceRetrieval",
}));

export type TagResourceError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | TooManyTagsException
  | CommonErrors;
/**
 * Applies tags to an existing Amazon Web Services X-Ray group or sampling rule.
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
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Removes tags from an Amazon Web Services X-Ray group or sampling rule. You cannot edit or delete system
 * tags (those with an `aws:` prefix).
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
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateGroupError =
  | InvalidRequestException
  | ThrottledException
  | GroupNotFound
  | CommonErrors;
/**
 * Updates a group resource.
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupRequest,
  UpdateGroupResult,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGroupRequest,
  output: UpdateGroupResult,
  errors: [InvalidRequestException, ThrottledException, GroupNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
}));

export type UpdateIndexingRuleError =
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottledException
  | CommonErrors;
/**
 * Modifies an indexing rule’s configuration.
 *
 * Indexing rules are used for determining the sampling rate for spans indexed from CloudWatch Logs. For more information, see Transaction Search.
 */
export const updateIndexingRule: API.OperationMethod<
  UpdateIndexingRuleRequest,
  UpdateIndexingRuleResult,
  UpdateIndexingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIndexingRuleRequest,
  output: UpdateIndexingRuleResult,
  errors: [
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottledException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIndexingRule",
}));

export type UpdateSamplingRuleError =
  | InvalidRequestException
  | ThrottledException
  | SamplingRuleNotFound
  | CommonErrors;
/**
 * Modifies a sampling rule's configuration.
 */
export const updateSamplingRule: API.OperationMethod<
  UpdateSamplingRuleRequest,
  UpdateSamplingRuleResult,
  UpdateSamplingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSamplingRuleRequest,
  output: UpdateSamplingRuleResult,
  errors: [InvalidRequestException, ThrottledException, SamplingRuleNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSamplingRule",
}));

export type UpdateTraceSegmentDestinationError =
  | InvalidRequestException
  | ThrottledException
  | CommonErrors;
/**
 * Modifies the destination of data sent to `PutTraceSegments`. The Transaction Search feature requires the CloudWatchLogs destination. For more information, see Transaction Search.
 */
export const updateTraceSegmentDestination: API.OperationMethod<
  UpdateTraceSegmentDestinationRequest,
  UpdateTraceSegmentDestinationResult,
  UpdateTraceSegmentDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTraceSegmentDestinationRequest,
  output: UpdateTraceSegmentDestinationResult,
  errors: [InvalidRequestException, ThrottledException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTraceSegmentDestination",
}));
