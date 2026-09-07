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
  sdkId: "Transcribe",
  serviceShapeName: "Transcribe",
});
const auth = T.AwsAuthSigv4({ name: "transcribe" });
const ver = T.ServiceVersion("2017-10-26");
const proto = T.AwsProtocolsAwsJson1_1();
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
              `https://transcribe-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws") {
              return e(`https://fips.transcribe.${Region}.amazonaws.com`);
            }
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://fips.transcribe.${Region}.amazonaws.com`);
            }
            return e(
              `https://transcribe-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://transcribe.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if (Region === "cn-north-1") {
          return e("https://cn.transcribe.cn-north-1.amazonaws.com.cn");
        }
        if (Region === "cn-northwest-1") {
          return e("https://cn.transcribe.cn-northwest-1.amazonaws.com.cn");
        }
        return e(
          `https://transcribe.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export type CategoryName = string;
export type TimestampMilliseconds = number;
export interface AbsoluteTimeRange {
  StartTime?: number;
  EndTime?: number;
  First?: number;
  Last?: number;
}
export const AbsoluteTimeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Number),
    EndTime: S.optional(S.Number),
    First: S.optional(S.Number),
    Last: S.optional(S.Number),
  }),
).annotate({
  identifier: "AbsoluteTimeRange",
}) as any as S.Schema<AbsoluteTimeRange>;
export type Percentage = number;
export interface RelativeTimeRange {
  StartPercentage?: number;
  EndPercentage?: number;
  First?: number;
  Last?: number;
}
export const RelativeTimeRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartPercentage: S.optional(S.Number),
    EndPercentage: S.optional(S.Number),
    First: S.optional(S.Number),
    Last: S.optional(S.Number),
  }),
).annotate({
  identifier: "RelativeTimeRange",
}) as any as S.Schema<RelativeTimeRange>;
export interface NonTalkTimeFilter {
  Threshold?: number;
  AbsoluteTimeRange?: AbsoluteTimeRange;
  RelativeTimeRange?: RelativeTimeRange;
  Negate?: boolean;
}
export const NonTalkTimeFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Threshold: S.optional(S.Number),
    AbsoluteTimeRange: S.optional(AbsoluteTimeRange),
    RelativeTimeRange: S.optional(RelativeTimeRange),
    Negate: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "NonTalkTimeFilter",
}) as any as S.Schema<NonTalkTimeFilter>;
export type ParticipantRole = "AGENT" | "CUSTOMER" | (string & {});
export const ParticipantRole = /*@__PURE__*/ S.String;

export interface InterruptionFilter {
  Threshold?: number;
  ParticipantRole?: ParticipantRole;
  AbsoluteTimeRange?: AbsoluteTimeRange;
  RelativeTimeRange?: RelativeTimeRange;
  Negate?: boolean;
}
export const InterruptionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Threshold: S.optional(S.Number),
    ParticipantRole: S.optional(ParticipantRole),
    AbsoluteTimeRange: S.optional(AbsoluteTimeRange),
    RelativeTimeRange: S.optional(RelativeTimeRange),
    Negate: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "InterruptionFilter",
}) as any as S.Schema<InterruptionFilter>;
export type TranscriptFilterType = "EXACT" | (string & {});
export const TranscriptFilterType = /*@__PURE__*/ S.String;

export type NonEmptyString = string;
export type StringTargetList = string[];
export const StringTargetList = /*@__PURE__*/ S.Array(S.String);
export interface TranscriptFilter {
  TranscriptFilterType: TranscriptFilterType;
  AbsoluteTimeRange?: AbsoluteTimeRange;
  RelativeTimeRange?: RelativeTimeRange;
  ParticipantRole?: ParticipantRole;
  Negate?: boolean;
  Targets: string[];
}
export const TranscriptFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TranscriptFilterType: TranscriptFilterType,
    AbsoluteTimeRange: S.optional(AbsoluteTimeRange),
    RelativeTimeRange: S.optional(RelativeTimeRange),
    ParticipantRole: S.optional(ParticipantRole),
    Negate: S.optional(S.Boolean),
    Targets: StringTargetList,
  }),
).annotate({
  identifier: "TranscriptFilter",
}) as any as S.Schema<TranscriptFilter>;
export type SentimentValue =
  | "POSITIVE"
  | "NEGATIVE"
  | "NEUTRAL"
  | "MIXED"
  | (string & {});
export const SentimentValue = /*@__PURE__*/ S.String;

export type SentimentValueList = SentimentValue[];
export const SentimentValueList = /*@__PURE__*/ S.Array(SentimentValue);
export interface SentimentFilter {
  Sentiments: SentimentValue[];
  AbsoluteTimeRange?: AbsoluteTimeRange;
  RelativeTimeRange?: RelativeTimeRange;
  ParticipantRole?: ParticipantRole;
  Negate?: boolean;
}
export const SentimentFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sentiments: SentimentValueList,
    AbsoluteTimeRange: S.optional(AbsoluteTimeRange),
    RelativeTimeRange: S.optional(RelativeTimeRange),
    ParticipantRole: S.optional(ParticipantRole),
    Negate: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "SentimentFilter",
}) as any as S.Schema<SentimentFilter>;
export type Rule =
  | {
      NonTalkTimeFilter: NonTalkTimeFilter;
      InterruptionFilter?: never;
      TranscriptFilter?: never;
      SentimentFilter?: never;
    }
  | {
      NonTalkTimeFilter?: never;
      InterruptionFilter: InterruptionFilter;
      TranscriptFilter?: never;
      SentimentFilter?: never;
    }
  | {
      NonTalkTimeFilter?: never;
      InterruptionFilter?: never;
      TranscriptFilter: TranscriptFilter;
      SentimentFilter?: never;
    }
  | {
      NonTalkTimeFilter?: never;
      InterruptionFilter?: never;
      TranscriptFilter?: never;
      SentimentFilter: SentimentFilter;
    };
export const Rule = /*@__PURE__*/ S.Union([
  S.Struct({ NonTalkTimeFilter: NonTalkTimeFilter }),
  S.Struct({ InterruptionFilter: InterruptionFilter }),
  S.Struct({ TranscriptFilter: TranscriptFilter }),
  S.Struct({ SentimentFilter: SentimentFilter }),
]);
export type RuleList = Rule[];
export const RuleList = /*@__PURE__*/ S.Array(Rule);
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
export type InputType = "REAL_TIME" | "POST_CALL" | (string & {});
export const InputType = /*@__PURE__*/ S.String;

export interface CreateCallAnalyticsCategoryRequest {
  CategoryName: string;
  Rules: Rule[];
  Tags?: Tag[];
  InputType?: InputType;
}
export const CreateCallAnalyticsCategoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CategoryName: S.String.pipe(T.HttpLabel("CategoryName")),
    Rules: RuleList,
    Tags: S.optional(TagList),
    InputType: S.optional(InputType),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/callanalyticscategories/{CategoryName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateCallAnalyticsCategoryRequest",
}) as any as S.Schema<CreateCallAnalyticsCategoryRequest>;
export interface CategoryProperties {
  CategoryName?: string;
  Rules?: Rule[];
  CreateTime?: Date;
  LastUpdateTime?: Date;
  Tags?: Tag[];
  InputType?: InputType;
}
export const CategoryProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CategoryName: S.optional(S.String),
    Rules: S.optional(RuleList),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Tags: S.optional(TagList),
    InputType: S.optional(InputType),
  }),
).annotate({
  identifier: "CategoryProperties",
}) as any as S.Schema<CategoryProperties>;
export interface CreateCallAnalyticsCategoryResponse {
  CategoryProperties?: CategoryProperties;
}
export const CreateCallAnalyticsCategoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CategoryProperties: S.optional(CategoryProperties) }),
).annotate({
  identifier: "CreateCallAnalyticsCategoryResponse",
}) as any as S.Schema<CreateCallAnalyticsCategoryResponse>;
export type CLMLanguageCode =
  | "en-US"
  | "hi-IN"
  | "es-US"
  | "en-GB"
  | "en-AU"
  | "de-DE"
  | "ja-JP"
  | (string & {});
export const CLMLanguageCode = /*@__PURE__*/ S.String;

export type BaseModelName = "NarrowBand" | "WideBand" | (string & {});
export const BaseModelName = /*@__PURE__*/ S.String;

export type ModelName = string;
export type Uri = string;
export type DataAccessRoleArn = string;
export interface InputDataConfig {
  S3Uri: string;
  TuningDataS3Uri?: string;
  DataAccessRoleArn: string;
}
export const InputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Uri: S.String,
    TuningDataS3Uri: S.optional(S.String),
    DataAccessRoleArn: S.String,
  }),
).annotate({
  identifier: "InputDataConfig",
}) as any as S.Schema<InputDataConfig>;
export interface CreateLanguageModelRequest {
  LanguageCode: CLMLanguageCode;
  BaseModelName: BaseModelName;
  ModelName: string;
  InputDataConfig: InputDataConfig;
  Tags?: Tag[];
}
export const CreateLanguageModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LanguageCode: CLMLanguageCode,
    BaseModelName: BaseModelName,
    ModelName: S.String.pipe(T.HttpLabel("ModelName")),
    InputDataConfig: InputDataConfig,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/languagemodels/{ModelName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateLanguageModelRequest",
}) as any as S.Schema<CreateLanguageModelRequest>;
export type ModelStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const ModelStatus = /*@__PURE__*/ S.String;

export interface CreateLanguageModelResponse {
  LanguageCode?: CLMLanguageCode;
  BaseModelName?: BaseModelName;
  ModelName?: string;
  InputDataConfig?: InputDataConfig;
  ModelStatus?: ModelStatus;
}
export const CreateLanguageModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LanguageCode: S.optional(CLMLanguageCode),
    BaseModelName: S.optional(BaseModelName),
    ModelName: S.optional(S.String),
    InputDataConfig: S.optional(InputDataConfig),
    ModelStatus: S.optional(ModelStatus),
  }),
).annotate({
  identifier: "CreateLanguageModelResponse",
}) as any as S.Schema<CreateLanguageModelResponse>;
export type VocabularyName = string;
export type LanguageCode =
  | "af-ZA"
  | "ar-AE"
  | "ar-SA"
  | "am-ET"
  | "cy-GB"
  | "da-DK"
  | "de-CH"
  | "de-DE"
  | "en-AB"
  | "en-AU"
  | "en-GB"
  | "en-IE"
  | "en-IN"
  | "en-US"
  | "en-WL"
  | "es-ES"
  | "es-MX"
  | "es-US"
  | "fa-AF"
  | "fa-IR"
  | "fr-CA"
  | "fr-FR"
  | "ga-IE"
  | "gd-GB"
  | "he-IL"
  | "hi-IN"
  | "ht-HT"
  | "id-ID"
  | "it-IT"
  | "ja-JP"
  | "jv-ID"
  | "km-KH"
  | "ko-KR"
  | "my-MM"
  | "ms-MY"
  | "nl-NL"
  | "pt-BR"
  | "pt-PT"
  | "ru-RU"
  | "ta-IN"
  | "te-IN"
  | "tr-TR"
  | "zh-CN"
  | "zh-TW"
  | "th-TH"
  | "en-ZA"
  | "en-NZ"
  | "vi-VN"
  | "sv-SE"
  | "ab-GE"
  | "ast-ES"
  | "az-AZ"
  | "ba-RU"
  | "be-BY"
  | "bg-BG"
  | "bn-IN"
  | "bs-BA"
  | "ca-ES"
  | "ckb-IQ"
  | "ckb-IR"
  | "cs-CZ"
  | "cy-WL"
  | "el-GR"
  | "et-EE"
  | "et-ET"
  | "eu-ES"
  | "fi-FI"
  | "gl-ES"
  | "gu-IN"
  | "ha-NG"
  | "hr-HR"
  | "hu-HU"
  | "hy-AM"
  | "is-IS"
  | "ka-GE"
  | "kab-DZ"
  | "kk-KZ"
  | "kn-IN"
  | "ky-KG"
  | "lg-IN"
  | "lt-LT"
  | "lv-LV"
  | "mhr-RU"
  | "mi-NZ"
  | "mk-MK"
  | "ml-IN"
  | "mn-MN"
  | "mr-IN"
  | "mt-MT"
  | "no-NO"
  | "ne-NP"
  | "or-IN"
  | "pa-IN"
  | "pl-PL"
  | "ps-AF"
  | "ro-RO"
  | "rw-RW"
  | "si-LK"
  | "sk-SK"
  | "sl-SI"
  | "so-SO"
  | "sq-AL"
  | "sr-RS"
  | "su-ID"
  | "sw-BI"
  | "sw-KE"
  | "sw-RW"
  | "sw-TZ"
  | "sw-UG"
  | "tl-PH"
  | "tt-RU"
  | "ug-CN"
  | "uk-UA"
  | "uz-UZ"
  | "wo-SN"
  | "zh-HK"
  | "zu-ZA"
  | (string & {});
export const LanguageCode = /*@__PURE__*/ S.String;

export interface CreateMedicalVocabularyRequest {
  VocabularyName: string;
  LanguageCode: LanguageCode;
  VocabularyFileUri: string;
  Tags?: Tag[];
}
export const CreateMedicalVocabularyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")),
    LanguageCode: LanguageCode,
    VocabularyFileUri: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/medicalvocabularies/{VocabularyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMedicalVocabularyRequest",
}) as any as S.Schema<CreateMedicalVocabularyRequest>;
export type VocabularyState = "PENDING" | "READY" | "FAILED" | (string & {});
export const VocabularyState = /*@__PURE__*/ S.String;

