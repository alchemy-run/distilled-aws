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
  sdkId: "ConnectCampaignsV2",
  serviceShapeName: "AmazonConnectCampaignServiceV2",
});
const auth = T.AwsAuthSigv4({ name: "connect-campaigns" });
const ver = T.ServiceVersion("2024-04-23");
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
export type Capacity = number;
export type QueueId = string;
export type BandwidthAllocation = number;
export interface ProgressiveConfig {
  bandwidthAllocation: number;
}
export const ProgressiveConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bandwidthAllocation: S.Number }),
).annotate({
  identifier: "ProgressiveConfig",
}) as any as S.Schema<ProgressiveConfig>;
export interface PredictiveConfig {
  bandwidthAllocation: number;
}
export const PredictiveConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bandwidthAllocation: S.Number }),
).annotate({
  identifier: "PredictiveConfig",
}) as any as S.Schema<PredictiveConfig>;
export interface AgentlessConfig {}
export const AgentlessConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AgentlessConfig",
}) as any as S.Schema<AgentlessConfig>;
export type TimeoutDuration = number;
export interface TimeoutConfig {
  durationInSeconds: number;
}
export const TimeoutConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ durationInSeconds: S.Number }),
).annotate({ identifier: "TimeoutConfig" }) as any as S.Schema<TimeoutConfig>;
export type AgentAction = string;
export type AgentActions = string[];
export const AgentActions = /*@__PURE__*/ S.Array(S.String);
export interface PreviewConfig {
  bandwidthAllocation: number;
  timeoutConfig: TimeoutConfig;
  agentActions?: string[];
}
export const PreviewConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bandwidthAllocation: S.Number,
    timeoutConfig: TimeoutConfig,
    agentActions: S.optional(AgentActions),
  }),
).annotate({ identifier: "PreviewConfig" }) as any as S.Schema<PreviewConfig>;
export type TelephonyOutboundMode =
  | {
      progressive: ProgressiveConfig;
      predictive?: never;
      agentless?: never;
      preview?: never;
    }
  | {
      progressive?: never;
      predictive: PredictiveConfig;
      agentless?: never;
      preview?: never;
    }
  | {
      progressive?: never;
      predictive?: never;
      agentless: AgentlessConfig;
      preview?: never;
    }
  | {
      progressive?: never;
      predictive?: never;
      agentless?: never;
      preview: PreviewConfig;
    };
export const TelephonyOutboundMode = /*@__PURE__*/ S.Union([
  S.Struct({ progressive: ProgressiveConfig }),
  S.Struct({ predictive: PredictiveConfig }),
  S.Struct({ agentless: AgentlessConfig }),
  S.Struct({ preview: PreviewConfig }),
]);
export type ContactFlowId = string;
export type SourcePhoneNumber = string;
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
export type RingTimeout = number;
export interface TelephonyOutboundConfig {
  connectContactFlowId: string;
  connectSourcePhoneNumber?: string;
  answerMachineDetectionConfig?: AnswerMachineDetectionConfig;
  ringTimeout?: number;
}
export const TelephonyOutboundConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectContactFlowId: S.String,
    connectSourcePhoneNumber: S.optional(S.String),
    answerMachineDetectionConfig: S.optional(AnswerMachineDetectionConfig),
    ringTimeout: S.optional(S.Number),
  }),
).annotate({
  identifier: "TelephonyOutboundConfig",
}) as any as S.Schema<TelephonyOutboundConfig>;
export interface TelephonyChannelSubtypeConfig {
  capacity?: number;
  connectQueueId?: string;
  outboundMode: TelephonyOutboundMode;
  defaultOutboundConfig: TelephonyOutboundConfig;
}
export const TelephonyChannelSubtypeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacity: S.optional(S.Number),
    connectQueueId: S.optional(S.String),
    outboundMode: TelephonyOutboundMode,
    defaultOutboundConfig: TelephonyOutboundConfig,
  }),
).annotate({
  identifier: "TelephonyChannelSubtypeConfig",
}) as any as S.Schema<TelephonyChannelSubtypeConfig>;
export type SmsOutboundMode = { agentless: AgentlessConfig };
export const SmsOutboundMode = /*@__PURE__*/ S.Union([
  S.Struct({ agentless: AgentlessConfig }),
]);
export type Arn = string;
export interface SmsOutboundConfig {
  connectSourcePhoneNumberArn: string;
  wisdomTemplateArn: string;
}
export const SmsOutboundConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectSourcePhoneNumberArn: S.String,
    wisdomTemplateArn: S.String,
  }),
).annotate({
  identifier: "SmsOutboundConfig",
}) as any as S.Schema<SmsOutboundConfig>;
export interface SmsChannelSubtypeConfig {
  capacity?: number;
  outboundMode: SmsOutboundMode;
  defaultOutboundConfig: SmsOutboundConfig;
}
export const SmsChannelSubtypeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacity: S.optional(S.Number),
    outboundMode: SmsOutboundMode,
    defaultOutboundConfig: SmsOutboundConfig,
  }),
).annotate({
  identifier: "SmsChannelSubtypeConfig",
}) as any as S.Schema<SmsChannelSubtypeConfig>;
export type EmailOutboundMode = { agentless: AgentlessConfig };
export const EmailOutboundMode = /*@__PURE__*/ S.Union([
  S.Struct({ agentless: AgentlessConfig }),
]);
export type EmailAddress = string | redacted.Redacted<string>;
export type EmailDisplayName = string | redacted.Redacted<string>;
export interface EmailOutboundConfig {
  connectSourceEmailAddress: string | redacted.Redacted<string>;
  sourceEmailAddressDisplayName?: string | redacted.Redacted<string>;
  wisdomTemplateArn: string;
}
export const EmailOutboundConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectSourceEmailAddress: SensitiveString,
    sourceEmailAddressDisplayName: S.optional(SensitiveString),
    wisdomTemplateArn: S.String,
  }),
).annotate({
  identifier: "EmailOutboundConfig",
}) as any as S.Schema<EmailOutboundConfig>;
export interface EmailChannelSubtypeConfig {
  capacity?: number;
  outboundMode: EmailOutboundMode;
  defaultOutboundConfig: EmailOutboundConfig;
}
export const EmailChannelSubtypeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacity: S.optional(S.Number),
    outboundMode: EmailOutboundMode,
    defaultOutboundConfig: EmailOutboundConfig,
  }),
).annotate({
  identifier: "EmailChannelSubtypeConfig",
}) as any as S.Schema<EmailChannelSubtypeConfig>;
export type WhatsAppOutboundMode = { agentless: AgentlessConfig };
export const WhatsAppOutboundMode = /*@__PURE__*/ S.Union([
  S.Struct({ agentless: AgentlessConfig }),
]);
export interface WhatsAppOutboundConfig {
  connectSourcePhoneNumberArn: string;
  wisdomTemplateArn: string;
}
export const WhatsAppOutboundConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectSourcePhoneNumberArn: S.String,
    wisdomTemplateArn: S.String,
  }),
).annotate({
  identifier: "WhatsAppOutboundConfig",
}) as any as S.Schema<WhatsAppOutboundConfig>;
export interface WhatsAppChannelSubtypeConfig {
  capacity?: number;
  outboundMode: WhatsAppOutboundMode;
  defaultOutboundConfig: WhatsAppOutboundConfig;
}
export const WhatsAppChannelSubtypeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capacity: S.optional(S.Number),
    outboundMode: WhatsAppOutboundMode,
    defaultOutboundConfig: WhatsAppOutboundConfig,
  }),
).annotate({
  identifier: "WhatsAppChannelSubtypeConfig",
}) as any as S.Schema<WhatsAppChannelSubtypeConfig>;
export interface ChannelSubtypeConfig {
  telephony?: TelephonyChannelSubtypeConfig;
  sms?: SmsChannelSubtypeConfig;
  email?: EmailChannelSubtypeConfig;
  whatsApp?: WhatsAppChannelSubtypeConfig;
}
export const ChannelSubtypeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    telephony: S.optional(TelephonyChannelSubtypeConfig),
    sms: S.optional(SmsChannelSubtypeConfig),
    email: S.optional(EmailChannelSubtypeConfig),
    whatsApp: S.optional(WhatsAppChannelSubtypeConfig),
  }),
).annotate({
  identifier: "ChannelSubtypeConfig",
}) as any as S.Schema<ChannelSubtypeConfig>;
export type ExternalCampaignType = string;
export interface EventTrigger {
  customerProfilesDomainArn?: string;
}
export const EventTrigger = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ customerProfilesDomainArn: S.optional(S.String) }),
).annotate({ identifier: "EventTrigger" }) as any as S.Schema<EventTrigger>;
export type Source =
  | { customerProfilesSegmentArn: string; eventTrigger?: never }
  | { customerProfilesSegmentArn?: never; eventTrigger: EventTrigger };
