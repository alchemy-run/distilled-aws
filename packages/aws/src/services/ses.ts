import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const ns = T.XmlNamespace("http://ses.amazonaws.com/doc/2010-12-01/");
const svc = T.AwsApiService({
  sdkId: "SES",
  serviceShapeName: "SimpleEmailService",
});
const auth = T.AwsAuthSigv4({ name: "ses" });
const ver = T.ServiceVersion("2010-12-01");
const proto = T.AwsProtocolsAwsQuery();
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

export class AccountSendingPausedException
  extends /*@__PURE__*/ S.TaggedError<AccountSendingPausedException>()(
    "AccountSendingPausedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "AccountSendingPausedException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class AlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<AlreadyExistsException>()(
    "AlreadyExistsException",
    {
      Name: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "AlreadyExists", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CannotDeleteException
  extends /*@__PURE__*/ S.TaggedError<CannotDeleteException>()(
    "CannotDeleteException",
    {
      Name: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "CannotDelete", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ConfigurationSetAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ConfigurationSetAlreadyExistsException>()(
    "ConfigurationSetAlreadyExistsException",
    {
      ConfigurationSetName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "ConfigurationSetAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class ConfigurationSetDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<ConfigurationSetDoesNotExistException>()(
    "ConfigurationSetDoesNotExistException",
    {
      ConfigurationSetName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "ConfigurationSetDoesNotExist",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ConfigurationSetSendingPausedException
  extends /*@__PURE__*/ S.TaggedError<ConfigurationSetSendingPausedException>()(
    "ConfigurationSetSendingPausedException",
    {
      ConfigurationSetName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "ConfigurationSetSendingPausedException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CustomVerificationEmailInvalidContentException
  extends /*@__PURE__*/ S.TaggedError<CustomVerificationEmailInvalidContentException>()(
    "CustomVerificationEmailInvalidContentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "CustomVerificationEmailInvalidContent",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CustomVerificationEmailTemplateAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<CustomVerificationEmailTemplateAlreadyExistsException>()(
    "CustomVerificationEmailTemplateAlreadyExistsException",
    {
      CustomVerificationEmailTemplateName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "CustomVerificationEmailTemplateAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class CustomVerificationEmailTemplateDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<CustomVerificationEmailTemplateDoesNotExistException>()(
    "CustomVerificationEmailTemplateDoesNotExistException",
    {
      CustomVerificationEmailTemplateName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "CustomVerificationEmailTemplateDoesNotExist",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class EventDestinationAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<EventDestinationAlreadyExistsException>()(
    "EventDestinationAlreadyExistsException",
    {
      ConfigurationSetName: S.optional(S.String),
      EventDestinationName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "EventDestinationAlreadyExists",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class EventDestinationDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<EventDestinationDoesNotExistException>()(
    "EventDestinationDoesNotExistException",
    {
      ConfigurationSetName: S.optional(S.String),
      EventDestinationName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "EventDestinationDoesNotExist",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class FromEmailAddressNotVerifiedException
  extends /*@__PURE__*/ S.TaggedError<FromEmailAddressNotVerifiedException>()(
    "FromEmailAddressNotVerifiedException",
    {
      FromEmailAddress: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "FromEmailAddressNotVerified",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class IdentityNotVerified
  extends /*@__PURE__*/ S.TaggedError<IdentityNotVerified>()(
    "IdentityNotVerified",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "InvalidParameterValue",
      message: { includes: "Identity is not verified" },
    }),
  ) {}
export class InvalidCloudWatchDestinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidCloudWatchDestinationException>()(
    "InvalidCloudWatchDestinationException",
    {
      ConfigurationSetName: S.optional(S.String),
      EventDestinationName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "InvalidCloudWatchDestination",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidConfigurationSetException
  extends /*@__PURE__*/ S.TaggedError<InvalidConfigurationSetException>()(
    "InvalidConfigurationSetException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidConfigurationSet",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidDeliveryOptionsException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeliveryOptionsException>()(
    "InvalidDeliveryOptionsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidDeliveryOptions",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidFirehoseDestinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidFirehoseDestinationException>()(
    "InvalidFirehoseDestinationException",
    {
      ConfigurationSetName: S.optional(S.String),
      EventDestinationName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "InvalidFirehoseDestination",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidLambdaFunctionException
  extends /*@__PURE__*/ S.TaggedError<InvalidLambdaFunctionException>()(
    "InvalidLambdaFunctionException",
    {
      FunctionArn: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "InvalidLambdaFunction", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValue
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValue>()(
    "InvalidParameterValue",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class InvalidPolicyException
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyException>()(
    "InvalidPolicyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "InvalidPolicy", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidRenderingParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidRenderingParameterException>()(
    "InvalidRenderingParameterException",
    {
      TemplateName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "InvalidRenderingParameter",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3ConfigurationException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3ConfigurationException>()(
    "InvalidS3ConfigurationException",
    {
      Bucket: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "InvalidS3Configuration",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSNSDestinationException
  extends /*@__PURE__*/ S.TaggedError<InvalidSNSDestinationException>()(
    "InvalidSNSDestinationException",
    {
      ConfigurationSetName: S.optional(S.String),
      EventDestinationName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "InvalidSNSDestination", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSnsTopicException
  extends /*@__PURE__*/ S.TaggedError<InvalidSnsTopicException>()(
    "InvalidSnsTopicException",
    {
      Topic: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "InvalidSnsTopic", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTemplateException
  extends /*@__PURE__*/ S.TaggedError<InvalidTemplateException>()(
    "InvalidTemplateException",
    {
      TemplateName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "InvalidTemplate", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidTrackingOptionsException
  extends /*@__PURE__*/ S.TaggedError<InvalidTrackingOptionsException>()(
    "InvalidTrackingOptionsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "InvalidTrackingOptions",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "LimitExceeded", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MailFromDomainNotVerifiedException
  extends /*@__PURE__*/ S.TaggedError<MailFromDomainNotVerifiedException>()(
    "MailFromDomainNotVerifiedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "MailFromDomainNotVerifiedException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MessageRejected
  extends /*@__PURE__*/ S.TaggedError<MessageRejected>()(
    "MessageRejected",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({ code: "MessageRejected", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class MissingRenderingAttributeException
  extends /*@__PURE__*/ S.TaggedError<MissingRenderingAttributeException>()(
    "MissingRenderingAttributeException",
    {
      TemplateName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "MissingRenderingAttribute",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ProductionAccessNotGrantedException
  extends /*@__PURE__*/ S.TaggedError<ProductionAccessNotGrantedException>()(
    "ProductionAccessNotGrantedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.all(
      T.AwsQueryError({
        code: "ProductionAccessNotGranted",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class RuleDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<RuleDoesNotExistException>()(
    "RuleDoesNotExistException",
    {
      Name: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "RuleDoesNotExist", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class RuleSetDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<RuleSetDoesNotExistException>()(
    "RuleSetDoesNotExistException",
    {
      Name: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "RuleSetDoesNotExist", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TemplateDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<TemplateDoesNotExistException>()(
    "TemplateDoesNotExistException",
    {
      TemplateName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({ code: "TemplateDoesNotExist", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TrackingOptionsAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<TrackingOptionsAlreadyExistsException>()(
    "TrackingOptionsAlreadyExistsException",
    {
      ConfigurationSetName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "TrackingOptionsAlreadyExistsException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError, C.withAlreadyExistsError) {}
export class TrackingOptionsDoesNotExistException
  extends /*@__PURE__*/ S.TaggedError<TrackingOptionsDoesNotExistException>()(
    "TrackingOptionsDoesNotExistException",
    {
      ConfigurationSetName: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.all(
      T.AwsQueryError({
        code: "TrackingOptionsDoesNotExistException",
        httpResponseCode: 400,
      }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type ReceiptRuleSetName = string;
export interface CloneReceiptRuleSetRequest {
  RuleSetName: string;
  OriginalRuleSetName: string;
}
export const CloneReceiptRuleSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetName: S.String, OriginalRuleSetName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CloneReceiptRuleSetRequest",
}) as any as S.Schema<CloneReceiptRuleSetRequest>;
export interface CloneReceiptRuleSetResponse {}
export const CloneReceiptRuleSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CloneReceiptRuleSetResponse",
}) as any as S.Schema<CloneReceiptRuleSetResponse>;
export type ConfigurationSetName = string;
export interface ConfigurationSet {
  Name: string;
}
export const ConfigurationSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }),
).annotate({
  identifier: "ConfigurationSet",
}) as any as S.Schema<ConfigurationSet>;
export interface CreateConfigurationSetRequest {
  ConfigurationSet: ConfigurationSet;
}
export const CreateConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConfigurationSet: ConfigurationSet }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateConfigurationSetResponse",
}) as any as S.Schema<CreateConfigurationSetResponse>;
export type EventDestinationName = string;
export type Enabled = boolean;
export type EventType =
  | "send"
  | "reject"
  | "bounce"
  | "complaint"
  | "delivery"
  | "open"
  | "click"
  | "renderingFailure"
  | (string & {});
export const EventType = S.String;

export type EventTypes = EventType[];
export const EventTypes = /*@__PURE__*/ S.Array(EventType);
export type AmazonResourceName = string;
export interface KinesisFirehoseDestination {
  IAMRoleARN: string;
  DeliveryStreamARN: string;
}
export const KinesisFirehoseDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ IAMRoleARN: S.String, DeliveryStreamARN: S.String }),
).annotate({
  identifier: "KinesisFirehoseDestination",
}) as any as S.Schema<KinesisFirehoseDestination>;
export type DimensionName = string;
export type DimensionValueSource =
  | "messageTag"
  | "emailHeader"
  | "linkTag"
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
export interface SNSDestination {
  TopicARN: string;
}
export const SNSDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TopicARN: S.String }),
).annotate({ identifier: "SNSDestination" }) as any as S.Schema<SNSDestination>;
export interface EventDestination {
  Name: string;
  Enabled?: boolean;
  MatchingEventTypes: EventType[];
  KinesisFirehoseDestination?: KinesisFirehoseDestination;
  CloudWatchDestination?: CloudWatchDestination;
  SNSDestination?: SNSDestination;
}
export const EventDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Enabled: S.optional(S.Boolean),
    MatchingEventTypes: EventTypes,
    KinesisFirehoseDestination: S.optional(KinesisFirehoseDestination),
    CloudWatchDestination: S.optional(CloudWatchDestination),
    SNSDestination: S.optional(SNSDestination),
  }),
).annotate({
  identifier: "EventDestination",
}) as any as S.Schema<EventDestination>;
export interface CreateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestination: EventDestination;
}
export const CreateConfigurationSetEventDestinationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String,
      EventDestination: EventDestination,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
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
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "CreateConfigurationSetEventDestinationResponse",
  }) as any as S.Schema<CreateConfigurationSetEventDestinationResponse>;
export type CustomRedirectDomain = string;
export interface TrackingOptions {
  CustomRedirectDomain?: string;
}
export const TrackingOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CustomRedirectDomain: S.optional(S.String) }),
).annotate({
  identifier: "TrackingOptions",
}) as any as S.Schema<TrackingOptions>;
export interface CreateConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
  TrackingOptions: TrackingOptions;
}
export const CreateConfigurationSetTrackingOptionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String,
      TrackingOptions: TrackingOptions,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateConfigurationSetTrackingOptionsRequest",
  }) as any as S.Schema<CreateConfigurationSetTrackingOptionsRequest>;
export interface CreateConfigurationSetTrackingOptionsResponse {}
export const CreateConfigurationSetTrackingOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "CreateConfigurationSetTrackingOptionsResponse",
  }) as any as S.Schema<CreateConfigurationSetTrackingOptionsResponse>;
export type TemplateName = string;
export type FromAddress = string;
export type Subject = string;
export type TemplateContent = string;
export type SuccessRedirectionURL = string;
export type FailureRedirectionURL = string;
export interface CreateCustomVerificationEmailTemplateRequest {
  TemplateName: string;
  FromEmailAddress: string;
  TemplateSubject: string;
  TemplateContent: string;
  SuccessRedirectionURL: string;
  FailureRedirectionURL: string;
}
export const CreateCustomVerificationEmailTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TemplateName: S.String,
      FromEmailAddress: S.String,
      TemplateSubject: S.String,
      TemplateContent: S.String,
      SuccessRedirectionURL: S.String,
      FailureRedirectionURL: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateCustomVerificationEmailTemplateRequest",
  }) as any as S.Schema<CreateCustomVerificationEmailTemplateRequest>;
export interface CreateCustomVerificationEmailTemplateResponse {}
export const CreateCustomVerificationEmailTemplateResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "CreateCustomVerificationEmailTemplateResponse",
  }) as any as S.Schema<CreateCustomVerificationEmailTemplateResponse>;
export type ReceiptFilterName = string;
export type ReceiptFilterPolicy = "Block" | "Allow" | (string & {});
export const ReceiptFilterPolicy = S.String;

export type Cidr = string;
export interface ReceiptIpFilter {
  Policy: ReceiptFilterPolicy;
  Cidr: string;
}
export const ReceiptIpFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: ReceiptFilterPolicy, Cidr: S.String }),
).annotate({
  identifier: "ReceiptIpFilter",
}) as any as S.Schema<ReceiptIpFilter>;
export interface ReceiptFilter {
  Name: string;
  IpFilter: ReceiptIpFilter;
}
export const ReceiptFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, IpFilter: ReceiptIpFilter }),
).annotate({ identifier: "ReceiptFilter" }) as any as S.Schema<ReceiptFilter>;
export interface CreateReceiptFilterRequest {
  Filter: ReceiptFilter;
}
export const CreateReceiptFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Filter: ReceiptFilter }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReceiptFilterRequest",
}) as any as S.Schema<CreateReceiptFilterRequest>;
export interface CreateReceiptFilterResponse {}
export const CreateReceiptFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateReceiptFilterResponse",
}) as any as S.Schema<CreateReceiptFilterResponse>;
export type ReceiptRuleName = string;
export type TlsPolicy = "Require" | "Optional" | (string & {});
export const TlsPolicy = S.String;

export type Recipient = string;
export type RecipientsList = string[];
export const RecipientsList = /*@__PURE__*/ S.Array(S.String);
export type S3BucketName = string;
export type S3KeyPrefix = string;
export type IAMRoleARN = string;
export interface S3Action {
  TopicArn?: string;
  BucketName: string;
  ObjectKeyPrefix?: string;
  KmsKeyArn?: string;
  IamRoleArn?: string;
}
export const S3Action = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TopicArn: S.optional(S.String),
    BucketName: S.String,
    ObjectKeyPrefix: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
    IamRoleArn: S.optional(S.String),
  }),
).annotate({ identifier: "S3Action" }) as any as S.Schema<S3Action>;
export type BounceSmtpReplyCode = string;
export type BounceStatusCode = string;
export type BounceMessage = string;
export type Address = string;
export interface BounceAction {
  TopicArn?: string;
  SmtpReplyCode: string;
  StatusCode?: string;
  Message: string;
  Sender: string;
}
export const BounceAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TopicArn: S.optional(S.String),
    SmtpReplyCode: S.String,
    StatusCode: S.optional(S.String),
    Message: S.String,
    Sender: S.String,
  }),
).annotate({ identifier: "BounceAction" }) as any as S.Schema<BounceAction>;
export interface WorkmailAction {
  TopicArn?: string;
  OrganizationArn: string;
}
export const WorkmailAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TopicArn: S.optional(S.String), OrganizationArn: S.String }),
).annotate({ identifier: "WorkmailAction" }) as any as S.Schema<WorkmailAction>;
export type InvocationType = "Event" | "RequestResponse" | (string & {});
export const InvocationType = S.String;

export interface LambdaAction {
  TopicArn?: string;
  FunctionArn: string;
  InvocationType?: InvocationType;
}
export const LambdaAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TopicArn: S.optional(S.String),
    FunctionArn: S.String,
    InvocationType: S.optional(InvocationType),
  }),
).annotate({ identifier: "LambdaAction" }) as any as S.Schema<LambdaAction>;
export type StopScope = "RuleSet" | (string & {});
export const StopScope = S.String;

export interface StopAction {
  Scope: StopScope;
  TopicArn?: string;
}
export const StopAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Scope: StopScope, TopicArn: S.optional(S.String) }),
).annotate({ identifier: "StopAction" }) as any as S.Schema<StopAction>;
export type HeaderName = string;
export type HeaderValue = string;
export interface AddHeaderAction {
  HeaderName: string;
  HeaderValue: string;
}
export const AddHeaderAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HeaderName: S.String, HeaderValue: S.String }),
).annotate({
  identifier: "AddHeaderAction",
}) as any as S.Schema<AddHeaderAction>;
export type SNSActionEncoding = "UTF-8" | "Base64" | (string & {});
export const SNSActionEncoding = S.String;

