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
import { SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Translate",
  serviceShapeName: "AWSShineFrontendService_20170701",
});
const auth = T.AwsAuthSigv4({ name: "translate" });
const ver = T.ServiceVersion("2017-07-01");
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
              `https://translate-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://translate-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://translate.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://translate.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class DetectedLanguageLowConfidenceException
  extends /*@__PURE__*/ S.TaggedError<DetectedLanguageLowConfidenceException>()(
    "DetectedLanguageLowConfidenceException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      DetectedLanguageCode: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class InvalidFilterException
  extends /*@__PURE__*/ S.TaggedError<InvalidFilterException>()(
    "InvalidFilterException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidParameterValueException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterValueException>()(
    "InvalidParameterValueException",
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
    T.HttpError(400),
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
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TextSizeLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<TextSizeLimitExceededException>()(
    "TextSizeLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceArn: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedDisplayLanguageCodeException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedDisplayLanguageCodeException>()(
    "UnsupportedDisplayLanguageCodeException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      DisplayLanguageCode: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedLanguagePairException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedLanguagePairException>()(
    "UnsupportedLanguagePairException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      SourceLanguageCode: S.optional(S.String),
      TargetLanguageCode: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ResourceName = string;
export type Description = string;
export type S3Uri = string;
export type ParallelDataFormat = "TSV" | "CSV" | "TMX" | (string & {});
export const ParallelDataFormat = /*@__PURE__*/ S.String;

export interface ParallelDataConfig {
  S3Uri?: string;
  Format?: ParallelDataFormat;
}
export const ParallelDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    S3Uri: S.optional(S.String),
    Format: S.optional(ParallelDataFormat),
  }),
).annotate({
  identifier: "ParallelDataConfig",
}) as any as S.Schema<ParallelDataConfig>;
export type EncryptionKeyType = "KMS" | (string & {});
export const EncryptionKeyType = /*@__PURE__*/ S.String;

export type EncryptionKeyID = string;
export interface EncryptionKey {
  Type: EncryptionKeyType;
  Id: string;
}
export const EncryptionKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: EncryptionKeyType, Id: S.String }),
).annotate({ identifier: "EncryptionKey" }) as any as S.Schema<EncryptionKey>;
export type ClientTokenString = string;
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
export interface CreateParallelDataRequest {
  Name: string;
  Description?: string;
  ParallelDataConfig: ParallelDataConfig;
  EncryptionKey?: EncryptionKey;
  ClientToken: string;
  Tags?: Tag[];
}
export const CreateParallelDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    ParallelDataConfig: ParallelDataConfig,
    EncryptionKey: S.optional(EncryptionKey),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateParallelDataRequest",
}) as any as S.Schema<CreateParallelDataRequest>;
export type ParallelDataStatus =
  | "CREATING"
  | "UPDATING"
  | "ACTIVE"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const ParallelDataStatus = /*@__PURE__*/ S.String;

export interface CreateParallelDataResponse {
  Name?: string;
  Status?: ParallelDataStatus;
}
export const CreateParallelDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(ParallelDataStatus),
  }),
).annotate({
  identifier: "CreateParallelDataResponse",
}) as any as S.Schema<CreateParallelDataResponse>;
export interface DeleteParallelDataRequest {
  Name: string;
}
export const DeleteParallelDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteParallelDataRequest",
}) as any as S.Schema<DeleteParallelDataRequest>;
export interface DeleteParallelDataResponse {
  Name?: string;
  Status?: ParallelDataStatus;
}
export const DeleteParallelDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(ParallelDataStatus),
  }),
).annotate({
  identifier: "DeleteParallelDataResponse",
}) as any as S.Schema<DeleteParallelDataResponse>;
export interface DeleteTerminologyRequest {
  Name: string;
}
export const DeleteTerminologyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteTerminologyRequest",
}) as any as S.Schema<DeleteTerminologyRequest>;
export interface DeleteTerminologyResponse {}
export const DeleteTerminologyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTerminologyResponse",
}) as any as S.Schema<DeleteTerminologyResponse>;
export type JobId = string;
export interface DescribeTextTranslationJobRequest {
  JobId: string;
}
export const DescribeTextTranslationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeTextTranslationJobRequest",
}) as any as S.Schema<DescribeTextTranslationJobRequest>;
export type JobName = string;
export type JobStatus =
  | "SUBMITTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "COMPLETED_WITH_ERROR"
  | "FAILED"
  | "STOP_REQUESTED"
  | "STOPPED"
  | (string & {});
export const JobStatus = /*@__PURE__*/ S.String;

export interface JobDetails {
  TranslatedDocumentsCount?: number;
  DocumentsWithErrorsCount?: number;
  InputDocumentsCount?: number;
}
export const JobDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TranslatedDocumentsCount: S.optional(S.Number),
    DocumentsWithErrorsCount: S.optional(S.Number),
    InputDocumentsCount: S.optional(S.Number),
  }),
).annotate({ identifier: "JobDetails" }) as any as S.Schema<JobDetails>;
export type LanguageCodeString = string;
export type TargetLanguageCodeStringList = string[];
export const TargetLanguageCodeStringList = /*@__PURE__*/ S.Array(S.String);
export type ResourceNameList = string[];
export const ResourceNameList = /*@__PURE__*/ S.Array(S.String);
export type UnboundedLengthString = string;
export type ContentType = string;
export interface InputDataConfig {
  S3Uri: string;
  ContentType: string;
}
export const InputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Uri: S.String, ContentType: S.String }),
).annotate({
  identifier: "InputDataConfig",
}) as any as S.Schema<InputDataConfig>;
export interface OutputDataConfig {
  S3Uri: string;
  EncryptionKey?: EncryptionKey;
}
export const OutputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Uri: S.String, EncryptionKey: S.optional(EncryptionKey) }),
).annotate({
  identifier: "OutputDataConfig",
}) as any as S.Schema<OutputDataConfig>;
export type IamRoleArn = string;
export type Formality = "FORMAL" | "INFORMAL" | (string & {});
export const Formality = /*@__PURE__*/ S.String;

export type Profanity = "MASK" | (string & {});
export const Profanity = /*@__PURE__*/ S.String;

export type Brevity = "ON" | (string & {});
export const Brevity = /*@__PURE__*/ S.String;

export interface TranslationSettings {
  Formality?: Formality;
  Profanity?: Profanity;
  Brevity?: Brevity;
}
export const TranslationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Formality: S.optional(Formality),
    Profanity: S.optional(Profanity),
    Brevity: S.optional(Brevity),
  }),
).annotate({
  identifier: "TranslationSettings",
}) as any as S.Schema<TranslationSettings>;
export interface TextTranslationJobProperties {
  JobId?: string;
  JobName?: string;
  JobStatus?: JobStatus;
  JobDetails?: JobDetails;
  SourceLanguageCode?: string;
  TargetLanguageCodes?: string[];
  TerminologyNames?: string[];
  ParallelDataNames?: string[];
  Message?: string;
  SubmittedTime?: Date;
  EndTime?: Date;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  DataAccessRoleArn?: string;
  Settings?: TranslationSettings;
}
export const TextTranslationJobProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobId: S.optional(S.String),
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    JobDetails: S.optional(JobDetails),
    SourceLanguageCode: S.optional(S.String),
    TargetLanguageCodes: S.optional(TargetLanguageCodeStringList),
    TerminologyNames: S.optional(ResourceNameList),
    ParallelDataNames: S.optional(ResourceNameList),
    Message: S.optional(S.String),
    SubmittedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    InputDataConfig: S.optional(InputDataConfig),
    OutputDataConfig: S.optional(OutputDataConfig),
    DataAccessRoleArn: S.optional(S.String),
    Settings: S.optional(TranslationSettings),
  }),
).annotate({
  identifier: "TextTranslationJobProperties",
}) as any as S.Schema<TextTranslationJobProperties>;
export interface DescribeTextTranslationJobResponse {
  TextTranslationJobProperties?: TextTranslationJobProperties;
}
export const DescribeTextTranslationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TextTranslationJobProperties: S.optional(TextTranslationJobProperties),
  }),
).annotate({
  identifier: "DescribeTextTranslationJobResponse",
}) as any as S.Schema<DescribeTextTranslationJobResponse>;
export interface GetParallelDataRequest {
  Name: string;
}
export const GetParallelDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetParallelDataRequest",
}) as any as S.Schema<GetParallelDataRequest>;
export type ParallelDataArn = string;
export type LanguageCodeStringList = string[];
export const LanguageCodeStringList = /*@__PURE__*/ S.Array(S.String);
export interface ParallelDataProperties {
  Name?: string;
  Arn?: string;
  Description?: string;
  Status?: ParallelDataStatus;
  SourceLanguageCode?: string;
  TargetLanguageCodes?: string[];
  ParallelDataConfig?: ParallelDataConfig;
  Message?: string;
  ImportedDataSize?: number;
  ImportedRecordCount?: number;
  FailedRecordCount?: number;
  SkippedRecordCount?: number;
  EncryptionKey?: EncryptionKey;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  LatestUpdateAttemptStatus?: ParallelDataStatus;
  LatestUpdateAttemptAt?: Date;
}
export const ParallelDataProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Arn: S.optional(S.String),
    Description: S.optional(S.String),
    Status: S.optional(ParallelDataStatus),
    SourceLanguageCode: S.optional(S.String),
    TargetLanguageCodes: S.optional(LanguageCodeStringList),
    ParallelDataConfig: S.optional(ParallelDataConfig),
    Message: S.optional(S.String),
    ImportedDataSize: S.optional(S.Number),
    ImportedRecordCount: S.optional(S.Number),
    FailedRecordCount: S.optional(S.Number),
    SkippedRecordCount: S.optional(S.Number),
    EncryptionKey: S.optional(EncryptionKey),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LatestUpdateAttemptStatus: S.optional(ParallelDataStatus),
    LatestUpdateAttemptAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "ParallelDataProperties",
}) as any as S.Schema<ParallelDataProperties>;
export interface ParallelDataDataLocation {
  RepositoryType: string;
  Location: string;
}
export const ParallelDataDataLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RepositoryType: S.String, Location: S.String }),
).annotate({
  identifier: "ParallelDataDataLocation",
}) as any as S.Schema<ParallelDataDataLocation>;
export interface GetParallelDataResponse {
  ParallelDataProperties?: ParallelDataProperties;
  DataLocation?: ParallelDataDataLocation;
  AuxiliaryDataLocation?: ParallelDataDataLocation;
  LatestUpdateAttemptAuxiliaryDataLocation?: ParallelDataDataLocation;
}
export const GetParallelDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParallelDataProperties: S.optional(ParallelDataProperties),
    DataLocation: S.optional(ParallelDataDataLocation),
    AuxiliaryDataLocation: S.optional(ParallelDataDataLocation),
    LatestUpdateAttemptAuxiliaryDataLocation: S.optional(
      ParallelDataDataLocation,
    ),
  }),
).annotate({
  identifier: "GetParallelDataResponse",
}) as any as S.Schema<GetParallelDataResponse>;
export type TerminologyDataFormat = "CSV" | "TMX" | "TSV" | (string & {});
export const TerminologyDataFormat = /*@__PURE__*/ S.String;

export interface GetTerminologyRequest {
  Name: string;
  TerminologyDataFormat?: TerminologyDataFormat;
}
export const GetTerminologyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    TerminologyDataFormat: S.optional(TerminologyDataFormat),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetTerminologyRequest",
}) as any as S.Schema<GetTerminologyRequest>;
export type TerminologyArn = string;
export type Directionality = "UNI" | "MULTI" | (string & {});
export const Directionality = /*@__PURE__*/ S.String;

export interface TerminologyProperties {
  Name?: string;
  Description?: string;
  Arn?: string;
  SourceLanguageCode?: string;
  TargetLanguageCodes?: string[];
  EncryptionKey?: EncryptionKey;
  SizeBytes?: number;
  TermCount?: number;
  CreatedAt?: Date;
  LastUpdatedAt?: Date;
  Directionality?: Directionality;
  Message?: string;
  SkippedTermCount?: number;
  Format?: TerminologyDataFormat;
}
export const TerminologyProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Description: S.optional(S.String),
    Arn: S.optional(S.String),
    SourceLanguageCode: S.optional(S.String),
    TargetLanguageCodes: S.optional(LanguageCodeStringList),
    EncryptionKey: S.optional(EncryptionKey),
    SizeBytes: S.optional(S.Number),
    TermCount: S.optional(S.Number),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Directionality: S.optional(Directionality),
    Message: S.optional(S.String),
    SkippedTermCount: S.optional(S.Number),
    Format: S.optional(TerminologyDataFormat),
  }),
).annotate({
  identifier: "TerminologyProperties",
}) as any as S.Schema<TerminologyProperties>;
export interface TerminologyDataLocation {
  RepositoryType: string;
  Location: string;
}
export const TerminologyDataLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RepositoryType: S.String, Location: S.String }),
).annotate({
  identifier: "TerminologyDataLocation",
}) as any as S.Schema<TerminologyDataLocation>;
export interface GetTerminologyResponse {
  TerminologyProperties?: TerminologyProperties;
  TerminologyDataLocation?: TerminologyDataLocation;
  AuxiliaryDataLocation?: TerminologyDataLocation;
}
export const GetTerminologyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TerminologyProperties: S.optional(TerminologyProperties),
    TerminologyDataLocation: S.optional(TerminologyDataLocation),
    AuxiliaryDataLocation: S.optional(TerminologyDataLocation),
  }),
).annotate({
  identifier: "GetTerminologyResponse",
}) as any as S.Schema<GetTerminologyResponse>;
export type MergeStrategy = "OVERWRITE" | (string & {});
export const MergeStrategy = /*@__PURE__*/ S.String;

export type TerminologyFile = Uint8Array | redacted.Redacted<Uint8Array>;
export interface TerminologyData {
  File: Uint8Array | redacted.Redacted<Uint8Array>;
  Format: TerminologyDataFormat;
  Directionality?: Directionality;
}
export const TerminologyData = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    File: SensitiveBlob,
    Format: TerminologyDataFormat,
    Directionality: S.optional(Directionality),
  }),
).annotate({
  identifier: "TerminologyData",
}) as any as S.Schema<TerminologyData>;
export interface ImportTerminologyRequest {
  Name: string;
  MergeStrategy: MergeStrategy;
  Description?: string;
  TerminologyData: TerminologyData;
  EncryptionKey?: EncryptionKey;
  Tags?: Tag[];
}
export const ImportTerminologyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    MergeStrategy: MergeStrategy,
    Description: S.optional(S.String),
    TerminologyData: TerminologyData,
    EncryptionKey: S.optional(EncryptionKey),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ImportTerminologyRequest",
}) as any as S.Schema<ImportTerminologyRequest>;
export interface ImportTerminologyResponse {
  TerminologyProperties?: TerminologyProperties;
  AuxiliaryDataLocation?: TerminologyDataLocation;
}
export const ImportTerminologyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TerminologyProperties: S.optional(TerminologyProperties),
    AuxiliaryDataLocation: S.optional(TerminologyDataLocation),
  }),
).annotate({
  identifier: "ImportTerminologyResponse",
}) as any as S.Schema<ImportTerminologyResponse>;
export type DisplayLanguageCode =
  | "de"
  | "en"
  | "es"
  | "fr"
  | "it"
  | "ja"
  | "ko"
  | "pt"
  | "zh"
  | "zh-TW"
  | (string & {});
export const DisplayLanguageCode = /*@__PURE__*/ S.String;

export type NextToken = string;
export type MaxResultsInteger = number;
export interface ListLanguagesRequest {
  DisplayLanguageCode?: DisplayLanguageCode;
  NextToken?: string;
  MaxResults?: number;
}
export const ListLanguagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DisplayLanguageCode: S.optional(DisplayLanguageCode),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListLanguagesRequest",
}) as any as S.Schema<ListLanguagesRequest>;
export type LocalizedNameString = string;
export interface Language {
  LanguageName: string;
  LanguageCode: string;
}
export const Language = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LanguageName: S.String, LanguageCode: S.String }),
).annotate({ identifier: "Language" }) as any as S.Schema<Language>;
export type LanguagesList = Language[];
export const LanguagesList = /*@__PURE__*/ S.Array(Language);
export interface ListLanguagesResponse {
  Languages?: Language[];
  DisplayLanguageCode?: DisplayLanguageCode;
  NextToken?: string;
}
export const ListLanguagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Languages: S.optional(LanguagesList),
    DisplayLanguageCode: S.optional(DisplayLanguageCode),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLanguagesResponse",
}) as any as S.Schema<ListLanguagesResponse>;
export interface ListParallelDataRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListParallelDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListParallelDataRequest",
}) as any as S.Schema<ListParallelDataRequest>;
export type ParallelDataPropertiesList = ParallelDataProperties[];
export const ParallelDataPropertiesList = /*@__PURE__*/ S.Array(
  ParallelDataProperties,
);
export interface ListParallelDataResponse {
  ParallelDataPropertiesList?: ParallelDataProperties[];
  NextToken?: string;
}
export const ListParallelDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ParallelDataPropertiesList: S.optional(ParallelDataPropertiesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListParallelDataResponse",
}) as any as S.Schema<ListParallelDataResponse>;
export type ResourceArn = string;
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
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListTerminologiesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListTerminologiesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTerminologiesRequest",
}) as any as S.Schema<ListTerminologiesRequest>;
export type TerminologyPropertiesList = TerminologyProperties[];
export const TerminologyPropertiesList = /*@__PURE__*/ S.Array(
  TerminologyProperties,
);
export interface ListTerminologiesResponse {
  TerminologyPropertiesList?: TerminologyProperties[];
  NextToken?: string;
}
export const ListTerminologiesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TerminologyPropertiesList: S.optional(TerminologyPropertiesList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTerminologiesResponse",
}) as any as S.Schema<ListTerminologiesResponse>;
export interface TextTranslationJobFilter {
  JobName?: string;
  JobStatus?: JobStatus;
  SubmittedBeforeTime?: Date;
  SubmittedAfterTime?: Date;
}
export const TextTranslationJobFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    JobStatus: S.optional(JobStatus),
    SubmittedBeforeTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SubmittedAfterTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "TextTranslationJobFilter",
}) as any as S.Schema<TextTranslationJobFilter>;
export interface ListTextTranslationJobsRequest {
  Filter?: TextTranslationJobFilter;
  NextToken?: string;
  MaxResults?: number;
}
export const ListTextTranslationJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filter: S.optional(TextTranslationJobFilter),
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTextTranslationJobsRequest",
}) as any as S.Schema<ListTextTranslationJobsRequest>;
export type TextTranslationJobPropertiesList = TextTranslationJobProperties[];
export const TextTranslationJobPropertiesList = /*@__PURE__*/ S.Array(
  TextTranslationJobProperties,
);
export interface ListTextTranslationJobsResponse {
  TextTranslationJobPropertiesList?: TextTranslationJobProperties[];
  NextToken?: string;
}
export const ListTextTranslationJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TextTranslationJobPropertiesList: S.optional(
      TextTranslationJobPropertiesList,
    ),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTextTranslationJobsResponse",
}) as any as S.Schema<ListTextTranslationJobsResponse>;
export interface StartTextTranslationJobRequest {
  JobName?: string;
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
  DataAccessRoleArn: string;
  SourceLanguageCode: string;
  TargetLanguageCodes: string[];
  TerminologyNames?: string[];
  ParallelDataNames?: string[];
  ClientToken: string;
  Settings?: TranslationSettings;
}
export const StartTextTranslationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(S.String),
    InputDataConfig: InputDataConfig,
    OutputDataConfig: OutputDataConfig,
    DataAccessRoleArn: S.String,
    SourceLanguageCode: S.String,
    TargetLanguageCodes: TargetLanguageCodeStringList,
    TerminologyNames: S.optional(ResourceNameList),
    ParallelDataNames: S.optional(ResourceNameList),
    ClientToken: S.String.pipe(T.IdempotencyToken()),
    Settings: S.optional(TranslationSettings),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartTextTranslationJobRequest",
}) as any as S.Schema<StartTextTranslationJobRequest>;
export interface StartTextTranslationJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export const StartTextTranslationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String), JobStatus: S.optional(JobStatus) }),
).annotate({
  identifier: "StartTextTranslationJobResponse",
}) as any as S.Schema<StartTextTranslationJobResponse>;
export interface StopTextTranslationJobRequest {
  JobId: string;
}
export const StopTextTranslationJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StopTextTranslationJobRequest",
}) as any as S.Schema<StopTextTranslationJobRequest>;
export interface StopTextTranslationJobResponse {
  JobId?: string;
  JobStatus?: JobStatus;
}
export const StopTextTranslationJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String), JobStatus: S.optional(JobStatus) }),
).annotate({
  identifier: "StopTextTranslationJobResponse",
}) as any as S.Schema<StopTextTranslationJobResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
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
export type DocumentContent = Uint8Array | redacted.Redacted<Uint8Array>;
export interface Document {
  Content: Uint8Array | redacted.Redacted<Uint8Array>;
  ContentType: string;
}
export const Document = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Content: SensitiveBlob, ContentType: S.String }),
).annotate({ identifier: "Document" }) as any as S.Schema<Document>;
export interface TranslateDocumentRequest {
  Document: Document;
  TerminologyNames?: string[];
  SourceLanguageCode: string;
  TargetLanguageCode: string;
  Settings?: TranslationSettings;
}
export const TranslateDocumentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Document: Document,
    TerminologyNames: S.optional(ResourceNameList),
    SourceLanguageCode: S.String,
    TargetLanguageCode: S.String,
    Settings: S.optional(TranslationSettings),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TranslateDocumentRequest",
}) as any as S.Schema<TranslateDocumentRequest>;
export type TranslatedDocumentContent =
  | Uint8Array
  | redacted.Redacted<Uint8Array>;
export interface TranslatedDocument {
  Content: Uint8Array | redacted.Redacted<Uint8Array>;
}
export const TranslatedDocument = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Content: SensitiveBlob }),
).annotate({
  identifier: "TranslatedDocument",
}) as any as S.Schema<TranslatedDocument>;
export interface Term {
  SourceText?: string;
  TargetText?: string;
}
export const Term = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceText: S.optional(S.String),
    TargetText: S.optional(S.String),
  }),
).annotate({ identifier: "Term" }) as any as S.Schema<Term>;
export type TermList = Term[];
export const TermList = /*@__PURE__*/ S.Array(Term);
export interface AppliedTerminology {
  Name?: string;
  Terms?: Term[];
}
export const AppliedTerminology = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Terms: S.optional(TermList) }),
).annotate({
  identifier: "AppliedTerminology",
}) as any as S.Schema<AppliedTerminology>;
export type AppliedTerminologyList = AppliedTerminology[];
export const AppliedTerminologyList = /*@__PURE__*/ S.Array(AppliedTerminology);
export interface TranslateDocumentResponse {
  TranslatedDocument: TranslatedDocument;
  SourceLanguageCode: string;
  TargetLanguageCode: string;
  AppliedTerminologies?: AppliedTerminology[];
  AppliedSettings?: TranslationSettings;
}
export const TranslateDocumentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TranslatedDocument: TranslatedDocument,
    SourceLanguageCode: S.String,
    TargetLanguageCode: S.String,
    AppliedTerminologies: S.optional(AppliedTerminologyList),
    AppliedSettings: S.optional(TranslationSettings),
  }),
).annotate({
  identifier: "TranslateDocumentResponse",
}) as any as S.Schema<TranslateDocumentResponse>;
export type BoundedLengthString = string;
export interface TranslateTextRequest {
  Text: string;
  TerminologyNames?: string[];
  SourceLanguageCode: string;
  TargetLanguageCode: string;
  Settings?: TranslationSettings;
}
export const TranslateTextRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Text: S.String,
    TerminologyNames: S.optional(ResourceNameList),
    SourceLanguageCode: S.String,
    TargetLanguageCode: S.String,
    Settings: S.optional(TranslationSettings),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TranslateTextRequest",
}) as any as S.Schema<TranslateTextRequest>;
export type TranslatedTextString = string;
export interface TranslateTextResponse {
  TranslatedText: string;
  SourceLanguageCode: string;
  TargetLanguageCode: string;
  AppliedTerminologies?: AppliedTerminology[];
  AppliedSettings?: TranslationSettings;
}
export const TranslateTextResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TranslatedText: S.String,
    SourceLanguageCode: S.String,
    TargetLanguageCode: S.String,
    AppliedTerminologies: S.optional(AppliedTerminologyList),
    AppliedSettings: S.optional(TranslationSettings),
  }),
).annotate({
  identifier: "TranslateTextResponse",
}) as any as S.Schema<TranslateTextResponse>;
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
export interface UntagResourceResponse {}
export const UntagResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateParallelDataRequest {
  Name: string;
  Description?: string;
  ParallelDataConfig: ParallelDataConfig;
  ClientToken: string;
}
export const UpdateParallelDataRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String,
    Description: S.optional(S.String),
    ParallelDataConfig: ParallelDataConfig,
    ClientToken: S.String.pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateParallelDataRequest",
}) as any as S.Schema<UpdateParallelDataRequest>;
export interface UpdateParallelDataResponse {
  Name?: string;
  Status?: ParallelDataStatus;
  LatestUpdateAttemptStatus?: ParallelDataStatus;
  LatestUpdateAttemptAt?: Date;
}
export const UpdateParallelDataResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    Status: S.optional(ParallelDataStatus),
    LatestUpdateAttemptStatus: S.optional(ParallelDataStatus),
    LatestUpdateAttemptAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
  }),
).annotate({
  identifier: "UpdateParallelDataResponse",
}) as any as S.Schema<UpdateParallelDataResponse>;
export type CreateParallelDataError =
  | ConcurrentModificationException
  | ConflictException
  | InternalServerException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates a parallel data resource in Amazon Translate by importing an input file from
 * Amazon S3. Parallel data files contain examples that show how you want segments of text to be
 * translated. By adding parallel data, you can influence the style, tone, and word choice in
 * your translation output.
 */
export const createParallelData: API.OperationMethod<
  CreateParallelDataRequest,
  CreateParallelDataResponse,
  CreateParallelDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateParallelDataRequest,
  output: CreateParallelDataResponse,
  errors: [
    ConcurrentModificationException,
    ConflictException,
    InternalServerException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateParallelData",
}));

export type DeleteParallelDataError =
  | ConcurrentModificationException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a parallel data resource in Amazon Translate.
 */
export const deleteParallelData: API.OperationMethod<
  DeleteParallelDataRequest,
  DeleteParallelDataResponse,
  DeleteParallelDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteParallelDataRequest,
  output: DeleteParallelDataResponse,
  errors: [
    ConcurrentModificationException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteParallelData",
}));

export type DeleteTerminologyError =
  | InternalServerException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * A synchronous action that deletes a custom terminology.
 */
export const deleteTerminology: API.OperationMethod<
  DeleteTerminologyRequest,
  DeleteTerminologyResponse,
  DeleteTerminologyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTerminologyRequest,
  output: DeleteTerminologyResponse,
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTerminology",
}));

export type DescribeTextTranslationJobError =
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the properties associated with an asynchronous batch translation job including name,
 * ID, status, source and target languages, input/output S3 buckets, and so on.
 */
export const describeTextTranslationJob: API.OperationMethod<
  DescribeTextTranslationJobRequest,
  DescribeTextTranslationJobResponse,
  DescribeTextTranslationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeTextTranslationJobRequest,
  output: DescribeTextTranslationJobResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTextTranslationJob",
}));

export type GetParallelDataError =
  | InternalServerException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides information about a parallel data resource.
 */
export const getParallelData: API.OperationMethod<
  GetParallelDataRequest,
  GetParallelDataResponse,
  GetParallelDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetParallelDataRequest,
  output: GetParallelDataResponse,
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParallelData",
}));

export type GetTerminologyError =
  | InternalServerException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves a custom terminology.
 */
export const getTerminology: API.OperationMethod<
  GetTerminologyRequest,
  GetTerminologyResponse,
  GetTerminologyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetTerminologyRequest,
  output: GetTerminologyResponse,
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTerminology",
}));

export type ImportTerminologyError =
  | ConcurrentModificationException
  | InternalServerException
  | InvalidParameterValueException
  | LimitExceededException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Creates or updates a custom terminology, depending on whether one already exists for the
 * given terminology name. Importing a terminology with the same name as an existing one will
 * merge the terminologies based on the chosen merge strategy. The only supported merge strategy
 * is OVERWRITE, where the imported terminology overwrites the existing terminology of the same
 * name.
 *
 * If you import a terminology that overwrites an existing one, the new terminology takes up
 * to 10 minutes to fully propagate. After that, translations have access to the new
 * terminology.
 */
export const importTerminology: API.OperationMethod<
  ImportTerminologyRequest,
  ImportTerminologyResponse,
  ImportTerminologyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportTerminologyRequest,
  output: ImportTerminologyResponse,
  errors: [
    ConcurrentModificationException,
    InternalServerException,
    InvalidParameterValueException,
    LimitExceededException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportTerminology",
}));

export type ListLanguagesError =
  | InternalServerException
  | InvalidParameterValueException
  | TooManyRequestsException
  | UnsupportedDisplayLanguageCodeException
  | CommonErrors;
/**
 * Provides a list of languages (RFC-5646 codes and names) that Amazon Translate supports.
 */
export const listLanguages: API.PaginatedOperationMethod<
  ListLanguagesRequest,
  ListLanguagesResponse,
  ListLanguagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLanguagesRequest,
  output: ListLanguagesResponse,
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    TooManyRequestsException,
    UnsupportedDisplayLanguageCodeException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLanguages",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListParallelDataError =
  | InternalServerException
  | InvalidParameterValueException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides a list of your parallel data resources in Amazon Translate.
 */
export const listParallelData: API.PaginatedOperationMethod<
  ListParallelDataRequest,
  ListParallelDataResponse,
  ListParallelDataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListParallelDataRequest,
  output: ListParallelDataResponse,
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListParallelData",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists all tags associated with a given Amazon Translate resource.
 * For more information, see
 * Tagging your resources.
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
    InvalidParameterValueException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTerminologiesError =
  | InternalServerException
  | InvalidParameterValueException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Provides a list of custom terminologies associated with your account.
 */
export const listTerminologies: API.PaginatedOperationMethod<
  ListTerminologiesRequest,
  ListTerminologiesResponse,
  ListTerminologiesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTerminologiesRequest,
  output: ListTerminologiesResponse,
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTerminologies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTextTranslationJobsError =
  | InternalServerException
  | InvalidFilterException
  | InvalidRequestException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets a list of the batch translation jobs that you have submitted.
 */
export const listTextTranslationJobs: API.PaginatedOperationMethod<
  ListTextTranslationJobsRequest,
  ListTextTranslationJobsResponse,
  ListTextTranslationJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListTextTranslationJobsRequest,
  output: ListTextTranslationJobsResponse,
  errors: [
    InternalServerException,
    InvalidFilterException,
    InvalidRequestException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTextTranslationJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartTextTranslationJobError =
  | InternalServerException
  | InvalidParameterValueException
  | InvalidRequestException
  | ResourceNotFoundException
  | TooManyRequestsException
  | UnsupportedLanguagePairException
  | CommonErrors;
/**
 * Starts an asynchronous batch translation job. Use batch translation jobs to
 * translate large volumes of text across multiple documents at once.
 * For batch translation, you can input documents with different source languages (specify `auto`
 * as the source language). You can specify one
 * or more target languages. Batch translation translates each input document into each of the target languages.
 * For more information, see
 * Asynchronous batch processing.
 *
 * Batch translation jobs can be described with the DescribeTextTranslationJob operation, listed with the ListTextTranslationJobs operation, and stopped with the StopTextTranslationJob operation.
 */
export const startTextTranslationJob: API.OperationMethod<
  StartTextTranslationJobRequest,
  StartTextTranslationJobResponse,
  StartTextTranslationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartTextTranslationJobRequest,
  output: StartTextTranslationJobResponse,
  errors: [
    InternalServerException,
    InvalidParameterValueException,
    InvalidRequestException,
    ResourceNotFoundException,
    TooManyRequestsException,
    UnsupportedLanguagePairException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTextTranslationJob",
}));

export type StopTextTranslationJobError =
  | InternalServerException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops an asynchronous batch translation job that is in progress.
 *
 * If the job's state is `IN_PROGRESS`, the job will be marked for termination and
 * put into the `STOP_REQUESTED` state. If the job completes before it can be stopped,
 * it is put into the `COMPLETED` state. Otherwise, the job is put into the
 * `STOPPED` state.
 *
 * Asynchronous batch translation jobs are started with the StartTextTranslationJob operation. You can use the DescribeTextTranslationJob or ListTextTranslationJobs
 * operations to get a batch translation job's `JobId`.
 */
export const stopTextTranslationJob: API.OperationMethod<
  StopTextTranslationJobRequest,
  StopTextTranslationJobResponse,
  StopTextTranslationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopTextTranslationJobRequest,
  output: StopTextTranslationJobResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTextTranslationJob",
}));

export type TagResourceError =
  | ConcurrentModificationException
  | InternalServerException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Associates a specific tag with a resource. A tag is a key-value pair
 * that adds as a metadata to a resource.
 * For more information, see
 * Tagging your resources.
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
    ConcurrentModificationException,
    InternalServerException,
    InvalidParameterValueException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TranslateDocumentError =
  | InternalServerException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnsupportedLanguagePairException
  | CommonErrors;
/**
 * Translates the input document from the source language to the target language.
 * This synchronous operation supports text, HTML, or Word documents as the input document.
 *
 * `TranslateDocument` supports translations from English to any supported language,
 * and from any supported language to English. Therefore, specify either the source language code
 * or the target language code as “en” (English).
 *
 * If you set the `Formality` parameter, the request will fail if the target language does
 * not support formality. For a list of target languages that support formality, see
 * Setting formality.
 */
export const translateDocument: API.OperationMethod<
  TranslateDocumentRequest,
  TranslateDocumentResponse,
  TranslateDocumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TranslateDocumentRequest,
  output: TranslateDocumentResponse,
  errors: [
    InternalServerException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnsupportedLanguagePairException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TranslateDocument",
}));

export type TranslateTextError =
  | DetectedLanguageLowConfidenceException
  | InternalServerException
  | InvalidRequestException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | TextSizeLimitExceededException
  | TooManyRequestsException
  | UnsupportedLanguagePairException
  | CommonErrors;
/**
 * Translates input text from the source language to the target language. For a list of
 * available languages and language codes, see Supported languages.
 */
export const translateText: API.OperationMethod<
  TranslateTextRequest,
  TranslateTextResponse,
  TranslateTextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TranslateTextRequest,
  output: TranslateTextResponse,
  errors: [
    DetectedLanguageLowConfidenceException,
    InternalServerException,
    InvalidRequestException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TextSizeLimitExceededException,
    TooManyRequestsException,
    UnsupportedLanguagePairException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TranslateText",
}));

export type UntagResourceError =
  | ConcurrentModificationException
  | InternalServerException
  | InvalidParameterValueException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes a specific tag associated with an Amazon Translate resource.
 * For more information, see
 * Tagging your resources.
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
    ConcurrentModificationException,
    InternalServerException,
    InvalidParameterValueException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateParallelDataError =
  | ConcurrentModificationException
  | ConflictException
  | InternalServerException
  | InvalidParameterValueException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates a previously created parallel data resource by importing a new input file from
 * Amazon S3.
 */
export const updateParallelData: API.OperationMethod<
  UpdateParallelDataRequest,
  UpdateParallelDataResponse,
  UpdateParallelDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateParallelDataRequest,
  output: UpdateParallelDataResponse,
  errors: [
    ConcurrentModificationException,
    ConflictException,
    InternalServerException,
    InvalidParameterValueException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateParallelData",
}));
