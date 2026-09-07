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
  sdkId: "Lex Models V2",
  serviceShapeName: "LexModelBuildingServiceV2",
});
const auth = T.AwsAuthSigv4({ name: "lex" });
const ver = T.ServiceVersion("2020-08-07");
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
              `https://models-v2-lex-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://models-v2-lex-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://models-v2-lex.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://models-v2-lex.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class PreconditionFailedException
  extends /*@__PURE__*/ S.TaggedError<PreconditionFailedException>()(
    "PreconditionFailedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(412),
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Id = string;
export type BotVersion = string;
export type LocaleId = string;
export type Phrase = string;
export type Weight = number;
export interface NewCustomVocabularyItem {
  phrase: string;
  weight?: number;
  displayAs?: string;
}
export const NewCustomVocabularyItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    phrase: S.String,
    weight: S.optional(S.Number),
    displayAs: S.optional(S.String),
  }),
).annotate({
  identifier: "NewCustomVocabularyItem",
}) as any as S.Schema<NewCustomVocabularyItem>;
export type CreateCustomVocabularyItemsList = NewCustomVocabularyItem[];
export const CreateCustomVocabularyItemsList = /*@__PURE__*/ S.Array(
  NewCustomVocabularyItem,
);
export interface BatchCreateCustomVocabularyItemRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  customVocabularyItemList: NewCustomVocabularyItem[];
}
export const BatchCreateCustomVocabularyItemRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botId: S.String.pipe(T.HttpLabel("botId")),
      botVersion: S.String.pipe(T.HttpLabel("botVersion")),
      localeId: S.String.pipe(T.HttpLabel("localeId")),
      customVocabularyItemList: CreateCustomVocabularyItemsList,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/customvocabulary/DEFAULT/batchcreate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchCreateCustomVocabularyItemRequest",
}) as any as S.Schema<BatchCreateCustomVocabularyItemRequest>;
export type ItemId = string;
export type ErrorMessage = string;
export type ErrorCode =
  | "DUPLICATE_INPUT"
  | "RESOURCE_DOES_NOT_EXIST"
  | "RESOURCE_ALREADY_EXISTS"
  | "INTERNAL_SERVER_FAILURE"
  | (string & {});
export const ErrorCode = S.String;

export interface FailedCustomVocabularyItem {
  itemId?: string;
  errorMessage?: string;
  errorCode?: ErrorCode;
}
export const FailedCustomVocabularyItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    itemId: S.optional(S.String),
    errorMessage: S.optional(S.String),
    errorCode: S.optional(ErrorCode),
  }),
).annotate({
  identifier: "FailedCustomVocabularyItem",
}) as any as S.Schema<FailedCustomVocabularyItem>;
export type FailedCustomVocabularyItems = FailedCustomVocabularyItem[];
export const FailedCustomVocabularyItems = /*@__PURE__*/ S.Array(
  FailedCustomVocabularyItem,
);
export interface CustomVocabularyItem {
  itemId: string;
  phrase: string;
  weight?: number;
  displayAs?: string;
}
export const CustomVocabularyItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    itemId: S.String,
    phrase: S.String,
    weight: S.optional(S.Number),
    displayAs: S.optional(S.String),
  }),
).annotate({
  identifier: "CustomVocabularyItem",
}) as any as S.Schema<CustomVocabularyItem>;
export type CustomVocabularyItems = CustomVocabularyItem[];
export const CustomVocabularyItems =
  /*@__PURE__*/ S.Array(CustomVocabularyItem);
export interface BatchCreateCustomVocabularyItemResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  errors?: FailedCustomVocabularyItem[];
  resources?: CustomVocabularyItem[];
}
export const BatchCreateCustomVocabularyItemResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botId: S.optional(S.String),
      botVersion: S.optional(S.String),
      localeId: S.optional(S.String),
      errors: S.optional(FailedCustomVocabularyItems),
      resources: S.optional(CustomVocabularyItems),
    }),
).annotate({
  identifier: "BatchCreateCustomVocabularyItemResponse",
}) as any as S.Schema<BatchCreateCustomVocabularyItemResponse>;
export interface CustomVocabularyEntryId {
  itemId: string;
}
export const CustomVocabularyEntryId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ itemId: S.String }),
).annotate({
  identifier: "CustomVocabularyEntryId",
}) as any as S.Schema<CustomVocabularyEntryId>;
export type DeleteCustomVocabularyItemsList = CustomVocabularyEntryId[];
export const DeleteCustomVocabularyItemsList = /*@__PURE__*/ S.Array(
  CustomVocabularyEntryId,
);
export interface BatchDeleteCustomVocabularyItemRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  customVocabularyItemList: CustomVocabularyEntryId[];
}
export const BatchDeleteCustomVocabularyItemRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botId: S.String.pipe(T.HttpLabel("botId")),
      botVersion: S.String.pipe(T.HttpLabel("botVersion")),
      localeId: S.String.pipe(T.HttpLabel("localeId")),
      customVocabularyItemList: DeleteCustomVocabularyItemsList,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/customvocabulary/DEFAULT/batchdelete",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchDeleteCustomVocabularyItemRequest",
}) as any as S.Schema<BatchDeleteCustomVocabularyItemRequest>;
export interface BatchDeleteCustomVocabularyItemResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  errors?: FailedCustomVocabularyItem[];
  resources?: CustomVocabularyItem[];
}
export const BatchDeleteCustomVocabularyItemResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botId: S.optional(S.String),
      botVersion: S.optional(S.String),
      localeId: S.optional(S.String),
      errors: S.optional(FailedCustomVocabularyItems),
      resources: S.optional(CustomVocabularyItems),
    }),
).annotate({
  identifier: "BatchDeleteCustomVocabularyItemResponse",
}) as any as S.Schema<BatchDeleteCustomVocabularyItemResponse>;
export type UpdateCustomVocabularyItemsList = CustomVocabularyItem[];
export const UpdateCustomVocabularyItemsList =
  /*@__PURE__*/ S.Array(CustomVocabularyItem);
export interface BatchUpdateCustomVocabularyItemRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  customVocabularyItemList: CustomVocabularyItem[];
}
export const BatchUpdateCustomVocabularyItemRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botId: S.String.pipe(T.HttpLabel("botId")),
      botVersion: S.String.pipe(T.HttpLabel("botVersion")),
      localeId: S.String.pipe(T.HttpLabel("localeId")),
      customVocabularyItemList: UpdateCustomVocabularyItemsList,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/customvocabulary/DEFAULT/batchupdate",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchUpdateCustomVocabularyItemRequest",
}) as any as S.Schema<BatchUpdateCustomVocabularyItemRequest>;
export interface BatchUpdateCustomVocabularyItemResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  errors?: FailedCustomVocabularyItem[];
  resources?: CustomVocabularyItem[];
}
export const BatchUpdateCustomVocabularyItemResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botId: S.optional(S.String),
      botVersion: S.optional(S.String),
      localeId: S.optional(S.String),
      errors: S.optional(FailedCustomVocabularyItems),
      resources: S.optional(CustomVocabularyItems),
    }),
).annotate({
  identifier: "BatchUpdateCustomVocabularyItemResponse",
}) as any as S.Schema<BatchUpdateCustomVocabularyItemResponse>;
export type DraftBotVersion = string;
export interface BuildBotLocaleRequest {
  botId: string;
  botVersion: string;
  localeId: string;
}
export const BuildBotLocaleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "BuildBotLocaleRequest",
}) as any as S.Schema<BuildBotLocaleRequest>;
export type BotLocaleStatus =
  | "Creating"
  | "Building"
  | "Built"
  | "ReadyExpressTesting"
  | "Failed"
  | "Deleting"
  | "NotBuilt"
  | "Importing"
  | "Processing"
  | (string & {});
export const BotLocaleStatus = S.String;

export interface BuildBotLocaleResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botLocaleStatus?: BotLocaleStatus;
  lastBuildSubmittedDateTime?: Date;
}
export const BuildBotLocaleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    botLocaleStatus: S.optional(BotLocaleStatus),
    lastBuildSubmittedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "BuildBotLocaleResponse",
}) as any as S.Schema<BuildBotLocaleResponse>;
export type Name = string;
export type Description = string;
export type RoleArn = string;
export type ChildDirected = boolean;
export interface DataPrivacy {
  childDirected: boolean;
}
export const DataPrivacy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ childDirected: S.Boolean }),
).annotate({ identifier: "DataPrivacy" }) as any as S.Schema<DataPrivacy>;
export type SessionTTL = number;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type BotType = "Bot" | "BotNetwork" | (string & {});
export const BotType = S.String;

export type BotAliasId = string;
export type BotAliasName = string;
export interface BotMember {
  botMemberId: string;
  botMemberName: string;
  botMemberAliasId: string;
  botMemberAliasName: string;
  botMemberVersion: string;
}
export const BotMember = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botMemberId: S.String,
    botMemberName: S.String,
    botMemberAliasId: S.String,
    botMemberAliasName: S.String,
    botMemberVersion: S.String,
  }),
).annotate({ identifier: "BotMember" }) as any as S.Schema<BotMember>;
export type BotMembers = BotMember[];
export const BotMembers = /*@__PURE__*/ S.Array(BotMember);
export type BoxedBoolean = boolean;
export interface ErrorLogSettings {
  enabled: boolean;
}
export const ErrorLogSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.Boolean }),
).annotate({
  identifier: "ErrorLogSettings",
}) as any as S.Schema<ErrorLogSettings>;
export interface CreateBotRequest {
  botName: string;
  description?: string;
  roleArn: string;
  dataPrivacy: DataPrivacy;
  idleSessionTTLInSeconds: number;
  botTags?: { [key: string]: string | undefined };
  testBotAliasTags?: { [key: string]: string | undefined };
  botType?: BotType;
  botMembers?: BotMember[];
  errorLogSettings?: ErrorLogSettings;
}
export const CreateBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botName: S.String,
    description: S.optional(S.String),
    roleArn: S.String,
    dataPrivacy: DataPrivacy,
    idleSessionTTLInSeconds: S.Number,
    botTags: S.optional(TagMap),
    testBotAliasTags: S.optional(TagMap),
    botType: S.optional(BotType),
    botMembers: S.optional(BotMembers),
    errorLogSettings: S.optional(ErrorLogSettings),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/bots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBotRequest",
}) as any as S.Schema<CreateBotRequest>;
export type BotStatus =
  | "Creating"
  | "Available"
  | "Inactive"
  | "Deleting"
  | "Failed"
  | "Versioning"
  | "Importing"
  | "Updating"
  | (string & {});
export const BotStatus = S.String;

export interface CreateBotResponse {
  botId?: string;
  botName?: string;
  description?: string;
  roleArn?: string;
  dataPrivacy?: DataPrivacy;
  idleSessionTTLInSeconds?: number;
  botStatus?: BotStatus;
  creationDateTime?: Date;
  botTags?: { [key: string]: string | undefined };
  testBotAliasTags?: { [key: string]: string | undefined };
  botType?: BotType;
  botMembers?: BotMember[];
  errorLogSettings?: ErrorLogSettings;
}
export const CreateBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botName: S.optional(S.String),
    description: S.optional(S.String),
    roleArn: S.optional(S.String),
    dataPrivacy: S.optional(DataPrivacy),
    idleSessionTTLInSeconds: S.optional(S.Number),
    botStatus: S.optional(BotStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    botTags: S.optional(TagMap),
    testBotAliasTags: S.optional(TagMap),
    botType: S.optional(BotType),
    botMembers: S.optional(BotMembers),
    errorLogSettings: S.optional(ErrorLogSettings),
  }),
).annotate({
  identifier: "CreateBotResponse",
}) as any as S.Schema<CreateBotResponse>;
export type NumericalBotVersion = string;
export type LambdaARN = string;
export type CodeHookInterfaceVersion = string;
export interface LambdaCodeHook {
  lambdaARN: string;
  codeHookInterfaceVersion: string;
}
export const LambdaCodeHook = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lambdaARN: S.String, codeHookInterfaceVersion: S.String }),
).annotate({ identifier: "LambdaCodeHook" }) as any as S.Schema<LambdaCodeHook>;
export interface CodeHookSpecification {
  lambdaCodeHook: LambdaCodeHook;
}
export const CodeHookSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lambdaCodeHook: LambdaCodeHook }),
).annotate({
  identifier: "CodeHookSpecification",
}) as any as S.Schema<CodeHookSpecification>;
export interface BotAliasLocaleSettings {
  enabled: boolean;
  codeHookSpecification?: CodeHookSpecification;
}
export const BotAliasLocaleSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    codeHookSpecification: S.optional(CodeHookSpecification),
  }),
).annotate({
  identifier: "BotAliasLocaleSettings",
}) as any as S.Schema<BotAliasLocaleSettings>;
export type BotAliasLocaleSettingsMap = {
  [key: string]: BotAliasLocaleSettings | undefined;
};
export const BotAliasLocaleSettingsMap = /*@__PURE__*/ S.Record(
  S.String,
  BotAliasLocaleSettings.pipe(S.optional),
);
export type CloudWatchLogGroupArn = string;
export type LogPrefix = string;
export interface CloudWatchLogGroupLogDestination {
  cloudWatchLogGroupArn: string;
  logPrefix: string;
}
export const CloudWatchLogGroupLogDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cloudWatchLogGroupArn: S.String, logPrefix: S.String }),
).annotate({
  identifier: "CloudWatchLogGroupLogDestination",
}) as any as S.Schema<CloudWatchLogGroupLogDestination>;
export interface TextLogDestination {
  cloudWatch: CloudWatchLogGroupLogDestination;
}
export const TextLogDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ cloudWatch: CloudWatchLogGroupLogDestination }),
).annotate({
  identifier: "TextLogDestination",
}) as any as S.Schema<TextLogDestination>;
export interface TextLogSetting {
  enabled: boolean;
  destination: TextLogDestination;
  selectiveLoggingEnabled?: boolean;
}
export const TextLogSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    destination: TextLogDestination,
    selectiveLoggingEnabled: S.optional(S.Boolean),
  }),
).annotate({ identifier: "TextLogSetting" }) as any as S.Schema<TextLogSetting>;
export type TextLogSettingsList = TextLogSetting[];
export const TextLogSettingsList = /*@__PURE__*/ S.Array(TextLogSetting);
export type KmsKeyArn = string;
export type S3BucketArn = string;
export interface S3BucketLogDestination {
  kmsKeyArn?: string;
  s3BucketArn: string;
  logPrefix: string;
}
export const S3BucketLogDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kmsKeyArn: S.optional(S.String),
    s3BucketArn: S.String,
    logPrefix: S.String,
  }),
).annotate({
  identifier: "S3BucketLogDestination",
}) as any as S.Schema<S3BucketLogDestination>;
export interface AudioLogDestination {
  s3Bucket: S3BucketLogDestination;
}
export const AudioLogDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3Bucket: S3BucketLogDestination }),
).annotate({
  identifier: "AudioLogDestination",
}) as any as S.Schema<AudioLogDestination>;
export interface AudioLogSetting {
  enabled: boolean;
  destination: AudioLogDestination;
  selectiveLoggingEnabled?: boolean;
}
export const AudioLogSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    destination: AudioLogDestination,
    selectiveLoggingEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AudioLogSetting",
}) as any as S.Schema<AudioLogSetting>;
export type AudioLogSettingsList = AudioLogSetting[];
export const AudioLogSettingsList = /*@__PURE__*/ S.Array(AudioLogSetting);
export interface ConversationLogSettings {
  textLogSettings?: TextLogSetting[];
  audioLogSettings?: AudioLogSetting[];
}
export const ConversationLogSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    textLogSettings: S.optional(TextLogSettingsList),
    audioLogSettings: S.optional(AudioLogSettingsList),
  }),
).annotate({
  identifier: "ConversationLogSettings",
}) as any as S.Schema<ConversationLogSettings>;
export interface SentimentAnalysisSettings {
  detectSentiment: boolean;
}
export const SentimentAnalysisSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ detectSentiment: S.Boolean }),
).annotate({
  identifier: "SentimentAnalysisSettings",
}) as any as S.Schema<SentimentAnalysisSettings>;
export interface CreateBotAliasRequest {
  botAliasName: string;
  description?: string;
  botVersion?: string;
  botAliasLocaleSettings?: {
    [key: string]: BotAliasLocaleSettings | undefined;
  };
  conversationLogSettings?: ConversationLogSettings;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
  botId: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateBotAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasName: S.String,
    description: S.optional(S.String),
    botVersion: S.optional(S.String),
    botAliasLocaleSettings: S.optional(BotAliasLocaleSettingsMap),
    conversationLogSettings: S.optional(ConversationLogSettings),
    sentimentAnalysisSettings: S.optional(SentimentAnalysisSettings),
    botId: S.String.pipe(T.HttpLabel("botId")),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/bots/{botId}/botaliases" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBotAliasRequest",
}) as any as S.Schema<CreateBotAliasRequest>;
export type BotAliasStatus =
  | "Creating"
  | "Available"
  | "Deleting"
  | "Failed"
  | (string & {});
export const BotAliasStatus = S.String;

export interface CreateBotAliasResponse {
  botAliasId?: string;
  botAliasName?: string;
  description?: string;
  botVersion?: string;
  botAliasLocaleSettings?: {
    [key: string]: BotAliasLocaleSettings | undefined;
  };
  conversationLogSettings?: ConversationLogSettings;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
  botAliasStatus?: BotAliasStatus;
  botId?: string;
  creationDateTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export const CreateBotAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasId: S.optional(S.String),
    botAliasName: S.optional(S.String),
    description: S.optional(S.String),
    botVersion: S.optional(S.String),
    botAliasLocaleSettings: S.optional(BotAliasLocaleSettingsMap),
    conversationLogSettings: S.optional(ConversationLogSettings),
    sentimentAnalysisSettings: S.optional(SentimentAnalysisSettings),
    botAliasStatus: S.optional(BotAliasStatus),
    botId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateBotAliasResponse",
}) as any as S.Schema<CreateBotAliasResponse>;
export type ConfidenceThreshold = number;
export type VoiceEngine =
  | "standard"
  | "neural"
  | "long-form"
  | "generative"
  | (string & {});
export const VoiceEngine = S.String;

export type VoiceId = string;
export interface VoiceSettings {
  engine?: VoiceEngine;
  voiceId: string;
}
export const VoiceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ engine: S.optional(VoiceEngine), voiceId: S.String }),
).annotate({ identifier: "VoiceSettings" }) as any as S.Schema<VoiceSettings>;
export type BedrockModelArn = string;
export interface SpeechFoundationModel {
  modelArn: string;
  voiceId?: string;
}
export const SpeechFoundationModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ modelArn: S.String, voiceId: S.optional(S.String) }),
).annotate({
  identifier: "SpeechFoundationModel",
}) as any as S.Schema<SpeechFoundationModel>;
export interface UnifiedSpeechSettings {
  speechFoundationModel: SpeechFoundationModel;
}
export const UnifiedSpeechSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ speechFoundationModel: SpeechFoundationModel }),
).annotate({
  identifier: "UnifiedSpeechSettings",
}) as any as S.Schema<UnifiedSpeechSettings>;
export type AudioFillerType =
  | "MELODY_CHIPPER_CHIME"
  | "MELODY_CURIOUS_CRAWL"
  | "MELODY_RISING_RIPPLE"
  | "MELODY_PATIENT_PING"
  | "MELODY_PONDERING_PONG"
  | "TYPING_KINETIC_KEYS"
  | "TYPING_QUIET_QWERTY"
  | (string & {});
export const AudioFillerType = S.String;

export type AudioFillerDelayInMilliseconds = number;
export type AudioFillerDurationInMilliseconds = number;
export type AudioFillerDeliveryDelayInMilliseconds = number;
export interface AudioFillerSettings {
  enabled?: boolean;
  audioType?: AudioFillerType;
  startDelayInMilliseconds?: number;
  minimumPlayDurationInMilliseconds?: number;
  responseDeliveryDelayInMilliseconds?: number;
}
export const AudioFillerSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.optional(S.Boolean),
    audioType: S.optional(AudioFillerType),
    startDelayInMilliseconds: S.optional(S.Number),
    minimumPlayDurationInMilliseconds: S.optional(S.Number),
    responseDeliveryDelayInMilliseconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "AudioFillerSettings",
}) as any as S.Schema<AudioFillerSettings>;
export type SpeechModelPreference =
  | "Standard"
  | "Neural"
  | "Deepgram"
  | (string & {});
export const SpeechModelPreference = S.String;

export type SecretsManagerSecretArn = string;
export type DeepgramModelId = string;
export interface DeepgramSpeechModelConfig {
  apiTokenSecretArn: string;
  modelId?: string;
}
export const DeepgramSpeechModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ apiTokenSecretArn: S.String, modelId: S.optional(S.String) }),
).annotate({
  identifier: "DeepgramSpeechModelConfig",
}) as any as S.Schema<DeepgramSpeechModelConfig>;
export interface SpeechModelConfig {
  deepgramConfig?: DeepgramSpeechModelConfig;
}
export const SpeechModelConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ deepgramConfig: S.optional(DeepgramSpeechModelConfig) }),
).annotate({
  identifier: "SpeechModelConfig",
}) as any as S.Schema<SpeechModelConfig>;
export interface SpeechRecognitionSettings {
  speechModelPreference?: SpeechModelPreference;
  speechModelConfig?: SpeechModelConfig;
}
export const SpeechRecognitionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    speechModelPreference: S.optional(SpeechModelPreference),
    speechModelConfig: S.optional(SpeechModelConfig),
  }),
).annotate({
  identifier: "SpeechRecognitionSettings",
}) as any as S.Schema<SpeechRecognitionSettings>;
export type Enabled = boolean;
export type BedrockGuardrailIdentifier = string;
export type BedrockGuardrailVersion = string;
export interface BedrockGuardrailConfiguration {
  identifier: string;
  version: string;
}
export const BedrockGuardrailConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ identifier: S.String, version: S.String }),
).annotate({
  identifier: "BedrockGuardrailConfiguration",
}) as any as S.Schema<BedrockGuardrailConfiguration>;
export type BedrockTraceStatus = "ENABLED" | "DISABLED" | (string & {});
export const BedrockTraceStatus = S.String;

export type BedrockModelCustomPrompt = string;
export interface BedrockModelSpecification {
  modelArn: string;
  guardrail?: BedrockGuardrailConfiguration;
  traceStatus?: BedrockTraceStatus;
  customPrompt?: string;
}
export const BedrockModelSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    modelArn: S.String,
    guardrail: S.optional(BedrockGuardrailConfiguration),
    traceStatus: S.optional(BedrockTraceStatus),
    customPrompt: S.optional(S.String),
  }),
).annotate({
  identifier: "BedrockModelSpecification",
}) as any as S.Schema<BedrockModelSpecification>;
export interface SlotResolutionImprovementSpecification {
  enabled: boolean;
  bedrockModelSpecification?: BedrockModelSpecification;
}
export const SlotResolutionImprovementSpecification = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      enabled: S.Boolean,
      bedrockModelSpecification: S.optional(BedrockModelSpecification),
    }),
).annotate({
  identifier: "SlotResolutionImprovementSpecification",
}) as any as S.Schema<SlotResolutionImprovementSpecification>;
export type AssistedNluMode = "Primary" | "Fallback" | (string & {});
export const AssistedNluMode = S.String;

export type MaxDisambiguationIntents = number;
export type CustomDisambiguationMessage = string;
export interface IntentDisambiguationSettings {
  enabled: boolean;
  maxDisambiguationIntents?: number;
  customDisambiguationMessage?: string;
}
export const IntentDisambiguationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    maxDisambiguationIntents: S.optional(S.Number),
    customDisambiguationMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "IntentDisambiguationSettings",
}) as any as S.Schema<IntentDisambiguationSettings>;
export interface NluImprovementSpecification {
  enabled: boolean;
  assistedNluMode?: AssistedNluMode;
  intentDisambiguationSettings?: IntentDisambiguationSettings;
}
export const NluImprovementSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    assistedNluMode: S.optional(AssistedNluMode),
    intentDisambiguationSettings: S.optional(IntentDisambiguationSettings),
  }),
).annotate({
  identifier: "NluImprovementSpecification",
}) as any as S.Schema<NluImprovementSpecification>;
export interface RuntimeSettings {
  slotResolutionImprovement?: SlotResolutionImprovementSpecification;
  nluImprovement?: NluImprovementSpecification;
}
export const RuntimeSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotResolutionImprovement: S.optional(
      SlotResolutionImprovementSpecification,
    ),
    nluImprovement: S.optional(NluImprovementSpecification),
  }),
).annotate({
  identifier: "RuntimeSettings",
}) as any as S.Schema<RuntimeSettings>;
export interface DescriptiveBotBuilderSpecification {
  enabled: boolean;
  bedrockModelSpecification?: BedrockModelSpecification;
}
export const DescriptiveBotBuilderSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    bedrockModelSpecification: S.optional(BedrockModelSpecification),
  }),
).annotate({
  identifier: "DescriptiveBotBuilderSpecification",
}) as any as S.Schema<DescriptiveBotBuilderSpecification>;
export interface SampleUtteranceGenerationSpecification {
  enabled: boolean;
  bedrockModelSpecification?: BedrockModelSpecification;
}
export const SampleUtteranceGenerationSpecification = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      enabled: S.Boolean,
      bedrockModelSpecification: S.optional(BedrockModelSpecification),
    }),
).annotate({
  identifier: "SampleUtteranceGenerationSpecification",
}) as any as S.Schema<SampleUtteranceGenerationSpecification>;
export interface BuildtimeSettings {
  descriptiveBotBuilder?: DescriptiveBotBuilderSpecification;
  sampleUtteranceGeneration?: SampleUtteranceGenerationSpecification;
}
export const BuildtimeSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    descriptiveBotBuilder: S.optional(DescriptiveBotBuilderSpecification),
    sampleUtteranceGeneration: S.optional(
      SampleUtteranceGenerationSpecification,
    ),
  }),
).annotate({
  identifier: "BuildtimeSettings",
}) as any as S.Schema<BuildtimeSettings>;
export interface GenerativeAISettings {
  runtimeSettings?: RuntimeSettings;
  buildtimeSettings?: BuildtimeSettings;
}
export const GenerativeAISettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runtimeSettings: S.optional(RuntimeSettings),
    buildtimeSettings: S.optional(BuildtimeSettings),
  }),
).annotate({
  identifier: "GenerativeAISettings",
}) as any as S.Schema<GenerativeAISettings>;
export type SpeechDetectionSensitivity =
  | "Default"
  | "HighNoiseTolerance"
  | "MaximumNoiseTolerance"
  | (string & {});
export const SpeechDetectionSensitivity = S.String;

export interface CreateBotLocaleRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  description?: string;
  nluIntentConfidenceThreshold: number;
  voiceSettings?: VoiceSettings;
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  audioFillerSettings?: AudioFillerSettings;
  speechRecognitionSettings?: SpeechRecognitionSettings;
  generativeAISettings?: GenerativeAISettings;
  speechDetectionSensitivity?: SpeechDetectionSensitivity;
}
export const CreateBotLocaleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String,
    description: S.optional(S.String),
    nluIntentConfidenceThreshold: S.Number,
    voiceSettings: S.optional(VoiceSettings),
    unifiedSpeechSettings: S.optional(UnifiedSpeechSettings),
    audioFillerSettings: S.optional(AudioFillerSettings),
    speechRecognitionSettings: S.optional(SpeechRecognitionSettings),
    generativeAISettings: S.optional(GenerativeAISettings),
    speechDetectionSensitivity: S.optional(SpeechDetectionSensitivity),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBotLocaleRequest",
}) as any as S.Schema<CreateBotLocaleRequest>;
export type LocaleName = string;
export interface CreateBotLocaleResponse {
  botId?: string;
  botVersion?: string;
  localeName?: string;
  localeId?: string;
  description?: string;
  nluIntentConfidenceThreshold?: number;
  voiceSettings?: VoiceSettings;
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  audioFillerSettings?: AudioFillerSettings;
  speechRecognitionSettings?: SpeechRecognitionSettings;
  botLocaleStatus?: BotLocaleStatus;
  creationDateTime?: Date;
  generativeAISettings?: GenerativeAISettings;
  speechDetectionSensitivity?: SpeechDetectionSensitivity;
}
export const CreateBotLocaleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeName: S.optional(S.String),
    localeId: S.optional(S.String),
    description: S.optional(S.String),
    nluIntentConfidenceThreshold: S.optional(S.Number),
    voiceSettings: S.optional(VoiceSettings),
    unifiedSpeechSettings: S.optional(UnifiedSpeechSettings),
    audioFillerSettings: S.optional(AudioFillerSettings),
    speechRecognitionSettings: S.optional(SpeechRecognitionSettings),
    botLocaleStatus: S.optional(BotLocaleStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    generativeAISettings: S.optional(GenerativeAISettings),
    speechDetectionSensitivity: S.optional(SpeechDetectionSensitivity),
  }),
).annotate({
  identifier: "CreateBotLocaleResponse",
}) as any as S.Schema<CreateBotLocaleResponse>;
export type ReplicaRegion = string;
export interface CreateBotReplicaRequest {
  botId: string;
  replicaRegion: string;
}
export const CreateBotReplicaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    replicaRegion: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/bots/{botId}/replicas" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateBotReplicaRequest",
}) as any as S.Schema<CreateBotReplicaRequest>;
export type BotReplicaStatus =
  | "Enabling"
  | "Enabled"
  | "Deleting"
  | "Failed"
  | (string & {});
export const BotReplicaStatus = S.String;

export interface CreateBotReplicaResponse {
  botId?: string;
  replicaRegion?: string;
  sourceRegion?: string;
  creationDateTime?: Date;
  botReplicaStatus?: BotReplicaStatus;
}
export const CreateBotReplicaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    replicaRegion: S.optional(S.String),
    sourceRegion: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    botReplicaStatus: S.optional(BotReplicaStatus),
  }),
).annotate({
  identifier: "CreateBotReplicaResponse",
}) as any as S.Schema<CreateBotReplicaResponse>;
export interface BotVersionLocaleDetails {
  sourceBotVersion: string;
}
export const BotVersionLocaleDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ sourceBotVersion: S.String }),
).annotate({
  identifier: "BotVersionLocaleDetails",
}) as any as S.Schema<BotVersionLocaleDetails>;
export type BotVersionLocaleSpecification = {
  [key: string]: BotVersionLocaleDetails | undefined;
};
export const BotVersionLocaleSpecification = /*@__PURE__*/ S.Record(
  S.String,
  BotVersionLocaleDetails.pipe(S.optional),
);
export interface CreateBotVersionRequest {
  botId: string;
  description?: string;
  botVersionLocaleSpecification: {
    [key: string]: BotVersionLocaleDetails | undefined;
  };
}
export const CreateBotVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    description: S.optional(S.String),
    botVersionLocaleSpecification: BotVersionLocaleSpecification,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/bots/{botId}/botversions" }),
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
export interface CreateBotVersionResponse {
  botId?: string;
  description?: string;
  botVersion?: string;
  botVersionLocaleSpecification?: {
    [key: string]: BotVersionLocaleDetails | undefined;
  };
  botStatus?: BotStatus;
  creationDateTime?: Date;
}
export const CreateBotVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    description: S.optional(S.String),
    botVersion: S.optional(S.String),
    botVersionLocaleSpecification: S.optional(BotVersionLocaleSpecification),
    botStatus: S.optional(BotStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CreateBotVersionResponse",
}) as any as S.Schema<CreateBotVersionResponse>;
export interface BotExportSpecification {
  botId: string;
  botVersion: string;
}
export const BotExportSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ botId: S.String, botVersion: S.String }),
).annotate({
  identifier: "BotExportSpecification",
}) as any as S.Schema<BotExportSpecification>;
export interface BotLocaleExportSpecification {
  botId: string;
  botVersion: string;
  localeId: string;
}
export const BotLocaleExportSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ botId: S.String, botVersion: S.String, localeId: S.String }),
).annotate({
  identifier: "BotLocaleExportSpecification",
}) as any as S.Schema<BotLocaleExportSpecification>;
export interface CustomVocabularyExportSpecification {
  botId: string;
  botVersion: string;
  localeId: string;
}
export const CustomVocabularyExportSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ botId: S.String, botVersion: S.String, localeId: S.String }),
).annotate({
  identifier: "CustomVocabularyExportSpecification",
}) as any as S.Schema<CustomVocabularyExportSpecification>;
export interface TestSetExportSpecification {
  testSetId: string;
}
export const TestSetExportSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testSetId: S.String }),
).annotate({
  identifier: "TestSetExportSpecification",
}) as any as S.Schema<TestSetExportSpecification>;
export interface ExportResourceSpecification {
  botExportSpecification?: BotExportSpecification;
  botLocaleExportSpecification?: BotLocaleExportSpecification;
  customVocabularyExportSpecification?: CustomVocabularyExportSpecification;
  testSetExportSpecification?: TestSetExportSpecification;
}
export const ExportResourceSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botExportSpecification: S.optional(BotExportSpecification),
    botLocaleExportSpecification: S.optional(BotLocaleExportSpecification),
    customVocabularyExportSpecification: S.optional(
      CustomVocabularyExportSpecification,
    ),
    testSetExportSpecification: S.optional(TestSetExportSpecification),
  }),
).annotate({
  identifier: "ExportResourceSpecification",
}) as any as S.Schema<ExportResourceSpecification>;
export type ImportExportFileFormat = "LexJson" | "TSV" | "CSV" | (string & {});
export const ImportExportFileFormat = S.String;

export type ImportExportFilePassword = string | redacted.Redacted<string>;
export interface CreateExportRequest {
  resourceSpecification: ExportResourceSpecification;
  fileFormat: ImportExportFileFormat;
  filePassword?: string | redacted.Redacted<string>;
}
export const CreateExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceSpecification: ExportResourceSpecification,
    fileFormat: ImportExportFileFormat,
    filePassword: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/exports" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateExportRequest",
}) as any as S.Schema<CreateExportRequest>;
export type ExportStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Deleting"
  | (string & {});
export const ExportStatus = S.String;

export interface CreateExportResponse {
  exportId?: string;
  resourceSpecification?: ExportResourceSpecification;
  fileFormat?: ImportExportFileFormat;
  exportStatus?: ExportStatus;
  creationDateTime?: Date;
}
export const CreateExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportId: S.optional(S.String),
    resourceSpecification: S.optional(ExportResourceSpecification),
    fileFormat: S.optional(ImportExportFileFormat),
    exportStatus: S.optional(ExportStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CreateExportResponse",
}) as any as S.Schema<CreateExportResponse>;
export type DisplayName = string;
export type IntentSignature = string;
export type Utterance = string;
export interface SampleUtterance {
  utterance: string;
}
export const SampleUtterance = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ utterance: S.String }),
).annotate({
  identifier: "SampleUtterance",
}) as any as S.Schema<SampleUtterance>;
export type SampleUtterancesList = SampleUtterance[];
export const SampleUtterancesList = /*@__PURE__*/ S.Array(SampleUtterance);
export interface DialogCodeHookSettings {
  enabled: boolean;
}
export const DialogCodeHookSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enabled: S.Boolean }),
).annotate({
  identifier: "DialogCodeHookSettings",
}) as any as S.Schema<DialogCodeHookSettings>;
export type PlainTextMessageValue = string;
export interface PlainTextMessage {
  value: string;
}
export const PlainTextMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.String }),
).annotate({
  identifier: "PlainTextMessage",
}) as any as S.Schema<PlainTextMessage>;
export type CustomPayloadValue = string;
export interface CustomPayload {
  value: string;
}
export const CustomPayload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.String }),
).annotate({ identifier: "CustomPayload" }) as any as S.Schema<CustomPayload>;
export type SSMLMessageValue = string;
export interface SSMLMessage {
  value: string;
}
export const SSMLMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.String }),
).annotate({ identifier: "SSMLMessage" }) as any as S.Schema<SSMLMessage>;
export type AttachmentTitle = string;
export type AttachmentUrl = string;
export type ButtonText = string;
export type ButtonValue = string;
export interface Button {
  text: string;
  value: string;
}
export const Button = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ text: S.String, value: S.String }),
).annotate({ identifier: "Button" }) as any as S.Schema<Button>;
export type ButtonsList = Button[];
export const ButtonsList = /*@__PURE__*/ S.Array(Button);
export interface ImageResponseCard {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  buttons?: Button[];
}
export const ImageResponseCard = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    title: S.String,
    subtitle: S.optional(S.String),
    imageUrl: S.optional(S.String),
    buttons: S.optional(ButtonsList),
  }),
).annotate({
  identifier: "ImageResponseCard",
}) as any as S.Schema<ImageResponseCard>;
export interface Message {
  plainTextMessage?: PlainTextMessage;
  customPayload?: CustomPayload;
  ssmlMessage?: SSMLMessage;
  imageResponseCard?: ImageResponseCard;
}
export const Message = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    plainTextMessage: S.optional(PlainTextMessage),
    customPayload: S.optional(CustomPayload),
    ssmlMessage: S.optional(SSMLMessage),
    imageResponseCard: S.optional(ImageResponseCard),
  }),
).annotate({ identifier: "Message" }) as any as S.Schema<Message>;
export type MessageVariationsList = Message[];
export const MessageVariationsList = /*@__PURE__*/ S.Array(Message);
export interface MessageGroup {
  message: Message;
  variations?: Message[];
}
export const MessageGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ message: Message, variations: S.optional(MessageVariationsList) }),
).annotate({ identifier: "MessageGroup" }) as any as S.Schema<MessageGroup>;
export type MessageGroupsList = MessageGroup[];
export const MessageGroupsList = /*@__PURE__*/ S.Array(MessageGroup);
export interface ResponseSpecification {
  messageGroups: MessageGroup[];
  allowInterrupt?: boolean;
}
export const ResponseSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    messageGroups: MessageGroupsList,
    allowInterrupt: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResponseSpecification",
}) as any as S.Schema<ResponseSpecification>;
export type DialogActionType =
  | "ElicitIntent"
  | "StartIntent"
  | "ElicitSlot"
  | "EvaluateConditional"
  | "InvokeDialogCodeHook"
  | "ConfirmIntent"
  | "FulfillIntent"
  | "CloseIntent"
  | "EndConversation"
  | (string & {});
export const DialogActionType = S.String;

export interface DialogAction {
  type: DialogActionType;
  slotToElicit?: string;
  suppressNextMessage?: boolean;
}
export const DialogAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    type: DialogActionType,
    slotToElicit: S.optional(S.String),
    suppressNextMessage: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DialogAction" }) as any as S.Schema<DialogAction>;
export type SlotShape = "Scalar" | "List" | (string & {});
export const SlotShape = S.String;

export type NonEmptyString = string;
export interface SlotValue {
  interpretedValue?: string;
}
export const SlotValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ interpretedValue: S.optional(S.String) }),
).annotate({ identifier: "SlotValue" }) as any as S.Schema<SlotValue>;
export type SlotValues = SlotValueOverride[];
export const SlotValues = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<SlotValueOverride> => SlotValueOverride).annotate({
    identifier: "SlotValueOverride",
  }),
) as any as S.Schema<SlotValues>;
export interface SlotValueOverride {
  shape?: SlotShape;
  value?: SlotValue;
  values?: SlotValueOverride[];
}
export const SlotValueOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    shape: S.optional(SlotShape),
    value: S.optional(SlotValue),
    values: S.optional(
      S.suspend(() => SlotValues).annotate({ identifier: "SlotValues" }),
    ),
  }),
).annotate({
  identifier: "SlotValueOverride",
}) as any as S.Schema<SlotValueOverride>;
export type SlotValueOverrideMap = {
  [key: string]: SlotValueOverride | undefined;
};
export const SlotValueOverrideMap = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend((): S.Schema<SlotValueOverride> => SlotValueOverride)
    .annotate({ identifier: "SlotValueOverride" })
    .pipe(S.optional),
);
export interface IntentOverride {
  name?: string;
  slots?: { [key: string]: SlotValueOverride | undefined };
}
export const IntentOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    slots: S.optional(SlotValueOverrideMap),
  }),
).annotate({ identifier: "IntentOverride" }) as any as S.Schema<IntentOverride>;
export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface DialogState {
  dialogAction?: DialogAction;
  intent?: IntentOverride;
  sessionAttributes?: { [key: string]: string | undefined };
}
export const DialogState = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dialogAction: S.optional(DialogAction),
    intent: S.optional(IntentOverride),
    sessionAttributes: S.optional(StringMap),
  }),
).annotate({ identifier: "DialogState" }) as any as S.Schema<DialogState>;
export type ConditionExpression = string;
export interface Condition {
  expressionString: string;
}
export const Condition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ expressionString: S.String }),
).annotate({ identifier: "Condition" }) as any as S.Schema<Condition>;
export interface ConditionalBranch {
  name: string;
  condition: Condition;
  nextStep: DialogState;
  response?: ResponseSpecification;
}
export const ConditionalBranch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.String,
    condition: Condition,
    nextStep: DialogState,
    response: S.optional(ResponseSpecification),
  }),
).annotate({
  identifier: "ConditionalBranch",
}) as any as S.Schema<ConditionalBranch>;
export type ConditionalBranches = ConditionalBranch[];
export const ConditionalBranches = /*@__PURE__*/ S.Array(ConditionalBranch);
export interface DefaultConditionalBranch {
  nextStep?: DialogState;
  response?: ResponseSpecification;
}
export const DefaultConditionalBranch = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextStep: S.optional(DialogState),
    response: S.optional(ResponseSpecification),
  }),
).annotate({
  identifier: "DefaultConditionalBranch",
}) as any as S.Schema<DefaultConditionalBranch>;
export interface ConditionalSpecification {
  active: boolean;
  conditionalBranches: ConditionalBranch[];
  defaultBranch: DefaultConditionalBranch;
}
export const ConditionalSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    active: S.Boolean,
    conditionalBranches: ConditionalBranches,
    defaultBranch: DefaultConditionalBranch,
  }),
).annotate({
  identifier: "ConditionalSpecification",
}) as any as S.Schema<ConditionalSpecification>;
export interface PostFulfillmentStatusSpecification {
  successResponse?: ResponseSpecification;
  failureResponse?: ResponseSpecification;
  timeoutResponse?: ResponseSpecification;
  successNextStep?: DialogState;
  successConditional?: ConditionalSpecification;
  failureNextStep?: DialogState;
  failureConditional?: ConditionalSpecification;
  timeoutNextStep?: DialogState;
  timeoutConditional?: ConditionalSpecification;
}
export const PostFulfillmentStatusSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    successResponse: S.optional(ResponseSpecification),
    failureResponse: S.optional(ResponseSpecification),
    timeoutResponse: S.optional(ResponseSpecification),
    successNextStep: S.optional(DialogState),
    successConditional: S.optional(ConditionalSpecification),
    failureNextStep: S.optional(DialogState),
    failureConditional: S.optional(ConditionalSpecification),
    timeoutNextStep: S.optional(DialogState),
    timeoutConditional: S.optional(ConditionalSpecification),
  }),
).annotate({
  identifier: "PostFulfillmentStatusSpecification",
}) as any as S.Schema<PostFulfillmentStatusSpecification>;
export type FulfillmentStartResponseDelay = number;
export interface FulfillmentStartResponseSpecification {
  delayInSeconds: number;
  messageGroups: MessageGroup[];
  allowInterrupt?: boolean;
}
export const FulfillmentStartResponseSpecification = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      delayInSeconds: S.Number,
      messageGroups: MessageGroupsList,
      allowInterrupt: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "FulfillmentStartResponseSpecification",
}) as any as S.Schema<FulfillmentStartResponseSpecification>;
export type FulfillmentUpdateResponseFrequency = number;
export interface FulfillmentUpdateResponseSpecification {
  frequencyInSeconds: number;
  messageGroups: MessageGroup[];
  allowInterrupt?: boolean;
}
export const FulfillmentUpdateResponseSpecification = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      frequencyInSeconds: S.Number,
      messageGroups: MessageGroupsList,
      allowInterrupt: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "FulfillmentUpdateResponseSpecification",
}) as any as S.Schema<FulfillmentUpdateResponseSpecification>;
export type FulfillmentTimeout = number;
export interface FulfillmentUpdatesSpecification {
  active: boolean;
  startResponse?: FulfillmentStartResponseSpecification;
  updateResponse?: FulfillmentUpdateResponseSpecification;
  timeoutInSeconds?: number;
}
export const FulfillmentUpdatesSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    active: S.Boolean,
    startResponse: S.optional(FulfillmentStartResponseSpecification),
    updateResponse: S.optional(FulfillmentUpdateResponseSpecification),
    timeoutInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "FulfillmentUpdatesSpecification",
}) as any as S.Schema<FulfillmentUpdatesSpecification>;
export interface FulfillmentCodeHookSettings {
  enabled: boolean;
  postFulfillmentStatusSpecification?: PostFulfillmentStatusSpecification;
  fulfillmentUpdatesSpecification?: FulfillmentUpdatesSpecification;
  active?: boolean;
}
export const FulfillmentCodeHookSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enabled: S.Boolean,
    postFulfillmentStatusSpecification: S.optional(
      PostFulfillmentStatusSpecification,
    ),
    fulfillmentUpdatesSpecification: S.optional(
      FulfillmentUpdatesSpecification,
    ),
    active: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "FulfillmentCodeHookSettings",
}) as any as S.Schema<FulfillmentCodeHookSettings>;
export type PromptMaxRetries = number;
export type MessageSelectionStrategy = "Random" | "Ordered" | (string & {});
export const MessageSelectionStrategy = S.String;

export type PromptAttempt =
  | "Initial"
  | "Retry1"
  | "Retry2"
  | "Retry3"
  | "Retry4"
  | "Retry5"
  | (string & {});
export const PromptAttempt = S.String;

export interface AllowedInputTypes {
  allowAudioInput: boolean;
  allowDTMFInput: boolean;
}
export const AllowedInputTypes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ allowAudioInput: S.Boolean, allowDTMFInput: S.Boolean }),
).annotate({
  identifier: "AllowedInputTypes",
}) as any as S.Schema<AllowedInputTypes>;
export type TimeInMilliSeconds = number;
export interface AudioSpecification {
  maxLengthMs: number;
  endTimeoutMs: number;
}
export const AudioSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ maxLengthMs: S.Number, endTimeoutMs: S.Number }),
).annotate({
  identifier: "AudioSpecification",
}) as any as S.Schema<AudioSpecification>;
export type MaxUtteranceDigits = number;
export type DTMFCharacter = string;
export interface DTMFSpecification {
  maxLength: number;
  endTimeoutMs: number;
  deletionCharacter: string;
  endCharacter: string;
}
export const DTMFSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxLength: S.Number,
    endTimeoutMs: S.Number,
    deletionCharacter: S.String,
    endCharacter: S.String,
  }),
).annotate({
  identifier: "DTMFSpecification",
}) as any as S.Schema<DTMFSpecification>;
export interface AudioAndDTMFInputSpecification {
  startTimeoutMs: number;
  audioSpecification?: AudioSpecification;
  dtmfSpecification?: DTMFSpecification;
}
export const AudioAndDTMFInputSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTimeoutMs: S.Number,
    audioSpecification: S.optional(AudioSpecification),
    dtmfSpecification: S.optional(DTMFSpecification),
  }),
).annotate({
  identifier: "AudioAndDTMFInputSpecification",
}) as any as S.Schema<AudioAndDTMFInputSpecification>;
export interface TextInputSpecification {
  startTimeoutMs: number;
}
export const TextInputSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ startTimeoutMs: S.Number }),
).annotate({
  identifier: "TextInputSpecification",
}) as any as S.Schema<TextInputSpecification>;
export interface PromptAttemptSpecification {
  allowInterrupt?: boolean;
  allowedInputTypes: AllowedInputTypes;
  audioAndDTMFInputSpecification?: AudioAndDTMFInputSpecification;
  textInputSpecification?: TextInputSpecification;
}
export const PromptAttemptSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allowInterrupt: S.optional(S.Boolean),
    allowedInputTypes: AllowedInputTypes,
    audioAndDTMFInputSpecification: S.optional(AudioAndDTMFInputSpecification),
    textInputSpecification: S.optional(TextInputSpecification),
  }),
).annotate({
  identifier: "PromptAttemptSpecification",
}) as any as S.Schema<PromptAttemptSpecification>;
export type PromptAttemptsSpecificationMap = {
  [key in PromptAttempt]?: PromptAttemptSpecification;
};
export const PromptAttemptsSpecificationMap = /*@__PURE__*/ S.Record(
  PromptAttempt,
  PromptAttemptSpecification.pipe(S.optional),
);
export interface PromptSpecification {
  messageGroups: MessageGroup[];
  maxRetries: number;
  allowInterrupt?: boolean;
  messageSelectionStrategy?: MessageSelectionStrategy;
  promptAttemptsSpecification?: {
    [key: string]: PromptAttemptSpecification | undefined;
  };
}
export const PromptSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    messageGroups: MessageGroupsList,
    maxRetries: S.Number,
    allowInterrupt: S.optional(S.Boolean),
    messageSelectionStrategy: S.optional(MessageSelectionStrategy),
    promptAttemptsSpecification: S.optional(PromptAttemptsSpecificationMap),
  }),
).annotate({
  identifier: "PromptSpecification",
}) as any as S.Schema<PromptSpecification>;
export interface PostDialogCodeHookInvocationSpecification {
  successResponse?: ResponseSpecification;
  successNextStep?: DialogState;
  successConditional?: ConditionalSpecification;
  failureResponse?: ResponseSpecification;
  failureNextStep?: DialogState;
  failureConditional?: ConditionalSpecification;
  timeoutResponse?: ResponseSpecification;
  timeoutNextStep?: DialogState;
  timeoutConditional?: ConditionalSpecification;
}
export const PostDialogCodeHookInvocationSpecification =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      successResponse: S.optional(ResponseSpecification),
      successNextStep: S.optional(DialogState),
      successConditional: S.optional(ConditionalSpecification),
      failureResponse: S.optional(ResponseSpecification),
      failureNextStep: S.optional(DialogState),
      failureConditional: S.optional(ConditionalSpecification),
      timeoutResponse: S.optional(ResponseSpecification),
      timeoutNextStep: S.optional(DialogState),
      timeoutConditional: S.optional(ConditionalSpecification),
    }),
  ).annotate({
    identifier: "PostDialogCodeHookInvocationSpecification",
  }) as any as S.Schema<PostDialogCodeHookInvocationSpecification>;
export interface DialogCodeHookInvocationSetting {
  enableCodeHookInvocation: boolean;
  active: boolean;
  invocationLabel?: string;
  postCodeHookSpecification: PostDialogCodeHookInvocationSpecification;
}
export const DialogCodeHookInvocationSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    enableCodeHookInvocation: S.Boolean,
    active: S.Boolean,
    invocationLabel: S.optional(S.String),
    postCodeHookSpecification: PostDialogCodeHookInvocationSpecification,
  }),
).annotate({
  identifier: "DialogCodeHookInvocationSetting",
}) as any as S.Schema<DialogCodeHookInvocationSetting>;
export interface ElicitationCodeHookInvocationSetting {
  enableCodeHookInvocation: boolean;
  invocationLabel?: string;
}
export const ElicitationCodeHookInvocationSetting = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      enableCodeHookInvocation: S.Boolean,
      invocationLabel: S.optional(S.String),
    }),
).annotate({
  identifier: "ElicitationCodeHookInvocationSetting",
}) as any as S.Schema<ElicitationCodeHookInvocationSetting>;
export interface IntentConfirmationSetting {
  promptSpecification: PromptSpecification;
  declinationResponse?: ResponseSpecification;
  active?: boolean;
  confirmationResponse?: ResponseSpecification;
  confirmationNextStep?: DialogState;
  confirmationConditional?: ConditionalSpecification;
  declinationNextStep?: DialogState;
  declinationConditional?: ConditionalSpecification;
  failureResponse?: ResponseSpecification;
  failureNextStep?: DialogState;
  failureConditional?: ConditionalSpecification;
  codeHook?: DialogCodeHookInvocationSetting;
  elicitationCodeHook?: ElicitationCodeHookInvocationSetting;
}
export const IntentConfirmationSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    promptSpecification: PromptSpecification,
    declinationResponse: S.optional(ResponseSpecification),
    active: S.optional(S.Boolean),
    confirmationResponse: S.optional(ResponseSpecification),
    confirmationNextStep: S.optional(DialogState),
    confirmationConditional: S.optional(ConditionalSpecification),
    declinationNextStep: S.optional(DialogState),
    declinationConditional: S.optional(ConditionalSpecification),
    failureResponse: S.optional(ResponseSpecification),
    failureNextStep: S.optional(DialogState),
    failureConditional: S.optional(ConditionalSpecification),
    codeHook: S.optional(DialogCodeHookInvocationSetting),
    elicitationCodeHook: S.optional(ElicitationCodeHookInvocationSetting),
  }),
).annotate({
  identifier: "IntentConfirmationSetting",
}) as any as S.Schema<IntentConfirmationSetting>;
export interface IntentClosingSetting {
  closingResponse?: ResponseSpecification;
  active?: boolean;
  nextStep?: DialogState;
  conditional?: ConditionalSpecification;
}
export const IntentClosingSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    closingResponse: S.optional(ResponseSpecification),
    active: S.optional(S.Boolean),
    nextStep: S.optional(DialogState),
    conditional: S.optional(ConditionalSpecification),
  }),
).annotate({
  identifier: "IntentClosingSetting",
}) as any as S.Schema<IntentClosingSetting>;
export interface InputContext {
  name: string;
}
export const InputContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({ identifier: "InputContext" }) as any as S.Schema<InputContext>;
export type InputContextsList = InputContext[];
export const InputContextsList = /*@__PURE__*/ S.Array(InputContext);
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
export type OutputContextsList = OutputContext[];
export const OutputContextsList = /*@__PURE__*/ S.Array(OutputContext);
export type KendraIndexArn = string;
export type QueryFilterString = string;
export interface KendraConfiguration {
  kendraIndex: string;
  queryFilterStringEnabled?: boolean;
  queryFilterString?: string;
}
export const KendraConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kendraIndex: S.String,
    queryFilterStringEnabled: S.optional(S.Boolean),
    queryFilterString: S.optional(S.String),
  }),
).annotate({
  identifier: "KendraConfiguration",
}) as any as S.Schema<KendraConfiguration>;
export interface InitialResponseSetting {
  initialResponse?: ResponseSpecification;
  nextStep?: DialogState;
  conditional?: ConditionalSpecification;
  codeHook?: DialogCodeHookInvocationSetting;
}
export const InitialResponseSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    initialResponse: S.optional(ResponseSpecification),
    nextStep: S.optional(DialogState),
    conditional: S.optional(ConditionalSpecification),
    codeHook: S.optional(DialogCodeHookInvocationSetting),
  }),
).annotate({
  identifier: "InitialResponseSetting",
}) as any as S.Schema<InitialResponseSetting>;
export type DomainEndpoint = string;
export type OSIndexName = string;
export type QuestionField = string;
export type AnswerField = string;
export interface ExactResponseFields {
  questionField: string;
  answerField: string;
}
export const ExactResponseFields = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ questionField: S.String, answerField: S.String }),
).annotate({
  identifier: "ExactResponseFields",
}) as any as S.Schema<ExactResponseFields>;
export type IncludeField = string;
export type OSIncludeFields = string[];
export const OSIncludeFields = /*@__PURE__*/ S.Array(S.String);
export interface OpensearchConfiguration {
  domainEndpoint: string;
  indexName: string;
  exactResponse?: boolean;
  exactResponseFields?: ExactResponseFields;
  includeFields?: string[];
}
export const OpensearchConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    domainEndpoint: S.String,
    indexName: S.String,
    exactResponse: S.optional(S.Boolean),
    exactResponseFields: S.optional(ExactResponseFields),
    includeFields: S.optional(OSIncludeFields),
  }),
).annotate({
  identifier: "OpensearchConfiguration",
}) as any as S.Schema<OpensearchConfiguration>;
export interface QnAKendraConfiguration {
  kendraIndex: string;
  queryFilterStringEnabled?: boolean;
  queryFilterString?: string;
  exactResponse?: boolean;
}
export const QnAKendraConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kendraIndex: S.String,
    queryFilterStringEnabled: S.optional(S.Boolean),
    queryFilterString: S.optional(S.String),
    exactResponse: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "QnAKendraConfiguration",
}) as any as S.Schema<QnAKendraConfiguration>;
export type BedrockKnowledgeBaseArn = string;
export interface BedrockKnowledgeStoreExactResponseFields {
  answerField?: string;
}
export const BedrockKnowledgeStoreExactResponseFields = /*@__PURE__*/ S.suspend(
  () => S.Struct({ answerField: S.optional(S.String) }),
).annotate({
  identifier: "BedrockKnowledgeStoreExactResponseFields",
}) as any as S.Schema<BedrockKnowledgeStoreExactResponseFields>;
export interface BedrockKnowledgeStoreConfiguration {
  bedrockKnowledgeBaseArn: string;
  exactResponse?: boolean;
  exactResponseFields?: BedrockKnowledgeStoreExactResponseFields;
}
export const BedrockKnowledgeStoreConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    bedrockKnowledgeBaseArn: S.String,
    exactResponse: S.optional(S.Boolean),
    exactResponseFields: S.optional(BedrockKnowledgeStoreExactResponseFields),
  }),
).annotate({
  identifier: "BedrockKnowledgeStoreConfiguration",
}) as any as S.Schema<BedrockKnowledgeStoreConfiguration>;
export interface DataSourceConfiguration {
  opensearchConfiguration?: OpensearchConfiguration;
  kendraConfiguration?: QnAKendraConfiguration;
  bedrockKnowledgeStoreConfiguration?: BedrockKnowledgeStoreConfiguration;
}
export const DataSourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    opensearchConfiguration: S.optional(OpensearchConfiguration),
    kendraConfiguration: S.optional(QnAKendraConfiguration),
    bedrockKnowledgeStoreConfiguration: S.optional(
      BedrockKnowledgeStoreConfiguration,
    ),
  }),
).annotate({
  identifier: "DataSourceConfiguration",
}) as any as S.Schema<DataSourceConfiguration>;
export interface QnAIntentConfiguration {
  dataSourceConfiguration?: DataSourceConfiguration;
  bedrockModelConfiguration?: BedrockModelSpecification;
}
export const QnAIntentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    dataSourceConfiguration: S.optional(DataSourceConfiguration),
    bedrockModelConfiguration: S.optional(BedrockModelSpecification),
  }),
).annotate({
  identifier: "QnAIntentConfiguration",
}) as any as S.Schema<QnAIntentConfiguration>;
export type QInConnectAssistantARN = string;
export interface QInConnectAssistantConfiguration {
  assistantArn: string;
}
export const QInConnectAssistantConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ assistantArn: S.String }),
).annotate({
  identifier: "QInConnectAssistantConfiguration",
}) as any as S.Schema<QInConnectAssistantConfiguration>;
export interface QInConnectIntentConfiguration {
  qInConnectAssistantConfiguration?: QInConnectAssistantConfiguration;
}
export const QInConnectIntentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    qInConnectAssistantConfiguration: S.optional(
      QInConnectAssistantConfiguration,
    ),
  }),
).annotate({
  identifier: "QInConnectIntentConfiguration",
}) as any as S.Schema<QInConnectIntentConfiguration>;
export interface CreateIntentRequest {
  intentName: string;
  intentDisplayName?: string;
  description?: string;
  parentIntentSignature?: string;
  sampleUtterances?: SampleUtterance[];
  dialogCodeHook?: DialogCodeHookSettings;
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  intentConfirmationSetting?: IntentConfirmationSetting;
  intentClosingSetting?: IntentClosingSetting;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
  kendraConfiguration?: KendraConfiguration;
  botId: string;
  botVersion: string;
  localeId: string;
  initialResponseSetting?: InitialResponseSetting;
  qnAIntentConfiguration?: QnAIntentConfiguration;
  qInConnectIntentConfiguration?: QInConnectIntentConfiguration;
}
export const CreateIntentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentName: S.String,
    intentDisplayName: S.optional(S.String),
    description: S.optional(S.String),
    parentIntentSignature: S.optional(S.String),
    sampleUtterances: S.optional(SampleUtterancesList),
    dialogCodeHook: S.optional(DialogCodeHookSettings),
    fulfillmentCodeHook: S.optional(FulfillmentCodeHookSettings),
    intentConfirmationSetting: S.optional(IntentConfirmationSetting),
    intentClosingSetting: S.optional(IntentClosingSetting),
    inputContexts: S.optional(InputContextsList),
    outputContexts: S.optional(OutputContextsList),
    kendraConfiguration: S.optional(KendraConfiguration),
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    initialResponseSetting: S.optional(InitialResponseSetting),
    qnAIntentConfiguration: S.optional(QnAIntentConfiguration),
    qInConnectIntentConfiguration: S.optional(QInConnectIntentConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIntentRequest",
}) as any as S.Schema<CreateIntentRequest>;
export interface CreateIntentResponse {
  intentId?: string;
  intentName?: string;
  intentDisplayName?: string;
  description?: string;
  parentIntentSignature?: string;
  sampleUtterances?: SampleUtterance[];
  dialogCodeHook?: DialogCodeHookSettings;
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  intentConfirmationSetting?: IntentConfirmationSetting;
  intentClosingSetting?: IntentClosingSetting;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
  kendraConfiguration?: KendraConfiguration;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  creationDateTime?: Date;
  initialResponseSetting?: InitialResponseSetting;
  qnAIntentConfiguration?: QnAIntentConfiguration;
  qInConnectIntentConfiguration?: QInConnectIntentConfiguration;
}
export const CreateIntentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentId: S.optional(S.String),
    intentName: S.optional(S.String),
    intentDisplayName: S.optional(S.String),
    description: S.optional(S.String),
    parentIntentSignature: S.optional(S.String),
    sampleUtterances: S.optional(SampleUtterancesList),
    dialogCodeHook: S.optional(DialogCodeHookSettings),
    fulfillmentCodeHook: S.optional(FulfillmentCodeHookSettings),
    intentConfirmationSetting: S.optional(IntentConfirmationSetting),
    intentClosingSetting: S.optional(IntentClosingSetting),
    inputContexts: S.optional(InputContextsList),
    outputContexts: S.optional(OutputContextsList),
    kendraConfiguration: S.optional(KendraConfiguration),
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    initialResponseSetting: S.optional(InitialResponseSetting),
    qnAIntentConfiguration: S.optional(QnAIntentConfiguration),
    qInConnectIntentConfiguration: S.optional(QInConnectIntentConfiguration),
  }),
).annotate({
  identifier: "CreateIntentResponse",
}) as any as S.Schema<CreateIntentResponse>;
export type AmazonResourceName = string;
export type Policy = string;
export interface CreateResourcePolicyRequest {
  resourceArn: string;
  policy: string;
}
export const CreateResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    policy: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/policy/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateResourcePolicyRequest",
}) as any as S.Schema<CreateResourcePolicyRequest>;
export type RevisionId = string;
export interface CreateResourcePolicyResponse {
  resourceArn?: string;
  revisionId?: string;
}
export const CreateResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    revisionId: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateResourcePolicyResponse",
}) as any as S.Schema<CreateResourcePolicyResponse>;
export type Effect = "Allow" | "Deny" | (string & {});
export const Effect = S.String;

export type ServicePrincipal = string;
export type PrincipalArn = string;
export interface Principal {
  service?: string;
  arn?: string;
}
export const Principal = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ service: S.optional(S.String), arn: S.optional(S.String) }),
).annotate({ identifier: "Principal" }) as any as S.Schema<Principal>;
export type PrincipalList = Principal[];
export const PrincipalList = /*@__PURE__*/ S.Array(Principal);
export type Operation = string;
export type OperationList = string[];
export const OperationList = /*@__PURE__*/ S.Array(S.String);
export type ConditionOperator = string;
export type ConditionKey = string;
export type ConditionValue = string;
export type ConditionKeyValueMap = { [key: string]: string | undefined };
export const ConditionKeyValueMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ConditionMap = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export const ConditionMap = /*@__PURE__*/ S.Record(
  S.String,
  ConditionKeyValueMap.pipe(S.optional),
);
export interface CreateResourcePolicyStatementRequest {
  resourceArn: string;
  statementId: string;
  effect: Effect;
  principal: Principal[];
  action: string[];
  condition?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  expectedRevisionId?: string;
}
export const CreateResourcePolicyStatementRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
      statementId: S.String,
      effect: Effect,
      principal: PrincipalList,
      action: OperationList,
      condition: S.optional(ConditionMap),
      expectedRevisionId: S.optional(S.String).pipe(
        T.HttpQuery("expectedRevisionId"),
      ),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/policy/{resourceArn}/statements" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateResourcePolicyStatementRequest",
}) as any as S.Schema<CreateResourcePolicyStatementRequest>;
export interface CreateResourcePolicyStatementResponse {
  resourceArn?: string;
  revisionId?: string;
}
export const CreateResourcePolicyStatementResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceArn: S.optional(S.String),
      revisionId: S.optional(S.String),
    }),
).annotate({
  identifier: "CreateResourcePolicyStatementResponse",
}) as any as S.Schema<CreateResourcePolicyStatementResponse>;
export type BuiltInOrCustomSlotTypeId = string;
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
export interface SlotDefaultValueSpecification {
  defaultValueList: SlotDefaultValue[];
}
export const SlotDefaultValueSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ defaultValueList: SlotDefaultValueList }),
).annotate({
  identifier: "SlotDefaultValueSpecification",
}) as any as S.Schema<SlotDefaultValueSpecification>;
export type SlotConstraint = "Required" | "Optional" | (string & {});
export const SlotConstraint = S.String;

export type StillWaitingResponseFrequency = number;
export type StillWaitingResponseTimeout = number;
export interface StillWaitingResponseSpecification {
  messageGroups: MessageGroup[];
  frequencyInSeconds: number;
  timeoutInSeconds: number;
  allowInterrupt?: boolean;
}
export const StillWaitingResponseSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    messageGroups: MessageGroupsList,
    frequencyInSeconds: S.Number,
    timeoutInSeconds: S.Number,
    allowInterrupt: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "StillWaitingResponseSpecification",
}) as any as S.Schema<StillWaitingResponseSpecification>;
export interface WaitAndContinueSpecification {
  waitingResponse: ResponseSpecification;
  continueResponse: ResponseSpecification;
  stillWaitingResponse?: StillWaitingResponseSpecification;
  active?: boolean;
}
export const WaitAndContinueSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    waitingResponse: ResponseSpecification,
    continueResponse: ResponseSpecification,
    stillWaitingResponse: S.optional(StillWaitingResponseSpecification),
    active: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "WaitAndContinueSpecification",
}) as any as S.Schema<WaitAndContinueSpecification>;
export interface SlotCaptureSetting {
  captureResponse?: ResponseSpecification;
  captureNextStep?: DialogState;
  captureConditional?: ConditionalSpecification;
  failureResponse?: ResponseSpecification;
  failureNextStep?: DialogState;
  failureConditional?: ConditionalSpecification;
  codeHook?: DialogCodeHookInvocationSetting;
  elicitationCodeHook?: ElicitationCodeHookInvocationSetting;
}
export const SlotCaptureSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    captureResponse: S.optional(ResponseSpecification),
    captureNextStep: S.optional(DialogState),
    captureConditional: S.optional(ConditionalSpecification),
    failureResponse: S.optional(ResponseSpecification),
    failureNextStep: S.optional(DialogState),
    failureConditional: S.optional(ConditionalSpecification),
    codeHook: S.optional(DialogCodeHookInvocationSetting),
    elicitationCodeHook: S.optional(ElicitationCodeHookInvocationSetting),
  }),
).annotate({
  identifier: "SlotCaptureSetting",
}) as any as S.Schema<SlotCaptureSetting>;
export type SlotResolutionStrategy =
  | "EnhancedFallback"
  | "Default"
  | (string & {});
export const SlotResolutionStrategy = S.String;

export interface SlotResolutionSetting {
  slotResolutionStrategy: SlotResolutionStrategy;
}
export const SlotResolutionSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ slotResolutionStrategy: SlotResolutionStrategy }),
).annotate({
  identifier: "SlotResolutionSetting",
}) as any as S.Schema<SlotResolutionSetting>;
export interface SlotValueElicitationSetting {
  defaultValueSpecification?: SlotDefaultValueSpecification;
  slotConstraint: SlotConstraint;
  promptSpecification?: PromptSpecification;
  sampleUtterances?: SampleUtterance[];
  waitAndContinueSpecification?: WaitAndContinueSpecification;
  slotCaptureSetting?: SlotCaptureSetting;
  slotResolutionSetting?: SlotResolutionSetting;
}
export const SlotValueElicitationSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    defaultValueSpecification: S.optional(SlotDefaultValueSpecification),
    slotConstraint: SlotConstraint,
    promptSpecification: S.optional(PromptSpecification),
    sampleUtterances: S.optional(SampleUtterancesList),
    waitAndContinueSpecification: S.optional(WaitAndContinueSpecification),
    slotCaptureSetting: S.optional(SlotCaptureSetting),
    slotResolutionSetting: S.optional(SlotResolutionSetting),
  }),
).annotate({
  identifier: "SlotValueElicitationSetting",
}) as any as S.Schema<SlotValueElicitationSetting>;
export type ObfuscationSettingType =
  | "None"
  | "DefaultObfuscation"
  | (string & {});
export const ObfuscationSettingType = S.String;

export interface ObfuscationSetting {
  obfuscationSettingType: ObfuscationSettingType;
}
export const ObfuscationSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ obfuscationSettingType: ObfuscationSettingType }),
).annotate({
  identifier: "ObfuscationSetting",
}) as any as S.Schema<ObfuscationSetting>;
export interface MultipleValuesSetting {
  allowMultipleValues?: boolean;
}
export const MultipleValuesSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ allowMultipleValues: S.optional(S.Boolean) }),
).annotate({
  identifier: "MultipleValuesSetting",
}) as any as S.Schema<MultipleValuesSetting>;
export type SubSlotExpression = string;
export interface SubSlotValueElicitationSetting {
  defaultValueSpecification?: SlotDefaultValueSpecification;
  promptSpecification: PromptSpecification;
  sampleUtterances?: SampleUtterance[];
  waitAndContinueSpecification?: WaitAndContinueSpecification;
}
export const SubSlotValueElicitationSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    defaultValueSpecification: S.optional(SlotDefaultValueSpecification),
    promptSpecification: PromptSpecification,
    sampleUtterances: S.optional(SampleUtterancesList),
    waitAndContinueSpecification: S.optional(WaitAndContinueSpecification),
  }),
).annotate({
  identifier: "SubSlotValueElicitationSetting",
}) as any as S.Schema<SubSlotValueElicitationSetting>;
export interface Specifications {
  slotTypeId: string;
  valueElicitationSetting: SubSlotValueElicitationSetting;
}
export const Specifications = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypeId: S.String,
    valueElicitationSetting: SubSlotValueElicitationSetting,
  }),
).annotate({ identifier: "Specifications" }) as any as S.Schema<Specifications>;
export type SubSlotSpecificationMap = {
  [key: string]: Specifications | undefined;
};
export const SubSlotSpecificationMap = /*@__PURE__*/ S.Record(
  S.String,
  Specifications.pipe(S.optional),
);
export interface SubSlotSetting {
  expression?: string;
  slotSpecifications?: { [key: string]: Specifications | undefined };
}
export const SubSlotSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    expression: S.optional(S.String),
    slotSpecifications: S.optional(SubSlotSpecificationMap),
  }),
).annotate({ identifier: "SubSlotSetting" }) as any as S.Schema<SubSlotSetting>;
export interface CreateSlotRequest {
  slotName: string;
  description?: string;
  slotTypeId?: string;
  valueElicitationSetting: SlotValueElicitationSetting;
  obfuscationSetting?: ObfuscationSetting;
  botId: string;
  botVersion: string;
  localeId: string;
  intentId: string;
  multipleValuesSetting?: MultipleValuesSetting;
  subSlotSetting?: SubSlotSetting;
}
export const CreateSlotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotName: S.String,
    description: S.optional(S.String),
    slotTypeId: S.optional(S.String),
    valueElicitationSetting: SlotValueElicitationSetting,
    obfuscationSetting: S.optional(ObfuscationSetting),
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    intentId: S.String.pipe(T.HttpLabel("intentId")),
    multipleValuesSetting: S.optional(MultipleValuesSetting),
    subSlotSetting: S.optional(SubSlotSetting),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}/slots",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSlotRequest",
}) as any as S.Schema<CreateSlotRequest>;
export interface CreateSlotResponse {
  slotId?: string;
  slotName?: string;
  description?: string;
  slotTypeId?: string;
  valueElicitationSetting?: SlotValueElicitationSetting;
  obfuscationSetting?: ObfuscationSetting;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  intentId?: string;
  creationDateTime?: Date;
  multipleValuesSetting?: MultipleValuesSetting;
  subSlotSetting?: SubSlotSetting;
}
export const CreateSlotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotId: S.optional(S.String),
    slotName: S.optional(S.String),
    description: S.optional(S.String),
    slotTypeId: S.optional(S.String),
    valueElicitationSetting: S.optional(SlotValueElicitationSetting),
    obfuscationSetting: S.optional(ObfuscationSetting),
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    intentId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    multipleValuesSetting: S.optional(MultipleValuesSetting),
    subSlotSetting: S.optional(SubSlotSetting),
  }),
).annotate({
  identifier: "CreateSlotResponse",
}) as any as S.Schema<CreateSlotResponse>;
export type Value = string;
export interface SampleValue {
  value: string;
}
export const SampleValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ value: S.String }),
).annotate({ identifier: "SampleValue" }) as any as S.Schema<SampleValue>;
export type SynonymList = SampleValue[];
export const SynonymList = /*@__PURE__*/ S.Array(SampleValue);
export interface SlotTypeValue {
  sampleValue?: SampleValue;
  synonyms?: SampleValue[];
}
export const SlotTypeValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sampleValue: S.optional(SampleValue),
    synonyms: S.optional(SynonymList),
  }),
).annotate({ identifier: "SlotTypeValue" }) as any as S.Schema<SlotTypeValue>;
export type SlotTypeValues = SlotTypeValue[];
export const SlotTypeValues = /*@__PURE__*/ S.Array(SlotTypeValue);
export type SlotValueResolutionStrategy =
  | "OriginalValue"
  | "TopResolution"
  | "Concatenation"
  | (string & {});
export const SlotValueResolutionStrategy = S.String;

export type RegexPattern = string;
export interface SlotValueRegexFilter {
  pattern: string;
}
export const SlotValueRegexFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ pattern: S.String }),
).annotate({
  identifier: "SlotValueRegexFilter",
}) as any as S.Schema<SlotValueRegexFilter>;
export type AudioRecognitionStrategy =
  | "UseSlotValuesAsCustomVocabulary"
  | (string & {});
export const AudioRecognitionStrategy = S.String;

export interface AdvancedRecognitionSetting {
  audioRecognitionStrategy?: AudioRecognitionStrategy;
}
export const AdvancedRecognitionSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ audioRecognitionStrategy: S.optional(AudioRecognitionStrategy) }),
).annotate({
  identifier: "AdvancedRecognitionSetting",
}) as any as S.Schema<AdvancedRecognitionSetting>;
export interface SlotValueSelectionSetting {
  resolutionStrategy: SlotValueResolutionStrategy;
  regexFilter?: SlotValueRegexFilter;
  advancedRecognitionSetting?: AdvancedRecognitionSetting;
}
export const SlotValueSelectionSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resolutionStrategy: SlotValueResolutionStrategy,
    regexFilter: S.optional(SlotValueRegexFilter),
    advancedRecognitionSetting: S.optional(AdvancedRecognitionSetting),
  }),
).annotate({
  identifier: "SlotValueSelectionSetting",
}) as any as S.Schema<SlotValueSelectionSetting>;
export type SlotTypeSignature = string;
export type S3BucketName = string;
export type S3ObjectPath = string;
export interface GrammarSlotTypeSource {
  s3BucketName: string;
  s3ObjectKey: string;
  kmsKeyArn?: string;
}
export const GrammarSlotTypeSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3BucketName: S.String,
    s3ObjectKey: S.String,
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "GrammarSlotTypeSource",
}) as any as S.Schema<GrammarSlotTypeSource>;
export interface GrammarSlotTypeSetting {
  source?: GrammarSlotTypeSource;
}
export const GrammarSlotTypeSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ source: S.optional(GrammarSlotTypeSource) }),
).annotate({
  identifier: "GrammarSlotTypeSetting",
}) as any as S.Schema<GrammarSlotTypeSetting>;
export interface ExternalSourceSetting {
  grammarSlotTypeSetting?: GrammarSlotTypeSetting;
}
export const ExternalSourceSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ grammarSlotTypeSetting: S.optional(GrammarSlotTypeSetting) }),
).annotate({
  identifier: "ExternalSourceSetting",
}) as any as S.Schema<ExternalSourceSetting>;
export interface SubSlotTypeComposition {
  name: string;
  slotTypeId: string;
}
export const SubSlotTypeComposition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, slotTypeId: S.String }),
).annotate({
  identifier: "SubSlotTypeComposition",
}) as any as S.Schema<SubSlotTypeComposition>;
export type SubSlotTypeList = SubSlotTypeComposition[];
export const SubSlotTypeList = /*@__PURE__*/ S.Array(SubSlotTypeComposition);
export interface CompositeSlotTypeSetting {
  subSlots?: SubSlotTypeComposition[];
}
export const CompositeSlotTypeSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ subSlots: S.optional(SubSlotTypeList) }),
).annotate({
  identifier: "CompositeSlotTypeSetting",
}) as any as S.Schema<CompositeSlotTypeSetting>;
export interface CreateSlotTypeRequest {
  slotTypeName: string;
  description?: string;
  slotTypeValues?: SlotTypeValue[];
  valueSelectionSetting?: SlotValueSelectionSetting;
  parentSlotTypeSignature?: string;
  botId: string;
  botVersion: string;
  localeId: string;
  externalSourceSetting?: ExternalSourceSetting;
  compositeSlotTypeSetting?: CompositeSlotTypeSetting;
}
export const CreateSlotTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypeName: S.String,
    description: S.optional(S.String),
    slotTypeValues: S.optional(SlotTypeValues),
    valueSelectionSetting: S.optional(SlotValueSelectionSetting),
    parentSlotTypeSignature: S.optional(S.String),
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    externalSourceSetting: S.optional(ExternalSourceSetting),
    compositeSlotTypeSetting: S.optional(CompositeSlotTypeSetting),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/slottypes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSlotTypeRequest",
}) as any as S.Schema<CreateSlotTypeRequest>;
export interface CreateSlotTypeResponse {
  slotTypeId?: string;
  slotTypeName?: string;
  description?: string;
  slotTypeValues?: SlotTypeValue[];
  valueSelectionSetting?: SlotValueSelectionSetting;
  parentSlotTypeSignature?: string;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  creationDateTime?: Date;
  externalSourceSetting?: ExternalSourceSetting;
  compositeSlotTypeSetting?: CompositeSlotTypeSetting;
}
export const CreateSlotTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypeId: S.optional(S.String),
    slotTypeName: S.optional(S.String),
    description: S.optional(S.String),
    slotTypeValues: S.optional(SlotTypeValues),
    valueSelectionSetting: S.optional(SlotValueSelectionSetting),
    parentSlotTypeSignature: S.optional(S.String),
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    externalSourceSetting: S.optional(ExternalSourceSetting),
    compositeSlotTypeSetting: S.optional(CompositeSlotTypeSetting),
  }),
).annotate({
  identifier: "CreateSlotTypeResponse",
}) as any as S.Schema<CreateSlotTypeResponse>;
export interface TestSetDiscrepancyReportBotAliasTarget {
  botId: string;
  botAliasId: string;
  localeId: string;
}
export const TestSetDiscrepancyReportBotAliasTarget = /*@__PURE__*/ S.suspend(
  () => S.Struct({ botId: S.String, botAliasId: S.String, localeId: S.String }),
).annotate({
  identifier: "TestSetDiscrepancyReportBotAliasTarget",
}) as any as S.Schema<TestSetDiscrepancyReportBotAliasTarget>;
export interface TestSetDiscrepancyReportResourceTarget {
  botAliasTarget?: TestSetDiscrepancyReportBotAliasTarget;
}
export const TestSetDiscrepancyReportResourceTarget = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botAliasTarget: S.optional(TestSetDiscrepancyReportBotAliasTarget),
    }),
).annotate({
  identifier: "TestSetDiscrepancyReportResourceTarget",
}) as any as S.Schema<TestSetDiscrepancyReportResourceTarget>;
export interface CreateTestSetDiscrepancyReportRequest {
  testSetId: string;
  target: TestSetDiscrepancyReportResourceTarget;
}
export const CreateTestSetDiscrepancyReportRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      testSetId: S.String.pipe(T.HttpLabel("testSetId")),
      target: TestSetDiscrepancyReportResourceTarget,
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/testsets/{testSetId}/testsetdiscrepancy",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateTestSetDiscrepancyReportRequest",
}) as any as S.Schema<CreateTestSetDiscrepancyReportRequest>;
export interface CreateTestSetDiscrepancyReportResponse {
  testSetDiscrepancyReportId?: string;
  creationDateTime?: Date;
  testSetId?: string;
  target?: TestSetDiscrepancyReportResourceTarget;
}
export const CreateTestSetDiscrepancyReportResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      testSetDiscrepancyReportId: S.optional(S.String),
      creationDateTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      testSetId: S.optional(S.String),
      target: S.optional(TestSetDiscrepancyReportResourceTarget),
    }),
).annotate({
  identifier: "CreateTestSetDiscrepancyReportResponse",
}) as any as S.Schema<CreateTestSetDiscrepancyReportResponse>;
export interface CreateUploadUrlRequest {}
export const CreateUploadUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/createuploadurl" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateUploadUrlRequest",
}) as any as S.Schema<CreateUploadUrlRequest>;
export type PresignedS3Url = string;
export interface CreateUploadUrlResponse {
  importId?: string;
  uploadUrl?: string;
}
export const CreateUploadUrlResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ importId: S.optional(S.String), uploadUrl: S.optional(S.String) }),
).annotate({
  identifier: "CreateUploadUrlResponse",
}) as any as S.Schema<CreateUploadUrlResponse>;
export type SkipResourceInUseCheck = boolean;
export interface DeleteBotRequest {
  botId: string;
  skipResourceInUseCheck?: boolean;
}
export const DeleteBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    skipResourceInUseCheck: S.optional(S.Boolean).pipe(
      T.HttpQuery("skipResourceInUseCheck"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/bots/{botId}" }),
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
export interface DeleteBotResponse {
  botId?: string;
  botStatus?: BotStatus;
}
export const DeleteBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ botId: S.optional(S.String), botStatus: S.optional(BotStatus) }),
).annotate({
  identifier: "DeleteBotResponse",
}) as any as S.Schema<DeleteBotResponse>;
export interface DeleteBotAliasRequest {
  botAliasId: string;
  botId: string;
  skipResourceInUseCheck?: boolean;
}
export const DeleteBotAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
    botId: S.String.pipe(T.HttpLabel("botId")),
    skipResourceInUseCheck: S.optional(S.Boolean).pipe(
      T.HttpQuery("skipResourceInUseCheck"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/bots/{botId}/botaliases/{botAliasId}",
      }),
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
export interface DeleteBotAliasResponse {
  botAliasId?: string;
  botId?: string;
  botAliasStatus?: BotAliasStatus;
}
export const DeleteBotAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasId: S.optional(S.String),
    botId: S.optional(S.String),
    botAliasStatus: S.optional(BotAliasStatus),
  }),
).annotate({
  identifier: "DeleteBotAliasResponse",
}) as any as S.Schema<DeleteBotAliasResponse>;
export type UUID = string;
export interface DeleteBotAnalyzerRecommendationRequest {
  botId: string;
  botAnalyzerRequestId: string;
}
export const DeleteBotAnalyzerRecommendationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botId: S.String.pipe(T.HttpLabel("botId")),
      botAnalyzerRequestId: S.String.pipe(T.HttpLabel("botAnalyzerRequestId")),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/bots/{botId}/botanalyzer/{botAnalyzerRequestId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteBotAnalyzerRecommendationRequest",
}) as any as S.Schema<DeleteBotAnalyzerRecommendationRequest>;
export interface DeleteBotAnalyzerRecommendationResponse {}
export const DeleteBotAnalyzerRecommendationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteBotAnalyzerRecommendationResponse",
}) as any as S.Schema<DeleteBotAnalyzerRecommendationResponse>;
export interface DeleteBotLocaleRequest {
  botId: string;
  botVersion: string;
  localeId: string;
}
export const DeleteBotLocaleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBotLocaleRequest",
}) as any as S.Schema<DeleteBotLocaleRequest>;
export interface DeleteBotLocaleResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botLocaleStatus?: BotLocaleStatus;
}
export const DeleteBotLocaleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    botLocaleStatus: S.optional(BotLocaleStatus),
  }),
).annotate({
  identifier: "DeleteBotLocaleResponse",
}) as any as S.Schema<DeleteBotLocaleResponse>;
export interface DeleteBotReplicaRequest {
  botId: string;
  replicaRegion: string;
}
export const DeleteBotReplicaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    replicaRegion: S.String.pipe(T.HttpLabel("replicaRegion")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/bots/{botId}/replicas/{replicaRegion}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteBotReplicaRequest",
}) as any as S.Schema<DeleteBotReplicaRequest>;
export interface DeleteBotReplicaResponse {
  botId?: string;
  replicaRegion?: string;
  botReplicaStatus?: BotReplicaStatus;
}
export const DeleteBotReplicaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    replicaRegion: S.optional(S.String),
    botReplicaStatus: S.optional(BotReplicaStatus),
  }),
).annotate({
  identifier: "DeleteBotReplicaResponse",
}) as any as S.Schema<DeleteBotReplicaResponse>;
export interface DeleteBotVersionRequest {
  botId: string;
  botVersion: string;
  skipResourceInUseCheck?: boolean;
}
export const DeleteBotVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    skipResourceInUseCheck: S.optional(S.Boolean).pipe(
      T.HttpQuery("skipResourceInUseCheck"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/bots/{botId}/botversions/{botVersion}",
      }),
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
export interface DeleteBotVersionResponse {
  botId?: string;
  botVersion?: string;
  botStatus?: BotStatus;
}
export const DeleteBotVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    botStatus: S.optional(BotStatus),
  }),
).annotate({
  identifier: "DeleteBotVersionResponse",
}) as any as S.Schema<DeleteBotVersionResponse>;
export interface DeleteCustomVocabularyRequest {
  botId: string;
  botVersion: string;
  localeId: string;
}
export const DeleteCustomVocabularyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/customvocabulary",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCustomVocabularyRequest",
}) as any as S.Schema<DeleteCustomVocabularyRequest>;
export type CustomVocabularyStatus =
  | "Ready"
  | "Deleting"
  | "Exporting"
  | "Importing"
  | "Creating"
  | (string & {});
export const CustomVocabularyStatus = S.String;

export interface DeleteCustomVocabularyResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  customVocabularyStatus?: CustomVocabularyStatus;
}
export const DeleteCustomVocabularyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    customVocabularyStatus: S.optional(CustomVocabularyStatus),
  }),
).annotate({
  identifier: "DeleteCustomVocabularyResponse",
}) as any as S.Schema<DeleteCustomVocabularyResponse>;
export interface DeleteExportRequest {
  exportId: string;
}
export const DeleteExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exportId: S.String.pipe(T.HttpLabel("exportId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/exports/{exportId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteExportRequest",
}) as any as S.Schema<DeleteExportRequest>;
export interface DeleteExportResponse {
  exportId?: string;
  exportStatus?: ExportStatus;
}
export const DeleteExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportId: S.optional(S.String),
    exportStatus: S.optional(ExportStatus),
  }),
).annotate({
  identifier: "DeleteExportResponse",
}) as any as S.Schema<DeleteExportResponse>;
export interface DeleteImportRequest {
  importId: string;
}
export const DeleteImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ importId: S.String.pipe(T.HttpLabel("importId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/imports/{importId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteImportRequest",
}) as any as S.Schema<DeleteImportRequest>;
export type ImportStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Deleting"
  | (string & {});
export const ImportStatus = S.String;

export interface DeleteImportResponse {
  importId?: string;
  importStatus?: ImportStatus;
}
export const DeleteImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importId: S.optional(S.String),
    importStatus: S.optional(ImportStatus),
  }),
).annotate({
  identifier: "DeleteImportResponse",
}) as any as S.Schema<DeleteImportResponse>;
export interface DeleteIntentRequest {
  intentId: string;
  botId: string;
  botVersion: string;
  localeId: string;
}
export const DeleteIntentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentId: S.String.pipe(T.HttpLabel("intentId")),
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}",
      }),
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
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
  expectedRevisionId?: string;
}
export const DeleteResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    expectedRevisionId: S.optional(S.String).pipe(
      T.HttpQuery("expectedRevisionId"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/policy/{resourceArn}" }),
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
export interface DeleteResourcePolicyResponse {
  resourceArn?: string;
  revisionId?: string;
}
export const DeleteResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    revisionId: S.optional(S.String),
  }),
).annotate({
  identifier: "DeleteResourcePolicyResponse",
}) as any as S.Schema<DeleteResourcePolicyResponse>;
export interface DeleteResourcePolicyStatementRequest {
  resourceArn: string;
  statementId: string;
  expectedRevisionId?: string;
}
export const DeleteResourcePolicyStatementRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
      statementId: S.String.pipe(T.HttpLabel("statementId")),
      expectedRevisionId: S.optional(S.String).pipe(
        T.HttpQuery("expectedRevisionId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/policy/{resourceArn}/statements/{statementId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteResourcePolicyStatementRequest",
}) as any as S.Schema<DeleteResourcePolicyStatementRequest>;
export interface DeleteResourcePolicyStatementResponse {
  resourceArn?: string;
  revisionId?: string;
}
export const DeleteResourcePolicyStatementResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      resourceArn: S.optional(S.String),
      revisionId: S.optional(S.String),
    }),
).annotate({
  identifier: "DeleteResourcePolicyStatementResponse",
}) as any as S.Schema<DeleteResourcePolicyStatementResponse>;
export interface DeleteSlotRequest {
  slotId: string;
  botId: string;
  botVersion: string;
  localeId: string;
  intentId: string;
}
export const DeleteSlotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotId: S.String.pipe(T.HttpLabel("slotId")),
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    intentId: S.String.pipe(T.HttpLabel("intentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}/slots/{slotId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSlotRequest",
}) as any as S.Schema<DeleteSlotRequest>;
export interface DeleteSlotResponse {}
export const DeleteSlotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSlotResponse",
}) as any as S.Schema<DeleteSlotResponse>;
export interface DeleteSlotTypeRequest {
  slotTypeId: string;
  botId: string;
  botVersion: string;
  localeId: string;
  skipResourceInUseCheck?: boolean;
}
export const DeleteSlotTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypeId: S.String.pipe(T.HttpLabel("slotTypeId")),
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    skipResourceInUseCheck: S.optional(S.Boolean).pipe(
      T.HttpQuery("skipResourceInUseCheck"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/slottypes/{slotTypeId}",
      }),
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
export interface DeleteTestSetRequest {
  testSetId: string;
}
export const DeleteTestSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testSetId: S.String.pipe(T.HttpLabel("testSetId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/testsets/{testSetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTestSetRequest",
}) as any as S.Schema<DeleteTestSetRequest>;
export interface DeleteTestSetResponse {}
export const DeleteTestSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTestSetResponse",
}) as any as S.Schema<DeleteTestSetResponse>;
export type SessionId = string;
export interface DeleteUtterancesRequest {
  botId: string;
  localeId?: string;
  sessionId?: string;
}
export const DeleteUtterancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    localeId: S.optional(S.String).pipe(T.HttpQuery("localeId")),
    sessionId: S.optional(S.String).pipe(T.HttpQuery("sessionId")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/bots/{botId}/utterances" }),
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
export interface DescribeBotRequest {
  botId: string;
}
export const DescribeBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ botId: S.String.pipe(T.HttpLabel("botId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/bots/{botId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBotRequest",
}) as any as S.Schema<DescribeBotRequest>;
export type FailureReason = string;
export type FailureReasons = string[];
export const FailureReasons = /*@__PURE__*/ S.Array(S.String);
export interface DescribeBotResponse {
  botId?: string;
  botName?: string;
  description?: string;
  roleArn?: string;
  dataPrivacy?: DataPrivacy;
  idleSessionTTLInSeconds?: number;
  botStatus?: BotStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  botType?: BotType;
  botMembers?: BotMember[];
  failureReasons?: string[];
  errorLogSettings?: ErrorLogSettings;
}
export const DescribeBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botName: S.optional(S.String),
    description: S.optional(S.String),
    roleArn: S.optional(S.String),
    dataPrivacy: S.optional(DataPrivacy),
    idleSessionTTLInSeconds: S.optional(S.Number),
    botStatus: S.optional(BotStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    botType: S.optional(BotType),
    botMembers: S.optional(BotMembers),
    failureReasons: S.optional(FailureReasons),
    errorLogSettings: S.optional(ErrorLogSettings),
  }),
).annotate({
  identifier: "DescribeBotResponse",
}) as any as S.Schema<DescribeBotResponse>;
export interface DescribeBotAliasRequest {
  botAliasId: string;
  botId: string;
}
export const DescribeBotAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
    botId: S.String.pipe(T.HttpLabel("botId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/bots/{botId}/botaliases/{botAliasId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBotAliasRequest",
}) as any as S.Schema<DescribeBotAliasRequest>;
export interface BotAliasHistoryEvent {
  botVersion?: string;
  startDate?: Date;
  endDate?: Date;
}
export const BotAliasHistoryEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botVersion: S.optional(S.String),
    startDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    endDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "BotAliasHistoryEvent",
}) as any as S.Schema<BotAliasHistoryEvent>;
export type BotAliasHistoryEventsList = BotAliasHistoryEvent[];
export const BotAliasHistoryEventsList =
  /*@__PURE__*/ S.Array(BotAliasHistoryEvent);
export interface ParentBotNetwork {
  botId: string;
  botVersion: string;
}
export const ParentBotNetwork = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ botId: S.String, botVersion: S.String }),
).annotate({
  identifier: "ParentBotNetwork",
}) as any as S.Schema<ParentBotNetwork>;
export type ParentBotNetworks = ParentBotNetwork[];
export const ParentBotNetworks = /*@__PURE__*/ S.Array(ParentBotNetwork);
export interface DescribeBotAliasResponse {
  botAliasId?: string;
  botAliasName?: string;
  description?: string;
  botVersion?: string;
  botAliasLocaleSettings?: {
    [key: string]: BotAliasLocaleSettings | undefined;
  };
  conversationLogSettings?: ConversationLogSettings;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
  botAliasHistoryEvents?: BotAliasHistoryEvent[];
  botAliasStatus?: BotAliasStatus;
  botId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  parentBotNetworks?: ParentBotNetwork[];
}
export const DescribeBotAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasId: S.optional(S.String),
    botAliasName: S.optional(S.String),
    description: S.optional(S.String),
    botVersion: S.optional(S.String),
    botAliasLocaleSettings: S.optional(BotAliasLocaleSettingsMap),
    conversationLogSettings: S.optional(ConversationLogSettings),
    sentimentAnalysisSettings: S.optional(SentimentAnalysisSettings),
    botAliasHistoryEvents: S.optional(BotAliasHistoryEventsList),
    botAliasStatus: S.optional(BotAliasStatus),
    botId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    parentBotNetworks: S.optional(ParentBotNetworks),
  }),
).annotate({
  identifier: "DescribeBotAliasResponse",
}) as any as S.Schema<DescribeBotAliasResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface DescribeBotAnalyzerRecommendationRequest {
  botId: string;
  botAnalyzerRequestId: string;
  nextToken?: string;
  maxResults?: number;
}
export const DescribeBotAnalyzerRecommendationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botId: S.String.pipe(T.HttpLabel("botId")),
      botAnalyzerRequestId: S.String.pipe(T.HttpLabel("botAnalyzerRequestId")),
      nextToken: S.optional(S.String),
      maxResults: S.optional(S.Number),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/bots/{botId}/botanalyzer/describe/{botAnalyzerRequestId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeBotAnalyzerRecommendationRequest",
}) as any as S.Schema<DescribeBotAnalyzerRecommendationRequest>;
export type BotAnalyzerStatus =
  | "Processing"
  | "Available"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export const BotAnalyzerStatus = S.String;

export interface IssueLocation {
  botLocale?: string;
  intentId?: string;
  slotId?: string;
}
export const IssueLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botLocale: S.optional(S.String),
    intentId: S.optional(S.String),
    slotId: S.optional(S.String),
  }),
).annotate({ identifier: "IssueLocation" }) as any as S.Schema<IssueLocation>;
export type Priority = "High" | "Medium" | "Low" | (string & {});
export const Priority = S.String;

export interface BotAnalyzerRecommendation {
  issueLocation: IssueLocation;
  priority: Priority;
  issueDescription: string;
  proposedFix: string;
}
export const BotAnalyzerRecommendation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    issueLocation: IssueLocation,
    priority: Priority,
    issueDescription: S.String,
    proposedFix: S.String,
  }),
).annotate({
  identifier: "BotAnalyzerRecommendation",
}) as any as S.Schema<BotAnalyzerRecommendation>;
export type BotAnalyzerRecommendationList = BotAnalyzerRecommendation[];
export const BotAnalyzerRecommendationList = /*@__PURE__*/ S.Array(
  BotAnalyzerRecommendation,
);
export interface DescribeBotAnalyzerRecommendationResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botAnalyzerStatus?: BotAnalyzerStatus;
  creationDateTime?: Date;
  botAnalyzerRecommendationList?: BotAnalyzerRecommendation[];
  nextToken?: string;
}
export const DescribeBotAnalyzerRecommendationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      botId: S.optional(S.String),
      botVersion: S.optional(S.String),
      localeId: S.optional(S.String),
      botAnalyzerStatus: S.optional(BotAnalyzerStatus),
      creationDateTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      botAnalyzerRecommendationList: S.optional(BotAnalyzerRecommendationList),
      nextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "DescribeBotAnalyzerRecommendationResponse",
  }) as any as S.Schema<DescribeBotAnalyzerRecommendationResponse>;
export interface DescribeBotLocaleRequest {
  botId: string;
  botVersion: string;
  localeId: string;
}
export const DescribeBotLocaleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBotLocaleRequest",
}) as any as S.Schema<DescribeBotLocaleRequest>;
export type ResourceCount = number;
export type BotLocaleHistoryEventDescription = string;
export interface BotLocaleHistoryEvent {
  event: string;
  eventDate: Date;
}
export const BotLocaleHistoryEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    event: S.String,
    eventDate: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "BotLocaleHistoryEvent",
}) as any as S.Schema<BotLocaleHistoryEvent>;
export type BotLocaleHistoryEventsList = BotLocaleHistoryEvent[];
export const BotLocaleHistoryEventsList = /*@__PURE__*/ S.Array(
  BotLocaleHistoryEvent,
);
export type RecommendedAction = string;
export type RecommendedActions = string[];
export const RecommendedActions = /*@__PURE__*/ S.Array(S.String);
export interface DescribeBotLocaleResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  localeName?: string;
  description?: string;
  nluIntentConfidenceThreshold?: number;
  voiceSettings?: VoiceSettings;
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  audioFillerSettings?: AudioFillerSettings;
  speechRecognitionSettings?: SpeechRecognitionSettings;
  intentsCount?: number;
  slotTypesCount?: number;
  botLocaleStatus?: BotLocaleStatus;
  failureReasons?: string[];
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  lastBuildSubmittedDateTime?: Date;
  botLocaleHistoryEvents?: BotLocaleHistoryEvent[];
  recommendedActions?: string[];
  generativeAISettings?: GenerativeAISettings;
  speechDetectionSensitivity?: SpeechDetectionSensitivity;
}
export const DescribeBotLocaleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    localeName: S.optional(S.String),
    description: S.optional(S.String),
    nluIntentConfidenceThreshold: S.optional(S.Number),
    voiceSettings: S.optional(VoiceSettings),
    unifiedSpeechSettings: S.optional(UnifiedSpeechSettings),
    audioFillerSettings: S.optional(AudioFillerSettings),
    speechRecognitionSettings: S.optional(SpeechRecognitionSettings),
    intentsCount: S.optional(S.Number),
    slotTypesCount: S.optional(S.Number),
    botLocaleStatus: S.optional(BotLocaleStatus),
    failureReasons: S.optional(FailureReasons),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastBuildSubmittedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    botLocaleHistoryEvents: S.optional(BotLocaleHistoryEventsList),
    recommendedActions: S.optional(RecommendedActions),
    generativeAISettings: S.optional(GenerativeAISettings),
    speechDetectionSensitivity: S.optional(SpeechDetectionSensitivity),
  }),
).annotate({
  identifier: "DescribeBotLocaleResponse",
}) as any as S.Schema<DescribeBotLocaleResponse>;
export interface DescribeBotRecommendationRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  botRecommendationId: string;
}
export const DescribeBotRecommendationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    botRecommendationId: S.String.pipe(T.HttpLabel("botRecommendationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations/{botRecommendationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBotRecommendationRequest",
}) as any as S.Schema<DescribeBotRecommendationRequest>;
export type BotRecommendationStatus =
  | "Processing"
  | "Deleting"
  | "Deleted"
  | "Downloading"
  | "Updating"
  | "Available"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export const BotRecommendationStatus = S.String;

export type ObjectPrefix = string;
export type ObjectPrefixes = string[];
export const ObjectPrefixes = /*@__PURE__*/ S.Array(S.String);
export interface PathFormat {
  objectPrefixes?: string[];
}
export const PathFormat = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ objectPrefixes: S.optional(ObjectPrefixes) }),
).annotate({ identifier: "PathFormat" }) as any as S.Schema<PathFormat>;
export type TranscriptFormat = "Lex" | (string & {});
export const TranscriptFormat = S.String;

export interface DateRangeFilter {
  startDateTime: Date;
  endDateTime: Date;
}
export const DateRangeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "DateRangeFilter",
}) as any as S.Schema<DateRangeFilter>;
export interface LexTranscriptFilter {
  dateRangeFilter?: DateRangeFilter;
}
export const LexTranscriptFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ dateRangeFilter: S.optional(DateRangeFilter) }),
).annotate({
  identifier: "LexTranscriptFilter",
}) as any as S.Schema<LexTranscriptFilter>;
export interface TranscriptFilter {
  lexTranscriptFilter?: LexTranscriptFilter;
}
export const TranscriptFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lexTranscriptFilter: S.optional(LexTranscriptFilter) }),
).annotate({
  identifier: "TranscriptFilter",
}) as any as S.Schema<TranscriptFilter>;
export interface S3BucketTranscriptSource {
  s3BucketName: string;
  pathFormat?: PathFormat;
  transcriptFormat: TranscriptFormat;
  transcriptFilter?: TranscriptFilter;
  kmsKeyArn?: string;
}
export const S3BucketTranscriptSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3BucketName: S.String,
    pathFormat: S.optional(PathFormat),
    transcriptFormat: TranscriptFormat,
    transcriptFilter: S.optional(TranscriptFilter),
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "S3BucketTranscriptSource",
}) as any as S.Schema<S3BucketTranscriptSource>;
export interface TranscriptSourceSetting {
  s3BucketTranscriptSource?: S3BucketTranscriptSource;
}
export const TranscriptSourceSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3BucketTranscriptSource: S.optional(S3BucketTranscriptSource) }),
).annotate({
  identifier: "TranscriptSourceSetting",
}) as any as S.Schema<TranscriptSourceSetting>;
export type FilePassword = string | redacted.Redacted<string>;
export interface EncryptionSetting {
  kmsKeyArn?: string;
  botLocaleExportPassword?: string | redacted.Redacted<string>;
  associatedTranscriptsPassword?: string | redacted.Redacted<string>;
}
export const EncryptionSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    kmsKeyArn: S.optional(S.String),
    botLocaleExportPassword: S.optional(SensitiveString),
    associatedTranscriptsPassword: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "EncryptionSetting",
}) as any as S.Schema<EncryptionSetting>;
export type Count = number;
export interface IntentStatistics {
  discoveredIntentCount?: number;
}
export const IntentStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ discoveredIntentCount: S.optional(S.Number) }),
).annotate({
  identifier: "IntentStatistics",
}) as any as S.Schema<IntentStatistics>;
export interface SlotTypeStatistics {
  discoveredSlotTypeCount?: number;
}
export const SlotTypeStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ discoveredSlotTypeCount: S.optional(S.Number) }),
).annotate({
  identifier: "SlotTypeStatistics",
}) as any as S.Schema<SlotTypeStatistics>;
export interface BotRecommendationResultStatistics {
  intents?: IntentStatistics;
  slotTypes?: SlotTypeStatistics;
}
export const BotRecommendationResultStatistics = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intents: S.optional(IntentStatistics),
    slotTypes: S.optional(SlotTypeStatistics),
  }),
).annotate({
  identifier: "BotRecommendationResultStatistics",
}) as any as S.Schema<BotRecommendationResultStatistics>;
export interface BotRecommendationResults {
  botLocaleExportUrl?: string;
  associatedTranscriptsUrl?: string;
  statistics?: BotRecommendationResultStatistics;
}
export const BotRecommendationResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botLocaleExportUrl: S.optional(S.String),
    associatedTranscriptsUrl: S.optional(S.String),
    statistics: S.optional(BotRecommendationResultStatistics),
  }),
).annotate({
  identifier: "BotRecommendationResults",
}) as any as S.Schema<BotRecommendationResults>;
export interface DescribeBotRecommendationResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationStatus?: BotRecommendationStatus;
  botRecommendationId?: string;
  failureReasons?: string[];
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  transcriptSourceSetting?: TranscriptSourceSetting;
  encryptionSetting?: EncryptionSetting;
  botRecommendationResults?: BotRecommendationResults;
}
export const DescribeBotRecommendationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    botRecommendationStatus: S.optional(BotRecommendationStatus),
    botRecommendationId: S.optional(S.String),
    failureReasons: S.optional(FailureReasons),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    transcriptSourceSetting: S.optional(TranscriptSourceSetting),
    encryptionSetting: S.optional(EncryptionSetting),
    botRecommendationResults: S.optional(BotRecommendationResults),
  }),
).annotate({
  identifier: "DescribeBotRecommendationResponse",
}) as any as S.Schema<DescribeBotRecommendationResponse>;
export interface DescribeBotReplicaRequest {
  botId: string;
  replicaRegion: string;
}
export const DescribeBotReplicaRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    replicaRegion: S.String.pipe(T.HttpLabel("replicaRegion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/bots/{botId}/replicas/{replicaRegion}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBotReplicaRequest",
}) as any as S.Schema<DescribeBotReplicaRequest>;
export interface DescribeBotReplicaResponse {
  botId?: string;
  replicaRegion?: string;
  sourceRegion?: string;
  creationDateTime?: Date;
  botReplicaStatus?: BotReplicaStatus;
  failureReasons?: string[];
}
export const DescribeBotReplicaResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    replicaRegion: S.optional(S.String),
    sourceRegion: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    botReplicaStatus: S.optional(BotReplicaStatus),
    failureReasons: S.optional(FailureReasons),
  }),
).annotate({
  identifier: "DescribeBotReplicaResponse",
}) as any as S.Schema<DescribeBotReplicaResponse>;
export interface DescribeBotResourceGenerationRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  generationId: string;
}
export const DescribeBotResourceGenerationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botId: S.String.pipe(T.HttpLabel("botId")),
      botVersion: S.String.pipe(T.HttpLabel("botVersion")),
      localeId: S.String.pipe(T.HttpLabel("localeId")),
      generationId: S.String.pipe(T.HttpLabel("generationId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/generations/{generationId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeBotResourceGenerationRequest",
}) as any as S.Schema<DescribeBotResourceGenerationRequest>;
export type GenerationStatus =
  | "Failed"
  | "Complete"
  | "InProgress"
  | (string & {});
export const GenerationStatus = S.String;

export type GenerationInput = string;
export interface DescribeBotResourceGenerationResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  generationId?: string;
  failureReasons?: string[];
  generationStatus?: GenerationStatus;
  generationInputPrompt?: string;
  generatedBotLocaleUrl?: string;
  creationDateTime?: Date;
  modelArn?: string;
  lastUpdatedDateTime?: Date;
}
export const DescribeBotResourceGenerationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botId: S.optional(S.String),
      botVersion: S.optional(S.String),
      localeId: S.optional(S.String),
      generationId: S.optional(S.String),
      failureReasons: S.optional(FailureReasons),
      generationStatus: S.optional(GenerationStatus),
      generationInputPrompt: S.optional(S.String),
      generatedBotLocaleUrl: S.optional(S.String),
      creationDateTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      modelArn: S.optional(S.String),
      lastUpdatedDateTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
    }),
).annotate({
  identifier: "DescribeBotResourceGenerationResponse",
}) as any as S.Schema<DescribeBotResourceGenerationResponse>;
export interface DescribeBotVersionRequest {
  botId: string;
  botVersion: string;
}
export const DescribeBotVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/bots/{botId}/botversions/{botVersion}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeBotVersionRequest",
}) as any as S.Schema<DescribeBotVersionRequest>;
export interface DescribeBotVersionResponse {
  botId?: string;
  botName?: string;
  botVersion?: string;
  description?: string;
  roleArn?: string;
  dataPrivacy?: DataPrivacy;
  idleSessionTTLInSeconds?: number;
  botStatus?: BotStatus;
  failureReasons?: string[];
  creationDateTime?: Date;
  parentBotNetworks?: ParentBotNetwork[];
  botType?: BotType;
  botMembers?: BotMember[];
}
export const DescribeBotVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botName: S.optional(S.String),
    botVersion: S.optional(S.String),
    description: S.optional(S.String),
    roleArn: S.optional(S.String),
    dataPrivacy: S.optional(DataPrivacy),
    idleSessionTTLInSeconds: S.optional(S.Number),
    botStatus: S.optional(BotStatus),
    failureReasons: S.optional(FailureReasons),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    parentBotNetworks: S.optional(ParentBotNetworks),
    botType: S.optional(BotType),
    botMembers: S.optional(BotMembers),
  }),
).annotate({
  identifier: "DescribeBotVersionResponse",
}) as any as S.Schema<DescribeBotVersionResponse>;
export interface DescribeCustomVocabularyMetadataRequest {
  botId: string;
  botVersion: string;
  localeId: string;
}
export const DescribeCustomVocabularyMetadataRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botId: S.String.pipe(T.HttpLabel("botId")),
      botVersion: S.String.pipe(T.HttpLabel("botVersion")),
      localeId: S.String.pipe(T.HttpLabel("localeId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/customvocabulary/DEFAULT/metadata",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeCustomVocabularyMetadataRequest",
}) as any as S.Schema<DescribeCustomVocabularyMetadataRequest>;
export interface DescribeCustomVocabularyMetadataResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  customVocabularyStatus?: CustomVocabularyStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const DescribeCustomVocabularyMetadataResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      botId: S.optional(S.String),
      botVersion: S.optional(S.String),
      localeId: S.optional(S.String),
      customVocabularyStatus: S.optional(CustomVocabularyStatus),
      creationDateTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      lastUpdatedDateTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
    }),
).annotate({
  identifier: "DescribeCustomVocabularyMetadataResponse",
}) as any as S.Schema<DescribeCustomVocabularyMetadataResponse>;
export interface DescribeExportRequest {
  exportId: string;
}
export const DescribeExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ exportId: S.String.pipe(T.HttpLabel("exportId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/exports/{exportId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeExportRequest",
}) as any as S.Schema<DescribeExportRequest>;
export interface DescribeExportResponse {
  exportId?: string;
  resourceSpecification?: ExportResourceSpecification;
  fileFormat?: ImportExportFileFormat;
  exportStatus?: ExportStatus;
  failureReasons?: string[];
  downloadUrl?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const DescribeExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportId: S.optional(S.String),
    resourceSpecification: S.optional(ExportResourceSpecification),
    fileFormat: S.optional(ImportExportFileFormat),
    exportStatus: S.optional(ExportStatus),
    failureReasons: S.optional(FailureReasons),
    downloadUrl: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeExportResponse",
}) as any as S.Schema<DescribeExportResponse>;
export interface DescribeImportRequest {
  importId: string;
}
export const DescribeImportRequest = /*@__PURE__*/ S.suspend(() =>
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
  identifier: "DescribeImportRequest",
}) as any as S.Schema<DescribeImportRequest>;
export interface BotImportSpecification {
  botName: string;
  roleArn: string;
  dataPrivacy: DataPrivacy;
  errorLogSettings?: ErrorLogSettings;
  idleSessionTTLInSeconds?: number;
  botTags?: { [key: string]: string | undefined };
  testBotAliasTags?: { [key: string]: string | undefined };
}
export const BotImportSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botName: S.String,
    roleArn: S.String,
    dataPrivacy: DataPrivacy,
    errorLogSettings: S.optional(ErrorLogSettings),
    idleSessionTTLInSeconds: S.optional(S.Number),
    botTags: S.optional(TagMap),
    testBotAliasTags: S.optional(TagMap),
  }),
).annotate({
  identifier: "BotImportSpecification",
}) as any as S.Schema<BotImportSpecification>;
export interface BotLocaleImportSpecification {
  botId: string;
  botVersion: string;
  localeId: string;
  nluIntentConfidenceThreshold?: number;
  voiceSettings?: VoiceSettings;
  speechRecognitionSettings?: SpeechRecognitionSettings;
  speechDetectionSensitivity?: SpeechDetectionSensitivity;
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  audioFillerSettings?: AudioFillerSettings;
}
export const BotLocaleImportSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String,
    botVersion: S.String,
    localeId: S.String,
    nluIntentConfidenceThreshold: S.optional(S.Number),
    voiceSettings: S.optional(VoiceSettings),
    speechRecognitionSettings: S.optional(SpeechRecognitionSettings),
    speechDetectionSensitivity: S.optional(SpeechDetectionSensitivity),
    unifiedSpeechSettings: S.optional(UnifiedSpeechSettings),
    audioFillerSettings: S.optional(AudioFillerSettings),
  }),
).annotate({
  identifier: "BotLocaleImportSpecification",
}) as any as S.Schema<BotLocaleImportSpecification>;
export interface CustomVocabularyImportSpecification {
  botId: string;
  botVersion: string;
  localeId: string;
}
export const CustomVocabularyImportSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ botId: S.String, botVersion: S.String, localeId: S.String }),
).annotate({
  identifier: "CustomVocabularyImportSpecification",
}) as any as S.Schema<CustomVocabularyImportSpecification>;
export interface TestSetStorageLocation {
  s3BucketName: string;
  s3Path: string;
  kmsKeyArn?: string;
}
export const TestSetStorageLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    s3BucketName: S.String,
    s3Path: S.String,
    kmsKeyArn: S.optional(S.String),
  }),
).annotate({
  identifier: "TestSetStorageLocation",
}) as any as S.Schema<TestSetStorageLocation>;
export interface TestSetImportInputLocation {
  s3BucketName: string;
  s3Path: string;
}
export const TestSetImportInputLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3BucketName: S.String, s3Path: S.String }),
).annotate({
  identifier: "TestSetImportInputLocation",
}) as any as S.Schema<TestSetImportInputLocation>;
export type TestSetModality = "Text" | "Audio" | (string & {});
export const TestSetModality = S.String;

export interface TestSetImportResourceSpecification {
  testSetName: string;
  description?: string;
  roleArn: string;
  storageLocation: TestSetStorageLocation;
  importInputLocation: TestSetImportInputLocation;
  modality: TestSetModality;
  testSetTags?: { [key: string]: string | undefined };
}
export const TestSetImportResourceSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSetName: S.String,
    description: S.optional(S.String),
    roleArn: S.String,
    storageLocation: TestSetStorageLocation,
    importInputLocation: TestSetImportInputLocation,
    modality: TestSetModality,
    testSetTags: S.optional(TagMap),
  }),
).annotate({
  identifier: "TestSetImportResourceSpecification",
}) as any as S.Schema<TestSetImportResourceSpecification>;
export interface ImportResourceSpecification {
  botImportSpecification?: BotImportSpecification;
  botLocaleImportSpecification?: BotLocaleImportSpecification;
  customVocabularyImportSpecification?: CustomVocabularyImportSpecification;
  testSetImportResourceSpecification?: TestSetImportResourceSpecification;
}
export const ImportResourceSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botImportSpecification: S.optional(BotImportSpecification),
    botLocaleImportSpecification: S.optional(BotLocaleImportSpecification),
    customVocabularyImportSpecification: S.optional(
      CustomVocabularyImportSpecification,
    ),
    testSetImportResourceSpecification: S.optional(
      TestSetImportResourceSpecification,
    ),
  }),
).annotate({
  identifier: "ImportResourceSpecification",
}) as any as S.Schema<ImportResourceSpecification>;
export type ImportedResourceId = string;
export type MergeStrategy =
  | "Overwrite"
  | "FailOnConflict"
  | "Append"
  | (string & {});
export const MergeStrategy = S.String;

export interface DescribeImportResponse {
  importId?: string;
  resourceSpecification?: ImportResourceSpecification;
  importedResourceId?: string;
  importedResourceName?: string;
  mergeStrategy?: MergeStrategy;
  importStatus?: ImportStatus;
  failureReasons?: string[];
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const DescribeImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importId: S.optional(S.String),
    resourceSpecification: S.optional(ImportResourceSpecification),
    importedResourceId: S.optional(S.String),
    importedResourceName: S.optional(S.String),
    mergeStrategy: S.optional(MergeStrategy),
    importStatus: S.optional(ImportStatus),
    failureReasons: S.optional(FailureReasons),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeImportResponse",
}) as any as S.Schema<DescribeImportResponse>;
export interface DescribeIntentRequest {
  intentId: string;
  botId: string;
  botVersion: string;
  localeId: string;
}
export const DescribeIntentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentId: S.String.pipe(T.HttpLabel("intentId")),
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeIntentRequest",
}) as any as S.Schema<DescribeIntentRequest>;
export type PriorityValue = number;
export interface SlotPriority {
  priority: number;
  slotId: string;
}
export const SlotPriority = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ priority: S.Number, slotId: S.String }),
).annotate({ identifier: "SlotPriority" }) as any as S.Schema<SlotPriority>;
export type SlotPrioritiesList = SlotPriority[];
export const SlotPrioritiesList = /*@__PURE__*/ S.Array(SlotPriority);
export interface DescribeIntentResponse {
  intentId?: string;
  intentName?: string;
  intentDisplayName?: string;
  description?: string;
  parentIntentSignature?: string;
  sampleUtterances?: SampleUtterance[];
  dialogCodeHook?: DialogCodeHookSettings;
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  slotPriorities?: SlotPriority[];
  intentConfirmationSetting?: IntentConfirmationSetting;
  intentClosingSetting?: IntentClosingSetting;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
  kendraConfiguration?: KendraConfiguration;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  initialResponseSetting?: InitialResponseSetting;
  qnAIntentConfiguration?: QnAIntentConfiguration;
  qInConnectIntentConfiguration?: QInConnectIntentConfiguration;
}
export const DescribeIntentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentId: S.optional(S.String),
    intentName: S.optional(S.String),
    intentDisplayName: S.optional(S.String),
    description: S.optional(S.String),
    parentIntentSignature: S.optional(S.String),
    sampleUtterances: S.optional(SampleUtterancesList),
    dialogCodeHook: S.optional(DialogCodeHookSettings),
    fulfillmentCodeHook: S.optional(FulfillmentCodeHookSettings),
    slotPriorities: S.optional(SlotPrioritiesList),
    intentConfirmationSetting: S.optional(IntentConfirmationSetting),
    intentClosingSetting: S.optional(IntentClosingSetting),
    inputContexts: S.optional(InputContextsList),
    outputContexts: S.optional(OutputContextsList),
    kendraConfiguration: S.optional(KendraConfiguration),
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    initialResponseSetting: S.optional(InitialResponseSetting),
    qnAIntentConfiguration: S.optional(QnAIntentConfiguration),
    qInConnectIntentConfiguration: S.optional(QInConnectIntentConfiguration),
  }),
).annotate({
  identifier: "DescribeIntentResponse",
}) as any as S.Schema<DescribeIntentResponse>;
export interface DescribeResourcePolicyRequest {
  resourceArn: string;
}
export const DescribeResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/policy/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeResourcePolicyRequest",
}) as any as S.Schema<DescribeResourcePolicyRequest>;
export interface DescribeResourcePolicyResponse {
  resourceArn?: string;
  policy?: string;
  revisionId?: string;
}
export const DescribeResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    policy: S.optional(S.String),
    revisionId: S.optional(S.String),
  }),
).annotate({
  identifier: "DescribeResourcePolicyResponse",
}) as any as S.Schema<DescribeResourcePolicyResponse>;
export interface DescribeSlotRequest {
  slotId: string;
  botId: string;
  botVersion: string;
  localeId: string;
  intentId: string;
}
export const DescribeSlotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotId: S.String.pipe(T.HttpLabel("slotId")),
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    intentId: S.String.pipe(T.HttpLabel("intentId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}/slots/{slotId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSlotRequest",
}) as any as S.Schema<DescribeSlotRequest>;
export interface DescribeSlotResponse {
  slotId?: string;
  slotName?: string;
  description?: string;
  slotTypeId?: string;
  valueElicitationSetting?: SlotValueElicitationSetting;
  obfuscationSetting?: ObfuscationSetting;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  intentId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  multipleValuesSetting?: MultipleValuesSetting;
  subSlotSetting?: SubSlotSetting;
}
export const DescribeSlotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotId: S.optional(S.String),
    slotName: S.optional(S.String),
    description: S.optional(S.String),
    slotTypeId: S.optional(S.String),
    valueElicitationSetting: S.optional(SlotValueElicitationSetting),
    obfuscationSetting: S.optional(ObfuscationSetting),
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    intentId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    multipleValuesSetting: S.optional(MultipleValuesSetting),
    subSlotSetting: S.optional(SubSlotSetting),
  }),
).annotate({
  identifier: "DescribeSlotResponse",
}) as any as S.Schema<DescribeSlotResponse>;
export interface DescribeSlotTypeRequest {
  slotTypeId: string;
  botId: string;
  botVersion: string;
  localeId: string;
}
export const DescribeSlotTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypeId: S.String.pipe(T.HttpLabel("slotTypeId")),
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/slottypes/{slotTypeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSlotTypeRequest",
}) as any as S.Schema<DescribeSlotTypeRequest>;
export interface DescribeSlotTypeResponse {
  slotTypeId?: string;
  slotTypeName?: string;
  description?: string;
  slotTypeValues?: SlotTypeValue[];
  valueSelectionSetting?: SlotValueSelectionSetting;
  parentSlotTypeSignature?: string;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  externalSourceSetting?: ExternalSourceSetting;
  compositeSlotTypeSetting?: CompositeSlotTypeSetting;
}
export const DescribeSlotTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypeId: S.optional(S.String),
    slotTypeName: S.optional(S.String),
    description: S.optional(S.String),
    slotTypeValues: S.optional(SlotTypeValues),
    valueSelectionSetting: S.optional(SlotValueSelectionSetting),
    parentSlotTypeSignature: S.optional(S.String),
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    externalSourceSetting: S.optional(ExternalSourceSetting),
    compositeSlotTypeSetting: S.optional(CompositeSlotTypeSetting),
  }),
).annotate({
  identifier: "DescribeSlotTypeResponse",
}) as any as S.Schema<DescribeSlotTypeResponse>;
export interface DescribeTestExecutionRequest {
  testExecutionId: string;
}
export const DescribeTestExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testExecutionId: S.String.pipe(T.HttpLabel("testExecutionId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/testexecutions/{testExecutionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTestExecutionRequest",
}) as any as S.Schema<DescribeTestExecutionRequest>;
export type TestExecutionStatus =
  | "Pending"
  | "Waiting"
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export const TestExecutionStatus = S.String;

export interface BotAliasTestExecutionTarget {
  botId: string;
  botAliasId: string;
  localeId: string;
}
export const BotAliasTestExecutionTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ botId: S.String, botAliasId: S.String, localeId: S.String }),
).annotate({
  identifier: "BotAliasTestExecutionTarget",
}) as any as S.Schema<BotAliasTestExecutionTarget>;
export interface TestExecutionTarget {
  botAliasTarget?: BotAliasTestExecutionTarget;
}
export const TestExecutionTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ botAliasTarget: S.optional(BotAliasTestExecutionTarget) }),
).annotate({
  identifier: "TestExecutionTarget",
}) as any as S.Schema<TestExecutionTarget>;
export type TestExecutionApiMode = "Streaming" | "NonStreaming" | (string & {});
export const TestExecutionApiMode = S.String;

export type TestExecutionModality = "Text" | "Audio" | (string & {});
export const TestExecutionModality = S.String;

export interface DescribeTestExecutionResponse {
  testExecutionId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  testExecutionStatus?: TestExecutionStatus;
  testSetId?: string;
  testSetName?: string;
  target?: TestExecutionTarget;
  apiMode?: TestExecutionApiMode;
  testExecutionModality?: TestExecutionModality;
  failureReasons?: string[];
}
export const DescribeTestExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testExecutionId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    testExecutionStatus: S.optional(TestExecutionStatus),
    testSetId: S.optional(S.String),
    testSetName: S.optional(S.String),
    target: S.optional(TestExecutionTarget),
    apiMode: S.optional(TestExecutionApiMode),
    testExecutionModality: S.optional(TestExecutionModality),
    failureReasons: S.optional(FailureReasons),
  }),
).annotate({
  identifier: "DescribeTestExecutionResponse",
}) as any as S.Schema<DescribeTestExecutionResponse>;
export interface DescribeTestSetRequest {
  testSetId: string;
}
export const DescribeTestSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ testSetId: S.String.pipe(T.HttpLabel("testSetId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/testsets/{testSetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTestSetRequest",
}) as any as S.Schema<DescribeTestSetRequest>;
export type TestSetStatus =
  | "Importing"
  | "PendingAnnotation"
  | "Deleting"
  | "ValidationError"
  | "Ready"
  | (string & {});
export const TestSetStatus = S.String;

export interface DescribeTestSetResponse {
  testSetId?: string;
  testSetName?: string;
  description?: string;
  modality?: TestSetModality;
  status?: TestSetStatus;
  roleArn?: string;
  numTurns?: number;
  storageLocation?: TestSetStorageLocation;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const DescribeTestSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSetId: S.optional(S.String),
    testSetName: S.optional(S.String),
    description: S.optional(S.String),
    modality: S.optional(TestSetModality),
    status: S.optional(TestSetStatus),
    roleArn: S.optional(S.String),
    numTurns: S.optional(S.Number),
    storageLocation: S.optional(TestSetStorageLocation),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeTestSetResponse",
}) as any as S.Schema<DescribeTestSetResponse>;
export interface DescribeTestSetDiscrepancyReportRequest {
  testSetDiscrepancyReportId: string;
}
export const DescribeTestSetDiscrepancyReportRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      testSetDiscrepancyReportId: S.String.pipe(
        T.HttpLabel("testSetDiscrepancyReportId"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/testsetdiscrepancy/{testSetDiscrepancyReportId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeTestSetDiscrepancyReportRequest",
}) as any as S.Schema<DescribeTestSetDiscrepancyReportRequest>;
export type TestSetDiscrepancyReportStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | (string & {});
export const TestSetDiscrepancyReportStatus = S.String;

export interface TestSetIntentDiscrepancyItem {
  intentName: string;
  errorMessage: string;
}
export const TestSetIntentDiscrepancyItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ intentName: S.String, errorMessage: S.String }),
).annotate({
  identifier: "TestSetIntentDiscrepancyItem",
}) as any as S.Schema<TestSetIntentDiscrepancyItem>;
export type TestSetIntentDiscrepancyList = TestSetIntentDiscrepancyItem[];
export const TestSetIntentDiscrepancyList = /*@__PURE__*/ S.Array(
  TestSetIntentDiscrepancyItem,
);
export interface TestSetSlotDiscrepancyItem {
  intentName: string;
  slotName: string;
  errorMessage: string;
}
export const TestSetSlotDiscrepancyItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentName: S.String,
    slotName: S.String,
    errorMessage: S.String,
  }),
).annotate({
  identifier: "TestSetSlotDiscrepancyItem",
}) as any as S.Schema<TestSetSlotDiscrepancyItem>;
export type TestSetSlotDiscrepancyList = TestSetSlotDiscrepancyItem[];
export const TestSetSlotDiscrepancyList = /*@__PURE__*/ S.Array(
  TestSetSlotDiscrepancyItem,
);
export interface TestSetDiscrepancyErrors {
  intentDiscrepancies: TestSetIntentDiscrepancyItem[];
  slotDiscrepancies: TestSetSlotDiscrepancyItem[];
}
export const TestSetDiscrepancyErrors = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentDiscrepancies: TestSetIntentDiscrepancyList,
    slotDiscrepancies: TestSetSlotDiscrepancyList,
  }),
).annotate({
  identifier: "TestSetDiscrepancyErrors",
}) as any as S.Schema<TestSetDiscrepancyErrors>;
export interface DescribeTestSetDiscrepancyReportResponse {
  testSetDiscrepancyReportId?: string;
  testSetId?: string;
  creationDateTime?: Date;
  target?: TestSetDiscrepancyReportResourceTarget;
  testSetDiscrepancyReportStatus?: TestSetDiscrepancyReportStatus;
  lastUpdatedDataTime?: Date;
  testSetDiscrepancyTopErrors?: TestSetDiscrepancyErrors;
  testSetDiscrepancyRawOutputUrl?: string;
  failureReasons?: string[];
}
export const DescribeTestSetDiscrepancyReportResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      testSetDiscrepancyReportId: S.optional(S.String),
      testSetId: S.optional(S.String),
      creationDateTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      target: S.optional(TestSetDiscrepancyReportResourceTarget),
      testSetDiscrepancyReportStatus: S.optional(
        TestSetDiscrepancyReportStatus,
      ),
      lastUpdatedDataTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      testSetDiscrepancyTopErrors: S.optional(TestSetDiscrepancyErrors),
      testSetDiscrepancyRawOutputUrl: S.optional(S.String),
      failureReasons: S.optional(FailureReasons),
    }),
).annotate({
  identifier: "DescribeTestSetDiscrepancyReportResponse",
}) as any as S.Schema<DescribeTestSetDiscrepancyReportResponse>;
export interface DescribeTestSetGenerationRequest {
  testSetGenerationId: string;
}
export const DescribeTestSetGenerationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSetGenerationId: S.String.pipe(T.HttpLabel("testSetGenerationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/testsetgenerations/{testSetGenerationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTestSetGenerationRequest",
}) as any as S.Schema<DescribeTestSetGenerationRequest>;
export type TestSetGenerationStatus =
  | "Generating"
  | "Ready"
  | "Failed"
  | "Pending"
  | (string & {});
export const TestSetGenerationStatus = S.String;

export type ConversationLogsInputModeFilter = "Speech" | "Text" | (string & {});
export const ConversationLogsInputModeFilter = S.String;

export interface ConversationLogsDataSourceFilterBy {
  startTime: Date;
  endTime: Date;
  inputMode: ConversationLogsInputModeFilter;
}
export const ConversationLogsDataSourceFilterBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    inputMode: ConversationLogsInputModeFilter,
  }),
).annotate({
  identifier: "ConversationLogsDataSourceFilterBy",
}) as any as S.Schema<ConversationLogsDataSourceFilterBy>;
export interface ConversationLogsDataSource {
  botId: string;
  botAliasId: string;
  localeId: string;
  filter: ConversationLogsDataSourceFilterBy;
}
export const ConversationLogsDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String,
    botAliasId: S.String,
    localeId: S.String,
    filter: ConversationLogsDataSourceFilterBy,
  }),
).annotate({
  identifier: "ConversationLogsDataSource",
}) as any as S.Schema<ConversationLogsDataSource>;
export interface TestSetGenerationDataSource {
  conversationLogsDataSource?: ConversationLogsDataSource;
}
export const TestSetGenerationDataSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conversationLogsDataSource: S.optional(ConversationLogsDataSource),
  }),
).annotate({
  identifier: "TestSetGenerationDataSource",
}) as any as S.Schema<TestSetGenerationDataSource>;
export interface DescribeTestSetGenerationResponse {
  testSetGenerationId?: string;
  testSetGenerationStatus?: TestSetGenerationStatus;
  failureReasons?: string[];
  testSetId?: string;
  testSetName?: string;
  description?: string;
  storageLocation?: TestSetStorageLocation;
  generationDataSource?: TestSetGenerationDataSource;
  roleArn?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const DescribeTestSetGenerationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSetGenerationId: S.optional(S.String),
    testSetGenerationStatus: S.optional(TestSetGenerationStatus),
    failureReasons: S.optional(FailureReasons),
    testSetId: S.optional(S.String),
    testSetName: S.optional(S.String),
    description: S.optional(S.String),
    storageLocation: S.optional(TestSetStorageLocation),
    generationDataSource: S.optional(TestSetGenerationDataSource),
    roleArn: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "DescribeTestSetGenerationResponse",
}) as any as S.Schema<DescribeTestSetGenerationResponse>;
export interface GenerateBotElementRequest {
  intentId: string;
  botId: string;
  botVersion: string;
  localeId: string;
}
export const GenerateBotElementRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentId: S.String,
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/generate",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GenerateBotElementRequest",
}) as any as S.Schema<GenerateBotElementRequest>;
export interface GenerateBotElementResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  intentId?: string;
  sampleUtterances?: SampleUtterance[];
}
export const GenerateBotElementResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    intentId: S.optional(S.String),
    sampleUtterances: S.optional(SampleUtterancesList),
  }),
).annotate({
  identifier: "GenerateBotElementResponse",
}) as any as S.Schema<GenerateBotElementResponse>;
export interface GetTestExecutionArtifactsUrlRequest {
  testExecutionId: string;
}
export const GetTestExecutionArtifactsUrlRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testExecutionId: S.String.pipe(T.HttpLabel("testExecutionId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/testexecutions/{testExecutionId}/artifacturl",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTestExecutionArtifactsUrlRequest",
}) as any as S.Schema<GetTestExecutionArtifactsUrlRequest>;
export interface GetTestExecutionArtifactsUrlResponse {
  testExecutionId?: string;
  downloadArtifactsUrl?: string;
}
export const GetTestExecutionArtifactsUrlResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      testExecutionId: S.optional(S.String),
      downloadArtifactsUrl: S.optional(S.String),
    }),
).annotate({
  identifier: "GetTestExecutionArtifactsUrlResponse",
}) as any as S.Schema<GetTestExecutionArtifactsUrlResponse>;
export type TimeDimension = "Hours" | "Days" | "Weeks" | (string & {});
export const TimeDimension = S.String;

export type TimeValue = number;
export interface RelativeAggregationDuration {
  timeDimension: TimeDimension;
  timeValue: number;
}
export const RelativeAggregationDuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ timeDimension: TimeDimension, timeValue: S.Number }),
).annotate({
  identifier: "RelativeAggregationDuration",
}) as any as S.Schema<RelativeAggregationDuration>;
export interface UtteranceAggregationDuration {
  relativeAggregationDuration: RelativeAggregationDuration;
}
export const UtteranceAggregationDuration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ relativeAggregationDuration: RelativeAggregationDuration }),
).annotate({
  identifier: "UtteranceAggregationDuration",
}) as any as S.Schema<UtteranceAggregationDuration>;
export type AggregatedUtterancesSortAttribute =
  | "HitCount"
  | "MissedCount"
  | (string & {});
export const AggregatedUtterancesSortAttribute = S.String;

export type SortOrder = "Ascending" | "Descending" | (string & {});
export const SortOrder = S.String;

export interface AggregatedUtterancesSortBy {
  attribute: AggregatedUtterancesSortAttribute;
  order: SortOrder;
}
export const AggregatedUtterancesSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: AggregatedUtterancesSortAttribute, order: SortOrder }),
).annotate({
  identifier: "AggregatedUtterancesSortBy",
}) as any as S.Schema<AggregatedUtterancesSortBy>;
export type AggregatedUtterancesFilterName = "Utterance" | (string & {});
export const AggregatedUtterancesFilterName = S.String;

export type FilterValue = string;
export type FilterValues = string[];
export const FilterValues = /*@__PURE__*/ S.Array(S.String);
export type AggregatedUtterancesFilterOperator = "CO" | "EQ" | (string & {});
export const AggregatedUtterancesFilterOperator = S.String;

export interface AggregatedUtterancesFilter {
  name: AggregatedUtterancesFilterName;
  values: string[];
  operator: AggregatedUtterancesFilterOperator;
}
export const AggregatedUtterancesFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: AggregatedUtterancesFilterName,
    values: FilterValues,
    operator: AggregatedUtterancesFilterOperator,
  }),
).annotate({
  identifier: "AggregatedUtterancesFilter",
}) as any as S.Schema<AggregatedUtterancesFilter>;
export type AggregatedUtterancesFilters = AggregatedUtterancesFilter[];
export const AggregatedUtterancesFilters = /*@__PURE__*/ S.Array(
  AggregatedUtterancesFilter,
);
export interface ListAggregatedUtterancesRequest {
  botId: string;
  botAliasId?: string;
  botVersion?: string;
  localeId: string;
  aggregationDuration: UtteranceAggregationDuration;
  sortBy?: AggregatedUtterancesSortBy;
  filters?: AggregatedUtterancesFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListAggregatedUtterancesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botAliasId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.String,
    aggregationDuration: UtteranceAggregationDuration,
    sortBy: S.optional(AggregatedUtterancesSortBy),
    filters: S.optional(AggregatedUtterancesFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots/{botId}/aggregatedutterances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAggregatedUtterancesRequest",
}) as any as S.Schema<ListAggregatedUtterancesRequest>;
export type HitCount = number;
export type MissedCount = number;
export interface AggregatedUtterancesSummary {
  utterance?: string;
  hitCount?: number;
  missedCount?: number;
  utteranceFirstRecordedInAggregationDuration?: Date;
  utteranceLastRecordedInAggregationDuration?: Date;
  containsDataFromDeletedResources?: boolean;
}
export const AggregatedUtterancesSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    utterance: S.optional(S.String),
    hitCount: S.optional(S.Number),
    missedCount: S.optional(S.Number),
    utteranceFirstRecordedInAggregationDuration: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    utteranceLastRecordedInAggregationDuration: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    containsDataFromDeletedResources: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "AggregatedUtterancesSummary",
}) as any as S.Schema<AggregatedUtterancesSummary>;
export type AggregatedUtterancesSummaryList = AggregatedUtterancesSummary[];
export const AggregatedUtterancesSummaryList = /*@__PURE__*/ S.Array(
  AggregatedUtterancesSummary,
);
export interface ListAggregatedUtterancesResponse {
  botId?: string;
  botAliasId?: string;
  botVersion?: string;
  localeId?: string;
  aggregationDuration?: UtteranceAggregationDuration;
  aggregationWindowStartTime?: Date;
  aggregationWindowEndTime?: Date;
  aggregationLastRefreshedDateTime?: Date;
  aggregatedUtterancesSummaries?: AggregatedUtterancesSummary[];
  nextToken?: string;
}
export const ListAggregatedUtterancesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botAliasId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    aggregationDuration: S.optional(UtteranceAggregationDuration),
    aggregationWindowStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    aggregationWindowEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    aggregationLastRefreshedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    aggregatedUtterancesSummaries: S.optional(AggregatedUtterancesSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAggregatedUtterancesResponse",
}) as any as S.Schema<ListAggregatedUtterancesResponse>;
export interface ListBotAliasesRequest {
  botId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListBotAliasesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots/{botId}/botaliases" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBotAliasesRequest",
}) as any as S.Schema<ListBotAliasesRequest>;
export interface BotAliasSummary {
  botAliasId?: string;
  botAliasName?: string;
  description?: string;
  botVersion?: string;
  botAliasStatus?: BotAliasStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const BotAliasSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasId: S.optional(S.String),
    botAliasName: S.optional(S.String),
    description: S.optional(S.String),
    botVersion: S.optional(S.String),
    botAliasStatus: S.optional(BotAliasStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "BotAliasSummary",
}) as any as S.Schema<BotAliasSummary>;
export type BotAliasSummaryList = BotAliasSummary[];
export const BotAliasSummaryList = /*@__PURE__*/ S.Array(BotAliasSummary);
export interface ListBotAliasesResponse {
  botAliasSummaries?: BotAliasSummary[];
  nextToken?: string;
  botId?: string;
}
export const ListBotAliasesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasSummaries: S.optional(BotAliasSummaryList),
    nextToken: S.optional(S.String),
    botId: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBotAliasesResponse",
}) as any as S.Schema<ListBotAliasesResponse>;
export interface ListBotAliasReplicasRequest {
  botId: string;
  replicaRegion: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListBotAliasReplicasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    replicaRegion: S.String.pipe(T.HttpLabel("replicaRegion")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/replicas/{replicaRegion}/botaliases",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBotAliasReplicasRequest",
}) as any as S.Schema<ListBotAliasReplicasRequest>;
export type BotAliasReplicationStatus =
  | "Creating"
  | "Updating"
  | "Available"
  | "Deleting"
  | "Failed"
  | (string & {});
export const BotAliasReplicationStatus = S.String;

export interface BotAliasReplicaSummary {
  botAliasId?: string;
  botAliasReplicationStatus?: BotAliasReplicationStatus;
  botVersion?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  failureReasons?: string[];
}
export const BotAliasReplicaSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasId: S.optional(S.String),
    botAliasReplicationStatus: S.optional(BotAliasReplicationStatus),
    botVersion: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReasons: S.optional(FailureReasons),
  }),
).annotate({
  identifier: "BotAliasReplicaSummary",
}) as any as S.Schema<BotAliasReplicaSummary>;
export type BotAliasReplicaSummaryList = BotAliasReplicaSummary[];
export const BotAliasReplicaSummaryList = /*@__PURE__*/ S.Array(
  BotAliasReplicaSummary,
);
export interface ListBotAliasReplicasResponse {
  botId?: string;
  sourceRegion?: string;
  replicaRegion?: string;
  botAliasReplicaSummaries?: BotAliasReplicaSummary[];
  nextToken?: string;
}
export const ListBotAliasReplicasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    sourceRegion: S.optional(S.String),
    replicaRegion: S.optional(S.String),
    botAliasReplicaSummaries: S.optional(BotAliasReplicaSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBotAliasReplicasResponse",
}) as any as S.Schema<ListBotAliasReplicasResponse>;
export interface ListBotAnalyzerHistoryRequest {
  botId: string;
  localeId?: string;
  botVersion?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListBotAnalyzerHistoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    localeId: S.optional(S.String),
    botVersion: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots/{botId}/botanalyzer/history" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBotAnalyzerHistoryRequest",
}) as any as S.Schema<ListBotAnalyzerHistoryRequest>;
export interface BotAnalyzerHistorySummary {
  botAnalyzerStatus: BotAnalyzerStatus;
  creationDateTime?: Date;
  botAnalyzerRequestId: string;
}
export const BotAnalyzerHistorySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAnalyzerStatus: BotAnalyzerStatus,
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    botAnalyzerRequestId: S.String,
  }),
).annotate({
  identifier: "BotAnalyzerHistorySummary",
}) as any as S.Schema<BotAnalyzerHistorySummary>;
export type BotAnalyzerHistoryList = BotAnalyzerHistorySummary[];
export const BotAnalyzerHistoryList = /*@__PURE__*/ S.Array(
  BotAnalyzerHistorySummary,
);
export interface ListBotAnalyzerHistoryResponse {
  botId?: string;
  localeId?: string;
  botVersion?: string;
  botAnalyzerHistoryList?: BotAnalyzerHistorySummary[];
  nextToken?: string;
}
export const ListBotAnalyzerHistoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    localeId: S.optional(S.String),
    botVersion: S.optional(S.String),
    botAnalyzerHistoryList: S.optional(BotAnalyzerHistoryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBotAnalyzerHistoryResponse",
}) as any as S.Schema<ListBotAnalyzerHistoryResponse>;
export type BotLocaleSortAttribute = "BotLocaleName" | (string & {});
export const BotLocaleSortAttribute = S.String;

export interface BotLocaleSortBy {
  attribute: BotLocaleSortAttribute;
  order: SortOrder;
}
export const BotLocaleSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: BotLocaleSortAttribute, order: SortOrder }),
).annotate({
  identifier: "BotLocaleSortBy",
}) as any as S.Schema<BotLocaleSortBy>;
export type BotLocaleFilterName = "BotLocaleName" | (string & {});
export const BotLocaleFilterName = S.String;

export type BotLocaleFilterOperator = "CO" | "EQ" | (string & {});
export const BotLocaleFilterOperator = S.String;

export interface BotLocaleFilter {
  name: BotLocaleFilterName;
  values: string[];
  operator: BotLocaleFilterOperator;
}
export const BotLocaleFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: BotLocaleFilterName,
    values: FilterValues,
    operator: BotLocaleFilterOperator,
  }),
).annotate({
  identifier: "BotLocaleFilter",
}) as any as S.Schema<BotLocaleFilter>;
export type BotLocaleFilters = BotLocaleFilter[];
export const BotLocaleFilters = /*@__PURE__*/ S.Array(BotLocaleFilter);
export interface ListBotLocalesRequest {
  botId: string;
  botVersion: string;
  sortBy?: BotLocaleSortBy;
  filters?: BotLocaleFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListBotLocalesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    sortBy: S.optional(BotLocaleSortBy),
    filters: S.optional(BotLocaleFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBotLocalesRequest",
}) as any as S.Schema<ListBotLocalesRequest>;
export interface BotLocaleSummary {
  localeId?: string;
  localeName?: string;
  description?: string;
  botLocaleStatus?: BotLocaleStatus;
  lastUpdatedDateTime?: Date;
  lastBuildSubmittedDateTime?: Date;
}
export const BotLocaleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    localeId: S.optional(S.String),
    localeName: S.optional(S.String),
    description: S.optional(S.String),
    botLocaleStatus: S.optional(BotLocaleStatus),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastBuildSubmittedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "BotLocaleSummary",
}) as any as S.Schema<BotLocaleSummary>;
export type BotLocaleSummaryList = BotLocaleSummary[];
export const BotLocaleSummaryList = /*@__PURE__*/ S.Array(BotLocaleSummary);
export interface ListBotLocalesResponse {
  botId?: string;
  botVersion?: string;
  nextToken?: string;
  botLocaleSummaries?: BotLocaleSummary[];
}
export const ListBotLocalesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    nextToken: S.optional(S.String),
    botLocaleSummaries: S.optional(BotLocaleSummaryList),
  }),
).annotate({
  identifier: "ListBotLocalesResponse",
}) as any as S.Schema<ListBotLocalesResponse>;
export interface ListBotRecommendationsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListBotRecommendationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBotRecommendationsRequest",
}) as any as S.Schema<ListBotRecommendationsRequest>;
export interface BotRecommendationSummary {
  botRecommendationStatus: BotRecommendationStatus;
  botRecommendationId: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const BotRecommendationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botRecommendationStatus: BotRecommendationStatus,
    botRecommendationId: S.String,
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "BotRecommendationSummary",
}) as any as S.Schema<BotRecommendationSummary>;
export type BotRecommendationSummaryList = BotRecommendationSummary[];
export const BotRecommendationSummaryList = /*@__PURE__*/ S.Array(
  BotRecommendationSummary,
);
export interface ListBotRecommendationsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationSummaries?: BotRecommendationSummary[];
  nextToken?: string;
}
export const ListBotRecommendationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    botRecommendationSummaries: S.optional(BotRecommendationSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBotRecommendationsResponse",
}) as any as S.Schema<ListBotRecommendationsResponse>;
export interface ListBotReplicasRequest {
  botId: string;
}
export const ListBotReplicasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ botId: S.String.pipe(T.HttpLabel("botId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots/{botId}/replicas" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBotReplicasRequest",
}) as any as S.Schema<ListBotReplicasRequest>;
export interface BotReplicaSummary {
  replicaRegion?: string;
  creationDateTime?: Date;
  botReplicaStatus?: BotReplicaStatus;
  failureReasons?: string[];
}
export const BotReplicaSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    replicaRegion: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    botReplicaStatus: S.optional(BotReplicaStatus),
    failureReasons: S.optional(FailureReasons),
  }),
).annotate({
  identifier: "BotReplicaSummary",
}) as any as S.Schema<BotReplicaSummary>;
export type BotReplicaSummaryList = BotReplicaSummary[];
export const BotReplicaSummaryList = /*@__PURE__*/ S.Array(BotReplicaSummary);
export interface ListBotReplicasResponse {
  botId?: string;
  sourceRegion?: string;
  botReplicaSummaries?: BotReplicaSummary[];
}
export const ListBotReplicasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    sourceRegion: S.optional(S.String),
    botReplicaSummaries: S.optional(BotReplicaSummaryList),
  }),
).annotate({
  identifier: "ListBotReplicasResponse",
}) as any as S.Schema<ListBotReplicasResponse>;
export type GenerationSortByAttribute =
  | "creationStartTime"
  | "lastUpdatedTime"
  | (string & {});
export const GenerationSortByAttribute = S.String;

export interface GenerationSortBy {
  attribute: GenerationSortByAttribute;
  order: SortOrder;
}
export const GenerationSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: GenerationSortByAttribute, order: SortOrder }),
).annotate({
  identifier: "GenerationSortBy",
}) as any as S.Schema<GenerationSortBy>;
export interface ListBotResourceGenerationsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  sortBy?: GenerationSortBy;
  maxResults?: number;
  nextToken?: string;
}
export const ListBotResourceGenerationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    sortBy: S.optional(GenerationSortBy),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/generations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBotResourceGenerationsRequest",
}) as any as S.Schema<ListBotResourceGenerationsRequest>;
export interface GenerationSummary {
  generationId?: string;
  generationStatus?: GenerationStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const GenerationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    generationId: S.optional(S.String),
    generationStatus: S.optional(GenerationStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "GenerationSummary",
}) as any as S.Schema<GenerationSummary>;
export type GenerationSummaryList = GenerationSummary[];
export const GenerationSummaryList = /*@__PURE__*/ S.Array(GenerationSummary);
export interface ListBotResourceGenerationsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  generationSummaries?: GenerationSummary[];
  nextToken?: string;
}
export const ListBotResourceGenerationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    generationSummaries: S.optional(GenerationSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBotResourceGenerationsResponse",
}) as any as S.Schema<ListBotResourceGenerationsResponse>;
export type BotSortAttribute = "BotName" | (string & {});
export const BotSortAttribute = S.String;

export interface BotSortBy {
  attribute: BotSortAttribute;
  order: SortOrder;
}
export const BotSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: BotSortAttribute, order: SortOrder }),
).annotate({ identifier: "BotSortBy" }) as any as S.Schema<BotSortBy>;
export type BotFilterName = "BotName" | "BotType" | (string & {});
export const BotFilterName = S.String;

export type BotFilterOperator = "CO" | "EQ" | "NE" | (string & {});
export const BotFilterOperator = S.String;

export interface BotFilter {
  name: BotFilterName;
  values: string[];
  operator: BotFilterOperator;
}
export const BotFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: BotFilterName,
    values: FilterValues,
    operator: BotFilterOperator,
  }),
).annotate({ identifier: "BotFilter" }) as any as S.Schema<BotFilter>;
export type BotFilters = BotFilter[];
export const BotFilters = /*@__PURE__*/ S.Array(BotFilter);
export interface ListBotsRequest {
  sortBy?: BotSortBy;
  filters?: BotFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListBotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sortBy: S.optional(BotSortBy),
    filters: S.optional(BotFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBotsRequest",
}) as any as S.Schema<ListBotsRequest>;
export interface BotSummary {
  botId?: string;
  botName?: string;
  description?: string;
  botStatus?: BotStatus;
  latestBotVersion?: string;
  lastUpdatedDateTime?: Date;
  botType?: BotType;
}
export const BotSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botName: S.optional(S.String),
    description: S.optional(S.String),
    botStatus: S.optional(BotStatus),
    latestBotVersion: S.optional(S.String),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    botType: S.optional(BotType),
  }),
).annotate({ identifier: "BotSummary" }) as any as S.Schema<BotSummary>;
export type BotSummaryList = BotSummary[];
export const BotSummaryList = /*@__PURE__*/ S.Array(BotSummary);
export interface ListBotsResponse {
  botSummaries?: BotSummary[];
  nextToken?: string;
}
export const ListBotsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botSummaries: S.optional(BotSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBotsResponse",
}) as any as S.Schema<ListBotsResponse>;
export type BotVersionReplicaSortAttribute = "BotVersion" | (string & {});
export const BotVersionReplicaSortAttribute = S.String;

export interface BotVersionReplicaSortBy {
  attribute: BotVersionReplicaSortAttribute;
  order: SortOrder;
}
export const BotVersionReplicaSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: BotVersionReplicaSortAttribute, order: SortOrder }),
).annotate({
  identifier: "BotVersionReplicaSortBy",
}) as any as S.Schema<BotVersionReplicaSortBy>;
export interface ListBotVersionReplicasRequest {
  botId: string;
  replicaRegion: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: BotVersionReplicaSortBy;
}
export const ListBotVersionReplicasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    replicaRegion: S.String.pipe(T.HttpLabel("replicaRegion")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    sortBy: S.optional(BotVersionReplicaSortBy),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/replicas/{replicaRegion}/botversions",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBotVersionReplicasRequest",
}) as any as S.Schema<ListBotVersionReplicasRequest>;
export type BotVersionReplicationStatus =
  | "Creating"
  | "Available"
  | "Deleting"
  | "Failed"
  | (string & {});
export const BotVersionReplicationStatus = S.String;

export interface BotVersionReplicaSummary {
  botVersion?: string;
  botVersionReplicationStatus?: BotVersionReplicationStatus;
  creationDateTime?: Date;
  failureReasons?: string[];
}
export const BotVersionReplicaSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botVersion: S.optional(S.String),
    botVersionReplicationStatus: S.optional(BotVersionReplicationStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    failureReasons: S.optional(FailureReasons),
  }),
).annotate({
  identifier: "BotVersionReplicaSummary",
}) as any as S.Schema<BotVersionReplicaSummary>;
export type BotVersionReplicaSummaryList = BotVersionReplicaSummary[];
export const BotVersionReplicaSummaryList = /*@__PURE__*/ S.Array(
  BotVersionReplicaSummary,
);
export interface ListBotVersionReplicasResponse {
  botId?: string;
  sourceRegion?: string;
  replicaRegion?: string;
  botVersionReplicaSummaries?: BotVersionReplicaSummary[];
  nextToken?: string;
}
export const ListBotVersionReplicasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    sourceRegion: S.optional(S.String),
    replicaRegion: S.optional(S.String),
    botVersionReplicaSummaries: S.optional(BotVersionReplicaSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBotVersionReplicasResponse",
}) as any as S.Schema<ListBotVersionReplicasResponse>;
export type BotVersionSortAttribute = "BotVersion" | (string & {});
export const BotVersionSortAttribute = S.String;

export interface BotVersionSortBy {
  attribute: BotVersionSortAttribute;
  order: SortOrder;
}
export const BotVersionSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: BotVersionSortAttribute, order: SortOrder }),
).annotate({
  identifier: "BotVersionSortBy",
}) as any as S.Schema<BotVersionSortBy>;
export interface ListBotVersionsRequest {
  botId: string;
  sortBy?: BotVersionSortBy;
  maxResults?: number;
  nextToken?: string;
}
export const ListBotVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    sortBy: S.optional(BotVersionSortBy),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots/{botId}/botversions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBotVersionsRequest",
}) as any as S.Schema<ListBotVersionsRequest>;
export interface BotVersionSummary {
  botName?: string;
  botVersion?: string;
  description?: string;
  botStatus?: BotStatus;
  creationDateTime?: Date;
}
export const BotVersionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botName: S.optional(S.String),
    botVersion: S.optional(S.String),
    description: S.optional(S.String),
    botStatus: S.optional(BotStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "BotVersionSummary",
}) as any as S.Schema<BotVersionSummary>;
export type BotVersionSummaryList = BotVersionSummary[];
export const BotVersionSummaryList = /*@__PURE__*/ S.Array(BotVersionSummary);
export interface ListBotVersionsResponse {
  botId?: string;
  botVersionSummaries?: BotVersionSummary[];
  nextToken?: string;
}
export const ListBotVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersionSummaries: S.optional(BotVersionSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBotVersionsResponse",
}) as any as S.Schema<ListBotVersionsResponse>;
export type BuiltInIntentSortAttribute = "IntentSignature" | (string & {});
export const BuiltInIntentSortAttribute = S.String;

export interface BuiltInIntentSortBy {
  attribute: BuiltInIntentSortAttribute;
  order: SortOrder;
}
export const BuiltInIntentSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: BuiltInIntentSortAttribute, order: SortOrder }),
).annotate({
  identifier: "BuiltInIntentSortBy",
}) as any as S.Schema<BuiltInIntentSortBy>;
export type BuiltInsMaxResults = number;
export interface ListBuiltInIntentsRequest {
  localeId: string;
  sortBy?: BuiltInIntentSortBy;
  maxResults?: number;
  nextToken?: string;
}
export const ListBuiltInIntentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    sortBy: S.optional(BuiltInIntentSortBy),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/builtins/locales/{localeId}/intents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBuiltInIntentsRequest",
}) as any as S.Schema<ListBuiltInIntentsRequest>;
export interface BuiltInIntentSummary {
  intentSignature?: string;
  description?: string;
}
export const BuiltInIntentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentSignature: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "BuiltInIntentSummary",
}) as any as S.Schema<BuiltInIntentSummary>;
export type BuiltInIntentSummaryList = BuiltInIntentSummary[];
export const BuiltInIntentSummaryList =
  /*@__PURE__*/ S.Array(BuiltInIntentSummary);
export interface ListBuiltInIntentsResponse {
  builtInIntentSummaries?: BuiltInIntentSummary[];
  nextToken?: string;
  localeId?: string;
}
export const ListBuiltInIntentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    builtInIntentSummaries: S.optional(BuiltInIntentSummaryList),
    nextToken: S.optional(S.String),
    localeId: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBuiltInIntentsResponse",
}) as any as S.Schema<ListBuiltInIntentsResponse>;
export type BuiltInSlotTypeSortAttribute = "SlotTypeSignature" | (string & {});
export const BuiltInSlotTypeSortAttribute = S.String;

export interface BuiltInSlotTypeSortBy {
  attribute: BuiltInSlotTypeSortAttribute;
  order: SortOrder;
}
export const BuiltInSlotTypeSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: BuiltInSlotTypeSortAttribute, order: SortOrder }),
).annotate({
  identifier: "BuiltInSlotTypeSortBy",
}) as any as S.Schema<BuiltInSlotTypeSortBy>;
export interface ListBuiltInSlotTypesRequest {
  localeId: string;
  sortBy?: BuiltInSlotTypeSortBy;
  maxResults?: number;
  nextToken?: string;
}
export const ListBuiltInSlotTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    sortBy: S.optional(BuiltInSlotTypeSortBy),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/builtins/locales/{localeId}/slottypes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListBuiltInSlotTypesRequest",
}) as any as S.Schema<ListBuiltInSlotTypesRequest>;
export interface BuiltInSlotTypeSummary {
  slotTypeSignature?: string;
  description?: string;
}
export const BuiltInSlotTypeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypeSignature: S.optional(S.String),
    description: S.optional(S.String),
  }),
).annotate({
  identifier: "BuiltInSlotTypeSummary",
}) as any as S.Schema<BuiltInSlotTypeSummary>;
export type BuiltInSlotTypeSummaryList = BuiltInSlotTypeSummary[];
export const BuiltInSlotTypeSummaryList = /*@__PURE__*/ S.Array(
  BuiltInSlotTypeSummary,
);
export interface ListBuiltInSlotTypesResponse {
  builtInSlotTypeSummaries?: BuiltInSlotTypeSummary[];
  nextToken?: string;
  localeId?: string;
}
export const ListBuiltInSlotTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    builtInSlotTypeSummaries: S.optional(BuiltInSlotTypeSummaryList),
    nextToken: S.optional(S.String),
    localeId: S.optional(S.String),
  }),
).annotate({
  identifier: "ListBuiltInSlotTypesResponse",
}) as any as S.Schema<ListBuiltInSlotTypesResponse>;
export interface ListCustomVocabularyItemsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListCustomVocabularyItemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/customvocabulary/DEFAULT/list",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCustomVocabularyItemsRequest",
}) as any as S.Schema<ListCustomVocabularyItemsRequest>;
export interface ListCustomVocabularyItemsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  customVocabularyItems?: CustomVocabularyItem[];
  nextToken?: string;
}
export const ListCustomVocabularyItemsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    customVocabularyItems: S.optional(CustomVocabularyItems),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCustomVocabularyItemsResponse",
}) as any as S.Schema<ListCustomVocabularyItemsResponse>;
export type ExportSortAttribute = "LastUpdatedDateTime" | (string & {});
export const ExportSortAttribute = S.String;

export interface ExportSortBy {
  attribute: ExportSortAttribute;
  order: SortOrder;
}
export const ExportSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: ExportSortAttribute, order: SortOrder }),
).annotate({ identifier: "ExportSortBy" }) as any as S.Schema<ExportSortBy>;
export type ExportFilterName = "ExportResourceType" | (string & {});
export const ExportFilterName = S.String;

export type ExportFilterOperator = "CO" | "EQ" | (string & {});
export const ExportFilterOperator = S.String;

export interface ExportFilter {
  name: ExportFilterName;
  values: string[];
  operator: ExportFilterOperator;
}
export const ExportFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: ExportFilterName,
    values: FilterValues,
    operator: ExportFilterOperator,
  }),
).annotate({ identifier: "ExportFilter" }) as any as S.Schema<ExportFilter>;
export type ExportFilters = ExportFilter[];
export const ExportFilters = /*@__PURE__*/ S.Array(ExportFilter);
export interface ListExportsRequest {
  botId?: string;
  botVersion?: string;
  sortBy?: ExportSortBy;
  filters?: ExportFilter[];
  maxResults?: number;
  nextToken?: string;
  localeId?: string;
}
export const ListExportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    sortBy: S.optional(ExportSortBy),
    filters: S.optional(ExportFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    localeId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/exports" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExportsRequest",
}) as any as S.Schema<ListExportsRequest>;
export interface ExportSummary {
  exportId?: string;
  resourceSpecification?: ExportResourceSpecification;
  fileFormat?: ImportExportFileFormat;
  exportStatus?: ExportStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const ExportSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportId: S.optional(S.String),
    resourceSpecification: S.optional(ExportResourceSpecification),
    fileFormat: S.optional(ImportExportFileFormat),
    exportStatus: S.optional(ExportStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "ExportSummary" }) as any as S.Schema<ExportSummary>;
export type ExportSummaryList = ExportSummary[];
export const ExportSummaryList = /*@__PURE__*/ S.Array(ExportSummary);
export interface ListExportsResponse {
  botId?: string;
  botVersion?: string;
  exportSummaries?: ExportSummary[];
  nextToken?: string;
  localeId?: string;
}
export const ListExportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    exportSummaries: S.optional(ExportSummaryList),
    nextToken: S.optional(S.String),
    localeId: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExportsResponse",
}) as any as S.Schema<ListExportsResponse>;
export type ImportSortAttribute = "LastUpdatedDateTime" | (string & {});
export const ImportSortAttribute = S.String;

export interface ImportSortBy {
  attribute: ImportSortAttribute;
  order: SortOrder;
}
export const ImportSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: ImportSortAttribute, order: SortOrder }),
).annotate({ identifier: "ImportSortBy" }) as any as S.Schema<ImportSortBy>;
export type ImportFilterName = "ImportResourceType" | (string & {});
export const ImportFilterName = S.String;

export type ImportFilterOperator = "CO" | "EQ" | (string & {});
export const ImportFilterOperator = S.String;

export interface ImportFilter {
  name: ImportFilterName;
  values: string[];
  operator: ImportFilterOperator;
}
export const ImportFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: ImportFilterName,
    values: FilterValues,
    operator: ImportFilterOperator,
  }),
).annotate({ identifier: "ImportFilter" }) as any as S.Schema<ImportFilter>;
export type ImportFilters = ImportFilter[];
export const ImportFilters = /*@__PURE__*/ S.Array(ImportFilter);
export interface ListImportsRequest {
  botId?: string;
  botVersion?: string;
  sortBy?: ImportSortBy;
  filters?: ImportFilter[];
  maxResults?: number;
  nextToken?: string;
  localeId?: string;
}
export const ListImportsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    sortBy: S.optional(ImportSortBy),
    filters: S.optional(ImportFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
    localeId: S.optional(S.String),
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
  identifier: "ListImportsRequest",
}) as any as S.Schema<ListImportsRequest>;
export type ImportResourceType =
  | "Bot"
  | "BotLocale"
  | "CustomVocabulary"
  | "TestSet"
  | (string & {});
export const ImportResourceType = S.String;

export interface ImportSummary {
  importId?: string;
  importedResourceId?: string;
  importedResourceName?: string;
  importStatus?: ImportStatus;
  mergeStrategy?: MergeStrategy;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  importedResourceType?: ImportResourceType;
}
export const ImportSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importId: S.optional(S.String),
    importedResourceId: S.optional(S.String),
    importedResourceName: S.optional(S.String),
    importStatus: S.optional(ImportStatus),
    mergeStrategy: S.optional(MergeStrategy),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    importedResourceType: S.optional(ImportResourceType),
  }),
).annotate({ identifier: "ImportSummary" }) as any as S.Schema<ImportSummary>;
export type ImportSummaryList = ImportSummary[];
export const ImportSummaryList = /*@__PURE__*/ S.Array(ImportSummary);
export interface ListImportsResponse {
  botId?: string;
  botVersion?: string;
  importSummaries?: ImportSummary[];
  nextToken?: string;
  localeId?: string;
}
export const ListImportsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    importSummaries: S.optional(ImportSummaryList),
    nextToken: S.optional(S.String),
    localeId: S.optional(S.String),
  }),
).annotate({
  identifier: "ListImportsResponse",
}) as any as S.Schema<ListImportsResponse>;
export type AnalyticsIntentMetricName =
  | "Count"
  | "Success"
  | "Failure"
  | "Switched"
  | "Dropped"
  | (string & {});
export const AnalyticsIntentMetricName = S.String;

export type AnalyticsMetricStatistic = "Sum" | "Avg" | "Max" | (string & {});
export const AnalyticsMetricStatistic = S.String;

export type AnalyticsSortOrder = "Ascending" | "Descending" | (string & {});
export const AnalyticsSortOrder = S.String;

export interface AnalyticsIntentMetric {
  name: AnalyticsIntentMetricName;
  statistic: AnalyticsMetricStatistic;
  order?: AnalyticsSortOrder;
}
export const AnalyticsIntentMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: AnalyticsIntentMetricName,
    statistic: AnalyticsMetricStatistic,
    order: S.optional(AnalyticsSortOrder),
  }),
).annotate({
  identifier: "AnalyticsIntentMetric",
}) as any as S.Schema<AnalyticsIntentMetric>;
export type AnalyticsIntentMetrics = AnalyticsIntentMetric[];
export const AnalyticsIntentMetrics = /*@__PURE__*/ S.Array(
  AnalyticsIntentMetric,
);
export type AnalyticsBinByName =
  | "ConversationStartTime"
  | "UtteranceTimestamp"
  | (string & {});
export const AnalyticsBinByName = S.String;

export type AnalyticsInterval = "OneHour" | "OneDay" | (string & {});
export const AnalyticsInterval = S.String;

export interface AnalyticsBinBySpecification {
  name: AnalyticsBinByName;
  interval: AnalyticsInterval;
  order?: AnalyticsSortOrder;
}
export const AnalyticsBinBySpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: AnalyticsBinByName,
    interval: AnalyticsInterval,
    order: S.optional(AnalyticsSortOrder),
  }),
).annotate({
  identifier: "AnalyticsBinBySpecification",
}) as any as S.Schema<AnalyticsBinBySpecification>;
export type AnalyticsBinByList = AnalyticsBinBySpecification[];
export const AnalyticsBinByList = /*@__PURE__*/ S.Array(
  AnalyticsBinBySpecification,
);
export type AnalyticsIntentField =
  | "IntentName"
  | "IntentEndState"
  | "IntentLevel"
  | (string & {});
export const AnalyticsIntentField = S.String;

export interface AnalyticsIntentGroupBySpecification {
  name: AnalyticsIntentField;
}
export const AnalyticsIntentGroupBySpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: AnalyticsIntentField }),
).annotate({
  identifier: "AnalyticsIntentGroupBySpecification",
}) as any as S.Schema<AnalyticsIntentGroupBySpecification>;
export type AnalyticsIntentGroupByList = AnalyticsIntentGroupBySpecification[];
export const AnalyticsIntentGroupByList = /*@__PURE__*/ S.Array(
  AnalyticsIntentGroupBySpecification,
);
export type AnalyticsIntentFilterName =
  | "BotAliasId"
  | "BotVersion"
  | "LocaleId"
  | "Modality"
  | "Channel"
  | "SessionId"
  | "OriginatingRequestId"
  | "IntentName"
  | "IntentEndState"
  | (string & {});
export const AnalyticsIntentFilterName = S.String;

export type AnalyticsFilterOperator = "EQ" | "GT" | "LT" | (string & {});
export const AnalyticsFilterOperator = S.String;

export type AnalyticsFilterValue = string;
export type AnalyticsFilterValues = string[];
export const AnalyticsFilterValues = /*@__PURE__*/ S.Array(S.String);
export interface AnalyticsIntentFilter {
  name: AnalyticsIntentFilterName;
  operator: AnalyticsFilterOperator;
  values: string[];
}
export const AnalyticsIntentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: AnalyticsIntentFilterName,
    operator: AnalyticsFilterOperator,
    values: AnalyticsFilterValues,
  }),
).annotate({
  identifier: "AnalyticsIntentFilter",
}) as any as S.Schema<AnalyticsIntentFilter>;
export type AnalyticsIntentFilters = AnalyticsIntentFilter[];
export const AnalyticsIntentFilters = /*@__PURE__*/ S.Array(
  AnalyticsIntentFilter,
);
export interface ListIntentMetricsRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  metrics: AnalyticsIntentMetric[];
  binBy?: AnalyticsBinBySpecification[];
  groupBy?: AnalyticsIntentGroupBySpecification[];
  filters?: AnalyticsIntentFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListIntentMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    startDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    metrics: AnalyticsIntentMetrics,
    binBy: S.optional(AnalyticsBinByList),
    groupBy: S.optional(AnalyticsIntentGroupByList),
    filters: S.optional(AnalyticsIntentFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots/{botId}/analytics/intentmetrics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIntentMetricsRequest",
}) as any as S.Schema<ListIntentMetricsRequest>;
export type AnalyticsBinValue = number;
export interface AnalyticsBinKey {
  name?: AnalyticsBinByName;
  value?: number;
}
export const AnalyticsBinKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(AnalyticsBinByName),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "AnalyticsBinKey",
}) as any as S.Schema<AnalyticsBinKey>;
export type AnalyticsBinKeys = AnalyticsBinKey[];
export const AnalyticsBinKeys = /*@__PURE__*/ S.Array(AnalyticsBinKey);
export type AnalyticsGroupByValue = string;
export interface AnalyticsIntentGroupByKey {
  name?: AnalyticsIntentField;
  value?: string;
}
export const AnalyticsIntentGroupByKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(AnalyticsIntentField),
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "AnalyticsIntentGroupByKey",
}) as any as S.Schema<AnalyticsIntentGroupByKey>;
export type AnalyticsIntentGroupByKeys = AnalyticsIntentGroupByKey[];
export const AnalyticsIntentGroupByKeys = /*@__PURE__*/ S.Array(
  AnalyticsIntentGroupByKey,
);
export type AnalyticsMetricValue = number;
export interface AnalyticsIntentMetricResult {
  name?: AnalyticsIntentMetricName;
  statistic?: AnalyticsMetricStatistic;
  value?: number;
}
export const AnalyticsIntentMetricResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(AnalyticsIntentMetricName),
    statistic: S.optional(AnalyticsMetricStatistic),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "AnalyticsIntentMetricResult",
}) as any as S.Schema<AnalyticsIntentMetricResult>;
export type AnalyticsIntentMetricResults = AnalyticsIntentMetricResult[];
export const AnalyticsIntentMetricResults = /*@__PURE__*/ S.Array(
  AnalyticsIntentMetricResult,
);
export interface AnalyticsIntentResult {
  binKeys?: AnalyticsBinKey[];
  groupByKeys?: AnalyticsIntentGroupByKey[];
  metricsResults?: AnalyticsIntentMetricResult[];
}
export const AnalyticsIntentResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    binKeys: S.optional(AnalyticsBinKeys),
    groupByKeys: S.optional(AnalyticsIntentGroupByKeys),
    metricsResults: S.optional(AnalyticsIntentMetricResults),
  }),
).annotate({
  identifier: "AnalyticsIntentResult",
}) as any as S.Schema<AnalyticsIntentResult>;
export type AnalyticsIntentResults = AnalyticsIntentResult[];
export const AnalyticsIntentResults = /*@__PURE__*/ S.Array(
  AnalyticsIntentResult,
);
export interface ListIntentMetricsResponse {
  botId?: string;
  results?: AnalyticsIntentResult[];
  nextToken?: string;
}
export const ListIntentMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    results: S.optional(AnalyticsIntentResults),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIntentMetricsResponse",
}) as any as S.Schema<ListIntentMetricsResponse>;
export type AnalyticsPath = string;
export type AnalyticsCommonFilterName =
  | "BotAliasId"
  | "BotVersion"
  | "LocaleId"
  | "Modality"
  | "Channel"
  | (string & {});
export const AnalyticsCommonFilterName = S.String;

export interface AnalyticsPathFilter {
  name: AnalyticsCommonFilterName;
  operator: AnalyticsFilterOperator;
  values: string[];
}
export const AnalyticsPathFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: AnalyticsCommonFilterName,
    operator: AnalyticsFilterOperator,
    values: AnalyticsFilterValues,
  }),
).annotate({
  identifier: "AnalyticsPathFilter",
}) as any as S.Schema<AnalyticsPathFilter>;
export type AnalyticsPathFilters = AnalyticsPathFilter[];
export const AnalyticsPathFilters = /*@__PURE__*/ S.Array(AnalyticsPathFilter);
export interface ListIntentPathsRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  intentPath: string;
  filters?: AnalyticsPathFilter[];
}
export const ListIntentPathsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    startDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    intentPath: S.String,
    filters: S.optional(AnalyticsPathFilters),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots/{botId}/analytics/intentpaths" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIntentPathsRequest",
}) as any as S.Schema<ListIntentPathsRequest>;
export type AnalyticsNodeCount = number;
export type AnalyticsNodeLevel = number;
export type AnalyticsNodeType = "Inner" | "Exit" | (string & {});
export const AnalyticsNodeType = S.String;

export interface AnalyticsIntentNodeSummary {
  intentName?: string;
  intentPath?: string;
  intentCount?: number;
  intentLevel?: number;
  nodeType?: AnalyticsNodeType;
}
export const AnalyticsIntentNodeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentName: S.optional(S.String),
    intentPath: S.optional(S.String),
    intentCount: S.optional(S.Number),
    intentLevel: S.optional(S.Number),
    nodeType: S.optional(AnalyticsNodeType),
  }),
).annotate({
  identifier: "AnalyticsIntentNodeSummary",
}) as any as S.Schema<AnalyticsIntentNodeSummary>;
export type AnalyticsIntentNodeSummaries = AnalyticsIntentNodeSummary[];
export const AnalyticsIntentNodeSummaries = /*@__PURE__*/ S.Array(
  AnalyticsIntentNodeSummary,
);
export interface ListIntentPathsResponse {
  nodeSummaries?: AnalyticsIntentNodeSummary[];
}
export const ListIntentPathsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nodeSummaries: S.optional(AnalyticsIntentNodeSummaries) }),
).annotate({
  identifier: "ListIntentPathsResponse",
}) as any as S.Schema<ListIntentPathsResponse>;
export type IntentSortAttribute =
  | "IntentName"
  | "LastUpdatedDateTime"
  | (string & {});
export const IntentSortAttribute = S.String;

export interface IntentSortBy {
  attribute: IntentSortAttribute;
  order: SortOrder;
}
export const IntentSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: IntentSortAttribute, order: SortOrder }),
).annotate({ identifier: "IntentSortBy" }) as any as S.Schema<IntentSortBy>;
export type IntentFilterName = "IntentName" | (string & {});
export const IntentFilterName = S.String;

export type IntentFilterOperator = "CO" | "EQ" | (string & {});
export const IntentFilterOperator = S.String;

export interface IntentFilter {
  name: IntentFilterName;
  values: string[];
  operator: IntentFilterOperator;
}
export const IntentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: IntentFilterName,
    values: FilterValues,
    operator: IntentFilterOperator,
  }),
).annotate({ identifier: "IntentFilter" }) as any as S.Schema<IntentFilter>;
export type IntentFilters = IntentFilter[];
export const IntentFilters = /*@__PURE__*/ S.Array(IntentFilter);
export interface ListIntentsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  sortBy?: IntentSortBy;
  filters?: IntentFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListIntentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    sortBy: S.optional(IntentSortBy),
    filters: S.optional(IntentFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIntentsRequest",
}) as any as S.Schema<ListIntentsRequest>;
export interface IntentSummary {
  intentId?: string;
  intentName?: string;
  intentDisplayName?: string;
  description?: string;
  parentIntentSignature?: string;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
  lastUpdatedDateTime?: Date;
}
export const IntentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentId: S.optional(S.String),
    intentName: S.optional(S.String),
    intentDisplayName: S.optional(S.String),
    description: S.optional(S.String),
    parentIntentSignature: S.optional(S.String),
    inputContexts: S.optional(InputContextsList),
    outputContexts: S.optional(OutputContextsList),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "IntentSummary" }) as any as S.Schema<IntentSummary>;
export type IntentSummaryList = IntentSummary[];
export const IntentSummaryList = /*@__PURE__*/ S.Array(IntentSummary);
export interface ListIntentsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  intentSummaries?: IntentSummary[];
  nextToken?: string;
}
export const ListIntentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    intentSummaries: S.optional(IntentSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIntentsResponse",
}) as any as S.Schema<ListIntentsResponse>;
export type AnalyticsIntentStageMetricName =
  | "Count"
  | "Success"
  | "Failed"
  | "Dropped"
  | "Retry"
  | (string & {});
export const AnalyticsIntentStageMetricName = S.String;

export interface AnalyticsIntentStageMetric {
  name: AnalyticsIntentStageMetricName;
  statistic: AnalyticsMetricStatistic;
  order?: AnalyticsSortOrder;
}
export const AnalyticsIntentStageMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: AnalyticsIntentStageMetricName,
    statistic: AnalyticsMetricStatistic,
    order: S.optional(AnalyticsSortOrder),
  }),
).annotate({
  identifier: "AnalyticsIntentStageMetric",
}) as any as S.Schema<AnalyticsIntentStageMetric>;
export type AnalyticsIntentStageMetrics = AnalyticsIntentStageMetric[];
export const AnalyticsIntentStageMetrics = /*@__PURE__*/ S.Array(
  AnalyticsIntentStageMetric,
);
export type AnalyticsIntentStageField =
  | "IntentStageName"
  | "SwitchedToIntent"
  | (string & {});
export const AnalyticsIntentStageField = S.String;

export interface AnalyticsIntentStageGroupBySpecification {
  name: AnalyticsIntentStageField;
}
export const AnalyticsIntentStageGroupBySpecification = /*@__PURE__*/ S.suspend(
  () => S.Struct({ name: AnalyticsIntentStageField }),
).annotate({
  identifier: "AnalyticsIntentStageGroupBySpecification",
}) as any as S.Schema<AnalyticsIntentStageGroupBySpecification>;
export type AnalyticsIntentStageGroupByList =
  AnalyticsIntentStageGroupBySpecification[];
export const AnalyticsIntentStageGroupByList = /*@__PURE__*/ S.Array(
  AnalyticsIntentStageGroupBySpecification,
);
export type AnalyticsIntentStageFilterName =
  | "BotAliasId"
  | "BotVersion"
  | "LocaleId"
  | "Modality"
  | "Channel"
  | "SessionId"
  | "OriginatingRequestId"
  | "IntentName"
  | "IntentStageName"
  | (string & {});
export const AnalyticsIntentStageFilterName = S.String;

export interface AnalyticsIntentStageFilter {
  name: AnalyticsIntentStageFilterName;
  operator: AnalyticsFilterOperator;
  values: string[];
}
export const AnalyticsIntentStageFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: AnalyticsIntentStageFilterName,
    operator: AnalyticsFilterOperator,
    values: AnalyticsFilterValues,
  }),
).annotate({
  identifier: "AnalyticsIntentStageFilter",
}) as any as S.Schema<AnalyticsIntentStageFilter>;
export type AnalyticsIntentStageFilters = AnalyticsIntentStageFilter[];
export const AnalyticsIntentStageFilters = /*@__PURE__*/ S.Array(
  AnalyticsIntentStageFilter,
);
export interface ListIntentStageMetricsRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  metrics: AnalyticsIntentStageMetric[];
  binBy?: AnalyticsBinBySpecification[];
  groupBy?: AnalyticsIntentStageGroupBySpecification[];
  filters?: AnalyticsIntentStageFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListIntentStageMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    startDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    metrics: AnalyticsIntentStageMetrics,
    binBy: S.optional(AnalyticsBinByList),
    groupBy: S.optional(AnalyticsIntentStageGroupByList),
    filters: S.optional(AnalyticsIntentStageFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/analytics/intentstagemetrics",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIntentStageMetricsRequest",
}) as any as S.Schema<ListIntentStageMetricsRequest>;
export interface AnalyticsIntentStageGroupByKey {
  name?: AnalyticsIntentStageField;
  value?: string;
}
export const AnalyticsIntentStageGroupByKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(AnalyticsIntentStageField),
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "AnalyticsIntentStageGroupByKey",
}) as any as S.Schema<AnalyticsIntentStageGroupByKey>;
export type AnalyticsIntentStageGroupByKeys = AnalyticsIntentStageGroupByKey[];
export const AnalyticsIntentStageGroupByKeys = /*@__PURE__*/ S.Array(
  AnalyticsIntentStageGroupByKey,
);
export interface AnalyticsIntentStageMetricResult {
  name?: AnalyticsIntentStageMetricName;
  statistic?: AnalyticsMetricStatistic;
  value?: number;
}
export const AnalyticsIntentStageMetricResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(AnalyticsIntentStageMetricName),
    statistic: S.optional(AnalyticsMetricStatistic),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "AnalyticsIntentStageMetricResult",
}) as any as S.Schema<AnalyticsIntentStageMetricResult>;
export type AnalyticsIntentStageMetricResults =
  AnalyticsIntentStageMetricResult[];
export const AnalyticsIntentStageMetricResults = /*@__PURE__*/ S.Array(
  AnalyticsIntentStageMetricResult,
);
export interface AnalyticsIntentStageResult {
  binKeys?: AnalyticsBinKey[];
  groupByKeys?: AnalyticsIntentStageGroupByKey[];
  metricsResults?: AnalyticsIntentStageMetricResult[];
}
export const AnalyticsIntentStageResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    binKeys: S.optional(AnalyticsBinKeys),
    groupByKeys: S.optional(AnalyticsIntentStageGroupByKeys),
    metricsResults: S.optional(AnalyticsIntentStageMetricResults),
  }),
).annotate({
  identifier: "AnalyticsIntentStageResult",
}) as any as S.Schema<AnalyticsIntentStageResult>;
export type AnalyticsIntentStageResults = AnalyticsIntentStageResult[];
export const AnalyticsIntentStageResults = /*@__PURE__*/ S.Array(
  AnalyticsIntentStageResult,
);
export interface ListIntentStageMetricsResponse {
  botId?: string;
  results?: AnalyticsIntentStageResult[];
  nextToken?: string;
}
export const ListIntentStageMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    results: S.optional(AnalyticsIntentStageResults),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIntentStageMetricsResponse",
}) as any as S.Schema<ListIntentStageMetricsResponse>;
export interface ListRecommendedIntentsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  botRecommendationId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListRecommendedIntentsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    botRecommendationId: S.String.pipe(T.HttpLabel("botRecommendationId")),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations/{botRecommendationId}/intents",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListRecommendedIntentsRequest",
}) as any as S.Schema<ListRecommendedIntentsRequest>;
export type SampleUtterancesCount = number;
export interface RecommendedIntentSummary {
  intentId?: string;
  intentName?: string;
  sampleUtterancesCount?: number;
}
export const RecommendedIntentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentId: S.optional(S.String),
    intentName: S.optional(S.String),
    sampleUtterancesCount: S.optional(S.Number),
  }),
).annotate({
  identifier: "RecommendedIntentSummary",
}) as any as S.Schema<RecommendedIntentSummary>;
export type RecommendedIntentSummaryList = RecommendedIntentSummary[];
export const RecommendedIntentSummaryList = /*@__PURE__*/ S.Array(
  RecommendedIntentSummary,
);
export interface ListRecommendedIntentsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationId?: string;
  summaryList?: RecommendedIntentSummary[];
  nextToken?: string;
}
export const ListRecommendedIntentsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    botRecommendationId: S.optional(S.String),
    summaryList: S.optional(RecommendedIntentSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListRecommendedIntentsResponse",
}) as any as S.Schema<ListRecommendedIntentsResponse>;
export type AnalyticsSessionSortByName =
  | "ConversationStartTime"
  | "NumberOfTurns"
  | "Duration"
  | (string & {});
export const AnalyticsSessionSortByName = S.String;

export interface SessionDataSortBy {
  name: AnalyticsSessionSortByName;
  order: AnalyticsSortOrder;
}
export const SessionDataSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: AnalyticsSessionSortByName, order: AnalyticsSortOrder }),
).annotate({
  identifier: "SessionDataSortBy",
}) as any as S.Schema<SessionDataSortBy>;
export type AnalyticsSessionFilterName =
  | "BotAliasId"
  | "BotVersion"
  | "LocaleId"
  | "Modality"
  | "Channel"
  | "Duration"
  | "ConversationEndState"
  | "SessionId"
  | "OriginatingRequestId"
  | "IntentPath"
  | (string & {});
export const AnalyticsSessionFilterName = S.String;

export interface AnalyticsSessionFilter {
  name: AnalyticsSessionFilterName;
  operator: AnalyticsFilterOperator;
  values: string[];
}
export const AnalyticsSessionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: AnalyticsSessionFilterName,
    operator: AnalyticsFilterOperator,
    values: AnalyticsFilterValues,
  }),
).annotate({
  identifier: "AnalyticsSessionFilter",
}) as any as S.Schema<AnalyticsSessionFilter>;
export type AnalyticsSessionFilters = AnalyticsSessionFilter[];
export const AnalyticsSessionFilters = /*@__PURE__*/ S.Array(
  AnalyticsSessionFilter,
);
export interface ListSessionAnalyticsDataRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  sortBy?: SessionDataSortBy;
  filters?: AnalyticsSessionFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListSessionAnalyticsDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    startDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    sortBy: S.optional(SessionDataSortBy),
    filters: S.optional(AnalyticsSessionFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots/{botId}/analytics/sessions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSessionAnalyticsDataRequest",
}) as any as S.Schema<ListSessionAnalyticsDataRequest>;
export type AnalyticsChannel = string;
export type AnalyticsSessionId = string;
export type AnalyticsLongValue = number;
export type ConversationEndState =
  | "Success"
  | "Failure"
  | "Dropped"
  | (string & {});
export const ConversationEndState = S.String;

export type AnalyticsModality =
  | "Speech"
  | "Text"
  | "DTMF"
  | "MultiMode"
  | (string & {});
export const AnalyticsModality = S.String;

export interface InvokedIntentSample {
  intentName?: string;
}
export const InvokedIntentSample = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ intentName: S.optional(S.String) }),
).annotate({
  identifier: "InvokedIntentSample",
}) as any as S.Schema<InvokedIntentSample>;
export type InvokedIntentSamples = InvokedIntentSample[];
export const InvokedIntentSamples = /*@__PURE__*/ S.Array(InvokedIntentSample);
export type AnalyticsOriginatingRequestId = string;
export interface SessionSpecification {
  botAliasId?: string;
  botVersion?: string;
  localeId?: string;
  channel?: string;
  sessionId?: string;
  conversationStartTime?: Date;
  conversationEndTime?: Date;
  conversationDurationSeconds?: number;
  conversationEndState?: ConversationEndState;
  mode?: AnalyticsModality;
  numberOfTurns?: number;
  invokedIntentSamples?: InvokedIntentSample[];
  originatingRequestId?: string;
}
export const SessionSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    channel: S.optional(S.String),
    sessionId: S.optional(S.String),
    conversationStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    conversationEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    conversationDurationSeconds: S.optional(S.Number),
    conversationEndState: S.optional(ConversationEndState),
    mode: S.optional(AnalyticsModality),
    numberOfTurns: S.optional(S.Number),
    invokedIntentSamples: S.optional(InvokedIntentSamples),
    originatingRequestId: S.optional(S.String),
  }),
).annotate({
  identifier: "SessionSpecification",
}) as any as S.Schema<SessionSpecification>;
export type SessionSpecifications = SessionSpecification[];
export const SessionSpecifications =
  /*@__PURE__*/ S.Array(SessionSpecification);
export interface ListSessionAnalyticsDataResponse {
  botId?: string;
  nextToken?: string;
  sessions?: SessionSpecification[];
}
export const ListSessionAnalyticsDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    nextToken: S.optional(S.String),
    sessions: S.optional(SessionSpecifications),
  }),
).annotate({
  identifier: "ListSessionAnalyticsDataResponse",
}) as any as S.Schema<ListSessionAnalyticsDataResponse>;
export type AnalyticsSessionMetricName =
  | "Count"
  | "Success"
  | "Failure"
  | "Dropped"
  | "Duration"
  | "TurnsPerConversation"
  | "Concurrency"
  | (string & {});
export const AnalyticsSessionMetricName = S.String;

export interface AnalyticsSessionMetric {
  name: AnalyticsSessionMetricName;
  statistic: AnalyticsMetricStatistic;
  order?: AnalyticsSortOrder;
}
export const AnalyticsSessionMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: AnalyticsSessionMetricName,
    statistic: AnalyticsMetricStatistic,
    order: S.optional(AnalyticsSortOrder),
  }),
).annotate({
  identifier: "AnalyticsSessionMetric",
}) as any as S.Schema<AnalyticsSessionMetric>;
export type AnalyticsSessionMetrics = AnalyticsSessionMetric[];
export const AnalyticsSessionMetrics = /*@__PURE__*/ S.Array(
  AnalyticsSessionMetric,
);
export type AnalyticsSessionField =
  | "ConversationEndState"
  | "LocaleId"
  | (string & {});
export const AnalyticsSessionField = S.String;

export interface AnalyticsSessionGroupBySpecification {
  name: AnalyticsSessionField;
}
export const AnalyticsSessionGroupBySpecification = /*@__PURE__*/ S.suspend(
  () => S.Struct({ name: AnalyticsSessionField }),
).annotate({
  identifier: "AnalyticsSessionGroupBySpecification",
}) as any as S.Schema<AnalyticsSessionGroupBySpecification>;
export type AnalyticsSessionGroupByList =
  AnalyticsSessionGroupBySpecification[];
export const AnalyticsSessionGroupByList = /*@__PURE__*/ S.Array(
  AnalyticsSessionGroupBySpecification,
);
export interface ListSessionMetricsRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  metrics: AnalyticsSessionMetric[];
  binBy?: AnalyticsBinBySpecification[];
  groupBy?: AnalyticsSessionGroupBySpecification[];
  filters?: AnalyticsSessionFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListSessionMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    startDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    metrics: AnalyticsSessionMetrics,
    binBy: S.optional(AnalyticsBinByList),
    groupBy: S.optional(AnalyticsSessionGroupByList),
    filters: S.optional(AnalyticsSessionFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots/{botId}/analytics/sessionmetrics" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSessionMetricsRequest",
}) as any as S.Schema<ListSessionMetricsRequest>;
export interface AnalyticsSessionGroupByKey {
  name?: AnalyticsSessionField;
  value?: string;
}
export const AnalyticsSessionGroupByKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(AnalyticsSessionField),
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "AnalyticsSessionGroupByKey",
}) as any as S.Schema<AnalyticsSessionGroupByKey>;
export type AnalyticsSessionGroupByKeys = AnalyticsSessionGroupByKey[];
export const AnalyticsSessionGroupByKeys = /*@__PURE__*/ S.Array(
  AnalyticsSessionGroupByKey,
);
export interface AnalyticsSessionMetricResult {
  name?: AnalyticsSessionMetricName;
  statistic?: AnalyticsMetricStatistic;
  value?: number;
}
export const AnalyticsSessionMetricResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(AnalyticsSessionMetricName),
    statistic: S.optional(AnalyticsMetricStatistic),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "AnalyticsSessionMetricResult",
}) as any as S.Schema<AnalyticsSessionMetricResult>;
export type AnalyticsSessionMetricResults = AnalyticsSessionMetricResult[];
export const AnalyticsSessionMetricResults = /*@__PURE__*/ S.Array(
  AnalyticsSessionMetricResult,
);
export interface AnalyticsSessionResult {
  binKeys?: AnalyticsBinKey[];
  groupByKeys?: AnalyticsSessionGroupByKey[];
  metricsResults?: AnalyticsSessionMetricResult[];
}
export const AnalyticsSessionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    binKeys: S.optional(AnalyticsBinKeys),
    groupByKeys: S.optional(AnalyticsSessionGroupByKeys),
    metricsResults: S.optional(AnalyticsSessionMetricResults),
  }),
).annotate({
  identifier: "AnalyticsSessionResult",
}) as any as S.Schema<AnalyticsSessionResult>;
export type AnalyticsSessionResults = AnalyticsSessionResult[];
export const AnalyticsSessionResults = /*@__PURE__*/ S.Array(
  AnalyticsSessionResult,
);
export interface ListSessionMetricsResponse {
  botId?: string;
  results?: AnalyticsSessionResult[];
  nextToken?: string;
}
export const ListSessionMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    results: S.optional(AnalyticsSessionResults),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSessionMetricsResponse",
}) as any as S.Schema<ListSessionMetricsResponse>;
export type SlotSortAttribute =
  | "SlotName"
  | "LastUpdatedDateTime"
  | (string & {});
export const SlotSortAttribute = S.String;

export interface SlotSortBy {
  attribute: SlotSortAttribute;
  order: SortOrder;
}
export const SlotSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: SlotSortAttribute, order: SortOrder }),
).annotate({ identifier: "SlotSortBy" }) as any as S.Schema<SlotSortBy>;
export type SlotFilterName = "SlotName" | (string & {});
export const SlotFilterName = S.String;

export type SlotFilterOperator = "CO" | "EQ" | (string & {});
export const SlotFilterOperator = S.String;

export interface SlotFilter {
  name: SlotFilterName;
  values: string[];
  operator: SlotFilterOperator;
}
export const SlotFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SlotFilterName,
    values: FilterValues,
    operator: SlotFilterOperator,
  }),
).annotate({ identifier: "SlotFilter" }) as any as S.Schema<SlotFilter>;
export type SlotFilters = SlotFilter[];
export const SlotFilters = /*@__PURE__*/ S.Array(SlotFilter);
export interface ListSlotsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  intentId: string;
  sortBy?: SlotSortBy;
  filters?: SlotFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListSlotsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    intentId: S.String.pipe(T.HttpLabel("intentId")),
    sortBy: S.optional(SlotSortBy),
    filters: S.optional(SlotFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}/slots",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSlotsRequest",
}) as any as S.Schema<ListSlotsRequest>;
export interface SlotSummary {
  slotId?: string;
  slotName?: string;
  description?: string;
  slotConstraint?: SlotConstraint;
  slotTypeId?: string;
  valueElicitationPromptSpecification?: PromptSpecification;
  lastUpdatedDateTime?: Date;
}
export const SlotSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotId: S.optional(S.String),
    slotName: S.optional(S.String),
    description: S.optional(S.String),
    slotConstraint: S.optional(SlotConstraint),
    slotTypeId: S.optional(S.String),
    valueElicitationPromptSpecification: S.optional(PromptSpecification),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "SlotSummary" }) as any as S.Schema<SlotSummary>;
export type SlotSummaryList = SlotSummary[];
export const SlotSummaryList = /*@__PURE__*/ S.Array(SlotSummary);
export interface ListSlotsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  intentId?: string;
  slotSummaries?: SlotSummary[];
  nextToken?: string;
}
export const ListSlotsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    intentId: S.optional(S.String),
    slotSummaries: S.optional(SlotSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSlotsResponse",
}) as any as S.Schema<ListSlotsResponse>;
export type SlotTypeSortAttribute =
  | "SlotTypeName"
  | "LastUpdatedDateTime"
  | (string & {});
export const SlotTypeSortAttribute = S.String;

export interface SlotTypeSortBy {
  attribute: SlotTypeSortAttribute;
  order: SortOrder;
}
export const SlotTypeSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: SlotTypeSortAttribute, order: SortOrder }),
).annotate({ identifier: "SlotTypeSortBy" }) as any as S.Schema<SlotTypeSortBy>;
export type SlotTypeFilterName =
  | "SlotTypeName"
  | "ExternalSourceType"
  | (string & {});
export const SlotTypeFilterName = S.String;

export type SlotTypeFilterOperator = "CO" | "EQ" | (string & {});
export const SlotTypeFilterOperator = S.String;

export interface SlotTypeFilter {
  name: SlotTypeFilterName;
  values: string[];
  operator: SlotTypeFilterOperator;
}
export const SlotTypeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: SlotTypeFilterName,
    values: FilterValues,
    operator: SlotTypeFilterOperator,
  }),
).annotate({ identifier: "SlotTypeFilter" }) as any as S.Schema<SlotTypeFilter>;
export type SlotTypeFilters = SlotTypeFilter[];
export const SlotTypeFilters = /*@__PURE__*/ S.Array(SlotTypeFilter);
export interface ListSlotTypesRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  sortBy?: SlotTypeSortBy;
  filters?: SlotTypeFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListSlotTypesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    sortBy: S.optional(SlotTypeSortBy),
    filters: S.optional(SlotTypeFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/slottypes",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSlotTypesRequest",
}) as any as S.Schema<ListSlotTypesRequest>;
export type SlotTypeCategory =
  | "Custom"
  | "Extended"
  | "ExternalGrammar"
  | "Composite"
  | (string & {});
export const SlotTypeCategory = S.String;

export interface SlotTypeSummary {
  slotTypeId?: string;
  slotTypeName?: string;
  description?: string;
  parentSlotTypeSignature?: string;
  lastUpdatedDateTime?: Date;
  slotTypeCategory?: SlotTypeCategory;
}
export const SlotTypeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypeId: S.optional(S.String),
    slotTypeName: S.optional(S.String),
    description: S.optional(S.String),
    parentSlotTypeSignature: S.optional(S.String),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    slotTypeCategory: S.optional(SlotTypeCategory),
  }),
).annotate({
  identifier: "SlotTypeSummary",
}) as any as S.Schema<SlotTypeSummary>;
export type SlotTypeSummaryList = SlotTypeSummary[];
export const SlotTypeSummaryList = /*@__PURE__*/ S.Array(SlotTypeSummary);
export interface ListSlotTypesResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  slotTypeSummaries?: SlotTypeSummary[];
  nextToken?: string;
}
export const ListSlotTypesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    slotTypeSummaries: S.optional(SlotTypeSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSlotTypesResponse",
}) as any as S.Schema<ListSlotTypesResponse>;
export interface ListTagsForResourceRequest {
  resourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceARN: S.String.pipe(T.HttpLabel("resourceARN")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceARN}" }),
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
export type TestResultTypeFilter =
  | "OverallTestResults"
  | "ConversationLevelTestResults"
  | "IntentClassificationTestResults"
  | "SlotResolutionTestResults"
  | "UtteranceLevelResults"
  | (string & {});
export const TestResultTypeFilter = S.String;

export type TestResultMatchStatus =
  | "Matched"
  | "Mismatched"
  | "ExecutionError"
  | (string & {});
export const TestResultMatchStatus = S.String;

export interface ConversationLevelTestResultsFilterBy {
  endToEndResult?: TestResultMatchStatus;
}
export const ConversationLevelTestResultsFilterBy = /*@__PURE__*/ S.suspend(
  () => S.Struct({ endToEndResult: S.optional(TestResultMatchStatus) }),
).annotate({
  identifier: "ConversationLevelTestResultsFilterBy",
}) as any as S.Schema<ConversationLevelTestResultsFilterBy>;
export interface TestExecutionResultFilterBy {
  resultTypeFilter: TestResultTypeFilter;
  conversationLevelTestResultsFilterBy?: ConversationLevelTestResultsFilterBy;
}
export const TestExecutionResultFilterBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resultTypeFilter: TestResultTypeFilter,
    conversationLevelTestResultsFilterBy: S.optional(
      ConversationLevelTestResultsFilterBy,
    ),
  }),
).annotate({
  identifier: "TestExecutionResultFilterBy",
}) as any as S.Schema<TestExecutionResultFilterBy>;
export interface ListTestExecutionResultItemsRequest {
  testExecutionId: string;
  resultFilterBy: TestExecutionResultFilterBy;
  maxResults?: number;
  nextToken?: string;
}
export const ListTestExecutionResultItemsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testExecutionId: S.String.pipe(T.HttpLabel("testExecutionId")),
    resultFilterBy: TestExecutionResultFilterBy,
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/testexecutions/{testExecutionId}/results",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTestExecutionResultItemsRequest",
}) as any as S.Schema<ListTestExecutionResultItemsRequest>;
export type TestResultMatchStatusCountMap = {
  [key in TestResultMatchStatus]?: number;
};
export const TestResultMatchStatusCountMap = /*@__PURE__*/ S.Record(
  TestResultMatchStatus,
  S.Number.pipe(S.optional),
);
export interface OverallTestResultItem {
  multiTurnConversation: boolean;
  totalResultCount: number;
  speechTranscriptionResultCounts?: { [key: string]: number | undefined };
  endToEndResultCounts: { [key: string]: number | undefined };
}
export const OverallTestResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    multiTurnConversation: S.Boolean,
    totalResultCount: S.Number,
    speechTranscriptionResultCounts: S.optional(TestResultMatchStatusCountMap),
    endToEndResultCounts: TestResultMatchStatusCountMap,
  }),
).annotate({
  identifier: "OverallTestResultItem",
}) as any as S.Schema<OverallTestResultItem>;
export type OverallTestResultItemList = OverallTestResultItem[];
export const OverallTestResultItemList = /*@__PURE__*/ S.Array(
  OverallTestResultItem,
);
export interface OverallTestResults {
  items: OverallTestResultItem[];
}
export const OverallTestResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: OverallTestResultItemList }),
).annotate({
  identifier: "OverallTestResults",
}) as any as S.Schema<OverallTestResults>;
export type TestSetConversationId = string;
export interface ConversationLevelIntentClassificationResultItem {
  intentName: string;
  matchResult: TestResultMatchStatus;
}
export const ConversationLevelIntentClassificationResultItem =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ intentName: S.String, matchResult: TestResultMatchStatus }),
  ).annotate({
    identifier: "ConversationLevelIntentClassificationResultItem",
  }) as any as S.Schema<ConversationLevelIntentClassificationResultItem>;
export type ConversationLevelIntentClassificationResults =
  ConversationLevelIntentClassificationResultItem[];
export const ConversationLevelIntentClassificationResults =
  /*@__PURE__*/ S.Array(ConversationLevelIntentClassificationResultItem);
export type TestResultSlotName = string;
export interface ConversationLevelSlotResolutionResultItem {
  intentName: string;
  slotName: string;
  matchResult: TestResultMatchStatus;
}
export const ConversationLevelSlotResolutionResultItem =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      intentName: S.String,
      slotName: S.String,
      matchResult: TestResultMatchStatus,
    }),
  ).annotate({
    identifier: "ConversationLevelSlotResolutionResultItem",
  }) as any as S.Schema<ConversationLevelSlotResolutionResultItem>;
export type ConversationLevelSlotResolutionResults =
  ConversationLevelSlotResolutionResultItem[];
export const ConversationLevelSlotResolutionResults = /*@__PURE__*/ S.Array(
  ConversationLevelSlotResolutionResultItem,
);
export interface ConversationLevelTestResultItem {
  conversationId: string;
  endToEndResult: TestResultMatchStatus;
  speechTranscriptionResult?: TestResultMatchStatus;
  intentClassificationResults: ConversationLevelIntentClassificationResultItem[];
  slotResolutionResults: ConversationLevelSlotResolutionResultItem[];
}
export const ConversationLevelTestResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    conversationId: S.String,
    endToEndResult: TestResultMatchStatus,
    speechTranscriptionResult: S.optional(TestResultMatchStatus),
    intentClassificationResults: ConversationLevelIntentClassificationResults,
    slotResolutionResults: ConversationLevelSlotResolutionResults,
  }),
).annotate({
  identifier: "ConversationLevelTestResultItem",
}) as any as S.Schema<ConversationLevelTestResultItem>;
export type ConversationLevelTestResultItemList =
  ConversationLevelTestResultItem[];
export const ConversationLevelTestResultItemList = /*@__PURE__*/ S.Array(
  ConversationLevelTestResultItem,
);
export interface ConversationLevelTestResults {
  items: ConversationLevelTestResultItem[];
}
export const ConversationLevelTestResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: ConversationLevelTestResultItemList }),
).annotate({
  identifier: "ConversationLevelTestResults",
}) as any as S.Schema<ConversationLevelTestResults>;
export interface IntentClassificationTestResultItemCounts {
  totalResultCount: number;
  speechTranscriptionResultCounts?: { [key: string]: number | undefined };
  intentMatchResultCounts: { [key: string]: number | undefined };
}
export const IntentClassificationTestResultItemCounts = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      totalResultCount: S.Number,
      speechTranscriptionResultCounts: S.optional(
        TestResultMatchStatusCountMap,
      ),
      intentMatchResultCounts: TestResultMatchStatusCountMap,
    }),
).annotate({
  identifier: "IntentClassificationTestResultItemCounts",
}) as any as S.Schema<IntentClassificationTestResultItemCounts>;
export interface IntentClassificationTestResultItem {
  intentName: string;
  multiTurnConversation: boolean;
  resultCounts: IntentClassificationTestResultItemCounts;
}
export const IntentClassificationTestResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentName: S.String,
    multiTurnConversation: S.Boolean,
    resultCounts: IntentClassificationTestResultItemCounts,
  }),
).annotate({
  identifier: "IntentClassificationTestResultItem",
}) as any as S.Schema<IntentClassificationTestResultItem>;
export type IntentClassificationTestResultItemList =
  IntentClassificationTestResultItem[];
export const IntentClassificationTestResultItemList = /*@__PURE__*/ S.Array(
  IntentClassificationTestResultItem,
);
export interface IntentClassificationTestResults {
  items: IntentClassificationTestResultItem[];
}
export const IntentClassificationTestResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: IntentClassificationTestResultItemList }),
).annotate({
  identifier: "IntentClassificationTestResults",
}) as any as S.Schema<IntentClassificationTestResults>;
export interface SlotResolutionTestResultItemCounts {
  totalResultCount: number;
  speechTranscriptionResultCounts?: { [key: string]: number | undefined };
  slotMatchResultCounts: { [key: string]: number | undefined };
}
export const SlotResolutionTestResultItemCounts = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    totalResultCount: S.Number,
    speechTranscriptionResultCounts: S.optional(TestResultMatchStatusCountMap),
    slotMatchResultCounts: TestResultMatchStatusCountMap,
  }),
).annotate({
  identifier: "SlotResolutionTestResultItemCounts",
}) as any as S.Schema<SlotResolutionTestResultItemCounts>;
export interface SlotResolutionTestResultItem {
  slotName: string;
  resultCounts: SlotResolutionTestResultItemCounts;
}
export const SlotResolutionTestResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotName: S.String,
    resultCounts: SlotResolutionTestResultItemCounts,
  }),
).annotate({
  identifier: "SlotResolutionTestResultItem",
}) as any as S.Schema<SlotResolutionTestResultItem>;
export type SlotResolutionTestResultItems = SlotResolutionTestResultItem[];
export const SlotResolutionTestResultItems = /*@__PURE__*/ S.Array(
  SlotResolutionTestResultItem,
);
export interface IntentLevelSlotResolutionTestResultItem {
  intentName: string;
  multiTurnConversation: boolean;
  slotResolutionResults: SlotResolutionTestResultItem[];
}
export const IntentLevelSlotResolutionTestResultItem = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      intentName: S.String,
      multiTurnConversation: S.Boolean,
      slotResolutionResults: SlotResolutionTestResultItems,
    }),
).annotate({
  identifier: "IntentLevelSlotResolutionTestResultItem",
}) as any as S.Schema<IntentLevelSlotResolutionTestResultItem>;
export type IntentLevelSlotResolutionTestResultItemList =
  IntentLevelSlotResolutionTestResultItem[];
export const IntentLevelSlotResolutionTestResultItemList =
  /*@__PURE__*/ S.Array(IntentLevelSlotResolutionTestResultItem);
export interface IntentLevelSlotResolutionTestResults {
  items: IntentLevelSlotResolutionTestResultItem[];
}
export const IntentLevelSlotResolutionTestResults = /*@__PURE__*/ S.suspend(
  () => S.Struct({ items: IntentLevelSlotResolutionTestResultItemList }),
).annotate({
  identifier: "IntentLevelSlotResolutionTestResults",
}) as any as S.Schema<IntentLevelSlotResolutionTestResults>;
export type RecordNumber = number;
export type TestSetAgentPrompt = string;
export interface ExecutionErrorDetails {
  errorCode: string;
  errorMessage: string;
}
export const ExecutionErrorDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ errorCode: S.String, errorMessage: S.String }),
).annotate({
  identifier: "ExecutionErrorDetails",
}) as any as S.Schema<ExecutionErrorDetails>;
export interface AgentTurnResult {
  expectedAgentPrompt: string;
  actualAgentPrompt?: string;
  errorDetails?: ExecutionErrorDetails;
  actualElicitedSlot?: string;
  actualIntent?: string;
}
export const AgentTurnResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    expectedAgentPrompt: S.String,
    actualAgentPrompt: S.optional(S.String),
    errorDetails: S.optional(ExecutionErrorDetails),
    actualElicitedSlot: S.optional(S.String),
    actualIntent: S.optional(S.String),
  }),
).annotate({
  identifier: "AgentTurnResult",
}) as any as S.Schema<AgentTurnResult>;
export type TestSetUtteranceText = string;
export type AudioFileS3Location = string;
export interface UtteranceAudioInputSpecification {
  audioFileS3Location: string;
}
export const UtteranceAudioInputSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ audioFileS3Location: S.String }),
).annotate({
  identifier: "UtteranceAudioInputSpecification",
}) as any as S.Schema<UtteranceAudioInputSpecification>;
export interface UtteranceInputSpecification {
  textInput?: string;
  audioInput?: UtteranceAudioInputSpecification;
}
export const UtteranceInputSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    textInput: S.optional(S.String),
    audioInput: S.optional(UtteranceAudioInputSpecification),
  }),
).annotate({
  identifier: "UtteranceInputSpecification",
}) as any as S.Schema<UtteranceInputSpecification>;
export type ActiveContextName = string;
export interface ActiveContext {
  name: string;
}
export const ActiveContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String }),
).annotate({ identifier: "ActiveContext" }) as any as S.Schema<ActiveContext>;
export type ActiveContextList = ActiveContext[];
export const ActiveContextList = /*@__PURE__*/ S.Array(ActiveContext);
export type RuntimeHintPhrase = string;
export interface RuntimeHintValue {
  phrase: string;
}
export const RuntimeHintValue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ phrase: S.String }),
).annotate({
  identifier: "RuntimeHintValue",
}) as any as S.Schema<RuntimeHintValue>;
export type RuntimeHintValuesList = RuntimeHintValue[];
export const RuntimeHintValuesList = /*@__PURE__*/ S.Array(RuntimeHintValue);
export interface RuntimeHintDetails {
  runtimeHintValues?: RuntimeHintValue[];
  subSlotHints?: { [key: string]: RuntimeHintDetails | undefined };
}
export const RuntimeHintDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    runtimeHintValues: S.optional(RuntimeHintValuesList),
    subSlotHints: S.optional(
      S.suspend(() => SlotHintsSlotMap).annotate({
        identifier: "SlotHintsSlotMap",
      }),
    ),
  }),
).annotate({
  identifier: "RuntimeHintDetails",
}) as any as S.Schema<RuntimeHintDetails>;
export type SlotHintsSlotMap = {
  [key: string]: RuntimeHintDetails | undefined;
};
export const SlotHintsSlotMap = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend((): S.Schema<RuntimeHintDetails> => RuntimeHintDetails)
    .annotate({ identifier: "RuntimeHintDetails" })
    .pipe(S.optional),
) as any as S.Schema<SlotHintsSlotMap>;
export type SlotHintsIntentMap = {
  [key: string]: { [key: string]: RuntimeHintDetails | undefined } | undefined;
};
export const SlotHintsIntentMap = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend(() => SlotHintsSlotMap)
    .annotate({ identifier: "SlotHintsSlotMap" })
    .pipe(S.optional),
);
export interface RuntimeHints {
  slotHints?: {
    [key: string]:
      | { [key: string]: RuntimeHintDetails | undefined }
      | undefined;
  };
}
export const RuntimeHints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ slotHints: S.optional(SlotHintsIntentMap) }),
).annotate({ identifier: "RuntimeHints" }) as any as S.Schema<RuntimeHints>;
export interface InputSessionStateSpecification {
  sessionAttributes?: { [key: string]: string | undefined };
  activeContexts?: ActiveContext[];
  runtimeHints?: RuntimeHints;
}
export const InputSessionStateSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionAttributes: S.optional(StringMap),
    activeContexts: S.optional(ActiveContextList),
    runtimeHints: S.optional(RuntimeHints),
  }),
).annotate({
  identifier: "InputSessionStateSpecification",
}) as any as S.Schema<InputSessionStateSpecification>;
export interface UserTurnInputSpecification {
  utteranceInput: UtteranceInputSpecification;
  requestAttributes?: { [key: string]: string | undefined };
  sessionState?: InputSessionStateSpecification;
}
export const UserTurnInputSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    utteranceInput: UtteranceInputSpecification,
    requestAttributes: S.optional(StringMap),
    sessionState: S.optional(InputSessionStateSpecification),
  }),
).annotate({
  identifier: "UserTurnInputSpecification",
}) as any as S.Schema<UserTurnInputSpecification>;
export type UserTurnSlotOutputList = UserTurnSlotOutput[];
export const UserTurnSlotOutputList = /*@__PURE__*/ S.Array(
  S.suspend((): S.Schema<UserTurnSlotOutput> => UserTurnSlotOutput).annotate({
    identifier: "UserTurnSlotOutput",
  }),
) as any as S.Schema<UserTurnSlotOutputList>;
export interface UserTurnSlotOutput {
  value?: string;
  values?: UserTurnSlotOutput[];
  subSlots?: { [key: string]: UserTurnSlotOutput | undefined };
}
export const UserTurnSlotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    value: S.optional(S.String),
    values: S.optional(
      S.suspend(() => UserTurnSlotOutputList).annotate({
        identifier: "UserTurnSlotOutputList",
      }),
    ),
    subSlots: S.optional(
      S.suspend(() => UserTurnSlotOutputMap).annotate({
        identifier: "UserTurnSlotOutputMap",
      }),
    ),
  }),
).annotate({
  identifier: "UserTurnSlotOutput",
}) as any as S.Schema<UserTurnSlotOutput>;
export type UserTurnSlotOutputMap = {
  [key: string]: UserTurnSlotOutput | undefined;
};
export const UserTurnSlotOutputMap = /*@__PURE__*/ S.Record(
  S.String,
  S.suspend((): S.Schema<UserTurnSlotOutput> => UserTurnSlotOutput)
    .annotate({ identifier: "UserTurnSlotOutput" })
    .pipe(S.optional),
) as any as S.Schema<UserTurnSlotOutputMap>;
export interface UserTurnIntentOutput {
  name: string;
  slots?: { [key: string]: UserTurnSlotOutput | undefined };
}
export const UserTurnIntentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, slots: S.optional(UserTurnSlotOutputMap) }),
).annotate({
  identifier: "UserTurnIntentOutput",
}) as any as S.Schema<UserTurnIntentOutput>;
export interface UserTurnOutputSpecification {
  intent: UserTurnIntentOutput;
  activeContexts?: ActiveContext[];
  transcript?: string;
}
export const UserTurnOutputSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intent: UserTurnIntentOutput,
    activeContexts: S.optional(ActiveContextList),
    transcript: S.optional(S.String),
  }),
).annotate({
  identifier: "UserTurnOutputSpecification",
}) as any as S.Schema<UserTurnOutputSpecification>;
export interface ConversationLevelResultDetail {
  endToEndResult: TestResultMatchStatus;
  speechTranscriptionResult?: TestResultMatchStatus;
}
export const ConversationLevelResultDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    endToEndResult: TestResultMatchStatus,
    speechTranscriptionResult: S.optional(TestResultMatchStatus),
  }),
).annotate({
  identifier: "ConversationLevelResultDetail",
}) as any as S.Schema<ConversationLevelResultDetail>;
export interface UserTurnResult {
  input: UserTurnInputSpecification;
  expectedOutput: UserTurnOutputSpecification;
  actualOutput?: UserTurnOutputSpecification;
  errorDetails?: ExecutionErrorDetails;
  endToEndResult?: TestResultMatchStatus;
  intentMatchResult?: TestResultMatchStatus;
  slotMatchResult?: TestResultMatchStatus;
  speechTranscriptionResult?: TestResultMatchStatus;
  conversationLevelResult?: ConversationLevelResultDetail;
}
export const UserTurnResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    input: UserTurnInputSpecification,
    expectedOutput: UserTurnOutputSpecification,
    actualOutput: S.optional(UserTurnOutputSpecification),
    errorDetails: S.optional(ExecutionErrorDetails),
    endToEndResult: S.optional(TestResultMatchStatus),
    intentMatchResult: S.optional(TestResultMatchStatus),
    slotMatchResult: S.optional(TestResultMatchStatus),
    speechTranscriptionResult: S.optional(TestResultMatchStatus),
    conversationLevelResult: S.optional(ConversationLevelResultDetail),
  }),
).annotate({ identifier: "UserTurnResult" }) as any as S.Schema<UserTurnResult>;
export interface TestSetTurnResult {
  agent?: AgentTurnResult;
  user?: UserTurnResult;
}
export const TestSetTurnResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agent: S.optional(AgentTurnResult),
    user: S.optional(UserTurnResult),
  }),
).annotate({
  identifier: "TestSetTurnResult",
}) as any as S.Schema<TestSetTurnResult>;
export interface UtteranceLevelTestResultItem {
  recordNumber: number;
  conversationId?: string;
  turnResult: TestSetTurnResult;
}
export const UtteranceLevelTestResultItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recordNumber: S.Number,
    conversationId: S.optional(S.String),
    turnResult: TestSetTurnResult,
  }),
).annotate({
  identifier: "UtteranceLevelTestResultItem",
}) as any as S.Schema<UtteranceLevelTestResultItem>;
export type UtteranceLevelTestResultItemList = UtteranceLevelTestResultItem[];
export const UtteranceLevelTestResultItemList = /*@__PURE__*/ S.Array(
  UtteranceLevelTestResultItem,
);
export interface UtteranceLevelTestResults {
  items: UtteranceLevelTestResultItem[];
}
export const UtteranceLevelTestResults = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ items: UtteranceLevelTestResultItemList }),
).annotate({
  identifier: "UtteranceLevelTestResults",
}) as any as S.Schema<UtteranceLevelTestResults>;
export interface TestExecutionResultItems {
  overallTestResults?: OverallTestResults;
  conversationLevelTestResults?: ConversationLevelTestResults;
  intentClassificationTestResults?: IntentClassificationTestResults;
  intentLevelSlotResolutionTestResults?: IntentLevelSlotResolutionTestResults;
  utteranceLevelTestResults?: UtteranceLevelTestResults;
}
export const TestExecutionResultItems = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    overallTestResults: S.optional(OverallTestResults),
    conversationLevelTestResults: S.optional(ConversationLevelTestResults),
    intentClassificationTestResults: S.optional(
      IntentClassificationTestResults,
    ),
    intentLevelSlotResolutionTestResults: S.optional(
      IntentLevelSlotResolutionTestResults,
    ),
    utteranceLevelTestResults: S.optional(UtteranceLevelTestResults),
  }),
).annotate({
  identifier: "TestExecutionResultItems",
}) as any as S.Schema<TestExecutionResultItems>;
export interface ListTestExecutionResultItemsResponse {
  testExecutionResults?: TestExecutionResultItems;
  nextToken?: string;
}
export const ListTestExecutionResultItemsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      testExecutionResults: S.optional(TestExecutionResultItems),
      nextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListTestExecutionResultItemsResponse",
}) as any as S.Schema<ListTestExecutionResultItemsResponse>;
export type TestExecutionSortAttribute =
  | "TestSetName"
  | "CreationDateTime"
  | (string & {});
export const TestExecutionSortAttribute = S.String;

export interface TestExecutionSortBy {
  attribute: TestExecutionSortAttribute;
  order: SortOrder;
}
export const TestExecutionSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: TestExecutionSortAttribute, order: SortOrder }),
).annotate({
  identifier: "TestExecutionSortBy",
}) as any as S.Schema<TestExecutionSortBy>;
export interface ListTestExecutionsRequest {
  sortBy?: TestExecutionSortBy;
  maxResults?: number;
  nextToken?: string;
}
export const ListTestExecutionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sortBy: S.optional(TestExecutionSortBy),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/testexecutions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTestExecutionsRequest",
}) as any as S.Schema<ListTestExecutionsRequest>;
export interface TestExecutionSummary {
  testExecutionId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  testExecutionStatus?: TestExecutionStatus;
  testSetId?: string;
  testSetName?: string;
  target?: TestExecutionTarget;
  apiMode?: TestExecutionApiMode;
  testExecutionModality?: TestExecutionModality;
}
export const TestExecutionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testExecutionId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    testExecutionStatus: S.optional(TestExecutionStatus),
    testSetId: S.optional(S.String),
    testSetName: S.optional(S.String),
    target: S.optional(TestExecutionTarget),
    apiMode: S.optional(TestExecutionApiMode),
    testExecutionModality: S.optional(TestExecutionModality),
  }),
).annotate({
  identifier: "TestExecutionSummary",
}) as any as S.Schema<TestExecutionSummary>;
export type TestExecutionSummaryList = TestExecutionSummary[];
export const TestExecutionSummaryList =
  /*@__PURE__*/ S.Array(TestExecutionSummary);
export interface ListTestExecutionsResponse {
  testExecutions?: TestExecutionSummary[];
  nextToken?: string;
}
export const ListTestExecutionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testExecutions: S.optional(TestExecutionSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTestExecutionsResponse",
}) as any as S.Schema<ListTestExecutionsResponse>;
export interface ListTestSetRecordsRequest {
  testSetId: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListTestSetRecordsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSetId: S.String.pipe(T.HttpLabel("testSetId")),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/testsets/{testSetId}/records" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTestSetRecordsRequest",
}) as any as S.Schema<ListTestSetRecordsRequest>;
export type TurnNumber = number;
export interface AgentTurnSpecification {
  agentPrompt: string;
}
export const AgentTurnSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ agentPrompt: S.String }),
).annotate({
  identifier: "AgentTurnSpecification",
}) as any as S.Schema<AgentTurnSpecification>;
export interface UserTurnSpecification {
  input: UserTurnInputSpecification;
  expected: UserTurnOutputSpecification;
}
export const UserTurnSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    input: UserTurnInputSpecification,
    expected: UserTurnOutputSpecification,
  }),
).annotate({
  identifier: "UserTurnSpecification",
}) as any as S.Schema<UserTurnSpecification>;
export interface TurnSpecification {
  agentTurn?: AgentTurnSpecification;
  userTurn?: UserTurnSpecification;
}
export const TurnSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    agentTurn: S.optional(AgentTurnSpecification),
    userTurn: S.optional(UserTurnSpecification),
  }),
).annotate({
  identifier: "TurnSpecification",
}) as any as S.Schema<TurnSpecification>;
export interface TestSetTurnRecord {
  recordNumber: number;
  conversationId?: string;
  turnNumber?: number;
  turnSpecification: TurnSpecification;
}
export const TestSetTurnRecord = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    recordNumber: S.Number,
    conversationId: S.optional(S.String),
    turnNumber: S.optional(S.Number),
    turnSpecification: TurnSpecification,
  }),
).annotate({
  identifier: "TestSetTurnRecord",
}) as any as S.Schema<TestSetTurnRecord>;
export type TestSetTurnRecordList = TestSetTurnRecord[];
export const TestSetTurnRecordList = /*@__PURE__*/ S.Array(TestSetTurnRecord);
export interface ListTestSetRecordsResponse {
  testSetRecords?: TestSetTurnRecord[];
  nextToken?: string;
}
export const ListTestSetRecordsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSetRecords: S.optional(TestSetTurnRecordList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTestSetRecordsResponse",
}) as any as S.Schema<ListTestSetRecordsResponse>;
export type TestSetSortAttribute =
  | "TestSetName"
  | "LastUpdatedDateTime"
  | (string & {});
export const TestSetSortAttribute = S.String;

export interface TestSetSortBy {
  attribute: TestSetSortAttribute;
  order: SortOrder;
}
export const TestSetSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ attribute: TestSetSortAttribute, order: SortOrder }),
).annotate({ identifier: "TestSetSortBy" }) as any as S.Schema<TestSetSortBy>;
export interface ListTestSetsRequest {
  sortBy?: TestSetSortBy;
  maxResults?: number;
  nextToken?: string;
}
export const ListTestSetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sortBy: S.optional(TestSetSortBy),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/testsets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTestSetsRequest",
}) as any as S.Schema<ListTestSetsRequest>;
export interface TestSetSummary {
  testSetId?: string;
  testSetName?: string;
  description?: string;
  modality?: TestSetModality;
  status?: TestSetStatus;
  roleArn?: string;
  numTurns?: number;
  storageLocation?: TestSetStorageLocation;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const TestSetSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSetId: S.optional(S.String),
    testSetName: S.optional(S.String),
    description: S.optional(S.String),
    modality: S.optional(TestSetModality),
    status: S.optional(TestSetStatus),
    roleArn: S.optional(S.String),
    numTurns: S.optional(S.Number),
    storageLocation: S.optional(TestSetStorageLocation),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({ identifier: "TestSetSummary" }) as any as S.Schema<TestSetSummary>;
export type TestSetSummaryList = TestSetSummary[];
export const TestSetSummaryList = /*@__PURE__*/ S.Array(TestSetSummary);
export interface ListTestSetsResponse {
  testSets?: TestSetSummary[];
  nextToken?: string;
}
export const ListTestSetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSets: S.optional(TestSetSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTestSetsResponse",
}) as any as S.Schema<ListTestSetsResponse>;
export type AnalyticsUtteranceSortByName = "UtteranceTimestamp" | (string & {});
export const AnalyticsUtteranceSortByName = S.String;

export interface UtteranceDataSortBy {
  name: AnalyticsUtteranceSortByName;
  order: AnalyticsSortOrder;
}
export const UtteranceDataSortBy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: AnalyticsUtteranceSortByName, order: AnalyticsSortOrder }),
).annotate({
  identifier: "UtteranceDataSortBy",
}) as any as S.Schema<UtteranceDataSortBy>;
export type AnalyticsUtteranceFilterName =
  | "BotAliasId"
  | "BotVersion"
  | "LocaleId"
  | "Modality"
  | "Channel"
  | "SessionId"
  | "OriginatingRequestId"
  | "UtteranceState"
  | "UtteranceText"
  | (string & {});
export const AnalyticsUtteranceFilterName = S.String;

export interface AnalyticsUtteranceFilter {
  name: AnalyticsUtteranceFilterName;
  operator: AnalyticsFilterOperator;
  values: string[];
}
export const AnalyticsUtteranceFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: AnalyticsUtteranceFilterName,
    operator: AnalyticsFilterOperator,
    values: AnalyticsFilterValues,
  }),
).annotate({
  identifier: "AnalyticsUtteranceFilter",
}) as any as S.Schema<AnalyticsUtteranceFilter>;
export type AnalyticsUtteranceFilters = AnalyticsUtteranceFilter[];
export const AnalyticsUtteranceFilters = /*@__PURE__*/ S.Array(
  AnalyticsUtteranceFilter,
);
export interface ListUtteranceAnalyticsDataRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  sortBy?: UtteranceDataSortBy;
  filters?: AnalyticsUtteranceFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListUtteranceAnalyticsDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    startDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    sortBy: S.optional(UtteranceDataSortBy),
    filters: S.optional(AnalyticsUtteranceFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots/{botId}/analytics/utterances" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListUtteranceAnalyticsDataRequest",
}) as any as S.Schema<ListUtteranceAnalyticsDataRequest>;
export type UtteranceUnderstood = boolean;
export type IntentState =
  | "Failed"
  | "Fulfilled"
  | "InProgress"
  | "ReadyForFulfillment"
  | "Waiting"
  | "FulfillmentInProgress"
  | (string & {});
export const IntentState = S.String;

export type UtteranceContentType =
  | "PlainText"
  | "CustomPayload"
  | "SSML"
  | "ImageResponseCard"
  | (string & {});
export const UtteranceContentType = S.String;

export interface UtteranceBotResponse {
  content?: string;
  contentType?: UtteranceContentType;
  imageResponseCard?: ImageResponseCard;
}
export const UtteranceBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    content: S.optional(S.String),
    contentType: S.optional(UtteranceContentType),
    imageResponseCard: S.optional(ImageResponseCard),
  }),
).annotate({
  identifier: "UtteranceBotResponse",
}) as any as S.Schema<UtteranceBotResponse>;
export type UtteranceBotResponses = UtteranceBotResponse[];
export const UtteranceBotResponses =
  /*@__PURE__*/ S.Array(UtteranceBotResponse);
export interface UtteranceSpecification {
  botAliasId?: string;
  botVersion?: string;
  localeId?: string;
  sessionId?: string;
  channel?: string;
  mode?: AnalyticsModality;
  conversationStartTime?: Date;
  conversationEndTime?: Date;
  utterance?: string;
  utteranceTimestamp?: Date;
  audioVoiceDurationMillis?: number;
  utteranceUnderstood?: boolean;
  inputType?: string;
  outputType?: string;
  associatedIntentName?: string;
  associatedSlotName?: string;
  intentState?: IntentState;
  dialogActionType?: string;
  botResponseAudioVoiceId?: string;
  slotsFilledInSession?: string;
  utteranceRequestId?: string;
  botResponses?: UtteranceBotResponse[];
}
export const UtteranceSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    sessionId: S.optional(S.String),
    channel: S.optional(S.String),
    mode: S.optional(AnalyticsModality),
    conversationStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    conversationEndTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    utterance: S.optional(S.String),
    utteranceTimestamp: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    audioVoiceDurationMillis: S.optional(S.Number),
    utteranceUnderstood: S.optional(S.Boolean),
    inputType: S.optional(S.String),
    outputType: S.optional(S.String),
    associatedIntentName: S.optional(S.String),
    associatedSlotName: S.optional(S.String),
    intentState: S.optional(IntentState),
    dialogActionType: S.optional(S.String),
    botResponseAudioVoiceId: S.optional(S.String),
    slotsFilledInSession: S.optional(S.String),
    utteranceRequestId: S.optional(S.String),
    botResponses: S.optional(UtteranceBotResponses),
  }),
).annotate({
  identifier: "UtteranceSpecification",
}) as any as S.Schema<UtteranceSpecification>;
export type UtteranceSpecifications = UtteranceSpecification[];
export const UtteranceSpecifications = /*@__PURE__*/ S.Array(
  UtteranceSpecification,
);
export interface ListUtteranceAnalyticsDataResponse {
  botId?: string;
  nextToken?: string;
  utterances?: UtteranceSpecification[];
}
export const ListUtteranceAnalyticsDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    nextToken: S.optional(S.String),
    utterances: S.optional(UtteranceSpecifications),
  }),
).annotate({
  identifier: "ListUtteranceAnalyticsDataResponse",
}) as any as S.Schema<ListUtteranceAnalyticsDataResponse>;
export type AnalyticsUtteranceMetricName =
  | "Count"
  | "Missed"
  | "Detected"
  | "UtteranceTimestamp"
  | (string & {});
export const AnalyticsUtteranceMetricName = S.String;

export interface AnalyticsUtteranceMetric {
  name: AnalyticsUtteranceMetricName;
  statistic: AnalyticsMetricStatistic;
  order?: AnalyticsSortOrder;
}
export const AnalyticsUtteranceMetric = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: AnalyticsUtteranceMetricName,
    statistic: AnalyticsMetricStatistic,
    order: S.optional(AnalyticsSortOrder),
  }),
).annotate({
  identifier: "AnalyticsUtteranceMetric",
}) as any as S.Schema<AnalyticsUtteranceMetric>;
export type AnalyticsUtteranceMetrics = AnalyticsUtteranceMetric[];
export const AnalyticsUtteranceMetrics = /*@__PURE__*/ S.Array(
  AnalyticsUtteranceMetric,
);
export type AnalyticsUtteranceField =
  | "UtteranceText"
  | "UtteranceState"
  | (string & {});
export const AnalyticsUtteranceField = S.String;

export interface AnalyticsUtteranceGroupBySpecification {
  name: AnalyticsUtteranceField;
}
export const AnalyticsUtteranceGroupBySpecification = /*@__PURE__*/ S.suspend(
  () => S.Struct({ name: AnalyticsUtteranceField }),
).annotate({
  identifier: "AnalyticsUtteranceGroupBySpecification",
}) as any as S.Schema<AnalyticsUtteranceGroupBySpecification>;
export type AnalyticsUtteranceGroupByList =
  AnalyticsUtteranceGroupBySpecification[];
export const AnalyticsUtteranceGroupByList = /*@__PURE__*/ S.Array(
  AnalyticsUtteranceGroupBySpecification,
);
export type AnalyticsUtteranceAttributeName = "LastUsedIntent" | (string & {});
export const AnalyticsUtteranceAttributeName = S.String;

export interface AnalyticsUtteranceAttribute {
  name: AnalyticsUtteranceAttributeName;
}
export const AnalyticsUtteranceAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: AnalyticsUtteranceAttributeName }),
).annotate({
  identifier: "AnalyticsUtteranceAttribute",
}) as any as S.Schema<AnalyticsUtteranceAttribute>;
export type AnalyticsUtteranceAttributes = AnalyticsUtteranceAttribute[];
export const AnalyticsUtteranceAttributes = /*@__PURE__*/ S.Array(
  AnalyticsUtteranceAttribute,
);
export interface ListUtteranceMetricsRequest {
  botId: string;
  startDateTime: Date;
  endDateTime: Date;
  metrics: AnalyticsUtteranceMetric[];
  binBy?: AnalyticsBinBySpecification[];
  groupBy?: AnalyticsUtteranceGroupBySpecification[];
  attributes?: AnalyticsUtteranceAttribute[];
  filters?: AnalyticsUtteranceFilter[];
  maxResults?: number;
  nextToken?: string;
}
export const ListUtteranceMetricsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    startDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    endDateTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    metrics: AnalyticsUtteranceMetrics,
    binBy: S.optional(AnalyticsBinByList),
    groupBy: S.optional(AnalyticsUtteranceGroupByList),
    attributes: S.optional(AnalyticsUtteranceAttributes),
    filters: S.optional(AnalyticsUtteranceFilters),
    maxResults: S.optional(S.Number),
    nextToken: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/analytics/utterancemetrics",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListUtteranceMetricsRequest",
}) as any as S.Schema<ListUtteranceMetricsRequest>;
export interface AnalyticsUtteranceGroupByKey {
  name?: AnalyticsUtteranceField;
  value?: string;
}
export const AnalyticsUtteranceGroupByKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(AnalyticsUtteranceField),
    value: S.optional(S.String),
  }),
).annotate({
  identifier: "AnalyticsUtteranceGroupByKey",
}) as any as S.Schema<AnalyticsUtteranceGroupByKey>;
export type AnalyticsUtteranceGroupByKeys = AnalyticsUtteranceGroupByKey[];
export const AnalyticsUtteranceGroupByKeys = /*@__PURE__*/ S.Array(
  AnalyticsUtteranceGroupByKey,
);
export interface AnalyticsUtteranceMetricResult {
  name?: AnalyticsUtteranceMetricName;
  statistic?: AnalyticsMetricStatistic;
  value?: number;
}
export const AnalyticsUtteranceMetricResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(AnalyticsUtteranceMetricName),
    statistic: S.optional(AnalyticsMetricStatistic),
    value: S.optional(S.Number),
  }),
).annotate({
  identifier: "AnalyticsUtteranceMetricResult",
}) as any as S.Schema<AnalyticsUtteranceMetricResult>;
export type AnalyticsUtteranceMetricResults = AnalyticsUtteranceMetricResult[];
export const AnalyticsUtteranceMetricResults = /*@__PURE__*/ S.Array(
  AnalyticsUtteranceMetricResult,
);
export interface AnalyticsUtteranceAttributeResult {
  lastUsedIntent?: string;
}
export const AnalyticsUtteranceAttributeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ lastUsedIntent: S.optional(S.String) }),
).annotate({
  identifier: "AnalyticsUtteranceAttributeResult",
}) as any as S.Schema<AnalyticsUtteranceAttributeResult>;
export type AnalyticsUtteranceAttributeResults =
  AnalyticsUtteranceAttributeResult[];
export const AnalyticsUtteranceAttributeResults = /*@__PURE__*/ S.Array(
  AnalyticsUtteranceAttributeResult,
);
export interface AnalyticsUtteranceResult {
  binKeys?: AnalyticsBinKey[];
  groupByKeys?: AnalyticsUtteranceGroupByKey[];
  metricsResults?: AnalyticsUtteranceMetricResult[];
  attributeResults?: AnalyticsUtteranceAttributeResult[];
}
export const AnalyticsUtteranceResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    binKeys: S.optional(AnalyticsBinKeys),
    groupByKeys: S.optional(AnalyticsUtteranceGroupByKeys),
    metricsResults: S.optional(AnalyticsUtteranceMetricResults),
    attributeResults: S.optional(AnalyticsUtteranceAttributeResults),
  }),
).annotate({
  identifier: "AnalyticsUtteranceResult",
}) as any as S.Schema<AnalyticsUtteranceResult>;
export type AnalyticsUtteranceResults = AnalyticsUtteranceResult[];
export const AnalyticsUtteranceResults = /*@__PURE__*/ S.Array(
  AnalyticsUtteranceResult,
);
export interface ListUtteranceMetricsResponse {
  botId?: string;
  results?: AnalyticsUtteranceResult[];
  nextToken?: string;
}
export const ListUtteranceMetricsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    results: S.optional(AnalyticsUtteranceResults),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListUtteranceMetricsResponse",
}) as any as S.Schema<ListUtteranceMetricsResponse>;
export type SearchOrder = "Ascending" | "Descending" | (string & {});
export const SearchOrder = S.String;

export type AssociatedTranscriptFilterName =
  | "IntentId"
  | "SlotTypeId"
  | (string & {});
export const AssociatedTranscriptFilterName = S.String;

export interface AssociatedTranscriptFilter {
  name: AssociatedTranscriptFilterName;
  values: string[];
}
export const AssociatedTranscriptFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: AssociatedTranscriptFilterName, values: FilterValues }),
).annotate({
  identifier: "AssociatedTranscriptFilter",
}) as any as S.Schema<AssociatedTranscriptFilter>;
export type AssociatedTranscriptFilters = AssociatedTranscriptFilter[];
export const AssociatedTranscriptFilters = /*@__PURE__*/ S.Array(
  AssociatedTranscriptFilter,
);
export type NextIndex = number;
export interface SearchAssociatedTranscriptsRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  botRecommendationId: string;
  searchOrder?: SearchOrder;
  filters: AssociatedTranscriptFilter[];
  maxResults?: number;
  nextIndex?: number;
}
export const SearchAssociatedTranscriptsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    botRecommendationId: S.String.pipe(T.HttpLabel("botRecommendationId")),
    searchOrder: S.optional(SearchOrder),
    filters: AssociatedTranscriptFilters,
    maxResults: S.optional(S.Number),
    nextIndex: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations/{botRecommendationId}/associatedtranscripts",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchAssociatedTranscriptsRequest",
}) as any as S.Schema<SearchAssociatedTranscriptsRequest>;
export type Transcript = string;
export interface AssociatedTranscript {
  transcript?: string;
}
export const AssociatedTranscript = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ transcript: S.optional(S.String) }),
).annotate({
  identifier: "AssociatedTranscript",
}) as any as S.Schema<AssociatedTranscript>;
export type AssociatedTranscriptList = AssociatedTranscript[];
export const AssociatedTranscriptList =
  /*@__PURE__*/ S.Array(AssociatedTranscript);
export interface SearchAssociatedTranscriptsResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationId?: string;
  nextIndex?: number;
  associatedTranscripts?: AssociatedTranscript[];
  totalResults?: number;
}
export const SearchAssociatedTranscriptsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    botRecommendationId: S.optional(S.String),
    nextIndex: S.optional(S.Number),
    associatedTranscripts: S.optional(AssociatedTranscriptList),
    totalResults: S.optional(S.Number),
  }),
).annotate({
  identifier: "SearchAssociatedTranscriptsResponse",
}) as any as S.Schema<SearchAssociatedTranscriptsResponse>;
export type AnalysisScope = "BotLocale" | (string & {});
export const AnalysisScope = S.String;

export interface StartBotAnalyzerRequest {
  botId: string;
  analysisScope: AnalysisScope;
  localeId?: string;
  botVersion?: string;
}
export const StartBotAnalyzerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    analysisScope: AnalysisScope,
    localeId: S.optional(S.String),
    botVersion: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/bots/{botId}/botanalyzer" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartBotAnalyzerRequest",
}) as any as S.Schema<StartBotAnalyzerRequest>;
export interface StartBotAnalyzerResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botAnalyzerStatus?: BotAnalyzerStatus;
  botAnalyzerRequestId?: string;
  creationDateTime?: Date;
}
export const StartBotAnalyzerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    botAnalyzerStatus: S.optional(BotAnalyzerStatus),
    botAnalyzerRequestId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "StartBotAnalyzerResponse",
}) as any as S.Schema<StartBotAnalyzerResponse>;
export interface StartBotRecommendationRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  transcriptSourceSetting: TranscriptSourceSetting;
  encryptionSetting?: EncryptionSetting;
}
export const StartBotRecommendationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    transcriptSourceSetting: TranscriptSourceSetting,
    encryptionSetting: S.optional(EncryptionSetting),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartBotRecommendationRequest",
}) as any as S.Schema<StartBotRecommendationRequest>;
export interface StartBotRecommendationResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationStatus?: BotRecommendationStatus;
  botRecommendationId?: string;
  creationDateTime?: Date;
  transcriptSourceSetting?: TranscriptSourceSetting;
  encryptionSetting?: EncryptionSetting;
}
export const StartBotRecommendationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    botRecommendationStatus: S.optional(BotRecommendationStatus),
    botRecommendationId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    transcriptSourceSetting: S.optional(TranscriptSourceSetting),
    encryptionSetting: S.optional(EncryptionSetting),
  }),
).annotate({
  identifier: "StartBotRecommendationResponse",
}) as any as S.Schema<StartBotRecommendationResponse>;
export interface StartBotResourceGenerationRequest {
  generationInputPrompt: string;
  botId: string;
  botVersion: string;
  localeId: string;
}
export const StartBotResourceGenerationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    generationInputPrompt: S.String,
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/startgeneration",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartBotResourceGenerationRequest",
}) as any as S.Schema<StartBotResourceGenerationRequest>;
export interface StartBotResourceGenerationResponse {
  generationInputPrompt?: string;
  generationId?: string;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  generationStatus?: GenerationStatus;
  creationDateTime?: Date;
}
export const StartBotResourceGenerationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    generationInputPrompt: S.optional(S.String),
    generationId: S.optional(S.String),
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    generationStatus: S.optional(GenerationStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "StartBotResourceGenerationResponse",
}) as any as S.Schema<StartBotResourceGenerationResponse>;
export interface StartImportRequest {
  importId: string;
  resourceSpecification: ImportResourceSpecification;
  mergeStrategy: MergeStrategy;
  filePassword?: string | redacted.Redacted<string>;
}
export const StartImportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importId: S.String,
    resourceSpecification: ImportResourceSpecification,
    mergeStrategy: MergeStrategy,
    filePassword: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/imports" }),
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
  importId?: string;
  resourceSpecification?: ImportResourceSpecification;
  mergeStrategy?: MergeStrategy;
  importStatus?: ImportStatus;
  creationDateTime?: Date;
}
export const StartImportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    importId: S.optional(S.String),
    resourceSpecification: S.optional(ImportResourceSpecification),
    mergeStrategy: S.optional(MergeStrategy),
    importStatus: S.optional(ImportStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "StartImportResponse",
}) as any as S.Schema<StartImportResponse>;
export interface StartTestExecutionRequest {
  testSetId: string;
  target: TestExecutionTarget;
  apiMode: TestExecutionApiMode;
  testExecutionModality?: TestExecutionModality;
}
export const StartTestExecutionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSetId: S.String.pipe(T.HttpLabel("testSetId")),
    target: TestExecutionTarget,
    apiMode: TestExecutionApiMode,
    testExecutionModality: S.optional(TestExecutionModality),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/testsets/{testSetId}/testexecutions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTestExecutionRequest",
}) as any as S.Schema<StartTestExecutionRequest>;
export interface StartTestExecutionResponse {
  testExecutionId?: string;
  creationDateTime?: Date;
  testSetId?: string;
  target?: TestExecutionTarget;
  apiMode?: TestExecutionApiMode;
  testExecutionModality?: TestExecutionModality;
}
export const StartTestExecutionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testExecutionId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    testSetId: S.optional(S.String),
    target: S.optional(TestExecutionTarget),
    apiMode: S.optional(TestExecutionApiMode),
    testExecutionModality: S.optional(TestExecutionModality),
  }),
).annotate({
  identifier: "StartTestExecutionResponse",
}) as any as S.Schema<StartTestExecutionResponse>;
export interface StartTestSetGenerationRequest {
  testSetName: string;
  description?: string;
  storageLocation: TestSetStorageLocation;
  generationDataSource: TestSetGenerationDataSource;
  roleArn: string;
  testSetTags?: { [key: string]: string | undefined };
}
export const StartTestSetGenerationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSetName: S.String,
    description: S.optional(S.String),
    storageLocation: TestSetStorageLocation,
    generationDataSource: TestSetGenerationDataSource,
    roleArn: S.String,
    testSetTags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/testsetgenerations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTestSetGenerationRequest",
}) as any as S.Schema<StartTestSetGenerationRequest>;
export interface StartTestSetGenerationResponse {
  testSetGenerationId?: string;
  creationDateTime?: Date;
  testSetGenerationStatus?: TestSetGenerationStatus;
  testSetName?: string;
  description?: string;
  storageLocation?: TestSetStorageLocation;
  generationDataSource?: TestSetGenerationDataSource;
  roleArn?: string;
  testSetTags?: { [key: string]: string | undefined };
}
export const StartTestSetGenerationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSetGenerationId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    testSetGenerationStatus: S.optional(TestSetGenerationStatus),
    testSetName: S.optional(S.String),
    description: S.optional(S.String),
    storageLocation: S.optional(TestSetStorageLocation),
    generationDataSource: S.optional(TestSetGenerationDataSource),
    roleArn: S.optional(S.String),
    testSetTags: S.optional(TagMap),
  }),
).annotate({
  identifier: "StartTestSetGenerationResponse",
}) as any as S.Schema<StartTestSetGenerationResponse>;
export interface StopBotAnalyzerRequest {
  botId: string;
  botAnalyzerRequestId: string;
}
export const StopBotAnalyzerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botAnalyzerRequestId: S.String.pipe(T.HttpLabel("botAnalyzerRequestId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botanalyzer/{botAnalyzerRequestId}/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopBotAnalyzerRequest",
}) as any as S.Schema<StopBotAnalyzerRequest>;
export interface StopBotAnalyzerResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botAnalyzerStatus?: BotAnalyzerStatus;
  botAnalyzerRequestId?: string;
}
export const StopBotAnalyzerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    botAnalyzerStatus: S.optional(BotAnalyzerStatus),
    botAnalyzerRequestId: S.optional(S.String),
  }),
).annotate({
  identifier: "StopBotAnalyzerResponse",
}) as any as S.Schema<StopBotAnalyzerResponse>;
export interface StopBotRecommendationRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  botRecommendationId: string;
}
export const StopBotRecommendationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    botRecommendationId: S.String.pipe(T.HttpLabel("botRecommendationId")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations/{botRecommendationId}/stopbotrecommendation",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopBotRecommendationRequest",
}) as any as S.Schema<StopBotRecommendationRequest>;
export interface StopBotRecommendationResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationStatus?: BotRecommendationStatus;
  botRecommendationId?: string;
}
export const StopBotRecommendationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    botRecommendationStatus: S.optional(BotRecommendationStatus),
    botRecommendationId: S.optional(S.String),
  }),
).annotate({
  identifier: "StopBotRecommendationResponse",
}) as any as S.Schema<StopBotRecommendationResponse>;
export interface TagResourceRequest {
  resourceARN: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceARN: S.String.pipe(T.HttpLabel("resourceARN")),
    tags: TagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceARN}" }),
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
  resourceARN: string;
  tagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceARN: S.String.pipe(T.HttpLabel("resourceARN")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceARN}" }),
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
export interface UpdateBotRequest {
  botId: string;
  botName: string;
  description?: string;
  roleArn: string;
  dataPrivacy: DataPrivacy;
  idleSessionTTLInSeconds: number;
  botType?: BotType;
  botMembers?: BotMember[];
  errorLogSettings?: ErrorLogSettings;
}
export const UpdateBotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botName: S.String,
    description: S.optional(S.String),
    roleArn: S.String,
    dataPrivacy: DataPrivacy,
    idleSessionTTLInSeconds: S.Number,
    botType: S.optional(BotType),
    botMembers: S.optional(BotMembers),
    errorLogSettings: S.optional(ErrorLogSettings),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/bots/{botId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBotRequest",
}) as any as S.Schema<UpdateBotRequest>;
export interface UpdateBotResponse {
  botId?: string;
  botName?: string;
  description?: string;
  roleArn?: string;
  dataPrivacy?: DataPrivacy;
  idleSessionTTLInSeconds?: number;
  botStatus?: BotStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  botType?: BotType;
  botMembers?: BotMember[];
  errorLogSettings?: ErrorLogSettings;
}
export const UpdateBotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botName: S.optional(S.String),
    description: S.optional(S.String),
    roleArn: S.optional(S.String),
    dataPrivacy: S.optional(DataPrivacy),
    idleSessionTTLInSeconds: S.optional(S.Number),
    botStatus: S.optional(BotStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    botType: S.optional(BotType),
    botMembers: S.optional(BotMembers),
    errorLogSettings: S.optional(ErrorLogSettings),
  }),
).annotate({
  identifier: "UpdateBotResponse",
}) as any as S.Schema<UpdateBotResponse>;
export interface UpdateBotAliasRequest {
  botAliasId: string;
  botAliasName: string;
  description?: string;
  botVersion?: string;
  botAliasLocaleSettings?: {
    [key: string]: BotAliasLocaleSettings | undefined;
  };
  conversationLogSettings?: ConversationLogSettings;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
  botId: string;
}
export const UpdateBotAliasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasId: S.String.pipe(T.HttpLabel("botAliasId")),
    botAliasName: S.String,
    description: S.optional(S.String),
    botVersion: S.optional(S.String),
    botAliasLocaleSettings: S.optional(BotAliasLocaleSettingsMap),
    conversationLogSettings: S.optional(ConversationLogSettings),
    sentimentAnalysisSettings: S.optional(SentimentAnalysisSettings),
    botId: S.String.pipe(T.HttpLabel("botId")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/bots/{botId}/botaliases/{botAliasId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBotAliasRequest",
}) as any as S.Schema<UpdateBotAliasRequest>;
export interface UpdateBotAliasResponse {
  botAliasId?: string;
  botAliasName?: string;
  description?: string;
  botVersion?: string;
  botAliasLocaleSettings?: {
    [key: string]: BotAliasLocaleSettings | undefined;
  };
  conversationLogSettings?: ConversationLogSettings;
  sentimentAnalysisSettings?: SentimentAnalysisSettings;
  botAliasStatus?: BotAliasStatus;
  botId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const UpdateBotAliasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botAliasId: S.optional(S.String),
    botAliasName: S.optional(S.String),
    description: S.optional(S.String),
    botVersion: S.optional(S.String),
    botAliasLocaleSettings: S.optional(BotAliasLocaleSettingsMap),
    conversationLogSettings: S.optional(ConversationLogSettings),
    sentimentAnalysisSettings: S.optional(SentimentAnalysisSettings),
    botAliasStatus: S.optional(BotAliasStatus),
    botId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "UpdateBotAliasResponse",
}) as any as S.Schema<UpdateBotAliasResponse>;
export interface UpdateBotLocaleRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  description?: string;
  nluIntentConfidenceThreshold: number;
  voiceSettings?: VoiceSettings;
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  audioFillerSettings?: AudioFillerSettings;
  speechRecognitionSettings?: SpeechRecognitionSettings;
  generativeAISettings?: GenerativeAISettings;
  speechDetectionSensitivity?: SpeechDetectionSensitivity;
}
export const UpdateBotLocaleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    description: S.optional(S.String),
    nluIntentConfidenceThreshold: S.Number,
    voiceSettings: S.optional(VoiceSettings),
    unifiedSpeechSettings: S.optional(UnifiedSpeechSettings),
    audioFillerSettings: S.optional(AudioFillerSettings),
    speechRecognitionSettings: S.optional(SpeechRecognitionSettings),
    generativeAISettings: S.optional(GenerativeAISettings),
    speechDetectionSensitivity: S.optional(SpeechDetectionSensitivity),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBotLocaleRequest",
}) as any as S.Schema<UpdateBotLocaleRequest>;
export interface UpdateBotLocaleResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  localeName?: string;
  description?: string;
  nluIntentConfidenceThreshold?: number;
  voiceSettings?: VoiceSettings;
  unifiedSpeechSettings?: UnifiedSpeechSettings;
  audioFillerSettings?: AudioFillerSettings;
  speechRecognitionSettings?: SpeechRecognitionSettings;
  botLocaleStatus?: BotLocaleStatus;
  failureReasons?: string[];
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  recommendedActions?: string[];
  generativeAISettings?: GenerativeAISettings;
  speechDetectionSensitivity?: SpeechDetectionSensitivity;
}
export const UpdateBotLocaleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    localeName: S.optional(S.String),
    description: S.optional(S.String),
    nluIntentConfidenceThreshold: S.optional(S.Number),
    voiceSettings: S.optional(VoiceSettings),
    unifiedSpeechSettings: S.optional(UnifiedSpeechSettings),
    audioFillerSettings: S.optional(AudioFillerSettings),
    speechRecognitionSettings: S.optional(SpeechRecognitionSettings),
    botLocaleStatus: S.optional(BotLocaleStatus),
    failureReasons: S.optional(FailureReasons),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    recommendedActions: S.optional(RecommendedActions),
    generativeAISettings: S.optional(GenerativeAISettings),
    speechDetectionSensitivity: S.optional(SpeechDetectionSensitivity),
  }),
).annotate({
  identifier: "UpdateBotLocaleResponse",
}) as any as S.Schema<UpdateBotLocaleResponse>;
export interface UpdateBotRecommendationRequest {
  botId: string;
  botVersion: string;
  localeId: string;
  botRecommendationId: string;
  encryptionSetting: EncryptionSetting;
}
export const UpdateBotRecommendationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    botRecommendationId: S.String.pipe(T.HttpLabel("botRecommendationId")),
    encryptionSetting: EncryptionSetting,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/botrecommendations/{botRecommendationId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateBotRecommendationRequest",
}) as any as S.Schema<UpdateBotRecommendationRequest>;
export interface UpdateBotRecommendationResponse {
  botId?: string;
  botVersion?: string;
  localeId?: string;
  botRecommendationStatus?: BotRecommendationStatus;
  botRecommendationId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  transcriptSourceSetting?: TranscriptSourceSetting;
  encryptionSetting?: EncryptionSetting;
}
export const UpdateBotRecommendationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    botRecommendationStatus: S.optional(BotRecommendationStatus),
    botRecommendationId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    transcriptSourceSetting: S.optional(TranscriptSourceSetting),
    encryptionSetting: S.optional(EncryptionSetting),
  }),
).annotate({
  identifier: "UpdateBotRecommendationResponse",
}) as any as S.Schema<UpdateBotRecommendationResponse>;
export interface UpdateExportRequest {
  exportId: string;
  filePassword?: string | redacted.Redacted<string>;
}
export const UpdateExportRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportId: S.String.pipe(T.HttpLabel("exportId")),
    filePassword: S.optional(SensitiveString),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/exports/{exportId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateExportRequest",
}) as any as S.Schema<UpdateExportRequest>;
export interface UpdateExportResponse {
  exportId?: string;
  resourceSpecification?: ExportResourceSpecification;
  fileFormat?: ImportExportFileFormat;
  exportStatus?: ExportStatus;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const UpdateExportResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    exportId: S.optional(S.String),
    resourceSpecification: S.optional(ExportResourceSpecification),
    fileFormat: S.optional(ImportExportFileFormat),
    exportStatus: S.optional(ExportStatus),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "UpdateExportResponse",
}) as any as S.Schema<UpdateExportResponse>;
export interface UpdateIntentRequest {
  intentId: string;
  intentName: string;
  intentDisplayName?: string;
  description?: string;
  parentIntentSignature?: string;
  sampleUtterances?: SampleUtterance[];
  dialogCodeHook?: DialogCodeHookSettings;
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  slotPriorities?: SlotPriority[];
  intentConfirmationSetting?: IntentConfirmationSetting;
  intentClosingSetting?: IntentClosingSetting;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
  kendraConfiguration?: KendraConfiguration;
  botId: string;
  botVersion: string;
  localeId: string;
  initialResponseSetting?: InitialResponseSetting;
  qnAIntentConfiguration?: QnAIntentConfiguration;
  qInConnectIntentConfiguration?: QInConnectIntentConfiguration;
}
export const UpdateIntentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentId: S.String.pipe(T.HttpLabel("intentId")),
    intentName: S.String,
    intentDisplayName: S.optional(S.String),
    description: S.optional(S.String),
    parentIntentSignature: S.optional(S.String),
    sampleUtterances: S.optional(SampleUtterancesList),
    dialogCodeHook: S.optional(DialogCodeHookSettings),
    fulfillmentCodeHook: S.optional(FulfillmentCodeHookSettings),
    slotPriorities: S.optional(SlotPrioritiesList),
    intentConfirmationSetting: S.optional(IntentConfirmationSetting),
    intentClosingSetting: S.optional(IntentClosingSetting),
    inputContexts: S.optional(InputContextsList),
    outputContexts: S.optional(OutputContextsList),
    kendraConfiguration: S.optional(KendraConfiguration),
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    initialResponseSetting: S.optional(InitialResponseSetting),
    qnAIntentConfiguration: S.optional(QnAIntentConfiguration),
    qInConnectIntentConfiguration: S.optional(QInConnectIntentConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIntentRequest",
}) as any as S.Schema<UpdateIntentRequest>;
export interface UpdateIntentResponse {
  intentId?: string;
  intentName?: string;
  intentDisplayName?: string;
  description?: string;
  parentIntentSignature?: string;
  sampleUtterances?: SampleUtterance[];
  dialogCodeHook?: DialogCodeHookSettings;
  fulfillmentCodeHook?: FulfillmentCodeHookSettings;
  slotPriorities?: SlotPriority[];
  intentConfirmationSetting?: IntentConfirmationSetting;
  intentClosingSetting?: IntentClosingSetting;
  inputContexts?: InputContext[];
  outputContexts?: OutputContext[];
  kendraConfiguration?: KendraConfiguration;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  initialResponseSetting?: InitialResponseSetting;
  qnAIntentConfiguration?: QnAIntentConfiguration;
  qInConnectIntentConfiguration?: QInConnectIntentConfiguration;
}
export const UpdateIntentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    intentId: S.optional(S.String),
    intentName: S.optional(S.String),
    intentDisplayName: S.optional(S.String),
    description: S.optional(S.String),
    parentIntentSignature: S.optional(S.String),
    sampleUtterances: S.optional(SampleUtterancesList),
    dialogCodeHook: S.optional(DialogCodeHookSettings),
    fulfillmentCodeHook: S.optional(FulfillmentCodeHookSettings),
    slotPriorities: S.optional(SlotPrioritiesList),
    intentConfirmationSetting: S.optional(IntentConfirmationSetting),
    intentClosingSetting: S.optional(IntentClosingSetting),
    inputContexts: S.optional(InputContextsList),
    outputContexts: S.optional(OutputContextsList),
    kendraConfiguration: S.optional(KendraConfiguration),
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    initialResponseSetting: S.optional(InitialResponseSetting),
    qnAIntentConfiguration: S.optional(QnAIntentConfiguration),
    qInConnectIntentConfiguration: S.optional(QInConnectIntentConfiguration),
  }),
).annotate({
  identifier: "UpdateIntentResponse",
}) as any as S.Schema<UpdateIntentResponse>;
export interface UpdateResourcePolicyRequest {
  resourceArn: string;
  policy: string;
  expectedRevisionId?: string;
}
export const UpdateResourcePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    policy: S.String,
    expectedRevisionId: S.optional(S.String).pipe(
      T.HttpQuery("expectedRevisionId"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/policy/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateResourcePolicyRequest",
}) as any as S.Schema<UpdateResourcePolicyRequest>;
export interface UpdateResourcePolicyResponse {
  resourceArn?: string;
  revisionId?: string;
}
export const UpdateResourcePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.optional(S.String),
    revisionId: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateResourcePolicyResponse",
}) as any as S.Schema<UpdateResourcePolicyResponse>;
export interface UpdateSlotRequest {
  slotId: string;
  slotName: string;
  description?: string;
  slotTypeId?: string;
  valueElicitationSetting: SlotValueElicitationSetting;
  obfuscationSetting?: ObfuscationSetting;
  botId: string;
  botVersion: string;
  localeId: string;
  intentId: string;
  multipleValuesSetting?: MultipleValuesSetting;
  subSlotSetting?: SubSlotSetting;
}
export const UpdateSlotRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotId: S.String.pipe(T.HttpLabel("slotId")),
    slotName: S.String,
    description: S.optional(S.String),
    slotTypeId: S.optional(S.String),
    valueElicitationSetting: SlotValueElicitationSetting,
    obfuscationSetting: S.optional(ObfuscationSetting),
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    intentId: S.String.pipe(T.HttpLabel("intentId")),
    multipleValuesSetting: S.optional(MultipleValuesSetting),
    subSlotSetting: S.optional(SubSlotSetting),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/intents/{intentId}/slots/{slotId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSlotRequest",
}) as any as S.Schema<UpdateSlotRequest>;
export interface UpdateSlotResponse {
  slotId?: string;
  slotName?: string;
  description?: string;
  slotTypeId?: string;
  valueElicitationSetting?: SlotValueElicitationSetting;
  obfuscationSetting?: ObfuscationSetting;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  intentId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  multipleValuesSetting?: MultipleValuesSetting;
  subSlotSetting?: SubSlotSetting;
}
export const UpdateSlotResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotId: S.optional(S.String),
    slotName: S.optional(S.String),
    description: S.optional(S.String),
    slotTypeId: S.optional(S.String),
    valueElicitationSetting: S.optional(SlotValueElicitationSetting),
    obfuscationSetting: S.optional(ObfuscationSetting),
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    intentId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    multipleValuesSetting: S.optional(MultipleValuesSetting),
    subSlotSetting: S.optional(SubSlotSetting),
  }),
).annotate({
  identifier: "UpdateSlotResponse",
}) as any as S.Schema<UpdateSlotResponse>;
export interface UpdateSlotTypeRequest {
  slotTypeId: string;
  slotTypeName: string;
  description?: string;
  slotTypeValues?: SlotTypeValue[];
  valueSelectionSetting?: SlotValueSelectionSetting;
  parentSlotTypeSignature?: string;
  botId: string;
  botVersion: string;
  localeId: string;
  externalSourceSetting?: ExternalSourceSetting;
  compositeSlotTypeSetting?: CompositeSlotTypeSetting;
}
export const UpdateSlotTypeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypeId: S.String.pipe(T.HttpLabel("slotTypeId")),
    slotTypeName: S.String,
    description: S.optional(S.String),
    slotTypeValues: S.optional(SlotTypeValues),
    valueSelectionSetting: S.optional(SlotValueSelectionSetting),
    parentSlotTypeSignature: S.optional(S.String),
    botId: S.String.pipe(T.HttpLabel("botId")),
    botVersion: S.String.pipe(T.HttpLabel("botVersion")),
    localeId: S.String.pipe(T.HttpLabel("localeId")),
    externalSourceSetting: S.optional(ExternalSourceSetting),
    compositeSlotTypeSetting: S.optional(CompositeSlotTypeSetting),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/bots/{botId}/botversions/{botVersion}/botlocales/{localeId}/slottypes/{slotTypeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSlotTypeRequest",
}) as any as S.Schema<UpdateSlotTypeRequest>;
export interface UpdateSlotTypeResponse {
  slotTypeId?: string;
  slotTypeName?: string;
  description?: string;
  slotTypeValues?: SlotTypeValue[];
  valueSelectionSetting?: SlotValueSelectionSetting;
  parentSlotTypeSignature?: string;
  botId?: string;
  botVersion?: string;
  localeId?: string;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
  externalSourceSetting?: ExternalSourceSetting;
  compositeSlotTypeSetting?: CompositeSlotTypeSetting;
}
export const UpdateSlotTypeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    slotTypeId: S.optional(S.String),
    slotTypeName: S.optional(S.String),
    description: S.optional(S.String),
    slotTypeValues: S.optional(SlotTypeValues),
    valueSelectionSetting: S.optional(SlotValueSelectionSetting),
    parentSlotTypeSignature: S.optional(S.String),
    botId: S.optional(S.String),
    botVersion: S.optional(S.String),
    localeId: S.optional(S.String),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    externalSourceSetting: S.optional(ExternalSourceSetting),
    compositeSlotTypeSetting: S.optional(CompositeSlotTypeSetting),
  }),
).annotate({
  identifier: "UpdateSlotTypeResponse",
}) as any as S.Schema<UpdateSlotTypeResponse>;
export interface UpdateTestSetRequest {
  testSetId: string;
  testSetName: string;
  description?: string;
}
export const UpdateTestSetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSetId: S.String.pipe(T.HttpLabel("testSetId")),
    testSetName: S.String,
    description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/testsets/{testSetId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateTestSetRequest",
}) as any as S.Schema<UpdateTestSetRequest>;
export interface UpdateTestSetResponse {
  testSetId?: string;
  testSetName?: string;
  description?: string;
  modality?: TestSetModality;
  status?: TestSetStatus;
  roleArn?: string;
  numTurns?: number;
  storageLocation?: TestSetStorageLocation;
  creationDateTime?: Date;
  lastUpdatedDateTime?: Date;
}
export const UpdateTestSetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    testSetId: S.optional(S.String),
    testSetName: S.optional(S.String),
    description: S.optional(S.String),
    modality: S.optional(TestSetModality),
    status: S.optional(TestSetStatus),
    roleArn: S.optional(S.String),
    numTurns: S.optional(S.Number),
    storageLocation: S.optional(TestSetStorageLocation),
    creationDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedDateTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "UpdateTestSetResponse",
}) as any as S.Schema<UpdateTestSetResponse>;
export type ExceptionMessage = string;
export type RetryAfterSeconds = number;
export type BatchCreateCustomVocabularyItemError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a batch of custom vocabulary items for a given bot locale's
 * custom vocabulary.
 */
export const batchCreateCustomVocabularyItem: API.OperationMethod<
  BatchCreateCustomVocabularyItemRequest,
  BatchCreateCustomVocabularyItemResponse,
  BatchCreateCustomVocabularyItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchCreateCustomVocabularyItemRequest,
  output: BatchCreateCustomVocabularyItemResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateCustomVocabularyItem",
}));

export type BatchDeleteCustomVocabularyItemError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a batch of custom vocabulary items for a given bot locale's
 * custom vocabulary.
 */
export const batchDeleteCustomVocabularyItem: API.OperationMethod<
  BatchDeleteCustomVocabularyItemRequest,
  BatchDeleteCustomVocabularyItemResponse,
  BatchDeleteCustomVocabularyItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteCustomVocabularyItemRequest,
  output: BatchDeleteCustomVocabularyItemResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteCustomVocabularyItem",
}));

export type BatchUpdateCustomVocabularyItemError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a batch of custom vocabulary items for a given bot locale's custom
 * vocabulary.
 */
export const batchUpdateCustomVocabularyItem: API.OperationMethod<
  BatchUpdateCustomVocabularyItemRequest,
  BatchUpdateCustomVocabularyItemResponse,
  BatchUpdateCustomVocabularyItemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateCustomVocabularyItemRequest,
  output: BatchUpdateCustomVocabularyItemResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateCustomVocabularyItem",
}));

export type BuildBotLocaleError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Builds a bot, its intents, and its slot types into a specific
 * locale. A bot can be built into multiple locales. At runtime the locale
 * is used to choose a specific build of the bot.
 */
export const buildBotLocale: API.OperationMethod<
  BuildBotLocaleRequest,
  BuildBotLocaleResponse,
  BuildBotLocaleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BuildBotLocaleRequest,
  output: BuildBotLocaleResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BuildBotLocale",
}));

export type CreateBotError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Lex conversational bot.
 */
export const createBot: API.OperationMethod<
  CreateBotRequest,
  CreateBotResponse,
  CreateBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBotRequest,
  output: CreateBotResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBot",
}));

export type CreateBotAliasError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an alias for the specified version of a bot. Use an alias to
 * enable you to change the version of a bot without updating applications
 * that use the bot.
 *
 * For example, you can create an alias called "PROD" that your
 * applications use to call the Amazon Lex bot.
 */
export const createBotAlias: API.OperationMethod<
  CreateBotAliasRequest,
  CreateBotAliasResponse,
  CreateBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBotAliasRequest,
  output: CreateBotAliasResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBotAlias",
}));

export type CreateBotLocaleError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a locale in the bot. The locale contains the intents and
 * slot types that the bot uses in conversations with users in the
 * specified language and locale. You must add a locale to a bot before
 * you can add intents and slot types to the bot.
 */
export const createBotLocale: API.OperationMethod<
  CreateBotLocaleRequest,
  CreateBotLocaleResponse,
  CreateBotLocaleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBotLocaleRequest,
  output: CreateBotLocaleResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBotLocale",
}));

export type CreateBotReplicaError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Action to create a replication of the source bot in the secondary region.
 */
export const createBotReplica: API.OperationMethod<
  CreateBotReplicaRequest,
  CreateBotReplicaResponse,
  CreateBotReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateBotReplicaRequest,
  output: CreateBotReplicaResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBotReplica",
}));

export type CreateBotVersionError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an immutable version of the bot. When you create the first
 * version of a bot, Amazon Lex sets the version number to 1. Subsequent bot versions increase
 * in an increment of 1. The version number will always represent the total number
 * of versions created of the bot, not the current number of versions. If a bot version
 * is deleted, that bot version number will not be reused.
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
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBotVersion",
}));

export type CreateExportError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a zip archive containing the contents of a bot or a bot
 * locale. The archive contains a directory structure that contains JSON
 * files that define the bot.
 *
 * You can create an archive that contains the complete definition of a
 * bot, or you can specify that the archive contain only the definition of
 * a single bot locale.
 *
 * For more information about exporting bots, and about the structure
 * of the export archive, see Importing and
 * exporting bots
 */
export const createExport: API.OperationMethod<
  CreateExportRequest,
  CreateExportResponse,
  CreateExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateExportRequest,
  output: CreateExportResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExport",
}));

export type CreateIntentError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an intent.
 *
 * To define the interaction between the user and your bot, you define
 * one or more intents. For example, for a pizza ordering bot you would
 * create an `OrderPizza` intent.
 *
 * When you create an intent, you must provide a name. You can
 * optionally provide the following:
 *
 * - Sample utterances. For example, "I want to order a pizza" and
 * "Can I order a pizza." You can't provide utterances for built-in
 * intents.
 *
 * - Information to be gathered. You specify slots for the
 * information that you bot requests from the user. You can specify
 * standard slot types, such as date and time, or custom slot types
 * for your application.
 *
 * - How the intent is fulfilled. You can provide a Lambda function
 * or configure the intent to return the intent information to your
 * client application. If you use a Lambda function, Amazon Lex invokes
 * the function when all of the intent information is
 * available.
 *
 * - A confirmation prompt to send to the user to confirm an
 * intent. For example, "Shall I order your pizza?"
 *
 * - A conclusion statement to send to the user after the intent is
 * fulfilled. For example, "I ordered your pizza."
 *
 * - A follow-up prompt that asks the user for additional activity.
 * For example, "Do you want a drink with your pizza?"
 */
export const createIntent: API.OperationMethod<
  CreateIntentRequest,
  CreateIntentResponse,
  CreateIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIntentRequest,
  output: CreateIntentResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIntent",
}));

export type CreateResourcePolicyError =
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new resource policy with the specified policy
 * statements.
 */
export const createResourcePolicy: API.OperationMethod<
  CreateResourcePolicyRequest,
  CreateResourcePolicyResponse,
  CreateResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourcePolicyRequest,
  output: CreateResourcePolicyResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourcePolicy",
}));

export type CreateResourcePolicyStatementError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a new resource policy statement to a bot or bot alias. If a
 * resource policy exists, the statement is added to the current resource
 * policy. If a policy doesn't exist, a new policy is created.
 *
 * You can't create a resource policy statement that allows
 * cross-account access.
 *
 * You need to add the `CreateResourcePolicy` or `UpdateResourcePolicy`
 * action to the bot role in order to call the API.
 */
export const createResourcePolicyStatement: API.OperationMethod<
  CreateResourcePolicyStatementRequest,
  CreateResourcePolicyStatementResponse,
  CreateResourcePolicyStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourcePolicyStatementRequest,
  output: CreateResourcePolicyStatementResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourcePolicyStatement",
}));

export type CreateSlotError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a slot in an intent. A slot is a variable needed to fulfill
 * an intent. For example, an `OrderPizza` intent might need
 * slots for size, crust, and number of pizzas. For each slot, you define
 * one or more utterances that Amazon Lex uses to elicit a response from the
 * user.
 */
export const createSlot: API.OperationMethod<
  CreateSlotRequest,
  CreateSlotResponse,
  CreateSlotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSlotRequest,
  output: CreateSlotResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSlot",
}));

export type CreateSlotTypeError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom slot type
 *
 * To create a custom slot type, specify a name for the slot type and
 * a set of enumeration values, the values that a slot of this type can
 * assume.
 */
export const createSlotType: API.OperationMethod<
  CreateSlotTypeRequest,
  CreateSlotTypeResponse,
  CreateSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSlotTypeRequest,
  output: CreateSlotTypeResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSlotType",
}));

export type CreateTestSetDiscrepancyReportError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a report that describes the differences between the bot and the test set.
 */
export const createTestSetDiscrepancyReport: API.OperationMethod<
  CreateTestSetDiscrepancyReportRequest,
  CreateTestSetDiscrepancyReportResponse,
  CreateTestSetDiscrepancyReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTestSetDiscrepancyReportRequest,
  output: CreateTestSetDiscrepancyReportResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTestSetDiscrepancyReport",
}));

export type CreateUploadUrlError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a pre-signed S3 write URL that you use to upload the zip
 * archive when importing a bot or a bot locale.
 */
export const createUploadUrl: API.OperationMethod<
  CreateUploadUrlRequest,
  CreateUploadUrlResponse,
  CreateUploadUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateUploadUrlRequest,
  output: CreateUploadUrlResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUploadUrl",
}));

export type DeleteBotError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes all versions of a bot, including the `Draft`
 * version. To delete a specific version, use the
 * `DeleteBotVersion` operation.
 *
 * When you delete a bot, all of the resources contained in the bot are
 * also deleted. Deleting a bot removes all locales, intents, slot, and
 * slot types defined for the bot.
 *
 * If a bot has an alias, the `DeleteBot` operation returns
 * a `ResourceInUseException` exception. If you want to delete
 * the bot and the alias, set the `skipResourceInUseCheck`
 * parameter to `true`.
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
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBot",
}));

export type DeleteBotAliasError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified bot alias.
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
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotAlias",
}));

export type DeleteBotAnalyzerRecommendationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Permanently deletes the recommendations and analysis results for a specific bot analysis request. This operation is provided for GDPR compliance and cannot be undone.
 *
 * After deletion, the analysis results cannot be retrieved. The analysis request ID will still appear in the history list, but attempting to describe the recommendations will return a `ResourceNotFoundException`.
 */
export const deleteBotAnalyzerRecommendation: API.OperationMethod<
  DeleteBotAnalyzerRecommendationRequest,
  DeleteBotAnalyzerRecommendationResponse,
  DeleteBotAnalyzerRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBotAnalyzerRecommendationRequest,
  output: DeleteBotAnalyzerRecommendationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotAnalyzerRecommendation",
}));

export type DeleteBotLocaleError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a locale from a bot.
 *
 * When you delete a locale, all intents, slots, and slot types defined
 * for the locale are also deleted.
 */
export const deleteBotLocale: API.OperationMethod<
  DeleteBotLocaleRequest,
  DeleteBotLocaleResponse,
  DeleteBotLocaleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBotLocaleRequest,
  output: DeleteBotLocaleResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotLocale",
}));

export type DeleteBotReplicaError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to delete the replicated bot in the secondary region.
 */
export const deleteBotReplica: API.OperationMethod<
  DeleteBotReplicaRequest,
  DeleteBotReplicaResponse,
  DeleteBotReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteBotReplicaRequest,
  output: DeleteBotReplicaResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotReplica",
}));

export type DeleteBotVersionError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specific version of a bot. To delete all versions of a bot,
 * use the DeleteBot operation.
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
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBotVersion",
}));

export type DeleteCustomVocabularyError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a custom vocabulary from the specified locale
 * in the specified bot.
 */
export const deleteCustomVocabulary: API.OperationMethod<
  DeleteCustomVocabularyRequest,
  DeleteCustomVocabularyResponse,
  DeleteCustomVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCustomVocabularyRequest,
  output: DeleteCustomVocabularyResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCustomVocabulary",
}));

export type DeleteExportError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a previous export and the associated files stored in an S3
 * bucket.
 */
export const deleteExport: API.OperationMethod<
  DeleteExportRequest,
  DeleteExportResponse,
  DeleteExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteExportRequest,
  output: DeleteExportResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExport",
}));

export type DeleteImportError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a previous import and the associated file stored in an S3
 * bucket.
 */
export const deleteImport: API.OperationMethod<
  DeleteImportRequest,
  DeleteImportResponse,
  DeleteImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteImportRequest,
  output: DeleteImportResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImport",
}));

export type DeleteIntentError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified intent.
 *
 * Deleting an intent also deletes the slots associated with the
 * intent.
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
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntent",
}));

export type DeleteResourcePolicyError =
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes an existing policy from a bot or bot alias. If the resource
 * doesn't have a policy attached, Amazon Lex returns an exception.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyRequest,
  output: DeleteResourcePolicyResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeleteResourcePolicyStatementError =
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a policy statement from a resource policy. If you delete the
 * last statement from a policy, the policy is deleted. If you specify a
 * statement ID that doesn't exist in the policy, or if the bot or bot
 * alias doesn't have a policy attached, Amazon Lex returns an
 * exception.
 *
 * You need to add the `DeleteResourcePolicy` or `UpdateResourcePolicy`
 * action to the bot role in order to call the API.
 */
export const deleteResourcePolicyStatement: API.OperationMethod<
  DeleteResourcePolicyStatementRequest,
  DeleteResourcePolicyStatementResponse,
  DeleteResourcePolicyStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteResourcePolicyStatementRequest,
  output: DeleteResourcePolicyStatementResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicyStatement",
}));

export type DeleteSlotError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified slot from an intent.
 */
export const deleteSlot: API.OperationMethod<
  DeleteSlotRequest,
  DeleteSlotResponse,
  DeleteSlotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSlotRequest,
  output: DeleteSlotResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlot",
}));

export type DeleteSlotTypeError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a slot type from a bot locale.
 *
 * If a slot is using the slot type, Amazon Lex throws a
 * `ResourceInUseException` exception. To avoid the
 * exception, set the `skipResourceInUseCheck` parameter to
 * `true`.
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
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSlotType",
}));

export type DeleteTestSetError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to delete the selected test set.
 */
export const deleteTestSet: API.OperationMethod<
  DeleteTestSetRequest,
  DeleteTestSetResponse,
  DeleteTestSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTestSetRequest,
  output: DeleteTestSetResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTestSet",
}));

export type DeleteUtterancesError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes stored utterances.
 *
 * Amazon Lex stores the utterances that users send to your bot. Utterances
 * are stored for 15 days for use with the ListAggregatedUtterances operation, and
 * then stored indefinitely for use in improving the ability of your bot
 * to respond to user input..
 *
 * Use the `DeleteUtterances` operation to manually delete
 * utterances for a specific session. When you use the
 * `DeleteUtterances` operation, utterances stored for
 * improving your bot's ability to respond to user input are deleted
 * immediately. Utterances stored for use with the
 * `ListAggregatedUtterances` operation are deleted after 15
 * days.
 */
export const deleteUtterances: API.OperationMethod<
  DeleteUtterancesRequest,
  DeleteUtterancesResponse,
  DeleteUtterancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteUtterancesRequest,
  output: DeleteUtterancesResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUtterances",
}));

export type DescribeBotError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides metadata information about a bot.
 */
export const describeBot: API.OperationMethod<
  DescribeBotRequest,
  DescribeBotResponse,
  DescribeBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBotRequest,
  output: DescribeBotResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBot",
}));

export type DescribeBotAliasError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get information about a specific bot alias.
 */
export const describeBotAlias: API.OperationMethod<
  DescribeBotAliasRequest,
  DescribeBotAliasResponse,
  DescribeBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBotAliasRequest,
  output: DescribeBotAliasResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotAlias",
}));

export type DescribeBotAnalyzerRecommendationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the analysis results and recommendations for bot optimization. The analysis must be in `Available` status before recommendations can be retrieved.
 *
 * Recommendations are returned with pagination support. Each recommendation includes the issue location, priority level, detailed description, and proposed fix.
 */
export const describeBotAnalyzerRecommendation: API.PaginatedOperationMethod<
  DescribeBotAnalyzerRecommendationRequest,
  DescribeBotAnalyzerRecommendationResponse,
  DescribeBotAnalyzerRecommendationError,
  Credentials | HttpClient.HttpClient,
  BotAnalyzerRecommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeBotAnalyzerRecommendationRequest,
  output: DescribeBotAnalyzerRecommendationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotAnalyzerRecommendation",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "botAnalyzerRecommendationList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type DescribeBotLocaleError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the settings that a bot has for a specific locale.
 */
export const describeBotLocale: API.OperationMethod<
  DescribeBotLocaleRequest,
  DescribeBotLocaleResponse,
  DescribeBotLocaleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBotLocaleRequest,
  output: DescribeBotLocaleResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotLocale",
}));

export type DescribeBotRecommendationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides metadata information about a bot recommendation. This
 * information will enable you to get a description on the request inputs,
 * to download associated transcripts after processing is complete, and to
 * download intents and slot-types generated by the bot
 * recommendation.
 */
export const describeBotRecommendation: API.OperationMethod<
  DescribeBotRecommendationRequest,
  DescribeBotRecommendationResponse,
  DescribeBotRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBotRecommendationRequest,
  output: DescribeBotRecommendationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotRecommendation",
}));

export type DescribeBotReplicaError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Monitors the bot replication status through the UI console.
 */
export const describeBotReplica: API.OperationMethod<
  DescribeBotReplicaRequest,
  DescribeBotReplicaResponse,
  DescribeBotReplicaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBotReplicaRequest,
  output: DescribeBotReplicaResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotReplica",
}));

export type DescribeBotResourceGenerationError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a request to generate a bot through natural language description, made through
 * the `StartBotResource` API. Use the `generatedBotLocaleUrl`
 * to retrieve the Amazon S3 object containing the bot locale configuration. You can
 * then modify and import this configuration.
 */
export const describeBotResourceGeneration: API.OperationMethod<
  DescribeBotResourceGenerationRequest,
  DescribeBotResourceGenerationResponse,
  DescribeBotResourceGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBotResourceGenerationRequest,
  output: DescribeBotResourceGenerationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotResourceGeneration",
}));

export type DescribeBotVersionError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides metadata about a version of a bot.
 */
export const describeBotVersion: API.OperationMethod<
  DescribeBotVersionRequest,
  DescribeBotVersionResponse,
  DescribeBotVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeBotVersionRequest,
  output: DescribeBotVersionResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeBotVersion",
}));

export type DescribeCustomVocabularyMetadataError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides metadata information about a custom vocabulary.
 */
export const describeCustomVocabularyMetadata: API.OperationMethod<
  DescribeCustomVocabularyMetadataRequest,
  DescribeCustomVocabularyMetadataResponse,
  DescribeCustomVocabularyMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeCustomVocabularyMetadataRequest,
  output: DescribeCustomVocabularyMetadataResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCustomVocabularyMetadata",
}));

export type DescribeExportError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific export.
 */
export const describeExport: API.OperationMethod<
  DescribeExportRequest,
  DescribeExportResponse,
  DescribeExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeExportRequest,
  output: DescribeExportResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExport",
}));

export type DescribeImportError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specific import.
 */
export const describeImport: API.OperationMethod<
  DescribeImportRequest,
  DescribeImportResponse,
  DescribeImportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeImportRequest,
  output: DescribeImportResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImport",
}));

export type DescribeIntentError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns metadata about an intent.
 */
export const describeIntent: API.OperationMethod<
  DescribeIntentRequest,
  DescribeIntentResponse,
  DescribeIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeIntentRequest,
  output: DescribeIntentResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeIntent",
}));

export type DescribeResourcePolicyError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the resource policy and policy revision for a bot or bot
 * alias.
 */
export const describeResourcePolicy: API.OperationMethod<
  DescribeResourcePolicyRequest,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeResourcePolicyRequest,
  output: DescribeResourcePolicyResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicy",
}));

export type DescribeSlotError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata information about a slot.
 */
export const describeSlot: API.OperationMethod<
  DescribeSlotRequest,
  DescribeSlotResponse,
  DescribeSlotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSlotRequest,
  output: DescribeSlotResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSlot",
}));

export type DescribeSlotTypeError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata information about a slot type.
 */
export const describeSlotType: API.OperationMethod<
  DescribeSlotTypeRequest,
  DescribeSlotTypeResponse,
  DescribeSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSlotTypeRequest,
  output: DescribeSlotTypeResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSlotType",
}));

export type DescribeTestExecutionError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata information about the test execution.
 */
export const describeTestExecution: API.OperationMethod<
  DescribeTestExecutionRequest,
  DescribeTestExecutionResponse,
  DescribeTestExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTestExecutionRequest,
  output: DescribeTestExecutionResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTestExecution",
}));

export type DescribeTestSetError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata information about the test set.
 */
export const describeTestSet: API.OperationMethod<
  DescribeTestSetRequest,
  DescribeTestSetResponse,
  DescribeTestSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTestSetRequest,
  output: DescribeTestSetResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTestSet",
}));

export type DescribeTestSetDiscrepancyReportError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata information about the test set discrepancy report.
 */
export const describeTestSetDiscrepancyReport: API.OperationMethod<
  DescribeTestSetDiscrepancyReportRequest,
  DescribeTestSetDiscrepancyReportResponse,
  DescribeTestSetDiscrepancyReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTestSetDiscrepancyReportRequest,
  output: DescribeTestSetDiscrepancyReportResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTestSetDiscrepancyReport",
}));

export type DescribeTestSetGenerationError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets metadata information about the test set generation.
 */
export const describeTestSetGeneration: API.OperationMethod<
  DescribeTestSetGenerationRequest,
  DescribeTestSetGenerationResponse,
  DescribeTestSetGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTestSetGenerationRequest,
  output: DescribeTestSetGenerationResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTestSetGeneration",
}));

export type GenerateBotElementError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates sample utterances for an intent.
 */
export const generateBotElement: API.OperationMethod<
  GenerateBotElementRequest,
  GenerateBotElementResponse,
  GenerateBotElementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GenerateBotElementRequest,
  output: GenerateBotElementResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateBotElement",
}));

export type GetTestExecutionArtifactsUrlError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The pre-signed Amazon S3 URL to download the test execution result artifacts.
 */
export const getTestExecutionArtifactsUrl: API.OperationMethod<
  GetTestExecutionArtifactsUrlRequest,
  GetTestExecutionArtifactsUrlResponse,
  GetTestExecutionArtifactsUrlError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTestExecutionArtifactsUrlRequest,
  output: GetTestExecutionArtifactsUrlResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestExecutionArtifactsUrl",
}));

export type ListAggregatedUtterancesError =
  | InternalServerException
  | PreconditionFailedException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides a list of utterances that users have sent to the
 * bot.
 *
 * Utterances are aggregated by the text of the utterance. For example,
 * all instances where customers used the phrase "I want to order pizza"
 * are aggregated into the same line in the response.
 *
 * You can see both detected utterances and missed utterances. A
 * detected utterance is where the bot properly recognized the utterance
 * and activated the associated intent. A missed utterance was not
 * recognized by the bot and didn't activate an intent.
 *
 * Utterances can be aggregated for a bot alias or for a bot version,
 * but not both at the same time.
 *
 * Utterances statistics are not generated under the following
 * conditions:
 *
 * - The `childDirected` field was set to true when the
 * bot was created.
 *
 * - You are using slot obfuscation with one or more slots.
 *
 * - You opted out of participating in improving Amazon Lex.
 */
export const listAggregatedUtterances: API.PaginatedOperationMethod<
  ListAggregatedUtterancesRequest,
  ListAggregatedUtterancesResponse,
  ListAggregatedUtterancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAggregatedUtterancesRequest,
  output: ListAggregatedUtterancesResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAggregatedUtterances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotAliasesError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a list of aliases for the specified bot.
 */
export const listBotAliases: API.PaginatedOperationMethod<
  ListBotAliasesRequest,
  ListBotAliasesResponse,
  ListBotAliasesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBotAliasesRequest,
  output: ListBotAliasesResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotAliases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotAliasReplicasError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to list the replicated bots created from the source bot alias.
 */
export const listBotAliasReplicas: API.PaginatedOperationMethod<
  ListBotAliasReplicasRequest,
  ListBotAliasReplicasResponse,
  ListBotAliasReplicasError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBotAliasReplicasRequest,
  output: ListBotAliasReplicasResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotAliasReplicas",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotAnalyzerHistoryError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of historical bot analysis executions for a specific bot. You can filter the results by locale and bot version.
 *
 * The history includes all analysis executions regardless of their status, allowing you to track past analyses and their outcomes.
 */
export const listBotAnalyzerHistory: API.PaginatedOperationMethod<
  ListBotAnalyzerHistoryRequest,
  ListBotAnalyzerHistoryResponse,
  ListBotAnalyzerHistoryError,
  Credentials | HttpClient.HttpClient,
  BotAnalyzerHistorySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBotAnalyzerHistoryRequest,
  output: ListBotAnalyzerHistoryResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotAnalyzerHistory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "botAnalyzerHistoryList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotLocalesError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of locales for the specified bot.
 */
export const listBotLocales: API.PaginatedOperationMethod<
  ListBotLocalesRequest,
  ListBotLocalesResponse,
  ListBotLocalesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBotLocalesRequest,
  output: ListBotLocalesResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotLocales",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotRecommendationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a list of bot recommendations that meet the specified
 * criteria.
 */
export const listBotRecommendations: API.PaginatedOperationMethod<
  ListBotRecommendationsRequest,
  ListBotRecommendationsResponse,
  ListBotRecommendationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBotRecommendationsRequest,
  output: ListBotRecommendationsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotReplicasError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to list the replicated bots.
 */
export const listBotReplicas: API.OperationMethod<
  ListBotReplicasRequest,
  ListBotReplicasResponse,
  ListBotReplicasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListBotReplicasRequest,
  output: ListBotReplicasResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotReplicas",
}));

export type ListBotResourceGenerationsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the generation requests made for a bot locale.
 */
export const listBotResourceGenerations: API.PaginatedOperationMethod<
  ListBotResourceGenerationsRequest,
  ListBotResourceGenerationsResponse,
  ListBotResourceGenerationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBotResourceGenerationsRequest,
  output: ListBotResourceGenerationsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotResourceGenerations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of available bots.
 */
export const listBots: API.PaginatedOperationMethod<
  ListBotsRequest,
  ListBotsResponse,
  ListBotsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBotsRequest,
  output: ListBotsResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotVersionReplicasError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Contains information about all the versions replication statuses applicable for Global Resiliency.
 */
export const listBotVersionReplicas: API.PaginatedOperationMethod<
  ListBotVersionReplicasRequest,
  ListBotVersionReplicasResponse,
  ListBotVersionReplicasError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBotVersionReplicasRequest,
  output: ListBotVersionReplicasResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotVersionReplicas",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBotVersionsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about all of the versions of a bot.
 *
 * The `ListBotVersions` operation returns a summary of each
 * version of a bot. For example, if a bot has three numbered versions,
 * the `ListBotVersions` operation returns for summaries, one
 * for each numbered version and one for the `DRAFT`
 * version.
 *
 * The `ListBotVersions` operation always returns at least
 * one version, the `DRAFT` version.
 */
export const listBotVersions: API.PaginatedOperationMethod<
  ListBotVersionsRequest,
  ListBotVersionsResponse,
  ListBotVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBotVersionsRequest,
  output: ListBotVersionsResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBotVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBuiltInIntentsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of built-in intents provided by Amazon Lex that you can use
 * in your bot.
 *
 * To use a built-in intent as a the base for your own intent, include
 * the built-in intent signature in the `parentIntentSignature`
 * parameter when you call the `CreateIntent` operation. For
 * more information, see CreateIntent.
 */
export const listBuiltInIntents: API.PaginatedOperationMethod<
  ListBuiltInIntentsRequest,
  ListBuiltInIntentsResponse,
  ListBuiltInIntentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBuiltInIntentsRequest,
  output: ListBuiltInIntentsResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuiltInIntents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBuiltInSlotTypesError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of built-in slot types that meet the specified
 * criteria.
 */
export const listBuiltInSlotTypes: API.PaginatedOperationMethod<
  ListBuiltInSlotTypesRequest,
  ListBuiltInSlotTypesResponse,
  ListBuiltInSlotTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListBuiltInSlotTypesRequest,
  output: ListBuiltInSlotTypesResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuiltInSlotTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCustomVocabularyItemsError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Paginated list of custom vocabulary items for a given bot locale's
 * custom vocabulary.
 */
export const listCustomVocabularyItems: API.PaginatedOperationMethod<
  ListCustomVocabularyItemsRequest,
  ListCustomVocabularyItemsResponse,
  ListCustomVocabularyItemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCustomVocabularyItemsRequest,
  output: ListCustomVocabularyItemsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomVocabularyItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExportsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the exports for a bot, bot locale, or custom vocabulary.
 * Exports are kept in the list for 7 days.
 */
export const listExports: API.PaginatedOperationMethod<
  ListExportsRequest,
  ListExportsResponse,
  ListExportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListExportsRequest,
  output: ListExportsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the imports for a bot, bot locale, or custom vocabulary.
 * Imports are kept in the list for 7 days.
 */
export const listImports: API.PaginatedOperationMethod<
  ListImportsRequest,
  ListImportsResponse,
  ListImportsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListImportsRequest,
  output: ListImportsResponse,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIntentMetricsError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves summary metrics for the intents in your bot. The following fields are required:
 *
 * - `metrics` – A list of AnalyticsIntentMetric objects. In each object, use the `name` field to specify the metric to calculate, the `statistic` field to specify whether to calculate the `Sum`, `Average`, or `Max` number, and the `order` field to specify whether to sort the results in `Ascending` or `Descending` order.
 *
 * - `startDateTime` and `endDateTime` – Define a time range for which you want to retrieve results.
 *
 * Of the optional fields, you can organize the results in the following ways:
 *
 * - Use the `filters` field to filter the results, the `groupBy` field to specify categories by which to group the results, and the `binBy` field to specify time intervals by which to group the results.
 *
 * - Use the `maxResults` field to limit the number of results to return in a single response and the `nextToken` field to return the next batch of results if the response does not return the full set of results.
 *
 * Note that an `order` field exists in both `binBy` and `metrics`. You can specify only one `order` in a given request.
 */
export const listIntentMetrics: API.PaginatedOperationMethod<
  ListIntentMetricsRequest,
  ListIntentMetricsResponse,
  ListIntentMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIntentMetricsRequest,
  output: ListIntentMetricsResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntentMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIntentPathsError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves summary statistics for a path of intents that users take over sessions with your bot. The following fields are required:
 *
 * - `startDateTime` and `endDateTime` – Define a time range for which you want to retrieve results.
 *
 * - `intentPath` – Define an order of intents for which you want to retrieve metrics. Separate intents in the path with a forward slash. For example, populate the `intentPath` field with `/BookCar/BookHotel` to see details about how many times users invoked the `BookCar` and `BookHotel` intents in that order.
 *
 * Use the optional `filters` field to filter the results.
 */
export const listIntentPaths: API.OperationMethod<
  ListIntentPathsRequest,
  ListIntentPathsResponse,
  ListIntentPathsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListIntentPathsRequest,
  output: ListIntentPathsResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntentPaths",
}));

export type ListIntentsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Get a list of intents that meet the specified criteria.
 */
export const listIntents: API.PaginatedOperationMethod<
  ListIntentsRequest,
  ListIntentsResponse,
  ListIntentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIntentsRequest,
  output: ListIntentsResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIntentStageMetricsError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves summary metrics for the stages within intents in your bot. The following fields are required:
 *
 * - `metrics` – A list of AnalyticsIntentStageMetric objects. In each object, use the `name` field to specify the metric to calculate, the `statistic` field to specify whether to calculate the `Sum`, `Average`, or `Max` number, and the `order` field to specify whether to sort the results in `Ascending` or `Descending` order.
 *
 * - `startDateTime` and `endDateTime` – Define a time range for which you want to retrieve results.
 *
 * Of the optional fields, you can organize the results in the following ways:
 *
 * - Use the `filters` field to filter the results, the `groupBy` field to specify categories by which to group the results, and the `binBy` field to specify time intervals by which to group the results.
 *
 * - Use the `maxResults` field to limit the number of results to return in a single response and the `nextToken` field to return the next batch of results if the response does not return the full set of results.
 *
 * Note that an `order` field exists in both `binBy` and `metrics`. You can only specify one `order` in a given request.
 */
export const listIntentStageMetrics: API.PaginatedOperationMethod<
  ListIntentStageMetricsRequest,
  ListIntentStageMetricsResponse,
  ListIntentStageMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIntentStageMetricsRequest,
  output: ListIntentStageMetricsResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntentStageMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendedIntentsError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of recommended intents provided by the bot
 * recommendation that you can use in your bot. Intents in the
 * response are ordered by relevance.
 */
export const listRecommendedIntents: API.PaginatedOperationMethod<
  ListRecommendedIntentsRequest,
  ListRecommendedIntentsResponse,
  ListRecommendedIntentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListRecommendedIntentsRequest,
  output: ListRecommendedIntentsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendedIntents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionAnalyticsDataError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of metadata for individual user sessions with your bot. The `startDateTime` and `endDateTime` fields are required. These fields define a time range for which you want to retrieve results. Of the optional fields, you can organize the results in the following ways:
 *
 * - Use the `filters` field to filter the results and the `sortBy` field to specify the values by which to sort the results.
 *
 * - Use the `maxResults` field to limit the number of results to return in a single response and the `nextToken` field to return the next batch of results if the response does not return the full set of results.
 */
export const listSessionAnalyticsData: API.PaginatedOperationMethod<
  ListSessionAnalyticsDataRequest,
  ListSessionAnalyticsDataResponse,
  ListSessionAnalyticsDataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionAnalyticsDataRequest,
  output: ListSessionAnalyticsDataResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessionAnalyticsData",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionMetricsError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves summary metrics for the user sessions with your bot. The following fields are required:
 *
 * - `metrics` – A list of AnalyticsSessionMetric objects. In each object, use the `name` field to specify the metric to calculate, the `statistic` field to specify whether to calculate the `Sum`, `Average`, or `Max` number, and the `order` field to specify whether to sort the results in `Ascending` or `Descending` order.
 *
 * - `startDateTime` and `endDateTime` – Define a time range for which you want to retrieve results.
 *
 * Of the optional fields, you can organize the results in the following ways:
 *
 * - Use the `filters` field to filter the results, the `groupBy` field to specify categories by which to group the results, and the `binBy` field to specify time intervals by which to group the results.
 *
 * - Use the `maxResults` field to limit the number of results to return in a single response and the `nextToken` field to return the next batch of results if the response does not return the full set of results.
 *
 * Note that an `order` field exists in both `binBy` and `metrics`. Currently, you can specify it in either field, but not in both.
 */
export const listSessionMetrics: API.PaginatedOperationMethod<
  ListSessionMetricsRequest,
  ListSessionMetricsResponse,
  ListSessionMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSessionMetricsRequest,
  output: ListSessionMetricsResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSessionMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSlotsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of slots that match the specified criteria.
 */
export const listSlots: API.PaginatedOperationMethod<
  ListSlotsRequest,
  ListSlotsResponse,
  ListSlotsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSlotsRequest,
  output: ListSlotsResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSlots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSlotTypesError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets a list of slot types that match the specified criteria.
 */
export const listSlotTypes: API.PaginatedOperationMethod<
  ListSlotTypesRequest,
  ListSlotTypesResponse,
  ListSlotTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSlotTypesRequest,
  output: ListSlotTypesResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSlotTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of tags associated with a resource. Only bots, bot
 * aliases, and bot channels can have tags associated with them.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTestExecutionResultItemsError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of test execution result items.
 */
export const listTestExecutionResultItems: API.PaginatedOperationMethod<
  ListTestExecutionResultItemsRequest,
  ListTestExecutionResultItemsResponse,
  ListTestExecutionResultItemsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestExecutionResultItemsRequest,
  output: ListTestExecutionResultItemsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestExecutionResultItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestExecutionsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The list of test set executions.
 */
export const listTestExecutions: API.PaginatedOperationMethod<
  ListTestExecutionsRequest,
  ListTestExecutionsResponse,
  ListTestExecutionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestExecutionsRequest,
  output: ListTestExecutionsResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestSetRecordsError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The list of test set records.
 */
export const listTestSetRecords: API.PaginatedOperationMethod<
  ListTestSetRecordsRequest,
  ListTestSetRecordsResponse,
  ListTestSetRecordsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestSetRecordsRequest,
  output: ListTestSetRecordsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestSetRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestSetsError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The list of the test sets
 */
export const listTestSets: API.PaginatedOperationMethod<
  ListTestSetsRequest,
  ListTestSetsResponse,
  ListTestSetsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTestSetsRequest,
  output: ListTestSetsResponse,
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestSets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUtteranceAnalyticsDataError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * To use this API operation, your IAM role must have permissions to
 * perform the ListAggregatedUtterances operation, which provides access to
 * utterance-related analytics. See Viewing utterance
 * statistics for the IAM policy to apply to the IAM role.
 *
 * Retrieves a list of metadata for individual user utterances to your bot. The following fields are required:
 *
 * - `startDateTime` and `endDateTime` – Define a time range for which you want to retrieve results.
 *
 * Of the optional fields, you can organize the results in the following ways:
 *
 * - Use the `filters` field to filter the results and the `sortBy` field to specify the values by which to sort the results.
 *
 * - Use the `maxResults` field to limit the number of results to return in a single response and the `nextToken` field to return the next batch of results if the response does not return the full set of results.
 */
export const listUtteranceAnalyticsData: API.PaginatedOperationMethod<
  ListUtteranceAnalyticsDataRequest,
  ListUtteranceAnalyticsDataResponse,
  ListUtteranceAnalyticsDataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUtteranceAnalyticsDataRequest,
  output: ListUtteranceAnalyticsDataResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUtteranceAnalyticsData",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUtteranceMetricsError =
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * To use this API operation, your IAM role must have permissions to
 * perform the ListAggregatedUtterances operation, which provides access to
 * utterance-related analytics. See Viewing utterance
 * statistics for the IAM policy to apply to the IAM role.
 *
 * Retrieves summary metrics for the utterances in your bot. The following fields are required:
 *
 * - `metrics` – A list of AnalyticsUtteranceMetric objects. In each object, use the `name` field to specify the metric to calculate, the `statistic` field to specify whether to calculate the `Sum`, `Average`, or `Max` number, and the `order` field to specify whether to sort the results in `Ascending` or `Descending` order.
 *
 * - `startDateTime` and `endDateTime` – Define a time range for which you want to retrieve results.
 *
 * Of the optional fields, you can organize the results in the following ways:
 *
 * - Use the `filters` field to filter the results, the `groupBy` field to specify categories by which to group the results, and the `binBy` field to specify time intervals by which to group the results.
 *
 * - Use the `maxResults` field to limit the number of results to return in a single response and the `nextToken` field to return the next batch of results if the response does not return the full set of results.
 *
 * Note that an `order` field exists in both `binBy` and `metrics`. Currently, you can specify it in either field, but not in both.
 */
export const listUtteranceMetrics: API.PaginatedOperationMethod<
  ListUtteranceMetricsRequest,
  ListUtteranceMetricsResponse,
  ListUtteranceMetricsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListUtteranceMetricsRequest,
  output: ListUtteranceMetricsResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUtteranceMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchAssociatedTranscriptsError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Search for associated transcripts that meet the specified
 * criteria.
 */
export const searchAssociatedTranscripts: API.OperationMethod<
  SearchAssociatedTranscriptsRequest,
  SearchAssociatedTranscriptsResponse,
  SearchAssociatedTranscriptsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SearchAssociatedTranscriptsRequest,
  output: SearchAssociatedTranscriptsResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchAssociatedTranscripts",
}));

export type StartBotAnalyzerError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates an asynchronous analysis of your bot configuration using AI-powered analysis to identify potential issues and recommend improvements based on AWS best practices.
 *
 * The analysis examines your bot's configuration, including intents, utterances, slots, and conversation flows, to provide actionable recommendations for optimization.
 */
export const startBotAnalyzer: API.OperationMethod<
  StartBotAnalyzerRequest,
  StartBotAnalyzerResponse,
  StartBotAnalyzerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartBotAnalyzerRequest,
  output: StartBotAnalyzerResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBotAnalyzer",
}));

export type StartBotRecommendationError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this to provide your transcript data, and to start the bot
 * recommendation process.
 */
export const startBotRecommendation: API.OperationMethod<
  StartBotRecommendationRequest,
  StartBotRecommendationResponse,
  StartBotRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartBotRecommendationRequest,
  output: StartBotRecommendationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBotRecommendation",
}));

export type StartBotResourceGenerationError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a request for the descriptive bot builder to generate a bot locale configuration
 * based on the prompt you provide it. After you make this call, use the `DescribeBotResourceGeneration`
 * operation to check on the status of the generation and for the `generatedBotLocaleUrl` when the
 * generation is complete. Use that value to retrieve the Amazon S3 object containing the bot locale configuration. You can
 * then modify and import this configuration.
 */
export const startBotResourceGeneration: API.OperationMethod<
  StartBotResourceGenerationRequest,
  StartBotResourceGenerationResponse,
  StartBotResourceGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartBotResourceGenerationRequest,
  output: StartBotResourceGenerationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBotResourceGeneration",
}));

export type StartImportError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts importing a bot, bot locale, or custom vocabulary from a zip
 * archive that you uploaded to an S3 bucket.
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImport",
}));

export type StartTestExecutionError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to start test set execution.
 */
export const startTestExecution: API.OperationMethod<
  StartTestExecutionRequest,
  StartTestExecutionResponse,
  StartTestExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTestExecutionRequest,
  output: StartTestExecutionResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTestExecution",
}));

export type StartTestSetGenerationError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to start the generation of test set.
 */
export const startTestSetGeneration: API.OperationMethod<
  StartTestSetGenerationRequest,
  StartTestSetGenerationResponse,
  StartTestSetGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTestSetGenerationRequest,
  output: StartTestSetGenerationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTestSetGeneration",
}));

export type StopBotAnalyzerError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an ongoing bot analysis execution. Once stopped, the analysis cannot be resumed and no recommendations will be generated.
 */
export const stopBotAnalyzer: API.OperationMethod<
  StopBotAnalyzerRequest,
  StopBotAnalyzerResponse,
  StopBotAnalyzerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopBotAnalyzerRequest,
  output: StopBotAnalyzerResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBotAnalyzer",
}));

export type StopBotRecommendationError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stop an already running Bot Recommendation request.
 */
export const stopBotRecommendation: API.OperationMethod<
  StopBotRecommendationRequest,
  StopBotRecommendationResponse,
  StopBotRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopBotRecommendationRequest,
  output: StopBotRecommendationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBotRecommendation",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource. If a tag key
 * already exists, the existing value is replaced with the new
 * value.
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
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a bot, bot alias, or bot channel.
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
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateBotError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing bot.
 */
export const updateBot: API.OperationMethod<
  UpdateBotRequest,
  UpdateBotResponse,
  UpdateBotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBotRequest,
  output: UpdateBotResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBot",
}));

export type UpdateBotAliasError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing bot alias.
 */
export const updateBotAlias: API.OperationMethod<
  UpdateBotAliasRequest,
  UpdateBotAliasResponse,
  UpdateBotAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBotAliasRequest,
  output: UpdateBotAliasResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBotAlias",
}));

export type UpdateBotLocaleError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings that a bot has for a specific locale.
 */
export const updateBotLocale: API.OperationMethod<
  UpdateBotLocaleRequest,
  UpdateBotLocaleResponse,
  UpdateBotLocaleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBotLocaleRequest,
  output: UpdateBotLocaleResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBotLocale",
}));

export type UpdateBotRecommendationError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing bot recommendation request.
 */
export const updateBotRecommendation: API.OperationMethod<
  UpdateBotRecommendationRequest,
  UpdateBotRecommendationResponse,
  UpdateBotRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateBotRecommendationRequest,
  output: UpdateBotRecommendationResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBotRecommendation",
}));

export type UpdateExportError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the password used to protect an export zip archive.
 *
 * The password is not required. If you don't supply a password, Amazon Lex
 * generates a zip file that is not protected by a password. This is the
 * archive that is available at the pre-signed S3 URL provided by the
 * DescribeExport operation.
 */
export const updateExport: API.OperationMethod<
  UpdateExportRequest,
  UpdateExportResponse,
  UpdateExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateExportRequest,
  output: UpdateExportResponse,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExport",
}));

export type UpdateIntentError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings for an intent.
 */
export const updateIntent: API.OperationMethod<
  UpdateIntentRequest,
  UpdateIntentResponse,
  UpdateIntentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIntentRequest,
  output: UpdateIntentResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntent",
}));

export type UpdateResourcePolicyError =
  | InternalServerException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Replaces the existing resource policy for a bot or bot alias with a
 * new one. If the policy doesn't exist, Amazon Lex returns an
 * exception.
 */
export const updateResourcePolicy: API.OperationMethod<
  UpdateResourcePolicyRequest,
  UpdateResourcePolicyResponse,
  UpdateResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateResourcePolicyRequest,
  output: UpdateResourcePolicyResponse,
  errors: [
    InternalServerException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourcePolicy",
}));

export type UpdateSlotError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the settings for a slot.
 */
export const updateSlot: API.OperationMethod<
  UpdateSlotRequest,
  UpdateSlotResponse,
  UpdateSlotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSlotRequest,
  output: UpdateSlotResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSlot",
}));

export type UpdateSlotTypeError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing slot type.
 */
export const updateSlotType: API.OperationMethod<
  UpdateSlotTypeRequest,
  UpdateSlotTypeResponse,
  UpdateSlotTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSlotTypeRequest,
  output: UpdateSlotTypeResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSlotType",
}));

export type UpdateTestSetError =
  | ConflictException
  | InternalServerException
  | PreconditionFailedException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The action to update the test set.
 */
export const updateTestSet: API.OperationMethod<
  UpdateTestSetRequest,
  UpdateTestSetResponse,
  UpdateTestSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateTestSetRequest,
  output: UpdateTestSetResponse,
  errors: [
    ConflictException,
    InternalServerException,
    PreconditionFailedException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTestSet",
}));
