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
  sdkId: "TrustedAdvisor",
  serviceShapeName: "TrustedAdvisor",
});
const auth = T.AwsAuthSigv4({ name: "trustedadvisor" });
const ver = T.ServiceVersion("2022-09-15");
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
              `https://trustedadvisor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://trustedadvisor-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://trustedadvisor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://trustedadvisor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type RecommendationResourceArn = string;
export interface RecommendationResourceExclusion {
  arn: string;
  isExcluded: boolean;
}
export const RecommendationResourceExclusion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, isExcluded: S.Boolean }),
).annotate({
  identifier: "RecommendationResourceExclusion",
}) as any as S.Schema<RecommendationResourceExclusion>;
export type RecommendationResourceExclusionList =
  RecommendationResourceExclusion[];
export const RecommendationResourceExclusionList = /*@__PURE__*/ S.Array(
  RecommendationResourceExclusion,
);
export interface BatchUpdateRecommendationResourceExclusionRequest {
  recommendationResourceExclusions: RecommendationResourceExclusion[];
}
export const BatchUpdateRecommendationResourceExclusionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      recommendationResourceExclusions: RecommendationResourceExclusionList,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/batch-update-recommendation-resource-exclusion",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "BatchUpdateRecommendationResourceExclusionRequest",
  }) as any as S.Schema<BatchUpdateRecommendationResourceExclusionRequest>;
export interface UpdateRecommendationResourceExclusionError {
  arn?: string;
  errorCode?: string;
  errorMessage?: string;
}
export const UpdateRecommendationResourceExclusionError =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      arn: S.optional(S.String),
      errorCode: S.optional(S.String),
      errorMessage: S.optional(S.String),
    }),
  ).annotate({
    identifier: "UpdateRecommendationResourceExclusionError",
  }) as any as S.Schema<UpdateRecommendationResourceExclusionError>;
export type UpdateRecommendationResourceExclusionErrorList =
  UpdateRecommendationResourceExclusionError[];
export const UpdateRecommendationResourceExclusionErrorList =
  /*@__PURE__*/ S.Array(UpdateRecommendationResourceExclusionError);
export interface BatchUpdateRecommendationResourceExclusionResponse {
  batchUpdateRecommendationResourceExclusionErrors: UpdateRecommendationResourceExclusionError[];
}
export const BatchUpdateRecommendationResourceExclusionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      batchUpdateRecommendationResourceExclusionErrors:
        UpdateRecommendationResourceExclusionErrorList,
    }),
  ).annotate({
    identifier: "BatchUpdateRecommendationResourceExclusionResponse",
  }) as any as S.Schema<BatchUpdateRecommendationResourceExclusionResponse>;
export type OrganizationRecommendationIdentifier = string;
export interface GetOrganizationRecommendationRequest {
  organizationRecommendationIdentifier: string;
}
export const GetOrganizationRecommendationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      organizationRecommendationIdentifier: S.String.pipe(
        T.HttpLabel("organizationRecommendationIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/organization-recommendations/{organizationRecommendationIdentifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetOrganizationRecommendationRequest",
}) as any as S.Schema<GetOrganizationRecommendationRequest>;
export type RecommendationType = "standard" | "priority" | (string & {});
export const RecommendationType = /*@__PURE__*/ S.String;

export type RecommendationStatus = "ok" | "warning" | "error" | (string & {});
export const RecommendationStatus = /*@__PURE__*/ S.String;

export type RecommendationLifecycleStage =
  | "in_progress"
  | "pending_response"
  | "dismissed"
  | "resolved"
  | (string & {});
export const RecommendationLifecycleStage = /*@__PURE__*/ S.String;

export type RecommendationPillar =
  | "cost_optimizing"
  | "performance"
  | "security"
  | "service_limits"
  | "fault_tolerance"
  | "operational_excellence"
  | (string & {});
export const RecommendationPillar = /*@__PURE__*/ S.String;

export type RecommendationPillarList = RecommendationPillar[];
export const RecommendationPillarList =
  /*@__PURE__*/ S.Array(RecommendationPillar);
export type RecommendationSource =
  | "aws_config"
  | "compute_optimizer"
  | "cost_explorer"
  | "lse"
  | "manual"
  | "pse"
  | "rds"
  | "resilience"
  | "resilience_hub"
  | "security_hub"
  | "stir"
  | "ta_check"
  | "well_architected"
  | "cost_optimization_hub"
  | (string & {});
export const RecommendationSource = /*@__PURE__*/ S.String;

export type RecommendationAwsService = string;
export type RecommendationAwsServiceList = string[];
export const RecommendationAwsServiceList = /*@__PURE__*/ S.Array(S.String);
export interface RecommendationResourcesAggregates {
  okCount: number;
  warningCount: number;
  errorCount: number;
  excludedCount?: number;
}
export const RecommendationResourcesAggregates = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    okCount: S.Number,
    warningCount: S.Number,
    errorCount: S.Number,
    excludedCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "RecommendationResourcesAggregates",
}) as any as S.Schema<RecommendationResourcesAggregates>;
export interface RecommendationCostOptimizingAggregates {
  estimatedMonthlySavings: number;
  estimatedPercentMonthlySavings: number;
}
export const RecommendationCostOptimizingAggregates = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      estimatedMonthlySavings: S.Number,
      estimatedPercentMonthlySavings: S.Number,
    }),
).annotate({
  identifier: "RecommendationCostOptimizingAggregates",
}) as any as S.Schema<RecommendationCostOptimizingAggregates>;
export interface RecommendationPillarSpecificAggregates {
  costOptimizing?: RecommendationCostOptimizingAggregates;
}
export const RecommendationPillarSpecificAggregates = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      costOptimizing: S.optional(RecommendationCostOptimizingAggregates),
    }),
).annotate({
  identifier: "RecommendationPillarSpecificAggregates",
}) as any as S.Schema<RecommendationPillarSpecificAggregates>;
export type OrganizationRecommendationArn = string;
export type RecommendationUpdateReason = string | redacted.Redacted<string>;
export type UpdateRecommendationLifecycleStageReasonCode =
  | "non_critical_account"
  | "temporary_account"
  | "valid_business_case"
  | "other_methods_available"
  | "low_priority"
  | "not_applicable"
  | "other"
  | (string & {});
export const UpdateRecommendationLifecycleStageReasonCode =
  /*@__PURE__*/ S.String;

export interface OrganizationRecommendation {
  id: string;
  type: RecommendationType;
  checkArn?: string;
  status: RecommendationStatus;
  lifecycleStage?: RecommendationLifecycleStage;
  pillars: RecommendationPillar[];
  source: RecommendationSource;
  awsServices?: string[];
  name: string;
  resourcesAggregates: RecommendationResourcesAggregates;
  pillarSpecificAggregates?: RecommendationPillarSpecificAggregates;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  arn: string;
  description: string;
  createdBy?: string;
  updatedOnBehalfOf?: string;
  updatedOnBehalfOfJobTitle?: string;
  updateReason?: string | redacted.Redacted<string>;
  updateReasonCode?: UpdateRecommendationLifecycleStageReasonCode;
  resolvedAt?: Date;
}
export const OrganizationRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: RecommendationType,
    checkArn: S.optional(S.String),
    status: RecommendationStatus,
    lifecycleStage: S.optional(RecommendationLifecycleStage),
    pillars: RecommendationPillarList,
    source: RecommendationSource,
    awsServices: S.optional(RecommendationAwsServiceList),
    name: S.String,
    resourcesAggregates: RecommendationResourcesAggregates,
    pillarSpecificAggregates: S.optional(
      RecommendationPillarSpecificAggregates,
    ),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    arn: S.String,
    description: S.String,
    createdBy: S.optional(S.String),
    updatedOnBehalfOf: S.optional(S.String),
    updatedOnBehalfOfJobTitle: S.optional(S.String),
    updateReason: S.optional(SensitiveString),
    updateReasonCode: S.optional(UpdateRecommendationLifecycleStageReasonCode),
    resolvedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "OrganizationRecommendation",
}) as any as S.Schema<OrganizationRecommendation>;
export interface GetOrganizationRecommendationResponse {
  organizationRecommendation?: OrganizationRecommendation;
}
export const GetOrganizationRecommendationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      organizationRecommendation: S.optional(OrganizationRecommendation),
    }),
).annotate({
  identifier: "GetOrganizationRecommendationResponse",
}) as any as S.Schema<GetOrganizationRecommendationResponse>;
export type AccountRecommendationIdentifier = string;
export type RecommendationLanguage =
  | "en"
  | "ja"
  | "zh"
  | "fr"
  | "de"
  | "ko"
  | "zh_TW"
  | "it"
  | "es"
  | "pt_BR"
  | "id"
  | (string & {});
export const RecommendationLanguage = /*@__PURE__*/ S.String;

export interface GetRecommendationRequest {
  recommendationIdentifier: string;
  language?: RecommendationLanguage;
}
export const GetRecommendationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recommendationIdentifier: S.String.pipe(
      T.HttpLabel("recommendationIdentifier"),
    ),
    language: S.optional(RecommendationLanguage).pipe(T.HttpQuery("language")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/recommendations/{recommendationIdentifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRecommendationRequest",
}) as any as S.Schema<GetRecommendationRequest>;
export type AccountRecommendationArn = string;
export type StatusReason = "no_data_ok" | (string & {});
export const StatusReason = /*@__PURE__*/ S.String;

export interface Recommendation {
  id: string;
  type: RecommendationType;
  checkArn?: string;
  status: RecommendationStatus;
  lifecycleStage?: RecommendationLifecycleStage;
  pillars: RecommendationPillar[];
  source: RecommendationSource;
  awsServices?: string[];
  name: string;
  resourcesAggregates: RecommendationResourcesAggregates;
  pillarSpecificAggregates?: RecommendationPillarSpecificAggregates;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  arn: string;
  statusReason?: StatusReason;
  description: string;
  createdBy?: string;
  updatedOnBehalfOf?: string;
  updatedOnBehalfOfJobTitle?: string;
  updateReason?: string | redacted.Redacted<string>;
  updateReasonCode?: UpdateRecommendationLifecycleStageReasonCode;
  resolvedAt?: Date;
}
export const Recommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: RecommendationType,
    checkArn: S.optional(S.String),
    status: RecommendationStatus,
    lifecycleStage: S.optional(RecommendationLifecycleStage),
    pillars: RecommendationPillarList,
    source: RecommendationSource,
    awsServices: S.optional(RecommendationAwsServiceList),
    name: S.String,
    resourcesAggregates: RecommendationResourcesAggregates,
    pillarSpecificAggregates: S.optional(
      RecommendationPillarSpecificAggregates,
    ),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    arn: S.String,
    statusReason: S.optional(StatusReason),
    description: S.String,
    createdBy: S.optional(S.String),
    updatedOnBehalfOf: S.optional(S.String),
    updatedOnBehalfOfJobTitle: S.optional(S.String),
    updateReason: S.optional(SensitiveString),
    updateReasonCode: S.optional(UpdateRecommendationLifecycleStageReasonCode),
    resolvedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({ identifier: "Recommendation" }) as any as S.Schema<Recommendation>;
export interface GetRecommendationResponse {
  recommendation?: Recommendation;
}
export const GetRecommendationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recommendation: S.optional(Recommendation) }),
).annotate({
  identifier: "GetRecommendationResponse",
}) as any as S.Schema<GetRecommendationResponse>;
export interface ListChecksRequest {
  nextToken?: string;
  maxResults?: number;
  pillar?: RecommendationPillar;
  awsService?: string;
  source?: RecommendationSource;
  language?: RecommendationLanguage;
}
export const ListChecksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    pillar: S.optional(RecommendationPillar).pipe(T.HttpQuery("pillar")),
    awsService: S.optional(S.String).pipe(T.HttpQuery("awsService")),
    source: S.optional(RecommendationSource).pipe(T.HttpQuery("source")),
    language: S.optional(RecommendationLanguage).pipe(T.HttpQuery("language")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/checks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChecksRequest",
}) as any as S.Schema<ListChecksRequest>;
export type CheckArn = string;
export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CheckSummary {
  id: string;
  arn: string;
  name: string;
  description: string;
  pillars: RecommendationPillar[];
  awsServices: string[];
  source: RecommendationSource;
  metadata: { [key: string]: string | undefined };
}
export const CheckSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.String,
    description: S.String,
    pillars: RecommendationPillarList,
    awsServices: RecommendationAwsServiceList,
    source: RecommendationSource,
    metadata: StringMap,
  }),
).annotate({ identifier: "CheckSummary" }) as any as S.Schema<CheckSummary>;
export type CheckSummaryList = CheckSummary[];
export const CheckSummaryList = /*@__PURE__*/ S.Array(CheckSummary);
export interface ListChecksResponse {
  nextToken?: string;
  checkSummaries: CheckSummary[];
}
export const ListChecksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    checkSummaries: CheckSummaryList,
  }),
).annotate({
  identifier: "ListChecksResponse",
}) as any as S.Schema<ListChecksResponse>;
export type AccountId = string;
export interface ListOrganizationRecommendationAccountsRequest {
  nextToken?: string;
  maxResults?: number;
  organizationRecommendationIdentifier: string;
  affectedAccountId?: string;
}
export const ListOrganizationRecommendationAccountsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      organizationRecommendationIdentifier: S.String.pipe(
        T.HttpLabel("organizationRecommendationIdentifier"),
      ),
      affectedAccountId: S.optional(S.String).pipe(
        T.HttpQuery("affectedAccountId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/organization-recommendations/{organizationRecommendationIdentifier}/accounts",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListOrganizationRecommendationAccountsRequest",
  }) as any as S.Schema<ListOrganizationRecommendationAccountsRequest>;
export interface AccountRecommendationLifecycleSummary {
  accountId?: string;
  accountRecommendationArn?: string;
  lifecycleStage?: RecommendationLifecycleStage;
  updatedOnBehalfOf?: string;
  updatedOnBehalfOfJobTitle?: string;
  updateReason?: string | redacted.Redacted<string>;
  updateReasonCode?: UpdateRecommendationLifecycleStageReasonCode;
  lastUpdatedAt?: Date;
}
export const AccountRecommendationLifecycleSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      accountId: S.optional(S.String),
      accountRecommendationArn: S.optional(S.String),
      lifecycleStage: S.optional(RecommendationLifecycleStage),
      updatedOnBehalfOf: S.optional(S.String),
      updatedOnBehalfOfJobTitle: S.optional(S.String),
      updateReason: S.optional(SensitiveString),
      updateReasonCode: S.optional(
        UpdateRecommendationLifecycleStageReasonCode,
      ),
      lastUpdatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
    }),
).annotate({
  identifier: "AccountRecommendationLifecycleSummary",
}) as any as S.Schema<AccountRecommendationLifecycleSummary>;
export type AccountRecommendationLifecycleSummaryList =
  AccountRecommendationLifecycleSummary[];
export const AccountRecommendationLifecycleSummaryList = /*@__PURE__*/ S.Array(
  AccountRecommendationLifecycleSummary,
);
export interface ListOrganizationRecommendationAccountsResponse {
  nextToken?: string;
  accountRecommendationLifecycleSummaries: AccountRecommendationLifecycleSummary[];
}
export const ListOrganizationRecommendationAccountsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      accountRecommendationLifecycleSummaries:
        AccountRecommendationLifecycleSummaryList,
    }),
  ).annotate({
    identifier: "ListOrganizationRecommendationAccountsResponse",
  }) as any as S.Schema<ListOrganizationRecommendationAccountsResponse>;
export type ResourceStatus = "ok" | "warning" | "error" | (string & {});
export const ResourceStatus = /*@__PURE__*/ S.String;

export type ExclusionStatus = "excluded" | "included" | (string & {});
export const ExclusionStatus = /*@__PURE__*/ S.String;

export interface ListOrganizationRecommendationResourcesRequest {
  nextToken?: string;
  maxResults?: number;
  status?: ResourceStatus;
  exclusionStatus?: ExclusionStatus;
  regionCode?: string;
  organizationRecommendationIdentifier: string;
  affectedAccountId?: string;
}
export const ListOrganizationRecommendationResourcesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      status: S.optional(ResourceStatus).pipe(T.HttpQuery("status")),
      exclusionStatus: S.optional(ExclusionStatus).pipe(
        T.HttpQuery("exclusionStatus"),
      ),
      regionCode: S.optional(S.String).pipe(T.HttpQuery("regionCode")),
      organizationRecommendationIdentifier: S.String.pipe(
        T.HttpLabel("organizationRecommendationIdentifier"),
      ),
      affectedAccountId: S.optional(S.String).pipe(
        T.HttpQuery("affectedAccountId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/organization-recommendations/{organizationRecommendationIdentifier}/resources",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListOrganizationRecommendationResourcesRequest",
  }) as any as S.Schema<ListOrganizationRecommendationResourcesRequest>;
export type RecommendationRegionCode = string;
export interface OrganizationRecommendationResourceSummary {
  id: string;
  arn: string;
  awsResourceId: string;
  regionCode: string;
  status: ResourceStatus;
  metadata: { [key: string]: string | undefined };
  lastUpdatedAt: Date;
  exclusionStatus?: ExclusionStatus;
  accountId?: string;
  recommendationArn: string;
}
export const OrganizationRecommendationResourceSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      id: S.String,
      arn: S.String,
      awsResourceId: S.String,
      regionCode: S.String,
      status: ResourceStatus,
      metadata: StringMap,
      lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
      exclusionStatus: S.optional(ExclusionStatus),
      accountId: S.optional(S.String),
      recommendationArn: S.String,
    }),
  ).annotate({
    identifier: "OrganizationRecommendationResourceSummary",
  }) as any as S.Schema<OrganizationRecommendationResourceSummary>;
export type OrganizationRecommendationResourceSummaryList =
  OrganizationRecommendationResourceSummary[];
export const OrganizationRecommendationResourceSummaryList =
  /*@__PURE__*/ S.Array(OrganizationRecommendationResourceSummary);
export interface ListOrganizationRecommendationResourcesResponse {
  nextToken?: string;
  organizationRecommendationResourceSummaries: OrganizationRecommendationResourceSummary[];
}
export const ListOrganizationRecommendationResourcesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      nextToken: S.optional(S.String),
      organizationRecommendationResourceSummaries:
        OrganizationRecommendationResourceSummaryList,
    }),
  ).annotate({
    identifier: "ListOrganizationRecommendationResourcesResponse",
  }) as any as S.Schema<ListOrganizationRecommendationResourcesResponse>;
export type CheckIdentifier = string;
export interface ListOrganizationRecommendationsRequest {
  nextToken?: string;
  maxResults?: number;
  type?: RecommendationType;
  status?: RecommendationStatus;
  pillar?: RecommendationPillar;
  awsService?: string;
  source?: RecommendationSource;
  checkIdentifier?: string;
  afterLastUpdatedAt?: Date;
  beforeLastUpdatedAt?: Date;
}
export const ListOrganizationRecommendationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      type: S.optional(RecommendationType).pipe(T.HttpQuery("type")),
      status: S.optional(RecommendationStatus).pipe(T.HttpQuery("status")),
      pillar: S.optional(RecommendationPillar).pipe(T.HttpQuery("pillar")),
      awsService: S.optional(S.String).pipe(T.HttpQuery("awsService")),
      source: S.optional(RecommendationSource).pipe(T.HttpQuery("source")),
      checkIdentifier: S.optional(S.String).pipe(
        T.HttpQuery("checkIdentifier"),
      ),
      afterLastUpdatedAt: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ).pipe(T.HttpQuery("afterLastUpdatedAt")),
      beforeLastUpdatedAt: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ).pipe(T.HttpQuery("beforeLastUpdatedAt")),
    }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/v1/organization-recommendations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListOrganizationRecommendationsRequest",
}) as any as S.Schema<ListOrganizationRecommendationsRequest>;
export interface OrganizationRecommendationSummary {
  id: string;
  type: RecommendationType;
  checkArn?: string;
  status: RecommendationStatus;
  lifecycleStage?: RecommendationLifecycleStage;
  pillars: RecommendationPillar[];
  source: RecommendationSource;
  awsServices?: string[];
  name: string;
  resourcesAggregates: RecommendationResourcesAggregates;
  pillarSpecificAggregates?: RecommendationPillarSpecificAggregates;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  arn: string;
}
export const OrganizationRecommendationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: RecommendationType,
    checkArn: S.optional(S.String),
    status: RecommendationStatus,
    lifecycleStage: S.optional(RecommendationLifecycleStage),
    pillars: RecommendationPillarList,
    source: RecommendationSource,
    awsServices: S.optional(RecommendationAwsServiceList),
    name: S.String,
    resourcesAggregates: RecommendationResourcesAggregates,
    pillarSpecificAggregates: S.optional(
      RecommendationPillarSpecificAggregates,
    ),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    arn: S.String,
  }),
).annotate({
  identifier: "OrganizationRecommendationSummary",
}) as any as S.Schema<OrganizationRecommendationSummary>;
export type OrganizationRecommendationSummaryList =
  OrganizationRecommendationSummary[];
export const OrganizationRecommendationSummaryList = /*@__PURE__*/ S.Array(
  OrganizationRecommendationSummary,
);
export interface ListOrganizationRecommendationsResponse {
  nextToken?: string;
  organizationRecommendationSummaries: OrganizationRecommendationSummary[];
}
export const ListOrganizationRecommendationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      organizationRecommendationSummaries:
        OrganizationRecommendationSummaryList,
    }),
).annotate({
  identifier: "ListOrganizationRecommendationsResponse",
}) as any as S.Schema<ListOrganizationRecommendationsResponse>;
export interface ListRecommendationResourcesRequest {
  nextToken?: string;
  maxResults?: number;
  status?: ResourceStatus;
  exclusionStatus?: ExclusionStatus;
  regionCode?: string;
  recommendationIdentifier: string;
  language?: RecommendationLanguage;
}
export const ListRecommendationResourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    status: S.optional(ResourceStatus).pipe(T.HttpQuery("status")),
    exclusionStatus: S.optional(ExclusionStatus).pipe(
      T.HttpQuery("exclusionStatus"),
    ),
    regionCode: S.optional(S.String).pipe(T.HttpQuery("regionCode")),
    recommendationIdentifier: S.String.pipe(
      T.HttpLabel("recommendationIdentifier"),
    ),
    language: S.optional(RecommendationLanguage).pipe(T.HttpQuery("language")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/recommendations/{recommendationIdentifier}/resources",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecommendationResourcesRequest",
}) as any as S.Schema<ListRecommendationResourcesRequest>;
export interface RecommendationResourceSummary {
  id: string;
  arn: string;
  awsResourceId: string;
  regionCode: string;
  status: ResourceStatus;
  metadata: { [key: string]: string | undefined };
  lastUpdatedAt: Date;
  exclusionStatus?: ExclusionStatus;
  recommendationArn: string;
}
export const RecommendationResourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    awsResourceId: S.String,
    regionCode: S.String,
    status: ResourceStatus,
    metadata: StringMap,
    lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    exclusionStatus: S.optional(ExclusionStatus),
    recommendationArn: S.String,
  }),
).annotate({
  identifier: "RecommendationResourceSummary",
}) as any as S.Schema<RecommendationResourceSummary>;
export type RecommendationResourceSummaryList = RecommendationResourceSummary[];
export const RecommendationResourceSummaryList = /*@__PURE__*/ S.Array(
  RecommendationResourceSummary,
);
export interface ListRecommendationResourcesResponse {
  nextToken?: string;
  recommendationResourceSummaries: RecommendationResourceSummary[];
}
export const ListRecommendationResourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    recommendationResourceSummaries: RecommendationResourceSummaryList,
  }),
).annotate({
  identifier: "ListRecommendationResourcesResponse",
}) as any as S.Schema<ListRecommendationResourcesResponse>;
export interface ListRecommendationsRequest {
  nextToken?: string;
  maxResults?: number;
  type?: RecommendationType;
  status?: RecommendationStatus;
  pillar?: RecommendationPillar;
  awsService?: string;
  source?: RecommendationSource;
  checkIdentifier?: string;
  afterLastUpdatedAt?: Date;
  beforeLastUpdatedAt?: Date;
  language?: RecommendationLanguage;
}
export const ListRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    type: S.optional(RecommendationType).pipe(T.HttpQuery("type")),
    status: S.optional(RecommendationStatus).pipe(T.HttpQuery("status")),
    pillar: S.optional(RecommendationPillar).pipe(T.HttpQuery("pillar")),
    awsService: S.optional(S.String).pipe(T.HttpQuery("awsService")),
    source: S.optional(RecommendationSource).pipe(T.HttpQuery("source")),
    checkIdentifier: S.optional(S.String).pipe(T.HttpQuery("checkIdentifier")),
    afterLastUpdatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("afterLastUpdatedAt")),
    beforeLastUpdatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ).pipe(T.HttpQuery("beforeLastUpdatedAt")),
    language: S.optional(RecommendationLanguage).pipe(T.HttpQuery("language")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/recommendations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecommendationsRequest",
}) as any as S.Schema<ListRecommendationsRequest>;
export interface RecommendationSummary {
  id: string;
  type: RecommendationType;
  checkArn?: string;
  status: RecommendationStatus;
  lifecycleStage?: RecommendationLifecycleStage;
  pillars: RecommendationPillar[];
  source: RecommendationSource;
  awsServices?: string[];
  name: string;
  resourcesAggregates: RecommendationResourcesAggregates;
  pillarSpecificAggregates?: RecommendationPillarSpecificAggregates;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  arn: string;
  statusReason?: StatusReason;
}
export const RecommendationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    type: RecommendationType,
    checkArn: S.optional(S.String),
    status: RecommendationStatus,
    lifecycleStage: S.optional(RecommendationLifecycleStage),
    pillars: RecommendationPillarList,
    source: RecommendationSource,
    awsServices: S.optional(RecommendationAwsServiceList),
    name: S.String,
    resourcesAggregates: RecommendationResourcesAggregates,
    pillarSpecificAggregates: S.optional(
      RecommendationPillarSpecificAggregates,
    ),
    createdAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    lastUpdatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    arn: S.String,
    statusReason: S.optional(StatusReason),
  }),
).annotate({
  identifier: "RecommendationSummary",
}) as any as S.Schema<RecommendationSummary>;
export type RecommendationSummaryList = RecommendationSummary[];
export const RecommendationSummaryList = /*@__PURE__*/ S.Array(
  RecommendationSummary,
);
export interface ListRecommendationsResponse {
  nextToken?: string;
  recommendationSummaries: RecommendationSummary[];
}
export const ListRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    recommendationSummaries: RecommendationSummaryList,
  }),
).annotate({
  identifier: "ListRecommendationsResponse",
}) as any as S.Schema<ListRecommendationsResponse>;
export type UpdateRecommendationLifecycleStage =
  | "pending_response"
  | "in_progress"
  | "dismissed"
  | "resolved"
  | (string & {});
export const UpdateRecommendationLifecycleStage = /*@__PURE__*/ S.String;

export interface UpdateOrganizationRecommendationLifecycleRequest {
  lifecycleStage: UpdateRecommendationLifecycleStage;
  updateReason?: string | redacted.Redacted<string>;
  updateReasonCode?: UpdateRecommendationLifecycleStageReasonCode;
  organizationRecommendationIdentifier: string;
}
export const UpdateOrganizationRecommendationLifecycleRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      lifecycleStage: UpdateRecommendationLifecycleStage,
      updateReason: S.optional(SensitiveString),
      updateReasonCode: S.optional(
        UpdateRecommendationLifecycleStageReasonCode,
      ),
      organizationRecommendationIdentifier: S.String.pipe(
        T.HttpLabel("organizationRecommendationIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/organization-recommendations/{organizationRecommendationIdentifier}/lifecycle",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateOrganizationRecommendationLifecycleRequest",
  }) as any as S.Schema<UpdateOrganizationRecommendationLifecycleRequest>;
export interface UpdateOrganizationRecommendationLifecycleResponse {}
export const UpdateOrganizationRecommendationLifecycleResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateOrganizationRecommendationLifecycleResponse",
  }) as any as S.Schema<UpdateOrganizationRecommendationLifecycleResponse>;
export interface UpdateRecommendationLifecycleRequest {
  lifecycleStage: UpdateRecommendationLifecycleStage;
  updateReason?: string | redacted.Redacted<string>;
  updateReasonCode?: UpdateRecommendationLifecycleStageReasonCode;
  recommendationIdentifier: string;
}
export const UpdateRecommendationLifecycleRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      lifecycleStage: UpdateRecommendationLifecycleStage,
      updateReason: S.optional(SensitiveString),
      updateReasonCode: S.optional(
        UpdateRecommendationLifecycleStageReasonCode,
      ),
      recommendationIdentifier: S.String.pipe(
        T.HttpLabel("recommendationIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/recommendations/{recommendationIdentifier}/lifecycle",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateRecommendationLifecycleRequest",
}) as any as S.Schema<UpdateRecommendationLifecycleRequest>;
export interface UpdateRecommendationLifecycleResponse {}
export const UpdateRecommendationLifecycleResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateRecommendationLifecycleResponse",
}) as any as S.Schema<UpdateRecommendationLifecycleResponse>;
export type BatchUpdateRecommendationResourceExclusionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update one or more exclusion statuses for a list of recommendation resources. This API supports up to 25 unique recommendation resource ARNs per request. This API currently doesn't support prioritized recommendation resources. This API updates global recommendations, eliminating the need to call the API in each AWS Region. After submitting an exclusion update, note that it might take a few minutes for the changes to be reflected in the system.
 */
export const batchUpdateRecommendationResourceExclusion: API.OperationMethod<
  BatchUpdateRecommendationResourceExclusionRequest,
  BatchUpdateRecommendationResourceExclusionResponse,
  BatchUpdateRecommendationResourceExclusionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateRecommendationResourceExclusionRequest,
  output: BatchUpdateRecommendationResourceExclusionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateRecommendationResourceExclusion",
}));

export type GetOrganizationRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a specific recommendation within an AWS Organizations organization. This API supports only prioritized recommendations and provides global priority recommendations, eliminating the need to call the API in each AWS Region.
 */
export const getOrganizationRecommendation: API.OperationMethod<
  GetOrganizationRecommendationRequest,
  GetOrganizationRecommendationResponse,
  GetOrganizationRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOrganizationRecommendationRequest,
  output: GetOrganizationRecommendationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOrganizationRecommendation",
}));

export type GetRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a specific Recommendation. This API provides global recommendations, eliminating the need to call the API in each AWS Region.
 */
export const getRecommendation: API.OperationMethod<
  GetRecommendationRequest,
  GetRecommendationResponse,
  GetRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRecommendationRequest,
  output: GetRecommendationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendation",
}));

export type ListChecksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List a filterable set of Checks. This API provides global recommendations, eliminating the need to call the API in each AWS Region.
 */
export const listChecks: API.PaginatedOperationMethod<
  ListChecksRequest,
  ListChecksResponse,
  ListChecksError,
  Credentials | HttpClient.HttpClient,
  CheckSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChecksRequest,
  output: ListChecksResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChecks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "checkSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOrganizationRecommendationAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the accounts that own the resources for an organization aggregate recommendation. This API only supports prioritized recommendations and provides global priority recommendations, eliminating the need to call the API in each AWS Region.
 */
export const listOrganizationRecommendationAccounts: API.PaginatedOperationMethod<
  ListOrganizationRecommendationAccountsRequest,
  ListOrganizationRecommendationAccountsResponse,
  ListOrganizationRecommendationAccountsError,
  Credentials | HttpClient.HttpClient,
  AccountRecommendationLifecycleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationRecommendationAccountsRequest,
  output: ListOrganizationRecommendationAccountsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationRecommendationAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accountRecommendationLifecycleSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOrganizationRecommendationResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List Resources of a Recommendation within an Organization. This API only supports prioritized recommendations and provides global priority recommendations, eliminating the need to call the API in each AWS Region.
 */
export const listOrganizationRecommendationResources: API.PaginatedOperationMethod<
  ListOrganizationRecommendationResourcesRequest,
  ListOrganizationRecommendationResourcesResponse,
  ListOrganizationRecommendationResourcesError,
  Credentials | HttpClient.HttpClient,
  OrganizationRecommendationResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationRecommendationResourcesRequest,
  output: ListOrganizationRecommendationResourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationRecommendationResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "organizationRecommendationResourceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListOrganizationRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List a filterable set of Recommendations within an Organization. This API only supports prioritized recommendations and provides global priority recommendations, eliminating the need to call the API in each AWS Region.
 */
export const listOrganizationRecommendations: API.PaginatedOperationMethod<
  ListOrganizationRecommendationsRequest,
  ListOrganizationRecommendationsResponse,
  ListOrganizationRecommendationsError,
  Credentials | HttpClient.HttpClient,
  OrganizationRecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOrganizationRecommendationsRequest,
  output: ListOrganizationRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOrganizationRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "organizationRecommendationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendationResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List Resources of a Recommendation. This API provides global recommendations, eliminating the need to call the API in each AWS Region.
 */
export const listRecommendationResources: API.PaginatedOperationMethod<
  ListRecommendationResourcesRequest,
  ListRecommendationResourcesResponse,
  ListRecommendationResourcesError,
  Credentials | HttpClient.HttpClient,
  RecommendationResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecommendationResourcesRequest,
  output: ListRecommendationResourcesResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendationResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationResourceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List a filterable set of Recommendations. This API provides global recommendations, eliminating the need to call the API in each AWS Region.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsRequest,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  RecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecommendationsRequest,
  output: ListRecommendationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type UpdateOrganizationRecommendationLifecycleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the lifecycle of a Recommendation within an Organization. This API only supports prioritized recommendations and updates global priority recommendations, eliminating the need to call the API in each AWS Region.
 */
export const updateOrganizationRecommendationLifecycle: API.OperationMethod<
  UpdateOrganizationRecommendationLifecycleRequest,
  UpdateOrganizationRecommendationLifecycleResponse,
  UpdateOrganizationRecommendationLifecycleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOrganizationRecommendationLifecycleRequest,
  output: UpdateOrganizationRecommendationLifecycleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOrganizationRecommendationLifecycle",
}));

export type UpdateRecommendationLifecycleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the lifecyle of a Recommendation. This API only supports prioritized recommendations and updates global priority recommendations, eliminating the need to call the API in each AWS Region.
 */
export const updateRecommendationLifecycle: API.OperationMethod<
  UpdateRecommendationLifecycleRequest,
  UpdateRecommendationLifecycleResponse,
  UpdateRecommendationLifecycleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRecommendationLifecycleRequest,
  output: UpdateRecommendationLifecycleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecommendationLifecycle",
}));