export type FailureReason = string;
export interface CreateMedicalVocabularyResponse {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  VocabularyState?: VocabularyState;
  LastModifiedTime?: Date;
  FailureReason?: string;
}
export const CreateMedicalVocabularyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    VocabularyState: S.optional(VocabularyState),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FailureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateMedicalVocabularyResponse",
}) as any as S.Schema<CreateMedicalVocabularyResponse>;
export type Phrase = string;
export type Phrases = string[];
export const Phrases = /*@__PURE__*/ S.Array(S.String);
export interface CreateVocabularyRequest {
  VocabularyName: string;
  LanguageCode: LanguageCode;
  Phrases?: string[];
  VocabularyFileUri?: string;
  Tags?: Tag[];
  DataAccessRoleArn?: string;
}
export const CreateVocabularyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")),
    LanguageCode: LanguageCode,
    Phrases: S.optional(Phrases),
    VocabularyFileUri: S.optional(S.String),
    Tags: S.optional(TagList),
    DataAccessRoleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/vocabularies/{VocabularyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVocabularyRequest",
}) as any as S.Schema<CreateVocabularyRequest>;
export interface CreateVocabularyResponse {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  VocabularyState?: VocabularyState;
  LastModifiedTime?: Date;
  FailureReason?: string;
}
export const CreateVocabularyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    VocabularyState: S.optional(VocabularyState),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FailureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "CreateVocabularyResponse",
}) as any as S.Schema<CreateVocabularyResponse>;
export type VocabularyFilterName = string;
export type Word = string;
export type Words = string[];
export const Words = /*@__PURE__*/ S.Array(S.String);
export interface CreateVocabularyFilterRequest {
  VocabularyFilterName: string;
  LanguageCode: LanguageCode;
  Words?: string[];
  VocabularyFilterFileUri?: string;
  Tags?: Tag[];
  DataAccessRoleArn?: string;
}
export const CreateVocabularyFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyFilterName: S.String.pipe(T.HttpLabel("VocabularyFilterName")),
    LanguageCode: LanguageCode,
    Words: S.optional(Words),
    VocabularyFilterFileUri: S.optional(S.String),
    Tags: S.optional(TagList),
    DataAccessRoleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/vocabularyFilters/{VocabularyFilterName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateVocabularyFilterRequest",
}) as any as S.Schema<CreateVocabularyFilterRequest>;
export interface CreateVocabularyFilterResponse {
  VocabularyFilterName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
}
export const CreateVocabularyFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyFilterName: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "CreateVocabularyFilterResponse",
}) as any as S.Schema<CreateVocabularyFilterResponse>;
export interface DeleteCallAnalyticsCategoryRequest {
  CategoryName: string;
}
export const DeleteCallAnalyticsCategoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CategoryName: S.String.pipe(T.HttpLabel("CategoryName")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/callanalyticscategories/{CategoryName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCallAnalyticsCategoryRequest",
}) as any as S.Schema<DeleteCallAnalyticsCategoryRequest>;
export interface DeleteCallAnalyticsCategoryResponse {}
export const DeleteCallAnalyticsCategoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCallAnalyticsCategoryResponse",
}) as any as S.Schema<DeleteCallAnalyticsCategoryResponse>;
export type CallAnalyticsJobName = string;
export interface DeleteCallAnalyticsJobRequest {
  CallAnalyticsJobName: string;
}
export const DeleteCallAnalyticsJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CallAnalyticsJobName: S.String.pipe(T.HttpLabel("CallAnalyticsJobName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/callanalyticsjobs/{CallAnalyticsJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteCallAnalyticsJobRequest",
}) as any as S.Schema<DeleteCallAnalyticsJobRequest>;
export interface DeleteCallAnalyticsJobResponse {}
export const DeleteCallAnalyticsJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteCallAnalyticsJobResponse",
}) as any as S.Schema<DeleteCallAnalyticsJobResponse>;
export interface DeleteLanguageModelRequest {
  ModelName: string;
}
export const DeleteLanguageModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ModelName: S.String.pipe(T.HttpLabel("ModelName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/languagemodels/{ModelName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLanguageModelRequest",
}) as any as S.Schema<DeleteLanguageModelRequest>;
export interface DeleteLanguageModelResponse {}
export const DeleteLanguageModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLanguageModelResponse",
}) as any as S.Schema<DeleteLanguageModelResponse>;
export type TranscriptionJobName = string;
export interface DeleteMedicalScribeJobRequest {
  MedicalScribeJobName: string;
}
export const DeleteMedicalScribeJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MedicalScribeJobName: S.String.pipe(T.HttpLabel("MedicalScribeJobName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/medicalscribejobs/{MedicalScribeJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMedicalScribeJobRequest",
}) as any as S.Schema<DeleteMedicalScribeJobRequest>;
export interface DeleteMedicalScribeJobResponse {}
export const DeleteMedicalScribeJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMedicalScribeJobResponse",
}) as any as S.Schema<DeleteMedicalScribeJobResponse>;
export interface DeleteMedicalTranscriptionJobRequest {
  MedicalTranscriptionJobName: string;
}
export const DeleteMedicalTranscriptionJobRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MedicalTranscriptionJobName: S.String.pipe(
        T.HttpLabel("MedicalTranscriptionJobName"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/medicaltranscriptionjobs/{MedicalTranscriptionJobName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteMedicalTranscriptionJobRequest",
}) as any as S.Schema<DeleteMedicalTranscriptionJobRequest>;
export interface DeleteMedicalTranscriptionJobResponse {}
export const DeleteMedicalTranscriptionJobResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteMedicalTranscriptionJobResponse",
}) as any as S.Schema<DeleteMedicalTranscriptionJobResponse>;
export interface DeleteMedicalVocabularyRequest {
  VocabularyName: string;
}
export const DeleteMedicalVocabularyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/medicalvocabularies/{VocabularyName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMedicalVocabularyRequest",
}) as any as S.Schema<DeleteMedicalVocabularyRequest>;
export interface DeleteMedicalVocabularyResponse {}
export const DeleteMedicalVocabularyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMedicalVocabularyResponse",
}) as any as S.Schema<DeleteMedicalVocabularyResponse>;
export interface DeleteTranscriptionJobRequest {
  TranscriptionJobName: string;
}
export const DeleteTranscriptionJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TranscriptionJobName: S.String.pipe(T.HttpLabel("TranscriptionJobName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/transcriptionjobs/{TranscriptionJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTranscriptionJobRequest",
}) as any as S.Schema<DeleteTranscriptionJobRequest>;
export interface DeleteTranscriptionJobResponse {}
export const DeleteTranscriptionJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTranscriptionJobResponse",
}) as any as S.Schema<DeleteTranscriptionJobResponse>;
export interface DeleteVocabularyRequest {
  VocabularyName: string;
}
export const DeleteVocabularyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/vocabularies/{VocabularyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVocabularyRequest",
}) as any as S.Schema<DeleteVocabularyRequest>;
export interface DeleteVocabularyResponse {}
export const DeleteVocabularyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVocabularyResponse",
}) as any as S.Schema<DeleteVocabularyResponse>;
export interface DeleteVocabularyFilterRequest {
  VocabularyFilterName: string;
}
export const DeleteVocabularyFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyFilterName: S.String.pipe(T.HttpLabel("VocabularyFilterName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/vocabularyFilters/{VocabularyFilterName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVocabularyFilterRequest",
}) as any as S.Schema<DeleteVocabularyFilterRequest>;
export interface DeleteVocabularyFilterResponse {}
export const DeleteVocabularyFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVocabularyFilterResponse",
}) as any as S.Schema<DeleteVocabularyFilterResponse>;
export interface DescribeLanguageModelRequest {
  ModelName: string;
}
export const DescribeLanguageModelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ModelName: S.String.pipe(T.HttpLabel("ModelName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/languagemodels/{ModelName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeLanguageModelRequest",
}) as any as S.Schema<DescribeLanguageModelRequest>;
export interface LanguageModel {
  ModelName?: string;
  CreateTime?: Date;
  LastModifiedTime?: Date;
  LanguageCode?: CLMLanguageCode;
  BaseModelName?: BaseModelName;
  ModelStatus?: ModelStatus;
  UpgradeAvailability?: boolean;
  FailureReason?: string;
  InputDataConfig?: InputDataConfig;
}
export const LanguageModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ModelName: S.optional(S.String),
    CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LanguageCode: S.optional(CLMLanguageCode),
    BaseModelName: S.optional(BaseModelName),
    ModelStatus: S.optional(ModelStatus),
    UpgradeAvailability: S.optional(S.Boolean),
    FailureReason: S.optional(S.String),
    InputDataConfig: S.optional(InputDataConfig),
  }),
).annotate({ identifier: "LanguageModel" }) as any as S.Schema<LanguageModel>;
export interface DescribeLanguageModelResponse {
  LanguageModel?: LanguageModel;
}
export const DescribeLanguageModelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LanguageModel: S.optional(LanguageModel) }),
).annotate({
  identifier: "DescribeLanguageModelResponse",
}) as any as S.Schema<DescribeLanguageModelResponse>;
export interface GetCallAnalyticsCategoryRequest {
  CategoryName: string;
}
export const GetCallAnalyticsCategoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CategoryName: S.String.pipe(T.HttpLabel("CategoryName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/callanalyticscategories/{CategoryName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCallAnalyticsCategoryRequest",
}) as any as S.Schema<GetCallAnalyticsCategoryRequest>;
export interface GetCallAnalyticsCategoryResponse {
  CategoryProperties?: CategoryProperties;
}
export const GetCallAnalyticsCategoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CategoryProperties: S.optional(CategoryProperties) }),
).annotate({
  identifier: "GetCallAnalyticsCategoryResponse",
}) as any as S.Schema<GetCallAnalyticsCategoryResponse>;
export interface GetCallAnalyticsJobRequest {
  CallAnalyticsJobName: string;
}
export const GetCallAnalyticsJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CallAnalyticsJobName: S.String.pipe(T.HttpLabel("CallAnalyticsJobName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/callanalyticsjobs/{CallAnalyticsJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCallAnalyticsJobRequest",
}) as any as S.Schema<GetCallAnalyticsJobRequest>;
export type CallAnalyticsJobStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const CallAnalyticsJobStatus = /*@__PURE__*/ S.String;

export type CallAnalyticsFeature = "GENERATIVE_SUMMARIZATION" | (string & {});
export const CallAnalyticsFeature = /*@__PURE__*/ S.String;

export type CallAnalyticsSkippedReasonCode =
  | "INSUFFICIENT_CONVERSATION_CONTENT"
  | "FAILED_SAFETY_GUIDELINES"
  | (string & {});
export const CallAnalyticsSkippedReasonCode = /*@__PURE__*/ S.String;

export interface CallAnalyticsSkippedFeature {
  Feature?: CallAnalyticsFeature;
  ReasonCode?: CallAnalyticsSkippedReasonCode;
  Message?: string;
}
export const CallAnalyticsSkippedFeature = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Feature: S.optional(CallAnalyticsFeature),
    ReasonCode: S.optional(CallAnalyticsSkippedReasonCode),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "CallAnalyticsSkippedFeature",
}) as any as S.Schema<CallAnalyticsSkippedFeature>;
export type CallAnalyticsSkippedFeatureList = CallAnalyticsSkippedFeature[];
export const CallAnalyticsSkippedFeatureList = /*@__PURE__*/ S.Array(
  CallAnalyticsSkippedFeature,
);
export interface CallAnalyticsJobDetails {
  Skipped?: CallAnalyticsSkippedFeature[];
}
export const CallAnalyticsJobDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Skipped: S.optional(CallAnalyticsSkippedFeatureList) }),
).annotate({
  identifier: "CallAnalyticsJobDetails",
}) as any as S.Schema<CallAnalyticsJobDetails>;
export type MediaSampleRateHertz = number;
export type MediaFormat =
  | "mp3"
  | "mp4"
  | "wav"
  | "flac"
  | "ogg"
  | "amr"
  | "webm"
  | "m4a"
  | (string & {});
export const MediaFormat = /*@__PURE__*/ S.String;

export interface Media {
  MediaFileUri?: string;
  RedactedMediaFileUri?: string;
}
export const Media = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaFileUri: S.optional(S.String),
    RedactedMediaFileUri: S.optional(S.String),
  }),
).annotate({ identifier: "Media" }) as any as S.Schema<Media>;
export interface Transcript {
  TranscriptFileUri?: string;
  RedactedTranscriptFileUri?: string;
}
export const Transcript = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TranscriptFileUri: S.optional(S.String),
    RedactedTranscriptFileUri: S.optional(S.String),
  }),
).annotate({ identifier: "Transcript" }) as any as S.Schema<Transcript>;
export type IdentifiedLanguageScore = number;
export type VocabularyFilterMethod = "remove" | "mask" | "tag" | (string & {});
export const VocabularyFilterMethod = /*@__PURE__*/ S.String;

export type RedactionType = "PII" | (string & {});
export const RedactionType = /*@__PURE__*/ S.String;

