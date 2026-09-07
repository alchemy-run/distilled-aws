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
  sdkId: "MediaLive",
  serviceShapeName: "MediaLive",
});
const auth = T.AwsAuthSigv4({ name: "medialive" });
const ver = T.ServiceVersion("2017-10-14");
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
              `https://medialive-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://medialive-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://medialive.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://medialive.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

export class BadGatewayException
  extends /*@__PURE__*/ S.TaggedError<BadGatewayException>()(
    "BadGatewayException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(502),
  ).pipe(C.withServerError) {}
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
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GatewayTimeoutException
  extends /*@__PURE__*/ S.TaggedError<GatewayTimeoutException>()(
    "GatewayTimeoutException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(504),
  ).pipe(C.withTimeoutError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(500),
  ).pipe(C.withServerError) {}
export class MediaLiveRoleNotYetTrusted
  extends /*@__PURE__*/ S.TaggedError<MediaLiveRoleNotYetTrusted>()(
    "MediaLiveRoleNotYetTrusted",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ValidationErrors: S.optional(
        S.suspend(() => __listOfValidationError).annotate({
          identifier: "__listOfValidationError",
        }),
      ),
    },
    T.SyntheticError({
      from: "UnprocessableEntityException",
      message: { includes: "is a trusted service" },
    }),
  ).pipe(C.withRetryableError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnprocessableEntityException
  extends /*@__PURE__*/ S.TaggedError<UnprocessableEntityException>()(
    "UnprocessableEntityException",
    {
      message: S.optional(S.String).pipe(T.ErrorMessage()),
      ValidationErrors: S.optional(
        S.suspend(() => __listOfValidationError).annotate({
          identifier: "__listOfValidationError",
        }),
      ),
    },
    T.HttpError(422),
  ).pipe(C.withBadRequestError) {}
export interface AcceptInputDeviceTransferRequest {
  InputDeviceId: string;
}
export const AcceptInputDeviceTransferRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/prod/inputDevices/{InputDeviceId}/accept",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "AcceptInputDeviceTransferRequest",
}) as any as S.Schema<AcceptInputDeviceTransferRequest>;
export interface AcceptInputDeviceTransferResponse {}
export const AcceptInputDeviceTransferResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AcceptInputDeviceTransferResponse",
}) as any as S.Schema<AcceptInputDeviceTransferResponse>;
export type __listOf__string = string[];
export const __listOf__string = /*@__PURE__*/ S.Array(S.String);
export interface BatchDeleteRequest {
  ChannelIds?: string[];
  InputIds?: string[];
  InputSecurityGroupIds?: string[];
  MultiplexIds?: string[];
}
export const BatchDeleteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelIds: S.optional(__listOf__string),
    InputIds: S.optional(__listOf__string),
    InputSecurityGroupIds: S.optional(__listOf__string),
    MultiplexIds: S.optional(__listOf__string),
  })
    .pipe(
      S.encodeKeys({
        ChannelIds: "channelIds",
        InputIds: "inputIds",
        InputSecurityGroupIds: "inputSecurityGroupIds",
        MultiplexIds: "multiplexIds",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/batch/delete" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchDeleteRequest",
}) as any as S.Schema<BatchDeleteRequest>;
export interface BatchFailedResultModel {
  Arn?: string;
  Code?: string;
  Id?: string;
  Message?: string;
}
export const BatchFailedResultModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Code: S.optional(S.String),
    Id: S.optional(S.String),
    Message: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ Arn: "arn", Code: "code", Id: "id", Message: "message" }),
  ),
).annotate({
  identifier: "BatchFailedResultModel",
}) as any as S.Schema<BatchFailedResultModel>;
export type __listOfBatchFailedResultModel = BatchFailedResultModel[];
export const __listOfBatchFailedResultModel = /*@__PURE__*/ S.Array(
  BatchFailedResultModel,
);
export interface BatchSuccessfulResultModel {
  Arn?: string;
  Id?: string;
  State?: string;
}
export const BatchSuccessfulResultModel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    State: S.optional(S.String),
  }).pipe(S.encodeKeys({ Arn: "arn", Id: "id", State: "state" })),
).annotate({
  identifier: "BatchSuccessfulResultModel",
}) as any as S.Schema<BatchSuccessfulResultModel>;
export type __listOfBatchSuccessfulResultModel = BatchSuccessfulResultModel[];
export const __listOfBatchSuccessfulResultModel = /*@__PURE__*/ S.Array(
  BatchSuccessfulResultModel,
);
export interface BatchDeleteResponse {
  Failed?: BatchFailedResultModel[];
  Successful?: BatchSuccessfulResultModel[];
}
export const BatchDeleteResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Failed: S.optional(__listOfBatchFailedResultModel),
    Successful: S.optional(__listOfBatchSuccessfulResultModel),
  }).pipe(S.encodeKeys({ Failed: "failed", Successful: "successful" })),
).annotate({
  identifier: "BatchDeleteResponse",
}) as any as S.Schema<BatchDeleteResponse>;
export interface BatchStartRequest {
  ChannelIds?: string[];
  MultiplexIds?: string[];
}
export const BatchStartRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelIds: S.optional(__listOf__string),
    MultiplexIds: S.optional(__listOf__string),
  })
    .pipe(
      S.encodeKeys({ ChannelIds: "channelIds", MultiplexIds: "multiplexIds" }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/batch/start" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchStartRequest",
}) as any as S.Schema<BatchStartRequest>;
export interface BatchStartResponse {
  Failed?: BatchFailedResultModel[];
  Successful?: BatchSuccessfulResultModel[];
}
export const BatchStartResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Failed: S.optional(__listOfBatchFailedResultModel),
    Successful: S.optional(__listOfBatchSuccessfulResultModel),
  }).pipe(S.encodeKeys({ Failed: "failed", Successful: "successful" })),
).annotate({
  identifier: "BatchStartResponse",
}) as any as S.Schema<BatchStartResponse>;
export interface BatchStopRequest {
  ChannelIds?: string[];
  MultiplexIds?: string[];
}
export const BatchStopRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelIds: S.optional(__listOf__string),
    MultiplexIds: S.optional(__listOf__string),
  })
    .pipe(
      S.encodeKeys({ ChannelIds: "channelIds", MultiplexIds: "multiplexIds" }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/batch/stop" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchStopRequest",
}) as any as S.Schema<BatchStopRequest>;
export interface BatchStopResponse {
  Failed?: BatchFailedResultModel[];
  Successful?: BatchSuccessfulResultModel[];
}
export const BatchStopResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Failed: S.optional(__listOfBatchFailedResultModel),
    Successful: S.optional(__listOfBatchSuccessfulResultModel),
  }).pipe(S.encodeKeys({ Failed: "failed", Successful: "successful" })),
).annotate({
  identifier: "BatchStopResponse",
}) as any as S.Schema<BatchStopResponse>;
export interface HlsId3SegmentTaggingScheduleActionSettings {
  Tag?: string;
  Id3?: string;
}
export const HlsId3SegmentTaggingScheduleActionSettings =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Tag: S.optional(S.String), Id3: S.optional(S.String) }).pipe(
      S.encodeKeys({ Tag: "tag", Id3: "id3" }),
    ),
  ).annotate({
    identifier: "HlsId3SegmentTaggingScheduleActionSettings",
  }) as any as S.Schema<HlsId3SegmentTaggingScheduleActionSettings>;
export interface HlsTimedMetadataScheduleActionSettings {
  Id3?: string;
}
export const HlsTimedMetadataScheduleActionSettings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Id3: S.optional(S.String) }).pipe(S.encodeKeys({ Id3: "id3" })),
).annotate({
  identifier: "HlsTimedMetadataScheduleActionSettings",
}) as any as S.Schema<HlsTimedMetadataScheduleActionSettings>;
export type InputTimecodeSource = "ZEROBASED" | "EMBEDDED" | (string & {});
export const InputTimecodeSource = /*@__PURE__*/ S.String;

export interface StartTimecode {
  Timecode?: string;
}
export const StartTimecode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Timecode: S.optional(S.String) }).pipe(
    S.encodeKeys({ Timecode: "timecode" }),
  ),
).annotate({ identifier: "StartTimecode" }) as any as S.Schema<StartTimecode>;
export type LastFrameClippingBehavior =
  | "EXCLUDE_LAST_FRAME"
  | "INCLUDE_LAST_FRAME"
  | (string & {});
export const LastFrameClippingBehavior = /*@__PURE__*/ S.String;

export interface StopTimecode {
  LastFrameClippingBehavior?: LastFrameClippingBehavior;
  Timecode?: string;
}
export const StopTimecode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LastFrameClippingBehavior: S.optional(LastFrameClippingBehavior),
    Timecode: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      LastFrameClippingBehavior: "lastFrameClippingBehavior",
      Timecode: "timecode",
    }),
  ),
).annotate({ identifier: "StopTimecode" }) as any as S.Schema<StopTimecode>;
export interface InputClippingSettings {
  InputTimecodeSource?: InputTimecodeSource;
  StartTimecode?: StartTimecode;
  StopTimecode?: StopTimecode;
}
export const InputClippingSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputTimecodeSource: S.optional(InputTimecodeSource),
    StartTimecode: S.optional(StartTimecode),
    StopTimecode: S.optional(StopTimecode),
  }).pipe(
    S.encodeKeys({
      InputTimecodeSource: "inputTimecodeSource",
      StartTimecode: "startTimecode",
      StopTimecode: "stopTimecode",
    }),
  ),
).annotate({
  identifier: "InputClippingSettings",
}) as any as S.Schema<InputClippingSettings>;
export interface InputPrepareScheduleActionSettings {
  InputAttachmentNameReference?: string;
  InputClippingSettings?: InputClippingSettings;
  UrlPath?: string[];
}
export const InputPrepareScheduleActionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputAttachmentNameReference: S.optional(S.String),
    InputClippingSettings: S.optional(InputClippingSettings),
    UrlPath: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      InputAttachmentNameReference: "inputAttachmentNameReference",
      InputClippingSettings: "inputClippingSettings",
      UrlPath: "urlPath",
    }),
  ),
).annotate({
  identifier: "InputPrepareScheduleActionSettings",
}) as any as S.Schema<InputPrepareScheduleActionSettings>;
export interface InputSwitchScheduleActionSettings {
  InputAttachmentNameReference?: string;
  InputClippingSettings?: InputClippingSettings;
  UrlPath?: string[];
}
export const InputSwitchScheduleActionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputAttachmentNameReference: S.optional(S.String),
    InputClippingSettings: S.optional(InputClippingSettings),
    UrlPath: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      InputAttachmentNameReference: "inputAttachmentNameReference",
      InputClippingSettings: "inputClippingSettings",
      UrlPath: "urlPath",
    }),
  ),
).annotate({
  identifier: "InputSwitchScheduleActionSettings",
}) as any as S.Schema<InputSwitchScheduleActionSettings>;
export type __longMin0Max86400000 = number;
export interface MotionGraphicsActivateScheduleActionSettings {
  Duration?: number;
  PasswordParam?: string;
  Url?: string;
  Username?: string;
}
export const MotionGraphicsActivateScheduleActionSettings =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Duration: S.optional(S.Number),
      PasswordParam: S.optional(S.String),
      Url: S.optional(S.String),
      Username: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        Duration: "duration",
        PasswordParam: "passwordParam",
        Url: "url",
        Username: "username",
      }),
    ),
  ).annotate({
    identifier: "MotionGraphicsActivateScheduleActionSettings",
  }) as any as S.Schema<MotionGraphicsActivateScheduleActionSettings>;
export interface MotionGraphicsDeactivateScheduleActionSettings {}
export const MotionGraphicsDeactivateScheduleActionSettings =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "MotionGraphicsDeactivateScheduleActionSettings",
  }) as any as S.Schema<MotionGraphicsDeactivateScheduleActionSettings>;
export type PipelineId = "PIPELINE_0" | "PIPELINE_1" | (string & {});
export const PipelineId = /*@__PURE__*/ S.String;

export interface PipelinePauseStateSettings {
  PipelineId?: PipelineId;
}
export const PipelinePauseStateSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PipelineId: S.optional(PipelineId) }).pipe(
    S.encodeKeys({ PipelineId: "pipelineId" }),
  ),
).annotate({
  identifier: "PipelinePauseStateSettings",
}) as any as S.Schema<PipelinePauseStateSettings>;
export type __listOfPipelinePauseStateSettings = PipelinePauseStateSettings[];
export const __listOfPipelinePauseStateSettings = /*@__PURE__*/ S.Array(
  PipelinePauseStateSettings,
);
export interface PauseStateScheduleActionSettings {
  Pipelines?: PipelinePauseStateSettings[];
}
export const PauseStateScheduleActionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pipelines: S.optional(__listOfPipelinePauseStateSettings) }).pipe(
    S.encodeKeys({ Pipelines: "pipelines" }),
  ),
).annotate({
  identifier: "PauseStateScheduleActionSettings",
}) as any as S.Schema<PauseStateScheduleActionSettings>;
export type Scte35InputMode = "FIXED" | "FOLLOW_ACTIVE" | (string & {});
export const Scte35InputMode = /*@__PURE__*/ S.String;

export interface Scte35InputScheduleActionSettings {
  InputAttachmentNameReference?: string;
  Mode?: Scte35InputMode;
}
export const Scte35InputScheduleActionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputAttachmentNameReference: S.optional(S.String),
    Mode: S.optional(Scte35InputMode),
  }).pipe(
    S.encodeKeys({
      InputAttachmentNameReference: "inputAttachmentNameReference",
      Mode: "mode",
    }),
  ),
).annotate({
  identifier: "Scte35InputScheduleActionSettings",
}) as any as S.Schema<Scte35InputScheduleActionSettings>;
export type __longMin0Max4294967295 = number;
export interface Scte35ReturnToNetworkScheduleActionSettings {
  SpliceEventId?: number;
}
export const Scte35ReturnToNetworkScheduleActionSettings =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ SpliceEventId: S.optional(S.Number) }).pipe(
      S.encodeKeys({ SpliceEventId: "spliceEventId" }),
    ),
  ).annotate({
    identifier: "Scte35ReturnToNetworkScheduleActionSettings",
  }) as any as S.Schema<Scte35ReturnToNetworkScheduleActionSettings>;
export type __longMin0Max8589934591 = number;
export interface Scte35SpliceInsertScheduleActionSettings {
  Duration?: number;
  SpliceEventId?: number;
}
export const Scte35SpliceInsertScheduleActionSettings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Duration: S.optional(S.Number),
      SpliceEventId: S.optional(S.Number),
    }).pipe(
      S.encodeKeys({ Duration: "duration", SpliceEventId: "spliceEventId" }),
    ),
).annotate({
  identifier: "Scte35SpliceInsertScheduleActionSettings",
}) as any as S.Schema<Scte35SpliceInsertScheduleActionSettings>;
export type Scte35ArchiveAllowedFlag =
  | "ARCHIVE_NOT_ALLOWED"
  | "ARCHIVE_ALLOWED"
  | (string & {});
export const Scte35ArchiveAllowedFlag = /*@__PURE__*/ S.String;

export type Scte35DeviceRestrictions =
  | "NONE"
  | "RESTRICT_GROUP0"
  | "RESTRICT_GROUP1"
  | "RESTRICT_GROUP2"
  | (string & {});
export const Scte35DeviceRestrictions = /*@__PURE__*/ S.String;

export type Scte35NoRegionalBlackoutFlag =
  | "REGIONAL_BLACKOUT"
  | "NO_REGIONAL_BLACKOUT"
  | (string & {});
export const Scte35NoRegionalBlackoutFlag = /*@__PURE__*/ S.String;

export type Scte35WebDeliveryAllowedFlag =
  | "WEB_DELIVERY_NOT_ALLOWED"
  | "WEB_DELIVERY_ALLOWED"
  | (string & {});
export const Scte35WebDeliveryAllowedFlag = /*@__PURE__*/ S.String;

export interface Scte35DeliveryRestrictions {
  ArchiveAllowedFlag?: Scte35ArchiveAllowedFlag;
  DeviceRestrictions?: Scte35DeviceRestrictions;
  NoRegionalBlackoutFlag?: Scte35NoRegionalBlackoutFlag;
  WebDeliveryAllowedFlag?: Scte35WebDeliveryAllowedFlag;
}
export const Scte35DeliveryRestrictions = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveAllowedFlag: S.optional(Scte35ArchiveAllowedFlag),
    DeviceRestrictions: S.optional(Scte35DeviceRestrictions),
    NoRegionalBlackoutFlag: S.optional(Scte35NoRegionalBlackoutFlag),
    WebDeliveryAllowedFlag: S.optional(Scte35WebDeliveryAllowedFlag),
  }).pipe(
    S.encodeKeys({
      ArchiveAllowedFlag: "archiveAllowedFlag",
      DeviceRestrictions: "deviceRestrictions",
      NoRegionalBlackoutFlag: "noRegionalBlackoutFlag",
      WebDeliveryAllowedFlag: "webDeliveryAllowedFlag",
    }),
  ),
).annotate({
  identifier: "Scte35DeliveryRestrictions",
}) as any as S.Schema<Scte35DeliveryRestrictions>;
export type __integerMin0Max255 = number;
export type Scte35SegmentationCancelIndicator =
  | "SEGMENTATION_EVENT_NOT_CANCELED"
  | "SEGMENTATION_EVENT_CANCELED"
  | (string & {});
export const Scte35SegmentationCancelIndicator = /*@__PURE__*/ S.String;

export type __longMin0Max1099511627775 = number;
export interface Scte35SegmentationDescriptor {
  DeliveryRestrictions?: Scte35DeliveryRestrictions;
  SegmentNum?: number;
  SegmentationCancelIndicator?: Scte35SegmentationCancelIndicator;
  SegmentationDuration?: number;
  SegmentationEventId?: number;
  SegmentationTypeId?: number;
  SegmentationUpid?: string;
  SegmentationUpidType?: number;
  SegmentsExpected?: number;
  SubSegmentNum?: number;
  SubSegmentsExpected?: number;
}
export const Scte35SegmentationDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DeliveryRestrictions: S.optional(Scte35DeliveryRestrictions),
    SegmentNum: S.optional(S.Number),
    SegmentationCancelIndicator: S.optional(Scte35SegmentationCancelIndicator),
    SegmentationDuration: S.optional(S.Number),
    SegmentationEventId: S.optional(S.Number),
    SegmentationTypeId: S.optional(S.Number),
    SegmentationUpid: S.optional(S.String),
    SegmentationUpidType: S.optional(S.Number),
    SegmentsExpected: S.optional(S.Number),
    SubSegmentNum: S.optional(S.Number),
    SubSegmentsExpected: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      DeliveryRestrictions: "deliveryRestrictions",
      SegmentNum: "segmentNum",
      SegmentationCancelIndicator: "segmentationCancelIndicator",
      SegmentationDuration: "segmentationDuration",
      SegmentationEventId: "segmentationEventId",
      SegmentationTypeId: "segmentationTypeId",
      SegmentationUpid: "segmentationUpid",
      SegmentationUpidType: "segmentationUpidType",
      SegmentsExpected: "segmentsExpected",
      SubSegmentNum: "subSegmentNum",
      SubSegmentsExpected: "subSegmentsExpected",
    }),
  ),
).annotate({
  identifier: "Scte35SegmentationDescriptor",
}) as any as S.Schema<Scte35SegmentationDescriptor>;
export interface Scte35DescriptorSettings {
  SegmentationDescriptorScte35DescriptorSettings?: Scte35SegmentationDescriptor;
}
export const Scte35DescriptorSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SegmentationDescriptorScte35DescriptorSettings: S.optional(
      Scte35SegmentationDescriptor,
    ),
  }).pipe(
    S.encodeKeys({
      SegmentationDescriptorScte35DescriptorSettings:
        "segmentationDescriptorScte35DescriptorSettings",
    }),
  ),
).annotate({
  identifier: "Scte35DescriptorSettings",
}) as any as S.Schema<Scte35DescriptorSettings>;
export interface Scte35Descriptor {
  Scte35DescriptorSettings?: Scte35DescriptorSettings;
}
export const Scte35Descriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Scte35DescriptorSettings: S.optional(Scte35DescriptorSettings),
  }).pipe(
    S.encodeKeys({ Scte35DescriptorSettings: "scte35DescriptorSettings" }),
  ),
).annotate({
  identifier: "Scte35Descriptor",
}) as any as S.Schema<Scte35Descriptor>;
export type __listOfScte35Descriptor = Scte35Descriptor[];
export const __listOfScte35Descriptor = /*@__PURE__*/ S.Array(Scte35Descriptor);
export interface Scte35TimeSignalScheduleActionSettings {
  Scte35Descriptors?: Scte35Descriptor[];
}
export const Scte35TimeSignalScheduleActionSettings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Scte35Descriptors: S.optional(__listOfScte35Descriptor) }).pipe(
      S.encodeKeys({ Scte35Descriptors: "scte35Descriptors" }),
    ),
).annotate({
  identifier: "Scte35TimeSignalScheduleActionSettings",
}) as any as S.Schema<Scte35TimeSignalScheduleActionSettings>;
export type __integerMin0 = number;
export type __integerMin1 = number;
export type __stringMax2048 = string;
export interface InputLocation {
  PasswordParam?: string;
  Uri?: string;
  Username?: string;
}
export const InputLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PasswordParam: S.optional(S.String),
    Uri: S.optional(S.String),
    Username: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      PasswordParam: "passwordParam",
      Uri: "uri",
      Username: "username",
    }),
  ),
).annotate({ identifier: "InputLocation" }) as any as S.Schema<InputLocation>;
export type __integerMin0Max7 = number;
export type __integerMin0Max100 = number;
export interface StaticImageActivateScheduleActionSettings {
  Duration?: number;
  FadeIn?: number;
  FadeOut?: number;
  Height?: number;
  Image?: InputLocation;
  ImageX?: number;
  ImageY?: number;
  Layer?: number;
  Opacity?: number;
  Width?: number;
}
export const StaticImageActivateScheduleActionSettings =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Duration: S.optional(S.Number),
      FadeIn: S.optional(S.Number),
      FadeOut: S.optional(S.Number),
      Height: S.optional(S.Number),
      Image: S.optional(InputLocation),
      ImageX: S.optional(S.Number),
      ImageY: S.optional(S.Number),
      Layer: S.optional(S.Number),
      Opacity: S.optional(S.Number),
      Width: S.optional(S.Number),
    }).pipe(
      S.encodeKeys({
        Duration: "duration",
        FadeIn: "fadeIn",
        FadeOut: "fadeOut",
        Height: "height",
        Image: "image",
        ImageX: "imageX",
        ImageY: "imageY",
        Layer: "layer",
        Opacity: "opacity",
        Width: "width",
      }),
    ),
  ).annotate({
    identifier: "StaticImageActivateScheduleActionSettings",
  }) as any as S.Schema<StaticImageActivateScheduleActionSettings>;
export interface StaticImageDeactivateScheduleActionSettings {
  FadeOut?: number;
  Layer?: number;
}
export const StaticImageDeactivateScheduleActionSettings =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FadeOut: S.optional(S.Number),
      Layer: S.optional(S.Number),
    }).pipe(S.encodeKeys({ FadeOut: "fadeOut", Layer: "layer" })),
  ).annotate({
    identifier: "StaticImageDeactivateScheduleActionSettings",
  }) as any as S.Schema<StaticImageDeactivateScheduleActionSettings>;
export interface StaticImageOutputActivateScheduleActionSettings {
  Duration?: number;
  FadeIn?: number;
  FadeOut?: number;
  Height?: number;
  Image?: InputLocation;
  ImageX?: number;
  ImageY?: number;
  Layer?: number;
  Opacity?: number;
  OutputNames?: string[];
  Width?: number;
}
export const StaticImageOutputActivateScheduleActionSettings =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Duration: S.optional(S.Number),
      FadeIn: S.optional(S.Number),
      FadeOut: S.optional(S.Number),
      Height: S.optional(S.Number),
      Image: S.optional(InputLocation),
      ImageX: S.optional(S.Number),
      ImageY: S.optional(S.Number),
      Layer: S.optional(S.Number),
      Opacity: S.optional(S.Number),
      OutputNames: S.optional(__listOf__string),
      Width: S.optional(S.Number),
    }).pipe(
      S.encodeKeys({
        Duration: "duration",
        FadeIn: "fadeIn",
        FadeOut: "fadeOut",
        Height: "height",
        Image: "image",
        ImageX: "imageX",
        ImageY: "imageY",
        Layer: "layer",
        Opacity: "opacity",
        OutputNames: "outputNames",
        Width: "width",
      }),
    ),
  ).annotate({
    identifier: "StaticImageOutputActivateScheduleActionSettings",
  }) as any as S.Schema<StaticImageOutputActivateScheduleActionSettings>;
export interface StaticImageOutputDeactivateScheduleActionSettings {
  FadeOut?: number;
  Layer?: number;
  OutputNames?: string[];
}
export const StaticImageOutputDeactivateScheduleActionSettings =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FadeOut: S.optional(S.Number),
      Layer: S.optional(S.Number),
      OutputNames: S.optional(__listOf__string),
    }).pipe(
      S.encodeKeys({
        FadeOut: "fadeOut",
        Layer: "layer",
        OutputNames: "outputNames",
      }),
    ),
  ).annotate({
    identifier: "StaticImageOutputDeactivateScheduleActionSettings",
  }) as any as S.Schema<StaticImageOutputDeactivateScheduleActionSettings>;
export interface Id3SegmentTaggingScheduleActionSettings {
  Id3?: string;
  Tag?: string;
}
export const Id3SegmentTaggingScheduleActionSettings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Id3: S.optional(S.String), Tag: S.optional(S.String) }).pipe(
      S.encodeKeys({ Id3: "id3", Tag: "tag" }),
    ),
).annotate({
  identifier: "Id3SegmentTaggingScheduleActionSettings",
}) as any as S.Schema<Id3SegmentTaggingScheduleActionSettings>;
export interface TimedMetadataScheduleActionSettings {
  Id3?: string;
}
export const TimedMetadataScheduleActionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id3: S.optional(S.String) }).pipe(S.encodeKeys({ Id3: "id3" })),
).annotate({
  identifier: "TimedMetadataScheduleActionSettings",
}) as any as S.Schema<TimedMetadataScheduleActionSettings>;
export interface ScheduleActionSettings {
  HlsId3SegmentTaggingSettings?: HlsId3SegmentTaggingScheduleActionSettings;
  HlsTimedMetadataSettings?: HlsTimedMetadataScheduleActionSettings;
  InputPrepareSettings?: InputPrepareScheduleActionSettings;
  InputSwitchSettings?: InputSwitchScheduleActionSettings;
  MotionGraphicsImageActivateSettings?: MotionGraphicsActivateScheduleActionSettings;
  MotionGraphicsImageDeactivateSettings?: MotionGraphicsDeactivateScheduleActionSettings;
  PauseStateSettings?: PauseStateScheduleActionSettings;
  Scte35InputSettings?: Scte35InputScheduleActionSettings;
  Scte35ReturnToNetworkSettings?: Scte35ReturnToNetworkScheduleActionSettings;
  Scte35SpliceInsertSettings?: Scte35SpliceInsertScheduleActionSettings;
  Scte35TimeSignalSettings?: Scte35TimeSignalScheduleActionSettings;
  StaticImageActivateSettings?: StaticImageActivateScheduleActionSettings;
  StaticImageDeactivateSettings?: StaticImageDeactivateScheduleActionSettings;
  StaticImageOutputActivateSettings?: StaticImageOutputActivateScheduleActionSettings;
  StaticImageOutputDeactivateSettings?: StaticImageOutputDeactivateScheduleActionSettings;
  Id3SegmentTaggingSettings?: Id3SegmentTaggingScheduleActionSettings;
  TimedMetadataSettings?: TimedMetadataScheduleActionSettings;
}
export const ScheduleActionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HlsId3SegmentTaggingSettings: S.optional(
      HlsId3SegmentTaggingScheduleActionSettings,
    ),
    HlsTimedMetadataSettings: S.optional(
      HlsTimedMetadataScheduleActionSettings,
    ),
    InputPrepareSettings: S.optional(InputPrepareScheduleActionSettings),
    InputSwitchSettings: S.optional(InputSwitchScheduleActionSettings),
    MotionGraphicsImageActivateSettings: S.optional(
      MotionGraphicsActivateScheduleActionSettings,
    ),
    MotionGraphicsImageDeactivateSettings: S.optional(
      MotionGraphicsDeactivateScheduleActionSettings,
    ),
    PauseStateSettings: S.optional(PauseStateScheduleActionSettings),
    Scte35InputSettings: S.optional(Scte35InputScheduleActionSettings),
    Scte35ReturnToNetworkSettings: S.optional(
      Scte35ReturnToNetworkScheduleActionSettings,
    ),
    Scte35SpliceInsertSettings: S.optional(
      Scte35SpliceInsertScheduleActionSettings,
    ),
    Scte35TimeSignalSettings: S.optional(
      Scte35TimeSignalScheduleActionSettings,
    ),
    StaticImageActivateSettings: S.optional(
      StaticImageActivateScheduleActionSettings,
    ),
    StaticImageDeactivateSettings: S.optional(
      StaticImageDeactivateScheduleActionSettings,
    ),
    StaticImageOutputActivateSettings: S.optional(
      StaticImageOutputActivateScheduleActionSettings,
    ),
    StaticImageOutputDeactivateSettings: S.optional(
      StaticImageOutputDeactivateScheduleActionSettings,
    ),
    Id3SegmentTaggingSettings: S.optional(
      Id3SegmentTaggingScheduleActionSettings,
    ),
    TimedMetadataSettings: S.optional(TimedMetadataScheduleActionSettings),
  }).pipe(
    S.encodeKeys({
      HlsId3SegmentTaggingSettings: "hlsId3SegmentTaggingSettings",
      HlsTimedMetadataSettings: "hlsTimedMetadataSettings",
      InputPrepareSettings: "inputPrepareSettings",
      InputSwitchSettings: "inputSwitchSettings",
      MotionGraphicsImageActivateSettings:
        "motionGraphicsImageActivateSettings",
      MotionGraphicsImageDeactivateSettings:
        "motionGraphicsImageDeactivateSettings",
      PauseStateSettings: "pauseStateSettings",
      Scte35InputSettings: "scte35InputSettings",
      Scte35ReturnToNetworkSettings: "scte35ReturnToNetworkSettings",
      Scte35SpliceInsertSettings: "scte35SpliceInsertSettings",
      Scte35TimeSignalSettings: "scte35TimeSignalSettings",
      StaticImageActivateSettings: "staticImageActivateSettings",
      StaticImageDeactivateSettings: "staticImageDeactivateSettings",
      StaticImageOutputActivateSettings: "staticImageOutputActivateSettings",
      StaticImageOutputDeactivateSettings:
        "staticImageOutputDeactivateSettings",
      Id3SegmentTaggingSettings: "id3SegmentTaggingSettings",
      TimedMetadataSettings: "timedMetadataSettings",
    }),
  ),
).annotate({
  identifier: "ScheduleActionSettings",
}) as any as S.Schema<ScheduleActionSettings>;
export interface FixedModeScheduleActionStartSettings {
  Time?: string;
}
export const FixedModeScheduleActionStartSettings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Time: S.optional(S.String) }).pipe(
      S.encodeKeys({ Time: "time" }),
    ),
).annotate({
  identifier: "FixedModeScheduleActionStartSettings",
}) as any as S.Schema<FixedModeScheduleActionStartSettings>;
export type FollowPoint = "END" | "START" | (string & {});
export const FollowPoint = /*@__PURE__*/ S.String;

export interface FollowModeScheduleActionStartSettings {
  FollowPoint?: FollowPoint;
  ReferenceActionName?: string;
}
export const FollowModeScheduleActionStartSettings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      FollowPoint: S.optional(FollowPoint),
      ReferenceActionName: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        FollowPoint: "followPoint",
        ReferenceActionName: "referenceActionName",
      }),
    ),
).annotate({
  identifier: "FollowModeScheduleActionStartSettings",
}) as any as S.Schema<FollowModeScheduleActionStartSettings>;
export interface ImmediateModeScheduleActionStartSettings {}
export const ImmediateModeScheduleActionStartSettings = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "ImmediateModeScheduleActionStartSettings",
}) as any as S.Schema<ImmediateModeScheduleActionStartSettings>;
export interface ScheduleActionStartSettings {
  FixedModeScheduleActionStartSettings?: FixedModeScheduleActionStartSettings;
  FollowModeScheduleActionStartSettings?: FollowModeScheduleActionStartSettings;
  ImmediateModeScheduleActionStartSettings?: ImmediateModeScheduleActionStartSettings;
}
export const ScheduleActionStartSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FixedModeScheduleActionStartSettings: S.optional(
      FixedModeScheduleActionStartSettings,
    ),
    FollowModeScheduleActionStartSettings: S.optional(
      FollowModeScheduleActionStartSettings,
    ),
    ImmediateModeScheduleActionStartSettings: S.optional(
      ImmediateModeScheduleActionStartSettings,
    ),
  }).pipe(
    S.encodeKeys({
      FixedModeScheduleActionStartSettings:
        "fixedModeScheduleActionStartSettings",
      FollowModeScheduleActionStartSettings:
        "followModeScheduleActionStartSettings",
      ImmediateModeScheduleActionStartSettings:
        "immediateModeScheduleActionStartSettings",
    }),
  ),
).annotate({
  identifier: "ScheduleActionStartSettings",
}) as any as S.Schema<ScheduleActionStartSettings>;
export interface ScheduleAction {
  ActionName?: string;
  ScheduleActionSettings?: ScheduleActionSettings;
  ScheduleActionStartSettings?: ScheduleActionStartSettings;
}
export const ScheduleAction = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActionName: S.optional(S.String),
    ScheduleActionSettings: S.optional(ScheduleActionSettings),
    ScheduleActionStartSettings: S.optional(ScheduleActionStartSettings),
  }).pipe(
    S.encodeKeys({
      ActionName: "actionName",
      ScheduleActionSettings: "scheduleActionSettings",
      ScheduleActionStartSettings: "scheduleActionStartSettings",
    }),
  ),
).annotate({ identifier: "ScheduleAction" }) as any as S.Schema<ScheduleAction>;
export type __listOfScheduleAction = ScheduleAction[];
export const __listOfScheduleAction = /*@__PURE__*/ S.Array(ScheduleAction);
export interface BatchScheduleActionCreateRequest {
  ScheduleActions?: ScheduleAction[];
}
export const BatchScheduleActionCreateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduleActions: S.optional(__listOfScheduleAction) }).pipe(
    S.encodeKeys({ ScheduleActions: "scheduleActions" }),
  ),
).annotate({
  identifier: "BatchScheduleActionCreateRequest",
}) as any as S.Schema<BatchScheduleActionCreateRequest>;
export interface BatchScheduleActionDeleteRequest {
  ActionNames?: string[];
}
export const BatchScheduleActionDeleteRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ActionNames: S.optional(__listOf__string) }).pipe(
    S.encodeKeys({ ActionNames: "actionNames" }),
  ),
).annotate({
  identifier: "BatchScheduleActionDeleteRequest",
}) as any as S.Schema<BatchScheduleActionDeleteRequest>;
export interface BatchUpdateScheduleRequest {
  ChannelId: string;
  Creates?: BatchScheduleActionCreateRequest;
  Deletes?: BatchScheduleActionDeleteRequest;
}
export const BatchUpdateScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
    Creates: S.optional(BatchScheduleActionCreateRequest),
    Deletes: S.optional(BatchScheduleActionDeleteRequest),
  })
    .pipe(S.encodeKeys({ Creates: "creates", Deletes: "deletes" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/prod/channels/{ChannelId}/schedule" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "BatchUpdateScheduleRequest",
}) as any as S.Schema<BatchUpdateScheduleRequest>;
export interface BatchScheduleActionCreateResult {
  ScheduleActions?: ScheduleAction[];
}
export const BatchScheduleActionCreateResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduleActions: S.optional(__listOfScheduleAction) }).pipe(
    S.encodeKeys({ ScheduleActions: "scheduleActions" }),
  ),
).annotate({
  identifier: "BatchScheduleActionCreateResult",
}) as any as S.Schema<BatchScheduleActionCreateResult>;
export interface BatchScheduleActionDeleteResult {
  ScheduleActions?: ScheduleAction[];
}
export const BatchScheduleActionDeleteResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ScheduleActions: S.optional(__listOfScheduleAction) }).pipe(
    S.encodeKeys({ ScheduleActions: "scheduleActions" }),
  ),
).annotate({
  identifier: "BatchScheduleActionDeleteResult",
}) as any as S.Schema<BatchScheduleActionDeleteResult>;
export interface BatchUpdateScheduleResponse {
  Creates?: BatchScheduleActionCreateResult & {
    ScheduleActions: (ScheduleAction & {
      ActionName: string;
      ScheduleActionSettings: ScheduleActionSettings & {
        HlsTimedMetadataSettings: HlsTimedMetadataScheduleActionSettings & {
          Id3: string;
        };
        InputPrepareSettings: InputPrepareScheduleActionSettings & {
          InputClippingSettings: InputClippingSettings & {
            InputTimecodeSource: InputTimecodeSource;
          };
        };
        InputSwitchSettings: InputSwitchScheduleActionSettings & {
          InputAttachmentNameReference: string;
          InputClippingSettings: InputClippingSettings & {
            InputTimecodeSource: InputTimecodeSource;
          };
        };
        PauseStateSettings: PauseStateScheduleActionSettings & {
          Pipelines: (PipelinePauseStateSettings & {
            PipelineId: PipelineId;
          })[];
        };
        Scte35InputSettings: Scte35InputScheduleActionSettings & {
          Mode: Scte35InputMode;
        };
        Scte35ReturnToNetworkSettings: Scte35ReturnToNetworkScheduleActionSettings & {
          SpliceEventId: __longMin0Max4294967295;
        };
        Scte35SpliceInsertSettings: Scte35SpliceInsertScheduleActionSettings & {
          SpliceEventId: __longMin0Max4294967295;
        };
        Scte35TimeSignalSettings: Scte35TimeSignalScheduleActionSettings & {
          Scte35Descriptors: (Scte35Descriptor & {
            Scte35DescriptorSettings: Scte35DescriptorSettings & {
              SegmentationDescriptorScte35DescriptorSettings: Scte35SegmentationDescriptor & {
                SegmentationCancelIndicator: Scte35SegmentationCancelIndicator;
                SegmentationEventId: __longMin0Max4294967295;
                DeliveryRestrictions: Scte35DeliveryRestrictions & {
                  ArchiveAllowedFlag: Scte35ArchiveAllowedFlag;
                  DeviceRestrictions: Scte35DeviceRestrictions;
                  NoRegionalBlackoutFlag: Scte35NoRegionalBlackoutFlag;
                  WebDeliveryAllowedFlag: Scte35WebDeliveryAllowedFlag;
                };
              };
            };
          })[];
        };
        StaticImageActivateSettings: StaticImageActivateScheduleActionSettings & {
          Image: InputLocation & { Uri: __stringMax2048 };
        };
        StaticImageOutputActivateSettings: StaticImageOutputActivateScheduleActionSettings & {
          Image: InputLocation & { Uri: __stringMax2048 };
          OutputNames: __listOf__string;
        };
        StaticImageOutputDeactivateSettings: StaticImageOutputDeactivateScheduleActionSettings & {
          OutputNames: __listOf__string;
        };
        TimedMetadataSettings: TimedMetadataScheduleActionSettings & {
          Id3: string;
        };
      };
      ScheduleActionStartSettings: ScheduleActionStartSettings & {
        FixedModeScheduleActionStartSettings: FixedModeScheduleActionStartSettings & {
          Time: string;
        };
        FollowModeScheduleActionStartSettings: FollowModeScheduleActionStartSettings & {
          FollowPoint: FollowPoint;
          ReferenceActionName: string;
        };
      };
    })[];
  };
  Deletes?: BatchScheduleActionDeleteResult & {
    ScheduleActions: (ScheduleAction & {
      ActionName: string;
      ScheduleActionSettings: ScheduleActionSettings & {
        HlsTimedMetadataSettings: HlsTimedMetadataScheduleActionSettings & {
          Id3: string;
        };
        InputPrepareSettings: InputPrepareScheduleActionSettings & {
          InputClippingSettings: InputClippingSettings & {
            InputTimecodeSource: InputTimecodeSource;
          };
        };
        InputSwitchSettings: InputSwitchScheduleActionSettings & {
          InputAttachmentNameReference: string;
          InputClippingSettings: InputClippingSettings & {
            InputTimecodeSource: InputTimecodeSource;
          };
        };
        PauseStateSettings: PauseStateScheduleActionSettings & {
          Pipelines: (PipelinePauseStateSettings & {
            PipelineId: PipelineId;
          })[];
        };
        Scte35InputSettings: Scte35InputScheduleActionSettings & {
          Mode: Scte35InputMode;
        };
        Scte35ReturnToNetworkSettings: Scte35ReturnToNetworkScheduleActionSettings & {
          SpliceEventId: __longMin0Max4294967295;
        };
        Scte35SpliceInsertSettings: Scte35SpliceInsertScheduleActionSettings & {
          SpliceEventId: __longMin0Max4294967295;
        };
        Scte35TimeSignalSettings: Scte35TimeSignalScheduleActionSettings & {
          Scte35Descriptors: (Scte35Descriptor & {
            Scte35DescriptorSettings: Scte35DescriptorSettings & {
              SegmentationDescriptorScte35DescriptorSettings: Scte35SegmentationDescriptor & {
                SegmentationCancelIndicator: Scte35SegmentationCancelIndicator;
                SegmentationEventId: __longMin0Max4294967295;
                DeliveryRestrictions: Scte35DeliveryRestrictions & {
                  ArchiveAllowedFlag: Scte35ArchiveAllowedFlag;
                  DeviceRestrictions: Scte35DeviceRestrictions;
                  NoRegionalBlackoutFlag: Scte35NoRegionalBlackoutFlag;
                  WebDeliveryAllowedFlag: Scte35WebDeliveryAllowedFlag;
                };
              };
            };
          })[];
        };
        StaticImageActivateSettings: StaticImageActivateScheduleActionSettings & {
          Image: InputLocation & { Uri: __stringMax2048 };
        };
        StaticImageOutputActivateSettings: StaticImageOutputActivateScheduleActionSettings & {
          Image: InputLocation & { Uri: __stringMax2048 };
          OutputNames: __listOf__string;
        };
        StaticImageOutputDeactivateSettings: StaticImageOutputDeactivateScheduleActionSettings & {
          OutputNames: __listOf__string;
        };
        TimedMetadataSettings: TimedMetadataScheduleActionSettings & {
          Id3: string;
        };
      };
      ScheduleActionStartSettings: ScheduleActionStartSettings & {
        FixedModeScheduleActionStartSettings: FixedModeScheduleActionStartSettings & {
          Time: string;
        };
        FollowModeScheduleActionStartSettings: FollowModeScheduleActionStartSettings & {
          FollowPoint: FollowPoint;
          ReferenceActionName: string;
        };
      };
    })[];
  };
}
export const BatchUpdateScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Creates: S.optional(BatchScheduleActionCreateResult),
    Deletes: S.optional(BatchScheduleActionDeleteResult),
  }).pipe(S.encodeKeys({ Creates: "creates", Deletes: "deletes" })),
).annotate({
  identifier: "BatchUpdateScheduleResponse",
}) as any as S.Schema<BatchUpdateScheduleResponse>;
export interface CancelInputDeviceTransferRequest {
  InputDeviceId: string;
}
export const CancelInputDeviceTransferRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/prod/inputDevices/{InputDeviceId}/cancel",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelInputDeviceTransferRequest",
}) as any as S.Schema<CancelInputDeviceTransferRequest>;
export interface CancelInputDeviceTransferResponse {}
export const CancelInputDeviceTransferResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelInputDeviceTransferResponse",
}) as any as S.Schema<CancelInputDeviceTransferResponse>;
export interface ClaimDeviceRequest {
  Id?: string;
}
export const ClaimDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) })
    .pipe(S.encodeKeys({ Id: "id" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/claimDevice" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ClaimDeviceRequest",
}) as any as S.Schema<ClaimDeviceRequest>;
export interface ClaimDeviceResponse {}
export const ClaimDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ClaimDeviceResponse",
}) as any as S.Schema<ClaimDeviceResponse>;
export type CdiInputResolution = "SD" | "HD" | "FHD" | "UHD" | (string & {});
export const CdiInputResolution = /*@__PURE__*/ S.String;

export interface CdiInputSpecification {
  Resolution?: CdiInputResolution;
}
export const CdiInputSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Resolution: S.optional(CdiInputResolution) }).pipe(
    S.encodeKeys({ Resolution: "resolution" }),
  ),
).annotate({
  identifier: "CdiInputSpecification",
}) as any as S.Schema<CdiInputSpecification>;
export type ChannelClass = "STANDARD" | "SINGLE_PIPELINE" | (string & {});
export const ChannelClass = /*@__PURE__*/ S.String;

export type __stringMin1 = string;
export interface MediaPackageOutputDestinationSettings {
  ChannelId?: string;
  ChannelGroup?: string;
  ChannelName?: string;
  ChannelEndpointId?: string;
  MediaPackageRegionName?: string;
}
export const MediaPackageOutputDestinationSettings = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChannelId: S.optional(S.String),
      ChannelGroup: S.optional(S.String),
      ChannelName: S.optional(S.String),
      ChannelEndpointId: S.optional(S.String),
      MediaPackageRegionName: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        ChannelId: "channelId",
        ChannelGroup: "channelGroup",
        ChannelName: "channelName",
        ChannelEndpointId: "channelEndpointId",
        MediaPackageRegionName: "mediaPackageRegionName",
      }),
    ),
).annotate({
  identifier: "MediaPackageOutputDestinationSettings",
}) as any as S.Schema<MediaPackageOutputDestinationSettings>;
export type __listOfMediaPackageOutputDestinationSettings =
  MediaPackageOutputDestinationSettings[];
export const __listOfMediaPackageOutputDestinationSettings =
  /*@__PURE__*/ S.Array(MediaPackageOutputDestinationSettings);
export interface MultiplexProgramChannelDestinationSettings {
  MultiplexId?: string;
  ProgramName?: string;
}
export const MultiplexProgramChannelDestinationSettings =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      MultiplexId: S.optional(S.String),
      ProgramName: S.optional(S.String),
    }).pipe(
      S.encodeKeys({ MultiplexId: "multiplexId", ProgramName: "programName" }),
    ),
  ).annotate({
    identifier: "MultiplexProgramChannelDestinationSettings",
  }) as any as S.Schema<MultiplexProgramChannelDestinationSettings>;
export interface OutputDestinationSettings {
  PasswordParam?: string;
  StreamName?: string;
  Url?: string;
  Username?: string;
}
export const OutputDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PasswordParam: S.optional(S.String),
    StreamName: S.optional(S.String),
    Url: S.optional(S.String),
    Username: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      PasswordParam: "passwordParam",
      StreamName: "streamName",
      Url: "url",
      Username: "username",
    }),
  ),
).annotate({
  identifier: "OutputDestinationSettings",
}) as any as S.Schema<OutputDestinationSettings>;
export type __listOfOutputDestinationSettings = OutputDestinationSettings[];
export const __listOfOutputDestinationSettings = /*@__PURE__*/ S.Array(
  OutputDestinationSettings,
);
export type ConnectionMode = "CALLER" | "LISTENER" | (string & {});
export const ConnectionMode = /*@__PURE__*/ S.String;

export type __integerMin1Max65535 = number;
export interface SrtOutputDestinationSettings {
  EncryptionPassphraseSecretArn?: string;
  StreamId?: string;
  Url?: string;
  ConnectionMode?: ConnectionMode;
  ListenerPort?: number;
}
export const SrtOutputDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionPassphraseSecretArn: S.optional(S.String),
    StreamId: S.optional(S.String),
    Url: S.optional(S.String),
    ConnectionMode: S.optional(ConnectionMode),
    ListenerPort: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      EncryptionPassphraseSecretArn: "encryptionPassphraseSecretArn",
      StreamId: "streamId",
      Url: "url",
      ConnectionMode: "connectionMode",
      ListenerPort: "listenerPort",
    }),
  ),
).annotate({
  identifier: "SrtOutputDestinationSettings",
}) as any as S.Schema<SrtOutputDestinationSettings>;
export type __listOfSrtOutputDestinationSettings =
  SrtOutputDestinationSettings[];
export const __listOfSrtOutputDestinationSettings = /*@__PURE__*/ S.Array(
  SrtOutputDestinationSettings,
);
export type MediaConnectRouterOutputEncryptionType =
  | "AUTOMATIC"
  | "SECRETS_MANAGER"
  | (string & {});
export const MediaConnectRouterOutputEncryptionType = /*@__PURE__*/ S.String;

export interface MediaConnectRouterOutputDestinationSettings {
  EncryptionType?: MediaConnectRouterOutputEncryptionType;
  SecretArn?: string;
}
export const MediaConnectRouterOutputDestinationSettings =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EncryptionType: S.optional(MediaConnectRouterOutputEncryptionType),
      SecretArn: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        EncryptionType: "encryptionType",
        SecretArn: "secretArn",
      }),
    ),
  ).annotate({
    identifier: "MediaConnectRouterOutputDestinationSettings",
  }) as any as S.Schema<MediaConnectRouterOutputDestinationSettings>;
export type __listOfMediaConnectRouterOutputDestinationSettings =
  MediaConnectRouterOutputDestinationSettings[];
export const __listOfMediaConnectRouterOutputDestinationSettings =
  /*@__PURE__*/ S.Array(MediaConnectRouterOutputDestinationSettings);
export interface OutputDestination {
  Id?: string;
  MediaPackageSettings?: MediaPackageOutputDestinationSettings[];
  MultiplexSettings?: MultiplexProgramChannelDestinationSettings;
  Settings?: OutputDestinationSettings[];
  SrtSettings?: SrtOutputDestinationSettings[];
  LogicalInterfaceNames?: string[];
  MediaConnectRouterSettings?: MediaConnectRouterOutputDestinationSettings[];
}
export const OutputDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    MediaPackageSettings: S.optional(
      __listOfMediaPackageOutputDestinationSettings,
    ),
    MultiplexSettings: S.optional(MultiplexProgramChannelDestinationSettings),
    Settings: S.optional(__listOfOutputDestinationSettings),
    SrtSettings: S.optional(__listOfSrtOutputDestinationSettings),
    LogicalInterfaceNames: S.optional(__listOf__string),
    MediaConnectRouterSettings: S.optional(
      __listOfMediaConnectRouterOutputDestinationSettings,
    ),
  }).pipe(
    S.encodeKeys({
      Id: "id",
      MediaPackageSettings: "mediaPackageSettings",
      MultiplexSettings: "multiplexSettings",
      Settings: "settings",
      SrtSettings: "srtSettings",
      LogicalInterfaceNames: "logicalInterfaceNames",
      MediaConnectRouterSettings: "mediaConnectRouterSettings",
    }),
  ),
).annotate({
  identifier: "OutputDestination",
}) as any as S.Schema<OutputDestination>;
export type __listOfOutputDestination = OutputDestination[];
export const __listOfOutputDestination =
  /*@__PURE__*/ S.Array(OutputDestination);
export type AudioNormalizationAlgorithm =
  | "ITU_1770_1"
  | "ITU_1770_2"
  | "ITU_1770_3"
  | "ITU_1770_4"
  | (string & {});
export const AudioNormalizationAlgorithm = /*@__PURE__*/ S.String;

export type AudioNormalizationAlgorithmControl =
  | "CORRECT_AUDIO"
  | (string & {});
export const AudioNormalizationAlgorithmControl = /*@__PURE__*/ S.String;

export type __doubleMinNegative59Max0 = number;
export type AudioNormalizationPeakCalculation =
  | "NONE"
  | "TRUE_PEAK"
  | (string & {});
export const AudioNormalizationPeakCalculation = /*@__PURE__*/ S.String;

export type __doubleMinNegative8Max0 = number;
export interface AudioNormalizationSettings {
  Algorithm?: AudioNormalizationAlgorithm;
  AlgorithmControl?: AudioNormalizationAlgorithmControl;
  TargetLkfs?: number;
  PeakCalculation?: AudioNormalizationPeakCalculation;
  PeakLimiterThreshold?: number;
}
export const AudioNormalizationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(AudioNormalizationAlgorithm),
    AlgorithmControl: S.optional(AudioNormalizationAlgorithmControl),
    TargetLkfs: S.optional(S.Number),
    PeakCalculation: S.optional(AudioNormalizationPeakCalculation),
    PeakLimiterThreshold: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Algorithm: "algorithm",
      AlgorithmControl: "algorithmControl",
      TargetLkfs: "targetLkfs",
      PeakCalculation: "peakCalculation",
      PeakLimiterThreshold: "peakLimiterThreshold",
    }),
  ),
).annotate({
  identifier: "AudioNormalizationSettings",
}) as any as S.Schema<AudioNormalizationSettings>;
export type AudioType =
  | "CLEAN_EFFECTS"
  | "HEARING_IMPAIRED"
  | "UNDEFINED"
  | "VISUAL_IMPAIRED_COMMENTARY"
  | (string & {});
export const AudioType = /*@__PURE__*/ S.String;

export type AudioDescriptionAudioTypeControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export const AudioDescriptionAudioTypeControl = /*@__PURE__*/ S.String;

export type __stringMin2Max2 = string;
export type NielsenWatermarksCbetStepaside =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const NielsenWatermarksCbetStepaside = /*@__PURE__*/ S.String;

export type __stringMin1Max7 = string;
export interface NielsenCBET {
  CbetCheckDigitString?: string;
  CbetStepaside?: NielsenWatermarksCbetStepaside;
  Csid?: string;
}
export const NielsenCBET = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CbetCheckDigitString: S.optional(S.String),
    CbetStepaside: S.optional(NielsenWatermarksCbetStepaside),
    Csid: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CbetCheckDigitString: "cbetCheckDigitString",
      CbetStepaside: "cbetStepaside",
      Csid: "csid",
    }),
  ),
).annotate({ identifier: "NielsenCBET" }) as any as S.Schema<NielsenCBET>;
export type NielsenWatermarksDistributionTypes =
  | "FINAL_DISTRIBUTOR"
  | "PROGRAM_CONTENT"
  | (string & {});
export const NielsenWatermarksDistributionTypes = /*@__PURE__*/ S.String;

export type __doubleMin1Max65535 = number;
export type NielsenWatermarkTimezones =
  | "AMERICA_PUERTO_RICO"
  | "US_ALASKA"
  | "US_ARIZONA"
  | "US_CENTRAL"
  | "US_EASTERN"
  | "US_HAWAII"
  | "US_MOUNTAIN"
  | "US_PACIFIC"
  | "US_SAMOA"
  | "UTC"
  | (string & {});
export const NielsenWatermarkTimezones = /*@__PURE__*/ S.String;

export interface NielsenNaesIiNw {
  CheckDigitString?: string;
  Sid?: number;
  Timezone?: NielsenWatermarkTimezones;
}
export const NielsenNaesIiNw = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CheckDigitString: S.optional(S.String),
    Sid: S.optional(S.Number),
    Timezone: S.optional(NielsenWatermarkTimezones),
  }).pipe(
    S.encodeKeys({
      CheckDigitString: "checkDigitString",
      Sid: "sid",
      Timezone: "timezone",
    }),
  ),
).annotate({
  identifier: "NielsenNaesIiNw",
}) as any as S.Schema<NielsenNaesIiNw>;
export interface NielsenWatermarksSettings {
  NielsenCbetSettings?: NielsenCBET;
  NielsenDistributionType?: NielsenWatermarksDistributionTypes;
  NielsenNaesIiNwSettings?: NielsenNaesIiNw;
}
export const NielsenWatermarksSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NielsenCbetSettings: S.optional(NielsenCBET),
    NielsenDistributionType: S.optional(NielsenWatermarksDistributionTypes),
    NielsenNaesIiNwSettings: S.optional(NielsenNaesIiNw),
  }).pipe(
    S.encodeKeys({
      NielsenCbetSettings: "nielsenCbetSettings",
      NielsenDistributionType: "nielsenDistributionType",
      NielsenNaesIiNwSettings: "nielsenNaesIiNwSettings",
    }),
  ),
).annotate({
  identifier: "NielsenWatermarksSettings",
}) as any as S.Schema<NielsenWatermarksSettings>;
export interface AudioWatermarkSettings {
  NielsenWatermarksSettings?: NielsenWatermarksSettings;
}
export const AudioWatermarkSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NielsenWatermarksSettings: S.optional(NielsenWatermarksSettings),
  }).pipe(
    S.encodeKeys({ NielsenWatermarksSettings: "nielsenWatermarksSettings" }),
  ),
).annotate({
  identifier: "AudioWatermarkSettings",
}) as any as S.Schema<AudioWatermarkSettings>;
export type AacCodingMode =
  | "AD_RECEIVER_MIX"
  | "CODING_MODE_1_0"
  | "CODING_MODE_1_1"
  | "CODING_MODE_2_0"
  | "CODING_MODE_5_1"
  | (string & {});
export const AacCodingMode = /*@__PURE__*/ S.String;

export type AacInputType = "BROADCASTER_MIXED_AD" | "NORMAL" | (string & {});
export const AacInputType = /*@__PURE__*/ S.String;

export type AacProfile = "HEV1" | "HEV2" | "LC" | (string & {});
export const AacProfile = /*@__PURE__*/ S.String;

export type AacRateControlMode = "CBR" | "VBR" | (string & {});
export const AacRateControlMode = /*@__PURE__*/ S.String;

export type AacRawFormat = "LATM_LOAS" | "NONE" | (string & {});
export const AacRawFormat = /*@__PURE__*/ S.String;

export type AacSpec = "MPEG2" | "MPEG4" | (string & {});
export const AacSpec = /*@__PURE__*/ S.String;

export type AacVbrQuality =
  | "HIGH"
  | "LOW"
  | "MEDIUM_HIGH"
  | "MEDIUM_LOW"
  | (string & {});
export const AacVbrQuality = /*@__PURE__*/ S.String;

export interface AacSettings {
  Bitrate?: number;
  CodingMode?: AacCodingMode;
  InputType?: AacInputType;
  Profile?: AacProfile;
  RateControlMode?: AacRateControlMode;
  RawFormat?: AacRawFormat;
  SampleRate?: number;
  Spec?: AacSpec;
  VbrQuality?: AacVbrQuality;
}
export const AacSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bitrate: S.optional(S.Number),
    CodingMode: S.optional(AacCodingMode),
    InputType: S.optional(AacInputType),
    Profile: S.optional(AacProfile),
    RateControlMode: S.optional(AacRateControlMode),
    RawFormat: S.optional(AacRawFormat),
    SampleRate: S.optional(S.Number),
    Spec: S.optional(AacSpec),
    VbrQuality: S.optional(AacVbrQuality),
  }).pipe(
    S.encodeKeys({
      Bitrate: "bitrate",
      CodingMode: "codingMode",
      InputType: "inputType",
      Profile: "profile",
      RateControlMode: "rateControlMode",
      RawFormat: "rawFormat",
      SampleRate: "sampleRate",
      Spec: "spec",
      VbrQuality: "vbrQuality",
    }),
  ),
).annotate({ identifier: "AacSettings" }) as any as S.Schema<AacSettings>;
export type Ac3BitstreamMode =
  | "COMMENTARY"
  | "COMPLETE_MAIN"
  | "DIALOGUE"
  | "EMERGENCY"
  | "HEARING_IMPAIRED"
  | "MUSIC_AND_EFFECTS"
  | "VISUALLY_IMPAIRED"
  | "VOICE_OVER"
  | (string & {});
export const Ac3BitstreamMode = /*@__PURE__*/ S.String;

export type Ac3CodingMode =
  | "CODING_MODE_1_0"
  | "CODING_MODE_1_1"
  | "CODING_MODE_2_0"
  | "CODING_MODE_3_2_LFE"
  | (string & {});
export const Ac3CodingMode = /*@__PURE__*/ S.String;

export type __integerMin1Max31 = number;
export type Ac3DrcProfile = "FILM_STANDARD" | "NONE" | (string & {});
export const Ac3DrcProfile = /*@__PURE__*/ S.String;

export type Ac3LfeFilter = "DISABLED" | "ENABLED" | (string & {});
export const Ac3LfeFilter = /*@__PURE__*/ S.String;

export type Ac3MetadataControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export const Ac3MetadataControl = /*@__PURE__*/ S.String;

export type Ac3AttenuationControl = "ATTENUATE_3_DB" | "NONE" | (string & {});
export const Ac3AttenuationControl = /*@__PURE__*/ S.String;

export interface Ac3Settings {
  Bitrate?: number;
  BitstreamMode?: Ac3BitstreamMode;
  CodingMode?: Ac3CodingMode;
  Dialnorm?: number;
  DrcProfile?: Ac3DrcProfile;
  LfeFilter?: Ac3LfeFilter;
  MetadataControl?: Ac3MetadataControl;
  AttenuationControl?: Ac3AttenuationControl;
}
export const Ac3Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bitrate: S.optional(S.Number),
    BitstreamMode: S.optional(Ac3BitstreamMode),
    CodingMode: S.optional(Ac3CodingMode),
    Dialnorm: S.optional(S.Number),
    DrcProfile: S.optional(Ac3DrcProfile),
    LfeFilter: S.optional(Ac3LfeFilter),
    MetadataControl: S.optional(Ac3MetadataControl),
    AttenuationControl: S.optional(Ac3AttenuationControl),
  }).pipe(
    S.encodeKeys({
      Bitrate: "bitrate",
      BitstreamMode: "bitstreamMode",
      CodingMode: "codingMode",
      Dialnorm: "dialnorm",
      DrcProfile: "drcProfile",
      LfeFilter: "lfeFilter",
      MetadataControl: "metadataControl",
      AttenuationControl: "attenuationControl",
    }),
  ),
).annotate({ identifier: "Ac3Settings" }) as any as S.Schema<Ac3Settings>;
export type Eac3AtmosCodingMode =
  | "CODING_MODE_5_1_4"
  | "CODING_MODE_7_1_4"
  | "CODING_MODE_9_1_6"
  | (string & {});
export const Eac3AtmosCodingMode = /*@__PURE__*/ S.String;

export type Eac3AtmosDrcLine =
  | "FILM_LIGHT"
  | "FILM_STANDARD"
  | "MUSIC_LIGHT"
  | "MUSIC_STANDARD"
  | "NONE"
  | "SPEECH"
  | (string & {});
export const Eac3AtmosDrcLine = /*@__PURE__*/ S.String;

export type Eac3AtmosDrcRf =
  | "FILM_LIGHT"
  | "FILM_STANDARD"
  | "MUSIC_LIGHT"
  | "MUSIC_STANDARD"
  | "NONE"
  | "SPEECH"
  | (string & {});
export const Eac3AtmosDrcRf = /*@__PURE__*/ S.String;

export interface Eac3AtmosSettings {
  Bitrate?: number;
  CodingMode?: Eac3AtmosCodingMode;
  Dialnorm?: number;
  DrcLine?: Eac3AtmosDrcLine;
  DrcRf?: Eac3AtmosDrcRf;
  HeightTrim?: number;
  SurroundTrim?: number;
}
export const Eac3AtmosSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bitrate: S.optional(S.Number),
    CodingMode: S.optional(Eac3AtmosCodingMode),
    Dialnorm: S.optional(S.Number),
    DrcLine: S.optional(Eac3AtmosDrcLine),
    DrcRf: S.optional(Eac3AtmosDrcRf),
    HeightTrim: S.optional(S.Number),
    SurroundTrim: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Bitrate: "bitrate",
      CodingMode: "codingMode",
      Dialnorm: "dialnorm",
      DrcLine: "drcLine",
      DrcRf: "drcRf",
      HeightTrim: "heightTrim",
      SurroundTrim: "surroundTrim",
    }),
  ),
).annotate({
  identifier: "Eac3AtmosSettings",
}) as any as S.Schema<Eac3AtmosSettings>;
export type Eac3AttenuationControl = "ATTENUATE_3_DB" | "NONE" | (string & {});
export const Eac3AttenuationControl = /*@__PURE__*/ S.String;

export type Eac3BitstreamMode =
  | "COMMENTARY"
  | "COMPLETE_MAIN"
  | "EMERGENCY"
  | "HEARING_IMPAIRED"
  | "VISUALLY_IMPAIRED"
  | (string & {});
export const Eac3BitstreamMode = /*@__PURE__*/ S.String;

export type Eac3CodingMode =
  | "CODING_MODE_1_0"
  | "CODING_MODE_2_0"
  | "CODING_MODE_3_2"
  | (string & {});
export const Eac3CodingMode = /*@__PURE__*/ S.String;

export type Eac3DcFilter = "DISABLED" | "ENABLED" | (string & {});
export const Eac3DcFilter = /*@__PURE__*/ S.String;

export type Eac3DrcLine =
  | "FILM_LIGHT"
  | "FILM_STANDARD"
  | "MUSIC_LIGHT"
  | "MUSIC_STANDARD"
  | "NONE"
  | "SPEECH"
  | (string & {});
export const Eac3DrcLine = /*@__PURE__*/ S.String;

export type Eac3DrcRf =
  | "FILM_LIGHT"
  | "FILM_STANDARD"
  | "MUSIC_LIGHT"
  | "MUSIC_STANDARD"
  | "NONE"
  | "SPEECH"
  | (string & {});
export const Eac3DrcRf = /*@__PURE__*/ S.String;

export type Eac3LfeControl = "LFE" | "NO_LFE" | (string & {});
export const Eac3LfeControl = /*@__PURE__*/ S.String;

export type Eac3LfeFilter = "DISABLED" | "ENABLED" | (string & {});
export const Eac3LfeFilter = /*@__PURE__*/ S.String;

export type Eac3MetadataControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export const Eac3MetadataControl = /*@__PURE__*/ S.String;

export type Eac3PassthroughControl =
  | "NO_PASSTHROUGH"
  | "WHEN_POSSIBLE"
  | (string & {});
export const Eac3PassthroughControl = /*@__PURE__*/ S.String;

export type Eac3PhaseControl = "NO_SHIFT" | "SHIFT_90_DEGREES" | (string & {});
export const Eac3PhaseControl = /*@__PURE__*/ S.String;

export type Eac3StereoDownmix =
  | "DPL2"
  | "LO_RO"
  | "LT_RT"
  | "NOT_INDICATED"
  | (string & {});
export const Eac3StereoDownmix = /*@__PURE__*/ S.String;

export type Eac3SurroundExMode =
  | "DISABLED"
  | "ENABLED"
  | "NOT_INDICATED"
  | (string & {});
export const Eac3SurroundExMode = /*@__PURE__*/ S.String;

export type Eac3SurroundMode =
  | "DISABLED"
  | "ENABLED"
  | "NOT_INDICATED"
  | (string & {});
export const Eac3SurroundMode = /*@__PURE__*/ S.String;

export interface Eac3Settings {
  AttenuationControl?: Eac3AttenuationControl;
  Bitrate?: number;
  BitstreamMode?: Eac3BitstreamMode;
  CodingMode?: Eac3CodingMode;
  DcFilter?: Eac3DcFilter;
  Dialnorm?: number;
  DrcLine?: Eac3DrcLine;
  DrcRf?: Eac3DrcRf;
  LfeControl?: Eac3LfeControl;
  LfeFilter?: Eac3LfeFilter;
  LoRoCenterMixLevel?: number;
  LoRoSurroundMixLevel?: number;
  LtRtCenterMixLevel?: number;
  LtRtSurroundMixLevel?: number;
  MetadataControl?: Eac3MetadataControl;
  PassthroughControl?: Eac3PassthroughControl;
  PhaseControl?: Eac3PhaseControl;
  StereoDownmix?: Eac3StereoDownmix;
  SurroundExMode?: Eac3SurroundExMode;
  SurroundMode?: Eac3SurroundMode;
}
export const Eac3Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AttenuationControl: S.optional(Eac3AttenuationControl),
    Bitrate: S.optional(S.Number),
    BitstreamMode: S.optional(Eac3BitstreamMode),
    CodingMode: S.optional(Eac3CodingMode),
    DcFilter: S.optional(Eac3DcFilter),
    Dialnorm: S.optional(S.Number),
    DrcLine: S.optional(Eac3DrcLine),
    DrcRf: S.optional(Eac3DrcRf),
    LfeControl: S.optional(Eac3LfeControl),
    LfeFilter: S.optional(Eac3LfeFilter),
    LoRoCenterMixLevel: S.optional(S.Number),
    LoRoSurroundMixLevel: S.optional(S.Number),
    LtRtCenterMixLevel: S.optional(S.Number),
    LtRtSurroundMixLevel: S.optional(S.Number),
    MetadataControl: S.optional(Eac3MetadataControl),
    PassthroughControl: S.optional(Eac3PassthroughControl),
    PhaseControl: S.optional(Eac3PhaseControl),
    StereoDownmix: S.optional(Eac3StereoDownmix),
    SurroundExMode: S.optional(Eac3SurroundExMode),
    SurroundMode: S.optional(Eac3SurroundMode),
  }).pipe(
    S.encodeKeys({
      AttenuationControl: "attenuationControl",
      Bitrate: "bitrate",
      BitstreamMode: "bitstreamMode",
      CodingMode: "codingMode",
      DcFilter: "dcFilter",
      Dialnorm: "dialnorm",
      DrcLine: "drcLine",
      DrcRf: "drcRf",
      LfeControl: "lfeControl",
      LfeFilter: "lfeFilter",
      LoRoCenterMixLevel: "loRoCenterMixLevel",
      LoRoSurroundMixLevel: "loRoSurroundMixLevel",
      LtRtCenterMixLevel: "ltRtCenterMixLevel",
      LtRtSurroundMixLevel: "ltRtSurroundMixLevel",
      MetadataControl: "metadataControl",
      PassthroughControl: "passthroughControl",
      PhaseControl: "phaseControl",
      StereoDownmix: "stereoDownmix",
      SurroundExMode: "surroundExMode",
      SurroundMode: "surroundMode",
    }),
  ),
).annotate({ identifier: "Eac3Settings" }) as any as S.Schema<Eac3Settings>;
export type Mp2CodingMode =
  | "CODING_MODE_1_0"
  | "CODING_MODE_2_0"
  | (string & {});
export const Mp2CodingMode = /*@__PURE__*/ S.String;

export interface Mp2Settings {
  Bitrate?: number;
  CodingMode?: Mp2CodingMode;
  SampleRate?: number;
}
export const Mp2Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bitrate: S.optional(S.Number),
    CodingMode: S.optional(Mp2CodingMode),
    SampleRate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Bitrate: "bitrate",
      CodingMode: "codingMode",
      SampleRate: "sampleRate",
    }),
  ),
).annotate({ identifier: "Mp2Settings" }) as any as S.Schema<Mp2Settings>;
export interface PassThroughSettings {}
export const PassThroughSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "PassThroughSettings",
}) as any as S.Schema<PassThroughSettings>;
export type WavCodingMode =
  | "CODING_MODE_1_0"
  | "CODING_MODE_2_0"
  | "CODING_MODE_4_0"
  | "CODING_MODE_8_0"
  | (string & {});
export const WavCodingMode = /*@__PURE__*/ S.String;

export interface WavSettings {
  BitDepth?: number;
  CodingMode?: WavCodingMode;
  SampleRate?: number;
}
export const WavSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BitDepth: S.optional(S.Number),
    CodingMode: S.optional(WavCodingMode),
    SampleRate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BitDepth: "bitDepth",
      CodingMode: "codingMode",
      SampleRate: "sampleRate",
    }),
  ),
).annotate({ identifier: "WavSettings" }) as any as S.Schema<WavSettings>;
export interface AudioCodecSettings {
  AacSettings?: AacSettings;
  Ac3Settings?: Ac3Settings;
  Eac3AtmosSettings?: Eac3AtmosSettings;
  Eac3Settings?: Eac3Settings;
  Mp2Settings?: Mp2Settings;
  PassThroughSettings?: PassThroughSettings;
  WavSettings?: WavSettings;
}
export const AudioCodecSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AacSettings: S.optional(AacSettings),
    Ac3Settings: S.optional(Ac3Settings),
    Eac3AtmosSettings: S.optional(Eac3AtmosSettings),
    Eac3Settings: S.optional(Eac3Settings),
    Mp2Settings: S.optional(Mp2Settings),
    PassThroughSettings: S.optional(PassThroughSettings),
    WavSettings: S.optional(WavSettings),
  }).pipe(
    S.encodeKeys({
      AacSettings: "aacSettings",
      Ac3Settings: "ac3Settings",
      Eac3AtmosSettings: "eac3AtmosSettings",
      Eac3Settings: "eac3Settings",
      Mp2Settings: "mp2Settings",
      PassThroughSettings: "passThroughSettings",
      WavSettings: "wavSettings",
    }),
  ),
).annotate({
  identifier: "AudioCodecSettings",
}) as any as S.Schema<AudioCodecSettings>;
export type __stringMin1Max35 = string;
export type AudioDescriptionLanguageCodeControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export const AudioDescriptionLanguageCodeControl = /*@__PURE__*/ S.String;

export type __stringMax255 = string;
export type __integerMinNegative60Max6 = number;
export type __integerMin0Max15 = number;
export interface InputChannelLevel {
  Gain?: number;
  InputChannel?: number;
}
export const InputChannelLevel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Gain: S.optional(S.Number),
    InputChannel: S.optional(S.Number),
  }).pipe(S.encodeKeys({ Gain: "gain", InputChannel: "inputChannel" })),
).annotate({
  identifier: "InputChannelLevel",
}) as any as S.Schema<InputChannelLevel>;
export type __listOfInputChannelLevel = InputChannelLevel[];
export const __listOfInputChannelLevel =
  /*@__PURE__*/ S.Array(InputChannelLevel);
export interface AudioChannelMapping {
  InputChannelLevels?: InputChannelLevel[];
  OutputChannel?: number;
}
export const AudioChannelMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputChannelLevels: S.optional(__listOfInputChannelLevel),
    OutputChannel: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      InputChannelLevels: "inputChannelLevels",
      OutputChannel: "outputChannel",
    }),
  ),
).annotate({
  identifier: "AudioChannelMapping",
}) as any as S.Schema<AudioChannelMapping>;
export type __listOfAudioChannelMapping = AudioChannelMapping[];
export const __listOfAudioChannelMapping =
  /*@__PURE__*/ S.Array(AudioChannelMapping);
export type __integerMin1Max16 = number;
export type __integerMin1Max8 = number;
export interface RemixSettings {
  ChannelMappings?: AudioChannelMapping[];
  ChannelsIn?: number;
  ChannelsOut?: number;
}
export const RemixSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelMappings: S.optional(__listOfAudioChannelMapping),
    ChannelsIn: S.optional(S.Number),
    ChannelsOut: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      ChannelMappings: "channelMappings",
      ChannelsIn: "channelsIn",
      ChannelsOut: "channelsOut",
    }),
  ),
).annotate({ identifier: "RemixSettings" }) as any as S.Schema<RemixSettings>;
export type DashRoleAudio =
  | "ALTERNATE"
  | "COMMENTARY"
  | "DESCRIPTION"
  | "DUB"
  | "EMERGENCY"
  | "ENHANCED-AUDIO-INTELLIGIBILITY"
  | "KARAOKE"
  | "MAIN"
  | "SUPPLEMENTARY"
  | (string & {});
export const DashRoleAudio = /*@__PURE__*/ S.String;

export type __listOfDashRoleAudio = DashRoleAudio[];
export const __listOfDashRoleAudio = /*@__PURE__*/ S.Array(DashRoleAudio);
export type DvbDashAccessibility =
  | "DVBDASH_1_VISUALLY_IMPAIRED"
  | "DVBDASH_2_HARD_OF_HEARING"
  | "DVBDASH_3_SUPPLEMENTAL_COMMENTARY"
  | "DVBDASH_4_DIRECTORS_COMMENTARY"
  | "DVBDASH_5_EDUCATIONAL_NOTES"
  | "DVBDASH_6_MAIN_PROGRAM"
  | "DVBDASH_7_CLEAN_FEED"
  | (string & {});
export const DvbDashAccessibility = /*@__PURE__*/ S.String;

export interface AudioDescription {
  AudioNormalizationSettings?: AudioNormalizationSettings;
  AudioSelectorName?: string;
  AudioType?: AudioType;
  AudioTypeControl?: AudioDescriptionAudioTypeControl;
  AudioWatermarkingSettings?: AudioWatermarkSettings;
  CodecSettings?: AudioCodecSettings;
  LanguageCode?: string;
  LanguageCodeControl?: AudioDescriptionLanguageCodeControl;
  Name?: string;
  RemixSettings?: RemixSettings;
  StreamName?: string;
  AudioDashRoles?: DashRoleAudio[];
  DvbDashAccessibility?: DvbDashAccessibility;
}
export const AudioDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioNormalizationSettings: S.optional(AudioNormalizationSettings),
    AudioSelectorName: S.optional(S.String),
    AudioType: S.optional(AudioType),
    AudioTypeControl: S.optional(AudioDescriptionAudioTypeControl),
    AudioWatermarkingSettings: S.optional(AudioWatermarkSettings),
    CodecSettings: S.optional(AudioCodecSettings),
    LanguageCode: S.optional(S.String),
    LanguageCodeControl: S.optional(AudioDescriptionLanguageCodeControl),
    Name: S.optional(S.String),
    RemixSettings: S.optional(RemixSettings),
    StreamName: S.optional(S.String),
    AudioDashRoles: S.optional(__listOfDashRoleAudio),
    DvbDashAccessibility: S.optional(DvbDashAccessibility),
  }).pipe(
    S.encodeKeys({
      AudioNormalizationSettings: "audioNormalizationSettings",
      AudioSelectorName: "audioSelectorName",
      AudioType: "audioType",
      AudioTypeControl: "audioTypeControl",
      AudioWatermarkingSettings: "audioWatermarkingSettings",
      CodecSettings: "codecSettings",
      LanguageCode: "languageCode",
      LanguageCodeControl: "languageCodeControl",
      Name: "name",
      RemixSettings: "remixSettings",
      StreamName: "streamName",
      AudioDashRoles: "audioDashRoles",
      DvbDashAccessibility: "dvbDashAccessibility",
    }),
  ),
).annotate({
  identifier: "AudioDescription",
}) as any as S.Schema<AudioDescription>;
export type __listOfAudioDescription = AudioDescription[];
export const __listOfAudioDescription = /*@__PURE__*/ S.Array(AudioDescription);
export type AvailBlankingState = "DISABLED" | "ENABLED" | (string & {});
export const AvailBlankingState = /*@__PURE__*/ S.String;

export interface AvailBlanking {
  AvailBlankingImage?: InputLocation;
  State?: AvailBlankingState;
}
export const AvailBlanking = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailBlankingImage: S.optional(InputLocation),
    State: S.optional(AvailBlankingState),
  }).pipe(
    S.encodeKeys({ AvailBlankingImage: "availBlankingImage", State: "state" }),
  ),
).annotate({ identifier: "AvailBlanking" }) as any as S.Schema<AvailBlanking>;
export type __stringMax256 = string;
export type __integerMinNegative1000Max1000 = number;
export interface Esam {
  AcquisitionPointId?: string;
  AdAvailOffset?: number;
  PasswordParam?: string;
  PoisEndpoint?: string;
  Username?: string;
  ZoneIdentity?: string;
}
export const Esam = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcquisitionPointId: S.optional(S.String),
    AdAvailOffset: S.optional(S.Number),
    PasswordParam: S.optional(S.String),
    PoisEndpoint: S.optional(S.String),
    Username: S.optional(S.String),
    ZoneIdentity: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AcquisitionPointId: "acquisitionPointId",
      AdAvailOffset: "adAvailOffset",
      PasswordParam: "passwordParam",
      PoisEndpoint: "poisEndpoint",
      Username: "username",
      ZoneIdentity: "zoneIdentity",
    }),
  ),
).annotate({ identifier: "Esam" }) as any as S.Schema<Esam>;
export type Scte35SpliceInsertNoRegionalBlackoutBehavior =
  | "FOLLOW"
  | "IGNORE"
  | (string & {});
export const Scte35SpliceInsertNoRegionalBlackoutBehavior =
  /*@__PURE__*/ S.String;

export type Scte35SpliceInsertWebDeliveryAllowedBehavior =
  | "FOLLOW"
  | "IGNORE"
  | (string & {});
export const Scte35SpliceInsertWebDeliveryAllowedBehavior =
  /*@__PURE__*/ S.String;

export interface Scte35SpliceInsert {
  AdAvailOffset?: number;
  NoRegionalBlackoutFlag?: Scte35SpliceInsertNoRegionalBlackoutBehavior;
  WebDeliveryAllowedFlag?: Scte35SpliceInsertWebDeliveryAllowedBehavior;
}
export const Scte35SpliceInsert = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdAvailOffset: S.optional(S.Number),
    NoRegionalBlackoutFlag: S.optional(
      Scte35SpliceInsertNoRegionalBlackoutBehavior,
    ),
    WebDeliveryAllowedFlag: S.optional(
      Scte35SpliceInsertWebDeliveryAllowedBehavior,
    ),
  }).pipe(
    S.encodeKeys({
      AdAvailOffset: "adAvailOffset",
      NoRegionalBlackoutFlag: "noRegionalBlackoutFlag",
      WebDeliveryAllowedFlag: "webDeliveryAllowedFlag",
    }),
  ),
).annotate({
  identifier: "Scte35SpliceInsert",
}) as any as S.Schema<Scte35SpliceInsert>;
export type Scte35AposNoRegionalBlackoutBehavior =
  | "FOLLOW"
  | "IGNORE"
  | (string & {});
export const Scte35AposNoRegionalBlackoutBehavior = /*@__PURE__*/ S.String;

export type Scte35AposWebDeliveryAllowedBehavior =
  | "FOLLOW"
  | "IGNORE"
  | (string & {});
export const Scte35AposWebDeliveryAllowedBehavior = /*@__PURE__*/ S.String;

export interface Scte35TimeSignalApos {
  AdAvailOffset?: number;
  NoRegionalBlackoutFlag?: Scte35AposNoRegionalBlackoutBehavior;
  WebDeliveryAllowedFlag?: Scte35AposWebDeliveryAllowedBehavior;
}
export const Scte35TimeSignalApos = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdAvailOffset: S.optional(S.Number),
    NoRegionalBlackoutFlag: S.optional(Scte35AposNoRegionalBlackoutBehavior),
    WebDeliveryAllowedFlag: S.optional(Scte35AposWebDeliveryAllowedBehavior),
  }).pipe(
    S.encodeKeys({
      AdAvailOffset: "adAvailOffset",
      NoRegionalBlackoutFlag: "noRegionalBlackoutFlag",
      WebDeliveryAllowedFlag: "webDeliveryAllowedFlag",
    }),
  ),
).annotate({
  identifier: "Scte35TimeSignalApos",
}) as any as S.Schema<Scte35TimeSignalApos>;
export interface AvailSettings {
  Esam?: Esam;
  Scte35SpliceInsert?: Scte35SpliceInsert;
  Scte35TimeSignalApos?: Scte35TimeSignalApos;
}
export const AvailSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Esam: S.optional(Esam),
    Scte35SpliceInsert: S.optional(Scte35SpliceInsert),
    Scte35TimeSignalApos: S.optional(Scte35TimeSignalApos),
  }).pipe(
    S.encodeKeys({
      Esam: "esam",
      Scte35SpliceInsert: "scte35SpliceInsert",
      Scte35TimeSignalApos: "scte35TimeSignalApos",
    }),
  ),
).annotate({ identifier: "AvailSettings" }) as any as S.Schema<AvailSettings>;
export type Scte35SegmentationScope =
  | "ALL_OUTPUT_GROUPS"
  | "SCTE35_ENABLED_OUTPUT_GROUPS"
  | (string & {});
export const Scte35SegmentationScope = /*@__PURE__*/ S.String;

export interface AvailConfiguration {
  AvailSettings?: AvailSettings;
  Scte35SegmentationScope?: Scte35SegmentationScope;
}
export const AvailConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailSettings: S.optional(AvailSettings),
    Scte35SegmentationScope: S.optional(Scte35SegmentationScope),
  }).pipe(
    S.encodeKeys({
      AvailSettings: "availSettings",
      Scte35SegmentationScope: "scte35SegmentationScope",
    }),
  ),
).annotate({
  identifier: "AvailConfiguration",
}) as any as S.Schema<AvailConfiguration>;
export type BlackoutSlateNetworkEndBlackout =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const BlackoutSlateNetworkEndBlackout = /*@__PURE__*/ S.String;

export type __stringMin34Max34 = string;
export type BlackoutSlateState = "DISABLED" | "ENABLED" | (string & {});
export const BlackoutSlateState = /*@__PURE__*/ S.String;

export interface BlackoutSlate {
  BlackoutSlateImage?: InputLocation;
  NetworkEndBlackout?: BlackoutSlateNetworkEndBlackout;
  NetworkEndBlackoutImage?: InputLocation;
  NetworkId?: string;
  State?: BlackoutSlateState;
}
export const BlackoutSlate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlackoutSlateImage: S.optional(InputLocation),
    NetworkEndBlackout: S.optional(BlackoutSlateNetworkEndBlackout),
    NetworkEndBlackoutImage: S.optional(InputLocation),
    NetworkId: S.optional(S.String),
    State: S.optional(BlackoutSlateState),
  }).pipe(
    S.encodeKeys({
      BlackoutSlateImage: "blackoutSlateImage",
      NetworkEndBlackout: "networkEndBlackout",
      NetworkEndBlackoutImage: "networkEndBlackoutImage",
      NetworkId: "networkId",
      State: "state",
    }),
  ),
).annotate({ identifier: "BlackoutSlate" }) as any as S.Schema<BlackoutSlate>;
export type AccessibilityType =
  | "DOES_NOT_IMPLEMENT_ACCESSIBILITY_FEATURES"
  | "IMPLEMENTS_ACCESSIBILITY_FEATURES"
  | (string & {});
export const AccessibilityType = /*@__PURE__*/ S.String;

export interface AribDestinationSettings {}
export const AribDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AribDestinationSettings",
}) as any as S.Schema<AribDestinationSettings>;
export type BurnInAlignment = "CENTERED" | "LEFT" | "SMART" | (string & {});
export const BurnInAlignment = /*@__PURE__*/ S.String;

export type BurnInBackgroundColor = "BLACK" | "NONE" | "WHITE" | (string & {});
export const BurnInBackgroundColor = /*@__PURE__*/ S.String;

export type BurnInFontColor =
  | "BLACK"
  | "BLUE"
  | "GREEN"
  | "RED"
  | "WHITE"
  | "YELLOW"
  | (string & {});
export const BurnInFontColor = /*@__PURE__*/ S.String;

export type __integerMin96Max600 = number;
export type BurnInOutlineColor =
  | "BLACK"
  | "BLUE"
  | "GREEN"
  | "RED"
  | "WHITE"
  | "YELLOW"
  | (string & {});
export const BurnInOutlineColor = /*@__PURE__*/ S.String;

export type __integerMin0Max10 = number;
export type BurnInShadowColor = "BLACK" | "NONE" | "WHITE" | (string & {});
export const BurnInShadowColor = /*@__PURE__*/ S.String;

export type BurnInTeletextGridControl = "FIXED" | "SCALED" | (string & {});
export const BurnInTeletextGridControl = /*@__PURE__*/ S.String;

export type BurnInDestinationSubtitleRows =
  | "ROWS_16"
  | "ROWS_20"
  | "ROWS_24"
  | (string & {});
export const BurnInDestinationSubtitleRows = /*@__PURE__*/ S.String;

export interface BurnInDestinationSettings {
  Alignment?: BurnInAlignment;
  BackgroundColor?: BurnInBackgroundColor;
  BackgroundOpacity?: number;
  Font?: InputLocation;
  FontColor?: BurnInFontColor;
  FontOpacity?: number;
  FontResolution?: number;
  FontSize?: string;
  OutlineColor?: BurnInOutlineColor;
  OutlineSize?: number;
  ShadowColor?: BurnInShadowColor;
  ShadowOpacity?: number;
  ShadowXOffset?: number;
  ShadowYOffset?: number;
  TeletextGridControl?: BurnInTeletextGridControl;
  XPosition?: number;
  YPosition?: number;
  SubtitleRows?: BurnInDestinationSubtitleRows;
}
export const BurnInDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Alignment: S.optional(BurnInAlignment),
    BackgroundColor: S.optional(BurnInBackgroundColor),
    BackgroundOpacity: S.optional(S.Number),
    Font: S.optional(InputLocation),
    FontColor: S.optional(BurnInFontColor),
    FontOpacity: S.optional(S.Number),
    FontResolution: S.optional(S.Number),
    FontSize: S.optional(S.String),
    OutlineColor: S.optional(BurnInOutlineColor),
    OutlineSize: S.optional(S.Number),
    ShadowColor: S.optional(BurnInShadowColor),
    ShadowOpacity: S.optional(S.Number),
    ShadowXOffset: S.optional(S.Number),
    ShadowYOffset: S.optional(S.Number),
    TeletextGridControl: S.optional(BurnInTeletextGridControl),
    XPosition: S.optional(S.Number),
    YPosition: S.optional(S.Number),
    SubtitleRows: S.optional(BurnInDestinationSubtitleRows),
  }).pipe(
    S.encodeKeys({
      Alignment: "alignment",
      BackgroundColor: "backgroundColor",
      BackgroundOpacity: "backgroundOpacity",
      Font: "font",
      FontColor: "fontColor",
      FontOpacity: "fontOpacity",
      FontResolution: "fontResolution",
      FontSize: "fontSize",
      OutlineColor: "outlineColor",
      OutlineSize: "outlineSize",
      ShadowColor: "shadowColor",
      ShadowOpacity: "shadowOpacity",
      ShadowXOffset: "shadowXOffset",
      ShadowYOffset: "shadowYOffset",
      TeletextGridControl: "teletextGridControl",
      XPosition: "xPosition",
      YPosition: "yPosition",
      SubtitleRows: "subtitleRows",
    }),
  ),
).annotate({
  identifier: "BurnInDestinationSettings",
}) as any as S.Schema<BurnInDestinationSettings>;
export type DvbSubDestinationAlignment =
  | "CENTERED"
  | "LEFT"
  | "SMART"
  | (string & {});
export const DvbSubDestinationAlignment = /*@__PURE__*/ S.String;

export type DvbSubDestinationBackgroundColor =
  | "BLACK"
  | "NONE"
  | "WHITE"
  | (string & {});
export const DvbSubDestinationBackgroundColor = /*@__PURE__*/ S.String;

export type DvbSubDestinationFontColor =
  | "BLACK"
  | "BLUE"
  | "GREEN"
  | "RED"
  | "WHITE"
  | "YELLOW"
  | (string & {});
export const DvbSubDestinationFontColor = /*@__PURE__*/ S.String;

export type DvbSubDestinationOutlineColor =
  | "BLACK"
  | "BLUE"
  | "GREEN"
  | "RED"
  | "WHITE"
  | "YELLOW"
  | (string & {});
export const DvbSubDestinationOutlineColor = /*@__PURE__*/ S.String;

export type DvbSubDestinationShadowColor =
  | "BLACK"
  | "NONE"
  | "WHITE"
  | (string & {});
export const DvbSubDestinationShadowColor = /*@__PURE__*/ S.String;

export type DvbSubDestinationTeletextGridControl =
  | "FIXED"
  | "SCALED"
  | (string & {});
export const DvbSubDestinationTeletextGridControl = /*@__PURE__*/ S.String;

export type DvbSubDestinationSubtitleRows =
  | "ROWS_16"
  | "ROWS_20"
  | "ROWS_24"
  | (string & {});
export const DvbSubDestinationSubtitleRows = /*@__PURE__*/ S.String;

export interface DvbSubDestinationSettings {
  Alignment?: DvbSubDestinationAlignment;
  BackgroundColor?: DvbSubDestinationBackgroundColor;
  BackgroundOpacity?: number;
  Font?: InputLocation;
  FontColor?: DvbSubDestinationFontColor;
  FontOpacity?: number;
  FontResolution?: number;
  FontSize?: string;
  OutlineColor?: DvbSubDestinationOutlineColor;
  OutlineSize?: number;
  ShadowColor?: DvbSubDestinationShadowColor;
  ShadowOpacity?: number;
  ShadowXOffset?: number;
  ShadowYOffset?: number;
  TeletextGridControl?: DvbSubDestinationTeletextGridControl;
  XPosition?: number;
  YPosition?: number;
  SubtitleRows?: DvbSubDestinationSubtitleRows;
}
export const DvbSubDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Alignment: S.optional(DvbSubDestinationAlignment),
    BackgroundColor: S.optional(DvbSubDestinationBackgroundColor),
    BackgroundOpacity: S.optional(S.Number),
    Font: S.optional(InputLocation),
    FontColor: S.optional(DvbSubDestinationFontColor),
    FontOpacity: S.optional(S.Number),
    FontResolution: S.optional(S.Number),
    FontSize: S.optional(S.String),
    OutlineColor: S.optional(DvbSubDestinationOutlineColor),
    OutlineSize: S.optional(S.Number),
    ShadowColor: S.optional(DvbSubDestinationShadowColor),
    ShadowOpacity: S.optional(S.Number),
    ShadowXOffset: S.optional(S.Number),
    ShadowYOffset: S.optional(S.Number),
    TeletextGridControl: S.optional(DvbSubDestinationTeletextGridControl),
    XPosition: S.optional(S.Number),
    YPosition: S.optional(S.Number),
    SubtitleRows: S.optional(DvbSubDestinationSubtitleRows),
  }).pipe(
    S.encodeKeys({
      Alignment: "alignment",
      BackgroundColor: "backgroundColor",
      BackgroundOpacity: "backgroundOpacity",
      Font: "font",
      FontColor: "fontColor",
      FontOpacity: "fontOpacity",
      FontResolution: "fontResolution",
      FontSize: "fontSize",
      OutlineColor: "outlineColor",
      OutlineSize: "outlineSize",
      ShadowColor: "shadowColor",
      ShadowOpacity: "shadowOpacity",
      ShadowXOffset: "shadowXOffset",
      ShadowYOffset: "shadowYOffset",
      TeletextGridControl: "teletextGridControl",
      XPosition: "xPosition",
      YPosition: "yPosition",
      SubtitleRows: "subtitleRows",
    }),
  ),
).annotate({
  identifier: "DvbSubDestinationSettings",
}) as any as S.Schema<DvbSubDestinationSettings>;
export type __stringMax1000 = string;
export type EbuTtDFillLineGapControl = "DISABLED" | "ENABLED" | (string & {});
export const EbuTtDFillLineGapControl = /*@__PURE__*/ S.String;

export type EbuTtDDestinationStyleControl =
  | "EXCLUDE"
  | "INCLUDE"
  | (string & {});
export const EbuTtDDestinationStyleControl = /*@__PURE__*/ S.String;

export type __integerMin1Max800 = number;
export type __integerMin80Max800 = number;
export interface EbuTtDDestinationSettings {
  CopyrightHolder?: string;
  FillLineGap?: EbuTtDFillLineGapControl;
  FontFamily?: string;
  StyleControl?: EbuTtDDestinationStyleControl;
  DefaultFontSize?: number;
  DefaultLineHeight?: number;
}
export const EbuTtDDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CopyrightHolder: S.optional(S.String),
    FillLineGap: S.optional(EbuTtDFillLineGapControl),
    FontFamily: S.optional(S.String),
    StyleControl: S.optional(EbuTtDDestinationStyleControl),
    DefaultFontSize: S.optional(S.Number),
    DefaultLineHeight: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      CopyrightHolder: "copyrightHolder",
      FillLineGap: "fillLineGap",
      FontFamily: "fontFamily",
      StyleControl: "styleControl",
      DefaultFontSize: "defaultFontSize",
      DefaultLineHeight: "defaultLineHeight",
    }),
  ),
).annotate({
  identifier: "EbuTtDDestinationSettings",
}) as any as S.Schema<EbuTtDDestinationSettings>;
export interface EmbeddedDestinationSettings {}
export const EmbeddedDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "EmbeddedDestinationSettings",
}) as any as S.Schema<EmbeddedDestinationSettings>;
export interface EmbeddedPlusScte20DestinationSettings {}
export const EmbeddedPlusScte20DestinationSettings = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "EmbeddedPlusScte20DestinationSettings",
}) as any as S.Schema<EmbeddedPlusScte20DestinationSettings>;
export interface RtmpCaptionInfoDestinationSettings {}
export const RtmpCaptionInfoDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RtmpCaptionInfoDestinationSettings",
}) as any as S.Schema<RtmpCaptionInfoDestinationSettings>;
export interface Scte20PlusEmbeddedDestinationSettings {}
export const Scte20PlusEmbeddedDestinationSettings = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "Scte20PlusEmbeddedDestinationSettings",
}) as any as S.Schema<Scte20PlusEmbeddedDestinationSettings>;
export interface Scte27DestinationSettings {}
export const Scte27DestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "Scte27DestinationSettings",
}) as any as S.Schema<Scte27DestinationSettings>;
export interface SmpteTtDestinationSettings {}
export const SmpteTtDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "SmpteTtDestinationSettings",
}) as any as S.Schema<SmpteTtDestinationSettings>;
export interface TeletextDestinationSettings {}
export const TeletextDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TeletextDestinationSettings",
}) as any as S.Schema<TeletextDestinationSettings>;
export type TtmlDestinationStyleControl =
  | "PASSTHROUGH"
  | "USE_CONFIGURED"
  | (string & {});
export const TtmlDestinationStyleControl = /*@__PURE__*/ S.String;

export interface TtmlDestinationSettings {
  StyleControl?: TtmlDestinationStyleControl;
}
export const TtmlDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StyleControl: S.optional(TtmlDestinationStyleControl) }).pipe(
    S.encodeKeys({ StyleControl: "styleControl" }),
  ),
).annotate({
  identifier: "TtmlDestinationSettings",
}) as any as S.Schema<TtmlDestinationSettings>;
export type WebvttDestinationStyleControl =
  | "NO_STYLE_DATA"
  | "PASSTHROUGH"
  | (string & {});
export const WebvttDestinationStyleControl = /*@__PURE__*/ S.String;

export interface WebvttDestinationSettings {
  StyleControl?: WebvttDestinationStyleControl;
}
export const WebvttDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StyleControl: S.optional(WebvttDestinationStyleControl) }).pipe(
    S.encodeKeys({ StyleControl: "styleControl" }),
  ),
).annotate({
  identifier: "WebvttDestinationSettings",
}) as any as S.Schema<WebvttDestinationSettings>;
export interface CaptionDestinationSettings {
  AribDestinationSettings?: AribDestinationSettings;
  BurnInDestinationSettings?: BurnInDestinationSettings;
  DvbSubDestinationSettings?: DvbSubDestinationSettings;
  EbuTtDDestinationSettings?: EbuTtDDestinationSettings;
  EmbeddedDestinationSettings?: EmbeddedDestinationSettings;
  EmbeddedPlusScte20DestinationSettings?: EmbeddedPlusScte20DestinationSettings;
  RtmpCaptionInfoDestinationSettings?: RtmpCaptionInfoDestinationSettings;
  Scte20PlusEmbeddedDestinationSettings?: Scte20PlusEmbeddedDestinationSettings;
  Scte27DestinationSettings?: Scte27DestinationSettings;
  SmpteTtDestinationSettings?: SmpteTtDestinationSettings;
  TeletextDestinationSettings?: TeletextDestinationSettings;
  TtmlDestinationSettings?: TtmlDestinationSettings;
  WebvttDestinationSettings?: WebvttDestinationSettings;
}
export const CaptionDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AribDestinationSettings: S.optional(AribDestinationSettings),
    BurnInDestinationSettings: S.optional(BurnInDestinationSettings),
    DvbSubDestinationSettings: S.optional(DvbSubDestinationSettings),
    EbuTtDDestinationSettings: S.optional(EbuTtDDestinationSettings),
    EmbeddedDestinationSettings: S.optional(EmbeddedDestinationSettings),
    EmbeddedPlusScte20DestinationSettings: S.optional(
      EmbeddedPlusScte20DestinationSettings,
    ),
    RtmpCaptionInfoDestinationSettings: S.optional(
      RtmpCaptionInfoDestinationSettings,
    ),
    Scte20PlusEmbeddedDestinationSettings: S.optional(
      Scte20PlusEmbeddedDestinationSettings,
    ),
    Scte27DestinationSettings: S.optional(Scte27DestinationSettings),
    SmpteTtDestinationSettings: S.optional(SmpteTtDestinationSettings),
    TeletextDestinationSettings: S.optional(TeletextDestinationSettings),
    TtmlDestinationSettings: S.optional(TtmlDestinationSettings),
    WebvttDestinationSettings: S.optional(WebvttDestinationSettings),
  }).pipe(
    S.encodeKeys({
      AribDestinationSettings: "aribDestinationSettings",
      BurnInDestinationSettings: "burnInDestinationSettings",
      DvbSubDestinationSettings: "dvbSubDestinationSettings",
      EbuTtDDestinationSettings: "ebuTtDDestinationSettings",
      EmbeddedDestinationSettings: "embeddedDestinationSettings",
      EmbeddedPlusScte20DestinationSettings:
        "embeddedPlusScte20DestinationSettings",
      RtmpCaptionInfoDestinationSettings: "rtmpCaptionInfoDestinationSettings",
      Scte20PlusEmbeddedDestinationSettings:
        "scte20PlusEmbeddedDestinationSettings",
      Scte27DestinationSettings: "scte27DestinationSettings",
      SmpteTtDestinationSettings: "smpteTtDestinationSettings",
      TeletextDestinationSettings: "teletextDestinationSettings",
      TtmlDestinationSettings: "ttmlDestinationSettings",
      WebvttDestinationSettings: "webvttDestinationSettings",
    }),
  ),
).annotate({
  identifier: "CaptionDestinationSettings",
}) as any as S.Schema<CaptionDestinationSettings>;
export type DashRoleCaption =
  | "ALTERNATE"
  | "CAPTION"
  | "COMMENTARY"
  | "DESCRIPTION"
  | "DUB"
  | "EASYREADER"
  | "EMERGENCY"
  | "FORCED-SUBTITLE"
  | "KARAOKE"
  | "MAIN"
  | "METADATA"
  | "SUBTITLE"
  | "SUPPLEMENTARY"
  | (string & {});
export const DashRoleCaption = /*@__PURE__*/ S.String;

export type __listOfDashRoleCaption = DashRoleCaption[];
export const __listOfDashRoleCaption = /*@__PURE__*/ S.Array(DashRoleCaption);
export interface CaptionDescription {
  Accessibility?: AccessibilityType;
  CaptionSelectorName?: string;
  DestinationSettings?: CaptionDestinationSettings;
  LanguageCode?: string;
  LanguageDescription?: string;
  Name?: string;
  CaptionDashRoles?: DashRoleCaption[];
  DvbDashAccessibility?: DvbDashAccessibility;
}
export const CaptionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accessibility: S.optional(AccessibilityType),
    CaptionSelectorName: S.optional(S.String),
    DestinationSettings: S.optional(CaptionDestinationSettings),
    LanguageCode: S.optional(S.String),
    LanguageDescription: S.optional(S.String),
    Name: S.optional(S.String),
    CaptionDashRoles: S.optional(__listOfDashRoleCaption),
    DvbDashAccessibility: S.optional(DvbDashAccessibility),
  }).pipe(
    S.encodeKeys({
      Accessibility: "accessibility",
      CaptionSelectorName: "captionSelectorName",
      DestinationSettings: "destinationSettings",
      LanguageCode: "languageCode",
      LanguageDescription: "languageDescription",
      Name: "name",
      CaptionDashRoles: "captionDashRoles",
      DvbDashAccessibility: "dvbDashAccessibility",
    }),
  ),
).annotate({
  identifier: "CaptionDescription",
}) as any as S.Schema<CaptionDescription>;
export type __listOfCaptionDescription = CaptionDescription[];
export const __listOfCaptionDescription =
  /*@__PURE__*/ S.Array(CaptionDescription);
export type FeatureActivationsInputPrepareScheduleActions =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const FeatureActivationsInputPrepareScheduleActions =
  /*@__PURE__*/ S.String;

export type FeatureActivationsOutputStaticImageOverlayScheduleActions =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const FeatureActivationsOutputStaticImageOverlayScheduleActions =
  /*@__PURE__*/ S.String;

export interface FeatureActivations {
  InputPrepareScheduleActions?: FeatureActivationsInputPrepareScheduleActions;
  OutputStaticImageOverlayScheduleActions?: FeatureActivationsOutputStaticImageOverlayScheduleActions;
}
export const FeatureActivations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputPrepareScheduleActions: S.optional(
      FeatureActivationsInputPrepareScheduleActions,
    ),
    OutputStaticImageOverlayScheduleActions: S.optional(
      FeatureActivationsOutputStaticImageOverlayScheduleActions,
    ),
  }).pipe(
    S.encodeKeys({
      InputPrepareScheduleActions: "inputPrepareScheduleActions",
      OutputStaticImageOverlayScheduleActions:
        "outputStaticImageOverlayScheduleActions",
    }),
  ),
).annotate({
  identifier: "FeatureActivations",
}) as any as S.Schema<FeatureActivations>;
export type __integerMinNegative60Max60 = number;
export type GlobalConfigurationInputEndAction =
  | "NONE"
  | "SWITCH_AND_LOOP_INPUTS"
  | (string & {});
export const GlobalConfigurationInputEndAction = /*@__PURE__*/ S.String;

export type __integerMin0Max1000000 = number;
export type __stringMin6Max6 = string;
export type InputLossImageType = "COLOR" | "SLATE" | (string & {});
export const InputLossImageType = /*@__PURE__*/ S.String;

export interface InputLossBehavior {
  BlackFrameMsec?: number;
  InputLossImageColor?: string;
  InputLossImageSlate?: InputLocation;
  InputLossImageType?: InputLossImageType;
  RepeatFrameMsec?: number;
}
export const InputLossBehavior = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlackFrameMsec: S.optional(S.Number),
    InputLossImageColor: S.optional(S.String),
    InputLossImageSlate: S.optional(InputLocation),
    InputLossImageType: S.optional(InputLossImageType),
    RepeatFrameMsec: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BlackFrameMsec: "blackFrameMsec",
      InputLossImageColor: "inputLossImageColor",
      InputLossImageSlate: "inputLossImageSlate",
      InputLossImageType: "inputLossImageType",
      RepeatFrameMsec: "repeatFrameMsec",
    }),
  ),
).annotate({
  identifier: "InputLossBehavior",
}) as any as S.Schema<InputLossBehavior>;
export type GlobalConfigurationOutputLockingMode =
  | "EPOCH_LOCKING"
  | "PIPELINE_LOCKING"
  | "DISABLED"
  | (string & {});
export const GlobalConfigurationOutputLockingMode = /*@__PURE__*/ S.String;

export type GlobalConfigurationOutputTimingSource =
  | "INPUT_CLOCK"
  | "SYSTEM_CLOCK"
  | (string & {});
export const GlobalConfigurationOutputTimingSource = /*@__PURE__*/ S.String;

export type GlobalConfigurationLowFramerateInputs =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const GlobalConfigurationLowFramerateInputs = /*@__PURE__*/ S.String;

export interface EpochLockingSettings {
  CustomEpoch?: string;
  JamSyncTime?: string;
}
export const EpochLockingSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomEpoch: S.optional(S.String),
    JamSyncTime: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ CustomEpoch: "customEpoch", JamSyncTime: "jamSyncTime" }),
  ),
).annotate({
  identifier: "EpochLockingSettings",
}) as any as S.Schema<EpochLockingSettings>;
export type PipelineLockingMethod =
  | "SOURCE_TIMECODE"
  | "VIDEO_ALIGNMENT"
  | (string & {});
export const PipelineLockingMethod = /*@__PURE__*/ S.String;

export interface PipelineLockingSettings {
  PipelineLockingMethod?: PipelineLockingMethod;
  CustomEpoch?: string;
}
export const PipelineLockingSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PipelineLockingMethod: S.optional(PipelineLockingMethod),
    CustomEpoch: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      PipelineLockingMethod: "pipelineLockingMethod",
      CustomEpoch: "customEpoch",
    }),
  ),
).annotate({
  identifier: "PipelineLockingSettings",
}) as any as S.Schema<PipelineLockingSettings>;
export interface DisabledLockingSettings {
  CustomEpoch?: string;
}
export const DisabledLockingSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CustomEpoch: S.optional(S.String) }).pipe(
    S.encodeKeys({ CustomEpoch: "customEpoch" }),
  ),
).annotate({
  identifier: "DisabledLockingSettings",
}) as any as S.Schema<DisabledLockingSettings>;
export interface OutputLockingSettings {
  EpochLockingSettings?: EpochLockingSettings;
  PipelineLockingSettings?: PipelineLockingSettings;
  DisabledLockingSettings?: DisabledLockingSettings;
}
export const OutputLockingSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EpochLockingSettings: S.optional(EpochLockingSettings),
    PipelineLockingSettings: S.optional(PipelineLockingSettings),
    DisabledLockingSettings: S.optional(DisabledLockingSettings),
  }).pipe(
    S.encodeKeys({
      EpochLockingSettings: "epochLockingSettings",
      PipelineLockingSettings: "pipelineLockingSettings",
      DisabledLockingSettings: "disabledLockingSettings",
    }),
  ),
).annotate({
  identifier: "OutputLockingSettings",
}) as any as S.Schema<OutputLockingSettings>;
export interface GlobalConfiguration {
  InitialAudioGain?: number;
  InputEndAction?: GlobalConfigurationInputEndAction;
  InputLossBehavior?: InputLossBehavior;
  OutputLockingMode?: GlobalConfigurationOutputLockingMode;
  OutputTimingSource?: GlobalConfigurationOutputTimingSource;
  SupportLowFramerateInputs?: GlobalConfigurationLowFramerateInputs;
  OutputLockingSettings?: OutputLockingSettings;
}
export const GlobalConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InitialAudioGain: S.optional(S.Number),
    InputEndAction: S.optional(GlobalConfigurationInputEndAction),
    InputLossBehavior: S.optional(InputLossBehavior),
    OutputLockingMode: S.optional(GlobalConfigurationOutputLockingMode),
    OutputTimingSource: S.optional(GlobalConfigurationOutputTimingSource),
    SupportLowFramerateInputs: S.optional(
      GlobalConfigurationLowFramerateInputs,
    ),
    OutputLockingSettings: S.optional(OutputLockingSettings),
  }).pipe(
    S.encodeKeys({
      InitialAudioGain: "initialAudioGain",
      InputEndAction: "inputEndAction",
      InputLossBehavior: "inputLossBehavior",
      OutputLockingMode: "outputLockingMode",
      OutputTimingSource: "outputTimingSource",
      SupportLowFramerateInputs: "supportLowFramerateInputs",
      OutputLockingSettings: "outputLockingSettings",
    }),
  ),
).annotate({
  identifier: "GlobalConfiguration",
}) as any as S.Schema<GlobalConfiguration>;
export type MotionGraphicsInsertion = "DISABLED" | "ENABLED" | (string & {});
export const MotionGraphicsInsertion = /*@__PURE__*/ S.String;

export interface HtmlMotionGraphicsSettings {}
export const HtmlMotionGraphicsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "HtmlMotionGraphicsSettings",
}) as any as S.Schema<HtmlMotionGraphicsSettings>;
export interface MotionGraphicsSettings {
  HtmlMotionGraphicsSettings?: HtmlMotionGraphicsSettings;
}
export const MotionGraphicsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HtmlMotionGraphicsSettings: S.optional(HtmlMotionGraphicsSettings),
  }).pipe(
    S.encodeKeys({ HtmlMotionGraphicsSettings: "htmlMotionGraphicsSettings" }),
  ),
).annotate({
  identifier: "MotionGraphicsSettings",
}) as any as S.Schema<MotionGraphicsSettings>;
export interface MotionGraphicsConfiguration {
  MotionGraphicsInsertion?: MotionGraphicsInsertion;
  MotionGraphicsSettings?: MotionGraphicsSettings;
}
export const MotionGraphicsConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MotionGraphicsInsertion: S.optional(MotionGraphicsInsertion),
    MotionGraphicsSettings: S.optional(MotionGraphicsSettings),
  }).pipe(
    S.encodeKeys({
      MotionGraphicsInsertion: "motionGraphicsInsertion",
      MotionGraphicsSettings: "motionGraphicsSettings",
    }),
  ),
).annotate({
  identifier: "MotionGraphicsConfiguration",
}) as any as S.Schema<MotionGraphicsConfiguration>;
export type NielsenPcmToId3TaggingState =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const NielsenPcmToId3TaggingState = /*@__PURE__*/ S.String;

export interface NielsenConfiguration {
  DistributorId?: string;
  NielsenPcmToId3Tagging?: NielsenPcmToId3TaggingState;
}
export const NielsenConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DistributorId: S.optional(S.String),
    NielsenPcmToId3Tagging: S.optional(NielsenPcmToId3TaggingState),
  }).pipe(
    S.encodeKeys({
      DistributorId: "distributorId",
      NielsenPcmToId3Tagging: "nielsenPcmToId3Tagging",
    }),
  ),
).annotate({
  identifier: "NielsenConfiguration",
}) as any as S.Schema<NielsenConfiguration>;
export type __stringMax32 = string;
export type S3CannedAcl =
  | "AUTHENTICATED_READ"
  | "BUCKET_OWNER_FULL_CONTROL"
  | "BUCKET_OWNER_READ"
  | "PUBLIC_READ"
  | (string & {});
export const S3CannedAcl = /*@__PURE__*/ S.String;

export interface ArchiveS3Settings {
  CannedAcl?: S3CannedAcl;
}
export const ArchiveS3Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CannedAcl: S.optional(S3CannedAcl) }).pipe(
    S.encodeKeys({ CannedAcl: "cannedAcl" }),
  ),
).annotate({
  identifier: "ArchiveS3Settings",
}) as any as S.Schema<ArchiveS3Settings>;
export interface ArchiveCdnSettings {
  ArchiveS3Settings?: ArchiveS3Settings;
}
export const ArchiveCdnSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ArchiveS3Settings: S.optional(ArchiveS3Settings) }).pipe(
    S.encodeKeys({ ArchiveS3Settings: "archiveS3Settings" }),
  ),
).annotate({
  identifier: "ArchiveCdnSettings",
}) as any as S.Schema<ArchiveCdnSettings>;
export interface OutputLocationRef {
  DestinationRefId?: string;
}
export const OutputLocationRef = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ DestinationRefId: S.optional(S.String) }).pipe(
    S.encodeKeys({ DestinationRefId: "destinationRefId" }),
  ),
).annotate({
  identifier: "OutputLocationRef",
}) as any as S.Schema<OutputLocationRef>;
export interface ArchiveGroupSettings {
  ArchiveCdnSettings?: ArchiveCdnSettings;
  Destination?: OutputLocationRef;
  RolloverInterval?: number;
}
export const ArchiveGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveCdnSettings: S.optional(ArchiveCdnSettings),
    Destination: S.optional(OutputLocationRef),
    RolloverInterval: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      ArchiveCdnSettings: "archiveCdnSettings",
      Destination: "destination",
      RolloverInterval: "rolloverInterval",
    }),
  ),
).annotate({
  identifier: "ArchiveGroupSettings",
}) as any as S.Schema<ArchiveGroupSettings>;
export interface FrameCaptureS3Settings {
  CannedAcl?: S3CannedAcl;
}
export const FrameCaptureS3Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CannedAcl: S.optional(S3CannedAcl) }).pipe(
    S.encodeKeys({ CannedAcl: "cannedAcl" }),
  ),
).annotate({
  identifier: "FrameCaptureS3Settings",
}) as any as S.Schema<FrameCaptureS3Settings>;
export interface FrameCaptureCdnSettings {
  FrameCaptureS3Settings?: FrameCaptureS3Settings;
}
export const FrameCaptureCdnSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FrameCaptureS3Settings: S.optional(FrameCaptureS3Settings) }).pipe(
    S.encodeKeys({ FrameCaptureS3Settings: "frameCaptureS3Settings" }),
  ),
).annotate({
  identifier: "FrameCaptureCdnSettings",
}) as any as S.Schema<FrameCaptureCdnSettings>;
export interface FrameCaptureGroupSettings {
  Destination?: OutputLocationRef;
  FrameCaptureCdnSettings?: FrameCaptureCdnSettings;
}
export const FrameCaptureGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: S.optional(OutputLocationRef),
    FrameCaptureCdnSettings: S.optional(FrameCaptureCdnSettings),
  }).pipe(
    S.encodeKeys({
      Destination: "destination",
      FrameCaptureCdnSettings: "frameCaptureCdnSettings",
    }),
  ),
).annotate({
  identifier: "FrameCaptureGroupSettings",
}) as any as S.Schema<FrameCaptureGroupSettings>;
export type HlsAdMarkers =
  | "ADOBE"
  | "ELEMENTAL"
  | "ELEMENTAL_SCTE35"
  | (string & {});
export const HlsAdMarkers = /*@__PURE__*/ S.String;

export type __listOfHlsAdMarkers = HlsAdMarkers[];
export const __listOfHlsAdMarkers = /*@__PURE__*/ S.Array(HlsAdMarkers);
export type __integerMin1Max4 = number;
export type __stringMin3Max3 = string;
export interface CaptionLanguageMapping {
  CaptionChannel?: number;
  LanguageCode?: string;
  LanguageDescription?: string;
}
export const CaptionLanguageMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CaptionChannel: S.optional(S.Number),
    LanguageCode: S.optional(S.String),
    LanguageDescription: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CaptionChannel: "captionChannel",
      LanguageCode: "languageCode",
      LanguageDescription: "languageDescription",
    }),
  ),
).annotate({
  identifier: "CaptionLanguageMapping",
}) as any as S.Schema<CaptionLanguageMapping>;
export type __listOfCaptionLanguageMapping = CaptionLanguageMapping[];
export const __listOfCaptionLanguageMapping = /*@__PURE__*/ S.Array(
  CaptionLanguageMapping,
);
export type HlsCaptionLanguageSetting =
  | "INSERT"
  | "NONE"
  | "OMIT"
  | (string & {});
export const HlsCaptionLanguageSetting = /*@__PURE__*/ S.String;

export type HlsClientCache = "DISABLED" | "ENABLED" | (string & {});
export const HlsClientCache = /*@__PURE__*/ S.String;

export type HlsCodecSpecification = "RFC_4281" | "RFC_6381" | (string & {});
export const HlsCodecSpecification = /*@__PURE__*/ S.String;

export type __stringMin32Max32 = string;
export type HlsDirectoryStructure =
  | "SINGLE_DIRECTORY"
  | "SUBDIRECTORY_PER_STREAM"
  | (string & {});
export const HlsDirectoryStructure = /*@__PURE__*/ S.String;

export type HlsDiscontinuityTags = "INSERT" | "NEVER_INSERT" | (string & {});
export const HlsDiscontinuityTags = /*@__PURE__*/ S.String;

export type HlsEncryptionType = "AES128" | "SAMPLE_AES" | (string & {});
export const HlsEncryptionType = /*@__PURE__*/ S.String;

export type __integerMin0Max600 = number;
export type HlsAkamaiHttpTransferMode =
  | "CHUNKED"
  | "NON_CHUNKED"
  | (string & {});
export const HlsAkamaiHttpTransferMode = /*@__PURE__*/ S.String;

export interface HlsAkamaiSettings {
  ConnectionRetryInterval?: number;
  FilecacheDuration?: number;
  HttpTransferMode?: HlsAkamaiHttpTransferMode;
  NumRetries?: number;
  RestartDelay?: number;
  Salt?: string;
  Token?: string;
}
export const HlsAkamaiSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionRetryInterval: S.optional(S.Number),
    FilecacheDuration: S.optional(S.Number),
    HttpTransferMode: S.optional(HlsAkamaiHttpTransferMode),
    NumRetries: S.optional(S.Number),
    RestartDelay: S.optional(S.Number),
    Salt: S.optional(S.String),
    Token: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ConnectionRetryInterval: "connectionRetryInterval",
      FilecacheDuration: "filecacheDuration",
      HttpTransferMode: "httpTransferMode",
      NumRetries: "numRetries",
      RestartDelay: "restartDelay",
      Salt: "salt",
      Token: "token",
    }),
  ),
).annotate({
  identifier: "HlsAkamaiSettings",
}) as any as S.Schema<HlsAkamaiSettings>;
export interface HlsBasicPutSettings {
  ConnectionRetryInterval?: number;
  FilecacheDuration?: number;
  NumRetries?: number;
  RestartDelay?: number;
}
export const HlsBasicPutSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionRetryInterval: S.optional(S.Number),
    FilecacheDuration: S.optional(S.Number),
    NumRetries: S.optional(S.Number),
    RestartDelay: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      ConnectionRetryInterval: "connectionRetryInterval",
      FilecacheDuration: "filecacheDuration",
      NumRetries: "numRetries",
      RestartDelay: "restartDelay",
    }),
  ),
).annotate({
  identifier: "HlsBasicPutSettings",
}) as any as S.Schema<HlsBasicPutSettings>;
export type HlsMediaStoreStorageClass = "TEMPORAL" | (string & {});
export const HlsMediaStoreStorageClass = /*@__PURE__*/ S.String;

export interface HlsMediaStoreSettings {
  ConnectionRetryInterval?: number;
  FilecacheDuration?: number;
  MediaStoreStorageClass?: HlsMediaStoreStorageClass;
  NumRetries?: number;
  RestartDelay?: number;
}
export const HlsMediaStoreSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionRetryInterval: S.optional(S.Number),
    FilecacheDuration: S.optional(S.Number),
    MediaStoreStorageClass: S.optional(HlsMediaStoreStorageClass),
    NumRetries: S.optional(S.Number),
    RestartDelay: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      ConnectionRetryInterval: "connectionRetryInterval",
      FilecacheDuration: "filecacheDuration",
      MediaStoreStorageClass: "mediaStoreStorageClass",
      NumRetries: "numRetries",
      RestartDelay: "restartDelay",
    }),
  ),
).annotate({
  identifier: "HlsMediaStoreSettings",
}) as any as S.Schema<HlsMediaStoreSettings>;
export interface HlsS3Settings {
  CannedAcl?: S3CannedAcl;
}
export const HlsS3Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CannedAcl: S.optional(S3CannedAcl) }).pipe(
    S.encodeKeys({ CannedAcl: "cannedAcl" }),
  ),
).annotate({ identifier: "HlsS3Settings" }) as any as S.Schema<HlsS3Settings>;
export type HlsWebdavHttpTransferMode =
  | "CHUNKED"
  | "NON_CHUNKED"
  | (string & {});
export const HlsWebdavHttpTransferMode = /*@__PURE__*/ S.String;

export interface HlsWebdavSettings {
  ConnectionRetryInterval?: number;
  FilecacheDuration?: number;
  HttpTransferMode?: HlsWebdavHttpTransferMode;
  NumRetries?: number;
  RestartDelay?: number;
}
export const HlsWebdavSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectionRetryInterval: S.optional(S.Number),
    FilecacheDuration: S.optional(S.Number),
    HttpTransferMode: S.optional(HlsWebdavHttpTransferMode),
    NumRetries: S.optional(S.Number),
    RestartDelay: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      ConnectionRetryInterval: "connectionRetryInterval",
      FilecacheDuration: "filecacheDuration",
      HttpTransferMode: "httpTransferMode",
      NumRetries: "numRetries",
      RestartDelay: "restartDelay",
    }),
  ),
).annotate({
  identifier: "HlsWebdavSettings",
}) as any as S.Schema<HlsWebdavSettings>;
export interface HlsCdnSettings {
  HlsAkamaiSettings?: HlsAkamaiSettings;
  HlsBasicPutSettings?: HlsBasicPutSettings;
  HlsMediaStoreSettings?: HlsMediaStoreSettings;
  HlsS3Settings?: HlsS3Settings;
  HlsWebdavSettings?: HlsWebdavSettings;
}
export const HlsCdnSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HlsAkamaiSettings: S.optional(HlsAkamaiSettings),
    HlsBasicPutSettings: S.optional(HlsBasicPutSettings),
    HlsMediaStoreSettings: S.optional(HlsMediaStoreSettings),
    HlsS3Settings: S.optional(HlsS3Settings),
    HlsWebdavSettings: S.optional(HlsWebdavSettings),
  }).pipe(
    S.encodeKeys({
      HlsAkamaiSettings: "hlsAkamaiSettings",
      HlsBasicPutSettings: "hlsBasicPutSettings",
      HlsMediaStoreSettings: "hlsMediaStoreSettings",
      HlsS3Settings: "hlsS3Settings",
      HlsWebdavSettings: "hlsWebdavSettings",
    }),
  ),
).annotate({ identifier: "HlsCdnSettings" }) as any as S.Schema<HlsCdnSettings>;
export type HlsId3SegmentTaggingState = "DISABLED" | "ENABLED" | (string & {});
export const HlsId3SegmentTaggingState = /*@__PURE__*/ S.String;

export type IFrameOnlyPlaylistType = "DISABLED" | "STANDARD" | (string & {});
export const IFrameOnlyPlaylistType = /*@__PURE__*/ S.String;

export type HlsIncompleteSegmentBehavior = "AUTO" | "SUPPRESS" | (string & {});
export const HlsIncompleteSegmentBehavior = /*@__PURE__*/ S.String;

export type __integerMin3 = number;
export type InputLossActionForHlsOut =
  | "EMIT_OUTPUT"
  | "PAUSE_OUTPUT"
  | (string & {});
export const InputLossActionForHlsOut = /*@__PURE__*/ S.String;

export type HlsIvInManifest = "EXCLUDE" | "INCLUDE" | (string & {});
export const HlsIvInManifest = /*@__PURE__*/ S.String;

export type HlsIvSource = "EXPLICIT" | "FOLLOWS_SEGMENT_NUMBER" | (string & {});
export const HlsIvSource = /*@__PURE__*/ S.String;

export interface StaticKeySettings {
  KeyProviderServer?: InputLocation;
  StaticKeyValue?: string | redacted.Redacted<string>;
}
export const StaticKeySettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyProviderServer: S.optional(InputLocation),
    StaticKeyValue: S.optional(SensitiveString),
  }).pipe(
    S.encodeKeys({
      KeyProviderServer: "keyProviderServer",
      StaticKeyValue: "staticKeyValue",
    }),
  ),
).annotate({
  identifier: "StaticKeySettings",
}) as any as S.Schema<StaticKeySettings>;
export interface KeyProviderSettings {
  StaticKeySettings?: StaticKeySettings;
}
export const KeyProviderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StaticKeySettings: S.optional(StaticKeySettings) }).pipe(
    S.encodeKeys({ StaticKeySettings: "staticKeySettings" }),
  ),
).annotate({
  identifier: "KeyProviderSettings",
}) as any as S.Schema<KeyProviderSettings>;
export type HlsManifestCompression = "GZIP" | "NONE" | (string & {});
export const HlsManifestCompression = /*@__PURE__*/ S.String;

export type HlsManifestDurationFormat =
  | "FLOATING_POINT"
  | "INTEGER"
  | (string & {});
export const HlsManifestDurationFormat = /*@__PURE__*/ S.String;

export type HlsMode = "LIVE" | "VOD" | (string & {});
export const HlsMode = /*@__PURE__*/ S.String;

export type HlsOutputSelection =
  | "MANIFESTS_AND_SEGMENTS"
  | "SEGMENTS_ONLY"
  | "VARIANT_MANIFESTS_AND_SEGMENTS"
  | (string & {});
export const HlsOutputSelection = /*@__PURE__*/ S.String;

export type HlsProgramDateTime = "EXCLUDE" | "INCLUDE" | (string & {});
export const HlsProgramDateTime = /*@__PURE__*/ S.String;

export type HlsProgramDateTimeClock =
  | "INITIALIZE_FROM_OUTPUT_TIMECODE"
  | "SYSTEM_CLOCK"
  | (string & {});
export const HlsProgramDateTimeClock = /*@__PURE__*/ S.String;

export type __integerMin0Max3600 = number;
export type HlsRedundantManifest = "DISABLED" | "ENABLED" | (string & {});
export const HlsRedundantManifest = /*@__PURE__*/ S.String;

export type HlsSegmentationMode =
  | "USE_INPUT_SEGMENTATION"
  | "USE_SEGMENT_DURATION"
  | (string & {});
export const HlsSegmentationMode = /*@__PURE__*/ S.String;

export type HlsStreamInfResolution = "EXCLUDE" | "INCLUDE" | (string & {});
export const HlsStreamInfResolution = /*@__PURE__*/ S.String;

export type HlsTimedMetadataId3Frame = "NONE" | "PRIV" | "TDRL" | (string & {});
export const HlsTimedMetadataId3Frame = /*@__PURE__*/ S.String;

export type HlsTsFileMode = "SEGMENTED_FILES" | "SINGLE_FILE" | (string & {});
export const HlsTsFileMode = /*@__PURE__*/ S.String;

export interface HlsGroupSettings {
  AdMarkers?: HlsAdMarkers[];
  BaseUrlContent?: string;
  BaseUrlContent1?: string;
  BaseUrlManifest?: string;
  BaseUrlManifest1?: string;
  CaptionLanguageMappings?: CaptionLanguageMapping[];
  CaptionLanguageSetting?: HlsCaptionLanguageSetting;
  ClientCache?: HlsClientCache;
  CodecSpecification?: HlsCodecSpecification;
  ConstantIv?: string;
  Destination?: OutputLocationRef;
  DirectoryStructure?: HlsDirectoryStructure;
  DiscontinuityTags?: HlsDiscontinuityTags;
  EncryptionType?: HlsEncryptionType;
  HlsCdnSettings?: HlsCdnSettings;
  HlsId3SegmentTagging?: HlsId3SegmentTaggingState;
  IFrameOnlyPlaylists?: IFrameOnlyPlaylistType;
  IncompleteSegmentBehavior?: HlsIncompleteSegmentBehavior;
  IndexNSegments?: number;
  InputLossAction?: InputLossActionForHlsOut;
  IvInManifest?: HlsIvInManifest;
  IvSource?: HlsIvSource;
  KeepSegments?: number;
  KeyFormat?: string;
  KeyFormatVersions?: string;
  KeyProviderSettings?: KeyProviderSettings;
  ManifestCompression?: HlsManifestCompression;
  ManifestDurationFormat?: HlsManifestDurationFormat;
  MinSegmentLength?: number;
  Mode?: HlsMode;
  OutputSelection?: HlsOutputSelection;
  ProgramDateTime?: HlsProgramDateTime;
  ProgramDateTimeClock?: HlsProgramDateTimeClock;
  ProgramDateTimePeriod?: number;
  RedundantManifest?: HlsRedundantManifest;
  SegmentLength?: number;
  SegmentationMode?: HlsSegmentationMode;
  SegmentsPerSubdirectory?: number;
  StreamInfResolution?: HlsStreamInfResolution;
  TimedMetadataId3Frame?: HlsTimedMetadataId3Frame;
  TimedMetadataId3Period?: number;
  TimestampDeltaMilliseconds?: number;
  TsFileMode?: HlsTsFileMode;
}
export const HlsGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdMarkers: S.optional(__listOfHlsAdMarkers),
    BaseUrlContent: S.optional(S.String),
    BaseUrlContent1: S.optional(S.String),
    BaseUrlManifest: S.optional(S.String),
    BaseUrlManifest1: S.optional(S.String),
    CaptionLanguageMappings: S.optional(__listOfCaptionLanguageMapping),
    CaptionLanguageSetting: S.optional(HlsCaptionLanguageSetting),
    ClientCache: S.optional(HlsClientCache),
    CodecSpecification: S.optional(HlsCodecSpecification),
    ConstantIv: S.optional(S.String),
    Destination: S.optional(OutputLocationRef),
    DirectoryStructure: S.optional(HlsDirectoryStructure),
    DiscontinuityTags: S.optional(HlsDiscontinuityTags),
    EncryptionType: S.optional(HlsEncryptionType),
    HlsCdnSettings: S.optional(HlsCdnSettings),
    HlsId3SegmentTagging: S.optional(HlsId3SegmentTaggingState),
    IFrameOnlyPlaylists: S.optional(IFrameOnlyPlaylistType),
    IncompleteSegmentBehavior: S.optional(HlsIncompleteSegmentBehavior),
    IndexNSegments: S.optional(S.Number),
    InputLossAction: S.optional(InputLossActionForHlsOut),
    IvInManifest: S.optional(HlsIvInManifest),
    IvSource: S.optional(HlsIvSource),
    KeepSegments: S.optional(S.Number),
    KeyFormat: S.optional(S.String),
    KeyFormatVersions: S.optional(S.String),
    KeyProviderSettings: S.optional(KeyProviderSettings),
    ManifestCompression: S.optional(HlsManifestCompression),
    ManifestDurationFormat: S.optional(HlsManifestDurationFormat),
    MinSegmentLength: S.optional(S.Number),
    Mode: S.optional(HlsMode),
    OutputSelection: S.optional(HlsOutputSelection),
    ProgramDateTime: S.optional(HlsProgramDateTime),
    ProgramDateTimeClock: S.optional(HlsProgramDateTimeClock),
    ProgramDateTimePeriod: S.optional(S.Number),
    RedundantManifest: S.optional(HlsRedundantManifest),
    SegmentLength: S.optional(S.Number),
    SegmentationMode: S.optional(HlsSegmentationMode),
    SegmentsPerSubdirectory: S.optional(S.Number),
    StreamInfResolution: S.optional(HlsStreamInfResolution),
    TimedMetadataId3Frame: S.optional(HlsTimedMetadataId3Frame),
    TimedMetadataId3Period: S.optional(S.Number),
    TimestampDeltaMilliseconds: S.optional(S.Number),
    TsFileMode: S.optional(HlsTsFileMode),
  }).pipe(
    S.encodeKeys({
      AdMarkers: "adMarkers",
      BaseUrlContent: "baseUrlContent",
      BaseUrlContent1: "baseUrlContent1",
      BaseUrlManifest: "baseUrlManifest",
      BaseUrlManifest1: "baseUrlManifest1",
      CaptionLanguageMappings: "captionLanguageMappings",
      CaptionLanguageSetting: "captionLanguageSetting",
      ClientCache: "clientCache",
      CodecSpecification: "codecSpecification",
      ConstantIv: "constantIv",
      Destination: "destination",
      DirectoryStructure: "directoryStructure",
      DiscontinuityTags: "discontinuityTags",
      EncryptionType: "encryptionType",
      HlsCdnSettings: "hlsCdnSettings",
      HlsId3SegmentTagging: "hlsId3SegmentTagging",
      IFrameOnlyPlaylists: "iFrameOnlyPlaylists",
      IncompleteSegmentBehavior: "incompleteSegmentBehavior",
      IndexNSegments: "indexNSegments",
      InputLossAction: "inputLossAction",
      IvInManifest: "ivInManifest",
      IvSource: "ivSource",
      KeepSegments: "keepSegments",
      KeyFormat: "keyFormat",
      KeyFormatVersions: "keyFormatVersions",
      KeyProviderSettings: "keyProviderSettings",
      ManifestCompression: "manifestCompression",
      ManifestDurationFormat: "manifestDurationFormat",
      MinSegmentLength: "minSegmentLength",
      Mode: "mode",
      OutputSelection: "outputSelection",
      ProgramDateTime: "programDateTime",
      ProgramDateTimeClock: "programDateTimeClock",
      ProgramDateTimePeriod: "programDateTimePeriod",
      RedundantManifest: "redundantManifest",
      SegmentLength: "segmentLength",
      SegmentationMode: "segmentationMode",
      SegmentsPerSubdirectory: "segmentsPerSubdirectory",
      StreamInfResolution: "streamInfResolution",
      TimedMetadataId3Frame: "timedMetadataId3Frame",
      TimedMetadataId3Period: "timedMetadataId3Period",
      TimestampDeltaMilliseconds: "timestampDeltaMilliseconds",
      TsFileMode: "tsFileMode",
    }),
  ),
).annotate({
  identifier: "HlsGroupSettings",
}) as any as S.Schema<HlsGroupSettings>;
export type CmafId3Behavior = "DISABLED" | "ENABLED" | (string & {});
export const CmafId3Behavior = /*@__PURE__*/ S.String;

export type CmafKLVBehavior = "NO_PASSTHROUGH" | "PASSTHROUGH" | (string & {});
export const CmafKLVBehavior = /*@__PURE__*/ S.String;

export type CmafNielsenId3Behavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export const CmafNielsenId3Behavior = /*@__PURE__*/ S.String;

export type Scte35Type =
  | "NONE"
  | "SCTE_35_WITHOUT_SEGMENTATION"
  | (string & {});
export const Scte35Type = /*@__PURE__*/ S.String;

export type CmafIngestSegmentLengthUnits =
  | "MILLISECONDS"
  | "SECONDS"
  | (string & {});
export const CmafIngestSegmentLengthUnits = /*@__PURE__*/ S.String;

export type CmafTimedMetadataId3Frame =
  | "NONE"
  | "PRIV"
  | "TDRL"
  | (string & {});
export const CmafTimedMetadataId3Frame = /*@__PURE__*/ S.String;

export type __integerMin0Max10000 = number;
export type CmafTimedMetadataPassthrough =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const CmafTimedMetadataPassthrough = /*@__PURE__*/ S.String;

export interface MediaPackageAdditionalDestinations {
  Destination?: OutputLocationRef;
}
export const MediaPackageAdditionalDestinations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Destination: S.optional(OutputLocationRef) }).pipe(
    S.encodeKeys({ Destination: "destination" }),
  ),
).annotate({
  identifier: "MediaPackageAdditionalDestinations",
}) as any as S.Schema<MediaPackageAdditionalDestinations>;
export type __listOfMediaPackageAdditionalDestinations =
  MediaPackageAdditionalDestinations[];
export const __listOfMediaPackageAdditionalDestinations = /*@__PURE__*/ S.Array(
  MediaPackageAdditionalDestinations,
);
export interface MediaPackageV2GroupSettings {
  CaptionLanguageMappings?: CaptionLanguageMapping[];
  Id3Behavior?: CmafId3Behavior;
  KlvBehavior?: CmafKLVBehavior;
  NielsenId3Behavior?: CmafNielsenId3Behavior;
  Scte35Type?: Scte35Type;
  SegmentLength?: number;
  SegmentLengthUnits?: CmafIngestSegmentLengthUnits;
  TimedMetadataId3Frame?: CmafTimedMetadataId3Frame;
  TimedMetadataId3Period?: number;
  TimedMetadataPassthrough?: CmafTimedMetadataPassthrough;
  AdditionalDestinations?: MediaPackageAdditionalDestinations[];
}
export const MediaPackageV2GroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CaptionLanguageMappings: S.optional(__listOfCaptionLanguageMapping),
    Id3Behavior: S.optional(CmafId3Behavior),
    KlvBehavior: S.optional(CmafKLVBehavior),
    NielsenId3Behavior: S.optional(CmafNielsenId3Behavior),
    Scte35Type: S.optional(Scte35Type),
    SegmentLength: S.optional(S.Number),
    SegmentLengthUnits: S.optional(CmafIngestSegmentLengthUnits),
    TimedMetadataId3Frame: S.optional(CmafTimedMetadataId3Frame),
    TimedMetadataId3Period: S.optional(S.Number),
    TimedMetadataPassthrough: S.optional(CmafTimedMetadataPassthrough),
    AdditionalDestinations: S.optional(
      __listOfMediaPackageAdditionalDestinations,
    ),
  }).pipe(
    S.encodeKeys({
      CaptionLanguageMappings: "captionLanguageMappings",
      Id3Behavior: "id3Behavior",
      KlvBehavior: "klvBehavior",
      NielsenId3Behavior: "nielsenId3Behavior",
      Scte35Type: "scte35Type",
      SegmentLength: "segmentLength",
      SegmentLengthUnits: "segmentLengthUnits",
      TimedMetadataId3Frame: "timedMetadataId3Frame",
      TimedMetadataId3Period: "timedMetadataId3Period",
      TimedMetadataPassthrough: "timedMetadataPassthrough",
      AdditionalDestinations: "additionalDestinations",
    }),
  ),
).annotate({
  identifier: "MediaPackageV2GroupSettings",
}) as any as S.Schema<MediaPackageV2GroupSettings>;
export interface MediaPackageGroupSettings {
  Destination?: OutputLocationRef;
  MediapackageV2GroupSettings?: MediaPackageV2GroupSettings;
}
export const MediaPackageGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: S.optional(OutputLocationRef),
    MediapackageV2GroupSettings: S.optional(MediaPackageV2GroupSettings),
  }).pipe(
    S.encodeKeys({
      Destination: "destination",
      MediapackageV2GroupSettings: "mediapackageV2GroupSettings",
    }),
  ),
).annotate({
  identifier: "MediaPackageGroupSettings",
}) as any as S.Schema<MediaPackageGroupSettings>;
export type SmoothGroupAudioOnlyTimecodeControl =
  | "PASSTHROUGH"
  | "USE_CONFIGURED_CLOCK"
  | (string & {});
export const SmoothGroupAudioOnlyTimecodeControl = /*@__PURE__*/ S.String;

export type SmoothGroupCertificateMode =
  | "SELF_SIGNED"
  | "VERIFY_AUTHENTICITY"
  | (string & {});
export const SmoothGroupCertificateMode = /*@__PURE__*/ S.String;

export type SmoothGroupEventIdMode =
  | "NO_EVENT_ID"
  | "USE_CONFIGURED"
  | "USE_TIMESTAMP"
  | (string & {});
export const SmoothGroupEventIdMode = /*@__PURE__*/ S.String;

export type SmoothGroupEventStopBehavior = "NONE" | "SEND_EOS" | (string & {});
export const SmoothGroupEventStopBehavior = /*@__PURE__*/ S.String;

export type InputLossActionForMsSmoothOut =
  | "EMIT_OUTPUT"
  | "PAUSE_OUTPUT"
  | (string & {});
export const InputLossActionForMsSmoothOut = /*@__PURE__*/ S.String;

export type SmoothGroupSegmentationMode =
  | "USE_INPUT_SEGMENTATION"
  | "USE_SEGMENT_DURATION"
  | (string & {});
export const SmoothGroupSegmentationMode = /*@__PURE__*/ S.String;

export type SmoothGroupSparseTrackType =
  | "NONE"
  | "SCTE_35"
  | "SCTE_35_WITHOUT_SEGMENTATION"
  | (string & {});
export const SmoothGroupSparseTrackType = /*@__PURE__*/ S.String;

export type SmoothGroupStreamManifestBehavior =
  | "DO_NOT_SEND"
  | "SEND"
  | (string & {});
export const SmoothGroupStreamManifestBehavior = /*@__PURE__*/ S.String;

export type SmoothGroupTimestampOffsetMode =
  | "USE_CONFIGURED_OFFSET"
  | "USE_EVENT_START_DATE"
  | (string & {});
export const SmoothGroupTimestampOffsetMode = /*@__PURE__*/ S.String;

export interface MsSmoothGroupSettings {
  AcquisitionPointId?: string;
  AudioOnlyTimecodeControl?: SmoothGroupAudioOnlyTimecodeControl;
  CertificateMode?: SmoothGroupCertificateMode;
  ConnectionRetryInterval?: number;
  Destination?: OutputLocationRef;
  EventId?: string;
  EventIdMode?: SmoothGroupEventIdMode;
  EventStopBehavior?: SmoothGroupEventStopBehavior;
  FilecacheDuration?: number;
  FragmentLength?: number;
  InputLossAction?: InputLossActionForMsSmoothOut;
  NumRetries?: number;
  RestartDelay?: number;
  SegmentationMode?: SmoothGroupSegmentationMode;
  SendDelayMs?: number;
  SparseTrackType?: SmoothGroupSparseTrackType;
  StreamManifestBehavior?: SmoothGroupStreamManifestBehavior;
  TimestampOffset?: string;
  TimestampOffsetMode?: SmoothGroupTimestampOffsetMode;
}
export const MsSmoothGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AcquisitionPointId: S.optional(S.String),
    AudioOnlyTimecodeControl: S.optional(SmoothGroupAudioOnlyTimecodeControl),
    CertificateMode: S.optional(SmoothGroupCertificateMode),
    ConnectionRetryInterval: S.optional(S.Number),
    Destination: S.optional(OutputLocationRef),
    EventId: S.optional(S.String),
    EventIdMode: S.optional(SmoothGroupEventIdMode),
    EventStopBehavior: S.optional(SmoothGroupEventStopBehavior),
    FilecacheDuration: S.optional(S.Number),
    FragmentLength: S.optional(S.Number),
    InputLossAction: S.optional(InputLossActionForMsSmoothOut),
    NumRetries: S.optional(S.Number),
    RestartDelay: S.optional(S.Number),
    SegmentationMode: S.optional(SmoothGroupSegmentationMode),
    SendDelayMs: S.optional(S.Number),
    SparseTrackType: S.optional(SmoothGroupSparseTrackType),
    StreamManifestBehavior: S.optional(SmoothGroupStreamManifestBehavior),
    TimestampOffset: S.optional(S.String),
    TimestampOffsetMode: S.optional(SmoothGroupTimestampOffsetMode),
  }).pipe(
    S.encodeKeys({
      AcquisitionPointId: "acquisitionPointId",
      AudioOnlyTimecodeControl: "audioOnlyTimecodeControl",
      CertificateMode: "certificateMode",
      ConnectionRetryInterval: "connectionRetryInterval",
      Destination: "destination",
      EventId: "eventId",
      EventIdMode: "eventIdMode",
      EventStopBehavior: "eventStopBehavior",
      FilecacheDuration: "filecacheDuration",
      FragmentLength: "fragmentLength",
      InputLossAction: "inputLossAction",
      NumRetries: "numRetries",
      RestartDelay: "restartDelay",
      SegmentationMode: "segmentationMode",
      SendDelayMs: "sendDelayMs",
      SparseTrackType: "sparseTrackType",
      StreamManifestBehavior: "streamManifestBehavior",
      TimestampOffset: "timestampOffset",
      TimestampOffsetMode: "timestampOffsetMode",
    }),
  ),
).annotate({
  identifier: "MsSmoothGroupSettings",
}) as any as S.Schema<MsSmoothGroupSettings>;
export interface MultiplexGroupSettings {}
export const MultiplexGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "MultiplexGroupSettings",
}) as any as S.Schema<MultiplexGroupSettings>;
export type RtmpAdMarkers = "ON_CUE_POINT_SCTE35" | (string & {});
export const RtmpAdMarkers = /*@__PURE__*/ S.String;

export type __listOfRtmpAdMarkers = RtmpAdMarkers[];
export const __listOfRtmpAdMarkers = /*@__PURE__*/ S.Array(RtmpAdMarkers);
export type AuthenticationScheme = "AKAMAI" | "COMMON" | (string & {});
export const AuthenticationScheme = /*@__PURE__*/ S.String;

export type RtmpCacheFullBehavior =
  | "DISCONNECT_IMMEDIATELY"
  | "WAIT_FOR_SERVER"
  | (string & {});
export const RtmpCacheFullBehavior = /*@__PURE__*/ S.String;

export type __integerMin30 = number;
export type RtmpCaptionData =
  | "ALL"
  | "FIELD1_608"
  | "FIELD1_AND_FIELD2_608"
  | (string & {});
export const RtmpCaptionData = /*@__PURE__*/ S.String;

export type InputLossActionForRtmpOut =
  | "EMIT_OUTPUT"
  | "PAUSE_OUTPUT"
  | (string & {});
export const InputLossActionForRtmpOut = /*@__PURE__*/ S.String;

export type IncludeFillerNalUnits = "AUTO" | "DROP" | "INCLUDE" | (string & {});
export const IncludeFillerNalUnits = /*@__PURE__*/ S.String;

export interface RtmpGroupSettings {
  AdMarkers?: RtmpAdMarkers[];
  AuthenticationScheme?: AuthenticationScheme;
  CacheFullBehavior?: RtmpCacheFullBehavior;
  CacheLength?: number;
  CaptionData?: RtmpCaptionData;
  InputLossAction?: InputLossActionForRtmpOut;
  RestartDelay?: number;
  IncludeFillerNalUnits?: IncludeFillerNalUnits;
}
export const RtmpGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdMarkers: S.optional(__listOfRtmpAdMarkers),
    AuthenticationScheme: S.optional(AuthenticationScheme),
    CacheFullBehavior: S.optional(RtmpCacheFullBehavior),
    CacheLength: S.optional(S.Number),
    CaptionData: S.optional(RtmpCaptionData),
    InputLossAction: S.optional(InputLossActionForRtmpOut),
    RestartDelay: S.optional(S.Number),
    IncludeFillerNalUnits: S.optional(IncludeFillerNalUnits),
  }).pipe(
    S.encodeKeys({
      AdMarkers: "adMarkers",
      AuthenticationScheme: "authenticationScheme",
      CacheFullBehavior: "cacheFullBehavior",
      CacheLength: "cacheLength",
      CaptionData: "captionData",
      InputLossAction: "inputLossAction",
      RestartDelay: "restartDelay",
      IncludeFillerNalUnits: "includeFillerNalUnits",
    }),
  ),
).annotate({
  identifier: "RtmpGroupSettings",
}) as any as S.Schema<RtmpGroupSettings>;
export type InputLossActionForUdpOut =
  | "DROP_PROGRAM"
  | "DROP_TS"
  | "EMIT_PROGRAM"
  | (string & {});
export const InputLossActionForUdpOut = /*@__PURE__*/ S.String;

export type UdpTimedMetadataId3Frame = "NONE" | "PRIV" | "TDRL" | (string & {});
export const UdpTimedMetadataId3Frame = /*@__PURE__*/ S.String;

export interface UdpGroupSettings {
  InputLossAction?: InputLossActionForUdpOut;
  TimedMetadataId3Frame?: UdpTimedMetadataId3Frame;
  TimedMetadataId3Period?: number;
}
export const UdpGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputLossAction: S.optional(InputLossActionForUdpOut),
    TimedMetadataId3Frame: S.optional(UdpTimedMetadataId3Frame),
    TimedMetadataId3Period: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      InputLossAction: "inputLossAction",
      TimedMetadataId3Frame: "timedMetadataId3Frame",
      TimedMetadataId3Period: "timedMetadataId3Period",
    }),
  ),
).annotate({
  identifier: "UdpGroupSettings",
}) as any as S.Schema<UdpGroupSettings>;
export type __integerMin0Max2000 = number;
export type __stringMax100 = string;
export interface CmafIngestCaptionLanguageMapping {
  CaptionChannel?: number;
  LanguageCode?: string;
}
export const CmafIngestCaptionLanguageMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CaptionChannel: S.optional(S.Number),
    LanguageCode: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CaptionChannel: "captionChannel",
      LanguageCode: "languageCode",
    }),
  ),
).annotate({
  identifier: "CmafIngestCaptionLanguageMapping",
}) as any as S.Schema<CmafIngestCaptionLanguageMapping>;
export type __listOfCmafIngestCaptionLanguageMapping =
  CmafIngestCaptionLanguageMapping[];
export const __listOfCmafIngestCaptionLanguageMapping = /*@__PURE__*/ S.Array(
  CmafIngestCaptionLanguageMapping,
);
export interface AdditionalDestinations {
  Destination?: OutputLocationRef;
}
export const AdditionalDestinations = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Destination: S.optional(OutputLocationRef) }).pipe(
    S.encodeKeys({ Destination: "destination" }),
  ),
).annotate({
  identifier: "AdditionalDestinations",
}) as any as S.Schema<AdditionalDestinations>;
export type __listOfAdditionalDestinations = AdditionalDestinations[];
export const __listOfAdditionalDestinations = /*@__PURE__*/ S.Array(
  AdditionalDestinations,
);
export interface CmafIngestGroupSettings {
  Destination?: OutputLocationRef;
  NielsenId3Behavior?: CmafNielsenId3Behavior;
  Scte35Type?: Scte35Type;
  SegmentLength?: number;
  SegmentLengthUnits?: CmafIngestSegmentLengthUnits;
  SendDelayMs?: number;
  KlvBehavior?: CmafKLVBehavior;
  KlvNameModifier?: string;
  NielsenId3NameModifier?: string;
  Scte35NameModifier?: string;
  Id3Behavior?: CmafId3Behavior;
  Id3NameModifier?: string;
  CaptionLanguageMappings?: CmafIngestCaptionLanguageMapping[];
  TimedMetadataId3Frame?: CmafTimedMetadataId3Frame;
  TimedMetadataId3Period?: number;
  TimedMetadataPassthrough?: CmafTimedMetadataPassthrough;
  AdditionalDestinations?: AdditionalDestinations[];
}
export const CmafIngestGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: S.optional(OutputLocationRef),
    NielsenId3Behavior: S.optional(CmafNielsenId3Behavior),
    Scte35Type: S.optional(Scte35Type),
    SegmentLength: S.optional(S.Number),
    SegmentLengthUnits: S.optional(CmafIngestSegmentLengthUnits),
    SendDelayMs: S.optional(S.Number),
    KlvBehavior: S.optional(CmafKLVBehavior),
    KlvNameModifier: S.optional(S.String),
    NielsenId3NameModifier: S.optional(S.String),
    Scte35NameModifier: S.optional(S.String),
    Id3Behavior: S.optional(CmafId3Behavior),
    Id3NameModifier: S.optional(S.String),
    CaptionLanguageMappings: S.optional(
      __listOfCmafIngestCaptionLanguageMapping,
    ),
    TimedMetadataId3Frame: S.optional(CmafTimedMetadataId3Frame),
    TimedMetadataId3Period: S.optional(S.Number),
    TimedMetadataPassthrough: S.optional(CmafTimedMetadataPassthrough),
    AdditionalDestinations: S.optional(__listOfAdditionalDestinations),
  }).pipe(
    S.encodeKeys({
      Destination: "destination",
      NielsenId3Behavior: "nielsenId3Behavior",
      Scte35Type: "scte35Type",
      SegmentLength: "segmentLength",
      SegmentLengthUnits: "segmentLengthUnits",
      SendDelayMs: "sendDelayMs",
      KlvBehavior: "klvBehavior",
      KlvNameModifier: "klvNameModifier",
      NielsenId3NameModifier: "nielsenId3NameModifier",
      Scte35NameModifier: "scte35NameModifier",
      Id3Behavior: "id3Behavior",
      Id3NameModifier: "id3NameModifier",
      CaptionLanguageMappings: "captionLanguageMappings",
      TimedMetadataId3Frame: "timedMetadataId3Frame",
      TimedMetadataId3Period: "timedMetadataId3Period",
      TimedMetadataPassthrough: "timedMetadataPassthrough",
      AdditionalDestinations: "additionalDestinations",
    }),
  ),
).annotate({
  identifier: "CmafIngestGroupSettings",
}) as any as S.Schema<CmafIngestGroupSettings>;
export interface SrtGroupSettings {
  InputLossAction?: InputLossActionForUdpOut;
}
export const SrtGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputLossAction: S.optional(InputLossActionForUdpOut) }).pipe(
    S.encodeKeys({ InputLossAction: "inputLossAction" }),
  ),
).annotate({
  identifier: "SrtGroupSettings",
}) as any as S.Schema<SrtGroupSettings>;
export interface MediaConnectRouterGroupSettings {
  AvailabilityZones?: string[];
}
export const MediaConnectRouterGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AvailabilityZones: S.optional(__listOf__string) }).pipe(
    S.encodeKeys({ AvailabilityZones: "availabilityZones" }),
  ),
).annotate({
  identifier: "MediaConnectRouterGroupSettings",
}) as any as S.Schema<MediaConnectRouterGroupSettings>;
export interface OutputGroupSettings {
  ArchiveGroupSettings?: ArchiveGroupSettings;
  FrameCaptureGroupSettings?: FrameCaptureGroupSettings;
  HlsGroupSettings?: HlsGroupSettings;
  MediaPackageGroupSettings?: MediaPackageGroupSettings;
  MsSmoothGroupSettings?: MsSmoothGroupSettings;
  MultiplexGroupSettings?: MultiplexGroupSettings;
  RtmpGroupSettings?: RtmpGroupSettings;
  UdpGroupSettings?: UdpGroupSettings;
  CmafIngestGroupSettings?: CmafIngestGroupSettings;
  SrtGroupSettings?: SrtGroupSettings;
  MediaConnectRouterGroupSettings?: MediaConnectRouterGroupSettings;
}
export const OutputGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveGroupSettings: S.optional(ArchiveGroupSettings),
    FrameCaptureGroupSettings: S.optional(FrameCaptureGroupSettings),
    HlsGroupSettings: S.optional(HlsGroupSettings),
    MediaPackageGroupSettings: S.optional(MediaPackageGroupSettings),
    MsSmoothGroupSettings: S.optional(MsSmoothGroupSettings),
    MultiplexGroupSettings: S.optional(MultiplexGroupSettings),
    RtmpGroupSettings: S.optional(RtmpGroupSettings),
    UdpGroupSettings: S.optional(UdpGroupSettings),
    CmafIngestGroupSettings: S.optional(CmafIngestGroupSettings),
    SrtGroupSettings: S.optional(SrtGroupSettings),
    MediaConnectRouterGroupSettings: S.optional(
      MediaConnectRouterGroupSettings,
    ),
  }).pipe(
    S.encodeKeys({
      ArchiveGroupSettings: "archiveGroupSettings",
      FrameCaptureGroupSettings: "frameCaptureGroupSettings",
      HlsGroupSettings: "hlsGroupSettings",
      MediaPackageGroupSettings: "mediaPackageGroupSettings",
      MsSmoothGroupSettings: "msSmoothGroupSettings",
      MultiplexGroupSettings: "multiplexGroupSettings",
      RtmpGroupSettings: "rtmpGroupSettings",
      UdpGroupSettings: "udpGroupSettings",
      CmafIngestGroupSettings: "cmafIngestGroupSettings",
      SrtGroupSettings: "srtGroupSettings",
      MediaConnectRouterGroupSettings: "mediaConnectRouterGroupSettings",
    }),
  ),
).annotate({
  identifier: "OutputGroupSettings",
}) as any as S.Schema<OutputGroupSettings>;
export type __stringMin1Max255 = string;
export type M2tsAbsentInputAudioBehavior =
  | "DROP"
  | "ENCODE_SILENCE"
  | (string & {});
export const M2tsAbsentInputAudioBehavior = /*@__PURE__*/ S.String;

export type M2tsArib = "DISABLED" | "ENABLED" | (string & {});
export const M2tsArib = /*@__PURE__*/ S.String;

export type M2tsAribCaptionsPidControl =
  | "AUTO"
  | "USE_CONFIGURED"
  | (string & {});
export const M2tsAribCaptionsPidControl = /*@__PURE__*/ S.String;

export type M2tsAudioBufferModel = "ATSC" | "DVB" | (string & {});
export const M2tsAudioBufferModel = /*@__PURE__*/ S.String;

export type M2tsAudioStreamType = "ATSC" | "DVB" | (string & {});
export const M2tsAudioStreamType = /*@__PURE__*/ S.String;

export type M2tsBufferModel = "MULTIPLEX" | "NONE" | (string & {});
export const M2tsBufferModel = /*@__PURE__*/ S.String;

export type M2tsCcDescriptor = "DISABLED" | "ENABLED" | (string & {});
export const M2tsCcDescriptor = /*@__PURE__*/ S.String;

export type __integerMin0Max65536 = number;
export type __stringMin1Max256 = string;
export type __integerMin25Max10000 = number;
export interface DvbNitSettings {
  NetworkId?: number;
  NetworkName?: string;
  RepInterval?: number;
}
export const DvbNitSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.optional(S.Number),
    NetworkName: S.optional(S.String),
    RepInterval: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      NetworkId: "networkId",
      NetworkName: "networkName",
      RepInterval: "repInterval",
    }),
  ),
).annotate({ identifier: "DvbNitSettings" }) as any as S.Schema<DvbNitSettings>;
export type DvbSdtOutputSdt =
  | "SDT_FOLLOW"
  | "SDT_FOLLOW_IF_PRESENT"
  | "SDT_MANUAL"
  | "SDT_NONE"
  | (string & {});
export const DvbSdtOutputSdt = /*@__PURE__*/ S.String;

export type __integerMin25Max2000 = number;
export interface DvbSdtSettings {
  OutputSdt?: DvbSdtOutputSdt;
  RepInterval?: number;
  ServiceName?: string;
  ServiceProviderName?: string;
}
export const DvbSdtSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputSdt: S.optional(DvbSdtOutputSdt),
    RepInterval: S.optional(S.Number),
    ServiceName: S.optional(S.String),
    ServiceProviderName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      OutputSdt: "outputSdt",
      RepInterval: "repInterval",
      ServiceName: "serviceName",
      ServiceProviderName: "serviceProviderName",
    }),
  ),
).annotate({ identifier: "DvbSdtSettings" }) as any as S.Schema<DvbSdtSettings>;
export type __integerMin1000Max30000 = number;
export interface DvbTdtSettings {
  RepInterval?: number;
}
export const DvbTdtSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RepInterval: S.optional(S.Number) }).pipe(
    S.encodeKeys({ RepInterval: "repInterval" }),
  ),
).annotate({ identifier: "DvbTdtSettings" }) as any as S.Schema<DvbTdtSettings>;
export type M2tsEbifControl = "NONE" | "PASSTHROUGH" | (string & {});
export const M2tsEbifControl = /*@__PURE__*/ S.String;

export type M2tsAudioInterval =
  | "VIDEO_AND_FIXED_INTERVALS"
  | "VIDEO_INTERVAL"
  | (string & {});
export const M2tsAudioInterval = /*@__PURE__*/ S.String;

export type M2tsEbpPlacement =
  | "VIDEO_AND_AUDIO_PIDS"
  | "VIDEO_PID"
  | (string & {});
export const M2tsEbpPlacement = /*@__PURE__*/ S.String;

export type M2tsEsRateInPes = "EXCLUDE" | "INCLUDE" | (string & {});
export const M2tsEsRateInPes = /*@__PURE__*/ S.String;

export type __doubleMin0 = number;
export type M2tsKlv = "NONE" | "PASSTHROUGH" | (string & {});
export const M2tsKlv = /*@__PURE__*/ S.String;

export type M2tsNielsenId3Behavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export const M2tsNielsenId3Behavior = /*@__PURE__*/ S.String;

export type __integerMin0Max1000 = number;
export type M2tsPcrControl =
  | "CONFIGURED_PCR_PERIOD"
  | "PCR_EVERY_PES_PACKET"
  | (string & {});
export const M2tsPcrControl = /*@__PURE__*/ S.String;

export type __integerMin0Max500 = number;
export type __integerMin0Max65535 = number;
export type M2tsRateMode = "CBR" | "VBR" | (string & {});
export const M2tsRateMode = /*@__PURE__*/ S.String;

export type M2tsScte35Control = "NONE" | "PASSTHROUGH" | (string & {});
export const M2tsScte35Control = /*@__PURE__*/ S.String;

export type M2tsSegmentationMarkers =
  | "EBP"
  | "EBP_LEGACY"
  | "NONE"
  | "PSI_SEGSTART"
  | "RAI_ADAPT"
  | "RAI_SEGSTART"
  | (string & {});
export const M2tsSegmentationMarkers = /*@__PURE__*/ S.String;

export type M2tsSegmentationStyle =
  | "MAINTAIN_CADENCE"
  | "RESET_CADENCE"
  | (string & {});
export const M2tsSegmentationStyle = /*@__PURE__*/ S.String;

export type __doubleMin1 = number;
export type M2tsTimedMetadataBehavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export const M2tsTimedMetadataBehavior = /*@__PURE__*/ S.String;

export type __doubleMin0Max5000 = number;
export interface M2tsSettings {
  AbsentInputAudioBehavior?: M2tsAbsentInputAudioBehavior;
  Arib?: M2tsArib;
  AribCaptionsPid?: string;
  AribCaptionsPidControl?: M2tsAribCaptionsPidControl;
  AudioBufferModel?: M2tsAudioBufferModel;
  AudioFramesPerPes?: number;
  AudioPids?: string;
  AudioStreamType?: M2tsAudioStreamType;
  Bitrate?: number;
  BufferModel?: M2tsBufferModel;
  CcDescriptor?: M2tsCcDescriptor;
  DvbNitSettings?: DvbNitSettings;
  DvbSdtSettings?: DvbSdtSettings;
  DvbSubPids?: string;
  DvbTdtSettings?: DvbTdtSettings;
  DvbTeletextPid?: string;
  Ebif?: M2tsEbifControl;
  EbpAudioInterval?: M2tsAudioInterval;
  EbpLookaheadMs?: number;
  EbpPlacement?: M2tsEbpPlacement;
  EcmPid?: string;
  EsRateInPes?: M2tsEsRateInPes;
  EtvPlatformPid?: string;
  EtvSignalPid?: string;
  FragmentTime?: number;
  Klv?: M2tsKlv;
  KlvDataPids?: string;
  NielsenId3Behavior?: M2tsNielsenId3Behavior;
  NullPacketBitrate?: number;
  PatInterval?: number;
  PcrControl?: M2tsPcrControl;
  PcrPeriod?: number;
  PcrPid?: string;
  PmtInterval?: number;
  PmtPid?: string;
  ProgramNum?: number;
  RateMode?: M2tsRateMode;
  Scte27Pids?: string;
  Scte35Control?: M2tsScte35Control;
  Scte35Pid?: string;
  SegmentationMarkers?: M2tsSegmentationMarkers;
  SegmentationStyle?: M2tsSegmentationStyle;
  SegmentationTime?: number;
  TimedMetadataBehavior?: M2tsTimedMetadataBehavior;
  TimedMetadataPid?: string;
  TransportStreamId?: number;
  VideoPid?: string;
  Scte35PrerollPullupMilliseconds?: number;
}
export const M2tsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AbsentInputAudioBehavior: S.optional(M2tsAbsentInputAudioBehavior),
    Arib: S.optional(M2tsArib),
    AribCaptionsPid: S.optional(S.String),
    AribCaptionsPidControl: S.optional(M2tsAribCaptionsPidControl),
    AudioBufferModel: S.optional(M2tsAudioBufferModel),
    AudioFramesPerPes: S.optional(S.Number),
    AudioPids: S.optional(S.String),
    AudioStreamType: S.optional(M2tsAudioStreamType),
    Bitrate: S.optional(S.Number),
    BufferModel: S.optional(M2tsBufferModel),
    CcDescriptor: S.optional(M2tsCcDescriptor),
    DvbNitSettings: S.optional(DvbNitSettings),
    DvbSdtSettings: S.optional(DvbSdtSettings),
    DvbSubPids: S.optional(S.String),
    DvbTdtSettings: S.optional(DvbTdtSettings),
    DvbTeletextPid: S.optional(S.String),
    Ebif: S.optional(M2tsEbifControl),
    EbpAudioInterval: S.optional(M2tsAudioInterval),
    EbpLookaheadMs: S.optional(S.Number),
    EbpPlacement: S.optional(M2tsEbpPlacement),
    EcmPid: S.optional(S.String),
    EsRateInPes: S.optional(M2tsEsRateInPes),
    EtvPlatformPid: S.optional(S.String),
    EtvSignalPid: S.optional(S.String),
    FragmentTime: S.optional(S.Number),
    Klv: S.optional(M2tsKlv),
    KlvDataPids: S.optional(S.String),
    NielsenId3Behavior: S.optional(M2tsNielsenId3Behavior),
    NullPacketBitrate: S.optional(S.Number),
    PatInterval: S.optional(S.Number),
    PcrControl: S.optional(M2tsPcrControl),
    PcrPeriod: S.optional(S.Number),
    PcrPid: S.optional(S.String),
    PmtInterval: S.optional(S.Number),
    PmtPid: S.optional(S.String),
    ProgramNum: S.optional(S.Number),
    RateMode: S.optional(M2tsRateMode),
    Scte27Pids: S.optional(S.String),
    Scte35Control: S.optional(M2tsScte35Control),
    Scte35Pid: S.optional(S.String),
    SegmentationMarkers: S.optional(M2tsSegmentationMarkers),
    SegmentationStyle: S.optional(M2tsSegmentationStyle),
    SegmentationTime: S.optional(S.Number),
    TimedMetadataBehavior: S.optional(M2tsTimedMetadataBehavior),
    TimedMetadataPid: S.optional(S.String),
    TransportStreamId: S.optional(S.Number),
    VideoPid: S.optional(S.String),
    Scte35PrerollPullupMilliseconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AbsentInputAudioBehavior: "absentInputAudioBehavior",
      Arib: "arib",
      AribCaptionsPid: "aribCaptionsPid",
      AribCaptionsPidControl: "aribCaptionsPidControl",
      AudioBufferModel: "audioBufferModel",
      AudioFramesPerPes: "audioFramesPerPes",
      AudioPids: "audioPids",
      AudioStreamType: "audioStreamType",
      Bitrate: "bitrate",
      BufferModel: "bufferModel",
      CcDescriptor: "ccDescriptor",
      DvbNitSettings: "dvbNitSettings",
      DvbSdtSettings: "dvbSdtSettings",
      DvbSubPids: "dvbSubPids",
      DvbTdtSettings: "dvbTdtSettings",
      DvbTeletextPid: "dvbTeletextPid",
      Ebif: "ebif",
      EbpAudioInterval: "ebpAudioInterval",
      EbpLookaheadMs: "ebpLookaheadMs",
      EbpPlacement: "ebpPlacement",
      EcmPid: "ecmPid",
      EsRateInPes: "esRateInPes",
      EtvPlatformPid: "etvPlatformPid",
      EtvSignalPid: "etvSignalPid",
      FragmentTime: "fragmentTime",
      Klv: "klv",
      KlvDataPids: "klvDataPids",
      NielsenId3Behavior: "nielsenId3Behavior",
      NullPacketBitrate: "nullPacketBitrate",
      PatInterval: "patInterval",
      PcrControl: "pcrControl",
      PcrPeriod: "pcrPeriod",
      PcrPid: "pcrPid",
      PmtInterval: "pmtInterval",
      PmtPid: "pmtPid",
      ProgramNum: "programNum",
      RateMode: "rateMode",
      Scte27Pids: "scte27Pids",
      Scte35Control: "scte35Control",
      Scte35Pid: "scte35Pid",
      SegmentationMarkers: "segmentationMarkers",
      SegmentationStyle: "segmentationStyle",
      SegmentationTime: "segmentationTime",
      TimedMetadataBehavior: "timedMetadataBehavior",
      TimedMetadataPid: "timedMetadataPid",
      TransportStreamId: "transportStreamId",
      VideoPid: "videoPid",
      Scte35PrerollPullupMilliseconds: "scte35PrerollPullupMilliseconds",
    }),
  ),
).annotate({ identifier: "M2tsSettings" }) as any as S.Schema<M2tsSettings>;
export interface RawSettings {}
export const RawSettings = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate(
  { identifier: "RawSettings" },
) as any as S.Schema<RawSettings>;
export interface ArchiveContainerSettings {
  M2tsSettings?: M2tsSettings;
  RawSettings?: RawSettings;
}
export const ArchiveContainerSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    M2tsSettings: S.optional(M2tsSettings),
    RawSettings: S.optional(RawSettings),
  }).pipe(
    S.encodeKeys({ M2tsSettings: "m2tsSettings", RawSettings: "rawSettings" }),
  ),
).annotate({
  identifier: "ArchiveContainerSettings",
}) as any as S.Schema<ArchiveContainerSettings>;
export interface ArchiveOutputSettings {
  ContainerSettings?: ArchiveContainerSettings;
  Extension?: string;
  NameModifier?: string;
}
export const ArchiveOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContainerSettings: S.optional(ArchiveContainerSettings),
    Extension: S.optional(S.String),
    NameModifier: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ContainerSettings: "containerSettings",
      Extension: "extension",
      NameModifier: "nameModifier",
    }),
  ),
).annotate({
  identifier: "ArchiveOutputSettings",
}) as any as S.Schema<ArchiveOutputSettings>;
export interface FrameCaptureOutputSettings {
  NameModifier?: string;
}
export const FrameCaptureOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NameModifier: S.optional(S.String) }).pipe(
    S.encodeKeys({ NameModifier: "nameModifier" }),
  ),
).annotate({
  identifier: "FrameCaptureOutputSettings",
}) as any as S.Schema<FrameCaptureOutputSettings>;
export type HlsH265PackagingType = "HEV1" | "HVC1" | (string & {});
export const HlsH265PackagingType = /*@__PURE__*/ S.String;

export type AudioOnlyHlsTrackType =
  | "ALTERNATE_AUDIO_AUTO_SELECT"
  | "ALTERNATE_AUDIO_AUTO_SELECT_DEFAULT"
  | "ALTERNATE_AUDIO_NOT_AUTO_SELECT"
  | "AUDIO_ONLY_VARIANT_STREAM"
  | (string & {});
export const AudioOnlyHlsTrackType = /*@__PURE__*/ S.String;

export type AudioOnlyHlsSegmentType = "AAC" | "FMP4" | (string & {});
export const AudioOnlyHlsSegmentType = /*@__PURE__*/ S.String;

export interface AudioOnlyHlsSettings {
  AudioGroupId?: string;
  AudioOnlyImage?: InputLocation;
  AudioTrackType?: AudioOnlyHlsTrackType;
  SegmentType?: AudioOnlyHlsSegmentType;
}
export const AudioOnlyHlsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioGroupId: S.optional(S.String),
    AudioOnlyImage: S.optional(InputLocation),
    AudioTrackType: S.optional(AudioOnlyHlsTrackType),
    SegmentType: S.optional(AudioOnlyHlsSegmentType),
  }).pipe(
    S.encodeKeys({
      AudioGroupId: "audioGroupId",
      AudioOnlyImage: "audioOnlyImage",
      AudioTrackType: "audioTrackType",
      SegmentType: "segmentType",
    }),
  ),
).annotate({
  identifier: "AudioOnlyHlsSettings",
}) as any as S.Schema<AudioOnlyHlsSettings>;
export type Fmp4NielsenId3Behavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export const Fmp4NielsenId3Behavior = /*@__PURE__*/ S.String;

export type Fmp4TimedMetadataBehavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export const Fmp4TimedMetadataBehavior = /*@__PURE__*/ S.String;

export interface Fmp4HlsSettings {
  AudioRenditionSets?: string;
  NielsenId3Behavior?: Fmp4NielsenId3Behavior;
  TimedMetadataBehavior?: Fmp4TimedMetadataBehavior;
}
export const Fmp4HlsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioRenditionSets: S.optional(S.String),
    NielsenId3Behavior: S.optional(Fmp4NielsenId3Behavior),
    TimedMetadataBehavior: S.optional(Fmp4TimedMetadataBehavior),
  }).pipe(
    S.encodeKeys({
      AudioRenditionSets: "audioRenditionSets",
      NielsenId3Behavior: "nielsenId3Behavior",
      TimedMetadataBehavior: "timedMetadataBehavior",
    }),
  ),
).annotate({
  identifier: "Fmp4HlsSettings",
}) as any as S.Schema<Fmp4HlsSettings>;
export interface FrameCaptureHlsSettings {}
export const FrameCaptureHlsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "FrameCaptureHlsSettings",
}) as any as S.Schema<FrameCaptureHlsSettings>;
export type M3u8NielsenId3Behavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export const M3u8NielsenId3Behavior = /*@__PURE__*/ S.String;

export type M3u8PcrControl =
  | "CONFIGURED_PCR_PERIOD"
  | "PCR_EVERY_PES_PACKET"
  | (string & {});
export const M3u8PcrControl = /*@__PURE__*/ S.String;

export type M3u8Scte35Behavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export const M3u8Scte35Behavior = /*@__PURE__*/ S.String;

export type M3u8TimedMetadataBehavior =
  | "NO_PASSTHROUGH"
  | "PASSTHROUGH"
  | (string & {});
export const M3u8TimedMetadataBehavior = /*@__PURE__*/ S.String;

export type M3u8KlvBehavior = "NO_PASSTHROUGH" | "PASSTHROUGH" | (string & {});
export const M3u8KlvBehavior = /*@__PURE__*/ S.String;

export interface M3u8Settings {
  AudioFramesPerPes?: number;
  AudioPids?: string;
  EcmPid?: string;
  NielsenId3Behavior?: M3u8NielsenId3Behavior;
  PatInterval?: number;
  PcrControl?: M3u8PcrControl;
  PcrPeriod?: number;
  PcrPid?: string;
  PmtInterval?: number;
  PmtPid?: string;
  ProgramNum?: number;
  Scte35Behavior?: M3u8Scte35Behavior;
  Scte35Pid?: string;
  TimedMetadataBehavior?: M3u8TimedMetadataBehavior;
  TimedMetadataPid?: string;
  TransportStreamId?: number;
  VideoPid?: string;
  KlvBehavior?: M3u8KlvBehavior;
  KlvDataPids?: string;
}
export const M3u8Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioFramesPerPes: S.optional(S.Number),
    AudioPids: S.optional(S.String),
    EcmPid: S.optional(S.String),
    NielsenId3Behavior: S.optional(M3u8NielsenId3Behavior),
    PatInterval: S.optional(S.Number),
    PcrControl: S.optional(M3u8PcrControl),
    PcrPeriod: S.optional(S.Number),
    PcrPid: S.optional(S.String),
    PmtInterval: S.optional(S.Number),
    PmtPid: S.optional(S.String),
    ProgramNum: S.optional(S.Number),
    Scte35Behavior: S.optional(M3u8Scte35Behavior),
    Scte35Pid: S.optional(S.String),
    TimedMetadataBehavior: S.optional(M3u8TimedMetadataBehavior),
    TimedMetadataPid: S.optional(S.String),
    TransportStreamId: S.optional(S.Number),
    VideoPid: S.optional(S.String),
    KlvBehavior: S.optional(M3u8KlvBehavior),
    KlvDataPids: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AudioFramesPerPes: "audioFramesPerPes",
      AudioPids: "audioPids",
      EcmPid: "ecmPid",
      NielsenId3Behavior: "nielsenId3Behavior",
      PatInterval: "patInterval",
      PcrControl: "pcrControl",
      PcrPeriod: "pcrPeriod",
      PcrPid: "pcrPid",
      PmtInterval: "pmtInterval",
      PmtPid: "pmtPid",
      ProgramNum: "programNum",
      Scte35Behavior: "scte35Behavior",
      Scte35Pid: "scte35Pid",
      TimedMetadataBehavior: "timedMetadataBehavior",
      TimedMetadataPid: "timedMetadataPid",
      TransportStreamId: "transportStreamId",
      VideoPid: "videoPid",
      KlvBehavior: "klvBehavior",
      KlvDataPids: "klvDataPids",
    }),
  ),
).annotate({ identifier: "M3u8Settings" }) as any as S.Schema<M3u8Settings>;
export interface StandardHlsSettings {
  AudioRenditionSets?: string;
  M3u8Settings?: M3u8Settings;
}
export const StandardHlsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioRenditionSets: S.optional(S.String),
    M3u8Settings: S.optional(M3u8Settings),
  }).pipe(
    S.encodeKeys({
      AudioRenditionSets: "audioRenditionSets",
      M3u8Settings: "m3u8Settings",
    }),
  ),
).annotate({
  identifier: "StandardHlsSettings",
}) as any as S.Schema<StandardHlsSettings>;
export interface HlsSettings {
  AudioOnlyHlsSettings?: AudioOnlyHlsSettings;
  Fmp4HlsSettings?: Fmp4HlsSettings;
  FrameCaptureHlsSettings?: FrameCaptureHlsSettings;
  StandardHlsSettings?: StandardHlsSettings;
}
export const HlsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioOnlyHlsSettings: S.optional(AudioOnlyHlsSettings),
    Fmp4HlsSettings: S.optional(Fmp4HlsSettings),
    FrameCaptureHlsSettings: S.optional(FrameCaptureHlsSettings),
    StandardHlsSettings: S.optional(StandardHlsSettings),
  }).pipe(
    S.encodeKeys({
      AudioOnlyHlsSettings: "audioOnlyHlsSettings",
      Fmp4HlsSettings: "fmp4HlsSettings",
      FrameCaptureHlsSettings: "frameCaptureHlsSettings",
      StandardHlsSettings: "standardHlsSettings",
    }),
  ),
).annotate({ identifier: "HlsSettings" }) as any as S.Schema<HlsSettings>;
export interface HlsOutputSettings {
  H265PackagingType?: HlsH265PackagingType;
  HlsSettings?: HlsSettings;
  NameModifier?: string;
  SegmentModifier?: string;
}
export const HlsOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    H265PackagingType: S.optional(HlsH265PackagingType),
    HlsSettings: S.optional(HlsSettings),
    NameModifier: S.optional(S.String),
    SegmentModifier: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      H265PackagingType: "h265PackagingType",
      HlsSettings: "hlsSettings",
      NameModifier: "nameModifier",
      SegmentModifier: "segmentModifier",
    }),
  ),
).annotate({
  identifier: "HlsOutputSettings",
}) as any as S.Schema<HlsOutputSettings>;
export type HlsAutoSelect = "NO" | "OMIT" | "YES" | (string & {});
export const HlsAutoSelect = /*@__PURE__*/ S.String;

export type HlsDefault = "NO" | "OMIT" | "YES" | (string & {});
export const HlsDefault = /*@__PURE__*/ S.String;

export interface MediaPackageV2DestinationSettings {
  AudioGroupId?: string;
  AudioRenditionSets?: string;
  HlsAutoSelect?: HlsAutoSelect;
  HlsDefault?: HlsDefault;
}
export const MediaPackageV2DestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioGroupId: S.optional(S.String),
    AudioRenditionSets: S.optional(S.String),
    HlsAutoSelect: S.optional(HlsAutoSelect),
    HlsDefault: S.optional(HlsDefault),
  }).pipe(
    S.encodeKeys({
      AudioGroupId: "audioGroupId",
      AudioRenditionSets: "audioRenditionSets",
      HlsAutoSelect: "hlsAutoSelect",
      HlsDefault: "hlsDefault",
    }),
  ),
).annotate({
  identifier: "MediaPackageV2DestinationSettings",
}) as any as S.Schema<MediaPackageV2DestinationSettings>;
export interface MediaPackageOutputSettings {
  MediaPackageV2DestinationSettings?: MediaPackageV2DestinationSettings;
}
export const MediaPackageOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaPackageV2DestinationSettings: S.optional(
      MediaPackageV2DestinationSettings,
    ),
  }).pipe(
    S.encodeKeys({
      MediaPackageV2DestinationSettings: "mediaPackageV2DestinationSettings",
    }),
  ),
).annotate({
  identifier: "MediaPackageOutputSettings",
}) as any as S.Schema<MediaPackageOutputSettings>;
export type MsSmoothH265PackagingType = "HEV1" | "HVC1" | (string & {});
export const MsSmoothH265PackagingType = /*@__PURE__*/ S.String;

export interface MsSmoothOutputSettings {
  H265PackagingType?: MsSmoothH265PackagingType;
  NameModifier?: string;
}
export const MsSmoothOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    H265PackagingType: S.optional(MsSmoothH265PackagingType),
    NameModifier: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      H265PackagingType: "h265PackagingType",
      NameModifier: "nameModifier",
    }),
  ),
).annotate({
  identifier: "MsSmoothOutputSettings",
}) as any as S.Schema<MsSmoothOutputSettings>;
export interface MultiplexM2tsSettings {
  AbsentInputAudioBehavior?: M2tsAbsentInputAudioBehavior;
  Arib?: M2tsArib;
  AudioBufferModel?: M2tsAudioBufferModel;
  AudioFramesPerPes?: number;
  AudioStreamType?: M2tsAudioStreamType;
  CcDescriptor?: M2tsCcDescriptor;
  Ebif?: M2tsEbifControl;
  EsRateInPes?: M2tsEsRateInPes;
  Klv?: M2tsKlv;
  NielsenId3Behavior?: M2tsNielsenId3Behavior;
  PcrControl?: M2tsPcrControl;
  PcrPeriod?: number;
  Scte35Control?: M2tsScte35Control;
  Scte35PrerollPullupMilliseconds?: number;
}
export const MultiplexM2tsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AbsentInputAudioBehavior: S.optional(M2tsAbsentInputAudioBehavior),
    Arib: S.optional(M2tsArib),
    AudioBufferModel: S.optional(M2tsAudioBufferModel),
    AudioFramesPerPes: S.optional(S.Number),
    AudioStreamType: S.optional(M2tsAudioStreamType),
    CcDescriptor: S.optional(M2tsCcDescriptor),
    Ebif: S.optional(M2tsEbifControl),
    EsRateInPes: S.optional(M2tsEsRateInPes),
    Klv: S.optional(M2tsKlv),
    NielsenId3Behavior: S.optional(M2tsNielsenId3Behavior),
    PcrControl: S.optional(M2tsPcrControl),
    PcrPeriod: S.optional(S.Number),
    Scte35Control: S.optional(M2tsScte35Control),
    Scte35PrerollPullupMilliseconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AbsentInputAudioBehavior: "absentInputAudioBehavior",
      Arib: "arib",
      AudioBufferModel: "audioBufferModel",
      AudioFramesPerPes: "audioFramesPerPes",
      AudioStreamType: "audioStreamType",
      CcDescriptor: "ccDescriptor",
      Ebif: "ebif",
      EsRateInPes: "esRateInPes",
      Klv: "klv",
      NielsenId3Behavior: "nielsenId3Behavior",
      PcrControl: "pcrControl",
      PcrPeriod: "pcrPeriod",
      Scte35Control: "scte35Control",
      Scte35PrerollPullupMilliseconds: "scte35PrerollPullupMilliseconds",
    }),
  ),
).annotate({
  identifier: "MultiplexM2tsSettings",
}) as any as S.Schema<MultiplexM2tsSettings>;
export interface MultiplexContainerSettings {
  MultiplexM2tsSettings?: MultiplexM2tsSettings;
}
export const MultiplexContainerSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MultiplexM2tsSettings: S.optional(MultiplexM2tsSettings) }).pipe(
    S.encodeKeys({ MultiplexM2tsSettings: "multiplexM2tsSettings" }),
  ),
).annotate({
  identifier: "MultiplexContainerSettings",
}) as any as S.Schema<MultiplexContainerSettings>;
export interface MultiplexOutputSettings {
  Destination?: OutputLocationRef;
  ContainerSettings?: MultiplexContainerSettings;
}
export const MultiplexOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: S.optional(OutputLocationRef),
    ContainerSettings: S.optional(MultiplexContainerSettings),
  }).pipe(
    S.encodeKeys({
      Destination: "destination",
      ContainerSettings: "containerSettings",
    }),
  ),
).annotate({
  identifier: "MultiplexOutputSettings",
}) as any as S.Schema<MultiplexOutputSettings>;
export type RtmpOutputCertificateMode =
  | "SELF_SIGNED"
  | "VERIFY_AUTHENTICITY"
  | (string & {});
export const RtmpOutputCertificateMode = /*@__PURE__*/ S.String;

export interface RtmpOutputSettings {
  CertificateMode?: RtmpOutputCertificateMode;
  ConnectionRetryInterval?: number;
  Destination?: OutputLocationRef;
  NumRetries?: number;
}
export const RtmpOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateMode: S.optional(RtmpOutputCertificateMode),
    ConnectionRetryInterval: S.optional(S.Number),
    Destination: S.optional(OutputLocationRef),
    NumRetries: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      CertificateMode: "certificateMode",
      ConnectionRetryInterval: "connectionRetryInterval",
      Destination: "destination",
      NumRetries: "numRetries",
    }),
  ),
).annotate({
  identifier: "RtmpOutputSettings",
}) as any as S.Schema<RtmpOutputSettings>;
export interface UdpContainerSettings {
  M2tsSettings?: M2tsSettings;
}
export const UdpContainerSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ M2tsSettings: S.optional(M2tsSettings) }).pipe(
    S.encodeKeys({ M2tsSettings: "m2tsSettings" }),
  ),
).annotate({
  identifier: "UdpContainerSettings",
}) as any as S.Schema<UdpContainerSettings>;
export type __integerMin4Max20 = number;
export type FecOutputIncludeFec = "COLUMN" | "COLUMN_AND_ROW" | (string & {});
export const FecOutputIncludeFec = /*@__PURE__*/ S.String;

export type __integerMin1Max20 = number;
export interface FecOutputSettings {
  ColumnDepth?: number;
  IncludeFec?: FecOutputIncludeFec;
  RowLength?: number;
}
export const FecOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColumnDepth: S.optional(S.Number),
    IncludeFec: S.optional(FecOutputIncludeFec),
    RowLength: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      ColumnDepth: "columnDepth",
      IncludeFec: "includeFec",
      RowLength: "rowLength",
    }),
  ),
).annotate({
  identifier: "FecOutputSettings",
}) as any as S.Schema<FecOutputSettings>;
export interface UdpOutputSettings {
  BufferMsec?: number;
  ContainerSettings?: UdpContainerSettings;
  Destination?: OutputLocationRef;
  FecOutputSettings?: FecOutputSettings;
}
export const UdpOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BufferMsec: S.optional(S.Number),
    ContainerSettings: S.optional(UdpContainerSettings),
    Destination: S.optional(OutputLocationRef),
    FecOutputSettings: S.optional(FecOutputSettings),
  }).pipe(
    S.encodeKeys({
      BufferMsec: "bufferMsec",
      ContainerSettings: "containerSettings",
      Destination: "destination",
      FecOutputSettings: "fecOutputSettings",
    }),
  ),
).annotate({
  identifier: "UdpOutputSettings",
}) as any as S.Schema<UdpOutputSettings>;
export interface CmafIngestOutputSettings {
  NameModifier?: string;
}
export const CmafIngestOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NameModifier: S.optional(S.String) }).pipe(
    S.encodeKeys({ NameModifier: "nameModifier" }),
  ),
).annotate({
  identifier: "CmafIngestOutputSettings",
}) as any as S.Schema<CmafIngestOutputSettings>;
export type SrtEncryptionType = "AES128" | "AES192" | "AES256" | (string & {});
export const SrtEncryptionType = /*@__PURE__*/ S.String;

export type __integerMin40Max16000 = number;
export interface SrtOutputSettings {
  BufferMsec?: number;
  ContainerSettings?: UdpContainerSettings;
  Destination?: OutputLocationRef;
  EncryptionType?: SrtEncryptionType;
  Latency?: number;
}
export const SrtOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BufferMsec: S.optional(S.Number),
    ContainerSettings: S.optional(UdpContainerSettings),
    Destination: S.optional(OutputLocationRef),
    EncryptionType: S.optional(SrtEncryptionType),
    Latency: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BufferMsec: "bufferMsec",
      ContainerSettings: "containerSettings",
      Destination: "destination",
      EncryptionType: "encryptionType",
      Latency: "latency",
    }),
  ),
).annotate({
  identifier: "SrtOutputSettings",
}) as any as S.Schema<SrtOutputSettings>;
export interface MediaConnectRouterOutputConnectionMap {
  Pipeline0?: string;
  Pipeline1?: string;
}
export const MediaConnectRouterOutputConnectionMap = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Pipeline0: S.optional(S.String),
      Pipeline1: S.optional(S.String),
    }).pipe(S.encodeKeys({ Pipeline0: "pipeline0", Pipeline1: "pipeline1" })),
).annotate({
  identifier: "MediaConnectRouterOutputConnectionMap",
}) as any as S.Schema<MediaConnectRouterOutputConnectionMap>;
export interface MediaConnectRouterContainerSettings {
  M2tsSettings?: M2tsSettings;
}
export const MediaConnectRouterContainerSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ M2tsSettings: S.optional(M2tsSettings) }).pipe(
    S.encodeKeys({ M2tsSettings: "m2tsSettings" }),
  ),
).annotate({
  identifier: "MediaConnectRouterContainerSettings",
}) as any as S.Schema<MediaConnectRouterContainerSettings>;
export interface MediaConnectRouterOutputSettings {
  ConnectedRouterInputs?: MediaConnectRouterOutputConnectionMap;
  ContainerSettings?: MediaConnectRouterContainerSettings;
  Destination?: OutputLocationRef;
}
export const MediaConnectRouterOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConnectedRouterInputs: S.optional(MediaConnectRouterOutputConnectionMap),
    ContainerSettings: S.optional(MediaConnectRouterContainerSettings),
    Destination: S.optional(OutputLocationRef),
  }).pipe(
    S.encodeKeys({
      ConnectedRouterInputs: "connectedRouterInputs",
      ContainerSettings: "containerSettings",
      Destination: "destination",
    }),
  ),
).annotate({
  identifier: "MediaConnectRouterOutputSettings",
}) as any as S.Schema<MediaConnectRouterOutputSettings>;
export interface OutputSettings {
  ArchiveOutputSettings?: ArchiveOutputSettings;
  FrameCaptureOutputSettings?: FrameCaptureOutputSettings;
  HlsOutputSettings?: HlsOutputSettings;
  MediaPackageOutputSettings?: MediaPackageOutputSettings;
  MsSmoothOutputSettings?: MsSmoothOutputSettings;
  MultiplexOutputSettings?: MultiplexOutputSettings;
  RtmpOutputSettings?: RtmpOutputSettings;
  UdpOutputSettings?: UdpOutputSettings;
  CmafIngestOutputSettings?: CmafIngestOutputSettings;
  SrtOutputSettings?: SrtOutputSettings;
  MediaConnectRouterOutputSettings?: MediaConnectRouterOutputSettings;
}
export const OutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ArchiveOutputSettings: S.optional(ArchiveOutputSettings),
    FrameCaptureOutputSettings: S.optional(FrameCaptureOutputSettings),
    HlsOutputSettings: S.optional(HlsOutputSettings),
    MediaPackageOutputSettings: S.optional(MediaPackageOutputSettings),
    MsSmoothOutputSettings: S.optional(MsSmoothOutputSettings),
    MultiplexOutputSettings: S.optional(MultiplexOutputSettings),
    RtmpOutputSettings: S.optional(RtmpOutputSettings),
    UdpOutputSettings: S.optional(UdpOutputSettings),
    CmafIngestOutputSettings: S.optional(CmafIngestOutputSettings),
    SrtOutputSettings: S.optional(SrtOutputSettings),
    MediaConnectRouterOutputSettings: S.optional(
      MediaConnectRouterOutputSettings,
    ),
  }).pipe(
    S.encodeKeys({
      ArchiveOutputSettings: "archiveOutputSettings",
      FrameCaptureOutputSettings: "frameCaptureOutputSettings",
      HlsOutputSettings: "hlsOutputSettings",
      MediaPackageOutputSettings: "mediaPackageOutputSettings",
      MsSmoothOutputSettings: "msSmoothOutputSettings",
      MultiplexOutputSettings: "multiplexOutputSettings",
      RtmpOutputSettings: "rtmpOutputSettings",
      UdpOutputSettings: "udpOutputSettings",
      CmafIngestOutputSettings: "cmafIngestOutputSettings",
      SrtOutputSettings: "srtOutputSettings",
      MediaConnectRouterOutputSettings: "mediaConnectRouterOutputSettings",
    }),
  ),
).annotate({ identifier: "OutputSettings" }) as any as S.Schema<OutputSettings>;
export interface Output {
  AudioDescriptionNames?: string[];
  CaptionDescriptionNames?: string[];
  OutputName?: string;
  OutputSettings?: OutputSettings;
  VideoDescriptionName?: string;
}
export const Output = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDescriptionNames: S.optional(__listOf__string),
    CaptionDescriptionNames: S.optional(__listOf__string),
    OutputName: S.optional(S.String),
    OutputSettings: S.optional(OutputSettings),
    VideoDescriptionName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AudioDescriptionNames: "audioDescriptionNames",
      CaptionDescriptionNames: "captionDescriptionNames",
      OutputName: "outputName",
      OutputSettings: "outputSettings",
      VideoDescriptionName: "videoDescriptionName",
    }),
  ),
).annotate({ identifier: "Output" }) as any as S.Schema<Output>;
export type __listOfOutput = Output[];
export const __listOfOutput = /*@__PURE__*/ S.Array(Output);
export interface OutputGroup {
  Name?: string;
  OutputGroupSettings?: OutputGroupSettings;
  Outputs?: Output[];
}
export const OutputGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    OutputGroupSettings: S.optional(OutputGroupSettings),
    Outputs: S.optional(__listOfOutput),
  }).pipe(
    S.encodeKeys({
      Name: "name",
      OutputGroupSettings: "outputGroupSettings",
      Outputs: "outputs",
    }),
  ),
).annotate({ identifier: "OutputGroup" }) as any as S.Schema<OutputGroup>;
export type __listOfOutputGroup = OutputGroup[];
export const __listOfOutputGroup = /*@__PURE__*/ S.Array(OutputGroup);
export type TimecodeConfigSource =
  | "EMBEDDED"
  | "SYSTEMCLOCK"
  | "ZEROBASED"
  | (string & {});
export const TimecodeConfigSource = /*@__PURE__*/ S.String;

export type __integerMin1Max1000000 = number;
export interface TimecodeConfig {
  Source?: TimecodeConfigSource;
  SyncThreshold?: number;
}
export const TimecodeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Source: S.optional(TimecodeConfigSource),
    SyncThreshold: S.optional(S.Number),
  }).pipe(S.encodeKeys({ Source: "source", SyncThreshold: "syncThreshold" })),
).annotate({ identifier: "TimecodeConfig" }) as any as S.Schema<TimecodeConfig>;
export type __integerMin1Max3600000 = number;
export type FrameCaptureIntervalUnit =
  | "MILLISECONDS"
  | "SECONDS"
  | (string & {});
export const FrameCaptureIntervalUnit = /*@__PURE__*/ S.String;

export type TimecodeBurninFontSize =
  | "EXTRA_SMALL_10"
  | "LARGE_48"
  | "MEDIUM_32"
  | "SMALL_16"
  | (string & {});
export const TimecodeBurninFontSize = /*@__PURE__*/ S.String;

export type TimecodeBurninPosition =
  | "BOTTOM_CENTER"
  | "BOTTOM_LEFT"
  | "BOTTOM_RIGHT"
  | "MIDDLE_CENTER"
  | "MIDDLE_LEFT"
  | "MIDDLE_RIGHT"
  | "TOP_CENTER"
  | "TOP_LEFT"
  | "TOP_RIGHT"
  | (string & {});
export const TimecodeBurninPosition = /*@__PURE__*/ S.String;

export interface TimecodeBurninSettings {
  FontSize?: TimecodeBurninFontSize;
  Position?: TimecodeBurninPosition;
  Prefix?: string;
}
export const TimecodeBurninSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FontSize: S.optional(TimecodeBurninFontSize),
    Position: S.optional(TimecodeBurninPosition),
    Prefix: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      FontSize: "fontSize",
      Position: "position",
      Prefix: "prefix",
    }),
  ),
).annotate({
  identifier: "TimecodeBurninSettings",
}) as any as S.Schema<TimecodeBurninSettings>;
export interface FrameCaptureSettings {
  CaptureInterval?: number;
  CaptureIntervalUnits?: FrameCaptureIntervalUnit;
  TimecodeBurninSettings?: TimecodeBurninSettings;
}
export const FrameCaptureSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CaptureInterval: S.optional(S.Number),
    CaptureIntervalUnits: S.optional(FrameCaptureIntervalUnit),
    TimecodeBurninSettings: S.optional(TimecodeBurninSettings),
  }).pipe(
    S.encodeKeys({
      CaptureInterval: "captureInterval",
      CaptureIntervalUnits: "captureIntervalUnits",
      TimecodeBurninSettings: "timecodeBurninSettings",
    }),
  ),
).annotate({
  identifier: "FrameCaptureSettings",
}) as any as S.Schema<FrameCaptureSettings>;
export type H264AdaptiveQuantization =
  | "AUTO"
  | "HIGH"
  | "HIGHER"
  | "LOW"
  | "MAX"
  | "MEDIUM"
  | "OFF"
  | (string & {});
export const H264AdaptiveQuantization = /*@__PURE__*/ S.String;

export type AfdSignaling = "AUTO" | "FIXED" | "NONE" | (string & {});
export const AfdSignaling = /*@__PURE__*/ S.String;

export type __integerMin1000 = number;
export type H264ColorMetadata = "IGNORE" | "INSERT" | (string & {});
export const H264ColorMetadata = /*@__PURE__*/ S.String;

export interface ColorSpacePassthroughSettings {}
export const ColorSpacePassthroughSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "ColorSpacePassthroughSettings",
}) as any as S.Schema<ColorSpacePassthroughSettings>;
export interface Rec601Settings {}
export const Rec601Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({ identifier: "Rec601Settings" }) as any as S.Schema<Rec601Settings>;
export interface Rec709Settings {}
export const Rec709Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({ identifier: "Rec709Settings" }) as any as S.Schema<Rec709Settings>;
export interface H264ColorSpaceSettings {
  ColorSpacePassthroughSettings?: ColorSpacePassthroughSettings;
  Rec601Settings?: Rec601Settings;
  Rec709Settings?: Rec709Settings;
}
export const H264ColorSpaceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColorSpacePassthroughSettings: S.optional(ColorSpacePassthroughSettings),
    Rec601Settings: S.optional(Rec601Settings),
    Rec709Settings: S.optional(Rec709Settings),
  }).pipe(
    S.encodeKeys({
      ColorSpacePassthroughSettings: "colorSpacePassthroughSettings",
      Rec601Settings: "rec601Settings",
      Rec709Settings: "rec709Settings",
    }),
  ),
).annotate({
  identifier: "H264ColorSpaceSettings",
}) as any as S.Schema<H264ColorSpaceSettings>;
export type H264EntropyEncoding = "CABAC" | "CAVLC" | (string & {});
export const H264EntropyEncoding = /*@__PURE__*/ S.String;

export type TemporalFilterPostFilterSharpening =
  | "AUTO"
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const TemporalFilterPostFilterSharpening = /*@__PURE__*/ S.String;

export type TemporalFilterStrength =
  | "AUTO"
  | "STRENGTH_1"
  | "STRENGTH_2"
  | "STRENGTH_3"
  | "STRENGTH_4"
  | "STRENGTH_5"
  | "STRENGTH_6"
  | "STRENGTH_7"
  | "STRENGTH_8"
  | "STRENGTH_9"
  | "STRENGTH_10"
  | "STRENGTH_11"
  | "STRENGTH_12"
  | "STRENGTH_13"
  | "STRENGTH_14"
  | "STRENGTH_15"
  | "STRENGTH_16"
  | (string & {});
export const TemporalFilterStrength = /*@__PURE__*/ S.String;

export interface TemporalFilterSettings {
  PostFilterSharpening?: TemporalFilterPostFilterSharpening;
  Strength?: TemporalFilterStrength;
}
export const TemporalFilterSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PostFilterSharpening: S.optional(TemporalFilterPostFilterSharpening),
    Strength: S.optional(TemporalFilterStrength),
  }).pipe(
    S.encodeKeys({
      PostFilterSharpening: "postFilterSharpening",
      Strength: "strength",
    }),
  ),
).annotate({
  identifier: "TemporalFilterSettings",
}) as any as S.Schema<TemporalFilterSettings>;
export type BandwidthReductionPostFilterSharpening =
  | "DISABLED"
  | "SHARPENING_1"
  | "SHARPENING_2"
  | "SHARPENING_3"
  | (string & {});
export const BandwidthReductionPostFilterSharpening = /*@__PURE__*/ S.String;

export type BandwidthReductionFilterStrength =
  | "AUTO"
  | "STRENGTH_1"
  | "STRENGTH_2"
  | "STRENGTH_3"
  | "STRENGTH_4"
  | (string & {});
export const BandwidthReductionFilterStrength = /*@__PURE__*/ S.String;

export interface BandwidthReductionFilterSettings {
  PostFilterSharpening?: BandwidthReductionPostFilterSharpening;
  Strength?: BandwidthReductionFilterStrength;
}
export const BandwidthReductionFilterSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PostFilterSharpening: S.optional(BandwidthReductionPostFilterSharpening),
    Strength: S.optional(BandwidthReductionFilterStrength),
  }).pipe(
    S.encodeKeys({
      PostFilterSharpening: "postFilterSharpening",
      Strength: "strength",
    }),
  ),
).annotate({
  identifier: "BandwidthReductionFilterSettings",
}) as any as S.Schema<BandwidthReductionFilterSettings>;
export interface H264FilterSettings {
  TemporalFilterSettings?: TemporalFilterSettings;
  BandwidthReductionFilterSettings?: BandwidthReductionFilterSettings;
}
export const H264FilterSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemporalFilterSettings: S.optional(TemporalFilterSettings),
    BandwidthReductionFilterSettings: S.optional(
      BandwidthReductionFilterSettings,
    ),
  }).pipe(
    S.encodeKeys({
      TemporalFilterSettings: "temporalFilterSettings",
      BandwidthReductionFilterSettings: "bandwidthReductionFilterSettings",
    }),
  ),
).annotate({
  identifier: "H264FilterSettings",
}) as any as S.Schema<H264FilterSettings>;
export type FixedAfd =
  | "AFD_0000"
  | "AFD_0010"
  | "AFD_0011"
  | "AFD_0100"
  | "AFD_1000"
  | "AFD_1001"
  | "AFD_1010"
  | "AFD_1011"
  | "AFD_1101"
  | "AFD_1110"
  | "AFD_1111"
  | (string & {});
export const FixedAfd = /*@__PURE__*/ S.String;

export type H264FlickerAq = "DISABLED" | "ENABLED" | (string & {});
export const H264FlickerAq = /*@__PURE__*/ S.String;

export type H264ForceFieldPictures = "DISABLED" | "ENABLED" | (string & {});
export const H264ForceFieldPictures = /*@__PURE__*/ S.String;

export type H264FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const H264FramerateControl = /*@__PURE__*/ S.String;

export type H264GopBReference = "DISABLED" | "ENABLED" | (string & {});
export const H264GopBReference = /*@__PURE__*/ S.String;

export type H264GopSizeUnits = "FRAMES" | "SECONDS" | (string & {});
export const H264GopSizeUnits = /*@__PURE__*/ S.String;

export type H264Level =
  | "H264_LEVEL_1"
  | "H264_LEVEL_1_1"
  | "H264_LEVEL_1_2"
  | "H264_LEVEL_1_3"
  | "H264_LEVEL_2"
  | "H264_LEVEL_2_1"
  | "H264_LEVEL_2_2"
  | "H264_LEVEL_3"
  | "H264_LEVEL_3_1"
  | "H264_LEVEL_3_2"
  | "H264_LEVEL_4"
  | "H264_LEVEL_4_1"
  | "H264_LEVEL_4_2"
  | "H264_LEVEL_5"
  | "H264_LEVEL_5_1"
  | "H264_LEVEL_5_2"
  | "H264_LEVEL_AUTO"
  | (string & {});
export const H264Level = /*@__PURE__*/ S.String;

export type H264LookAheadRateControl =
  | "HIGH"
  | "LOW"
  | "MEDIUM"
  | (string & {});
export const H264LookAheadRateControl = /*@__PURE__*/ S.String;

export type __integerMin0Max30 = number;
export type __integerMin1Max6 = number;
export type H264ParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const H264ParControl = /*@__PURE__*/ S.String;

export type H264Profile =
  | "BASELINE"
  | "HIGH"
  | "HIGH_10BIT"
  | "HIGH_422"
  | "HIGH_422_10BIT"
  | "MAIN"
  | (string & {});
export const H264Profile = /*@__PURE__*/ S.String;

export type H264QualityLevel =
  | "ENHANCED_QUALITY"
  | "STANDARD_QUALITY"
  | (string & {});
export const H264QualityLevel = /*@__PURE__*/ S.String;

export type __integerMin1Max10 = number;
export type H264RateControlMode =
  | "CBR"
  | "MULTIPLEX"
  | "QVBR"
  | "VBR"
  | (string & {});
export const H264RateControlMode = /*@__PURE__*/ S.String;

export type H264ScanType = "INTERLACED" | "PROGRESSIVE" | (string & {});
export const H264ScanType = /*@__PURE__*/ S.String;

export type H264SceneChangeDetect = "DISABLED" | "ENABLED" | (string & {});
export const H264SceneChangeDetect = /*@__PURE__*/ S.String;

export type __integerMin1Max32 = number;
export type __integerMin0Max128 = number;
export type H264SpatialAq = "DISABLED" | "ENABLED" | (string & {});
export const H264SpatialAq = /*@__PURE__*/ S.String;

export type H264SubGopLength = "DYNAMIC" | "FIXED" | (string & {});
export const H264SubGopLength = /*@__PURE__*/ S.String;

export type H264Syntax = "DEFAULT" | "RP2027" | (string & {});
export const H264Syntax = /*@__PURE__*/ S.String;

export type H264TemporalAq = "DISABLED" | "ENABLED" | (string & {});
export const H264TemporalAq = /*@__PURE__*/ S.String;

export type H264TimecodeInsertionBehavior =
  | "DISABLED"
  | "PIC_TIMING_SEI"
  | (string & {});
export const H264TimecodeInsertionBehavior = /*@__PURE__*/ S.String;

export type __integerMin1Max51 = number;
export interface H264Settings {
  AdaptiveQuantization?: H264AdaptiveQuantization;
  AfdSignaling?: AfdSignaling;
  Bitrate?: number;
  BufFillPct?: number;
  BufSize?: number;
  ColorMetadata?: H264ColorMetadata;
  ColorSpaceSettings?: H264ColorSpaceSettings;
  EntropyEncoding?: H264EntropyEncoding;
  FilterSettings?: H264FilterSettings;
  FixedAfd?: FixedAfd;
  FlickerAq?: H264FlickerAq;
  ForceFieldPictures?: H264ForceFieldPictures;
  FramerateControl?: H264FramerateControl;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopBReference?: H264GopBReference;
  GopClosedCadence?: number;
  GopNumBFrames?: number;
  GopSize?: number;
  GopSizeUnits?: H264GopSizeUnits;
  Level?: H264Level;
  LookAheadRateControl?: H264LookAheadRateControl;
  MaxBitrate?: number;
  MinIInterval?: number;
  NumRefFrames?: number;
  ParControl?: H264ParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  Profile?: H264Profile;
  QualityLevel?: H264QualityLevel;
  QvbrQualityLevel?: number;
  RateControlMode?: H264RateControlMode;
  ScanType?: H264ScanType;
  SceneChangeDetect?: H264SceneChangeDetect;
  Slices?: number;
  Softness?: number;
  SpatialAq?: H264SpatialAq;
  SubgopLength?: H264SubGopLength;
  Syntax?: H264Syntax;
  TemporalAq?: H264TemporalAq;
  TimecodeInsertion?: H264TimecodeInsertionBehavior;
  TimecodeBurninSettings?: TimecodeBurninSettings;
  MinQp?: number;
  MinBitrate?: number;
}
export const H264Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdaptiveQuantization: S.optional(H264AdaptiveQuantization),
    AfdSignaling: S.optional(AfdSignaling),
    Bitrate: S.optional(S.Number),
    BufFillPct: S.optional(S.Number),
    BufSize: S.optional(S.Number),
    ColorMetadata: S.optional(H264ColorMetadata),
    ColorSpaceSettings: S.optional(H264ColorSpaceSettings),
    EntropyEncoding: S.optional(H264EntropyEncoding),
    FilterSettings: S.optional(H264FilterSettings),
    FixedAfd: S.optional(FixedAfd),
    FlickerAq: S.optional(H264FlickerAq),
    ForceFieldPictures: S.optional(H264ForceFieldPictures),
    FramerateControl: S.optional(H264FramerateControl),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    GopBReference: S.optional(H264GopBReference),
    GopClosedCadence: S.optional(S.Number),
    GopNumBFrames: S.optional(S.Number),
    GopSize: S.optional(S.Number),
    GopSizeUnits: S.optional(H264GopSizeUnits),
    Level: S.optional(H264Level),
    LookAheadRateControl: S.optional(H264LookAheadRateControl),
    MaxBitrate: S.optional(S.Number),
    MinIInterval: S.optional(S.Number),
    NumRefFrames: S.optional(S.Number),
    ParControl: S.optional(H264ParControl),
    ParDenominator: S.optional(S.Number),
    ParNumerator: S.optional(S.Number),
    Profile: S.optional(H264Profile),
    QualityLevel: S.optional(H264QualityLevel),
    QvbrQualityLevel: S.optional(S.Number),
    RateControlMode: S.optional(H264RateControlMode),
    ScanType: S.optional(H264ScanType),
    SceneChangeDetect: S.optional(H264SceneChangeDetect),
    Slices: S.optional(S.Number),
    Softness: S.optional(S.Number),
    SpatialAq: S.optional(H264SpatialAq),
    SubgopLength: S.optional(H264SubGopLength),
    Syntax: S.optional(H264Syntax),
    TemporalAq: S.optional(H264TemporalAq),
    TimecodeInsertion: S.optional(H264TimecodeInsertionBehavior),
    TimecodeBurninSettings: S.optional(TimecodeBurninSettings),
    MinQp: S.optional(S.Number),
    MinBitrate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AdaptiveQuantization: "adaptiveQuantization",
      AfdSignaling: "afdSignaling",
      Bitrate: "bitrate",
      BufFillPct: "bufFillPct",
      BufSize: "bufSize",
      ColorMetadata: "colorMetadata",
      ColorSpaceSettings: "colorSpaceSettings",
      EntropyEncoding: "entropyEncoding",
      FilterSettings: "filterSettings",
      FixedAfd: "fixedAfd",
      FlickerAq: "flickerAq",
      ForceFieldPictures: "forceFieldPictures",
      FramerateControl: "framerateControl",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      GopBReference: "gopBReference",
      GopClosedCadence: "gopClosedCadence",
      GopNumBFrames: "gopNumBFrames",
      GopSize: "gopSize",
      GopSizeUnits: "gopSizeUnits",
      Level: "level",
      LookAheadRateControl: "lookAheadRateControl",
      MaxBitrate: "maxBitrate",
      MinIInterval: "minIInterval",
      NumRefFrames: "numRefFrames",
      ParControl: "parControl",
      ParDenominator: "parDenominator",
      ParNumerator: "parNumerator",
      Profile: "profile",
      QualityLevel: "qualityLevel",
      QvbrQualityLevel: "qvbrQualityLevel",
      RateControlMode: "rateControlMode",
      ScanType: "scanType",
      SceneChangeDetect: "sceneChangeDetect",
      Slices: "slices",
      Softness: "softness",
      SpatialAq: "spatialAq",
      SubgopLength: "subgopLength",
      Syntax: "syntax",
      TemporalAq: "temporalAq",
      TimecodeInsertion: "timecodeInsertion",
      TimecodeBurninSettings: "timecodeBurninSettings",
      MinQp: "minQp",
      MinBitrate: "minBitrate",
    }),
  ),
).annotate({ identifier: "H264Settings" }) as any as S.Schema<H264Settings>;
export type H265AdaptiveQuantization =
  | "AUTO"
  | "HIGH"
  | "HIGHER"
  | "LOW"
  | "MAX"
  | "MEDIUM"
  | "OFF"
  | (string & {});
export const H265AdaptiveQuantization = /*@__PURE__*/ S.String;

export type H265AlternativeTransferFunction = "INSERT" | "OMIT" | (string & {});
export const H265AlternativeTransferFunction = /*@__PURE__*/ S.String;

export type __integerMin100000Max40000000 = number;
export type __integerMin100000Max80000000 = number;
export type H265ColorMetadata = "IGNORE" | "INSERT" | (string & {});
export const H265ColorMetadata = /*@__PURE__*/ S.String;

export interface DolbyVision81Settings {}
export const DolbyVision81Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DolbyVision81Settings",
}) as any as S.Schema<DolbyVision81Settings>;
export type __integerMin0Max32768 = number;
export interface Hdr10Settings {
  MaxCll?: number;
  MaxFall?: number;
}
export const Hdr10Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxCll: S.optional(S.Number),
    MaxFall: S.optional(S.Number),
  }).pipe(S.encodeKeys({ MaxCll: "maxCll", MaxFall: "maxFall" })),
).annotate({ identifier: "Hdr10Settings" }) as any as S.Schema<Hdr10Settings>;
export interface Hlg2020Settings {}
export const Hlg2020Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "Hlg2020Settings",
}) as any as S.Schema<Hlg2020Settings>;
export interface H265ColorSpaceSettings {
  ColorSpacePassthroughSettings?: ColorSpacePassthroughSettings;
  DolbyVision81Settings?: DolbyVision81Settings;
  Hdr10Settings?: Hdr10Settings;
  Rec601Settings?: Rec601Settings;
  Rec709Settings?: Rec709Settings;
  Hlg2020Settings?: Hlg2020Settings;
}
export const H265ColorSpaceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColorSpacePassthroughSettings: S.optional(ColorSpacePassthroughSettings),
    DolbyVision81Settings: S.optional(DolbyVision81Settings),
    Hdr10Settings: S.optional(Hdr10Settings),
    Rec601Settings: S.optional(Rec601Settings),
    Rec709Settings: S.optional(Rec709Settings),
    Hlg2020Settings: S.optional(Hlg2020Settings),
  }).pipe(
    S.encodeKeys({
      ColorSpacePassthroughSettings: "colorSpacePassthroughSettings",
      DolbyVision81Settings: "dolbyVision81Settings",
      Hdr10Settings: "hdr10Settings",
      Rec601Settings: "rec601Settings",
      Rec709Settings: "rec709Settings",
      Hlg2020Settings: "hlg2020Settings",
    }),
  ),
).annotate({
  identifier: "H265ColorSpaceSettings",
}) as any as S.Schema<H265ColorSpaceSettings>;
export interface H265FilterSettings {
  TemporalFilterSettings?: TemporalFilterSettings;
  BandwidthReductionFilterSettings?: BandwidthReductionFilterSettings;
}
export const H265FilterSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    TemporalFilterSettings: S.optional(TemporalFilterSettings),
    BandwidthReductionFilterSettings: S.optional(
      BandwidthReductionFilterSettings,
    ),
  }).pipe(
    S.encodeKeys({
      TemporalFilterSettings: "temporalFilterSettings",
      BandwidthReductionFilterSettings: "bandwidthReductionFilterSettings",
    }),
  ),
).annotate({
  identifier: "H265FilterSettings",
}) as any as S.Schema<H265FilterSettings>;
export type H265FlickerAq = "DISABLED" | "ENABLED" | (string & {});
export const H265FlickerAq = /*@__PURE__*/ S.String;

export type __integerMin1Max3003 = number;
export type H265GopSizeUnits = "FRAMES" | "SECONDS" | (string & {});
export const H265GopSizeUnits = /*@__PURE__*/ S.String;

export type H265Level =
  | "H265_LEVEL_1"
  | "H265_LEVEL_2"
  | "H265_LEVEL_2_1"
  | "H265_LEVEL_3"
  | "H265_LEVEL_3_1"
  | "H265_LEVEL_4"
  | "H265_LEVEL_4_1"
  | "H265_LEVEL_5"
  | "H265_LEVEL_5_1"
  | "H265_LEVEL_5_2"
  | "H265_LEVEL_6"
  | "H265_LEVEL_6_1"
  | "H265_LEVEL_6_2"
  | "H265_LEVEL_AUTO"
  | (string & {});
export const H265Level = /*@__PURE__*/ S.String;

export type H265LookAheadRateControl =
  | "HIGH"
  | "LOW"
  | "MEDIUM"
  | (string & {});
export const H265LookAheadRateControl = /*@__PURE__*/ S.String;

export type H265Profile = "MAIN" | "MAIN_10BIT" | (string & {});
export const H265Profile = /*@__PURE__*/ S.String;

export type H265RateControlMode = "CBR" | "MULTIPLEX" | "QVBR" | (string & {});
export const H265RateControlMode = /*@__PURE__*/ S.String;

export type H265ScanType = "INTERLACED" | "PROGRESSIVE" | (string & {});
export const H265ScanType = /*@__PURE__*/ S.String;

export type H265SceneChangeDetect = "DISABLED" | "ENABLED" | (string & {});
export const H265SceneChangeDetect = /*@__PURE__*/ S.String;

export type H265Tier = "HIGH" | "MAIN" | (string & {});
export const H265Tier = /*@__PURE__*/ S.String;

export type H265TimecodeInsertionBehavior =
  | "DISABLED"
  | "PIC_TIMING_SEI"
  | (string & {});
export const H265TimecodeInsertionBehavior = /*@__PURE__*/ S.String;

export type H265MvOverPictureBoundaries =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const H265MvOverPictureBoundaries = /*@__PURE__*/ S.String;

export type H265MvTemporalPredictor = "DISABLED" | "ENABLED" | (string & {});
export const H265MvTemporalPredictor = /*@__PURE__*/ S.String;

export type __integerMin64Max2160 = number;
export type H265TilePadding = "NONE" | "PADDED" | (string & {});
export const H265TilePadding = /*@__PURE__*/ S.String;

export type __integerMin256Max3840 = number;
export type H265TreeblockSize = "AUTO" | "TREE_SIZE_32X32" | (string & {});
export const H265TreeblockSize = /*@__PURE__*/ S.String;

export type H265Deblocking = "DISABLED" | "ENABLED" | (string & {});
export const H265Deblocking = /*@__PURE__*/ S.String;

export type H265GopBReference = "DISABLED" | "ENABLED" | (string & {});
export const H265GopBReference = /*@__PURE__*/ S.String;

export type __integerMin0Max3 = number;
export type __integerMin0Max40000000 = number;
export type H265SubGopLength = "DYNAMIC" | "FIXED" | (string & {});
export const H265SubGopLength = /*@__PURE__*/ S.String;

export interface H265Settings {
  AdaptiveQuantization?: H265AdaptiveQuantization;
  AfdSignaling?: AfdSignaling;
  AlternativeTransferFunction?: H265AlternativeTransferFunction;
  Bitrate?: number;
  BufSize?: number;
  ColorMetadata?: H265ColorMetadata;
  ColorSpaceSettings?: H265ColorSpaceSettings;
  FilterSettings?: H265FilterSettings;
  FixedAfd?: FixedAfd;
  FlickerAq?: H265FlickerAq;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopClosedCadence?: number;
  GopSize?: number;
  GopSizeUnits?: H265GopSizeUnits;
  Level?: H265Level;
  LookAheadRateControl?: H265LookAheadRateControl;
  MaxBitrate?: number;
  MinIInterval?: number;
  ParDenominator?: number;
  ParNumerator?: number;
  Profile?: H265Profile;
  QvbrQualityLevel?: number;
  RateControlMode?: H265RateControlMode;
  ScanType?: H265ScanType;
  SceneChangeDetect?: H265SceneChangeDetect;
  Slices?: number;
  Tier?: H265Tier;
  TimecodeInsertion?: H265TimecodeInsertionBehavior;
  TimecodeBurninSettings?: TimecodeBurninSettings;
  MvOverPictureBoundaries?: H265MvOverPictureBoundaries;
  MvTemporalPredictor?: H265MvTemporalPredictor;
  TileHeight?: number;
  TilePadding?: H265TilePadding;
  TileWidth?: number;
  TreeblockSize?: H265TreeblockSize;
  MinQp?: number;
  Deblocking?: H265Deblocking;
  GopBReference?: H265GopBReference;
  GopNumBFrames?: number;
  MinBitrate?: number;
  SubgopLength?: H265SubGopLength;
}
export const H265Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdaptiveQuantization: S.optional(H265AdaptiveQuantization),
    AfdSignaling: S.optional(AfdSignaling),
    AlternativeTransferFunction: S.optional(H265AlternativeTransferFunction),
    Bitrate: S.optional(S.Number),
    BufSize: S.optional(S.Number),
    ColorMetadata: S.optional(H265ColorMetadata),
    ColorSpaceSettings: S.optional(H265ColorSpaceSettings),
    FilterSettings: S.optional(H265FilterSettings),
    FixedAfd: S.optional(FixedAfd),
    FlickerAq: S.optional(H265FlickerAq),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    GopClosedCadence: S.optional(S.Number),
    GopSize: S.optional(S.Number),
    GopSizeUnits: S.optional(H265GopSizeUnits),
    Level: S.optional(H265Level),
    LookAheadRateControl: S.optional(H265LookAheadRateControl),
    MaxBitrate: S.optional(S.Number),
    MinIInterval: S.optional(S.Number),
    ParDenominator: S.optional(S.Number),
    ParNumerator: S.optional(S.Number),
    Profile: S.optional(H265Profile),
    QvbrQualityLevel: S.optional(S.Number),
    RateControlMode: S.optional(H265RateControlMode),
    ScanType: S.optional(H265ScanType),
    SceneChangeDetect: S.optional(H265SceneChangeDetect),
    Slices: S.optional(S.Number),
    Tier: S.optional(H265Tier),
    TimecodeInsertion: S.optional(H265TimecodeInsertionBehavior),
    TimecodeBurninSettings: S.optional(TimecodeBurninSettings),
    MvOverPictureBoundaries: S.optional(H265MvOverPictureBoundaries),
    MvTemporalPredictor: S.optional(H265MvTemporalPredictor),
    TileHeight: S.optional(S.Number),
    TilePadding: S.optional(H265TilePadding),
    TileWidth: S.optional(S.Number),
    TreeblockSize: S.optional(H265TreeblockSize),
    MinQp: S.optional(S.Number),
    Deblocking: S.optional(H265Deblocking),
    GopBReference: S.optional(H265GopBReference),
    GopNumBFrames: S.optional(S.Number),
    MinBitrate: S.optional(S.Number),
    SubgopLength: S.optional(H265SubGopLength),
  }).pipe(
    S.encodeKeys({
      AdaptiveQuantization: "adaptiveQuantization",
      AfdSignaling: "afdSignaling",
      AlternativeTransferFunction: "alternativeTransferFunction",
      Bitrate: "bitrate",
      BufSize: "bufSize",
      ColorMetadata: "colorMetadata",
      ColorSpaceSettings: "colorSpaceSettings",
      FilterSettings: "filterSettings",
      FixedAfd: "fixedAfd",
      FlickerAq: "flickerAq",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      GopClosedCadence: "gopClosedCadence",
      GopSize: "gopSize",
      GopSizeUnits: "gopSizeUnits",
      Level: "level",
      LookAheadRateControl: "lookAheadRateControl",
      MaxBitrate: "maxBitrate",
      MinIInterval: "minIInterval",
      ParDenominator: "parDenominator",
      ParNumerator: "parNumerator",
      Profile: "profile",
      QvbrQualityLevel: "qvbrQualityLevel",
      RateControlMode: "rateControlMode",
      ScanType: "scanType",
      SceneChangeDetect: "sceneChangeDetect",
      Slices: "slices",
      Tier: "tier",
      TimecodeInsertion: "timecodeInsertion",
      TimecodeBurninSettings: "timecodeBurninSettings",
      MvOverPictureBoundaries: "mvOverPictureBoundaries",
      MvTemporalPredictor: "mvTemporalPredictor",
      TileHeight: "tileHeight",
      TilePadding: "tilePadding",
      TileWidth: "tileWidth",
      TreeblockSize: "treeblockSize",
      MinQp: "minQp",
      Deblocking: "deblocking",
      GopBReference: "gopBReference",
      GopNumBFrames: "gopNumBFrames",
      MinBitrate: "minBitrate",
      SubgopLength: "subgopLength",
    }),
  ),
).annotate({ identifier: "H265Settings" }) as any as S.Schema<H265Settings>;
export type Mpeg2AdaptiveQuantization =
  | "AUTO"
  | "HIGH"
  | "LOW"
  | "MEDIUM"
  | "OFF"
  | (string & {});
export const Mpeg2AdaptiveQuantization = /*@__PURE__*/ S.String;

export type Mpeg2ColorMetadata = "IGNORE" | "INSERT" | (string & {});
export const Mpeg2ColorMetadata = /*@__PURE__*/ S.String;

export type Mpeg2ColorSpace = "AUTO" | "PASSTHROUGH" | (string & {});
export const Mpeg2ColorSpace = /*@__PURE__*/ S.String;

export type Mpeg2DisplayRatio =
  | "DISPLAYRATIO16X9"
  | "DISPLAYRATIO4X3"
  | (string & {});
export const Mpeg2DisplayRatio = /*@__PURE__*/ S.String;

export interface Mpeg2FilterSettings {
  TemporalFilterSettings?: TemporalFilterSettings;
}
export const Mpeg2FilterSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TemporalFilterSettings: S.optional(TemporalFilterSettings) }).pipe(
    S.encodeKeys({ TemporalFilterSettings: "temporalFilterSettings" }),
  ),
).annotate({
  identifier: "Mpeg2FilterSettings",
}) as any as S.Schema<Mpeg2FilterSettings>;
export type Mpeg2GopSizeUnits = "FRAMES" | "SECONDS" | (string & {});
export const Mpeg2GopSizeUnits = /*@__PURE__*/ S.String;

export type Mpeg2ScanType = "INTERLACED" | "PROGRESSIVE" | (string & {});
export const Mpeg2ScanType = /*@__PURE__*/ S.String;

export type Mpeg2SubGopLength = "DYNAMIC" | "FIXED" | (string & {});
export const Mpeg2SubGopLength = /*@__PURE__*/ S.String;

export type Mpeg2TimecodeInsertionBehavior =
  | "DISABLED"
  | "GOP_TIMECODE"
  | (string & {});
export const Mpeg2TimecodeInsertionBehavior = /*@__PURE__*/ S.String;

export interface Mpeg2Settings {
  AdaptiveQuantization?: Mpeg2AdaptiveQuantization;
  AfdSignaling?: AfdSignaling;
  ColorMetadata?: Mpeg2ColorMetadata;
  ColorSpace?: Mpeg2ColorSpace;
  DisplayAspectRatio?: Mpeg2DisplayRatio;
  FilterSettings?: Mpeg2FilterSettings;
  FixedAfd?: FixedAfd;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopClosedCadence?: number;
  GopNumBFrames?: number;
  GopSize?: number;
  GopSizeUnits?: Mpeg2GopSizeUnits;
  ScanType?: Mpeg2ScanType;
  SubgopLength?: Mpeg2SubGopLength;
  TimecodeInsertion?: Mpeg2TimecodeInsertionBehavior;
  TimecodeBurninSettings?: TimecodeBurninSettings;
}
export const Mpeg2Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdaptiveQuantization: S.optional(Mpeg2AdaptiveQuantization),
    AfdSignaling: S.optional(AfdSignaling),
    ColorMetadata: S.optional(Mpeg2ColorMetadata),
    ColorSpace: S.optional(Mpeg2ColorSpace),
    DisplayAspectRatio: S.optional(Mpeg2DisplayRatio),
    FilterSettings: S.optional(Mpeg2FilterSettings),
    FixedAfd: S.optional(FixedAfd),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    GopClosedCadence: S.optional(S.Number),
    GopNumBFrames: S.optional(S.Number),
    GopSize: S.optional(S.Number),
    GopSizeUnits: S.optional(Mpeg2GopSizeUnits),
    ScanType: S.optional(Mpeg2ScanType),
    SubgopLength: S.optional(Mpeg2SubGopLength),
    TimecodeInsertion: S.optional(Mpeg2TimecodeInsertionBehavior),
    TimecodeBurninSettings: S.optional(TimecodeBurninSettings),
  }).pipe(
    S.encodeKeys({
      AdaptiveQuantization: "adaptiveQuantization",
      AfdSignaling: "afdSignaling",
      ColorMetadata: "colorMetadata",
      ColorSpace: "colorSpace",
      DisplayAspectRatio: "displayAspectRatio",
      FilterSettings: "filterSettings",
      FixedAfd: "fixedAfd",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      GopClosedCadence: "gopClosedCadence",
      GopNumBFrames: "gopNumBFrames",
      GopSize: "gopSize",
      GopSizeUnits: "gopSizeUnits",
      ScanType: "scanType",
      SubgopLength: "subgopLength",
      TimecodeInsertion: "timecodeInsertion",
      TimecodeBurninSettings: "timecodeBurninSettings",
    }),
  ),
).annotate({ identifier: "Mpeg2Settings" }) as any as S.Schema<Mpeg2Settings>;
export type __integerMin50000Max24000000 = number;
export interface Av1ColorSpaceSettings {
  ColorSpacePassthroughSettings?: ColorSpacePassthroughSettings;
  Hdr10Settings?: Hdr10Settings;
  Rec601Settings?: Rec601Settings;
  Rec709Settings?: Rec709Settings;
  Hlg2020Settings?: Hlg2020Settings;
}
export const Av1ColorSpaceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColorSpacePassthroughSettings: S.optional(ColorSpacePassthroughSettings),
    Hdr10Settings: S.optional(Hdr10Settings),
    Rec601Settings: S.optional(Rec601Settings),
    Rec709Settings: S.optional(Rec709Settings),
    Hlg2020Settings: S.optional(Hlg2020Settings),
  }).pipe(
    S.encodeKeys({
      ColorSpacePassthroughSettings: "colorSpacePassthroughSettings",
      Hdr10Settings: "hdr10Settings",
      Rec601Settings: "rec601Settings",
      Rec709Settings: "rec709Settings",
      Hlg2020Settings: "hlg2020Settings",
    }),
  ),
).annotate({
  identifier: "Av1ColorSpaceSettings",
}) as any as S.Schema<Av1ColorSpaceSettings>;
export type Av1GopSizeUnits = "FRAMES" | "SECONDS" | (string & {});
export const Av1GopSizeUnits = /*@__PURE__*/ S.String;

export type Av1Level =
  | "AV1_LEVEL_2"
  | "AV1_LEVEL_2_1"
  | "AV1_LEVEL_3"
  | "AV1_LEVEL_3_1"
  | "AV1_LEVEL_4"
  | "AV1_LEVEL_4_1"
  | "AV1_LEVEL_5"
  | "AV1_LEVEL_5_1"
  | "AV1_LEVEL_5_2"
  | "AV1_LEVEL_5_3"
  | "AV1_LEVEL_6"
  | "AV1_LEVEL_6_1"
  | "AV1_LEVEL_6_2"
  | "AV1_LEVEL_6_3"
  | "AV1_LEVEL_AUTO"
  | (string & {});
export const Av1Level = /*@__PURE__*/ S.String;

export type Av1LookAheadRateControl = "HIGH" | "LOW" | "MEDIUM" | (string & {});
export const Av1LookAheadRateControl = /*@__PURE__*/ S.String;

export type __integerMin50000Max12000000 = number;
export type Av1SceneChangeDetect = "DISABLED" | "ENABLED" | (string & {});
export const Av1SceneChangeDetect = /*@__PURE__*/ S.String;

export type Av1RateControlMode = "CBR" | "QVBR" | (string & {});
export const Av1RateControlMode = /*@__PURE__*/ S.String;

export type __integerMin0Max8000000 = number;
export type Av1SpatialAq = "DISABLED" | "ENABLED" | (string & {});
export const Av1SpatialAq = /*@__PURE__*/ S.String;

export type Av1TemporalAq = "DISABLED" | "ENABLED" | (string & {});
export const Av1TemporalAq = /*@__PURE__*/ S.String;

export type Av1TimecodeInsertionBehavior =
  | "DISABLED"
  | "METADATA_OBU"
  | (string & {});
export const Av1TimecodeInsertionBehavior = /*@__PURE__*/ S.String;

export type Av1BitDepth = "DEPTH_10" | "DEPTH_8" | (string & {});
export const Av1BitDepth = /*@__PURE__*/ S.String;

export interface Av1Settings {
  AfdSignaling?: AfdSignaling;
  BufSize?: number;
  ColorSpaceSettings?: Av1ColorSpaceSettings;
  FixedAfd?: FixedAfd;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopSize?: number;
  GopSizeUnits?: Av1GopSizeUnits;
  Level?: Av1Level;
  LookAheadRateControl?: Av1LookAheadRateControl;
  MaxBitrate?: number;
  MinIInterval?: number;
  ParDenominator?: number;
  ParNumerator?: number;
  QvbrQualityLevel?: number;
  SceneChangeDetect?: Av1SceneChangeDetect;
  TimecodeBurninSettings?: TimecodeBurninSettings;
  Bitrate?: number;
  RateControlMode?: Av1RateControlMode;
  MinBitrate?: number;
  SpatialAq?: Av1SpatialAq;
  TemporalAq?: Av1TemporalAq;
  TimecodeInsertion?: Av1TimecodeInsertionBehavior;
  BitDepth?: Av1BitDepth;
}
export const Av1Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AfdSignaling: S.optional(AfdSignaling),
    BufSize: S.optional(S.Number),
    ColorSpaceSettings: S.optional(Av1ColorSpaceSettings),
    FixedAfd: S.optional(FixedAfd),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    GopSize: S.optional(S.Number),
    GopSizeUnits: S.optional(Av1GopSizeUnits),
    Level: S.optional(Av1Level),
    LookAheadRateControl: S.optional(Av1LookAheadRateControl),
    MaxBitrate: S.optional(S.Number),
    MinIInterval: S.optional(S.Number),
    ParDenominator: S.optional(S.Number),
    ParNumerator: S.optional(S.Number),
    QvbrQualityLevel: S.optional(S.Number),
    SceneChangeDetect: S.optional(Av1SceneChangeDetect),
    TimecodeBurninSettings: S.optional(TimecodeBurninSettings),
    Bitrate: S.optional(S.Number),
    RateControlMode: S.optional(Av1RateControlMode),
    MinBitrate: S.optional(S.Number),
    SpatialAq: S.optional(Av1SpatialAq),
    TemporalAq: S.optional(Av1TemporalAq),
    TimecodeInsertion: S.optional(Av1TimecodeInsertionBehavior),
    BitDepth: S.optional(Av1BitDepth),
  }).pipe(
    S.encodeKeys({
      AfdSignaling: "afdSignaling",
      BufSize: "bufSize",
      ColorSpaceSettings: "colorSpaceSettings",
      FixedAfd: "fixedAfd",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      GopSize: "gopSize",
      GopSizeUnits: "gopSizeUnits",
      Level: "level",
      LookAheadRateControl: "lookAheadRateControl",
      MaxBitrate: "maxBitrate",
      MinIInterval: "minIInterval",
      ParDenominator: "parDenominator",
      ParNumerator: "parNumerator",
      QvbrQualityLevel: "qvbrQualityLevel",
      SceneChangeDetect: "sceneChangeDetect",
      TimecodeBurninSettings: "timecodeBurninSettings",
      Bitrate: "bitrate",
      RateControlMode: "rateControlMode",
      MinBitrate: "minBitrate",
      SpatialAq: "spatialAq",
      TemporalAq: "temporalAq",
      TimecodeInsertion: "timecodeInsertion",
      BitDepth: "bitDepth",
    }),
  ),
).annotate({ identifier: "Av1Settings" }) as any as S.Schema<Av1Settings>;
export interface VideoCodecSettings {
  FrameCaptureSettings?: FrameCaptureSettings;
  H264Settings?: H264Settings;
  H265Settings?: H265Settings;
  Mpeg2Settings?: Mpeg2Settings;
  Av1Settings?: Av1Settings;
}
export const VideoCodecSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FrameCaptureSettings: S.optional(FrameCaptureSettings),
    H264Settings: S.optional(H264Settings),
    H265Settings: S.optional(H265Settings),
    Mpeg2Settings: S.optional(Mpeg2Settings),
    Av1Settings: S.optional(Av1Settings),
  }).pipe(
    S.encodeKeys({
      FrameCaptureSettings: "frameCaptureSettings",
      H264Settings: "h264Settings",
      H265Settings: "h265Settings",
      Mpeg2Settings: "mpeg2Settings",
      Av1Settings: "av1Settings",
    }),
  ),
).annotate({
  identifier: "VideoCodecSettings",
}) as any as S.Schema<VideoCodecSettings>;
export type VideoDescriptionRespondToAfd =
  | "NONE"
  | "PASSTHROUGH"
  | "RESPOND"
  | (string & {});
export const VideoDescriptionRespondToAfd = /*@__PURE__*/ S.String;

export type VideoDescriptionScalingBehavior =
  | "DEFAULT"
  | "STRETCH_TO_OUTPUT"
  | "SMART_CROP"
  | (string & {});
export const VideoDescriptionScalingBehavior = /*@__PURE__*/ S.String;

export interface VideoDescription {
  CodecSettings?: VideoCodecSettings;
  Height?: number;
  Name?: string;
  RespondToAfd?: VideoDescriptionRespondToAfd;
  ScalingBehavior?: VideoDescriptionScalingBehavior;
  Sharpness?: number;
  Width?: number;
}
export const VideoDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CodecSettings: S.optional(VideoCodecSettings),
    Height: S.optional(S.Number),
    Name: S.optional(S.String),
    RespondToAfd: S.optional(VideoDescriptionRespondToAfd),
    ScalingBehavior: S.optional(VideoDescriptionScalingBehavior),
    Sharpness: S.optional(S.Number),
    Width: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      CodecSettings: "codecSettings",
      Height: "height",
      Name: "name",
      RespondToAfd: "respondToAfd",
      ScalingBehavior: "scalingBehavior",
      Sharpness: "sharpness",
      Width: "width",
    }),
  ),
).annotate({
  identifier: "VideoDescription",
}) as any as S.Schema<VideoDescription>;
export type __listOfVideoDescription = VideoDescription[];
export const __listOfVideoDescription = /*@__PURE__*/ S.Array(VideoDescription);
export type ThumbnailState = "AUTO" | "DISABLED" | (string & {});
export const ThumbnailState = /*@__PURE__*/ S.String;

export interface ThumbnailConfiguration {
  State?: ThumbnailState;
}
export const ThumbnailConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ State: S.optional(ThumbnailState) }).pipe(
    S.encodeKeys({ State: "state" }),
  ),
).annotate({
  identifier: "ThumbnailConfiguration",
}) as any as S.Schema<ThumbnailConfiguration>;
export type ColorSpace =
  | "HDR10"
  | "HLG_2020"
  | "REC_601"
  | "REC_709"
  | (string & {});
export const ColorSpace = /*@__PURE__*/ S.String;

export interface ColorCorrection {
  InputColorSpace?: ColorSpace;
  OutputColorSpace?: ColorSpace;
  Uri?: string;
}
export const ColorCorrection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputColorSpace: S.optional(ColorSpace),
    OutputColorSpace: S.optional(ColorSpace),
    Uri: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      InputColorSpace: "inputColorSpace",
      OutputColorSpace: "outputColorSpace",
      Uri: "uri",
    }),
  ),
).annotate({
  identifier: "ColorCorrection",
}) as any as S.Schema<ColorCorrection>;
export type __listOfColorCorrection = ColorCorrection[];
export const __listOfColorCorrection = /*@__PURE__*/ S.Array(ColorCorrection);
export interface ColorCorrectionSettings {
  GlobalColorCorrections?: ColorCorrection[];
}
export const ColorCorrectionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GlobalColorCorrections: S.optional(__listOfColorCorrection),
  }).pipe(S.encodeKeys({ GlobalColorCorrections: "globalColorCorrections" })),
).annotate({
  identifier: "ColorCorrectionSettings",
}) as any as S.Schema<ColorCorrectionSettings>;
export interface EncoderSettings {
  AudioDescriptions?: AudioDescription[];
  AvailBlanking?: AvailBlanking;
  AvailConfiguration?: AvailConfiguration;
  BlackoutSlate?: BlackoutSlate;
  CaptionDescriptions?: CaptionDescription[];
  FeatureActivations?: FeatureActivations;
  GlobalConfiguration?: GlobalConfiguration;
  MotionGraphicsConfiguration?: MotionGraphicsConfiguration;
  NielsenConfiguration?: NielsenConfiguration;
  OutputGroups?: OutputGroup[];
  TimecodeConfig?: TimecodeConfig;
  VideoDescriptions?: VideoDescription[];
  ThumbnailConfiguration?: ThumbnailConfiguration;
  ColorCorrectionSettings?: ColorCorrectionSettings;
}
export const EncoderSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDescriptions: S.optional(__listOfAudioDescription),
    AvailBlanking: S.optional(AvailBlanking),
    AvailConfiguration: S.optional(AvailConfiguration),
    BlackoutSlate: S.optional(BlackoutSlate),
    CaptionDescriptions: S.optional(__listOfCaptionDescription),
    FeatureActivations: S.optional(FeatureActivations),
    GlobalConfiguration: S.optional(GlobalConfiguration),
    MotionGraphicsConfiguration: S.optional(MotionGraphicsConfiguration),
    NielsenConfiguration: S.optional(NielsenConfiguration),
    OutputGroups: S.optional(__listOfOutputGroup),
    TimecodeConfig: S.optional(TimecodeConfig),
    VideoDescriptions: S.optional(__listOfVideoDescription),
    ThumbnailConfiguration: S.optional(ThumbnailConfiguration),
    ColorCorrectionSettings: S.optional(ColorCorrectionSettings),
  }).pipe(
    S.encodeKeys({
      AudioDescriptions: "audioDescriptions",
      AvailBlanking: "availBlanking",
      AvailConfiguration: "availConfiguration",
      BlackoutSlate: "blackoutSlate",
      CaptionDescriptions: "captionDescriptions",
      FeatureActivations: "featureActivations",
      GlobalConfiguration: "globalConfiguration",
      MotionGraphicsConfiguration: "motionGraphicsConfiguration",
      NielsenConfiguration: "nielsenConfiguration",
      OutputGroups: "outputGroups",
      TimecodeConfig: "timecodeConfig",
      VideoDescriptions: "videoDescriptions",
      ThumbnailConfiguration: "thumbnailConfiguration",
      ColorCorrectionSettings: "colorCorrectionSettings",
    }),
  ),
).annotate({
  identifier: "EncoderSettings",
}) as any as S.Schema<EncoderSettings>;
export interface AudioSilenceFailoverSettings {
  AudioSelectorName?: string;
  AudioSilenceThresholdMsec?: number;
}
export const AudioSilenceFailoverSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioSelectorName: S.optional(S.String),
    AudioSilenceThresholdMsec: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AudioSelectorName: "audioSelectorName",
      AudioSilenceThresholdMsec: "audioSilenceThresholdMsec",
    }),
  ),
).annotate({
  identifier: "AudioSilenceFailoverSettings",
}) as any as S.Schema<AudioSilenceFailoverSettings>;
export type __integerMin100 = number;
export interface InputLossFailoverSettings {
  InputLossThresholdMsec?: number;
}
export const InputLossFailoverSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputLossThresholdMsec: S.optional(S.Number) }).pipe(
    S.encodeKeys({ InputLossThresholdMsec: "inputLossThresholdMsec" }),
  ),
).annotate({
  identifier: "InputLossFailoverSettings",
}) as any as S.Schema<InputLossFailoverSettings>;
export type __doubleMin0Max1 = number;
export interface VideoBlackFailoverSettings {
  BlackDetectThreshold?: number;
  VideoBlackThresholdMsec?: number;
}
export const VideoBlackFailoverSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BlackDetectThreshold: S.optional(S.Number),
    VideoBlackThresholdMsec: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BlackDetectThreshold: "blackDetectThreshold",
      VideoBlackThresholdMsec: "videoBlackThresholdMsec",
    }),
  ),
).annotate({
  identifier: "VideoBlackFailoverSettings",
}) as any as S.Schema<VideoBlackFailoverSettings>;
export interface FailoverConditionSettings {
  AudioSilenceSettings?: AudioSilenceFailoverSettings;
  InputLossSettings?: InputLossFailoverSettings;
  VideoBlackSettings?: VideoBlackFailoverSettings;
}
export const FailoverConditionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioSilenceSettings: S.optional(AudioSilenceFailoverSettings),
    InputLossSettings: S.optional(InputLossFailoverSettings),
    VideoBlackSettings: S.optional(VideoBlackFailoverSettings),
  }).pipe(
    S.encodeKeys({
      AudioSilenceSettings: "audioSilenceSettings",
      InputLossSettings: "inputLossSettings",
      VideoBlackSettings: "videoBlackSettings",
    }),
  ),
).annotate({
  identifier: "FailoverConditionSettings",
}) as any as S.Schema<FailoverConditionSettings>;
export interface FailoverCondition {
  FailoverConditionSettings?: FailoverConditionSettings;
}
export const FailoverCondition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FailoverConditionSettings: S.optional(FailoverConditionSettings),
  }).pipe(
    S.encodeKeys({ FailoverConditionSettings: "failoverConditionSettings" }),
  ),
).annotate({
  identifier: "FailoverCondition",
}) as any as S.Schema<FailoverCondition>;
export type __listOfFailoverCondition = FailoverCondition[];
export const __listOfFailoverCondition =
  /*@__PURE__*/ S.Array(FailoverCondition);
export type InputPreference =
  | "EQUAL_INPUT_PREFERENCE"
  | "PRIMARY_INPUT_PREFERRED"
  | (string & {});
export const InputPreference = /*@__PURE__*/ S.String;

export interface AutomaticInputFailoverSettings {
  ErrorClearTimeMsec?: number;
  FailoverConditions?: FailoverCondition[];
  InputPreference?: InputPreference;
  SecondaryInputId?: string;
}
export const AutomaticInputFailoverSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ErrorClearTimeMsec: S.optional(S.Number),
    FailoverConditions: S.optional(__listOfFailoverCondition),
    InputPreference: S.optional(InputPreference),
    SecondaryInputId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ErrorClearTimeMsec: "errorClearTimeMsec",
      FailoverConditions: "failoverConditions",
      InputPreference: "inputPreference",
      SecondaryInputId: "secondaryInputId",
    }),
  ),
).annotate({
  identifier: "AutomaticInputFailoverSettings",
}) as any as S.Schema<AutomaticInputFailoverSettings>;
export interface AudioHlsRenditionSelection {
  GroupId?: string;
  Name?: string;
}
export const AudioHlsRenditionSelection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ GroupId: S.optional(S.String), Name: S.optional(S.String) }).pipe(
    S.encodeKeys({ GroupId: "groupId", Name: "name" }),
  ),
).annotate({
  identifier: "AudioHlsRenditionSelection",
}) as any as S.Schema<AudioHlsRenditionSelection>;
export type AudioLanguageSelectionPolicy = "LOOSE" | "STRICT" | (string & {});
export const AudioLanguageSelectionPolicy = /*@__PURE__*/ S.String;

export interface AudioLanguageSelection {
  LanguageCode?: string;
  LanguageSelectionPolicy?: AudioLanguageSelectionPolicy;
}
export const AudioLanguageSelection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LanguageCode: S.optional(S.String),
    LanguageSelectionPolicy: S.optional(AudioLanguageSelectionPolicy),
  }).pipe(
    S.encodeKeys({
      LanguageCode: "languageCode",
      LanguageSelectionPolicy: "languageSelectionPolicy",
    }),
  ),
).annotate({
  identifier: "AudioLanguageSelection",
}) as any as S.Schema<AudioLanguageSelection>;
export type __integerMin0Max8191 = number;
export type DolbyEProgramSelection =
  | "ALL_CHANNELS"
  | "PROGRAM_1"
  | "PROGRAM_2"
  | "PROGRAM_3"
  | "PROGRAM_4"
  | "PROGRAM_5"
  | "PROGRAM_6"
  | "PROGRAM_7"
  | "PROGRAM_8"
  | (string & {});
export const DolbyEProgramSelection = /*@__PURE__*/ S.String;

export interface AudioDolbyEDecode {
  ProgramSelection?: DolbyEProgramSelection;
}
export const AudioDolbyEDecode = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProgramSelection: S.optional(DolbyEProgramSelection) }).pipe(
    S.encodeKeys({ ProgramSelection: "programSelection" }),
  ),
).annotate({
  identifier: "AudioDolbyEDecode",
}) as any as S.Schema<AudioDolbyEDecode>;
export type __doubleMinNegative60Max60 = number;
export interface AudioPreMixerSettings {
  AudioNormalizationSettings?: AudioNormalizationSettings;
  Channels?: number;
  GainDb?: number;
  RemixSettings?: RemixSettings;
}
export const AudioPreMixerSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioNormalizationSettings: S.optional(AudioNormalizationSettings),
    Channels: S.optional(S.Number),
    GainDb: S.optional(S.Number),
    RemixSettings: S.optional(RemixSettings),
  }).pipe(
    S.encodeKeys({
      AudioNormalizationSettings: "audioNormalizationSettings",
      Channels: "channels",
      GainDb: "gainDb",
      RemixSettings: "remixSettings",
    }),
  ),
).annotate({
  identifier: "AudioPreMixerSettings",
}) as any as S.Schema<AudioPreMixerSettings>;
export interface AudioPid {
  DolbyEDecode?: AudioDolbyEDecode;
  Pid?: number;
  PremixSettings?: AudioPreMixerSettings;
}
export const AudioPid = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DolbyEDecode: S.optional(AudioDolbyEDecode),
    Pid: S.optional(S.Number),
    PremixSettings: S.optional(AudioPreMixerSettings),
  }).pipe(
    S.encodeKeys({
      DolbyEDecode: "dolbyEDecode",
      Pid: "pid",
      PremixSettings: "premixSettings",
    }),
  ),
).annotate({ identifier: "AudioPid" }) as any as S.Schema<AudioPid>;
export type __listOfAudioPid = AudioPid[];
export const __listOfAudioPid = /*@__PURE__*/ S.Array(AudioPid);
export interface AudioPidSelection {
  Pid?: number;
  Pids?: AudioPid[];
}
export const AudioPidSelection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Pid: S.optional(S.Number),
    Pids: S.optional(__listOfAudioPid),
  }).pipe(S.encodeKeys({ Pid: "pid", Pids: "pids" })),
).annotate({
  identifier: "AudioPidSelection",
}) as any as S.Schema<AudioPidSelection>;
export interface AudioTrack {
  Track?: number;
  PremixSettings?: AudioPreMixerSettings;
}
export const AudioTrack = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Track: S.optional(S.Number),
    PremixSettings: S.optional(AudioPreMixerSettings),
  }).pipe(S.encodeKeys({ Track: "track", PremixSettings: "premixSettings" })),
).annotate({ identifier: "AudioTrack" }) as any as S.Schema<AudioTrack>;
export type __listOfAudioTrack = AudioTrack[];
export const __listOfAudioTrack = /*@__PURE__*/ S.Array(AudioTrack);
export interface AudioTrackSelection {
  Tracks?: AudioTrack[];
  DolbyEDecode?: AudioDolbyEDecode;
}
export const AudioTrackSelection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Tracks: S.optional(__listOfAudioTrack),
    DolbyEDecode: S.optional(AudioDolbyEDecode),
  }).pipe(S.encodeKeys({ Tracks: "tracks", DolbyEDecode: "dolbyEDecode" })),
).annotate({
  identifier: "AudioTrackSelection",
}) as any as S.Schema<AudioTrackSelection>;
export interface AudioSelectorSettings {
  AudioHlsRenditionSelection?: AudioHlsRenditionSelection;
  AudioLanguageSelection?: AudioLanguageSelection;
  AudioPidSelection?: AudioPidSelection;
  AudioTrackSelection?: AudioTrackSelection;
}
export const AudioSelectorSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioHlsRenditionSelection: S.optional(AudioHlsRenditionSelection),
    AudioLanguageSelection: S.optional(AudioLanguageSelection),
    AudioPidSelection: S.optional(AudioPidSelection),
    AudioTrackSelection: S.optional(AudioTrackSelection),
  }).pipe(
    S.encodeKeys({
      AudioHlsRenditionSelection: "audioHlsRenditionSelection",
      AudioLanguageSelection: "audioLanguageSelection",
      AudioPidSelection: "audioPidSelection",
      AudioTrackSelection: "audioTrackSelection",
    }),
  ),
).annotate({
  identifier: "AudioSelectorSettings",
}) as any as S.Schema<AudioSelectorSettings>;
export interface AudioSelector {
  Name?: string;
  SelectorSettings?: AudioSelectorSettings;
}
export const AudioSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    SelectorSettings: S.optional(AudioSelectorSettings),
  }).pipe(S.encodeKeys({ Name: "name", SelectorSettings: "selectorSettings" })),
).annotate({ identifier: "AudioSelector" }) as any as S.Schema<AudioSelector>;
export type __listOfAudioSelector = AudioSelector[];
export const __listOfAudioSelector = /*@__PURE__*/ S.Array(AudioSelector);
export interface AncillarySourceSettings {
  SourceAncillaryChannelNumber?: number;
}
export const AncillarySourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceAncillaryChannelNumber: S.optional(S.Number) }).pipe(
    S.encodeKeys({
      SourceAncillaryChannelNumber: "sourceAncillaryChannelNumber",
    }),
  ),
).annotate({
  identifier: "AncillarySourceSettings",
}) as any as S.Schema<AncillarySourceSettings>;
export interface AribSourceSettings {}
export const AribSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AribSourceSettings",
}) as any as S.Schema<AribSourceSettings>;
export type DvbSubOcrLanguage =
  | "DEU"
  | "ENG"
  | "FRA"
  | "NLD"
  | "POR"
  | "SPA"
  | (string & {});
export const DvbSubOcrLanguage = /*@__PURE__*/ S.String;

export interface DvbSubSourceSettings {
  OcrLanguage?: DvbSubOcrLanguage;
  Pid?: number;
}
export const DvbSubSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OcrLanguage: S.optional(DvbSubOcrLanguage),
    Pid: S.optional(S.Number),
  }).pipe(S.encodeKeys({ OcrLanguage: "ocrLanguage", Pid: "pid" })),
).annotate({
  identifier: "DvbSubSourceSettings",
}) as any as S.Schema<DvbSubSourceSettings>;
export type EmbeddedConvert608To708 = "DISABLED" | "UPCONVERT" | (string & {});
export const EmbeddedConvert608To708 = /*@__PURE__*/ S.String;

export type EmbeddedScte20Detection = "AUTO" | "OFF" | (string & {});
export const EmbeddedScte20Detection = /*@__PURE__*/ S.String;

export type __integerMin1Max5 = number;
export interface EmbeddedSourceSettings {
  Convert608To708?: EmbeddedConvert608To708;
  Scte20Detection?: EmbeddedScte20Detection;
  Source608ChannelNumber?: number;
  Source608TrackNumber?: number;
}
export const EmbeddedSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Convert608To708: S.optional(EmbeddedConvert608To708),
    Scte20Detection: S.optional(EmbeddedScte20Detection),
    Source608ChannelNumber: S.optional(S.Number),
    Source608TrackNumber: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Convert608To708: "convert608To708",
      Scte20Detection: "scte20Detection",
      Source608ChannelNumber: "source608ChannelNumber",
      Source608TrackNumber: "source608TrackNumber",
    }),
  ),
).annotate({
  identifier: "EmbeddedSourceSettings",
}) as any as S.Schema<EmbeddedSourceSettings>;
export type Scte20Convert608To708 = "DISABLED" | "UPCONVERT" | (string & {});
export const Scte20Convert608To708 = /*@__PURE__*/ S.String;

export interface Scte20SourceSettings {
  Convert608To708?: Scte20Convert608To708;
  Source608ChannelNumber?: number;
}
export const Scte20SourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Convert608To708: S.optional(Scte20Convert608To708),
    Source608ChannelNumber: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Convert608To708: "convert608To708",
      Source608ChannelNumber: "source608ChannelNumber",
    }),
  ),
).annotate({
  identifier: "Scte20SourceSettings",
}) as any as S.Schema<Scte20SourceSettings>;
export type Scte27OcrLanguage =
  | "DEU"
  | "ENG"
  | "FRA"
  | "NLD"
  | "POR"
  | "SPA"
  | (string & {});
export const Scte27OcrLanguage = /*@__PURE__*/ S.String;

export interface Scte27SourceSettings {
  OcrLanguage?: Scte27OcrLanguage;
  Pid?: number;
}
export const Scte27SourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OcrLanguage: S.optional(Scte27OcrLanguage),
    Pid: S.optional(S.Number),
  }).pipe(S.encodeKeys({ OcrLanguage: "ocrLanguage", Pid: "pid" })),
).annotate({
  identifier: "Scte27SourceSettings",
}) as any as S.Schema<Scte27SourceSettings>;
export type __doubleMin0Max100 = number;
export interface CaptionRectangle {
  Height?: number;
  LeftOffset?: number;
  TopOffset?: number;
  Width?: number;
}
export const CaptionRectangle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Height: S.optional(S.Number),
    LeftOffset: S.optional(S.Number),
    TopOffset: S.optional(S.Number),
    Width: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Height: "height",
      LeftOffset: "leftOffset",
      TopOffset: "topOffset",
      Width: "width",
    }),
  ),
).annotate({
  identifier: "CaptionRectangle",
}) as any as S.Schema<CaptionRectangle>;
export interface TeletextSourceSettings {
  OutputRectangle?: CaptionRectangle;
  PageNumber?: string;
}
export const TeletextSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputRectangle: S.optional(CaptionRectangle),
    PageNumber: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      OutputRectangle: "outputRectangle",
      PageNumber: "pageNumber",
    }),
  ),
).annotate({
  identifier: "TeletextSourceSettings",
}) as any as S.Schema<TeletextSourceSettings>;
export type CaptionSynchronizationMode =
  | "NO_VIDEO_DELAY"
  | "VIDEO_ALIGNED_CAPTIONS"
  | (string & {});
export const CaptionSynchronizationMode = /*@__PURE__*/ S.String;

export interface SmartSubtitleSourceSettings {
  CaptionSynchronizationMode?: CaptionSynchronizationMode;
  InferenceFeedOutput?: string;
}
export const SmartSubtitleSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CaptionSynchronizationMode: S.optional(CaptionSynchronizationMode),
    InferenceFeedOutput: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CaptionSynchronizationMode: "captionSynchronizationMode",
      InferenceFeedOutput: "inferenceFeedOutput",
    }),
  ),
).annotate({
  identifier: "SmartSubtitleSourceSettings",
}) as any as S.Schema<SmartSubtitleSourceSettings>;
export interface CaptionSelectorSettings {
  AncillarySourceSettings?: AncillarySourceSettings;
  AribSourceSettings?: AribSourceSettings;
  DvbSubSourceSettings?: DvbSubSourceSettings;
  EmbeddedSourceSettings?: EmbeddedSourceSettings;
  Scte20SourceSettings?: Scte20SourceSettings;
  Scte27SourceSettings?: Scte27SourceSettings;
  TeletextSourceSettings?: TeletextSourceSettings;
  SmartSubtitleSourceSettings?: SmartSubtitleSourceSettings;
}
export const CaptionSelectorSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AncillarySourceSettings: S.optional(AncillarySourceSettings),
    AribSourceSettings: S.optional(AribSourceSettings),
    DvbSubSourceSettings: S.optional(DvbSubSourceSettings),
    EmbeddedSourceSettings: S.optional(EmbeddedSourceSettings),
    Scte20SourceSettings: S.optional(Scte20SourceSettings),
    Scte27SourceSettings: S.optional(Scte27SourceSettings),
    TeletextSourceSettings: S.optional(TeletextSourceSettings),
    SmartSubtitleSourceSettings: S.optional(SmartSubtitleSourceSettings),
  }).pipe(
    S.encodeKeys({
      AncillarySourceSettings: "ancillarySourceSettings",
      AribSourceSettings: "aribSourceSettings",
      DvbSubSourceSettings: "dvbSubSourceSettings",
      EmbeddedSourceSettings: "embeddedSourceSettings",
      Scte20SourceSettings: "scte20SourceSettings",
      Scte27SourceSettings: "scte27SourceSettings",
      TeletextSourceSettings: "teletextSourceSettings",
      SmartSubtitleSourceSettings: "smartSubtitleSourceSettings",
    }),
  ),
).annotate({
  identifier: "CaptionSelectorSettings",
}) as any as S.Schema<CaptionSelectorSettings>;
export interface CaptionSelector {
  LanguageCode?: string;
  Name?: string;
  SelectorSettings?: CaptionSelectorSettings;
}
export const CaptionSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LanguageCode: S.optional(S.String),
    Name: S.optional(S.String),
    SelectorSettings: S.optional(CaptionSelectorSettings),
  }).pipe(
    S.encodeKeys({
      LanguageCode: "languageCode",
      Name: "name",
      SelectorSettings: "selectorSettings",
    }),
  ),
).annotate({
  identifier: "CaptionSelector",
}) as any as S.Schema<CaptionSelector>;
export type __listOfCaptionSelector = CaptionSelector[];
export const __listOfCaptionSelector = /*@__PURE__*/ S.Array(CaptionSelector);
export type InputDeblockFilter = "DISABLED" | "ENABLED" | (string & {});
export const InputDeblockFilter = /*@__PURE__*/ S.String;

export type InputDenoiseFilter = "DISABLED" | "ENABLED" | (string & {});
export const InputDenoiseFilter = /*@__PURE__*/ S.String;

export type InputFilter = "AUTO" | "DISABLED" | "FORCED" | (string & {});
export const InputFilter = /*@__PURE__*/ S.String;

export type HlsScte35SourceType = "MANIFEST" | "SEGMENTS" | (string & {});
export const HlsScte35SourceType = /*@__PURE__*/ S.String;

export interface HlsInputSettings {
  Bandwidth?: number;
  BufferSegments?: number;
  Retries?: number;
  RetryInterval?: number;
  Scte35Source?: HlsScte35SourceType;
}
export const HlsInputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bandwidth: S.optional(S.Number),
    BufferSegments: S.optional(S.Number),
    Retries: S.optional(S.Number),
    RetryInterval: S.optional(S.Number),
    Scte35Source: S.optional(HlsScte35SourceType),
  }).pipe(
    S.encodeKeys({
      Bandwidth: "bandwidth",
      BufferSegments: "bufferSegments",
      Retries: "retries",
      RetryInterval: "retryInterval",
      Scte35Source: "scte35Source",
    }),
  ),
).annotate({
  identifier: "HlsInputSettings",
}) as any as S.Schema<HlsInputSettings>;
export type NetworkInputServerValidation =
  | "CHECK_CRYPTOGRAPHY_AND_VALIDATE_NAME"
  | "CHECK_CRYPTOGRAPHY_ONLY"
  | (string & {});
export const NetworkInputServerValidation = /*@__PURE__*/ S.String;

export interface MulticastInputSettings {
  SourceIpAddress?: string;
}
export const MulticastInputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceIpAddress: S.optional(S.String) }).pipe(
    S.encodeKeys({ SourceIpAddress: "sourceIpAddress" }),
  ),
).annotate({
  identifier: "MulticastInputSettings",
}) as any as S.Schema<MulticastInputSettings>;
export interface NetworkInputSettings {
  HlsInputSettings?: HlsInputSettings;
  ServerValidation?: NetworkInputServerValidation;
  MulticastInputSettings?: MulticastInputSettings;
}
export const NetworkInputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HlsInputSettings: S.optional(HlsInputSettings),
    ServerValidation: S.optional(NetworkInputServerValidation),
    MulticastInputSettings: S.optional(MulticastInputSettings),
  }).pipe(
    S.encodeKeys({
      HlsInputSettings: "hlsInputSettings",
      ServerValidation: "serverValidation",
      MulticastInputSettings: "multicastInputSettings",
    }),
  ),
).annotate({
  identifier: "NetworkInputSettings",
}) as any as S.Schema<NetworkInputSettings>;
export type __integerMin32Max8191 = number;
export type Smpte2038DataPreference = "IGNORE" | "PREFER" | (string & {});
export const Smpte2038DataPreference = /*@__PURE__*/ S.String;

export type InputSourceEndBehavior = "CONTINUE" | "LOOP" | (string & {});
export const InputSourceEndBehavior = /*@__PURE__*/ S.String;

export type VideoSelectorColorSpace =
  | "FOLLOW"
  | "HDR10"
  | "HLG_2020"
  | "REC_601"
  | "REC_709"
  | (string & {});
export const VideoSelectorColorSpace = /*@__PURE__*/ S.String;

export interface VideoSelectorColorSpaceSettings {
  Hdr10Settings?: Hdr10Settings;
}
export const VideoSelectorColorSpaceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Hdr10Settings: S.optional(Hdr10Settings) }).pipe(
    S.encodeKeys({ Hdr10Settings: "hdr10Settings" }),
  ),
).annotate({
  identifier: "VideoSelectorColorSpaceSettings",
}) as any as S.Schema<VideoSelectorColorSpaceSettings>;
export type VideoSelectorColorSpaceUsage = "FALLBACK" | "FORCE" | (string & {});
export const VideoSelectorColorSpaceUsage = /*@__PURE__*/ S.String;

export interface VideoSelectorPid {
  Pid?: number;
}
export const VideoSelectorPid = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pid: S.optional(S.Number) }).pipe(S.encodeKeys({ Pid: "pid" })),
).annotate({
  identifier: "VideoSelectorPid",
}) as any as S.Schema<VideoSelectorPid>;
export interface VideoSelectorProgramId {
  ProgramId?: number;
}
export const VideoSelectorProgramId = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProgramId: S.optional(S.Number) }).pipe(
    S.encodeKeys({ ProgramId: "programId" }),
  ),
).annotate({
  identifier: "VideoSelectorProgramId",
}) as any as S.Schema<VideoSelectorProgramId>;
export interface VideoSelectorSettings {
  VideoSelectorPid?: VideoSelectorPid;
  VideoSelectorProgramId?: VideoSelectorProgramId;
}
export const VideoSelectorSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    VideoSelectorPid: S.optional(VideoSelectorPid),
    VideoSelectorProgramId: S.optional(VideoSelectorProgramId),
  }).pipe(
    S.encodeKeys({
      VideoSelectorPid: "videoSelectorPid",
      VideoSelectorProgramId: "videoSelectorProgramId",
    }),
  ),
).annotate({
  identifier: "VideoSelectorSettings",
}) as any as S.Schema<VideoSelectorSettings>;
export interface VideoSelector {
  ColorSpace?: VideoSelectorColorSpace;
  ColorSpaceSettings?: VideoSelectorColorSpaceSettings;
  ColorSpaceUsage?: VideoSelectorColorSpaceUsage;
  SelectorSettings?: VideoSelectorSettings;
}
export const VideoSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColorSpace: S.optional(VideoSelectorColorSpace),
    ColorSpaceSettings: S.optional(VideoSelectorColorSpaceSettings),
    ColorSpaceUsage: S.optional(VideoSelectorColorSpaceUsage),
    SelectorSettings: S.optional(VideoSelectorSettings),
  }).pipe(
    S.encodeKeys({
      ColorSpace: "colorSpace",
      ColorSpaceSettings: "colorSpaceSettings",
      ColorSpaceUsage: "colorSpaceUsage",
      SelectorSettings: "selectorSettings",
    }),
  ),
).annotate({ identifier: "VideoSelector" }) as any as S.Schema<VideoSelector>;
export interface InputSettings {
  AudioSelectors?: AudioSelector[];
  CaptionSelectors?: CaptionSelector[];
  DeblockFilter?: InputDeblockFilter;
  DenoiseFilter?: InputDenoiseFilter;
  FilterStrength?: number;
  InputFilter?: InputFilter;
  NetworkInputSettings?: NetworkInputSettings;
  Scte35Pid?: number;
  Smpte2038DataPreference?: Smpte2038DataPreference;
  SourceEndBehavior?: InputSourceEndBehavior;
  VideoSelector?: VideoSelector;
}
export const InputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioSelectors: S.optional(__listOfAudioSelector),
    CaptionSelectors: S.optional(__listOfCaptionSelector),
    DeblockFilter: S.optional(InputDeblockFilter),
    DenoiseFilter: S.optional(InputDenoiseFilter),
    FilterStrength: S.optional(S.Number),
    InputFilter: S.optional(InputFilter),
    NetworkInputSettings: S.optional(NetworkInputSettings),
    Scte35Pid: S.optional(S.Number),
    Smpte2038DataPreference: S.optional(Smpte2038DataPreference),
    SourceEndBehavior: S.optional(InputSourceEndBehavior),
    VideoSelector: S.optional(VideoSelector),
  }).pipe(
    S.encodeKeys({
      AudioSelectors: "audioSelectors",
      CaptionSelectors: "captionSelectors",
      DeblockFilter: "deblockFilter",
      DenoiseFilter: "denoiseFilter",
      FilterStrength: "filterStrength",
      InputFilter: "inputFilter",
      NetworkInputSettings: "networkInputSettings",
      Scte35Pid: "scte35Pid",
      Smpte2038DataPreference: "smpte2038DataPreference",
      SourceEndBehavior: "sourceEndBehavior",
      VideoSelector: "videoSelector",
    }),
  ),
).annotate({ identifier: "InputSettings" }) as any as S.Schema<InputSettings>;
export interface InputAttachment {
  AutomaticInputFailoverSettings?: AutomaticInputFailoverSettings;
  InputAttachmentName?: string;
  InputId?: string;
  InputSettings?: InputSettings;
  LogicalInterfaceNames?: string[];
}
export const InputAttachment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomaticInputFailoverSettings: S.optional(AutomaticInputFailoverSettings),
    InputAttachmentName: S.optional(S.String),
    InputId: S.optional(S.String),
    InputSettings: S.optional(InputSettings),
    LogicalInterfaceNames: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      AutomaticInputFailoverSettings: "automaticInputFailoverSettings",
      InputAttachmentName: "inputAttachmentName",
      InputId: "inputId",
      InputSettings: "inputSettings",
      LogicalInterfaceNames: "logicalInterfaceNames",
    }),
  ),
).annotate({
  identifier: "InputAttachment",
}) as any as S.Schema<InputAttachment>;
export type __listOfInputAttachment = InputAttachment[];
export const __listOfInputAttachment = /*@__PURE__*/ S.Array(InputAttachment);
export type InputCodec = "MPEG2" | "AVC" | "HEVC" | (string & {});
export const InputCodec = /*@__PURE__*/ S.String;

export type InputMaximumBitrate =
  | "MAX_10_MBPS"
  | "MAX_20_MBPS"
  | "MAX_50_MBPS"
  | (string & {});
export const InputMaximumBitrate = /*@__PURE__*/ S.String;

export type InputResolution = "SD" | "HD" | "UHD" | (string & {});
export const InputResolution = /*@__PURE__*/ S.String;

export interface InputSpecification {
  Codec?: InputCodec;
  MaximumBitrate?: InputMaximumBitrate;
  Resolution?: InputResolution;
}
export const InputSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Codec: S.optional(InputCodec),
    MaximumBitrate: S.optional(InputMaximumBitrate),
    Resolution: S.optional(InputResolution),
  }).pipe(
    S.encodeKeys({
      Codec: "codec",
      MaximumBitrate: "maximumBitrate",
      Resolution: "resolution",
    }),
  ),
).annotate({
  identifier: "InputSpecification",
}) as any as S.Schema<InputSpecification>;
export type LogLevel =
  | "ERROR"
  | "WARNING"
  | "INFO"
  | "DEBUG"
  | "DISABLED"
  | (string & {});
export const LogLevel = /*@__PURE__*/ S.String;

export type MaintenanceDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY"
  | (string & {});
export const MaintenanceDay = /*@__PURE__*/ S.String;

export type __stringPattern010920300 = string;
export interface MaintenanceCreateSettings {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceStartTime?: string;
}
export const MaintenanceCreateSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaintenanceDay: S.optional(MaintenanceDay),
    MaintenanceStartTime: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      MaintenanceDay: "maintenanceDay",
      MaintenanceStartTime: "maintenanceStartTime",
    }),
  ),
).annotate({
  identifier: "MaintenanceCreateSettings",
}) as any as S.Schema<MaintenanceCreateSettings>;
export type Tags = { [key: string]: string | undefined };
export const Tags = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export interface VpcOutputSettings {
  PublicAddressAllocationIds?: string[];
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
}
export const VpcOutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PublicAddressAllocationIds: S.optional(__listOf__string),
    SecurityGroupIds: S.optional(__listOf__string),
    SubnetIds: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      PublicAddressAllocationIds: "publicAddressAllocationIds",
      SecurityGroupIds: "securityGroupIds",
      SubnetIds: "subnetIds",
    }),
  ),
).annotate({
  identifier: "VpcOutputSettings",
}) as any as S.Schema<VpcOutputSettings>;
export interface AnywhereSettings {
  ChannelPlacementGroupId?: string;
  ClusterId?: string;
}
export const AnywhereSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelPlacementGroupId: S.optional(S.String),
    ClusterId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ChannelPlacementGroupId: "channelPlacementGroupId",
      ClusterId: "clusterId",
    }),
  ),
).annotate({
  identifier: "AnywhereSettings",
}) as any as S.Schema<AnywhereSettings>;
export interface ChannelEngineVersionRequest {
  Version?: string;
}
export const ChannelEngineVersionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Version: S.optional(S.String) }).pipe(
    S.encodeKeys({ Version: "version" }),
  ),
).annotate({
  identifier: "ChannelEngineVersionRequest",
}) as any as S.Schema<ChannelEngineVersionRequest>;
export type LinkedChannelType =
  | "FOLLOWING_CHANNEL"
  | "PRIMARY_CHANNEL"
  | (string & {});
export const LinkedChannelType = /*@__PURE__*/ S.String;

export interface FollowerChannelSettings {
  LinkedChannelType?: LinkedChannelType;
  PrimaryChannelArn?: string;
}
export const FollowerChannelSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LinkedChannelType: S.optional(LinkedChannelType),
    PrimaryChannelArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      LinkedChannelType: "linkedChannelType",
      PrimaryChannelArn: "primaryChannelArn",
    }),
  ),
).annotate({
  identifier: "FollowerChannelSettings",
}) as any as S.Schema<FollowerChannelSettings>;
export interface PrimaryChannelSettings {
  LinkedChannelType?: LinkedChannelType;
}
export const PrimaryChannelSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LinkedChannelType: S.optional(LinkedChannelType) }).pipe(
    S.encodeKeys({ LinkedChannelType: "linkedChannelType" }),
  ),
).annotate({
  identifier: "PrimaryChannelSettings",
}) as any as S.Schema<PrimaryChannelSettings>;
export interface LinkedChannelSettings {
  FollowerChannelSettings?: FollowerChannelSettings;
  PrimaryChannelSettings?: PrimaryChannelSettings;
}
export const LinkedChannelSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FollowerChannelSettings: S.optional(FollowerChannelSettings),
    PrimaryChannelSettings: S.optional(PrimaryChannelSettings),
  }).pipe(
    S.encodeKeys({
      FollowerChannelSettings: "followerChannelSettings",
      PrimaryChannelSettings: "primaryChannelSettings",
    }),
  ),
).annotate({
  identifier: "LinkedChannelSettings",
}) as any as S.Schema<LinkedChannelSettings>;
export interface AudioFeedInput {
  AudioSelectorName?: string;
  FeedInput?: string;
}
export const AudioFeedInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioSelectorName: S.optional(S.String),
    FeedInput: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AudioSelectorName: "audioSelectorName",
      FeedInput: "feedInput",
    }),
  ),
).annotate({ identifier: "AudioFeedInput" }) as any as S.Schema<AudioFeedInput>;
export type __listOfAudioFeedInput = AudioFeedInput[];
export const __listOfAudioFeedInput = /*@__PURE__*/ S.Array(AudioFeedInput);
export interface InferenceSettings {
  FeedArn?: string;
  AudioFeedInputs?: AudioFeedInput[];
}
export const InferenceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeedArn: S.optional(S.String),
    AudioFeedInputs: S.optional(__listOfAudioFeedInput),
  }).pipe(
    S.encodeKeys({ FeedArn: "feedArn", AudioFeedInputs: "audioFeedInputs" }),
  ),
).annotate({
  identifier: "InferenceSettings",
}) as any as S.Schema<InferenceSettings>;
export interface CreateChannelRequest {
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EncoderSettings?: EncoderSettings;
  InputAttachments?: InputAttachment[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceCreateSettings;
  Name?: string;
  RequestId?: string;
  Reserved?: string;
  RoleArn?: string;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettings;
  AnywhereSettings?: AnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionRequest;
  DryRun?: boolean;
  LinkedChannelSettings?: LinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: InferenceSettings;
}
export const CreateChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CdiInputSpecification: S.optional(CdiInputSpecification),
    ChannelClass: S.optional(ChannelClass),
    Destinations: S.optional(__listOfOutputDestination),
    EncoderSettings: S.optional(EncoderSettings),
    InputAttachments: S.optional(__listOfInputAttachment),
    InputSpecification: S.optional(InputSpecification),
    LogLevel: S.optional(LogLevel),
    Maintenance: S.optional(MaintenanceCreateSettings),
    Name: S.optional(S.String),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Reserved: S.optional(S.String),
    RoleArn: S.optional(S.String),
    Tags: S.optional(Tags),
    Vpc: S.optional(VpcOutputSettings),
    AnywhereSettings: S.optional(AnywhereSettings),
    ChannelEngineVersion: S.optional(ChannelEngineVersionRequest),
    DryRun: S.optional(S.Boolean),
    LinkedChannelSettings: S.optional(LinkedChannelSettings),
    ChannelSecurityGroups: S.optional(__listOf__string),
    InferenceSettings: S.optional(InferenceSettings),
  })
    .pipe(
      S.encodeKeys({
        CdiInputSpecification: "cdiInputSpecification",
        ChannelClass: "channelClass",
        Destinations: "destinations",
        EncoderSettings: "encoderSettings",
        InputAttachments: "inputAttachments",
        InputSpecification: "inputSpecification",
        LogLevel: "logLevel",
        Maintenance: "maintenance",
        Name: "name",
        RequestId: "requestId",
        Reserved: "reserved",
        RoleArn: "roleArn",
        Tags: "tags",
        Vpc: "vpc",
        AnywhereSettings: "anywhereSettings",
        ChannelEngineVersion: "channelEngineVersion",
        DryRun: "dryRun",
        LinkedChannelSettings: "linkedChannelSettings",
        ChannelSecurityGroups: "channelSecurityGroups",
        InferenceSettings: "inferenceSettings",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/channels" }),
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
export interface ChannelEgressEndpoint {
  SourceIp?: string;
}
export const ChannelEgressEndpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceIp: S.optional(S.String) }).pipe(
    S.encodeKeys({ SourceIp: "sourceIp" }),
  ),
).annotate({
  identifier: "ChannelEgressEndpoint",
}) as any as S.Schema<ChannelEgressEndpoint>;
export type __listOfChannelEgressEndpoint = ChannelEgressEndpoint[];
export const __listOfChannelEgressEndpoint = /*@__PURE__*/ S.Array(
  ChannelEgressEndpoint,
);
export interface MaintenanceStatus {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceDeadline?: string;
  MaintenanceScheduledDate?: string;
  MaintenanceStartTime?: string;
}
export const MaintenanceStatus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaintenanceDay: S.optional(MaintenanceDay),
    MaintenanceDeadline: S.optional(S.String),
    MaintenanceScheduledDate: S.optional(S.String),
    MaintenanceStartTime: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      MaintenanceDay: "maintenanceDay",
      MaintenanceDeadline: "maintenanceDeadline",
      MaintenanceScheduledDate: "maintenanceScheduledDate",
      MaintenanceStartTime: "maintenanceStartTime",
    }),
  ),
).annotate({
  identifier: "MaintenanceStatus",
}) as any as S.Schema<MaintenanceStatus>;
export type __timestampIso8601 = Date;
export interface ChannelEngineVersionResponse {
  ExpirationDate?: Date;
  Version?: string;
}
export const ChannelEngineVersionResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExpirationDate: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Version: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ ExpirationDate: "expirationDate", Version: "version" }),
  ),
).annotate({
  identifier: "ChannelEngineVersionResponse",
}) as any as S.Schema<ChannelEngineVersionResponse>;
export interface MediaConnectRouterOutputConnection {
  RouterInputArn?: string;
}
export const MediaConnectRouterOutputConnection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RouterInputArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ RouterInputArn: "routerInputArn" }),
  ),
).annotate({
  identifier: "MediaConnectRouterOutputConnection",
}) as any as S.Schema<MediaConnectRouterOutputConnection>;
export type MediaConnectRouterOutputConnections = {
  [key: string]: MediaConnectRouterOutputConnection | undefined;
};
export const MediaConnectRouterOutputConnections = /*@__PURE__*/ S.Record(
  S.String,
  MediaConnectRouterOutputConnection.pipe(S.optional),
);
export interface PipelineDetail {
  ActiveInputAttachmentName?: string;
  ActiveInputSwitchActionName?: string;
  ActiveMotionGraphicsActionName?: string;
  ActiveMotionGraphicsUri?: string;
  PipelineId?: string;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  MediaConnectRouterOutputConnectionMap?: {
    [key: string]: MediaConnectRouterOutputConnection | undefined;
  };
}
export const PipelineDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActiveInputAttachmentName: S.optional(S.String),
    ActiveInputSwitchActionName: S.optional(S.String),
    ActiveMotionGraphicsActionName: S.optional(S.String),
    ActiveMotionGraphicsUri: S.optional(S.String),
    PipelineId: S.optional(S.String),
    ChannelEngineVersion: S.optional(ChannelEngineVersionResponse),
    MediaConnectRouterOutputConnectionMap: S.optional(
      MediaConnectRouterOutputConnections,
    ),
  }).pipe(
    S.encodeKeys({
      ActiveInputAttachmentName: "activeInputAttachmentName",
      ActiveInputSwitchActionName: "activeInputSwitchActionName",
      ActiveMotionGraphicsActionName: "activeMotionGraphicsActionName",
      ActiveMotionGraphicsUri: "activeMotionGraphicsUri",
      PipelineId: "pipelineId",
      ChannelEngineVersion: "channelEngineVersion",
      MediaConnectRouterOutputConnectionMap:
        "mediaConnectRouterOutputConnectionMap",
    }),
  ),
).annotate({ identifier: "PipelineDetail" }) as any as S.Schema<PipelineDetail>;
export type __listOfPipelineDetail = PipelineDetail[];
export const __listOfPipelineDetail = /*@__PURE__*/ S.Array(PipelineDetail);
export type ChannelState =
  | "CREATING"
  | "CREATE_FAILED"
  | "IDLE"
  | "STARTING"
  | "RUNNING"
  | "RECOVERING"
  | "STOPPING"
  | "DELETING"
  | "DELETED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | (string & {});
export const ChannelState = /*@__PURE__*/ S.String;

export interface VpcOutputSettingsDescription {
  AvailabilityZones?: string[];
  NetworkInterfaceIds?: string[];
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
}
export const VpcOutputSettingsDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZones: S.optional(__listOf__string),
    NetworkInterfaceIds: S.optional(__listOf__string),
    SecurityGroupIds: S.optional(__listOf__string),
    SubnetIds: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      AvailabilityZones: "availabilityZones",
      NetworkInterfaceIds: "networkInterfaceIds",
      SecurityGroupIds: "securityGroupIds",
      SubnetIds: "subnetIds",
    }),
  ),
).annotate({
  identifier: "VpcOutputSettingsDescription",
}) as any as S.Schema<VpcOutputSettingsDescription>;
export interface DescribeAnywhereSettings {
  ChannelPlacementGroupId?: string;
  ClusterId?: string;
}
export const DescribeAnywhereSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelPlacementGroupId: S.optional(S.String),
    ClusterId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ChannelPlacementGroupId: "channelPlacementGroupId",
      ClusterId: "clusterId",
    }),
  ),
).annotate({
  identifier: "DescribeAnywhereSettings",
}) as any as S.Schema<DescribeAnywhereSettings>;
export interface DescribeFollowerChannelSettings {
  LinkedChannelType?: LinkedChannelType;
  PrimaryChannelArn?: string;
}
export const DescribeFollowerChannelSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LinkedChannelType: S.optional(LinkedChannelType),
    PrimaryChannelArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      LinkedChannelType: "linkedChannelType",
      PrimaryChannelArn: "primaryChannelArn",
    }),
  ),
).annotate({
  identifier: "DescribeFollowerChannelSettings",
}) as any as S.Schema<DescribeFollowerChannelSettings>;
export interface DescribePrimaryChannelSettings {
  FollowingChannelArns?: string[];
  LinkedChannelType?: LinkedChannelType;
}
export const DescribePrimaryChannelSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FollowingChannelArns: S.optional(__listOf__string),
    LinkedChannelType: S.optional(LinkedChannelType),
  }).pipe(
    S.encodeKeys({
      FollowingChannelArns: "followingChannelArns",
      LinkedChannelType: "linkedChannelType",
    }),
  ),
).annotate({
  identifier: "DescribePrimaryChannelSettings",
}) as any as S.Schema<DescribePrimaryChannelSettings>;
export interface DescribeLinkedChannelSettings {
  FollowerChannelSettings?: DescribeFollowerChannelSettings;
  PrimaryChannelSettings?: DescribePrimaryChannelSettings;
}
export const DescribeLinkedChannelSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FollowerChannelSettings: S.optional(DescribeFollowerChannelSettings),
    PrimaryChannelSettings: S.optional(DescribePrimaryChannelSettings),
  }).pipe(
    S.encodeKeys({
      FollowerChannelSettings: "followerChannelSettings",
      PrimaryChannelSettings: "primaryChannelSettings",
    }),
  ),
).annotate({
  identifier: "DescribeLinkedChannelSettings",
}) as any as S.Schema<DescribeLinkedChannelSettings>;
export interface DescribeInferenceSettings {
  FeedArn?: string;
  AudioFeedInputs?: AudioFeedInput[];
}
export const DescribeInferenceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FeedArn: S.optional(S.String),
    AudioFeedInputs: S.optional(__listOfAudioFeedInput),
  }).pipe(
    S.encodeKeys({ FeedArn: "feedArn", AudioFeedInputs: "audioFeedInputs" }),
  ),
).annotate({
  identifier: "DescribeInferenceSettings",
}) as any as S.Schema<DescribeInferenceSettings>;
export interface Channel {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  EncoderSettings?: EncoderSettings;
  Id?: string;
  InputAttachments?: InputAttachment[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  Name?: string;
  PipelineDetails?: PipelineDetail[];
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export const Channel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CdiInputSpecification: S.optional(CdiInputSpecification),
    ChannelClass: S.optional(ChannelClass),
    Destinations: S.optional(__listOfOutputDestination),
    EgressEndpoints: S.optional(__listOfChannelEgressEndpoint),
    EncoderSettings: S.optional(EncoderSettings),
    Id: S.optional(S.String),
    InputAttachments: S.optional(__listOfInputAttachment),
    InputSpecification: S.optional(InputSpecification),
    LogLevel: S.optional(LogLevel),
    Maintenance: S.optional(MaintenanceStatus),
    Name: S.optional(S.String),
    PipelineDetails: S.optional(__listOfPipelineDetail),
    PipelinesRunningCount: S.optional(S.Number),
    RoleArn: S.optional(S.String),
    State: S.optional(ChannelState),
    Tags: S.optional(Tags),
    Vpc: S.optional(VpcOutputSettingsDescription),
    AnywhereSettings: S.optional(DescribeAnywhereSettings),
    ChannelEngineVersion: S.optional(ChannelEngineVersionResponse),
    LinkedChannelSettings: S.optional(DescribeLinkedChannelSettings),
    ChannelSecurityGroups: S.optional(__listOf__string),
    InferenceSettings: S.optional(DescribeInferenceSettings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CdiInputSpecification: "cdiInputSpecification",
      ChannelClass: "channelClass",
      Destinations: "destinations",
      EgressEndpoints: "egressEndpoints",
      EncoderSettings: "encoderSettings",
      Id: "id",
      InputAttachments: "inputAttachments",
      InputSpecification: "inputSpecification",
      LogLevel: "logLevel",
      Maintenance: "maintenance",
      Name: "name",
      PipelineDetails: "pipelineDetails",
      PipelinesRunningCount: "pipelinesRunningCount",
      RoleArn: "roleArn",
      State: "state",
      Tags: "tags",
      Vpc: "vpc",
      AnywhereSettings: "anywhereSettings",
      ChannelEngineVersion: "channelEngineVersion",
      LinkedChannelSettings: "linkedChannelSettings",
      ChannelSecurityGroups: "channelSecurityGroups",
      InferenceSettings: "inferenceSettings",
    }),
  ),
).annotate({ identifier: "Channel" }) as any as S.Schema<Channel>;
export interface CreateChannelResponse {
  Channel?: Channel & {
    EncoderSettings: EncoderSettings & {
      AudioDescriptions: (AudioDescription & {
        AudioSelectorName: string;
        Name: __stringMax255;
        AudioWatermarkingSettings: AudioWatermarkSettings & {
          NielsenWatermarksSettings: NielsenWatermarksSettings & {
            NielsenCbetSettings: NielsenCBET & {
              CbetCheckDigitString: __stringMin2Max2;
              CbetStepaside: NielsenWatermarksCbetStepaside;
              Csid: __stringMin1Max7;
            };
            NielsenNaesIiNwSettings: NielsenNaesIiNw & {
              CheckDigitString: __stringMin2Max2;
              Sid: __doubleMin1Max65535;
            };
          };
        };
        RemixSettings: RemixSettings & {
          ChannelMappings: (AudioChannelMapping & {
            InputChannelLevels: (InputChannelLevel & {
              Gain: __integerMinNegative60Max6;
              InputChannel: __integerMin0Max15;
            })[];
            OutputChannel: __integerMin0Max7;
          })[];
        };
      })[];
      OutputGroups: (OutputGroup & {
        OutputGroupSettings: OutputGroupSettings & {
          ArchiveGroupSettings: ArchiveGroupSettings & {
            Destination: OutputLocationRef;
          };
          FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
            Destination: OutputLocationRef;
          };
          HlsGroupSettings: HlsGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            KeyProviderSettings: KeyProviderSettings & {
              StaticKeySettings: StaticKeySettings & {
                StaticKeyValue: __stringMin32Max32;
                KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
              };
            };
          };
          MediaPackageGroupSettings: MediaPackageGroupSettings & {
            Destination: OutputLocationRef;
            MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
              CaptionLanguageMappings: (CaptionLanguageMapping & {
                CaptionChannel: __integerMin1Max4;
                LanguageCode: __stringMin3Max3;
                LanguageDescription: __stringMin1;
              })[];
              AdditionalDestinations: (MediaPackageAdditionalDestinations & {
                Destination: OutputLocationRef;
              })[];
            };
          };
          MsSmoothGroupSettings: MsSmoothGroupSettings & {
            Destination: OutputLocationRef;
          };
          CmafIngestGroupSettings: CmafIngestGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
            })[];
            AdditionalDestinations: (AdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
          };
        };
        Outputs: (Output & {
          OutputSettings: OutputSettings & {
            ArchiveOutputSettings: ArchiveOutputSettings & {
              ContainerSettings: ArchiveContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
            };
            HlsOutputSettings: HlsOutputSettings & {
              HlsSettings: HlsSettings & {
                AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                  AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
                };
                StandardHlsSettings: StandardHlsSettings & {
                  M3u8Settings: M3u8Settings;
                };
              };
            };
            MultiplexOutputSettings: MultiplexOutputSettings & {
              Destination: OutputLocationRef;
            };
            RtmpOutputSettings: RtmpOutputSettings & {
              Destination: OutputLocationRef;
            };
            UdpOutputSettings: UdpOutputSettings & {
              ContainerSettings: UdpContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
            SrtOutputSettings: SrtOutputSettings & {
              ContainerSettings: UdpContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
            MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
              ContainerSettings: MediaConnectRouterContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
          };
        })[];
      })[];
      TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
      VideoDescriptions: (VideoDescription & {
        Name: string;
        CodecSettings: VideoCodecSettings & {
          FrameCaptureSettings: FrameCaptureSettings & {
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          H264Settings: H264Settings & {
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          H265Settings: H265Settings & {
            FramerateDenominator: __integerMin1Max3003;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          Mpeg2Settings: Mpeg2Settings & {
            FramerateDenominator: __integerMin1;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          Av1Settings: Av1Settings & {
            FramerateDenominator: __integerMin1Max3003;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
        };
      })[];
      AvailBlanking: AvailBlanking & {
        AvailBlankingImage: InputLocation & { Uri: __stringMax2048 };
      };
      AvailConfiguration: AvailConfiguration & {
        AvailSettings: AvailSettings & {
          Esam: Esam & {
            AcquisitionPointId: __stringMax256;
            PoisEndpoint: __stringMax2048;
          };
        };
      };
      BlackoutSlate: BlackoutSlate & {
        BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
        NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
      };
      CaptionDescriptions: (CaptionDescription & {
        CaptionSelectorName: string;
        Name: string;
        DestinationSettings: CaptionDestinationSettings & {
          BurnInDestinationSettings: BurnInDestinationSettings & {
            Font: InputLocation & { Uri: __stringMax2048 };
          };
          DvbSubDestinationSettings: DvbSubDestinationSettings & {
            Font: InputLocation & { Uri: __stringMax2048 };
          };
        };
      })[];
      GlobalConfiguration: GlobalConfiguration & {
        InputLossBehavior: InputLossBehavior & {
          InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
        };
      };
      MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
        MotionGraphicsSettings: MotionGraphicsSettings;
      };
      ThumbnailConfiguration: ThumbnailConfiguration & {
        State: ThumbnailState;
      };
      ColorCorrectionSettings: ColorCorrectionSettings & {
        GlobalColorCorrections: (ColorCorrection & {
          InputColorSpace: ColorSpace;
          OutputColorSpace: ColorSpace;
          Uri: string;
        })[];
      };
    };
    InputAttachments: (InputAttachment & {
      AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
        SecondaryInputId: string;
        FailoverConditions: (FailoverCondition & {
          FailoverConditionSettings: FailoverConditionSettings & {
            AudioSilenceSettings: AudioSilenceFailoverSettings & {
              AudioSelectorName: string;
            };
          };
        })[];
      };
      InputSettings: InputSettings & {
        AudioSelectors: (AudioSelector & {
          Name: __stringMin1;
          SelectorSettings: AudioSelectorSettings & {
            AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
              GroupId: __stringMin1;
              Name: __stringMin1;
            };
            AudioLanguageSelection: AudioLanguageSelection & {
              LanguageCode: string;
            };
            AudioPidSelection: AudioPidSelection & {
              Pid: __integerMin0Max8191;
              Pids: (AudioPid & {
                Pid: __integerMin0Max8191;
                DolbyEDecode: AudioDolbyEDecode & {
                  ProgramSelection: DolbyEProgramSelection;
                };
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
            };
            AudioTrackSelection: AudioTrackSelection & {
              Tracks: (AudioTrack & {
                Track: __integerMin1;
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
            };
          };
        })[];
        CaptionSelectors: (CaptionSelector & {
          Name: __stringMin1;
          SelectorSettings: CaptionSelectorSettings & {
            TeletextSourceSettings: TeletextSourceSettings & {
              OutputRectangle: CaptionRectangle & {
                Height: __doubleMin0Max100;
                LeftOffset: __doubleMin0Max100;
                TopOffset: __doubleMin0Max100;
                Width: __doubleMin0Max100;
              };
            };
          };
        })[];
      };
    })[];
  };
}
export const CreateChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Channel: S.optional(Channel) }).pipe(
    S.encodeKeys({ Channel: "channel" }),
  ),
).annotate({
  identifier: "CreateChannelResponse",
}) as any as S.Schema<CreateChannelResponse>;
export interface CreateChannelPlacementGroupRequest {
  ClusterId: string;
  Name?: string;
  Nodes?: string[];
  RequestId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateChannelPlacementGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    Name: S.optional(S.String),
    Nodes: S.optional(__listOf__string),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Nodes: "nodes",
        RequestId: "requestId",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/prod/clusters/{ClusterId}/channelplacementgroups",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateChannelPlacementGroupRequest",
}) as any as S.Schema<CreateChannelPlacementGroupRequest>;
export type ChannelPlacementGroupState =
  | "UNASSIGNED"
  | "ASSIGNING"
  | "ASSIGNED"
  | "DELETING"
  | "DELETE_FAILED"
  | "DELETED"
  | "UNASSIGNING"
  | (string & {});
export const ChannelPlacementGroupState = /*@__PURE__*/ S.String;

export interface CreateChannelPlacementGroupResponse {
  Arn?: string;
  Channels?: string[];
  ClusterId?: string;
  Id?: string;
  Name?: string;
  Nodes?: string[];
  State?: ChannelPlacementGroupState;
}
export const CreateChannelPlacementGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Channels: S.optional(__listOf__string),
    ClusterId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Nodes: S.optional(__listOf__string),
    State: S.optional(ChannelPlacementGroupState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Channels: "channels",
      ClusterId: "clusterId",
      Id: "id",
      Name: "name",
      Nodes: "nodes",
      State: "state",
    }),
  ),
).annotate({
  identifier: "CreateChannelPlacementGroupResponse",
}) as any as S.Schema<CreateChannelPlacementGroupResponse>;
export type CloudWatchAlarmTemplateComparisonOperator =
  | "GreaterThanOrEqualToThreshold"
  | "GreaterThanThreshold"
  | "LessThanThreshold"
  | "LessThanOrEqualToThreshold"
  | (string & {});
export const CloudWatchAlarmTemplateComparisonOperator = /*@__PURE__*/ S.String;

export type __stringMin0Max1024 = string;
export type __stringPatternS = string;
export type __stringMax64 = string;
export type __stringMin1Max255PatternS = string;
export type __integerMin10Max86400 = number;
export type CloudWatchAlarmTemplateStatistic =
  | "SampleCount"
  | "Average"
  | "Sum"
  | "Minimum"
  | "Maximum"
  | (string & {});
export const CloudWatchAlarmTemplateStatistic = /*@__PURE__*/ S.String;

export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export type CloudWatchAlarmTemplateTargetResourceType =
  | "CLOUDFRONT_DISTRIBUTION"
  | "MEDIALIVE_MULTIPLEX"
  | "MEDIALIVE_CHANNEL"
  | "MEDIALIVE_INPUT_DEVICE"
  | "MEDIAPACKAGE_CHANNEL"
  | "MEDIAPACKAGE_ORIGIN_ENDPOINT"
  | "MEDIACONNECT_FLOW"
  | "S3_BUCKET"
  | "MEDIATAILOR_PLAYBACK_CONFIGURATION"
  | (string & {});
export const CloudWatchAlarmTemplateTargetResourceType = /*@__PURE__*/ S.String;

export type CloudWatchAlarmTemplateTreatMissingData =
  | "notBreaching"
  | "breaching"
  | "ignore"
  | "missing"
  | (string & {});
export const CloudWatchAlarmTemplateTreatMissingData = /*@__PURE__*/ S.String;

export type __stringMin1Max256PatternS = string;
export interface CreateCloudWatchAlarmTemplateRequest {
  ComparisonOperator?: CloudWatchAlarmTemplateComparisonOperator;
  DatapointsToAlarm?: number;
  Description?: string;
  EvaluationPeriods?: number;
  GroupIdentifier?: string;
  MetricName?: string;
  Name?: string;
  Period?: number;
  Statistic?: CloudWatchAlarmTemplateStatistic;
  Tags?: { [key: string]: string | undefined };
  TargetResourceType?: CloudWatchAlarmTemplateTargetResourceType;
  Threshold?: number;
  TreatMissingData?: CloudWatchAlarmTemplateTreatMissingData;
  RequestId?: string;
}
export const CreateCloudWatchAlarmTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ComparisonOperator: S.optional(CloudWatchAlarmTemplateComparisonOperator),
      DatapointsToAlarm: S.optional(S.Number),
      Description: S.optional(S.String),
      EvaluationPeriods: S.optional(S.Number),
      GroupIdentifier: S.optional(S.String),
      MetricName: S.optional(S.String),
      Name: S.optional(S.String),
      Period: S.optional(S.Number),
      Statistic: S.optional(CloudWatchAlarmTemplateStatistic),
      Tags: S.optional(TagMap),
      TargetResourceType: S.optional(CloudWatchAlarmTemplateTargetResourceType),
      Threshold: S.optional(S.Number),
      TreatMissingData: S.optional(CloudWatchAlarmTemplateTreatMissingData),
      RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    })
      .pipe(
        S.encodeKeys({
          ComparisonOperator: "comparisonOperator",
          DatapointsToAlarm: "datapointsToAlarm",
          Description: "description",
          EvaluationPeriods: "evaluationPeriods",
          GroupIdentifier: "groupIdentifier",
          MetricName: "metricName",
          Name: "name",
          Period: "period",
          Statistic: "statistic",
          Tags: "tags",
          TargetResourceType: "targetResourceType",
          Threshold: "threshold",
          TreatMissingData: "treatMissingData",
          RequestId: "requestId",
        }),
      )
      .pipe(
        T.all(
          T.Http({ method: "POST", uri: "/prod/cloudwatch-alarm-templates" }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "CreateCloudWatchAlarmTemplateRequest",
}) as any as S.Schema<CreateCloudWatchAlarmTemplateRequest>;
export type __stringPatternArnMedialiveCloudwatchAlarmTemplate = string;
export type __stringMin7Max11PatternAws097 = string;
export interface CreateCloudWatchAlarmTemplateResponse {
  Arn?: string;
  ComparisonOperator?: CloudWatchAlarmTemplateComparisonOperator;
  CreatedAt?: Date;
  DatapointsToAlarm?: number;
  Description?: string;
  EvaluationPeriods?: number;
  GroupId?: string;
  Id?: string;
  MetricName?: string;
  ModifiedAt?: Date;
  Name?: string;
  Period?: number;
  Statistic?: CloudWatchAlarmTemplateStatistic;
  Tags?: { [key: string]: string | undefined };
  TargetResourceType?: CloudWatchAlarmTemplateTargetResourceType;
  Threshold?: number;
  TreatMissingData?: CloudWatchAlarmTemplateTreatMissingData;
}
export const CreateCloudWatchAlarmTemplateResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      ComparisonOperator: S.optional(CloudWatchAlarmTemplateComparisonOperator),
      CreatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      DatapointsToAlarm: S.optional(S.Number),
      Description: S.optional(S.String),
      EvaluationPeriods: S.optional(S.Number),
      GroupId: S.optional(S.String),
      Id: S.optional(S.String),
      MetricName: S.optional(S.String),
      ModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Name: S.optional(S.String),
      Period: S.optional(S.Number),
      Statistic: S.optional(CloudWatchAlarmTemplateStatistic),
      Tags: S.optional(TagMap),
      TargetResourceType: S.optional(CloudWatchAlarmTemplateTargetResourceType),
      Threshold: S.optional(S.Number),
      TreatMissingData: S.optional(CloudWatchAlarmTemplateTreatMissingData),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        ComparisonOperator: "comparisonOperator",
        CreatedAt: "createdAt",
        DatapointsToAlarm: "datapointsToAlarm",
        Description: "description",
        EvaluationPeriods: "evaluationPeriods",
        GroupId: "groupId",
        Id: "id",
        MetricName: "metricName",
        ModifiedAt: "modifiedAt",
        Name: "name",
        Period: "period",
        Statistic: "statistic",
        Tags: "tags",
        TargetResourceType: "targetResourceType",
        Threshold: "threshold",
        TreatMissingData: "treatMissingData",
      }),
    ),
).annotate({
  identifier: "CreateCloudWatchAlarmTemplateResponse",
}) as any as S.Schema<CreateCloudWatchAlarmTemplateResponse>;
export interface CreateCloudWatchAlarmTemplateGroupRequest {
  Description?: string;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
  RequestId?: string;
}
export const CreateCloudWatchAlarmTemplateGroupRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Description: S.optional(S.String),
      Name: S.optional(S.String),
      Tags: S.optional(TagMap),
      RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    })
      .pipe(
        S.encodeKeys({
          Description: "description",
          Name: "name",
          Tags: "tags",
          RequestId: "requestId",
        }),
      )
      .pipe(
        T.all(
          T.Http({
            method: "POST",
            uri: "/prod/cloudwatch-alarm-template-groups",
          }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
  ).annotate({
    identifier: "CreateCloudWatchAlarmTemplateGroupRequest",
  }) as any as S.Schema<CreateCloudWatchAlarmTemplateGroupRequest>;
export type __stringPatternArnMedialiveCloudwatchAlarmTemplateGroup = string;
export interface CreateCloudWatchAlarmTemplateGroupResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateCloudWatchAlarmTemplateGroupResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Arn: S.optional(S.String),
      CreatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Description: S.optional(S.String),
      Id: S.optional(S.String),
      ModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Name: S.optional(S.String),
      Tags: S.optional(TagMap),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        CreatedAt: "createdAt",
        Description: "description",
        Id: "id",
        ModifiedAt: "modifiedAt",
        Name: "name",
        Tags: "tags",
      }),
    ),
  ).annotate({
    identifier: "CreateCloudWatchAlarmTemplateGroupResponse",
  }) as any as S.Schema<CreateCloudWatchAlarmTemplateGroupResponse>;
export type ClusterType = "ON_PREMISES" | (string & {});
export const ClusterType = /*@__PURE__*/ S.String;

export interface InterfaceMappingCreateRequest {
  LogicalInterfaceName?: string;
  NetworkId?: string;
}
export const InterfaceMappingCreateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogicalInterfaceName: S.optional(S.String),
    NetworkId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      LogicalInterfaceName: "logicalInterfaceName",
      NetworkId: "networkId",
    }),
  ),
).annotate({
  identifier: "InterfaceMappingCreateRequest",
}) as any as S.Schema<InterfaceMappingCreateRequest>;
export type __listOfInterfaceMappingCreateRequest =
  InterfaceMappingCreateRequest[];
export const __listOfInterfaceMappingCreateRequest = /*@__PURE__*/ S.Array(
  InterfaceMappingCreateRequest,
);
export interface ClusterNetworkSettingsCreateRequest {
  DefaultRoute?: string;
  InterfaceMappings?: InterfaceMappingCreateRequest[];
}
export const ClusterNetworkSettingsCreateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultRoute: S.optional(S.String),
    InterfaceMappings: S.optional(__listOfInterfaceMappingCreateRequest),
  }).pipe(
    S.encodeKeys({
      DefaultRoute: "defaultRoute",
      InterfaceMappings: "interfaceMappings",
    }),
  ),
).annotate({
  identifier: "ClusterNetworkSettingsCreateRequest",
}) as any as S.Schema<ClusterNetworkSettingsCreateRequest>;
export interface CreateClusterRequest {
  ClusterType?: ClusterType;
  InstanceRoleArn?: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettingsCreateRequest;
  RequestId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterType: S.optional(ClusterType),
    InstanceRoleArn: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkSettings: S.optional(ClusterNetworkSettingsCreateRequest),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        ClusterType: "clusterType",
        InstanceRoleArn: "instanceRoleArn",
        Name: "name",
        NetworkSettings: "networkSettings",
        RequestId: "requestId",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/clusters" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateClusterRequest",
}) as any as S.Schema<CreateClusterRequest>;
export interface InterfaceMapping {
  LogicalInterfaceName?: string;
  NetworkId?: string;
}
export const InterfaceMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogicalInterfaceName: S.optional(S.String),
    NetworkId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      LogicalInterfaceName: "logicalInterfaceName",
      NetworkId: "networkId",
    }),
  ),
).annotate({
  identifier: "InterfaceMapping",
}) as any as S.Schema<InterfaceMapping>;
export type __listOfInterfaceMapping = InterfaceMapping[];
export const __listOfInterfaceMapping = /*@__PURE__*/ S.Array(InterfaceMapping);
export interface ClusterNetworkSettings {
  DefaultRoute?: string;
  InterfaceMappings?: InterfaceMapping[];
}
export const ClusterNetworkSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultRoute: S.optional(S.String),
    InterfaceMappings: S.optional(__listOfInterfaceMapping),
  }).pipe(
    S.encodeKeys({
      DefaultRoute: "defaultRoute",
      InterfaceMappings: "interfaceMappings",
    }),
  ),
).annotate({
  identifier: "ClusterNetworkSettings",
}) as any as S.Schema<ClusterNetworkSettings>;
export type ClusterState =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETING"
  | "DELETE_FAILED"
  | "DELETED"
  | (string & {});
export const ClusterState = /*@__PURE__*/ S.String;

export interface CreateClusterResponse {
  Arn?: string;
  ChannelIds?: string[];
  ClusterType?: ClusterType;
  Id?: string;
  InstanceRoleArn?: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettings;
  State?: ClusterState;
}
export const CreateClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelIds: S.optional(__listOf__string),
    ClusterType: S.optional(ClusterType),
    Id: S.optional(S.String),
    InstanceRoleArn: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkSettings: S.optional(ClusterNetworkSettings),
    State: S.optional(ClusterState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ChannelIds: "channelIds",
      ClusterType: "clusterType",
      Id: "id",
      InstanceRoleArn: "instanceRoleArn",
      Name: "name",
      NetworkSettings: "networkSettings",
      State: "state",
    }),
  ),
).annotate({
  identifier: "CreateClusterResponse",
}) as any as S.Schema<CreateClusterResponse>;
export type __stringMin1Max2048PatternArn = string;
export interface EventBridgeRuleTemplateTarget {
  Arn?: string;
}
export const EventBridgeRuleTemplateTarget = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) }).pipe(S.encodeKeys({ Arn: "arn" })),
).annotate({
  identifier: "EventBridgeRuleTemplateTarget",
}) as any as S.Schema<EventBridgeRuleTemplateTarget>;
export type __listOfEventBridgeRuleTemplateTarget =
  EventBridgeRuleTemplateTarget[];
export const __listOfEventBridgeRuleTemplateTarget = /*@__PURE__*/ S.Array(
  EventBridgeRuleTemplateTarget,
);
export type EventBridgeRuleTemplateEventType =
  | "MEDIALIVE_MULTIPLEX_ALERT"
  | "MEDIALIVE_MULTIPLEX_STATE_CHANGE"
  | "MEDIALIVE_CHANNEL_ALERT"
  | "MEDIALIVE_CHANNEL_INPUT_CHANGE"
  | "MEDIALIVE_CHANNEL_STATE_CHANGE"
  | "MEDIAPACKAGE_INPUT_NOTIFICATION"
  | "MEDIAPACKAGE_KEY_PROVIDER_NOTIFICATION"
  | "MEDIAPACKAGE_HARVEST_JOB_NOTIFICATION"
  | "SIGNAL_MAP_ACTIVE_ALARM"
  | "MEDIACONNECT_ALERT"
  | "MEDIACONNECT_SOURCE_HEALTH"
  | "MEDIACONNECT_OUTPUT_HEALTH"
  | "MEDIACONNECT_FLOW_STATUS_CHANGE"
  | (string & {});
export const EventBridgeRuleTemplateEventType = /*@__PURE__*/ S.String;

export interface CreateEventBridgeRuleTemplateRequest {
  Description?: string;
  EventTargets?: EventBridgeRuleTemplateTarget[];
  EventType?: EventBridgeRuleTemplateEventType;
  GroupIdentifier?: string;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
  RequestId?: string;
}
export const CreateEventBridgeRuleTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Description: S.optional(S.String),
      EventTargets: S.optional(__listOfEventBridgeRuleTemplateTarget),
      EventType: S.optional(EventBridgeRuleTemplateEventType),
      GroupIdentifier: S.optional(S.String),
      Name: S.optional(S.String),
      Tags: S.optional(TagMap),
      RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    })
      .pipe(
        S.encodeKeys({
          Description: "description",
          EventTargets: "eventTargets",
          EventType: "eventType",
          GroupIdentifier: "groupIdentifier",
          Name: "name",
          Tags: "tags",
          RequestId: "requestId",
        }),
      )
      .pipe(
        T.all(
          T.Http({ method: "POST", uri: "/prod/eventbridge-rule-templates" }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "CreateEventBridgeRuleTemplateRequest",
}) as any as S.Schema<CreateEventBridgeRuleTemplateRequest>;
export type __stringPatternArnMedialiveEventbridgeRuleTemplate = string;
export interface CreateEventBridgeRuleTemplateResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  EventTargets?: (EventBridgeRuleTemplateTarget & {
    Arn: __stringMin1Max2048PatternArn;
  })[];
  EventType?: EventBridgeRuleTemplateEventType;
  GroupId?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateEventBridgeRuleTemplateResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Description: S.optional(S.String),
      EventTargets: S.optional(__listOfEventBridgeRuleTemplateTarget),
      EventType: S.optional(EventBridgeRuleTemplateEventType),
      GroupId: S.optional(S.String),
      Id: S.optional(S.String),
      ModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Name: S.optional(S.String),
      Tags: S.optional(TagMap),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        CreatedAt: "createdAt",
        Description: "description",
        EventTargets: "eventTargets",
        EventType: "eventType",
        GroupId: "groupId",
        Id: "id",
        ModifiedAt: "modifiedAt",
        Name: "name",
        Tags: "tags",
      }),
    ),
).annotate({
  identifier: "CreateEventBridgeRuleTemplateResponse",
}) as any as S.Schema<CreateEventBridgeRuleTemplateResponse>;
export interface CreateEventBridgeRuleTemplateGroupRequest {
  Description?: string;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
  RequestId?: string;
}
export const CreateEventBridgeRuleTemplateGroupRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Description: S.optional(S.String),
      Name: S.optional(S.String),
      Tags: S.optional(TagMap),
      RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    })
      .pipe(
        S.encodeKeys({
          Description: "description",
          Name: "name",
          Tags: "tags",
          RequestId: "requestId",
        }),
      )
      .pipe(
        T.all(
          T.Http({
            method: "POST",
            uri: "/prod/eventbridge-rule-template-groups",
          }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
  ).annotate({
    identifier: "CreateEventBridgeRuleTemplateGroupRequest",
  }) as any as S.Schema<CreateEventBridgeRuleTemplateGroupRequest>;
export type __stringPatternArnMedialiveEventbridgeRuleTemplateGroup = string;
export interface CreateEventBridgeRuleTemplateGroupResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateEventBridgeRuleTemplateGroupResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Arn: S.optional(S.String),
      CreatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Description: S.optional(S.String),
      Id: S.optional(S.String),
      ModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Name: S.optional(S.String),
      Tags: S.optional(TagMap),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        CreatedAt: "createdAt",
        Description: "description",
        Id: "id",
        ModifiedAt: "modifiedAt",
        Name: "name",
        Tags: "tags",
      }),
    ),
  ).annotate({
    identifier: "CreateEventBridgeRuleTemplateGroupResponse",
  }) as any as S.Schema<CreateEventBridgeRuleTemplateGroupResponse>;
export interface InputRequestDestinationRoute {
  Cidr?: string;
  Gateway?: string;
}
export const InputRequestDestinationRoute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.optional(S.String), Gateway: S.optional(S.String) }).pipe(
    S.encodeKeys({ Cidr: "cidr", Gateway: "gateway" }),
  ),
).annotate({
  identifier: "InputRequestDestinationRoute",
}) as any as S.Schema<InputRequestDestinationRoute>;
export type __listOfInputRequestDestinationRoute =
  InputRequestDestinationRoute[];
export const __listOfInputRequestDestinationRoute = /*@__PURE__*/ S.Array(
  InputRequestDestinationRoute,
);
export interface InputDestinationRequest {
  StreamName?: string;
  Network?: string;
  NetworkRoutes?: InputRequestDestinationRoute[];
  StaticIpAddress?: string;
}
export const InputDestinationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamName: S.optional(S.String),
    Network: S.optional(S.String),
    NetworkRoutes: S.optional(__listOfInputRequestDestinationRoute),
    StaticIpAddress: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      StreamName: "streamName",
      Network: "network",
      NetworkRoutes: "networkRoutes",
      StaticIpAddress: "staticIpAddress",
    }),
  ),
).annotate({
  identifier: "InputDestinationRequest",
}) as any as S.Schema<InputDestinationRequest>;
export type __listOfInputDestinationRequest = InputDestinationRequest[];
export const __listOfInputDestinationRequest = /*@__PURE__*/ S.Array(
  InputDestinationRequest,
);
export interface InputDeviceSettings {
  Id?: string;
}
export const InputDeviceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }).pipe(S.encodeKeys({ Id: "id" })),
).annotate({
  identifier: "InputDeviceSettings",
}) as any as S.Schema<InputDeviceSettings>;
export type __listOfInputDeviceSettings = InputDeviceSettings[];
export const __listOfInputDeviceSettings =
  /*@__PURE__*/ S.Array(InputDeviceSettings);
export interface MediaConnectFlowRequest {
  FlowArn?: string;
}
export const MediaConnectFlowRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ FlowArn: "flowArn" }),
  ),
).annotate({
  identifier: "MediaConnectFlowRequest",
}) as any as S.Schema<MediaConnectFlowRequest>;
export type __listOfMediaConnectFlowRequest = MediaConnectFlowRequest[];
export const __listOfMediaConnectFlowRequest = /*@__PURE__*/ S.Array(
  MediaConnectFlowRequest,
);
export interface InputSourceRequest {
  PasswordParam?: string;
  Url?: string;
  Username?: string;
}
export const InputSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PasswordParam: S.optional(S.String),
    Url: S.optional(S.String),
    Username: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      PasswordParam: "passwordParam",
      Url: "url",
      Username: "username",
    }),
  ),
).annotate({
  identifier: "InputSourceRequest",
}) as any as S.Schema<InputSourceRequest>;
export type __listOfInputSourceRequest = InputSourceRequest[];
export const __listOfInputSourceRequest =
  /*@__PURE__*/ S.Array(InputSourceRequest);
export type InputType =
  | "UDP_PUSH"
  | "RTP_PUSH"
  | "RTMP_PUSH"
  | "RTMP_PULL"
  | "URL_PULL"
  | "MP4_FILE"
  | "MEDIACONNECT"
  | "INPUT_DEVICE"
  | "AWS_CDI"
  | "TS_FILE"
  | "SRT_CALLER"
  | "MULTICAST"
  | "SMPTE_2110_RECEIVER_GROUP"
  | "SDI"
  | "MEDIACONNECT_ROUTER"
  | "SRT_LISTENER"
  | (string & {});
export const InputType = /*@__PURE__*/ S.String;

export interface InputVpcRequest {
  SecurityGroupIds?: string[];
  SubnetIds?: string[];
}
export const InputVpcRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SecurityGroupIds: S.optional(__listOf__string),
    SubnetIds: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      SecurityGroupIds: "securityGroupIds",
      SubnetIds: "subnetIds",
    }),
  ),
).annotate({
  identifier: "InputVpcRequest",
}) as any as S.Schema<InputVpcRequest>;
export type Algorithm = "AES128" | "AES192" | "AES256" | (string & {});
export const Algorithm = /*@__PURE__*/ S.String;

export interface SrtCallerDecryptionRequest {
  Algorithm?: Algorithm;
  PassphraseSecretArn?: string;
}
export const SrtCallerDecryptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(Algorithm),
    PassphraseSecretArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Algorithm: "algorithm",
      PassphraseSecretArn: "passphraseSecretArn",
    }),
  ),
).annotate({
  identifier: "SrtCallerDecryptionRequest",
}) as any as S.Schema<SrtCallerDecryptionRequest>;
export interface SrtCallerSourceRequest {
  Decryption?: SrtCallerDecryptionRequest;
  MinimumLatency?: number;
  SrtListenerAddress?: string;
  SrtListenerPort?: string;
  StreamId?: string;
}
export const SrtCallerSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Decryption: S.optional(SrtCallerDecryptionRequest),
    MinimumLatency: S.optional(S.Number),
    SrtListenerAddress: S.optional(S.String),
    SrtListenerPort: S.optional(S.String),
    StreamId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Decryption: "decryption",
      MinimumLatency: "minimumLatency",
      SrtListenerAddress: "srtListenerAddress",
      SrtListenerPort: "srtListenerPort",
      StreamId: "streamId",
    }),
  ),
).annotate({
  identifier: "SrtCallerSourceRequest",
}) as any as S.Schema<SrtCallerSourceRequest>;
export type __listOfSrtCallerSourceRequest = SrtCallerSourceRequest[];
export const __listOfSrtCallerSourceRequest = /*@__PURE__*/ S.Array(
  SrtCallerSourceRequest,
);
export interface SrtListenerDecryptionRequest {
  Algorithm?: Algorithm;
  PassphraseSecretArn?: string;
}
export const SrtListenerDecryptionRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(Algorithm),
    PassphraseSecretArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Algorithm: "algorithm",
      PassphraseSecretArn: "passphraseSecretArn",
    }),
  ),
).annotate({
  identifier: "SrtListenerDecryptionRequest",
}) as any as S.Schema<SrtListenerDecryptionRequest>;
export interface SrtListenerSettingsRequest {
  Decryption?: SrtListenerDecryptionRequest;
  MinimumLatency?: number;
  StreamId?: string;
}
export const SrtListenerSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Decryption: S.optional(SrtListenerDecryptionRequest),
    MinimumLatency: S.optional(S.Number),
    StreamId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Decryption: "decryption",
      MinimumLatency: "minimumLatency",
      StreamId: "streamId",
    }),
  ),
).annotate({
  identifier: "SrtListenerSettingsRequest",
}) as any as S.Schema<SrtListenerSettingsRequest>;
export interface SrtSettingsRequest {
  SrtCallerSources?: SrtCallerSourceRequest[];
  SrtListenerSettings?: SrtListenerSettingsRequest;
}
export const SrtSettingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SrtCallerSources: S.optional(__listOfSrtCallerSourceRequest),
    SrtListenerSettings: S.optional(SrtListenerSettingsRequest),
  }).pipe(
    S.encodeKeys({
      SrtCallerSources: "srtCallerSources",
      SrtListenerSettings: "srtListenerSettings",
    }),
  ),
).annotate({
  identifier: "SrtSettingsRequest",
}) as any as S.Schema<SrtSettingsRequest>;
export type InputNetworkLocation = "AWS" | "ON_PREMISES" | (string & {});
export const InputNetworkLocation = /*@__PURE__*/ S.String;

export interface MulticastSourceCreateRequest {
  SourceIp?: string;
  Url?: string;
}
export const MulticastSourceCreateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceIp: S.optional(S.String), Url: S.optional(S.String) }).pipe(
    S.encodeKeys({ SourceIp: "sourceIp", Url: "url" }),
  ),
).annotate({
  identifier: "MulticastSourceCreateRequest",
}) as any as S.Schema<MulticastSourceCreateRequest>;
export type __listOfMulticastSourceCreateRequest =
  MulticastSourceCreateRequest[];
export const __listOfMulticastSourceCreateRequest = /*@__PURE__*/ S.Array(
  MulticastSourceCreateRequest,
);
export interface MulticastSettingsCreateRequest {
  Sources?: MulticastSourceCreateRequest[];
}
export const MulticastSettingsCreateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Sources: S.optional(__listOfMulticastSourceCreateRequest) }).pipe(
    S.encodeKeys({ Sources: "sources" }),
  ),
).annotate({
  identifier: "MulticastSettingsCreateRequest",
}) as any as S.Schema<MulticastSettingsCreateRequest>;
export interface InputSdpLocation {
  MediaIndex?: number;
  SdpUrl?: string;
}
export const InputSdpLocation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaIndex: S.optional(S.Number),
    SdpUrl: S.optional(S.String),
  }).pipe(S.encodeKeys({ MediaIndex: "mediaIndex", SdpUrl: "sdpUrl" })),
).annotate({
  identifier: "InputSdpLocation",
}) as any as S.Schema<InputSdpLocation>;
export type __listOfInputSdpLocation = InputSdpLocation[];
export const __listOfInputSdpLocation = /*@__PURE__*/ S.Array(InputSdpLocation);
export interface Smpte2110ReceiverGroupSdpSettings {
  AncillarySdps?: InputSdpLocation[];
  AudioSdps?: InputSdpLocation[];
  VideoSdp?: InputSdpLocation;
}
export const Smpte2110ReceiverGroupSdpSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AncillarySdps: S.optional(__listOfInputSdpLocation),
    AudioSdps: S.optional(__listOfInputSdpLocation),
    VideoSdp: S.optional(InputSdpLocation),
  }).pipe(
    S.encodeKeys({
      AncillarySdps: "ancillarySdps",
      AudioSdps: "audioSdps",
      VideoSdp: "videoSdp",
    }),
  ),
).annotate({
  identifier: "Smpte2110ReceiverGroupSdpSettings",
}) as any as S.Schema<Smpte2110ReceiverGroupSdpSettings>;
export interface Smpte2110ReceiverGroup {
  SdpSettings?: Smpte2110ReceiverGroupSdpSettings;
}
export const Smpte2110ReceiverGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SdpSettings: S.optional(Smpte2110ReceiverGroupSdpSettings) }).pipe(
    S.encodeKeys({ SdpSettings: "sdpSettings" }),
  ),
).annotate({
  identifier: "Smpte2110ReceiverGroup",
}) as any as S.Schema<Smpte2110ReceiverGroup>;
export type __listOfSmpte2110ReceiverGroup = Smpte2110ReceiverGroup[];
export const __listOfSmpte2110ReceiverGroup = /*@__PURE__*/ S.Array(
  Smpte2110ReceiverGroup,
);
export interface Smpte2110ReceiverGroupSettings {
  Smpte2110ReceiverGroups?: Smpte2110ReceiverGroup[];
}
export const Smpte2110ReceiverGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Smpte2110ReceiverGroups: S.optional(__listOfSmpte2110ReceiverGroup),
  }).pipe(S.encodeKeys({ Smpte2110ReceiverGroups: "smpte2110ReceiverGroups" })),
).annotate({
  identifier: "Smpte2110ReceiverGroupSettings",
}) as any as S.Schema<Smpte2110ReceiverGroupSettings>;
export type InputSdiSources = string[];
export const InputSdiSources = /*@__PURE__*/ S.Array(S.String);
export interface RouterDestinationSettings {
  AvailabilityZoneName?: string;
}
export const RouterDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AvailabilityZoneName: S.optional(S.String) }).pipe(
    S.encodeKeys({ AvailabilityZoneName: "availabilityZoneName" }),
  ),
).annotate({
  identifier: "RouterDestinationSettings",
}) as any as S.Schema<RouterDestinationSettings>;
export type __listOfRouterDestinationSettings = RouterDestinationSettings[];
export const __listOfRouterDestinationSettings = /*@__PURE__*/ S.Array(
  RouterDestinationSettings,
);
export type RouterEncryptionType =
  | "AUTOMATIC"
  | "SECRETS_MANAGER"
  | (string & {});
export const RouterEncryptionType = /*@__PURE__*/ S.String;

export interface RouterSettings {
  Destinations?: RouterDestinationSettings[];
  EncryptionType?: RouterEncryptionType;
  SecretArn?: string;
}
export const RouterSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destinations: S.optional(__listOfRouterDestinationSettings),
    EncryptionType: S.optional(RouterEncryptionType),
    SecretArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Destinations: "destinations",
      EncryptionType: "encryptionType",
      SecretArn: "secretArn",
    }),
  ),
).annotate({ identifier: "RouterSettings" }) as any as S.Schema<RouterSettings>;
export interface CreateInputRequest {
  Destinations?: InputDestinationRequest[];
  InputDevices?: InputDeviceSettings[];
  InputSecurityGroups?: string[];
  MediaConnectFlows?: MediaConnectFlowRequest[];
  Name?: string;
  RequestId?: string;
  RoleArn?: string;
  Sources?: InputSourceRequest[];
  Tags?: { [key: string]: string | undefined };
  Type?: InputType;
  Vpc?: InputVpcRequest;
  SrtSettings?: SrtSettingsRequest;
  InputNetworkLocation?: InputNetworkLocation;
  MulticastSettings?: MulticastSettingsCreateRequest;
  Smpte2110ReceiverGroupSettings?: Smpte2110ReceiverGroupSettings;
  SdiSources?: string[];
  RouterSettings?: RouterSettings;
}
export const CreateInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destinations: S.optional(__listOfInputDestinationRequest),
    InputDevices: S.optional(__listOfInputDeviceSettings),
    InputSecurityGroups: S.optional(__listOf__string),
    MediaConnectFlows: S.optional(__listOfMediaConnectFlowRequest),
    Name: S.optional(S.String),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    RoleArn: S.optional(S.String),
    Sources: S.optional(__listOfInputSourceRequest),
    Tags: S.optional(Tags),
    Type: S.optional(InputType),
    Vpc: S.optional(InputVpcRequest),
    SrtSettings: S.optional(SrtSettingsRequest),
    InputNetworkLocation: S.optional(InputNetworkLocation),
    MulticastSettings: S.optional(MulticastSettingsCreateRequest),
    Smpte2110ReceiverGroupSettings: S.optional(Smpte2110ReceiverGroupSettings),
    SdiSources: S.optional(InputSdiSources),
    RouterSettings: S.optional(RouterSettings),
  })
    .pipe(
      S.encodeKeys({
        Destinations: "destinations",
        InputDevices: "inputDevices",
        InputSecurityGroups: "inputSecurityGroups",
        MediaConnectFlows: "mediaConnectFlows",
        Name: "name",
        RequestId: "requestId",
        RoleArn: "roleArn",
        Sources: "sources",
        Tags: "tags",
        Type: "type",
        Vpc: "vpc",
        SrtSettings: "srtSettings",
        InputNetworkLocation: "inputNetworkLocation",
        MulticastSettings: "multicastSettings",
        Smpte2110ReceiverGroupSettings: "smpte2110ReceiverGroupSettings",
        SdiSources: "sdiSources",
        RouterSettings: "routerSettings",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/inputs" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateInputRequest",
}) as any as S.Schema<CreateInputRequest>;
export interface InputDestinationVpc {
  AvailabilityZone?: string;
  NetworkInterfaceId?: string;
}
export const InputDestinationVpc = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZone: S.optional(S.String),
    NetworkInterfaceId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AvailabilityZone: "availabilityZone",
      NetworkInterfaceId: "networkInterfaceId",
    }),
  ),
).annotate({
  identifier: "InputDestinationVpc",
}) as any as S.Schema<InputDestinationVpc>;
export interface InputDestinationRoute {
  Cidr?: string;
  Gateway?: string;
}
export const InputDestinationRoute = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.optional(S.String), Gateway: S.optional(S.String) }).pipe(
    S.encodeKeys({ Cidr: "cidr", Gateway: "gateway" }),
  ),
).annotate({
  identifier: "InputDestinationRoute",
}) as any as S.Schema<InputDestinationRoute>;
export type __listOfInputDestinationRoute = InputDestinationRoute[];
export const __listOfInputDestinationRoute = /*@__PURE__*/ S.Array(
  InputDestinationRoute,
);
export interface InputDestination {
  Ip?: string;
  Port?: string;
  Url?: string;
  Vpc?: InputDestinationVpc;
  Network?: string;
  NetworkRoutes?: InputDestinationRoute[];
}
export const InputDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Ip: S.optional(S.String),
    Port: S.optional(S.String),
    Url: S.optional(S.String),
    Vpc: S.optional(InputDestinationVpc),
    Network: S.optional(S.String),
    NetworkRoutes: S.optional(__listOfInputDestinationRoute),
  }).pipe(
    S.encodeKeys({
      Ip: "ip",
      Port: "port",
      Url: "url",
      Vpc: "vpc",
      Network: "network",
      NetworkRoutes: "networkRoutes",
    }),
  ),
).annotate({
  identifier: "InputDestination",
}) as any as S.Schema<InputDestination>;
export type __listOfInputDestination = InputDestination[];
export const __listOfInputDestination = /*@__PURE__*/ S.Array(InputDestination);
export type InputClass = "STANDARD" | "SINGLE_PIPELINE" | (string & {});
export const InputClass = /*@__PURE__*/ S.String;

export type InputSourceType = "STATIC" | "DYNAMIC" | (string & {});
export const InputSourceType = /*@__PURE__*/ S.String;

export interface MediaConnectFlow {
  FlowArn?: string;
}
export const MediaConnectFlow = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FlowArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ FlowArn: "flowArn" }),
  ),
).annotate({
  identifier: "MediaConnectFlow",
}) as any as S.Schema<MediaConnectFlow>;
export type __listOfMediaConnectFlow = MediaConnectFlow[];
export const __listOfMediaConnectFlow = /*@__PURE__*/ S.Array(MediaConnectFlow);
export interface InputSource {
  PasswordParam?: string;
  Url?: string;
  Username?: string;
}
export const InputSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PasswordParam: S.optional(S.String),
    Url: S.optional(S.String),
    Username: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      PasswordParam: "passwordParam",
      Url: "url",
      Username: "username",
    }),
  ),
).annotate({ identifier: "InputSource" }) as any as S.Schema<InputSource>;
export type __listOfInputSource = InputSource[];
export const __listOfInputSource = /*@__PURE__*/ S.Array(InputSource);
export type InputState =
  | "CREATING"
  | "DETACHED"
  | "ATTACHED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const InputState = /*@__PURE__*/ S.String;

export interface SrtCallerDecryption {
  Algorithm?: Algorithm;
  PassphraseSecretArn?: string;
}
export const SrtCallerDecryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(Algorithm),
    PassphraseSecretArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Algorithm: "algorithm",
      PassphraseSecretArn: "passphraseSecretArn",
    }),
  ),
).annotate({
  identifier: "SrtCallerDecryption",
}) as any as S.Schema<SrtCallerDecryption>;
export interface SrtCallerSource {
  Decryption?: SrtCallerDecryption;
  MinimumLatency?: number;
  SrtListenerAddress?: string;
  SrtListenerPort?: string;
  StreamId?: string;
}
export const SrtCallerSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Decryption: S.optional(SrtCallerDecryption),
    MinimumLatency: S.optional(S.Number),
    SrtListenerAddress: S.optional(S.String),
    SrtListenerPort: S.optional(S.String),
    StreamId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Decryption: "decryption",
      MinimumLatency: "minimumLatency",
      SrtListenerAddress: "srtListenerAddress",
      SrtListenerPort: "srtListenerPort",
      StreamId: "streamId",
    }),
  ),
).annotate({
  identifier: "SrtCallerSource",
}) as any as S.Schema<SrtCallerSource>;
export type __listOfSrtCallerSource = SrtCallerSource[];
export const __listOfSrtCallerSource = /*@__PURE__*/ S.Array(SrtCallerSource);
export interface SrtListenerDecryption {
  Algorithm?: Algorithm;
  PassphraseSecretArn?: string;
}
export const SrtListenerDecryption = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(Algorithm),
    PassphraseSecretArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Algorithm: "algorithm",
      PassphraseSecretArn: "passphraseSecretArn",
    }),
  ),
).annotate({
  identifier: "SrtListenerDecryption",
}) as any as S.Schema<SrtListenerDecryption>;
export interface SrtListenerSettings {
  Decryption?: SrtListenerDecryption;
  MinimumLatency?: number;
  StreamId?: string;
}
export const SrtListenerSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Decryption: S.optional(SrtListenerDecryption),
    MinimumLatency: S.optional(S.Number),
    StreamId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Decryption: "decryption",
      MinimumLatency: "minimumLatency",
      StreamId: "streamId",
    }),
  ),
).annotate({
  identifier: "SrtListenerSettings",
}) as any as S.Schema<SrtListenerSettings>;
export interface SrtSettings {
  SrtCallerSources?: SrtCallerSource[];
  SrtListenerSettings?: SrtListenerSettings;
}
export const SrtSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SrtCallerSources: S.optional(__listOfSrtCallerSource),
    SrtListenerSettings: S.optional(SrtListenerSettings),
  }).pipe(
    S.encodeKeys({
      SrtCallerSources: "srtCallerSources",
      SrtListenerSettings: "srtListenerSettings",
    }),
  ),
).annotate({ identifier: "SrtSettings" }) as any as S.Schema<SrtSettings>;
export interface MulticastSource {
  SourceIp?: string;
  Url?: string;
}
export const MulticastSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceIp: S.optional(S.String), Url: S.optional(S.String) }).pipe(
    S.encodeKeys({ SourceIp: "sourceIp", Url: "url" }),
  ),
).annotate({
  identifier: "MulticastSource",
}) as any as S.Schema<MulticastSource>;
export type __listOfMulticastSource = MulticastSource[];
export const __listOfMulticastSource = /*@__PURE__*/ S.Array(MulticastSource);
export interface MulticastSettings {
  Sources?: MulticastSource[];
}
export const MulticastSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Sources: S.optional(__listOfMulticastSource) }).pipe(
    S.encodeKeys({ Sources: "sources" }),
  ),
).annotate({
  identifier: "MulticastSettings",
}) as any as S.Schema<MulticastSettings>;
export interface RouterDestination {
  AvailabilityZoneName?: string;
  RouterOutputArn?: string;
}
export const RouterDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZoneName: S.optional(S.String),
    RouterOutputArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AvailabilityZoneName: "availabilityZoneName",
      RouterOutputArn: "routerOutputArn",
    }),
  ),
).annotate({
  identifier: "RouterDestination",
}) as any as S.Schema<RouterDestination>;
export type __listOfRouterDestination = RouterDestination[];
export const __listOfRouterDestination =
  /*@__PURE__*/ S.Array(RouterDestination);
export interface RouterInputSettings {
  Destinations?: RouterDestination[];
  EncryptionType?: RouterEncryptionType;
  SecretArn?: string;
}
export const RouterInputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destinations: S.optional(__listOfRouterDestination),
    EncryptionType: S.optional(RouterEncryptionType),
    SecretArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Destinations: "destinations",
      EncryptionType: "encryptionType",
      SecretArn: "secretArn",
    }),
  ),
).annotate({
  identifier: "RouterInputSettings",
}) as any as S.Schema<RouterInputSettings>;
export interface Input {
  Arn?: string;
  AttachedChannels?: string[];
  Destinations?: InputDestination[];
  Id?: string;
  InputClass?: InputClass;
  InputDevices?: InputDeviceSettings[];
  InputPartnerIds?: string[];
  InputSourceType?: InputSourceType;
  MediaConnectFlows?: MediaConnectFlow[];
  Name?: string;
  RoleArn?: string;
  SecurityGroups?: string[];
  Sources?: InputSource[];
  State?: InputState;
  Tags?: { [key: string]: string | undefined };
  Type?: InputType;
  SrtSettings?: SrtSettings;
  InputNetworkLocation?: InputNetworkLocation;
  MulticastSettings?: MulticastSettings;
  Smpte2110ReceiverGroupSettings?: Smpte2110ReceiverGroupSettings;
  SdiSources?: string[];
  RouterSettings?: RouterInputSettings;
}
export const Input = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AttachedChannels: S.optional(__listOf__string),
    Destinations: S.optional(__listOfInputDestination),
    Id: S.optional(S.String),
    InputClass: S.optional(InputClass),
    InputDevices: S.optional(__listOfInputDeviceSettings),
    InputPartnerIds: S.optional(__listOf__string),
    InputSourceType: S.optional(InputSourceType),
    MediaConnectFlows: S.optional(__listOfMediaConnectFlow),
    Name: S.optional(S.String),
    RoleArn: S.optional(S.String),
    SecurityGroups: S.optional(__listOf__string),
    Sources: S.optional(__listOfInputSource),
    State: S.optional(InputState),
    Tags: S.optional(Tags),
    Type: S.optional(InputType),
    SrtSettings: S.optional(SrtSettings),
    InputNetworkLocation: S.optional(InputNetworkLocation),
    MulticastSettings: S.optional(MulticastSettings),
    Smpte2110ReceiverGroupSettings: S.optional(Smpte2110ReceiverGroupSettings),
    SdiSources: S.optional(InputSdiSources),
    RouterSettings: S.optional(RouterInputSettings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AttachedChannels: "attachedChannels",
      Destinations: "destinations",
      Id: "id",
      InputClass: "inputClass",
      InputDevices: "inputDevices",
      InputPartnerIds: "inputPartnerIds",
      InputSourceType: "inputSourceType",
      MediaConnectFlows: "mediaConnectFlows",
      Name: "name",
      RoleArn: "roleArn",
      SecurityGroups: "securityGroups",
      Sources: "sources",
      State: "state",
      Tags: "tags",
      Type: "type",
      SrtSettings: "srtSettings",
      InputNetworkLocation: "inputNetworkLocation",
      MulticastSettings: "multicastSettings",
      Smpte2110ReceiverGroupSettings: "smpte2110ReceiverGroupSettings",
      SdiSources: "sdiSources",
      RouterSettings: "routerSettings",
    }),
  ),
).annotate({ identifier: "Input" }) as any as S.Schema<Input>;
export interface CreateInputResponse {
  Input?: Input & {
    SrtSettings: SrtSettings & {
      SrtListenerSettings: SrtListenerSettings & {
        Decryption: SrtListenerDecryption & {
          Algorithm: Algorithm;
          PassphraseSecretArn: string;
        };
      };
    };
    MulticastSettings: MulticastSettings & {
      Sources: (MulticastSource & { Url: string })[];
    };
  };
}
export const CreateInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Input: S.optional(Input) }).pipe(S.encodeKeys({ Input: "input" })),
).annotate({
  identifier: "CreateInputResponse",
}) as any as S.Schema<CreateInputResponse>;
export interface InputWhitelistRuleCidr {
  Cidr?: string;
}
export const InputWhitelistRuleCidr = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.optional(S.String) }).pipe(S.encodeKeys({ Cidr: "cidr" })),
).annotate({
  identifier: "InputWhitelistRuleCidr",
}) as any as S.Schema<InputWhitelistRuleCidr>;
export type __listOfInputWhitelistRuleCidr = InputWhitelistRuleCidr[];
export const __listOfInputWhitelistRuleCidr = /*@__PURE__*/ S.Array(
  InputWhitelistRuleCidr,
);
export interface CreateInputSecurityGroupRequest {
  Tags?: { [key: string]: string | undefined };
  WhitelistRules?: InputWhitelistRuleCidr[];
}
export const CreateInputSecurityGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Tags: S.optional(Tags),
    WhitelistRules: S.optional(__listOfInputWhitelistRuleCidr),
  })
    .pipe(S.encodeKeys({ Tags: "tags", WhitelistRules: "whitelistRules" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/inputSecurityGroups" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateInputSecurityGroupRequest",
}) as any as S.Schema<CreateInputSecurityGroupRequest>;
export type InputSecurityGroupState =
  | "IDLE"
  | "IN_USE"
  | "UPDATING"
  | "DELETED"
  | (string & {});
export const InputSecurityGroupState = /*@__PURE__*/ S.String;

export interface InputWhitelistRule {
  Cidr?: string;
}
export const InputWhitelistRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.optional(S.String) }).pipe(S.encodeKeys({ Cidr: "cidr" })),
).annotate({
  identifier: "InputWhitelistRule",
}) as any as S.Schema<InputWhitelistRule>;
export type __listOfInputWhitelistRule = InputWhitelistRule[];
export const __listOfInputWhitelistRule =
  /*@__PURE__*/ S.Array(InputWhitelistRule);
export interface InputSecurityGroup {
  Arn?: string;
  Id?: string;
  Inputs?: string[];
  State?: InputSecurityGroupState;
  Tags?: { [key: string]: string | undefined };
  WhitelistRules?: InputWhitelistRule[];
  Channels?: string[];
}
export const InputSecurityGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Inputs: S.optional(__listOf__string),
    State: S.optional(InputSecurityGroupState),
    Tags: S.optional(Tags),
    WhitelistRules: S.optional(__listOfInputWhitelistRule),
    Channels: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Id: "id",
      Inputs: "inputs",
      State: "state",
      Tags: "tags",
      WhitelistRules: "whitelistRules",
      Channels: "channels",
    }),
  ),
).annotate({
  identifier: "InputSecurityGroup",
}) as any as S.Schema<InputSecurityGroup>;
export interface CreateInputSecurityGroupResponse {
  SecurityGroup?: InputSecurityGroup;
}
export const CreateInputSecurityGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecurityGroup: S.optional(InputSecurityGroup) }).pipe(
    S.encodeKeys({ SecurityGroup: "securityGroup" }),
  ),
).annotate({
  identifier: "CreateInputSecurityGroupResponse",
}) as any as S.Schema<CreateInputSecurityGroupResponse>;
export type __integerMin800Max3000 = number;
export type __integerMin1000000Max100000000 = number;
export type __integerMin0Max100000000 = number;
export interface MultiplexSettings {
  MaximumVideoBufferDelayMilliseconds?: number;
  TransportStreamBitrate?: number;
  TransportStreamId?: number;
  TransportStreamReservedBitrate?: number;
}
export const MultiplexSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaximumVideoBufferDelayMilliseconds: S.optional(S.Number),
    TransportStreamBitrate: S.optional(S.Number),
    TransportStreamId: S.optional(S.Number),
    TransportStreamReservedBitrate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      MaximumVideoBufferDelayMilliseconds:
        "maximumVideoBufferDelayMilliseconds",
      TransportStreamBitrate: "transportStreamBitrate",
      TransportStreamId: "transportStreamId",
      TransportStreamReservedBitrate: "transportStreamReservedBitrate",
    }),
  ),
).annotate({
  identifier: "MultiplexSettings",
}) as any as S.Schema<MultiplexSettings>;
export interface CreateMultiplexRequest {
  AvailabilityZones?: string[];
  MultiplexSettings?: MultiplexSettings;
  Name?: string;
  RequestId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateMultiplexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvailabilityZones: S.optional(__listOf__string),
    MultiplexSettings: S.optional(MultiplexSettings),
    Name: S.optional(S.String),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        AvailabilityZones: "availabilityZones",
        MultiplexSettings: "multiplexSettings",
        Name: "name",
        RequestId: "requestId",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/multiplexes" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateMultiplexRequest",
}) as any as S.Schema<CreateMultiplexRequest>;
export interface MultiplexMediaConnectOutputDestinationSettings {
  EntitlementArn?: string;
}
export const MultiplexMediaConnectOutputDestinationSettings =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ EntitlementArn: S.optional(S.String) }).pipe(
      S.encodeKeys({ EntitlementArn: "entitlementArn" }),
    ),
  ).annotate({
    identifier: "MultiplexMediaConnectOutputDestinationSettings",
  }) as any as S.Schema<MultiplexMediaConnectOutputDestinationSettings>;
export interface MultiplexOutputDestination {
  MediaConnectSettings?: MultiplexMediaConnectOutputDestinationSettings;
}
export const MultiplexOutputDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MediaConnectSettings: S.optional(
      MultiplexMediaConnectOutputDestinationSettings,
    ),
  }).pipe(S.encodeKeys({ MediaConnectSettings: "mediaConnectSettings" })),
).annotate({
  identifier: "MultiplexOutputDestination",
}) as any as S.Schema<MultiplexOutputDestination>;
export type __listOfMultiplexOutputDestination = MultiplexOutputDestination[];
export const __listOfMultiplexOutputDestination = /*@__PURE__*/ S.Array(
  MultiplexOutputDestination,
);
export type MultiplexState =
  | "CREATING"
  | "CREATE_FAILED"
  | "IDLE"
  | "STARTING"
  | "RUNNING"
  | "RECOVERING"
  | "STOPPING"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const MultiplexState = /*@__PURE__*/ S.String;

export interface Multiplex {
  Arn?: string;
  AvailabilityZones?: string[];
  Destinations?: MultiplexOutputDestination[];
  Id?: string;
  MultiplexSettings?: MultiplexSettings;
  Name?: string;
  PipelinesRunningCount?: number;
  ProgramCount?: number;
  State?: MultiplexState;
  Tags?: { [key: string]: string | undefined };
}
export const Multiplex = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AvailabilityZones: S.optional(__listOf__string),
    Destinations: S.optional(__listOfMultiplexOutputDestination),
    Id: S.optional(S.String),
    MultiplexSettings: S.optional(MultiplexSettings),
    Name: S.optional(S.String),
    PipelinesRunningCount: S.optional(S.Number),
    ProgramCount: S.optional(S.Number),
    State: S.optional(MultiplexState),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AvailabilityZones: "availabilityZones",
      Destinations: "destinations",
      Id: "id",
      MultiplexSettings: "multiplexSettings",
      Name: "name",
      PipelinesRunningCount: "pipelinesRunningCount",
      ProgramCount: "programCount",
      State: "state",
      Tags: "tags",
    }),
  ),
).annotate({ identifier: "Multiplex" }) as any as S.Schema<Multiplex>;
export interface CreateMultiplexResponse {
  Multiplex?: Multiplex & {
    MultiplexSettings: MultiplexSettings & {
      TransportStreamBitrate: __integerMin1000000Max100000000;
      TransportStreamId: __integerMin0Max65535;
    };
  };
}
export const CreateMultiplexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Multiplex: S.optional(Multiplex) }).pipe(
    S.encodeKeys({ Multiplex: "multiplex" }),
  ),
).annotate({
  identifier: "CreateMultiplexResponse",
}) as any as S.Schema<CreateMultiplexResponse>;
export type PreferredChannelPipeline =
  | "CURRENTLY_ACTIVE"
  | "PIPELINE_0"
  | "PIPELINE_1"
  | (string & {});
export const PreferredChannelPipeline = /*@__PURE__*/ S.String;

export interface MultiplexProgramServiceDescriptor {
  ProviderName?: string;
  ServiceName?: string;
}
export const MultiplexProgramServiceDescriptor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ProviderName: S.optional(S.String),
    ServiceName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ ProviderName: "providerName", ServiceName: "serviceName" }),
  ),
).annotate({
  identifier: "MultiplexProgramServiceDescriptor",
}) as any as S.Schema<MultiplexProgramServiceDescriptor>;
export type __integerMin100000Max100000000 = number;
export type __integerMinNegative5Max5 = number;
export interface MultiplexStatmuxVideoSettings {
  MaximumBitrate?: number;
  MinimumBitrate?: number;
  Priority?: number;
}
export const MultiplexStatmuxVideoSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaximumBitrate: S.optional(S.Number),
    MinimumBitrate: S.optional(S.Number),
    Priority: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      MaximumBitrate: "maximumBitrate",
      MinimumBitrate: "minimumBitrate",
      Priority: "priority",
    }),
  ),
).annotate({
  identifier: "MultiplexStatmuxVideoSettings",
}) as any as S.Schema<MultiplexStatmuxVideoSettings>;
export interface MultiplexVideoSettings {
  ConstantBitrate?: number;
  StatmuxSettings?: MultiplexStatmuxVideoSettings;
}
export const MultiplexVideoSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConstantBitrate: S.optional(S.Number),
    StatmuxSettings: S.optional(MultiplexStatmuxVideoSettings),
  }).pipe(
    S.encodeKeys({
      ConstantBitrate: "constantBitrate",
      StatmuxSettings: "statmuxSettings",
    }),
  ),
).annotate({
  identifier: "MultiplexVideoSettings",
}) as any as S.Schema<MultiplexVideoSettings>;
export interface MultiplexProgramSettings {
  PreferredChannelPipeline?: PreferredChannelPipeline;
  ProgramNumber?: number;
  ServiceDescriptor?: MultiplexProgramServiceDescriptor;
  VideoSettings?: MultiplexVideoSettings;
}
export const MultiplexProgramSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PreferredChannelPipeline: S.optional(PreferredChannelPipeline),
    ProgramNumber: S.optional(S.Number),
    ServiceDescriptor: S.optional(MultiplexProgramServiceDescriptor),
    VideoSettings: S.optional(MultiplexVideoSettings),
  }).pipe(
    S.encodeKeys({
      PreferredChannelPipeline: "preferredChannelPipeline",
      ProgramNumber: "programNumber",
      ServiceDescriptor: "serviceDescriptor",
      VideoSettings: "videoSettings",
    }),
  ),
).annotate({
  identifier: "MultiplexProgramSettings",
}) as any as S.Schema<MultiplexProgramSettings>;
export interface CreateMultiplexProgramRequest {
  MultiplexId: string;
  MultiplexProgramSettings?: MultiplexProgramSettings;
  ProgramName?: string;
  RequestId?: string;
}
export const CreateMultiplexProgramRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
    MultiplexProgramSettings: S.optional(MultiplexProgramSettings),
    ProgramName: S.optional(S.String),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
  })
    .pipe(
      S.encodeKeys({
        MultiplexProgramSettings: "multiplexProgramSettings",
        ProgramName: "programName",
        RequestId: "requestId",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/prod/multiplexes/{MultiplexId}/programs",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateMultiplexProgramRequest",
}) as any as S.Schema<CreateMultiplexProgramRequest>;
export type __listOf__integer = number[];
export const __listOf__integer = /*@__PURE__*/ S.Array(S.Number);
export interface MultiplexProgramPacketIdentifiersMap {
  AudioPids?: number[];
  DvbSubPids?: number[];
  DvbTeletextPid?: number;
  EtvPlatformPid?: number;
  EtvSignalPid?: number;
  KlvDataPids?: number[];
  PcrPid?: number;
  PmtPid?: number;
  PrivateMetadataPid?: number;
  Scte27Pids?: number[];
  Scte35Pid?: number;
  TimedMetadataPid?: number;
  VideoPid?: number;
  AribCaptionsPid?: number;
  DvbTeletextPids?: number[];
  EcmPid?: number;
  Smpte2038Pid?: number;
}
export const MultiplexProgramPacketIdentifiersMap = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      AudioPids: S.optional(__listOf__integer),
      DvbSubPids: S.optional(__listOf__integer),
      DvbTeletextPid: S.optional(S.Number),
      EtvPlatformPid: S.optional(S.Number),
      EtvSignalPid: S.optional(S.Number),
      KlvDataPids: S.optional(__listOf__integer),
      PcrPid: S.optional(S.Number),
      PmtPid: S.optional(S.Number),
      PrivateMetadataPid: S.optional(S.Number),
      Scte27Pids: S.optional(__listOf__integer),
      Scte35Pid: S.optional(S.Number),
      TimedMetadataPid: S.optional(S.Number),
      VideoPid: S.optional(S.Number),
      AribCaptionsPid: S.optional(S.Number),
      DvbTeletextPids: S.optional(__listOf__integer),
      EcmPid: S.optional(S.Number),
      Smpte2038Pid: S.optional(S.Number),
    }).pipe(
      S.encodeKeys({
        AudioPids: "audioPids",
        DvbSubPids: "dvbSubPids",
        DvbTeletextPid: "dvbTeletextPid",
        EtvPlatformPid: "etvPlatformPid",
        EtvSignalPid: "etvSignalPid",
        KlvDataPids: "klvDataPids",
        PcrPid: "pcrPid",
        PmtPid: "pmtPid",
        PrivateMetadataPid: "privateMetadataPid",
        Scte27Pids: "scte27Pids",
        Scte35Pid: "scte35Pid",
        TimedMetadataPid: "timedMetadataPid",
        VideoPid: "videoPid",
        AribCaptionsPid: "aribCaptionsPid",
        DvbTeletextPids: "dvbTeletextPids",
        EcmPid: "ecmPid",
        Smpte2038Pid: "smpte2038Pid",
      }),
    ),
).annotate({
  identifier: "MultiplexProgramPacketIdentifiersMap",
}) as any as S.Schema<MultiplexProgramPacketIdentifiersMap>;
export interface MultiplexProgramPipelineDetail {
  ActiveChannelPipeline?: string;
  PipelineId?: string;
}
export const MultiplexProgramPipelineDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActiveChannelPipeline: S.optional(S.String),
    PipelineId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ActiveChannelPipeline: "activeChannelPipeline",
      PipelineId: "pipelineId",
    }),
  ),
).annotate({
  identifier: "MultiplexProgramPipelineDetail",
}) as any as S.Schema<MultiplexProgramPipelineDetail>;
export type __listOfMultiplexProgramPipelineDetail =
  MultiplexProgramPipelineDetail[];
export const __listOfMultiplexProgramPipelineDetail = /*@__PURE__*/ S.Array(
  MultiplexProgramPipelineDetail,
);
export interface MultiplexProgram {
  ChannelId?: string;
  MultiplexProgramSettings?: MultiplexProgramSettings;
  PacketIdentifiersMap?: MultiplexProgramPacketIdentifiersMap;
  PipelineDetails?: MultiplexProgramPipelineDetail[];
  ProgramName?: string;
}
export const MultiplexProgram = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.optional(S.String),
    MultiplexProgramSettings: S.optional(MultiplexProgramSettings),
    PacketIdentifiersMap: S.optional(MultiplexProgramPacketIdentifiersMap),
    PipelineDetails: S.optional(__listOfMultiplexProgramPipelineDetail),
    ProgramName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ChannelId: "channelId",
      MultiplexProgramSettings: "multiplexProgramSettings",
      PacketIdentifiersMap: "packetIdentifiersMap",
      PipelineDetails: "pipelineDetails",
      ProgramName: "programName",
    }),
  ),
).annotate({
  identifier: "MultiplexProgram",
}) as any as S.Schema<MultiplexProgram>;
export interface CreateMultiplexProgramResponse {
  MultiplexProgram?: MultiplexProgram & {
    MultiplexProgramSettings: MultiplexProgramSettings & {
      ProgramNumber: __integerMin0Max65535;
      ServiceDescriptor: MultiplexProgramServiceDescriptor & {
        ProviderName: __stringMax256;
        ServiceName: __stringMax256;
      };
    };
  };
}
export const CreateMultiplexProgramResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MultiplexProgram: S.optional(MultiplexProgram) }).pipe(
    S.encodeKeys({ MultiplexProgram: "multiplexProgram" }),
  ),
).annotate({
  identifier: "CreateMultiplexProgramResponse",
}) as any as S.Schema<CreateMultiplexProgramResponse>;
export interface IpPoolCreateRequest {
  Cidr?: string;
}
export const IpPoolCreateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.optional(S.String) }).pipe(S.encodeKeys({ Cidr: "cidr" })),
).annotate({
  identifier: "IpPoolCreateRequest",
}) as any as S.Schema<IpPoolCreateRequest>;
export type __listOfIpPoolCreateRequest = IpPoolCreateRequest[];
export const __listOfIpPoolCreateRequest =
  /*@__PURE__*/ S.Array(IpPoolCreateRequest);
export interface RouteCreateRequest {
  Cidr?: string;
  Gateway?: string;
}
export const RouteCreateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.optional(S.String), Gateway: S.optional(S.String) }).pipe(
    S.encodeKeys({ Cidr: "cidr", Gateway: "gateway" }),
  ),
).annotate({
  identifier: "RouteCreateRequest",
}) as any as S.Schema<RouteCreateRequest>;
export type __listOfRouteCreateRequest = RouteCreateRequest[];
export const __listOfRouteCreateRequest =
  /*@__PURE__*/ S.Array(RouteCreateRequest);
export interface CreateNetworkRequest {
  IpPools?: IpPoolCreateRequest[];
  Name?: string;
  RequestId?: string;
  Routes?: RouteCreateRequest[];
  Tags?: { [key: string]: string | undefined };
}
export const CreateNetworkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpPools: S.optional(__listOfIpPoolCreateRequest),
    Name: S.optional(S.String),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Routes: S.optional(__listOfRouteCreateRequest),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        IpPools: "ipPools",
        Name: "name",
        RequestId: "requestId",
        Routes: "routes",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/networks" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateNetworkRequest",
}) as any as S.Schema<CreateNetworkRequest>;
export interface IpPool {
  Cidr?: string;
}
export const IpPool = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.optional(S.String) }).pipe(S.encodeKeys({ Cidr: "cidr" })),
).annotate({ identifier: "IpPool" }) as any as S.Schema<IpPool>;
export type __listOfIpPool = IpPool[];
export const __listOfIpPool = /*@__PURE__*/ S.Array(IpPool);
export interface Route {
  Cidr?: string;
  Gateway?: string;
}
export const Route = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.optional(S.String), Gateway: S.optional(S.String) }).pipe(
    S.encodeKeys({ Cidr: "cidr", Gateway: "gateway" }),
  ),
).annotate({ identifier: "Route" }) as any as S.Schema<Route>;
export type __listOfRoute = Route[];
export const __listOfRoute = /*@__PURE__*/ S.Array(Route);
export type NetworkState =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DELETING"
  | "IDLE"
  | "IN_USE"
  | "UPDATING"
  | "DELETE_FAILED"
  | "DELETED"
  | (string & {});
export const NetworkState = /*@__PURE__*/ S.String;

export interface CreateNetworkResponse {
  Arn?: string;
  AssociatedClusterIds?: string[];
  Id?: string;
  IpPools?: IpPool[];
  Name?: string;
  Routes?: Route[];
  State?: NetworkState;
}
export const CreateNetworkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssociatedClusterIds: S.optional(__listOf__string),
    Id: S.optional(S.String),
    IpPools: S.optional(__listOfIpPool),
    Name: S.optional(S.String),
    Routes: S.optional(__listOfRoute),
    State: S.optional(NetworkState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AssociatedClusterIds: "associatedClusterIds",
      Id: "id",
      IpPools: "ipPools",
      Name: "name",
      Routes: "routes",
      State: "state",
    }),
  ),
).annotate({
  identifier: "CreateNetworkResponse",
}) as any as S.Schema<CreateNetworkResponse>;
export type NetworkInterfaceMode = "NAT" | "BRIDGE" | (string & {});
export const NetworkInterfaceMode = /*@__PURE__*/ S.String;

export interface NodeInterfaceMappingCreateRequest {
  LogicalInterfaceName?: string;
  NetworkInterfaceMode?: NetworkInterfaceMode;
  PhysicalInterfaceName?: string;
}
export const NodeInterfaceMappingCreateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogicalInterfaceName: S.optional(S.String),
    NetworkInterfaceMode: S.optional(NetworkInterfaceMode),
    PhysicalInterfaceName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      LogicalInterfaceName: "logicalInterfaceName",
      NetworkInterfaceMode: "networkInterfaceMode",
      PhysicalInterfaceName: "physicalInterfaceName",
    }),
  ),
).annotate({
  identifier: "NodeInterfaceMappingCreateRequest",
}) as any as S.Schema<NodeInterfaceMappingCreateRequest>;
export type __listOfNodeInterfaceMappingCreateRequest =
  NodeInterfaceMappingCreateRequest[];
export const __listOfNodeInterfaceMappingCreateRequest = /*@__PURE__*/ S.Array(
  NodeInterfaceMappingCreateRequest,
);
export type NodeRole = "BACKUP" | "ACTIVE" | (string & {});
export const NodeRole = /*@__PURE__*/ S.String;

export interface CreateNodeRequest {
  ClusterId: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMappingCreateRequest[];
  RequestId?: string;
  Role?: NodeRole;
  Tags?: { [key: string]: string | undefined };
}
export const CreateNodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    Name: S.optional(S.String),
    NodeInterfaceMappings: S.optional(
      __listOfNodeInterfaceMappingCreateRequest,
    ),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Role: S.optional(NodeRole),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        NodeInterfaceMappings: "nodeInterfaceMappings",
        RequestId: "requestId",
        Role: "role",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/clusters/{ClusterId}/nodes" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateNodeRequest",
}) as any as S.Schema<CreateNodeRequest>;
export type NodeConnectionState = "CONNECTED" | "DISCONNECTED" | (string & {});
export const NodeConnectionState = /*@__PURE__*/ S.String;

export interface NodeInterfaceMapping {
  LogicalInterfaceName?: string;
  NetworkInterfaceMode?: NetworkInterfaceMode;
  PhysicalInterfaceName?: string;
  PhysicalInterfaceIpAddresses?: string[];
}
export const NodeInterfaceMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogicalInterfaceName: S.optional(S.String),
    NetworkInterfaceMode: S.optional(NetworkInterfaceMode),
    PhysicalInterfaceName: S.optional(S.String),
    PhysicalInterfaceIpAddresses: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      LogicalInterfaceName: "logicalInterfaceName",
      NetworkInterfaceMode: "networkInterfaceMode",
      PhysicalInterfaceName: "physicalInterfaceName",
      PhysicalInterfaceIpAddresses: "physicalInterfaceIpAddresses",
    }),
  ),
).annotate({
  identifier: "NodeInterfaceMapping",
}) as any as S.Schema<NodeInterfaceMapping>;
export type __listOfNodeInterfaceMapping = NodeInterfaceMapping[];
export const __listOfNodeInterfaceMapping =
  /*@__PURE__*/ S.Array(NodeInterfaceMapping);
export type NodeState =
  | "CREATED"
  | "REGISTERING"
  | "READY_TO_ACTIVATE"
  | "REGISTRATION_FAILED"
  | "ACTIVATION_FAILED"
  | "ACTIVE"
  | "READY"
  | "IN_USE"
  | "DEREGISTERING"
  | "DRAINING"
  | "DEREGISTRATION_FAILED"
  | "DEREGISTERED"
  | (string & {});
export const NodeState = /*@__PURE__*/ S.String;

export interface SdiSourceMapping {
  CardNumber?: number;
  ChannelNumber?: number;
  SdiSource?: string;
}
export const SdiSourceMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CardNumber: S.optional(S.Number),
    ChannelNumber: S.optional(S.Number),
    SdiSource: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CardNumber: "cardNumber",
      ChannelNumber: "channelNumber",
      SdiSource: "sdiSource",
    }),
  ),
).annotate({
  identifier: "SdiSourceMapping",
}) as any as S.Schema<SdiSourceMapping>;
export type SdiSourceMappings = SdiSourceMapping[];
export const SdiSourceMappings = /*@__PURE__*/ S.Array(SdiSourceMapping);
export interface CreateNodeResponse {
  Arn?: string;
  ChannelPlacementGroups?: string[];
  ClusterId?: string;
  ConnectionState?: NodeConnectionState;
  Id?: string;
  InstanceArn?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  Role?: NodeRole;
  State?: NodeState;
  SdiSourceMappings?: SdiSourceMapping[];
}
export const CreateNodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelPlacementGroups: S.optional(__listOf__string),
    ClusterId: S.optional(S.String),
    ConnectionState: S.optional(NodeConnectionState),
    Id: S.optional(S.String),
    InstanceArn: S.optional(S.String),
    Name: S.optional(S.String),
    NodeInterfaceMappings: S.optional(__listOfNodeInterfaceMapping),
    Role: S.optional(NodeRole),
    State: S.optional(NodeState),
    SdiSourceMappings: S.optional(SdiSourceMappings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ChannelPlacementGroups: "channelPlacementGroups",
      ClusterId: "clusterId",
      ConnectionState: "connectionState",
      Id: "id",
      InstanceArn: "instanceArn",
      Name: "name",
      NodeInterfaceMappings: "nodeInterfaceMappings",
      Role: "role",
      State: "state",
      SdiSourceMappings: "sdiSourceMappings",
    }),
  ),
).annotate({
  identifier: "CreateNodeResponse",
}) as any as S.Schema<CreateNodeResponse>;
export interface CreateNodeRegistrationScriptRequest {
  ClusterId: string;
  Id?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  RequestId?: string;
  Role?: NodeRole;
}
export const CreateNodeRegistrationScriptRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    NodeInterfaceMappings: S.optional(__listOfNodeInterfaceMapping),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Role: S.optional(NodeRole),
  })
    .pipe(
      S.encodeKeys({
        Id: "id",
        Name: "name",
        NodeInterfaceMappings: "nodeInterfaceMappings",
        RequestId: "requestId",
        Role: "role",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/prod/clusters/{ClusterId}/nodeRegistrationScript",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateNodeRegistrationScriptRequest",
}) as any as S.Schema<CreateNodeRegistrationScriptRequest>;
export interface CreateNodeRegistrationScriptResponse {
  NodeRegistrationScript?: string;
}
export const CreateNodeRegistrationScriptResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ NodeRegistrationScript: S.optional(S.String) }).pipe(
      S.encodeKeys({ NodeRegistrationScript: "nodeRegistrationScript" }),
    ),
).annotate({
  identifier: "CreateNodeRegistrationScriptResponse",
}) as any as S.Schema<CreateNodeRegistrationScriptResponse>;
export interface CreatePartnerInputRequest {
  InputId: string;
  RequestId?: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePartnerInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputId: S.String.pipe(T.HttpLabel("InputId")),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
  })
    .pipe(S.encodeKeys({ RequestId: "requestId", Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/inputs/{InputId}/partners" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePartnerInputRequest",
}) as any as S.Schema<CreatePartnerInputRequest>;
export interface CreatePartnerInputResponse {
  Input?: Input & {
    SrtSettings: SrtSettings & {
      SrtListenerSettings: SrtListenerSettings & {
        Decryption: SrtListenerDecryption & {
          Algorithm: Algorithm;
          PassphraseSecretArn: string;
        };
      };
    };
    MulticastSettings: MulticastSettings & {
      Sources: (MulticastSource & { Url: string })[];
    };
  };
}
export const CreatePartnerInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Input: S.optional(Input) }).pipe(S.encodeKeys({ Input: "input" })),
).annotate({
  identifier: "CreatePartnerInputResponse",
}) as any as S.Schema<CreatePartnerInputResponse>;
export type SdiSourceMode = "QUADRANT" | "INTERLEAVE" | (string & {});
export const SdiSourceMode = /*@__PURE__*/ S.String;

export type SdiSourceType = "SINGLE" | "QUAD" | (string & {});
export const SdiSourceType = /*@__PURE__*/ S.String;

export interface CreateSdiSourceRequest {
  Mode?: SdiSourceMode;
  Name?: string;
  RequestId?: string;
  Tags?: { [key: string]: string | undefined };
  Type?: SdiSourceType;
}
export const CreateSdiSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Mode: S.optional(SdiSourceMode),
    Name: S.optional(S.String),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Tags: S.optional(Tags),
    Type: S.optional(SdiSourceType),
  })
    .pipe(
      S.encodeKeys({
        Mode: "mode",
        Name: "name",
        RequestId: "requestId",
        Tags: "tags",
        Type: "type",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/sdiSources" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateSdiSourceRequest",
}) as any as S.Schema<CreateSdiSourceRequest>;
export type SdiSourceState = "IDLE" | "IN_USE" | "DELETED" | (string & {});
export const SdiSourceState = /*@__PURE__*/ S.String;

export interface SdiSource {
  Arn?: string;
  Id?: string;
  Inputs?: string[];
  Mode?: SdiSourceMode;
  Name?: string;
  State?: SdiSourceState;
  Type?: SdiSourceType;
}
export const SdiSource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Inputs: S.optional(__listOf__string),
    Mode: S.optional(SdiSourceMode),
    Name: S.optional(S.String),
    State: S.optional(SdiSourceState),
    Type: S.optional(SdiSourceType),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Id: "id",
      Inputs: "inputs",
      Mode: "mode",
      Name: "name",
      State: "state",
      Type: "type",
    }),
  ),
).annotate({ identifier: "SdiSource" }) as any as S.Schema<SdiSource>;
export interface CreateSdiSourceResponse {
  SdiSource?: SdiSource;
}
export const CreateSdiSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SdiSource: S.optional(SdiSource) }).pipe(
    S.encodeKeys({ SdiSource: "sdiSource" }),
  ),
).annotate({
  identifier: "CreateSdiSourceResponse",
}) as any as S.Schema<CreateSdiSourceResponse>;
export type __listOf__stringPatternS = string[];
export const __listOf__stringPatternS = /*@__PURE__*/ S.Array(S.String);
export type __stringMin1Max2048 = string;
export interface CreateSignalMapRequest {
  CloudWatchAlarmTemplateGroupIdentifiers?: string[];
  Description?: string;
  DiscoveryEntryPointArn?: string;
  EventBridgeRuleTemplateGroupIdentifiers?: string[];
  Name?: string;
  Tags?: { [key: string]: string | undefined };
  RequestId?: string;
}
export const CreateSignalMapRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchAlarmTemplateGroupIdentifiers: S.optional(
      __listOf__stringPatternS,
    ),
    Description: S.optional(S.String),
    DiscoveryEntryPointArn: S.optional(S.String),
    EventBridgeRuleTemplateGroupIdentifiers: S.optional(
      __listOf__stringPatternS,
    ),
    Name: S.optional(S.String),
    Tags: S.optional(TagMap),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
  })
    .pipe(
      S.encodeKeys({
        CloudWatchAlarmTemplateGroupIdentifiers:
          "cloudWatchAlarmTemplateGroupIdentifiers",
        Description: "description",
        DiscoveryEntryPointArn: "discoveryEntryPointArn",
        EventBridgeRuleTemplateGroupIdentifiers:
          "eventBridgeRuleTemplateGroupIdentifiers",
        Name: "name",
        Tags: "tags",
        RequestId: "requestId",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/signal-maps" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateSignalMapRequest",
}) as any as S.Schema<CreateSignalMapRequest>;
export type __stringPatternArnMedialiveSignalMap = string;
export type __listOf__stringMin7Max11PatternAws097 = string[];
export const __listOf__stringMin7Max11PatternAws097 = /*@__PURE__*/ S.Array(
  S.String,
);
export interface MediaResourceNeighbor {
  Arn?: string;
  Name?: string;
}
export const MediaResourceNeighbor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }).pipe(
    S.encodeKeys({ Arn: "arn", Name: "name" }),
  ),
).annotate({
  identifier: "MediaResourceNeighbor",
}) as any as S.Schema<MediaResourceNeighbor>;
export type __listOfMediaResourceNeighbor = MediaResourceNeighbor[];
export const __listOfMediaResourceNeighbor = /*@__PURE__*/ S.Array(
  MediaResourceNeighbor,
);
export interface MediaResource {
  Destinations?: MediaResourceNeighbor[];
  Name?: string;
  Sources?: MediaResourceNeighbor[];
}
export const MediaResource = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destinations: S.optional(__listOfMediaResourceNeighbor),
    Name: S.optional(S.String),
    Sources: S.optional(__listOfMediaResourceNeighbor),
  }).pipe(
    S.encodeKeys({
      Destinations: "destinations",
      Name: "name",
      Sources: "sources",
    }),
  ),
).annotate({ identifier: "MediaResource" }) as any as S.Schema<MediaResource>;
export type FailedMediaResourceMap = {
  [key: string]: MediaResource | undefined;
};
export const FailedMediaResourceMap = /*@__PURE__*/ S.Record(
  S.String,
  MediaResource.pipe(S.optional),
);
export type SignalMapMonitorDeploymentStatus =
  | "NOT_DEPLOYED"
  | "DRY_RUN_DEPLOYMENT_COMPLETE"
  | "DRY_RUN_DEPLOYMENT_FAILED"
  | "DRY_RUN_DEPLOYMENT_IN_PROGRESS"
  | "DEPLOYMENT_COMPLETE"
  | "DEPLOYMENT_FAILED"
  | "DEPLOYMENT_IN_PROGRESS"
  | "DELETE_COMPLETE"
  | "DELETE_FAILED"
  | "DELETE_IN_PROGRESS"
  | (string & {});
export const SignalMapMonitorDeploymentStatus = /*@__PURE__*/ S.String;

export interface SuccessfulMonitorDeployment {
  DetailsUri?: string;
  Status?: SignalMapMonitorDeploymentStatus;
}
export const SuccessfulMonitorDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetailsUri: S.optional(S.String),
    Status: S.optional(SignalMapMonitorDeploymentStatus),
  }).pipe(S.encodeKeys({ DetailsUri: "detailsUri", Status: "status" })),
).annotate({
  identifier: "SuccessfulMonitorDeployment",
}) as any as S.Schema<SuccessfulMonitorDeployment>;
export type MediaResourceMap = { [key: string]: MediaResource | undefined };
export const MediaResourceMap = /*@__PURE__*/ S.Record(
  S.String,
  MediaResource.pipe(S.optional),
);
export interface MonitorDeployment {
  DetailsUri?: string;
  ErrorMessage?: string;
  Status?: SignalMapMonitorDeploymentStatus;
}
export const MonitorDeployment = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DetailsUri: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    Status: S.optional(SignalMapMonitorDeploymentStatus),
  }).pipe(
    S.encodeKeys({
      DetailsUri: "detailsUri",
      ErrorMessage: "errorMessage",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "MonitorDeployment",
}) as any as S.Schema<MonitorDeployment>;
export type SignalMapStatus =
  | "CREATE_IN_PROGRESS"
  | "CREATE_COMPLETE"
  | "CREATE_FAILED"
  | "UPDATE_IN_PROGRESS"
  | "UPDATE_COMPLETE"
  | "UPDATE_REVERTED"
  | "UPDATE_FAILED"
  | "READY"
  | "NOT_READY"
  | (string & {});
export const SignalMapStatus = /*@__PURE__*/ S.String;

export interface CreateSignalMapResponse {
  Arn?: string;
  CloudWatchAlarmTemplateGroupIds?: string[];
  CreatedAt?: Date;
  Description?: string;
  DiscoveryEntryPointArn?: string;
  ErrorMessage?: string;
  EventBridgeRuleTemplateGroupIds?: string[];
  FailedMediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  Id?: string;
  LastDiscoveredAt?: Date;
  LastSuccessfulMonitorDeployment?: SuccessfulMonitorDeployment & {
    DetailsUri: __stringMin1Max2048;
    Status: SignalMapMonitorDeploymentStatus;
  };
  MediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & {
    Status: SignalMapMonitorDeploymentStatus;
  };
  Name?: string;
  Status?: SignalMapStatus;
  Tags?: { [key: string]: string | undefined };
}
export const CreateSignalMapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CloudWatchAlarmTemplateGroupIds: S.optional(
      __listOf__stringMin7Max11PatternAws097,
    ),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DiscoveryEntryPointArn: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    EventBridgeRuleTemplateGroupIds: S.optional(
      __listOf__stringMin7Max11PatternAws097,
    ),
    FailedMediaResourceMap: S.optional(FailedMediaResourceMap),
    Id: S.optional(S.String),
    LastDiscoveredAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastSuccessfulMonitorDeployment: S.optional(SuccessfulMonitorDeployment),
    MediaResourceMap: S.optional(MediaResourceMap),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    MonitorChangesPendingDeployment: S.optional(S.Boolean),
    MonitorDeployment: S.optional(MonitorDeployment),
    Name: S.optional(S.String),
    Status: S.optional(SignalMapStatus),
    Tags: S.optional(TagMap),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CloudWatchAlarmTemplateGroupIds: "cloudWatchAlarmTemplateGroupIds",
      CreatedAt: "createdAt",
      Description: "description",
      DiscoveryEntryPointArn: "discoveryEntryPointArn",
      ErrorMessage: "errorMessage",
      EventBridgeRuleTemplateGroupIds: "eventBridgeRuleTemplateGroupIds",
      FailedMediaResourceMap: "failedMediaResourceMap",
      Id: "id",
      LastDiscoveredAt: "lastDiscoveredAt",
      LastSuccessfulMonitorDeployment: "lastSuccessfulMonitorDeployment",
      MediaResourceMap: "mediaResourceMap",
      ModifiedAt: "modifiedAt",
      MonitorChangesPendingDeployment: "monitorChangesPendingDeployment",
      MonitorDeployment: "monitorDeployment",
      Name: "name",
      Status: "status",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "CreateSignalMapResponse",
}) as any as S.Schema<CreateSignalMapResponse>;
export interface CreateTagsRequest {
  ResourceArn: string;
  Tags?: { [key: string]: string | undefined };
}
export const CreateTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    Tags: S.optional(Tags),
  })
    .pipe(S.encodeKeys({ Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/prod/tags/{ResourceArn}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateTagsRequest",
}) as any as S.Schema<CreateTagsRequest>;
export interface CreateTagsResponse {}
export const CreateTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateTagsResponse",
}) as any as S.Schema<CreateTagsResponse>;
export interface DeleteChannelRequest {
  ChannelId: string;
}
export const DeleteChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelId: S.String.pipe(T.HttpLabel("ChannelId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/prod/channels/{ChannelId}" }),
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
export interface DeleteChannelResponse {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  EncoderSettings?: EncoderSettings & {
    AudioDescriptions: (AudioDescription & {
      AudioSelectorName: string;
      Name: __stringMax255;
      AudioWatermarkingSettings: AudioWatermarkSettings & {
        NielsenWatermarksSettings: NielsenWatermarksSettings & {
          NielsenCbetSettings: NielsenCBET & {
            CbetCheckDigitString: __stringMin2Max2;
            CbetStepaside: NielsenWatermarksCbetStepaside;
            Csid: __stringMin1Max7;
          };
          NielsenNaesIiNwSettings: NielsenNaesIiNw & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
        };
      };
      RemixSettings: RemixSettings & {
        ChannelMappings: (AudioChannelMapping & {
          InputChannelLevels: (InputChannelLevel & {
            Gain: __integerMinNegative60Max6;
            InputChannel: __integerMin0Max15;
          })[];
          OutputChannel: __integerMin0Max7;
        })[];
      };
    })[];
    OutputGroups: (OutputGroup & {
      OutputGroupSettings: OutputGroupSettings & {
        ArchiveGroupSettings: ArchiveGroupSettings & {
          Destination: OutputLocationRef;
        };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
          Destination: OutputLocationRef;
        };
        HlsGroupSettings: HlsGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
            LanguageDescription: __stringMin1;
          })[];
          KeyProviderSettings: KeyProviderSettings & {
            StaticKeySettings: StaticKeySettings & {
              StaticKeyValue: __stringMin32Max32;
              KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
            };
          };
        };
        MediaPackageGroupSettings: MediaPackageGroupSettings & {
          Destination: OutputLocationRef;
          MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            AdditionalDestinations: (MediaPackageAdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & {
          Destination: OutputLocationRef;
        };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & {
            Destination: OutputLocationRef;
          })[];
        };
      };
      Outputs: (Output & {
        OutputSettings: OutputSettings & {
          ArchiveOutputSettings: ArchiveOutputSettings & {
            ContainerSettings: ArchiveContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
          };
          HlsOutputSettings: HlsOutputSettings & {
            HlsSettings: HlsSettings & {
              AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
              };
              StandardHlsSettings: StandardHlsSettings & {
                M3u8Settings: M3u8Settings;
              };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & {
            Destination: OutputLocationRef;
          };
          RtmpOutputSettings: RtmpOutputSettings & {
            Destination: OutputLocationRef;
          };
          UdpOutputSettings: UdpOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          SrtOutputSettings: SrtOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
            ContainerSettings: MediaConnectRouterContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
        };
      })[];
    })[];
    TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
    VideoDescriptions: (VideoDescription & {
      Name: string;
      CodecSettings: VideoCodecSettings & {
        FrameCaptureSettings: FrameCaptureSettings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H264Settings: H264Settings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H265Settings: H265Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Mpeg2Settings: Mpeg2Settings & {
          FramerateDenominator: __integerMin1;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Av1Settings: Av1Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
      };
    })[];
    AvailBlanking: AvailBlanking & {
      AvailBlankingImage: InputLocation & { Uri: __stringMax2048 };
    };
    AvailConfiguration: AvailConfiguration & {
      AvailSettings: AvailSettings & {
        Esam: Esam & {
          AcquisitionPointId: __stringMax256;
          PoisEndpoint: __stringMax2048;
        };
      };
    };
    BlackoutSlate: BlackoutSlate & {
      BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
      NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
    };
    CaptionDescriptions: (CaptionDescription & {
      CaptionSelectorName: string;
      Name: string;
      DestinationSettings: CaptionDestinationSettings & {
        BurnInDestinationSettings: BurnInDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
        DvbSubDestinationSettings: DvbSubDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
      };
    })[];
    GlobalConfiguration: GlobalConfiguration & {
      InputLossBehavior: InputLossBehavior & {
        InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
      };
    };
    MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
      MotionGraphicsSettings: MotionGraphicsSettings;
    };
    ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
    ColorCorrectionSettings: ColorCorrectionSettings & {
      GlobalColorCorrections: (ColorCorrection & {
        InputColorSpace: ColorSpace;
        OutputColorSpace: ColorSpace;
        Uri: string;
      })[];
    };
  };
  Id?: string;
  InputAttachments?: (InputAttachment & {
    AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
      SecondaryInputId: string;
      FailoverConditions: (FailoverCondition & {
        FailoverConditionSettings: FailoverConditionSettings & {
          AudioSilenceSettings: AudioSilenceFailoverSettings & {
            AudioSelectorName: string;
          };
        };
      })[];
    };
    InputSettings: InputSettings & {
      AudioSelectors: (AudioSelector & {
        Name: __stringMin1;
        SelectorSettings: AudioSelectorSettings & {
          AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
            GroupId: __stringMin1;
            Name: __stringMin1;
          };
          AudioLanguageSelection: AudioLanguageSelection & {
            LanguageCode: string;
          };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
          };
          AudioTrackSelection: AudioTrackSelection & {
            Tracks: (AudioTrack & {
              Track: __integerMin1;
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
            DolbyEDecode: AudioDolbyEDecode & {
              ProgramSelection: DolbyEProgramSelection;
            };
          };
        };
      })[];
      CaptionSelectors: (CaptionSelector & {
        Name: __stringMin1;
        SelectorSettings: CaptionSelectorSettings & {
          TeletextSourceSettings: TeletextSourceSettings & {
            OutputRectangle: CaptionRectangle & {
              Height: __doubleMin0Max100;
              LeftOffset: __doubleMin0Max100;
              TopOffset: __doubleMin0Max100;
              Width: __doubleMin0Max100;
            };
          };
        };
      })[];
    };
  })[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  Name?: string;
  PipelineDetails?: PipelineDetail[];
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export const DeleteChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CdiInputSpecification: S.optional(CdiInputSpecification),
    ChannelClass: S.optional(ChannelClass),
    Destinations: S.optional(__listOfOutputDestination),
    EgressEndpoints: S.optional(__listOfChannelEgressEndpoint),
    EncoderSettings: S.optional(EncoderSettings),
    Id: S.optional(S.String),
    InputAttachments: S.optional(__listOfInputAttachment),
    InputSpecification: S.optional(InputSpecification),
    LogLevel: S.optional(LogLevel),
    Maintenance: S.optional(MaintenanceStatus),
    Name: S.optional(S.String),
    PipelineDetails: S.optional(__listOfPipelineDetail),
    PipelinesRunningCount: S.optional(S.Number),
    RoleArn: S.optional(S.String),
    State: S.optional(ChannelState),
    Tags: S.optional(Tags),
    Vpc: S.optional(VpcOutputSettingsDescription),
    AnywhereSettings: S.optional(DescribeAnywhereSettings),
    ChannelEngineVersion: S.optional(ChannelEngineVersionResponse),
    LinkedChannelSettings: S.optional(DescribeLinkedChannelSettings),
    ChannelSecurityGroups: S.optional(__listOf__string),
    InferenceSettings: S.optional(DescribeInferenceSettings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CdiInputSpecification: "cdiInputSpecification",
      ChannelClass: "channelClass",
      Destinations: "destinations",
      EgressEndpoints: "egressEndpoints",
      EncoderSettings: "encoderSettings",
      Id: "id",
      InputAttachments: "inputAttachments",
      InputSpecification: "inputSpecification",
      LogLevel: "logLevel",
      Maintenance: "maintenance",
      Name: "name",
      PipelineDetails: "pipelineDetails",
      PipelinesRunningCount: "pipelinesRunningCount",
      RoleArn: "roleArn",
      State: "state",
      Tags: "tags",
      Vpc: "vpc",
      AnywhereSettings: "anywhereSettings",
      ChannelEngineVersion: "channelEngineVersion",
      LinkedChannelSettings: "linkedChannelSettings",
      ChannelSecurityGroups: "channelSecurityGroups",
      InferenceSettings: "inferenceSettings",
    }),
  ),
).annotate({
  identifier: "DeleteChannelResponse",
}) as any as S.Schema<DeleteChannelResponse>;
export interface DeleteChannelPlacementGroupRequest {
  ChannelPlacementGroupId: string;
  ClusterId: string;
}
export const DeleteChannelPlacementGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelPlacementGroupId: S.String.pipe(
      T.HttpLabel("ChannelPlacementGroupId"),
    ),
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/prod/clusters/{ClusterId}/channelplacementgroups/{ChannelPlacementGroupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteChannelPlacementGroupRequest",
}) as any as S.Schema<DeleteChannelPlacementGroupRequest>;
export interface DeleteChannelPlacementGroupResponse {
  Arn?: string;
  Channels?: string[];
  ClusterId?: string;
  Id?: string;
  Name?: string;
  Nodes?: string[];
  State?: ChannelPlacementGroupState;
}
export const DeleteChannelPlacementGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Channels: S.optional(__listOf__string),
    ClusterId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Nodes: S.optional(__listOf__string),
    State: S.optional(ChannelPlacementGroupState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Channels: "channels",
      ClusterId: "clusterId",
      Id: "id",
      Name: "name",
      Nodes: "nodes",
      State: "state",
    }),
  ),
).annotate({
  identifier: "DeleteChannelPlacementGroupResponse",
}) as any as S.Schema<DeleteChannelPlacementGroupResponse>;
export interface DeleteCloudWatchAlarmTemplateRequest {
  Identifier: string;
}
export const DeleteCloudWatchAlarmTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/prod/cloudwatch-alarm-templates/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteCloudWatchAlarmTemplateRequest",
}) as any as S.Schema<DeleteCloudWatchAlarmTemplateRequest>;
export interface DeleteCloudWatchAlarmTemplateResponse {}
export const DeleteCloudWatchAlarmTemplateResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteCloudWatchAlarmTemplateResponse",
}) as any as S.Schema<DeleteCloudWatchAlarmTemplateResponse>;
export interface DeleteCloudWatchAlarmTemplateGroupRequest {
  Identifier: string;
}
export const DeleteCloudWatchAlarmTemplateGroupRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/prod/cloudwatch-alarm-template-groups/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteCloudWatchAlarmTemplateGroupRequest",
  }) as any as S.Schema<DeleteCloudWatchAlarmTemplateGroupRequest>;
export interface DeleteCloudWatchAlarmTemplateGroupResponse {}
export const DeleteCloudWatchAlarmTemplateGroupResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteCloudWatchAlarmTemplateGroupResponse",
  }) as any as S.Schema<DeleteCloudWatchAlarmTemplateGroupResponse>;
export interface DeleteClusterRequest {
  ClusterId: string;
}
export const DeleteClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterId: S.String.pipe(T.HttpLabel("ClusterId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/prod/clusters/{ClusterId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteClusterRequest",
}) as any as S.Schema<DeleteClusterRequest>;
export interface DeleteClusterResponse {
  Arn?: string;
  ChannelIds?: string[];
  ClusterType?: ClusterType;
  Id?: string;
  InstanceRoleArn?: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettings;
  State?: ClusterState;
}
export const DeleteClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelIds: S.optional(__listOf__string),
    ClusterType: S.optional(ClusterType),
    Id: S.optional(S.String),
    InstanceRoleArn: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkSettings: S.optional(ClusterNetworkSettings),
    State: S.optional(ClusterState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ChannelIds: "channelIds",
      ClusterType: "clusterType",
      Id: "id",
      InstanceRoleArn: "instanceRoleArn",
      Name: "name",
      NetworkSettings: "networkSettings",
      State: "state",
    }),
  ),
).annotate({
  identifier: "DeleteClusterResponse",
}) as any as S.Schema<DeleteClusterResponse>;
export interface DeleteEventBridgeRuleTemplateRequest {
  Identifier: string;
}
export const DeleteEventBridgeRuleTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/prod/eventbridge-rule-templates/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DeleteEventBridgeRuleTemplateRequest",
}) as any as S.Schema<DeleteEventBridgeRuleTemplateRequest>;
export interface DeleteEventBridgeRuleTemplateResponse {}
export const DeleteEventBridgeRuleTemplateResponse = /*@__PURE__*/ S.suspend(
  () => S.Struct({}),
).annotate({
  identifier: "DeleteEventBridgeRuleTemplateResponse",
}) as any as S.Schema<DeleteEventBridgeRuleTemplateResponse>;
export interface DeleteEventBridgeRuleTemplateGroupRequest {
  Identifier: string;
}
export const DeleteEventBridgeRuleTemplateGroupRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
      T.all(
        T.Http({
          method: "DELETE",
          uri: "/prod/eventbridge-rule-template-groups/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
  ).annotate({
    identifier: "DeleteEventBridgeRuleTemplateGroupRequest",
  }) as any as S.Schema<DeleteEventBridgeRuleTemplateGroupRequest>;
export interface DeleteEventBridgeRuleTemplateGroupResponse {}
export const DeleteEventBridgeRuleTemplateGroupResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "DeleteEventBridgeRuleTemplateGroupResponse",
  }) as any as S.Schema<DeleteEventBridgeRuleTemplateGroupResponse>;
export interface DeleteInputRequest {
  InputId: string;
}
export const DeleteInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputId: S.String.pipe(T.HttpLabel("InputId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/prod/inputs/{InputId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInputRequest",
}) as any as S.Schema<DeleteInputRequest>;
export interface DeleteInputResponse {}
export const DeleteInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteInputResponse",
}) as any as S.Schema<DeleteInputResponse>;
export interface DeleteInputSecurityGroupRequest {
  InputSecurityGroupId: string;
}
export const DeleteInputSecurityGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputSecurityGroupId: S.String.pipe(T.HttpLabel("InputSecurityGroupId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/prod/inputSecurityGroups/{InputSecurityGroupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteInputSecurityGroupRequest",
}) as any as S.Schema<DeleteInputSecurityGroupRequest>;
export interface DeleteInputSecurityGroupResponse {}
export const DeleteInputSecurityGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteInputSecurityGroupResponse",
}) as any as S.Schema<DeleteInputSecurityGroupResponse>;
export interface DeleteMultiplexRequest {
  MultiplexId: string;
}
export const DeleteMultiplexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/prod/multiplexes/{MultiplexId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMultiplexRequest",
}) as any as S.Schema<DeleteMultiplexRequest>;
export interface DeleteMultiplexResponse {
  Arn?: string;
  AvailabilityZones?: string[];
  Destinations?: MultiplexOutputDestination[];
  Id?: string;
  MultiplexSettings?: MultiplexSettings & {
    TransportStreamBitrate: __integerMin1000000Max100000000;
    TransportStreamId: __integerMin0Max65535;
  };
  Name?: string;
  PipelinesRunningCount?: number;
  ProgramCount?: number;
  State?: MultiplexState;
  Tags?: { [key: string]: string | undefined };
}
export const DeleteMultiplexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AvailabilityZones: S.optional(__listOf__string),
    Destinations: S.optional(__listOfMultiplexOutputDestination),
    Id: S.optional(S.String),
    MultiplexSettings: S.optional(MultiplexSettings),
    Name: S.optional(S.String),
    PipelinesRunningCount: S.optional(S.Number),
    ProgramCount: S.optional(S.Number),
    State: S.optional(MultiplexState),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AvailabilityZones: "availabilityZones",
      Destinations: "destinations",
      Id: "id",
      MultiplexSettings: "multiplexSettings",
      Name: "name",
      PipelinesRunningCount: "pipelinesRunningCount",
      ProgramCount: "programCount",
      State: "state",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "DeleteMultiplexResponse",
}) as any as S.Schema<DeleteMultiplexResponse>;
export interface DeleteMultiplexProgramRequest {
  MultiplexId: string;
  ProgramName: string;
}
export const DeleteMultiplexProgramRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
    ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/prod/multiplexes/{MultiplexId}/programs/{ProgramName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteMultiplexProgramRequest",
}) as any as S.Schema<DeleteMultiplexProgramRequest>;
export interface DeleteMultiplexProgramResponse {
  ChannelId?: string;
  MultiplexProgramSettings?: MultiplexProgramSettings & {
    ProgramNumber: __integerMin0Max65535;
    ServiceDescriptor: MultiplexProgramServiceDescriptor & {
      ProviderName: __stringMax256;
      ServiceName: __stringMax256;
    };
  };
  PacketIdentifiersMap?: MultiplexProgramPacketIdentifiersMap;
  PipelineDetails?: MultiplexProgramPipelineDetail[];
  ProgramName?: string;
}
export const DeleteMultiplexProgramResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.optional(S.String),
    MultiplexProgramSettings: S.optional(MultiplexProgramSettings),
    PacketIdentifiersMap: S.optional(MultiplexProgramPacketIdentifiersMap),
    PipelineDetails: S.optional(__listOfMultiplexProgramPipelineDetail),
    ProgramName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ChannelId: "channelId",
      MultiplexProgramSettings: "multiplexProgramSettings",
      PacketIdentifiersMap: "packetIdentifiersMap",
      PipelineDetails: "pipelineDetails",
      ProgramName: "programName",
    }),
  ),
).annotate({
  identifier: "DeleteMultiplexProgramResponse",
}) as any as S.Schema<DeleteMultiplexProgramResponse>;
export interface DeleteNetworkRequest {
  NetworkId: string;
}
export const DeleteNetworkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NetworkId: S.String.pipe(T.HttpLabel("NetworkId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/prod/networks/{NetworkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteNetworkRequest",
}) as any as S.Schema<DeleteNetworkRequest>;
export interface DeleteNetworkResponse {
  Arn?: string;
  AssociatedClusterIds?: string[];
  Id?: string;
  IpPools?: IpPool[];
  Name?: string;
  Routes?: Route[];
  State?: NetworkState;
}
export const DeleteNetworkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssociatedClusterIds: S.optional(__listOf__string),
    Id: S.optional(S.String),
    IpPools: S.optional(__listOfIpPool),
    Name: S.optional(S.String),
    Routes: S.optional(__listOfRoute),
    State: S.optional(NetworkState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AssociatedClusterIds: "associatedClusterIds",
      Id: "id",
      IpPools: "ipPools",
      Name: "name",
      Routes: "routes",
      State: "state",
    }),
  ),
).annotate({
  identifier: "DeleteNetworkResponse",
}) as any as S.Schema<DeleteNetworkResponse>;
export interface DeleteNodeRequest {
  ClusterId: string;
  NodeId: string;
}
export const DeleteNodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    NodeId: S.String.pipe(T.HttpLabel("NodeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/prod/clusters/{ClusterId}/nodes/{NodeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteNodeRequest",
}) as any as S.Schema<DeleteNodeRequest>;
export interface DeleteNodeResponse {
  Arn?: string;
  ChannelPlacementGroups?: string[];
  ClusterId?: string;
  ConnectionState?: NodeConnectionState;
  Id?: string;
  InstanceArn?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  Role?: NodeRole;
  State?: NodeState;
  SdiSourceMappings?: SdiSourceMapping[];
}
export const DeleteNodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelPlacementGroups: S.optional(__listOf__string),
    ClusterId: S.optional(S.String),
    ConnectionState: S.optional(NodeConnectionState),
    Id: S.optional(S.String),
    InstanceArn: S.optional(S.String),
    Name: S.optional(S.String),
    NodeInterfaceMappings: S.optional(__listOfNodeInterfaceMapping),
    Role: S.optional(NodeRole),
    State: S.optional(NodeState),
    SdiSourceMappings: S.optional(SdiSourceMappings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ChannelPlacementGroups: "channelPlacementGroups",
      ClusterId: "clusterId",
      ConnectionState: "connectionState",
      Id: "id",
      InstanceArn: "instanceArn",
      Name: "name",
      NodeInterfaceMappings: "nodeInterfaceMappings",
      Role: "role",
      State: "state",
      SdiSourceMappings: "sdiSourceMappings",
    }),
  ),
).annotate({
  identifier: "DeleteNodeResponse",
}) as any as S.Schema<DeleteNodeResponse>;
export interface DeleteReservationRequest {
  ReservationId: string;
}
export const DeleteReservationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReservationId: S.String.pipe(T.HttpLabel("ReservationId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/prod/reservations/{ReservationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteReservationRequest",
}) as any as S.Schema<DeleteReservationRequest>;
export type OfferingDurationUnits = "MONTHS" | (string & {});
export const OfferingDurationUnits = /*@__PURE__*/ S.String;

export type OfferingType = "NO_UPFRONT" | (string & {});
export const OfferingType = /*@__PURE__*/ S.String;

export type ReservationAutomaticRenewal =
  | "DISABLED"
  | "ENABLED"
  | "UNAVAILABLE"
  | (string & {});
export const ReservationAutomaticRenewal = /*@__PURE__*/ S.String;

export interface RenewalSettings {
  AutomaticRenewal?: ReservationAutomaticRenewal;
  RenewalCount?: number;
}
export const RenewalSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomaticRenewal: S.optional(ReservationAutomaticRenewal),
    RenewalCount: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AutomaticRenewal: "automaticRenewal",
      RenewalCount: "renewalCount",
    }),
  ),
).annotate({
  identifier: "RenewalSettings",
}) as any as S.Schema<RenewalSettings>;
export type ReservationCodec =
  | "MPEG2"
  | "AVC"
  | "HEVC"
  | "AUDIO"
  | "LINK"
  | "AV1"
  | (string & {});
export const ReservationCodec = /*@__PURE__*/ S.String;

export type ReservationMaximumBitrate =
  | "MAX_10_MBPS"
  | "MAX_20_MBPS"
  | "MAX_50_MBPS"
  | (string & {});
export const ReservationMaximumBitrate = /*@__PURE__*/ S.String;

export type ReservationMaximumFramerate =
  | "MAX_30_FPS"
  | "MAX_60_FPS"
  | (string & {});
export const ReservationMaximumFramerate = /*@__PURE__*/ S.String;

export type ReservationResolution = "SD" | "HD" | "FHD" | "UHD" | (string & {});
export const ReservationResolution = /*@__PURE__*/ S.String;

export type ReservationResourceType =
  | "INPUT"
  | "OUTPUT"
  | "MULTIPLEX"
  | "CHANNEL"
  | (string & {});
export const ReservationResourceType = /*@__PURE__*/ S.String;

export type ReservationSpecialFeature =
  | "ADVANCED_AUDIO"
  | "AUDIO_NORMALIZATION"
  | "MGHD"
  | "MGUHD"
  | (string & {});
export const ReservationSpecialFeature = /*@__PURE__*/ S.String;

export type ReservationVideoQuality =
  | "STANDARD"
  | "ENHANCED"
  | "PREMIUM"
  | (string & {});
export const ReservationVideoQuality = /*@__PURE__*/ S.String;

export interface ReservationResourceSpecification {
  ChannelClass?: ChannelClass;
  Codec?: ReservationCodec;
  MaximumBitrate?: ReservationMaximumBitrate;
  MaximumFramerate?: ReservationMaximumFramerate;
  Resolution?: ReservationResolution;
  ResourceType?: ReservationResourceType;
  SpecialFeature?: ReservationSpecialFeature;
  VideoQuality?: ReservationVideoQuality;
}
export const ReservationResourceSpecification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelClass: S.optional(ChannelClass),
    Codec: S.optional(ReservationCodec),
    MaximumBitrate: S.optional(ReservationMaximumBitrate),
    MaximumFramerate: S.optional(ReservationMaximumFramerate),
    Resolution: S.optional(ReservationResolution),
    ResourceType: S.optional(ReservationResourceType),
    SpecialFeature: S.optional(ReservationSpecialFeature),
    VideoQuality: S.optional(ReservationVideoQuality),
  }).pipe(
    S.encodeKeys({
      ChannelClass: "channelClass",
      Codec: "codec",
      MaximumBitrate: "maximumBitrate",
      MaximumFramerate: "maximumFramerate",
      Resolution: "resolution",
      ResourceType: "resourceType",
      SpecialFeature: "specialFeature",
      VideoQuality: "videoQuality",
    }),
  ),
).annotate({
  identifier: "ReservationResourceSpecification",
}) as any as S.Schema<ReservationResourceSpecification>;
export type ReservationState =
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELED"
  | "DELETED"
  | (string & {});
export const ReservationState = /*@__PURE__*/ S.String;

export interface DeleteReservationResponse {
  Arn?: string;
  Count?: number;
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: OfferingDurationUnits;
  End?: string;
  FixedPrice?: number;
  Name?: string;
  OfferingDescription?: string;
  OfferingId?: string;
  OfferingType?: OfferingType;
  Region?: string;
  RenewalSettings?: RenewalSettings;
  ReservationId?: string;
  ResourceSpecification?: ReservationResourceSpecification;
  Start?: string;
  State?: ReservationState;
  Tags?: { [key: string]: string | undefined };
  UsagePrice?: number;
}
export const DeleteReservationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Count: S.optional(S.Number),
    CurrencyCode: S.optional(S.String),
    Duration: S.optional(S.Number),
    DurationUnits: S.optional(OfferingDurationUnits),
    End: S.optional(S.String),
    FixedPrice: S.optional(S.Number),
    Name: S.optional(S.String),
    OfferingDescription: S.optional(S.String),
    OfferingId: S.optional(S.String),
    OfferingType: S.optional(OfferingType),
    Region: S.optional(S.String),
    RenewalSettings: S.optional(RenewalSettings),
    ReservationId: S.optional(S.String),
    ResourceSpecification: S.optional(ReservationResourceSpecification),
    Start: S.optional(S.String),
    State: S.optional(ReservationState),
    Tags: S.optional(Tags),
    UsagePrice: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Count: "count",
      CurrencyCode: "currencyCode",
      Duration: "duration",
      DurationUnits: "durationUnits",
      End: "end",
      FixedPrice: "fixedPrice",
      Name: "name",
      OfferingDescription: "offeringDescription",
      OfferingId: "offeringId",
      OfferingType: "offeringType",
      Region: "region",
      RenewalSettings: "renewalSettings",
      ReservationId: "reservationId",
      ResourceSpecification: "resourceSpecification",
      Start: "start",
      State: "state",
      Tags: "tags",
      UsagePrice: "usagePrice",
    }),
  ),
).annotate({
  identifier: "DeleteReservationResponse",
}) as any as S.Schema<DeleteReservationResponse>;
export interface DeleteScheduleRequest {
  ChannelId: string;
}
export const DeleteScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelId: S.String.pipe(T.HttpLabel("ChannelId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/prod/channels/{ChannelId}/schedule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteScheduleRequest",
}) as any as S.Schema<DeleteScheduleRequest>;
export interface DeleteScheduleResponse {}
export const DeleteScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteScheduleResponse",
}) as any as S.Schema<DeleteScheduleResponse>;
export interface DeleteSdiSourceRequest {
  SdiSourceId: string;
}
export const DeleteSdiSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SdiSourceId: S.String.pipe(T.HttpLabel("SdiSourceId")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/prod/sdiSources/{SdiSourceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSdiSourceRequest",
}) as any as S.Schema<DeleteSdiSourceRequest>;
export interface DeleteSdiSourceResponse {
  SdiSource?: SdiSource;
}
export const DeleteSdiSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SdiSource: S.optional(SdiSource) }).pipe(
    S.encodeKeys({ SdiSource: "sdiSource" }),
  ),
).annotate({
  identifier: "DeleteSdiSourceResponse",
}) as any as S.Schema<DeleteSdiSourceResponse>;
export interface DeleteSignalMapRequest {
  Identifier: string;
}
export const DeleteSignalMapRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/prod/signal-maps/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteSignalMapRequest",
}) as any as S.Schema<DeleteSignalMapRequest>;
export interface DeleteSignalMapResponse {}
export const DeleteSignalMapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteSignalMapResponse",
}) as any as S.Schema<DeleteSignalMapResponse>;
export interface DeleteTagsRequest {
  ResourceArn: string;
  TagKeys?: string[];
}
export const DeleteTagsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
    TagKeys: S.optional(__listOf__string).pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/prod/tags/{ResourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteTagsRequest",
}) as any as S.Schema<DeleteTagsRequest>;
export interface DeleteTagsResponse {}
export const DeleteTagsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteTagsResponse",
}) as any as S.Schema<DeleteTagsResponse>;
export interface DescribeAccountConfigurationRequest {}
export const DescribeAccountConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/accountConfiguration" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeAccountConfigurationRequest",
}) as any as S.Schema<DescribeAccountConfigurationRequest>;
export interface AccountConfiguration {
  KmsKeyId?: string;
}
export const AccountConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ KmsKeyId: S.optional(S.String) }).pipe(
    S.encodeKeys({ KmsKeyId: "kmsKeyId" }),
  ),
).annotate({
  identifier: "AccountConfiguration",
}) as any as S.Schema<AccountConfiguration>;
export interface DescribeAccountConfigurationResponse {
  AccountConfiguration?: AccountConfiguration;
}
export const DescribeAccountConfigurationResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ AccountConfiguration: S.optional(AccountConfiguration) }).pipe(
      S.encodeKeys({ AccountConfiguration: "accountConfiguration" }),
    ),
).annotate({
  identifier: "DescribeAccountConfigurationResponse",
}) as any as S.Schema<DescribeAccountConfigurationResponse>;
export interface DescribeChannelRequest {
  ChannelId: string;
}
export const DescribeChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelId: S.String.pipe(T.HttpLabel("ChannelId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/channels/{ChannelId}" }),
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
export interface DescribeChannelResponse {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  EncoderSettings?: EncoderSettings & {
    AudioDescriptions: (AudioDescription & {
      AudioSelectorName: string;
      Name: __stringMax255;
      AudioWatermarkingSettings: AudioWatermarkSettings & {
        NielsenWatermarksSettings: NielsenWatermarksSettings & {
          NielsenCbetSettings: NielsenCBET & {
            CbetCheckDigitString: __stringMin2Max2;
            CbetStepaside: NielsenWatermarksCbetStepaside;
            Csid: __stringMin1Max7;
          };
          NielsenNaesIiNwSettings: NielsenNaesIiNw & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
        };
      };
      RemixSettings: RemixSettings & {
        ChannelMappings: (AudioChannelMapping & {
          InputChannelLevels: (InputChannelLevel & {
            Gain: __integerMinNegative60Max6;
            InputChannel: __integerMin0Max15;
          })[];
          OutputChannel: __integerMin0Max7;
        })[];
      };
    })[];
    OutputGroups: (OutputGroup & {
      OutputGroupSettings: OutputGroupSettings & {
        ArchiveGroupSettings: ArchiveGroupSettings & {
          Destination: OutputLocationRef;
        };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
          Destination: OutputLocationRef;
        };
        HlsGroupSettings: HlsGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
            LanguageDescription: __stringMin1;
          })[];
          KeyProviderSettings: KeyProviderSettings & {
            StaticKeySettings: StaticKeySettings & {
              StaticKeyValue: __stringMin32Max32;
              KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
            };
          };
        };
        MediaPackageGroupSettings: MediaPackageGroupSettings & {
          Destination: OutputLocationRef;
          MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            AdditionalDestinations: (MediaPackageAdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & {
          Destination: OutputLocationRef;
        };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & {
            Destination: OutputLocationRef;
          })[];
        };
      };
      Outputs: (Output & {
        OutputSettings: OutputSettings & {
          ArchiveOutputSettings: ArchiveOutputSettings & {
            ContainerSettings: ArchiveContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
          };
          HlsOutputSettings: HlsOutputSettings & {
            HlsSettings: HlsSettings & {
              AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
              };
              StandardHlsSettings: StandardHlsSettings & {
                M3u8Settings: M3u8Settings;
              };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & {
            Destination: OutputLocationRef;
          };
          RtmpOutputSettings: RtmpOutputSettings & {
            Destination: OutputLocationRef;
          };
          UdpOutputSettings: UdpOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          SrtOutputSettings: SrtOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
            ContainerSettings: MediaConnectRouterContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
        };
      })[];
    })[];
    TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
    VideoDescriptions: (VideoDescription & {
      Name: string;
      CodecSettings: VideoCodecSettings & {
        FrameCaptureSettings: FrameCaptureSettings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H264Settings: H264Settings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H265Settings: H265Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Mpeg2Settings: Mpeg2Settings & {
          FramerateDenominator: __integerMin1;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Av1Settings: Av1Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
      };
    })[];
    AvailBlanking: AvailBlanking & {
      AvailBlankingImage: InputLocation & { Uri: __stringMax2048 };
    };
    AvailConfiguration: AvailConfiguration & {
      AvailSettings: AvailSettings & {
        Esam: Esam & {
          AcquisitionPointId: __stringMax256;
          PoisEndpoint: __stringMax2048;
        };
      };
    };
    BlackoutSlate: BlackoutSlate & {
      BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
      NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
    };
    CaptionDescriptions: (CaptionDescription & {
      CaptionSelectorName: string;
      Name: string;
      DestinationSettings: CaptionDestinationSettings & {
        BurnInDestinationSettings: BurnInDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
        DvbSubDestinationSettings: DvbSubDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
      };
    })[];
    GlobalConfiguration: GlobalConfiguration & {
      InputLossBehavior: InputLossBehavior & {
        InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
      };
    };
    MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
      MotionGraphicsSettings: MotionGraphicsSettings;
    };
    ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
    ColorCorrectionSettings: ColorCorrectionSettings & {
      GlobalColorCorrections: (ColorCorrection & {
        InputColorSpace: ColorSpace;
        OutputColorSpace: ColorSpace;
        Uri: string;
      })[];
    };
  };
  Id?: string;
  InputAttachments?: (InputAttachment & {
    AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
      SecondaryInputId: string;
      FailoverConditions: (FailoverCondition & {
        FailoverConditionSettings: FailoverConditionSettings & {
          AudioSilenceSettings: AudioSilenceFailoverSettings & {
            AudioSelectorName: string;
          };
        };
      })[];
    };
    InputSettings: InputSettings & {
      AudioSelectors: (AudioSelector & {
        Name: __stringMin1;
        SelectorSettings: AudioSelectorSettings & {
          AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
            GroupId: __stringMin1;
            Name: __stringMin1;
          };
          AudioLanguageSelection: AudioLanguageSelection & {
            LanguageCode: string;
          };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
          };
          AudioTrackSelection: AudioTrackSelection & {
            Tracks: (AudioTrack & {
              Track: __integerMin1;
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
            DolbyEDecode: AudioDolbyEDecode & {
              ProgramSelection: DolbyEProgramSelection;
            };
          };
        };
      })[];
      CaptionSelectors: (CaptionSelector & {
        Name: __stringMin1;
        SelectorSettings: CaptionSelectorSettings & {
          TeletextSourceSettings: TeletextSourceSettings & {
            OutputRectangle: CaptionRectangle & {
              Height: __doubleMin0Max100;
              LeftOffset: __doubleMin0Max100;
              TopOffset: __doubleMin0Max100;
              Width: __doubleMin0Max100;
            };
          };
        };
      })[];
    };
  })[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  Name?: string;
  PipelineDetails?: PipelineDetail[];
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export const DescribeChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CdiInputSpecification: S.optional(CdiInputSpecification),
    ChannelClass: S.optional(ChannelClass),
    Destinations: S.optional(__listOfOutputDestination),
    EgressEndpoints: S.optional(__listOfChannelEgressEndpoint),
    EncoderSettings: S.optional(EncoderSettings),
    Id: S.optional(S.String),
    InputAttachments: S.optional(__listOfInputAttachment),
    InputSpecification: S.optional(InputSpecification),
    LogLevel: S.optional(LogLevel),
    Maintenance: S.optional(MaintenanceStatus),
    Name: S.optional(S.String),
    PipelineDetails: S.optional(__listOfPipelineDetail),
    PipelinesRunningCount: S.optional(S.Number),
    RoleArn: S.optional(S.String),
    State: S.optional(ChannelState),
    Tags: S.optional(Tags),
    Vpc: S.optional(VpcOutputSettingsDescription),
    AnywhereSettings: S.optional(DescribeAnywhereSettings),
    ChannelEngineVersion: S.optional(ChannelEngineVersionResponse),
    LinkedChannelSettings: S.optional(DescribeLinkedChannelSettings),
    ChannelSecurityGroups: S.optional(__listOf__string),
    InferenceSettings: S.optional(DescribeInferenceSettings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CdiInputSpecification: "cdiInputSpecification",
      ChannelClass: "channelClass",
      Destinations: "destinations",
      EgressEndpoints: "egressEndpoints",
      EncoderSettings: "encoderSettings",
      Id: "id",
      InputAttachments: "inputAttachments",
      InputSpecification: "inputSpecification",
      LogLevel: "logLevel",
      Maintenance: "maintenance",
      Name: "name",
      PipelineDetails: "pipelineDetails",
      PipelinesRunningCount: "pipelinesRunningCount",
      RoleArn: "roleArn",
      State: "state",
      Tags: "tags",
      Vpc: "vpc",
      AnywhereSettings: "anywhereSettings",
      ChannelEngineVersion: "channelEngineVersion",
      LinkedChannelSettings: "linkedChannelSettings",
      ChannelSecurityGroups: "channelSecurityGroups",
      InferenceSettings: "inferenceSettings",
    }),
  ),
).annotate({
  identifier: "DescribeChannelResponse",
}) as any as S.Schema<DescribeChannelResponse>;
export interface DescribeChannelPlacementGroupRequest {
  ChannelPlacementGroupId: string;
  ClusterId: string;
}
export const DescribeChannelPlacementGroupRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ChannelPlacementGroupId: S.String.pipe(
        T.HttpLabel("ChannelPlacementGroupId"),
      ),
      ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/prod/clusters/{ClusterId}/channelplacementgroups/{ChannelPlacementGroupId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeChannelPlacementGroupRequest",
}) as any as S.Schema<DescribeChannelPlacementGroupRequest>;
export interface DescribeChannelPlacementGroupResponse {
  Arn?: string;
  Channels?: string[];
  ClusterId?: string;
  Id?: string;
  Name?: string;
  Nodes?: string[];
  State?: ChannelPlacementGroupState;
}
export const DescribeChannelPlacementGroupResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      Channels: S.optional(__listOf__string),
      ClusterId: S.optional(S.String),
      Id: S.optional(S.String),
      Name: S.optional(S.String),
      Nodes: S.optional(__listOf__string),
      State: S.optional(ChannelPlacementGroupState),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        Channels: "channels",
        ClusterId: "clusterId",
        Id: "id",
        Name: "name",
        Nodes: "nodes",
        State: "state",
      }),
    ),
).annotate({
  identifier: "DescribeChannelPlacementGroupResponse",
}) as any as S.Schema<DescribeChannelPlacementGroupResponse>;
export interface DescribeClusterRequest {
  ClusterId: string;
}
export const DescribeClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ClusterId: S.String.pipe(T.HttpLabel("ClusterId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/clusters/{ClusterId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeClusterRequest",
}) as any as S.Schema<DescribeClusterRequest>;
export interface DescribeClusterResponse {
  Arn?: string;
  ChannelIds?: string[];
  ClusterType?: ClusterType;
  Id?: string;
  InstanceRoleArn?: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettings;
  State?: ClusterState;
}
export const DescribeClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelIds: S.optional(__listOf__string),
    ClusterType: S.optional(ClusterType),
    Id: S.optional(S.String),
    InstanceRoleArn: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkSettings: S.optional(ClusterNetworkSettings),
    State: S.optional(ClusterState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ChannelIds: "channelIds",
      ClusterType: "clusterType",
      Id: "id",
      InstanceRoleArn: "instanceRoleArn",
      Name: "name",
      NetworkSettings: "networkSettings",
      State: "state",
    }),
  ),
).annotate({
  identifier: "DescribeClusterResponse",
}) as any as S.Schema<DescribeClusterResponse>;
export interface DescribeInputRequest {
  InputId: string;
}
export const DescribeInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputId: S.String.pipe(T.HttpLabel("InputId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/inputs/{InputId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInputRequest",
}) as any as S.Schema<DescribeInputRequest>;
export interface DescribeInputResponse {
  Arn?: string;
  AttachedChannels?: string[];
  Destinations?: InputDestination[];
  Id?: string;
  InputClass?: InputClass;
  InputDevices?: InputDeviceSettings[];
  InputPartnerIds?: string[];
  InputSourceType?: InputSourceType;
  MediaConnectFlows?: MediaConnectFlow[];
  Name?: string;
  RoleArn?: string;
  SecurityGroups?: string[];
  Sources?: InputSource[];
  State?: InputState;
  Tags?: { [key: string]: string | undefined };
  Type?: InputType;
  SrtSettings?: SrtSettings & {
    SrtListenerSettings: SrtListenerSettings & {
      Decryption: SrtListenerDecryption & {
        Algorithm: Algorithm;
        PassphraseSecretArn: string;
      };
    };
  };
  InputNetworkLocation?: InputNetworkLocation;
  MulticastSettings?: MulticastSettings & {
    Sources: (MulticastSource & { Url: string })[];
  };
  Smpte2110ReceiverGroupSettings?: Smpte2110ReceiverGroupSettings;
  SdiSources?: string[];
  RouterSettings?: RouterInputSettings;
}
export const DescribeInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AttachedChannels: S.optional(__listOf__string),
    Destinations: S.optional(__listOfInputDestination),
    Id: S.optional(S.String),
    InputClass: S.optional(InputClass),
    InputDevices: S.optional(__listOfInputDeviceSettings),
    InputPartnerIds: S.optional(__listOf__string),
    InputSourceType: S.optional(InputSourceType),
    MediaConnectFlows: S.optional(__listOfMediaConnectFlow),
    Name: S.optional(S.String),
    RoleArn: S.optional(S.String),
    SecurityGroups: S.optional(__listOf__string),
    Sources: S.optional(__listOfInputSource),
    State: S.optional(InputState),
    Tags: S.optional(Tags),
    Type: S.optional(InputType),
    SrtSettings: S.optional(SrtSettings),
    InputNetworkLocation: S.optional(InputNetworkLocation),
    MulticastSettings: S.optional(MulticastSettings),
    Smpte2110ReceiverGroupSettings: S.optional(Smpte2110ReceiverGroupSettings),
    SdiSources: S.optional(InputSdiSources),
    RouterSettings: S.optional(RouterInputSettings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AttachedChannels: "attachedChannels",
      Destinations: "destinations",
      Id: "id",
      InputClass: "inputClass",
      InputDevices: "inputDevices",
      InputPartnerIds: "inputPartnerIds",
      InputSourceType: "inputSourceType",
      MediaConnectFlows: "mediaConnectFlows",
      Name: "name",
      RoleArn: "roleArn",
      SecurityGroups: "securityGroups",
      Sources: "sources",
      State: "state",
      Tags: "tags",
      Type: "type",
      SrtSettings: "srtSettings",
      InputNetworkLocation: "inputNetworkLocation",
      MulticastSettings: "multicastSettings",
      Smpte2110ReceiverGroupSettings: "smpte2110ReceiverGroupSettings",
      SdiSources: "sdiSources",
      RouterSettings: "routerSettings",
    }),
  ),
).annotate({
  identifier: "DescribeInputResponse",
}) as any as S.Schema<DescribeInputResponse>;
export interface DescribeInputDeviceRequest {
  InputDeviceId: string;
}
export const DescribeInputDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/inputDevices/{InputDeviceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInputDeviceRequest",
}) as any as S.Schema<DescribeInputDeviceRequest>;
export type InputDeviceConnectionState =
  | "DISCONNECTED"
  | "CONNECTED"
  | (string & {});
export const InputDeviceConnectionState = /*@__PURE__*/ S.String;

export type DeviceSettingsSyncState = "SYNCED" | "SYNCING" | (string & {});
export const DeviceSettingsSyncState = /*@__PURE__*/ S.String;

export type DeviceUpdateStatus =
  | "UP_TO_DATE"
  | "NOT_UP_TO_DATE"
  | "UPDATING"
  | (string & {});
export const DeviceUpdateStatus = /*@__PURE__*/ S.String;

export type InputDeviceActiveInput = "HDMI" | "SDI" | (string & {});
export const InputDeviceActiveInput = /*@__PURE__*/ S.String;

export type InputDeviceConfiguredInput =
  | "AUTO"
  | "HDMI"
  | "SDI"
  | (string & {});
export const InputDeviceConfiguredInput = /*@__PURE__*/ S.String;

export type InputDeviceState = "IDLE" | "STREAMING" | (string & {});
export const InputDeviceState = /*@__PURE__*/ S.String;

export type InputDeviceScanType = "INTERLACED" | "PROGRESSIVE" | (string & {});
export const InputDeviceScanType = /*@__PURE__*/ S.String;

export interface InputDeviceHdSettings {
  ActiveInput?: InputDeviceActiveInput;
  ConfiguredInput?: InputDeviceConfiguredInput;
  DeviceState?: InputDeviceState;
  Framerate?: number;
  Height?: number;
  MaxBitrate?: number;
  ScanType?: InputDeviceScanType;
  Width?: number;
  LatencyMs?: number;
}
export const InputDeviceHdSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActiveInput: S.optional(InputDeviceActiveInput),
    ConfiguredInput: S.optional(InputDeviceConfiguredInput),
    DeviceState: S.optional(InputDeviceState),
    Framerate: S.optional(S.Number),
    Height: S.optional(S.Number),
    MaxBitrate: S.optional(S.Number),
    ScanType: S.optional(InputDeviceScanType),
    Width: S.optional(S.Number),
    LatencyMs: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      ActiveInput: "activeInput",
      ConfiguredInput: "configuredInput",
      DeviceState: "deviceState",
      Framerate: "framerate",
      Height: "height",
      MaxBitrate: "maxBitrate",
      ScanType: "scanType",
      Width: "width",
      LatencyMs: "latencyMs",
    }),
  ),
).annotate({
  identifier: "InputDeviceHdSettings",
}) as any as S.Schema<InputDeviceHdSettings>;
export type InputDeviceIpScheme = "STATIC" | "DHCP" | (string & {});
export const InputDeviceIpScheme = /*@__PURE__*/ S.String;

export interface InputDeviceNetworkSettings {
  DnsAddresses?: string[];
  Gateway?: string;
  IpAddress?: string;
  IpScheme?: InputDeviceIpScheme;
  SubnetMask?: string;
}
export const InputDeviceNetworkSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DnsAddresses: S.optional(__listOf__string),
    Gateway: S.optional(S.String),
    IpAddress: S.optional(S.String),
    IpScheme: S.optional(InputDeviceIpScheme),
    SubnetMask: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DnsAddresses: "dnsAddresses",
      Gateway: "gateway",
      IpAddress: "ipAddress",
      IpScheme: "ipScheme",
      SubnetMask: "subnetMask",
    }),
  ),
).annotate({
  identifier: "InputDeviceNetworkSettings",
}) as any as S.Schema<InputDeviceNetworkSettings>;
export type InputDeviceType = "HD" | "UHD" | (string & {});
export const InputDeviceType = /*@__PURE__*/ S.String;

export type InputDeviceCodec = "HEVC" | "AVC" | (string & {});
export const InputDeviceCodec = /*@__PURE__*/ S.String;

export interface InputDeviceMediaConnectSettings {
  FlowArn?: string;
  RoleArn?: string;
  SecretArn?: string;
  SourceName?: string;
}
export const InputDeviceMediaConnectSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FlowArn: S.optional(S.String),
    RoleArn: S.optional(S.String),
    SecretArn: S.optional(S.String),
    SourceName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      FlowArn: "flowArn",
      RoleArn: "roleArn",
      SecretArn: "secretArn",
      SourceName: "sourceName",
    }),
  ),
).annotate({
  identifier: "InputDeviceMediaConnectSettings",
}) as any as S.Schema<InputDeviceMediaConnectSettings>;
export type InputDeviceUhdAudioChannelPairProfile =
  | "DISABLED"
  | "VBR-AAC_HHE-16000"
  | "VBR-AAC_HE-64000"
  | "VBR-AAC_LC-128000"
  | "CBR-AAC_HQ-192000"
  | "CBR-AAC_HQ-256000"
  | "CBR-AAC_HQ-384000"
  | "CBR-AAC_HQ-512000"
  | (string & {});
export const InputDeviceUhdAudioChannelPairProfile = /*@__PURE__*/ S.String;

export interface InputDeviceUhdAudioChannelPairConfig {
  Id?: number;
  Profile?: InputDeviceUhdAudioChannelPairProfile;
}
export const InputDeviceUhdAudioChannelPairConfig = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Id: S.optional(S.Number),
      Profile: S.optional(InputDeviceUhdAudioChannelPairProfile),
    }).pipe(S.encodeKeys({ Id: "id", Profile: "profile" })),
).annotate({
  identifier: "InputDeviceUhdAudioChannelPairConfig",
}) as any as S.Schema<InputDeviceUhdAudioChannelPairConfig>;
export type __listOfInputDeviceUhdAudioChannelPairConfig =
  InputDeviceUhdAudioChannelPairConfig[];
export const __listOfInputDeviceUhdAudioChannelPairConfig =
  /*@__PURE__*/ S.Array(InputDeviceUhdAudioChannelPairConfig);
export interface InputDeviceUhdSettings {
  ActiveInput?: InputDeviceActiveInput;
  ConfiguredInput?: InputDeviceConfiguredInput;
  DeviceState?: InputDeviceState;
  Framerate?: number;
  Height?: number;
  MaxBitrate?: number;
  ScanType?: InputDeviceScanType;
  Width?: number;
  LatencyMs?: number;
  Codec?: InputDeviceCodec;
  MediaconnectSettings?: InputDeviceMediaConnectSettings;
  AudioChannelPairs?: InputDeviceUhdAudioChannelPairConfig[];
  InputResolution?: string;
}
export const InputDeviceUhdSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActiveInput: S.optional(InputDeviceActiveInput),
    ConfiguredInput: S.optional(InputDeviceConfiguredInput),
    DeviceState: S.optional(InputDeviceState),
    Framerate: S.optional(S.Number),
    Height: S.optional(S.Number),
    MaxBitrate: S.optional(S.Number),
    ScanType: S.optional(InputDeviceScanType),
    Width: S.optional(S.Number),
    LatencyMs: S.optional(S.Number),
    Codec: S.optional(InputDeviceCodec),
    MediaconnectSettings: S.optional(InputDeviceMediaConnectSettings),
    AudioChannelPairs: S.optional(__listOfInputDeviceUhdAudioChannelPairConfig),
    InputResolution: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ActiveInput: "activeInput",
      ConfiguredInput: "configuredInput",
      DeviceState: "deviceState",
      Framerate: "framerate",
      Height: "height",
      MaxBitrate: "maxBitrate",
      ScanType: "scanType",
      Width: "width",
      LatencyMs: "latencyMs",
      Codec: "codec",
      MediaconnectSettings: "mediaconnectSettings",
      AudioChannelPairs: "audioChannelPairs",
      InputResolution: "inputResolution",
    }),
  ),
).annotate({
  identifier: "InputDeviceUhdSettings",
}) as any as S.Schema<InputDeviceUhdSettings>;
export type InputDeviceOutputType =
  | "NONE"
  | "MEDIALIVE_INPUT"
  | "MEDIACONNECT_FLOW"
  | (string & {});
export const InputDeviceOutputType = /*@__PURE__*/ S.String;

export interface DescribeInputDeviceResponse {
  Arn?: string;
  ConnectionState?: InputDeviceConnectionState;
  DeviceSettingsSyncState?: DeviceSettingsSyncState;
  DeviceUpdateStatus?: DeviceUpdateStatus;
  HdDeviceSettings?: InputDeviceHdSettings;
  Id?: string;
  MacAddress?: string;
  Name?: string;
  NetworkSettings?: InputDeviceNetworkSettings;
  SerialNumber?: string;
  Type?: InputDeviceType;
  UhdDeviceSettings?: InputDeviceUhdSettings;
  Tags?: { [key: string]: string | undefined };
  AvailabilityZone?: string;
  MedialiveInputArns?: string[];
  OutputType?: InputDeviceOutputType;
}
export const DescribeInputDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ConnectionState: S.optional(InputDeviceConnectionState),
    DeviceSettingsSyncState: S.optional(DeviceSettingsSyncState),
    DeviceUpdateStatus: S.optional(DeviceUpdateStatus),
    HdDeviceSettings: S.optional(InputDeviceHdSettings),
    Id: S.optional(S.String),
    MacAddress: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkSettings: S.optional(InputDeviceNetworkSettings),
    SerialNumber: S.optional(S.String),
    Type: S.optional(InputDeviceType),
    UhdDeviceSettings: S.optional(InputDeviceUhdSettings),
    Tags: S.optional(Tags),
    AvailabilityZone: S.optional(S.String),
    MedialiveInputArns: S.optional(__listOf__string),
    OutputType: S.optional(InputDeviceOutputType),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ConnectionState: "connectionState",
      DeviceSettingsSyncState: "deviceSettingsSyncState",
      DeviceUpdateStatus: "deviceUpdateStatus",
      HdDeviceSettings: "hdDeviceSettings",
      Id: "id",
      MacAddress: "macAddress",
      Name: "name",
      NetworkSettings: "networkSettings",
      SerialNumber: "serialNumber",
      Type: "type",
      UhdDeviceSettings: "uhdDeviceSettings",
      Tags: "tags",
      AvailabilityZone: "availabilityZone",
      MedialiveInputArns: "medialiveInputArns",
      OutputType: "outputType",
    }),
  ),
).annotate({
  identifier: "DescribeInputDeviceResponse",
}) as any as S.Schema<DescribeInputDeviceResponse>;
export type AcceptHeader = "image/jpeg" | (string & {});
export const AcceptHeader = /*@__PURE__*/ S.String;

export interface DescribeInputDeviceThumbnailRequest {
  InputDeviceId: string;
  Accept?: AcceptHeader;
}
export const DescribeInputDeviceThumbnailRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")),
    Accept: S.optional(AcceptHeader).pipe(T.HttpHeader("accept")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/prod/inputDevices/{InputDeviceId}/thumbnailData",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInputDeviceThumbnailRequest",
}) as any as S.Schema<DescribeInputDeviceThumbnailRequest>;
export type ContentType = "image/jpeg" | (string & {});
export const ContentType = /*@__PURE__*/ S.String;

export type __timestamp = Date;
export interface DescribeInputDeviceThumbnailResponse {
  Body?: T.StreamingOutputBody;
  ContentType?: ContentType;
  ContentLength?: number;
  ETag?: string;
  LastModified?: Date;
}
export const DescribeInputDeviceThumbnailResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
      ContentType: S.optional(ContentType).pipe(T.HttpHeader("Content-Type")),
      ContentLength: S.optional(S.Number).pipe(T.HttpHeader("Content-Length")),
      ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
      LastModified: S.optional(
        S.Date.pipe(T.TimestampFormat("http-date")),
      ).pipe(T.HttpHeader("Last-Modified")),
    }).pipe(S.encodeKeys({ Body: "body" })),
).annotate({
  identifier: "DescribeInputDeviceThumbnailResponse",
}) as any as S.Schema<DescribeInputDeviceThumbnailResponse>;
export interface DescribeInputSecurityGroupRequest {
  InputSecurityGroupId: string;
}
export const DescribeInputSecurityGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputSecurityGroupId: S.String.pipe(T.HttpLabel("InputSecurityGroupId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/prod/inputSecurityGroups/{InputSecurityGroupId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeInputSecurityGroupRequest",
}) as any as S.Schema<DescribeInputSecurityGroupRequest>;
export interface DescribeInputSecurityGroupResponse {
  Arn?: string;
  Id?: string;
  Inputs?: string[];
  State?: InputSecurityGroupState;
  Tags?: { [key: string]: string | undefined };
  WhitelistRules?: InputWhitelistRule[];
  Channels?: string[];
}
export const DescribeInputSecurityGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Inputs: S.optional(__listOf__string),
    State: S.optional(InputSecurityGroupState),
    Tags: S.optional(Tags),
    WhitelistRules: S.optional(__listOfInputWhitelistRule),
    Channels: S.optional(__listOf__string),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Id: "id",
      Inputs: "inputs",
      State: "state",
      Tags: "tags",
      WhitelistRules: "whitelistRules",
      Channels: "channels",
    }),
  ),
).annotate({
  identifier: "DescribeInputSecurityGroupResponse",
}) as any as S.Schema<DescribeInputSecurityGroupResponse>;
export interface DescribeMultiplexRequest {
  MultiplexId: string;
}
export const DescribeMultiplexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/multiplexes/{MultiplexId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMultiplexRequest",
}) as any as S.Schema<DescribeMultiplexRequest>;
export interface DescribeMultiplexResponse {
  Arn?: string;
  AvailabilityZones?: string[];
  Destinations?: MultiplexOutputDestination[];
  Id?: string;
  MultiplexSettings?: MultiplexSettings & {
    TransportStreamBitrate: __integerMin1000000Max100000000;
    TransportStreamId: __integerMin0Max65535;
  };
  Name?: string;
  PipelinesRunningCount?: number;
  ProgramCount?: number;
  State?: MultiplexState;
  Tags?: { [key: string]: string | undefined };
}
export const DescribeMultiplexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AvailabilityZones: S.optional(__listOf__string),
    Destinations: S.optional(__listOfMultiplexOutputDestination),
    Id: S.optional(S.String),
    MultiplexSettings: S.optional(MultiplexSettings),
    Name: S.optional(S.String),
    PipelinesRunningCount: S.optional(S.Number),
    ProgramCount: S.optional(S.Number),
    State: S.optional(MultiplexState),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AvailabilityZones: "availabilityZones",
      Destinations: "destinations",
      Id: "id",
      MultiplexSettings: "multiplexSettings",
      Name: "name",
      PipelinesRunningCount: "pipelinesRunningCount",
      ProgramCount: "programCount",
      State: "state",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "DescribeMultiplexResponse",
}) as any as S.Schema<DescribeMultiplexResponse>;
export interface DescribeMultiplexProgramRequest {
  MultiplexId: string;
  ProgramName: string;
}
export const DescribeMultiplexProgramRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
    ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/prod/multiplexes/{MultiplexId}/programs/{ProgramName}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeMultiplexProgramRequest",
}) as any as S.Schema<DescribeMultiplexProgramRequest>;
export interface DescribeMultiplexProgramResponse {
  ChannelId?: string;
  MultiplexProgramSettings?: MultiplexProgramSettings & {
    ProgramNumber: __integerMin0Max65535;
    ServiceDescriptor: MultiplexProgramServiceDescriptor & {
      ProviderName: __stringMax256;
      ServiceName: __stringMax256;
    };
  };
  PacketIdentifiersMap?: MultiplexProgramPacketIdentifiersMap;
  PipelineDetails?: MultiplexProgramPipelineDetail[];
  ProgramName?: string;
}
export const DescribeMultiplexProgramResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.optional(S.String),
    MultiplexProgramSettings: S.optional(MultiplexProgramSettings),
    PacketIdentifiersMap: S.optional(MultiplexProgramPacketIdentifiersMap),
    PipelineDetails: S.optional(__listOfMultiplexProgramPipelineDetail),
    ProgramName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ChannelId: "channelId",
      MultiplexProgramSettings: "multiplexProgramSettings",
      PacketIdentifiersMap: "packetIdentifiersMap",
      PipelineDetails: "pipelineDetails",
      ProgramName: "programName",
    }),
  ),
).annotate({
  identifier: "DescribeMultiplexProgramResponse",
}) as any as S.Schema<DescribeMultiplexProgramResponse>;
export interface DescribeNetworkRequest {
  NetworkId: string;
}
export const DescribeNetworkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ NetworkId: S.String.pipe(T.HttpLabel("NetworkId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/networks/{NetworkId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeNetworkRequest",
}) as any as S.Schema<DescribeNetworkRequest>;
export interface DescribeNetworkResponse {
  Arn?: string;
  AssociatedClusterIds?: string[];
  Id?: string;
  IpPools?: IpPool[];
  Name?: string;
  Routes?: Route[];
  State?: NetworkState;
}
export const DescribeNetworkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssociatedClusterIds: S.optional(__listOf__string),
    Id: S.optional(S.String),
    IpPools: S.optional(__listOfIpPool),
    Name: S.optional(S.String),
    Routes: S.optional(__listOfRoute),
    State: S.optional(NetworkState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AssociatedClusterIds: "associatedClusterIds",
      Id: "id",
      IpPools: "ipPools",
      Name: "name",
      Routes: "routes",
      State: "state",
    }),
  ),
).annotate({
  identifier: "DescribeNetworkResponse",
}) as any as S.Schema<DescribeNetworkResponse>;
export interface DescribeNodeRequest {
  ClusterId: string;
  NodeId: string;
}
export const DescribeNodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    NodeId: S.String.pipe(T.HttpLabel("NodeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/prod/clusters/{ClusterId}/nodes/{NodeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeNodeRequest",
}) as any as S.Schema<DescribeNodeRequest>;
export interface DescribeNodeResponse {
  Arn?: string;
  ChannelPlacementGroups?: string[];
  ClusterId?: string;
  ConnectionState?: NodeConnectionState;
  Id?: string;
  InstanceArn?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  Role?: NodeRole;
  State?: NodeState;
  SdiSourceMappings?: SdiSourceMapping[];
}
export const DescribeNodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelPlacementGroups: S.optional(__listOf__string),
    ClusterId: S.optional(S.String),
    ConnectionState: S.optional(NodeConnectionState),
    Id: S.optional(S.String),
    InstanceArn: S.optional(S.String),
    Name: S.optional(S.String),
    NodeInterfaceMappings: S.optional(__listOfNodeInterfaceMapping),
    Role: S.optional(NodeRole),
    State: S.optional(NodeState),
    SdiSourceMappings: S.optional(SdiSourceMappings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ChannelPlacementGroups: "channelPlacementGroups",
      ClusterId: "clusterId",
      ConnectionState: "connectionState",
      Id: "id",
      InstanceArn: "instanceArn",
      Name: "name",
      NodeInterfaceMappings: "nodeInterfaceMappings",
      Role: "role",
      State: "state",
      SdiSourceMappings: "sdiSourceMappings",
    }),
  ),
).annotate({
  identifier: "DescribeNodeResponse",
}) as any as S.Schema<DescribeNodeResponse>;
export interface DescribeOfferingRequest {
  OfferingId: string;
}
export const DescribeOfferingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OfferingId: S.String.pipe(T.HttpLabel("OfferingId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/offerings/{OfferingId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeOfferingRequest",
}) as any as S.Schema<DescribeOfferingRequest>;
export interface DescribeOfferingResponse {
  Arn?: string;
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: OfferingDurationUnits;
  FixedPrice?: number;
  OfferingDescription?: string;
  OfferingId?: string;
  OfferingType?: OfferingType;
  Region?: string;
  ResourceSpecification?: ReservationResourceSpecification;
  UsagePrice?: number;
}
export const DescribeOfferingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CurrencyCode: S.optional(S.String),
    Duration: S.optional(S.Number),
    DurationUnits: S.optional(OfferingDurationUnits),
    FixedPrice: S.optional(S.Number),
    OfferingDescription: S.optional(S.String),
    OfferingId: S.optional(S.String),
    OfferingType: S.optional(OfferingType),
    Region: S.optional(S.String),
    ResourceSpecification: S.optional(ReservationResourceSpecification),
    UsagePrice: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CurrencyCode: "currencyCode",
      Duration: "duration",
      DurationUnits: "durationUnits",
      FixedPrice: "fixedPrice",
      OfferingDescription: "offeringDescription",
      OfferingId: "offeringId",
      OfferingType: "offeringType",
      Region: "region",
      ResourceSpecification: "resourceSpecification",
      UsagePrice: "usagePrice",
    }),
  ),
).annotate({
  identifier: "DescribeOfferingResponse",
}) as any as S.Schema<DescribeOfferingResponse>;
export interface DescribeReservationRequest {
  ReservationId: string;
}
export const DescribeReservationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ReservationId: S.String.pipe(T.HttpLabel("ReservationId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/reservations/{ReservationId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeReservationRequest",
}) as any as S.Schema<DescribeReservationRequest>;
export interface DescribeReservationResponse {
  Arn?: string;
  Count?: number;
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: OfferingDurationUnits;
  End?: string;
  FixedPrice?: number;
  Name?: string;
  OfferingDescription?: string;
  OfferingId?: string;
  OfferingType?: OfferingType;
  Region?: string;
  RenewalSettings?: RenewalSettings;
  ReservationId?: string;
  ResourceSpecification?: ReservationResourceSpecification;
  Start?: string;
  State?: ReservationState;
  Tags?: { [key: string]: string | undefined };
  UsagePrice?: number;
}
export const DescribeReservationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Count: S.optional(S.Number),
    CurrencyCode: S.optional(S.String),
    Duration: S.optional(S.Number),
    DurationUnits: S.optional(OfferingDurationUnits),
    End: S.optional(S.String),
    FixedPrice: S.optional(S.Number),
    Name: S.optional(S.String),
    OfferingDescription: S.optional(S.String),
    OfferingId: S.optional(S.String),
    OfferingType: S.optional(OfferingType),
    Region: S.optional(S.String),
    RenewalSettings: S.optional(RenewalSettings),
    ReservationId: S.optional(S.String),
    ResourceSpecification: S.optional(ReservationResourceSpecification),
    Start: S.optional(S.String),
    State: S.optional(ReservationState),
    Tags: S.optional(Tags),
    UsagePrice: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Count: "count",
      CurrencyCode: "currencyCode",
      Duration: "duration",
      DurationUnits: "durationUnits",
      End: "end",
      FixedPrice: "fixedPrice",
      Name: "name",
      OfferingDescription: "offeringDescription",
      OfferingId: "offeringId",
      OfferingType: "offeringType",
      Region: "region",
      RenewalSettings: "renewalSettings",
      ReservationId: "reservationId",
      ResourceSpecification: "resourceSpecification",
      Start: "start",
      State: "state",
      Tags: "tags",
      UsagePrice: "usagePrice",
    }),
  ),
).annotate({
  identifier: "DescribeReservationResponse",
}) as any as S.Schema<DescribeReservationResponse>;
export type MaxResults = number;
export interface DescribeScheduleRequest {
  ChannelId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const DescribeScheduleRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/channels/{ChannelId}/schedule" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeScheduleRequest",
}) as any as S.Schema<DescribeScheduleRequest>;
export interface DescribeScheduleResponse {
  NextToken?: string;
  ScheduleActions?: (ScheduleAction & {
    ActionName: string;
    ScheduleActionSettings: ScheduleActionSettings & {
      HlsTimedMetadataSettings: HlsTimedMetadataScheduleActionSettings & {
        Id3: string;
      };
      InputPrepareSettings: InputPrepareScheduleActionSettings & {
        InputClippingSettings: InputClippingSettings & {
          InputTimecodeSource: InputTimecodeSource;
        };
      };
      InputSwitchSettings: InputSwitchScheduleActionSettings & {
        InputAttachmentNameReference: string;
        InputClippingSettings: InputClippingSettings & {
          InputTimecodeSource: InputTimecodeSource;
        };
      };
      PauseStateSettings: PauseStateScheduleActionSettings & {
        Pipelines: (PipelinePauseStateSettings & { PipelineId: PipelineId })[];
      };
      Scte35InputSettings: Scte35InputScheduleActionSettings & {
        Mode: Scte35InputMode;
      };
      Scte35ReturnToNetworkSettings: Scte35ReturnToNetworkScheduleActionSettings & {
        SpliceEventId: __longMin0Max4294967295;
      };
      Scte35SpliceInsertSettings: Scte35SpliceInsertScheduleActionSettings & {
        SpliceEventId: __longMin0Max4294967295;
      };
      Scte35TimeSignalSettings: Scte35TimeSignalScheduleActionSettings & {
        Scte35Descriptors: (Scte35Descriptor & {
          Scte35DescriptorSettings: Scte35DescriptorSettings & {
            SegmentationDescriptorScte35DescriptorSettings: Scte35SegmentationDescriptor & {
              SegmentationCancelIndicator: Scte35SegmentationCancelIndicator;
              SegmentationEventId: __longMin0Max4294967295;
              DeliveryRestrictions: Scte35DeliveryRestrictions & {
                ArchiveAllowedFlag: Scte35ArchiveAllowedFlag;
                DeviceRestrictions: Scte35DeviceRestrictions;
                NoRegionalBlackoutFlag: Scte35NoRegionalBlackoutFlag;
                WebDeliveryAllowedFlag: Scte35WebDeliveryAllowedFlag;
              };
            };
          };
        })[];
      };
      StaticImageActivateSettings: StaticImageActivateScheduleActionSettings & {
        Image: InputLocation & { Uri: __stringMax2048 };
      };
      StaticImageOutputActivateSettings: StaticImageOutputActivateScheduleActionSettings & {
        Image: InputLocation & { Uri: __stringMax2048 };
        OutputNames: __listOf__string;
      };
      StaticImageOutputDeactivateSettings: StaticImageOutputDeactivateScheduleActionSettings & {
        OutputNames: __listOf__string;
      };
      TimedMetadataSettings: TimedMetadataScheduleActionSettings & {
        Id3: string;
      };
    };
    ScheduleActionStartSettings: ScheduleActionStartSettings & {
      FixedModeScheduleActionStartSettings: FixedModeScheduleActionStartSettings & {
        Time: string;
      };
      FollowModeScheduleActionStartSettings: FollowModeScheduleActionStartSettings & {
        FollowPoint: FollowPoint;
        ReferenceActionName: string;
      };
    };
  })[];
}
export const DescribeScheduleResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ScheduleActions: S.optional(__listOfScheduleAction),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      ScheduleActions: "scheduleActions",
    }),
  ),
).annotate({
  identifier: "DescribeScheduleResponse",
}) as any as S.Schema<DescribeScheduleResponse>;
export interface DescribeSdiSourceRequest {
  SdiSourceId: string;
}
export const DescribeSdiSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SdiSourceId: S.String.pipe(T.HttpLabel("SdiSourceId")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/sdiSources/{SdiSourceId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeSdiSourceRequest",
}) as any as S.Schema<DescribeSdiSourceRequest>;
export interface DescribeSdiSourceResponse {
  SdiSource?: SdiSource;
}
export const DescribeSdiSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SdiSource: S.optional(SdiSource) }).pipe(
    S.encodeKeys({ SdiSource: "sdiSource" }),
  ),
).annotate({
  identifier: "DescribeSdiSourceResponse",
}) as any as S.Schema<DescribeSdiSourceResponse>;
export interface DescribeThumbnailsRequest {
  ChannelId: string;
  PipelineId?: string;
  ThumbnailType?: string;
}
export const DescribeThumbnailsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
    PipelineId: S.optional(S.String).pipe(T.HttpQuery("pipelineId")),
    ThumbnailType: S.optional(S.String).pipe(T.HttpQuery("thumbnailType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/channels/{ChannelId}/thumbnails" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeThumbnailsRequest",
}) as any as S.Schema<DescribeThumbnailsRequest>;
export type ThumbnailType = "UNSPECIFIED" | "CURRENT_ACTIVE" | (string & {});
export const ThumbnailType = /*@__PURE__*/ S.String;

export interface Thumbnail {
  Body?: string;
  ContentType?: string;
  ThumbnailType?: ThumbnailType;
  TimeStamp?: Date;
}
export const Thumbnail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Body: S.optional(S.String),
    ContentType: S.optional(S.String),
    ThumbnailType: S.optional(ThumbnailType),
    TimeStamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
  }).pipe(
    S.encodeKeys({
      Body: "body",
      ContentType: "contentType",
      ThumbnailType: "thumbnailType",
      TimeStamp: "timeStamp",
    }),
  ),
).annotate({ identifier: "Thumbnail" }) as any as S.Schema<Thumbnail>;
export type __listOfThumbnail = Thumbnail[];
export const __listOfThumbnail = /*@__PURE__*/ S.Array(Thumbnail);
export interface ThumbnailDetail {
  PipelineId?: string;
  Thumbnails?: Thumbnail[];
}
export const ThumbnailDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PipelineId: S.optional(S.String),
    Thumbnails: S.optional(__listOfThumbnail),
  }).pipe(S.encodeKeys({ PipelineId: "pipelineId", Thumbnails: "thumbnails" })),
).annotate({
  identifier: "ThumbnailDetail",
}) as any as S.Schema<ThumbnailDetail>;
export type __listOfThumbnailDetail = ThumbnailDetail[];
export const __listOfThumbnailDetail = /*@__PURE__*/ S.Array(ThumbnailDetail);
export interface DescribeThumbnailsResponse {
  ThumbnailDetails?: ThumbnailDetail[];
}
export const DescribeThumbnailsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ThumbnailDetails: S.optional(__listOfThumbnailDetail) }).pipe(
    S.encodeKeys({ ThumbnailDetails: "thumbnailDetails" }),
  ),
).annotate({
  identifier: "DescribeThumbnailsResponse",
}) as any as S.Schema<DescribeThumbnailsResponse>;
export interface GetCloudWatchAlarmTemplateRequest {
  Identifier: string;
}
export const GetCloudWatchAlarmTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/prod/cloudwatch-alarm-templates/{Identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetCloudWatchAlarmTemplateRequest",
}) as any as S.Schema<GetCloudWatchAlarmTemplateRequest>;
export interface GetCloudWatchAlarmTemplateResponse {
  Arn?: string;
  ComparisonOperator?: CloudWatchAlarmTemplateComparisonOperator;
  CreatedAt?: Date;
  DatapointsToAlarm?: number;
  Description?: string;
  EvaluationPeriods?: number;
  GroupId?: string;
  Id?: string;
  MetricName?: string;
  ModifiedAt?: Date;
  Name?: string;
  Period?: number;
  Statistic?: CloudWatchAlarmTemplateStatistic;
  Tags?: { [key: string]: string | undefined };
  TargetResourceType?: CloudWatchAlarmTemplateTargetResourceType;
  Threshold?: number;
  TreatMissingData?: CloudWatchAlarmTemplateTreatMissingData;
}
export const GetCloudWatchAlarmTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ComparisonOperator: S.optional(CloudWatchAlarmTemplateComparisonOperator),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DatapointsToAlarm: S.optional(S.Number),
    Description: S.optional(S.String),
    EvaluationPeriods: S.optional(S.Number),
    GroupId: S.optional(S.String),
    Id: S.optional(S.String),
    MetricName: S.optional(S.String),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    Period: S.optional(S.Number),
    Statistic: S.optional(CloudWatchAlarmTemplateStatistic),
    Tags: S.optional(TagMap),
    TargetResourceType: S.optional(CloudWatchAlarmTemplateTargetResourceType),
    Threshold: S.optional(S.Number),
    TreatMissingData: S.optional(CloudWatchAlarmTemplateTreatMissingData),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ComparisonOperator: "comparisonOperator",
      CreatedAt: "createdAt",
      DatapointsToAlarm: "datapointsToAlarm",
      Description: "description",
      EvaluationPeriods: "evaluationPeriods",
      GroupId: "groupId",
      Id: "id",
      MetricName: "metricName",
      ModifiedAt: "modifiedAt",
      Name: "name",
      Period: "period",
      Statistic: "statistic",
      Tags: "tags",
      TargetResourceType: "targetResourceType",
      Threshold: "threshold",
      TreatMissingData: "treatMissingData",
    }),
  ),
).annotate({
  identifier: "GetCloudWatchAlarmTemplateResponse",
}) as any as S.Schema<GetCloudWatchAlarmTemplateResponse>;
export interface GetCloudWatchAlarmTemplateGroupRequest {
  Identifier: string;
}
export const GetCloudWatchAlarmTemplateGroupRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/prod/cloudwatch-alarm-template-groups/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetCloudWatchAlarmTemplateGroupRequest",
}) as any as S.Schema<GetCloudWatchAlarmTemplateGroupRequest>;
export interface GetCloudWatchAlarmTemplateGroupResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetCloudWatchAlarmTemplateGroupResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Description: S.optional(S.String),
      Id: S.optional(S.String),
      ModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Name: S.optional(S.String),
      Tags: S.optional(TagMap),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        CreatedAt: "createdAt",
        Description: "description",
        Id: "id",
        ModifiedAt: "modifiedAt",
        Name: "name",
        Tags: "tags",
      }),
    ),
).annotate({
  identifier: "GetCloudWatchAlarmTemplateGroupResponse",
}) as any as S.Schema<GetCloudWatchAlarmTemplateGroupResponse>;
export interface GetEventBridgeRuleTemplateRequest {
  Identifier: string;
}
export const GetEventBridgeRuleTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/prod/eventbridge-rule-templates/{Identifier}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetEventBridgeRuleTemplateRequest",
}) as any as S.Schema<GetEventBridgeRuleTemplateRequest>;
export interface GetEventBridgeRuleTemplateResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  EventTargets?: (EventBridgeRuleTemplateTarget & {
    Arn: __stringMin1Max2048PatternArn;
  })[];
  EventType?: EventBridgeRuleTemplateEventType;
  GroupId?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetEventBridgeRuleTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    EventTargets: S.optional(__listOfEventBridgeRuleTemplateTarget),
    EventType: S.optional(EventBridgeRuleTemplateEventType),
    GroupId: S.optional(S.String),
    Id: S.optional(S.String),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    Tags: S.optional(TagMap),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreatedAt: "createdAt",
      Description: "description",
      EventTargets: "eventTargets",
      EventType: "eventType",
      GroupId: "groupId",
      Id: "id",
      ModifiedAt: "modifiedAt",
      Name: "name",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetEventBridgeRuleTemplateResponse",
}) as any as S.Schema<GetEventBridgeRuleTemplateResponse>;
export interface GetEventBridgeRuleTemplateGroupRequest {
  Identifier: string;
}
export const GetEventBridgeRuleTemplateGroupRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/prod/eventbridge-rule-template-groups/{Identifier}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "GetEventBridgeRuleTemplateGroupRequest",
}) as any as S.Schema<GetEventBridgeRuleTemplateGroupRequest>;
export interface GetEventBridgeRuleTemplateGroupResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const GetEventBridgeRuleTemplateGroupResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Description: S.optional(S.String),
      Id: S.optional(S.String),
      ModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Name: S.optional(S.String),
      Tags: S.optional(TagMap),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        CreatedAt: "createdAt",
        Description: "description",
        Id: "id",
        ModifiedAt: "modifiedAt",
        Name: "name",
        Tags: "tags",
      }),
    ),
).annotate({
  identifier: "GetEventBridgeRuleTemplateGroupResponse",
}) as any as S.Schema<GetEventBridgeRuleTemplateGroupResponse>;
export interface GetSignalMapRequest {
  Identifier: string;
}
export const GetSignalMapRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/signal-maps/{Identifier}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetSignalMapRequest",
}) as any as S.Schema<GetSignalMapRequest>;
export interface GetSignalMapResponse {
  Arn?: string;
  CloudWatchAlarmTemplateGroupIds?: string[];
  CreatedAt?: Date;
  Description?: string;
  DiscoveryEntryPointArn?: string;
  ErrorMessage?: string;
  EventBridgeRuleTemplateGroupIds?: string[];
  FailedMediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  Id?: string;
  LastDiscoveredAt?: Date;
  LastSuccessfulMonitorDeployment?: SuccessfulMonitorDeployment & {
    DetailsUri: __stringMin1Max2048;
    Status: SignalMapMonitorDeploymentStatus;
  };
  MediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & {
    Status: SignalMapMonitorDeploymentStatus;
  };
  Name?: string;
  Status?: SignalMapStatus;
  Tags?: { [key: string]: string | undefined };
}
export const GetSignalMapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CloudWatchAlarmTemplateGroupIds: S.optional(
      __listOf__stringMin7Max11PatternAws097,
    ),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DiscoveryEntryPointArn: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    EventBridgeRuleTemplateGroupIds: S.optional(
      __listOf__stringMin7Max11PatternAws097,
    ),
    FailedMediaResourceMap: S.optional(FailedMediaResourceMap),
    Id: S.optional(S.String),
    LastDiscoveredAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastSuccessfulMonitorDeployment: S.optional(SuccessfulMonitorDeployment),
    MediaResourceMap: S.optional(MediaResourceMap),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    MonitorChangesPendingDeployment: S.optional(S.Boolean),
    MonitorDeployment: S.optional(MonitorDeployment),
    Name: S.optional(S.String),
    Status: S.optional(SignalMapStatus),
    Tags: S.optional(TagMap),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CloudWatchAlarmTemplateGroupIds: "cloudWatchAlarmTemplateGroupIds",
      CreatedAt: "createdAt",
      Description: "description",
      DiscoveryEntryPointArn: "discoveryEntryPointArn",
      ErrorMessage: "errorMessage",
      EventBridgeRuleTemplateGroupIds: "eventBridgeRuleTemplateGroupIds",
      FailedMediaResourceMap: "failedMediaResourceMap",
      Id: "id",
      LastDiscoveredAt: "lastDiscoveredAt",
      LastSuccessfulMonitorDeployment: "lastSuccessfulMonitorDeployment",
      MediaResourceMap: "mediaResourceMap",
      ModifiedAt: "modifiedAt",
      MonitorChangesPendingDeployment: "monitorChangesPendingDeployment",
      MonitorDeployment: "monitorDeployment",
      Name: "name",
      Status: "status",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "GetSignalMapResponse",
}) as any as S.Schema<GetSignalMapResponse>;
export interface ListAlertsRequest {
  ChannelId: string;
  MaxResults?: number;
  NextToken?: string;
  StateFilter?: string;
}
export const ListAlertsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    StateFilter: S.optional(S.String).pipe(T.HttpQuery("stateFilter")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/channels/{ChannelId}/alerts" }),
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
export type ChannelAlertState = "SET" | "CLEARED" | (string & {});
export const ChannelAlertState = /*@__PURE__*/ S.String;

export interface ChannelAlert {
  AlertType?: string;
  ClearedTimestamp?: Date;
  Id?: string;
  Message?: string;
  PipelineId?: string;
  SetTimestamp?: Date;
  State?: ChannelAlertState;
}
export const ChannelAlert = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlertType: S.optional(S.String),
    ClearedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Id: S.optional(S.String),
    Message: S.optional(S.String),
    PipelineId: S.optional(S.String),
    SetTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    State: S.optional(ChannelAlertState),
  }).pipe(
    S.encodeKeys({
      AlertType: "alertType",
      ClearedTimestamp: "clearedTimestamp",
      Id: "id",
      Message: "message",
      PipelineId: "pipelineId",
      SetTimestamp: "setTimestamp",
      State: "state",
    }),
  ),
).annotate({ identifier: "ChannelAlert" }) as any as S.Schema<ChannelAlert>;
export type __listOfChannelAlert = ChannelAlert[];
export const __listOfChannelAlert = /*@__PURE__*/ S.Array(ChannelAlert);
export interface ListAlertsResponse {
  Alerts?: ChannelAlert[];
  NextToken?: string;
}
export const ListAlertsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Alerts: S.optional(__listOfChannelAlert),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Alerts: "alerts", NextToken: "nextToken" })),
).annotate({
  identifier: "ListAlertsResponse",
}) as any as S.Schema<ListAlertsResponse>;
export interface ListChannelPlacementGroupsRequest {
  ClusterId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListChannelPlacementGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/prod/clusters/{ClusterId}/channelplacementgroups",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListChannelPlacementGroupsRequest",
}) as any as S.Schema<ListChannelPlacementGroupsRequest>;
export interface DescribeChannelPlacementGroupSummary {
  Arn?: string;
  Channels?: string[];
  ClusterId?: string;
  Id?: string;
  Name?: string;
  Nodes?: string[];
  State?: ChannelPlacementGroupState;
}
export const DescribeChannelPlacementGroupSummary = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      Channels: S.optional(__listOf__string),
      ClusterId: S.optional(S.String),
      Id: S.optional(S.String),
      Name: S.optional(S.String),
      Nodes: S.optional(__listOf__string),
      State: S.optional(ChannelPlacementGroupState),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        Channels: "channels",
        ClusterId: "clusterId",
        Id: "id",
        Name: "name",
        Nodes: "nodes",
        State: "state",
      }),
    ),
).annotate({
  identifier: "DescribeChannelPlacementGroupSummary",
}) as any as S.Schema<DescribeChannelPlacementGroupSummary>;
export type __listOfDescribeChannelPlacementGroupSummary =
  DescribeChannelPlacementGroupSummary[];
export const __listOfDescribeChannelPlacementGroupSummary =
  /*@__PURE__*/ S.Array(DescribeChannelPlacementGroupSummary);
export interface ListChannelPlacementGroupsResponse {
  ChannelPlacementGroups?: DescribeChannelPlacementGroupSummary[];
  NextToken?: string;
}
export const ListChannelPlacementGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelPlacementGroups: S.optional(
      __listOfDescribeChannelPlacementGroupSummary,
    ),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ChannelPlacementGroups: "channelPlacementGroups",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListChannelPlacementGroupsResponse",
}) as any as S.Schema<ListChannelPlacementGroupsResponse>;
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
      T.Http({ method: "GET", uri: "/prod/channels" }),
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
export type __listOfChannelEngineVersionResponse =
  ChannelEngineVersionResponse[];
export const __listOfChannelEngineVersionResponse = /*@__PURE__*/ S.Array(
  ChannelEngineVersionResponse,
);
export interface ChannelSummary {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  Id?: string;
  InputAttachments?: InputAttachment[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  Name?: string;
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  UsedChannelEngineVersions?: ChannelEngineVersionResponse[];
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export const ChannelSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CdiInputSpecification: S.optional(CdiInputSpecification),
    ChannelClass: S.optional(ChannelClass),
    Destinations: S.optional(__listOfOutputDestination),
    EgressEndpoints: S.optional(__listOfChannelEgressEndpoint),
    Id: S.optional(S.String),
    InputAttachments: S.optional(__listOfInputAttachment),
    InputSpecification: S.optional(InputSpecification),
    LogLevel: S.optional(LogLevel),
    Maintenance: S.optional(MaintenanceStatus),
    Name: S.optional(S.String),
    PipelinesRunningCount: S.optional(S.Number),
    RoleArn: S.optional(S.String),
    State: S.optional(ChannelState),
    Tags: S.optional(Tags),
    Vpc: S.optional(VpcOutputSettingsDescription),
    AnywhereSettings: S.optional(DescribeAnywhereSettings),
    ChannelEngineVersion: S.optional(ChannelEngineVersionResponse),
    UsedChannelEngineVersions: S.optional(__listOfChannelEngineVersionResponse),
    LinkedChannelSettings: S.optional(DescribeLinkedChannelSettings),
    ChannelSecurityGroups: S.optional(__listOf__string),
    InferenceSettings: S.optional(DescribeInferenceSettings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CdiInputSpecification: "cdiInputSpecification",
      ChannelClass: "channelClass",
      Destinations: "destinations",
      EgressEndpoints: "egressEndpoints",
      Id: "id",
      InputAttachments: "inputAttachments",
      InputSpecification: "inputSpecification",
      LogLevel: "logLevel",
      Maintenance: "maintenance",
      Name: "name",
      PipelinesRunningCount: "pipelinesRunningCount",
      RoleArn: "roleArn",
      State: "state",
      Tags: "tags",
      Vpc: "vpc",
      AnywhereSettings: "anywhereSettings",
      ChannelEngineVersion: "channelEngineVersion",
      UsedChannelEngineVersions: "usedChannelEngineVersions",
      LinkedChannelSettings: "linkedChannelSettings",
      ChannelSecurityGroups: "channelSecurityGroups",
      InferenceSettings: "inferenceSettings",
    }),
  ),
).annotate({ identifier: "ChannelSummary" }) as any as S.Schema<ChannelSummary>;
export type __listOfChannelSummary = ChannelSummary[];
export const __listOfChannelSummary = /*@__PURE__*/ S.Array(ChannelSummary);
export interface ListChannelsResponse {
  Channels?: (ChannelSummary & {
    InputAttachments: (InputAttachment & {
      AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
        SecondaryInputId: string;
        FailoverConditions: (FailoverCondition & {
          FailoverConditionSettings: FailoverConditionSettings & {
            AudioSilenceSettings: AudioSilenceFailoverSettings & {
              AudioSelectorName: string;
            };
          };
        })[];
      };
      InputSettings: InputSettings & {
        AudioSelectors: (AudioSelector & {
          Name: __stringMin1;
          SelectorSettings: AudioSelectorSettings & {
            AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
              GroupId: __stringMin1;
              Name: __stringMin1;
            };
            AudioLanguageSelection: AudioLanguageSelection & {
              LanguageCode: string;
            };
            AudioPidSelection: AudioPidSelection & {
              Pid: __integerMin0Max8191;
              Pids: (AudioPid & {
                Pid: __integerMin0Max8191;
                DolbyEDecode: AudioDolbyEDecode & {
                  ProgramSelection: DolbyEProgramSelection;
                };
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
            };
            AudioTrackSelection: AudioTrackSelection & {
              Tracks: (AudioTrack & {
                Track: __integerMin1;
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
            };
          };
        })[];
        CaptionSelectors: (CaptionSelector & {
          Name: __stringMin1;
          SelectorSettings: CaptionSelectorSettings & {
            TeletextSourceSettings: TeletextSourceSettings & {
              OutputRectangle: CaptionRectangle & {
                Height: __doubleMin0Max100;
                LeftOffset: __doubleMin0Max100;
                TopOffset: __doubleMin0Max100;
                Width: __doubleMin0Max100;
              };
            };
          };
        })[];
      };
    })[];
  })[];
  NextToken?: string;
}
export const ListChannelsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Channels: S.optional(__listOfChannelSummary),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Channels: "channels", NextToken: "nextToken" })),
).annotate({
  identifier: "ListChannelsResponse",
}) as any as S.Schema<ListChannelsResponse>;
export interface ListCloudWatchAlarmTemplateGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
  Scope?: string;
  SignalMapIdentifier?: string;
}
export const ListCloudWatchAlarmTemplateGroupsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      Scope: S.optional(S.String).pipe(T.HttpQuery("scope")),
      SignalMapIdentifier: S.optional(S.String).pipe(
        T.HttpQuery("signalMapIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/prod/cloudwatch-alarm-template-groups",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListCloudWatchAlarmTemplateGroupsRequest",
}) as any as S.Schema<ListCloudWatchAlarmTemplateGroupsRequest>;
export interface CloudWatchAlarmTemplateGroupSummary {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
  TemplateCount?: number;
}
export const CloudWatchAlarmTemplateGroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    Id: S.optional(S.String),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    Tags: S.optional(TagMap),
    TemplateCount: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreatedAt: "createdAt",
      Description: "description",
      Id: "id",
      ModifiedAt: "modifiedAt",
      Name: "name",
      Tags: "tags",
      TemplateCount: "templateCount",
    }),
  ),
).annotate({
  identifier: "CloudWatchAlarmTemplateGroupSummary",
}) as any as S.Schema<CloudWatchAlarmTemplateGroupSummary>;
export type __listOfCloudWatchAlarmTemplateGroupSummary =
  CloudWatchAlarmTemplateGroupSummary[];
export const __listOfCloudWatchAlarmTemplateGroupSummary =
  /*@__PURE__*/ S.Array(CloudWatchAlarmTemplateGroupSummary);
export interface ListCloudWatchAlarmTemplateGroupsResponse {
  CloudWatchAlarmTemplateGroups?: (CloudWatchAlarmTemplateGroupSummary & {
    Arn: __stringPatternArnMedialiveCloudwatchAlarmTemplateGroup;
    CreatedAt: __timestampIso8601;
    Id: __stringMin7Max11PatternAws097;
    Name: __stringMin1Max255PatternS;
    TemplateCount: number;
  })[];
  NextToken?: string;
}
export const ListCloudWatchAlarmTemplateGroupsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      CloudWatchAlarmTemplateGroups: S.optional(
        __listOfCloudWatchAlarmTemplateGroupSummary,
      ),
      NextToken: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        CloudWatchAlarmTemplateGroups: "cloudWatchAlarmTemplateGroups",
        NextToken: "nextToken",
      }),
    ),
  ).annotate({
    identifier: "ListCloudWatchAlarmTemplateGroupsResponse",
  }) as any as S.Schema<ListCloudWatchAlarmTemplateGroupsResponse>;
export interface ListCloudWatchAlarmTemplatesRequest {
  GroupIdentifier?: string;
  MaxResults?: number;
  NextToken?: string;
  Scope?: string;
  SignalMapIdentifier?: string;
}
export const ListCloudWatchAlarmTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupIdentifier: S.optional(S.String).pipe(T.HttpQuery("groupIdentifier")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Scope: S.optional(S.String).pipe(T.HttpQuery("scope")),
    SignalMapIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("signalMapIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/cloudwatch-alarm-templates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListCloudWatchAlarmTemplatesRequest",
}) as any as S.Schema<ListCloudWatchAlarmTemplatesRequest>;
export interface CloudWatchAlarmTemplateSummary {
  Arn?: string;
  ComparisonOperator?: CloudWatchAlarmTemplateComparisonOperator;
  CreatedAt?: Date;
  DatapointsToAlarm?: number;
  Description?: string;
  EvaluationPeriods?: number;
  GroupId?: string;
  Id?: string;
  MetricName?: string;
  ModifiedAt?: Date;
  Name?: string;
  Period?: number;
  Statistic?: CloudWatchAlarmTemplateStatistic;
  Tags?: { [key: string]: string | undefined };
  TargetResourceType?: CloudWatchAlarmTemplateTargetResourceType;
  Threshold?: number;
  TreatMissingData?: CloudWatchAlarmTemplateTreatMissingData;
}
export const CloudWatchAlarmTemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ComparisonOperator: S.optional(CloudWatchAlarmTemplateComparisonOperator),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    DatapointsToAlarm: S.optional(S.Number),
    Description: S.optional(S.String),
    EvaluationPeriods: S.optional(S.Number),
    GroupId: S.optional(S.String),
    Id: S.optional(S.String),
    MetricName: S.optional(S.String),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    Period: S.optional(S.Number),
    Statistic: S.optional(CloudWatchAlarmTemplateStatistic),
    Tags: S.optional(TagMap),
    TargetResourceType: S.optional(CloudWatchAlarmTemplateTargetResourceType),
    Threshold: S.optional(S.Number),
    TreatMissingData: S.optional(CloudWatchAlarmTemplateTreatMissingData),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ComparisonOperator: "comparisonOperator",
      CreatedAt: "createdAt",
      DatapointsToAlarm: "datapointsToAlarm",
      Description: "description",
      EvaluationPeriods: "evaluationPeriods",
      GroupId: "groupId",
      Id: "id",
      MetricName: "metricName",
      ModifiedAt: "modifiedAt",
      Name: "name",
      Period: "period",
      Statistic: "statistic",
      Tags: "tags",
      TargetResourceType: "targetResourceType",
      Threshold: "threshold",
      TreatMissingData: "treatMissingData",
    }),
  ),
).annotate({
  identifier: "CloudWatchAlarmTemplateSummary",
}) as any as S.Schema<CloudWatchAlarmTemplateSummary>;
export type __listOfCloudWatchAlarmTemplateSummary =
  CloudWatchAlarmTemplateSummary[];
export const __listOfCloudWatchAlarmTemplateSummary = /*@__PURE__*/ S.Array(
  CloudWatchAlarmTemplateSummary,
);
export interface ListCloudWatchAlarmTemplatesResponse {
  CloudWatchAlarmTemplates?: (CloudWatchAlarmTemplateSummary & {
    Arn: __stringPatternArnMedialiveCloudwatchAlarmTemplate;
    ComparisonOperator: CloudWatchAlarmTemplateComparisonOperator;
    CreatedAt: __timestampIso8601;
    EvaluationPeriods: __integerMin1;
    GroupId: __stringMin7Max11PatternAws097;
    Id: __stringMin7Max11PatternAws097;
    MetricName: __stringMax64;
    Name: __stringMin1Max255PatternS;
    Period: __integerMin10Max86400;
    Statistic: CloudWatchAlarmTemplateStatistic;
    TargetResourceType: CloudWatchAlarmTemplateTargetResourceType;
    Threshold: number;
    TreatMissingData: CloudWatchAlarmTemplateTreatMissingData;
  })[];
  NextToken?: string;
}
export const ListCloudWatchAlarmTemplatesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      CloudWatchAlarmTemplates: S.optional(
        __listOfCloudWatchAlarmTemplateSummary,
      ),
      NextToken: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        CloudWatchAlarmTemplates: "cloudWatchAlarmTemplates",
        NextToken: "nextToken",
      }),
    ),
).annotate({
  identifier: "ListCloudWatchAlarmTemplatesResponse",
}) as any as S.Schema<ListCloudWatchAlarmTemplatesResponse>;
export interface ListClusterAlertsRequest {
  ClusterId: string;
  MaxResults?: number;
  NextToken?: string;
  StateFilter?: string;
}
export const ListClusterAlertsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    StateFilter: S.optional(S.String).pipe(T.HttpQuery("stateFilter")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/clusters/{ClusterId}/alerts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClusterAlertsRequest",
}) as any as S.Schema<ListClusterAlertsRequest>;
export type ClusterAlertState = "SET" | "CLEARED" | (string & {});
export const ClusterAlertState = /*@__PURE__*/ S.String;

export interface ClusterAlert {
  AlertType?: string;
  ChannelId?: string;
  ClearedTimestamp?: Date;
  Id?: string;
  Message?: string;
  NodeId?: string;
  SetTimestamp?: Date;
  State?: ClusterAlertState;
}
export const ClusterAlert = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlertType: S.optional(S.String),
    ChannelId: S.optional(S.String),
    ClearedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Id: S.optional(S.String),
    Message: S.optional(S.String),
    NodeId: S.optional(S.String),
    SetTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    State: S.optional(ClusterAlertState),
  }).pipe(
    S.encodeKeys({
      AlertType: "alertType",
      ChannelId: "channelId",
      ClearedTimestamp: "clearedTimestamp",
      Id: "id",
      Message: "message",
      NodeId: "nodeId",
      SetTimestamp: "setTimestamp",
      State: "state",
    }),
  ),
).annotate({ identifier: "ClusterAlert" }) as any as S.Schema<ClusterAlert>;
export type __listOfClusterAlert = ClusterAlert[];
export const __listOfClusterAlert = /*@__PURE__*/ S.Array(ClusterAlert);
export interface ListClusterAlertsResponse {
  Alerts?: ClusterAlert[];
  NextToken?: string;
}
export const ListClusterAlertsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Alerts: S.optional(__listOfClusterAlert),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Alerts: "alerts", NextToken: "nextToken" })),
).annotate({
  identifier: "ListClusterAlertsResponse",
}) as any as S.Schema<ListClusterAlertsResponse>;
export interface ListClustersRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListClustersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/clusters" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListClustersRequest",
}) as any as S.Schema<ListClustersRequest>;
export interface DescribeClusterSummary {
  Arn?: string;
  ChannelIds?: string[];
  ClusterType?: ClusterType;
  Id?: string;
  InstanceRoleArn?: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettings;
  State?: ClusterState;
}
export const DescribeClusterSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelIds: S.optional(__listOf__string),
    ClusterType: S.optional(ClusterType),
    Id: S.optional(S.String),
    InstanceRoleArn: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkSettings: S.optional(ClusterNetworkSettings),
    State: S.optional(ClusterState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ChannelIds: "channelIds",
      ClusterType: "clusterType",
      Id: "id",
      InstanceRoleArn: "instanceRoleArn",
      Name: "name",
      NetworkSettings: "networkSettings",
      State: "state",
    }),
  ),
).annotate({
  identifier: "DescribeClusterSummary",
}) as any as S.Schema<DescribeClusterSummary>;
export type __listOfDescribeClusterSummary = DescribeClusterSummary[];
export const __listOfDescribeClusterSummary = /*@__PURE__*/ S.Array(
  DescribeClusterSummary,
);
export interface ListClustersResponse {
  Clusters?: DescribeClusterSummary[];
  NextToken?: string;
}
export const ListClustersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Clusters: S.optional(__listOfDescribeClusterSummary),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Clusters: "clusters", NextToken: "nextToken" })),
).annotate({
  identifier: "ListClustersResponse",
}) as any as S.Schema<ListClustersResponse>;
export interface ListEventBridgeRuleTemplateGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
  SignalMapIdentifier?: string;
}
export const ListEventBridgeRuleTemplateGroupsRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
      NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
      SignalMapIdentifier: S.optional(S.String).pipe(
        T.HttpQuery("signalMapIdentifier"),
      ),
    }).pipe(
      T.all(
        T.Http({
          method: "GET",
          uri: "/prod/eventbridge-rule-template-groups",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "ListEventBridgeRuleTemplateGroupsRequest",
}) as any as S.Schema<ListEventBridgeRuleTemplateGroupsRequest>;
export interface EventBridgeRuleTemplateGroupSummary {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
  TemplateCount?: number;
}
export const EventBridgeRuleTemplateGroupSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    Id: S.optional(S.String),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    Tags: S.optional(TagMap),
    TemplateCount: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreatedAt: "createdAt",
      Description: "description",
      Id: "id",
      ModifiedAt: "modifiedAt",
      Name: "name",
      Tags: "tags",
      TemplateCount: "templateCount",
    }),
  ),
).annotate({
  identifier: "EventBridgeRuleTemplateGroupSummary",
}) as any as S.Schema<EventBridgeRuleTemplateGroupSummary>;
export type __listOfEventBridgeRuleTemplateGroupSummary =
  EventBridgeRuleTemplateGroupSummary[];
export const __listOfEventBridgeRuleTemplateGroupSummary =
  /*@__PURE__*/ S.Array(EventBridgeRuleTemplateGroupSummary);
export interface ListEventBridgeRuleTemplateGroupsResponse {
  EventBridgeRuleTemplateGroups?: (EventBridgeRuleTemplateGroupSummary & {
    Arn: __stringPatternArnMedialiveEventbridgeRuleTemplateGroup;
    CreatedAt: __timestampIso8601;
    Id: __stringMin7Max11PatternAws097;
    Name: __stringMin1Max255PatternS;
    TemplateCount: number;
  })[];
  NextToken?: string;
}
export const ListEventBridgeRuleTemplateGroupsResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      EventBridgeRuleTemplateGroups: S.optional(
        __listOfEventBridgeRuleTemplateGroupSummary,
      ),
      NextToken: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        EventBridgeRuleTemplateGroups: "eventBridgeRuleTemplateGroups",
        NextToken: "nextToken",
      }),
    ),
  ).annotate({
    identifier: "ListEventBridgeRuleTemplateGroupsResponse",
  }) as any as S.Schema<ListEventBridgeRuleTemplateGroupsResponse>;
export interface ListEventBridgeRuleTemplatesRequest {
  GroupIdentifier?: string;
  MaxResults?: number;
  NextToken?: string;
  SignalMapIdentifier?: string;
}
export const ListEventBridgeRuleTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    GroupIdentifier: S.optional(S.String).pipe(T.HttpQuery("groupIdentifier")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    SignalMapIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("signalMapIdentifier"),
    ),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/eventbridge-rule-templates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListEventBridgeRuleTemplatesRequest",
}) as any as S.Schema<ListEventBridgeRuleTemplatesRequest>;
export type __integerMax5 = number;
export interface EventBridgeRuleTemplateSummary {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  EventTargetCount?: number;
  EventType?: EventBridgeRuleTemplateEventType;
  GroupId?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const EventBridgeRuleTemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    EventTargetCount: S.optional(S.Number),
    EventType: S.optional(EventBridgeRuleTemplateEventType),
    GroupId: S.optional(S.String),
    Id: S.optional(S.String),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Name: S.optional(S.String),
    Tags: S.optional(TagMap),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreatedAt: "createdAt",
      Description: "description",
      EventTargetCount: "eventTargetCount",
      EventType: "eventType",
      GroupId: "groupId",
      Id: "id",
      ModifiedAt: "modifiedAt",
      Name: "name",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "EventBridgeRuleTemplateSummary",
}) as any as S.Schema<EventBridgeRuleTemplateSummary>;
export type __listOfEventBridgeRuleTemplateSummary =
  EventBridgeRuleTemplateSummary[];
export const __listOfEventBridgeRuleTemplateSummary = /*@__PURE__*/ S.Array(
  EventBridgeRuleTemplateSummary,
);
export interface ListEventBridgeRuleTemplatesResponse {
  EventBridgeRuleTemplates?: (EventBridgeRuleTemplateSummary & {
    Arn: __stringPatternArnMedialiveEventbridgeRuleTemplate;
    CreatedAt: __timestampIso8601;
    EventTargetCount: __integerMax5;
    EventType: EventBridgeRuleTemplateEventType;
    GroupId: __stringMin7Max11PatternAws097;
    Id: __stringMin7Max11PatternAws097;
    Name: __stringMin1Max255PatternS;
  })[];
  NextToken?: string;
}
export const ListEventBridgeRuleTemplatesResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      EventBridgeRuleTemplates: S.optional(
        __listOfEventBridgeRuleTemplateSummary,
      ),
      NextToken: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        EventBridgeRuleTemplates: "eventBridgeRuleTemplates",
        NextToken: "nextToken",
      }),
    ),
).annotate({
  identifier: "ListEventBridgeRuleTemplatesResponse",
}) as any as S.Schema<ListEventBridgeRuleTemplatesResponse>;
export interface ListInputDevicesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListInputDevicesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/inputDevices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInputDevicesRequest",
}) as any as S.Schema<ListInputDevicesRequest>;
export interface InputDeviceSummary {
  Arn?: string;
  ConnectionState?: InputDeviceConnectionState;
  DeviceSettingsSyncState?: DeviceSettingsSyncState;
  DeviceUpdateStatus?: DeviceUpdateStatus;
  HdDeviceSettings?: InputDeviceHdSettings;
  Id?: string;
  MacAddress?: string;
  Name?: string;
  NetworkSettings?: InputDeviceNetworkSettings;
  SerialNumber?: string;
  Type?: InputDeviceType;
  UhdDeviceSettings?: InputDeviceUhdSettings;
  Tags?: { [key: string]: string | undefined };
  AvailabilityZone?: string;
  MedialiveInputArns?: string[];
  OutputType?: InputDeviceOutputType;
}
export const InputDeviceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ConnectionState: S.optional(InputDeviceConnectionState),
    DeviceSettingsSyncState: S.optional(DeviceSettingsSyncState),
    DeviceUpdateStatus: S.optional(DeviceUpdateStatus),
    HdDeviceSettings: S.optional(InputDeviceHdSettings),
    Id: S.optional(S.String),
    MacAddress: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkSettings: S.optional(InputDeviceNetworkSettings),
    SerialNumber: S.optional(S.String),
    Type: S.optional(InputDeviceType),
    UhdDeviceSettings: S.optional(InputDeviceUhdSettings),
    Tags: S.optional(Tags),
    AvailabilityZone: S.optional(S.String),
    MedialiveInputArns: S.optional(__listOf__string),
    OutputType: S.optional(InputDeviceOutputType),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ConnectionState: "connectionState",
      DeviceSettingsSyncState: "deviceSettingsSyncState",
      DeviceUpdateStatus: "deviceUpdateStatus",
      HdDeviceSettings: "hdDeviceSettings",
      Id: "id",
      MacAddress: "macAddress",
      Name: "name",
      NetworkSettings: "networkSettings",
      SerialNumber: "serialNumber",
      Type: "type",
      UhdDeviceSettings: "uhdDeviceSettings",
      Tags: "tags",
      AvailabilityZone: "availabilityZone",
      MedialiveInputArns: "medialiveInputArns",
      OutputType: "outputType",
    }),
  ),
).annotate({
  identifier: "InputDeviceSummary",
}) as any as S.Schema<InputDeviceSummary>;
export type __listOfInputDeviceSummary = InputDeviceSummary[];
export const __listOfInputDeviceSummary =
  /*@__PURE__*/ S.Array(InputDeviceSummary);
export interface ListInputDevicesResponse {
  InputDevices?: InputDeviceSummary[];
  NextToken?: string;
}
export const ListInputDevicesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputDevices: S.optional(__listOfInputDeviceSummary),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ InputDevices: "inputDevices", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListInputDevicesResponse",
}) as any as S.Schema<ListInputDevicesResponse>;
export interface ListInputDeviceTransfersRequest {
  MaxResults?: number;
  NextToken?: string;
  TransferType?: string;
}
export const ListInputDeviceTransfersRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    TransferType: S.optional(S.String).pipe(T.HttpQuery("transferType")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/inputDeviceTransfers" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInputDeviceTransfersRequest",
}) as any as S.Schema<ListInputDeviceTransfersRequest>;
export type InputDeviceTransferType = "OUTGOING" | "INCOMING" | (string & {});
export const InputDeviceTransferType = /*@__PURE__*/ S.String;

export interface TransferringInputDeviceSummary {
  Id?: string;
  Message?: string;
  TargetCustomerId?: string;
  TransferType?: InputDeviceTransferType;
}
export const TransferringInputDeviceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Message: S.optional(S.String),
    TargetCustomerId: S.optional(S.String),
    TransferType: S.optional(InputDeviceTransferType),
  }).pipe(
    S.encodeKeys({
      Id: "id",
      Message: "message",
      TargetCustomerId: "targetCustomerId",
      TransferType: "transferType",
    }),
  ),
).annotate({
  identifier: "TransferringInputDeviceSummary",
}) as any as S.Schema<TransferringInputDeviceSummary>;
export type __listOfTransferringInputDeviceSummary =
  TransferringInputDeviceSummary[];
export const __listOfTransferringInputDeviceSummary = /*@__PURE__*/ S.Array(
  TransferringInputDeviceSummary,
);
export interface ListInputDeviceTransfersResponse {
  InputDeviceTransfers?: TransferringInputDeviceSummary[];
  NextToken?: string;
}
export const ListInputDeviceTransfersResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputDeviceTransfers: S.optional(__listOfTransferringInputDeviceSummary),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      InputDeviceTransfers: "inputDeviceTransfers",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListInputDeviceTransfersResponse",
}) as any as S.Schema<ListInputDeviceTransfersResponse>;
export interface ListInputsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListInputsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/inputs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInputsRequest",
}) as any as S.Schema<ListInputsRequest>;
export type __listOfInput = Input[];
export const __listOfInput = /*@__PURE__*/ S.Array(Input);
export interface ListInputsResponse {
  Inputs?: (Input & {
    SrtSettings: SrtSettings & {
      SrtListenerSettings: SrtListenerSettings & {
        Decryption: SrtListenerDecryption & {
          Algorithm: Algorithm;
          PassphraseSecretArn: string;
        };
      };
    };
    MulticastSettings: MulticastSettings & {
      Sources: (MulticastSource & { Url: string })[];
    };
  })[];
  NextToken?: string;
}
export const ListInputsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Inputs: S.optional(__listOfInput),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Inputs: "inputs", NextToken: "nextToken" })),
).annotate({
  identifier: "ListInputsResponse",
}) as any as S.Schema<ListInputsResponse>;
export interface ListInputSecurityGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListInputSecurityGroupsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/inputSecurityGroups" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListInputSecurityGroupsRequest",
}) as any as S.Schema<ListInputSecurityGroupsRequest>;
export type __listOfInputSecurityGroup = InputSecurityGroup[];
export const __listOfInputSecurityGroup =
  /*@__PURE__*/ S.Array(InputSecurityGroup);
export interface ListInputSecurityGroupsResponse {
  InputSecurityGroups?: InputSecurityGroup[];
  NextToken?: string;
}
export const ListInputSecurityGroupsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputSecurityGroups: S.optional(__listOfInputSecurityGroup),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      InputSecurityGroups: "inputSecurityGroups",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListInputSecurityGroupsResponse",
}) as any as S.Schema<ListInputSecurityGroupsResponse>;
export interface ListMultiplexAlertsRequest {
  MaxResults?: number;
  MultiplexId: string;
  NextToken?: string;
  StateFilter?: string;
}
export const ListMultiplexAlertsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    StateFilter: S.optional(S.String).pipe(T.HttpQuery("stateFilter")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/multiplexes/{MultiplexId}/alerts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMultiplexAlertsRequest",
}) as any as S.Schema<ListMultiplexAlertsRequest>;
export type MultiplexAlertState = "SET" | "CLEARED" | (string & {});
export const MultiplexAlertState = /*@__PURE__*/ S.String;

export interface MultiplexAlert {
  AlertType?: string;
  ClearedTimestamp?: Date;
  Id?: string;
  Message?: string;
  PipelineId?: string;
  SetTimestamp?: Date;
  State?: MultiplexAlertState;
}
export const MultiplexAlert = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlertType: S.optional(S.String),
    ClearedTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Id: S.optional(S.String),
    Message: S.optional(S.String),
    PipelineId: S.optional(S.String),
    SetTimestamp: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    State: S.optional(MultiplexAlertState),
  }).pipe(
    S.encodeKeys({
      AlertType: "alertType",
      ClearedTimestamp: "clearedTimestamp",
      Id: "id",
      Message: "message",
      PipelineId: "pipelineId",
      SetTimestamp: "setTimestamp",
      State: "state",
    }),
  ),
).annotate({ identifier: "MultiplexAlert" }) as any as S.Schema<MultiplexAlert>;
export type __listOfMultiplexAlert = MultiplexAlert[];
export const __listOfMultiplexAlert = /*@__PURE__*/ S.Array(MultiplexAlert);
export interface ListMultiplexAlertsResponse {
  Alerts?: MultiplexAlert[];
  NextToken?: string;
}
export const ListMultiplexAlertsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Alerts: S.optional(__listOfMultiplexAlert),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Alerts: "alerts", NextToken: "nextToken" })),
).annotate({
  identifier: "ListMultiplexAlertsResponse",
}) as any as S.Schema<ListMultiplexAlertsResponse>;
export interface ListMultiplexesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListMultiplexesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/multiplexes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMultiplexesRequest",
}) as any as S.Schema<ListMultiplexesRequest>;
export interface MultiplexSettingsSummary {
  TransportStreamBitrate?: number;
}
export const MultiplexSettingsSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TransportStreamBitrate: S.optional(S.Number) }).pipe(
    S.encodeKeys({ TransportStreamBitrate: "transportStreamBitrate" }),
  ),
).annotate({
  identifier: "MultiplexSettingsSummary",
}) as any as S.Schema<MultiplexSettingsSummary>;
export interface MultiplexSummary {
  Arn?: string;
  AvailabilityZones?: string[];
  Id?: string;
  MultiplexSettings?: MultiplexSettingsSummary;
  Name?: string;
  PipelinesRunningCount?: number;
  ProgramCount?: number;
  State?: MultiplexState;
  Tags?: { [key: string]: string | undefined };
}
export const MultiplexSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AvailabilityZones: S.optional(__listOf__string),
    Id: S.optional(S.String),
    MultiplexSettings: S.optional(MultiplexSettingsSummary),
    Name: S.optional(S.String),
    PipelinesRunningCount: S.optional(S.Number),
    ProgramCount: S.optional(S.Number),
    State: S.optional(MultiplexState),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AvailabilityZones: "availabilityZones",
      Id: "id",
      MultiplexSettings: "multiplexSettings",
      Name: "name",
      PipelinesRunningCount: "pipelinesRunningCount",
      ProgramCount: "programCount",
      State: "state",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "MultiplexSummary",
}) as any as S.Schema<MultiplexSummary>;
export type __listOfMultiplexSummary = MultiplexSummary[];
export const __listOfMultiplexSummary = /*@__PURE__*/ S.Array(MultiplexSummary);
export interface ListMultiplexesResponse {
  Multiplexes?: MultiplexSummary[];
  NextToken?: string;
}
export const ListMultiplexesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Multiplexes: S.optional(__listOfMultiplexSummary),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Multiplexes: "multiplexes", NextToken: "nextToken" })),
).annotate({
  identifier: "ListMultiplexesResponse",
}) as any as S.Schema<ListMultiplexesResponse>;
export interface ListMultiplexProgramsRequest {
  MaxResults?: number;
  MultiplexId: string;
  NextToken?: string;
}
export const ListMultiplexProgramsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/prod/multiplexes/{MultiplexId}/programs",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMultiplexProgramsRequest",
}) as any as S.Schema<ListMultiplexProgramsRequest>;
export interface MultiplexProgramSummary {
  ChannelId?: string;
  ProgramName?: string;
}
export const MultiplexProgramSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.optional(S.String),
    ProgramName: S.optional(S.String),
  }).pipe(S.encodeKeys({ ChannelId: "channelId", ProgramName: "programName" })),
).annotate({
  identifier: "MultiplexProgramSummary",
}) as any as S.Schema<MultiplexProgramSummary>;
export type __listOfMultiplexProgramSummary = MultiplexProgramSummary[];
export const __listOfMultiplexProgramSummary = /*@__PURE__*/ S.Array(
  MultiplexProgramSummary,
);
export interface ListMultiplexProgramsResponse {
  MultiplexPrograms?: MultiplexProgramSummary[];
  NextToken?: string;
}
export const ListMultiplexProgramsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MultiplexPrograms: S.optional(__listOfMultiplexProgramSummary),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      MultiplexPrograms: "multiplexPrograms",
      NextToken: "nextToken",
    }),
  ),
).annotate({
  identifier: "ListMultiplexProgramsResponse",
}) as any as S.Schema<ListMultiplexProgramsResponse>;
export interface ListNetworksRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListNetworksRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/networks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNetworksRequest",
}) as any as S.Schema<ListNetworksRequest>;
export interface DescribeNetworkSummary {
  Arn?: string;
  AssociatedClusterIds?: string[];
  Id?: string;
  IpPools?: IpPool[];
  Name?: string;
  Routes?: Route[];
  State?: NetworkState;
}
export const DescribeNetworkSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssociatedClusterIds: S.optional(__listOf__string),
    Id: S.optional(S.String),
    IpPools: S.optional(__listOfIpPool),
    Name: S.optional(S.String),
    Routes: S.optional(__listOfRoute),
    State: S.optional(NetworkState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AssociatedClusterIds: "associatedClusterIds",
      Id: "id",
      IpPools: "ipPools",
      Name: "name",
      Routes: "routes",
      State: "state",
    }),
  ),
).annotate({
  identifier: "DescribeNetworkSummary",
}) as any as S.Schema<DescribeNetworkSummary>;
export type __listOfDescribeNetworkSummary = DescribeNetworkSummary[];
export const __listOfDescribeNetworkSummary = /*@__PURE__*/ S.Array(
  DescribeNetworkSummary,
);
export interface ListNetworksResponse {
  Networks?: DescribeNetworkSummary[];
  NextToken?: string;
}
export const ListNetworksResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Networks: S.optional(__listOfDescribeNetworkSummary),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Networks: "networks", NextToken: "nextToken" })),
).annotate({
  identifier: "ListNetworksResponse",
}) as any as S.Schema<ListNetworksResponse>;
export interface ListNodesRequest {
  ClusterId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListNodesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/clusters/{ClusterId}/nodes" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListNodesRequest",
}) as any as S.Schema<ListNodesRequest>;
export interface DescribeNodeSummary {
  Arn?: string;
  ChannelPlacementGroups?: string[];
  ClusterId?: string;
  ConnectionState?: NodeConnectionState;
  Id?: string;
  InstanceArn?: string;
  ManagedInstanceId?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  Role?: NodeRole;
  State?: NodeState;
  SdiSourceMappings?: SdiSourceMapping[];
}
export const DescribeNodeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelPlacementGroups: S.optional(__listOf__string),
    ClusterId: S.optional(S.String),
    ConnectionState: S.optional(NodeConnectionState),
    Id: S.optional(S.String),
    InstanceArn: S.optional(S.String),
    ManagedInstanceId: S.optional(S.String),
    Name: S.optional(S.String),
    NodeInterfaceMappings: S.optional(__listOfNodeInterfaceMapping),
    Role: S.optional(NodeRole),
    State: S.optional(NodeState),
    SdiSourceMappings: S.optional(SdiSourceMappings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ChannelPlacementGroups: "channelPlacementGroups",
      ClusterId: "clusterId",
      ConnectionState: "connectionState",
      Id: "id",
      InstanceArn: "instanceArn",
      ManagedInstanceId: "managedInstanceId",
      Name: "name",
      NodeInterfaceMappings: "nodeInterfaceMappings",
      Role: "role",
      State: "state",
      SdiSourceMappings: "sdiSourceMappings",
    }),
  ),
).annotate({
  identifier: "DescribeNodeSummary",
}) as any as S.Schema<DescribeNodeSummary>;
export type __listOfDescribeNodeSummary = DescribeNodeSummary[];
export const __listOfDescribeNodeSummary =
  /*@__PURE__*/ S.Array(DescribeNodeSummary);
export interface ListNodesResponse {
  NextToken?: string;
  Nodes?: DescribeNodeSummary[];
}
export const ListNodesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Nodes: S.optional(__listOfDescribeNodeSummary),
  }).pipe(S.encodeKeys({ NextToken: "nextToken", Nodes: "nodes" })),
).annotate({
  identifier: "ListNodesResponse",
}) as any as S.Schema<ListNodesResponse>;
export interface ListOfferingsRequest {
  ChannelClass?: string;
  ChannelConfiguration?: string;
  Codec?: string;
  Duration?: string;
  MaxResults?: number;
  MaximumBitrate?: string;
  MaximumFramerate?: string;
  NextToken?: string;
  Resolution?: string;
  ResourceType?: string;
  SpecialFeature?: string;
  VideoQuality?: string;
}
export const ListOfferingsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelClass: S.optional(S.String).pipe(T.HttpQuery("channelClass")),
    ChannelConfiguration: S.optional(S.String).pipe(
      T.HttpQuery("channelConfiguration"),
    ),
    Codec: S.optional(S.String).pipe(T.HttpQuery("codec")),
    Duration: S.optional(S.String).pipe(T.HttpQuery("duration")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    MaximumBitrate: S.optional(S.String).pipe(T.HttpQuery("maximumBitrate")),
    MaximumFramerate: S.optional(S.String).pipe(
      T.HttpQuery("maximumFramerate"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Resolution: S.optional(S.String).pipe(T.HttpQuery("resolution")),
    ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
    SpecialFeature: S.optional(S.String).pipe(T.HttpQuery("specialFeature")),
    VideoQuality: S.optional(S.String).pipe(T.HttpQuery("videoQuality")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/offerings" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListOfferingsRequest",
}) as any as S.Schema<ListOfferingsRequest>;
export interface Offering {
  Arn?: string;
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: OfferingDurationUnits;
  FixedPrice?: number;
  OfferingDescription?: string;
  OfferingId?: string;
  OfferingType?: OfferingType;
  Region?: string;
  ResourceSpecification?: ReservationResourceSpecification;
  UsagePrice?: number;
}
export const Offering = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CurrencyCode: S.optional(S.String),
    Duration: S.optional(S.Number),
    DurationUnits: S.optional(OfferingDurationUnits),
    FixedPrice: S.optional(S.Number),
    OfferingDescription: S.optional(S.String),
    OfferingId: S.optional(S.String),
    OfferingType: S.optional(OfferingType),
    Region: S.optional(S.String),
    ResourceSpecification: S.optional(ReservationResourceSpecification),
    UsagePrice: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CurrencyCode: "currencyCode",
      Duration: "duration",
      DurationUnits: "durationUnits",
      FixedPrice: "fixedPrice",
      OfferingDescription: "offeringDescription",
      OfferingId: "offeringId",
      OfferingType: "offeringType",
      Region: "region",
      ResourceSpecification: "resourceSpecification",
      UsagePrice: "usagePrice",
    }),
  ),
).annotate({ identifier: "Offering" }) as any as S.Schema<Offering>;
export type __listOfOffering = Offering[];
export const __listOfOffering = /*@__PURE__*/ S.Array(Offering);
export interface ListOfferingsResponse {
  NextToken?: string;
  Offerings?: Offering[];
}
export const ListOfferingsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Offerings: S.optional(__listOfOffering),
  }).pipe(S.encodeKeys({ NextToken: "nextToken", Offerings: "offerings" })),
).annotate({
  identifier: "ListOfferingsResponse",
}) as any as S.Schema<ListOfferingsResponse>;
export interface ListReservationsRequest {
  ChannelClass?: string;
  Codec?: string;
  MaxResults?: number;
  MaximumBitrate?: string;
  MaximumFramerate?: string;
  NextToken?: string;
  Resolution?: string;
  ResourceType?: string;
  SpecialFeature?: string;
  VideoQuality?: string;
}
export const ListReservationsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelClass: S.optional(S.String).pipe(T.HttpQuery("channelClass")),
    Codec: S.optional(S.String).pipe(T.HttpQuery("codec")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    MaximumBitrate: S.optional(S.String).pipe(T.HttpQuery("maximumBitrate")),
    MaximumFramerate: S.optional(S.String).pipe(
      T.HttpQuery("maximumFramerate"),
    ),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Resolution: S.optional(S.String).pipe(T.HttpQuery("resolution")),
    ResourceType: S.optional(S.String).pipe(T.HttpQuery("resourceType")),
    SpecialFeature: S.optional(S.String).pipe(T.HttpQuery("specialFeature")),
    VideoQuality: S.optional(S.String).pipe(T.HttpQuery("videoQuality")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/reservations" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListReservationsRequest",
}) as any as S.Schema<ListReservationsRequest>;
export interface Reservation {
  Arn?: string;
  Count?: number;
  CurrencyCode?: string;
  Duration?: number;
  DurationUnits?: OfferingDurationUnits;
  End?: string;
  FixedPrice?: number;
  Name?: string;
  OfferingDescription?: string;
  OfferingId?: string;
  OfferingType?: OfferingType;
  Region?: string;
  RenewalSettings?: RenewalSettings;
  ReservationId?: string;
  ResourceSpecification?: ReservationResourceSpecification;
  Start?: string;
  State?: ReservationState;
  Tags?: { [key: string]: string | undefined };
  UsagePrice?: number;
}
export const Reservation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Count: S.optional(S.Number),
    CurrencyCode: S.optional(S.String),
    Duration: S.optional(S.Number),
    DurationUnits: S.optional(OfferingDurationUnits),
    End: S.optional(S.String),
    FixedPrice: S.optional(S.Number),
    Name: S.optional(S.String),
    OfferingDescription: S.optional(S.String),
    OfferingId: S.optional(S.String),
    OfferingType: S.optional(OfferingType),
    Region: S.optional(S.String),
    RenewalSettings: S.optional(RenewalSettings),
    ReservationId: S.optional(S.String),
    ResourceSpecification: S.optional(ReservationResourceSpecification),
    Start: S.optional(S.String),
    State: S.optional(ReservationState),
    Tags: S.optional(Tags),
    UsagePrice: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Count: "count",
      CurrencyCode: "currencyCode",
      Duration: "duration",
      DurationUnits: "durationUnits",
      End: "end",
      FixedPrice: "fixedPrice",
      Name: "name",
      OfferingDescription: "offeringDescription",
      OfferingId: "offeringId",
      OfferingType: "offeringType",
      Region: "region",
      RenewalSettings: "renewalSettings",
      ReservationId: "reservationId",
      ResourceSpecification: "resourceSpecification",
      Start: "start",
      State: "state",
      Tags: "tags",
      UsagePrice: "usagePrice",
    }),
  ),
).annotate({ identifier: "Reservation" }) as any as S.Schema<Reservation>;
export type __listOfReservation = Reservation[];
export const __listOfReservation = /*@__PURE__*/ S.Array(Reservation);
export interface ListReservationsResponse {
  NextToken?: string;
  Reservations?: Reservation[];
}
export const ListReservationsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Reservations: S.optional(__listOfReservation),
  }).pipe(
    S.encodeKeys({ NextToken: "nextToken", Reservations: "reservations" }),
  ),
).annotate({
  identifier: "ListReservationsResponse",
}) as any as S.Schema<ListReservationsResponse>;
export interface ListSdiSourcesRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListSdiSourcesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/sdiSources" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSdiSourcesRequest",
}) as any as S.Schema<ListSdiSourcesRequest>;
export interface SdiSourceSummary {
  Arn?: string;
  Id?: string;
  Inputs?: string[];
  Mode?: SdiSourceMode;
  Name?: string;
  State?: SdiSourceState;
  Type?: SdiSourceType;
}
export const SdiSourceSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Id: S.optional(S.String),
    Inputs: S.optional(__listOf__string),
    Mode: S.optional(SdiSourceMode),
    Name: S.optional(S.String),
    State: S.optional(SdiSourceState),
    Type: S.optional(SdiSourceType),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Id: "id",
      Inputs: "inputs",
      Mode: "mode",
      Name: "name",
      State: "state",
      Type: "type",
    }),
  ),
).annotate({
  identifier: "SdiSourceSummary",
}) as any as S.Schema<SdiSourceSummary>;
export type __listOfSdiSourceSummary = SdiSourceSummary[];
export const __listOfSdiSourceSummary = /*@__PURE__*/ S.Array(SdiSourceSummary);
export interface ListSdiSourcesResponse {
  NextToken?: string;
  SdiSources?: SdiSourceSummary[];
}
export const ListSdiSourcesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    SdiSources: S.optional(__listOfSdiSourceSummary),
  }).pipe(S.encodeKeys({ NextToken: "nextToken", SdiSources: "sdiSources" })),
).annotate({
  identifier: "ListSdiSourcesResponse",
}) as any as S.Schema<ListSdiSourcesResponse>;
export interface ListSignalMapsRequest {
  CloudWatchAlarmTemplateGroupIdentifier?: string;
  EventBridgeRuleTemplateGroupIdentifier?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListSignalMapsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchAlarmTemplateGroupIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("cloudWatchAlarmTemplateGroupIdentifier"),
    ),
    EventBridgeRuleTemplateGroupIdentifier: S.optional(S.String).pipe(
      T.HttpQuery("eventBridgeRuleTemplateGroupIdentifier"),
    ),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/signal-maps" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListSignalMapsRequest",
}) as any as S.Schema<ListSignalMapsRequest>;
export interface SignalMapSummary {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  MonitorDeploymentStatus?: SignalMapMonitorDeploymentStatus;
  Name?: string;
  Status?: SignalMapStatus;
  Tags?: { [key: string]: string | undefined };
}
export const SignalMapSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    Id: S.optional(S.String),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    MonitorDeploymentStatus: S.optional(SignalMapMonitorDeploymentStatus),
    Name: S.optional(S.String),
    Status: S.optional(SignalMapStatus),
    Tags: S.optional(TagMap),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CreatedAt: "createdAt",
      Description: "description",
      Id: "id",
      ModifiedAt: "modifiedAt",
      MonitorDeploymentStatus: "monitorDeploymentStatus",
      Name: "name",
      Status: "status",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "SignalMapSummary",
}) as any as S.Schema<SignalMapSummary>;
export type __listOfSignalMapSummary = SignalMapSummary[];
export const __listOfSignalMapSummary = /*@__PURE__*/ S.Array(SignalMapSummary);
export interface ListSignalMapsResponse {
  NextToken?: string;
  SignalMaps?: (SignalMapSummary & {
    Arn: __stringPatternArnMedialiveSignalMap;
    CreatedAt: __timestampIso8601;
    Id: __stringMin7Max11PatternAws097;
    MonitorDeploymentStatus: SignalMapMonitorDeploymentStatus;
    Name: __stringMin1Max255PatternS;
    Status: SignalMapStatus;
  })[];
}
export const ListSignalMapsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    SignalMaps: S.optional(__listOfSignalMapSummary),
  }).pipe(S.encodeKeys({ NextToken: "nextToken", SignalMaps: "signalMaps" })),
).annotate({
  identifier: "ListSignalMapsResponse",
}) as any as S.Schema<ListSignalMapsResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/tags/{ResourceArn}" }),
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
  S.Struct({ Tags: S.optional(Tags) }).pipe(S.encodeKeys({ Tags: "tags" })),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListVersionsRequest {}
export const ListVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/prod/versions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListVersionsRequest",
}) as any as S.Schema<ListVersionsRequest>;
export interface ListVersionsResponse {
  Versions?: ChannelEngineVersionResponse[];
}
export const ListVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Versions: S.optional(__listOfChannelEngineVersionResponse) }).pipe(
    S.encodeKeys({ Versions: "versions" }),
  ),
).annotate({
  identifier: "ListVersionsResponse",
}) as any as S.Schema<ListVersionsResponse>;
export interface PurchaseOfferingRequest {
  Count?: number;
  Name?: string;
  OfferingId: string;
  RenewalSettings?: RenewalSettings;
  RequestId?: string;
  Start?: string;
  Tags?: { [key: string]: string | undefined };
}
export const PurchaseOfferingRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Count: S.optional(S.Number),
    Name: S.optional(S.String),
    OfferingId: S.String.pipe(T.HttpLabel("OfferingId")),
    RenewalSettings: S.optional(RenewalSettings),
    RequestId: S.optional(S.String).pipe(T.IdempotencyToken()),
    Start: S.optional(S.String),
    Tags: S.optional(Tags),
  })
    .pipe(
      S.encodeKeys({
        Count: "count",
        Name: "name",
        RenewalSettings: "renewalSettings",
        RequestId: "requestId",
        Start: "start",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/prod/offerings/{OfferingId}/purchase",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PurchaseOfferingRequest",
}) as any as S.Schema<PurchaseOfferingRequest>;
export interface PurchaseOfferingResponse {
  Reservation?: Reservation;
}
export const PurchaseOfferingResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Reservation: S.optional(Reservation) }).pipe(
    S.encodeKeys({ Reservation: "reservation" }),
  ),
).annotate({
  identifier: "PurchaseOfferingResponse",
}) as any as S.Schema<PurchaseOfferingResponse>;
export type RebootInputDeviceForce = "NO" | "YES" | (string & {});
export const RebootInputDeviceForce = /*@__PURE__*/ S.String;

export interface RebootInputDeviceRequest {
  Force?: RebootInputDeviceForce;
  InputDeviceId: string;
}
export const RebootInputDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Force: S.optional(RebootInputDeviceForce),
    InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")),
  })
    .pipe(S.encodeKeys({ Force: "force" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/prod/inputDevices/{InputDeviceId}/reboot",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "RebootInputDeviceRequest",
}) as any as S.Schema<RebootInputDeviceRequest>;
export interface RebootInputDeviceResponse {}
export const RebootInputDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RebootInputDeviceResponse",
}) as any as S.Schema<RebootInputDeviceResponse>;
export interface RejectInputDeviceTransferRequest {
  InputDeviceId: string;
}
export const RejectInputDeviceTransferRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/prod/inputDevices/{InputDeviceId}/reject",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "RejectInputDeviceTransferRequest",
}) as any as S.Schema<RejectInputDeviceTransferRequest>;
export interface RejectInputDeviceTransferResponse {}
export const RejectInputDeviceTransferResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "RejectInputDeviceTransferResponse",
}) as any as S.Schema<RejectInputDeviceTransferResponse>;
export type ChannelPipelineIdToRestart =
  | "PIPELINE_0"
  | "PIPELINE_1"
  | (string & {});
export const ChannelPipelineIdToRestart = /*@__PURE__*/ S.String;

export type __listOfChannelPipelineIdToRestart = ChannelPipelineIdToRestart[];
export const __listOfChannelPipelineIdToRestart = /*@__PURE__*/ S.Array(
  ChannelPipelineIdToRestart,
);
export interface RestartChannelPipelinesRequest {
  ChannelId: string;
  PipelineIds?: ChannelPipelineIdToRestart[];
}
export const RestartChannelPipelinesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
    PipelineIds: S.optional(__listOfChannelPipelineIdToRestart),
  })
    .pipe(S.encodeKeys({ PipelineIds: "pipelineIds" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/prod/channels/{ChannelId}/restartChannelPipelines",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "RestartChannelPipelinesRequest",
}) as any as S.Schema<RestartChannelPipelinesRequest>;
export interface RestartChannelPipelinesResponse {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  EncoderSettings?: EncoderSettings & {
    AudioDescriptions: (AudioDescription & {
      AudioSelectorName: string;
      Name: __stringMax255;
      AudioWatermarkingSettings: AudioWatermarkSettings & {
        NielsenWatermarksSettings: NielsenWatermarksSettings & {
          NielsenCbetSettings: NielsenCBET & {
            CbetCheckDigitString: __stringMin2Max2;
            CbetStepaside: NielsenWatermarksCbetStepaside;
            Csid: __stringMin1Max7;
          };
          NielsenNaesIiNwSettings: NielsenNaesIiNw & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
        };
      };
      RemixSettings: RemixSettings & {
        ChannelMappings: (AudioChannelMapping & {
          InputChannelLevels: (InputChannelLevel & {
            Gain: __integerMinNegative60Max6;
            InputChannel: __integerMin0Max15;
          })[];
          OutputChannel: __integerMin0Max7;
        })[];
      };
    })[];
    OutputGroups: (OutputGroup & {
      OutputGroupSettings: OutputGroupSettings & {
        ArchiveGroupSettings: ArchiveGroupSettings & {
          Destination: OutputLocationRef;
        };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
          Destination: OutputLocationRef;
        };
        HlsGroupSettings: HlsGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
            LanguageDescription: __stringMin1;
          })[];
          KeyProviderSettings: KeyProviderSettings & {
            StaticKeySettings: StaticKeySettings & {
              StaticKeyValue: __stringMin32Max32;
              KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
            };
          };
        };
        MediaPackageGroupSettings: MediaPackageGroupSettings & {
          Destination: OutputLocationRef;
          MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            AdditionalDestinations: (MediaPackageAdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & {
          Destination: OutputLocationRef;
        };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & {
            Destination: OutputLocationRef;
          })[];
        };
      };
      Outputs: (Output & {
        OutputSettings: OutputSettings & {
          ArchiveOutputSettings: ArchiveOutputSettings & {
            ContainerSettings: ArchiveContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
          };
          HlsOutputSettings: HlsOutputSettings & {
            HlsSettings: HlsSettings & {
              AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
              };
              StandardHlsSettings: StandardHlsSettings & {
                M3u8Settings: M3u8Settings;
              };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & {
            Destination: OutputLocationRef;
          };
          RtmpOutputSettings: RtmpOutputSettings & {
            Destination: OutputLocationRef;
          };
          UdpOutputSettings: UdpOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          SrtOutputSettings: SrtOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
            ContainerSettings: MediaConnectRouterContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
        };
      })[];
    })[];
    TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
    VideoDescriptions: (VideoDescription & {
      Name: string;
      CodecSettings: VideoCodecSettings & {
        FrameCaptureSettings: FrameCaptureSettings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H264Settings: H264Settings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H265Settings: H265Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Mpeg2Settings: Mpeg2Settings & {
          FramerateDenominator: __integerMin1;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Av1Settings: Av1Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
      };
    })[];
    AvailBlanking: AvailBlanking & {
      AvailBlankingImage: InputLocation & { Uri: __stringMax2048 };
    };
    AvailConfiguration: AvailConfiguration & {
      AvailSettings: AvailSettings & {
        Esam: Esam & {
          AcquisitionPointId: __stringMax256;
          PoisEndpoint: __stringMax2048;
        };
      };
    };
    BlackoutSlate: BlackoutSlate & {
      BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
      NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
    };
    CaptionDescriptions: (CaptionDescription & {
      CaptionSelectorName: string;
      Name: string;
      DestinationSettings: CaptionDestinationSettings & {
        BurnInDestinationSettings: BurnInDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
        DvbSubDestinationSettings: DvbSubDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
      };
    })[];
    GlobalConfiguration: GlobalConfiguration & {
      InputLossBehavior: InputLossBehavior & {
        InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
      };
    };
    MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
      MotionGraphicsSettings: MotionGraphicsSettings;
    };
    ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
    ColorCorrectionSettings: ColorCorrectionSettings & {
      GlobalColorCorrections: (ColorCorrection & {
        InputColorSpace: ColorSpace;
        OutputColorSpace: ColorSpace;
        Uri: string;
      })[];
    };
  };
  Id?: string;
  InputAttachments?: (InputAttachment & {
    AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
      SecondaryInputId: string;
      FailoverConditions: (FailoverCondition & {
        FailoverConditionSettings: FailoverConditionSettings & {
          AudioSilenceSettings: AudioSilenceFailoverSettings & {
            AudioSelectorName: string;
          };
        };
      })[];
    };
    InputSettings: InputSettings & {
      AudioSelectors: (AudioSelector & {
        Name: __stringMin1;
        SelectorSettings: AudioSelectorSettings & {
          AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
            GroupId: __stringMin1;
            Name: __stringMin1;
          };
          AudioLanguageSelection: AudioLanguageSelection & {
            LanguageCode: string;
          };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
          };
          AudioTrackSelection: AudioTrackSelection & {
            Tracks: (AudioTrack & {
              Track: __integerMin1;
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
            DolbyEDecode: AudioDolbyEDecode & {
              ProgramSelection: DolbyEProgramSelection;
            };
          };
        };
      })[];
      CaptionSelectors: (CaptionSelector & {
        Name: __stringMin1;
        SelectorSettings: CaptionSelectorSettings & {
          TeletextSourceSettings: TeletextSourceSettings & {
            OutputRectangle: CaptionRectangle & {
              Height: __doubleMin0Max100;
              LeftOffset: __doubleMin0Max100;
              TopOffset: __doubleMin0Max100;
              Width: __doubleMin0Max100;
            };
          };
        };
      })[];
    };
  })[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  MaintenanceStatus?: string;
  Name?: string;
  PipelineDetails?: PipelineDetail[];
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export const RestartChannelPipelinesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CdiInputSpecification: S.optional(CdiInputSpecification),
    ChannelClass: S.optional(ChannelClass),
    Destinations: S.optional(__listOfOutputDestination),
    EgressEndpoints: S.optional(__listOfChannelEgressEndpoint),
    EncoderSettings: S.optional(EncoderSettings),
    Id: S.optional(S.String),
    InputAttachments: S.optional(__listOfInputAttachment),
    InputSpecification: S.optional(InputSpecification),
    LogLevel: S.optional(LogLevel),
    Maintenance: S.optional(MaintenanceStatus),
    MaintenanceStatus: S.optional(S.String),
    Name: S.optional(S.String),
    PipelineDetails: S.optional(__listOfPipelineDetail),
    PipelinesRunningCount: S.optional(S.Number),
    RoleArn: S.optional(S.String),
    State: S.optional(ChannelState),
    Tags: S.optional(Tags),
    Vpc: S.optional(VpcOutputSettingsDescription),
    AnywhereSettings: S.optional(DescribeAnywhereSettings),
    ChannelEngineVersion: S.optional(ChannelEngineVersionResponse),
    LinkedChannelSettings: S.optional(DescribeLinkedChannelSettings),
    ChannelSecurityGroups: S.optional(__listOf__string),
    InferenceSettings: S.optional(DescribeInferenceSettings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CdiInputSpecification: "cdiInputSpecification",
      ChannelClass: "channelClass",
      Destinations: "destinations",
      EgressEndpoints: "egressEndpoints",
      EncoderSettings: "encoderSettings",
      Id: "id",
      InputAttachments: "inputAttachments",
      InputSpecification: "inputSpecification",
      LogLevel: "logLevel",
      Maintenance: "maintenance",
      MaintenanceStatus: "maintenanceStatus",
      Name: "name",
      PipelineDetails: "pipelineDetails",
      PipelinesRunningCount: "pipelinesRunningCount",
      RoleArn: "roleArn",
      State: "state",
      Tags: "tags",
      Vpc: "vpc",
      AnywhereSettings: "anywhereSettings",
      ChannelEngineVersion: "channelEngineVersion",
      LinkedChannelSettings: "linkedChannelSettings",
      ChannelSecurityGroups: "channelSecurityGroups",
      InferenceSettings: "inferenceSettings",
    }),
  ),
).annotate({
  identifier: "RestartChannelPipelinesResponse",
}) as any as S.Schema<RestartChannelPipelinesResponse>;
export interface StartChannelRequest {
  ChannelId: string;
}
export const StartChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelId: S.String.pipe(T.HttpLabel("ChannelId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/prod/channels/{ChannelId}/start" }),
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
export interface StartChannelResponse {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  EncoderSettings?: EncoderSettings & {
    AudioDescriptions: (AudioDescription & {
      AudioSelectorName: string;
      Name: __stringMax255;
      AudioWatermarkingSettings: AudioWatermarkSettings & {
        NielsenWatermarksSettings: NielsenWatermarksSettings & {
          NielsenCbetSettings: NielsenCBET & {
            CbetCheckDigitString: __stringMin2Max2;
            CbetStepaside: NielsenWatermarksCbetStepaside;
            Csid: __stringMin1Max7;
          };
          NielsenNaesIiNwSettings: NielsenNaesIiNw & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
        };
      };
      RemixSettings: RemixSettings & {
        ChannelMappings: (AudioChannelMapping & {
          InputChannelLevels: (InputChannelLevel & {
            Gain: __integerMinNegative60Max6;
            InputChannel: __integerMin0Max15;
          })[];
          OutputChannel: __integerMin0Max7;
        })[];
      };
    })[];
    OutputGroups: (OutputGroup & {
      OutputGroupSettings: OutputGroupSettings & {
        ArchiveGroupSettings: ArchiveGroupSettings & {
          Destination: OutputLocationRef;
        };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
          Destination: OutputLocationRef;
        };
        HlsGroupSettings: HlsGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
            LanguageDescription: __stringMin1;
          })[];
          KeyProviderSettings: KeyProviderSettings & {
            StaticKeySettings: StaticKeySettings & {
              StaticKeyValue: __stringMin32Max32;
              KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
            };
          };
        };
        MediaPackageGroupSettings: MediaPackageGroupSettings & {
          Destination: OutputLocationRef;
          MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            AdditionalDestinations: (MediaPackageAdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & {
          Destination: OutputLocationRef;
        };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & {
            Destination: OutputLocationRef;
          })[];
        };
      };
      Outputs: (Output & {
        OutputSettings: OutputSettings & {
          ArchiveOutputSettings: ArchiveOutputSettings & {
            ContainerSettings: ArchiveContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
          };
          HlsOutputSettings: HlsOutputSettings & {
            HlsSettings: HlsSettings & {
              AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
              };
              StandardHlsSettings: StandardHlsSettings & {
                M3u8Settings: M3u8Settings;
              };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & {
            Destination: OutputLocationRef;
          };
          RtmpOutputSettings: RtmpOutputSettings & {
            Destination: OutputLocationRef;
          };
          UdpOutputSettings: UdpOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          SrtOutputSettings: SrtOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
            ContainerSettings: MediaConnectRouterContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
        };
      })[];
    })[];
    TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
    VideoDescriptions: (VideoDescription & {
      Name: string;
      CodecSettings: VideoCodecSettings & {
        FrameCaptureSettings: FrameCaptureSettings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H264Settings: H264Settings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H265Settings: H265Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Mpeg2Settings: Mpeg2Settings & {
          FramerateDenominator: __integerMin1;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Av1Settings: Av1Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
      };
    })[];
    AvailBlanking: AvailBlanking & {
      AvailBlankingImage: InputLocation & { Uri: __stringMax2048 };
    };
    AvailConfiguration: AvailConfiguration & {
      AvailSettings: AvailSettings & {
        Esam: Esam & {
          AcquisitionPointId: __stringMax256;
          PoisEndpoint: __stringMax2048;
        };
      };
    };
    BlackoutSlate: BlackoutSlate & {
      BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
      NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
    };
    CaptionDescriptions: (CaptionDescription & {
      CaptionSelectorName: string;
      Name: string;
      DestinationSettings: CaptionDestinationSettings & {
        BurnInDestinationSettings: BurnInDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
        DvbSubDestinationSettings: DvbSubDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
      };
    })[];
    GlobalConfiguration: GlobalConfiguration & {
      InputLossBehavior: InputLossBehavior & {
        InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
      };
    };
    MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
      MotionGraphicsSettings: MotionGraphicsSettings;
    };
    ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
    ColorCorrectionSettings: ColorCorrectionSettings & {
      GlobalColorCorrections: (ColorCorrection & {
        InputColorSpace: ColorSpace;
        OutputColorSpace: ColorSpace;
        Uri: string;
      })[];
    };
  };
  Id?: string;
  InputAttachments?: (InputAttachment & {
    AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
      SecondaryInputId: string;
      FailoverConditions: (FailoverCondition & {
        FailoverConditionSettings: FailoverConditionSettings & {
          AudioSilenceSettings: AudioSilenceFailoverSettings & {
            AudioSelectorName: string;
          };
        };
      })[];
    };
    InputSettings: InputSettings & {
      AudioSelectors: (AudioSelector & {
        Name: __stringMin1;
        SelectorSettings: AudioSelectorSettings & {
          AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
            GroupId: __stringMin1;
            Name: __stringMin1;
          };
          AudioLanguageSelection: AudioLanguageSelection & {
            LanguageCode: string;
          };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
          };
          AudioTrackSelection: AudioTrackSelection & {
            Tracks: (AudioTrack & {
              Track: __integerMin1;
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
            DolbyEDecode: AudioDolbyEDecode & {
              ProgramSelection: DolbyEProgramSelection;
            };
          };
        };
      })[];
      CaptionSelectors: (CaptionSelector & {
        Name: __stringMin1;
        SelectorSettings: CaptionSelectorSettings & {
          TeletextSourceSettings: TeletextSourceSettings & {
            OutputRectangle: CaptionRectangle & {
              Height: __doubleMin0Max100;
              LeftOffset: __doubleMin0Max100;
              TopOffset: __doubleMin0Max100;
              Width: __doubleMin0Max100;
            };
          };
        };
      })[];
    };
  })[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  Name?: string;
  PipelineDetails?: PipelineDetail[];
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export const StartChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CdiInputSpecification: S.optional(CdiInputSpecification),
    ChannelClass: S.optional(ChannelClass),
    Destinations: S.optional(__listOfOutputDestination),
    EgressEndpoints: S.optional(__listOfChannelEgressEndpoint),
    EncoderSettings: S.optional(EncoderSettings),
    Id: S.optional(S.String),
    InputAttachments: S.optional(__listOfInputAttachment),
    InputSpecification: S.optional(InputSpecification),
    LogLevel: S.optional(LogLevel),
    Maintenance: S.optional(MaintenanceStatus),
    Name: S.optional(S.String),
    PipelineDetails: S.optional(__listOfPipelineDetail),
    PipelinesRunningCount: S.optional(S.Number),
    RoleArn: S.optional(S.String),
    State: S.optional(ChannelState),
    Tags: S.optional(Tags),
    Vpc: S.optional(VpcOutputSettingsDescription),
    AnywhereSettings: S.optional(DescribeAnywhereSettings),
    ChannelEngineVersion: S.optional(ChannelEngineVersionResponse),
    LinkedChannelSettings: S.optional(DescribeLinkedChannelSettings),
    ChannelSecurityGroups: S.optional(__listOf__string),
    InferenceSettings: S.optional(DescribeInferenceSettings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CdiInputSpecification: "cdiInputSpecification",
      ChannelClass: "channelClass",
      Destinations: "destinations",
      EgressEndpoints: "egressEndpoints",
      EncoderSettings: "encoderSettings",
      Id: "id",
      InputAttachments: "inputAttachments",
      InputSpecification: "inputSpecification",
      LogLevel: "logLevel",
      Maintenance: "maintenance",
      Name: "name",
      PipelineDetails: "pipelineDetails",
      PipelinesRunningCount: "pipelinesRunningCount",
      RoleArn: "roleArn",
      State: "state",
      Tags: "tags",
      Vpc: "vpc",
      AnywhereSettings: "anywhereSettings",
      ChannelEngineVersion: "channelEngineVersion",
      LinkedChannelSettings: "linkedChannelSettings",
      ChannelSecurityGroups: "channelSecurityGroups",
      InferenceSettings: "inferenceSettings",
    }),
  ),
).annotate({
  identifier: "StartChannelResponse",
}) as any as S.Schema<StartChannelResponse>;
export interface StartDeleteMonitorDeploymentRequest {
  Identifier: string;
}
export const StartDeleteMonitorDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/prod/signal-maps/{Identifier}/monitor-deployment",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartDeleteMonitorDeploymentRequest",
}) as any as S.Schema<StartDeleteMonitorDeploymentRequest>;
export interface StartDeleteMonitorDeploymentResponse {
  Arn?: string;
  CloudWatchAlarmTemplateGroupIds?: string[];
  CreatedAt?: Date;
  Description?: string;
  DiscoveryEntryPointArn?: string;
  ErrorMessage?: string;
  EventBridgeRuleTemplateGroupIds?: string[];
  FailedMediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  Id?: string;
  LastDiscoveredAt?: Date;
  LastSuccessfulMonitorDeployment?: SuccessfulMonitorDeployment & {
    DetailsUri: __stringMin1Max2048;
    Status: SignalMapMonitorDeploymentStatus;
  };
  MediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & {
    Status: SignalMapMonitorDeploymentStatus;
  };
  Name?: string;
  Status?: SignalMapStatus;
  Tags?: { [key: string]: string | undefined };
}
export const StartDeleteMonitorDeploymentResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CloudWatchAlarmTemplateGroupIds: S.optional(
        __listOf__stringMin7Max11PatternAws097,
      ),
      CreatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Description: S.optional(S.String),
      DiscoveryEntryPointArn: S.optional(S.String),
      ErrorMessage: S.optional(S.String),
      EventBridgeRuleTemplateGroupIds: S.optional(
        __listOf__stringMin7Max11PatternAws097,
      ),
      FailedMediaResourceMap: S.optional(FailedMediaResourceMap),
      Id: S.optional(S.String),
      LastDiscoveredAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      LastSuccessfulMonitorDeployment: S.optional(SuccessfulMonitorDeployment),
      MediaResourceMap: S.optional(MediaResourceMap),
      ModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      MonitorChangesPendingDeployment: S.optional(S.Boolean),
      MonitorDeployment: S.optional(MonitorDeployment),
      Name: S.optional(S.String),
      Status: S.optional(SignalMapStatus),
      Tags: S.optional(TagMap),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        CloudWatchAlarmTemplateGroupIds: "cloudWatchAlarmTemplateGroupIds",
        CreatedAt: "createdAt",
        Description: "description",
        DiscoveryEntryPointArn: "discoveryEntryPointArn",
        ErrorMessage: "errorMessage",
        EventBridgeRuleTemplateGroupIds: "eventBridgeRuleTemplateGroupIds",
        FailedMediaResourceMap: "failedMediaResourceMap",
        Id: "id",
        LastDiscoveredAt: "lastDiscoveredAt",
        LastSuccessfulMonitorDeployment: "lastSuccessfulMonitorDeployment",
        MediaResourceMap: "mediaResourceMap",
        ModifiedAt: "modifiedAt",
        MonitorChangesPendingDeployment: "monitorChangesPendingDeployment",
        MonitorDeployment: "monitorDeployment",
        Name: "name",
        Status: "status",
        Tags: "tags",
      }),
    ),
).annotate({
  identifier: "StartDeleteMonitorDeploymentResponse",
}) as any as S.Schema<StartDeleteMonitorDeploymentResponse>;
export interface StartInputDeviceRequest {
  InputDeviceId: string;
}
export const StartInputDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/prod/inputDevices/{InputDeviceId}/start",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartInputDeviceRequest",
}) as any as S.Schema<StartInputDeviceRequest>;
export interface StartInputDeviceResponse {}
export const StartInputDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StartInputDeviceResponse",
}) as any as S.Schema<StartInputDeviceResponse>;
export interface StartInputDeviceMaintenanceWindowRequest {
  InputDeviceId: string;
}
export const StartInputDeviceMaintenanceWindowRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")),
    }).pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/prod/inputDevices/{InputDeviceId}/startInputDeviceMaintenanceWindow",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartInputDeviceMaintenanceWindowRequest",
}) as any as S.Schema<StartInputDeviceMaintenanceWindowRequest>;
export interface StartInputDeviceMaintenanceWindowResponse {}
export const StartInputDeviceMaintenanceWindowResponse =
  /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
    identifier: "StartInputDeviceMaintenanceWindowResponse",
  }) as any as S.Schema<StartInputDeviceMaintenanceWindowResponse>;
export interface StartMonitorDeploymentRequest {
  DryRun?: boolean;
  Identifier: string;
}
export const StartMonitorDeploymentRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DryRun: S.optional(S.Boolean),
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
  })
    .pipe(S.encodeKeys({ DryRun: "dryRun" }))
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/prod/signal-maps/{Identifier}/monitor-deployment",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartMonitorDeploymentRequest",
}) as any as S.Schema<StartMonitorDeploymentRequest>;
export interface StartMonitorDeploymentResponse {
  Arn?: string;
  CloudWatchAlarmTemplateGroupIds?: string[];
  CreatedAt?: Date;
  Description?: string;
  DiscoveryEntryPointArn?: string;
  ErrorMessage?: string;
  EventBridgeRuleTemplateGroupIds?: string[];
  FailedMediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  Id?: string;
  LastDiscoveredAt?: Date;
  LastSuccessfulMonitorDeployment?: SuccessfulMonitorDeployment & {
    DetailsUri: __stringMin1Max2048;
    Status: SignalMapMonitorDeploymentStatus;
  };
  MediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & {
    Status: SignalMapMonitorDeploymentStatus;
  };
  Name?: string;
  Status?: SignalMapStatus;
  Tags?: { [key: string]: string | undefined };
}
export const StartMonitorDeploymentResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CloudWatchAlarmTemplateGroupIds: S.optional(
      __listOf__stringMin7Max11PatternAws097,
    ),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DiscoveryEntryPointArn: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    EventBridgeRuleTemplateGroupIds: S.optional(
      __listOf__stringMin7Max11PatternAws097,
    ),
    FailedMediaResourceMap: S.optional(FailedMediaResourceMap),
    Id: S.optional(S.String),
    LastDiscoveredAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastSuccessfulMonitorDeployment: S.optional(SuccessfulMonitorDeployment),
    MediaResourceMap: S.optional(MediaResourceMap),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    MonitorChangesPendingDeployment: S.optional(S.Boolean),
    MonitorDeployment: S.optional(MonitorDeployment),
    Name: S.optional(S.String),
    Status: S.optional(SignalMapStatus),
    Tags: S.optional(TagMap),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CloudWatchAlarmTemplateGroupIds: "cloudWatchAlarmTemplateGroupIds",
      CreatedAt: "createdAt",
      Description: "description",
      DiscoveryEntryPointArn: "discoveryEntryPointArn",
      ErrorMessage: "errorMessage",
      EventBridgeRuleTemplateGroupIds: "eventBridgeRuleTemplateGroupIds",
      FailedMediaResourceMap: "failedMediaResourceMap",
      Id: "id",
      LastDiscoveredAt: "lastDiscoveredAt",
      LastSuccessfulMonitorDeployment: "lastSuccessfulMonitorDeployment",
      MediaResourceMap: "mediaResourceMap",
      ModifiedAt: "modifiedAt",
      MonitorChangesPendingDeployment: "monitorChangesPendingDeployment",
      MonitorDeployment: "monitorDeployment",
      Name: "name",
      Status: "status",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "StartMonitorDeploymentResponse",
}) as any as S.Schema<StartMonitorDeploymentResponse>;
export interface StartMultiplexRequest {
  MultiplexId: string;
}
export const StartMultiplexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/prod/multiplexes/{MultiplexId}/start" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StartMultiplexRequest",
}) as any as S.Schema<StartMultiplexRequest>;
export interface StartMultiplexResponse {
  Arn?: string;
  AvailabilityZones?: string[];
  Destinations?: MultiplexOutputDestination[];
  Id?: string;
  MultiplexSettings?: MultiplexSettings & {
    TransportStreamBitrate: __integerMin1000000Max100000000;
    TransportStreamId: __integerMin0Max65535;
  };
  Name?: string;
  PipelinesRunningCount?: number;
  ProgramCount?: number;
  State?: MultiplexState;
  Tags?: { [key: string]: string | undefined };
}
export const StartMultiplexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AvailabilityZones: S.optional(__listOf__string),
    Destinations: S.optional(__listOfMultiplexOutputDestination),
    Id: S.optional(S.String),
    MultiplexSettings: S.optional(MultiplexSettings),
    Name: S.optional(S.String),
    PipelinesRunningCount: S.optional(S.Number),
    ProgramCount: S.optional(S.Number),
    State: S.optional(MultiplexState),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AvailabilityZones: "availabilityZones",
      Destinations: "destinations",
      Id: "id",
      MultiplexSettings: "multiplexSettings",
      Name: "name",
      PipelinesRunningCount: "pipelinesRunningCount",
      ProgramCount: "programCount",
      State: "state",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "StartMultiplexResponse",
}) as any as S.Schema<StartMultiplexResponse>;
export interface StartUpdateSignalMapRequest {
  CloudWatchAlarmTemplateGroupIdentifiers?: string[];
  Description?: string;
  DiscoveryEntryPointArn?: string;
  EventBridgeRuleTemplateGroupIdentifiers?: string[];
  ForceRediscovery?: boolean;
  Identifier: string;
  Name?: string;
}
export const StartUpdateSignalMapRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CloudWatchAlarmTemplateGroupIdentifiers: S.optional(
      __listOf__stringPatternS,
    ),
    Description: S.optional(S.String),
    DiscoveryEntryPointArn: S.optional(S.String),
    EventBridgeRuleTemplateGroupIdentifiers: S.optional(
      __listOf__stringPatternS,
    ),
    ForceRediscovery: S.optional(S.Boolean),
    Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    Name: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        CloudWatchAlarmTemplateGroupIdentifiers:
          "cloudWatchAlarmTemplateGroupIdentifiers",
        Description: "description",
        DiscoveryEntryPointArn: "discoveryEntryPointArn",
        EventBridgeRuleTemplateGroupIdentifiers:
          "eventBridgeRuleTemplateGroupIdentifiers",
        ForceRediscovery: "forceRediscovery",
        Name: "name",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PATCH", uri: "/prod/signal-maps/{Identifier}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartUpdateSignalMapRequest",
}) as any as S.Schema<StartUpdateSignalMapRequest>;
export interface StartUpdateSignalMapResponse {
  Arn?: string;
  CloudWatchAlarmTemplateGroupIds?: string[];
  CreatedAt?: Date;
  Description?: string;
  DiscoveryEntryPointArn?: string;
  ErrorMessage?: string;
  EventBridgeRuleTemplateGroupIds?: string[];
  FailedMediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  Id?: string;
  LastDiscoveredAt?: Date;
  LastSuccessfulMonitorDeployment?: SuccessfulMonitorDeployment & {
    DetailsUri: __stringMin1Max2048;
    Status: SignalMapMonitorDeploymentStatus;
  };
  MediaResourceMap?: {
    [key: string]:
      | (MediaResource & {
          Destinations: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
          Sources: (MediaResourceNeighbor & {
            Arn: __stringMin1Max2048PatternArn;
          })[];
        })
      | undefined;
  };
  ModifiedAt?: Date;
  MonitorChangesPendingDeployment?: boolean;
  MonitorDeployment?: MonitorDeployment & {
    Status: SignalMapMonitorDeploymentStatus;
  };
  Name?: string;
  Status?: SignalMapStatus;
  Tags?: { [key: string]: string | undefined };
}
export const StartUpdateSignalMapResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CloudWatchAlarmTemplateGroupIds: S.optional(
      __listOf__stringMin7Max11PatternAws097,
    ),
    CreatedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    Description: S.optional(S.String),
    DiscoveryEntryPointArn: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
    EventBridgeRuleTemplateGroupIds: S.optional(
      __listOf__stringMin7Max11PatternAws097,
    ),
    FailedMediaResourceMap: S.optional(FailedMediaResourceMap),
    Id: S.optional(S.String),
    LastDiscoveredAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    LastSuccessfulMonitorDeployment: S.optional(SuccessfulMonitorDeployment),
    MediaResourceMap: S.optional(MediaResourceMap),
    ModifiedAt: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    MonitorChangesPendingDeployment: S.optional(S.Boolean),
    MonitorDeployment: S.optional(MonitorDeployment),
    Name: S.optional(S.String),
    Status: S.optional(SignalMapStatus),
    Tags: S.optional(TagMap),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CloudWatchAlarmTemplateGroupIds: "cloudWatchAlarmTemplateGroupIds",
      CreatedAt: "createdAt",
      Description: "description",
      DiscoveryEntryPointArn: "discoveryEntryPointArn",
      ErrorMessage: "errorMessage",
      EventBridgeRuleTemplateGroupIds: "eventBridgeRuleTemplateGroupIds",
      FailedMediaResourceMap: "failedMediaResourceMap",
      Id: "id",
      LastDiscoveredAt: "lastDiscoveredAt",
      LastSuccessfulMonitorDeployment: "lastSuccessfulMonitorDeployment",
      MediaResourceMap: "mediaResourceMap",
      ModifiedAt: "modifiedAt",
      MonitorChangesPendingDeployment: "monitorChangesPendingDeployment",
      MonitorDeployment: "monitorDeployment",
      Name: "name",
      Status: "status",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "StartUpdateSignalMapResponse",
}) as any as S.Schema<StartUpdateSignalMapResponse>;
export interface StopChannelRequest {
  ChannelId: string;
}
export const StopChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ChannelId: S.String.pipe(T.HttpLabel("ChannelId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/prod/channels/{ChannelId}/stop" }),
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
export interface StopChannelResponse {
  Arn?: string;
  CdiInputSpecification?: CdiInputSpecification;
  ChannelClass?: ChannelClass;
  Destinations?: OutputDestination[];
  EgressEndpoints?: ChannelEgressEndpoint[];
  EncoderSettings?: EncoderSettings & {
    AudioDescriptions: (AudioDescription & {
      AudioSelectorName: string;
      Name: __stringMax255;
      AudioWatermarkingSettings: AudioWatermarkSettings & {
        NielsenWatermarksSettings: NielsenWatermarksSettings & {
          NielsenCbetSettings: NielsenCBET & {
            CbetCheckDigitString: __stringMin2Max2;
            CbetStepaside: NielsenWatermarksCbetStepaside;
            Csid: __stringMin1Max7;
          };
          NielsenNaesIiNwSettings: NielsenNaesIiNw & {
            CheckDigitString: __stringMin2Max2;
            Sid: __doubleMin1Max65535;
          };
        };
      };
      RemixSettings: RemixSettings & {
        ChannelMappings: (AudioChannelMapping & {
          InputChannelLevels: (InputChannelLevel & {
            Gain: __integerMinNegative60Max6;
            InputChannel: __integerMin0Max15;
          })[];
          OutputChannel: __integerMin0Max7;
        })[];
      };
    })[];
    OutputGroups: (OutputGroup & {
      OutputGroupSettings: OutputGroupSettings & {
        ArchiveGroupSettings: ArchiveGroupSettings & {
          Destination: OutputLocationRef;
        };
        FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
          Destination: OutputLocationRef;
        };
        HlsGroupSettings: HlsGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
            LanguageDescription: __stringMin1;
          })[];
          KeyProviderSettings: KeyProviderSettings & {
            StaticKeySettings: StaticKeySettings & {
              StaticKeyValue: __stringMin32Max32;
              KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
            };
          };
        };
        MediaPackageGroupSettings: MediaPackageGroupSettings & {
          Destination: OutputLocationRef;
          MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            AdditionalDestinations: (MediaPackageAdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
          };
        };
        MsSmoothGroupSettings: MsSmoothGroupSettings & {
          Destination: OutputLocationRef;
        };
        CmafIngestGroupSettings: CmafIngestGroupSettings & {
          Destination: OutputLocationRef;
          CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
            CaptionChannel: __integerMin1Max4;
            LanguageCode: __stringMin3Max3;
          })[];
          AdditionalDestinations: (AdditionalDestinations & {
            Destination: OutputLocationRef;
          })[];
        };
      };
      Outputs: (Output & {
        OutputSettings: OutputSettings & {
          ArchiveOutputSettings: ArchiveOutputSettings & {
            ContainerSettings: ArchiveContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
          };
          HlsOutputSettings: HlsOutputSettings & {
            HlsSettings: HlsSettings & {
              AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
              };
              StandardHlsSettings: StandardHlsSettings & {
                M3u8Settings: M3u8Settings;
              };
            };
          };
          MultiplexOutputSettings: MultiplexOutputSettings & {
            Destination: OutputLocationRef;
          };
          RtmpOutputSettings: RtmpOutputSettings & {
            Destination: OutputLocationRef;
          };
          UdpOutputSettings: UdpOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          SrtOutputSettings: SrtOutputSettings & {
            ContainerSettings: UdpContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
          MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
            ContainerSettings: MediaConnectRouterContainerSettings & {
              M2tsSettings: M2tsSettings & {
                DvbNitSettings: DvbNitSettings & {
                  NetworkId: __integerMin0Max65536;
                  NetworkName: __stringMin1Max256;
                };
              };
            };
            Destination: OutputLocationRef;
          };
        };
      })[];
    })[];
    TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
    VideoDescriptions: (VideoDescription & {
      Name: string;
      CodecSettings: VideoCodecSettings & {
        FrameCaptureSettings: FrameCaptureSettings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H264Settings: H264Settings & {
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        H265Settings: H265Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Mpeg2Settings: Mpeg2Settings & {
          FramerateDenominator: __integerMin1;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
        Av1Settings: Av1Settings & {
          FramerateDenominator: __integerMin1Max3003;
          FramerateNumerator: __integerMin1;
          TimecodeBurninSettings: TimecodeBurninSettings & {
            FontSize: TimecodeBurninFontSize;
            Position: TimecodeBurninPosition;
          };
        };
      };
    })[];
    AvailBlanking: AvailBlanking & {
      AvailBlankingImage: InputLocation & { Uri: __stringMax2048 };
    };
    AvailConfiguration: AvailConfiguration & {
      AvailSettings: AvailSettings & {
        Esam: Esam & {
          AcquisitionPointId: __stringMax256;
          PoisEndpoint: __stringMax2048;
        };
      };
    };
    BlackoutSlate: BlackoutSlate & {
      BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
      NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
    };
    CaptionDescriptions: (CaptionDescription & {
      CaptionSelectorName: string;
      Name: string;
      DestinationSettings: CaptionDestinationSettings & {
        BurnInDestinationSettings: BurnInDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
        DvbSubDestinationSettings: DvbSubDestinationSettings & {
          Font: InputLocation & { Uri: __stringMax2048 };
        };
      };
    })[];
    GlobalConfiguration: GlobalConfiguration & {
      InputLossBehavior: InputLossBehavior & {
        InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
      };
    };
    MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
      MotionGraphicsSettings: MotionGraphicsSettings;
    };
    ThumbnailConfiguration: ThumbnailConfiguration & { State: ThumbnailState };
    ColorCorrectionSettings: ColorCorrectionSettings & {
      GlobalColorCorrections: (ColorCorrection & {
        InputColorSpace: ColorSpace;
        OutputColorSpace: ColorSpace;
        Uri: string;
      })[];
    };
  };
  Id?: string;
  InputAttachments?: (InputAttachment & {
    AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
      SecondaryInputId: string;
      FailoverConditions: (FailoverCondition & {
        FailoverConditionSettings: FailoverConditionSettings & {
          AudioSilenceSettings: AudioSilenceFailoverSettings & {
            AudioSelectorName: string;
          };
        };
      })[];
    };
    InputSettings: InputSettings & {
      AudioSelectors: (AudioSelector & {
        Name: __stringMin1;
        SelectorSettings: AudioSelectorSettings & {
          AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
            GroupId: __stringMin1;
            Name: __stringMin1;
          };
          AudioLanguageSelection: AudioLanguageSelection & {
            LanguageCode: string;
          };
          AudioPidSelection: AudioPidSelection & {
            Pid: __integerMin0Max8191;
            Pids: (AudioPid & {
              Pid: __integerMin0Max8191;
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
          };
          AudioTrackSelection: AudioTrackSelection & {
            Tracks: (AudioTrack & {
              Track: __integerMin1;
              PremixSettings: AudioPreMixerSettings & {
                RemixSettings: RemixSettings & {
                  ChannelMappings: (AudioChannelMapping & {
                    InputChannelLevels: (InputChannelLevel & {
                      Gain: __integerMinNegative60Max6;
                      InputChannel: __integerMin0Max15;
                    })[];
                    OutputChannel: __integerMin0Max7;
                  })[];
                };
              };
            })[];
            DolbyEDecode: AudioDolbyEDecode & {
              ProgramSelection: DolbyEProgramSelection;
            };
          };
        };
      })[];
      CaptionSelectors: (CaptionSelector & {
        Name: __stringMin1;
        SelectorSettings: CaptionSelectorSettings & {
          TeletextSourceSettings: TeletextSourceSettings & {
            OutputRectangle: CaptionRectangle & {
              Height: __doubleMin0Max100;
              LeftOffset: __doubleMin0Max100;
              TopOffset: __doubleMin0Max100;
              Width: __doubleMin0Max100;
            };
          };
        };
      })[];
    };
  })[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceStatus;
  Name?: string;
  PipelineDetails?: PipelineDetail[];
  PipelinesRunningCount?: number;
  RoleArn?: string;
  State?: ChannelState;
  Tags?: { [key: string]: string | undefined };
  Vpc?: VpcOutputSettingsDescription;
  AnywhereSettings?: DescribeAnywhereSettings;
  ChannelEngineVersion?: ChannelEngineVersionResponse;
  LinkedChannelSettings?: DescribeLinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: DescribeInferenceSettings;
}
export const StopChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CdiInputSpecification: S.optional(CdiInputSpecification),
    ChannelClass: S.optional(ChannelClass),
    Destinations: S.optional(__listOfOutputDestination),
    EgressEndpoints: S.optional(__listOfChannelEgressEndpoint),
    EncoderSettings: S.optional(EncoderSettings),
    Id: S.optional(S.String),
    InputAttachments: S.optional(__listOfInputAttachment),
    InputSpecification: S.optional(InputSpecification),
    LogLevel: S.optional(LogLevel),
    Maintenance: S.optional(MaintenanceStatus),
    Name: S.optional(S.String),
    PipelineDetails: S.optional(__listOfPipelineDetail),
    PipelinesRunningCount: S.optional(S.Number),
    RoleArn: S.optional(S.String),
    State: S.optional(ChannelState),
    Tags: S.optional(Tags),
    Vpc: S.optional(VpcOutputSettingsDescription),
    AnywhereSettings: S.optional(DescribeAnywhereSettings),
    ChannelEngineVersion: S.optional(ChannelEngineVersionResponse),
    LinkedChannelSettings: S.optional(DescribeLinkedChannelSettings),
    ChannelSecurityGroups: S.optional(__listOf__string),
    InferenceSettings: S.optional(DescribeInferenceSettings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      CdiInputSpecification: "cdiInputSpecification",
      ChannelClass: "channelClass",
      Destinations: "destinations",
      EgressEndpoints: "egressEndpoints",
      EncoderSettings: "encoderSettings",
      Id: "id",
      InputAttachments: "inputAttachments",
      InputSpecification: "inputSpecification",
      LogLevel: "logLevel",
      Maintenance: "maintenance",
      Name: "name",
      PipelineDetails: "pipelineDetails",
      PipelinesRunningCount: "pipelinesRunningCount",
      RoleArn: "roleArn",
      State: "state",
      Tags: "tags",
      Vpc: "vpc",
      AnywhereSettings: "anywhereSettings",
      ChannelEngineVersion: "channelEngineVersion",
      LinkedChannelSettings: "linkedChannelSettings",
      ChannelSecurityGroups: "channelSecurityGroups",
      InferenceSettings: "inferenceSettings",
    }),
  ),
).annotate({
  identifier: "StopChannelResponse",
}) as any as S.Schema<StopChannelResponse>;
export interface StopInputDeviceRequest {
  InputDeviceId: string;
}
export const StopInputDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/prod/inputDevices/{InputDeviceId}/stop",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopInputDeviceRequest",
}) as any as S.Schema<StopInputDeviceRequest>;
export interface StopInputDeviceResponse {}
export const StopInputDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "StopInputDeviceResponse",
}) as any as S.Schema<StopInputDeviceResponse>;
export interface StopMultiplexRequest {
  MultiplexId: string;
}
export const StopMultiplexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/prod/multiplexes/{MultiplexId}/stop" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "StopMultiplexRequest",
}) as any as S.Schema<StopMultiplexRequest>;
export interface StopMultiplexResponse {
  Arn?: string;
  AvailabilityZones?: string[];
  Destinations?: MultiplexOutputDestination[];
  Id?: string;
  MultiplexSettings?: MultiplexSettings & {
    TransportStreamBitrate: __integerMin1000000Max100000000;
    TransportStreamId: __integerMin0Max65535;
  };
  Name?: string;
  PipelinesRunningCount?: number;
  ProgramCount?: number;
  State?: MultiplexState;
  Tags?: { [key: string]: string | undefined };
}
export const StopMultiplexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AvailabilityZones: S.optional(__listOf__string),
    Destinations: S.optional(__listOfMultiplexOutputDestination),
    Id: S.optional(S.String),
    MultiplexSettings: S.optional(MultiplexSettings),
    Name: S.optional(S.String),
    PipelinesRunningCount: S.optional(S.Number),
    ProgramCount: S.optional(S.Number),
    State: S.optional(MultiplexState),
    Tags: S.optional(Tags),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AvailabilityZones: "availabilityZones",
      Destinations: "destinations",
      Id: "id",
      MultiplexSettings: "multiplexSettings",
      Name: "name",
      PipelinesRunningCount: "pipelinesRunningCount",
      ProgramCount: "programCount",
      State: "state",
      Tags: "tags",
    }),
  ),
).annotate({
  identifier: "StopMultiplexResponse",
}) as any as S.Schema<StopMultiplexResponse>;
export interface TransferInputDeviceRequest {
  InputDeviceId: string;
  TargetCustomerId?: string;
  TargetRegion?: string;
  TransferMessage?: string;
}
export const TransferInputDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")),
    TargetCustomerId: S.optional(S.String),
    TargetRegion: S.optional(S.String),
    TransferMessage: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        TargetCustomerId: "targetCustomerId",
        TargetRegion: "targetRegion",
        TransferMessage: "transferMessage",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "POST",
          uri: "/prod/inputDevices/{InputDeviceId}/transfer",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "TransferInputDeviceRequest",
}) as any as S.Schema<TransferInputDeviceRequest>;
export interface TransferInputDeviceResponse {}
export const TransferInputDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "TransferInputDeviceResponse",
}) as any as S.Schema<TransferInputDeviceResponse>;
export interface UpdateAccountConfigurationRequest {
  AccountConfiguration?: AccountConfiguration;
}
export const UpdateAccountConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountConfiguration: S.optional(AccountConfiguration) })
    .pipe(S.encodeKeys({ AccountConfiguration: "accountConfiguration" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/prod/accountConfiguration" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateAccountConfigurationRequest",
}) as any as S.Schema<UpdateAccountConfigurationRequest>;
export interface UpdateAccountConfigurationResponse {
  AccountConfiguration?: AccountConfiguration;
}
export const UpdateAccountConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AccountConfiguration: S.optional(AccountConfiguration) }).pipe(
    S.encodeKeys({ AccountConfiguration: "accountConfiguration" }),
  ),
).annotate({
  identifier: "UpdateAccountConfigurationResponse",
}) as any as S.Schema<UpdateAccountConfigurationResponse>;
export interface MaintenanceUpdateSettings {
  MaintenanceDay?: MaintenanceDay;
  MaintenanceScheduledDate?: string;
  MaintenanceStartTime?: string;
}
export const MaintenanceUpdateSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaintenanceDay: S.optional(MaintenanceDay),
    MaintenanceScheduledDate: S.optional(S.String),
    MaintenanceStartTime: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      MaintenanceDay: "maintenanceDay",
      MaintenanceScheduledDate: "maintenanceScheduledDate",
      MaintenanceStartTime: "maintenanceStartTime",
    }),
  ),
).annotate({
  identifier: "MaintenanceUpdateSettings",
}) as any as S.Schema<MaintenanceUpdateSettings>;
export interface SpecialRouterSettings {
  RouterArn?: string;
}
export const SpecialRouterSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ RouterArn: S.optional(S.String) }).pipe(
    S.encodeKeys({ RouterArn: "routerArn" }),
  ),
).annotate({
  identifier: "SpecialRouterSettings",
}) as any as S.Schema<SpecialRouterSettings>;
export interface UpdateChannelRequest {
  CdiInputSpecification?: CdiInputSpecification;
  ChannelId: string;
  Destinations?: OutputDestination[];
  EncoderSettings?: EncoderSettings;
  InputAttachments?: InputAttachment[];
  InputSpecification?: InputSpecification;
  LogLevel?: LogLevel;
  Maintenance?: MaintenanceUpdateSettings;
  Name?: string;
  RoleArn?: string;
  ChannelEngineVersion?: ChannelEngineVersionRequest;
  DryRun?: boolean;
  AnywhereSettings?: AnywhereSettings;
  LinkedChannelSettings?: LinkedChannelSettings;
  ChannelSecurityGroups?: string[];
  InferenceSettings?: InferenceSettings;
  SpecialRouterSettings?: SpecialRouterSettings;
}
export const UpdateChannelRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CdiInputSpecification: S.optional(CdiInputSpecification),
    ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
    Destinations: S.optional(__listOfOutputDestination),
    EncoderSettings: S.optional(EncoderSettings),
    InputAttachments: S.optional(__listOfInputAttachment),
    InputSpecification: S.optional(InputSpecification),
    LogLevel: S.optional(LogLevel),
    Maintenance: S.optional(MaintenanceUpdateSettings),
    Name: S.optional(S.String),
    RoleArn: S.optional(S.String),
    ChannelEngineVersion: S.optional(ChannelEngineVersionRequest),
    DryRun: S.optional(S.Boolean),
    AnywhereSettings: S.optional(AnywhereSettings),
    LinkedChannelSettings: S.optional(LinkedChannelSettings),
    ChannelSecurityGroups: S.optional(__listOf__string),
    InferenceSettings: S.optional(InferenceSettings),
    SpecialRouterSettings: S.optional(SpecialRouterSettings),
  })
    .pipe(
      S.encodeKeys({
        CdiInputSpecification: "cdiInputSpecification",
        Destinations: "destinations",
        EncoderSettings: "encoderSettings",
        InputAttachments: "inputAttachments",
        InputSpecification: "inputSpecification",
        LogLevel: "logLevel",
        Maintenance: "maintenance",
        Name: "name",
        RoleArn: "roleArn",
        ChannelEngineVersion: "channelEngineVersion",
        DryRun: "dryRun",
        AnywhereSettings: "anywhereSettings",
        LinkedChannelSettings: "linkedChannelSettings",
        ChannelSecurityGroups: "channelSecurityGroups",
        InferenceSettings: "inferenceSettings",
        SpecialRouterSettings: "specialRouterSettings",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/prod/channels/{ChannelId}" }),
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
  Channel?: Channel & {
    EncoderSettings: EncoderSettings & {
      AudioDescriptions: (AudioDescription & {
        AudioSelectorName: string;
        Name: __stringMax255;
        AudioWatermarkingSettings: AudioWatermarkSettings & {
          NielsenWatermarksSettings: NielsenWatermarksSettings & {
            NielsenCbetSettings: NielsenCBET & {
              CbetCheckDigitString: __stringMin2Max2;
              CbetStepaside: NielsenWatermarksCbetStepaside;
              Csid: __stringMin1Max7;
            };
            NielsenNaesIiNwSettings: NielsenNaesIiNw & {
              CheckDigitString: __stringMin2Max2;
              Sid: __doubleMin1Max65535;
            };
          };
        };
        RemixSettings: RemixSettings & {
          ChannelMappings: (AudioChannelMapping & {
            InputChannelLevels: (InputChannelLevel & {
              Gain: __integerMinNegative60Max6;
              InputChannel: __integerMin0Max15;
            })[];
            OutputChannel: __integerMin0Max7;
          })[];
        };
      })[];
      OutputGroups: (OutputGroup & {
        OutputGroupSettings: OutputGroupSettings & {
          ArchiveGroupSettings: ArchiveGroupSettings & {
            Destination: OutputLocationRef;
          };
          FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
            Destination: OutputLocationRef;
          };
          HlsGroupSettings: HlsGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            KeyProviderSettings: KeyProviderSettings & {
              StaticKeySettings: StaticKeySettings & {
                StaticKeyValue: __stringMin32Max32;
                KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
              };
            };
          };
          MediaPackageGroupSettings: MediaPackageGroupSettings & {
            Destination: OutputLocationRef;
            MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
              CaptionLanguageMappings: (CaptionLanguageMapping & {
                CaptionChannel: __integerMin1Max4;
                LanguageCode: __stringMin3Max3;
                LanguageDescription: __stringMin1;
              })[];
              AdditionalDestinations: (MediaPackageAdditionalDestinations & {
                Destination: OutputLocationRef;
              })[];
            };
          };
          MsSmoothGroupSettings: MsSmoothGroupSettings & {
            Destination: OutputLocationRef;
          };
          CmafIngestGroupSettings: CmafIngestGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
            })[];
            AdditionalDestinations: (AdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
          };
        };
        Outputs: (Output & {
          OutputSettings: OutputSettings & {
            ArchiveOutputSettings: ArchiveOutputSettings & {
              ContainerSettings: ArchiveContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
            };
            HlsOutputSettings: HlsOutputSettings & {
              HlsSettings: HlsSettings & {
                AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                  AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
                };
                StandardHlsSettings: StandardHlsSettings & {
                  M3u8Settings: M3u8Settings;
                };
              };
            };
            MultiplexOutputSettings: MultiplexOutputSettings & {
              Destination: OutputLocationRef;
            };
            RtmpOutputSettings: RtmpOutputSettings & {
              Destination: OutputLocationRef;
            };
            UdpOutputSettings: UdpOutputSettings & {
              ContainerSettings: UdpContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
            SrtOutputSettings: SrtOutputSettings & {
              ContainerSettings: UdpContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
            MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
              ContainerSettings: MediaConnectRouterContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
          };
        })[];
      })[];
      TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
      VideoDescriptions: (VideoDescription & {
        Name: string;
        CodecSettings: VideoCodecSettings & {
          FrameCaptureSettings: FrameCaptureSettings & {
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          H264Settings: H264Settings & {
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          H265Settings: H265Settings & {
            FramerateDenominator: __integerMin1Max3003;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          Mpeg2Settings: Mpeg2Settings & {
            FramerateDenominator: __integerMin1;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          Av1Settings: Av1Settings & {
            FramerateDenominator: __integerMin1Max3003;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
        };
      })[];
      AvailBlanking: AvailBlanking & {
        AvailBlankingImage: InputLocation & { Uri: __stringMax2048 };
      };
      AvailConfiguration: AvailConfiguration & {
        AvailSettings: AvailSettings & {
          Esam: Esam & {
            AcquisitionPointId: __stringMax256;
            PoisEndpoint: __stringMax2048;
          };
        };
      };
      BlackoutSlate: BlackoutSlate & {
        BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
        NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
      };
      CaptionDescriptions: (CaptionDescription & {
        CaptionSelectorName: string;
        Name: string;
        DestinationSettings: CaptionDestinationSettings & {
          BurnInDestinationSettings: BurnInDestinationSettings & {
            Font: InputLocation & { Uri: __stringMax2048 };
          };
          DvbSubDestinationSettings: DvbSubDestinationSettings & {
            Font: InputLocation & { Uri: __stringMax2048 };
          };
        };
      })[];
      GlobalConfiguration: GlobalConfiguration & {
        InputLossBehavior: InputLossBehavior & {
          InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
        };
      };
      MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
        MotionGraphicsSettings: MotionGraphicsSettings;
      };
      ThumbnailConfiguration: ThumbnailConfiguration & {
        State: ThumbnailState;
      };
      ColorCorrectionSettings: ColorCorrectionSettings & {
        GlobalColorCorrections: (ColorCorrection & {
          InputColorSpace: ColorSpace;
          OutputColorSpace: ColorSpace;
          Uri: string;
        })[];
      };
    };
    InputAttachments: (InputAttachment & {
      AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
        SecondaryInputId: string;
        FailoverConditions: (FailoverCondition & {
          FailoverConditionSettings: FailoverConditionSettings & {
            AudioSilenceSettings: AudioSilenceFailoverSettings & {
              AudioSelectorName: string;
            };
          };
        })[];
      };
      InputSettings: InputSettings & {
        AudioSelectors: (AudioSelector & {
          Name: __stringMin1;
          SelectorSettings: AudioSelectorSettings & {
            AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
              GroupId: __stringMin1;
              Name: __stringMin1;
            };
            AudioLanguageSelection: AudioLanguageSelection & {
              LanguageCode: string;
            };
            AudioPidSelection: AudioPidSelection & {
              Pid: __integerMin0Max8191;
              Pids: (AudioPid & {
                Pid: __integerMin0Max8191;
                DolbyEDecode: AudioDolbyEDecode & {
                  ProgramSelection: DolbyEProgramSelection;
                };
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
            };
            AudioTrackSelection: AudioTrackSelection & {
              Tracks: (AudioTrack & {
                Track: __integerMin1;
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
            };
          };
        })[];
        CaptionSelectors: (CaptionSelector & {
          Name: __stringMin1;
          SelectorSettings: CaptionSelectorSettings & {
            TeletextSourceSettings: TeletextSourceSettings & {
              OutputRectangle: CaptionRectangle & {
                Height: __doubleMin0Max100;
                LeftOffset: __doubleMin0Max100;
                TopOffset: __doubleMin0Max100;
                Width: __doubleMin0Max100;
              };
            };
          };
        })[];
      };
    })[];
  };
}
export const UpdateChannelResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Channel: S.optional(Channel) }).pipe(
    S.encodeKeys({ Channel: "channel" }),
  ),
).annotate({
  identifier: "UpdateChannelResponse",
}) as any as S.Schema<UpdateChannelResponse>;
export interface UpdateChannelClassRequest {
  ChannelClass?: ChannelClass;
  ChannelId: string;
  Destinations?: OutputDestination[];
}
export const UpdateChannelClassRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelClass: S.optional(ChannelClass),
    ChannelId: S.String.pipe(T.HttpLabel("ChannelId")),
    Destinations: S.optional(__listOfOutputDestination),
  })
    .pipe(
      S.encodeKeys({
        ChannelClass: "channelClass",
        Destinations: "destinations",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/prod/channels/{ChannelId}/channelClass",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateChannelClassRequest",
}) as any as S.Schema<UpdateChannelClassRequest>;
export interface UpdateChannelClassResponse {
  Channel?: Channel & {
    EncoderSettings: EncoderSettings & {
      AudioDescriptions: (AudioDescription & {
        AudioSelectorName: string;
        Name: __stringMax255;
        AudioWatermarkingSettings: AudioWatermarkSettings & {
          NielsenWatermarksSettings: NielsenWatermarksSettings & {
            NielsenCbetSettings: NielsenCBET & {
              CbetCheckDigitString: __stringMin2Max2;
              CbetStepaside: NielsenWatermarksCbetStepaside;
              Csid: __stringMin1Max7;
            };
            NielsenNaesIiNwSettings: NielsenNaesIiNw & {
              CheckDigitString: __stringMin2Max2;
              Sid: __doubleMin1Max65535;
            };
          };
        };
        RemixSettings: RemixSettings & {
          ChannelMappings: (AudioChannelMapping & {
            InputChannelLevels: (InputChannelLevel & {
              Gain: __integerMinNegative60Max6;
              InputChannel: __integerMin0Max15;
            })[];
            OutputChannel: __integerMin0Max7;
          })[];
        };
      })[];
      OutputGroups: (OutputGroup & {
        OutputGroupSettings: OutputGroupSettings & {
          ArchiveGroupSettings: ArchiveGroupSettings & {
            Destination: OutputLocationRef;
          };
          FrameCaptureGroupSettings: FrameCaptureGroupSettings & {
            Destination: OutputLocationRef;
          };
          HlsGroupSettings: HlsGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
              LanguageDescription: __stringMin1;
            })[];
            KeyProviderSettings: KeyProviderSettings & {
              StaticKeySettings: StaticKeySettings & {
                StaticKeyValue: __stringMin32Max32;
                KeyProviderServer: InputLocation & { Uri: __stringMax2048 };
              };
            };
          };
          MediaPackageGroupSettings: MediaPackageGroupSettings & {
            Destination: OutputLocationRef;
            MediapackageV2GroupSettings: MediaPackageV2GroupSettings & {
              CaptionLanguageMappings: (CaptionLanguageMapping & {
                CaptionChannel: __integerMin1Max4;
                LanguageCode: __stringMin3Max3;
                LanguageDescription: __stringMin1;
              })[];
              AdditionalDestinations: (MediaPackageAdditionalDestinations & {
                Destination: OutputLocationRef;
              })[];
            };
          };
          MsSmoothGroupSettings: MsSmoothGroupSettings & {
            Destination: OutputLocationRef;
          };
          CmafIngestGroupSettings: CmafIngestGroupSettings & {
            Destination: OutputLocationRef;
            CaptionLanguageMappings: (CmafIngestCaptionLanguageMapping & {
              CaptionChannel: __integerMin1Max4;
              LanguageCode: __stringMin3Max3;
            })[];
            AdditionalDestinations: (AdditionalDestinations & {
              Destination: OutputLocationRef;
            })[];
          };
        };
        Outputs: (Output & {
          OutputSettings: OutputSettings & {
            ArchiveOutputSettings: ArchiveOutputSettings & {
              ContainerSettings: ArchiveContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
            };
            HlsOutputSettings: HlsOutputSettings & {
              HlsSettings: HlsSettings & {
                AudioOnlyHlsSettings: AudioOnlyHlsSettings & {
                  AudioOnlyImage: InputLocation & { Uri: __stringMax2048 };
                };
                StandardHlsSettings: StandardHlsSettings & {
                  M3u8Settings: M3u8Settings;
                };
              };
            };
            MultiplexOutputSettings: MultiplexOutputSettings & {
              Destination: OutputLocationRef;
            };
            RtmpOutputSettings: RtmpOutputSettings & {
              Destination: OutputLocationRef;
            };
            UdpOutputSettings: UdpOutputSettings & {
              ContainerSettings: UdpContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
            SrtOutputSettings: SrtOutputSettings & {
              ContainerSettings: UdpContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
            MediaConnectRouterOutputSettings: MediaConnectRouterOutputSettings & {
              ContainerSettings: MediaConnectRouterContainerSettings & {
                M2tsSettings: M2tsSettings & {
                  DvbNitSettings: DvbNitSettings & {
                    NetworkId: __integerMin0Max65536;
                    NetworkName: __stringMin1Max256;
                  };
                };
              };
              Destination: OutputLocationRef;
            };
          };
        })[];
      })[];
      TimecodeConfig: TimecodeConfig & { Source: TimecodeConfigSource };
      VideoDescriptions: (VideoDescription & {
        Name: string;
        CodecSettings: VideoCodecSettings & {
          FrameCaptureSettings: FrameCaptureSettings & {
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          H264Settings: H264Settings & {
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          H265Settings: H265Settings & {
            FramerateDenominator: __integerMin1Max3003;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          Mpeg2Settings: Mpeg2Settings & {
            FramerateDenominator: __integerMin1;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
          Av1Settings: Av1Settings & {
            FramerateDenominator: __integerMin1Max3003;
            FramerateNumerator: __integerMin1;
            TimecodeBurninSettings: TimecodeBurninSettings & {
              FontSize: TimecodeBurninFontSize;
              Position: TimecodeBurninPosition;
            };
          };
        };
      })[];
      AvailBlanking: AvailBlanking & {
        AvailBlankingImage: InputLocation & { Uri: __stringMax2048 };
      };
      AvailConfiguration: AvailConfiguration & {
        AvailSettings: AvailSettings & {
          Esam: Esam & {
            AcquisitionPointId: __stringMax256;
            PoisEndpoint: __stringMax2048;
          };
        };
      };
      BlackoutSlate: BlackoutSlate & {
        BlackoutSlateImage: InputLocation & { Uri: __stringMax2048 };
        NetworkEndBlackoutImage: InputLocation & { Uri: __stringMax2048 };
      };
      CaptionDescriptions: (CaptionDescription & {
        CaptionSelectorName: string;
        Name: string;
        DestinationSettings: CaptionDestinationSettings & {
          BurnInDestinationSettings: BurnInDestinationSettings & {
            Font: InputLocation & { Uri: __stringMax2048 };
          };
          DvbSubDestinationSettings: DvbSubDestinationSettings & {
            Font: InputLocation & { Uri: __stringMax2048 };
          };
        };
      })[];
      GlobalConfiguration: GlobalConfiguration & {
        InputLossBehavior: InputLossBehavior & {
          InputLossImageSlate: InputLocation & { Uri: __stringMax2048 };
        };
      };
      MotionGraphicsConfiguration: MotionGraphicsConfiguration & {
        MotionGraphicsSettings: MotionGraphicsSettings;
      };
      ThumbnailConfiguration: ThumbnailConfiguration & {
        State: ThumbnailState;
      };
      ColorCorrectionSettings: ColorCorrectionSettings & {
        GlobalColorCorrections: (ColorCorrection & {
          InputColorSpace: ColorSpace;
          OutputColorSpace: ColorSpace;
          Uri: string;
        })[];
      };
    };
    InputAttachments: (InputAttachment & {
      AutomaticInputFailoverSettings: AutomaticInputFailoverSettings & {
        SecondaryInputId: string;
        FailoverConditions: (FailoverCondition & {
          FailoverConditionSettings: FailoverConditionSettings & {
            AudioSilenceSettings: AudioSilenceFailoverSettings & {
              AudioSelectorName: string;
            };
          };
        })[];
      };
      InputSettings: InputSettings & {
        AudioSelectors: (AudioSelector & {
          Name: __stringMin1;
          SelectorSettings: AudioSelectorSettings & {
            AudioHlsRenditionSelection: AudioHlsRenditionSelection & {
              GroupId: __stringMin1;
              Name: __stringMin1;
            };
            AudioLanguageSelection: AudioLanguageSelection & {
              LanguageCode: string;
            };
            AudioPidSelection: AudioPidSelection & {
              Pid: __integerMin0Max8191;
              Pids: (AudioPid & {
                Pid: __integerMin0Max8191;
                DolbyEDecode: AudioDolbyEDecode & {
                  ProgramSelection: DolbyEProgramSelection;
                };
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
            };
            AudioTrackSelection: AudioTrackSelection & {
              Tracks: (AudioTrack & {
                Track: __integerMin1;
                PremixSettings: AudioPreMixerSettings & {
                  RemixSettings: RemixSettings & {
                    ChannelMappings: (AudioChannelMapping & {
                      InputChannelLevels: (InputChannelLevel & {
                        Gain: __integerMinNegative60Max6;
                        InputChannel: __integerMin0Max15;
                      })[];
                      OutputChannel: __integerMin0Max7;
                    })[];
                  };
                };
              })[];
              DolbyEDecode: AudioDolbyEDecode & {
                ProgramSelection: DolbyEProgramSelection;
              };
            };
          };
        })[];
        CaptionSelectors: (CaptionSelector & {
          Name: __stringMin1;
          SelectorSettings: CaptionSelectorSettings & {
            TeletextSourceSettings: TeletextSourceSettings & {
              OutputRectangle: CaptionRectangle & {
                Height: __doubleMin0Max100;
                LeftOffset: __doubleMin0Max100;
                TopOffset: __doubleMin0Max100;
                Width: __doubleMin0Max100;
              };
            };
          };
        })[];
      };
    })[];
  };
}
export const UpdateChannelClassResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Channel: S.optional(Channel) }).pipe(
    S.encodeKeys({ Channel: "channel" }),
  ),
).annotate({
  identifier: "UpdateChannelClassResponse",
}) as any as S.Schema<UpdateChannelClassResponse>;
export interface UpdateChannelPlacementGroupRequest {
  ChannelPlacementGroupId: string;
  ClusterId: string;
  Name?: string;
  Nodes?: string[];
}
export const UpdateChannelPlacementGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelPlacementGroupId: S.String.pipe(
      T.HttpLabel("ChannelPlacementGroupId"),
    ),
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    Name: S.optional(S.String),
    Nodes: S.optional(__listOf__string),
  })
    .pipe(S.encodeKeys({ Name: "name", Nodes: "nodes" }))
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/prod/clusters/{ClusterId}/channelplacementgroups/{ChannelPlacementGroupId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateChannelPlacementGroupRequest",
}) as any as S.Schema<UpdateChannelPlacementGroupRequest>;
export interface UpdateChannelPlacementGroupResponse {
  Arn?: string;
  Channels?: string[];
  ClusterId?: string;
  Id?: string;
  Name?: string;
  Nodes?: string[];
  State?: ChannelPlacementGroupState;
}
export const UpdateChannelPlacementGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Channels: S.optional(__listOf__string),
    ClusterId: S.optional(S.String),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Nodes: S.optional(__listOf__string),
    State: S.optional(ChannelPlacementGroupState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Channels: "channels",
      ClusterId: "clusterId",
      Id: "id",
      Name: "name",
      Nodes: "nodes",
      State: "state",
    }),
  ),
).annotate({
  identifier: "UpdateChannelPlacementGroupResponse",
}) as any as S.Schema<UpdateChannelPlacementGroupResponse>;
export interface UpdateCloudWatchAlarmTemplateRequest {
  ComparisonOperator?: CloudWatchAlarmTemplateComparisonOperator;
  DatapointsToAlarm?: number;
  Description?: string;
  EvaluationPeriods?: number;
  GroupIdentifier?: string;
  Identifier: string;
  MetricName?: string;
  Name?: string;
  Period?: number;
  Statistic?: CloudWatchAlarmTemplateStatistic;
  TargetResourceType?: CloudWatchAlarmTemplateTargetResourceType;
  Threshold?: number;
  TreatMissingData?: CloudWatchAlarmTemplateTreatMissingData;
}
export const UpdateCloudWatchAlarmTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      ComparisonOperator: S.optional(CloudWatchAlarmTemplateComparisonOperator),
      DatapointsToAlarm: S.optional(S.Number),
      Description: S.optional(S.String),
      EvaluationPeriods: S.optional(S.Number),
      GroupIdentifier: S.optional(S.String),
      Identifier: S.String.pipe(T.HttpLabel("Identifier")),
      MetricName: S.optional(S.String),
      Name: S.optional(S.String),
      Period: S.optional(S.Number),
      Statistic: S.optional(CloudWatchAlarmTemplateStatistic),
      TargetResourceType: S.optional(CloudWatchAlarmTemplateTargetResourceType),
      Threshold: S.optional(S.Number),
      TreatMissingData: S.optional(CloudWatchAlarmTemplateTreatMissingData),
    })
      .pipe(
        S.encodeKeys({
          ComparisonOperator: "comparisonOperator",
          DatapointsToAlarm: "datapointsToAlarm",
          Description: "description",
          EvaluationPeriods: "evaluationPeriods",
          GroupIdentifier: "groupIdentifier",
          MetricName: "metricName",
          Name: "name",
          Period: "period",
          Statistic: "statistic",
          TargetResourceType: "targetResourceType",
          Threshold: "threshold",
          TreatMissingData: "treatMissingData",
        }),
      )
      .pipe(
        T.all(
          T.Http({
            method: "PATCH",
            uri: "/prod/cloudwatch-alarm-templates/{Identifier}",
          }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "UpdateCloudWatchAlarmTemplateRequest",
}) as any as S.Schema<UpdateCloudWatchAlarmTemplateRequest>;
export interface UpdateCloudWatchAlarmTemplateResponse {
  Arn?: string;
  ComparisonOperator?: CloudWatchAlarmTemplateComparisonOperator;
  CreatedAt?: Date;
  DatapointsToAlarm?: number;
  Description?: string;
  EvaluationPeriods?: number;
  GroupId?: string;
  Id?: string;
  MetricName?: string;
  ModifiedAt?: Date;
  Name?: string;
  Period?: number;
  Statistic?: CloudWatchAlarmTemplateStatistic;
  Tags?: { [key: string]: string | undefined };
  TargetResourceType?: CloudWatchAlarmTemplateTargetResourceType;
  Threshold?: number;
  TreatMissingData?: CloudWatchAlarmTemplateTreatMissingData;
}
export const UpdateCloudWatchAlarmTemplateResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      ComparisonOperator: S.optional(CloudWatchAlarmTemplateComparisonOperator),
      CreatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      DatapointsToAlarm: S.optional(S.Number),
      Description: S.optional(S.String),
      EvaluationPeriods: S.optional(S.Number),
      GroupId: S.optional(S.String),
      Id: S.optional(S.String),
      MetricName: S.optional(S.String),
      ModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Name: S.optional(S.String),
      Period: S.optional(S.Number),
      Statistic: S.optional(CloudWatchAlarmTemplateStatistic),
      Tags: S.optional(TagMap),
      TargetResourceType: S.optional(CloudWatchAlarmTemplateTargetResourceType),
      Threshold: S.optional(S.Number),
      TreatMissingData: S.optional(CloudWatchAlarmTemplateTreatMissingData),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        ComparisonOperator: "comparisonOperator",
        CreatedAt: "createdAt",
        DatapointsToAlarm: "datapointsToAlarm",
        Description: "description",
        EvaluationPeriods: "evaluationPeriods",
        GroupId: "groupId",
        Id: "id",
        MetricName: "metricName",
        ModifiedAt: "modifiedAt",
        Name: "name",
        Period: "period",
        Statistic: "statistic",
        Tags: "tags",
        TargetResourceType: "targetResourceType",
        Threshold: "threshold",
        TreatMissingData: "treatMissingData",
      }),
    ),
).annotate({
  identifier: "UpdateCloudWatchAlarmTemplateResponse",
}) as any as S.Schema<UpdateCloudWatchAlarmTemplateResponse>;
export interface UpdateCloudWatchAlarmTemplateGroupRequest {
  Description?: string;
  Identifier: string;
}
export const UpdateCloudWatchAlarmTemplateGroupRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Description: S.optional(S.String),
      Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    })
      .pipe(S.encodeKeys({ Description: "description" }))
      .pipe(
        T.all(
          T.Http({
            method: "PATCH",
            uri: "/prod/cloudwatch-alarm-template-groups/{Identifier}",
          }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
  ).annotate({
    identifier: "UpdateCloudWatchAlarmTemplateGroupRequest",
  }) as any as S.Schema<UpdateCloudWatchAlarmTemplateGroupRequest>;
export interface UpdateCloudWatchAlarmTemplateGroupResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const UpdateCloudWatchAlarmTemplateGroupResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Arn: S.optional(S.String),
      CreatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Description: S.optional(S.String),
      Id: S.optional(S.String),
      ModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Name: S.optional(S.String),
      Tags: S.optional(TagMap),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        CreatedAt: "createdAt",
        Description: "description",
        Id: "id",
        ModifiedAt: "modifiedAt",
        Name: "name",
        Tags: "tags",
      }),
    ),
  ).annotate({
    identifier: "UpdateCloudWatchAlarmTemplateGroupResponse",
  }) as any as S.Schema<UpdateCloudWatchAlarmTemplateGroupResponse>;
export interface InterfaceMappingUpdateRequest {
  LogicalInterfaceName?: string;
  NetworkId?: string;
}
export const InterfaceMappingUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    LogicalInterfaceName: S.optional(S.String),
    NetworkId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      LogicalInterfaceName: "logicalInterfaceName",
      NetworkId: "networkId",
    }),
  ),
).annotate({
  identifier: "InterfaceMappingUpdateRequest",
}) as any as S.Schema<InterfaceMappingUpdateRequest>;
export type __listOfInterfaceMappingUpdateRequest =
  InterfaceMappingUpdateRequest[];
export const __listOfInterfaceMappingUpdateRequest = /*@__PURE__*/ S.Array(
  InterfaceMappingUpdateRequest,
);
export interface ClusterNetworkSettingsUpdateRequest {
  DefaultRoute?: string;
  InterfaceMappings?: InterfaceMappingUpdateRequest[];
}
export const ClusterNetworkSettingsUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DefaultRoute: S.optional(S.String),
    InterfaceMappings: S.optional(__listOfInterfaceMappingUpdateRequest),
  }).pipe(
    S.encodeKeys({
      DefaultRoute: "defaultRoute",
      InterfaceMappings: "interfaceMappings",
    }),
  ),
).annotate({
  identifier: "ClusterNetworkSettingsUpdateRequest",
}) as any as S.Schema<ClusterNetworkSettingsUpdateRequest>;
export interface UpdateClusterRequest {
  ClusterId: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettingsUpdateRequest;
}
export const UpdateClusterRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    Name: S.optional(S.String),
    NetworkSettings: S.optional(ClusterNetworkSettingsUpdateRequest),
  })
    .pipe(S.encodeKeys({ Name: "name", NetworkSettings: "networkSettings" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/prod/clusters/{ClusterId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateClusterRequest",
}) as any as S.Schema<UpdateClusterRequest>;
export interface UpdateClusterResponse {
  Arn?: string;
  ChannelIds?: string[];
  ClusterType?: ClusterType;
  Id?: string;
  Name?: string;
  NetworkSettings?: ClusterNetworkSettings;
  State?: ClusterState;
}
export const UpdateClusterResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelIds: S.optional(__listOf__string),
    ClusterType: S.optional(ClusterType),
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkSettings: S.optional(ClusterNetworkSettings),
    State: S.optional(ClusterState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ChannelIds: "channelIds",
      ClusterType: "clusterType",
      Id: "id",
      Name: "name",
      NetworkSettings: "networkSettings",
      State: "state",
    }),
  ),
).annotate({
  identifier: "UpdateClusterResponse",
}) as any as S.Schema<UpdateClusterResponse>;
export interface UpdateEventBridgeRuleTemplateRequest {
  Description?: string;
  EventTargets?: EventBridgeRuleTemplateTarget[];
  EventType?: EventBridgeRuleTemplateEventType;
  GroupIdentifier?: string;
  Identifier: string;
  Name?: string;
}
export const UpdateEventBridgeRuleTemplateRequest = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Description: S.optional(S.String),
      EventTargets: S.optional(__listOfEventBridgeRuleTemplateTarget),
      EventType: S.optional(EventBridgeRuleTemplateEventType),
      GroupIdentifier: S.optional(S.String),
      Identifier: S.String.pipe(T.HttpLabel("Identifier")),
      Name: S.optional(S.String),
    })
      .pipe(
        S.encodeKeys({
          Description: "description",
          EventTargets: "eventTargets",
          EventType: "eventType",
          GroupIdentifier: "groupIdentifier",
          Name: "name",
        }),
      )
      .pipe(
        T.all(
          T.Http({
            method: "PATCH",
            uri: "/prod/eventbridge-rule-templates/{Identifier}",
          }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
).annotate({
  identifier: "UpdateEventBridgeRuleTemplateRequest",
}) as any as S.Schema<UpdateEventBridgeRuleTemplateRequest>;
export interface UpdateEventBridgeRuleTemplateResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  EventTargets?: (EventBridgeRuleTemplateTarget & {
    Arn: __stringMin1Max2048PatternArn;
  })[];
  EventType?: EventBridgeRuleTemplateEventType;
  GroupId?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const UpdateEventBridgeRuleTemplateResponse = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({
      Arn: S.optional(S.String),
      CreatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Description: S.optional(S.String),
      EventTargets: S.optional(__listOfEventBridgeRuleTemplateTarget),
      EventType: S.optional(EventBridgeRuleTemplateEventType),
      GroupId: S.optional(S.String),
      Id: S.optional(S.String),
      ModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Name: S.optional(S.String),
      Tags: S.optional(TagMap),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        CreatedAt: "createdAt",
        Description: "description",
        EventTargets: "eventTargets",
        EventType: "eventType",
        GroupId: "groupId",
        Id: "id",
        ModifiedAt: "modifiedAt",
        Name: "name",
        Tags: "tags",
      }),
    ),
).annotate({
  identifier: "UpdateEventBridgeRuleTemplateResponse",
}) as any as S.Schema<UpdateEventBridgeRuleTemplateResponse>;
export interface UpdateEventBridgeRuleTemplateGroupRequest {
  Description?: string;
  Identifier: string;
}
export const UpdateEventBridgeRuleTemplateGroupRequest =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Description: S.optional(S.String),
      Identifier: S.String.pipe(T.HttpLabel("Identifier")),
    })
      .pipe(S.encodeKeys({ Description: "description" }))
      .pipe(
        T.all(
          T.Http({
            method: "PATCH",
            uri: "/prod/eventbridge-rule-template-groups/{Identifier}",
          }),
          svc,
          auth,
          proto,
          ver,
          rules,
        ),
      ),
  ).annotate({
    identifier: "UpdateEventBridgeRuleTemplateGroupRequest",
  }) as any as S.Schema<UpdateEventBridgeRuleTemplateGroupRequest>;
export interface UpdateEventBridgeRuleTemplateGroupResponse {
  Arn?: string;
  CreatedAt?: Date;
  Description?: string;
  Id?: string;
  ModifiedAt?: Date;
  Name?: string;
  Tags?: { [key: string]: string | undefined };
}
export const UpdateEventBridgeRuleTemplateGroupResponse =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Arn: S.optional(S.String),
      CreatedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Description: S.optional(S.String),
      Id: S.optional(S.String),
      ModifiedAt: S.optional(
        T.DateFromString.pipe(T.TimestampFormat("date-time")),
      ),
      Name: S.optional(S.String),
      Tags: S.optional(TagMap),
    }).pipe(
      S.encodeKeys({
        Arn: "arn",
        CreatedAt: "createdAt",
        Description: "description",
        Id: "id",
        ModifiedAt: "modifiedAt",
        Name: "name",
        Tags: "tags",
      }),
    ),
  ).annotate({
    identifier: "UpdateEventBridgeRuleTemplateGroupResponse",
  }) as any as S.Schema<UpdateEventBridgeRuleTemplateGroupResponse>;
export interface InputDeviceRequest {
  Id?: string;
}
export const InputDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }).pipe(S.encodeKeys({ Id: "id" })),
).annotate({
  identifier: "InputDeviceRequest",
}) as any as S.Schema<InputDeviceRequest>;
export type __listOfInputDeviceRequest = InputDeviceRequest[];
export const __listOfInputDeviceRequest =
  /*@__PURE__*/ S.Array(InputDeviceRequest);
export interface MulticastSourceUpdateRequest {
  SourceIp?: string;
  Url?: string;
}
export const MulticastSourceUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SourceIp: S.optional(S.String), Url: S.optional(S.String) }).pipe(
    S.encodeKeys({ SourceIp: "sourceIp", Url: "url" }),
  ),
).annotate({
  identifier: "MulticastSourceUpdateRequest",
}) as any as S.Schema<MulticastSourceUpdateRequest>;
export type __listOfMulticastSourceUpdateRequest =
  MulticastSourceUpdateRequest[];
export const __listOfMulticastSourceUpdateRequest = /*@__PURE__*/ S.Array(
  MulticastSourceUpdateRequest,
);
export interface MulticastSettingsUpdateRequest {
  Sources?: MulticastSourceUpdateRequest[];
}
export const MulticastSettingsUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Sources: S.optional(__listOfMulticastSourceUpdateRequest) }).pipe(
    S.encodeKeys({ Sources: "sources" }),
  ),
).annotate({
  identifier: "MulticastSettingsUpdateRequest",
}) as any as S.Schema<MulticastSettingsUpdateRequest>;
export interface UpdateInputRequest {
  Destinations?: InputDestinationRequest[];
  InputDevices?: InputDeviceRequest[];
  InputId: string;
  InputSecurityGroups?: string[];
  MediaConnectFlows?: MediaConnectFlowRequest[];
  Name?: string;
  RoleArn?: string;
  Sources?: InputSourceRequest[];
  SrtSettings?: SrtSettingsRequest;
  MulticastSettings?: MulticastSettingsUpdateRequest;
  Smpte2110ReceiverGroupSettings?: Smpte2110ReceiverGroupSettings;
  SdiSources?: string[];
  SpecialRouterSettings?: SpecialRouterSettings;
}
export const UpdateInputRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destinations: S.optional(__listOfInputDestinationRequest),
    InputDevices: S.optional(__listOfInputDeviceRequest),
    InputId: S.String.pipe(T.HttpLabel("InputId")),
    InputSecurityGroups: S.optional(__listOf__string),
    MediaConnectFlows: S.optional(__listOfMediaConnectFlowRequest),
    Name: S.optional(S.String),
    RoleArn: S.optional(S.String),
    Sources: S.optional(__listOfInputSourceRequest),
    SrtSettings: S.optional(SrtSettingsRequest),
    MulticastSettings: S.optional(MulticastSettingsUpdateRequest),
    Smpte2110ReceiverGroupSettings: S.optional(Smpte2110ReceiverGroupSettings),
    SdiSources: S.optional(InputSdiSources),
    SpecialRouterSettings: S.optional(SpecialRouterSettings),
  })
    .pipe(
      S.encodeKeys({
        Destinations: "destinations",
        InputDevices: "inputDevices",
        InputSecurityGroups: "inputSecurityGroups",
        MediaConnectFlows: "mediaConnectFlows",
        Name: "name",
        RoleArn: "roleArn",
        Sources: "sources",
        SrtSettings: "srtSettings",
        MulticastSettings: "multicastSettings",
        Smpte2110ReceiverGroupSettings: "smpte2110ReceiverGroupSettings",
        SdiSources: "sdiSources",
        SpecialRouterSettings: "specialRouterSettings",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/prod/inputs/{InputId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateInputRequest",
}) as any as S.Schema<UpdateInputRequest>;
export interface UpdateInputResponse {
  Input?: Input & {
    SrtSettings: SrtSettings & {
      SrtListenerSettings: SrtListenerSettings & {
        Decryption: SrtListenerDecryption & {
          Algorithm: Algorithm;
          PassphraseSecretArn: string;
        };
      };
    };
    MulticastSettings: MulticastSettings & {
      Sources: (MulticastSource & { Url: string })[];
    };
  };
}
export const UpdateInputResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Input: S.optional(Input) }).pipe(S.encodeKeys({ Input: "input" })),
).annotate({
  identifier: "UpdateInputResponse",
}) as any as S.Schema<UpdateInputResponse>;
export interface InputDeviceMediaConnectConfigurableSettings {
  FlowArn?: string;
  RoleArn?: string;
  SecretArn?: string;
  SourceName?: string;
}
export const InputDeviceMediaConnectConfigurableSettings =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      FlowArn: S.optional(S.String),
      RoleArn: S.optional(S.String),
      SecretArn: S.optional(S.String),
      SourceName: S.optional(S.String),
    }).pipe(
      S.encodeKeys({
        FlowArn: "flowArn",
        RoleArn: "roleArn",
        SecretArn: "secretArn",
        SourceName: "sourceName",
      }),
    ),
  ).annotate({
    identifier: "InputDeviceMediaConnectConfigurableSettings",
  }) as any as S.Schema<InputDeviceMediaConnectConfigurableSettings>;
export type InputDeviceConfigurableAudioChannelPairProfile =
  | "DISABLED"
  | "VBR-AAC_HHE-16000"
  | "VBR-AAC_HE-64000"
  | "VBR-AAC_LC-128000"
  | "CBR-AAC_HQ-192000"
  | "CBR-AAC_HQ-256000"
  | "CBR-AAC_HQ-384000"
  | "CBR-AAC_HQ-512000"
  | (string & {});
export const InputDeviceConfigurableAudioChannelPairProfile =
  /*@__PURE__*/ S.String;

export interface InputDeviceConfigurableAudioChannelPairConfig {
  Id?: number;
  Profile?: InputDeviceConfigurableAudioChannelPairProfile;
}
export const InputDeviceConfigurableAudioChannelPairConfig =
  /*@__PURE__*/ S.suspend(() =>
    S.Struct({
      Id: S.optional(S.Number),
      Profile: S.optional(InputDeviceConfigurableAudioChannelPairProfile),
    }).pipe(S.encodeKeys({ Id: "id", Profile: "profile" })),
  ).annotate({
    identifier: "InputDeviceConfigurableAudioChannelPairConfig",
  }) as any as S.Schema<InputDeviceConfigurableAudioChannelPairConfig>;
export type __listOfInputDeviceConfigurableAudioChannelPairConfig =
  InputDeviceConfigurableAudioChannelPairConfig[];
export const __listOfInputDeviceConfigurableAudioChannelPairConfig =
  /*@__PURE__*/ S.Array(InputDeviceConfigurableAudioChannelPairConfig);
export interface InputDeviceConfigurableSettings {
  ConfiguredInput?: InputDeviceConfiguredInput;
  MaxBitrate?: number;
  LatencyMs?: number;
  Codec?: InputDeviceCodec;
  MediaconnectSettings?: InputDeviceMediaConnectConfigurableSettings;
  AudioChannelPairs?: InputDeviceConfigurableAudioChannelPairConfig[];
  InputResolution?: string;
}
export const InputDeviceConfigurableSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConfiguredInput: S.optional(InputDeviceConfiguredInput),
    MaxBitrate: S.optional(S.Number),
    LatencyMs: S.optional(S.Number),
    Codec: S.optional(InputDeviceCodec),
    MediaconnectSettings: S.optional(
      InputDeviceMediaConnectConfigurableSettings,
    ),
    AudioChannelPairs: S.optional(
      __listOfInputDeviceConfigurableAudioChannelPairConfig,
    ),
    InputResolution: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ConfiguredInput: "configuredInput",
      MaxBitrate: "maxBitrate",
      LatencyMs: "latencyMs",
      Codec: "codec",
      MediaconnectSettings: "mediaconnectSettings",
      AudioChannelPairs: "audioChannelPairs",
      InputResolution: "inputResolution",
    }),
  ),
).annotate({
  identifier: "InputDeviceConfigurableSettings",
}) as any as S.Schema<InputDeviceConfigurableSettings>;
export interface UpdateInputDeviceRequest {
  HdDeviceSettings?: InputDeviceConfigurableSettings;
  InputDeviceId: string;
  Name?: string;
  UhdDeviceSettings?: InputDeviceConfigurableSettings;
  AvailabilityZone?: string;
}
export const UpdateInputDeviceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HdDeviceSettings: S.optional(InputDeviceConfigurableSettings),
    InputDeviceId: S.String.pipe(T.HttpLabel("InputDeviceId")),
    Name: S.optional(S.String),
    UhdDeviceSettings: S.optional(InputDeviceConfigurableSettings),
    AvailabilityZone: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        HdDeviceSettings: "hdDeviceSettings",
        Name: "name",
        UhdDeviceSettings: "uhdDeviceSettings",
        AvailabilityZone: "availabilityZone",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/prod/inputDevices/{InputDeviceId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateInputDeviceRequest",
}) as any as S.Schema<UpdateInputDeviceRequest>;
export interface UpdateInputDeviceResponse {
  Arn?: string;
  ConnectionState?: InputDeviceConnectionState;
  DeviceSettingsSyncState?: DeviceSettingsSyncState;
  DeviceUpdateStatus?: DeviceUpdateStatus;
  HdDeviceSettings?: InputDeviceHdSettings;
  Id?: string;
  MacAddress?: string;
  Name?: string;
  NetworkSettings?: InputDeviceNetworkSettings;
  SerialNumber?: string;
  Type?: InputDeviceType;
  UhdDeviceSettings?: InputDeviceUhdSettings;
  Tags?: { [key: string]: string | undefined };
  AvailabilityZone?: string;
  MedialiveInputArns?: string[];
  OutputType?: InputDeviceOutputType;
}
export const UpdateInputDeviceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ConnectionState: S.optional(InputDeviceConnectionState),
    DeviceSettingsSyncState: S.optional(DeviceSettingsSyncState),
    DeviceUpdateStatus: S.optional(DeviceUpdateStatus),
    HdDeviceSettings: S.optional(InputDeviceHdSettings),
    Id: S.optional(S.String),
    MacAddress: S.optional(S.String),
    Name: S.optional(S.String),
    NetworkSettings: S.optional(InputDeviceNetworkSettings),
    SerialNumber: S.optional(S.String),
    Type: S.optional(InputDeviceType),
    UhdDeviceSettings: S.optional(InputDeviceUhdSettings),
    Tags: S.optional(Tags),
    AvailabilityZone: S.optional(S.String),
    MedialiveInputArns: S.optional(__listOf__string),
    OutputType: S.optional(InputDeviceOutputType),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ConnectionState: "connectionState",
      DeviceSettingsSyncState: "deviceSettingsSyncState",
      DeviceUpdateStatus: "deviceUpdateStatus",
      HdDeviceSettings: "hdDeviceSettings",
      Id: "id",
      MacAddress: "macAddress",
      Name: "name",
      NetworkSettings: "networkSettings",
      SerialNumber: "serialNumber",
      Type: "type",
      UhdDeviceSettings: "uhdDeviceSettings",
      Tags: "tags",
      AvailabilityZone: "availabilityZone",
      MedialiveInputArns: "medialiveInputArns",
      OutputType: "outputType",
    }),
  ),
).annotate({
  identifier: "UpdateInputDeviceResponse",
}) as any as S.Schema<UpdateInputDeviceResponse>;
export interface UpdateInputSecurityGroupRequest {
  InputSecurityGroupId: string;
  Tags?: { [key: string]: string | undefined };
  WhitelistRules?: InputWhitelistRuleCidr[];
}
export const UpdateInputSecurityGroupRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputSecurityGroupId: S.String.pipe(T.HttpLabel("InputSecurityGroupId")),
    Tags: S.optional(Tags),
    WhitelistRules: S.optional(__listOfInputWhitelistRuleCidr),
  })
    .pipe(S.encodeKeys({ Tags: "tags", WhitelistRules: "whitelistRules" }))
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/prod/inputSecurityGroups/{InputSecurityGroupId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateInputSecurityGroupRequest",
}) as any as S.Schema<UpdateInputSecurityGroupRequest>;
export interface UpdateInputSecurityGroupResponse {
  SecurityGroup?: InputSecurityGroup;
}
export const UpdateInputSecurityGroupResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SecurityGroup: S.optional(InputSecurityGroup) }).pipe(
    S.encodeKeys({ SecurityGroup: "securityGroup" }),
  ),
).annotate({
  identifier: "UpdateInputSecurityGroupResponse",
}) as any as S.Schema<UpdateInputSecurityGroupResponse>;
export type MultiplexPacketIdentifiersMapping = {
  [key: string]: MultiplexProgramPacketIdentifiersMap | undefined;
};
export const MultiplexPacketIdentifiersMapping = /*@__PURE__*/ S.Record(
  S.String,
  MultiplexProgramPacketIdentifiersMap.pipe(S.optional),
);
export interface UpdateMultiplexRequest {
  MultiplexId: string;
  MultiplexSettings?: MultiplexSettings;
  Name?: string;
  PacketIdentifiersMapping?: {
    [key: string]: MultiplexProgramPacketIdentifiersMap | undefined;
  };
}
export const UpdateMultiplexRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
    MultiplexSettings: S.optional(MultiplexSettings),
    Name: S.optional(S.String),
    PacketIdentifiersMapping: S.optional(MultiplexPacketIdentifiersMapping),
  })
    .pipe(
      S.encodeKeys({
        MultiplexSettings: "multiplexSettings",
        Name: "name",
        PacketIdentifiersMapping: "packetIdentifiersMapping",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/prod/multiplexes/{MultiplexId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateMultiplexRequest",
}) as any as S.Schema<UpdateMultiplexRequest>;
export interface UpdateMultiplexResponse {
  Multiplex?: Multiplex & {
    MultiplexSettings: MultiplexSettings & {
      TransportStreamBitrate: __integerMin1000000Max100000000;
      TransportStreamId: __integerMin0Max65535;
    };
  };
}
export const UpdateMultiplexResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Multiplex: S.optional(Multiplex) }).pipe(
    S.encodeKeys({ Multiplex: "multiplex" }),
  ),
).annotate({
  identifier: "UpdateMultiplexResponse",
}) as any as S.Schema<UpdateMultiplexResponse>;
export interface UpdateMultiplexProgramRequest {
  MultiplexId: string;
  MultiplexProgramSettings?: MultiplexProgramSettings;
  ProgramName: string;
}
export const UpdateMultiplexProgramRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MultiplexId: S.String.pipe(T.HttpLabel("MultiplexId")),
    MultiplexProgramSettings: S.optional(MultiplexProgramSettings),
    ProgramName: S.String.pipe(T.HttpLabel("ProgramName")),
  })
    .pipe(
      S.encodeKeys({ MultiplexProgramSettings: "multiplexProgramSettings" }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/prod/multiplexes/{MultiplexId}/programs/{ProgramName}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateMultiplexProgramRequest",
}) as any as S.Schema<UpdateMultiplexProgramRequest>;
export interface UpdateMultiplexProgramResponse {
  MultiplexProgram?: MultiplexProgram & {
    MultiplexProgramSettings: MultiplexProgramSettings & {
      ProgramNumber: __integerMin0Max65535;
      ServiceDescriptor: MultiplexProgramServiceDescriptor & {
        ProviderName: __stringMax256;
        ServiceName: __stringMax256;
      };
    };
  };
}
export const UpdateMultiplexProgramResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MultiplexProgram: S.optional(MultiplexProgram) }).pipe(
    S.encodeKeys({ MultiplexProgram: "multiplexProgram" }),
  ),
).annotate({
  identifier: "UpdateMultiplexProgramResponse",
}) as any as S.Schema<UpdateMultiplexProgramResponse>;
export interface IpPoolUpdateRequest {
  Cidr?: string;
}
export const IpPoolUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.optional(S.String) }).pipe(S.encodeKeys({ Cidr: "cidr" })),
).annotate({
  identifier: "IpPoolUpdateRequest",
}) as any as S.Schema<IpPoolUpdateRequest>;
export type __listOfIpPoolUpdateRequest = IpPoolUpdateRequest[];
export const __listOfIpPoolUpdateRequest =
  /*@__PURE__*/ S.Array(IpPoolUpdateRequest);
export interface RouteUpdateRequest {
  Cidr?: string;
  Gateway?: string;
}
export const RouteUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Cidr: S.optional(S.String), Gateway: S.optional(S.String) }).pipe(
    S.encodeKeys({ Cidr: "cidr", Gateway: "gateway" }),
  ),
).annotate({
  identifier: "RouteUpdateRequest",
}) as any as S.Schema<RouteUpdateRequest>;
export type __listOfRouteUpdateRequest = RouteUpdateRequest[];
export const __listOfRouteUpdateRequest =
  /*@__PURE__*/ S.Array(RouteUpdateRequest);
export interface UpdateNetworkRequest {
  IpPools?: IpPoolUpdateRequest[];
  Name?: string;
  NetworkId: string;
  Routes?: RouteUpdateRequest[];
}
export const UpdateNetworkRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IpPools: S.optional(__listOfIpPoolUpdateRequest),
    Name: S.optional(S.String),
    NetworkId: S.String.pipe(T.HttpLabel("NetworkId")),
    Routes: S.optional(__listOfRouteUpdateRequest),
  })
    .pipe(S.encodeKeys({ IpPools: "ipPools", Name: "name", Routes: "routes" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/prod/networks/{NetworkId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateNetworkRequest",
}) as any as S.Schema<UpdateNetworkRequest>;
export interface UpdateNetworkResponse {
  Arn?: string;
  AssociatedClusterIds?: string[];
  Id?: string;
  IpPools?: IpPool[];
  Name?: string;
  Routes?: Route[];
  State?: NetworkState;
}
export const UpdateNetworkResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    AssociatedClusterIds: S.optional(__listOf__string),
    Id: S.optional(S.String),
    IpPools: S.optional(__listOfIpPool),
    Name: S.optional(S.String),
    Routes: S.optional(__listOfRoute),
    State: S.optional(NetworkState),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      AssociatedClusterIds: "associatedClusterIds",
      Id: "id",
      IpPools: "ipPools",
      Name: "name",
      Routes: "routes",
      State: "state",
    }),
  ),
).annotate({
  identifier: "UpdateNetworkResponse",
}) as any as S.Schema<UpdateNetworkResponse>;
export interface SdiSourceMappingUpdateRequest {
  CardNumber?: number;
  ChannelNumber?: number;
  SdiSource?: string;
}
export const SdiSourceMappingUpdateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CardNumber: S.optional(S.Number),
    ChannelNumber: S.optional(S.Number),
    SdiSource: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CardNumber: "cardNumber",
      ChannelNumber: "channelNumber",
      SdiSource: "sdiSource",
    }),
  ),
).annotate({
  identifier: "SdiSourceMappingUpdateRequest",
}) as any as S.Schema<SdiSourceMappingUpdateRequest>;
export type SdiSourceMappingsUpdateRequest = SdiSourceMappingUpdateRequest[];
export const SdiSourceMappingsUpdateRequest = /*@__PURE__*/ S.Array(
  SdiSourceMappingUpdateRequest,
);
export interface UpdateNodeRequest {
  ClusterId: string;
  Name?: string;
  NodeId: string;
  Role?: NodeRole;
  SdiSourceMappings?: SdiSourceMappingUpdateRequest[];
}
export const UpdateNodeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    Name: S.optional(S.String),
    NodeId: S.String.pipe(T.HttpLabel("NodeId")),
    Role: S.optional(NodeRole),
    SdiSourceMappings: S.optional(SdiSourceMappingsUpdateRequest),
  })
    .pipe(
      S.encodeKeys({
        Name: "name",
        Role: "role",
        SdiSourceMappings: "sdiSourceMappings",
      }),
    )
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/prod/clusters/{ClusterId}/nodes/{NodeId}",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateNodeRequest",
}) as any as S.Schema<UpdateNodeRequest>;
export interface UpdateNodeResponse {
  Arn?: string;
  ChannelPlacementGroups?: string[];
  ClusterId?: string;
  ConnectionState?: NodeConnectionState;
  Id?: string;
  InstanceArn?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  Role?: NodeRole;
  State?: NodeState;
  SdiSourceMappings?: SdiSourceMapping[];
}
export const UpdateNodeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelPlacementGroups: S.optional(__listOf__string),
    ClusterId: S.optional(S.String),
    ConnectionState: S.optional(NodeConnectionState),
    Id: S.optional(S.String),
    InstanceArn: S.optional(S.String),
    Name: S.optional(S.String),
    NodeInterfaceMappings: S.optional(__listOfNodeInterfaceMapping),
    Role: S.optional(NodeRole),
    State: S.optional(NodeState),
    SdiSourceMappings: S.optional(SdiSourceMappings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ChannelPlacementGroups: "channelPlacementGroups",
      ClusterId: "clusterId",
      ConnectionState: "connectionState",
      Id: "id",
      InstanceArn: "instanceArn",
      Name: "name",
      NodeInterfaceMappings: "nodeInterfaceMappings",
      Role: "role",
      State: "state",
      SdiSourceMappings: "sdiSourceMappings",
    }),
  ),
).annotate({
  identifier: "UpdateNodeResponse",
}) as any as S.Schema<UpdateNodeResponse>;
export type UpdateNodeStateShape = "ACTIVE" | "DRAINING" | (string & {});
export const UpdateNodeStateShape = /*@__PURE__*/ S.String;

export interface UpdateNodeStateRequest {
  ClusterId: string;
  NodeId: string;
  State?: UpdateNodeStateShape;
}
export const UpdateNodeStateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClusterId: S.String.pipe(T.HttpLabel("ClusterId")),
    NodeId: S.String.pipe(T.HttpLabel("NodeId")),
    State: S.optional(UpdateNodeStateShape),
  })
    .pipe(S.encodeKeys({ State: "state" }))
    .pipe(
      T.all(
        T.Http({
          method: "PUT",
          uri: "/prod/clusters/{ClusterId}/nodes/{NodeId}/state",
        }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateNodeStateRequest",
}) as any as S.Schema<UpdateNodeStateRequest>;
export interface UpdateNodeStateResponse {
  Arn?: string;
  ChannelPlacementGroups?: string[];
  ClusterId?: string;
  ConnectionState?: NodeConnectionState;
  Id?: string;
  InstanceArn?: string;
  Name?: string;
  NodeInterfaceMappings?: NodeInterfaceMapping[];
  Role?: NodeRole;
  State?: NodeState;
  SdiSourceMappings?: SdiSourceMapping[];
}
export const UpdateNodeStateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ChannelPlacementGroups: S.optional(__listOf__string),
    ClusterId: S.optional(S.String),
    ConnectionState: S.optional(NodeConnectionState),
    Id: S.optional(S.String),
    InstanceArn: S.optional(S.String),
    Name: S.optional(S.String),
    NodeInterfaceMappings: S.optional(__listOfNodeInterfaceMapping),
    Role: S.optional(NodeRole),
    State: S.optional(NodeState),
    SdiSourceMappings: S.optional(SdiSourceMappings),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ChannelPlacementGroups: "channelPlacementGroups",
      ClusterId: "clusterId",
      ConnectionState: "connectionState",
      Id: "id",
      InstanceArn: "instanceArn",
      Name: "name",
      NodeInterfaceMappings: "nodeInterfaceMappings",
      Role: "role",
      State: "state",
      SdiSourceMappings: "sdiSourceMappings",
    }),
  ),
).annotate({
  identifier: "UpdateNodeStateResponse",
}) as any as S.Schema<UpdateNodeStateResponse>;
export interface UpdateReservationRequest {
  Name?: string;
  RenewalSettings?: RenewalSettings;
  ReservationId: string;
}
export const UpdateReservationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    RenewalSettings: S.optional(RenewalSettings),
    ReservationId: S.String.pipe(T.HttpLabel("ReservationId")),
  })
    .pipe(S.encodeKeys({ Name: "name", RenewalSettings: "renewalSettings" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/prod/reservations/{ReservationId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateReservationRequest",
}) as any as S.Schema<UpdateReservationRequest>;
export interface UpdateReservationResponse {
  Reservation?: Reservation;
}
export const UpdateReservationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Reservation: S.optional(Reservation) }).pipe(
    S.encodeKeys({ Reservation: "reservation" }),
  ),
).annotate({
  identifier: "UpdateReservationResponse",
}) as any as S.Schema<UpdateReservationResponse>;
export interface UpdateSdiSourceRequest {
  Mode?: SdiSourceMode;
  Name?: string;
  SdiSourceId: string;
  Type?: SdiSourceType;
}
export const UpdateSdiSourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Mode: S.optional(SdiSourceMode),
    Name: S.optional(S.String),
    SdiSourceId: S.String.pipe(T.HttpLabel("SdiSourceId")),
    Type: S.optional(SdiSourceType),
  })
    .pipe(S.encodeKeys({ Mode: "mode", Name: "name", Type: "type" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/prod/sdiSources/{SdiSourceId}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateSdiSourceRequest",
}) as any as S.Schema<UpdateSdiSourceRequest>;
export interface UpdateSdiSourceResponse {
  SdiSource?: SdiSource;
}
export const UpdateSdiSourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SdiSource: S.optional(SdiSource) }).pipe(
    S.encodeKeys({ SdiSource: "sdiSource" }),
  ),
).annotate({
  identifier: "UpdateSdiSourceResponse",
}) as any as S.Schema<UpdateSdiSourceResponse>;
export interface ValidationError {
  ElementPath?: string;
  ErrorMessage?: string;
}
export const ValidationError = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ElementPath: S.optional(S.String),
    ErrorMessage: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ ElementPath: "elementPath", ErrorMessage: "errorMessage" }),
  ),
).annotate({
  identifier: "ValidationError",
}) as any as S.Schema<ValidationError>;
export type __listOfValidationError = ValidationError[];
export const __listOfValidationError = /*@__PURE__*/ S.Array(ValidationError);
export type AcceptInputDeviceTransferError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Accept an incoming input device transfer. The ownership of the device will transfer to your AWS account.
 */
export const acceptInputDeviceTransfer: API.OperationMethod<
  AcceptInputDeviceTransferRequest,
  AcceptInputDeviceTransferResponse,
  AcceptInputDeviceTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AcceptInputDeviceTransferRequest,
  output: AcceptInputDeviceTransferResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptInputDeviceTransfer",
}));

export type BatchDeleteError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts delete of resources.
 */
export const batchDelete: API.OperationMethod<
  BatchDeleteRequest,
  BatchDeleteResponse,
  BatchDeleteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchDeleteRequest,
  output: BatchDeleteResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDelete",
}));

export type BatchStartError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts existing resources
 */
export const batchStart: API.OperationMethod<
  BatchStartRequest,
  BatchStartResponse,
  BatchStartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchStartRequest,
  output: BatchStartResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStart",
}));

export type BatchStopError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops running resources
 */
export const batchStop: API.OperationMethod<
  BatchStopRequest,
  BatchStopResponse,
  BatchStopError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchStopRequest,
  output: BatchStopResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchStop",
}));

export type BatchUpdateScheduleError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Update a channel schedule
 */
export const batchUpdateSchedule: API.OperationMethod<
  BatchUpdateScheduleRequest,
  BatchUpdateScheduleResponse,
  BatchUpdateScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: BatchUpdateScheduleRequest,
  output: BatchUpdateScheduleResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateSchedule",
}));

export type CancelInputDeviceTransferError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Cancel an input device transfer that you have requested.
 */
export const cancelInputDeviceTransfer: API.OperationMethod<
  CancelInputDeviceTransferRequest,
  CancelInputDeviceTransferResponse,
  CancelInputDeviceTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelInputDeviceTransferRequest,
  output: CancelInputDeviceTransferResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelInputDeviceTransfer",
}));

export type ClaimDeviceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Send a request to claim an AWS Elemental device that you have purchased from a third-party vendor. After the request succeeds, you will own the device.
 */
export const claimDevice: API.OperationMethod<
  ClaimDeviceRequest,
  ClaimDeviceResponse,
  ClaimDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ClaimDeviceRequest,
  output: ClaimDeviceResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ClaimDevice",
}));

export type CreateChannelError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | MediaLiveRoleNotYetTrusted
  | CommonErrors;
/**
 * Creates a new channel
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
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
    MediaLiveRoleNotYetTrusted,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
}));

export type CreateChannelPlacementGroupError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Create a ChannelPlacementGroup in the specified Cluster. As part of the create operation, you specify the Nodes to attach the group to.After you create a ChannelPlacementGroup, you add Channels to the group (you do this by modifying the Channels to add them to a specific group). You now have an association of Channels to ChannelPlacementGroup, and ChannelPlacementGroup to Nodes. This association means that all the Channels in the group are able to run on any of the Nodes associated with the group.
 */
export const createChannelPlacementGroup: API.OperationMethod<
  CreateChannelPlacementGroupRequest,
  CreateChannelPlacementGroupResponse,
  CreateChannelPlacementGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateChannelPlacementGroupRequest,
  output: CreateChannelPlacementGroupResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannelPlacementGroup",
}));

export type CreateCloudWatchAlarmTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a cloudwatch alarm template to dynamically generate cloudwatch metric alarms on targeted resource types.
 */
export const createCloudWatchAlarmTemplate: API.OperationMethod<
  CreateCloudWatchAlarmTemplateRequest,
  CreateCloudWatchAlarmTemplateResponse,
  CreateCloudWatchAlarmTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCloudWatchAlarmTemplateRequest,
  output: CreateCloudWatchAlarmTemplateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudWatchAlarmTemplate",
}));

export type CreateCloudWatchAlarmTemplateGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a cloudwatch alarm template group to group your cloudwatch alarm templates and to attach to signal maps for dynamically creating alarms.
 */
export const createCloudWatchAlarmTemplateGroup: API.OperationMethod<
  CreateCloudWatchAlarmTemplateGroupRequest,
  CreateCloudWatchAlarmTemplateGroupResponse,
  CreateCloudWatchAlarmTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateCloudWatchAlarmTemplateGroupRequest,
  output: CreateCloudWatchAlarmTemplateGroupResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCloudWatchAlarmTemplateGroup",
}));

export type CreateClusterError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new Cluster.
 */
export const createCluster: API.OperationMethod<
  CreateClusterRequest,
  CreateClusterResponse,
  CreateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateClusterRequest,
  output: CreateClusterResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCluster",
}));

export type CreateEventBridgeRuleTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an eventbridge rule template to monitor events and send notifications to your targeted resources.
 */
export const createEventBridgeRuleTemplate: API.OperationMethod<
  CreateEventBridgeRuleTemplateRequest,
  CreateEventBridgeRuleTemplateResponse,
  CreateEventBridgeRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEventBridgeRuleTemplateRequest,
  output: CreateEventBridgeRuleTemplateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventBridgeRuleTemplate",
}));

export type CreateEventBridgeRuleTemplateGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates an eventbridge rule template group to group your eventbridge rule templates and to attach to signal maps for dynamically creating notification rules.
 */
export const createEventBridgeRuleTemplateGroup: API.OperationMethod<
  CreateEventBridgeRuleTemplateGroupRequest,
  CreateEventBridgeRuleTemplateGroupResponse,
  CreateEventBridgeRuleTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateEventBridgeRuleTemplateGroupRequest,
  output: CreateEventBridgeRuleTemplateGroupResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEventBridgeRuleTemplateGroup",
}));

export type CreateInputError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create an input
 */
export const createInput: API.OperationMethod<
  CreateInputRequest,
  CreateInputResponse,
  CreateInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInputRequest,
  output: CreateInputResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInput",
}));

export type CreateInputSecurityGroupError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Creates a Input Security Group
 */
export const createInputSecurityGroup: API.OperationMethod<
  CreateInputSecurityGroupRequest,
  CreateInputSecurityGroupResponse,
  CreateInputSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateInputSecurityGroupRequest,
  output: CreateInputSecurityGroupResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInputSecurityGroup",
}));

export type CreateMultiplexError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Create a new multiplex.
 */
export const createMultiplex: API.OperationMethod<
  CreateMultiplexRequest,
  CreateMultiplexResponse,
  CreateMultiplexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMultiplexRequest,
  output: CreateMultiplexResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultiplex",
}));

export type CreateMultiplexProgramError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Create a new program in the multiplex.
 */
export const createMultiplexProgram: API.OperationMethod<
  CreateMultiplexProgramRequest,
  CreateMultiplexProgramResponse,
  CreateMultiplexProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateMultiplexProgramRequest,
  output: CreateMultiplexProgramResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultiplexProgram",
}));

export type CreateNetworkError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create as many Networks as you need. You will associate one or more Clusters with each Network.Each Network provides MediaLive Anywhere with required information about the network in your organization that you are using for video encoding using MediaLive.
 */
export const createNetwork: API.OperationMethod<
  CreateNetworkRequest,
  CreateNetworkResponse,
  CreateNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNetworkRequest,
  output: CreateNetworkResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNetwork",
}));

export type CreateNodeError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Create a Node in the specified Cluster. You can also create Nodes using the CreateNodeRegistrationScript. Note that you can't move a Node to another Cluster.
 */
export const createNode: API.OperationMethod<
  CreateNodeRequest,
  CreateNodeResponse,
  CreateNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNodeRequest,
  output: CreateNodeResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNode",
}));

export type CreateNodeRegistrationScriptError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create the Register Node script for all the nodes intended for a specific Cluster. You will then run the script on each hardware unit that is intended for that Cluster. The script creates a Node in the specified Cluster. It then binds the Node to this hardware unit, and activates the node hardware for use with MediaLive Anywhere.
 */
export const createNodeRegistrationScript: API.OperationMethod<
  CreateNodeRegistrationScriptRequest,
  CreateNodeRegistrationScriptResponse,
  CreateNodeRegistrationScriptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateNodeRegistrationScriptRequest,
  output: CreateNodeRegistrationScriptResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNodeRegistrationScript",
}));

export type CreatePartnerInputError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a partner input
 */
export const createPartnerInput: API.OperationMethod<
  CreatePartnerInputRequest,
  CreatePartnerInputResponse,
  CreatePartnerInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePartnerInputRequest,
  output: CreatePartnerInputResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePartnerInput",
}));

export type CreateSdiSourceError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create an SdiSource for each video source that uses the SDI protocol. You will reference the SdiSource when you create an SDI input in MediaLive. You will also reference it in an SdiSourceMapping, in order to create a connection between the logical SdiSource and the physical SDI card and port that the physical SDI source uses.
 */
export const createSdiSource: API.OperationMethod<
  CreateSdiSourceRequest,
  CreateSdiSourceResponse,
  CreateSdiSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSdiSourceRequest,
  output: CreateSdiSourceResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSdiSource",
}));

export type CreateSignalMapError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Initiates the creation of a new signal map. Will discover a new mediaResourceMap based on the provided discoveryEntryPointArn.
 */
export const createSignalMap: API.OperationMethod<
  CreateSignalMapRequest,
  CreateSignalMapResponse,
  CreateSignalMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateSignalMapRequest,
  output: CreateSignalMapResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSignalMap",
}));

export type CreateTagsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Create tags for a resource
 */
export const createTags: API.OperationMethod<
  CreateTagsRequest,
  CreateTagsResponse,
  CreateTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateTagsRequest,
  output: CreateTagsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTags",
}));

export type DeleteChannelError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts deletion of channel. The associated outputs are also deleted.
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
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
}));

export type DeleteChannelPlacementGroupError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete the specified ChannelPlacementGroup that exists in the specified Cluster.
 */
export const deleteChannelPlacementGroup: API.OperationMethod<
  DeleteChannelPlacementGroupRequest,
  DeleteChannelPlacementGroupResponse,
  DeleteChannelPlacementGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteChannelPlacementGroupRequest,
  output: DeleteChannelPlacementGroupResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannelPlacementGroup",
}));

export type DeleteCloudWatchAlarmTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a cloudwatch alarm template.
 */
export const deleteCloudWatchAlarmTemplate: API.OperationMethod<
  DeleteCloudWatchAlarmTemplateRequest,
  DeleteCloudWatchAlarmTemplateResponse,
  DeleteCloudWatchAlarmTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCloudWatchAlarmTemplateRequest,
  output: DeleteCloudWatchAlarmTemplateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudWatchAlarmTemplate",
}));

export type DeleteCloudWatchAlarmTemplateGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes a cloudwatch alarm template group. You must detach this group from all signal maps and ensure its existing templates are moved to another group or deleted.
 */
export const deleteCloudWatchAlarmTemplateGroup: API.OperationMethod<
  DeleteCloudWatchAlarmTemplateGroupRequest,
  DeleteCloudWatchAlarmTemplateGroupResponse,
  DeleteCloudWatchAlarmTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteCloudWatchAlarmTemplateGroupRequest,
  output: DeleteCloudWatchAlarmTemplateGroupResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCloudWatchAlarmTemplateGroup",
}));

export type DeleteClusterError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a Cluster. The Cluster must be idle.
 */
export const deleteCluster: API.OperationMethod<
  DeleteClusterRequest,
  DeleteClusterResponse,
  DeleteClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteClusterRequest,
  output: DeleteClusterResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCluster",
}));

export type DeleteEventBridgeRuleTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an eventbridge rule template.
 */
export const deleteEventBridgeRuleTemplate: API.OperationMethod<
  DeleteEventBridgeRuleTemplateRequest,
  DeleteEventBridgeRuleTemplateResponse,
  DeleteEventBridgeRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventBridgeRuleTemplateRequest,
  output: DeleteEventBridgeRuleTemplateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventBridgeRuleTemplate",
}));

export type DeleteEventBridgeRuleTemplateGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an eventbridge rule template group. You must detach this group from all signal maps and ensure its existing templates are moved to another group or deleted.
 */
export const deleteEventBridgeRuleTemplateGroup: API.OperationMethod<
  DeleteEventBridgeRuleTemplateGroupRequest,
  DeleteEventBridgeRuleTemplateGroupResponse,
  DeleteEventBridgeRuleTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteEventBridgeRuleTemplateGroupRequest,
  output: DeleteEventBridgeRuleTemplateGroupResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventBridgeRuleTemplateGroup",
}));

export type DeleteInputError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the input end point
 */
export const deleteInput: API.OperationMethod<
  DeleteInputRequest,
  DeleteInputResponse,
  DeleteInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInputRequest,
  output: DeleteInputResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInput",
}));

export type DeleteInputSecurityGroupError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes an Input Security Group
 */
export const deleteInputSecurityGroup: API.OperationMethod<
  DeleteInputSecurityGroupRequest,
  DeleteInputSecurityGroupResponse,
  DeleteInputSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteInputSecurityGroupRequest,
  output: DeleteInputSecurityGroupResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInputSecurityGroup",
}));

export type DeleteMultiplexError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a multiplex. The multiplex must be idle.
 */
export const deleteMultiplex: API.OperationMethod<
  DeleteMultiplexRequest,
  DeleteMultiplexResponse,
  DeleteMultiplexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMultiplexRequest,
  output: DeleteMultiplexResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMultiplex",
}));

export type DeleteMultiplexProgramError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a program from a multiplex.
 */
export const deleteMultiplexProgram: API.OperationMethod<
  DeleteMultiplexProgramRequest,
  DeleteMultiplexProgramResponse,
  DeleteMultiplexProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteMultiplexProgramRequest,
  output: DeleteMultiplexProgramResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMultiplexProgram",
}));

export type DeleteNetworkError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a Network. The Network must have no resources associated with it.
 */
export const deleteNetwork: API.OperationMethod<
  DeleteNetworkRequest,
  DeleteNetworkResponse,
  DeleteNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNetworkRequest,
  output: DeleteNetworkResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetwork",
}));

export type DeleteNodeError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete a Node. The Node must be IDLE.
 */
export const deleteNode: API.OperationMethod<
  DeleteNodeRequest,
  DeleteNodeResponse,
  DeleteNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteNodeRequest,
  output: DeleteNodeResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNode",
}));

export type DeleteReservationError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an expired reservation.
 */
export const deleteReservation: API.OperationMethod<
  DeleteReservationRequest,
  DeleteReservationResponse,
  DeleteReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteReservationRequest,
  output: DeleteReservationResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteReservation",
}));

export type DeleteScheduleError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete all schedule actions on a channel.
 */
export const deleteSchedule: API.OperationMethod<
  DeleteScheduleRequest,
  DeleteScheduleResponse,
  DeleteScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteScheduleRequest,
  output: DeleteScheduleResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchedule",
}));

export type DeleteSdiSourceError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Delete an SdiSource. The SdiSource must not be part of any SidSourceMapping and must not be attached to any input.
 */
export const deleteSdiSource: API.OperationMethod<
  DeleteSdiSourceRequest,
  DeleteSdiSourceResponse,
  DeleteSdiSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSdiSourceRequest,
  output: DeleteSdiSourceResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSdiSource",
}));

export type DeleteSignalMapError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified signal map.
 */
export const deleteSignalMap: API.OperationMethod<
  DeleteSignalMapRequest,
  DeleteSignalMapResponse,
  DeleteSignalMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteSignalMapRequest,
  output: DeleteSignalMapResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSignalMap",
}));

export type DeleteTagsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Removes tags for a resource
 */
export const deleteTags: API.OperationMethod<
  DeleteTagsRequest,
  DeleteTagsResponse,
  DeleteTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteTagsRequest,
  output: DeleteTagsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTags",
}));

export type DescribeAccountConfigurationError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describe account configuration
 */
export const describeAccountConfiguration: API.OperationMethod<
  DescribeAccountConfigurationRequest,
  DescribeAccountConfigurationResponse,
  DescribeAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeAccountConfigurationRequest,
  output: DescribeAccountConfigurationResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountConfiguration",
}));

export type DescribeChannelError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about a channel
 */
export const describeChannel: API.OperationMethod<
  DescribeChannelRequest,
  DescribeChannelResponse,
  DescribeChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeChannelRequest,
  output: DescribeChannelResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChannel",
}));

export type DescribeChannelPlacementGroupError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get details about a ChannelPlacementGroup.
 */
export const describeChannelPlacementGroup: API.OperationMethod<
  DescribeChannelPlacementGroupRequest,
  DescribeChannelPlacementGroupResponse,
  DescribeChannelPlacementGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeChannelPlacementGroupRequest,
  output: DescribeChannelPlacementGroupResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChannelPlacementGroup",
}));

export type DescribeClusterError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get details about a Cluster.
 */
export const describeCluster: API.OperationMethod<
  DescribeClusterRequest,
  DescribeClusterResponse,
  DescribeClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeClusterRequest,
  output: DescribeClusterResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeCluster",
}));

export type DescribeInputError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Produces details about an input
 */
export const describeInput: API.OperationMethod<
  DescribeInputRequest,
  DescribeInputResponse,
  DescribeInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInputRequest,
  output: DescribeInputResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInput",
}));

export type DescribeInputDeviceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets the details for the input device
 */
export const describeInputDevice: API.OperationMethod<
  DescribeInputDeviceRequest,
  DescribeInputDeviceResponse,
  DescribeInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInputDeviceRequest,
  output: DescribeInputDeviceResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInputDevice",
}));

export type DescribeInputDeviceThumbnailError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get the latest thumbnail data for the input device.
 */
export const describeInputDeviceThumbnail: API.OperationMethod<
  DescribeInputDeviceThumbnailRequest,
  DescribeInputDeviceThumbnailResponse,
  DescribeInputDeviceThumbnailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInputDeviceThumbnailRequest,
  output: DescribeInputDeviceThumbnailResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInputDeviceThumbnail",
}));

export type DescribeInputSecurityGroupError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Produces a summary of an Input Security Group
 */
export const describeInputSecurityGroup: API.OperationMethod<
  DescribeInputSecurityGroupRequest,
  DescribeInputSecurityGroupResponse,
  DescribeInputSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeInputSecurityGroupRequest,
  output: DescribeInputSecurityGroupResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInputSecurityGroup",
}));

export type DescribeMultiplexError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about a multiplex.
 */
export const describeMultiplex: API.OperationMethod<
  DescribeMultiplexRequest,
  DescribeMultiplexResponse,
  DescribeMultiplexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMultiplexRequest,
  output: DescribeMultiplexResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiplex",
}));

export type DescribeMultiplexProgramError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get the details for a program in a multiplex.
 */
export const describeMultiplexProgram: API.OperationMethod<
  DescribeMultiplexProgramRequest,
  DescribeMultiplexProgramResponse,
  DescribeMultiplexProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeMultiplexProgramRequest,
  output: DescribeMultiplexProgramResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiplexProgram",
}));

export type DescribeNetworkError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get details about a Network.
 */
export const describeNetwork: API.OperationMethod<
  DescribeNetworkRequest,
  DescribeNetworkResponse,
  DescribeNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeNetworkRequest,
  output: DescribeNetworkResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNetwork",
}));

export type DescribeNodeError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get details about a Node in the specified Cluster.
 */
export const describeNode: API.OperationMethod<
  DescribeNodeRequest,
  DescribeNodeResponse,
  DescribeNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeNodeRequest,
  output: DescribeNodeResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNode",
}));

export type DescribeOfferingError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get details for an offering.
 */
export const describeOffering: API.OperationMethod<
  DescribeOfferingRequest,
  DescribeOfferingResponse,
  DescribeOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeOfferingRequest,
  output: DescribeOfferingResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeOffering",
}));

export type DescribeReservationError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get details for a reservation.
 */
export const describeReservation: API.OperationMethod<
  DescribeReservationRequest,
  DescribeReservationResponse,
  DescribeReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeReservationRequest,
  output: DescribeReservationResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeReservation",
}));

export type DescribeScheduleError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Get a channel schedule
 */
export const describeSchedule: API.PaginatedOperationMethod<
  DescribeScheduleRequest,
  DescribeScheduleResponse,
  DescribeScheduleError,
  Credentials | HttpClient.HttpClient,
  ScheduleAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeScheduleRequest,
  output: DescribeScheduleResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSchedule",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScheduleActions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DescribeSdiSourceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Gets details about a SdiSource.
 */
export const describeSdiSource: API.OperationMethod<
  DescribeSdiSourceRequest,
  DescribeSdiSourceResponse,
  DescribeSdiSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeSdiSourceRequest,
  output: DescribeSdiSourceResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeSdiSource",
}));

export type DescribeThumbnailsError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Describe the latest thumbnails data.
 */
export const describeThumbnails: API.OperationMethod<
  DescribeThumbnailsRequest,
  DescribeThumbnailsResponse,
  DescribeThumbnailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DescribeThumbnailsRequest,
  output: DescribeThumbnailsResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeThumbnails",
}));

export type GetCloudWatchAlarmTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the specified cloudwatch alarm template.
 */
export const getCloudWatchAlarmTemplate: API.OperationMethod<
  GetCloudWatchAlarmTemplateRequest,
  GetCloudWatchAlarmTemplateResponse,
  GetCloudWatchAlarmTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCloudWatchAlarmTemplateRequest,
  output: GetCloudWatchAlarmTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudWatchAlarmTemplate",
}));

export type GetCloudWatchAlarmTemplateGroupError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the specified cloudwatch alarm template group.
 */
export const getCloudWatchAlarmTemplateGroup: API.OperationMethod<
  GetCloudWatchAlarmTemplateGroupRequest,
  GetCloudWatchAlarmTemplateGroupResponse,
  GetCloudWatchAlarmTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetCloudWatchAlarmTemplateGroupRequest,
  output: GetCloudWatchAlarmTemplateGroupResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCloudWatchAlarmTemplateGroup",
}));

export type GetEventBridgeRuleTemplateError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the specified eventbridge rule template.
 */
export const getEventBridgeRuleTemplate: API.OperationMethod<
  GetEventBridgeRuleTemplateRequest,
  GetEventBridgeRuleTemplateResponse,
  GetEventBridgeRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventBridgeRuleTemplateRequest,
  output: GetEventBridgeRuleTemplateResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventBridgeRuleTemplate",
}));

export type GetEventBridgeRuleTemplateGroupError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the specified eventbridge rule template group.
 */
export const getEventBridgeRuleTemplateGroup: API.OperationMethod<
  GetEventBridgeRuleTemplateGroupRequest,
  GetEventBridgeRuleTemplateGroupResponse,
  GetEventBridgeRuleTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetEventBridgeRuleTemplateGroupRequest,
  output: GetEventBridgeRuleTemplateGroupResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventBridgeRuleTemplateGroup",
}));

export type GetSignalMapError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the specified signal map.
 */
export const getSignalMap: API.OperationMethod<
  GetSignalMapRequest,
  GetSignalMapResponse,
  GetSignalMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetSignalMapRequest,
  output: GetSignalMapResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSignalMap",
}));

export type ListAlertsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the alerts for a channel with optional filtering based on alert state.
 */
export const listAlerts: API.PaginatedOperationMethod<
  ListAlertsRequest,
  ListAlertsResponse,
  ListAlertsError,
  Credentials | HttpClient.HttpClient,
  ChannelAlert
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListAlertsRequest,
  output: ListAlertsResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAlerts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Alerts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelPlacementGroupsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the list of ChannelPlacementGroups in the specified Cluster.
 */
export const listChannelPlacementGroups: API.PaginatedOperationMethod<
  ListChannelPlacementGroupsRequest,
  ListChannelPlacementGroupsResponse,
  ListChannelPlacementGroupsError,
  Credentials | HttpClient.HttpClient,
  DescribeChannelPlacementGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChannelPlacementGroupsRequest,
  output: ListChannelPlacementGroupsResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannelPlacementGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ChannelPlacementGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListChannelsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Produces list of channels that have been created
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsRequest,
  ListChannelsResponse,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  ChannelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListChannelsRequest,
  output: ListChannelsResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Channels",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCloudWatchAlarmTemplateGroupsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists cloudwatch alarm template groups.
 */
export const listCloudWatchAlarmTemplateGroups: API.PaginatedOperationMethod<
  ListCloudWatchAlarmTemplateGroupsRequest,
  ListCloudWatchAlarmTemplateGroupsResponse,
  ListCloudWatchAlarmTemplateGroupsError,
  Credentials | HttpClient.HttpClient,
  CloudWatchAlarmTemplateGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCloudWatchAlarmTemplateGroupsRequest,
  output: ListCloudWatchAlarmTemplateGroupsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudWatchAlarmTemplateGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CloudWatchAlarmTemplateGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCloudWatchAlarmTemplatesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists cloudwatch alarm templates.
 */
export const listCloudWatchAlarmTemplates: API.PaginatedOperationMethod<
  ListCloudWatchAlarmTemplatesRequest,
  ListCloudWatchAlarmTemplatesResponse,
  ListCloudWatchAlarmTemplatesError,
  Credentials | HttpClient.HttpClient,
  CloudWatchAlarmTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListCloudWatchAlarmTemplatesRequest,
  output: ListCloudWatchAlarmTemplatesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCloudWatchAlarmTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CloudWatchAlarmTemplates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClusterAlertsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the alerts for a cluster with optional filtering based on alert state.
 */
export const listClusterAlerts: API.PaginatedOperationMethod<
  ListClusterAlertsRequest,
  ListClusterAlertsResponse,
  ListClusterAlertsError,
  Credentials | HttpClient.HttpClient,
  ClusterAlert
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClusterAlertsRequest,
  output: ListClusterAlertsResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusterAlerts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Alerts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListClustersError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the list of Clusters.
 */
export const listClusters: API.PaginatedOperationMethod<
  ListClustersRequest,
  ListClustersResponse,
  ListClustersError,
  Credentials | HttpClient.HttpClient,
  DescribeClusterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListClustersRequest,
  output: ListClustersResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListClusters",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Clusters",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventBridgeRuleTemplateGroupsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists eventbridge rule template groups.
 */
export const listEventBridgeRuleTemplateGroups: API.PaginatedOperationMethod<
  ListEventBridgeRuleTemplateGroupsRequest,
  ListEventBridgeRuleTemplateGroupsResponse,
  ListEventBridgeRuleTemplateGroupsError,
  Credentials | HttpClient.HttpClient,
  EventBridgeRuleTemplateGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventBridgeRuleTemplateGroupsRequest,
  output: ListEventBridgeRuleTemplateGroupsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventBridgeRuleTemplateGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventBridgeRuleTemplateGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListEventBridgeRuleTemplatesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists eventbridge rule templates.
 */
export const listEventBridgeRuleTemplates: API.PaginatedOperationMethod<
  ListEventBridgeRuleTemplatesRequest,
  ListEventBridgeRuleTemplatesResponse,
  ListEventBridgeRuleTemplatesError,
  Credentials | HttpClient.HttpClient,
  EventBridgeRuleTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListEventBridgeRuleTemplatesRequest,
  output: ListEventBridgeRuleTemplatesResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventBridgeRuleTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventBridgeRuleTemplates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInputDevicesError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List input devices
 */
export const listInputDevices: API.PaginatedOperationMethod<
  ListInputDevicesRequest,
  ListInputDevicesResponse,
  ListInputDevicesError,
  Credentials | HttpClient.HttpClient,
  InputDeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInputDevicesRequest,
  output: ListInputDevicesResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInputDevices",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InputDevices",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInputDeviceTransfersError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * List input devices that are currently being transferred. List input devices that you are transferring from your AWS account or input devices that another AWS account is transferring to you.
 */
export const listInputDeviceTransfers: API.PaginatedOperationMethod<
  ListInputDeviceTransfersRequest,
  ListInputDeviceTransfersResponse,
  ListInputDeviceTransfersError,
  Credentials | HttpClient.HttpClient,
  TransferringInputDeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInputDeviceTransfersRequest,
  output: ListInputDeviceTransfersResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInputDeviceTransfers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InputDeviceTransfers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInputsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Produces list of inputs that have been created
 */
export const listInputs: API.PaginatedOperationMethod<
  ListInputsRequest,
  ListInputsResponse,
  ListInputsError,
  Credentials | HttpClient.HttpClient,
  Input
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInputsRequest,
  output: ListInputsResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInputs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Inputs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListInputSecurityGroupsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Produces a list of Input Security Groups for an account
 */
export const listInputSecurityGroups: API.PaginatedOperationMethod<
  ListInputSecurityGroupsRequest,
  ListInputSecurityGroupsResponse,
  ListInputSecurityGroupsError,
  Credentials | HttpClient.HttpClient,
  InputSecurityGroup
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListInputSecurityGroupsRequest,
  output: ListInputSecurityGroupsResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInputSecurityGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "InputSecurityGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMultiplexAlertsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the alerts for a multiplex with optional filtering based on alert state.
 */
export const listMultiplexAlerts: API.PaginatedOperationMethod<
  ListMultiplexAlertsRequest,
  ListMultiplexAlertsResponse,
  ListMultiplexAlertsError,
  Credentials | HttpClient.HttpClient,
  MultiplexAlert
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMultiplexAlertsRequest,
  output: ListMultiplexAlertsResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultiplexAlerts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Alerts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMultiplexesError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a list of the existing multiplexes.
 */
export const listMultiplexes: API.PaginatedOperationMethod<
  ListMultiplexesRequest,
  ListMultiplexesResponse,
  ListMultiplexesError,
  Credentials | HttpClient.HttpClient,
  MultiplexSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMultiplexesRequest,
  output: ListMultiplexesResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultiplexes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Multiplexes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMultiplexProgramsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List the programs that currently exist for a specific multiplex.
 */
export const listMultiplexPrograms: API.PaginatedOperationMethod<
  ListMultiplexProgramsRequest,
  ListMultiplexProgramsResponse,
  ListMultiplexProgramsError,
  Credentials | HttpClient.HttpClient,
  MultiplexProgramSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListMultiplexProgramsRequest,
  output: ListMultiplexProgramsResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultiplexPrograms",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MultiplexPrograms",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNetworksError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the list of Networks.
 */
export const listNetworks: API.PaginatedOperationMethod<
  ListNetworksRequest,
  ListNetworksResponse,
  ListNetworksError,
  Credentials | HttpClient.HttpClient,
  DescribeNetworkSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNetworksRequest,
  output: ListNetworksResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNetworks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Networks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNodesError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the list of Nodes.
 */
export const listNodes: API.PaginatedOperationMethod<
  ListNodesRequest,
  ListNodesResponse,
  ListNodesError,
  Credentials | HttpClient.HttpClient,
  DescribeNodeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListNodesRequest,
  output: ListNodesResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNodes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Nodes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOfferingsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List offerings available for purchase.
 */
export const listOfferings: API.PaginatedOperationMethod<
  ListOfferingsRequest,
  ListOfferingsResponse,
  ListOfferingsError,
  Credentials | HttpClient.HttpClient,
  Offering
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListOfferingsRequest,
  output: ListOfferingsResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOfferings",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Offerings",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReservationsError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List purchased reservations.
 */
export const listReservations: API.PaginatedOperationMethod<
  ListReservationsRequest,
  ListReservationsResponse,
  ListReservationsError,
  Credentials | HttpClient.HttpClient,
  Reservation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListReservationsRequest,
  output: ListReservationsResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReservations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Reservations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSdiSourcesError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * List all the SdiSources in the AWS account.
 */
export const listSdiSources: API.PaginatedOperationMethod<
  ListSdiSourcesRequest,
  ListSdiSourcesResponse,
  ListSdiSourcesError,
  Credentials | HttpClient.HttpClient,
  SdiSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSdiSourcesRequest,
  output: ListSdiSourcesResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSdiSources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SdiSources",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSignalMapsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Lists signal maps.
 */
export const listSignalMaps: API.PaginatedOperationMethod<
  ListSignalMapsRequest,
  ListSignalMapsResponse,
  ListSignalMapsError,
  Credentials | HttpClient.HttpClient,
  SignalMapSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListSignalMapsRequest,
  output: ListSignalMapsResponse,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSignalMaps",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "SignalMaps",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Produces list of tags that have been created for a resource
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
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListVersionsError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves an array of all the encoder engine versions that are available in this AWS account.
 */
export const listVersions: API.OperationMethod<
  ListVersionsRequest,
  ListVersionsResponse,
  ListVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ListVersionsRequest,
  output: ListVersionsResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVersions",
}));

export type PurchaseOfferingError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Purchase an offering and create a reservation.
 */
export const purchaseOffering: API.OperationMethod<
  PurchaseOfferingRequest,
  PurchaseOfferingResponse,
  PurchaseOfferingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PurchaseOfferingRequest,
  output: PurchaseOfferingResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PurchaseOffering",
}));

export type RebootInputDeviceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Send a reboot command to the specified input device. The device will begin rebooting within a few seconds of sending the command. When the reboot is complete, the device’s connection status will change to connected.
 */
export const rebootInputDevice: API.OperationMethod<
  RebootInputDeviceRequest,
  RebootInputDeviceResponse,
  RebootInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RebootInputDeviceRequest,
  output: RebootInputDeviceResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RebootInputDevice",
}));

export type RejectInputDeviceTransferError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Reject the transfer of the specified input device to your AWS account.
 */
export const rejectInputDeviceTransfer: API.OperationMethod<
  RejectInputDeviceTransferRequest,
  RejectInputDeviceTransferResponse,
  RejectInputDeviceTransferError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RejectInputDeviceTransferRequest,
  output: RejectInputDeviceTransferResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectInputDeviceTransfer",
}));

export type RestartChannelPipelinesError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Restart pipelines in one channel that is currently running.
 */
export const restartChannelPipelines: API.OperationMethod<
  RestartChannelPipelinesRequest,
  RestartChannelPipelinesResponse,
  RestartChannelPipelinesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: RestartChannelPipelinesRequest,
  output: RestartChannelPipelinesResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestartChannelPipelines",
}));

export type StartChannelError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Starts an existing channel
 */
export const startChannel: API.OperationMethod<
  StartChannelRequest,
  StartChannelResponse,
  StartChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartChannelRequest,
  output: StartChannelResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartChannel",
}));

export type StartDeleteMonitorDeploymentError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Initiates a deployment to delete the monitor of the specified signal map.
 */
export const startDeleteMonitorDeployment: API.OperationMethod<
  StartDeleteMonitorDeploymentRequest,
  StartDeleteMonitorDeploymentResponse,
  StartDeleteMonitorDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartDeleteMonitorDeploymentRequest,
  output: StartDeleteMonitorDeploymentResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartDeleteMonitorDeployment",
}));

export type StartInputDeviceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Start an input device that is attached to a MediaConnect flow. (There is no need to start a device that is attached to a MediaLive input; MediaLive starts the device when the channel starts.)
 */
export const startInputDevice: API.OperationMethod<
  StartInputDeviceRequest,
  StartInputDeviceResponse,
  StartInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartInputDeviceRequest,
  output: StartInputDeviceResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInputDevice",
}));

export type StartInputDeviceMaintenanceWindowError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Start a maintenance window for the specified input device. Starting a maintenance window will give the device up to two hours to install software. If the device was streaming prior to the maintenance, it will resume streaming when the software is fully installed. Devices automatically install updates while they are powered on and their MediaLive channels are stopped. A maintenance window allows you to update a device without having to stop MediaLive channels that use the device. The device must remain powered on and connected to the internet for the duration of the maintenance.
 */
export const startInputDeviceMaintenanceWindow: API.OperationMethod<
  StartInputDeviceMaintenanceWindowRequest,
  StartInputDeviceMaintenanceWindowResponse,
  StartInputDeviceMaintenanceWindowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartInputDeviceMaintenanceWindowRequest,
  output: StartInputDeviceMaintenanceWindowResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartInputDeviceMaintenanceWindow",
}));

export type StartMonitorDeploymentError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Initiates a deployment to deploy the latest monitor of the specified signal map.
 */
export const startMonitorDeployment: API.OperationMethod<
  StartMonitorDeploymentRequest,
  StartMonitorDeploymentResponse,
  StartMonitorDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMonitorDeploymentRequest,
  output: StartMonitorDeploymentResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMonitorDeployment",
}));

export type StartMultiplexError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Start (run) the multiplex. Starting the multiplex does not start the channels. You must explicitly start each channel.
 */
export const startMultiplex: API.OperationMethod<
  StartMultiplexRequest,
  StartMultiplexResponse,
  StartMultiplexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartMultiplexRequest,
  output: StartMultiplexResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMultiplex",
}));

export type StartUpdateSignalMapError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Initiates an update for the specified signal map. Will discover a new signal map if a changed discoveryEntryPointArn is provided.
 */
export const startUpdateSignalMap: API.OperationMethod<
  StartUpdateSignalMapRequest,
  StartUpdateSignalMapResponse,
  StartUpdateSignalMapError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartUpdateSignalMapRequest,
  output: StartUpdateSignalMapResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartUpdateSignalMap",
}));

export type StopChannelError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a running channel
 */
export const stopChannel: API.OperationMethod<
  StopChannelRequest,
  StopChannelResponse,
  StopChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopChannelRequest,
  output: StopChannelResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopChannel",
}));

export type StopInputDeviceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Stop an input device that is attached to a MediaConnect flow. (There is no need to stop a device that is attached to a MediaLive input; MediaLive automatically stops the device when the channel stops.)
 */
export const stopInputDevice: API.OperationMethod<
  StopInputDeviceRequest,
  StopInputDeviceResponse,
  StopInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopInputDeviceRequest,
  output: StopInputDeviceResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopInputDevice",
}));

export type StopMultiplexError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Stops a running multiplex. If the multiplex isn't running, this action has no effect.
 */
export const stopMultiplex: API.OperationMethod<
  StopMultiplexRequest,
  StopMultiplexResponse,
  StopMultiplexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StopMultiplexRequest,
  output: StopMultiplexResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopMultiplex",
}));

export type TransferInputDeviceError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Start an input device transfer to another AWS account. After you make the request, the other account must accept or reject the transfer.
 */
export const transferInputDevice: API.OperationMethod<
  TransferInputDeviceRequest,
  TransferInputDeviceResponse,
  TransferInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: TransferInputDeviceRequest,
  output: TransferInputDeviceResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TransferInputDevice",
}));

export type UpdateAccountConfigurationError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Update account configuration
 */
export const updateAccountConfiguration: API.OperationMethod<
  UpdateAccountConfigurationRequest,
  UpdateAccountConfigurationResponse,
  UpdateAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateAccountConfigurationRequest,
  output: UpdateAccountConfigurationResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountConfiguration",
}));

export type UpdateChannelError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Updates a channel.
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
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannel",
}));

export type UpdateChannelClassError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Changes the class of the channel.
 */
export const updateChannelClass: API.OperationMethod<
  UpdateChannelClassRequest,
  UpdateChannelClassResponse,
  UpdateChannelClassError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateChannelClassRequest,
  output: UpdateChannelClassResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannelClass",
}));

export type UpdateChannelPlacementGroupError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Change the settings for a ChannelPlacementGroup.
 */
export const updateChannelPlacementGroup: API.OperationMethod<
  UpdateChannelPlacementGroupRequest,
  UpdateChannelPlacementGroupResponse,
  UpdateChannelPlacementGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateChannelPlacementGroupRequest,
  output: UpdateChannelPlacementGroupResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateChannelPlacementGroup",
}));

export type UpdateCloudWatchAlarmTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the specified cloudwatch alarm template.
 */
export const updateCloudWatchAlarmTemplate: API.OperationMethod<
  UpdateCloudWatchAlarmTemplateRequest,
  UpdateCloudWatchAlarmTemplateResponse,
  UpdateCloudWatchAlarmTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCloudWatchAlarmTemplateRequest,
  output: UpdateCloudWatchAlarmTemplateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCloudWatchAlarmTemplate",
}));

export type UpdateCloudWatchAlarmTemplateGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the specified cloudwatch alarm template group.
 */
export const updateCloudWatchAlarmTemplateGroup: API.OperationMethod<
  UpdateCloudWatchAlarmTemplateGroupRequest,
  UpdateCloudWatchAlarmTemplateGroupResponse,
  UpdateCloudWatchAlarmTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateCloudWatchAlarmTemplateGroupRequest,
  output: UpdateCloudWatchAlarmTemplateGroupResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCloudWatchAlarmTemplateGroup",
}));

export type UpdateClusterError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Change the settings for a Cluster.
 */
export const updateCluster: API.OperationMethod<
  UpdateClusterRequest,
  UpdateClusterResponse,
  UpdateClusterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateClusterRequest,
  output: UpdateClusterResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCluster",
}));

export type UpdateEventBridgeRuleTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the specified eventbridge rule template.
 */
export const updateEventBridgeRuleTemplate: API.OperationMethod<
  UpdateEventBridgeRuleTemplateRequest,
  UpdateEventBridgeRuleTemplateResponse,
  UpdateEventBridgeRuleTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEventBridgeRuleTemplateRequest,
  output: UpdateEventBridgeRuleTemplateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventBridgeRuleTemplate",
}));

export type UpdateEventBridgeRuleTemplateGroupError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the specified eventbridge rule template group.
 */
export const updateEventBridgeRuleTemplateGroup: API.OperationMethod<
  UpdateEventBridgeRuleTemplateGroupRequest,
  UpdateEventBridgeRuleTemplateGroupResponse,
  UpdateEventBridgeRuleTemplateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateEventBridgeRuleTemplateGroupRequest,
  output: UpdateEventBridgeRuleTemplateGroupResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateEventBridgeRuleTemplateGroup",
}));

export type UpdateInputError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Updates an input.
 */
export const updateInput: API.OperationMethod<
  UpdateInputRequest,
  UpdateInputResponse,
  UpdateInputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateInputRequest,
  output: UpdateInputResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInput",
}));

export type UpdateInputDeviceError =
  | BadGatewayException
  | BadRequestException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Updates the parameters for the input device.
 */
export const updateInputDevice: API.OperationMethod<
  UpdateInputDeviceRequest,
  UpdateInputDeviceResponse,
  UpdateInputDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateInputDeviceRequest,
  output: UpdateInputDeviceResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInputDevice",
}));

export type UpdateInputSecurityGroupError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | CommonErrors;
/**
 * Update an Input Security Group's Whilelists.
 */
export const updateInputSecurityGroup: API.OperationMethod<
  UpdateInputSecurityGroupRequest,
  UpdateInputSecurityGroupResponse,
  UpdateInputSecurityGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateInputSecurityGroupRequest,
  output: UpdateInputSecurityGroupResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateInputSecurityGroup",
}));

export type UpdateMultiplexError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Updates a multiplex.
 */
export const updateMultiplex: API.OperationMethod<
  UpdateMultiplexRequest,
  UpdateMultiplexResponse,
  UpdateMultiplexError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMultiplexRequest,
  output: UpdateMultiplexResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMultiplex",
}));

export type UpdateMultiplexProgramError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Update a program in a multiplex.
 */
export const updateMultiplexProgram: API.OperationMethod<
  UpdateMultiplexProgramRequest,
  UpdateMultiplexProgramResponse,
  UpdateMultiplexProgramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateMultiplexProgramRequest,
  output: UpdateMultiplexProgramResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMultiplexProgram",
}));

export type UpdateNetworkError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Change the settings for a Network.
 */
export const updateNetwork: API.OperationMethod<
  UpdateNetworkRequest,
  UpdateNetworkResponse,
  UpdateNetworkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNetworkRequest,
  output: UpdateNetworkResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNetwork",
}));

export type UpdateNodeError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Change the settings for a Node.
 */
export const updateNode: API.OperationMethod<
  UpdateNodeRequest,
  UpdateNodeResponse,
  UpdateNodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNodeRequest,
  output: UpdateNodeResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNode",
}));

export type UpdateNodeStateError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | UnprocessableEntityException
  | CommonErrors;
/**
 * Update the state of a node.
 */
export const updateNodeState: API.OperationMethod<
  UpdateNodeStateRequest,
  UpdateNodeStateResponse,
  UpdateNodeStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateNodeStateRequest,
  output: UpdateNodeStateResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
    UnprocessableEntityException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNodeState",
}));

export type UpdateReservationError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Update reservation.
 */
export const updateReservation: API.OperationMethod<
  UpdateReservationRequest,
  UpdateReservationResponse,
  UpdateReservationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateReservationRequest,
  output: UpdateReservationResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateReservation",
}));

export type UpdateSdiSourceError =
  | BadGatewayException
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | GatewayTimeoutException
  | InternalServerErrorException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Change some of the settings in an SdiSource.
 */
export const updateSdiSource: API.OperationMethod<
  UpdateSdiSourceRequest,
  UpdateSdiSourceResponse,
  UpdateSdiSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateSdiSourceRequest,
  output: UpdateSdiSourceResponse,
  errors: [
    BadGatewayException,
    BadRequestException,
    ConflictException,
    ForbiddenException,
    GatewayTimeoutException,
    InternalServerErrorException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSdiSource",
}));
