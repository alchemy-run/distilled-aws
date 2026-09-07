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
  sdkId: "ConnectCampaigns",
  serviceShapeName: "AmazonConnectCampaignService",
});
const auth = T.AwsAuthSigv4({ name: "connect-campaigns" });
const ver = T.ServiceVersion("2021-01-30");
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
              `https://connect-campaigns-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://connect-campaigns-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://connect-campaigns.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://connect-campaigns.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      xAmzErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      xAmzErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      xAmzErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidCampaignStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidCampaignStateException>()(
    "InvalidCampaignStateException",
    {
      state: S.String,
      message: S.String.pipe(T.ErrorMessage()),
      xAmzErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InvalidStateException
  extends /*@__PURE__*/ S.TaggedError<InvalidStateException>()(
    "InvalidStateException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      xAmzErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      xAmzErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      xAmzErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      xAmzErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    T.all(T.HttpError(429), T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      xAmzErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type CampaignName = string;
export type InstanceId = string;
export type BandwidthAllocation = number;
export type DialingCapacity = number;
export interface ProgressiveDialerConfig {
  bandwidthAllocation: number;
  dialingCapacity?: number;
}
export const ProgressiveDialerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bandwidthAllocation: S.Number,
    dialingCapacity: S.optional(S.Number),
  }),
).annotate({
  identifier: "ProgressiveDialerConfig",
}) as any as S.Schema<ProgressiveDialerConfig>;
export interface PredictiveDialerConfig {
  bandwidthAllocation: number;
  dialingCapacity?: number;
}
export const PredictiveDialerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bandwidthAllocation: S.Number,
    dialingCapacity: S.optional(S.Number),
  }),
).annotate({
  identifier: "PredictiveDialerConfig",
}) as any as S.Schema<PredictiveDialerConfig>;
export interface AgentlessDialerConfig {
  dialingCapacity?: number;
}
export const AgentlessDialerConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dialingCapacity: S.optional(S.Number) }),
).annotate({
  identifier: "AgentlessDialerConfig",
}) as any as S.Schema<AgentlessDialerConfig>;
export type DialerConfig =
  | {
      progressiveDialerConfig: ProgressiveDialerConfig;
      predictiveDialerConfig?: never;
      agentlessDialerConfig?: never;
    }
  | {
      progressiveDialerConfig?: never;
      predictiveDialerConfig: PredictiveDialerConfig;
      agentlessDialerConfig?: never;
    }
  | {
      progressiveDialerConfig?: never;
      predictiveDialerConfig?: never;
      agentlessDialerConfig: AgentlessDialerConfig;
    };
export const DialerConfig = /*@__PURE__*/ S.Union([
  S.Struct({ progressiveDialerConfig: ProgressiveDialerConfig }),
  S.Struct({ predictiveDialerConfig: PredictiveDialerConfig }),
  S.Struct({ agentlessDialerConfig: AgentlessDialerConfig }),
]);
export type ContactFlowId = string;
export type SourcePhoneNumber = string;
export type QueueId = string;
export interface AnswerMachineDetectionConfig {
  enableAnswerMachineDetection: boolean;
  awaitAnswerMachinePrompt?: boolean;
}
export const AnswerMachineDetectionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enableAnswerMachineDetection: S.Boolean,
    awaitAnswerMachinePrompt: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AnswerMachineDetectionConfig",
}) as any as S.Schema<AnswerMachineDetectionConfig>;
export interface OutboundCallConfig {
  connectContactFlowId: string;
  connectSourcePhoneNumber?: string;
  connectQueueId?: string;
  answerMachineDetectionConfig?: AnswerMachineDetectionConfig;
}
export const OutboundCallConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectContactFlowId: S.String,
    connectSourcePhoneNumber: S.optional(S.String),
    connectQueueId: S.optional(S.String),
    answerMachineDetectionConfig: S.optional(AnswerMachineDetectionConfig),
  }),
).annotate({
  identifier: "OutboundCallConfig",
}) as any as S.Schema<OutboundCallConfig>;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateCampaignRequest {
  name: string;
  connectInstanceId: string;
  dialerConfig: DialerConfig;
  outboundCallConfig: OutboundCallConfig;
  tags?: { [key: string]: string | undefined };
}
export const CreateCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    connectInstanceId: S.String,
    dialerConfig: DialerConfig,
    outboundCallConfig: OutboundCallConfig,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/campaigns" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCampaignRequest",
}) as any as S.Schema<CreateCampaignRequest>;
export type CampaignId = string;
export type CampaignArn = string;
export interface CreateCampaignResponse {
  id?: string;
  arn?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.optional(S.String),
    arn: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateCampaignResponse",
}) as any as S.Schema<CreateCampaignResponse>;
export interface DeleteCampaignRequest {
  id: string;
}
export const DeleteCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/campaigns/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCampaignRequest",
}) as any as S.Schema<DeleteCampaignRequest>;
export interface DeleteCampaignResponse {}
export const DeleteCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCampaignResponse",
}) as any as S.Schema<DeleteCampaignResponse>;
export interface DeleteConnectInstanceConfigRequest {
  connectInstanceId: string;
}
export const DeleteConnectInstanceConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/connect-instance/{connectInstanceId}/config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConnectInstanceConfigRequest",
}) as any as S.Schema<DeleteConnectInstanceConfigRequest>;
export interface DeleteConnectInstanceConfigResponse {}
export const DeleteConnectInstanceConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConnectInstanceConfigResponse",
}) as any as S.Schema<DeleteConnectInstanceConfigResponse>;
export interface DeleteInstanceOnboardingJobRequest {
  connectInstanceId: string;
}
export const DeleteInstanceOnboardingJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/connect-instance/{connectInstanceId}/onboarding",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInstanceOnboardingJobRequest",
}) as any as S.Schema<DeleteInstanceOnboardingJobRequest>;
export interface DeleteInstanceOnboardingJobResponse {}
export const DeleteInstanceOnboardingJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteInstanceOnboardingJobResponse",
}) as any as S.Schema<DeleteInstanceOnboardingJobResponse>;
export interface DescribeCampaignRequest {
  id: string;
}
export const DescribeCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/campaigns/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeCampaignRequest",
}) as any as S.Schema<DescribeCampaignRequest>;
export interface Campaign {
  id: string;
  arn: string;
  name: string;
  connectInstanceId: string;
  dialerConfig: DialerConfig;
  outboundCallConfig: OutboundCallConfig;
  tags?: { [key: string]: string | undefined };
}
export const Campaign = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.String,
    connectInstanceId: S.String,
    dialerConfig: DialerConfig,
    outboundCallConfig: OutboundCallConfig,
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "Campaign" }) as any as S.Schema<Campaign>;
export interface DescribeCampaignResponse {
  campaign?: Campaign;
}
export const DescribeCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ campaign: S.optional(Campaign) }),
).annotate({
  identifier: "DescribeCampaignResponse",
}) as any as S.Schema<DescribeCampaignResponse>;
export interface GetCampaignStateRequest {
  id: string;
}
export const GetCampaignStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/campaigns/{id}/state" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCampaignStateRequest",
}) as any as S.Schema<GetCampaignStateRequest>;
export type CampaignState = string;
export interface GetCampaignStateResponse {
  state?: string;
}
export const GetCampaignStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ state: S.optional(S.String) }),
).annotate({
  identifier: "GetCampaignStateResponse",
}) as any as S.Schema<GetCampaignStateResponse>;
export type CampaignIdList = string[];
export const CampaignIdList = /*@__PURE__*/ S.Array(S.String);
export interface GetCampaignStateBatchRequest {
  campaignIds: string[];
}
export const GetCampaignStateBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ campaignIds: CampaignIdList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/campaigns-state" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCampaignStateBatchRequest",
}) as any as S.Schema<GetCampaignStateBatchRequest>;
export interface SuccessfulCampaignStateResponse {
  campaignId?: string;
  state?: string;
}
export const SuccessfulCampaignStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ campaignId: S.optional(S.String), state: S.optional(S.String) }),
).annotate({
  identifier: "SuccessfulCampaignStateResponse",
}) as any as S.Schema<SuccessfulCampaignStateResponse>;
export type SuccessfulCampaignStateResponseList =
  SuccessfulCampaignStateResponse[];
export const SuccessfulCampaignStateResponseList = /*@__PURE__*/ S.Array(
  SuccessfulCampaignStateResponse,
);
export type GetCampaignStateBatchFailureCode = string;
export interface FailedCampaignStateResponse {
  campaignId?: string;
  failureCode?: string;
}
export const FailedCampaignStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    campaignId: S.optional(S.String),
    failureCode: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedCampaignStateResponse",
}) as any as S.Schema<FailedCampaignStateResponse>;
export type FailedCampaignStateResponseList = FailedCampaignStateResponse[];
export const FailedCampaignStateResponseList = /*@__PURE__*/ S.Array(
  FailedCampaignStateResponse,
);
export interface GetCampaignStateBatchResponse {
  successfulRequests?: SuccessfulCampaignStateResponse[];
  failedRequests?: FailedCampaignStateResponse[];
}
export const GetCampaignStateBatchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successfulRequests: S.optional(SuccessfulCampaignStateResponseList),
    failedRequests: S.optional(FailedCampaignStateResponseList),
  }),
).annotate({
  identifier: "GetCampaignStateBatchResponse",
}) as any as S.Schema<GetCampaignStateBatchResponse>;
export interface GetConnectInstanceConfigRequest {
  connectInstanceId: string;
}
export const GetConnectInstanceConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/connect-instance/{connectInstanceId}/config",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConnectInstanceConfigRequest",
}) as any as S.Schema<GetConnectInstanceConfigRequest>;
export type ServiceLinkedRoleArn = string;
export type Enabled = boolean;
export type EncryptionType = string;
export type EncryptionKey = string;
export interface EncryptionConfig {
  enabled: boolean;
  encryptionType?: string;
  keyArn?: string;
}
export const EncryptionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    encryptionType: S.optional(S.String),
    keyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EncryptionConfig",
}) as any as S.Schema<EncryptionConfig>;
export interface InstanceConfig {
  connectInstanceId: string;
  serviceLinkedRoleArn: string;
  encryptionConfig: EncryptionConfig;
}
export const InstanceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectInstanceId: S.String,
    serviceLinkedRoleArn: S.String,
    encryptionConfig: EncryptionConfig,
  }),
).annotate({ identifier: "InstanceConfig" }) as any as S.Schema<InstanceConfig>;
export interface GetConnectInstanceConfigResponse {
  connectInstanceConfig?: InstanceConfig;
}
export const GetConnectInstanceConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ connectInstanceConfig: S.optional(InstanceConfig) }),
).annotate({
  identifier: "GetConnectInstanceConfigResponse",
}) as any as S.Schema<GetConnectInstanceConfigResponse>;
export interface GetInstanceOnboardingJobStatusRequest {
  connectInstanceId: string;
}
export const GetInstanceOnboardingJobStatusRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/connect-instance/{connectInstanceId}/onboarding",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetInstanceOnboardingJobStatusRequest",
}) as any as S.Schema<GetInstanceOnboardingJobStatusRequest>;
export type InstanceOnboardingJobStatusCode = string;
export type InstanceOnboardingJobFailureCode = string;
export interface InstanceOnboardingJobStatus {
  connectInstanceId: string;
  status: string;
  failureCode?: string;
}
export const InstanceOnboardingJobStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectInstanceId: S.String,
    status: S.String,
    failureCode: S.optional(S.String),
  }),
).annotate({
  identifier: "InstanceOnboardingJobStatus",
}) as any as S.Schema<InstanceOnboardingJobStatus>;
export interface GetInstanceOnboardingJobStatusResponse {
  connectInstanceOnboardingJobStatus?: InstanceOnboardingJobStatus;
}
export const GetInstanceOnboardingJobStatusResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      connectInstanceOnboardingJobStatus: S.optional(
        InstanceOnboardingJobStatus,
      ),
    }),
).annotate({
  identifier: "GetInstanceOnboardingJobStatusResponse",
}) as any as S.Schema<GetInstanceOnboardingJobStatusResponse>;
export type MaxResults = number;
export type NextToken = string;
export type InstanceIdFilterOperator = string;
export interface InstanceIdFilter {
  value: string;
  operator: string;
}
export const InstanceIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.String, operator: S.String }),
).annotate({
  identifier: "InstanceIdFilter",
}) as any as S.Schema<InstanceIdFilter>;
export interface CampaignFilters {
  instanceIdFilter?: InstanceIdFilter;
}
export const CampaignFilters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ instanceIdFilter: S.optional(InstanceIdFilter) }),
).annotate({
  identifier: "CampaignFilters",
}) as any as S.Schema<CampaignFilters>;
export interface ListCampaignsRequest {
  maxResults?: number;
  nextToken?: string;
  filters?: CampaignFilters;
}
export const ListCampaignsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    filters: S.optional(CampaignFilters),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/campaigns-summary" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCampaignsRequest",
}) as any as S.Schema<ListCampaignsRequest>;
export interface CampaignSummary {
  id: string;
  arn: string;
  name: string;
  connectInstanceId: string;
}
export const CampaignSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.String,
    connectInstanceId: S.String,
  }),
).annotate({
  identifier: "CampaignSummary",
}) as any as S.Schema<CampaignSummary>;
export type CampaignSummaryList = CampaignSummary[];
export const CampaignSummaryList = /*@__PURE__*/ S.Array(CampaignSummary);
export interface ListCampaignsResponse {
  nextToken?: string;
  campaignSummaryList?: CampaignSummary[];
}
export const ListCampaignsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    campaignSummaryList: S.optional(CampaignSummaryList),
  }),
).annotate({
  identifier: "ListCampaignsResponse",
}) as any as S.Schema<ListCampaignsResponse>;
export type Arn = string;
export interface ListTagsForResourceRequest {
  arn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{arn}" }),
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
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PauseCampaignRequest {
  id: string;
}
export const PauseCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/campaigns/{id}/pause" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PauseCampaignRequest",
}) as any as S.Schema<PauseCampaignRequest>;
export interface PauseCampaignResponse {}
export const PauseCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PauseCampaignResponse",
}) as any as S.Schema<PauseCampaignResponse>;
export type ClientToken = string;
export type DestinationPhoneNumber = string | redacted.Redacted<string>;
export type AttributeName = string;
export type AttributeValue = string;
export type Attributes = { [key: string]: string | undefined };
export const Attributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DialRequest {
  clientToken: string;
  phoneNumber: string | redacted.Redacted<string>;
  expirationTime: Date;
  attributes: { [key: string]: string | undefined };
}
export const DialRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.String,
    phoneNumber: SensitiveString,
    expirationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    attributes: Attributes,
  }),
).annotate({ identifier: "DialRequest" }) as any as S.Schema<DialRequest>;
export type DialRequestList = DialRequest[];
export const DialRequestList = /*@__PURE__*/ S.Array(DialRequest);
export interface PutDialRequestBatchRequest {
  id: string;
  dialRequests: DialRequest[];
}
export const PutDialRequestBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    dialRequests: DialRequestList,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/campaigns/{id}/dial-requests" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutDialRequestBatchRequest",
}) as any as S.Schema<PutDialRequestBatchRequest>;
export type DialRequestId = string;
export interface SuccessfulRequest {
  clientToken?: string;
  id?: string;
}
export const SuccessfulRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clientToken: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "SuccessfulRequest",
}) as any as S.Schema<SuccessfulRequest>;
export type SuccessfulRequestList = SuccessfulRequest[];
export const SuccessfulRequestList = /*@__PURE__*/ S.Array(SuccessfulRequest);
export type FailureCode = string;
export interface FailedRequest {
  clientToken?: string;
  id?: string;
  failureCode?: string;
}
export const FailedRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String),
    id: S.optional(S.String),
    failureCode: S.optional(S.String),
  }),
).annotate({ identifier: "FailedRequest" }) as any as S.Schema<FailedRequest>;
export type FailedRequestList = FailedRequest[];
export const FailedRequestList = /*@__PURE__*/ S.Array(FailedRequest);
export interface PutDialRequestBatchResponse {
  successfulRequests?: SuccessfulRequest[];
  failedRequests?: FailedRequest[];
}
export const PutDialRequestBatchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successfulRequests: S.optional(SuccessfulRequestList),
    failedRequests: S.optional(FailedRequestList),
  }),
).annotate({
  identifier: "PutDialRequestBatchResponse",
}) as any as S.Schema<PutDialRequestBatchResponse>;
export interface ResumeCampaignRequest {
  id: string;
}
export const ResumeCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/campaigns/{id}/resume" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResumeCampaignRequest",
}) as any as S.Schema<ResumeCampaignRequest>;
export interface ResumeCampaignResponse {}
export const ResumeCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ResumeCampaignResponse",
}) as any as S.Schema<ResumeCampaignResponse>;
export interface StartCampaignRequest {
  id: string;
}
export const StartCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/campaigns/{id}/start" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCampaignRequest",
}) as any as S.Schema<StartCampaignRequest>;
export interface StartCampaignResponse {}
export const StartCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartCampaignResponse",
}) as any as S.Schema<StartCampaignResponse>;
export interface StartInstanceOnboardingJobRequest {
  connectInstanceId: string;
  encryptionConfig: EncryptionConfig;
}
export const StartInstanceOnboardingJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
    encryptionConfig: EncryptionConfig,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/connect-instance/{connectInstanceId}/onboarding",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartInstanceOnboardingJobRequest",
}) as any as S.Schema<StartInstanceOnboardingJobRequest>;
export interface StartInstanceOnboardingJobResponse {
  connectInstanceOnboardingJobStatus?: InstanceOnboardingJobStatus;
}
export const StartInstanceOnboardingJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectInstanceOnboardingJobStatus: S.optional(InstanceOnboardingJobStatus),
  }),
).annotate({
  identifier: "StartInstanceOnboardingJobResponse",
}) as any as S.Schema<StartInstanceOnboardingJobResponse>;
export interface StopCampaignRequest {
  id: string;
}
export const StopCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/campaigns/{id}/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopCampaignRequest",
}) as any as S.Schema<StopCampaignRequest>;
export interface StopCampaignResponse {}
export const StopCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopCampaignResponse",
}) as any as S.Schema<StopCampaignResponse>;
export interface TagResourceRequest {
  arn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")), tags: TagMap }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{arn}" }),
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
  arn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{arn}" }),
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
export interface UpdateCampaignDialerConfigRequest {
  id: string;
  dialerConfig: DialerConfig;
}
export const UpdateCampaignDialerConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    dialerConfig: DialerConfig,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/campaigns/{id}/dialer-config" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCampaignDialerConfigRequest",
}) as any as S.Schema<UpdateCampaignDialerConfigRequest>;
export interface UpdateCampaignDialerConfigResponse {}
export const UpdateCampaignDialerConfigResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCampaignDialerConfigResponse",
}) as any as S.Schema<UpdateCampaignDialerConfigResponse>;
export interface UpdateCampaignNameRequest {
  id: string;
  name: string;
}
export const UpdateCampaignNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")), name: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/campaigns/{id}/name" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCampaignNameRequest",
}) as any as S.Schema<UpdateCampaignNameRequest>;
export interface UpdateCampaignNameResponse {}
export const UpdateCampaignNameResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCampaignNameResponse",
}) as any as S.Schema<UpdateCampaignNameResponse>;
export interface UpdateCampaignOutboundCallConfigRequest {
  id: string;
  connectContactFlowId?: string;
  connectSourcePhoneNumber?: string;
  answerMachineDetectionConfig?: AnswerMachineDetectionConfig;
}
export const UpdateCampaignOutboundCallConfigRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String.pipe(T.HttpLabel("id")),
      connectContactFlowId: S.optional(S.String),
      connectSourcePhoneNumber: S.optional(S.String),
      answerMachineDetectionConfig: S.optional(AnswerMachineDetectionConfig),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/campaigns/{id}/outbound-call-config" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateCampaignOutboundCallConfigRequest",
}) as any as S.Schema<UpdateCampaignOutboundCallConfigRequest>;
export interface UpdateCampaignOutboundCallConfigResponse {}
export const UpdateCampaignOutboundCallConfigResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateCampaignOutboundCallConfigResponse",
}) as any as S.Schema<UpdateCampaignOutboundCallConfigResponse>;
export type XAmazonErrorType = string;
export type CreateCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a campaign for the specified Amazon Connect account. This API is idempotent.
 */
export const createCampaign: API.OperationMethod<
  CreateCampaignRequest,
  CreateCampaignResponse,
  CreateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCampaignRequest,
  output: CreateCampaignResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCampaign",
}));

export type DeleteCampaignError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a campaign from the specified Amazon Connect account.
 */
export const deleteCampaign: API.OperationMethod<
  DeleteCampaignRequest,
  DeleteCampaignResponse,
  DeleteCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCampaignRequest,
  output: DeleteCampaignResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
}));

export type DeleteConnectInstanceConfigError =
  | AccessDeniedException
  | InternalServerException
  | InvalidStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a connect instance config from the specified AWS account.
 */
export const deleteConnectInstanceConfig: API.OperationMethod<
  DeleteConnectInstanceConfigRequest,
  DeleteConnectInstanceConfigResponse,
  DeleteConnectInstanceConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectInstanceConfigRequest,
  output: DeleteConnectInstanceConfigResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectInstanceConfig",
}));

export type DeleteInstanceOnboardingJobError =
  | AccessDeniedException
  | InternalServerException
  | InvalidStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Delete the Connect Campaigns onboarding job for the specified Amazon Connect instance.
 */
export const deleteInstanceOnboardingJob: API.OperationMethod<
  DeleteInstanceOnboardingJobRequest,
  DeleteInstanceOnboardingJobResponse,
  DeleteInstanceOnboardingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInstanceOnboardingJobRequest,
  output: DeleteInstanceOnboardingJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    InvalidStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInstanceOnboardingJob",
}));

export type DescribeCampaignError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specific campaign.
 */
export const describeCampaign: API.OperationMethod<
  DescribeCampaignRequest,
  DescribeCampaignResponse,
  DescribeCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCampaignRequest,
  output: DescribeCampaignResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCampaign",
}));

export type GetCampaignStateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get state of a campaign for the specified Amazon Connect account.
 */
export const getCampaignState: API.OperationMethod<
  GetCampaignStateRequest,
  GetCampaignStateResponse,
  GetCampaignStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCampaignStateRequest,
  output: GetCampaignStateResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignState",
}));

export type GetCampaignStateBatchError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get state of campaigns for the specified Amazon Connect account.
 */
export const getCampaignStateBatch: API.OperationMethod<
  GetCampaignStateBatchRequest,
  GetCampaignStateBatchResponse,
  GetCampaignStateBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCampaignStateBatchRequest,
  output: GetCampaignStateBatchResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignStateBatch",
}));

export type GetConnectInstanceConfigError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get the specific Connect instance config.
 */
export const getConnectInstanceConfig: API.OperationMethod<
  GetConnectInstanceConfigRequest,
  GetConnectInstanceConfigResponse,
  GetConnectInstanceConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConnectInstanceConfigRequest,
  output: GetConnectInstanceConfigResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConnectInstanceConfig",
}));

export type GetInstanceOnboardingJobStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get the specific instance onboarding job status.
 */
export const getInstanceOnboardingJobStatus: API.OperationMethod<
  GetInstanceOnboardingJobStatusRequest,
  GetInstanceOnboardingJobStatusResponse,
  GetInstanceOnboardingJobStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstanceOnboardingJobStatusRequest,
  output: GetInstanceOnboardingJobStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceOnboardingJobStatus",
}));

export type ListCampaignsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Provides summary information about the campaigns under the specified Amazon Connect account.
 */
export const listCampaigns: API.PaginatedOperationMethod<
  ListCampaignsRequest,
  ListCampaignsResponse,
  ListCampaignsError,
  Credentials | HttpClient.HttpClient,
  CampaignSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCampaignsRequest,
  output: ListCampaignsResponse,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCampaigns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "campaignSummaryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List tags for a resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PauseCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Pauses a campaign for the specified Amazon Connect account.
 */
export const pauseCampaign: API.OperationMethod<
  PauseCampaignRequest,
  PauseCampaignResponse,
  PauseCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PauseCampaignRequest,
  output: PauseCampaignResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PauseCampaign",
}));

export type PutDialRequestBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates dials requests for the specified campaign Amazon Connect account. This API is idempotent.
 */
export const putDialRequestBatch: API.OperationMethod<
  PutDialRequestBatchRequest,
  PutDialRequestBatchResponse,
  PutDialRequestBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDialRequestBatchRequest,
  output: PutDialRequestBatchResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDialRequestBatch",
}));

export type ResumeCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a campaign for the specified Amazon Connect account.
 */
export const resumeCampaign: API.OperationMethod<
  ResumeCampaignRequest,
  ResumeCampaignResponse,
  ResumeCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResumeCampaignRequest,
  output: ResumeCampaignResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ResumeCampaign",
}));

export type StartCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a campaign for the specified Amazon Connect account.
 */
export const startCampaign: API.OperationMethod<
  StartCampaignRequest,
  StartCampaignResponse,
  StartCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCampaignRequest,
  output: StartCampaignResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCampaign",
}));

export type StartInstanceOnboardingJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Onboard the specific Amazon Connect instance to Connect Campaigns.
 */
export const startInstanceOnboardingJob: API.OperationMethod<
  StartInstanceOnboardingJobRequest,
  StartInstanceOnboardingJobResponse,
  StartInstanceOnboardingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartInstanceOnboardingJobRequest,
  output: StartInstanceOnboardingJobResponse,
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
  operationName: "StartInstanceOnboardingJob",
}));

export type StopCampaignError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a campaign for the specified Amazon Connect account.
 */
export const stopCampaign: API.OperationMethod<
  StopCampaignRequest,
  StopCampaignResponse,
  StopCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopCampaignRequest,
  output: StopCampaignResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopCampaign",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tag a resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Untag a resource.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateCampaignDialerConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the dialer config of a campaign. This API is idempotent.
 */
export const updateCampaignDialerConfig: API.OperationMethod<
  UpdateCampaignDialerConfigRequest,
  UpdateCampaignDialerConfigResponse,
  UpdateCampaignDialerConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignDialerConfigRequest,
  output: UpdateCampaignDialerConfigResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignDialerConfig",
}));

export type UpdateCampaignNameError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the name of a campaign. This API is idempotent.
 */
export const updateCampaignName: API.OperationMethod<
  UpdateCampaignNameRequest,
  UpdateCampaignNameResponse,
  UpdateCampaignNameError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignNameRequest,
  output: UpdateCampaignNameResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignName",
}));

export type UpdateCampaignOutboundCallConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the outbound call config of a campaign. This API is idempotent.
 */
export const updateCampaignOutboundCallConfig: API.OperationMethod<
  UpdateCampaignOutboundCallConfigRequest,
  UpdateCampaignOutboundCallConfigResponse,
  UpdateCampaignOutboundCallConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignOutboundCallConfigRequest,
  output: UpdateCampaignOutboundCallConfigResponse,
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
  operationName: "UpdateCampaignOutboundCallConfig",
}));
