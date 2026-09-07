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
const ns = T.XmlNamespace(
  "http://wheatley.amazonaws.com/orchestration/2017-10-11/",
);
const svc = T.AwsApiService({
  sdkId: "chatbot",
  serviceShapeName: "WheatleyOrchestration_20171011",
});
const auth = T.AwsAuthSigv4({ name: "chatbot" });
const ver = T.ServiceVersion("2017-10-11");
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
              `https://chatbot-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://chatbot-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://chatbot.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://chatbot.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class CreateChimeWebhookConfigurationException
  extends /*@__PURE__*/ S.TaggedError<CreateChimeWebhookConfigurationException>()(
    "CreateChimeWebhookConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class CreateSlackChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<CreateSlackChannelConfigurationException>()(
    "CreateSlackChannelConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class CreateTeamsChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<CreateTeamsChannelConfigurationException>()(
    "CreateTeamsChannelConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteChimeWebhookConfigurationException
  extends /*@__PURE__*/ S.TaggedError<DeleteChimeWebhookConfigurationException>()(
    "DeleteChimeWebhookConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteMicrosoftTeamsUserIdentityException
  extends /*@__PURE__*/ S.TaggedError<DeleteMicrosoftTeamsUserIdentityException>()(
    "DeleteMicrosoftTeamsUserIdentityException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteSlackChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<DeleteSlackChannelConfigurationException>()(
    "DeleteSlackChannelConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteSlackUserIdentityException
  extends /*@__PURE__*/ S.TaggedError<DeleteSlackUserIdentityException>()(
    "DeleteSlackUserIdentityException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteSlackWorkspaceAuthorizationFault
  extends /*@__PURE__*/ S.TaggedError<DeleteSlackWorkspaceAuthorizationFault>()(
    "DeleteSlackWorkspaceAuthorizationFault",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteTeamsChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<DeleteTeamsChannelConfigurationException>()(
    "DeleteTeamsChannelConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DeleteTeamsConfiguredTeamException
  extends /*@__PURE__*/ S.TaggedError<DeleteTeamsConfiguredTeamException>()(
    "DeleteTeamsConfiguredTeamException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DescribeChimeWebhookConfigurationsException
  extends /*@__PURE__*/ S.TaggedError<DescribeChimeWebhookConfigurationsException>()(
    "DescribeChimeWebhookConfigurationsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DescribeSlackChannelConfigurationsException
  extends /*@__PURE__*/ S.TaggedError<DescribeSlackChannelConfigurationsException>()(
    "DescribeSlackChannelConfigurationsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DescribeSlackUserIdentitiesException
  extends /*@__PURE__*/ S.TaggedError<DescribeSlackUserIdentitiesException>()(
    "DescribeSlackUserIdentitiesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class DescribeSlackWorkspacesException
  extends /*@__PURE__*/ S.TaggedError<DescribeSlackWorkspacesException>()(
    "DescribeSlackWorkspacesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class GetAccountPreferencesException
  extends /*@__PURE__*/ S.TaggedError<GetAccountPreferencesException>()(
    "GetAccountPreferencesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class GetTeamsChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<GetTeamsChannelConfigurationException>()(
    "GetTeamsChannelConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InternalServiceError
  extends /*@__PURE__*/ S.TaggedError<InternalServiceError>()(
    "InternalServiceError",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()(
    "InvalidParameterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()(
    "InvalidRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ListMicrosoftTeamsConfiguredTeamsException
  extends /*@__PURE__*/ S.TaggedError<ListMicrosoftTeamsConfiguredTeamsException>()(
    "ListMicrosoftTeamsConfiguredTeamsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ListMicrosoftTeamsUserIdentitiesException
  extends /*@__PURE__*/ S.TaggedError<ListMicrosoftTeamsUserIdentitiesException>()(
    "ListMicrosoftTeamsUserIdentitiesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ListTeamsChannelConfigurationsException
  extends /*@__PURE__*/ S.TaggedError<ListTeamsChannelConfigurationsException>()(
    "ListTeamsChannelConfigurationsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class MicrosoftTeamsTeamNotConfigured
  extends /*@__PURE__*/ S.TaggedError<MicrosoftTeamsTeamNotConfigured>()(
    "MicrosoftTeamsTeamNotConfigured",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "team id you are using is not configured" },
    }),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withServerError) {}
export class SlackWorkspaceNotAuthorized
  extends /*@__PURE__*/ S.TaggedError<SlackWorkspaceNotAuthorized>()(
    "SlackWorkspaceNotAuthorized",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "InvalidRequestException",
      message: { includes: "is not authorized with AWS account" },
    }),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class UpdateAccountPreferencesException
  extends /*@__PURE__*/ S.TaggedError<UpdateAccountPreferencesException>()(
    "UpdateAccountPreferencesException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class UpdateChimeWebhookConfigurationException
  extends /*@__PURE__*/ S.TaggedError<UpdateChimeWebhookConfigurationException>()(
    "UpdateChimeWebhookConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class UpdateSlackChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<UpdateSlackChannelConfigurationException>()(
    "UpdateSlackChannelConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class UpdateTeamsChannelConfigurationException
  extends /*@__PURE__*/ S.TaggedError<UpdateTeamsChannelConfigurationException>()(
    "UpdateTeamsChannelConfigurationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export type ResourceIdentifier = string;
export type ChatConfigurationArn = string;
export interface AssociateToConfigurationRequest {
  Resource: string;
  ChatConfiguration: string;
}
export const AssociateToConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Resource: S.String, ChatConfiguration: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/associate-to-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AssociateToConfigurationRequest",
}) as any as S.Schema<AssociateToConfigurationRequest>;
export interface AssociateToConfigurationResult {}
export const AssociateToConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "AssociateToConfigurationResult",
}) as any as S.Schema<AssociateToConfigurationResult>;
export type ChimeWebhookDescription = string | redacted.Redacted<string>;
export type ChimeWebhookUrl = string | redacted.Redacted<string>;
export type Arn = string;
export type SnsTopicArnList = string[];
export const SnsTopicArnList = /*@__PURE__*/ S.Array(S.String);
export type ConfigurationName = string;
export type CustomerCwLogLevel = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  TagKey: string;
  TagValue: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TagKey: S.String, TagValue: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type Tags = Tag[];
export const Tags = /*@__PURE__*/ S.Array(Tag);
export interface CreateChimeWebhookConfigurationRequest {
  WebhookDescription: string | redacted.Redacted<string>;
  WebhookUrl: string | redacted.Redacted<string>;
  SnsTopicArns: string[];
  IamRoleArn: string;
  ConfigurationName: string;
  LoggingLevel?: string;
  Tags?: Tag[];
}
export const CreateChimeWebhookConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WebhookDescription: SensitiveString,
      WebhookUrl: SensitiveString,
      SnsTopicArns: SnsTopicArnList,
      IamRoleArn: S.String,
      ConfigurationName: S.String,
      LoggingLevel: S.optional(S.String),
      Tags: S.optional(Tags),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/create-chime-webhook-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateChimeWebhookConfigurationRequest",
}) as any as S.Schema<CreateChimeWebhookConfigurationRequest>;
export type ResourceState = string;
export interface ChimeWebhookConfiguration {
  WebhookDescription: string | redacted.Redacted<string>;
  ChatConfigurationArn: string;
  IamRoleArn: string;
  SnsTopicArns: string[];
  ConfigurationName?: string;
  LoggingLevel?: string;
  Tags?: Tag[];
  State?: string;
  StateReason?: string;
}
export const ChimeWebhookConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WebhookDescription: SensitiveString,
    ChatConfigurationArn: S.String,
    IamRoleArn: S.String,
    SnsTopicArns: SnsTopicArnList,
    ConfigurationName: S.optional(S.String),
    LoggingLevel: S.optional(S.String),
    Tags: S.optional(Tags),
    State: S.optional(S.String),
    StateReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ChimeWebhookConfiguration",
}) as any as S.Schema<ChimeWebhookConfiguration>;
export interface CreateChimeWebhookConfigurationResult {
  WebhookConfiguration?: ChimeWebhookConfiguration;
}
export const CreateChimeWebhookConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WebhookConfiguration: S.optional(ChimeWebhookConfiguration),
    }).pipe(ns),
).annotate({
  identifier: "CreateChimeWebhookConfigurationResult",
}) as any as S.Schema<CreateChimeWebhookConfigurationResult>;
export interface CustomActionDefinition {
  CommandText: string;
}
export const CustomActionDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CommandText: S.String }),
).annotate({
  identifier: "CustomActionDefinition",
}) as any as S.Schema<CustomActionDefinition>;
export type CustomActionAliasName = string;
export type CustomActionAttachmentNotificationType = string;
export type CustomActionButtonText = string;
export type CustomActionAttachmentCriteriaOperator =
  | "HAS_VALUE"
  | "EQUALS"
  | (string & {});
export const CustomActionAttachmentCriteriaOperator = /*@__PURE__*/ S.String;

export interface CustomActionAttachmentCriteria {
  Operator: CustomActionAttachmentCriteriaOperator;
  VariableName: string;
  Value?: string;
}
export const CustomActionAttachmentCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Operator: CustomActionAttachmentCriteriaOperator,
    VariableName: S.String,
    Value: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomActionAttachmentCriteria",
}) as any as S.Schema<CustomActionAttachmentCriteria>;
export type CustomActionAttachmentCriteriaList =
  CustomActionAttachmentCriteria[];
export const CustomActionAttachmentCriteriaList = /*@__PURE__*/ S.Array(
  CustomActionAttachmentCriteria,
);
export type CustomActionAttachmentVariables = {
  [key: string]: string | undefined;
};
export const CustomActionAttachmentVariables = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CustomActionAttachment {
  NotificationType: string;
  ButtonText?: string;
  Criteria?: CustomActionAttachmentCriteria[];
  Variables?: { [key: string]: string | undefined };
}
export const CustomActionAttachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NotificationType: S.String,
    ButtonText: S.optional(S.String),
    Criteria: S.optional(CustomActionAttachmentCriteriaList),
    Variables: S.optional(CustomActionAttachmentVariables),
  }),
).annotate({
  identifier: "CustomActionAttachment",
}) as any as S.Schema<CustomActionAttachment>;
export type CustomActionAttachmentList = CustomActionAttachment[];
export const CustomActionAttachmentList = /*@__PURE__*/ S.Array(
  CustomActionAttachment,
);
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export type ClientToken = string;
export type CustomActionName = string;
export interface CreateCustomActionRequest {
  Definition: CustomActionDefinition;
  AliasName?: string;
  Attachments?: CustomActionAttachment[];
  Tags?: Tag[];
  ClientToken?: string;
  ActionName: string;
}
export const CreateCustomActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Definition: CustomActionDefinition,
    AliasName: S.optional(S.String),
    Attachments: S.optional(CustomActionAttachmentList),
    Tags: S.optional(TagList),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ActionName: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/create-custom-action" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCustomActionRequest",
}) as any as S.Schema<CreateCustomActionRequest>;
export type CustomActionArn = string;
export interface CreateCustomActionResult {
  CustomActionArn: string;
}
export const CreateCustomActionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CustomActionArn: S.String }).pipe(ns),
).annotate({
  identifier: "CreateCustomActionResult",
}) as any as S.Schema<CreateCustomActionResult>;
export type TeamsChannelId = string;
export type TeamsChannelName = string | redacted.Redacted<string>;
export type UUID = string;
export type TeamName = string | redacted.Redacted<string>;
export type GuardrailPolicyArn = string;
export type GuardrailPolicyArnList = string[];
export const GuardrailPolicyArnList = /*@__PURE__*/ S.Array(S.String);
export type BooleanAccountPreference = boolean;
export interface CreateTeamsChannelConfigurationRequest {
  ChannelId: string;
  ChannelName?: string | redacted.Redacted<string>;
  TeamId: string;
  TeamName?: string | redacted.Redacted<string>;
  TenantId: string;
  SnsTopicArns?: string[];
  IamRoleArn: string;
  ConfigurationName: string;
  LoggingLevel?: string;
  GuardrailPolicyArns?: string[];
  UserAuthorizationRequired?: boolean;
  Tags?: Tag[];
}
export const CreateTeamsChannelConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChannelId: S.String,
      ChannelName: S.optional(SensitiveString),
      TeamId: S.String,
      TeamName: S.optional(SensitiveString),
      TenantId: S.String,
      SnsTopicArns: S.optional(SnsTopicArnList),
      IamRoleArn: S.String,
      ConfigurationName: S.String,
      LoggingLevel: S.optional(S.String),
      GuardrailPolicyArns: S.optional(GuardrailPolicyArnList),
      UserAuthorizationRequired: S.optional(S.Boolean),
      Tags: S.optional(Tags),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/create-ms-teams-channel-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateTeamsChannelConfigurationRequest",
}) as any as S.Schema<CreateTeamsChannelConfigurationRequest>;
export interface TeamsChannelConfiguration {
  ChannelId: string;
  ChannelName?: string | redacted.Redacted<string>;
  TeamId: string;
  TeamName?: string | redacted.Redacted<string>;
  TenantId: string;
  ChatConfigurationArn: string;
  IamRoleArn: string;
  SnsTopicArns: string[];
  ConfigurationName?: string;
  LoggingLevel?: string;
  GuardrailPolicyArns?: string[];
  UserAuthorizationRequired?: boolean;
  Tags?: Tag[];
  State?: string;
  StateReason?: string;
}
export const TeamsChannelConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.String,
    ChannelName: S.optional(SensitiveString),
    TeamId: S.String,
    TeamName: S.optional(SensitiveString),
    TenantId: S.String,
    ChatConfigurationArn: S.String,
    IamRoleArn: S.String,
    SnsTopicArns: SnsTopicArnList,
    ConfigurationName: S.optional(S.String),
    LoggingLevel: S.optional(S.String),
    GuardrailPolicyArns: S.optional(GuardrailPolicyArnList),
    UserAuthorizationRequired: S.optional(S.Boolean),
    Tags: S.optional(Tags),
    State: S.optional(S.String),
    StateReason: S.optional(S.String),
  }),
).annotate({
  identifier: "TeamsChannelConfiguration",
}) as any as S.Schema<TeamsChannelConfiguration>;
export interface CreateTeamsChannelConfigurationResult {
  ChannelConfiguration?: TeamsChannelConfiguration;
}
export const CreateTeamsChannelConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChannelConfiguration: S.optional(TeamsChannelConfiguration),
    }).pipe(ns),
).annotate({
  identifier: "CreateTeamsChannelConfigurationResult",
}) as any as S.Schema<CreateTeamsChannelConfigurationResult>;
export type SlackTeamId = string;
export type SlackChannelId = string;
export type SlackChannelDisplayName = string | redacted.Redacted<string>;
export interface CreateSlackChannelConfigurationRequest {
  SlackTeamId: string;
  SlackChannelId: string;
  SlackChannelName?: string | redacted.Redacted<string>;
  SnsTopicArns?: string[];
  IamRoleArn: string;
  ConfigurationName: string;
  LoggingLevel?: string;
  GuardrailPolicyArns?: string[];
  UserAuthorizationRequired?: boolean;
  Tags?: Tag[];
}
export const CreateSlackChannelConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SlackTeamId: S.String,
      SlackChannelId: S.String,
      SlackChannelName: S.optional(SensitiveString),
      SnsTopicArns: S.optional(SnsTopicArnList),
      IamRoleArn: S.String,
      ConfigurationName: S.String,
      LoggingLevel: S.optional(S.String),
      GuardrailPolicyArns: S.optional(GuardrailPolicyArnList),
      UserAuthorizationRequired: S.optional(S.Boolean),
      Tags: S.optional(Tags),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/create-slack-channel-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateSlackChannelConfigurationRequest",
}) as any as S.Schema<CreateSlackChannelConfigurationRequest>;
export type SlackTeamName = string;
export interface SlackChannelConfiguration {
  SlackTeamName: string;
  SlackTeamId: string;
  SlackChannelId: string;
  SlackChannelName: string | redacted.Redacted<string>;
  ChatConfigurationArn: string;
  IamRoleArn: string;
  SnsTopicArns: string[];
  ConfigurationName?: string;
  LoggingLevel?: string;
  GuardrailPolicyArns?: string[];
  UserAuthorizationRequired?: boolean;
  Tags?: Tag[];
  State?: string;
  StateReason?: string;
}
export const SlackChannelConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SlackTeamName: S.String,
    SlackTeamId: S.String,
    SlackChannelId: S.String,
    SlackChannelName: SensitiveString,
    ChatConfigurationArn: S.String,
    IamRoleArn: S.String,
    SnsTopicArns: SnsTopicArnList,
    ConfigurationName: S.optional(S.String),
    LoggingLevel: S.optional(S.String),
    GuardrailPolicyArns: S.optional(GuardrailPolicyArnList),
    UserAuthorizationRequired: S.optional(S.Boolean),
    Tags: S.optional(Tags),
    State: S.optional(S.String),
    StateReason: S.optional(S.String),
  }),
).annotate({
  identifier: "SlackChannelConfiguration",
}) as any as S.Schema<SlackChannelConfiguration>;
export interface CreateSlackChannelConfigurationResult {
  ChannelConfiguration?: SlackChannelConfiguration;
}
export const CreateSlackChannelConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChannelConfiguration: S.optional(SlackChannelConfiguration),
    }).pipe(ns),
).annotate({
  identifier: "CreateSlackChannelConfigurationResult",
}) as any as S.Schema<CreateSlackChannelConfigurationResult>;
export interface DeleteChimeWebhookConfigurationRequest {
  ChatConfigurationArn: string;
}
export const DeleteChimeWebhookConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ChatConfigurationArn: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/delete-chime-webhook-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteChimeWebhookConfigurationRequest",
}) as any as S.Schema<DeleteChimeWebhookConfigurationRequest>;
export interface DeleteChimeWebhookConfigurationResult {}
export const DeleteChimeWebhookConfigurationResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteChimeWebhookConfigurationResult",
}) as any as S.Schema<DeleteChimeWebhookConfigurationResult>;
export interface DeleteCustomActionRequest {
  CustomActionArn: string;
}
export const DeleteCustomActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CustomActionArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/delete-custom-action" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomActionRequest",
}) as any as S.Schema<DeleteCustomActionRequest>;
export interface DeleteCustomActionResult {}
export const DeleteCustomActionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteCustomActionResult",
}) as any as S.Schema<DeleteCustomActionResult>;
export interface DeleteTeamsChannelConfigurationRequest {
  ChatConfigurationArn: string;
}
export const DeleteTeamsChannelConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ChatConfigurationArn: S.String }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/delete-ms-teams-channel-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteTeamsChannelConfigurationRequest",
}) as any as S.Schema<DeleteTeamsChannelConfigurationRequest>;
export interface DeleteTeamsChannelConfigurationResult {}
export const DeleteTeamsChannelConfigurationResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTeamsChannelConfigurationResult",
}) as any as S.Schema<DeleteTeamsChannelConfigurationResult>;
export interface DeleteTeamsConfiguredTeamRequest {
  TeamId: string;
}
export const DeleteTeamsConfiguredTeamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TeamId: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/delete-ms-teams-configured-teams" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTeamsConfiguredTeamRequest",
}) as any as S.Schema<DeleteTeamsConfiguredTeamRequest>;
export interface DeleteTeamsConfiguredTeamResult {}
export const DeleteTeamsConfiguredTeamResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteTeamsConfiguredTeamResult",
}) as any as S.Schema<DeleteTeamsConfiguredTeamResult>;
export interface DeleteMicrosoftTeamsUserIdentityRequest {
  ChatConfigurationArn: string;
  UserId: string;
}
export const DeleteMicrosoftTeamsUserIdentityRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ChatConfigurationArn: S.String, UserId: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/delete-ms-teams-user-identity" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteMicrosoftTeamsUserIdentityRequest",
}) as any as S.Schema<DeleteMicrosoftTeamsUserIdentityRequest>;
export interface DeleteMicrosoftTeamsUserIdentityResult {}
export const DeleteMicrosoftTeamsUserIdentityResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteMicrosoftTeamsUserIdentityResult",
}) as any as S.Schema<DeleteMicrosoftTeamsUserIdentityResult>;
export interface DeleteSlackChannelConfigurationRequest {
  ChatConfigurationArn: string;
}
export const DeleteSlackChannelConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ ChatConfigurationArn: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/delete-slack-channel-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteSlackChannelConfigurationRequest",
}) as any as S.Schema<DeleteSlackChannelConfigurationRequest>;
export interface DeleteSlackChannelConfigurationResult {}
export const DeleteSlackChannelConfigurationResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteSlackChannelConfigurationResult",
}) as any as S.Schema<DeleteSlackChannelConfigurationResult>;
export type SlackUserId = string;
export interface DeleteSlackUserIdentityRequest {
  ChatConfigurationArn: string;
  SlackTeamId: string;
  SlackUserId: string;
}
export const DeleteSlackUserIdentityRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChatConfigurationArn: S.String,
    SlackTeamId: S.String,
    SlackUserId: S.String,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/delete-slack-user-identity" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSlackUserIdentityRequest",
}) as any as S.Schema<DeleteSlackUserIdentityRequest>;
export interface DeleteSlackUserIdentityResult {}
export const DeleteSlackUserIdentityResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteSlackUserIdentityResult",
}) as any as S.Schema<DeleteSlackUserIdentityResult>;
export interface DeleteSlackWorkspaceAuthorizationRequest {
  SlackTeamId: string;
}
export const DeleteSlackWorkspaceAuthorizationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ SlackTeamId: S.String }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/delete-slack-workspace-authorization",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteSlackWorkspaceAuthorizationRequest",
}) as any as S.Schema<DeleteSlackWorkspaceAuthorizationRequest>;
export interface DeleteSlackWorkspaceAuthorizationResult {}
export const DeleteSlackWorkspaceAuthorizationResult = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteSlackWorkspaceAuthorizationResult",
}) as any as S.Schema<DeleteSlackWorkspaceAuthorizationResult>;
export type MaxResults = number;
export type PaginationToken = string;
export interface DescribeChimeWebhookConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
  ChatConfigurationArn?: string;
}
export const DescribeChimeWebhookConfigurationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      ChatConfigurationArn: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/describe-chime-webhook-configurations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeChimeWebhookConfigurationsRequest",
  }) as any as S.Schema<DescribeChimeWebhookConfigurationsRequest>;
export type ChimeWebhookConfigurationList = ChimeWebhookConfiguration[];
export const ChimeWebhookConfigurationList = /*@__PURE__*/ S.Array(
  ChimeWebhookConfiguration,
);
export interface DescribeChimeWebhookConfigurationsResult {
  NextToken?: string;
  WebhookConfigurations?: ChimeWebhookConfiguration[];
}
export const DescribeChimeWebhookConfigurationsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      WebhookConfigurations: S.optional(ChimeWebhookConfigurationList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeChimeWebhookConfigurationsResult",
}) as any as S.Schema<DescribeChimeWebhookConfigurationsResult>;
export interface DescribeSlackChannelConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
  ChatConfigurationArn?: string;
}
export const DescribeSlackChannelConfigurationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      ChatConfigurationArn: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/describe-slack-channel-configurations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeSlackChannelConfigurationsRequest",
  }) as any as S.Schema<DescribeSlackChannelConfigurationsRequest>;
export type SlackChannelConfigurationList = SlackChannelConfiguration[];
export const SlackChannelConfigurationList = /*@__PURE__*/ S.Array(
  SlackChannelConfiguration,
);
export interface DescribeSlackChannelConfigurationsResult {
  NextToken?: string;
  SlackChannelConfigurations?: SlackChannelConfiguration[];
}
export const DescribeSlackChannelConfigurationsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      SlackChannelConfigurations: S.optional(SlackChannelConfigurationList),
    }).pipe(ns),
).annotate({
  identifier: "DescribeSlackChannelConfigurationsResult",
}) as any as S.Schema<DescribeSlackChannelConfigurationsResult>;
export interface DescribeSlackUserIdentitiesRequest {
  ChatConfigurationArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const DescribeSlackUserIdentitiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChatConfigurationArn: S.optional(S.String),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/describe-slack-user-identities" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSlackUserIdentitiesRequest",
}) as any as S.Schema<DescribeSlackUserIdentitiesRequest>;
export type AwsUserIdentity = string;
export interface SlackUserIdentity {
  IamRoleArn: string;
  ChatConfigurationArn: string;
  SlackTeamId: string;
  SlackUserId: string;
  AwsUserIdentity?: string;
}
export const SlackUserIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IamRoleArn: S.String,
    ChatConfigurationArn: S.String,
    SlackTeamId: S.String,
    SlackUserId: S.String,
    AwsUserIdentity: S.optional(S.String),
  }),
).annotate({
  identifier: "SlackUserIdentity",
}) as any as S.Schema<SlackUserIdentity>;
export type SlackUserIdentitiesList = SlackUserIdentity[];
export const SlackUserIdentitiesList = /*@__PURE__*/ S.Array(SlackUserIdentity);
export interface DescribeSlackUserIdentitiesResult {
  SlackUserIdentities?: SlackUserIdentity[];
  NextToken?: string;
}
export const DescribeSlackUserIdentitiesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SlackUserIdentities: S.optional(SlackUserIdentitiesList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeSlackUserIdentitiesResult",
}) as any as S.Schema<DescribeSlackUserIdentitiesResult>;
export interface DescribeSlackWorkspacesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeSlackWorkspacesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/describe-slack-workspaces" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSlackWorkspacesRequest",
}) as any as S.Schema<DescribeSlackWorkspacesRequest>;
export interface SlackWorkspace {
  SlackTeamId: string;
  SlackTeamName: string;
  State?: string;
  StateReason?: string;
}
export const SlackWorkspace = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SlackTeamId: S.String,
    SlackTeamName: S.String,
    State: S.optional(S.String),
    StateReason: S.optional(S.String),
  }),
).annotate({ identifier: "SlackWorkspace" }) as any as S.Schema<SlackWorkspace>;
export type SlackWorkspacesList = SlackWorkspace[];
export const SlackWorkspacesList = /*@__PURE__*/ S.Array(SlackWorkspace);
export interface DescribeSlackWorkspacesResult {
  SlackWorkspaces?: SlackWorkspace[];
  NextToken?: string;
}
export const DescribeSlackWorkspacesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SlackWorkspaces: S.optional(SlackWorkspacesList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeSlackWorkspacesResult",
}) as any as S.Schema<DescribeSlackWorkspacesResult>;
export interface DisassociateFromConfigurationRequest {
  Resource: string;
  ChatConfiguration: string;
}
export const DisassociateFromConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Resource: S.String, ChatConfiguration: S.String }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/disassociate-from-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DisassociateFromConfigurationRequest",
}) as any as S.Schema<DisassociateFromConfigurationRequest>;
export interface DisassociateFromConfigurationResult {}
export const DisassociateFromConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DisassociateFromConfigurationResult",
}) as any as S.Schema<DisassociateFromConfigurationResult>;
export interface GetAccountPreferencesRequest {}
export const GetAccountPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/get-account-preferences" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetAccountPreferencesRequest",
}) as any as S.Schema<GetAccountPreferencesRequest>;
export interface AccountPreferences {
  UserAuthorizationRequired?: boolean;
  TrainingDataCollectionEnabled?: boolean;
}
export const AccountPreferences = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserAuthorizationRequired: S.optional(S.Boolean),
    TrainingDataCollectionEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AccountPreferences",
}) as any as S.Schema<AccountPreferences>;
export interface GetAccountPreferencesResult {
  AccountPreferences?: AccountPreferences;
}
export const GetAccountPreferencesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountPreferences: S.optional(AccountPreferences) }).pipe(ns),
).annotate({
  identifier: "GetAccountPreferencesResult",
}) as any as S.Schema<GetAccountPreferencesResult>;
export interface GetCustomActionRequest {
  CustomActionArn: string;
}
export const GetCustomActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CustomActionArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/get-custom-action" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCustomActionRequest",
}) as any as S.Schema<GetCustomActionRequest>;
export interface CustomAction {
  CustomActionArn: string;
  Definition: CustomActionDefinition;
  AliasName?: string;
  Attachments?: CustomActionAttachment[];
  ActionName?: string;
}
export const CustomAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomActionArn: S.String,
    Definition: CustomActionDefinition,
    AliasName: S.optional(S.String),
    Attachments: S.optional(CustomActionAttachmentList),
    ActionName: S.optional(S.String),
  }),
).annotate({ identifier: "CustomAction" }) as any as S.Schema<CustomAction>;
export interface GetCustomActionResult {
  CustomAction?: CustomAction;
}
export const GetCustomActionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CustomAction: S.optional(CustomAction) }).pipe(ns),
).annotate({
  identifier: "GetCustomActionResult",
}) as any as S.Schema<GetCustomActionResult>;
export interface GetTeamsChannelConfigurationRequest {
  ChatConfigurationArn: string;
}
export const GetTeamsChannelConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChatConfigurationArn: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/get-ms-teams-channel-configuration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTeamsChannelConfigurationRequest",
}) as any as S.Schema<GetTeamsChannelConfigurationRequest>;
export interface GetTeamsChannelConfigurationResult {
  ChannelConfiguration?: TeamsChannelConfiguration;
}
export const GetTeamsChannelConfigurationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelConfiguration: S.optional(TeamsChannelConfiguration),
  }).pipe(ns),
).annotate({
  identifier: "GetTeamsChannelConfigurationResult",
}) as any as S.Schema<GetTeamsChannelConfigurationResult>;
export interface ListAssociationsRequest {
  ChatConfiguration: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChatConfiguration: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/list-associations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssociationsRequest",
}) as any as S.Schema<ListAssociationsRequest>;
export interface AssociationListing {
  Resource: string;
}
export const AssociationListing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Resource: S.String }),
).annotate({
  identifier: "AssociationListing",
}) as any as S.Schema<AssociationListing>;
export type AssociationList = AssociationListing[];
export const AssociationList = /*@__PURE__*/ S.Array(AssociationListing);
export interface ListAssociationsResult {
  Associations: AssociationListing[];
  NextToken?: string;
}
export const ListAssociationsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Associations: AssociationList,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListAssociationsResult",
}) as any as S.Schema<ListAssociationsResult>;
export interface ListCustomActionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListCustomActionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/list-custom-actions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomActionsRequest",
}) as any as S.Schema<ListCustomActionsRequest>;
export type CustomActionArnList = string[];
export const CustomActionArnList = /*@__PURE__*/ S.Array(S.String);
export interface ListCustomActionsResult {
  CustomActions: string[];
  NextToken?: string;
}
export const ListCustomActionsResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomActions: CustomActionArnList,
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListCustomActionsResult",
}) as any as S.Schema<ListCustomActionsResult>;
export interface ListTeamsChannelConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
  TeamId?: string;
}
export const ListTeamsChannelConfigurationsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
      TeamId: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/list-ms-teams-channel-configurations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListTeamsChannelConfigurationsRequest",
}) as any as S.Schema<ListTeamsChannelConfigurationsRequest>;
export type TeamChannelConfigurationsList = TeamsChannelConfiguration[];
export const TeamChannelConfigurationsList = /*@__PURE__*/ S.Array(
  TeamsChannelConfiguration,
);
export interface ListTeamsChannelConfigurationsResult {
  NextToken?: string;
  TeamChannelConfigurations?: TeamsChannelConfiguration[];
}
export const ListTeamsChannelConfigurationsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NextToken: S.optional(S.String),
      TeamChannelConfigurations: S.optional(TeamChannelConfigurationsList),
    }).pipe(ns),
).annotate({
  identifier: "ListTeamsChannelConfigurationsResult",
}) as any as S.Schema<ListTeamsChannelConfigurationsResult>;
export interface ListMicrosoftTeamsConfiguredTeamsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListMicrosoftTeamsConfiguredTeamsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/list-ms-teams-configured-teams" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListMicrosoftTeamsConfiguredTeamsRequest",
}) as any as S.Schema<ListMicrosoftTeamsConfiguredTeamsRequest>;
export interface ConfiguredTeam {
  TenantId: string;
  TeamId: string;
  TeamName?: string;
  State?: string;
  StateReason?: string;
}
export const ConfiguredTeam = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TenantId: S.String,
    TeamId: S.String,
    TeamName: S.optional(S.String),
    State: S.optional(S.String),
    StateReason: S.optional(S.String),
  }),
).annotate({ identifier: "ConfiguredTeam" }) as any as S.Schema<ConfiguredTeam>;
export type ConfiguredTeamsList = ConfiguredTeam[];
export const ConfiguredTeamsList = /*@__PURE__*/ S.Array(ConfiguredTeam);
export interface ListMicrosoftTeamsConfiguredTeamsResult {
  ConfiguredTeams?: ConfiguredTeam[];
  NextToken?: string;
}
export const ListMicrosoftTeamsConfiguredTeamsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ConfiguredTeams: S.optional(ConfiguredTeamsList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListMicrosoftTeamsConfiguredTeamsResult",
}) as any as S.Schema<ListMicrosoftTeamsConfiguredTeamsResult>;
export interface ListMicrosoftTeamsUserIdentitiesRequest {
  ChatConfigurationArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListMicrosoftTeamsUserIdentitiesRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChatConfigurationArn: S.optional(S.String),
      NextToken: S.optional(S.String),
      MaxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/list-ms-teams-user-identities" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListMicrosoftTeamsUserIdentitiesRequest",
}) as any as S.Schema<ListMicrosoftTeamsUserIdentitiesRequest>;
export interface TeamsUserIdentity {
  IamRoleArn: string;
  ChatConfigurationArn: string;
  TeamId: string;
  UserId?: string;
  AwsUserIdentity?: string;
  TeamsChannelId?: string;
  TeamsTenantId?: string;
}
export const TeamsUserIdentity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IamRoleArn: S.String,
    ChatConfigurationArn: S.String,
    TeamId: S.String,
    UserId: S.optional(S.String),
    AwsUserIdentity: S.optional(S.String),
    TeamsChannelId: S.optional(S.String),
    TeamsTenantId: S.optional(S.String),
  }),
).annotate({
  identifier: "TeamsUserIdentity",
}) as any as S.Schema<TeamsUserIdentity>;
export type TeamsUserIdentitiesList = TeamsUserIdentity[];
export const TeamsUserIdentitiesList = /*@__PURE__*/ S.Array(TeamsUserIdentity);
export interface ListMicrosoftTeamsUserIdentitiesResult {
  TeamsUserIdentities?: TeamsUserIdentity[];
  NextToken?: string;
}
export const ListMicrosoftTeamsUserIdentitiesResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      TeamsUserIdentities: S.optional(TeamsUserIdentitiesList),
      NextToken: S.optional(S.String),
    }).pipe(ns),
).annotate({
  identifier: "ListMicrosoftTeamsUserIdentitiesResult",
}) as any as S.Schema<ListMicrosoftTeamsUserIdentitiesResult>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/list-tags-for-resource" }),
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
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/tag-resource" }),
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
  S.Struct({}).pipe(ns),
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
      ns,
      T.Http({ method: "POST", uri: "/untag-resource" }),
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
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateAccountPreferencesRequest {
  UserAuthorizationRequired?: boolean;
  TrainingDataCollectionEnabled?: boolean;
}
export const UpdateAccountPreferencesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UserAuthorizationRequired: S.optional(S.Boolean),
    TrainingDataCollectionEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/update-account-preferences" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateAccountPreferencesRequest",
}) as any as S.Schema<UpdateAccountPreferencesRequest>;
export interface UpdateAccountPreferencesResult {
  AccountPreferences?: AccountPreferences;
}
export const UpdateAccountPreferencesResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountPreferences: S.optional(AccountPreferences) }).pipe(ns),
).annotate({
  identifier: "UpdateAccountPreferencesResult",
}) as any as S.Schema<UpdateAccountPreferencesResult>;
export interface UpdateChimeWebhookConfigurationRequest {
  ChatConfigurationArn: string;
  WebhookDescription?: string | redacted.Redacted<string>;
  WebhookUrl?: string | redacted.Redacted<string>;
  SnsTopicArns?: string[];
  IamRoleArn?: string;
  LoggingLevel?: string;
}
export const UpdateChimeWebhookConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChatConfigurationArn: S.String,
      WebhookDescription: S.optional(SensitiveString),
      WebhookUrl: S.optional(SensitiveString),
      SnsTopicArns: S.optional(SnsTopicArnList),
      IamRoleArn: S.optional(S.String),
      LoggingLevel: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/update-chime-webhook-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateChimeWebhookConfigurationRequest",
}) as any as S.Schema<UpdateChimeWebhookConfigurationRequest>;
export interface UpdateChimeWebhookConfigurationResult {
  WebhookConfiguration?: ChimeWebhookConfiguration;
}
export const UpdateChimeWebhookConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      WebhookConfiguration: S.optional(ChimeWebhookConfiguration),
    }).pipe(ns),
).annotate({
  identifier: "UpdateChimeWebhookConfigurationResult",
}) as any as S.Schema<UpdateChimeWebhookConfigurationResult>;
export interface UpdateCustomActionRequest {
  CustomActionArn: string;
  Definition: CustomActionDefinition;
  AliasName?: string;
  Attachments?: CustomActionAttachment[];
}
export const UpdateCustomActionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomActionArn: S.String,
    Definition: CustomActionDefinition,
    AliasName: S.optional(S.String),
    Attachments: S.optional(CustomActionAttachmentList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/update-custom-action" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCustomActionRequest",
}) as any as S.Schema<UpdateCustomActionRequest>;
export interface UpdateCustomActionResult {
  CustomActionArn: string;
}
export const UpdateCustomActionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CustomActionArn: S.String }).pipe(ns),
).annotate({
  identifier: "UpdateCustomActionResult",
}) as any as S.Schema<UpdateCustomActionResult>;
export interface UpdateTeamsChannelConfigurationRequest {
  ChatConfigurationArn: string;
  ChannelId: string;
  ChannelName?: string | redacted.Redacted<string>;
  SnsTopicArns?: string[];
  IamRoleArn?: string;
  LoggingLevel?: string;
  GuardrailPolicyArns?: string[];
  UserAuthorizationRequired?: boolean;
}
export const UpdateTeamsChannelConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChatConfigurationArn: S.String,
      ChannelId: S.String,
      ChannelName: S.optional(SensitiveString),
      SnsTopicArns: S.optional(SnsTopicArnList),
      IamRoleArn: S.optional(S.String),
      LoggingLevel: S.optional(S.String),
      GuardrailPolicyArns: S.optional(GuardrailPolicyArnList),
      UserAuthorizationRequired: S.optional(S.Boolean),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/update-ms-teams-channel-configuration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateTeamsChannelConfigurationRequest",
}) as any as S.Schema<UpdateTeamsChannelConfigurationRequest>;
export interface UpdateTeamsChannelConfigurationResult {
  ChannelConfiguration?: TeamsChannelConfiguration;
}
export const UpdateTeamsChannelConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChannelConfiguration: S.optional(TeamsChannelConfiguration),
    }).pipe(ns),
).annotate({
  identifier: "UpdateTeamsChannelConfigurationResult",
}) as any as S.Schema<UpdateTeamsChannelConfigurationResult>;
export interface UpdateSlackChannelConfigurationRequest {
  ChatConfigurationArn: string;
  SlackChannelId: string;
  SlackChannelName?: string | redacted.Redacted<string>;
  SnsTopicArns?: string[];
  IamRoleArn?: string;
  LoggingLevel?: string;
  GuardrailPolicyArns?: string[];
  UserAuthorizationRequired?: boolean;
}
export const UpdateSlackChannelConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChatConfigurationArn: S.String,
      SlackChannelId: S.String,
      SlackChannelName: S.optional(SensitiveString),
      SnsTopicArns: S.optional(SnsTopicArnList),
      IamRoleArn: S.optional(S.String),
      LoggingLevel: S.optional(S.String),
      GuardrailPolicyArns: S.optional(GuardrailPolicyArnList),
      UserAuthorizationRequired: S.optional(S.Boolean),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/update-slack-channel-configuration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateSlackChannelConfigurationRequest",
}) as any as S.Schema<UpdateSlackChannelConfigurationRequest>;
export interface UpdateSlackChannelConfigurationResult {
  ChannelConfiguration?: SlackChannelConfiguration;
}
export const UpdateSlackChannelConfigurationResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChannelConfiguration: S.optional(SlackChannelConfiguration),
    }).pipe(ns),
).annotate({
  identifier: "UpdateSlackChannelConfigurationResult",
}) as any as S.Schema<UpdateSlackChannelConfigurationResult>;
export type ErrorMessage = string;
export type AssociateToConfigurationError =
  | InternalServiceError
  | InvalidRequestException
  | UnauthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Links a resource (for example, a custom action) to a channel configuration.
 */
export const associateToConfiguration: API.OperationMethod<
  AssociateToConfigurationRequest,
  AssociateToConfigurationResult,
  AssociateToConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateToConfigurationRequest,
  output: AssociateToConfigurationResult,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    UnauthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateToConfiguration",
}));

export type CreateChimeWebhookConfigurationError =
  | ConflictException
  | CreateChimeWebhookConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates an AWS Chatbot configuration for Amazon Chime.
 */
export const createChimeWebhookConfiguration: API.OperationMethod<
  CreateChimeWebhookConfigurationRequest,
  CreateChimeWebhookConfigurationResult,
  CreateChimeWebhookConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChimeWebhookConfigurationRequest,
  output: CreateChimeWebhookConfigurationResult,
  errors: [
    ConflictException,
    CreateChimeWebhookConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChimeWebhookConfiguration",
}));

export type CreateCustomActionError =
  | ConflictException
  | InternalServiceError
  | InvalidRequestException
  | LimitExceededException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a custom action that can be invoked as an alias or as a button on a notification.
 */
export const createCustomAction: API.OperationMethod<
  CreateCustomActionRequest,
  CreateCustomActionResult,
  CreateCustomActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCustomActionRequest,
  output: CreateCustomActionResult,
  errors: [
    ConflictException,
    InternalServiceError,
    InvalidRequestException,
    LimitExceededException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomAction",
}));

export type CreateMicrosoftTeamsChannelConfigurationError =
  | ConflictException
  | CreateTeamsChannelConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | MicrosoftTeamsTeamNotConfigured
  | CommonErrors;
/**
 * Creates an AWS Chatbot configuration for Microsoft Teams.
 */
export const createMicrosoftTeamsChannelConfiguration: API.OperationMethod<
  CreateTeamsChannelConfigurationRequest,
  CreateTeamsChannelConfigurationResult,
  CreateMicrosoftTeamsChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTeamsChannelConfigurationRequest,
  output: CreateTeamsChannelConfigurationResult,
  errors: [
    ConflictException,
    CreateTeamsChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    MicrosoftTeamsTeamNotConfigured,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMicrosoftTeamsChannelConfiguration",
}));

export type CreateSlackChannelConfigurationError =
  | ConflictException
  | CreateSlackChannelConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | SlackWorkspaceNotAuthorized
  | CommonErrors;
/**
 * Creates an AWS Chatbot confugration for Slack.
 */
export const createSlackChannelConfiguration: API.OperationMethod<
  CreateSlackChannelConfigurationRequest,
  CreateSlackChannelConfigurationResult,
  CreateSlackChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSlackChannelConfigurationRequest,
  output: CreateSlackChannelConfigurationResult,
  errors: [
    ConflictException,
    CreateSlackChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    SlackWorkspaceNotAuthorized,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSlackChannelConfiguration",
}));

export type DeleteChimeWebhookConfigurationError =
  | DeleteChimeWebhookConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a Amazon Chime webhook configuration for AWS Chatbot.
 */
export const deleteChimeWebhookConfiguration: API.OperationMethod<
  DeleteChimeWebhookConfigurationRequest,
  DeleteChimeWebhookConfigurationResult,
  DeleteChimeWebhookConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChimeWebhookConfigurationRequest,
  output: DeleteChimeWebhookConfigurationResult,
  errors: [
    DeleteChimeWebhookConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChimeWebhookConfiguration",
}));

export type DeleteCustomActionError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Deletes a custom action.
 */
export const deleteCustomAction: API.OperationMethod<
  DeleteCustomActionRequest,
  DeleteCustomActionResult,
  DeleteCustomActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomActionRequest,
  output: DeleteCustomActionResult,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomAction",
}));

export type DeleteMicrosoftTeamsChannelConfigurationError =
  | DeleteTeamsChannelConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a Microsoft Teams channel configuration for AWS Chatbot
 */
export const deleteMicrosoftTeamsChannelConfiguration: API.OperationMethod<
  DeleteTeamsChannelConfigurationRequest,
  DeleteTeamsChannelConfigurationResult,
  DeleteMicrosoftTeamsChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTeamsChannelConfigurationRequest,
  output: DeleteTeamsChannelConfigurationResult,
  errors: [
    DeleteTeamsChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMicrosoftTeamsChannelConfiguration",
}));

export type DeleteMicrosoftTeamsConfiguredTeamError =
  | DeleteTeamsConfiguredTeamException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the Microsoft Teams team authorization allowing for channels to be configured in that Microsoft Teams team. Note that the Microsoft Teams team must have no channels configured to remove it.
 */
export const deleteMicrosoftTeamsConfiguredTeam: API.OperationMethod<
  DeleteTeamsConfiguredTeamRequest,
  DeleteTeamsConfiguredTeamResult,
  DeleteMicrosoftTeamsConfiguredTeamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTeamsConfiguredTeamRequest,
  output: DeleteTeamsConfiguredTeamResult,
  errors: [
    DeleteTeamsConfiguredTeamException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMicrosoftTeamsConfiguredTeam",
}));

export type DeleteMicrosoftTeamsUserIdentityError =
  | DeleteMicrosoftTeamsUserIdentityException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Identifes a user level permission for a channel configuration.
 */
export const deleteMicrosoftTeamsUserIdentity: API.OperationMethod<
  DeleteMicrosoftTeamsUserIdentityRequest,
  DeleteMicrosoftTeamsUserIdentityResult,
  DeleteMicrosoftTeamsUserIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMicrosoftTeamsUserIdentityRequest,
  output: DeleteMicrosoftTeamsUserIdentityResult,
  errors: [
    DeleteMicrosoftTeamsUserIdentityException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMicrosoftTeamsUserIdentity",
}));

export type DeleteSlackChannelConfigurationError =
  | DeleteSlackChannelConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a Slack channel configuration for AWS Chatbot
 */
export const deleteSlackChannelConfiguration: API.OperationMethod<
  DeleteSlackChannelConfigurationRequest,
  DeleteSlackChannelConfigurationResult,
  DeleteSlackChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSlackChannelConfigurationRequest,
  output: DeleteSlackChannelConfigurationResult,
  errors: [
    DeleteSlackChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackChannelConfiguration",
}));

export type DeleteSlackUserIdentityError =
  | DeleteSlackUserIdentityException
  | InvalidParameterException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a user level permission for a Slack channel configuration.
 */
export const deleteSlackUserIdentity: API.OperationMethod<
  DeleteSlackUserIdentityRequest,
  DeleteSlackUserIdentityResult,
  DeleteSlackUserIdentityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSlackUserIdentityRequest,
  output: DeleteSlackUserIdentityResult,
  errors: [
    DeleteSlackUserIdentityException,
    InvalidParameterException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackUserIdentity",
}));

export type DeleteSlackWorkspaceAuthorizationError =
  | DeleteSlackWorkspaceAuthorizationFault
  | InvalidParameterException
  | CommonErrors;
/**
 * Deletes the Slack workspace authorization that allows channels to be configured in that workspace. This requires all configured channels in the workspace to be deleted.
 */
export const deleteSlackWorkspaceAuthorization: API.OperationMethod<
  DeleteSlackWorkspaceAuthorizationRequest,
  DeleteSlackWorkspaceAuthorizationResult,
  DeleteSlackWorkspaceAuthorizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSlackWorkspaceAuthorizationRequest,
  output: DeleteSlackWorkspaceAuthorizationResult,
  errors: [DeleteSlackWorkspaceAuthorizationFault, InvalidParameterException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlackWorkspaceAuthorization",
}));

export type DescribeChimeWebhookConfigurationsError =
  | DescribeChimeWebhookConfigurationsException
  | InvalidParameterException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists Amazon Chime webhook configurations optionally filtered by ChatConfigurationArn
 */
export const describeChimeWebhookConfigurations: API.PaginatedOperationMethod<
  DescribeChimeWebhookConfigurationsRequest,
  DescribeChimeWebhookConfigurationsResult,
  DescribeChimeWebhookConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ChimeWebhookConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeChimeWebhookConfigurationsRequest,
  output: DescribeChimeWebhookConfigurationsResult,
  errors: [
    DescribeChimeWebhookConfigurationsException,
    InvalidParameterException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChimeWebhookConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WebhookConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSlackChannelConfigurationsError =
  | DescribeSlackChannelConfigurationsException
  | InvalidParameterException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists Slack channel configurations optionally filtered by ChatConfigurationArn
 */
export const describeSlackChannelConfigurations: API.PaginatedOperationMethod<
  DescribeSlackChannelConfigurationsRequest,
  DescribeSlackChannelConfigurationsResult,
  DescribeSlackChannelConfigurationsError,
  Credentials | HttpClient.HttpClient,
  SlackChannelConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSlackChannelConfigurationsRequest,
  output: DescribeSlackChannelConfigurationsResult,
  errors: [
    DescribeSlackChannelConfigurationsException,
    InvalidParameterException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSlackChannelConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SlackChannelConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSlackUserIdentitiesError =
  | DescribeSlackUserIdentitiesException
  | InvalidParameterException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists all Slack user identities with a mapped role.
 */
export const describeSlackUserIdentities: API.PaginatedOperationMethod<
  DescribeSlackUserIdentitiesRequest,
  DescribeSlackUserIdentitiesResult,
  DescribeSlackUserIdentitiesError,
  Credentials | HttpClient.HttpClient,
  SlackUserIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSlackUserIdentitiesRequest,
  output: DescribeSlackUserIdentitiesResult,
  errors: [
    DescribeSlackUserIdentitiesException,
    InvalidParameterException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSlackUserIdentities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SlackUserIdentities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSlackWorkspacesError =
  | DescribeSlackWorkspacesException
  | InvalidParameterException
  | InvalidRequestException
  | CommonErrors;
/**
 * List all authorized Slack workspaces connected to the AWS Account onboarded with AWS Chatbot.
 */
export const describeSlackWorkspaces: API.PaginatedOperationMethod<
  DescribeSlackWorkspacesRequest,
  DescribeSlackWorkspacesResult,
  DescribeSlackWorkspacesError,
  Credentials | HttpClient.HttpClient,
  SlackWorkspace
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeSlackWorkspacesRequest,
  output: DescribeSlackWorkspacesResult,
  errors: [
    DescribeSlackWorkspacesException,
    InvalidParameterException,
    InvalidRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSlackWorkspaces",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SlackWorkspaces",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisassociateFromConfigurationError =
  | InternalServiceError
  | InvalidRequestException
  | UnauthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Unlink a resource, for example a custom action, from a channel configuration.
 */
export const disassociateFromConfiguration: API.OperationMethod<
  DisassociateFromConfigurationRequest,
  DisassociateFromConfigurationResult,
  DisassociateFromConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateFromConfigurationRequest,
  output: DisassociateFromConfigurationResult,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    UnauthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFromConfiguration",
}));

export type GetAccountPreferencesError =
  | GetAccountPreferencesException
  | InvalidRequestException
  | CommonErrors;
/**
 * Returns AWS Chatbot account preferences.
 */
export const getAccountPreferences: API.OperationMethod<
  GetAccountPreferencesRequest,
  GetAccountPreferencesResult,
  GetAccountPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetAccountPreferencesRequest,
  output: GetAccountPreferencesResult,
  errors: [GetAccountPreferencesException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountPreferences",
}));

export type GetCustomActionError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a custom action.
 */
export const getCustomAction: API.OperationMethod<
  GetCustomActionRequest,
  GetCustomActionResult,
  GetCustomActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCustomActionRequest,
  output: GetCustomActionResult,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomAction",
}));

export type GetMicrosoftTeamsChannelConfigurationError =
  | GetTeamsChannelConfigurationException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a Microsoft Teams channel configuration in an AWS account.
 */
export const getMicrosoftTeamsChannelConfiguration: API.OperationMethod<
  GetTeamsChannelConfigurationRequest,
  GetTeamsChannelConfigurationResult,
  GetMicrosoftTeamsChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTeamsChannelConfigurationRequest,
  output: GetTeamsChannelConfigurationResult,
  errors: [
    GetTeamsChannelConfigurationException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMicrosoftTeamsChannelConfiguration",
}));

export type ListAssociationsError = InvalidRequestException | CommonErrors;
/**
 * Lists resources associated with a channel configuration.
 */
export const listAssociations: API.PaginatedOperationMethod<
  ListAssociationsRequest,
  ListAssociationsResult,
  ListAssociationsError,
  Credentials | HttpClient.HttpClient,
  AssociationListing
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssociationsRequest,
  output: ListAssociationsResult,
  errors: [InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Associations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCustomActionsError =
  | InternalServiceError
  | InvalidRequestException
  | UnauthorizedException
  | CommonErrors;
/**
 * Lists custom actions defined in this account.
 */
export const listCustomActions: API.PaginatedOperationMethod<
  ListCustomActionsRequest,
  ListCustomActionsResult,
  ListCustomActionsError,
  Credentials | HttpClient.HttpClient,
  CustomActionArn
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomActionsRequest,
  output: ListCustomActionsResult,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomActions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CustomActions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMicrosoftTeamsChannelConfigurationsError =
  | InvalidParameterException
  | InvalidRequestException
  | ListTeamsChannelConfigurationsException
  | CommonErrors;
/**
 * Lists all AWS Chatbot Microsoft Teams channel configurations in an AWS account.
 */
export const listMicrosoftTeamsChannelConfigurations: API.PaginatedOperationMethod<
  ListTeamsChannelConfigurationsRequest,
  ListTeamsChannelConfigurationsResult,
  ListMicrosoftTeamsChannelConfigurationsError,
  Credentials | HttpClient.HttpClient,
  TeamsChannelConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTeamsChannelConfigurationsRequest,
  output: ListTeamsChannelConfigurationsResult,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ListTeamsChannelConfigurationsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrosoftTeamsChannelConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TeamChannelConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMicrosoftTeamsConfiguredTeamsError =
  | InvalidParameterException
  | InvalidRequestException
  | ListMicrosoftTeamsConfiguredTeamsException
  | CommonErrors;
/**
 * Lists all authorized Microsoft Teams for an AWS Account
 */
export const listMicrosoftTeamsConfiguredTeams: API.PaginatedOperationMethod<
  ListMicrosoftTeamsConfiguredTeamsRequest,
  ListMicrosoftTeamsConfiguredTeamsResult,
  ListMicrosoftTeamsConfiguredTeamsError,
  Credentials | HttpClient.HttpClient,
  ConfiguredTeam
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMicrosoftTeamsConfiguredTeamsRequest,
  output: ListMicrosoftTeamsConfiguredTeamsResult,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ListMicrosoftTeamsConfiguredTeamsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrosoftTeamsConfiguredTeams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ConfiguredTeams",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMicrosoftTeamsUserIdentitiesError =
  | InvalidParameterException
  | InvalidRequestException
  | ListMicrosoftTeamsUserIdentitiesException
  | CommonErrors;
/**
 * A list all Microsoft Teams user identities with a mapped role.
 */
export const listMicrosoftTeamsUserIdentities: API.PaginatedOperationMethod<
  ListMicrosoftTeamsUserIdentitiesRequest,
  ListMicrosoftTeamsUserIdentitiesResult,
  ListMicrosoftTeamsUserIdentitiesError,
  Credentials | HttpClient.HttpClient,
  TeamsUserIdentity
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMicrosoftTeamsUserIdentitiesRequest,
  output: ListMicrosoftTeamsUserIdentitiesResult,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ListMicrosoftTeamsUserIdentitiesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMicrosoftTeamsUserIdentities",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TeamsUserIdentities",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Lists all of the tags associated with the Amazon Resource Name (ARN) that you specify. The resource can be a user, server, or role.
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
    InternalServiceError,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError =
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceUnavailableException
  | TooManyTagsException
  | CommonErrors;
/**
 * Attaches a key-value pair to a resource, as identified by its Amazon Resource Name (ARN). Resources are users, servers, roles, and other entities.
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
    InternalServiceError,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServiceError
  | ResourceNotFoundException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Detaches a key-value pair from a resource, as identified by its Amazon Resource Name (ARN). Resources are users, servers, roles, and other entities.
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
    InternalServiceError,
    ResourceNotFoundException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateAccountPreferencesError =
  | InvalidParameterException
  | InvalidRequestException
  | UpdateAccountPreferencesException
  | CommonErrors;
/**
 * Updates AWS Chatbot account preferences.
 */
export const updateAccountPreferences: API.OperationMethod<
  UpdateAccountPreferencesRequest,
  UpdateAccountPreferencesResult,
  UpdateAccountPreferencesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountPreferencesRequest,
  output: UpdateAccountPreferencesResult,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    UpdateAccountPreferencesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountPreferences",
}));

export type UpdateChimeWebhookConfigurationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | UpdateChimeWebhookConfigurationException
  | CommonErrors;
/**
 * Updates a Amazon Chime webhook configuration.
 */
export const updateChimeWebhookConfiguration: API.OperationMethod<
  UpdateChimeWebhookConfigurationRequest,
  UpdateChimeWebhookConfigurationResult,
  UpdateChimeWebhookConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateChimeWebhookConfigurationRequest,
  output: UpdateChimeWebhookConfigurationResult,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    UpdateChimeWebhookConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChimeWebhookConfiguration",
}));

export type UpdateCustomActionError =
  | InternalServiceError
  | InvalidRequestException
  | ResourceNotFoundException
  | UnauthorizedException
  | CommonErrors;
/**
 * Updates a custom action.
 */
export const updateCustomAction: API.OperationMethod<
  UpdateCustomActionRequest,
  UpdateCustomActionResult,
  UpdateCustomActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCustomActionRequest,
  output: UpdateCustomActionResult,
  errors: [
    InternalServiceError,
    InvalidRequestException,
    ResourceNotFoundException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomAction",
}));

export type UpdateMicrosoftTeamsChannelConfigurationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | UpdateTeamsChannelConfigurationException
  | CommonErrors;
/**
 * Updates an Microsoft Teams channel configuration.
 */
export const updateMicrosoftTeamsChannelConfiguration: API.OperationMethod<
  UpdateTeamsChannelConfigurationRequest,
  UpdateTeamsChannelConfigurationResult,
  UpdateMicrosoftTeamsChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTeamsChannelConfigurationRequest,
  output: UpdateTeamsChannelConfigurationResult,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    UpdateTeamsChannelConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMicrosoftTeamsChannelConfiguration",
}));

export type UpdateSlackChannelConfigurationError =
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | UpdateSlackChannelConfigurationException
  | CommonErrors;
/**
 * Updates a Slack channel configuration.
 */
export const updateSlackChannelConfiguration: API.OperationMethod<
  UpdateSlackChannelConfigurationRequest,
  UpdateSlackChannelConfigurationResult,
  UpdateSlackChannelConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSlackChannelConfigurationRequest,
  output: UpdateSlackChannelConfigurationResult,
  errors: [
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    UpdateSlackChannelConfigurationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSlackChannelConfiguration",
}));