export interface SNSAction {
  TopicArn: string;
  Encoding?: SNSActionEncoding;
}
export const SNSAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TopicArn: S.String, Encoding: S.optional(SNSActionEncoding) }),
).annotate({ identifier: "SNSAction" }) as any as S.Schema<SNSAction>;
export type ConnectInstanceArn = string;
export interface ConnectAction {
  InstanceARN: string;
  IAMRoleARN: string;
}
export const ConnectAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InstanceARN: S.String, IAMRoleARN: S.String }),
).annotate({ identifier: "ConnectAction" }) as any as S.Schema<ConnectAction>;
export interface ReceiptAction {
  S3Action?: S3Action;
  BounceAction?: BounceAction;
  WorkmailAction?: WorkmailAction;
  LambdaAction?: LambdaAction;
  StopAction?: StopAction;
  AddHeaderAction?: AddHeaderAction;
  SNSAction?: SNSAction;
  ConnectAction?: ConnectAction;
}
export const ReceiptAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Action: S.optional(S3Action),
    BounceAction: S.optional(BounceAction),
    WorkmailAction: S.optional(WorkmailAction),
    LambdaAction: S.optional(LambdaAction),
    StopAction: S.optional(StopAction),
    AddHeaderAction: S.optional(AddHeaderAction),
    SNSAction: S.optional(SNSAction),
    ConnectAction: S.optional(ConnectAction),
  }),
).annotate({ identifier: "ReceiptAction" }) as any as S.Schema<ReceiptAction>;
export type ReceiptActionsList = ReceiptAction[];
export const ReceiptActionsList = /*@__PURE__*/ S.Array(ReceiptAction);
export interface ReceiptRule {
  Name: string;
  Enabled?: boolean;
  TlsPolicy?: TlsPolicy;
  Recipients?: string[];
  Actions?: ReceiptAction[];
  ScanEnabled?: boolean;
}
export const ReceiptRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Enabled: S.optional(S.Boolean),
    TlsPolicy: S.optional(TlsPolicy),
    Recipients: S.optional(RecipientsList),
    Actions: S.optional(ReceiptActionsList),
    ScanEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "ReceiptRule" }) as any as S.Schema<ReceiptRule>;
export interface CreateReceiptRuleRequest {
  RuleSetName: string;
  After?: string;
  Rule: ReceiptRule;
}
export const CreateReceiptRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleSetName: S.String,
    After: S.optional(S.String),
    Rule: ReceiptRule,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReceiptRuleRequest",
}) as any as S.Schema<CreateReceiptRuleRequest>;
export interface CreateReceiptRuleResponse {}
export const CreateReceiptRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateReceiptRuleResponse",
}) as any as S.Schema<CreateReceiptRuleResponse>;
export interface CreateReceiptRuleSetRequest {
  RuleSetName: string;
}
export const CreateReceiptRuleSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateReceiptRuleSetRequest",
}) as any as S.Schema<CreateReceiptRuleSetRequest>;
export interface CreateReceiptRuleSetResponse {}
export const CreateReceiptRuleSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateReceiptRuleSetResponse",
}) as any as S.Schema<CreateReceiptRuleSetResponse>;
export type SubjectPart = string;
export type TextPart = string;
export type HtmlPart = string;
export interface Template {
  TemplateName: string;
  SubjectPart?: string;
  TextPart?: string;
  HtmlPart?: string;
}
export const Template = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.String,
    SubjectPart: S.optional(S.String),
    TextPart: S.optional(S.String),
    HtmlPart: S.optional(S.String),
  }),
).annotate({ identifier: "Template" }) as any as S.Schema<Template>;
export interface CreateTemplateRequest {
  Template: Template;
}
export const CreateTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Template: Template }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTemplateRequest",
}) as any as S.Schema<CreateTemplateRequest>;
export interface CreateTemplateResponse {}
export const CreateTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "CreateTemplateResponse",
}) as any as S.Schema<CreateTemplateResponse>;
export interface DeleteConfigurationSetRequest {
  ConfigurationSetName: string;
}
export const DeleteConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ConfigurationSetName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
  S.Struct({}).pipe(ns),
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
      ConfigurationSetName: S.String,
      EventDestinationName: S.String,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
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
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DeleteConfigurationSetEventDestinationResponse",
  }) as any as S.Schema<DeleteConfigurationSetEventDestinationResponse>;
export interface DeleteConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
}
export const DeleteConfigurationSetTrackingOptionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ConfigurationSetName: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteConfigurationSetTrackingOptionsRequest",
  }) as any as S.Schema<DeleteConfigurationSetTrackingOptionsRequest>;
export interface DeleteConfigurationSetTrackingOptionsResponse {}
export const DeleteConfigurationSetTrackingOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DeleteConfigurationSetTrackingOptionsResponse",
  }) as any as S.Schema<DeleteConfigurationSetTrackingOptionsResponse>;
export interface DeleteCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}
export const DeleteCustomVerificationEmailTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ TemplateName: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteCustomVerificationEmailTemplateRequest",
  }) as any as S.Schema<DeleteCustomVerificationEmailTemplateRequest>;
export interface DeleteCustomVerificationEmailTemplateResponse {}
export const DeleteCustomVerificationEmailTemplateResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "DeleteCustomVerificationEmailTemplateResponse",
  }) as any as S.Schema<DeleteCustomVerificationEmailTemplateResponse>;
export type Identity = string;
export interface DeleteIdentityRequest {
  Identity: string;
}
export const DeleteIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identity: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIdentityRequest",
}) as any as S.Schema<DeleteIdentityRequest>;
export interface DeleteIdentityResponse {}
export const DeleteIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteIdentityResponse",
}) as any as S.Schema<DeleteIdentityResponse>;
export type PolicyName = string;
export interface DeleteIdentityPolicyRequest {
  Identity: string;
  PolicyName: string;
}
export const DeleteIdentityPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identity: S.String, PolicyName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIdentityPolicyRequest",
}) as any as S.Schema<DeleteIdentityPolicyRequest>;
export interface DeleteIdentityPolicyResponse {}
export const DeleteIdentityPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteIdentityPolicyResponse",
}) as any as S.Schema<DeleteIdentityPolicyResponse>;
export interface DeleteReceiptFilterRequest {
  FilterName: string;
}
export const DeleteReceiptFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FilterName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReceiptFilterRequest",
}) as any as S.Schema<DeleteReceiptFilterRequest>;
export interface DeleteReceiptFilterResponse {}
export const DeleteReceiptFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteReceiptFilterResponse",
}) as any as S.Schema<DeleteReceiptFilterResponse>;
export interface DeleteReceiptRuleRequest {
  RuleSetName: string;
  RuleName: string;
}
export const DeleteReceiptRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetName: S.String, RuleName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReceiptRuleRequest",
}) as any as S.Schema<DeleteReceiptRuleRequest>;
export interface DeleteReceiptRuleResponse {}
export const DeleteReceiptRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteReceiptRuleResponse",
}) as any as S.Schema<DeleteReceiptRuleResponse>;
export interface DeleteReceiptRuleSetRequest {
  RuleSetName: string;
}
export const DeleteReceiptRuleSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReceiptRuleSetRequest",
}) as any as S.Schema<DeleteReceiptRuleSetRequest>;
export interface DeleteReceiptRuleSetResponse {}
export const DeleteReceiptRuleSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteReceiptRuleSetResponse",
}) as any as S.Schema<DeleteReceiptRuleSetResponse>;
export interface DeleteTemplateRequest {
  TemplateName: string;
}
export const DeleteTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TemplateName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTemplateRequest",
}) as any as S.Schema<DeleteTemplateRequest>;
export interface DeleteTemplateResponse {}
export const DeleteTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTemplateResponse",
}) as any as S.Schema<DeleteTemplateResponse>;
export interface DeleteVerifiedEmailAddressRequest {
  EmailAddress: string;
}
export const DeleteVerifiedEmailAddressRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EmailAddress: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVerifiedEmailAddressRequest",
}) as any as S.Schema<DeleteVerifiedEmailAddressRequest>;
export interface DeleteVerifiedEmailAddressResponse {}
export const DeleteVerifiedEmailAddressResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteVerifiedEmailAddressResponse",
}) as any as S.Schema<DeleteVerifiedEmailAddressResponse>;
export interface DescribeActiveReceiptRuleSetRequest {}
export const DescribeActiveReceiptRuleSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeActiveReceiptRuleSetRequest",
}) as any as S.Schema<DescribeActiveReceiptRuleSetRequest>;
export interface ReceiptRuleSetMetadata {
  Name?: string;
  CreatedTimestamp?: Date;
}
export const ReceiptRuleSetMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ReceiptRuleSetMetadata",
}) as any as S.Schema<ReceiptRuleSetMetadata>;
export type ReceiptRulesList = ReceiptRule[];
export const ReceiptRulesList = /*@__PURE__*/ S.Array(ReceiptRule);
export interface DescribeActiveReceiptRuleSetResponse {
  Metadata?: ReceiptRuleSetMetadata;
  Rules?: ReceiptRule[];
}
export const DescribeActiveReceiptRuleSetResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Metadata: S.optional(ReceiptRuleSetMetadata),
      Rules: S.optional(ReceiptRulesList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeActiveReceiptRuleSetResponse",
}) as any as S.Schema<DescribeActiveReceiptRuleSetResponse>;
export type ConfigurationSetAttribute =
  | "eventDestinations"
  | "trackingOptions"
  | "deliveryOptions"
  | "reputationOptions"
  | (string & {});
export const ConfigurationSetAttribute = S.String;

export type ConfigurationSetAttributeList = ConfigurationSetAttribute[];
export const ConfigurationSetAttributeList = /*@__PURE__*/ S.Array(
  ConfigurationSetAttribute,
);
export interface DescribeConfigurationSetRequest {
  ConfigurationSetName: string;
  ConfigurationSetAttributeNames?: ConfigurationSetAttribute[];
}
export const DescribeConfigurationSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSetName: S.String,
    ConfigurationSetAttributeNames: S.optional(ConfigurationSetAttributeList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeConfigurationSetRequest",
}) as any as S.Schema<DescribeConfigurationSetRequest>;
export type EventDestinations = EventDestination[];
export const EventDestinations = /*@__PURE__*/ S.Array(EventDestination);
export interface DeliveryOptions {
  TlsPolicy?: TlsPolicy;
}
export const DeliveryOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TlsPolicy: S.optional(TlsPolicy) }),
).annotate({
  identifier: "DeliveryOptions",
}) as any as S.Schema<DeliveryOptions>;
export type LastFreshStart = Date;
export interface ReputationOptions {
  SendingEnabled?: boolean;
  ReputationMetricsEnabled?: boolean;
  LastFreshStart?: Date;
}
export const ReputationOptions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SendingEnabled: S.optional(S.Boolean),
    ReputationMetricsEnabled: S.optional(S.Boolean),
    LastFreshStart: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ReputationOptions",
}) as any as S.Schema<ReputationOptions>;
export interface DescribeConfigurationSetResponse {
  ConfigurationSet?: ConfigurationSet;
  EventDestinations?: EventDestination[];
  TrackingOptions?: TrackingOptions;
  DeliveryOptions?: DeliveryOptions;
  ReputationOptions?: ReputationOptions;
}
export const DescribeConfigurationSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSet: S.optional(ConfigurationSet),
    EventDestinations: S.optional(EventDestinations),
    TrackingOptions: S.optional(TrackingOptions),
    DeliveryOptions: S.optional(DeliveryOptions),
    ReputationOptions: S.optional(ReputationOptions),
  }).pipe(ns),
).annotate({
  identifier: "DescribeConfigurationSetResponse",
}) as any as S.Schema<DescribeConfigurationSetResponse>;
export interface DescribeReceiptRuleRequest {
  RuleSetName: string;
  RuleName: string;
}
export const DescribeReceiptRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetName: S.String, RuleName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReceiptRuleRequest",
}) as any as S.Schema<DescribeReceiptRuleRequest>;
export interface DescribeReceiptRuleResponse {
  Rule?: ReceiptRule;
}
export const DescribeReceiptRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Rule: S.optional(ReceiptRule) }).pipe(ns),
).annotate({
  identifier: "DescribeReceiptRuleResponse",
}) as any as S.Schema<DescribeReceiptRuleResponse>;
export interface DescribeReceiptRuleSetRequest {
  RuleSetName: string;
}
export const DescribeReceiptRuleSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReceiptRuleSetRequest",
}) as any as S.Schema<DescribeReceiptRuleSetRequest>;
export interface DescribeReceiptRuleSetResponse {
  Metadata?: ReceiptRuleSetMetadata;
  Rules?: ReceiptRule[];
}
export const DescribeReceiptRuleSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Metadata: S.optional(ReceiptRuleSetMetadata),
    Rules: S.optional(ReceiptRulesList),
  }).pipe(ns),
).annotate({
  identifier: "DescribeReceiptRuleSetResponse",
}) as any as S.Schema<DescribeReceiptRuleSetResponse>;
export interface GetAccountSendingEnabledRequest {}
export const GetAccountSendingEnabledRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountSendingEnabledRequest",
}) as any as S.Schema<GetAccountSendingEnabledRequest>;
export interface GetAccountSendingEnabledResponse {
  Enabled?: boolean;
}
export const GetAccountSendingEnabledResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }).pipe(ns),
).annotate({
  identifier: "GetAccountSendingEnabledResponse",
}) as any as S.Schema<GetAccountSendingEnabledResponse>;
export interface GetCustomVerificationEmailTemplateRequest {
  TemplateName: string;
}
export const GetCustomVerificationEmailTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ TemplateName: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetCustomVerificationEmailTemplateRequest",
  }) as any as S.Schema<GetCustomVerificationEmailTemplateRequest>;
export interface GetCustomVerificationEmailTemplateResponse {
  TemplateName?: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  TemplateContent?: string;
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export const GetCustomVerificationEmailTemplateResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TemplateName: S.optional(S.String),
      FromEmailAddress: S.optional(S.String),
      TemplateSubject: S.optional(S.String),
      TemplateContent: S.optional(S.String),
      SuccessRedirectionURL: S.optional(S.String),
      FailureRedirectionURL: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "GetCustomVerificationEmailTemplateResponse",
  }) as any as S.Schema<GetCustomVerificationEmailTemplateResponse>;
export type IdentityList = string[];
export const IdentityList = /*@__PURE__*/ S.Array(S.String);
export interface GetIdentityDkimAttributesRequest {
  Identities: string[];
}
export const GetIdentityDkimAttributesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identities: IdentityList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIdentityDkimAttributesRequest",
}) as any as S.Schema<GetIdentityDkimAttributesRequest>;
export type VerificationStatus =
  | "Pending"
  | "Success"
  | "Failed"
  | "TemporaryFailure"
  | "NotStarted"
  | (string & {});
export const VerificationStatus = S.String;

