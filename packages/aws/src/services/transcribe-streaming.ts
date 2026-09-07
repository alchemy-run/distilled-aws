import * as HttpClient from "effect/unstable/http/HttpClient";
import * as S from "@distilled.cloud/core/schema";
import * as stream from "effect/Stream";
import * as API from "@distilled.cloud/core/api";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc = T.AwsApiService({
  sdkId: "Transcribe Streaming",
  serviceShapeName: "Transcribe",
});
const auth = T.AwsAuthSigv4({ name: "transcribe" });
const ver = T.ServiceVersion("2017-10-26");
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
              `https://transcribestreaming-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://transcribestreaming-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://transcribestreaming.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://transcribestreaming.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export type SessionId = string;
export interface GetMedicalScribeStreamRequest {
  SessionId: string;
}
export const GetMedicalScribeStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SessionId: S.String.pipe(T.HttpLabel("SessionId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/medical-scribe-stream/{SessionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMedicalScribeStreamRequest",
}) as any as S.Schema<GetMedicalScribeStreamRequest>;
export type MedicalScribeLanguageCode = "en-US" | (string & {});
export const MedicalScribeLanguageCode = /*@__PURE__*/ S.String;

export type MedicalScribeMediaSampleRateHertz = number;
export type MedicalScribeMediaEncoding =
  | "pcm"
  | "ogg-opus"
  | "flac"
  | (string & {});
export const MedicalScribeMediaEncoding = /*@__PURE__*/ S.String;

export type VocabularyName = string;
export type VocabularyFilterName = string;
export type MedicalScribeVocabularyFilterMethod =
  | "remove"
  | "mask"
  | "tag"
  | (string & {});
export const MedicalScribeVocabularyFilterMethod = /*@__PURE__*/ S.String;

export type IamRoleArn = string;
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
export type NonEmptyString = string;
export type KMSEncryptionContextMap = { [key: string]: string | undefined };
export const KMSEncryptionContextMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type KMSKeyId = string;
export interface MedicalScribeEncryptionSettings {
  KmsEncryptionContext?: { [key: string]: string | undefined };
  KmsKeyId: string;
}
export const MedicalScribeEncryptionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KmsEncryptionContext: S.optional(KMSEncryptionContextMap),
    KmsKeyId: S.String,
  }),
).annotate({
  identifier: "MedicalScribeEncryptionSettings",
}) as any as S.Schema<MedicalScribeEncryptionSettings>;
export type MedicalScribeStreamStatus =
  | "IN_PROGRESS"
  | "PAUSED"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const MedicalScribeStreamStatus = /*@__PURE__*/ S.String;

export type BucketName = string;
export type MedicalScribeNoteTemplate =
  | "HISTORY_AND_PHYSICAL"
  | "GIRPP"
  | "DAP"
  | "SIRP"
  | "BIRP"
  | "BEHAVIORAL_SOAP"
  | "PHYSICAL_SOAP"
  | (string & {});
export const MedicalScribeNoteTemplate = /*@__PURE__*/ S.String;

export interface ClinicalNoteGenerationSettings {
  OutputBucketName: string;
  NoteTemplate?: MedicalScribeNoteTemplate;
}
export const ClinicalNoteGenerationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputBucketName: S.String,
    NoteTemplate: S.optional(MedicalScribeNoteTemplate),
  }),
).annotate({
  identifier: "ClinicalNoteGenerationSettings",
}) as any as S.Schema<ClinicalNoteGenerationSettings>;
export interface MedicalScribePostStreamAnalyticsSettings {
  ClinicalNoteGenerationSettings: ClinicalNoteGenerationSettings;
}
export const MedicalScribePostStreamAnalyticsSettings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClinicalNoteGenerationSettings: ClinicalNoteGenerationSettings,
    }),
).annotate({
  identifier: "MedicalScribePostStreamAnalyticsSettings",
}) as any as S.Schema<MedicalScribePostStreamAnalyticsSettings>;
export type Uri = string;
export type ClinicalNoteGenerationStatus =
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED"
  | (string & {});
export const ClinicalNoteGenerationStatus = /*@__PURE__*/ S.String;

export interface ClinicalNoteGenerationResult {
  ClinicalNoteOutputLocation?: string;
  TranscriptOutputLocation?: string;
  Status?: ClinicalNoteGenerationStatus;
  FailureReason?: string;
}
export const ClinicalNoteGenerationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClinicalNoteOutputLocation: S.optional(S.String),
    TranscriptOutputLocation: S.optional(S.String),
    Status: S.optional(ClinicalNoteGenerationStatus),
    FailureReason: S.optional(S.String),
  }),
).annotate({
  identifier: "ClinicalNoteGenerationResult",
}) as any as S.Schema<ClinicalNoteGenerationResult>;
export interface MedicalScribePostStreamAnalyticsResult {
  ClinicalNoteGenerationResult?: ClinicalNoteGenerationResult;
}
export const MedicalScribePostStreamAnalyticsResult = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClinicalNoteGenerationResult: S.optional(ClinicalNoteGenerationResult),
    }),
).annotate({
  identifier: "MedicalScribePostStreamAnalyticsResult",
}) as any as S.Schema<MedicalScribePostStreamAnalyticsResult>;
export interface MedicalScribeStreamDetails {
  SessionId?: string;
  StreamCreatedAt?: Date;
  StreamEndedAt?: Date;
  LanguageCode?: MedicalScribeLanguageCode;
  MediaSampleRateHertz?: number;
  MediaEncoding?: MedicalScribeMediaEncoding;
  VocabularyName?: string;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: MedicalScribeVocabularyFilterMethod;
  ResourceAccessRoleArn?: string;
  ChannelDefinitions?: MedicalScribeChannelDefinition[];
  EncryptionSettings?: MedicalScribeEncryptionSettings;
  StreamStatus?: MedicalScribeStreamStatus;
  PostStreamAnalyticsSettings?: MedicalScribePostStreamAnalyticsSettings;
  PostStreamAnalyticsResult?: MedicalScribePostStreamAnalyticsResult;
  MedicalScribeContextProvided?: boolean;
}
export const MedicalScribeStreamDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.optional(S.String),
    StreamCreatedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    StreamEndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LanguageCode: S.optional(MedicalScribeLanguageCode),
    MediaSampleRateHertz: S.optional(S.Number),
    MediaEncoding: S.optional(MedicalScribeMediaEncoding),
    VocabularyName: S.optional(S.String),
    VocabularyFilterName: S.optional(S.String),
    VocabularyFilterMethod: S.optional(MedicalScribeVocabularyFilterMethod),
    ResourceAccessRoleArn: S.optional(S.String),
    ChannelDefinitions: S.optional(MedicalScribeChannelDefinitions),
    EncryptionSettings: S.optional(MedicalScribeEncryptionSettings),
    StreamStatus: S.optional(MedicalScribeStreamStatus),
    PostStreamAnalyticsSettings: S.optional(
      MedicalScribePostStreamAnalyticsSettings,
    ),
    PostStreamAnalyticsResult: S.optional(
      MedicalScribePostStreamAnalyticsResult,
    ),
    MedicalScribeContextProvided: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "MedicalScribeStreamDetails",
}) as any as S.Schema<MedicalScribeStreamDetails>;
export interface GetMedicalScribeStreamResponse {
  MedicalScribeStreamDetails?: MedicalScribeStreamDetails;
}
export const GetMedicalScribeStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MedicalScribeStreamDetails: S.optional(MedicalScribeStreamDetails),
  }),
).annotate({
  identifier: "GetMedicalScribeStreamResponse",
}) as any as S.Schema<GetMedicalScribeStreamResponse>;
export type CallAnalyticsLanguageCode =
  | "en-US"
  | "en-GB"
  | "es-US"
  | "fr-CA"
  | "fr-FR"
  | "en-AU"
  | "it-IT"
  | "de-DE"
  | "pt-BR"
  | (string & {});
export const CallAnalyticsLanguageCode = /*@__PURE__*/ S.String;

export type MediaSampleRateHertz = number;
export type MediaEncoding = "pcm" | "ogg-opus" | "flac" | (string & {});
export const MediaEncoding = /*@__PURE__*/ S.String;

export type AudioChunk = Uint8Array;
export interface AudioEvent {
  AudioChunk?: Uint8Array;
}
export const AudioEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AudioChunk: S.optional(T.Blob).pipe(T.EventPayload()) }),
).annotate({ identifier: "AudioEvent" }) as any as S.Schema<AudioEvent>;
export type ChannelId = number;
export type ParticipantRole = "AGENT" | "CUSTOMER" | (string & {});
export const ParticipantRole = /*@__PURE__*/ S.String;

export interface ChannelDefinition {
  ChannelId: number;
  ParticipantRole: ParticipantRole;
}
export const ChannelDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelId: S.Number, ParticipantRole: ParticipantRole }),
).annotate({
  identifier: "ChannelDefinition",
}) as any as S.Schema<ChannelDefinition>;
export type ChannelDefinitions = ChannelDefinition[];
export const ChannelDefinitions = /*@__PURE__*/ S.Array(ChannelDefinition);
export type ContentRedactionOutput =
  | "redacted"
  | "redacted_and_unredacted"
  | (string & {});
export const ContentRedactionOutput = /*@__PURE__*/ S.String;

export interface PostCallAnalyticsSettings {
  OutputLocation: string;
  DataAccessRoleArn: string;
  ContentRedactionOutput?: ContentRedactionOutput;
  OutputEncryptionKMSKeyId?: string;
}
export const PostCallAnalyticsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputLocation: S.String,
    DataAccessRoleArn: S.String,
    ContentRedactionOutput: S.optional(ContentRedactionOutput),
    OutputEncryptionKMSKeyId: S.optional(S.String),
  }),
).annotate({
  identifier: "PostCallAnalyticsSettings",
}) as any as S.Schema<PostCallAnalyticsSettings>;
export interface ConfigurationEvent {
  ChannelDefinitions?: ChannelDefinition[];
  PostCallAnalyticsSettings?: PostCallAnalyticsSettings;
}
export const ConfigurationEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelDefinitions: S.optional(ChannelDefinitions),
    PostCallAnalyticsSettings: S.optional(PostCallAnalyticsSettings),
  }),
).annotate({
  identifier: "ConfigurationEvent",
}) as any as S.Schema<ConfigurationEvent>;
export type AudioStream =
  | { AudioEvent: AudioEvent; ConfigurationEvent?: never }
  | { AudioEvent?: never; ConfigurationEvent: ConfigurationEvent };
export const AudioStream = /*@__PURE__*/ T.InputEventStream(
  S.Union([
    S.Struct({ AudioEvent: AudioEvent }),
    S.Struct({ ConfigurationEvent: ConfigurationEvent }),
  ]),
) as any as S.Schema<stream.Stream<AudioStream, Error, never>>;
export type VocabularyFilterMethod = "remove" | "mask" | "tag" | (string & {});
export const VocabularyFilterMethod = /*@__PURE__*/ S.String;

export type ModelName = string;
export type LanguageOptions = string;
export type VocabularyNames = string;
export type VocabularyFilterNames = string;
export type PartialResultsStability = "high" | "medium" | "low" | (string & {});
export const PartialResultsStability = /*@__PURE__*/ S.String;

export type ContentIdentificationType = "PII" | (string & {});
export const ContentIdentificationType = /*@__PURE__*/ S.String;

export type ContentRedactionType = "PII" | (string & {});
export const ContentRedactionType = /*@__PURE__*/ S.String;

export type PiiEntityTypes = string;
export interface StartCallAnalyticsStreamTranscriptionRequest {
  LanguageCode?: CallAnalyticsLanguageCode;
  MediaSampleRateHertz: number;
  MediaEncoding: MediaEncoding;
  VocabularyName?: string;
  SessionId?: string;
  AudioStream: stream.Stream<AudioStream, Error, never>;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  LanguageModelName?: string;
  IdentifyLanguage?: boolean;
  LanguageOptions?: string;
  PreferredLanguage?: CallAnalyticsLanguageCode;
  VocabularyNames?: string;
  VocabularyFilterNames?: string;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: PartialResultsStability;
  ContentIdentificationType?: ContentIdentificationType;
  ContentRedactionType?: ContentRedactionType;
  PiiEntityTypes?: string;
}
export const StartCallAnalyticsStreamTranscriptionRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LanguageCode: S.optional(CallAnalyticsLanguageCode).pipe(
        T.HttpHeader("x-amzn-transcribe-language-code"),
      ),
      MediaSampleRateHertz: S.Number.pipe(
        T.HttpHeader("x-amzn-transcribe-sample-rate"),
      ),
      MediaEncoding: MediaEncoding.pipe(
        T.HttpHeader("x-amzn-transcribe-media-encoding"),
      ),
      VocabularyName: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-vocabulary-name"),
      ),
      SessionId: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-session-id"),
      ),
      AudioStream: AudioStream.pipe(T.HttpPayload()),
      VocabularyFilterName: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-vocabulary-filter-name"),
      ),
      VocabularyFilterMethod: S.optional(VocabularyFilterMethod).pipe(
        T.HttpHeader("x-amzn-transcribe-vocabulary-filter-method"),
      ),
      LanguageModelName: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-language-model-name"),
      ),
      IdentifyLanguage: S.optional(S.Boolean).pipe(
        T.HttpHeader("x-amzn-transcribe-identify-language"),
      ),
      LanguageOptions: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-language-options"),
      ),
      PreferredLanguage: S.optional(CallAnalyticsLanguageCode).pipe(
        T.HttpHeader("x-amzn-transcribe-preferred-language"),
      ),
      VocabularyNames: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-vocabulary-names"),
      ),
      VocabularyFilterNames: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-vocabulary-filter-names"),
      ),
      EnablePartialResultsStabilization: S.optional(S.Boolean).pipe(
        T.HttpHeader("x-amzn-transcribe-enable-partial-results-stabilization"),
      ),
      PartialResultsStability: S.optional(PartialResultsStability).pipe(
        T.HttpHeader("x-amzn-transcribe-partial-results-stability"),
      ),
      ContentIdentificationType: S.optional(ContentIdentificationType).pipe(
        T.HttpHeader("x-amzn-transcribe-content-identification-type"),
      ),
      ContentRedactionType: S.optional(ContentRedactionType).pipe(
        T.HttpHeader("x-amzn-transcribe-content-redaction-type"),
      ),
      PiiEntityTypes: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-pii-entity-types"),
      ),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/call-analytics-stream-transcription" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "StartCallAnalyticsStreamTranscriptionRequest",
  }) as any as S.Schema<StartCallAnalyticsStreamTranscriptionRequest>;
export type RequestId = string;
export type ItemType = "pronunciation" | "punctuation" | (string & {});
export const ItemType = /*@__PURE__*/ S.String;

export type Confidence = number;
export type Stable = boolean;
export interface CallAnalyticsItem {
  BeginOffsetMillis?: number;
  EndOffsetMillis?: number;
  Type?: ItemType;
  Content?: string;
  Confidence?: number;
  VocabularyFilterMatch?: boolean;
  Stable?: boolean;
}
export const CallAnalyticsItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BeginOffsetMillis: S.optional(S.Number),
    EndOffsetMillis: S.optional(S.Number),
    Type: S.optional(ItemType),
    Content: S.optional(S.String),
    Confidence: S.optional(S.Number),
    VocabularyFilterMatch: S.optional(S.Boolean),
    Stable: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "CallAnalyticsItem",
}) as any as S.Schema<CallAnalyticsItem>;
export type CallAnalyticsItemList = CallAnalyticsItem[];
export const CallAnalyticsItemList = /*@__PURE__*/ S.Array(CallAnalyticsItem);
export interface CallAnalyticsEntity {
  BeginOffsetMillis?: number;
  EndOffsetMillis?: number;
  Category?: string;
  Type?: string;
  Content?: string;
  Confidence?: number;
}
export const CallAnalyticsEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BeginOffsetMillis: S.optional(S.Number),
    EndOffsetMillis: S.optional(S.Number),
    Category: S.optional(S.String),
    Type: S.optional(S.String),
    Content: S.optional(S.String),
    Confidence: S.optional(S.Number),
  }),
).annotate({
  identifier: "CallAnalyticsEntity",
}) as any as S.Schema<CallAnalyticsEntity>;
export type CallAnalyticsEntityList = CallAnalyticsEntity[];
export const CallAnalyticsEntityList =
  /*@__PURE__*/ S.Array(CallAnalyticsEntity);
export type Sentiment =
  | "POSITIVE"
  | "NEGATIVE"
  | "MIXED"
  | "NEUTRAL"
  | (string & {});
export const Sentiment = /*@__PURE__*/ S.String;

export interface CharacterOffsets {
  Begin?: number;
  End?: number;
}
export const CharacterOffsets = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Begin: S.optional(S.Number), End: S.optional(S.Number) }),
).annotate({
  identifier: "CharacterOffsets",
}) as any as S.Schema<CharacterOffsets>;
export interface IssueDetected {
  CharacterOffsets?: CharacterOffsets;
}
export const IssueDetected = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CharacterOffsets: S.optional(CharacterOffsets) }),
).annotate({ identifier: "IssueDetected" }) as any as S.Schema<IssueDetected>;
export type IssuesDetected = IssueDetected[];
export const IssuesDetected = /*@__PURE__*/ S.Array(IssueDetected);
export interface CallAnalyticsLanguageWithScore {
  LanguageCode?: CallAnalyticsLanguageCode;
  Score?: number;
}
export const CallAnalyticsLanguageWithScore = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LanguageCode: S.optional(CallAnalyticsLanguageCode),
    Score: S.optional(S.Number),
  }),
).annotate({
  identifier: "CallAnalyticsLanguageWithScore",
}) as any as S.Schema<CallAnalyticsLanguageWithScore>;
export type CallAnalyticsLanguageIdentification =
  CallAnalyticsLanguageWithScore[];
export const CallAnalyticsLanguageIdentification = /*@__PURE__*/ S.Array(
  CallAnalyticsLanguageWithScore,
);
export interface UtteranceEvent {
  UtteranceId?: string;
  IsPartial?: boolean;
  ParticipantRole?: ParticipantRole;
  BeginOffsetMillis?: number;
  EndOffsetMillis?: number;
  Transcript?: string;
  Items?: CallAnalyticsItem[];
  Entities?: CallAnalyticsEntity[];
  Sentiment?: Sentiment;
  IssuesDetected?: IssueDetected[];
  LanguageCode?: CallAnalyticsLanguageCode;
  LanguageIdentification?: CallAnalyticsLanguageWithScore[];
}
export const UtteranceEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    UtteranceId: S.optional(S.String),
    IsPartial: S.optional(S.Boolean),
    ParticipantRole: S.optional(ParticipantRole),
    BeginOffsetMillis: S.optional(S.Number),
    EndOffsetMillis: S.optional(S.Number),
    Transcript: S.optional(S.String),
    Items: S.optional(CallAnalyticsItemList),
    Entities: S.optional(CallAnalyticsEntityList),
    Sentiment: S.optional(Sentiment),
    IssuesDetected: S.optional(IssuesDetected),
    LanguageCode: S.optional(CallAnalyticsLanguageCode),
    LanguageIdentification: S.optional(CallAnalyticsLanguageIdentification),
  }),
).annotate({ identifier: "UtteranceEvent" }) as any as S.Schema<UtteranceEvent>;
export type StringList = string[];
export const StringList = /*@__PURE__*/ S.Array(S.String);
export interface TimestampRange {
  BeginOffsetMillis?: number;
  EndOffsetMillis?: number;
}
export const TimestampRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BeginOffsetMillis: S.optional(S.Number),
    EndOffsetMillis: S.optional(S.Number),
  }),
).annotate({ identifier: "TimestampRange" }) as any as S.Schema<TimestampRange>;
export type TimestampRanges = TimestampRange[];
export const TimestampRanges = /*@__PURE__*/ S.Array(TimestampRange);
export interface PointsOfInterest {
  TimestampRanges?: TimestampRange[];
}
export const PointsOfInterest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TimestampRanges: S.optional(TimestampRanges) }),
).annotate({
  identifier: "PointsOfInterest",
}) as any as S.Schema<PointsOfInterest>;
export type MatchedCategoryDetails = {
  [key: string]: PointsOfInterest | undefined;
};
export const MatchedCategoryDetails = /*@__PURE__*/ S.Record(
  S.String,
  PointsOfInterest.pipe(S.optional),
);
export interface CategoryEvent {
  MatchedCategories?: string[];
  MatchedDetails?: { [key: string]: PointsOfInterest | undefined };
}
export const CategoryEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MatchedCategories: S.optional(StringList),
    MatchedDetails: S.optional(MatchedCategoryDetails),
  }),
).annotate({ identifier: "CategoryEvent" }) as any as S.Schema<CategoryEvent>;
export type CallAnalyticsTranscriptResultStream =
  | {
      UtteranceEvent: UtteranceEvent;
      CategoryEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      UtteranceEvent?: never;
      CategoryEvent: CategoryEvent;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      UtteranceEvent?: never;
      CategoryEvent?: never;
      BadRequestException: BadRequestException;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      UtteranceEvent?: never;
      CategoryEvent?: never;
      BadRequestException?: never;
      LimitExceededException: LimitExceededException;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      UtteranceEvent?: never;
      CategoryEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException: InternalFailureException;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      UtteranceEvent?: never;
      CategoryEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException: ConflictException;
      ServiceUnavailableException?: never;
    }
  | {
      UtteranceEvent?: never;
      CategoryEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException: ServiceUnavailableException;
    };
export const CallAnalyticsTranscriptResultStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ UtteranceEvent: UtteranceEvent }),
    S.Struct({ CategoryEvent: CategoryEvent }),
    S.Struct({
      BadRequestException: S.suspend(() => BadRequestException).annotate({
        identifier: "BadRequestException",
      }),
    }),
    S.Struct({
      LimitExceededException: S.suspend(() => LimitExceededException).annotate({
        identifier: "LimitExceededException",
      }),
    }),
    S.Struct({
      InternalFailureException: S.suspend(
        () => InternalFailureException,
      ).annotate({ identifier: "InternalFailureException" }),
    }),
    S.Struct({
      ConflictException: S.suspend(() => ConflictException).annotate({
        identifier: "ConflictException",
      }),
    }),
    S.Struct({
      ServiceUnavailableException: S.suspend(
        () => ServiceUnavailableException,
      ).annotate({ identifier: "ServiceUnavailableException" }),
    }),
  ]),
) as any as S.Schema<
  stream.Stream<CallAnalyticsTranscriptResultStream, Error, never>
>;
export interface StartCallAnalyticsStreamTranscriptionResponse {
  RequestId?: string;
  LanguageCode?: CallAnalyticsLanguageCode;
  MediaSampleRateHertz?: number;
  MediaEncoding?: MediaEncoding;
  VocabularyName?: string;
  SessionId?: string;
  CallAnalyticsTranscriptResultStream?: stream.Stream<
    CallAnalyticsTranscriptResultStream,
    Error,
    never
  >;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  LanguageModelName?: string;
  IdentifyLanguage?: boolean;
  LanguageOptions?: string;
  PreferredLanguage?: CallAnalyticsLanguageCode;
  VocabularyNames?: string;
  VocabularyFilterNames?: string;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: PartialResultsStability;
  ContentIdentificationType?: ContentIdentificationType;
  ContentRedactionType?: ContentRedactionType;
  PiiEntityTypes?: string;
}
export const StartCallAnalyticsStreamTranscriptionResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      RequestId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-request-id")),
      LanguageCode: S.optional(CallAnalyticsLanguageCode).pipe(
        T.HttpHeader("x-amzn-transcribe-language-code"),
      ),
      MediaSampleRateHertz: S.optional(S.Number).pipe(
        T.HttpHeader("x-amzn-transcribe-sample-rate"),
      ),
      MediaEncoding: S.optional(MediaEncoding).pipe(
        T.HttpHeader("x-amzn-transcribe-media-encoding"),
      ),
      VocabularyName: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-vocabulary-name"),
      ),
      SessionId: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-session-id"),
      ),
      CallAnalyticsTranscriptResultStream: S.optional(
        CallAnalyticsTranscriptResultStream,
      ).pipe(T.HttpPayload()),
      VocabularyFilterName: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-vocabulary-filter-name"),
      ),
      VocabularyFilterMethod: S.optional(VocabularyFilterMethod).pipe(
        T.HttpHeader("x-amzn-transcribe-vocabulary-filter-method"),
      ),
      LanguageModelName: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-language-model-name"),
      ),
      IdentifyLanguage: S.optional(S.Boolean).pipe(
        T.HttpHeader("x-amzn-transcribe-identify-language"),
      ),
      LanguageOptions: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-language-options"),
      ),
      PreferredLanguage: S.optional(CallAnalyticsLanguageCode).pipe(
        T.HttpHeader("x-amzn-transcribe-preferred-language"),
      ),
      VocabularyNames: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-vocabulary-names"),
      ),
      VocabularyFilterNames: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-vocabulary-filter-names"),
      ),
      EnablePartialResultsStabilization: S.optional(S.Boolean).pipe(
        T.HttpHeader("x-amzn-transcribe-enable-partial-results-stabilization"),
      ),
      PartialResultsStability: S.optional(PartialResultsStability).pipe(
        T.HttpHeader("x-amzn-transcribe-partial-results-stability"),
      ),
      ContentIdentificationType: S.optional(ContentIdentificationType).pipe(
        T.HttpHeader("x-amzn-transcribe-content-identification-type"),
      ),
      ContentRedactionType: S.optional(ContentRedactionType).pipe(
        T.HttpHeader("x-amzn-transcribe-content-redaction-type"),
      ),
      PiiEntityTypes: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-pii-entity-types"),
      ),
    }),
  ).annotate({
    identifier: "StartCallAnalyticsStreamTranscriptionResponse",
  }) as any as S.Schema<StartCallAnalyticsStreamTranscriptionResponse>;
export interface MedicalScribeAudioEvent {
  AudioChunk: Uint8Array;
}
export const MedicalScribeAudioEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AudioChunk: T.Blob.pipe(T.EventPayload()) }),
).annotate({
  identifier: "MedicalScribeAudioEvent",
}) as any as S.Schema<MedicalScribeAudioEvent>;
export type MedicalScribeSessionControlEventType =
  | "END_OF_SESSION"
  | (string & {});
export const MedicalScribeSessionControlEventType = /*@__PURE__*/ S.String;

export interface MedicalScribeSessionControlEvent {
  Type: MedicalScribeSessionControlEventType;
}
export const MedicalScribeSessionControlEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: MedicalScribeSessionControlEventType }),
).annotate({
  identifier: "MedicalScribeSessionControlEvent",
}) as any as S.Schema<MedicalScribeSessionControlEvent>;
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
export interface MedicalScribeConfigurationEvent {
  VocabularyName?: string;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: MedicalScribeVocabularyFilterMethod;
  ResourceAccessRoleArn: string;
  ChannelDefinitions?: MedicalScribeChannelDefinition[];
  EncryptionSettings?: MedicalScribeEncryptionSettings;
  PostStreamAnalyticsSettings: MedicalScribePostStreamAnalyticsSettings;
  MedicalScribeContext?: MedicalScribeContext;
}
export const MedicalScribeConfigurationEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VocabularyName: S.optional(S.String),
    VocabularyFilterName: S.optional(S.String),
    VocabularyFilterMethod: S.optional(MedicalScribeVocabularyFilterMethod),
    ResourceAccessRoleArn: S.String,
    ChannelDefinitions: S.optional(MedicalScribeChannelDefinitions),
    EncryptionSettings: S.optional(MedicalScribeEncryptionSettings),
    PostStreamAnalyticsSettings: MedicalScribePostStreamAnalyticsSettings,
    MedicalScribeContext: S.optional(MedicalScribeContext),
  }),
).annotate({
  identifier: "MedicalScribeConfigurationEvent",
}) as any as S.Schema<MedicalScribeConfigurationEvent>;
export type MedicalScribeInputStream =
  | {
      AudioEvent: MedicalScribeAudioEvent;
      SessionControlEvent?: never;
      ConfigurationEvent?: never;
    }
  | {
      AudioEvent?: never;
      SessionControlEvent: MedicalScribeSessionControlEvent;
      ConfigurationEvent?: never;
    }
  | {
      AudioEvent?: never;
      SessionControlEvent?: never;
      ConfigurationEvent: MedicalScribeConfigurationEvent;
    };
export const MedicalScribeInputStream = /*@__PURE__*/ T.InputEventStream(
  S.Union([
    S.Struct({ AudioEvent: MedicalScribeAudioEvent }),
    S.Struct({ SessionControlEvent: MedicalScribeSessionControlEvent }),
    S.Struct({ ConfigurationEvent: MedicalScribeConfigurationEvent }),
  ]),
) as any as S.Schema<stream.Stream<MedicalScribeInputStream, Error, never>>;
export interface StartMedicalScribeStreamRequest {
  SessionId?: string;
  LanguageCode: MedicalScribeLanguageCode;
  MediaSampleRateHertz: number;
  MediaEncoding: MedicalScribeMediaEncoding;
  InputStream: stream.Stream<MedicalScribeInputStream, Error, never>;
}
export const StartMedicalScribeStreamRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-session-id"),
    ),
    LanguageCode: MedicalScribeLanguageCode.pipe(
      T.HttpHeader("x-amzn-transcribe-language-code"),
    ),
    MediaSampleRateHertz: S.Number.pipe(
      T.HttpHeader("x-amzn-transcribe-sample-rate"),
    ),
    MediaEncoding: MedicalScribeMediaEncoding.pipe(
      T.HttpHeader("x-amzn-transcribe-media-encoding"),
    ),
    InputStream: MedicalScribeInputStream.pipe(T.HttpPayload()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/medical-scribe-stream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMedicalScribeStreamRequest",
}) as any as S.Schema<StartMedicalScribeStreamRequest>;
export type MedicalScribeTranscriptItemType =
  | "pronunciation"
  | "punctuation"
  | (string & {});
export const MedicalScribeTranscriptItemType = /*@__PURE__*/ S.String;

export interface MedicalScribeTranscriptItem {
  BeginAudioTime?: number;
  EndAudioTime?: number;
  Type?: MedicalScribeTranscriptItemType;
  Confidence?: number;
  Content?: string;
  VocabularyFilterMatch?: boolean;
}
export const MedicalScribeTranscriptItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BeginAudioTime: S.optional(S.Number),
    EndAudioTime: S.optional(S.Number),
    Type: S.optional(MedicalScribeTranscriptItemType),
    Confidence: S.optional(S.Number),
    Content: S.optional(S.String),
    VocabularyFilterMatch: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "MedicalScribeTranscriptItem",
}) as any as S.Schema<MedicalScribeTranscriptItem>;
export type MedicalScribeTranscriptItemList = MedicalScribeTranscriptItem[];
export const MedicalScribeTranscriptItemList = /*@__PURE__*/ S.Array(
  MedicalScribeTranscriptItem,
);
export interface MedicalScribeTranscriptSegment {
  SegmentId?: string;
  BeginAudioTime?: number;
  EndAudioTime?: number;
  Content?: string;
  Items?: MedicalScribeTranscriptItem[];
  IsPartial?: boolean;
  ChannelId?: string;
}
export const MedicalScribeTranscriptSegment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SegmentId: S.optional(S.String),
    BeginAudioTime: S.optional(S.Number),
    EndAudioTime: S.optional(S.Number),
    Content: S.optional(S.String),
    Items: S.optional(MedicalScribeTranscriptItemList),
    IsPartial: S.optional(S.Boolean),
    ChannelId: S.optional(S.String),
  }),
).annotate({
  identifier: "MedicalScribeTranscriptSegment",
}) as any as S.Schema<MedicalScribeTranscriptSegment>;
export interface MedicalScribeTranscriptEvent {
  TranscriptSegment?: MedicalScribeTranscriptSegment;
}
export const MedicalScribeTranscriptEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TranscriptSegment: S.optional(MedicalScribeTranscriptSegment) }),
).annotate({
  identifier: "MedicalScribeTranscriptEvent",
}) as any as S.Schema<MedicalScribeTranscriptEvent>;
export type MedicalScribeResultStream =
  | {
      TranscriptEvent: MedicalScribeTranscriptEvent;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException: BadRequestException;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException: LimitExceededException;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException: InternalFailureException;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException: ConflictException;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException: ServiceUnavailableException;
    };
export const MedicalScribeResultStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ TranscriptEvent: MedicalScribeTranscriptEvent }),
    S.Struct({
      BadRequestException: S.suspend(() => BadRequestException).annotate({
        identifier: "BadRequestException",
      }),
    }),
    S.Struct({
      LimitExceededException: S.suspend(() => LimitExceededException).annotate({
        identifier: "LimitExceededException",
      }),
    }),
    S.Struct({
      InternalFailureException: S.suspend(
        () => InternalFailureException,
      ).annotate({ identifier: "InternalFailureException" }),
    }),
    S.Struct({
      ConflictException: S.suspend(() => ConflictException).annotate({
        identifier: "ConflictException",
      }),
    }),
    S.Struct({
      ServiceUnavailableException: S.suspend(
        () => ServiceUnavailableException,
      ).annotate({ identifier: "ServiceUnavailableException" }),
    }),
  ]),
) as any as S.Schema<stream.Stream<MedicalScribeResultStream, Error, never>>;
export interface StartMedicalScribeStreamResponse {
  SessionId?: string;
  RequestId?: string;
  LanguageCode?: MedicalScribeLanguageCode;
  MediaSampleRateHertz?: number;
  MediaEncoding?: MedicalScribeMediaEncoding;
  ResultStream?: stream.Stream<MedicalScribeResultStream, Error, never>;
}
export const StartMedicalScribeStreamResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SessionId: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-session-id"),
    ),
    RequestId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-request-id")),
    LanguageCode: S.optional(MedicalScribeLanguageCode).pipe(
      T.HttpHeader("x-amzn-transcribe-language-code"),
    ),
    MediaSampleRateHertz: S.optional(S.Number).pipe(
      T.HttpHeader("x-amzn-transcribe-sample-rate"),
    ),
    MediaEncoding: S.optional(MedicalScribeMediaEncoding).pipe(
      T.HttpHeader("x-amzn-transcribe-media-encoding"),
    ),
    ResultStream: S.optional(MedicalScribeResultStream).pipe(T.HttpPayload()),
  }),
).annotate({
  identifier: "StartMedicalScribeStreamResponse",
}) as any as S.Schema<StartMedicalScribeStreamResponse>;
export type LanguageCode =
  | "en-US"
  | "en-GB"
  | "es-US"
  | "fr-CA"
  | "fr-FR"
  | "en-AU"
  | "it-IT"
  | "de-DE"
  | "pt-BR"
  | "ja-JP"
  | "ko-KR"
  | "zh-CN"
  | "th-TH"
  | "es-ES"
  | "ar-SA"
  | "pt-PT"
  | "ca-ES"
  | "ar-AE"
  | "hi-IN"
  | "zh-HK"
  | "nl-NL"
  | "no-NO"
  | "sv-SE"
  | "pl-PL"
  | "fi-FI"
  | "zh-TW"
  | "en-IN"
  | "en-IE"
  | "en-NZ"
  | "en-AB"
  | "en-ZA"
  | "en-WL"
  | "de-CH"
  | "af-ZA"
  | "eu-ES"
  | "hr-HR"
  | "cs-CZ"
  | "da-DK"
  | "fa-IR"
  | "gl-ES"
  | "el-GR"
  | "he-IL"
  | "id-ID"
  | "lv-LV"
  | "ms-MY"
  | "ro-RO"
  | "ru-RU"
  | "sr-RS"
  | "sk-SK"
  | "so-SO"
  | "tl-PH"
  | "uk-UA"
  | "vi-VN"
  | "zu-ZA"
  | "am-ET"
  | "be-BY"
  | "bg-BG"
  | "bn-IN"
  | "bs-BA"
  | "ckb-IQ"
  | "ckb-IR"
  | "cy-WL"
  | "es-MX"
  | "et-ET"
  | "fa-AF"
  | "gu-IN"
  | "ht-HT"
  | "hu-HU"
  | "hy-AM"
  | "is-IS"
  | "jv-ID"
  | "ka-GE"
  | "kab-DZ"
  | "kk-KZ"
  | "km-KH"
  | "kn-IN"
  | "lg-IN"
  | "lt-LT"
  | "mk-MK"
  | "ml-IN"
  | "mr-IN"
  | "my-MM"
  | "ne-NP"
  | "or-IN"
  | "pa-IN"
  | "ps-AF"
  | "si-LK"
  | "sl-SI"
  | "sq-AL"
  | "su-ID"
  | "sw-BI"
  | "sw-KE"
  | "sw-RW"
  | "sw-TZ"
  | "sw-UG"
  | "ta-IN"
  | "te-IN"
  | "tr-TR"
  | "uz-UZ"
  | (string & {});
export const LanguageCode = /*@__PURE__*/ S.String;

export type Specialty =
  | "PRIMARYCARE"
  | "CARDIOLOGY"
  | "NEUROLOGY"
  | "ONCOLOGY"
  | "RADIOLOGY"
  | "UROLOGY"
  | (string & {});
export const Specialty = /*@__PURE__*/ S.String;

export type Type = "CONVERSATION" | "DICTATION" | (string & {});
export const Type = /*@__PURE__*/ S.String;

export type NumberOfChannels = number;
export type MedicalContentIdentificationType = "PHI" | (string & {});
export const MedicalContentIdentificationType = /*@__PURE__*/ S.String;

export interface StartMedicalStreamTranscriptionRequest {
  LanguageCode: LanguageCode;
  MediaSampleRateHertz: number;
  MediaEncoding: MediaEncoding;
  VocabularyName?: string;
  Specialty: Specialty;
  Type: Type;
  ShowSpeakerLabel?: boolean;
  SessionId?: string;
  AudioStream: stream.Stream<AudioStream, Error, never>;
  EnableChannelIdentification?: boolean;
  NumberOfChannels?: number;
  ContentIdentificationType?: MedicalContentIdentificationType;
}
export const StartMedicalStreamTranscriptionRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LanguageCode: LanguageCode.pipe(
        T.HttpHeader("x-amzn-transcribe-language-code"),
      ),
      MediaSampleRateHertz: S.Number.pipe(
        T.HttpHeader("x-amzn-transcribe-sample-rate"),
      ),
      MediaEncoding: MediaEncoding.pipe(
        T.HttpHeader("x-amzn-transcribe-media-encoding"),
      ),
      VocabularyName: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-vocabulary-name"),
      ),
      Specialty: Specialty.pipe(T.HttpHeader("x-amzn-transcribe-specialty")),
      Type: Type.pipe(T.HttpHeader("x-amzn-transcribe-type")),
      ShowSpeakerLabel: S.optional(S.Boolean).pipe(
        T.HttpHeader("x-amzn-transcribe-show-speaker-label"),
      ),
      SessionId: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-session-id"),
      ),
      AudioStream: AudioStream.pipe(T.HttpPayload()),
      EnableChannelIdentification: S.optional(S.Boolean).pipe(
        T.HttpHeader("x-amzn-transcribe-enable-channel-identification"),
      ),
      NumberOfChannels: S.optional(S.Number).pipe(
        T.HttpHeader("x-amzn-transcribe-number-of-channels"),
      ),
      ContentIdentificationType: S.optional(
        MedicalContentIdentificationType,
      ).pipe(T.HttpHeader("x-amzn-transcribe-content-identification-type")),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/medical-stream-transcription" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartMedicalStreamTranscriptionRequest",
}) as any as S.Schema<StartMedicalStreamTranscriptionRequest>;
export interface MedicalItem {
  StartTime?: number;
  EndTime?: number;
  Type?: ItemType;
  Content?: string;
  Confidence?: number;
  Speaker?: string;
}
export const MedicalItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Number),
    EndTime: S.optional(S.Number),
    Type: S.optional(ItemType),
    Content: S.optional(S.String),
    Confidence: S.optional(S.Number),
    Speaker: S.optional(S.String),
  }),
).annotate({ identifier: "MedicalItem" }) as any as S.Schema<MedicalItem>;
export type MedicalItemList = MedicalItem[];
export const MedicalItemList = /*@__PURE__*/ S.Array(MedicalItem);
export interface MedicalEntity {
  StartTime?: number;
  EndTime?: number;
  Category?: string;
  Content?: string;
  Confidence?: number;
}
export const MedicalEntity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Number),
    EndTime: S.optional(S.Number),
    Category: S.optional(S.String),
    Content: S.optional(S.String),
    Confidence: S.optional(S.Number),
  }),
).annotate({ identifier: "MedicalEntity" }) as any as S.Schema<MedicalEntity>;
export type MedicalEntityList = MedicalEntity[];
export const MedicalEntityList = /*@__PURE__*/ S.Array(MedicalEntity);
export interface MedicalAlternative {
  Transcript?: string;
  Items?: MedicalItem[];
  Entities?: MedicalEntity[];
}
export const MedicalAlternative = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Transcript: S.optional(S.String),
    Items: S.optional(MedicalItemList),
    Entities: S.optional(MedicalEntityList),
  }),
).annotate({
  identifier: "MedicalAlternative",
}) as any as S.Schema<MedicalAlternative>;
export type MedicalAlternativeList = MedicalAlternative[];
export const MedicalAlternativeList = /*@__PURE__*/ S.Array(MedicalAlternative);
export interface MedicalResult {
  ResultId?: string;
  StartTime?: number;
  EndTime?: number;
  IsPartial?: boolean;
  Alternatives?: MedicalAlternative[];
  ChannelId?: string;
}
export const MedicalResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResultId: S.optional(S.String),
    StartTime: S.optional(S.Number),
    EndTime: S.optional(S.Number),
    IsPartial: S.optional(S.Boolean),
    Alternatives: S.optional(MedicalAlternativeList),
    ChannelId: S.optional(S.String),
  }),
).annotate({ identifier: "MedicalResult" }) as any as S.Schema<MedicalResult>;
export type MedicalResultList = MedicalResult[];
export const MedicalResultList = /*@__PURE__*/ S.Array(MedicalResult);
export interface MedicalTranscript {
  Results?: MedicalResult[];
}
export const MedicalTranscript = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Results: S.optional(MedicalResultList) }),
).annotate({
  identifier: "MedicalTranscript",
}) as any as S.Schema<MedicalTranscript>;
export interface MedicalTranscriptEvent {
  Transcript?: MedicalTranscript;
}
export const MedicalTranscriptEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Transcript: S.optional(MedicalTranscript) }),
).annotate({
  identifier: "MedicalTranscriptEvent",
}) as any as S.Schema<MedicalTranscriptEvent>;
export type MedicalTranscriptResultStream =
  | {
      TranscriptEvent: MedicalTranscriptEvent;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException: BadRequestException;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException: LimitExceededException;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException: InternalFailureException;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException: ConflictException;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException: ServiceUnavailableException;
    };
export const MedicalTranscriptResultStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ TranscriptEvent: MedicalTranscriptEvent }),
    S.Struct({
      BadRequestException: S.suspend(() => BadRequestException).annotate({
        identifier: "BadRequestException",
      }),
    }),
    S.Struct({
      LimitExceededException: S.suspend(() => LimitExceededException).annotate({
        identifier: "LimitExceededException",
      }),
    }),
    S.Struct({
      InternalFailureException: S.suspend(
        () => InternalFailureException,
      ).annotate({ identifier: "InternalFailureException" }),
    }),
    S.Struct({
      ConflictException: S.suspend(() => ConflictException).annotate({
        identifier: "ConflictException",
      }),
    }),
    S.Struct({
      ServiceUnavailableException: S.suspend(
        () => ServiceUnavailableException,
      ).annotate({ identifier: "ServiceUnavailableException" }),
    }),
  ]),
) as any as S.Schema<
  stream.Stream<MedicalTranscriptResultStream, Error, never>
>;
export interface StartMedicalStreamTranscriptionResponse {
  RequestId?: string;
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaEncoding?: MediaEncoding;
  VocabularyName?: string;
  Specialty?: Specialty;
  Type?: Type;
  ShowSpeakerLabel?: boolean;
  SessionId?: string;
  TranscriptResultStream?: stream.Stream<
    MedicalTranscriptResultStream,
    Error,
    never
  >;
  EnableChannelIdentification?: boolean;
  NumberOfChannels?: number;
  ContentIdentificationType?: MedicalContentIdentificationType;
}
export const StartMedicalStreamTranscriptionResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      RequestId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-request-id")),
      LanguageCode: S.optional(LanguageCode).pipe(
        T.HttpHeader("x-amzn-transcribe-language-code"),
      ),
      MediaSampleRateHertz: S.optional(S.Number).pipe(
        T.HttpHeader("x-amzn-transcribe-sample-rate"),
      ),
      MediaEncoding: S.optional(MediaEncoding).pipe(
        T.HttpHeader("x-amzn-transcribe-media-encoding"),
      ),
      VocabularyName: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-vocabulary-name"),
      ),
      Specialty: S.optional(Specialty).pipe(
        T.HttpHeader("x-amzn-transcribe-specialty"),
      ),
      Type: S.optional(Type).pipe(T.HttpHeader("x-amzn-transcribe-type")),
      ShowSpeakerLabel: S.optional(S.Boolean).pipe(
        T.HttpHeader("x-amzn-transcribe-show-speaker-label"),
      ),
      SessionId: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-transcribe-session-id"),
      ),
      TranscriptResultStream: S.optional(MedicalTranscriptResultStream).pipe(
        T.HttpPayload(),
      ),
      EnableChannelIdentification: S.optional(S.Boolean).pipe(
        T.HttpHeader("x-amzn-transcribe-enable-channel-identification"),
      ),
      NumberOfChannels: S.optional(S.Number).pipe(
        T.HttpHeader("x-amzn-transcribe-number-of-channels"),
      ),
      ContentIdentificationType: S.optional(
        MedicalContentIdentificationType,
      ).pipe(T.HttpHeader("x-amzn-transcribe-content-identification-type")),
    }),
).annotate({
  identifier: "StartMedicalStreamTranscriptionResponse",
}) as any as S.Schema<StartMedicalStreamTranscriptionResponse>;
export type SessionResumeWindow = number;
export interface StartStreamTranscriptionRequest {
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz: number;
  MediaEncoding: MediaEncoding;
  VocabularyName?: string;
  SessionId?: string;
  AudioStream: stream.Stream<AudioStream, Error, never>;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  ShowSpeakerLabel?: boolean;
  EnableChannelIdentification?: boolean;
  NumberOfChannels?: number;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: PartialResultsStability;
  ContentIdentificationType?: ContentIdentificationType;
  ContentRedactionType?: ContentRedactionType;
  PiiEntityTypes?: string;
  LanguageModelName?: string;
  IdentifyLanguage?: boolean;
  LanguageOptions?: string;
  PreferredLanguage?: LanguageCode;
  IdentifyMultipleLanguages?: boolean;
  VocabularyNames?: string;
  VocabularyFilterNames?: string;
  SessionResumeWindow?: number;
}
export const StartStreamTranscriptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LanguageCode: S.optional(LanguageCode).pipe(
      T.HttpHeader("x-amzn-transcribe-language-code"),
    ),
    MediaSampleRateHertz: S.Number.pipe(
      T.HttpHeader("x-amzn-transcribe-sample-rate"),
    ),
    MediaEncoding: MediaEncoding.pipe(
      T.HttpHeader("x-amzn-transcribe-media-encoding"),
    ),
    VocabularyName: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-vocabulary-name"),
    ),
    SessionId: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-session-id"),
    ),
    AudioStream: AudioStream.pipe(T.HttpPayload()),
    VocabularyFilterName: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-vocabulary-filter-name"),
    ),
    VocabularyFilterMethod: S.optional(VocabularyFilterMethod).pipe(
      T.HttpHeader("x-amzn-transcribe-vocabulary-filter-method"),
    ),
    ShowSpeakerLabel: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amzn-transcribe-show-speaker-label"),
    ),
    EnableChannelIdentification: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amzn-transcribe-enable-channel-identification"),
    ),
    NumberOfChannels: S.optional(S.Number).pipe(
      T.HttpHeader("x-amzn-transcribe-number-of-channels"),
    ),
    EnablePartialResultsStabilization: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amzn-transcribe-enable-partial-results-stabilization"),
    ),
    PartialResultsStability: S.optional(PartialResultsStability).pipe(
      T.HttpHeader("x-amzn-transcribe-partial-results-stability"),
    ),
    ContentIdentificationType: S.optional(ContentIdentificationType).pipe(
      T.HttpHeader("x-amzn-transcribe-content-identification-type"),
    ),
    ContentRedactionType: S.optional(ContentRedactionType).pipe(
      T.HttpHeader("x-amzn-transcribe-content-redaction-type"),
    ),
    PiiEntityTypes: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-pii-entity-types"),
    ),
    LanguageModelName: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-language-model-name"),
    ),
    IdentifyLanguage: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amzn-transcribe-identify-language"),
    ),
    LanguageOptions: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-language-options"),
    ),
    PreferredLanguage: S.optional(LanguageCode).pipe(
      T.HttpHeader("x-amzn-transcribe-preferred-language"),
    ),
    IdentifyMultipleLanguages: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amzn-transcribe-identify-multiple-languages"),
    ),
    VocabularyNames: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-vocabulary-names"),
    ),
    VocabularyFilterNames: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-vocabulary-filter-names"),
    ),
    SessionResumeWindow: S.optional(S.Number).pipe(
      T.HttpHeader("x-amzn-transcribe-session-resume-window"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/stream-transcription" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartStreamTranscriptionRequest",
}) as any as S.Schema<StartStreamTranscriptionRequest>;
export interface Item {
  StartTime?: number;
  EndTime?: number;
  Type?: ItemType;
  Content?: string;
  VocabularyFilterMatch?: boolean;
  Speaker?: string;
  Confidence?: number;
  Stable?: boolean;
}
export const Item = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Number),
    EndTime: S.optional(S.Number),
    Type: S.optional(ItemType),
    Content: S.optional(S.String),
    VocabularyFilterMatch: S.optional(S.Boolean),
    Speaker: S.optional(S.String),
    Confidence: S.optional(S.Number),
    Stable: S.optional(S.Boolean),
  }),
).annotate({ identifier: "Item" }) as any as S.Schema<Item>;
export type ItemList = Item[];
export const ItemList = /*@__PURE__*/ S.Array(Item);
export interface Entity {
  StartTime?: number;
  EndTime?: number;
  Category?: string;
  Type?: string;
  Content?: string;
  Confidence?: number;
}
export const Entity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Number),
    EndTime: S.optional(S.Number),
    Category: S.optional(S.String),
    Type: S.optional(S.String),
    Content: S.optional(S.String),
    Confidence: S.optional(S.Number),
  }),
).annotate({ identifier: "Entity" }) as any as S.Schema<Entity>;
export type EntityList = Entity[];
export const EntityList = /*@__PURE__*/ S.Array(Entity);
export interface Alternative {
  Transcript?: string;
  Items?: Item[];
  Entities?: Entity[];
}
export const Alternative = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Transcript: S.optional(S.String),
    Items: S.optional(ItemList),
    Entities: S.optional(EntityList),
  }),
).annotate({ identifier: "Alternative" }) as any as S.Schema<Alternative>;
export type AlternativeList = Alternative[];
export const AlternativeList = /*@__PURE__*/ S.Array(Alternative);
export interface LanguageWithScore {
  LanguageCode?: LanguageCode;
  Score?: number;
}
export const LanguageWithScore = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LanguageCode: S.optional(LanguageCode),
    Score: S.optional(S.Number),
  }),
).annotate({
  identifier: "LanguageWithScore",
}) as any as S.Schema<LanguageWithScore>;
export type LanguageIdentification = LanguageWithScore[];
export const LanguageIdentification = /*@__PURE__*/ S.Array(LanguageWithScore);
export interface Result {
  ResultId?: string;
  StartTime?: number;
  EndTime?: number;
  IsPartial?: boolean;
  Alternatives?: Alternative[];
  ChannelId?: string;
  LanguageCode?: LanguageCode;
  LanguageIdentification?: LanguageWithScore[];
}
export const Result = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResultId: S.optional(S.String),
    StartTime: S.optional(S.Number),
    EndTime: S.optional(S.Number),
    IsPartial: S.optional(S.Boolean),
    Alternatives: S.optional(AlternativeList),
    ChannelId: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    LanguageIdentification: S.optional(LanguageIdentification),
  }),
).annotate({ identifier: "Result" }) as any as S.Schema<Result>;
export type ResultList = Result[];
export const ResultList = /*@__PURE__*/ S.Array(Result);
export interface Transcript {
  Results?: Result[];
}
export const Transcript = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Results: S.optional(ResultList) }),
).annotate({ identifier: "Transcript" }) as any as S.Schema<Transcript>;
export interface TranscriptEvent {
  Transcript?: Transcript;
}
export const TranscriptEvent = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Transcript: S.optional(Transcript) }),
).annotate({
  identifier: "TranscriptEvent",
}) as any as S.Schema<TranscriptEvent>;
export type TranscriptResultStream =
  | {
      TranscriptEvent: TranscriptEvent;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException: BadRequestException;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException: LimitExceededException;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException: InternalFailureException;
      ConflictException?: never;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException: ConflictException;
      ServiceUnavailableException?: never;
    }
  | {
      TranscriptEvent?: never;
      BadRequestException?: never;
      LimitExceededException?: never;
      InternalFailureException?: never;
      ConflictException?: never;
      ServiceUnavailableException: ServiceUnavailableException;
    };
export const TranscriptResultStream = /*@__PURE__*/ T.EventStream(
  S.Union([
    S.Struct({ TranscriptEvent: TranscriptEvent }),
    S.Struct({
      BadRequestException: S.suspend(() => BadRequestException).annotate({
        identifier: "BadRequestException",
      }),
    }),
    S.Struct({
      LimitExceededException: S.suspend(() => LimitExceededException).annotate({
        identifier: "LimitExceededException",
      }),
    }),
    S.Struct({
      InternalFailureException: S.suspend(
        () => InternalFailureException,
      ).annotate({ identifier: "InternalFailureException" }),
    }),
    S.Struct({
      ConflictException: S.suspend(() => ConflictException).annotate({
        identifier: "ConflictException",
      }),
    }),
    S.Struct({
      ServiceUnavailableException: S.suspend(
        () => ServiceUnavailableException,
      ).annotate({ identifier: "ServiceUnavailableException" }),
    }),
  ]),
) as any as S.Schema<stream.Stream<TranscriptResultStream, Error, never>>;
export interface StartStreamTranscriptionResponse {
  RequestId?: string;
  LanguageCode?: LanguageCode;
  MediaSampleRateHertz?: number;
  MediaEncoding?: MediaEncoding;
  VocabularyName?: string;
  SessionId?: string;
  TranscriptResultStream?: stream.Stream<TranscriptResultStream, Error, never>;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  ShowSpeakerLabel?: boolean;
  EnableChannelIdentification?: boolean;
  NumberOfChannels?: number;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: PartialResultsStability;
  ContentIdentificationType?: ContentIdentificationType;
  ContentRedactionType?: ContentRedactionType;
  PiiEntityTypes?: string;
  LanguageModelName?: string;
  IdentifyLanguage?: boolean;
  LanguageOptions?: string;
  PreferredLanguage?: LanguageCode;
  IdentifyMultipleLanguages?: boolean;
  VocabularyNames?: string;
  VocabularyFilterNames?: string;
  SessionResumeWindow?: number;
}
export const StartStreamTranscriptionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RequestId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-request-id")),
    LanguageCode: S.optional(LanguageCode).pipe(
      T.HttpHeader("x-amzn-transcribe-language-code"),
    ),
    MediaSampleRateHertz: S.optional(S.Number).pipe(
      T.HttpHeader("x-amzn-transcribe-sample-rate"),
    ),
    MediaEncoding: S.optional(MediaEncoding).pipe(
      T.HttpHeader("x-amzn-transcribe-media-encoding"),
    ),
    VocabularyName: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-vocabulary-name"),
    ),
    SessionId: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-session-id"),
    ),
    TranscriptResultStream: S.optional(TranscriptResultStream).pipe(
      T.HttpPayload(),
    ),
    VocabularyFilterName: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-vocabulary-filter-name"),
    ),
    VocabularyFilterMethod: S.optional(VocabularyFilterMethod).pipe(
      T.HttpHeader("x-amzn-transcribe-vocabulary-filter-method"),
    ),
    ShowSpeakerLabel: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amzn-transcribe-show-speaker-label"),
    ),
    EnableChannelIdentification: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amzn-transcribe-enable-channel-identification"),
    ),
    NumberOfChannels: S.optional(S.Number).pipe(
      T.HttpHeader("x-amzn-transcribe-number-of-channels"),
    ),
    EnablePartialResultsStabilization: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amzn-transcribe-enable-partial-results-stabilization"),
    ),
    PartialResultsStability: S.optional(PartialResultsStability).pipe(
      T.HttpHeader("x-amzn-transcribe-partial-results-stability"),
    ),
    ContentIdentificationType: S.optional(ContentIdentificationType).pipe(
      T.HttpHeader("x-amzn-transcribe-content-identification-type"),
    ),
    ContentRedactionType: S.optional(ContentRedactionType).pipe(
      T.HttpHeader("x-amzn-transcribe-content-redaction-type"),
    ),
    PiiEntityTypes: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-pii-entity-types"),
    ),
    LanguageModelName: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-language-model-name"),
    ),
    IdentifyLanguage: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amzn-transcribe-identify-language"),
    ),
    LanguageOptions: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-language-options"),
    ),
    PreferredLanguage: S.optional(LanguageCode).pipe(
      T.HttpHeader("x-amzn-transcribe-preferred-language"),
    ),
    IdentifyMultipleLanguages: S.optional(S.Boolean).pipe(
      T.HttpHeader("x-amzn-transcribe-identify-multiple-languages"),
    ),
    VocabularyNames: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-vocabulary-names"),
    ),
    VocabularyFilterNames: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-transcribe-vocabulary-filter-names"),
    ),
    SessionResumeWindow: S.optional(S.Number).pipe(
      T.HttpHeader("x-amzn-transcribe-session-resume-window"),
    ),
  }),
).annotate({
  identifier: "StartStreamTranscriptionResponse",
}) as any as S.Schema<StartStreamTranscriptionResponse>;
export type GetMedicalScribeStreamError =
  | BadRequestException
  | InternalFailureException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provides details about the specified Amazon Web Services HealthScribe streaming session.
 * To view the status of the streaming session, check the `StreamStatus` field in the response. To get the
 * details of post-stream analytics, including its status, check the `PostStreamAnalyticsResult` field in the response.
 */
export const getMedicalScribeStream: API.OperationMethod<
  GetMedicalScribeStreamRequest,
  GetMedicalScribeStreamResponse,
  GetMedicalScribeStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMedicalScribeStreamRequest,
  output: GetMedicalScribeStreamResponse,
  errors: [
    BadRequestException,
    InternalFailureException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMedicalScribeStream",
}));

export type StartCallAnalyticsStreamTranscriptionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts a bidirectional HTTP/2 or WebSocket stream where audio is streamed to
 * Amazon Transcribe and the transcription results are streamed to your application. Use this operation
 * for Call Analytics transcriptions.
 *
 * The following parameters are required:
 *
 * - `language-code` or `identify-language`
 *
 * - `media-encoding`
 *
 * - `sample-rate`
 *
 * For more information on streaming with Amazon Transcribe, see Transcribing streaming audio.
 */
export const startCallAnalyticsStreamTranscription: API.OperationMethod<
  StartCallAnalyticsStreamTranscriptionRequest,
  StartCallAnalyticsStreamTranscriptionResponse,
  StartCallAnalyticsStreamTranscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCallAnalyticsStreamTranscriptionRequest,
  output: StartCallAnalyticsStreamTranscriptionResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCallAnalyticsStreamTranscription",
}));

export type StartMedicalScribeStreamError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts a bidirectional HTTP/2 stream, where audio is streamed to
 * Amazon Web Services HealthScribe
 * and the transcription results are streamed to your application.
 *
 * When you start a stream, you first specify the stream configuration in a `MedicalScribeConfigurationEvent`.
 * This event includes channel definitions, encryption settings, medical scribe context, and post-stream analytics settings, such as the output configuration for aggregated transcript and clinical note generation. These are additional
 * streaming session configurations beyond those provided in your initial start request headers. Whether you are starting a new session or resuming an existing session,
 * your first event must be a `MedicalScribeConfigurationEvent`.
 *
 * After you send a `MedicalScribeConfigurationEvent`, you start `AudioEvents` and Amazon Web Services HealthScribe
 * responds with real-time transcription results. When you are finished, to start processing the results with the post-stream analytics, send a `MedicalScribeSessionControlEvent` with a `Type` of
 * `END_OF_SESSION` and Amazon Web Services HealthScribe starts the analytics.
 *
 * You can pause or resume streaming.
 * To pause streaming, complete the input stream without sending the
 * `MedicalScribeSessionControlEvent`.
 * To resume streaming, call the `StartMedicalScribeStream` and specify the same SessionId you used to start the stream.
 *
 * The following parameters are required:
 *
 * - `language-code`
 *
 * - `media-encoding`
 *
 * - `media-sample-rate-hertz`
 *
 * For more information on streaming with
 * Amazon Web Services HealthScribe,
 * see Amazon Web Services HealthScribe.
 */
export const startMedicalScribeStream: API.OperationMethod<
  StartMedicalScribeStreamRequest,
  StartMedicalScribeStreamResponse,
  StartMedicalScribeStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMedicalScribeStreamRequest,
  output: StartMedicalScribeStreamResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMedicalScribeStream",
}));

export type StartMedicalStreamTranscriptionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts a bidirectional HTTP/2 or WebSocket stream where audio is streamed to
 * Amazon Transcribe Medical and the transcription results are streamed to your
 * application.
 *
 * The following parameters are required:
 *
 * - `language-code`
 *
 * - `media-encoding`
 *
 * - `sample-rate`
 *
 * For more information on streaming with Amazon Transcribe Medical, see
 * Transcribing
 * streaming audio.
 */
export const startMedicalStreamTranscription: API.OperationMethod<
  StartMedicalStreamTranscriptionRequest,
  StartMedicalStreamTranscriptionResponse,
  StartMedicalStreamTranscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMedicalStreamTranscriptionRequest,
  output: StartMedicalStreamTranscriptionResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMedicalStreamTranscription",
}));

export type StartStreamTranscriptionError =
  | BadRequestException
  | ConflictException
  | InternalFailureException
  | LimitExceededException
  | ServiceUnavailableException
  | CommonErrors;
/**
 * Starts a bidirectional HTTP/2 or WebSocket stream where audio is streamed to
 * Amazon Transcribe and the transcription results are streamed to your application.
 *
 * The following parameters are required:
 *
 * - `language-code` or `identify-language` or `identify-multiple-language`
 *
 * - `media-encoding`
 *
 * - `sample-rate`
 *
 * For more information on streaming with Amazon Transcribe, see Transcribing streaming audio.
 */
export const startStreamTranscription: API.OperationMethod<
  StartStreamTranscriptionRequest,
  StartStreamTranscriptionResponse,
  StartStreamTranscriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartStreamTranscriptionRequest,
  output: StartStreamTranscriptionResponse,
  errors: [
    BadRequestException,
    ConflictException,
    InternalFailureException,
    LimitExceededException,
    ServiceUnavailableException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartStreamTranscription",
}));
