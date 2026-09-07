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
  sdkId: "IVS RealTime",
  serviceShapeName: "AmazonInteractiveVideoServiceRealTime",
});
const auth = T.AwsAuthSigv4({ name: "ivs" });
const ver = T.ServiceVersion("2020-07-14");
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
              `https://ivsrealtime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://ivsrealtime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://ivsrealtime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://ivsrealtime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    {
      accessControlAllowOrigin: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Allow-Origin"),
      ),
      accessControlExposeHeaders: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Expose-Headers"),
      ),
      cacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
      contentSecurityPolicy: S.optional(S.String).pipe(
        T.HttpHeader("Content-Security-Policy"),
      ),
      strictTransportSecurity: S.optional(S.String).pipe(
        T.HttpHeader("Strict-Transport-Security"),
      ),
      xContentTypeOptions: S.optional(S.String).pipe(
        T.HttpHeader("X-Content-Type-Options"),
      ),
      xFrameOptions: S.optional(S.String).pipe(T.HttpHeader("X-Frame-Options")),
      xAmznErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
      exceptionMessage: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      accessControlAllowOrigin: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Allow-Origin"),
      ),
      accessControlExposeHeaders: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Expose-Headers"),
      ),
      cacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
      contentSecurityPolicy: S.optional(S.String).pipe(
        T.HttpHeader("Content-Security-Policy"),
      ),
      strictTransportSecurity: S.optional(S.String).pipe(
        T.HttpHeader("Strict-Transport-Security"),
      ),
      xContentTypeOptions: S.optional(S.String).pipe(
        T.HttpHeader("X-Content-Type-Options"),
      ),
      xFrameOptions: S.optional(S.String).pipe(T.HttpHeader("X-Frame-Options")),
      xAmznErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
      exceptionMessage: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      accessControlAllowOrigin: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Allow-Origin"),
      ),
      accessControlExposeHeaders: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Expose-Headers"),
      ),
      cacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
      contentSecurityPolicy: S.optional(S.String).pipe(
        T.HttpHeader("Content-Security-Policy"),
      ),
      strictTransportSecurity: S.optional(S.String).pipe(
        T.HttpHeader("Strict-Transport-Security"),
      ),
      xContentTypeOptions: S.optional(S.String).pipe(
        T.HttpHeader("X-Content-Type-Options"),
      ),
      xFrameOptions: S.optional(S.String).pipe(T.HttpHeader("X-Frame-Options")),
      xAmznErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
      exceptionMessage: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class PendingVerification
  extends /*@__PURE__*/ S.TaggedError<PendingVerification>()(
    "PendingVerification",
    {
      accessControlAllowOrigin: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Allow-Origin"),
      ),
      accessControlExposeHeaders: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Expose-Headers"),
      ),
      cacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
      contentSecurityPolicy: S.optional(S.String).pipe(
        T.HttpHeader("Content-Security-Policy"),
      ),
      strictTransportSecurity: S.optional(S.String).pipe(
        T.HttpHeader("Strict-Transport-Security"),
      ),
      xContentTypeOptions: S.optional(S.String).pipe(
        T.HttpHeader("X-Content-Type-Options"),
      ),
      xFrameOptions: S.optional(S.String).pipe(T.HttpHeader("X-Frame-Options")),
      xAmznErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
      exceptionMessage: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      accessControlAllowOrigin: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Allow-Origin"),
      ),
      accessControlExposeHeaders: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Expose-Headers"),
      ),
      cacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
      contentSecurityPolicy: S.optional(S.String).pipe(
        T.HttpHeader("Content-Security-Policy"),
      ),
      strictTransportSecurity: S.optional(S.String).pipe(
        T.HttpHeader("Strict-Transport-Security"),
      ),
      xContentTypeOptions: S.optional(S.String).pipe(
        T.HttpHeader("X-Content-Type-Options"),
      ),
      xFrameOptions: S.optional(S.String).pipe(T.HttpHeader("X-Frame-Options")),
      xAmznErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
      exceptionMessage: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      accessControlAllowOrigin: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Allow-Origin"),
      ),
      accessControlExposeHeaders: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Expose-Headers"),
      ),
      cacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
      contentSecurityPolicy: S.optional(S.String).pipe(
        T.HttpHeader("Content-Security-Policy"),
      ),
      strictTransportSecurity: S.optional(S.String).pipe(
        T.HttpHeader("Strict-Transport-Security"),
      ),
      xContentTypeOptions: S.optional(S.String).pipe(
        T.HttpHeader("X-Content-Type-Options"),
      ),
      xFrameOptions: S.optional(S.String).pipe(T.HttpHeader("X-Frame-Options")),
      xAmznErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
      exceptionMessage: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
  ) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      accessControlAllowOrigin: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Allow-Origin"),
      ),
      accessControlExposeHeaders: S.optional(S.String).pipe(
        T.HttpHeader("Access-Control-Expose-Headers"),
      ),
      cacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
      contentSecurityPolicy: S.optional(S.String).pipe(
        T.HttpHeader("Content-Security-Policy"),
      ),
      strictTransportSecurity: S.optional(S.String).pipe(
        T.HttpHeader("Strict-Transport-Security"),
      ),
      xContentTypeOptions: S.optional(S.String).pipe(
        T.HttpHeader("X-Content-Type-Options"),
      ),
      xFrameOptions: S.optional(S.String).pipe(T.HttpHeader("X-Frame-Options")),
      xAmznErrorType: S.optional(S.String).pipe(
        T.HttpHeader("x-amzn-ErrorType"),
      ),
      exceptionMessage: S.optional(S.String),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type EncoderConfigurationName = string;
export type Width = number;
export type Height = number;
export type Framerate = number;
export type Bitrate = number;
export interface Video {
  width?: number;
  height?: number;
  framerate?: number;
  bitrate?: number;
}
export const Video = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    width: S.optional(S.Number),
    height: S.optional(S.Number),
    framerate: S.optional(S.Number),
    bitrate: S.optional(S.Number),
  }),
).annotate({ identifier: "Video" }) as any as S.Schema<Video>;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface CreateEncoderConfigurationRequest {
  name?: string;
  video?: Video;
  tags?: { [key: string]: string | undefined };
}
export const CreateEncoderConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    video: S.optional(Video),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateEncoderConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateEncoderConfigurationRequest",
}) as any as S.Schema<CreateEncoderConfigurationRequest>;
export type EncoderConfigurationArn = string;
export interface EncoderConfiguration {
  arn: string;
  name?: string;
  video?: Video;
  tags?: { [key: string]: string | undefined };
}
export const EncoderConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    video: S.optional(Video),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "EncoderConfiguration",
}) as any as S.Schema<EncoderConfiguration>;
export interface CreateEncoderConfigurationResponse {
  encoderConfiguration?: EncoderConfiguration;
}
export const CreateEncoderConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ encoderConfiguration: S.optional(EncoderConfiguration) }),
).annotate({
  identifier: "CreateEncoderConfigurationResponse",
}) as any as S.Schema<CreateEncoderConfigurationResponse>;
export type IngestConfigurationName = string;
export type IngestConfigurationStageArn = string;
export type UserId = string;
export type ParticipantAttributes = { [key: string]: string | undefined };
export const ParticipantAttributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type IngestProtocol = "RTMP" | "RTMPS" | (string & {});
export const IngestProtocol = /*@__PURE__*/ S.String;

export type InsecureIngest = boolean;
export type RedundantIngest = boolean;
export interface CreateIngestConfigurationRequest {
  name?: string;
  stageArn?: string;
  userId?: string;
  attributes?: { [key: string]: string | undefined };
  ingestProtocol: IngestProtocol;
  insecureIngest?: boolean;
  redundantIngest?: boolean;
  tags?: { [key: string]: string | undefined };
}
export const CreateIngestConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    stageArn: S.optional(S.String),
    userId: S.optional(S.String),
    attributes: S.optional(ParticipantAttributes),
    ingestProtocol: IngestProtocol,
    insecureIngest: S.optional(S.Boolean),
    redundantIngest: S.optional(S.Boolean),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateIngestConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateIngestConfigurationRequest",
}) as any as S.Schema<CreateIngestConfigurationRequest>;
export type IngestConfigurationArn = string;
export type StreamKey = string | redacted.Redacted<string>;
export type ParticipantId = string;
export type IngestConfigurationState = string;
export interface RedundantIngestCredential {
  participantId?: string;
  streamKey?: string | redacted.Redacted<string>;
}
export const RedundantIngestCredential = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    participantId: S.optional(S.String),
    streamKey: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "RedundantIngestCredential",
}) as any as S.Schema<RedundantIngestCredential>;
export type RedundantIngestCredentials = RedundantIngestCredential[];
export const RedundantIngestCredentials = /*@__PURE__*/ S.Array(
  RedundantIngestCredential,
);
export interface IngestConfiguration {
  name?: string;
  arn: string;
  ingestProtocol: IngestProtocol;
  streamKey: string | redacted.Redacted<string>;
  stageArn: string;
  participantId: string;
  state: string;
  userId?: string;
  redundantIngest?: boolean;
  redundantIngestCredentials?: RedundantIngestCredential[];
  attributes?: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
}
export const IngestConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.String,
    ingestProtocol: IngestProtocol,
    streamKey: SensitiveString,
    stageArn: S.String,
    participantId: S.String,
    state: S.String,
    userId: S.optional(S.String),
    redundantIngest: S.optional(S.Boolean),
    redundantIngestCredentials: S.optional(RedundantIngestCredentials),
    attributes: S.optional(ParticipantAttributes),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "IngestConfiguration",
}) as any as S.Schema<IngestConfiguration>;
export interface CreateIngestConfigurationResponse {
  ingestConfiguration?: IngestConfiguration;
}
export const CreateIngestConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ingestConfiguration: S.optional(IngestConfiguration) }),
).annotate({
  identifier: "CreateIngestConfigurationResponse",
}) as any as S.Schema<CreateIngestConfigurationResponse>;
export type StageArn = string;
export type ParticipantTokenDurationMinutes = number;
export type ParticipantTokenUserId = string;
export type ParticipantTokenAttributes = { [key: string]: string | undefined };
export const ParticipantTokenAttributes = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type ParticipantTokenCapability = string;
export type ParticipantTokenCapabilities = string[];
export const ParticipantTokenCapabilities = /*@__PURE__*/ S.Array(S.String);
export interface CreateParticipantTokenRequest {
  stageArn: string;
  duration?: number;
  userId?: string;
  attributes?: { [key: string]: string | undefined };
  capabilities?: string[];
}
export const CreateParticipantTokenRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stageArn: S.String,
    duration: S.optional(S.Number),
    userId: S.optional(S.String),
    attributes: S.optional(ParticipantTokenAttributes),
    capabilities: S.optional(ParticipantTokenCapabilities),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateParticipantToken" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateParticipantTokenRequest",
}) as any as S.Schema<CreateParticipantTokenRequest>;
export type ParticipantTokenId = string;
export type ParticipantTokenString = string | redacted.Redacted<string>;
export type ParticipantTokenExpirationTime = Date;
export interface ParticipantToken {
  participantId?: string;
  token?: string | redacted.Redacted<string>;
  userId?: string;
  attributes?: { [key: string]: string | undefined };
  duration?: number;
  capabilities?: string[];
  expirationTime?: Date;
}
export const ParticipantToken = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    participantId: S.optional(S.String),
    token: S.optional(SensitiveString),
    userId: S.optional(S.String),
    attributes: S.optional(ParticipantTokenAttributes),
    duration: S.optional(S.Number),
    capabilities: S.optional(ParticipantTokenCapabilities),
    expirationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ParticipantToken",
}) as any as S.Schema<ParticipantToken>;
export interface CreateParticipantTokenResponse {
  participantToken?: ParticipantToken;
}
export const CreateParticipantTokenResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ participantToken: S.optional(ParticipantToken) }),
).annotate({
  identifier: "CreateParticipantTokenResponse",
}) as any as S.Schema<CreateParticipantTokenResponse>;
export type StageName = string;
export interface ParticipantTokenConfiguration {
  duration?: number;
  userId?: string;
  attributes?: { [key: string]: string | undefined };
  capabilities?: string[];
}
export const ParticipantTokenConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    duration: S.optional(S.Number),
    userId: S.optional(S.String),
    attributes: S.optional(ParticipantTokenAttributes),
    capabilities: S.optional(ParticipantTokenCapabilities),
  }),
).annotate({
  identifier: "ParticipantTokenConfiguration",
}) as any as S.Schema<ParticipantTokenConfiguration>;
export type ParticipantTokenConfigurations = ParticipantTokenConfiguration[];
export const ParticipantTokenConfigurations = /*@__PURE__*/ S.Array(
  ParticipantTokenConfiguration,
);
export type AutoParticipantRecordingStorageConfigurationArn = string;
export type ParticipantRecordingMediaType =
  | "AUDIO_VIDEO"
  | "AUDIO_ONLY"
  | "NONE"
  | (string & {});
export const ParticipantRecordingMediaType = /*@__PURE__*/ S.String;

export type ParticipantRecordingMediaTypeList = ParticipantRecordingMediaType[];
export const ParticipantRecordingMediaTypeList = /*@__PURE__*/ S.Array(
  ParticipantRecordingMediaType,
);
export type ThumbnailIntervalSeconds = number;
export type ThumbnailStorageType = "SEQUENTIAL" | "LATEST" | (string & {});
export const ThumbnailStorageType = /*@__PURE__*/ S.String;

export type ThumbnailStorageTypeList = ThumbnailStorageType[];
export const ThumbnailStorageTypeList =
  /*@__PURE__*/ S.Array(ThumbnailStorageType);
export type ThumbnailRecordingMode = "INTERVAL" | "DISABLED" | (string & {});
export const ThumbnailRecordingMode = /*@__PURE__*/ S.String;

export interface ParticipantThumbnailConfiguration {
  targetIntervalSeconds?: number;
  storage?: ThumbnailStorageType[];
  recordingMode?: ThumbnailRecordingMode;
}
export const ParticipantThumbnailConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetIntervalSeconds: S.optional(S.Number),
    storage: S.optional(ThumbnailStorageTypeList),
    recordingMode: S.optional(ThumbnailRecordingMode),
  }),
).annotate({
  identifier: "ParticipantThumbnailConfiguration",
}) as any as S.Schema<ParticipantThumbnailConfiguration>;
export type ParticipantRecordingReconnectWindowSeconds = number;
export type ParticipantRecordingTargetSegmentDurationSeconds = number;
export interface ParticipantRecordingHlsConfiguration {
  targetSegmentDurationSeconds?: number;
}
export const ParticipantRecordingHlsConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ targetSegmentDurationSeconds: S.optional(S.Number) }),
).annotate({
  identifier: "ParticipantRecordingHlsConfiguration",
}) as any as S.Schema<ParticipantRecordingHlsConfiguration>;
export type RecordParticipantReplicas = boolean;
export interface AutoParticipantRecordingConfiguration {
  storageConfigurationArn: string;
  mediaTypes?: ParticipantRecordingMediaType[];
  thumbnailConfiguration?: ParticipantThumbnailConfiguration;
  recordingReconnectWindowSeconds?: number;
  hlsConfiguration?: ParticipantRecordingHlsConfiguration;
  recordParticipantReplicas?: boolean;
}
export const AutoParticipantRecordingConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      storageConfigurationArn: S.String,
      mediaTypes: S.optional(ParticipantRecordingMediaTypeList),
      thumbnailConfiguration: S.optional(ParticipantThumbnailConfiguration),
      recordingReconnectWindowSeconds: S.optional(S.Number),
      hlsConfiguration: S.optional(ParticipantRecordingHlsConfiguration),
      recordParticipantReplicas: S.optional(S.Boolean),
    }),
).annotate({
  identifier: "AutoParticipantRecordingConfiguration",
}) as any as S.Schema<AutoParticipantRecordingConfiguration>;
export interface CreateStageRequest {
  name?: string;
  participantTokenConfigurations?: ParticipantTokenConfiguration[];
  tags?: { [key: string]: string | undefined };
  autoParticipantRecordingConfiguration?: AutoParticipantRecordingConfiguration;
}
export const CreateStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    participantTokenConfigurations: S.optional(ParticipantTokenConfigurations),
    tags: S.optional(Tags),
    autoParticipantRecordingConfiguration: S.optional(
      AutoParticipantRecordingConfiguration,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateStage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStageRequest",
}) as any as S.Schema<CreateStageRequest>;
export type StageSessionId = string;
export type StageEndpoint = string;
export interface StageEndpoints {
  events?: string;
  whip?: string;
  rtmp?: string;
  rtmps?: string;
}
export const StageEndpoints = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    events: S.optional(S.String),
    whip: S.optional(S.String),
    rtmp: S.optional(S.String),
    rtmps: S.optional(S.String),
  }),
).annotate({ identifier: "StageEndpoints" }) as any as S.Schema<StageEndpoints>;
export interface Stage {
  arn: string;
  name?: string;
  activeSessionId?: string;
  tags?: { [key: string]: string | undefined };
  autoParticipantRecordingConfiguration?: AutoParticipantRecordingConfiguration;
  endpoints?: StageEndpoints;
}
export const Stage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    activeSessionId: S.optional(S.String),
    tags: S.optional(Tags),
    autoParticipantRecordingConfiguration: S.optional(
      AutoParticipantRecordingConfiguration,
    ),
    endpoints: S.optional(StageEndpoints),
  }),
).annotate({ identifier: "Stage" }) as any as S.Schema<Stage>;
export type ParticipantTokenList = ParticipantToken[];
export const ParticipantTokenList = /*@__PURE__*/ S.Array(ParticipantToken);
export interface CreateStageResponse {
  stage?: Stage;
  participantTokens?: ParticipantToken[];
}
export const CreateStageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stage: S.optional(Stage),
    participantTokens: S.optional(ParticipantTokenList),
  }),
).annotate({
  identifier: "CreateStageResponse",
}) as any as S.Schema<CreateStageResponse>;
export type StorageConfigurationName = string;
export type S3BucketName = string;
export interface S3StorageConfiguration {
  bucketName: string;
}
export const S3StorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ bucketName: S.String }),
).annotate({
  identifier: "S3StorageConfiguration",
}) as any as S.Schema<S3StorageConfiguration>;
export interface CreateStorageConfigurationRequest {
  name?: string;
  s3: S3StorageConfiguration;
  tags?: { [key: string]: string | undefined };
}
export const CreateStorageConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    s3: S3StorageConfiguration,
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/CreateStorageConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStorageConfigurationRequest",
}) as any as S.Schema<CreateStorageConfigurationRequest>;
export type StorageConfigurationArn = string;
export interface StorageConfiguration {
  arn: string;
  name?: string;
  s3?: S3StorageConfiguration;
  tags?: { [key: string]: string | undefined };
}
export const StorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    s3: S.optional(S3StorageConfiguration),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "StorageConfiguration",
}) as any as S.Schema<StorageConfiguration>;
export interface CreateStorageConfigurationResponse {
  storageConfiguration?: StorageConfiguration;
}
export const CreateStorageConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ storageConfiguration: S.optional(StorageConfiguration) }),
).annotate({
  identifier: "CreateStorageConfigurationResponse",
}) as any as S.Schema<CreateStorageConfigurationResponse>;
export interface DeleteEncoderConfigurationRequest {
  arn: string;
}
export const DeleteEncoderConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteEncoderConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEncoderConfigurationRequest",
}) as any as S.Schema<DeleteEncoderConfigurationRequest>;
export interface DeleteEncoderConfigurationResponse {}
export const DeleteEncoderConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteEncoderConfigurationResponse",
}) as any as S.Schema<DeleteEncoderConfigurationResponse>;
export interface DeleteIngestConfigurationRequest {
  arn: string;
  force?: boolean;
}
export const DeleteIngestConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, force: S.optional(S.Boolean) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteIngestConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteIngestConfigurationRequest",
}) as any as S.Schema<DeleteIngestConfigurationRequest>;
export interface DeleteIngestConfigurationResponse {}
export const DeleteIngestConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteIngestConfigurationResponse",
}) as any as S.Schema<DeleteIngestConfigurationResponse>;
export type PublicKeyArn = string;
export interface DeletePublicKeyRequest {
  arn: string;
}
export const DeletePublicKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeletePublicKey" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePublicKeyRequest",
}) as any as S.Schema<DeletePublicKeyRequest>;
export interface DeletePublicKeyResponse {}
export const DeletePublicKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePublicKeyResponse",
}) as any as S.Schema<DeletePublicKeyResponse>;
export interface DeleteStageRequest {
  arn: string;
}
export const DeleteStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteStage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStageRequest",
}) as any as S.Schema<DeleteStageRequest>;
export interface DeleteStageResponse {}
export const DeleteStageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteStageResponse",
}) as any as S.Schema<DeleteStageResponse>;
export interface DeleteStorageConfigurationRequest {
  arn: string;
}
export const DeleteStorageConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DeleteStorageConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStorageConfigurationRequest",
}) as any as S.Schema<DeleteStorageConfigurationRequest>;
export interface DeleteStorageConfigurationResponse {}
export const DeleteStorageConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteStorageConfigurationResponse",
}) as any as S.Schema<DeleteStorageConfigurationResponse>;
export type DisconnectParticipantReason = string;
export interface DisconnectParticipantRequest {
  stageArn: string;
  participantId: string;
  reason?: string;
}
export const DisconnectParticipantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stageArn: S.String,
    participantId: S.String,
    reason: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/DisconnectParticipant" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisconnectParticipantRequest",
}) as any as S.Schema<DisconnectParticipantRequest>;
export interface DisconnectParticipantResponse {}
export const DisconnectParticipantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisconnectParticipantResponse",
}) as any as S.Schema<DisconnectParticipantResponse>;
export type CompositionArn = string;
export interface GetCompositionRequest {
  arn: string;
}
export const GetCompositionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetComposition" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCompositionRequest",
}) as any as S.Schema<GetCompositionRequest>;
export type CompositionState = string;
export type AttributeKey = string;
export type OmitStoppedVideo = boolean;
export type VideoAspectRatio =
  | "AUTO"
  | "VIDEO"
  | "SQUARE"
  | "PORTRAIT"
  | (string & {});
export const VideoAspectRatio = /*@__PURE__*/ S.String;

export type VideoFillMode = "FILL" | "COVER" | "CONTAIN" | (string & {});
export const VideoFillMode = /*@__PURE__*/ S.String;

export type GridGap = number;
export interface GridConfiguration {
  featuredParticipantAttribute?: string;
  omitStoppedVideo?: boolean;
  videoAspectRatio?: VideoAspectRatio;
  videoFillMode?: VideoFillMode;
  gridGap?: number;
  participantOrderAttribute?: string;
}
export const GridConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    featuredParticipantAttribute: S.optional(S.String),
    omitStoppedVideo: S.optional(S.Boolean),
    videoAspectRatio: S.optional(VideoAspectRatio),
    videoFillMode: S.optional(VideoFillMode),
    gridGap: S.optional(S.Number),
    participantOrderAttribute: S.optional(S.String),
  }),
).annotate({
  identifier: "GridConfiguration",
}) as any as S.Schema<GridConfiguration>;
export type PipBehavior = "STATIC" | "DYNAMIC" | (string & {});
export const PipBehavior = /*@__PURE__*/ S.String;

export type PipOffset = number;
export type PipPosition =
  | "TOP_LEFT"
  | "TOP_RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM_RIGHT"
  | (string & {});
export const PipPosition = /*@__PURE__*/ S.String;

export type PipWidth = number;
export type PipHeight = number;
export interface PipConfiguration {
  featuredParticipantAttribute?: string;
  omitStoppedVideo?: boolean;
  videoFillMode?: VideoFillMode;
  gridGap?: number;
  pipParticipantAttribute?: string;
  pipBehavior?: PipBehavior;
  pipOffset?: number;
  pipPosition?: PipPosition;
  pipWidth?: number;
  pipHeight?: number;
  participantOrderAttribute?: string;
}
export const PipConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    featuredParticipantAttribute: S.optional(S.String),
    omitStoppedVideo: S.optional(S.Boolean),
    videoFillMode: S.optional(VideoFillMode),
    gridGap: S.optional(S.Number),
    pipParticipantAttribute: S.optional(S.String),
    pipBehavior: S.optional(PipBehavior),
    pipOffset: S.optional(S.Number),
    pipPosition: S.optional(PipPosition),
    pipWidth: S.optional(S.Number),
    pipHeight: S.optional(S.Number),
    participantOrderAttribute: S.optional(S.String),
  }),
).annotate({
  identifier: "PipConfiguration",
}) as any as S.Schema<PipConfiguration>;
export interface LayoutConfiguration {
  grid?: GridConfiguration;
  pip?: PipConfiguration;
}
export const LayoutConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    grid: S.optional(GridConfiguration),
    pip: S.optional(PipConfiguration),
  }),
).annotate({
  identifier: "LayoutConfiguration",
}) as any as S.Schema<LayoutConfiguration>;
export type DestinationState = string;
export type DestinationConfigurationName = string;
export type ChannelArn = string;
export interface ChannelDestinationConfiguration {
  channelArn: string;
  encoderConfigurationArn?: string;
}
export const ChannelDestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    channelArn: S.String,
    encoderConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ChannelDestinationConfiguration",
}) as any as S.Schema<ChannelDestinationConfiguration>;
export type EncoderConfigurationArnList = string[];
export const EncoderConfigurationArnList = /*@__PURE__*/ S.Array(S.String);
export type CompositionRecordingTargetSegmentDurationSeconds = number;
export interface CompositionRecordingHlsConfiguration {
  targetSegmentDurationSeconds?: number;
}
export const CompositionRecordingHlsConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ targetSegmentDurationSeconds: S.optional(S.Number) }),
).annotate({
  identifier: "CompositionRecordingHlsConfiguration",
}) as any as S.Schema<CompositionRecordingHlsConfiguration>;
export type RecordingConfigurationFormat = string;
export interface RecordingConfiguration {
  hlsConfiguration?: CompositionRecordingHlsConfiguration;
  format?: string;
}
export const RecordingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    hlsConfiguration: S.optional(CompositionRecordingHlsConfiguration),
    format: S.optional(S.String),
  }),
).annotate({
  identifier: "RecordingConfiguration",
}) as any as S.Schema<RecordingConfiguration>;
export interface CompositionThumbnailConfiguration {
  targetIntervalSeconds?: number;
  storage?: ThumbnailStorageType[];
}
export const CompositionThumbnailConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    targetIntervalSeconds: S.optional(S.Number),
    storage: S.optional(ThumbnailStorageTypeList),
  }),
).annotate({
  identifier: "CompositionThumbnailConfiguration",
}) as any as S.Schema<CompositionThumbnailConfiguration>;
export type CompositionThumbnailConfigurationList =
  CompositionThumbnailConfiguration[];
export const CompositionThumbnailConfigurationList = /*@__PURE__*/ S.Array(
  CompositionThumbnailConfiguration,
);
export interface S3DestinationConfiguration {
  storageConfigurationArn: string;
  encoderConfigurationArns: string[];
  recordingConfiguration?: RecordingConfiguration;
  thumbnailConfigurations?: CompositionThumbnailConfiguration[];
}
export const S3DestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageConfigurationArn: S.String,
    encoderConfigurationArns: EncoderConfigurationArnList,
    recordingConfiguration: S.optional(RecordingConfiguration),
    thumbnailConfigurations: S.optional(CompositionThumbnailConfigurationList),
  }),
).annotate({
  identifier: "S3DestinationConfiguration",
}) as any as S.Schema<S3DestinationConfiguration>;
export interface DestinationConfiguration {
  name?: string;
  channel?: ChannelDestinationConfiguration;
  s3?: S3DestinationConfiguration;
}
export const DestinationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    channel: S.optional(ChannelDestinationConfiguration),
    s3: S.optional(S3DestinationConfiguration),
  }),
).annotate({
  identifier: "DestinationConfiguration",
}) as any as S.Schema<DestinationConfiguration>;
export interface S3Detail {
  recordingPrefix: string;
}
export const S3Detail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ recordingPrefix: S.String }),
).annotate({ identifier: "S3Detail" }) as any as S.Schema<S3Detail>;
export interface DestinationDetail {
  s3?: S3Detail;
}
export const DestinationDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ s3: S.optional(S3Detail) }),
).annotate({
  identifier: "DestinationDetail",
}) as any as S.Schema<DestinationDetail>;
export interface Destination {
  id: string;
  state: string;
  startTime?: Date;
  endTime?: Date;
  configuration: DestinationConfiguration;
  detail?: DestinationDetail;
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    state: S.String,
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    configuration: DestinationConfiguration,
    detail: S.optional(DestinationDetail),
  }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export type DestinationList = Destination[];
export const DestinationList = /*@__PURE__*/ S.Array(Destination);
export interface Composition {
  arn: string;
  stageArn: string;
  state: string;
  layout: LayoutConfiguration;
  destinations: Destination[];
  tags?: { [key: string]: string | undefined };
  startTime?: Date;
  endTime?: Date;
}
export const Composition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    stageArn: S.String,
    state: S.String,
    layout: LayoutConfiguration,
    destinations: DestinationList,
    tags: S.optional(Tags),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "Composition" }) as any as S.Schema<Composition>;
export interface GetCompositionResponse {
  composition?: Composition;
}
export const GetCompositionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ composition: S.optional(Composition) }),
).annotate({
  identifier: "GetCompositionResponse",
}) as any as S.Schema<GetCompositionResponse>;
export interface GetEncoderConfigurationRequest {
  arn: string;
}
export const GetEncoderConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetEncoderConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEncoderConfigurationRequest",
}) as any as S.Schema<GetEncoderConfigurationRequest>;
export interface GetEncoderConfigurationResponse {
  encoderConfiguration?: EncoderConfiguration;
}
export const GetEncoderConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ encoderConfiguration: S.optional(EncoderConfiguration) }),
).annotate({
  identifier: "GetEncoderConfigurationResponse",
}) as any as S.Schema<GetEncoderConfigurationResponse>;
export interface GetIngestConfigurationRequest {
  arn: string;
}
export const GetIngestConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetIngestConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetIngestConfigurationRequest",
}) as any as S.Schema<GetIngestConfigurationRequest>;
export interface GetIngestConfigurationResponse {
  ingestConfiguration?: IngestConfiguration;
}
export const GetIngestConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ingestConfiguration: S.optional(IngestConfiguration) }),
).annotate({
  identifier: "GetIngestConfigurationResponse",
}) as any as S.Schema<GetIngestConfigurationResponse>;
export interface GetParticipantRequest {
  stageArn: string;
  sessionId: string;
  participantId: string;
}
export const GetParticipantRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stageArn: S.String,
    sessionId: S.String,
    participantId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetParticipant" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetParticipantRequest",
}) as any as S.Schema<GetParticipantRequest>;
export type ParticipantState = string;
export type Published = boolean;
export type ParticipantClientAttribute = string;
export type ParticipantRecordingS3BucketName = string;
export type ParticipantRecordingS3Prefix = string;
export type ParticipantRecordingState = string;
export type ParticipantProtocol =
  | "UNKNOWN"
  | "WHIP"
  | "RTMP"
  | "RTMPS"
  | (string & {});
export const ParticipantProtocol = /*@__PURE__*/ S.String;

export type ReplicationType = string;
export type ReplicationState = string;
export interface Participant {
  participantId?: string;
  userId?: string;
  state?: string;
  firstJoinTime?: Date;
  attributes?: { [key: string]: string | undefined };
  published?: boolean;
  ispName?: string;
  osName?: string;
  osVersion?: string;
  browserName?: string;
  browserVersion?: string;
  sdkVersion?: string;
  recordingS3BucketName?: string;
  recordingS3Prefix?: string;
  recordingState?: string;
  protocol?: ParticipantProtocol;
  replicationType?: string;
  replicationState?: string;
  sourceStageArn?: string;
  sourceSessionId?: string;
  redundantIngest?: boolean;
  ingestConfigurationArn?: string;
}
export const Participant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    participantId: S.optional(S.String),
    userId: S.optional(S.String),
    state: S.optional(S.String),
    firstJoinTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    attributes: S.optional(ParticipantAttributes),
    published: S.optional(S.Boolean),
    ispName: S.optional(S.String),
    osName: S.optional(S.String),
    osVersion: S.optional(S.String),
    browserName: S.optional(S.String),
    browserVersion: S.optional(S.String),
    sdkVersion: S.optional(S.String),
    recordingS3BucketName: S.optional(S.String),
    recordingS3Prefix: S.optional(S.String),
    recordingState: S.optional(S.String),
    protocol: S.optional(ParticipantProtocol),
    replicationType: S.optional(S.String),
    replicationState: S.optional(S.String),
    sourceStageArn: S.optional(S.String),
    sourceSessionId: S.optional(S.String),
    redundantIngest: S.optional(S.Boolean),
    ingestConfigurationArn: S.optional(S.String),
  }),
).annotate({ identifier: "Participant" }) as any as S.Schema<Participant>;
export interface GetParticipantResponse {
  participant?: Participant;
}
export const GetParticipantResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ participant: S.optional(Participant) }),
).annotate({
  identifier: "GetParticipantResponse",
}) as any as S.Schema<GetParticipantResponse>;
export interface GetPublicKeyRequest {
  arn: string;
}
export const GetPublicKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetPublicKey" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPublicKeyRequest",
}) as any as S.Schema<GetPublicKeyRequest>;
export type PublicKeyName = string;
export type PublicKeyMaterial = string;
export type PublicKeyFingerprint = string;
export interface PublicKey {
  arn?: string;
  name?: string;
  publicKeyMaterial?: string;
  fingerprint?: string;
  tags?: { [key: string]: string | undefined };
}
export const PublicKey = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    publicKeyMaterial: S.optional(S.String),
    fingerprint: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({ identifier: "PublicKey" }) as any as S.Schema<PublicKey>;
export interface GetPublicKeyResponse {
  publicKey?: PublicKey;
}
export const GetPublicKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ publicKey: S.optional(PublicKey) }),
).annotate({
  identifier: "GetPublicKeyResponse",
}) as any as S.Schema<GetPublicKeyResponse>;
export interface GetStageRequest {
  arn: string;
}
export const GetStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetStage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStageRequest",
}) as any as S.Schema<GetStageRequest>;
export interface GetStageResponse {
  stage?: Stage;
}
export const GetStageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stage: S.optional(Stage) }),
).annotate({
  identifier: "GetStageResponse",
}) as any as S.Schema<GetStageResponse>;
export interface GetStageSessionRequest {
  stageArn: string;
  sessionId: string;
}
export const GetStageSessionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stageArn: S.String, sessionId: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetStageSession" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStageSessionRequest",
}) as any as S.Schema<GetStageSessionRequest>;
export interface StageSession {
  sessionId?: string;
  startTime?: Date;
  endTime?: Date;
}
export const StageSession = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.optional(S.String),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "StageSession" }) as any as S.Schema<StageSession>;
export interface GetStageSessionResponse {
  stageSession?: StageSession;
}
export const GetStageSessionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stageSession: S.optional(StageSession) }),
).annotate({
  identifier: "GetStageSessionResponse",
}) as any as S.Schema<GetStageSessionResponse>;
export interface GetStorageConfigurationRequest {
  arn: string;
}
export const GetStorageConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/GetStorageConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetStorageConfigurationRequest",
}) as any as S.Schema<GetStorageConfigurationRequest>;
export interface GetStorageConfigurationResponse {
  storageConfiguration?: StorageConfiguration;
}
export const GetStorageConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ storageConfiguration: S.optional(StorageConfiguration) }),
).annotate({
  identifier: "GetStorageConfigurationResponse",
}) as any as S.Schema<GetStorageConfigurationResponse>;
export interface ImportPublicKeyRequest {
  publicKeyMaterial: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const ImportPublicKeyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    publicKeyMaterial: S.String,
    name: S.optional(S.String),
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ImportPublicKey" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ImportPublicKeyRequest",
}) as any as S.Schema<ImportPublicKeyRequest>;
export interface ImportPublicKeyResponse {
  publicKey?: PublicKey;
}
export const ImportPublicKeyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ publicKey: S.optional(PublicKey) }),
).annotate({
  identifier: "ImportPublicKeyResponse",
}) as any as S.Schema<ImportPublicKeyResponse>;
export type PaginationToken = string;
export type MaxCompositionResults = number;
export interface ListCompositionsRequest {
  filterByStageArn?: string;
  filterByEncoderConfigurationArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListCompositionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filterByStageArn: S.optional(S.String),
    filterByEncoderConfigurationArn: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListCompositions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCompositionsRequest",
}) as any as S.Schema<ListCompositionsRequest>;
export interface DestinationSummary {
  id: string;
  state: string;
  startTime?: Date;
  endTime?: Date;
}
export const DestinationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    id: S.String,
    state: S.String,
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "DestinationSummary",
}) as any as S.Schema<DestinationSummary>;
export type DestinationSummaryList = DestinationSummary[];
export const DestinationSummaryList = /*@__PURE__*/ S.Array(DestinationSummary);
export interface CompositionSummary {
  arn: string;
  stageArn: string;
  destinations: DestinationSummary[];
  state: string;
  tags?: { [key: string]: string | undefined };
  startTime?: Date;
  endTime?: Date;
}
export const CompositionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    stageArn: S.String,
    destinations: DestinationSummaryList,
    state: S.String,
    tags: S.optional(Tags),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "CompositionSummary",
}) as any as S.Schema<CompositionSummary>;
export type CompositionSummaryList = CompositionSummary[];
export const CompositionSummaryList = /*@__PURE__*/ S.Array(CompositionSummary);
export interface ListCompositionsResponse {
  compositions: CompositionSummary[];
  nextToken?: string;
}
export const ListCompositionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    compositions: CompositionSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListCompositionsResponse",
}) as any as S.Schema<ListCompositionsResponse>;
export type MaxEncoderConfigurationResults = number;
export interface ListEncoderConfigurationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListEncoderConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListEncoderConfigurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEncoderConfigurationsRequest",
}) as any as S.Schema<ListEncoderConfigurationsRequest>;
export interface EncoderConfigurationSummary {
  arn: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const EncoderConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "EncoderConfigurationSummary",
}) as any as S.Schema<EncoderConfigurationSummary>;
export type EncoderConfigurationSummaryList = EncoderConfigurationSummary[];
export const EncoderConfigurationSummaryList = /*@__PURE__*/ S.Array(
  EncoderConfigurationSummary,
);
export interface ListEncoderConfigurationsResponse {
  encoderConfigurations: EncoderConfigurationSummary[];
  nextToken?: string;
}
export const ListEncoderConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    encoderConfigurations: EncoderConfigurationSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListEncoderConfigurationsResponse",
}) as any as S.Schema<ListEncoderConfigurationsResponse>;
export type MaxIngestConfigurationResults = number;
export interface ListIngestConfigurationsRequest {
  filterByStageArn?: string;
  filterByState?: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListIngestConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    filterByStageArn: S.optional(S.String),
    filterByState: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListIngestConfigurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListIngestConfigurationsRequest",
}) as any as S.Schema<ListIngestConfigurationsRequest>;
export interface IngestConfigurationSummary {
  name?: string;
  arn: string;
  ingestProtocol: IngestProtocol;
  stageArn: string;
  participantId: string;
  state: string;
  userId?: string;
  redundantIngest?: boolean;
}
export const IngestConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    arn: S.String,
    ingestProtocol: IngestProtocol,
    stageArn: S.String,
    participantId: S.String,
    state: S.String,
    userId: S.optional(S.String),
    redundantIngest: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "IngestConfigurationSummary",
}) as any as S.Schema<IngestConfigurationSummary>;
export type IngestConfigurationList = IngestConfigurationSummary[];
export const IngestConfigurationList = /*@__PURE__*/ S.Array(
  IngestConfigurationSummary,
);
export interface ListIngestConfigurationsResponse {
  ingestConfigurations: IngestConfigurationSummary[];
  nextToken?: string;
}
export const ListIngestConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ingestConfigurations: IngestConfigurationList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListIngestConfigurationsResponse",
}) as any as S.Schema<ListIngestConfigurationsResponse>;
export type MaxParticipantEventResults = number;
export interface ListParticipantEventsRequest {
  stageArn: string;
  sessionId: string;
  participantId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListParticipantEventsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stageArn: S.String,
    sessionId: S.String,
    participantId: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListParticipantEvents" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListParticipantEventsRequest",
}) as any as S.Schema<ListParticipantEventsRequest>;
export type EventName = string;
export type EventErrorCode =
  | "INSUFFICIENT_CAPABILITIES"
  | "QUOTA_EXCEEDED"
  | "PUBLISHER_NOT_FOUND"
  | "BITRATE_EXCEEDED"
  | "RESOLUTION_EXCEEDED"
  | "STREAM_DURATION_EXCEEDED"
  | "INVALID_AUDIO_CODEC"
  | "INVALID_VIDEO_CODEC"
  | "INVALID_PROTOCOL"
  | "INVALID_STREAM_KEY"
  | "REUSE_OF_STREAM_KEY"
  | "B_FRAME_PRESENT"
  | "INVALID_INPUT"
  | "INTERNAL_SERVER_EXCEPTION"
  | (string & {});
export const EventErrorCode = /*@__PURE__*/ S.String;

export type Replica = boolean;
export interface ExchangedParticipantToken {
  capabilities?: string[];
  attributes?: { [key: string]: string | undefined };
  userId?: string;
  expirationTime?: Date;
}
export const ExchangedParticipantToken = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    capabilities: S.optional(ParticipantTokenCapabilities),
    attributes: S.optional(ParticipantTokenAttributes),
    userId: S.optional(S.String),
    expirationTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "ExchangedParticipantToken",
}) as any as S.Schema<ExchangedParticipantToken>;
export interface Event {
  name?: string;
  participantId?: string;
  eventTime?: Date;
  remoteParticipantId?: string;
  errorCode?: EventErrorCode;
  destinationStageArn?: string;
  destinationSessionId?: string;
  replica?: boolean;
  previousToken?: ExchangedParticipantToken;
  newToken?: ExchangedParticipantToken;
}
export const Event = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    participantId: S.optional(S.String),
    eventTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    remoteParticipantId: S.optional(S.String),
    errorCode: S.optional(EventErrorCode),
    destinationStageArn: S.optional(S.String),
    destinationSessionId: S.optional(S.String),
    replica: S.optional(S.Boolean),
    previousToken: S.optional(ExchangedParticipantToken),
    newToken: S.optional(ExchangedParticipantToken),
  }),
).annotate({ identifier: "Event" }) as any as S.Schema<Event>;
export type EventList = Event[];
export const EventList = /*@__PURE__*/ S.Array(Event);
export interface ListParticipantEventsResponse {
  events: Event[];
  nextToken?: string;
}
export const ListParticipantEventsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ events: EventList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListParticipantEventsResponse",
}) as any as S.Schema<ListParticipantEventsResponse>;
export type MaxParticipantReplicaResults = number;
export interface ListParticipantReplicasRequest {
  sourceStageArn: string;
  participantId: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListParticipantReplicasRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceStageArn: S.String,
    participantId: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListParticipantReplicas" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListParticipantReplicasRequest",
}) as any as S.Schema<ListParticipantReplicasRequest>;
export interface ParticipantReplica {
  sourceStageArn: string;
  participantId: string;
  sourceSessionId: string;
  destinationStageArn: string;
  destinationSessionId: string;
  replicationState: string;
}
export const ParticipantReplica = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceStageArn: S.String,
    participantId: S.String,
    sourceSessionId: S.String,
    destinationStageArn: S.String,
    destinationSessionId: S.String,
    replicationState: S.String,
  }),
).annotate({
  identifier: "ParticipantReplica",
}) as any as S.Schema<ParticipantReplica>;
export type ParticipantReplicaList = ParticipantReplica[];
export const ParticipantReplicaList = /*@__PURE__*/ S.Array(ParticipantReplica);
export interface ListParticipantReplicasResponse {
  replicas: ParticipantReplica[];
  nextToken?: string;
}
export const ListParticipantReplicasResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    replicas: ParticipantReplicaList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListParticipantReplicasResponse",
}) as any as S.Schema<ListParticipantReplicasResponse>;
export type MaxParticipantResults = number;
export type ParticipantRecordingFilterByRecordingState = string;
export interface ListParticipantsRequest {
  stageArn: string;
  sessionId: string;
  filterByUserId?: string;
  filterByPublished?: boolean;
  filterByState?: string;
  nextToken?: string;
  maxResults?: number;
  filterByRecordingState?: string;
}
export const ListParticipantsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stageArn: S.String,
    sessionId: S.String,
    filterByUserId: S.optional(S.String),
    filterByPublished: S.optional(S.Boolean),
    filterByState: S.optional(S.String),
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
    filterByRecordingState: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListParticipants" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListParticipantsRequest",
}) as any as S.Schema<ListParticipantsRequest>;
export interface ParticipantSummary {
  participantId?: string;
  userId?: string;
  state?: string;
  firstJoinTime?: Date;
  published?: boolean;
  recordingState?: string;
  replicationType?: string;
  replicationState?: string;
  sourceStageArn?: string;
  sourceSessionId?: string;
  redundantIngest?: boolean;
  ingestConfigurationArn?: string;
}
export const ParticipantSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    participantId: S.optional(S.String),
    userId: S.optional(S.String),
    state: S.optional(S.String),
    firstJoinTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    published: S.optional(S.Boolean),
    recordingState: S.optional(S.String),
    replicationType: S.optional(S.String),
    replicationState: S.optional(S.String),
    sourceStageArn: S.optional(S.String),
    sourceSessionId: S.optional(S.String),
    redundantIngest: S.optional(S.Boolean),
    ingestConfigurationArn: S.optional(S.String),
  }),
).annotate({
  identifier: "ParticipantSummary",
}) as any as S.Schema<ParticipantSummary>;
export type ParticipantList = ParticipantSummary[];
export const ParticipantList = /*@__PURE__*/ S.Array(ParticipantSummary);
export interface ListParticipantsResponse {
  participants: ParticipantSummary[];
  nextToken?: string;
}
export const ListParticipantsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ participants: ParticipantList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListParticipantsResponse",
}) as any as S.Schema<ListParticipantsResponse>;
export type MaxPublicKeyResults = number;
export interface ListPublicKeysRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListPublicKeysRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListPublicKeys" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPublicKeysRequest",
}) as any as S.Schema<ListPublicKeysRequest>;
export interface PublicKeySummary {
  arn?: string;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export const PublicKeySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.optional(S.String),
    name: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "PublicKeySummary",
}) as any as S.Schema<PublicKeySummary>;
export type PublicKeyList = PublicKeySummary[];
export const PublicKeyList = /*@__PURE__*/ S.Array(PublicKeySummary);
export interface ListPublicKeysResponse {
  publicKeys: PublicKeySummary[];
  nextToken?: string;
}
export const ListPublicKeysResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ publicKeys: PublicKeyList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListPublicKeysResponse",
}) as any as S.Schema<ListPublicKeysResponse>;
export type MaxStageResults = number;
export interface ListStagesRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListStagesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListStages" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStagesRequest",
}) as any as S.Schema<ListStagesRequest>;
export interface StageSummary {
  arn: string;
  name?: string;
  activeSessionId?: string;
  tags?: { [key: string]: string | undefined };
}
export const StageSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    activeSessionId: S.optional(S.String),
    tags: S.optional(Tags),
  }),
).annotate({ identifier: "StageSummary" }) as any as S.Schema<StageSummary>;
export type StageSummaryList = StageSummary[];
export const StageSummaryList = /*@__PURE__*/ S.Array(StageSummary);
export interface ListStagesResponse {
  stages: StageSummary[];
  nextToken?: string;
}
export const ListStagesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stages: StageSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListStagesResponse",
}) as any as S.Schema<ListStagesResponse>;
export type MaxStageSessionResults = number;
export interface ListStageSessionsRequest {
  stageArn: string;
  nextToken?: string;
  maxResults?: number;
}
export const ListStageSessionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stageArn: S.String,
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListStageSessions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStageSessionsRequest",
}) as any as S.Schema<ListStageSessionsRequest>;
export interface StageSessionSummary {
  sessionId?: string;
  startTime?: Date;
  endTime?: Date;
}
export const StageSessionSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sessionId: S.optional(S.String),
    startTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "StageSessionSummary",
}) as any as S.Schema<StageSessionSummary>;
export type StageSessionList = StageSessionSummary[];
export const StageSessionList = /*@__PURE__*/ S.Array(StageSessionSummary);
export interface ListStageSessionsResponse {
  stageSessions: StageSessionSummary[];
  nextToken?: string;
}
export const ListStageSessionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stageSessions: StageSessionList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListStageSessionsResponse",
}) as any as S.Schema<ListStageSessionsResponse>;
export type MaxStorageConfigurationResults = number;
export interface ListStorageConfigurationsRequest {
  nextToken?: string;
  maxResults?: number;
}
export const ListStorageConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    maxResults: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/ListStorageConfigurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStorageConfigurationsRequest",
}) as any as S.Schema<ListStorageConfigurationsRequest>;
export interface StorageConfigurationSummary {
  arn: string;
  name?: string;
  s3?: S3StorageConfiguration;
  tags?: { [key: string]: string | undefined };
}
export const StorageConfigurationSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    s3: S.optional(S3StorageConfiguration),
    tags: S.optional(Tags),
  }),
).annotate({
  identifier: "StorageConfigurationSummary",
}) as any as S.Schema<StorageConfigurationSummary>;
export type StorageConfigurationSummaryList = StorageConfigurationSummary[];
export const StorageConfigurationSummaryList = /*@__PURE__*/ S.Array(
  StorageConfigurationSummary,
);
export interface ListStorageConfigurationsResponse {
  storageConfigurations: StorageConfigurationSummary[];
  nextToken?: string;
}
export const ListStorageConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    storageConfigurations: StorageConfigurationSummaryList,
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListStorageConfigurationsResponse",
}) as any as S.Schema<ListStorageConfigurationsResponse>;
export type ResourceArn = string;
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
export interface ListTagsForResourceResponse {
  tags: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: Tags }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export type CompositionClientToken = string;
export type DestinationConfigurationList = DestinationConfiguration[];
export const DestinationConfigurationList = /*@__PURE__*/ S.Array(
  DestinationConfiguration,
);
export interface StartCompositionRequest {
  stageArn: string;
  idempotencyToken?: string;
  layout?: LayoutConfiguration;
  destinations: DestinationConfiguration[];
  tags?: { [key: string]: string | undefined };
}
export const StartCompositionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    stageArn: S.String,
    idempotencyToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    layout: S.optional(LayoutConfiguration),
    destinations: DestinationConfigurationList,
    tags: S.optional(Tags),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartComposition" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartCompositionRequest",
}) as any as S.Schema<StartCompositionRequest>;
export interface StartCompositionResponse {
  composition?: Composition;
}
export const StartCompositionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ composition: S.optional(Composition) }),
).annotate({
  identifier: "StartCompositionResponse",
}) as any as S.Schema<StartCompositionResponse>;
export type ReconnectWindowSeconds = number;
export interface StartParticipantReplicationRequest {
  sourceStageArn: string;
  destinationStageArn: string;
  participantId: string;
  reconnectWindowSeconds?: number;
  attributes?: { [key: string]: string | undefined };
}
export const StartParticipantReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceStageArn: S.String,
    destinationStageArn: S.String,
    participantId: S.String,
    reconnectWindowSeconds: S.optional(S.Number),
    attributes: S.optional(ParticipantAttributes),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StartParticipantReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartParticipantReplicationRequest",
}) as any as S.Schema<StartParticipantReplicationRequest>;
export interface StartParticipantReplicationResponse {
  accessControlAllowOrigin?: string;
  accessControlExposeHeaders?: string;
  cacheControl?: string;
  contentSecurityPolicy?: string;
  strictTransportSecurity?: string;
  xContentTypeOptions?: string;
  xFrameOptions?: string;
}
export const StartParticipantReplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessControlAllowOrigin: S.optional(S.String).pipe(
      T.HttpHeader("Access-Control-Allow-Origin"),
    ),
    accessControlExposeHeaders: S.optional(S.String).pipe(
      T.HttpHeader("Access-Control-Expose-Headers"),
    ),
    cacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
    contentSecurityPolicy: S.optional(S.String).pipe(
      T.HttpHeader("Content-Security-Policy"),
    ),
    strictTransportSecurity: S.optional(S.String).pipe(
      T.HttpHeader("Strict-Transport-Security"),
    ),
    xContentTypeOptions: S.optional(S.String).pipe(
      T.HttpHeader("X-Content-Type-Options"),
    ),
    xFrameOptions: S.optional(S.String).pipe(T.HttpHeader("X-Frame-Options")),
  }),
).annotate({
  identifier: "StartParticipantReplicationResponse",
}) as any as S.Schema<StartParticipantReplicationResponse>;
export interface StopCompositionRequest {
  arn: string;
}
export const StopCompositionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopComposition" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopCompositionRequest",
}) as any as S.Schema<StopCompositionRequest>;
export interface StopCompositionResponse {}
export const StopCompositionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopCompositionResponse",
}) as any as S.Schema<StopCompositionResponse>;
export interface StopParticipantReplicationRequest {
  sourceStageArn: string;
  destinationStageArn: string;
  participantId: string;
}
export const StopParticipantReplicationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    sourceStageArn: S.String,
    destinationStageArn: S.String,
    participantId: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/StopParticipantReplication" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopParticipantReplicationRequest",
}) as any as S.Schema<StopParticipantReplicationRequest>;
export interface StopParticipantReplicationResponse {
  accessControlAllowOrigin?: string;
  accessControlExposeHeaders?: string;
  cacheControl?: string;
  contentSecurityPolicy?: string;
  strictTransportSecurity?: string;
  xContentTypeOptions?: string;
  xFrameOptions?: string;
}
export const StopParticipantReplicationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accessControlAllowOrigin: S.optional(S.String).pipe(
      T.HttpHeader("Access-Control-Allow-Origin"),
    ),
    accessControlExposeHeaders: S.optional(S.String).pipe(
      T.HttpHeader("Access-Control-Expose-Headers"),
    ),
    cacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
    contentSecurityPolicy: S.optional(S.String).pipe(
      T.HttpHeader("Content-Security-Policy"),
    ),
    strictTransportSecurity: S.optional(S.String).pipe(
      T.HttpHeader("Strict-Transport-Security"),
    ),
    xContentTypeOptions: S.optional(S.String).pipe(
      T.HttpHeader("X-Content-Type-Options"),
    ),
    xFrameOptions: S.optional(S.String).pipe(T.HttpHeader("X-Frame-Options")),
  }),
).annotate({
  identifier: "StopParticipantReplicationResponse",
}) as any as S.Schema<StopParticipantReplicationResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: Tags,
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
export interface UpdateIngestConfigurationRequest {
  arn: string;
  stageArn?: string;
  redundantIngest?: boolean;
}
export const UpdateIngestConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    stageArn: S.optional(S.String),
    redundantIngest: S.optional(S.Boolean),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateIngestConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateIngestConfigurationRequest",
}) as any as S.Schema<UpdateIngestConfigurationRequest>;
export interface UpdateIngestConfigurationResponse {
  ingestConfiguration?: IngestConfiguration;
}
export const UpdateIngestConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ingestConfiguration: S.optional(IngestConfiguration) }),
).annotate({
  identifier: "UpdateIngestConfigurationResponse",
}) as any as S.Schema<UpdateIngestConfigurationResponse>;
export interface UpdateStageRequest {
  arn: string;
  name?: string;
  autoParticipantRecordingConfiguration?: AutoParticipantRecordingConfiguration;
}
export const UpdateStageRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.optional(S.String),
    autoParticipantRecordingConfiguration: S.optional(
      AutoParticipantRecordingConfiguration,
    ),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/UpdateStage" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateStageRequest",
}) as any as S.Schema<UpdateStageRequest>;
export interface UpdateStageResponse {
  stage?: Stage;
}
export const UpdateStageResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ stage: S.optional(Stage) }),
).annotate({
  identifier: "UpdateStageResponse",
}) as any as S.Schema<UpdateStageResponse>;
export type ErrorMessage = string;
export type CreateEncoderConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an EncoderConfiguration object.
 */
export const createEncoderConfiguration: API.OperationMethod<
  CreateEncoderConfigurationRequest,
  CreateEncoderConfigurationResponse,
  CreateEncoderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEncoderConfigurationRequest,
  output: CreateEncoderConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEncoderConfiguration",
}));

export type CreateIngestConfigurationError =
  | AccessDeniedException
  | PendingVerification
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new IngestConfiguration resource, used to specify the ingest protocol for a stage.
 */
export const createIngestConfiguration: API.OperationMethod<
  CreateIngestConfigurationRequest,
  CreateIngestConfigurationResponse,
  CreateIngestConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateIngestConfigurationRequest,
  output: CreateIngestConfigurationResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIngestConfiguration",
}));

export type CreateParticipantTokenError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an additional token for a specified stage. This can be done after stage creation
 * or when tokens expire. Tokens always are scoped to the stage for which they are
 * created.
 *
 * Encryption keys are owned by Amazon IVS and never used directly by your
 * application.
 */
export const createParticipantToken: API.OperationMethod<
  CreateParticipantTokenRequest,
  CreateParticipantTokenResponse,
  CreateParticipantTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateParticipantTokenRequest,
  output: CreateParticipantTokenResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateParticipantToken",
}));

export type CreateStageError =
  | AccessDeniedException
  | PendingVerification
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a new stage (and optionally participant tokens).
 */
export const createStage: API.OperationMethod<
  CreateStageRequest,
  CreateStageResponse,
  CreateStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStageRequest,
  output: CreateStageResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStage",
}));

export type CreateStorageConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new storage configuration, used to enable recording to Amazon S3.
 * When a StorageConfiguration is created, IVS will modify the S3 bucketPolicy of the provided bucket.
 * This will ensure that IVS has sufficient permissions to write content to the provided bucket.
 */
export const createStorageConfiguration: API.OperationMethod<
  CreateStorageConfigurationRequest,
  CreateStorageConfigurationResponse,
  CreateStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStorageConfigurationRequest,
  output: CreateStorageConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageConfiguration",
}));

export type DeleteEncoderConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an EncoderConfiguration resource. Ensures that no Compositions are using this
 * template; otherwise, returns an error.
 */
export const deleteEncoderConfiguration: API.OperationMethod<
  DeleteEncoderConfigurationRequest,
  DeleteEncoderConfigurationResponse,
  DeleteEncoderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEncoderConfigurationRequest,
  output: DeleteEncoderConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEncoderConfiguration",
}));

export type DeleteIngestConfigurationError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified IngestConfiguration, so it can no longer be used to broadcast. An IngestConfiguration cannot be deleted if the publisher is actively streaming to a stage, unless `force` is set to `true`.
 */
export const deleteIngestConfiguration: API.OperationMethod<
  DeleteIngestConfigurationRequest,
  DeleteIngestConfigurationResponse,
  DeleteIngestConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteIngestConfigurationRequest,
  output: DeleteIngestConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIngestConfiguration",
}));

export type DeletePublicKeyError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified public key used to sign stage participant tokens.
 * This invalidates future participant tokens generated using the key pair’s private key.
 */
export const deletePublicKey: API.OperationMethod<
  DeletePublicKeyRequest,
  DeletePublicKeyResponse,
  DeletePublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePublicKeyRequest,
  output: DeletePublicKeyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePublicKey",
}));

export type DeleteStageError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Shuts down and deletes the specified stage (disconnecting all participants). This operation also
 * removes the `stageArn` from the associated IngestConfiguration, if there are participants
 * using the IngestConfiguration to publish to the stage.
 */
export const deleteStage: API.OperationMethod<
  DeleteStageRequest,
  DeleteStageResponse,
  DeleteStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStageRequest,
  output: DeleteStageResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStage",
}));

export type DeleteStorageConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the storage configuration for the specified ARN.
 *
 * If you try to delete a storage configuration that is used by a Composition, you will get an error (409 ConflictException).
 * To avoid this, for all Compositions that reference the storage configuration, first use StopComposition and wait for it to complete,
 * then use DeleteStorageConfiguration.
 */
export const deleteStorageConfiguration: API.OperationMethod<
  DeleteStorageConfigurationRequest,
  DeleteStorageConfigurationResponse,
  DeleteStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStorageConfigurationRequest,
  output: DeleteStorageConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageConfiguration",
}));

export type DisconnectParticipantError =
  | AccessDeniedException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Disconnects a specified participant from a specified stage. If the participant is publishing using
 * an IngestConfiguration, DisconnectParticipant also updates the `stageArn`
 * in the IngestConfiguration to be an empty string.
 */
export const disconnectParticipant: API.OperationMethod<
  DisconnectParticipantRequest,
  DisconnectParticipantResponse,
  DisconnectParticipantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisconnectParticipantRequest,
  output: DisconnectParticipantResponse,
  errors: [
    AccessDeniedException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisconnectParticipant",
}));

export type GetCompositionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Get information about the specified Composition resource.
 */
export const getComposition: API.OperationMethod<
  GetCompositionRequest,
  GetCompositionResponse,
  GetCompositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCompositionRequest,
  output: GetCompositionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComposition",
}));

export type GetEncoderConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified EncoderConfiguration resource.
 */
export const getEncoderConfiguration: API.OperationMethod<
  GetEncoderConfigurationRequest,
  GetEncoderConfigurationResponse,
  GetEncoderConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEncoderConfigurationRequest,
  output: GetEncoderConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEncoderConfiguration",
}));

export type GetIngestConfigurationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified IngestConfiguration.
 */
export const getIngestConfiguration: API.OperationMethod<
  GetIngestConfigurationRequest,
  GetIngestConfigurationResponse,
  GetIngestConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetIngestConfigurationRequest,
  output: GetIngestConfigurationResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIngestConfiguration",
}));

export type GetParticipantError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified participant token.
 */
export const getParticipant: API.OperationMethod<
  GetParticipantRequest,
  GetParticipantResponse,
  GetParticipantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetParticipantRequest,
  output: GetParticipantResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetParticipant",
}));

export type GetPublicKeyError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information for the specified public key.
 */
export const getPublicKey: API.OperationMethod<
  GetPublicKeyRequest,
  GetPublicKeyResponse,
  GetPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPublicKeyRequest,
  output: GetPublicKeyResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPublicKey",
}));

export type GetStageError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information for the specified stage.
 */
export const getStage: API.OperationMethod<
  GetStageRequest,
  GetStageResponse,
  GetStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStageRequest,
  output: GetStageResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStage",
}));

export type GetStageSessionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information for the specified stage session.
 */
export const getStageSession: API.OperationMethod<
  GetStageSessionRequest,
  GetStageSessionResponse,
  GetStageSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStageSessionRequest,
  output: GetStageSessionResponse,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStageSession",
}));

export type GetStorageConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Gets the storage configuration for the specified ARN.
 */
export const getStorageConfiguration: API.OperationMethod<
  GetStorageConfigurationRequest,
  GetStorageConfigurationResponse,
  GetStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetStorageConfigurationRequest,
  output: GetStorageConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageConfiguration",
}));

export type ImportPublicKeyError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Import a public key to be used for signing stage participant tokens.
 */
export const importPublicKey: API.OperationMethod<
  ImportPublicKeyRequest,
  ImportPublicKeyResponse,
  ImportPublicKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ImportPublicKeyRequest,
  output: ImportPublicKeyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportPublicKey",
}));

export type ListCompositionsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about all Compositions in your account, in the AWS region
 * where the API request is processed.
 */
export const listCompositions: API.PaginatedOperationMethod<
  ListCompositionsRequest,
  ListCompositionsResponse,
  ListCompositionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCompositionsRequest,
  output: ListCompositionsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCompositions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEncoderConfigurationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about all EncoderConfigurations in your account, in the AWS
 * region where the API request is processed.
 */
export const listEncoderConfigurations: API.PaginatedOperationMethod<
  ListEncoderConfigurationsRequest,
  ListEncoderConfigurationsResponse,
  ListEncoderConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEncoderConfigurationsRequest,
  output: ListEncoderConfigurationsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEncoderConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIngestConfigurationsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all IngestConfigurations in your account, in the AWS region where the API request is processed.
 */
export const listIngestConfigurations: API.PaginatedOperationMethod<
  ListIngestConfigurationsRequest,
  ListIngestConfigurationsResponse,
  ListIngestConfigurationsError,
  Credentials | HttpClient.HttpClient,
  IngestConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListIngestConfigurationsRequest,
  output: ListIngestConfigurationsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIngestConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ingestConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListParticipantEventsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists events for a specified participant that occurred during a specified stage
 * session.
 */
export const listParticipantEvents: API.PaginatedOperationMethod<
  ListParticipantEventsRequest,
  ListParticipantEventsResponse,
  ListParticipantEventsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListParticipantEventsRequest,
  output: ListParticipantEventsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListParticipantEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListParticipantReplicasError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the replicas for a participant from a source stage.
 */
export const listParticipantReplicas: API.PaginatedOperationMethod<
  ListParticipantReplicasRequest,
  ListParticipantReplicasResponse,
  ListParticipantReplicasError,
  Credentials | HttpClient.HttpClient,
  ParticipantReplica
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListParticipantReplicasRequest,
  output: ListParticipantReplicasResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListParticipantReplicas",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "replicas",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListParticipantsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all participants in a specified stage session.
 */
export const listParticipants: API.PaginatedOperationMethod<
  ListParticipantsRequest,
  ListParticipantsResponse,
  ListParticipantsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListParticipantsRequest,
  output: ListParticipantsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListParticipants",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPublicKeysError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about all public keys in your account, in the AWS region where the API request is processed.
 */
export const listPublicKeys: API.PaginatedOperationMethod<
  ListPublicKeysRequest,
  ListPublicKeysResponse,
  ListPublicKeysError,
  Credentials | HttpClient.HttpClient,
  PublicKeySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPublicKeysRequest,
  output: ListPublicKeysResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPublicKeys",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "publicKeys",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStagesError =
  | AccessDeniedException
  | ConflictException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets summary information about all stages in your account, in the AWS region where the
 * API request is processed.
 */
export const listStages: API.PaginatedOperationMethod<
  ListStagesRequest,
  ListStagesResponse,
  ListStagesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStagesRequest,
  output: ListStagesResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStages",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStageSessionsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
/**
 * Gets all sessions for a specified stage.
 */
export const listStageSessions: API.PaginatedOperationMethod<
  ListStageSessionsRequest,
  ListStageSessionsResponse,
  ListStageSessionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStageSessionsRequest,
  output: ListStageSessionsResponse,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStageSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListStorageConfigurationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Gets summary information about all storage configurations in your account,
 * in the AWS region where the API request is processed.
 */
export const listStorageConfigurations: API.PaginatedOperationMethod<
  ListStorageConfigurationsRequest,
  ListStorageConfigurationsResponse,
  ListStorageConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStorageConfigurationsRequest,
  output: ListStorageConfigurationsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStorageConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about AWS tags for the specified ARN.
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
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartCompositionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Starts a Composition from a stage based on the configuration provided in the
 * request.
 *
 * A Composition is an ephemeral resource that exists after this operation returns
 * successfully. Composition stops and the resource is deleted:
 *
 * - When StopComposition is called.
 *
 * - After a 1-minute timeout, when all participants are disconnected from the
 * stage.
 *
 * - After a 1-minute timeout, if there are no participants in the stage when
 * StartComposition is called.
 *
 * - When broadcasting to the IVS channel fails and all retries are exhausted.
 *
 * - When broadcasting is disconnected and all attempts to reconnect are
 * exhausted.
 */
export const startComposition: API.OperationMethod<
  StartCompositionRequest,
  StartCompositionResponse,
  StartCompositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartCompositionRequest,
  output: StartCompositionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartComposition",
}));

export type StartParticipantReplicationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Starts replicating a publishing participant from a source stage to a destination stage.
 */
export const startParticipantReplication: API.OperationMethod<
  StartParticipantReplicationRequest,
  StartParticipantReplicationResponse,
  StartParticipantReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartParticipantReplicationRequest,
  output: StartParticipantReplicationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartParticipantReplication",
}));

export type StopCompositionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Stops and deletes a Composition resource. Any broadcast from the Composition resource
 * is stopped.
 */
export const stopComposition: API.OperationMethod<
  StopCompositionRequest,
  StopCompositionResponse,
  StopCompositionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopCompositionRequest,
  output: StopCompositionResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopComposition",
}));

export type StopParticipantReplicationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops a replicated participant session.
 */
export const stopParticipantReplication: API.OperationMethod<
  StopParticipantReplicationRequest,
  StopParticipantReplicationResponse,
  StopParticipantReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopParticipantReplicationRequest,
  output: StopParticipantReplicationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopParticipantReplication",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds or updates tags for the AWS resource with the specified ARN.
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
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes tags from the resource with the specified ARN.
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
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateIngestConfigurationError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a specified IngestConfiguration. Only the stage ARN attached to the IngestConfiguration can be updated. An IngestConfiguration that is active cannot be updated.
 */
export const updateIngestConfiguration: API.OperationMethod<
  UpdateIngestConfigurationRequest,
  UpdateIngestConfigurationResponse,
  UpdateIngestConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateIngestConfigurationRequest,
  output: UpdateIngestConfigurationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIngestConfiguration",
}));

export type UpdateStageError =
  | AccessDeniedException
  | ConflictException
  | PendingVerification
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates a stage’s configuration.
 */
export const updateStage: API.OperationMethod<
  UpdateStageRequest,
  UpdateStageResponse,
  UpdateStageError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStageRequest,
  output: UpdateStageResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    PendingVerification,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStage",
}));
