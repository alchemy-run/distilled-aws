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
  sdkId: "Pinpoint Email",
  serviceShapeName: "AmazonPinpointEmailService",
});
const auth = T.AwsAuthSigv4({ name: "ses" });
const ver = T.ServiceVersion("2018-07-26");
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
              `https://email-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://email-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://email.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://email.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccountSuspendedException
  extends /*@__PURE__*/ S.TaggedError<AccountSuspendedException>()(
    "AccountSuspendedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MailFromDomainNotVerifiedException
  extends /*@__PURE__*/ S.TaggedError<MailFromDomainNotVerifiedException>()(
    "MailFromDomainNotVerifiedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MessageRejected
  extends /*@__PURE__*/ S.TaggedError<MessageRejected>()(
    "MessageRejected",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class SendingPausedException
  extends /*@__PURE__*/ S.TaggedError<SendingPausedException>()(
    "SendingPausedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type ConfigurationSetName = string;
export type CustomRedirectDomain = string;
export interface TrackingOptions {
  CustomRedirectDomain: string;
}
export const TrackingOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CustomRedirectDomain: S.String }),
).annotate({
  identifier: "TrackingOptions",
}) as any as S.Schema<TrackingOptions>;
export type TlsPolicy = "REQUIRE" | "OPTIONAL" | (string & {});
export const TlsPolicy = S.String;

export type PoolName = string;
export interface DeliveryOptions {
  TlsPolicy?: TlsPolicy;
  SendingPoolName?: string;
}
export const DeliveryOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TlsPolicy: S.optional(TlsPolicy),
    SendingPoolName: S.optional(S.String),
  }),
).annotate({
  identifier: "DeliveryOptions",
}) as any as S.Schema<DeliveryOptions>;
export type Enabled = boolean;
export type LastFreshStart = Date;
export interface ReputationOptions {
  ReputationMetricsEnabled?: boolean;
  LastFreshStart?: Date;
}
export const ReputationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReputationMetricsEnabled: S.optional(S.Boolean),
    LastFreshStart: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "ReputationOptions",
}) as any as S.Schema<ReputationOptions>;
export interface SendingOptions {
  SendingEnabled?: boolean;
}
export const SendingOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SendingEnabled: S.optional(S.Boolean) }),
).annotate({ identifier: "SendingOptions" }) as any as S.Schema<SendingOptions>;
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
  TrackingOptions?: TrackingOptions;
  DeliveryOptions?: DeliveryOptions;
  ReputationOptions?: ReputationOptions;
  SendingOptions?: SendingOptions;
  Tags?: Tag[];
}
export const CreateConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.String,
    TrackingOptions: S.optional(TrackingOptions),
    DeliveryOptions: S.optional(DeliveryOptions),
    ReputationOptions: S.optional(ReputationOptions),
    SendingOptions: S.optional(SendingOptions),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/email/configuration-sets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateConfigurationSetRequest",
}) as any as S.Schema<CreateConfigurationSetRequest>;
export interface CreateConfigurationSetResponse {}
export const CreateConfigurationSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateConfigurationSetResponse",
}) as any as S.Schema<CreateConfigurationSetResponse>;
export type EventDestinationName = string;
export type EventType =
  | "SEND"
  | "REJECT"
  | "BOUNCE"
  | "COMPLAINT"
  | "DELIVERY"
  | "OPEN"
  | "CLICK"
  | "RENDERING_FAILURE"
  | (string & {});
export const EventType = S.String;

export type EventTypes = EventType[];
export const EventTypes = /*@__PURE__*/ S.Array(EventType);
export type AmazonResourceName = string;
export interface KinesisFirehoseDestination {
  IamRoleArn: string;
  DeliveryStreamArn: string;
}
export const KinesisFirehoseDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IamRoleArn: S.String, DeliveryStreamArn: S.String }),
).annotate({
  identifier: "KinesisFirehoseDestination",
}) as any as S.Schema<KinesisFirehoseDestination>;
export type DimensionName = string;
export type DimensionValueSource =
  | "MESSAGE_TAG"
  | "EMAIL_HEADER"
  | "LINK_TAG"
  | (string & {});
export const DimensionValueSource = S.String;

export type DefaultDimensionValue = string;
export interface CloudWatchDimensionConfiguration {
  DimensionName: string;
  DimensionValueSource: DimensionValueSource;
  DefaultDimensionValue: string;
}
export const CloudWatchDimensionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DimensionName: S.String,
    DimensionValueSource: DimensionValueSource,
    DefaultDimensionValue: S.String,
  }),
).annotate({
  identifier: "CloudWatchDimensionConfiguration",
}) as any as S.Schema<CloudWatchDimensionConfiguration>;
export type CloudWatchDimensionConfigurations =
  CloudWatchDimensionConfiguration[];
export const CloudWatchDimensionConfigurations = /*@__PURE__*/ S.Array(
  CloudWatchDimensionConfiguration,
);
export interface CloudWatchDestination {
  DimensionConfigurations: CloudWatchDimensionConfiguration[];
}
export const CloudWatchDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DimensionConfigurations: CloudWatchDimensionConfigurations }),
).annotate({
  identifier: "CloudWatchDestination",
}) as any as S.Schema<CloudWatchDestination>;
export interface SnsDestination {
  TopicArn: string;
}
export const SnsDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TopicArn: S.String }),
).annotate({ identifier: "SnsDestination" }) as any as S.Schema<SnsDestination>;
export interface PinpointDestination {
  ApplicationArn?: string;
}
export const PinpointDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationArn: S.optional(S.String) }),
).annotate({
  identifier: "PinpointDestination",
}) as any as S.Schema<PinpointDestination>;
export interface EventDestinationDefinition {
  Enabled?: boolean;
  MatchingEventTypes?: EventType[];
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  CloudWatchDestination?: CloudWatchDestination;
  SnsDestination?: SnsDestination;
  PinpointDestination?: PinpointDestination;
}
export const EventDestinationDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    MatchingEventTypes: S.optional(EventTypes),
    KinesisFirehoseDestination: S.optional(KinesisFirehoseDestination),
    CloudWatchDestination: S.optional(CloudWatchDestination),
    SnsDestination: S.optional(SnsDestination),
    PinpointDestination: S.optional(PinpointDestination),
  }),
).annotate({
  identifier: "EventDestinationDefinition",
}) as any as S.Schema<EventDestinationDefinition>;
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  EventDestination: EventDestinationDefinition;
}
export const CreateConfigurationSetEventDestinationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      EventDestinationName: S.String,
      EventDestination: EventDestinationDefinition,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v1/email/configuration-sets/{ConfigurationSetName}/event-destinations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateConfigurationSetEventDestinationRequest",
  }) as any as S.Schema<CreateConfigurationSetEventDestinationRequest>;
export interface CreateConfigurationSetEventDestinationResponse {}
export const CreateConfigurationSetEventDestinationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "CreateConfigurationSetEventDestinationResponse",
  }) as any as S.Schema<CreateConfigurationSetEventDestinationResponse>;
export interface CreateDedicatedIpPoolRequest {
  PoolName: string;
  Tags?: Tag[];
}
export const CreateDedicatedIpPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PoolName: S.String, Tags: S.optional(TagList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/email/dedicated-ip-pools" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateDedicatedIpPoolRequest",
}) as any as S.Schema<CreateDedicatedIpPoolRequest>;
export interface CreateDedicatedIpPoolResponse {}
export const CreateDedicatedIpPoolResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateDedicatedIpPoolResponse",
}) as any as S.Schema<CreateDedicatedIpPoolResponse>;
export type ReportName = string;
export type EmailAddress = string;
export type MessageData = string;
export type Charset = string;
export interface Content {
  Data: string;
  Charset?: string;
}
export const Content = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Data: S.String, Charset: S.optional(S.String) }),
).annotate({ identifier: "Content" }) as any as S.Schema<Content>;
export interface Body {
  Text?: Content;
  Html?: Content;
}
export const Body = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Text: S.optional(Content), Html: S.optional(Content) }),
).annotate({ identifier: "Body" }) as any as S.Schema<Body>;
export interface Message {
  Subject: Content;
  Body: Body;
}
export const Message = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Subject: Content, Body: Body }),
).annotate({ identifier: "Message" }) as any as S.Schema<Message>;
export type RawMessageData = Uint8Array;
export interface RawMessage {
  Data: Uint8Array;
}
export const RawMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Data: T.Blob }),
).annotate({ identifier: "RawMessage" }) as any as S.Schema<RawMessage>;
export type TemplateArn = string;
export type TemplateData = string;
export interface Template {
  TemplateArn?: string;
  TemplateData?: string;
}
export const Template = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateArn: S.optional(S.String),
    TemplateData: S.optional(S.String),
  }),
).annotate({ identifier: "Template" }) as any as S.Schema<Template>;
export interface EmailContent {
  Simple?: Message;
  Raw?: RawMessage;
  Template?: Template;
}
export const EmailContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Simple: S.optional(Message),
    Raw: S.optional(RawMessage),
    Template: S.optional(Template),
  }),
).annotate({ identifier: "EmailContent" }) as any as S.Schema<EmailContent>;
export interface CreateDeliverabilityTestReportRequest {
  ReportName?: string;
  FromEmailAddress: string;
  Content: EmailContent;
  Tags?: Tag[];
}
export const CreateDeliverabilityTestReportRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReportName: S.optional(S.String),
      FromEmailAddress: S.String,
      Content: EmailContent,
      Tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/v1/email/deliverability-dashboard/test",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateDeliverabilityTestReportRequest",
}) as any as S.Schema<CreateDeliverabilityTestReportRequest>;
export type ReportId = string;
export type DeliverabilityTestStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | (string & {});
export const DeliverabilityTestStatus = S.String;

export interface CreateDeliverabilityTestReportResponse {
  ReportId: string;
  DeliverabilityTestStatus: DeliverabilityTestStatus;
}
export const CreateDeliverabilityTestReportResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ReportId: S.String,
      DeliverabilityTestStatus: DeliverabilityTestStatus,
    }),
).annotate({
  identifier: "CreateDeliverabilityTestReportResponse",
}) as any as S.Schema<CreateDeliverabilityTestReportResponse>;
export type Identity = string;
export interface CreateEmailIdentityRequest {
  EmailIdentity: string;
  Tags?: Tag[];
}
export const CreateEmailIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EmailIdentity: S.String, Tags: S.optional(TagList) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/email/identities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEmailIdentityRequest",
}) as any as S.Schema<CreateEmailIdentityRequest>;
export type IdentityType =
  | "EMAIL_ADDRESS"
  | "DOMAIN"
  | "MANAGED_DOMAIN"
  | (string & {});
export const IdentityType = S.String;

export type DkimStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "TEMPORARY_FAILURE"
  | "NOT_STARTED"
  | (string & {});
export const DkimStatus = S.String;

export type DnsToken = string;
export type DnsTokenList = string[];
export const DnsTokenList = /*@__PURE__*/ S.Array(S.String);
export interface DkimAttributes {
  SigningEnabled?: boolean;
  Status?: DkimStatus;
  Tokens?: string[];
}
export const DkimAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SigningEnabled: S.optional(S.Boolean),
    Status: S.optional(DkimStatus),
    Tokens: S.optional(DnsTokenList),
  }),
).annotate({ identifier: "DkimAttributes" }) as any as S.Schema<DkimAttributes>;
export interface CreateEmailIdentityResponse {
  IdentityType?: IdentityType;
  VerifiedForSendingStatus?: boolean;
  DkimAttributes?: DkimAttributes;
}
export const CreateEmailIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityType: S.optional(IdentityType),
    VerifiedForSendingStatus: S.optional(S.Boolean),
    DkimAttributes: S.optional(DkimAttributes),
  }),
).annotate({
  identifier: "CreateEmailIdentityResponse",
}) as any as S.Schema<CreateEmailIdentityResponse>;
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}
export const DeleteConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/email/configuration-sets/{ConfigurationSetName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteConfigurationSetRequest",
}) as any as S.Schema<DeleteConfigurationSetRequest>;
export interface DeleteConfigurationSetResponse {}
export const DeleteConfigurationSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteConfigurationSetResponse",
}) as any as S.Schema<DeleteConfigurationSetResponse>;
export interface DeleteConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
}
export const DeleteConfigurationSetEventDestinationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      EventDestinationName: S.String.pipe(T.HttpLabel("EventDestinationName")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/v1/email/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteConfigurationSetEventDestinationRequest",
  }) as any as S.Schema<DeleteConfigurationSetEventDestinationRequest>;
export interface DeleteConfigurationSetEventDestinationResponse {}
export const DeleteConfigurationSetEventDestinationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteConfigurationSetEventDestinationResponse",
  }) as any as S.Schema<DeleteConfigurationSetEventDestinationResponse>;
export interface DeleteDedicatedIpPoolRequest {
  PoolName: string;
}
export const DeleteDedicatedIpPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PoolName: S.String.pipe(T.HttpLabel("PoolName")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/email/dedicated-ip-pools/{PoolName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteDedicatedIpPoolRequest",
}) as any as S.Schema<DeleteDedicatedIpPoolRequest>;
export interface DeleteDedicatedIpPoolResponse {}
export const DeleteDedicatedIpPoolResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDedicatedIpPoolResponse",
}) as any as S.Schema<DeleteDedicatedIpPoolResponse>;
export interface DeleteEmailIdentityRequest {
  EmailIdentity: string;
}
export const DeleteEmailIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/email/identities/{EmailIdentity}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEmailIdentityRequest",
}) as any as S.Schema<DeleteEmailIdentityRequest>;
export interface DeleteEmailIdentityResponse {}
export const DeleteEmailIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEmailIdentityResponse",
}) as any as S.Schema<DeleteEmailIdentityResponse>;
export interface GetAccountRequest {}
export const GetAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/email/account" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountRequest",
}) as any as S.Schema<GetAccountRequest>;
export type Max24HourSend = number;
export type MaxSendRate = number;
export type SentLast24Hours = number;
export interface SendQuota {
  Max24HourSend?: number;
  MaxSendRate?: number;
  SentLast24Hours?: number;
}
export const SendQuota = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Max24HourSend: S.optional(S.Number),
    MaxSendRate: S.optional(S.Number),
    SentLast24Hours: S.optional(S.Number),
  }),
).annotate({ identifier: "SendQuota" }) as any as S.Schema<SendQuota>;
export type GeneralEnforcementStatus = string;
export interface GetAccountResponse {
  SendQuota?: SendQuota;
  SendingEnabled?: boolean;
  DedicatedIpAutoWarmupEnabled?: boolean;
  EnforcementStatus?: string;
  ProductionAccessEnabled?: boolean;
}
export const GetAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SendQuota: S.optional(SendQuota),
    SendingEnabled: S.optional(S.Boolean),
    DedicatedIpAutoWarmupEnabled: S.optional(S.Boolean),
    EnforcementStatus: S.optional(S.String),
    ProductionAccessEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "GetAccountResponse",
}) as any as S.Schema<GetAccountResponse>;
export type BlacklistItemName = string;
export type BlacklistItemNames = string[];
export const BlacklistItemNames = /*@__PURE__*/ S.Array(S.String);
export interface GetBlacklistReportsRequest {
  BlacklistItemNames: string[];
}
export const GetBlacklistReportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlacklistItemNames: BlacklistItemNames.pipe(
      T.HttpQuery("BlacklistItemNames"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/email/deliverability-dashboard/blacklist-report",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBlacklistReportsRequest",
}) as any as S.Schema<GetBlacklistReportsRequest>;
export type RblName = string;
export type BlacklistingDescription = string;
export interface BlacklistEntry {
  RblName?: string;
  ListingTime?: Date;
  Description?: string;
}
export const BlacklistEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RblName: S.optional(S.String),
    ListingTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
  }),
).annotate({ identifier: "BlacklistEntry" }) as any as S.Schema<BlacklistEntry>;
export type BlacklistEntries = BlacklistEntry[];
export const BlacklistEntries = /*@__PURE__*/ S.Array(BlacklistEntry);
export type BlacklistReport = { [key: string]: BlacklistEntry[] | undefined };
export const BlacklistReport = /*@__PURE__*/ S.Record(
  S.String,
  BlacklistEntries.pipe(S.optional),
);
export interface GetBlacklistReportsResponse {
  BlacklistReport: { [key: string]: BlacklistEntry[] | undefined };
}
export const GetBlacklistReportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BlacklistReport: BlacklistReport }),
).annotate({
  identifier: "GetBlacklistReportsResponse",
}) as any as S.Schema<GetBlacklistReportsResponse>;
export interface GetConfigurationSetRequest {
  ConfigurationSetName: string;
}
export const GetConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/email/configuration-sets/{ConfigurationSetName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetConfigurationSetRequest",
}) as any as S.Schema<GetConfigurationSetRequest>;
export interface GetConfigurationSetResponse {
  ConfigurationSetName?: string;
  TrackingOptions?: TrackingOptions;
  DeliveryOptions?: DeliveryOptions;
  ReputationOptions?: ReputationOptions;
  SendingOptions?: SendingOptions;
  Tags?: Tag[];
}
export const GetConfigurationSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.optional(S.String),
    TrackingOptions: S.optional(TrackingOptions),
    DeliveryOptions: S.optional(DeliveryOptions),
    ReputationOptions: S.optional(ReputationOptions),
    SendingOptions: S.optional(SendingOptions),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "GetConfigurationSetResponse",
}) as any as S.Schema<GetConfigurationSetResponse>;
export interface GetConfigurationSetEventDestinationsRequest {
  ConfigurationSetName: string;
}
export const GetConfigurationSetEventDestinationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/email/configuration-sets/{ConfigurationSetName}/event-destinations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetConfigurationSetEventDestinationsRequest",
  }) as any as S.Schema<GetConfigurationSetEventDestinationsRequest>;
export interface EventDestination {
  Name: string;
  Enabled?: boolean;
  MatchingEventTypes: EventType[];
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  CloudWatchDestination?: CloudWatchDestination;
  SnsDestination?: SnsDestination;
  PinpointDestination?: PinpointDestination;
}
export const EventDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Enabled: S.optional(S.Boolean),
    MatchingEventTypes: EventTypes,
    KinesisFirehoseDestination: S.optional(KinesisFirehoseDestination),
    CloudWatchDestination: S.optional(CloudWatchDestination),
    SnsDestination: S.optional(SnsDestination),
    PinpointDestination: S.optional(PinpointDestination),
  }),
).annotate({
  identifier: "EventDestination",
}) as any as S.Schema<EventDestination>;
export type EventDestinations = EventDestination[];
export const EventDestinations = /*@__PURE__*/ S.Array(EventDestination);
export interface GetConfigurationSetEventDestinationsResponse {
  EventDestinations?: EventDestination[];
}
export const GetConfigurationSetEventDestinationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ EventDestinations: S.optional(EventDestinations) }),
  ).annotate({
    identifier: "GetConfigurationSetEventDestinationsResponse",
  }) as any as S.Schema<GetConfigurationSetEventDestinationsResponse>;
export type Ip = string;
export interface GetDedicatedIpRequest {
  Ip: string;
}
export const GetDedicatedIpRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Ip: S.String.pipe(T.HttpLabel("Ip")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/email/dedicated-ips/{Ip}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDedicatedIpRequest",
}) as any as S.Schema<GetDedicatedIpRequest>;
export type WarmupStatus = "IN_PROGRESS" | "DONE" | (string & {});
export const WarmupStatus = S.String;

export type Percentage100Wrapper = number;
export interface DedicatedIp {
  Ip: string;
  WarmupStatus: WarmupStatus;
  WarmupPercentage: number;
  PoolName?: string;
}
export const DedicatedIp = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ip: S.String,
    WarmupStatus: WarmupStatus,
    WarmupPercentage: S.Number,
    PoolName: S.optional(S.String),
  }),
).annotate({ identifier: "DedicatedIp" }) as any as S.Schema<DedicatedIp>;
export interface GetDedicatedIpResponse {
  DedicatedIp?: DedicatedIp;
}
export const GetDedicatedIpResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DedicatedIp: S.optional(DedicatedIp) }),
).annotate({
  identifier: "GetDedicatedIpResponse",
}) as any as S.Schema<GetDedicatedIpResponse>;
export type NextToken = string;
export type MaxItems = number;
export interface GetDedicatedIpsRequest {
  PoolName?: string;
  NextToken?: string;
  PageSize?: number;
}
export const GetDedicatedIpsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolName: S.optional(S.String).pipe(T.HttpQuery("PoolName")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/email/dedicated-ips" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDedicatedIpsRequest",
}) as any as S.Schema<GetDedicatedIpsRequest>;
export type DedicatedIpList = DedicatedIp[];
export const DedicatedIpList = /*@__PURE__*/ S.Array(DedicatedIp);
export interface GetDedicatedIpsResponse {
  DedicatedIps?: DedicatedIp[];
  NextToken?: string;
}
export const GetDedicatedIpsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DedicatedIps: S.optional(DedicatedIpList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetDedicatedIpsResponse",
}) as any as S.Schema<GetDedicatedIpsResponse>;
export interface GetDeliverabilityDashboardOptionsRequest {}
export const GetDeliverabilityDashboardOptionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({}).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/v1/email/deliverability-dashboard" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetDeliverabilityDashboardOptionsRequest",
}) as any as S.Schema<GetDeliverabilityDashboardOptionsRequest>;
export type DeliverabilityDashboardAccountStatus =
  | "ACTIVE"
  | "PENDING_EXPIRATION"
  | "DISABLED"
  | (string & {});
export const DeliverabilityDashboardAccountStatus = S.String;

export type Domain = string;
export type IspName = string;
export type IspNameList = string[];
export const IspNameList = /*@__PURE__*/ S.Array(S.String);
export interface InboxPlacementTrackingOption {
  Global?: boolean;
  TrackedIsps?: string[];
}
export const InboxPlacementTrackingOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Global: S.optional(S.Boolean),
    TrackedIsps: S.optional(IspNameList),
  }),
).annotate({
  identifier: "InboxPlacementTrackingOption",
}) as any as S.Schema<InboxPlacementTrackingOption>;
export interface DomainDeliverabilityTrackingOption {
  Domain?: string;
  SubscriptionStartDate?: Date;
  InboxPlacementTrackingOption?: InboxPlacementTrackingOption;
}
export const DomainDeliverabilityTrackingOption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Domain: S.optional(S.String),
    SubscriptionStartDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    InboxPlacementTrackingOption: S.optional(InboxPlacementTrackingOption),
  }),
).annotate({
  identifier: "DomainDeliverabilityTrackingOption",
}) as any as S.Schema<DomainDeliverabilityTrackingOption>;
export type DomainDeliverabilityTrackingOptions =
  DomainDeliverabilityTrackingOption[];
export const DomainDeliverabilityTrackingOptions = /*@__PURE__*/ S.Array(
  DomainDeliverabilityTrackingOption,
);
export interface GetDeliverabilityDashboardOptionsResponse {
  DashboardEnabled: boolean;
  SubscriptionExpiryDate?: Date;
  AccountStatus?: DeliverabilityDashboardAccountStatus;
  ActiveSubscribedDomains?: DomainDeliverabilityTrackingOption[];
  PendingExpirationSubscribedDomains?: DomainDeliverabilityTrackingOption[];
}
export const GetDeliverabilityDashboardOptionsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DashboardEnabled: S.Boolean,
      SubscriptionExpiryDate: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      AccountStatus: S.optional(DeliverabilityDashboardAccountStatus),
      ActiveSubscribedDomains: S.optional(DomainDeliverabilityTrackingOptions),
      PendingExpirationSubscribedDomains: S.optional(
        DomainDeliverabilityTrackingOptions,
      ),
    }),
  ).annotate({
    identifier: "GetDeliverabilityDashboardOptionsResponse",
  }) as any as S.Schema<GetDeliverabilityDashboardOptionsResponse>;
export interface GetDeliverabilityTestReportRequest {
  ReportId: string;
}
export const GetDeliverabilityTestReportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReportId: S.String.pipe(T.HttpLabel("ReportId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/email/deliverability-dashboard/test-reports/{ReportId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDeliverabilityTestReportRequest",
}) as any as S.Schema<GetDeliverabilityTestReportRequest>;
export type DeliverabilityTestSubject = string;
export interface DeliverabilityTestReport {
  ReportId?: string;
  ReportName?: string;
  Subject?: string;
  FromEmailAddress?: string;
  CreateDate?: Date;
  DeliverabilityTestStatus?: DeliverabilityTestStatus;
}
export const DeliverabilityTestReport = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReportId: S.optional(S.String),
    ReportName: S.optional(S.String),
    Subject: S.optional(S.String),
    FromEmailAddress: S.optional(S.String),
    CreateDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DeliverabilityTestStatus: S.optional(DeliverabilityTestStatus),
  }),
).annotate({
  identifier: "DeliverabilityTestReport",
}) as any as S.Schema<DeliverabilityTestReport>;
export type Percentage = number;
export interface PlacementStatistics {
  InboxPercentage?: number;
  SpamPercentage?: number;
  MissingPercentage?: number;
  SpfPercentage?: number;
  DkimPercentage?: number;
}
export const PlacementStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InboxPercentage: S.optional(S.Number),
    SpamPercentage: S.optional(S.Number),
    MissingPercentage: S.optional(S.Number),
    SpfPercentage: S.optional(S.Number),
    DkimPercentage: S.optional(S.Number),
  }),
).annotate({
  identifier: "PlacementStatistics",
}) as any as S.Schema<PlacementStatistics>;
export interface IspPlacement {
  IspName?: string;
  PlacementStatistics?: PlacementStatistics;
}
export const IspPlacement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IspName: S.optional(S.String),
    PlacementStatistics: S.optional(PlacementStatistics),
  }),
).annotate({ identifier: "IspPlacement" }) as any as S.Schema<IspPlacement>;
export type IspPlacements = IspPlacement[];
export const IspPlacements = /*@__PURE__*/ S.Array(IspPlacement);
export type MessageContent = string;
export interface GetDeliverabilityTestReportResponse {
  DeliverabilityTestReport: DeliverabilityTestReport;
  OverallPlacement: PlacementStatistics;
  IspPlacements: IspPlacement[];
  Message?: string;
  Tags?: Tag[];
}
export const GetDeliverabilityTestReportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliverabilityTestReport: DeliverabilityTestReport,
    OverallPlacement: PlacementStatistics,
    IspPlacements: IspPlacements,
    Message: S.optional(S.String),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "GetDeliverabilityTestReportResponse",
}) as any as S.Schema<GetDeliverabilityTestReportResponse>;
export type CampaignId = string;
export interface GetDomainDeliverabilityCampaignRequest {
  CampaignId: string;
}
export const GetDomainDeliverabilityCampaignRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ CampaignId: S.String.pipe(T.HttpLabel("CampaignId")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/email/deliverability-dashboard/campaigns/{CampaignId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetDomainDeliverabilityCampaignRequest",
}) as any as S.Schema<GetDomainDeliverabilityCampaignRequest>;
export type ImageUrl = string;
export type Subject = string;
export type IpList = string[];
export const IpList = /*@__PURE__*/ S.Array(S.String);
export type Volume = number;
export type Esp = string;
export type Esps = string[];
export const Esps = /*@__PURE__*/ S.Array(S.String);
export interface DomainDeliverabilityCampaign {
  CampaignId?: string;
  ImageUrl?: string;
  Subject?: string;
  FromAddress?: string;
  SendingIps?: string[];
  FirstSeenDateTime?: Date;
  LastSeenDateTime?: Date;
  InboxCount?: number;
  SpamCount?: number;
  ReadRate?: number;
  DeleteRate?: number;
  ReadDeleteRate?: number;
  ProjectedVolume?: number;
  Esps?: string[];
}
export const DomainDeliverabilityCampaign = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignId: S.optional(S.String),
    ImageUrl: S.optional(S.String),
    Subject: S.optional(S.String),
    FromAddress: S.optional(S.String),
    SendingIps: S.optional(IpList),
    FirstSeenDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastSeenDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    InboxCount: S.optional(S.Number),
    SpamCount: S.optional(S.Number),
    ReadRate: S.optional(S.Number),
    DeleteRate: S.optional(S.Number),
    ReadDeleteRate: S.optional(S.Number),
    ProjectedVolume: S.optional(S.Number),
    Esps: S.optional(Esps),
  }),
).annotate({
  identifier: "DomainDeliverabilityCampaign",
}) as any as S.Schema<DomainDeliverabilityCampaign>;
export interface GetDomainDeliverabilityCampaignResponse {
  DomainDeliverabilityCampaign: DomainDeliverabilityCampaign;
}
export const GetDomainDeliverabilityCampaignResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ DomainDeliverabilityCampaign: DomainDeliverabilityCampaign }),
).annotate({
  identifier: "GetDomainDeliverabilityCampaignResponse",
}) as any as S.Schema<GetDomainDeliverabilityCampaignResponse>;
export interface GetDomainStatisticsReportRequest {
  Domain: string;
  StartDate: Date;
  EndDate: Date;
}
export const GetDomainStatisticsReportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Domain: S.String.pipe(T.HttpLabel("Domain")),
    StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("StartDate"),
    ),
    EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
      T.HttpQuery("EndDate"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/email/deliverability-dashboard/statistics-report/{Domain}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDomainStatisticsReportRequest",
}) as any as S.Schema<GetDomainStatisticsReportRequest>;
export interface VolumeStatistics {
  InboxRawCount?: number;
  SpamRawCount?: number;
  ProjectedInbox?: number;
  ProjectedSpam?: number;
}
export const VolumeStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InboxRawCount: S.optional(S.Number),
    SpamRawCount: S.optional(S.Number),
    ProjectedInbox: S.optional(S.Number),
    ProjectedSpam: S.optional(S.Number),
  }),
).annotate({
  identifier: "VolumeStatistics",
}) as any as S.Schema<VolumeStatistics>;
export interface DomainIspPlacement {
  IspName?: string;
  InboxRawCount?: number;
  SpamRawCount?: number;
  InboxPercentage?: number;
  SpamPercentage?: number;
}
export const DomainIspPlacement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IspName: S.optional(S.String),
    InboxRawCount: S.optional(S.Number),
    SpamRawCount: S.optional(S.Number),
    InboxPercentage: S.optional(S.Number),
    SpamPercentage: S.optional(S.Number),
  }),
).annotate({
  identifier: "DomainIspPlacement",
}) as any as S.Schema<DomainIspPlacement>;
export type DomainIspPlacements = DomainIspPlacement[];
export const DomainIspPlacements = /*@__PURE__*/ S.Array(DomainIspPlacement);
export interface OverallVolume {
  VolumeStatistics?: VolumeStatistics;
  ReadRatePercent?: number;
  DomainIspPlacements?: DomainIspPlacement[];
}
export const OverallVolume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VolumeStatistics: S.optional(VolumeStatistics),
    ReadRatePercent: S.optional(S.Number),
    DomainIspPlacements: S.optional(DomainIspPlacements),
  }),
).annotate({ identifier: "OverallVolume" }) as any as S.Schema<OverallVolume>;
export interface DailyVolume {
  StartDate?: Date;
  VolumeStatistics?: VolumeStatistics;
  DomainIspPlacements?: DomainIspPlacement[];
}
export const DailyVolume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    VolumeStatistics: S.optional(VolumeStatistics),
    DomainIspPlacements: S.optional(DomainIspPlacements),
  }),
).annotate({ identifier: "DailyVolume" }) as any as S.Schema<DailyVolume>;
export type DailyVolumes = DailyVolume[];
export const DailyVolumes = /*@__PURE__*/ S.Array(DailyVolume);
export interface GetDomainStatisticsReportResponse {
  OverallVolume: OverallVolume;
  DailyVolumes: DailyVolume[];
}
export const GetDomainStatisticsReportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OverallVolume: OverallVolume, DailyVolumes: DailyVolumes }),
).annotate({
  identifier: "GetDomainStatisticsReportResponse",
}) as any as S.Schema<GetDomainStatisticsReportResponse>;
export interface GetEmailIdentityRequest {
  EmailIdentity: string;
}
export const GetEmailIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/email/identities/{EmailIdentity}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEmailIdentityRequest",
}) as any as S.Schema<GetEmailIdentityRequest>;
export type MailFromDomainName = string;
export type MailFromDomainStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "TEMPORARY_FAILURE"
  | (string & {});
export const MailFromDomainStatus = S.String;

export type BehaviorOnMxFailure =
  | "USE_DEFAULT_VALUE"
  | "REJECT_MESSAGE"
  | (string & {});
export const BehaviorOnMxFailure = S.String;

export interface MailFromAttributes {
  MailFromDomain: string;
  MailFromDomainStatus: MailFromDomainStatus;
  BehaviorOnMxFailure: BehaviorOnMxFailure;
}
export const MailFromAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MailFromDomain: S.String,
    MailFromDomainStatus: MailFromDomainStatus,
    BehaviorOnMxFailure: BehaviorOnMxFailure,
  }),
).annotate({
  identifier: "MailFromAttributes",
}) as any as S.Schema<MailFromAttributes>;
export interface GetEmailIdentityResponse {
  IdentityType?: IdentityType;
  FeedbackForwardingStatus?: boolean;
  VerifiedForSendingStatus?: boolean;
  DkimAttributes?: DkimAttributes;
  MailFromAttributes?: MailFromAttributes;
  Tags?: Tag[];
}
export const GetEmailIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityType: S.optional(IdentityType),
    FeedbackForwardingStatus: S.optional(S.Boolean),
    VerifiedForSendingStatus: S.optional(S.Boolean),
    DkimAttributes: S.optional(DkimAttributes),
    MailFromAttributes: S.optional(MailFromAttributes),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "GetEmailIdentityResponse",
}) as any as S.Schema<GetEmailIdentityResponse>;
export interface ListConfigurationSetsRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListConfigurationSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/email/configuration-sets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListConfigurationSetsRequest",
}) as any as S.Schema<ListConfigurationSetsRequest>;
export type ConfigurationSetNameList = string[];
export const ConfigurationSetNameList = /*@__PURE__*/ S.Array(S.String);
export interface ListConfigurationSetsResponse {
  ConfigurationSets?: string[];
  NextToken?: string;
}
export const ListConfigurationSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSets: S.optional(ConfigurationSetNameList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListConfigurationSetsResponse",
}) as any as S.Schema<ListConfigurationSetsResponse>;
export interface ListDedicatedIpPoolsRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListDedicatedIpPoolsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/email/dedicated-ip-pools" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDedicatedIpPoolsRequest",
}) as any as S.Schema<ListDedicatedIpPoolsRequest>;
export type ListOfDedicatedIpPools = string[];
export const ListOfDedicatedIpPools = /*@__PURE__*/ S.Array(S.String);
export interface ListDedicatedIpPoolsResponse {
  DedicatedIpPools?: string[];
  NextToken?: string;
}
export const ListDedicatedIpPoolsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DedicatedIpPools: S.optional(ListOfDedicatedIpPools),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDedicatedIpPoolsResponse",
}) as any as S.Schema<ListDedicatedIpPoolsResponse>;
export interface ListDeliverabilityTestReportsRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListDeliverabilityTestReportsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/email/deliverability-dashboard/test-reports",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListDeliverabilityTestReportsRequest",
}) as any as S.Schema<ListDeliverabilityTestReportsRequest>;
export type DeliverabilityTestReports = DeliverabilityTestReport[];
export const DeliverabilityTestReports = /*@__PURE__*/ S.Array(
  DeliverabilityTestReport,
);
export interface ListDeliverabilityTestReportsResponse {
  DeliverabilityTestReports: DeliverabilityTestReport[];
  NextToken?: string;
}
export const ListDeliverabilityTestReportsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DeliverabilityTestReports: DeliverabilityTestReports,
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListDeliverabilityTestReportsResponse",
}) as any as S.Schema<ListDeliverabilityTestReportsResponse>;
export interface ListDomainDeliverabilityCampaignsRequest {
  StartDate: Date;
  EndDate: Date;
  SubscribedDomain: string;
  NextToken?: string;
  PageSize?: number;
}
export const ListDomainDeliverabilityCampaignsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StartDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
        T.HttpQuery("StartDate"),
      ),
      EndDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")).pipe(
        T.HttpQuery("EndDate"),
      ),
      SubscribedDomain: S.String.pipe(T.HttpLabel("SubscribedDomain")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
      PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/email/deliverability-dashboard/domains/{SubscribedDomain}/campaigns",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListDomainDeliverabilityCampaignsRequest",
}) as any as S.Schema<ListDomainDeliverabilityCampaignsRequest>;
export type DomainDeliverabilityCampaignList = DomainDeliverabilityCampaign[];
export const DomainDeliverabilityCampaignList = /*@__PURE__*/ S.Array(
  DomainDeliverabilityCampaign,
);
export interface ListDomainDeliverabilityCampaignsResponse {
  DomainDeliverabilityCampaigns: DomainDeliverabilityCampaign[];
  NextToken?: string;
}
export const ListDomainDeliverabilityCampaignsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      DomainDeliverabilityCampaigns: DomainDeliverabilityCampaignList,
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListDomainDeliverabilityCampaignsResponse",
  }) as any as S.Schema<ListDomainDeliverabilityCampaignsResponse>;
export interface ListEmailIdentitiesRequest {
  NextToken?: string;
  PageSize?: number;
}
export const ListEmailIdentitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    PageSize: S.optional(S.Number).pipe(T.HttpQuery("PageSize")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/email/identities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEmailIdentitiesRequest",
}) as any as S.Schema<ListEmailIdentitiesRequest>;
export interface IdentityInfo {
  IdentityType?: IdentityType;
  IdentityName?: string;
  SendingEnabled?: boolean;
}
export const IdentityInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityType: S.optional(IdentityType),
    IdentityName: S.optional(S.String),
    SendingEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "IdentityInfo" }) as any as S.Schema<IdentityInfo>;
export type IdentityInfoList = IdentityInfo[];
export const IdentityInfoList = /*@__PURE__*/ S.Array(IdentityInfo);
export interface ListEmailIdentitiesResponse {
  EmailIdentities?: IdentityInfo[];
  NextToken?: string;
}
export const ListEmailIdentitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailIdentities: S.optional(IdentityInfoList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEmailIdentitiesResponse",
}) as any as S.Schema<ListEmailIdentitiesResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpQuery("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/email/tags" }),
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
  Tags: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: TagList }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutAccountDedicatedIpWarmupAttributesRequest {
  AutoWarmupEnabled?: boolean;
}
export const PutAccountDedicatedIpWarmupAttributesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ AutoWarmupEnabled: S.optional(S.Boolean) }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/email/account/dedicated-ips/warmup",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutAccountDedicatedIpWarmupAttributesRequest",
  }) as any as S.Schema<PutAccountDedicatedIpWarmupAttributesRequest>;
export interface PutAccountDedicatedIpWarmupAttributesResponse {}
export const PutAccountDedicatedIpWarmupAttributesResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutAccountDedicatedIpWarmupAttributesResponse",
  }) as any as S.Schema<PutAccountDedicatedIpWarmupAttributesResponse>;
export interface PutAccountSendingAttributesRequest {
  SendingEnabled?: boolean;
}
export const PutAccountSendingAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SendingEnabled: S.optional(S.Boolean) }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/email/account/sending" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutAccountSendingAttributesRequest",
}) as any as S.Schema<PutAccountSendingAttributesRequest>;
export interface PutAccountSendingAttributesResponse {}
export const PutAccountSendingAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutAccountSendingAttributesResponse",
}) as any as S.Schema<PutAccountSendingAttributesResponse>;
export type SendingPoolName = string;
export interface PutConfigurationSetDeliveryOptionsRequest {
  ConfigurationSetName: string;
  TlsPolicy?: TlsPolicy;
  SendingPoolName?: string;
}
export const PutConfigurationSetDeliveryOptionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      TlsPolicy: S.optional(TlsPolicy),
      SendingPoolName: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/email/configuration-sets/{ConfigurationSetName}/delivery-options",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutConfigurationSetDeliveryOptionsRequest",
  }) as any as S.Schema<PutConfigurationSetDeliveryOptionsRequest>;
export interface PutConfigurationSetDeliveryOptionsResponse {}
export const PutConfigurationSetDeliveryOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutConfigurationSetDeliveryOptionsResponse",
  }) as any as S.Schema<PutConfigurationSetDeliveryOptionsResponse>;
export interface PutConfigurationSetReputationOptionsRequest {
  ConfigurationSetName: string;
  ReputationMetricsEnabled?: boolean;
}
export const PutConfigurationSetReputationOptionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      ReputationMetricsEnabled: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/email/configuration-sets/{ConfigurationSetName}/reputation-options",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutConfigurationSetReputationOptionsRequest",
  }) as any as S.Schema<PutConfigurationSetReputationOptionsRequest>;
export interface PutConfigurationSetReputationOptionsResponse {}
export const PutConfigurationSetReputationOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutConfigurationSetReputationOptionsResponse",
  }) as any as S.Schema<PutConfigurationSetReputationOptionsResponse>;
export interface PutConfigurationSetSendingOptionsRequest {
  ConfigurationSetName: string;
  SendingEnabled?: boolean;
}
export const PutConfigurationSetSendingOptionsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      SendingEnabled: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/email/configuration-sets/{ConfigurationSetName}/sending",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutConfigurationSetSendingOptionsRequest",
}) as any as S.Schema<PutConfigurationSetSendingOptionsRequest>;
export interface PutConfigurationSetSendingOptionsResponse {}
export const PutConfigurationSetSendingOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutConfigurationSetSendingOptionsResponse",
  }) as any as S.Schema<PutConfigurationSetSendingOptionsResponse>;
export interface PutConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
  CustomRedirectDomain?: string;
}
export const PutConfigurationSetTrackingOptionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      CustomRedirectDomain: S.optional(S.String),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/email/configuration-sets/{ConfigurationSetName}/tracking-options",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutConfigurationSetTrackingOptionsRequest",
  }) as any as S.Schema<PutConfigurationSetTrackingOptionsRequest>;
export interface PutConfigurationSetTrackingOptionsResponse {}
export const PutConfigurationSetTrackingOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutConfigurationSetTrackingOptionsResponse",
  }) as any as S.Schema<PutConfigurationSetTrackingOptionsResponse>;
export interface PutDedicatedIpInPoolRequest {
  Ip: string;
  DestinationPoolName: string;
}
export const PutDedicatedIpInPoolRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ip: S.String.pipe(T.HttpLabel("Ip")),
    DestinationPoolName: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/email/dedicated-ips/{Ip}/pool" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutDedicatedIpInPoolRequest",
}) as any as S.Schema<PutDedicatedIpInPoolRequest>;
export interface PutDedicatedIpInPoolResponse {}
export const PutDedicatedIpInPoolResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutDedicatedIpInPoolResponse",
}) as any as S.Schema<PutDedicatedIpInPoolResponse>;
export interface PutDedicatedIpWarmupAttributesRequest {
  Ip: string;
  WarmupPercentage: number;
}
export const PutDedicatedIpWarmupAttributesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Ip: S.String.pipe(T.HttpLabel("Ip")),
      WarmupPercentage: S.Number,
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/email/dedicated-ips/{Ip}/warmup" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutDedicatedIpWarmupAttributesRequest",
}) as any as S.Schema<PutDedicatedIpWarmupAttributesRequest>;
export interface PutDedicatedIpWarmupAttributesResponse {}
export const PutDedicatedIpWarmupAttributesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutDedicatedIpWarmupAttributesResponse",
}) as any as S.Schema<PutDedicatedIpWarmupAttributesResponse>;
export interface PutDeliverabilityDashboardOptionRequest {
  DashboardEnabled: boolean;
  SubscribedDomains?: DomainDeliverabilityTrackingOption[];
}
export const PutDeliverabilityDashboardOptionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DashboardEnabled: S.Boolean,
      SubscribedDomains: S.optional(DomainDeliverabilityTrackingOptions),
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/email/deliverability-dashboard" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutDeliverabilityDashboardOptionRequest",
}) as any as S.Schema<PutDeliverabilityDashboardOptionRequest>;
export interface PutDeliverabilityDashboardOptionResponse {}
export const PutDeliverabilityDashboardOptionResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutDeliverabilityDashboardOptionResponse",
}) as any as S.Schema<PutDeliverabilityDashboardOptionResponse>;
export interface PutEmailIdentityDkimAttributesRequest {
  EmailIdentity: string;
  SigningEnabled?: boolean;
}
export const PutEmailIdentityDkimAttributesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
      SigningEnabled: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/email/identities/{EmailIdentity}/dkim",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutEmailIdentityDkimAttributesRequest",
}) as any as S.Schema<PutEmailIdentityDkimAttributesRequest>;
export interface PutEmailIdentityDkimAttributesResponse {}
export const PutEmailIdentityDkimAttributesResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "PutEmailIdentityDkimAttributesResponse",
}) as any as S.Schema<PutEmailIdentityDkimAttributesResponse>;
export interface PutEmailIdentityFeedbackAttributesRequest {
  EmailIdentity: string;
  EmailForwardingEnabled?: boolean;
}
export const PutEmailIdentityFeedbackAttributesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
      EmailForwardingEnabled: S.optional(S.Boolean),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/email/identities/{EmailIdentity}/feedback",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutEmailIdentityFeedbackAttributesRequest",
  }) as any as S.Schema<PutEmailIdentityFeedbackAttributesRequest>;
export interface PutEmailIdentityFeedbackAttributesResponse {}
export const PutEmailIdentityFeedbackAttributesResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutEmailIdentityFeedbackAttributesResponse",
  }) as any as S.Schema<PutEmailIdentityFeedbackAttributesResponse>;
export interface PutEmailIdentityMailFromAttributesRequest {
  EmailIdentity: string;
  MailFromDomain?: string;
  BehaviorOnMxFailure?: BehaviorOnMxFailure;
}
export const PutEmailIdentityMailFromAttributesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EmailIdentity: S.String.pipe(T.HttpLabel("EmailIdentity")),
      MailFromDomain: S.optional(S.String),
      BehaviorOnMxFailure: S.optional(BehaviorOnMxFailure),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/email/identities/{EmailIdentity}/mail-from",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "PutEmailIdentityMailFromAttributesRequest",
  }) as any as S.Schema<PutEmailIdentityMailFromAttributesRequest>;
export interface PutEmailIdentityMailFromAttributesResponse {}
export const PutEmailIdentityMailFromAttributesResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "PutEmailIdentityMailFromAttributesResponse",
  }) as any as S.Schema<PutEmailIdentityMailFromAttributesResponse>;
export type EmailAddressList = string[];
export const EmailAddressList = /*@__PURE__*/ S.Array(S.String);
export interface Destination {
  ToAddresses?: string[];
  CcAddresses?: string[];
  BccAddresses?: string[];
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ToAddresses: S.optional(EmailAddressList),
    CcAddresses: S.optional(EmailAddressList),
    BccAddresses: S.optional(EmailAddressList),
  }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export type MessageTagName = string;
export type MessageTagValue = string;
export interface MessageTag {
  Name: string;
  Value: string;
}
export const MessageTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({ identifier: "MessageTag" }) as any as S.Schema<MessageTag>;
export type MessageTagList = MessageTag[];
export const MessageTagList = /*@__PURE__*/ S.Array(MessageTag);
export interface SendEmailRequest {
  FromEmailAddress?: string;
  Destination: Destination;
  ReplyToAddresses?: string[];
  FeedbackForwardingEmailAddress?: string;
  Content: EmailContent;
  EmailTags?: MessageTag[];
  ConfigurationSetName?: string;
}
export const SendEmailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FromEmailAddress: S.optional(S.String),
    Destination: Destination,
    ReplyToAddresses: S.optional(EmailAddressList),
    FeedbackForwardingEmailAddress: S.optional(S.String),
    Content: EmailContent,
    EmailTags: S.optional(MessageTagList),
    ConfigurationSetName: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/email/outbound-emails" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendEmailRequest",
}) as any as S.Schema<SendEmailRequest>;
export type OutboundMessageId = string;
export interface SendEmailResponse {
  MessageId?: string;
}
export const SendEmailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.optional(S.String) }),
).annotate({
  identifier: "SendEmailResponse",
}) as any as S.Schema<SendEmailResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/email/tags" }),
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
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpQuery("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("TagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/email/tags" }),
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
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestinationName: string;
  EventDestination: EventDestinationDefinition;
}
export const UpdateConfigurationSetEventDestinationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String.pipe(T.HttpLabel("ConfigurationSetName")),
      EventDestinationName: S.String.pipe(T.HttpLabel("EventDestinationName")),
      EventDestination: EventDestinationDefinition,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/v1/email/configuration-sets/{ConfigurationSetName}/event-destinations/{EventDestinationName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateConfigurationSetEventDestinationRequest",
  }) as any as S.Schema<UpdateConfigurationSetEventDestinationRequest>;
export interface UpdateConfigurationSetEventDestinationResponse {}
export const UpdateConfigurationSetEventDestinationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateConfigurationSetEventDestinationResponse",
  }) as any as S.Schema<UpdateConfigurationSetEventDestinationResponse>;
export type ErrorMessage = string;
export type CreateConfigurationSetError =
  | AlreadyExistsException
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a configuration set. *Configuration sets* are groups of
 * rules that you can apply to the emails you send using Amazon Pinpoint. You apply a configuration
 * set to an email by including a reference to the configuration set in the headers of the
 * email. When you apply a configuration set to an email, all of the rules in that
 * configuration set are applied to the email.
 */
export const createConfigurationSet: API.OperationMethod<
  CreateConfigurationSetRequest,
  CreateConfigurationSetResponse,
  CreateConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationSetRequest,
  output: CreateConfigurationSetResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSet",
}));

export type CreateConfigurationSetEventDestinationError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create an event destination. In Amazon Pinpoint, *events* include message
 * sends, deliveries, opens, clicks, bounces, and complaints. Event
 * destinations are places that you can send information about these events
 * to. For example, you can send event data to Amazon SNS to receive notifications when you
 * receive bounces or complaints, or you can use Amazon Kinesis Data Firehose to stream data to Amazon S3 for long-term
 * storage.
 *
 * A single configuration set can include more than one event destination.
 */
export const createConfigurationSetEventDestination: API.OperationMethod<
  CreateConfigurationSetEventDestinationRequest,
  CreateConfigurationSetEventDestinationResponse,
  CreateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationSetEventDestinationRequest,
  output: CreateConfigurationSetEventDestinationResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSetEventDestination",
}));

export type CreateDedicatedIpPoolError =
  | AlreadyExistsException
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new pool of dedicated IP addresses. A pool can include one or more dedicated
 * IP addresses that are associated with your Amazon Pinpoint account. You can associate a pool with
 * a configuration set. When you send an email that uses that configuration set, Amazon Pinpoint
 * sends it using only the IP addresses in the associated pool.
 */
export const createDedicatedIpPool: API.OperationMethod<
  CreateDedicatedIpPoolRequest,
  CreateDedicatedIpPoolResponse,
  CreateDedicatedIpPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDedicatedIpPoolRequest,
  output: CreateDedicatedIpPoolResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDedicatedIpPool",
}));

export type CreateDeliverabilityTestReportError =
  | AccountSuspendedException
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | NotFoundException
  | SendingPausedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new predictive inbox placement test. Predictive inbox placement tests can help you predict how your messages will be handled
 * by various email providers around the world. When you perform a predictive inbox placement test, you provide a
 * sample message that contains the content that you plan to send to your customers. Amazon Pinpoint
 * then sends that message to special email addresses spread across several major email
 * providers. After about 24 hours, the test is complete, and you can use the
 * `GetDeliverabilityTestReport` operation to view the results of the
 * test.
 */
export const createDeliverabilityTestReport: API.OperationMethod<
  CreateDeliverabilityTestReportRequest,
  CreateDeliverabilityTestReportResponse,
  CreateDeliverabilityTestReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDeliverabilityTestReportRequest,
  output: CreateDeliverabilityTestReportResponse,
  errors: [
    AccountSuspendedException,
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    NotFoundException,
    SendingPausedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeliverabilityTestReport",
}));

export type CreateEmailIdentityError =
  | BadRequestException
  | ConcurrentModificationException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Verifies an email identity for use with Amazon Pinpoint. In Amazon Pinpoint, an identity is an email
 * address or domain that you use when you send email. Before you can use an identity to
 * send email with Amazon Pinpoint, you first have to verify it. By verifying an address, you
 * demonstrate that you're the owner of the address, and that you've given Amazon Pinpoint permission
 * to send email from the address.
 *
 * When you verify an email address, Amazon Pinpoint sends an email to the address. Your email
 * address is verified as soon as you follow the link in the verification email.
 *
 * When you verify a domain, this operation provides a set of DKIM tokens, which you can
 * convert into CNAME tokens. You add these CNAME tokens to the DNS configuration for your
 * domain. Your domain is verified when Amazon Pinpoint detects these records in the DNS
 * configuration for your domain. It usually takes around 72 hours to complete the domain
 * verification process.
 */
export const createEmailIdentity: API.OperationMethod<
  CreateEmailIdentityRequest,
  CreateEmailIdentityResponse,
  CreateEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEmailIdentityRequest,
  output: CreateEmailIdentityResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEmailIdentity",
}));

export type DeleteConfigurationSetError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an existing configuration set.
 *
 * In Amazon Pinpoint, *configuration sets* are groups of rules that you can
 * apply to the emails you send. You apply a configuration set to an email by including a
 * reference to the configuration set in the headers of the email. When you apply a
 * configuration set to an email, all of the rules in that configuration set are applied to
 * the email.
 */
export const deleteConfigurationSet: API.OperationMethod<
  DeleteConfigurationSetRequest,
  DeleteConfigurationSetResponse,
  DeleteConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationSetRequest,
  output: DeleteConfigurationSetResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
}));

export type DeleteConfigurationSetEventDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an event destination.
 *
 * In Amazon Pinpoint, *events* include message sends, deliveries, opens,
 * clicks, bounces, and complaints. *Event destinations* are places that
 * you can send information about these events to. For example, you can send event data to
 * Amazon SNS to receive notifications when you receive bounces or complaints, or you can use
 * Amazon Kinesis Data Firehose to stream data to Amazon S3 for long-term storage.
 */
export const deleteConfigurationSetEventDestination: API.OperationMethod<
  DeleteConfigurationSetEventDestinationRequest,
  DeleteConfigurationSetEventDestinationResponse,
  DeleteConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationSetEventDestinationRequest,
  output: DeleteConfigurationSetEventDestinationResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetEventDestination",
}));

export type DeleteDedicatedIpPoolError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a dedicated IP pool.
 */
export const deleteDedicatedIpPool: API.OperationMethod<
  DeleteDedicatedIpPoolRequest,
  DeleteDedicatedIpPoolResponse,
  DeleteDedicatedIpPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDedicatedIpPoolRequest,
  output: DeleteDedicatedIpPoolResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDedicatedIpPool",
}));

export type DeleteEmailIdentityError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an email identity that you previously verified for use with Amazon Pinpoint. An identity
 * can be either an email address or a domain name.
 */
export const deleteEmailIdentity: API.OperationMethod<
  DeleteEmailIdentityRequest,
  DeleteEmailIdentityResponse,
  DeleteEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEmailIdentityRequest,
  output: DeleteEmailIdentityResponse,
  errors: [
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailIdentity",
}));

export type GetAccountError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Obtain information about the email-sending status and capabilities of your Amazon Pinpoint
 * account in the current AWS Region.
 */
export const getAccount: API.OperationMethod<
  GetAccountRequest,
  GetAccountResponse,
  GetAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountRequest,
  output: GetAccountResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccount",
}));

export type GetBlacklistReportsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a list of the blacklists that your dedicated IP addresses appear on.
 */
export const getBlacklistReports: API.OperationMethod<
  GetBlacklistReportsRequest,
  GetBlacklistReportsResponse,
  GetBlacklistReportsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBlacklistReportsRequest,
  output: GetBlacklistReportsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBlacklistReports",
}));

export type GetConfigurationSetError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get information about an existing configuration set, including the dedicated IP pool
 * that it's associated with, whether or not it's enabled for sending email, and
 * more.
 *
 * In Amazon Pinpoint, *configuration sets* are groups of rules that you can
 * apply to the emails you send. You apply a configuration set to an email by including a
 * reference to the configuration set in the headers of the email. When you apply a
 * configuration set to an email, all of the rules in that configuration set are applied to
 * the email.
 */
export const getConfigurationSet: API.OperationMethod<
  GetConfigurationSetRequest,
  GetConfigurationSetResponse,
  GetConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationSetRequest,
  output: GetConfigurationSetResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSet",
}));

export type GetConfigurationSetEventDestinationsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a list of event destinations that are associated with a configuration
 * set.
 *
 * In Amazon Pinpoint, *events* include message sends, deliveries, opens,
 * clicks, bounces, and complaints. *Event destinations* are places that
 * you can send information about these events to. For example, you can send event data to
 * Amazon SNS to receive notifications when you receive bounces or complaints, or you can use
 * Amazon Kinesis Data Firehose to stream data to Amazon S3 for long-term storage.
 */
export const getConfigurationSetEventDestinations: API.OperationMethod<
  GetConfigurationSetEventDestinationsRequest,
  GetConfigurationSetEventDestinationsResponse,
  GetConfigurationSetEventDestinationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetConfigurationSetEventDestinationsRequest,
  output: GetConfigurationSetEventDestinationsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConfigurationSetEventDestinations",
}));

export type GetDedicatedIpError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get information about a dedicated IP address, including the name of the dedicated IP
 * pool that it's associated with, as well information about the automatic warm-up process
 * for the address.
 */
export const getDedicatedIp: API.OperationMethod<
  GetDedicatedIpRequest,
  GetDedicatedIpResponse,
  GetDedicatedIpError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDedicatedIpRequest,
  output: GetDedicatedIpResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIp",
}));

export type GetDedicatedIpsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the dedicated IP addresses that are associated with your Amazon Pinpoint
 * account.
 */
export const getDedicatedIps: API.PaginatedOperationMethod<
  GetDedicatedIpsRequest,
  GetDedicatedIpsResponse,
  GetDedicatedIpsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetDedicatedIpsRequest,
  output: GetDedicatedIpsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDedicatedIps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type GetDeliverabilityDashboardOptionsError =
  | BadRequestException
  | LimitExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve information about the status of the Deliverability dashboard for your Amazon Pinpoint account.
 * When the Deliverability dashboard is enabled, you gain access to reputation, deliverability, and
 * other metrics for the domains that you use to send email using Amazon Pinpoint. You also gain the
 * ability to perform predictive inbox placement tests.
 *
 * When you use the Deliverability dashboard, you pay a monthly subscription charge, in addition
 * to any other fees that you accrue by using Amazon Pinpoint. For more information about the
 * features and cost of a Deliverability dashboard subscription, see Amazon Pinpoint Pricing.
 */
export const getDeliverabilityDashboardOptions: API.OperationMethod<
  GetDeliverabilityDashboardOptionsRequest,
  GetDeliverabilityDashboardOptionsResponse,
  GetDeliverabilityDashboardOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeliverabilityDashboardOptionsRequest,
  output: GetDeliverabilityDashboardOptionsResponse,
  errors: [
    BadRequestException,
    LimitExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliverabilityDashboardOptions",
}));

export type GetDeliverabilityTestReportError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the results of a predictive inbox placement test.
 */
export const getDeliverabilityTestReport: API.OperationMethod<
  GetDeliverabilityTestReportRequest,
  GetDeliverabilityTestReportResponse,
  GetDeliverabilityTestReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDeliverabilityTestReportRequest,
  output: GetDeliverabilityTestReportResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeliverabilityTestReport",
}));

export type GetDomainDeliverabilityCampaignError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve all the deliverability data for a specific campaign. This data is available
 * for a campaign only if the campaign sent email by using a domain that the
 * Deliverability dashboard is enabled for (`PutDeliverabilityDashboardOption`
 * operation).
 */
export const getDomainDeliverabilityCampaign: API.OperationMethod<
  GetDomainDeliverabilityCampaignRequest,
  GetDomainDeliverabilityCampaignResponse,
  GetDomainDeliverabilityCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainDeliverabilityCampaignRequest,
  output: GetDomainDeliverabilityCampaignResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainDeliverabilityCampaign",
}));

export type GetDomainStatisticsReportError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve inbox placement and engagement rates for the domains that you use to send
 * email.
 */
export const getDomainStatisticsReport: API.OperationMethod<
  GetDomainStatisticsReportRequest,
  GetDomainStatisticsReportResponse,
  GetDomainStatisticsReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDomainStatisticsReportRequest,
  output: GetDomainStatisticsReportResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainStatisticsReport",
}));

export type GetEmailIdentityError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about a specific identity associated with your Amazon Pinpoint account,
 * including the identity's verification status, its DKIM authentication status, and its
 * custom Mail-From settings.
 */
export const getEmailIdentity: API.OperationMethod<
  GetEmailIdentityRequest,
  GetEmailIdentityResponse,
  GetEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEmailIdentityRequest,
  output: GetEmailIdentityResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailIdentity",
}));

export type ListConfigurationSetsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all of the configuration sets associated with your Amazon Pinpoint account in the current
 * region.
 *
 * In Amazon Pinpoint, *configuration sets* are groups of rules that you can
 * apply to the emails you send. You apply a configuration set to an email by including a
 * reference to the configuration set in the headers of the email. When you apply a
 * configuration set to an email, all of the rules in that configuration set are applied to
 * the email.
 */
export const listConfigurationSets: API.PaginatedOperationMethod<
  ListConfigurationSetsRequest,
  ListConfigurationSetsResponse,
  ListConfigurationSetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListConfigurationSetsRequest,
  output: ListConfigurationSetsResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationSets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListDedicatedIpPoolsError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all of the dedicated IP pools that exist in your Amazon Pinpoint account in the current
 * AWS Region.
 */
export const listDedicatedIpPools: API.PaginatedOperationMethod<
  ListDedicatedIpPoolsRequest,
  ListDedicatedIpPoolsResponse,
  ListDedicatedIpPoolsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDedicatedIpPoolsRequest,
  output: ListDedicatedIpPoolsResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDedicatedIpPools",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListDeliverabilityTestReportsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Show a list of the predictive inbox placement tests that you've performed, regardless of their statuses. For
 * predictive inbox placement tests that are complete, you can use the `GetDeliverabilityTestReport`
 * operation to view the results.
 */
export const listDeliverabilityTestReports: API.PaginatedOperationMethod<
  ListDeliverabilityTestReportsRequest,
  ListDeliverabilityTestReportsResponse,
  ListDeliverabilityTestReportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDeliverabilityTestReportsRequest,
  output: ListDeliverabilityTestReportsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeliverabilityTestReports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListDomainDeliverabilityCampaignsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve deliverability data for all the campaigns that used a specific domain to send
 * email during a specified time range. This data is available for a domain only if you
 * enabled the Deliverability dashboard (`PutDeliverabilityDashboardOption` operation)
 * for the domain.
 */
export const listDomainDeliverabilityCampaigns: API.PaginatedOperationMethod<
  ListDomainDeliverabilityCampaignsRequest,
  ListDomainDeliverabilityCampaignsResponse,
  ListDomainDeliverabilityCampaignsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainDeliverabilityCampaignsRequest,
  output: ListDomainDeliverabilityCampaignsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainDeliverabilityCampaigns",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListEmailIdentitiesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of all of the email identities that are associated with your Amazon Pinpoint
 * account. An identity can be either an email address or a domain. This operation returns
 * identities that are verified as well as those that aren't.
 */
export const listEmailIdentities: API.PaginatedOperationMethod<
  ListEmailIdentitiesRequest,
  ListEmailIdentitiesResponse,
  ListEmailIdentitiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEmailIdentitiesRequest,
  output: ListEmailIdentitiesResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEmailIdentities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "PageSize",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a list of the tags (keys and values) that are associated with a specified
 * resource. A *tag* is a label that you optionally define and associate
 * with a resource in Amazon Pinpoint. Each tag consists of a required tag
 * key and an optional associated *tag value*. A tag key
 * is a general label that acts as a category for more specific tag values. A tag value
 * acts as a descriptor within a tag key.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutAccountDedicatedIpWarmupAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable the automatic warm-up feature for dedicated IP addresses.
 */
export const putAccountDedicatedIpWarmupAttributes: API.OperationMethod<
  PutAccountDedicatedIpWarmupAttributesRequest,
  PutAccountDedicatedIpWarmupAttributesResponse,
  PutAccountDedicatedIpWarmupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountDedicatedIpWarmupAttributesRequest,
  output: PutAccountDedicatedIpWarmupAttributesResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountDedicatedIpWarmupAttributes",
}));

export type PutAccountSendingAttributesError =
  | BadRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable the ability of your account to send email.
 */
export const putAccountSendingAttributes: API.OperationMethod<
  PutAccountSendingAttributesRequest,
  PutAccountSendingAttributesResponse,
  PutAccountSendingAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutAccountSendingAttributesRequest,
  output: PutAccountSendingAttributesResponse,
  errors: [BadRequestException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountSendingAttributes",
}));

export type PutConfigurationSetDeliveryOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associate a configuration set with a dedicated IP pool. You can use dedicated IP pools
 * to create groups of dedicated IP addresses for sending specific types of email.
 */
export const putConfigurationSetDeliveryOptions: API.OperationMethod<
  PutConfigurationSetDeliveryOptionsRequest,
  PutConfigurationSetDeliveryOptionsResponse,
  PutConfigurationSetDeliveryOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationSetDeliveryOptionsRequest,
  output: PutConfigurationSetDeliveryOptionsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetDeliveryOptions",
}));

export type PutConfigurationSetReputationOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable collection of reputation metrics for emails that you send using a
 * particular configuration set in a specific AWS Region.
 */
export const putConfigurationSetReputationOptions: API.OperationMethod<
  PutConfigurationSetReputationOptionsRequest,
  PutConfigurationSetReputationOptionsResponse,
  PutConfigurationSetReputationOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationSetReputationOptionsRequest,
  output: PutConfigurationSetReputationOptionsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetReputationOptions",
}));

export type PutConfigurationSetSendingOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable email sending for messages that use a particular configuration set
 * in a specific AWS Region.
 */
export const putConfigurationSetSendingOptions: API.OperationMethod<
  PutConfigurationSetSendingOptionsRequest,
  PutConfigurationSetSendingOptionsResponse,
  PutConfigurationSetSendingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationSetSendingOptionsRequest,
  output: PutConfigurationSetSendingOptionsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetSendingOptions",
}));

export type PutConfigurationSetTrackingOptionsError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Specify a custom domain to use for open and click tracking elements in email that you
 * send using Amazon Pinpoint.
 */
export const putConfigurationSetTrackingOptions: API.OperationMethod<
  PutConfigurationSetTrackingOptionsRequest,
  PutConfigurationSetTrackingOptionsResponse,
  PutConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationSetTrackingOptionsRequest,
  output: PutConfigurationSetTrackingOptionsResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetTrackingOptions",
}));

export type PutDedicatedIpInPoolError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Move a dedicated IP address to an existing dedicated IP pool.
 *
 * The dedicated IP address that you specify must already exist, and must be
 * associated with your Amazon Pinpoint account.
 *
 * The dedicated IP pool you specify must already exist. You can create a new pool by
 * using the `CreateDedicatedIpPool` operation.
 */
export const putDedicatedIpInPool: API.OperationMethod<
  PutDedicatedIpInPoolRequest,
  PutDedicatedIpInPoolResponse,
  PutDedicatedIpInPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDedicatedIpInPoolRequest,
  output: PutDedicatedIpInPoolResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpInPool",
}));

export type PutDedicatedIpWarmupAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 *
 */
export const putDedicatedIpWarmupAttributes: API.OperationMethod<
  PutDedicatedIpWarmupAttributesRequest,
  PutDedicatedIpWarmupAttributesResponse,
  PutDedicatedIpWarmupAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDedicatedIpWarmupAttributesRequest,
  output: PutDedicatedIpWarmupAttributesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDedicatedIpWarmupAttributes",
}));

export type PutDeliverabilityDashboardOptionError =
  | AlreadyExistsException
  | BadRequestException
  | LimitExceededException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enable or disable the Deliverability dashboard for your Amazon Pinpoint account. When you enable the
 * Deliverability dashboard, you gain access to reputation, deliverability, and other metrics for
 * the domains that you use to send email using Amazon Pinpoint. You also gain the ability to perform
 * predictive inbox placement tests.
 *
 * When you use the Deliverability dashboard, you pay a monthly subscription charge, in addition
 * to any other fees that you accrue by using Amazon Pinpoint. For more information about the
 * features and cost of a Deliverability dashboard subscription, see Amazon Pinpoint Pricing.
 */
export const putDeliverabilityDashboardOption: API.OperationMethod<
  PutDeliverabilityDashboardOptionRequest,
  PutDeliverabilityDashboardOptionResponse,
  PutDeliverabilityDashboardOptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutDeliverabilityDashboardOptionRequest,
  output: PutDeliverabilityDashboardOptionResponse,
  errors: [
    AlreadyExistsException,
    BadRequestException,
    LimitExceededException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutDeliverabilityDashboardOption",
}));

export type PutEmailIdentityDkimAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to enable or disable DKIM authentication for an email identity.
 */
export const putEmailIdentityDkimAttributes: API.OperationMethod<
  PutEmailIdentityDkimAttributesRequest,
  PutEmailIdentityDkimAttributesResponse,
  PutEmailIdentityDkimAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEmailIdentityDkimAttributesRequest,
  output: PutEmailIdentityDkimAttributesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityDkimAttributes",
}));

export type PutEmailIdentityFeedbackAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to enable or disable feedback forwarding for an identity. This setting determines
 * what happens when an identity is used to send an email that results in a bounce or
 * complaint event.
 *
 * When you enable feedback forwarding, Amazon Pinpoint sends you email notifications when bounce
 * or complaint events occur. Amazon Pinpoint sends this notification to the address that you
 * specified in the Return-Path header of the original email.
 *
 * When you disable feedback forwarding, Amazon Pinpoint sends notifications through other
 * mechanisms, such as by notifying an Amazon SNS topic. You're required to have a method of
 * tracking bounces and complaints. If you haven't set up another mechanism for receiving
 * bounce or complaint notifications, Amazon Pinpoint sends an email notification when these events
 * occur (even if this setting is disabled).
 */
export const putEmailIdentityFeedbackAttributes: API.OperationMethod<
  PutEmailIdentityFeedbackAttributesRequest,
  PutEmailIdentityFeedbackAttributesResponse,
  PutEmailIdentityFeedbackAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEmailIdentityFeedbackAttributesRequest,
  output: PutEmailIdentityFeedbackAttributesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityFeedbackAttributes",
}));

export type PutEmailIdentityMailFromAttributesError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Used to enable or disable the custom Mail-From domain configuration for an email
 * identity.
 */
export const putEmailIdentityMailFromAttributes: API.OperationMethod<
  PutEmailIdentityMailFromAttributesRequest,
  PutEmailIdentityMailFromAttributesResponse,
  PutEmailIdentityMailFromAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEmailIdentityMailFromAttributesRequest,
  output: PutEmailIdentityMailFromAttributesResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEmailIdentityMailFromAttributes",
}));

export type SendEmailError =
  | AccountSuspendedException
  | BadRequestException
  | LimitExceededException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | NotFoundException
  | SendingPausedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Sends an email message. You can use the Amazon Pinpoint Email API to send two types of
 * messages:
 *
 * - **Simple** – A standard email message. When
 * you create this type of message, you specify the sender, the recipient, and the
 * message body, and Amazon Pinpoint assembles the message for you.
 *
 * - **Raw** – A raw, MIME-formatted email
 * message. When you send this type of email, you have to specify all of the
 * message headers, as well as the message body. You can use this message type to
 * send messages that contain attachments. The message that you specify has to be a
 * valid MIME message.
 */
export const sendEmail: API.OperationMethod<
  SendEmailRequest,
  SendEmailResponse,
  SendEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendEmailRequest,
  output: SendEmailResponse,
  errors: [
    AccountSuspendedException,
    BadRequestException,
    LimitExceededException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    NotFoundException,
    SendingPausedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendEmail",
}));

export type TagResourceError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Add one or more tags (keys and values) to a specified resource. A
 * *tag* is a label that you optionally define and associate with a
 * resource in Amazon Pinpoint. Tags can help you categorize and manage resources in different ways,
 * such as by purpose, owner, environment, or other criteria. A resource can have as many
 * as 50 tags.
 *
 * Each tag consists of a required *tag key* and an
 * associated *tag value*, both of which you define. A tag key is a
 * general label that acts as a category for more specific tag values. A tag value acts as
 * a descriptor within a tag key.
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
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ConcurrentModificationException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Remove one or more tags (keys and values) from a specified resource.
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
    BadRequestException,
    ConcurrentModificationException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateConfigurationSetEventDestinationError =
  | BadRequestException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update the configuration of an event destination for a configuration set.
 *
 * In Amazon Pinpoint, *events* include message sends, deliveries, opens,
 * clicks, bounces, and complaints. *Event destinations* are places that
 * you can send information about these events to. For example, you can send event data to
 * Amazon SNS to receive notifications when you receive bounces or complaints, or you can use
 * Amazon Kinesis Data Firehose to stream data to Amazon S3 for long-term storage.
 */
export const updateConfigurationSetEventDestination: API.OperationMethod<
  UpdateConfigurationSetEventDestinationRequest,
  UpdateConfigurationSetEventDestinationResponse,
  UpdateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationSetEventDestinationRequest,
  output: UpdateConfigurationSetEventDestinationResponse,
  errors: [BadRequestException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetEventDestination",
}));
