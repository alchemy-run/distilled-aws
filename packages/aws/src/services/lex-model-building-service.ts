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
  sdkId: "Lex Model Building Service",
  serviceShapeName: "AWSDeepSenseModelBuildingService",
});
const auth = T.AwsAuthSigv4({ name: "lex" });
const ver = T.ServiceVersion("2017-04-19");
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
              `https://models.lex-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws") {
              return e(`https://models-fips.lex.${Region}.amazonaws.com`);
            }
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://models-fips.lex.${Region}.amazonaws.com`);
            }
            return e(
              `https://models.lex-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://models.lex.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if ("aws" === _.getAttr(PartitionResult, "name")) {
          return e(`https://models.lex.${Region}.amazonaws.com`);
        }
        if ("aws-us-gov" === _.getAttr(PartitionResult, "name")) {
          return e(`https://models.lex.${Region}.amazonaws.com`);
        }
        return e(
          `https://models.lex.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()(
    "InternalFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    {
      retryAfterSeconds: S.optional(S.String).pipe(T.HttpHeader("Retry-After")),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class PreconditionFailedException
  extends /*@__PURE__*/ S.TaggedError<PreconditionFailedException>()(
    "PreconditionFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(412),
  ) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    {
      referenceType: S.optional(
        S.suspend(() => ReferenceType).annotate({
          identifier: "ReferenceType",
        }),
      ),
      exampleReference: S.optional(
        S.suspend(() => ResourceReference).annotate({
          identifier: "ResourceReference",
        }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type BotName = string;
export interface CreateBotVersionRequest {
  name: string;
  checksum?: string;
}
export const CreateBotVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    checksum: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots/{name}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBotVersionRequest",
}) as any as S.Schema<CreateBotVersionRequest>;
export type Description = string;
export type IntentName = string;
export type Version = string;
export interface Intent {
  intentName: string;
  intentVersion: string;
}
export const Intent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ intentName: S.String, intentVersion: S.String }),
).annotate({ identifier: "Intent" }) as any as S.Schema<Intent>;
export type IntentList = Intent[];
export const IntentList = /*@__PURE__*/ S.Array(Intent);
export type ContentType =
  | "PlainText"
  | "SSML"
  | "CustomPayload"
  | (string & {});
export const ContentType = S.String;

export type ContentString = string;
export type GroupNumber = number;
export interface Message {
  contentType: ContentType;
  content: string;
  groupNumber?: number;
}
export const Message = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    contentType: ContentType,
    content: S.String,
    groupNumber: S.optional(S.Number),
  }),
).annotate({ identifier: "Message" }) as any as S.Schema<Message>;
export type MessageList = Message[];
export const MessageList = /*@__PURE__*/ S.Array(Message);
export type PromptMaxAttempts = number;
export type ResponseCard = string;
export interface Prompt {
  messages: Message[];
  maxAttempts: number;
  responseCard?: string;
}
export const Prompt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    messages: MessageList,
    maxAttempts: S.Number,
    responseCard: S.optional(S.String),
  }),
).annotate({ identifier: "Prompt" }) as any as S.Schema<Prompt>;
export interface Statement {
  messages: Message[];
  responseCard?: string;
}
export const Statement = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ messages: MessageList, responseCard: S.optional(S.String) }),
).annotate({ identifier: "Statement" }) as any as S.Schema<Statement>;
export type Status =
  | "BUILDING"
  | "READY"
  | "READY_BASIC_TESTING"
  | "FAILED"
  | "NOT_BUILT"
  | (string & {});
export const Status = S.String;

export type SessionTTL = number;
export type Locale =
  | "de-DE"
  | "en-AU"
  | "en-GB"
  | "en-IN"
  | "en-US"
  | "es-419"
  | "es-ES"
  | "es-US"
  | "fr-FR"
  | "fr-CA"
  | "it-IT"
  | "ja-JP"
  | "ko-KR"
  | (string & {});
export const Locale = S.String;

export interface CreateBotVersionResponse {
  name?: string;
  description?: string;
  intents?: Intent[];
  clarificationPrompt?: Prompt;
  abortStatement?: Statement;
  status?: Status;
  failureReason?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  idleSessionTTLInSeconds?: number;
  voiceId?: string;
  checksum?: string;
  version?: string;
  locale?: Locale;
  childDirected?: boolean;
  enableModelImprovements?: boolean;
  detectSentiment?: boolean;
}
export const CreateBotVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    intents: S.optional(IntentList),
    clarificationPrompt: S.optional(Prompt),
    abortStatement: S.optional(Statement),
    status: S.optional(Status),
    failureReason: S.optional(S.String),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    idleSessionTTLInSeconds: S.optional(S.Number),
    voiceId: S.optional(S.String),
    checksum: S.optional(S.String),
    version: S.optional(S.String),
    locale: S.optional(Locale),
    childDirected: S.optional(S.Boolean),
    enableModelImprovements: S.optional(S.Boolean),
    detectSentiment: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CreateBotVersionResponse",
}) as any as S.Schema<CreateBotVersionResponse>;
export interface CreateIntentVersionRequest {
  name: string;
  checksum?: string;
}
export const CreateIntentVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    checksum: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/intents/{name}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIntentVersionRequest",
}) as any as S.Schema<CreateIntentVersionRequest>;
export type SlotName = string;
export type SlotConstraint = "Required" | "Optional" | (string & {});
export const SlotConstraint = S.String;

export type CustomOrBuiltinSlotTypeName = string;
export type Priority = number;
export type Utterance = string;
export type SlotUtteranceList = string[];
export const SlotUtteranceList = /*@__PURE__*/ S.Array(S.String);
export type ObfuscationSetting = "NONE" | "DEFAULT_OBFUSCATION" | (string & {});
export const ObfuscationSetting = S.String;

export type SlotDefaultValueString = string;
export interface SlotDefaultValue {
  defaultValue: string;
}
export const SlotDefaultValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ defaultValue: S.String }),
).annotate({
  identifier: "SlotDefaultValue",
}) as any as S.Schema<SlotDefaultValue>;
export type SlotDefaultValueList = SlotDefaultValue[];
export const SlotDefaultValueList = /*@__PURE__*/ S.Array(SlotDefaultValue);
export interface SlotDefaultValueSpec {
  defaultValueList: SlotDefaultValue[];
}
export const SlotDefaultValueSpec = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ defaultValueList: SlotDefaultValueList }),
).annotate({
  identifier: "SlotDefaultValueSpec",
}) as any as S.Schema<SlotDefaultValueSpec>;
export interface Slot {
  name: string;
  description?: string;
  slotConstraint: SlotConstraint;
  slotType?: string;
  slotTypeVersion?: string;
  valueElicitationPrompt?: Prompt;
  priority?: number;
  sampleUtterances?: string[];
  responseCard?: string;
  obfuscationSetting?: ObfuscationSetting;
  defaultValueSpec?: SlotDefaultValueSpec;
}
export const Slot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    description: S.optional(S.String),
    slotConstraint: SlotConstraint,
    slotType: S.optional(S.String),
    slotTypeVersion: S.optional(S.String),
    valueElicitationPrompt: S.optional(Prompt),
    priority: S.optional(S.Number),
    sampleUtterances: S.optional(SlotUtteranceList),
    responseCard: S.optional(S.String),
    obfuscationSetting: S.optional(ObfuscationSetting),
    defaultValueSpec: S.optional(SlotDefaultValueSpec),
  }),
).annotate({ identifier: "Slot" }) as any as S.Schema<Slot>;
export type SlotList = Slot[];
export const SlotList = /*@__PURE__*/ S.Array(Slot);
export type IntentUtteranceList = string[];
export const IntentUtteranceList = /*@__PURE__*/ S.Array(S.String);
export interface FollowUpPrompt {
  prompt: Prompt;
  rejectionStatement: Statement;
}
export const FollowUpPrompt = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ prompt: Prompt, rejectionStatement: Statement }),
).annotate({ identifier: "FollowUpPrompt" }) as any as S.Schema<FollowUpPrompt>;
export type LambdaARN = string;
export type MessageVersion = string;
export interface CodeHook {
  uri: string;
  messageVersion: string;
}
export const CodeHook = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ uri: S.String, messageVersion: S.String }),
).annotate({ identifier: "CodeHook" }) as any as S.Schema<CodeHook>;
export type FulfillmentActivityType =
  | "ReturnIntent"
  | "CodeHook"
  | (string & {});
export const FulfillmentActivityType = S.String;

export interface FulfillmentActivity {
  type: FulfillmentActivityType;
  codeHook?: CodeHook;
}
export const FulfillmentActivity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ type: FulfillmentActivityType, codeHook: S.optional(CodeHook) }),
).annotate({
  identifier: "FulfillmentActivity",
}) as any as S.Schema<FulfillmentActivity>;
export type BuiltinIntentSignature = string;
export type KendraIndexArn = string;
export type QueryFilterString = string;
export type RoleArn = string;
export interface KendraConfiguration {
  kendraIndex: string;
  queryFilterString?: string;
  role: string;
}
export const KendraConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kendraIndex: S.String,
    queryFilterString: S.optional(S.String),
    role: S.String,
  }),
).annotate({
  identifier: "KendraConfiguration",
}) as any as S.Schema<KendraConfiguration>;
export type InputContextName = string;
export interface InputContext {
  name: string;
}
export const InputContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({ identifier: "InputContext" }) as any as S.Schema<InputContext>;
export type InputContextList = InputContext[];
export const InputContextList = /*@__PURE__*/ S.Array(InputContext);
export type OutputContextName = string;
export type ContextTimeToLiveInSeconds = number;
export type ContextTurnsToLive = number;
export interface OutputContext {
  name: string;
  timeToLiveInSeconds: number;
  turnsToLive: number;
}
export const OutputContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    timeToLiveInSeconds: S.Number,
    turnsToLive: S.Number,
  }),
).annotate({ identifier: "OutputContext" }) as any as S.Schema<OutputContext>;
export type OutputContextList = OutputContext[];
export const OutputContextList = /*@__PURE__*/ S.Array(OutputContext);
export interface CreateIntentVersionResponse {
  name?: string;
  description?: string;
  slots?: Slot[];
  sampleUtterances?: string[];
  confirmationPrompt?: Prompt;
  rejectionStatement?: Statement;
  followUpPrompt?: FollowUpPrompt;
  conclusionStatement?: Statement;
  dialogCodeHook?: CodeHook;
  fulfillmentActivity?: FulfillmentActivity;
  parentIntentSignature?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
  checksum?: string;
  kendraConfiguration?: KendraConfiguration;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
}
export const CreateIntentVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    slots: S.optional(SlotList),
    sampleUtterances: S.optional(IntentUtteranceList),
    confirmationPrompt: S.optional(Prompt),
    rejectionStatement: S.optional(Statement),
    followUpPrompt: S.optional(FollowUpPrompt),
    conclusionStatement: S.optional(Statement),
    dialogCodeHook: S.optional(CodeHook),
    fulfillmentActivity: S.optional(FulfillmentActivity),
    parentIntentSignature: S.optional(S.String),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    version: S.optional(S.String),
    checksum: S.optional(S.String),
    kendraConfiguration: S.optional(KendraConfiguration),
    inputContexts: S.optional(InputContextList),
    outputContexts: S.optional(OutputContextList),
  }),
).annotate({
  identifier: "CreateIntentVersionResponse",
}) as any as S.Schema<CreateIntentVersionResponse>;
export type SlotTypeName = string;
export interface CreateSlotTypeVersionRequest {
  name: string;
  checksum?: string;
}
export const CreateSlotTypeVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    checksum: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/slottypes/{name}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSlotTypeVersionRequest",
}) as any as S.Schema<CreateSlotTypeVersionRequest>;
export type Value = string;
export type SynonymList = string[];
export const SynonymList = /*@__PURE__*/ S.Array(S.String);
export interface EnumerationValue {
  value: string;
  synonyms?: string[];
}
export const EnumerationValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.String, synonyms: S.optional(SynonymList) }),
).annotate({
  identifier: "EnumerationValue",
}) as any as S.Schema<EnumerationValue>;
export type EnumerationValues = EnumerationValue[];
export const EnumerationValues = /*@__PURE__*/ S.Array(EnumerationValue);
export type SlotValueSelectionStrategy =
  | "ORIGINAL_VALUE"
  | "TOP_RESOLUTION"
  | (string & {});
export const SlotValueSelectionStrategy = S.String;

export type RegexPattern = string;
export interface SlotTypeRegexConfiguration {
  pattern: string;
}
export const SlotTypeRegexConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pattern: S.String }),
).annotate({
  identifier: "SlotTypeRegexConfiguration",
}) as any as S.Schema<SlotTypeRegexConfiguration>;
export interface SlotTypeConfiguration {
  regexConfiguration?: SlotTypeRegexConfiguration;
}
export const SlotTypeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ regexConfiguration: S.optional(SlotTypeRegexConfiguration) }),
).annotate({
  identifier: "SlotTypeConfiguration",
}) as any as S.Schema<SlotTypeConfiguration>;
export type SlotTypeConfigurations = SlotTypeConfiguration[];
export const SlotTypeConfigurations = /*@__PURE__*/ S.Array(
  SlotTypeConfiguration,
);
export interface CreateSlotTypeVersionResponse {
  name?: string;
  description?: string;
  enumerationValues?: EnumerationValue[];
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
  checksum?: string;
  valueSelectionStrategy?: SlotValueSelectionStrategy;
  parentSlotTypeSignature?: string;
  slotTypeConfigurations?: SlotTypeConfiguration[];
}
export const CreateSlotTypeVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    enumerationValues: S.optional(EnumerationValues),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    version: S.optional(S.String),
    checksum: S.optional(S.String),
    valueSelectionStrategy: S.optional(SlotValueSelectionStrategy),
    parentSlotTypeSignature: S.optional(S.String),
    slotTypeConfigurations: S.optional(SlotTypeConfigurations),
  }),
).annotate({
  identifier: "CreateSlotTypeVersionResponse",
}) as any as S.Schema<CreateSlotTypeVersionResponse>;
export interface DeleteBotRequest {
  name: string;
}
export const DeleteBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/bots/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBotRequest",
}) as any as S.Schema<DeleteBotRequest>;
export interface DeleteBotResponse {}
export const DeleteBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBotResponse",
}) as any as S.Schema<DeleteBotResponse>;
export type AliasName = string;
export interface DeleteBotAliasRequest {
  name: string;
  botName: string;
}
export const DeleteBotAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    botName: S.String.pipe(T.HttpLabel("botName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/bots/{botName}/aliases/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBotAliasRequest",
}) as any as S.Schema<DeleteBotAliasRequest>;
export interface DeleteBotAliasResponse {}
export const DeleteBotAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBotAliasResponse",
}) as any as S.Schema<DeleteBotAliasResponse>;
export type BotChannelName = string;
export interface DeleteBotChannelAssociationRequest {
  name: string;
  botName: string;
  botAlias: string;
}
export const DeleteBotChannelAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    botName: S.String.pipe(T.HttpLabel("botName")),
    botAlias: S.String.pipe(T.HttpLabel("botAlias")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/bots/{botName}/aliases/{botAlias}/channels/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBotChannelAssociationRequest",
}) as any as S.Schema<DeleteBotChannelAssociationRequest>;
export interface DeleteBotChannelAssociationResponse {}
export const DeleteBotChannelAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBotChannelAssociationResponse",
}) as any as S.Schema<DeleteBotChannelAssociationResponse>;
export type NumericalVersion = string;
export interface DeleteBotVersionRequest {
  name: string;
  version: string;
}
export const DeleteBotVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    version: S.String.pipe(T.HttpLabel("version")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/bots/{name}/versions/{version}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBotVersionRequest",
}) as any as S.Schema<DeleteBotVersionRequest>;
export interface DeleteBotVersionResponse {}
export const DeleteBotVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteBotVersionResponse",
}) as any as S.Schema<DeleteBotVersionResponse>;
export interface DeleteIntentRequest {
  name: string;
}
export const DeleteIntentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/intents/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIntentRequest",
}) as any as S.Schema<DeleteIntentRequest>;
export interface DeleteIntentResponse {}
export const DeleteIntentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIntentResponse",
}) as any as S.Schema<DeleteIntentResponse>;
export interface DeleteIntentVersionRequest {
  name: string;
  version: string;
}
export const DeleteIntentVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    version: S.String.pipe(T.HttpLabel("version")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/intents/{name}/versions/{version}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIntentVersionRequest",
}) as any as S.Schema<DeleteIntentVersionRequest>;
export interface DeleteIntentVersionResponse {}
export const DeleteIntentVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIntentVersionResponse",
}) as any as S.Schema<DeleteIntentVersionResponse>;
export interface DeleteSlotTypeRequest {
  name: string;
}
export const DeleteSlotTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String.pipe(T.HttpLabel("name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/slottypes/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSlotTypeRequest",
}) as any as S.Schema<DeleteSlotTypeRequest>;
export interface DeleteSlotTypeResponse {}
export const DeleteSlotTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSlotTypeResponse",
}) as any as S.Schema<DeleteSlotTypeResponse>;
export interface DeleteSlotTypeVersionRequest {
  name: string;
  version: string;
}
export const DeleteSlotTypeVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    version: S.String.pipe(T.HttpLabel("version")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/slottypes/{name}/version/{version}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSlotTypeVersionRequest",
}) as any as S.Schema<DeleteSlotTypeVersionRequest>;
export interface DeleteSlotTypeVersionResponse {}
export const DeleteSlotTypeVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSlotTypeVersionResponse",
}) as any as S.Schema<DeleteSlotTypeVersionResponse>;
export type UserId = string;
export interface DeleteUtterancesRequest {
  botName: string;
  userId: string;
}
export const DeleteUtterancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botName: S.String.pipe(T.HttpLabel("botName")),
    userId: S.String.pipe(T.HttpLabel("userId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/bots/{botName}/utterances/{userId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteUtterancesRequest",
}) as any as S.Schema<DeleteUtterancesRequest>;
export interface DeleteUtterancesResponse {}
export const DeleteUtterancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteUtterancesResponse",
}) as any as S.Schema<DeleteUtterancesResponse>;
export interface GetBotRequest {
  name: string;
  versionOrAlias: string;
}
export const GetBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    versionOrAlias: S.String.pipe(T.HttpLabel("versionOrAlias")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/bots/{name}/versions/{versionOrAlias}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetBotRequest" }) as any as S.Schema<GetBotRequest>;
export type ConfidenceThreshold = number;
export interface GetBotResponse {
  name?: string;
  description?: string;
  intents?: Intent[];
  enableModelImprovements?: boolean;
  nluIntentConfidenceThreshold?: number;
  clarificationPrompt?: Prompt;
  abortStatement?: Statement;
  status?: Status;
  failureReason?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  idleSessionTTLInSeconds?: number;
  voiceId?: string;
  checksum?: string;
  version?: string;
  locale?: Locale;
  childDirected?: boolean;
  detectSentiment?: boolean;
}
export const GetBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    intents: S.optional(IntentList),
    enableModelImprovements: S.optional(S.Boolean),
    nluIntentConfidenceThreshold: S.optional(S.Number),
    clarificationPrompt: S.optional(Prompt),
    abortStatement: S.optional(Statement),
    status: S.optional(Status),
    failureReason: S.optional(S.String),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    idleSessionTTLInSeconds: S.optional(S.Number),
    voiceId: S.optional(S.String),
    checksum: S.optional(S.String),
    version: S.optional(S.String),
    locale: S.optional(Locale),
    childDirected: S.optional(S.Boolean),
    detectSentiment: S.optional(S.Boolean),
  }),
).annotate({ identifier: "GetBotResponse" }) as any as S.Schema<GetBotResponse>;
export interface GetBotAliasRequest {
  name: string;
  botName: string;
}
export const GetBotAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    botName: S.String.pipe(T.HttpLabel("botName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/bots/{botName}/aliases/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBotAliasRequest",
}) as any as S.Schema<GetBotAliasRequest>;
export type LogType = "AUDIO" | "TEXT" | (string & {});
export const LogType = S.String;

export type Destination = "CLOUDWATCH_LOGS" | "S3" | (string & {});
export const Destination = S.String;

export type KmsKeyArn = string;
export type ResourceArn = string;
export type ResourcePrefix = string;
export interface LogSettingsResponse {
  logType?: LogType;
  destination?: Destination;
  kmsKeyArn?: string;
  resourceArn?: string;
  resourcePrefix?: string;
}
export const LogSettingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logType: S.optional(LogType),
    destination: S.optional(Destination),
    kmsKeyArn: S.optional(S.String),
    resourceArn: S.optional(S.String),
    resourcePrefix: S.optional(S.String),
  }),
).annotate({
  identifier: "LogSettingsResponse",
}) as any as S.Schema<LogSettingsResponse>;
export type LogSettingsResponseList = LogSettingsResponse[];
export const LogSettingsResponseList =
  /*@__PURE__*/ S.Array(LogSettingsResponse);
export type IamRoleArn = string;
export interface ConversationLogsResponse {
  logSettings?: LogSettingsResponse[];
  iamRoleArn?: string;
}
export const ConversationLogsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logSettings: S.optional(LogSettingsResponseList),
    iamRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ConversationLogsResponse",
}) as any as S.Schema<ConversationLogsResponse>;
export interface GetBotAliasResponse {
  name?: string;
  description?: string;
  botVersion?: string;
  botName?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  checksum?: string;
  conversationLogs?: ConversationLogsResponse;
}
export const GetBotAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    botVersion: S.optional(S.String),
    botName: S.optional(S.String),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    checksum: S.optional(S.String),
    conversationLogs: S.optional(ConversationLogsResponse),
  }),
).annotate({
  identifier: "GetBotAliasResponse",
}) as any as S.Schema<GetBotAliasResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface GetBotAliasesRequest {
  botName: string;
  nextToken?: string;
  maxResults?: number;
  nameContains?: string;
}
export const GetBotAliasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botName: S.String.pipe(T.HttpLabel("botName")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/bots/{botName}/aliases" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBotAliasesRequest",
}) as any as S.Schema<GetBotAliasesRequest>;
export interface BotAliasMetadata {
  name?: string;
  description?: string;
  botVersion?: string;
  botName?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  checksum?: string;
  conversationLogs?: ConversationLogsResponse;
}
export const BotAliasMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    botVersion: S.optional(S.String),
    botName: S.optional(S.String),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    checksum: S.optional(S.String),
    conversationLogs: S.optional(ConversationLogsResponse),
  }),
).annotate({
  identifier: "BotAliasMetadata",
}) as any as S.Schema<BotAliasMetadata>;
export type BotAliasMetadataList = BotAliasMetadata[];
export const BotAliasMetadataList = /*@__PURE__*/ S.Array(BotAliasMetadata);
export interface GetBotAliasesResponse {
  BotAliases?: BotAliasMetadata[];
  nextToken?: string;
}
export const GetBotAliasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BotAliases: S.optional(BotAliasMetadataList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBotAliasesResponse",
}) as any as S.Schema<GetBotAliasesResponse>;
export interface GetBotChannelAssociationRequest {
  name: string;
  botName: string;
  botAlias: string;
}
export const GetBotChannelAssociationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    botName: S.String.pipe(T.HttpLabel("botName")),
    botAlias: S.String.pipe(T.HttpLabel("botAlias")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/bots/{botName}/aliases/{botAlias}/channels/{name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBotChannelAssociationRequest",
}) as any as S.Schema<GetBotChannelAssociationRequest>;
export type ChannelType =
  | "Facebook"
  | "Slack"
  | "Twilio-Sms"
  | "Kik"
  | (string & {});
export const ChannelType = S.String;

export type ChannelConfigurationMap = { [key: string]: string | undefined };
export const ChannelConfigurationMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ChannelStatus =
  | "IN_PROGRESS"
  | "CREATED"
  | "FAILED"
  | (string & {});
export const ChannelStatus = S.String;

export interface GetBotChannelAssociationResponse {
  name?: string;
  description?: string;
  botAlias?: string;
  botName?: string;
  createdDate?: Date;
  type?: ChannelType;
  botConfiguration?: { [key: string]: string | undefined };
  status?: ChannelStatus;
  failureReason?: string;
}
export const GetBotChannelAssociationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    botAlias: S.optional(S.String),
    botName: S.optional(S.String),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    type: S.optional(ChannelType),
    botConfiguration: S.optional(ChannelConfigurationMap),
    status: S.optional(ChannelStatus),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBotChannelAssociationResponse",
}) as any as S.Schema<GetBotChannelAssociationResponse>;
export type AliasNameOrListAll = string;
export interface GetBotChannelAssociationsRequest {
  botName: string;
  botAlias: string;
  nextToken?: string;
  maxResults?: number;
  nameContains?: string;
}
export const GetBotChannelAssociationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botName: S.String.pipe(T.HttpLabel("botName")),
    botAlias: S.String.pipe(T.HttpLabel("botAlias")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/bots/{botName}/aliases/{botAlias}/channels",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBotChannelAssociationsRequest",
}) as any as S.Schema<GetBotChannelAssociationsRequest>;
export interface BotChannelAssociation {
  name?: string;
  description?: string;
  botAlias?: string;
  botName?: string;
  createdDate?: Date;
  type?: ChannelType;
  botConfiguration?: { [key: string]: string | undefined };
  status?: ChannelStatus;
  failureReason?: string;
}
export const BotChannelAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    botAlias: S.optional(S.String),
    botName: S.optional(S.String),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    type: S.optional(ChannelType),
    botConfiguration: S.optional(ChannelConfigurationMap),
    status: S.optional(ChannelStatus),
    failureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "BotChannelAssociation",
}) as any as S.Schema<BotChannelAssociation>;
export type BotChannelAssociationList = BotChannelAssociation[];
export const BotChannelAssociationList = /*@__PURE__*/ S.Array(
  BotChannelAssociation,
);
export interface GetBotChannelAssociationsResponse {
  botChannelAssociations?: BotChannelAssociation[];
  nextToken?: string;
}
export const GetBotChannelAssociationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botChannelAssociations: S.optional(BotChannelAssociationList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBotChannelAssociationsResponse",
}) as any as S.Schema<GetBotChannelAssociationsResponse>;
export interface GetBotsRequest {
  nextToken?: string;
  maxResults?: number;
  nameContains?: string;
}
export const GetBotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/bots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetBotsRequest" }) as any as S.Schema<GetBotsRequest>;
export interface BotMetadata {
  name?: string;
  description?: string;
  status?: Status;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
}
export const BotMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    status: S.optional(Status),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    version: S.optional(S.String),
  }),
).annotate({ identifier: "BotMetadata" }) as any as S.Schema<BotMetadata>;
export type BotMetadataList = BotMetadata[];
export const BotMetadataList = /*@__PURE__*/ S.Array(BotMetadata);
export interface GetBotsResponse {
  bots?: BotMetadata[];
  nextToken?: string;
}
export const GetBotsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bots: S.optional(BotMetadataList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBotsResponse",
}) as any as S.Schema<GetBotsResponse>;
export interface GetBotVersionsRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetBotVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/bots/{name}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBotVersionsRequest",
}) as any as S.Schema<GetBotVersionsRequest>;
export interface GetBotVersionsResponse {
  bots?: BotMetadata[];
  nextToken?: string;
}
export const GetBotVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bots: S.optional(BotMetadataList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBotVersionsResponse",
}) as any as S.Schema<GetBotVersionsResponse>;
export interface GetBuiltinIntentRequest {
  signature: string;
}
export const GetBuiltinIntentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ signature: S.String.pipe(T.HttpLabel("signature")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/builtins/intents/{signature}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBuiltinIntentRequest",
}) as any as S.Schema<GetBuiltinIntentRequest>;
export type LocaleList = Locale[];
export const LocaleList = /*@__PURE__*/ S.Array(Locale);
export interface BuiltinIntentSlot {
  name?: string;
}
export const BuiltinIntentSlot = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String) }),
).annotate({
  identifier: "BuiltinIntentSlot",
}) as any as S.Schema<BuiltinIntentSlot>;
export type BuiltinIntentSlotList = BuiltinIntentSlot[];
export const BuiltinIntentSlotList = /*@__PURE__*/ S.Array(BuiltinIntentSlot);
export interface GetBuiltinIntentResponse {
  signature?: string;
  supportedLocales?: Locale[];
  slots?: BuiltinIntentSlot[];
}
export const GetBuiltinIntentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    signature: S.optional(S.String),
    supportedLocales: S.optional(LocaleList),
    slots: S.optional(BuiltinIntentSlotList),
  }),
).annotate({
  identifier: "GetBuiltinIntentResponse",
}) as any as S.Schema<GetBuiltinIntentResponse>;
export interface GetBuiltinIntentsRequest {
  locale?: Locale;
  signatureContains?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetBuiltinIntentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    locale: S.optional(Locale).pipe(T.HttpQuery("locale")),
    signatureContains: S.optional(S.String).pipe(
      T.HttpQuery("signatureContains"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/builtins/intents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBuiltinIntentsRequest",
}) as any as S.Schema<GetBuiltinIntentsRequest>;
export interface BuiltinIntentMetadata {
  signature?: string;
  supportedLocales?: Locale[];
}
export const BuiltinIntentMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    signature: S.optional(S.String),
    supportedLocales: S.optional(LocaleList),
  }),
).annotate({
  identifier: "BuiltinIntentMetadata",
}) as any as S.Schema<BuiltinIntentMetadata>;
export type BuiltinIntentMetadataList = BuiltinIntentMetadata[];
export const BuiltinIntentMetadataList = /*@__PURE__*/ S.Array(
  BuiltinIntentMetadata,
);
export interface GetBuiltinIntentsResponse {
  intents?: BuiltinIntentMetadata[];
  nextToken?: string;
}
export const GetBuiltinIntentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intents: S.optional(BuiltinIntentMetadataList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBuiltinIntentsResponse",
}) as any as S.Schema<GetBuiltinIntentsResponse>;
export interface GetBuiltinSlotTypesRequest {
  locale?: Locale;
  signatureContains?: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetBuiltinSlotTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    locale: S.optional(Locale).pipe(T.HttpQuery("locale")),
    signatureContains: S.optional(S.String).pipe(
      T.HttpQuery("signatureContains"),
    ),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/builtins/slottypes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetBuiltinSlotTypesRequest",
}) as any as S.Schema<GetBuiltinSlotTypesRequest>;
export type BuiltinSlotTypeSignature = string;
export interface BuiltinSlotTypeMetadata {
  signature?: string;
  supportedLocales?: Locale[];
}
export const BuiltinSlotTypeMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    signature: S.optional(S.String),
    supportedLocales: S.optional(LocaleList),
  }),
).annotate({
  identifier: "BuiltinSlotTypeMetadata",
}) as any as S.Schema<BuiltinSlotTypeMetadata>;
export type BuiltinSlotTypeMetadataList = BuiltinSlotTypeMetadata[];
export const BuiltinSlotTypeMetadataList = /*@__PURE__*/ S.Array(
  BuiltinSlotTypeMetadata,
);
export interface GetBuiltinSlotTypesResponse {
  slotTypes?: BuiltinSlotTypeMetadata[];
  nextToken?: string;
}
export const GetBuiltinSlotTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypes: S.optional(BuiltinSlotTypeMetadataList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetBuiltinSlotTypesResponse",
}) as any as S.Schema<GetBuiltinSlotTypesResponse>;
export type Name = string;
export type ResourceType = "BOT" | "INTENT" | "SLOT_TYPE" | (string & {});
export const ResourceType = S.String;

export type ExportType = "ALEXA_SKILLS_KIT" | "LEX" | (string & {});
export const ExportType = S.String;

export interface GetExportRequest {
  name: string;
  version: string;
  resourceType: ResourceType;
  exportType: ExportType;
}
export const GetExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpQuery("name")),
    version: S.String.pipe(T.HttpQuery("version")),
    resourceType: ResourceType.pipe(T.HttpQuery("resourceType")),
    exportType: ExportType.pipe(T.HttpQuery("exportType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/exports" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetExportRequest",
}) as any as S.Schema<GetExportRequest>;
export type ExportStatus = "IN_PROGRESS" | "READY" | "FAILED" | (string & {});
export const ExportStatus = S.String;

export interface GetExportResponse {
  name?: string;
  version?: string;
  resourceType?: ResourceType;
  exportType?: ExportType;
  exportStatus?: ExportStatus;
  failureReason?: string;
  url?: string;
}
export const GetExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    version: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    exportType: S.optional(ExportType),
    exportStatus: S.optional(ExportStatus),
    failureReason: S.optional(S.String),
    url: S.optional(S.String),
  }),
).annotate({
  identifier: "GetExportResponse",
}) as any as S.Schema<GetExportResponse>;
export interface GetImportRequest {
  importId: string;
}
export const GetImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ importId: S.String.pipe(T.HttpLabel("importId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/imports/{importId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetImportRequest",
}) as any as S.Schema<GetImportRequest>;
export type MergeStrategy =
  | "OVERWRITE_LATEST"
  | "FAIL_ON_CONFLICT"
  | (string & {});
export const MergeStrategy = S.String;

export type ImportStatus =
  | "IN_PROGRESS"
  | "COMPLETE"
  | "FAILED"
  | (string & {});
export const ImportStatus = S.String;

export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface GetImportResponse {
  name?: string;
  resourceType?: ResourceType;
  mergeStrategy?: MergeStrategy;
  importId?: string;
  importStatus?: ImportStatus;
  failureReason?: string[];
  createdDate?: Date;
}
export const GetImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    mergeStrategy: S.optional(MergeStrategy),
    importId: S.optional(S.String),
    importStatus: S.optional(ImportStatus),
    failureReason: S.optional(StringList),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "GetImportResponse",
}) as any as S.Schema<GetImportResponse>;
export interface GetIntentRequest {
  name: string;
  version: string;
}
export const GetIntentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    version: S.String.pipe(T.HttpLabel("version")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/intents/{name}/versions/{version}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIntentRequest",
}) as any as S.Schema<GetIntentRequest>;
export interface GetIntentResponse {
  name?: string;
  description?: string;
  slots?: Slot[];
  sampleUtterances?: string[];
  confirmationPrompt?: Prompt;
  rejectionStatement?: Statement;
  followUpPrompt?: FollowUpPrompt;
  conclusionStatement?: Statement;
  dialogCodeHook?: CodeHook;
  fulfillmentActivity?: FulfillmentActivity;
  parentIntentSignature?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
  checksum?: string;
  kendraConfiguration?: KendraConfiguration;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
}
export const GetIntentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    slots: S.optional(SlotList),
    sampleUtterances: S.optional(IntentUtteranceList),
    confirmationPrompt: S.optional(Prompt),
    rejectionStatement: S.optional(Statement),
    followUpPrompt: S.optional(FollowUpPrompt),
    conclusionStatement: S.optional(Statement),
    dialogCodeHook: S.optional(CodeHook),
    fulfillmentActivity: S.optional(FulfillmentActivity),
    parentIntentSignature: S.optional(S.String),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    version: S.optional(S.String),
    checksum: S.optional(S.String),
    kendraConfiguration: S.optional(KendraConfiguration),
    inputContexts: S.optional(InputContextList),
    outputContexts: S.optional(OutputContextList),
  }),
).annotate({
  identifier: "GetIntentResponse",
}) as any as S.Schema<GetIntentResponse>;
export interface GetIntentsRequest {
  nextToken?: string;
  maxResults?: number;
  nameContains?: string;
}
export const GetIntentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/intents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIntentsRequest",
}) as any as S.Schema<GetIntentsRequest>;
export interface IntentMetadata {
  name?: string;
  description?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
}
export const IntentMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    version: S.optional(S.String),
  }),
).annotate({ identifier: "IntentMetadata" }) as any as S.Schema<IntentMetadata>;
export type IntentMetadataList = IntentMetadata[];
export const IntentMetadataList = /*@__PURE__*/ S.Array(IntentMetadata);
export interface GetIntentsResponse {
  intents?: IntentMetadata[];
  nextToken?: string;
}
export const GetIntentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intents: S.optional(IntentMetadataList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetIntentsResponse",
}) as any as S.Schema<GetIntentsResponse>;
export interface GetIntentVersionsRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetIntentVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/intents/{name}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIntentVersionsRequest",
}) as any as S.Schema<GetIntentVersionsRequest>;
export interface GetIntentVersionsResponse {
  intents?: IntentMetadata[];
  nextToken?: string;
}
export const GetIntentVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intents: S.optional(IntentMetadataList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetIntentVersionsResponse",
}) as any as S.Schema<GetIntentVersionsResponse>;
export type MigrationId = string;
export interface GetMigrationRequest {
  migrationId: string;
}
export const GetMigrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ migrationId: S.String.pipe(T.HttpLabel("migrationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/migrations/{migrationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMigrationRequest",
}) as any as S.Schema<GetMigrationRequest>;
export type V2BotId = string;
export type MigrationStatus =
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const MigrationStatus = S.String;

export type MigrationStrategy =
  | "CREATE_NEW"
  | "UPDATE_EXISTING"
  | (string & {});
export const MigrationStrategy = S.String;

export type MigrationAlertType = "ERROR" | "WARN" | (string & {});
export const MigrationAlertType = S.String;

export type MigrationAlertMessage = string;
export type MigrationAlertDetail = string;
export type MigrationAlertDetails = string[];
export const MigrationAlertDetails = /*@__PURE__*/ S.Array(S.String);
export type MigrationAlertReferenceURL = string;
export type MigrationAlertReferenceURLs = string[];
export const MigrationAlertReferenceURLs = /*@__PURE__*/ S.Array(S.String);
export interface MigrationAlert {
  type?: MigrationAlertType;
  message?: string;
  details?: string[];
  referenceURLs?: string[];
}
export const MigrationAlert = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: S.optional(MigrationAlertType),
    message: S.optional(S.String),
    details: S.optional(MigrationAlertDetails),
    referenceURLs: S.optional(MigrationAlertReferenceURLs),
  }),
).annotate({ identifier: "MigrationAlert" }) as any as S.Schema<MigrationAlert>;
export type MigrationAlerts = MigrationAlert[];
export const MigrationAlerts = /*@__PURE__*/ S.Array(MigrationAlert);
export interface GetMigrationResponse {
  migrationId?: string;
  v1BotName?: string;
  v1BotVersion?: string;
  v1BotLocale?: Locale;
  v2BotId?: string;
  v2BotRole?: string;
  migrationStatus?: MigrationStatus;
  migrationStrategy?: MigrationStrategy;
  migrationTimestamp?: Date;
  alerts?: MigrationAlert[];
}
export const GetMigrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    migrationId: S.optional(S.String),
    v1BotName: S.optional(S.String),
    v1BotVersion: S.optional(S.String),
    v1BotLocale: S.optional(Locale),
    v2BotId: S.optional(S.String),
    v2BotRole: S.optional(S.String),
    migrationStatus: S.optional(MigrationStatus),
    migrationStrategy: S.optional(MigrationStrategy),
    migrationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    alerts: S.optional(MigrationAlerts),
  }),
).annotate({
  identifier: "GetMigrationResponse",
}) as any as S.Schema<GetMigrationResponse>;
export type MigrationSortAttribute =
  | "V1_BOT_NAME"
  | "MIGRATION_DATE_TIME"
  | (string & {});
export const MigrationSortAttribute = S.String;

export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = S.String;

export interface GetMigrationsRequest {
  sortByAttribute?: MigrationSortAttribute;
  sortByOrder?: SortOrder;
  v1BotNameContains?: string;
  migrationStatusEquals?: MigrationStatus;
  maxResults?: number;
  nextToken?: string;
}
export const GetMigrationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sortByAttribute: S.optional(MigrationSortAttribute).pipe(
      T.HttpQuery("sortByAttribute"),
    ),
    sortByOrder: S.optional(SortOrder).pipe(T.HttpQuery("sortByOrder")),
    v1BotNameContains: S.optional(S.String).pipe(
      T.HttpQuery("v1BotNameContains"),
    ),
    migrationStatusEquals: S.optional(MigrationStatus).pipe(
      T.HttpQuery("migrationStatusEquals"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/migrations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMigrationsRequest",
}) as any as S.Schema<GetMigrationsRequest>;
export interface MigrationSummary {
  migrationId?: string;
  v1BotName?: string;
  v1BotVersion?: string;
  v1BotLocale?: Locale;
  v2BotId?: string;
  v2BotRole?: string;
  migrationStatus?: MigrationStatus;
  migrationStrategy?: MigrationStrategy;
  migrationTimestamp?: Date;
}
export const MigrationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    migrationId: S.optional(S.String),
    v1BotName: S.optional(S.String),
    v1BotVersion: S.optional(S.String),
    v1BotLocale: S.optional(Locale),
    v2BotId: S.optional(S.String),
    v2BotRole: S.optional(S.String),
    migrationStatus: S.optional(MigrationStatus),
    migrationStrategy: S.optional(MigrationStrategy),
    migrationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "MigrationSummary",
}) as any as S.Schema<MigrationSummary>;
export type MigrationSummaryList = MigrationSummary[];
export const MigrationSummaryList = /*@__PURE__*/ S.Array(MigrationSummary);
export interface GetMigrationsResponse {
  migrationSummaries?: MigrationSummary[];
  nextToken?: string;
}
export const GetMigrationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    migrationSummaries: S.optional(MigrationSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetMigrationsResponse",
}) as any as S.Schema<GetMigrationsResponse>;
export interface GetSlotTypeRequest {
  name: string;
  version: string;
}
export const GetSlotTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    version: S.String.pipe(T.HttpLabel("version")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/slottypes/{name}/versions/{version}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSlotTypeRequest",
}) as any as S.Schema<GetSlotTypeRequest>;
export interface GetSlotTypeResponse {
  name?: string;
  description?: string;
  enumerationValues?: EnumerationValue[];
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
  checksum?: string;
  valueSelectionStrategy?: SlotValueSelectionStrategy;
  parentSlotTypeSignature?: string;
  slotTypeConfigurations?: SlotTypeConfiguration[];
}
export const GetSlotTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    enumerationValues: S.optional(EnumerationValues),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    version: S.optional(S.String),
    checksum: S.optional(S.String),
    valueSelectionStrategy: S.optional(SlotValueSelectionStrategy),
    parentSlotTypeSignature: S.optional(S.String),
    slotTypeConfigurations: S.optional(SlotTypeConfigurations),
  }),
).annotate({
  identifier: "GetSlotTypeResponse",
}) as any as S.Schema<GetSlotTypeResponse>;
export interface GetSlotTypesRequest {
  nextToken?: string;
  maxResults?: number;
  nameContains?: string;
}
export const GetSlotTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/slottypes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSlotTypesRequest",
}) as any as S.Schema<GetSlotTypesRequest>;
export interface SlotTypeMetadata {
  name?: string;
  description?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
}
export const SlotTypeMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    version: S.optional(S.String),
  }),
).annotate({
  identifier: "SlotTypeMetadata",
}) as any as S.Schema<SlotTypeMetadata>;
export type SlotTypeMetadataList = SlotTypeMetadata[];
export const SlotTypeMetadataList = /*@__PURE__*/ S.Array(SlotTypeMetadata);
export interface GetSlotTypesResponse {
  slotTypes?: SlotTypeMetadata[];
  nextToken?: string;
}
export const GetSlotTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypes: S.optional(SlotTypeMetadataList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSlotTypesResponse",
}) as any as S.Schema<GetSlotTypesResponse>;
export interface GetSlotTypeVersionsRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export const GetSlotTypeVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/slottypes/{name}/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSlotTypeVersionsRequest",
}) as any as S.Schema<GetSlotTypeVersionsRequest>;
export interface GetSlotTypeVersionsResponse {
  slotTypes?: SlotTypeMetadata[];
  nextToken?: string;
}
export const GetSlotTypeVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypes: S.optional(SlotTypeMetadataList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetSlotTypeVersionsResponse",
}) as any as S.Schema<GetSlotTypeVersionsResponse>;
export type BotVersions = string[];
export const BotVersions = /*@__PURE__*/ S.Array(S.String);
export type StatusType = "Detected" | "Missed" | (string & {});
export const StatusType = S.String;

export interface GetUtterancesViewRequest {
  botName: string;
  botVersions: string[];
  statusType: StatusType;
}
export const GetUtterancesViewRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botName: S.String.pipe(T.HttpLabel("botName")),
    botVersions: BotVersions.pipe(T.HttpQuery("bot_versions")),
    statusType: StatusType.pipe(T.HttpQuery("status_type")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/bots/{botName}/utterances?view=aggregation",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetUtterancesViewRequest",
}) as any as S.Schema<GetUtterancesViewRequest>;
export type UtteranceString = string;
export type Count = number;
export interface UtteranceData {
  utteranceString?: string;
  count?: number;
  distinctUsers?: number;
  firstUtteredDate?: Date;
  lastUtteredDate?: Date;
}
export const UtteranceData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    utteranceString: S.optional(S.String),
    count: S.optional(S.Number),
    distinctUsers: S.optional(S.Number),
    firstUtteredDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUtteredDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "UtteranceData" }) as any as S.Schema<UtteranceData>;
export type ListOfUtterance = UtteranceData[];
export const ListOfUtterance = /*@__PURE__*/ S.Array(UtteranceData);
export interface UtteranceList {
  botVersion?: string;
  utterances?: UtteranceData[];
}
export const UtteranceList = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botVersion: S.optional(S.String),
    utterances: S.optional(ListOfUtterance),
  }),
).annotate({ identifier: "UtteranceList" }) as any as S.Schema<UtteranceList>;
export type ListsOfUtterances = UtteranceList[];
export const ListsOfUtterances = /*@__PURE__*/ S.Array(UtteranceList);
export interface GetUtterancesViewResponse {
  botName?: string;
  utterances?: UtteranceList[];
}
export const GetUtterancesViewResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botName: S.optional(S.String),
    utterances: S.optional(ListsOfUtterances),
  }),
).annotate({
  identifier: "GetUtterancesViewResponse",
}) as any as S.Schema<GetUtterancesViewResponse>;
export type AmazonResourceName = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
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
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type ProcessBehavior = "SAVE" | "BUILD" | (string & {});
export const ProcessBehavior = S.String;

export interface PutBotRequest {
  name: string;
  description?: string;
  intents?: Intent[];
  enableModelImprovements?: boolean;
  nluIntentConfidenceThreshold?: number;
  clarificationPrompt?: Prompt;
  abortStatement?: Statement;
  idleSessionTTLInSeconds?: number;
  voiceId?: string;
  checksum?: string;
  processBehavior?: ProcessBehavior;
  locale: Locale;
  childDirected: boolean;
  detectSentiment?: boolean;
  createVersion?: boolean;
  tags?: Tag[];
}
export const PutBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    intents: S.optional(IntentList),
    enableModelImprovements: S.optional(S.Boolean),
    nluIntentConfidenceThreshold: S.optional(S.Number),
    clarificationPrompt: S.optional(Prompt),
    abortStatement: S.optional(Statement),
    idleSessionTTLInSeconds: S.optional(S.Number),
    voiceId: S.optional(S.String),
    checksum: S.optional(S.String),
    processBehavior: S.optional(ProcessBehavior),
    locale: Locale,
    childDirected: S.Boolean,
    detectSentiment: S.optional(S.Boolean),
    createVersion: S.optional(S.Boolean),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/bots/{name}/versions/$LATEST" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "PutBotRequest" }) as any as S.Schema<PutBotRequest>;
export interface PutBotResponse {
  name?: string;
  description?: string;
  intents?: Intent[];
  enableModelImprovements?: boolean;
  nluIntentConfidenceThreshold?: number;
  clarificationPrompt?: Prompt;
  abortStatement?: Statement;
  status?: Status;
  failureReason?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  idleSessionTTLInSeconds?: number;
  voiceId?: string;
  checksum?: string;
  version?: string;
  locale?: Locale;
  childDirected?: boolean;
  createVersion?: boolean;
  detectSentiment?: boolean;
  tags?: Tag[];
}
export const PutBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    intents: S.optional(IntentList),
    enableModelImprovements: S.optional(S.Boolean),
    nluIntentConfidenceThreshold: S.optional(S.Number),
    clarificationPrompt: S.optional(Prompt),
    abortStatement: S.optional(Statement),
    status: S.optional(Status),
    failureReason: S.optional(S.String),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    idleSessionTTLInSeconds: S.optional(S.Number),
    voiceId: S.optional(S.String),
    checksum: S.optional(S.String),
    version: S.optional(S.String),
    locale: S.optional(Locale),
    childDirected: S.optional(S.Boolean),
    createVersion: S.optional(S.Boolean),
    detectSentiment: S.optional(S.Boolean),
    tags: S.optional(TagList),
  }),
).annotate({ identifier: "PutBotResponse" }) as any as S.Schema<PutBotResponse>;
export interface LogSettingsRequest {
  logType: LogType;
  destination: Destination;
  kmsKeyArn?: string;
  resourceArn: string;
}
export const LogSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    logType: LogType,
    destination: Destination,
    kmsKeyArn: S.optional(S.String),
    resourceArn: S.String,
  }),
).annotate({
  identifier: "LogSettingsRequest",
}) as any as S.Schema<LogSettingsRequest>;
export type LogSettingsRequestList = LogSettingsRequest[];
export const LogSettingsRequestList = /*@__PURE__*/ S.Array(LogSettingsRequest);
export interface ConversationLogsRequest {
  logSettings: LogSettingsRequest[];
  iamRoleArn: string;
}
export const ConversationLogsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ logSettings: LogSettingsRequestList, iamRoleArn: S.String }),
).annotate({
  identifier: "ConversationLogsRequest",
}) as any as S.Schema<ConversationLogsRequest>;
export interface PutBotAliasRequest {
  name: string;
  description?: string;
  botVersion: string;
  botName: string;
  checksum?: string;
  conversationLogs?: ConversationLogsRequest;
  tags?: Tag[];
}
export const PutBotAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    botVersion: S.String,
    botName: S.String.pipe(T.HttpLabel("botName")),
    checksum: S.optional(S.String),
    conversationLogs: S.optional(ConversationLogsRequest),
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/bots/{botName}/aliases/{name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutBotAliasRequest",
}) as any as S.Schema<PutBotAliasRequest>;
export interface PutBotAliasResponse {
  name?: string;
  description?: string;
  botVersion?: string;
  botName?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  checksum?: string;
  conversationLogs?: ConversationLogsResponse;
  tags?: Tag[];
}
export const PutBotAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    botVersion: S.optional(S.String),
    botName: S.optional(S.String),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    checksum: S.optional(S.String),
    conversationLogs: S.optional(ConversationLogsResponse),
    tags: S.optional(TagList),
  }),
).annotate({
  identifier: "PutBotAliasResponse",
}) as any as S.Schema<PutBotAliasResponse>;
export interface PutIntentRequest {
  name: string;
  description?: string;
  slots?: Slot[];
  sampleUtterances?: string[];
  confirmationPrompt?: Prompt;
  rejectionStatement?: Statement;
  followUpPrompt?: FollowUpPrompt;
  conclusionStatement?: Statement;
  dialogCodeHook?: CodeHook;
  fulfillmentActivity?: FulfillmentActivity;
  parentIntentSignature?: string;
  checksum?: string;
  createVersion?: boolean;
  kendraConfiguration?: KendraConfiguration;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
}
export const PutIntentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    slots: S.optional(SlotList),
    sampleUtterances: S.optional(IntentUtteranceList),
    confirmationPrompt: S.optional(Prompt),
    rejectionStatement: S.optional(Statement),
    followUpPrompt: S.optional(FollowUpPrompt),
    conclusionStatement: S.optional(Statement),
    dialogCodeHook: S.optional(CodeHook),
    fulfillmentActivity: S.optional(FulfillmentActivity),
    parentIntentSignature: S.optional(S.String),
    checksum: S.optional(S.String),
    createVersion: S.optional(S.Boolean),
    kendraConfiguration: S.optional(KendraConfiguration),
    inputContexts: S.optional(InputContextList),
    outputContexts: S.optional(OutputContextList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/intents/{name}/versions/$LATEST" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutIntentRequest",
}) as any as S.Schema<PutIntentRequest>;
export interface PutIntentResponse {
  name?: string;
  description?: string;
  slots?: Slot[];
  sampleUtterances?: string[];
  confirmationPrompt?: Prompt;
  rejectionStatement?: Statement;
  followUpPrompt?: FollowUpPrompt;
  conclusionStatement?: Statement;
  dialogCodeHook?: CodeHook;
  fulfillmentActivity?: FulfillmentActivity;
  parentIntentSignature?: string;
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
  checksum?: string;
  createVersion?: boolean;
  kendraConfiguration?: KendraConfiguration;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
}
export const PutIntentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    slots: S.optional(SlotList),
    sampleUtterances: S.optional(IntentUtteranceList),
    confirmationPrompt: S.optional(Prompt),
    rejectionStatement: S.optional(Statement),
    followUpPrompt: S.optional(FollowUpPrompt),
    conclusionStatement: S.optional(Statement),
    dialogCodeHook: S.optional(CodeHook),
    fulfillmentActivity: S.optional(FulfillmentActivity),
    parentIntentSignature: S.optional(S.String),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    version: S.optional(S.String),
    checksum: S.optional(S.String),
    createVersion: S.optional(S.Boolean),
    kendraConfiguration: S.optional(KendraConfiguration),
    inputContexts: S.optional(InputContextList),
    outputContexts: S.optional(OutputContextList),
  }),
).annotate({
  identifier: "PutIntentResponse",
}) as any as S.Schema<PutIntentResponse>;
export interface PutSlotTypeRequest {
  name: string;
  description?: string;
  enumerationValues?: EnumerationValue[];
  checksum?: string;
  valueSelectionStrategy?: SlotValueSelectionStrategy;
  createVersion?: boolean;
  parentSlotTypeSignature?: string;
  slotTypeConfigurations?: SlotTypeConfiguration[];
}
export const PutSlotTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String.pipe(T.HttpLabel("name")),
    description: S.optional(S.String),
    enumerationValues: S.optional(EnumerationValues),
    checksum: S.optional(S.String),
    valueSelectionStrategy: S.optional(SlotValueSelectionStrategy),
    createVersion: S.optional(S.Boolean),
    parentSlotTypeSignature: S.optional(S.String),
    slotTypeConfigurations: S.optional(SlotTypeConfigurations),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/slottypes/{name}/versions/$LATEST" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutSlotTypeRequest",
}) as any as S.Schema<PutSlotTypeRequest>;
export interface PutSlotTypeResponse {
  name?: string;
  description?: string;
  enumerationValues?: EnumerationValue[];
  lastUpdatedDate?: Date;
  createdDate?: Date;
  version?: string;
  checksum?: string;
  valueSelectionStrategy?: SlotValueSelectionStrategy;
  createVersion?: boolean;
  parentSlotTypeSignature?: string;
  slotTypeConfigurations?: SlotTypeConfiguration[];
}
export const PutSlotTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    description: S.optional(S.String),
    enumerationValues: S.optional(EnumerationValues),
    lastUpdatedDate: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    version: S.optional(S.String),
    checksum: S.optional(S.String),
    valueSelectionStrategy: S.optional(SlotValueSelectionStrategy),
    createVersion: S.optional(S.Boolean),
    parentSlotTypeSignature: S.optional(S.String),
    slotTypeConfigurations: S.optional(SlotTypeConfigurations),
  }),
).annotate({
  identifier: "PutSlotTypeResponse",
}) as any as S.Schema<PutSlotTypeResponse>;
export interface StartImportRequest {
  payload: Uint8Array;
  resourceType: ResourceType;
  mergeStrategy: MergeStrategy;
  tags?: Tag[];
}
export const StartImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    payload: T.Blob,
    resourceType: ResourceType,
    mergeStrategy: MergeStrategy,
    tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/imports" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartImportRequest",
}) as any as S.Schema<StartImportRequest>;
export interface StartImportResponse {
  name?: string;
  resourceType?: ResourceType;
  mergeStrategy?: MergeStrategy;
  importId?: string;
  importStatus?: ImportStatus;
  tags?: Tag[];
  createdDate?: Date;
}
export const StartImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    mergeStrategy: S.optional(MergeStrategy),
    importId: S.optional(S.String),
    importStatus: S.optional(ImportStatus),
    tags: S.optional(TagList),
    createdDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "StartImportResponse",
}) as any as S.Schema<StartImportResponse>;
export type V2BotName = string;
export interface StartMigrationRequest {
  v1BotName: string;
  v1BotVersion: string;
  v2BotName: string;
  v2BotRole: string;
  migrationStrategy: MigrationStrategy;
}
export const StartMigrationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    v1BotName: S.String,
    v1BotVersion: S.String,
    v2BotName: S.String,
    v2BotRole: S.String,
    migrationStrategy: MigrationStrategy,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/migrations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMigrationRequest",
}) as any as S.Schema<StartMigrationRequest>;
export interface StartMigrationResponse {
  v1BotName?: string;
  v1BotVersion?: string;
  v1BotLocale?: Locale;
  v2BotId?: string;
  v2BotRole?: string;
  migrationId?: string;
  migrationStrategy?: MigrationStrategy;
  migrationTimestamp?: Date;
}
export const StartMigrationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    v1BotName: S.optional(S.String),
    v1BotVersion: S.optional(S.String),
    v1BotLocale: S.optional(Locale),
    v2BotId: S.optional(S.String),
    v2BotRole: S.optional(S.String),
    migrationId: S.optional(S.String),
    migrationStrategy: S.optional(MigrationStrategy),
    migrationTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "StartMigrationResponse",
}) as any as S.Schema<StartMigrationResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagList,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
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
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
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
export type ReferenceType =
  | "Intent"
  | "Bot"
  | "BotAlias"
  | "BotChannel"
  | (string & {});
export const ReferenceType = S.String;

export interface ResourceReference {
  name?: string;
  version?: string;
}
export const ResourceReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.optional(S.String), version: S.optional(S.String) }),
).annotate({
  identifier: "ResourceReference",
}) as any as S.Schema<ResourceReference>;
export type CreateBotVersionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates a new version of the bot based on the `$LATEST`
 * version. If the `$LATEST` version of this resource hasn't
 * changed since you created the last version, Amazon Lex doesn't create a new
 * version. It returns the last created version.
 *
 * You can update only the `$LATEST` version of the bot.
 * You can't update the numbered versions that you create with the
 * `CreateBotVersion` operation.
 *
 * When you create the first version of a bot, Amazon Lex sets the version
 * to 1. Subsequent versions increment by 1. For more information, see versioning-intro.
 *
 * This operation requires permission for the
 * `lex:CreateBotVersion` action.
 */
export const createBotVersion: API.OperationMethod<
  CreateBotVersionRequest,
  CreateBotVersionResponse,
  CreateBotVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBotVersionRequest,
  output: CreateBotVersionResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBotVersion",
}));

export type CreateIntentVersionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates a new version of an intent based on the
 * `$LATEST` version of the intent. If the `$LATEST`
 * version of this intent hasn't changed since you last updated it, Amazon Lex
 * doesn't create a new version. It returns the last version you
 * created.
 *
 * You can update only the `$LATEST` version of the
 * intent. You can't update the numbered versions that you create with the
 * `CreateIntentVersion` operation.
 *
 * When you create a version of an intent, Amazon Lex sets the version to
 * 1. Subsequent versions increment by 1. For more information, see versioning-intro.
 *
 * This operation requires permissions to perform the
 * `lex:CreateIntentVersion` action.
 */
export const createIntentVersion: API.OperationMethod<
  CreateIntentVersionRequest,
  CreateIntentVersionResponse,
  CreateIntentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIntentVersionRequest,
  output: CreateIntentVersionResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntentVersion",
}));

export type CreateSlotTypeVersionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates a new version of a slot type based on the
 * `$LATEST` version of the specified slot type. If the
 * `$LATEST` version of this resource has not changed since the
 * last version that you created, Amazon Lex doesn't create a new version. It
 * returns the last version that you created.
 *
 * You can update only the `$LATEST` version of a slot
 * type. You can't update the numbered versions that you create with the
 * `CreateSlotTypeVersion` operation.
 *
 * When you create a version of a slot type, Amazon Lex sets the version to
 * 1. Subsequent versions increment by 1. For more information, see versioning-intro.
 *
 * This operation requires permissions for the
 * `lex:CreateSlotTypeVersion` action.
 */
export const createSlotTypeVersion: API.OperationMethod<
  CreateSlotTypeVersionRequest,
  CreateSlotTypeVersionResponse,
  CreateSlotTypeVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSlotTypeVersionRequest,
  output: CreateSlotTypeVersionResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSlotTypeVersion",
}));

export type DeleteBotError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes all versions of the bot, including the `$LATEST`
 * version. To delete a specific version of the bot, use the DeleteBotVersion operation. The `DeleteBot`
 * operation doesn't immediately remove the bot schema. Instead, it is marked
 * for deletion and removed later.
 *
 * Amazon Lex stores utterances indefinitely for improving the ability of
 * your bot to respond to user inputs. These utterances are not removed when
 * the bot is deleted. To remove the utterances, use the DeleteUtterances operation.
 *
 * If a bot has an alias, you can't delete it. Instead, the
 * `DeleteBot` operation returns a
 * `ResourceInUseException` exception that includes a reference
 * to the alias that refers to the bot. To remove the reference to the bot,
 * delete the alias. If you get the same exception again, delete the
 * referring alias until the `DeleteBot` operation is
 * successful.
 *
 * This operation requires permissions for the
 * `lex:DeleteBot` action.
 */
export const deleteBot: API.OperationMethod<
  DeleteBotRequest,
  DeleteBotResponse,
  DeleteBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBotRequest,
  output: DeleteBotResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBot",
}));

export type DeleteBotAliasError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes an alias for the specified bot.
 *
 * You can't delete an alias that is used in the association between a
 * bot and a messaging channel. If an alias is used in a channel association,
 * the `DeleteBot` operation returns a
 * `ResourceInUseException` exception that includes a reference
 * to the channel association that refers to the bot. You can remove the
 * reference to the alias by deleting the channel association. If you get the
 * same exception again, delete the referring association until the
 * `DeleteBotAlias` operation is successful.
 */
export const deleteBotAlias: API.OperationMethod<
  DeleteBotAliasRequest,
  DeleteBotAliasResponse,
  DeleteBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBotAliasRequest,
  output: DeleteBotAliasResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotAlias",
}));

export type DeleteBotChannelAssociationError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes the association between an Amazon Lex bot and a messaging
 * platform.
 *
 * This operation requires permission for the
 * `lex:DeleteBotChannelAssociation` action.
 */
export const deleteBotChannelAssociation: API.OperationMethod<
  DeleteBotChannelAssociationRequest,
  DeleteBotChannelAssociationResponse,
  DeleteBotChannelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBotChannelAssociationRequest,
  output: DeleteBotChannelAssociationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotChannelAssociation",
}));

export type DeleteBotVersionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes a specific version of a bot. To delete all versions of a
 * bot, use the DeleteBot operation.
 *
 * This operation requires permissions for the
 * `lex:DeleteBotVersion` action.
 */
export const deleteBotVersion: API.OperationMethod<
  DeleteBotVersionRequest,
  DeleteBotVersionResponse,
  DeleteBotVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBotVersionRequest,
  output: DeleteBotVersionResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotVersion",
}));

export type DeleteIntentError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes all versions of the intent, including the
 * `$LATEST` version. To delete a specific version of the
 * intent, use the DeleteIntentVersion operation.
 *
 * You can delete a version of an intent only if it is not
 * referenced. To delete an intent that is referred to in one or more bots
 * (see how-it-works), you must remove those references
 * first.
 *
 * If you get the `ResourceInUseException` exception, it
 * provides an example reference that shows where the intent is referenced.
 * To remove the reference to the intent, either update the bot or delete
 * it. If you get the same exception when you attempt to delete the intent
 * again, repeat until the intent has no references and the call to
 * `DeleteIntent` is successful.
 *
 * This operation requires permission for the
 * `lex:DeleteIntent` action.
 */
export const deleteIntent: API.OperationMethod<
  DeleteIntentRequest,
  DeleteIntentResponse,
  DeleteIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIntentRequest,
  output: DeleteIntentResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntent",
}));

export type DeleteIntentVersionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes a specific version of an intent. To delete all versions of
 * a intent, use the DeleteIntent operation.
 *
 * This operation requires permissions for the
 * `lex:DeleteIntentVersion` action.
 */
export const deleteIntentVersion: API.OperationMethod<
  DeleteIntentVersionRequest,
  DeleteIntentVersionResponse,
  DeleteIntentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIntentVersionRequest,
  output: DeleteIntentVersionResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntentVersion",
}));

export type DeleteSlotTypeError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes all versions of the slot type, including the
 * `$LATEST` version. To delete a specific version of the slot
 * type, use the DeleteSlotTypeVersion operation.
 *
 * You can delete a version of a slot type only if it is not
 * referenced. To delete a slot type that is referred to in one or more
 * intents, you must remove those references first.
 *
 * If you get the `ResourceInUseException` exception,
 * the exception provides an example reference that shows the intent where
 * the slot type is referenced. To remove the reference to the slot type,
 * either update the intent or delete it. If you get the same exception
 * when you attempt to delete the slot type again, repeat until the slot
 * type has no references and the `DeleteSlotType` call is
 * successful.
 *
 * This operation requires permission for the
 * `lex:DeleteSlotType` action.
 */
export const deleteSlotType: API.OperationMethod<
  DeleteSlotTypeRequest,
  DeleteSlotTypeResponse,
  DeleteSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSlotTypeRequest,
  output: DeleteSlotTypeResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlotType",
}));

export type DeleteSlotTypeVersionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | ResourceInUseException
  | CommonErrors;
/**
 * Deletes a specific version of a slot type. To delete all versions
 * of a slot type, use the DeleteSlotType operation.
 *
 * This operation requires permissions for the
 * `lex:DeleteSlotTypeVersion` action.
 */
export const deleteSlotTypeVersion: API.OperationMethod<
  DeleteSlotTypeVersionRequest,
  DeleteSlotTypeVersionResponse,
  DeleteSlotTypeVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSlotTypeVersionRequest,
  output: DeleteSlotTypeVersionResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
    ResourceInUseException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlotTypeVersion",
}));

export type DeleteUtterancesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes stored utterances.
 *
 * Amazon Lex stores the utterances that users send to your bot. Utterances
 * are stored for 15 days for use with the GetUtterancesView operation, and then stored indefinitely for use in improving the
 * ability of your bot to respond to user input.
 *
 * Use the `DeleteUtterances` operation to manually delete
 * stored utterances for a specific user. When you use the
 * `DeleteUtterances` operation, utterances stored for improving
 * your bot's ability to respond to user input are deleted immediately.
 * Utterances stored for use with the `GetUtterancesView`
 * operation are deleted after 15 days.
 *
 * This operation requires permissions for the
 * `lex:DeleteUtterances` action.
 */
export const deleteUtterances: API.OperationMethod<
  DeleteUtterancesRequest,
  DeleteUtterancesResponse,
  DeleteUtterancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUtterancesRequest,
  output: DeleteUtterancesResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUtterances",
}));

export type GetBotError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns metadata information for a specific bot. You must provide
 * the bot name and the bot version or alias.
 *
 * This operation requires permissions for the
 * `lex:GetBot` action.
 */
export const getBot: API.OperationMethod<
  GetBotRequest,
  GetBotResponse,
  GetBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBotRequest,
  output: GetBotResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBot",
}));

export type GetBotAliasError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about an Amazon Lex bot alias. For more information
 * about aliases, see versioning-aliases.
 *
 * This operation requires permissions for the
 * `lex:GetBotAlias` action.
 */
export const getBotAlias: API.OperationMethod<
  GetBotAliasRequest,
  GetBotAliasResponse,
  GetBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBotAliasRequest,
  output: GetBotAliasResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotAlias",
}));

export type GetBotAliasesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns a list of aliases for a specified Amazon Lex bot.
 *
 * This operation requires permissions for the
 * `lex:GetBotAliases` action.
 */
export const getBotAliases: API.PaginatedOperationMethod<
  GetBotAliasesRequest,
  GetBotAliasesResponse,
  GetBotAliasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBotAliasesRequest,
  output: GetBotAliasesResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotAliases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBotChannelAssociationError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about the association between an Amazon Lex bot and
 * a messaging platform.
 *
 * This operation requires permissions for the
 * `lex:GetBotChannelAssociation` action.
 */
export const getBotChannelAssociation: API.OperationMethod<
  GetBotChannelAssociationRequest,
  GetBotChannelAssociationResponse,
  GetBotChannelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBotChannelAssociationRequest,
  output: GetBotChannelAssociationResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotChannelAssociation",
}));

export type GetBotChannelAssociationsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Returns a list of all of the channels associated with the
 * specified bot.
 *
 * The `GetBotChannelAssociations` operation requires
 * permissions for the `lex:GetBotChannelAssociations`
 * action.
 */
export const getBotChannelAssociations: API.PaginatedOperationMethod<
  GetBotChannelAssociationsRequest,
  GetBotChannelAssociationsResponse,
  GetBotChannelAssociationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBotChannelAssociationsRequest,
  output: GetBotChannelAssociationsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotChannelAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBotsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns bot information as follows:
 *
 * - If you provide the `nameContains` field, the
 * response includes information for the `$LATEST` version of
 * all bots whose name contains the specified string.
 *
 * - If you don't specify the `nameContains` field, the
 * operation returns information about the `$LATEST` version
 * of all of your bots.
 *
 * This operation requires permission for the `lex:GetBots`
 * action.
 */
export const getBots: API.PaginatedOperationMethod<
  GetBotsRequest,
  GetBotsResponse,
  GetBotsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBotsRequest,
  output: GetBotsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBotVersionsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Gets information about all of the versions of a bot.
 *
 * The `GetBotVersions` operation returns a
 * `BotMetadata` object for each version of a bot. For example,
 * if a bot has three numbered versions, the `GetBotVersions`
 * operation returns four `BotMetadata` objects in the response,
 * one for each numbered version and one for the `$LATEST`
 * version.
 *
 * The `GetBotVersions` operation always returns at least
 * one version, the `$LATEST` version.
 *
 * This operation requires permissions for the
 * `lex:GetBotVersions` action.
 */
export const getBotVersions: API.PaginatedOperationMethod<
  GetBotVersionsRequest,
  GetBotVersionsResponse,
  GetBotVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBotVersionsRequest,
  output: GetBotVersionsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBotVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBuiltinIntentError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about a built-in intent.
 *
 * This operation requires permission for the
 * `lex:GetBuiltinIntent` action.
 */
export const getBuiltinIntent: API.OperationMethod<
  GetBuiltinIntentRequest,
  GetBuiltinIntentResponse,
  GetBuiltinIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetBuiltinIntentRequest,
  output: GetBuiltinIntentResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBuiltinIntent",
}));

export type GetBuiltinIntentsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Gets a list of built-in intents that meet the specified
 * criteria.
 *
 * This operation requires permission for the
 * `lex:GetBuiltinIntents` action.
 */
export const getBuiltinIntents: API.PaginatedOperationMethod<
  GetBuiltinIntentsRequest,
  GetBuiltinIntentsResponse,
  GetBuiltinIntentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBuiltinIntentsRequest,
  output: GetBuiltinIntentsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBuiltinIntents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBuiltinSlotTypesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Gets a list of built-in slot types that meet the specified
 * criteria.
 *
 * For a list of built-in slot types, see Slot Type Reference in the Alexa Skills
 * Kit.
 *
 * This operation requires permission for the
 * `lex:GetBuiltInSlotTypes` action.
 */
export const getBuiltinSlotTypes: API.PaginatedOperationMethod<
  GetBuiltinSlotTypesRequest,
  GetBuiltinSlotTypesResponse,
  GetBuiltinSlotTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetBuiltinSlotTypesRequest,
  output: GetBuiltinSlotTypesResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBuiltinSlotTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetExportError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Exports the contents of a Amazon Lex resource in a specified format.
 */
export const getExport: API.OperationMethod<
  GetExportRequest,
  GetExportResponse,
  GetExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetExportRequest,
  output: GetExportResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExport",
}));

export type GetImportError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Gets information about an import job started with the
 * `StartImport` operation.
 */
export const getImport: API.OperationMethod<
  GetImportRequest,
  GetImportResponse,
  GetImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetImportRequest,
  output: GetImportResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImport",
}));

export type GetIntentError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about an intent. In addition to the intent
 * name, you must specify the intent version.
 *
 * This operation requires permissions to perform the
 * `lex:GetIntent` action.
 */
export const getIntent: API.OperationMethod<
  GetIntentRequest,
  GetIntentResponse,
  GetIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIntentRequest,
  output: GetIntentResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntent",
}));

export type GetIntentsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns intent information as follows:
 *
 * - If you specify the `nameContains` field, returns the
 * `$LATEST` version of all intents that contain the
 * specified string.
 *
 * - If you don't specify the `nameContains` field,
 * returns information about the `$LATEST` version of all
 * intents.
 *
 * The operation requires permission for the
 * `lex:GetIntents` action.
 */
export const getIntents: API.PaginatedOperationMethod<
  GetIntentsRequest,
  GetIntentsResponse,
  GetIntentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetIntentsRequest,
  output: GetIntentsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetIntentVersionsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Gets information about all of the versions of an intent.
 *
 * The `GetIntentVersions` operation returns an
 * `IntentMetadata` object for each version of an intent. For
 * example, if an intent has three numbered versions, the
 * `GetIntentVersions` operation returns four
 * `IntentMetadata` objects in the response, one for each
 * numbered version and one for the `$LATEST` version.
 *
 * The `GetIntentVersions` operation always returns at
 * least one version, the `$LATEST` version.
 *
 * This operation requires permissions for the
 * `lex:GetIntentVersions` action.
 */
export const getIntentVersions: API.PaginatedOperationMethod<
  GetIntentVersionsRequest,
  GetIntentVersionsResponse,
  GetIntentVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetIntentVersionsRequest,
  output: GetIntentVersionsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntentVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetMigrationError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides details about an ongoing or complete migration from an
 * Amazon Lex V1 bot to an Amazon Lex V2 bot. Use this operation to view the migration
 * alerts and warnings related to the migration.
 */
export const getMigration: API.OperationMethod<
  GetMigrationRequest,
  GetMigrationResponse,
  GetMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMigrationRequest,
  output: GetMigrationResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMigration",
}));

export type GetMigrationsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Gets a list of migrations between Amazon Lex V1 and Amazon Lex V2.
 */
export const getMigrations: API.PaginatedOperationMethod<
  GetMigrationsRequest,
  GetMigrationsResponse,
  GetMigrationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetMigrationsRequest,
  output: GetMigrationsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMigrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetSlotTypeError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns information about a specific version of a slot type. In
 * addition to specifying the slot type name, you must specify the slot type
 * version.
 *
 * This operation requires permissions for the
 * `lex:GetSlotType` action.
 */
export const getSlotType: API.OperationMethod<
  GetSlotTypeRequest,
  GetSlotTypeResponse,
  GetSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSlotTypeRequest,
  output: GetSlotTypeResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSlotType",
}));

export type GetSlotTypesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Returns slot type information as follows:
 *
 * - If you specify the `nameContains` field, returns the
 * `$LATEST` version of all slot types that contain the
 * specified string.
 *
 * - If you don't specify the `nameContains` field,
 * returns information about the `$LATEST` version of all slot
 * types.
 *
 * The operation requires permission for the
 * `lex:GetSlotTypes` action.
 */
export const getSlotTypes: API.PaginatedOperationMethod<
  GetSlotTypesRequest,
  GetSlotTypesResponse,
  GetSlotTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetSlotTypesRequest,
  output: GetSlotTypesResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSlotTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetSlotTypeVersionsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Gets information about all versions of a slot type.
 *
 * The `GetSlotTypeVersions` operation returns a
 * `SlotTypeMetadata` object for each version of a slot type.
 * For example, if a slot type has three numbered versions, the
 * `GetSlotTypeVersions` operation returns four
 * `SlotTypeMetadata` objects in the response, one for each
 * numbered version and one for the `$LATEST` version.
 *
 * The `GetSlotTypeVersions` operation always returns at
 * least one version, the `$LATEST` version.
 *
 * This operation requires permissions for the
 * `lex:GetSlotTypeVersions` action.
 */
export const getSlotTypeVersions: API.PaginatedOperationMethod<
  GetSlotTypeVersionsRequest,
  GetSlotTypeVersionsResponse,
  GetSlotTypeVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetSlotTypeVersionsRequest,
  output: GetSlotTypeVersionsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSlotTypeVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetUtterancesViewError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Use the `GetUtterancesView` operation to get information
 * about the utterances that your users have made to your bot. You can use
 * this list to tune the utterances that your bot responds to.
 *
 * For example, say that you have created a bot to order flowers.
 * After your users have used your bot for a while, use the
 * `GetUtterancesView` operation to see the requests that they
 * have made and whether they have been successful. You might find that the
 * utterance "I want flowers" is not being recognized. You could add this
 * utterance to the `OrderFlowers` intent so that your bot
 * recognizes that utterance.
 *
 * After you publish a new version of a bot, you can get information
 * about the old version and the new so that you can compare the performance
 * across the two versions.
 *
 * Utterance statistics are generated once a day. Data is available
 * for the last 15 days. You can request information for up to 5 versions of
 * your bot in each request. Amazon Lex returns the most frequent utterances
 * received by the bot in the last 15 days. The response contains information
 * about a maximum of 100 utterances for each version.
 *
 * If you set `childDirected` field to true when you
 * created your bot, if you are using slot obfuscation with one or more
 * slots, or if you opted out of participating in improving Amazon Lex, utterances
 * are not available.
 *
 * This operation requires permissions for the
 * `lex:GetUtterancesView` action.
 */
export const getUtterancesView: API.OperationMethod<
  GetUtterancesViewRequest,
  GetUtterancesViewResponse,
  GetUtterancesViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetUtterancesViewRequest,
  output: GetUtterancesViewResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUtterancesView",
}));

export type ListTagsForResourceError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Gets a list of tags associated with the specified resource. Only bots,
 * bot aliases, and bot channels can have tags associated with them.
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
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutBotError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates an Amazon Lex conversational bot or replaces an existing bot.
 * When you create or update a bot you are only required to specify a name, a
 * locale, and whether the bot is directed toward children under age 13. You
 * can use this to add intents later, or to remove intents from an existing
 * bot. When you create a bot with the minimum information, the bot is
 * created or updated but Amazon Lex returns the `` response
 * `FAILED`. You can build the bot after you add one or more
 * intents. For more information about Amazon Lex bots, see how-it-works.
 *
 * If you specify the name of an existing bot, the fields in the
 * request replace the existing values in the `$LATEST` version of
 * the bot. Amazon Lex removes any fields that you don't provide values for in the
 * request, except for the `idleTTLInSeconds` and
 * `privacySettings` fields, which are set to their default
 * values. If you don't specify values for required fields, Amazon Lex throws an
 * exception.
 *
 * This operation requires permissions for the `lex:PutBot`
 * action. For more information, see security-iam.
 */
export const putBot: API.OperationMethod<
  PutBotRequest,
  PutBotResponse,
  PutBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutBotRequest,
  output: PutBotResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBot",
}));

export type PutBotAliasError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates an alias for the specified version of the bot or replaces
 * an alias for the specified bot. To change the version of the bot that the
 * alias points to, replace the alias. For more information about aliases,
 * see versioning-aliases.
 *
 * This operation requires permissions for the
 * `lex:PutBotAlias` action.
 */
export const putBotAlias: API.OperationMethod<
  PutBotAliasRequest,
  PutBotAliasResponse,
  PutBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutBotAliasRequest,
  output: PutBotAliasResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBotAlias",
}));

export type PutIntentError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates an intent or replaces an existing intent.
 *
 * To define the interaction between the user and your bot, you use
 * one or more intents. For a pizza ordering bot, for example, you would
 * create an `OrderPizza` intent.
 *
 * To create an intent or replace an existing intent, you must provide
 * the following:
 *
 * - Intent name. For example, `OrderPizza`.
 *
 * - Sample utterances. For example, "Can I order a pizza, please."
 * and "I want to order a pizza."
 *
 * - Information to be gathered. You specify slot types for the
 * information that your bot will request from the user. You can specify
 * standard slot types, such as a date or a time, or custom slot types
 * such as the size and crust of a pizza.
 *
 * - How the intent will be fulfilled. You can provide a Lambda
 * function or configure the intent to return the intent information to
 * the client application. If you use a Lambda function, when all of the
 * intent information is available, Amazon Lex invokes your Lambda function.
 * If you configure your intent to return the intent information to the
 * client application.
 *
 * You can specify other optional information in the request, such
 * as:
 *
 * - A confirmation prompt to ask the user to confirm an intent. For
 * example, "Shall I order your pizza?"
 *
 * - A conclusion statement to send to the user after the intent has
 * been fulfilled. For example, "I placed your pizza order."
 *
 * - A follow-up prompt that asks the user for additional activity.
 * For example, asking "Do you want to order a drink with your
 * pizza?"
 *
 * If you specify an existing intent name to update the intent, Amazon Lex
 * replaces the values in the `$LATEST` version of the intent with
 * the values in the request. Amazon Lex removes fields that you don't provide in
 * the request. If you don't specify the required fields, Amazon Lex throws an
 * exception. When you update the `$LATEST` version of an intent,
 * the `status` field of any bot that uses the
 * `$LATEST` version of the intent is set to
 * `NOT_BUILT`.
 *
 * For more information, see how-it-works.
 *
 * This operation requires permissions for the
 * `lex:PutIntent` action.
 */
export const putIntent: API.OperationMethod<
  PutIntentRequest,
  PutIntentResponse,
  PutIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutIntentRequest,
  output: PutIntentResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIntent",
}));

export type PutSlotTypeError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | PreconditionFailedException
  | CommonErrors;
/**
 * Creates a custom slot type or replaces an existing custom slot
 * type.
 *
 * To create a custom slot type, specify a name for the slot type and
 * a set of enumeration values, which are the values that a slot of this type
 * can assume. For more information, see how-it-works.
 *
 * If you specify the name of an existing slot type, the fields in the
 * request replace the existing values in the `$LATEST` version of
 * the slot type. Amazon Lex removes the fields that you don't provide in the
 * request. If you don't specify required fields, Amazon Lex throws an exception.
 * When you update the `$LATEST` version of a slot type, if a bot
 * uses the `$LATEST` version of an intent that contains the slot
 * type, the bot's `status` field is set to
 * `NOT_BUILT`.
 *
 * This operation requires permissions for the
 * `lex:PutSlotType` action.
 */
export const putSlotType: API.OperationMethod<
  PutSlotTypeRequest,
  PutSlotTypeResponse,
  PutSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutSlotTypeRequest,
  output: PutSlotTypeResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    PreconditionFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutSlotType",
}));

export type StartImportError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Starts a job to import a resource to Amazon Lex.
 */
export const startImport: API.OperationMethod<
  StartImportRequest,
  StartImportResponse,
  StartImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartImportRequest,
  output: StartImportResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImport",
}));

export type StartMigrationError =
  | AccessDeniedException
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Starts migrating a bot from Amazon Lex V1 to Amazon Lex V2. Migrate your bot when
 * you want to take advantage of the new features of Amazon Lex V2.
 *
 * For more information, see Migrating a bot in the Amazon Lex
 * developer guide.
 */
export const startMigration: API.OperationMethod<
  StartMigrationRequest,
  StartMigrationResponse,
  StartMigrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMigrationRequest,
  output: StartMigrationResponse,
  errors: [
    AccessDeniedException,
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMigration",
}));

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource. If a tag key
 * already exists, the existing value is replaced with the new value.
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
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Removes tags from a bot, bot alias or bot channel.
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
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));
