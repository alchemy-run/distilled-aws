import * as HttpClient from "effect/unstable/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as S from "@distilled.cloud/core/schema";
import * as stream from "effect/Stream";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { SensitiveString } from "../sensitive.ts";
const ns = T.XmlNamespace("http://polly.amazonaws.com/doc/v1");
const svc = T.AwsApiService({ sdkId: "Polly", serviceShapeName: "Parrot_v1" });
const auth = T.AwsAuthSigv4({ name: "polly" });
const ver = T.ServiceVersion("2016-06-10");
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
              `https://polly-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://polly-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://polly.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://polly.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class EngineNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<EngineNotSupportedException>()(
    "EngineNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidLexiconException
  extends /*@__PURE__*/ S.TaggedError<InvalidLexiconException>()(
    "InvalidLexiconException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3BucketException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3BucketException>()(
    "InvalidS3BucketException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidS3KeyException
  extends /*@__PURE__*/ S.TaggedError<InvalidS3KeyException>()(
    "InvalidS3KeyException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSampleRateException
  extends /*@__PURE__*/ S.TaggedError<InvalidSampleRateException>()(
    "InvalidSampleRateException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSnsTopicArnException
  extends /*@__PURE__*/ S.TaggedError<InvalidSnsTopicArnException>()(
    "InvalidSnsTopicArnException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidSsmlException
  extends /*@__PURE__*/ S.TaggedError<InvalidSsmlException>()(
    "InvalidSsmlException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidTaskIdException
  extends /*@__PURE__*/ S.TaggedError<InvalidTaskIdException>()(
    "InvalidTaskIdException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LanguageNotSupportedException
  extends /*@__PURE__*/ S.TaggedError<LanguageNotSupportedException>()(
    "LanguageNotSupportedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LexiconNotFoundException
  extends /*@__PURE__*/ S.TaggedError<LexiconNotFoundException>()(
    "LexiconNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class LexiconSizeExceededException
  extends /*@__PURE__*/ S.TaggedError<LexiconSizeExceededException>()(
    "LexiconSizeExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MarksNotSupportedForFormatException
  extends /*@__PURE__*/ S.TaggedError<MarksNotSupportedForFormatException>()(
    "MarksNotSupportedForFormatException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MaxLexemeLengthExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxLexemeLengthExceededException>()(
    "MaxLexemeLengthExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MaxLexiconsNumberExceededException
  extends /*@__PURE__*/ S.TaggedError<MaxLexiconsNumberExceededException>()(
    "MaxLexiconsNumberExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceFailureException
  extends /*@__PURE__*/ S.TaggedError<ServiceFailureException>()(
    "ServiceFailureException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      quotaCode: S.suspend(() => QuotaCode).annotate({
        identifier: "QuotaCode",
      }),
      serviceCode: S.suspend(() => ServiceCode).annotate({
        identifier: "ServiceCode",
      }),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class SsmlMarksNotSupportedForTextTypeException
  extends /*@__PURE__*/ S.TaggedError<SsmlMarksNotSupportedForTextTypeException>()(
    "SsmlMarksNotSupportedForTextTypeException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class SynthesisTaskNotFoundException
  extends /*@__PURE__*/ S.TaggedError<SynthesisTaskNotFoundException>()(
    "SynthesisTaskNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TextLengthExceededException
  extends /*@__PURE__*/ S.TaggedError<TextLengthExceededException>()(
    "TextLengthExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      throttlingReasons: S.optional(
        S.suspend(() => ThrottlingReasonList).annotate({
          identifier: "ThrottlingReasonList",
        }),
      ),
    },
    T.all(
      T.AwsQueryError({ code: "Throttling", httpResponseCode: 400 }),
      T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedPlsAlphabetException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedPlsAlphabetException>()(
    "UnsupportedPlsAlphabetException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedPlsLanguageException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedPlsLanguageException>()(
    "UnsupportedPlsLanguageException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.suspend(() => ValidationExceptionReason).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fields: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type LexiconName = string;
export interface DeleteLexiconInput {
  Name: string;
}
export const DeleteLexiconInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "DELETE", uri: "/v1/lexicons/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLexiconInput",
}) as any as S.Schema<DeleteLexiconInput>;
export interface DeleteLexiconOutput {}
export const DeleteLexiconOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteLexiconOutput",
}) as any as S.Schema<DeleteLexiconOutput>;
export type Engine =
  | "standard"
  | "neural"
  | "long-form"
  | "generative"
  | (string & {});
export const Engine = S.String;

export type LanguageCode =
  | "arb"
  | "cmn-CN"
  | "cy-GB"
  | "da-DK"
  | "de-DE"
  | "en-AU"
  | "en-GB"
  | "en-GB-WLS"
  | "en-IN"
  | "en-US"
  | "es-ES"
  | "es-MX"
  | "es-US"
  | "fr-CA"
  | "fr-FR"
  | "is-IS"
  | "it-IT"
  | "ja-JP"
  | "hi-IN"
  | "ko-KR"
  | "nb-NO"
  | "nl-NL"
  | "pl-PL"
  | "pt-BR"
  | "pt-PT"
  | "ro-RO"
  | "ru-RU"
  | "sv-SE"
  | "tr-TR"
  | "en-NZ"
  | "en-ZA"
  | "ca-ES"
  | "de-AT"
  | "yue-CN"
  | "ar-AE"
  | "fi-FI"
  | "en-IE"
  | "nl-BE"
  | "fr-BE"
  | "cs-CZ"
  | "de-CH"
  | "en-SG"
  | (string & {});
export const LanguageCode = S.String;

export type IncludeAdditionalLanguageCodes = boolean;
export type NextToken = string;
export interface DescribeVoicesInput {
  Engine?: Engine;
  LanguageCode?: LanguageCode;
  IncludeAdditionalLanguageCodes?: boolean;
  NextToken?: string;
}
export const DescribeVoicesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Engine: S.optional(Engine).pipe(T.HttpQuery("Engine")),
    LanguageCode: S.optional(LanguageCode).pipe(T.HttpQuery("LanguageCode")),
    IncludeAdditionalLanguageCodes: S.optional(S.Boolean).pipe(
      T.HttpQuery("IncludeAdditionalLanguageCodes"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/voices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVoicesInput",
}) as any as S.Schema<DescribeVoicesInput>;
export type Gender = "Female" | "Male" | (string & {});
export const Gender = S.String;

export type VoiceId =
  | "Aditi"
  | "Amy"
  | "Astrid"
  | "Bianca"
  | "Brian"
  | "Camila"
  | "Carla"
  | "Carmen"
  | "Celine"
  | "Chantal"
  | "Conchita"
  | "Cristiano"
  | "Dora"
  | "Emma"
  | "Enrique"
  | "Ewa"
  | "Filiz"
  | "Gabrielle"
  | "Geraint"
  | "Giorgio"
  | "Gwyneth"
  | "Hans"
  | "Ines"
  | "Ivy"
  | "Jacek"
  | "Jan"
  | "Joanna"
  | "Joey"
  | "Justin"
  | "Karl"
  | "Kendra"
  | "Kevin"
  | "Kimberly"
  | "Lea"
  | "Liv"
  | "Lotte"
  | "Lucia"
  | "Lupe"
  | "Mads"
  | "Maja"
  | "Marlene"
  | "Mathieu"
  | "Matthew"
  | "Maxim"
  | "Mia"
  | "Miguel"
  | "Mizuki"
  | "Naja"
  | "Nicole"
  | "Olivia"
  | "Penelope"
  | "Raveena"
  | "Ricardo"
  | "Ruben"
  | "Russell"
  | "Salli"
  | "Seoyeon"
  | "Takumi"
  | "Tatyana"
  | "Vicki"
  | "Vitoria"
  | "Zeina"
  | "Zhiyu"
  | "Aria"
  | "Ayanda"
  | "Arlet"
  | "Hannah"
  | "Arthur"
  | "Daniel"
  | "Liam"
  | "Pedro"
  | "Kajal"
  | "Hiujin"
  | "Laura"
  | "Elin"
  | "Ida"
  | "Suvi"
  | "Ola"
  | "Hala"
  | "Andres"
  | "Sergio"
  | "Remi"
  | "Adriano"
  | "Thiago"
  | "Ruth"
  | "Stephen"
  | "Kazuha"
  | "Tomoko"
  | "Niamh"
  | "Sofie"
  | "Lisa"
  | "Isabelle"
  | "Zayd"
  | "Danielle"
  | "Gregory"
  | "Burcu"
  | "Jitka"
  | "Sabrina"
  | "Jasmine"
  | "Jihye"
  | "Ambre"
  | "Beatrice"
  | "Florian"
  | "Lennart"
  | "Lorenzo"
  | "Tiffany"
  | (string & {});
export const VoiceId = S.String;

export type LanguageName = string;
export type VoiceName = string;
export type LanguageCodeList = LanguageCode[];
export const LanguageCodeList = /*@__PURE__*/ S.Array(LanguageCode);
export type EngineList = Engine[];
export const EngineList = /*@__PURE__*/ S.Array(Engine);
export interface Voice {
  Gender?: Gender;
  Id?: VoiceId;
  LanguageCode?: LanguageCode;
  LanguageName?: string;
  Name?: string;
  AdditionalLanguageCodes?: LanguageCode[];
  SupportedEngines?: Engine[];
}
export const Voice = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Gender: S.optional(Gender),
    Id: S.optional(VoiceId),
    LanguageCode: S.optional(LanguageCode),
    LanguageName: S.optional(S.String),
    Name: S.optional(S.String),
    AdditionalLanguageCodes: S.optional(LanguageCodeList),
    SupportedEngines: S.optional(EngineList),
  }),
).annotate({ identifier: "Voice" }) as any as S.Schema<Voice>;
export type VoiceList = Voice[];
export const VoiceList = /*@__PURE__*/ S.Array(Voice);
export interface DescribeVoicesOutput {
  Voices?: Voice[];
  NextToken?: string;
}
export const DescribeVoicesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Voices: S.optional(VoiceList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "DescribeVoicesOutput",
}) as any as S.Schema<DescribeVoicesOutput>;
export interface GetLexiconInput {
  Name: string;
}
export const GetLexiconInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/lexicons/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetLexiconInput",
}) as any as S.Schema<GetLexiconInput>;
export type LexiconContent = string | redacted.Redacted<string>;
export interface Lexicon {
  Content?: string | redacted.Redacted<string>;
  Name?: string;
}
export const Lexicon = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Content: S.optional(SensitiveString),
    Name: S.optional(S.String),
  }),
).annotate({ identifier: "Lexicon" }) as any as S.Schema<Lexicon>;
export type Alphabet = string;
export type LastModified = Date;
export type LexiconArn = string;
export type LexemesCount = number;
export type Size = number;
export interface LexiconAttributes {
  Alphabet?: string;
  LanguageCode?: LanguageCode;
  LastModified?: Date;
  LexiconArn?: string;
  LexemesCount?: number;
  Size?: number;
}
export const LexiconAttributes = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Alphabet: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LexiconArn: S.optional(S.String),
    LexemesCount: S.optional(S.Number),
    Size: S.optional(S.Number),
  }),
).annotate({
  identifier: "LexiconAttributes",
}) as any as S.Schema<LexiconAttributes>;
export interface GetLexiconOutput {
  Lexicon?: Lexicon;
  LexiconAttributes?: LexiconAttributes;
}
export const GetLexiconOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Lexicon: S.optional(Lexicon),
    LexiconAttributes: S.optional(LexiconAttributes),
  }).pipe(ns),
).annotate({
  identifier: "GetLexiconOutput",
}) as any as S.Schema<GetLexiconOutput>;
export type TaskId = string;
export interface GetSpeechSynthesisTaskInput {
  TaskId: string;
}
export const GetSpeechSynthesisTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TaskId: S.String.pipe(T.HttpLabel("TaskId")) }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/synthesisTasks/{TaskId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSpeechSynthesisTaskInput",
}) as any as S.Schema<GetSpeechSynthesisTaskInput>;
export type TaskStatus =
  | "scheduled"
  | "inProgress"
  | "completed"
  | "failed"
  | (string & {});
export const TaskStatus = S.String;

export type TaskStatusReason = string;
export type OutputUri = string;
export type RequestCharacters = number;
export type SnsTopicArn = string;
export type LexiconNameList = string[];
export const LexiconNameList = /*@__PURE__*/ S.Array(S.String);
export type OutputFormat =
  | "json"
  | "mp3"
  | "ogg_opus"
  | "ogg_vorbis"
  | "pcm"
  | "mulaw"
  | "alaw"
  | (string & {});
export const OutputFormat = S.String;

export type SampleRate = string;
export type SpeechMarkType =
  | "sentence"
  | "ssml"
  | "viseme"
  | "word"
  | (string & {});
export const SpeechMarkType = S.String;

export type SpeechMarkTypeList = SpeechMarkType[];
export const SpeechMarkTypeList = /*@__PURE__*/ S.Array(SpeechMarkType);
export type TextType = "ssml" | "text" | (string & {});
export const TextType = S.String;

export interface SynthesisTask {
  Engine?: Engine;
  TaskId?: string;
  TaskStatus?: TaskStatus;
  TaskStatusReason?: string;
  OutputUri?: string;
  CreationTime?: Date;
  RequestCharacters?: number;
  SnsTopicArn?: string;
  LexiconNames?: string[];
  OutputFormat?: OutputFormat;
  SampleRate?: string;
  SpeechMarkTypes?: SpeechMarkType[];
  TextType?: TextType;
  VoiceId?: VoiceId;
  LanguageCode?: LanguageCode;
}
export const SynthesisTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Engine: S.optional(Engine),
    TaskId: S.optional(S.String),
    TaskStatus: S.optional(TaskStatus),
    TaskStatusReason: S.optional(S.String),
    OutputUri: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RequestCharacters: S.optional(S.Number),
    SnsTopicArn: S.optional(S.String),
    LexiconNames: S.optional(LexiconNameList),
    OutputFormat: S.optional(OutputFormat),
    SampleRate: S.optional(S.String),
    SpeechMarkTypes: S.optional(SpeechMarkTypeList),
    TextType: S.optional(TextType),
    VoiceId: S.optional(VoiceId),
    LanguageCode: S.optional(LanguageCode),
  }),
).annotate({ identifier: "SynthesisTask" }) as any as S.Schema<SynthesisTask>;
export interface GetSpeechSynthesisTaskOutput {
  SynthesisTask?: SynthesisTask;
}
export const GetSpeechSynthesisTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SynthesisTask: S.optional(SynthesisTask) }).pipe(ns),
).annotate({
  identifier: "GetSpeechSynthesisTaskOutput",
}) as any as S.Schema<GetSpeechSynthesisTaskOutput>;
export interface ListLexiconsInput {
  NextToken?: string;
}
export const ListLexiconsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/lexicons" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLexiconsInput",
}) as any as S.Schema<ListLexiconsInput>;
export interface LexiconDescription {
  Name?: string;
  Attributes?: LexiconAttributes;
}
export const LexiconDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Attributes: S.optional(LexiconAttributes),
  }),
).annotate({
  identifier: "LexiconDescription",
}) as any as S.Schema<LexiconDescription>;
export type LexiconDescriptionList = LexiconDescription[];
export const LexiconDescriptionList = /*@__PURE__*/ S.Array(LexiconDescription);
export interface ListLexiconsOutput {
  Lexicons?: LexiconDescription[];
  NextToken?: string;
}
export const ListLexiconsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Lexicons: S.optional(LexiconDescriptionList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListLexiconsOutput",
}) as any as S.Schema<ListLexiconsOutput>;
export type MaxResults = number;
export interface ListSpeechSynthesisTasksInput {
  MaxResults?: number;
  NextToken?: string;
  Status?: TaskStatus;
}
export const ListSpeechSynthesisTasksInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
    Status: S.optional(TaskStatus).pipe(T.HttpQuery("Status")),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "GET", uri: "/v1/synthesisTasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSpeechSynthesisTasksInput",
}) as any as S.Schema<ListSpeechSynthesisTasksInput>;
export type SynthesisTasks = SynthesisTask[];
export const SynthesisTasks = /*@__PURE__*/ S.Array(SynthesisTask);
export interface ListSpeechSynthesisTasksOutput {
  NextToken?: string;
  SynthesisTasks?: SynthesisTask[];
}
export const ListSpeechSynthesisTasksOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    SynthesisTasks: S.optional(SynthesisTasks),
  }).pipe(ns),
).annotate({
  identifier: "ListSpeechSynthesisTasksOutput",
}) as any as S.Schema<ListSpeechSynthesisTasksOutput>;
export interface PutLexiconInput {
  Name: string;
  Content: string | redacted.Redacted<string>;
}
export const PutLexiconInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    Content: SensitiveString,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "PUT", uri: "/v1/lexicons/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutLexiconInput",
}) as any as S.Schema<PutLexiconInput>;
export interface PutLexiconOutput {}
export const PutLexiconOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "PutLexiconOutput",
}) as any as S.Schema<PutLexiconOutput>;
export type Text = string;
export type Force = boolean;
export interface FlushStreamConfiguration {
  Force?: boolean;
}
export const FlushStreamConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Force: S.optional(S.Boolean) }),
).annotate({
  identifier: "FlushStreamConfiguration",
}) as any as S.Schema<FlushStreamConfiguration>;
export interface TextEvent {
  Text: string;
  TextType?: TextType;
  FlushStreamConfiguration?: FlushStreamConfiguration;
}
export const TextEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Text: S.String,
    TextType: S.optional(TextType),
    FlushStreamConfiguration: S.optional(FlushStreamConfiguration),
  }),
).annotate({ identifier: "TextEvent" }) as any as S.Schema<TextEvent>;
export interface CloseStreamEvent {}
export const CloseStreamEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CloseStreamEvent",
}) as any as S.Schema<CloseStreamEvent>;
export type StartSpeechSynthesisStreamActionStream =
  | { TextEvent: TextEvent; CloseStreamEvent?: never }
  | { TextEvent?: never; CloseStreamEvent: CloseStreamEvent };
export const StartSpeechSynthesisStreamActionStream =
  /*@__PURE__*/ T.InputEventStream(
    S.Union([
      S.Struct({ TextEvent: TextEvent }),
      S.Struct({ CloseStreamEvent: CloseStreamEvent }),
    ]),
  ) as any as S.Schema<
    stream.Stream<StartSpeechSynthesisStreamActionStream, Error, never>
  >;
export interface StartSpeechSynthesisStreamInput {
  Engine: Engine;
  LanguageCode?: LanguageCode;
  LexiconNames?: string[];
  OutputFormat: OutputFormat;
  SampleRate?: string;
  VoiceId: VoiceId;
  ActionStream?: stream.Stream<
    StartSpeechSynthesisStreamActionStream,
    Error,
    never
  >;
}
export const StartSpeechSynthesisStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Engine: Engine.pipe(T.HttpHeader("x-amzn-Engine")),
    LanguageCode: S.optional(LanguageCode).pipe(
      T.HttpHeader("x-amzn-LanguageCode"),
    ),
    LexiconNames: S.optional(LexiconNameList).pipe(
      T.HttpHeader("x-amzn-LexiconNames"),
    ),
    OutputFormat: OutputFormat.pipe(T.HttpHeader("x-amzn-OutputFormat")),
    SampleRate: S.optional(S.String).pipe(T.HttpHeader("x-amzn-SampleRate")),
    VoiceId: VoiceId.pipe(T.HttpHeader("x-amzn-VoiceId")),
    ActionStream: S.optional(StartSpeechSynthesisStreamActionStream).pipe(
      T.HttpPayload(),
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/synthesisStream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSpeechSynthesisStreamInput",
}) as any as S.Schema<StartSpeechSynthesisStreamInput>;
export type AudioChunk = Uint8Array;
export interface AudioEvent {
  AudioChunk?: Uint8Array;
}
export const AudioEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AudioChunk: S.optional(T.Blob).pipe(T.EventPayload()) }),
).annotate({ identifier: "AudioEvent" }) as any as S.Schema<AudioEvent>;
export interface StreamClosedEvent {
  RequestCharacters?: number;
}
export const StreamClosedEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RequestCharacters: S.optional(S.Number) }),
).annotate({
  identifier: "StreamClosedEvent",
}) as any as S.Schema<StreamClosedEvent>;
export type ErrorMessage = string;
export type ValidationExceptionReason =
  | "unsupportedOperation"
  | "fieldValidationFailed"
  | "other"
  | "invalidInboundEvent"
  | (string & {});
export const ValidationExceptionReason = S.String;

export type ValidationExceptionFieldName = string;
export type ValidationExceptionFieldMessage = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(
  ValidationExceptionField,
);
export type QuotaCode =
  | "input-stream-inbound-event-timeout"
  | "input-stream-timeout"
  | (string & {});
export const QuotaCode = S.String;

export type ServiceCode = "polly" | (string & {});
export const ServiceCode = S.String;

export type AvailabilityErrorMessage = string;
export type CoralAvailabilityThrottlingReason = string;
export type CoralAvailabilityThrottledResource = string;
export interface ThrottlingReason {
  reason?: string;
  resource?: string;
}
export const ThrottlingReason = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reason: S.optional(S.String), resource: S.optional(S.String) }),
).annotate({
  identifier: "ThrottlingReason",
}) as any as S.Schema<ThrottlingReason>;
export type ThrottlingReasonList = ThrottlingReason[];
export const ThrottlingReasonList = /*@__PURE__*/ S.Array(ThrottlingReason);
export type StartSpeechSynthesisStreamEventStream =
  | {
      AudioEvent: AudioEvent;
      StreamClosedEvent?: never;
      ValidationException?: never;
      ServiceQuotaExceededException?: never;
      ServiceFailureException?: never;
      ThrottlingException?: never;
    }
  | {
      AudioEvent?: never;
      StreamClosedEvent: StreamClosedEvent;
      ValidationException?: never;
      ServiceQuotaExceededException?: never;
      ServiceFailureException?: never;
      ThrottlingException?: never;
    }
  | {
      AudioEvent?: never;
      StreamClosedEvent?: never;
      ValidationException: ValidationException;
      ServiceQuotaExceededException?: never;
      ServiceFailureException?: never;
      ThrottlingException?: never;
    }
  | {
      AudioEvent?: never;
      StreamClosedEvent?: never;
      ValidationException?: never;
      ServiceQuotaExceededException: ServiceQuotaExceededException;
      ServiceFailureException?: never;
      ThrottlingException?: never;
    }
  | {
      AudioEvent?: never;
      StreamClosedEvent?: never;
      ValidationException?: never;
      ServiceQuotaExceededException?: never;
      ServiceFailureException: ServiceFailureException;
      ThrottlingException?: never;
    }
  | {
      AudioEvent?: never;
      StreamClosedEvent?: never;
      ValidationException?: never;
      ServiceQuotaExceededException?: never;
      ServiceFailureException?: never;
      ThrottlingException: ThrottlingException;
    };
export const StartSpeechSynthesisStreamEventStream =
  /*@__PURE__*/ T.EventStream(
    S.Union([
      S.Struct({ AudioEvent: AudioEvent }),
      S.Struct({ StreamClosedEvent: StreamClosedEvent }),
      S.Struct({
        ValidationException: S.suspend(() => ValidationException).annotate({
          identifier: "ValidationException",
        }),
      }),
      S.Struct({
        ServiceQuotaExceededException: S.suspend(
          () => ServiceQuotaExceededException,
        ).annotate({ identifier: "ServiceQuotaExceededException" }),
      }),
      S.Struct({
        ServiceFailureException: S.suspend(
          () => ServiceFailureException,
        ).annotate({ identifier: "ServiceFailureException" }),
      }),
      S.Struct({
        ThrottlingException: S.suspend(() => ThrottlingException).annotate({
          identifier: "ThrottlingException",
        }),
      }),
    ]),
  ) as any as S.Schema<
    stream.Stream<StartSpeechSynthesisStreamEventStream, Error, never>
  >;
export interface StartSpeechSynthesisStreamOutput {
  EventStream?: stream.Stream<
    StartSpeechSynthesisStreamEventStream,
    Error,
    never
  >;
}
export const StartSpeechSynthesisStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EventStream: S.optional(StartSpeechSynthesisStreamEventStream).pipe(
      T.HttpPayload(),
    ),
  }).pipe(ns),
).annotate({
  identifier: "StartSpeechSynthesisStreamOutput",
}) as any as S.Schema<StartSpeechSynthesisStreamOutput>;
export type OutputS3BucketName = string;
export type OutputS3KeyPrefix = string;
export interface StartSpeechSynthesisTaskInput {
  Engine?: Engine;
  LanguageCode?: LanguageCode;
  LexiconNames?: string[];
  OutputFormat: OutputFormat;
  OutputS3BucketName: string;
  OutputS3KeyPrefix?: string;
  SampleRate?: string;
  SnsTopicArn?: string;
  SpeechMarkTypes?: SpeechMarkType[];
  Text: string;
  TextType?: TextType;
  VoiceId: VoiceId;
}
export const StartSpeechSynthesisTaskInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Engine: S.optional(Engine),
    LanguageCode: S.optional(LanguageCode),
    LexiconNames: S.optional(LexiconNameList),
    OutputFormat: OutputFormat,
    OutputS3BucketName: S.String,
    OutputS3KeyPrefix: S.optional(S.String),
    SampleRate: S.optional(S.String),
    SnsTopicArn: S.optional(S.String),
    SpeechMarkTypes: S.optional(SpeechMarkTypeList),
    Text: S.String,
    TextType: S.optional(TextType),
    VoiceId: VoiceId,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/synthesisTasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSpeechSynthesisTaskInput",
}) as any as S.Schema<StartSpeechSynthesisTaskInput>;
export interface StartSpeechSynthesisTaskOutput {
  SynthesisTask?: SynthesisTask;
}
export const StartSpeechSynthesisTaskOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SynthesisTask: S.optional(SynthesisTask) }).pipe(ns),
).annotate({
  identifier: "StartSpeechSynthesisTaskOutput",
}) as any as S.Schema<StartSpeechSynthesisTaskOutput>;
export interface SynthesizeSpeechInput {
  Engine?: Engine;
  LanguageCode?: LanguageCode;
  LexiconNames?: string[];
  OutputFormat: OutputFormat;
  SampleRate?: string;
  SpeechMarkTypes?: SpeechMarkType[];
  Text: string;
  TextType?: TextType;
  VoiceId: VoiceId;
}
export const SynthesizeSpeechInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Engine: S.optional(Engine),
    LanguageCode: S.optional(LanguageCode),
    LexiconNames: S.optional(LexiconNameList),
    OutputFormat: OutputFormat,
    SampleRate: S.optional(S.String),
    SpeechMarkTypes: S.optional(SpeechMarkTypeList),
    Text: S.String,
    TextType: S.optional(TextType),
    VoiceId: VoiceId,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/v1/speech" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SynthesizeSpeechInput",
}) as any as S.Schema<SynthesizeSpeechInput>;
export type ContentType = string;
export interface SynthesizeSpeechOutput {
  AudioStream?: T.StreamingOutputBody;
  ContentType?: string;
  RequestCharacters?: number;
}
export const SynthesizeSpeechOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioStream: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
    ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
    RequestCharacters: S.optional(S.Number).pipe(
      T.HttpHeader("x-amzn-RequestCharacters"),
    ),
  }).pipe(ns),
).annotate({
  identifier: "SynthesizeSpeechOutput",
}) as any as S.Schema<SynthesizeSpeechOutput>;
export type DeleteLexiconError =
  | LexiconNotFoundException
  | ServiceFailureException
  | CommonErrors;
/**
 * Deletes the specified pronunciation lexicon stored in an Amazon Web Services Region. A lexicon which has been deleted is not available for
 * speech synthesis, nor is it possible to retrieve it using either the
 * `GetLexicon` or `ListLexicon` APIs.
 *
 * For more information, see Managing Lexicons.
 */
export const deleteLexicon: API.OperationMethod<
  DeleteLexiconInput,
  DeleteLexiconOutput,
  DeleteLexiconError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLexiconInput,
  output: DeleteLexiconOutput,
  errors: [LexiconNotFoundException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLexicon",
}));

export type DescribeVoicesError =
  | InvalidNextTokenException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns the list of voices that are available for use when
 * requesting speech synthesis. Each voice speaks a specified language, is
 * either male or female, and is identified by an ID, which is the ASCII
 * version of the voice name.
 *
 * When synthesizing speech ( `SynthesizeSpeech` ), you
 * provide the voice ID for the voice you want from the list of voices
 * returned by `DescribeVoices`.
 *
 * For example, you want your news reader application to read news in
 * a specific language, but giving a user the option to choose the voice.
 * Using the `DescribeVoices` operation you can provide the user
 * with a list of available voices to select from.
 *
 * You can optionally specify a language code to filter the available
 * voices. For example, if you specify `en-US`, the operation
 * returns a list of all available US English voices.
 *
 * This operation requires permissions to perform the
 * `polly:DescribeVoices` action.
 */
export const describeVoices: API.OperationMethod<
  DescribeVoicesInput,
  DescribeVoicesOutput,
  DescribeVoicesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVoicesInput,
  output: DescribeVoicesOutput,
  errors: [InvalidNextTokenException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVoices",
}));

export type GetLexiconError =
  | LexiconNotFoundException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns the content of the specified pronunciation lexicon stored
 * in an Amazon Web Services Region. For more information, see Managing Lexicons.
 */
export const getLexicon: API.OperationMethod<
  GetLexiconInput,
  GetLexiconOutput,
  GetLexiconError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetLexiconInput,
  output: GetLexiconOutput,
  errors: [LexiconNotFoundException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLexicon",
}));

export type GetSpeechSynthesisTaskError =
  | InvalidTaskIdException
  | ServiceFailureException
  | SynthesisTaskNotFoundException
  | CommonErrors;
/**
 * Retrieves a specific SpeechSynthesisTask object based on its TaskID.
 * This object contains information about the given speech synthesis task,
 * including the status of the task, and a link to the S3 bucket containing
 * the output of the task.
 */
export const getSpeechSynthesisTask: API.OperationMethod<
  GetSpeechSynthesisTaskInput,
  GetSpeechSynthesisTaskOutput,
  GetSpeechSynthesisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSpeechSynthesisTaskInput,
  output: GetSpeechSynthesisTaskOutput,
  errors: [
    InvalidTaskIdException,
    ServiceFailureException,
    SynthesisTaskNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpeechSynthesisTask",
}));

export type ListLexiconsError =
  | InvalidNextTokenException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns a list of pronunciation lexicons stored in an Amazon Web Services Region. For more information, see Managing Lexicons.
 */
export const listLexicons: API.OperationMethod<
  ListLexiconsInput,
  ListLexiconsOutput,
  ListLexiconsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListLexiconsInput,
  output: ListLexiconsOutput,
  errors: [InvalidNextTokenException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLexicons",
}));

export type ListSpeechSynthesisTasksError =
  | InvalidNextTokenException
  | ServiceFailureException
  | CommonErrors;
/**
 * Returns a list of SpeechSynthesisTask objects ordered by their
 * creation date. This operation can filter the tasks by their status, for
 * example, allowing users to list only tasks that are completed.
 */
export const listSpeechSynthesisTasks: API.PaginatedOperationMethod<
  ListSpeechSynthesisTasksInput,
  ListSpeechSynthesisTasksOutput,
  ListSpeechSynthesisTasksError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSpeechSynthesisTasksInput,
  output: ListSpeechSynthesisTasksOutput,
  errors: [InvalidNextTokenException, ServiceFailureException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpeechSynthesisTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutLexiconError =
  | InvalidLexiconException
  | LexiconSizeExceededException
  | MaxLexemeLengthExceededException
  | MaxLexiconsNumberExceededException
  | ServiceFailureException
  | UnsupportedPlsAlphabetException
  | UnsupportedPlsLanguageException
  | CommonErrors;
/**
 * Stores a pronunciation lexicon in an Amazon Web Services Region. If
 * a lexicon with the same name already exists in the region, it is
 * overwritten by the new lexicon. Lexicon operations have eventual
 * consistency, therefore, it might take some time before the lexicon is
 * available to the SynthesizeSpeech operation.
 *
 * For more information, see Managing Lexicons.
 */
export const putLexicon: API.OperationMethod<
  PutLexiconInput,
  PutLexiconOutput,
  PutLexiconError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutLexiconInput,
  output: PutLexiconOutput,
  errors: [
    InvalidLexiconException,
    LexiconSizeExceededException,
    MaxLexemeLengthExceededException,
    MaxLexiconsNumberExceededException,
    ServiceFailureException,
    UnsupportedPlsAlphabetException,
    UnsupportedPlsLanguageException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLexicon",
}));

export type StartSpeechSynthesisStreamError =
  | ServiceFailureException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Synthesizes UTF-8 input, plain text, or SSML over a bidirectional streaming connection.
 * Specify synthesis parameters in HTTP/2 headers, send text incrementally as events on the input stream,
 * and receive synthesized audio as it becomes available.
 *
 * This operation serves as a bidirectional counterpart to `SynthesizeSpeech`:
 *
 * - SynthesizeSpeech
 */
export const startSpeechSynthesisStream: API.OperationMethod<
  StartSpeechSynthesisStreamInput,
  StartSpeechSynthesisStreamOutput,
  StartSpeechSynthesisStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSpeechSynthesisStreamInput,
  output: StartSpeechSynthesisStreamOutput,
  errors: [
    ServiceFailureException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSpeechSynthesisStream",
}));

export type StartSpeechSynthesisTaskError =
  | EngineNotSupportedException
  | InvalidS3BucketException
  | InvalidS3KeyException
  | InvalidSampleRateException
  | InvalidSnsTopicArnException
  | InvalidSsmlException
  | LanguageNotSupportedException
  | LexiconNotFoundException
  | MarksNotSupportedForFormatException
  | ServiceFailureException
  | SsmlMarksNotSupportedForTextTypeException
  | TextLengthExceededException
  | CommonErrors;
/**
 * Allows the creation of an asynchronous synthesis task, by starting a
 * new `SpeechSynthesisTask`. This operation requires all the
 * standard information needed for speech synthesis, plus the name of an
 * Amazon S3 bucket for the service to store the output of the synthesis task
 * and two optional parameters (`OutputS3KeyPrefix` and
 * `SnsTopicArn`). Once the synthesis task is created, this
 * operation will return a `SpeechSynthesisTask` object, which
 * will include an identifier of this task as well as the current status. The
 * `SpeechSynthesisTask` object is available for 72 hours after
 * starting the asynchronous synthesis task.
 */
export const startSpeechSynthesisTask: API.OperationMethod<
  StartSpeechSynthesisTaskInput,
  StartSpeechSynthesisTaskOutput,
  StartSpeechSynthesisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSpeechSynthesisTaskInput,
  output: StartSpeechSynthesisTaskOutput,
  errors: [
    EngineNotSupportedException,
    InvalidS3BucketException,
    InvalidS3KeyException,
    InvalidSampleRateException,
    InvalidSnsTopicArnException,
    InvalidSsmlException,
    LanguageNotSupportedException,
    LexiconNotFoundException,
    MarksNotSupportedForFormatException,
    ServiceFailureException,
    SsmlMarksNotSupportedForTextTypeException,
    TextLengthExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSpeechSynthesisTask",
}));

export type SynthesizeSpeechError =
  | EngineNotSupportedException
  | InvalidSampleRateException
  | InvalidSsmlException
  | LanguageNotSupportedException
  | LexiconNotFoundException
  | MarksNotSupportedForFormatException
  | ServiceFailureException
  | SsmlMarksNotSupportedForTextTypeException
  | TextLengthExceededException
  | CommonErrors;
/**
 * Synthesizes UTF-8 input, plain text or SSML, to a stream of bytes.
 * SSML input must be valid, well-formed SSML. Some alphabets might not be
 * available with all the voices (for example, Cyrillic might not be read at
 * all by English voices) unless phoneme mapping is used. For more
 * information, see How it Works.
 */
export const synthesizeSpeech: API.OperationMethod<
  SynthesizeSpeechInput,
  SynthesizeSpeechOutput,
  SynthesizeSpeechError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: SynthesizeSpeechInput,
  output: SynthesizeSpeechOutput,
  errors: [
    EngineNotSupportedException,
    InvalidSampleRateException,
    InvalidSsmlException,
    LanguageNotSupportedException,
    LexiconNotFoundException,
    MarksNotSupportedForFormatException,
    ServiceFailureException,
    SsmlMarksNotSupportedForTextTypeException,
    TextLengthExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SynthesizeSpeech",
}));