export const Source = /*@__PURE__*/ S.Union([
  S.Struct({ customerProfilesSegmentArn: S.String }),
  S.Struct({ eventTrigger: EventTrigger }),
]);
export type Iso8601Duration = string;
export interface Schedule {
  startTime: Date;
  endTime: Date;
  refreshFrequency?: string;
}
export const Schedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    refreshFrequency: S.optional(S.String),
  }),
).annotate({ identifier: "Schedule" }) as any as S.Schema<Schedule>;
export interface EntryLimitsConfig {
  maxEntryCount: number;
  minEntryInterval: string;
}
export const EntryLimitsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maxEntryCount: S.Number, minEntryInterval: S.String }),
).annotate({
  identifier: "EntryLimitsConfig",
}) as any as S.Schema<EntryLimitsConfig>;
export type TimeZone = string;
export type LocalTimeZoneDetectionType = string;
export type LocalTimeZoneDetection = string[];
export const LocalTimeZoneDetection = /*@__PURE__*/ S.Array(S.String);
export type LocalTimeZoneDetectionScope = string;
export interface LocalTimeZoneConfig {
  defaultTimeZone?: string;
  localTimeZoneDetection?: string[];
  localTimeZoneDetectionScope?: string;
}
export const LocalTimeZoneConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    defaultTimeZone: S.optional(S.String),
    localTimeZoneDetection: S.optional(LocalTimeZoneDetection),
    localTimeZoneDetectionScope: S.optional(S.String),
  }),
).annotate({
  identifier: "LocalTimeZoneConfig",
}) as any as S.Schema<LocalTimeZoneConfig>;
export type DayOfWeek = string;
export type Iso8601Time = string;
export interface TimeRange {
  startTime: string;
  endTime: string;
}
export const TimeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ startTime: S.String, endTime: S.String }),
).annotate({ identifier: "TimeRange" }) as any as S.Schema<TimeRange>;
export type TimeRangeList = TimeRange[];
export const TimeRangeList = /*@__PURE__*/ S.Array(TimeRange);
export type DailyHours = { [key: string]: TimeRange[] | undefined };
export const DailyHours = /*@__PURE__*/ S.Record(
  S.String,
  TimeRangeList.pipe(S.optional),
);
export type OpenHours = {
  dailyHours: { [key: string]: TimeRange[] | undefined };
};
export const OpenHours = /*@__PURE__*/ S.Union([
  S.Struct({ dailyHours: DailyHours }),
]);
export type RestrictedPeriodName = string;
export type Iso8601Date = string;
export interface RestrictedPeriod {
  name?: string;
  startDate: string;
  endDate: string;
}
export const RestrictedPeriod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    startDate: S.String,
    endDate: S.String,
  }),
).annotate({
  identifier: "RestrictedPeriod",
}) as any as S.Schema<RestrictedPeriod>;
export type RestrictedPeriodList = RestrictedPeriod[];
export const RestrictedPeriodList = /*@__PURE__*/ S.Array(RestrictedPeriod);
export type RestrictedPeriods = { restrictedPeriodList: RestrictedPeriod[] };
export const RestrictedPeriods = /*@__PURE__*/ S.Union([
  S.Struct({ restrictedPeriodList: RestrictedPeriodList }),
]);
export interface TimeWindow {
  openHours: OpenHours;
  restrictedPeriods?: RestrictedPeriods;
}
export const TimeWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    openHours: OpenHours,
    restrictedPeriods: S.optional(RestrictedPeriods),
  }),
).annotate({ identifier: "TimeWindow" }) as any as S.Schema<TimeWindow>;
export interface CommunicationTimeConfig {
  localTimeZoneConfig: LocalTimeZoneConfig;
  telephony?: TimeWindow;
  sms?: TimeWindow;
  email?: TimeWindow;
  whatsApp?: TimeWindow;
}
export const CommunicationTimeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    localTimeZoneConfig: LocalTimeZoneConfig,
    telephony: S.optional(TimeWindow),
    sms: S.optional(TimeWindow),
    email: S.optional(TimeWindow),
    whatsApp: S.optional(TimeWindow),
  }),
).annotate({
  identifier: "CommunicationTimeConfig",
}) as any as S.Schema<CommunicationTimeConfig>;
export type CommunicationLimitTimeUnit = string;
export interface CommunicationLimit {
  maxCountPerRecipient: number;
  frequency: number;
  unit: string;
}
export const CommunicationLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxCountPerRecipient: S.Number,
    frequency: S.Number,
    unit: S.String,
  }),
).annotate({
  identifier: "CommunicationLimit",
}) as any as S.Schema<CommunicationLimit>;
export type CommunicationLimitList = CommunicationLimit[];
export const CommunicationLimitList = /*@__PURE__*/ S.Array(CommunicationLimit);
export type CommunicationLimits = {
  communicationLimitsList: CommunicationLimit[];
};
export const CommunicationLimits = /*@__PURE__*/ S.Union([
  S.Struct({ communicationLimitsList: CommunicationLimitList }),
]);
export type InstanceLimitsHandling = string;
export interface CommunicationLimitsConfig {
  allChannelSubtypes?: CommunicationLimits;
  instanceLimitsHandling?: string;
}
export const CommunicationLimitsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allChannelSubtypes: S.optional(CommunicationLimits),
    instanceLimitsHandling: S.optional(S.String),
  }),
).annotate({
  identifier: "CommunicationLimitsConfig",
}) as any as S.Schema<CommunicationLimitsConfig>;
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
  channelSubtypeConfig?: ChannelSubtypeConfig;
  type?: string;
  source?: Source;
  connectCampaignFlowArn?: string;
  schedule?: Schedule;
  entryLimitsConfig?: EntryLimitsConfig;
  communicationTimeConfig?: CommunicationTimeConfig;
  communicationLimitsOverride?: CommunicationLimitsConfig;
  tags?: { [key: string]: string | undefined };
}
export const CreateCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    connectInstanceId: S.String,
    channelSubtypeConfig: S.optional(ChannelSubtypeConfig),
    type: S.optional(S.String),
    source: S.optional(Source),
    connectCampaignFlowArn: S.optional(S.String),
    schedule: S.optional(Schedule),
    entryLimitsConfig: S.optional(EntryLimitsConfig),
    communicationTimeConfig: S.optional(CommunicationTimeConfig),
    communicationLimitsOverride: S.optional(CommunicationLimitsConfig),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v2/campaigns" }),
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
      T.Http({ method: "DELETE", uri: "/v2/campaigns/{id}" }),
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
export type ChannelSubtype = string;
export interface DeleteCampaignChannelSubtypeConfigRequest {
  id: string;
  channelSubtype: string;
}
export const DeleteCampaignChannelSubtypeConfigRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      id: S.String.pipe(T.HttpLabel("id")),
      channelSubtype: S.String.pipe(T.HttpQuery("channelSubtype")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/v2/campaigns/{id}/channel-subtype-config",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteCampaignChannelSubtypeConfigRequest",
  }) as any as S.Schema<DeleteCampaignChannelSubtypeConfigRequest>;