export type VerificationToken = string;
export type VerificationTokenList = string[];
export const VerificationTokenList = /*@__PURE__*/ S.Array(S.String);
export interface IdentityDkimAttributes {
  DkimEnabled: boolean;
  DkimVerificationStatus: VerificationStatus;
  DkimTokens?: string[];
}
export const IdentityDkimAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DkimEnabled: S.Boolean,
    DkimVerificationStatus: VerificationStatus,
    DkimTokens: S.optional(VerificationTokenList),
  }),
).annotate({
  identifier: "IdentityDkimAttributes",
}) as any as S.Schema<IdentityDkimAttributes>;
export type DkimAttributes = {
  [key: string]: IdentityDkimAttributes | undefined;
};
export const DkimAttributes = /*@__PURE__*/ S.Record(
  S.String,
  IdentityDkimAttributes.pipe(S.optional),
);
export interface GetIdentityDkimAttributesResponse {
  DkimAttributes: { [key: string]: IdentityDkimAttributes | undefined };
}
export const GetIdentityDkimAttributesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DkimAttributes: DkimAttributes }).pipe(ns),
).annotate({
  identifier: "GetIdentityDkimAttributesResponse",
}) as any as S.Schema<GetIdentityDkimAttributesResponse>;
export interface GetIdentityMailFromDomainAttributesRequest {
  Identities: string[];
}
export const GetIdentityMailFromDomainAttributesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Identities: IdentityList }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetIdentityMailFromDomainAttributesRequest",
  }) as any as S.Schema<GetIdentityMailFromDomainAttributesRequest>;
export type MailFromDomainName = string;
export type CustomMailFromStatus =
  | "Pending"
  | "Success"
  | "Failed"
  | "TemporaryFailure"
  | (string & {});
export const CustomMailFromStatus = S.String;

export type BehaviorOnMXFailure =
  | "UseDefaultValue"
  | "RejectMessage"
  | (string & {});
export const BehaviorOnMXFailure = S.String;

export interface IdentityMailFromDomainAttributes {
  MailFromDomain: string;
  MailFromDomainStatus: CustomMailFromStatus;
  BehaviorOnMXFailure: BehaviorOnMXFailure;
}
export const IdentityMailFromDomainAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MailFromDomain: S.String,
    MailFromDomainStatus: CustomMailFromStatus,
    BehaviorOnMXFailure: BehaviorOnMXFailure,
  }),
).annotate({
  identifier: "IdentityMailFromDomainAttributes",
}) as any as S.Schema<IdentityMailFromDomainAttributes>;
export type MailFromDomainAttributes = {
  [key: string]: IdentityMailFromDomainAttributes | undefined;
};
export const MailFromDomainAttributes = /*@__PURE__*/ S.Record(
  S.String,
  IdentityMailFromDomainAttributes.pipe(S.optional),
);
export interface GetIdentityMailFromDomainAttributesResponse {
  MailFromDomainAttributes: {
    [key: string]: IdentityMailFromDomainAttributes | undefined;
  };
}
export const GetIdentityMailFromDomainAttributesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ MailFromDomainAttributes: MailFromDomainAttributes }).pipe(ns),
  ).annotate({
    identifier: "GetIdentityMailFromDomainAttributesResponse",
  }) as any as S.Schema<GetIdentityMailFromDomainAttributesResponse>;
export interface GetIdentityNotificationAttributesRequest {
  Identities: string[];
}
export const GetIdentityNotificationAttributesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Identities: IdentityList }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetIdentityNotificationAttributesRequest",
}) as any as S.Schema<GetIdentityNotificationAttributesRequest>;
export type NotificationTopic = string;
export interface IdentityNotificationAttributes {
  BounceTopic: string;
  ComplaintTopic: string;
  DeliveryTopic: string;
  ForwardingEnabled: boolean;
  HeadersInBounceNotificationsEnabled?: boolean;
  HeadersInComplaintNotificationsEnabled?: boolean;
  HeadersInDeliveryNotificationsEnabled?: boolean;
}
export const IdentityNotificationAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BounceTopic: S.String,
    ComplaintTopic: S.String,
    DeliveryTopic: S.String,
    ForwardingEnabled: S.Boolean,
    HeadersInBounceNotificationsEnabled: S.optional(S.Boolean),
    HeadersInComplaintNotificationsEnabled: S.optional(S.Boolean),
    HeadersInDeliveryNotificationsEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "IdentityNotificationAttributes",
}) as any as S.Schema<IdentityNotificationAttributes>;
export type NotificationAttributes = {
  [key: string]: IdentityNotificationAttributes | undefined;
};
export const NotificationAttributes = /*@__PURE__*/ S.Record(
  S.String,
  IdentityNotificationAttributes.pipe(S.optional),
);
export interface GetIdentityNotificationAttributesResponse {
  NotificationAttributes: {
    [key: string]: IdentityNotificationAttributes | undefined;
  };
}
export const GetIdentityNotificationAttributesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ NotificationAttributes: NotificationAttributes }).pipe(ns),
  ).annotate({
    identifier: "GetIdentityNotificationAttributesResponse",
  }) as any as S.Schema<GetIdentityNotificationAttributesResponse>;
export type PolicyNameList = string[];
export const PolicyNameList = /*@__PURE__*/ S.Array(S.String);
export interface GetIdentityPoliciesRequest {
  Identity: string;
  PolicyNames: string[];
}
export const GetIdentityPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identity: S.String, PolicyNames: PolicyNameList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIdentityPoliciesRequest",
}) as any as S.Schema<GetIdentityPoliciesRequest>;
export type Policy = string;
export type PolicyMap = { [key: string]: string | undefined };
export const PolicyMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface GetIdentityPoliciesResponse {
  Policies: { [key: string]: string | undefined };
}
export const GetIdentityPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policies: PolicyMap }).pipe(ns),
).annotate({
  identifier: "GetIdentityPoliciesResponse",
}) as any as S.Schema<GetIdentityPoliciesResponse>;
export interface GetIdentityVerificationAttributesRequest {
  Identities: string[];
}
export const GetIdentityVerificationAttributesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Identities: IdentityList }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetIdentityVerificationAttributesRequest",
}) as any as S.Schema<GetIdentityVerificationAttributesRequest>;
export interface IdentityVerificationAttributes {
  VerificationStatus: VerificationStatus;
  VerificationToken?: string;
}
export const IdentityVerificationAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VerificationStatus: VerificationStatus,
    VerificationToken: S.optional(S.String),
  }),
).annotate({
  identifier: "IdentityVerificationAttributes",
}) as any as S.Schema<IdentityVerificationAttributes>;
export type VerificationAttributes = {
  [key: string]: IdentityVerificationAttributes | undefined;
};
export const VerificationAttributes = /*@__PURE__*/ S.Record(
  S.String,
  IdentityVerificationAttributes.pipe(S.optional),
);
export interface GetIdentityVerificationAttributesResponse {
  VerificationAttributes: {
    [key: string]: IdentityVerificationAttributes | undefined;
  };
}
export const GetIdentityVerificationAttributesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ VerificationAttributes: VerificationAttributes }).pipe(ns),
  ).annotate({
    identifier: "GetIdentityVerificationAttributesResponse",
  }) as any as S.Schema<GetIdentityVerificationAttributesResponse>;
export interface GetSendQuotaRequest {}
export const GetSendQuotaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSendQuotaRequest",
}) as any as S.Schema<GetSendQuotaRequest>;
export type Max24HourSend = number;
export type MaxSendRate = number;
export type SentLast24Hours = number;
export interface GetSendQuotaResponse {
  Max24HourSend?: number;
  MaxSendRate?: number;
  SentLast24Hours?: number;
}
export const GetSendQuotaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Max24HourSend: S.optional(S.Number),
    MaxSendRate: S.optional(S.Number),
    SentLast24Hours: S.optional(S.Number),
  }).pipe(ns),
).annotate({
  identifier: "GetSendQuotaResponse",
}) as any as S.Schema<GetSendQuotaResponse>;
export interface GetSendStatisticsRequest {}
export const GetSendStatisticsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSendStatisticsRequest",
}) as any as S.Schema<GetSendStatisticsRequest>;
export type Counter = number;
export interface SendDataPoint {
  Timestamp?: Date;
  DeliveryAttempts?: number;
  Bounces?: number;
  Complaints?: number;
  Rejects?: number;
}
export const SendDataPoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Timestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DeliveryAttempts: S.optional(S.Number),
    Bounces: S.optional(S.Number),
    Complaints: S.optional(S.Number),
    Rejects: S.optional(S.Number),
  }),
).annotate({ identifier: "SendDataPoint" }) as any as S.Schema<SendDataPoint>;
export type SendDataPointList = SendDataPoint[];
export const SendDataPointList = /*@__PURE__*/ S.Array(SendDataPoint);
export interface GetSendStatisticsResponse {
  SendDataPoints?: SendDataPoint[];
}
export const GetSendStatisticsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SendDataPoints: S.optional(SendDataPointList) }).pipe(ns),
).annotate({
  identifier: "GetSendStatisticsResponse",
}) as any as S.Schema<GetSendStatisticsResponse>;
export interface GetTemplateRequest {
  TemplateName: string;
}
export const GetTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TemplateName: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTemplateRequest",
}) as any as S.Schema<GetTemplateRequest>;
export interface GetTemplateResponse {
  Template?: Template;
}
export const GetTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Template: S.optional(Template) }).pipe(ns),
).annotate({
  identifier: "GetTemplateResponse",
}) as any as S.Schema<GetTemplateResponse>;
export type NextToken = string;
export type MaxItems = number;
export interface ListConfigurationSetsRequest {
  NextToken?: string;
  MaxItems?: number;
}
export const ListConfigurationSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxItems: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
export type ConfigurationSets = ConfigurationSet[];
export const ConfigurationSets = /*@__PURE__*/ S.Array(ConfigurationSet);
export interface ListConfigurationSetsResponse {
  ConfigurationSets?: ConfigurationSet[];
  NextToken?: string;
}
export const ListConfigurationSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfigurationSets: S.optional(ConfigurationSets),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListConfigurationSetsResponse",
}) as any as S.Schema<ListConfigurationSetsResponse>;
export type MaxResults = number;
export interface ListCustomVerificationEmailTemplatesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListCustomVerificationEmailTemplatesRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListCustomVerificationEmailTemplatesRequest",
  }) as any as S.Schema<ListCustomVerificationEmailTemplatesRequest>;
export interface CustomVerificationEmailTemplate {
  TemplateName?: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export const CustomVerificationEmailTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplateName: S.optional(S.String),
    FromEmailAddress: S.optional(S.String),
    TemplateSubject: S.optional(S.String),
    SuccessRedirectionURL: S.optional(S.String),
    FailureRedirectionURL: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomVerificationEmailTemplate",
}) as any as S.Schema<CustomVerificationEmailTemplate>;
export type CustomVerificationEmailTemplates =
  CustomVerificationEmailTemplate[];
export const CustomVerificationEmailTemplates = /*@__PURE__*/ S.Array(
  CustomVerificationEmailTemplate,
);
export interface ListCustomVerificationEmailTemplatesResponse {
  CustomVerificationEmailTemplates?: CustomVerificationEmailTemplate[];
  NextToken?: string;
}
export const ListCustomVerificationEmailTemplatesResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CustomVerificationEmailTemplates: S.optional(
        CustomVerificationEmailTemplates,
      ),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "ListCustomVerificationEmailTemplatesResponse",
  }) as any as S.Schema<ListCustomVerificationEmailTemplatesResponse>;
export type IdentityType = "EmailAddress" | "Domain" | (string & {});
export const IdentityType = S.String;

export interface ListIdentitiesRequest {
  IdentityType?: IdentityType;
  NextToken?: string;
  MaxItems?: number;
}
export const ListIdentitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IdentityType: S.optional(IdentityType),
    NextToken: S.optional(S.String),
    MaxItems: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIdentitiesRequest",
}) as any as S.Schema<ListIdentitiesRequest>;
export interface ListIdentitiesResponse {
  Identities: string[];
  NextToken?: string;
}
export const ListIdentitiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identities: IdentityList, NextToken: S.optional(S.String) }).pipe(
    ns,
  ),
).annotate({
  identifier: "ListIdentitiesResponse",
}) as any as S.Schema<ListIdentitiesResponse>;
export interface ListIdentityPoliciesRequest {
  Identity: string;
}
export const ListIdentityPoliciesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identity: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIdentityPoliciesRequest",
}) as any as S.Schema<ListIdentityPoliciesRequest>;
export interface ListIdentityPoliciesResponse {
  PolicyNames: string[];
}
export const ListIdentityPoliciesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PolicyNames: PolicyNameList }).pipe(ns),
).annotate({
  identifier: "ListIdentityPoliciesResponse",
}) as any as S.Schema<ListIdentityPoliciesResponse>;
export interface ListReceiptFiltersRequest {}
export const ListReceiptFiltersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReceiptFiltersRequest",
}) as any as S.Schema<ListReceiptFiltersRequest>;
export type ReceiptFilterList = ReceiptFilter[];
export const ReceiptFilterList = /*@__PURE__*/ S.Array(ReceiptFilter);
export interface ListReceiptFiltersResponse {
  Filters?: ReceiptFilter[];
}
export const ListReceiptFiltersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Filters: S.optional(ReceiptFilterList) }).pipe(ns),
).annotate({
  identifier: "ListReceiptFiltersResponse",
}) as any as S.Schema<ListReceiptFiltersResponse>;
export interface ListReceiptRuleSetsRequest {
  NextToken?: string;
}
export const ListReceiptRuleSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReceiptRuleSetsRequest",
}) as any as S.Schema<ListReceiptRuleSetsRequest>;
export type ReceiptRuleSetsLists = ReceiptRuleSetMetadata[];
export const ReceiptRuleSetsLists = /*@__PURE__*/ S.Array(
  ReceiptRuleSetMetadata,
);
export interface ListReceiptRuleSetsResponse {
  RuleSets?: ReceiptRuleSetMetadata[];
  NextToken?: string;
}
export const ListReceiptRuleSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleSets: S.optional(ReceiptRuleSetsLists),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListReceiptRuleSetsResponse",
}) as any as S.Schema<ListReceiptRuleSetsResponse>;
export interface ListTemplatesRequest {
  NextToken?: string;
  MaxItems?: number;
}
export const ListTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxItems: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
export interface TemplateMetadata {
  Name?: string;
  CreatedTimestamp?: Date;
}
export const TemplateMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "TemplateMetadata",
}) as any as S.Schema<TemplateMetadata>;
export type TemplateMetadataList = TemplateMetadata[];
export const TemplateMetadataList = /*@__PURE__*/ S.Array(TemplateMetadata);
export interface ListTemplatesResponse {
  TemplatesMetadata?: TemplateMetadata[];
  NextToken?: string;
}
export const ListTemplatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemplatesMetadata: S.optional(TemplateMetadataList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListTemplatesResponse",
}) as any as S.Schema<ListTemplatesResponse>;
export interface ListVerifiedEmailAddressesRequest {}
export const ListVerifiedEmailAddressesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVerifiedEmailAddressesRequest",
}) as any as S.Schema<ListVerifiedEmailAddressesRequest>;
export type AddressList = string[];
export const AddressList = /*@__PURE__*/ S.Array(S.String);
export interface ListVerifiedEmailAddressesResponse {
  VerifiedEmailAddresses?: string[];
}
export const ListVerifiedEmailAddressesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VerifiedEmailAddresses: S.optional(AddressList) }).pipe(ns),
).annotate({
  identifier: "ListVerifiedEmailAddressesResponse",
}) as any as S.Schema<ListVerifiedEmailAddressesResponse>;
export interface PutConfigurationSetDeliveryOptionsRequest {
  ConfigurationSetName: string;
  DeliveryOptions?: DeliveryOptions;
}
export const PutConfigurationSetDeliveryOptionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String,
      DeliveryOptions: S.optional(DeliveryOptions),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
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
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "PutConfigurationSetDeliveryOptionsResponse",
  }) as any as S.Schema<PutConfigurationSetDeliveryOptionsResponse>;