export type RedactionOutput =
  | "redacted"
  | "redacted_and_unredacted"
  | (string & {});
export const RedactionOutput = /*@__PURE__*/ S.String;

export type PiiEntityType =
  | "BANK_ACCOUNT_NUMBER"
  | "BANK_ROUTING"
  | "CREDIT_DEBIT_NUMBER"
  | "CREDIT_DEBIT_CVV"
  | "CREDIT_DEBIT_EXPIRY"
  | "PIN"
  | "EMAIL"
  | "ADDRESS"
  | "NAME"
  | "PHONE"
  | "SSN"
  | "ALL"
  | (string & {});
export const PiiEntityType = /*@__PURE__*/ S.String;

export type PiiEntityTypes = PiiEntityType[];
export const PiiEntityTypes = /*@__PURE__*/ S.Array(PiiEntityType);
export interface ContentRedaction {
  RedactionType: RedactionType;
  RedactionOutput: RedactionOutput;
  PiiEntityTypes?: PiiEntityType[];
}
export const ContentRedaction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RedactionType: RedactionType,
    RedactionOutput: RedactionOutput,
    PiiEntityTypes: S.optional(PiiEntityTypes),
  }),
).annotate({
  identifier: "ContentRedaction",
}) as any as S.Schema<ContentRedaction>;
export type LanguageOptions = LanguageCode[];
export const LanguageOptions = /*@__PURE__*/ S.Array(LanguageCode);
export interface LanguageIdSettings {
  VocabularyName?: string;
  VocabularyFilterName?: string;
  LanguageModelName?: string;
}
export const LanguageIdSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.optional(S.String),
    VocabularyFilterName: S.optional(S.String),
    LanguageModelName: S.optional(S.String),
  }),
).annotate({
  identifier: "LanguageIdSettings",
}) as any as S.Schema<LanguageIdSettings>;
export type LanguageIdSettingsMap = {
  [key in LanguageCode]?: LanguageIdSettings;
};
export const LanguageIdSettingsMap = /*@__PURE__*/ S.Record(
  LanguageCode,
  LanguageIdSettings.pipe(S.optional),
);
export interface Summarization {
  GenerateAbstractiveSummary: boolean;
}
export const Summarization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GenerateAbstractiveSummary: S.Boolean }),
).annotate({ identifier: "Summarization" }) as any as S.Schema<Summarization>;
export interface CallAnalyticsJobSettings {
  VocabularyName?: string;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  LanguageModelName?: string;
  ContentRedaction?: ContentRedaction;
  LanguageOptions?: LanguageCode[];
  LanguageIdSettings?: { [key: string]: LanguageIdSettings | undefined };
  Summarization?: Summarization;
}
export const CallAnalyticsJobSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.optional(S.String),
    VocabularyFilterName: S.optional(S.String),
    VocabularyFilterMethod: S.optional(VocabularyFilterMethod),
    LanguageModelName: S.optional(S.String),
    ContentRedaction: S.optional(ContentRedaction),
    LanguageOptions: S.optional(LanguageOptions),
    LanguageIdSettings: S.optional(LanguageIdSettingsMap),
    Summarization: S.optional(Summarization),
  }),
).annotate({
  identifier: "CallAnalyticsJobSettings",
}) as any as S.Schema<CallAnalyticsJobSettings>;
export type ChannelId = number;
export interface ChannelDefinition {
  ChannelId?: number;
  ParticipantRole?: ParticipantRole;
}
export const ChannelDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.optional(S.Number),
    ParticipantRole: S.optional(ParticipantRole),
  }),
).annotate({
  identifier: "ChannelDefinition",
}) as any as S.Schema<ChannelDefinition>;
export type ChannelDefinitions = ChannelDefinition[];
export const ChannelDefinitions = /*@__PURE__*/ S.Array(ChannelDefinition);
export interface CallAnalyticsJob {
  CallAnalyticsJobName?: string;
  CallAnalyticsJobStatus?: CallAnalyticsJobStatus;
  CallAnalyticsJobDetails?: CallAnalyticsJobDetails;
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaFormat?: MediaFormat;
  Media?: Media;
  Transcript?: Transcript;
  StartTime?: Date;
  CreationTime?: Date;
  CompletionTime?: Date;
  FailureReason?: string;
  DataAccessRoleArn?: string;
  IdentifiedLanguageScore?: number;
  Settings?: CallAnalyticsJobSettings;
  ChannelDefinitions?: ChannelDefinition[];
  Tags?: Tag[];
}
export const CallAnalyticsJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CallAnalyticsJobName: S.optional(S.String),
    CallAnalyticsJobStatus: S.optional(CallAnalyticsJobStatus),
    CallAnalyticsJobDetails: S.optional(CallAnalyticsJobDetails),
    LanguageCode: S.optional(LanguageCode),
    MediaSampleRateHertz: S.optional(S.Number),
    MediaFormat: S.optional(MediaFormat),
    Media: S.optional(Media),
    Transcript: S.optional(Transcript),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FailureReason: S.optional(S.String),
    DataAccessRoleArn: S.optional(S.String),
    IdentifiedLanguageScore: S.optional(S.Number),
    Settings: S.optional(CallAnalyticsJobSettings),
    ChannelDefinitions: S.optional(ChannelDefinitions),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "CallAnalyticsJob",
}) as any as S.Schema<CallAnalyticsJob>;
export interface GetCallAnalyticsJobResponse {
  CallAnalyticsJob?: CallAnalyticsJob;
}
export const GetCallAnalyticsJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CallAnalyticsJob: S.optional(CallAnalyticsJob) }),
).annotate({
  identifier: "GetCallAnalyticsJobResponse",
}) as any as S.Schema<GetCallAnalyticsJobResponse>;
export interface GetMedicalScribeJobRequest {
  MedicalScribeJobName: string;
}
export const GetMedicalScribeJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MedicalScribeJobName: S.String.pipe(T.HttpLabel("MedicalScribeJobName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/medicalscribejobs/{MedicalScribeJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMedicalScribeJobRequest",
}) as any as S.Schema<GetMedicalScribeJobRequest>;
export type MedicalScribeJobStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const MedicalScribeJobStatus = /*@__PURE__*/ S.String;

export type MedicalScribeLanguageCode = "en-US" | (string & {});
export const MedicalScribeLanguageCode = /*@__PURE__*/ S.String;

export interface MedicalScribeOutput {
  TranscriptFileUri: string;
  ClinicalDocumentUri: string;
}
export const MedicalScribeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TranscriptFileUri: S.String, ClinicalDocumentUri: S.String }),
).annotate({
  identifier: "MedicalScribeOutput",
}) as any as S.Schema<MedicalScribeOutput>;
export type MaxSpeakers = number;
export type MedicalScribeNoteTemplate =
  | "HISTORY_AND_PHYSICAL"
  | "GIRPP"
  | "BIRP"
  | "SIRP"
  | "DAP"
  | "BEHAVIORAL_SOAP"
  | "PHYSICAL_SOAP"
  | (string & {});
export const MedicalScribeNoteTemplate = /*@__PURE__*/ S.String;

export interface ClinicalNoteGenerationSettings {
  NoteTemplate?: MedicalScribeNoteTemplate;
}
export const ClinicalNoteGenerationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NoteTemplate: S.optional(MedicalScribeNoteTemplate) }),
).annotate({
  identifier: "ClinicalNoteGenerationSettings",
}) as any as S.Schema<ClinicalNoteGenerationSettings>;
export interface MedicalScribeSettings {
  ShowSpeakerLabels?: boolean;
  MaxSpeakerLabels?: number;
  ChannelIdentification?: boolean;
  VocabularyName?: string;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  ClinicalNoteGenerationSettings?: ClinicalNoteGenerationSettings;
}
export const MedicalScribeSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShowSpeakerLabels: S.optional(S.Boolean),
    MaxSpeakerLabels: S.optional(S.Number),
    ChannelIdentification: S.optional(S.Boolean),
    VocabularyName: S.optional(S.String),
    VocabularyFilterName: S.optional(S.String),
    VocabularyFilterMethod: S.optional(VocabularyFilterMethod),
    ClinicalNoteGenerationSettings: S.optional(ClinicalNoteGenerationSettings),
  }),
).annotate({
  identifier: "MedicalScribeSettings",
}) as any as S.Schema<MedicalScribeSettings>;
export type MedicalScribeChannelId = number;
export type MedicalScribeParticipantRole =
  | "PATIENT"
  | "CLINICIAN"
  | (string & {});
export const MedicalScribeParticipantRole = /*@__PURE__*/ S.String;

export interface MedicalScribeChannelDefinition {
  ChannelId: number;
  ParticipantRole: MedicalScribeParticipantRole;
}
export const MedicalScribeChannelDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.Number,
    ParticipantRole: MedicalScribeParticipantRole,
  }),
).annotate({
  identifier: "MedicalScribeChannelDefinition",
}) as any as S.Schema<MedicalScribeChannelDefinition>;
export type MedicalScribeChannelDefinitions = MedicalScribeChannelDefinition[];
export const MedicalScribeChannelDefinitions = /*@__PURE__*/ S.Array(
  MedicalScribeChannelDefinition,
);
export interface MedicalScribeJob {
  MedicalScribeJobName?: string;
  MedicalScribeJobStatus?: MedicalScribeJobStatus;
  LanguageCode?: MedicalScribeLanguageCode;
  Media?: Media;
  MedicalScribeOutput?: MedicalScribeOutput;
  StartTime?: Date;
  CreationTime?: Date;
  CompletionTime?: Date;
  FailureReason?: string;
  Settings?: MedicalScribeSettings;
  DataAccessRoleArn?: string;
  ChannelDefinitions?: MedicalScribeChannelDefinition[];
  MedicalScribeContextProvided?: boolean;
  Tags?: Tag[];
}
export const MedicalScribeJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MedicalScribeJobName: S.optional(S.String),
    MedicalScribeJobStatus: S.optional(MedicalScribeJobStatus),
    LanguageCode: S.optional(MedicalScribeLanguageCode),
    Media: S.optional(Media),
    MedicalScribeOutput: S.optional(MedicalScribeOutput),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FailureReason: S.optional(S.String),
    Settings: S.optional(MedicalScribeSettings),
    DataAccessRoleArn: S.optional(S.String),
    ChannelDefinitions: S.optional(MedicalScribeChannelDefinitions),
    MedicalScribeContextProvided: S.optional(S.Boolean),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "MedicalScribeJob",
}) as any as S.Schema<MedicalScribeJob>;
export interface GetMedicalScribeJobResponse {
  MedicalScribeJob?: MedicalScribeJob;
}
export const GetMedicalScribeJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MedicalScribeJob: S.optional(MedicalScribeJob) }),
).annotate({
  identifier: "GetMedicalScribeJobResponse",
}) as any as S.Schema<GetMedicalScribeJobResponse>;
export interface GetMedicalTranscriptionJobRequest {
  MedicalTranscriptionJobName: string;
}
export const GetMedicalTranscriptionJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MedicalTranscriptionJobName: S.String.pipe(
      T.HttpLabel("MedicalTranscriptionJobName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/medicaltranscriptionjobs/{MedicalTranscriptionJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMedicalTranscriptionJobRequest",
}) as any as S.Schema<GetMedicalTranscriptionJobRequest>;
export type TranscriptionJobStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const TranscriptionJobStatus = /*@__PURE__*/ S.String;

export type MedicalMediaSampleRateHertz = number;
export interface MedicalTranscript {
  TranscriptFileUri?: string;
}
export const MedicalTranscript = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TranscriptFileUri: S.optional(S.String) }),
).annotate({
  identifier: "MedicalTranscript",
}) as any as S.Schema<MedicalTranscript>;
export type MaxAlternatives = number;
export interface MedicalTranscriptionSetting {
  ShowSpeakerLabels?: boolean;
  MaxSpeakerLabels?: number;
  ChannelIdentification?: boolean;
  ShowAlternatives?: boolean;
  MaxAlternatives?: number;
  VocabularyName?: string;
}
export const MedicalTranscriptionSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ShowSpeakerLabels: S.optional(S.Boolean),
    MaxSpeakerLabels: S.optional(S.Number),
    ChannelIdentification: S.optional(S.Boolean),
    ShowAlternatives: S.optional(S.Boolean),
    MaxAlternatives: S.optional(S.Number),
    VocabularyName: S.optional(S.String),
  }),
).annotate({
  identifier: "MedicalTranscriptionSetting",
}) as any as S.Schema<MedicalTranscriptionSetting>;
export type MedicalContentIdentificationType = "PHI" | (string & {});
export const MedicalContentIdentificationType = /*@__PURE__*/ S.String;

export type Specialty = "PRIMARYCARE" | (string & {});
export const Specialty = /*@__PURE__*/ S.String;

export type Type = "CONVERSATION" | "DICTATION" | (string & {});
export const Type = /*@__PURE__*/ S.String;