export interface DeleteCampaignChannelSubtypeConfigResponse {}
export const DeleteCampaignChannelSubtypeConfigResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteCampaignChannelSubtypeConfigResponse",
  }) as any as S.Schema<DeleteCampaignChannelSubtypeConfigResponse>;
export type CommunicationLimitsConfigType = string;
export interface DeleteCampaignCommunicationLimitsRequest {
  id: string;
  config: string;
}
export const DeleteCampaignCommunicationLimitsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String.pipe(T.HttpLabel("id")),
      config: S.String.pipe(T.HttpQuery("config")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/v2/campaigns/{id}/communication-limits",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteCampaignCommunicationLimitsRequest",
}) as any as S.Schema<DeleteCampaignCommunicationLimitsRequest>;
export interface DeleteCampaignCommunicationLimitsResponse {}
export const DeleteCampaignCommunicationLimitsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteCampaignCommunicationLimitsResponse",
  }) as any as S.Schema<DeleteCampaignCommunicationLimitsResponse>;
export type CommunicationTimeConfigType = string;
export interface DeleteCampaignCommunicationTimeRequest {
  id: string;
  config: string;
}
export const DeleteCampaignCommunicationTimeRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String.pipe(T.HttpLabel("id")),
      config: S.String.pipe(T.HttpQuery("config")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/v2/campaigns/{id}/communication-time",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteCampaignCommunicationTimeRequest",
}) as any as S.Schema<DeleteCampaignCommunicationTimeRequest>;
export interface DeleteCampaignCommunicationTimeResponse {}
export const DeleteCampaignCommunicationTimeResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteCampaignCommunicationTimeResponse",
}) as any as S.Schema<DeleteCampaignCommunicationTimeResponse>;
export interface DeleteCampaignEntryLimitsRequest {
  id: string;
}
export const DeleteCampaignEntryLimitsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v2/campaigns/{id}/entry-limits" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCampaignEntryLimitsRequest",
}) as any as S.Schema<DeleteCampaignEntryLimitsRequest>;
export interface DeleteCampaignEntryLimitsResponse {}
export const DeleteCampaignEntryLimitsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCampaignEntryLimitsResponse",
}) as any as S.Schema<DeleteCampaignEntryLimitsResponse>;
export type CampaignDeletionPolicy = string;
export interface DeleteConnectInstanceConfigRequest {
  connectInstanceId: string;
  campaignDeletionPolicy?: string;
}
export const DeleteConnectInstanceConfigRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
    campaignDeletionPolicy: S.optional(S.String).pipe(
      T.HttpQuery("campaignDeletionPolicy"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v2/connect-instance/{connectInstanceId}/config",
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
export interface CustomerProfilesIntegrationIdentifier {
  domainArn: string;
}
export const CustomerProfilesIntegrationIdentifier = /*@__PURE__*/ S.suspend(
  () => S.Struct({ domainArn: S.String }),
).annotate({
  identifier: "CustomerProfilesIntegrationIdentifier",
}) as any as S.Schema<CustomerProfilesIntegrationIdentifier>;
export interface QConnectIntegrationIdentifier {
  knowledgeBaseArn: string;
}
export const QConnectIntegrationIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ knowledgeBaseArn: S.String }),
).annotate({
  identifier: "QConnectIntegrationIdentifier",
}) as any as S.Schema<QConnectIntegrationIdentifier>;
export type LambdaArn = string;
export interface LambdaIntegrationIdentifier {
  functionArn: string;
}
export const LambdaIntegrationIdentifier = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ functionArn: S.String }),
).annotate({
  identifier: "LambdaIntegrationIdentifier",
}) as any as S.Schema<LambdaIntegrationIdentifier>;
export type IntegrationIdentifier =
  | {
      customerProfiles: CustomerProfilesIntegrationIdentifier;
      qConnect?: never;
      lambda?: never;
    }
  | {
      customerProfiles?: never;
      qConnect: QConnectIntegrationIdentifier;
      lambda?: never;
    }
  | {
      customerProfiles?: never;
      qConnect?: never;
      lambda: LambdaIntegrationIdentifier;
    };
