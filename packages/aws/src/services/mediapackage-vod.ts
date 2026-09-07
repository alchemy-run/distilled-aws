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
  sdkId: "MediaPackage Vod",
  serviceShapeName: "MediaPackageVod",
});
const auth = T.AwsAuthSigv4({ name: "mediapackage-vod" });
const ver = T.ServiceVersion("2018-11-07");
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
              `https://mediapackage-vod-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://mediapackage-vod-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mediapackage-vod.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://mediapackage-vod.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableEntityException>()(
    "UnprocessableEntityException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export interface EgressAccessLogs {
  LogGroupName?: string;
}
export const EgressAccessLogs = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogGroupName: S.optional(S.String) }).pipe(
    S.encodeKeys({ LogGroupName: "logGroupName" }),
  ),
).annotate({
  identifier: "EgressAccessLogs",
}) as any as S.Schema<EgressAccessLogs>;
export interface ConfigureLogsRequest {
  EgressAccessLogs?: EgressAccessLogs;
  Id: string;
}
export const ConfigureLogsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.String.pipe(T.HttpLabel("Id")),
  })
    .pipe(S.encodeKeys({ EgressAccessLogs: "egressAccessLogs" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/packaging_groups/{Id}/configure_logs" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ConfigureLogsRequest",
}) as any as S.Schema<ConfigureLogsRequest>;
export interface Authorization {
  CdnIdentifierSecret?: string;
  SecretsRoleArn?: string;
}
export const Authorization = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CdnIdentifierSecret: S.optional(S.String),
    SecretsRoleArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CdnIdentifierSecret: "cdnIdentifierSecret",
      SecretsRoleArn: "secretsRoleArn",
    }),
  ),
).annotate({ identifier: "Authorization" }) as any as S.Schema<Authorization>;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface ConfigureLogsResponse {
  Arn?: string;
  Authorization?: Authorization & {
    CdnIdentifierSecret: string;
    SecretsRoleArn: string;
  };
  CreatedAt?: string;
  DomainName?: string;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export const ConfigureLogsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Authorization: S.optional(Authorization),
    CreatedAt: S.optional(S.String),
    DomainName: S.optional(S.String),
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Authorization: "authorization",
      CreatedAt: "createdAt",
      DomainName: "domainName",
      EgressAccessLogs: "egressAccessLogs",
      Id: "id",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "ConfigureLogsResponse",
}) as any as S.Schema<ConfigureLogsResponse>;
export interface CreateAssetRequest {
  Id?: string;
  PackagingGroupId?: string;
  ResourceId?: string;
  SourceArn?: string;
  SourceRoleArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    PackagingGroupId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    SourceArn: S.optional(S.String),
    SourceRoleArn: S.optional(S.String),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        Id: "id",
        PackagingGroupId: "packagingGroupId",
        ResourceId: "resourceId",
        SourceArn: "sourceArn",
        SourceRoleArn: "sourceRoleArn",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/assets" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateAssetRequest",
}) as any as S.Schema<CreateAssetRequest>;
export interface EgressEndpoint {
  PackagingConfigurationId?: string;
  Status?: string;
  Url?: string;
}
export const EgressEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PackagingConfigurationId: S.optional(S.String),
    Status: S.optional(S.String),
    Url: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      PackagingConfigurationId: "packagingConfigurationId",
      Status: "status",
      Url: "url",
    }),
  ),
).annotate({ identifier: "EgressEndpoint" }) as any as S.Schema<EgressEndpoint>;
export type __listOfEgressEndpoint = EgressEndpoint[];
export const __listOfEgressEndpoint = /*@__PURE__*/ S.Array(EgressEndpoint);
export interface CreateAssetResponse {
  Arn?: string;
  CreatedAt?: string;
  EgressEndpoints?: EgressEndpoint[];
  Id?: string;
  PackagingGroupId?: string;
  ResourceId?: string;
  SourceArn?: string;
  SourceRoleArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedAt: S.optional(S.String),
    EgressEndpoints: S.optional(__listOfEgressEndpoint),
    Id: S.optional(S.String),
    PackagingGroupId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    SourceArn: S.optional(S.String),
    SourceRoleArn: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreatedAt: "createdAt",
      EgressEndpoints: "egressEndpoints",
      Id: "id",
      PackagingGroupId: "packagingGroupId",
      ResourceId: "resourceId",
      SourceArn: "sourceArn",
      SourceRoleArn: "sourceRoleArn",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateAssetResponse",
}) as any as S.Schema<CreateAssetResponse>;
export type PresetSpeke20Audio =
  | "PRESET-AUDIO-1"
  | "PRESET-AUDIO-2"
  | "PRESET-AUDIO-3"
  | "SHARED"
  | "UNENCRYPTED"
  | (string & {});
export const PresetSpeke20Audio = /*@__PURE__*/ S.String;

export type PresetSpeke20Video =
  | "PRESET-VIDEO-1"
  | "PRESET-VIDEO-2"
  | "PRESET-VIDEO-3"
  | "PRESET-VIDEO-4"
  | "PRESET-VIDEO-5"
  | "PRESET-VIDEO-6"
  | "PRESET-VIDEO-7"
  | "PRESET-VIDEO-8"
  | "SHARED"
  | "UNENCRYPTED"
  | (string & {});
export const PresetSpeke20Video = /*@__PURE__*/ S.String;

export interface EncryptionContractConfiguration {
  PresetSpeke20Audio?: PresetSpeke20Audio;
  PresetSpeke20Video?: PresetSpeke20Video;
}
export const EncryptionContractConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PresetSpeke20Audio: S.optional(PresetSpeke20Audio),
    PresetSpeke20Video: S.optional(PresetSpeke20Video),
  }).pipe(
    S.encodeKeys({
      PresetSpeke20Audio: "presetSpeke20Audio",
      PresetSpeke20Video: "presetSpeke20Video",
    }),
  ),
).annotate({
  identifier: "EncryptionContractConfiguration",
}) as any as S.Schema<EncryptionContractConfiguration>;
export type __listOf__string = string[];
export const __listOf__string = /*@__PURE__*/ S.Array(S.String);
export interface SpekeKeyProvider {
  EncryptionContractConfiguration?: EncryptionContractConfiguration;
  RoleArn?: string;
  SystemIds?: string[];
  Url?: string;
}
export const SpekeKeyProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionContractConfiguration: S.optional(
      EncryptionContractConfiguration,
    ),
    RoleArn: S.optional(S.String),
    SystemIds: S.optional(__listOf__string),
    Url: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      EncryptionContractConfiguration: "encryptionContractConfiguration",
      RoleArn: "roleArn",
      SystemIds: "systemIds",
      Url: "url",
    }),
  ),
).annotate({
  identifier: "SpekeKeyProvider",
}) as any as S.Schema<SpekeKeyProvider>;
export interface CmafEncryption {
  ConstantInitializationVector?: string;
  SpekeKeyProvider?: SpekeKeyProvider;
}
export const CmafEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConstantInitializationVector: S.optional(S.String),
    SpekeKeyProvider: S.optional(SpekeKeyProvider),
  }).pipe(
    S.encodeKeys({
      ConstantInitializationVector: "constantInitializationVector",
      SpekeKeyProvider: "spekeKeyProvider",
    }),
  ),
).annotate({ identifier: "CmafEncryption" }) as any as S.Schema<CmafEncryption>;
export type AdMarkers =
  | "NONE"
  | "SCTE35_ENHANCED"
  | "PASSTHROUGH"
  | (string & {});
export const AdMarkers = /*@__PURE__*/ S.String;

export type StreamOrder =
  | "ORIGINAL"
  | "VIDEO_BITRATE_ASCENDING"
  | "VIDEO_BITRATE_DESCENDING"
  | (string & {});
export const StreamOrder = /*@__PURE__*/ S.String;

export interface StreamSelection {
  MaxVideoBitsPerSecond?: number;
  MinVideoBitsPerSecond?: number;
  StreamOrder?: StreamOrder;
}
export const StreamSelection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxVideoBitsPerSecond: S.optional(S.Number),
    MinVideoBitsPerSecond: S.optional(S.Number),
    StreamOrder: S.optional(StreamOrder),
  }).pipe(
    S.encodeKeys({
      MaxVideoBitsPerSecond: "maxVideoBitsPerSecond",
      MinVideoBitsPerSecond: "minVideoBitsPerSecond",
      StreamOrder: "streamOrder",
    }),
  ),
).annotate({
  identifier: "StreamSelection",
}) as any as S.Schema<StreamSelection>;
export interface HlsManifest {
  AdMarkers?: AdMarkers;
  IncludeIframeOnlyStream?: boolean;
  ManifestName?: string;
  ProgramDateTimeIntervalSeconds?: number;
  RepeatExtXKey?: boolean;
  StreamSelection?: StreamSelection;
}
export const HlsManifest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdMarkers: S.optional(AdMarkers),
    IncludeIframeOnlyStream: S.optional(S.Boolean),
    ManifestName: S.optional(S.String),
    ProgramDateTimeIntervalSeconds: S.optional(S.Number),
    RepeatExtXKey: S.optional(S.Boolean),
    StreamSelection: S.optional(StreamSelection),
  }).pipe(
    S.encodeKeys({
      AdMarkers: "adMarkers",
      IncludeIframeOnlyStream: "includeIframeOnlyStream",
      ManifestName: "manifestName",
      ProgramDateTimeIntervalSeconds: "programDateTimeIntervalSeconds",
      RepeatExtXKey: "repeatExtXKey",
      StreamSelection: "streamSelection",
    }),
  ),
).annotate({ identifier: "HlsManifest" }) as any as S.Schema<HlsManifest>;
export type __listOfHlsManifest = HlsManifest[];
export const __listOfHlsManifest = /*@__PURE__*/ S.Array(HlsManifest);
export interface CmafPackage {
  Encryption?: CmafEncryption;
  HlsManifests?: HlsManifest[];
  IncludeEncoderConfigurationInSegments?: boolean;
  SegmentDurationSeconds?: number;
}
export const CmafPackage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Encryption: S.optional(CmafEncryption),
    HlsManifests: S.optional(__listOfHlsManifest),
    IncludeEncoderConfigurationInSegments: S.optional(S.Boolean),
    SegmentDurationSeconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Encryption: "encryption",
      HlsManifests: "hlsManifests",
      IncludeEncoderConfigurationInSegments:
        "includeEncoderConfigurationInSegments",
      SegmentDurationSeconds: "segmentDurationSeconds",
    }),
  ),
).annotate({ identifier: "CmafPackage" }) as any as S.Schema<CmafPackage>;
export type ManifestLayout = "FULL" | "COMPACT" | (string & {});
export const ManifestLayout = /*@__PURE__*/ S.String;

export type Profile = "NONE" | "HBBTV_1_5" | (string & {});
export const Profile = /*@__PURE__*/ S.String;

export type ScteMarkersSource = "SEGMENTS" | "MANIFEST" | (string & {});
export const ScteMarkersSource = /*@__PURE__*/ S.String;

export interface DashManifest {
  ManifestLayout?: ManifestLayout;
  ManifestName?: string;
  MinBufferTimeSeconds?: number;
  Profile?: Profile;
  ScteMarkersSource?: ScteMarkersSource;
  StreamSelection?: StreamSelection;
}
export const DashManifest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestLayout: S.optional(ManifestLayout),
    ManifestName: S.optional(S.String),
    MinBufferTimeSeconds: S.optional(S.Number),
    Profile: S.optional(Profile),
    ScteMarkersSource: S.optional(ScteMarkersSource),
    StreamSelection: S.optional(StreamSelection),
  }).pipe(
    S.encodeKeys({
      ManifestLayout: "manifestLayout",
      ManifestName: "manifestName",
      MinBufferTimeSeconds: "minBufferTimeSeconds",
      Profile: "profile",
      ScteMarkersSource: "scteMarkersSource",
      StreamSelection: "streamSelection",
    }),
  ),
).annotate({ identifier: "DashManifest" }) as any as S.Schema<DashManifest>;
export type __listOfDashManifest = DashManifest[];
export const __listOfDashManifest = /*@__PURE__*/ S.Array(DashManifest);
export interface DashEncryption {
  SpekeKeyProvider?: SpekeKeyProvider;
}
export const DashEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SpekeKeyProvider: S.optional(SpekeKeyProvider) }).pipe(
    S.encodeKeys({ SpekeKeyProvider: "spekeKeyProvider" }),
  ),
).annotate({ identifier: "DashEncryption" }) as any as S.Schema<DashEncryption>;
export type __PeriodTriggersElement = "ADS" | (string & {});
export const __PeriodTriggersElement = /*@__PURE__*/ S.String;

export type __listOf__PeriodTriggersElement = __PeriodTriggersElement[];
export const __listOf__PeriodTriggersElement = /*@__PURE__*/ S.Array(
  __PeriodTriggersElement,
);
export type SegmentTemplateFormat =
  | "NUMBER_WITH_TIMELINE"
  | "TIME_WITH_TIMELINE"
  | "NUMBER_WITH_DURATION"
  | (string & {});
export const SegmentTemplateFormat = /*@__PURE__*/ S.String;

export interface DashPackage {
  DashManifests?: DashManifest[];
  Encryption?: DashEncryption;
  IncludeEncoderConfigurationInSegments?: boolean;
  IncludeIframeOnlyStream?: boolean;
  PeriodTriggers?: __PeriodTriggersElement[];
  SegmentDurationSeconds?: number;
  SegmentTemplateFormat?: SegmentTemplateFormat;
}
export const DashPackage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashManifests: S.optional(__listOfDashManifest),
    Encryption: S.optional(DashEncryption),
    IncludeEncoderConfigurationInSegments: S.optional(S.Boolean),
    IncludeIframeOnlyStream: S.optional(S.Boolean),
    PeriodTriggers: S.optional(__listOf__PeriodTriggersElement),
    SegmentDurationSeconds: S.optional(S.Number),
    SegmentTemplateFormat: S.optional(SegmentTemplateFormat),
  }).pipe(
    S.encodeKeys({
      DashManifests: "dashManifests",
      Encryption: "encryption",
      IncludeEncoderConfigurationInSegments:
        "includeEncoderConfigurationInSegments",
      IncludeIframeOnlyStream: "includeIframeOnlyStream",
      PeriodTriggers: "periodTriggers",
      SegmentDurationSeconds: "segmentDurationSeconds",
      SegmentTemplateFormat: "segmentTemplateFormat",
    }),
  ),
).annotate({ identifier: "DashPackage" }) as any as S.Schema<DashPackage>;
export type EncryptionMethod = "AES_128" | "SAMPLE_AES" | (string & {});
export const EncryptionMethod = /*@__PURE__*/ S.String;

export interface HlsEncryption {
  ConstantInitializationVector?: string;
  EncryptionMethod?: EncryptionMethod;
  SpekeKeyProvider?: SpekeKeyProvider;
}
export const HlsEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConstantInitializationVector: S.optional(S.String),
    EncryptionMethod: S.optional(EncryptionMethod),
    SpekeKeyProvider: S.optional(SpekeKeyProvider),
  }).pipe(
    S.encodeKeys({
      ConstantInitializationVector: "constantInitializationVector",
      EncryptionMethod: "encryptionMethod",
      SpekeKeyProvider: "spekeKeyProvider",
    }),
  ),
).annotate({ identifier: "HlsEncryption" }) as any as S.Schema<HlsEncryption>;
export interface HlsPackage {
  Encryption?: HlsEncryption;
  HlsManifests?: HlsManifest[];
  IncludeDvbSubtitles?: boolean;
  SegmentDurationSeconds?: number;
  UseAudioRenditionGroup?: boolean;
}
export const HlsPackage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Encryption: S.optional(HlsEncryption),
    HlsManifests: S.optional(__listOfHlsManifest),
    IncludeDvbSubtitles: S.optional(S.Boolean),
    SegmentDurationSeconds: S.optional(S.Number),
    UseAudioRenditionGroup: S.optional(S.Boolean),
  }).pipe(
    S.encodeKeys({
      Encryption: "encryption",
      HlsManifests: "hlsManifests",
      IncludeDvbSubtitles: "includeDvbSubtitles",
      SegmentDurationSeconds: "segmentDurationSeconds",
      UseAudioRenditionGroup: "useAudioRenditionGroup",
    }),
  ),
).annotate({ identifier: "HlsPackage" }) as any as S.Schema<HlsPackage>;
export interface MssEncryption {
  SpekeKeyProvider?: SpekeKeyProvider;
}
export const MssEncryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SpekeKeyProvider: S.optional(SpekeKeyProvider) }).pipe(
    S.encodeKeys({ SpekeKeyProvider: "spekeKeyProvider" }),
  ),
).annotate({ identifier: "MssEncryption" }) as any as S.Schema<MssEncryption>;
export interface MssManifest {
  ManifestName?: string;
  StreamSelection?: StreamSelection;
}
export const MssManifest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestName: S.optional(S.String),
    StreamSelection: S.optional(StreamSelection),
  }).pipe(
    S.encodeKeys({
      ManifestName: "manifestName",
      StreamSelection: "streamSelection",
    }),
  ),
).annotate({ identifier: "MssManifest" }) as any as S.Schema<MssManifest>;
export type __listOfMssManifest = MssManifest[];
export const __listOfMssManifest = /*@__PURE__*/ S.Array(MssManifest);
export interface MssPackage {
  Encryption?: MssEncryption;
  MssManifests?: MssManifest[];
  SegmentDurationSeconds?: number;
}
export const MssPackage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Encryption: S.optional(MssEncryption),
    MssManifests: S.optional(__listOfMssManifest),
    SegmentDurationSeconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Encryption: "encryption",
      MssManifests: "mssManifests",
      SegmentDurationSeconds: "segmentDurationSeconds",
    }),
  ),
).annotate({ identifier: "MssPackage" }) as any as S.Schema<MssPackage>;
export interface CreatePackagingConfigurationRequest {
  CmafPackage?: CmafPackage;
  DashPackage?: DashPackage;
  HlsPackage?: HlsPackage;
  Id?: string;
  MssPackage?: MssPackage;
  PackagingGroupId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePackagingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CmafPackage: S.optional(CmafPackage),
    DashPackage: S.optional(DashPackage),
    HlsPackage: S.optional(HlsPackage),
    Id: S.optional(S.String),
    MssPackage: S.optional(MssPackage),
    PackagingGroupId: S.optional(S.String),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        CmafPackage: "cmafPackage",
        DashPackage: "dashPackage",
        HlsPackage: "hlsPackage",
        Id: "id",
        MssPackage: "mssPackage",
        PackagingGroupId: "packagingGroupId",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/packaging_configurations" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePackagingConfigurationRequest",
}) as any as S.Schema<CreatePackagingConfigurationRequest>;
export interface CreatePackagingConfigurationResponse {
  Arn?: string;
  CmafPackage?: CmafPackage & {
    HlsManifests: __listOfHlsManifest;
    Encryption: CmafEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  CreatedAt?: string;
  DashPackage?: DashPackage & {
    DashManifests: __listOfDashManifest;
    Encryption: DashEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  HlsPackage?: HlsPackage & {
    HlsManifests: __listOfHlsManifest;
    Encryption: HlsEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  Id?: string;
  MssPackage?: MssPackage & {
    MssManifests: __listOfMssManifest;
    Encryption: MssEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  PackagingGroupId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePackagingConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CmafPackage: S.optional(CmafPackage),
      CreatedAt: S.optional(S.String),
      DashPackage: S.optional(DashPackage),
      HlsPackage: S.optional(HlsPackage),
      Id: S.optional(S.String),
      MssPackage: S.optional(MssPackage),
      PackagingGroupId: S.optional(S.String),
      Tags: S.optional(Tags),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        CmafPackage: "cmafPackage",
        CreatedAt: "createdAt",
        DashPackage: "dashPackage",
        HlsPackage: "hlsPackage",
        Id: "id",
        MssPackage: "mssPackage",
        PackagingGroupId: "packagingGroupId",
        Tags: "tags",
      }),
    ),
).annotate({
  identifier: "CreatePackagingConfigurationResponse",
}) as any as S.Schema<CreatePackagingConfigurationResponse>;
export interface CreatePackagingGroupRequest {
  Authorization?: Authorization;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePackagingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.optional(S.String),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        Authorization: "authorization",
        EgressAccessLogs: "egressAccessLogs",
        Id: "id",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/packaging_groups" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePackagingGroupRequest",
}) as any as S.Schema<CreatePackagingGroupRequest>;
export interface CreatePackagingGroupResponse {
  Arn?: string;
  Authorization?: Authorization & {
    CdnIdentifierSecret: string;
    SecretsRoleArn: string;
  };
  CreatedAt?: string;
  DomainName?: string;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePackagingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Authorization: S.optional(Authorization),
    CreatedAt: S.optional(S.String),
    DomainName: S.optional(S.String),
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Authorization: "authorization",
      CreatedAt: "createdAt",
      DomainName: "domainName",
      EgressAccessLogs: "egressAccessLogs",
      Id: "id",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreatePackagingGroupResponse",
}) as any as S.Schema<CreatePackagingGroupResponse>;
export interface DeleteAssetRequest {
  Id: string;
}
export const DeleteAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/assets/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteAssetRequest",
}) as any as S.Schema<DeleteAssetRequest>;
export interface DeleteAssetResponse {}
export const DeleteAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteAssetResponse",
}) as any as S.Schema<DeleteAssetResponse>;
export interface DeletePackagingConfigurationRequest {
  Id: string;
}
export const DeletePackagingConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/packaging_configurations/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePackagingConfigurationRequest",
}) as any as S.Schema<DeletePackagingConfigurationRequest>;
export interface DeletePackagingConfigurationResponse {}
export const DeletePackagingConfigurationResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeletePackagingConfigurationResponse",
}) as any as S.Schema<DeletePackagingConfigurationResponse>;
export interface DeletePackagingGroupRequest {
  Id: string;
}
export const DeletePackagingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/packaging_groups/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePackagingGroupRequest",
}) as any as S.Schema<DeletePackagingGroupRequest>;
export interface DeletePackagingGroupResponse {}
export const DeletePackagingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePackagingGroupResponse",
}) as any as S.Schema<DeletePackagingGroupResponse>;
export interface DescribeAssetRequest {
  Id: string;
}
export const DescribeAssetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assets/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAssetRequest",
}) as any as S.Schema<DescribeAssetRequest>;
export interface DescribeAssetResponse {
  Arn?: string;
  CreatedAt?: string;
  EgressEndpoints?: EgressEndpoint[];
  Id?: string;
  PackagingGroupId?: string;
  ResourceId?: string;
  SourceArn?: string;
  SourceRoleArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const DescribeAssetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedAt: S.optional(S.String),
    EgressEndpoints: S.optional(__listOfEgressEndpoint),
    Id: S.optional(S.String),
    PackagingGroupId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    SourceArn: S.optional(S.String),
    SourceRoleArn: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreatedAt: "createdAt",
      EgressEndpoints: "egressEndpoints",
      Id: "id",
      PackagingGroupId: "packagingGroupId",
      ResourceId: "resourceId",
      SourceArn: "sourceArn",
      SourceRoleArn: "sourceRoleArn",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "DescribeAssetResponse",
}) as any as S.Schema<DescribeAssetResponse>;
export interface DescribePackagingConfigurationRequest {
  Id: string;
}
export const DescribePackagingConfigurationRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
      T.all(
        T.Http({ method: "GET", uri: "/packaging_configurations/{Id}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribePackagingConfigurationRequest",
}) as any as S.Schema<DescribePackagingConfigurationRequest>;
export interface DescribePackagingConfigurationResponse {
  Arn?: string;
  CmafPackage?: CmafPackage & {
    HlsManifests: __listOfHlsManifest;
    Encryption: CmafEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  CreatedAt?: string;
  DashPackage?: DashPackage & {
    DashManifests: __listOfDashManifest;
    Encryption: DashEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  HlsPackage?: HlsPackage & {
    HlsManifests: __listOfHlsManifest;
    Encryption: HlsEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  Id?: string;
  MssPackage?: MssPackage & {
    MssManifests: __listOfMssManifest;
    Encryption: MssEncryption & {
      SpekeKeyProvider: SpekeKeyProvider & {
        RoleArn: string;
        SystemIds: __listOf__string;
        Url: string;
        EncryptionContractConfiguration: EncryptionContractConfiguration & {
          PresetSpeke20Audio: PresetSpeke20Audio;
          PresetSpeke20Video: PresetSpeke20Video;
        };
      };
    };
  };
  PackagingGroupId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const DescribePackagingConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CmafPackage: S.optional(CmafPackage),
      CreatedAt: S.optional(S.String),
      DashPackage: S.optional(DashPackage),
      HlsPackage: S.optional(HlsPackage),
      Id: S.optional(S.String),
      MssPackage: S.optional(MssPackage),
      PackagingGroupId: S.optional(S.String),
      Tags: S.optional(Tags),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        CmafPackage: "cmafPackage",
        CreatedAt: "createdAt",
        DashPackage: "dashPackage",
        HlsPackage: "hlsPackage",
        Id: "id",
        MssPackage: "mssPackage",
        PackagingGroupId: "packagingGroupId",
        Tags: "tags",
      }),
    ),
).annotate({
  identifier: "DescribePackagingConfigurationResponse",
}) as any as S.Schema<DescribePackagingConfigurationResponse>;
export interface DescribePackagingGroupRequest {
  Id: string;
}
export const DescribePackagingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packaging_groups/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribePackagingGroupRequest",
}) as any as S.Schema<DescribePackagingGroupRequest>;
export interface DescribePackagingGroupResponse {
  ApproximateAssetCount?: number;
  Arn?: string;
  Authorization?: Authorization & {
    CdnIdentifierSecret: string;
    SecretsRoleArn: string;
  };
  CreatedAt?: string;
  DomainName?: string;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export const DescribePackagingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApproximateAssetCount: S.optional(S.Number),
    Arn: S.optional(S.String),
    Authorization: S.optional(Authorization),
    CreatedAt: S.optional(S.String),
    DomainName: S.optional(S.String),
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ApproximateAssetCount: "approximateAssetCount",
      Arn: "arn",
      Authorization: "authorization",
      CreatedAt: "createdAt",
      DomainName: "domainName",
      EgressAccessLogs: "egressAccessLogs",
      Id: "id",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "DescribePackagingGroupResponse",
}) as any as S.Schema<DescribePackagingGroupResponse>;
export type MaxResults = number;
export interface ListAssetsRequest {
  MaxResults?: number;
  NextToken?: string;
  PackagingGroupId?: string;
}
export const ListAssetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    PackagingGroupId: S.optional(S.String).pipe(
      T.HttpQuery("packagingGroupId"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/assets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAssetsRequest",
}) as any as S.Schema<ListAssetsRequest>;
export interface AssetShallow {
  Arn?: string;
  CreatedAt?: string;
  Id?: string;
  PackagingGroupId?: string;
  ResourceId?: string;
  SourceArn?: string;
  SourceRoleArn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const AssetShallow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedAt: S.optional(S.String),
    Id: S.optional(S.String),
    PackagingGroupId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    SourceArn: S.optional(S.String),
    SourceRoleArn: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreatedAt: "createdAt",
      Id: "id",
      PackagingGroupId: "packagingGroupId",
      ResourceId: "resourceId",
      SourceArn: "sourceArn",
      SourceRoleArn: "sourceRoleArn",
      Tags: "tags",
    }),
  ),
).annotate({ identifier: "AssetShallow" }) as any as S.Schema<AssetShallow>;
export type __listOfAssetShallow = AssetShallow[];
export const __listOfAssetShallow = /*@__PURE__*/ S.Array(AssetShallow);
export interface ListAssetsResponse {
  Assets?: AssetShallow[];
  NextToken?: string;
}
export const ListAssetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Assets: S.optional(__listOfAssetShallow),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Assets: "assets", NextToken: "nextToken" })),
).annotate({
  identifier: "ListAssetsResponse",
}) as any as S.Schema<ListAssetsResponse>;
export interface ListPackagingConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
  PackagingGroupId?: string;
}
export const ListPackagingConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    PackagingGroupId: S.optional(S.String).pipe(
      T.HttpQuery("packagingGroupId"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packaging_configurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPackagingConfigurationsRequest",
}) as any as S.Schema<ListPackagingConfigurationsRequest>;
export interface PackagingConfiguration {
  Arn?: string;
  CmafPackage?: CmafPackage;
  CreatedAt?: string;
  DashPackage?: DashPackage;
  HlsPackage?: HlsPackage;
  Id?: string;
  MssPackage?: MssPackage;
  PackagingGroupId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const PackagingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CmafPackage: S.optional(CmafPackage),
    CreatedAt: S.optional(S.String),
    DashPackage: S.optional(DashPackage),
    HlsPackage: S.optional(HlsPackage),
    Id: S.optional(S.String),
    MssPackage: S.optional(MssPackage),
    PackagingGroupId: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CmafPackage: "cmafPackage",
      CreatedAt: "createdAt",
      DashPackage: "dashPackage",
      HlsPackage: "hlsPackage",
      Id: "id",
      MssPackage: "mssPackage",
      PackagingGroupId: "packagingGroupId",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "PackagingConfiguration",
}) as any as S.Schema<PackagingConfiguration>;
export type __listOfPackagingConfiguration = PackagingConfiguration[];
export const __listOfPackagingConfiguration = /*@__PURE__*/ S.Array(
  PackagingConfiguration,
);
export interface ListPackagingConfigurationsResponse {
  NextToken?: string;
  PackagingConfigurations?: (PackagingConfiguration & {
    CmafPackage: CmafPackage & {
      HlsManifests: __listOfHlsManifest;
      Encryption: CmafEncryption & {
        SpekeKeyProvider: SpekeKeyProvider & {
          RoleArn: string;
          SystemIds: __listOf__string;
          Url: string;
          EncryptionContractConfiguration: EncryptionContractConfiguration & {
            PresetSpeke20Audio: PresetSpeke20Audio;
            PresetSpeke20Video: PresetSpeke20Video;
          };
        };
      };
    };
    DashPackage: DashPackage & {
      DashManifests: __listOfDashManifest;
      Encryption: DashEncryption & {
        SpekeKeyProvider: SpekeKeyProvider & {
          RoleArn: string;
          SystemIds: __listOf__string;
          Url: string;
          EncryptionContractConfiguration: EncryptionContractConfiguration & {
            PresetSpeke20Audio: PresetSpeke20Audio;
            PresetSpeke20Video: PresetSpeke20Video;
          };
        };
      };
    };
    HlsPackage: HlsPackage & {
      HlsManifests: __listOfHlsManifest;
      Encryption: HlsEncryption & {
        SpekeKeyProvider: SpekeKeyProvider & {
          RoleArn: string;
          SystemIds: __listOf__string;
          Url: string;
          EncryptionContractConfiguration: EncryptionContractConfiguration & {
            PresetSpeke20Audio: PresetSpeke20Audio;
            PresetSpeke20Video: PresetSpeke20Video;
          };
        };
      };
    };
    MssPackage: MssPackage & {
      MssManifests: __listOfMssManifest;
      Encryption: MssEncryption & {
        SpekeKeyProvider: SpekeKeyProvider & {
          RoleArn: string;
          SystemIds: __listOf__string;
          Url: string;
          EncryptionContractConfiguration: EncryptionContractConfiguration & {
            PresetSpeke20Audio: PresetSpeke20Audio;
            PresetSpeke20Video: PresetSpeke20Video;
          };
        };
      };
    };
  })[];
}
export const ListPackagingConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PackagingConfigurations: S.optional(__listOfPackagingConfiguration),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      PackagingConfigurations: "packagingConfigurations",
    }),
  ),
).annotate({
  identifier: "ListPackagingConfigurationsResponse",
}) as any as S.Schema<ListPackagingConfigurationsResponse>;
export interface ListPackagingGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListPackagingGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/packaging_groups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPackagingGroupsRequest",
}) as any as S.Schema<ListPackagingGroupsRequest>;
export interface PackagingGroup {
  ApproximateAssetCount?: number;
  Arn?: string;
  Authorization?: Authorization;
  CreatedAt?: string;
  DomainName?: string;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export const PackagingGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApproximateAssetCount: S.optional(S.Number),
    Arn: S.optional(S.String),
    Authorization: S.optional(Authorization),
    CreatedAt: S.optional(S.String),
    DomainName: S.optional(S.String),
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ApproximateAssetCount: "approximateAssetCount",
      Arn: "arn",
      Authorization: "authorization",
      CreatedAt: "createdAt",
      DomainName: "domainName",
      EgressAccessLogs: "egressAccessLogs",
      Id: "id",
      Tags: "tags",
    }),
  ),
).annotate({ identifier: "PackagingGroup" }) as any as S.Schema<PackagingGroup>;
export type __listOfPackagingGroup = PackagingGroup[];
export const __listOfPackagingGroup = /*@__PURE__*/ S.Array(PackagingGroup);
export interface ListPackagingGroupsResponse {
  NextToken?: string;
  PackagingGroups?: (PackagingGroup & {
    Authorization: Authorization & {
      CdnIdentifierSecret: string;
      SecretsRoleArn: string;
    };
  })[];
}
export const ListPackagingGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    PackagingGroups: S.optional(__listOfPackagingGroup),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      PackagingGroups: "packagingGroups",
    }),
  ),
).annotate({
  identifier: "ListPackagingGroupsResponse",
}) as any as S.Schema<ListPackagingGroupsResponse>;
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
export type __mapOf__string = { [key: string]: string | undefined };
export const __mapOf__string = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface ListTagsForResourceResponse {
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(__mapOf__string) }).pipe(
    S.encodeKeys({ Tags: "tags" }),
  ),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: S.optional(__mapOf__string),
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
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
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
export interface UpdatePackagingGroupRequest {
  Authorization?: Authorization;
  Id: string;
}
export const UpdatePackagingGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Authorization: S.optional(Authorization),
    Id: S.String.pipe(T.HttpLabel("Id")),
  })
    .pipe(S.encodeKeys({ Authorization: "authorization" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/packaging_groups/{Id}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdatePackagingGroupRequest",
}) as any as S.Schema<UpdatePackagingGroupRequest>;
export interface UpdatePackagingGroupResponse {
  ApproximateAssetCount?: number;
  Arn?: string;
  Authorization?: Authorization & {
    CdnIdentifierSecret: string;
    SecretsRoleArn: string;
  };
  CreatedAt?: string;
  DomainName?: string;
  EgressAccessLogs?: EgressAccessLogs;
  Id?: string;
  Tags?: { [key: string]: string | undefined };
}
export const UpdatePackagingGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApproximateAssetCount: S.optional(S.Number),
    Arn: S.optional(S.String),
    Authorization: S.optional(Authorization),
    CreatedAt: S.optional(S.String),
    DomainName: S.optional(S.String),
    EgressAccessLogs: S.optional(EgressAccessLogs),
    Id: S.optional(S.String),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      ApproximateAssetCount: "approximateAssetCount",
      Arn: "arn",
      Authorization: "authorization",
      CreatedAt: "createdAt",
      DomainName: "domainName",
      EgressAccessLogs: "egressAccessLogs",
      Id: "id",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "UpdatePackagingGroupResponse",
}) as any as S.Schema<UpdatePackagingGroupResponse>;
export type ConfigureLogsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Changes the packaging group's properities to configure log subscription
 */
export const configureLogs: API.OperationMethod<
  ConfigureLogsRequest,
  ConfigureLogsResponse,
  ConfigureLogsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConfigureLogsRequest,
  output: ConfigureLogsResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfigureLogs",
}));

export type CreateAssetError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Creates a new MediaPackage VOD Asset resource.
 */
export const createAsset: API.OperationMethod<
  CreateAssetRequest,
  CreateAssetResponse,
  CreateAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateAssetRequest,
  output: CreateAssetResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAsset",
}));

export type CreatePackagingConfigurationError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Creates a new MediaPackage VOD PackagingConfiguration resource.
 */
export const createPackagingConfiguration: API.OperationMethod<
  CreatePackagingConfigurationRequest,
  CreatePackagingConfigurationResponse,
  CreatePackagingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePackagingConfigurationRequest,
  output: CreatePackagingConfigurationResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePackagingConfiguration",
}));

export type CreatePackagingGroupError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Creates a new MediaPackage VOD PackagingGroup resource.
 */
export const createPackagingGroup: API.OperationMethod<
  CreatePackagingGroupRequest,
  CreatePackagingGroupResponse,
  CreatePackagingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePackagingGroupRequest,
  output: CreatePackagingGroupResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePackagingGroup",
}));

export type DeleteAssetError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Deletes an existing MediaPackage VOD Asset resource.
 */
export const deleteAsset: API.OperationMethod<
  DeleteAssetRequest,
  DeleteAssetResponse,
  DeleteAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteAssetRequest,
  output: DeleteAssetResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAsset",
}));

export type DeletePackagingConfigurationError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Deletes a MediaPackage VOD PackagingConfiguration resource.
 */
export const deletePackagingConfiguration: API.OperationMethod<
  DeletePackagingConfigurationRequest,
  DeletePackagingConfigurationResponse,
  DeletePackagingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePackagingConfigurationRequest,
  output: DeletePackagingConfigurationResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePackagingConfiguration",
}));

export type DeletePackagingGroupError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Deletes a MediaPackage VOD PackagingGroup resource.
 */
export const deletePackagingGroup: API.OperationMethod<
  DeletePackagingGroupRequest,
  DeletePackagingGroupResponse,
  DeletePackagingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePackagingGroupRequest,
  output: DeletePackagingGroupResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePackagingGroup",
}));

export type DescribeAssetError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a description of a MediaPackage VOD Asset resource.
 */
export const describeAsset: API.OperationMethod<
  DescribeAssetRequest,
  DescribeAssetResponse,
  DescribeAssetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAssetRequest,
  output: DescribeAssetResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAsset",
}));

export type DescribePackagingConfigurationError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a description of a MediaPackage VOD PackagingConfiguration resource.
 */
export const describePackagingConfiguration: API.OperationMethod<
  DescribePackagingConfigurationRequest,
  DescribePackagingConfigurationResponse,
  DescribePackagingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePackagingConfigurationRequest,
  output: DescribePackagingConfigurationResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePackagingConfiguration",
}));

export type DescribePackagingGroupError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a description of a MediaPackage VOD PackagingGroup resource.
 */
export const describePackagingGroup: API.OperationMethod<
  DescribePackagingGroupRequest,
  DescribePackagingGroupResponse,
  DescribePackagingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribePackagingGroupRequest,
  output: DescribePackagingGroupResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribePackagingGroup",
}));

export type ListAssetsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a collection of MediaPackage VOD Asset resources.
 */
export const listAssets: API.PaginatedOperationMethod<
  ListAssetsRequest,
  ListAssetsResponse,
  ListAssetsError,
  Credentials | HttpClient.HttpClient,
  AssetShallow
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAssetsRequest,
  output: ListAssetsResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Assets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPackagingConfigurationsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a collection of MediaPackage VOD PackagingConfiguration resources.
 */
export const listPackagingConfigurations: API.PaginatedOperationMethod<
  ListPackagingConfigurationsRequest,
  ListPackagingConfigurationsResponse,
  ListPackagingConfigurationsError,
  Credentials | HttpClient.HttpClient,
  PackagingConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPackagingConfigurationsRequest,
  output: ListPackagingConfigurationsResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackagingConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PackagingConfigurations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPackagingGroupsError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Returns a collection of MediaPackage VOD PackagingGroup resources.
 */
export const listPackagingGroups: API.PaginatedOperationMethod<
  ListPackagingGroupsRequest,
  ListPackagingGroupsResponse,
  ListPackagingGroupsError,
  Credentials | HttpClient.HttpClient,
  PackagingGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPackagingGroupsRequest,
  output: ListPackagingGroupsResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPackagingGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PackagingGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 * Returns a list of the tags assigned to the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type TagResourceError = CommonErrors;
/**
 * Adds tags to the specified resource. You can specify one or more tags to add.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = CommonErrors;
/**
 * Removes tags from the specified resource. You can specify one or more tags to remove.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdatePackagingGroupError =
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceUnavailableException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Updates a specific packaging group. You can't change the id attribute or any other system-generated attributes.
 */
export const updatePackagingGroup: API.OperationMethod<
  UpdatePackagingGroupRequest,
  UpdatePackagingGroupResponse,
  UpdatePackagingGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePackagingGroupRequest,
  output: UpdatePackagingGroupResponse,
  errors: [
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceUnavailableException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePackagingGroup",
}));