export interface MedicalTranscriptionJob {
  MedicalTranscriptionJobName?: string;
  TranscriptionJobStatus?: TranscriptionJobStatus;
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaFormat?: MediaFormat;
  Media?: Media;
  Transcript?: MedicalTranscript;
  StartTime?: Date;
  CreationTime?: Date;
  CompletionTime?: Date;
  FailureReason?: string;
  Settings?: MedicalTranscriptionSetting;
  ContentIdentificationType?: MedicalContentIdentificationType;
  Specialty?: Specialty;
  Type?: Type;
  Tags?: Tag[];
}
export const MedicalTranscriptionJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MedicalTranscriptionJobName: S.optional(S.String),
    TranscriptionJobStatus: S.optional(TranscriptionJobStatus),
    LanguageCode: S.optional(LanguageCode),
    MediaSampleRateHertz: S.optional(S.Number),
    MediaFormat: S.optional(MediaFormat),
    Media: S.optional(Media),
    Transcript: S.optional(MedicalTranscript),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FailureReason: S.optional(S.String),
    Settings: S.optional(MedicalTranscriptionSetting),
    ContentIdentificationType: S.optional(MedicalContentIdentificationType),
    Specialty: S.optional(Specialty),
    Type: S.optional(Type),
    Tags: S.optional(TagList),
  }),
).annotate({
  identifier: "MedicalTranscriptionJob",
}) as any as S.Schema<MedicalTranscriptionJob>;
export interface GetMedicalTranscriptionJobResponse {
  MedicalTranscriptionJob?: MedicalTranscriptionJob;
}
export const GetMedicalTranscriptionJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MedicalTranscriptionJob: S.optional(MedicalTranscriptionJob) }),
).annotate({
  identifier: "GetMedicalTranscriptionJobResponse",
}) as any as S.Schema<GetMedicalTranscriptionJobResponse>;
export interface GetMedicalVocabularyRequest {
  VocabularyName: string;
}
export const GetMedicalVocabularyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/medicalvocabularies/{VocabularyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMedicalVocabularyRequest",
}) as any as S.Schema<GetMedicalVocabularyRequest>;
export interface GetMedicalVocabularyResponse {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  VocabularyState?: VocabularyState;
  LastModifiedTime?: Date;
  FailureReason?: string;
  DownloadUri?: string;
}
export const GetMedicalVocabularyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    VocabularyState: S.optional(VocabularyState),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FailureReason: S.optional(S.String),
    DownloadUri: S.optional(S.String),
  }),
).annotate({
  identifier: "GetMedicalVocabularyResponse",
}) as any as S.Schema<GetMedicalVocabularyResponse>;
export interface GetTranscriptionJobRequest {
  TranscriptionJobName: string;
}
export const GetTranscriptionJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TranscriptionJobName: S.String.pipe(T.HttpLabel("TranscriptionJobName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/transcriptionjobs/{TranscriptionJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetTranscriptionJobRequest",
}) as any as S.Schema<GetTranscriptionJobRequest>;
export interface Settings {
  VocabularyName?: string;
  ShowSpeakerLabels?: boolean;
  MaxSpeakerLabels?: number;
  ChannelIdentification?: boolean;
  ShowAlternatives?: boolean;
  MaxAlternatives?: number;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
}
export const Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.optional(S.String),
    ShowSpeakerLabels: S.optional(S.Boolean),
    MaxSpeakerLabels: S.optional(S.Number),
    ChannelIdentification: S.optional(S.Boolean),
    ShowAlternatives: S.optional(S.Boolean),
    MaxAlternatives: S.optional(S.Number),
    VocabularyFilterName: S.optional(S.String),
    VocabularyFilterMethod: S.optional(VocabularyFilterMethod),
  }),
).annotate({ identifier: "Settings" }) as any as S.Schema<Settings>;
export interface ModelSettings {
  LanguageModelName?: string;
}
export const ModelSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LanguageModelName: S.optional(S.String) }),
).annotate({ identifier: "ModelSettings" }) as any as S.Schema<ModelSettings>;
export interface JobExecutionSettings {
  AllowDeferredExecution?: boolean;
  DataAccessRoleArn?: string;
}
export const JobExecutionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowDeferredExecution: S.optional(S.Boolean),
    DataAccessRoleArn: S.optional(S.String),
  }),
).annotate({
  identifier: "JobExecutionSettings",
}) as any as S.Schema<JobExecutionSettings>;
export type DurationInSeconds = number;
export interface LanguageCodeItem {
  LanguageCode?: LanguageCode;
  DurationInSeconds?: number;
}
export const LanguageCodeItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LanguageCode: S.optional(LanguageCode),
    DurationInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "LanguageCodeItem",
}) as any as S.Schema<LanguageCodeItem>;
export type LanguageCodeList = LanguageCodeItem[];
export const LanguageCodeList = /*@__PURE__*/ S.Array(LanguageCodeItem);
export type SubtitleFormat = "vtt" | "srt" | (string & {});
export const SubtitleFormat = /*@__PURE__*/ S.String;

export type SubtitleFormats = SubtitleFormat[];
export const SubtitleFormats = /*@__PURE__*/ S.Array(SubtitleFormat);
export type SubtitleFileUris = string[];
export const SubtitleFileUris = /*@__PURE__*/ S.Array(S.String);
export type SubtitleOutputStartIndex = number;
export interface SubtitlesOutput {
  Formats?: SubtitleFormat[];
  SubtitleFileUris?: string[];
  OutputStartIndex?: number;
}
export const SubtitlesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Formats: S.optional(SubtitleFormats),
    SubtitleFileUris: S.optional(SubtitleFileUris),
    OutputStartIndex: S.optional(S.Number),
  }),
).annotate({
  identifier: "SubtitlesOutput",
}) as any as S.Schema<SubtitlesOutput>;
export type ToxicityCategory = "ALL" | (string & {});
export const ToxicityCategory = /*@__PURE__*/ S.String;

export type ToxicityCategories = ToxicityCategory[];
export const ToxicityCategories = /*@__PURE__*/ S.Array(ToxicityCategory);
export interface ToxicityDetectionSettings {
  ToxicityCategories: ToxicityCategory[];
}
export const ToxicityDetectionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ToxicityCategories: ToxicityCategories }),
).annotate({
  identifier: "ToxicityDetectionSettings",
}) as any as S.Schema<ToxicityDetectionSettings>;
export type ToxicityDetection = ToxicityDetectionSettings[];
export const ToxicityDetection = /*@__PURE__*/ S.Array(
  ToxicityDetectionSettings,
);
export interface TranscriptionJob {
  TranscriptionJobName?: string;
  TranscriptionJobStatus?: TranscriptionJobStatus;
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaFormat?: MediaFormat;
  Media?: Media;
  Transcript?: Transcript;
  StartTime?: Date;
  CreationTime?: Date;
  CompletionTime?: Date;
  FailureReason?: string;
  Settings?: Settings;
  ModelSettings?: ModelSettings;
  JobExecutionSettings?: JobExecutionSettings;
  ContentRedaction?: ContentRedaction;
  IdentifyLanguage?: boolean;
  IdentifyMultipleLanguages?: boolean;
  LanguageOptions?: LanguageCode[];
  IdentifiedLanguageScore?: number;
  LanguageCodes?: LanguageCodeItem[];
  Tags?: Tag[];
  Subtitles?: SubtitlesOutput;
  LanguageIdSettings?: { [key: string]: LanguageIdSettings | undefined };
  ToxicityDetection?: ToxicityDetectionSettings[];
}
export const TranscriptionJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TranscriptionJobName: S.optional(S.String),
    TranscriptionJobStatus: S.optional(TranscriptionJobStatus),
    LanguageCode: S.optional(LanguageCode),
    MediaSampleRateHertz: S.optional(S.Number),
    MediaFormat: S.optional(MediaFormat),
    Media: S.optional(Media),
    Transcript: S.optional(Transcript),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FailureReason: S.optional(S.String),
    Settings: S.optional(Settings),
    ModelSettings: S.optional(ModelSettings),
    JobExecutionSettings: S.optional(JobExecutionSettings),
    ContentRedaction: S.optional(ContentRedaction),
    IdentifyLanguage: S.optional(S.Boolean),
    IdentifyMultipleLanguages: S.optional(S.Boolean),
    LanguageOptions: S.optional(LanguageOptions),
    IdentifiedLanguageScore: S.optional(S.Number),
    LanguageCodes: S.optional(LanguageCodeList),
    Tags: S.optional(TagList),
    Subtitles: S.optional(SubtitlesOutput),
    LanguageIdSettings: S.optional(LanguageIdSettingsMap),
    ToxicityDetection: S.optional(ToxicityDetection),
  }),
).annotate({
  identifier: "TranscriptionJob",
}) as any as S.Schema<TranscriptionJob>;
export interface GetTranscriptionJobResponse {
  TranscriptionJob?: TranscriptionJob;
}
export const GetTranscriptionJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TranscriptionJob: S.optional(TranscriptionJob) }),
).annotate({
  identifier: "GetTranscriptionJobResponse",
}) as any as S.Schema<GetTranscriptionJobResponse>;
export interface GetVocabularyRequest {
  VocabularyName: string;
}
export const GetVocabularyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/vocabularies/{VocabularyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVocabularyRequest",
}) as any as S.Schema<GetVocabularyRequest>;
export interface GetVocabularyResponse {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  VocabularyState?: VocabularyState;
  LastModifiedTime?: Date;
  FailureReason?: string;
  DownloadUri?: string;
}
export const GetVocabularyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    VocabularyState: S.optional(VocabularyState),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    FailureReason: S.optional(S.String),
    DownloadUri: S.optional(S.String),
  }),
).annotate({
  identifier: "GetVocabularyResponse",
}) as any as S.Schema<GetVocabularyResponse>;
export interface GetVocabularyFilterRequest {
  VocabularyFilterName: string;
}
export const GetVocabularyFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyFilterName: S.String.pipe(T.HttpLabel("VocabularyFilterName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/vocabularyFilters/{VocabularyFilterName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVocabularyFilterRequest",
}) as any as S.Schema<GetVocabularyFilterRequest>;
export interface GetVocabularyFilterResponse {
  VocabularyFilterName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
  DownloadUri?: string;
}
export const GetVocabularyFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyFilterName: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    DownloadUri: S.optional(S.String),
  }),
).annotate({
  identifier: "GetVocabularyFilterResponse",
}) as any as S.Schema<GetVocabularyFilterResponse>;
export type NextToken = string;
export type MaxResults = number;
export interface ListCallAnalyticsCategoriesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListCallAnalyticsCategoriesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/callanalyticscategories" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCallAnalyticsCategoriesRequest",
}) as any as S.Schema<ListCallAnalyticsCategoriesRequest>;
export type CategoryPropertiesList = CategoryProperties[];
export const CategoryPropertiesList = /*@__PURE__*/ S.Array(CategoryProperties);
export interface ListCallAnalyticsCategoriesResponse {
  NextToken?: string;
  Categories?: CategoryProperties[];
}
export const ListCallAnalyticsCategoriesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Categories: S.optional(CategoryPropertiesList),
  }),
).annotate({
  identifier: "ListCallAnalyticsCategoriesResponse",
}) as any as S.Schema<ListCallAnalyticsCategoriesResponse>;
export interface ListCallAnalyticsJobsRequest {
  Status?: CallAnalyticsJobStatus;
  JobNameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListCallAnalyticsJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(CallAnalyticsJobStatus).pipe(T.HttpQuery("Status")),
    JobNameContains: S.optional(S.String).pipe(T.HttpQuery("JobNameContains")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/callanalyticsjobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCallAnalyticsJobsRequest",
}) as any as S.Schema<ListCallAnalyticsJobsRequest>;
export interface CallAnalyticsJobSummary {
  CallAnalyticsJobName?: string;
  CreationTime?: Date;
  StartTime?: Date;
  CompletionTime?: Date;
  LanguageCode?: LanguageCode;
  CallAnalyticsJobStatus?: CallAnalyticsJobStatus;
  CallAnalyticsJobDetails?: CallAnalyticsJobDetails;
  FailureReason?: string;
}
export const CallAnalyticsJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CallAnalyticsJobName: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LanguageCode: S.optional(LanguageCode),
    CallAnalyticsJobStatus: S.optional(CallAnalyticsJobStatus),
    CallAnalyticsJobDetails: S.optional(CallAnalyticsJobDetails),
    FailureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "CallAnalyticsJobSummary",
}) as any as S.Schema<CallAnalyticsJobSummary>;
export type CallAnalyticsJobSummaries = CallAnalyticsJobSummary[];
export const CallAnalyticsJobSummaries = /*@__PURE__*/ S.Array(
  CallAnalyticsJobSummary,
);
export interface ListCallAnalyticsJobsResponse {
  Status?: CallAnalyticsJobStatus;
  NextToken?: string;
  CallAnalyticsJobSummaries?: CallAnalyticsJobSummary[];
}
export const ListCallAnalyticsJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(CallAnalyticsJobStatus),
    NextToken: S.optional(S.String),
    CallAnalyticsJobSummaries: S.optional(CallAnalyticsJobSummaries),
  }),
).annotate({
  identifier: "ListCallAnalyticsJobsResponse",
}) as any as S.Schema<ListCallAnalyticsJobsResponse>;
export interface ListLanguageModelsRequest {
  StatusEquals?: ModelStatus;
  NameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListLanguageModelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StatusEquals: S.optional(ModelStatus).pipe(
      T.HttpQuery("         StatusEquals"),
    ),
    NameContains: S.optional(S.String).pipe(T.HttpQuery("NameContains")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/languagemodels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLanguageModelsRequest",
}) as any as S.Schema<ListLanguageModelsRequest>;
export type Models = LanguageModel[];
export const Models = /*@__PURE__*/ S.Array(LanguageModel);
export interface ListLanguageModelsResponse {
  NextToken?: string;
  Models?: LanguageModel[];
}
export const ListLanguageModelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), Models: S.optional(Models) }),
).annotate({
  identifier: "ListLanguageModelsResponse",
}) as any as S.Schema<ListLanguageModelsResponse>;
export interface ListMedicalScribeJobsRequest {
  Status?: MedicalScribeJobStatus;
  JobNameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListMedicalScribeJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(MedicalScribeJobStatus).pipe(T.HttpQuery("Status")),
    JobNameContains: S.optional(S.String).pipe(T.HttpQuery("JobNameContains")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/medicalscribejobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMedicalScribeJobsRequest",
}) as any as S.Schema<ListMedicalScribeJobsRequest>;
export interface MedicalScribeJobSummary {
  MedicalScribeJobName?: string;
  CreationTime?: Date;
  StartTime?: Date;
  CompletionTime?: Date;
  LanguageCode?: MedicalScribeLanguageCode;
  MedicalScribeJobStatus?: MedicalScribeJobStatus;
  FailureReason?: string;
}
export const MedicalScribeJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MedicalScribeJobName: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LanguageCode: S.optional(MedicalScribeLanguageCode),
    MedicalScribeJobStatus: S.optional(MedicalScribeJobStatus),
    FailureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "MedicalScribeJobSummary",
}) as any as S.Schema<MedicalScribeJobSummary>;
export type MedicalScribeJobSummaries = MedicalScribeJobSummary[];
export const MedicalScribeJobSummaries = /*@__PURE__*/ S.Array(
  MedicalScribeJobSummary,
);
export interface ListMedicalScribeJobsResponse {
  Status?: MedicalScribeJobStatus;
  NextToken?: string;
  MedicalScribeJobSummaries?: MedicalScribeJobSummary[];
}
export const ListMedicalScribeJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(MedicalScribeJobStatus),
    NextToken: S.optional(S.String),
    MedicalScribeJobSummaries: S.optional(MedicalScribeJobSummaries),
  }),
).annotate({
  identifier: "ListMedicalScribeJobsResponse",
}) as any as S.Schema<ListMedicalScribeJobsResponse>;
export interface ListMedicalTranscriptionJobsRequest {
  Status?: TranscriptionJobStatus;
  JobNameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListMedicalTranscriptionJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(TranscriptionJobStatus).pipe(T.HttpQuery("Status")),
    JobNameContains: S.optional(S.String).pipe(T.HttpQuery("JobNameContains")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/medicaltranscriptionjobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMedicalTranscriptionJobsRequest",
}) as any as S.Schema<ListMedicalTranscriptionJobsRequest>;
export type OutputLocationType =
  | "CUSTOMER_BUCKET"
  | "SERVICE_BUCKET"
  | (string & {});
