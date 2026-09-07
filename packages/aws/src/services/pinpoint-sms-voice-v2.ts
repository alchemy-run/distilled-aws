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
  sdkId: "Pinpoint SMS Voice V2",
  serviceShapeName: "PinpointSMSVoiceV2",
});
const auth = T.AwsAuthSigv4({ name: "sms-voice" });
const ver = T.ServiceVersion("2022-03-31");
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
              `https://sms-voice-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://sms-voice-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://sms-voice.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://sms-voice.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(S.String),
    },
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(S.String),
      ResourceType: S.optional(S.String),
      ResourceId: S.optional(S.String),
    },
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
    },
    T.Retryable(),
  ).pipe(C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceType: S.optional(S.String),
      ResourceId: S.optional(S.String),
    },
  ) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(S.String),
    },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.Retryable({ throttling: true }),
  ).pipe(C.withRetryableError, C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      Reason: S.optional(S.String),
      Fields: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
  ) {}
export type PoolIdOrArn = string;
export type PhoneOrSenderIdOrArn = string;
export type IsoCountryCode = string;
export type ClientToken = string;
export interface AssociateOriginationIdentityRequest {
  PoolId: string;
  OriginationIdentity: string;
  IsoCountryCode?: string;
  ClientToken?: string;
}
export const AssociateOriginationIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolId: S.String,
    OriginationIdentity: S.String,
    IsoCountryCode: S.optional(S.String),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateOriginationIdentityRequest",
}) as any as S.Schema<AssociateOriginationIdentityRequest>;
export interface AssociateOriginationIdentityResult {
  PoolArn?: string;
  PoolId?: string;
  OriginationIdentityArn?: string;
  OriginationIdentity?: string;
  IsoCountryCode?: string;
}
export const AssociateOriginationIdentityResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolArn: S.optional(S.String),
    PoolId: S.optional(S.String),
    OriginationIdentityArn: S.optional(S.String),
    OriginationIdentity: S.optional(S.String),
    IsoCountryCode: S.optional(S.String),
  }),
).annotate({
  identifier: "AssociateOriginationIdentityResult",
}) as any as S.Schema<AssociateOriginationIdentityResult>;
export type ProtectConfigurationIdOrArn = string;
export type ConfigurationSetNameOrArn = string;
export interface AssociateProtectConfigurationRequest {
  ProtectConfigurationId: string;
  ConfigurationSetName: string;
}
export const AssociateProtectConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProtectConfigurationId: S.String,
      ConfigurationSetName: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "AssociateProtectConfigurationRequest",
}) as any as S.Schema<AssociateProtectConfigurationRequest>;
export type ConfigurationSetName = string;
export type ProtectConfigurationArn = string;
export type ProtectConfigurationId = string;
export interface AssociateProtectConfigurationResult {
  ConfigurationSetArn: string;
  ConfigurationSetName: string;
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
}
export const AssociateProtectConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetArn: S.String,
    ConfigurationSetName: S.String,
    ProtectConfigurationArn: S.String,
    ProtectConfigurationId: S.String,
  }),
).annotate({
  identifier: "AssociateProtectConfigurationResult",
}) as any as S.Schema<AssociateProtectConfigurationResult>;
export type CarrierLookupInputPhoneNumberType = string;
export interface CarrierLookupRequest {
  PhoneNumber: string;
}
export const CarrierLookupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumber: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CarrierLookupRequest",
}) as any as S.Schema<CarrierLookupRequest>;
export type E164PhoneNumberType = string;
export type DialingCountryCodeType = string;
export type MCCType = string;
export type MNCType = string;
export type PhoneNumberType = string;
export interface CarrierLookupResult {
  E164PhoneNumber: string;
  DialingCountryCode?: string;
  IsoCountryCode?: string;
  Country?: string;
  MCC?: string;
  MNC?: string;
  Carrier?: string;
  PhoneNumberType: string;
}
export const CarrierLookupResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    E164PhoneNumber: S.String,
    DialingCountryCode: S.optional(S.String),
    IsoCountryCode: S.optional(S.String),
    Country: S.optional(S.String),
    MCC: S.optional(S.String),
    MNC: S.optional(S.String),
    Carrier: S.optional(S.String),
    PhoneNumberType: S.String,
  }),
).annotate({
  identifier: "CarrierLookupResult",
}) as any as S.Schema<CarrierLookupResult>;
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
export interface CreateConfigurationSetRequest {
  ConfigurationSetName: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export const CreateConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.String,
    Tags: S.optional(TagList),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateConfigurationSetRequest",
}) as any as S.Schema<CreateConfigurationSetRequest>;
export interface CreateConfigurationSetResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  Tags?: Tag[];
  CreatedTimestamp?: Date;
}
export const CreateConfigurationSetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetArn: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    Tags: S.optional(TagList),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CreateConfigurationSetResult",
}) as any as S.Schema<CreateConfigurationSetResult>;
export type EventDestinationName = string;
export type EventType = string;
export type EventTypeList = string[];
export const EventTypeList = /*@__PURE__*/ S.Array(S.String);
export type IamRoleArn = string;
export type LogGroupArn = string;
export interface CloudWatchLogsDestination {
  IamRoleArn: string;
  LogGroupArn: string;
}
export const CloudWatchLogsDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IamRoleArn: S.String, LogGroupArn: S.String }),
).annotate({
  identifier: "CloudWatchLogsDestination",
}) as any as S.Schema<CloudWatchLogsDestination>;
export type DeliveryStreamArn = string;
export interface KinesisFirehoseDestination {
  IamRoleArn: string;
  DeliveryStreamArn: string;
}
export const KinesisFirehoseDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IamRoleArn: S.String, DeliveryStreamArn: S.String }),
).annotate({
  identifier: "KinesisFirehoseDestination",
}) as any as S.Schema<KinesisFirehoseDestination>;
export type SnsTopicArn = string;
export interface SnsDestination {
  TopicArn: string;
}
export const SnsDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TopicArn: S.String }),
).annotate({ identifier: "SnsDestination" }) as any as S.Schema<SnsDestination>;
export interface CreateEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  MatchingEventTypes: string[];
  CloudWatchLogsDestination?: CloudWatchLogsDestination;
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  SnsDestination?: SnsDestination;
  ClientToken?: string;
}
export const CreateEventDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.String,
    EventDestinationName: S.String,
    MatchingEventTypes: EventTypeList,
    CloudWatchLogsDestination: S.optional(CloudWatchLogsDestination),
    KinesisFirehoseDestination: S.optional(KinesisFirehoseDestination),
    SnsDestination: S.optional(SnsDestination),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateEventDestinationRequest",
}) as any as S.Schema<CreateEventDestinationRequest>;
export interface EventDestination {
  EventDestinationName: string;
  Enabled: boolean;
  MatchingEventTypes: string[];
  CloudWatchLogsDestination?: CloudWatchLogsDestination;
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  SnsDestination?: SnsDestination;
}
export const EventDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventDestinationName: S.String,
    Enabled: S.Boolean,
    MatchingEventTypes: EventTypeList,
    CloudWatchLogsDestination: S.optional(CloudWatchLogsDestination),
    KinesisFirehoseDestination: S.optional(KinesisFirehoseDestination),
    SnsDestination: S.optional(SnsDestination),
  }),
).annotate({
  identifier: "EventDestination",
}) as any as S.Schema<EventDestination>;
export interface CreateEventDestinationResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  EventDestination?: EventDestination;
}
export const CreateEventDestinationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetArn: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    EventDestination: S.optional(EventDestination),
  }),
).annotate({
  identifier: "CreateEventDestinationResult",
}) as any as S.Schema<CreateEventDestinationResult>;
export type NotifyConfigurationDisplayName = string;
export type NotifyConfigurationUseCase = string;
export type NotifyTemplateId = string;
export type IsoCountryCodeList = string[];
export const IsoCountryCodeList = /*@__PURE__*/ S.Array(S.String);
export type NumberCapability = string;
export type NotifyEnabledChannelsList = string[];
export const NotifyEnabledChannelsList = /*@__PURE__*/ S.Array(S.String);
export interface CreateNotifyConfigurationRequest {
  DisplayName: string;
  UseCase: string;
  DefaultTemplateId?: string;
  PoolId?: string;
  EnabledCountries?: string[];
  EnabledChannels: string[];
  DeletionProtectionEnabled?: boolean;
  ClientToken?: string;
  Tags?: Tag[];
}
export const CreateNotifyConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayName: S.String,
    UseCase: S.String,
    DefaultTemplateId: S.optional(S.String),
    PoolId: S.optional(S.String),
    EnabledCountries: S.optional(IsoCountryCodeList),
    EnabledChannels: NotifyEnabledChannelsList,
    DeletionProtectionEnabled: S.optional(S.Boolean),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateNotifyConfigurationRequest",
}) as any as S.Schema<CreateNotifyConfigurationRequest>;
export type NotifyConfigurationArn = string;
export type NotifyConfigurationId = string;
export type NotifyConfigurationTier = string;
export type TierUpgradeStatus = string;
export type NotifyConfigurationStatus = string;
export interface CreateNotifyConfigurationResult {
  NotifyConfigurationArn: string;
  NotifyConfigurationId: string;
  DisplayName: string;
  UseCase: string;
  DefaultTemplateId?: string;
  PoolId?: string;
  EnabledCountries?: string[];
  EnabledChannels: string[];
  Tier: string;
  TierUpgradeStatus: string;
  Status: string;
  RejectionReason?: string;
  DeletionProtectionEnabled: boolean;
  Tags?: Tag[];
  CreatedTimestamp: Date;
}
export const CreateNotifyConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyConfigurationArn: S.String,
    NotifyConfigurationId: S.String,
    DisplayName: S.String,
    UseCase: S.String,
    DefaultTemplateId: S.optional(S.String),
    PoolId: S.optional(S.String),
    EnabledCountries: S.optional(IsoCountryCodeList),
    EnabledChannels: NotifyEnabledChannelsList,
    Tier: S.String,
    TierUpgradeStatus: S.String,
    Status: S.String,
    RejectionReason: S.optional(S.String),
    DeletionProtectionEnabled: S.Boolean,
    Tags: S.optional(TagList),
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateNotifyConfigurationResult",
}) as any as S.Schema<CreateNotifyConfigurationResult>;
export type OptOutListName = string;
export interface CreateOptOutListRequest {
  OptOutListName: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export const CreateOptOutListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptOutListName: S.String,
    Tags: S.optional(TagList),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateOptOutListRequest",
}) as any as S.Schema<CreateOptOutListRequest>;
export interface CreateOptOutListResult {
  OptOutListArn?: string;
  OptOutListName?: string;
  Tags?: Tag[];
  CreatedTimestamp?: Date;
}
export const CreateOptOutListResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptOutListArn: S.optional(S.String),
    OptOutListName: S.optional(S.String),
    Tags: S.optional(TagList),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CreateOptOutListResult",
}) as any as S.Schema<CreateOptOutListResult>;
export type MessageType = string;
export interface CreatePoolRequest {
  OriginationIdentity: string;
  IsoCountryCode?: string;
  MessageType: string;
  DeletionProtectionEnabled?: boolean;
  Tags?: Tag[];
  ClientToken?: string;
}
export const CreatePoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OriginationIdentity: S.String,
    IsoCountryCode: S.optional(S.String),
    MessageType: S.String,
    DeletionProtectionEnabled: S.optional(S.Boolean),
    Tags: S.optional(TagList),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreatePoolRequest",
}) as any as S.Schema<CreatePoolRequest>;
export type PoolStatus = string;
export type TwoWayChannelArn = string;
export interface CreatePoolResult {
  PoolArn?: string;
  PoolId?: string;
  Status?: string;
  MessageType?: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  SharedRoutesEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
  Tags?: Tag[];
  CreatedTimestamp?: Date;
}
export const CreatePoolResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolArn: S.optional(S.String),
    PoolId: S.optional(S.String),
    Status: S.optional(S.String),
    MessageType: S.optional(S.String),
    TwoWayEnabled: S.optional(S.Boolean),
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.optional(S.Boolean),
    OptOutListName: S.optional(S.String),
    SharedRoutesEnabled: S.optional(S.Boolean),
    DeletionProtectionEnabled: S.optional(S.Boolean),
    Tags: S.optional(TagList),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CreatePoolResult",
}) as any as S.Schema<CreatePoolResult>;
export interface CreateProtectConfigurationRequest {
  ClientToken?: string;
  DeletionProtectionEnabled?: boolean;
  Tags?: Tag[];
}
export const CreateProtectConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    DeletionProtectionEnabled: S.optional(S.Boolean),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateProtectConfigurationRequest",
}) as any as S.Schema<CreateProtectConfigurationRequest>;
export interface CreateProtectConfigurationResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  CreatedTimestamp: Date;
  AccountDefault: boolean;
  DeletionProtectionEnabled: boolean;
  Tags?: Tag[];
}
export const CreateProtectConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProtectConfigurationArn: S.String,
    ProtectConfigurationId: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    AccountDefault: S.Boolean,
    DeletionProtectionEnabled: S.Boolean,
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "CreateProtectConfigurationResult",
}) as any as S.Schema<CreateProtectConfigurationResult>;
export type OptOutListNameOrArn = string;
export interface CreateRcsAgentRequest {
  DeletionProtectionEnabled?: boolean;
  OptOutListName?: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export const CreateRcsAgentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeletionProtectionEnabled: S.optional(S.Boolean),
    OptOutListName: S.optional(S.String),
    Tags: S.optional(TagList),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRcsAgentRequest",
}) as any as S.Schema<CreateRcsAgentRequest>;
export type RcsAgentStatus = string;
export type TwoWayMediaS3BucketName = string;
export type TwoWayMediaS3KeyPrefix = string;
export type RcsEventType = string;
export type RcsEventTypeList = string[];
export const RcsEventTypeList = /*@__PURE__*/ S.Array(S.String);
export interface CreateRcsAgentResult {
  RcsAgentArn: string;
  RcsAgentId: string;
  Status: string;
  DeletionProtectionEnabled: boolean;
  OptOutListName?: string;
  CreatedTimestamp: Date;
  SelfManagedOptOutsEnabled: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  TwoWayEnabled: boolean;
  TwoWayMediaS3BucketName?: string;
  TwoWayMediaS3KeyPrefix?: string;
  TwoWayMediaS3Role?: string;
  TwoWayRcsEventsEnabled?: string[];
  Tags?: Tag[];
}
export const CreateRcsAgentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RcsAgentArn: S.String,
    RcsAgentId: S.String,
    Status: S.String,
    DeletionProtectionEnabled: S.Boolean,
    OptOutListName: S.optional(S.String),
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    SelfManagedOptOutsEnabled: S.Boolean,
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    TwoWayEnabled: S.Boolean,
    TwoWayMediaS3BucketName: S.optional(S.String),
    TwoWayMediaS3KeyPrefix: S.optional(S.String),
    TwoWayMediaS3Role: S.optional(S.String),
    TwoWayRcsEventsEnabled: S.optional(RcsEventTypeList),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "CreateRcsAgentResult",
}) as any as S.Schema<CreateRcsAgentResult>;
export type RegistrationType = string;
export interface CreateRegistrationRequest {
  RegistrationType: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export const CreateRegistrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationType: S.String,
    Tags: S.optional(TagList),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRegistrationRequest",
}) as any as S.Schema<CreateRegistrationRequest>;
export type RegistrationStatus = string;
export type RegistrationVersionNumber = number;
export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateRegistrationResult {
  RegistrationArn: string;
  RegistrationId: string;
  RegistrationType: string;
  RegistrationStatus: string;
  CurrentVersionNumber: number;
  AdditionalAttributes?: { [key: string]: string | undefined };
  Tags?: Tag[];
  CreatedTimestamp: Date;
}
export const CreateRegistrationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationArn: S.String,
    RegistrationId: S.String,
    RegistrationType: S.String,
    RegistrationStatus: S.String,
    CurrentVersionNumber: S.Number,
    AdditionalAttributes: S.optional(StringMap),
    Tags: S.optional(TagList),
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateRegistrationResult",
}) as any as S.Schema<CreateRegistrationResult>;
export type RegistrationIdOrArn = string;
export type ResourceIdOrArn = string;
export interface CreateRegistrationAssociationRequest {
  RegistrationId: string;
  ResourceId: string;
}
export const CreateRegistrationAssociationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ RegistrationId: S.String, ResourceId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateRegistrationAssociationRequest",
}) as any as S.Schema<CreateRegistrationAssociationRequest>;
export type PhoneNumber = string;
export interface CreateRegistrationAssociationResult {
  RegistrationArn: string;
  RegistrationId: string;
  RegistrationType: string;
  ResourceArn: string;
  ResourceId: string;
  ResourceType: string;
  IsoCountryCode?: string;
  PhoneNumber?: string;
}
export const CreateRegistrationAssociationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationArn: S.String,
    RegistrationId: S.String,
    RegistrationType: S.String,
    ResourceArn: S.String,
    ResourceId: S.String,
    ResourceType: S.String,
    IsoCountryCode: S.optional(S.String),
    PhoneNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateRegistrationAssociationResult",
}) as any as S.Schema<CreateRegistrationAssociationResult>;
export type AttachmentBody = Uint8Array;
export type AttachmentUrl = string;
export interface CreateRegistrationAttachmentRequest {
  AttachmentBody?: Uint8Array;
  AttachmentUrl?: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export const CreateRegistrationAttachmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttachmentBody: S.optional(T.Blob),
    AttachmentUrl: S.optional(S.String),
    Tags: S.optional(TagList),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRegistrationAttachmentRequest",
}) as any as S.Schema<CreateRegistrationAttachmentRequest>;
export type AttachmentStatus = string;
export interface CreateRegistrationAttachmentResult {
  RegistrationAttachmentArn: string;
  RegistrationAttachmentId: string;
  AttachmentStatus: string;
  Tags?: Tag[];
  CreatedTimestamp: Date;
}
export const CreateRegistrationAttachmentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationAttachmentArn: S.String,
    RegistrationAttachmentId: S.String,
    AttachmentStatus: S.String,
    Tags: S.optional(TagList),
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "CreateRegistrationAttachmentResult",
}) as any as S.Schema<CreateRegistrationAttachmentResult>;
export interface CreateRegistrationVersionRequest {
  RegistrationId: string;
}
export const CreateRegistrationVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegistrationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateRegistrationVersionRequest",
}) as any as S.Schema<CreateRegistrationVersionRequest>;
export type RegistrationVersionStatus = string;
export interface RegistrationVersionStatusHistory {
  DraftTimestamp: Date;
  SubmittedTimestamp?: Date;
  AwsReviewingTimestamp?: Date;
  ReviewingTimestamp?: Date;
  RequiresAuthenticationTimestamp?: Date;
  ApprovedTimestamp?: Date;
  DiscardedTimestamp?: Date;
  DeniedTimestamp?: Date;
  RevokedTimestamp?: Date;
  ArchivedTimestamp?: Date;
}
export const RegistrationVersionStatusHistory = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DraftTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    SubmittedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AwsReviewingTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ReviewingTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RequiresAuthenticationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ApprovedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DiscardedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DeniedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RevokedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    ArchivedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "RegistrationVersionStatusHistory",
}) as any as S.Schema<RegistrationVersionStatusHistory>;
export interface CreateRegistrationVersionResult {
  RegistrationArn: string;
  RegistrationId: string;
  VersionNumber: number;
  RegistrationVersionStatus: string;
  RegistrationVersionStatusHistory: RegistrationVersionStatusHistory;
}
export const CreateRegistrationVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationArn: S.String,
    RegistrationId: S.String,
    VersionNumber: S.Number,
    RegistrationVersionStatus: S.String,
    RegistrationVersionStatusHistory: RegistrationVersionStatusHistory,
  }),
).annotate({
  identifier: "CreateRegistrationVersionResult",
}) as any as S.Schema<CreateRegistrationVersionResult>;
export type RcsAgentIdOrArn = string;
export interface CreateVerifiedDestinationNumberRequest {
  DestinationPhoneNumber: string;
  RcsAgentId?: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export const CreateVerifiedDestinationNumberRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DestinationPhoneNumber: S.String,
      RcsAgentId: S.optional(S.String),
      Tags: S.optional(TagList),
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "CreateVerifiedDestinationNumberRequest",
}) as any as S.Schema<CreateVerifiedDestinationNumberRequest>;
export type VerificationStatus = string;
export interface CreateVerifiedDestinationNumberResult {
  VerifiedDestinationNumberArn: string;
  VerifiedDestinationNumberId: string;
  DestinationPhoneNumber: string;
  Status: string;
  RcsAgentId?: string;
  Tags?: Tag[];
  CreatedTimestamp: Date;
}
export const CreateVerifiedDestinationNumberResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      VerifiedDestinationNumberArn: S.String,
      VerifiedDestinationNumberId: S.String,
      DestinationPhoneNumber: S.String,
      Status: S.String,
      RcsAgentId: S.optional(S.String),
      Tags: S.optional(TagList),
      CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "CreateVerifiedDestinationNumberResult",
}) as any as S.Schema<CreateVerifiedDestinationNumberResult>;
export interface DeleteAccountDefaultProtectConfigurationRequest {}
export const DeleteAccountDefaultProtectConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteAccountDefaultProtectConfigurationRequest",
  }) as any as S.Schema<DeleteAccountDefaultProtectConfigurationRequest>;
export interface DeleteAccountDefaultProtectConfigurationResult {
  DefaultProtectConfigurationArn: string;
  DefaultProtectConfigurationId: string;
}
export const DeleteAccountDefaultProtectConfigurationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DefaultProtectConfigurationArn: S.String,
      DefaultProtectConfigurationId: S.String,
    }),
  ).annotate({
    identifier: "DeleteAccountDefaultProtectConfigurationResult",
  }) as any as S.Schema<DeleteAccountDefaultProtectConfigurationResult>;
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}
export const DeleteConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConfigurationSetName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteConfigurationSetRequest",
}) as any as S.Schema<DeleteConfigurationSetRequest>;
export type EventDestinationList = EventDestination[];
export const EventDestinationList = /*@__PURE__*/ S.Array(EventDestination);
export type SenderId = string;
export interface DeleteConfigurationSetResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  EventDestinations?: EventDestination[];
  DefaultMessageType?: string;
  DefaultSenderId?: string;
  DefaultMessageFeedbackEnabled?: boolean;
  CreatedTimestamp?: Date;
}
export const DeleteConfigurationSetResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetArn: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    EventDestinations: S.optional(EventDestinationList),
    DefaultMessageType: S.optional(S.String),
    DefaultSenderId: S.optional(S.String),
    DefaultMessageFeedbackEnabled: S.optional(S.Boolean),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DeleteConfigurationSetResult",
}) as any as S.Schema<DeleteConfigurationSetResult>;
export interface DeleteDefaultMessageTypeRequest {
  ConfigurationSetName: string;
}
export const DeleteDefaultMessageTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConfigurationSetName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDefaultMessageTypeRequest",
}) as any as S.Schema<DeleteDefaultMessageTypeRequest>;
export interface DeleteDefaultMessageTypeResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  MessageType?: string;
}
export const DeleteDefaultMessageTypeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetArn: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    MessageType: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteDefaultMessageTypeResult",
}) as any as S.Schema<DeleteDefaultMessageTypeResult>;
export interface DeleteDefaultSenderIdRequest {
  ConfigurationSetName: string;
}
export const DeleteDefaultSenderIdRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConfigurationSetName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDefaultSenderIdRequest",
}) as any as S.Schema<DeleteDefaultSenderIdRequest>;
export interface DeleteDefaultSenderIdResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  SenderId?: string;
}
export const DeleteDefaultSenderIdResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetArn: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    SenderId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteDefaultSenderIdResult",
}) as any as S.Schema<DeleteDefaultSenderIdResult>;
export interface DeleteEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
}
export const DeleteEventDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.String,
    EventDestinationName: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteEventDestinationRequest",
}) as any as S.Schema<DeleteEventDestinationRequest>;
export interface DeleteEventDestinationResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  EventDestination?: EventDestination;
}
export const DeleteEventDestinationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetArn: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    EventDestination: S.optional(EventDestination),
  }),
).annotate({
  identifier: "DeleteEventDestinationResult",
}) as any as S.Schema<DeleteEventDestinationResult>;
export type PhoneOrPoolIdOrArn = string;
export type Keyword = string;
export interface DeleteKeywordRequest {
  OriginationIdentity: string;
  Keyword: string;
}
export const DeleteKeywordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OriginationIdentity: S.String, Keyword: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteKeywordRequest",
}) as any as S.Schema<DeleteKeywordRequest>;
export type KeywordMessage = string;
export type KeywordAction = string;
export interface DeleteKeywordResult {
  OriginationIdentityArn?: string;
  OriginationIdentity?: string;
  Keyword?: string;
  KeywordMessage?: string;
  KeywordAction?: string;
}
export const DeleteKeywordResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OriginationIdentityArn: S.optional(S.String),
    OriginationIdentity: S.optional(S.String),
    Keyword: S.optional(S.String),
    KeywordMessage: S.optional(S.String),
    KeywordAction: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteKeywordResult",
}) as any as S.Schema<DeleteKeywordResult>;
export interface DeleteMediaMessageSpendLimitOverrideRequest {}
export const DeleteMediaMessageSpendLimitOverrideRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteMediaMessageSpendLimitOverrideRequest",
  }) as any as S.Schema<DeleteMediaMessageSpendLimitOverrideRequest>;
export type MonthlyLimit = number;
export interface DeleteMediaMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export const DeleteMediaMessageSpendLimitOverrideResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ MonthlyLimit: S.optional(S.Number) }),
  ).annotate({
    identifier: "DeleteMediaMessageSpendLimitOverrideResult",
  }) as any as S.Schema<DeleteMediaMessageSpendLimitOverrideResult>;
export type NotifyConfigurationIdOrArn = string;
export interface DeleteNotifyConfigurationRequest {
  NotifyConfigurationId: string;
}
export const DeleteNotifyConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NotifyConfigurationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteNotifyConfigurationRequest",
}) as any as S.Schema<DeleteNotifyConfigurationRequest>;
export interface DeleteNotifyConfigurationResult {
  NotifyConfigurationArn: string;
  NotifyConfigurationId: string;
  DisplayName: string;
  UseCase: string;
  DefaultTemplateId?: string;
  PoolId?: string;
  EnabledCountries?: string[];
  EnabledChannels: string[];
  Tier: string;
  TierUpgradeStatus: string;
  Status: string;
  RejectionReason?: string;
  DeletionProtectionEnabled: boolean;
  CreatedTimestamp: Date;
}
export const DeleteNotifyConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyConfigurationArn: S.String,
    NotifyConfigurationId: S.String,
    DisplayName: S.String,
    UseCase: S.String,
    DefaultTemplateId: S.optional(S.String),
    PoolId: S.optional(S.String),
    EnabledCountries: S.optional(IsoCountryCodeList),
    EnabledChannels: NotifyEnabledChannelsList,
    Tier: S.String,
    TierUpgradeStatus: S.String,
    Status: S.String,
    RejectionReason: S.optional(S.String),
    DeletionProtectionEnabled: S.Boolean,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DeleteNotifyConfigurationResult",
}) as any as S.Schema<DeleteNotifyConfigurationResult>;
export interface DeleteNotifyMessageSpendLimitOverrideRequest {}
export const DeleteNotifyMessageSpendLimitOverrideRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteNotifyMessageSpendLimitOverrideRequest",
  }) as any as S.Schema<DeleteNotifyMessageSpendLimitOverrideRequest>;
export interface DeleteNotifyMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export const DeleteNotifyMessageSpendLimitOverrideResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ MonthlyLimit: S.optional(S.Number) }),
  ).annotate({
    identifier: "DeleteNotifyMessageSpendLimitOverrideResult",
  }) as any as S.Schema<DeleteNotifyMessageSpendLimitOverrideResult>;
export interface DeleteOptedOutNumberRequest {
  OptOutListName: string;
  OptedOutNumber: string;
}
export const DeleteOptedOutNumberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OptOutListName: S.String, OptedOutNumber: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteOptedOutNumberRequest",
}) as any as S.Schema<DeleteOptedOutNumberRequest>;
export interface DeleteOptedOutNumberResult {
  OptOutListArn?: string;
  OptOutListName?: string;
  OptedOutNumber?: string;
  OptedOutTimestamp?: Date;
  EndUserOptedOut?: boolean;
}
export const DeleteOptedOutNumberResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptOutListArn: S.optional(S.String),
    OptOutListName: S.optional(S.String),
    OptedOutNumber: S.optional(S.String),
    OptedOutTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EndUserOptedOut: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "DeleteOptedOutNumberResult",
}) as any as S.Schema<DeleteOptedOutNumberResult>;
export interface DeleteOptOutListRequest {
  OptOutListName: string;
}
export const DeleteOptOutListRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OptOutListName: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteOptOutListRequest",
}) as any as S.Schema<DeleteOptOutListRequest>;
export interface DeleteOptOutListResult {
  OptOutListArn?: string;
  OptOutListName?: string;
  CreatedTimestamp?: Date;
}
export const DeleteOptOutListResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptOutListArn: S.optional(S.String),
    OptOutListName: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DeleteOptOutListResult",
}) as any as S.Schema<DeleteOptOutListResult>;
export interface DeletePoolRequest {
  PoolId: string;
}
export const DeletePoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PoolId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeletePoolRequest",
}) as any as S.Schema<DeletePoolRequest>;
export interface DeletePoolResult {
  PoolArn?: string;
  PoolId?: string;
  Status?: string;
  MessageType?: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  SharedRoutesEnabled?: boolean;
  CreatedTimestamp?: Date;
}
export const DeletePoolResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolArn: S.optional(S.String),
    PoolId: S.optional(S.String),
    Status: S.optional(S.String),
    MessageType: S.optional(S.String),
    TwoWayEnabled: S.optional(S.Boolean),
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.optional(S.Boolean),
    OptOutListName: S.optional(S.String),
    SharedRoutesEnabled: S.optional(S.Boolean),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DeletePoolResult",
}) as any as S.Schema<DeletePoolResult>;
export interface DeleteProtectConfigurationRequest {
  ProtectConfigurationId: string;
}
export const DeleteProtectConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProtectConfigurationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteProtectConfigurationRequest",
}) as any as S.Schema<DeleteProtectConfigurationRequest>;
export interface DeleteProtectConfigurationResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  CreatedTimestamp: Date;
  AccountDefault: boolean;
  DeletionProtectionEnabled: boolean;
}
export const DeleteProtectConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProtectConfigurationArn: S.String,
    ProtectConfigurationId: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    AccountDefault: S.Boolean,
    DeletionProtectionEnabled: S.Boolean,
  }),
).annotate({
  identifier: "DeleteProtectConfigurationResult",
}) as any as S.Schema<DeleteProtectConfigurationResult>;
export interface DeleteProtectConfigurationRuleSetNumberOverrideRequest {
  ProtectConfigurationId: string;
  DestinationPhoneNumber: string;
}
export const DeleteProtectConfigurationRuleSetNumberOverrideRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProtectConfigurationId: S.String,
      DestinationPhoneNumber: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteProtectConfigurationRuleSetNumberOverrideRequest",
  }) as any as S.Schema<DeleteProtectConfigurationRuleSetNumberOverrideRequest>;
export type ProtectConfigurationRuleOverrideAction = string;
export interface DeleteProtectConfigurationRuleSetNumberOverrideResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  DestinationPhoneNumber: string;
  CreatedTimestamp: Date;
  Action: string;
  IsoCountryCode?: string;
  ExpirationTimestamp?: Date;
}
export const DeleteProtectConfigurationRuleSetNumberOverrideResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProtectConfigurationArn: S.String,
      ProtectConfigurationId: S.String,
      DestinationPhoneNumber: S.String,
      CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      Action: S.String,
      IsoCountryCode: S.optional(S.String),
      ExpirationTimestamp: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
    }),
  ).annotate({
    identifier: "DeleteProtectConfigurationRuleSetNumberOverrideResult",
  }) as any as S.Schema<DeleteProtectConfigurationRuleSetNumberOverrideResult>;
export interface DeleteRcsAgentRequest {
  RcsAgentId: string;
}
export const DeleteRcsAgentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RcsAgentId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRcsAgentRequest",
}) as any as S.Schema<DeleteRcsAgentRequest>;
export interface DeleteRcsAgentResult {
  RcsAgentArn: string;
  RcsAgentId: string;
  Status: string;
  CreatedTimestamp: Date;
  DeletionProtectionEnabled: boolean;
  OptOutListName?: string;
  SelfManagedOptOutsEnabled: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  TwoWayEnabled: boolean;
  TwoWayRcsEventsEnabled?: string[];
}
export const DeleteRcsAgentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RcsAgentArn: S.String,
    RcsAgentId: S.String,
    Status: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    DeletionProtectionEnabled: S.Boolean,
    OptOutListName: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.Boolean,
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    TwoWayEnabled: S.Boolean,
    TwoWayRcsEventsEnabled: S.optional(RcsEventTypeList),
  }),
).annotate({
  identifier: "DeleteRcsAgentResult",
}) as any as S.Schema<DeleteRcsAgentResult>;
export interface DeleteRcsMessageSpendLimitOverrideRequest {}
export const DeleteRcsMessageSpendLimitOverrideRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteRcsMessageSpendLimitOverrideRequest",
  }) as any as S.Schema<DeleteRcsMessageSpendLimitOverrideRequest>;
export interface DeleteRcsMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export const DeleteRcsMessageSpendLimitOverrideResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ MonthlyLimit: S.optional(S.Number) }),
).annotate({
  identifier: "DeleteRcsMessageSpendLimitOverrideResult",
}) as any as S.Schema<DeleteRcsMessageSpendLimitOverrideResult>;
export interface DeleteRegistrationRequest {
  RegistrationId: string;
}
export const DeleteRegistrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegistrationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRegistrationRequest",
}) as any as S.Schema<DeleteRegistrationRequest>;
export interface DeleteRegistrationResult {
  RegistrationArn: string;
  RegistrationId: string;
  RegistrationType: string;
  RegistrationStatus: string;
  CurrentVersionNumber: number;
  ApprovedVersionNumber?: number;
  LatestDeniedVersionNumber?: number;
  AdditionalAttributes?: { [key: string]: string | undefined };
  CreatedTimestamp: Date;
}
export const DeleteRegistrationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationArn: S.String,
    RegistrationId: S.String,
    RegistrationType: S.String,
    RegistrationStatus: S.String,
    CurrentVersionNumber: S.Number,
    ApprovedVersionNumber: S.optional(S.Number),
    LatestDeniedVersionNumber: S.optional(S.Number),
    AdditionalAttributes: S.optional(StringMap),
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DeleteRegistrationResult",
}) as any as S.Schema<DeleteRegistrationResult>;
export type RegistrationAttachmentIdOrArn = string;
export interface DeleteRegistrationAttachmentRequest {
  RegistrationAttachmentId: string;
}
export const DeleteRegistrationAttachmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegistrationAttachmentId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRegistrationAttachmentRequest",
}) as any as S.Schema<DeleteRegistrationAttachmentRequest>;
export type AttachmentUploadErrorReason = string;
export interface DeleteRegistrationAttachmentResult {
  RegistrationAttachmentArn: string;
  RegistrationAttachmentId: string;
  AttachmentStatus: string;
  AttachmentUploadErrorReason?: string;
  CreatedTimestamp: Date;
}
export const DeleteRegistrationAttachmentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationAttachmentArn: S.String,
    RegistrationAttachmentId: S.String,
    AttachmentStatus: S.String,
    AttachmentUploadErrorReason: S.optional(S.String),
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DeleteRegistrationAttachmentResult",
}) as any as S.Schema<DeleteRegistrationAttachmentResult>;
export type FieldPath = string;
export interface DeleteRegistrationFieldValueRequest {
  RegistrationId: string;
  FieldPath: string;
}
export const DeleteRegistrationFieldValueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegistrationId: S.String, FieldPath: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteRegistrationFieldValueRequest",
}) as any as S.Schema<DeleteRegistrationFieldValueRequest>;
export type SelectChoice = string;
export type SelectChoiceList = string[];
export const SelectChoiceList = /*@__PURE__*/ S.Array(S.String);
export type TextValue = string;
export interface DeleteRegistrationFieldValueResult {
  RegistrationArn: string;
  RegistrationId: string;
  VersionNumber: number;
  FieldPath: string;
  SelectChoices?: string[];
  TextValue?: string;
  RegistrationAttachmentId?: string;
}
export const DeleteRegistrationFieldValueResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationArn: S.String,
    RegistrationId: S.String,
    VersionNumber: S.Number,
    FieldPath: S.String,
    SelectChoices: S.optional(SelectChoiceList),
    TextValue: S.optional(S.String),
    RegistrationAttachmentId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteRegistrationFieldValueResult",
}) as any as S.Schema<DeleteRegistrationFieldValueResult>;
export type AmazonResourceName = string;
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResourcePolicyRequest",
}) as any as S.Schema<DeleteResourcePolicyRequest>;
export type ResourcePolicy = string;
export interface DeleteResourcePolicyResult {
  ResourceArn?: string;
  Policy?: string;
  CreatedTimestamp?: Date;
}
export const DeleteResourcePolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    Policy: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DeleteResourcePolicyResult",
}) as any as S.Schema<DeleteResourcePolicyResult>;
export interface DeleteTextMessageSpendLimitOverrideRequest {}
export const DeleteTextMessageSpendLimitOverrideRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteTextMessageSpendLimitOverrideRequest",
  }) as any as S.Schema<DeleteTextMessageSpendLimitOverrideRequest>;
export interface DeleteTextMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export const DeleteTextMessageSpendLimitOverrideResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ MonthlyLimit: S.optional(S.Number) }),
  ).annotate({
    identifier: "DeleteTextMessageSpendLimitOverrideResult",
  }) as any as S.Schema<DeleteTextMessageSpendLimitOverrideResult>;
export type VerifiedDestinationNumberIdOrArn = string;
export interface DeleteVerifiedDestinationNumberRequest {
  VerifiedDestinationNumberId: string;
}
export const DeleteVerifiedDestinationNumberRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ VerifiedDestinationNumberId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DeleteVerifiedDestinationNumberRequest",
}) as any as S.Schema<DeleteVerifiedDestinationNumberRequest>;
export interface DeleteVerifiedDestinationNumberResult {
  VerifiedDestinationNumberArn: string;
  VerifiedDestinationNumberId: string;
  DestinationPhoneNumber: string;
  CreatedTimestamp: Date;
}
export const DeleteVerifiedDestinationNumberResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      VerifiedDestinationNumberArn: S.String,
      VerifiedDestinationNumberId: S.String,
      DestinationPhoneNumber: S.String,
      CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "DeleteVerifiedDestinationNumberResult",
}) as any as S.Schema<DeleteVerifiedDestinationNumberResult>;
export interface DeleteVoiceMessageSpendLimitOverrideRequest {}
export const DeleteVoiceMessageSpendLimitOverrideRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({}).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DeleteVoiceMessageSpendLimitOverrideRequest",
  }) as any as S.Schema<DeleteVoiceMessageSpendLimitOverrideRequest>;
export interface DeleteVoiceMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export const DeleteVoiceMessageSpendLimitOverrideResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ MonthlyLimit: S.optional(S.Number) }),
  ).annotate({
    identifier: "DeleteVoiceMessageSpendLimitOverrideResult",
  }) as any as S.Schema<DeleteVoiceMessageSpendLimitOverrideResult>;
export type NextToken = string;
export type MaxResults = number;
export interface DescribeAccountAttributesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeAccountAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAccountAttributesRequest",
}) as any as S.Schema<DescribeAccountAttributesRequest>;
export type AccountAttributeName = string;
export interface AccountAttribute {
  Name: string;
  Value: string;
}
export const AccountAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({
  identifier: "AccountAttribute",
}) as any as S.Schema<AccountAttribute>;
export type AccountAttributeList = AccountAttribute[];
export const AccountAttributeList = /*@__PURE__*/ S.Array(AccountAttribute);
export interface DescribeAccountAttributesResult {
  AccountAttributes?: AccountAttribute[];
  NextToken?: string;
}
export const DescribeAccountAttributesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountAttributes: S.optional(AccountAttributeList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeAccountAttributesResult",
}) as any as S.Schema<DescribeAccountAttributesResult>;
export interface DescribeAccountLimitsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeAccountLimitsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeAccountLimitsRequest",
}) as any as S.Schema<DescribeAccountLimitsRequest>;
export type AccountLimitName = string;
export interface AccountLimit {
  Name: string;
  Used: number;
  Max: number;
}
export const AccountLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Used: S.Number, Max: S.Number }),
).annotate({ identifier: "AccountLimit" }) as any as S.Schema<AccountLimit>;
export type AccountLimitList = AccountLimit[];
export const AccountLimitList = /*@__PURE__*/ S.Array(AccountLimit);
export interface DescribeAccountLimitsResult {
  AccountLimits?: AccountLimit[];
  NextToken?: string;
}
export const DescribeAccountLimitsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccountLimits: S.optional(AccountLimitList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeAccountLimitsResult",
}) as any as S.Schema<DescribeAccountLimitsResult>;
export type ConfigurationSetNameList = string[];
export const ConfigurationSetNameList = /*@__PURE__*/ S.Array(S.String);
export type ConfigurationSetFilterName = string;
export type FilterValue = string;
export type FilterValueList = string[];
export const FilterValueList = /*@__PURE__*/ S.Array(S.String);
export interface ConfigurationSetFilter {
  Name: string;
  Values: string[];
}
export const ConfigurationSetFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "ConfigurationSetFilter",
}) as any as S.Schema<ConfigurationSetFilter>;
export type ConfigurationSetFilterList = ConfigurationSetFilter[];
export const ConfigurationSetFilterList = /*@__PURE__*/ S.Array(
  ConfigurationSetFilter,
);
export interface DescribeConfigurationSetsRequest {
  ConfigurationSetNames?: string[];
  Filters?: ConfigurationSetFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeConfigurationSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetNames: S.optional(ConfigurationSetNameList),
    Filters: S.optional(ConfigurationSetFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeConfigurationSetsRequest",
}) as any as S.Schema<DescribeConfigurationSetsRequest>;
export interface ConfigurationSetInformation {
  ConfigurationSetArn: string;
  ConfigurationSetName: string;
  EventDestinations: EventDestination[];
  DefaultMessageType?: string;
  DefaultSenderId?: string;
  DefaultMessageFeedbackEnabled?: boolean;
  CreatedTimestamp: Date;
  ProtectConfigurationId?: string;
}
export const ConfigurationSetInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetArn: S.String,
    ConfigurationSetName: S.String,
    EventDestinations: EventDestinationList,
    DefaultMessageType: S.optional(S.String),
    DefaultSenderId: S.optional(S.String),
    DefaultMessageFeedbackEnabled: S.optional(S.Boolean),
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ProtectConfigurationId: S.optional(S.String),
  }),
).annotate({
  identifier: "ConfigurationSetInformation",
}) as any as S.Schema<ConfigurationSetInformation>;
export type ConfigurationSetInformationList = ConfigurationSetInformation[];
export const ConfigurationSetInformationList = /*@__PURE__*/ S.Array(
  ConfigurationSetInformation,
);
export interface DescribeConfigurationSetsResult {
  ConfigurationSets?: ConfigurationSetInformation[];
  NextToken?: string;
}
export const DescribeConfigurationSetsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSets: S.optional(ConfigurationSetInformationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeConfigurationSetsResult",
}) as any as S.Schema<DescribeConfigurationSetsResult>;
export type KeywordList = string[];
export const KeywordList = /*@__PURE__*/ S.Array(S.String);
export type KeywordFilterName = string;
export interface KeywordFilter {
  Name: string;
  Values: string[];
}
export const KeywordFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({ identifier: "KeywordFilter" }) as any as S.Schema<KeywordFilter>;
export type KeywordFilterList = KeywordFilter[];
export const KeywordFilterList = /*@__PURE__*/ S.Array(KeywordFilter);
export interface DescribeKeywordsRequest {
  OriginationIdentity: string;
  Keywords?: string[];
  Filters?: KeywordFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeKeywordsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OriginationIdentity: S.String,
    Keywords: S.optional(KeywordList),
    Filters: S.optional(KeywordFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeKeywordsRequest",
}) as any as S.Schema<DescribeKeywordsRequest>;
export interface KeywordInformation {
  Keyword: string;
  KeywordMessage: string;
  KeywordAction: string;
}
export const KeywordInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Keyword: S.String,
    KeywordMessage: S.String,
    KeywordAction: S.String,
  }),
).annotate({
  identifier: "KeywordInformation",
}) as any as S.Schema<KeywordInformation>;
export type KeywordInformationList = KeywordInformation[];
export const KeywordInformationList = /*@__PURE__*/ S.Array(KeywordInformation);
export interface DescribeKeywordsResult {
  OriginationIdentityArn?: string;
  OriginationIdentity?: string;
  Keywords?: KeywordInformation[];
  NextToken?: string;
}
export const DescribeKeywordsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OriginationIdentityArn: S.optional(S.String),
    OriginationIdentity: S.optional(S.String),
    Keywords: S.optional(KeywordInformationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeKeywordsResult",
}) as any as S.Schema<DescribeKeywordsResult>;
export type NotifyConfigurationIdList = string[];
export const NotifyConfigurationIdList = /*@__PURE__*/ S.Array(S.String);
export type NotifyConfigurationFilterName = string;
export interface NotifyConfigurationFilter {
  Name: string;
  Values: string[];
}
export const NotifyConfigurationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "NotifyConfigurationFilter",
}) as any as S.Schema<NotifyConfigurationFilter>;
export type NotifyConfigurationFilterList = NotifyConfigurationFilter[];
export const NotifyConfigurationFilterList = /*@__PURE__*/ S.Array(
  NotifyConfigurationFilter,
);
export interface DescribeNotifyConfigurationsRequest {
  NotifyConfigurationIds?: string[];
  Filters?: NotifyConfigurationFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeNotifyConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyConfigurationIds: S.optional(NotifyConfigurationIdList),
    Filters: S.optional(NotifyConfigurationFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeNotifyConfigurationsRequest",
}) as any as S.Schema<DescribeNotifyConfigurationsRequest>;
export interface NotifyConfigurationInformation {
  NotifyConfigurationArn: string;
  NotifyConfigurationId: string;
  DisplayName: string;
  UseCase: string;
  DefaultTemplateId?: string;
  PoolId?: string;
  EnabledCountries?: string[];
  EnabledChannels: string[];
  Tier: string;
  TierUpgradeStatus: string;
  Status: string;
  RejectionReason?: string;
  DeletionProtectionEnabled: boolean;
  CreatedTimestamp: Date;
}
export const NotifyConfigurationInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyConfigurationArn: S.String,
    NotifyConfigurationId: S.String,
    DisplayName: S.String,
    UseCase: S.String,
    DefaultTemplateId: S.optional(S.String),
    PoolId: S.optional(S.String),
    EnabledCountries: S.optional(IsoCountryCodeList),
    EnabledChannels: NotifyEnabledChannelsList,
    Tier: S.String,
    TierUpgradeStatus: S.String,
    Status: S.String,
    RejectionReason: S.optional(S.String),
    DeletionProtectionEnabled: S.Boolean,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "NotifyConfigurationInformation",
}) as any as S.Schema<NotifyConfigurationInformation>;
export type NotifyConfigurationInformationList =
  NotifyConfigurationInformation[];
export const NotifyConfigurationInformationList = /*@__PURE__*/ S.Array(
  NotifyConfigurationInformation,
);
export interface DescribeNotifyConfigurationsResult {
  NotifyConfigurations?: NotifyConfigurationInformation[];
  NextToken?: string;
}
export const DescribeNotifyConfigurationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyConfigurations: S.optional(NotifyConfigurationInformationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeNotifyConfigurationsResult",
}) as any as S.Schema<DescribeNotifyConfigurationsResult>;
export type NotifyTemplateIdList = string[];
export const NotifyTemplateIdList = /*@__PURE__*/ S.Array(S.String);
export type NotifyTemplateFilterName = string;
export interface NotifyTemplateFilter {
  Name: string;
  Values: string[];
}
export const NotifyTemplateFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "NotifyTemplateFilter",
}) as any as S.Schema<NotifyTemplateFilter>;
export type NotifyTemplateFilterList = NotifyTemplateFilter[];
export const NotifyTemplateFilterList =
  /*@__PURE__*/ S.Array(NotifyTemplateFilter);
export interface DescribeNotifyTemplatesRequest {
  TemplateIds?: string[];
  Filters?: NotifyTemplateFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeNotifyTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateIds: S.optional(NotifyTemplateIdList),
    Filters: S.optional(NotifyTemplateFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeNotifyTemplatesRequest",
}) as any as S.Schema<DescribeNotifyTemplatesRequest>;
export type NotifyTemplateVersion = number;
export type NotifyTemplateType = string;
export type NumberCapabilityList = string[];
export const NumberCapabilityList = /*@__PURE__*/ S.Array(S.String);
export type NotifyConfigurationTierList = string[];
export const NotifyConfigurationTierList = /*@__PURE__*/ S.Array(S.String);
export type NotifyTemplateStatus = string;
export type NotifyLanguageCode = string;
export type TemplateContent = string;
export type TemplateVariableType = string;
export type TemplateVariableSource = string;
export interface TemplateVariableMetadata {
  Type: string;
  Required: boolean;
  Description?: string;
  MaxLength?: number;
  MinValue?: number;
  MaxValue?: number;
  DefaultValue?: string;
  Pattern?: string;
  Sample?: string;
  Source?: string;
}
export const TemplateVariableMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.String,
    Required: S.Boolean,
    Description: S.optional(S.String),
    MaxLength: S.optional(S.Number),
    MinValue: S.optional(S.Number),
    MaxValue: S.optional(S.Number),
    DefaultValue: S.optional(S.String),
    Pattern: S.optional(S.String),
    Sample: S.optional(S.String),
    Source: S.optional(S.String),
  }),
).annotate({
  identifier: "TemplateVariableMetadata",
}) as any as S.Schema<TemplateVariableMetadata>;
export type TemplateVariablesMap = {
  [key: string]: TemplateVariableMetadata | undefined;
};
export const TemplateVariablesMap = /*@__PURE__*/ S.Record(
  S.String,
  TemplateVariableMetadata.pipe(S.optional),
);
export type VoiceId = string;
export type VoiceIdList = string[];
export const VoiceIdList = /*@__PURE__*/ S.Array(S.String);
export interface NotifyTemplateInformation {
  TemplateId: string;
  Version: number;
  TemplateType: string;
  Channels: string[];
  TierAccess?: string[];
  Status?: string;
  SupportedCountries?: string[];
  LanguageCode?: string;
  Content?: string;
  Variables?: { [key: string]: TemplateVariableMetadata | undefined };
  SupportedVoiceIds?: string[];
  CreatedTimestamp: Date;
}
export const NotifyTemplateInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateId: S.String,
    Version: S.Number,
    TemplateType: S.String,
    Channels: NumberCapabilityList,
    TierAccess: S.optional(NotifyConfigurationTierList),
    Status: S.optional(S.String),
    SupportedCountries: S.optional(IsoCountryCodeList),
    LanguageCode: S.optional(S.String),
    Content: S.optional(S.String),
    Variables: S.optional(TemplateVariablesMap),
    SupportedVoiceIds: S.optional(VoiceIdList),
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "NotifyTemplateInformation",
}) as any as S.Schema<NotifyTemplateInformation>;
export type NotifyTemplateInformationList = NotifyTemplateInformation[];
export const NotifyTemplateInformationList = /*@__PURE__*/ S.Array(
  NotifyTemplateInformation,
);
export interface DescribeNotifyTemplatesResult {
  NotifyTemplates?: NotifyTemplateInformation[];
  NextToken?: string;
}
export const DescribeNotifyTemplatesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyTemplates: S.optional(NotifyTemplateInformationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeNotifyTemplatesResult",
}) as any as S.Schema<DescribeNotifyTemplatesResult>;
export type OptedOutNumberList = string[];
export const OptedOutNumberList = /*@__PURE__*/ S.Array(S.String);
export type OptedOutFilterName = string;
export interface OptedOutFilter {
  Name: string;
  Values: string[];
}
export const OptedOutFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({ identifier: "OptedOutFilter" }) as any as S.Schema<OptedOutFilter>;
export type OptedOutFilterList = OptedOutFilter[];
export const OptedOutFilterList = /*@__PURE__*/ S.Array(OptedOutFilter);
export interface DescribeOptedOutNumbersRequest {
  OptOutListName: string;
  OptedOutNumbers?: string[];
  Filters?: OptedOutFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeOptedOutNumbersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptOutListName: S.String,
    OptedOutNumbers: S.optional(OptedOutNumberList),
    Filters: S.optional(OptedOutFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeOptedOutNumbersRequest",
}) as any as S.Schema<DescribeOptedOutNumbersRequest>;
export interface OptedOutNumberInformation {
  OptedOutNumber: string;
  OptedOutTimestamp: Date;
  EndUserOptedOut: boolean;
}
export const OptedOutNumberInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptedOutNumber: S.String,
    OptedOutTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndUserOptedOut: S.Boolean,
  }),
).annotate({
  identifier: "OptedOutNumberInformation",
}) as any as S.Schema<OptedOutNumberInformation>;
export type OptedOutNumberInformationList = OptedOutNumberInformation[];
export const OptedOutNumberInformationList = /*@__PURE__*/ S.Array(
  OptedOutNumberInformation,
);
export interface DescribeOptedOutNumbersResult {
  OptOutListArn?: string;
  OptOutListName?: string;
  OptedOutNumbers?: OptedOutNumberInformation[];
  NextToken?: string;
}
export const DescribeOptedOutNumbersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptOutListArn: S.optional(S.String),
    OptOutListName: S.optional(S.String),
    OptedOutNumbers: S.optional(OptedOutNumberInformationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeOptedOutNumbersResult",
}) as any as S.Schema<DescribeOptedOutNumbersResult>;
export type OptOutListNameList = string[];
export const OptOutListNameList = /*@__PURE__*/ S.Array(S.String);
export type Owner = string;
export interface DescribeOptOutListsRequest {
  OptOutListNames?: string[];
  NextToken?: string;
  MaxResults?: number;
  Owner?: string;
}
export const DescribeOptOutListsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptOutListNames: S.optional(OptOutListNameList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Owner: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeOptOutListsRequest",
}) as any as S.Schema<DescribeOptOutListsRequest>;
export interface OptOutListInformation {
  OptOutListArn: string;
  OptOutListName: string;
  CreatedTimestamp: Date;
}
export const OptOutListInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptOutListArn: S.String,
    OptOutListName: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "OptOutListInformation",
}) as any as S.Schema<OptOutListInformation>;
export type OptOutListInformationList = OptOutListInformation[];
export const OptOutListInformationList = /*@__PURE__*/ S.Array(
  OptOutListInformation,
);
export interface DescribeOptOutListsResult {
  OptOutLists?: OptOutListInformation[];
  NextToken?: string;
}
export const DescribeOptOutListsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptOutLists: S.optional(OptOutListInformationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeOptOutListsResult",
}) as any as S.Schema<DescribeOptOutListsResult>;
export type PhoneNumberIdOrArn = string;
export type PhoneNumberIdList = string[];
export const PhoneNumberIdList = /*@__PURE__*/ S.Array(S.String);
export type PhoneNumberFilterName = string;
export interface PhoneNumberFilter {
  Name: string;
  Values: string[];
}
export const PhoneNumberFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "PhoneNumberFilter",
}) as any as S.Schema<PhoneNumberFilter>;
export type PhoneNumberFilterList = PhoneNumberFilter[];
export const PhoneNumberFilterList = /*@__PURE__*/ S.Array(PhoneNumberFilter);
export interface DescribePhoneNumbersRequest {
  PhoneNumberIds?: string[];
  Filters?: PhoneNumberFilter[];
  NextToken?: string;
  MaxResults?: number;
  Owner?: string;
}
export const DescribePhoneNumbersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberIds: S.optional(PhoneNumberIdList),
    Filters: S.optional(PhoneNumberFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Owner: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribePhoneNumbersRequest",
}) as any as S.Schema<DescribePhoneNumbersRequest>;
export type NumberStatus = string;
export type NumberType = string;
export interface PhoneNumberInformation {
  PhoneNumberArn: string;
  PhoneNumberId?: string;
  PhoneNumber: string;
  Status: string;
  IsoCountryCode: string;
  MessageType: string;
  NumberCapabilities: string[];
  NumberType: string;
  MonthlyLeasingPrice: string;
  TwoWayEnabled: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled: boolean;
  OptOutListName: string;
  InternationalSendingEnabled?: boolean;
  DeletionProtectionEnabled: boolean;
  PoolId?: string;
  RegistrationId?: string;
  CreatedTimestamp: Date;
}
export const PhoneNumberInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberArn: S.String,
    PhoneNumberId: S.optional(S.String),
    PhoneNumber: S.String,
    Status: S.String,
    IsoCountryCode: S.String,
    MessageType: S.String,
    NumberCapabilities: NumberCapabilityList,
    NumberType: S.String,
    MonthlyLeasingPrice: S.String,
    TwoWayEnabled: S.Boolean,
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.Boolean,
    OptOutListName: S.String,
    InternationalSendingEnabled: S.optional(S.Boolean),
    DeletionProtectionEnabled: S.Boolean,
    PoolId: S.optional(S.String),
    RegistrationId: S.optional(S.String),
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "PhoneNumberInformation",
}) as any as S.Schema<PhoneNumberInformation>;
export type PhoneNumberInformationList = PhoneNumberInformation[];
export const PhoneNumberInformationList = /*@__PURE__*/ S.Array(
  PhoneNumberInformation,
);
export interface DescribePhoneNumbersResult {
  PhoneNumbers?: PhoneNumberInformation[];
  NextToken?: string;
}
export const DescribePhoneNumbersResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumbers: S.optional(PhoneNumberInformationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribePhoneNumbersResult",
}) as any as S.Schema<DescribePhoneNumbersResult>;
export type PoolIdList = string[];
export const PoolIdList = /*@__PURE__*/ S.Array(S.String);
export type PoolFilterName = string;
export interface PoolFilter {
  Name: string;
  Values: string[];
}
export const PoolFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({ identifier: "PoolFilter" }) as any as S.Schema<PoolFilter>;
export type PoolFilterList = PoolFilter[];
export const PoolFilterList = /*@__PURE__*/ S.Array(PoolFilter);
export interface DescribePoolsRequest {
  PoolIds?: string[];
  Filters?: PoolFilter[];
  NextToken?: string;
  MaxResults?: number;
  Owner?: string;
}
export const DescribePoolsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolIds: S.optional(PoolIdList),
    Filters: S.optional(PoolFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Owner: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribePoolsRequest",
}) as any as S.Schema<DescribePoolsRequest>;
export interface PoolInformation {
  PoolArn: string;
  PoolId: string;
  Status: string;
  MessageType: string;
  TwoWayEnabled: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled: boolean;
  OptOutListName: string;
  SharedRoutesEnabled: boolean;
  DeletionProtectionEnabled: boolean;
  CreatedTimestamp: Date;
}
export const PoolInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolArn: S.String,
    PoolId: S.String,
    Status: S.String,
    MessageType: S.String,
    TwoWayEnabled: S.Boolean,
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.Boolean,
    OptOutListName: S.String,
    SharedRoutesEnabled: S.Boolean,
    DeletionProtectionEnabled: S.Boolean,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "PoolInformation",
}) as any as S.Schema<PoolInformation>;
export type PoolInformationList = PoolInformation[];
export const PoolInformationList = /*@__PURE__*/ S.Array(PoolInformation);
export interface DescribePoolsResult {
  Pools?: PoolInformation[];
  NextToken?: string;
}
export const DescribePoolsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Pools: S.optional(PoolInformationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribePoolsResult",
}) as any as S.Schema<DescribePoolsResult>;
export type ProtectConfigurationIdList = string[];
export const ProtectConfigurationIdList = /*@__PURE__*/ S.Array(S.String);
export type ProtectConfigurationFilterName = string;
export interface ProtectConfigurationFilter {
  Name: string;
  Values: string[];
}
export const ProtectConfigurationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "ProtectConfigurationFilter",
}) as any as S.Schema<ProtectConfigurationFilter>;
export type ProtectConfigurationFilterList = ProtectConfigurationFilter[];
export const ProtectConfigurationFilterList = /*@__PURE__*/ S.Array(
  ProtectConfigurationFilter,
);
export interface DescribeProtectConfigurationsRequest {
  ProtectConfigurationIds?: string[];
  Filters?: ProtectConfigurationFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeProtectConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProtectConfigurationIds: S.optional(ProtectConfigurationIdList),
      Filters: S.optional(ProtectConfigurationFilterList),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeProtectConfigurationsRequest",
}) as any as S.Schema<DescribeProtectConfigurationsRequest>;
export interface ProtectConfigurationInformation {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  CreatedTimestamp: Date;
  AccountDefault: boolean;
  DeletionProtectionEnabled: boolean;
}
export const ProtectConfigurationInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProtectConfigurationArn: S.String,
    ProtectConfigurationId: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    AccountDefault: S.Boolean,
    DeletionProtectionEnabled: S.Boolean,
  }),
).annotate({
  identifier: "ProtectConfigurationInformation",
}) as any as S.Schema<ProtectConfigurationInformation>;
export type ProtectConfigurationInformationList =
  ProtectConfigurationInformation[];
export const ProtectConfigurationInformationList = /*@__PURE__*/ S.Array(
  ProtectConfigurationInformation,
);
export interface DescribeProtectConfigurationsResult {
  ProtectConfigurations?: ProtectConfigurationInformation[];
  NextToken?: string;
}
export const DescribeProtectConfigurationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProtectConfigurations: S.optional(ProtectConfigurationInformationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeProtectConfigurationsResult",
}) as any as S.Schema<DescribeProtectConfigurationsResult>;
export type CountryLaunchStatusFilterName = string;
export interface CountryLaunchStatusFilter {
  Name: string;
  Values: string[];
}
export const CountryLaunchStatusFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "CountryLaunchStatusFilter",
}) as any as S.Schema<CountryLaunchStatusFilter>;
export type CountryLaunchStatusFilterList = CountryLaunchStatusFilter[];
export const CountryLaunchStatusFilterList = /*@__PURE__*/ S.Array(
  CountryLaunchStatusFilter,
);
export interface DescribeRcsAgentCountryLaunchStatusRequest {
  RcsAgentId: string;
  IsoCountryCodes?: string[];
  Filters?: CountryLaunchStatusFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeRcsAgentCountryLaunchStatusRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RcsAgentId: S.String,
      IsoCountryCodes: S.optional(IsoCountryCodeList),
      Filters: S.optional(CountryLaunchStatusFilterList),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeRcsAgentCountryLaunchStatusRequest",
  }) as any as S.Schema<DescribeRcsAgentCountryLaunchStatusRequest>;
export type CountryLaunchStatus = string;
export type CarrierStatus = string;
export interface CarrierStatusInformation {
  CarrierName: string;
  Status: string;
}
export const CarrierStatusInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CarrierName: S.String, Status: S.String }),
).annotate({
  identifier: "CarrierStatusInformation",
}) as any as S.Schema<CarrierStatusInformation>;
export type CarrierStatusInformationList = CarrierStatusInformation[];
export const CarrierStatusInformationList = /*@__PURE__*/ S.Array(
  CarrierStatusInformation,
);
export interface CountryLaunchStatusInformation {
  IsoCountryCode: string;
  Status: string;
  RcsPlatformId?: string;
  RegistrationId: string;
  CarrierStatus: CarrierStatusInformation[];
}
export const CountryLaunchStatusInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsoCountryCode: S.String,
    Status: S.String,
    RcsPlatformId: S.optional(S.String),
    RegistrationId: S.String,
    CarrierStatus: CarrierStatusInformationList,
  }),
).annotate({
  identifier: "CountryLaunchStatusInformation",
}) as any as S.Schema<CountryLaunchStatusInformation>;
export type CountryLaunchStatusInformationList =
  CountryLaunchStatusInformation[];
export const CountryLaunchStatusInformationList = /*@__PURE__*/ S.Array(
  CountryLaunchStatusInformation,
);
export interface DescribeRcsAgentCountryLaunchStatusResult {
  RcsAgentId: string;
  RcsAgentArn: string;
  CountryLaunchStatus?: CountryLaunchStatusInformation[];
  NextToken?: string;
}
export const DescribeRcsAgentCountryLaunchStatusResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RcsAgentId: S.String,
      RcsAgentArn: S.String,
      CountryLaunchStatus: S.optional(CountryLaunchStatusInformationList),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeRcsAgentCountryLaunchStatusResult",
  }) as any as S.Schema<DescribeRcsAgentCountryLaunchStatusResult>;
export type RcsAgentIdList = string[];
export const RcsAgentIdList = /*@__PURE__*/ S.Array(S.String);
export type RcsAgentFilterName = string;
export interface RcsAgentFilter {
  Name: string;
  Values: string[];
}
export const RcsAgentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({ identifier: "RcsAgentFilter" }) as any as S.Schema<RcsAgentFilter>;
export type RcsAgentFilterList = RcsAgentFilter[];
export const RcsAgentFilterList = /*@__PURE__*/ S.Array(RcsAgentFilter);
export interface DescribeRcsAgentsRequest {
  RcsAgentIds?: string[];
  Owner?: string;
  Filters?: RcsAgentFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeRcsAgentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RcsAgentIds: S.optional(RcsAgentIdList),
    Owner: S.optional(S.String),
    Filters: S.optional(RcsAgentFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeRcsAgentsRequest",
}) as any as S.Schema<DescribeRcsAgentsRequest>;
export type TestingAgentStatus = string;
export interface TestingAgentInformation {
  Status: string;
  TestingAgentId?: string;
  RegistrationId: string;
}
export const TestingAgentInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.String,
    TestingAgentId: S.optional(S.String),
    RegistrationId: S.String,
  }),
).annotate({
  identifier: "TestingAgentInformation",
}) as any as S.Schema<TestingAgentInformation>;
export interface RcsAgentInformation {
  RcsAgentArn: string;
  RcsAgentId: string;
  Status: string;
  CreatedTimestamp: Date;
  DeletionProtectionEnabled: boolean;
  OptOutListName?: string;
  SelfManagedOptOutsEnabled: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  TwoWayEnabled: boolean;
  PoolId?: string;
  TwoWayMediaS3BucketName?: string;
  TwoWayMediaS3KeyPrefix?: string;
  TwoWayMediaS3Role?: string;
  TwoWayRcsEventsEnabled?: string[];
  TestingAgent?: TestingAgentInformation;
}
export const RcsAgentInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RcsAgentArn: S.String,
    RcsAgentId: S.String,
    Status: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    DeletionProtectionEnabled: S.Boolean,
    OptOutListName: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.Boolean,
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    TwoWayEnabled: S.Boolean,
    PoolId: S.optional(S.String),
    TwoWayMediaS3BucketName: S.optional(S.String),
    TwoWayMediaS3KeyPrefix: S.optional(S.String),
    TwoWayMediaS3Role: S.optional(S.String),
    TwoWayRcsEventsEnabled: S.optional(RcsEventTypeList),
    TestingAgent: S.optional(TestingAgentInformation),
  }),
).annotate({
  identifier: "RcsAgentInformation",
}) as any as S.Schema<RcsAgentInformation>;
export type RcsAgentInformationList = RcsAgentInformation[];
export const RcsAgentInformationList =
  /*@__PURE__*/ S.Array(RcsAgentInformation);
export interface DescribeRcsAgentsResult {
  RcsAgents?: RcsAgentInformation[];
  NextToken?: string;
}
export const DescribeRcsAgentsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RcsAgents: S.optional(RcsAgentInformationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeRcsAgentsResult",
}) as any as S.Schema<DescribeRcsAgentsResult>;
export type RegistrationAttachmentIdList = string[];
export const RegistrationAttachmentIdList = /*@__PURE__*/ S.Array(S.String);
export type RegistrationAttachmentFilterName = string;
export interface RegistrationAttachmentFilter {
  Name: string;
  Values: string[];
}
export const RegistrationAttachmentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "RegistrationAttachmentFilter",
}) as any as S.Schema<RegistrationAttachmentFilter>;
export type RegistrationAttachmentFilterList = RegistrationAttachmentFilter[];
export const RegistrationAttachmentFilterList = /*@__PURE__*/ S.Array(
  RegistrationAttachmentFilter,
);
export interface DescribeRegistrationAttachmentsRequest {
  RegistrationAttachmentIds?: string[];
  Filters?: RegistrationAttachmentFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeRegistrationAttachmentsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RegistrationAttachmentIds: S.optional(RegistrationAttachmentIdList),
      Filters: S.optional(RegistrationAttachmentFilterList),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeRegistrationAttachmentsRequest",
}) as any as S.Schema<DescribeRegistrationAttachmentsRequest>;
export interface RegistrationAttachmentsInformation {
  RegistrationAttachmentArn: string;
  RegistrationAttachmentId: string;
  AttachmentStatus: string;
  AttachmentUploadErrorReason?: string;
  CreatedTimestamp: Date;
  AttachmentUrl?: string;
}
export const RegistrationAttachmentsInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationAttachmentArn: S.String,
    RegistrationAttachmentId: S.String,
    AttachmentStatus: S.String,
    AttachmentUploadErrorReason: S.optional(S.String),
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    AttachmentUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistrationAttachmentsInformation",
}) as any as S.Schema<RegistrationAttachmentsInformation>;
export type RegistrationAttachmentsInformationList =
  RegistrationAttachmentsInformation[];
export const RegistrationAttachmentsInformationList = /*@__PURE__*/ S.Array(
  RegistrationAttachmentsInformation,
);
export interface DescribeRegistrationAttachmentsResult {
  RegistrationAttachments: RegistrationAttachmentsInformation[];
  NextToken?: string;
}
export const DescribeRegistrationAttachmentsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RegistrationAttachments: RegistrationAttachmentsInformationList,
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeRegistrationAttachmentsResult",
}) as any as S.Schema<DescribeRegistrationAttachmentsResult>;
export type SectionPath = string;
export type FieldPathList = string[];
export const FieldPathList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeRegistrationFieldDefinitionsRequest {
  RegistrationType: string;
  SectionPath?: string;
  FieldPaths?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeRegistrationFieldDefinitionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RegistrationType: S.String,
      SectionPath: S.optional(S.String),
      FieldPaths: S.optional(FieldPathList),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeRegistrationFieldDefinitionsRequest",
  }) as any as S.Schema<DescribeRegistrationFieldDefinitionsRequest>;
export type FieldType = string;
export type FieldRequirement = string;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface SelectValidation {
  MinChoices: number;
  MaxChoices: number;
  Options: string[];
}
export const SelectValidation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MinChoices: S.Number, MaxChoices: S.Number, Options: StringList }),
).annotate({
  identifier: "SelectValidation",
}) as any as S.Schema<SelectValidation>;
export interface TextValidation {
  MinLength: number;
  MaxLength: number;
  Pattern: string;
}
export const TextValidation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MinLength: S.Number, MaxLength: S.Number, Pattern: S.String }),
).annotate({ identifier: "TextValidation" }) as any as S.Schema<TextValidation>;
export interface SelectOptionDescription {
  Option: string;
  Title?: string;
  Description?: string;
}
export const SelectOptionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Option: S.String,
    Title: S.optional(S.String),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "SelectOptionDescription",
}) as any as S.Schema<SelectOptionDescription>;
export type SelectOptionDescriptionsList = SelectOptionDescription[];
export const SelectOptionDescriptionsList = /*@__PURE__*/ S.Array(
  SelectOptionDescription,
);
export interface RegistrationFieldDisplayHints {
  Title: string;
  ShortDescription: string;
  LongDescription?: string;
  DocumentationTitle?: string;
  DocumentationLink?: string;
  SelectOptionDescriptions?: SelectOptionDescription[];
  TextValidationDescription?: string;
  ExampleTextValue?: string;
}
export const RegistrationFieldDisplayHints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.String,
    ShortDescription: S.String,
    LongDescription: S.optional(S.String),
    DocumentationTitle: S.optional(S.String),
    DocumentationLink: S.optional(S.String),
    SelectOptionDescriptions: S.optional(SelectOptionDescriptionsList),
    TextValidationDescription: S.optional(S.String),
    ExampleTextValue: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistrationFieldDisplayHints",
}) as any as S.Schema<RegistrationFieldDisplayHints>;
export interface RegistrationFieldDefinition {
  SectionPath: string;
  FieldPath: string;
  FieldType: string;
  FieldRequirement: string;
  SelectValidation?: SelectValidation;
  TextValidation?: TextValidation;
  DisplayHints: RegistrationFieldDisplayHints;
}
export const RegistrationFieldDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SectionPath: S.String,
    FieldPath: S.String,
    FieldType: S.String,
    FieldRequirement: S.String,
    SelectValidation: S.optional(SelectValidation),
    TextValidation: S.optional(TextValidation),
    DisplayHints: RegistrationFieldDisplayHints,
  }),
).annotate({
  identifier: "RegistrationFieldDefinition",
}) as any as S.Schema<RegistrationFieldDefinition>;
export type RegistrationFieldDefinitionList = RegistrationFieldDefinition[];
export const RegistrationFieldDefinitionList = /*@__PURE__*/ S.Array(
  RegistrationFieldDefinition,
);
export interface DescribeRegistrationFieldDefinitionsResult {
  RegistrationType: string;
  RegistrationFieldDefinitions: RegistrationFieldDefinition[];
  NextToken?: string;
}
export const DescribeRegistrationFieldDefinitionsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RegistrationType: S.String,
      RegistrationFieldDefinitions: RegistrationFieldDefinitionList,
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeRegistrationFieldDefinitionsResult",
  }) as any as S.Schema<DescribeRegistrationFieldDefinitionsResult>;
export interface DescribeRegistrationFieldValuesRequest {
  RegistrationId: string;
  VersionNumber?: number;
  SectionPath?: string;
  FieldPaths?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeRegistrationFieldValuesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RegistrationId: S.String,
      VersionNumber: S.optional(S.Number),
      SectionPath: S.optional(S.String),
      FieldPaths: S.optional(FieldPathList),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeRegistrationFieldValuesRequest",
}) as any as S.Schema<DescribeRegistrationFieldValuesRequest>;
export interface RegistrationFieldValueInformation {
  FieldPath: string;
  SelectChoices?: string[];
  TextValue?: string;
  RegistrationAttachmentId?: string;
  DeniedReason?: string;
  Feedback?: string;
}
export const RegistrationFieldValueInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FieldPath: S.String,
    SelectChoices: S.optional(SelectChoiceList),
    TextValue: S.optional(S.String),
    RegistrationAttachmentId: S.optional(S.String),
    DeniedReason: S.optional(S.String),
    Feedback: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistrationFieldValueInformation",
}) as any as S.Schema<RegistrationFieldValueInformation>;
export type RegistrationFieldValueInformationList =
  RegistrationFieldValueInformation[];
export const RegistrationFieldValueInformationList = /*@__PURE__*/ S.Array(
  RegistrationFieldValueInformation,
);
export interface DescribeRegistrationFieldValuesResult {
  RegistrationArn: string;
  RegistrationId: string;
  VersionNumber: number;
  RegistrationFieldValues: RegistrationFieldValueInformation[];
  NextToken?: string;
}
export const DescribeRegistrationFieldValuesResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RegistrationArn: S.String,
      RegistrationId: S.String,
      VersionNumber: S.Number,
      RegistrationFieldValues: RegistrationFieldValueInformationList,
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeRegistrationFieldValuesResult",
}) as any as S.Schema<DescribeRegistrationFieldValuesResult>;
export type RegistrationIdList = string[];
export const RegistrationIdList = /*@__PURE__*/ S.Array(S.String);
export type RegistrationFilterName = string;
export interface RegistrationFilter {
  Name: string;
  Values: string[];
}
export const RegistrationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "RegistrationFilter",
}) as any as S.Schema<RegistrationFilter>;
export type RegistrationFilterList = RegistrationFilter[];
export const RegistrationFilterList = /*@__PURE__*/ S.Array(RegistrationFilter);
export interface DescribeRegistrationsRequest {
  RegistrationIds?: string[];
  Filters?: RegistrationFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeRegistrationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationIds: S.optional(RegistrationIdList),
    Filters: S.optional(RegistrationFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeRegistrationsRequest",
}) as any as S.Schema<DescribeRegistrationsRequest>;
export interface RegistrationInformation {
  RegistrationArn: string;
  RegistrationId: string;
  RegistrationType: string;
  RegistrationStatus: string;
  CurrentVersionNumber: number;
  ApprovedVersionNumber?: number;
  LatestDeniedVersionNumber?: number;
  AdditionalAttributes?: { [key: string]: string | undefined };
  CreatedTimestamp: Date;
}
export const RegistrationInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationArn: S.String,
    RegistrationId: S.String,
    RegistrationType: S.String,
    RegistrationStatus: S.String,
    CurrentVersionNumber: S.Number,
    ApprovedVersionNumber: S.optional(S.Number),
    LatestDeniedVersionNumber: S.optional(S.Number),
    AdditionalAttributes: S.optional(StringMap),
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "RegistrationInformation",
}) as any as S.Schema<RegistrationInformation>;
export type RegistrationInformationList = RegistrationInformation[];
export const RegistrationInformationList = /*@__PURE__*/ S.Array(
  RegistrationInformation,
);
export interface DescribeRegistrationsResult {
  Registrations: RegistrationInformation[];
  NextToken?: string;
}
export const DescribeRegistrationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Registrations: RegistrationInformationList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeRegistrationsResult",
}) as any as S.Schema<DescribeRegistrationsResult>;
export type SectionPathList = string[];
export const SectionPathList = /*@__PURE__*/ S.Array(S.String);
export interface DescribeRegistrationSectionDefinitionsRequest {
  RegistrationType: string;
  SectionPaths?: string[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeRegistrationSectionDefinitionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RegistrationType: S.String,
      SectionPaths: S.optional(SectionPathList),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeRegistrationSectionDefinitionsRequest",
  }) as any as S.Schema<DescribeRegistrationSectionDefinitionsRequest>;
export interface RegistrationSectionDisplayHints {
  Title: string;
  ShortDescription: string;
  LongDescription?: string;
  DocumentationTitle?: string;
  DocumentationLink?: string;
}
export const RegistrationSectionDisplayHints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.String,
    ShortDescription: S.String,
    LongDescription: S.optional(S.String),
    DocumentationTitle: S.optional(S.String),
    DocumentationLink: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistrationSectionDisplayHints",
}) as any as S.Schema<RegistrationSectionDisplayHints>;
export interface RegistrationSectionDefinition {
  SectionPath: string;
  DisplayHints: RegistrationSectionDisplayHints;
}
export const RegistrationSectionDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SectionPath: S.String,
    DisplayHints: RegistrationSectionDisplayHints,
  }),
).annotate({
  identifier: "RegistrationSectionDefinition",
}) as any as S.Schema<RegistrationSectionDefinition>;
export type RegistrationSectionDefinitionList = RegistrationSectionDefinition[];
export const RegistrationSectionDefinitionList = /*@__PURE__*/ S.Array(
  RegistrationSectionDefinition,
);
export interface DescribeRegistrationSectionDefinitionsResult {
  RegistrationType: string;
  RegistrationSectionDefinitions: RegistrationSectionDefinition[];
  NextToken?: string;
}
export const DescribeRegistrationSectionDefinitionsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RegistrationType: S.String,
      RegistrationSectionDefinitions: RegistrationSectionDefinitionList,
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeRegistrationSectionDefinitionsResult",
  }) as any as S.Schema<DescribeRegistrationSectionDefinitionsResult>;
export type RegistrationTypeList = string[];
export const RegistrationTypeList = /*@__PURE__*/ S.Array(S.String);
export type RegistrationTypeFilterName = string;
export interface RegistrationTypeFilter {
  Name: string;
  Values: string[];
}
export const RegistrationTypeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "RegistrationTypeFilter",
}) as any as S.Schema<RegistrationTypeFilter>;
export type RegistrationTypeFilterList = RegistrationTypeFilter[];
export const RegistrationTypeFilterList = /*@__PURE__*/ S.Array(
  RegistrationTypeFilter,
);
export interface DescribeRegistrationTypeDefinitionsRequest {
  RegistrationTypes?: string[];
  Filters?: RegistrationTypeFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeRegistrationTypeDefinitionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RegistrationTypes: S.optional(RegistrationTypeList),
      Filters: S.optional(RegistrationTypeFilterList),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeRegistrationTypeDefinitionsRequest",
  }) as any as S.Schema<DescribeRegistrationTypeDefinitionsRequest>;
export type RegistrationAssociationBehavior = string;
export type RegistrationDisassociationBehavior = string;
export interface SupportedAssociation {
  ResourceType: string;
  IsoCountryCode?: string;
  AssociationBehavior: string;
  DisassociationBehavior: string;
}
export const SupportedAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceType: S.String,
    IsoCountryCode: S.optional(S.String),
    AssociationBehavior: S.String,
    DisassociationBehavior: S.String,
  }),
).annotate({
  identifier: "SupportedAssociation",
}) as any as S.Schema<SupportedAssociation>;
export type SupportedAssociationList = SupportedAssociation[];
export const SupportedAssociationList =
  /*@__PURE__*/ S.Array(SupportedAssociation);
export interface RegistrationTypeDisplayHints {
  Title: string;
  ShortDescription?: string;
  LongDescription?: string;
  DocumentationTitle?: string;
  DocumentationLink?: string;
}
export const RegistrationTypeDisplayHints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.String,
    ShortDescription: S.optional(S.String),
    LongDescription: S.optional(S.String),
    DocumentationTitle: S.optional(S.String),
    DocumentationLink: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistrationTypeDisplayHints",
}) as any as S.Schema<RegistrationTypeDisplayHints>;
export interface RegistrationTypeDefinition {
  RegistrationType: string;
  SupportedAssociations?: SupportedAssociation[];
  DisplayHints: RegistrationTypeDisplayHints;
}
export const RegistrationTypeDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationType: S.String,
    SupportedAssociations: S.optional(SupportedAssociationList),
    DisplayHints: RegistrationTypeDisplayHints,
  }),
).annotate({
  identifier: "RegistrationTypeDefinition",
}) as any as S.Schema<RegistrationTypeDefinition>;
export type RegistrationTypeDefinitionList = RegistrationTypeDefinition[];
export const RegistrationTypeDefinitionList = /*@__PURE__*/ S.Array(
  RegistrationTypeDefinition,
);
export interface DescribeRegistrationTypeDefinitionsResult {
  RegistrationTypeDefinitions: RegistrationTypeDefinition[];
  NextToken?: string;
}
export const DescribeRegistrationTypeDefinitionsResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RegistrationTypeDefinitions: RegistrationTypeDefinitionList,
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeRegistrationTypeDefinitionsResult",
  }) as any as S.Schema<DescribeRegistrationTypeDefinitionsResult>;
export type RegistrationVersionNumberList = number[];
export const RegistrationVersionNumberList = /*@__PURE__*/ S.Array(S.Number);
export type RegistrationVersionFilterName = string;
export interface RegistrationVersionFilter {
  Name: string;
  Values: string[];
}
export const RegistrationVersionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "RegistrationVersionFilter",
}) as any as S.Schema<RegistrationVersionFilter>;
export type RegistrationVersionFilterList = RegistrationVersionFilter[];
export const RegistrationVersionFilterList = /*@__PURE__*/ S.Array(
  RegistrationVersionFilter,
);
export interface DescribeRegistrationVersionsRequest {
  RegistrationId: string;
  VersionNumbers?: number[];
  Filters?: RegistrationVersionFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeRegistrationVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationId: S.String,
    VersionNumbers: S.optional(RegistrationVersionNumberList),
    Filters: S.optional(RegistrationVersionFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeRegistrationVersionsRequest",
}) as any as S.Schema<DescribeRegistrationVersionsRequest>;
export interface RegistrationDeniedReasonInformation {
  Reason: string;
  ShortDescription: string;
  LongDescription?: string;
  DocumentationTitle?: string;
  DocumentationLink?: string;
}
export const RegistrationDeniedReasonInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Reason: S.String,
    ShortDescription: S.String,
    LongDescription: S.optional(S.String),
    DocumentationTitle: S.optional(S.String),
    DocumentationLink: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistrationDeniedReasonInformation",
}) as any as S.Schema<RegistrationDeniedReasonInformation>;
export type RegistrationDeniedReasonInformationList =
  RegistrationDeniedReasonInformation[];
export const RegistrationDeniedReasonInformationList = /*@__PURE__*/ S.Array(
  RegistrationDeniedReasonInformation,
);
export interface RegistrationVersionInformation {
  VersionNumber: number;
  RegistrationVersionStatus: string;
  RegistrationVersionStatusHistory: RegistrationVersionStatusHistory;
  DeniedReasons?: RegistrationDeniedReasonInformation[];
  Feedback?: string;
}
export const RegistrationVersionInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VersionNumber: S.Number,
    RegistrationVersionStatus: S.String,
    RegistrationVersionStatusHistory: RegistrationVersionStatusHistory,
    DeniedReasons: S.optional(RegistrationDeniedReasonInformationList),
    Feedback: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistrationVersionInformation",
}) as any as S.Schema<RegistrationVersionInformation>;
export type RegistrationVersionInformationList =
  RegistrationVersionInformation[];
export const RegistrationVersionInformationList = /*@__PURE__*/ S.Array(
  RegistrationVersionInformation,
);
export interface DescribeRegistrationVersionsResult {
  RegistrationArn: string;
  RegistrationId: string;
  RegistrationVersions: RegistrationVersionInformation[];
  NextToken?: string;
}
export const DescribeRegistrationVersionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationArn: S.String,
    RegistrationId: S.String,
    RegistrationVersions: RegistrationVersionInformationList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeRegistrationVersionsResult",
}) as any as S.Schema<DescribeRegistrationVersionsResult>;
export type SenderIdOrArn = string;
export interface SenderIdAndCountry {
  SenderId: string;
  IsoCountryCode: string;
}
export const SenderIdAndCountry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SenderId: S.String, IsoCountryCode: S.String }),
).annotate({
  identifier: "SenderIdAndCountry",
}) as any as S.Schema<SenderIdAndCountry>;
export type SenderIdList = SenderIdAndCountry[];
export const SenderIdList = /*@__PURE__*/ S.Array(SenderIdAndCountry);
export type SenderIdFilterName = string;
export interface SenderIdFilter {
  Name: string;
  Values: string[];
}
export const SenderIdFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({ identifier: "SenderIdFilter" }) as any as S.Schema<SenderIdFilter>;
export type SenderIdFilterList = SenderIdFilter[];
export const SenderIdFilterList = /*@__PURE__*/ S.Array(SenderIdFilter);
export interface DescribeSenderIdsRequest {
  SenderIds?: SenderIdAndCountry[];
  Filters?: SenderIdFilter[];
  NextToken?: string;
  MaxResults?: number;
  Owner?: string;
}
export const DescribeSenderIdsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SenderIds: S.optional(SenderIdList),
    Filters: S.optional(SenderIdFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    Owner: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeSenderIdsRequest",
}) as any as S.Schema<DescribeSenderIdsRequest>;
export type MessageTypeList = string[];
export const MessageTypeList = /*@__PURE__*/ S.Array(S.String);
export interface SenderIdInformation {
  SenderIdArn: string;
  SenderId: string;
  IsoCountryCode: string;
  MessageTypes: string[];
  MonthlyLeasingPrice: string;
  DeletionProtectionEnabled: boolean;
  Registered: boolean;
  RegistrationId?: string;
}
export const SenderIdInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SenderIdArn: S.String,
    SenderId: S.String,
    IsoCountryCode: S.String,
    MessageTypes: MessageTypeList,
    MonthlyLeasingPrice: S.String,
    DeletionProtectionEnabled: S.Boolean,
    Registered: S.Boolean,
    RegistrationId: S.optional(S.String),
  }),
).annotate({
  identifier: "SenderIdInformation",
}) as any as S.Schema<SenderIdInformation>;
export type SenderIdInformationList = SenderIdInformation[];
export const SenderIdInformationList =
  /*@__PURE__*/ S.Array(SenderIdInformation);
export interface DescribeSenderIdsResult {
  SenderIds?: SenderIdInformation[];
  NextToken?: string;
}
export const DescribeSenderIdsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SenderIds: S.optional(SenderIdInformationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSenderIdsResult",
}) as any as S.Schema<DescribeSenderIdsResult>;
export interface DescribeSpendLimitsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeSpendLimitsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeSpendLimitsRequest",
}) as any as S.Schema<DescribeSpendLimitsRequest>;
export type SpendLimitName = string;
export interface SpendLimit {
  Name: string;
  EnforcedLimit: number;
  MaxLimit: number;
  Overridden: boolean;
}
export const SpendLimit = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    EnforcedLimit: S.Number,
    MaxLimit: S.Number,
    Overridden: S.Boolean,
  }),
).annotate({ identifier: "SpendLimit" }) as any as S.Schema<SpendLimit>;
export type SpendLimitList = SpendLimit[];
export const SpendLimitList = /*@__PURE__*/ S.Array(SpendLimit);
export interface DescribeSpendLimitsResult {
  SpendLimits?: SpendLimit[];
  NextToken?: string;
}
export const DescribeSpendLimitsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SpendLimits: S.optional(SpendLimitList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeSpendLimitsResult",
}) as any as S.Schema<DescribeSpendLimitsResult>;
export type VerifiedDestinationNumberIdList = string[];
export const VerifiedDestinationNumberIdList = /*@__PURE__*/ S.Array(S.String);
export type DestinationPhoneNumberList = string[];
export const DestinationPhoneNumberList = /*@__PURE__*/ S.Array(S.String);
export type VerifiedDestinationNumberFilterName = string;
export interface VerifiedDestinationNumberFilter {
  Name: string;
  Values: string[];
}
export const VerifiedDestinationNumberFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "VerifiedDestinationNumberFilter",
}) as any as S.Schema<VerifiedDestinationNumberFilter>;
export type VerifiedDestinationNumberFilterList =
  VerifiedDestinationNumberFilter[];
export const VerifiedDestinationNumberFilterList = /*@__PURE__*/ S.Array(
  VerifiedDestinationNumberFilter,
);
export interface DescribeVerifiedDestinationNumbersRequest {
  VerifiedDestinationNumberIds?: string[];
  DestinationPhoneNumbers?: string[];
  Filters?: VerifiedDestinationNumberFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeVerifiedDestinationNumbersRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      VerifiedDestinationNumberIds: S.optional(VerifiedDestinationNumberIdList),
      DestinationPhoneNumbers: S.optional(DestinationPhoneNumberList),
      Filters: S.optional(VerifiedDestinationNumberFilterList),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "DescribeVerifiedDestinationNumbersRequest",
  }) as any as S.Schema<DescribeVerifiedDestinationNumbersRequest>;
export interface VerifiedDestinationNumberInformation {
  VerifiedDestinationNumberArn: string;
  VerifiedDestinationNumberId: string;
  DestinationPhoneNumber: string;
  Status: string;
  RcsAgentId?: string;
  CreatedTimestamp: Date;
}
export const VerifiedDestinationNumberInformation = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      VerifiedDestinationNumberArn: S.String,
      VerifiedDestinationNumberId: S.String,
      DestinationPhoneNumber: S.String,
      Status: S.String,
      RcsAgentId: S.optional(S.String),
      CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    }),
).annotate({
  identifier: "VerifiedDestinationNumberInformation",
}) as any as S.Schema<VerifiedDestinationNumberInformation>;
export type VerifiedDestinationNumberInformationList =
  VerifiedDestinationNumberInformation[];
export const VerifiedDestinationNumberInformationList = /*@__PURE__*/ S.Array(
  VerifiedDestinationNumberInformation,
);
export interface DescribeVerifiedDestinationNumbersResult {
  VerifiedDestinationNumbers: VerifiedDestinationNumberInformation[];
  NextToken?: string;
}
export const DescribeVerifiedDestinationNumbersResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      VerifiedDestinationNumbers: VerifiedDestinationNumberInformationList,
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "DescribeVerifiedDestinationNumbersResult",
}) as any as S.Schema<DescribeVerifiedDestinationNumbersResult>;
export interface DisassociateOriginationIdentityRequest {
  PoolId: string;
  OriginationIdentity: string;
  IsoCountryCode?: string;
  ClientToken?: string;
}
export const DisassociateOriginationIdentityRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PoolId: S.String,
      OriginationIdentity: S.String,
      IsoCountryCode: S.optional(S.String),
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DisassociateOriginationIdentityRequest",
}) as any as S.Schema<DisassociateOriginationIdentityRequest>;
export interface DisassociateOriginationIdentityResult {
  PoolArn?: string;
  PoolId?: string;
  OriginationIdentityArn?: string;
  OriginationIdentity?: string;
  IsoCountryCode?: string;
}
export const DisassociateOriginationIdentityResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PoolArn: S.optional(S.String),
      PoolId: S.optional(S.String),
      OriginationIdentityArn: S.optional(S.String),
      OriginationIdentity: S.optional(S.String),
      IsoCountryCode: S.optional(S.String),
    }),
).annotate({
  identifier: "DisassociateOriginationIdentityResult",
}) as any as S.Schema<DisassociateOriginationIdentityResult>;
export interface DisassociateProtectConfigurationRequest {
  ProtectConfigurationId: string;
  ConfigurationSetName: string;
}
export const DisassociateProtectConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ProtectConfigurationId: S.String,
      ConfigurationSetName: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DisassociateProtectConfigurationRequest",
}) as any as S.Schema<DisassociateProtectConfigurationRequest>;
export interface DisassociateProtectConfigurationResult {
  ConfigurationSetArn: string;
  ConfigurationSetName: string;
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
}
export const DisassociateProtectConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigurationSetArn: S.String,
      ConfigurationSetName: S.String,
      ProtectConfigurationArn: S.String,
      ProtectConfigurationId: S.String,
    }),
).annotate({
  identifier: "DisassociateProtectConfigurationResult",
}) as any as S.Schema<DisassociateProtectConfigurationResult>;
export interface DiscardRegistrationVersionRequest {
  RegistrationId: string;
}
export const DiscardRegistrationVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegistrationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DiscardRegistrationVersionRequest",
}) as any as S.Schema<DiscardRegistrationVersionRequest>;
export interface DiscardRegistrationVersionResult {
  RegistrationArn: string;
  RegistrationId: string;
  VersionNumber: number;
  RegistrationVersionStatus: string;
  RegistrationVersionStatusHistory: RegistrationVersionStatusHistory;
}
export const DiscardRegistrationVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationArn: S.String,
    RegistrationId: S.String,
    VersionNumber: S.Number,
    RegistrationVersionStatus: S.String,
    RegistrationVersionStatusHistory: RegistrationVersionStatusHistory,
  }),
).annotate({
  identifier: "DiscardRegistrationVersionResult",
}) as any as S.Schema<DiscardRegistrationVersionResult>;
export interface GetProtectConfigurationCountryRuleSetRequest {
  ProtectConfigurationId: string;
  NumberCapability: string;
}
export const GetProtectConfigurationCountryRuleSetRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProtectConfigurationId: S.String,
      NumberCapability: S.String,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "GetProtectConfigurationCountryRuleSetRequest",
  }) as any as S.Schema<GetProtectConfigurationCountryRuleSetRequest>;
export type ProtectStatus = string;
export interface ProtectConfigurationCountryRuleSetInformation {
  ProtectStatus: string;
}
export const ProtectConfigurationCountryRuleSetInformation =
  /*@__PURE__*/ S.suspend(() => S.Struct({ ProtectStatus: S.String })).annotate(
    { identifier: "ProtectConfigurationCountryRuleSetInformation" },
  ) as any as S.Schema<ProtectConfigurationCountryRuleSetInformation>;
export type ProtectConfigurationCountryRuleSet = {
  [key: string]: ProtectConfigurationCountryRuleSetInformation | undefined;
};
export const ProtectConfigurationCountryRuleSet = /*@__PURE__*/ S.Record(
  S.String,
  ProtectConfigurationCountryRuleSetInformation.pipe(S.optional),
);
export interface GetProtectConfigurationCountryRuleSetResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  NumberCapability: string;
  CountryRuleSet: {
    [key: string]: ProtectConfigurationCountryRuleSetInformation | undefined;
  };
}
export const GetProtectConfigurationCountryRuleSetResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProtectConfigurationArn: S.String,
      ProtectConfigurationId: S.String,
      NumberCapability: S.String,
      CountryRuleSet: ProtectConfigurationCountryRuleSet,
    }),
  ).annotate({
    identifier: "GetProtectConfigurationCountryRuleSetResult",
  }) as any as S.Schema<GetProtectConfigurationCountryRuleSetResult>;
export interface GetResourcePolicyRequest {
  ResourceArn: string;
}
export const GetResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResourcePolicyRequest",
}) as any as S.Schema<GetResourcePolicyRequest>;
export interface GetResourcePolicyResult {
  ResourceArn?: string;
  Policy?: string;
  CreatedTimestamp?: Date;
}
export const GetResourcePolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    Policy: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GetResourcePolicyResult",
}) as any as S.Schema<GetResourcePolicyResult>;
export type NotifyUseCaseList = string[];
export const NotifyUseCaseList = /*@__PURE__*/ S.Array(S.String);
export interface ListNotifyCountriesRequest {
  Channels?: string[];
  UseCases?: string[];
  Tier?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListNotifyCountriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Channels: S.optional(NotifyEnabledChannelsList),
    UseCases: S.optional(NotifyUseCaseList),
    Tier: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListNotifyCountriesRequest",
}) as any as S.Schema<ListNotifyCountriesRequest>;
export type NotifyTierList = string[];
export const NotifyTierList = /*@__PURE__*/ S.Array(S.String);
export interface NotifyCountryInformation {
  IsoCountryCode: string;
  CountryName: string;
  SupportedChannels: string[];
  SupportedUseCases: string[];
  SupportedTiers: string[];
  CustomerOwnedIdentityRequired: boolean;
}
export const NotifyCountryInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsoCountryCode: S.String,
    CountryName: S.String,
    SupportedChannels: NotifyEnabledChannelsList,
    SupportedUseCases: NotifyUseCaseList,
    SupportedTiers: NotifyTierList,
    CustomerOwnedIdentityRequired: S.Boolean,
  }),
).annotate({
  identifier: "NotifyCountryInformation",
}) as any as S.Schema<NotifyCountryInformation>;
export type NotifyCountryInformationList = NotifyCountryInformation[];
export const NotifyCountryInformationList = /*@__PURE__*/ S.Array(
  NotifyCountryInformation,
);
export interface ListNotifyCountriesResult {
  NotifyCountries?: NotifyCountryInformation[];
  NextToken?: string;
}
export const ListNotifyCountriesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyCountries: S.optional(NotifyCountryInformationList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListNotifyCountriesResult",
}) as any as S.Schema<ListNotifyCountriesResult>;
export type PoolOriginationIdentitiesFilterName = string;
export interface PoolOriginationIdentitiesFilter {
  Name: string;
  Values: string[];
}
export const PoolOriginationIdentitiesFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "PoolOriginationIdentitiesFilter",
}) as any as S.Schema<PoolOriginationIdentitiesFilter>;
export type PoolOriginationIdentitiesFilterList =
  PoolOriginationIdentitiesFilter[];
export const PoolOriginationIdentitiesFilterList = /*@__PURE__*/ S.Array(
  PoolOriginationIdentitiesFilter,
);
export interface ListPoolOriginationIdentitiesRequest {
  PoolId: string;
  Filters?: PoolOriginationIdentitiesFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListPoolOriginationIdentitiesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      PoolId: S.String,
      Filters: S.optional(PoolOriginationIdentitiesFilterList),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListPoolOriginationIdentitiesRequest",
}) as any as S.Schema<ListPoolOriginationIdentitiesRequest>;
export interface OriginationIdentityMetadata {
  OriginationIdentityArn: string;
  OriginationIdentity: string;
  IsoCountryCode: string;
  NumberCapabilities: string[];
  PhoneNumber?: string;
}
export const OriginationIdentityMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OriginationIdentityArn: S.String,
    OriginationIdentity: S.String,
    IsoCountryCode: S.String,
    NumberCapabilities: NumberCapabilityList,
    PhoneNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "OriginationIdentityMetadata",
}) as any as S.Schema<OriginationIdentityMetadata>;
export type OriginationIdentityMetadataList = OriginationIdentityMetadata[];
export const OriginationIdentityMetadataList = /*@__PURE__*/ S.Array(
  OriginationIdentityMetadata,
);
export interface ListPoolOriginationIdentitiesResult {
  PoolArn?: string;
  PoolId?: string;
  OriginationIdentities?: OriginationIdentityMetadata[];
  NextToken?: string;
}
export const ListPoolOriginationIdentitiesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolArn: S.optional(S.String),
    PoolId: S.optional(S.String),
    OriginationIdentities: S.optional(OriginationIdentityMetadataList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPoolOriginationIdentitiesResult",
}) as any as S.Schema<ListPoolOriginationIdentitiesResult>;
export type ProtectConfigurationRuleSetNumberOverrideFilterName = string;
export interface ProtectConfigurationRuleSetNumberOverrideFilterItem {
  Name: string;
  Values: string[];
}
export const ProtectConfigurationRuleSetNumberOverrideFilterItem =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Name: S.String, Values: FilterValueList }),
  ).annotate({
    identifier: "ProtectConfigurationRuleSetNumberOverrideFilterItem",
  }) as any as S.Schema<ProtectConfigurationRuleSetNumberOverrideFilterItem>;
export type ListProtectConfigurationRuleSetNumberOverrideFilter =
  ProtectConfigurationRuleSetNumberOverrideFilterItem[];
export const ListProtectConfigurationRuleSetNumberOverrideFilter =
  /*@__PURE__*/ S.Array(ProtectConfigurationRuleSetNumberOverrideFilterItem);
export interface ListProtectConfigurationRuleSetNumberOverridesRequest {
  ProtectConfigurationId: string;
  Filters?: ProtectConfigurationRuleSetNumberOverrideFilterItem[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListProtectConfigurationRuleSetNumberOverridesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProtectConfigurationId: S.String,
      Filters: S.optional(ListProtectConfigurationRuleSetNumberOverrideFilter),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "ListProtectConfigurationRuleSetNumberOverridesRequest",
  }) as any as S.Schema<ListProtectConfigurationRuleSetNumberOverridesRequest>;
export interface ProtectConfigurationRuleSetNumberOverride {
  DestinationPhoneNumber: string;
  CreatedTimestamp: Date;
  Action: string;
  IsoCountryCode?: string;
  ExpirationTimestamp?: Date;
}
export const ProtectConfigurationRuleSetNumberOverride =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DestinationPhoneNumber: S.String,
      CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      Action: S.String,
      IsoCountryCode: S.optional(S.String),
      ExpirationTimestamp: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
    }),
  ).annotate({
    identifier: "ProtectConfigurationRuleSetNumberOverride",
  }) as any as S.Schema<ProtectConfigurationRuleSetNumberOverride>;
export type ProtectConfigurationRuleSetNumberOverrideList =
  ProtectConfigurationRuleSetNumberOverride[];
export const ProtectConfigurationRuleSetNumberOverrideList =
  /*@__PURE__*/ S.Array(ProtectConfigurationRuleSetNumberOverride);
export interface ListProtectConfigurationRuleSetNumberOverridesResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  RuleSetNumberOverrides?: ProtectConfigurationRuleSetNumberOverride[];
  NextToken?: string;
}
export const ListProtectConfigurationRuleSetNumberOverridesResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProtectConfigurationArn: S.String,
      ProtectConfigurationId: S.String,
      RuleSetNumberOverrides: S.optional(
        ProtectConfigurationRuleSetNumberOverrideList,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListProtectConfigurationRuleSetNumberOverridesResult",
  }) as any as S.Schema<ListProtectConfigurationRuleSetNumberOverridesResult>;
export type RegistrationAssociationFilterName = string;
export interface RegistrationAssociationFilter {
  Name: string;
  Values: string[];
}
export const RegistrationAssociationFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Values: FilterValueList }),
).annotate({
  identifier: "RegistrationAssociationFilter",
}) as any as S.Schema<RegistrationAssociationFilter>;
export type RegistrationAssociationFilterList = RegistrationAssociationFilter[];
export const RegistrationAssociationFilterList = /*@__PURE__*/ S.Array(
  RegistrationAssociationFilter,
);
export interface ListRegistrationAssociationsRequest {
  RegistrationId: string;
  Filters?: RegistrationAssociationFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export const ListRegistrationAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationId: S.String,
    Filters: S.optional(RegistrationAssociationFilterList),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListRegistrationAssociationsRequest",
}) as any as S.Schema<ListRegistrationAssociationsRequest>;
export interface RegistrationAssociationMetadata {
  ResourceArn: string;
  ResourceId: string;
  ResourceType: string;
  IsoCountryCode?: string;
  PhoneNumber?: string;
}
export const RegistrationAssociationMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    ResourceId: S.String,
    ResourceType: S.String,
    IsoCountryCode: S.optional(S.String),
    PhoneNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "RegistrationAssociationMetadata",
}) as any as S.Schema<RegistrationAssociationMetadata>;
export type RegistrationAssociationMetadataList =
  RegistrationAssociationMetadata[];
export const RegistrationAssociationMetadataList = /*@__PURE__*/ S.Array(
  RegistrationAssociationMetadata,
);
export interface ListRegistrationAssociationsResult {
  RegistrationArn: string;
  RegistrationId: string;
  RegistrationType: string;
  RegistrationAssociations: RegistrationAssociationMetadata[];
  NextToken?: string;
}
export const ListRegistrationAssociationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationArn: S.String,
    RegistrationId: S.String,
    RegistrationType: S.String,
    RegistrationAssociations: RegistrationAssociationMetadataList,
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRegistrationAssociationsResult",
}) as any as S.Schema<ListRegistrationAssociationsResult>;
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
export interface ListTagsForResourceResult {
  ResourceArn?: string;
  Tags?: Tag[];
}
export const ListTagsForResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String), Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResult",
}) as any as S.Schema<ListTagsForResourceResult>;
export interface PutKeywordRequest {
  OriginationIdentity: string;
  Keyword: string;
  KeywordMessage: string;
  KeywordAction?: string;
}
export const PutKeywordRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OriginationIdentity: S.String,
    Keyword: S.String,
    KeywordMessage: S.String,
    KeywordAction: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutKeywordRequest",
}) as any as S.Schema<PutKeywordRequest>;
export interface PutKeywordResult {
  OriginationIdentityArn?: string;
  OriginationIdentity?: string;
  Keyword?: string;
  KeywordMessage?: string;
  KeywordAction?: string;
}
export const PutKeywordResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OriginationIdentityArn: S.optional(S.String),
    OriginationIdentity: S.optional(S.String),
    Keyword: S.optional(S.String),
    KeywordMessage: S.optional(S.String),
    KeywordAction: S.optional(S.String),
  }),
).annotate({
  identifier: "PutKeywordResult",
}) as any as S.Schema<PutKeywordResult>;
export type MessageId = string;
export type MessageFeedbackStatus = string;
export interface PutMessageFeedbackRequest {
  MessageId: string;
  MessageFeedbackStatus: string;
}
export const PutMessageFeedbackRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.String, MessageFeedbackStatus: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutMessageFeedbackRequest",
}) as any as S.Schema<PutMessageFeedbackRequest>;
export interface PutMessageFeedbackResult {
  MessageId: string;
  MessageFeedbackStatus: string;
}
export const PutMessageFeedbackResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.String, MessageFeedbackStatus: S.String }),
).annotate({
  identifier: "PutMessageFeedbackResult",
}) as any as S.Schema<PutMessageFeedbackResult>;
export interface PutOptedOutNumberRequest {
  OptOutListName: string;
  OptedOutNumber: string;
}
export const PutOptedOutNumberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OptOutListName: S.String, OptedOutNumber: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutOptedOutNumberRequest",
}) as any as S.Schema<PutOptedOutNumberRequest>;
export interface PutOptedOutNumberResult {
  OptOutListArn?: string;
  OptOutListName?: string;
  OptedOutNumber?: string;
  OptedOutTimestamp?: Date;
  EndUserOptedOut?: boolean;
}
export const PutOptedOutNumberResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OptOutListArn: S.optional(S.String),
    OptOutListName: S.optional(S.String),
    OptedOutNumber: S.optional(S.String),
    OptedOutTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    EndUserOptedOut: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "PutOptedOutNumberResult",
}) as any as S.Schema<PutOptedOutNumberResult>;
export interface PutProtectConfigurationRuleSetNumberOverrideRequest {
  ClientToken?: string;
  ProtectConfigurationId: string;
  DestinationPhoneNumber: string;
  Action: string;
  ExpirationTimestamp?: Date;
}
export const PutProtectConfigurationRuleSetNumberOverrideRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      ProtectConfigurationId: S.String,
      DestinationPhoneNumber: S.String,
      Action: S.String,
      ExpirationTimestamp: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "PutProtectConfigurationRuleSetNumberOverrideRequest",
  }) as any as S.Schema<PutProtectConfigurationRuleSetNumberOverrideRequest>;
export interface PutProtectConfigurationRuleSetNumberOverrideResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  DestinationPhoneNumber: string;
  CreatedTimestamp: Date;
  Action: string;
  IsoCountryCode?: string;
  ExpirationTimestamp?: Date;
}
export const PutProtectConfigurationRuleSetNumberOverrideResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProtectConfigurationArn: S.String,
      ProtectConfigurationId: S.String,
      DestinationPhoneNumber: S.String,
      CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      Action: S.String,
      IsoCountryCode: S.optional(S.String),
      ExpirationTimestamp: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
    }),
  ).annotate({
    identifier: "PutProtectConfigurationRuleSetNumberOverrideResult",
  }) as any as S.Schema<PutProtectConfigurationRuleSetNumberOverrideResult>;
export interface PutRegistrationFieldValueRequest {
  RegistrationId: string;
  FieldPath: string;
  SelectChoices?: string[];
  TextValue?: string;
  RegistrationAttachmentId?: string;
}
export const PutRegistrationFieldValueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationId: S.String,
    FieldPath: S.String,
    SelectChoices: S.optional(SelectChoiceList),
    TextValue: S.optional(S.String),
    RegistrationAttachmentId: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutRegistrationFieldValueRequest",
}) as any as S.Schema<PutRegistrationFieldValueRequest>;
export interface PutRegistrationFieldValueResult {
  RegistrationArn: string;
  RegistrationId: string;
  VersionNumber: number;
  FieldPath: string;
  SelectChoices?: string[];
  TextValue?: string;
  RegistrationAttachmentId?: string;
}
export const PutRegistrationFieldValueResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationArn: S.String,
    RegistrationId: S.String,
    VersionNumber: S.Number,
    FieldPath: S.String,
    SelectChoices: S.optional(SelectChoiceList),
    TextValue: S.optional(S.String),
    RegistrationAttachmentId: S.optional(S.String),
  }),
).annotate({
  identifier: "PutRegistrationFieldValueResult",
}) as any as S.Schema<PutRegistrationFieldValueResult>;
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
}
export const PutResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Policy: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutResourcePolicyRequest",
}) as any as S.Schema<PutResourcePolicyRequest>;
export interface PutResourcePolicyResult {
  ResourceArn?: string;
  Policy?: string;
  CreatedTimestamp?: Date;
}
export const PutResourcePolicyResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.optional(S.String),
    Policy: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "PutResourcePolicyResult",
}) as any as S.Schema<PutResourcePolicyResult>;
export interface ReleasePhoneNumberRequest {
  PhoneNumberId: string;
}
export const ReleasePhoneNumberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PhoneNumberId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ReleasePhoneNumberRequest",
}) as any as S.Schema<ReleasePhoneNumberRequest>;
export interface ReleasePhoneNumberResult {
  PhoneNumberArn?: string;
  PhoneNumberId?: string;
  PhoneNumber?: string;
  Status?: string;
  IsoCountryCode?: string;
  MessageType?: string;
  NumberCapabilities?: string[];
  NumberType?: string;
  MonthlyLeasingPrice?: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  RegistrationId?: string;
  CreatedTimestamp?: Date;
}
export const ReleasePhoneNumberResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberArn: S.optional(S.String),
    PhoneNumberId: S.optional(S.String),
    PhoneNumber: S.optional(S.String),
    Status: S.optional(S.String),
    IsoCountryCode: S.optional(S.String),
    MessageType: S.optional(S.String),
    NumberCapabilities: S.optional(NumberCapabilityList),
    NumberType: S.optional(S.String),
    MonthlyLeasingPrice: S.optional(S.String),
    TwoWayEnabled: S.optional(S.Boolean),
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.optional(S.Boolean),
    OptOutListName: S.optional(S.String),
    RegistrationId: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ReleasePhoneNumberResult",
}) as any as S.Schema<ReleasePhoneNumberResult>;
export interface ReleaseSenderIdRequest {
  SenderId: string;
  IsoCountryCode: string;
}
export const ReleaseSenderIdRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SenderId: S.String, IsoCountryCode: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ReleaseSenderIdRequest",
}) as any as S.Schema<ReleaseSenderIdRequest>;
export interface ReleaseSenderIdResult {
  SenderIdArn: string;
  SenderId: string;
  IsoCountryCode: string;
  MessageTypes: string[];
  MonthlyLeasingPrice: string;
  Registered: boolean;
  RegistrationId?: string;
}
export const ReleaseSenderIdResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SenderIdArn: S.String,
    SenderId: S.String,
    IsoCountryCode: S.String,
    MessageTypes: MessageTypeList,
    MonthlyLeasingPrice: S.String,
    Registered: S.Boolean,
    RegistrationId: S.optional(S.String),
  }),
).annotate({
  identifier: "ReleaseSenderIdResult",
}) as any as S.Schema<ReleaseSenderIdResult>;
export type RequestableNumberType = string;
export interface RequestPhoneNumberRequest {
  IsoCountryCode: string;
  MessageType: string;
  NumberCapabilities: string[];
  NumberType: string;
  OptOutListName?: string;
  PoolId?: string;
  RegistrationId?: string;
  InternationalSendingEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
  Tags?: Tag[];
  ClientToken?: string;
}
export const RequestPhoneNumberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsoCountryCode: S.String,
    MessageType: S.String,
    NumberCapabilities: NumberCapabilityList,
    NumberType: S.String,
    OptOutListName: S.optional(S.String),
    PoolId: S.optional(S.String),
    RegistrationId: S.optional(S.String),
    InternationalSendingEnabled: S.optional(S.Boolean),
    DeletionProtectionEnabled: S.optional(S.Boolean),
    Tags: S.optional(TagList),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RequestPhoneNumberRequest",
}) as any as S.Schema<RequestPhoneNumberRequest>;
export interface RequestPhoneNumberResult {
  PhoneNumberArn?: string;
  PhoneNumberId?: string;
  PhoneNumber?: string;
  Status?: string;
  IsoCountryCode?: string;
  MessageType?: string;
  NumberCapabilities?: string[];
  NumberType?: string;
  MonthlyLeasingPrice?: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  InternationalSendingEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
  PoolId?: string;
  RegistrationId?: string;
  Tags?: Tag[];
  CreatedTimestamp?: Date;
}
export const RequestPhoneNumberResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberArn: S.optional(S.String),
    PhoneNumberId: S.optional(S.String),
    PhoneNumber: S.optional(S.String),
    Status: S.optional(S.String),
    IsoCountryCode: S.optional(S.String),
    MessageType: S.optional(S.String),
    NumberCapabilities: S.optional(NumberCapabilityList),
    NumberType: S.optional(S.String),
    MonthlyLeasingPrice: S.optional(S.String),
    TwoWayEnabled: S.optional(S.Boolean),
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.optional(S.Boolean),
    OptOutListName: S.optional(S.String),
    InternationalSendingEnabled: S.optional(S.Boolean),
    DeletionProtectionEnabled: S.optional(S.Boolean),
    PoolId: S.optional(S.String),
    RegistrationId: S.optional(S.String),
    Tags: S.optional(TagList),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "RequestPhoneNumberResult",
}) as any as S.Schema<RequestPhoneNumberResult>;
export interface RequestSenderIdRequest {
  SenderId: string;
  IsoCountryCode: string;
  MessageTypes?: string[];
  DeletionProtectionEnabled?: boolean;
  Tags?: Tag[];
  ClientToken?: string;
}
export const RequestSenderIdRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SenderId: S.String,
    IsoCountryCode: S.String,
    MessageTypes: S.optional(MessageTypeList),
    DeletionProtectionEnabled: S.optional(S.Boolean),
    Tags: S.optional(TagList),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "RequestSenderIdRequest",
}) as any as S.Schema<RequestSenderIdRequest>;
export interface RequestSenderIdResult {
  SenderIdArn: string;
  SenderId: string;
  IsoCountryCode: string;
  MessageTypes: string[];
  MonthlyLeasingPrice: string;
  DeletionProtectionEnabled: boolean;
  Registered: boolean;
  Tags?: Tag[];
}
export const RequestSenderIdResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SenderIdArn: S.String,
    SenderId: S.String,
    IsoCountryCode: S.String,
    MessageTypes: MessageTypeList,
    MonthlyLeasingPrice: S.String,
    DeletionProtectionEnabled: S.Boolean,
    Registered: S.Boolean,
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "RequestSenderIdResult",
}) as any as S.Schema<RequestSenderIdResult>;
export type VerificationChannel = string;
export type LanguageCode = string;
export type VerificationMessageOriginationIdentity = string;
export type ContextKey = string;
export type ContextValue = string;
export type ContextMap = { [key: string]: string | undefined };
export const ContextMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type DestinationCountryParameterKey = string;
export type DestinationCountryParameterValue = string;
export type DestinationCountryParameters = {
  [key: string]: string | undefined;
};
export const DestinationCountryParameters = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface SendDestinationNumberVerificationCodeRequest {
  VerifiedDestinationNumberId: string;
  VerificationChannel: string;
  LanguageCode?: string;
  OriginationIdentity?: string;
  ConfigurationSetName?: string;
  Context?: { [key: string]: string | undefined };
  DestinationCountryParameters?: { [key: string]: string | undefined };
}
export const SendDestinationNumberVerificationCodeRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      VerifiedDestinationNumberId: S.String,
      VerificationChannel: S.String,
      LanguageCode: S.optional(S.String),
      OriginationIdentity: S.optional(S.String),
      ConfigurationSetName: S.optional(S.String),
      Context: S.optional(ContextMap),
      DestinationCountryParameters: S.optional(DestinationCountryParameters),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "SendDestinationNumberVerificationCodeRequest",
  }) as any as S.Schema<SendDestinationNumberVerificationCodeRequest>;
export interface SendDestinationNumberVerificationCodeResult {
  MessageId: string;
}
export const SendDestinationNumberVerificationCodeResult =
  /*@__PURE__*/ S.suspend(() => S.Struct({ MessageId: S.String })).annotate({
    identifier: "SendDestinationNumberVerificationCodeResult",
  }) as any as S.Schema<SendDestinationNumberVerificationCodeResult>;
export type MediaMessageOriginationIdentity = string;
export type TextMessageBody = string;
export type MediaUrlValue = string;
export type MediaUrlList = string[];
export const MediaUrlList = /*@__PURE__*/ S.Array(S.String);
export type MaxPrice = string;
export type TimeToLive = number;
export interface SendMediaMessageRequest {
  DestinationPhoneNumber: string;
  OriginationIdentity: string;
  MessageBody?: string;
  MediaUrls?: string[];
  ConfigurationSetName?: string;
  MaxPrice?: string;
  TimeToLive?: number;
  Context?: { [key: string]: string | undefined };
  DryRun?: boolean;
  ProtectConfigurationId?: string;
  MessageFeedbackEnabled?: boolean;
}
export const SendMediaMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationPhoneNumber: S.String,
    OriginationIdentity: S.String,
    MessageBody: S.optional(S.String),
    MediaUrls: S.optional(MediaUrlList),
    ConfigurationSetName: S.optional(S.String),
    MaxPrice: S.optional(S.String),
    TimeToLive: S.optional(S.Number),
    Context: S.optional(ContextMap),
    DryRun: S.optional(S.Boolean),
    ProtectConfigurationId: S.optional(S.String),
    MessageFeedbackEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SendMediaMessageRequest",
}) as any as S.Schema<SendMediaMessageRequest>;
export interface SendMediaMessageResult {
  MessageId?: string;
}
export const SendMediaMessageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.optional(S.String) }),
).annotate({
  identifier: "SendMediaMessageResult",
}) as any as S.Schema<SendMediaMessageResult>;
export type TemplateVariableName = string;
export type TemplateVariableValue = string;
export type TemplateVariableSubstitutionMap = {
  [key: string]: string | undefined;
};
export const TemplateVariableSubstitutionMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface SendNotifyTextMessageRequest {
  NotifyConfigurationId: string;
  DestinationPhoneNumber: string;
  TemplateId?: string;
  TemplateVariables: { [key: string]: string | undefined };
  TimeToLive?: number;
  Context?: { [key: string]: string | undefined };
  ConfigurationSetName?: string;
  DryRun?: boolean;
  MessageFeedbackEnabled?: boolean;
}
export const SendNotifyTextMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyConfigurationId: S.String,
    DestinationPhoneNumber: S.String,
    TemplateId: S.optional(S.String),
    TemplateVariables: TemplateVariableSubstitutionMap,
    TimeToLive: S.optional(S.Number),
    Context: S.optional(ContextMap),
    ConfigurationSetName: S.optional(S.String),
    DryRun: S.optional(S.Boolean),
    MessageFeedbackEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SendNotifyTextMessageRequest",
}) as any as S.Schema<SendNotifyTextMessageRequest>;
export interface SendNotifyTextMessageResult {
  MessageId?: string;
  TemplateId?: string;
  ResolvedMessageBody?: string;
}
export const SendNotifyTextMessageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageId: S.optional(S.String),
    TemplateId: S.optional(S.String),
    ResolvedMessageBody: S.optional(S.String),
  }),
).annotate({
  identifier: "SendNotifyTextMessageResult",
}) as any as S.Schema<SendNotifyTextMessageResult>;
export interface SendNotifyVoiceMessageRequest {
  NotifyConfigurationId: string;
  DestinationPhoneNumber: string;
  TemplateId?: string;
  TemplateVariables: { [key: string]: string | undefined };
  VoiceId?: string;
  TimeToLive?: number;
  Context?: { [key: string]: string | undefined };
  ConfigurationSetName?: string;
  DryRun?: boolean;
  MessageFeedbackEnabled?: boolean;
}
export const SendNotifyVoiceMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyConfigurationId: S.String,
    DestinationPhoneNumber: S.String,
    TemplateId: S.optional(S.String),
    TemplateVariables: TemplateVariableSubstitutionMap,
    VoiceId: S.optional(S.String),
    TimeToLive: S.optional(S.Number),
    Context: S.optional(ContextMap),
    ConfigurationSetName: S.optional(S.String),
    DryRun: S.optional(S.Boolean),
    MessageFeedbackEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SendNotifyVoiceMessageRequest",
}) as any as S.Schema<SendNotifyVoiceMessageRequest>;
export interface SendNotifyVoiceMessageResult {
  MessageId?: string;
  TemplateId?: string;
  ResolvedMessageBody?: string;
}
export const SendNotifyVoiceMessageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageId: S.optional(S.String),
    TemplateId: S.optional(S.String),
    ResolvedMessageBody: S.optional(S.String),
  }),
).annotate({
  identifier: "SendNotifyVoiceMessageResult",
}) as any as S.Schema<SendNotifyVoiceMessageResult>;
export type RcsMessageOriginationIdentity = string;
export type RcsTextBody = string;
export interface RcsTextMessage {
  Body: string;
}
export const RcsTextMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Body: S.String }),
).annotate({ identifier: "RcsTextMessage" }) as any as S.Schema<RcsTextMessage>;
export type RcsMediaUrl = string;
export interface RcsFileMessage {
  FileUrl: string;
  ThumbnailUrl?: string;
}
export const RcsFileMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileUrl: S.String, ThumbnailUrl: S.optional(S.String) }),
).annotate({ identifier: "RcsFileMessage" }) as any as S.Schema<RcsFileMessage>;
export type RcsCardTitle = string;
export type RcsCardDescription = string;
export interface RcsCardMedia {
  FileUrl: string;
  ThumbnailUrl?: string;
  Height?: string;
}
export const RcsCardMedia = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileUrl: S.String,
    ThumbnailUrl: S.optional(S.String),
    Height: S.optional(S.String),
  }),
).annotate({ identifier: "RcsCardMedia" }) as any as S.Schema<RcsCardMedia>;
export type RcsSuggestedActionText = string;
export type RcsPostbackData = string;
export interface RcsReplyAction {
  Text: string;
  PostbackData: string;
}
export const RcsReplyAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Text: S.String, PostbackData: S.String }),
).annotate({ identifier: "RcsReplyAction" }) as any as S.Schema<RcsReplyAction>;
export type RcsOpenUrlValue = string;
export interface RcsOpenUrlAction {
  Text: string;
  PostbackData: string;
  Url: string;
  Application?: string;
  WebviewViewMode?: string;
}
export const RcsOpenUrlAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Text: S.String,
    PostbackData: S.String,
    Url: S.String,
    Application: S.optional(S.String),
    WebviewViewMode: S.optional(S.String),
  }),
).annotate({
  identifier: "RcsOpenUrlAction",
}) as any as S.Schema<RcsOpenUrlAction>;
export interface RcsDialPhoneAction {
  Text: string;
  PostbackData: string;
  PhoneNumber: string;
}
export const RcsDialPhoneAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Text: S.String, PostbackData: S.String, PhoneNumber: S.String }),
).annotate({
  identifier: "RcsDialPhoneAction",
}) as any as S.Schema<RcsDialPhoneAction>;
export type RcsLocationLabel = string;
export interface RcsShowLocationAction {
  Text: string;
  PostbackData: string;
  Latitude: number;
  Longitude: number;
  Label?: string;
}
export const RcsShowLocationAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Text: S.String,
    PostbackData: S.String,
    Latitude: S.Number,
    Longitude: S.Number,
    Label: S.optional(S.String),
  }),
).annotate({
  identifier: "RcsShowLocationAction",
}) as any as S.Schema<RcsShowLocationAction>;
export interface RcsRequestLocationAction {
  Text: string;
  PostbackData: string;
}
export const RcsRequestLocationAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Text: S.String, PostbackData: S.String }),
).annotate({
  identifier: "RcsRequestLocationAction",
}) as any as S.Schema<RcsRequestLocationAction>;
export type RcsCalendarEventTitle = string;
export type RcsCalendarEventDescription = string;
export interface RcsCreateCalendarEventAction {
  Text: string;
  PostbackData: string;
  Title: string;
  StartTime: Date;
  EndTime: Date;
  Description?: string;
}
export const RcsCreateCalendarEventAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Text: S.String,
    PostbackData: S.String,
    Title: S.String,
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "RcsCreateCalendarEventAction",
}) as any as S.Schema<RcsCreateCalendarEventAction>;
export type RcsSuggestedAction =
  | {
      Reply: RcsReplyAction;
      OpenUrl?: never;
      DialPhone?: never;
      ShowLocation?: never;
      RequestLocation?: never;
      CreateCalendarEvent?: never;
    }
  | {
      Reply?: never;
      OpenUrl: RcsOpenUrlAction;
      DialPhone?: never;
      ShowLocation?: never;
      RequestLocation?: never;
      CreateCalendarEvent?: never;
    }
  | {
      Reply?: never;
      OpenUrl?: never;
      DialPhone: RcsDialPhoneAction;
      ShowLocation?: never;
      RequestLocation?: never;
      CreateCalendarEvent?: never;
    }
  | {
      Reply?: never;
      OpenUrl?: never;
      DialPhone?: never;
      ShowLocation: RcsShowLocationAction;
      RequestLocation?: never;
      CreateCalendarEvent?: never;
    }
  | {
      Reply?: never;
      OpenUrl?: never;
      DialPhone?: never;
      ShowLocation?: never;
      RequestLocation: RcsRequestLocationAction;
      CreateCalendarEvent?: never;
    }
  | {
      Reply?: never;
      OpenUrl?: never;
      DialPhone?: never;
      ShowLocation?: never;
      RequestLocation?: never;
      CreateCalendarEvent: RcsCreateCalendarEventAction;
    };
export const RcsSuggestedAction = /*@__PURE__*/ S.Union([
  S.Struct({ Reply: RcsReplyAction }),
  S.Struct({ OpenUrl: RcsOpenUrlAction }),
  S.Struct({ DialPhone: RcsDialPhoneAction }),
  S.Struct({ ShowLocation: RcsShowLocationAction }),
  S.Struct({ RequestLocation: RcsRequestLocationAction }),
  S.Struct({ CreateCalendarEvent: RcsCreateCalendarEventAction }),
]);
export type RcsCardSuggestedActionList = RcsSuggestedAction[];
export const RcsCardSuggestedActionList =
  /*@__PURE__*/ S.Array(RcsSuggestedAction);
export interface RcsCardContent {
  Title?: string;
  Description?: string;
  Media?: RcsCardMedia;
  Suggestions?: RcsSuggestedAction[];
}
export const RcsCardContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.optional(S.String),
    Description: S.optional(S.String),
    Media: S.optional(RcsCardMedia),
    Suggestions: S.optional(RcsCardSuggestedActionList),
  }),
).annotate({ identifier: "RcsCardContent" }) as any as S.Schema<RcsCardContent>;
export interface RcsStandaloneCard {
  CardOrientation: string;
  ThumbnailImageAlignment?: string;
  CardContent: RcsCardContent;
}
export const RcsStandaloneCard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CardOrientation: S.String,
    ThumbnailImageAlignment: S.optional(S.String),
    CardContent: RcsCardContent,
  }),
).annotate({
  identifier: "RcsStandaloneCard",
}) as any as S.Schema<RcsStandaloneCard>;
export interface RcsCarouselCardMedia {
  FileUrl: string;
  ThumbnailUrl?: string;
  Height?: string;
}
export const RcsCarouselCardMedia = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileUrl: S.String,
    ThumbnailUrl: S.optional(S.String),
    Height: S.optional(S.String),
  }),
).annotate({
  identifier: "RcsCarouselCardMedia",
}) as any as S.Schema<RcsCarouselCardMedia>;
export interface RcsCarouselCardContent {
  Title?: string;
  Description?: string;
  Media?: RcsCarouselCardMedia;
  Suggestions?: RcsSuggestedAction[];
}
export const RcsCarouselCardContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.optional(S.String),
    Description: S.optional(S.String),
    Media: S.optional(RcsCarouselCardMedia),
    Suggestions: S.optional(RcsCardSuggestedActionList),
  }),
).annotate({
  identifier: "RcsCarouselCardContent",
}) as any as S.Schema<RcsCarouselCardContent>;
export type RcsCarouselCardContentList = RcsCarouselCardContent[];
export const RcsCarouselCardContentList = /*@__PURE__*/ S.Array(
  RcsCarouselCardContent,
);
export interface RcsCarousel {
  CardWidth: string;
  CardContents: RcsCarouselCardContent[];
}
export const RcsCarousel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CardWidth: S.String, CardContents: RcsCarouselCardContentList }),
).annotate({ identifier: "RcsCarousel" }) as any as S.Schema<RcsCarousel>;
export type RcsContent =
  | {
      TextMessage: RcsTextMessage;
      FileMessage?: never;
      RichCard?: never;
      Carousel?: never;
    }
  | {
      TextMessage?: never;
      FileMessage: RcsFileMessage;
      RichCard?: never;
      Carousel?: never;
    }
  | {
      TextMessage?: never;
      FileMessage?: never;
      RichCard: RcsStandaloneCard;
      Carousel?: never;
    }
  | {
      TextMessage?: never;
      FileMessage?: never;
      RichCard?: never;
      Carousel: RcsCarousel;
    };
export const RcsContent = /*@__PURE__*/ S.Union([
  S.Struct({ TextMessage: RcsTextMessage }),
  S.Struct({ FileMessage: RcsFileMessage }),
  S.Struct({ RichCard: RcsStandaloneCard }),
  S.Struct({ Carousel: RcsCarousel }),
]);
export type RcsSuggestedActionList = RcsSuggestedAction[];
export const RcsSuggestedActionList = /*@__PURE__*/ S.Array(RcsSuggestedAction);
export interface RcsMessageContent {
  Content: RcsContent;
  Suggestions?: RcsSuggestedAction[];
}
export const RcsMessageContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Content: RcsContent,
    Suggestions: S.optional(RcsSuggestedActionList),
  }),
).annotate({
  identifier: "RcsMessageContent",
}) as any as S.Schema<RcsMessageContent>;
export type RcsTimeToLive = number;
export type RcsMessageTrafficType = string;
export type RcsFallbackChannel = string;
export type RcsFallbackMessageBody = string;
export type RcsFallbackOriginationIdentity = string;
export interface RcsFallbackConfiguration {
  Channel: string;
  MessageBody?: string;
  MediaUrls?: string[];
  OriginationIdentity?: string;
}
export const RcsFallbackConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Channel: S.String,
    MessageBody: S.optional(S.String),
    MediaUrls: S.optional(MediaUrlList),
    OriginationIdentity: S.optional(S.String),
  }),
).annotate({
  identifier: "RcsFallbackConfiguration",
}) as any as S.Schema<RcsFallbackConfiguration>;
export interface SendRcsMessageRequest {
  DestinationPhoneNumber: string;
  OriginationIdentity: string;
  RcsMessageContent?: RcsMessageContent;
  TimeToLive?: number;
  MessageTrafficType?: string;
  FallbackConfiguration?: RcsFallbackConfiguration;
  ProtectConfigurationId?: string;
  ConfigurationSetName?: string;
  MaxPrice?: string;
  DryRun?: boolean;
  Context?: { [key: string]: string | undefined };
  MessageFeedbackEnabled?: boolean;
}
export const SendRcsMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationPhoneNumber: S.String,
    OriginationIdentity: S.String,
    RcsMessageContent: S.optional(RcsMessageContent),
    TimeToLive: S.optional(S.Number),
    MessageTrafficType: S.optional(S.String),
    FallbackConfiguration: S.optional(RcsFallbackConfiguration),
    ProtectConfigurationId: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    MaxPrice: S.optional(S.String),
    DryRun: S.optional(S.Boolean),
    Context: S.optional(ContextMap),
    MessageFeedbackEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SendRcsMessageRequest",
}) as any as S.Schema<SendRcsMessageRequest>;
export interface SendRcsMessageResult {
  MessageId?: string;
}
export const SendRcsMessageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.optional(S.String) }),
).annotate({
  identifier: "SendRcsMessageResult",
}) as any as S.Schema<SendRcsMessageResult>;
export type TextMessageOriginationIdentity = string;
export interface SendTextMessageRequest {
  DestinationPhoneNumber: string;
  OriginationIdentity?: string;
  MessageBody?: string;
  MessageType?: string;
  Keyword?: string;
  ConfigurationSetName?: string;
  MaxPrice?: string;
  TimeToLive?: number;
  Context?: { [key: string]: string | undefined };
  DestinationCountryParameters?: { [key: string]: string | undefined };
  DryRun?: boolean;
  ProtectConfigurationId?: string;
  MessageFeedbackEnabled?: boolean;
}
export const SendTextMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationPhoneNumber: S.String,
    OriginationIdentity: S.optional(S.String),
    MessageBody: S.optional(S.String),
    MessageType: S.optional(S.String),
    Keyword: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    MaxPrice: S.optional(S.String),
    TimeToLive: S.optional(S.Number),
    Context: S.optional(ContextMap),
    DestinationCountryParameters: S.optional(DestinationCountryParameters),
    DryRun: S.optional(S.Boolean),
    ProtectConfigurationId: S.optional(S.String),
    MessageFeedbackEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SendTextMessageRequest",
}) as any as S.Schema<SendTextMessageRequest>;
export interface SendTextMessageResult {
  MessageId?: string;
}
export const SendTextMessageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.optional(S.String) }),
).annotate({
  identifier: "SendTextMessageResult",
}) as any as S.Schema<SendTextMessageResult>;
export type VoiceMessageOriginationIdentity = string;
export type VoiceMessageBody = string;
export type VoiceMessageBodyTextType = string;
export interface SendVoiceMessageRequest {
  DestinationPhoneNumber: string;
  OriginationIdentity: string;
  MessageBody?: string;
  MessageBodyTextType?: string;
  VoiceId?: string;
  ConfigurationSetName?: string;
  MaxPricePerMinute?: string;
  TimeToLive?: number;
  Context?: { [key: string]: string | undefined };
  DryRun?: boolean;
  ProtectConfigurationId?: string;
  MessageFeedbackEnabled?: boolean;
}
export const SendVoiceMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationPhoneNumber: S.String,
    OriginationIdentity: S.String,
    MessageBody: S.optional(S.String),
    MessageBodyTextType: S.optional(S.String),
    VoiceId: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    MaxPricePerMinute: S.optional(S.String),
    TimeToLive: S.optional(S.Number),
    Context: S.optional(ContextMap),
    DryRun: S.optional(S.Boolean),
    ProtectConfigurationId: S.optional(S.String),
    MessageFeedbackEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SendVoiceMessageRequest",
}) as any as S.Schema<SendVoiceMessageRequest>;
export interface SendVoiceMessageResult {
  MessageId?: string;
}
export const SendVoiceMessageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.optional(S.String) }),
).annotate({
  identifier: "SendVoiceMessageResult",
}) as any as S.Schema<SendVoiceMessageResult>;
export interface SetAccountDefaultProtectConfigurationRequest {
  ProtectConfigurationId: string;
}
export const SetAccountDefaultProtectConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ProtectConfigurationId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "SetAccountDefaultProtectConfigurationRequest",
  }) as any as S.Schema<SetAccountDefaultProtectConfigurationRequest>;
export interface SetAccountDefaultProtectConfigurationResult {
  DefaultProtectConfigurationArn: string;
  DefaultProtectConfigurationId: string;
}
export const SetAccountDefaultProtectConfigurationResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DefaultProtectConfigurationArn: S.String,
      DefaultProtectConfigurationId: S.String,
    }),
  ).annotate({
    identifier: "SetAccountDefaultProtectConfigurationResult",
  }) as any as S.Schema<SetAccountDefaultProtectConfigurationResult>;
export interface SetDefaultMessageFeedbackEnabledRequest {
  ConfigurationSetName: string;
  MessageFeedbackEnabled: boolean;
}
export const SetDefaultMessageFeedbackEnabledRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigurationSetName: S.String,
      MessageFeedbackEnabled: S.Boolean,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "SetDefaultMessageFeedbackEnabledRequest",
}) as any as S.Schema<SetDefaultMessageFeedbackEnabledRequest>;
export interface SetDefaultMessageFeedbackEnabledResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  MessageFeedbackEnabled?: boolean;
}
export const SetDefaultMessageFeedbackEnabledResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigurationSetArn: S.optional(S.String),
      ConfigurationSetName: S.optional(S.String),
      MessageFeedbackEnabled: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "SetDefaultMessageFeedbackEnabledResult",
}) as any as S.Schema<SetDefaultMessageFeedbackEnabledResult>;
export interface SetDefaultMessageTypeRequest {
  ConfigurationSetName: string;
  MessageType: string;
}
export const SetDefaultMessageTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConfigurationSetName: S.String, MessageType: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SetDefaultMessageTypeRequest",
}) as any as S.Schema<SetDefaultMessageTypeRequest>;
export interface SetDefaultMessageTypeResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  MessageType?: string;
}
export const SetDefaultMessageTypeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetArn: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    MessageType: S.optional(S.String),
  }),
).annotate({
  identifier: "SetDefaultMessageTypeResult",
}) as any as S.Schema<SetDefaultMessageTypeResult>;
export interface SetDefaultSenderIdRequest {
  ConfigurationSetName: string;
  SenderId: string;
}
export const SetDefaultSenderIdRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConfigurationSetName: S.String, SenderId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SetDefaultSenderIdRequest",
}) as any as S.Schema<SetDefaultSenderIdRequest>;
export interface SetDefaultSenderIdResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  SenderId?: string;
}
export const SetDefaultSenderIdResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetArn: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    SenderId: S.optional(S.String),
  }),
).annotate({
  identifier: "SetDefaultSenderIdResult",
}) as any as S.Schema<SetDefaultSenderIdResult>;
export interface SetMediaMessageSpendLimitOverrideRequest {
  MonthlyLimit: number;
}
export const SetMediaMessageSpendLimitOverrideRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ MonthlyLimit: S.Number }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "SetMediaMessageSpendLimitOverrideRequest",
}) as any as S.Schema<SetMediaMessageSpendLimitOverrideRequest>;
export interface SetMediaMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export const SetMediaMessageSpendLimitOverrideResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ MonthlyLimit: S.optional(S.Number) }),
).annotate({
  identifier: "SetMediaMessageSpendLimitOverrideResult",
}) as any as S.Schema<SetMediaMessageSpendLimitOverrideResult>;
export interface SetNotifyMessageSpendLimitOverrideRequest {
  MonthlyLimit: number;
}
export const SetNotifyMessageSpendLimitOverrideRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ MonthlyLimit: S.Number }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "SetNotifyMessageSpendLimitOverrideRequest",
  }) as any as S.Schema<SetNotifyMessageSpendLimitOverrideRequest>;
export interface SetNotifyMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export const SetNotifyMessageSpendLimitOverrideResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ MonthlyLimit: S.optional(S.Number) }),
).annotate({
  identifier: "SetNotifyMessageSpendLimitOverrideResult",
}) as any as S.Schema<SetNotifyMessageSpendLimitOverrideResult>;
export interface SetRcsMessageSpendLimitOverrideRequest {
  MonthlyLimit: number;
}
export const SetRcsMessageSpendLimitOverrideRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ MonthlyLimit: S.Number }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "SetRcsMessageSpendLimitOverrideRequest",
}) as any as S.Schema<SetRcsMessageSpendLimitOverrideRequest>;
export interface SetRcsMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export const SetRcsMessageSpendLimitOverrideResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ MonthlyLimit: S.optional(S.Number) }),
).annotate({
  identifier: "SetRcsMessageSpendLimitOverrideResult",
}) as any as S.Schema<SetRcsMessageSpendLimitOverrideResult>;
export interface SetTextMessageSpendLimitOverrideRequest {
  MonthlyLimit: number;
}
export const SetTextMessageSpendLimitOverrideRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ MonthlyLimit: S.Number }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "SetTextMessageSpendLimitOverrideRequest",
}) as any as S.Schema<SetTextMessageSpendLimitOverrideRequest>;
export interface SetTextMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export const SetTextMessageSpendLimitOverrideResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ MonthlyLimit: S.optional(S.Number) }),
).annotate({
  identifier: "SetTextMessageSpendLimitOverrideResult",
}) as any as S.Schema<SetTextMessageSpendLimitOverrideResult>;
export interface SetVoiceMessageSpendLimitOverrideRequest {
  MonthlyLimit: number;
}
export const SetVoiceMessageSpendLimitOverrideRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ MonthlyLimit: S.Number }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "SetVoiceMessageSpendLimitOverrideRequest",
}) as any as S.Schema<SetVoiceMessageSpendLimitOverrideRequest>;
export interface SetVoiceMessageSpendLimitOverrideResult {
  MonthlyLimit?: number;
}
export const SetVoiceMessageSpendLimitOverrideResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({ MonthlyLimit: S.optional(S.Number) }),
).annotate({
  identifier: "SetVoiceMessageSpendLimitOverrideResult",
}) as any as S.Schema<SetVoiceMessageSpendLimitOverrideResult>;
export interface SubmitRegistrationVersionRequest {
  RegistrationId: string;
  AwsReview?: boolean;
}
export const SubmitRegistrationVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RegistrationId: S.String, AwsReview: S.optional(S.Boolean) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "SubmitRegistrationVersionRequest",
}) as any as S.Schema<SubmitRegistrationVersionRequest>;
export interface SubmitRegistrationVersionResult {
  RegistrationArn: string;
  RegistrationId: string;
  VersionNumber: number;
  RegistrationVersionStatus: string;
  RegistrationVersionStatusHistory: RegistrationVersionStatusHistory;
  AwsReview: boolean;
}
export const SubmitRegistrationVersionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RegistrationArn: S.String,
    RegistrationId: S.String,
    VersionNumber: S.Number,
    RegistrationVersionStatus: S.String,
    RegistrationVersionStatusHistory: RegistrationVersionStatusHistory,
    AwsReview: S.Boolean,
  }),
).annotate({
  identifier: "SubmitRegistrationVersionResult",
}) as any as S.Schema<SubmitRegistrationVersionResult>;
export type NonEmptyTagList = Tag[];
export const NonEmptyTagList = /*@__PURE__*/ S.Array(Tag);
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: NonEmptyTagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResult {}
export const TagResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TagResourceResult",
}) as any as S.Schema<TagResourceResult>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResult {}
export const UntagResourceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResult",
}) as any as S.Schema<UntagResourceResult>;
export interface UpdateEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  Enabled?: boolean;
  MatchingEventTypes?: string[];
  CloudWatchLogsDestination?: CloudWatchLogsDestination;
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  SnsDestination?: SnsDestination;
}
export const UpdateEventDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.String,
    EventDestinationName: S.String,
    Enabled: S.optional(S.Boolean),
    MatchingEventTypes: S.optional(EventTypeList),
    CloudWatchLogsDestination: S.optional(CloudWatchLogsDestination),
    KinesisFirehoseDestination: S.optional(KinesisFirehoseDestination),
    SnsDestination: S.optional(SnsDestination),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateEventDestinationRequest",
}) as any as S.Schema<UpdateEventDestinationRequest>;
export interface UpdateEventDestinationResult {
  ConfigurationSetArn?: string;
  ConfigurationSetName?: string;
  EventDestination?: EventDestination;
}
export const UpdateEventDestinationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetArn: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    EventDestination: S.optional(EventDestination),
  }),
).annotate({
  identifier: "UpdateEventDestinationResult",
}) as any as S.Schema<UpdateEventDestinationResult>;
export type NotifyPoolIdOrUnset = string;
export interface UpdateNotifyConfigurationRequest {
  NotifyConfigurationId: string;
  DefaultTemplateId?: string;
  PoolId?: string;
  EnabledCountries?: string[];
  EnabledChannels?: string[];
  DeletionProtectionEnabled?: boolean;
}
export const UpdateNotifyConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyConfigurationId: S.String,
    DefaultTemplateId: S.optional(S.String),
    PoolId: S.optional(S.String),
    EnabledCountries: S.optional(IsoCountryCodeList),
    EnabledChannels: S.optional(NotifyEnabledChannelsList),
    DeletionProtectionEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateNotifyConfigurationRequest",
}) as any as S.Schema<UpdateNotifyConfigurationRequest>;
export interface UpdateNotifyConfigurationResult {
  NotifyConfigurationArn: string;
  NotifyConfigurationId: string;
  DisplayName: string;
  UseCase: string;
  DefaultTemplateId?: string;
  PoolId?: string;
  EnabledCountries?: string[];
  EnabledChannels: string[];
  Tier: string;
  TierUpgradeStatus: string;
  Status: string;
  RejectionReason?: string;
  DeletionProtectionEnabled: boolean;
  CreatedTimestamp: Date;
}
export const UpdateNotifyConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotifyConfigurationArn: S.String,
    NotifyConfigurationId: S.String,
    DisplayName: S.String,
    UseCase: S.String,
    DefaultTemplateId: S.optional(S.String),
    PoolId: S.optional(S.String),
    EnabledCountries: S.optional(IsoCountryCodeList),
    EnabledChannels: NotifyEnabledChannelsList,
    Tier: S.String,
    TierUpgradeStatus: S.String,
    Status: S.String,
    RejectionReason: S.optional(S.String),
    DeletionProtectionEnabled: S.Boolean,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "UpdateNotifyConfigurationResult",
}) as any as S.Schema<UpdateNotifyConfigurationResult>;
export interface UpdatePhoneNumberRequest {
  PhoneNumberId: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  InternationalSendingEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
}
export const UpdatePhoneNumberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberId: S.String,
    TwoWayEnabled: S.optional(S.Boolean),
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.optional(S.Boolean),
    OptOutListName: S.optional(S.String),
    InternationalSendingEnabled: S.optional(S.Boolean),
    DeletionProtectionEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePhoneNumberRequest",
}) as any as S.Schema<UpdatePhoneNumberRequest>;
export interface UpdatePhoneNumberResult {
  PhoneNumberArn?: string;
  PhoneNumberId?: string;
  PhoneNumber?: string;
  Status?: string;
  IsoCountryCode?: string;
  MessageType?: string;
  NumberCapabilities?: string[];
  NumberType?: string;
  MonthlyLeasingPrice?: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  InternationalSendingEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
  RegistrationId?: string;
  CreatedTimestamp?: Date;
}
export const UpdatePhoneNumberResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PhoneNumberArn: S.optional(S.String),
    PhoneNumberId: S.optional(S.String),
    PhoneNumber: S.optional(S.String),
    Status: S.optional(S.String),
    IsoCountryCode: S.optional(S.String),
    MessageType: S.optional(S.String),
    NumberCapabilities: S.optional(NumberCapabilityList),
    NumberType: S.optional(S.String),
    MonthlyLeasingPrice: S.optional(S.String),
    TwoWayEnabled: S.optional(S.Boolean),
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.optional(S.Boolean),
    OptOutListName: S.optional(S.String),
    InternationalSendingEnabled: S.optional(S.Boolean),
    DeletionProtectionEnabled: S.optional(S.Boolean),
    RegistrationId: S.optional(S.String),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "UpdatePhoneNumberResult",
}) as any as S.Schema<UpdatePhoneNumberResult>;
export interface UpdatePoolRequest {
  PoolId: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  SharedRoutesEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
}
export const UpdatePoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolId: S.String,
    TwoWayEnabled: S.optional(S.Boolean),
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.optional(S.Boolean),
    OptOutListName: S.optional(S.String),
    SharedRoutesEnabled: S.optional(S.Boolean),
    DeletionProtectionEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdatePoolRequest",
}) as any as S.Schema<UpdatePoolRequest>;
export interface UpdatePoolResult {
  PoolArn?: string;
  PoolId?: string;
  Status?: string;
  MessageType?: string;
  TwoWayEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  SelfManagedOptOutsEnabled?: boolean;
  OptOutListName?: string;
  SharedRoutesEnabled?: boolean;
  DeletionProtectionEnabled?: boolean;
  CreatedTimestamp?: Date;
}
export const UpdatePoolResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolArn: S.optional(S.String),
    PoolId: S.optional(S.String),
    Status: S.optional(S.String),
    MessageType: S.optional(S.String),
    TwoWayEnabled: S.optional(S.Boolean),
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.optional(S.Boolean),
    OptOutListName: S.optional(S.String),
    SharedRoutesEnabled: S.optional(S.Boolean),
    DeletionProtectionEnabled: S.optional(S.Boolean),
    CreatedTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "UpdatePoolResult",
}) as any as S.Schema<UpdatePoolResult>;
export interface UpdateProtectConfigurationRequest {
  ProtectConfigurationId: string;
  DeletionProtectionEnabled?: boolean;
}
export const UpdateProtectConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProtectConfigurationId: S.String,
    DeletionProtectionEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateProtectConfigurationRequest",
}) as any as S.Schema<UpdateProtectConfigurationRequest>;
export interface UpdateProtectConfigurationResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  CreatedTimestamp: Date;
  AccountDefault: boolean;
  DeletionProtectionEnabled: boolean;
}
export const UpdateProtectConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProtectConfigurationArn: S.String,
    ProtectConfigurationId: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    AccountDefault: S.Boolean,
    DeletionProtectionEnabled: S.Boolean,
  }),
).annotate({
  identifier: "UpdateProtectConfigurationResult",
}) as any as S.Schema<UpdateProtectConfigurationResult>;
export interface UpdateProtectConfigurationCountryRuleSetRequest {
  ProtectConfigurationId: string;
  NumberCapability: string;
  CountryRuleSetUpdates: {
    [key: string]: ProtectConfigurationCountryRuleSetInformation | undefined;
  };
}
export const UpdateProtectConfigurationCountryRuleSetRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProtectConfigurationId: S.String,
      NumberCapability: S.String,
      CountryRuleSetUpdates: ProtectConfigurationCountryRuleSet,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
  ).annotate({
    identifier: "UpdateProtectConfigurationCountryRuleSetRequest",
  }) as any as S.Schema<UpdateProtectConfigurationCountryRuleSetRequest>;
export interface UpdateProtectConfigurationCountryRuleSetResult {
  ProtectConfigurationArn: string;
  ProtectConfigurationId: string;
  NumberCapability: string;
  CountryRuleSet: {
    [key: string]: ProtectConfigurationCountryRuleSetInformation | undefined;
  };
}
export const UpdateProtectConfigurationCountryRuleSetResult =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ProtectConfigurationArn: S.String,
      ProtectConfigurationId: S.String,
      NumberCapability: S.String,
      CountryRuleSet: ProtectConfigurationCountryRuleSet,
    }),
  ).annotate({
    identifier: "UpdateProtectConfigurationCountryRuleSetResult",
  }) as any as S.Schema<UpdateProtectConfigurationCountryRuleSetResult>;
export type TwoWayMediaS3BucketNameOrUnset = string;
export type IamRoleArnOrUnset = string;
export interface UpdateRcsAgentRequest {
  RcsAgentId: string;
  DeletionProtectionEnabled?: boolean;
  OptOutListName?: string;
  SelfManagedOptOutsEnabled?: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  TwoWayEnabled?: boolean;
  TwoWayMediaS3BucketName?: string;
  TwoWayMediaS3KeyPrefix?: string;
  TwoWayMediaS3Role?: string;
  TwoWayRcsEventsEnabled?: string[];
}
export const UpdateRcsAgentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RcsAgentId: S.String,
    DeletionProtectionEnabled: S.optional(S.Boolean),
    OptOutListName: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.optional(S.Boolean),
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    TwoWayEnabled: S.optional(S.Boolean),
    TwoWayMediaS3BucketName: S.optional(S.String),
    TwoWayMediaS3KeyPrefix: S.optional(S.String),
    TwoWayMediaS3Role: S.optional(S.String),
    TwoWayRcsEventsEnabled: S.optional(RcsEventTypeList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateRcsAgentRequest",
}) as any as S.Schema<UpdateRcsAgentRequest>;
export interface UpdateRcsAgentResult {
  RcsAgentArn: string;
  RcsAgentId: string;
  Status: string;
  CreatedTimestamp: Date;
  DeletionProtectionEnabled: boolean;
  OptOutListName?: string;
  SelfManagedOptOutsEnabled: boolean;
  TwoWayChannelArn?: string;
  TwoWayChannelRole?: string;
  TwoWayEnabled: boolean;
  TwoWayMediaS3BucketName?: string;
  TwoWayMediaS3KeyPrefix?: string;
  TwoWayMediaS3Role?: string;
  TwoWayRcsEventsEnabled?: string[];
}
export const UpdateRcsAgentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RcsAgentArn: S.String,
    RcsAgentId: S.String,
    Status: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    DeletionProtectionEnabled: S.Boolean,
    OptOutListName: S.optional(S.String),
    SelfManagedOptOutsEnabled: S.Boolean,
    TwoWayChannelArn: S.optional(S.String),
    TwoWayChannelRole: S.optional(S.String),
    TwoWayEnabled: S.Boolean,
    TwoWayMediaS3BucketName: S.optional(S.String),
    TwoWayMediaS3KeyPrefix: S.optional(S.String),
    TwoWayMediaS3Role: S.optional(S.String),
    TwoWayRcsEventsEnabled: S.optional(RcsEventTypeList),
  }),
).annotate({
  identifier: "UpdateRcsAgentResult",
}) as any as S.Schema<UpdateRcsAgentResult>;
export interface UpdateSenderIdRequest {
  SenderId: string;
  IsoCountryCode: string;
  DeletionProtectionEnabled?: boolean;
}
export const UpdateSenderIdRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SenderId: S.String,
    IsoCountryCode: S.String,
    DeletionProtectionEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateSenderIdRequest",
}) as any as S.Schema<UpdateSenderIdRequest>;
export interface UpdateSenderIdResult {
  SenderIdArn: string;
  SenderId: string;
  IsoCountryCode: string;
  MessageTypes: string[];
  MonthlyLeasingPrice: string;
  DeletionProtectionEnabled: boolean;
  Registered: boolean;
  RegistrationId?: string;
}
export const UpdateSenderIdResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SenderIdArn: S.String,
    SenderId: S.String,
    IsoCountryCode: S.String,
    MessageTypes: MessageTypeList,
    MonthlyLeasingPrice: S.String,
    DeletionProtectionEnabled: S.Boolean,
    Registered: S.Boolean,
    RegistrationId: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateSenderIdResult",
}) as any as S.Schema<UpdateSenderIdResult>;
export type VerificationCode = string;
export interface VerifyDestinationNumberRequest {
  VerifiedDestinationNumberId: string;
  VerificationCode: string;
}
export const VerifyDestinationNumberRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VerifiedDestinationNumberId: S.String,
    VerificationCode: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "VerifyDestinationNumberRequest",
}) as any as S.Schema<VerifyDestinationNumberRequest>;
export interface VerifyDestinationNumberResult {
  VerifiedDestinationNumberArn: string;
  VerifiedDestinationNumberId: string;
  DestinationPhoneNumber: string;
  Status: string;
  CreatedTimestamp: Date;
}
export const VerifyDestinationNumberResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VerifiedDestinationNumberArn: S.String,
    VerifiedDestinationNumberId: S.String,
    DestinationPhoneNumber: S.String,
    Status: S.String,
    CreatedTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "VerifyDestinationNumberResult",
}) as any as S.Schema<VerifyDestinationNumberResult>;
export type AccessDeniedExceptionReason = string;
export type ConflictExceptionReason = string;
export type ResourceType = string;
export type ServiceQuotaExceededExceptionReason = string;
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  Name: string;
  Message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type AssociateOriginationIdentityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the specified origination identity with a pool.
 *
 * If the origination identity is a phone number and is already associated with another pool, an error is returned. A sender ID can be associated with multiple pools.
 *
 * If the origination identity configuration doesn't match the pool's configuration, an error is returned.
 */
export const associateOriginationIdentity: API.OperationMethod<
  AssociateOriginationIdentityRequest,
  AssociateOriginationIdentityResult,
  AssociateOriginationIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateOriginationIdentityRequest,
  output: AssociateOriginationIdentityResult,
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
  operationName: "AssociateOriginationIdentity",
}));

export type AssociateProtectConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate a protect configuration with a configuration set. This replaces the configuration sets current protect configuration. A configuration set can only be associated with one protect configuration at a time. A protect configuration can be associated with multiple configuration sets.
 */
export const associateProtectConfiguration: API.OperationMethod<
  AssociateProtectConfigurationRequest,
  AssociateProtectConfigurationResult,
  AssociateProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateProtectConfigurationRequest,
  output: AssociateProtectConfigurationResult,
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
  operationName: "AssociateProtectConfiguration",
}));

export type CarrierLookupError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a destination phone number, including whether the number type and whether it is valid, the carrier, and more.
 */
export const carrierLookup: API.OperationMethod<
  CarrierLookupRequest,
  CarrierLookupResult,
  CarrierLookupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CarrierLookupRequest,
  output: CarrierLookupResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CarrierLookup",
}));

export type CreateConfigurationSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new configuration set. After you create the configuration set, you can add one or more event destinations to it.
 *
 * A configuration set is a set of rules that you apply to the SMS and voice messages that you send.
 *
 * When you send a message, you can optionally specify a single configuration set.
 */
export const createConfigurationSet: API.OperationMethod<
  CreateConfigurationSetRequest,
  CreateConfigurationSetResult,
  CreateConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationSetRequest,
  output: CreateConfigurationSetResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSet",
}));

export type CreateEventDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new event destination in a configuration set.
 *
 * An event destination is a location where you send message events. The event options are Amazon CloudWatch, Amazon Data Firehose, or Amazon SNS. For example, when a message is delivered successfully, you can send information about that event to an event destination, or send notifications to endpoints that are subscribed to an Amazon SNS topic.
 *
 * You can only create one event destination at a time. You must provide a value for a single event destination using either `CloudWatchLogsDestination`, `KinesisFirehoseDestination` or `SnsDestination`. If an event destination isn't provided then an exception is returned.
 *
 * Each configuration set can contain between 0 and 5 event destinations. Each event destination can contain a reference to a single destination, such as a CloudWatch or Firehose destination.
 */
export const createEventDestination: API.OperationMethod<
  CreateEventDestinationRequest,
  CreateEventDestinationResult,
  CreateEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEventDestinationRequest,
  output: CreateEventDestinationResult,
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
  operationName: "CreateEventDestination",
}));

export type CreateNotifyConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new notify configuration for managed messaging. A notify configuration defines the settings for sending templated messages, including the display name, use case, enabled channels, and enabled countries.
 */
export const createNotifyConfiguration: API.OperationMethod<
  CreateNotifyConfigurationRequest,
  CreateNotifyConfigurationResult,
  CreateNotifyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNotifyConfigurationRequest,
  output: CreateNotifyConfigurationResult,
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
  operationName: "CreateNotifyConfiguration",
}));

export type CreateOptOutListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new opt-out list.
 *
 * If the opt-out list name already exists, an error is returned.
 *
 * An opt-out list is a list of phone numbers that are opted out, meaning you can't send SMS or voice messages to them. If end user replies with the keyword "STOP," an entry for the phone number is added to the opt-out list. In addition to STOP, your recipients can use any supported opt-out keyword, such as CANCEL or OPTOUT. For a list of supported opt-out keywords, see SMS opt out in the End User Messaging SMS User Guide.
 */
export const createOptOutList: API.OperationMethod<
  CreateOptOutListRequest,
  CreateOptOutListResult,
  CreateOptOutListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOptOutListRequest,
  output: CreateOptOutListResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOptOutList",
}));

export type CreatePoolError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new pool and associates the specified origination identity to the pool. A pool can include one or more phone numbers and SenderIds that are associated with your Amazon Web Services account.
 *
 * The new pool inherits its configuration from the specified origination identity. This includes keywords, message type, opt-out list, two-way configuration, and self-managed opt-out configuration. Deletion protection isn't inherited from the origination identity and defaults to false.
 *
 * If the origination identity is a phone number and is already associated with another pool, an error is returned. A sender ID can be associated with multiple pools.
 */
export const createPool: API.OperationMethod<
  CreatePoolRequest,
  CreatePoolResult,
  CreatePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePoolRequest,
  output: CreatePoolResult,
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
  operationName: "CreatePool",
}));

export type CreateProtectConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new protect configuration. By default all country rule sets for each capability are set to `ALLOW`. Update the country rule sets using `UpdateProtectConfigurationCountryRuleSet`. A protect configurations name is stored as a Tag with the key set to `Name` and value as the name of the protect configuration.
 */
export const createProtectConfiguration: API.OperationMethod<
  CreateProtectConfigurationRequest,
  CreateProtectConfigurationResult,
  CreateProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProtectConfigurationRequest,
  output: CreateProtectConfigurationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProtectConfiguration",
}));

export type CreateRcsAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new RCS agent for sending rich messages through the RCS channel. The RCS agent serves as an origination identity for sending RCS messages to your recipients.
 */
export const createRcsAgent: API.OperationMethod<
  CreateRcsAgentRequest,
  CreateRcsAgentResult,
  CreateRcsAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRcsAgentRequest,
  output: CreateRcsAgentResult,
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
  operationName: "CreateRcsAgent",
}));

export type CreateRegistrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new registration based on the **RegistrationType** field.
 */
export const createRegistration: API.OperationMethod<
  CreateRegistrationRequest,
  CreateRegistrationResult,
  CreateRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRegistrationRequest,
  output: CreateRegistrationResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegistration",
}));

export type CreateRegistrationAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate the registration with an origination identity such as a phone number or sender ID.
 */
export const createRegistrationAssociation: API.OperationMethod<
  CreateRegistrationAssociationRequest,
  CreateRegistrationAssociationResult,
  CreateRegistrationAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRegistrationAssociationRequest,
  output: CreateRegistrationAssociationResult,
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
  operationName: "CreateRegistrationAssociation",
}));

export type CreateRegistrationAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new registration attachment to use for uploading a file or a URL to a file. The maximum file size is 500KB and valid file extensions are PDF, JPEG and PNG. For example, many sender ID registrations require a signed “letter of authorization” (LOA) to be submitted.
 *
 * Use either `AttachmentUrl` or `AttachmentBody` to upload your attachment. If both are specified then an exception is returned.
 */
export const createRegistrationAttachment: API.OperationMethod<
  CreateRegistrationAttachmentRequest,
  CreateRegistrationAttachmentResult,
  CreateRegistrationAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRegistrationAttachmentRequest,
  output: CreateRegistrationAttachmentResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRegistrationAttachment",
}));

export type CreateRegistrationVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new version of the registration and increase the **VersionNumber**. The previous version of the registration becomes read-only.
 */
export const createRegistrationVersion: API.OperationMethod<
  CreateRegistrationVersionRequest,
  CreateRegistrationVersionResult,
  CreateRegistrationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRegistrationVersionRequest,
  output: CreateRegistrationVersionResult,
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
  operationName: "CreateRegistrationVersion",
}));

export type CreateVerifiedDestinationNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * You can only send messages to verified destination numbers when your account is in the sandbox. You can add up to 10 verified destination numbers.
 */
export const createVerifiedDestinationNumber: API.OperationMethod<
  CreateVerifiedDestinationNumberRequest,
  CreateVerifiedDestinationNumberResult,
  CreateVerifiedDestinationNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVerifiedDestinationNumberRequest,
  output: CreateVerifiedDestinationNumberResult,
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
  operationName: "CreateVerifiedDestinationNumber",
}));

export type DeleteAccountDefaultProtectConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the current account default protect configuration.
 */
export const deleteAccountDefaultProtectConfiguration: API.OperationMethod<
  DeleteAccountDefaultProtectConfigurationRequest,
  DeleteAccountDefaultProtectConfigurationResult,
  DeleteAccountDefaultProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAccountDefaultProtectConfigurationRequest,
  output: DeleteAccountDefaultProtectConfigurationResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccountDefaultProtectConfiguration",
}));

export type DeleteConfigurationSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing configuration set.
 *
 * A configuration set is a set of rules that you apply to voice and SMS messages that you send. In a configuration set, you can specify a destination for specific types of events related to voice and SMS messages.
 */
export const deleteConfigurationSet: API.OperationMethod<
  DeleteConfigurationSetRequest,
  DeleteConfigurationSetResult,
  DeleteConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationSetRequest,
  output: DeleteConfigurationSetResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
}));

export type DeleteDefaultMessageTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing default message type on a configuration set.
 *
 * A message type is a type of messages that you plan to send. If you send account-related messages or time-sensitive messages such as one-time passcodes, choose **Transactional**. If you plan to send messages that contain marketing material or other promotional content, choose **Promotional**. This setting applies to your entire Amazon Web Services account.
 */
export const deleteDefaultMessageType: API.OperationMethod<
  DeleteDefaultMessageTypeRequest,
  DeleteDefaultMessageTypeResult,
  DeleteDefaultMessageTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDefaultMessageTypeRequest,
  output: DeleteDefaultMessageTypeResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDefaultMessageType",
}));

export type DeleteDefaultSenderIdError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing default sender ID on a configuration set.
 *
 * A default sender ID is the identity that appears on recipients' devices when they receive SMS messages. Support for sender ID capabilities varies by country or region.
 */
export const deleteDefaultSenderId: API.OperationMethod<
  DeleteDefaultSenderIdRequest,
  DeleteDefaultSenderIdResult,
  DeleteDefaultSenderIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDefaultSenderIdRequest,
  output: DeleteDefaultSenderIdResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDefaultSenderId",
}));

export type DeleteEventDestinationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing event destination.
 *
 * An event destination is a location where you send response information about the messages that you send. For example, when a message is delivered successfully, you can send information about that event to an Amazon CloudWatch destination, or send notifications to endpoints that are subscribed to an Amazon SNS topic.
 */
export const deleteEventDestination: API.OperationMethod<
  DeleteEventDestinationRequest,
  DeleteEventDestinationResult,
  DeleteEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventDestinationRequest,
  output: DeleteEventDestinationResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventDestination",
}));

export type DeleteKeywordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing keyword from an origination phone number or pool.
 *
 * A keyword is a word that you can search for on a particular phone number or pool. It is also a specific word or phrase that an end user can send to your number to elicit a response, such as an informational message or a special offer. When your number receives a message that begins with a keyword, End User Messaging SMS responds with a customizable message.
 *
 * Keywords "HELP" and "STOP" can't be deleted or modified.
 */
export const deleteKeyword: API.OperationMethod<
  DeleteKeywordRequest,
  DeleteKeywordResult,
  DeleteKeywordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteKeywordRequest,
  output: DeleteKeywordResult,
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
  operationName: "DeleteKeyword",
}));

export type DeleteMediaMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account-level monthly spending limit override for sending multimedia messages (MMS). Deleting a spend limit override will set the `EnforcedLimit` to equal the `MaxLimit`, which is controlled by Amazon Web Services. For more information on spend limits (quotas) see Quotas for Server Migration Service in the *Server Migration Service User Guide*.
 */
export const deleteMediaMessageSpendLimitOverride: API.OperationMethod<
  DeleteMediaMessageSpendLimitOverrideRequest,
  DeleteMediaMessageSpendLimitOverrideResult,
  DeleteMediaMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMediaMessageSpendLimitOverrideRequest,
  output: DeleteMediaMessageSpendLimitOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMediaMessageSpendLimitOverride",
}));

export type DeleteNotifyConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing notify configuration.
 *
 * If deletion protection is enabled, an error is returned.
 */
export const deleteNotifyConfiguration: API.OperationMethod<
  DeleteNotifyConfigurationRequest,
  DeleteNotifyConfigurationResult,
  DeleteNotifyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNotifyConfigurationRequest,
  output: DeleteNotifyConfigurationResult,
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
  operationName: "DeleteNotifyConfiguration",
}));

export type DeleteNotifyMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account-level monthly spending limit override for sending notify messages. Deleting a spend limit override will set the `EnforcedLimit` to equal the `MaxLimit`, which is controlled by Amazon Web Services. For more information on spend limits (quotas) see Quotas in the *End User Messaging SMS User Guide*.
 */
export const deleteNotifyMessageSpendLimitOverride: API.OperationMethod<
  DeleteNotifyMessageSpendLimitOverrideRequest,
  DeleteNotifyMessageSpendLimitOverrideResult,
  DeleteNotifyMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNotifyMessageSpendLimitOverrideRequest,
  output: DeleteNotifyMessageSpendLimitOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotifyMessageSpendLimitOverride",
}));

export type DeleteOptedOutNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing opted out destination phone number from the specified opt-out list.
 *
 * Each destination phone number can only be deleted once every 30 days.
 *
 * If the specified destination phone number doesn't exist or if the opt-out list doesn't exist, an error is returned.
 */
export const deleteOptedOutNumber: API.OperationMethod<
  DeleteOptedOutNumberRequest,
  DeleteOptedOutNumberResult,
  DeleteOptedOutNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOptedOutNumberRequest,
  output: DeleteOptedOutNumberResult,
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
  operationName: "DeleteOptedOutNumber",
}));

export type DeleteOptOutListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing opt-out list. All opted out phone numbers in the opt-out list are deleted.
 *
 * If the specified opt-out list name doesn't exist or is in-use by an origination phone number or pool, an error is returned.
 */
export const deleteOptOutList: API.OperationMethod<
  DeleteOptOutListRequest,
  DeleteOptOutListResult,
  DeleteOptOutListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOptOutListRequest,
  output: DeleteOptOutListResult,
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
  operationName: "DeleteOptOutList",
}));

export type DeletePoolError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing pool. Deleting a pool disassociates all origination identities from that pool.
 *
 * If the pool status isn't active or if deletion protection is enabled, an error is returned.
 *
 * A pool is a collection of phone numbers and SenderIds. A pool can include one or more phone numbers and SenderIds that are associated with your Amazon Web Services account.
 */
export const deletePool: API.OperationMethod<
  DeletePoolRequest,
  DeletePoolResult,
  DeletePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePoolRequest,
  output: DeletePoolResult,
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
  operationName: "DeletePool",
}));

export type DeleteProtectConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently delete the protect configuration. The protect configuration must have deletion protection disabled and must not be associated as the account default protect configuration or associated with a configuration set.
 */
export const deleteProtectConfiguration: API.OperationMethod<
  DeleteProtectConfigurationRequest,
  DeleteProtectConfigurationResult,
  DeleteProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProtectConfigurationRequest,
  output: DeleteProtectConfigurationResult,
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
  operationName: "DeleteProtectConfiguration",
}));

export type DeleteProtectConfigurationRuleSetNumberOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently delete the protect configuration rule set number override.
 */
export const deleteProtectConfigurationRuleSetNumberOverride: API.OperationMethod<
  DeleteProtectConfigurationRuleSetNumberOverrideRequest,
  DeleteProtectConfigurationRuleSetNumberOverrideResult,
  DeleteProtectConfigurationRuleSetNumberOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProtectConfigurationRuleSetNumberOverrideRequest,
  output: DeleteProtectConfigurationRuleSetNumberOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProtectConfigurationRuleSetNumberOverride",
}));

export type DeleteRcsAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing RCS agent. If deletion protection is enabled, an error is returned.
 */
export const deleteRcsAgent: API.OperationMethod<
  DeleteRcsAgentRequest,
  DeleteRcsAgentResult,
  DeleteRcsAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRcsAgentRequest,
  output: DeleteRcsAgentResult,
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
  operationName: "DeleteRcsAgent",
}));

export type DeleteRcsMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account-level monthly spending limit override for sending RCS messages. Deleting a spend limit override sets the `EnforcedLimit` to equal the `MaxLimit`, which is set by Amazon Web Services.
 */
export const deleteRcsMessageSpendLimitOverride: API.OperationMethod<
  DeleteRcsMessageSpendLimitOverrideRequest,
  DeleteRcsMessageSpendLimitOverrideResult,
  DeleteRcsMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRcsMessageSpendLimitOverrideRequest,
  output: DeleteRcsMessageSpendLimitOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRcsMessageSpendLimitOverride",
}));

export type DeleteRegistrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently delete an existing registration from your account.
 */
export const deleteRegistration: API.OperationMethod<
  DeleteRegistrationRequest,
  DeleteRegistrationResult,
  DeleteRegistrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRegistrationRequest,
  output: DeleteRegistrationResult,
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
  operationName: "DeleteRegistration",
}));

export type DeleteRegistrationAttachmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently delete the specified registration attachment.
 */
export const deleteRegistrationAttachment: API.OperationMethod<
  DeleteRegistrationAttachmentRequest,
  DeleteRegistrationAttachmentResult,
  DeleteRegistrationAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRegistrationAttachmentRequest,
  output: DeleteRegistrationAttachmentResult,
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
  operationName: "DeleteRegistrationAttachment",
}));

export type DeleteRegistrationFieldValueError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the value in a registration form field.
 */
export const deleteRegistrationFieldValue: API.OperationMethod<
  DeleteRegistrationFieldValueRequest,
  DeleteRegistrationFieldValueResult,
  DeleteRegistrationFieldValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRegistrationFieldValueRequest,
  output: DeleteRegistrationFieldValueResult,
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
  operationName: "DeleteRegistrationFieldValue",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource-based policy document attached to the End User Messaging SMS resource. A shared resource can be a Pool, Opt-out list, Sender Id, or Phone number.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteTextMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account-level monthly spending limit override for sending text messages. Deleting a spend limit override will set the `EnforcedLimit` to equal the `MaxLimit`, which is controlled by Amazon Web Services. For more information on spend limits (quotas) see Quotas in the *End User Messaging SMS User Guide*.
 */
export const deleteTextMessageSpendLimitOverride: API.OperationMethod<
  DeleteTextMessageSpendLimitOverrideRequest,
  DeleteTextMessageSpendLimitOverrideResult,
  DeleteTextMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTextMessageSpendLimitOverrideRequest,
  output: DeleteTextMessageSpendLimitOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTextMessageSpendLimitOverride",
}));

export type DeleteVerifiedDestinationNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a verified destination phone number.
 */
export const deleteVerifiedDestinationNumber: API.OperationMethod<
  DeleteVerifiedDestinationNumberRequest,
  DeleteVerifiedDestinationNumberResult,
  DeleteVerifiedDestinationNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVerifiedDestinationNumberRequest,
  output: DeleteVerifiedDestinationNumberResult,
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
  operationName: "DeleteVerifiedDestinationNumber",
}));

export type DeleteVoiceMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an account level monthly spend limit override for sending voice messages. Deleting a spend limit override sets the `EnforcedLimit` equal to the `MaxLimit`, which is controlled by Amazon Web Services. For more information on spending limits (quotas) see Quotas in the *End User Messaging SMS User Guide*.
 */
export const deleteVoiceMessageSpendLimitOverride: API.OperationMethod<
  DeleteVoiceMessageSpendLimitOverrideRequest,
  DeleteVoiceMessageSpendLimitOverrideResult,
  DeleteVoiceMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVoiceMessageSpendLimitOverrideRequest,
  output: DeleteVoiceMessageSpendLimitOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceMessageSpendLimitOverride",
}));

export type DescribeAccountAttributesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes attributes of your Amazon Web Services account. The supported account attributes include account tier, which indicates whether your account is in the sandbox or production environment. When you're ready to move your account out of the sandbox, create an Amazon Web Services Support case for a service limit increase request.
 *
 * New accounts are placed into an SMS or voice sandbox. The sandbox protects both Amazon Web Services end recipients and SMS or voice recipients from fraud and abuse.
 */
export const describeAccountAttributes: API.PaginatedOperationMethod<
  DescribeAccountAttributesRequest,
  DescribeAccountAttributesResult,
  DescribeAccountAttributesError,
  Credentials | HttpClient.HttpClient,
  AccountAttribute
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAccountAttributesRequest,
  output: DescribeAccountAttributesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountAttributes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountAttributes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeAccountLimitsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the current End User Messaging SMS SMS Voice V2 resource quotas for your account. The description for a quota includes the quota name, current usage toward that quota, and the quota's maximum value.
 *
 * When you establish an Amazon Web Services account, the account has initial quotas on the maximum number of configuration sets, opt-out lists, phone numbers, and pools that you can create in a given Region. For more information see Quotas in the *End User Messaging SMS User Guide*.
 */
export const describeAccountLimits: API.PaginatedOperationMethod<
  DescribeAccountLimitsRequest,
  DescribeAccountLimitsResult,
  DescribeAccountLimitsError,
  Credentials | HttpClient.HttpClient,
  AccountLimit
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeAccountLimitsRequest,
  output: DescribeAccountLimitsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountLimits",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccountLimits",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeConfigurationSetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified configuration sets or all in your account.
 *
 * If you specify configuration set names, the output includes information for only the specified configuration sets. If you specify filters, the output includes information for only those configuration sets that meet the filter criteria. If you don't specify configuration set names or filters, the output includes information for all configuration sets.
 *
 * If you specify a configuration set name that isn't valid, an error is returned.
 */
export const describeConfigurationSets: API.PaginatedOperationMethod<
  DescribeConfigurationSetsRequest,
  DescribeConfigurationSetsResult,
  DescribeConfigurationSetsError,
  Credentials | HttpClient.HttpClient,
  ConfigurationSetInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeConfigurationSetsRequest,
  output: DescribeConfigurationSetsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfigurationSets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeKeywordsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified keywords or all keywords on your origination phone number or pool.
 *
 * A keyword is a word that you can search for on a particular phone number or pool. It is also a specific word or phrase that an end user can send to your number to elicit a response, such as an informational message or a special offer. When your number receives a message that begins with a keyword, End User Messaging SMS responds with a customizable message.
 *
 * If you specify a keyword that isn't valid, an error is returned.
 */
export const describeKeywords: API.PaginatedOperationMethod<
  DescribeKeywordsRequest,
  DescribeKeywordsResult,
  DescribeKeywordsError,
  Credentials | HttpClient.HttpClient,
  KeywordInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeKeywordsRequest,
  output: DescribeKeywordsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeKeywords",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Keywords",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeNotifyConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified notify configurations or all notify configurations in your account.
 *
 * If you specify notify configuration IDs, the output includes information for only the specified notify configurations. If you specify filters, the output includes information for only those notify configurations that meet the filter criteria. If you don't specify notify configuration IDs or filters, the output includes information for all notify configurations.
 *
 * If you specify a notify configuration ID that isn't valid, an error is returned.
 */
export const describeNotifyConfigurations: API.PaginatedOperationMethod<
  DescribeNotifyConfigurationsRequest,
  DescribeNotifyConfigurationsResult,
  DescribeNotifyConfigurationsError,
  Credentials | HttpClient.HttpClient,
  NotifyConfigurationInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeNotifyConfigurationsRequest,
  output: DescribeNotifyConfigurationsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotifyConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NotifyConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeNotifyTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified notify templates or all notify templates in your account.
 *
 * If you specify template IDs, the output includes information for only the specified notify templates. If you specify filters, the output includes information for only those notify templates that meet the filter criteria. If you don't specify template IDs or filters, the output includes information for all notify templates.
 *
 * If you specify a template ID that isn't valid, an error is returned.
 */
export const describeNotifyTemplates: API.PaginatedOperationMethod<
  DescribeNotifyTemplatesRequest,
  DescribeNotifyTemplatesResult,
  DescribeNotifyTemplatesError,
  Credentials | HttpClient.HttpClient,
  NotifyTemplateInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeNotifyTemplatesRequest,
  output: DescribeNotifyTemplatesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotifyTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NotifyTemplates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeOptedOutNumbersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified opted out destination numbers or all opted out destination numbers in an opt-out list.
 *
 * If you specify opted out numbers, the output includes information for only the specified opted out numbers. If you specify filters, the output includes information for only those opted out numbers that meet the filter criteria. If you don't specify opted out numbers or filters, the output includes information for all opted out destination numbers in your opt-out list.
 *
 * If you specify an opted out number that isn't valid, an exception is returned.
 */
export const describeOptedOutNumbers: API.PaginatedOperationMethod<
  DescribeOptedOutNumbersRequest,
  DescribeOptedOutNumbersResult,
  DescribeOptedOutNumbersError,
  Credentials | HttpClient.HttpClient,
  OptedOutNumberInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeOptedOutNumbersRequest,
  output: DescribeOptedOutNumbersResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOptedOutNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OptedOutNumbers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeOptOutListsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified opt-out list or all opt-out lists in your account.
 *
 * If you specify opt-out list names, the output includes information for only the specified opt-out lists. Opt-out lists include only those that meet the filter criteria. If you don't specify opt-out list names or filters, the output includes information for all opt-out lists.
 *
 * If you specify an opt-out list name that isn't valid, an error is returned.
 */
export const describeOptOutLists: API.PaginatedOperationMethod<
  DescribeOptOutListsRequest,
  DescribeOptOutListsResult,
  DescribeOptOutListsError,
  Credentials | HttpClient.HttpClient,
  OptOutListInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeOptOutListsRequest,
  output: DescribeOptOutListsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOptOutLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OptOutLists",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribePhoneNumbersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified origination phone number, or all the phone numbers in your account.
 *
 * If you specify phone number IDs, the output includes information for only the specified phone numbers. If you specify filters, the output includes information for only those phone numbers that meet the filter criteria. If you don't specify phone number IDs or filters, the output includes information for all phone numbers.
 *
 * If you specify a phone number ID that isn't valid, an error is returned.
 */
export const describePhoneNumbers: API.PaginatedOperationMethod<
  DescribePhoneNumbersRequest,
  DescribePhoneNumbersResult,
  DescribePhoneNumbersError,
  Credentials | HttpClient.HttpClient,
  PhoneNumberInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribePhoneNumbersRequest,
  output: DescribePhoneNumbersResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePhoneNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PhoneNumbers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribePoolsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified pools or all pools associated with your Amazon Web Services account.
 *
 * If you specify pool IDs, the output includes information for only the specified pools. If you specify filters, the output includes information for only those pools that meet the filter criteria. If you don't specify pool IDs or filters, the output includes information for all pools.
 *
 * If you specify a pool ID that isn't valid, an error is returned.
 *
 * A pool is a collection of phone numbers and SenderIds. A pool can include one or more phone numbers and SenderIds that are associated with your Amazon Web Services account.
 */
export const describePools: API.PaginatedOperationMethod<
  DescribePoolsRequest,
  DescribePoolsResult,
  DescribePoolsError,
  Credentials | HttpClient.HttpClient,
  PoolInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribePoolsRequest,
  output: DescribePoolsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePools",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Pools",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeProtectConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the protect configurations that match any of filters. If a filter isn’t provided then all protect configurations are returned.
 */
export const describeProtectConfigurations: API.PaginatedOperationMethod<
  DescribeProtectConfigurationsRequest,
  DescribeProtectConfigurationsResult,
  DescribeProtectConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ProtectConfigurationInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeProtectConfigurationsRequest,
  output: DescribeProtectConfigurationsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProtectConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProtectConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRcsAgentCountryLaunchStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the per-country launch status of an RCS agent, including carrier-level details for each country.
 */
export const describeRcsAgentCountryLaunchStatus: API.PaginatedOperationMethod<
  DescribeRcsAgentCountryLaunchStatusRequest,
  DescribeRcsAgentCountryLaunchStatusResult,
  DescribeRcsAgentCountryLaunchStatusError,
  Credentials | HttpClient.HttpClient,
  CountryLaunchStatusInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRcsAgentCountryLaunchStatusRequest,
  output: DescribeRcsAgentCountryLaunchStatusResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRcsAgentCountryLaunchStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CountryLaunchStatus",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRcsAgentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified RCS agents or all RCS agents associated with your Amazon Web Services account.
 *
 * If you specify RCS agent IDs, the output includes information for only the specified RCS agents. If you specify filters, the output includes information for only those RCS agents that meet the filter criteria. If you don't specify RCS agent IDs or filters, the output includes information for all RCS agents.
 */
export const describeRcsAgents: API.PaginatedOperationMethod<
  DescribeRcsAgentsRequest,
  DescribeRcsAgentsResult,
  DescribeRcsAgentsError,
  Credentials | HttpClient.HttpClient,
  RcsAgentInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRcsAgentsRequest,
  output: DescribeRcsAgentsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRcsAgents",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RcsAgents",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationAttachmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registration attachments or all registration attachments associated with your Amazon Web Services account.
 */
export const describeRegistrationAttachments: API.PaginatedOperationMethod<
  DescribeRegistrationAttachmentsRequest,
  DescribeRegistrationAttachmentsResult,
  DescribeRegistrationAttachmentsError,
  Credentials | HttpClient.HttpClient,
  RegistrationAttachmentsInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRegistrationAttachmentsRequest,
  output: DescribeRegistrationAttachmentsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrationAttachments",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationAttachments",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationFieldDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registration type field definitions. You can use DescribeRegistrationFieldDefinitions to view the requirements for creating, filling out, and submitting each registration type.
 */
export const describeRegistrationFieldDefinitions: API.PaginatedOperationMethod<
  DescribeRegistrationFieldDefinitionsRequest,
  DescribeRegistrationFieldDefinitionsResult,
  DescribeRegistrationFieldDefinitionsError,
  Credentials | HttpClient.HttpClient,
  RegistrationFieldDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRegistrationFieldDefinitionsRequest,
  output: DescribeRegistrationFieldDefinitionsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrationFieldDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationFieldDefinitions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationFieldValuesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registration field values.
 */
export const describeRegistrationFieldValues: API.PaginatedOperationMethod<
  DescribeRegistrationFieldValuesRequest,
  DescribeRegistrationFieldValuesResult,
  DescribeRegistrationFieldValuesError,
  Credentials | HttpClient.HttpClient,
  RegistrationFieldValueInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRegistrationFieldValuesRequest,
  output: DescribeRegistrationFieldValuesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrationFieldValues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationFieldValues",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registrations.
 */
export const describeRegistrations: API.PaginatedOperationMethod<
  DescribeRegistrationsRequest,
  DescribeRegistrationsResult,
  DescribeRegistrationsError,
  Credentials | HttpClient.HttpClient,
  RegistrationInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRegistrationsRequest,
  output: DescribeRegistrationsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Registrations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationSectionDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registration section definitions. You can use DescribeRegistrationSectionDefinitions to view the requirements for creating, filling out, and submitting each registration type.
 */
export const describeRegistrationSectionDefinitions: API.PaginatedOperationMethod<
  DescribeRegistrationSectionDefinitionsRequest,
  DescribeRegistrationSectionDefinitionsResult,
  DescribeRegistrationSectionDefinitionsError,
  Credentials | HttpClient.HttpClient,
  RegistrationSectionDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRegistrationSectionDefinitionsRequest,
  output: DescribeRegistrationSectionDefinitionsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrationSectionDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationSectionDefinitions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationTypeDefinitionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registration type definitions. You can use DescribeRegistrationTypeDefinitions to view the requirements for creating, filling out, and submitting each registration type.
 */
export const describeRegistrationTypeDefinitions: API.PaginatedOperationMethod<
  DescribeRegistrationTypeDefinitionsRequest,
  DescribeRegistrationTypeDefinitionsResult,
  DescribeRegistrationTypeDefinitionsError,
  Credentials | HttpClient.HttpClient,
  RegistrationTypeDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRegistrationTypeDefinitionsRequest,
  output: DescribeRegistrationTypeDefinitionsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrationTypeDefinitions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationTypeDefinitions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeRegistrationVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified registration version.
 */
export const describeRegistrationVersions: API.PaginatedOperationMethod<
  DescribeRegistrationVersionsRequest,
  DescribeRegistrationVersionsResult,
  DescribeRegistrationVersionsError,
  Credentials | HttpClient.HttpClient,
  RegistrationVersionInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeRegistrationVersionsRequest,
  output: DescribeRegistrationVersionsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRegistrationVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationVersions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSenderIdsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified SenderIds or all SenderIds associated with your Amazon Web Services account.
 *
 * If you specify SenderIds, the output includes information for only the specified SenderIds. If you specify filters, the output includes information for only those SenderIds that meet the filter criteria. If you don't specify SenderIds or filters, the output includes information for all SenderIds.
 *
 * f you specify a sender ID that isn't valid, an error is returned.
 */
export const describeSenderIds: API.PaginatedOperationMethod<
  DescribeSenderIdsRequest,
  DescribeSenderIdsResult,
  DescribeSenderIdsError,
  Credentials | HttpClient.HttpClient,
  SenderIdInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSenderIdsRequest,
  output: DescribeSenderIdsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSenderIds",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SenderIds",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSpendLimitsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the current monthly spend limits for sending voice and text messages.
 *
 * When you establish an Amazon Web Services account, the account has initial monthly spend limit in a given Region. For more information on increasing your monthly spend limit, see Requesting increases to your monthly SMS, MMS, or Voice spending quota in the *End User Messaging SMS User Guide*.
 */
export const describeSpendLimits: API.PaginatedOperationMethod<
  DescribeSpendLimitsRequest,
  DescribeSpendLimitsResult,
  DescribeSpendLimitsError,
  Credentials | HttpClient.HttpClient,
  SpendLimit
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSpendLimitsRequest,
  output: DescribeSpendLimitsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSpendLimits",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SpendLimits",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeVerifiedDestinationNumbersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified verified destination numbers.
 */
export const describeVerifiedDestinationNumbers: API.PaginatedOperationMethod<
  DescribeVerifiedDestinationNumbersRequest,
  DescribeVerifiedDestinationNumbersResult,
  DescribeVerifiedDestinationNumbersError,
  Credentials | HttpClient.HttpClient,
  VerifiedDestinationNumberInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeVerifiedDestinationNumbersRequest,
  output: DescribeVerifiedDestinationNumbersResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVerifiedDestinationNumbers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "VerifiedDestinationNumbers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisassociateOriginationIdentityError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified origination identity from an existing pool.
 *
 * If the origination identity isn't associated with the specified pool, an error is returned.
 */
export const disassociateOriginationIdentity: API.OperationMethod<
  DisassociateOriginationIdentityRequest,
  DisassociateOriginationIdentityResult,
  DisassociateOriginationIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateOriginationIdentityRequest,
  output: DisassociateOriginationIdentityResult,
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
  operationName: "DisassociateOriginationIdentity",
}));

export type DisassociateProtectConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociate a protect configuration from a configuration set.
 */
export const disassociateProtectConfiguration: API.OperationMethod<
  DisassociateProtectConfigurationRequest,
  DisassociateProtectConfigurationResult,
  DisassociateProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateProtectConfigurationRequest,
  output: DisassociateProtectConfigurationResult,
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
  operationName: "DisassociateProtectConfiguration",
}));

export type DiscardRegistrationVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Discard the current version of the registration.
 */
export const discardRegistrationVersion: API.OperationMethod<
  DiscardRegistrationVersionRequest,
  DiscardRegistrationVersionResult,
  DiscardRegistrationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DiscardRegistrationVersionRequest,
  output: DiscardRegistrationVersionResult,
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
  operationName: "DiscardRegistrationVersion",
}));

export type GetProtectConfigurationCountryRuleSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve the CountryRuleSet for the specified NumberCapability from a protect configuration.
 */
export const getProtectConfigurationCountryRuleSet: API.OperationMethod<
  GetProtectConfigurationCountryRuleSetRequest,
  GetProtectConfigurationCountryRuleSetResult,
  GetProtectConfigurationCountryRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetProtectConfigurationCountryRuleSetRequest,
  output: GetProtectConfigurationCountryRuleSetResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProtectConfigurationCountryRuleSet",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the JSON text of the resource-based policy document attached to the End User Messaging SMS resource. A shared resource can be a Pool, Opt-out list, Sender Id, or Phone number.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResult,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetResourcePolicyRequest,
  output: GetResourcePolicyResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type ListNotifyCountriesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists countries that support notify messaging. You can optionally filter by channel, use case, or tier.
 */
export const listNotifyCountries: API.PaginatedOperationMethod<
  ListNotifyCountriesRequest,
  ListNotifyCountriesResult,
  ListNotifyCountriesError,
  Credentials | HttpClient.HttpClient,
  NotifyCountryInformation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNotifyCountriesRequest,
  output: ListNotifyCountriesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotifyCountries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NotifyCountries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPoolOriginationIdentitiesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all associated origination identities in your pool.
 *
 * If you specify filters, the output includes information for only those origination identities that meet the filter criteria.
 */
export const listPoolOriginationIdentities: API.PaginatedOperationMethod<
  ListPoolOriginationIdentitiesRequest,
  ListPoolOriginationIdentitiesResult,
  ListPoolOriginationIdentitiesError,
  Credentials | HttpClient.HttpClient,
  OriginationIdentityMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPoolOriginationIdentitiesRequest,
  output: ListPoolOriginationIdentitiesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPoolOriginationIdentities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OriginationIdentities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProtectConfigurationRuleSetNumberOverridesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve all of the protect configuration rule set number overrides that match the filters.
 */
export const listProtectConfigurationRuleSetNumberOverrides: API.PaginatedOperationMethod<
  ListProtectConfigurationRuleSetNumberOverridesRequest,
  ListProtectConfigurationRuleSetNumberOverridesResult,
  ListProtectConfigurationRuleSetNumberOverridesError,
  Credentials | HttpClient.HttpClient,
  ProtectConfigurationRuleSetNumberOverride
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListProtectConfigurationRuleSetNumberOverridesRequest,
  output: ListProtectConfigurationRuleSetNumberOverridesResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProtectConfigurationRuleSetNumberOverrides",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RuleSetNumberOverrides",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRegistrationAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve all of the origination identities that are associated with a registration.
 */
export const listRegistrationAssociations: API.PaginatedOperationMethod<
  ListRegistrationAssociationsRequest,
  ListRegistrationAssociationsResult,
  ListRegistrationAssociationsError,
  Credentials | HttpClient.HttpClient,
  RegistrationAssociationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRegistrationAssociationsRequest,
  output: ListRegistrationAssociationsResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegistrationAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RegistrationAssociations",
    pageSize: "MaxResults",
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
 * List all tags associated with a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResult,
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

export type PutKeywordError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a keyword configuration on an origination phone number or pool.
 *
 * A keyword is a word that you can search for on a particular phone number or pool. It is also a specific word or phrase that an end user can send to your number to elicit a response, such as an informational message or a special offer. When your number receives a message that begins with a keyword, End User Messaging SMS responds with a customizable message.
 *
 * If you specify a keyword that isn't valid, an error is returned.
 */
export const putKeyword: API.OperationMethod<
  PutKeywordRequest,
  PutKeywordResult,
  PutKeywordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutKeywordRequest,
  output: PutKeywordResult,
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
  operationName: "PutKeyword",
}));

export type PutMessageFeedbackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set the MessageFeedbackStatus as `RECEIVED` or `FAILED` for the passed in MessageId.
 *
 * If you use message feedback then you must update message feedback record. When you receive a signal that a user has received the message you must use `PutMessageFeedback` to set the message feedback record as `RECEIVED`; Otherwise, an hour after the message feedback record is set to `FAILED`.
 */
export const putMessageFeedback: API.OperationMethod<
  PutMessageFeedbackRequest,
  PutMessageFeedbackResult,
  PutMessageFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutMessageFeedbackRequest,
  output: PutMessageFeedbackResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMessageFeedback",
}));

export type PutOptedOutNumberError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an opted out destination phone number in the opt-out list.
 *
 * If the destination phone number isn't valid or if the specified opt-out list doesn't exist, an error is returned.
 */
export const putOptedOutNumber: API.OperationMethod<
  PutOptedOutNumberRequest,
  PutOptedOutNumberResult,
  PutOptedOutNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutOptedOutNumberRequest,
  output: PutOptedOutNumberResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutOptedOutNumber",
}));

export type PutProtectConfigurationRuleSetNumberOverrideError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create or update a phone number rule override and associate it with a protect configuration.
 */
export const putProtectConfigurationRuleSetNumberOverride: API.OperationMethod<
  PutProtectConfigurationRuleSetNumberOverrideRequest,
  PutProtectConfigurationRuleSetNumberOverrideResult,
  PutProtectConfigurationRuleSetNumberOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutProtectConfigurationRuleSetNumberOverrideRequest,
  output: PutProtectConfigurationRuleSetNumberOverrideResult,
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
  operationName: "PutProtectConfigurationRuleSetNumberOverride",
}));

export type PutRegistrationFieldValueError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a field value for a registration.
 */
export const putRegistrationFieldValue: API.OperationMethod<
  PutRegistrationFieldValueRequest,
  PutRegistrationFieldValueResult,
  PutRegistrationFieldValueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutRegistrationFieldValueRequest,
  output: PutRegistrationFieldValueResult,
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
  operationName: "PutRegistrationFieldValue",
}));

export type PutResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches a resource-based policy to a End User Messaging SMS resource(phone number, sender Id, phone poll, or opt-out list) that is used for sharing the resource. A shared resource can be a Pool, Opt-out list, Sender Id, or Phone number. For more information about resource-based policies, see Working with shared resources in the *End User Messaging SMS User Guide*.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type ReleasePhoneNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Releases an existing origination phone number in your account. Once released, a phone number is no longer available for sending messages.
 *
 * If the origination phone number has deletion protection enabled or is associated with a pool, an error is returned.
 */
export const releasePhoneNumber: API.OperationMethod<
  ReleasePhoneNumberRequest,
  ReleasePhoneNumberResult,
  ReleasePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReleasePhoneNumberRequest,
  output: ReleasePhoneNumberResult,
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
  operationName: "ReleasePhoneNumber",
}));

export type ReleaseSenderIdError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Releases an existing sender ID in your account.
 */
export const releaseSenderId: API.OperationMethod<
  ReleaseSenderIdRequest,
  ReleaseSenderIdResult,
  ReleaseSenderIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReleaseSenderIdRequest,
  output: ReleaseSenderIdResult,
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
  operationName: "ReleaseSenderId",
}));

export type RequestPhoneNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Request an origination phone number for use in your account. For more information on phone number request see Request a phone number in the *End User Messaging SMS User Guide*.
 */
export const requestPhoneNumber: API.OperationMethod<
  RequestPhoneNumberRequest,
  RequestPhoneNumberResult,
  RequestPhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RequestPhoneNumberRequest,
  output: RequestPhoneNumberResult,
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
  operationName: "RequestPhoneNumber",
}));

export type RequestSenderIdError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Request a new sender ID that doesn't require registration.
 */
export const requestSenderId: API.OperationMethod<
  RequestSenderIdRequest,
  RequestSenderIdResult,
  RequestSenderIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RequestSenderIdRequest,
  output: RequestSenderIdResult,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RequestSenderId",
}));

export type SendDestinationNumberVerificationCodeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Before you can send test messages to a verified destination phone number you need to opt-in the verified destination phone number. Creates a new text message with a verification code and send it to a verified destination phone number. Once you have the verification code use VerifyDestinationNumber to opt-in the verified destination phone number to receive messages.
 */
export const sendDestinationNumberVerificationCode: API.OperationMethod<
  SendDestinationNumberVerificationCodeRequest,
  SendDestinationNumberVerificationCodeResult,
  SendDestinationNumberVerificationCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendDestinationNumberVerificationCodeRequest,
  output: SendDestinationNumberVerificationCodeResult,
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
  operationName: "SendDestinationNumberVerificationCode",
}));

export type SendMediaMessageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new multimedia message (MMS) and sends it to a recipient's phone number.
 */
export const sendMediaMessage: API.OperationMethod<
  SendMediaMessageRequest,
  SendMediaMessageResult,
  SendMediaMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendMediaMessageRequest,
  output: SendMediaMessageResult,
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
  operationName: "SendMediaMessage",
}));

export type SendNotifyTextMessageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a templated text message through a notify configuration to a recipient's phone number.
 */
export const sendNotifyTextMessage: API.OperationMethod<
  SendNotifyTextMessageRequest,
  SendNotifyTextMessageResult,
  SendNotifyTextMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendNotifyTextMessageRequest,
  output: SendNotifyTextMessageResult,
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
  operationName: "SendNotifyTextMessage",
}));

export type SendNotifyVoiceMessageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a templated voice message through a notify configuration to a recipient's phone number.
 */
export const sendNotifyVoiceMessage: API.OperationMethod<
  SendNotifyVoiceMessageRequest,
  SendNotifyVoiceMessageResult,
  SendNotifyVoiceMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendNotifyVoiceMessageRequest,
  output: SendNotifyVoiceMessageResult,
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
  operationName: "SendNotifyVoiceMessage",
}));

export type SendRcsMessageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new RCS message and sends it to a recipient's phone number. RCS messages support rich content including text, files, rich cards, and carousels with interactive suggested actions.
 */
export const sendRcsMessage: API.OperationMethod<
  SendRcsMessageRequest,
  SendRcsMessageResult,
  SendRcsMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendRcsMessageRequest,
  output: SendRcsMessageResult,
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
  operationName: "SendRcsMessage",
}));

export type SendTextMessageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new text message and sends it to a recipient's phone number. SendTextMessage only sends an SMS message to one recipient each time it is invoked.
 *
 * SMS throughput limits are measured in Message Parts per Second (MPS). Your MPS limit depends on the destination country of your messages, as well as the type of phone number (origination number) that you use to send the message. For more information about MPS, see Message Parts per Second (MPS) limits in the *End User Messaging SMS User Guide*.
 */
export const sendTextMessage: API.OperationMethod<
  SendTextMessageRequest,
  SendTextMessageResult,
  SendTextMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendTextMessageRequest,
  output: SendTextMessageResult,
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
  operationName: "SendTextMessage",
}));

export type SendVoiceMessageError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Allows you to send a request that sends a voice message. This operation uses Amazon Polly to convert a text script into a voice message.
 */
export const sendVoiceMessage: API.OperationMethod<
  SendVoiceMessageRequest,
  SendVoiceMessageResult,
  SendVoiceMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendVoiceMessageRequest,
  output: SendVoiceMessageResult,
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
  operationName: "SendVoiceMessage",
}));

export type SetAccountDefaultProtectConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set a protect configuration as your account default. You can only have one account default protect configuration at a time. The current account default protect configuration is replaced with the provided protect configuration.
 */
export const setAccountDefaultProtectConfiguration: API.OperationMethod<
  SetAccountDefaultProtectConfigurationRequest,
  SetAccountDefaultProtectConfigurationResult,
  SetAccountDefaultProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetAccountDefaultProtectConfigurationRequest,
  output: SetAccountDefaultProtectConfigurationResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetAccountDefaultProtectConfiguration",
}));

export type SetDefaultMessageFeedbackEnabledError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets a configuration set's default for message feedback.
 */
export const setDefaultMessageFeedbackEnabled: API.OperationMethod<
  SetDefaultMessageFeedbackEnabledRequest,
  SetDefaultMessageFeedbackEnabledResult,
  SetDefaultMessageFeedbackEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetDefaultMessageFeedbackEnabledRequest,
  output: SetDefaultMessageFeedbackEnabledResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultMessageFeedbackEnabled",
}));

export type SetDefaultMessageTypeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the default message type on a configuration set.
 *
 * Choose the category of SMS messages that you plan to send from this account. If you send account-related messages or time-sensitive messages such as one-time passcodes, choose **Transactional**. If you plan to send messages that contain marketing material or other promotional content, choose **Promotional**. This setting applies to your entire Amazon Web Services account.
 */
export const setDefaultMessageType: API.OperationMethod<
  SetDefaultMessageTypeRequest,
  SetDefaultMessageTypeResult,
  SetDefaultMessageTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetDefaultMessageTypeRequest,
  output: SetDefaultMessageTypeResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultMessageType",
}));

export type SetDefaultSenderIdError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets default sender ID on a configuration set.
 *
 * When sending a text message to a destination country that supports sender IDs, the default sender ID on the configuration set specified will be used if no dedicated origination phone numbers or registered sender IDs are available in your account.
 */
export const setDefaultSenderId: API.OperationMethod<
  SetDefaultSenderIdRequest,
  SetDefaultSenderIdResult,
  SetDefaultSenderIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetDefaultSenderIdRequest,
  output: SetDefaultSenderIdResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetDefaultSenderId",
}));

export type SetMediaMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets an account level monthly spend limit override for sending MMS messages. The requested spend limit must be less than or equal to the `MaxLimit`, which is set by Amazon Web Services.
 */
export const setMediaMessageSpendLimitOverride: API.OperationMethod<
  SetMediaMessageSpendLimitOverrideRequest,
  SetMediaMessageSpendLimitOverrideResult,
  SetMediaMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetMediaMessageSpendLimitOverrideRequest,
  output: SetMediaMessageSpendLimitOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetMediaMessageSpendLimitOverride",
}));

export type SetNotifyMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets an account level monthly spend limit override for sending notify messages. The requested spend limit must be less than or equal to the `MaxLimit`, which is set by Amazon Web Services.
 */
export const setNotifyMessageSpendLimitOverride: API.OperationMethod<
  SetNotifyMessageSpendLimitOverrideRequest,
  SetNotifyMessageSpendLimitOverrideResult,
  SetNotifyMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetNotifyMessageSpendLimitOverrideRequest,
  output: SetNotifyMessageSpendLimitOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetNotifyMessageSpendLimitOverride",
}));

export type SetRcsMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets an account level monthly spend limit override for sending RCS messages. The requested spend limit must be less than or equal to the `MaxLimit`, which is set by Amazon Web Services.
 */
export const setRcsMessageSpendLimitOverride: API.OperationMethod<
  SetRcsMessageSpendLimitOverrideRequest,
  SetRcsMessageSpendLimitOverrideResult,
  SetRcsMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetRcsMessageSpendLimitOverrideRequest,
  output: SetRcsMessageSpendLimitOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetRcsMessageSpendLimitOverride",
}));

export type SetTextMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets an account level monthly spend limit override for sending text messages. The requested spend limit must be less than or equal to the `MaxLimit`, which is set by Amazon Web Services.
 */
export const setTextMessageSpendLimitOverride: API.OperationMethod<
  SetTextMessageSpendLimitOverrideRequest,
  SetTextMessageSpendLimitOverrideResult,
  SetTextMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetTextMessageSpendLimitOverrideRequest,
  output: SetTextMessageSpendLimitOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetTextMessageSpendLimitOverride",
}));

export type SetVoiceMessageSpendLimitOverrideError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets an account level monthly spend limit override for sending voice messages. The requested spend limit must be less than or equal to the `MaxLimit`, which is set by Amazon Web Services.
 */
export const setVoiceMessageSpendLimitOverride: API.OperationMethod<
  SetVoiceMessageSpendLimitOverrideRequest,
  SetVoiceMessageSpendLimitOverrideResult,
  SetVoiceMessageSpendLimitOverrideError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetVoiceMessageSpendLimitOverrideRequest,
  output: SetVoiceMessageSpendLimitOverrideResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetVoiceMessageSpendLimitOverride",
}));

export type SubmitRegistrationVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submit the specified registration for review and approval.
 */
export const submitRegistrationVersion: API.OperationMethod<
  SubmitRegistrationVersionRequest,
  SubmitRegistrationVersionResult,
  SubmitRegistrationVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SubmitRegistrationVersionRequest,
  output: SubmitRegistrationVersionResult,
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
  operationName: "SubmitRegistrationVersion",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites only the specified tags for the specified resource. When you specify an existing tag key, the value is overwritten with the new value. Each tag consists of a key and an optional value. Tag keys must be unique per resource. For more information about tags, see Tags in the *End User Messaging SMS User Guide*.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
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
 * Removes the association of the specified tags from a resource. For more information on tags see Tags in the *End User Messaging SMS User Guide*.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResult,
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

export type UpdateEventDestinationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing event destination in a configuration set. You can update the IAM role ARN for CloudWatch Logs and Firehose. You can also enable or disable the event destination.
 *
 * You may want to update an event destination to change its matching event types or updating the destination resource ARN. You can't change an event destination's type between CloudWatch Logs, Firehose, and Amazon SNS.
 */
export const updateEventDestination: API.OperationMethod<
  UpdateEventDestinationRequest,
  UpdateEventDestinationResult,
  UpdateEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEventDestinationRequest,
  output: UpdateEventDestinationResult,
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
  operationName: "UpdateEventDestination",
}));

export type UpdateNotifyConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing notify configuration. You can update the default template, pool association, enabled channels, enabled countries, and deletion protection settings.
 */
export const updateNotifyConfiguration: API.OperationMethod<
  UpdateNotifyConfigurationRequest,
  UpdateNotifyConfigurationResult,
  UpdateNotifyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNotifyConfigurationRequest,
  output: UpdateNotifyConfigurationResult,
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
  operationName: "UpdateNotifyConfiguration",
}));

export type UpdatePhoneNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing origination phone number. You can update the opt-out list, enable or disable two-way messaging, change the TwoWayChannelArn, enable or disable self-managed opt-outs, and enable or disable deletion protection.
 *
 * If the origination phone number is associated with a pool, an error is returned.
 */
export const updatePhoneNumber: API.OperationMethod<
  UpdatePhoneNumberRequest,
  UpdatePhoneNumberResult,
  UpdatePhoneNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePhoneNumberRequest,
  output: UpdatePhoneNumberResult,
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
  operationName: "UpdatePhoneNumber",
}));

export type UpdatePoolError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing pool. You can update the opt-out list, enable or disable two-way messaging, change the `TwoWayChannelArn`, enable or disable self-managed opt-outs, enable or disable deletion protection, and enable or disable shared routes.
 */
export const updatePool: API.OperationMethod<
  UpdatePoolRequest,
  UpdatePoolResult,
  UpdatePoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePoolRequest,
  output: UpdatePoolResult,
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
  operationName: "UpdatePool",
}));

export type UpdateProtectConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the setting for an existing protect configuration.
 */
export const updateProtectConfiguration: API.OperationMethod<
  UpdateProtectConfigurationRequest,
  UpdateProtectConfigurationResult,
  UpdateProtectConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProtectConfigurationRequest,
  output: UpdateProtectConfigurationResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProtectConfiguration",
}));

export type UpdateProtectConfigurationCountryRuleSetError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a country rule set to `ALLOW`, `BLOCK`, `MONITOR`, or `FILTER` messages to be sent to the specified destination counties. You can update one or multiple countries at a time. The updates are only applied to the specified NumberCapability type.
 */
export const updateProtectConfigurationCountryRuleSet: API.OperationMethod<
  UpdateProtectConfigurationCountryRuleSetRequest,
  UpdateProtectConfigurationCountryRuleSetResult,
  UpdateProtectConfigurationCountryRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProtectConfigurationCountryRuleSetRequest,
  output: UpdateProtectConfigurationCountryRuleSetResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProtectConfigurationCountryRuleSet",
}));

export type UpdateRcsAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing RCS agent. You can update the opt-out list, deletion protection, two-way messaging settings, and self-managed opt-outs configuration.
 */
export const updateRcsAgent: API.OperationMethod<
  UpdateRcsAgentRequest,
  UpdateRcsAgentResult,
  UpdateRcsAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRcsAgentRequest,
  output: UpdateRcsAgentResult,
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
  operationName: "UpdateRcsAgent",
}));

export type UpdateSenderIdError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing sender ID.
 */
export const updateSenderId: API.OperationMethod<
  UpdateSenderIdRequest,
  UpdateSenderIdResult,
  UpdateSenderIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSenderIdRequest,
  output: UpdateSenderIdResult,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSenderId",
}));

export type VerifyDestinationNumberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use the verification code that was received by the verified destination phone number to opt-in the verified destination phone number to receive more messages.
 */
export const verifyDestinationNumber: API.OperationMethod<
  VerifyDestinationNumberRequest,
  VerifyDestinationNumberResult,
  VerifyDestinationNumberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: VerifyDestinationNumberRequest,
  output: VerifyDestinationNumberResult,
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
  operationName: "VerifyDestinationNumber",
}));
