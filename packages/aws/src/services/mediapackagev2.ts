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
  sdkId: "MediaPackageV2",
  serviceShapeName: "mediapackagev2",
});
const auth = T.AwsAuthSigv4({ name: "mediapackagev2" });
const ver = T.ServiceVersion("2022-12-25");
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
              `https://mediapackagev2-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mediapackagev2-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mediapackagev2.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://mediapackagev2.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
      ConflictExceptionType: S.optional(
        S.suspend(() => ConflictExceptionType).annotate({
          identifier: "ConflictExceptionType",
        }),
      ),
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
      ResourceTypeNotFound: S.optional(
        S.suspend(() => ResourceTypeNotFound).annotate({
          identifier: "ResourceTypeNotFound",
        }),
      ),
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
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ValidationExceptionType: S.optional(
        S.suspend(() => ValidationExceptionType).annotate({
          identifier: "ValidationExceptionType",
        }),
      ),
    },
  ) {}
export type ResourceName = string;
export type EntityTag = string;
export interface CancelHarvestJobRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  HarvestJobName: string;
  ETag?: string;
}
export const CancelHarvestJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
    HarvestJobName: S.String.pipe(T.HttpLabel("HarvestJobName")),
    ETag: S.optional(S.String).pipe(T.HttpHeader("x-amzn-update-if-match")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/harvestJob/{HarvestJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelHarvestJobRequest",
}) as any as S.Schema<CancelHarvestJobRequest>;
export interface CancelHarvestJobResponse {}
export const CancelHarvestJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelHarvestJobResponse",
}) as any as S.Schema<CancelHarvestJobResponse>;
export type IdempotencyToken = string;
export type InputType = "HLS" | "CMAF" | (string & {});
export const InputType = S.String;

export type ResourceDescription = string;
export interface InputSwitchConfiguration {
  MQCSInputSwitching?: boolean;
  PreferredInput?: number;
}
export const InputSwitchConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MQCSInputSwitching: S.optional(S.Boolean),
    PreferredInput: S.optional(S.Number),
  }),
).annotate({
  identifier: "InputSwitchConfiguration",
}) as any as S.Schema<InputSwitchConfiguration>;
export interface OutputHeaderConfiguration {
  PublishMQCS?: boolean;
}
export const OutputHeaderConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PublishMQCS: S.optional(S.Boolean) }),
).annotate({
  identifier: "OutputHeaderConfiguration",
}) as any as S.Schema<OutputHeaderConfiguration>;
export type OutputLockingMode =
  | "EPOCH_LOCKED"
  | "NON_EPOCH_LOCKED"
  | (string & {});
export const OutputLockingMode = S.String;

export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateChannelRequest {
  ChannelGroupName: string;
  ChannelName: string;
  ClientToken?: string;
  InputType?: InputType;
  Description?: string;
  InputSwitchConfiguration?: InputSwitchConfiguration;
  OutputHeaderConfiguration?: OutputHeaderConfiguration;
  OutputLockingMode?: OutputLockingMode;
  Tags?: { [key: string]: string | undefined };
}
export const CreateChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String,
    ClientToken: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-client-token"),
      T.IdempotencyToken(),
    ),
    InputType: S.optional(InputType),
    Description: S.optional(S.String),
    InputSwitchConfiguration: S.optional(InputSwitchConfiguration),
    OutputHeaderConfiguration: S.optional(OutputHeaderConfiguration),
    OutputLockingMode: S.optional(OutputLockingMode),
    Tags: S.optional(TagMap),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/channelGroup/{ChannelGroupName}/channel",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateChannelRequest",
}) as any as S.Schema<CreateChannelRequest>;
export interface IngestEndpoint {
  Id?: string;
  Url?: string;
}
export const IngestEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String), Url: S.optional(S.String) }),
).annotate({ identifier: "IngestEndpoint" }) as any as S.Schema<IngestEndpoint>;
export type IngestEndpointList = IngestEndpoint[];
export const IngestEndpointList = /*@__PURE__*/ S.Array(IngestEndpoint);
export interface CreateChannelResponse {
  Arn: string;
  ChannelName: string;
  ChannelGroupName: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  IngestEndpoints?: IngestEndpoint[];
  InputType?: InputType;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
  InputSwitchConfiguration?: InputSwitchConfiguration;
  OutputHeaderConfiguration?: OutputHeaderConfiguration;
  OutputLockingMode?: OutputLockingMode;
}
export const CreateChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    ChannelName: S.String,
    ChannelGroupName: S.String,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Description: S.optional(S.String),
    IngestEndpoints: S.optional(IngestEndpointList),
    InputType: S.optional(InputType),
    ETag: S.optional(S.String),
    Tags: S.optional(TagMap),
    InputSwitchConfiguration: S.optional(InputSwitchConfiguration),
    OutputHeaderConfiguration: S.optional(OutputHeaderConfiguration),
    OutputLockingMode: S.optional(OutputLockingMode),
  }),
).annotate({
  identifier: "CreateChannelResponse",
}) as any as S.Schema<CreateChannelResponse>;
export interface CreateChannelGroupRequest {
  ChannelGroupName: string;
  ClientToken?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateChannelGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String,
    ClientToken: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-client-token"),
      T.IdempotencyToken(),
    ),
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/channelGroup" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateChannelGroupRequest",
}) as any as S.Schema<CreateChannelGroupRequest>;
export interface CreateChannelGroupResponse {
  ChannelGroupName: string;
  Arn: string;
  EgressDomain: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  ETag?: string;
  Description?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateChannelGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String,
    Arn: S.String,
    EgressDomain: S.String,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ETag: S.optional(S.String),
    Description: S.optional(S.String),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateChannelGroupResponse",
}) as any as S.Schema<CreateChannelGroupResponse>;
export interface HarvestedHlsManifest {
  ManifestName: string;
}
export const HarvestedHlsManifest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManifestName: S.String }),
).annotate({
  identifier: "HarvestedHlsManifest",
}) as any as S.Schema<HarvestedHlsManifest>;
export type HarvestedHlsManifestsList = HarvestedHlsManifest[];
export const HarvestedHlsManifestsList =
  /*@__PURE__*/ S.Array(HarvestedHlsManifest);
export interface HarvestedDashManifest {
  ManifestName: string;
}
export const HarvestedDashManifest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManifestName: S.String }),
).annotate({
  identifier: "HarvestedDashManifest",
}) as any as S.Schema<HarvestedDashManifest>;
export type HarvestedDashManifestsList = HarvestedDashManifest[];
export const HarvestedDashManifestsList = /*@__PURE__*/ S.Array(
  HarvestedDashManifest,
);
export interface HarvestedLowLatencyHlsManifest {
  ManifestName: string;
}
export const HarvestedLowLatencyHlsManifest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManifestName: S.String }),
).annotate({
  identifier: "HarvestedLowLatencyHlsManifest",
}) as any as S.Schema<HarvestedLowLatencyHlsManifest>;
export type HarvestedLowLatencyHlsManifestsList =
  HarvestedLowLatencyHlsManifest[];
export const HarvestedLowLatencyHlsManifestsList = /*@__PURE__*/ S.Array(
  HarvestedLowLatencyHlsManifest,
);
export interface HarvestedManifests {
  HlsManifests?: HarvestedHlsManifest[];
  DashManifests?: HarvestedDashManifest[];
  LowLatencyHlsManifests?: HarvestedLowLatencyHlsManifest[];
}
export const HarvestedManifests = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HlsManifests: S.optional(HarvestedHlsManifestsList),
    DashManifests: S.optional(HarvestedDashManifestsList),
    LowLatencyHlsManifests: S.optional(HarvestedLowLatencyHlsManifestsList),
  }),
).annotate({
  identifier: "HarvestedManifests",
}) as any as S.Schema<HarvestedManifests>;
export interface HarvesterScheduleConfiguration {
  StartTime: Date;
  EndTime: Date;
}
export const HarvesterScheduleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "HarvesterScheduleConfiguration",
}) as any as S.Schema<HarvesterScheduleConfiguration>;
export type S3BucketName = string;
export type S3DestinationPath = string;
export interface S3DestinationConfig {
  BucketName: string;
  DestinationPath: string;
}
export const S3DestinationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BucketName: S.String, DestinationPath: S.String }),
).annotate({
  identifier: "S3DestinationConfig",
}) as any as S.Schema<S3DestinationConfig>;
export interface Destination {
  S3Destination: S3DestinationConfig;
}
export const Destination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Destination: S3DestinationConfig }),
).annotate({ identifier: "Destination" }) as any as S.Schema<Destination>;
export interface CreateHarvestJobRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Description?: string;
  HarvestedManifests: HarvestedManifests;
  ScheduleConfiguration: HarvesterScheduleConfiguration;
  Destination: Destination;
  ClientToken?: string;
  HarvestJobName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateHarvestJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
    Description: S.optional(S.String),
    HarvestedManifests: HarvestedManifests,
    ScheduleConfiguration: HarvesterScheduleConfiguration,
    Destination: Destination,
    ClientToken: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-client-token"),
      T.IdempotencyToken(),
    ),
    HarvestJobName: S.optional(S.String),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/harvestJob",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateHarvestJobRequest",
}) as any as S.Schema<CreateHarvestJobRequest>;
export type HarvestJobStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "CANCELLED"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export const HarvestJobStatus = S.String;

export interface CreateHarvestJobResponse {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Destination: Destination;
  HarvestJobName: string;
  HarvestedManifests: HarvestedManifests;
  Description?: string;
  ScheduleConfiguration: HarvesterScheduleConfiguration;
  Arn: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Status: HarvestJobStatus;
  ErrorMessage?: string;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateHarvestJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String,
    ChannelName: S.String,
    OriginEndpointName: S.String,
    Destination: Destination,
    HarvestJobName: S.String,
    HarvestedManifests: HarvestedManifests,
    Description: S.optional(S.String),
    ScheduleConfiguration: HarvesterScheduleConfiguration,
    Arn: S.String,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Status: HarvestJobStatus,
    ErrorMessage: S.optional(S.String),
    ETag: S.optional(S.String),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateHarvestJobResponse",
}) as any as S.Schema<CreateHarvestJobResponse>;
export type ContainerType = "TS" | "CMAF" | "ISM" | (string & {});
export const ContainerType = S.String;

export type ScteFilter =
  | "SPLICE_INSERT"
  | "BREAK"
  | "PROVIDER_ADVERTISEMENT"
  | "DISTRIBUTOR_ADVERTISEMENT"
  | "PROVIDER_PLACEMENT_OPPORTUNITY"
  | "DISTRIBUTOR_PLACEMENT_OPPORTUNITY"
  | "PROVIDER_OVERLAY_PLACEMENT_OPPORTUNITY"
  | "DISTRIBUTOR_OVERLAY_PLACEMENT_OPPORTUNITY"
  | "PROGRAM"
  | "CHAPTER"
  | "UNSCHEDULED_EVENT"
  | "ALTERNATE_CONTENT_OPPORTUNITY"
  | "NETWORK"
  | "PROVIDER_PROMO"
  | "DISTRIBUTOR_PROMO"
  | "PROVIDER_AD_BLOCK"
  | "DISTRIBUTOR_AD_BLOCK"
  | "CONTENT_IDENTIFICATION"
  | "CALL_AD_SERVER"
  | (string & {});
export const ScteFilter = S.String;

export type ScteFilterList = ScteFilter[];
export const ScteFilterList = /*@__PURE__*/ S.Array(ScteFilter);
export type ScteInSegments = "NONE" | "ALL" | "MATCHES_FILTER" | (string & {});
export const ScteInSegments = S.String;

export type CustomAdType =
  | "PROGRAM"
  | "CHAPTER"
  | "UNSCHEDULED_EVENT"
  | "ALTERNATE_CONTENT_OPPORTUNITY"
  | "NETWORK"
  | (string & {});
export const CustomAdType = S.String;

export type CustomAdTypeList = CustomAdType[];
export const CustomAdTypeList = /*@__PURE__*/ S.Array(CustomAdType);
export interface Scte {
  ScteFilter?: ScteFilter[];
  ScteInSegments?: ScteInSegments;
  CustomAdTypes?: CustomAdType[];
}
export const Scte = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScteFilter: S.optional(ScteFilterList),
    ScteInSegments: S.optional(ScteInSegments),
    CustomAdTypes: S.optional(CustomAdTypeList),
  }),
).annotate({ identifier: "Scte" }) as any as S.Schema<Scte>;
export type TsEncryptionMethod = "AES_128" | "SAMPLE_AES" | (string & {});
export const TsEncryptionMethod = S.String;

export type CmafEncryptionMethod = "CENC" | "CBCS" | (string & {});
export const CmafEncryptionMethod = S.String;

export type IsmEncryptionMethod = "CENC" | (string & {});
export const IsmEncryptionMethod = S.String;

export interface EncryptionMethod {
  TsEncryptionMethod?: TsEncryptionMethod;
  CmafEncryptionMethod?: CmafEncryptionMethod;
  IsmEncryptionMethod?: IsmEncryptionMethod;
}
export const EncryptionMethod = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TsEncryptionMethod: S.optional(TsEncryptionMethod),
    CmafEncryptionMethod: S.optional(CmafEncryptionMethod),
    IsmEncryptionMethod: S.optional(IsmEncryptionMethod),
  }),
).annotate({
  identifier: "EncryptionMethod",
}) as any as S.Schema<EncryptionMethod>;
export type PresetSpeke20Audio =
  | "PRESET_AUDIO_1"
  | "PRESET_AUDIO_2"
  | "PRESET_AUDIO_3"
  | "SHARED"
  | "UNENCRYPTED"
  | (string & {});
export const PresetSpeke20Audio = S.String;

export type PresetSpeke20Video =
  | "PRESET_VIDEO_1"
  | "PRESET_VIDEO_2"
  | "PRESET_VIDEO_3"
  | "PRESET_VIDEO_4"
  | "PRESET_VIDEO_5"
  | "PRESET_VIDEO_6"
  | "PRESET_VIDEO_7"
  | "PRESET_VIDEO_8"
  | "SHARED"
  | "UNENCRYPTED"
  | (string & {});
export const PresetSpeke20Video = S.String;

export interface EncryptionContractConfiguration {
  PresetSpeke20Audio: PresetSpeke20Audio;
  PresetSpeke20Video: PresetSpeke20Video;
}
export const EncryptionContractConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PresetSpeke20Audio: PresetSpeke20Audio,
    PresetSpeke20Video: PresetSpeke20Video,
  }),
).annotate({
  identifier: "EncryptionContractConfiguration",
}) as any as S.Schema<EncryptionContractConfiguration>;
export type DrmSystem =
  | "CLEAR_KEY_AES_128"
  | "FAIRPLAY"
  | "PLAYREADY"
  | "WIDEVINE"
  | "IRDETO"
  | (string & {});
export const DrmSystem = S.String;

export type DrmSystems = DrmSystem[];
export const DrmSystems = /*@__PURE__*/ S.Array(DrmSystem);
export interface SpekeKeyProvider {
  EncryptionContractConfiguration: EncryptionContractConfiguration;
  ResourceId: string;
  DrmSystems: DrmSystem[];
  RoleArn: string;
  Url: string;
  CertificateArn?: string;
}
export const SpekeKeyProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionContractConfiguration: EncryptionContractConfiguration,
    ResourceId: S.String,
    DrmSystems: DrmSystems,
    RoleArn: S.String,
    Url: S.String,
    CertificateArn: S.optional(S.String),
  }),
).annotate({
  identifier: "SpekeKeyProvider",
}) as any as S.Schema<SpekeKeyProvider>;
export interface Encryption {
  ConstantInitializationVector?: string;
  EncryptionMethod: EncryptionMethod;
  KeyRotationIntervalSeconds?: number;
  CmafExcludeSegmentDrmMetadata?: boolean;
  SpekeKeyProvider: SpekeKeyProvider;
}
export const Encryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConstantInitializationVector: S.optional(S.String),
    EncryptionMethod: EncryptionMethod,
    KeyRotationIntervalSeconds: S.optional(S.Number),
    CmafExcludeSegmentDrmMetadata: S.optional(S.Boolean),
    SpekeKeyProvider: SpekeKeyProvider,
  }),
).annotate({ identifier: "Encryption" }) as any as S.Schema<Encryption>;
export type OutputTimestampMode =
  | "PASSTHROUGH"
  | "REBASED_TO_CHANNEL_START"
  | (string & {});
export const OutputTimestampMode = S.String;

export interface Segment {
  SegmentDurationSeconds?: number;
  SegmentName?: string;
  TsUseAudioRenditionGroup?: boolean;
  IncludeIframeOnlyStreams?: boolean;
  TsIncludeDvbSubtitles?: boolean;
  Scte?: Scte;
  Encryption?: Encryption;
  OutputTimestampMode?: OutputTimestampMode;
}
export const Segment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SegmentDurationSeconds: S.optional(S.Number),
    SegmentName: S.optional(S.String),
    TsUseAudioRenditionGroup: S.optional(S.Boolean),
    IncludeIframeOnlyStreams: S.optional(S.Boolean),
    TsIncludeDvbSubtitles: S.optional(S.Boolean),
    Scte: S.optional(Scte),
    Encryption: S.optional(Encryption),
    OutputTimestampMode: S.optional(OutputTimestampMode),
  }),
).annotate({ identifier: "Segment" }) as any as S.Schema<Segment>;
export type ManifestName = string;
export type AdMarkerHls = "DATERANGE" | "SCTE35_ENHANCED" | (string & {});
export const AdMarkerHls = S.String;

export type ScteInManifests = "ALL" | "MATCHES_FILTER" | (string & {});
export const ScteInManifests = S.String;

export interface ScteHls {
  AdMarkerHls?: AdMarkerHls;
  ScteInManifests?: ScteInManifests;
}
export const ScteHls = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdMarkerHls: S.optional(AdMarkerHls),
    ScteInManifests: S.optional(ScteInManifests),
  }),
).annotate({ identifier: "ScteHls" }) as any as S.Schema<ScteHls>;
export interface StartTag {
  TimeOffset: number;
  Precise?: boolean;
}
export const StartTag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TimeOffset: S.Number, Precise: S.optional(S.Boolean) }),
).annotate({ identifier: "StartTag" }) as any as S.Schema<StartTag>;
export interface FilterConfiguration {
  ManifestFilter?: string;
  DrmSettings?: string;
  Start?: Date;
  End?: Date;
  TimeDelaySeconds?: number;
  ClipStartTime?: Date;
}
export const FilterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestFilter: S.optional(S.String),
    DrmSettings: S.optional(S.String),
    Start: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    End: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TimeDelaySeconds: S.optional(S.Number),
    ClipStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "FilterConfiguration",
}) as any as S.Schema<FilterConfiguration>;
export type UriPathType = "LEAF" | "ROOT" | (string & {});
export const UriPathType = S.String;

export interface CreateHlsManifestConfiguration {
  ManifestName: string;
  ChildManifestName?: string;
  ScteHls?: ScteHls;
  StartTag?: StartTag;
  ManifestWindowSeconds?: number;
  ProgramDateTimeIntervalSeconds?: number;
  FilterConfiguration?: FilterConfiguration;
  UrlEncodeChildManifest?: boolean;
  UriPathType?: UriPathType;
}
export const CreateHlsManifestConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestName: S.String,
    ChildManifestName: S.optional(S.String),
    ScteHls: S.optional(ScteHls),
    StartTag: S.optional(StartTag),
    ManifestWindowSeconds: S.optional(S.Number),
    ProgramDateTimeIntervalSeconds: S.optional(S.Number),
    FilterConfiguration: S.optional(FilterConfiguration),
    UrlEncodeChildManifest: S.optional(S.Boolean),
    UriPathType: S.optional(UriPathType),
  }),
).annotate({
  identifier: "CreateHlsManifestConfiguration",
}) as any as S.Schema<CreateHlsManifestConfiguration>;
export type CreateHlsManifests = CreateHlsManifestConfiguration[];
export const CreateHlsManifests = /*@__PURE__*/ S.Array(
  CreateHlsManifestConfiguration,
);
export interface CreateLowLatencyHlsManifestConfiguration {
  ManifestName: string;
  ChildManifestName?: string;
  ScteHls?: ScteHls;
  StartTag?: StartTag;
  ManifestWindowSeconds?: number;
  ProgramDateTimeIntervalSeconds?: number;
  FilterConfiguration?: FilterConfiguration;
  UrlEncodeChildManifest?: boolean;
  UriPathType?: UriPathType;
}
export const CreateLowLatencyHlsManifestConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ManifestName: S.String,
      ChildManifestName: S.optional(S.String),
      ScteHls: S.optional(ScteHls),
      StartTag: S.optional(StartTag),
      ManifestWindowSeconds: S.optional(S.Number),
      ProgramDateTimeIntervalSeconds: S.optional(S.Number),
      FilterConfiguration: S.optional(FilterConfiguration),
      UrlEncodeChildManifest: S.optional(S.Boolean),
      UriPathType: S.optional(UriPathType),
    }),
).annotate({
  identifier: "CreateLowLatencyHlsManifestConfiguration",
}) as any as S.Schema<CreateLowLatencyHlsManifestConfiguration>;
export type CreateLowLatencyHlsManifests =
  CreateLowLatencyHlsManifestConfiguration[];
export const CreateLowLatencyHlsManifests = /*@__PURE__*/ S.Array(
  CreateLowLatencyHlsManifestConfiguration,
);
export type DashSegmentTemplateFormat = "NUMBER_WITH_TIMELINE" | (string & {});
export const DashSegmentTemplateFormat = S.String;

export type DashPeriodTrigger =
  | "AVAILS"
  | "DRM_KEY_ROTATION"
  | "SOURCE_CHANGES"
  | "SOURCE_DISRUPTIONS"
  | "NONE"
  | (string & {});
export const DashPeriodTrigger = S.String;

export type DashPeriodTriggers = DashPeriodTrigger[];
export const DashPeriodTriggers = /*@__PURE__*/ S.Array(DashPeriodTrigger);
export type AdMarkerDash = "BINARY" | "XML" | (string & {});
export const AdMarkerDash = S.String;

export interface ScteDash {
  AdMarkerDash?: AdMarkerDash;
  ScteInManifests?: ScteInManifests;
}
export const ScteDash = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdMarkerDash: S.optional(AdMarkerDash),
    ScteInManifests: S.optional(ScteInManifests),
  }),
).annotate({ identifier: "ScteDash" }) as any as S.Schema<ScteDash>;
export type DashDrmSignaling = "INDIVIDUAL" | "REFERENCED" | (string & {});
export const DashDrmSignaling = S.String;

export type DashUtcTimingMode =
  | "HTTP_HEAD"
  | "HTTP_ISO"
  | "HTTP_XSDATE"
  | "UTC_DIRECT"
  | (string & {});
export const DashUtcTimingMode = S.String;

export interface DashUtcTiming {
  TimingMode?: DashUtcTimingMode;
  TimingSource?: string;
}
export const DashUtcTiming = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TimingMode: S.optional(DashUtcTimingMode),
    TimingSource: S.optional(S.String),
  }),
).annotate({ identifier: "DashUtcTiming" }) as any as S.Schema<DashUtcTiming>;
export type DashProfile = "DVB_DASH" | (string & {});
export const DashProfile = S.String;

export type DashProfiles = DashProfile[];
export const DashProfiles = /*@__PURE__*/ S.Array(DashProfile);
export interface DashBaseUrl {
  Url: string;
  ServiceLocation?: string;
  DvbPriority?: number;
  DvbWeight?: number;
}
export const DashBaseUrl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Url: S.String,
    ServiceLocation: S.optional(S.String),
    DvbPriority: S.optional(S.Number),
    DvbWeight: S.optional(S.Number),
  }),
).annotate({ identifier: "DashBaseUrl" }) as any as S.Schema<DashBaseUrl>;
export type DashBaseUrls = DashBaseUrl[];
export const DashBaseUrls = /*@__PURE__*/ S.Array(DashBaseUrl);
export interface DashProgramInformation {
  Title?: string;
  Source?: string;
  Copyright?: string;
  LanguageCode?: string;
  MoreInformationUrl?: string;
}
export const DashProgramInformation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Title: S.optional(S.String),
    Source: S.optional(S.String),
    Copyright: S.optional(S.String),
    LanguageCode: S.optional(S.String),
    MoreInformationUrl: S.optional(S.String),
  }),
).annotate({
  identifier: "DashProgramInformation",
}) as any as S.Schema<DashProgramInformation>;
export interface DashDvbFontDownload {
  Url?: string;
  MimeType?: string;
  FontFamily?: string;
}
export const DashDvbFontDownload = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Url: S.optional(S.String),
    MimeType: S.optional(S.String),
    FontFamily: S.optional(S.String),
  }),
).annotate({
  identifier: "DashDvbFontDownload",
}) as any as S.Schema<DashDvbFontDownload>;
export interface DashDvbMetricsReporting {
  ReportingUrl: string;
  Probability?: number;
}
export const DashDvbMetricsReporting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReportingUrl: S.String, Probability: S.optional(S.Number) }),
).annotate({
  identifier: "DashDvbMetricsReporting",
}) as any as S.Schema<DashDvbMetricsReporting>;
export type DashDvbErrorMetrics = DashDvbMetricsReporting[];
export const DashDvbErrorMetrics = /*@__PURE__*/ S.Array(
  DashDvbMetricsReporting,
);
export interface DashDvbSettings {
  FontDownload?: DashDvbFontDownload;
  ErrorMetrics?: DashDvbMetricsReporting[];
}
export const DashDvbSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FontDownload: S.optional(DashDvbFontDownload),
    ErrorMetrics: S.optional(DashDvbErrorMetrics),
  }),
).annotate({
  identifier: "DashDvbSettings",
}) as any as S.Schema<DashDvbSettings>;
export type DashCompactness = "STANDARD" | "NONE" | (string & {});
export const DashCompactness = S.String;

export type DashAudioTimelinePattern = "NONE" | "PATTERNED" | (string & {});
export const DashAudioTimelinePattern = S.String;

export type DashTtmlProfile = "IMSC_1" | "EBU_TT_D_101" | (string & {});
export const DashTtmlProfile = S.String;

export interface DashTtmlConfiguration {
  TtmlProfile: DashTtmlProfile;
}
export const DashTtmlConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TtmlProfile: DashTtmlProfile }),
).annotate({
  identifier: "DashTtmlConfiguration",
}) as any as S.Schema<DashTtmlConfiguration>;
export interface DashSubtitleConfiguration {
  TtmlConfiguration?: DashTtmlConfiguration;
}
export const DashSubtitleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TtmlConfiguration: S.optional(DashTtmlConfiguration) }),
).annotate({
  identifier: "DashSubtitleConfiguration",
}) as any as S.Schema<DashSubtitleConfiguration>;
export type DashAvailabilityStartTimeConfiguration = {
  FixedAvailabilityStartTime: Date;
};
export const DashAvailabilityStartTimeConfiguration = /*@__PURE__*/ S.Union([
  S.Struct({
    FixedAvailabilityStartTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
]);
export interface CreateDashManifestConfiguration {
  ManifestName: string;
  ManifestWindowSeconds?: number;
  FilterConfiguration?: FilterConfiguration;
  MinUpdatePeriodSeconds?: number;
  MinBufferTimeSeconds?: number;
  SuggestedPresentationDelaySeconds?: number;
  SegmentTemplateFormat?: DashSegmentTemplateFormat;
  PeriodTriggers?: DashPeriodTrigger[];
  ScteDash?: ScteDash;
  DrmSignaling?: DashDrmSignaling;
  UtcTiming?: DashUtcTiming;
  Profiles?: DashProfile[];
  BaseUrls?: DashBaseUrl[];
  ProgramInformation?: DashProgramInformation;
  DvbSettings?: DashDvbSettings;
  Compactness?: DashCompactness;
  AudioTimelinePattern?: DashAudioTimelinePattern;
  SubtitleConfiguration?: DashSubtitleConfiguration;
  UriPathType?: UriPathType;
  AvailabilityStartTimeConfiguration?: DashAvailabilityStartTimeConfiguration;
}
export const CreateDashManifestConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestName: S.String,
    ManifestWindowSeconds: S.optional(S.Number),
    FilterConfiguration: S.optional(FilterConfiguration),
    MinUpdatePeriodSeconds: S.optional(S.Number),
    MinBufferTimeSeconds: S.optional(S.Number),
    SuggestedPresentationDelaySeconds: S.optional(S.Number),
    SegmentTemplateFormat: S.optional(DashSegmentTemplateFormat),
    PeriodTriggers: S.optional(DashPeriodTriggers),
    ScteDash: S.optional(ScteDash),
    DrmSignaling: S.optional(DashDrmSignaling),
    UtcTiming: S.optional(DashUtcTiming),
    Profiles: S.optional(DashProfiles),
    BaseUrls: S.optional(DashBaseUrls),
    ProgramInformation: S.optional(DashProgramInformation),
    DvbSettings: S.optional(DashDvbSettings),
    Compactness: S.optional(DashCompactness),
    AudioTimelinePattern: S.optional(DashAudioTimelinePattern),
    SubtitleConfiguration: S.optional(DashSubtitleConfiguration),
    UriPathType: S.optional(UriPathType),
    AvailabilityStartTimeConfiguration: S.optional(
      DashAvailabilityStartTimeConfiguration,
    ),
  }),
).annotate({
  identifier: "CreateDashManifestConfiguration",
}) as any as S.Schema<CreateDashManifestConfiguration>;
export type CreateDashManifests = CreateDashManifestConfiguration[];
export const CreateDashManifests = /*@__PURE__*/ S.Array(
  CreateDashManifestConfiguration,
);
export type MssManifestLayout = "FULL" | "COMPACT" | (string & {});
export const MssManifestLayout = S.String;

export interface CreateMssManifestConfiguration {
  ManifestName: string;
  ManifestWindowSeconds?: number;
  FilterConfiguration?: FilterConfiguration;
  ManifestLayout?: MssManifestLayout;
}
export const CreateMssManifestConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestName: S.String,
    ManifestWindowSeconds: S.optional(S.Number),
    FilterConfiguration: S.optional(FilterConfiguration),
    ManifestLayout: S.optional(MssManifestLayout),
  }),
).annotate({
  identifier: "CreateMssManifestConfiguration",
}) as any as S.Schema<CreateMssManifestConfiguration>;
export type CreateMssManifests = CreateMssManifestConfiguration[];
export const CreateMssManifests = /*@__PURE__*/ S.Array(
  CreateMssManifestConfiguration,
);
export type EndpointErrorCondition =
  | "STALE_MANIFEST"
  | "INCOMPLETE_MANIFEST"
  | "MISSING_DRM_KEY"
  | "SLATE_INPUT"
  | (string & {});
export const EndpointErrorCondition = S.String;

export type EndpointErrorConditions = EndpointErrorCondition[];
export const EndpointErrorConditions = /*@__PURE__*/ S.Array(
  EndpointErrorCondition,
);
export interface ForceEndpointErrorConfiguration {
  EndpointErrorConditions?: EndpointErrorCondition[];
}
export const ForceEndpointErrorConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndpointErrorConditions: S.optional(EndpointErrorConditions) }),
).annotate({
  identifier: "ForceEndpointErrorConfiguration",
}) as any as S.Schema<ForceEndpointErrorConfiguration>;
export type UriSeparator = "UNDERSCORE" | "HYPHEN" | (string & {});
export const UriSeparator = S.String;

export type StreamNameOutputMode = "INDEX" | "PASSTHROUGH_NAME" | (string & {});
export const StreamNameOutputMode = S.String;

export interface CreateOriginEndpointRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  ContainerType: ContainerType;
  Segment?: Segment;
  ClientToken?: string;
  Description?: string;
  StartoverWindowSeconds?: number;
  HlsManifests?: CreateHlsManifestConfiguration[];
  LowLatencyHlsManifests?: CreateLowLatencyHlsManifestConfiguration[];
  DashManifests?: CreateDashManifestConfiguration[];
  MssManifests?: CreateMssManifestConfiguration[];
  ForceEndpointErrorConfiguration?: ForceEndpointErrorConfiguration;
  UriSeparator?: UriSeparator;
  StreamNameOutputMode?: StreamNameOutputMode;
  Tags?: { [key: string]: string | undefined };
}
export const CreateOriginEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    OriginEndpointName: S.String,
    ContainerType: ContainerType,
    Segment: S.optional(Segment),
    ClientToken: S.optional(S.String).pipe(
      T.HttpHeader("x-amzn-client-token"),
      T.IdempotencyToken(),
    ),
    Description: S.optional(S.String),
    StartoverWindowSeconds: S.optional(S.Number),
    HlsManifests: S.optional(CreateHlsManifests),
    LowLatencyHlsManifests: S.optional(CreateLowLatencyHlsManifests),
    DashManifests: S.optional(CreateDashManifests),
    MssManifests: S.optional(CreateMssManifests),
    ForceEndpointErrorConfiguration: S.optional(
      ForceEndpointErrorConfiguration,
    ),
    UriSeparator: S.optional(UriSeparator),
    StreamNameOutputMode: S.optional(StreamNameOutputMode),
    Tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateOriginEndpointRequest",
}) as any as S.Schema<CreateOriginEndpointRequest>;
export interface GetHlsManifestConfiguration {
  ManifestName: string;
  Url: string;
  ChildManifestName?: string;
  ManifestWindowSeconds?: number;
  ProgramDateTimeIntervalSeconds?: number;
  ScteHls?: ScteHls;
  FilterConfiguration?: FilterConfiguration;
  StartTag?: StartTag;
  UrlEncodeChildManifest?: boolean;
  UriPathType?: UriPathType;
}
export const GetHlsManifestConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestName: S.String,
    Url: S.String,
    ChildManifestName: S.optional(S.String),
    ManifestWindowSeconds: S.optional(S.Number),
    ProgramDateTimeIntervalSeconds: S.optional(S.Number),
    ScteHls: S.optional(ScteHls),
    FilterConfiguration: S.optional(FilterConfiguration),
    StartTag: S.optional(StartTag),
    UrlEncodeChildManifest: S.optional(S.Boolean),
    UriPathType: S.optional(UriPathType),
  }),
).annotate({
  identifier: "GetHlsManifestConfiguration",
}) as any as S.Schema<GetHlsManifestConfiguration>;
export type GetHlsManifests = GetHlsManifestConfiguration[];
export const GetHlsManifests = /*@__PURE__*/ S.Array(
  GetHlsManifestConfiguration,
);
export interface GetLowLatencyHlsManifestConfiguration {
  ManifestName: string;
  Url: string;
  ChildManifestName?: string;
  ManifestWindowSeconds?: number;
  ProgramDateTimeIntervalSeconds?: number;
  ScteHls?: ScteHls;
  FilterConfiguration?: FilterConfiguration;
  StartTag?: StartTag;
  UrlEncodeChildManifest?: boolean;
  UriPathType?: UriPathType;
}
export const GetLowLatencyHlsManifestConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ManifestName: S.String,
      Url: S.String,
      ChildManifestName: S.optional(S.String),
      ManifestWindowSeconds: S.optional(S.Number),
      ProgramDateTimeIntervalSeconds: S.optional(S.Number),
      ScteHls: S.optional(ScteHls),
      FilterConfiguration: S.optional(FilterConfiguration),
      StartTag: S.optional(StartTag),
      UrlEncodeChildManifest: S.optional(S.Boolean),
      UriPathType: S.optional(UriPathType),
    }),
).annotate({
  identifier: "GetLowLatencyHlsManifestConfiguration",
}) as any as S.Schema<GetLowLatencyHlsManifestConfiguration>;
export type GetLowLatencyHlsManifests = GetLowLatencyHlsManifestConfiguration[];
export const GetLowLatencyHlsManifests = /*@__PURE__*/ S.Array(
  GetLowLatencyHlsManifestConfiguration,
);
export interface GetDashManifestConfiguration {
  ManifestName: string;
  Url: string;
  ManifestWindowSeconds?: number;
  FilterConfiguration?: FilterConfiguration;
  MinUpdatePeriodSeconds?: number;
  MinBufferTimeSeconds?: number;
  SuggestedPresentationDelaySeconds?: number;
  SegmentTemplateFormat?: DashSegmentTemplateFormat;
  PeriodTriggers?: DashPeriodTrigger[];
  ScteDash?: ScteDash;
  DrmSignaling?: DashDrmSignaling;
  UtcTiming?: DashUtcTiming;
  Profiles?: DashProfile[];
  BaseUrls?: DashBaseUrl[];
  ProgramInformation?: DashProgramInformation;
  DvbSettings?: DashDvbSettings;
  Compactness?: DashCompactness;
  AudioTimelinePattern?: DashAudioTimelinePattern;
  SubtitleConfiguration?: DashSubtitleConfiguration;
  UriPathType?: UriPathType;
  AvailabilityStartTimeConfiguration?: DashAvailabilityStartTimeConfiguration;
}
export const GetDashManifestConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestName: S.String,
    Url: S.String,
    ManifestWindowSeconds: S.optional(S.Number),
    FilterConfiguration: S.optional(FilterConfiguration),
    MinUpdatePeriodSeconds: S.optional(S.Number),
    MinBufferTimeSeconds: S.optional(S.Number),
    SuggestedPresentationDelaySeconds: S.optional(S.Number),
    SegmentTemplateFormat: S.optional(DashSegmentTemplateFormat),
    PeriodTriggers: S.optional(DashPeriodTriggers),
    ScteDash: S.optional(ScteDash),
    DrmSignaling: S.optional(DashDrmSignaling),
    UtcTiming: S.optional(DashUtcTiming),
    Profiles: S.optional(DashProfiles),
    BaseUrls: S.optional(DashBaseUrls),
    ProgramInformation: S.optional(DashProgramInformation),
    DvbSettings: S.optional(DashDvbSettings),
    Compactness: S.optional(DashCompactness),
    AudioTimelinePattern: S.optional(DashAudioTimelinePattern),
    SubtitleConfiguration: S.optional(DashSubtitleConfiguration),
    UriPathType: S.optional(UriPathType),
    AvailabilityStartTimeConfiguration: S.optional(
      DashAvailabilityStartTimeConfiguration,
    ),
  }),
).annotate({
  identifier: "GetDashManifestConfiguration",
}) as any as S.Schema<GetDashManifestConfiguration>;
export type GetDashManifests = GetDashManifestConfiguration[];
export const GetDashManifests = /*@__PURE__*/ S.Array(
  GetDashManifestConfiguration,
);
export interface GetMssManifestConfiguration {
  ManifestName: string;
  Url: string;
  FilterConfiguration?: FilterConfiguration;
  ManifestWindowSeconds?: number;
  ManifestLayout?: MssManifestLayout;
}
export const GetMssManifestConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestName: S.String,
    Url: S.String,
    FilterConfiguration: S.optional(FilterConfiguration),
    ManifestWindowSeconds: S.optional(S.Number),
    ManifestLayout: S.optional(MssManifestLayout),
  }),
).annotate({
  identifier: "GetMssManifestConfiguration",
}) as any as S.Schema<GetMssManifestConfiguration>;
export type GetMssManifests = GetMssManifestConfiguration[];
export const GetMssManifests = /*@__PURE__*/ S.Array(
  GetMssManifestConfiguration,
);
export interface CreateOriginEndpointResponse {
  Arn: string;
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  ContainerType: ContainerType;
  Segment: Segment;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  StartoverWindowSeconds?: number;
  HlsManifests?: GetHlsManifestConfiguration[];
  LowLatencyHlsManifests?: GetLowLatencyHlsManifestConfiguration[];
  DashManifests?: GetDashManifestConfiguration[];
  MssManifests?: GetMssManifestConfiguration[];
  ForceEndpointErrorConfiguration?: ForceEndpointErrorConfiguration;
  UriSeparator?: UriSeparator;
  StreamNameOutputMode?: StreamNameOutputMode;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateOriginEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    ChannelGroupName: S.String,
    ChannelName: S.String,
    OriginEndpointName: S.String,
    ContainerType: ContainerType,
    Segment: Segment,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Description: S.optional(S.String),
    StartoverWindowSeconds: S.optional(S.Number),
    HlsManifests: S.optional(GetHlsManifests),
    LowLatencyHlsManifests: S.optional(GetLowLatencyHlsManifests),
    DashManifests: S.optional(GetDashManifests),
    MssManifests: S.optional(GetMssManifests),
    ForceEndpointErrorConfiguration: S.optional(
      ForceEndpointErrorConfiguration,
    ),
    UriSeparator: S.optional(UriSeparator),
    StreamNameOutputMode: S.optional(StreamNameOutputMode),
    ETag: S.optional(S.String),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateOriginEndpointResponse",
}) as any as S.Schema<CreateOriginEndpointResponse>;
export interface DeleteChannelRequest {
  ChannelGroupName: string;
  ChannelName: string;
}
export const DeleteChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteChannelRequest",
}) as any as S.Schema<DeleteChannelRequest>;
export interface DeleteChannelResponse {}
export const DeleteChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteChannelResponse",
}) as any as S.Schema<DeleteChannelResponse>;
export interface DeleteChannelGroupRequest {
  ChannelGroupName: string;
}
export const DeleteChannelGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/channelGroup/{ChannelGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteChannelGroupRequest",
}) as any as S.Schema<DeleteChannelGroupRequest>;
export interface DeleteChannelGroupResponse {}
export const DeleteChannelGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteChannelGroupResponse",
}) as any as S.Schema<DeleteChannelGroupResponse>;
export interface DeleteChannelPolicyRequest {
  ChannelGroupName: string;
  ChannelName: string;
}
export const DeleteChannelPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteChannelPolicyRequest",
}) as any as S.Schema<DeleteChannelPolicyRequest>;
export interface DeleteChannelPolicyResponse {}
export const DeleteChannelPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteChannelPolicyResponse",
}) as any as S.Schema<DeleteChannelPolicyResponse>;
export interface DeleteOriginEndpointRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
}
export const DeleteOriginEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteOriginEndpointRequest",
}) as any as S.Schema<DeleteOriginEndpointRequest>;
export interface DeleteOriginEndpointResponse {}
export const DeleteOriginEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteOriginEndpointResponse",
}) as any as S.Schema<DeleteOriginEndpointResponse>;
export interface DeleteOriginEndpointPolicyRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
}
export const DeleteOriginEndpointPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteOriginEndpointPolicyRequest",
}) as any as S.Schema<DeleteOriginEndpointPolicyRequest>;
export interface DeleteOriginEndpointPolicyResponse {}
export const DeleteOriginEndpointPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteOriginEndpointPolicyResponse",
}) as any as S.Schema<DeleteOriginEndpointPolicyResponse>;
export interface GetChannelRequest {
  ChannelGroupName: string;
  ChannelName: string;
}
export const GetChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChannelRequest",
}) as any as S.Schema<GetChannelRequest>;
export interface GetChannelResponse {
  Arn: string;
  ChannelName: string;
  ChannelGroupName: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  ResetAt?: Date;
  Description?: string;
  IngestEndpoints?: IngestEndpoint[];
  InputType?: InputType;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
  InputSwitchConfiguration?: InputSwitchConfiguration;
  OutputHeaderConfiguration?: OutputHeaderConfiguration;
  OutputLockingMode?: OutputLockingMode;
}
export const GetChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    ChannelName: S.String,
    ChannelGroupName: S.String,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ResetAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    IngestEndpoints: S.optional(IngestEndpointList),
    InputType: S.optional(InputType),
    ETag: S.optional(S.String),
    Tags: S.optional(TagMap),
    InputSwitchConfiguration: S.optional(InputSwitchConfiguration),
    OutputHeaderConfiguration: S.optional(OutputHeaderConfiguration),
    OutputLockingMode: S.optional(OutputLockingMode),
  }),
).annotate({
  identifier: "GetChannelResponse",
}) as any as S.Schema<GetChannelResponse>;
export interface GetChannelGroupRequest {
  ChannelGroupName: string;
}
export const GetChannelGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/channelGroup/{ChannelGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChannelGroupRequest",
}) as any as S.Schema<GetChannelGroupRequest>;
export interface GetChannelGroupResponse {
  ChannelGroupName: string;
  Arn: string;
  EgressDomain: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetChannelGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String,
    Arn: S.String,
    EgressDomain: S.String,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Description: S.optional(S.String),
    ETag: S.optional(S.String),
    Tags: S.optional(TagMap),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "GetChannelGroupResponse",
}) as any as S.Schema<GetChannelGroupResponse>;
export interface GetChannelPolicyRequest {
  ChannelGroupName: string;
  ChannelName: string;
}
export const GetChannelPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChannelPolicyRequest",
}) as any as S.Schema<GetChannelPolicyRequest>;
export type PolicyText = string;
export interface GetChannelPolicyResponse {
  ChannelGroupName: string;
  ChannelName: string;
  Policy: string;
}
export const GetChannelPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String,
    ChannelName: S.String,
    Policy: S.String,
  }),
).annotate({
  identifier: "GetChannelPolicyResponse",
}) as any as S.Schema<GetChannelPolicyResponse>;
export interface GetHarvestJobRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  HarvestJobName: string;
}
export const GetHarvestJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
    HarvestJobName: S.String.pipe(T.HttpLabel("HarvestJobName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/harvestJob/{HarvestJobName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetHarvestJobRequest",
}) as any as S.Schema<GetHarvestJobRequest>;
export interface GetHarvestJobResponse {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Destination: Destination;
  HarvestJobName: string;
  HarvestedManifests: HarvestedManifests;
  Description?: string;
  ScheduleConfiguration: HarvesterScheduleConfiguration;
  Arn: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Status: HarvestJobStatus;
  ErrorMessage?: string;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetHarvestJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String,
    ChannelName: S.String,
    OriginEndpointName: S.String,
    Destination: Destination,
    HarvestJobName: S.String,
    HarvestedManifests: HarvestedManifests,
    Description: S.optional(S.String),
    ScheduleConfiguration: HarvesterScheduleConfiguration,
    Arn: S.String,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Status: HarvestJobStatus,
    ErrorMessage: S.optional(S.String),
    ETag: S.optional(S.String),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetHarvestJobResponse",
}) as any as S.Schema<GetHarvestJobResponse>;
export interface GetOriginEndpointRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
}
export const GetOriginEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOriginEndpointRequest",
}) as any as S.Schema<GetOriginEndpointRequest>;
export interface GetOriginEndpointResponse {
  Arn: string;
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  ContainerType: ContainerType;
  Segment: Segment;
  CreatedAt: Date;
  ModifiedAt: Date;
  ResetAt?: Date;
  Description?: string;
  StartoverWindowSeconds?: number;
  HlsManifests?: GetHlsManifestConfiguration[];
  LowLatencyHlsManifests?: GetLowLatencyHlsManifestConfiguration[];
  DashManifests?: GetDashManifestConfiguration[];
  MssManifests?: GetMssManifestConfiguration[];
  ForceEndpointErrorConfiguration?: ForceEndpointErrorConfiguration;
  UriSeparator?: UriSeparator;
  StreamNameOutputMode?: StreamNameOutputMode;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetOriginEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    ChannelGroupName: S.String,
    ChannelName: S.String,
    OriginEndpointName: S.String,
    ContainerType: ContainerType,
    Segment: Segment,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ResetAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    StartoverWindowSeconds: S.optional(S.Number),
    HlsManifests: S.optional(GetHlsManifests),
    LowLatencyHlsManifests: S.optional(GetLowLatencyHlsManifests),
    DashManifests: S.optional(GetDashManifests),
    MssManifests: S.optional(GetMssManifests),
    ForceEndpointErrorConfiguration: S.optional(
      ForceEndpointErrorConfiguration,
    ),
    UriSeparator: S.optional(UriSeparator),
    StreamNameOutputMode: S.optional(StreamNameOutputMode),
    ETag: S.optional(S.String),
    Tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetOriginEndpointResponse",
}) as any as S.Schema<GetOriginEndpointResponse>;
export interface GetOriginEndpointPolicyRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
}
export const GetOriginEndpointPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetOriginEndpointPolicyRequest",
}) as any as S.Schema<GetOriginEndpointPolicyRequest>;
export type CdnIdentifierSecretArn = string;
export type CdnIdentifierSecretArns = string[];
export const CdnIdentifierSecretArns = /*@__PURE__*/ S.Array(S.String);
export interface CdnAuthConfiguration {
  CdnIdentifierSecretArns: string[];
  SecretsRoleArn: string;
}
export const CdnAuthConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CdnIdentifierSecretArns: CdnIdentifierSecretArns,
    SecretsRoleArn: S.String,
  }),
).annotate({
  identifier: "CdnAuthConfiguration",
}) as any as S.Schema<CdnAuthConfiguration>;
export interface GetOriginEndpointPolicyResponse {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Policy: string;
  CdnAuthConfiguration?: CdnAuthConfiguration;
}
export const GetOriginEndpointPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String,
    ChannelName: S.String,
    OriginEndpointName: S.String,
    Policy: S.String,
    CdnAuthConfiguration: S.optional(CdnAuthConfiguration),
  }),
).annotate({
  identifier: "GetOriginEndpointPolicyResponse",
}) as any as S.Schema<GetOriginEndpointPolicyResponse>;
export type ListResourceMaxResults = number;
export interface ListChannelGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListChannelGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/channelGroup" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChannelGroupsRequest",
}) as any as S.Schema<ListChannelGroupsRequest>;
export interface ChannelGroupListConfiguration {
  ChannelGroupName: string;
  Arn: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
}
export const ChannelGroupListConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String,
    Arn: S.String,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Description: S.optional(S.String),
  }),
).annotate({
  identifier: "ChannelGroupListConfiguration",
}) as any as S.Schema<ChannelGroupListConfiguration>;
export type ChannelGroupsList = ChannelGroupListConfiguration[];
export const ChannelGroupsList = /*@__PURE__*/ S.Array(
  ChannelGroupListConfiguration,
);
export interface ListChannelGroupsResponse {
  Items?: ChannelGroupListConfiguration[];
  NextToken?: string;
}
export const ListChannelGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(ChannelGroupsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListChannelGroupsResponse",
}) as any as S.Schema<ListChannelGroupsResponse>;
export interface ListChannelsRequest {
  ChannelGroupName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListChannelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/channelGroup/{ChannelGroupName}/channel",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChannelsRequest",
}) as any as S.Schema<ListChannelsRequest>;
export interface ChannelListConfiguration {
  Arn: string;
  ChannelName: string;
  ChannelGroupName: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  InputType?: InputType;
  OutputLockingMode?: OutputLockingMode;
}
export const ChannelListConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    ChannelName: S.String,
    ChannelGroupName: S.String,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Description: S.optional(S.String),
    InputType: S.optional(InputType),
    OutputLockingMode: S.optional(OutputLockingMode),
  }),
).annotate({
  identifier: "ChannelListConfiguration",
}) as any as S.Schema<ChannelListConfiguration>;
export type ChannelList = ChannelListConfiguration[];
export const ChannelList = /*@__PURE__*/ S.Array(ChannelListConfiguration);
export interface ListChannelsResponse {
  Items?: ChannelListConfiguration[];
  NextToken?: string;
}
export const ListChannelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Items: S.optional(ChannelList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListChannelsResponse",
}) as any as S.Schema<ListChannelsResponse>;
export interface ListHarvestJobsRequest {
  ChannelGroupName: string;
  ChannelName?: string;
  OriginEndpointName?: string;
  Status?: HarvestJobStatus;
  MaxResults?: number;
  NextToken?: string;
}
export const ListHarvestJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.optional(S.String).pipe(T.HttpQuery("channelName")),
    OriginEndpointName: S.optional(S.String).pipe(
      T.HttpQuery("originEndpointName"),
    ),
    Status: S.optional(HarvestJobStatus).pipe(T.HttpQuery("includeStatus")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/channelGroup/{ChannelGroupName}/harvestJob",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListHarvestJobsRequest",
}) as any as S.Schema<ListHarvestJobsRequest>;
export interface HarvestJob {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Destination: Destination;
  HarvestJobName: string;
  HarvestedManifests: HarvestedManifests;
  Description?: string;
  ScheduleConfiguration: HarvesterScheduleConfiguration;
  Arn: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Status: HarvestJobStatus;
  ErrorMessage?: string;
  ETag?: string;
}
export const HarvestJob = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String,
    ChannelName: S.String,
    OriginEndpointName: S.String,
    Destination: Destination,
    HarvestJobName: S.String,
    HarvestedManifests: HarvestedManifests,
    Description: S.optional(S.String),
    ScheduleConfiguration: HarvesterScheduleConfiguration,
    Arn: S.String,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Status: HarvestJobStatus,
    ErrorMessage: S.optional(S.String),
    ETag: S.optional(S.String),
  }),
).annotate({ identifier: "HarvestJob" }) as any as S.Schema<HarvestJob>;
export type HarvestJobsList = HarvestJob[];
export const HarvestJobsList = /*@__PURE__*/ S.Array(HarvestJob);
export interface ListHarvestJobsResponse {
  Items?: HarvestJob[];
  NextToken?: string;
}
export const ListHarvestJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(HarvestJobsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListHarvestJobsResponse",
}) as any as S.Schema<ListHarvestJobsResponse>;
export interface ListOriginEndpointsRequest {
  ChannelGroupName: string;
  ChannelName: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListOriginEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOriginEndpointsRequest",
}) as any as S.Schema<ListOriginEndpointsRequest>;
export interface ListHlsManifestConfiguration {
  ManifestName: string;
  ChildManifestName?: string;
  Url?: string;
}
export const ListHlsManifestConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestName: S.String,
    ChildManifestName: S.optional(S.String),
    Url: S.optional(S.String),
  }),
).annotate({
  identifier: "ListHlsManifestConfiguration",
}) as any as S.Schema<ListHlsManifestConfiguration>;
export type ListHlsManifests = ListHlsManifestConfiguration[];
export const ListHlsManifests = /*@__PURE__*/ S.Array(
  ListHlsManifestConfiguration,
);
export interface ListLowLatencyHlsManifestConfiguration {
  ManifestName: string;
  ChildManifestName?: string;
  Url?: string;
}
export const ListLowLatencyHlsManifestConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ManifestName: S.String,
      ChildManifestName: S.optional(S.String),
      Url: S.optional(S.String),
    }),
).annotate({
  identifier: "ListLowLatencyHlsManifestConfiguration",
}) as any as S.Schema<ListLowLatencyHlsManifestConfiguration>;
export type ListLowLatencyHlsManifests =
  ListLowLatencyHlsManifestConfiguration[];
export const ListLowLatencyHlsManifests = /*@__PURE__*/ S.Array(
  ListLowLatencyHlsManifestConfiguration,
);
export interface ListDashManifestConfiguration {
  ManifestName: string;
  Url?: string;
}
export const ListDashManifestConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManifestName: S.String, Url: S.optional(S.String) }),
).annotate({
  identifier: "ListDashManifestConfiguration",
}) as any as S.Schema<ListDashManifestConfiguration>;
export type ListDashManifests = ListDashManifestConfiguration[];
export const ListDashManifests = /*@__PURE__*/ S.Array(
  ListDashManifestConfiguration,
);
export interface ListMssManifestConfiguration {
  ManifestName: string;
  Url?: string;
}
export const ListMssManifestConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManifestName: S.String, Url: S.optional(S.String) }),
).annotate({
  identifier: "ListMssManifestConfiguration",
}) as any as S.Schema<ListMssManifestConfiguration>;
export type ListMssManifests = ListMssManifestConfiguration[];
export const ListMssManifests = /*@__PURE__*/ S.Array(
  ListMssManifestConfiguration,
);
export interface OriginEndpointListConfiguration {
  Arn: string;
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  ContainerType: ContainerType;
  Description?: string;
  CreatedAt?: Date;
  ModifiedAt?: Date;
  HlsManifests?: ListHlsManifestConfiguration[];
  LowLatencyHlsManifests?: ListLowLatencyHlsManifestConfiguration[];
  DashManifests?: ListDashManifestConfiguration[];
  MssManifests?: ListMssManifestConfiguration[];
  ForceEndpointErrorConfiguration?: ForceEndpointErrorConfiguration;
  UriSeparator?: UriSeparator;
  StreamNameOutputMode?: StreamNameOutputMode;
}
export const OriginEndpointListConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    ChannelGroupName: S.String,
    ChannelName: S.String,
    OriginEndpointName: S.String,
    ContainerType: ContainerType,
    Description: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ModifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HlsManifests: S.optional(ListHlsManifests),
    LowLatencyHlsManifests: S.optional(ListLowLatencyHlsManifests),
    DashManifests: S.optional(ListDashManifests),
    MssManifests: S.optional(ListMssManifests),
    ForceEndpointErrorConfiguration: S.optional(
      ForceEndpointErrorConfiguration,
    ),
    UriSeparator: S.optional(UriSeparator),
    StreamNameOutputMode: S.optional(StreamNameOutputMode),
  }),
).annotate({
  identifier: "OriginEndpointListConfiguration",
}) as any as S.Schema<OriginEndpointListConfiguration>;
export type OriginEndpointsList = OriginEndpointListConfiguration[];
export const OriginEndpointsList = /*@__PURE__*/ S.Array(
  OriginEndpointListConfiguration,
);
export interface ListOriginEndpointsResponse {
  Items?: OriginEndpointListConfiguration[];
  NextToken?: string;
}
export const ListOriginEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(OriginEndpointsList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOriginEndpointsResponse",
}) as any as S.Schema<ListOriginEndpointsResponse>;
export type TagArn = string;
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
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagMap) }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutChannelPolicyRequest {
  ChannelGroupName: string;
  ChannelName: string;
  Policy: string;
}
export const PutChannelPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    Policy: S.String,
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutChannelPolicyRequest",
}) as any as S.Schema<PutChannelPolicyRequest>;
export interface PutChannelPolicyResponse {}
export const PutChannelPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutChannelPolicyResponse",
}) as any as S.Schema<PutChannelPolicyResponse>;
export interface PutOriginEndpointPolicyRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Policy: string;
  CdnAuthConfiguration?: CdnAuthConfiguration;
}
export const PutOriginEndpointPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
    Policy: S.String,
    CdnAuthConfiguration: S.optional(CdnAuthConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/policy",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "PutOriginEndpointPolicyRequest",
}) as any as S.Schema<PutOriginEndpointPolicyRequest>;
export interface PutOriginEndpointPolicyResponse {}
export const PutOriginEndpointPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PutOriginEndpointPolicyResponse",
}) as any as S.Schema<PutOriginEndpointPolicyResponse>;
export interface ResetChannelStateRequest {
  ChannelGroupName: string;
  ChannelName: string;
}
export const ResetChannelStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/reset",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetChannelStateRequest",
}) as any as S.Schema<ResetChannelStateRequest>;
export interface ResetChannelStateResponse {
  ChannelGroupName: string;
  ChannelName: string;
  Arn: string;
  ResetAt: Date;
}
export const ResetChannelStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String,
    ChannelName: S.String,
    Arn: S.String,
    ResetAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ResetChannelStateResponse",
}) as any as S.Schema<ResetChannelStateResponse>;
export interface ResetOriginEndpointStateRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
}
export const ResetOriginEndpointStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}/reset",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ResetOriginEndpointStateRequest",
}) as any as S.Schema<ResetOriginEndpointStateRequest>;
export interface ResetOriginEndpointStateResponse {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  Arn: string;
  ResetAt: Date;
}
export const ResetOriginEndpointStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String,
    ChannelName: S.String,
    OriginEndpointName: S.String,
    Arn: S.String,
    ResetAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "ResetOriginEndpointStateResponse",
}) as any as S.Schema<ResetOriginEndpointStateResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: TagMap,
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
export interface UpdateChannelRequest {
  ChannelGroupName: string;
  ChannelName: string;
  ETag?: string;
  Description?: string;
  InputSwitchConfiguration?: InputSwitchConfiguration;
  OutputHeaderConfiguration?: OutputHeaderConfiguration;
}
export const UpdateChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    ETag: S.optional(S.String).pipe(T.HttpHeader("x-amzn-update-if-match")),
    Description: S.optional(S.String),
    InputSwitchConfiguration: S.optional(InputSwitchConfiguration),
    OutputHeaderConfiguration: S.optional(OutputHeaderConfiguration),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateChannelRequest",
}) as any as S.Schema<UpdateChannelRequest>;
export interface UpdateChannelResponse {
  Arn: string;
  ChannelName: string;
  ChannelGroupName: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  IngestEndpoints?: IngestEndpoint[];
  InputType?: InputType;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
  InputSwitchConfiguration?: InputSwitchConfiguration;
  OutputHeaderConfiguration?: OutputHeaderConfiguration;
  OutputLockingMode?: OutputLockingMode;
}
export const UpdateChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    ChannelName: S.String,
    ChannelGroupName: S.String,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Description: S.optional(S.String),
    IngestEndpoints: S.optional(IngestEndpointList),
    InputType: S.optional(InputType),
    ETag: S.optional(S.String),
    Tags: S.optional(TagMap),
    InputSwitchConfiguration: S.optional(InputSwitchConfiguration),
    OutputHeaderConfiguration: S.optional(OutputHeaderConfiguration),
    OutputLockingMode: S.optional(OutputLockingMode),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "UpdateChannelResponse",
}) as any as S.Schema<UpdateChannelResponse>;
export interface UpdateChannelGroupRequest {
  ChannelGroupName: string;
  ETag?: string;
  Description?: string;
}
export const UpdateChannelGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ETag: S.optional(S.String).pipe(T.HttpHeader("x-amzn-update-if-match")),
    Description: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/channelGroup/{ChannelGroupName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateChannelGroupRequest",
}) as any as S.Schema<UpdateChannelGroupRequest>;
export interface UpdateChannelGroupResponse {
  ChannelGroupName: string;
  Arn: string;
  EgressDomain: string;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
}
export const UpdateChannelGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String,
    Arn: S.String,
    EgressDomain: S.String,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Description: S.optional(S.String),
    ETag: S.optional(S.String),
    Tags: S.optional(TagMap),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "UpdateChannelGroupResponse",
}) as any as S.Schema<UpdateChannelGroupResponse>;
export interface UpdateOriginEndpointRequest {
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  ContainerType: ContainerType;
  Segment?: Segment;
  Description?: string;
  StartoverWindowSeconds?: number;
  HlsManifests?: CreateHlsManifestConfiguration[];
  LowLatencyHlsManifests?: CreateLowLatencyHlsManifestConfiguration[];
  DashManifests?: CreateDashManifestConfiguration[];
  MssManifests?: CreateMssManifestConfiguration[];
  ForceEndpointErrorConfiguration?: ForceEndpointErrorConfiguration;
  UriSeparator?: UriSeparator;
  StreamNameOutputMode?: StreamNameOutputMode;
  ETag?: string;
}
export const UpdateOriginEndpointRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelGroupName: S.String.pipe(T.HttpLabel("ChannelGroupName")),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    OriginEndpointName: S.String.pipe(T.HttpLabel("OriginEndpointName")),
    ContainerType: ContainerType,
    Segment: S.optional(Segment),
    Description: S.optional(S.String),
    StartoverWindowSeconds: S.optional(S.Number),
    HlsManifests: S.optional(CreateHlsManifests),
    LowLatencyHlsManifests: S.optional(CreateLowLatencyHlsManifests),
    DashManifests: S.optional(CreateDashManifests),
    MssManifests: S.optional(CreateMssManifests),
    ForceEndpointErrorConfiguration: S.optional(
      ForceEndpointErrorConfiguration,
    ),
    UriSeparator: S.optional(UriSeparator),
    StreamNameOutputMode: S.optional(StreamNameOutputMode),
    ETag: S.optional(S.String).pipe(T.HttpHeader("x-amzn-update-if-match")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/channelGroup/{ChannelGroupName}/channel/{ChannelName}/originEndpoint/{OriginEndpointName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateOriginEndpointRequest",
}) as any as S.Schema<UpdateOriginEndpointRequest>;
export interface UpdateOriginEndpointResponse {
  Arn: string;
  ChannelGroupName: string;
  ChannelName: string;
  OriginEndpointName: string;
  ContainerType: ContainerType;
  Segment: Segment;
  CreatedAt: Date;
  ModifiedAt: Date;
  Description?: string;
  StartoverWindowSeconds?: number;
  HlsManifests?: GetHlsManifestConfiguration[];
  LowLatencyHlsManifests?: GetLowLatencyHlsManifestConfiguration[];
  MssManifests?: GetMssManifestConfiguration[];
  ForceEndpointErrorConfiguration?: ForceEndpointErrorConfiguration;
  UriSeparator?: UriSeparator;
  StreamNameOutputMode?: StreamNameOutputMode;
  ETag?: string;
  Tags?: { [key: string]: string | undefined };
  DashManifests?: GetDashManifestConfiguration[];
}
export const UpdateOriginEndpointResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    ChannelGroupName: S.String,
    ChannelName: S.String,
    OriginEndpointName: S.String,
    ContainerType: ContainerType,
    Segment: Segment,
    CreatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    Description: S.optional(S.String),
    StartoverWindowSeconds: S.optional(S.Number),
    HlsManifests: S.optional(GetHlsManifests),
    LowLatencyHlsManifests: S.optional(GetLowLatencyHlsManifests),
    MssManifests: S.optional(GetMssManifests),
    ForceEndpointErrorConfiguration: S.optional(
      ForceEndpointErrorConfiguration,
    ),
    UriSeparator: S.optional(UriSeparator),
    StreamNameOutputMode: S.optional(StreamNameOutputMode),
    ETag: S.optional(S.String),
    Tags: S.optional(TagMap),
    DashManifests: S.optional(GetDashManifests),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "UpdateOriginEndpointResponse",
}) as any as S.Schema<UpdateOriginEndpointResponse>;
export type ConflictExceptionType =
  | "RESOURCE_IN_USE"
  | "RESOURCE_ALREADY_EXISTS"
  | "IDEMPOTENT_PARAMETER_MISMATCH"
  | "CONFLICTING_OPERATION"
  | (string & {});
export const ConflictExceptionType = S.String;

export type ResourceTypeNotFound =
  | "CHANNEL_GROUP"
  | "CHANNEL"
  | "ORIGIN_ENDPOINT"
  | "HARVEST_JOB"
  | (string & {});
export const ResourceTypeNotFound = S.String;

export type ValidationExceptionType =
  | "CONTAINER_TYPE_IMMUTABLE"
  | "INVALID_PAGINATION_TOKEN"
  | "INVALID_PAGINATION_MAX_RESULTS"
  | "INVALID_POLICY"
  | "INVALID_ROLE_ARN"
  | "MANIFEST_NAME_COLLISION"
  | "ENCRYPTION_METHOD_CONTAINER_TYPE_MISMATCH"
  | "CENC_IV_INCOMPATIBLE"
  | "ENCRYPTION_CONTRACT_WITHOUT_AUDIO_RENDITION_INCOMPATIBLE"
  | "ENCRYPTION_CONTRACT_WITH_ISM_CONTAINER_INCOMPATIBLE"
  | "ENCRYPTION_CONTRACT_UNENCRYPTED"
  | "ENCRYPTION_CONTRACT_SHARED"
  | "NUM_MANIFESTS_LOW"
  | "NUM_MANIFESTS_HIGH"
  | "MANIFEST_DRM_SYSTEMS_INCOMPATIBLE"
  | "DRM_SYSTEMS_ENCRYPTION_METHOD_INCOMPATIBLE"
  | "ROLE_ARN_NOT_ASSUMABLE"
  | "ROLE_ARN_LENGTH_OUT_OF_RANGE"
  | "ROLE_ARN_INVALID_FORMAT"
  | "URL_INVALID"
  | "URL_SCHEME"
  | "URL_USER_INFO"
  | "URL_PORT"
  | "URL_UNKNOWN_HOST"
  | "URL_LOCAL_ADDRESS"
  | "URL_LOOPBACK_ADDRESS"
  | "URL_LINK_LOCAL_ADDRESS"
  | "URL_MULTICAST_ADDRESS"
  | "MEMBER_INVALID"
  | "MEMBER_MISSING"
  | "MEMBER_MIN_VALUE"
  | "MEMBER_MAX_VALUE"
  | "MEMBER_MIN_LENGTH"
  | "MEMBER_MAX_LENGTH"
  | "MEMBER_INVALID_ENUM_VALUE"
  | "MEMBER_DOES_NOT_MATCH_PATTERN"
  | "INVALID_MANIFEST_FILTER"
  | "INVALID_DRM_SETTINGS"
  | "INVALID_TIME_DELAY_SECONDS"
  | "END_TIME_EARLIER_THAN_START_TIME"
  | "TS_CONTAINER_TYPE_WITH_DASH_MANIFEST"
  | "DIRECT_MODE_WITH_TIMING_SOURCE"
  | "NONE_MODE_WITH_TIMING_SOURCE"
  | "TIMING_SOURCE_MISSING"
  | "UPDATE_PERIOD_SMALLER_THAN_SEGMENT_DURATION"
  | "PERIOD_TRIGGERS_NONE_SPECIFIED_WITH_ADDITIONAL_VALUES"
  | "DRM_SIGNALING_MISMATCH_SEGMENT_ENCRYPTION_STATUS"
  | "ONLY_CMAF_INPUT_TYPE_ALLOW_FORCE_ENDPOINT_ERROR_CONFIGURATION"
  | "SOURCE_DISRUPTIONS_ENABLED_INCORRECTLY"
  | "HARVESTED_MANIFEST_HAS_START_END_FILTER_CONFIGURATION"
  | "HARVESTED_MANIFEST_NOT_FOUND_ON_ENDPOINT"
  | "TOO_MANY_IN_PROGRESS_HARVEST_JOBS"
  | "HARVEST_JOB_INELIGIBLE_FOR_CANCELLATION"
  | "INVALID_HARVEST_JOB_DURATION"
  | "HARVEST_JOB_S3_DESTINATION_MISSING_OR_INCOMPLETE"
  | "HARVEST_JOB_UNABLE_TO_WRITE_TO_S3_DESTINATION"
  | "HARVEST_JOB_CUSTOMER_ENDPOINT_READ_ACCESS_DENIED"
  | "CLIP_START_TIME_WITH_START_OR_END"
  | "START_TAG_TIME_OFFSET_INVALID"
  | "INCOMPATIBLE_DASH_PROFILE_DVB_DASH_CONFIGURATION"
  | "DASH_DVB_ATTRIBUTES_WITHOUT_DVB_DASH_PROFILE"
  | "INCOMPATIBLE_DASH_COMPACTNESS_CONFIGURATION"
  | "INCOMPATIBLE_XML_ENCODING"
  | "CMAF_EXCLUDE_SEGMENT_DRM_METADATA_INCOMPATIBLE_CONTAINER_TYPE"
  | "ONLY_CMAF_INPUT_TYPE_ALLOW_MQCS_INPUT_SWITCHING"
  | "ONLY_CMAF_INPUT_TYPE_ALLOW_MQCS_OUTPUT_CONFIGURATION"
  | "ONLY_CMAF_INPUT_TYPE_ALLOW_PREFERRED_INPUT_CONFIGURATION"
  | "TS_CONTAINER_TYPE_WITH_MSS_MANIFEST"
  | "CMAF_CONTAINER_TYPE_WITH_MSS_MANIFEST"
  | "ISM_CONTAINER_TYPE_WITH_HLS_MANIFEST"
  | "ISM_CONTAINER_TYPE_WITH_LL_HLS_MANIFEST"
  | "ISM_CONTAINER_TYPE_WITH_DASH_MANIFEST"
  | "ISM_CONTAINER_TYPE_WITH_SCTE"
  | "ISM_CONTAINER_WITH_KEY_ROTATION"
  | "BATCH_GET_SECRET_VALUE_DENIED"
  | "GET_SECRET_VALUE_DENIED"
  | "DESCRIBE_SECRET_DENIED"
  | "INVALID_SECRET_FORMAT"
  | "SECRET_IS_NOT_ONE_KEY_VALUE_PAIR"
  | "INVALID_SECRET_KEY"
  | "INVALID_SECRET_VALUE"
  | "SECRET_ARN_RESOURCE_NOT_FOUND"
  | "DECRYPT_SECRET_FAILED"
  | "TOO_MANY_SECRETS"
  | "DUPLICATED_SECRET"
  | "MALFORMED_SECRET_ARN"
  | "SECRET_FROM_DIFFERENT_ACCOUNT"
  | "SECRET_FROM_DIFFERENT_REGION"
  | "INVALID_SECRET"
  | "RESOURCE_NOT_IN_SAME_REGION"
  | "CERTIFICATE_RESOURCE_NOT_FOUND"
  | "CERTIFICATE_ACCESS_DENIED"
  | "DESCRIBE_CERTIFICATE_FAILED"
  | "INVALID_CERTIFICATE_STATUS"
  | "INVALID_CERTIFICATE_KEY_ALGORITHM"
  | "INVALID_CERTIFICATE_SIGNATURE_ALGORITHM"
  | "MISSING_CERTIFICATE_DOMAIN_NAME"
  | "INVALID_ARN"
  | "SCTE_IN_MANIFESTS_INVALID_CONFIGURATION"
  | "CUSTOM_AD_TYPES_INVALID_CONFIGURATION"
  | "ONLY_CMAF_INPUT_TYPE_ALLOW_OUTPUT_LOCKING_MODE"
  | "ONLY_NON_EPOCH_LOCKED_ALLOW_OUTPUT_TIMESTAMP_MODE"
  | "OUTPUT_TIMESTAMP_MODE_IMMUTABLE"
  | "NON_EPOCH_LOCKED_WITH_FORCE_ENDPOINT_ERROR_CONFIGURATION"
  | "ONLY_HLS_INPUT_TYPE_ALLOW_STREAM_NAME_OUTPUT_MODE"
  | "STREAM_NAME_OUTPUT_MODE_IMMUTABLE"
  | (string & {});
export const ValidationExceptionType = S.String;

export type CancelHarvestJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an in-progress harvest job.
 */
export const cancelHarvestJob: API.OperationMethod<
  CancelHarvestJobRequest,
  CancelHarvestJobResponse,
  CancelHarvestJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelHarvestJobRequest,
  output: CancelHarvestJobResponse,
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
  operationName: "CancelHarvestJob",
}));

export type CreateChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a channel to start receiving content streams. The channel represents the input to MediaPackage for incoming live content from an encoder such as AWS Elemental MediaLive. The channel receives content, and after packaging it, outputs it through an origin endpoint to downstream devices (such as video players or CDNs) that request the content. You can create only one channel with each request. We recommend that you spread out channels between channel groups, such as putting redundant channels in the same AWS Region in different channel groups.
 */
export const createChannel: API.OperationMethod<
  CreateChannelRequest,
  CreateChannelResponse,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChannelRequest,
  output: CreateChannelResponse,
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
  operationName: "CreateChannel",
}));

export type CreateChannelGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a channel group to group your channels and origin endpoints. A channel group is the top-level resource that consists of channels and origin endpoints that are associated with it and that provides predictable URLs for stream delivery. All channels and origin endpoints within the channel group are guaranteed to share the DNS. You can create only one channel group with each request.
 */
export const createChannelGroup: API.OperationMethod<
  CreateChannelGroupRequest,
  CreateChannelGroupResponse,
  CreateChannelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChannelGroupRequest,
  output: CreateChannelGroupResponse,
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
  operationName: "CreateChannelGroup",
}));

export type CreateHarvestJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new harvest job to export content from a MediaPackage v2 channel to an S3 bucket.
 */
export const createHarvestJob: API.OperationMethod<
  CreateHarvestJobRequest,
  CreateHarvestJobResponse,
  CreateHarvestJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateHarvestJobRequest,
  output: CreateHarvestJobResponse,
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
  operationName: "CreateHarvestJob",
}));

export type CreateOriginEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The endpoint is attached to a channel, and represents the output of the live content. You can associate multiple endpoints to a single channel. Each endpoint gives players and downstream CDNs (such as Amazon CloudFront) access to the content for playback. Content can't be served from a channel until it has an endpoint. You can create only one endpoint with each request.
 */
export const createOriginEndpoint: API.OperationMethod<
  CreateOriginEndpointRequest,
  CreateOriginEndpointResponse,
  CreateOriginEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateOriginEndpointRequest,
  output: CreateOriginEndpointResponse,
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
  operationName: "CreateOriginEndpoint",
}));

export type DeleteChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a channel to stop AWS Elemental MediaPackage from receiving further content. You must delete the channel's origin endpoints before you can delete the channel.
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChannelRequest,
  output: DeleteChannelResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
}));

export type DeleteChannelGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a channel group. You must delete the channel group's channels and origin endpoints before you can delete the channel group. If you delete a channel group, you'll lose access to the egress domain and will have to create a new channel group to replace it.
 */
export const deleteChannelGroup: API.OperationMethod<
  DeleteChannelGroupRequest,
  DeleteChannelGroupResponse,
  DeleteChannelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChannelGroupRequest,
  output: DeleteChannelGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelGroup",
}));

export type DeleteChannelPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a channel policy.
 */
export const deleteChannelPolicy: API.OperationMethod<
  DeleteChannelPolicyRequest,
  DeleteChannelPolicyResponse,
  DeleteChannelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChannelPolicyRequest,
  output: DeleteChannelPolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelPolicy",
}));

export type DeleteOriginEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Origin endpoints can serve content until they're deleted. Delete the endpoint if it should no longer respond to playback requests. You must delete all endpoints from a channel before you can delete the channel.
 */
export const deleteOriginEndpoint: API.OperationMethod<
  DeleteOriginEndpointRequest,
  DeleteOriginEndpointResponse,
  DeleteOriginEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOriginEndpointRequest,
  output: DeleteOriginEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOriginEndpoint",
}));

export type DeleteOriginEndpointPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an origin endpoint policy.
 */
export const deleteOriginEndpointPolicy: API.OperationMethod<
  DeleteOriginEndpointPolicyRequest,
  DeleteOriginEndpointPolicyResponse,
  DeleteOriginEndpointPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteOriginEndpointPolicyRequest,
  output: DeleteOriginEndpointPolicyResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOriginEndpointPolicy",
}));

export type GetChannelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified channel that's configured in AWS Elemental MediaPackage.
 */
export const getChannel: API.OperationMethod<
  GetChannelRequest,
  GetChannelResponse,
  GetChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChannelRequest,
  output: GetChannelResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannel",
}));

export type GetChannelGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified channel group that's configured in AWS Elemental MediaPackage.
 */
export const getChannelGroup: API.OperationMethod<
  GetChannelGroupRequest,
  GetChannelGroupResponse,
  GetChannelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChannelGroupRequest,
  output: GetChannelGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannelGroup",
}));

export type GetChannelPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified channel policy that's configured in AWS Elemental MediaPackage. With policies, you can specify who has access to AWS resources and what actions they can perform on those resources.
 */
export const getChannelPolicy: API.OperationMethod<
  GetChannelPolicyRequest,
  GetChannelPolicyResponse,
  GetChannelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChannelPolicyRequest,
  output: GetChannelPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannelPolicy",
}));

export type GetHarvestJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific harvest job.
 */
export const getHarvestJob: API.OperationMethod<
  GetHarvestJobRequest,
  GetHarvestJobResponse,
  GetHarvestJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetHarvestJobRequest,
  output: GetHarvestJobResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetHarvestJob",
}));

export type GetOriginEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified origin endpoint that's configured in AWS Elemental MediaPackage to obtain its playback URL and to view the packaging settings that it's currently using.
 */
export const getOriginEndpoint: API.OperationMethod<
  GetOriginEndpointRequest,
  GetOriginEndpointResponse,
  GetOriginEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOriginEndpointRequest,
  output: GetOriginEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOriginEndpoint",
}));

export type GetOriginEndpointPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified origin endpoint policy that's configured in AWS Elemental MediaPackage.
 */
export const getOriginEndpointPolicy: API.OperationMethod<
  GetOriginEndpointPolicyRequest,
  GetOriginEndpointPolicyResponse,
  GetOriginEndpointPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetOriginEndpointPolicyRequest,
  output: GetOriginEndpointPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOriginEndpointPolicy",
}));

export type ListChannelGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all channel groups that are configured in Elemental MediaPackage.
 */
export const listChannelGroups: API.PaginatedOperationMethod<
  ListChannelGroupsRequest,
  ListChannelGroupsResponse,
  ListChannelGroupsError,
  Credentials | HttpClient.HttpClient,
  ChannelGroupListConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChannelGroupsRequest,
  output: ListChannelGroupsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannelGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all channels in a specific channel group that are configured in AWS Elemental MediaPackage.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  ChannelListConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChannelsRequest,
  output: ListChannelsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListHarvestJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of harvest jobs that match the specified criteria.
 */
export const listHarvestJobs: API.PaginatedOperationMethod<
  ListHarvestJobsRequest,
  ListHarvestJobsResponse,
  ListHarvestJobsError,
  Credentials | HttpClient.HttpClient,
  HarvestJob
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListHarvestJobsRequest,
  output: ListHarvestJobsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListHarvestJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOriginEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all origin endpoints in a specific channel that are configured in AWS Elemental MediaPackage.
 */
export const listOriginEndpoints: API.PaginatedOperationMethod<
  ListOriginEndpointsRequest,
  ListOriginEndpointsResponse,
  ListOriginEndpointsError,
  Credentials | HttpClient.HttpClient,
  OriginEndpointListConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOriginEndpointsRequest,
  output: ListOriginEndpointsResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOriginEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ValidationException | CommonErrors;
/**
 * Lists the tags assigned to a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type PutChannelPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches an IAM policy to the specified channel. With policies, you can specify who has access to AWS resources and what actions they can perform on those resources. You can attach only one policy with each request.
 */
export const putChannelPolicy: API.OperationMethod<
  PutChannelPolicyRequest,
  PutChannelPolicyResponse,
  PutChannelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutChannelPolicyRequest,
  output: PutChannelPolicyResponse,
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
  operationName: "PutChannelPolicy",
}));

export type PutOriginEndpointPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches an IAM policy to the specified origin endpoint. You can attach only one policy with each request.
 */
export const putOriginEndpointPolicy: API.OperationMethod<
  PutOriginEndpointPolicyRequest,
  PutOriginEndpointPolicyResponse,
  PutOriginEndpointPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutOriginEndpointPolicyRequest,
  output: PutOriginEndpointPolicyResponse,
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
  operationName: "PutOriginEndpointPolicy",
}));

export type ResetChannelStateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Resetting the channel can help to clear errors from misconfigurations in the encoder. A reset refreshes the ingest stream and removes previous content.
 *
 * Be sure to stop the encoder before you reset the channel, and wait at least 30 seconds before you restart the encoder.
 */
export const resetChannelState: API.OperationMethod<
  ResetChannelStateRequest,
  ResetChannelStateResponse,
  ResetChannelStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetChannelStateRequest,
  output: ResetChannelStateResponse,
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
  operationName: "ResetChannelState",
}));

export type ResetOriginEndpointStateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Resetting the origin endpoint can help to resolve unexpected behavior and other content packaging issues. It also helps to preserve special events when you don't want the previous content to be available for viewing. A reset clears out all previous content from the origin endpoint.
 *
 * MediaPackage might return old content from this endpoint in the first 30 seconds after the endpoint reset. For best results, when possible, wait 30 seconds from endpoint reset to send playback requests to this endpoint.
 */
export const resetOriginEndpointState: API.OperationMethod<
  ResetOriginEndpointStateRequest,
  ResetOriginEndpointStateResponse,
  ResetOriginEndpointStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ResetOriginEndpointStateRequest,
  output: ResetOriginEndpointStateResponse,
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
  operationName: "ResetOriginEndpointState",
}));

export type TagResourceError = ValidationException | CommonErrors;
/**
 * Assigns one of more tags (key-value pairs) to the specified MediaPackage resource.
 *
 * Tags can help you organize and categorize your resources. You can also use them to scope user permissions, by granting a user permission to access or change only resources with certain tag values. You can use the TagResource operation with a resource that already has tags. If you specify a new tag key for the resource, this tag is appended to the list of tags associated with the resource. If you specify a tag key that is already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ValidationException | CommonErrors;
/**
 * Removes one or more tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateChannelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the specified channel. You can edit if MediaPackage sends ingest or egress access logs to the CloudWatch log group, if content will be encrypted, the description on a channel, and your channel's policy settings. You can't edit the name of the channel or CloudFront distribution details.
 *
 * Any edits you make that impact the video output may not be reflected for a few minutes.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateChannelRequest,
  output: UpdateChannelResponse,
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
  operationName: "UpdateChannel",
}));

export type UpdateChannelGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the specified channel group. You can edit the description on a channel group for easier identification later from the AWS Elemental MediaPackage console. You can't edit the name of the channel group.
 *
 * Any edits you make that impact the video output may not be reflected for a few minutes.
 */
export const updateChannelGroup: API.OperationMethod<
  UpdateChannelGroupRequest,
  UpdateChannelGroupResponse,
  UpdateChannelGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateChannelGroupRequest,
  output: UpdateChannelGroupResponse,
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
  operationName: "UpdateChannelGroup",
}));

export type UpdateOriginEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the specified origin endpoint. Edit the packaging preferences on an endpoint to optimize the viewing experience. You can't edit the name of the endpoint.
 *
 * Any edits you make that impact the video output may not be reflected for a few minutes.
 */
export const updateOriginEndpoint: API.OperationMethod<
  UpdateOriginEndpointRequest,
  UpdateOriginEndpointResponse,
  UpdateOriginEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateOriginEndpointRequest,
  output: UpdateOriginEndpointResponse,
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
  operationName: "UpdateOriginEndpoint",
}));