export const IntegrationIdentifier = /*@__PURE__*/ S.Union([
  S.Struct({ customerProfiles: CustomerProfilesIntegrationIdentifier }),
  S.Struct({ qConnect: QConnectIntegrationIdentifier }),
  S.Struct({ lambda: LambdaIntegrationIdentifier }),
]);
export interface DeleteConnectInstanceIntegrationRequest {
  connectInstanceId: string;
  integrationIdentifier: IntegrationIdentifier;
}
export const DeleteConnectInstanceIntegrationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
      integrationIdentifier: IntegrationIdentifier,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/connect-instance/{connectInstanceId}/integrations/delete",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteConnectInstanceIntegrationRequest",
}) as any as S.Schema<DeleteConnectInstanceIntegrationRequest>;
export interface DeleteConnectInstanceIntegrationResponse {}
export const DeleteConnectInstanceIntegrationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteConnectInstanceIntegrationResponse",
}) as any as S.Schema<DeleteConnectInstanceIntegrationResponse>;
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
        uri: "/v2/connect-instance/{connectInstanceId}/onboarding",
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
      T.Http({ method: "GET", uri: "/v2/campaigns/{id}" }),
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
  channelSubtypeConfig?: ChannelSubtypeConfig;
  type?: string;
  source?: Source;
  connectCampaignFlowArn?: string;
  schedule?: Schedule;
  entryLimitsConfig?: EntryLimitsConfig;
  communicationTimeConfig?: CommunicationTimeConfig;
  communicationLimitsOverride?: CommunicationLimitsConfig;
  tags?: { [key: string]: string | undefined };
}
export const Campaign = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.String,
    connectInstanceId: S.String,
    channelSubtypeConfig: S.optional(ChannelSubtypeConfig),
    type: S.optional(S.String),
    source: S.optional(Source),
    connectCampaignFlowArn: S.optional(S.String),
    schedule: S.optional(Schedule),
    entryLimitsConfig: S.optional(EntryLimitsConfig),
    communicationTimeConfig: S.optional(CommunicationTimeConfig),
    communicationLimitsOverride: S.optional(CommunicationLimitsConfig),
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
      T.Http({ method: "GET", uri: "/v2/campaigns/{id}/state" }),
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
      T.Http({ method: "POST", uri: "/v2/campaigns-state" }),
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
        uri: "/v2/connect-instance/{connectInstanceId}/config",
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
export interface GetInstanceCommunicationLimitsRequest {
  connectInstanceId: string;
}
export const GetInstanceCommunicationLimitsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v2/connect-instance/{connectInstanceId}/communication-limits",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetInstanceCommunicationLimitsRequest",
}) as any as S.Schema<GetInstanceCommunicationLimitsRequest>;
export interface InstanceCommunicationLimitsConfig {
  allChannelSubtypes?: CommunicationLimits;
}
export const InstanceCommunicationLimitsConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ allChannelSubtypes: S.optional(CommunicationLimits) }),
).annotate({
  identifier: "InstanceCommunicationLimitsConfig",
}) as any as S.Schema<InstanceCommunicationLimitsConfig>;
export interface GetInstanceCommunicationLimitsResponse {
  communicationLimitsConfig?: InstanceCommunicationLimitsConfig;
}
export const GetInstanceCommunicationLimitsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      communicationLimitsConfig: S.optional(InstanceCommunicationLimitsConfig),
    }),
).annotate({
  identifier: "GetInstanceCommunicationLimitsResponse",
}) as any as S.Schema<GetInstanceCommunicationLimitsResponse>;
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
          uri: "/v2/connect-instance/{connectInstanceId}/onboarding",
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
      T.Http({ method: "POST", uri: "/v2/campaigns-summary" }),
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
export type ChannelSubtypeList = string[];
export const ChannelSubtypeList = /*@__PURE__*/ S.Array(S.String);
export interface CampaignSummary {
  id: string;
  arn: string;
  name: string;
  connectInstanceId: string;
  channelSubtypes: string[];
  type?: string;
  schedule?: Schedule;
  entryLimitsConfig?: EntryLimitsConfig;
  connectCampaignFlowArn?: string;
}
export const CampaignSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    arn: S.String,
    name: S.String,
    connectInstanceId: S.String,
    channelSubtypes: ChannelSubtypeList,
    type: S.optional(S.String),
    schedule: S.optional(Schedule),
    entryLimitsConfig: S.optional(EntryLimitsConfig),
    connectCampaignFlowArn: S.optional(S.String),
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
export interface ListConnectInstanceIntegrationsRequest {
  connectInstanceId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListConnectInstanceIntegrationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
      maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v2/connect-instance/{connectInstanceId}/integrations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListConnectInstanceIntegrationsRequest",
}) as any as S.Schema<ListConnectInstanceIntegrationsRequest>;
export type EventType = string;
export type ObjectTypeName = string;
export type ObjectTypeNamesMap = { [key: string]: string | undefined };
export const ObjectTypeNamesMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CustomerProfilesIntegrationSummary {
  domainArn: string;
  objectTypeNames: { [key: string]: string | undefined };
}
export const CustomerProfilesIntegrationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainArn: S.String, objectTypeNames: ObjectTypeNamesMap }),
).annotate({
  identifier: "CustomerProfilesIntegrationSummary",
}) as any as S.Schema<CustomerProfilesIntegrationSummary>;
export interface QConnectIntegrationSummary {
  knowledgeBaseArn: string;
}
export const QConnectIntegrationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ knowledgeBaseArn: S.String }),
).annotate({
  identifier: "QConnectIntegrationSummary",
}) as any as S.Schema<QConnectIntegrationSummary>;
export interface LambdaIntegrationSummary {
  functionArn: string;
}
export const LambdaIntegrationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ functionArn: S.String }),
).annotate({
  identifier: "LambdaIntegrationSummary",
}) as any as S.Schema<LambdaIntegrationSummary>;
export type IntegrationSummary =
  | {
      customerProfiles: CustomerProfilesIntegrationSummary;
      qConnect?: never;
      lambda?: never;
    }
  | {
      customerProfiles?: never;
      qConnect: QConnectIntegrationSummary;
      lambda?: never;
    }
  | {
      customerProfiles?: never;
      qConnect?: never;
      lambda: LambdaIntegrationSummary;
    };