export interface PutIdentityPolicyRequest {
  Identity: string;
  PolicyName: string;
  Policy: string;
}
export const PutIdentityPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identity: S.String, PolicyName: S.String, Policy: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutIdentityPolicyRequest",
}) as any as S.Schema<PutIdentityPolicyRequest>;
export interface PutIdentityPolicyResponse {}
export const PutIdentityPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutIdentityPolicyResponse",
}) as any as S.Schema<PutIdentityPolicyResponse>;
export type ReceiptRuleNamesList = string[];
export const ReceiptRuleNamesList = /*@__PURE__*/ S.Array(S.String);
export interface ReorderReceiptRuleSetRequest {
  RuleSetName: string;
  RuleNames: string[];
}
export const ReorderReceiptRuleSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetName: S.String, RuleNames: ReceiptRuleNamesList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ReorderReceiptRuleSetRequest",
}) as any as S.Schema<ReorderReceiptRuleSetRequest>;
export interface ReorderReceiptRuleSetResponse {}
export const ReorderReceiptRuleSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "ReorderReceiptRuleSetResponse",
}) as any as S.Schema<ReorderReceiptRuleSetResponse>;
export type MessageId = string;
export type Explanation = string;
export type ReportingMta = string;
export type ArrivalDate = Date;
export type ExtensionFieldName = string;
export type ExtensionFieldValue = string;
export interface ExtensionField {
  Name: string;
  Value: string;
}
export const ExtensionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String, Value: S.String }),
).annotate({ identifier: "ExtensionField" }) as any as S.Schema<ExtensionField>;
export type ExtensionFieldList = ExtensionField[];
export const ExtensionFieldList = /*@__PURE__*/ S.Array(ExtensionField);
export interface MessageDsn {
  ReportingMta: string;
  ArrivalDate?: Date;
  ExtensionFields?: ExtensionField[];
}
export const MessageDsn = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ReportingMta: S.String,
    ArrivalDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExtensionFields: S.optional(ExtensionFieldList),
  }),
).annotate({ identifier: "MessageDsn" }) as any as S.Schema<MessageDsn>;
export type BounceType =
  | "DoesNotExist"
  | "MessageTooLarge"
  | "ExceededQuota"
  | "ContentRejected"
  | "Undefined"
  | "TemporaryFailure"
  | (string & {});
export const BounceType = S.String;

export type DsnAction =
  | "failed"
  | "delayed"
  | "delivered"
  | "relayed"
  | "expanded"
  | (string & {});
export const DsnAction = S.String;

export type RemoteMta = string;
export type DsnStatus = string;
export type DiagnosticCode = string;
export type LastAttemptDate = Date;
export interface RecipientDsnFields {
  FinalRecipient?: string;
  Action: DsnAction;
  RemoteMta?: string;
  Status: string;
  DiagnosticCode?: string;
  LastAttemptDate?: Date;
  ExtensionFields?: ExtensionField[];
}
export const RecipientDsnFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FinalRecipient: S.optional(S.String),
    Action: DsnAction,
    RemoteMta: S.optional(S.String),
    Status: S.String,
    DiagnosticCode: S.optional(S.String),
    LastAttemptDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ExtensionFields: S.optional(ExtensionFieldList),
  }),
).annotate({
  identifier: "RecipientDsnFields",
}) as any as S.Schema<RecipientDsnFields>;
export interface BouncedRecipientInfo {
  Recipient: string;
  RecipientArn?: string;
  BounceType?: BounceType;
  RecipientDsnFields?: RecipientDsnFields;
}
export const BouncedRecipientInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Recipient: S.String,
    RecipientArn: S.optional(S.String),
    BounceType: S.optional(BounceType),
    RecipientDsnFields: S.optional(RecipientDsnFields),
  }),
).annotate({
  identifier: "BouncedRecipientInfo",
}) as any as S.Schema<BouncedRecipientInfo>;
export type BouncedRecipientInfoList = BouncedRecipientInfo[];
export const BouncedRecipientInfoList =
  /*@__PURE__*/ S.Array(BouncedRecipientInfo);
export interface SendBounceRequest {
  OriginalMessageId: string;
  BounceSender: string;
  Explanation?: string;
  MessageDsn?: MessageDsn;
  BouncedRecipientInfoList: BouncedRecipientInfo[];
  BounceSenderArn?: string;
}
export const SendBounceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OriginalMessageId: S.String,
    BounceSender: S.String,
    Explanation: S.optional(S.String),
    MessageDsn: S.optional(MessageDsn),
    BouncedRecipientInfoList: BouncedRecipientInfoList,
    BounceSenderArn: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendBounceRequest",
}) as any as S.Schema<SendBounceRequest>;
export interface SendBounceResponse {
  MessageId?: string;
}
export const SendBounceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "SendBounceResponse",
}) as any as S.Schema<SendBounceResponse>;
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
export type TemplateData = string;
export interface Destination {
  ToAddresses?: string[];
  CcAddresses?: string[];
  BccAddresses?: string[];
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ToAddresses: S.optional(AddressList),
    CcAddresses: S.optional(AddressList),
    BccAddresses: S.optional(AddressList),
  }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export interface BulkEmailDestination {
  Destination: Destination;
  ReplacementTags?: MessageTag[];
  ReplacementTemplateData?: string;
}
export const BulkEmailDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: Destination,
    ReplacementTags: S.optional(MessageTagList),
    ReplacementTemplateData: S.optional(S.String),
  }),
).annotate({
  identifier: "BulkEmailDestination",
}) as any as S.Schema<BulkEmailDestination>;
export type BulkEmailDestinationList = BulkEmailDestination[];
export const BulkEmailDestinationList =
  /*@__PURE__*/ S.Array(BulkEmailDestination);
export interface SendBulkTemplatedEmailRequest {
  Source: string;
  SourceArn?: string;
  ReplyToAddresses?: string[];
  ReturnPath?: string;
  ReturnPathArn?: string;
  ConfigurationSetName?: string;
  DefaultTags?: MessageTag[];
  Template: string;
  TemplateArn?: string;
  DefaultTemplateData: string;
  Destinations: BulkEmailDestination[];
}
export const SendBulkTemplatedEmailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Source: S.String,
    SourceArn: S.optional(S.String),
    ReplyToAddresses: S.optional(AddressList),
    ReturnPath: S.optional(S.String),
    ReturnPathArn: S.optional(S.String),
    ConfigurationSetName: S.optional(S.String),
    DefaultTags: S.optional(MessageTagList),
    Template: S.String,
    TemplateArn: S.optional(S.String),
    DefaultTemplateData: S.String,
    Destinations: BulkEmailDestinationList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendBulkTemplatedEmailRequest",
}) as any as S.Schema<SendBulkTemplatedEmailRequest>;
export type BulkEmailStatus =
  | "Success"
  | "MessageRejected"
  | "MailFromDomainNotVerified"
  | "ConfigurationSetDoesNotExist"
  | "TemplateDoesNotExist"
  | "AccountSuspended"
  | "AccountThrottled"
  | "AccountDailyQuotaExceeded"
  | "InvalidSendingPoolName"
  | "AccountSendingPaused"
  | "ConfigurationSetSendingPaused"
  | "InvalidParameterValue"
  | "TransientFailure"
  | "Failed"
  | (string & {});
export const BulkEmailStatus = S.String;

export interface BulkEmailDestinationStatus {
  Status?: BulkEmailStatus;
  Error?: string;
  MessageId?: string;
}
export const BulkEmailDestinationStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(BulkEmailStatus),
    Error: S.optional(S.String),
    MessageId: S.optional(S.String),
  }),
).annotate({
  identifier: "BulkEmailDestinationStatus",
}) as any as S.Schema<BulkEmailDestinationStatus>;
export type BulkEmailDestinationStatusList = BulkEmailDestinationStatus[];
export const BulkEmailDestinationStatusList = /*@__PURE__*/ S.Array(
  BulkEmailDestinationStatus,
);
export interface SendBulkTemplatedEmailResponse {
  Status: BulkEmailDestinationStatus[];
}
export const SendBulkTemplatedEmailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Status: BulkEmailDestinationStatusList }).pipe(ns),
).annotate({
  identifier: "SendBulkTemplatedEmailResponse",
}) as any as S.Schema<SendBulkTemplatedEmailResponse>;
export interface SendCustomVerificationEmailRequest {
  EmailAddress: string;
  TemplateName: string;
  ConfigurationSetName?: string;
}
export const SendCustomVerificationEmailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EmailAddress: S.String,
    TemplateName: S.String,
    ConfigurationSetName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendCustomVerificationEmailRequest",
}) as any as S.Schema<SendCustomVerificationEmailRequest>;
export interface SendCustomVerificationEmailResponse {
  MessageId?: string;
}
export const SendCustomVerificationEmailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "SendCustomVerificationEmailResponse",
}) as any as S.Schema<SendCustomVerificationEmailResponse>;
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
export interface SendEmailRequest {
  Source: string;
  Destination: Destination;
  Message: Message;
  ReplyToAddresses?: string[];
  ReturnPath?: string;
  SourceArn?: string;
  ReturnPathArn?: string;
  Tags?: MessageTag[];
  ConfigurationSetName?: string;
}
export const SendEmailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Source: S.String,
    Destination: Destination,
    Message: Message,
    ReplyToAddresses: S.optional(AddressList),
    ReturnPath: S.optional(S.String),
    SourceArn: S.optional(S.String),
    ReturnPathArn: S.optional(S.String),
    Tags: S.optional(MessageTagList),
    ConfigurationSetName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
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
export interface SendEmailResponse {
  MessageId: string;
}
export const SendEmailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.String }).pipe(ns),
).annotate({
  identifier: "SendEmailResponse",
}) as any as S.Schema<SendEmailResponse>;
export type RawMessageData = Uint8Array;
export interface RawMessage {
  Data: Uint8Array;
}
export const RawMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Data: T.Blob }),
).annotate({ identifier: "RawMessage" }) as any as S.Schema<RawMessage>;
export interface SendRawEmailRequest {
  Source?: string;
  Destinations?: string[];
  RawMessage: RawMessage;
  FromArn?: string;
  SourceArn?: string;
  ReturnPathArn?: string;
  Tags?: MessageTag[];
  ConfigurationSetName?: string;
}
export const SendRawEmailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Source: S.optional(S.String),
    Destinations: S.optional(AddressList),
    RawMessage: RawMessage,
    FromArn: S.optional(S.String),
    SourceArn: S.optional(S.String),
    ReturnPathArn: S.optional(S.String),
    Tags: S.optional(MessageTagList),
    ConfigurationSetName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendRawEmailRequest",
}) as any as S.Schema<SendRawEmailRequest>;
export interface SendRawEmailResponse {
  MessageId: string;
}
export const SendRawEmailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.String }).pipe(ns),
).annotate({
  identifier: "SendRawEmailResponse",
}) as any as S.Schema<SendRawEmailResponse>;
export interface SendTemplatedEmailRequest {
  Source: string;
  Destination: Destination;
  ReplyToAddresses?: string[];
  ReturnPath?: string;
  SourceArn?: string;
  ReturnPathArn?: string;
  Tags?: MessageTag[];
  ConfigurationSetName?: string;
  Template: string;
  TemplateArn?: string;
  TemplateData: string;
}
export const SendTemplatedEmailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Source: S.String,
    Destination: Destination,
    ReplyToAddresses: S.optional(AddressList),
    ReturnPath: S.optional(S.String),
    SourceArn: S.optional(S.String),
    ReturnPathArn: S.optional(S.String),
    Tags: S.optional(MessageTagList),
    ConfigurationSetName: S.optional(S.String),
    Template: S.String,
    TemplateArn: S.optional(S.String),
    TemplateData: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SendTemplatedEmailRequest",
}) as any as S.Schema<SendTemplatedEmailRequest>;
export interface SendTemplatedEmailResponse {
  MessageId: string;
}
export const SendTemplatedEmailResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageId: S.String }).pipe(ns),
).annotate({
  identifier: "SendTemplatedEmailResponse",
}) as any as S.Schema<SendTemplatedEmailResponse>;
export interface SetActiveReceiptRuleSetRequest {
  RuleSetName?: string;
}
export const SetActiveReceiptRuleSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetName: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetActiveReceiptRuleSetRequest",
}) as any as S.Schema<SetActiveReceiptRuleSetRequest>;
export interface SetActiveReceiptRuleSetResponse {}
export const SetActiveReceiptRuleSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetActiveReceiptRuleSetResponse",
}) as any as S.Schema<SetActiveReceiptRuleSetResponse>;
export interface SetIdentityDkimEnabledRequest {
  Identity: string;
  DkimEnabled: boolean;
}
export const SetIdentityDkimEnabledRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identity: S.String, DkimEnabled: S.Boolean }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetIdentityDkimEnabledRequest",
}) as any as S.Schema<SetIdentityDkimEnabledRequest>;
export interface SetIdentityDkimEnabledResponse {}
export const SetIdentityDkimEnabledResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetIdentityDkimEnabledResponse",
}) as any as S.Schema<SetIdentityDkimEnabledResponse>;
export interface SetIdentityFeedbackForwardingEnabledRequest {
  Identity: string;
  ForwardingEnabled: boolean;
}
export const SetIdentityFeedbackForwardingEnabledRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Identity: S.String, ForwardingEnabled: S.Boolean }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "SetIdentityFeedbackForwardingEnabledRequest",
  }) as any as S.Schema<SetIdentityFeedbackForwardingEnabledRequest>;
export interface SetIdentityFeedbackForwardingEnabledResponse {}
export const SetIdentityFeedbackForwardingEnabledResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "SetIdentityFeedbackForwardingEnabledResponse",
  }) as any as S.Schema<SetIdentityFeedbackForwardingEnabledResponse>;
export type NotificationType =
  | "Bounce"
  | "Complaint"
  | "Delivery"
  | (string & {});
export const NotificationType = S.String;

export interface SetIdentityHeadersInNotificationsEnabledRequest {
  Identity: string;
  NotificationType: NotificationType;
  Enabled: boolean;
}
export const SetIdentityHeadersInNotificationsEnabledRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Identity: S.String,
      NotificationType: NotificationType,
      Enabled: S.Boolean,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "SetIdentityHeadersInNotificationsEnabledRequest",
  }) as any as S.Schema<SetIdentityHeadersInNotificationsEnabledRequest>;
export interface SetIdentityHeadersInNotificationsEnabledResponse {}
export const SetIdentityHeadersInNotificationsEnabledResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "SetIdentityHeadersInNotificationsEnabledResponse",
  }) as any as S.Schema<SetIdentityHeadersInNotificationsEnabledResponse>;
export interface SetIdentityMailFromDomainRequest {
  Identity: string;
  MailFromDomain?: string;
  BehaviorOnMXFailure?: BehaviorOnMXFailure;
}
export const SetIdentityMailFromDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identity: S.String,
    MailFromDomain: S.optional(S.String),
    BehaviorOnMXFailure: S.optional(BehaviorOnMXFailure),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetIdentityMailFromDomainRequest",
}) as any as S.Schema<SetIdentityMailFromDomainRequest>;
export interface SetIdentityMailFromDomainResponse {}
export const SetIdentityMailFromDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetIdentityMailFromDomainResponse",
}) as any as S.Schema<SetIdentityMailFromDomainResponse>;
export interface SetIdentityNotificationTopicRequest {
  Identity: string;
  NotificationType: NotificationType;
  SnsTopic?: string;
}
export const SetIdentityNotificationTopicRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identity: S.String,
    NotificationType: NotificationType,
    SnsTopic: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetIdentityNotificationTopicRequest",
}) as any as S.Schema<SetIdentityNotificationTopicRequest>;
export interface SetIdentityNotificationTopicResponse {}
export const SetIdentityNotificationTopicResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetIdentityNotificationTopicResponse",
}) as any as S.Schema<SetIdentityNotificationTopicResponse>;
export interface SetReceiptRulePositionRequest {
  RuleSetName: string;
  RuleName: string;
  After?: string;
}
export const SetReceiptRulePositionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleSetName: S.String,
    RuleName: S.String,
    After: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SetReceiptRulePositionRequest",
}) as any as S.Schema<SetReceiptRulePositionRequest>;
export interface SetReceiptRulePositionResponse {}
export const SetReceiptRulePositionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "SetReceiptRulePositionResponse",
}) as any as S.Schema<SetReceiptRulePositionResponse>;
export interface TestRenderTemplateRequest {
  TemplateName: string;
  TemplateData: string;
}
export const TestRenderTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TemplateName: S.String, TemplateData: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TestRenderTemplateRequest",
}) as any as S.Schema<TestRenderTemplateRequest>;
export type RenderedTemplate = string;
export interface TestRenderTemplateResponse {
  RenderedTemplate?: string;
}
export const TestRenderTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RenderedTemplate: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "TestRenderTemplateResponse",
}) as any as S.Schema<TestRenderTemplateResponse>;
export interface UpdateAccountSendingEnabledRequest {
  Enabled?: boolean;
}
export const UpdateAccountSendingEnabledRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccountSendingEnabledRequest",
}) as any as S.Schema<UpdateAccountSendingEnabledRequest>;
export interface UpdateAccountSendingEnabledResponse {}
export const UpdateAccountSendingEnabledResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateAccountSendingEnabledResponse",
}) as any as S.Schema<UpdateAccountSendingEnabledResponse>;
export interface UpdateConfigurationSetEventDestinationRequest {
  ConfigurationSetName: string;
  EventDestination: EventDestination;
}
export const UpdateConfigurationSetEventDestinationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String,
      EventDestination: EventDestination,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
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
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "UpdateConfigurationSetEventDestinationResponse",
  }) as any as S.Schema<UpdateConfigurationSetEventDestinationResponse>;