export const OutputLocationType = /*@__PURE__*/ S.String;

export interface MedicalTranscriptionJobSummary {
  MedicalTranscriptionJobName?: string;
  CreationTime?: Date;
  StartTime?: Date;
  CompletionTime?: Date;
  LanguageCode?: LanguageCode;
  TranscriptionJobStatus?: TranscriptionJobStatus;
  FailureReason?: string;
  OutputLocationType?: OutputLocationType;
  Specialty?: Specialty;
  ContentIdentificationType?: MedicalContentIdentificationType;
  Type?: Type;
}
export const MedicalTranscriptionJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MedicalTranscriptionJobName: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LanguageCode: S.optional(LanguageCode),
    TranscriptionJobStatus: S.optional(TranscriptionJobStatus),
    FailureReason: S.optional(S.String),
    OutputLocationType: S.optional(OutputLocationType),
    Specialty: S.optional(Specialty),
    ContentIdentificationType: S.optional(MedicalContentIdentificationType),
    Type: S.optional(Type),
  }),
).annotate({
  identifier: "MedicalTranscriptionJobSummary",
}) as any as S.Schema<MedicalTranscriptionJobSummary>;
export type MedicalTranscriptionJobSummaries = MedicalTranscriptionJobSummary[];
export const MedicalTranscriptionJobSummaries = /*@__PURE__*/ S.Array(
  MedicalTranscriptionJobSummary,
);
export interface ListMedicalTranscriptionJobsResponse {
  Status?: TranscriptionJobStatus;
  NextToken?: string;
  MedicalTranscriptionJobSummaries?: MedicalTranscriptionJobSummary[];
}
export const ListMedicalTranscriptionJobsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Status: S.optional(TranscriptionJobStatus),
      NextToken: S.optional(S.String),
      MedicalTranscriptionJobSummaries: S.optional(
        MedicalTranscriptionJobSummaries,
      ),
    }),
).annotate({
  identifier: "ListMedicalTranscriptionJobsResponse",
}) as any as S.Schema<ListMedicalTranscriptionJobsResponse>;
export interface ListMedicalVocabulariesRequest {
  NextToken?: string;
  MaxResults?: number;
  StateEquals?: VocabularyState;
  NameContains?: string;
}
export const ListMedicalVocabulariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    StateEquals: S.optional(VocabularyState).pipe(T.HttpQuery("StateEquals")),
    NameContains: S.optional(S.String).pipe(T.HttpQuery("NameContains")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/medicalvocabularies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMedicalVocabulariesRequest",
}) as any as S.Schema<ListMedicalVocabulariesRequest>;
export interface VocabularyInfo {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
  VocabularyState?: VocabularyState;
}
export const VocabularyInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    VocabularyState: S.optional(VocabularyState),
  }),
).annotate({ identifier: "VocabularyInfo" }) as any as S.Schema<VocabularyInfo>;
export type Vocabularies = VocabularyInfo[];
export const Vocabularies = /*@__PURE__*/ S.Array(VocabularyInfo);
export interface ListMedicalVocabulariesResponse {
  Status?: VocabularyState;
  NextToken?: string;
  Vocabularies?: VocabularyInfo[];
}
export const ListMedicalVocabulariesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(VocabularyState),
    NextToken: S.optional(S.String),
    Vocabularies: S.optional(Vocabularies),
  }),
).annotate({
  identifier: "ListMedicalVocabulariesResponse",
}) as any as S.Schema<ListMedicalVocabulariesResponse>;
export type TranscribeArn = string;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
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
  ResourceArn?: string;
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.optional(S.String), Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTranscriptionJobsRequest {
  Status?: TranscriptionJobStatus;
  JobNameContains?: string;
  NextToken?: string;
  MaxResults?: number;
}
export const ListTranscriptionJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(TranscriptionJobStatus).pipe(T.HttpQuery("Status")),
    JobNameContains: S.optional(S.String).pipe(T.HttpQuery("JobNameContains")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/transcriptionjobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTranscriptionJobsRequest",
}) as any as S.Schema<ListTranscriptionJobsRequest>;
export interface TranscriptionJobSummary {
  TranscriptionJobName?: string;
  CreationTime?: Date;
  StartTime?: Date;
  CompletionTime?: Date;
  LanguageCode?: LanguageCode;
  TranscriptionJobStatus?: TranscriptionJobStatus;
  FailureReason?: string;
  OutputLocationType?: OutputLocationType;
  ContentRedaction?: ContentRedaction;
  ModelSettings?: ModelSettings;
  IdentifyLanguage?: boolean;
  IdentifyMultipleLanguages?: boolean;
  IdentifiedLanguageScore?: number;
  LanguageCodes?: LanguageCodeItem[];
  ToxicityDetection?: ToxicityDetectionSettings[];
}
export const TranscriptionJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TranscriptionJobName: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CompletionTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LanguageCode: S.optional(LanguageCode),
    TranscriptionJobStatus: S.optional(TranscriptionJobStatus),
    FailureReason: S.optional(S.String),
    OutputLocationType: S.optional(OutputLocationType),
    ContentRedaction: S.optional(ContentRedaction),
    ModelSettings: S.optional(ModelSettings),
    IdentifyLanguage: S.optional(S.Boolean),
    IdentifyMultipleLanguages: S.optional(S.Boolean),
    IdentifiedLanguageScore: S.optional(S.Number),
    LanguageCodes: S.optional(LanguageCodeList),
    ToxicityDetection: S.optional(ToxicityDetection),
  }),
).annotate({
  identifier: "TranscriptionJobSummary",
}) as any as S.Schema<TranscriptionJobSummary>;
export type TranscriptionJobSummaries = TranscriptionJobSummary[];
export const TranscriptionJobSummaries = /*@__PURE__*/ S.Array(
  TranscriptionJobSummary,
);
export interface ListTranscriptionJobsResponse {
  Status?: TranscriptionJobStatus;
  NextToken?: string;
  TranscriptionJobSummaries?: TranscriptionJobSummary[];
}
export const ListTranscriptionJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(TranscriptionJobStatus),
    NextToken: S.optional(S.String),
    TranscriptionJobSummaries: S.optional(TranscriptionJobSummaries),
  }),
).annotate({
  identifier: "ListTranscriptionJobsResponse",
}) as any as S.Schema<ListTranscriptionJobsResponse>;
export interface ListVocabulariesRequest {
  NextToken?: string;
  MaxResults?: number;
  StateEquals?: VocabularyState;
  NameContains?: string;
}
export const ListVocabulariesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    StateEquals: S.optional(VocabularyState).pipe(T.HttpQuery("StateEquals")),
    NameContains: S.optional(S.String).pipe(T.HttpQuery("NameContains")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/vocabularies" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVocabulariesRequest",
}) as any as S.Schema<ListVocabulariesRequest>;
export interface ListVocabulariesResponse {
  Status?: VocabularyState;
  NextToken?: string;
  Vocabularies?: VocabularyInfo[];
}
export const ListVocabulariesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: S.optional(VocabularyState),
    NextToken: S.optional(S.String),
    Vocabularies: S.optional(Vocabularies),
  }),
).annotate({
  identifier: "ListVocabulariesResponse",
}) as any as S.Schema<ListVocabulariesResponse>;
export interface ListVocabularyFiltersRequest {
  NextToken?: string;
  MaxResults?: number;
  NameContains?: string;
}
export const ListVocabularyFiltersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NameContains: S.optional(S.String).pipe(T.HttpQuery("NameContains")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/vocabularyFilters" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVocabularyFiltersRequest",
}) as any as S.Schema<ListVocabularyFiltersRequest>;
export interface VocabularyFilterInfo {
  VocabularyFilterName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
}
export const VocabularyFilterInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyFilterName: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "VocabularyFilterInfo",
}) as any as S.Schema<VocabularyFilterInfo>;
export type VocabularyFilters = VocabularyFilterInfo[];
export const VocabularyFilters = /*@__PURE__*/ S.Array(VocabularyFilterInfo);
export interface ListVocabularyFiltersResponse {
  NextToken?: string;
  VocabularyFilters?: VocabularyFilterInfo[];
}
export const ListVocabularyFiltersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    VocabularyFilters: S.optional(VocabularyFilters),
  }),
).annotate({
  identifier: "ListVocabularyFiltersResponse",
}) as any as S.Schema<ListVocabularyFiltersResponse>;
export type KMSKeyId = string;
export interface StartCallAnalyticsJobRequest {
  CallAnalyticsJobName: string;
  Media: Media;
  OutputLocation?: string;
  OutputEncryptionKMSKeyId?: string;
  DataAccessRoleArn?: string;
  Settings?: CallAnalyticsJobSettings;
  Tags?: Tag[];
  ChannelDefinitions?: ChannelDefinition[];
}
export const StartCallAnalyticsJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CallAnalyticsJobName: S.String.pipe(T.HttpLabel("CallAnalyticsJobName")),
    Media: Media,
    OutputLocation: S.optional(S.String),
    OutputEncryptionKMSKeyId: S.optional(S.String),
    DataAccessRoleArn: S.optional(S.String),
    Settings: S.optional(CallAnalyticsJobSettings),
    Tags: S.optional(TagList),
    ChannelDefinitions: S.optional(ChannelDefinitions),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/callanalyticsjobs/{CallAnalyticsJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCallAnalyticsJobRequest",
}) as any as S.Schema<StartCallAnalyticsJobRequest>;
export interface StartCallAnalyticsJobResponse {
  CallAnalyticsJob?: CallAnalyticsJob;
}
export const StartCallAnalyticsJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CallAnalyticsJob: S.optional(CallAnalyticsJob) }),
).annotate({
  identifier: "StartCallAnalyticsJobResponse",
}) as any as S.Schema<StartCallAnalyticsJobResponse>;
export type OutputBucketName = string;
export type KMSEncryptionContextMap = { [key: string]: string | undefined };
export const KMSEncryptionContextMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Pronouns = "HE_HIM" | "SHE_HER" | "THEY_THEM" | (string & {});
export const Pronouns = /*@__PURE__*/ S.String;