export const IntegrationSummary = /*@__PURE__*/ S.Union([
  S.Struct({ customerProfiles: CustomerProfilesIntegrationSummary }),
  S.Struct({ qConnect: QConnectIntegrationSummary }),
  S.Struct({ lambda: LambdaIntegrationSummary }),
]);
export type IntegrationSummaryList = IntegrationSummary[];
export const IntegrationSummaryList = /*@__PURE__*/ S.Array(IntegrationSummary);
export interface ListConnectInstanceIntegrationsResponse {
  nextToken?: string;
  integrationSummaryList?: IntegrationSummary[];
}
export const ListConnectInstanceIntegrationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      nextToken: S.optional(S.String),
      integrationSummaryList: S.optional(IntegrationSummaryList),
    }),
).annotate({
  identifier: "ListConnectInstanceIntegrationsResponse",
}) as any as S.Schema<ListConnectInstanceIntegrationsResponse>;
export interface ListTagsForResourceRequest {
  arn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v2/tags/{arn}" }),
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
      T.Http({ method: "POST", uri: "/v2/campaigns/{id}/pause" }),
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
export interface CustomerProfilesIntegrationConfig {
  domainArn: string;
  objectTypeNames: { [key: string]: string | undefined };
}
export const CustomerProfilesIntegrationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ domainArn: S.String, objectTypeNames: ObjectTypeNamesMap }),
).annotate({
  identifier: "CustomerProfilesIntegrationConfig",
}) as any as S.Schema<CustomerProfilesIntegrationConfig>;
export interface QConnectIntegrationConfig {
  knowledgeBaseArn: string;
}
export const QConnectIntegrationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ knowledgeBaseArn: S.String }),
).annotate({
  identifier: "QConnectIntegrationConfig",
}) as any as S.Schema<QConnectIntegrationConfig>;
export interface LambdaIntegrationConfig {
  functionArn: string;
}
export const LambdaIntegrationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ functionArn: S.String }),
).annotate({
  identifier: "LambdaIntegrationConfig",
}) as any as S.Schema<LambdaIntegrationConfig>;
export type IntegrationConfig =
  | {
      customerProfiles: CustomerProfilesIntegrationConfig;
      qConnect?: never;
      lambda?: never;
    }
  | {
      customerProfiles?: never;
      qConnect: QConnectIntegrationConfig;
      lambda?: never;
    }
  | {
      customerProfiles?: never;
      qConnect?: never;
      lambda: LambdaIntegrationConfig;
    };
export const IntegrationConfig = /*@__PURE__*/ S.Union([
  S.Struct({ customerProfiles: CustomerProfilesIntegrationConfig }),
  S.Struct({ qConnect: QConnectIntegrationConfig }),
  S.Struct({ lambda: LambdaIntegrationConfig }),
]);
export interface PutConnectInstanceIntegrationRequest {
  connectInstanceId: string;
  integrationConfig: IntegrationConfig;
}
export const PutConnectInstanceIntegrationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
      integrationConfig: IntegrationConfig,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/connect-instance/{connectInstanceId}/integrations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutConnectInstanceIntegrationRequest",
}) as any as S.Schema<PutConnectInstanceIntegrationRequest>;
export interface PutConnectInstanceIntegrationResponse {}
export const PutConnectInstanceIntegrationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutConnectInstanceIntegrationResponse",
}) as any as S.Schema<PutConnectInstanceIntegrationResponse>;
export interface PutInstanceCommunicationLimitsRequest {
  connectInstanceId: string;
  communicationLimitsConfig: InstanceCommunicationLimitsConfig;
}
export const PutInstanceCommunicationLimitsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      connectInstanceId: S.String.pipe(T.HttpLabel("connectInstanceId")),
      communicationLimitsConfig: InstanceCommunicationLimitsConfig,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/connect-instance/{connectInstanceId}/communication-limits",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutInstanceCommunicationLimitsRequest",
}) as any as S.Schema<PutInstanceCommunicationLimitsRequest>;
export interface PutInstanceCommunicationLimitsResponse {}
export const PutInstanceCommunicationLimitsResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutInstanceCommunicationLimitsResponse",
}) as any as S.Schema<PutInstanceCommunicationLimitsResponse>;
export type ClientToken = string;
export type DestinationPhoneNumber = string | redacted.Redacted<string>;
export type AttributeName = string;
export type AttributeValue = string;
export type Attributes = { [key: string]: string | undefined };
export const Attributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface TelephonyChannelSubtypeParameters {
  destinationPhoneNumber: string | redacted.Redacted<string>;
  attributes: { [key: string]: string | undefined };
  connectSourcePhoneNumber?: string;
  answerMachineDetectionConfig?: AnswerMachineDetectionConfig;
  ringTimeout?: number;
}
export const TelephonyChannelSubtypeParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationPhoneNumber: SensitiveString,
    attributes: Attributes,
    connectSourcePhoneNumber: S.optional(S.String),
    answerMachineDetectionConfig: S.optional(AnswerMachineDetectionConfig),
    ringTimeout: S.optional(S.Number),
  }),
).annotate({
  identifier: "TelephonyChannelSubtypeParameters",
}) as any as S.Schema<TelephonyChannelSubtypeParameters>;
export interface SmsChannelSubtypeParameters {
  destinationPhoneNumber: string | redacted.Redacted<string>;
  connectSourcePhoneNumberArn?: string;
  templateArn?: string;
  templateParameters: { [key: string]: string | undefined };
}
export const SmsChannelSubtypeParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationPhoneNumber: SensitiveString,
    connectSourcePhoneNumberArn: S.optional(S.String),
    templateArn: S.optional(S.String),
    templateParameters: Attributes,
  }),
).annotate({
  identifier: "SmsChannelSubtypeParameters",
}) as any as S.Schema<SmsChannelSubtypeParameters>;
export interface EmailChannelSubtypeParameters {
  destinationEmailAddress: string | redacted.Redacted<string>;
  connectSourceEmailAddress?: string | redacted.Redacted<string>;
  templateArn?: string;
  templateParameters: { [key: string]: string | undefined };
}
export const EmailChannelSubtypeParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationEmailAddress: SensitiveString,
    connectSourceEmailAddress: S.optional(SensitiveString),
    templateArn: S.optional(S.String),
    templateParameters: Attributes,
  }),
).annotate({
  identifier: "EmailChannelSubtypeParameters",
}) as any as S.Schema<EmailChannelSubtypeParameters>;
export interface WhatsAppChannelSubtypeParameters {
  destinationPhoneNumber: string | redacted.Redacted<string>;
  connectSourcePhoneNumberArn?: string;
  templateArn?: string;
  templateParameters: { [key: string]: string | undefined };
}
export const WhatsAppChannelSubtypeParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    destinationPhoneNumber: SensitiveString,
    connectSourcePhoneNumberArn: S.optional(S.String),
    templateArn: S.optional(S.String),
    templateParameters: Attributes,
  }),
).annotate({
  identifier: "WhatsAppChannelSubtypeParameters",
}) as any as S.Schema<WhatsAppChannelSubtypeParameters>;
export type ChannelSubtypeParameters =
  | {
      telephony: TelephonyChannelSubtypeParameters;
      sms?: never;
      email?: never;
      whatsApp?: never;
    }
  | {
      telephony?: never;
      sms: SmsChannelSubtypeParameters;
      email?: never;
      whatsApp?: never;
    }
  | {
      telephony?: never;
      sms?: never;
      email: EmailChannelSubtypeParameters;
      whatsApp?: never;
    }
  | {
      telephony?: never;
      sms?: never;
      email?: never;
      whatsApp: WhatsAppChannelSubtypeParameters;
    };