export interface UpdateConfigurationSetReputationMetricsEnabledRequest {
  ConfigurationSetName: string;
  Enabled: boolean;
}
export const UpdateConfigurationSetReputationMetricsEnabledRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ConfigurationSetName: S.String, Enabled: S.Boolean }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateConfigurationSetReputationMetricsEnabledRequest",
  }) as any as S.Schema<UpdateConfigurationSetReputationMetricsEnabledRequest>;
export interface UpdateConfigurationSetReputationMetricsEnabledResponse {}
export const UpdateConfigurationSetReputationMetricsEnabledResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "UpdateConfigurationSetReputationMetricsEnabledResponse",
  }) as any as S.Schema<UpdateConfigurationSetReputationMetricsEnabledResponse>;
export interface UpdateConfigurationSetSendingEnabledRequest {
  ConfigurationSetName: string;
  Enabled: boolean;
}
export const UpdateConfigurationSetSendingEnabledRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ConfigurationSetName: S.String, Enabled: S.Boolean }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateConfigurationSetSendingEnabledRequest",
  }) as any as S.Schema<UpdateConfigurationSetSendingEnabledRequest>;
export interface UpdateConfigurationSetSendingEnabledResponse {}
export const UpdateConfigurationSetSendingEnabledResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "UpdateConfigurationSetSendingEnabledResponse",
  }) as any as S.Schema<UpdateConfigurationSetSendingEnabledResponse>;
export interface UpdateConfigurationSetTrackingOptionsRequest {
  ConfigurationSetName: string;
  TrackingOptions: TrackingOptions;
}
export const UpdateConfigurationSetTrackingOptionsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ConfigurationSetName: S.String,
      TrackingOptions: TrackingOptions,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateConfigurationSetTrackingOptionsRequest",
  }) as any as S.Schema<UpdateConfigurationSetTrackingOptionsRequest>;
export interface UpdateConfigurationSetTrackingOptionsResponse {}
export const UpdateConfigurationSetTrackingOptionsResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "UpdateConfigurationSetTrackingOptionsResponse",
  }) as any as S.Schema<UpdateConfigurationSetTrackingOptionsResponse>;
export interface UpdateCustomVerificationEmailTemplateRequest {
  TemplateName: string;
  FromEmailAddress?: string;
  TemplateSubject?: string;
  TemplateContent?: string;
  SuccessRedirectionURL?: string;
  FailureRedirectionURL?: string;
}
export const UpdateCustomVerificationEmailTemplateRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      TemplateName: S.String,
      FromEmailAddress: S.optional(S.String),
      TemplateSubject: S.optional(S.String),
      TemplateContent: S.optional(S.String),
      SuccessRedirectionURL: S.optional(S.String),
      FailureRedirectionURL: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateCustomVerificationEmailTemplateRequest",
  }) as any as S.Schema<UpdateCustomVerificationEmailTemplateRequest>;
export interface UpdateCustomVerificationEmailTemplateResponse {}
export const UpdateCustomVerificationEmailTemplateResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({}).pipe(ns)).annotate({
    identifier: "UpdateCustomVerificationEmailTemplateResponse",
  }) as any as S.Schema<UpdateCustomVerificationEmailTemplateResponse>;
export interface UpdateReceiptRuleRequest {
  RuleSetName: string;
  Rule: ReceiptRule;
}
export const UpdateReceiptRuleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleSetName: S.String, Rule: ReceiptRule }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateReceiptRuleRequest",
}) as any as S.Schema<UpdateReceiptRuleRequest>;
export interface UpdateReceiptRuleResponse {}
export const UpdateReceiptRuleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateReceiptRuleResponse",
}) as any as S.Schema<UpdateReceiptRuleResponse>;
export interface UpdateTemplateRequest {
  Template: Template;
}
export const UpdateTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Template: Template }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTemplateRequest",
}) as any as S.Schema<UpdateTemplateRequest>;
export interface UpdateTemplateResponse {}
export const UpdateTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateTemplateResponse",
}) as any as S.Schema<UpdateTemplateResponse>;
export type Domain = string;
export interface VerifyDomainDkimRequest {
  Domain: string;
}
export const VerifyDomainDkimRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Domain: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "VerifyDomainDkimRequest",
}) as any as S.Schema<VerifyDomainDkimRequest>;
export interface VerifyDomainDkimResponse {
  DkimTokens: string[];
}
export const VerifyDomainDkimResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DkimTokens: VerificationTokenList }).pipe(ns),
).annotate({
  identifier: "VerifyDomainDkimResponse",
}) as any as S.Schema<VerifyDomainDkimResponse>;
export interface VerifyDomainIdentityRequest {
  Domain: string;
}
export const VerifyDomainIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Domain: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "VerifyDomainIdentityRequest",
}) as any as S.Schema<VerifyDomainIdentityRequest>;
export interface VerifyDomainIdentityResponse {
  VerificationToken: string;
}
export const VerifyDomainIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VerificationToken: S.String }).pipe(ns),
).annotate({
  identifier: "VerifyDomainIdentityResponse",
}) as any as S.Schema<VerifyDomainIdentityResponse>;
export interface VerifyEmailAddressRequest {
  EmailAddress: string;
}
export const VerifyEmailAddressRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EmailAddress: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "VerifyEmailAddressRequest",
}) as any as S.Schema<VerifyEmailAddressRequest>;
export interface VerifyEmailAddressResponse {}
export const VerifyEmailAddressResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "VerifyEmailAddressResponse",
}) as any as S.Schema<VerifyEmailAddressResponse>;
export interface VerifyEmailIdentityRequest {
  EmailAddress: string;
}
export const VerifyEmailIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EmailAddress: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "VerifyEmailIdentityRequest",
}) as any as S.Schema<VerifyEmailIdentityRequest>;
export interface VerifyEmailIdentityResponse {}
export const VerifyEmailIdentityResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "VerifyEmailIdentityResponse",
}) as any as S.Schema<VerifyEmailIdentityResponse>;
export type RuleOrRuleSetName = string;
export type ErrorMessage = string;
export type CloneReceiptRuleSetError =
  | AlreadyExistsException
  | LimitExceededException
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Creates a receipt rule set by cloning an existing one. All receipt rules and
 * configurations are copied to the new receipt rule set and are completely independent of
 * the source rule set.
 *
 * For information about setting up rule sets, see the Amazon SES Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const cloneReceiptRuleSet: API.OperationMethod<
  CloneReceiptRuleSetRequest,
  CloneReceiptRuleSetResponse,
  CloneReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CloneReceiptRuleSetRequest,
  output: CloneReceiptRuleSetResponse,
  errors: [
    AlreadyExistsException,
    LimitExceededException,
    RuleSetDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CloneReceiptRuleSet",
}));

export type CreateConfigurationSetError =
  | ConfigurationSetAlreadyExistsException
  | InvalidConfigurationSetException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a configuration set.
 *
 * Configuration sets enable you to publish email sending events. For information about
 * using configuration sets, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
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
    ConfigurationSetAlreadyExistsException,
    InvalidConfigurationSetException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSet",
}));

export type CreateConfigurationSetEventDestinationError =
  | ConfigurationSetDoesNotExistException
  | EventDestinationAlreadyExistsException
  | InvalidCloudWatchDestinationException
  | InvalidFirehoseDestinationException
  | InvalidSNSDestinationException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a configuration set event destination.
 *
 * When you create or update an event destination, you must provide one, and only
 * one, destination. The destination can be CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service (Amazon SNS).
 *
 * An event destination is the Amazon Web Services service to which Amazon SES publishes the email sending
 * events associated with a configuration set. For information about using configuration
 * sets, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
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
    ConfigurationSetDoesNotExistException,
    EventDestinationAlreadyExistsException,
    InvalidCloudWatchDestinationException,
    InvalidFirehoseDestinationException,
    InvalidSNSDestinationException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSetEventDestination",
}));

export type CreateConfigurationSetTrackingOptionsError =
  | ConfigurationSetDoesNotExistException
  | InvalidTrackingOptionsException
  | TrackingOptionsAlreadyExistsException
  | CommonErrors;
/**
 * Creates an association between a configuration set and a custom domain for open and
 * click event tracking.
 *
 * By default, images and links used for tracking open and click events are hosted on
 * domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 * events. For information about using custom domains, see the Amazon SES Developer Guide.
 */
export const createConfigurationSetTrackingOptions: API.OperationMethod<
  CreateConfigurationSetTrackingOptionsRequest,
  CreateConfigurationSetTrackingOptionsResponse,
  CreateConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateConfigurationSetTrackingOptionsRequest,
  output: CreateConfigurationSetTrackingOptionsResponse,
  errors: [
    ConfigurationSetDoesNotExistException,
    InvalidTrackingOptionsException,
    TrackingOptionsAlreadyExistsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateConfigurationSetTrackingOptions",
}));

export type CreateCustomVerificationEmailTemplateError =
  | CustomVerificationEmailInvalidContentException
  | CustomVerificationEmailTemplateAlreadyExistsException
  | FromEmailAddressNotVerifiedException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createCustomVerificationEmailTemplate: API.OperationMethod<
  CreateCustomVerificationEmailTemplateRequest,
  CreateCustomVerificationEmailTemplateResponse,
  CreateCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomVerificationEmailTemplateRequest,
  output: CreateCustomVerificationEmailTemplateResponse,
  errors: [
    CustomVerificationEmailInvalidContentException,
    CustomVerificationEmailTemplateAlreadyExistsException,
    FromEmailAddressNotVerifiedException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomVerificationEmailTemplate",
}));

export type CreateReceiptFilterError =
  | AlreadyExistsException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new IP address filter.
 *
 * For information about setting up IP address filters, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createReceiptFilter: API.OperationMethod<
  CreateReceiptFilterRequest,
  CreateReceiptFilterResponse,
  CreateReceiptFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReceiptFilterRequest,
  output: CreateReceiptFilterResponse,
  errors: [AlreadyExistsException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReceiptFilter",
}));

export type CreateReceiptRuleError =
  | AlreadyExistsException
  | InvalidLambdaFunctionException
  | InvalidS3ConfigurationException
  | InvalidSnsTopicException
  | LimitExceededException
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | InvalidParameterValue
  | IdentityNotVerified
  | CommonErrors;
/**
 * Creates a receipt rule.
 *
 * For information about setting up receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createReceiptRule: API.OperationMethod<
  CreateReceiptRuleRequest,
  CreateReceiptRuleResponse,
  CreateReceiptRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReceiptRuleRequest,
  output: CreateReceiptRuleResponse,
  errors: [
    AlreadyExistsException,
    InvalidLambdaFunctionException,
    InvalidS3ConfigurationException,
    InvalidSnsTopicException,
    LimitExceededException,
    RuleDoesNotExistException,
    RuleSetDoesNotExistException,
    InvalidParameterValue,
    IdentityNotVerified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReceiptRule",
}));

export type CreateReceiptRuleSetError =
  | AlreadyExistsException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates an empty receipt rule set.
 *
 * For information about setting up receipt rule sets, see the Amazon SES Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createReceiptRuleSet: API.OperationMethod<
  CreateReceiptRuleSetRequest,
  CreateReceiptRuleSetResponse,
  CreateReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateReceiptRuleSetRequest,
  output: CreateReceiptRuleSetResponse,
  errors: [AlreadyExistsException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateReceiptRuleSet",
}));

export type CreateTemplateError =
  | AlreadyExistsException
  | InvalidTemplateException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates an email template. Email templates enable you to send personalized email to
 * one or more destinations in a single operation. For more information, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const createTemplate: API.OperationMethod<
  CreateTemplateRequest,
  CreateTemplateResponse,
  CreateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTemplateRequest,
  output: CreateTemplateResponse,
  errors: [
    AlreadyExistsException,
    InvalidTemplateException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTemplate",
}));

export type DeleteConfigurationSetError =
  | ConfigurationSetDoesNotExistException
  | CommonErrors;
/**
 * Deletes a configuration set. Configuration sets enable you to publish email sending
 * events. For information about using configuration sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteConfigurationSet: API.OperationMethod<
  DeleteConfigurationSetRequest,
  DeleteConfigurationSetResponse,
  DeleteConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationSetRequest,
  output: DeleteConfigurationSetResponse,
  errors: [ConfigurationSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSet",
}));

export type DeleteConfigurationSetEventDestinationError =
  | ConfigurationSetDoesNotExistException
  | EventDestinationDoesNotExistException
  | CommonErrors;
/**
 * Deletes a configuration set event destination. Configuration set event destinations
 * are associated with configuration sets, which enable you to publish email sending
 * events. For information about using configuration sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteConfigurationSetEventDestination: API.OperationMethod<
  DeleteConfigurationSetEventDestinationRequest,
  DeleteConfigurationSetEventDestinationResponse,
  DeleteConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationSetEventDestinationRequest,
  output: DeleteConfigurationSetEventDestinationResponse,
  errors: [
    ConfigurationSetDoesNotExistException,
    EventDestinationDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetEventDestination",
}));

export type DeleteConfigurationSetTrackingOptionsError =
  | ConfigurationSetDoesNotExistException
  | TrackingOptionsDoesNotExistException
  | CommonErrors;
/**
 * Deletes an association between a configuration set and a custom domain for open and
 * click event tracking.
 *
 * By default, images and links used for tracking open and click events are hosted on
 * domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 * events. For information about using custom domains, see the Amazon SES Developer Guide.
 *
 * Deleting this kind of association results in emails sent using the specified
 * configuration set to capture open and click events using the standard,
 * Amazon SES-operated domains.
 */
export const deleteConfigurationSetTrackingOptions: API.OperationMethod<
  DeleteConfigurationSetTrackingOptionsRequest,
  DeleteConfigurationSetTrackingOptionsResponse,
  DeleteConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteConfigurationSetTrackingOptionsRequest,
  output: DeleteConfigurationSetTrackingOptionsResponse,
  errors: [
    ConfigurationSetDoesNotExistException,
    TrackingOptionsDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteConfigurationSetTrackingOptions",
}));