export interface MedicalScribePatientContext {
  Pronouns?: Pronouns;
}
export const MedicalScribePatientContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pronouns: S.optional(Pronouns) }),
).annotate({
  identifier: "MedicalScribePatientContext",
}) as any as S.Schema<MedicalScribePatientContext>;
export interface MedicalScribeContext {
  PatientContext?: MedicalScribePatientContext;
}
export const MedicalScribeContext = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PatientContext: S.optional(MedicalScribePatientContext) }),
).annotate({
  identifier: "MedicalScribeContext",
}) as any as S.Schema<MedicalScribeContext>;
export interface StartMedicalScribeJobRequest {
  MedicalScribeJobName: string;
  Media: Media;
  OutputBucketName: string;
  OutputEncryptionKMSKeyId?: string;
  KMSEncryptionContext?: { [key: string]: string | undefined };
  DataAccessRoleArn: string;
  Settings: MedicalScribeSettings;
  ChannelDefinitions?: MedicalScribeChannelDefinition[];
  Tags?: Tag[];
  MedicalScribeContext?: MedicalScribeContext;
}
export const StartMedicalScribeJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MedicalScribeJobName: S.String.pipe(T.HttpLabel("MedicalScribeJobName")),
    Media: Media,
    OutputBucketName: S.String,
    OutputEncryptionKMSKeyId: S.optional(S.String),
    KMSEncryptionContext: S.optional(KMSEncryptionContextMap),
    DataAccessRoleArn: S.String,
    Settings: MedicalScribeSettings,
    ChannelDefinitions: S.optional(MedicalScribeChannelDefinitions),
    Tags: S.optional(TagList),
    MedicalScribeContext: S.optional(MedicalScribeContext),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/medicalscribejobs/{MedicalScribeJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMedicalScribeJobRequest",
}) as any as S.Schema<StartMedicalScribeJobRequest>;
export interface StartMedicalScribeJobResponse {
  MedicalScribeJob?: MedicalScribeJob;
}
export const StartMedicalScribeJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MedicalScribeJob: S.optional(MedicalScribeJob) }),
).annotate({
  identifier: "StartMedicalScribeJobResponse",
}) as any as S.Schema<StartMedicalScribeJobResponse>;
export type OutputKey = string;
export interface StartMedicalTranscriptionJobRequest {
  MedicalTranscriptionJobName: string;
  LanguageCode: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaFormat?: MediaFormat;
  Media: Media;
  OutputBucketName: string;
  OutputKey?: string;
  OutputEncryptionKMSKeyId?: string;
  KMSEncryptionContext?: { [key: string]: string | undefined };
  Settings?: MedicalTranscriptionSetting;
  ContentIdentificationType?: MedicalContentIdentificationType;
  Specialty: Specialty;
  Type: Type;
  Tags?: Tag[];
}
export const StartMedicalTranscriptionJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MedicalTranscriptionJobName: S.String.pipe(
      T.HttpLabel("MedicalTranscriptionJobName"),
    ),
    LanguageCode: LanguageCode,
    MediaSampleRateHertz: S.optional(S.Number),
    MediaFormat: S.optional(MediaFormat),
    Media: Media,
    OutputBucketName: S.String,
    OutputKey: S.optional(S.String),
    OutputEncryptionKMSKeyId: S.optional(S.String),
    KMSEncryptionContext: S.optional(KMSEncryptionContextMap),
    Settings: S.optional(MedicalTranscriptionSetting),
    ContentIdentificationType: S.optional(MedicalContentIdentificationType),
    Specialty: Specialty,
    Type: Type,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/medicaltranscriptionjobs/{MedicalTranscriptionJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMedicalTranscriptionJobRequest",
}) as any as S.Schema<StartMedicalTranscriptionJobRequest>;
export interface StartMedicalTranscriptionJobResponse {
  MedicalTranscriptionJob?: MedicalTranscriptionJob;
}
export const StartMedicalTranscriptionJobResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ MedicalTranscriptionJob: S.optional(MedicalTranscriptionJob) }),
).annotate({
  identifier: "StartMedicalTranscriptionJobResponse",
}) as any as S.Schema<StartMedicalTranscriptionJobResponse>;
export interface Subtitles {
  Formats?: SubtitleFormat[];
  OutputStartIndex?: number;
}
export const Subtitles = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Formats: S.optional(SubtitleFormats),
    OutputStartIndex: S.optional(S.Number),
  }),
).annotate({ identifier: "Subtitles" }) as any as S.Schema<Subtitles>;
export interface StartTranscriptionJobRequest {
  TranscriptionJobName: string;
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaFormat?: MediaFormat;
  Media: Media;
  OutputBucketName?: string;
  OutputKey?: string;
  OutputEncryptionKMSKeyId?: string;
  KMSEncryptionContext?: { [key: string]: string | undefined };
  Settings?: Settings;
  ModelSettings?: ModelSettings;
  JobExecutionSettings?: JobExecutionSettings;
  ContentRedaction?: ContentRedaction;
  IdentifyLanguage?: boolean;
  IdentifyMultipleLanguages?: boolean;
  LanguageOptions?: LanguageCode[];
  Subtitles?: Subtitles;
  Tags?: Tag[];
  LanguageIdSettings?: { [key: string]: LanguageIdSettings | undefined };
  ToxicityDetection?: ToxicityDetectionSettings[];
}
export const StartTranscriptionJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TranscriptionJobName: S.String.pipe(T.HttpLabel("TranscriptionJobName")),
    LanguageCode: S.optional(LanguageCode),
    MediaSampleRateHertz: S.optional(S.Number),
    MediaFormat: S.optional(MediaFormat),
    Media: Media,
    OutputBucketName: S.optional(S.String),
    OutputKey: S.optional(S.String),
    OutputEncryptionKMSKeyId: S.optional(S.String),
    KMSEncryptionContext: S.optional(KMSEncryptionContextMap),
    Settings: S.optional(Settings),
    ModelSettings: S.optional(ModelSettings),
    JobExecutionSettings: S.optional(JobExecutionSettings),
    ContentRedaction: S.optional(ContentRedaction),
    IdentifyLanguage: S.optional(S.Boolean),
    IdentifyMultipleLanguages: S.optional(S.Boolean),
    LanguageOptions: S.optional(LanguageOptions),
    Subtitles: S.optional(Subtitles),
    Tags: S.optional(TagList),
    LanguageIdSettings: S.optional(LanguageIdSettingsMap),
    ToxicityDetection: S.optional(ToxicityDetection),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/transcriptionjobs/{TranscriptionJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartTranscriptionJobRequest",
}) as any as S.Schema<StartTranscriptionJobRequest>;
export interface StartTranscriptionJobResponse {
  TranscriptionJob?: TranscriptionJob;
}
export const StartTranscriptionJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TranscriptionJob: S.optional(TranscriptionJob) }),
).annotate({
  identifier: "StartTranscriptionJobResponse",
}) as any as S.Schema<StartTranscriptionJobResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagList,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/tags/{ResourceArn}" }),
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
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
export interface UpdateCallAnalyticsCategoryRequest {
  CategoryName: string;
  Rules: Rule[];
  InputType?: InputType;
}
export const UpdateCallAnalyticsCategoryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CategoryName: S.String.pipe(T.HttpLabel("CategoryName")),
    Rules: RuleList,
    InputType: S.optional(InputType),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/callanalyticscategories/{CategoryName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateCallAnalyticsCategoryRequest",
}) as any as S.Schema<UpdateCallAnalyticsCategoryRequest>;
export interface UpdateCallAnalyticsCategoryResponse {
  CategoryProperties?: CategoryProperties;
}
export const UpdateCallAnalyticsCategoryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CategoryProperties: S.optional(CategoryProperties) }),
).annotate({
  identifier: "UpdateCallAnalyticsCategoryResponse",
}) as any as S.Schema<UpdateCallAnalyticsCategoryResponse>;
export interface UpdateMedicalVocabularyRequest {
  VocabularyName: string;
  LanguageCode: LanguageCode;
  VocabularyFileUri: string;
}
export const UpdateMedicalVocabularyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")),
    LanguageCode: LanguageCode,
    VocabularyFileUri: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/medicalvocabularies/{VocabularyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateMedicalVocabularyRequest",
}) as any as S.Schema<UpdateMedicalVocabularyRequest>;
export interface UpdateMedicalVocabularyResponse {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
  VocabularyState?: VocabularyState;
}
export const UpdateMedicalVocabularyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    VocabularyState: S.optional(VocabularyState),
  }),
).annotate({
  identifier: "UpdateMedicalVocabularyResponse",
}) as any as S.Schema<UpdateMedicalVocabularyResponse>;
export interface UpdateVocabularyRequest {
  VocabularyName: string;
  LanguageCode: LanguageCode;
  Phrases?: string[];
  VocabularyFileUri?: string;
  DataAccessRoleArn?: string;
}
export const UpdateVocabularyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.String.pipe(T.HttpLabel("VocabularyName")),
    LanguageCode: LanguageCode,
    Phrases: S.optional(Phrases),
    VocabularyFileUri: S.optional(S.String),
    DataAccessRoleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PATCH", uri: "/vocabularies/{VocabularyName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVocabularyRequest",
}) as any as S.Schema<UpdateVocabularyRequest>;
export interface UpdateVocabularyResponse {
  VocabularyName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
  VocabularyState?: VocabularyState;
}
export const UpdateVocabularyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    VocabularyState: S.optional(VocabularyState),
  }),
).annotate({
  identifier: "UpdateVocabularyResponse",
}) as any as S.Schema<UpdateVocabularyResponse>;
export interface UpdateVocabularyFilterRequest {
  VocabularyFilterName: string;
  Words?: string[];
  VocabularyFilterFileUri?: string;
  DataAccessRoleArn?: string;
}
export const UpdateVocabularyFilterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyFilterName: S.String.pipe(T.HttpLabel("VocabularyFilterName")),
    Words: S.optional(Words),
    VocabularyFilterFileUri: S.optional(S.String),
    DataAccessRoleArn: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/vocabularyFilters/{VocabularyFilterName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVocabularyFilterRequest",
}) as any as S.Schema<UpdateVocabularyFilterRequest>;
export interface UpdateVocabularyFilterResponse {
  VocabularyFilterName?: string;
  LanguageCode?: LanguageCode;
  LastModifiedTime?: Date;
}
export const UpdateVocabularyFilterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyFilterName: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "UpdateVocabularyFilterResponse",
}) as any as S.Schema<UpdateVocabularyFilterResponse>;
export type CreateCallAnalyticsCategoryError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new Call Analytics category.
 *
 * All categories are automatically applied to your Call Analytics transcriptions. Note that in
 * order to apply categories to your transcriptions, you must create them before submitting your
 * transcription request, as categories cannot be applied retroactively.
 *
 * When creating a new category, you can use the `InputType` parameter to
 * label the category as a `POST_CALL` or a `REAL_TIME` category.
 * `POST_CALL` categories can only be applied to post-call transcriptions and
 * `REAL_TIME` categories can only be applied to real-time transcriptions. If you
 * do not include `InputType`, your category is created as a
 * `POST_CALL` category by default.
 *
 * Call Analytics categories are composed of rules. For each category, you must create
 * between 1 and 20 rules. Rules can include these parameters: , , , and .
 *
 * To update an existing category, see .
 *
 * To learn more about Call Analytics categories, see Creating categories for post-call
 * transcriptions and Creating categories for
 * real-time transcriptions.
 */
export const createCallAnalyticsCategory: API.OperationMethod<
  CreateCallAnalyticsCategoryRequest,
  CreateCallAnalyticsCategoryResponse,
  CreateCallAnalyticsCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCallAnalyticsCategoryRequest,
  output: CreateCallAnalyticsCategoryResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCallAnalyticsCategory",
}));

export type CreateLanguageModelError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new custom language model.
 *
 * When creating a new custom language model, you must specify:
 *
 * - If you want a Wideband (audio sample rates over 16,000 Hz) or Narrowband
 * (audio sample rates under 16,000 Hz) base model
 *
 * - The location of your training and tuning files (this must be an Amazon S3 URI)
 *
 * - The language of your model
 *
 * - A unique name for your model
 */
export const createLanguageModel: API.OperationMethod<
  CreateLanguageModelRequest,
  CreateLanguageModelResponse,
  CreateLanguageModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLanguageModelRequest,
  output: CreateLanguageModelResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLanguageModel",
}));

export type CreateMedicalVocabularyError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new custom medical vocabulary.
 *
 * Before creating a new custom medical vocabulary, you must first upload a text file
 * that contains your vocabulary table into an Amazon S3 bucket.
 * Note that this differs from , where you can
 * include a list of terms within your request using the `Phrases` flag;
 * `CreateMedicalVocabulary` does not support the `Phrases`
 * flag and only accepts vocabularies in table format.
 *
 * Each language has a character set that contains all allowed characters for that
 * specific language. If you use unsupported characters, your custom vocabulary request
 * fails. Refer to Character Sets for Custom Vocabularies to get the character set for your
 * language.
 *
 * For more information, see Custom
 * vocabularies.
 */
export const createMedicalVocabulary: API.OperationMethod<
  CreateMedicalVocabularyRequest,
  CreateMedicalVocabularyResponse,
  CreateMedicalVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMedicalVocabularyRequest,
  output: CreateMedicalVocabularyResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMedicalVocabulary",
}));

export type CreateVocabularyError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new custom vocabulary.
 *
 * When creating a new custom vocabulary, you can either upload a text file that contains
 * your new entries, phrases, and terms into an Amazon S3 bucket and include the
 * URI in your request. Or you can include a list of terms directly in your request using
 * the `Phrases` flag.
 *
 * Each language has a character set that contains all allowed characters for that
 * specific language. If you use unsupported characters, your custom vocabulary request
 * fails. Refer to Character Sets for Custom Vocabularies to get the character set for your
 * language.
 *
 * For more information, see Custom
 * vocabularies.
 */
