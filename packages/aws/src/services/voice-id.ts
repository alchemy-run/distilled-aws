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
const svc = T.AwsApiService({ sdkId: "Voice ID", serviceShapeName: "VoiceID" });
const auth = T.AwsAuthSigv4({ name: "voiceid" });
const ver = T.ServiceVersion("2021-09-27");
const proto = T.AwsProtocolsAwsJson1_0();
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
              `https://voiceid-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://voiceid-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://voiceid.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://voiceid.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ConflictType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ResourceType: S.optional(S.String),
    },
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
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DomainId = string;
export type WatchlistId = string;
export type FraudsterId = string | redacted.Redacted<string>;
export interface AssociateFraudsterRequest {
  DomainId: string;
  WatchlistId: string;
  FraudsterId: string | redacted.Redacted<string>;
}
export const AssociateFraudsterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    WatchlistId: S.String,
    FraudsterId: SensitiveString,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateFraudsterRequest",
}) as any as S.Schema<AssociateFraudsterRequest>;
export type GeneratedFraudsterId = string;
export type ResponseWatchlistIds = string[];
export const ResponseWatchlistIds = /*@__PURE__*/ S.Array(S.String);
export interface Fraudster {
  DomainId?: string;
  GeneratedFraudsterId?: string;
  CreatedAt?: Date;
  WatchlistIds?: string[];
}
export const Fraudster = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.optional(S.String),
    GeneratedFraudsterId: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    WatchlistIds: S.optional(ResponseWatchlistIds),
  }),
).annotate({ identifier: "Fraudster" }) as any as S.Schema<Fraudster>;
export interface AssociateFraudsterResponse {
  Fraudster?: Fraudster;
}
export const AssociateFraudsterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fraudster: S.optional(Fraudster) }),
).annotate({
  identifier: "AssociateFraudsterResponse",
}) as any as S.Schema<AssociateFraudsterResponse>;
export type DomainName = string | redacted.Redacted<string>;
export type Description = string | redacted.Redacted<string>;
export type KmsKeyId = string;
export interface ServerSideEncryptionConfiguration {
  KmsKeyId: string;
}
export const ServerSideEncryptionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KmsKeyId: S.String }),
).annotate({
  identifier: "ServerSideEncryptionConfiguration",
}) as any as S.Schema<ServerSideEncryptionConfiguration>;
export type ClientTokenString = string;
export type TagKey = string | redacted.Redacted<string>;
export type TagValue = string | redacted.Redacted<string>;
export interface Tag {
  Key: string | redacted.Redacted<string>;
  Value: string | redacted.Redacted<string>;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: SensitiveString, Value: SensitiveString }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface CreateDomainRequest {
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration;
  ClientToken?: string;
  Tags?: Tag[];
}
export const CreateDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: SensitiveString,
    Description: S.optional(SensitiveString),
    ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration,
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateDomainRequest",
}) as any as S.Schema<CreateDomainRequest>;
export type Arn = string;
export type DomainStatus = string;
export type ServerSideEncryptionUpdateStatus = string;
export interface ServerSideEncryptionUpdateDetails {
  OldKmsKeyId?: string;
  UpdateStatus?: string;
  Message?: string;
}
export const ServerSideEncryptionUpdateDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OldKmsKeyId: S.optional(S.String),
    UpdateStatus: S.optional(S.String),
    Message: S.optional(S.String),
  }),
).annotate({
  identifier: "ServerSideEncryptionUpdateDetails",
}) as any as S.Schema<ServerSideEncryptionUpdateDetails>;
export interface WatchlistDetails {
  DefaultWatchlistId: string;
}
export const WatchlistDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DefaultWatchlistId: S.String }),
).annotate({
  identifier: "WatchlistDetails",
}) as any as S.Schema<WatchlistDetails>;
export interface Domain {
  DomainId?: string;
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  DomainStatus?: string;
  ServerSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ServerSideEncryptionUpdateDetails?: ServerSideEncryptionUpdateDetails;
  WatchlistDetails?: WatchlistDetails;
}
export const Domain = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    DomainStatus: S.optional(S.String),
    ServerSideEncryptionConfiguration: S.optional(
      ServerSideEncryptionConfiguration,
    ),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ServerSideEncryptionUpdateDetails: S.optional(
      ServerSideEncryptionUpdateDetails,
    ),
    WatchlistDetails: S.optional(WatchlistDetails),
  }),
).annotate({ identifier: "Domain" }) as any as S.Schema<Domain>;
export interface CreateDomainResponse {
  Domain?: Domain;
}
export const CreateDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Domain: S.optional(Domain) }),
).annotate({
  identifier: "CreateDomainResponse",
}) as any as S.Schema<CreateDomainResponse>;
export type WatchlistName = string | redacted.Redacted<string>;
export type WatchlistDescription = string | redacted.Redacted<string>;
export interface CreateWatchlistRequest {
  DomainId: string;
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ClientToken?: string;
}
export const CreateWatchlistRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    Name: SensitiveString,
    Description: S.optional(SensitiveString),
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateWatchlistRequest",
}) as any as S.Schema<CreateWatchlistRequest>;
export interface Watchlist {
  DomainId?: string;
  WatchlistId?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  DefaultWatchlist?: boolean;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const Watchlist = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.optional(S.String),
    WatchlistId: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    DefaultWatchlist: S.optional(S.Boolean),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Watchlist" }) as any as S.Schema<Watchlist>;
export interface CreateWatchlistResponse {
  Watchlist?: Watchlist;
}
export const CreateWatchlistResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Watchlist: S.optional(Watchlist) }),
).annotate({
  identifier: "CreateWatchlistResponse",
}) as any as S.Schema<CreateWatchlistResponse>;
export interface DeleteDomainRequest {
  DomainId: string;
}
export const DeleteDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteDomainRequest",
}) as any as S.Schema<DeleteDomainRequest>;
export interface DeleteDomainResponse {}
export const DeleteDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteDomainResponse",
}) as any as S.Schema<DeleteDomainResponse>;
export interface DeleteFraudsterRequest {
  DomainId: string;
  FraudsterId: string | redacted.Redacted<string>;
}
export const DeleteFraudsterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainId: S.String, FraudsterId: SensitiveString }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFraudsterRequest",
}) as any as S.Schema<DeleteFraudsterRequest>;
export interface DeleteFraudsterResponse {}
export const DeleteFraudsterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFraudsterResponse",
}) as any as S.Schema<DeleteFraudsterResponse>;
export type SpeakerId = string | redacted.Redacted<string>;
export interface DeleteSpeakerRequest {
  DomainId: string;
  SpeakerId: string | redacted.Redacted<string>;
}
export const DeleteSpeakerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainId: S.String, SpeakerId: SensitiveString }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteSpeakerRequest",
}) as any as S.Schema<DeleteSpeakerRequest>;
export interface DeleteSpeakerResponse {}
export const DeleteSpeakerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSpeakerResponse",
}) as any as S.Schema<DeleteSpeakerResponse>;
export interface DeleteWatchlistRequest {
  DomainId: string;
  WatchlistId: string;
}
export const DeleteWatchlistRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainId: S.String, WatchlistId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteWatchlistRequest",
}) as any as S.Schema<DeleteWatchlistRequest>;
export interface DeleteWatchlistResponse {}
export const DeleteWatchlistResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteWatchlistResponse",
}) as any as S.Schema<DeleteWatchlistResponse>;
export interface DescribeDomainRequest {
  DomainId: string;
}
export const DescribeDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeDomainRequest",
}) as any as S.Schema<DescribeDomainRequest>;
export interface DescribeDomainResponse {
  Domain?: Domain;
}
export const DescribeDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Domain: S.optional(Domain) }),
).annotate({
  identifier: "DescribeDomainResponse",
}) as any as S.Schema<DescribeDomainResponse>;
export interface DescribeFraudsterRequest {
  DomainId: string;
  FraudsterId: string | redacted.Redacted<string>;
}
export const DescribeFraudsterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainId: S.String, FraudsterId: SensitiveString }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeFraudsterRequest",
}) as any as S.Schema<DescribeFraudsterRequest>;
export interface DescribeFraudsterResponse {
  Fraudster?: Fraudster;
}
export const DescribeFraudsterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fraudster: S.optional(Fraudster) }),
).annotate({
  identifier: "DescribeFraudsterResponse",
}) as any as S.Schema<DescribeFraudsterResponse>;
export type JobId = string;
export interface DescribeFraudsterRegistrationJobRequest {
  DomainId: string;
  JobId: string;
}
export const DescribeFraudsterRegistrationJobRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ DomainId: S.String, JobId: S.String }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "DescribeFraudsterRegistrationJobRequest",
}) as any as S.Schema<DescribeFraudsterRegistrationJobRequest>;
export type JobName = string | redacted.Redacted<string>;
export type FraudsterRegistrationJobStatus = string;
export type IamRoleArn = string;
export type DuplicateRegistrationAction = string;
export type Score = number;
export type RegistrationConfigWatchlistIds = string[];
export const RegistrationConfigWatchlistIds = /*@__PURE__*/ S.Array(S.String);
export interface RegistrationConfig {
  DuplicateRegistrationAction?: string;
  FraudsterSimilarityThreshold?: number;
  WatchlistIds?: string[];
}
export const RegistrationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DuplicateRegistrationAction: S.optional(S.String),
    FraudsterSimilarityThreshold: S.optional(S.Number),
    WatchlistIds: S.optional(RegistrationConfigWatchlistIds),
  }),
).annotate({
  identifier: "RegistrationConfig",
}) as any as S.Schema<RegistrationConfig>;
export type S3Uri = string;
export interface InputDataConfig {
  S3Uri: string;
}
export const InputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Uri: S.String }),
).annotate({
  identifier: "InputDataConfig",
}) as any as S.Schema<InputDataConfig>;
export interface OutputDataConfig {
  S3Uri: string;
  KmsKeyId?: string;
}
export const OutputDataConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Uri: S.String, KmsKeyId: S.optional(S.String) }),
).annotate({
  identifier: "OutputDataConfig",
}) as any as S.Schema<OutputDataConfig>;
export interface FailureDetails {
  StatusCode?: number;
  Message?: string;
}
export const FailureDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StatusCode: S.optional(S.Number), Message: S.optional(S.String) }),
).annotate({ identifier: "FailureDetails" }) as any as S.Schema<FailureDetails>;
export interface JobProgress {
  PercentComplete?: number;
}
export const JobProgress = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PercentComplete: S.optional(S.Number) }),
).annotate({ identifier: "JobProgress" }) as any as S.Schema<JobProgress>;
export interface FraudsterRegistrationJob {
  JobName?: string | redacted.Redacted<string>;
  JobId?: string;
  JobStatus?: string;
  DomainId?: string;
  DataAccessRoleArn?: string;
  RegistrationConfig?: RegistrationConfig;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  CreatedAt?: Date;
  EndedAt?: Date;
  FailureDetails?: FailureDetails;
  JobProgress?: JobProgress;
}
export const FraudsterRegistrationJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(SensitiveString),
    JobId: S.optional(S.String),
    JobStatus: S.optional(S.String),
    DomainId: S.optional(S.String),
    DataAccessRoleArn: S.optional(S.String),
    RegistrationConfig: S.optional(RegistrationConfig),
    InputDataConfig: S.optional(InputDataConfig),
    OutputDataConfig: S.optional(OutputDataConfig),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FailureDetails: S.optional(FailureDetails),
    JobProgress: S.optional(JobProgress),
  }),
).annotate({
  identifier: "FraudsterRegistrationJob",
}) as any as S.Schema<FraudsterRegistrationJob>;
export interface DescribeFraudsterRegistrationJobResponse {
  Job?: FraudsterRegistrationJob;
}
export const DescribeFraudsterRegistrationJobResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Job: S.optional(FraudsterRegistrationJob) }),
).annotate({
  identifier: "DescribeFraudsterRegistrationJobResponse",
}) as any as S.Schema<DescribeFraudsterRegistrationJobResponse>;
export interface DescribeSpeakerRequest {
  DomainId: string;
  SpeakerId: string | redacted.Redacted<string>;
}
export const DescribeSpeakerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainId: S.String, SpeakerId: SensitiveString }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeSpeakerRequest",
}) as any as S.Schema<DescribeSpeakerRequest>;
export type CustomerSpeakerId = string | redacted.Redacted<string>;
export type GeneratedSpeakerId = string;
export type SpeakerStatus = string;
export interface Speaker {
  DomainId?: string;
  CustomerSpeakerId?: string | redacted.Redacted<string>;
  GeneratedSpeakerId?: string;
  Status?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  LastAccessedAt?: Date;
}
export const Speaker = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.optional(S.String),
    CustomerSpeakerId: S.optional(SensitiveString),
    GeneratedSpeakerId: S.optional(S.String),
    Status: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastAccessedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "Speaker" }) as any as S.Schema<Speaker>;
export interface DescribeSpeakerResponse {
  Speaker?: Speaker;
}
export const DescribeSpeakerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Speaker: S.optional(Speaker) }),
).annotate({
  identifier: "DescribeSpeakerResponse",
}) as any as S.Schema<DescribeSpeakerResponse>;
export interface DescribeSpeakerEnrollmentJobRequest {
  DomainId: string;
  JobId: string;
}
export const DescribeSpeakerEnrollmentJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainId: S.String, JobId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeSpeakerEnrollmentJobRequest",
}) as any as S.Schema<DescribeSpeakerEnrollmentJobRequest>;
export type SpeakerEnrollmentJobStatus = string;
export type ExistingEnrollmentAction = string;
export type FraudDetectionAction = string;
export type EnrollmentJobFraudDetectionConfigWatchlistIds = string[];
export const EnrollmentJobFraudDetectionConfigWatchlistIds =
  /*@__PURE__*/ S.Array(S.String);
export interface EnrollmentJobFraudDetectionConfig {
  FraudDetectionAction?: string;
  RiskThreshold?: number;
  WatchlistIds?: string[];
}
export const EnrollmentJobFraudDetectionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FraudDetectionAction: S.optional(S.String),
    RiskThreshold: S.optional(S.Number),
    WatchlistIds: S.optional(EnrollmentJobFraudDetectionConfigWatchlistIds),
  }),
).annotate({
  identifier: "EnrollmentJobFraudDetectionConfig",
}) as any as S.Schema<EnrollmentJobFraudDetectionConfig>;
export interface EnrollmentConfig {
  ExistingEnrollmentAction?: string;
  FraudDetectionConfig?: EnrollmentJobFraudDetectionConfig;
}
export const EnrollmentConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExistingEnrollmentAction: S.optional(S.String),
    FraudDetectionConfig: S.optional(EnrollmentJobFraudDetectionConfig),
  }),
).annotate({
  identifier: "EnrollmentConfig",
}) as any as S.Schema<EnrollmentConfig>;
export interface SpeakerEnrollmentJob {
  JobName?: string | redacted.Redacted<string>;
  JobId?: string;
  JobStatus?: string;
  DomainId?: string;
  DataAccessRoleArn?: string;
  EnrollmentConfig?: EnrollmentConfig;
  InputDataConfig?: InputDataConfig;
  OutputDataConfig?: OutputDataConfig;
  CreatedAt?: Date;
  EndedAt?: Date;
  FailureDetails?: FailureDetails;
  JobProgress?: JobProgress;
}
export const SpeakerEnrollmentJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(SensitiveString),
    JobId: S.optional(S.String),
    JobStatus: S.optional(S.String),
    DomainId: S.optional(S.String),
    DataAccessRoleArn: S.optional(S.String),
    EnrollmentConfig: S.optional(EnrollmentConfig),
    InputDataConfig: S.optional(InputDataConfig),
    OutputDataConfig: S.optional(OutputDataConfig),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FailureDetails: S.optional(FailureDetails),
    JobProgress: S.optional(JobProgress),
  }),
).annotate({
  identifier: "SpeakerEnrollmentJob",
}) as any as S.Schema<SpeakerEnrollmentJob>;
export interface DescribeSpeakerEnrollmentJobResponse {
  Job?: SpeakerEnrollmentJob;
}
export const DescribeSpeakerEnrollmentJobResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Job: S.optional(SpeakerEnrollmentJob) }),
).annotate({
  identifier: "DescribeSpeakerEnrollmentJobResponse",
}) as any as S.Schema<DescribeSpeakerEnrollmentJobResponse>;
export interface DescribeWatchlistRequest {
  DomainId: string;
  WatchlistId: string;
}
export const DescribeWatchlistRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainId: S.String, WatchlistId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DescribeWatchlistRequest",
}) as any as S.Schema<DescribeWatchlistRequest>;
export interface DescribeWatchlistResponse {
  Watchlist?: Watchlist;
}
export const DescribeWatchlistResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Watchlist: S.optional(Watchlist) }),
).annotate({
  identifier: "DescribeWatchlistResponse",
}) as any as S.Schema<DescribeWatchlistResponse>;
export interface DisassociateFraudsterRequest {
  DomainId: string;
  WatchlistId: string;
  FraudsterId: string | redacted.Redacted<string>;
}
export const DisassociateFraudsterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    WatchlistId: S.String,
    FraudsterId: SensitiveString,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateFraudsterRequest",
}) as any as S.Schema<DisassociateFraudsterRequest>;
export interface DisassociateFraudsterResponse {
  Fraudster?: Fraudster;
}
export const DisassociateFraudsterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Fraudster: S.optional(Fraudster) }),
).annotate({
  identifier: "DisassociateFraudsterResponse",
}) as any as S.Schema<DisassociateFraudsterResponse>;
export type SessionNameOrId = string;
export interface EvaluateSessionRequest {
  DomainId: string;
  SessionNameOrId: string;
}
export const EvaluateSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainId: S.String, SessionNameOrId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "EvaluateSessionRequest",
}) as any as S.Schema<EvaluateSessionRequest>;
export type SessionId = string;
export type SessionName = string;
export type StreamingStatus = string;
export type UniqueIdLarge = string;
export type AuthenticationDecision = string;
export interface AuthenticationConfiguration {
  AcceptanceThreshold: number;
}
export const AuthenticationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AcceptanceThreshold: S.Number }),
).annotate({
  identifier: "AuthenticationConfiguration",
}) as any as S.Schema<AuthenticationConfiguration>;
export interface AuthenticationResult {
  AuthenticationResultId?: string;
  AudioAggregationStartedAt?: Date;
  AudioAggregationEndedAt?: Date;
  CustomerSpeakerId?: string | redacted.Redacted<string>;
  GeneratedSpeakerId?: string;
  Decision?: string;
  Score?: number;
  Configuration?: AuthenticationConfiguration;
}
export const AuthenticationResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthenticationResultId: S.optional(S.String),
    AudioAggregationStartedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AudioAggregationEndedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    CustomerSpeakerId: S.optional(SensitiveString),
    GeneratedSpeakerId: S.optional(S.String),
    Decision: S.optional(S.String),
    Score: S.optional(S.Number),
    Configuration: S.optional(AuthenticationConfiguration),
  }),
).annotate({
  identifier: "AuthenticationResult",
}) as any as S.Schema<AuthenticationResult>;
export interface FraudDetectionConfiguration {
  RiskThreshold?: number;
  WatchlistId?: string;
}
export const FraudDetectionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RiskThreshold: S.optional(S.Number),
    WatchlistId: S.optional(S.String),
  }),
).annotate({
  identifier: "FraudDetectionConfiguration",
}) as any as S.Schema<FraudDetectionConfiguration>;
export type FraudDetectionDecision = string;
export type FraudDetectionReason = string;
export type FraudDetectionReasons = string[];
export const FraudDetectionReasons = /*@__PURE__*/ S.Array(S.String);
export interface KnownFraudsterRisk {
  RiskScore: number;
  GeneratedFraudsterId?: string;
}
export const KnownFraudsterRisk = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RiskScore: S.Number, GeneratedFraudsterId: S.optional(S.String) }),
).annotate({
  identifier: "KnownFraudsterRisk",
}) as any as S.Schema<KnownFraudsterRisk>;
export interface VoiceSpoofingRisk {
  RiskScore: number;
}
export const VoiceSpoofingRisk = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RiskScore: S.Number }),
).annotate({
  identifier: "VoiceSpoofingRisk",
}) as any as S.Schema<VoiceSpoofingRisk>;
export interface FraudRiskDetails {
  KnownFraudsterRisk: KnownFraudsterRisk;
  VoiceSpoofingRisk: VoiceSpoofingRisk;
}
export const FraudRiskDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KnownFraudsterRisk: KnownFraudsterRisk,
    VoiceSpoofingRisk: VoiceSpoofingRisk,
  }),
).annotate({
  identifier: "FraudRiskDetails",
}) as any as S.Schema<FraudRiskDetails>;
export interface FraudDetectionResult {
  FraudDetectionResultId?: string;
  AudioAggregationStartedAt?: Date;
  AudioAggregationEndedAt?: Date;
  Configuration?: FraudDetectionConfiguration;
  Decision?: string;
  Reasons?: string[];
  RiskDetails?: FraudRiskDetails;
}
export const FraudDetectionResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FraudDetectionResultId: S.optional(S.String),
    AudioAggregationStartedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AudioAggregationEndedAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Configuration: S.optional(FraudDetectionConfiguration),
    Decision: S.optional(S.String),
    Reasons: S.optional(FraudDetectionReasons),
    RiskDetails: S.optional(FraudRiskDetails),
  }),
).annotate({
  identifier: "FraudDetectionResult",
}) as any as S.Schema<FraudDetectionResult>;
export interface EvaluateSessionResponse {
  DomainId?: string;
  SessionId?: string;
  SessionName?: string;
  StreamingStatus?: string;
  AuthenticationResult?: AuthenticationResult;
  FraudDetectionResult?: FraudDetectionResult;
}
export const EvaluateSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.optional(S.String),
    SessionId: S.optional(S.String),
    SessionName: S.optional(S.String),
    StreamingStatus: S.optional(S.String),
    AuthenticationResult: S.optional(AuthenticationResult),
    FraudDetectionResult: S.optional(FraudDetectionResult),
  }),
).annotate({
  identifier: "EvaluateSessionResponse",
}) as any as S.Schema<EvaluateSessionResponse>;
export type MaxResultsForListDomainFe = number;
export type NextToken = string;
export interface ListDomainsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListDomainsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListDomainsRequest",
}) as any as S.Schema<ListDomainsRequest>;
export interface DomainSummary {
  DomainId?: string;
  Arn?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  DomainStatus?: string;
  ServerSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ServerSideEncryptionUpdateDetails?: ServerSideEncryptionUpdateDetails;
  WatchlistDetails?: WatchlistDetails;
}
export const DomainSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    DomainStatus: S.optional(S.String),
    ServerSideEncryptionConfiguration: S.optional(
      ServerSideEncryptionConfiguration,
    ),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ServerSideEncryptionUpdateDetails: S.optional(
      ServerSideEncryptionUpdateDetails,
    ),
    WatchlistDetails: S.optional(WatchlistDetails),
  }),
).annotate({ identifier: "DomainSummary" }) as any as S.Schema<DomainSummary>;
export type DomainSummaries = DomainSummary[];
export const DomainSummaries = /*@__PURE__*/ S.Array(DomainSummary);
export interface ListDomainsResponse {
  DomainSummaries?: DomainSummary[];
  NextToken?: string;
}
export const ListDomainsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainSummaries: S.optional(DomainSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDomainsResponse",
}) as any as S.Schema<ListDomainsResponse>;
export type MaxResultsForList = number;
export interface ListFraudsterRegistrationJobsRequest {
  DomainId: string;
  JobStatus?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListFraudsterRegistrationJobsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      DomainId: S.String,
      JobStatus: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "ListFraudsterRegistrationJobsRequest",
}) as any as S.Schema<ListFraudsterRegistrationJobsRequest>;
export interface FraudsterRegistrationJobSummary {
  JobName?: string | redacted.Redacted<string>;
  JobId?: string;
  JobStatus?: string;
  DomainId?: string;
  CreatedAt?: Date;
  EndedAt?: Date;
  FailureDetails?: FailureDetails;
  JobProgress?: JobProgress;
}
export const FraudsterRegistrationJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(SensitiveString),
    JobId: S.optional(S.String),
    JobStatus: S.optional(S.String),
    DomainId: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FailureDetails: S.optional(FailureDetails),
    JobProgress: S.optional(JobProgress),
  }),
).annotate({
  identifier: "FraudsterRegistrationJobSummary",
}) as any as S.Schema<FraudsterRegistrationJobSummary>;
export type FraudsterRegistrationJobSummaries =
  FraudsterRegistrationJobSummary[];
export const FraudsterRegistrationJobSummaries = /*@__PURE__*/ S.Array(
  FraudsterRegistrationJobSummary,
);
export interface ListFraudsterRegistrationJobsResponse {
  JobSummaries?: FraudsterRegistrationJobSummary[];
  NextToken?: string;
}
export const ListFraudsterRegistrationJobsResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      JobSummaries: S.optional(FraudsterRegistrationJobSummaries),
      NextToken: S.optional(S.String),
    }),
).annotate({
  identifier: "ListFraudsterRegistrationJobsResponse",
}) as any as S.Schema<ListFraudsterRegistrationJobsResponse>;
export interface ListFraudstersRequest {
  DomainId: string;
  WatchlistId?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListFraudstersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    WatchlistId: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFraudstersRequest",
}) as any as S.Schema<ListFraudstersRequest>;
export interface FraudsterSummary {
  DomainId?: string;
  GeneratedFraudsterId?: string;
  CreatedAt?: Date;
  WatchlistIds?: string[];
}
export const FraudsterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.optional(S.String),
    GeneratedFraudsterId: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    WatchlistIds: S.optional(ResponseWatchlistIds),
  }),
).annotate({
  identifier: "FraudsterSummary",
}) as any as S.Schema<FraudsterSummary>;
export type FraudsterSummaries = FraudsterSummary[];
export const FraudsterSummaries = /*@__PURE__*/ S.Array(FraudsterSummary);
export interface ListFraudstersResponse {
  FraudsterSummaries?: FraudsterSummary[];
  NextToken?: string;
}
export const ListFraudstersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FraudsterSummaries: S.optional(FraudsterSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFraudstersResponse",
}) as any as S.Schema<ListFraudstersResponse>;
export interface ListSpeakerEnrollmentJobsRequest {
  DomainId: string;
  JobStatus?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListSpeakerEnrollmentJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    JobStatus: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSpeakerEnrollmentJobsRequest",
}) as any as S.Schema<ListSpeakerEnrollmentJobsRequest>;
export interface SpeakerEnrollmentJobSummary {
  JobName?: string | redacted.Redacted<string>;
  JobId?: string;
  JobStatus?: string;
  DomainId?: string;
  CreatedAt?: Date;
  EndedAt?: Date;
  FailureDetails?: FailureDetails;
  JobProgress?: JobProgress;
}
export const SpeakerEnrollmentJobSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobName: S.optional(SensitiveString),
    JobId: S.optional(S.String),
    JobStatus: S.optional(S.String),
    DomainId: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FailureDetails: S.optional(FailureDetails),
    JobProgress: S.optional(JobProgress),
  }),
).annotate({
  identifier: "SpeakerEnrollmentJobSummary",
}) as any as S.Schema<SpeakerEnrollmentJobSummary>;
export type SpeakerEnrollmentJobSummaries = SpeakerEnrollmentJobSummary[];
export const SpeakerEnrollmentJobSummaries = /*@__PURE__*/ S.Array(
  SpeakerEnrollmentJobSummary,
);
export interface ListSpeakerEnrollmentJobsResponse {
  JobSummaries?: SpeakerEnrollmentJobSummary[];
  NextToken?: string;
}
export const ListSpeakerEnrollmentJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobSummaries: S.optional(SpeakerEnrollmentJobSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSpeakerEnrollmentJobsResponse",
}) as any as S.Schema<ListSpeakerEnrollmentJobsResponse>;
export interface ListSpeakersRequest {
  DomainId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListSpeakersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListSpeakersRequest",
}) as any as S.Schema<ListSpeakersRequest>;
export interface SpeakerSummary {
  DomainId?: string;
  CustomerSpeakerId?: string | redacted.Redacted<string>;
  GeneratedSpeakerId?: string;
  Status?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  LastAccessedAt?: Date;
}
export const SpeakerSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.optional(S.String),
    CustomerSpeakerId: S.optional(SensitiveString),
    GeneratedSpeakerId: S.optional(S.String),
    Status: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastAccessedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({ identifier: "SpeakerSummary" }) as any as S.Schema<SpeakerSummary>;
export type SpeakerSummaries = SpeakerSummary[];
export const SpeakerSummaries = /*@__PURE__*/ S.Array(SpeakerSummary);
export interface ListSpeakersResponse {
  SpeakerSummaries?: SpeakerSummary[];
  NextToken?: string;
}
export const ListSpeakersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SpeakerSummaries: S.optional(SpeakerSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSpeakersResponse",
}) as any as S.Schema<ListSpeakersResponse>;
export type AmazonResourceName = string;
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
export interface ListWatchlistsRequest {
  DomainId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListWatchlistsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListWatchlistsRequest",
}) as any as S.Schema<ListWatchlistsRequest>;
export interface WatchlistSummary {
  DomainId?: string;
  WatchlistId?: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  DefaultWatchlist?: boolean;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export const WatchlistSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.optional(S.String),
    WatchlistId: S.optional(S.String),
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
    DefaultWatchlist: S.optional(S.Boolean),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "WatchlistSummary",
}) as any as S.Schema<WatchlistSummary>;
export type WatchlistSummaries = WatchlistSummary[];
export const WatchlistSummaries = /*@__PURE__*/ S.Array(WatchlistSummary);
export interface ListWatchlistsResponse {
  WatchlistSummaries?: WatchlistSummary[];
  NextToken?: string;
}
export const ListWatchlistsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    WatchlistSummaries: S.optional(WatchlistSummaries),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListWatchlistsResponse",
}) as any as S.Schema<ListWatchlistsResponse>;
export interface OptOutSpeakerRequest {
  DomainId: string;
  SpeakerId: string | redacted.Redacted<string>;
}
export const OptOutSpeakerRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DomainId: S.String, SpeakerId: SensitiveString }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "OptOutSpeakerRequest",
}) as any as S.Schema<OptOutSpeakerRequest>;
export interface OptOutSpeakerResponse {
  Speaker?: Speaker;
}
export const OptOutSpeakerResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Speaker: S.optional(Speaker) }),
).annotate({
  identifier: "OptOutSpeakerResponse",
}) as any as S.Schema<OptOutSpeakerResponse>;
export interface StartFraudsterRegistrationJobRequest {
  ClientToken?: string;
  JobName?: string | redacted.Redacted<string>;
  DomainId: string;
  DataAccessRoleArn: string;
  RegistrationConfig?: RegistrationConfig;
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
}
export const StartFraudsterRegistrationJobRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
      JobName: S.optional(SensitiveString),
      DomainId: S.String,
      DataAccessRoleArn: S.String,
      RegistrationConfig: S.optional(RegistrationConfig),
      InputDataConfig: InputDataConfig,
      OutputDataConfig: OutputDataConfig,
    }).pipe(
      T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
    ),
).annotate({
  identifier: "StartFraudsterRegistrationJobRequest",
}) as any as S.Schema<StartFraudsterRegistrationJobRequest>;
export interface StartFraudsterRegistrationJobResponse {
  Job?: FraudsterRegistrationJob;
}
export const StartFraudsterRegistrationJobResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({ Job: S.optional(FraudsterRegistrationJob) }),
).annotate({
  identifier: "StartFraudsterRegistrationJobResponse",
}) as any as S.Schema<StartFraudsterRegistrationJobResponse>;
export interface StartSpeakerEnrollmentJobRequest {
  ClientToken?: string;
  JobName?: string | redacted.Redacted<string>;
  DomainId: string;
  DataAccessRoleArn: string;
  EnrollmentConfig?: EnrollmentConfig;
  InputDataConfig: InputDataConfig;
  OutputDataConfig: OutputDataConfig;
}
export const StartSpeakerEnrollmentJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    JobName: S.optional(SensitiveString),
    DomainId: S.String,
    DataAccessRoleArn: S.String,
    EnrollmentConfig: S.optional(EnrollmentConfig),
    InputDataConfig: InputDataConfig,
    OutputDataConfig: OutputDataConfig,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "StartSpeakerEnrollmentJobRequest",
}) as any as S.Schema<StartSpeakerEnrollmentJobRequest>;
export interface StartSpeakerEnrollmentJobResponse {
  Job?: SpeakerEnrollmentJob;
}
export const StartSpeakerEnrollmentJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Job: S.optional(SpeakerEnrollmentJob) }),
).annotate({
  identifier: "StartSpeakerEnrollmentJobResponse",
}) as any as S.Schema<StartSpeakerEnrollmentJobResponse>;
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
export type TagKeyList = (string | redacted.Redacted<string>)[];
export const TagKeyList = /*@__PURE__*/ S.Array(SensitiveString);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: (string | redacted.Redacted<string>)[];
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
export interface UpdateDomainRequest {
  DomainId: string;
  Name: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
  ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration;
}
export const UpdateDomainRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    Name: SensitiveString,
    Description: S.optional(SensitiveString),
    ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateDomainRequest",
}) as any as S.Schema<UpdateDomainRequest>;
export interface UpdateDomainResponse {
  Domain?: Domain;
}
export const UpdateDomainResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Domain: S.optional(Domain) }),
).annotate({
  identifier: "UpdateDomainResponse",
}) as any as S.Schema<UpdateDomainResponse>;
export interface UpdateWatchlistRequest {
  DomainId: string;
  WatchlistId: string;
  Name?: string | redacted.Redacted<string>;
  Description?: string | redacted.Redacted<string>;
}
export const UpdateWatchlistRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DomainId: S.String,
    WatchlistId: S.String,
    Name: S.optional(SensitiveString),
    Description: S.optional(SensitiveString),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateWatchlistRequest",
}) as any as S.Schema<UpdateWatchlistRequest>;
export interface UpdateWatchlistResponse {
  Watchlist?: Watchlist;
}
export const UpdateWatchlistResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Watchlist: S.optional(Watchlist) }),
).annotate({
  identifier: "UpdateWatchlistResponse",
}) as any as S.Schema<UpdateWatchlistResponse>;
export type ConflictType = string;
export type ResourceType = string;
export type AssociateFraudsterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates the fraudsters with the watchlist specified in the same domain.
 */
export const associateFraudster: API.OperationMethod<
  AssociateFraudsterRequest,
  AssociateFraudsterResponse,
  AssociateFraudsterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateFraudsterRequest,
  output: AssociateFraudsterResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFraudster",
}));

export type CreateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a domain that contains all Amazon Connect Voice ID data, such as speakers, fraudsters,
 * customer audio, and voiceprints. Every domain is created with a default watchlist that fraudsters can be a part of.
 */
export const createDomain: API.OperationMethod<
  CreateDomainRequest,
  CreateDomainResponse,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateDomainRequest,
  output: CreateDomainResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomain",
}));

export type CreateWatchlistError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a watchlist that fraudsters can be a part of.
 */
export const createWatchlist: API.OperationMethod<
  CreateWatchlistRequest,
  CreateWatchlistResponse,
  CreateWatchlistError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateWatchlistRequest,
  output: CreateWatchlistResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateWatchlist",
}));

export type DeleteDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified domain from Voice ID.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainRequest,
  DeleteDomainResponse,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteDomainRequest,
  output: DeleteDomainResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
}));

export type DeleteFraudsterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified fraudster from Voice ID. This action disassociates the fraudster from any watchlists it is a part of.
 */
export const deleteFraudster: API.OperationMethod<
  DeleteFraudsterRequest,
  DeleteFraudsterResponse,
  DeleteFraudsterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFraudsterRequest,
  output: DeleteFraudsterResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFraudster",
}));

export type DeleteSpeakerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified speaker from Voice ID.
 */
export const deleteSpeaker: API.OperationMethod<
  DeleteSpeakerRequest,
  DeleteSpeakerResponse,
  DeleteSpeakerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSpeakerRequest,
  output: DeleteSpeakerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSpeaker",
}));

export type DeleteWatchlistError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified watchlist from Voice ID. This API throws an exception when
 * there are fraudsters in the watchlist that you are trying to delete. You must delete the
 * fraudsters, and then delete the watchlist. Every domain has a default watchlist which cannot be deleted.
 */
export const deleteWatchlist: API.OperationMethod<
  DeleteWatchlistRequest,
  DeleteWatchlistResponse,
  DeleteWatchlistError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteWatchlistRequest,
  output: DeleteWatchlistResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteWatchlist",
}));

export type DescribeDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified domain.
 */
export const describeDomain: API.OperationMethod<
  DescribeDomainRequest,
  DescribeDomainResponse,
  DescribeDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeDomainRequest,
  output: DescribeDomainResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDomain",
}));

export type DescribeFraudsterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified fraudster.
 */
export const describeFraudster: API.OperationMethod<
  DescribeFraudsterRequest,
  DescribeFraudsterResponse,
  DescribeFraudsterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFraudsterRequest,
  output: DescribeFraudsterResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFraudster",
}));

export type DescribeFraudsterRegistrationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified fraudster registration job.
 */
export const describeFraudsterRegistrationJob: API.OperationMethod<
  DescribeFraudsterRegistrationJobRequest,
  DescribeFraudsterRegistrationJobResponse,
  DescribeFraudsterRegistrationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeFraudsterRegistrationJobRequest,
  output: DescribeFraudsterRegistrationJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFraudsterRegistrationJob",
}));

export type DescribeSpeakerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified speaker.
 */
export const describeSpeaker: API.OperationMethod<
  DescribeSpeakerRequest,
  DescribeSpeakerResponse,
  DescribeSpeakerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSpeakerRequest,
  output: DescribeSpeakerResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSpeaker",
}));

export type DescribeSpeakerEnrollmentJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified speaker enrollment job.
 */
export const describeSpeakerEnrollmentJob: API.OperationMethod<
  DescribeSpeakerEnrollmentJobRequest,
  DescribeSpeakerEnrollmentJobResponse,
  DescribeSpeakerEnrollmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSpeakerEnrollmentJobRequest,
  output: DescribeSpeakerEnrollmentJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSpeakerEnrollmentJob",
}));

export type DescribeWatchlistError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified watchlist.
 */
export const describeWatchlist: API.OperationMethod<
  DescribeWatchlistRequest,
  DescribeWatchlistResponse,
  DescribeWatchlistError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeWatchlistRequest,
  output: DescribeWatchlistResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWatchlist",
}));

export type DisassociateFraudsterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates the fraudsters from the watchlist specified. Voice ID always expects a
 * fraudster to be a part of at least one watchlist. If
 * you try to disassociate a fraudster from its only watchlist, a `ValidationException` is thrown.
 */
export const disassociateFraudster: API.OperationMethod<
  DisassociateFraudsterRequest,
  DisassociateFraudsterResponse,
  DisassociateFraudsterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateFraudsterRequest,
  output: DisassociateFraudsterResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFraudster",
}));

export type EvaluateSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Evaluates a specified session based on audio data accumulated during a streaming
 * Amazon Connect Voice ID call.
 */
export const evaluateSession: API.OperationMethod<
  EvaluateSessionRequest,
  EvaluateSessionResponse,
  EvaluateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: EvaluateSessionRequest,
  output: EvaluateSessionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EvaluateSession",
}));

export type ListDomainsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the domains in the Amazon Web Services account.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsRequest,
  ListDomainsResponse,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListDomainsRequest,
  output: ListDomainsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "DomainSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFraudsterRegistrationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the fraudster registration jobs in the domain with the given
 * `JobStatus`. If `JobStatus` is not provided, this lists all
 * fraudster registration jobs in the given domain.
 */
export const listFraudsterRegistrationJobs: API.PaginatedOperationMethod<
  ListFraudsterRegistrationJobsRequest,
  ListFraudsterRegistrationJobsResponse,
  ListFraudsterRegistrationJobsError,
  Credentials | HttpClient.HttpClient,
  FraudsterRegistrationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFraudsterRegistrationJobsRequest,
  output: ListFraudsterRegistrationJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFraudsterRegistrationJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFraudstersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all fraudsters in a specified watchlist or domain.
 */
export const listFraudsters: API.PaginatedOperationMethod<
  ListFraudstersRequest,
  ListFraudstersResponse,
  ListFraudstersError,
  Credentials | HttpClient.HttpClient,
  FraudsterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFraudstersRequest,
  output: ListFraudstersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFraudsters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FraudsterSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSpeakerEnrollmentJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the speaker enrollment jobs in the domain with the specified
 * `JobStatus`. If `JobStatus` is not provided, this lists all
 * jobs with all possible speaker enrollment job statuses.
 */
export const listSpeakerEnrollmentJobs: API.PaginatedOperationMethod<
  ListSpeakerEnrollmentJobsRequest,
  ListSpeakerEnrollmentJobsResponse,
  ListSpeakerEnrollmentJobsError,
  Credentials | HttpClient.HttpClient,
  SpeakerEnrollmentJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSpeakerEnrollmentJobsRequest,
  output: ListSpeakerEnrollmentJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpeakerEnrollmentJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSpeakersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all speakers in a specified domain.
 */
export const listSpeakers: API.PaginatedOperationMethod<
  ListSpeakersRequest,
  ListSpeakersResponse,
  ListSpeakersError,
  Credentials | HttpClient.HttpClient,
  SpeakerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSpeakersRequest,
  output: ListSpeakersResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpeakers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SpeakerSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags associated with a specified Voice ID resource.
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
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListWatchlistsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all watchlists in a specified domain.
 */
export const listWatchlists: API.PaginatedOperationMethod<
  ListWatchlistsRequest,
  ListWatchlistsResponse,
  ListWatchlistsError,
  Credentials | HttpClient.HttpClient,
  WatchlistSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListWatchlistsRequest,
  output: ListWatchlistsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWatchlists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "WatchlistSummaries",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type OptOutSpeakerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Opts out a speaker from Voice ID. A speaker can be opted out regardless of whether or
 * not they already exist in Voice ID. If they don't yet exist, a new speaker is created
 * in an opted out state. If they already exist, their existing status is overridden and
 * they are opted out. Enrollment and evaluation authentication requests are rejected for
 * opted out speakers, and opted out speakers have no voice embeddings stored in
 * Voice ID.
 */
export const optOutSpeaker: API.OperationMethod<
  OptOutSpeakerRequest,
  OptOutSpeakerResponse,
  OptOutSpeakerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: OptOutSpeakerRequest,
  output: OptOutSpeakerResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OptOutSpeaker",
}));

export type StartFraudsterRegistrationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new batch fraudster registration job using provided details.
 */
export const startFraudsterRegistrationJob: API.OperationMethod<
  StartFraudsterRegistrationJobRequest,
  StartFraudsterRegistrationJobResponse,
  StartFraudsterRegistrationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartFraudsterRegistrationJobRequest,
  output: StartFraudsterRegistrationJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFraudsterRegistrationJob",
}));

export type StartSpeakerEnrollmentJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new batch speaker enrollment job using specified details.
 */
export const startSpeakerEnrollmentJob: API.OperationMethod<
  StartSpeakerEnrollmentJobRequest,
  StartSpeakerEnrollmentJobResponse,
  StartSpeakerEnrollmentJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSpeakerEnrollmentJobRequest,
  output: StartSpeakerEnrollmentJobResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSpeakerEnrollmentJob",
}));

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Tags a Voice ID resource with the provided list of tags.
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
    AccessDeniedException,
    ConflictException,
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes specified tags from a specified Amazon Connect Voice ID resource.
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
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified domain. This API has clobber behavior, and clears and replaces
 * all attributes. If an optional field, such as 'Description' is not provided, it is
 * removed from the domain.
 */
export const updateDomain: API.OperationMethod<
  UpdateDomainRequest,
  UpdateDomainResponse,
  UpdateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDomainRequest,
  output: UpdateDomainResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDomain",
}));

export type UpdateWatchlistError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified watchlist. Every domain has a default watchlist which cannot be updated.
 */
export const updateWatchlist: API.OperationMethod<
  UpdateWatchlistRequest,
  UpdateWatchlistResponse,
  UpdateWatchlistError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateWatchlistRequest,
  output: UpdateWatchlistResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateWatchlist",
}));