export type DeleteCustomVerificationEmailTemplateError = CommonErrors;
/**
 * Deletes an existing custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteCustomVerificationEmailTemplate: API.OperationMethod<
  DeleteCustomVerificationEmailTemplateRequest,
  DeleteCustomVerificationEmailTemplateResponse,
  DeleteCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomVerificationEmailTemplateRequest,
  output: DeleteCustomVerificationEmailTemplateResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomVerificationEmailTemplate",
}));

export type DeleteIdentityError = CommonErrors;
/**
 * Deletes the specified identity (an email address or a domain) from the list of
 * verified identities.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteIdentity: API.OperationMethod<
  DeleteIdentityRequest,
  DeleteIdentityResponse,
  DeleteIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIdentityRequest,
  output: DeleteIdentityResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentity",
}));

export type DeleteIdentityPolicyError = CommonErrors;
/**
 * Deletes the specified sending authorization policy for the given identity (an email
 * address or a domain). This operation returns successfully even if a policy with the
 * specified name does not exist.
 *
 * This operation is for the identity owner only. If you have not verified the
 * identity, it returns an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteIdentityPolicy: API.OperationMethod<
  DeleteIdentityPolicyRequest,
  DeleteIdentityPolicyResponse,
  DeleteIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIdentityPolicyRequest,
  output: DeleteIdentityPolicyResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdentityPolicy",
}));

export type DeleteReceiptFilterError = CommonErrors;
/**
 * Deletes the specified IP address filter.
 *
 * For information about managing IP address filters, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteReceiptFilter: API.OperationMethod<
  DeleteReceiptFilterRequest,
  DeleteReceiptFilterResponse,
  DeleteReceiptFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReceiptFilterRequest,
  output: DeleteReceiptFilterResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReceiptFilter",
}));

export type DeleteReceiptRuleError =
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Deletes the specified receipt rule.
 *
 * For information about managing receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteReceiptRule: API.OperationMethod<
  DeleteReceiptRuleRequest,
  DeleteReceiptRuleResponse,
  DeleteReceiptRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReceiptRuleRequest,
  output: DeleteReceiptRuleResponse,
  errors: [RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReceiptRule",
}));

export type DeleteReceiptRuleSetError = CannotDeleteException | CommonErrors;
/**
 * Deletes the specified receipt rule set and all of the receipt rules it
 * contains.
 *
 * The currently active rule set cannot be deleted.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteReceiptRuleSet: API.OperationMethod<
  DeleteReceiptRuleSetRequest,
  DeleteReceiptRuleSetResponse,
  DeleteReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReceiptRuleSetRequest,
  output: DeleteReceiptRuleSetResponse,
  errors: [CannotDeleteException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReceiptRuleSet",
}));

export type DeleteTemplateError = CommonErrors;
/**
 * Deletes an email template.
 *
 * You can execute this operation no more than once per second.
 */
export const deleteTemplate: API.OperationMethod<
  DeleteTemplateRequest,
  DeleteTemplateResponse,
  DeleteTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTemplateRequest,
  output: DeleteTemplateResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTemplate",
}));

export type DeleteVerifiedEmailAddressError = CommonErrors;
/**
 * Deprecated. Use the `DeleteIdentity` operation to delete email addresses
 * and domains.
 */
export const deleteVerifiedEmailAddress: API.OperationMethod<
  DeleteVerifiedEmailAddressRequest,
  DeleteVerifiedEmailAddressResponse,
  DeleteVerifiedEmailAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVerifiedEmailAddressRequest,
  output: DeleteVerifiedEmailAddressResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVerifiedEmailAddress",
}));

export type DescribeActiveReceiptRuleSetError = CommonErrors;
/**
 * Returns the metadata and receipt rules for the receipt rule set that is currently
 * active.
 *
 * For information about setting up receipt rule sets, see the Amazon SES Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const describeActiveReceiptRuleSet: API.OperationMethod<
  DescribeActiveReceiptRuleSetRequest,
  DescribeActiveReceiptRuleSetResponse,
  DescribeActiveReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeActiveReceiptRuleSetRequest,
  output: DescribeActiveReceiptRuleSetResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeActiveReceiptRuleSet",
}));

export type DescribeConfigurationSetError =
  | ConfigurationSetDoesNotExistException
  | CommonErrors;
/**
 * Returns the details of the specified configuration set. For information about using
 * configuration sets, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const describeConfigurationSet: API.OperationMethod<
  DescribeConfigurationSetRequest,
  DescribeConfigurationSetResponse,
  DescribeConfigurationSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeConfigurationSetRequest,
  output: DescribeConfigurationSetResponse,
  errors: [ConfigurationSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeConfigurationSet",
}));

export type DescribeReceiptRuleError =
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Returns the details of the specified receipt rule.
 *
 * For information about setting up receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const describeReceiptRule: API.OperationMethod<
  DescribeReceiptRuleRequest,
  DescribeReceiptRuleResponse,
  DescribeReceiptRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeReceiptRuleRequest,
  output: DescribeReceiptRuleResponse,
  errors: [RuleDoesNotExistException, RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReceiptRule",
}));

export type DescribeReceiptRuleSetError =
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Returns the details of the specified receipt rule set.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const describeReceiptRuleSet: API.OperationMethod<
  DescribeReceiptRuleSetRequest,
  DescribeReceiptRuleSetResponse,
  DescribeReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeReceiptRuleSetRequest,
  output: DescribeReceiptRuleSetResponse,
  errors: [RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReceiptRuleSet",
}));

export type GetAccountSendingEnabledError = CommonErrors;
/**
 * Returns the email sending status of the Amazon SES account for the current Region.
 *
 * You can execute this operation no more than once per second.
 */
export const getAccountSendingEnabled: API.OperationMethod<
  GetAccountSendingEnabledRequest,
  GetAccountSendingEnabledResponse,
  GetAccountSendingEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountSendingEnabledRequest,
  output: GetAccountSendingEnabledResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSendingEnabled",
}));

export type GetCustomVerificationEmailTemplateError =
  | CustomVerificationEmailTemplateDoesNotExistException
  | CommonErrors;
/**
 * Returns the custom email verification template for the template name you
 * specify.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const getCustomVerificationEmailTemplate: API.OperationMethod<
  GetCustomVerificationEmailTemplateRequest,
  GetCustomVerificationEmailTemplateResponse,
  GetCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCustomVerificationEmailTemplateRequest,
  output: GetCustomVerificationEmailTemplateResponse,
  errors: [CustomVerificationEmailTemplateDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomVerificationEmailTemplate",
}));

export type GetIdentityDkimAttributesError = CommonErrors;
/**
 * Returns the current status of Easy DKIM signing for an entity. For domain name
 * identities, this operation also returns the DKIM tokens that are required for Easy DKIM
 * signing, and whether Amazon SES has successfully verified that these tokens have been
 * published.
 *
 * This operation takes a list of identities as input and returns the following
 * information for each:
 *
 * - Whether Easy DKIM signing is enabled or disabled.
 *
 * - A set of DKIM tokens that represent the identity. If the identity is an email
 * address, the tokens represent the domain of that address.
 *
 * - Whether Amazon SES has successfully verified the DKIM tokens published in the
 * domain's DNS. This information is only returned for domain name identities, not
 * for email addresses.
 *
 * This operation is throttled at one request per second and can only get DKIM attributes
 * for up to 100 identities at a time.
 *
 * For more information about creating DNS records using DKIM tokens, go to the Amazon SES
 * Developer Guide.
 */
export const getIdentityDkimAttributes: API.OperationMethod<
  GetIdentityDkimAttributesRequest,
  GetIdentityDkimAttributesResponse,
  GetIdentityDkimAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdentityDkimAttributesRequest,
  output: GetIdentityDkimAttributesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityDkimAttributes",
}));

export type GetIdentityMailFromDomainAttributesError = CommonErrors;
/**
 * Returns the custom MAIL FROM attributes for a list of identities (email addresses :
 * domains).
 *
 * This operation is throttled at one request per second and can only get custom MAIL
 * FROM attributes for up to 100 identities at a time.
 */
export const getIdentityMailFromDomainAttributes: API.OperationMethod<
  GetIdentityMailFromDomainAttributesRequest,
  GetIdentityMailFromDomainAttributesResponse,
  GetIdentityMailFromDomainAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdentityMailFromDomainAttributesRequest,
  output: GetIdentityMailFromDomainAttributesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityMailFromDomainAttributes",
}));

export type GetIdentityNotificationAttributesError = CommonErrors;
/**
 * Given a list of verified identities (email addresses and/or domains), returns a
 * structure describing identity notification attributes.
 *
 * This operation is throttled at one request per second and can only get notification
 * attributes for up to 100 identities at a time.
 *
 * For more information about using notifications with Amazon SES, see the Amazon SES
 * Developer Guide.
 */
export const getIdentityNotificationAttributes: API.OperationMethod<
  GetIdentityNotificationAttributesRequest,
  GetIdentityNotificationAttributesResponse,
  GetIdentityNotificationAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdentityNotificationAttributesRequest,
  output: GetIdentityNotificationAttributesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityNotificationAttributes",
}));

export type GetIdentityPoliciesError = CommonErrors;
/**
 * Returns the requested sending authorization policies for the given identity (an email
 * address or a domain). The policies are returned as a map of policy names to policy
 * contents. You can retrieve a maximum of 20 policies at a time.
 *
 * This operation is for the identity owner only. If you have not verified the
 * identity, it returns an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const getIdentityPolicies: API.OperationMethod<
  GetIdentityPoliciesRequest,
  GetIdentityPoliciesResponse,
  GetIdentityPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdentityPoliciesRequest,
  output: GetIdentityPoliciesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityPolicies",
}));

export type GetIdentityVerificationAttributesError = CommonErrors;
/**
 * Given a list of identities (email addresses and/or domains), returns the verification
 * status and (for domain identities) the verification token for each identity.
 *
 * The verification status of an email address is "Pending" until the email address owner
 * clicks the link within the verification email that Amazon SES sent to that address. If the
 * email address owner clicks the link within 24 hours, the verification status of the
 * email address changes to "Success". If the link is not clicked within 24 hours, the
 * verification status changes to "Failed." In that case, to verify the email address, you
 * must restart the verification process from the beginning.
 *
 * For domain identities, the domain's verification status is "Pending" as Amazon SES searches
 * for the required TXT record in the DNS settings of the domain. When Amazon SES detects the
 * record, the domain's verification status changes to "Success". If Amazon SES is unable to
 * detect the record within 72 hours, the domain's verification status changes to "Failed."
 * In that case, to verify the domain, you must restart the verification process from the
 * beginning.
 *
 * This operation is throttled at one request per second and can only get verification
 * attributes for up to 100 identities at a time.
 */
export const getIdentityVerificationAttributes: API.OperationMethod<
  GetIdentityVerificationAttributesRequest,
  GetIdentityVerificationAttributesResponse,
  GetIdentityVerificationAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIdentityVerificationAttributesRequest,
  output: GetIdentityVerificationAttributesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIdentityVerificationAttributes",
}));

export type GetSendQuotaError = CommonErrors;
/**
 * Provides the sending limits for the Amazon SES account.
 *
 * You can execute this operation no more than once per second.
 */
export const getSendQuota: API.OperationMethod<
  GetSendQuotaRequest,
  GetSendQuotaResponse,
  GetSendQuotaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSendQuotaRequest,
  output: GetSendQuotaResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSendQuota",
}));

export type GetSendStatisticsError = CommonErrors;
/**
 * Provides sending statistics for the current Amazon Web Services Region. The result is a list of data
 * points, representing the last two weeks of sending activity. Each data point in the list
 * contains statistics for a 15-minute period of time.
 *
 * You can execute this operation no more than once per second.
 */
export const getSendStatistics: API.OperationMethod<
  GetSendStatisticsRequest,
  GetSendStatisticsResponse,
  GetSendStatisticsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSendStatisticsRequest,
  output: GetSendStatisticsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSendStatistics",
}));

export type GetTemplateError = TemplateDoesNotExistException | CommonErrors;
/**
 * Displays the template object (which includes the Subject line, HTML part and text
 * part) for the template you specify.
 *
 * You can execute this operation no more than once per second.
 */
export const getTemplate: API.OperationMethod<
  GetTemplateRequest,
  GetTemplateResponse,
  GetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTemplateRequest,
  output: GetTemplateResponse,
  errors: [TemplateDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplate",
}));

export type ListConfigurationSetsError = CommonErrors;
/**
 * Provides a list of the configuration sets associated with your Amazon SES account in the
 * current Amazon Web Services Region. For information about using configuration sets, see Monitoring
 * Your Amazon SES Sending Activity in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second. This operation returns up
 * to 1,000 configuration sets each time it is run. If your Amazon SES account has more than
 * 1,000 configuration sets, this operation also returns `NextToken`. You can
 * then execute the `ListConfigurationSets` operation again, passing the
 * `NextToken` parameter and the value of the NextToken element to retrieve
 * additional results.
 */
export const listConfigurationSets: API.OperationMethod<
  ListConfigurationSetsRequest,
  ListConfigurationSetsResponse,
  ListConfigurationSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListConfigurationSetsRequest,
  output: ListConfigurationSetsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListConfigurationSets",
}));

export type ListCustomVerificationEmailTemplatesError = CommonErrors;
/**
 * Lists the existing custom verification email templates for your account in the current
 * Amazon Web Services Region.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listCustomVerificationEmailTemplates: API.PaginatedOperationMethod<
  ListCustomVerificationEmailTemplatesRequest,
  ListCustomVerificationEmailTemplatesResponse,
  ListCustomVerificationEmailTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomVerificationEmailTemplatesRequest,
  output: ListCustomVerificationEmailTemplatesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomVerificationEmailTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListIdentitiesError = CommonErrors;
/**
 * Returns a list containing all of the identities (email addresses and domains) for your
 * Amazon Web Services account in the current Amazon Web Services Region, regardless of verification status.
 *
 * You can execute this operation no more than once per second.
 *
 * It's recommended that for successive pagination calls of this API, you continue to
 * the use the same parameter/value pairs as used in the original call, e.g., if you
 * used `IdentityType=Domain` in the the original call and received a
 * `NextToken` in the response, you should continue providing the
 * `IdentityType=Domain` parameter for further `NextToken`
 * calls; however, if you didn't provide the `IdentityType` parameter in the
 * original call, then continue to not provide it for successive pagination calls.
 * Using this protocol will ensure consistent results.
 */
export const listIdentities: API.PaginatedOperationMethod<
  ListIdentitiesRequest,
  ListIdentitiesResponse,
  ListIdentitiesError,
  Credentials | HttpClient.HttpClient,
  Identity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIdentitiesRequest,
  output: ListIdentitiesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Identities",
    pageSize: "MaxItems",
  } as const,
})) as any;

export type ListIdentityPoliciesError = CommonErrors;
/**
 * Returns a list of sending authorization policies that are attached to the given
 * identity (an email address or a domain). This operation returns only a list. To get the
 * actual policy content, use `GetIdentityPolicies`.
 *
 * This operation is for the identity owner only. If you have not verified the
 * identity, it returns an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listIdentityPolicies: API.OperationMethod<
  ListIdentityPoliciesRequest,
  ListIdentityPoliciesResponse,
  ListIdentityPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListIdentityPoliciesRequest,
  output: ListIdentityPoliciesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdentityPolicies",
}));

export type ListReceiptFiltersError = CommonErrors;
/**
 * Lists the IP address filters associated with your Amazon Web Services account in the current
 * Amazon Web Services Region.
 *
 * For information about managing IP address filters, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listReceiptFilters: API.OperationMethod<
  ListReceiptFiltersRequest,
  ListReceiptFiltersResponse,
  ListReceiptFiltersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListReceiptFiltersRequest,
  output: ListReceiptFiltersResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceiptFilters",
}));

export type ListReceiptRuleSetsError = CommonErrors;
/**
 * Lists the receipt rule sets that exist under your Amazon Web Services account in the current
 * Amazon Web Services Region. If there are additional receipt rule sets to be retrieved, you receive a
 * `NextToken` that you can provide to the next call to
 * `ListReceiptRuleSets` to retrieve the additional entries.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const listReceiptRuleSets: API.OperationMethod<
  ListReceiptRuleSetsRequest,
  ListReceiptRuleSetsResponse,
  ListReceiptRuleSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListReceiptRuleSetsRequest,
  output: ListReceiptRuleSetsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReceiptRuleSets",
}));

export type ListTemplatesError = CommonErrors;
/**
 * Lists the email templates present in your Amazon SES account in the current
 * Amazon Web Services Region.
 *
 * You can execute this operation no more than once per second.
 */
export const listTemplates: API.OperationMethod<
  ListTemplatesRequest,
  ListTemplatesResponse,
  ListTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTemplatesRequest,
  output: ListTemplatesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplates",
}));