export const createVocabulary: API.OperationMethod<
  CreateVocabularyRequest,
  CreateVocabularyResponse,
  CreateVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVocabularyRequest,
  output: CreateVocabularyResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVocabulary",
}));

export type CreateVocabularyFilterError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates a new custom vocabulary filter.
 *
 * You can use custom vocabulary filters to mask, delete, or flag specific words from
 * your transcript. Custom vocabulary filters are commonly used to mask profanity in
 * transcripts.
 *
 * Each language has a character set that contains all allowed characters for that
 * specific language. If you use unsupported characters, your custom vocabulary filter
 * request fails. Refer to Character Sets for Custom
 * Vocabularies to get the character set for your language.
 *
 * For more information, see Vocabulary
 * filtering.
 */
export const createVocabularyFilter: API.OperationMethod<
  CreateVocabularyFilterRequest,
  CreateVocabularyFilterResponse,
  CreateVocabularyFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVocabularyFilterRequest,
  output: CreateVocabularyFilterResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVocabularyFilter",
}));

export type DeleteCallAnalyticsCategoryError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a Call Analytics category. To use this operation, specify the name of the
 * category you want to delete using `CategoryName`. Category names are case
 * sensitive.
 */
export const deleteCallAnalyticsCategory: API.OperationMethod<
  DeleteCallAnalyticsCategoryRequest,
  DeleteCallAnalyticsCategoryResponse,
  DeleteCallAnalyticsCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCallAnalyticsCategoryRequest,
  output: DeleteCallAnalyticsCategoryResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCallAnalyticsCategory",
}));

export type DeleteCallAnalyticsJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Deletes a Call Analytics job. To use this operation, specify the name of the job you
 * want to delete using `CallAnalyticsJobName`. Job names are case
 * sensitive.
 */
export const deleteCallAnalyticsJob: API.OperationMethod<
  DeleteCallAnalyticsJobRequest,
  DeleteCallAnalyticsJobResponse,
  DeleteCallAnalyticsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCallAnalyticsJobRequest,
  output: DeleteCallAnalyticsJobResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCallAnalyticsJob",
}));

export type DeleteLanguageModelError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Deletes a custom language model. To use this operation, specify the name of the
 * language model you want to delete using `ModelName`. custom language model
 * names are case sensitive.
 */
export const deleteLanguageModel: API.OperationMethod<
  DeleteLanguageModelRequest,
  DeleteLanguageModelResponse,
  DeleteLanguageModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLanguageModelRequest,
  output: DeleteLanguageModelResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLanguageModel",
}));

export type DeleteMedicalScribeJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Deletes a Medical Scribe job. To use this operation, specify the name of the
 * job you want to delete using `MedicalScribeJobName`. Job names are
 * case sensitive.
 */
export const deleteMedicalScribeJob: API.OperationMethod<
  DeleteMedicalScribeJobRequest,
  DeleteMedicalScribeJobResponse,
  DeleteMedicalScribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMedicalScribeJobRequest,
  output: DeleteMedicalScribeJobResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMedicalScribeJob",
}));

export type DeleteMedicalTranscriptionJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Deletes a medical transcription job. To use this operation, specify the name of the
 * job you want to delete using `MedicalTranscriptionJobName`. Job names are
 * case sensitive.
 */
export const deleteMedicalTranscriptionJob: API.OperationMethod<
  DeleteMedicalTranscriptionJobRequest,
  DeleteMedicalTranscriptionJobResponse,
  DeleteMedicalTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMedicalTranscriptionJobRequest,
  output: DeleteMedicalTranscriptionJobResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMedicalTranscriptionJob",
}));

export type DeleteMedicalVocabularyError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a custom medical vocabulary. To use this operation, specify the name of the
 * custom vocabulary you want to delete using `VocabularyName`. Custom
 * vocabulary names are case sensitive.
 */
export const deleteMedicalVocabulary: API.OperationMethod<
  DeleteMedicalVocabularyRequest,
  DeleteMedicalVocabularyResponse,
  DeleteMedicalVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMedicalVocabularyRequest,
  output: DeleteMedicalVocabularyResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMedicalVocabulary",
}));

export type DeleteTranscriptionJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Deletes a transcription job. To use this operation, specify the name of the job you
 * want to delete using `TranscriptionJobName`. Job names are case
 * sensitive.
 */
export const deleteTranscriptionJob: API.OperationMethod<
  DeleteTranscriptionJobRequest,
  DeleteTranscriptionJobResponse,
  DeleteTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTranscriptionJobRequest,
  output: DeleteTranscriptionJobResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTranscriptionJob",
}));

export type DeleteVocabularyError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a custom vocabulary. To use this operation, specify the name of the custom
 * vocabulary you want to delete using `VocabularyName`. Custom vocabulary names
 * are case sensitive.
 */
export const deleteVocabulary: API.OperationMethod<
  DeleteVocabularyRequest,
  DeleteVocabularyResponse,
  DeleteVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVocabularyRequest,
  output: DeleteVocabularyResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVocabulary",
}));

export type DeleteVocabularyFilterError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Deletes a custom vocabulary filter. To use this operation, specify the name of the
 * custom vocabulary filter you want to delete using `VocabularyFilterName`.
 * Custom vocabulary filter names are case sensitive.
 */
export const deleteVocabularyFilter: API.OperationMethod<
  DeleteVocabularyFilterRequest,
  DeleteVocabularyFilterResponse,
  DeleteVocabularyFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVocabularyFilterRequest,
  output: DeleteVocabularyFilterResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVocabularyFilter",
}));

export type DescribeLanguageModelError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified custom language model.
 *
 * This operation also shows if the base language model that you used to create your
 * custom language model has been updated. If Amazon Transcribe has updated the base
 * model, you can create a new custom language model using the updated base model.
 *
 * If you tried to create a new custom language model and the request wasn't successful,
 * you can use `DescribeLanguageModel` to help identify the reason for this
 * failure.
 */
export const describeLanguageModel: API.OperationMethod<
  DescribeLanguageModelRequest,
  DescribeLanguageModelResponse,
  DescribeLanguageModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLanguageModelRequest,
  output: DescribeLanguageModelResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLanguageModel",
}));

export type GetCallAnalyticsCategoryError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified Call Analytics category.
 *
 * To get a list of your Call Analytics categories, use the operation.
 */
export const getCallAnalyticsCategory: API.OperationMethod<
  GetCallAnalyticsCategoryRequest,
  GetCallAnalyticsCategoryResponse,
  GetCallAnalyticsCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCallAnalyticsCategoryRequest,
  output: GetCallAnalyticsCategoryResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCallAnalyticsCategory",
}));

export type GetCallAnalyticsJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified Call Analytics job.
 *
 * To view the job's status, refer to `CallAnalyticsJobStatus`. If the status
 * is `COMPLETED`, the job is finished. You can find your completed transcript
 * at the URI specified in `TranscriptFileUri`. If the status is
 * `FAILED`, `FailureReason` provides details on why your
 * transcription job failed.
 *
 * If you enabled personally identifiable information (PII) redaction, the redacted
 * transcript appears at the location specified in
 * `RedactedTranscriptFileUri`.
 *
 * If you chose to redact the audio in your media file, you can find your redacted media
 * file at the location specified in `RedactedMediaFileUri`.
 *
 * To get a list of your Call Analytics jobs, use the operation.
 */
export const getCallAnalyticsJob: API.OperationMethod<
  GetCallAnalyticsJobRequest,
  GetCallAnalyticsJobResponse,
  GetCallAnalyticsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCallAnalyticsJobRequest,
  output: GetCallAnalyticsJobResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCallAnalyticsJob",
}));

export type GetMedicalScribeJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified Medical Scribe job.
 *
 * To view the status of the specified medical transcription job, check the
 * `MedicalScribeJobStatus` field. If the status is `COMPLETED`,
 * the job is finished. You can find the results at the location specified in
 * `MedicalScribeOutput`.
 * If the status is `FAILED`, `FailureReason` provides details on why your Medical Scribe job
 * failed.
 *
 * To get a list of your Medical Scribe jobs, use the operation.
 */
export const getMedicalScribeJob: API.OperationMethod<
  GetMedicalScribeJobRequest,
  GetMedicalScribeJobResponse,
  GetMedicalScribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMedicalScribeJobRequest,
  output: GetMedicalScribeJobResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalScribeJob",
}));

export type GetMedicalTranscriptionJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified medical transcription job.
 *
 * To view the status of the specified medical transcription job, check the
 * `TranscriptionJobStatus` field. If the status is `COMPLETED`,
 * the job is finished. You can find the results at the location specified in
 * `TranscriptFileUri`. If the status is `FAILED`,
 * `FailureReason` provides details on why your transcription job
 * failed.
 *
 * To get a list of your medical transcription jobs, use the operation.
 */
export const getMedicalTranscriptionJob: API.OperationMethod<
  GetMedicalTranscriptionJobRequest,
  GetMedicalTranscriptionJobResponse,
  GetMedicalTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMedicalTranscriptionJobRequest,
  output: GetMedicalTranscriptionJobResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalTranscriptionJob",
}));

export type GetMedicalVocabularyError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified custom medical vocabulary.
 *
 * To view the status of the specified custom medical vocabulary, check the
 * `VocabularyState` field. If the status is `READY`, your custom
 * vocabulary is available to use. If the status is `FAILED`,
 * `FailureReason` provides details on why your vocabulary failed.
 *
 * To get a list of your custom medical vocabularies, use the operation.
 */
export const getMedicalVocabulary: API.OperationMethod<
  GetMedicalVocabularyRequest,
  GetMedicalVocabularyResponse,
  GetMedicalVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMedicalVocabularyRequest,
  output: GetMedicalVocabularyResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalVocabulary",
}));

export type GetTranscriptionJobError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified transcription job.
 *
 * To view the status of the specified transcription job, check the
 * `TranscriptionJobStatus` field. If the status is `COMPLETED`,
 * the job is finished. You can find the results at the location specified in
 * `TranscriptFileUri`. If the status is `FAILED`,
 * `FailureReason` provides details on why your transcription job
 * failed.
 *
 * If you enabled content redaction, the redacted transcript can be found at the location
 * specified in `RedactedTranscriptFileUri`.
 *
 * To get a list of your transcription jobs, use the operation.
 */
export const getTranscriptionJob: API.OperationMethod<
  GetTranscriptionJobRequest,
  GetTranscriptionJobResponse,
  GetTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTranscriptionJobRequest,
  output: GetTranscriptionJobResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTranscriptionJob",
}));

export type GetVocabularyError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified custom vocabulary.
 *
 * To view the status of the specified custom vocabulary, check the
 * `VocabularyState` field. If the status is `READY`, your custom
 * vocabulary is available to use. If the status is `FAILED`,
 * `FailureReason` provides details on why your custom vocabulary
 * failed.
 *
 * To get a list of your custom vocabularies, use the operation.
 */
export const getVocabulary: API.OperationMethod<
  GetVocabularyRequest,
  GetVocabularyResponse,
  GetVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVocabularyRequest,
  output: GetVocabularyResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVocabulary",
}));

export type GetVocabularyFilterError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Provides information about the specified custom vocabulary filter.
 *
 * To get a list of your custom vocabulary filters, use the operation.
 */
export const getVocabularyFilter: API.OperationMethod<
  GetVocabularyFilterRequest,
  GetVocabularyFilterResponse,
  GetVocabularyFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVocabularyFilterRequest,
  output: GetVocabularyFilterResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVocabularyFilter",
}));

export type ListCallAnalyticsCategoriesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of Call Analytics categories, including all rules that make up each
 * category.
 *
 * To get detailed information about a specific Call Analytics category, use the operation.
 */
export const listCallAnalyticsCategories: API.PaginatedOperationMethod<
  ListCallAnalyticsCategoriesRequest,
  ListCallAnalyticsCategoriesResponse,
  ListCallAnalyticsCategoriesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCallAnalyticsCategoriesRequest,
  output: ListCallAnalyticsCategoriesResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCallAnalyticsCategories",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCallAnalyticsJobsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of Call Analytics jobs that match the specified criteria. If no
 * criteria are specified, all Call Analytics jobs are returned.
 *
 * To get detailed information about a specific Call Analytics job, use the operation.
 */
export const listCallAnalyticsJobs: API.PaginatedOperationMethod<
  ListCallAnalyticsJobsRequest,
  ListCallAnalyticsJobsResponse,
  ListCallAnalyticsJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCallAnalyticsJobsRequest,
  output: ListCallAnalyticsJobsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCallAnalyticsJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLanguageModelsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of custom language models that match the specified criteria. If no
 * criteria are specified, all custom language models are returned.
 *
 * To get detailed information about a specific custom language model, use the operation.
 */
export const listLanguageModels: API.PaginatedOperationMethod<
  ListLanguageModelsRequest,
  ListLanguageModelsResponse,
  ListLanguageModelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLanguageModelsRequest,
  output: ListLanguageModelsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLanguageModels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMedicalScribeJobsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of Medical Scribe jobs that match the specified criteria. If no
 * criteria are specified, all Medical Scribe jobs are returned.
 *
 * To get detailed information about a specific Medical Scribe job, use the operation.
 */