export const ChannelSubtypeParameters = /*@__PURE__*/ S.Union([
  S.Struct({ telephony: TelephonyChannelSubtypeParameters }),
  S.Struct({ sms: SmsChannelSubtypeParameters }),
  S.Struct({ email: EmailChannelSubtypeParameters }),
  S.Struct({ whatsApp: WhatsAppChannelSubtypeParameters }),
]);
export interface OutboundRequest {
  clientToken: string;
  expirationTime: Date;
  channelSubtypeParameters: ChannelSubtypeParameters;
}
export const OutboundRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.String,
    expirationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    channelSubtypeParameters: ChannelSubtypeParameters,
  }),
).annotate({
  identifier: "OutboundRequest",
}) as any as S.Schema<OutboundRequest>;
export type OutboundRequestList = OutboundRequest[];
export const OutboundRequestList = /*@__PURE__*/ S.Array(OutboundRequest);
export interface PutOutboundRequestBatchRequest {
  id: string;
  outboundRequests: OutboundRequest[];
}
export const PutOutboundRequestBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    outboundRequests: OutboundRequestList,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v2/campaigns/{id}/outbound-requests" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutOutboundRequestBatchRequest",
}) as any as S.Schema<PutOutboundRequestBatchRequest>;
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
export interface PutOutboundRequestBatchResponse {
  successfulRequests?: SuccessfulRequest[];
  failedRequests?: FailedRequest[];
}
export const PutOutboundRequestBatchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successfulRequests: S.optional(SuccessfulRequestList),
    failedRequests: S.optional(FailedRequestList),
  }),
).annotate({
  identifier: "PutOutboundRequestBatchResponse",
}) as any as S.Schema<PutOutboundRequestBatchResponse>;
export type ProfileId = string;
export type SourceEvent = string;
export type SessionId = string;
export type BrowserId = string;
export interface WebNotificationContext {
  sessionId?: string;
  browserId?: string;
}
export const WebNotificationContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.optional(S.String),
    browserId: S.optional(S.String),
  }),
).annotate({
  identifier: "WebNotificationContext",
}) as any as S.Schema<WebNotificationContext>;
export interface ChannelContext {
  webNotificationContext?: WebNotificationContext;
}
export const ChannelContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ webNotificationContext: S.optional(WebNotificationContext) }),
).annotate({ identifier: "ChannelContext" }) as any as S.Schema<ChannelContext>;
export interface EventTriggerContext {
  sourceEvent?: string;
  channelContext?: ChannelContext;
}
export const EventTriggerContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceEvent: S.optional(S.String),
    channelContext: S.optional(ChannelContext),
  }),
).annotate({
  identifier: "EventTriggerContext",
}) as any as S.Schema<EventTriggerContext>;
export interface ProfileOutboundRequest {
  clientToken: string;
  profileId: string;
  expirationTime?: Date;
  eventTriggerContext?: EventTriggerContext;
}
export const ProfileOutboundRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.String,
    profileId: S.String,
    expirationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    eventTriggerContext: S.optional(EventTriggerContext),
  }),
).annotate({
  identifier: "ProfileOutboundRequest",
}) as any as S.Schema<ProfileOutboundRequest>;
export type ProfileOutboundRequestList = ProfileOutboundRequest[];
export const ProfileOutboundRequestList = /*@__PURE__*/ S.Array(
  ProfileOutboundRequest,
);
export interface PutProfileOutboundRequestBatchRequest {
  id: string;
  profileOutboundRequests: ProfileOutboundRequest[];
}
export const PutProfileOutboundRequestBatchRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String.pipe(T.HttpLabel("id")),
      profileOutboundRequests: ProfileOutboundRequestList,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v2/campaigns/{id}/profile-outbound-requests",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutProfileOutboundRequestBatchRequest",
}) as any as S.Schema<PutProfileOutboundRequestBatchRequest>;
export type ProfileOutboundRequestId = string;
export interface SuccessfulProfileOutboundRequest {
  clientToken?: string;
  id?: string;
}
export const SuccessfulProfileOutboundRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ clientToken: S.optional(S.String), id: S.optional(S.String) }),
).annotate({
  identifier: "SuccessfulProfileOutboundRequest",
}) as any as S.Schema<SuccessfulProfileOutboundRequest>;
export type SuccessfulProfileOutboundRequestList =
  SuccessfulProfileOutboundRequest[];
export const SuccessfulProfileOutboundRequestList = /*@__PURE__*/ S.Array(
  SuccessfulProfileOutboundRequest,
);
export type ProfileOutboundRequestFailureCode = string;
export interface FailedProfileOutboundRequest {
  clientToken?: string;
  id?: string;
  failureCode?: string;
}
export const FailedProfileOutboundRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String),
    id: S.optional(S.String),
    failureCode: S.optional(S.String),
  }),
).annotate({
  identifier: "FailedProfileOutboundRequest",
}) as any as S.Schema<FailedProfileOutboundRequest>;
export type FailedProfileOutboundRequestList = FailedProfileOutboundRequest[];
export const FailedProfileOutboundRequestList = /*@__PURE__*/ S.Array(
  FailedProfileOutboundRequest,
);
export interface PutProfileOutboundRequestBatchResponse {
  successfulRequests?: SuccessfulProfileOutboundRequest[];
  failedRequests?: FailedProfileOutboundRequest[];
}
export const PutProfileOutboundRequestBatchResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      successfulRequests: S.optional(SuccessfulProfileOutboundRequestList),
      failedRequests: S.optional(FailedProfileOutboundRequestList),
    }),
).annotate({
  identifier: "PutProfileOutboundRequestBatchResponse",
}) as any as S.Schema<PutProfileOutboundRequestBatchResponse>;
export interface ResumeCampaignRequest {
  id: string;
}
export const ResumeCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/campaigns/{id}/resume" }),
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
      T.Http({ method: "POST", uri: "/v2/campaigns/{id}/start" }),
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
        uri: "/v2/connect-instance/{connectInstanceId}/onboarding",
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
      T.Http({ method: "POST", uri: "/v2/campaigns/{id}/stop" }),
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
      T.Http({ method: "POST", uri: "/v2/tags/{arn}" }),
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
      T.Http({ method: "DELETE", uri: "/v2/tags/{arn}" }),
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
export interface UpdateCampaignChannelSubtypeConfigRequest {
  id: string;
  channelSubtypeConfig: ChannelSubtypeConfig;
}
export const UpdateCampaignChannelSubtypeConfigRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      id: S.String.pipe(T.HttpLabel("id")),
      channelSubtypeConfig: ChannelSubtypeConfig,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/campaigns/{id}/channel-subtype-config",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateCampaignChannelSubtypeConfigRequest",
  }) as any as S.Schema<UpdateCampaignChannelSubtypeConfigRequest>;