export type ListVerifiedEmailAddressesError = CommonErrors;
/**
 * Deprecated. Use the `ListIdentities` operation to list the email addresses
 * and domains associated with your account.
 */
export const listVerifiedEmailAddresses: API.OperationMethod<
  ListVerifiedEmailAddressesRequest,
  ListVerifiedEmailAddressesResponse,
  ListVerifiedEmailAddressesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListVerifiedEmailAddressesRequest,
  output: ListVerifiedEmailAddressesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVerifiedEmailAddresses",
}));

export type PutConfigurationSetDeliveryOptionsError =
  | ConfigurationSetDoesNotExistException
  | InvalidDeliveryOptionsException
  | CommonErrors;
/**
 * Adds or updates the delivery options for a configuration set.
 */
export const putConfigurationSetDeliveryOptions: API.OperationMethod<
  PutConfigurationSetDeliveryOptionsRequest,
  PutConfigurationSetDeliveryOptionsResponse,
  PutConfigurationSetDeliveryOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutConfigurationSetDeliveryOptionsRequest,
  output: PutConfigurationSetDeliveryOptionsResponse,
  errors: [
    ConfigurationSetDoesNotExistException,
    InvalidDeliveryOptionsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutConfigurationSetDeliveryOptions",
}));

export type PutIdentityPolicyError = InvalidPolicyException | CommonErrors;
/**
 * Adds or updates a sending authorization policy for the specified identity (an email
 * address or a domain).
 *
 * This operation is for the identity owner only. If you have not verified the
 * identity, it returns an error.
 *
 * Sending authorization is a feature that enables an identity owner to authorize other
 * senders to use its identities. For information about using sending authorization, see
 * the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const putIdentityPolicy: API.OperationMethod<
  PutIdentityPolicyRequest,
  PutIdentityPolicyResponse,
  PutIdentityPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutIdentityPolicyRequest,
  output: PutIdentityPolicyResponse,
  errors: [InvalidPolicyException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIdentityPolicy",
}));

export type ReorderReceiptRuleSetError =
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Reorders the receipt rules within a receipt rule set.
 *
 * All of the rules in the rule set must be represented in this request. That is, it
 * is error if the reorder request doesn't explicitly position all of the rules.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const reorderReceiptRuleSet: API.OperationMethod<
  ReorderReceiptRuleSetRequest,
  ReorderReceiptRuleSetResponse,
  ReorderReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ReorderReceiptRuleSetRequest,
  output: ReorderReceiptRuleSetResponse,
  errors: [RuleDoesNotExistException, RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReorderReceiptRuleSet",
}));

export type SendBounceError = MessageRejected | CommonErrors;
/**
 * Generates and sends a bounce message to the sender of an email you received through
 * Amazon SES. You can only use this operation on an email up to 24 hours after you receive
 * it.
 *
 * You cannot use this operation to send generic bounces for mail that was not
 * received by Amazon SES.
 *
 * For information about receiving email through Amazon SES, see the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const sendBounce: API.OperationMethod<
  SendBounceRequest,
  SendBounceResponse,
  SendBounceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendBounceRequest,
  output: SendBounceResponse,
  errors: [MessageRejected],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendBounce",
}));

export type SendBulkTemplatedEmailError =
  | AccountSendingPausedException
  | ConfigurationSetDoesNotExistException
  | ConfigurationSetSendingPausedException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | TemplateDoesNotExistException
  | CommonErrors;
/**
 * Composes an email message to multiple destinations. The message body is created using
 * an email template.
 *
 * To send email using this operation, your call must meet the following
 * requirements:
 *
 * - The call must refer to an existing email template. You can create email
 * templates using CreateTemplate.
 *
 * - The message must be sent from a verified email address or domain.
 *
 * - If your account is still in the Amazon SES sandbox, you may send only to verified
 * addresses or domains, or to email addresses associated with the Amazon SES Mailbox
 * Simulator. For more information, see Verifying Email
 * Addresses and Domains in the Amazon SES Developer
 * Guide.
 *
 * - The maximum message size is 10 MB.
 *
 * - Each `Destination` parameter must include at least one recipient
 * email address. The recipient address can be a To: address, a CC: address, or a
 * BCC: address. If a recipient email address is invalid (that is, it is not in the
 * format *UserName@[SubDomain.]Domain.TopLevelDomain*), the
 * entire message is rejected, even if the message contains other recipients that
 * are valid.
 *
 * - The message may not include more than 50 recipients, across the To:, CC: and
 * BCC: fields. If you need to send an email message to a larger audience, you can
 * divide your recipient list into groups of 50 or fewer, and then call the
 * `SendBulkTemplatedEmail` operation several times to send the
 * message to each group.
 *
 * - The number of destinations you can contact in a single call can be limited by
 * your account's maximum sending rate.
 */
export const sendBulkTemplatedEmail: API.OperationMethod<
  SendBulkTemplatedEmailRequest,
  SendBulkTemplatedEmailResponse,
  SendBulkTemplatedEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendBulkTemplatedEmailRequest,
  output: SendBulkTemplatedEmailResponse,
  errors: [
    AccountSendingPausedException,
    ConfigurationSetDoesNotExistException,
    ConfigurationSetSendingPausedException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    TemplateDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendBulkTemplatedEmail",
}));

export type SendCustomVerificationEmailError =
  | ConfigurationSetDoesNotExistException
  | CustomVerificationEmailTemplateDoesNotExistException
  | FromEmailAddressNotVerifiedException
  | MessageRejected
  | ProductionAccessNotGrantedException
  | CommonErrors;
/**
 * Adds an email address to the list of identities for your Amazon SES account in the current
 * Amazon Web Services Region and attempts to verify it. As a result of executing this operation, a
 * customized verification email is sent to the specified address.
 *
 * To use this operation, you must first create a custom verification email template. For
 * more information about creating and using custom verification email templates, see
 * Using
 * Custom Verification Email Templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const sendCustomVerificationEmail: API.OperationMethod<
  SendCustomVerificationEmailRequest,
  SendCustomVerificationEmailResponse,
  SendCustomVerificationEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendCustomVerificationEmailRequest,
  output: SendCustomVerificationEmailResponse,
  errors: [
    ConfigurationSetDoesNotExistException,
    CustomVerificationEmailTemplateDoesNotExistException,
    FromEmailAddressNotVerifiedException,
    MessageRejected,
    ProductionAccessNotGrantedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendCustomVerificationEmail",
}));

export type SendEmailError =
  | AccountSendingPausedException
  | ConfigurationSetDoesNotExistException
  | ConfigurationSetSendingPausedException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | CommonErrors;
/**
 * Composes an email message and immediately queues it for sending. To send email using
 * this operation, your message must meet the following requirements:
 *
 * - The message must be sent from a verified email address or domain. If you
 * attempt to send email using a non-verified address or domain, the operation
 * results in an "Email address not verified" error.
 *
 * - If your account is still in the Amazon SES sandbox, you may only send to verified
 * addresses or domains, or to email addresses associated with the Amazon SES Mailbox
 * Simulator. For more information, see Verifying Email
 * Addresses and Domains in the Amazon SES Developer
 * Guide.
 *
 * - The maximum message size is 10 MB.
 *
 * - The message must include at least one recipient email address. The recipient
 * address can be a To: address, a CC: address, or a BCC: address. If a recipient
 * email address is invalid (that is, it is not in the format
 * *UserName@[SubDomain.]Domain.TopLevelDomain*), the entire
 * message is rejected, even if the message contains other recipients that are
 * valid.
 *
 * - The message may not include more than 50 recipients, across the To:, CC: and
 * BCC: fields. If you need to send an email message to a larger audience, you can
 * divide your recipient list into groups of 50 or fewer, and then call the
 * `SendEmail` operation several times to send the message to each
 * group.
 *
 * For every message that you send, the total number of recipients (including each
 * recipient in the To:, CC: and BCC: fields) is counted against the maximum number of
 * emails you can send in a 24-hour period (your *sending quota*).
 * For more information about sending quotas in Amazon SES, see Managing Your Amazon SES Sending
 * Limits in the *Amazon SES Developer Guide.*
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
    AccountSendingPausedException,
    ConfigurationSetDoesNotExistException,
    ConfigurationSetSendingPausedException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendEmail",
}));

export type SendRawEmailError =
  | AccountSendingPausedException
  | ConfigurationSetDoesNotExistException
  | ConfigurationSetSendingPausedException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | CommonErrors;
/**
 * Composes an email message and immediately queues it for sending.
 *
 * This operation is more flexible than the `SendEmail` operation. When you
 * use the `SendRawEmail` operation, you can specify the headers of the message
 * as well as its content. This flexibility is useful, for example, when you need to send a
 * multipart MIME email (such a message that contains both a text and an HTML version). You
 * can also use this operation to send messages that include attachments.
 *
 * The `SendRawEmail` operation has the following requirements:
 *
 * - You can only send email from verified email addresses or domains. If you try to send email from
 * an address that isn't verified, the operation results in an "Email address not
 * verified" error.
 *
 * - If your account is still in the Amazon SES sandbox, you can only send email to other verified addresses
 * in your account, or to addresses that are associated with the Amazon SES mailbox simulator.
 *
 * - The maximum message size, including attachments, is 10 MB.
 *
 * - Each message has to include at least one recipient address. A recipient
 * address includes any address on the To:, CC:, or BCC: lines.
 *
 * - If you send a single message to more than one recipient address, and one of
 * the recipient addresses isn't in a valid format (that is, it's not in the format
 * *UserName@[SubDomain.]Domain.TopLevelDomain*), Amazon SES
 * rejects the entire message, even if the other addresses are valid.
 *
 * - Each message can include up to 50 recipient addresses across the To:, CC:, or
 * BCC: lines. If you need to send a single message to more than 50 recipients, you
 * have to split the list of recipient addresses into groups of less than 50
 * recipients, and send separate messages to each group.
 *
 * - Amazon SES allows you to specify 8-bit Content-Transfer-Encoding for MIME message
 * parts. However, if Amazon SES has to modify the contents of your message (for
 * example, if you use open and click tracking), 8-bit content isn't preserved. For
 * this reason, we highly recommend that you encode all content that isn't 7-bit
 * ASCII. For more information, see MIME Encoding in the Amazon SES Developer
 * Guide.
 *
 * Additionally, keep the following considerations in mind when using the
 * `SendRawEmail` operation:
 *
 * - Although you can customize the message headers when using the
 * `SendRawEmail` operation, Amazon SES automatically applies its own
 * `Message-ID` and `Date` headers; if you passed these
 * headers when creating the message, they are overwritten by the values that Amazon SES
 * provides.
 *
 * - If you are using sending authorization to send on behalf of another user,
 * `SendRawEmail` enables you to specify the cross-account identity
 * for the email's Source, From, and Return-Path parameters in one of two ways: you
 * can pass optional parameters `SourceArn`, `FromArn`,
 * and/or `ReturnPathArn`, or you can include the following X-headers in
 * the header of your raw email:
 *
 * - `X-SES-SOURCE-ARN`
 *
 * - `X-SES-FROM-ARN`
 *
 * - `X-SES-RETURN-PATH-ARN`
 *
 * Don't include these X-headers in the DKIM signature. Amazon SES removes these
 * before it sends the email.
 *
 * If you only specify the `SourceIdentityArn` parameter, Amazon SES sets
 * the From and Return-Path addresses to the same identity that you
 * specified.
 *
 * For more information about sending authorization, see the Using
 * Sending Authorization with Amazon SES in the Amazon SES Developer
 * Guide.
 *
 * - For every message that you send, the total number of recipients (including
 * each recipient in the To:, CC: and BCC: fields) is counted against the maximum
 * number of emails you can send in a 24-hour period (your sending
 * quota). For more information about sending quotas in Amazon SES, see
 * Managing Your Amazon SES Sending Limits in the Amazon SES Developer
 * Guide.
 */
export const sendRawEmail: API.OperationMethod<
  SendRawEmailRequest,
  SendRawEmailResponse,
  SendRawEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendRawEmailRequest,
  output: SendRawEmailResponse,
  errors: [
    AccountSendingPausedException,
    ConfigurationSetDoesNotExistException,
    ConfigurationSetSendingPausedException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendRawEmail",
}));

export type SendTemplatedEmailError =
  | AccountSendingPausedException
  | ConfigurationSetDoesNotExistException
  | ConfigurationSetSendingPausedException
  | MailFromDomainNotVerifiedException
  | MessageRejected
  | TemplateDoesNotExistException
  | CommonErrors;
/**
 * Composes an email message using an email template and immediately queues it for
 * sending.
 *
 * To send email using this operation, your call must meet the following
 * requirements:
 *
 * - The call must refer to an existing email template. You can create email
 * templates using the CreateTemplate operation.
 *
 * - The message must be sent from a verified email address or domain.
 *
 * - If your account is still in the Amazon SES sandbox, you may only send to verified
 * addresses or domains, or to email addresses associated with the Amazon SES Mailbox
 * Simulator. For more information, see Verifying Email
 * Addresses and Domains in the Amazon SES Developer
 * Guide.
 *
 * - The maximum message size is 10 MB.
 *
 * - Calls to the `SendTemplatedEmail` operation may only include one
 * `Destination` parameter. A destination is a set of recipients
 * that receives the same version of the email. The `Destination`
 * parameter can include up to 50 recipients, across the To:, CC: and BCC:
 * fields.
 *
 * - The `Destination` parameter must include at least one recipient
 * email address. The recipient address can be a To: address, a CC: address, or a
 * BCC: address. If a recipient email address is invalid (that is, it is not in the
 * format *UserName@[SubDomain.]Domain.TopLevelDomain*), the
 * entire message is rejected, even if the message contains other recipients that
 * are valid.
 *
 * If your call to the `SendTemplatedEmail` operation includes all of the
 * required parameters, Amazon SES accepts it and returns a Message ID. However, if Amazon SES
 * can't render the email because the template contains errors, it doesn't send the
 * email. Additionally, because it already accepted the message, Amazon SES doesn't return a
 * message stating that it was unable to send the email.
 *
 * For these reasons, we highly recommend that you set up Amazon SES to send you
 * notifications when Rendering Failure events occur. For more information, see Sending Personalized Email Using the Amazon SES API in the
 * *Amazon Simple Email Service Developer Guide*.
 */
export const sendTemplatedEmail: API.OperationMethod<
  SendTemplatedEmailRequest,
  SendTemplatedEmailResponse,
  SendTemplatedEmailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SendTemplatedEmailRequest,
  output: SendTemplatedEmailResponse,
  errors: [
    AccountSendingPausedException,
    ConfigurationSetDoesNotExistException,
    ConfigurationSetSendingPausedException,
    MailFromDomainNotVerifiedException,
    MessageRejected,
    TemplateDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SendTemplatedEmail",
}));

export type SetActiveReceiptRuleSetError =
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Sets the specified receipt rule set as the active receipt rule set.
 *
 * To disable your email-receiving through Amazon SES completely, you can call this
 * operation with `RuleSetName` set to null.
 *
 * For information about managing receipt rule sets, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const setActiveReceiptRuleSet: API.OperationMethod<
  SetActiveReceiptRuleSetRequest,
  SetActiveReceiptRuleSetResponse,
  SetActiveReceiptRuleSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetActiveReceiptRuleSetRequest,
  output: SetActiveReceiptRuleSetResponse,
  errors: [RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetActiveReceiptRuleSet",
}));

export type SetIdentityDkimEnabledError = CommonErrors;
/**
 * Enables or disables Easy DKIM signing of email sent from an identity. If Easy DKIM
 * signing is enabled for a domain, then Amazon SES uses DKIM to sign all email that it sends
 * from addresses on that domain. If Easy DKIM signing is enabled for an email address,
 * then Amazon SES uses DKIM to sign all email it sends from that address.
 *
 * For email addresses (for example, `user@example.com`), you can only
 * enable DKIM signing if the corresponding domain (in this case,
 * `example.com`) has been set up to use Easy DKIM.
 *
 * You can enable DKIM signing for an identity at any time after you start the
 * verification process for the identity, even if the verification process isn't complete.
 *
 * You can execute this operation no more than once per second.
 *
 * For more information about Easy DKIM signing, go to the Amazon SES Developer
 * Guide.
 */
