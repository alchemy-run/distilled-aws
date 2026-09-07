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
  sdkId: "MediaTailor",
  serviceShapeName: "MediaTailor",
});
const auth = T.AwsAuthSigv4({ name: "mediatailor" });
const ver = T.ServiceVersion("2018-04-23");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
  const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
        if (
          _.getAttr(PartitionResult, "name") === "aws" &&
          UseFIPS === false &&
          UseDualStack === true
        ) {
          return e(
            `https://mediatailor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://api.mediatailor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://api.mediatailor-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://api.mediatailor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://api.mediatailor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ChannelNotFound
  extends /*@__PURE__*/ S.TaggedError<ChannelNotFound>()(
    "ChannelNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({ from: "NotFoundException", message: { matches: ".*" } }),
  ).pipe(C.withNotFoundError) {}
export class PlaybackConfigurationNotFound
  extends /*@__PURE__*/ S.TaggedError<PlaybackConfigurationNotFound>()(
    "PlaybackConfigurationNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({
      from: "NotFoundException",
      message: { includes: "not found" },
    }),
  ).pipe(C.withNotFoundError) {}
export class PrefetchScheduleNotFound
  extends /*@__PURE__*/ S.TaggedError<PrefetchScheduleNotFound>()(
    "PrefetchScheduleNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({ from: "NotFoundException", message: { matches: ".*" } }),
  ).pipe(C.withNotFoundError) {}
export class ProgramNotFound
  extends /*@__PURE__*/ S.TaggedError<ProgramNotFound>()(
    "ProgramNotFound",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.SyntheticError({ from: "NotFoundException", message: { matches: ".*" } }),
  ).pipe(C.withNotFoundError) {}
export type LogType = "AS_RUN" | (string & {});
export const LogType = /*@__PURE__*/ S.String;

export type LogTypes = LogType[];
export const LogTypes = /*@__PURE__*/ S.Array(LogType);
export interface ConfigureLogsForChannelRequest {
  ChannelName: string;
  LogTypes: LogType[];
}
export const ConfigureLogsForChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelName: S.String, LogTypes: LogTypes }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/configureLogs/channel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ConfigureLogsForChannelRequest",
}) as any as S.Schema<ConfigureLogsForChannelRequest>;
export interface ConfigureLogsForChannelResponse {
  ChannelName?: string;
  LogTypes?: LogType[];
}
export const ConfigureLogsForChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelName: S.optional(S.String),
    LogTypes: S.optional(LogTypes),
  }),
).annotate({
  identifier: "ConfigureLogsForChannelResponse",
}) as any as S.Schema<ConfigureLogsForChannelResponse>;
export type LoggingStrategy =
  | "VENDED_LOGS"
  | "LEGACY_CLOUDWATCH"
  | (string & {});
export const LoggingStrategy = /*@__PURE__*/ S.String;

export type __listOfLoggingStrategies = LoggingStrategy[];
export const __listOfLoggingStrategies = /*@__PURE__*/ S.Array(LoggingStrategy);
export type AdsInteractionPublishOptInEventType =
  | "RAW_ADS_RESPONSE"
  | "RAW_ADS_REQUEST"
  | "PRE_ADS_REQUEST_HOOK_SUMMARY"
  | "PRE_ADS_REQUEST_FUNCTION_COMPLETED"
  | (string & {});
export const AdsInteractionPublishOptInEventType = /*@__PURE__*/ S.String;

export type __adsInteractionPublishOptInEventTypesList =
  AdsInteractionPublishOptInEventType[];
export const __adsInteractionPublishOptInEventTypesList = /*@__PURE__*/ S.Array(
  AdsInteractionPublishOptInEventType,
);
export type AdsInteractionExcludeEventType =
  | "AD_MARKER_FOUND"
  | "NON_AD_MARKER_FOUND"
  | "MAKING_ADS_REQUEST"
  | "MODIFIED_TARGET_URL"
  | "VAST_REDIRECT"
  | "EMPTY_VAST_RESPONSE"
  | "EMPTY_VMAP_RESPONSE"
  | "VAST_RESPONSE"
  | "REDIRECTED_VAST_RESPONSE"
  | "FILLED_AVAIL"
  | "FILLED_OVERLAY_AVAIL"
  | "BEACON_FIRED"
  | "WARNING_NO_ADVERTISEMENTS"
  | "WARNING_VPAID_AD_DROPPED"
  | "WARNING_URL_VARIABLE_SUBSTITUTION_FAILED"
  | "ERROR_UNKNOWN"
  | "ERROR_UNKNOWN_HOST"
  | "ERROR_DISALLOWED_HOST"
  | "ERROR_ADS_IO"
  | "ERROR_ADS_TIMEOUT"
  | "ERROR_ADS_RESPONSE_PARSE"
  | "ERROR_ADS_RESPONSE_UNKNOWN_ROOT_ELEMENT"
  | "ERROR_ADS_INVALID_RESPONSE"
  | "ERROR_VAST_REDIRECT_EMPTY_RESPONSE"
  | "ERROR_VAST_REDIRECT_MULTIPLE_VAST"
  | "ERROR_VAST_REDIRECT_FAILED"
  | "ERROR_VAST_MISSING_MEDIAFILES"
  | "ERROR_VAST_MISSING_CREATIVES"
  | "ERROR_VAST_MISSING_OVERLAYS"
  | "ERROR_VAST_MISSING_IMPRESSION"
  | "ERROR_VAST_INVALID_VAST_AD_TAG_URI"
  | "ERROR_VAST_MULTIPLE_TRACKING_EVENTS"
  | "ERROR_VAST_MULTIPLE_LINEAR"
  | "ERROR_VAST_INVALID_MEDIA_FILE"
  | "ERROR_FIRING_BEACON_FAILED"
  | "ERROR_PERSONALIZATION_DISABLED"
  | "VOD_TIME_BASED_AVAIL_PLAN_VAST_RESPONSE_FOR_OFFSET"
  | "VOD_TIME_BASED_AVAIL_PLAN_SUCCESS"
  | "VOD_TIME_BASED_AVAIL_PLAN_WARNING_NO_ADVERTISEMENTS"
  | "INTERSTITIAL_VOD_SUCCESS"
  | "INTERSTITIAL_VOD_FAILURE"
  | "PRE_ADS_REQUEST_HOOK_ERROR"
  | "PRE_ADS_REQUEST_FUNCTION_ERROR"
  | (string & {});
export const AdsInteractionExcludeEventType = /*@__PURE__*/ S.String;

export type __adsInteractionExcludeEventTypesList =
  AdsInteractionExcludeEventType[];
export const __adsInteractionExcludeEventTypesList = /*@__PURE__*/ S.Array(
  AdsInteractionExcludeEventType,
);
export interface AdsInteractionLog {
  PublishOptInEventTypes?: AdsInteractionPublishOptInEventType[];
  ExcludeEventTypes?: AdsInteractionExcludeEventType[];
}
export const AdsInteractionLog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PublishOptInEventTypes: S.optional(
      __adsInteractionPublishOptInEventTypesList,
    ),
    ExcludeEventTypes: S.optional(__adsInteractionExcludeEventTypesList),
  }),
).annotate({
  identifier: "AdsInteractionLog",
}) as any as S.Schema<AdsInteractionLog>;
export type ManifestServicePublishOptInEventType =
  | "PRE_SESSION_INIT_HOOK_SUMMARY"
  | "PRE_SESSION_INIT_FUNCTION_COMPLETED"
  | (string & {});
export const ManifestServicePublishOptInEventType = /*@__PURE__*/ S.String;

export type __manifestServicePublishOptInEventTypesList =
  ManifestServicePublishOptInEventType[];
export const __manifestServicePublishOptInEventTypesList =
  /*@__PURE__*/ S.Array(ManifestServicePublishOptInEventType);
export type ManifestServiceExcludeEventType =
  | "GENERATED_MANIFEST"
  | "ORIGIN_MANIFEST"
  | "SESSION_INITIALIZED"
  | "TRACKING_RESPONSE"
  | "CONFIG_SYNTAX_ERROR"
  | "CONFIG_SECURITY_ERROR"
  | "UNKNOWN_HOST"
  | "TIMEOUT_ERROR"
  | "CONNECTION_ERROR"
  | "IO_ERROR"
  | "UNKNOWN_ERROR"
  | "HOST_DISALLOWED"
  | "PARSING_ERROR"
  | "MANIFEST_ERROR"
  | "NO_MASTER_OR_MEDIA_PLAYLIST"
  | "NO_MASTER_PLAYLIST"
  | "NO_MEDIA_PLAYLIST"
  | "INCOMPATIBLE_HLS_VERSION"
  | "SCTE35_PARSING_ERROR"
  | "INVALID_SINGLE_PERIOD_DASH_MANIFEST"
  | "UNSUPPORTED_SINGLE_PERIOD_DASH_MANIFEST"
  | "LAST_PERIOD_MISSING_AUDIO"
  | "LAST_PERIOD_MISSING_AUDIO_WARNING"
  | "ERROR_ORIGIN_PREFIX_INTERPOLATION"
  | "ERROR_ADS_INTERPOLATION"
  | "ERROR_LIVE_PRE_ROLL_ADS_INTERPOLATION"
  | "ERROR_CDN_AD_SEGMENT_INTERPOLATION"
  | "ERROR_CDN_CONTENT_SEGMENT_INTERPOLATION"
  | "ERROR_SLATE_AD_URL_INTERPOLATION"
  | "ERROR_PROFILE_NAME_INTERPOLATION"
  | "ERROR_BUMPER_START_INTERPOLATION"
  | "ERROR_BUMPER_END_INTERPOLATION"
  | "PRE_SESSION_INIT_HOOK_ERROR"
  | "PRE_SESSION_INIT_FUNCTION_ERROR"
  | (string & {});
export const ManifestServiceExcludeEventType = /*@__PURE__*/ S.String;

export type __manifestServiceExcludeEventTypesList =
  ManifestServiceExcludeEventType[];
export const __manifestServiceExcludeEventTypesList = /*@__PURE__*/ S.Array(
  ManifestServiceExcludeEventType,
);
export interface ManifestServiceInteractionLog {
  PublishOptInEventTypes?: ManifestServicePublishOptInEventType[];
  ExcludeEventTypes?: ManifestServiceExcludeEventType[];
}
export const ManifestServiceInteractionLog = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PublishOptInEventTypes: S.optional(
      __manifestServicePublishOptInEventTypesList,
    ),
    ExcludeEventTypes: S.optional(__manifestServiceExcludeEventTypesList),
  }),
).annotate({
  identifier: "ManifestServiceInteractionLog",
}) as any as S.Schema<ManifestServiceInteractionLog>;
export interface ConfigureLogsForPlaybackConfigurationRequest {
  PercentEnabled: number;
  PlaybackConfigurationName: string;
  EnabledLoggingStrategies?: LoggingStrategy[];
  AdsInteractionLog?: AdsInteractionLog;
  ManifestServiceInteractionLog?: ManifestServiceInteractionLog;
}
export const ConfigureLogsForPlaybackConfigurationRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PercentEnabled: S.Number,
      PlaybackConfigurationName: S.String,
      EnabledLoggingStrategies: S.optional(__listOfLoggingStrategies),
      AdsInteractionLog: S.optional(AdsInteractionLog),
      ManifestServiceInteractionLog: S.optional(ManifestServiceInteractionLog),
    }).pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/configureLogs/playbackConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "ConfigureLogsForPlaybackConfigurationRequest",
  }) as any as S.Schema<ConfigureLogsForPlaybackConfigurationRequest>;
export interface ConfigureLogsForPlaybackConfigurationResponse {
  PercentEnabled: number;
  PlaybackConfigurationName?: string;
  EnabledLoggingStrategies?: LoggingStrategy[];
  AdsInteractionLog?: AdsInteractionLog;
  ManifestServiceInteractionLog?: ManifestServiceInteractionLog;
}
export const ConfigureLogsForPlaybackConfigurationResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      PercentEnabled: S.Number,
      PlaybackConfigurationName: S.optional(S.String),
      EnabledLoggingStrategies: S.optional(__listOfLoggingStrategies),
      AdsInteractionLog: S.optional(AdsInteractionLog),
      ManifestServiceInteractionLog: S.optional(ManifestServiceInteractionLog),
    }),
  ).annotate({
    identifier: "ConfigureLogsForPlaybackConfigurationResponse",
  }) as any as S.Schema<ConfigureLogsForPlaybackConfigurationResponse>;
export interface SlateSource {
  SourceLocationName?: string;
  VodSourceName?: string;
}
export const SlateSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceLocationName: S.optional(S.String),
    VodSourceName: S.optional(S.String),
  }),
).annotate({ identifier: "SlateSource" }) as any as S.Schema<SlateSource>;
export interface DashPlaylistSettings {
  ManifestWindowSeconds?: number;
  MinBufferTimeSeconds?: number;
  MinUpdatePeriodSeconds?: number;
  SuggestedPresentationDelaySeconds?: number;
}
export const DashPlaylistSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestWindowSeconds: S.optional(S.Number),
    MinBufferTimeSeconds: S.optional(S.Number),
    MinUpdatePeriodSeconds: S.optional(S.Number),
    SuggestedPresentationDelaySeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "DashPlaylistSettings",
}) as any as S.Schema<DashPlaylistSettings>;
export type AdMarkupType = "DATERANGE" | "SCTE35_ENHANCED" | (string & {});
export const AdMarkupType = /*@__PURE__*/ S.String;

export type AdMarkupTypes = AdMarkupType[];
export const AdMarkupTypes = /*@__PURE__*/ S.Array(AdMarkupType);
export interface HlsPlaylistSettings {
  ManifestWindowSeconds?: number;
  AdMarkupType?: AdMarkupType[];
}
export const HlsPlaylistSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestWindowSeconds: S.optional(S.Number),
    AdMarkupType: S.optional(AdMarkupTypes),
  }),
).annotate({
  identifier: "HlsPlaylistSettings",
}) as any as S.Schema<HlsPlaylistSettings>;
export interface RequestOutputItem {
  DashPlaylistSettings?: DashPlaylistSettings;
  HlsPlaylistSettings?: HlsPlaylistSettings;
  ManifestName: string;
  SourceGroup: string;
}
export const RequestOutputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashPlaylistSettings: S.optional(DashPlaylistSettings),
    HlsPlaylistSettings: S.optional(HlsPlaylistSettings),
    ManifestName: S.String,
    SourceGroup: S.String,
  }),
).annotate({
  identifier: "RequestOutputItem",
}) as any as S.Schema<RequestOutputItem>;
export type RequestOutputs = RequestOutputItem[];
export const RequestOutputs = /*@__PURE__*/ S.Array(RequestOutputItem);
export type PlaybackMode = "LOOP" | "LINEAR" | (string & {});
export const PlaybackMode = /*@__PURE__*/ S.String;

export type __mapOf__string = { [key: string]: string | undefined };
export const __mapOf__string = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type Tier = "BASIC" | "STANDARD" | (string & {});
export const Tier = /*@__PURE__*/ S.String;

export interface TimeShiftConfiguration {
  MaxTimeDelaySeconds: number;
}
export const TimeShiftConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MaxTimeDelaySeconds: S.Number }),
).annotate({
  identifier: "TimeShiftConfiguration",
}) as any as S.Schema<TimeShiftConfiguration>;
export type Audiences = string[];
export const Audiences = /*@__PURE__*/ S.Array(S.String);
export interface CreateChannelRequest {
  ChannelName: string;
  FillerSlate?: SlateSource;
  Outputs: RequestOutputItem[];
  PlaybackMode: PlaybackMode;
  Tags?: { [key: string]: string | undefined };
  Tier?: Tier;
  TimeShiftConfiguration?: TimeShiftConfiguration;
  Audiences?: string[];
}
export const CreateChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    FillerSlate: S.optional(SlateSource),
    Outputs: RequestOutputs,
    PlaybackMode: PlaybackMode,
    Tags: S.optional(__mapOf__string),
    Tier: S.optional(Tier),
    TimeShiftConfiguration: S.optional(TimeShiftConfiguration),
    Audiences: S.optional(Audiences),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/channel/{ChannelName}" }),
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
export type ChannelState = "RUNNING" | "STOPPED" | (string & {});
export const ChannelState = /*@__PURE__*/ S.String;

export type __timestampUnix = Date;
export interface ResponseOutputItem {
  DashPlaylistSettings?: DashPlaylistSettings;
  HlsPlaylistSettings?: HlsPlaylistSettings;
  ManifestName: string;
  PlaybackUrl: string;
  SourceGroup: string;
}
export const ResponseOutputItem = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DashPlaylistSettings: S.optional(DashPlaylistSettings),
    HlsPlaylistSettings: S.optional(HlsPlaylistSettings),
    ManifestName: S.String,
    PlaybackUrl: S.String,
    SourceGroup: S.String,
  }),
).annotate({
  identifier: "ResponseOutputItem",
}) as any as S.Schema<ResponseOutputItem>;
export type ResponseOutputs = ResponseOutputItem[];
export const ResponseOutputs = /*@__PURE__*/ S.Array(ResponseOutputItem);
export interface CreateChannelResponse {
  Arn?: string;
  ChannelName?: string;
  ChannelState?: ChannelState;
  CreationTime?: Date;
  FillerSlate?: SlateSource;
  LastModifiedTime?: Date;
  Outputs?: ResponseOutputItem[];
  PlaybackMode?: string;
  Tags?: { [key: string]: string | undefined };
  Tier?: string;
  TimeShiftConfiguration?: TimeShiftConfiguration;
  Audiences?: string[];
}
export const CreateChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelName: S.optional(S.String),
    ChannelState: S.optional(ChannelState),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FillerSlate: S.optional(SlateSource),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Outputs: S.optional(ResponseOutputs),
    PlaybackMode: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
    Tier: S.optional(S.String),
    TimeShiftConfiguration: S.optional(TimeShiftConfiguration),
    Audiences: S.optional(Audiences),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "CreateChannelResponse",
}) as any as S.Schema<CreateChannelResponse>;
export type Type = "DASH" | "HLS" | (string & {});
export const Type = /*@__PURE__*/ S.String;

export interface HttpPackageConfiguration {
  Path: string;
  SourceGroup: string;
  Type: Type;
}
export const HttpPackageConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Path: S.String, SourceGroup: S.String, Type: Type }),
).annotate({
  identifier: "HttpPackageConfiguration",
}) as any as S.Schema<HttpPackageConfiguration>;
export type HttpPackageConfigurations = HttpPackageConfiguration[];
export const HttpPackageConfigurations = /*@__PURE__*/ S.Array(
  HttpPackageConfiguration,
);
export interface CreateLiveSourceRequest {
  HttpPackageConfigurations: HttpPackageConfiguration[];
  LiveSourceName: string;
  SourceLocationName: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateLiveSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HttpPackageConfigurations: HttpPackageConfigurations,
    LiveSourceName: S.String.pipe(T.HttpLabel("LiveSourceName")),
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/sourceLocation/{SourceLocationName}/liveSource/{LiveSourceName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateLiveSourceRequest",
}) as any as S.Schema<CreateLiveSourceRequest>;
export interface CreateLiveSourceResponse {
  Arn?: string;
  CreationTime?: Date;
  HttpPackageConfigurations?: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  LiveSourceName?: string;
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateLiveSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HttpPackageConfigurations: S.optional(HttpPackageConfigurations),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LiveSourceName: S.optional(S.String),
    SourceLocationName: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "CreateLiveSourceResponse",
}) as any as S.Schema<CreateLiveSourceResponse>;
export type Operator = "EQUALS" | (string & {});
export const Operator = /*@__PURE__*/ S.String;

export interface AvailMatchingCriteria {
  DynamicVariable: string;
  Operator: Operator;
}
export const AvailMatchingCriteria = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DynamicVariable: S.String, Operator: Operator }),
).annotate({
  identifier: "AvailMatchingCriteria",
}) as any as S.Schema<AvailMatchingCriteria>;
export type __listOfAvailMatchingCriteria = AvailMatchingCriteria[];
export const __listOfAvailMatchingCriteria = /*@__PURE__*/ S.Array(
  AvailMatchingCriteria,
);
export interface PrefetchConsumption {
  AvailMatchingCriteria?: AvailMatchingCriteria[];
  EndTime: Date;
  StartTime?: Date;
}
export const PrefetchConsumption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailMatchingCriteria: S.optional(__listOfAvailMatchingCriteria),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "PrefetchConsumption",
}) as any as S.Schema<PrefetchConsumption>;
export type TrafficShapingType = "RETRIEVAL_WINDOW" | "TPS" | (string & {});
export const TrafficShapingType = /*@__PURE__*/ S.String;

export interface TrafficShapingRetrievalWindow {
  RetrievalWindowDurationSeconds?: number;
}
export const TrafficShapingRetrievalWindow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RetrievalWindowDurationSeconds: S.optional(S.Number) }),
).annotate({
  identifier: "TrafficShapingRetrievalWindow",
}) as any as S.Schema<TrafficShapingRetrievalWindow>;
export interface TrafficShapingTpsConfiguration {
  PeakTps?: number;
  PeakConcurrentUsers?: number;
}
export const TrafficShapingTpsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PeakTps: S.optional(S.Number),
    PeakConcurrentUsers: S.optional(S.Number),
  }),
).annotate({
  identifier: "TrafficShapingTpsConfiguration",
}) as any as S.Schema<TrafficShapingTpsConfiguration>;
export interface PrefetchRetrieval {
  DynamicVariables?: { [key: string]: string | undefined };
  EndTime: Date;
  StartTime?: Date;
  TrafficShapingType?: TrafficShapingType;
  TrafficShapingRetrievalWindow?: TrafficShapingRetrievalWindow;
  TrafficShapingTpsConfiguration?: TrafficShapingTpsConfiguration;
}
export const PrefetchRetrieval = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DynamicVariables: S.optional(__mapOf__string),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    TrafficShapingType: S.optional(TrafficShapingType),
    TrafficShapingRetrievalWindow: S.optional(TrafficShapingRetrievalWindow),
    TrafficShapingTpsConfiguration: S.optional(TrafficShapingTpsConfiguration),
  }),
).annotate({
  identifier: "PrefetchRetrieval",
}) as any as S.Schema<PrefetchRetrieval>;
export interface RecurringConsumption {
  RetrievedAdExpirationSeconds?: number;
  AvailMatchingCriteria?: AvailMatchingCriteria[];
}
export const RecurringConsumption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RetrievedAdExpirationSeconds: S.optional(S.Number),
    AvailMatchingCriteria: S.optional(__listOfAvailMatchingCriteria),
  }),
).annotate({
  identifier: "RecurringConsumption",
}) as any as S.Schema<RecurringConsumption>;
export interface RecurringRetrieval {
  DynamicVariables?: { [key: string]: string | undefined };
  DelayAfterAvailEndSeconds?: number;
  TrafficShapingType?: TrafficShapingType;
  TrafficShapingRetrievalWindow?: TrafficShapingRetrievalWindow;
  TrafficShapingTpsConfiguration?: TrafficShapingTpsConfiguration;
}
export const RecurringRetrieval = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DynamicVariables: S.optional(__mapOf__string),
    DelayAfterAvailEndSeconds: S.optional(S.Number),
    TrafficShapingType: S.optional(TrafficShapingType),
    TrafficShapingRetrievalWindow: S.optional(TrafficShapingRetrievalWindow),
    TrafficShapingTpsConfiguration: S.optional(TrafficShapingTpsConfiguration),
  }),
).annotate({
  identifier: "RecurringRetrieval",
}) as any as S.Schema<RecurringRetrieval>;
export interface RecurringPrefetchConfiguration {
  StartTime?: Date;
  EndTime: Date;
  RecurringConsumption: RecurringConsumption;
  RecurringRetrieval: RecurringRetrieval;
}
export const RecurringPrefetchConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    EndTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    RecurringConsumption: RecurringConsumption,
    RecurringRetrieval: RecurringRetrieval,
  }),
).annotate({
  identifier: "RecurringPrefetchConfiguration",
}) as any as S.Schema<RecurringPrefetchConfiguration>;
export type PrefetchScheduleType = "SINGLE" | "RECURRING" | (string & {});
export const PrefetchScheduleType = /*@__PURE__*/ S.String;

export interface CreatePrefetchScheduleRequest {
  Consumption?: PrefetchConsumption;
  Name: string;
  PlaybackConfigurationName: string;
  Retrieval?: PrefetchRetrieval;
  RecurringPrefetchConfiguration?: RecurringPrefetchConfiguration;
  ScheduleType?: PrefetchScheduleType;
  StreamId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePrefetchScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Consumption: S.optional(PrefetchConsumption),
    Name: S.String.pipe(T.HttpLabel("Name")),
    PlaybackConfigurationName: S.String.pipe(
      T.HttpLabel("PlaybackConfigurationName"),
    ),
    Retrieval: S.optional(PrefetchRetrieval),
    RecurringPrefetchConfiguration: S.optional(RecurringPrefetchConfiguration),
    ScheduleType: S.optional(PrefetchScheduleType),
    StreamId: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/prefetchSchedule/{PlaybackConfigurationName}/{Name}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePrefetchScheduleRequest",
}) as any as S.Schema<CreatePrefetchScheduleRequest>;
export interface CreatePrefetchScheduleResponse {
  Arn?: string;
  Consumption?: PrefetchConsumption;
  Name?: string;
  PlaybackConfigurationName?: string;
  Retrieval?: PrefetchRetrieval;
  RecurringPrefetchConfiguration?: RecurringPrefetchConfiguration;
  ScheduleType?: PrefetchScheduleType;
  StreamId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePrefetchScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Consumption: S.optional(PrefetchConsumption),
    Name: S.optional(S.String),
    PlaybackConfigurationName: S.optional(S.String),
    Retrieval: S.optional(PrefetchRetrieval),
    RecurringPrefetchConfiguration: S.optional(RecurringPrefetchConfiguration),
    ScheduleType: S.optional(PrefetchScheduleType),
    StreamId: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "CreatePrefetchScheduleResponse",
}) as any as S.Schema<CreatePrefetchScheduleResponse>;
export type MessageType = "SPLICE_INSERT" | "TIME_SIGNAL" | (string & {});
export const MessageType = /*@__PURE__*/ S.String;

export interface SpliceInsertMessage {
  AvailNum?: number;
  AvailsExpected?: number;
  SpliceEventId?: number;
  UniqueProgramId?: number;
}
export const SpliceInsertMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailNum: S.optional(S.Number),
    AvailsExpected: S.optional(S.Number),
    SpliceEventId: S.optional(S.Number),
    UniqueProgramId: S.optional(S.Number),
  }),
).annotate({
  identifier: "SpliceInsertMessage",
}) as any as S.Schema<SpliceInsertMessage>;
export interface SegmentationDescriptor {
  SegmentationEventId?: number;
  SegmentationUpidType?: number;
  SegmentationUpid?: string;
  SegmentationTypeId?: number;
  SegmentNum?: number;
  SegmentsExpected?: number;
  SubSegmentNum?: number;
  SubSegmentsExpected?: number;
}
export const SegmentationDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SegmentationEventId: S.optional(S.Number),
    SegmentationUpidType: S.optional(S.Number),
    SegmentationUpid: S.optional(S.String),
    SegmentationTypeId: S.optional(S.Number),
    SegmentNum: S.optional(S.Number),
    SegmentsExpected: S.optional(S.Number),
    SubSegmentNum: S.optional(S.Number),
    SubSegmentsExpected: S.optional(S.Number),
  }),
).annotate({
  identifier: "SegmentationDescriptor",
}) as any as S.Schema<SegmentationDescriptor>;
export type SegmentationDescriptorList = SegmentationDescriptor[];
export const SegmentationDescriptorList = /*@__PURE__*/ S.Array(
  SegmentationDescriptor,
);
export interface TimeSignalMessage {
  SegmentationDescriptors?: SegmentationDescriptor[];
}
export const TimeSignalMessage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SegmentationDescriptors: S.optional(SegmentationDescriptorList) }),
).annotate({
  identifier: "TimeSignalMessage",
}) as any as S.Schema<TimeSignalMessage>;
export interface KeyValuePair {
  Key: string;
  Value: string;
}
export const KeyValuePair = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "KeyValuePair" }) as any as S.Schema<KeyValuePair>;
export type AdBreakMetadataList = KeyValuePair[];
export const AdBreakMetadataList = /*@__PURE__*/ S.Array(KeyValuePair);
export interface AdBreak {
  MessageType?: MessageType;
  OffsetMillis: number;
  Slate?: SlateSource;
  SpliceInsertMessage?: SpliceInsertMessage;
  TimeSignalMessage?: TimeSignalMessage;
  AdBreakMetadata?: KeyValuePair[];
}
export const AdBreak = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MessageType: S.optional(MessageType),
    OffsetMillis: S.Number,
    Slate: S.optional(SlateSource),
    SpliceInsertMessage: S.optional(SpliceInsertMessage),
    TimeSignalMessage: S.optional(TimeSignalMessage),
    AdBreakMetadata: S.optional(AdBreakMetadataList),
  }),
).annotate({ identifier: "AdBreak" }) as any as S.Schema<AdBreak>;
export type __listOfAdBreak = AdBreak[];
export const __listOfAdBreak = /*@__PURE__*/ S.Array(AdBreak);
export type RelativePosition =
  | "BEFORE_PROGRAM"
  | "AFTER_PROGRAM"
  | (string & {});
export const RelativePosition = /*@__PURE__*/ S.String;

export interface Transition {
  DurationMillis?: number;
  RelativePosition: RelativePosition;
  RelativeProgram?: string;
  ScheduledStartTimeMillis?: number;
  Type: string;
}
export const Transition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DurationMillis: S.optional(S.Number),
    RelativePosition: RelativePosition,
    RelativeProgram: S.optional(S.String),
    ScheduledStartTimeMillis: S.optional(S.Number),
    Type: S.String,
  }),
).annotate({ identifier: "Transition" }) as any as S.Schema<Transition>;
export interface ClipRange {
  EndOffsetMillis?: number;
  StartOffsetMillis?: number;
}
export const ClipRange = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndOffsetMillis: S.optional(S.Number),
    StartOffsetMillis: S.optional(S.Number),
  }),
).annotate({ identifier: "ClipRange" }) as any as S.Schema<ClipRange>;
export interface ScheduleConfiguration {
  Transition: Transition;
  ClipRange?: ClipRange;
}
export const ScheduleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Transition: Transition, ClipRange: S.optional(ClipRange) }),
).annotate({
  identifier: "ScheduleConfiguration",
}) as any as S.Schema<ScheduleConfiguration>;
export interface AlternateMedia {
  SourceLocationName?: string;
  LiveSourceName?: string;
  VodSourceName?: string;
  ClipRange?: ClipRange;
  ScheduledStartTimeMillis?: number;
  AdBreaks?: AdBreak[];
  DurationMillis?: number;
}
export const AlternateMedia = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceLocationName: S.optional(S.String),
    LiveSourceName: S.optional(S.String),
    VodSourceName: S.optional(S.String),
    ClipRange: S.optional(ClipRange),
    ScheduledStartTimeMillis: S.optional(S.Number),
    AdBreaks: S.optional(__listOfAdBreak),
    DurationMillis: S.optional(S.Number),
  }),
).annotate({ identifier: "AlternateMedia" }) as any as S.Schema<AlternateMedia>;
export type __listOfAlternateMedia = AlternateMedia[];
export const __listOfAlternateMedia = /*@__PURE__*/ S.Array(AlternateMedia);
export interface AudienceMedia {
  Audience?: string;
  AlternateMedia?: AlternateMedia[];
}
export const AudienceMedia = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Audience: S.optional(S.String),
    AlternateMedia: S.optional(__listOfAlternateMedia),
  }),
).annotate({ identifier: "AudienceMedia" }) as any as S.Schema<AudienceMedia>;
export type __listOfAudienceMedia = AudienceMedia[];
export const __listOfAudienceMedia = /*@__PURE__*/ S.Array(AudienceMedia);
export interface CreateProgramRequest {
  AdBreaks?: AdBreak[];
  ChannelName: string;
  LiveSourceName?: string;
  ProgramName: string;
  ScheduleConfiguration: ScheduleConfiguration;
  SourceLocationName: string;
  VodSourceName?: string;
  AudienceMedia?: AudienceMedia[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateProgramRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdBreaks: S.optional(__listOfAdBreak),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    LiveSourceName: S.optional(S.String),
    ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
    ScheduleConfiguration: ScheduleConfiguration,
    SourceLocationName: S.String,
    VodSourceName: S.optional(S.String),
    AudienceMedia: S.optional(__listOfAudienceMedia),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/channel/{ChannelName}/program/{ProgramName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateProgramRequest",
}) as any as S.Schema<CreateProgramRequest>;
export interface CreateProgramResponse {
  AdBreaks?: AdBreak[];
  Arn?: string;
  ChannelName?: string;
  CreationTime?: Date;
  LiveSourceName?: string;
  ProgramName?: string;
  ScheduledStartTime?: Date;
  SourceLocationName?: string;
  VodSourceName?: string;
  ClipRange?: ClipRange;
  DurationMillis?: number;
  AudienceMedia?: AudienceMedia[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateProgramResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdBreaks: S.optional(__listOfAdBreak),
    Arn: S.optional(S.String),
    ChannelName: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LiveSourceName: S.optional(S.String),
    ProgramName: S.optional(S.String),
    ScheduledStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SourceLocationName: S.optional(S.String),
    VodSourceName: S.optional(S.String),
    ClipRange: S.optional(ClipRange),
    DurationMillis: S.optional(S.Number),
    AudienceMedia: S.optional(__listOfAudienceMedia),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "CreateProgramResponse",
}) as any as S.Schema<CreateProgramResponse>;
export type AccessType =
  | "S3_SIGV4"
  | "SECRETS_MANAGER_ACCESS_TOKEN"
  | "AUTODETECT_SIGV4"
  | (string & {});
export const AccessType = /*@__PURE__*/ S.String;

export interface SecretsManagerAccessTokenConfiguration {
  HeaderName?: string;
  SecretArn?: string;
  SecretStringKey?: string;
}
export const SecretsManagerAccessTokenConfiguration = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      HeaderName: S.optional(S.String),
      SecretArn: S.optional(S.String),
      SecretStringKey: S.optional(S.String),
    }),
).annotate({
  identifier: "SecretsManagerAccessTokenConfiguration",
}) as any as S.Schema<SecretsManagerAccessTokenConfiguration>;
export interface AccessConfiguration {
  AccessType?: AccessType;
  SecretsManagerAccessTokenConfiguration?: SecretsManagerAccessTokenConfiguration;
}
export const AccessConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessType: S.optional(AccessType),
    SecretsManagerAccessTokenConfiguration: S.optional(
      SecretsManagerAccessTokenConfiguration,
    ),
  }),
).annotate({
  identifier: "AccessConfiguration",
}) as any as S.Schema<AccessConfiguration>;
export interface DefaultSegmentDeliveryConfiguration {
  BaseUrl?: string;
}
export const DefaultSegmentDeliveryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BaseUrl: S.optional(S.String) }),
).annotate({
  identifier: "DefaultSegmentDeliveryConfiguration",
}) as any as S.Schema<DefaultSegmentDeliveryConfiguration>;
export interface HttpConfiguration {
  BaseUrl: string;
}
export const HttpConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BaseUrl: S.String }),
).annotate({
  identifier: "HttpConfiguration",
}) as any as S.Schema<HttpConfiguration>;
export interface SegmentDeliveryConfiguration {
  BaseUrl?: string;
  Name?: string;
}
export const SegmentDeliveryConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ BaseUrl: S.optional(S.String), Name: S.optional(S.String) }),
).annotate({
  identifier: "SegmentDeliveryConfiguration",
}) as any as S.Schema<SegmentDeliveryConfiguration>;
export type __listOfSegmentDeliveryConfiguration =
  SegmentDeliveryConfiguration[];
export const __listOfSegmentDeliveryConfiguration = /*@__PURE__*/ S.Array(
  SegmentDeliveryConfiguration,
);
export interface CreateSourceLocationRequest {
  AccessConfiguration?: AccessConfiguration;
  DefaultSegmentDeliveryConfiguration?: DefaultSegmentDeliveryConfiguration;
  HttpConfiguration: HttpConfiguration;
  SegmentDeliveryConfigurations?: SegmentDeliveryConfiguration[];
  SourceLocationName: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateSourceLocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessConfiguration: S.optional(AccessConfiguration),
    DefaultSegmentDeliveryConfiguration: S.optional(
      DefaultSegmentDeliveryConfiguration,
    ),
    HttpConfiguration: HttpConfiguration,
    SegmentDeliveryConfigurations: S.optional(
      __listOfSegmentDeliveryConfiguration,
    ),
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/sourceLocation/{SourceLocationName}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateSourceLocationRequest",
}) as any as S.Schema<CreateSourceLocationRequest>;
export interface CreateSourceLocationResponse {
  AccessConfiguration?: AccessConfiguration;
  Arn?: string;
  CreationTime?: Date;
  DefaultSegmentDeliveryConfiguration?: DefaultSegmentDeliveryConfiguration;
  HttpConfiguration?: HttpConfiguration;
  LastModifiedTime?: Date;
  SegmentDeliveryConfigurations?: SegmentDeliveryConfiguration[];
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateSourceLocationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessConfiguration: S.optional(AccessConfiguration),
    Arn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DefaultSegmentDeliveryConfiguration: S.optional(
      DefaultSegmentDeliveryConfiguration,
    ),
    HttpConfiguration: S.optional(HttpConfiguration),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SegmentDeliveryConfigurations: S.optional(
      __listOfSegmentDeliveryConfiguration,
    ),
    SourceLocationName: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "CreateSourceLocationResponse",
}) as any as S.Schema<CreateSourceLocationResponse>;
export interface CreateVodSourceRequest {
  HttpPackageConfigurations: HttpPackageConfiguration[];
  SourceLocationName: string;
  Tags?: { [key: string]: string | undefined };
  VodSourceName: string;
}
export const CreateVodSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HttpPackageConfigurations: HttpPackageConfigurations,
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
    Tags: S.optional(__mapOf__string),
    VodSourceName: S.String.pipe(T.HttpLabel("VodSourceName")),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/sourceLocation/{SourceLocationName}/vodSource/{VodSourceName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateVodSourceRequest",
}) as any as S.Schema<CreateVodSourceRequest>;
export interface CreateVodSourceResponse {
  Arn?: string;
  CreationTime?: Date;
  HttpPackageConfigurations?: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
  VodSourceName?: string;
}
export const CreateVodSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HttpPackageConfigurations: S.optional(HttpPackageConfigurations),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SourceLocationName: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
    VodSourceName: S.optional(S.String),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "CreateVodSourceResponse",
}) as any as S.Schema<CreateVodSourceResponse>;
export interface DeleteChannelRequest {
  ChannelName: string;
}
export const DeleteChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/channel/{ChannelName}" }),
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
export interface DeleteChannelPolicyRequest {
  ChannelName: string;
}
export const DeleteChannelPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/channel/{ChannelName}/policy" }),
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
export interface DeleteFunctionRequest {
  FunctionId: string;
}
export const DeleteFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FunctionId: S.String.pipe(T.HttpLabel("FunctionId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/function/{FunctionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFunctionRequest",
}) as any as S.Schema<DeleteFunctionRequest>;
export interface DeleteFunctionResponse {}
export const DeleteFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteFunctionResponse",
}) as any as S.Schema<DeleteFunctionResponse>;
export interface DeleteLiveSourceRequest {
  LiveSourceName: string;
  SourceLocationName: string;
}
export const DeleteLiveSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LiveSourceName: S.String.pipe(T.HttpLabel("LiveSourceName")),
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/sourceLocation/{SourceLocationName}/liveSource/{LiveSourceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteLiveSourceRequest",
}) as any as S.Schema<DeleteLiveSourceRequest>;
export interface DeleteLiveSourceResponse {}
export const DeleteLiveSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteLiveSourceResponse",
}) as any as S.Schema<DeleteLiveSourceResponse>;
export interface DeletePlaybackConfigurationRequest {
  Name: string;
}
export const DeletePlaybackConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/playbackConfiguration/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePlaybackConfigurationRequest",
}) as any as S.Schema<DeletePlaybackConfigurationRequest>;
export interface DeletePlaybackConfigurationResponse {}
export const DeletePlaybackConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePlaybackConfigurationResponse",
}) as any as S.Schema<DeletePlaybackConfigurationResponse>;
export interface DeletePrefetchScheduleRequest {
  Name: string;
  PlaybackConfigurationName: string;
}
export const DeletePrefetchScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    PlaybackConfigurationName: S.String.pipe(
      T.HttpLabel("PlaybackConfigurationName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/prefetchSchedule/{PlaybackConfigurationName}/{Name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePrefetchScheduleRequest",
}) as any as S.Schema<DeletePrefetchScheduleRequest>;
export interface DeletePrefetchScheduleResponse {}
export const DeletePrefetchScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePrefetchScheduleResponse",
}) as any as S.Schema<DeletePrefetchScheduleResponse>;
export interface DeleteProgramRequest {
  ChannelName: string;
  ProgramName: string;
}
export const DeleteProgramRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/channel/{ChannelName}/program/{ProgramName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProgramRequest",
}) as any as S.Schema<DeleteProgramRequest>;
export interface DeleteProgramResponse {}
export const DeleteProgramResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteProgramResponse",
}) as any as S.Schema<DeleteProgramResponse>;
export interface DeleteSourceLocationRequest {
  SourceLocationName: string;
}
export const DeleteSourceLocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/sourceLocation/{SourceLocationName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSourceLocationRequest",
}) as any as S.Schema<DeleteSourceLocationRequest>;
export interface DeleteSourceLocationResponse {}
export const DeleteSourceLocationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSourceLocationResponse",
}) as any as S.Schema<DeleteSourceLocationResponse>;
export interface DeleteVodSourceRequest {
  SourceLocationName: string;
  VodSourceName: string;
}
export const DeleteVodSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
    VodSourceName: S.String.pipe(T.HttpLabel("VodSourceName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/sourceLocation/{SourceLocationName}/vodSource/{VodSourceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteVodSourceRequest",
}) as any as S.Schema<DeleteVodSourceRequest>;
export interface DeleteVodSourceResponse {}
export const DeleteVodSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteVodSourceResponse",
}) as any as S.Schema<DeleteVodSourceResponse>;
export interface DescribeChannelRequest {
  ChannelName: string;
}
export const DescribeChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/channel/{ChannelName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeChannelRequest",
}) as any as S.Schema<DescribeChannelRequest>;
export interface LogConfigurationForChannel {
  LogTypes?: LogType[];
}
export const LogConfigurationForChannel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LogTypes: S.optional(LogTypes) }),
).annotate({
  identifier: "LogConfigurationForChannel",
}) as any as S.Schema<LogConfigurationForChannel>;
export interface DescribeChannelResponse {
  Arn?: string;
  ChannelName?: string;
  ChannelState?: ChannelState;
  CreationTime?: Date;
  FillerSlate?: SlateSource;
  LastModifiedTime?: Date;
  Outputs?: ResponseOutputItem[];
  PlaybackMode?: string;
  Tags?: { [key: string]: string | undefined };
  Tier?: string;
  LogConfiguration: LogConfigurationForChannel;
  TimeShiftConfiguration?: TimeShiftConfiguration;
  Audiences?: string[];
}
export const DescribeChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelName: S.optional(S.String),
    ChannelState: S.optional(ChannelState),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FillerSlate: S.optional(SlateSource),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Outputs: S.optional(ResponseOutputs),
    PlaybackMode: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
    Tier: S.optional(S.String),
    LogConfiguration: LogConfigurationForChannel,
    TimeShiftConfiguration: S.optional(TimeShiftConfiguration),
    Audiences: S.optional(Audiences),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "DescribeChannelResponse",
}) as any as S.Schema<DescribeChannelResponse>;
export interface DescribeLiveSourceRequest {
  LiveSourceName: string;
  SourceLocationName: string;
}
export const DescribeLiveSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LiveSourceName: S.String.pipe(T.HttpLabel("LiveSourceName")),
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sourceLocation/{SourceLocationName}/liveSource/{LiveSourceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeLiveSourceRequest",
}) as any as S.Schema<DescribeLiveSourceRequest>;
export interface DescribeLiveSourceResponse {
  Arn?: string;
  CreationTime?: Date;
  HttpPackageConfigurations?: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  LiveSourceName?: string;
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const DescribeLiveSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HttpPackageConfigurations: S.optional(HttpPackageConfigurations),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LiveSourceName: S.optional(S.String),
    SourceLocationName: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "DescribeLiveSourceResponse",
}) as any as S.Schema<DescribeLiveSourceResponse>;
export interface DescribeProgramRequest {
  ChannelName: string;
  ProgramName: string;
}
export const DescribeProgramRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/channel/{ChannelName}/program/{ProgramName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeProgramRequest",
}) as any as S.Schema<DescribeProgramRequest>;
export interface DescribeProgramResponse {
  AdBreaks?: AdBreak[];
  Arn?: string;
  ChannelName?: string;
  CreationTime?: Date;
  LiveSourceName?: string;
  ProgramName?: string;
  ScheduledStartTime?: Date;
  SourceLocationName?: string;
  VodSourceName?: string;
  ClipRange?: ClipRange;
  DurationMillis?: number;
  AudienceMedia?: AudienceMedia[];
  Tags?: { [key: string]: string | undefined };
}
export const DescribeProgramResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdBreaks: S.optional(__listOfAdBreak),
    Arn: S.optional(S.String),
    ChannelName: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    LiveSourceName: S.optional(S.String),
    ProgramName: S.optional(S.String),
    ScheduledStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SourceLocationName: S.optional(S.String),
    VodSourceName: S.optional(S.String),
    ClipRange: S.optional(ClipRange),
    DurationMillis: S.optional(S.Number),
    AudienceMedia: S.optional(__listOfAudienceMedia),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "DescribeProgramResponse",
}) as any as S.Schema<DescribeProgramResponse>;
export interface DescribeSourceLocationRequest {
  SourceLocationName: string;
}
export const DescribeSourceLocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sourceLocation/{SourceLocationName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSourceLocationRequest",
}) as any as S.Schema<DescribeSourceLocationRequest>;
export interface DescribeSourceLocationResponse {
  AccessConfiguration?: AccessConfiguration;
  Arn?: string;
  CreationTime?: Date;
  DefaultSegmentDeliveryConfiguration?: DefaultSegmentDeliveryConfiguration;
  HttpConfiguration?: HttpConfiguration;
  LastModifiedTime?: Date;
  SegmentDeliveryConfigurations?: SegmentDeliveryConfiguration[];
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const DescribeSourceLocationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessConfiguration: S.optional(AccessConfiguration),
    Arn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DefaultSegmentDeliveryConfiguration: S.optional(
      DefaultSegmentDeliveryConfiguration,
    ),
    HttpConfiguration: S.optional(HttpConfiguration),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SegmentDeliveryConfigurations: S.optional(
      __listOfSegmentDeliveryConfiguration,
    ),
    SourceLocationName: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "DescribeSourceLocationResponse",
}) as any as S.Schema<DescribeSourceLocationResponse>;
export interface DescribeVodSourceRequest {
  SourceLocationName: string;
  VodSourceName: string;
}
export const DescribeVodSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
    VodSourceName: S.String.pipe(T.HttpLabel("VodSourceName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sourceLocation/{SourceLocationName}/vodSource/{VodSourceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeVodSourceRequest",
}) as any as S.Schema<DescribeVodSourceRequest>;
export interface AdBreakOpportunity {
  OffsetMillis: number;
}
export const AdBreakOpportunity = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OffsetMillis: S.Number }),
).annotate({
  identifier: "AdBreakOpportunity",
}) as any as S.Schema<AdBreakOpportunity>;
export type AdBreakOpportunities = AdBreakOpportunity[];
export const AdBreakOpportunities = /*@__PURE__*/ S.Array(AdBreakOpportunity);
export interface DescribeVodSourceResponse {
  AdBreakOpportunities?: AdBreakOpportunity[];
  Arn?: string;
  CreationTime?: Date;
  HttpPackageConfigurations?: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
  VodSourceName?: string;
}
export const DescribeVodSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdBreakOpportunities: S.optional(AdBreakOpportunities),
    Arn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HttpPackageConfigurations: S.optional(HttpPackageConfigurations),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SourceLocationName: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
    VodSourceName: S.optional(S.String),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "DescribeVodSourceResponse",
}) as any as S.Schema<DescribeVodSourceResponse>;
export interface GetChannelPolicyRequest {
  ChannelName: string;
}
export const GetChannelPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/channel/{ChannelName}/policy" }),
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
export interface GetChannelPolicyResponse {
  Policy?: string;
}
export const GetChannelPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(S.String) }),
).annotate({
  identifier: "GetChannelPolicyResponse",
}) as any as S.Schema<GetChannelPolicyResponse>;
export type MaxResults = number;
export interface GetChannelScheduleRequest {
  ChannelName: string;
  DurationMinutes?: string;
  MaxResults?: number;
  NextToken?: string;
  Audience?: string;
}
export const GetChannelScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    DurationMinutes: S.optional(S.String).pipe(T.HttpQuery("durationMinutes")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Audience: S.optional(S.String).pipe(T.HttpQuery("audience")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/channel/{ChannelName}/schedule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetChannelScheduleRequest",
}) as any as S.Schema<GetChannelScheduleRequest>;
export interface ScheduleAdBreak {
  ApproximateDurationSeconds?: number;
  ApproximateStartTime?: Date;
  SourceLocationName?: string;
  VodSourceName?: string;
}
export const ScheduleAdBreak = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApproximateDurationSeconds: S.optional(S.Number),
    ApproximateStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SourceLocationName: S.optional(S.String),
    VodSourceName: S.optional(S.String),
  }),
).annotate({
  identifier: "ScheduleAdBreak",
}) as any as S.Schema<ScheduleAdBreak>;
export type __listOfScheduleAdBreak = ScheduleAdBreak[];
export const __listOfScheduleAdBreak = /*@__PURE__*/ S.Array(ScheduleAdBreak);
export type ScheduleEntryType =
  | "PROGRAM"
  | "FILLER_SLATE"
  | "ALTERNATE_MEDIA"
  | (string & {});
export const ScheduleEntryType = /*@__PURE__*/ S.String;

export interface ScheduleEntry {
  ApproximateDurationSeconds?: number;
  ApproximateStartTime?: Date;
  Arn: string;
  ChannelName: string;
  LiveSourceName?: string;
  ProgramName: string;
  ScheduleAdBreaks?: ScheduleAdBreak[];
  ScheduleEntryType?: ScheduleEntryType;
  SourceLocationName: string;
  VodSourceName?: string;
  Audiences?: string[];
}
export const ScheduleEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ApproximateDurationSeconds: S.optional(S.Number),
    ApproximateStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Arn: S.String,
    ChannelName: S.String,
    LiveSourceName: S.optional(S.String),
    ProgramName: S.String,
    ScheduleAdBreaks: S.optional(__listOfScheduleAdBreak),
    ScheduleEntryType: S.optional(ScheduleEntryType),
    SourceLocationName: S.String,
    VodSourceName: S.optional(S.String),
    Audiences: S.optional(Audiences),
  }),
).annotate({ identifier: "ScheduleEntry" }) as any as S.Schema<ScheduleEntry>;
export type __listOfScheduleEntry = ScheduleEntry[];
export const __listOfScheduleEntry = /*@__PURE__*/ S.Array(ScheduleEntry);
export interface GetChannelScheduleResponse {
  Items?: ScheduleEntry[];
  NextToken?: string;
}
export const GetChannelScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfScheduleEntry),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "GetChannelScheduleResponse",
}) as any as S.Schema<GetChannelScheduleResponse>;
export interface GetFunctionRequest {
  FunctionId: string;
}
export const GetFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FunctionId: S.String.pipe(T.HttpLabel("FunctionId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/function/{FunctionId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetFunctionRequest",
}) as any as S.Schema<GetFunctionRequest>;
export type FunctionType =
  | "HTTP_REQUEST"
  | "CUSTOM_OUTPUT"
  | "SEQUENTIAL_EXECUTOR"
  | (string & {});
export const FunctionType = /*@__PURE__*/ S.String;

export type RuntimeType = "JSONATA" | (string & {});
export const RuntimeType = /*@__PURE__*/ S.String;

export type MethodType = "GET" | "POST" | (string & {});
export const MethodType = /*@__PURE__*/ S.String;

export interface HttpRequestConfiguration {
  Runtime: RuntimeType;
  Output?: { [key: string]: string | undefined };
  MethodType: MethodType;
  RequestTimeoutMilliseconds: number;
  Url: string;
  Body?: string;
  Headers?: { [key: string]: string | undefined };
}
export const HttpRequestConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Runtime: RuntimeType,
    Output: S.optional(__mapOf__string),
    MethodType: MethodType,
    RequestTimeoutMilliseconds: S.Number,
    Url: S.String,
    Body: S.optional(S.String),
    Headers: S.optional(__mapOf__string),
  }),
).annotate({
  identifier: "HttpRequestConfiguration",
}) as any as S.Schema<HttpRequestConfiguration>;
export interface CustomOutputConfiguration {
  Runtime: RuntimeType;
  Output?: { [key: string]: string | undefined };
}
export const CustomOutputConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Runtime: RuntimeType, Output: S.optional(__mapOf__string) }),
).annotate({
  identifier: "CustomOutputConfiguration",
}) as any as S.Schema<CustomOutputConfiguration>;
export interface FunctionRef {
  RunCondition?: string;
  FunctionId?: string;
}
export const FunctionRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RunCondition: S.optional(S.String),
    FunctionId: S.optional(S.String),
  }),
).annotate({ identifier: "FunctionRef" }) as any as S.Schema<FunctionRef>;
export type __listOfFunctionsRef = FunctionRef[];
export const __listOfFunctionsRef = /*@__PURE__*/ S.Array(FunctionRef);
export interface SequentialExecutorConfiguration {
  Runtime: RuntimeType;
  Output?: { [key: string]: string | undefined };
  FunctionList: FunctionRef[];
  TimeoutMilliseconds: number;
}
export const SequentialExecutorConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Runtime: RuntimeType,
    Output: S.optional(__mapOf__string),
    FunctionList: __listOfFunctionsRef,
    TimeoutMilliseconds: S.Number,
  }),
).annotate({
  identifier: "SequentialExecutorConfiguration",
}) as any as S.Schema<SequentialExecutorConfiguration>;
export interface GetFunctionResponse {
  FunctionId: string;
  FunctionType: FunctionType;
  Description?: string;
  HttpRequestConfiguration?: HttpRequestConfiguration;
  CustomOutputConfiguration?: CustomOutputConfiguration;
  SequentialExecutorConfiguration?: SequentialExecutorConfiguration;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export const GetFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionId: S.String,
    FunctionType: FunctionType,
    Description: S.optional(S.String),
    HttpRequestConfiguration: S.optional(HttpRequestConfiguration),
    CustomOutputConfiguration: S.optional(CustomOutputConfiguration),
    SequentialExecutorConfiguration: S.optional(
      SequentialExecutorConfiguration,
    ),
    Tags: S.optional(__mapOf__string),
    Arn: S.optional(S.String),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "GetFunctionResponse",
}) as any as S.Schema<GetFunctionResponse>;
export interface GetPlaybackConfigurationRequest {
  Name: string;
}
export const GetPlaybackConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/playbackConfiguration/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPlaybackConfigurationRequest",
}) as any as S.Schema<GetPlaybackConfigurationRequest>;
export type Mode =
  | "OFF"
  | "BEHIND_LIVE_EDGE"
  | "AFTER_LIVE_EDGE"
  | (string & {});
export const Mode = /*@__PURE__*/ S.String;

export type FillPolicy = "FULL_AVAIL_ONLY" | "PARTIAL_AVAIL" | (string & {});
export const FillPolicy = /*@__PURE__*/ S.String;

export interface AvailSuppression {
  Mode?: Mode;
  Value?: string;
  FillPolicy?: FillPolicy;
}
export const AvailSuppression = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Mode: S.optional(Mode),
    Value: S.optional(S.String),
    FillPolicy: S.optional(FillPolicy),
  }),
).annotate({
  identifier: "AvailSuppression",
}) as any as S.Schema<AvailSuppression>;
export interface Bumper {
  EndUrl?: string;
  StartUrl?: string;
}
export const Bumper = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ EndUrl: S.optional(S.String), StartUrl: S.optional(S.String) }),
).annotate({ identifier: "Bumper" }) as any as S.Schema<Bumper>;
export interface CdnConfiguration {
  AdSegmentUrlPrefix?: string;
  ContentSegmentUrlPrefix?: string;
}
export const CdnConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdSegmentUrlPrefix: S.optional(S.String),
    ContentSegmentUrlPrefix: S.optional(S.String),
  }),
).annotate({
  identifier: "CdnConfiguration",
}) as any as S.Schema<CdnConfiguration>;
export type ConfigurationAliasesResponse = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export const ConfigurationAliasesResponse = /*@__PURE__*/ S.Record(
  S.String,
  __mapOf__string.pipe(S.optional),
);
export type OriginManifestType =
  | "SINGLE_PERIOD"
  | "MULTI_PERIOD"
  | (string & {});
export const OriginManifestType = /*@__PURE__*/ S.String;

export interface DashConfiguration {
  ManifestEndpointPrefix?: string;
  MpdLocation?: string;
  OriginManifestType?: OriginManifestType;
}
export const DashConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestEndpointPrefix: S.optional(S.String),
    MpdLocation: S.optional(S.String),
    OriginManifestType: S.optional(OriginManifestType),
  }),
).annotate({
  identifier: "DashConfiguration",
}) as any as S.Schema<DashConfiguration>;
export interface HlsConfiguration {
  ManifestEndpointPrefix?: string;
}
export const HlsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ManifestEndpointPrefix: S.optional(S.String) }),
).annotate({
  identifier: "HlsConfiguration",
}) as any as S.Schema<HlsConfiguration>;
export type InsertionMode = "STITCHED_ONLY" | "PLAYER_SELECT" | (string & {});
export const InsertionMode = /*@__PURE__*/ S.String;

export interface LivePreRollConfiguration {
  AdDecisionServerUrl?: string;
  MaxDurationSeconds?: number;
}
export const LivePreRollConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdDecisionServerUrl: S.optional(S.String),
    MaxDurationSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "LivePreRollConfiguration",
}) as any as S.Schema<LivePreRollConfiguration>;
export interface LogConfiguration {
  PercentEnabled: number;
  EnabledLoggingStrategies?: LoggingStrategy[];
  AdsInteractionLog?: AdsInteractionLog;
  ManifestServiceInteractionLog?: ManifestServiceInteractionLog;
}
export const LogConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PercentEnabled: S.Number,
    EnabledLoggingStrategies: S.optional(__listOfLoggingStrategies),
    AdsInteractionLog: S.optional(AdsInteractionLog),
    ManifestServiceInteractionLog: S.optional(ManifestServiceInteractionLog),
  }),
).annotate({
  identifier: "LogConfiguration",
}) as any as S.Schema<LogConfiguration>;
export interface AdMarkerPassthrough {
  Enabled?: boolean;
}
export const AdMarkerPassthrough = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Enabled: S.optional(S.Boolean) }),
).annotate({
  identifier: "AdMarkerPassthrough",
}) as any as S.Schema<AdMarkerPassthrough>;
export interface ManifestProcessingRules {
  AdMarkerPassthrough?: AdMarkerPassthrough;
}
export const ManifestProcessingRules = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AdMarkerPassthrough: S.optional(AdMarkerPassthrough) }),
).annotate({
  identifier: "ManifestProcessingRules",
}) as any as S.Schema<ManifestProcessingRules>;
export type __integerMin1 = number;
export type StreamingMediaFileConditioning =
  | "TRANSCODE"
  | "NONE"
  | (string & {});
export const StreamingMediaFileConditioning = /*@__PURE__*/ S.String;

export interface AdConditioningConfiguration {
  StreamingMediaFileConditioning: StreamingMediaFileConditioning;
}
export const AdConditioningConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StreamingMediaFileConditioning: StreamingMediaFileConditioning }),
).annotate({
  identifier: "AdConditioningConfiguration",
}) as any as S.Schema<AdConditioningConfiguration>;
export type Method = "GET" | "POST" | (string & {});
export const Method = /*@__PURE__*/ S.String;

export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type CompressionMethod = "NONE" | "GZIP" | (string & {});
export const CompressionMethod = /*@__PURE__*/ S.String;

export interface HttpRequest {
  Method?: Method;
  Body?: string;
  Headers?: { [key: string]: string | undefined };
  CompressRequest?: CompressionMethod;
}
export const HttpRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Method: S.optional(Method),
    Body: S.optional(S.String),
    Headers: S.optional(StringMap),
    CompressRequest: S.optional(CompressionMethod),
  }),
).annotate({ identifier: "HttpRequest" }) as any as S.Schema<HttpRequest>;
export interface AdDecisionServerConfiguration {
  HttpRequest?: HttpRequest;
}
export const AdDecisionServerConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HttpRequest: S.optional(HttpRequest) }),
).annotate({
  identifier: "AdDecisionServerConfiguration",
}) as any as S.Schema<AdDecisionServerConfiguration>;
export type EventName =
  | "PRE_SESSION_INITIALIZATION"
  | "PRE_ADS_REQUEST"
  | (string & {});
export const EventName = /*@__PURE__*/ S.String;

export type FunctionMapping = { [key in EventName]?: string };
export const FunctionMapping = /*@__PURE__*/ S.Record(
  EventName,
  S.String.pipe(S.optional),
);
export interface GetPlaybackConfigurationResponse {
  AdDecisionServerUrl?: string;
  AvailSuppression?: AvailSuppression;
  Bumper?: Bumper;
  CdnConfiguration?: CdnConfiguration;
  ConfigurationAliases?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  DashConfiguration?: DashConfiguration;
  HlsConfiguration?: HlsConfiguration;
  InsertionMode?: InsertionMode;
  LivePreRollConfiguration?: LivePreRollConfiguration;
  LogConfiguration?: LogConfiguration & {
    EnabledLoggingStrategies: __listOfLoggingStrategies;
  };
  ManifestProcessingRules?: ManifestProcessingRules;
  Name?: string;
  PersonalizationThresholdSeconds?: number;
  PlaybackConfigurationArn?: string;
  PlaybackEndpointPrefix?: string;
  SessionInitializationEndpointPrefix?: string;
  SlateAdUrl?: string;
  Tags?: { [key: string]: string | undefined };
  TranscodeProfileName?: string;
  VideoContentSourceUrl?: string;
  AdConditioningConfiguration?: AdConditioningConfiguration;
  AdDecisionServerConfiguration?: AdDecisionServerConfiguration;
  FunctionMapping?: { [key: string]: string | undefined };
}
export const GetPlaybackConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdDecisionServerUrl: S.optional(S.String),
    AvailSuppression: S.optional(AvailSuppression),
    Bumper: S.optional(Bumper),
    CdnConfiguration: S.optional(CdnConfiguration),
    ConfigurationAliases: S.optional(ConfigurationAliasesResponse),
    DashConfiguration: S.optional(DashConfiguration),
    HlsConfiguration: S.optional(HlsConfiguration),
    InsertionMode: S.optional(InsertionMode),
    LivePreRollConfiguration: S.optional(LivePreRollConfiguration),
    LogConfiguration: S.optional(LogConfiguration),
    ManifestProcessingRules: S.optional(ManifestProcessingRules),
    Name: S.optional(S.String),
    PersonalizationThresholdSeconds: S.optional(S.Number),
    PlaybackConfigurationArn: S.optional(S.String),
    PlaybackEndpointPrefix: S.optional(S.String),
    SessionInitializationEndpointPrefix: S.optional(S.String),
    SlateAdUrl: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
    TranscodeProfileName: S.optional(S.String),
    VideoContentSourceUrl: S.optional(S.String),
    AdConditioningConfiguration: S.optional(AdConditioningConfiguration),
    AdDecisionServerConfiguration: S.optional(AdDecisionServerConfiguration),
    FunctionMapping: S.optional(FunctionMapping),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "GetPlaybackConfigurationResponse",
}) as any as S.Schema<GetPlaybackConfigurationResponse>;
export interface GetPrefetchScheduleRequest {
  Name: string;
  PlaybackConfigurationName: string;
}
export const GetPrefetchScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.String.pipe(T.HttpLabel("Name")),
    PlaybackConfigurationName: S.String.pipe(
      T.HttpLabel("PlaybackConfigurationName"),
    ),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/prefetchSchedule/{PlaybackConfigurationName}/{Name}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPrefetchScheduleRequest",
}) as any as S.Schema<GetPrefetchScheduleRequest>;
export interface GetPrefetchScheduleResponse {
  Arn?: string;
  Consumption?: PrefetchConsumption;
  Name?: string;
  PlaybackConfigurationName?: string;
  Retrieval?: PrefetchRetrieval;
  ScheduleType?: PrefetchScheduleType;
  RecurringPrefetchConfiguration?: RecurringPrefetchConfiguration;
  StreamId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetPrefetchScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Consumption: S.optional(PrefetchConsumption),
    Name: S.optional(S.String),
    PlaybackConfigurationName: S.optional(S.String),
    Retrieval: S.optional(PrefetchRetrieval),
    ScheduleType: S.optional(PrefetchScheduleType),
    RecurringPrefetchConfiguration: S.optional(RecurringPrefetchConfiguration),
    StreamId: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "GetPrefetchScheduleResponse",
}) as any as S.Schema<GetPrefetchScheduleResponse>;
export interface ListAlertsRequest {
  MaxResults?: number;
  NextToken?: string;
  ResourceArn: string;
}
export const ListAlertsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    ResourceArn: S.String.pipe(T.HttpQuery("resourceArn")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/alerts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListAlertsRequest",
}) as any as S.Schema<ListAlertsRequest>;
export type __listOf__string = string[];
export const __listOf__string = /*@__PURE__*/ S.Array(S.String);
export type AlertCategory =
  | "SCHEDULING_ERROR"
  | "PLAYBACK_WARNING"
  | "INFO"
  | (string & {});
export const AlertCategory = /*@__PURE__*/ S.String;

export interface Alert {
  AlertCode: string;
  AlertMessage: string;
  LastModifiedTime: Date;
  RelatedResourceArns: string[];
  ResourceArn: string;
  Category?: AlertCategory;
}
export const Alert = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlertCode: S.String,
    AlertMessage: S.String,
    LastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    RelatedResourceArns: __listOf__string,
    ResourceArn: S.String,
    Category: S.optional(AlertCategory),
  }),
).annotate({ identifier: "Alert" }) as any as S.Schema<Alert>;
export type __listOfAlert = Alert[];
export const __listOfAlert = /*@__PURE__*/ S.Array(Alert);
export interface ListAlertsResponse {
  Items?: Alert[];
  NextToken?: string;
}
export const ListAlertsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfAlert),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListAlertsResponse",
}) as any as S.Schema<ListAlertsResponse>;
export interface ListChannelsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListChannelsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/channels" }),
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
export interface Channel {
  Arn: string;
  ChannelName: string;
  ChannelState: string;
  CreationTime?: Date;
  FillerSlate?: SlateSource;
  LastModifiedTime?: Date;
  Outputs: ResponseOutputItem[];
  PlaybackMode: string;
  Tags?: { [key: string]: string | undefined };
  Tier: string;
  LogConfiguration: LogConfigurationForChannel;
  Audiences?: string[];
}
export const Channel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    ChannelName: S.String,
    ChannelState: S.String,
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FillerSlate: S.optional(SlateSource),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Outputs: ResponseOutputs,
    PlaybackMode: S.String,
    Tags: S.optional(__mapOf__string),
    Tier: S.String,
    LogConfiguration: LogConfigurationForChannel,
    Audiences: S.optional(Audiences),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({ identifier: "Channel" }) as any as S.Schema<Channel>;
export type __listOfChannel = Channel[];
export const __listOfChannel = /*@__PURE__*/ S.Array(Channel);
export interface ListChannelsResponse {
  Items?: Channel[];
  NextToken?: string;
}
export const ListChannelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfChannel),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListChannelsResponse",
}) as any as S.Schema<ListChannelsResponse>;
export interface ListFunctionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListFunctionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/functions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFunctionsRequest",
}) as any as S.Schema<ListFunctionsRequest>;
export interface Function {
  FunctionId: string;
  FunctionType: FunctionType;
  Description?: string;
  HttpRequestConfiguration?: HttpRequestConfiguration;
  CustomOutputConfiguration?: CustomOutputConfiguration;
  SequentialExecutorConfiguration?: SequentialExecutorConfiguration;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export const Function = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionId: S.String,
    FunctionType: FunctionType,
    Description: S.optional(S.String),
    HttpRequestConfiguration: S.optional(HttpRequestConfiguration),
    CustomOutputConfiguration: S.optional(CustomOutputConfiguration),
    SequentialExecutorConfiguration: S.optional(
      SequentialExecutorConfiguration,
    ),
    Tags: S.optional(__mapOf__string),
    Arn: S.optional(S.String),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({ identifier: "Function" }) as any as S.Schema<Function>;
export type __listOfFunctionsResponse = Function[];
export const __listOfFunctionsResponse = /*@__PURE__*/ S.Array(Function);
export interface ListFunctionsResponse {
  Items?: Function[];
  NextToken?: string;
}
export const ListFunctionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfFunctionsResponse),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListFunctionsResponse",
}) as any as S.Schema<ListFunctionsResponse>;
export interface ListLiveSourcesRequest {
  MaxResults?: number;
  NextToken?: string;
  SourceLocationName: string;
}
export const ListLiveSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sourceLocation/{SourceLocationName}/liveSources",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListLiveSourcesRequest",
}) as any as S.Schema<ListLiveSourcesRequest>;
export interface LiveSource {
  Arn: string;
  CreationTime?: Date;
  HttpPackageConfigurations: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  LiveSourceName: string;
  SourceLocationName: string;
  Tags?: { [key: string]: string | undefined };
}
export const LiveSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HttpPackageConfigurations: HttpPackageConfigurations,
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LiveSourceName: S.String,
    SourceLocationName: S.String,
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({ identifier: "LiveSource" }) as any as S.Schema<LiveSource>;
export type __listOfLiveSource = LiveSource[];
export const __listOfLiveSource = /*@__PURE__*/ S.Array(LiveSource);
export interface ListLiveSourcesResponse {
  Items?: LiveSource[];
  NextToken?: string;
}
export const ListLiveSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfLiveSource),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListLiveSourcesResponse",
}) as any as S.Schema<ListLiveSourcesResponse>;
export interface ListPlaybackConfigurationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListPlaybackConfigurationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/playbackConfigurations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPlaybackConfigurationsRequest",
}) as any as S.Schema<ListPlaybackConfigurationsRequest>;
export interface PlaybackConfiguration {
  AdDecisionServerUrl?: string;
  AvailSuppression?: AvailSuppression;
  Bumper?: Bumper;
  CdnConfiguration?: CdnConfiguration;
  ConfigurationAliases?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  DashConfiguration?: DashConfiguration;
  HlsConfiguration?: HlsConfiguration;
  InsertionMode?: InsertionMode;
  LivePreRollConfiguration?: LivePreRollConfiguration;
  LogConfiguration?: LogConfiguration;
  ManifestProcessingRules?: ManifestProcessingRules;
  Name?: string;
  PersonalizationThresholdSeconds?: number;
  PlaybackConfigurationArn?: string;
  PlaybackEndpointPrefix?: string;
  SessionInitializationEndpointPrefix?: string;
  SlateAdUrl?: string;
  Tags?: { [key: string]: string | undefined };
  TranscodeProfileName?: string;
  VideoContentSourceUrl?: string;
  AdConditioningConfiguration?: AdConditioningConfiguration;
  AdDecisionServerConfiguration?: AdDecisionServerConfiguration;
  FunctionMapping?: { [key: string]: string | undefined };
}
export const PlaybackConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdDecisionServerUrl: S.optional(S.String),
    AvailSuppression: S.optional(AvailSuppression),
    Bumper: S.optional(Bumper),
    CdnConfiguration: S.optional(CdnConfiguration),
    ConfigurationAliases: S.optional(ConfigurationAliasesResponse),
    DashConfiguration: S.optional(DashConfiguration),
    HlsConfiguration: S.optional(HlsConfiguration),
    InsertionMode: S.optional(InsertionMode),
    LivePreRollConfiguration: S.optional(LivePreRollConfiguration),
    LogConfiguration: S.optional(LogConfiguration),
    ManifestProcessingRules: S.optional(ManifestProcessingRules),
    Name: S.optional(S.String),
    PersonalizationThresholdSeconds: S.optional(S.Number),
    PlaybackConfigurationArn: S.optional(S.String),
    PlaybackEndpointPrefix: S.optional(S.String),
    SessionInitializationEndpointPrefix: S.optional(S.String),
    SlateAdUrl: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
    TranscodeProfileName: S.optional(S.String),
    VideoContentSourceUrl: S.optional(S.String),
    AdConditioningConfiguration: S.optional(AdConditioningConfiguration),
    AdDecisionServerConfiguration: S.optional(AdDecisionServerConfiguration),
    FunctionMapping: S.optional(FunctionMapping),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "PlaybackConfiguration",
}) as any as S.Schema<PlaybackConfiguration>;
export type __listOfPlaybackConfiguration = PlaybackConfiguration[];
export const __listOfPlaybackConfiguration = /*@__PURE__*/ S.Array(
  PlaybackConfiguration,
);
export interface ListPlaybackConfigurationsResponse {
  Items?: (PlaybackConfiguration & {
    LogConfiguration: LogConfiguration & {
      EnabledLoggingStrategies: __listOfLoggingStrategies;
    };
  })[];
  NextToken?: string;
}
export const ListPlaybackConfigurationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfPlaybackConfiguration),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPlaybackConfigurationsResponse",
}) as any as S.Schema<ListPlaybackConfigurationsResponse>;
export type __integerMin1Max100 = number;
export type ListPrefetchScheduleType =
  | "SINGLE"
  | "RECURRING"
  | "ALL"
  | (string & {});
export const ListPrefetchScheduleType = /*@__PURE__*/ S.String;

export interface ListPrefetchSchedulesRequest {
  MaxResults?: number;
  NextToken?: string;
  PlaybackConfigurationName: string;
  ScheduleType?: ListPrefetchScheduleType;
  StreamId?: string;
}
export const ListPrefetchSchedulesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    PlaybackConfigurationName: S.String.pipe(
      T.HttpLabel("PlaybackConfigurationName"),
    ),
    ScheduleType: S.optional(ListPrefetchScheduleType),
    StreamId: S.optional(S.String),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/prefetchSchedule/{PlaybackConfigurationName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPrefetchSchedulesRequest",
}) as any as S.Schema<ListPrefetchSchedulesRequest>;
export interface PrefetchSchedule {
  Arn: string;
  Consumption?: PrefetchConsumption;
  Name: string;
  PlaybackConfigurationName: string;
  Retrieval?: PrefetchRetrieval;
  ScheduleType?: PrefetchScheduleType;
  RecurringPrefetchConfiguration?: RecurringPrefetchConfiguration;
  StreamId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const PrefetchSchedule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    Consumption: S.optional(PrefetchConsumption),
    Name: S.String,
    PlaybackConfigurationName: S.String,
    Retrieval: S.optional(PrefetchRetrieval),
    ScheduleType: S.optional(PrefetchScheduleType),
    RecurringPrefetchConfiguration: S.optional(RecurringPrefetchConfiguration),
    StreamId: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "PrefetchSchedule",
}) as any as S.Schema<PrefetchSchedule>;
export type __listOfPrefetchSchedule = PrefetchSchedule[];
export const __listOfPrefetchSchedule = /*@__PURE__*/ S.Array(PrefetchSchedule);
export interface ListPrefetchSchedulesResponse {
  Items?: PrefetchSchedule[];
  NextToken?: string;
}
export const ListPrefetchSchedulesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfPrefetchSchedule),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListPrefetchSchedulesResponse",
}) as any as S.Schema<ListPrefetchSchedulesResponse>;
export interface ListSourceLocationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListSourceLocationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/sourceLocations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSourceLocationsRequest",
}) as any as S.Schema<ListSourceLocationsRequest>;
export interface SourceLocation {
  AccessConfiguration?: AccessConfiguration;
  Arn: string;
  CreationTime?: Date;
  DefaultSegmentDeliveryConfiguration?: DefaultSegmentDeliveryConfiguration;
  HttpConfiguration: HttpConfiguration;
  LastModifiedTime?: Date;
  SegmentDeliveryConfigurations?: SegmentDeliveryConfiguration[];
  SourceLocationName: string;
  Tags?: { [key: string]: string | undefined };
}
export const SourceLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessConfiguration: S.optional(AccessConfiguration),
    Arn: S.String,
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DefaultSegmentDeliveryConfiguration: S.optional(
      DefaultSegmentDeliveryConfiguration,
    ),
    HttpConfiguration: HttpConfiguration,
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SegmentDeliveryConfigurations: S.optional(
      __listOfSegmentDeliveryConfiguration,
    ),
    SourceLocationName: S.String,
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({ identifier: "SourceLocation" }) as any as S.Schema<SourceLocation>;
export type __listOfSourceLocation = SourceLocation[];
export const __listOfSourceLocation = /*@__PURE__*/ S.Array(SourceLocation);
export interface ListSourceLocationsResponse {
  Items?: SourceLocation[];
  NextToken?: string;
}
export const ListSourceLocationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfSourceLocation),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListSourceLocationsResponse",
}) as any as S.Schema<ListSourceLocationsResponse>;
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
  S.Struct({ Tags: S.optional(__mapOf__string) }).pipe(
    S.encodeKeys({ Tags: "tags" }),
  ),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListVodSourcesRequest {
  MaxResults?: number;
  NextToken?: string;
  SourceLocationName: string;
}
export const ListVodSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/sourceLocation/{SourceLocationName}/vodSources",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVodSourcesRequest",
}) as any as S.Schema<ListVodSourcesRequest>;
export interface VodSource {
  Arn: string;
  CreationTime?: Date;
  HttpPackageConfigurations: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  SourceLocationName: string;
  Tags?: { [key: string]: string | undefined };
  VodSourceName: string;
}
export const VodSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String,
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HttpPackageConfigurations: HttpPackageConfigurations,
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SourceLocationName: S.String,
    Tags: S.optional(__mapOf__string),
    VodSourceName: S.String,
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({ identifier: "VodSource" }) as any as S.Schema<VodSource>;
export type __listOfVodSource = VodSource[];
export const __listOfVodSource = /*@__PURE__*/ S.Array(VodSource);
export interface ListVodSourcesResponse {
  Items?: VodSource[];
  NextToken?: string;
}
export const ListVodSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Items: S.optional(__listOfVodSource),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListVodSourcesResponse",
}) as any as S.Schema<ListVodSourcesResponse>;
export interface PutChannelPolicyRequest {
  ChannelName: string;
  Policy: string;
}
export const PutChannelPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    Policy: S.String,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/channel/{ChannelName}/policy" }),
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
export interface PutFunctionRequest {
  FunctionId: string;
  FunctionType: FunctionType;
  Description?: string;
  HttpRequestConfiguration?: HttpRequestConfiguration;
  CustomOutputConfiguration?: CustomOutputConfiguration;
  SequentialExecutorConfiguration?: SequentialExecutorConfiguration;
  Tags?: { [key: string]: string | undefined };
}
export const PutFunctionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionId: S.String.pipe(T.HttpLabel("FunctionId")),
    FunctionType: FunctionType,
    Description: S.optional(S.String),
    HttpRequestConfiguration: S.optional(HttpRequestConfiguration),
    CustomOutputConfiguration: S.optional(CustomOutputConfiguration),
    SequentialExecutorConfiguration: S.optional(
      SequentialExecutorConfiguration,
    ),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/function/{FunctionId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutFunctionRequest",
}) as any as S.Schema<PutFunctionRequest>;
export interface PutFunctionResponse {
  FunctionId: string;
  FunctionType: FunctionType;
  Description?: string;
  HttpRequestConfiguration?: HttpRequestConfiguration;
  CustomOutputConfiguration?: CustomOutputConfiguration;
  SequentialExecutorConfiguration?: SequentialExecutorConfiguration;
  Tags?: { [key: string]: string | undefined };
  Arn?: string;
}
export const PutFunctionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FunctionId: S.String,
    FunctionType: FunctionType,
    Description: S.optional(S.String),
    HttpRequestConfiguration: S.optional(HttpRequestConfiguration),
    CustomOutputConfiguration: S.optional(CustomOutputConfiguration),
    SequentialExecutorConfiguration: S.optional(
      SequentialExecutorConfiguration,
    ),
    Tags: S.optional(__mapOf__string),
    Arn: S.optional(S.String),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "PutFunctionResponse",
}) as any as S.Schema<PutFunctionResponse>;
export type ConfigurationAliasesRequest = {
  [key: string]: { [key: string]: string | undefined } | undefined;
};
export const ConfigurationAliasesRequest = /*@__PURE__*/ S.Record(
  S.String,
  __mapOf__string.pipe(S.optional),
);
export interface DashConfigurationForPut {
  MpdLocation?: string;
  OriginManifestType?: OriginManifestType;
}
export const DashConfigurationForPut = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MpdLocation: S.optional(S.String),
    OriginManifestType: S.optional(OriginManifestType),
  }),
).annotate({
  identifier: "DashConfigurationForPut",
}) as any as S.Schema<DashConfigurationForPut>;
export interface PutPlaybackConfigurationRequest {
  AdDecisionServerUrl?: string;
  AvailSuppression?: AvailSuppression;
  Bumper?: Bumper;
  CdnConfiguration?: CdnConfiguration;
  ConfigurationAliases?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  DashConfiguration?: DashConfigurationForPut;
  InsertionMode?: InsertionMode;
  LivePreRollConfiguration?: LivePreRollConfiguration;
  ManifestProcessingRules?: ManifestProcessingRules;
  Name: string;
  PersonalizationThresholdSeconds?: number;
  SlateAdUrl?: string;
  Tags?: { [key: string]: string | undefined };
  TranscodeProfileName?: string;
  VideoContentSourceUrl?: string;
  AdConditioningConfiguration?: AdConditioningConfiguration;
  AdDecisionServerConfiguration?: AdDecisionServerConfiguration;
  FunctionMapping?: { [key: string]: string | undefined };
}
export const PutPlaybackConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdDecisionServerUrl: S.optional(S.String),
    AvailSuppression: S.optional(AvailSuppression),
    Bumper: S.optional(Bumper),
    CdnConfiguration: S.optional(CdnConfiguration),
    ConfigurationAliases: S.optional(ConfigurationAliasesRequest),
    DashConfiguration: S.optional(DashConfigurationForPut),
    InsertionMode: S.optional(InsertionMode),
    LivePreRollConfiguration: S.optional(LivePreRollConfiguration),
    ManifestProcessingRules: S.optional(ManifestProcessingRules),
    Name: S.String,
    PersonalizationThresholdSeconds: S.optional(S.Number),
    SlateAdUrl: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
    TranscodeProfileName: S.optional(S.String),
    VideoContentSourceUrl: S.optional(S.String),
    AdConditioningConfiguration: S.optional(AdConditioningConfiguration),
    AdDecisionServerConfiguration: S.optional(AdDecisionServerConfiguration),
    FunctionMapping: S.optional(FunctionMapping),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/playbackConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutPlaybackConfigurationRequest",
}) as any as S.Schema<PutPlaybackConfigurationRequest>;
export interface PutPlaybackConfigurationResponse {
  AdDecisionServerUrl?: string;
  AvailSuppression?: AvailSuppression;
  Bumper?: Bumper;
  CdnConfiguration?: CdnConfiguration;
  ConfigurationAliases?: {
    [key: string]: { [key: string]: string | undefined } | undefined;
  };
  DashConfiguration?: DashConfiguration;
  HlsConfiguration?: HlsConfiguration;
  InsertionMode?: InsertionMode;
  LivePreRollConfiguration?: LivePreRollConfiguration;
  LogConfiguration?: LogConfiguration & {
    EnabledLoggingStrategies: __listOfLoggingStrategies;
  };
  ManifestProcessingRules?: ManifestProcessingRules;
  Name?: string;
  PersonalizationThresholdSeconds?: number;
  PlaybackConfigurationArn?: string;
  PlaybackEndpointPrefix?: string;
  SessionInitializationEndpointPrefix?: string;
  SlateAdUrl?: string;
  Tags?: { [key: string]: string | undefined };
  TranscodeProfileName?: string;
  VideoContentSourceUrl?: string;
  AdConditioningConfiguration?: AdConditioningConfiguration;
  AdDecisionServerConfiguration?: AdDecisionServerConfiguration;
  FunctionMapping?: { [key: string]: string | undefined };
}
export const PutPlaybackConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdDecisionServerUrl: S.optional(S.String),
    AvailSuppression: S.optional(AvailSuppression),
    Bumper: S.optional(Bumper),
    CdnConfiguration: S.optional(CdnConfiguration),
    ConfigurationAliases: S.optional(ConfigurationAliasesResponse),
    DashConfiguration: S.optional(DashConfiguration),
    HlsConfiguration: S.optional(HlsConfiguration),
    InsertionMode: S.optional(InsertionMode),
    LivePreRollConfiguration: S.optional(LivePreRollConfiguration),
    LogConfiguration: S.optional(LogConfiguration),
    ManifestProcessingRules: S.optional(ManifestProcessingRules),
    Name: S.optional(S.String),
    PersonalizationThresholdSeconds: S.optional(S.Number),
    PlaybackConfigurationArn: S.optional(S.String),
    PlaybackEndpointPrefix: S.optional(S.String),
    SessionInitializationEndpointPrefix: S.optional(S.String),
    SlateAdUrl: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
    TranscodeProfileName: S.optional(S.String),
    VideoContentSourceUrl: S.optional(S.String),
    AdConditioningConfiguration: S.optional(AdConditioningConfiguration),
    AdDecisionServerConfiguration: S.optional(AdDecisionServerConfiguration),
    FunctionMapping: S.optional(FunctionMapping),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "PutPlaybackConfigurationResponse",
}) as any as S.Schema<PutPlaybackConfigurationResponse>;
export interface StartChannelRequest {
  ChannelName: string;
}
export const StartChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")) }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/channel/{ChannelName}/start" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartChannelRequest",
}) as any as S.Schema<StartChannelRequest>;
export interface StartChannelResponse {}
export const StartChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartChannelResponse",
}) as any as S.Schema<StartChannelResponse>;
export interface StopChannelRequest {
  ChannelName: string;
}
export const StopChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelName: S.String.pipe(T.HttpLabel("ChannelName")) }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/channel/{ChannelName}/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopChannelRequest",
}) as any as S.Schema<StopChannelRequest>;
export interface StopChannelResponse {}
export const StopChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopChannelResponse",
}) as any as S.Schema<StopChannelResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: __mapOf__string,
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
  TagKeys: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: __listOf__string.pipe(T.HttpQuery("tagKeys")),
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
  ChannelName: string;
  FillerSlate?: SlateSource;
  Outputs: RequestOutputItem[];
  TimeShiftConfiguration?: TimeShiftConfiguration;
  Audiences?: string[];
}
export const UpdateChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    FillerSlate: S.optional(SlateSource),
    Outputs: RequestOutputs,
    TimeShiftConfiguration: S.optional(TimeShiftConfiguration),
    Audiences: S.optional(Audiences),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/channel/{ChannelName}" }),
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
  Arn?: string;
  ChannelName?: string;
  ChannelState?: ChannelState;
  CreationTime?: Date;
  FillerSlate?: SlateSource;
  LastModifiedTime?: Date;
  Outputs?: ResponseOutputItem[];
  PlaybackMode?: string;
  Tags?: { [key: string]: string | undefined };
  Tier?: string;
  TimeShiftConfiguration?: TimeShiftConfiguration;
  Audiences?: string[];
}
export const UpdateChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelName: S.optional(S.String),
    ChannelState: S.optional(ChannelState),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    FillerSlate: S.optional(SlateSource),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    Outputs: S.optional(ResponseOutputs),
    PlaybackMode: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
    Tier: S.optional(S.String),
    TimeShiftConfiguration: S.optional(TimeShiftConfiguration),
    Audiences: S.optional(Audiences),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "UpdateChannelResponse",
}) as any as S.Schema<UpdateChannelResponse>;
export interface UpdateLiveSourceRequest {
  HttpPackageConfigurations: HttpPackageConfiguration[];
  LiveSourceName: string;
  SourceLocationName: string;
}
export const UpdateLiveSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HttpPackageConfigurations: HttpPackageConfigurations,
    LiveSourceName: S.String.pipe(T.HttpLabel("LiveSourceName")),
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/sourceLocation/{SourceLocationName}/liveSource/{LiveSourceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateLiveSourceRequest",
}) as any as S.Schema<UpdateLiveSourceRequest>;
export interface UpdateLiveSourceResponse {
  Arn?: string;
  CreationTime?: Date;
  HttpPackageConfigurations?: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  LiveSourceName?: string;
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const UpdateLiveSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HttpPackageConfigurations: S.optional(HttpPackageConfigurations),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    LiveSourceName: S.optional(S.String),
    SourceLocationName: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "UpdateLiveSourceResponse",
}) as any as S.Schema<UpdateLiveSourceResponse>;
export interface UpdateProgramTransition {
  ScheduledStartTimeMillis?: number;
  DurationMillis?: number;
}
export const UpdateProgramTransition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ScheduledStartTimeMillis: S.optional(S.Number),
    DurationMillis: S.optional(S.Number),
  }),
).annotate({
  identifier: "UpdateProgramTransition",
}) as any as S.Schema<UpdateProgramTransition>;
export interface UpdateProgramScheduleConfiguration {
  Transition?: UpdateProgramTransition;
  ClipRange?: ClipRange;
}
export const UpdateProgramScheduleConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Transition: S.optional(UpdateProgramTransition),
    ClipRange: S.optional(ClipRange),
  }),
).annotate({
  identifier: "UpdateProgramScheduleConfiguration",
}) as any as S.Schema<UpdateProgramScheduleConfiguration>;
export interface UpdateProgramRequest {
  AdBreaks?: AdBreak[];
  ChannelName: string;
  ProgramName: string;
  ScheduleConfiguration: UpdateProgramScheduleConfiguration;
  AudienceMedia?: AudienceMedia[];
}
export const UpdateProgramRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdBreaks: S.optional(__listOfAdBreak),
    ChannelName: S.String.pipe(T.HttpLabel("ChannelName")),
    ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
    ScheduleConfiguration: UpdateProgramScheduleConfiguration,
    AudienceMedia: S.optional(__listOfAudienceMedia),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/channel/{ChannelName}/program/{ProgramName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProgramRequest",
}) as any as S.Schema<UpdateProgramRequest>;
export interface UpdateProgramResponse {
  AdBreaks?: AdBreak[];
  Arn?: string;
  ChannelName?: string;
  CreationTime?: Date;
  ProgramName?: string;
  SourceLocationName?: string;
  VodSourceName?: string;
  LiveSourceName?: string;
  ClipRange?: ClipRange;
  DurationMillis?: number;
  ScheduledStartTime?: Date;
  AudienceMedia?: AudienceMedia[];
  Tags?: { [key: string]: string | undefined };
}
export const UpdateProgramResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdBreaks: S.optional(__listOfAdBreak),
    Arn: S.optional(S.String),
    ChannelName: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    ProgramName: S.optional(S.String),
    SourceLocationName: S.optional(S.String),
    VodSourceName: S.optional(S.String),
    LiveSourceName: S.optional(S.String),
    ClipRange: S.optional(ClipRange),
    DurationMillis: S.optional(S.Number),
    ScheduledStartTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    AudienceMedia: S.optional(__listOfAudienceMedia),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "UpdateProgramResponse",
}) as any as S.Schema<UpdateProgramResponse>;
export interface UpdateSourceLocationRequest {
  AccessConfiguration?: AccessConfiguration;
  DefaultSegmentDeliveryConfiguration?: DefaultSegmentDeliveryConfiguration;
  HttpConfiguration: HttpConfiguration;
  SegmentDeliveryConfigurations?: SegmentDeliveryConfiguration[];
  SourceLocationName: string;
}
export const UpdateSourceLocationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessConfiguration: S.optional(AccessConfiguration),
    DefaultSegmentDeliveryConfiguration: S.optional(
      DefaultSegmentDeliveryConfiguration,
    ),
    HttpConfiguration: HttpConfiguration,
    SegmentDeliveryConfigurations: S.optional(
      __listOfSegmentDeliveryConfiguration,
    ),
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/sourceLocation/{SourceLocationName}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateSourceLocationRequest",
}) as any as S.Schema<UpdateSourceLocationRequest>;
export interface UpdateSourceLocationResponse {
  AccessConfiguration?: AccessConfiguration;
  Arn?: string;
  CreationTime?: Date;
  DefaultSegmentDeliveryConfiguration?: DefaultSegmentDeliveryConfiguration;
  HttpConfiguration?: HttpConfiguration;
  LastModifiedTime?: Date;
  SegmentDeliveryConfigurations?: SegmentDeliveryConfiguration[];
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
}
export const UpdateSourceLocationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessConfiguration: S.optional(AccessConfiguration),
    Arn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    DefaultSegmentDeliveryConfiguration: S.optional(
      DefaultSegmentDeliveryConfiguration,
    ),
    HttpConfiguration: S.optional(HttpConfiguration),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SegmentDeliveryConfigurations: S.optional(
      __listOfSegmentDeliveryConfiguration,
    ),
    SourceLocationName: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "UpdateSourceLocationResponse",
}) as any as S.Schema<UpdateSourceLocationResponse>;
export interface UpdateVodSourceRequest {
  HttpPackageConfigurations: HttpPackageConfiguration[];
  SourceLocationName: string;
  VodSourceName: string;
}
export const UpdateVodSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HttpPackageConfigurations: HttpPackageConfigurations,
    SourceLocationName: S.String.pipe(T.HttpLabel("SourceLocationName")),
    VodSourceName: S.String.pipe(T.HttpLabel("VodSourceName")),
  }).pipe(
    T.all(
      T.Http({
        method: "PUT",
        uri: "/sourceLocation/{SourceLocationName}/vodSource/{VodSourceName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateVodSourceRequest",
}) as any as S.Schema<UpdateVodSourceRequest>;
export interface UpdateVodSourceResponse {
  Arn?: string;
  CreationTime?: Date;
  HttpPackageConfigurations?: HttpPackageConfiguration[];
  LastModifiedTime?: Date;
  SourceLocationName?: string;
  Tags?: { [key: string]: string | undefined };
  VodSourceName?: string;
}
export const UpdateVodSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    HttpPackageConfigurations: S.optional(HttpPackageConfigurations),
    LastModifiedTime: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    SourceLocationName: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
    VodSourceName: S.optional(S.String),
  }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "UpdateVodSourceResponse",
}) as any as S.Schema<UpdateVodSourceResponse>;
export type ConfigureLogsForChannelError = CommonErrors;
/**
 * Configures Amazon CloudWatch log settings for a channel.
 */
export const configureLogsForChannel: API.OperationMethod<
  ConfigureLogsForChannelRequest,
  ConfigureLogsForChannelResponse,
  ConfigureLogsForChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConfigureLogsForChannelRequest,
  output: ConfigureLogsForChannelResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfigureLogsForChannel",
}));

export type ConfigureLogsForPlaybackConfigurationError = CommonErrors;
/**
 * Defines where AWS Elemental MediaTailor sends logs for the playback configuration.
 */
export const configureLogsForPlaybackConfiguration: API.OperationMethod<
  ConfigureLogsForPlaybackConfigurationRequest,
  ConfigureLogsForPlaybackConfigurationResponse,
  ConfigureLogsForPlaybackConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ConfigureLogsForPlaybackConfigurationRequest,
  output: ConfigureLogsForPlaybackConfigurationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfigureLogsForPlaybackConfiguration",
}));

export type CreateChannelError = CommonErrors;
/**
 * Creates a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const createChannel: API.OperationMethod<
  CreateChannelRequest,
  CreateChannelResponse,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChannelRequest,
  output: CreateChannelResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
}));

export type CreateLiveSourceError = CommonErrors;
/**
 * The live source configuration.
 */
export const createLiveSource: API.OperationMethod<
  CreateLiveSourceRequest,
  CreateLiveSourceResponse,
  CreateLiveSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateLiveSourceRequest,
  output: CreateLiveSourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLiveSource",
}));

export type CreatePrefetchScheduleError =
  | BadRequestException
  | PlaybackConfigurationNotFound
  | CommonErrors;
/**
 * Creates a prefetch schedule for a playback configuration. A prefetch schedule allows you to tell MediaTailor to fetch and prepare certain ads before an ad break happens. For more information about ad prefetching, see Using ad prefetching in the *MediaTailor User Guide*.
 */
export const createPrefetchSchedule: API.OperationMethod<
  CreatePrefetchScheduleRequest,
  CreatePrefetchScheduleResponse,
  CreatePrefetchScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePrefetchScheduleRequest,
  output: CreatePrefetchScheduleResponse,
  errors: [BadRequestException, PlaybackConfigurationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePrefetchSchedule",
}));

export type CreateProgramError =
  | BadRequestException
  | ChannelNotFound
  | CommonErrors;
/**
 * Creates a program within a channel. For information about programs, see Working with programs in the *MediaTailor User Guide*.
 */
export const createProgram: API.OperationMethod<
  CreateProgramRequest,
  CreateProgramResponse,
  CreateProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateProgramRequest,
  output: CreateProgramResponse,
  errors: [BadRequestException, ChannelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProgram",
}));

export type CreateSourceLocationError = CommonErrors;
/**
 * Creates a source location. A source location is a container for sources. For more information about source locations, see Working with source locations in the *MediaTailor User Guide*.
 */
export const createSourceLocation: API.OperationMethod<
  CreateSourceLocationRequest,
  CreateSourceLocationResponse,
  CreateSourceLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSourceLocationRequest,
  output: CreateSourceLocationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSourceLocation",
}));

export type CreateVodSourceError = CommonErrors;
/**
 * The VOD source configuration parameters.
 */
export const createVodSource: API.OperationMethod<
  CreateVodSourceRequest,
  CreateVodSourceResponse,
  CreateVodSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateVodSourceRequest,
  output: CreateVodSourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVodSource",
}));

export type DeleteChannelError = CommonErrors;
/**
 * Deletes a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelRequest,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChannelRequest,
  output: DeleteChannelResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
}));

export type DeleteChannelPolicyError = CommonErrors;
/**
 * The channel policy to delete.
 */
export const deleteChannelPolicy: API.OperationMethod<
  DeleteChannelPolicyRequest,
  DeleteChannelPolicyResponse,
  DeleteChannelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChannelPolicyRequest,
  output: DeleteChannelPolicyResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelPolicy",
}));

export type DeleteFunctionError = CommonErrors;
/**
 * Deletes a function. MediaTailor prevents deletion of a function that is still referenced by a playback configuration or by another function. Remove all references before deleting. For more information about functions, see Working with functions in the *MediaTailor User Guide*.
 */
export const deleteFunction: API.OperationMethod<
  DeleteFunctionRequest,
  DeleteFunctionResponse,
  DeleteFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteFunctionRequest,
  output: DeleteFunctionResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunction",
}));

export type DeleteLiveSourceError = CommonErrors;
/**
 * The live source to delete.
 */
export const deleteLiveSource: API.OperationMethod<
  DeleteLiveSourceRequest,
  DeleteLiveSourceResponse,
  DeleteLiveSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteLiveSourceRequest,
  output: DeleteLiveSourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLiveSource",
}));

export type DeletePlaybackConfigurationError = CommonErrors;
/**
 * Deletes a playback configuration. For information about MediaTailor configurations, see Working with configurations in AWS Elemental MediaTailor.
 */
export const deletePlaybackConfiguration: API.OperationMethod<
  DeletePlaybackConfigurationRequest,
  DeletePlaybackConfigurationResponse,
  DeletePlaybackConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePlaybackConfigurationRequest,
  output: DeletePlaybackConfigurationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePlaybackConfiguration",
}));

export type DeletePrefetchScheduleError =
  | BadRequestException
  | PrefetchScheduleNotFound
  | CommonErrors;
/**
 * Deletes a prefetch schedule for a specific playback configuration. If you call `DeletePrefetchSchedule` on an expired prefetch schedule, MediaTailor returns an HTTP 404 status code. For more information about ad prefetching, see Using ad prefetching in the *MediaTailor User Guide*.
 */
export const deletePrefetchSchedule: API.OperationMethod<
  DeletePrefetchScheduleRequest,
  DeletePrefetchScheduleResponse,
  DeletePrefetchScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePrefetchScheduleRequest,
  output: DeletePrefetchScheduleResponse,
  errors: [BadRequestException, PrefetchScheduleNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePrefetchSchedule",
}));

export type DeleteProgramError =
  | BadRequestException
  | ProgramNotFound
  | CommonErrors;
/**
 * Deletes a program within a channel. For information about programs, see Working with programs in the *MediaTailor User Guide*.
 */
export const deleteProgram: API.OperationMethod<
  DeleteProgramRequest,
  DeleteProgramResponse,
  DeleteProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteProgramRequest,
  output: DeleteProgramResponse,
  errors: [BadRequestException, ProgramNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProgram",
}));

export type DeleteSourceLocationError = CommonErrors;
/**
 * Deletes a source location. A source location is a container for sources. For more information about source locations, see Working with source locations in the *MediaTailor User Guide*.
 */
export const deleteSourceLocation: API.OperationMethod<
  DeleteSourceLocationRequest,
  DeleteSourceLocationResponse,
  DeleteSourceLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSourceLocationRequest,
  output: DeleteSourceLocationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSourceLocation",
}));

export type DeleteVodSourceError = CommonErrors;
/**
 * The video on demand (VOD) source to delete.
 */
export const deleteVodSource: API.OperationMethod<
  DeleteVodSourceRequest,
  DeleteVodSourceResponse,
  DeleteVodSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteVodSourceRequest,
  output: DeleteVodSourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVodSource",
}));

export type DescribeChannelError = CommonErrors;
/**
 * Describes a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const describeChannel: API.OperationMethod<
  DescribeChannelRequest,
  DescribeChannelResponse,
  DescribeChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeChannelRequest,
  output: DescribeChannelResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChannel",
}));

export type DescribeLiveSourceError = CommonErrors;
/**
 * The live source to describe.
 */
export const describeLiveSource: API.OperationMethod<
  DescribeLiveSourceRequest,
  DescribeLiveSourceResponse,
  DescribeLiveSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeLiveSourceRequest,
  output: DescribeLiveSourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLiveSource",
}));

export type DescribeProgramError =
  | BadRequestException
  | ProgramNotFound
  | CommonErrors;
/**
 * Describes a program within a channel. For information about programs, see Working with programs in the *MediaTailor User Guide*.
 */
export const describeProgram: API.OperationMethod<
  DescribeProgramRequest,
  DescribeProgramResponse,
  DescribeProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeProgramRequest,
  output: DescribeProgramResponse,
  errors: [BadRequestException, ProgramNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProgram",
}));

export type DescribeSourceLocationError = CommonErrors;
/**
 * Describes a source location. A source location is a container for sources. For more information about source locations, see Working with source locations in the *MediaTailor User Guide*.
 */
export const describeSourceLocation: API.OperationMethod<
  DescribeSourceLocationRequest,
  DescribeSourceLocationResponse,
  DescribeSourceLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSourceLocationRequest,
  output: DescribeSourceLocationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSourceLocation",
}));

export type DescribeVodSourceError = CommonErrors;
/**
 * Provides details about a specific video on demand (VOD) source in a specific source location.
 */
export const describeVodSource: API.OperationMethod<
  DescribeVodSourceRequest,
  DescribeVodSourceResponse,
  DescribeVodSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeVodSourceRequest,
  output: DescribeVodSourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVodSource",
}));

export type GetChannelPolicyError = CommonErrors;
/**
 * Returns the channel's IAM policy. IAM policies are used to control access to your channel.
 */
export const getChannelPolicy: API.OperationMethod<
  GetChannelPolicyRequest,
  GetChannelPolicyResponse,
  GetChannelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetChannelPolicyRequest,
  output: GetChannelPolicyResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannelPolicy",
}));

export type GetChannelScheduleError =
  | BadRequestException
  | ChannelNotFound
  | CommonErrors;
/**
 * Retrieves information about your channel's schedule.
 */
export const getChannelSchedule: API.PaginatedOperationMethod<
  GetChannelScheduleRequest,
  GetChannelScheduleResponse,
  GetChannelScheduleError,
  Credentials | HttpClient.HttpClient,
  ScheduleEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: GetChannelScheduleRequest,
  output: GetChannelScheduleResponse,
  errors: [BadRequestException, ChannelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetChannelSchedule",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetFunctionError = CommonErrors;
/**
 * Retrieves the configuration and metadata for a function. For more information about functions, see Working with functions in the *MediaTailor User Guide*.
 */
export const getFunction: API.OperationMethod<
  GetFunctionRequest,
  GetFunctionResponse,
  GetFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetFunctionRequest,
  output: GetFunctionResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunction",
}));

export type GetPlaybackConfigurationError =
  | PlaybackConfigurationNotFound
  | CommonErrors;
/**
 * Retrieves a playback configuration. For information about MediaTailor configurations, see Working with configurations in AWS Elemental MediaTailor.
 */
export const getPlaybackConfiguration: API.OperationMethod<
  GetPlaybackConfigurationRequest,
  GetPlaybackConfigurationResponse,
  GetPlaybackConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPlaybackConfigurationRequest,
  output: GetPlaybackConfigurationResponse,
  errors: [PlaybackConfigurationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPlaybackConfiguration",
}));

export type GetPrefetchScheduleError =
  | BadRequestException
  | PrefetchScheduleNotFound
  | CommonErrors;
/**
 * Retrieves a prefetch schedule for a playback configuration. A prefetch schedule allows you to tell MediaTailor to fetch and prepare certain ads before an ad break happens. For more information about ad prefetching, see Using ad prefetching in the *MediaTailor User Guide*.
 */
export const getPrefetchSchedule: API.OperationMethod<
  GetPrefetchScheduleRequest,
  GetPrefetchScheduleResponse,
  GetPrefetchScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPrefetchScheduleRequest,
  output: GetPrefetchScheduleResponse,
  errors: [BadRequestException, PrefetchScheduleNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrefetchSchedule",
}));

export type ListAlertsError = BadRequestException | CommonErrors;
/**
 * Lists the alerts that are associated with a MediaTailor channel assembly resource.
 */
export const listAlerts: API.PaginatedOperationMethod<
  ListAlertsRequest,
  ListAlertsResponse,
  ListAlertsError,
  Credentials | HttpClient.HttpClient,
  Alert
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAlertsRequest,
  output: ListAlertsResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAlerts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelsError = CommonErrors;
/**
 * Retrieves information about the channels that are associated with the current AWS account.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  Channel
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChannelsRequest,
  output: ListChannelsResponse,
  errors: [],
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

export type ListFunctionsError = CommonErrors;
/**
 * Retrieves all functions associated with your AWS account in the current Region. For more information about functions, see Working with functions in the *MediaTailor User Guide*.
 */
export const listFunctions: API.PaginatedOperationMethod<
  ListFunctionsRequest,
  ListFunctionsResponse,
  ListFunctionsError,
  Credentials | HttpClient.HttpClient,
  Function
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListFunctionsRequest,
  output: ListFunctionsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLiveSourcesError = CommonErrors;
/**
 * Lists the live sources contained in a source location. A source represents a piece of content.
 */
export const listLiveSources: API.PaginatedOperationMethod<
  ListLiveSourcesRequest,
  ListLiveSourcesResponse,
  ListLiveSourcesError,
  Credentials | HttpClient.HttpClient,
  LiveSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListLiveSourcesRequest,
  output: ListLiveSourcesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLiveSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPlaybackConfigurationsError = CommonErrors;
/**
 * Retrieves existing playback configurations. For information about MediaTailor configurations, see Working with Configurations in AWS Elemental MediaTailor.
 */
export const listPlaybackConfigurations: API.PaginatedOperationMethod<
  ListPlaybackConfigurationsRequest,
  ListPlaybackConfigurationsResponse,
  ListPlaybackConfigurationsError,
  Credentials | HttpClient.HttpClient,
  PlaybackConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPlaybackConfigurationsRequest,
  output: ListPlaybackConfigurationsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPlaybackConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPrefetchSchedulesError =
  | BadRequestException
  | PlaybackConfigurationNotFound
  | CommonErrors;
/**
 * Lists the prefetch schedules for a playback configuration.
 */
export const listPrefetchSchedules: API.PaginatedOperationMethod<
  ListPrefetchSchedulesRequest,
  ListPrefetchSchedulesResponse,
  ListPrefetchSchedulesError,
  Credentials | HttpClient.HttpClient,
  PrefetchSchedule
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPrefetchSchedulesRequest,
  output: ListPrefetchSchedulesResponse,
  errors: [BadRequestException, PlaybackConfigurationNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrefetchSchedules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSourceLocationsError = CommonErrors;
/**
 * Lists the source locations for a channel. A source location defines the host server URL, and contains a list of sources.
 */
export const listSourceLocations: API.PaginatedOperationMethod<
  ListSourceLocationsRequest,
  ListSourceLocationsResponse,
  ListSourceLocationsError,
  Credentials | HttpClient.HttpClient,
  SourceLocation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSourceLocationsRequest,
  output: ListSourceLocationsResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSourceLocations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = BadRequestException | CommonErrors;
/**
 * A list of tags that are associated with this resource. Tags are key-value pairs that you can associate with Amazon resources to help with organization, access control, and cost tracking. For more information, see Tagging AWS Elemental MediaTailor Resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListVodSourcesError = CommonErrors;
/**
 * Lists the VOD sources contained in a source location. A source represents a piece of content.
 */
export const listVodSources: API.PaginatedOperationMethod<
  ListVodSourcesRequest,
  ListVodSourcesResponse,
  ListVodSourcesError,
  Credentials | HttpClient.HttpClient,
  VodSource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVodSourcesRequest,
  output: ListVodSourcesResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVodSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Items",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutChannelPolicyError = CommonErrors;
/**
 * Creates an IAM policy for the channel. IAM policies are used to control access to your channel.
 */
export const putChannelPolicy: API.OperationMethod<
  PutChannelPolicyRequest,
  PutChannelPolicyResponse,
  PutChannelPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutChannelPolicyRequest,
  output: PutChannelPolicyResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutChannelPolicy",
}));

export type PutFunctionError = CommonErrors;
/**
 * Creates or updates a function. A function defines reusable logic that MediaTailor executes at lifecycle hooks during ad insertion. For more information about functions, see Working with functions in the *MediaTailor User Guide*.
 */
export const putFunction: API.OperationMethod<
  PutFunctionRequest,
  PutFunctionResponse,
  PutFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutFunctionRequest,
  output: PutFunctionResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFunction",
}));

export type PutPlaybackConfigurationError = CommonErrors;
/**
 * Creates a playback configuration. For information about MediaTailor configurations, see Working with configurations in AWS Elemental MediaTailor.
 */
export const putPlaybackConfiguration: API.OperationMethod<
  PutPlaybackConfigurationRequest,
  PutPlaybackConfigurationResponse,
  PutPlaybackConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutPlaybackConfigurationRequest,
  output: PutPlaybackConfigurationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPlaybackConfiguration",
}));

export type StartChannelError =
  | BadRequestException
  | ChannelNotFound
  | CommonErrors;
/**
 * Starts a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const startChannel: API.OperationMethod<
  StartChannelRequest,
  StartChannelResponse,
  StartChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartChannelRequest,
  output: StartChannelResponse,
  errors: [BadRequestException, ChannelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartChannel",
}));

export type StopChannelError =
  | BadRequestException
  | ChannelNotFound
  | CommonErrors;
/**
 * Stops a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const stopChannel: API.OperationMethod<
  StopChannelRequest,
  StopChannelResponse,
  StopChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopChannelRequest,
  output: StopChannelResponse,
  errors: [BadRequestException, ChannelNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopChannel",
}));

export type TagResourceError = BadRequestException | CommonErrors;
/**
 * The resource to tag. Tags are key-value pairs that you can associate with Amazon resources to help with organization, access control, and cost tracking. For more information, see Tagging AWS Elemental MediaTailor Resources.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = BadRequestException | CommonErrors;
/**
 * The resource to untag.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [BadRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateChannelError = CommonErrors;
/**
 * Updates a channel. For information about MediaTailor channels, see Working with channels in the *MediaTailor User Guide*.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelRequest,
  UpdateChannelResponse,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateChannelRequest,
  output: UpdateChannelResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannel",
}));

export type UpdateLiveSourceError = CommonErrors;
/**
 * Updates a live source's configuration.
 */
export const updateLiveSource: API.OperationMethod<
  UpdateLiveSourceRequest,
  UpdateLiveSourceResponse,
  UpdateLiveSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateLiveSourceRequest,
  output: UpdateLiveSourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLiveSource",
}));

export type UpdateProgramError =
  | BadRequestException
  | ProgramNotFound
  | CommonErrors;
/**
 * Updates a program within a channel.
 */
export const updateProgram: API.OperationMethod<
  UpdateProgramRequest,
  UpdateProgramResponse,
  UpdateProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateProgramRequest,
  output: UpdateProgramResponse,
  errors: [BadRequestException, ProgramNotFound],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProgram",
}));

export type UpdateSourceLocationError = CommonErrors;
/**
 * Updates a source location. A source location is a container for sources. For more information about source locations, see Working with source locations in the *MediaTailor User Guide*.
 */
export const updateSourceLocation: API.OperationMethod<
  UpdateSourceLocationRequest,
  UpdateSourceLocationResponse,
  UpdateSourceLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSourceLocationRequest,
  output: UpdateSourceLocationResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSourceLocation",
}));

export type UpdateVodSourceError = CommonErrors;
/**
 * Updates a VOD source's configuration.
 */
export const updateVodSource: API.OperationMethod<
  UpdateVodSourceRequest,
  UpdateVodSourceResponse,
  UpdateVodSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateVodSourceRequest,
  output: UpdateVodSourceResponse,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateVodSource",
}));