export interface UpdateCampaignChannelSubtypeConfigResponse {}
export const UpdateCampaignChannelSubtypeConfigResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateCampaignChannelSubtypeConfigResponse",
  }) as any as S.Schema<UpdateCampaignChannelSubtypeConfigResponse>;
export interface UpdateCampaignCommunicationLimitsRequest {
  id: string;
  communicationLimitsOverride: CommunicationLimitsConfig;
}
export const UpdateCampaignCommunicationLimitsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String.pipe(T.HttpLabel("id")),
      communicationLimitsOverride: CommunicationLimitsConfig,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/campaigns/{id}/communication-limits",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateCampaignCommunicationLimitsRequest",
}) as any as S.Schema<UpdateCampaignCommunicationLimitsRequest>;
export interface UpdateCampaignCommunicationLimitsResponse {}
export const UpdateCampaignCommunicationLimitsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateCampaignCommunicationLimitsResponse",
  }) as any as S.Schema<UpdateCampaignCommunicationLimitsResponse>;
export interface UpdateCampaignCommunicationTimeRequest {
  id: string;
  communicationTimeConfig: CommunicationTimeConfig;
}
export const UpdateCampaignCommunicationTimeRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String.pipe(T.HttpLabel("id")),
      communicationTimeConfig: CommunicationTimeConfig,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v2/campaigns/{id}/communication-time",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateCampaignCommunicationTimeRequest",
}) as any as S.Schema<UpdateCampaignCommunicationTimeRequest>;
export interface UpdateCampaignCommunicationTimeResponse {}
export const UpdateCampaignCommunicationTimeResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateCampaignCommunicationTimeResponse",
}) as any as S.Schema<UpdateCampaignCommunicationTimeResponse>;
export interface UpdateCampaignEntryLimitsRequest {
  id: string;
  entryLimitsConfig: EntryLimitsConfig;
}
export const UpdateCampaignEntryLimitsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    entryLimitsConfig: EntryLimitsConfig,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/campaigns/{id}/entry-limits" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCampaignEntryLimitsRequest",
}) as any as S.Schema<UpdateCampaignEntryLimitsRequest>;
export interface UpdateCampaignEntryLimitsResponse {}
export const UpdateCampaignEntryLimitsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCampaignEntryLimitsResponse",
}) as any as S.Schema<UpdateCampaignEntryLimitsResponse>;
export interface UpdateCampaignFlowAssociationRequest {
  id: string;
  connectCampaignFlowArn: string;
}
export const UpdateCampaignFlowAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      id: S.String.pipe(T.HttpLabel("id")),
      connectCampaignFlowArn: S.String,
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v2/campaigns/{id}/flow" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateCampaignFlowAssociationRequest",
}) as any as S.Schema<UpdateCampaignFlowAssociationRequest>;
export interface UpdateCampaignFlowAssociationResponse {}
export const UpdateCampaignFlowAssociationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "UpdateCampaignFlowAssociationResponse",
}) as any as S.Schema<UpdateCampaignFlowAssociationResponse>;
export interface UpdateCampaignNameRequest {
  id: string;
  name: string;
}
export const UpdateCampaignNameRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")), name: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/campaigns/{id}/name" }),
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
export interface UpdateCampaignScheduleRequest {
  id: string;
  schedule: Schedule;
}
export const UpdateCampaignScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")), schedule: Schedule }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/campaigns/{id}/schedule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCampaignScheduleRequest",
}) as any as S.Schema<UpdateCampaignScheduleRequest>;
export interface UpdateCampaignScheduleResponse {}
export const UpdateCampaignScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCampaignScheduleResponse",
}) as any as S.Schema<UpdateCampaignScheduleResponse>;
export interface UpdateCampaignSourceRequest {
  id: string;
  source: Source;
}
export const UpdateCampaignSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")), source: Source }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v2/campaigns/{id}/source" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCampaignSourceRequest",
}) as any as S.Schema<UpdateCampaignSourceRequest>;
export interface UpdateCampaignSourceResponse {}
export const UpdateCampaignSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UpdateCampaignSourceResponse",
}) as any as S.Schema<UpdateCampaignSourceResponse>;
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

export type DeleteCampaignChannelSubtypeConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the channel subtype config of a campaign. This API is idempotent.
 */
export const deleteCampaignChannelSubtypeConfig: API.OperationMethod<
  DeleteCampaignChannelSubtypeConfigRequest,
  DeleteCampaignChannelSubtypeConfigResponse,
  DeleteCampaignChannelSubtypeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCampaignChannelSubtypeConfigRequest,
  output: DeleteCampaignChannelSubtypeConfigResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaignChannelSubtypeConfig",
}));

export type DeleteCampaignCommunicationLimitsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the communication limits config for a campaign. This API is idempotent.
 */
export const deleteCampaignCommunicationLimits: API.OperationMethod<
  DeleteCampaignCommunicationLimitsRequest,
  DeleteCampaignCommunicationLimitsResponse,
  DeleteCampaignCommunicationLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCampaignCommunicationLimitsRequest,
  output: DeleteCampaignCommunicationLimitsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaignCommunicationLimits",
}));

export type DeleteCampaignCommunicationTimeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the communication time config for a campaign. This API is idempotent.
 */
export const deleteCampaignCommunicationTime: API.OperationMethod<
  DeleteCampaignCommunicationTimeRequest,
  DeleteCampaignCommunicationTimeResponse,
  DeleteCampaignCommunicationTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCampaignCommunicationTimeRequest,
  output: DeleteCampaignCommunicationTimeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaignCommunicationTime",
}));

export type DeleteCampaignEntryLimitsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the entry limits config for a campaign. This API is idempotent.
 */
