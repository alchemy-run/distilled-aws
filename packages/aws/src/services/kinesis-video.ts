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
const ns = T.XmlNamespace("https://kinesisvideo.amazonaws.com/doc/2017-09-30/");
const svc = T.AwsApiService({
  sdkId: "Kinesis Video",
  serviceShapeName: "KinesisVideo_20170930",
});
const auth = T.AwsAuthSigv4({ name: "kinesisvideo" });
const ver = T.ServiceVersion("2017-09-30");
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
              `https://kinesisvideo-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://kinesisvideo-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://kinesisvideo.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class AccountChannelLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AccountChannelLimitExceededException>()(
    "AccountChannelLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class AccountStreamLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<AccountStreamLimitExceededException>()(
    "AccountStreamLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ClientLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ClientLimitExceededException>()(
    "ClientLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class DeviceStreamLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<DeviceStreamLimitExceededException>()(
    "DeviceStreamLimitExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()(
    "InvalidArgumentException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidDeviceException
  extends /*@__PURE__*/ S.TaggedError<InvalidDeviceException>()(
    "InvalidDeviceException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidResourceFormatException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourceFormatException>()(
    "InvalidResourceFormatException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NoDataRetentionException
  extends /*@__PURE__*/ S.TaggedError<NoDataRetentionException>()(
    "NoDataRetentionException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class NotAuthorizedException
  extends /*@__PURE__*/ S.TaggedError<NotAuthorizedException>()(
    "NotAuthorizedException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class StreamEdgeConfigurationNotFoundException
  extends /*@__PURE__*/ S.TaggedError<StreamEdgeConfigurationNotFoundException>()(
    "StreamEdgeConfigurationNotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class StreamNotActive
  extends /*@__PURE__*/ S.TaggedError<StreamNotActive>()(
    "StreamNotActive",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "ResourceNotFoundException",
      message: { includes: "not active" },
    }),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class TagsPerResourceExceededLimitException
  extends /*@__PURE__*/ S.TaggedError<TagsPerResourceExceededLimitException>()(
    "TagsPerResourceExceededLimitException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class VersionMismatchException
  extends /*@__PURE__*/ S.TaggedError<VersionMismatchException>()(
    "VersionMismatchException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ChannelName = string;
export type ChannelType = "SINGLE_MASTER" | "FULL_MESH" | (string & {});
export const ChannelType = S.String;

export type MessageTtlSeconds = number;
export interface SingleMasterConfiguration {
  MessageTtlSeconds?: number;
}
export const SingleMasterConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MessageTtlSeconds: S.optional(S.Number) }),
).annotate({
  identifier: "SingleMasterConfiguration",
}) as any as S.Schema<SingleMasterConfiguration>;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagOnCreateList = Tag[];
export const TagOnCreateList = /*@__PURE__*/ S.Array(Tag);
export interface CreateSignalingChannelInput {
  ChannelName: string;
  ChannelType?: ChannelType;
  SingleMasterConfiguration?: SingleMasterConfiguration;
  Tags?: Tag[];
}
export const CreateSignalingChannelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelName: S.String,
    ChannelType: S.optional(ChannelType),
    SingleMasterConfiguration: S.optional(SingleMasterConfiguration),
    Tags: S.optional(TagOnCreateList),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/createSignalingChannel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateSignalingChannelInput",
}) as any as S.Schema<CreateSignalingChannelInput>;
export type ResourceARN = string;
export interface CreateSignalingChannelOutput {
  ChannelARN?: string;
}
export const CreateSignalingChannelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelARN: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateSignalingChannelOutput",
}) as any as S.Schema<CreateSignalingChannelOutput>;
export type DeviceName = string;
export type StreamName = string;
export type MediaType = string;
export type KmsKeyId = string;
export type DataRetentionInHours = number;
export type ResourceTags = { [key: string]: string | undefined };
export const ResourceTags = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type DefaultStorageTier = "HOT" | "WARM" | (string & {});
export const DefaultStorageTier = S.String;

export interface StreamStorageConfiguration {
  DefaultStorageTier: DefaultStorageTier;
}
export const StreamStorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DefaultStorageTier: DefaultStorageTier }),
).annotate({
  identifier: "StreamStorageConfiguration",
}) as any as S.Schema<StreamStorageConfiguration>;
export interface CreateStreamInput {
  DeviceName?: string;
  StreamName: string;
  MediaType?: string;
  KmsKeyId?: string;
  DataRetentionInHours?: number;
  Tags?: { [key: string]: string | undefined };
  StreamStorageConfiguration?: StreamStorageConfiguration;
}
export const CreateStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceName: S.optional(S.String),
    StreamName: S.String,
    MediaType: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    DataRetentionInHours: S.optional(S.Number),
    Tags: S.optional(ResourceTags),
    StreamStorageConfiguration: S.optional(StreamStorageConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/createStream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateStreamInput",
}) as any as S.Schema<CreateStreamInput>;
export interface CreateStreamOutput {
  StreamARN?: string;
}
export const CreateStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StreamARN: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "CreateStreamOutput",
}) as any as S.Schema<CreateStreamOutput>;
export interface DeleteEdgeConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
}
export const DeleteEdgeConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamName: S.optional(S.String),
    StreamARN: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/deleteEdgeConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteEdgeConfigurationInput",
}) as any as S.Schema<DeleteEdgeConfigurationInput>;
export interface DeleteEdgeConfigurationOutput {}
export const DeleteEdgeConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteEdgeConfigurationOutput",
}) as any as S.Schema<DeleteEdgeConfigurationOutput>;
export type Version = string;
export interface DeleteSignalingChannelInput {
  ChannelARN: string;
  CurrentVersion?: string;
}
export const DeleteSignalingChannelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelARN: S.String, CurrentVersion: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/deleteSignalingChannel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSignalingChannelInput",
}) as any as S.Schema<DeleteSignalingChannelInput>;
export interface DeleteSignalingChannelOutput {}
export const DeleteSignalingChannelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteSignalingChannelOutput",
}) as any as S.Schema<DeleteSignalingChannelOutput>;
export interface DeleteStreamInput {
  StreamARN: string;
  CurrentVersion?: string;
}
export const DeleteStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StreamARN: S.String, CurrentVersion: S.optional(S.String) }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/deleteStream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteStreamInput",
}) as any as S.Schema<DeleteStreamInput>;
export interface DeleteStreamOutput {}
export const DeleteStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "DeleteStreamOutput",
}) as any as S.Schema<DeleteStreamOutput>;
export interface DescribeEdgeConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
}
export const DescribeEdgeConfigurationInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamName: S.optional(S.String),
    StreamARN: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/describeEdgeConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeEdgeConfigurationInput",
}) as any as S.Schema<DescribeEdgeConfigurationInput>;
export type SyncStatus =
  | "SYNCING"
  | "ACKNOWLEDGED"
  | "IN_SYNC"
  | "SYNC_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | "DELETING_ACKNOWLEDGED"
  | (string & {});
export const SyncStatus = S.String;

export type FailedStatusDetails = string;
export type HubDeviceArn = string;
export type MediaUriSecretArn = string | redacted.Redacted<string>;
export type MediaUriType = "RTSP_URI" | "FILE_URI" | (string & {});
export const MediaUriType = S.String;

export interface MediaSourceConfig {
  MediaUriSecretArn: string | redacted.Redacted<string>;
  MediaUriType: MediaUriType;
}
export const MediaSourceConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MediaUriSecretArn: SensitiveString, MediaUriType: MediaUriType }),
).annotate({
  identifier: "MediaSourceConfig",
}) as any as S.Schema<MediaSourceConfig>;
export type ScheduleExpression = string;
export type DurationInSeconds = number;
export interface ScheduleConfig {
  ScheduleExpression: string;
  DurationInSeconds: number;
}
export const ScheduleConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduleExpression: S.String, DurationInSeconds: S.Number }),
).annotate({ identifier: "ScheduleConfig" }) as any as S.Schema<ScheduleConfig>;
export interface RecorderConfig {
  MediaSourceConfig: MediaSourceConfig;
  ScheduleConfig?: ScheduleConfig;
}
export const RecorderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaSourceConfig: MediaSourceConfig,
    ScheduleConfig: S.optional(ScheduleConfig),
  }),
).annotate({ identifier: "RecorderConfig" }) as any as S.Schema<RecorderConfig>;
export interface UploaderConfig {
  ScheduleConfig: ScheduleConfig;
}
export const UploaderConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduleConfig: ScheduleConfig }),
).annotate({ identifier: "UploaderConfig" }) as any as S.Schema<UploaderConfig>;
export type EdgeRetentionInHours = number;
export type MaxLocalMediaSizeInMB = number;
export type StrategyOnFullSize =
  | "DELETE_OLDEST_MEDIA"
  | "DENY_NEW_MEDIA"
  | (string & {});
export const StrategyOnFullSize = S.String;

export interface LocalSizeConfig {
  MaxLocalMediaSizeInMB?: number;
  StrategyOnFullSize?: StrategyOnFullSize;
}
export const LocalSizeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxLocalMediaSizeInMB: S.optional(S.Number),
    StrategyOnFullSize: S.optional(StrategyOnFullSize),
  }),
).annotate({
  identifier: "LocalSizeConfig",
}) as any as S.Schema<LocalSizeConfig>;
export type DeleteAfterUpload = boolean;
export interface DeletionConfig {
  EdgeRetentionInHours?: number;
  LocalSizeConfig?: LocalSizeConfig;
  DeleteAfterUpload?: boolean;
}
export const DeletionConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EdgeRetentionInHours: S.optional(S.Number),
    LocalSizeConfig: S.optional(LocalSizeConfig),
    DeleteAfterUpload: S.optional(S.Boolean),
  }),
).annotate({ identifier: "DeletionConfig" }) as any as S.Schema<DeletionConfig>;
export interface EdgeConfig {
  HubDeviceArn: string;
  RecorderConfig: RecorderConfig;
  UploaderConfig?: UploaderConfig;
  DeletionConfig?: DeletionConfig;
}
export const EdgeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HubDeviceArn: S.String,
    RecorderConfig: RecorderConfig,
    UploaderConfig: S.optional(UploaderConfig),
    DeletionConfig: S.optional(DeletionConfig),
  }),
).annotate({ identifier: "EdgeConfig" }) as any as S.Schema<EdgeConfig>;
export type JobStatusDetails = string;
export type RecorderStatus =
  | "SUCCESS"
  | "USER_ERROR"
  | "SYSTEM_ERROR"
  | (string & {});
export const RecorderStatus = S.String;

export interface LastRecorderStatus {
  JobStatusDetails?: string;
  LastCollectedTime?: Date;
  LastUpdatedTime?: Date;
  RecorderStatus?: RecorderStatus;
}
export const LastRecorderStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobStatusDetails: S.optional(S.String),
    LastCollectedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    RecorderStatus: S.optional(RecorderStatus),
  }),
).annotate({
  identifier: "LastRecorderStatus",
}) as any as S.Schema<LastRecorderStatus>;
export type UploaderStatus =
  | "SUCCESS"
  | "USER_ERROR"
  | "SYSTEM_ERROR"
  | (string & {});
export const UploaderStatus = S.String;

export interface LastUploaderStatus {
  JobStatusDetails?: string;
  LastCollectedTime?: Date;
  LastUpdatedTime?: Date;
  UploaderStatus?: UploaderStatus;
}
export const LastUploaderStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobStatusDetails: S.optional(S.String),
    LastCollectedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    UploaderStatus: S.optional(UploaderStatus),
  }),
).annotate({
  identifier: "LastUploaderStatus",
}) as any as S.Schema<LastUploaderStatus>;
export interface EdgeAgentStatus {
  LastRecorderStatus?: LastRecorderStatus;
  LastUploaderStatus?: LastUploaderStatus;
}
export const EdgeAgentStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastRecorderStatus: S.optional(LastRecorderStatus),
    LastUploaderStatus: S.optional(LastUploaderStatus),
  }),
).annotate({
  identifier: "EdgeAgentStatus",
}) as any as S.Schema<EdgeAgentStatus>;
export interface DescribeEdgeConfigurationOutput {
  StreamName?: string;
  StreamARN?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  SyncStatus?: SyncStatus;
  FailedStatusDetails?: string;
  EdgeConfig?: EdgeConfig;
  EdgeAgentStatus?: EdgeAgentStatus;
}
export const DescribeEdgeConfigurationOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamName: S.optional(S.String),
    StreamARN: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SyncStatus: S.optional(SyncStatus),
    FailedStatusDetails: S.optional(S.String),
    EdgeConfig: S.optional(EdgeConfig),
    EdgeAgentStatus: S.optional(EdgeAgentStatus),
  }).pipe(ns),
).annotate({
  identifier: "DescribeEdgeConfigurationOutput",
}) as any as S.Schema<DescribeEdgeConfigurationOutput>;
export interface DescribeImageGenerationConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
}
export const DescribeImageGenerationConfigurationInput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StreamName: S.optional(S.String),
      StreamARN: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({
          method: "POST",
          uri: "/describeImageGenerationConfiguration",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DescribeImageGenerationConfigurationInput",
  }) as any as S.Schema<DescribeImageGenerationConfigurationInput>;
export type ConfigurationStatus = "ENABLED" | "DISABLED" | (string & {});
export const ConfigurationStatus = S.String;

export type ImageSelectorType =
  | "SERVER_TIMESTAMP"
  | "PRODUCER_TIMESTAMP"
  | (string & {});
export const ImageSelectorType = S.String;

export type DestinationUri = string;
export type DestinationRegion = string;
export interface ImageGenerationDestinationConfig {
  Uri: string;
  DestinationRegion: string;
}
export const ImageGenerationDestinationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Uri: S.String, DestinationRegion: S.String }),
).annotate({
  identifier: "ImageGenerationDestinationConfig",
}) as any as S.Schema<ImageGenerationDestinationConfig>;
export type SamplingInterval = number;
export type Format = "JPEG" | "PNG" | (string & {});
export const Format = S.String;

export type FormatConfigKey = "JPEGQuality" | (string & {});
export const FormatConfigKey = S.String;

export type FormatConfigValue = string;
export type FormatConfig = { [key in FormatConfigKey]?: string };
export const FormatConfig = /*@__PURE__*/ S.Record(
  FormatConfigKey,
  S.String.pipe(S.optional),
);
export type WidthPixels = number;
export type HeightPixels = number;
export interface ImageGenerationConfiguration {
  Status: ConfigurationStatus;
  ImageSelectorType: ImageSelectorType;
  DestinationConfig: ImageGenerationDestinationConfig;
  SamplingInterval: number;
  Format: Format;
  FormatConfig?: { [key: string]: string | undefined };
  WidthPixels?: number;
  HeightPixels?: number;
}
export const ImageGenerationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: ConfigurationStatus,
    ImageSelectorType: ImageSelectorType,
    DestinationConfig: ImageGenerationDestinationConfig,
    SamplingInterval: S.Number,
    Format: Format,
    FormatConfig: S.optional(FormatConfig),
    WidthPixels: S.optional(S.Number),
    HeightPixels: S.optional(S.Number),
  }),
).annotate({
  identifier: "ImageGenerationConfiguration",
}) as any as S.Schema<ImageGenerationConfiguration>;
export interface DescribeImageGenerationConfigurationOutput {
  ImageGenerationConfiguration?: ImageGenerationConfiguration;
}
export const DescribeImageGenerationConfigurationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      ImageGenerationConfiguration: S.optional(ImageGenerationConfiguration),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeImageGenerationConfigurationOutput",
  }) as any as S.Schema<DescribeImageGenerationConfigurationOutput>;
export type MappedResourceConfigurationListLimit = number;
export type NextToken = string;
export interface DescribeMappedResourceConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeMappedResourceConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StreamName: S.optional(S.String),
      StreamARN: S.optional(S.String),
      MaxResults: S.optional(S.Number),
      NextToken: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/describeMappedResourceConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeMappedResourceConfigurationInput",
}) as any as S.Schema<DescribeMappedResourceConfigurationInput>;
export type Type = string;
export interface MappedResourceConfigurationListItem {
  Type?: string;
  ARN?: string;
}
export const MappedResourceConfigurationListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Type: S.optional(S.String), ARN: S.optional(S.String) }),
).annotate({
  identifier: "MappedResourceConfigurationListItem",
}) as any as S.Schema<MappedResourceConfigurationListItem>;
export type MappedResourceConfigurationList =
  MappedResourceConfigurationListItem[];
export const MappedResourceConfigurationList = /*@__PURE__*/ S.Array(
  MappedResourceConfigurationListItem,
);
export interface DescribeMappedResourceConfigurationOutput {
  MappedResourceConfigurationList?: MappedResourceConfigurationListItem[];
  NextToken?: string;
}
export const DescribeMappedResourceConfigurationOutput =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MappedResourceConfigurationList: S.optional(
        MappedResourceConfigurationList,
      ),
      NextToken: S.optional(S.String),
    }).pipe(ns),
  ).annotate({
    identifier: "DescribeMappedResourceConfigurationOutput",
  }) as any as S.Schema<DescribeMappedResourceConfigurationOutput>;
export interface DescribeMediaStorageConfigurationInput {
  ChannelName?: string;
  ChannelARN?: string;
}
export const DescribeMediaStorageConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChannelName: S.optional(S.String),
      ChannelARN: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/describeMediaStorageConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeMediaStorageConfigurationInput",
}) as any as S.Schema<DescribeMediaStorageConfigurationInput>;
export type MediaStorageConfigurationStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const MediaStorageConfigurationStatus = S.String;

export interface MediaStorageConfiguration {
  StreamARN?: string;
  Status: MediaStorageConfigurationStatus;
}
export const MediaStorageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamARN: S.optional(S.String),
    Status: MediaStorageConfigurationStatus,
  }),
).annotate({
  identifier: "MediaStorageConfiguration",
}) as any as S.Schema<MediaStorageConfiguration>;
export interface DescribeMediaStorageConfigurationOutput {
  MediaStorageConfiguration?: MediaStorageConfiguration;
}
export const DescribeMediaStorageConfigurationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MediaStorageConfiguration: S.optional(MediaStorageConfiguration),
    }).pipe(ns),
).annotate({
  identifier: "DescribeMediaStorageConfigurationOutput",
}) as any as S.Schema<DescribeMediaStorageConfigurationOutput>;
export interface DescribeNotificationConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
}
export const DescribeNotificationConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StreamName: S.optional(S.String),
      StreamARN: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/describeNotificationConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeNotificationConfigurationInput",
}) as any as S.Schema<DescribeNotificationConfigurationInput>;
export interface NotificationDestinationConfig {
  Uri: string;
}
export const NotificationDestinationConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Uri: S.String }),
).annotate({
  identifier: "NotificationDestinationConfig",
}) as any as S.Schema<NotificationDestinationConfig>;
export interface NotificationConfiguration {
  Status: ConfigurationStatus;
  DestinationConfig: NotificationDestinationConfig;
}
export const NotificationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Status: ConfigurationStatus,
    DestinationConfig: NotificationDestinationConfig,
  }),
).annotate({
  identifier: "NotificationConfiguration",
}) as any as S.Schema<NotificationConfiguration>;
export interface DescribeNotificationConfigurationOutput {
  NotificationConfiguration?: NotificationConfiguration;
}
export const DescribeNotificationConfigurationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      NotificationConfiguration: S.optional(NotificationConfiguration),
    }).pipe(ns),
).annotate({
  identifier: "DescribeNotificationConfigurationOutput",
}) as any as S.Schema<DescribeNotificationConfigurationOutput>;
export interface DescribeSignalingChannelInput {
  ChannelName?: string;
  ChannelARN?: string;
}
export const DescribeSignalingChannelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelName: S.optional(S.String),
    ChannelARN: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/describeSignalingChannel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSignalingChannelInput",
}) as any as S.Schema<DescribeSignalingChannelInput>;
export type Status =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | (string & {});
export const Status = S.String;

export interface ChannelInfo {
  ChannelName?: string;
  ChannelARN?: string;
  ChannelType?: ChannelType;
  ChannelStatus?: Status;
  CreationTime?: Date;
  SingleMasterConfiguration?: SingleMasterConfiguration;
  Version?: string;
}
export const ChannelInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelName: S.optional(S.String),
    ChannelARN: S.optional(S.String),
    ChannelType: S.optional(ChannelType),
    ChannelStatus: S.optional(Status),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SingleMasterConfiguration: S.optional(SingleMasterConfiguration),
    Version: S.optional(S.String),
  }),
).annotate({ identifier: "ChannelInfo" }) as any as S.Schema<ChannelInfo>;
export interface DescribeSignalingChannelOutput {
  ChannelInfo?: ChannelInfo;
}
export const DescribeSignalingChannelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelInfo: S.optional(ChannelInfo) }).pipe(ns),
).annotate({
  identifier: "DescribeSignalingChannelOutput",
}) as any as S.Schema<DescribeSignalingChannelOutput>;
export interface DescribeStreamInput {
  StreamName?: string;
  StreamARN?: string;
}
export const DescribeStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamName: S.optional(S.String),
    StreamARN: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/describeStream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeStreamInput",
}) as any as S.Schema<DescribeStreamInput>;
export interface StreamInfo {
  DeviceName?: string;
  StreamName?: string;
  StreamARN?: string;
  MediaType?: string;
  KmsKeyId?: string;
  Version?: string;
  Status?: Status;
  CreationTime?: Date;
  DataRetentionInHours?: number;
}
export const StreamInfo = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeviceName: S.optional(S.String),
    StreamName: S.optional(S.String),
    StreamARN: S.optional(S.String),
    MediaType: S.optional(S.String),
    KmsKeyId: S.optional(S.String),
    Version: S.optional(S.String),
    Status: S.optional(Status),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DataRetentionInHours: S.optional(S.Number),
  }),
).annotate({ identifier: "StreamInfo" }) as any as S.Schema<StreamInfo>;
export interface DescribeStreamOutput {
  StreamInfo?: StreamInfo;
}
export const DescribeStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StreamInfo: S.optional(StreamInfo) }).pipe(ns),
).annotate({
  identifier: "DescribeStreamOutput",
}) as any as S.Schema<DescribeStreamOutput>;
export interface DescribeStreamStorageConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
}
export const DescribeStreamStorageConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StreamName: S.optional(S.String),
      StreamARN: S.optional(S.String),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/describeStreamStorageConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeStreamStorageConfigurationInput",
}) as any as S.Schema<DescribeStreamStorageConfigurationInput>;
export interface DescribeStreamStorageConfigurationOutput {
  StreamName?: string;
  StreamARN?: string;
  StreamStorageConfiguration?: StreamStorageConfiguration;
}
export const DescribeStreamStorageConfigurationOutput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StreamName: S.optional(S.String),
      StreamARN: S.optional(S.String),
      StreamStorageConfiguration: S.optional(StreamStorageConfiguration),
    }).pipe(ns),
).annotate({
  identifier: "DescribeStreamStorageConfigurationOutput",
}) as any as S.Schema<DescribeStreamStorageConfigurationOutput>;
export type APIName =
  | "PUT_MEDIA"
  | "GET_MEDIA"
  | "LIST_FRAGMENTS"
  | "GET_MEDIA_FOR_FRAGMENT_LIST"
  | "GET_HLS_STREAMING_SESSION_URL"
  | "GET_DASH_STREAMING_SESSION_URL"
  | "GET_CLIP"
  | "GET_IMAGES"
  | (string & {});
export const APIName = S.String;

export interface GetDataEndpointInput {
  StreamName?: string;
  StreamARN?: string;
  APIName: APIName;
}
export const GetDataEndpointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamName: S.optional(S.String),
    StreamARN: S.optional(S.String),
    APIName: APIName,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/getDataEndpoint" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetDataEndpointInput",
}) as any as S.Schema<GetDataEndpointInput>;
export type DataEndpoint = string;
export interface GetDataEndpointOutput {
  DataEndpoint?: string;
}
export const GetDataEndpointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DataEndpoint: S.optional(S.String) }).pipe(ns),
).annotate({
  identifier: "GetDataEndpointOutput",
}) as any as S.Schema<GetDataEndpointOutput>;
export type ChannelProtocol = "WSS" | "HTTPS" | "WEBRTC" | (string & {});
export const ChannelProtocol = S.String;

export type ListOfProtocols = ChannelProtocol[];
export const ListOfProtocols = /*@__PURE__*/ S.Array(ChannelProtocol);
export type ChannelRole = "MASTER" | "VIEWER" | (string & {});
export const ChannelRole = S.String;

export interface SingleMasterChannelEndpointConfiguration {
  Protocols?: ChannelProtocol[];
  Role?: ChannelRole;
}
export const SingleMasterChannelEndpointConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Protocols: S.optional(ListOfProtocols),
      Role: S.optional(ChannelRole),
    }),
).annotate({
  identifier: "SingleMasterChannelEndpointConfiguration",
}) as any as S.Schema<SingleMasterChannelEndpointConfiguration>;
export interface GetSignalingChannelEndpointInput {
  ChannelARN: string;
  SingleMasterChannelEndpointConfiguration?: SingleMasterChannelEndpointConfiguration;
}
export const GetSignalingChannelEndpointInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelARN: S.String,
    SingleMasterChannelEndpointConfiguration: S.optional(
      SingleMasterChannelEndpointConfiguration,
    ),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/getSignalingChannelEndpoint" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSignalingChannelEndpointInput",
}) as any as S.Schema<GetSignalingChannelEndpointInput>;
export type ResourceEndpoint = string;
export interface ResourceEndpointListItem {
  Protocol?: ChannelProtocol;
  ResourceEndpoint?: string;
}
export const ResourceEndpointListItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Protocol: S.optional(ChannelProtocol),
    ResourceEndpoint: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceEndpointListItem",
}) as any as S.Schema<ResourceEndpointListItem>;
export type ResourceEndpointList = ResourceEndpointListItem[];
export const ResourceEndpointList = /*@__PURE__*/ S.Array(
  ResourceEndpointListItem,
);
export interface GetSignalingChannelEndpointOutput {
  ResourceEndpointList?: ResourceEndpointListItem[];
}
export const GetSignalingChannelEndpointOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceEndpointList: S.optional(ResourceEndpointList) }).pipe(ns),
).annotate({
  identifier: "GetSignalingChannelEndpointOutput",
}) as any as S.Schema<GetSignalingChannelEndpointOutput>;
export type ListEdgeAgentConfigurationsInputLimit = number;
export interface ListEdgeAgentConfigurationsInput {
  HubDeviceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListEdgeAgentConfigurationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HubDeviceArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/listEdgeAgentConfigurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEdgeAgentConfigurationsInput",
}) as any as S.Schema<ListEdgeAgentConfigurationsInput>;
export interface ListEdgeAgentConfigurationsEdgeConfig {
  StreamName?: string;
  StreamARN?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  SyncStatus?: SyncStatus;
  FailedStatusDetails?: string;
  EdgeConfig?: EdgeConfig;
}
export const ListEdgeAgentConfigurationsEdgeConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StreamName: S.optional(S.String),
      StreamARN: S.optional(S.String),
      CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
      LastUpdatedTime: S.optional(
        S.Date.pipe(T.TimestampFormat("epoch-seconds")),
      ),
      SyncStatus: S.optional(SyncStatus),
      FailedStatusDetails: S.optional(S.String),
      EdgeConfig: S.optional(EdgeConfig),
    }),
).annotate({
  identifier: "ListEdgeAgentConfigurationsEdgeConfig",
}) as any as S.Schema<ListEdgeAgentConfigurationsEdgeConfig>;
export type ListEdgeAgentConfigurationsEdgeConfigList =
  ListEdgeAgentConfigurationsEdgeConfig[];
export const ListEdgeAgentConfigurationsEdgeConfigList = /*@__PURE__*/ S.Array(
  ListEdgeAgentConfigurationsEdgeConfig,
);
export interface ListEdgeAgentConfigurationsOutput {
  EdgeConfigs?: ListEdgeAgentConfigurationsEdgeConfig[];
  NextToken?: string;
}
export const ListEdgeAgentConfigurationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EdgeConfigs: S.optional(ListEdgeAgentConfigurationsEdgeConfigList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListEdgeAgentConfigurationsOutput",
}) as any as S.Schema<ListEdgeAgentConfigurationsOutput>;
export type ListStreamsInputLimit = number;
export type ComparisonOperator = "BEGINS_WITH" | (string & {});
export const ComparisonOperator = S.String;

export interface ChannelNameCondition {
  ComparisonOperator?: ComparisonOperator;
  ComparisonValue?: string;
}
export const ChannelNameCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComparisonOperator: S.optional(ComparisonOperator),
    ComparisonValue: S.optional(S.String),
  }),
).annotate({
  identifier: "ChannelNameCondition",
}) as any as S.Schema<ChannelNameCondition>;
export interface ListSignalingChannelsInput {
  MaxResults?: number;
  NextToken?: string;
  ChannelNameCondition?: ChannelNameCondition;
}
export const ListSignalingChannelsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    ChannelNameCondition: S.optional(ChannelNameCondition),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/listSignalingChannels" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSignalingChannelsInput",
}) as any as S.Schema<ListSignalingChannelsInput>;
export type ChannelInfoList = ChannelInfo[];
export const ChannelInfoList = /*@__PURE__*/ S.Array(ChannelInfo);
export interface ListSignalingChannelsOutput {
  ChannelInfoList?: ChannelInfo[];
  NextToken?: string;
}
export const ListSignalingChannelsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelInfoList: S.optional(ChannelInfoList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListSignalingChannelsOutput",
}) as any as S.Schema<ListSignalingChannelsOutput>;
export interface StreamNameCondition {
  ComparisonOperator?: ComparisonOperator;
  ComparisonValue?: string;
}
export const StreamNameCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ComparisonOperator: S.optional(ComparisonOperator),
    ComparisonValue: S.optional(S.String),
  }),
).annotate({
  identifier: "StreamNameCondition",
}) as any as S.Schema<StreamNameCondition>;
export interface ListStreamsInput {
  MaxResults?: number;
  NextToken?: string;
  StreamNameCondition?: StreamNameCondition;
}
export const ListStreamsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    StreamNameCondition: S.optional(StreamNameCondition),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/listStreams" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListStreamsInput",
}) as any as S.Schema<ListStreamsInput>;
export type StreamInfoList = StreamInfo[];
export const StreamInfoList = /*@__PURE__*/ S.Array(StreamInfo);
export interface ListStreamsOutput {
  StreamInfoList?: StreamInfo[];
  NextToken?: string;
}
export const ListStreamsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamInfoList: S.optional(StreamInfoList),
    NextToken: S.optional(S.String),
  }).pipe(ns),
).annotate({
  identifier: "ListStreamsOutput",
}) as any as S.Schema<ListStreamsOutput>;
export interface ListTagsForResourceInput {
  NextToken?: string;
  ResourceARN: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NextToken: S.optional(S.String), ResourceARN: S.String }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/ListTagsForResource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  NextToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Tags: S.optional(ResourceTags),
  }).pipe(ns),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface ListTagsForStreamInput {
  NextToken?: string;
  StreamARN?: string;
  StreamName?: string;
}
export const ListTagsForStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    StreamARN: S.optional(S.String),
    StreamName: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/listTagsForStream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForStreamInput",
}) as any as S.Schema<ListTagsForStreamInput>;
export interface ListTagsForStreamOutput {
  NextToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export const ListTagsForStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Tags: S.optional(ResourceTags),
  }).pipe(ns),
).annotate({
  identifier: "ListTagsForStreamOutput",
}) as any as S.Schema<ListTagsForStreamOutput>;
export interface StartEdgeConfigurationUpdateInput {
  StreamName?: string;
  StreamARN?: string;
  EdgeConfig: EdgeConfig;
}
export const StartEdgeConfigurationUpdateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamName: S.optional(S.String),
    StreamARN: S.optional(S.String),
    EdgeConfig: EdgeConfig,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/startEdgeConfigurationUpdate" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartEdgeConfigurationUpdateInput",
}) as any as S.Schema<StartEdgeConfigurationUpdateInput>;
export interface StartEdgeConfigurationUpdateOutput {
  StreamName?: string;
  StreamARN?: string;
  CreationTime?: Date;
  LastUpdatedTime?: Date;
  SyncStatus?: SyncStatus;
  FailedStatusDetails?: string;
  EdgeConfig?: EdgeConfig;
}
export const StartEdgeConfigurationUpdateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamName: S.optional(S.String),
    StreamARN: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LastUpdatedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SyncStatus: S.optional(SyncStatus),
    FailedStatusDetails: S.optional(S.String),
    EdgeConfig: S.optional(EdgeConfig),
  }).pipe(ns),
).annotate({
  identifier: "StartEdgeConfigurationUpdateOutput",
}) as any as S.Schema<StartEdgeConfigurationUpdateOutput>;
export type TagList = Tag[];
export const TagList = /*@__PURE__*/ S.Array(Tag);
export interface TagResourceInput {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/TagResource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export interface TagStreamInput {
  StreamARN?: string;
  StreamName?: string;
  Tags: { [key: string]: string | undefined };
}
export const TagStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamARN: S.optional(S.String),
    StreamName: S.optional(S.String),
    Tags: ResourceTags,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/tagStream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "TagStreamInput" }) as any as S.Schema<TagStreamInput>;
export interface TagStreamOutput {}
export const TagStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "TagStreamOutput",
}) as any as S.Schema<TagStreamOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  ResourceARN: string;
  TagKeyList: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeyList: TagKeyList }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/UntagResource" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export interface UntagStreamInput {
  StreamARN?: string;
  StreamName?: string;
  TagKeyList: string[];
}
export const UntagStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamARN: S.optional(S.String),
    StreamName: S.optional(S.String),
    TagKeyList: TagKeyList,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/untagStream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagStreamInput",
}) as any as S.Schema<UntagStreamInput>;
export interface UntagStreamOutput {}
export const UntagStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UntagStreamOutput",
}) as any as S.Schema<UntagStreamOutput>;
export type UpdateDataRetentionOperation =
  | "INCREASE_DATA_RETENTION"
  | "DECREASE_DATA_RETENTION"
  | (string & {});
export const UpdateDataRetentionOperation = S.String;

export type DataRetentionChangeInHours = number;
export interface UpdateDataRetentionInput {
  StreamName?: string;
  StreamARN?: string;
  CurrentVersion: string;
  Operation: UpdateDataRetentionOperation;
  DataRetentionChangeInHours: number;
}
export const UpdateDataRetentionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamName: S.optional(S.String),
    StreamARN: S.optional(S.String),
    CurrentVersion: S.String,
    Operation: UpdateDataRetentionOperation,
    DataRetentionChangeInHours: S.Number,
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/updateDataRetention" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateDataRetentionInput",
}) as any as S.Schema<UpdateDataRetentionInput>;
export interface UpdateDataRetentionOutput {}
export const UpdateDataRetentionOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateDataRetentionOutput",
}) as any as S.Schema<UpdateDataRetentionOutput>;
export interface UpdateImageGenerationConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
  ImageGenerationConfiguration?: ImageGenerationConfiguration;
}
export const UpdateImageGenerationConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StreamName: S.optional(S.String),
      StreamARN: S.optional(S.String),
      ImageGenerationConfiguration: S.optional(ImageGenerationConfiguration),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/updateImageGenerationConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateImageGenerationConfigurationInput",
}) as any as S.Schema<UpdateImageGenerationConfigurationInput>;
export interface UpdateImageGenerationConfigurationOutput {}
export const UpdateImageGenerationConfigurationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateImageGenerationConfigurationOutput",
}) as any as S.Schema<UpdateImageGenerationConfigurationOutput>;
export interface UpdateMediaStorageConfigurationInput {
  ChannelARN: string;
  MediaStorageConfiguration: MediaStorageConfiguration;
}
export const UpdateMediaStorageConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChannelARN: S.String,
      MediaStorageConfiguration: MediaStorageConfiguration,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/updateMediaStorageConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateMediaStorageConfigurationInput",
}) as any as S.Schema<UpdateMediaStorageConfigurationInput>;
export interface UpdateMediaStorageConfigurationOutput {}
export const UpdateMediaStorageConfigurationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateMediaStorageConfigurationOutput",
}) as any as S.Schema<UpdateMediaStorageConfigurationOutput>;
export interface UpdateNotificationConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
  NotificationConfiguration?: NotificationConfiguration;
}
export const UpdateNotificationConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StreamName: S.optional(S.String),
      StreamARN: S.optional(S.String),
      NotificationConfiguration: S.optional(NotificationConfiguration),
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/updateNotificationConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateNotificationConfigurationInput",
}) as any as S.Schema<UpdateNotificationConfigurationInput>;
export interface UpdateNotificationConfigurationOutput {}
export const UpdateNotificationConfigurationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateNotificationConfigurationOutput",
}) as any as S.Schema<UpdateNotificationConfigurationOutput>;
export interface UpdateSignalingChannelInput {
  ChannelARN: string;
  CurrentVersion: string;
  SingleMasterConfiguration?: SingleMasterConfiguration;
}
export const UpdateSignalingChannelInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelARN: S.String,
    CurrentVersion: S.String,
    SingleMasterConfiguration: S.optional(SingleMasterConfiguration),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/updateSignalingChannel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSignalingChannelInput",
}) as any as S.Schema<UpdateSignalingChannelInput>;
export interface UpdateSignalingChannelOutput {}
export const UpdateSignalingChannelOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateSignalingChannelOutput",
}) as any as S.Schema<UpdateSignalingChannelOutput>;
export interface UpdateStreamInput {
  StreamName?: string;
  StreamARN?: string;
  CurrentVersion: string;
  DeviceName?: string;
  MediaType?: string;
}
export const UpdateStreamInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamName: S.optional(S.String),
    StreamARN: S.optional(S.String),
    CurrentVersion: S.String,
    DeviceName: S.optional(S.String),
    MediaType: S.optional(S.String),
  }).pipe(
    T.all(
      ns,
      T.Http({ method: "POST", uri: "/updateStream" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateStreamInput",
}) as any as S.Schema<UpdateStreamInput>;
export interface UpdateStreamOutput {}
export const UpdateStreamOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateStreamOutput",
}) as any as S.Schema<UpdateStreamOutput>;
export interface UpdateStreamStorageConfigurationInput {
  StreamName?: string;
  StreamARN?: string;
  CurrentVersion: string;
  StreamStorageConfiguration: StreamStorageConfiguration;
}
export const UpdateStreamStorageConfigurationInput = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      StreamName: S.optional(S.String),
      StreamARN: S.optional(S.String),
      CurrentVersion: S.String,
      StreamStorageConfiguration: StreamStorageConfiguration,
    }).pipe(
      T.all(
        ns,
        T.Http({ method: "POST", uri: "/updateStreamStorageConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateStreamStorageConfigurationInput",
}) as any as S.Schema<UpdateStreamStorageConfigurationInput>;
export interface UpdateStreamStorageConfigurationOutput {}
export const UpdateStreamStorageConfigurationOutput = /*@__PURE__*/ S.suspend(
  () => S.Struct({}).pipe(ns),
).annotate({
  identifier: "UpdateStreamStorageConfigurationOutput",
}) as any as S.Schema<UpdateStreamStorageConfigurationOutput>;
export type ErrorMessage = string;
export type CreateSignalingChannelError =
  | AccessDeniedException
  | AccountChannelLimitExceededException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceInUseException
  | TagsPerResourceExceededLimitException
  | CommonErrors;
/**
 * Creates a signaling channel.
 *
 * `CreateSignalingChannel` is an asynchronous operation.
 */
export const createSignalingChannel: API.OperationMethod<
  CreateSignalingChannelInput,
  CreateSignalingChannelOutput,
  CreateSignalingChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSignalingChannelInput,
  output: CreateSignalingChannelOutput,
  errors: [
    AccessDeniedException,
    AccountChannelLimitExceededException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceInUseException,
    TagsPerResourceExceededLimitException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSignalingChannel",
}));

export type CreateStreamError =
  | AccountStreamLimitExceededException
  | ClientLimitExceededException
  | DeviceStreamLimitExceededException
  | InvalidArgumentException
  | InvalidDeviceException
  | ResourceInUseException
  | TagsPerResourceExceededLimitException
  | CommonErrors;
/**
 * Creates a new Kinesis video stream.
 *
 * When you create a new stream, Kinesis Video Streams assigns it a version number.
 * When you change the stream's metadata, Kinesis Video Streams updates the version.
 *
 * `CreateStream` is an asynchronous operation.
 *
 * For information about how the service works, see How it Works.
 *
 * You must have permissions for the `KinesisVideo:CreateStream`
 * action.
 */
export const createStream: API.OperationMethod<
  CreateStreamInput,
  CreateStreamOutput,
  CreateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateStreamInput,
  output: CreateStreamOutput,
  errors: [
    AccountStreamLimitExceededException,
    ClientLimitExceededException,
    DeviceStreamLimitExceededException,
    InvalidArgumentException,
    InvalidDeviceException,
    ResourceInUseException,
    TagsPerResourceExceededLimitException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStream",
}));

export type DeleteEdgeConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | StreamEdgeConfigurationNotFoundException
  | CommonErrors;
/**
 * An asynchronous API that deletes a stream’s existing edge configuration, as well as the corresponding media from the Edge Agent.
 *
 * When you invoke this API, the sync status is set to `DELETING`. A deletion process starts, in which active edge jobs are stopped and all media is deleted from the edge device. The time to delete varies, depending on the total amount of stored media. If the deletion process fails, the sync status changes to `DELETE_FAILED`. You will need to re-try the deletion.
 *
 * When the deletion process has completed successfully, the edge configuration is no longer accessible.
 */
export const deleteEdgeConfiguration: API.OperationMethod<
  DeleteEdgeConfigurationInput,
  DeleteEdgeConfigurationOutput,
  DeleteEdgeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEdgeConfigurationInput,
  output: DeleteEdgeConfigurationOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
    StreamEdgeConfigurationNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEdgeConfiguration",
}));

export type DeleteSignalingChannelError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | VersionMismatchException
  | CommonErrors;
/**
 * Deletes a specified signaling channel. `DeleteSignalingChannel` is an
 * asynchronous operation. If you don't specify the channel's current version, the most
 * recent version is deleted.
 */
export const deleteSignalingChannel: API.OperationMethod<
  DeleteSignalingChannelInput,
  DeleteSignalingChannelOutput,
  DeleteSignalingChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSignalingChannelInput,
  output: DeleteSignalingChannelOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSignalingChannel",
}));

export type DeleteStreamError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceInUseException
  | ResourceNotFoundException
  | VersionMismatchException
  | CommonErrors;
/**
 * Deletes a Kinesis video stream and the data contained in the stream.
 *
 * This method marks the stream for deletion, and makes the data in the stream
 * inaccessible immediately.
 *
 * To ensure that you have the latest version of the stream before deleting it, you
 * can specify the stream version. Kinesis Video Streams assigns a version to each stream.
 * When you update a stream, Kinesis Video Streams assigns a new version number. To get the
 * latest stream version, use the `DescribeStream` API.
 *
 * This operation requires permission for the `KinesisVideo:DeleteStream`
 * action.
 */
export const deleteStream: API.OperationMethod<
  DeleteStreamInput,
  DeleteStreamOutput,
  DeleteStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteStreamInput,
  output: DeleteStreamOutput,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceInUseException,
    ResourceNotFoundException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStream",
}));

export type DescribeEdgeConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | StreamEdgeConfigurationNotFoundException
  | CommonErrors;
/**
 * Describes a stream’s edge configuration that was set using the
 * `StartEdgeConfigurationUpdate` API and the latest status of the edge
 * agent's recorder and uploader jobs. Use this API to get the status of the configuration
 * to determine if the configuration is in sync with the Edge Agent. Use this API to
 * evaluate the health of the Edge Agent.
 */
export const describeEdgeConfiguration: API.OperationMethod<
  DescribeEdgeConfigurationInput,
  DescribeEdgeConfigurationOutput,
  DescribeEdgeConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeEdgeConfigurationInput,
  output: DescribeEdgeConfigurationOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
    StreamEdgeConfigurationNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEdgeConfiguration",
}));

export type DescribeImageGenerationConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the `ImageGenerationConfiguration` for a given Kinesis video stream.
 */
export const describeImageGenerationConfiguration: API.OperationMethod<
  DescribeImageGenerationConfigurationInput,
  DescribeImageGenerationConfigurationOutput,
  DescribeImageGenerationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeImageGenerationConfigurationInput,
  output: DescribeImageGenerationConfigurationOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeImageGenerationConfiguration",
}));

export type DescribeMappedResourceConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the most current information about the stream. The `streamName`
 * or `streamARN` should be provided in the input.
 */
export const describeMappedResourceConfiguration: API.PaginatedOperationMethod<
  DescribeMappedResourceConfigurationInput,
  DescribeMappedResourceConfigurationOutput,
  DescribeMappedResourceConfigurationError,
  Credentials | HttpClient.HttpClient,
  MappedResourceConfigurationListItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeMappedResourceConfigurationInput,
  output: DescribeMappedResourceConfigurationOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMappedResourceConfiguration",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MappedResourceConfigurationList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeMediaStorageConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the most current information about the channel. Specify the `ChannelName`
 * or `ChannelARN` in the input.
 */
export const describeMediaStorageConfiguration: API.OperationMethod<
  DescribeMediaStorageConfigurationInput,
  DescribeMediaStorageConfigurationOutput,
  DescribeMediaStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMediaStorageConfigurationInput,
  output: DescribeMediaStorageConfigurationOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMediaStorageConfiguration",
}));

export type DescribeNotificationConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets the `NotificationConfiguration` for a given Kinesis video stream.
 */
export const describeNotificationConfiguration: API.OperationMethod<
  DescribeNotificationConfigurationInput,
  DescribeNotificationConfigurationOutput,
  DescribeNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeNotificationConfigurationInput,
  output: DescribeNotificationConfigurationOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotificationConfiguration",
}));

export type DescribeSignalingChannelError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the most current information about the signaling channel. You must specify
 * either the name or the Amazon Resource Name (ARN) of the channel that you want to
 * describe.
 */
export const describeSignalingChannel: API.OperationMethod<
  DescribeSignalingChannelInput,
  DescribeSignalingChannelOutput,
  DescribeSignalingChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSignalingChannelInput,
  output: DescribeSignalingChannelOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSignalingChannel",
}));

export type DescribeStreamError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the most current information about the specified stream. You must specify
 * either the `StreamName` or the `StreamARN`.
 */
export const describeStream: API.OperationMethod<
  DescribeStreamInput,
  DescribeStreamOutput,
  DescribeStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStreamInput,
  output: DescribeStreamOutput,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStream",
}));

export type DescribeStreamStorageConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the current storage configuration for the specified Kinesis video stream.
 *
 * In the request, you must specify either the `StreamName` or the `StreamARN`.
 *
 * You must have permissions for the `KinesisVideo:DescribeStreamStorageConfiguration` action.
 */
export const describeStreamStorageConfiguration: API.OperationMethod<
  DescribeStreamStorageConfigurationInput,
  DescribeStreamStorageConfigurationOutput,
  DescribeStreamStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeStreamStorageConfigurationInput,
  output: DescribeStreamStorageConfigurationOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStreamStorageConfiguration",
}));

export type GetDataEndpointError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets an endpoint for a specified stream for either reading or writing. Use this
 * endpoint in your application to read from the specified stream (using the
 * `GetMedia` or `GetMediaForFragmentList` operations) or write
 * to it (using the `PutMedia` operation).
 *
 * The returned endpoint does not have the API name appended. The client needs to
 * add the API name to the returned endpoint.
 *
 * In the request, specify the stream either by `StreamName` or
 * `StreamARN`.
 */
export const getDataEndpoint: API.OperationMethod<
  GetDataEndpointInput,
  GetDataEndpointOutput,
  GetDataEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetDataEndpointInput,
  output: GetDataEndpointOutput,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataEndpoint",
}));

export type GetSignalingChannelEndpointError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provides an endpoint for the specified signaling channel to send and receive messages.
 * This API uses the `SingleMasterChannelEndpointConfiguration` input parameter,
 * which consists of the `Protocols` and `Role` properties.
 *
 * `Protocols` is used to determine the communication mechanism. For example,
 * if you specify `WSS` as the protocol, this API produces a secure websocket
 * endpoint. If you specify `HTTPS` as the protocol, this API generates an HTTPS
 * endpoint. If you specify `WEBRTC` as the protocol, but the signaling channel isn't
 * configured for ingestion, you will receive the error
 * `InvalidArgumentException`.
 *
 * `Role` determines the messaging permissions. A `MASTER` role
 * results in this API generating an endpoint that a client can use to communicate with any
 * of the viewers on the channel. A `VIEWER` role results in this API generating
 * an endpoint that a client can use to communicate only with a `MASTER`.
 */
export const getSignalingChannelEndpoint: API.OperationMethod<
  GetSignalingChannelEndpointInput,
  GetSignalingChannelEndpointOutput,
  GetSignalingChannelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSignalingChannelEndpointInput,
  output: GetSignalingChannelEndpointOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSignalingChannelEndpoint",
}));

export type ListEdgeAgentConfigurationsError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | CommonErrors;
/**
 * Returns an array of edge configurations associated with the specified Edge Agent.
 *
 * In the request, you must specify the Edge Agent `HubDeviceArn`.
 */
export const listEdgeAgentConfigurations: API.PaginatedOperationMethod<
  ListEdgeAgentConfigurationsInput,
  ListEdgeAgentConfigurationsOutput,
  ListEdgeAgentConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ListEdgeAgentConfigurationsEdgeConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEdgeAgentConfigurationsInput,
  output: ListEdgeAgentConfigurationsOutput,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEdgeAgentConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EdgeConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSignalingChannelsError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Returns an array of `ChannelInfo` objects. Each object describes a
 * signaling channel. To retrieve only those channels that satisfy a specific condition,
 * you can specify a `ChannelNameCondition`.
 */
export const listSignalingChannels: API.PaginatedOperationMethod<
  ListSignalingChannelsInput,
  ListSignalingChannelsOutput,
  ListSignalingChannelsError,
  Credentials | HttpClient.HttpClient,
  ChannelInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSignalingChannelsInput,
  output: ListSignalingChannelsOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSignalingChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ChannelInfoList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStreamsError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | CommonErrors;
/**
 * Returns an array of `StreamInfo` objects. Each object describes a
 * stream. To retrieve only streams that satisfy a specific condition, you can specify a
 * `StreamNameCondition`.
 */
export const listStreams: API.PaginatedOperationMethod<
  ListStreamsInput,
  ListStreamsOutput,
  ListStreamsError,
  Credentials | HttpClient.HttpClient,
  StreamInfo
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListStreamsInput,
  output: ListStreamsOutput,
  errors: [ClientLimitExceededException, InvalidArgumentException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "StreamInfoList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of tags associated with the specified signaling channel.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTagsForStreamError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | InvalidResourceFormatException
  | NotAuthorizedException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a list of tags associated with the specified stream.
 *
 * In the request, you must specify either the `StreamName` or the
 * `StreamARN`.
 */
export const listTagsForStream: API.OperationMethod<
  ListTagsForStreamInput,
  ListTagsForStreamOutput,
  ListTagsForStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForStreamInput,
  output: ListTagsForStreamOutput,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    InvalidResourceFormatException,
    NotAuthorizedException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForStream",
}));

export type StartEdgeConfigurationUpdateError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | NoDataRetentionException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * An asynchronous API that updates a stream’s existing edge configuration.
 * The Kinesis Video Stream will sync the stream’s edge configuration with the Edge Agent IoT Greengrass
 * component that runs on an IoT Hub Device, setup at your premise. The time to sync can vary
 * and depends on the connectivity of the Hub Device.
 * The `SyncStatus` will be updated as the edge configuration is acknowledged,
 * and synced with the Edge Agent.
 *
 * If this API is invoked for the first time, a new edge configuration will be created for the stream,
 * and the sync status will be set to `SYNCING`. You will have to wait for the sync status
 * to reach a terminal state such as: `IN_SYNC`, or `SYNC_FAILED`, before using this API again.
 * If you invoke this API during the syncing process, a `ResourceInUseException` will be thrown.
 * The connectivity of the stream’s edge configuration and the Edge Agent will be retried for 15 minutes. After 15 minutes,
 * the status will transition into the `SYNC_FAILED` state.
 *
 * To move an edge configuration from one device to another, use DeleteEdgeConfiguration to delete
 * the current edge configuration. You can then invoke StartEdgeConfigurationUpdate with an updated Hub Device ARN.
 */
export const startEdgeConfigurationUpdate: API.OperationMethod<
  StartEdgeConfigurationUpdateInput,
  StartEdgeConfigurationUpdateOutput,
  StartEdgeConfigurationUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartEdgeConfigurationUpdateInput,
  output: StartEdgeConfigurationUpdateOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    NoDataRetentionException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartEdgeConfigurationUpdate",
}));

export type TagResourceError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | TagsPerResourceExceededLimitException
  | StreamNotActive
  | CommonErrors;
/**
 * Adds one or more tags to a signaling channel. A *tag* is a
 * key-value pair (the value is optional) that you can define and assign to Amazon Web Services resources.
 * If you specify a tag that already exists, the tag value is replaced with the value that
 * you specify in the request. For more information, see Using Cost Allocation
 * Tags in the Billing and Cost Management and Cost Management User
 * Guide.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
    TagsPerResourceExceededLimitException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type TagStreamError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | InvalidResourceFormatException
  | NotAuthorizedException
  | ResourceNotFoundException
  | TagsPerResourceExceededLimitException
  | StreamNotActive
  | CommonErrors;
/**
 * Adds one or more tags to a stream. A *tag* is a key-value pair
 * (the value is optional) that you can define and assign to Amazon Web Services resources. If you specify
 * a tag that already exists, the tag value is replaced with the value that you specify in
 * the request. For more information, see Using Cost Allocation
 * Tags in the *Billing and Cost Management and Cost Management User Guide*.
 *
 * You must provide either the `StreamName` or the
 * `StreamARN`.
 *
 * This operation requires permission for the `KinesisVideo:TagStream`
 * action.
 *
 * A Kinesis video stream can support up to 50 tags.
 */
export const tagStream: API.OperationMethod<
  TagStreamInput,
  TagStreamOutput,
  TagStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagStreamInput,
  output: TagStreamOutput,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    InvalidResourceFormatException,
    NotAuthorizedException,
    ResourceNotFoundException,
    TagsPerResourceExceededLimitException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagStream",
}));

export type UntagResourceError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceNotFoundException
  | StreamNotActive
  | CommonErrors;
/**
 * Removes one or more tags from a signaling channel. In the request, specify only a tag
 * key or keys; don't specify the value. If you specify a tag key that does not exist, it's
 * ignored.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceNotFoundException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UntagStreamError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | InvalidResourceFormatException
  | NotAuthorizedException
  | ResourceNotFoundException
  | StreamNotActive
  | CommonErrors;
/**
 * Removes one or more tags from a stream. In the request, specify only a tag key or
 * keys; don't specify the value. If you specify a tag key that does not exist, it's
 * ignored.
 *
 * In the request, you must provide the `StreamName` or
 * `StreamARN`.
 */
export const untagStream: API.OperationMethod<
  UntagStreamInput,
  UntagStreamOutput,
  UntagStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagStreamInput,
  output: UntagStreamOutput,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    InvalidResourceFormatException,
    NotAuthorizedException,
    ResourceNotFoundException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagStream",
}));

export type UpdateDataRetentionError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceInUseException
  | ResourceNotFoundException
  | VersionMismatchException
  | StreamNotActive
  | CommonErrors;
/**
 * Increases or decreases the stream's data retention period by the value that you
 * specify. To indicate whether you want to increase or decrease the data retention period,
 * specify the `Operation` parameter in the request body. In the request, you
 * must specify either the `StreamName` or the `StreamARN`.
 *
 * This operation requires permission for the
 * `KinesisVideo:UpdateDataRetention` action.
 *
 * Changing the data retention period affects the data in the stream as
 * follows:
 *
 * - If the data retention period is increased, existing data is retained for
 * the new retention period. For example, if the data retention period is increased
 * from one hour to seven hours, all existing data is retained for seven
 * hours.
 *
 * - If the data retention period is decreased, existing data is retained for
 * the new retention period. For example, if the data retention period is decreased
 * from seven hours to one hour, all existing data is retained for one hour, and
 * any data older than one hour is deleted immediately.
 */
export const updateDataRetention: API.OperationMethod<
  UpdateDataRetentionInput,
  UpdateDataRetentionOutput,
  UpdateDataRetentionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateDataRetentionInput,
  output: UpdateDataRetentionOutput,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceInUseException,
    ResourceNotFoundException,
    VersionMismatchException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDataRetention",
}));

export type UpdateImageGenerationConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | NoDataRetentionException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the `StreamInfo` and `ImageProcessingConfiguration` fields.
 */
export const updateImageGenerationConfiguration: API.OperationMethod<
  UpdateImageGenerationConfigurationInput,
  UpdateImageGenerationConfigurationOutput,
  UpdateImageGenerationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateImageGenerationConfigurationInput,
  output: UpdateImageGenerationConfigurationOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    NoDataRetentionException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateImageGenerationConfiguration",
}));

export type UpdateMediaStorageConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | NoDataRetentionException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associates a `SignalingChannel` to a stream to store the media. There are
 * two signaling modes that you can specify :
 *
 * - If `StorageStatus` is enabled, the data will be stored in the
 * `StreamARN` provided. In order for WebRTC Ingestion to work, the stream must have data retention
 * enabled.
 *
 * - If `StorageStatus` is disabled, no data will be stored, and the
 * `StreamARN` parameter will not be needed.
 *
 * If `StorageStatus` is enabled, direct peer-to-peer (master-viewer) connections no
 * longer occur. Peers connect directly to the storage session. You must call the
 * `JoinStorageSession` API to trigger an SDP offer send and establish a
 * connection between a peer and the storage session.
 */
export const updateMediaStorageConfiguration: API.OperationMethod<
  UpdateMediaStorageConfigurationInput,
  UpdateMediaStorageConfigurationOutput,
  UpdateMediaStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMediaStorageConfigurationInput,
  output: UpdateMediaStorageConfigurationOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    NoDataRetentionException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMediaStorageConfiguration",
}));

export type UpdateNotificationConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | NoDataRetentionException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Updates the notification information for a stream.
 */
export const updateNotificationConfiguration: API.OperationMethod<
  UpdateNotificationConfigurationInput,
  UpdateNotificationConfigurationOutput,
  UpdateNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNotificationConfigurationInput,
  output: UpdateNotificationConfigurationOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    NoDataRetentionException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotificationConfiguration",
}));

export type UpdateSignalingChannelError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | VersionMismatchException
  | StreamNotActive
  | CommonErrors;
/**
 * Updates the existing signaling channel. This is an asynchronous operation and takes
 * time to complete.
 *
 * If the `MessageTtlSeconds` value is updated (either increased or reduced),
 * it only applies to new messages sent via this channel after it's been updated. Existing
 * messages are still expired as per the previous `MessageTtlSeconds`
 * value.
 */
export const updateSignalingChannel: API.OperationMethod<
  UpdateSignalingChannelInput,
  UpdateSignalingChannelOutput,
  UpdateSignalingChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSignalingChannelInput,
  output: UpdateSignalingChannelOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    VersionMismatchException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSignalingChannel",
}));

export type UpdateStreamError =
  | ClientLimitExceededException
  | InvalidArgumentException
  | NotAuthorizedException
  | ResourceInUseException
  | ResourceNotFoundException
  | VersionMismatchException
  | StreamNotActive
  | CommonErrors;
/**
 * Updates stream metadata, such as the device name and media type.
 *
 * You must provide the stream name or the Amazon Resource Name (ARN) of the
 * stream.
 *
 * To make sure that you have the latest version of the stream before updating it, you
 * can specify the stream version. Kinesis Video Streams assigns a version to each stream.
 * When you update a stream, Kinesis Video Streams assigns a new version number. To get the
 * latest stream version, use the `DescribeStream` API.
 *
 * `UpdateStream` is an asynchronous operation, and takes time to
 * complete.
 */
export const updateStream: API.OperationMethod<
  UpdateStreamInput,
  UpdateStreamOutput,
  UpdateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStreamInput,
  output: UpdateStreamOutput,
  errors: [
    ClientLimitExceededException,
    InvalidArgumentException,
    NotAuthorizedException,
    ResourceInUseException,
    ResourceNotFoundException,
    VersionMismatchException,
    StreamNotActive,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStream",
}));

export type UpdateStreamStorageConfigurationError =
  | AccessDeniedException
  | ClientLimitExceededException
  | InvalidArgumentException
  | ResourceInUseException
  | ResourceNotFoundException
  | VersionMismatchException
  | CommonErrors;
/**
 * Updates the storage configuration for an existing Kinesis video stream.
 *
 * This operation allows you to modify the storage tier settings for a stream, enabling you to optimize storage costs and performance based on your access patterns.
 *
 * `UpdateStreamStorageConfiguration` is an asynchronous operation.
 *
 * You must have permissions for the `KinesisVideo:UpdateStreamStorageConfiguration` action.
 */
export const updateStreamStorageConfiguration: API.OperationMethod<
  UpdateStreamStorageConfigurationInput,
  UpdateStreamStorageConfigurationOutput,
  UpdateStreamStorageConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateStreamStorageConfigurationInput,
  output: UpdateStreamStorageConfigurationOutput,
  errors: [
    AccessDeniedException,
    ClientLimitExceededException,
    InvalidArgumentException,
    ResourceInUseException,
    ResourceNotFoundException,
    VersionMismatchException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStreamStorageConfiguration",
}));
