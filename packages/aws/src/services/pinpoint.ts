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
  sdkId: "Pinpoint",
  serviceShapeName: "Pinpoint",
});
const auth = T.AwsAuthSigv4({ name: "mobiletargeting" });
const ver = T.ServiceVersion("2016-12-01");
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
              `https://pinpoint-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://pinpoint-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://pinpoint.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if (Region === "us-east-1") {
          return e("https://pinpoint.us-east-1.amazonaws.com");
        }
        if (Region === "us-west-2") {
          return e("https://pinpoint.us-west-2.amazonaws.com");
        }
        if (Region === "us-gov-west-1") {
          return e("https://pinpoint.us-gov-west-1.amazonaws.com");
        }
        if ("aws" === _.getAttr(PartitionResult, "name")) {
          return e(`https://pinpoint.${Region}.amazonaws.com`);
        }
        if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
          return e(`https://pinpoint.${Region}.amazonaws.com`);
        }
        return e(
          `https://pinpoint.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestID: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestID: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestID: S.optional(S.String),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestID: S.optional(S.String),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class MethodNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<MethodNotAllowedException>()(
    "MethodNotAllowedException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestID: S.optional(S.String),
    },
    T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestID: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class PayloadTooLargeException
  extends /*@__PURE__*/ S.TaggedError<PayloadTooLargeException>()(
    "PayloadTooLargeException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestID: S.optional(S.String),
    },
    T.HttpError(413),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestID: S.optional(S.String),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export type MapOf__string = { [key: string]: string | undefined };
export const MapOf__string = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateApplicationRequest {
  Name?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateApplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), tags: S.optional(MapOf__string) }),
).annotate({
  identifier: "CreateApplicationRequest",
}) as any as S.Schema<CreateApplicationRequest>;
export interface CreateAppRequest {
  CreateApplicationRequest?: CreateApplicationRequest;
}
export const CreateAppRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateApplicationRequest: S.optional(CreateApplicationRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CreateApplicationRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/apps" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateAppRequest",
}) as any as S.Schema<CreateAppRequest>;
export interface ApplicationResponse {
  Arn?: string;
  Id?: string;
  Name?: string;
  tags?: { [key: string]: string | undefined };
  CreationDate?: string;
}
export const ApplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    tags: S.optional(MapOf__string),
    CreationDate: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationResponse",
}) as any as S.Schema<ApplicationResponse>;
export interface CreateAppResponse {
  ApplicationResponse: ApplicationResponse & {
    Arn: string;
    Id: string;
    Name: string;
  };
}
export const CreateAppResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationResponse: S.optional(ApplicationResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ApplicationResponse" }),
  }),
).annotate({
  identifier: "CreateAppResponse",
}) as any as S.Schema<CreateAppResponse>;
export type __EndpointTypesElement =
  | "PUSH"
  | "GCM"
  | "APNS"
  | "APNS_SANDBOX"
  | "APNS_VOIP"
  | "APNS_VOIP_SANDBOX"
  | "ADM"
  | "SMS"
  | "VOICE"
  | "EMAIL"
  | "BAIDU"
  | "CUSTOM"
  | "IN_APP"
  | (string & {});
export const __EndpointTypesElement = S.String;

export type ListOf__EndpointTypesElement = __EndpointTypesElement[];
export const ListOf__EndpointTypesElement = /*@__PURE__*/ S.Array(
  __EndpointTypesElement,
);
export interface CustomDeliveryConfiguration {
  DeliveryUri?: string;
  EndpointTypes?: __EndpointTypesElement[];
}
export const CustomDeliveryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliveryUri: S.optional(S.String),
    EndpointTypes: S.optional(ListOf__EndpointTypesElement),
  }),
).annotate({
  identifier: "CustomDeliveryConfiguration",
}) as any as S.Schema<CustomDeliveryConfiguration>;
export type Action = "OPEN_APP" | "DEEP_LINK" | "URL" | (string & {});
export const Action = S.String;

export interface Message {
  Action?: Action;
  Body?: string;
  ImageIconUrl?: string;
  ImageSmallIconUrl?: string;
  ImageUrl?: string;
  JsonBody?: string;
  MediaUrl?: string;
  RawContent?: string;
  SilentPush?: boolean;
  TimeToLive?: number;
  Title?: string;
  Url?: string;
}
export const Message = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Body: S.optional(S.String),
    ImageIconUrl: S.optional(S.String),
    ImageSmallIconUrl: S.optional(S.String),
    ImageUrl: S.optional(S.String),
    JsonBody: S.optional(S.String),
    MediaUrl: S.optional(S.String),
    RawContent: S.optional(S.String),
    SilentPush: S.optional(S.Boolean),
    TimeToLive: S.optional(S.Number),
    Title: S.optional(S.String),
    Url: S.optional(S.String),
  }),
).annotate({ identifier: "Message" }) as any as S.Schema<Message>;
export interface CampaignCustomMessage {
  Data?: string;
}
export const CampaignCustomMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Data: S.optional(S.String) }),
).annotate({
  identifier: "CampaignCustomMessage",
}) as any as S.Schema<CampaignCustomMessage>;
export interface MessageHeader {
  Name?: string;
  Value?: string;
}
export const MessageHeader = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
).annotate({ identifier: "MessageHeader" }) as any as S.Schema<MessageHeader>;
export type ListOfMessageHeader = MessageHeader[];
export const ListOfMessageHeader = /*@__PURE__*/ S.Array(MessageHeader);
export interface CampaignEmailMessage {
  Body?: string;
  FromAddress?: string;
  Headers?: MessageHeader[];
  HtmlBody?: string;
  Title?: string;
}
export const CampaignEmailMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    FromAddress: S.optional(S.String),
    Headers: S.optional(ListOfMessageHeader),
    HtmlBody: S.optional(S.String),
    Title: S.optional(S.String),
  }),
).annotate({
  identifier: "CampaignEmailMessage",
}) as any as S.Schema<CampaignEmailMessage>;
export type MessageType = "TRANSACTIONAL" | "PROMOTIONAL" | (string & {});
export const MessageType = S.String;

export interface CampaignSmsMessage {
  Body?: string;
  MessageType?: MessageType;
  OriginationNumber?: string;
  SenderId?: string;
  EntityId?: string;
  TemplateId?: string;
}
export const CampaignSmsMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    MessageType: S.optional(MessageType),
    OriginationNumber: S.optional(S.String),
    SenderId: S.optional(S.String),
    EntityId: S.optional(S.String),
    TemplateId: S.optional(S.String),
  }),
).annotate({
  identifier: "CampaignSmsMessage",
}) as any as S.Schema<CampaignSmsMessage>;
export type Alignment = "LEFT" | "CENTER" | "RIGHT" | (string & {});
export const Alignment = S.String;

export interface InAppMessageBodyConfig {
  Alignment?: Alignment;
  Body?: string;
  TextColor?: string;
}
export const InAppMessageBodyConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Alignment: S.optional(Alignment),
    Body: S.optional(S.String),
    TextColor: S.optional(S.String),
  }),
).annotate({
  identifier: "InAppMessageBodyConfig",
}) as any as S.Schema<InAppMessageBodyConfig>;
export interface InAppMessageHeaderConfig {
  Alignment?: Alignment;
  Header?: string;
  TextColor?: string;
}
export const InAppMessageHeaderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Alignment: S.optional(Alignment),
    Header: S.optional(S.String),
    TextColor: S.optional(S.String),
  }),
).annotate({
  identifier: "InAppMessageHeaderConfig",
}) as any as S.Schema<InAppMessageHeaderConfig>;
export type ButtonAction = "LINK" | "DEEP_LINK" | "CLOSE" | (string & {});
export const ButtonAction = S.String;

export interface OverrideButtonConfiguration {
  ButtonAction?: ButtonAction;
  Link?: string;
}
export const OverrideButtonConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ButtonAction: S.optional(ButtonAction),
    Link: S.optional(S.String),
  }),
).annotate({
  identifier: "OverrideButtonConfiguration",
}) as any as S.Schema<OverrideButtonConfiguration>;
export interface DefaultButtonConfiguration {
  BackgroundColor?: string;
  BorderRadius?: number;
  ButtonAction?: ButtonAction;
  Link?: string;
  Text?: string;
  TextColor?: string;
}
export const DefaultButtonConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackgroundColor: S.optional(S.String),
    BorderRadius: S.optional(S.Number),
    ButtonAction: S.optional(ButtonAction),
    Link: S.optional(S.String),
    Text: S.optional(S.String),
    TextColor: S.optional(S.String),
  }),
).annotate({
  identifier: "DefaultButtonConfiguration",
}) as any as S.Schema<DefaultButtonConfiguration>;
export interface InAppMessageButton {
  Android?: OverrideButtonConfiguration;
  DefaultConfig?: DefaultButtonConfiguration;
  IOS?: OverrideButtonConfiguration;
  Web?: OverrideButtonConfiguration;
}
export const InAppMessageButton = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Android: S.optional(OverrideButtonConfiguration),
    DefaultConfig: S.optional(DefaultButtonConfiguration),
    IOS: S.optional(OverrideButtonConfiguration),
    Web: S.optional(OverrideButtonConfiguration),
  }),
).annotate({
  identifier: "InAppMessageButton",
}) as any as S.Schema<InAppMessageButton>;
export interface InAppMessageContent {
  BackgroundColor?: string;
  BodyConfig?: InAppMessageBodyConfig;
  HeaderConfig?: InAppMessageHeaderConfig;
  ImageUrl?: string;
  PrimaryBtn?: InAppMessageButton;
  SecondaryBtn?: InAppMessageButton;
}
export const InAppMessageContent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BackgroundColor: S.optional(S.String),
    BodyConfig: S.optional(InAppMessageBodyConfig),
    HeaderConfig: S.optional(InAppMessageHeaderConfig),
    ImageUrl: S.optional(S.String),
    PrimaryBtn: S.optional(InAppMessageButton),
    SecondaryBtn: S.optional(InAppMessageButton),
  }),
).annotate({
  identifier: "InAppMessageContent",
}) as any as S.Schema<InAppMessageContent>;
export type ListOfInAppMessageContent = InAppMessageContent[];
export const ListOfInAppMessageContent =
  /*@__PURE__*/ S.Array(InAppMessageContent);
export type Layout =
  | "BOTTOM_BANNER"
  | "TOP_BANNER"
  | "OVERLAYS"
  | "MOBILE_FEED"
  | "MIDDLE_BANNER"
  | "CAROUSEL"
  | (string & {});
export const Layout = S.String;

export interface CampaignInAppMessage {
  Body?: string;
  Content?: InAppMessageContent[];
  CustomConfig?: { [key: string]: string | undefined };
  Layout?: Layout;
}
export const CampaignInAppMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    Content: S.optional(ListOfInAppMessageContent),
    CustomConfig: S.optional(MapOf__string),
    Layout: S.optional(Layout),
  }),
).annotate({
  identifier: "CampaignInAppMessage",
}) as any as S.Schema<CampaignInAppMessage>;
export interface MessageConfiguration {
  ADMMessage?: Message;
  APNSMessage?: Message;
  BaiduMessage?: Message;
  CustomMessage?: CampaignCustomMessage;
  DefaultMessage?: Message;
  EmailMessage?: CampaignEmailMessage;
  GCMMessage?: Message;
  SMSMessage?: CampaignSmsMessage;
  InAppMessage?: CampaignInAppMessage;
}
export const MessageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ADMMessage: S.optional(Message),
    APNSMessage: S.optional(Message),
    BaiduMessage: S.optional(Message),
    CustomMessage: S.optional(CampaignCustomMessage),
    DefaultMessage: S.optional(Message),
    EmailMessage: S.optional(CampaignEmailMessage),
    GCMMessage: S.optional(Message),
    SMSMessage: S.optional(CampaignSmsMessage),
    InAppMessage: S.optional(CampaignInAppMessage),
  }),
).annotate({
  identifier: "MessageConfiguration",
}) as any as S.Schema<MessageConfiguration>;
export type AttributeType =
  | "INCLUSIVE"
  | "EXCLUSIVE"
  | "CONTAINS"
  | "BEFORE"
  | "AFTER"
  | "ON"
  | "BETWEEN"
  | (string & {});
export const AttributeType = S.String;

export type ListOf__string = string[];
export const ListOf__string = /*@__PURE__*/ S.Array(S.String);
export interface AttributeDimension {
  AttributeType?: AttributeType;
  Values?: string[];
}
export const AttributeDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributeType: S.optional(AttributeType),
    Values: S.optional(ListOf__string),
  }),
).annotate({
  identifier: "AttributeDimension",
}) as any as S.Schema<AttributeDimension>;
export type MapOfAttributeDimension = {
  [key: string]: AttributeDimension | undefined;
};
export const MapOfAttributeDimension = /*@__PURE__*/ S.Record(
  S.String,
  AttributeDimension.pipe(S.optional),
);
export type DimensionType = "INCLUSIVE" | "EXCLUSIVE" | (string & {});
export const DimensionType = S.String;

export interface SetDimension {
  DimensionType?: DimensionType;
  Values?: string[];
}
export const SetDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DimensionType: S.optional(DimensionType),
    Values: S.optional(ListOf__string),
  }),
).annotate({ identifier: "SetDimension" }) as any as S.Schema<SetDimension>;
export interface MetricDimension {
  ComparisonOperator?: string;
  Value?: number;
}
export const MetricDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComparisonOperator: S.optional(S.String),
    Value: S.optional(S.Number),
  }),
).annotate({
  identifier: "MetricDimension",
}) as any as S.Schema<MetricDimension>;
export type MapOfMetricDimension = {
  [key: string]: MetricDimension | undefined;
};
export const MapOfMetricDimension = /*@__PURE__*/ S.Record(
  S.String,
  MetricDimension.pipe(S.optional),
);
export interface EventDimensions {
  Attributes?: { [key: string]: AttributeDimension | undefined };
  EventType?: SetDimension;
  Metrics?: { [key: string]: MetricDimension | undefined };
}
export const EventDimensions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(MapOfAttributeDimension),
    EventType: S.optional(SetDimension),
    Metrics: S.optional(MapOfMetricDimension),
  }),
).annotate({
  identifier: "EventDimensions",
}) as any as S.Schema<EventDimensions>;
export type FilterType = "SYSTEM" | "ENDPOINT" | (string & {});
export const FilterType = S.String;

export interface CampaignEventFilter {
  Dimensions?: EventDimensions;
  FilterType?: FilterType;
}
export const CampaignEventFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dimensions: S.optional(EventDimensions),
    FilterType: S.optional(FilterType),
  }),
).annotate({
  identifier: "CampaignEventFilter",
}) as any as S.Schema<CampaignEventFilter>;
export type Frequency =
  | "ONCE"
  | "HOURLY"
  | "DAILY"
  | "WEEKLY"
  | "MONTHLY"
  | "EVENT"
  | "IN_APP_EVENT"
  | (string & {});
export const Frequency = S.String;

export interface QuietTime {
  End?: string;
  Start?: string;
}
export const QuietTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ End: S.optional(S.String), Start: S.optional(S.String) }),
).annotate({ identifier: "QuietTime" }) as any as S.Schema<QuietTime>;
export interface Schedule {
  EndTime?: string;
  EventFilter?: CampaignEventFilter;
  Frequency?: Frequency;
  IsLocalTime?: boolean;
  QuietTime?: QuietTime;
  StartTime?: string;
  Timezone?: string;
}
export const Schedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndTime: S.optional(S.String),
    EventFilter: S.optional(CampaignEventFilter),
    Frequency: S.optional(Frequency),
    IsLocalTime: S.optional(S.Boolean),
    QuietTime: S.optional(QuietTime),
    StartTime: S.optional(S.String),
    Timezone: S.optional(S.String),
  }),
).annotate({ identifier: "Schedule" }) as any as S.Schema<Schedule>;
export interface Template {
  Name?: string;
  Version?: string;
}
export const Template = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Version: S.optional(S.String) }),
).annotate({ identifier: "Template" }) as any as S.Schema<Template>;
export interface TemplateConfiguration {
  EmailTemplate?: Template;
  PushTemplate?: Template;
  SMSTemplate?: Template;
  VoiceTemplate?: Template;
  InAppTemplate?: Template;
}
export const TemplateConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailTemplate: S.optional(Template),
    PushTemplate: S.optional(Template),
    SMSTemplate: S.optional(Template),
    VoiceTemplate: S.optional(Template),
    InAppTemplate: S.optional(Template),
  }),
).annotate({
  identifier: "TemplateConfiguration",
}) as any as S.Schema<TemplateConfiguration>;
export interface WriteTreatmentResource {
  CustomDeliveryConfiguration?: CustomDeliveryConfiguration;
  MessageConfiguration?: MessageConfiguration;
  Schedule?: Schedule;
  SizePercent?: number;
  TemplateConfiguration?: TemplateConfiguration;
  TreatmentDescription?: string;
  TreatmentName?: string;
}
export const WriteTreatmentResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomDeliveryConfiguration: S.optional(CustomDeliveryConfiguration),
    MessageConfiguration: S.optional(MessageConfiguration),
    Schedule: S.optional(Schedule),
    SizePercent: S.optional(S.Number),
    TemplateConfiguration: S.optional(TemplateConfiguration),
    TreatmentDescription: S.optional(S.String),
    TreatmentName: S.optional(S.String),
  }),
).annotate({
  identifier: "WriteTreatmentResource",
}) as any as S.Schema<WriteTreatmentResource>;
export type ListOfWriteTreatmentResource = WriteTreatmentResource[];
export const ListOfWriteTreatmentResource = /*@__PURE__*/ S.Array(
  WriteTreatmentResource,
);
export type Mode = "DELIVERY" | "FILTER" | (string & {});
export const Mode = S.String;

export interface CampaignHook {
  LambdaFunctionName?: string;
  Mode?: Mode;
  WebUrl?: string;
}
export const CampaignHook = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LambdaFunctionName: S.optional(S.String),
    Mode: S.optional(Mode),
    WebUrl: S.optional(S.String),
  }),
).annotate({ identifier: "CampaignHook" }) as any as S.Schema<CampaignHook>;
export interface CampaignLimits {
  Daily?: number;
  MaximumDuration?: number;
  MessagesPerSecond?: number;
  Total?: number;
  Session?: number;
}
export const CampaignLimits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Daily: S.optional(S.Number),
    MaximumDuration: S.optional(S.Number),
    MessagesPerSecond: S.optional(S.Number),
    Total: S.optional(S.Number),
    Session: S.optional(S.Number),
  }),
).annotate({ identifier: "CampaignLimits" }) as any as S.Schema<CampaignLimits>;
export interface WriteCampaignRequest {
  AdditionalTreatments?: WriteTreatmentResource[];
  CustomDeliveryConfiguration?: CustomDeliveryConfiguration;
  Description?: string;
  HoldoutPercent?: number;
  Hook?: CampaignHook;
  IsPaused?: boolean;
  Limits?: CampaignLimits;
  MessageConfiguration?: MessageConfiguration;
  Name?: string;
  Schedule?: Schedule;
  SegmentId?: string;
  SegmentVersion?: number;
  tags?: { [key: string]: string | undefined };
  TemplateConfiguration?: TemplateConfiguration;
  TreatmentDescription?: string;
  TreatmentName?: string;
  Priority?: number;
}
export const WriteCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdditionalTreatments: S.optional(ListOfWriteTreatmentResource),
    CustomDeliveryConfiguration: S.optional(CustomDeliveryConfiguration),
    Description: S.optional(S.String),
    HoldoutPercent: S.optional(S.Number),
    Hook: S.optional(CampaignHook),
    IsPaused: S.optional(S.Boolean),
    Limits: S.optional(CampaignLimits),
    MessageConfiguration: S.optional(MessageConfiguration),
    Name: S.optional(S.String),
    Schedule: S.optional(Schedule),
    SegmentId: S.optional(S.String),
    SegmentVersion: S.optional(S.Number),
    tags: S.optional(MapOf__string),
    TemplateConfiguration: S.optional(TemplateConfiguration),
    TreatmentDescription: S.optional(S.String),
    TreatmentName: S.optional(S.String),
    Priority: S.optional(S.Number),
  }),
).annotate({
  identifier: "WriteCampaignRequest",
}) as any as S.Schema<WriteCampaignRequest>;
export interface CreateCampaignRequest {
  ApplicationId: string;
  WriteCampaignRequest?: WriteCampaignRequest;
}
export const CreateCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    WriteCampaignRequest: S.optional(WriteCampaignRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "WriteCampaignRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/apps/{ApplicationId}/campaigns" }),
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
export type CampaignStatus =
  | "SCHEDULED"
  | "EXECUTING"
  | "PENDING_NEXT_RUN"
  | "COMPLETED"
  | "PAUSED"
  | "DELETED"
  | "INVALID"
  | (string & {});
export const CampaignStatus = S.String;

export interface CampaignState {
  CampaignStatus?: CampaignStatus;
}
export const CampaignState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CampaignStatus: S.optional(CampaignStatus) }),
).annotate({ identifier: "CampaignState" }) as any as S.Schema<CampaignState>;
export interface TreatmentResource {
  CustomDeliveryConfiguration?: CustomDeliveryConfiguration;
  Id?: string;
  MessageConfiguration?: MessageConfiguration;
  Schedule?: Schedule;
  SizePercent?: number;
  State?: CampaignState;
  TemplateConfiguration?: TemplateConfiguration;
  TreatmentDescription?: string;
  TreatmentName?: string;
}
export const TreatmentResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomDeliveryConfiguration: S.optional(CustomDeliveryConfiguration),
    Id: S.optional(S.String),
    MessageConfiguration: S.optional(MessageConfiguration),
    Schedule: S.optional(Schedule),
    SizePercent: S.optional(S.Number),
    State: S.optional(CampaignState),
    TemplateConfiguration: S.optional(TemplateConfiguration),
    TreatmentDescription: S.optional(S.String),
    TreatmentName: S.optional(S.String),
  }),
).annotate({
  identifier: "TreatmentResource",
}) as any as S.Schema<TreatmentResource>;
export type ListOfTreatmentResource = TreatmentResource[];
export const ListOfTreatmentResource = /*@__PURE__*/ S.Array(TreatmentResource);
export interface CampaignResponse {
  AdditionalTreatments?: TreatmentResource[];
  ApplicationId?: string;
  Arn?: string;
  CreationDate?: string;
  CustomDeliveryConfiguration?: CustomDeliveryConfiguration;
  DefaultState?: CampaignState;
  Description?: string;
  HoldoutPercent?: number;
  Hook?: CampaignHook;
  Id?: string;
  IsPaused?: boolean;
  LastModifiedDate?: string;
  Limits?: CampaignLimits;
  MessageConfiguration?: MessageConfiguration;
  Name?: string;
  Schedule?: Schedule;
  SegmentId?: string;
  SegmentVersion?: number;
  State?: CampaignState;
  tags?: { [key: string]: string | undefined };
  TemplateConfiguration?: TemplateConfiguration;
  TreatmentDescription?: string;
  TreatmentName?: string;
  Version?: number;
  Priority?: number;
}
export const CampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdditionalTreatments: S.optional(ListOfTreatmentResource),
    ApplicationId: S.optional(S.String),
    Arn: S.optional(S.String),
    CreationDate: S.optional(S.String),
    CustomDeliveryConfiguration: S.optional(CustomDeliveryConfiguration),
    DefaultState: S.optional(CampaignState),
    Description: S.optional(S.String),
    HoldoutPercent: S.optional(S.Number),
    Hook: S.optional(CampaignHook),
    Id: S.optional(S.String),
    IsPaused: S.optional(S.Boolean),
    LastModifiedDate: S.optional(S.String),
    Limits: S.optional(CampaignLimits),
    MessageConfiguration: S.optional(MessageConfiguration),
    Name: S.optional(S.String),
    Schedule: S.optional(Schedule),
    SegmentId: S.optional(S.String),
    SegmentVersion: S.optional(S.Number),
    State: S.optional(CampaignState),
    tags: S.optional(MapOf__string),
    TemplateConfiguration: S.optional(TemplateConfiguration),
    TreatmentDescription: S.optional(S.String),
    TreatmentName: S.optional(S.String),
    Version: S.optional(S.Number),
    Priority: S.optional(S.Number),
  }),
).annotate({
  identifier: "CampaignResponse",
}) as any as S.Schema<CampaignResponse>;
export interface CreateCampaignResponse {
  CampaignResponse: CampaignResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    SegmentId: string;
    SegmentVersion: number;
    AdditionalTreatments: (TreatmentResource & {
      Id: string;
      SizePercent: number;
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
    CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
      DeliveryUri: string;
    };
    MessageConfiguration: MessageConfiguration & {
      InAppMessage: CampaignInAppMessage & {
        Content: (InAppMessageContent & {
          BodyConfig: InAppMessageBodyConfig & {
            Alignment: Alignment;
            Body: string;
            TextColor: string;
          };
          HeaderConfig: InAppMessageHeaderConfig & {
            Alignment: Alignment;
            Header: string;
            TextColor: string;
          };
          PrimaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
          SecondaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
        })[];
      };
    };
    Schedule: Schedule & {
      StartTime: string;
      EventFilter: CampaignEventFilter & {
        Dimensions: EventDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          EventType: SetDimension & { Values: ListOf__string };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
        };
        FilterType: FilterType;
      };
    };
  };
}
export const CreateCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignResponse: S.optional(CampaignResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CampaignResponse" }),
  }),
).annotate({
  identifier: "CreateCampaignResponse",
}) as any as S.Schema<CreateCampaignResponse>;
export interface EmailTemplateRequest {
  DefaultSubstitutions?: string;
  HtmlPart?: string;
  RecommenderId?: string;
  Subject?: string;
  Headers?: MessageHeader[];
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TextPart?: string;
}
export const EmailTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultSubstitutions: S.optional(S.String),
    HtmlPart: S.optional(S.String),
    RecommenderId: S.optional(S.String),
    Subject: S.optional(S.String),
    Headers: S.optional(ListOfMessageHeader),
    tags: S.optional(MapOf__string),
    TemplateDescription: S.optional(S.String),
    TextPart: S.optional(S.String),
  }),
).annotate({
  identifier: "EmailTemplateRequest",
}) as any as S.Schema<EmailTemplateRequest>;
export interface CreateEmailTemplateRequest {
  EmailTemplateRequest?: EmailTemplateRequest;
  TemplateName: string;
}
export const CreateEmailTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailTemplateRequest: S.optional(EmailTemplateRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EmailTemplateRequest" }),
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/templates/{TemplateName}/email" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEmailTemplateRequest",
}) as any as S.Schema<CreateEmailTemplateRequest>;
export interface CreateTemplateMessageBody {
  Arn?: string;
  Message?: string;
  RequestID?: string;
}
export const CreateTemplateMessageBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Message: S.optional(S.String),
    RequestID: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateTemplateMessageBody",
}) as any as S.Schema<CreateTemplateMessageBody>;
export interface CreateEmailTemplateResponse {
  CreateTemplateMessageBody: CreateTemplateMessageBody;
}
export const CreateEmailTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateTemplateMessageBody: S.optional(CreateTemplateMessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CreateTemplateMessageBody" }),
  }),
).annotate({
  identifier: "CreateEmailTemplateResponse",
}) as any as S.Schema<CreateEmailTemplateResponse>;
export interface ExportJobRequest {
  RoleArn?: string;
  S3UrlPrefix?: string;
  SegmentId?: string;
  SegmentVersion?: number;
}
export const ExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoleArn: S.optional(S.String),
    S3UrlPrefix: S.optional(S.String),
    SegmentId: S.optional(S.String),
    SegmentVersion: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExportJobRequest",
}) as any as S.Schema<ExportJobRequest>;
export interface CreateExportJobRequest {
  ApplicationId: string;
  ExportJobRequest?: ExportJobRequest;
}
export const CreateExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ExportJobRequest: S.optional(ExportJobRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ExportJobRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/apps/{ApplicationId}/jobs/export" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateExportJobRequest",
}) as any as S.Schema<CreateExportJobRequest>;
export interface ExportJobResource {
  RoleArn?: string;
  S3UrlPrefix?: string;
  SegmentId?: string;
  SegmentVersion?: number;
}
export const ExportJobResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RoleArn: S.optional(S.String),
    S3UrlPrefix: S.optional(S.String),
    SegmentId: S.optional(S.String),
    SegmentVersion: S.optional(S.Number),
  }),
).annotate({
  identifier: "ExportJobResource",
}) as any as S.Schema<ExportJobResource>;
export type JobStatus =
  | "CREATED"
  | "PREPARING_FOR_INITIALIZATION"
  | "INITIALIZING"
  | "PROCESSING"
  | "PENDING_JOB"
  | "COMPLETING"
  | "COMPLETED"
  | "FAILING"
  | "FAILED"
  | (string & {});
export const JobStatus = S.String;

export interface ExportJobResponse {
  ApplicationId?: string;
  CompletedPieces?: number;
  CompletionDate?: string;
  CreationDate?: string;
  Definition?: ExportJobResource;
  FailedPieces?: number;
  Failures?: string[];
  Id?: string;
  JobStatus?: JobStatus;
  TotalFailures?: number;
  TotalPieces?: number;
  TotalProcessed?: number;
  Type?: string;
}
export const ExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CompletedPieces: S.optional(S.Number),
    CompletionDate: S.optional(S.String),
    CreationDate: S.optional(S.String),
    Definition: S.optional(ExportJobResource),
    FailedPieces: S.optional(S.Number),
    Failures: S.optional(ListOf__string),
    Id: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    TotalFailures: S.optional(S.Number),
    TotalPieces: S.optional(S.Number),
    TotalProcessed: S.optional(S.Number),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "ExportJobResponse",
}) as any as S.Schema<ExportJobResponse>;
export interface CreateExportJobResponse {
  ExportJobResponse: ExportJobResponse & {
    ApplicationId: string;
    CreationDate: string;
    Definition: ExportJobResource & { RoleArn: string; S3UrlPrefix: string };
    Id: string;
    JobStatus: JobStatus;
    Type: string;
  };
}
export const CreateExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportJobResponse: S.optional(ExportJobResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ExportJobResponse" }),
  }),
).annotate({
  identifier: "CreateExportJobResponse",
}) as any as S.Schema<CreateExportJobResponse>;
export type Format = "CSV" | "JSON" | (string & {});
export const Format = S.String;

export interface ImportJobRequest {
  DefineSegment?: boolean;
  ExternalId?: string;
  Format?: Format;
  RegisterEndpoints?: boolean;
  RoleArn?: string;
  S3Url?: string;
  SegmentId?: string;
  SegmentName?: string;
}
export const ImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefineSegment: S.optional(S.Boolean),
    ExternalId: S.optional(S.String),
    Format: S.optional(Format),
    RegisterEndpoints: S.optional(S.Boolean),
    RoleArn: S.optional(S.String),
    S3Url: S.optional(S.String),
    SegmentId: S.optional(S.String),
    SegmentName: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportJobRequest",
}) as any as S.Schema<ImportJobRequest>;
export interface CreateImportJobRequest {
  ApplicationId: string;
  ImportJobRequest?: ImportJobRequest;
}
export const CreateImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    ImportJobRequest: S.optional(ImportJobRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ImportJobRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/apps/{ApplicationId}/jobs/import" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateImportJobRequest",
}) as any as S.Schema<CreateImportJobRequest>;
export interface ImportJobResource {
  DefineSegment?: boolean;
  ExternalId?: string;
  Format?: Format;
  RegisterEndpoints?: boolean;
  RoleArn?: string;
  S3Url?: string;
  SegmentId?: string;
  SegmentName?: string;
}
export const ImportJobResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefineSegment: S.optional(S.Boolean),
    ExternalId: S.optional(S.String),
    Format: S.optional(Format),
    RegisterEndpoints: S.optional(S.Boolean),
    RoleArn: S.optional(S.String),
    S3Url: S.optional(S.String),
    SegmentId: S.optional(S.String),
    SegmentName: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportJobResource",
}) as any as S.Schema<ImportJobResource>;
export interface ImportJobResponse {
  ApplicationId?: string;
  CompletedPieces?: number;
  CompletionDate?: string;
  CreationDate?: string;
  Definition?: ImportJobResource;
  FailedPieces?: number;
  Failures?: string[];
  Id?: string;
  JobStatus?: JobStatus;
  TotalFailures?: number;
  TotalPieces?: number;
  TotalProcessed?: number;
  Type?: string;
}
export const ImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CompletedPieces: S.optional(S.Number),
    CompletionDate: S.optional(S.String),
    CreationDate: S.optional(S.String),
    Definition: S.optional(ImportJobResource),
    FailedPieces: S.optional(S.Number),
    Failures: S.optional(ListOf__string),
    Id: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    TotalFailures: S.optional(S.Number),
    TotalPieces: S.optional(S.Number),
    TotalProcessed: S.optional(S.Number),
    Type: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportJobResponse",
}) as any as S.Schema<ImportJobResponse>;
export interface CreateImportJobResponse {
  ImportJobResponse: ImportJobResponse & {
    ApplicationId: string;
    CreationDate: string;
    Definition: ImportJobResource & {
      Format: Format;
      RoleArn: string;
      S3Url: string;
    };
    Id: string;
    JobStatus: JobStatus;
    Type: string;
  };
}
export const CreateImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportJobResponse: S.optional(ImportJobResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ImportJobResponse" }),
  }),
).annotate({
  identifier: "CreateImportJobResponse",
}) as any as S.Schema<CreateImportJobResponse>;
export interface InAppTemplateRequest {
  Content?: InAppMessageContent[];
  CustomConfig?: { [key: string]: string | undefined };
  Layout?: Layout;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
}
export const InAppTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Content: S.optional(ListOfInAppMessageContent),
    CustomConfig: S.optional(MapOf__string),
    Layout: S.optional(Layout),
    tags: S.optional(MapOf__string),
    TemplateDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "InAppTemplateRequest",
}) as any as S.Schema<InAppTemplateRequest>;
export interface CreateInAppTemplateRequest {
  InAppTemplateRequest?: InAppTemplateRequest;
  TemplateName: string;
}
export const CreateInAppTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InAppTemplateRequest: S.optional(InAppTemplateRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "InAppTemplateRequest" }),
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/templates/{TemplateName}/inapp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateInAppTemplateRequest",
}) as any as S.Schema<CreateInAppTemplateRequest>;
export interface TemplateCreateMessageBody {
  Arn?: string;
  Message?: string;
  RequestID?: string;
}
export const TemplateCreateMessageBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Message: S.optional(S.String),
    RequestID: S.optional(S.String),
  }),
).annotate({
  identifier: "TemplateCreateMessageBody",
}) as any as S.Schema<TemplateCreateMessageBody>;
export interface CreateInAppTemplateResponse {
  TemplateCreateMessageBody: TemplateCreateMessageBody;
}
export const CreateInAppTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateCreateMessageBody: S.optional(TemplateCreateMessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "TemplateCreateMessageBody" }),
  }),
).annotate({
  identifier: "CreateInAppTemplateResponse",
}) as any as S.Schema<CreateInAppTemplateResponse>;
export interface JourneyCustomMessage {
  Data?: string;
}
export const JourneyCustomMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Data: S.optional(S.String) }),
).annotate({
  identifier: "JourneyCustomMessage",
}) as any as S.Schema<JourneyCustomMessage>;
export interface CustomMessageActivity {
  DeliveryUri?: string;
  EndpointTypes?: __EndpointTypesElement[];
  MessageConfig?: JourneyCustomMessage;
  NextActivity?: string;
  TemplateName?: string;
  TemplateVersion?: string;
}
export const CustomMessageActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliveryUri: S.optional(S.String),
    EndpointTypes: S.optional(ListOf__EndpointTypesElement),
    MessageConfig: S.optional(JourneyCustomMessage),
    NextActivity: S.optional(S.String),
    TemplateName: S.optional(S.String),
    TemplateVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomMessageActivity",
}) as any as S.Schema<CustomMessageActivity>;
export interface EventCondition {
  Dimensions?: EventDimensions;
  MessageActivity?: string;
}
export const EventCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dimensions: S.optional(EventDimensions),
    MessageActivity: S.optional(S.String),
  }),
).annotate({ identifier: "EventCondition" }) as any as S.Schema<EventCondition>;
export interface SegmentCondition {
  SegmentId?: string;
}
export const SegmentCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SegmentId: S.optional(S.String) }),
).annotate({
  identifier: "SegmentCondition",
}) as any as S.Schema<SegmentCondition>;
export type Duration = "HR_24" | "DAY_7" | "DAY_14" | "DAY_30" | (string & {});
export const Duration = S.String;

export type RecencyType = "ACTIVE" | "INACTIVE" | (string & {});
export const RecencyType = S.String;

export interface RecencyDimension {
  Duration?: Duration;
  RecencyType?: RecencyType;
}
export const RecencyDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Duration: S.optional(Duration),
    RecencyType: S.optional(RecencyType),
  }),
).annotate({
  identifier: "RecencyDimension",
}) as any as S.Schema<RecencyDimension>;
export interface SegmentBehaviors {
  Recency?: RecencyDimension;
}
export const SegmentBehaviors = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Recency: S.optional(RecencyDimension) }),
).annotate({
  identifier: "SegmentBehaviors",
}) as any as S.Schema<SegmentBehaviors>;
export interface SegmentDemographics {
  AppVersion?: SetDimension;
  Channel?: SetDimension;
  DeviceType?: SetDimension;
  Make?: SetDimension;
  Model?: SetDimension;
  Platform?: SetDimension;
}
export const SegmentDemographics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppVersion: S.optional(SetDimension),
    Channel: S.optional(SetDimension),
    DeviceType: S.optional(SetDimension),
    Make: S.optional(SetDimension),
    Model: S.optional(SetDimension),
    Platform: S.optional(SetDimension),
  }),
).annotate({
  identifier: "SegmentDemographics",
}) as any as S.Schema<SegmentDemographics>;
export interface GPSCoordinates {
  Latitude?: number;
  Longitude?: number;
}
export const GPSCoordinates = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Latitude: S.optional(S.Number), Longitude: S.optional(S.Number) }),
).annotate({ identifier: "GPSCoordinates" }) as any as S.Schema<GPSCoordinates>;
export interface GPSPointDimension {
  Coordinates?: GPSCoordinates;
  RangeInKilometers?: number;
}
export const GPSPointDimension = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Coordinates: S.optional(GPSCoordinates),
    RangeInKilometers: S.optional(S.Number),
  }),
).annotate({
  identifier: "GPSPointDimension",
}) as any as S.Schema<GPSPointDimension>;
export interface SegmentLocation {
  Country?: SetDimension;
  GPSPoint?: GPSPointDimension;
}
export const SegmentLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Country: S.optional(SetDimension),
    GPSPoint: S.optional(GPSPointDimension),
  }),
).annotate({
  identifier: "SegmentLocation",
}) as any as S.Schema<SegmentLocation>;
export interface SegmentDimensions {
  Attributes?: { [key: string]: AttributeDimension | undefined };
  Behavior?: SegmentBehaviors;
  Demographic?: SegmentDemographics;
  Location?: SegmentLocation;
  Metrics?: { [key: string]: MetricDimension | undefined };
  UserAttributes?: { [key: string]: AttributeDimension | undefined };
}
export const SegmentDimensions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(MapOfAttributeDimension),
    Behavior: S.optional(SegmentBehaviors),
    Demographic: S.optional(SegmentDemographics),
    Location: S.optional(SegmentLocation),
    Metrics: S.optional(MapOfMetricDimension),
    UserAttributes: S.optional(MapOfAttributeDimension),
  }),
).annotate({
  identifier: "SegmentDimensions",
}) as any as S.Schema<SegmentDimensions>;
export interface SimpleCondition {
  EventCondition?: EventCondition;
  SegmentCondition?: SegmentCondition;
  SegmentDimensions?: SegmentDimensions;
}
export const SimpleCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventCondition: S.optional(EventCondition),
    SegmentCondition: S.optional(SegmentCondition),
    SegmentDimensions: S.optional(SegmentDimensions),
  }).pipe(S.encodeKeys({ SegmentDimensions: "segmentDimensions" })),
).annotate({
  identifier: "SimpleCondition",
}) as any as S.Schema<SimpleCondition>;
export type ListOfSimpleCondition = SimpleCondition[];
export const ListOfSimpleCondition = /*@__PURE__*/ S.Array(SimpleCondition);
export type Operator = "ALL" | "ANY" | (string & {});
export const Operator = S.String;

export interface Condition {
  Conditions?: SimpleCondition[];
  Operator?: Operator;
}
export const Condition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Conditions: S.optional(ListOfSimpleCondition),
    Operator: S.optional(Operator),
  }),
).annotate({ identifier: "Condition" }) as any as S.Schema<Condition>;
export interface WaitTime {
  WaitFor?: string;
  WaitUntil?: string;
}
export const WaitTime = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ WaitFor: S.optional(S.String), WaitUntil: S.optional(S.String) }),
).annotate({ identifier: "WaitTime" }) as any as S.Schema<WaitTime>;
export interface ConditionalSplitActivity {
  Condition?: Condition;
  EvaluationWaitTime?: WaitTime;
  FalseActivity?: string;
  TrueActivity?: string;
}
export const ConditionalSplitActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Condition: S.optional(Condition),
    EvaluationWaitTime: S.optional(WaitTime),
    FalseActivity: S.optional(S.String),
    TrueActivity: S.optional(S.String),
  }),
).annotate({
  identifier: "ConditionalSplitActivity",
}) as any as S.Schema<ConditionalSplitActivity>;
export interface JourneyEmailMessage {
  FromAddress?: string;
}
export const JourneyEmailMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FromAddress: S.optional(S.String) }),
).annotate({
  identifier: "JourneyEmailMessage",
}) as any as S.Schema<JourneyEmailMessage>;
export interface EmailMessageActivity {
  MessageConfig?: JourneyEmailMessage;
  NextActivity?: string;
  TemplateName?: string;
  TemplateVersion?: string;
}
export const EmailMessageActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageConfig: S.optional(JourneyEmailMessage),
    NextActivity: S.optional(S.String),
    TemplateName: S.optional(S.String),
    TemplateVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "EmailMessageActivity",
}) as any as S.Schema<EmailMessageActivity>;
export interface HoldoutActivity {
  NextActivity?: string;
  Percentage?: number;
}
export const HoldoutActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextActivity: S.optional(S.String),
    Percentage: S.optional(S.Number),
  }),
).annotate({
  identifier: "HoldoutActivity",
}) as any as S.Schema<HoldoutActivity>;
export interface MultiConditionalBranch {
  Condition?: SimpleCondition;
  NextActivity?: string;
}
export const MultiConditionalBranch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Condition: S.optional(SimpleCondition),
    NextActivity: S.optional(S.String),
  }),
).annotate({
  identifier: "MultiConditionalBranch",
}) as any as S.Schema<MultiConditionalBranch>;
export type ListOfMultiConditionalBranch = MultiConditionalBranch[];
export const ListOfMultiConditionalBranch = /*@__PURE__*/ S.Array(
  MultiConditionalBranch,
);
export interface MultiConditionalSplitActivity {
  Branches?: MultiConditionalBranch[];
  DefaultActivity?: string;
  EvaluationWaitTime?: WaitTime;
}
export const MultiConditionalSplitActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Branches: S.optional(ListOfMultiConditionalBranch),
    DefaultActivity: S.optional(S.String),
    EvaluationWaitTime: S.optional(WaitTime),
  }),
).annotate({
  identifier: "MultiConditionalSplitActivity",
}) as any as S.Schema<MultiConditionalSplitActivity>;
export interface JourneyPushMessage {
  TimeToLive?: string;
}
export const JourneyPushMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TimeToLive: S.optional(S.String) }),
).annotate({
  identifier: "JourneyPushMessage",
}) as any as S.Schema<JourneyPushMessage>;
export interface PushMessageActivity {
  MessageConfig?: JourneyPushMessage;
  NextActivity?: string;
  TemplateName?: string;
  TemplateVersion?: string;
}
export const PushMessageActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageConfig: S.optional(JourneyPushMessage),
    NextActivity: S.optional(S.String),
    TemplateName: S.optional(S.String),
    TemplateVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "PushMessageActivity",
}) as any as S.Schema<PushMessageActivity>;
export interface RandomSplitEntry {
  NextActivity?: string;
  Percentage?: number;
}
export const RandomSplitEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextActivity: S.optional(S.String),
    Percentage: S.optional(S.Number),
  }),
).annotate({
  identifier: "RandomSplitEntry",
}) as any as S.Schema<RandomSplitEntry>;
export type ListOfRandomSplitEntry = RandomSplitEntry[];
export const ListOfRandomSplitEntry = /*@__PURE__*/ S.Array(RandomSplitEntry);
export interface RandomSplitActivity {
  Branches?: RandomSplitEntry[];
}
export const RandomSplitActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Branches: S.optional(ListOfRandomSplitEntry) }),
).annotate({
  identifier: "RandomSplitActivity",
}) as any as S.Schema<RandomSplitActivity>;
export interface JourneySMSMessage {
  MessageType?: MessageType;
  OriginationNumber?: string;
  SenderId?: string;
  EntityId?: string;
  TemplateId?: string;
}
export const JourneySMSMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageType: S.optional(MessageType),
    OriginationNumber: S.optional(S.String),
    SenderId: S.optional(S.String),
    EntityId: S.optional(S.String),
    TemplateId: S.optional(S.String),
  }),
).annotate({
  identifier: "JourneySMSMessage",
}) as any as S.Schema<JourneySMSMessage>;
export interface SMSMessageActivity {
  MessageConfig?: JourneySMSMessage;
  NextActivity?: string;
  TemplateName?: string;
  TemplateVersion?: string;
}
export const SMSMessageActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageConfig: S.optional(JourneySMSMessage),
    NextActivity: S.optional(S.String),
    TemplateName: S.optional(S.String),
    TemplateVersion: S.optional(S.String),
  }),
).annotate({
  identifier: "SMSMessageActivity",
}) as any as S.Schema<SMSMessageActivity>;
export interface WaitActivity {
  NextActivity?: string;
  WaitTime?: WaitTime;
}
export const WaitActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextActivity: S.optional(S.String),
    WaitTime: S.optional(WaitTime),
  }),
).annotate({ identifier: "WaitActivity" }) as any as S.Schema<WaitActivity>;
export interface ContactCenterActivity {
  NextActivity?: string;
}
export const ContactCenterActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextActivity: S.optional(S.String) }),
).annotate({
  identifier: "ContactCenterActivity",
}) as any as S.Schema<ContactCenterActivity>;
export interface Activity {
  CUSTOM?: CustomMessageActivity;
  ConditionalSplit?: ConditionalSplitActivity;
  Description?: string;
  EMAIL?: EmailMessageActivity;
  Holdout?: HoldoutActivity;
  MultiCondition?: MultiConditionalSplitActivity;
  PUSH?: PushMessageActivity;
  RandomSplit?: RandomSplitActivity;
  SMS?: SMSMessageActivity;
  Wait?: WaitActivity;
  ContactCenter?: ContactCenterActivity;
}
export const Activity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CUSTOM: S.optional(CustomMessageActivity),
    ConditionalSplit: S.optional(ConditionalSplitActivity),
    Description: S.optional(S.String),
    EMAIL: S.optional(EmailMessageActivity),
    Holdout: S.optional(HoldoutActivity),
    MultiCondition: S.optional(MultiConditionalSplitActivity),
    PUSH: S.optional(PushMessageActivity),
    RandomSplit: S.optional(RandomSplitActivity),
    SMS: S.optional(SMSMessageActivity),
    Wait: S.optional(WaitActivity),
    ContactCenter: S.optional(ContactCenterActivity),
  }),
).annotate({ identifier: "Activity" }) as any as S.Schema<Activity>;
export type MapOfActivity = { [key: string]: Activity | undefined };
export const MapOfActivity = /*@__PURE__*/ S.Record(
  S.String,
  Activity.pipe(S.optional),
);
export interface JourneyTimeframeCap {
  Cap?: number;
  Days?: number;
}
export const JourneyTimeframeCap = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cap: S.optional(S.Number), Days: S.optional(S.Number) }),
).annotate({
  identifier: "JourneyTimeframeCap",
}) as any as S.Schema<JourneyTimeframeCap>;
export interface JourneyLimits {
  DailyCap?: number;
  EndpointReentryCap?: number;
  MessagesPerSecond?: number;
  EndpointReentryInterval?: string;
  TimeframeCap?: JourneyTimeframeCap;
  TotalCap?: number;
}
export const JourneyLimits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DailyCap: S.optional(S.Number),
    EndpointReentryCap: S.optional(S.Number),
    MessagesPerSecond: S.optional(S.Number),
    EndpointReentryInterval: S.optional(S.String),
    TimeframeCap: S.optional(JourneyTimeframeCap),
    TotalCap: S.optional(S.Number),
  }),
).annotate({ identifier: "JourneyLimits" }) as any as S.Schema<JourneyLimits>;
export type __timestampIso8601 = Date;
export interface JourneySchedule {
  EndTime?: Date;
  StartTime?: Date;
  Timezone?: string;
}
export const JourneySchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Timezone: S.optional(S.String),
  }),
).annotate({
  identifier: "JourneySchedule",
}) as any as S.Schema<JourneySchedule>;
export interface EventFilter {
  Dimensions?: EventDimensions;
  FilterType?: FilterType;
}
export const EventFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dimensions: S.optional(EventDimensions),
    FilterType: S.optional(FilterType),
  }),
).annotate({ identifier: "EventFilter" }) as any as S.Schema<EventFilter>;
export interface EventStartCondition {
  EventFilter?: EventFilter;
  SegmentId?: string;
}
export const EventStartCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventFilter: S.optional(EventFilter),
    SegmentId: S.optional(S.String),
  }),
).annotate({
  identifier: "EventStartCondition",
}) as any as S.Schema<EventStartCondition>;
export interface StartCondition {
  Description?: string;
  EventStartCondition?: EventStartCondition;
  SegmentStartCondition?: SegmentCondition;
}
export const StartCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Description: S.optional(S.String),
    EventStartCondition: S.optional(EventStartCondition),
    SegmentStartCondition: S.optional(SegmentCondition),
  }),
).annotate({ identifier: "StartCondition" }) as any as S.Schema<StartCondition>;
export type State =
  | "DRAFT"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "CLOSED"
  | "PAUSED"
  | (string & {});
export const State = S.String;

export interface JourneyChannelSettings {
  ConnectCampaignArn?: string;
  ConnectCampaignExecutionRoleArn?: string;
}
export const JourneyChannelSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectCampaignArn: S.optional(S.String),
    ConnectCampaignExecutionRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "JourneyChannelSettings",
}) as any as S.Schema<JourneyChannelSettings>;
export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export const DayOfWeek = S.String;

export interface OpenHoursRule {
  StartTime?: string;
  EndTime?: string;
}
export const OpenHoursRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StartTime: S.optional(S.String), EndTime: S.optional(S.String) }),
).annotate({ identifier: "OpenHoursRule" }) as any as S.Schema<OpenHoursRule>;
export type ListOfOpenHoursRules = OpenHoursRule[];
export const ListOfOpenHoursRules = /*@__PURE__*/ S.Array(OpenHoursRule);
export type MapOfListOfOpenHoursRules = {
  [key in DayOfWeek]?: OpenHoursRule[];
};
export const MapOfListOfOpenHoursRules = /*@__PURE__*/ S.Record(
  DayOfWeek,
  ListOfOpenHoursRules.pipe(S.optional),
);
export interface OpenHours {
  EMAIL?: { [key: string]: OpenHoursRule[] | undefined };
  SMS?: { [key: string]: OpenHoursRule[] | undefined };
  PUSH?: { [key: string]: OpenHoursRule[] | undefined };
  VOICE?: { [key: string]: OpenHoursRule[] | undefined };
  CUSTOM?: { [key: string]: OpenHoursRule[] | undefined };
}
export const OpenHours = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EMAIL: S.optional(MapOfListOfOpenHoursRules),
    SMS: S.optional(MapOfListOfOpenHoursRules),
    PUSH: S.optional(MapOfListOfOpenHoursRules),
    VOICE: S.optional(MapOfListOfOpenHoursRules),
    CUSTOM: S.optional(MapOfListOfOpenHoursRules),
  }),
).annotate({ identifier: "OpenHours" }) as any as S.Schema<OpenHours>;
export interface ClosedDaysRule {
  Name?: string;
  StartDateTime?: string;
  EndDateTime?: string;
}
export const ClosedDaysRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    StartDateTime: S.optional(S.String),
    EndDateTime: S.optional(S.String),
  }),
).annotate({ identifier: "ClosedDaysRule" }) as any as S.Schema<ClosedDaysRule>;
export type ListOfClosedDaysRules = ClosedDaysRule[];
export const ListOfClosedDaysRules = /*@__PURE__*/ S.Array(ClosedDaysRule);
export interface ClosedDays {
  EMAIL?: ClosedDaysRule[];
  SMS?: ClosedDaysRule[];
  PUSH?: ClosedDaysRule[];
  VOICE?: ClosedDaysRule[];
  CUSTOM?: ClosedDaysRule[];
}
export const ClosedDays = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EMAIL: S.optional(ListOfClosedDaysRules),
    SMS: S.optional(ListOfClosedDaysRules),
    PUSH: S.optional(ListOfClosedDaysRules),
    VOICE: S.optional(ListOfClosedDaysRules),
    CUSTOM: S.optional(ListOfClosedDaysRules),
  }),
).annotate({ identifier: "ClosedDays" }) as any as S.Schema<ClosedDays>;
export type __TimezoneEstimationMethodsElement =
  | "PHONE_NUMBER"
  | "POSTAL_CODE"
  | (string & {});
export const __TimezoneEstimationMethodsElement = S.String;

export type ListOf__TimezoneEstimationMethodsElement =
  __TimezoneEstimationMethodsElement[];
export const ListOf__TimezoneEstimationMethodsElement = /*@__PURE__*/ S.Array(
  __TimezoneEstimationMethodsElement,
);
export interface WriteJourneyRequest {
  Activities?: { [key: string]: Activity | undefined };
  CreationDate?: string;
  LastModifiedDate?: string;
  Limits?: JourneyLimits;
  LocalTime?: boolean;
  Name?: string;
  QuietTime?: QuietTime;
  RefreshFrequency?: string;
  Schedule?: JourneySchedule;
  StartActivity?: string;
  StartCondition?: StartCondition;
  State?: State;
  WaitForQuietTime?: boolean;
  RefreshOnSegmentUpdate?: boolean;
  JourneyChannelSettings?: JourneyChannelSettings;
  SendingSchedule?: boolean;
  OpenHours?: OpenHours;
  ClosedDays?: ClosedDays;
  TimezoneEstimationMethods?: __TimezoneEstimationMethodsElement[];
}
export const WriteJourneyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Activities: S.optional(MapOfActivity),
    CreationDate: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Limits: S.optional(JourneyLimits),
    LocalTime: S.optional(S.Boolean),
    Name: S.optional(S.String),
    QuietTime: S.optional(QuietTime),
    RefreshFrequency: S.optional(S.String),
    Schedule: S.optional(JourneySchedule),
    StartActivity: S.optional(S.String),
    StartCondition: S.optional(StartCondition),
    State: S.optional(State),
    WaitForQuietTime: S.optional(S.Boolean),
    RefreshOnSegmentUpdate: S.optional(S.Boolean),
    JourneyChannelSettings: S.optional(JourneyChannelSettings),
    SendingSchedule: S.optional(S.Boolean),
    OpenHours: S.optional(OpenHours),
    ClosedDays: S.optional(ClosedDays),
    TimezoneEstimationMethods: S.optional(
      ListOf__TimezoneEstimationMethodsElement,
    ),
  }),
).annotate({
  identifier: "WriteJourneyRequest",
}) as any as S.Schema<WriteJourneyRequest>;
export interface CreateJourneyRequest {
  ApplicationId: string;
  WriteJourneyRequest?: WriteJourneyRequest;
}
export const CreateJourneyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    WriteJourneyRequest: S.optional(WriteJourneyRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "WriteJourneyRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/apps/{ApplicationId}/journeys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateJourneyRequest",
}) as any as S.Schema<CreateJourneyRequest>;
export interface JourneyResponse {
  Activities?: { [key: string]: Activity | undefined };
  ApplicationId?: string;
  CreationDate?: string;
  Id?: string;
  LastModifiedDate?: string;
  Limits?: JourneyLimits;
  LocalTime?: boolean;
  Name?: string;
  QuietTime?: QuietTime;
  RefreshFrequency?: string;
  Schedule?: JourneySchedule;
  StartActivity?: string;
  StartCondition?: StartCondition;
  State?: State;
  tags?: { [key: string]: string | undefined };
  WaitForQuietTime?: boolean;
  RefreshOnSegmentUpdate?: boolean;
  JourneyChannelSettings?: JourneyChannelSettings;
  SendingSchedule?: boolean;
  OpenHours?: OpenHours;
  ClosedDays?: ClosedDays;
  TimezoneEstimationMethods?: __TimezoneEstimationMethodsElement[];
}
export const JourneyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Activities: S.optional(MapOfActivity),
    ApplicationId: S.optional(S.String),
    CreationDate: S.optional(S.String),
    Id: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Limits: S.optional(JourneyLimits),
    LocalTime: S.optional(S.Boolean),
    Name: S.optional(S.String),
    QuietTime: S.optional(QuietTime),
    RefreshFrequency: S.optional(S.String),
    Schedule: S.optional(JourneySchedule),
    StartActivity: S.optional(S.String),
    StartCondition: S.optional(StartCondition),
    State: S.optional(State),
    tags: S.optional(MapOf__string),
    WaitForQuietTime: S.optional(S.Boolean),
    RefreshOnSegmentUpdate: S.optional(S.Boolean),
    JourneyChannelSettings: S.optional(JourneyChannelSettings),
    SendingSchedule: S.optional(S.Boolean),
    OpenHours: S.optional(OpenHours),
    ClosedDays: S.optional(ClosedDays),
    TimezoneEstimationMethods: S.optional(
      ListOf__TimezoneEstimationMethodsElement,
    ),
  }),
).annotate({
  identifier: "JourneyResponse",
}) as any as S.Schema<JourneyResponse>;
export interface CreateJourneyResponse {
  JourneyResponse: JourneyResponse & {
    ApplicationId: string;
    Id: string;
    Name: string;
    Activities: {
      [key: string]:
        | (Activity & {
            ConditionalSplit: ConditionalSplitActivity & {
              Condition: Condition & {
                Conditions: (SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                })[];
              };
            };
            Holdout: HoldoutActivity & { Percentage: number };
            MultiCondition: MultiConditionalSplitActivity & {
              Branches: (MultiConditionalBranch & {
                Condition: SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                };
              })[];
            };
          })
        | undefined;
    };
    StartCondition: StartCondition & {
      EventStartCondition: EventStartCondition & {
        EventFilter: EventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
      SegmentStartCondition: SegmentCondition & { SegmentId: string };
    };
  };
}
export const CreateJourneyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JourneyResponse: S.optional(JourneyResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "JourneyResponse" }),
  }),
).annotate({
  identifier: "CreateJourneyResponse",
}) as any as S.Schema<CreateJourneyResponse>;
export interface AndroidPushNotificationTemplate {
  Action?: Action;
  Body?: string;
  ImageIconUrl?: string;
  ImageUrl?: string;
  RawContent?: string;
  SmallImageIconUrl?: string;
  Sound?: string;
  Title?: string;
  Url?: string;
}
export const AndroidPushNotificationTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Body: S.optional(S.String),
    ImageIconUrl: S.optional(S.String),
    ImageUrl: S.optional(S.String),
    RawContent: S.optional(S.String),
    SmallImageIconUrl: S.optional(S.String),
    Sound: S.optional(S.String),
    Title: S.optional(S.String),
    Url: S.optional(S.String),
  }),
).annotate({
  identifier: "AndroidPushNotificationTemplate",
}) as any as S.Schema<AndroidPushNotificationTemplate>;
export interface APNSPushNotificationTemplate {
  Action?: Action;
  Body?: string;
  MediaUrl?: string;
  RawContent?: string;
  Sound?: string;
  Title?: string;
  Url?: string;
}
export const APNSPushNotificationTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Body: S.optional(S.String),
    MediaUrl: S.optional(S.String),
    RawContent: S.optional(S.String),
    Sound: S.optional(S.String),
    Title: S.optional(S.String),
    Url: S.optional(S.String),
  }),
).annotate({
  identifier: "APNSPushNotificationTemplate",
}) as any as S.Schema<APNSPushNotificationTemplate>;
export interface DefaultPushNotificationTemplate {
  Action?: Action;
  Body?: string;
  Sound?: string;
  Title?: string;
  Url?: string;
}
export const DefaultPushNotificationTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Body: S.optional(S.String),
    Sound: S.optional(S.String),
    Title: S.optional(S.String),
    Url: S.optional(S.String),
  }),
).annotate({
  identifier: "DefaultPushNotificationTemplate",
}) as any as S.Schema<DefaultPushNotificationTemplate>;
export interface PushNotificationTemplateRequest {
  ADM?: AndroidPushNotificationTemplate;
  APNS?: APNSPushNotificationTemplate;
  Baidu?: AndroidPushNotificationTemplate;
  Default?: DefaultPushNotificationTemplate;
  DefaultSubstitutions?: string;
  GCM?: AndroidPushNotificationTemplate;
  RecommenderId?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
}
export const PushNotificationTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ADM: S.optional(AndroidPushNotificationTemplate),
    APNS: S.optional(APNSPushNotificationTemplate),
    Baidu: S.optional(AndroidPushNotificationTemplate),
    Default: S.optional(DefaultPushNotificationTemplate),
    DefaultSubstitutions: S.optional(S.String),
    GCM: S.optional(AndroidPushNotificationTemplate),
    RecommenderId: S.optional(S.String),
    tags: S.optional(MapOf__string),
    TemplateDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "PushNotificationTemplateRequest",
}) as any as S.Schema<PushNotificationTemplateRequest>;
export interface CreatePushTemplateRequest {
  PushNotificationTemplateRequest?: PushNotificationTemplateRequest;
  TemplateName: string;
}
export const CreatePushTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PushNotificationTemplateRequest: S.optional(PushNotificationTemplateRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "PushNotificationTemplateRequest" }),
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/templates/{TemplateName}/push" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreatePushTemplateRequest",
}) as any as S.Schema<CreatePushTemplateRequest>;
export interface CreatePushTemplateResponse {
  CreateTemplateMessageBody: CreateTemplateMessageBody;
}
export const CreatePushTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateTemplateMessageBody: S.optional(CreateTemplateMessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CreateTemplateMessageBody" }),
  }),
).annotate({
  identifier: "CreatePushTemplateResponse",
}) as any as S.Schema<CreatePushTemplateResponse>;
export interface CreateRecommenderConfigurationShape {
  Attributes?: { [key: string]: string | undefined };
  Description?: string;
  Name?: string;
  RecommendationProviderIdType?: string;
  RecommendationProviderRoleArn?: string;
  RecommendationProviderUri?: string;
  RecommendationTransformerUri?: string;
  RecommendationsDisplayName?: string;
  RecommendationsPerMessage?: number;
}
export const CreateRecommenderConfigurationShape = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(MapOf__string),
    Description: S.optional(S.String),
    Name: S.optional(S.String),
    RecommendationProviderIdType: S.optional(S.String),
    RecommendationProviderRoleArn: S.optional(S.String),
    RecommendationProviderUri: S.optional(S.String),
    RecommendationTransformerUri: S.optional(S.String),
    RecommendationsDisplayName: S.optional(S.String),
    RecommendationsPerMessage: S.optional(S.Number),
  }),
).annotate({
  identifier: "CreateRecommenderConfigurationShape",
}) as any as S.Schema<CreateRecommenderConfigurationShape>;
export interface CreateRecommenderConfigurationRequest {
  CreateRecommenderConfiguration?: CreateRecommenderConfigurationShape;
}
export const CreateRecommenderConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CreateRecommenderConfiguration: S.optional(
        CreateRecommenderConfigurationShape,
      )
        .pipe(T.HttpPayload())
        .annotate({ identifier: "CreateRecommenderConfigurationShape" }),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/v1/recommenders" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateRecommenderConfigurationRequest",
}) as any as S.Schema<CreateRecommenderConfigurationRequest>;
export interface RecommenderConfigurationResponse {
  Attributes?: { [key: string]: string | undefined };
  CreationDate?: string;
  Description?: string;
  Id?: string;
  LastModifiedDate?: string;
  Name?: string;
  RecommendationProviderIdType?: string;
  RecommendationProviderRoleArn?: string;
  RecommendationProviderUri?: string;
  RecommendationTransformerUri?: string;
  RecommendationsDisplayName?: string;
  RecommendationsPerMessage?: number;
}
export const RecommenderConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(MapOf__string),
    CreationDate: S.optional(S.String),
    Description: S.optional(S.String),
    Id: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Name: S.optional(S.String),
    RecommendationProviderIdType: S.optional(S.String),
    RecommendationProviderRoleArn: S.optional(S.String),
    RecommendationProviderUri: S.optional(S.String),
    RecommendationTransformerUri: S.optional(S.String),
    RecommendationsDisplayName: S.optional(S.String),
    RecommendationsPerMessage: S.optional(S.Number),
  }),
).annotate({
  identifier: "RecommenderConfigurationResponse",
}) as any as S.Schema<RecommenderConfigurationResponse>;
export interface CreateRecommenderConfigurationResponse {
  RecommenderConfigurationResponse: RecommenderConfigurationResponse & {
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    RecommendationProviderRoleArn: string;
    RecommendationProviderUri: string;
  };
}
export const CreateRecommenderConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RecommenderConfigurationResponse: S.optional(
        RecommenderConfigurationResponse,
      )
        .pipe(T.HttpPayload())
        .annotate({ identifier: "RecommenderConfigurationResponse" }),
    }),
).annotate({
  identifier: "CreateRecommenderConfigurationResponse",
}) as any as S.Schema<CreateRecommenderConfigurationResponse>;
export type ListOfSegmentDimensions = SegmentDimensions[];
export const ListOfSegmentDimensions = /*@__PURE__*/ S.Array(SegmentDimensions);
export interface SegmentReference {
  Id?: string;
  Version?: number;
}
export const SegmentReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Version: S.optional(S.Number) }),
).annotate({
  identifier: "SegmentReference",
}) as any as S.Schema<SegmentReference>;
export type ListOfSegmentReference = SegmentReference[];
export const ListOfSegmentReference = /*@__PURE__*/ S.Array(SegmentReference);
export type SourceType = "ALL" | "ANY" | "NONE" | (string & {});
export const SourceType = S.String;

export type Type = "ALL" | "ANY" | "NONE" | (string & {});
export const Type = S.String;

export interface SegmentGroup {
  Dimensions?: SegmentDimensions[];
  SourceSegments?: SegmentReference[];
  SourceType?: SourceType;
  Type?: Type;
}
export const SegmentGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dimensions: S.optional(ListOfSegmentDimensions),
    SourceSegments: S.optional(ListOfSegmentReference),
    SourceType: S.optional(SourceType),
    Type: S.optional(Type),
  }),
).annotate({ identifier: "SegmentGroup" }) as any as S.Schema<SegmentGroup>;
export type ListOfSegmentGroup = SegmentGroup[];
export const ListOfSegmentGroup = /*@__PURE__*/ S.Array(SegmentGroup);
export type Include = "ALL" | "ANY" | "NONE" | (string & {});
export const Include = S.String;

export interface SegmentGroupList {
  Groups?: SegmentGroup[];
  Include?: Include;
}
export const SegmentGroupList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Groups: S.optional(ListOfSegmentGroup),
    Include: S.optional(Include),
  }),
).annotate({
  identifier: "SegmentGroupList",
}) as any as S.Schema<SegmentGroupList>;
export interface WriteSegmentRequest {
  Dimensions?: SegmentDimensions;
  Name?: string;
  SegmentGroups?: SegmentGroupList;
  tags?: { [key: string]: string | undefined };
}
export const WriteSegmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Dimensions: S.optional(SegmentDimensions),
    Name: S.optional(S.String),
    SegmentGroups: S.optional(SegmentGroupList),
    tags: S.optional(MapOf__string),
  }),
).annotate({
  identifier: "WriteSegmentRequest",
}) as any as S.Schema<WriteSegmentRequest>;
export interface CreateSegmentRequest {
  ApplicationId: string;
  WriteSegmentRequest?: WriteSegmentRequest;
}
export const CreateSegmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    WriteSegmentRequest: S.optional(WriteSegmentRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "WriteSegmentRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/apps/{ApplicationId}/segments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSegmentRequest",
}) as any as S.Schema<CreateSegmentRequest>;
export type MapOf__integer = { [key: string]: number | undefined };
export const MapOf__integer = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface SegmentImportResource {
  ChannelCounts?: { [key: string]: number | undefined };
  ExternalId?: string;
  Format?: Format;
  RoleArn?: string;
  S3Url?: string;
  Size?: number;
}
export const SegmentImportResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelCounts: S.optional(MapOf__integer),
    ExternalId: S.optional(S.String),
    Format: S.optional(Format),
    RoleArn: S.optional(S.String),
    S3Url: S.optional(S.String),
    Size: S.optional(S.Number),
  }),
).annotate({
  identifier: "SegmentImportResource",
}) as any as S.Schema<SegmentImportResource>;
export type SegmentType = "DIMENSIONAL" | "IMPORT" | (string & {});
export const SegmentType = S.String;

export interface SegmentResponse {
  ApplicationId?: string;
  Arn?: string;
  CreationDate?: string;
  Dimensions?: SegmentDimensions;
  Id?: string;
  ImportDefinition?: SegmentImportResource;
  LastModifiedDate?: string;
  Name?: string;
  SegmentGroups?: SegmentGroupList;
  SegmentType?: SegmentType;
  tags?: { [key: string]: string | undefined };
  Version?: number;
}
export const SegmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    Arn: S.optional(S.String),
    CreationDate: S.optional(S.String),
    Dimensions: S.optional(SegmentDimensions),
    Id: S.optional(S.String),
    ImportDefinition: S.optional(SegmentImportResource),
    LastModifiedDate: S.optional(S.String),
    Name: S.optional(S.String),
    SegmentGroups: S.optional(SegmentGroupList),
    SegmentType: S.optional(SegmentType),
    tags: S.optional(MapOf__string),
    Version: S.optional(S.Number),
  }),
).annotate({
  identifier: "SegmentResponse",
}) as any as S.Schema<SegmentResponse>;
export interface CreateSegmentResponse {
  SegmentResponse: SegmentResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    SegmentType: SegmentType;
    Dimensions: SegmentDimensions & {
      Attributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
      Behavior: SegmentBehaviors & {
        Recency: RecencyDimension & {
          Duration: Duration;
          RecencyType: RecencyType;
        };
      };
      Demographic: SegmentDemographics & {
        AppVersion: SetDimension & { Values: ListOf__string };
        Channel: SetDimension & { Values: ListOf__string };
        DeviceType: SetDimension & { Values: ListOf__string };
        Make: SetDimension & { Values: ListOf__string };
        Model: SetDimension & { Values: ListOf__string };
        Platform: SetDimension & { Values: ListOf__string };
      };
      Location: SegmentLocation & {
        Country: SetDimension & { Values: ListOf__string };
        GPSPoint: GPSPointDimension & {
          Coordinates: GPSCoordinates & { Latitude: number; Longitude: number };
        };
      };
      Metrics: {
        [key: string]:
          | (MetricDimension & { ComparisonOperator: string; Value: number })
          | undefined;
      };
      UserAttributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
    };
    ImportDefinition: SegmentImportResource & {
      ExternalId: string;
      Format: Format;
      RoleArn: string;
      S3Url: string;
      Size: number;
    };
    SegmentGroups: SegmentGroupList & {
      Groups: (SegmentGroup & {
        Dimensions: (SegmentDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          Behavior: SegmentBehaviors & {
            Recency: RecencyDimension & {
              Duration: Duration;
              RecencyType: RecencyType;
            };
          };
          Demographic: SegmentDemographics & {
            AppVersion: SetDimension & { Values: ListOf__string };
            Channel: SetDimension & { Values: ListOf__string };
            DeviceType: SetDimension & { Values: ListOf__string };
            Make: SetDimension & { Values: ListOf__string };
            Model: SetDimension & { Values: ListOf__string };
            Platform: SetDimension & { Values: ListOf__string };
          };
          Location: SegmentLocation & {
            Country: SetDimension & { Values: ListOf__string };
            GPSPoint: GPSPointDimension & {
              Coordinates: GPSCoordinates & {
                Latitude: number;
                Longitude: number;
              };
            };
          };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
          UserAttributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
        })[];
        SourceSegments: (SegmentReference & { Id: string })[];
      })[];
    };
  };
}
export const CreateSegmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SegmentResponse: S.optional(SegmentResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SegmentResponse" }),
  }),
).annotate({
  identifier: "CreateSegmentResponse",
}) as any as S.Schema<CreateSegmentResponse>;
export interface SMSTemplateRequest {
  Body?: string;
  DefaultSubstitutions?: string;
  RecommenderId?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
}
export const SMSTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    DefaultSubstitutions: S.optional(S.String),
    RecommenderId: S.optional(S.String),
    tags: S.optional(MapOf__string),
    TemplateDescription: S.optional(S.String),
  }),
).annotate({
  identifier: "SMSTemplateRequest",
}) as any as S.Schema<SMSTemplateRequest>;
export interface CreateSmsTemplateRequest {
  SMSTemplateRequest?: SMSTemplateRequest;
  TemplateName: string;
}
export const CreateSmsTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SMSTemplateRequest: S.optional(SMSTemplateRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SMSTemplateRequest" }),
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/templates/{TemplateName}/sms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSmsTemplateRequest",
}) as any as S.Schema<CreateSmsTemplateRequest>;
export interface CreateSmsTemplateResponse {
  CreateTemplateMessageBody: CreateTemplateMessageBody;
}
export const CreateSmsTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateTemplateMessageBody: S.optional(CreateTemplateMessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CreateTemplateMessageBody" }),
  }),
).annotate({
  identifier: "CreateSmsTemplateResponse",
}) as any as S.Schema<CreateSmsTemplateResponse>;
export interface VoiceTemplateRequest {
  Body?: string;
  DefaultSubstitutions?: string;
  LanguageCode?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  VoiceId?: string;
}
export const VoiceTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    DefaultSubstitutions: S.optional(S.String),
    LanguageCode: S.optional(S.String),
    tags: S.optional(MapOf__string),
    TemplateDescription: S.optional(S.String),
    VoiceId: S.optional(S.String),
  }),
).annotate({
  identifier: "VoiceTemplateRequest",
}) as any as S.Schema<VoiceTemplateRequest>;
export interface CreateVoiceTemplateRequest {
  TemplateName: string;
  VoiceTemplateRequest?: VoiceTemplateRequest;
}
export const CreateVoiceTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    VoiceTemplateRequest: S.optional(VoiceTemplateRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "VoiceTemplateRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/templates/{TemplateName}/voice" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVoiceTemplateRequest",
}) as any as S.Schema<CreateVoiceTemplateRequest>;
export interface CreateVoiceTemplateResponse {
  CreateTemplateMessageBody: CreateTemplateMessageBody;
}
export const CreateVoiceTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateTemplateMessageBody: S.optional(CreateTemplateMessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CreateTemplateMessageBody" }),
  }),
).annotate({
  identifier: "CreateVoiceTemplateResponse",
}) as any as S.Schema<CreateVoiceTemplateResponse>;
export interface DeleteAdmChannelRequest {
  ApplicationId: string;
}
export const DeleteAdmChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/channels/adm",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAdmChannelRequest",
}) as any as S.Schema<DeleteAdmChannelRequest>;
export interface ADMChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export const ADMChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationDate: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    HasCredential: S.optional(S.Boolean),
    Id: S.optional(S.String),
    IsArchived: S.optional(S.Boolean),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Platform: S.optional(S.String),
    Version: S.optional(S.Number),
  }),
).annotate({
  identifier: "ADMChannelResponse",
}) as any as S.Schema<ADMChannelResponse>;
export interface DeleteAdmChannelResponse {
  ADMChannelResponse: ADMChannelResponse & { Platform: string };
}
export const DeleteAdmChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ADMChannelResponse: S.optional(ADMChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ADMChannelResponse" }),
  }),
).annotate({
  identifier: "DeleteAdmChannelResponse",
}) as any as S.Schema<DeleteAdmChannelResponse>;
export interface DeleteApnsChannelRequest {
  ApplicationId: string;
}
export const DeleteApnsChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/channels/apns",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApnsChannelRequest",
}) as any as S.Schema<DeleteApnsChannelRequest>;
export interface APNSChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  HasTokenKey?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export const APNSChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationDate: S.optional(S.String),
    DefaultAuthenticationMethod: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    HasCredential: S.optional(S.Boolean),
    HasTokenKey: S.optional(S.Boolean),
    Id: S.optional(S.String),
    IsArchived: S.optional(S.Boolean),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Platform: S.optional(S.String),
    Version: S.optional(S.Number),
  }),
).annotate({
  identifier: "APNSChannelResponse",
}) as any as S.Schema<APNSChannelResponse>;
export interface DeleteApnsChannelResponse {
  APNSChannelResponse: APNSChannelResponse & { Platform: string };
}
export const DeleteApnsChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSChannelResponse: S.optional(APNSChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSChannelResponse" }),
  }),
).annotate({
  identifier: "DeleteApnsChannelResponse",
}) as any as S.Schema<DeleteApnsChannelResponse>;
export interface DeleteApnsSandboxChannelRequest {
  ApplicationId: string;
}
export const DeleteApnsSandboxChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/channels/apns_sandbox",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApnsSandboxChannelRequest",
}) as any as S.Schema<DeleteApnsSandboxChannelRequest>;
export interface APNSSandboxChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  HasTokenKey?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export const APNSSandboxChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationDate: S.optional(S.String),
    DefaultAuthenticationMethod: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    HasCredential: S.optional(S.Boolean),
    HasTokenKey: S.optional(S.Boolean),
    Id: S.optional(S.String),
    IsArchived: S.optional(S.Boolean),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Platform: S.optional(S.String),
    Version: S.optional(S.Number),
  }),
).annotate({
  identifier: "APNSSandboxChannelResponse",
}) as any as S.Schema<APNSSandboxChannelResponse>;
export interface DeleteApnsSandboxChannelResponse {
  APNSSandboxChannelResponse: APNSSandboxChannelResponse & { Platform: string };
}
export const DeleteApnsSandboxChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSSandboxChannelResponse: S.optional(APNSSandboxChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSSandboxChannelResponse" }),
  }),
).annotate({
  identifier: "DeleteApnsSandboxChannelResponse",
}) as any as S.Schema<DeleteApnsSandboxChannelResponse>;
export interface DeleteApnsVoipChannelRequest {
  ApplicationId: string;
}
export const DeleteApnsVoipChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/channels/apns_voip",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApnsVoipChannelRequest",
}) as any as S.Schema<DeleteApnsVoipChannelRequest>;
export interface APNSVoipChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  HasTokenKey?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export const APNSVoipChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationDate: S.optional(S.String),
    DefaultAuthenticationMethod: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    HasCredential: S.optional(S.Boolean),
    HasTokenKey: S.optional(S.Boolean),
    Id: S.optional(S.String),
    IsArchived: S.optional(S.Boolean),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Platform: S.optional(S.String),
    Version: S.optional(S.Number),
  }),
).annotate({
  identifier: "APNSVoipChannelResponse",
}) as any as S.Schema<APNSVoipChannelResponse>;
export interface DeleteApnsVoipChannelResponse {
  APNSVoipChannelResponse: APNSVoipChannelResponse & { Platform: string };
}
export const DeleteApnsVoipChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSVoipChannelResponse: S.optional(APNSVoipChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSVoipChannelResponse" }),
  }),
).annotate({
  identifier: "DeleteApnsVoipChannelResponse",
}) as any as S.Schema<DeleteApnsVoipChannelResponse>;
export interface DeleteApnsVoipSandboxChannelRequest {
  ApplicationId: string;
}
export const DeleteApnsVoipSandboxChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/channels/apns_voip_sandbox",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteApnsVoipSandboxChannelRequest",
}) as any as S.Schema<DeleteApnsVoipSandboxChannelRequest>;
export interface APNSVoipSandboxChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  HasTokenKey?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export const APNSVoipSandboxChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationDate: S.optional(S.String),
    DefaultAuthenticationMethod: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    HasCredential: S.optional(S.Boolean),
    HasTokenKey: S.optional(S.Boolean),
    Id: S.optional(S.String),
    IsArchived: S.optional(S.Boolean),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Platform: S.optional(S.String),
    Version: S.optional(S.Number),
  }),
).annotate({
  identifier: "APNSVoipSandboxChannelResponse",
}) as any as S.Schema<APNSVoipSandboxChannelResponse>;
export interface DeleteApnsVoipSandboxChannelResponse {
  APNSVoipSandboxChannelResponse: APNSVoipSandboxChannelResponse & {
    Platform: string;
  };
}
export const DeleteApnsVoipSandboxChannelResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      APNSVoipSandboxChannelResponse: S.optional(APNSVoipSandboxChannelResponse)
        .pipe(T.HttpPayload())
        .annotate({ identifier: "APNSVoipSandboxChannelResponse" }),
    }),
).annotate({
  identifier: "DeleteApnsVoipSandboxChannelResponse",
}) as any as S.Schema<DeleteApnsVoipSandboxChannelResponse>;
export interface DeleteAppRequest {
  ApplicationId: string;
}
export const DeleteAppRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/apps/{ApplicationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAppRequest",
}) as any as S.Schema<DeleteAppRequest>;
export interface DeleteAppResponse {
  ApplicationResponse: ApplicationResponse & {
    Arn: string;
    Id: string;
    Name: string;
  };
}
export const DeleteAppResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationResponse: S.optional(ApplicationResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ApplicationResponse" }),
  }),
).annotate({
  identifier: "DeleteAppResponse",
}) as any as S.Schema<DeleteAppResponse>;
export interface DeleteBaiduChannelRequest {
  ApplicationId: string;
}
export const DeleteBaiduChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/channels/baidu",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBaiduChannelRequest",
}) as any as S.Schema<DeleteBaiduChannelRequest>;
export interface BaiduChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  Credential?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export const BaiduChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationDate: S.optional(S.String),
    Credential: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    HasCredential: S.optional(S.Boolean),
    Id: S.optional(S.String),
    IsArchived: S.optional(S.Boolean),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Platform: S.optional(S.String),
    Version: S.optional(S.Number),
  }),
).annotate({
  identifier: "BaiduChannelResponse",
}) as any as S.Schema<BaiduChannelResponse>;
export interface DeleteBaiduChannelResponse {
  BaiduChannelResponse: BaiduChannelResponse & {
    Credential: string;
    Platform: string;
  };
}
export const DeleteBaiduChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaiduChannelResponse: S.optional(BaiduChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "BaiduChannelResponse" }),
  }),
).annotate({
  identifier: "DeleteBaiduChannelResponse",
}) as any as S.Schema<DeleteBaiduChannelResponse>;
export interface DeleteCampaignRequest {
  ApplicationId: string;
  CampaignId: string;
}
export const DeleteCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    CampaignId: S.String.pipe(T.HttpLabel("CampaignId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/campaigns/{CampaignId}",
      }),
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
export interface DeleteCampaignResponse {
  CampaignResponse: CampaignResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    SegmentId: string;
    SegmentVersion: number;
    AdditionalTreatments: (TreatmentResource & {
      Id: string;
      SizePercent: number;
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
    CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
      DeliveryUri: string;
    };
    MessageConfiguration: MessageConfiguration & {
      InAppMessage: CampaignInAppMessage & {
        Content: (InAppMessageContent & {
          BodyConfig: InAppMessageBodyConfig & {
            Alignment: Alignment;
            Body: string;
            TextColor: string;
          };
          HeaderConfig: InAppMessageHeaderConfig & {
            Alignment: Alignment;
            Header: string;
            TextColor: string;
          };
          PrimaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
          SecondaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
        })[];
      };
    };
    Schedule: Schedule & {
      StartTime: string;
      EventFilter: CampaignEventFilter & {
        Dimensions: EventDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          EventType: SetDimension & { Values: ListOf__string };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
        };
        FilterType: FilterType;
      };
    };
  };
}
export const DeleteCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignResponse: S.optional(CampaignResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CampaignResponse" }),
  }),
).annotate({
  identifier: "DeleteCampaignResponse",
}) as any as S.Schema<DeleteCampaignResponse>;
export interface DeleteEmailChannelRequest {
  ApplicationId: string;
}
export const DeleteEmailChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/channels/email",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEmailChannelRequest",
}) as any as S.Schema<DeleteEmailChannelRequest>;
export interface EmailChannelResponse {
  ApplicationId?: string;
  ConfigurationSet?: string;
  CreationDate?: string;
  Enabled?: boolean;
  FromAddress?: string;
  HasCredential?: boolean;
  Id?: string;
  Identity?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  MessagesPerSecond?: number;
  Platform?: string;
  RoleArn?: string;
  OrchestrationSendingRoleArn?: string;
  Version?: number;
}
export const EmailChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    ConfigurationSet: S.optional(S.String),
    CreationDate: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    FromAddress: S.optional(S.String),
    HasCredential: S.optional(S.Boolean),
    Id: S.optional(S.String),
    Identity: S.optional(S.String),
    IsArchived: S.optional(S.Boolean),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    MessagesPerSecond: S.optional(S.Number),
    Platform: S.optional(S.String),
    RoleArn: S.optional(S.String),
    OrchestrationSendingRoleArn: S.optional(S.String),
    Version: S.optional(S.Number),
  }),
).annotate({
  identifier: "EmailChannelResponse",
}) as any as S.Schema<EmailChannelResponse>;
export interface DeleteEmailChannelResponse {
  EmailChannelResponse: EmailChannelResponse & { Platform: string };
}
export const DeleteEmailChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailChannelResponse: S.optional(EmailChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EmailChannelResponse" }),
  }),
).annotate({
  identifier: "DeleteEmailChannelResponse",
}) as any as S.Schema<DeleteEmailChannelResponse>;
export interface DeleteEmailTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export const DeleteEmailTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/templates/{TemplateName}/email" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEmailTemplateRequest",
}) as any as S.Schema<DeleteEmailTemplateRequest>;
export interface MessageBody {
  Message?: string;
  RequestID?: string;
}
export const MessageBody = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String), RequestID: S.optional(S.String) }),
).annotate({ identifier: "MessageBody" }) as any as S.Schema<MessageBody>;
export interface DeleteEmailTemplateResponse {
  MessageBody: MessageBody;
}
export const DeleteEmailTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "DeleteEmailTemplateResponse",
}) as any as S.Schema<DeleteEmailTemplateResponse>;
export interface DeleteEndpointRequest {
  ApplicationId: string;
  EndpointId: string;
}
export const DeleteEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EndpointId: S.String.pipe(T.HttpLabel("EndpointId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/endpoints/{EndpointId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEndpointRequest",
}) as any as S.Schema<DeleteEndpointRequest>;
export type MapOfListOf__string = { [key: string]: string[] | undefined };
export const MapOfListOf__string = /*@__PURE__*/ S.Record(
  S.String,
  ListOf__string.pipe(S.optional),
);
export type ChannelType =
  | "PUSH"
  | "GCM"
  | "APNS"
  | "APNS_SANDBOX"
  | "APNS_VOIP"
  | "APNS_VOIP_SANDBOX"
  | "ADM"
  | "SMS"
  | "VOICE"
  | "EMAIL"
  | "BAIDU"
  | "CUSTOM"
  | "IN_APP"
  | (string & {});
export const ChannelType = S.String;

export interface EndpointDemographic {
  AppVersion?: string;
  Locale?: string;
  Make?: string;
  Model?: string;
  ModelVersion?: string;
  Platform?: string;
  PlatformVersion?: string;
  Timezone?: string;
}
export const EndpointDemographic = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppVersion: S.optional(S.String),
    Locale: S.optional(S.String),
    Make: S.optional(S.String),
    Model: S.optional(S.String),
    ModelVersion: S.optional(S.String),
    Platform: S.optional(S.String),
    PlatformVersion: S.optional(S.String),
    Timezone: S.optional(S.String),
  }),
).annotate({
  identifier: "EndpointDemographic",
}) as any as S.Schema<EndpointDemographic>;
export interface EndpointLocation {
  City?: string;
  Country?: string;
  Latitude?: number;
  Longitude?: number;
  PostalCode?: string;
  Region?: string;
}
export const EndpointLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    City: S.optional(S.String),
    Country: S.optional(S.String),
    Latitude: S.optional(S.Number),
    Longitude: S.optional(S.Number),
    PostalCode: S.optional(S.String),
    Region: S.optional(S.String),
  }),
).annotate({
  identifier: "EndpointLocation",
}) as any as S.Schema<EndpointLocation>;
export type MapOf__double = { [key: string]: number | undefined };
export const MapOf__double = /*@__PURE__*/ S.Record(
  S.String,
  S.Number.pipe(S.optional),
);
export interface EndpointUser {
  UserAttributes?: { [key: string]: string[] | undefined };
  UserId?: string;
}
export const EndpointUser = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserAttributes: S.optional(MapOfListOf__string),
    UserId: S.optional(S.String),
  }),
).annotate({ identifier: "EndpointUser" }) as any as S.Schema<EndpointUser>;
export interface EndpointResponse {
  Address?: string;
  ApplicationId?: string;
  Attributes?: { [key: string]: string[] | undefined };
  ChannelType?: ChannelType;
  CohortId?: string;
  CreationDate?: string;
  Demographic?: EndpointDemographic;
  EffectiveDate?: string;
  EndpointStatus?: string;
  Id?: string;
  Location?: EndpointLocation;
  Metrics?: { [key: string]: number | undefined };
  OptOut?: string;
  RequestId?: string;
  User?: EndpointUser;
}
export const EndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: S.optional(S.String),
    ApplicationId: S.optional(S.String),
    Attributes: S.optional(MapOfListOf__string),
    ChannelType: S.optional(ChannelType),
    CohortId: S.optional(S.String),
    CreationDate: S.optional(S.String),
    Demographic: S.optional(EndpointDemographic),
    EffectiveDate: S.optional(S.String),
    EndpointStatus: S.optional(S.String),
    Id: S.optional(S.String),
    Location: S.optional(EndpointLocation),
    Metrics: S.optional(MapOf__double),
    OptOut: S.optional(S.String),
    RequestId: S.optional(S.String),
    User: S.optional(EndpointUser),
  }),
).annotate({
  identifier: "EndpointResponse",
}) as any as S.Schema<EndpointResponse>;
export interface DeleteEndpointResponse {
  EndpointResponse: EndpointResponse;
}
export const DeleteEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointResponse: S.optional(EndpointResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EndpointResponse" }),
  }),
).annotate({
  identifier: "DeleteEndpointResponse",
}) as any as S.Schema<DeleteEndpointResponse>;
export interface DeleteEventStreamRequest {
  ApplicationId: string;
}
export const DeleteEventStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/apps/{ApplicationId}/eventstream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEventStreamRequest",
}) as any as S.Schema<DeleteEventStreamRequest>;
export interface EventStream {
  ApplicationId?: string;
  DestinationStreamArn?: string;
  ExternalId?: string;
  LastModifiedDate?: string;
  LastUpdatedBy?: string;
  RoleArn?: string;
}
export const EventStream = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    DestinationStreamArn: S.optional(S.String),
    ExternalId: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    LastUpdatedBy: S.optional(S.String),
    RoleArn: S.optional(S.String),
  }),
).annotate({ identifier: "EventStream" }) as any as S.Schema<EventStream>;
export interface DeleteEventStreamResponse {
  EventStream: EventStream & {
    ApplicationId: string;
    DestinationStreamArn: string;
    RoleArn: string;
  };
}
export const DeleteEventStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventStream: S.optional(EventStream)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EventStream" }),
  }),
).annotate({
  identifier: "DeleteEventStreamResponse",
}) as any as S.Schema<DeleteEventStreamResponse>;
export interface DeleteGcmChannelRequest {
  ApplicationId: string;
}
export const DeleteGcmChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/channels/gcm",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteGcmChannelRequest",
}) as any as S.Schema<DeleteGcmChannelRequest>;
export interface GCMChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  Credential?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  HasFcmServiceCredentials?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export const GCMChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationDate: S.optional(S.String),
    Credential: S.optional(S.String),
    DefaultAuthenticationMethod: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    HasCredential: S.optional(S.Boolean),
    HasFcmServiceCredentials: S.optional(S.Boolean),
    Id: S.optional(S.String),
    IsArchived: S.optional(S.Boolean),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Platform: S.optional(S.String),
    Version: S.optional(S.Number),
  }),
).annotate({
  identifier: "GCMChannelResponse",
}) as any as S.Schema<GCMChannelResponse>;
export interface DeleteGcmChannelResponse {
  GCMChannelResponse: GCMChannelResponse & { Platform: string };
}
export const DeleteGcmChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GCMChannelResponse: S.optional(GCMChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "GCMChannelResponse" }),
  }),
).annotate({
  identifier: "DeleteGcmChannelResponse",
}) as any as S.Schema<DeleteGcmChannelResponse>;
export interface DeleteInAppTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export const DeleteInAppTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/templates/{TemplateName}/inapp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInAppTemplateRequest",
}) as any as S.Schema<DeleteInAppTemplateRequest>;
export interface DeleteInAppTemplateResponse {
  MessageBody: MessageBody;
}
export const DeleteInAppTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "DeleteInAppTemplateResponse",
}) as any as S.Schema<DeleteInAppTemplateResponse>;
export interface DeleteJourneyRequest {
  ApplicationId: string;
  JourneyId: string;
}
export const DeleteJourneyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    JourneyId: S.String.pipe(T.HttpLabel("JourneyId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/journeys/{JourneyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteJourneyRequest",
}) as any as S.Schema<DeleteJourneyRequest>;
export interface DeleteJourneyResponse {
  JourneyResponse: JourneyResponse & {
    ApplicationId: string;
    Id: string;
    Name: string;
    Activities: {
      [key: string]:
        | (Activity & {
            ConditionalSplit: ConditionalSplitActivity & {
              Condition: Condition & {
                Conditions: (SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                })[];
              };
            };
            Holdout: HoldoutActivity & { Percentage: number };
            MultiCondition: MultiConditionalSplitActivity & {
              Branches: (MultiConditionalBranch & {
                Condition: SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                };
              })[];
            };
          })
        | undefined;
    };
    StartCondition: StartCondition & {
      EventStartCondition: EventStartCondition & {
        EventFilter: EventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
      SegmentStartCondition: SegmentCondition & { SegmentId: string };
    };
  };
}
export const DeleteJourneyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JourneyResponse: S.optional(JourneyResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "JourneyResponse" }),
  }),
).annotate({
  identifier: "DeleteJourneyResponse",
}) as any as S.Schema<DeleteJourneyResponse>;
export interface DeletePushTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export const DeletePushTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/templates/{TemplateName}/push" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePushTemplateRequest",
}) as any as S.Schema<DeletePushTemplateRequest>;
export interface DeletePushTemplateResponse {
  MessageBody: MessageBody;
}
export const DeletePushTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "DeletePushTemplateResponse",
}) as any as S.Schema<DeletePushTemplateResponse>;
export interface DeleteRecommenderConfigurationRequest {
  RecommenderId: string;
}
export const DeleteRecommenderConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RecommenderId: S.String.pipe(T.HttpLabel("RecommenderId")),
    }).pipe(
      T.all(
        T.Http({ method: "DELETE", uri: "/v1/recommenders/{RecommenderId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteRecommenderConfigurationRequest",
}) as any as S.Schema<DeleteRecommenderConfigurationRequest>;
export interface DeleteRecommenderConfigurationResponse {
  RecommenderConfigurationResponse: RecommenderConfigurationResponse & {
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    RecommendationProviderRoleArn: string;
    RecommendationProviderUri: string;
  };
}
export const DeleteRecommenderConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RecommenderConfigurationResponse: S.optional(
        RecommenderConfigurationResponse,
      )
        .pipe(T.HttpPayload())
        .annotate({ identifier: "RecommenderConfigurationResponse" }),
    }),
).annotate({
  identifier: "DeleteRecommenderConfigurationResponse",
}) as any as S.Schema<DeleteRecommenderConfigurationResponse>;
export interface DeleteSegmentRequest {
  ApplicationId: string;
  SegmentId: string;
}
export const DeleteSegmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    SegmentId: S.String.pipe(T.HttpLabel("SegmentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/segments/{SegmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSegmentRequest",
}) as any as S.Schema<DeleteSegmentRequest>;
export interface DeleteSegmentResponse {
  SegmentResponse: SegmentResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    SegmentType: SegmentType;
    Dimensions: SegmentDimensions & {
      Attributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
      Behavior: SegmentBehaviors & {
        Recency: RecencyDimension & {
          Duration: Duration;
          RecencyType: RecencyType;
        };
      };
      Demographic: SegmentDemographics & {
        AppVersion: SetDimension & { Values: ListOf__string };
        Channel: SetDimension & { Values: ListOf__string };
        DeviceType: SetDimension & { Values: ListOf__string };
        Make: SetDimension & { Values: ListOf__string };
        Model: SetDimension & { Values: ListOf__string };
        Platform: SetDimension & { Values: ListOf__string };
      };
      Location: SegmentLocation & {
        Country: SetDimension & { Values: ListOf__string };
        GPSPoint: GPSPointDimension & {
          Coordinates: GPSCoordinates & { Latitude: number; Longitude: number };
        };
      };
      Metrics: {
        [key: string]:
          | (MetricDimension & { ComparisonOperator: string; Value: number })
          | undefined;
      };
      UserAttributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
    };
    ImportDefinition: SegmentImportResource & {
      ExternalId: string;
      Format: Format;
      RoleArn: string;
      S3Url: string;
      Size: number;
    };
    SegmentGroups: SegmentGroupList & {
      Groups: (SegmentGroup & {
        Dimensions: (SegmentDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          Behavior: SegmentBehaviors & {
            Recency: RecencyDimension & {
              Duration: Duration;
              RecencyType: RecencyType;
            };
          };
          Demographic: SegmentDemographics & {
            AppVersion: SetDimension & { Values: ListOf__string };
            Channel: SetDimension & { Values: ListOf__string };
            DeviceType: SetDimension & { Values: ListOf__string };
            Make: SetDimension & { Values: ListOf__string };
            Model: SetDimension & { Values: ListOf__string };
            Platform: SetDimension & { Values: ListOf__string };
          };
          Location: SegmentLocation & {
            Country: SetDimension & { Values: ListOf__string };
            GPSPoint: GPSPointDimension & {
              Coordinates: GPSCoordinates & {
                Latitude: number;
                Longitude: number;
              };
            };
          };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
          UserAttributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
        })[];
        SourceSegments: (SegmentReference & { Id: string })[];
      })[];
    };
  };
}
export const DeleteSegmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SegmentResponse: S.optional(SegmentResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SegmentResponse" }),
  }),
).annotate({
  identifier: "DeleteSegmentResponse",
}) as any as S.Schema<DeleteSegmentResponse>;
export interface DeleteSmsChannelRequest {
  ApplicationId: string;
}
export const DeleteSmsChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/channels/sms",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSmsChannelRequest",
}) as any as S.Schema<DeleteSmsChannelRequest>;
export interface SMSChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  PromotionalMessagesPerSecond?: number;
  SenderId?: string;
  ShortCode?: string;
  TransactionalMessagesPerSecond?: number;
  Version?: number;
}
export const SMSChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationDate: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    HasCredential: S.optional(S.Boolean),
    Id: S.optional(S.String),
    IsArchived: S.optional(S.Boolean),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Platform: S.optional(S.String),
    PromotionalMessagesPerSecond: S.optional(S.Number),
    SenderId: S.optional(S.String),
    ShortCode: S.optional(S.String),
    TransactionalMessagesPerSecond: S.optional(S.Number),
    Version: S.optional(S.Number),
  }),
).annotate({
  identifier: "SMSChannelResponse",
}) as any as S.Schema<SMSChannelResponse>;
export interface DeleteSmsChannelResponse {
  SMSChannelResponse: SMSChannelResponse & { Platform: string };
}
export const DeleteSmsChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SMSChannelResponse: S.optional(SMSChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SMSChannelResponse" }),
  }),
).annotate({
  identifier: "DeleteSmsChannelResponse",
}) as any as S.Schema<DeleteSmsChannelResponse>;
export interface DeleteSmsTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export const DeleteSmsTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/templates/{TemplateName}/sms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSmsTemplateRequest",
}) as any as S.Schema<DeleteSmsTemplateRequest>;
export interface DeleteSmsTemplateResponse {
  MessageBody: MessageBody;
}
export const DeleteSmsTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "DeleteSmsTemplateResponse",
}) as any as S.Schema<DeleteSmsTemplateResponse>;
export interface DeleteUserEndpointsRequest {
  ApplicationId: string;
  UserId: string;
}
export const DeleteUserEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    UserId: S.String.pipe(T.HttpLabel("UserId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/users/{UserId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteUserEndpointsRequest",
}) as any as S.Schema<DeleteUserEndpointsRequest>;
export type ListOfEndpointResponse = EndpointResponse[];
export const ListOfEndpointResponse = /*@__PURE__*/ S.Array(EndpointResponse);
export interface EndpointsResponse {
  Item?: EndpointResponse[];
}
export const EndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Item: S.optional(ListOfEndpointResponse) }),
).annotate({
  identifier: "EndpointsResponse",
}) as any as S.Schema<EndpointsResponse>;
export interface DeleteUserEndpointsResponse {
  EndpointsResponse: EndpointsResponse & { Item: ListOfEndpointResponse };
}
export const DeleteUserEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointsResponse: S.optional(EndpointsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EndpointsResponse" }),
  }),
).annotate({
  identifier: "DeleteUserEndpointsResponse",
}) as any as S.Schema<DeleteUserEndpointsResponse>;
export interface DeleteVoiceChannelRequest {
  ApplicationId: string;
}
export const DeleteVoiceChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/v1/apps/{ApplicationId}/channels/voice",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVoiceChannelRequest",
}) as any as S.Schema<DeleteVoiceChannelRequest>;
export interface VoiceChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Platform?: string;
  Version?: number;
}
export const VoiceChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationDate: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    HasCredential: S.optional(S.Boolean),
    Id: S.optional(S.String),
    IsArchived: S.optional(S.Boolean),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Platform: S.optional(S.String),
    Version: S.optional(S.Number),
  }),
).annotate({
  identifier: "VoiceChannelResponse",
}) as any as S.Schema<VoiceChannelResponse>;
export interface DeleteVoiceChannelResponse {
  VoiceChannelResponse: VoiceChannelResponse & { Platform: string };
}
export const DeleteVoiceChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VoiceChannelResponse: S.optional(VoiceChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "VoiceChannelResponse" }),
  }),
).annotate({
  identifier: "DeleteVoiceChannelResponse",
}) as any as S.Schema<DeleteVoiceChannelResponse>;
export interface DeleteVoiceTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export const DeleteVoiceTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/templates/{TemplateName}/voice" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVoiceTemplateRequest",
}) as any as S.Schema<DeleteVoiceTemplateRequest>;
export interface DeleteVoiceTemplateResponse {
  MessageBody: MessageBody;
}
export const DeleteVoiceTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "DeleteVoiceTemplateResponse",
}) as any as S.Schema<DeleteVoiceTemplateResponse>;
export interface GetAdmChannelRequest {
  ApplicationId: string;
}
export const GetAdmChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/channels/adm" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAdmChannelRequest",
}) as any as S.Schema<GetAdmChannelRequest>;
export interface GetAdmChannelResponse {
  ADMChannelResponse: ADMChannelResponse & { Platform: string };
}
export const GetAdmChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ADMChannelResponse: S.optional(ADMChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ADMChannelResponse" }),
  }),
).annotate({
  identifier: "GetAdmChannelResponse",
}) as any as S.Schema<GetAdmChannelResponse>;
export interface GetApnsChannelRequest {
  ApplicationId: string;
}
export const GetApnsChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/channels/apns" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApnsChannelRequest",
}) as any as S.Schema<GetApnsChannelRequest>;
export interface GetApnsChannelResponse {
  APNSChannelResponse: APNSChannelResponse & { Platform: string };
}
export const GetApnsChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSChannelResponse: S.optional(APNSChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSChannelResponse" }),
  }),
).annotate({
  identifier: "GetApnsChannelResponse",
}) as any as S.Schema<GetApnsChannelResponse>;
export interface GetApnsSandboxChannelRequest {
  ApplicationId: string;
}
export const GetApnsSandboxChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/channels/apns_sandbox",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApnsSandboxChannelRequest",
}) as any as S.Schema<GetApnsSandboxChannelRequest>;
export interface GetApnsSandboxChannelResponse {
  APNSSandboxChannelResponse: APNSSandboxChannelResponse & { Platform: string };
}
export const GetApnsSandboxChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSSandboxChannelResponse: S.optional(APNSSandboxChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSSandboxChannelResponse" }),
  }),
).annotate({
  identifier: "GetApnsSandboxChannelResponse",
}) as any as S.Schema<GetApnsSandboxChannelResponse>;
export interface GetApnsVoipChannelRequest {
  ApplicationId: string;
}
export const GetApnsVoipChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/channels/apns_voip",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApnsVoipChannelRequest",
}) as any as S.Schema<GetApnsVoipChannelRequest>;
export interface GetApnsVoipChannelResponse {
  APNSVoipChannelResponse: APNSVoipChannelResponse & { Platform: string };
}
export const GetApnsVoipChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSVoipChannelResponse: S.optional(APNSVoipChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSVoipChannelResponse" }),
  }),
).annotate({
  identifier: "GetApnsVoipChannelResponse",
}) as any as S.Schema<GetApnsVoipChannelResponse>;
export interface GetApnsVoipSandboxChannelRequest {
  ApplicationId: string;
}
export const GetApnsVoipSandboxChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/channels/apns_voip_sandbox",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApnsVoipSandboxChannelRequest",
}) as any as S.Schema<GetApnsVoipSandboxChannelRequest>;
export interface GetApnsVoipSandboxChannelResponse {
  APNSVoipSandboxChannelResponse: APNSVoipSandboxChannelResponse & {
    Platform: string;
  };
}
export const GetApnsVoipSandboxChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSVoipSandboxChannelResponse: S.optional(APNSVoipSandboxChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSVoipSandboxChannelResponse" }),
  }),
).annotate({
  identifier: "GetApnsVoipSandboxChannelResponse",
}) as any as S.Schema<GetApnsVoipSandboxChannelResponse>;
export interface GetAppRequest {
  ApplicationId: string;
}
export const GetAppRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetAppRequest" }) as any as S.Schema<GetAppRequest>;
export interface GetAppResponse {
  ApplicationResponse: ApplicationResponse & {
    Arn: string;
    Id: string;
    Name: string;
  };
}
export const GetAppResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationResponse: S.optional(ApplicationResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ApplicationResponse" }),
  }),
).annotate({ identifier: "GetAppResponse" }) as any as S.Schema<GetAppResponse>;
export interface GetApplicationDateRangeKpiRequest {
  ApplicationId: string;
  EndTime?: Date;
  KpiName: string;
  NextToken?: string;
  PageSize?: string;
  StartTime?: Date;
}
export const GetApplicationDateRangeKpiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("end-time")),
    KpiName: S.String.pipe(T.HttpLabel("KpiName")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("start-time")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/kpis/daterange/{KpiName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApplicationDateRangeKpiRequest",
}) as any as S.Schema<GetApplicationDateRangeKpiRequest>;
export interface ResultRowValue {
  Key?: string;
  Type?: string;
  Value?: string;
}
export const ResultRowValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(S.String),
    Type: S.optional(S.String),
    Value: S.optional(S.String),
  }),
).annotate({ identifier: "ResultRowValue" }) as any as S.Schema<ResultRowValue>;
export type ListOfResultRowValue = ResultRowValue[];
export const ListOfResultRowValue = /*@__PURE__*/ S.Array(ResultRowValue);
export interface ResultRow {
  GroupedBys?: ResultRowValue[];
  Values?: ResultRowValue[];
}
export const ResultRow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupedBys: S.optional(ListOfResultRowValue),
    Values: S.optional(ListOfResultRowValue),
  }),
).annotate({ identifier: "ResultRow" }) as any as S.Schema<ResultRow>;
export type ListOfResultRow = ResultRow[];
export const ListOfResultRow = /*@__PURE__*/ S.Array(ResultRow);
export interface BaseKpiResult {
  Rows?: ResultRow[];
}
export const BaseKpiResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rows: S.optional(ListOfResultRow) }),
).annotate({ identifier: "BaseKpiResult" }) as any as S.Schema<BaseKpiResult>;
export interface ApplicationDateRangeKpiResponse {
  ApplicationId?: string;
  EndTime?: Date;
  KpiName?: string;
  KpiResult?: BaseKpiResult;
  NextToken?: string;
  StartTime?: Date;
}
export const ApplicationDateRangeKpiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    KpiName: S.optional(S.String),
    KpiResult: S.optional(BaseKpiResult),
    NextToken: S.optional(S.String),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ApplicationDateRangeKpiResponse",
}) as any as S.Schema<ApplicationDateRangeKpiResponse>;
export interface GetApplicationDateRangeKpiResponse {
  ApplicationDateRangeKpiResponse: ApplicationDateRangeKpiResponse & {
    ApplicationId: string;
    EndTime: __timestampIso8601;
    KpiName: string;
    KpiResult: BaseKpiResult & {
      Rows: (ResultRow & {
        GroupedBys: (ResultRowValue & {
          Key: string;
          Type: string;
          Value: string;
        })[];
        Values: (ResultRowValue & {
          Key: string;
          Type: string;
          Value: string;
        })[];
      })[];
    };
    StartTime: __timestampIso8601;
  };
}
export const GetApplicationDateRangeKpiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationDateRangeKpiResponse: S.optional(ApplicationDateRangeKpiResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ApplicationDateRangeKpiResponse" }),
  }),
).annotate({
  identifier: "GetApplicationDateRangeKpiResponse",
}) as any as S.Schema<GetApplicationDateRangeKpiResponse>;
export interface GetApplicationSettingsRequest {
  ApplicationId: string;
}
export const GetApplicationSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetApplicationSettingsRequest",
}) as any as S.Schema<GetApplicationSettingsRequest>;
export interface ApplicationSettingsJourneyLimits {
  DailyCap?: number;
  TimeframeCap?: JourneyTimeframeCap;
  TotalCap?: number;
}
export const ApplicationSettingsJourneyLimits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DailyCap: S.optional(S.Number),
    TimeframeCap: S.optional(JourneyTimeframeCap),
    TotalCap: S.optional(S.Number),
  }),
).annotate({
  identifier: "ApplicationSettingsJourneyLimits",
}) as any as S.Schema<ApplicationSettingsJourneyLimits>;
export interface ApplicationSettingsResource {
  ApplicationId?: string;
  CampaignHook?: CampaignHook;
  LastModifiedDate?: string;
  Limits?: CampaignLimits;
  QuietTime?: QuietTime;
  JourneyLimits?: ApplicationSettingsJourneyLimits;
}
export const ApplicationSettingsResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CampaignHook: S.optional(CampaignHook),
    LastModifiedDate: S.optional(S.String),
    Limits: S.optional(CampaignLimits),
    QuietTime: S.optional(QuietTime),
    JourneyLimits: S.optional(ApplicationSettingsJourneyLimits),
  }),
).annotate({
  identifier: "ApplicationSettingsResource",
}) as any as S.Schema<ApplicationSettingsResource>;
export interface GetApplicationSettingsResponse {
  ApplicationSettingsResource: ApplicationSettingsResource & {
    ApplicationId: string;
  };
}
export const GetApplicationSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationSettingsResource: S.optional(ApplicationSettingsResource)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ApplicationSettingsResource" }),
  }),
).annotate({
  identifier: "GetApplicationSettingsResponse",
}) as any as S.Schema<GetApplicationSettingsResponse>;
export interface GetAppsRequest {
  PageSize?: string;
  Token?: string;
}
export const GetAppsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetAppsRequest" }) as any as S.Schema<GetAppsRequest>;
export type ListOfApplicationResponse = ApplicationResponse[];
export const ListOfApplicationResponse =
  /*@__PURE__*/ S.Array(ApplicationResponse);
export interface ApplicationsResponse {
  Item?: ApplicationResponse[];
  NextToken?: string;
}
export const ApplicationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: S.optional(ListOfApplicationResponse),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ApplicationsResponse",
}) as any as S.Schema<ApplicationsResponse>;
export interface GetAppsResponse {
  ApplicationsResponse: ApplicationsResponse & {
    Item: (ApplicationResponse & { Arn: string; Id: string; Name: string })[];
  };
}
export const GetAppsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationsResponse: S.optional(ApplicationsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ApplicationsResponse" }),
  }),
).annotate({
  identifier: "GetAppsResponse",
}) as any as S.Schema<GetAppsResponse>;
export interface GetBaiduChannelRequest {
  ApplicationId: string;
}
export const GetBaiduChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/channels/baidu" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBaiduChannelRequest",
}) as any as S.Schema<GetBaiduChannelRequest>;
export interface GetBaiduChannelResponse {
  BaiduChannelResponse: BaiduChannelResponse & {
    Credential: string;
    Platform: string;
  };
}
export const GetBaiduChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaiduChannelResponse: S.optional(BaiduChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "BaiduChannelResponse" }),
  }),
).annotate({
  identifier: "GetBaiduChannelResponse",
}) as any as S.Schema<GetBaiduChannelResponse>;
export interface GetCampaignRequest {
  ApplicationId: string;
  CampaignId: string;
}
export const GetCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    CampaignId: S.String.pipe(T.HttpLabel("CampaignId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/campaigns/{CampaignId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCampaignRequest",
}) as any as S.Schema<GetCampaignRequest>;
export interface GetCampaignResponse {
  CampaignResponse: CampaignResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    SegmentId: string;
    SegmentVersion: number;
    AdditionalTreatments: (TreatmentResource & {
      Id: string;
      SizePercent: number;
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
    CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
      DeliveryUri: string;
    };
    MessageConfiguration: MessageConfiguration & {
      InAppMessage: CampaignInAppMessage & {
        Content: (InAppMessageContent & {
          BodyConfig: InAppMessageBodyConfig & {
            Alignment: Alignment;
            Body: string;
            TextColor: string;
          };
          HeaderConfig: InAppMessageHeaderConfig & {
            Alignment: Alignment;
            Header: string;
            TextColor: string;
          };
          PrimaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
          SecondaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
        })[];
      };
    };
    Schedule: Schedule & {
      StartTime: string;
      EventFilter: CampaignEventFilter & {
        Dimensions: EventDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          EventType: SetDimension & { Values: ListOf__string };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
        };
        FilterType: FilterType;
      };
    };
  };
}
export const GetCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignResponse: S.optional(CampaignResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CampaignResponse" }),
  }),
).annotate({
  identifier: "GetCampaignResponse",
}) as any as S.Schema<GetCampaignResponse>;
export interface GetCampaignActivitiesRequest {
  ApplicationId: string;
  CampaignId: string;
  PageSize?: string;
  Token?: string;
}
export const GetCampaignActivitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    CampaignId: S.String.pipe(T.HttpLabel("CampaignId")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/campaigns/{CampaignId}/activities",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCampaignActivitiesRequest",
}) as any as S.Schema<GetCampaignActivitiesRequest>;
export interface ActivityResponse {
  ApplicationId?: string;
  CampaignId?: string;
  End?: string;
  Id?: string;
  Result?: string;
  ScheduledStart?: string;
  Start?: string;
  State?: string;
  SuccessfulEndpointCount?: number;
  TimezonesCompletedCount?: number;
  TimezonesTotalCount?: number;
  TotalEndpointCount?: number;
  TreatmentId?: string;
  ExecutionMetrics?: { [key: string]: string | undefined };
}
export const ActivityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CampaignId: S.optional(S.String),
    End: S.optional(S.String),
    Id: S.optional(S.String),
    Result: S.optional(S.String),
    ScheduledStart: S.optional(S.String),
    Start: S.optional(S.String),
    State: S.optional(S.String),
    SuccessfulEndpointCount: S.optional(S.Number),
    TimezonesCompletedCount: S.optional(S.Number),
    TimezonesTotalCount: S.optional(S.Number),
    TotalEndpointCount: S.optional(S.Number),
    TreatmentId: S.optional(S.String),
    ExecutionMetrics: S.optional(MapOf__string),
  }),
).annotate({
  identifier: "ActivityResponse",
}) as any as S.Schema<ActivityResponse>;
export type ListOfActivityResponse = ActivityResponse[];
export const ListOfActivityResponse = /*@__PURE__*/ S.Array(ActivityResponse);
export interface ActivitiesResponse {
  Item?: ActivityResponse[];
  NextToken?: string;
}
export const ActivitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: S.optional(ListOfActivityResponse),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ActivitiesResponse",
}) as any as S.Schema<ActivitiesResponse>;
export interface GetCampaignActivitiesResponse {
  ActivitiesResponse: ActivitiesResponse & {
    Item: (ActivityResponse & {
      ApplicationId: string;
      CampaignId: string;
      Id: string;
    })[];
  };
}
export const GetCampaignActivitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActivitiesResponse: S.optional(ActivitiesResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ActivitiesResponse" }),
  }),
).annotate({
  identifier: "GetCampaignActivitiesResponse",
}) as any as S.Schema<GetCampaignActivitiesResponse>;
export interface GetCampaignDateRangeKpiRequest {
  ApplicationId: string;
  CampaignId: string;
  EndTime?: Date;
  KpiName: string;
  NextToken?: string;
  PageSize?: string;
  StartTime?: Date;
}
export const GetCampaignDateRangeKpiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    CampaignId: S.String.pipe(T.HttpLabel("CampaignId")),
    EndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("end-time")),
    KpiName: S.String.pipe(T.HttpLabel("KpiName")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("start-time")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/campaigns/{CampaignId}/kpis/daterange/{KpiName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCampaignDateRangeKpiRequest",
}) as any as S.Schema<GetCampaignDateRangeKpiRequest>;
export interface CampaignDateRangeKpiResponse {
  ApplicationId?: string;
  CampaignId?: string;
  EndTime?: Date;
  KpiName?: string;
  KpiResult?: BaseKpiResult;
  NextToken?: string;
  StartTime?: Date;
}
export const CampaignDateRangeKpiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CampaignId: S.optional(S.String),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    KpiName: S.optional(S.String),
    KpiResult: S.optional(BaseKpiResult),
    NextToken: S.optional(S.String),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "CampaignDateRangeKpiResponse",
}) as any as S.Schema<CampaignDateRangeKpiResponse>;
export interface GetCampaignDateRangeKpiResponse {
  CampaignDateRangeKpiResponse: CampaignDateRangeKpiResponse & {
    ApplicationId: string;
    CampaignId: string;
    EndTime: __timestampIso8601;
    KpiName: string;
    KpiResult: BaseKpiResult & {
      Rows: (ResultRow & {
        GroupedBys: (ResultRowValue & {
          Key: string;
          Type: string;
          Value: string;
        })[];
        Values: (ResultRowValue & {
          Key: string;
          Type: string;
          Value: string;
        })[];
      })[];
    };
    StartTime: __timestampIso8601;
  };
}
export const GetCampaignDateRangeKpiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignDateRangeKpiResponse: S.optional(CampaignDateRangeKpiResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CampaignDateRangeKpiResponse" }),
  }),
).annotate({
  identifier: "GetCampaignDateRangeKpiResponse",
}) as any as S.Schema<GetCampaignDateRangeKpiResponse>;
export interface GetCampaignsRequest {
  ApplicationId: string;
  PageSize?: string;
  Token?: string;
}
export const GetCampaignsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/campaigns" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCampaignsRequest",
}) as any as S.Schema<GetCampaignsRequest>;
export type ListOfCampaignResponse = CampaignResponse[];
export const ListOfCampaignResponse = /*@__PURE__*/ S.Array(CampaignResponse);
export interface CampaignsResponse {
  Item?: CampaignResponse[];
  NextToken?: string;
}
export const CampaignsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: S.optional(ListOfCampaignResponse),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "CampaignsResponse",
}) as any as S.Schema<CampaignsResponse>;
export interface GetCampaignsResponse {
  CampaignsResponse: CampaignsResponse & {
    Item: (CampaignResponse & {
      ApplicationId: string;
      Arn: string;
      CreationDate: string;
      Id: string;
      LastModifiedDate: string;
      SegmentId: string;
      SegmentVersion: number;
      AdditionalTreatments: (TreatmentResource & {
        Id: string;
        SizePercent: number;
        CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
          DeliveryUri: string;
        };
        MessageConfiguration: MessageConfiguration & {
          InAppMessage: CampaignInAppMessage & {
            Content: (InAppMessageContent & {
              BodyConfig: InAppMessageBodyConfig & {
                Alignment: Alignment;
                Body: string;
                TextColor: string;
              };
              HeaderConfig: InAppMessageHeaderConfig & {
                Alignment: Alignment;
                Header: string;
                TextColor: string;
              };
              PrimaryBtn: InAppMessageButton & {
                Android: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                DefaultConfig: DefaultButtonConfiguration & {
                  ButtonAction: ButtonAction;
                  Text: string;
                };
                IOS: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                Web: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
              };
              SecondaryBtn: InAppMessageButton & {
                Android: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                DefaultConfig: DefaultButtonConfiguration & {
                  ButtonAction: ButtonAction;
                  Text: string;
                };
                IOS: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                Web: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
              };
            })[];
          };
        };
        Schedule: Schedule & {
          StartTime: string;
          EventFilter: CampaignEventFilter & {
            Dimensions: EventDimensions & {
              Attributes: {
                [key: string]:
                  | (AttributeDimension & { Values: ListOf__string })
                  | undefined;
              };
              EventType: SetDimension & { Values: ListOf__string };
              Metrics: {
                [key: string]:
                  | (MetricDimension & {
                      ComparisonOperator: string;
                      Value: number;
                    })
                  | undefined;
              };
            };
            FilterType: FilterType;
          };
        };
      })[];
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
  };
}
export const GetCampaignsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignsResponse: S.optional(CampaignsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CampaignsResponse" }),
  }),
).annotate({
  identifier: "GetCampaignsResponse",
}) as any as S.Schema<GetCampaignsResponse>;
export interface GetCampaignVersionRequest {
  ApplicationId: string;
  CampaignId: string;
  Version: string;
}
export const GetCampaignVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    CampaignId: S.String.pipe(T.HttpLabel("CampaignId")),
    Version: S.String.pipe(T.HttpLabel("Version")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/campaigns/{CampaignId}/versions/{Version}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCampaignVersionRequest",
}) as any as S.Schema<GetCampaignVersionRequest>;
export interface GetCampaignVersionResponse {
  CampaignResponse: CampaignResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    SegmentId: string;
    SegmentVersion: number;
    AdditionalTreatments: (TreatmentResource & {
      Id: string;
      SizePercent: number;
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
    CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
      DeliveryUri: string;
    };
    MessageConfiguration: MessageConfiguration & {
      InAppMessage: CampaignInAppMessage & {
        Content: (InAppMessageContent & {
          BodyConfig: InAppMessageBodyConfig & {
            Alignment: Alignment;
            Body: string;
            TextColor: string;
          };
          HeaderConfig: InAppMessageHeaderConfig & {
            Alignment: Alignment;
            Header: string;
            TextColor: string;
          };
          PrimaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
          SecondaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
        })[];
      };
    };
    Schedule: Schedule & {
      StartTime: string;
      EventFilter: CampaignEventFilter & {
        Dimensions: EventDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          EventType: SetDimension & { Values: ListOf__string };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
        };
        FilterType: FilterType;
      };
    };
  };
}
export const GetCampaignVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignResponse: S.optional(CampaignResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CampaignResponse" }),
  }),
).annotate({
  identifier: "GetCampaignVersionResponse",
}) as any as S.Schema<GetCampaignVersionResponse>;
export interface GetCampaignVersionsRequest {
  ApplicationId: string;
  CampaignId: string;
  PageSize?: string;
  Token?: string;
}
export const GetCampaignVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    CampaignId: S.String.pipe(T.HttpLabel("CampaignId")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/campaigns/{CampaignId}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCampaignVersionsRequest",
}) as any as S.Schema<GetCampaignVersionsRequest>;
export interface GetCampaignVersionsResponse {
  CampaignsResponse: CampaignsResponse & {
    Item: (CampaignResponse & {
      ApplicationId: string;
      Arn: string;
      CreationDate: string;
      Id: string;
      LastModifiedDate: string;
      SegmentId: string;
      SegmentVersion: number;
      AdditionalTreatments: (TreatmentResource & {
        Id: string;
        SizePercent: number;
        CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
          DeliveryUri: string;
        };
        MessageConfiguration: MessageConfiguration & {
          InAppMessage: CampaignInAppMessage & {
            Content: (InAppMessageContent & {
              BodyConfig: InAppMessageBodyConfig & {
                Alignment: Alignment;
                Body: string;
                TextColor: string;
              };
              HeaderConfig: InAppMessageHeaderConfig & {
                Alignment: Alignment;
                Header: string;
                TextColor: string;
              };
              PrimaryBtn: InAppMessageButton & {
                Android: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                DefaultConfig: DefaultButtonConfiguration & {
                  ButtonAction: ButtonAction;
                  Text: string;
                };
                IOS: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                Web: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
              };
              SecondaryBtn: InAppMessageButton & {
                Android: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                DefaultConfig: DefaultButtonConfiguration & {
                  ButtonAction: ButtonAction;
                  Text: string;
                };
                IOS: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
                Web: OverrideButtonConfiguration & {
                  ButtonAction: ButtonAction;
                };
              };
            })[];
          };
        };
        Schedule: Schedule & {
          StartTime: string;
          EventFilter: CampaignEventFilter & {
            Dimensions: EventDimensions & {
              Attributes: {
                [key: string]:
                  | (AttributeDimension & { Values: ListOf__string })
                  | undefined;
              };
              EventType: SetDimension & { Values: ListOf__string };
              Metrics: {
                [key: string]:
                  | (MetricDimension & {
                      ComparisonOperator: string;
                      Value: number;
                    })
                  | undefined;
              };
            };
            FilterType: FilterType;
          };
        };
      })[];
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
  };
}
export const GetCampaignVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignsResponse: S.optional(CampaignsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CampaignsResponse" }),
  }),
).annotate({
  identifier: "GetCampaignVersionsResponse",
}) as any as S.Schema<GetCampaignVersionsResponse>;
export interface GetChannelsRequest {
  ApplicationId: string;
}
export const GetChannelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/channels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChannelsRequest",
}) as any as S.Schema<GetChannelsRequest>;
export interface ChannelResponse {
  ApplicationId?: string;
  CreationDate?: string;
  Enabled?: boolean;
  HasCredential?: boolean;
  Id?: string;
  IsArchived?: boolean;
  LastModifiedBy?: string;
  LastModifiedDate?: string;
  Version?: number;
}
export const ChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    CreationDate: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    HasCredential: S.optional(S.Boolean),
    Id: S.optional(S.String),
    IsArchived: S.optional(S.Boolean),
    LastModifiedBy: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    Version: S.optional(S.Number),
  }),
).annotate({
  identifier: "ChannelResponse",
}) as any as S.Schema<ChannelResponse>;
export type MapOfChannelResponse = {
  [key: string]: ChannelResponse | undefined;
};
export const MapOfChannelResponse = /*@__PURE__*/ S.Record(
  S.String,
  ChannelResponse.pipe(S.optional),
);
export interface ChannelsResponse {
  Channels?: { [key: string]: ChannelResponse | undefined };
}
export const ChannelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Channels: S.optional(MapOfChannelResponse) }),
).annotate({
  identifier: "ChannelsResponse",
}) as any as S.Schema<ChannelsResponse>;
export interface GetChannelsResponse {
  ChannelsResponse: ChannelsResponse & { Channels: MapOfChannelResponse };
}
export const GetChannelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelsResponse: S.optional(ChannelsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ChannelsResponse" }),
  }),
).annotate({
  identifier: "GetChannelsResponse",
}) as any as S.Schema<GetChannelsResponse>;
export interface GetEmailChannelRequest {
  ApplicationId: string;
}
export const GetEmailChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/channels/email" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEmailChannelRequest",
}) as any as S.Schema<GetEmailChannelRequest>;
export interface GetEmailChannelResponse {
  EmailChannelResponse: EmailChannelResponse & { Platform: string };
}
export const GetEmailChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailChannelResponse: S.optional(EmailChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EmailChannelResponse" }),
  }),
).annotate({
  identifier: "GetEmailChannelResponse",
}) as any as S.Schema<GetEmailChannelResponse>;
export interface GetEmailTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export const GetEmailTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/templates/{TemplateName}/email" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEmailTemplateRequest",
}) as any as S.Schema<GetEmailTemplateRequest>;
export type TemplateType =
  | "EMAIL"
  | "SMS"
  | "VOICE"
  | "PUSH"
  | "INAPP"
  | (string & {});
export const TemplateType = S.String;

export interface EmailTemplateResponse {
  Arn?: string;
  CreationDate?: string;
  DefaultSubstitutions?: string;
  HtmlPart?: string;
  LastModifiedDate?: string;
  RecommenderId?: string;
  Subject?: string;
  Headers?: MessageHeader[];
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: TemplateType;
  TextPart?: string;
  Version?: string;
}
export const EmailTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationDate: S.optional(S.String),
    DefaultSubstitutions: S.optional(S.String),
    HtmlPart: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    RecommenderId: S.optional(S.String),
    Subject: S.optional(S.String),
    Headers: S.optional(ListOfMessageHeader),
    tags: S.optional(MapOf__string),
    TemplateDescription: S.optional(S.String),
    TemplateName: S.optional(S.String),
    TemplateType: S.optional(TemplateType),
    TextPart: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "EmailTemplateResponse",
}) as any as S.Schema<EmailTemplateResponse>;
export interface GetEmailTemplateResponse {
  EmailTemplateResponse: EmailTemplateResponse & {
    CreationDate: string;
    LastModifiedDate: string;
    TemplateName: string;
    TemplateType: TemplateType;
  };
}
export const GetEmailTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailTemplateResponse: S.optional(EmailTemplateResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EmailTemplateResponse" }),
  }),
).annotate({
  identifier: "GetEmailTemplateResponse",
}) as any as S.Schema<GetEmailTemplateResponse>;
export interface GetEndpointRequest {
  ApplicationId: string;
  EndpointId: string;
}
export const GetEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EndpointId: S.String.pipe(T.HttpLabel("EndpointId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/endpoints/{EndpointId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEndpointRequest",
}) as any as S.Schema<GetEndpointRequest>;
export interface GetEndpointResponse {
  EndpointResponse: EndpointResponse;
}
export const GetEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointResponse: S.optional(EndpointResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EndpointResponse" }),
  }),
).annotate({
  identifier: "GetEndpointResponse",
}) as any as S.Schema<GetEndpointResponse>;
export interface GetEventStreamRequest {
  ApplicationId: string;
}
export const GetEventStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/eventstream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEventStreamRequest",
}) as any as S.Schema<GetEventStreamRequest>;
export interface GetEventStreamResponse {
  EventStream: EventStream & {
    ApplicationId: string;
    DestinationStreamArn: string;
    RoleArn: string;
  };
}
export const GetEventStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventStream: S.optional(EventStream)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EventStream" }),
  }),
).annotate({
  identifier: "GetEventStreamResponse",
}) as any as S.Schema<GetEventStreamResponse>;
export interface GetExportJobRequest {
  ApplicationId: string;
  JobId: string;
}
export const GetExportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    JobId: S.String.pipe(T.HttpLabel("JobId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/jobs/export/{JobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExportJobRequest",
}) as any as S.Schema<GetExportJobRequest>;
export interface GetExportJobResponse {
  ExportJobResponse: ExportJobResponse & {
    ApplicationId: string;
    CreationDate: string;
    Definition: ExportJobResource & { RoleArn: string; S3UrlPrefix: string };
    Id: string;
    JobStatus: JobStatus;
    Type: string;
  };
}
export const GetExportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportJobResponse: S.optional(ExportJobResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ExportJobResponse" }),
  }),
).annotate({
  identifier: "GetExportJobResponse",
}) as any as S.Schema<GetExportJobResponse>;
export interface GetExportJobsRequest {
  ApplicationId: string;
  PageSize?: string;
  Token?: string;
}
export const GetExportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/jobs/export" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExportJobsRequest",
}) as any as S.Schema<GetExportJobsRequest>;
export type ListOfExportJobResponse = ExportJobResponse[];
export const ListOfExportJobResponse = /*@__PURE__*/ S.Array(ExportJobResponse);
export interface ExportJobsResponse {
  Item?: ExportJobResponse[];
  NextToken?: string;
}
export const ExportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: S.optional(ListOfExportJobResponse),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ExportJobsResponse",
}) as any as S.Schema<ExportJobsResponse>;
export interface GetExportJobsResponse {
  ExportJobsResponse: ExportJobsResponse & {
    Item: (ExportJobResponse & {
      ApplicationId: string;
      CreationDate: string;
      Definition: ExportJobResource & { RoleArn: string; S3UrlPrefix: string };
      Id: string;
      JobStatus: JobStatus;
      Type: string;
    })[];
  };
}
export const GetExportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportJobsResponse: S.optional(ExportJobsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ExportJobsResponse" }),
  }),
).annotate({
  identifier: "GetExportJobsResponse",
}) as any as S.Schema<GetExportJobsResponse>;
export interface GetGcmChannelRequest {
  ApplicationId: string;
}
export const GetGcmChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/channels/gcm" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetGcmChannelRequest",
}) as any as S.Schema<GetGcmChannelRequest>;
export interface GetGcmChannelResponse {
  GCMChannelResponse: GCMChannelResponse & { Platform: string };
}
export const GetGcmChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GCMChannelResponse: S.optional(GCMChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "GCMChannelResponse" }),
  }),
).annotate({
  identifier: "GetGcmChannelResponse",
}) as any as S.Schema<GetGcmChannelResponse>;
export interface GetImportJobRequest {
  ApplicationId: string;
  JobId: string;
}
export const GetImportJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    JobId: S.String.pipe(T.HttpLabel("JobId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/jobs/import/{JobId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetImportJobRequest",
}) as any as S.Schema<GetImportJobRequest>;
export interface GetImportJobResponse {
  ImportJobResponse: ImportJobResponse & {
    ApplicationId: string;
    CreationDate: string;
    Definition: ImportJobResource & {
      Format: Format;
      RoleArn: string;
      S3Url: string;
    };
    Id: string;
    JobStatus: JobStatus;
    Type: string;
  };
}
export const GetImportJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportJobResponse: S.optional(ImportJobResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ImportJobResponse" }),
  }),
).annotate({
  identifier: "GetImportJobResponse",
}) as any as S.Schema<GetImportJobResponse>;
export interface GetImportJobsRequest {
  ApplicationId: string;
  PageSize?: string;
  Token?: string;
}
export const GetImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/jobs/import" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetImportJobsRequest",
}) as any as S.Schema<GetImportJobsRequest>;
export type ListOfImportJobResponse = ImportJobResponse[];
export const ListOfImportJobResponse = /*@__PURE__*/ S.Array(ImportJobResponse);
export interface ImportJobsResponse {
  Item?: ImportJobResponse[];
  NextToken?: string;
}
export const ImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: S.optional(ListOfImportJobResponse),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportJobsResponse",
}) as any as S.Schema<ImportJobsResponse>;
export interface GetImportJobsResponse {
  ImportJobsResponse: ImportJobsResponse & {
    Item: (ImportJobResponse & {
      ApplicationId: string;
      CreationDate: string;
      Definition: ImportJobResource & {
        Format: Format;
        RoleArn: string;
        S3Url: string;
      };
      Id: string;
      JobStatus: JobStatus;
      Type: string;
    })[];
  };
}
export const GetImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportJobsResponse: S.optional(ImportJobsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ImportJobsResponse" }),
  }),
).annotate({
  identifier: "GetImportJobsResponse",
}) as any as S.Schema<GetImportJobsResponse>;
export interface GetInAppMessagesRequest {
  ApplicationId: string;
  EndpointId: string;
}
export const GetInAppMessagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EndpointId: S.String.pipe(T.HttpLabel("EndpointId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/endpoints/{EndpointId}/inappmessages",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInAppMessagesRequest",
}) as any as S.Schema<GetInAppMessagesRequest>;
export interface InAppMessage {
  Content?: InAppMessageContent[];
  CustomConfig?: { [key: string]: string | undefined };
  Layout?: Layout;
}
export const InAppMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Content: S.optional(ListOfInAppMessageContent),
    CustomConfig: S.optional(MapOf__string),
    Layout: S.optional(Layout),
  }),
).annotate({ identifier: "InAppMessage" }) as any as S.Schema<InAppMessage>;
export interface InAppCampaignSchedule {
  EndDate?: string;
  EventFilter?: CampaignEventFilter;
  QuietTime?: QuietTime;
}
export const InAppCampaignSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndDate: S.optional(S.String),
    EventFilter: S.optional(CampaignEventFilter),
    QuietTime: S.optional(QuietTime),
  }),
).annotate({
  identifier: "InAppCampaignSchedule",
}) as any as S.Schema<InAppCampaignSchedule>;
export interface InAppMessageCampaign {
  CampaignId?: string;
  DailyCap?: number;
  InAppMessage?: InAppMessage;
  Priority?: number;
  Schedule?: InAppCampaignSchedule;
  SessionCap?: number;
  TotalCap?: number;
  TreatmentId?: string;
}
export const InAppMessageCampaign = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignId: S.optional(S.String),
    DailyCap: S.optional(S.Number),
    InAppMessage: S.optional(InAppMessage),
    Priority: S.optional(S.Number),
    Schedule: S.optional(InAppCampaignSchedule),
    SessionCap: S.optional(S.Number),
    TotalCap: S.optional(S.Number),
    TreatmentId: S.optional(S.String),
  }),
).annotate({
  identifier: "InAppMessageCampaign",
}) as any as S.Schema<InAppMessageCampaign>;
export type ListOfInAppMessageCampaign = InAppMessageCampaign[];
export const ListOfInAppMessageCampaign =
  /*@__PURE__*/ S.Array(InAppMessageCampaign);
export interface InAppMessagesResponse {
  InAppMessageCampaigns?: InAppMessageCampaign[];
}
export const InAppMessagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InAppMessageCampaigns: S.optional(ListOfInAppMessageCampaign) }),
).annotate({
  identifier: "InAppMessagesResponse",
}) as any as S.Schema<InAppMessagesResponse>;
export interface GetInAppMessagesResponse {
  InAppMessagesResponse: InAppMessagesResponse & {
    InAppMessageCampaigns: (InAppMessageCampaign & {
      InAppMessage: InAppMessage & {
        Content: (InAppMessageContent & {
          BodyConfig: InAppMessageBodyConfig & {
            Alignment: Alignment;
            Body: string;
            TextColor: string;
          };
          HeaderConfig: InAppMessageHeaderConfig & {
            Alignment: Alignment;
            Header: string;
            TextColor: string;
          };
          PrimaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
          SecondaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
        })[];
      };
      Schedule: InAppCampaignSchedule & {
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
  };
}
export const GetInAppMessagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InAppMessagesResponse: S.optional(InAppMessagesResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "InAppMessagesResponse" }),
  }),
).annotate({
  identifier: "GetInAppMessagesResponse",
}) as any as S.Schema<GetInAppMessagesResponse>;
export interface GetInAppTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export const GetInAppTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/templates/{TemplateName}/inapp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetInAppTemplateRequest",
}) as any as S.Schema<GetInAppTemplateRequest>;
export interface InAppTemplateResponse {
  Arn?: string;
  Content?: InAppMessageContent[];
  CreationDate?: string;
  CustomConfig?: { [key: string]: string | undefined };
  LastModifiedDate?: string;
  Layout?: Layout;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: TemplateType;
  Version?: string;
}
export const InAppTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Content: S.optional(ListOfInAppMessageContent),
    CreationDate: S.optional(S.String),
    CustomConfig: S.optional(MapOf__string),
    LastModifiedDate: S.optional(S.String),
    Layout: S.optional(Layout),
    tags: S.optional(MapOf__string),
    TemplateDescription: S.optional(S.String),
    TemplateName: S.optional(S.String),
    TemplateType: S.optional(TemplateType),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "InAppTemplateResponse",
}) as any as S.Schema<InAppTemplateResponse>;
export interface GetInAppTemplateResponse {
  InAppTemplateResponse: InAppTemplateResponse & {
    CreationDate: string;
    LastModifiedDate: string;
    TemplateName: string;
    TemplateType: TemplateType;
    Content: (InAppMessageContent & {
      BodyConfig: InAppMessageBodyConfig & {
        Alignment: Alignment;
        Body: string;
        TextColor: string;
      };
      HeaderConfig: InAppMessageHeaderConfig & {
        Alignment: Alignment;
        Header: string;
        TextColor: string;
      };
      PrimaryBtn: InAppMessageButton & {
        Android: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
        DefaultConfig: DefaultButtonConfiguration & {
          ButtonAction: ButtonAction;
          Text: string;
        };
        IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
        Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
      };
      SecondaryBtn: InAppMessageButton & {
        Android: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
        DefaultConfig: DefaultButtonConfiguration & {
          ButtonAction: ButtonAction;
          Text: string;
        };
        IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
        Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
      };
    })[];
  };
}
export const GetInAppTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InAppTemplateResponse: S.optional(InAppTemplateResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "InAppTemplateResponse" }),
  }),
).annotate({
  identifier: "GetInAppTemplateResponse",
}) as any as S.Schema<GetInAppTemplateResponse>;
export interface GetJourneyRequest {
  ApplicationId: string;
  JourneyId: string;
}
export const GetJourneyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    JourneyId: S.String.pipe(T.HttpLabel("JourneyId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/journeys/{JourneyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetJourneyRequest",
}) as any as S.Schema<GetJourneyRequest>;
export interface GetJourneyResponse {
  JourneyResponse: JourneyResponse & {
    ApplicationId: string;
    Id: string;
    Name: string;
    Activities: {
      [key: string]:
        | (Activity & {
            ConditionalSplit: ConditionalSplitActivity & {
              Condition: Condition & {
                Conditions: (SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                })[];
              };
            };
            Holdout: HoldoutActivity & { Percentage: number };
            MultiCondition: MultiConditionalSplitActivity & {
              Branches: (MultiConditionalBranch & {
                Condition: SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                };
              })[];
            };
          })
        | undefined;
    };
    StartCondition: StartCondition & {
      EventStartCondition: EventStartCondition & {
        EventFilter: EventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
      SegmentStartCondition: SegmentCondition & { SegmentId: string };
    };
  };
}
export const GetJourneyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JourneyResponse: S.optional(JourneyResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "JourneyResponse" }),
  }),
).annotate({
  identifier: "GetJourneyResponse",
}) as any as S.Schema<GetJourneyResponse>;
export interface GetJourneyDateRangeKpiRequest {
  ApplicationId: string;
  EndTime?: Date;
  JourneyId: string;
  KpiName: string;
  NextToken?: string;
  PageSize?: string;
  StartTime?: Date;
}
export const GetJourneyDateRangeKpiRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EndTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("end-time")),
    JourneyId: S.String.pipe(T.HttpLabel("JourneyId")),
    KpiName: S.String.pipe(T.HttpLabel("KpiName")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ).pipe(T.HttpQuery("start-time")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/journeys/{JourneyId}/kpis/daterange/{KpiName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetJourneyDateRangeKpiRequest",
}) as any as S.Schema<GetJourneyDateRangeKpiRequest>;
export interface JourneyDateRangeKpiResponse {
  ApplicationId?: string;
  EndTime?: Date;
  JourneyId?: string;
  KpiName?: string;
  KpiResult?: BaseKpiResult;
  NextToken?: string;
  StartTime?: Date;
}
export const JourneyDateRangeKpiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    EndTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    JourneyId: S.optional(S.String),
    KpiName: S.optional(S.String),
    KpiResult: S.optional(BaseKpiResult),
    NextToken: S.optional(S.String),
    StartTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "JourneyDateRangeKpiResponse",
}) as any as S.Schema<JourneyDateRangeKpiResponse>;
export interface GetJourneyDateRangeKpiResponse {
  JourneyDateRangeKpiResponse: JourneyDateRangeKpiResponse & {
    ApplicationId: string;
    EndTime: __timestampIso8601;
    JourneyId: string;
    KpiName: string;
    KpiResult: BaseKpiResult & {
      Rows: (ResultRow & {
        GroupedBys: (ResultRowValue & {
          Key: string;
          Type: string;
          Value: string;
        })[];
        Values: (ResultRowValue & {
          Key: string;
          Type: string;
          Value: string;
        })[];
      })[];
    };
    StartTime: __timestampIso8601;
  };
}
export const GetJourneyDateRangeKpiResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JourneyDateRangeKpiResponse: S.optional(JourneyDateRangeKpiResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "JourneyDateRangeKpiResponse" }),
  }),
).annotate({
  identifier: "GetJourneyDateRangeKpiResponse",
}) as any as S.Schema<GetJourneyDateRangeKpiResponse>;
export interface GetJourneyExecutionActivityMetricsRequest {
  ApplicationId: string;
  JourneyActivityId: string;
  JourneyId: string;
  NextToken?: string;
  PageSize?: string;
}
export const GetJourneyExecutionActivityMetricsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
      JourneyActivityId: S.String.pipe(T.HttpLabel("JourneyActivityId")),
      JourneyId: S.String.pipe(T.HttpLabel("JourneyId")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
      PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/apps/{ApplicationId}/journeys/{JourneyId}/activities/{JourneyActivityId}/execution-metrics",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetJourneyExecutionActivityMetricsRequest",
  }) as any as S.Schema<GetJourneyExecutionActivityMetricsRequest>;
export interface JourneyExecutionActivityMetricsResponse {
  ActivityType?: string;
  ApplicationId?: string;
  JourneyActivityId?: string;
  JourneyId?: string;
  LastEvaluatedTime?: string;
  Metrics?: { [key: string]: string | undefined };
}
export const JourneyExecutionActivityMetricsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ActivityType: S.optional(S.String),
      ApplicationId: S.optional(S.String),
      JourneyActivityId: S.optional(S.String),
      JourneyId: S.optional(S.String),
      LastEvaluatedTime: S.optional(S.String),
      Metrics: S.optional(MapOf__string),
    }),
).annotate({
  identifier: "JourneyExecutionActivityMetricsResponse",
}) as any as S.Schema<JourneyExecutionActivityMetricsResponse>;
export interface GetJourneyExecutionActivityMetricsResponse {
  JourneyExecutionActivityMetricsResponse: JourneyExecutionActivityMetricsResponse & {
    ActivityType: string;
    ApplicationId: string;
    JourneyActivityId: string;
    JourneyId: string;
    LastEvaluatedTime: string;
    Metrics: MapOf__string;
  };
}
export const GetJourneyExecutionActivityMetricsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      JourneyExecutionActivityMetricsResponse: S.optional(
        JourneyExecutionActivityMetricsResponse,
      )
        .pipe(T.HttpPayload())
        .annotate({ identifier: "JourneyExecutionActivityMetricsResponse" }),
    }),
  ).annotate({
    identifier: "GetJourneyExecutionActivityMetricsResponse",
  }) as any as S.Schema<GetJourneyExecutionActivityMetricsResponse>;
export interface GetJourneyExecutionMetricsRequest {
  ApplicationId: string;
  JourneyId: string;
  NextToken?: string;
  PageSize?: string;
}
export const GetJourneyExecutionMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    JourneyId: S.String.pipe(T.HttpLabel("JourneyId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/journeys/{JourneyId}/execution-metrics",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetJourneyExecutionMetricsRequest",
}) as any as S.Schema<GetJourneyExecutionMetricsRequest>;
export interface JourneyExecutionMetricsResponse {
  ApplicationId?: string;
  JourneyId?: string;
  LastEvaluatedTime?: string;
  Metrics?: { [key: string]: string | undefined };
}
export const JourneyExecutionMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    JourneyId: S.optional(S.String),
    LastEvaluatedTime: S.optional(S.String),
    Metrics: S.optional(MapOf__string),
  }),
).annotate({
  identifier: "JourneyExecutionMetricsResponse",
}) as any as S.Schema<JourneyExecutionMetricsResponse>;
export interface GetJourneyExecutionMetricsResponse {
  JourneyExecutionMetricsResponse: JourneyExecutionMetricsResponse & {
    ApplicationId: string;
    JourneyId: string;
    LastEvaluatedTime: string;
    Metrics: MapOf__string;
  };
}
export const GetJourneyExecutionMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JourneyExecutionMetricsResponse: S.optional(JourneyExecutionMetricsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "JourneyExecutionMetricsResponse" }),
  }),
).annotate({
  identifier: "GetJourneyExecutionMetricsResponse",
}) as any as S.Schema<GetJourneyExecutionMetricsResponse>;
export interface GetJourneyRunExecutionActivityMetricsRequest {
  ApplicationId: string;
  JourneyActivityId: string;
  JourneyId: string;
  NextToken?: string;
  PageSize?: string;
  RunId: string;
}
export const GetJourneyRunExecutionActivityMetricsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
      JourneyActivityId: S.String.pipe(T.HttpLabel("JourneyActivityId")),
      JourneyId: S.String.pipe(T.HttpLabel("JourneyId")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
      PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
      RunId: S.String.pipe(T.HttpLabel("RunId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/apps/{ApplicationId}/journeys/{JourneyId}/runs/{RunId}/activities/{JourneyActivityId}/execution-metrics",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetJourneyRunExecutionActivityMetricsRequest",
  }) as any as S.Schema<GetJourneyRunExecutionActivityMetricsRequest>;
export interface JourneyRunExecutionActivityMetricsResponse {
  ActivityType?: string;
  ApplicationId?: string;
  JourneyActivityId?: string;
  JourneyId?: string;
  LastEvaluatedTime?: string;
  Metrics?: { [key: string]: string | undefined };
  RunId?: string;
}
export const JourneyRunExecutionActivityMetricsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ActivityType: S.optional(S.String),
      ApplicationId: S.optional(S.String),
      JourneyActivityId: S.optional(S.String),
      JourneyId: S.optional(S.String),
      LastEvaluatedTime: S.optional(S.String),
      Metrics: S.optional(MapOf__string),
      RunId: S.optional(S.String),
    }),
  ).annotate({
    identifier: "JourneyRunExecutionActivityMetricsResponse",
  }) as any as S.Schema<JourneyRunExecutionActivityMetricsResponse>;
export interface GetJourneyRunExecutionActivityMetricsResponse {
  JourneyRunExecutionActivityMetricsResponse: JourneyRunExecutionActivityMetricsResponse & {
    ActivityType: string;
    ApplicationId: string;
    JourneyActivityId: string;
    JourneyId: string;
    LastEvaluatedTime: string;
    Metrics: MapOf__string;
    RunId: string;
  };
}
export const GetJourneyRunExecutionActivityMetricsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      JourneyRunExecutionActivityMetricsResponse: S.optional(
        JourneyRunExecutionActivityMetricsResponse,
      )
        .pipe(T.HttpPayload())
        .annotate({ identifier: "JourneyRunExecutionActivityMetricsResponse" }),
    }),
  ).annotate({
    identifier: "GetJourneyRunExecutionActivityMetricsResponse",
  }) as any as S.Schema<GetJourneyRunExecutionActivityMetricsResponse>;
export interface GetJourneyRunExecutionMetricsRequest {
  ApplicationId: string;
  JourneyId: string;
  NextToken?: string;
  PageSize?: string;
  RunId: string;
}
export const GetJourneyRunExecutionMetricsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
      JourneyId: S.String.pipe(T.HttpLabel("JourneyId")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
      PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
      RunId: S.String.pipe(T.HttpLabel("RunId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/v1/apps/{ApplicationId}/journeys/{JourneyId}/runs/{RunId}/execution-metrics",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetJourneyRunExecutionMetricsRequest",
}) as any as S.Schema<GetJourneyRunExecutionMetricsRequest>;
export interface JourneyRunExecutionMetricsResponse {
  ApplicationId?: string;
  JourneyId?: string;
  LastEvaluatedTime?: string;
  Metrics?: { [key: string]: string | undefined };
  RunId?: string;
}
export const JourneyRunExecutionMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    JourneyId: S.optional(S.String),
    LastEvaluatedTime: S.optional(S.String),
    Metrics: S.optional(MapOf__string),
    RunId: S.optional(S.String),
  }),
).annotate({
  identifier: "JourneyRunExecutionMetricsResponse",
}) as any as S.Schema<JourneyRunExecutionMetricsResponse>;
export interface GetJourneyRunExecutionMetricsResponse {
  JourneyRunExecutionMetricsResponse: JourneyRunExecutionMetricsResponse & {
    ApplicationId: string;
    JourneyId: string;
    LastEvaluatedTime: string;
    Metrics: MapOf__string;
    RunId: string;
  };
}
export const GetJourneyRunExecutionMetricsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      JourneyRunExecutionMetricsResponse: S.optional(
        JourneyRunExecutionMetricsResponse,
      )
        .pipe(T.HttpPayload())
        .annotate({ identifier: "JourneyRunExecutionMetricsResponse" }),
    }),
).annotate({
  identifier: "GetJourneyRunExecutionMetricsResponse",
}) as any as S.Schema<GetJourneyRunExecutionMetricsResponse>;
export interface GetJourneyRunsRequest {
  ApplicationId: string;
  JourneyId: string;
  PageSize?: string;
  Token?: string;
}
export const GetJourneyRunsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    JourneyId: S.String.pipe(T.HttpLabel("JourneyId")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/journeys/{JourneyId}/runs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetJourneyRunsRequest",
}) as any as S.Schema<GetJourneyRunsRequest>;
export type JourneyRunStatus =
  | "SCHEDULED"
  | "RUNNING"
  | "COMPLETED"
  | "CANCELLED"
  | (string & {});
export const JourneyRunStatus = S.String;

export interface JourneyRunResponse {
  CreationTime?: string;
  LastUpdateTime?: string;
  RunId?: string;
  Status?: JourneyRunStatus;
}
export const JourneyRunResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationTime: S.optional(S.String),
    LastUpdateTime: S.optional(S.String),
    RunId: S.optional(S.String),
    Status: S.optional(JourneyRunStatus),
  }),
).annotate({
  identifier: "JourneyRunResponse",
}) as any as S.Schema<JourneyRunResponse>;
export type ListOfJourneyRunResponse = JourneyRunResponse[];
export const ListOfJourneyRunResponse =
  /*@__PURE__*/ S.Array(JourneyRunResponse);
export interface JourneyRunsResponse {
  Item?: JourneyRunResponse[];
  NextToken?: string;
}
export const JourneyRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: S.optional(ListOfJourneyRunResponse),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "JourneyRunsResponse",
}) as any as S.Schema<JourneyRunsResponse>;
export interface GetJourneyRunsResponse {
  JourneyRunsResponse: JourneyRunsResponse & {
    Item: (JourneyRunResponse & {
      CreationTime: string;
      LastUpdateTime: string;
      RunId: string;
      Status: JourneyRunStatus;
    })[];
  };
}
export const GetJourneyRunsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JourneyRunsResponse: S.optional(JourneyRunsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "JourneyRunsResponse" }),
  }),
).annotate({
  identifier: "GetJourneyRunsResponse",
}) as any as S.Schema<GetJourneyRunsResponse>;
export interface GetPushTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export const GetPushTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/templates/{TemplateName}/push" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPushTemplateRequest",
}) as any as S.Schema<GetPushTemplateRequest>;
export interface PushNotificationTemplateResponse {
  ADM?: AndroidPushNotificationTemplate;
  APNS?: APNSPushNotificationTemplate;
  Arn?: string;
  Baidu?: AndroidPushNotificationTemplate;
  CreationDate?: string;
  Default?: DefaultPushNotificationTemplate;
  DefaultSubstitutions?: string;
  GCM?: AndroidPushNotificationTemplate;
  LastModifiedDate?: string;
  RecommenderId?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: TemplateType;
  Version?: string;
}
export const PushNotificationTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ADM: S.optional(AndroidPushNotificationTemplate),
    APNS: S.optional(APNSPushNotificationTemplate),
    Arn: S.optional(S.String),
    Baidu: S.optional(AndroidPushNotificationTemplate),
    CreationDate: S.optional(S.String),
    Default: S.optional(DefaultPushNotificationTemplate),
    DefaultSubstitutions: S.optional(S.String),
    GCM: S.optional(AndroidPushNotificationTemplate),
    LastModifiedDate: S.optional(S.String),
    RecommenderId: S.optional(S.String),
    tags: S.optional(MapOf__string),
    TemplateDescription: S.optional(S.String),
    TemplateName: S.optional(S.String),
    TemplateType: S.optional(TemplateType),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "PushNotificationTemplateResponse",
}) as any as S.Schema<PushNotificationTemplateResponse>;
export interface GetPushTemplateResponse {
  PushNotificationTemplateResponse: PushNotificationTemplateResponse & {
    CreationDate: string;
    LastModifiedDate: string;
    TemplateName: string;
    TemplateType: TemplateType;
  };
}
export const GetPushTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PushNotificationTemplateResponse: S.optional(
      PushNotificationTemplateResponse,
    )
      .pipe(T.HttpPayload())
      .annotate({ identifier: "PushNotificationTemplateResponse" }),
  }),
).annotate({
  identifier: "GetPushTemplateResponse",
}) as any as S.Schema<GetPushTemplateResponse>;
export interface GetRecommenderConfigurationRequest {
  RecommenderId: string;
}
export const GetRecommenderConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RecommenderId: S.String.pipe(T.HttpLabel("RecommenderId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/recommenders/{RecommenderId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRecommenderConfigurationRequest",
}) as any as S.Schema<GetRecommenderConfigurationRequest>;
export interface GetRecommenderConfigurationResponse {
  RecommenderConfigurationResponse: RecommenderConfigurationResponse & {
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    RecommendationProviderRoleArn: string;
    RecommendationProviderUri: string;
  };
}
export const GetRecommenderConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RecommenderConfigurationResponse: S.optional(
      RecommenderConfigurationResponse,
    )
      .pipe(T.HttpPayload())
      .annotate({ identifier: "RecommenderConfigurationResponse" }),
  }),
).annotate({
  identifier: "GetRecommenderConfigurationResponse",
}) as any as S.Schema<GetRecommenderConfigurationResponse>;
export interface GetRecommenderConfigurationsRequest {
  PageSize?: string;
  Token?: string;
}
export const GetRecommenderConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/recommenders" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetRecommenderConfigurationsRequest",
}) as any as S.Schema<GetRecommenderConfigurationsRequest>;
export type ListOfRecommenderConfigurationResponse =
  RecommenderConfigurationResponse[];
export const ListOfRecommenderConfigurationResponse = /*@__PURE__*/ S.Array(
  RecommenderConfigurationResponse,
);
export interface ListRecommenderConfigurationsResponse {
  Item?: RecommenderConfigurationResponse[];
  NextToken?: string;
}
export const ListRecommenderConfigurationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Item: S.optional(ListOfRecommenderConfigurationResponse),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListRecommenderConfigurationsResponse",
}) as any as S.Schema<ListRecommenderConfigurationsResponse>;
export interface GetRecommenderConfigurationsResponse {
  ListRecommenderConfigurationsResponse: ListRecommenderConfigurationsResponse & {
    Item: (RecommenderConfigurationResponse & {
      CreationDate: string;
      Id: string;
      LastModifiedDate: string;
      RecommendationProviderRoleArn: string;
      RecommendationProviderUri: string;
    })[];
  };
}
export const GetRecommenderConfigurationsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ListRecommenderConfigurationsResponse: S.optional(
        ListRecommenderConfigurationsResponse,
      )
        .pipe(T.HttpPayload())
        .annotate({ identifier: "ListRecommenderConfigurationsResponse" }),
    }),
).annotate({
  identifier: "GetRecommenderConfigurationsResponse",
}) as any as S.Schema<GetRecommenderConfigurationsResponse>;
export interface GetSegmentRequest {
  ApplicationId: string;
  SegmentId: string;
}
export const GetSegmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    SegmentId: S.String.pipe(T.HttpLabel("SegmentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/segments/{SegmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSegmentRequest",
}) as any as S.Schema<GetSegmentRequest>;
export interface GetSegmentResponse {
  SegmentResponse: SegmentResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    SegmentType: SegmentType;
    Dimensions: SegmentDimensions & {
      Attributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
      Behavior: SegmentBehaviors & {
        Recency: RecencyDimension & {
          Duration: Duration;
          RecencyType: RecencyType;
        };
      };
      Demographic: SegmentDemographics & {
        AppVersion: SetDimension & { Values: ListOf__string };
        Channel: SetDimension & { Values: ListOf__string };
        DeviceType: SetDimension & { Values: ListOf__string };
        Make: SetDimension & { Values: ListOf__string };
        Model: SetDimension & { Values: ListOf__string };
        Platform: SetDimension & { Values: ListOf__string };
      };
      Location: SegmentLocation & {
        Country: SetDimension & { Values: ListOf__string };
        GPSPoint: GPSPointDimension & {
          Coordinates: GPSCoordinates & { Latitude: number; Longitude: number };
        };
      };
      Metrics: {
        [key: string]:
          | (MetricDimension & { ComparisonOperator: string; Value: number })
          | undefined;
      };
      UserAttributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
    };
    ImportDefinition: SegmentImportResource & {
      ExternalId: string;
      Format: Format;
      RoleArn: string;
      S3Url: string;
      Size: number;
    };
    SegmentGroups: SegmentGroupList & {
      Groups: (SegmentGroup & {
        Dimensions: (SegmentDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          Behavior: SegmentBehaviors & {
            Recency: RecencyDimension & {
              Duration: Duration;
              RecencyType: RecencyType;
            };
          };
          Demographic: SegmentDemographics & {
            AppVersion: SetDimension & { Values: ListOf__string };
            Channel: SetDimension & { Values: ListOf__string };
            DeviceType: SetDimension & { Values: ListOf__string };
            Make: SetDimension & { Values: ListOf__string };
            Model: SetDimension & { Values: ListOf__string };
            Platform: SetDimension & { Values: ListOf__string };
          };
          Location: SegmentLocation & {
            Country: SetDimension & { Values: ListOf__string };
            GPSPoint: GPSPointDimension & {
              Coordinates: GPSCoordinates & {
                Latitude: number;
                Longitude: number;
              };
            };
          };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
          UserAttributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
        })[];
        SourceSegments: (SegmentReference & { Id: string })[];
      })[];
    };
  };
}
export const GetSegmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SegmentResponse: S.optional(SegmentResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SegmentResponse" }),
  }),
).annotate({
  identifier: "GetSegmentResponse",
}) as any as S.Schema<GetSegmentResponse>;
export interface GetSegmentExportJobsRequest {
  ApplicationId: string;
  PageSize?: string;
  SegmentId: string;
  Token?: string;
}
export const GetSegmentExportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    SegmentId: S.String.pipe(T.HttpLabel("SegmentId")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/segments/{SegmentId}/jobs/export",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSegmentExportJobsRequest",
}) as any as S.Schema<GetSegmentExportJobsRequest>;
export interface GetSegmentExportJobsResponse {
  ExportJobsResponse: ExportJobsResponse & {
    Item: (ExportJobResponse & {
      ApplicationId: string;
      CreationDate: string;
      Definition: ExportJobResource & { RoleArn: string; S3UrlPrefix: string };
      Id: string;
      JobStatus: JobStatus;
      Type: string;
    })[];
  };
}
export const GetSegmentExportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExportJobsResponse: S.optional(ExportJobsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ExportJobsResponse" }),
  }),
).annotate({
  identifier: "GetSegmentExportJobsResponse",
}) as any as S.Schema<GetSegmentExportJobsResponse>;
export interface GetSegmentImportJobsRequest {
  ApplicationId: string;
  PageSize?: string;
  SegmentId: string;
  Token?: string;
}
export const GetSegmentImportJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    SegmentId: S.String.pipe(T.HttpLabel("SegmentId")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/segments/{SegmentId}/jobs/import",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSegmentImportJobsRequest",
}) as any as S.Schema<GetSegmentImportJobsRequest>;
export interface GetSegmentImportJobsResponse {
  ImportJobsResponse: ImportJobsResponse & {
    Item: (ImportJobResponse & {
      ApplicationId: string;
      CreationDate: string;
      Definition: ImportJobResource & {
        Format: Format;
        RoleArn: string;
        S3Url: string;
      };
      Id: string;
      JobStatus: JobStatus;
      Type: string;
    })[];
  };
}
export const GetSegmentImportJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ImportJobsResponse: S.optional(ImportJobsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ImportJobsResponse" }),
  }),
).annotate({
  identifier: "GetSegmentImportJobsResponse",
}) as any as S.Schema<GetSegmentImportJobsResponse>;
export interface GetSegmentsRequest {
  ApplicationId: string;
  PageSize?: string;
  Token?: string;
}
export const GetSegmentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/segments" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSegmentsRequest",
}) as any as S.Schema<GetSegmentsRequest>;
export type ListOfSegmentResponse = SegmentResponse[];
export const ListOfSegmentResponse = /*@__PURE__*/ S.Array(SegmentResponse);
export interface SegmentsResponse {
  Item?: SegmentResponse[];
  NextToken?: string;
}
export const SegmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: S.optional(ListOfSegmentResponse),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "SegmentsResponse",
}) as any as S.Schema<SegmentsResponse>;
export interface GetSegmentsResponse {
  SegmentsResponse: SegmentsResponse & {
    Item: (SegmentResponse & {
      ApplicationId: string;
      Arn: string;
      CreationDate: string;
      Id: string;
      SegmentType: SegmentType;
      Dimensions: SegmentDimensions & {
        Attributes: {
          [key: string]:
            | (AttributeDimension & { Values: ListOf__string })
            | undefined;
        };
        Behavior: SegmentBehaviors & {
          Recency: RecencyDimension & {
            Duration: Duration;
            RecencyType: RecencyType;
          };
        };
        Demographic: SegmentDemographics & {
          AppVersion: SetDimension & { Values: ListOf__string };
          Channel: SetDimension & { Values: ListOf__string };
          DeviceType: SetDimension & { Values: ListOf__string };
          Make: SetDimension & { Values: ListOf__string };
          Model: SetDimension & { Values: ListOf__string };
          Platform: SetDimension & { Values: ListOf__string };
        };
        Location: SegmentLocation & {
          Country: SetDimension & { Values: ListOf__string };
          GPSPoint: GPSPointDimension & {
            Coordinates: GPSCoordinates & {
              Latitude: number;
              Longitude: number;
            };
          };
        };
        Metrics: {
          [key: string]:
            | (MetricDimension & { ComparisonOperator: string; Value: number })
            | undefined;
        };
        UserAttributes: {
          [key: string]:
            | (AttributeDimension & { Values: ListOf__string })
            | undefined;
        };
      };
      ImportDefinition: SegmentImportResource & {
        ExternalId: string;
        Format: Format;
        RoleArn: string;
        S3Url: string;
        Size: number;
      };
      SegmentGroups: SegmentGroupList & {
        Groups: (SegmentGroup & {
          Dimensions: (SegmentDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            Behavior: SegmentBehaviors & {
              Recency: RecencyDimension & {
                Duration: Duration;
                RecencyType: RecencyType;
              };
            };
            Demographic: SegmentDemographics & {
              AppVersion: SetDimension & { Values: ListOf__string };
              Channel: SetDimension & { Values: ListOf__string };
              DeviceType: SetDimension & { Values: ListOf__string };
              Make: SetDimension & { Values: ListOf__string };
              Model: SetDimension & { Values: ListOf__string };
              Platform: SetDimension & { Values: ListOf__string };
            };
            Location: SegmentLocation & {
              Country: SetDimension & { Values: ListOf__string };
              GPSPoint: GPSPointDimension & {
                Coordinates: GPSCoordinates & {
                  Latitude: number;
                  Longitude: number;
                };
              };
            };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
            UserAttributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
          })[];
          SourceSegments: (SegmentReference & { Id: string })[];
        })[];
      };
    })[];
  };
}
export const GetSegmentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SegmentsResponse: S.optional(SegmentsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SegmentsResponse" }),
  }),
).annotate({
  identifier: "GetSegmentsResponse",
}) as any as S.Schema<GetSegmentsResponse>;
export interface GetSegmentVersionRequest {
  ApplicationId: string;
  SegmentId: string;
  Version: string;
}
export const GetSegmentVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    SegmentId: S.String.pipe(T.HttpLabel("SegmentId")),
    Version: S.String.pipe(T.HttpLabel("Version")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/segments/{SegmentId}/versions/{Version}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSegmentVersionRequest",
}) as any as S.Schema<GetSegmentVersionRequest>;
export interface GetSegmentVersionResponse {
  SegmentResponse: SegmentResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    SegmentType: SegmentType;
    Dimensions: SegmentDimensions & {
      Attributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
      Behavior: SegmentBehaviors & {
        Recency: RecencyDimension & {
          Duration: Duration;
          RecencyType: RecencyType;
        };
      };
      Demographic: SegmentDemographics & {
        AppVersion: SetDimension & { Values: ListOf__string };
        Channel: SetDimension & { Values: ListOf__string };
        DeviceType: SetDimension & { Values: ListOf__string };
        Make: SetDimension & { Values: ListOf__string };
        Model: SetDimension & { Values: ListOf__string };
        Platform: SetDimension & { Values: ListOf__string };
      };
      Location: SegmentLocation & {
        Country: SetDimension & { Values: ListOf__string };
        GPSPoint: GPSPointDimension & {
          Coordinates: GPSCoordinates & { Latitude: number; Longitude: number };
        };
      };
      Metrics: {
        [key: string]:
          | (MetricDimension & { ComparisonOperator: string; Value: number })
          | undefined;
      };
      UserAttributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
    };
    ImportDefinition: SegmentImportResource & {
      ExternalId: string;
      Format: Format;
      RoleArn: string;
      S3Url: string;
      Size: number;
    };
    SegmentGroups: SegmentGroupList & {
      Groups: (SegmentGroup & {
        Dimensions: (SegmentDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          Behavior: SegmentBehaviors & {
            Recency: RecencyDimension & {
              Duration: Duration;
              RecencyType: RecencyType;
            };
          };
          Demographic: SegmentDemographics & {
            AppVersion: SetDimension & { Values: ListOf__string };
            Channel: SetDimension & { Values: ListOf__string };
            DeviceType: SetDimension & { Values: ListOf__string };
            Make: SetDimension & { Values: ListOf__string };
            Model: SetDimension & { Values: ListOf__string };
            Platform: SetDimension & { Values: ListOf__string };
          };
          Location: SegmentLocation & {
            Country: SetDimension & { Values: ListOf__string };
            GPSPoint: GPSPointDimension & {
              Coordinates: GPSCoordinates & {
                Latitude: number;
                Longitude: number;
              };
            };
          };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
          UserAttributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
        })[];
        SourceSegments: (SegmentReference & { Id: string })[];
      })[];
    };
  };
}
export const GetSegmentVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SegmentResponse: S.optional(SegmentResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SegmentResponse" }),
  }),
).annotate({
  identifier: "GetSegmentVersionResponse",
}) as any as S.Schema<GetSegmentVersionResponse>;
export interface GetSegmentVersionsRequest {
  ApplicationId: string;
  PageSize?: string;
  SegmentId: string;
  Token?: string;
}
export const GetSegmentVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    SegmentId: S.String.pipe(T.HttpLabel("SegmentId")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/apps/{ApplicationId}/segments/{SegmentId}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSegmentVersionsRequest",
}) as any as S.Schema<GetSegmentVersionsRequest>;
export interface GetSegmentVersionsResponse {
  SegmentsResponse: SegmentsResponse & {
    Item: (SegmentResponse & {
      ApplicationId: string;
      Arn: string;
      CreationDate: string;
      Id: string;
      SegmentType: SegmentType;
      Dimensions: SegmentDimensions & {
        Attributes: {
          [key: string]:
            | (AttributeDimension & { Values: ListOf__string })
            | undefined;
        };
        Behavior: SegmentBehaviors & {
          Recency: RecencyDimension & {
            Duration: Duration;
            RecencyType: RecencyType;
          };
        };
        Demographic: SegmentDemographics & {
          AppVersion: SetDimension & { Values: ListOf__string };
          Channel: SetDimension & { Values: ListOf__string };
          DeviceType: SetDimension & { Values: ListOf__string };
          Make: SetDimension & { Values: ListOf__string };
          Model: SetDimension & { Values: ListOf__string };
          Platform: SetDimension & { Values: ListOf__string };
        };
        Location: SegmentLocation & {
          Country: SetDimension & { Values: ListOf__string };
          GPSPoint: GPSPointDimension & {
            Coordinates: GPSCoordinates & {
              Latitude: number;
              Longitude: number;
            };
          };
        };
        Metrics: {
          [key: string]:
            | (MetricDimension & { ComparisonOperator: string; Value: number })
            | undefined;
        };
        UserAttributes: {
          [key: string]:
            | (AttributeDimension & { Values: ListOf__string })
            | undefined;
        };
      };
      ImportDefinition: SegmentImportResource & {
        ExternalId: string;
        Format: Format;
        RoleArn: string;
        S3Url: string;
        Size: number;
      };
      SegmentGroups: SegmentGroupList & {
        Groups: (SegmentGroup & {
          Dimensions: (SegmentDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            Behavior: SegmentBehaviors & {
              Recency: RecencyDimension & {
                Duration: Duration;
                RecencyType: RecencyType;
              };
            };
            Demographic: SegmentDemographics & {
              AppVersion: SetDimension & { Values: ListOf__string };
              Channel: SetDimension & { Values: ListOf__string };
              DeviceType: SetDimension & { Values: ListOf__string };
              Make: SetDimension & { Values: ListOf__string };
              Model: SetDimension & { Values: ListOf__string };
              Platform: SetDimension & { Values: ListOf__string };
            };
            Location: SegmentLocation & {
              Country: SetDimension & { Values: ListOf__string };
              GPSPoint: GPSPointDimension & {
                Coordinates: GPSCoordinates & {
                  Latitude: number;
                  Longitude: number;
                };
              };
            };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
            UserAttributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
          })[];
          SourceSegments: (SegmentReference & { Id: string })[];
        })[];
      };
    })[];
  };
}
export const GetSegmentVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SegmentsResponse: S.optional(SegmentsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SegmentsResponse" }),
  }),
).annotate({
  identifier: "GetSegmentVersionsResponse",
}) as any as S.Schema<GetSegmentVersionsResponse>;
export interface GetSmsChannelRequest {
  ApplicationId: string;
}
export const GetSmsChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/channels/sms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSmsChannelRequest",
}) as any as S.Schema<GetSmsChannelRequest>;
export interface GetSmsChannelResponse {
  SMSChannelResponse: SMSChannelResponse & { Platform: string };
}
export const GetSmsChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SMSChannelResponse: S.optional(SMSChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SMSChannelResponse" }),
  }),
).annotate({
  identifier: "GetSmsChannelResponse",
}) as any as S.Schema<GetSmsChannelResponse>;
export interface GetSmsTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export const GetSmsTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/templates/{TemplateName}/sms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSmsTemplateRequest",
}) as any as S.Schema<GetSmsTemplateRequest>;
export interface SMSTemplateResponse {
  Arn?: string;
  Body?: string;
  CreationDate?: string;
  DefaultSubstitutions?: string;
  LastModifiedDate?: string;
  RecommenderId?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: TemplateType;
  Version?: string;
}
export const SMSTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Body: S.optional(S.String),
    CreationDate: S.optional(S.String),
    DefaultSubstitutions: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    RecommenderId: S.optional(S.String),
    tags: S.optional(MapOf__string),
    TemplateDescription: S.optional(S.String),
    TemplateName: S.optional(S.String),
    TemplateType: S.optional(TemplateType),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "SMSTemplateResponse",
}) as any as S.Schema<SMSTemplateResponse>;
export interface GetSmsTemplateResponse {
  SMSTemplateResponse: SMSTemplateResponse & {
    CreationDate: string;
    LastModifiedDate: string;
    TemplateName: string;
    TemplateType: TemplateType;
  };
}
export const GetSmsTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SMSTemplateResponse: S.optional(SMSTemplateResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SMSTemplateResponse" }),
  }),
).annotate({
  identifier: "GetSmsTemplateResponse",
}) as any as S.Schema<GetSmsTemplateResponse>;
export interface GetUserEndpointsRequest {
  ApplicationId: string;
  UserId: string;
}
export const GetUserEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    UserId: S.String.pipe(T.HttpLabel("UserId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/users/{UserId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUserEndpointsRequest",
}) as any as S.Schema<GetUserEndpointsRequest>;
export interface GetUserEndpointsResponse {
  EndpointsResponse: EndpointsResponse & { Item: ListOfEndpointResponse };
}
export const GetUserEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointsResponse: S.optional(EndpointsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EndpointsResponse" }),
  }),
).annotate({
  identifier: "GetUserEndpointsResponse",
}) as any as S.Schema<GetUserEndpointsResponse>;
export interface GetVoiceChannelRequest {
  ApplicationId: string;
}
export const GetVoiceChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/channels/voice" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceChannelRequest",
}) as any as S.Schema<GetVoiceChannelRequest>;
export interface GetVoiceChannelResponse {
  VoiceChannelResponse: VoiceChannelResponse & { Platform: string };
}
export const GetVoiceChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VoiceChannelResponse: S.optional(VoiceChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "VoiceChannelResponse" }),
  }),
).annotate({
  identifier: "GetVoiceChannelResponse",
}) as any as S.Schema<GetVoiceChannelResponse>;
export interface GetVoiceTemplateRequest {
  TemplateName: string;
  Version?: string;
}
export const GetVoiceTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/templates/{TemplateName}/voice" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceTemplateRequest",
}) as any as S.Schema<GetVoiceTemplateRequest>;
export interface VoiceTemplateResponse {
  Arn?: string;
  Body?: string;
  CreationDate?: string;
  DefaultSubstitutions?: string;
  LanguageCode?: string;
  LastModifiedDate?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: TemplateType;
  Version?: string;
  VoiceId?: string;
}
export const VoiceTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Body: S.optional(S.String),
    CreationDate: S.optional(S.String),
    DefaultSubstitutions: S.optional(S.String),
    LanguageCode: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    tags: S.optional(MapOf__string),
    TemplateDescription: S.optional(S.String),
    TemplateName: S.optional(S.String),
    TemplateType: S.optional(TemplateType),
    Version: S.optional(S.String),
    VoiceId: S.optional(S.String),
  }),
).annotate({
  identifier: "VoiceTemplateResponse",
}) as any as S.Schema<VoiceTemplateResponse>;
export interface GetVoiceTemplateResponse {
  VoiceTemplateResponse: VoiceTemplateResponse & {
    CreationDate: string;
    LastModifiedDate: string;
    TemplateName: string;
    TemplateType: TemplateType;
  };
}
export const GetVoiceTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VoiceTemplateResponse: S.optional(VoiceTemplateResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "VoiceTemplateResponse" }),
  }),
).annotate({
  identifier: "GetVoiceTemplateResponse",
}) as any as S.Schema<GetVoiceTemplateResponse>;
export interface ListJourneysRequest {
  ApplicationId: string;
  PageSize?: string;
  Token?: string;
}
export const ListJourneysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    Token: S.optional(S.String).pipe(T.HttpQuery("token")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/apps/{ApplicationId}/journeys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJourneysRequest",
}) as any as S.Schema<ListJourneysRequest>;
export type ListOfJourneyResponse = JourneyResponse[];
export const ListOfJourneyResponse = /*@__PURE__*/ S.Array(JourneyResponse);
export interface JourneysResponse {
  Item?: JourneyResponse[];
  NextToken?: string;
}
export const JourneysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: S.optional(ListOfJourneyResponse),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "JourneysResponse",
}) as any as S.Schema<JourneysResponse>;
export interface ListJourneysResponse {
  JourneysResponse: JourneysResponse & {
    Item: (JourneyResponse & {
      ApplicationId: string;
      Id: string;
      Name: string;
      Activities: {
        [key: string]:
          | (Activity & {
              ConditionalSplit: ConditionalSplitActivity & {
                Condition: Condition & {
                  Conditions: (SimpleCondition & {
                    EventCondition: EventCondition & {
                      Dimensions: EventDimensions & {
                        Attributes: {
                          [key: string]:
                            | (AttributeDimension & { Values: ListOf__string })
                            | undefined;
                        };
                        EventType: SetDimension & { Values: ListOf__string };
                        Metrics: {
                          [key: string]:
                            | (MetricDimension & {
                                ComparisonOperator: string;
                                Value: number;
                              })
                            | undefined;
                        };
                      };
                    };
                    SegmentCondition: SegmentCondition & { SegmentId: string };
                    SegmentDimensions: SegmentDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      Behavior: SegmentBehaviors & {
                        Recency: RecencyDimension & {
                          Duration: Duration;
                          RecencyType: RecencyType;
                        };
                      };
                      Demographic: SegmentDemographics & {
                        AppVersion: SetDimension & { Values: ListOf__string };
                        Channel: SetDimension & { Values: ListOf__string };
                        DeviceType: SetDimension & { Values: ListOf__string };
                        Make: SetDimension & { Values: ListOf__string };
                        Model: SetDimension & { Values: ListOf__string };
                        Platform: SetDimension & { Values: ListOf__string };
                      };
                      Location: SegmentLocation & {
                        Country: SetDimension & { Values: ListOf__string };
                        GPSPoint: GPSPointDimension & {
                          Coordinates: GPSCoordinates & {
                            Latitude: number;
                            Longitude: number;
                          };
                        };
                      };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                      UserAttributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                    };
                  })[];
                };
              };
              Holdout: HoldoutActivity & { Percentage: number };
              MultiCondition: MultiConditionalSplitActivity & {
                Branches: (MultiConditionalBranch & {
                  Condition: SimpleCondition & {
                    EventCondition: EventCondition & {
                      Dimensions: EventDimensions & {
                        Attributes: {
                          [key: string]:
                            | (AttributeDimension & { Values: ListOf__string })
                            | undefined;
                        };
                        EventType: SetDimension & { Values: ListOf__string };
                        Metrics: {
                          [key: string]:
                            | (MetricDimension & {
                                ComparisonOperator: string;
                                Value: number;
                              })
                            | undefined;
                        };
                      };
                    };
                    SegmentCondition: SegmentCondition & { SegmentId: string };
                    SegmentDimensions: SegmentDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      Behavior: SegmentBehaviors & {
                        Recency: RecencyDimension & {
                          Duration: Duration;
                          RecencyType: RecencyType;
                        };
                      };
                      Demographic: SegmentDemographics & {
                        AppVersion: SetDimension & { Values: ListOf__string };
                        Channel: SetDimension & { Values: ListOf__string };
                        DeviceType: SetDimension & { Values: ListOf__string };
                        Make: SetDimension & { Values: ListOf__string };
                        Model: SetDimension & { Values: ListOf__string };
                        Platform: SetDimension & { Values: ListOf__string };
                      };
                      Location: SegmentLocation & {
                        Country: SetDimension & { Values: ListOf__string };
                        GPSPoint: GPSPointDimension & {
                          Coordinates: GPSCoordinates & {
                            Latitude: number;
                            Longitude: number;
                          };
                        };
                      };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                      UserAttributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                    };
                  };
                })[];
              };
            })
          | undefined;
      };
      StartCondition: StartCondition & {
        EventStartCondition: EventStartCondition & {
          EventFilter: EventFilter & {
            Dimensions: EventDimensions & {
              Attributes: {
                [key: string]:
                  | (AttributeDimension & { Values: ListOf__string })
                  | undefined;
              };
              EventType: SetDimension & { Values: ListOf__string };
              Metrics: {
                [key: string]:
                  | (MetricDimension & {
                      ComparisonOperator: string;
                      Value: number;
                    })
                  | undefined;
              };
            };
            FilterType: FilterType;
          };
        };
        SegmentStartCondition: SegmentCondition & { SegmentId: string };
      };
    })[];
  };
}
export const ListJourneysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JourneysResponse: S.optional(JourneysResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "JourneysResponse" }),
  }),
).annotate({
  identifier: "ListJourneysResponse",
}) as any as S.Schema<ListJourneysResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/tags/{ResourceArn}" }),
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
export interface TagsModel {
  tags?: { [key: string]: string | undefined };
}
export const TagsModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(MapOf__string) }),
).annotate({ identifier: "TagsModel" }) as any as S.Schema<TagsModel>;
export interface ListTagsForResourceResponse {
  TagsModel: TagsModel & { tags: MapOf__string };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TagsModel: S.optional(TagsModel)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "TagsModel" }),
  }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTemplatesRequest {
  NextToken?: string;
  PageSize?: string;
  Prefix?: string;
  TemplateType?: string;
}
export const ListTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    Prefix: S.optional(S.String).pipe(T.HttpQuery("prefix")),
    TemplateType: S.optional(S.String).pipe(T.HttpQuery("template-type")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/templates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTemplatesRequest",
}) as any as S.Schema<ListTemplatesRequest>;
export interface TemplateResponse {
  Arn?: string;
  CreationDate?: string;
  DefaultSubstitutions?: string;
  LastModifiedDate?: string;
  tags?: { [key: string]: string | undefined };
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: TemplateType;
  Version?: string;
}
export const TemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationDate: S.optional(S.String),
    DefaultSubstitutions: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    tags: S.optional(MapOf__string),
    TemplateDescription: S.optional(S.String),
    TemplateName: S.optional(S.String),
    TemplateType: S.optional(TemplateType),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "TemplateResponse",
}) as any as S.Schema<TemplateResponse>;
export type ListOfTemplateResponse = TemplateResponse[];
export const ListOfTemplateResponse = /*@__PURE__*/ S.Array(TemplateResponse);
export interface TemplatesResponse {
  Item?: TemplateResponse[];
  NextToken?: string;
}
export const TemplatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: S.optional(ListOfTemplateResponse),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "TemplatesResponse",
}) as any as S.Schema<TemplatesResponse>;
export interface ListTemplatesResponse {
  TemplatesResponse: TemplatesResponse & {
    Item: (TemplateResponse & {
      CreationDate: string;
      LastModifiedDate: string;
      TemplateName: string;
      TemplateType: TemplateType;
    })[];
  };
}
export const ListTemplatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplatesResponse: S.optional(TemplatesResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "TemplatesResponse" }),
  }),
).annotate({
  identifier: "ListTemplatesResponse",
}) as any as S.Schema<ListTemplatesResponse>;
export interface ListTemplateVersionsRequest {
  NextToken?: string;
  PageSize?: string;
  TemplateName: string;
  TemplateType: string;
}
export const ListTemplateVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    PageSize: S.optional(S.String).pipe(T.HttpQuery("page-size")),
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    TemplateType: S.String.pipe(T.HttpLabel("TemplateType")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/v1/templates/{TemplateName}/{TemplateType}/versions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTemplateVersionsRequest",
}) as any as S.Schema<ListTemplateVersionsRequest>;
export interface TemplateVersionResponse {
  CreationDate?: string;
  DefaultSubstitutions?: string;
  LastModifiedDate?: string;
  TemplateDescription?: string;
  TemplateName?: string;
  TemplateType?: string;
  Version?: string;
}
export const TemplateVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreationDate: S.optional(S.String),
    DefaultSubstitutions: S.optional(S.String),
    LastModifiedDate: S.optional(S.String),
    TemplateDescription: S.optional(S.String),
    TemplateName: S.optional(S.String),
    TemplateType: S.optional(S.String),
    Version: S.optional(S.String),
  }),
).annotate({
  identifier: "TemplateVersionResponse",
}) as any as S.Schema<TemplateVersionResponse>;
export type ListOfTemplateVersionResponse = TemplateVersionResponse[];
export const ListOfTemplateVersionResponse = /*@__PURE__*/ S.Array(
  TemplateVersionResponse,
);
export interface TemplateVersionsResponse {
  Item?: TemplateVersionResponse[];
  Message?: string;
  NextToken?: string;
  RequestID?: string;
}
export const TemplateVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Item: S.optional(ListOfTemplateVersionResponse),
    Message: S.optional(S.String),
    NextToken: S.optional(S.String),
    RequestID: S.optional(S.String),
  }),
).annotate({
  identifier: "TemplateVersionsResponse",
}) as any as S.Schema<TemplateVersionsResponse>;
export interface ListTemplateVersionsResponse {
  TemplateVersionsResponse: TemplateVersionsResponse & {
    Item: (TemplateVersionResponse & {
      CreationDate: string;
      LastModifiedDate: string;
      TemplateName: string;
      TemplateType: string;
    })[];
  };
}
export const ListTemplateVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateVersionsResponse: S.optional(TemplateVersionsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "TemplateVersionsResponse" }),
  }),
).annotate({
  identifier: "ListTemplateVersionsResponse",
}) as any as S.Schema<ListTemplateVersionsResponse>;
export interface NumberValidateRequest {
  IsoCountryCode?: string;
  PhoneNumber?: string;
}
export const NumberValidateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IsoCountryCode: S.optional(S.String),
    PhoneNumber: S.optional(S.String),
  }),
).annotate({
  identifier: "NumberValidateRequest",
}) as any as S.Schema<NumberValidateRequest>;
export interface PhoneNumberValidateRequest {
  NumberValidateRequest?: NumberValidateRequest;
}
export const PhoneNumberValidateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumberValidateRequest: S.optional(NumberValidateRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "NumberValidateRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/phone/number/validate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PhoneNumberValidateRequest",
}) as any as S.Schema<PhoneNumberValidateRequest>;
export interface NumberValidateResponse {
  Carrier?: string;
  City?: string;
  CleansedPhoneNumberE164?: string;
  CleansedPhoneNumberNational?: string;
  Country?: string;
  CountryCodeIso2?: string;
  CountryCodeNumeric?: string;
  County?: string;
  OriginalCountryCodeIso2?: string;
  OriginalPhoneNumber?: string;
  PhoneType?: string;
  PhoneTypeCode?: number;
  Timezone?: string;
  ZipCode?: string;
}
export const NumberValidateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Carrier: S.optional(S.String),
    City: S.optional(S.String),
    CleansedPhoneNumberE164: S.optional(S.String),
    CleansedPhoneNumberNational: S.optional(S.String),
    Country: S.optional(S.String),
    CountryCodeIso2: S.optional(S.String),
    CountryCodeNumeric: S.optional(S.String),
    County: S.optional(S.String),
    OriginalCountryCodeIso2: S.optional(S.String),
    OriginalPhoneNumber: S.optional(S.String),
    PhoneType: S.optional(S.String),
    PhoneTypeCode: S.optional(S.Number),
    Timezone: S.optional(S.String),
    ZipCode: S.optional(S.String),
  }),
).annotate({
  identifier: "NumberValidateResponse",
}) as any as S.Schema<NumberValidateResponse>;
export interface PhoneNumberValidateResponse {
  NumberValidateResponse: NumberValidateResponse;
}
export const PhoneNumberValidateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumberValidateResponse: S.optional(NumberValidateResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "NumberValidateResponse" }),
  }),
).annotate({
  identifier: "PhoneNumberValidateResponse",
}) as any as S.Schema<PhoneNumberValidateResponse>;
export interface PublicEndpoint {
  Address?: string;
  Attributes?: { [key: string]: string[] | undefined };
  ChannelType?: ChannelType;
  Demographic?: EndpointDemographic;
  EffectiveDate?: string;
  EndpointStatus?: string;
  Location?: EndpointLocation;
  Metrics?: { [key: string]: number | undefined };
  OptOut?: string;
  RequestId?: string;
  User?: EndpointUser;
}
export const PublicEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: S.optional(S.String),
    Attributes: S.optional(MapOfListOf__string),
    ChannelType: S.optional(ChannelType),
    Demographic: S.optional(EndpointDemographic),
    EffectiveDate: S.optional(S.String),
    EndpointStatus: S.optional(S.String),
    Location: S.optional(EndpointLocation),
    Metrics: S.optional(MapOf__double),
    OptOut: S.optional(S.String),
    RequestId: S.optional(S.String),
    User: S.optional(EndpointUser),
  }),
).annotate({ identifier: "PublicEndpoint" }) as any as S.Schema<PublicEndpoint>;
export interface Session {
  Duration?: number;
  Id?: string;
  StartTimestamp?: string;
  StopTimestamp?: string;
}
export const Session = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Duration: S.optional(S.Number),
    Id: S.optional(S.String),
    StartTimestamp: S.optional(S.String),
    StopTimestamp: S.optional(S.String),
  }),
).annotate({ identifier: "Session" }) as any as S.Schema<Session>;
export interface Event {
  AppPackageName?: string;
  AppTitle?: string;
  AppVersionCode?: string;
  Attributes?: { [key: string]: string | undefined };
  ClientSdkVersion?: string;
  EventType?: string;
  Metrics?: { [key: string]: number | undefined };
  SdkName?: string;
  Session?: Session;
  Timestamp?: string;
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AppPackageName: S.optional(S.String),
    AppTitle: S.optional(S.String),
    AppVersionCode: S.optional(S.String),
    Attributes: S.optional(MapOf__string),
    ClientSdkVersion: S.optional(S.String),
    EventType: S.optional(S.String),
    Metrics: S.optional(MapOf__double),
    SdkName: S.optional(S.String),
    Session: S.optional(Session),
    Timestamp: S.optional(S.String),
  }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export type MapOfEvent = { [key: string]: Event | undefined };
export const MapOfEvent = /*@__PURE__*/ S.Record(
  S.String,
  Event.pipe(S.optional),
);
export interface EventsBatch {
  Endpoint?: PublicEndpoint;
  Events?: { [key: string]: Event | undefined };
}
export const EventsBatch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Endpoint: S.optional(PublicEndpoint),
    Events: S.optional(MapOfEvent),
  }),
).annotate({ identifier: "EventsBatch" }) as any as S.Schema<EventsBatch>;
export type MapOfEventsBatch = { [key: string]: EventsBatch | undefined };
export const MapOfEventsBatch = /*@__PURE__*/ S.Record(
  S.String,
  EventsBatch.pipe(S.optional),
);
export interface EventsRequest {
  BatchItem?: { [key: string]: EventsBatch | undefined };
}
export const EventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BatchItem: S.optional(MapOfEventsBatch) }),
).annotate({ identifier: "EventsRequest" }) as any as S.Schema<EventsRequest>;
export interface PutEventsRequest {
  ApplicationId: string;
  EventsRequest?: EventsRequest;
}
export const PutEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EventsRequest: S.optional(EventsRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EventsRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/apps/{ApplicationId}/events" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutEventsRequest",
}) as any as S.Schema<PutEventsRequest>;
export interface EndpointItemResponse {
  Message?: string;
  StatusCode?: number;
}
export const EndpointItemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String), StatusCode: S.optional(S.Number) }),
).annotate({
  identifier: "EndpointItemResponse",
}) as any as S.Schema<EndpointItemResponse>;
export interface EventItemResponse {
  Message?: string;
  StatusCode?: number;
}
export const EventItemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Message: S.optional(S.String), StatusCode: S.optional(S.Number) }),
).annotate({
  identifier: "EventItemResponse",
}) as any as S.Schema<EventItemResponse>;
export type MapOfEventItemResponse = {
  [key: string]: EventItemResponse | undefined;
};
export const MapOfEventItemResponse = /*@__PURE__*/ S.Record(
  S.String,
  EventItemResponse.pipe(S.optional),
);
export interface ItemResponse {
  EndpointItemResponse?: EndpointItemResponse;
  EventsItemResponse?: { [key: string]: EventItemResponse | undefined };
}
export const ItemResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndpointItemResponse: S.optional(EndpointItemResponse),
    EventsItemResponse: S.optional(MapOfEventItemResponse),
  }),
).annotate({ identifier: "ItemResponse" }) as any as S.Schema<ItemResponse>;
export type MapOfItemResponse = { [key: string]: ItemResponse | undefined };
export const MapOfItemResponse = /*@__PURE__*/ S.Record(
  S.String,
  ItemResponse.pipe(S.optional),
);
export interface EventsResponse {
  Results?: { [key: string]: ItemResponse | undefined };
}
export const EventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Results: S.optional(MapOfItemResponse) }),
).annotate({ identifier: "EventsResponse" }) as any as S.Schema<EventsResponse>;
export interface PutEventsResponse {
  EventsResponse: EventsResponse;
}
export const PutEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventsResponse: S.optional(EventsResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EventsResponse" }),
  }),
).annotate({
  identifier: "PutEventsResponse",
}) as any as S.Schema<PutEventsResponse>;
export interface WriteEventStream {
  DestinationStreamArn?: string;
  RoleArn?: string;
}
export const WriteEventStream = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationStreamArn: S.optional(S.String),
    RoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "WriteEventStream",
}) as any as S.Schema<WriteEventStream>;
export interface PutEventStreamRequest {
  ApplicationId: string;
  WriteEventStream?: WriteEventStream;
}
export const PutEventStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    WriteEventStream: S.optional(WriteEventStream)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "WriteEventStream" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/apps/{ApplicationId}/eventstream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutEventStreamRequest",
}) as any as S.Schema<PutEventStreamRequest>;
export interface PutEventStreamResponse {
  EventStream: EventStream & {
    ApplicationId: string;
    DestinationStreamArn: string;
    RoleArn: string;
  };
}
export const PutEventStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventStream: S.optional(EventStream)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EventStream" }),
  }),
).annotate({
  identifier: "PutEventStreamResponse",
}) as any as S.Schema<PutEventStreamResponse>;
export interface UpdateAttributesRequest {
  Blacklist?: string[];
}
export const UpdateAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Blacklist: S.optional(ListOf__string) }),
).annotate({
  identifier: "UpdateAttributesRequest",
}) as any as S.Schema<UpdateAttributesRequest>;
export interface RemoveAttributesRequest {
  ApplicationId: string;
  AttributeType: string;
  UpdateAttributesRequest?: UpdateAttributesRequest;
}
export const RemoveAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    AttributeType: S.String.pipe(T.HttpLabel("AttributeType")),
    UpdateAttributesRequest: S.optional(UpdateAttributesRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "UpdateAttributesRequest" }),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/apps/{ApplicationId}/attributes/{AttributeType}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RemoveAttributesRequest",
}) as any as S.Schema<RemoveAttributesRequest>;
export interface AttributesResource {
  ApplicationId?: string;
  AttributeType?: string;
  Attributes?: string[];
}
export const AttributesResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    AttributeType: S.optional(S.String),
    Attributes: S.optional(ListOf__string),
  }),
).annotate({
  identifier: "AttributesResource",
}) as any as S.Schema<AttributesResource>;
export interface RemoveAttributesResponse {
  AttributesResource: AttributesResource & {
    ApplicationId: string;
    AttributeType: string;
  };
}
export const RemoveAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttributesResource: S.optional(AttributesResource)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "AttributesResource" }),
  }),
).annotate({
  identifier: "RemoveAttributesResponse",
}) as any as S.Schema<RemoveAttributesResponse>;
export interface AddressConfiguration {
  BodyOverride?: string;
  ChannelType?: ChannelType;
  Context?: { [key: string]: string | undefined };
  RawContent?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  TitleOverride?: string;
}
export const AddressConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BodyOverride: S.optional(S.String),
    ChannelType: S.optional(ChannelType),
    Context: S.optional(MapOf__string),
    RawContent: S.optional(S.String),
    Substitutions: S.optional(MapOfListOf__string),
    TitleOverride: S.optional(S.String),
  }),
).annotate({
  identifier: "AddressConfiguration",
}) as any as S.Schema<AddressConfiguration>;
export type MapOfAddressConfiguration = {
  [key: string]: AddressConfiguration | undefined;
};
export const MapOfAddressConfiguration = /*@__PURE__*/ S.Record(
  S.String,
  AddressConfiguration.pipe(S.optional),
);
export interface EndpointSendConfiguration {
  BodyOverride?: string;
  Context?: { [key: string]: string | undefined };
  RawContent?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  TitleOverride?: string;
}
export const EndpointSendConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BodyOverride: S.optional(S.String),
    Context: S.optional(MapOf__string),
    RawContent: S.optional(S.String),
    Substitutions: S.optional(MapOfListOf__string),
    TitleOverride: S.optional(S.String),
  }),
).annotate({
  identifier: "EndpointSendConfiguration",
}) as any as S.Schema<EndpointSendConfiguration>;
export type MapOfEndpointSendConfiguration = {
  [key: string]: EndpointSendConfiguration | undefined;
};
export const MapOfEndpointSendConfiguration = /*@__PURE__*/ S.Record(
  S.String,
  EndpointSendConfiguration.pipe(S.optional),
);
export interface ADMMessage {
  Action?: Action;
  Body?: string;
  ConsolidationKey?: string;
  Data?: { [key: string]: string | undefined };
  ExpiresAfter?: string;
  IconReference?: string;
  ImageIconUrl?: string;
  ImageUrl?: string;
  MD5?: string;
  RawContent?: string;
  SilentPush?: boolean;
  SmallImageIconUrl?: string;
  Sound?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  Title?: string;
  Url?: string;
}
export const ADMMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Body: S.optional(S.String),
    ConsolidationKey: S.optional(S.String),
    Data: S.optional(MapOf__string),
    ExpiresAfter: S.optional(S.String),
    IconReference: S.optional(S.String),
    ImageIconUrl: S.optional(S.String),
    ImageUrl: S.optional(S.String),
    MD5: S.optional(S.String),
    RawContent: S.optional(S.String),
    SilentPush: S.optional(S.Boolean),
    SmallImageIconUrl: S.optional(S.String),
    Sound: S.optional(S.String),
    Substitutions: S.optional(MapOfListOf__string),
    Title: S.optional(S.String),
    Url: S.optional(S.String),
  }),
).annotate({ identifier: "ADMMessage" }) as any as S.Schema<ADMMessage>;
export interface APNSMessage {
  APNSPushType?: string;
  Action?: Action;
  Badge?: number;
  Body?: string;
  Category?: string;
  CollapseId?: string;
  Data?: { [key: string]: string | undefined };
  MediaUrl?: string;
  PreferredAuthenticationMethod?: string;
  Priority?: string;
  RawContent?: string;
  SilentPush?: boolean;
  Sound?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  ThreadId?: string;
  TimeToLive?: number;
  Title?: string;
  Url?: string;
}
export const APNSMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSPushType: S.optional(S.String),
    Action: S.optional(Action),
    Badge: S.optional(S.Number),
    Body: S.optional(S.String),
    Category: S.optional(S.String),
    CollapseId: S.optional(S.String),
    Data: S.optional(MapOf__string),
    MediaUrl: S.optional(S.String),
    PreferredAuthenticationMethod: S.optional(S.String),
    Priority: S.optional(S.String),
    RawContent: S.optional(S.String),
    SilentPush: S.optional(S.Boolean),
    Sound: S.optional(S.String),
    Substitutions: S.optional(MapOfListOf__string),
    ThreadId: S.optional(S.String),
    TimeToLive: S.optional(S.Number),
    Title: S.optional(S.String),
    Url: S.optional(S.String),
  }),
).annotate({ identifier: "APNSMessage" }) as any as S.Schema<APNSMessage>;
export interface BaiduMessage {
  Action?: Action;
  Body?: string;
  Data?: { [key: string]: string | undefined };
  IconReference?: string;
  ImageIconUrl?: string;
  ImageUrl?: string;
  RawContent?: string;
  SilentPush?: boolean;
  SmallImageIconUrl?: string;
  Sound?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  TimeToLive?: number;
  Title?: string;
  Url?: string;
}
export const BaiduMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Body: S.optional(S.String),
    Data: S.optional(MapOf__string),
    IconReference: S.optional(S.String),
    ImageIconUrl: S.optional(S.String),
    ImageUrl: S.optional(S.String),
    RawContent: S.optional(S.String),
    SilentPush: S.optional(S.Boolean),
    SmallImageIconUrl: S.optional(S.String),
    Sound: S.optional(S.String),
    Substitutions: S.optional(MapOfListOf__string),
    TimeToLive: S.optional(S.Number),
    Title: S.optional(S.String),
    Url: S.optional(S.String),
  }),
).annotate({ identifier: "BaiduMessage" }) as any as S.Schema<BaiduMessage>;
export interface DefaultMessage {
  Body?: string;
  Substitutions?: { [key: string]: string[] | undefined };
}
export const DefaultMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    Substitutions: S.optional(MapOfListOf__string),
  }),
).annotate({ identifier: "DefaultMessage" }) as any as S.Schema<DefaultMessage>;
export interface DefaultPushNotificationMessage {
  Action?: Action;
  Body?: string;
  Data?: { [key: string]: string | undefined };
  SilentPush?: boolean;
  Substitutions?: { [key: string]: string[] | undefined };
  Title?: string;
  Url?: string;
}
export const DefaultPushNotificationMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Body: S.optional(S.String),
    Data: S.optional(MapOf__string),
    SilentPush: S.optional(S.Boolean),
    Substitutions: S.optional(MapOfListOf__string),
    Title: S.optional(S.String),
    Url: S.optional(S.String),
  }),
).annotate({
  identifier: "DefaultPushNotificationMessage",
}) as any as S.Schema<DefaultPushNotificationMessage>;
export type __blob = Uint8Array;
export interface RawEmail {
  Data?: Uint8Array;
}
export const RawEmail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Data: S.optional(T.Blob) }),
).annotate({ identifier: "RawEmail" }) as any as S.Schema<RawEmail>;
export interface SimpleEmailPart {
  Charset?: string;
  Data?: string;
}
export const SimpleEmailPart = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Charset: S.optional(S.String), Data: S.optional(S.String) }),
).annotate({
  identifier: "SimpleEmailPart",
}) as any as S.Schema<SimpleEmailPart>;
export interface SimpleEmail {
  HtmlPart?: SimpleEmailPart;
  Subject?: SimpleEmailPart;
  TextPart?: SimpleEmailPart;
  Headers?: MessageHeader[];
}
export const SimpleEmail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HtmlPart: S.optional(SimpleEmailPart),
    Subject: S.optional(SimpleEmailPart),
    TextPart: S.optional(SimpleEmailPart),
    Headers: S.optional(ListOfMessageHeader),
  }),
).annotate({ identifier: "SimpleEmail" }) as any as S.Schema<SimpleEmail>;
export interface EmailMessage {
  Body?: string;
  FeedbackForwardingAddress?: string;
  FromAddress?: string;
  RawEmail?: RawEmail;
  ReplyToAddresses?: string[];
  SimpleEmail?: SimpleEmail;
  Substitutions?: { [key: string]: string[] | undefined };
}
export const EmailMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    FeedbackForwardingAddress: S.optional(S.String),
    FromAddress: S.optional(S.String),
    RawEmail: S.optional(RawEmail),
    ReplyToAddresses: S.optional(ListOf__string),
    SimpleEmail: S.optional(SimpleEmail),
    Substitutions: S.optional(MapOfListOf__string),
  }),
).annotate({ identifier: "EmailMessage" }) as any as S.Schema<EmailMessage>;
export interface GCMMessage {
  Action?: Action;
  Body?: string;
  CollapseKey?: string;
  Data?: { [key: string]: string | undefined };
  IconReference?: string;
  ImageIconUrl?: string;
  ImageUrl?: string;
  PreferredAuthenticationMethod?: string;
  Priority?: string;
  RawContent?: string;
  RestrictedPackageName?: string;
  SilentPush?: boolean;
  SmallImageIconUrl?: string;
  Sound?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  TimeToLive?: number;
  Title?: string;
  Url?: string;
}
export const GCMMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Action: S.optional(Action),
    Body: S.optional(S.String),
    CollapseKey: S.optional(S.String),
    Data: S.optional(MapOf__string),
    IconReference: S.optional(S.String),
    ImageIconUrl: S.optional(S.String),
    ImageUrl: S.optional(S.String),
    PreferredAuthenticationMethod: S.optional(S.String),
    Priority: S.optional(S.String),
    RawContent: S.optional(S.String),
    RestrictedPackageName: S.optional(S.String),
    SilentPush: S.optional(S.Boolean),
    SmallImageIconUrl: S.optional(S.String),
    Sound: S.optional(S.String),
    Substitutions: S.optional(MapOfListOf__string),
    TimeToLive: S.optional(S.Number),
    Title: S.optional(S.String),
    Url: S.optional(S.String),
  }),
).annotate({ identifier: "GCMMessage" }) as any as S.Schema<GCMMessage>;
export interface SMSMessage {
  Body?: string;
  Keyword?: string;
  MediaUrl?: string;
  MessageType?: MessageType;
  OriginationNumber?: string;
  SenderId?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  EntityId?: string;
  TemplateId?: string;
}
export const SMSMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    Keyword: S.optional(S.String),
    MediaUrl: S.optional(S.String),
    MessageType: S.optional(MessageType),
    OriginationNumber: S.optional(S.String),
    SenderId: S.optional(S.String),
    Substitutions: S.optional(MapOfListOf__string),
    EntityId: S.optional(S.String),
    TemplateId: S.optional(S.String),
  }),
).annotate({ identifier: "SMSMessage" }) as any as S.Schema<SMSMessage>;
export interface VoiceMessage {
  Body?: string;
  LanguageCode?: string;
  OriginationNumber?: string;
  Substitutions?: { [key: string]: string[] | undefined };
  VoiceId?: string;
}
export const VoiceMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    LanguageCode: S.optional(S.String),
    OriginationNumber: S.optional(S.String),
    Substitutions: S.optional(MapOfListOf__string),
    VoiceId: S.optional(S.String),
  }),
).annotate({ identifier: "VoiceMessage" }) as any as S.Schema<VoiceMessage>;
export interface DirectMessageConfiguration {
  ADMMessage?: ADMMessage;
  APNSMessage?: APNSMessage;
  BaiduMessage?: BaiduMessage;
  DefaultMessage?: DefaultMessage;
  DefaultPushNotificationMessage?: DefaultPushNotificationMessage;
  EmailMessage?: EmailMessage;
  GCMMessage?: GCMMessage;
  SMSMessage?: SMSMessage;
  VoiceMessage?: VoiceMessage;
}
export const DirectMessageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ADMMessage: S.optional(ADMMessage),
    APNSMessage: S.optional(APNSMessage),
    BaiduMessage: S.optional(BaiduMessage),
    DefaultMessage: S.optional(DefaultMessage),
    DefaultPushNotificationMessage: S.optional(DefaultPushNotificationMessage),
    EmailMessage: S.optional(EmailMessage),
    GCMMessage: S.optional(GCMMessage),
    SMSMessage: S.optional(SMSMessage),
    VoiceMessage: S.optional(VoiceMessage),
  }),
).annotate({
  identifier: "DirectMessageConfiguration",
}) as any as S.Schema<DirectMessageConfiguration>;
export interface MessageRequest {
  Addresses?: { [key: string]: AddressConfiguration | undefined };
  Context?: { [key: string]: string | undefined };
  Endpoints?: { [key: string]: EndpointSendConfiguration | undefined };
  MessageConfiguration?: DirectMessageConfiguration;
  TemplateConfiguration?: TemplateConfiguration;
  TraceId?: string;
}
export const MessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Addresses: S.optional(MapOfAddressConfiguration),
    Context: S.optional(MapOf__string),
    Endpoints: S.optional(MapOfEndpointSendConfiguration),
    MessageConfiguration: S.optional(DirectMessageConfiguration),
    TemplateConfiguration: S.optional(TemplateConfiguration),
    TraceId: S.optional(S.String),
  }),
).annotate({ identifier: "MessageRequest" }) as any as S.Schema<MessageRequest>;
export interface SendMessagesRequest {
  ApplicationId: string;
  MessageRequest?: MessageRequest;
}
export const SendMessagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    MessageRequest: S.optional(MessageRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/apps/{ApplicationId}/messages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendMessagesRequest",
}) as any as S.Schema<SendMessagesRequest>;
export type DeliveryStatus =
  | "SUCCESSFUL"
  | "THROTTLED"
  | "TEMPORARY_FAILURE"
  | "PERMANENT_FAILURE"
  | "UNKNOWN_FAILURE"
  | "OPT_OUT"
  | "DUPLICATE"
  | (string & {});
export const DeliveryStatus = S.String;

export interface EndpointMessageResult {
  Address?: string;
  DeliveryStatus?: DeliveryStatus;
  MessageId?: string;
  StatusCode?: number;
  StatusMessage?: string;
  UpdatedToken?: string;
}
export const EndpointMessageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: S.optional(S.String),
    DeliveryStatus: S.optional(DeliveryStatus),
    MessageId: S.optional(S.String),
    StatusCode: S.optional(S.Number),
    StatusMessage: S.optional(S.String),
    UpdatedToken: S.optional(S.String),
  }),
).annotate({
  identifier: "EndpointMessageResult",
}) as any as S.Schema<EndpointMessageResult>;
export type MapOfEndpointMessageResult = {
  [key: string]: EndpointMessageResult | undefined;
};
export const MapOfEndpointMessageResult = /*@__PURE__*/ S.Record(
  S.String,
  EndpointMessageResult.pipe(S.optional),
);
export interface MessageResult {
  DeliveryStatus?: DeliveryStatus;
  MessageId?: string;
  StatusCode?: number;
  StatusMessage?: string;
  UpdatedToken?: string;
}
export const MessageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliveryStatus: S.optional(DeliveryStatus),
    MessageId: S.optional(S.String),
    StatusCode: S.optional(S.Number),
    StatusMessage: S.optional(S.String),
    UpdatedToken: S.optional(S.String),
  }),
).annotate({ identifier: "MessageResult" }) as any as S.Schema<MessageResult>;
export type MapOfMessageResult = { [key: string]: MessageResult | undefined };
export const MapOfMessageResult = /*@__PURE__*/ S.Record(
  S.String,
  MessageResult.pipe(S.optional),
);
export interface MessageResponse {
  ApplicationId?: string;
  EndpointResult?: { [key: string]: EndpointMessageResult | undefined };
  RequestId?: string;
  Result?: { [key: string]: MessageResult | undefined };
}
export const MessageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    EndpointResult: S.optional(MapOfEndpointMessageResult),
    RequestId: S.optional(S.String),
    Result: S.optional(MapOfMessageResult),
  }),
).annotate({
  identifier: "MessageResponse",
}) as any as S.Schema<MessageResponse>;
export interface SendMessagesResponse {
  MessageResponse: MessageResponse & {
    ApplicationId: string;
    EndpointResult: {
      [key: string]:
        | (EndpointMessageResult & {
            DeliveryStatus: DeliveryStatus;
            StatusCode: number;
          })
        | undefined;
    };
    Result: {
      [key: string]:
        | (MessageResult & {
            DeliveryStatus: DeliveryStatus;
            StatusCode: number;
          })
        | undefined;
    };
  };
}
export const SendMessagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageResponse: S.optional(MessageResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageResponse" }),
  }),
).annotate({
  identifier: "SendMessagesResponse",
}) as any as S.Schema<SendMessagesResponse>;
export interface SendOTPMessageRequestParameters {
  AllowedAttempts?: number;
  BrandName?: string;
  Channel?: string;
  CodeLength?: number;
  DestinationIdentity?: string;
  EntityId?: string;
  Language?: string;
  OriginationIdentity?: string;
  ReferenceId?: string;
  TemplateId?: string;
  ValidityPeriod?: number;
}
export const SendOTPMessageRequestParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowedAttempts: S.optional(S.Number),
    BrandName: S.optional(S.String),
    Channel: S.optional(S.String),
    CodeLength: S.optional(S.Number),
    DestinationIdentity: S.optional(S.String),
    EntityId: S.optional(S.String),
    Language: S.optional(S.String),
    OriginationIdentity: S.optional(S.String),
    ReferenceId: S.optional(S.String),
    TemplateId: S.optional(S.String),
    ValidityPeriod: S.optional(S.Number),
  }),
).annotate({
  identifier: "SendOTPMessageRequestParameters",
}) as any as S.Schema<SendOTPMessageRequestParameters>;
export interface SendOTPMessageRequest {
  ApplicationId: string;
  SendOTPMessageRequestParameters?: SendOTPMessageRequestParameters;
}
export const SendOTPMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    SendOTPMessageRequestParameters: S.optional(SendOTPMessageRequestParameters)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SendOTPMessageRequestParameters" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/apps/{ApplicationId}/otp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendOTPMessageRequest",
}) as any as S.Schema<SendOTPMessageRequest>;
export interface SendOTPMessageResponse {
  MessageResponse: MessageResponse & {
    ApplicationId: string;
    EndpointResult: {
      [key: string]:
        | (EndpointMessageResult & {
            DeliveryStatus: DeliveryStatus;
            StatusCode: number;
          })
        | undefined;
    };
    Result: {
      [key: string]:
        | (MessageResult & {
            DeliveryStatus: DeliveryStatus;
            StatusCode: number;
          })
        | undefined;
    };
  };
}
export const SendOTPMessageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageResponse: S.optional(MessageResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageResponse" }),
  }),
).annotate({
  identifier: "SendOTPMessageResponse",
}) as any as S.Schema<SendOTPMessageResponse>;
export interface SendUsersMessageRequest {
  Context?: { [key: string]: string | undefined };
  MessageConfiguration?: DirectMessageConfiguration;
  TemplateConfiguration?: TemplateConfiguration;
  TraceId?: string;
  Users?: { [key: string]: EndpointSendConfiguration | undefined };
}
export const SendUsersMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Context: S.optional(MapOf__string),
    MessageConfiguration: S.optional(DirectMessageConfiguration),
    TemplateConfiguration: S.optional(TemplateConfiguration),
    TraceId: S.optional(S.String),
    Users: S.optional(MapOfEndpointSendConfiguration),
  }),
).annotate({
  identifier: "SendUsersMessageRequest",
}) as any as S.Schema<SendUsersMessageRequest>;
export interface SendUsersMessagesRequest {
  ApplicationId: string;
  SendUsersMessageRequest?: SendUsersMessageRequest;
}
export const SendUsersMessagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    SendUsersMessageRequest: S.optional(SendUsersMessageRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SendUsersMessageRequest" }),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/v1/apps/{ApplicationId}/users-messages",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendUsersMessagesRequest",
}) as any as S.Schema<SendUsersMessagesRequest>;
export type MapOfMapOfEndpointMessageResult = {
  [key: string]:
    | { [key: string]: EndpointMessageResult | undefined }
    | undefined;
};
export const MapOfMapOfEndpointMessageResult = /*@__PURE__*/ S.Record(
  S.String,
  MapOfEndpointMessageResult.pipe(S.optional),
);
export interface SendUsersMessageResponse {
  ApplicationId?: string;
  RequestId?: string;
  Result?: {
    [key: string]:
      | { [key: string]: EndpointMessageResult | undefined }
      | undefined;
  };
}
export const SendUsersMessageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.optional(S.String),
    RequestId: S.optional(S.String),
    Result: S.optional(MapOfMapOfEndpointMessageResult),
  }),
).annotate({
  identifier: "SendUsersMessageResponse",
}) as any as S.Schema<SendUsersMessageResponse>;
export interface SendUsersMessagesResponse {
  SendUsersMessageResponse: SendUsersMessageResponse & {
    ApplicationId: string;
    Result: {
      [key: string]:
        | {
            [key: string]:
              | (EndpointMessageResult & {
                  DeliveryStatus: DeliveryStatus;
                  StatusCode: number;
                })
              | undefined;
          }
        | undefined;
    };
  };
}
export const SendUsersMessagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SendUsersMessageResponse: S.optional(SendUsersMessageResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SendUsersMessageResponse" }),
  }),
).annotate({
  identifier: "SendUsersMessagesResponse",
}) as any as S.Schema<SendUsersMessagesResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  TagsModel?: TagsModel;
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagsModel: S.optional(TagsModel)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "TagsModel" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/tags/{ResourceArn}" }),
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
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(ListOf__string).pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/tags/{ResourceArn}" }),
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
export interface ADMChannelRequest {
  ClientId?: string;
  ClientSecret?: string;
  Enabled?: boolean;
}
export const ADMChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientId: S.optional(S.String),
    ClientSecret: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ADMChannelRequest",
}) as any as S.Schema<ADMChannelRequest>;
export interface UpdateAdmChannelRequest {
  ADMChannelRequest?: ADMChannelRequest;
  ApplicationId: string;
}
export const UpdateAdmChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ADMChannelRequest: S.optional(ADMChannelRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ADMChannelRequest" }),
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/apps/{ApplicationId}/channels/adm" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAdmChannelRequest",
}) as any as S.Schema<UpdateAdmChannelRequest>;
export interface UpdateAdmChannelResponse {
  ADMChannelResponse: ADMChannelResponse & { Platform: string };
}
export const UpdateAdmChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ADMChannelResponse: S.optional(ADMChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ADMChannelResponse" }),
  }),
).annotate({
  identifier: "UpdateAdmChannelResponse",
}) as any as S.Schema<UpdateAdmChannelResponse>;
export interface APNSChannelRequest {
  BundleId?: string;
  Certificate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  PrivateKey?: string;
  TeamId?: string;
  TokenKey?: string;
  TokenKeyId?: string;
}
export const APNSChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BundleId: S.optional(S.String),
    Certificate: S.optional(S.String),
    DefaultAuthenticationMethod: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    PrivateKey: S.optional(S.String),
    TeamId: S.optional(S.String),
    TokenKey: S.optional(S.String),
    TokenKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "APNSChannelRequest",
}) as any as S.Schema<APNSChannelRequest>;
export interface UpdateApnsChannelRequest {
  APNSChannelRequest?: APNSChannelRequest;
  ApplicationId: string;
}
export const UpdateApnsChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSChannelRequest: S.optional(APNSChannelRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSChannelRequest" }),
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/apps/{ApplicationId}/channels/apns" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApnsChannelRequest",
}) as any as S.Schema<UpdateApnsChannelRequest>;
export interface UpdateApnsChannelResponse {
  APNSChannelResponse: APNSChannelResponse & { Platform: string };
}
export const UpdateApnsChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSChannelResponse: S.optional(APNSChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSChannelResponse" }),
  }),
).annotate({
  identifier: "UpdateApnsChannelResponse",
}) as any as S.Schema<UpdateApnsChannelResponse>;
export interface APNSSandboxChannelRequest {
  BundleId?: string;
  Certificate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  PrivateKey?: string;
  TeamId?: string;
  TokenKey?: string;
  TokenKeyId?: string;
}
export const APNSSandboxChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BundleId: S.optional(S.String),
    Certificate: S.optional(S.String),
    DefaultAuthenticationMethod: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    PrivateKey: S.optional(S.String),
    TeamId: S.optional(S.String),
    TokenKey: S.optional(S.String),
    TokenKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "APNSSandboxChannelRequest",
}) as any as S.Schema<APNSSandboxChannelRequest>;
export interface UpdateApnsSandboxChannelRequest {
  APNSSandboxChannelRequest?: APNSSandboxChannelRequest;
  ApplicationId: string;
}
export const UpdateApnsSandboxChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSSandboxChannelRequest: S.optional(APNSSandboxChannelRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSSandboxChannelRequest" }),
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/apps/{ApplicationId}/channels/apns_sandbox",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApnsSandboxChannelRequest",
}) as any as S.Schema<UpdateApnsSandboxChannelRequest>;
export interface UpdateApnsSandboxChannelResponse {
  APNSSandboxChannelResponse: APNSSandboxChannelResponse & { Platform: string };
}
export const UpdateApnsSandboxChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSSandboxChannelResponse: S.optional(APNSSandboxChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSSandboxChannelResponse" }),
  }),
).annotate({
  identifier: "UpdateApnsSandboxChannelResponse",
}) as any as S.Schema<UpdateApnsSandboxChannelResponse>;
export interface APNSVoipChannelRequest {
  BundleId?: string;
  Certificate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  PrivateKey?: string;
  TeamId?: string;
  TokenKey?: string;
  TokenKeyId?: string;
}
export const APNSVoipChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BundleId: S.optional(S.String),
    Certificate: S.optional(S.String),
    DefaultAuthenticationMethod: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    PrivateKey: S.optional(S.String),
    TeamId: S.optional(S.String),
    TokenKey: S.optional(S.String),
    TokenKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "APNSVoipChannelRequest",
}) as any as S.Schema<APNSVoipChannelRequest>;
export interface UpdateApnsVoipChannelRequest {
  APNSVoipChannelRequest?: APNSVoipChannelRequest;
  ApplicationId: string;
}
export const UpdateApnsVoipChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSVoipChannelRequest: S.optional(APNSVoipChannelRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSVoipChannelRequest" }),
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/apps/{ApplicationId}/channels/apns_voip",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApnsVoipChannelRequest",
}) as any as S.Schema<UpdateApnsVoipChannelRequest>;
export interface UpdateApnsVoipChannelResponse {
  APNSVoipChannelResponse: APNSVoipChannelResponse & { Platform: string };
}
export const UpdateApnsVoipChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSVoipChannelResponse: S.optional(APNSVoipChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSVoipChannelResponse" }),
  }),
).annotate({
  identifier: "UpdateApnsVoipChannelResponse",
}) as any as S.Schema<UpdateApnsVoipChannelResponse>;
export interface APNSVoipSandboxChannelRequest {
  BundleId?: string;
  Certificate?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  PrivateKey?: string;
  TeamId?: string;
  TokenKey?: string;
  TokenKeyId?: string;
}
export const APNSVoipSandboxChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BundleId: S.optional(S.String),
    Certificate: S.optional(S.String),
    DefaultAuthenticationMethod: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    PrivateKey: S.optional(S.String),
    TeamId: S.optional(S.String),
    TokenKey: S.optional(S.String),
    TokenKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "APNSVoipSandboxChannelRequest",
}) as any as S.Schema<APNSVoipSandboxChannelRequest>;
export interface UpdateApnsVoipSandboxChannelRequest {
  APNSVoipSandboxChannelRequest?: APNSVoipSandboxChannelRequest;
  ApplicationId: string;
}
export const UpdateApnsVoipSandboxChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    APNSVoipSandboxChannelRequest: S.optional(APNSVoipSandboxChannelRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "APNSVoipSandboxChannelRequest" }),
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/apps/{ApplicationId}/channels/apns_voip_sandbox",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApnsVoipSandboxChannelRequest",
}) as any as S.Schema<UpdateApnsVoipSandboxChannelRequest>;
export interface UpdateApnsVoipSandboxChannelResponse {
  APNSVoipSandboxChannelResponse: APNSVoipSandboxChannelResponse & {
    Platform: string;
  };
}
export const UpdateApnsVoipSandboxChannelResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      APNSVoipSandboxChannelResponse: S.optional(APNSVoipSandboxChannelResponse)
        .pipe(T.HttpPayload())
        .annotate({ identifier: "APNSVoipSandboxChannelResponse" }),
    }),
).annotate({
  identifier: "UpdateApnsVoipSandboxChannelResponse",
}) as any as S.Schema<UpdateApnsVoipSandboxChannelResponse>;
export interface WriteApplicationSettingsRequest {
  CampaignHook?: CampaignHook;
  CloudWatchMetricsEnabled?: boolean;
  EventTaggingEnabled?: boolean;
  Limits?: CampaignLimits;
  QuietTime?: QuietTime;
  JourneyLimits?: ApplicationSettingsJourneyLimits;
}
export const WriteApplicationSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignHook: S.optional(CampaignHook),
    CloudWatchMetricsEnabled: S.optional(S.Boolean),
    EventTaggingEnabled: S.optional(S.Boolean),
    Limits: S.optional(CampaignLimits),
    QuietTime: S.optional(QuietTime),
    JourneyLimits: S.optional(ApplicationSettingsJourneyLimits),
  }),
).annotate({
  identifier: "WriteApplicationSettingsRequest",
}) as any as S.Schema<WriteApplicationSettingsRequest>;
export interface UpdateApplicationSettingsRequest {
  ApplicationId: string;
  WriteApplicationSettingsRequest?: WriteApplicationSettingsRequest;
}
export const UpdateApplicationSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    WriteApplicationSettingsRequest: S.optional(WriteApplicationSettingsRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "WriteApplicationSettingsRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/apps/{ApplicationId}/settings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateApplicationSettingsRequest",
}) as any as S.Schema<UpdateApplicationSettingsRequest>;
export interface UpdateApplicationSettingsResponse {
  ApplicationSettingsResource: ApplicationSettingsResource & {
    ApplicationId: string;
  };
}
export const UpdateApplicationSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationSettingsResource: S.optional(ApplicationSettingsResource)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "ApplicationSettingsResource" }),
  }),
).annotate({
  identifier: "UpdateApplicationSettingsResponse",
}) as any as S.Schema<UpdateApplicationSettingsResponse>;
export interface BaiduChannelRequest {
  ApiKey?: string;
  Enabled?: boolean;
  SecretKey?: string;
}
export const BaiduChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiKey: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    SecretKey: S.optional(S.String),
  }),
).annotate({
  identifier: "BaiduChannelRequest",
}) as any as S.Schema<BaiduChannelRequest>;
export interface UpdateBaiduChannelRequest {
  ApplicationId: string;
  BaiduChannelRequest?: BaiduChannelRequest;
}
export const UpdateBaiduChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    BaiduChannelRequest: S.optional(BaiduChannelRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "BaiduChannelRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/apps/{ApplicationId}/channels/baidu" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBaiduChannelRequest",
}) as any as S.Schema<UpdateBaiduChannelRequest>;
export interface UpdateBaiduChannelResponse {
  BaiduChannelResponse: BaiduChannelResponse & {
    Credential: string;
    Platform: string;
  };
}
export const UpdateBaiduChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BaiduChannelResponse: S.optional(BaiduChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "BaiduChannelResponse" }),
  }),
).annotate({
  identifier: "UpdateBaiduChannelResponse",
}) as any as S.Schema<UpdateBaiduChannelResponse>;
export interface UpdateCampaignRequest {
  ApplicationId: string;
  CampaignId: string;
  WriteCampaignRequest?: WriteCampaignRequest;
}
export const UpdateCampaignRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    CampaignId: S.String.pipe(T.HttpLabel("CampaignId")),
    WriteCampaignRequest: S.optional(WriteCampaignRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "WriteCampaignRequest" }),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/apps/{ApplicationId}/campaigns/{CampaignId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCampaignRequest",
}) as any as S.Schema<UpdateCampaignRequest>;
export interface UpdateCampaignResponse {
  CampaignResponse: CampaignResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    SegmentId: string;
    SegmentVersion: number;
    AdditionalTreatments: (TreatmentResource & {
      Id: string;
      SizePercent: number;
      CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
        DeliveryUri: string;
      };
      MessageConfiguration: MessageConfiguration & {
        InAppMessage: CampaignInAppMessage & {
          Content: (InAppMessageContent & {
            BodyConfig: InAppMessageBodyConfig & {
              Alignment: Alignment;
              Body: string;
              TextColor: string;
            };
            HeaderConfig: InAppMessageHeaderConfig & {
              Alignment: Alignment;
              Header: string;
              TextColor: string;
            };
            PrimaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
            SecondaryBtn: InAppMessageButton & {
              Android: OverrideButtonConfiguration & {
                ButtonAction: ButtonAction;
              };
              DefaultConfig: DefaultButtonConfiguration & {
                ButtonAction: ButtonAction;
                Text: string;
              };
              IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
              Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            };
          })[];
        };
      };
      Schedule: Schedule & {
        StartTime: string;
        EventFilter: CampaignEventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
    })[];
    CustomDeliveryConfiguration: CustomDeliveryConfiguration & {
      DeliveryUri: string;
    };
    MessageConfiguration: MessageConfiguration & {
      InAppMessage: CampaignInAppMessage & {
        Content: (InAppMessageContent & {
          BodyConfig: InAppMessageBodyConfig & {
            Alignment: Alignment;
            Body: string;
            TextColor: string;
          };
          HeaderConfig: InAppMessageHeaderConfig & {
            Alignment: Alignment;
            Header: string;
            TextColor: string;
          };
          PrimaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
          SecondaryBtn: InAppMessageButton & {
            Android: OverrideButtonConfiguration & {
              ButtonAction: ButtonAction;
            };
            DefaultConfig: DefaultButtonConfiguration & {
              ButtonAction: ButtonAction;
              Text: string;
            };
            IOS: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
            Web: OverrideButtonConfiguration & { ButtonAction: ButtonAction };
          };
        })[];
      };
    };
    Schedule: Schedule & {
      StartTime: string;
      EventFilter: CampaignEventFilter & {
        Dimensions: EventDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          EventType: SetDimension & { Values: ListOf__string };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
        };
        FilterType: FilterType;
      };
    };
  };
}
export const UpdateCampaignResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CampaignResponse: S.optional(CampaignResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "CampaignResponse" }),
  }),
).annotate({
  identifier: "UpdateCampaignResponse",
}) as any as S.Schema<UpdateCampaignResponse>;
export interface EmailChannelRequest {
  ConfigurationSet?: string;
  Enabled?: boolean;
  FromAddress?: string;
  Identity?: string;
  RoleArn?: string;
  OrchestrationSendingRoleArn?: string;
}
export const EmailChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSet: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    FromAddress: S.optional(S.String),
    Identity: S.optional(S.String),
    RoleArn: S.optional(S.String),
    OrchestrationSendingRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "EmailChannelRequest",
}) as any as S.Schema<EmailChannelRequest>;
export interface UpdateEmailChannelRequest {
  ApplicationId: string;
  EmailChannelRequest?: EmailChannelRequest;
}
export const UpdateEmailChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EmailChannelRequest: S.optional(EmailChannelRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EmailChannelRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/apps/{ApplicationId}/channels/email" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEmailChannelRequest",
}) as any as S.Schema<UpdateEmailChannelRequest>;
export interface UpdateEmailChannelResponse {
  EmailChannelResponse: EmailChannelResponse & { Platform: string };
}
export const UpdateEmailChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailChannelResponse: S.optional(EmailChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EmailChannelResponse" }),
  }),
).annotate({
  identifier: "UpdateEmailChannelResponse",
}) as any as S.Schema<UpdateEmailChannelResponse>;
export interface UpdateEmailTemplateRequest {
  CreateNewVersion?: boolean;
  EmailTemplateRequest?: EmailTemplateRequest;
  TemplateName: string;
  Version?: string;
}
export const UpdateEmailTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateNewVersion: S.optional(S.Boolean).pipe(
      T.HttpQuery("create-new-version"),
    ),
    EmailTemplateRequest: S.optional(EmailTemplateRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EmailTemplateRequest" }),
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/templates/{TemplateName}/email" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEmailTemplateRequest",
}) as any as S.Schema<UpdateEmailTemplateRequest>;
export interface UpdateEmailTemplateResponse {
  MessageBody: MessageBody;
}
export const UpdateEmailTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "UpdateEmailTemplateResponse",
}) as any as S.Schema<UpdateEmailTemplateResponse>;
export interface EndpointRequest {
  Address?: string;
  Attributes?: { [key: string]: string[] | undefined };
  ChannelType?: ChannelType;
  Demographic?: EndpointDemographic;
  EffectiveDate?: string;
  EndpointStatus?: string;
  Location?: EndpointLocation;
  Metrics?: { [key: string]: number | undefined };
  OptOut?: string;
  RequestId?: string;
  User?: EndpointUser;
}
export const EndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: S.optional(S.String),
    Attributes: S.optional(MapOfListOf__string),
    ChannelType: S.optional(ChannelType),
    Demographic: S.optional(EndpointDemographic),
    EffectiveDate: S.optional(S.String),
    EndpointStatus: S.optional(S.String),
    Location: S.optional(EndpointLocation),
    Metrics: S.optional(MapOf__double),
    OptOut: S.optional(S.String),
    RequestId: S.optional(S.String),
    User: S.optional(EndpointUser),
  }),
).annotate({
  identifier: "EndpointRequest",
}) as any as S.Schema<EndpointRequest>;
export interface UpdateEndpointRequest {
  ApplicationId: string;
  EndpointId: string;
  EndpointRequest?: EndpointRequest;
}
export const UpdateEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EndpointId: S.String.pipe(T.HttpLabel("EndpointId")),
    EndpointRequest: S.optional(EndpointRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EndpointRequest" }),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/apps/{ApplicationId}/endpoints/{EndpointId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEndpointRequest",
}) as any as S.Schema<UpdateEndpointRequest>;
export interface UpdateEndpointResponse {
  MessageBody: MessageBody;
}
export const UpdateEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "UpdateEndpointResponse",
}) as any as S.Schema<UpdateEndpointResponse>;
export interface EndpointBatchItem {
  Address?: string;
  Attributes?: { [key: string]: string[] | undefined };
  ChannelType?: ChannelType;
  Demographic?: EndpointDemographic;
  EffectiveDate?: string;
  EndpointStatus?: string;
  Id?: string;
  Location?: EndpointLocation;
  Metrics?: { [key: string]: number | undefined };
  OptOut?: string;
  RequestId?: string;
  User?: EndpointUser;
}
export const EndpointBatchItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Address: S.optional(S.String),
    Attributes: S.optional(MapOfListOf__string),
    ChannelType: S.optional(ChannelType),
    Demographic: S.optional(EndpointDemographic),
    EffectiveDate: S.optional(S.String),
    EndpointStatus: S.optional(S.String),
    Id: S.optional(S.String),
    Location: S.optional(EndpointLocation),
    Metrics: S.optional(MapOf__double),
    OptOut: S.optional(S.String),
    RequestId: S.optional(S.String),
    User: S.optional(EndpointUser),
  }),
).annotate({
  identifier: "EndpointBatchItem",
}) as any as S.Schema<EndpointBatchItem>;
export type ListOfEndpointBatchItem = EndpointBatchItem[];
export const ListOfEndpointBatchItem = /*@__PURE__*/ S.Array(EndpointBatchItem);
export interface EndpointBatchRequest {
  Item?: EndpointBatchItem[];
}
export const EndpointBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Item: S.optional(ListOfEndpointBatchItem) }),
).annotate({
  identifier: "EndpointBatchRequest",
}) as any as S.Schema<EndpointBatchRequest>;
export interface UpdateEndpointsBatchRequest {
  ApplicationId: string;
  EndpointBatchRequest?: EndpointBatchRequest;
}
export const UpdateEndpointsBatchRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    EndpointBatchRequest: S.optional(EndpointBatchRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "EndpointBatchRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/apps/{ApplicationId}/endpoints" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateEndpointsBatchRequest",
}) as any as S.Schema<UpdateEndpointsBatchRequest>;
export interface UpdateEndpointsBatchResponse {
  MessageBody: MessageBody;
}
export const UpdateEndpointsBatchResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "UpdateEndpointsBatchResponse",
}) as any as S.Schema<UpdateEndpointsBatchResponse>;
export interface GCMChannelRequest {
  ApiKey?: string;
  DefaultAuthenticationMethod?: string;
  Enabled?: boolean;
  ServiceJson?: string;
}
export const GCMChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApiKey: S.optional(S.String),
    DefaultAuthenticationMethod: S.optional(S.String),
    Enabled: S.optional(S.Boolean),
    ServiceJson: S.optional(S.String),
  }),
).annotate({
  identifier: "GCMChannelRequest",
}) as any as S.Schema<GCMChannelRequest>;
export interface UpdateGcmChannelRequest {
  ApplicationId: string;
  GCMChannelRequest?: GCMChannelRequest;
}
export const UpdateGcmChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    GCMChannelRequest: S.optional(GCMChannelRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "GCMChannelRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/apps/{ApplicationId}/channels/gcm" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateGcmChannelRequest",
}) as any as S.Schema<UpdateGcmChannelRequest>;
export interface UpdateGcmChannelResponse {
  GCMChannelResponse: GCMChannelResponse & { Platform: string };
}
export const UpdateGcmChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GCMChannelResponse: S.optional(GCMChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "GCMChannelResponse" }),
  }),
).annotate({
  identifier: "UpdateGcmChannelResponse",
}) as any as S.Schema<UpdateGcmChannelResponse>;
export interface UpdateInAppTemplateRequest {
  CreateNewVersion?: boolean;
  InAppTemplateRequest?: InAppTemplateRequest;
  TemplateName: string;
  Version?: string;
}
export const UpdateInAppTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateNewVersion: S.optional(S.Boolean).pipe(
      T.HttpQuery("create-new-version"),
    ),
    InAppTemplateRequest: S.optional(InAppTemplateRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "InAppTemplateRequest" }),
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/templates/{TemplateName}/inapp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateInAppTemplateRequest",
}) as any as S.Schema<UpdateInAppTemplateRequest>;
export interface UpdateInAppTemplateResponse {
  MessageBody: MessageBody;
}
export const UpdateInAppTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "UpdateInAppTemplateResponse",
}) as any as S.Schema<UpdateInAppTemplateResponse>;
export interface UpdateJourneyRequest {
  ApplicationId: string;
  JourneyId: string;
  WriteJourneyRequest?: WriteJourneyRequest;
}
export const UpdateJourneyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    JourneyId: S.String.pipe(T.HttpLabel("JourneyId")),
    WriteJourneyRequest: S.optional(WriteJourneyRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "WriteJourneyRequest" }),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/apps/{ApplicationId}/journeys/{JourneyId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateJourneyRequest",
}) as any as S.Schema<UpdateJourneyRequest>;
export interface UpdateJourneyResponse {
  JourneyResponse: JourneyResponse & {
    ApplicationId: string;
    Id: string;
    Name: string;
    Activities: {
      [key: string]:
        | (Activity & {
            ConditionalSplit: ConditionalSplitActivity & {
              Condition: Condition & {
                Conditions: (SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                })[];
              };
            };
            Holdout: HoldoutActivity & { Percentage: number };
            MultiCondition: MultiConditionalSplitActivity & {
              Branches: (MultiConditionalBranch & {
                Condition: SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                };
              })[];
            };
          })
        | undefined;
    };
    StartCondition: StartCondition & {
      EventStartCondition: EventStartCondition & {
        EventFilter: EventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
      SegmentStartCondition: SegmentCondition & { SegmentId: string };
    };
  };
}
export const UpdateJourneyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JourneyResponse: S.optional(JourneyResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "JourneyResponse" }),
  }),
).annotate({
  identifier: "UpdateJourneyResponse",
}) as any as S.Schema<UpdateJourneyResponse>;
export interface JourneyStateRequest {
  State?: State;
}
export const JourneyStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ State: S.optional(State) }),
).annotate({
  identifier: "JourneyStateRequest",
}) as any as S.Schema<JourneyStateRequest>;
export interface UpdateJourneyStateRequest {
  ApplicationId: string;
  JourneyId: string;
  JourneyStateRequest?: JourneyStateRequest;
}
export const UpdateJourneyStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    JourneyId: S.String.pipe(T.HttpLabel("JourneyId")),
    JourneyStateRequest: S.optional(JourneyStateRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "JourneyStateRequest" }),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/apps/{ApplicationId}/journeys/{JourneyId}/state",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateJourneyStateRequest",
}) as any as S.Schema<UpdateJourneyStateRequest>;
export interface UpdateJourneyStateResponse {
  JourneyResponse: JourneyResponse & {
    ApplicationId: string;
    Id: string;
    Name: string;
    Activities: {
      [key: string]:
        | (Activity & {
            ConditionalSplit: ConditionalSplitActivity & {
              Condition: Condition & {
                Conditions: (SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                })[];
              };
            };
            Holdout: HoldoutActivity & { Percentage: number };
            MultiCondition: MultiConditionalSplitActivity & {
              Branches: (MultiConditionalBranch & {
                Condition: SimpleCondition & {
                  EventCondition: EventCondition & {
                    Dimensions: EventDimensions & {
                      Attributes: {
                        [key: string]:
                          | (AttributeDimension & { Values: ListOf__string })
                          | undefined;
                      };
                      EventType: SetDimension & { Values: ListOf__string };
                      Metrics: {
                        [key: string]:
                          | (MetricDimension & {
                              ComparisonOperator: string;
                              Value: number;
                            })
                          | undefined;
                      };
                    };
                  };
                  SegmentCondition: SegmentCondition & { SegmentId: string };
                  SegmentDimensions: SegmentDimensions & {
                    Attributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                    Behavior: SegmentBehaviors & {
                      Recency: RecencyDimension & {
                        Duration: Duration;
                        RecencyType: RecencyType;
                      };
                    };
                    Demographic: SegmentDemographics & {
                      AppVersion: SetDimension & { Values: ListOf__string };
                      Channel: SetDimension & { Values: ListOf__string };
                      DeviceType: SetDimension & { Values: ListOf__string };
                      Make: SetDimension & { Values: ListOf__string };
                      Model: SetDimension & { Values: ListOf__string };
                      Platform: SetDimension & { Values: ListOf__string };
                    };
                    Location: SegmentLocation & {
                      Country: SetDimension & { Values: ListOf__string };
                      GPSPoint: GPSPointDimension & {
                        Coordinates: GPSCoordinates & {
                          Latitude: number;
                          Longitude: number;
                        };
                      };
                    };
                    Metrics: {
                      [key: string]:
                        | (MetricDimension & {
                            ComparisonOperator: string;
                            Value: number;
                          })
                        | undefined;
                    };
                    UserAttributes: {
                      [key: string]:
                        | (AttributeDimension & { Values: ListOf__string })
                        | undefined;
                    };
                  };
                };
              })[];
            };
          })
        | undefined;
    };
    StartCondition: StartCondition & {
      EventStartCondition: EventStartCondition & {
        EventFilter: EventFilter & {
          Dimensions: EventDimensions & {
            Attributes: {
              [key: string]:
                | (AttributeDimension & { Values: ListOf__string })
                | undefined;
            };
            EventType: SetDimension & { Values: ListOf__string };
            Metrics: {
              [key: string]:
                | (MetricDimension & {
                    ComparisonOperator: string;
                    Value: number;
                  })
                | undefined;
            };
          };
          FilterType: FilterType;
        };
      };
      SegmentStartCondition: SegmentCondition & { SegmentId: string };
    };
  };
}
export const UpdateJourneyStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JourneyResponse: S.optional(JourneyResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "JourneyResponse" }),
  }),
).annotate({
  identifier: "UpdateJourneyStateResponse",
}) as any as S.Schema<UpdateJourneyStateResponse>;
export interface UpdatePushTemplateRequest {
  CreateNewVersion?: boolean;
  PushNotificationTemplateRequest?: PushNotificationTemplateRequest;
  TemplateName: string;
  Version?: string;
}
export const UpdatePushTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateNewVersion: S.optional(S.Boolean).pipe(
      T.HttpQuery("create-new-version"),
    ),
    PushNotificationTemplateRequest: S.optional(PushNotificationTemplateRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "PushNotificationTemplateRequest" }),
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/templates/{TemplateName}/push" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdatePushTemplateRequest",
}) as any as S.Schema<UpdatePushTemplateRequest>;
export interface UpdatePushTemplateResponse {
  MessageBody: MessageBody;
}
export const UpdatePushTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "UpdatePushTemplateResponse",
}) as any as S.Schema<UpdatePushTemplateResponse>;
export interface UpdateRecommenderConfigurationShape {
  Attributes?: { [key: string]: string | undefined };
  Description?: string;
  Name?: string;
  RecommendationProviderIdType?: string;
  RecommendationProviderRoleArn?: string;
  RecommendationProviderUri?: string;
  RecommendationTransformerUri?: string;
  RecommendationsDisplayName?: string;
  RecommendationsPerMessage?: number;
}
export const UpdateRecommenderConfigurationShape = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Attributes: S.optional(MapOf__string),
    Description: S.optional(S.String),
    Name: S.optional(S.String),
    RecommendationProviderIdType: S.optional(S.String),
    RecommendationProviderRoleArn: S.optional(S.String),
    RecommendationProviderUri: S.optional(S.String),
    RecommendationTransformerUri: S.optional(S.String),
    RecommendationsDisplayName: S.optional(S.String),
    RecommendationsPerMessage: S.optional(S.Number),
  }),
).annotate({
  identifier: "UpdateRecommenderConfigurationShape",
}) as any as S.Schema<UpdateRecommenderConfigurationShape>;
export interface UpdateRecommenderConfigurationRequest {
  RecommenderId: string;
  UpdateRecommenderConfiguration?: UpdateRecommenderConfigurationShape;
}
export const UpdateRecommenderConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RecommenderId: S.String.pipe(T.HttpLabel("RecommenderId")),
      UpdateRecommenderConfiguration: S.optional(
        UpdateRecommenderConfigurationShape,
      )
        .pipe(T.HttpPayload())
        .annotate({ identifier: "UpdateRecommenderConfigurationShape" }),
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/v1/recommenders/{RecommenderId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateRecommenderConfigurationRequest",
}) as any as S.Schema<UpdateRecommenderConfigurationRequest>;
export interface UpdateRecommenderConfigurationResponse {
  RecommenderConfigurationResponse: RecommenderConfigurationResponse & {
    CreationDate: string;
    Id: string;
    LastModifiedDate: string;
    RecommendationProviderRoleArn: string;
    RecommendationProviderUri: string;
  };
}
export const UpdateRecommenderConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RecommenderConfigurationResponse: S.optional(
        RecommenderConfigurationResponse,
      )
        .pipe(T.HttpPayload())
        .annotate({ identifier: "RecommenderConfigurationResponse" }),
    }),
).annotate({
  identifier: "UpdateRecommenderConfigurationResponse",
}) as any as S.Schema<UpdateRecommenderConfigurationResponse>;
export interface UpdateSegmentRequest {
  ApplicationId: string;
  SegmentId: string;
  WriteSegmentRequest?: WriteSegmentRequest;
}
export const UpdateSegmentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    SegmentId: S.String.pipe(T.HttpLabel("SegmentId")),
    WriteSegmentRequest: S.optional(WriteSegmentRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "WriteSegmentRequest" }),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/apps/{ApplicationId}/segments/{SegmentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSegmentRequest",
}) as any as S.Schema<UpdateSegmentRequest>;
export interface UpdateSegmentResponse {
  SegmentResponse: SegmentResponse & {
    ApplicationId: string;
    Arn: string;
    CreationDate: string;
    Id: string;
    SegmentType: SegmentType;
    Dimensions: SegmentDimensions & {
      Attributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
      Behavior: SegmentBehaviors & {
        Recency: RecencyDimension & {
          Duration: Duration;
          RecencyType: RecencyType;
        };
      };
      Demographic: SegmentDemographics & {
        AppVersion: SetDimension & { Values: ListOf__string };
        Channel: SetDimension & { Values: ListOf__string };
        DeviceType: SetDimension & { Values: ListOf__string };
        Make: SetDimension & { Values: ListOf__string };
        Model: SetDimension & { Values: ListOf__string };
        Platform: SetDimension & { Values: ListOf__string };
      };
      Location: SegmentLocation & {
        Country: SetDimension & { Values: ListOf__string };
        GPSPoint: GPSPointDimension & {
          Coordinates: GPSCoordinates & { Latitude: number; Longitude: number };
        };
      };
      Metrics: {
        [key: string]:
          | (MetricDimension & { ComparisonOperator: string; Value: number })
          | undefined;
      };
      UserAttributes: {
        [key: string]:
          | (AttributeDimension & { Values: ListOf__string })
          | undefined;
      };
    };
    ImportDefinition: SegmentImportResource & {
      ExternalId: string;
      Format: Format;
      RoleArn: string;
      S3Url: string;
      Size: number;
    };
    SegmentGroups: SegmentGroupList & {
      Groups: (SegmentGroup & {
        Dimensions: (SegmentDimensions & {
          Attributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
          Behavior: SegmentBehaviors & {
            Recency: RecencyDimension & {
              Duration: Duration;
              RecencyType: RecencyType;
            };
          };
          Demographic: SegmentDemographics & {
            AppVersion: SetDimension & { Values: ListOf__string };
            Channel: SetDimension & { Values: ListOf__string };
            DeviceType: SetDimension & { Values: ListOf__string };
            Make: SetDimension & { Values: ListOf__string };
            Model: SetDimension & { Values: ListOf__string };
            Platform: SetDimension & { Values: ListOf__string };
          };
          Location: SegmentLocation & {
            Country: SetDimension & { Values: ListOf__string };
            GPSPoint: GPSPointDimension & {
              Coordinates: GPSCoordinates & {
                Latitude: number;
                Longitude: number;
              };
            };
          };
          Metrics: {
            [key: string]:
              | (MetricDimension & {
                  ComparisonOperator: string;
                  Value: number;
                })
              | undefined;
          };
          UserAttributes: {
            [key: string]:
              | (AttributeDimension & { Values: ListOf__string })
              | undefined;
          };
        })[];
        SourceSegments: (SegmentReference & { Id: string })[];
      })[];
    };
  };
}
export const UpdateSegmentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SegmentResponse: S.optional(SegmentResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SegmentResponse" }),
  }),
).annotate({
  identifier: "UpdateSegmentResponse",
}) as any as S.Schema<UpdateSegmentResponse>;
export interface SMSChannelRequest {
  Enabled?: boolean;
  SenderId?: string;
  ShortCode?: string;
}
export const SMSChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Enabled: S.optional(S.Boolean),
    SenderId: S.optional(S.String),
    ShortCode: S.optional(S.String),
  }),
).annotate({
  identifier: "SMSChannelRequest",
}) as any as S.Schema<SMSChannelRequest>;
export interface UpdateSmsChannelRequest {
  ApplicationId: string;
  SMSChannelRequest?: SMSChannelRequest;
}
export const UpdateSmsChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    SMSChannelRequest: S.optional(SMSChannelRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SMSChannelRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/apps/{ApplicationId}/channels/sms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSmsChannelRequest",
}) as any as S.Schema<UpdateSmsChannelRequest>;
export interface UpdateSmsChannelResponse {
  SMSChannelResponse: SMSChannelResponse & { Platform: string };
}
export const UpdateSmsChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SMSChannelResponse: S.optional(SMSChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SMSChannelResponse" }),
  }),
).annotate({
  identifier: "UpdateSmsChannelResponse",
}) as any as S.Schema<UpdateSmsChannelResponse>;
export interface UpdateSmsTemplateRequest {
  CreateNewVersion?: boolean;
  SMSTemplateRequest?: SMSTemplateRequest;
  TemplateName: string;
  Version?: string;
}
export const UpdateSmsTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateNewVersion: S.optional(S.Boolean).pipe(
      T.HttpQuery("create-new-version"),
    ),
    SMSTemplateRequest: S.optional(SMSTemplateRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "SMSTemplateRequest" }),
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/templates/{TemplateName}/sms" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSmsTemplateRequest",
}) as any as S.Schema<UpdateSmsTemplateRequest>;
export interface UpdateSmsTemplateResponse {
  MessageBody: MessageBody;
}
export const UpdateSmsTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "UpdateSmsTemplateResponse",
}) as any as S.Schema<UpdateSmsTemplateResponse>;
export interface TemplateActiveVersionRequest {
  Version?: string;
}
export const TemplateActiveVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Version: S.optional(S.String) }),
).annotate({
  identifier: "TemplateActiveVersionRequest",
}) as any as S.Schema<TemplateActiveVersionRequest>;
export interface UpdateTemplateActiveVersionRequest {
  TemplateActiveVersionRequest?: TemplateActiveVersionRequest;
  TemplateName: string;
  TemplateType: string;
}
export const UpdateTemplateActiveVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateActiveVersionRequest: S.optional(TemplateActiveVersionRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "TemplateActiveVersionRequest" }),
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    TemplateType: S.String.pipe(T.HttpLabel("TemplateType")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/v1/templates/{TemplateName}/{TemplateType}/active-version",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTemplateActiveVersionRequest",
}) as any as S.Schema<UpdateTemplateActiveVersionRequest>;
export interface UpdateTemplateActiveVersionResponse {
  MessageBody: MessageBody;
}
export const UpdateTemplateActiveVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "UpdateTemplateActiveVersionResponse",
}) as any as S.Schema<UpdateTemplateActiveVersionResponse>;
export interface VoiceChannelRequest {
  Enabled?: boolean;
}
export const VoiceChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "VoiceChannelRequest",
}) as any as S.Schema<VoiceChannelRequest>;
export interface UpdateVoiceChannelRequest {
  ApplicationId: string;
  VoiceChannelRequest?: VoiceChannelRequest;
}
export const UpdateVoiceChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    VoiceChannelRequest: S.optional(VoiceChannelRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "VoiceChannelRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/apps/{ApplicationId}/channels/voice" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVoiceChannelRequest",
}) as any as S.Schema<UpdateVoiceChannelRequest>;
export interface UpdateVoiceChannelResponse {
  VoiceChannelResponse: VoiceChannelResponse & { Platform: string };
}
export const UpdateVoiceChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VoiceChannelResponse: S.optional(VoiceChannelResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "VoiceChannelResponse" }),
  }),
).annotate({
  identifier: "UpdateVoiceChannelResponse",
}) as any as S.Schema<UpdateVoiceChannelResponse>;
export interface UpdateVoiceTemplateRequest {
  CreateNewVersion?: boolean;
  TemplateName: string;
  Version?: string;
  VoiceTemplateRequest?: VoiceTemplateRequest;
}
export const UpdateVoiceTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CreateNewVersion: S.optional(S.Boolean).pipe(
      T.HttpQuery("create-new-version"),
    ),
    TemplateName: S.String.pipe(T.HttpLabel("TemplateName")),
    Version: S.optional(S.String).pipe(T.HttpQuery("version")),
    VoiceTemplateRequest: S.optional(VoiceTemplateRequest)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "VoiceTemplateRequest" }),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/templates/{TemplateName}/voice" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVoiceTemplateRequest",
}) as any as S.Schema<UpdateVoiceTemplateRequest>;
export interface UpdateVoiceTemplateResponse {
  MessageBody: MessageBody;
}
export const UpdateVoiceTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageBody: S.optional(MessageBody)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "MessageBody" }),
  }),
).annotate({
  identifier: "UpdateVoiceTemplateResponse",
}) as any as S.Schema<UpdateVoiceTemplateResponse>;
export interface VerifyOTPMessageRequestParameters {
  DestinationIdentity?: string;
  Otp?: string;
  ReferenceId?: string;
}
export const VerifyOTPMessageRequestParameters = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationIdentity: S.optional(S.String),
    Otp: S.optional(S.String),
    ReferenceId: S.optional(S.String),
  }),
).annotate({
  identifier: "VerifyOTPMessageRequestParameters",
}) as any as S.Schema<VerifyOTPMessageRequestParameters>;
export interface VerifyOTPMessageRequest {
  ApplicationId: string;
  VerifyOTPMessageRequestParameters?: VerifyOTPMessageRequestParameters;
}
export const VerifyOTPMessageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApplicationId: S.String.pipe(T.HttpLabel("ApplicationId")),
    VerifyOTPMessageRequestParameters: S.optional(
      VerifyOTPMessageRequestParameters,
    )
      .pipe(T.HttpPayload())
      .annotate({ identifier: "VerifyOTPMessageRequestParameters" }),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/apps/{ApplicationId}/verify-otp" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "VerifyOTPMessageRequest",
}) as any as S.Schema<VerifyOTPMessageRequest>;
export interface VerificationResponse {
  Valid?: boolean;
}
export const VerificationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Valid: S.optional(S.Boolean) }),
).annotate({
  identifier: "VerificationResponse",
}) as any as S.Schema<VerificationResponse>;
export interface VerifyOTPMessageResponse {
  VerificationResponse: VerificationResponse;
}
export const VerifyOTPMessageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VerificationResponse: S.optional(VerificationResponse)
      .pipe(T.HttpPayload())
      .annotate({ identifier: "VerificationResponse" }),
  }),
).annotate({
  identifier: "VerifyOTPMessageResponse",
}) as any as S.Schema<VerifyOTPMessageResponse>;
export type CreateAppError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an application.
 */
export const createApp: API.OperationMethod<
  CreateAppRequest,
  CreateAppResponse,
  CreateAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAppRequest,
  output: CreateAppResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateApp",
}));

export type CreateCampaignError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new campaign for an application or updates the settings of an existing campaign for an application.
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
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCampaign",
}));

export type CreateEmailTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a message template for messages that are sent through the email channel.
 */
export const createEmailTemplate: API.OperationMethod<
  CreateEmailTemplateRequest,
  CreateEmailTemplateResponse,
  CreateEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEmailTemplateRequest,
  output: CreateEmailTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEmailTemplate",
}));

export type CreateExportJobError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an export job for an application.
 */
export const createExportJob: API.OperationMethod<
  CreateExportJobRequest,
  CreateExportJobResponse,
  CreateExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExportJobRequest,
  output: CreateExportJobResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExportJob",
}));

export type CreateImportJobError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an import job for an application.
 */
export const createImportJob: API.OperationMethod<
  CreateImportJobRequest,
  CreateImportJobResponse,
  CreateImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateImportJobRequest,
  output: CreateImportJobResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateImportJob",
}));

export type CreateInAppTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new message template for messages using the in-app message channel.
 */
export const createInAppTemplate: API.OperationMethod<
  CreateInAppTemplateRequest,
  CreateInAppTemplateResponse,
  CreateInAppTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInAppTemplateRequest,
  output: CreateInAppTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInAppTemplate",
}));

export type CreateJourneyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a journey for an application.
 */
export const createJourney: API.OperationMethod<
  CreateJourneyRequest,
  CreateJourneyResponse,
  CreateJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJourneyRequest,
  output: CreateJourneyResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJourney",
}));

export type CreatePushTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a message template for messages that are sent through a push notification channel.
 */
export const createPushTemplate: API.OperationMethod<
  CreatePushTemplateRequest,
  CreatePushTemplateResponse,
  CreatePushTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePushTemplateRequest,
  output: CreatePushTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePushTemplate",
}));

export type CreateRecommenderConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an Amazon Pinpoint configuration for a recommender model.
 */
export const createRecommenderConfiguration: API.OperationMethod<
  CreateRecommenderConfigurationRequest,
  CreateRecommenderConfigurationResponse,
  CreateRecommenderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateRecommenderConfigurationRequest,
  output: CreateRecommenderConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRecommenderConfiguration",
}));

export type CreateSegmentError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new segment for an application or updates the configuration, dimension, and other settings for an existing segment that's associated with an application.
 */
export const createSegment: API.OperationMethod<
  CreateSegmentRequest,
  CreateSegmentResponse,
  CreateSegmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSegmentRequest,
  output: CreateSegmentResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSegment",
}));

export type CreateSmsTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a message template for messages that are sent through the SMS channel.
 */
export const createSmsTemplate: API.OperationMethod<
  CreateSmsTemplateRequest,
  CreateSmsTemplateResponse,
  CreateSmsTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSmsTemplateRequest,
  output: CreateSmsTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSmsTemplate",
}));

export type CreateVoiceTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a message template for messages that are sent through the voice channel.
 */
export const createVoiceTemplate: API.OperationMethod<
  CreateVoiceTemplateRequest,
  CreateVoiceTemplateResponse,
  CreateVoiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVoiceTemplateRequest,
  output: CreateVoiceTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVoiceTemplate",
}));

export type DeleteAdmChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the ADM channel for an application and deletes any existing settings for the channel.
 */
export const deleteAdmChannel: API.OperationMethod<
  DeleteAdmChannelRequest,
  DeleteAdmChannelResponse,
  DeleteAdmChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAdmChannelRequest,
  output: DeleteAdmChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAdmChannel",
}));

export type DeleteApnsChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the APNs channel for an application and deletes any existing settings for the channel.
 */
export const deleteApnsChannel: API.OperationMethod<
  DeleteApnsChannelRequest,
  DeleteApnsChannelResponse,
  DeleteApnsChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApnsChannelRequest,
  output: DeleteApnsChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApnsChannel",
}));

export type DeleteApnsSandboxChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the APNs sandbox channel for an application and deletes any existing settings for the channel.
 */
export const deleteApnsSandboxChannel: API.OperationMethod<
  DeleteApnsSandboxChannelRequest,
  DeleteApnsSandboxChannelResponse,
  DeleteApnsSandboxChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApnsSandboxChannelRequest,
  output: DeleteApnsSandboxChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApnsSandboxChannel",
}));

export type DeleteApnsVoipChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the APNs VoIP channel for an application and deletes any existing settings for the channel.
 */
export const deleteApnsVoipChannel: API.OperationMethod<
  DeleteApnsVoipChannelRequest,
  DeleteApnsVoipChannelResponse,
  DeleteApnsVoipChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApnsVoipChannelRequest,
  output: DeleteApnsVoipChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApnsVoipChannel",
}));

export type DeleteApnsVoipSandboxChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the APNs VoIP sandbox channel for an application and deletes any existing settings for the channel.
 */
export const deleteApnsVoipSandboxChannel: API.OperationMethod<
  DeleteApnsVoipSandboxChannelRequest,
  DeleteApnsVoipSandboxChannelResponse,
  DeleteApnsVoipSandboxChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteApnsVoipSandboxChannelRequest,
  output: DeleteApnsVoipSandboxChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApnsVoipSandboxChannel",
}));

export type DeleteAppError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an application.
 */
export const deleteApp: API.OperationMethod<
  DeleteAppRequest,
  DeleteAppResponse,
  DeleteAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAppRequest,
  output: DeleteAppResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApp",
}));

export type DeleteBaiduChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the Baidu channel for an application and deletes any existing settings for the channel.
 */
export const deleteBaiduChannel: API.OperationMethod<
  DeleteBaiduChannelRequest,
  DeleteBaiduChannelResponse,
  DeleteBaiduChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBaiduChannelRequest,
  output: DeleteBaiduChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBaiduChannel",
}));

export type DeleteCampaignError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a campaign from an application.
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
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCampaign",
}));

export type DeleteEmailChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the email channel for an application and deletes any existing settings for the channel.
 */
export const deleteEmailChannel: API.OperationMethod<
  DeleteEmailChannelRequest,
  DeleteEmailChannelResponse,
  DeleteEmailChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEmailChannelRequest,
  output: DeleteEmailChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailChannel",
}));

export type DeleteEmailTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a message template for messages that were sent through the email channel.
 */
export const deleteEmailTemplate: API.OperationMethod<
  DeleteEmailTemplateRequest,
  DeleteEmailTemplateResponse,
  DeleteEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEmailTemplateRequest,
  output: DeleteEmailTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEmailTemplate",
}));

export type DeleteEndpointError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an endpoint from an application.
 */
export const deleteEndpoint: API.OperationMethod<
  DeleteEndpointRequest,
  DeleteEndpointResponse,
  DeleteEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEndpointRequest,
  output: DeleteEndpointResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEndpoint",
}));

export type DeleteEventStreamError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the event stream for an application.
 */
export const deleteEventStream: API.OperationMethod<
  DeleteEventStreamRequest,
  DeleteEventStreamResponse,
  DeleteEventStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventStreamRequest,
  output: DeleteEventStreamResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventStream",
}));

export type DeleteGcmChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the GCM channel for an application and deletes any existing settings for the channel.
 */
export const deleteGcmChannel: API.OperationMethod<
  DeleteGcmChannelRequest,
  DeleteGcmChannelResponse,
  DeleteGcmChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteGcmChannelRequest,
  output: DeleteGcmChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGcmChannel",
}));

export type DeleteInAppTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a message template for messages sent using the in-app message channel.
 */
export const deleteInAppTemplate: API.OperationMethod<
  DeleteInAppTemplateRequest,
  DeleteInAppTemplateResponse,
  DeleteInAppTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInAppTemplateRequest,
  output: DeleteInAppTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInAppTemplate",
}));

export type DeleteJourneyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a journey from an application.
 */
export const deleteJourney: API.OperationMethod<
  DeleteJourneyRequest,
  DeleteJourneyResponse,
  DeleteJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteJourneyRequest,
  output: DeleteJourneyResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJourney",
}));

export type DeletePushTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a message template for messages that were sent through a push notification channel.
 */
export const deletePushTemplate: API.OperationMethod<
  DeletePushTemplateRequest,
  DeletePushTemplateResponse,
  DeletePushTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePushTemplateRequest,
  output: DeletePushTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePushTemplate",
}));

export type DeleteRecommenderConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an Amazon Pinpoint configuration for a recommender model.
 */
export const deleteRecommenderConfiguration: API.OperationMethod<
  DeleteRecommenderConfigurationRequest,
  DeleteRecommenderConfigurationResponse,
  DeleteRecommenderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteRecommenderConfigurationRequest,
  output: DeleteRecommenderConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecommenderConfiguration",
}));

export type DeleteSegmentError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a segment from an application.
 */
export const deleteSegment: API.OperationMethod<
  DeleteSegmentRequest,
  DeleteSegmentResponse,
  DeleteSegmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSegmentRequest,
  output: DeleteSegmentResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSegment",
}));

export type DeleteSmsChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the SMS channel for an application and deletes any existing settings for the channel.
 */
export const deleteSmsChannel: API.OperationMethod<
  DeleteSmsChannelRequest,
  DeleteSmsChannelResponse,
  DeleteSmsChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSmsChannelRequest,
  output: DeleteSmsChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSmsChannel",
}));

export type DeleteSmsTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a message template for messages that were sent through the SMS channel.
 */
export const deleteSmsTemplate: API.OperationMethod<
  DeleteSmsTemplateRequest,
  DeleteSmsTemplateResponse,
  DeleteSmsTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSmsTemplateRequest,
  output: DeleteSmsTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSmsTemplate",
}));

export type DeleteUserEndpointsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes all the endpoints that are associated with a specific user ID.
 */
export const deleteUserEndpoints: API.OperationMethod<
  DeleteUserEndpointsRequest,
  DeleteUserEndpointsResponse,
  DeleteUserEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUserEndpointsRequest,
  output: DeleteUserEndpointsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserEndpoints",
}));

export type DeleteVoiceChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Disables the voice channel for an application and deletes any existing settings for the channel.
 */
export const deleteVoiceChannel: API.OperationMethod<
  DeleteVoiceChannelRequest,
  DeleteVoiceChannelResponse,
  DeleteVoiceChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVoiceChannelRequest,
  output: DeleteVoiceChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceChannel",
}));

export type DeleteVoiceTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a message template for messages that were sent through the voice channel.
 */
export const deleteVoiceTemplate: API.OperationMethod<
  DeleteVoiceTemplateRequest,
  DeleteVoiceTemplateResponse,
  DeleteVoiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVoiceTemplateRequest,
  output: DeleteVoiceTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVoiceTemplate",
}));

export type GetAdmChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the ADM channel for an application.
 */
export const getAdmChannel: API.OperationMethod<
  GetAdmChannelRequest,
  GetAdmChannelResponse,
  GetAdmChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAdmChannelRequest,
  output: GetAdmChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdmChannel",
}));

export type GetApnsChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the APNs channel for an application.
 */
export const getApnsChannel: API.OperationMethod<
  GetApnsChannelRequest,
  GetApnsChannelResponse,
  GetApnsChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApnsChannelRequest,
  output: GetApnsChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApnsChannel",
}));

export type GetApnsSandboxChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the APNs sandbox channel for an application.
 */
export const getApnsSandboxChannel: API.OperationMethod<
  GetApnsSandboxChannelRequest,
  GetApnsSandboxChannelResponse,
  GetApnsSandboxChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApnsSandboxChannelRequest,
  output: GetApnsSandboxChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApnsSandboxChannel",
}));

export type GetApnsVoipChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the APNs VoIP channel for an application.
 */
export const getApnsVoipChannel: API.OperationMethod<
  GetApnsVoipChannelRequest,
  GetApnsVoipChannelResponse,
  GetApnsVoipChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApnsVoipChannelRequest,
  output: GetApnsVoipChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApnsVoipChannel",
}));

export type GetApnsVoipSandboxChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the APNs VoIP sandbox channel for an application.
 */
export const getApnsVoipSandboxChannel: API.OperationMethod<
  GetApnsVoipSandboxChannelRequest,
  GetApnsVoipSandboxChannelResponse,
  GetApnsVoipSandboxChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApnsVoipSandboxChannelRequest,
  output: GetApnsVoipSandboxChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApnsVoipSandboxChannel",
}));

export type GetAppError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about an application.
 */
export const getApp: API.OperationMethod<
  GetAppRequest,
  GetAppResponse,
  GetAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAppRequest,
  output: GetAppResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApp",
}));

export type GetApplicationDateRangeKpiError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard metric that applies to an application.
 */
export const getApplicationDateRangeKpi: API.OperationMethod<
  GetApplicationDateRangeKpiRequest,
  GetApplicationDateRangeKpiResponse,
  GetApplicationDateRangeKpiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationDateRangeKpiRequest,
  output: GetApplicationDateRangeKpiResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationDateRangeKpi",
}));

export type GetApplicationSettingsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the settings for an application.
 */
export const getApplicationSettings: API.OperationMethod<
  GetApplicationSettingsRequest,
  GetApplicationSettingsResponse,
  GetApplicationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetApplicationSettingsRequest,
  output: GetApplicationSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApplicationSettings",
}));

export type GetAppsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about all the applications that are associated with your Amazon Pinpoint account.
 */
export const getApps: API.OperationMethod<
  GetAppsRequest,
  GetAppsResponse,
  GetAppsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAppsRequest,
  output: GetAppsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetApps",
}));

export type GetBaiduChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the Baidu channel for an application.
 */
export const getBaiduChannel: API.OperationMethod<
  GetBaiduChannelRequest,
  GetBaiduChannelResponse,
  GetBaiduChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBaiduChannelRequest,
  output: GetBaiduChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBaiduChannel",
}));

export type GetCampaignError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status, configuration, and other settings for a campaign.
 */
export const getCampaign: API.OperationMethod<
  GetCampaignRequest,
  GetCampaignResponse,
  GetCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCampaignRequest,
  output: GetCampaignResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaign",
}));

export type GetCampaignActivitiesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about all the activities for a campaign.
 */
export const getCampaignActivities: API.OperationMethod<
  GetCampaignActivitiesRequest,
  GetCampaignActivitiesResponse,
  GetCampaignActivitiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCampaignActivitiesRequest,
  output: GetCampaignActivitiesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignActivities",
}));

export type GetCampaignDateRangeKpiError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard metric that applies to a campaign.
 */
export const getCampaignDateRangeKpi: API.OperationMethod<
  GetCampaignDateRangeKpiRequest,
  GetCampaignDateRangeKpiResponse,
  GetCampaignDateRangeKpiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCampaignDateRangeKpiRequest,
  output: GetCampaignDateRangeKpiResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignDateRangeKpi",
}));

export type GetCampaignsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status, configuration, and other settings for all the campaigns that are associated with an application.
 */
export const getCampaigns: API.OperationMethod<
  GetCampaignsRequest,
  GetCampaignsResponse,
  GetCampaignsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCampaignsRequest,
  output: GetCampaignsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaigns",
}));

export type GetCampaignVersionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status, configuration, and other settings for a specific version of a campaign.
 */
export const getCampaignVersion: API.OperationMethod<
  GetCampaignVersionRequest,
  GetCampaignVersionResponse,
  GetCampaignVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCampaignVersionRequest,
  output: GetCampaignVersionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignVersion",
}));

export type GetCampaignVersionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status, configuration, and other settings for all versions of a campaign.
 */
export const getCampaignVersions: API.OperationMethod<
  GetCampaignVersionsRequest,
  GetCampaignVersionsResponse,
  GetCampaignVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCampaignVersionsRequest,
  output: GetCampaignVersionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCampaignVersions",
}));

export type GetChannelsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the history and status of each channel for an application.
 */
export const getChannels: API.OperationMethod<
  GetChannelsRequest,
  GetChannelsResponse,
  GetChannelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChannelsRequest,
  output: GetChannelsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannels",
}));

export type GetEmailChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the email channel for an application.
 */
export const getEmailChannel: API.OperationMethod<
  GetEmailChannelRequest,
  GetEmailChannelResponse,
  GetEmailChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEmailChannelRequest,
  output: GetEmailChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailChannel",
}));

export type GetEmailTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the content and settings of a message template for messages that are sent through the email channel.
 */
export const getEmailTemplate: API.OperationMethod<
  GetEmailTemplateRequest,
  GetEmailTemplateResponse,
  GetEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEmailTemplateRequest,
  output: GetEmailTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEmailTemplate",
}));

export type GetEndpointError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the settings and attributes of a specific endpoint for an application.
 */
export const getEndpoint: API.OperationMethod<
  GetEndpointRequest,
  GetEndpointResponse,
  GetEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEndpointRequest,
  output: GetEndpointResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEndpoint",
}));

export type GetEventStreamError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the event stream settings for an application.
 */
export const getEventStream: API.OperationMethod<
  GetEventStreamRequest,
  GetEventStreamResponse,
  GetEventStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventStreamRequest,
  output: GetEventStreamResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventStream",
}));

export type GetExportJobError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of a specific export job for an application.
 */
export const getExportJob: API.OperationMethod<
  GetExportJobRequest,
  GetExportJobResponse,
  GetExportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExportJobRequest,
  output: GetExportJobResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportJob",
}));

export type GetExportJobsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of all the export jobs for an application.
 */
export const getExportJobs: API.OperationMethod<
  GetExportJobsRequest,
  GetExportJobsResponse,
  GetExportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExportJobsRequest,
  output: GetExportJobsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExportJobs",
}));

export type GetGcmChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the GCM channel for an application.
 */
export const getGcmChannel: API.OperationMethod<
  GetGcmChannelRequest,
  GetGcmChannelResponse,
  GetGcmChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetGcmChannelRequest,
  output: GetGcmChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGcmChannel",
}));

export type GetImportJobError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of a specific import job for an application.
 */
export const getImportJob: API.OperationMethod<
  GetImportJobRequest,
  GetImportJobResponse,
  GetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetImportJobRequest,
  output: GetImportJobResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportJob",
}));

export type GetImportJobsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of all the import jobs for an application.
 */
export const getImportJobs: API.OperationMethod<
  GetImportJobsRequest,
  GetImportJobsResponse,
  GetImportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetImportJobsRequest,
  output: GetImportJobsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportJobs",
}));

export type GetInAppMessagesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the in-app messages targeted for the provided endpoint ID.
 */
export const getInAppMessages: API.OperationMethod<
  GetInAppMessagesRequest,
  GetInAppMessagesResponse,
  GetInAppMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInAppMessagesRequest,
  output: GetInAppMessagesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInAppMessages",
}));

export type GetInAppTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the content and settings of a message template for messages sent through the in-app channel.
 */
export const getInAppTemplate: API.OperationMethod<
  GetInAppTemplateRequest,
  GetInAppTemplateResponse,
  GetInAppTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetInAppTemplateRequest,
  output: GetInAppTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInAppTemplate",
}));

export type GetJourneyError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status, configuration, and other settings for a journey.
 */
export const getJourney: API.OperationMethod<
  GetJourneyRequest,
  GetJourneyResponse,
  GetJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJourneyRequest,
  output: GetJourneyResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourney",
}));

export type GetJourneyDateRangeKpiError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard engagement metric that applies to a journey.
 */
export const getJourneyDateRangeKpi: API.OperationMethod<
  GetJourneyDateRangeKpiRequest,
  GetJourneyDateRangeKpiResponse,
  GetJourneyDateRangeKpiError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJourneyDateRangeKpiRequest,
  output: GetJourneyDateRangeKpiResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourneyDateRangeKpi",
}));

export type GetJourneyExecutionActivityMetricsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard execution metric that applies to a journey activity.
 */
export const getJourneyExecutionActivityMetrics: API.OperationMethod<
  GetJourneyExecutionActivityMetricsRequest,
  GetJourneyExecutionActivityMetricsResponse,
  GetJourneyExecutionActivityMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJourneyExecutionActivityMetricsRequest,
  output: GetJourneyExecutionActivityMetricsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourneyExecutionActivityMetrics",
}));

export type GetJourneyExecutionMetricsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard execution metric that applies to a journey.
 */
export const getJourneyExecutionMetrics: API.OperationMethod<
  GetJourneyExecutionMetricsRequest,
  GetJourneyExecutionMetricsResponse,
  GetJourneyExecutionMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJourneyExecutionMetricsRequest,
  output: GetJourneyExecutionMetricsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourneyExecutionMetrics",
}));

export type GetJourneyRunExecutionActivityMetricsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard run execution metric that applies to a journey activity.
 */
export const getJourneyRunExecutionActivityMetrics: API.OperationMethod<
  GetJourneyRunExecutionActivityMetricsRequest,
  GetJourneyRunExecutionActivityMetricsResponse,
  GetJourneyRunExecutionActivityMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJourneyRunExecutionActivityMetricsRequest,
  output: GetJourneyRunExecutionActivityMetricsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourneyRunExecutionActivityMetrics",
}));

export type GetJourneyRunExecutionMetricsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves (queries) pre-aggregated data for a standard run execution metric that applies to a journey.
 */
export const getJourneyRunExecutionMetrics: API.OperationMethod<
  GetJourneyRunExecutionMetricsRequest,
  GetJourneyRunExecutionMetricsResponse,
  GetJourneyRunExecutionMetricsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJourneyRunExecutionMetricsRequest,
  output: GetJourneyRunExecutionMetricsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourneyRunExecutionMetrics",
}));

export type GetJourneyRunsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about the runs of a journey.
 */
export const getJourneyRuns: API.OperationMethod<
  GetJourneyRunsRequest,
  GetJourneyRunsResponse,
  GetJourneyRunsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJourneyRunsRequest,
  output: GetJourneyRunsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJourneyRuns",
}));

export type GetPushTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the content and settings of a message template for messages that are sent through a push notification channel.
 */
export const getPushTemplate: API.OperationMethod<
  GetPushTemplateRequest,
  GetPushTemplateResponse,
  GetPushTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPushTemplateRequest,
  output: GetPushTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPushTemplate",
}));

export type GetRecommenderConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about an Amazon Pinpoint configuration for a recommender model.
 */
export const getRecommenderConfiguration: API.OperationMethod<
  GetRecommenderConfigurationRequest,
  GetRecommenderConfigurationResponse,
  GetRecommenderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRecommenderConfigurationRequest,
  output: GetRecommenderConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommenderConfiguration",
}));

export type GetRecommenderConfigurationsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about all the recommender model configurations that are associated with your Amazon Pinpoint account.
 */
export const getRecommenderConfigurations: API.OperationMethod<
  GetRecommenderConfigurationsRequest,
  GetRecommenderConfigurationsResponse,
  GetRecommenderConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetRecommenderConfigurationsRequest,
  output: GetRecommenderConfigurationsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommenderConfigurations",
}));

export type GetSegmentError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the configuration, dimension, and other settings for a specific segment that's associated with an application.
 */
export const getSegment: API.OperationMethod<
  GetSegmentRequest,
  GetSegmentResponse,
  GetSegmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSegmentRequest,
  output: GetSegmentResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegment",
}));

export type GetSegmentExportJobsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the export jobs for a segment.
 */
export const getSegmentExportJobs: API.OperationMethod<
  GetSegmentExportJobsRequest,
  GetSegmentExportJobsResponse,
  GetSegmentExportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSegmentExportJobsRequest,
  output: GetSegmentExportJobsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentExportJobs",
}));

export type GetSegmentImportJobsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the import jobs for a segment.
 */
export const getSegmentImportJobs: API.OperationMethod<
  GetSegmentImportJobsRequest,
  GetSegmentImportJobsResponse,
  GetSegmentImportJobsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSegmentImportJobsRequest,
  output: GetSegmentImportJobsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentImportJobs",
}));

export type GetSegmentsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the configuration, dimension, and other settings for all the segments that are associated with an application.
 */
export const getSegments: API.OperationMethod<
  GetSegmentsRequest,
  GetSegmentsResponse,
  GetSegmentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSegmentsRequest,
  output: GetSegmentsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegments",
}));

export type GetSegmentVersionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the configuration, dimension, and other settings for a specific version of a segment that's associated with an application.
 */
export const getSegmentVersion: API.OperationMethod<
  GetSegmentVersionRequest,
  GetSegmentVersionResponse,
  GetSegmentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSegmentVersionRequest,
  output: GetSegmentVersionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentVersion",
}));

export type GetSegmentVersionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the configuration, dimension, and other settings for all the versions of a specific segment that's associated with an application.
 */
export const getSegmentVersions: API.OperationMethod<
  GetSegmentVersionsRequest,
  GetSegmentVersionsResponse,
  GetSegmentVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSegmentVersionsRequest,
  output: GetSegmentVersionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSegmentVersions",
}));

export type GetSmsChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the SMS channel for an application.
 */
export const getSmsChannel: API.OperationMethod<
  GetSmsChannelRequest,
  GetSmsChannelResponse,
  GetSmsChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSmsChannelRequest,
  output: GetSmsChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSmsChannel",
}));

export type GetSmsTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the content and settings of a message template for messages that are sent through the SMS channel.
 */
export const getSmsTemplate: API.OperationMethod<
  GetSmsTemplateRequest,
  GetSmsTemplateResponse,
  GetSmsTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSmsTemplateRequest,
  output: GetSmsTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSmsTemplate",
}));

export type GetUserEndpointsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about all the endpoints that are associated with a specific user ID.
 */
export const getUserEndpoints: API.OperationMethod<
  GetUserEndpointsRequest,
  GetUserEndpointsResponse,
  GetUserEndpointsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUserEndpointsRequest,
  output: GetUserEndpointsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserEndpoints",
}));

export type GetVoiceChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status and settings of the voice channel for an application.
 */
export const getVoiceChannel: API.OperationMethod<
  GetVoiceChannelRequest,
  GetVoiceChannelResponse,
  GetVoiceChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVoiceChannelRequest,
  output: GetVoiceChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceChannel",
}));

export type GetVoiceTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the content and settings of a message template for messages that are sent through the voice channel.
 */
export const getVoiceTemplate: API.OperationMethod<
  GetVoiceTemplateRequest,
  GetVoiceTemplateResponse,
  GetVoiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVoiceTemplateRequest,
  output: GetVoiceTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceTemplate",
}));

export type ListJourneysError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about the status, configuration, and other settings for all the journeys that are associated with an application.
 */
export const listJourneys: API.OperationMethod<
  ListJourneysRequest,
  ListJourneysResponse,
  ListJourneysError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListJourneysRequest,
  output: ListJourneysResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJourneys",
}));

export type ListTagsForResourceError = CommonErrors;
/**
 * Retrieves all the tags (keys and values) that are associated with an application, campaign, message template, or segment.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTemplatesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about all the message templates that are associated with your Amazon Pinpoint account.
 */
export const listTemplates: API.OperationMethod<
  ListTemplatesRequest,
  ListTemplatesResponse,
  ListTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTemplatesRequest,
  output: ListTemplatesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplates",
}));

export type ListTemplateVersionsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about all the versions of a specific message template.
 */
export const listTemplateVersions: API.OperationMethod<
  ListTemplateVersionsRequest,
  ListTemplateVersionsResponse,
  ListTemplateVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTemplateVersionsRequest,
  output: ListTemplateVersionsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplateVersions",
}));

export type PhoneNumberValidateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves information about a phone number.
 */
export const phoneNumberValidate: API.OperationMethod<
  PhoneNumberValidateRequest,
  PhoneNumberValidateResponse,
  PhoneNumberValidateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PhoneNumberValidateRequest,
  output: PhoneNumberValidateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PhoneNumberValidate",
}));

export type PutEventsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new event to record for endpoints, or creates or updates endpoint data that existing events are associated with.
 */
export const putEvents: API.OperationMethod<
  PutEventsRequest,
  PutEventsResponse,
  PutEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEventsRequest,
  output: PutEventsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEvents",
}));

export type PutEventStreamError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new event stream for an application or updates the settings of an existing event stream for an application.
 */
export const putEventStream: API.OperationMethod<
  PutEventStreamRequest,
  PutEventStreamResponse,
  PutEventStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutEventStreamRequest,
  output: PutEventStreamResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutEventStream",
}));

export type RemoveAttributesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes one or more custom attributes, of the same attribute type, from the application. Existing endpoints still have the attributes but Amazon Pinpoint will stop capturing new or changed values for these attributes.
 */
export const removeAttributes: API.OperationMethod<
  RemoveAttributesRequest,
  RemoveAttributesResponse,
  RemoveAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RemoveAttributesRequest,
  output: RemoveAttributesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveAttributes",
}));

export type SendMessagesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates and sends a direct message.
 */
export const sendMessages: API.OperationMethod<
  SendMessagesRequest,
  SendMessagesResponse,
  SendMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendMessagesRequest,
  output: SendMessagesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendMessages",
}));

export type SendOTPMessageError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Send an OTP message
 */
export const sendOTPMessage: API.OperationMethod<
  SendOTPMessageRequest,
  SendOTPMessageResponse,
  SendOTPMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendOTPMessageRequest,
  output: SendOTPMessageResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendOTPMessage",
}));

export type SendUsersMessagesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates and sends a message to a list of users.
 */
export const sendUsersMessages: API.OperationMethod<
  SendUsersMessagesRequest,
  SendUsersMessagesResponse,
  SendUsersMessagesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendUsersMessagesRequest,
  output: SendUsersMessagesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendUsersMessages",
}));

export type TagResourceError = CommonErrors;
/**
 * Adds one or more tags (keys and values) to an application, campaign, message template, or segment.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = CommonErrors;
/**
 * Removes one or more tags (keys and values) from an application, campaign, message template, or segment.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAdmChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the ADM channel for an application or updates the status and settings of the ADM channel for an application.
 */
export const updateAdmChannel: API.OperationMethod<
  UpdateAdmChannelRequest,
  UpdateAdmChannelResponse,
  UpdateAdmChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAdmChannelRequest,
  output: UpdateAdmChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAdmChannel",
}));

export type UpdateApnsChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the APNs channel for an application or updates the status and settings of the APNs channel for an application.
 */
export const updateApnsChannel: API.OperationMethod<
  UpdateApnsChannelRequest,
  UpdateApnsChannelResponse,
  UpdateApnsChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApnsChannelRequest,
  output: UpdateApnsChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApnsChannel",
}));

export type UpdateApnsSandboxChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the APNs sandbox channel for an application or updates the status and settings of the APNs sandbox channel for an application.
 */
export const updateApnsSandboxChannel: API.OperationMethod<
  UpdateApnsSandboxChannelRequest,
  UpdateApnsSandboxChannelResponse,
  UpdateApnsSandboxChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApnsSandboxChannelRequest,
  output: UpdateApnsSandboxChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApnsSandboxChannel",
}));

export type UpdateApnsVoipChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the APNs VoIP channel for an application or updates the status and settings of the APNs VoIP channel for an application.
 */
export const updateApnsVoipChannel: API.OperationMethod<
  UpdateApnsVoipChannelRequest,
  UpdateApnsVoipChannelResponse,
  UpdateApnsVoipChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApnsVoipChannelRequest,
  output: UpdateApnsVoipChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApnsVoipChannel",
}));

export type UpdateApnsVoipSandboxChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the APNs VoIP sandbox channel for an application or updates the status and settings of the APNs VoIP sandbox channel for an application.
 */
export const updateApnsVoipSandboxChannel: API.OperationMethod<
  UpdateApnsVoipSandboxChannelRequest,
  UpdateApnsVoipSandboxChannelResponse,
  UpdateApnsVoipSandboxChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApnsVoipSandboxChannelRequest,
  output: UpdateApnsVoipSandboxChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApnsVoipSandboxChannel",
}));

export type UpdateApplicationSettingsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the settings for an application.
 */
export const updateApplicationSettings: API.OperationMethod<
  UpdateApplicationSettingsRequest,
  UpdateApplicationSettingsResponse,
  UpdateApplicationSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateApplicationSettingsRequest,
  output: UpdateApplicationSettingsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateApplicationSettings",
}));

export type UpdateBaiduChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the Baidu channel for an application or updates the status and settings of the Baidu channel for an application.
 */
export const updateBaiduChannel: API.OperationMethod<
  UpdateBaiduChannelRequest,
  UpdateBaiduChannelResponse,
  UpdateBaiduChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBaiduChannelRequest,
  output: UpdateBaiduChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBaiduChannel",
}));

export type UpdateCampaignError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration and other settings for a campaign.
 */
export const updateCampaign: API.OperationMethod<
  UpdateCampaignRequest,
  UpdateCampaignResponse,
  UpdateCampaignError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCampaignRequest,
  output: UpdateCampaignResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCampaign",
}));

export type UpdateEmailChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the email channel for an application or updates the status and settings of the email channel for an application.
 */
export const updateEmailChannel: API.OperationMethod<
  UpdateEmailChannelRequest,
  UpdateEmailChannelResponse,
  UpdateEmailChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEmailChannelRequest,
  output: UpdateEmailChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmailChannel",
}));

export type UpdateEmailTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing message template for messages that are sent through the email channel.
 */
export const updateEmailTemplate: API.OperationMethod<
  UpdateEmailTemplateRequest,
  UpdateEmailTemplateResponse,
  UpdateEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEmailTemplateRequest,
  output: UpdateEmailTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEmailTemplate",
}));

export type UpdateEndpointError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new endpoint for an application or updates the settings and attributes of an existing endpoint for an application. You can also use this operation to define custom attributes for an endpoint. If an update includes one or more values for a custom attribute, Amazon Pinpoint replaces (overwrites) any existing values with the new values.
 */
export const updateEndpoint: API.OperationMethod<
  UpdateEndpointRequest,
  UpdateEndpointResponse,
  UpdateEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEndpointRequest,
  output: UpdateEndpointResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEndpoint",
}));

export type UpdateEndpointsBatchError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new batch of endpoints for an application or updates the settings and attributes of a batch of existing endpoints for an application. You can also use this operation to define custom attributes for a batch of endpoints. If an update includes one or more values for a custom attribute, Amazon Pinpoint replaces (overwrites) any existing values with the new values.
 */
export const updateEndpointsBatch: API.OperationMethod<
  UpdateEndpointsBatchRequest,
  UpdateEndpointsBatchResponse,
  UpdateEndpointsBatchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEndpointsBatchRequest,
  output: UpdateEndpointsBatchResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEndpointsBatch",
}));

export type UpdateGcmChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the GCM channel for an application or updates the status and settings of the GCM channel for an application.
 */
export const updateGcmChannel: API.OperationMethod<
  UpdateGcmChannelRequest,
  UpdateGcmChannelResponse,
  UpdateGcmChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateGcmChannelRequest,
  output: UpdateGcmChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGcmChannel",
}));

export type UpdateInAppTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing message template for messages sent through the in-app message channel.
 */
export const updateInAppTemplate: API.OperationMethod<
  UpdateInAppTemplateRequest,
  UpdateInAppTemplateResponse,
  UpdateInAppTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateInAppTemplateRequest,
  output: UpdateInAppTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInAppTemplate",
}));

export type UpdateJourneyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the configuration and other settings for a journey.
 */
export const updateJourney: API.OperationMethod<
  UpdateJourneyRequest,
  UpdateJourneyResponse,
  UpdateJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJourneyRequest,
  output: UpdateJourneyResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJourney",
}));

export type UpdateJourneyStateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Cancels (stops) an active journey.
 */
export const updateJourneyState: API.OperationMethod<
  UpdateJourneyStateRequest,
  UpdateJourneyStateResponse,
  UpdateJourneyStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJourneyStateRequest,
  output: UpdateJourneyStateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJourneyState",
}));

export type UpdatePushTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing message template for messages that are sent through a push notification channel.
 */
export const updatePushTemplate: API.OperationMethod<
  UpdatePushTemplateRequest,
  UpdatePushTemplateResponse,
  UpdatePushTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePushTemplateRequest,
  output: UpdatePushTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePushTemplate",
}));

export type UpdateRecommenderConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an Amazon Pinpoint configuration for a recommender model.
 */
export const updateRecommenderConfiguration: API.OperationMethod<
  UpdateRecommenderConfigurationRequest,
  UpdateRecommenderConfigurationResponse,
  UpdateRecommenderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateRecommenderConfigurationRequest,
  output: UpdateRecommenderConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRecommenderConfiguration",
}));

export type UpdateSegmentError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a new segment for an application or updates the configuration, dimension, and other settings for an existing segment that's associated with an application.
 */
export const updateSegment: API.OperationMethod<
  UpdateSegmentRequest,
  UpdateSegmentResponse,
  UpdateSegmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSegmentRequest,
  output: UpdateSegmentResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSegment",
}));

export type UpdateSmsChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the SMS channel for an application or updates the status and settings of the SMS channel for an application.
 */
export const updateSmsChannel: API.OperationMethod<
  UpdateSmsChannelRequest,
  UpdateSmsChannelResponse,
  UpdateSmsChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSmsChannelRequest,
  output: UpdateSmsChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSmsChannel",
}));

export type UpdateSmsTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing message template for messages that are sent through the SMS channel.
 */
export const updateSmsTemplate: API.OperationMethod<
  UpdateSmsTemplateRequest,
  UpdateSmsTemplateResponse,
  UpdateSmsTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSmsTemplateRequest,
  output: UpdateSmsTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSmsTemplate",
}));

export type UpdateTemplateActiveVersionError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Changes the status of a specific version of a message template to *active*.
 */
export const updateTemplateActiveVersion: API.OperationMethod<
  UpdateTemplateActiveVersionRequest,
  UpdateTemplateActiveVersionResponse,
  UpdateTemplateActiveVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTemplateActiveVersionRequest,
  output: UpdateTemplateActiveVersionResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTemplateActiveVersion",
}));

export type UpdateVoiceChannelError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Enables the voice channel for an application or updates the status and settings of the voice channel for an application.
 */
export const updateVoiceChannel: API.OperationMethod<
  UpdateVoiceChannelRequest,
  UpdateVoiceChannelResponse,
  UpdateVoiceChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVoiceChannelRequest,
  output: UpdateVoiceChannelResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVoiceChannel",
}));

export type UpdateVoiceTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates an existing message template for messages that are sent through the voice channel.
 */
export const updateVoiceTemplate: API.OperationMethod<
  UpdateVoiceTemplateRequest,
  UpdateVoiceTemplateResponse,
  UpdateVoiceTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVoiceTemplateRequest,
  output: UpdateVoiceTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVoiceTemplate",
}));

export type VerifyOTPMessageError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | PayloadTooLargeException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Verify an OTP
 */
export const verifyOTPMessage: API.OperationMethod<
  VerifyOTPMessageRequest,
  VerifyOTPMessageResponse,
  VerifyOTPMessageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: VerifyOTPMessageRequest,
  output: VerifyOTPMessageResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    PayloadTooLargeException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyOTPMessage",
}));