export const setIdentityDkimEnabled: API.OperationMethod<
  SetIdentityDkimEnabledRequest,
  SetIdentityDkimEnabledResponse,
  SetIdentityDkimEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetIdentityDkimEnabledRequest,
  output: SetIdentityDkimEnabledResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityDkimEnabled",
}));

export type SetIdentityFeedbackForwardingEnabledError = CommonErrors;
/**
 * Given an identity (an email address or a domain), enables or disables whether Amazon SES
 * forwards bounce and complaint notifications as email. Feedback forwarding can only be
 * disabled when Amazon Simple Notification Service (Amazon SNS) topics are specified for both bounces and
 * complaints.
 *
 * Feedback forwarding does not apply to delivery notifications. Delivery
 * notifications are only available through Amazon SNS.
 *
 * You can execute this operation no more than once per second.
 *
 * For more information about using notifications with Amazon SES, see the Amazon SES
 * Developer Guide.
 */
export const setIdentityFeedbackForwardingEnabled: API.OperationMethod<
  SetIdentityFeedbackForwardingEnabledRequest,
  SetIdentityFeedbackForwardingEnabledResponse,
  SetIdentityFeedbackForwardingEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetIdentityFeedbackForwardingEnabledRequest,
  output: SetIdentityFeedbackForwardingEnabledResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityFeedbackForwardingEnabled",
}));

export type SetIdentityHeadersInNotificationsEnabledError = CommonErrors;
/**
 * Given an identity (an email address or a domain), sets whether Amazon SES includes the
 * original email headers in the Amazon Simple Notification Service (Amazon SNS) notifications of a specified
 * type.
 *
 * You can execute this operation no more than once per second.
 *
 * For more information about using notifications with Amazon SES, see the Amazon SES
 * Developer Guide.
 */
export const setIdentityHeadersInNotificationsEnabled: API.OperationMethod<
  SetIdentityHeadersInNotificationsEnabledRequest,
  SetIdentityHeadersInNotificationsEnabledResponse,
  SetIdentityHeadersInNotificationsEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetIdentityHeadersInNotificationsEnabledRequest,
  output: SetIdentityHeadersInNotificationsEnabledResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityHeadersInNotificationsEnabled",
}));

export type SetIdentityMailFromDomainError = CommonErrors;
/**
 * Enables or disables the custom MAIL FROM domain setup for a verified identity (an
 * email address or a domain).
 *
 * To send emails using the specified MAIL FROM domain, you must add an MX record to
 * your MAIL FROM domain's DNS settings. To ensure that your emails pass Sender Policy
 * Framework (SPF) checks, you must also add or update an SPF record. For more
 * information, see the Amazon SES Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const setIdentityMailFromDomain: API.OperationMethod<
  SetIdentityMailFromDomainRequest,
  SetIdentityMailFromDomainResponse,
  SetIdentityMailFromDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetIdentityMailFromDomainRequest,
  output: SetIdentityMailFromDomainResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityMailFromDomain",
}));

export type SetIdentityNotificationTopicError = CommonErrors;
/**
 * Sets an Amazon Simple Notification Service (Amazon SNS) topic to use when delivering notifications. When you use
 * this operation, you specify a verified identity, such as an email address or domain.
 * When you send an email that uses the chosen identity in the Source field, Amazon SES sends
 * notifications to the topic you specified. You can send bounce, complaint, or delivery
 * notifications (or any combination of the three) to the Amazon SNS topic that you
 * specify.
 *
 * You can execute this operation no more than once per second.
 *
 * For more information about feedback notification, see the Amazon SES
 * Developer Guide.
 */
export const setIdentityNotificationTopic: API.OperationMethod<
  SetIdentityNotificationTopicRequest,
  SetIdentityNotificationTopicResponse,
  SetIdentityNotificationTopicError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetIdentityNotificationTopicRequest,
  output: SetIdentityNotificationTopicResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetIdentityNotificationTopic",
}));

export type SetReceiptRulePositionError =
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | CommonErrors;
/**
 * Sets the position of the specified receipt rule in the receipt rule set.
 *
 * For information about managing receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const setReceiptRulePosition: API.OperationMethod<
  SetReceiptRulePositionRequest,
  SetReceiptRulePositionResponse,
  SetReceiptRulePositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SetReceiptRulePositionRequest,
  output: SetReceiptRulePositionResponse,
  errors: [RuleDoesNotExistException, RuleSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetReceiptRulePosition",
}));

export type TestRenderTemplateError =
  | InvalidRenderingParameterException
  | MissingRenderingAttributeException
  | TemplateDoesNotExistException
  | CommonErrors;
/**
 * Creates a preview of the MIME content of an email when provided with a template and a
 * set of replacement data.
 *
 * You can execute this operation no more than once per second.
 */
export const testRenderTemplate: API.OperationMethod<
  TestRenderTemplateRequest,
  TestRenderTemplateResponse,
  TestRenderTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TestRenderTemplateRequest,
  output: TestRenderTemplateResponse,
  errors: [
    InvalidRenderingParameterException,
    MissingRenderingAttributeException,
    TemplateDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TestRenderTemplate",
}));

export type UpdateAccountSendingEnabledError = CommonErrors;
/**
 * Enables or disables email sending across your entire Amazon SES account in the current
 * Amazon Web Services Region. You can use this operation in conjunction with Amazon CloudWatch alarms to
 * temporarily pause email sending across your Amazon SES account in a given Amazon Web Services Region when
 * reputation metrics (such as your bounce or complaint rates) reach certain
 * thresholds.
 *
 * You can execute this operation no more than once per second.
 */
export const updateAccountSendingEnabled: API.OperationMethod<
  UpdateAccountSendingEnabledRequest,
  UpdateAccountSendingEnabledResponse,
  UpdateAccountSendingEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountSendingEnabledRequest,
  output: UpdateAccountSendingEnabledResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSendingEnabled",
}));

export type UpdateConfigurationSetEventDestinationError =
  | ConfigurationSetDoesNotExistException
  | EventDestinationDoesNotExistException
  | InvalidCloudWatchDestinationException
  | InvalidFirehoseDestinationException
  | InvalidSNSDestinationException
  | CommonErrors;
/**
 * Updates the event destination of a configuration set. Event destinations are
 * associated with configuration sets, which enable you to publish email sending events to
 * Amazon CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service (Amazon SNS). For information about using configuration sets,
 * see Monitoring Your Amazon SES Sending Activity in the Amazon SES Developer
 * Guide.
 *
 * When you create or update an event destination, you must provide one, and only
 * one, destination. The destination can be Amazon CloudWatch, Amazon Kinesis Firehose, or Amazon Simple Notification Service
 * (Amazon SNS).
 *
 * You can execute this operation no more than once per second.
 */
export const updateConfigurationSetEventDestination: API.OperationMethod<
  UpdateConfigurationSetEventDestinationRequest,
  UpdateConfigurationSetEventDestinationResponse,
  UpdateConfigurationSetEventDestinationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationSetEventDestinationRequest,
  output: UpdateConfigurationSetEventDestinationResponse,
  errors: [
    ConfigurationSetDoesNotExistException,
    EventDestinationDoesNotExistException,
    InvalidCloudWatchDestinationException,
    InvalidFirehoseDestinationException,
    InvalidSNSDestinationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetEventDestination",
}));

export type UpdateConfigurationSetReputationMetricsEnabledError =
  | ConfigurationSetDoesNotExistException
  | CommonErrors;
/**
 * Enables or disables the publishing of reputation metrics for emails sent using a
 * specific configuration set in a given Amazon Web Services Region. Reputation metrics include bounce
 * and complaint rates. These metrics are published to Amazon CloudWatch. By using CloudWatch, you can
 * create alarms when bounce or complaint rates exceed certain thresholds.
 *
 * You can execute this operation no more than once per second.
 */
export const updateConfigurationSetReputationMetricsEnabled: API.OperationMethod<
  UpdateConfigurationSetReputationMetricsEnabledRequest,
  UpdateConfigurationSetReputationMetricsEnabledResponse,
  UpdateConfigurationSetReputationMetricsEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationSetReputationMetricsEnabledRequest,
  output: UpdateConfigurationSetReputationMetricsEnabledResponse,
  errors: [ConfigurationSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetReputationMetricsEnabled",
}));

export type UpdateConfigurationSetSendingEnabledError =
  | ConfigurationSetDoesNotExistException
  | CommonErrors;
/**
 * Enables or disables email sending for messages sent using a specific configuration set
 * in a given Amazon Web Services Region. You can use this operation in conjunction with Amazon CloudWatch alarms
 * to temporarily pause email sending for a configuration set when the reputation metrics
 * for that configuration set (such as your bounce on complaint rate) exceed certain
 * thresholds.
 *
 * You can execute this operation no more than once per second.
 */
export const updateConfigurationSetSendingEnabled: API.OperationMethod<
  UpdateConfigurationSetSendingEnabledRequest,
  UpdateConfigurationSetSendingEnabledResponse,
  UpdateConfigurationSetSendingEnabledError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationSetSendingEnabledRequest,
  output: UpdateConfigurationSetSendingEnabledResponse,
  errors: [ConfigurationSetDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetSendingEnabled",
}));

export type UpdateConfigurationSetTrackingOptionsError =
  | ConfigurationSetDoesNotExistException
  | InvalidTrackingOptionsException
  | TrackingOptionsDoesNotExistException
  | CommonErrors;
/**
 * Modifies an association between a configuration set and a custom domain for open and
 * click event tracking.
 *
 * By default, images and links used for tracking open and click events are hosted on
 * domains operated by Amazon SES. You can configure a subdomain of your own to handle these
 * events. For information about using custom domains, see the Amazon SES Developer Guide.
 */
export const updateConfigurationSetTrackingOptions: API.OperationMethod<
  UpdateConfigurationSetTrackingOptionsRequest,
  UpdateConfigurationSetTrackingOptionsResponse,
  UpdateConfigurationSetTrackingOptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateConfigurationSetTrackingOptionsRequest,
  output: UpdateConfigurationSetTrackingOptionsResponse,
  errors: [
    ConfigurationSetDoesNotExistException,
    InvalidTrackingOptionsException,
    TrackingOptionsDoesNotExistException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateConfigurationSetTrackingOptions",
}));

export type UpdateCustomVerificationEmailTemplateError =
  | CustomVerificationEmailInvalidContentException
  | CustomVerificationEmailTemplateDoesNotExistException
  | FromEmailAddressNotVerifiedException
  | CommonErrors;
/**
 * Updates an existing custom verification email template.
 *
 * For more information about custom verification email templates, see Using
 * Custom Verification Email Templates in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateCustomVerificationEmailTemplate: API.OperationMethod<
  UpdateCustomVerificationEmailTemplateRequest,
  UpdateCustomVerificationEmailTemplateResponse,
  UpdateCustomVerificationEmailTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCustomVerificationEmailTemplateRequest,
  output: UpdateCustomVerificationEmailTemplateResponse,
  errors: [
    CustomVerificationEmailInvalidContentException,
    CustomVerificationEmailTemplateDoesNotExistException,
    FromEmailAddressNotVerifiedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomVerificationEmailTemplate",
}));

export type UpdateReceiptRuleError =
  | InvalidLambdaFunctionException
  | InvalidS3ConfigurationException
  | InvalidSnsTopicException
  | LimitExceededException
  | RuleDoesNotExistException
  | RuleSetDoesNotExistException
  | InvalidParameterValue
  | IdentityNotVerified
  | CommonErrors;
/**
 * Updates a receipt rule.
 *
 * For information about managing receipt rules, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateReceiptRule: API.OperationMethod<
  UpdateReceiptRuleRequest,
  UpdateReceiptRuleResponse,
  UpdateReceiptRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateReceiptRuleRequest,
  output: UpdateReceiptRuleResponse,
  errors: [
    InvalidLambdaFunctionException,
    InvalidS3ConfigurationException,
    InvalidSnsTopicException,
    LimitExceededException,
    RuleDoesNotExistException,
    RuleSetDoesNotExistException,
    InvalidParameterValue,
    IdentityNotVerified,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReceiptRule",
}));

export type UpdateTemplateError =
  | InvalidTemplateException
  | TemplateDoesNotExistException
  | CommonErrors;
/**
 * Updates an email template. Email templates enable you to send personalized email to
 * one or more destinations in a single operation. For more information, see the Amazon SES
 * Developer Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const updateTemplate: API.OperationMethod<
  UpdateTemplateRequest,
  UpdateTemplateResponse,
  UpdateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTemplateRequest,
  output: UpdateTemplateResponse,
  errors: [InvalidTemplateException, TemplateDoesNotExistException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTemplate",
}));

export type VerifyDomainDkimError = CommonErrors;
/**
 * Returns a set of DKIM tokens for a domain identity.
 *
 * When you execute the `VerifyDomainDkim` operation, the domain that you
 * specify is added to the list of identities that are associated with your account.
 * This is true even if you haven't already associated the domain with your account by
 * using the `VerifyDomainIdentity` operation. However, you can't send email
 * from the domain until you either successfully verify
 * it or you successfully set up DKIM for
 * it.
 *
 * You use the tokens that are generated by this operation to create CNAME records. When
 * Amazon SES detects that you've added these records to the DNS configuration for a domain, you
 * can start sending email from that domain. You can start sending email even if you
 * haven't added the TXT record provided by the VerifyDomainIdentity operation to the DNS
 * configuration for your domain. All email that you send from the domain is authenticated
 * using DKIM.
 *
 * To create the CNAME records for DKIM authentication, use the following values:
 *
 * - **Name**:
 * *token*._domainkey.*example.com*
 *
 * - **Type**: CNAME
 *
 * - **Value**:
 * *token*.dkim.amazonses.com
 *
 * In the preceding example, replace *token* with one of the tokens
 * that are generated when you execute this operation. Replace
 * *example.com* with your domain. Repeat this process for each
 * token that's generated by this operation.
 *
 * You can execute this operation no more than once per second.
 */
export const verifyDomainDkim: API.OperationMethod<
  VerifyDomainDkimRequest,
  VerifyDomainDkimResponse,
  VerifyDomainDkimError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: VerifyDomainDkimRequest,
  output: VerifyDomainDkimResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyDomainDkim",
}));

export type VerifyDomainIdentityError = CommonErrors;
/**
 * Adds a domain to the list of identities for your Amazon SES account in the current
 * Amazon Web Services Region and attempts to verify it. For more information about verifying domains,
 * see Verifying Email Addresses and Domains in the Amazon SES Developer
 * Guide.
 *
 * You can execute this operation no more than once per second.
 */
export const verifyDomainIdentity: API.OperationMethod<
  VerifyDomainIdentityRequest,
  VerifyDomainIdentityResponse,
  VerifyDomainIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: VerifyDomainIdentityRequest,
  output: VerifyDomainIdentityResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyDomainIdentity",
}));

export type VerifyEmailAddressError = CommonErrors;
/**
 * Deprecated. Use the `VerifyEmailIdentity` operation to verify a new email
 * address.
 */
export const verifyEmailAddress: API.OperationMethod<
  VerifyEmailAddressRequest,
  VerifyEmailAddressResponse,
  VerifyEmailAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: VerifyEmailAddressRequest,
  output: VerifyEmailAddressResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyEmailAddress",
}));

export type VerifyEmailIdentityError = CommonErrors;
/**
 * Adds an email address to the list of identities for your Amazon SES account in the current
 * Amazon Web Services Region and attempts to verify it. As a result of executing this operation, a
 * verification email is sent to the specified address.
 *
 * You can execute this operation no more than once per second.
 */
export const verifyEmailIdentity: API.OperationMethod<
  VerifyEmailIdentityRequest,
  VerifyEmailIdentityResponse,
  VerifyEmailIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: VerifyEmailIdentityRequest,
  output: VerifyEmailIdentityResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyEmailIdentity",
}));