export const deleteCampaignEntryLimits: API.OperationMethod<
  DeleteCampaignEntryLimitsRequest,
  DeleteCampaignEntryLimitsResponse,
  DeleteCampaignEntryLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCampaignEntryLimitsRequest,
  output: DeleteCampaignEntryLimitsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaignEntryLimits",
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

export type DeleteConnectInstanceIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the integration for the specified Amazon Connect instance.
 */
export const deleteConnectInstanceIntegration: API.OperationMethod<
  DeleteConnectInstanceIntegrationRequest,
  DeleteConnectInstanceIntegrationResponse,
  DeleteConnectInstanceIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConnectInstanceIntegrationRequest,
  output: DeleteConnectInstanceIntegrationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConnectInstanceIntegration",
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

export type GetInstanceCommunicationLimitsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get the instance communication limits.
 */
export const getInstanceCommunicationLimits: API.OperationMethod<
  GetInstanceCommunicationLimitsRequest,
  GetInstanceCommunicationLimitsResponse,
  GetInstanceCommunicationLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInstanceCommunicationLimitsRequest,
  output: GetInstanceCommunicationLimitsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInstanceCommunicationLimits",
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

export type ListConnectInstanceIntegrationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides summary information about the integration under the specified Connect instance.
 */
export const listConnectInstanceIntegrations: API.PaginatedOperationMethod<
  ListConnectInstanceIntegrationsRequest,
  ListConnectInstanceIntegrationsResponse,
  ListConnectInstanceIntegrationsError,
  Credentials | HttpClient.HttpClient,
  IntegrationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConnectInstanceIntegrationsRequest,
  output: ListConnectInstanceIntegrationsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConnectInstanceIntegrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "integrationSummaryList",
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

export type PutConnectInstanceIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Put or update the integration for the specified Amazon Connect instance.
 */
export const putConnectInstanceIntegration: API.OperationMethod<
  PutConnectInstanceIntegrationRequest,
  PutConnectInstanceIntegrationResponse,
  PutConnectInstanceIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConnectInstanceIntegrationRequest,
  output: PutConnectInstanceIntegrationResponse,
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
  operationName: "PutConnectInstanceIntegration",
}));

export type PutInstanceCommunicationLimitsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Put the instance communication limits. This API is idempotent.
 */
export const putInstanceCommunicationLimits: API.OperationMethod<
  PutInstanceCommunicationLimitsRequest,
  PutInstanceCommunicationLimitsResponse,
  PutInstanceCommunicationLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutInstanceCommunicationLimitsRequest,
  output: PutInstanceCommunicationLimitsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutInstanceCommunicationLimits",
}));

export type PutOutboundRequestBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates outbound requests for the specified campaign Amazon Connect account. This API is idempotent.
 */
export const putOutboundRequestBatch: API.OperationMethod<
  PutOutboundRequestBatchRequest,
  PutOutboundRequestBatchResponse,
  PutOutboundRequestBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutOutboundRequestBatchRequest,
  output: PutOutboundRequestBatchResponse,
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
  operationName: "PutOutboundRequestBatch",
}));

export type PutProfileOutboundRequestBatchError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Takes in a list of profile outbound requests to be placed as part of an outbound campaign. This API is idempotent.
 */
export const putProfileOutboundRequestBatch: API.OperationMethod<
  PutProfileOutboundRequestBatchRequest,
  PutProfileOutboundRequestBatchResponse,
  PutProfileOutboundRequestBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutProfileOutboundRequestBatchRequest,
  output: PutProfileOutboundRequestBatchResponse,
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
  operationName: "PutProfileOutboundRequestBatch",
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

export type UpdateCampaignChannelSubtypeConfigError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the channel subtype config of a campaign. This API is idempotent.
 */
export const updateCampaignChannelSubtypeConfig: API.OperationMethod<
  UpdateCampaignChannelSubtypeConfigRequest,
  UpdateCampaignChannelSubtypeConfigResponse,
  UpdateCampaignChannelSubtypeConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignChannelSubtypeConfigRequest,
  output: UpdateCampaignChannelSubtypeConfigResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignChannelSubtypeConfig",
}));

export type UpdateCampaignCommunicationLimitsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the communication limits config for a campaign. This API is idempotent.
 */
export const updateCampaignCommunicationLimits: API.OperationMethod<
  UpdateCampaignCommunicationLimitsRequest,
  UpdateCampaignCommunicationLimitsResponse,
  UpdateCampaignCommunicationLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignCommunicationLimitsRequest,
  output: UpdateCampaignCommunicationLimitsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignCommunicationLimits",
}));

export type UpdateCampaignCommunicationTimeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the communication time config for a campaign. This API is idempotent.
 */
export const updateCampaignCommunicationTime: API.OperationMethod<
  UpdateCampaignCommunicationTimeRequest,
  UpdateCampaignCommunicationTimeResponse,
  UpdateCampaignCommunicationTimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignCommunicationTimeRequest,
  output: UpdateCampaignCommunicationTimeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignCommunicationTime",
}));

export type UpdateCampaignEntryLimitsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the entry limits config for a campaign. This API is idempotent.
 */
export const updateCampaignEntryLimits: API.OperationMethod<
  UpdateCampaignEntryLimitsRequest,
  UpdateCampaignEntryLimitsResponse,
  UpdateCampaignEntryLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignEntryLimitsRequest,
  output: UpdateCampaignEntryLimitsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignEntryLimits",
}));

export type UpdateCampaignFlowAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the campaign flow associated with a campaign. This API is idempotent.
 */
export const updateCampaignFlowAssociation: API.OperationMethod<
  UpdateCampaignFlowAssociationRequest,
  UpdateCampaignFlowAssociationResponse,
  UpdateCampaignFlowAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignFlowAssociationRequest,
  output: UpdateCampaignFlowAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignFlowAssociation",
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

export type UpdateCampaignScheduleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the schedule for a campaign. This API is idempotent.
 */
export const updateCampaignSchedule: API.OperationMethod<
  UpdateCampaignScheduleRequest,
  UpdateCampaignScheduleResponse,
  UpdateCampaignScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignScheduleRequest,
  output: UpdateCampaignScheduleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignSchedule",
}));

export type UpdateCampaignSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | InvalidCampaignStateException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the campaign source with a campaign. This API is idempotent.
 */
export const updateCampaignSource: API.OperationMethod<
  UpdateCampaignSourceRequest,
  UpdateCampaignSourceResponse,
  UpdateCampaignSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignSourceRequest,
  output: UpdateCampaignSourceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    InvalidCampaignStateException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaignSource",
}));