export const listMedicalScribeJobs: API.PaginatedOperationMethod<
  ListMedicalScribeJobsRequest,
  ListMedicalScribeJobsResponse,
  ListMedicalScribeJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMedicalScribeJobsRequest,
  output: ListMedicalScribeJobsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMedicalScribeJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMedicalTranscriptionJobsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of medical transcription jobs that match the specified criteria. If no
 * criteria are specified, all medical transcription jobs are returned.
 *
 * To get detailed information about a specific medical transcription job, use the operation.
 */
export const listMedicalTranscriptionJobs: API.PaginatedOperationMethod<
  ListMedicalTranscriptionJobsRequest,
  ListMedicalTranscriptionJobsResponse,
  ListMedicalTranscriptionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMedicalTranscriptionJobsRequest,
  output: ListMedicalTranscriptionJobsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMedicalTranscriptionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMedicalVocabulariesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of custom medical vocabularies that match the specified criteria. If
 * no criteria are specified, all custom medical vocabularies are returned.
 *
 * To get detailed information about a specific custom medical vocabulary, use the operation.
 */
export const listMedicalVocabularies: API.PaginatedOperationMethod<
  ListMedicalVocabulariesRequest,
  ListMedicalVocabulariesResponse,
  ListMedicalVocabulariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMedicalVocabulariesRequest,
  output: ListMedicalVocabulariesResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMedicalVocabularies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Lists all tags associated with the specified transcription job, vocabulary, model, or
 * resource.
 *
 * To learn more about using tags with Amazon Transcribe, refer to Tagging
 * resources.
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

export type ListTranscriptionJobsError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of transcription jobs that match the specified criteria. If no
 * criteria are specified, all transcription jobs are returned.
 *
 * To get detailed information about a specific transcription job, use the operation.
 */
export const listTranscriptionJobs: API.PaginatedOperationMethod<
  ListTranscriptionJobsRequest,
  ListTranscriptionJobsResponse,
  ListTranscriptionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTranscriptionJobsRequest,
  output: ListTranscriptionJobsResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTranscriptionJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVocabulariesError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of custom vocabularies that match the specified criteria. If no
 * criteria are specified, all custom vocabularies are returned.
 *
 * To get detailed information about a specific custom vocabulary, use the operation.
 */
export const listVocabularies: API.PaginatedOperationMethod<
  ListVocabulariesRequest,
  ListVocabulariesResponse,
  ListVocabulariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVocabulariesRequest,
  output: ListVocabulariesResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVocabularies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListVocabularyFiltersError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Provides a list of custom vocabulary filters that match the specified criteria. If no
 * criteria are specified, all custom vocabularies are returned.
 *
 * To get detailed information about a specific custom vocabulary filter, use the operation.
 */
export const listVocabularyFilters: API.PaginatedOperationMethod<
  ListVocabularyFiltersRequest,
  ListVocabularyFiltersResponse,
  ListVocabularyFiltersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVocabularyFiltersRequest,
  output: ListVocabularyFiltersResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVocabularyFilters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartCallAnalyticsJobError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Transcribes the audio from a customer service call and applies any additional Request
 * Parameters you choose to include in your request.
 *
 * In addition to many standard transcription features, Call Analytics provides you with
 * call characteristics, call summarization, speaker sentiment, and optional redaction of
 * your text transcript and your audio file. You can also apply custom categories to flag
 * specified conditions. To learn more about these features and insights, refer to Analyzing call
 * center audio with Call Analytics.
 *
 * If you want to apply categories to your Call Analytics job, you must create them
 * before submitting your job request. Categories cannot be retroactively applied to a job.
 * To create a new category, use the
 * operation. To learn more about Call Analytics categories, see Creating categories for post-call
 * transcriptions and Creating categories for
 * real-time transcriptions.
 *
 * To make a `StartCallAnalyticsJob` request, you must first upload your media
 * file into an Amazon S3 bucket; you can then specify the Amazon S3
 * location of the file using the `Media` parameter.
 *
 * Job queuing is available for Call Analytics jobs. If you pass a `DataAccessRoleArn`
 * in your request and you exceed your Concurrent Job Limit, your job will automatically be
 * added to a queue to be processed once your concurrent job count is below the limit.
 *
 * You must include the following parameters in your `StartCallAnalyticsJob`
 * request:
 *
 * - `region`: The Amazon Web Services Region where you are making your
 * request. For a list of Amazon Web Services Regions supported with Amazon Transcribe, refer to Amazon Transcribe endpoints and
 * quotas.
 *
 * - `CallAnalyticsJobName`: A custom name that you create for your
 * transcription job that's unique within your Amazon Web Services account.
 *
 * - `Media` (`MediaFileUri` or
 * `RedactedMediaFileUri`): The Amazon S3 location of your
 * media file.
 *
 * With Call Analytics, you can redact the audio contained in your media file by
 * including `RedactedMediaFileUri`, instead of `MediaFileUri`,
 * to specify the location of your input audio. If you choose to redact your audio, you
 * can find your redacted media at the location specified in the
 * `RedactedMediaFileUri` field of your response.
 */
export const startCallAnalyticsJob: API.OperationMethod<
  StartCallAnalyticsJobRequest,
  StartCallAnalyticsJobResponse,
  StartCallAnalyticsJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCallAnalyticsJobRequest,
  output: StartCallAnalyticsJobResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCallAnalyticsJob",
}));

export type StartMedicalScribeJobError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Transcribes patient-clinician conversations and generates clinical notes.
 *
 * Amazon Web Services HealthScribe automatically provides rich conversation transcripts, identifies speaker roles,
 * classifies dialogues, extracts medical terms, and generates preliminary clinical notes.
 * To learn more about these features, refer to Amazon Web Services HealthScribe.
 *
 * To make a `StartMedicalScribeJob` request, you must first upload
 * your media file into an Amazon S3 bucket; you can then specify the Amazon S3 location
 * of the file using the `Media` parameter.
 *
 * You must include the following parameters in your
 * `StartMedicalTranscriptionJob` request:
 *
 * - `DataAccessRoleArn`: The ARN of an IAM role with the these minimum permissions: read permission on input file Amazon S3 bucket specified in `Media`,
 * write permission on the Amazon S3 bucket specified in `OutputBucketName`, and full permissions on the KMS key specified in `OutputEncryptionKMSKeyId` (if set).
 * The role should also allow `transcribe.amazonaws.com` to assume it.
 *
 * - `Media` (`MediaFileUri`): The Amazon S3 location
 * of your media file.
 *
 * - `MedicalScribeJobName`: A custom name you create for your
 * MedicalScribe job that is unique within your Amazon Web Services account.
 *
 * - `OutputBucketName`: The Amazon S3 bucket where you want
 * your output files stored.
 *
 * - `Settings`: A `MedicalScribeSettings` object
 * that must set exactly one of `ShowSpeakerLabels` or `ChannelIdentification` to true.
 * If `ShowSpeakerLabels` is true, `MaxSpeakerLabels` must also be set.
 *
 * - `ChannelDefinitions`: A `MedicalScribeChannelDefinitions` array should be set if and only if the `ChannelIdentification`
 * value of `Settings` is set to true.
 */
export const startMedicalScribeJob: API.OperationMethod<
  StartMedicalScribeJobRequest,
  StartMedicalScribeJobResponse,
  StartMedicalScribeJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMedicalScribeJobRequest,
  output: StartMedicalScribeJobResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMedicalScribeJob",
}));

export type StartMedicalTranscriptionJobError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Transcribes the audio from a medical dictation or conversation and applies any
 * additional Request Parameters you choose to include in your request.
 *
 * In addition to many standard transcription features, Amazon Transcribe Medical
 * provides you with a robust medical vocabulary and, optionally, content identification,
 * which adds flags to personal health information (PHI). To learn more about these
 * features, refer to How Amazon Transcribe Medical
 * works.
 *
 * To make a `StartMedicalTranscriptionJob` request, you must first upload
 * your media file into an Amazon S3 bucket; you can then specify the Amazon S3 location
 * of the file using the `Media` parameter.
 *
 * You must include the following parameters in your
 * `StartMedicalTranscriptionJob` request:
 *
 * - `region`: The Amazon Web Services Region where you are making your
 * request. For a list of Amazon Web Services Regions supported with Amazon Transcribe, refer to Amazon Transcribe endpoints and
 * quotas.
 *
 * - `MedicalTranscriptionJobName`: A custom name you create for your
 * transcription job that is unique within your Amazon Web Services account.
 *
 * - `Media` (`MediaFileUri`): The Amazon S3 location
 * of your media file.
 *
 * - `LanguageCode`: This must be `en-US`.
 *
 * - `OutputBucketName`: The Amazon S3 bucket where you want
 * your transcript stored. If you want your output stored in a sub-folder of this
 * bucket, you must also include `OutputKey`.
 *
 * - `Specialty`: This must be `PRIMARYCARE`.
 *
 * - `Type`: Choose whether your audio is a conversation or a
 * dictation.
 */
export const startMedicalTranscriptionJob: API.OperationMethod<
  StartMedicalTranscriptionJobRequest,
  StartMedicalTranscriptionJobResponse,
  StartMedicalTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMedicalTranscriptionJobRequest,
  output: StartMedicalTranscriptionJobResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMedicalTranscriptionJob",
}));

export type StartTranscriptionJobError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | CommonErrors;
/**
 * Transcribes the audio from a media file and applies any additional Request Parameters
 * you choose to include in your request.
 *
 * To make a `StartTranscriptionJob` request, you must first upload your media
 * file into an Amazon S3 bucket; you can then specify the Amazon S3
 * location of the file using the `Media` parameter.
 *
 * You must include the following parameters in your `StartTranscriptionJob`
 * request:
 *
 * - `region`: The Amazon Web Services Region where you are making your
 * request. For a list of Amazon Web Services Regions supported with Amazon Transcribe, refer to Amazon Transcribe endpoints and
 * quotas.
 *
 * - `TranscriptionJobName`: A custom name you create for your
 * transcription job that is unique within your Amazon Web Services account.
 *
 * - `Media` (`MediaFileUri`): The Amazon S3 location
 * of your media file.
 *
 * - One of `LanguageCode`, `IdentifyLanguage`, or
 * `IdentifyMultipleLanguages`: If you know the language of your
 * media file, specify it using the `LanguageCode` parameter; you can
 * find all valid language codes in the Supported
 * languages table. If you do not know the languages spoken in your
 * media, use either `IdentifyLanguage` or
 * `IdentifyMultipleLanguages` and let Amazon Transcribe identify
 * the languages for you.
 */
export const startTranscriptionJob: API.OperationMethod<
  StartTranscriptionJobRequest,
  StartTranscriptionJobResponse,
  StartTranscriptionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTranscriptionJobRequest,
  output: StartTranscriptionJobResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTranscriptionJob",
}));

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Adds one or more custom tags, each in the form of a key:value pair, to the specified
 * resource.
 *
 * To learn more about using tags with Amazon Transcribe, refer to Tagging
 * resources.
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
 * Removes the specified tags from the specified Amazon Transcribe resource.
 *
 * If you include `UntagResource` in your request, you must also include
 * `ResourceArn` and `TagKeys`.
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

export type UpdateCallAnalyticsCategoryError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Updates the specified Call Analytics category with new rules. Note that the
 * `UpdateCallAnalyticsCategory` operation overwrites all existing rules
 * contained in the specified category. You cannot append additional rules onto an existing
 * category.
 *
 * To create a new category, see .
 */
export const updateCallAnalyticsCategory: API.OperationMethod<
  UpdateCallAnalyticsCategoryRequest,
  UpdateCallAnalyticsCategoryResponse,
  UpdateCallAnalyticsCategoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCallAnalyticsCategoryRequest,
  output: UpdateCallAnalyticsCategoryResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCallAnalyticsCategory",
}));

export type UpdateMedicalVocabularyError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Updates an existing custom medical vocabulary with new values. This operation
 * overwrites all existing information with your new values; you cannot append new terms
 * onto an existing custom vocabulary.
 */
export const updateMedicalVocabulary: API.OperationMethod<
  UpdateMedicalVocabularyRequest,
  UpdateMedicalVocabularyResponse,
  UpdateMedicalVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMedicalVocabularyRequest,
  output: UpdateMedicalVocabularyResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMedicalVocabulary",
}));

export type UpdateVocabularyError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Updates an existing custom vocabulary with new values. This operation overwrites all
 * existing information with your new values; you cannot append new terms onto an existing
 * custom vocabulary.
 */
export const updateVocabulary: API.OperationMethod<
  UpdateVocabularyRequest,
  UpdateVocabularyResponse,
  UpdateVocabularyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVocabularyRequest,
  output: UpdateVocabularyResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVocabulary",
}));

export type UpdateVocabularyFilterError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | NotFoundException
  | CommonErrors;
/**
 * Updates an existing custom vocabulary filter with a new list of words. The new list
 * you provide overwrites all previous entries; you cannot append new terms onto an
 * existing custom vocabulary filter.
 */
export const updateVocabularyFilter: API.OperationMethod<
  UpdateVocabularyFilterRequest,
  UpdateVocabularyFilterResponse,
  UpdateVocabularyFilterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVocabularyFilterRequest,
  output: UpdateVocabularyFilterResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVocabularyFilter",
}));
