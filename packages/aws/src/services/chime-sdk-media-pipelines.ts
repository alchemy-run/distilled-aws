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
  sdkId: "Chime SDK Media Pipelines",
  serviceShapeName: "ChimeSDKMediaPipelinesService",
});
const auth = T.AwsAuthSigv4({ name: "chime" });
const ver = T.ServiceVersion("2021-07-15");
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
              `https://media-pipelines-chime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://media-pipelines-chime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://media-pipelines-chime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://media-pipelines-chime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
    },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceLimitExceededException
  extends /*@__PURE__*/ S.TaggedError<ResourceLimitExceededException>()(
    "ResourceLimitExceededException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceFailureException
  extends /*@__PURE__*/ S.TaggedError<ServiceFailureException>()(
    "ServiceFailureException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
    },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
    },
    T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottledClientException
  extends /*@__PURE__*/ S.TaggedError<ThrottledClientException>()(
    "ThrottledClientException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
    },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedClientException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedClientException>()(
    "UnauthorizedClientException",
    {
      Code: S.optional(
        S.suspend(() => ErrorCode).annotate({ identifier: "ErrorCode" }),
      ),
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      RequestId: S.optional(S.String),
    },
    T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type MediaPipelineSourceType = "ChimeSdkMeeting" | (string & {});
export const MediaPipelineSourceType = /*@__PURE__*/ S.String;

export type Arn = string | redacted.Redacted<string>;
export type MediaPipelineSinkType = "S3Bucket" | (string & {});
export const MediaPipelineSinkType = /*@__PURE__*/ S.String;

export type ClientRequestToken = string | redacted.Redacted<string>;
export type GuidString = string;
export type AttendeeIdList = string[];
export const AttendeeIdList = /*@__PURE__*/ S.Array(S.String);
export type ExternalUserIdType = string | redacted.Redacted<string>;
export type ExternalUserIdList = (string | redacted.Redacted<string>)[];
export const ExternalUserIdList = /*@__PURE__*/ S.Array(SensitiveString);
export interface SelectedVideoStreams {
  AttendeeIds?: string[];
  ExternalUserIds?: (string | redacted.Redacted<string>)[];
}
export const SelectedVideoStreams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttendeeIds: S.optional(AttendeeIdList),
    ExternalUserIds: S.optional(ExternalUserIdList),
  }),
).annotate({
  identifier: "SelectedVideoStreams",
}) as any as S.Schema<SelectedVideoStreams>;
export interface SourceConfiguration {
  SelectedVideoStreams?: SelectedVideoStreams;
}
export const SourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SelectedVideoStreams: S.optional(SelectedVideoStreams) }),
).annotate({
  identifier: "SourceConfiguration",
}) as any as S.Schema<SourceConfiguration>;
export type AudioMuxType =
  | "AudioOnly"
  | "AudioWithActiveSpeakerVideo"
  | "AudioWithCompositedVideo"
  | (string & {});
export const AudioMuxType = /*@__PURE__*/ S.String;

export interface AudioArtifactsConfiguration {
  MuxType: AudioMuxType;
}
export const AudioArtifactsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MuxType: AudioMuxType }),
).annotate({
  identifier: "AudioArtifactsConfiguration",
}) as any as S.Schema<AudioArtifactsConfiguration>;
export type ArtifactsState = "Enabled" | "Disabled" | (string & {});
export const ArtifactsState = /*@__PURE__*/ S.String;

export type VideoMuxType = "VideoOnly" | (string & {});
export const VideoMuxType = /*@__PURE__*/ S.String;

export interface VideoArtifactsConfiguration {
  State: ArtifactsState;
  MuxType?: VideoMuxType;
}
export const VideoArtifactsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ State: ArtifactsState, MuxType: S.optional(VideoMuxType) }),
).annotate({
  identifier: "VideoArtifactsConfiguration",
}) as any as S.Schema<VideoArtifactsConfiguration>;
export type ContentMuxType = "ContentOnly" | (string & {});
export const ContentMuxType = /*@__PURE__*/ S.String;

export interface ContentArtifactsConfiguration {
  State: ArtifactsState;
  MuxType?: ContentMuxType;
}
export const ContentArtifactsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ State: ArtifactsState, MuxType: S.optional(ContentMuxType) }),
).annotate({
  identifier: "ContentArtifactsConfiguration",
}) as any as S.Schema<ContentArtifactsConfiguration>;
export type LayoutOption = "GridView" | (string & {});
export const LayoutOption = /*@__PURE__*/ S.String;

export type ResolutionOption = "HD" | "FHD" | (string & {});
export const ResolutionOption = /*@__PURE__*/ S.String;

export type ContentShareLayoutOption =
  | "PresenterOnly"
  | "Horizontal"
  | "Vertical"
  | "ActiveSpeakerOnly"
  | (string & {});
export const ContentShareLayoutOption = /*@__PURE__*/ S.String;

export type PresenterPosition =
  | "TopLeft"
  | "TopRight"
  | "BottomLeft"
  | "BottomRight"
  | (string & {});
export const PresenterPosition = /*@__PURE__*/ S.String;

export interface PresenterOnlyConfiguration {
  PresenterPosition?: PresenterPosition;
}
export const PresenterOnlyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PresenterPosition: S.optional(PresenterPosition) }),
).annotate({
  identifier: "PresenterOnlyConfiguration",
}) as any as S.Schema<PresenterOnlyConfiguration>;
export type ActiveSpeakerPosition =
  | "TopLeft"
  | "TopRight"
  | "BottomLeft"
  | "BottomRight"
  | (string & {});
export const ActiveSpeakerPosition = /*@__PURE__*/ S.String;

export interface ActiveSpeakerOnlyConfiguration {
  ActiveSpeakerPosition?: ActiveSpeakerPosition;
}
export const ActiveSpeakerOnlyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ActiveSpeakerPosition: S.optional(ActiveSpeakerPosition) }),
).annotate({
  identifier: "ActiveSpeakerOnlyConfiguration",
}) as any as S.Schema<ActiveSpeakerOnlyConfiguration>;
export type TileOrder = "JoinSequence" | "SpeakerSequence" | (string & {});
export const TileOrder = /*@__PURE__*/ S.String;

export type HorizontalTilePosition = "Top" | "Bottom" | (string & {});
export const HorizontalTilePosition = /*@__PURE__*/ S.String;

export type TileCount = number;
export type TileAspectRatio = string;
export interface HorizontalLayoutConfiguration {
  TileOrder?: TileOrder;
  TilePosition?: HorizontalTilePosition;
  TileCount?: number;
  TileAspectRatio?: string;
}
export const HorizontalLayoutConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TileOrder: S.optional(TileOrder),
    TilePosition: S.optional(HorizontalTilePosition),
    TileCount: S.optional(S.Number),
    TileAspectRatio: S.optional(S.String),
  }),
).annotate({
  identifier: "HorizontalLayoutConfiguration",
}) as any as S.Schema<HorizontalLayoutConfiguration>;
export type VerticalTilePosition = "Left" | "Right" | (string & {});
export const VerticalTilePosition = /*@__PURE__*/ S.String;

export interface VerticalLayoutConfiguration {
  TileOrder?: TileOrder;
  TilePosition?: VerticalTilePosition;
  TileCount?: number;
  TileAspectRatio?: string;
}
export const VerticalLayoutConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TileOrder: S.optional(TileOrder),
    TilePosition: S.optional(VerticalTilePosition),
    TileCount: S.optional(S.Number),
    TileAspectRatio: S.optional(S.String),
  }),
).annotate({
  identifier: "VerticalLayoutConfiguration",
}) as any as S.Schema<VerticalLayoutConfiguration>;
export type CornerRadius = number;
export type BorderColor =
  | "Black"
  | "Blue"
  | "Red"
  | "Green"
  | "White"
  | "Yellow"
  | (string & {});
export const BorderColor = /*@__PURE__*/ S.String;

export type HighlightColor =
  | "Black"
  | "Blue"
  | "Red"
  | "Green"
  | "White"
  | "Yellow"
  | (string & {});
export const HighlightColor = /*@__PURE__*/ S.String;

export type BorderThickness = number;
export interface VideoAttribute {
  CornerRadius?: number;
  BorderColor?: BorderColor;
  HighlightColor?: HighlightColor;
  BorderThickness?: number;
}
export const VideoAttribute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CornerRadius: S.optional(S.Number),
    BorderColor: S.optional(BorderColor),
    HighlightColor: S.optional(HighlightColor),
    BorderThickness: S.optional(S.Number),
  }),
).annotate({ identifier: "VideoAttribute" }) as any as S.Schema<VideoAttribute>;
export type CanvasOrientation = "Landscape" | "Portrait" | (string & {});
export const CanvasOrientation = /*@__PURE__*/ S.String;

export interface GridViewConfiguration {
  ContentShareLayout: ContentShareLayoutOption;
  PresenterOnlyConfiguration?: PresenterOnlyConfiguration;
  ActiveSpeakerOnlyConfiguration?: ActiveSpeakerOnlyConfiguration;
  HorizontalLayoutConfiguration?: HorizontalLayoutConfiguration;
  VerticalLayoutConfiguration?: VerticalLayoutConfiguration;
  VideoAttribute?: VideoAttribute;
  CanvasOrientation?: CanvasOrientation;
}
export const GridViewConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentShareLayout: ContentShareLayoutOption,
    PresenterOnlyConfiguration: S.optional(PresenterOnlyConfiguration),
    ActiveSpeakerOnlyConfiguration: S.optional(ActiveSpeakerOnlyConfiguration),
    HorizontalLayoutConfiguration: S.optional(HorizontalLayoutConfiguration),
    VerticalLayoutConfiguration: S.optional(VerticalLayoutConfiguration),
    VideoAttribute: S.optional(VideoAttribute),
    CanvasOrientation: S.optional(CanvasOrientation),
  }),
).annotate({
  identifier: "GridViewConfiguration",
}) as any as S.Schema<GridViewConfiguration>;
export interface CompositedVideoArtifactsConfiguration {
  Layout?: LayoutOption;
  Resolution?: ResolutionOption;
  GridViewConfiguration: GridViewConfiguration;
}
export const CompositedVideoArtifactsConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Layout: S.optional(LayoutOption),
      Resolution: S.optional(ResolutionOption),
      GridViewConfiguration: GridViewConfiguration,
    }),
).annotate({
  identifier: "CompositedVideoArtifactsConfiguration",
}) as any as S.Schema<CompositedVideoArtifactsConfiguration>;
export interface ArtifactsConfiguration {
  Audio: AudioArtifactsConfiguration;
  Video: VideoArtifactsConfiguration;
  Content: ContentArtifactsConfiguration;
  CompositedVideo?: CompositedVideoArtifactsConfiguration;
}
export const ArtifactsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Audio: AudioArtifactsConfiguration,
    Video: VideoArtifactsConfiguration,
    Content: ContentArtifactsConfiguration,
    CompositedVideo: S.optional(CompositedVideoArtifactsConfiguration),
  }),
).annotate({
  identifier: "ArtifactsConfiguration",
}) as any as S.Schema<ArtifactsConfiguration>;
export interface ChimeSdkMeetingConfiguration {
  SourceConfiguration?: SourceConfiguration;
  ArtifactsConfiguration?: ArtifactsConfiguration;
}
export const ChimeSdkMeetingConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceConfiguration: S.optional(SourceConfiguration),
    ArtifactsConfiguration: S.optional(ArtifactsConfiguration),
  }),
).annotate({
  identifier: "ChimeSdkMeetingConfiguration",
}) as any as S.Schema<ChimeSdkMeetingConfiguration>;
export interface SseAwsKeyManagementParams {
  AwsKmsKeyId: string;
  AwsKmsEncryptionContext?: string;
}
export const SseAwsKeyManagementParams = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AwsKmsKeyId: S.String,
    AwsKmsEncryptionContext: S.optional(S.String),
  }),
).annotate({
  identifier: "SseAwsKeyManagementParams",
}) as any as S.Schema<SseAwsKeyManagementParams>;
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
export interface CreateMediaCapturePipelineRequest {
  SourceType: MediaPipelineSourceType;
  SourceArn: string | redacted.Redacted<string>;
  SinkType: MediaPipelineSinkType;
  SinkArn: string | redacted.Redacted<string>;
  ClientRequestToken?: string | redacted.Redacted<string>;
  ChimeSdkMeetingConfiguration?: ChimeSdkMeetingConfiguration;
  SseAwsKeyManagementParams?: SseAwsKeyManagementParams;
  SinkIamRoleArn?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export const CreateMediaCapturePipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: MediaPipelineSourceType,
    SourceArn: SensitiveString,
    SinkType: MediaPipelineSinkType,
    SinkArn: SensitiveString,
    ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    ChimeSdkMeetingConfiguration: S.optional(ChimeSdkMeetingConfiguration),
    SseAwsKeyManagementParams: S.optional(SseAwsKeyManagementParams),
    SinkIamRoleArn: S.optional(SensitiveString),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sdk-media-capture-pipelines" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMediaCapturePipelineRequest",
}) as any as S.Schema<CreateMediaCapturePipelineRequest>;
export type AmazonResourceName = string;
export type MediaPipelineStatus =
  | "Initializing"
  | "InProgress"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | "Paused"
  | "NotStarted"
  | (string & {});
export const MediaPipelineStatus = /*@__PURE__*/ S.String;

export type Iso8601Timestamp = Date;
export interface MediaCapturePipeline {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
  SourceType?: MediaPipelineSourceType;
  SourceArn?: string | redacted.Redacted<string>;
  Status?: MediaPipelineStatus;
  SinkType?: MediaPipelineSinkType;
  SinkArn?: string | redacted.Redacted<string>;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  ChimeSdkMeetingConfiguration?: ChimeSdkMeetingConfiguration;
  SseAwsKeyManagementParams?: SseAwsKeyManagementParams;
  SinkIamRoleArn?: string | redacted.Redacted<string>;
}
export const MediaCapturePipeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(S.String),
    SourceType: S.optional(MediaPipelineSourceType),
    SourceArn: S.optional(SensitiveString),
    Status: S.optional(MediaPipelineStatus),
    SinkType: S.optional(MediaPipelineSinkType),
    SinkArn: S.optional(SensitiveString),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ChimeSdkMeetingConfiguration: S.optional(ChimeSdkMeetingConfiguration),
    SseAwsKeyManagementParams: S.optional(SseAwsKeyManagementParams),
    SinkIamRoleArn: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "MediaCapturePipeline",
}) as any as S.Schema<MediaCapturePipeline>;
export interface CreateMediaCapturePipelineResponse {
  MediaCapturePipeline?: MediaCapturePipeline;
}
export const CreateMediaCapturePipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MediaCapturePipeline: S.optional(MediaCapturePipeline) }),
).annotate({
  identifier: "CreateMediaCapturePipelineResponse",
}) as any as S.Schema<CreateMediaCapturePipelineResponse>;
export type ConcatenationSourceType = "MediaCapturePipeline" | (string & {});
export const ConcatenationSourceType = /*@__PURE__*/ S.String;

export type AudioArtifactsConcatenationState = "Enabled" | (string & {});
export const AudioArtifactsConcatenationState = /*@__PURE__*/ S.String;

export interface AudioConcatenationConfiguration {
  State: AudioArtifactsConcatenationState;
}
export const AudioConcatenationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ State: AudioArtifactsConcatenationState }),
).annotate({
  identifier: "AudioConcatenationConfiguration",
}) as any as S.Schema<AudioConcatenationConfiguration>;
export type ArtifactsConcatenationState =
  | "Enabled"
  | "Disabled"
  | (string & {});
export const ArtifactsConcatenationState = /*@__PURE__*/ S.String;

export interface VideoConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export const VideoConcatenationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ State: ArtifactsConcatenationState }),
).annotate({
  identifier: "VideoConcatenationConfiguration",
}) as any as S.Schema<VideoConcatenationConfiguration>;
export interface ContentConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export const ContentConcatenationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ State: ArtifactsConcatenationState }),
).annotate({
  identifier: "ContentConcatenationConfiguration",
}) as any as S.Schema<ContentConcatenationConfiguration>;
export interface DataChannelConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export const DataChannelConcatenationConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ State: ArtifactsConcatenationState }),
).annotate({
  identifier: "DataChannelConcatenationConfiguration",
}) as any as S.Schema<DataChannelConcatenationConfiguration>;
export interface TranscriptionMessagesConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export const TranscriptionMessagesConcatenationConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ State: ArtifactsConcatenationState }),
  ).annotate({
    identifier: "TranscriptionMessagesConcatenationConfiguration",
  }) as any as S.Schema<TranscriptionMessagesConcatenationConfiguration>;
export interface MeetingEventsConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export const MeetingEventsConcatenationConfiguration = /*@__PURE__*/ S.suspend(
  () => S.Struct({ State: ArtifactsConcatenationState }),
).annotate({
  identifier: "MeetingEventsConcatenationConfiguration",
}) as any as S.Schema<MeetingEventsConcatenationConfiguration>;
export interface CompositedVideoConcatenationConfiguration {
  State: ArtifactsConcatenationState;
}
export const CompositedVideoConcatenationConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ State: ArtifactsConcatenationState }),
  ).annotate({
    identifier: "CompositedVideoConcatenationConfiguration",
  }) as any as S.Schema<CompositedVideoConcatenationConfiguration>;
export interface ArtifactsConcatenationConfiguration {
  Audio: AudioConcatenationConfiguration;
  Video: VideoConcatenationConfiguration;
  Content: ContentConcatenationConfiguration;
  DataChannel: DataChannelConcatenationConfiguration;
  TranscriptionMessages: TranscriptionMessagesConcatenationConfiguration;
  MeetingEvents: MeetingEventsConcatenationConfiguration;
  CompositedVideo: CompositedVideoConcatenationConfiguration;
}
export const ArtifactsConcatenationConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Audio: AudioConcatenationConfiguration,
    Video: VideoConcatenationConfiguration,
    Content: ContentConcatenationConfiguration,
    DataChannel: DataChannelConcatenationConfiguration,
    TranscriptionMessages: TranscriptionMessagesConcatenationConfiguration,
    MeetingEvents: MeetingEventsConcatenationConfiguration,
    CompositedVideo: CompositedVideoConcatenationConfiguration,
  }),
).annotate({
  identifier: "ArtifactsConcatenationConfiguration",
}) as any as S.Schema<ArtifactsConcatenationConfiguration>;
export interface ChimeSdkMeetingConcatenationConfiguration {
  ArtifactsConfiguration: ArtifactsConcatenationConfiguration;
}
export const ChimeSdkMeetingConcatenationConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ ArtifactsConfiguration: ArtifactsConcatenationConfiguration }),
  ).annotate({
    identifier: "ChimeSdkMeetingConcatenationConfiguration",
  }) as any as S.Schema<ChimeSdkMeetingConcatenationConfiguration>;
export interface MediaCapturePipelineSourceConfiguration {
  MediaPipelineArn: string | redacted.Redacted<string>;
  ChimeSdkMeetingConfiguration: ChimeSdkMeetingConcatenationConfiguration;
}
export const MediaCapturePipelineSourceConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MediaPipelineArn: SensitiveString,
      ChimeSdkMeetingConfiguration: ChimeSdkMeetingConcatenationConfiguration,
    }),
).annotate({
  identifier: "MediaCapturePipelineSourceConfiguration",
}) as any as S.Schema<MediaCapturePipelineSourceConfiguration>;
export interface ConcatenationSource {
  Type: ConcatenationSourceType;
  MediaCapturePipelineSourceConfiguration: MediaCapturePipelineSourceConfiguration;
}
export const ConcatenationSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: ConcatenationSourceType,
    MediaCapturePipelineSourceConfiguration:
      MediaCapturePipelineSourceConfiguration,
  }),
).annotate({
  identifier: "ConcatenationSource",
}) as any as S.Schema<ConcatenationSource>;
export type ConcatenationSourceList = ConcatenationSource[];
export const ConcatenationSourceList =
  /*@__PURE__*/ S.Array(ConcatenationSource);
export type ConcatenationSinkType = "S3Bucket" | (string & {});
export const ConcatenationSinkType = /*@__PURE__*/ S.String;

export interface S3BucketSinkConfiguration {
  Destination: string | redacted.Redacted<string>;
}
export const S3BucketSinkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Destination: SensitiveString }),
).annotate({
  identifier: "S3BucketSinkConfiguration",
}) as any as S.Schema<S3BucketSinkConfiguration>;
export interface ConcatenationSink {
  Type: ConcatenationSinkType;
  S3BucketSinkConfiguration: S3BucketSinkConfiguration;
}
export const ConcatenationSink = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: ConcatenationSinkType,
    S3BucketSinkConfiguration: S3BucketSinkConfiguration,
  }),
).annotate({
  identifier: "ConcatenationSink",
}) as any as S.Schema<ConcatenationSink>;
export type ConcatenationSinkList = ConcatenationSink[];
export const ConcatenationSinkList = /*@__PURE__*/ S.Array(ConcatenationSink);
export interface CreateMediaConcatenationPipelineRequest {
  Sources: ConcatenationSource[];
  Sinks: ConcatenationSink[];
  ClientRequestToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export const CreateMediaConcatenationPipelineRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Sources: ConcatenationSourceList,
      Sinks: ConcatenationSinkList,
      ClientRequestToken: S.optional(SensitiveString).pipe(
        T.IdempotencyToken(),
      ),
      Tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/sdk-media-concatenation-pipelines" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateMediaConcatenationPipelineRequest",
}) as any as S.Schema<CreateMediaConcatenationPipelineRequest>;
export interface MediaConcatenationPipeline {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
  Sources?: ConcatenationSource[];
  Sinks?: ConcatenationSink[];
  Status?: MediaPipelineStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const MediaConcatenationPipeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(S.String),
    Sources: S.optional(ConcatenationSourceList),
    Sinks: S.optional(ConcatenationSinkList),
    Status: S.optional(MediaPipelineStatus),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "MediaConcatenationPipeline",
}) as any as S.Schema<MediaConcatenationPipeline>;
export interface CreateMediaConcatenationPipelineResponse {
  MediaConcatenationPipeline?: MediaConcatenationPipeline;
}
export const CreateMediaConcatenationPipelineResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MediaConcatenationPipeline: S.optional(MediaConcatenationPipeline),
    }),
).annotate({
  identifier: "CreateMediaConcatenationPipelineResponse",
}) as any as S.Schema<CreateMediaConcatenationPipelineResponse>;
export type KinesisVideoStreamArn = string;
export type FragmentNumberString = string;
export type NumberOfChannels = number;
export type ChannelId = number;
export type ParticipantRole = "AGENT" | "CUSTOMER" | (string & {});
export const ParticipantRole = /*@__PURE__*/ S.String;

export interface ChannelDefinition {
  ChannelId: number;
  ParticipantRole?: ParticipantRole;
}
export const ChannelDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.Number,
    ParticipantRole: S.optional(ParticipantRole),
  }),
).annotate({
  identifier: "ChannelDefinition",
}) as any as S.Schema<ChannelDefinition>;
export type ChannelDefinitions = ChannelDefinition[];
export const ChannelDefinitions = /*@__PURE__*/ S.Array(ChannelDefinition);
export interface StreamChannelDefinition {
  NumberOfChannels: number;
  ChannelDefinitions?: ChannelDefinition[];
}
export const StreamChannelDefinition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NumberOfChannels: S.Number,
    ChannelDefinitions: S.optional(ChannelDefinitions),
  }),
).annotate({
  identifier: "StreamChannelDefinition",
}) as any as S.Schema<StreamChannelDefinition>;
export interface StreamConfiguration {
  StreamArn: string;
  FragmentNumber?: string;
  StreamChannelDefinition: StreamChannelDefinition;
}
export const StreamConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamArn: S.String,
    FragmentNumber: S.optional(S.String),
    StreamChannelDefinition: StreamChannelDefinition,
  }),
).annotate({
  identifier: "StreamConfiguration",
}) as any as S.Schema<StreamConfiguration>;
export type Streams = StreamConfiguration[];
export const Streams = /*@__PURE__*/ S.Array(StreamConfiguration);
export type MediaEncoding = "pcm" | (string & {});
export const MediaEncoding = /*@__PURE__*/ S.String;

export type MediaSampleRateHertz = number;
export interface KinesisVideoStreamSourceRuntimeConfiguration {
  Streams: StreamConfiguration[];
  MediaEncoding: MediaEncoding;
  MediaSampleRate: number;
}
export const KinesisVideoStreamSourceRuntimeConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Streams: Streams,
      MediaEncoding: MediaEncoding,
      MediaSampleRate: S.Number,
    }),
  ).annotate({
    identifier: "KinesisVideoStreamSourceRuntimeConfiguration",
  }) as any as S.Schema<KinesisVideoStreamSourceRuntimeConfiguration>;
export type NonEmptyString = string;
export type MediaInsightsRuntimeMetadata = {
  [key: string]: string | undefined;
};
export const MediaInsightsRuntimeMetadata = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface RecordingStreamConfiguration {
  StreamArn?: string;
}
export const RecordingStreamConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StreamArn: S.optional(S.String) }),
).annotate({
  identifier: "RecordingStreamConfiguration",
}) as any as S.Schema<RecordingStreamConfiguration>;
export type RecordingStreamList = RecordingStreamConfiguration[];
export const RecordingStreamList = /*@__PURE__*/ S.Array(
  RecordingStreamConfiguration,
);
export type FragmentSelectorType =
  | "ProducerTimestamp"
  | "ServerTimestamp"
  | (string & {});
export const FragmentSelectorType = /*@__PURE__*/ S.String;

export interface TimestampRange {
  StartTimestamp: Date;
  EndTimestamp: Date;
}
export const TimestampRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    EndTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({ identifier: "TimestampRange" }) as any as S.Schema<TimestampRange>;
export interface FragmentSelector {
  FragmentSelectorType: FragmentSelectorType;
  TimestampRange: TimestampRange;
}
export const FragmentSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FragmentSelectorType: FragmentSelectorType,
    TimestampRange: TimestampRange,
  }),
).annotate({
  identifier: "FragmentSelector",
}) as any as S.Schema<FragmentSelector>;
export interface KinesisVideoStreamRecordingSourceRuntimeConfiguration {
  Streams: RecordingStreamConfiguration[];
  FragmentSelector: FragmentSelector;
}
export const KinesisVideoStreamRecordingSourceRuntimeConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Streams: RecordingStreamList,
      FragmentSelector: FragmentSelector,
    }),
  ).annotate({
    identifier: "KinesisVideoStreamRecordingSourceRuntimeConfiguration",
  }) as any as S.Schema<KinesisVideoStreamRecordingSourceRuntimeConfiguration>;
export type RecordingFileFormat = "Wav" | "Opus" | (string & {});
export const RecordingFileFormat = /*@__PURE__*/ S.String;

export interface S3RecordingSinkRuntimeConfiguration {
  Destination: string | redacted.Redacted<string>;
  RecordingFileFormat: RecordingFileFormat;
}
export const S3RecordingSinkRuntimeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: SensitiveString,
    RecordingFileFormat: RecordingFileFormat,
  }),
).annotate({
  identifier: "S3RecordingSinkRuntimeConfiguration",
}) as any as S.Schema<S3RecordingSinkRuntimeConfiguration>;
export interface CreateMediaInsightsPipelineRequest {
  MediaInsightsPipelineConfigurationArn: string | redacted.Redacted<string>;
  KinesisVideoStreamSourceRuntimeConfiguration?: KinesisVideoStreamSourceRuntimeConfiguration;
  MediaInsightsRuntimeMetadata?: { [key: string]: string | undefined };
  KinesisVideoStreamRecordingSourceRuntimeConfiguration?: KinesisVideoStreamRecordingSourceRuntimeConfiguration;
  S3RecordingSinkRuntimeConfiguration?: S3RecordingSinkRuntimeConfiguration;
  Tags?: Tag[];
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export const CreateMediaInsightsPipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaInsightsPipelineConfigurationArn: SensitiveString,
    KinesisVideoStreamSourceRuntimeConfiguration: S.optional(
      KinesisVideoStreamSourceRuntimeConfiguration,
    ),
    MediaInsightsRuntimeMetadata: S.optional(MediaInsightsRuntimeMetadata),
    KinesisVideoStreamRecordingSourceRuntimeConfiguration: S.optional(
      KinesisVideoStreamRecordingSourceRuntimeConfiguration,
    ),
    S3RecordingSinkRuntimeConfiguration: S.optional(
      S3RecordingSinkRuntimeConfiguration,
    ),
    Tags: S.optional(TagList),
    ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/media-insights-pipelines" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMediaInsightsPipelineRequest",
}) as any as S.Schema<CreateMediaInsightsPipelineRequest>;
export type MediaInsightsPipelineConfigurationElementType =
  | "AmazonTranscribeCallAnalyticsProcessor"
  | "VoiceAnalyticsProcessor"
  | "AmazonTranscribeProcessor"
  | "KinesisDataStreamSink"
  | "LambdaFunctionSink"
  | "SqsQueueSink"
  | "SnsTopicSink"
  | "S3RecordingSink"
  | "VoiceEnhancementSink"
  | (string & {});
export const MediaInsightsPipelineConfigurationElementType =
  /*@__PURE__*/ S.String;

export type MediaPipelineElementStatus =
  | "NotStarted"
  | "NotSupported"
  | "Initializing"
  | "InProgress"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | "Paused"
  | (string & {});
export const MediaPipelineElementStatus = /*@__PURE__*/ S.String;

export interface MediaInsightsPipelineElementStatus {
  Type?: MediaInsightsPipelineConfigurationElementType;
  Status?: MediaPipelineElementStatus;
}
export const MediaInsightsPipelineElementStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: S.optional(MediaInsightsPipelineConfigurationElementType),
    Status: S.optional(MediaPipelineElementStatus),
  }),
).annotate({
  identifier: "MediaInsightsPipelineElementStatus",
}) as any as S.Schema<MediaInsightsPipelineElementStatus>;
export type MediaInsightsPipelineElementStatuses =
  MediaInsightsPipelineElementStatus[];
export const MediaInsightsPipelineElementStatuses = /*@__PURE__*/ S.Array(
  MediaInsightsPipelineElementStatus,
);
export interface MediaInsightsPipeline {
  MediaPipelineId?: string;
  MediaPipelineArn?: string | redacted.Redacted<string>;
  MediaInsightsPipelineConfigurationArn?: string | redacted.Redacted<string>;
  Status?: MediaPipelineStatus;
  KinesisVideoStreamSourceRuntimeConfiguration?: KinesisVideoStreamSourceRuntimeConfiguration;
  MediaInsightsRuntimeMetadata?: { [key: string]: string | undefined };
  KinesisVideoStreamRecordingSourceRuntimeConfiguration?: KinesisVideoStreamRecordingSourceRuntimeConfiguration;
  S3RecordingSinkRuntimeConfiguration?: S3RecordingSinkRuntimeConfiguration;
  CreatedTimestamp?: Date;
  ElementStatuses?: MediaInsightsPipelineElementStatus[];
}
export const MediaInsightsPipeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(SensitiveString),
    MediaInsightsPipelineConfigurationArn: S.optional(SensitiveString),
    Status: S.optional(MediaPipelineStatus),
    KinesisVideoStreamSourceRuntimeConfiguration: S.optional(
      KinesisVideoStreamSourceRuntimeConfiguration,
    ),
    MediaInsightsRuntimeMetadata: S.optional(MediaInsightsRuntimeMetadata),
    KinesisVideoStreamRecordingSourceRuntimeConfiguration: S.optional(
      KinesisVideoStreamRecordingSourceRuntimeConfiguration,
    ),
    S3RecordingSinkRuntimeConfiguration: S.optional(
      S3RecordingSinkRuntimeConfiguration,
    ),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    ElementStatuses: S.optional(MediaInsightsPipelineElementStatuses),
  }),
).annotate({
  identifier: "MediaInsightsPipeline",
}) as any as S.Schema<MediaInsightsPipeline>;
export interface CreateMediaInsightsPipelineResponse {
  MediaInsightsPipeline: MediaInsightsPipeline;
}
export const CreateMediaInsightsPipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MediaInsightsPipeline: MediaInsightsPipeline }),
).annotate({
  identifier: "CreateMediaInsightsPipelineResponse",
}) as any as S.Schema<CreateMediaInsightsPipelineResponse>;
export type MediaInsightsPipelineConfigurationNameString = string;
export type RealTimeAlertRuleType =
  | "KeywordMatch"
  | "Sentiment"
  | "IssueDetection"
  | (string & {});
export const RealTimeAlertRuleType = /*@__PURE__*/ S.String;

export type RuleName = string;
export type Keyword = string;
export type KeywordMatchWordList = string[];
export const KeywordMatchWordList = /*@__PURE__*/ S.Array(S.String);
export interface KeywordMatchConfiguration {
  RuleName: string;
  Keywords: string[];
  Negate?: boolean;
}
export const KeywordMatchConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.String,
    Keywords: KeywordMatchWordList,
    Negate: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "KeywordMatchConfiguration",
}) as any as S.Schema<KeywordMatchConfiguration>;
export type SentimentType = "NEGATIVE" | (string & {});
export const SentimentType = /*@__PURE__*/ S.String;

export type SentimentTimePeriodInSeconds = number;
export interface SentimentConfiguration {
  RuleName: string;
  SentimentType: SentimentType;
  TimePeriod: number;
}
export const SentimentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RuleName: S.String,
    SentimentType: SentimentType,
    TimePeriod: S.Number,
  }),
).annotate({
  identifier: "SentimentConfiguration",
}) as any as S.Schema<SentimentConfiguration>;
export interface IssueDetectionConfiguration {
  RuleName: string;
}
export const IssueDetectionConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RuleName: S.String }),
).annotate({
  identifier: "IssueDetectionConfiguration",
}) as any as S.Schema<IssueDetectionConfiguration>;
export interface RealTimeAlertRule {
  Type: RealTimeAlertRuleType;
  KeywordMatchConfiguration?: KeywordMatchConfiguration;
  SentimentConfiguration?: SentimentConfiguration;
  IssueDetectionConfiguration?: IssueDetectionConfiguration;
}
export const RealTimeAlertRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Type: RealTimeAlertRuleType,
    KeywordMatchConfiguration: S.optional(KeywordMatchConfiguration),
    SentimentConfiguration: S.optional(SentimentConfiguration),
    IssueDetectionConfiguration: S.optional(IssueDetectionConfiguration),
  }),
).annotate({
  identifier: "RealTimeAlertRule",
}) as any as S.Schema<RealTimeAlertRule>;
export type RealTimeAlertRuleList = RealTimeAlertRule[];
export const RealTimeAlertRuleList = /*@__PURE__*/ S.Array(RealTimeAlertRule);
export interface RealTimeAlertConfiguration {
  Disabled?: boolean;
  Rules?: RealTimeAlertRule[];
}
export const RealTimeAlertConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Disabled: S.optional(S.Boolean),
    Rules: S.optional(RealTimeAlertRuleList),
  }),
).annotate({
  identifier: "RealTimeAlertConfiguration",
}) as any as S.Schema<RealTimeAlertConfiguration>;
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

export type VocabularyName = string;
export type VocabularyFilterName = string;
export type VocabularyFilterMethod = "remove" | "mask" | "tag" | (string & {});
export const VocabularyFilterMethod = /*@__PURE__*/ S.String;

export type ModelName = string;
export type PartialResultsStability = "high" | "medium" | "low" | (string & {});
export const PartialResultsStability = /*@__PURE__*/ S.String;

export type ContentType = "PII" | (string & {});
export const ContentType = /*@__PURE__*/ S.String;

export type PiiEntityTypes = string;
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
export type CategoryName = string;
export type CategoryNameList = string[];
export const CategoryNameList = /*@__PURE__*/ S.Array(S.String);
export interface AmazonTranscribeCallAnalyticsProcessorConfiguration {
  LanguageCode: CallAnalyticsLanguageCode;
  VocabularyName?: string;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  LanguageModelName?: string;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: PartialResultsStability;
  ContentIdentificationType?: ContentType;
  ContentRedactionType?: ContentType;
  PiiEntityTypes?: string;
  FilterPartialResults?: boolean;
  PostCallAnalyticsSettings?: PostCallAnalyticsSettings;
  CallAnalyticsStreamCategories?: string[];
}
export const AmazonTranscribeCallAnalyticsProcessorConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      LanguageCode: CallAnalyticsLanguageCode,
      VocabularyName: S.optional(S.String),
      VocabularyFilterName: S.optional(S.String),
      VocabularyFilterMethod: S.optional(VocabularyFilterMethod),
      LanguageModelName: S.optional(S.String),
      EnablePartialResultsStabilization: S.optional(S.Boolean),
      PartialResultsStability: S.optional(PartialResultsStability),
      ContentIdentificationType: S.optional(ContentType),
      ContentRedactionType: S.optional(ContentType),
      PiiEntityTypes: S.optional(S.String),
      FilterPartialResults: S.optional(S.Boolean),
      PostCallAnalyticsSettings: S.optional(PostCallAnalyticsSettings),
      CallAnalyticsStreamCategories: S.optional(CategoryNameList),
    }),
  ).annotate({
    identifier: "AmazonTranscribeCallAnalyticsProcessorConfiguration",
  }) as any as S.Schema<AmazonTranscribeCallAnalyticsProcessorConfiguration>;
export type LanguageOptions = string;
export type VocabularyNames = string;
export type VocabularyFilterNames = string;
export interface AmazonTranscribeProcessorConfiguration {
  LanguageCode?: CallAnalyticsLanguageCode;
  VocabularyName?: string;
  VocabularyFilterName?: string;
  VocabularyFilterMethod?: VocabularyFilterMethod;
  ShowSpeakerLabel?: boolean;
  EnablePartialResultsStabilization?: boolean;
  PartialResultsStability?: PartialResultsStability;
  ContentIdentificationType?: ContentType;
  ContentRedactionType?: ContentType;
  PiiEntityTypes?: string;
  LanguageModelName?: string;
  FilterPartialResults?: boolean;
  IdentifyLanguage?: boolean;
  IdentifyMultipleLanguages?: boolean;
  LanguageOptions?: string;
  PreferredLanguage?: CallAnalyticsLanguageCode;
  VocabularyNames?: string;
  VocabularyFilterNames?: string;
}
export const AmazonTranscribeProcessorConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      LanguageCode: S.optional(CallAnalyticsLanguageCode),
      VocabularyName: S.optional(S.String),
      VocabularyFilterName: S.optional(S.String),
      VocabularyFilterMethod: S.optional(VocabularyFilterMethod),
      ShowSpeakerLabel: S.optional(S.Boolean),
      EnablePartialResultsStabilization: S.optional(S.Boolean),
      PartialResultsStability: S.optional(PartialResultsStability),
      ContentIdentificationType: S.optional(ContentType),
      ContentRedactionType: S.optional(ContentType),
      PiiEntityTypes: S.optional(S.String),
      LanguageModelName: S.optional(S.String),
      FilterPartialResults: S.optional(S.Boolean),
      IdentifyLanguage: S.optional(S.Boolean),
      IdentifyMultipleLanguages: S.optional(S.Boolean),
      LanguageOptions: S.optional(S.String),
      PreferredLanguage: S.optional(CallAnalyticsLanguageCode),
      VocabularyNames: S.optional(S.String),
      VocabularyFilterNames: S.optional(S.String),
    }),
).annotate({
  identifier: "AmazonTranscribeProcessorConfiguration",
}) as any as S.Schema<AmazonTranscribeProcessorConfiguration>;
export interface KinesisDataStreamSinkConfiguration {
  InsightsTarget?: string | redacted.Redacted<string>;
}
export const KinesisDataStreamSinkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InsightsTarget: S.optional(SensitiveString) }),
).annotate({
  identifier: "KinesisDataStreamSinkConfiguration",
}) as any as S.Schema<KinesisDataStreamSinkConfiguration>;
export interface S3RecordingSinkConfiguration {
  Destination?: string | redacted.Redacted<string>;
  RecordingFileFormat?: RecordingFileFormat;
}
export const S3RecordingSinkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: S.optional(SensitiveString),
    RecordingFileFormat: S.optional(RecordingFileFormat),
  }),
).annotate({
  identifier: "S3RecordingSinkConfiguration",
}) as any as S.Schema<S3RecordingSinkConfiguration>;
export type VoiceAnalyticsConfigurationStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
export const VoiceAnalyticsConfigurationStatus = /*@__PURE__*/ S.String;

export interface VoiceAnalyticsProcessorConfiguration {
  SpeakerSearchStatus?: VoiceAnalyticsConfigurationStatus;
  VoiceToneAnalysisStatus?: VoiceAnalyticsConfigurationStatus;
}
export const VoiceAnalyticsProcessorConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      SpeakerSearchStatus: S.optional(VoiceAnalyticsConfigurationStatus),
      VoiceToneAnalysisStatus: S.optional(VoiceAnalyticsConfigurationStatus),
    }),
).annotate({
  identifier: "VoiceAnalyticsProcessorConfiguration",
}) as any as S.Schema<VoiceAnalyticsProcessorConfiguration>;
export interface LambdaFunctionSinkConfiguration {
  InsightsTarget?: string | redacted.Redacted<string>;
}
export const LambdaFunctionSinkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InsightsTarget: S.optional(SensitiveString) }),
).annotate({
  identifier: "LambdaFunctionSinkConfiguration",
}) as any as S.Schema<LambdaFunctionSinkConfiguration>;
export interface SqsQueueSinkConfiguration {
  InsightsTarget?: string | redacted.Redacted<string>;
}
export const SqsQueueSinkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InsightsTarget: S.optional(SensitiveString) }),
).annotate({
  identifier: "SqsQueueSinkConfiguration",
}) as any as S.Schema<SqsQueueSinkConfiguration>;
export interface SnsTopicSinkConfiguration {
  InsightsTarget?: string | redacted.Redacted<string>;
}
export const SnsTopicSinkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InsightsTarget: S.optional(SensitiveString) }),
).annotate({
  identifier: "SnsTopicSinkConfiguration",
}) as any as S.Schema<SnsTopicSinkConfiguration>;
export interface VoiceEnhancementSinkConfiguration {
  Disabled?: boolean;
}
export const VoiceEnhancementSinkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Disabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "VoiceEnhancementSinkConfiguration",
}) as any as S.Schema<VoiceEnhancementSinkConfiguration>;
export interface MediaInsightsPipelineConfigurationElement {
  Type: MediaInsightsPipelineConfigurationElementType;
  AmazonTranscribeCallAnalyticsProcessorConfiguration?: AmazonTranscribeCallAnalyticsProcessorConfiguration;
  AmazonTranscribeProcessorConfiguration?: AmazonTranscribeProcessorConfiguration;
  KinesisDataStreamSinkConfiguration?: KinesisDataStreamSinkConfiguration;
  S3RecordingSinkConfiguration?: S3RecordingSinkConfiguration;
  VoiceAnalyticsProcessorConfiguration?: VoiceAnalyticsProcessorConfiguration;
  LambdaFunctionSinkConfiguration?: LambdaFunctionSinkConfiguration;
  SqsQueueSinkConfiguration?: SqsQueueSinkConfiguration;
  SnsTopicSinkConfiguration?: SnsTopicSinkConfiguration;
  VoiceEnhancementSinkConfiguration?: VoiceEnhancementSinkConfiguration;
}
export const MediaInsightsPipelineConfigurationElement =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Type: MediaInsightsPipelineConfigurationElementType,
      AmazonTranscribeCallAnalyticsProcessorConfiguration: S.optional(
        AmazonTranscribeCallAnalyticsProcessorConfiguration,
      ),
      AmazonTranscribeProcessorConfiguration: S.optional(
        AmazonTranscribeProcessorConfiguration,
      ),
      KinesisDataStreamSinkConfiguration: S.optional(
        KinesisDataStreamSinkConfiguration,
      ),
      S3RecordingSinkConfiguration: S.optional(S3RecordingSinkConfiguration),
      VoiceAnalyticsProcessorConfiguration: S.optional(
        VoiceAnalyticsProcessorConfiguration,
      ),
      LambdaFunctionSinkConfiguration: S.optional(
        LambdaFunctionSinkConfiguration,
      ),
      SqsQueueSinkConfiguration: S.optional(SqsQueueSinkConfiguration),
      SnsTopicSinkConfiguration: S.optional(SnsTopicSinkConfiguration),
      VoiceEnhancementSinkConfiguration: S.optional(
        VoiceEnhancementSinkConfiguration,
      ),
    }),
  ).annotate({
    identifier: "MediaInsightsPipelineConfigurationElement",
  }) as any as S.Schema<MediaInsightsPipelineConfigurationElement>;
export type MediaInsightsPipelineConfigurationElements =
  MediaInsightsPipelineConfigurationElement[];
export const MediaInsightsPipelineConfigurationElements = /*@__PURE__*/ S.Array(
  MediaInsightsPipelineConfigurationElement,
);
export interface CreateMediaInsightsPipelineConfigurationRequest {
  MediaInsightsPipelineConfigurationName: string;
  ResourceAccessRoleArn: string | redacted.Redacted<string>;
  RealTimeAlertConfiguration?: RealTimeAlertConfiguration;
  Elements: MediaInsightsPipelineConfigurationElement[];
  Tags?: Tag[];
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export const CreateMediaInsightsPipelineConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MediaInsightsPipelineConfigurationName: S.String,
      ResourceAccessRoleArn: SensitiveString,
      RealTimeAlertConfiguration: S.optional(RealTimeAlertConfiguration),
      Elements: MediaInsightsPipelineConfigurationElements,
      Tags: S.optional(TagList),
      ClientRequestToken: S.optional(SensitiveString).pipe(
        T.IdempotencyToken(),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/media-insights-pipeline-configurations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateMediaInsightsPipelineConfigurationRequest",
  }) as any as S.Schema<CreateMediaInsightsPipelineConfigurationRequest>;
export interface MediaInsightsPipelineConfiguration {
  MediaInsightsPipelineConfigurationName?: string;
  MediaInsightsPipelineConfigurationArn?: string | redacted.Redacted<string>;
  ResourceAccessRoleArn?: string | redacted.Redacted<string>;
  RealTimeAlertConfiguration?: RealTimeAlertConfiguration;
  Elements?: MediaInsightsPipelineConfigurationElement[];
  MediaInsightsPipelineConfigurationId?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const MediaInsightsPipelineConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaInsightsPipelineConfigurationName: S.optional(S.String),
    MediaInsightsPipelineConfigurationArn: S.optional(SensitiveString),
    ResourceAccessRoleArn: S.optional(SensitiveString),
    RealTimeAlertConfiguration: S.optional(RealTimeAlertConfiguration),
    Elements: S.optional(MediaInsightsPipelineConfigurationElements),
    MediaInsightsPipelineConfigurationId: S.optional(S.String),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "MediaInsightsPipelineConfiguration",
}) as any as S.Schema<MediaInsightsPipelineConfiguration>;
export interface CreateMediaInsightsPipelineConfigurationResponse {
  MediaInsightsPipelineConfiguration?: MediaInsightsPipelineConfiguration;
}
export const CreateMediaInsightsPipelineConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MediaInsightsPipelineConfiguration: S.optional(
        MediaInsightsPipelineConfiguration,
      ),
    }),
  ).annotate({
    identifier: "CreateMediaInsightsPipelineConfigurationResponse",
  }) as any as S.Schema<CreateMediaInsightsPipelineConfigurationResponse>;
export type LiveConnectorSourceType = "ChimeSdkMeeting" | (string & {});
export const LiveConnectorSourceType = /*@__PURE__*/ S.String;

export type LiveConnectorMuxType =
  | "AudioWithCompositedVideo"
  | "AudioWithActiveSpeakerVideo"
  | (string & {});
export const LiveConnectorMuxType = /*@__PURE__*/ S.String;

export interface ChimeSdkMeetingLiveConnectorConfiguration {
  Arn: string | redacted.Redacted<string>;
  MuxType: LiveConnectorMuxType;
  CompositedVideo?: CompositedVideoArtifactsConfiguration;
  SourceConfiguration?: SourceConfiguration;
}
export const ChimeSdkMeetingLiveConnectorConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Arn: SensitiveString,
      MuxType: LiveConnectorMuxType,
      CompositedVideo: S.optional(CompositedVideoArtifactsConfiguration),
      SourceConfiguration: S.optional(SourceConfiguration),
    }),
  ).annotate({
    identifier: "ChimeSdkMeetingLiveConnectorConfiguration",
  }) as any as S.Schema<ChimeSdkMeetingLiveConnectorConfiguration>;
export interface LiveConnectorSourceConfiguration {
  SourceType: LiveConnectorSourceType;
  ChimeSdkMeetingLiveConnectorConfiguration: ChimeSdkMeetingLiveConnectorConfiguration;
}
export const LiveConnectorSourceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceType: LiveConnectorSourceType,
    ChimeSdkMeetingLiveConnectorConfiguration:
      ChimeSdkMeetingLiveConnectorConfiguration,
  }),
).annotate({
  identifier: "LiveConnectorSourceConfiguration",
}) as any as S.Schema<LiveConnectorSourceConfiguration>;
export type LiveConnectorSourceList = LiveConnectorSourceConfiguration[];
export const LiveConnectorSourceList = /*@__PURE__*/ S.Array(
  LiveConnectorSourceConfiguration,
);
export type LiveConnectorSinkType = "RTMP" | (string & {});
export const LiveConnectorSinkType = /*@__PURE__*/ S.String;

export type SensitiveString = string | redacted.Redacted<string>;
export type AudioChannelsOption = "Stereo" | "Mono" | (string & {});
export const AudioChannelsOption = /*@__PURE__*/ S.String;

export type AudioSampleRateOption = string;
export interface LiveConnectorRTMPConfiguration {
  Url: string | redacted.Redacted<string>;
  AudioChannels?: AudioChannelsOption;
  AudioSampleRate?: string;
}
export const LiveConnectorRTMPConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Url: SensitiveString,
    AudioChannels: S.optional(AudioChannelsOption),
    AudioSampleRate: S.optional(S.String),
  }),
).annotate({
  identifier: "LiveConnectorRTMPConfiguration",
}) as any as S.Schema<LiveConnectorRTMPConfiguration>;
export interface LiveConnectorSinkConfiguration {
  SinkType: LiveConnectorSinkType;
  RTMPConfiguration: LiveConnectorRTMPConfiguration;
}
export const LiveConnectorSinkConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SinkType: LiveConnectorSinkType,
    RTMPConfiguration: LiveConnectorRTMPConfiguration,
  }),
).annotate({
  identifier: "LiveConnectorSinkConfiguration",
}) as any as S.Schema<LiveConnectorSinkConfiguration>;
export type LiveConnectorSinkList = LiveConnectorSinkConfiguration[];
export const LiveConnectorSinkList = /*@__PURE__*/ S.Array(
  LiveConnectorSinkConfiguration,
);
export interface CreateMediaLiveConnectorPipelineRequest {
  Sources: LiveConnectorSourceConfiguration[];
  Sinks: LiveConnectorSinkConfiguration[];
  ClientRequestToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export const CreateMediaLiveConnectorPipelineRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Sources: LiveConnectorSourceList,
      Sinks: LiveConnectorSinkList,
      ClientRequestToken: S.optional(SensitiveString).pipe(
        T.IdempotencyToken(),
      ),
      Tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({ method: "POST", uri: "/sdk-media-live-connector-pipelines" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateMediaLiveConnectorPipelineRequest",
}) as any as S.Schema<CreateMediaLiveConnectorPipelineRequest>;
export interface MediaLiveConnectorPipeline {
  Sources?: LiveConnectorSourceConfiguration[];
  Sinks?: LiveConnectorSinkConfiguration[];
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
  Status?: MediaPipelineStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const MediaLiveConnectorPipeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sources: S.optional(LiveConnectorSourceList),
    Sinks: S.optional(LiveConnectorSinkList),
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(S.String),
    Status: S.optional(MediaPipelineStatus),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "MediaLiveConnectorPipeline",
}) as any as S.Schema<MediaLiveConnectorPipeline>;
export interface CreateMediaLiveConnectorPipelineResponse {
  MediaLiveConnectorPipeline?: MediaLiveConnectorPipeline;
}
export const CreateMediaLiveConnectorPipelineResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MediaLiveConnectorPipeline: S.optional(MediaLiveConnectorPipeline),
    }),
).annotate({
  identifier: "CreateMediaLiveConnectorPipelineResponse",
}) as any as S.Schema<CreateMediaLiveConnectorPipelineResponse>;
export type AwsRegion = string;
export type DataRetentionInHours = number;
export interface KinesisVideoStreamConfiguration {
  Region: string;
  DataRetentionInHours?: number;
}
export const KinesisVideoStreamConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Region: S.String, DataRetentionInHours: S.optional(S.Number) }),
).annotate({
  identifier: "KinesisVideoStreamConfiguration",
}) as any as S.Schema<KinesisVideoStreamConfiguration>;
export type KinesisVideoStreamPoolName = string;
export interface CreateMediaPipelineKinesisVideoStreamPoolRequest {
  StreamConfiguration: KinesisVideoStreamConfiguration;
  PoolName: string;
  ClientRequestToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export const CreateMediaPipelineKinesisVideoStreamPoolRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StreamConfiguration: KinesisVideoStreamConfiguration,
      PoolName: S.String,
      ClientRequestToken: S.optional(SensitiveString).pipe(
        T.IdempotencyToken(),
      ),
      Tags: S.optional(TagList),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/media-pipeline-kinesis-video-stream-pools",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "CreateMediaPipelineKinesisVideoStreamPoolRequest",
  }) as any as S.Schema<CreateMediaPipelineKinesisVideoStreamPoolRequest>;
export type KinesisVideoStreamPoolId = string;
export type KinesisVideoStreamPoolStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const KinesisVideoStreamPoolStatus = /*@__PURE__*/ S.String;

export type KinesisVideoStreamPoolSize = number;
export interface KinesisVideoStreamPoolConfiguration {
  PoolArn?: string | redacted.Redacted<string>;
  PoolName?: string;
  PoolId?: string;
  PoolStatus?: KinesisVideoStreamPoolStatus;
  PoolSize?: number;
  StreamConfiguration?: KinesisVideoStreamConfiguration;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const KinesisVideoStreamPoolConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolArn: S.optional(SensitiveString),
    PoolName: S.optional(S.String),
    PoolId: S.optional(S.String),
    PoolStatus: S.optional(KinesisVideoStreamPoolStatus),
    PoolSize: S.optional(S.Number),
    StreamConfiguration: S.optional(KinesisVideoStreamConfiguration),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "KinesisVideoStreamPoolConfiguration",
}) as any as S.Schema<KinesisVideoStreamPoolConfiguration>;
export interface CreateMediaPipelineKinesisVideoStreamPoolResponse {
  KinesisVideoStreamPoolConfiguration?: KinesisVideoStreamPoolConfiguration;
}
export const CreateMediaPipelineKinesisVideoStreamPoolResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      KinesisVideoStreamPoolConfiguration: S.optional(
        KinesisVideoStreamPoolConfiguration,
      ),
    }),
  ).annotate({
    identifier: "CreateMediaPipelineKinesisVideoStreamPoolResponse",
  }) as any as S.Schema<CreateMediaPipelineKinesisVideoStreamPoolResponse>;
export interface MediaStreamSource {
  SourceType: MediaPipelineSourceType;
  SourceArn: string | redacted.Redacted<string>;
}
export const MediaStreamSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceType: MediaPipelineSourceType, SourceArn: SensitiveString }),
).annotate({
  identifier: "MediaStreamSource",
}) as any as S.Schema<MediaStreamSource>;
export type MediaStreamSourceList = MediaStreamSource[];
export const MediaStreamSourceList = /*@__PURE__*/ S.Array(MediaStreamSource);
export type MediaStreamPipelineSinkType =
  | "KinesisVideoStreamPool"
  | (string & {});
export const MediaStreamPipelineSinkType = /*@__PURE__*/ S.String;

export type ReservedStreamCapacity = number;
export type MediaStreamType = "MixedAudio" | "IndividualAudio" | (string & {});
export const MediaStreamType = /*@__PURE__*/ S.String;

export interface MediaStreamSink {
  SinkArn: string | redacted.Redacted<string>;
  SinkType: MediaStreamPipelineSinkType;
  ReservedStreamCapacity: number;
  MediaStreamType: MediaStreamType;
}
export const MediaStreamSink = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SinkArn: SensitiveString,
    SinkType: MediaStreamPipelineSinkType,
    ReservedStreamCapacity: S.Number,
    MediaStreamType: MediaStreamType,
  }),
).annotate({
  identifier: "MediaStreamSink",
}) as any as S.Schema<MediaStreamSink>;
export type MediaStreamSinkList = MediaStreamSink[];
export const MediaStreamSinkList = /*@__PURE__*/ S.Array(MediaStreamSink);
export interface CreateMediaStreamPipelineRequest {
  Sources: MediaStreamSource[];
  Sinks: MediaStreamSink[];
  ClientRequestToken?: string | redacted.Redacted<string>;
  Tags?: Tag[];
}
export const CreateMediaStreamPipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sources: MediaStreamSourceList,
    Sinks: MediaStreamSinkList,
    ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/sdk-media-stream-pipelines" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMediaStreamPipelineRequest",
}) as any as S.Schema<CreateMediaStreamPipelineRequest>;
export interface MediaStreamPipeline {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
  Status?: MediaPipelineStatus;
  Sources?: MediaStreamSource[];
  Sinks?: MediaStreamSink[];
}
export const MediaStreamPipeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(S.String),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Status: S.optional(MediaPipelineStatus),
    Sources: S.optional(MediaStreamSourceList),
    Sinks: S.optional(MediaStreamSinkList),
  }),
).annotate({
  identifier: "MediaStreamPipeline",
}) as any as S.Schema<MediaStreamPipeline>;
export interface CreateMediaStreamPipelineResponse {
  MediaStreamPipeline?: MediaStreamPipeline;
}
export const CreateMediaStreamPipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MediaStreamPipeline: S.optional(MediaStreamPipeline) }),
).annotate({
  identifier: "CreateMediaStreamPipelineResponse",
}) as any as S.Schema<CreateMediaStreamPipelineResponse>;
export interface DeleteMediaCapturePipelineRequest {
  MediaPipelineId: string;
}
export const DeleteMediaCapturePipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.String.pipe(T.HttpLabel("MediaPipelineId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/sdk-media-capture-pipelines/{MediaPipelineId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMediaCapturePipelineRequest",
}) as any as S.Schema<DeleteMediaCapturePipelineRequest>;
export interface DeleteMediaCapturePipelineResponse {}
export const DeleteMediaCapturePipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMediaCapturePipelineResponse",
}) as any as S.Schema<DeleteMediaCapturePipelineResponse>;
export interface DeleteMediaInsightsPipelineConfigurationRequest {
  Identifier: string;
}
export const DeleteMediaInsightsPipelineConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/media-insights-pipeline-configurations/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteMediaInsightsPipelineConfigurationRequest",
  }) as any as S.Schema<DeleteMediaInsightsPipelineConfigurationRequest>;
export interface DeleteMediaInsightsPipelineConfigurationResponse {}
export const DeleteMediaInsightsPipelineConfigurationResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteMediaInsightsPipelineConfigurationResponse",
  }) as any as S.Schema<DeleteMediaInsightsPipelineConfigurationResponse>;
export interface DeleteMediaPipelineRequest {
  MediaPipelineId: string;
}
export const DeleteMediaPipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.String.pipe(T.HttpLabel("MediaPipelineId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/sdk-media-pipelines/{MediaPipelineId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMediaPipelineRequest",
}) as any as S.Schema<DeleteMediaPipelineRequest>;
export interface DeleteMediaPipelineResponse {}
export const DeleteMediaPipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteMediaPipelineResponse",
}) as any as S.Schema<DeleteMediaPipelineResponse>;
export interface DeleteMediaPipelineKinesisVideoStreamPoolRequest {
  Identifier: string;
}
export const DeleteMediaPipelineKinesisVideoStreamPoolRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/media-pipeline-kinesis-video-stream-pools/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteMediaPipelineKinesisVideoStreamPoolRequest",
  }) as any as S.Schema<DeleteMediaPipelineKinesisVideoStreamPoolRequest>;
export interface DeleteMediaPipelineKinesisVideoStreamPoolResponse {}
export const DeleteMediaPipelineKinesisVideoStreamPoolResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteMediaPipelineKinesisVideoStreamPoolResponse",
  }) as any as S.Schema<DeleteMediaPipelineKinesisVideoStreamPoolResponse>;
export interface GetMediaCapturePipelineRequest {
  MediaPipelineId: string;
}
export const GetMediaCapturePipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.String.pipe(T.HttpLabel("MediaPipelineId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sdk-media-capture-pipelines/{MediaPipelineId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMediaCapturePipelineRequest",
}) as any as S.Schema<GetMediaCapturePipelineRequest>;
export interface GetMediaCapturePipelineResponse {
  MediaCapturePipeline?: MediaCapturePipeline;
}
export const GetMediaCapturePipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MediaCapturePipeline: S.optional(MediaCapturePipeline) }),
).annotate({
  identifier: "GetMediaCapturePipelineResponse",
}) as any as S.Schema<GetMediaCapturePipelineResponse>;
export interface GetMediaInsightsPipelineConfigurationRequest {
  Identifier: string;
}
export const GetMediaInsightsPipelineConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/media-insights-pipeline-configurations/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetMediaInsightsPipelineConfigurationRequest",
  }) as any as S.Schema<GetMediaInsightsPipelineConfigurationRequest>;
export interface GetMediaInsightsPipelineConfigurationResponse {
  MediaInsightsPipelineConfiguration?: MediaInsightsPipelineConfiguration;
}
export const GetMediaInsightsPipelineConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MediaInsightsPipelineConfiguration: S.optional(
        MediaInsightsPipelineConfiguration,
      ),
    }),
  ).annotate({
    identifier: "GetMediaInsightsPipelineConfigurationResponse",
  }) as any as S.Schema<GetMediaInsightsPipelineConfigurationResponse>;
export interface GetMediaPipelineRequest {
  MediaPipelineId: string;
}
export const GetMediaPipelineRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.String.pipe(T.HttpLabel("MediaPipelineId")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sdk-media-pipelines/{MediaPipelineId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetMediaPipelineRequest",
}) as any as S.Schema<GetMediaPipelineRequest>;
export interface MediaPipeline {
  MediaCapturePipeline?: MediaCapturePipeline;
  MediaLiveConnectorPipeline?: MediaLiveConnectorPipeline;
  MediaConcatenationPipeline?: MediaConcatenationPipeline;
  MediaInsightsPipeline?: MediaInsightsPipeline;
  MediaStreamPipeline?: MediaStreamPipeline;
}
export const MediaPipeline = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaCapturePipeline: S.optional(MediaCapturePipeline),
    MediaLiveConnectorPipeline: S.optional(MediaLiveConnectorPipeline),
    MediaConcatenationPipeline: S.optional(MediaConcatenationPipeline),
    MediaInsightsPipeline: S.optional(MediaInsightsPipeline),
    MediaStreamPipeline: S.optional(MediaStreamPipeline),
  }),
).annotate({ identifier: "MediaPipeline" }) as any as S.Schema<MediaPipeline>;
export interface GetMediaPipelineResponse {
  MediaPipeline?: MediaPipeline;
}
export const GetMediaPipelineResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MediaPipeline: S.optional(MediaPipeline) }),
).annotate({
  identifier: "GetMediaPipelineResponse",
}) as any as S.Schema<GetMediaPipelineResponse>;
export interface GetMediaPipelineKinesisVideoStreamPoolRequest {
  Identifier: string;
}
export const GetMediaPipelineKinesisVideoStreamPoolRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/media-pipeline-kinesis-video-stream-pools/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "GetMediaPipelineKinesisVideoStreamPoolRequest",
  }) as any as S.Schema<GetMediaPipelineKinesisVideoStreamPoolRequest>;
export interface GetMediaPipelineKinesisVideoStreamPoolResponse {
  KinesisVideoStreamPoolConfiguration?: KinesisVideoStreamPoolConfiguration;
}
export const GetMediaPipelineKinesisVideoStreamPoolResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      KinesisVideoStreamPoolConfiguration: S.optional(
        KinesisVideoStreamPoolConfiguration,
      ),
    }),
  ).annotate({
    identifier: "GetMediaPipelineKinesisVideoStreamPoolResponse",
  }) as any as S.Schema<GetMediaPipelineKinesisVideoStreamPoolResponse>;
export interface GetSpeakerSearchTaskRequest {
  Identifier: string;
  SpeakerSearchTaskId: string;
}
export const GetSpeakerSearchTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    SpeakerSearchTaskId: S.String.pipe(T.HttpLabel("SpeakerSearchTaskId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/media-insights-pipelines/{Identifier}/speaker-search-tasks/{SpeakerSearchTaskId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSpeakerSearchTaskRequest",
}) as any as S.Schema<GetSpeakerSearchTaskRequest>;
export type MediaPipelineTaskStatus =
  | "NotStarted"
  | "Initializing"
  | "InProgress"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export const MediaPipelineTaskStatus = /*@__PURE__*/ S.String;

export interface SpeakerSearchTask {
  SpeakerSearchTaskId?: string;
  SpeakerSearchTaskStatus?: MediaPipelineTaskStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const SpeakerSearchTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SpeakerSearchTaskId: S.optional(S.String),
    SpeakerSearchTaskStatus: S.optional(MediaPipelineTaskStatus),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "SpeakerSearchTask",
}) as any as S.Schema<SpeakerSearchTask>;
export interface GetSpeakerSearchTaskResponse {
  SpeakerSearchTask?: SpeakerSearchTask;
}
export const GetSpeakerSearchTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SpeakerSearchTask: S.optional(SpeakerSearchTask) }),
).annotate({
  identifier: "GetSpeakerSearchTaskResponse",
}) as any as S.Schema<GetSpeakerSearchTaskResponse>;
export interface GetVoiceToneAnalysisTaskRequest {
  Identifier: string;
  VoiceToneAnalysisTaskId: string;
}
export const GetVoiceToneAnalysisTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    VoiceToneAnalysisTaskId: S.String.pipe(
      T.HttpLabel("VoiceToneAnalysisTaskId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/media-insights-pipelines/{Identifier}/voice-tone-analysis-tasks/{VoiceToneAnalysisTaskId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetVoiceToneAnalysisTaskRequest",
}) as any as S.Schema<GetVoiceToneAnalysisTaskRequest>;
export interface VoiceToneAnalysisTask {
  VoiceToneAnalysisTaskId?: string;
  VoiceToneAnalysisTaskStatus?: MediaPipelineTaskStatus;
  CreatedTimestamp?: Date;
  UpdatedTimestamp?: Date;
}
export const VoiceToneAnalysisTask = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VoiceToneAnalysisTaskId: S.optional(S.String),
    VoiceToneAnalysisTaskStatus: S.optional(MediaPipelineTaskStatus),
    CreatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    UpdatedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }),
).annotate({
  identifier: "VoiceToneAnalysisTask",
}) as any as S.Schema<VoiceToneAnalysisTask>;
export interface GetVoiceToneAnalysisTaskResponse {
  VoiceToneAnalysisTask?: VoiceToneAnalysisTask;
}
export const GetVoiceToneAnalysisTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VoiceToneAnalysisTask: S.optional(VoiceToneAnalysisTask) }),
).annotate({
  identifier: "GetVoiceToneAnalysisTaskResponse",
}) as any as S.Schema<GetVoiceToneAnalysisTaskResponse>;
export type ResultMax = number;
export interface ListMediaCapturePipelinesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListMediaCapturePipelinesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sdk-media-capture-pipelines" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMediaCapturePipelinesRequest",
}) as any as S.Schema<ListMediaCapturePipelinesRequest>;
export interface MediaCapturePipelineSummary {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
}
export const MediaCapturePipelineSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(S.String),
  }),
).annotate({
  identifier: "MediaCapturePipelineSummary",
}) as any as S.Schema<MediaCapturePipelineSummary>;
export type MediaCapturePipelineSummaryList = MediaCapturePipelineSummary[];
export const MediaCapturePipelineSummaryList = /*@__PURE__*/ S.Array(
  MediaCapturePipelineSummary,
);
export interface ListMediaCapturePipelinesResponse {
  MediaCapturePipelines?: MediaCapturePipelineSummary[];
  NextToken?: string;
}
export const ListMediaCapturePipelinesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaCapturePipelines: S.optional(MediaCapturePipelineSummaryList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMediaCapturePipelinesResponse",
}) as any as S.Schema<ListMediaCapturePipelinesResponse>;
export interface ListMediaInsightsPipelineConfigurationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListMediaInsightsPipelineConfigurationsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/media-insights-pipeline-configurations",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListMediaInsightsPipelineConfigurationsRequest",
  }) as any as S.Schema<ListMediaInsightsPipelineConfigurationsRequest>;
export interface MediaInsightsPipelineConfigurationSummary {
  MediaInsightsPipelineConfigurationName?: string;
  MediaInsightsPipelineConfigurationId?: string;
  MediaInsightsPipelineConfigurationArn?: string | redacted.Redacted<string>;
}
export const MediaInsightsPipelineConfigurationSummary =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MediaInsightsPipelineConfigurationName: S.optional(S.String),
      MediaInsightsPipelineConfigurationId: S.optional(S.String),
      MediaInsightsPipelineConfigurationArn: S.optional(SensitiveString),
    }),
  ).annotate({
    identifier: "MediaInsightsPipelineConfigurationSummary",
  }) as any as S.Schema<MediaInsightsPipelineConfigurationSummary>;
export type MediaInsightsPipelineConfigurationSummaryList =
  MediaInsightsPipelineConfigurationSummary[];
export const MediaInsightsPipelineConfigurationSummaryList =
  /*@__PURE__*/ S.Array(MediaInsightsPipelineConfigurationSummary);
export interface ListMediaInsightsPipelineConfigurationsResponse {
  MediaInsightsPipelineConfigurations?: MediaInsightsPipelineConfigurationSummary[];
  NextToken?: string;
}
export const ListMediaInsightsPipelineConfigurationsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MediaInsightsPipelineConfigurations: S.optional(
        MediaInsightsPipelineConfigurationSummaryList,
      ),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListMediaInsightsPipelineConfigurationsResponse",
  }) as any as S.Schema<ListMediaInsightsPipelineConfigurationsResponse>;
export interface ListMediaPipelineKinesisVideoStreamPoolsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListMediaPipelineKinesisVideoStreamPoolsRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/media-pipeline-kinesis-video-stream-pools",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ListMediaPipelineKinesisVideoStreamPoolsRequest",
  }) as any as S.Schema<ListMediaPipelineKinesisVideoStreamPoolsRequest>;
export interface KinesisVideoStreamPoolSummary {
  PoolName?: string;
  PoolId?: string;
  PoolArn?: string | redacted.Redacted<string>;
}
export const KinesisVideoStreamPoolSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PoolName: S.optional(S.String),
    PoolId: S.optional(S.String),
    PoolArn: S.optional(SensitiveString),
  }),
).annotate({
  identifier: "KinesisVideoStreamPoolSummary",
}) as any as S.Schema<KinesisVideoStreamPoolSummary>;
export type KinesisVideoStreamPoolSummaryList = KinesisVideoStreamPoolSummary[];
export const KinesisVideoStreamPoolSummaryList = /*@__PURE__*/ S.Array(
  KinesisVideoStreamPoolSummary,
);
export interface ListMediaPipelineKinesisVideoStreamPoolsResponse {
  KinesisVideoStreamPools?: KinesisVideoStreamPoolSummary[];
  NextToken?: string;
}
export const ListMediaPipelineKinesisVideoStreamPoolsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      KinesisVideoStreamPools: S.optional(KinesisVideoStreamPoolSummaryList),
      NextToken: S.optional(S.String),
    }),
  ).annotate({
    identifier: "ListMediaPipelineKinesisVideoStreamPoolsResponse",
  }) as any as S.Schema<ListMediaPipelineKinesisVideoStreamPoolsResponse>;
export interface ListMediaPipelinesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export const ListMediaPipelinesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String).pipe(T.HttpQuery("next-token")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("max-results")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sdk-media-pipelines" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMediaPipelinesRequest",
}) as any as S.Schema<ListMediaPipelinesRequest>;
export interface MediaPipelineSummary {
  MediaPipelineId?: string;
  MediaPipelineArn?: string;
}
export const MediaPipelineSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaPipelineId: S.optional(S.String),
    MediaPipelineArn: S.optional(S.String),
  }),
).annotate({
  identifier: "MediaPipelineSummary",
}) as any as S.Schema<MediaPipelineSummary>;
export type MediaPipelineList = MediaPipelineSummary[];
export const MediaPipelineList = /*@__PURE__*/ S.Array(MediaPipelineSummary);
export interface ListMediaPipelinesResponse {
  MediaPipelines?: MediaPipelineSummary[];
  NextToken?: string;
}
export const ListMediaPipelinesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaPipelines: S.optional(MediaPipelineList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListMediaPipelinesResponse",
}) as any as S.Schema<ListMediaPipelinesResponse>;
export interface ListTagsForResourceRequest {
  ResourceARN: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String.pipe(T.HttpQuery("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags" }),
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
  Tags?: Tag[];
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface KinesisVideoStreamSourceTaskConfiguration {
  StreamArn: string;
  ChannelId: number;
  FragmentNumber?: string;
}
export const KinesisVideoStreamSourceTaskConfiguration =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      StreamArn: S.String,
      ChannelId: S.Number,
      FragmentNumber: S.optional(S.String),
    }),
  ).annotate({
    identifier: "KinesisVideoStreamSourceTaskConfiguration",
  }) as any as S.Schema<KinesisVideoStreamSourceTaskConfiguration>;
export interface StartSpeakerSearchTaskRequest {
  Identifier: string;
  VoiceProfileDomainArn: string | redacted.Redacted<string>;
  KinesisVideoStreamSourceTaskConfiguration?: KinesisVideoStreamSourceTaskConfiguration;
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export const StartSpeakerSearchTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    VoiceProfileDomainArn: SensitiveString,
    KinesisVideoStreamSourceTaskConfiguration: S.optional(
      KinesisVideoStreamSourceTaskConfiguration,
    ),
    ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/media-insights-pipelines/{Identifier}/speaker-search-tasks?operation=start",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartSpeakerSearchTaskRequest",
}) as any as S.Schema<StartSpeakerSearchTaskRequest>;
export interface StartSpeakerSearchTaskResponse {
  SpeakerSearchTask?: SpeakerSearchTask;
}
export const StartSpeakerSearchTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SpeakerSearchTask: S.optional(SpeakerSearchTask) }),
).annotate({
  identifier: "StartSpeakerSearchTaskResponse",
}) as any as S.Schema<StartSpeakerSearchTaskResponse>;
export type VoiceAnalyticsLanguageCode = "en-US" | (string & {});
export const VoiceAnalyticsLanguageCode = /*@__PURE__*/ S.String;

export interface StartVoiceToneAnalysisTaskRequest {
  Identifier: string;
  LanguageCode: VoiceAnalyticsLanguageCode;
  KinesisVideoStreamSourceTaskConfiguration?: KinesisVideoStreamSourceTaskConfiguration;
  ClientRequestToken?: string | redacted.Redacted<string>;
}
export const StartVoiceToneAnalysisTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    LanguageCode: VoiceAnalyticsLanguageCode,
    KinesisVideoStreamSourceTaskConfiguration: S.optional(
      KinesisVideoStreamSourceTaskConfiguration,
    ),
    ClientRequestToken: S.optional(SensitiveString).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/media-insights-pipelines/{Identifier}/voice-tone-analysis-tasks?operation=start",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartVoiceToneAnalysisTaskRequest",
}) as any as S.Schema<StartVoiceToneAnalysisTaskRequest>;
export interface StartVoiceToneAnalysisTaskResponse {
  VoiceToneAnalysisTask?: VoiceToneAnalysisTask;
}
export const StartVoiceToneAnalysisTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ VoiceToneAnalysisTask: S.optional(VoiceToneAnalysisTask) }),
).annotate({
  identifier: "StartVoiceToneAnalysisTaskResponse",
}) as any as S.Schema<StartVoiceToneAnalysisTaskResponse>;
export interface StopSpeakerSearchTaskRequest {
  Identifier: string;
  SpeakerSearchTaskId: string;
}
export const StopSpeakerSearchTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    SpeakerSearchTaskId: S.String.pipe(T.HttpLabel("SpeakerSearchTaskId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/media-insights-pipelines/{Identifier}/speaker-search-tasks/{SpeakerSearchTaskId}?operation=stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopSpeakerSearchTaskRequest",
}) as any as S.Schema<StopSpeakerSearchTaskRequest>;
export interface StopSpeakerSearchTaskResponse {}
export const StopSpeakerSearchTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopSpeakerSearchTaskResponse",
}) as any as S.Schema<StopSpeakerSearchTaskResponse>;
export interface StopVoiceToneAnalysisTaskRequest {
  Identifier: string;
  VoiceToneAnalysisTaskId: string;
}
export const StopVoiceToneAnalysisTaskRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    VoiceToneAnalysisTaskId: S.String.pipe(
      T.HttpLabel("VoiceToneAnalysisTaskId"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/media-insights-pipelines/{Identifier}/voice-tone-analysis-tasks/{VoiceToneAnalysisTaskId}?operation=stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopVoiceToneAnalysisTaskRequest",
}) as any as S.Schema<StopVoiceToneAnalysisTaskRequest>;
export interface StopVoiceToneAnalysisTaskResponse {}
export const StopVoiceToneAnalysisTaskResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopVoiceToneAnalysisTaskResponse",
}) as any as S.Schema<StopVoiceToneAnalysisTaskResponse>;
export interface TagResourceRequest {
  ResourceARN: string;
  Tags: Tag[];
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, Tags: TagList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags?operation=tag-resource" }),
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
  ResourceARN: string;
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceARN: S.String, TagKeys: TagKeyList }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags?operation=untag-resource" }),
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
export interface UpdateMediaInsightsPipelineConfigurationRequest {
  Identifier: string;
  ResourceAccessRoleArn: string | redacted.Redacted<string>;
  RealTimeAlertConfiguration?: RealTimeAlertConfiguration;
  Elements: MediaInsightsPipelineConfigurationElement[];
}
export const UpdateMediaInsightsPipelineConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Identifier: S.String.pipe(T.HttpLabel("Identifier")),
      ResourceAccessRoleArn: SensitiveString,
      RealTimeAlertConfiguration: S.optional(RealTimeAlertConfiguration),
      Elements: MediaInsightsPipelineConfigurationElements,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/media-insights-pipeline-configurations/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateMediaInsightsPipelineConfigurationRequest",
  }) as any as S.Schema<UpdateMediaInsightsPipelineConfigurationRequest>;
export interface UpdateMediaInsightsPipelineConfigurationResponse {
  MediaInsightsPipelineConfiguration?: MediaInsightsPipelineConfiguration;
}
export const UpdateMediaInsightsPipelineConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MediaInsightsPipelineConfiguration: S.optional(
        MediaInsightsPipelineConfiguration,
      ),
    }),
  ).annotate({
    identifier: "UpdateMediaInsightsPipelineConfigurationResponse",
  }) as any as S.Schema<UpdateMediaInsightsPipelineConfigurationResponse>;
export type MediaPipelineStatusUpdate = "Pause" | "Resume" | (string & {});
export const MediaPipelineStatusUpdate = /*@__PURE__*/ S.String;

export interface UpdateMediaInsightsPipelineStatusRequest {
  Identifier: string;
  UpdateStatus: MediaPipelineStatusUpdate;
}
export const UpdateMediaInsightsPipelineStatusRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Identifier: S.String.pipe(T.HttpLabel("Identifier")),
      UpdateStatus: MediaPipelineStatusUpdate,
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/media-insights-pipeline-status/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateMediaInsightsPipelineStatusRequest",
}) as any as S.Schema<UpdateMediaInsightsPipelineStatusRequest>;
export interface UpdateMediaInsightsPipelineStatusResponse {}
export const UpdateMediaInsightsPipelineStatusResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "UpdateMediaInsightsPipelineStatusResponse",
  }) as any as S.Schema<UpdateMediaInsightsPipelineStatusResponse>;
export type DataRetentionChangeInHours = number;
export interface KinesisVideoStreamConfigurationUpdate {
  DataRetentionInHours?: number;
}
export const KinesisVideoStreamConfigurationUpdate = /*@__PURE__*/ S.suspend(
  () => S.Struct({ DataRetentionInHours: S.optional(S.Number) }),
).annotate({
  identifier: "KinesisVideoStreamConfigurationUpdate",
}) as any as S.Schema<KinesisVideoStreamConfigurationUpdate>;
export interface UpdateMediaPipelineKinesisVideoStreamPoolRequest {
  Identifier: string;
  StreamConfiguration?: KinesisVideoStreamConfigurationUpdate;
}
export const UpdateMediaPipelineKinesisVideoStreamPoolRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Identifier: S.String.pipe(T.HttpLabel("Identifier")),
      StreamConfiguration: S.optional(KinesisVideoStreamConfigurationUpdate),
    }).pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/media-pipeline-kinesis-video-stream-pools/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "UpdateMediaPipelineKinesisVideoStreamPoolRequest",
  }) as any as S.Schema<UpdateMediaPipelineKinesisVideoStreamPoolRequest>;
export interface UpdateMediaPipelineKinesisVideoStreamPoolResponse {
  KinesisVideoStreamPoolConfiguration?: KinesisVideoStreamPoolConfiguration;
}
export const UpdateMediaPipelineKinesisVideoStreamPoolResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      KinesisVideoStreamPoolConfiguration: S.optional(
        KinesisVideoStreamPoolConfiguration,
      ),
    }),
  ).annotate({
    identifier: "UpdateMediaPipelineKinesisVideoStreamPoolResponse",
  }) as any as S.Schema<UpdateMediaPipelineKinesisVideoStreamPoolResponse>;
export type ErrorCode =
  | "BadRequest"
  | "Forbidden"
  | "NotFound"
  | "ResourceLimitExceeded"
  | "ServiceFailure"
  | "ServiceUnavailable"
  | "Throttling"
  | (string & {});
export const ErrorCode = /*@__PURE__*/ S.String;

export type CreateMediaCapturePipelineError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a media pipeline.
 */
export const createMediaCapturePipeline: API.OperationMethod<
  CreateMediaCapturePipelineRequest,
  CreateMediaCapturePipelineResponse,
  CreateMediaCapturePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMediaCapturePipelineRequest,
  output: CreateMediaCapturePipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaCapturePipeline",
}));

export type CreateMediaConcatenationPipelineError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a media concatenation pipeline.
 */
export const createMediaConcatenationPipeline: API.OperationMethod<
  CreateMediaConcatenationPipelineRequest,
  CreateMediaConcatenationPipelineResponse,
  CreateMediaConcatenationPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMediaConcatenationPipelineRequest,
  output: CreateMediaConcatenationPipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaConcatenationPipeline",
}));

export type CreateMediaInsightsPipelineError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a media insights pipeline.
 */
export const createMediaInsightsPipeline: API.OperationMethod<
  CreateMediaInsightsPipelineRequest,
  CreateMediaInsightsPipelineResponse,
  CreateMediaInsightsPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMediaInsightsPipelineRequest,
  output: CreateMediaInsightsPipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaInsightsPipeline",
}));

export type CreateMediaInsightsPipelineConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * A structure that contains the static configurations for a media insights
 * pipeline.
 */
export const createMediaInsightsPipelineConfiguration: API.OperationMethod<
  CreateMediaInsightsPipelineConfigurationRequest,
  CreateMediaInsightsPipelineConfigurationResponse,
  CreateMediaInsightsPipelineConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMediaInsightsPipelineConfigurationRequest,
  output: CreateMediaInsightsPipelineConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaInsightsPipelineConfiguration",
}));

export type CreateMediaLiveConnectorPipelineError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a media live connector pipeline in an Amazon Chime SDK meeting.
 */
export const createMediaLiveConnectorPipeline: API.OperationMethod<
  CreateMediaLiveConnectorPipelineRequest,
  CreateMediaLiveConnectorPipelineResponse,
  CreateMediaLiveConnectorPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMediaLiveConnectorPipelineRequest,
  output: CreateMediaLiveConnectorPipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaLiveConnectorPipeline",
}));

export type CreateMediaPipelineKinesisVideoStreamPoolError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates an Amazon Kinesis Video Stream pool for use with media stream
 * pipelines.
 *
 * If a meeting uses an opt-in Region as its
 * MediaRegion,
 * the KVS stream must be in that same Region. For example, if a meeting uses the `af-south-1` Region, the KVS stream must also be in `af-south-1`. However, if the meeting uses a
 * Region that AWS turns on by default, the KVS stream can be in any available Region, including an opt-in Region. For example, if the meeting uses `ca-central-1`, the KVS stream can be in
 * `eu-west-2`, `us-east-1`, `af-south-1`, or any other Region that the Amazon Chime SDK supports.
 *
 * To learn which AWS Region a meeting uses, call the GetMeeting API and
 * use the MediaRegion
 * parameter from the response.
 *
 * For more information about opt-in Regions, refer to Available Regions in the
 * *Amazon Chime SDK Developer Guide*, and
 * Specify which AWS Regions your account can use,
 * in the *AWS Account Management Reference Guide*.
 */
export const createMediaPipelineKinesisVideoStreamPool: API.OperationMethod<
  CreateMediaPipelineKinesisVideoStreamPoolRequest,
  CreateMediaPipelineKinesisVideoStreamPoolResponse,
  CreateMediaPipelineKinesisVideoStreamPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMediaPipelineKinesisVideoStreamPoolRequest,
  output: CreateMediaPipelineKinesisVideoStreamPoolResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaPipelineKinesisVideoStreamPool",
}));

export type CreateMediaStreamPipelineError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Creates a streaming media pipeline.
 */
export const createMediaStreamPipeline: API.OperationMethod<
  CreateMediaStreamPipelineRequest,
  CreateMediaStreamPipelineResponse,
  CreateMediaStreamPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMediaStreamPipelineRequest,
  output: CreateMediaStreamPipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMediaStreamPipeline",
}));

export type DeleteMediaCapturePipelineError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the media pipeline.
 */
export const deleteMediaCapturePipeline: API.OperationMethod<
  DeleteMediaCapturePipelineRequest,
  DeleteMediaCapturePipelineResponse,
  DeleteMediaCapturePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMediaCapturePipelineRequest,
  output: DeleteMediaCapturePipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMediaCapturePipeline",
}));

export type DeleteMediaInsightsPipelineConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the specified configuration settings.
 */
export const deleteMediaInsightsPipelineConfiguration: API.OperationMethod<
  DeleteMediaInsightsPipelineConfigurationRequest,
  DeleteMediaInsightsPipelineConfigurationResponse,
  DeleteMediaInsightsPipelineConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMediaInsightsPipelineConfigurationRequest,
  output: DeleteMediaInsightsPipelineConfigurationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMediaInsightsPipelineConfiguration",
}));

export type DeleteMediaPipelineError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes the media pipeline.
 */
export const deleteMediaPipeline: API.OperationMethod<
  DeleteMediaPipelineRequest,
  DeleteMediaPipelineResponse,
  DeleteMediaPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMediaPipelineRequest,
  output: DeleteMediaPipelineResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMediaPipeline",
}));

export type DeleteMediaPipelineKinesisVideoStreamPoolError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Deletes an Amazon Kinesis Video Stream pool.
 */
export const deleteMediaPipelineKinesisVideoStreamPool: API.OperationMethod<
  DeleteMediaPipelineKinesisVideoStreamPoolRequest,
  DeleteMediaPipelineKinesisVideoStreamPoolResponse,
  DeleteMediaPipelineKinesisVideoStreamPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMediaPipelineKinesisVideoStreamPoolRequest,
  output: DeleteMediaPipelineKinesisVideoStreamPoolResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMediaPipelineKinesisVideoStreamPool",
}));

export type GetMediaCapturePipelineError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets an existing media pipeline.
 */
export const getMediaCapturePipeline: API.OperationMethod<
  GetMediaCapturePipelineRequest,
  GetMediaCapturePipelineResponse,
  GetMediaCapturePipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMediaCapturePipelineRequest,
  output: GetMediaCapturePipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMediaCapturePipeline",
}));

export type GetMediaInsightsPipelineConfigurationError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets the configuration settings for a media insights pipeline.
 */
export const getMediaInsightsPipelineConfiguration: API.OperationMethod<
  GetMediaInsightsPipelineConfigurationRequest,
  GetMediaInsightsPipelineConfigurationResponse,
  GetMediaInsightsPipelineConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMediaInsightsPipelineConfigurationRequest,
  output: GetMediaInsightsPipelineConfigurationResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMediaInsightsPipelineConfiguration",
}));

export type GetMediaPipelineError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets an existing media pipeline.
 */
export const getMediaPipeline: API.OperationMethod<
  GetMediaPipelineRequest,
  GetMediaPipelineResponse,
  GetMediaPipelineError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMediaPipelineRequest,
  output: GetMediaPipelineResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMediaPipeline",
}));

export type GetMediaPipelineKinesisVideoStreamPoolError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Gets an Kinesis video stream pool.
 */
export const getMediaPipelineKinesisVideoStreamPool: API.OperationMethod<
  GetMediaPipelineKinesisVideoStreamPoolRequest,
  GetMediaPipelineKinesisVideoStreamPoolResponse,
  GetMediaPipelineKinesisVideoStreamPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetMediaPipelineKinesisVideoStreamPoolRequest,
  output: GetMediaPipelineKinesisVideoStreamPoolResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMediaPipelineKinesisVideoStreamPool",
}));

export type GetSpeakerSearchTaskError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the details of the specified speaker search task.
 */
export const getSpeakerSearchTask: API.OperationMethod<
  GetSpeakerSearchTaskRequest,
  GetSpeakerSearchTaskResponse,
  GetSpeakerSearchTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSpeakerSearchTaskRequest,
  output: GetSpeakerSearchTaskResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpeakerSearchTask",
}));

export type GetVoiceToneAnalysisTaskError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Retrieves the details of a voice tone analysis task.
 */
export const getVoiceToneAnalysisTask: API.OperationMethod<
  GetVoiceToneAnalysisTaskRequest,
  GetVoiceToneAnalysisTaskResponse,
  GetVoiceToneAnalysisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetVoiceToneAnalysisTaskRequest,
  output: GetVoiceToneAnalysisTaskResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVoiceToneAnalysisTask",
}));

export type ListMediaCapturePipelinesError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns a list of media pipelines.
 */
export const listMediaCapturePipelines: API.PaginatedOperationMethod<
  ListMediaCapturePipelinesRequest,
  ListMediaCapturePipelinesResponse,
  ListMediaCapturePipelinesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMediaCapturePipelinesRequest,
  output: ListMediaCapturePipelinesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMediaCapturePipelines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMediaInsightsPipelineConfigurationsError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the available media insights pipeline configurations.
 */
export const listMediaInsightsPipelineConfigurations: API.PaginatedOperationMethod<
  ListMediaInsightsPipelineConfigurationsRequest,
  ListMediaInsightsPipelineConfigurationsResponse,
  ListMediaInsightsPipelineConfigurationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMediaInsightsPipelineConfigurationsRequest,
  output: ListMediaInsightsPipelineConfigurationsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMediaInsightsPipelineConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMediaPipelineKinesisVideoStreamPoolsError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the video stream pools in the media pipeline.
 */
export const listMediaPipelineKinesisVideoStreamPools: API.PaginatedOperationMethod<
  ListMediaPipelineKinesisVideoStreamPoolsRequest,
  ListMediaPipelineKinesisVideoStreamPoolsResponse,
  ListMediaPipelineKinesisVideoStreamPoolsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMediaPipelineKinesisVideoStreamPoolsRequest,
  output: ListMediaPipelineKinesisVideoStreamPoolsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMediaPipelineKinesisVideoStreamPools",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMediaPipelinesError =
  | BadRequestException
  | ForbiddenException
  | ResourceLimitExceededException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Returns a list of media pipelines.
 */
export const listMediaPipelines: API.PaginatedOperationMethod<
  ListMediaPipelinesRequest,
  ListMediaPipelinesResponse,
  ListMediaPipelinesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMediaPipelinesRequest,
  output: ListMediaPipelinesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    ResourceLimitExceededException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMediaPipelines",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Lists the tags available for a media pipeline.
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
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type StartSpeakerSearchTaskError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Starts a speaker search task.
 *
 * Before starting any speaker search tasks, you must provide all notices and obtain all consents from the speaker as required under applicable privacy and biometrics laws, and as required under the
 * AWS service terms for the Amazon Chime SDK.
 */
export const startSpeakerSearchTask: API.OperationMethod<
  StartSpeakerSearchTaskRequest,
  StartSpeakerSearchTaskResponse,
  StartSpeakerSearchTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartSpeakerSearchTaskRequest,
  output: StartSpeakerSearchTaskResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartSpeakerSearchTask",
}));

export type StartVoiceToneAnalysisTaskError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Starts a voice tone analysis task. For more information about voice tone analysis, see
 * Using Amazon Chime SDK voice analytics
 * in the *Amazon Chime SDK Developer Guide*.
 *
 * Before starting any voice tone analysis tasks, you must provide all notices and obtain all consents from the speaker as required under applicable privacy and biometrics laws, and as required under the
 * AWS service terms for the Amazon Chime SDK.
 */
export const startVoiceToneAnalysisTask: API.OperationMethod<
  StartVoiceToneAnalysisTaskRequest,
  StartVoiceToneAnalysisTaskResponse,
  StartVoiceToneAnalysisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartVoiceToneAnalysisTaskRequest,
  output: StartVoiceToneAnalysisTaskResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartVoiceToneAnalysisTask",
}));

export type StopSpeakerSearchTaskError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Stops a speaker search task.
 */
export const stopSpeakerSearchTask: API.OperationMethod<
  StopSpeakerSearchTaskRequest,
  StopSpeakerSearchTaskResponse,
  StopSpeakerSearchTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopSpeakerSearchTaskRequest,
  output: StopSpeakerSearchTaskResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopSpeakerSearchTask",
}));

export type StopVoiceToneAnalysisTaskError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Stops a voice tone analysis task.
 */
export const stopVoiceToneAnalysisTask: API.OperationMethod<
  StopVoiceToneAnalysisTaskRequest,
  StopVoiceToneAnalysisTaskResponse,
  StopVoiceToneAnalysisTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopVoiceToneAnalysisTaskRequest,
  output: StopVoiceToneAnalysisTaskResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopVoiceToneAnalysisTask",
}));

export type TagResourceError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * The ARN of the media pipeline that you want to tag. Consists of the pipeline's endpoint region, resource ID, and pipeline ID.
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
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Removes any tags from a media pipeline.
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
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateMediaInsightsPipelineConfigurationError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the media insights pipeline's configuration settings.
 */
export const updateMediaInsightsPipelineConfiguration: API.OperationMethod<
  UpdateMediaInsightsPipelineConfigurationRequest,
  UpdateMediaInsightsPipelineConfigurationResponse,
  UpdateMediaInsightsPipelineConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMediaInsightsPipelineConfigurationRequest,
  output: UpdateMediaInsightsPipelineConfigurationResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMediaInsightsPipelineConfiguration",
}));

export type UpdateMediaInsightsPipelineStatusError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates the status of a media insights pipeline.
 */
export const updateMediaInsightsPipelineStatus: API.OperationMethod<
  UpdateMediaInsightsPipelineStatusRequest,
  UpdateMediaInsightsPipelineStatusResponse,
  UpdateMediaInsightsPipelineStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMediaInsightsPipelineStatusRequest,
  output: UpdateMediaInsightsPipelineStatusResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMediaInsightsPipelineStatus",
}));

export type UpdateMediaPipelineKinesisVideoStreamPoolError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | NotFoundException
  | ServiceFailureException
  | ServiceUnavailableException
  | ThrottledClientException
  | UnauthorizedClientException
  | CommonErrors;
/**
 * Updates an Amazon Kinesis Video Stream pool in a media pipeline.
 */
export const updateMediaPipelineKinesisVideoStreamPool: API.OperationMethod<
  UpdateMediaPipelineKinesisVideoStreamPoolRequest,
  UpdateMediaPipelineKinesisVideoStreamPoolResponse,
  UpdateMediaPipelineKinesisVideoStreamPoolError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMediaPipelineKinesisVideoStreamPoolRequest,
  output: UpdateMediaPipelineKinesisVideoStreamPoolResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    NotFoundException,
    ServiceFailureException,
    ServiceUnavailableException,
    ThrottledClientException,
    UnauthorizedClientException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMediaPipelineKinesisVideoStreamPool",
}));
