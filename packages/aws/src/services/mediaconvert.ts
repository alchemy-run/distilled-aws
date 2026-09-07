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
  sdkId: "MediaConvert",
  serviceShapeName: "MediaConvert",
});
const auth = T.AwsAuthSigv4({ name: "mediaconvert" });
const ver = T.ServiceVersion("2017-08-29");
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
              `https://mediaconvert-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://mediaconvert.${Region}.amazonaws.com`);
            }
            return e(
              `https://mediaconvert-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://mediaconvert.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        if (Region === "cn-northwest-1") {
          return e(
            "https://subscribe.mediaconvert.cn-northwest-1.amazonaws.com.cn",
          );
        }
        return e(
          `https://mediaconvert.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: S.optional(S.String).pipe(T.ErrorMessage()) },
    T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export interface AssociateCertificateRequest {
  Arn?: string;
}
export const AssociateCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String) })
    .pipe(S.encodeKeys({ Arn: "arn" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/2017-08-29/certificates" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "AssociateCertificateRequest",
}) as any as S.Schema<AssociateCertificateRequest>;
export interface AssociateCertificateResponse {}
export const AssociateCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "AssociateCertificateResponse",
}) as any as S.Schema<AssociateCertificateResponse>;
export interface CancelJobRequest {
  Id: string;
}
export const CancelJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/2017-08-29/jobs/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelJobRequest",
}) as any as S.Schema<CancelJobRequest>;
export interface CancelJobResponse {}
export const CancelJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CancelJobResponse",
}) as any as S.Schema<CancelJobResponse>;
export type AccelerationMode =
  | "DISABLED"
  | "ENABLED"
  | "PREFERRED"
  | (string & {});
export const AccelerationMode = S.String;

export interface AccelerationSettings {
  Mode?: AccelerationMode;
}
export const AccelerationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Mode: S.optional(AccelerationMode) }).pipe(
    S.encodeKeys({ Mode: "mode" }),
  ),
).annotate({
  identifier: "AccelerationSettings",
}) as any as S.Schema<AccelerationSettings>;
export type BillingTagsSource =
  | "QUEUE"
  | "PRESET"
  | "JOB_TEMPLATE"
  | "JOB"
  | (string & {});
export const BillingTagsSource = S.String;

export type __integerMinNegative50Max50 = number;
export interface HopDestination {
  Priority?: number;
  Queue?: string;
  WaitMinutes?: number;
}
export const HopDestination = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Priority: S.optional(S.Number),
    Queue: S.optional(S.String),
    WaitMinutes: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Priority: "priority",
      Queue: "queue",
      WaitMinutes: "waitMinutes",
    }),
  ),
).annotate({ identifier: "HopDestination" }) as any as S.Schema<HopDestination>;
export type __listOfHopDestination = HopDestination[];
export const __listOfHopDestination = /*@__PURE__*/ S.Array(HopDestination);
export type __integerMinNegative1000Max1000 = number;
export type __stringMin14PatternS3BmpBMPPngPNGHttpsBmpBMPPngPNG = string;
export interface AvailBlanking {
  AvailBlankingImage?: string;
}
export const AvailBlanking = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AvailBlankingImage: S.optional(S.String) }).pipe(
    S.encodeKeys({ AvailBlankingImage: "availBlankingImage" }),
  ),
).annotate({ identifier: "AvailBlanking" }) as any as S.Schema<AvailBlanking>;
export type __stringMin14PatternS3CubeCUBEHttpsCubeCUBE = string;
export type ColorSpace =
  | "FOLLOW"
  | "REC_601"
  | "REC_709"
  | "HDR10"
  | "HLG_2020"
  | "P3DCI"
  | "P3D65_SDR"
  | "P3D65_HDR"
  | (string & {});
export const ColorSpace = S.String;

export type __integerMin0Max2147483647 = number;
export interface ColorConversion3DLUTSetting {
  FileInput?: string;
  InputColorSpace?: ColorSpace;
  InputMasteringLuminance?: number;
  OutputColorSpace?: ColorSpace;
  OutputMasteringLuminance?: number;
}
export const ColorConversion3DLUTSetting = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FileInput: S.optional(S.String),
    InputColorSpace: S.optional(ColorSpace),
    InputMasteringLuminance: S.optional(S.Number),
    OutputColorSpace: S.optional(ColorSpace),
    OutputMasteringLuminance: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      FileInput: "fileInput",
      InputColorSpace: "inputColorSpace",
      InputMasteringLuminance: "inputMasteringLuminance",
      OutputColorSpace: "outputColorSpace",
      OutputMasteringLuminance: "outputMasteringLuminance",
    }),
  ),
).annotate({
  identifier: "ColorConversion3DLUTSetting",
}) as any as S.Schema<ColorConversion3DLUTSetting>;
export type __listOfColorConversion3DLUTSetting = ColorConversion3DLUTSetting[];
export const __listOfColorConversion3DLUTSetting = /*@__PURE__*/ S.Array(
  ColorConversion3DLUTSetting,
);
export type __stringPatternSNManifestConfirmConditionNotificationNS = string;
export interface EsamManifestConfirmConditionNotification {
  MccXml?: string;
}
export const EsamManifestConfirmConditionNotification = /*@__PURE__*/ S.suspend(
  () =>
    S.Struct({ MccXml: S.optional(S.String) }).pipe(
      S.encodeKeys({ MccXml: "mccXml" }),
    ),
).annotate({
  identifier: "EsamManifestConfirmConditionNotification",
}) as any as S.Schema<EsamManifestConfirmConditionNotification>;
export type __integerMin0Max30000 = number;
export type __stringPatternSNSignalProcessingNotificationNS = string;
export interface EsamSignalProcessingNotification {
  SccXml?: string;
}
export const EsamSignalProcessingNotification = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SccXml: S.optional(S.String) }).pipe(
    S.encodeKeys({ SccXml: "sccXml" }),
  ),
).annotate({
  identifier: "EsamSignalProcessingNotification",
}) as any as S.Schema<EsamSignalProcessingNotification>;
export interface EsamSettings {
  ManifestConfirmConditionNotification?: EsamManifestConfirmConditionNotification;
  ResponseSignalPreroll?: number;
  SignalProcessingNotification?: EsamSignalProcessingNotification;
}
export const EsamSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestConfirmConditionNotification: S.optional(
      EsamManifestConfirmConditionNotification,
    ),
    ResponseSignalPreroll: S.optional(S.Number),
    SignalProcessingNotification: S.optional(EsamSignalProcessingNotification),
  }).pipe(
    S.encodeKeys({
      ManifestConfirmConditionNotification:
        "manifestConfirmConditionNotification",
      ResponseSignalPreroll: "responseSignalPreroll",
      SignalProcessingNotification: "signalProcessingNotification",
    }),
  ),
).annotate({ identifier: "EsamSettings" }) as any as S.Schema<EsamSettings>;
export type CopyProtectionAction = "PASSTHROUGH" | "STRIP" | (string & {});
export const CopyProtectionAction = S.String;

export type VchipAction = "PASSTHROUGH" | "STRIP" | (string & {});
export const VchipAction = S.String;

export interface ExtendedDataServices {
  CopyProtectionAction?: CopyProtectionAction;
  VchipAction?: VchipAction;
}
export const ExtendedDataServices = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CopyProtectionAction: S.optional(CopyProtectionAction),
    VchipAction: S.optional(VchipAction),
  }).pipe(
    S.encodeKeys({
      CopyProtectionAction: "copyProtectionAction",
      VchipAction: "vchipAction",
    }),
  ),
).annotate({
  identifier: "ExtendedDataServices",
}) as any as S.Schema<ExtendedDataServices>;
export type __integerMin1Max150 = number;
export type AdvancedInputFilter = "ENABLED" | "DISABLED" | (string & {});
export const AdvancedInputFilter = S.String;

export type AdvancedInputFilterAddTexture =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const AdvancedInputFilterAddTexture = S.String;

export type AdvancedInputFilterSharpen = "OFF" | "LOW" | "HIGH" | (string & {});
export const AdvancedInputFilterSharpen = S.String;

export interface AdvancedInputFilterSettings {
  AddTexture?: AdvancedInputFilterAddTexture;
  Sharpening?: AdvancedInputFilterSharpen;
}
export const AdvancedInputFilterSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AddTexture: S.optional(AdvancedInputFilterAddTexture),
    Sharpening: S.optional(AdvancedInputFilterSharpen),
  }).pipe(S.encodeKeys({ AddTexture: "addTexture", Sharpening: "sharpening" })),
).annotate({
  identifier: "AdvancedInputFilterSettings",
}) as any as S.Schema<AdvancedInputFilterSettings>;
export type __stringMin1 = string;
export type __listOf__stringMin1 = string[];
export const __listOf__stringMin1 = /*@__PURE__*/ S.Array(S.String);
export interface AudioSelectorGroup {
  AudioSelectorNames?: string[];
}
export const AudioSelectorGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AudioSelectorNames: S.optional(__listOf__stringMin1) }).pipe(
    S.encodeKeys({ AudioSelectorNames: "audioSelectorNames" }),
  ),
).annotate({
  identifier: "AudioSelectorGroup",
}) as any as S.Schema<AudioSelectorGroup>;
export type __mapOfAudioSelectorGroup = {
  [key: string]: AudioSelectorGroup | undefined;
};
export const __mapOfAudioSelectorGroup = /*@__PURE__*/ S.Record(
  S.String,
  AudioSelectorGroup.pipe(S.optional),
);
export type AudioDurationCorrection =
  | "DISABLED"
  | "AUTO"
  | "TRACK"
  | "FRAME"
  | "FORCE"
  | (string & {});
export const AudioDurationCorrection = S.String;

export type __stringMin3Max3PatternAZaZ3 = string;
export type AudioDefaultSelection = "DEFAULT" | "NOT_DEFAULT" | (string & {});
export const AudioDefaultSelection = S.String;

export type __stringPatternS3Https = string;
export type LanguageCode =
  | "ENG"
  | "SPA"
  | "FRA"
  | "DEU"
  | "GER"
  | "ZHO"
  | "ARA"
  | "HIN"
  | "JPN"
  | "RUS"
  | "POR"
  | "ITA"
  | "URD"
  | "VIE"
  | "KOR"
  | "PAN"
  | "ABK"
  | "AAR"
  | "AFR"
  | "AKA"
  | "SQI"
  | "AMH"
  | "ARG"
  | "HYE"
  | "ASM"
  | "AVA"
  | "AVE"
  | "AYM"
  | "AZE"
  | "BAM"
  | "BAK"
  | "EUS"
  | "BEL"
  | "BEN"
  | "BIH"
  | "BIS"
  | "BOS"
  | "BRE"
  | "BUL"
  | "MYA"
  | "CAT"
  | "KHM"
  | "CHA"
  | "CHE"
  | "NYA"
  | "CHU"
  | "CHV"
  | "COR"
  | "COS"
  | "CRE"
  | "HRV"
  | "CES"
  | "DAN"
  | "DIV"
  | "NLD"
  | "DZO"
  | "ENM"
  | "EPO"
  | "EST"
  | "EWE"
  | "FAO"
  | "FIJ"
  | "FIN"
  | "FRM"
  | "FUL"
  | "GLA"
  | "GLG"
  | "LUG"
  | "KAT"
  | "ELL"
  | "GRN"
  | "GUJ"
  | "HAT"
  | "HAU"
  | "HEB"
  | "HER"
  | "HMO"
  | "HUN"
  | "ISL"
  | "IDO"
  | "IBO"
  | "IND"
  | "INA"
  | "ILE"
  | "IKU"
  | "IPK"
  | "GLE"
  | "JAV"
  | "KAL"
  | "KAN"
  | "KAU"
  | "KAS"
  | "KAZ"
  | "KIK"
  | "KIN"
  | "KIR"
  | "KOM"
  | "KON"
  | "KUA"
  | "KUR"
  | "LAO"
  | "LAT"
  | "LAV"
  | "LIM"
  | "LIN"
  | "LIT"
  | "LUB"
  | "LTZ"
  | "MKD"
  | "MLG"
  | "MSA"
  | "MAL"
  | "MLT"
  | "GLV"
  | "MRI"
  | "MAR"
  | "MAH"
  | "MON"
  | "NAU"
  | "NAV"
  | "NDE"
  | "NBL"
  | "NDO"
  | "NEP"
  | "SME"
  | "NOR"
  | "NOB"
  | "NNO"
  | "OCI"
  | "OJI"
  | "ORI"
  | "ORM"
  | "OSS"
  | "PLI"
  | "FAS"
  | "POL"
  | "PUS"
  | "QUE"
  | "QAA"
  | "RON"
  | "ROH"
  | "RUN"
  | "SMO"
  | "SAG"
  | "SAN"
  | "SRD"
  | "SRB"
  | "SNA"
  | "III"
  | "SND"
  | "SIN"
  | "SLK"
  | "SLV"
  | "SOM"
  | "SOT"
  | "SUN"
  | "SWA"
  | "SSW"
  | "SWE"
  | "TGL"
  | "TAH"
  | "TGK"
  | "TAM"
  | "TAT"
  | "TEL"
  | "THA"
  | "BOD"
  | "TIR"
  | "TON"
  | "TSO"
  | "TSN"
  | "TUR"
  | "TUK"
  | "TWI"
  | "UIG"
  | "UKR"
  | "UZB"
  | "VEN"
  | "VOL"
  | "WLN"
  | "CYM"
  | "FRY"
  | "WOL"
  | "XHO"
  | "YID"
  | "YOR"
  | "ZHA"
  | "ZUL"
  | "ORJ"
  | "QPC"
  | "TNG"
  | "SRP"
  | (string & {});
export const LanguageCode = S.String;

export interface HlsRenditionGroupSettings {
  RenditionGroupId?: string;
  RenditionLanguageCode?: LanguageCode;
  RenditionName?: string;
}
export const HlsRenditionGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RenditionGroupId: S.optional(S.String),
    RenditionLanguageCode: S.optional(LanguageCode),
    RenditionName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      RenditionGroupId: "renditionGroupId",
      RenditionLanguageCode: "renditionLanguageCode",
      RenditionName: "renditionName",
    }),
  ),
).annotate({
  identifier: "HlsRenditionGroupSettings",
}) as any as S.Schema<HlsRenditionGroupSettings>;
export type __integerMinNegative2147483648Max2147483647 = number;
export type __integerMin1Max2147483647 = number;
export type __listOf__integerMin1Max2147483647 = number[];
export const __listOf__integerMin1Max2147483647 = /*@__PURE__*/ S.Array(
  S.Number,
);
export type __integerMin0Max8 = number;
export type __integerMin1Max64 = number;
export type __integerMinNegative60Max6 = number;
export type __listOf__integerMinNegative60Max6 = number[];
export const __listOf__integerMinNegative60Max6 = /*@__PURE__*/ S.Array(
  S.Number,
);
export type __doubleMinNegative60Max6 = number;
export type __listOf__doubleMinNegative60Max6 = number[];
export const __listOf__doubleMinNegative60Max6 = /*@__PURE__*/ S.Array(
  S.Number,
);
export interface OutputChannelMapping {
  InputChannels?: number[];
  InputChannelsFineTune?: number[];
}
export const OutputChannelMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputChannels: S.optional(__listOf__integerMinNegative60Max6),
    InputChannelsFineTune: S.optional(__listOf__doubleMinNegative60Max6),
  }).pipe(
    S.encodeKeys({
      InputChannels: "inputChannels",
      InputChannelsFineTune: "inputChannelsFineTune",
    }),
  ),
).annotate({
  identifier: "OutputChannelMapping",
}) as any as S.Schema<OutputChannelMapping>;
export type __listOfOutputChannelMapping = OutputChannelMapping[];
export const __listOfOutputChannelMapping =
  /*@__PURE__*/ S.Array(OutputChannelMapping);
export interface ChannelMapping {
  OutputChannels?: OutputChannelMapping[];
}
export const ChannelMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OutputChannels: S.optional(__listOfOutputChannelMapping) }).pipe(
    S.encodeKeys({ OutputChannels: "outputChannels" }),
  ),
).annotate({ identifier: "ChannelMapping" }) as any as S.Schema<ChannelMapping>;
export interface RemixSettings {
  AudioDescriptionAudioChannel?: number;
  AudioDescriptionDataChannel?: number;
  ChannelMapping?: ChannelMapping;
  ChannelsIn?: number;
  ChannelsOut?: number;
}
export const RemixSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDescriptionAudioChannel: S.optional(S.Number),
    AudioDescriptionDataChannel: S.optional(S.Number),
    ChannelMapping: S.optional(ChannelMapping),
    ChannelsIn: S.optional(S.Number),
    ChannelsOut: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AudioDescriptionAudioChannel: "audioDescriptionAudioChannel",
      AudioDescriptionDataChannel: "audioDescriptionDataChannel",
      ChannelMapping: "channelMapping",
      ChannelsIn: "channelsIn",
      ChannelsOut: "channelsOut",
    }),
  ),
).annotate({ identifier: "RemixSettings" }) as any as S.Schema<RemixSettings>;
export type AudioSelectorType =
  | "PID"
  | "TRACK"
  | "LANGUAGE_CODE"
  | "HLS_RENDITION_GROUP"
  | "ALL_PCM"
  | "STREAM"
  | (string & {});
export const AudioSelectorType = S.String;

export interface AudioSelector {
  AudioDurationCorrection?: AudioDurationCorrection;
  CustomLanguageCode?: string;
  DefaultSelection?: AudioDefaultSelection;
  ExternalAudioFileInput?: string;
  HlsRenditionGroupSettings?: HlsRenditionGroupSettings;
  LanguageCode?: LanguageCode;
  Offset?: number;
  Pids?: number[];
  ProgramSelection?: number;
  RemixSettings?: RemixSettings;
  SelectorType?: AudioSelectorType;
  Streams?: number[];
  Tracks?: number[];
}
export const AudioSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDurationCorrection: S.optional(AudioDurationCorrection),
    CustomLanguageCode: S.optional(S.String),
    DefaultSelection: S.optional(AudioDefaultSelection),
    ExternalAudioFileInput: S.optional(S.String),
    HlsRenditionGroupSettings: S.optional(HlsRenditionGroupSettings),
    LanguageCode: S.optional(LanguageCode),
    Offset: S.optional(S.Number),
    Pids: S.optional(__listOf__integerMin1Max2147483647),
    ProgramSelection: S.optional(S.Number),
    RemixSettings: S.optional(RemixSettings),
    SelectorType: S.optional(AudioSelectorType),
    Streams: S.optional(__listOf__integerMin1Max2147483647),
    Tracks: S.optional(__listOf__integerMin1Max2147483647),
  }).pipe(
    S.encodeKeys({
      AudioDurationCorrection: "audioDurationCorrection",
      CustomLanguageCode: "customLanguageCode",
      DefaultSelection: "defaultSelection",
      ExternalAudioFileInput: "externalAudioFileInput",
      HlsRenditionGroupSettings: "hlsRenditionGroupSettings",
      LanguageCode: "languageCode",
      Offset: "offset",
      Pids: "pids",
      ProgramSelection: "programSelection",
      RemixSettings: "remixSettings",
      SelectorType: "selectorType",
      Streams: "streams",
      Tracks: "tracks",
    }),
  ),
).annotate({ identifier: "AudioSelector" }) as any as S.Schema<AudioSelector>;
export type __mapOfAudioSelector = { [key: string]: AudioSelector | undefined };
export const __mapOfAudioSelector = /*@__PURE__*/ S.Record(
  S.String,
  AudioSelector.pipe(S.optional),
);
export type AncillaryConvert608To708 = "UPCONVERT" | "DISABLED" | (string & {});
export const AncillaryConvert608To708 = S.String;

export type __integerMin1Max4 = number;
export type AncillaryTerminateCaptions =
  | "END_OF_INPUT"
  | "DISABLED"
  | (string & {});
export const AncillaryTerminateCaptions = S.String;

export interface AncillarySourceSettings {
  Convert608To708?: AncillaryConvert608To708;
  SourceAncillaryChannelNumber?: number;
  TerminateCaptions?: AncillaryTerminateCaptions;
}
export const AncillarySourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Convert608To708: S.optional(AncillaryConvert608To708),
    SourceAncillaryChannelNumber: S.optional(S.Number),
    TerminateCaptions: S.optional(AncillaryTerminateCaptions),
  }).pipe(
    S.encodeKeys({
      Convert608To708: "convert608To708",
      SourceAncillaryChannelNumber: "sourceAncillaryChannelNumber",
      TerminateCaptions: "terminateCaptions",
    }),
  ),
).annotate({
  identifier: "AncillarySourceSettings",
}) as any as S.Schema<AncillarySourceSettings>;
export interface DvbSubSourceSettings {
  Pid?: number;
}
export const DvbSubSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Pid: S.optional(S.Number) }).pipe(S.encodeKeys({ Pid: "pid" })),
).annotate({
  identifier: "DvbSubSourceSettings",
}) as any as S.Schema<DvbSubSourceSettings>;
export type EmbeddedConvert608To708 = "UPCONVERT" | "DISABLED" | (string & {});
export const EmbeddedConvert608To708 = S.String;

export type __integerMin1Max1 = number;
export type EmbeddedTerminateCaptions =
  | "END_OF_INPUT"
  | "DISABLED"
  | (string & {});
export const EmbeddedTerminateCaptions = S.String;

export interface EmbeddedSourceSettings {
  Convert608To708?: EmbeddedConvert608To708;
  Source608ChannelNumber?: number;
  Source608TrackNumber?: number;
  TerminateCaptions?: EmbeddedTerminateCaptions;
}
export const EmbeddedSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Convert608To708: S.optional(EmbeddedConvert608To708),
    Source608ChannelNumber: S.optional(S.Number),
    Source608TrackNumber: S.optional(S.Number),
    TerminateCaptions: S.optional(EmbeddedTerminateCaptions),
  }).pipe(
    S.encodeKeys({
      Convert608To708: "convert608To708",
      Source608ChannelNumber: "source608ChannelNumber",
      Source608TrackNumber: "source608TrackNumber",
      TerminateCaptions: "terminateCaptions",
    }),
  ),
).annotate({
  identifier: "EmbeddedSourceSettings",
}) as any as S.Schema<EmbeddedSourceSettings>;
export type CaptionSourceByteRateLimit = "ENABLED" | "DISABLED" | (string & {});
export const CaptionSourceByteRateLimit = S.String;

export type FileSourceConvert608To708 =
  | "UPCONVERT"
  | "DISABLED"
  | (string & {});
export const FileSourceConvert608To708 = S.String;

export type CaptionSourceConvertPaintOnToPopOn =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const CaptionSourceConvertPaintOnToPopOn = S.String;

export type __integerMin1Max1001 = number;
export type __integerMin1Max60000 = number;
export interface CaptionSourceFramerate {
  FramerateDenominator?: number;
  FramerateNumerator?: number;
}
export const CaptionSourceFramerate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
    }),
  ),
).annotate({
  identifier: "CaptionSourceFramerate",
}) as any as S.Schema<CaptionSourceFramerate>;
export type __stringMin14PatternS3SccSCCTtmlTTMLDfxpDFXPStlSTLSrtSRTXmlXMLSmiSMIVttVTTWebvttWEBVTTHttpsSccSCCTtmlTTMLDfxpDFXPStlSTLSrtSRTXmlXMLSmiSMIVttVTTWebvttWEBVTT =
  string;
export type FileSourceTimeDeltaUnits =
  | "SECONDS"
  | "MILLISECONDS"
  | (string & {});
export const FileSourceTimeDeltaUnits = S.String;

export type CaptionSourceUpconvertSTLToTeletext =
  | "UPCONVERT"
  | "DISABLED"
  | (string & {});
export const CaptionSourceUpconvertSTLToTeletext = S.String;

export interface FileSourceSettings {
  ByteRateLimit?: CaptionSourceByteRateLimit;
  Convert608To708?: FileSourceConvert608To708;
  ConvertPaintToPop?: CaptionSourceConvertPaintOnToPopOn;
  Framerate?: CaptionSourceFramerate;
  SourceFile?: string;
  TimeDelta?: number;
  TimeDeltaUnits?: FileSourceTimeDeltaUnits;
  UpconvertSTLToTeletext?: CaptionSourceUpconvertSTLToTeletext;
}
export const FileSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ByteRateLimit: S.optional(CaptionSourceByteRateLimit),
    Convert608To708: S.optional(FileSourceConvert608To708),
    ConvertPaintToPop: S.optional(CaptionSourceConvertPaintOnToPopOn),
    Framerate: S.optional(CaptionSourceFramerate),
    SourceFile: S.optional(S.String),
    TimeDelta: S.optional(S.Number),
    TimeDeltaUnits: S.optional(FileSourceTimeDeltaUnits),
    UpconvertSTLToTeletext: S.optional(CaptionSourceUpconvertSTLToTeletext),
  }).pipe(
    S.encodeKeys({
      ByteRateLimit: "byteRateLimit",
      Convert608To708: "convert608To708",
      ConvertPaintToPop: "convertPaintToPop",
      Framerate: "framerate",
      SourceFile: "sourceFile",
      TimeDelta: "timeDelta",
      TimeDeltaUnits: "timeDeltaUnits",
      UpconvertSTLToTeletext: "upconvertSTLToTeletext",
    }),
  ),
).annotate({
  identifier: "FileSourceSettings",
}) as any as S.Schema<FileSourceSettings>;
export type CaptionSourceType =
  | "ANCILLARY"
  | "DVB_SUB"
  | "EMBEDDED"
  | "SCTE20"
  | "SCC"
  | "TTML"
  | "STL"
  | "SRT"
  | "SMI"
  | "SMPTE_TT"
  | "TELETEXT"
  | "NULL_SOURCE"
  | "IMSC"
  | "WEBVTT"
  | "TT_3GPP"
  | (string & {});
export const CaptionSourceType = S.String;

export type __stringMin3Max3Pattern1809aFAF09aEAE = string;
export interface TeletextSourceSettings {
  PageNumber?: string;
}
export const TeletextSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ PageNumber: S.optional(S.String) }).pipe(
    S.encodeKeys({ PageNumber: "pageNumber" }),
  ),
).annotate({
  identifier: "TeletextSourceSettings",
}) as any as S.Schema<TeletextSourceSettings>;
export interface TrackSourceSettings {
  StreamNumber?: number;
  TrackNumber?: number;
}
export const TrackSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    StreamNumber: S.optional(S.Number),
    TrackNumber: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({ StreamNumber: "streamNumber", TrackNumber: "trackNumber" }),
  ),
).annotate({
  identifier: "TrackSourceSettings",
}) as any as S.Schema<TrackSourceSettings>;
export interface WebvttHlsSourceSettings {
  RenditionGroupId?: string;
  RenditionLanguageCode?: LanguageCode;
  RenditionName?: string;
}
export const WebvttHlsSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    RenditionGroupId: S.optional(S.String),
    RenditionLanguageCode: S.optional(LanguageCode),
    RenditionName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      RenditionGroupId: "renditionGroupId",
      RenditionLanguageCode: "renditionLanguageCode",
      RenditionName: "renditionName",
    }),
  ),
).annotate({
  identifier: "WebvttHlsSourceSettings",
}) as any as S.Schema<WebvttHlsSourceSettings>;
export interface CaptionSourceSettings {
  AncillarySourceSettings?: AncillarySourceSettings;
  DvbSubSourceSettings?: DvbSubSourceSettings;
  EmbeddedSourceSettings?: EmbeddedSourceSettings;
  FileSourceSettings?: FileSourceSettings;
  SourceType?: CaptionSourceType;
  TeletextSourceSettings?: TeletextSourceSettings;
  TrackSourceSettings?: TrackSourceSettings;
  WebvttHlsSourceSettings?: WebvttHlsSourceSettings;
}
export const CaptionSourceSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AncillarySourceSettings: S.optional(AncillarySourceSettings),
    DvbSubSourceSettings: S.optional(DvbSubSourceSettings),
    EmbeddedSourceSettings: S.optional(EmbeddedSourceSettings),
    FileSourceSettings: S.optional(FileSourceSettings),
    SourceType: S.optional(CaptionSourceType),
    TeletextSourceSettings: S.optional(TeletextSourceSettings),
    TrackSourceSettings: S.optional(TrackSourceSettings),
    WebvttHlsSourceSettings: S.optional(WebvttHlsSourceSettings),
  }).pipe(
    S.encodeKeys({
      AncillarySourceSettings: "ancillarySourceSettings",
      DvbSubSourceSettings: "dvbSubSourceSettings",
      EmbeddedSourceSettings: "embeddedSourceSettings",
      FileSourceSettings: "fileSourceSettings",
      SourceType: "sourceType",
      TeletextSourceSettings: "teletextSourceSettings",
      TrackSourceSettings: "trackSourceSettings",
      WebvttHlsSourceSettings: "webvttHlsSourceSettings",
    }),
  ),
).annotate({
  identifier: "CaptionSourceSettings",
}) as any as S.Schema<CaptionSourceSettings>;
export interface CaptionSelector {
  CustomLanguageCode?: string;
  LanguageCode?: LanguageCode;
  SourceSettings?: CaptionSourceSettings;
}
export const CaptionSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomLanguageCode: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    SourceSettings: S.optional(CaptionSourceSettings),
  }).pipe(
    S.encodeKeys({
      CustomLanguageCode: "customLanguageCode",
      LanguageCode: "languageCode",
      SourceSettings: "sourceSettings",
    }),
  ),
).annotate({
  identifier: "CaptionSelector",
}) as any as S.Schema<CaptionSelector>;
export type __mapOfCaptionSelector = {
  [key: string]: CaptionSelector | undefined;
};
export const __mapOfCaptionSelector = /*@__PURE__*/ S.Record(
  S.String,
  CaptionSelector.pipe(S.optional),
);
export type __integerMin2Max2147483647 = number;
export interface Rectangle {
  Height?: number;
  Width?: number;
  X?: number;
  Y?: number;
}
export const Rectangle = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Height: S.optional(S.Number),
    Width: S.optional(S.Number),
    X: S.optional(S.Number),
    Y: S.optional(S.Number),
  }).pipe(S.encodeKeys({ Height: "height", Width: "width", X: "x", Y: "y" })),
).annotate({ identifier: "Rectangle" }) as any as S.Schema<Rectangle>;
export type InputDeblockFilter = "ENABLED" | "DISABLED" | (string & {});
export const InputDeblockFilter = S.String;

export type DecryptionMode = "AES_CTR" | "AES_CBC" | "AES_GCM" | (string & {});
export const DecryptionMode = S.String;

export type __stringMin24Max512PatternAZaZ0902 = string;
export type __stringMin16Max24PatternAZaZ0922AZaZ0916 = string;
export type __stringMin9Max19PatternAZ26EastWestCentralNorthSouthEastWest1912 =
  string;
export interface InputDecryptionSettings {
  DecryptionMode?: DecryptionMode;
  EncryptedDecryptionKey?: string;
  InitializationVector?: string;
  KmsKeyRegion?: string;
}
export const InputDecryptionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DecryptionMode: S.optional(DecryptionMode),
    EncryptedDecryptionKey: S.optional(S.String),
    InitializationVector: S.optional(S.String),
    KmsKeyRegion: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      DecryptionMode: "decryptionMode",
      EncryptedDecryptionKey: "encryptedDecryptionKey",
      InitializationVector: "initializationVector",
      KmsKeyRegion: "kmsKeyRegion",
    }),
  ),
).annotate({
  identifier: "InputDecryptionSettings",
}) as any as S.Schema<InputDecryptionSettings>;
export type InputDenoiseFilter = "ENABLED" | "DISABLED" | (string & {});
export const InputDenoiseFilter = S.String;

export type __stringMin14PatternS3XmlXMLHttpsXmlXML = string;
export type DynamicAudioSelectorType =
  | "ALL_TRACKS"
  | "LANGUAGE_CODE"
  | (string & {});
export const DynamicAudioSelectorType = S.String;

export interface DynamicAudioSelector {
  AudioDurationCorrection?: AudioDurationCorrection;
  ExternalAudioFileInput?: string;
  LanguageCode?: LanguageCode;
  Offset?: number;
  SelectorType?: DynamicAudioSelectorType;
}
export const DynamicAudioSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDurationCorrection: S.optional(AudioDurationCorrection),
    ExternalAudioFileInput: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    Offset: S.optional(S.Number),
    SelectorType: S.optional(DynamicAudioSelectorType),
  }).pipe(
    S.encodeKeys({
      AudioDurationCorrection: "audioDurationCorrection",
      ExternalAudioFileInput: "externalAudioFileInput",
      LanguageCode: "languageCode",
      Offset: "offset",
      SelectorType: "selectorType",
    }),
  ),
).annotate({
  identifier: "DynamicAudioSelector",
}) as any as S.Schema<DynamicAudioSelector>;
export type __mapOfDynamicAudioSelector = {
  [key: string]: DynamicAudioSelector | undefined;
};
export const __mapOfDynamicAudioSelector = /*@__PURE__*/ S.Record(
  S.String,
  DynamicAudioSelector.pipe(S.optional),
);
export type __stringMax2048PatternS3Https = string;
export type InputFilterEnable = "AUTO" | "DISABLE" | "FORCE" | (string & {});
export const InputFilterEnable = S.String;

export type __integerMin0Max5 = number;
export type __stringMin14PatternS3BmpBMPPngPNGTgaTGAHttpsBmpBMPPngPNGTgaTGA =
  string;
export type __integerMin0Max99 = number;
export type __integerMin0Max100 = number;
export type __stringPattern01D20305D205D = string;
export interface InsertableImage {
  Duration?: number;
  FadeIn?: number;
  FadeOut?: number;
  Height?: number;
  ImageInserterInput?: string;
  ImageX?: number;
  ImageY?: number;
  Layer?: number;
  Opacity?: number;
  StartTime?: string;
  Width?: number;
}
export const InsertableImage = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Duration: S.optional(S.Number),
    FadeIn: S.optional(S.Number),
    FadeOut: S.optional(S.Number),
    Height: S.optional(S.Number),
    ImageInserterInput: S.optional(S.String),
    ImageX: S.optional(S.Number),
    ImageY: S.optional(S.Number),
    Layer: S.optional(S.Number),
    Opacity: S.optional(S.Number),
    StartTime: S.optional(S.String),
    Width: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Duration: "duration",
      FadeIn: "fadeIn",
      FadeOut: "fadeOut",
      Height: "height",
      ImageInserterInput: "imageInserterInput",
      ImageX: "imageX",
      ImageY: "imageY",
      Layer: "layer",
      Opacity: "opacity",
      StartTime: "startTime",
      Width: "width",
    }),
  ),
).annotate({
  identifier: "InsertableImage",
}) as any as S.Schema<InsertableImage>;
export type __listOfInsertableImage = InsertableImage[];
export const __listOfInsertableImage = /*@__PURE__*/ S.Array(InsertableImage);
export type __integerMin100Max1000 = number;
export interface ImageInserter {
  InsertableImages?: InsertableImage[];
  SdrReferenceWhiteLevel?: number;
}
export const ImageInserter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InsertableImages: S.optional(__listOfInsertableImage),
    SdrReferenceWhiteLevel: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      InsertableImages: "insertableImages",
      SdrReferenceWhiteLevel: "sdrReferenceWhiteLevel",
    }),
  ),
).annotate({ identifier: "ImageInserter" }) as any as S.Schema<ImageInserter>;
export type __stringPattern010920405090509092090909 = string;
export interface InputClipping {
  EndTimecode?: string;
  StartTimecode?: string;
}
export const InputClipping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndTimecode: S.optional(S.String),
    StartTimecode: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      EndTimecode: "endTimecode",
      StartTimecode: "startTimecode",
    }),
  ),
).annotate({ identifier: "InputClipping" }) as any as S.Schema<InputClipping>;
export type __listOfInputClipping = InputClipping[];
export const __listOfInputClipping = /*@__PURE__*/ S.Array(InputClipping);
export type InputScanType = "AUTO" | "PSF" | (string & {});
export const InputScanType = S.String;

export interface MultiViewInput {
  FileInput?: string;
}
export const MultiViewInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileInput: S.optional(S.String) }).pipe(
    S.encodeKeys({ FileInput: "fileInput" }),
  ),
).annotate({ identifier: "MultiViewInput" }) as any as S.Schema<MultiViewInput>;
export interface MultiViewSettings {
  Input?: MultiViewInput;
}
export const MultiViewSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Input: S.optional(MultiViewInput) }).pipe(
    S.encodeKeys({ Input: "input" }),
  ),
).annotate({
  identifier: "MultiViewSettings",
}) as any as S.Schema<MultiViewSettings>;
export type __listOfMultiViewSettings = MultiViewSettings[];
export const __listOfMultiViewSettings =
  /*@__PURE__*/ S.Array(MultiViewSettings);
export type InputPsiControl = "IGNORE_PSI" | "USE_PSI" | (string & {});
export const InputPsiControl = S.String;

export type __stringPatternS3ASSETMAPXml = string;
export type __listOf__stringPatternS3ASSETMAPXml = string[];
export const __listOf__stringPatternS3ASSETMAPXml = /*@__PURE__*/ S.Array(
  S.String,
);
export type __stringPatternArnAwsAZ09EventsAZ090912ConnectionAZAZ09AF0936 =
  string;
export type TamsGapHandling =
  | "SKIP_GAPS"
  | "FILL_WITH_BLACK"
  | "HOLD_LAST_FRAME"
  | (string & {});
export const TamsGapHandling = S.String;

export type __stringPattern019090190908019090190908 = string;
export interface InputTamsSettings {
  AuthConnectionArn?: string;
  GapHandling?: TamsGapHandling;
  SourceId?: string;
  Timerange?: string;
}
export const InputTamsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AuthConnectionArn: S.optional(S.String),
    GapHandling: S.optional(TamsGapHandling),
    SourceId: S.optional(S.String),
    Timerange: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AuthConnectionArn: "authConnectionArn",
      GapHandling: "gapHandling",
      SourceId: "sourceId",
      Timerange: "timerange",
    }),
  ),
).annotate({
  identifier: "InputTamsSettings",
}) as any as S.Schema<InputTamsSettings>;
export type InputTimecodeSource =
  | "EMBEDDED"
  | "ZEROBASED"
  | "SPECIFIEDSTART"
  | (string & {});
export const InputTimecodeSource = S.String;

export type __stringMin11Max11Pattern01D20305D205D = string;
export type __integerMin1Max32 = number;
export type __integerMin1Max86400000 = number;
export type __integerMin32Max8192 = number;
export type __integerMin32000Max48000 = number;
export interface InputVideoGenerator {
  Channels?: number;
  Duration?: number;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  Height?: number;
  ImageInput?: string;
  SampleRate?: number;
  Width?: number;
}
export const InputVideoGenerator = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Channels: S.optional(S.Number),
    Duration: S.optional(S.Number),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    Height: S.optional(S.Number),
    ImageInput: S.optional(S.String),
    SampleRate: S.optional(S.Number),
    Width: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Channels: "channels",
      Duration: "duration",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      Height: "height",
      ImageInput: "imageInput",
      SampleRate: "sampleRate",
      Width: "width",
    }),
  ),
).annotate({
  identifier: "InputVideoGenerator",
}) as any as S.Schema<InputVideoGenerator>;
export type VideoOverlayUnit = "PIXELS" | "PERCENTAGE" | (string & {});
export const VideoOverlayUnit = S.String;

export interface VideoOverlayCrop {
  Height?: number;
  Unit?: VideoOverlayUnit;
  Width?: number;
  X?: number;
  Y?: number;
}
export const VideoOverlayCrop = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Height: S.optional(S.Number),
    Unit: S.optional(VideoOverlayUnit),
    Width: S.optional(S.Number),
    X: S.optional(S.Number),
    Y: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Height: "height",
      Unit: "unit",
      Width: "width",
      X: "x",
      Y: "y",
    }),
  ),
).annotate({
  identifier: "VideoOverlayCrop",
}) as any as S.Schema<VideoOverlayCrop>;
export type __stringPattern010920405090509092 = string;
export type __integerMinNegative1Max2147483647 = number;
export interface VideoOverlayPosition {
  Height?: number;
  Opacity?: number;
  Unit?: VideoOverlayUnit;
  Width?: number;
  XPosition?: number;
  YPosition?: number;
}
export const VideoOverlayPosition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Height: S.optional(S.Number),
    Opacity: S.optional(S.Number),
    Unit: S.optional(VideoOverlayUnit),
    Width: S.optional(S.Number),
    XPosition: S.optional(S.Number),
    YPosition: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Height: "height",
      Opacity: "opacity",
      Unit: "unit",
      Width: "width",
      XPosition: "xPosition",
      YPosition: "yPosition",
    }),
  ),
).annotate({
  identifier: "VideoOverlayPosition",
}) as any as S.Schema<VideoOverlayPosition>;
export interface VideoOverlayInputClipping {
  EndTimecode?: string;
  StartTimecode?: string;
}
export const VideoOverlayInputClipping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndTimecode: S.optional(S.String),
    StartTimecode: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      EndTimecode: "endTimecode",
      StartTimecode: "startTimecode",
    }),
  ),
).annotate({
  identifier: "VideoOverlayInputClipping",
}) as any as S.Schema<VideoOverlayInputClipping>;
export type __listOfVideoOverlayInputClipping = VideoOverlayInputClipping[];
export const __listOfVideoOverlayInputClipping = /*@__PURE__*/ S.Array(
  VideoOverlayInputClipping,
);
export interface VideoOverlayInput {
  AudioSelectors?: { [key: string]: AudioSelector | undefined };
  FileInput?: string;
  InputClippings?: VideoOverlayInputClipping[];
  TimecodeSource?: InputTimecodeSource;
  TimecodeStart?: string;
}
export const VideoOverlayInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioSelectors: S.optional(__mapOfAudioSelector),
    FileInput: S.optional(S.String),
    InputClippings: S.optional(__listOfVideoOverlayInputClipping),
    TimecodeSource: S.optional(InputTimecodeSource),
    TimecodeStart: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AudioSelectors: "audioSelectors",
      FileInput: "fileInput",
      InputClippings: "inputClippings",
      TimecodeSource: "timecodeSource",
      TimecodeStart: "timecodeStart",
    }),
  ),
).annotate({
  identifier: "VideoOverlayInput",
}) as any as S.Schema<VideoOverlayInput>;
export type VideoOverlayPlayBackMode = "ONCE" | "REPEAT" | (string & {});
export const VideoOverlayPlayBackMode = S.String;

export interface VideoOverlayTransition {
  EndPosition?: VideoOverlayPosition;
  EndTimecode?: string;
  StartTimecode?: string;
}
export const VideoOverlayTransition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EndPosition: S.optional(VideoOverlayPosition),
    EndTimecode: S.optional(S.String),
    StartTimecode: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      EndPosition: "endPosition",
      EndTimecode: "endTimecode",
      StartTimecode: "startTimecode",
    }),
  ),
).annotate({
  identifier: "VideoOverlayTransition",
}) as any as S.Schema<VideoOverlayTransition>;
export type __listOfVideoOverlayTransition = VideoOverlayTransition[];
export const __listOfVideoOverlayTransition = /*@__PURE__*/ S.Array(
  VideoOverlayTransition,
);
export interface VideoOverlay {
  Crop?: VideoOverlayCrop;
  EndTimecode?: string;
  InitialPosition?: VideoOverlayPosition;
  Input?: VideoOverlayInput;
  Playback?: VideoOverlayPlayBackMode;
  StartTimecode?: string;
  Transitions?: VideoOverlayTransition[];
}
export const VideoOverlay = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Crop: S.optional(VideoOverlayCrop),
    EndTimecode: S.optional(S.String),
    InitialPosition: S.optional(VideoOverlayPosition),
    Input: S.optional(VideoOverlayInput),
    Playback: S.optional(VideoOverlayPlayBackMode),
    StartTimecode: S.optional(S.String),
    Transitions: S.optional(__listOfVideoOverlayTransition),
  }).pipe(
    S.encodeKeys({
      Crop: "crop",
      EndTimecode: "endTimecode",
      InitialPosition: "initialPosition",
      Input: "input",
      Playback: "playback",
      StartTimecode: "startTimecode",
      Transitions: "transitions",
    }),
  ),
).annotate({ identifier: "VideoOverlay" }) as any as S.Schema<VideoOverlay>;
export type __listOfVideoOverlay = VideoOverlay[];
export const __listOfVideoOverlay = /*@__PURE__*/ S.Array(VideoOverlay);
export type AlphaBehavior = "DISCARD" | "REMAP_TO_LUMA" | (string & {});
export const AlphaBehavior = S.String;

export type ColorSpaceUsage = "FORCE" | "FALLBACK" | (string & {});
export const ColorSpaceUsage = S.String;

export type EmbeddedTimecodeOverride = "NONE" | "USE_MDPM" | (string & {});
export const EmbeddedTimecodeOverride = S.String;

export type __integerMin0Max50000 = number;
export type __integerMin0Max65535 = number;
export interface Hdr10Metadata {
  BluePrimaryX?: number;
  BluePrimaryY?: number;
  GreenPrimaryX?: number;
  GreenPrimaryY?: number;
  MaxContentLightLevel?: number;
  MaxFrameAverageLightLevel?: number;
  MaxLuminance?: number;
  MinLuminance?: number;
  RedPrimaryX?: number;
  RedPrimaryY?: number;
  WhitePointX?: number;
  WhitePointY?: number;
}
export const Hdr10Metadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BluePrimaryX: S.optional(S.Number),
    BluePrimaryY: S.optional(S.Number),
    GreenPrimaryX: S.optional(S.Number),
    GreenPrimaryY: S.optional(S.Number),
    MaxContentLightLevel: S.optional(S.Number),
    MaxFrameAverageLightLevel: S.optional(S.Number),
    MaxLuminance: S.optional(S.Number),
    MinLuminance: S.optional(S.Number),
    RedPrimaryX: S.optional(S.Number),
    RedPrimaryY: S.optional(S.Number),
    WhitePointX: S.optional(S.Number),
    WhitePointY: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BluePrimaryX: "bluePrimaryX",
      BluePrimaryY: "bluePrimaryY",
      GreenPrimaryX: "greenPrimaryX",
      GreenPrimaryY: "greenPrimaryY",
      MaxContentLightLevel: "maxContentLightLevel",
      MaxFrameAverageLightLevel: "maxFrameAverageLightLevel",
      MaxLuminance: "maxLuminance",
      MinLuminance: "minLuminance",
      RedPrimaryX: "redPrimaryX",
      RedPrimaryY: "redPrimaryY",
      WhitePointX: "whitePointX",
      WhitePointY: "whitePointY",
    }),
  ),
).annotate({ identifier: "Hdr10Metadata" }) as any as S.Schema<Hdr10Metadata>;
export type PadVideo = "DISABLED" | "BLACK" | (string & {});
export const PadVideo = S.String;

export type InputRotate =
  | "DEGREE_0"
  | "DEGREES_90"
  | "DEGREES_180"
  | "DEGREES_270"
  | "AUTO"
  | (string & {});
export const InputRotate = S.String;

export type InputSampleRange =
  | "FOLLOW"
  | "FULL_RANGE"
  | "LIMITED_RANGE"
  | (string & {});
export const InputSampleRange = S.String;

export type VideoSelectorType = "AUTO" | "STREAM" | (string & {});
export const VideoSelectorType = S.String;

export interface VideoSelector {
  AlphaBehavior?: AlphaBehavior;
  ColorSpace?: ColorSpace;
  ColorSpaceUsage?: ColorSpaceUsage;
  EmbeddedTimecodeOverride?: EmbeddedTimecodeOverride;
  Hdr10Metadata?: Hdr10Metadata;
  MaxLuminance?: number;
  PadVideo?: PadVideo;
  Pid?: number;
  ProgramNumber?: number;
  Rotate?: InputRotate;
  SampleRange?: InputSampleRange;
  SelectorType?: VideoSelectorType;
  Streams?: number[];
}
export const VideoSelector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AlphaBehavior: S.optional(AlphaBehavior),
    ColorSpace: S.optional(ColorSpace),
    ColorSpaceUsage: S.optional(ColorSpaceUsage),
    EmbeddedTimecodeOverride: S.optional(EmbeddedTimecodeOverride),
    Hdr10Metadata: S.optional(Hdr10Metadata),
    MaxLuminance: S.optional(S.Number),
    PadVideo: S.optional(PadVideo),
    Pid: S.optional(S.Number),
    ProgramNumber: S.optional(S.Number),
    Rotate: S.optional(InputRotate),
    SampleRange: S.optional(InputSampleRange),
    SelectorType: S.optional(VideoSelectorType),
    Streams: S.optional(__listOf__integerMin1Max2147483647),
  }).pipe(
    S.encodeKeys({
      AlphaBehavior: "alphaBehavior",
      ColorSpace: "colorSpace",
      ColorSpaceUsage: "colorSpaceUsage",
      EmbeddedTimecodeOverride: "embeddedTimecodeOverride",
      Hdr10Metadata: "hdr10Metadata",
      MaxLuminance: "maxLuminance",
      PadVideo: "padVideo",
      Pid: "pid",
      ProgramNumber: "programNumber",
      Rotate: "rotate",
      SampleRange: "sampleRange",
      SelectorType: "selectorType",
      Streams: "streams",
    }),
  ),
).annotate({ identifier: "VideoSelector" }) as any as S.Schema<VideoSelector>;
export interface Input {
  AdvancedInputFilter?: AdvancedInputFilter;
  AdvancedInputFilterSettings?: AdvancedInputFilterSettings;
  AudioSelectorGroups?: { [key: string]: AudioSelectorGroup | undefined };
  AudioSelectors?: { [key: string]: AudioSelector | undefined };
  CaptionSelectors?: { [key: string]: CaptionSelector | undefined };
  Crop?: Rectangle;
  DeblockFilter?: InputDeblockFilter;
  DecryptionSettings?: InputDecryptionSettings;
  DenoiseFilter?: InputDenoiseFilter;
  DolbyVisionMetadataXml?: string;
  DynamicAudioSelectors?: { [key: string]: DynamicAudioSelector | undefined };
  FileInput?: string;
  FilterEnable?: InputFilterEnable;
  FilterStrength?: number;
  ImageInserter?: ImageInserter;
  InputClippings?: InputClipping[];
  InputScanType?: InputScanType;
  MultiViewSettings?: MultiViewSettings[];
  Position?: Rectangle;
  ProgramNumber?: number;
  PsiControl?: InputPsiControl;
  SupplementalImps?: string[];
  TamsSettings?: InputTamsSettings;
  TimecodeSource?: InputTimecodeSource;
  TimecodeStart?: string;
  VideoGenerator?: InputVideoGenerator;
  VideoOverlays?: VideoOverlay[];
  VideoSelector?: VideoSelector;
}
export const Input = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdvancedInputFilter: S.optional(AdvancedInputFilter),
    AdvancedInputFilterSettings: S.optional(AdvancedInputFilterSettings),
    AudioSelectorGroups: S.optional(__mapOfAudioSelectorGroup),
    AudioSelectors: S.optional(__mapOfAudioSelector),
    CaptionSelectors: S.optional(__mapOfCaptionSelector),
    Crop: S.optional(Rectangle),
    DeblockFilter: S.optional(InputDeblockFilter),
    DecryptionSettings: S.optional(InputDecryptionSettings),
    DenoiseFilter: S.optional(InputDenoiseFilter),
    DolbyVisionMetadataXml: S.optional(S.String),
    DynamicAudioSelectors: S.optional(__mapOfDynamicAudioSelector),
    FileInput: S.optional(S.String),
    FilterEnable: S.optional(InputFilterEnable),
    FilterStrength: S.optional(S.Number),
    ImageInserter: S.optional(ImageInserter),
    InputClippings: S.optional(__listOfInputClipping),
    InputScanType: S.optional(InputScanType),
    MultiViewSettings: S.optional(__listOfMultiViewSettings),
    Position: S.optional(Rectangle),
    ProgramNumber: S.optional(S.Number),
    PsiControl: S.optional(InputPsiControl),
    SupplementalImps: S.optional(__listOf__stringPatternS3ASSETMAPXml),
    TamsSettings: S.optional(InputTamsSettings),
    TimecodeSource: S.optional(InputTimecodeSource),
    TimecodeStart: S.optional(S.String),
    VideoGenerator: S.optional(InputVideoGenerator),
    VideoOverlays: S.optional(__listOfVideoOverlay),
    VideoSelector: S.optional(VideoSelector),
  }).pipe(
    S.encodeKeys({
      AdvancedInputFilter: "advancedInputFilter",
      AdvancedInputFilterSettings: "advancedInputFilterSettings",
      AudioSelectorGroups: "audioSelectorGroups",
      AudioSelectors: "audioSelectors",
      CaptionSelectors: "captionSelectors",
      Crop: "crop",
      DeblockFilter: "deblockFilter",
      DecryptionSettings: "decryptionSettings",
      DenoiseFilter: "denoiseFilter",
      DolbyVisionMetadataXml: "dolbyVisionMetadataXml",
      DynamicAudioSelectors: "dynamicAudioSelectors",
      FileInput: "fileInput",
      FilterEnable: "filterEnable",
      FilterStrength: "filterStrength",
      ImageInserter: "imageInserter",
      InputClippings: "inputClippings",
      InputScanType: "inputScanType",
      MultiViewSettings: "multiViewSettings",
      Position: "position",
      ProgramNumber: "programNumber",
      PsiControl: "psiControl",
      SupplementalImps: "supplementalImps",
      TamsSettings: "tamsSettings",
      TimecodeSource: "timecodeSource",
      TimecodeStart: "timecodeStart",
      VideoGenerator: "videoGenerator",
      VideoOverlays: "videoOverlays",
      VideoSelector: "videoSelector",
    }),
  ),
).annotate({ identifier: "Input" }) as any as S.Schema<Input>;
export type __listOfInput = Input[];
export const __listOfInput = /*@__PURE__*/ S.Array(Input);
export type __stringMin1Max20 = string;
export type __stringMin1Max50PatternAZAZ09 = string;
export type __stringMin1Max2048PatternArnAZSecretsmanagerWD12SecretAZAZ09 =
  string;
export type __doubleMin0 = number;
export type __stringPatternHttpsKantarmedia55Prod = string;
export type __stringPatternS3 = string;
export type __stringMin1Max50 = string;
export interface KantarWatermarkSettings {
  ChannelName?: string;
  ContentReference?: string;
  CredentialsSecretName?: string;
  FileOffset?: number;
  KantarLicenseId?: number;
  KantarServerUrl?: string;
  LogDestination?: string;
  Metadata3?: string;
  Metadata4?: string;
  Metadata5?: string;
  Metadata6?: string;
  Metadata7?: string;
  Metadata8?: string;
}
export const KantarWatermarkSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelName: S.optional(S.String),
    ContentReference: S.optional(S.String),
    CredentialsSecretName: S.optional(S.String),
    FileOffset: S.optional(S.Number),
    KantarLicenseId: S.optional(S.Number),
    KantarServerUrl: S.optional(S.String),
    LogDestination: S.optional(S.String),
    Metadata3: S.optional(S.String),
    Metadata4: S.optional(S.String),
    Metadata5: S.optional(S.String),
    Metadata6: S.optional(S.String),
    Metadata7: S.optional(S.String),
    Metadata8: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ChannelName: "channelName",
      ContentReference: "contentReference",
      CredentialsSecretName: "credentialsSecretName",
      FileOffset: "fileOffset",
      KantarLicenseId: "kantarLicenseId",
      KantarServerUrl: "kantarServerUrl",
      LogDestination: "logDestination",
      Metadata3: "metadata3",
      Metadata4: "metadata4",
      Metadata5: "metadata5",
      Metadata6: "metadata6",
      Metadata7: "metadata7",
      Metadata8: "metadata8",
    }),
  ),
).annotate({
  identifier: "KantarWatermarkSettings",
}) as any as S.Schema<KantarWatermarkSettings>;
export type __integerMin1Max17895697 = number;
export type __integerMin1Max2147483640 = number;
export interface MotionImageInsertionFramerate {
  FramerateDenominator?: number;
  FramerateNumerator?: number;
}
export const MotionImageInsertionFramerate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
    }),
  ),
).annotate({
  identifier: "MotionImageInsertionFramerate",
}) as any as S.Schema<MotionImageInsertionFramerate>;
export type __stringMin14PatternS3Mov09PngHttpsMov09Png = string;
export type MotionImageInsertionMode = "MOV" | "PNG" | (string & {});
export const MotionImageInsertionMode = S.String;

export interface MotionImageInsertionOffset {
  ImageX?: number;
  ImageY?: number;
}
export const MotionImageInsertionOffset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ImageX: S.optional(S.Number), ImageY: S.optional(S.Number) }).pipe(
    S.encodeKeys({ ImageX: "imageX", ImageY: "imageY" }),
  ),
).annotate({
  identifier: "MotionImageInsertionOffset",
}) as any as S.Schema<MotionImageInsertionOffset>;
export type MotionImagePlayback = "ONCE" | "REPEAT" | (string & {});
export const MotionImagePlayback = S.String;

export interface MotionImageInserter {
  Framerate?: MotionImageInsertionFramerate;
  Input?: string;
  InsertionMode?: MotionImageInsertionMode;
  Offset?: MotionImageInsertionOffset;
  Playback?: MotionImagePlayback;
  StartTime?: string;
}
export const MotionImageInserter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Framerate: S.optional(MotionImageInsertionFramerate),
    Input: S.optional(S.String),
    InsertionMode: S.optional(MotionImageInsertionMode),
    Offset: S.optional(MotionImageInsertionOffset),
    Playback: S.optional(MotionImagePlayback),
    StartTime: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Framerate: "framerate",
      Input: "input",
      InsertionMode: "insertionMode",
      Offset: "offset",
      Playback: "playback",
      StartTime: "startTime",
    }),
  ),
).annotate({
  identifier: "MotionImageInserter",
}) as any as S.Schema<MotionImageInserter>;
export type __integerMin0Max0 = number;
export interface NielsenConfiguration {
  BreakoutCode?: number;
  DistributorId?: string;
}
export const NielsenConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BreakoutCode: S.optional(S.Number),
    DistributorId: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      BreakoutCode: "breakoutCode",
      DistributorId: "distributorId",
    }),
  ),
).annotate({
  identifier: "NielsenConfiguration",
}) as any as S.Schema<NielsenConfiguration>;
export type NielsenActiveWatermarkProcessType =
  | "NAES2_AND_NW"
  | "CBET"
  | "NAES2_AND_NW_AND_CBET"
  | (string & {});
export const NielsenActiveWatermarkProcessType = S.String;

export type __stringPattern0xAFaF0908190908 = string;
export type __integerMin0Max65534 = number;
export type NielsenSourceWatermarkStatusType =
  | "CLEAN"
  | "WATERMARKED"
  | (string & {});
export const NielsenSourceWatermarkStatusType = S.String;

export type __stringPatternHttps = string;
export type NielsenUniqueTicPerAudioTrackType =
  | "RESERVE_UNIQUE_TICS_PER_TRACK"
  | "SAME_TICS_PER_TRACK"
  | (string & {});
export const NielsenUniqueTicPerAudioTrackType = S.String;

export interface NielsenNonLinearWatermarkSettings {
  ActiveWatermarkProcess?: NielsenActiveWatermarkProcessType;
  AdiFilename?: string;
  AssetId?: string;
  AssetName?: string;
  CbetSourceId?: string;
  EpisodeId?: string;
  MetadataDestination?: string;
  SourceId?: number;
  SourceWatermarkStatus?: NielsenSourceWatermarkStatusType;
  TicServerUrl?: string;
  UniqueTicPerAudioTrack?: NielsenUniqueTicPerAudioTrackType;
}
export const NielsenNonLinearWatermarkSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ActiveWatermarkProcess: S.optional(NielsenActiveWatermarkProcessType),
    AdiFilename: S.optional(S.String),
    AssetId: S.optional(S.String),
    AssetName: S.optional(S.String),
    CbetSourceId: S.optional(S.String),
    EpisodeId: S.optional(S.String),
    MetadataDestination: S.optional(S.String),
    SourceId: S.optional(S.Number),
    SourceWatermarkStatus: S.optional(NielsenSourceWatermarkStatusType),
    TicServerUrl: S.optional(S.String),
    UniqueTicPerAudioTrack: S.optional(NielsenUniqueTicPerAudioTrackType),
  }).pipe(
    S.encodeKeys({
      ActiveWatermarkProcess: "activeWatermarkProcess",
      AdiFilename: "adiFilename",
      AssetId: "assetId",
      AssetName: "assetName",
      CbetSourceId: "cbetSourceId",
      EpisodeId: "episodeId",
      MetadataDestination: "metadataDestination",
      SourceId: "sourceId",
      SourceWatermarkStatus: "sourceWatermarkStatus",
      TicServerUrl: "ticServerUrl",
      UniqueTicPerAudioTrack: "uniqueTicPerAudioTrack",
    }),
  ),
).annotate({
  identifier: "NielsenNonLinearWatermarkSettings",
}) as any as S.Schema<NielsenNonLinearWatermarkSettings>;
export type __integerMin100000Max100000000 = number;
export type __doubleMin1Max10 = number;
export type __integerMin3Max15 = number;
export type RequiredFlag = "ENABLED" | "DISABLED" | (string & {});
export const RequiredFlag = S.String;

export interface AllowedRenditionSize {
  Height?: number;
  Required?: RequiredFlag;
  Width?: number;
}
export const AllowedRenditionSize = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Height: S.optional(S.Number),
    Required: S.optional(RequiredFlag),
    Width: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({ Height: "height", Required: "required", Width: "width" }),
  ),
).annotate({
  identifier: "AllowedRenditionSize",
}) as any as S.Schema<AllowedRenditionSize>;
export type __listOfAllowedRenditionSize = AllowedRenditionSize[];
export const __listOfAllowedRenditionSize =
  /*@__PURE__*/ S.Array(AllowedRenditionSize);
export interface ForceIncludeRenditionSize {
  Height?: number;
  Width?: number;
}
export const ForceIncludeRenditionSize = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Height: S.optional(S.Number), Width: S.optional(S.Number) }).pipe(
    S.encodeKeys({ Height: "height", Width: "width" }),
  ),
).annotate({
  identifier: "ForceIncludeRenditionSize",
}) as any as S.Schema<ForceIncludeRenditionSize>;
export type __listOfForceIncludeRenditionSize = ForceIncludeRenditionSize[];
export const __listOfForceIncludeRenditionSize = /*@__PURE__*/ S.Array(
  ForceIncludeRenditionSize,
);
export interface MinBottomRenditionSize {
  Height?: number;
  Width?: number;
}
export const MinBottomRenditionSize = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Height: S.optional(S.Number), Width: S.optional(S.Number) }).pipe(
    S.encodeKeys({ Height: "height", Width: "width" }),
  ),
).annotate({
  identifier: "MinBottomRenditionSize",
}) as any as S.Schema<MinBottomRenditionSize>;
export interface MinTopRenditionSize {
  Height?: number;
  Width?: number;
}
export const MinTopRenditionSize = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Height: S.optional(S.Number), Width: S.optional(S.Number) }).pipe(
    S.encodeKeys({ Height: "height", Width: "width" }),
  ),
).annotate({
  identifier: "MinTopRenditionSize",
}) as any as S.Schema<MinTopRenditionSize>;
export type RuleType =
  | "MIN_TOP_RENDITION_SIZE"
  | "MIN_BOTTOM_RENDITION_SIZE"
  | "FORCE_INCLUDE_RENDITIONS"
  | "ALLOWED_RENDITIONS"
  | (string & {});
export const RuleType = S.String;

export interface AutomatedAbrRule {
  AllowedRenditions?: AllowedRenditionSize[];
  ForceIncludeRenditions?: ForceIncludeRenditionSize[];
  MinBottomRenditionSize?: MinBottomRenditionSize;
  MinTopRenditionSize?: MinTopRenditionSize;
  Type?: RuleType;
}
export const AutomatedAbrRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AllowedRenditions: S.optional(__listOfAllowedRenditionSize),
    ForceIncludeRenditions: S.optional(__listOfForceIncludeRenditionSize),
    MinBottomRenditionSize: S.optional(MinBottomRenditionSize),
    MinTopRenditionSize: S.optional(MinTopRenditionSize),
    Type: S.optional(RuleType),
  }).pipe(
    S.encodeKeys({
      AllowedRenditions: "allowedRenditions",
      ForceIncludeRenditions: "forceIncludeRenditions",
      MinBottomRenditionSize: "minBottomRenditionSize",
      MinTopRenditionSize: "minTopRenditionSize",
      Type: "type",
    }),
  ),
).annotate({
  identifier: "AutomatedAbrRule",
}) as any as S.Schema<AutomatedAbrRule>;
export type __listOfAutomatedAbrRule = AutomatedAbrRule[];
export const __listOfAutomatedAbrRule = /*@__PURE__*/ S.Array(AutomatedAbrRule);
export interface AutomatedAbrSettings {
  MaxAbrBitrate?: number;
  MaxQualityLevel?: number;
  MaxRenditions?: number;
  MinAbrBitrate?: number;
  Rules?: AutomatedAbrRule[];
}
export const AutomatedAbrSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxAbrBitrate: S.optional(S.Number),
    MaxQualityLevel: S.optional(S.Number),
    MaxRenditions: S.optional(S.Number),
    MinAbrBitrate: S.optional(S.Number),
    Rules: S.optional(__listOfAutomatedAbrRule),
  }).pipe(
    S.encodeKeys({
      MaxAbrBitrate: "maxAbrBitrate",
      MaxQualityLevel: "maxQualityLevel",
      MaxRenditions: "maxRenditions",
      MinAbrBitrate: "minAbrBitrate",
      Rules: "rules",
    }),
  ),
).annotate({
  identifier: "AutomatedAbrSettings",
}) as any as S.Schema<AutomatedAbrSettings>;
export interface AutomatedEncodingSettings {
  AbrSettings?: AutomatedAbrSettings;
}
export const AutomatedEncodingSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ AbrSettings: S.optional(AutomatedAbrSettings) }).pipe(
    S.encodeKeys({ AbrSettings: "abrSettings" }),
  ),
).annotate({
  identifier: "AutomatedEncodingSettings",
}) as any as S.Schema<AutomatedEncodingSettings>;
export type __stringMax2048 = string;
export interface CmafAdditionalManifest {
  ManifestNameModifier?: string;
  SelectedOutputs?: string[];
}
export const CmafAdditionalManifest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestNameModifier: S.optional(S.String),
    SelectedOutputs: S.optional(__listOf__stringMin1),
  }).pipe(
    S.encodeKeys({
      ManifestNameModifier: "manifestNameModifier",
      SelectedOutputs: "selectedOutputs",
    }),
  ),
).annotate({
  identifier: "CmafAdditionalManifest",
}) as any as S.Schema<CmafAdditionalManifest>;
export type __listOfCmafAdditionalManifest = CmafAdditionalManifest[];
export const __listOfCmafAdditionalManifest = /*@__PURE__*/ S.Array(
  CmafAdditionalManifest,
);
export type CmafClientCache = "DISABLED" | "ENABLED" | (string & {});
export const CmafClientCache = S.String;

export type CmafCodecSpecification = "RFC_6381" | "RFC_4281" | (string & {});
export const CmafCodecSpecification = S.String;

export type __stringMin1Max256 = string;
export type DashManifestStyle =
  | "BASIC"
  | "COMPACT"
  | "DISTINCT"
  | "FULL"
  | (string & {});
export const DashManifestStyle = S.String;

export type S3ObjectCannedAcl =
  | "PUBLIC_READ"
  | "AUTHENTICATED_READ"
  | "BUCKET_OWNER_READ"
  | "BUCKET_OWNER_FULL_CONTROL"
  | (string & {});
export const S3ObjectCannedAcl = S.String;

export interface S3DestinationAccessControl {
  CannedAcl?: S3ObjectCannedAcl;
}
export const S3DestinationAccessControl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ CannedAcl: S.optional(S3ObjectCannedAcl) }).pipe(
    S.encodeKeys({ CannedAcl: "cannedAcl" }),
  ),
).annotate({
  identifier: "S3DestinationAccessControl",
}) as any as S.Schema<S3DestinationAccessControl>;
export type S3ServerSideEncryptionType =
  | "SERVER_SIDE_ENCRYPTION_S3"
  | "SERVER_SIDE_ENCRYPTION_KMS"
  | (string & {});
export const S3ServerSideEncryptionType = S.String;

export type __stringPatternAZaZ0902 = string;
export type __stringPatternArnAwsUsGovCnKmsAZ26EastWestCentralNorthSouthEastWest1912D12KeyAFAF098AFAF094AFAF094AFAF094AFAF0912MrkAFAF0932 =
  string;
export interface S3EncryptionSettings {
  EncryptionType?: S3ServerSideEncryptionType;
  KmsEncryptionContext?: string;
  KmsKeyArn?: string;
}
export const S3EncryptionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    EncryptionType: S.optional(S3ServerSideEncryptionType),
    KmsEncryptionContext: S.optional(S.String),
    KmsKeyArn: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      EncryptionType: "encryptionType",
      KmsEncryptionContext: "kmsEncryptionContext",
      KmsKeyArn: "kmsKeyArn",
    }),
  ),
).annotate({
  identifier: "S3EncryptionSettings",
}) as any as S.Schema<S3EncryptionSettings>;
export type S3StorageClass =
  | "STANDARD"
  | "REDUCED_REDUNDANCY"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "INTELLIGENT_TIERING"
  | "GLACIER"
  | "DEEP_ARCHIVE"
  | "GLACIER_IR"
  | (string & {});
export const S3StorageClass = S.String;

export interface S3DestinationSettings {
  AccessControl?: S3DestinationAccessControl;
  Encryption?: S3EncryptionSettings;
  StorageClass?: S3StorageClass;
}
export const S3DestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessControl: S.optional(S3DestinationAccessControl),
    Encryption: S.optional(S3EncryptionSettings),
    StorageClass: S.optional(S3StorageClass),
  }).pipe(
    S.encodeKeys({
      AccessControl: "accessControl",
      Encryption: "encryption",
      StorageClass: "storageClass",
    }),
  ),
).annotate({
  identifier: "S3DestinationSettings",
}) as any as S.Schema<S3DestinationSettings>;
export interface DestinationSettings {
  S3Settings?: S3DestinationSettings;
}
export const DestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ S3Settings: S.optional(S3DestinationSettings) }).pipe(
    S.encodeKeys({ S3Settings: "s3Settings" }),
  ),
).annotate({
  identifier: "DestinationSettings",
}) as any as S.Schema<DestinationSettings>;
export type __integerMin1Max9999 = number;
export type __stringMin32Max32Pattern09aFAF32 = string;
export type CmafEncryptionType = "SAMPLE_AES" | "AES_CTR" | (string & {});
export const CmafEncryptionType = S.String;

export type CmafInitializationVectorInManifest =
  | "INCLUDE"
  | "EXCLUDE"
  | (string & {});
export const CmafInitializationVectorInManifest = S.String;

export type __stringPatternArnAwsUsGovAcm = string;
export type __stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12 =
  string;
export type __listOf__stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12 =
  string[];
export const __listOf__stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12 =
  /*@__PURE__*/ S.Array(S.String);
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
  SpekeAudioPreset?: PresetSpeke20Audio;
  SpekeVideoPreset?: PresetSpeke20Video;
}
export const EncryptionContractConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    SpekeAudioPreset: S.optional(PresetSpeke20Audio),
    SpekeVideoPreset: S.optional(PresetSpeke20Video),
  }).pipe(
    S.encodeKeys({
      SpekeAudioPreset: "spekeAudioPreset",
      SpekeVideoPreset: "spekeVideoPreset",
    }),
  ),
).annotate({
  identifier: "EncryptionContractConfiguration",
}) as any as S.Schema<EncryptionContractConfiguration>;
export type __stringPatternW = string;
export type __stringPatternHttpsD = string;
export interface SpekeKeyProviderCmaf {
  CertificateArn?: string;
  DashSignaledSystemIds?: string[];
  EncryptionContractConfiguration?: EncryptionContractConfiguration;
  HlsSignaledSystemIds?: string[];
  ResourceId?: string;
  Url?: string;
}
export const SpekeKeyProviderCmaf = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    DashSignaledSystemIds: S.optional(
      __listOf__stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12,
    ),
    EncryptionContractConfiguration: S.optional(
      EncryptionContractConfiguration,
    ),
    HlsSignaledSystemIds: S.optional(
      __listOf__stringMin36Max36Pattern09aFAF809aFAF409aFAF409aFAF409aFAF12,
    ),
    ResourceId: S.optional(S.String),
    Url: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CertificateArn: "certificateArn",
      DashSignaledSystemIds: "dashSignaledSystemIds",
      EncryptionContractConfiguration: "encryptionContractConfiguration",
      HlsSignaledSystemIds: "hlsSignaledSystemIds",
      ResourceId: "resourceId",
      Url: "url",
    }),
  ),
).annotate({
  identifier: "SpekeKeyProviderCmaf",
}) as any as S.Schema<SpekeKeyProviderCmaf>;
export type __stringPatternIdentityAZaZ26AZaZ09163 = string;
export type __stringPatternDD = string;
export type __stringPatternAZaZ0932 = string;
export interface StaticKeyProvider {
  KeyFormat?: string;
  KeyFormatVersions?: string;
  StaticKeyValue?: string | redacted.Redacted<string>;
  Url?: string;
}
export const StaticKeyProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    KeyFormat: S.optional(S.String),
    KeyFormatVersions: S.optional(S.String),
    StaticKeyValue: S.optional(SensitiveString),
    Url: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      KeyFormat: "keyFormat",
      KeyFormatVersions: "keyFormatVersions",
      StaticKeyValue: "staticKeyValue",
      Url: "url",
    }),
  ),
).annotate({
  identifier: "StaticKeyProvider",
}) as any as S.Schema<StaticKeyProvider>;
export type CmafKeyProviderType = "SPEKE" | "STATIC_KEY" | (string & {});
export const CmafKeyProviderType = S.String;

export interface CmafEncryptionSettings {
  ClearLeadSegments?: number;
  ConstantInitializationVector?: string;
  EncryptionMethod?: CmafEncryptionType;
  InitializationVectorInManifest?: CmafInitializationVectorInManifest;
  SpekeKeyProvider?: SpekeKeyProviderCmaf;
  StaticKeyProvider?: StaticKeyProvider;
  Type?: CmafKeyProviderType;
}
export const CmafEncryptionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ClearLeadSegments: S.optional(S.Number),
    ConstantInitializationVector: S.optional(S.String),
    EncryptionMethod: S.optional(CmafEncryptionType),
    InitializationVectorInManifest: S.optional(
      CmafInitializationVectorInManifest,
    ),
    SpekeKeyProvider: S.optional(SpekeKeyProviderCmaf),
    StaticKeyProvider: S.optional(StaticKeyProvider),
    Type: S.optional(CmafKeyProviderType),
  }).pipe(
    S.encodeKeys({
      ClearLeadSegments: "clearLeadSegments",
      ConstantInitializationVector: "constantInitializationVector",
      EncryptionMethod: "encryptionMethod",
      InitializationVectorInManifest: "initializationVectorInManifest",
      SpekeKeyProvider: "spekeKeyProvider",
      StaticKeyProvider: "staticKeyProvider",
      Type: "type",
    }),
  ),
).annotate({
  identifier: "CmafEncryptionSettings",
}) as any as S.Schema<CmafEncryptionSettings>;
export type CmafImageBasedTrickPlay =
  | "NONE"
  | "THUMBNAIL"
  | "THUMBNAIL_AND_FULLFRAME"
  | "ADVANCED"
  | "VARIANTS"
  | (string & {});
export const CmafImageBasedTrickPlay = S.String;

export type CmafIntervalCadence =
  | "FOLLOW_IFRAME"
  | "FOLLOW_CUSTOM"
  | "FOLLOW_SEGMENTATION"
  | (string & {});
export const CmafIntervalCadence = S.String;

export type __integerMin2Max4096 = number;
export type __doubleMin0Max2147483647 = number;
export type __integerMin8Max4096 = number;
export type __integerMin1Max2048 = number;
export type __integerMin1Max512 = number;
export interface CmafImageBasedTrickPlaySettings {
  IntervalCadence?: CmafIntervalCadence;
  ThumbnailHeight?: number;
  ThumbnailInterval?: number;
  ThumbnailWidth?: number;
  TileHeight?: number;
  TileWidth?: number;
}
export const CmafImageBasedTrickPlaySettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntervalCadence: S.optional(CmafIntervalCadence),
    ThumbnailHeight: S.optional(S.Number),
    ThumbnailInterval: S.optional(S.Number),
    ThumbnailWidth: S.optional(S.Number),
    TileHeight: S.optional(S.Number),
    TileWidth: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      IntervalCadence: "intervalCadence",
      ThumbnailHeight: "thumbnailHeight",
      ThumbnailInterval: "thumbnailInterval",
      ThumbnailWidth: "thumbnailWidth",
      TileHeight: "tileHeight",
      TileWidth: "tileWidth",
    }),
  ),
).annotate({
  identifier: "CmafImageBasedTrickPlaySettings",
}) as any as S.Schema<CmafImageBasedTrickPlaySettings>;
export interface CmafImageBasedTrickPlayVariant {
  IntervalCadence?: CmafIntervalCadence;
  ThumbnailHeight?: number;
  ThumbnailInterval?: number;
  ThumbnailWidth?: number;
  TileHeight?: number;
  TileWidth?: number;
}
export const CmafImageBasedTrickPlayVariant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntervalCadence: S.optional(CmafIntervalCadence),
    ThumbnailHeight: S.optional(S.Number),
    ThumbnailInterval: S.optional(S.Number),
    ThumbnailWidth: S.optional(S.Number),
    TileHeight: S.optional(S.Number),
    TileWidth: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      IntervalCadence: "intervalCadence",
      ThumbnailHeight: "thumbnailHeight",
      ThumbnailInterval: "thumbnailInterval",
      ThumbnailWidth: "thumbnailWidth",
      TileHeight: "tileHeight",
      TileWidth: "tileWidth",
    }),
  ),
).annotate({
  identifier: "CmafImageBasedTrickPlayVariant",
}) as any as S.Schema<CmafImageBasedTrickPlayVariant>;
export type __listOfCmafImageBasedTrickPlayVariant =
  CmafImageBasedTrickPlayVariant[];
export const __listOfCmafImageBasedTrickPlayVariant = /*@__PURE__*/ S.Array(
  CmafImageBasedTrickPlayVariant,
);
export type CmafManifestCompression = "GZIP" | "NONE" | (string & {});
export const CmafManifestCompression = S.String;

export type CmafManifestDurationFormat =
  | "FLOATING_POINT"
  | "INTEGER"
  | (string & {});
export const CmafManifestDurationFormat = S.String;

export type CmafMpdManifestBandwidthType = "AVERAGE" | "MAX" | (string & {});
export const CmafMpdManifestBandwidthType = S.String;

export type CmafMpdProfile =
  | "MAIN_PROFILE"
  | "ON_DEMAND_PROFILE"
  | (string & {});
export const CmafMpdProfile = S.String;

export type CmafPtsOffsetHandlingForBFrames =
  | "ZERO_BASED"
  | "MATCH_INITIAL_PTS"
  | (string & {});
export const CmafPtsOffsetHandlingForBFrames = S.String;

export type CmafSegmentControl =
  | "SINGLE_FILE"
  | "SEGMENTED_FILES"
  | (string & {});
export const CmafSegmentControl = S.String;

export type CmafSegmentLengthControl =
  | "EXACT"
  | "GOP_MULTIPLE"
  | "MATCH"
  | (string & {});
export const CmafSegmentLengthControl = S.String;

export type CmafStreamInfResolution = "INCLUDE" | "EXCLUDE" | (string & {});
export const CmafStreamInfResolution = S.String;

export type CmafTargetDurationCompatibilityMode =
  | "LEGACY"
  | "SPEC_COMPLIANT"
  | (string & {});
export const CmafTargetDurationCompatibilityMode = S.String;

export type CmafVideoCompositionOffsets = "SIGNED" | "UNSIGNED" | (string & {});
export const CmafVideoCompositionOffsets = S.String;

export type CmafWriteDASHManifest = "DISABLED" | "ENABLED" | (string & {});
export const CmafWriteDASHManifest = S.String;

export type CmafWriteHLSManifest = "DISABLED" | "ENABLED" | (string & {});
export const CmafWriteHLSManifest = S.String;

export type CmafWriteSegmentTimelineInRepresentation =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const CmafWriteSegmentTimelineInRepresentation = S.String;

export interface CmafGroupSettings {
  AdditionalManifests?: CmafAdditionalManifest[];
  BaseUrl?: string;
  ClientCache?: CmafClientCache;
  CodecSpecification?: CmafCodecSpecification;
  DashIFrameTrickPlayNameModifier?: string;
  DashManifestStyle?: DashManifestStyle;
  Destination?: string;
  DestinationSettings?: DestinationSettings;
  Encryption?: CmafEncryptionSettings;
  FragmentLength?: number;
  ImageBasedTrickPlay?: CmafImageBasedTrickPlay;
  ImageBasedTrickPlaySettings?: CmafImageBasedTrickPlaySettings;
  ImageBasedTrickPlayVariants?: CmafImageBasedTrickPlayVariant[];
  ManifestCompression?: CmafManifestCompression;
  ManifestDurationFormat?: CmafManifestDurationFormat;
  MinBufferTime?: number;
  MinFinalSegmentLength?: number;
  MpdManifestBandwidthType?: CmafMpdManifestBandwidthType;
  MpdProfile?: CmafMpdProfile;
  PtsOffsetHandlingForBFrames?: CmafPtsOffsetHandlingForBFrames;
  SegmentControl?: CmafSegmentControl;
  SegmentLength?: number;
  SegmentLengthControl?: CmafSegmentLengthControl;
  StreamInfResolution?: CmafStreamInfResolution;
  TargetDurationCompatibilityMode?: CmafTargetDurationCompatibilityMode;
  VideoCompositionOffsets?: CmafVideoCompositionOffsets;
  WriteDashManifest?: CmafWriteDASHManifest;
  WriteHlsManifest?: CmafWriteHLSManifest;
  WriteSegmentTimelineInRepresentation?: CmafWriteSegmentTimelineInRepresentation;
}
export const CmafGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdditionalManifests: S.optional(__listOfCmafAdditionalManifest),
    BaseUrl: S.optional(S.String),
    ClientCache: S.optional(CmafClientCache),
    CodecSpecification: S.optional(CmafCodecSpecification),
    DashIFrameTrickPlayNameModifier: S.optional(S.String),
    DashManifestStyle: S.optional(DashManifestStyle),
    Destination: S.optional(S.String),
    DestinationSettings: S.optional(DestinationSettings),
    Encryption: S.optional(CmafEncryptionSettings),
    FragmentLength: S.optional(S.Number),
    ImageBasedTrickPlay: S.optional(CmafImageBasedTrickPlay),
    ImageBasedTrickPlaySettings: S.optional(CmafImageBasedTrickPlaySettings),
    ImageBasedTrickPlayVariants: S.optional(
      __listOfCmafImageBasedTrickPlayVariant,
    ),
    ManifestCompression: S.optional(CmafManifestCompression),
    ManifestDurationFormat: S.optional(CmafManifestDurationFormat),
    MinBufferTime: S.optional(S.Number),
    MinFinalSegmentLength: S.optional(S.Number),
    MpdManifestBandwidthType: S.optional(CmafMpdManifestBandwidthType),
    MpdProfile: S.optional(CmafMpdProfile),
    PtsOffsetHandlingForBFrames: S.optional(CmafPtsOffsetHandlingForBFrames),
    SegmentControl: S.optional(CmafSegmentControl),
    SegmentLength: S.optional(S.Number),
    SegmentLengthControl: S.optional(CmafSegmentLengthControl),
    StreamInfResolution: S.optional(CmafStreamInfResolution),
    TargetDurationCompatibilityMode: S.optional(
      CmafTargetDurationCompatibilityMode,
    ),
    VideoCompositionOffsets: S.optional(CmafVideoCompositionOffsets),
    WriteDashManifest: S.optional(CmafWriteDASHManifest),
    WriteHlsManifest: S.optional(CmafWriteHLSManifest),
    WriteSegmentTimelineInRepresentation: S.optional(
      CmafWriteSegmentTimelineInRepresentation,
    ),
  }).pipe(
    S.encodeKeys({
      AdditionalManifests: "additionalManifests",
      BaseUrl: "baseUrl",
      ClientCache: "clientCache",
      CodecSpecification: "codecSpecification",
      DashIFrameTrickPlayNameModifier: "dashIFrameTrickPlayNameModifier",
      DashManifestStyle: "dashManifestStyle",
      Destination: "destination",
      DestinationSettings: "destinationSettings",
      Encryption: "encryption",
      FragmentLength: "fragmentLength",
      ImageBasedTrickPlay: "imageBasedTrickPlay",
      ImageBasedTrickPlaySettings: "imageBasedTrickPlaySettings",
      ImageBasedTrickPlayVariants: "imageBasedTrickPlayVariants",
      ManifestCompression: "manifestCompression",
      ManifestDurationFormat: "manifestDurationFormat",
      MinBufferTime: "minBufferTime",
      MinFinalSegmentLength: "minFinalSegmentLength",
      MpdManifestBandwidthType: "mpdManifestBandwidthType",
      MpdProfile: "mpdProfile",
      PtsOffsetHandlingForBFrames: "ptsOffsetHandlingForBFrames",
      SegmentControl: "segmentControl",
      SegmentLength: "segmentLength",
      SegmentLengthControl: "segmentLengthControl",
      StreamInfResolution: "streamInfResolution",
      TargetDurationCompatibilityMode: "targetDurationCompatibilityMode",
      VideoCompositionOffsets: "videoCompositionOffsets",
      WriteDashManifest: "writeDashManifest",
      WriteHlsManifest: "writeHlsManifest",
      WriteSegmentTimelineInRepresentation:
        "writeSegmentTimelineInRepresentation",
    }),
  ),
).annotate({
  identifier: "CmafGroupSettings",
}) as any as S.Schema<CmafGroupSettings>;
export interface DashAdditionalManifest {
  ManifestNameModifier?: string;
  SelectedOutputs?: string[];
}
export const DashAdditionalManifest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestNameModifier: S.optional(S.String),
    SelectedOutputs: S.optional(__listOf__stringMin1),
  }).pipe(
    S.encodeKeys({
      ManifestNameModifier: "manifestNameModifier",
      SelectedOutputs: "selectedOutputs",
    }),
  ),
).annotate({
  identifier: "DashAdditionalManifest",
}) as any as S.Schema<DashAdditionalManifest>;
export type __listOfDashAdditionalManifest = DashAdditionalManifest[];
export const __listOfDashAdditionalManifest = /*@__PURE__*/ S.Array(
  DashAdditionalManifest,
);
export type DashIsoGroupAudioChannelConfigSchemeIdUri =
  | "MPEG_CHANNEL_CONFIGURATION"
  | "DOLBY_CHANNEL_CONFIGURATION"
  | (string & {});
export const DashIsoGroupAudioChannelConfigSchemeIdUri = S.String;

export type DashIsoPlaybackDeviceCompatibility =
  | "CENC_V1"
  | "UNENCRYPTED_SEI"
  | (string & {});
export const DashIsoPlaybackDeviceCompatibility = S.String;

export type __stringPattern09aFAF809aFAF409aFAF409aFAF409aFAF12 = string;
export type __listOf__stringPattern09aFAF809aFAF409aFAF409aFAF409aFAF12 =
  string[];
export const __listOf__stringPattern09aFAF809aFAF409aFAF409aFAF409aFAF12 =
  /*@__PURE__*/ S.Array(S.String);
export interface SpekeKeyProvider {
  CertificateArn?: string;
  EncryptionContractConfiguration?: EncryptionContractConfiguration;
  ResourceId?: string;
  SystemIds?: string[];
  Url?: string;
}
export const SpekeKeyProvider = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CertificateArn: S.optional(S.String),
    EncryptionContractConfiguration: S.optional(
      EncryptionContractConfiguration,
    ),
    ResourceId: S.optional(S.String),
    SystemIds: S.optional(
      __listOf__stringPattern09aFAF809aFAF409aFAF409aFAF409aFAF12,
    ),
    Url: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CertificateArn: "certificateArn",
      EncryptionContractConfiguration: "encryptionContractConfiguration",
      ResourceId: "resourceId",
      SystemIds: "systemIds",
      Url: "url",
    }),
  ),
).annotate({
  identifier: "SpekeKeyProvider",
}) as any as S.Schema<SpekeKeyProvider>;
export interface DashIsoEncryptionSettings {
  PlaybackDeviceCompatibility?: DashIsoPlaybackDeviceCompatibility;
  SpekeKeyProvider?: SpekeKeyProvider;
}
export const DashIsoEncryptionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PlaybackDeviceCompatibility: S.optional(DashIsoPlaybackDeviceCompatibility),
    SpekeKeyProvider: S.optional(SpekeKeyProvider),
  }).pipe(
    S.encodeKeys({
      PlaybackDeviceCompatibility: "playbackDeviceCompatibility",
      SpekeKeyProvider: "spekeKeyProvider",
    }),
  ),
).annotate({
  identifier: "DashIsoEncryptionSettings",
}) as any as S.Schema<DashIsoEncryptionSettings>;
export type DashIsoHbbtvCompliance = "HBBTV_1_5" | "NONE" | (string & {});
export const DashIsoHbbtvCompliance = S.String;

export type DashIsoImageBasedTrickPlay =
  | "NONE"
  | "THUMBNAIL"
  | "THUMBNAIL_AND_FULLFRAME"
  | "ADVANCED"
  | "VARIANTS"
  | (string & {});
export const DashIsoImageBasedTrickPlay = S.String;

export type DashIsoIntervalCadence =
  | "FOLLOW_IFRAME"
  | "FOLLOW_CUSTOM"
  | "FOLLOW_SEGMENTATION"
  | (string & {});
export const DashIsoIntervalCadence = S.String;

export type __integerMin1Max4096 = number;
export interface DashIsoImageBasedTrickPlaySettings {
  IntervalCadence?: DashIsoIntervalCadence;
  ThumbnailHeight?: number;
  ThumbnailInterval?: number;
  ThumbnailWidth?: number;
  TileHeight?: number;
  TileWidth?: number;
}
export const DashIsoImageBasedTrickPlaySettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntervalCadence: S.optional(DashIsoIntervalCadence),
    ThumbnailHeight: S.optional(S.Number),
    ThumbnailInterval: S.optional(S.Number),
    ThumbnailWidth: S.optional(S.Number),
    TileHeight: S.optional(S.Number),
    TileWidth: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      IntervalCadence: "intervalCadence",
      ThumbnailHeight: "thumbnailHeight",
      ThumbnailInterval: "thumbnailInterval",
      ThumbnailWidth: "thumbnailWidth",
      TileHeight: "tileHeight",
      TileWidth: "tileWidth",
    }),
  ),
).annotate({
  identifier: "DashIsoImageBasedTrickPlaySettings",
}) as any as S.Schema<DashIsoImageBasedTrickPlaySettings>;
export interface DashIsoImageBasedTrickPlayVariant {
  IntervalCadence?: DashIsoIntervalCadence;
  ThumbnailHeight?: number;
  ThumbnailInterval?: number;
  ThumbnailWidth?: number;
  TileHeight?: number;
  TileWidth?: number;
}
export const DashIsoImageBasedTrickPlayVariant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntervalCadence: S.optional(DashIsoIntervalCadence),
    ThumbnailHeight: S.optional(S.Number),
    ThumbnailInterval: S.optional(S.Number),
    ThumbnailWidth: S.optional(S.Number),
    TileHeight: S.optional(S.Number),
    TileWidth: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      IntervalCadence: "intervalCadence",
      ThumbnailHeight: "thumbnailHeight",
      ThumbnailInterval: "thumbnailInterval",
      ThumbnailWidth: "thumbnailWidth",
      TileHeight: "tileHeight",
      TileWidth: "tileWidth",
    }),
  ),
).annotate({
  identifier: "DashIsoImageBasedTrickPlayVariant",
}) as any as S.Schema<DashIsoImageBasedTrickPlayVariant>;
export type __listOfDashIsoImageBasedTrickPlayVariant =
  DashIsoImageBasedTrickPlayVariant[];
export const __listOfDashIsoImageBasedTrickPlayVariant = /*@__PURE__*/ S.Array(
  DashIsoImageBasedTrickPlayVariant,
);
export type DashIsoMpdManifestBandwidthType = "AVERAGE" | "MAX" | (string & {});
export const DashIsoMpdManifestBandwidthType = S.String;

export type DashIsoMpdProfile =
  | "MAIN_PROFILE"
  | "ON_DEMAND_PROFILE"
  | (string & {});
export const DashIsoMpdProfile = S.String;

export type DashIsoPtsOffsetHandlingForBFrames =
  | "ZERO_BASED"
  | "MATCH_INITIAL_PTS"
  | (string & {});
export const DashIsoPtsOffsetHandlingForBFrames = S.String;

export type DashIsoSegmentControl =
  | "SINGLE_FILE"
  | "SEGMENTED_FILES"
  | (string & {});
export const DashIsoSegmentControl = S.String;

export type DashIsoSegmentLengthControl =
  | "EXACT"
  | "GOP_MULTIPLE"
  | "MATCH"
  | (string & {});
export const DashIsoSegmentLengthControl = S.String;

export type DashIsoVideoCompositionOffsets =
  | "SIGNED"
  | "UNSIGNED"
  | (string & {});
export const DashIsoVideoCompositionOffsets = S.String;

export type DashIsoWriteSegmentTimelineInRepresentation =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const DashIsoWriteSegmentTimelineInRepresentation = S.String;

export interface DashIsoGroupSettings {
  AdditionalManifests?: DashAdditionalManifest[];
  AudioChannelConfigSchemeIdUri?: DashIsoGroupAudioChannelConfigSchemeIdUri;
  BaseUrl?: string;
  DashIFrameTrickPlayNameModifier?: string;
  DashManifestStyle?: DashManifestStyle;
  Destination?: string;
  DestinationSettings?: DestinationSettings;
  Encryption?: DashIsoEncryptionSettings;
  FragmentLength?: number;
  HbbtvCompliance?: DashIsoHbbtvCompliance;
  ImageBasedTrickPlay?: DashIsoImageBasedTrickPlay;
  ImageBasedTrickPlaySettings?: DashIsoImageBasedTrickPlaySettings;
  ImageBasedTrickPlayVariants?: DashIsoImageBasedTrickPlayVariant[];
  MinBufferTime?: number;
  MinFinalSegmentLength?: number;
  MpdManifestBandwidthType?: DashIsoMpdManifestBandwidthType;
  MpdProfile?: DashIsoMpdProfile;
  PtsOffsetHandlingForBFrames?: DashIsoPtsOffsetHandlingForBFrames;
  SegmentControl?: DashIsoSegmentControl;
  SegmentLength?: number;
  SegmentLengthControl?: DashIsoSegmentLengthControl;
  VideoCompositionOffsets?: DashIsoVideoCompositionOffsets;
  WriteSegmentTimelineInRepresentation?: DashIsoWriteSegmentTimelineInRepresentation;
}
export const DashIsoGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdditionalManifests: S.optional(__listOfDashAdditionalManifest),
    AudioChannelConfigSchemeIdUri: S.optional(
      DashIsoGroupAudioChannelConfigSchemeIdUri,
    ),
    BaseUrl: S.optional(S.String),
    DashIFrameTrickPlayNameModifier: S.optional(S.String),
    DashManifestStyle: S.optional(DashManifestStyle),
    Destination: S.optional(S.String),
    DestinationSettings: S.optional(DestinationSettings),
    Encryption: S.optional(DashIsoEncryptionSettings),
    FragmentLength: S.optional(S.Number),
    HbbtvCompliance: S.optional(DashIsoHbbtvCompliance),
    ImageBasedTrickPlay: S.optional(DashIsoImageBasedTrickPlay),
    ImageBasedTrickPlaySettings: S.optional(DashIsoImageBasedTrickPlaySettings),
    ImageBasedTrickPlayVariants: S.optional(
      __listOfDashIsoImageBasedTrickPlayVariant,
    ),
    MinBufferTime: S.optional(S.Number),
    MinFinalSegmentLength: S.optional(S.Number),
    MpdManifestBandwidthType: S.optional(DashIsoMpdManifestBandwidthType),
    MpdProfile: S.optional(DashIsoMpdProfile),
    PtsOffsetHandlingForBFrames: S.optional(DashIsoPtsOffsetHandlingForBFrames),
    SegmentControl: S.optional(DashIsoSegmentControl),
    SegmentLength: S.optional(S.Number),
    SegmentLengthControl: S.optional(DashIsoSegmentLengthControl),
    VideoCompositionOffsets: S.optional(DashIsoVideoCompositionOffsets),
    WriteSegmentTimelineInRepresentation: S.optional(
      DashIsoWriteSegmentTimelineInRepresentation,
    ),
  }).pipe(
    S.encodeKeys({
      AdditionalManifests: "additionalManifests",
      AudioChannelConfigSchemeIdUri: "audioChannelConfigSchemeIdUri",
      BaseUrl: "baseUrl",
      DashIFrameTrickPlayNameModifier: "dashIFrameTrickPlayNameModifier",
      DashManifestStyle: "dashManifestStyle",
      Destination: "destination",
      DestinationSettings: "destinationSettings",
      Encryption: "encryption",
      FragmentLength: "fragmentLength",
      HbbtvCompliance: "hbbtvCompliance",
      ImageBasedTrickPlay: "imageBasedTrickPlay",
      ImageBasedTrickPlaySettings: "imageBasedTrickPlaySettings",
      ImageBasedTrickPlayVariants: "imageBasedTrickPlayVariants",
      MinBufferTime: "minBufferTime",
      MinFinalSegmentLength: "minFinalSegmentLength",
      MpdManifestBandwidthType: "mpdManifestBandwidthType",
      MpdProfile: "mpdProfile",
      PtsOffsetHandlingForBFrames: "ptsOffsetHandlingForBFrames",
      SegmentControl: "segmentControl",
      SegmentLength: "segmentLength",
      SegmentLengthControl: "segmentLengthControl",
      VideoCompositionOffsets: "videoCompositionOffsets",
      WriteSegmentTimelineInRepresentation:
        "writeSegmentTimelineInRepresentation",
    }),
  ),
).annotate({
  identifier: "DashIsoGroupSettings",
}) as any as S.Schema<DashIsoGroupSettings>;
export interface FileGroupSettings {
  Destination?: string;
  DestinationSettings?: DestinationSettings;
}
export const FileGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination: S.optional(S.String),
    DestinationSettings: S.optional(DestinationSettings),
  }).pipe(
    S.encodeKeys({
      Destination: "destination",
      DestinationSettings: "destinationSettings",
    }),
  ),
).annotate({
  identifier: "FileGroupSettings",
}) as any as S.Schema<FileGroupSettings>;
export type HlsAdMarkers = "ELEMENTAL" | "ELEMENTAL_SCTE35" | (string & {});
export const HlsAdMarkers = S.String;

export type __listOfHlsAdMarkers = HlsAdMarkers[];
export const __listOfHlsAdMarkers = /*@__PURE__*/ S.Array(HlsAdMarkers);
export interface HlsAdditionalManifest {
  ManifestNameModifier?: string;
  SelectedOutputs?: string[];
}
export const HlsAdditionalManifest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestNameModifier: S.optional(S.String),
    SelectedOutputs: S.optional(__listOf__stringMin1),
  }).pipe(
    S.encodeKeys({
      ManifestNameModifier: "manifestNameModifier",
      SelectedOutputs: "selectedOutputs",
    }),
  ),
).annotate({
  identifier: "HlsAdditionalManifest",
}) as any as S.Schema<HlsAdditionalManifest>;
export type __listOfHlsAdditionalManifest = HlsAdditionalManifest[];
export const __listOfHlsAdditionalManifest = /*@__PURE__*/ S.Array(
  HlsAdditionalManifest,
);
export type HlsAudioOnlyHeader = "INCLUDE" | "EXCLUDE" | (string & {});
export const HlsAudioOnlyHeader = S.String;

export interface HlsCaptionLanguageMapping {
  CaptionChannel?: number;
  CustomLanguageCode?: string;
  LanguageCode?: LanguageCode;
  LanguageDescription?: string;
}
export const HlsCaptionLanguageMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CaptionChannel: S.optional(S.Number),
    CustomLanguageCode: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    LanguageDescription: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CaptionChannel: "captionChannel",
      CustomLanguageCode: "customLanguageCode",
      LanguageCode: "languageCode",
      LanguageDescription: "languageDescription",
    }),
  ),
).annotate({
  identifier: "HlsCaptionLanguageMapping",
}) as any as S.Schema<HlsCaptionLanguageMapping>;
export type __listOfHlsCaptionLanguageMapping = HlsCaptionLanguageMapping[];
export const __listOfHlsCaptionLanguageMapping = /*@__PURE__*/ S.Array(
  HlsCaptionLanguageMapping,
);
export type HlsCaptionLanguageSetting =
  | "INSERT"
  | "OMIT"
  | "NONE"
  | (string & {});
export const HlsCaptionLanguageSetting = S.String;

export type HlsCaptionSegmentLengthControl =
  | "LARGE_SEGMENTS"
  | "MATCH_VIDEO"
  | (string & {});
export const HlsCaptionSegmentLengthControl = S.String;

export type HlsClientCache = "DISABLED" | "ENABLED" | (string & {});
export const HlsClientCache = S.String;

export type HlsCodecSpecification = "RFC_6381" | "RFC_4281" | (string & {});
export const HlsCodecSpecification = S.String;

export type HlsDirectoryStructure =
  | "SINGLE_DIRECTORY"
  | "SUBDIRECTORY_PER_STREAM"
  | (string & {});
export const HlsDirectoryStructure = S.String;

export type HlsEncryptionType = "AES128" | "SAMPLE_AES" | (string & {});
export const HlsEncryptionType = S.String;

export type HlsInitializationVectorInManifest =
  | "INCLUDE"
  | "EXCLUDE"
  | (string & {});
export const HlsInitializationVectorInManifest = S.String;

export type HlsOfflineEncrypted = "ENABLED" | "DISABLED" | (string & {});
export const HlsOfflineEncrypted = S.String;

export type HlsKeyProviderType = "SPEKE" | "STATIC_KEY" | (string & {});
export const HlsKeyProviderType = S.String;

export interface HlsEncryptionSettings {
  ConstantInitializationVector?: string;
  EncryptionMethod?: HlsEncryptionType;
  InitializationVectorInManifest?: HlsInitializationVectorInManifest;
  OfflineEncrypted?: HlsOfflineEncrypted;
  SpekeKeyProvider?: SpekeKeyProvider;
  StaticKeyProvider?: StaticKeyProvider;
  Type?: HlsKeyProviderType;
}
export const HlsEncryptionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConstantInitializationVector: S.optional(S.String),
    EncryptionMethod: S.optional(HlsEncryptionType),
    InitializationVectorInManifest: S.optional(
      HlsInitializationVectorInManifest,
    ),
    OfflineEncrypted: S.optional(HlsOfflineEncrypted),
    SpekeKeyProvider: S.optional(SpekeKeyProvider),
    StaticKeyProvider: S.optional(StaticKeyProvider),
    Type: S.optional(HlsKeyProviderType),
  }).pipe(
    S.encodeKeys({
      ConstantInitializationVector: "constantInitializationVector",
      EncryptionMethod: "encryptionMethod",
      InitializationVectorInManifest: "initializationVectorInManifest",
      OfflineEncrypted: "offlineEncrypted",
      SpekeKeyProvider: "spekeKeyProvider",
      StaticKeyProvider: "staticKeyProvider",
      Type: "type",
    }),
  ),
).annotate({
  identifier: "HlsEncryptionSettings",
}) as any as S.Schema<HlsEncryptionSettings>;
export type HlsImageBasedTrickPlay =
  | "NONE"
  | "THUMBNAIL"
  | "THUMBNAIL_AND_FULLFRAME"
  | "ADVANCED"
  | "VARIANTS"
  | (string & {});
export const HlsImageBasedTrickPlay = S.String;

export type HlsIntervalCadence =
  | "FOLLOW_IFRAME"
  | "FOLLOW_CUSTOM"
  | "FOLLOW_SEGMENTATION"
  | (string & {});
export const HlsIntervalCadence = S.String;

export interface HlsImageBasedTrickPlaySettings {
  IntervalCadence?: HlsIntervalCadence;
  ThumbnailHeight?: number;
  ThumbnailInterval?: number;
  ThumbnailWidth?: number;
  TileHeight?: number;
  TileWidth?: number;
}
export const HlsImageBasedTrickPlaySettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntervalCadence: S.optional(HlsIntervalCadence),
    ThumbnailHeight: S.optional(S.Number),
    ThumbnailInterval: S.optional(S.Number),
    ThumbnailWidth: S.optional(S.Number),
    TileHeight: S.optional(S.Number),
    TileWidth: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      IntervalCadence: "intervalCadence",
      ThumbnailHeight: "thumbnailHeight",
      ThumbnailInterval: "thumbnailInterval",
      ThumbnailWidth: "thumbnailWidth",
      TileHeight: "tileHeight",
      TileWidth: "tileWidth",
    }),
  ),
).annotate({
  identifier: "HlsImageBasedTrickPlaySettings",
}) as any as S.Schema<HlsImageBasedTrickPlaySettings>;
export interface HlsImageBasedTrickPlayVariant {
  IntervalCadence?: HlsIntervalCadence;
  ThumbnailHeight?: number;
  ThumbnailInterval?: number;
  ThumbnailWidth?: number;
  TileHeight?: number;
  TileWidth?: number;
}
export const HlsImageBasedTrickPlayVariant = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntervalCadence: S.optional(HlsIntervalCadence),
    ThumbnailHeight: S.optional(S.Number),
    ThumbnailInterval: S.optional(S.Number),
    ThumbnailWidth: S.optional(S.Number),
    TileHeight: S.optional(S.Number),
    TileWidth: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      IntervalCadence: "intervalCadence",
      ThumbnailHeight: "thumbnailHeight",
      ThumbnailInterval: "thumbnailInterval",
      ThumbnailWidth: "thumbnailWidth",
      TileHeight: "tileHeight",
      TileWidth: "tileWidth",
    }),
  ),
).annotate({
  identifier: "HlsImageBasedTrickPlayVariant",
}) as any as S.Schema<HlsImageBasedTrickPlayVariant>;
export type __listOfHlsImageBasedTrickPlayVariant =
  HlsImageBasedTrickPlayVariant[];
export const __listOfHlsImageBasedTrickPlayVariant = /*@__PURE__*/ S.Array(
  HlsImageBasedTrickPlayVariant,
);
export type HlsManifestCompression = "GZIP" | "NONE" | (string & {});
export const HlsManifestCompression = S.String;

export type HlsManifestDurationFormat =
  | "FLOATING_POINT"
  | "INTEGER"
  | (string & {});
export const HlsManifestDurationFormat = S.String;

export type HlsOutputSelection =
  | "MANIFESTS_AND_SEGMENTS"
  | "SEGMENTS_ONLY"
  | (string & {});
export const HlsOutputSelection = S.String;

export type HlsProgramDateTime = "INCLUDE" | "EXCLUDE" | (string & {});
export const HlsProgramDateTime = S.String;

export type __integerMin0Max3600 = number;
export type HlsProgressiveWriteHlsManifest =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const HlsProgressiveWriteHlsManifest = S.String;

export type HlsSegmentControl =
  | "SINGLE_FILE"
  | "SEGMENTED_FILES"
  | (string & {});
export const HlsSegmentControl = S.String;

export type HlsSegmentLengthControl =
  | "EXACT"
  | "GOP_MULTIPLE"
  | "MATCH"
  | (string & {});
export const HlsSegmentLengthControl = S.String;

export type HlsStreamInfResolution = "INCLUDE" | "EXCLUDE" | (string & {});
export const HlsStreamInfResolution = S.String;

export type HlsTargetDurationCompatibilityMode =
  | "LEGACY"
  | "SPEC_COMPLIANT"
  | (string & {});
export const HlsTargetDurationCompatibilityMode = S.String;

export type HlsTimedMetadataId3Frame = "NONE" | "PRIV" | "TDRL" | (string & {});
export const HlsTimedMetadataId3Frame = S.String;

export interface HlsGroupSettings {
  AdMarkers?: HlsAdMarkers[];
  AdditionalManifests?: HlsAdditionalManifest[];
  AudioOnlyHeader?: HlsAudioOnlyHeader;
  BaseUrl?: string;
  CaptionLanguageMappings?: HlsCaptionLanguageMapping[];
  CaptionLanguageSetting?: HlsCaptionLanguageSetting;
  CaptionSegmentLengthControl?: HlsCaptionSegmentLengthControl;
  ClientCache?: HlsClientCache;
  CodecSpecification?: HlsCodecSpecification;
  Destination?: string;
  DestinationSettings?: DestinationSettings;
  DirectoryStructure?: HlsDirectoryStructure;
  Encryption?: HlsEncryptionSettings;
  ImageBasedTrickPlay?: HlsImageBasedTrickPlay;
  ImageBasedTrickPlaySettings?: HlsImageBasedTrickPlaySettings;
  ImageBasedTrickPlayVariants?: HlsImageBasedTrickPlayVariant[];
  ManifestCompression?: HlsManifestCompression;
  ManifestDurationFormat?: HlsManifestDurationFormat;
  MinFinalSegmentLength?: number;
  MinSegmentLength?: number;
  OutputSelection?: HlsOutputSelection;
  ProgramDateTime?: HlsProgramDateTime;
  ProgramDateTimePeriod?: number;
  ProgressiveWriteHlsManifest?: HlsProgressiveWriteHlsManifest;
  SegmentControl?: HlsSegmentControl;
  SegmentLength?: number;
  SegmentLengthControl?: HlsSegmentLengthControl;
  SegmentsPerSubdirectory?: number;
  StreamInfResolution?: HlsStreamInfResolution;
  TargetDurationCompatibilityMode?: HlsTargetDurationCompatibilityMode;
  TimedMetadataId3Frame?: HlsTimedMetadataId3Frame;
  TimedMetadataId3Period?: number;
  TimestampDeltaMilliseconds?: number;
}
export const HlsGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdMarkers: S.optional(__listOfHlsAdMarkers),
    AdditionalManifests: S.optional(__listOfHlsAdditionalManifest),
    AudioOnlyHeader: S.optional(HlsAudioOnlyHeader),
    BaseUrl: S.optional(S.String),
    CaptionLanguageMappings: S.optional(__listOfHlsCaptionLanguageMapping),
    CaptionLanguageSetting: S.optional(HlsCaptionLanguageSetting),
    CaptionSegmentLengthControl: S.optional(HlsCaptionSegmentLengthControl),
    ClientCache: S.optional(HlsClientCache),
    CodecSpecification: S.optional(HlsCodecSpecification),
    Destination: S.optional(S.String),
    DestinationSettings: S.optional(DestinationSettings),
    DirectoryStructure: S.optional(HlsDirectoryStructure),
    Encryption: S.optional(HlsEncryptionSettings),
    ImageBasedTrickPlay: S.optional(HlsImageBasedTrickPlay),
    ImageBasedTrickPlaySettings: S.optional(HlsImageBasedTrickPlaySettings),
    ImageBasedTrickPlayVariants: S.optional(
      __listOfHlsImageBasedTrickPlayVariant,
    ),
    ManifestCompression: S.optional(HlsManifestCompression),
    ManifestDurationFormat: S.optional(HlsManifestDurationFormat),
    MinFinalSegmentLength: S.optional(S.Number),
    MinSegmentLength: S.optional(S.Number),
    OutputSelection: S.optional(HlsOutputSelection),
    ProgramDateTime: S.optional(HlsProgramDateTime),
    ProgramDateTimePeriod: S.optional(S.Number),
    ProgressiveWriteHlsManifest: S.optional(HlsProgressiveWriteHlsManifest),
    SegmentControl: S.optional(HlsSegmentControl),
    SegmentLength: S.optional(S.Number),
    SegmentLengthControl: S.optional(HlsSegmentLengthControl),
    SegmentsPerSubdirectory: S.optional(S.Number),
    StreamInfResolution: S.optional(HlsStreamInfResolution),
    TargetDurationCompatibilityMode: S.optional(
      HlsTargetDurationCompatibilityMode,
    ),
    TimedMetadataId3Frame: S.optional(HlsTimedMetadataId3Frame),
    TimedMetadataId3Period: S.optional(S.Number),
    TimestampDeltaMilliseconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AdMarkers: "adMarkers",
      AdditionalManifests: "additionalManifests",
      AudioOnlyHeader: "audioOnlyHeader",
      BaseUrl: "baseUrl",
      CaptionLanguageMappings: "captionLanguageMappings",
      CaptionLanguageSetting: "captionLanguageSetting",
      CaptionSegmentLengthControl: "captionSegmentLengthControl",
      ClientCache: "clientCache",
      CodecSpecification: "codecSpecification",
      Destination: "destination",
      DestinationSettings: "destinationSettings",
      DirectoryStructure: "directoryStructure",
      Encryption: "encryption",
      ImageBasedTrickPlay: "imageBasedTrickPlay",
      ImageBasedTrickPlaySettings: "imageBasedTrickPlaySettings",
      ImageBasedTrickPlayVariants: "imageBasedTrickPlayVariants",
      ManifestCompression: "manifestCompression",
      ManifestDurationFormat: "manifestDurationFormat",
      MinFinalSegmentLength: "minFinalSegmentLength",
      MinSegmentLength: "minSegmentLength",
      OutputSelection: "outputSelection",
      ProgramDateTime: "programDateTime",
      ProgramDateTimePeriod: "programDateTimePeriod",
      ProgressiveWriteHlsManifest: "progressiveWriteHlsManifest",
      SegmentControl: "segmentControl",
      SegmentLength: "segmentLength",
      SegmentLengthControl: "segmentLengthControl",
      SegmentsPerSubdirectory: "segmentsPerSubdirectory",
      StreamInfResolution: "streamInfResolution",
      TargetDurationCompatibilityMode: "targetDurationCompatibilityMode",
      TimedMetadataId3Frame: "timedMetadataId3Frame",
      TimedMetadataId3Period: "timedMetadataId3Period",
      TimestampDeltaMilliseconds: "timestampDeltaMilliseconds",
    }),
  ),
).annotate({
  identifier: "HlsGroupSettings",
}) as any as S.Schema<HlsGroupSettings>;
export interface MsSmoothAdditionalManifest {
  ManifestNameModifier?: string;
  SelectedOutputs?: string[];
}
export const MsSmoothAdditionalManifest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ManifestNameModifier: S.optional(S.String),
    SelectedOutputs: S.optional(__listOf__stringMin1),
  }).pipe(
    S.encodeKeys({
      ManifestNameModifier: "manifestNameModifier",
      SelectedOutputs: "selectedOutputs",
    }),
  ),
).annotate({
  identifier: "MsSmoothAdditionalManifest",
}) as any as S.Schema<MsSmoothAdditionalManifest>;
export type __listOfMsSmoothAdditionalManifest = MsSmoothAdditionalManifest[];
export const __listOfMsSmoothAdditionalManifest = /*@__PURE__*/ S.Array(
  MsSmoothAdditionalManifest,
);
export type MsSmoothAudioDeduplication =
  | "COMBINE_DUPLICATE_STREAMS"
  | "NONE"
  | (string & {});
export const MsSmoothAudioDeduplication = S.String;

export interface MsSmoothEncryptionSettings {
  SpekeKeyProvider?: SpekeKeyProvider;
}
export const MsSmoothEncryptionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SpekeKeyProvider: S.optional(SpekeKeyProvider) }).pipe(
    S.encodeKeys({ SpekeKeyProvider: "spekeKeyProvider" }),
  ),
).annotate({
  identifier: "MsSmoothEncryptionSettings",
}) as any as S.Schema<MsSmoothEncryptionSettings>;
export type MsSmoothFragmentLengthControl =
  | "EXACT"
  | "GOP_MULTIPLE"
  | (string & {});
export const MsSmoothFragmentLengthControl = S.String;

export type MsSmoothManifestEncoding = "UTF8" | "UTF16" | (string & {});
export const MsSmoothManifestEncoding = S.String;

export interface MsSmoothGroupSettings {
  AdditionalManifests?: MsSmoothAdditionalManifest[];
  AudioDeduplication?: MsSmoothAudioDeduplication;
  Destination?: string;
  DestinationSettings?: DestinationSettings;
  Encryption?: MsSmoothEncryptionSettings;
  FragmentLength?: number;
  FragmentLengthControl?: MsSmoothFragmentLengthControl;
  ManifestEncoding?: MsSmoothManifestEncoding;
}
export const MsSmoothGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdditionalManifests: S.optional(__listOfMsSmoothAdditionalManifest),
    AudioDeduplication: S.optional(MsSmoothAudioDeduplication),
    Destination: S.optional(S.String),
    DestinationSettings: S.optional(DestinationSettings),
    Encryption: S.optional(MsSmoothEncryptionSettings),
    FragmentLength: S.optional(S.Number),
    FragmentLengthControl: S.optional(MsSmoothFragmentLengthControl),
    ManifestEncoding: S.optional(MsSmoothManifestEncoding),
  }).pipe(
    S.encodeKeys({
      AdditionalManifests: "additionalManifests",
      AudioDeduplication: "audioDeduplication",
      Destination: "destination",
      DestinationSettings: "destinationSettings",
      Encryption: "encryption",
      FragmentLength: "fragmentLength",
      FragmentLengthControl: "fragmentLengthControl",
      ManifestEncoding: "manifestEncoding",
    }),
  ),
).annotate({
  identifier: "MsSmoothGroupSettings",
}) as any as S.Schema<MsSmoothGroupSettings>;
export type FrameMetricType =
  | "PSNR"
  | "SSIM"
  | "MS_SSIM"
  | "PSNR_HVS"
  | "VMAF"
  | "QVBR"
  | "SHOT_CHANGE"
  | (string & {});
export const FrameMetricType = S.String;

export type __listOfFrameMetricType = FrameMetricType[];
export const __listOfFrameMetricType = /*@__PURE__*/ S.Array(FrameMetricType);
export type OutputGroupType =
  | "HLS_GROUP_SETTINGS"
  | "DASH_ISO_GROUP_SETTINGS"
  | "FILE_GROUP_SETTINGS"
  | "MS_SMOOTH_GROUP_SETTINGS"
  | "CMAF_GROUP_SETTINGS"
  | (string & {});
export const OutputGroupType = S.String;

export interface OutputGroupSettings {
  CmafGroupSettings?: CmafGroupSettings;
  DashIsoGroupSettings?: DashIsoGroupSettings;
  FileGroupSettings?: FileGroupSettings;
  HlsGroupSettings?: HlsGroupSettings;
  MsSmoothGroupSettings?: MsSmoothGroupSettings;
  PerFrameMetrics?: FrameMetricType[];
  Type?: OutputGroupType;
}
export const OutputGroupSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CmafGroupSettings: S.optional(CmafGroupSettings),
    DashIsoGroupSettings: S.optional(DashIsoGroupSettings),
    FileGroupSettings: S.optional(FileGroupSettings),
    HlsGroupSettings: S.optional(HlsGroupSettings),
    MsSmoothGroupSettings: S.optional(MsSmoothGroupSettings),
    PerFrameMetrics: S.optional(__listOfFrameMetricType),
    Type: S.optional(OutputGroupType),
  }).pipe(
    S.encodeKeys({
      CmafGroupSettings: "cmafGroupSettings",
      DashIsoGroupSettings: "dashIsoGroupSettings",
      FileGroupSettings: "fileGroupSettings",
      HlsGroupSettings: "hlsGroupSettings",
      MsSmoothGroupSettings: "msSmoothGroupSettings",
      PerFrameMetrics: "perFrameMetrics",
      Type: "type",
    }),
  ),
).annotate({
  identifier: "OutputGroupSettings",
}) as any as S.Schema<OutputGroupSettings>;
export type AudioChannelTag =
  | "L"
  | "R"
  | "C"
  | "LFE"
  | "LS"
  | "RS"
  | "LC"
  | "RC"
  | "CS"
  | "LSD"
  | "RSD"
  | "TCS"
  | "VHL"
  | "VHC"
  | "VHR"
  | "TBL"
  | "TBC"
  | "TBR"
  | "RSL"
  | "RSR"
  | "LW"
  | "RW"
  | "LFE2"
  | "LT"
  | "RT"
  | "HI"
  | "NAR"
  | "M"
  | (string & {});
export const AudioChannelTag = S.String;

export type __listOfAudioChannelTag = AudioChannelTag[];
export const __listOfAudioChannelTag = /*@__PURE__*/ S.Array(AudioChannelTag);
export interface AudioChannelTaggingSettings {
  ChannelTag?: AudioChannelTag;
  ChannelTags?: AudioChannelTag[];
}
export const AudioChannelTaggingSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChannelTag: S.optional(AudioChannelTag),
    ChannelTags: S.optional(__listOfAudioChannelTag),
  }).pipe(
    S.encodeKeys({ ChannelTag: "channelTag", ChannelTags: "channelTags" }),
  ),
).annotate({
  identifier: "AudioChannelTaggingSettings",
}) as any as S.Schema<AudioChannelTaggingSettings>;
export type AudioNormalizationAlgorithm =
  | "ITU_BS_1770_1"
  | "ITU_BS_1770_2"
  | "ITU_BS_1770_3"
  | "ITU_BS_1770_4"
  | (string & {});
export const AudioNormalizationAlgorithm = S.String;

export type AudioNormalizationAlgorithmControl =
  | "CORRECT_AUDIO"
  | "MEASURE_ONLY"
  | (string & {});
export const AudioNormalizationAlgorithmControl = S.String;

export type __integerMinNegative70Max0 = number;
export type AudioNormalizationLoudnessLogging =
  | "LOG"
  | "DONT_LOG"
  | (string & {});
export const AudioNormalizationLoudnessLogging = S.String;

export type AudioNormalizationPeakCalculation =
  | "TRUE_PEAK"
  | "NONE"
  | (string & {});
export const AudioNormalizationPeakCalculation = S.String;

export type __doubleMinNegative59Max0 = number;
export type __doubleMinNegative8Max0 = number;
export interface AudioNormalizationSettings {
  Algorithm?: AudioNormalizationAlgorithm;
  AlgorithmControl?: AudioNormalizationAlgorithmControl;
  CorrectionGateLevel?: number;
  LoudnessLogging?: AudioNormalizationLoudnessLogging;
  PeakCalculation?: AudioNormalizationPeakCalculation;
  TargetLkfs?: number;
  TruePeakLimiterThreshold?: number;
}
export const AudioNormalizationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(AudioNormalizationAlgorithm),
    AlgorithmControl: S.optional(AudioNormalizationAlgorithmControl),
    CorrectionGateLevel: S.optional(S.Number),
    LoudnessLogging: S.optional(AudioNormalizationLoudnessLogging),
    PeakCalculation: S.optional(AudioNormalizationPeakCalculation),
    TargetLkfs: S.optional(S.Number),
    TruePeakLimiterThreshold: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Algorithm: "algorithm",
      AlgorithmControl: "algorithmControl",
      CorrectionGateLevel: "correctionGateLevel",
      LoudnessLogging: "loudnessLogging",
      PeakCalculation: "peakCalculation",
      TargetLkfs: "targetLkfs",
      TruePeakLimiterThreshold: "truePeakLimiterThreshold",
    }),
  ),
).annotate({
  identifier: "AudioNormalizationSettings",
}) as any as S.Schema<AudioNormalizationSettings>;
export type SlowPalPitchCorrection = "DISABLED" | "ENABLED" | (string & {});
export const SlowPalPitchCorrection = S.String;

export interface AudioPitchCorrectionSettings {
  SlowPalPitchCorrection?: SlowPalPitchCorrection;
}
export const AudioPitchCorrectionSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ SlowPalPitchCorrection: S.optional(SlowPalPitchCorrection) }).pipe(
    S.encodeKeys({ SlowPalPitchCorrection: "slowPalPitchCorrection" }),
  ),
).annotate({
  identifier: "AudioPitchCorrectionSettings",
}) as any as S.Schema<AudioPitchCorrectionSettings>;
export type __integerMin0Max255 = number;
export type AudioTypeControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export const AudioTypeControl = S.String;

export type AacAudioDescriptionBroadcasterMix =
  | "BROADCASTER_MIXED_AD"
  | "NORMAL"
  | (string & {});
export const AacAudioDescriptionBroadcasterMix = S.String;

export type __integerMin6000Max1024000 = number;
export type AacCodecProfile = "LC" | "HEV1" | "HEV2" | "XHE" | (string & {});
export const AacCodecProfile = S.String;

export type AacCodingMode =
  | "AD_RECEIVER_MIX"
  | "CODING_MODE_1_0"
  | "CODING_MODE_1_1"
  | "CODING_MODE_2_0"
  | "CODING_MODE_5_1"
  | "CODING_MODE_AUTO"
  | (string & {});
export const AacCodingMode = S.String;

export type AacLoudnessMeasurementMode = "PROGRAM" | "ANCHOR" | (string & {});
export const AacLoudnessMeasurementMode = S.String;

export type __integerMin2000Max30000 = number;
export type AacRateControlMode = "CBR" | "VBR" | (string & {});
export const AacRateControlMode = S.String;

export type AacRawFormat = "LATM_LOAS" | "NONE" | (string & {});
export const AacRawFormat = S.String;

export type __integerMin8000Max96000 = number;
export type AacSpecification = "MPEG2" | "MPEG4" | (string & {});
export const AacSpecification = S.String;

export type __integerMin6Max16 = number;
export type AacVbrQuality =
  | "LOW"
  | "MEDIUM_LOW"
  | "MEDIUM_HIGH"
  | "HIGH"
  | (string & {});
export const AacVbrQuality = S.String;

export interface AacSettings {
  AudioDescriptionBroadcasterMix?: AacAudioDescriptionBroadcasterMix;
  Bitrate?: number;
  CodecProfile?: AacCodecProfile;
  CodingMode?: AacCodingMode;
  LoudnessMeasurementMode?: AacLoudnessMeasurementMode;
  RapInterval?: number;
  RateControlMode?: AacRateControlMode;
  RawFormat?: AacRawFormat;
  SampleRate?: number;
  Specification?: AacSpecification;
  TargetLoudnessRange?: number;
  VbrQuality?: AacVbrQuality;
}
export const AacSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDescriptionBroadcasterMix: S.optional(
      AacAudioDescriptionBroadcasterMix,
    ),
    Bitrate: S.optional(S.Number),
    CodecProfile: S.optional(AacCodecProfile),
    CodingMode: S.optional(AacCodingMode),
    LoudnessMeasurementMode: S.optional(AacLoudnessMeasurementMode),
    RapInterval: S.optional(S.Number),
    RateControlMode: S.optional(AacRateControlMode),
    RawFormat: S.optional(AacRawFormat),
    SampleRate: S.optional(S.Number),
    Specification: S.optional(AacSpecification),
    TargetLoudnessRange: S.optional(S.Number),
    VbrQuality: S.optional(AacVbrQuality),
  }).pipe(
    S.encodeKeys({
      AudioDescriptionBroadcasterMix: "audioDescriptionBroadcasterMix",
      Bitrate: "bitrate",
      CodecProfile: "codecProfile",
      CodingMode: "codingMode",
      LoudnessMeasurementMode: "loudnessMeasurementMode",
      RapInterval: "rapInterval",
      RateControlMode: "rateControlMode",
      RawFormat: "rawFormat",
      SampleRate: "sampleRate",
      Specification: "specification",
      TargetLoudnessRange: "targetLoudnessRange",
      VbrQuality: "vbrQuality",
    }),
  ),
).annotate({ identifier: "AacSettings" }) as any as S.Schema<AacSettings>;
export type __integerMin64000Max640000 = number;
export type Ac3BitstreamMode =
  | "COMPLETE_MAIN"
  | "COMMENTARY"
  | "DIALOGUE"
  | "EMERGENCY"
  | "HEARING_IMPAIRED"
  | "MUSIC_AND_EFFECTS"
  | "VISUALLY_IMPAIRED"
  | "VOICE_OVER"
  | (string & {});
export const Ac3BitstreamMode = S.String;

export type Ac3CodingMode =
  | "CODING_MODE_1_0"
  | "CODING_MODE_1_1"
  | "CODING_MODE_2_0"
  | "CODING_MODE_3_2_LFE"
  | "CODING_MODE_AUTO"
  | (string & {});
export const Ac3CodingMode = S.String;

export type __integerMin1Max31 = number;
export type Ac3DynamicRangeCompressionLine =
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | "NONE"
  | (string & {});
export const Ac3DynamicRangeCompressionLine = S.String;

export type Ac3DynamicRangeCompressionProfile =
  | "FILM_STANDARD"
  | "NONE"
  | (string & {});
export const Ac3DynamicRangeCompressionProfile = S.String;

export type Ac3DynamicRangeCompressionRf =
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | "NONE"
  | (string & {});
export const Ac3DynamicRangeCompressionRf = S.String;

export type Ac3LfeFilter = "ENABLED" | "DISABLED" | (string & {});
export const Ac3LfeFilter = S.String;

export type Ac3MetadataControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export const Ac3MetadataControl = S.String;

export type __integerMin48000Max48000 = number;
export interface Ac3Settings {
  Bitrate?: number;
  BitstreamMode?: Ac3BitstreamMode;
  CodingMode?: Ac3CodingMode;
  Dialnorm?: number;
  DynamicRangeCompressionLine?: Ac3DynamicRangeCompressionLine;
  DynamicRangeCompressionProfile?: Ac3DynamicRangeCompressionProfile;
  DynamicRangeCompressionRf?: Ac3DynamicRangeCompressionRf;
  LfeFilter?: Ac3LfeFilter;
  MetadataControl?: Ac3MetadataControl;
  SampleRate?: number;
}
export const Ac3Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bitrate: S.optional(S.Number),
    BitstreamMode: S.optional(Ac3BitstreamMode),
    CodingMode: S.optional(Ac3CodingMode),
    Dialnorm: S.optional(S.Number),
    DynamicRangeCompressionLine: S.optional(Ac3DynamicRangeCompressionLine),
    DynamicRangeCompressionProfile: S.optional(
      Ac3DynamicRangeCompressionProfile,
    ),
    DynamicRangeCompressionRf: S.optional(Ac3DynamicRangeCompressionRf),
    LfeFilter: S.optional(Ac3LfeFilter),
    MetadataControl: S.optional(Ac3MetadataControl),
    SampleRate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Bitrate: "bitrate",
      BitstreamMode: "bitstreamMode",
      CodingMode: "codingMode",
      Dialnorm: "dialnorm",
      DynamicRangeCompressionLine: "dynamicRangeCompressionLine",
      DynamicRangeCompressionProfile: "dynamicRangeCompressionProfile",
      DynamicRangeCompressionRf: "dynamicRangeCompressionRf",
      LfeFilter: "lfeFilter",
      MetadataControl: "metadataControl",
      SampleRate: "sampleRate",
    }),
  ),
).annotate({ identifier: "Ac3Settings" }) as any as S.Schema<Ac3Settings>;
export type __integerMin48000Max768000 = number;
export type Ac4BitstreamMode = "COMPLETE_MAIN" | "EMERGENCY" | (string & {});
export const Ac4BitstreamMode = S.String;

export type Ac4CodingMode =
  | "CODING_MODE_2_0"
  | "CODING_MODE_3_2_LFE"
  | "CODING_MODE_5_1_4"
  | (string & {});
export const Ac4CodingMode = S.String;

export type Ac4DynamicRangeCompressionDrcProfile =
  | "NONE"
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | (string & {});
export const Ac4DynamicRangeCompressionDrcProfile = S.String;

export type __doubleMinNegative1000Max3 = number;
export type __doubleMinNegative1000MaxNegative1 = number;
export type Ac4StereoDownmix =
  | "NOT_INDICATED"
  | "LO_RO"
  | "LT_RT"
  | "DPL2"
  | (string & {});
export const Ac4StereoDownmix = S.String;

export interface Ac4Settings {
  Bitrate?: number;
  BitstreamMode?: Ac4BitstreamMode;
  CodingMode?: Ac4CodingMode;
  DynamicRangeCompressionFlatPanelTv?: Ac4DynamicRangeCompressionDrcProfile;
  DynamicRangeCompressionHomeTheater?: Ac4DynamicRangeCompressionDrcProfile;
  DynamicRangeCompressionPortableHeadphones?: Ac4DynamicRangeCompressionDrcProfile;
  DynamicRangeCompressionPortableSpeakers?: Ac4DynamicRangeCompressionDrcProfile;
  LoRoCenterMixLevel?: number;
  LoRoSurroundMixLevel?: number;
  LtRtCenterMixLevel?: number;
  LtRtSurroundMixLevel?: number;
  SampleRate?: number;
  StereoDownmix?: Ac4StereoDownmix;
}
export const Ac4Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bitrate: S.optional(S.Number),
    BitstreamMode: S.optional(Ac4BitstreamMode),
    CodingMode: S.optional(Ac4CodingMode),
    DynamicRangeCompressionFlatPanelTv: S.optional(
      Ac4DynamicRangeCompressionDrcProfile,
    ),
    DynamicRangeCompressionHomeTheater: S.optional(
      Ac4DynamicRangeCompressionDrcProfile,
    ),
    DynamicRangeCompressionPortableHeadphones: S.optional(
      Ac4DynamicRangeCompressionDrcProfile,
    ),
    DynamicRangeCompressionPortableSpeakers: S.optional(
      Ac4DynamicRangeCompressionDrcProfile,
    ),
    LoRoCenterMixLevel: S.optional(S.Number),
    LoRoSurroundMixLevel: S.optional(S.Number),
    LtRtCenterMixLevel: S.optional(S.Number),
    LtRtSurroundMixLevel: S.optional(S.Number),
    SampleRate: S.optional(S.Number),
    StereoDownmix: S.optional(Ac4StereoDownmix),
  }).pipe(
    S.encodeKeys({
      Bitrate: "bitrate",
      BitstreamMode: "bitstreamMode",
      CodingMode: "codingMode",
      DynamicRangeCompressionFlatPanelTv: "dynamicRangeCompressionFlatPanelTv",
      DynamicRangeCompressionHomeTheater: "dynamicRangeCompressionHomeTheater",
      DynamicRangeCompressionPortableHeadphones:
        "dynamicRangeCompressionPortableHeadphones",
      DynamicRangeCompressionPortableSpeakers:
        "dynamicRangeCompressionPortableSpeakers",
      LoRoCenterMixLevel: "loRoCenterMixLevel",
      LoRoSurroundMixLevel: "loRoSurroundMixLevel",
      LtRtCenterMixLevel: "ltRtCenterMixLevel",
      LtRtSurroundMixLevel: "ltRtSurroundMixLevel",
      SampleRate: "sampleRate",
      StereoDownmix: "stereoDownmix",
    }),
  ),
).annotate({ identifier: "Ac4Settings" }) as any as S.Schema<Ac4Settings>;
export type __integerMin16Max24 = number;
export type __integerMin0Max64 = number;
export type __integerMin8000Max192000 = number;
export interface AiffSettings {
  BitDepth?: number;
  Channels?: number;
  SampleRate?: number;
}
export const AiffSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BitDepth: S.optional(S.Number),
    Channels: S.optional(S.Number),
    SampleRate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BitDepth: "bitDepth",
      Channels: "channels",
      SampleRate: "sampleRate",
    }),
  ),
).annotate({ identifier: "AiffSettings" }) as any as S.Schema<AiffSettings>;
export type AudioCodec =
  | "AAC"
  | "MP2"
  | "MP3"
  | "WAV"
  | "AIFF"
  | "AC3"
  | "AC4"
  | "EAC3"
  | "EAC3_ATMOS"
  | "VORBIS"
  | "OPUS"
  | "PASSTHROUGH"
  | "FLAC"
  | (string & {});
export const AudioCodec = S.String;

export type __integerMin384000Max1024000 = number;
export type Eac3AtmosBitstreamMode = "COMPLETE_MAIN" | (string & {});
export const Eac3AtmosBitstreamMode = S.String;

export type Eac3AtmosCodingMode =
  | "CODING_MODE_AUTO"
  | "CODING_MODE_5_1_4"
  | "CODING_MODE_7_1_4"
  | "CODING_MODE_9_1_6"
  | (string & {});
export const Eac3AtmosCodingMode = S.String;

export type Eac3AtmosDialogueIntelligence =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const Eac3AtmosDialogueIntelligence = S.String;

export type Eac3AtmosDownmixControl =
  | "SPECIFIED"
  | "INITIALIZE_FROM_SOURCE"
  | (string & {});
export const Eac3AtmosDownmixControl = S.String;

export type Eac3AtmosDynamicRangeCompressionLine =
  | "NONE"
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | (string & {});
export const Eac3AtmosDynamicRangeCompressionLine = S.String;

export type Eac3AtmosDynamicRangeCompressionRf =
  | "NONE"
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | (string & {});
export const Eac3AtmosDynamicRangeCompressionRf = S.String;

export type Eac3AtmosDynamicRangeControl =
  | "SPECIFIED"
  | "INITIALIZE_FROM_SOURCE"
  | (string & {});
export const Eac3AtmosDynamicRangeControl = S.String;

export type __doubleMinNegative6Max3 = number;
export type __doubleMinNegative60MaxNegative1 = number;
export type Eac3AtmosMeteringMode =
  | "LEQ_A"
  | "ITU_BS_1770_1"
  | "ITU_BS_1770_2"
  | "ITU_BS_1770_3"
  | "ITU_BS_1770_4"
  | (string & {});
export const Eac3AtmosMeteringMode = S.String;

export type Eac3AtmosStereoDownmix =
  | "NOT_INDICATED"
  | "STEREO"
  | "SURROUND"
  | "DPL2"
  | (string & {});
export const Eac3AtmosStereoDownmix = S.String;

export type Eac3AtmosSurroundExMode =
  | "NOT_INDICATED"
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const Eac3AtmosSurroundExMode = S.String;

export interface Eac3AtmosSettings {
  Bitrate?: number;
  BitstreamMode?: Eac3AtmosBitstreamMode;
  CodingMode?: Eac3AtmosCodingMode;
  DialogueIntelligence?: Eac3AtmosDialogueIntelligence;
  DownmixControl?: Eac3AtmosDownmixControl;
  DynamicRangeCompressionLine?: Eac3AtmosDynamicRangeCompressionLine;
  DynamicRangeCompressionRf?: Eac3AtmosDynamicRangeCompressionRf;
  DynamicRangeControl?: Eac3AtmosDynamicRangeControl;
  LoRoCenterMixLevel?: number;
  LoRoSurroundMixLevel?: number;
  LtRtCenterMixLevel?: number;
  LtRtSurroundMixLevel?: number;
  MeteringMode?: Eac3AtmosMeteringMode;
  SampleRate?: number;
  SpeechThreshold?: number;
  StereoDownmix?: Eac3AtmosStereoDownmix;
  SurroundExMode?: Eac3AtmosSurroundExMode;
}
export const Eac3AtmosSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bitrate: S.optional(S.Number),
    BitstreamMode: S.optional(Eac3AtmosBitstreamMode),
    CodingMode: S.optional(Eac3AtmosCodingMode),
    DialogueIntelligence: S.optional(Eac3AtmosDialogueIntelligence),
    DownmixControl: S.optional(Eac3AtmosDownmixControl),
    DynamicRangeCompressionLine: S.optional(
      Eac3AtmosDynamicRangeCompressionLine,
    ),
    DynamicRangeCompressionRf: S.optional(Eac3AtmosDynamicRangeCompressionRf),
    DynamicRangeControl: S.optional(Eac3AtmosDynamicRangeControl),
    LoRoCenterMixLevel: S.optional(S.Number),
    LoRoSurroundMixLevel: S.optional(S.Number),
    LtRtCenterMixLevel: S.optional(S.Number),
    LtRtSurroundMixLevel: S.optional(S.Number),
    MeteringMode: S.optional(Eac3AtmosMeteringMode),
    SampleRate: S.optional(S.Number),
    SpeechThreshold: S.optional(S.Number),
    StereoDownmix: S.optional(Eac3AtmosStereoDownmix),
    SurroundExMode: S.optional(Eac3AtmosSurroundExMode),
  }).pipe(
    S.encodeKeys({
      Bitrate: "bitrate",
      BitstreamMode: "bitstreamMode",
      CodingMode: "codingMode",
      DialogueIntelligence: "dialogueIntelligence",
      DownmixControl: "downmixControl",
      DynamicRangeCompressionLine: "dynamicRangeCompressionLine",
      DynamicRangeCompressionRf: "dynamicRangeCompressionRf",
      DynamicRangeControl: "dynamicRangeControl",
      LoRoCenterMixLevel: "loRoCenterMixLevel",
      LoRoSurroundMixLevel: "loRoSurroundMixLevel",
      LtRtCenterMixLevel: "ltRtCenterMixLevel",
      LtRtSurroundMixLevel: "ltRtSurroundMixLevel",
      MeteringMode: "meteringMode",
      SampleRate: "sampleRate",
      SpeechThreshold: "speechThreshold",
      StereoDownmix: "stereoDownmix",
      SurroundExMode: "surroundExMode",
    }),
  ),
).annotate({
  identifier: "Eac3AtmosSettings",
}) as any as S.Schema<Eac3AtmosSettings>;
export type Eac3AttenuationControl = "ATTENUATE_3_DB" | "NONE" | (string & {});
export const Eac3AttenuationControl = S.String;

export type __integerMin32000Max3024000 = number;
export type Eac3BitstreamMode =
  | "COMPLETE_MAIN"
  | "COMMENTARY"
  | "EMERGENCY"
  | "HEARING_IMPAIRED"
  | "VISUALLY_IMPAIRED"
  | (string & {});
export const Eac3BitstreamMode = S.String;

export type Eac3CodingMode =
  | "CODING_MODE_1_0"
  | "CODING_MODE_2_0"
  | "CODING_MODE_3_2"
  | "CODING_MODE_AUTO"
  | (string & {});
export const Eac3CodingMode = S.String;

export type Eac3DcFilter = "ENABLED" | "DISABLED" | (string & {});
export const Eac3DcFilter = S.String;

export type Eac3DynamicRangeCompressionLine =
  | "NONE"
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | (string & {});
export const Eac3DynamicRangeCompressionLine = S.String;

export type Eac3DynamicRangeCompressionRf =
  | "NONE"
  | "FILM_STANDARD"
  | "FILM_LIGHT"
  | "MUSIC_STANDARD"
  | "MUSIC_LIGHT"
  | "SPEECH"
  | (string & {});
export const Eac3DynamicRangeCompressionRf = S.String;

export type Eac3LfeControl = "LFE" | "NO_LFE" | (string & {});
export const Eac3LfeControl = S.String;

export type Eac3LfeFilter = "ENABLED" | "DISABLED" | (string & {});
export const Eac3LfeFilter = S.String;

export type __doubleMinNegative60Max3 = number;
export type Eac3MetadataControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export const Eac3MetadataControl = S.String;

export type Eac3PassthroughControl =
  | "WHEN_POSSIBLE"
  | "NO_PASSTHROUGH"
  | (string & {});
export const Eac3PassthroughControl = S.String;

export type Eac3PhaseControl = "SHIFT_90_DEGREES" | "NO_SHIFT" | (string & {});
export const Eac3PhaseControl = S.String;

export type Eac3StereoDownmix =
  | "NOT_INDICATED"
  | "LO_RO"
  | "LT_RT"
  | "DPL2"
  | (string & {});
export const Eac3StereoDownmix = S.String;

export type Eac3SurroundExMode =
  | "NOT_INDICATED"
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const Eac3SurroundExMode = S.String;

export type Eac3SurroundMode =
  | "NOT_INDICATED"
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const Eac3SurroundMode = S.String;

export interface Eac3Settings {
  AttenuationControl?: Eac3AttenuationControl;
  Bitrate?: number;
  BitstreamMode?: Eac3BitstreamMode;
  CodingMode?: Eac3CodingMode;
  DcFilter?: Eac3DcFilter;
  Dialnorm?: number;
  DynamicRangeCompressionLine?: Eac3DynamicRangeCompressionLine;
  DynamicRangeCompressionRf?: Eac3DynamicRangeCompressionRf;
  LfeControl?: Eac3LfeControl;
  LfeFilter?: Eac3LfeFilter;
  LoRoCenterMixLevel?: number;
  LoRoSurroundMixLevel?: number;
  LtRtCenterMixLevel?: number;
  LtRtSurroundMixLevel?: number;
  MetadataControl?: Eac3MetadataControl;
  PassthroughControl?: Eac3PassthroughControl;
  PhaseControl?: Eac3PhaseControl;
  SampleRate?: number;
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
    DynamicRangeCompressionLine: S.optional(Eac3DynamicRangeCompressionLine),
    DynamicRangeCompressionRf: S.optional(Eac3DynamicRangeCompressionRf),
    LfeControl: S.optional(Eac3LfeControl),
    LfeFilter: S.optional(Eac3LfeFilter),
    LoRoCenterMixLevel: S.optional(S.Number),
    LoRoSurroundMixLevel: S.optional(S.Number),
    LtRtCenterMixLevel: S.optional(S.Number),
    LtRtSurroundMixLevel: S.optional(S.Number),
    MetadataControl: S.optional(Eac3MetadataControl),
    PassthroughControl: S.optional(Eac3PassthroughControl),
    PhaseControl: S.optional(Eac3PhaseControl),
    SampleRate: S.optional(S.Number),
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
      DynamicRangeCompressionLine: "dynamicRangeCompressionLine",
      DynamicRangeCompressionRf: "dynamicRangeCompressionRf",
      LfeControl: "lfeControl",
      LfeFilter: "lfeFilter",
      LoRoCenterMixLevel: "loRoCenterMixLevel",
      LoRoSurroundMixLevel: "loRoSurroundMixLevel",
      LtRtCenterMixLevel: "ltRtCenterMixLevel",
      LtRtSurroundMixLevel: "ltRtSurroundMixLevel",
      MetadataControl: "metadataControl",
      PassthroughControl: "passthroughControl",
      PhaseControl: "phaseControl",
      SampleRate: "sampleRate",
      StereoDownmix: "stereoDownmix",
      SurroundExMode: "surroundExMode",
      SurroundMode: "surroundMode",
    }),
  ),
).annotate({ identifier: "Eac3Settings" }) as any as S.Schema<Eac3Settings>;
export type __integerMin22050Max192000 = number;
export interface FlacSettings {
  BitDepth?: number;
  Channels?: number;
  SampleRate?: number;
}
export const FlacSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BitDepth: S.optional(S.Number),
    Channels: S.optional(S.Number),
    SampleRate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BitDepth: "bitDepth",
      Channels: "channels",
      SampleRate: "sampleRate",
    }),
  ),
).annotate({ identifier: "FlacSettings" }) as any as S.Schema<FlacSettings>;
export type Mp2AudioDescriptionMix =
  | "BROADCASTER_MIXED_AD"
  | "NONE"
  | (string & {});
export const Mp2AudioDescriptionMix = S.String;

export type __integerMin32000Max384000 = number;
export type __integerMin0Max2 = number;
export interface Mp2Settings {
  AudioDescriptionMix?: Mp2AudioDescriptionMix;
  Bitrate?: number;
  Channels?: number;
  SampleRate?: number;
}
export const Mp2Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDescriptionMix: S.optional(Mp2AudioDescriptionMix),
    Bitrate: S.optional(S.Number),
    Channels: S.optional(S.Number),
    SampleRate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AudioDescriptionMix: "audioDescriptionMix",
      Bitrate: "bitrate",
      Channels: "channels",
      SampleRate: "sampleRate",
    }),
  ),
).annotate({ identifier: "Mp2Settings" }) as any as S.Schema<Mp2Settings>;
export type __integerMin16000Max320000 = number;
export type Mp3RateControlMode = "CBR" | "VBR" | (string & {});
export const Mp3RateControlMode = S.String;

export type __integerMin22050Max48000 = number;
export type __integerMin0Max9 = number;
export interface Mp3Settings {
  Bitrate?: number;
  Channels?: number;
  RateControlMode?: Mp3RateControlMode;
  SampleRate?: number;
  VbrQuality?: number;
}
export const Mp3Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bitrate: S.optional(S.Number),
    Channels: S.optional(S.Number),
    RateControlMode: S.optional(Mp3RateControlMode),
    SampleRate: S.optional(S.Number),
    VbrQuality: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Bitrate: "bitrate",
      Channels: "channels",
      RateControlMode: "rateControlMode",
      SampleRate: "sampleRate",
      VbrQuality: "vbrQuality",
    }),
  ),
).annotate({ identifier: "Mp3Settings" }) as any as S.Schema<Mp3Settings>;
export type __integerMin32000Max192000 = number;
export type __integerMin16000Max48000 = number;
export interface OpusSettings {
  Bitrate?: number;
  Channels?: number;
  SampleRate?: number;
}
export const OpusSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bitrate: S.optional(S.Number),
    Channels: S.optional(S.Number),
    SampleRate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Bitrate: "bitrate",
      Channels: "channels",
      SampleRate: "sampleRate",
    }),
  ),
).annotate({ identifier: "OpusSettings" }) as any as S.Schema<OpusSettings>;
export type __integerMinNegative1Max10 = number;
export interface VorbisSettings {
  Channels?: number;
  SampleRate?: number;
  VbrQuality?: number;
}
export const VorbisSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Channels: S.optional(S.Number),
    SampleRate: S.optional(S.Number),
    VbrQuality: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Channels: "channels",
      SampleRate: "sampleRate",
      VbrQuality: "vbrQuality",
    }),
  ),
).annotate({ identifier: "VorbisSettings" }) as any as S.Schema<VorbisSettings>;
export type WavFormat = "RIFF" | "RF64" | "EXTENSIBLE" | (string & {});
export const WavFormat = S.String;

export interface WavSettings {
  BitDepth?: number;
  Channels?: number;
  Format?: WavFormat;
  SampleRate?: number;
}
export const WavSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BitDepth: S.optional(S.Number),
    Channels: S.optional(S.Number),
    Format: S.optional(WavFormat),
    SampleRate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BitDepth: "bitDepth",
      Channels: "channels",
      Format: "format",
      SampleRate: "sampleRate",
    }),
  ),
).annotate({ identifier: "WavSettings" }) as any as S.Schema<WavSettings>;
export interface AudioCodecSettings {
  AacSettings?: AacSettings;
  Ac3Settings?: Ac3Settings;
  Ac4Settings?: Ac4Settings;
  AiffSettings?: AiffSettings;
  Codec?: AudioCodec;
  Eac3AtmosSettings?: Eac3AtmosSettings;
  Eac3Settings?: Eac3Settings;
  FlacSettings?: FlacSettings;
  Mp2Settings?: Mp2Settings;
  Mp3Settings?: Mp3Settings;
  OpusSettings?: OpusSettings;
  VorbisSettings?: VorbisSettings;
  WavSettings?: WavSettings;
}
export const AudioCodecSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AacSettings: S.optional(AacSettings),
    Ac3Settings: S.optional(Ac3Settings),
    Ac4Settings: S.optional(Ac4Settings),
    AiffSettings: S.optional(AiffSettings),
    Codec: S.optional(AudioCodec),
    Eac3AtmosSettings: S.optional(Eac3AtmosSettings),
    Eac3Settings: S.optional(Eac3Settings),
    FlacSettings: S.optional(FlacSettings),
    Mp2Settings: S.optional(Mp2Settings),
    Mp3Settings: S.optional(Mp3Settings),
    OpusSettings: S.optional(OpusSettings),
    VorbisSettings: S.optional(VorbisSettings),
    WavSettings: S.optional(WavSettings),
  }).pipe(
    S.encodeKeys({
      AacSettings: "aacSettings",
      Ac3Settings: "ac3Settings",
      Ac4Settings: "ac4Settings",
      AiffSettings: "aiffSettings",
      Codec: "codec",
      Eac3AtmosSettings: "eac3AtmosSettings",
      Eac3Settings: "eac3Settings",
      FlacSettings: "flacSettings",
      Mp2Settings: "mp2Settings",
      Mp3Settings: "mp3Settings",
      OpusSettings: "opusSettings",
      VorbisSettings: "vorbisSettings",
      WavSettings: "wavSettings",
    }),
  ),
).annotate({
  identifier: "AudioCodecSettings",
}) as any as S.Schema<AudioCodecSettings>;
export type __stringPatternAZaZ23AZaZ09 = string;
export type AudioLanguageCodeControl =
  | "FOLLOW_INPUT"
  | "USE_CONFIGURED"
  | (string & {});
export const AudioLanguageCodeControl = S.String;

export type __stringPatternWS = string;
export interface AudioDescription {
  AudioChannelTaggingSettings?: AudioChannelTaggingSettings;
  AudioNormalizationSettings?: AudioNormalizationSettings;
  AudioPitchCorrectionSettings?: AudioPitchCorrectionSettings;
  AudioSourceName?: string;
  AudioType?: number;
  AudioTypeControl?: AudioTypeControl;
  CodecSettings?: AudioCodecSettings;
  CustomLanguageCode?: string;
  LanguageCode?: LanguageCode;
  LanguageCodeControl?: AudioLanguageCodeControl;
  RemixSettings?: RemixSettings;
  StreamName?: string;
}
export const AudioDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioChannelTaggingSettings: S.optional(AudioChannelTaggingSettings),
    AudioNormalizationSettings: S.optional(AudioNormalizationSettings),
    AudioPitchCorrectionSettings: S.optional(AudioPitchCorrectionSettings),
    AudioSourceName: S.optional(S.String),
    AudioType: S.optional(S.Number),
    AudioTypeControl: S.optional(AudioTypeControl),
    CodecSettings: S.optional(AudioCodecSettings),
    CustomLanguageCode: S.optional(S.String),
    LanguageCode: S.optional(LanguageCode),
    LanguageCodeControl: S.optional(AudioLanguageCodeControl),
    RemixSettings: S.optional(RemixSettings),
    StreamName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AudioChannelTaggingSettings: "audioChannelTaggingSettings",
      AudioNormalizationSettings: "audioNormalizationSettings",
      AudioPitchCorrectionSettings: "audioPitchCorrectionSettings",
      AudioSourceName: "audioSourceName",
      AudioType: "audioType",
      AudioTypeControl: "audioTypeControl",
      CodecSettings: "codecSettings",
      CustomLanguageCode: "customLanguageCode",
      LanguageCode: "languageCode",
      LanguageCodeControl: "languageCodeControl",
      RemixSettings: "remixSettings",
      StreamName: "streamName",
    }),
  ),
).annotate({
  identifier: "AudioDescription",
}) as any as S.Schema<AudioDescription>;
export type __listOfAudioDescription = AudioDescription[];
export const __listOfAudioDescription = /*@__PURE__*/ S.Array(AudioDescription);
export type __stringPatternAZaZ23AZaZ = string;
export type BurninSubtitleAlignment =
  | "CENTERED"
  | "LEFT"
  | "AUTO"
  | (string & {});
export const BurninSubtitleAlignment = S.String;

export type BurninSubtitleApplyFontColor =
  | "WHITE_TEXT_ONLY"
  | "ALL_TEXT"
  | (string & {});
export const BurninSubtitleApplyFontColor = S.String;

export type BurninSubtitleBackgroundColor =
  | "NONE"
  | "BLACK"
  | "WHITE"
  | "AUTO"
  | (string & {});
export const BurninSubtitleBackgroundColor = S.String;

export type BurninSubtitleFallbackFont =
  | "BEST_MATCH"
  | "MONOSPACED_SANSSERIF"
  | "MONOSPACED_SERIF"
  | "PROPORTIONAL_SANSSERIF"
  | "PROPORTIONAL_SERIF"
  | (string & {});
export const BurninSubtitleFallbackFont = S.String;

export type BurninSubtitleFontColor =
  | "WHITE"
  | "BLACK"
  | "YELLOW"
  | "RED"
  | "GREEN"
  | "BLUE"
  | "HEX"
  | "AUTO"
  | (string & {});
export const BurninSubtitleFontColor = S.String;

export type __stringPatternS3TtfHttpsTtf = string;
export type __integerMin96Max600 = number;
export type FontScript = "AUTOMATIC" | "HANS" | "HANT" | (string & {});
export const FontScript = S.String;

export type __integerMin0Max96 = number;
export type __stringMin6Max8Pattern09aFAF609aFAF2 = string;
export type BurninSubtitleOutlineColor =
  | "BLACK"
  | "WHITE"
  | "YELLOW"
  | "RED"
  | "GREEN"
  | "BLUE"
  | "AUTO"
  | (string & {});
export const BurninSubtitleOutlineColor = S.String;

export type __integerMin0Max10 = number;
export type RemoveRubyReserveAttributes =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const RemoveRubyReserveAttributes = S.String;

export type BurninSubtitleShadowColor =
  | "NONE"
  | "BLACK"
  | "WHITE"
  | "AUTO"
  | (string & {});
export const BurninSubtitleShadowColor = S.String;

export type BurnInSubtitleStylePassthrough =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const BurnInSubtitleStylePassthrough = S.String;

export type BurninSubtitleTeletextSpacing =
  | "FIXED_GRID"
  | "PROPORTIONAL"
  | "AUTO"
  | (string & {});
export const BurninSubtitleTeletextSpacing = S.String;

export interface BurninDestinationSettings {
  Alignment?: BurninSubtitleAlignment;
  ApplyFontColor?: BurninSubtitleApplyFontColor;
  BackgroundColor?: BurninSubtitleBackgroundColor;
  BackgroundOpacity?: number;
  FallbackFont?: BurninSubtitleFallbackFont;
  FontColor?: BurninSubtitleFontColor;
  FontFileBold?: string;
  FontFileBoldItalic?: string;
  FontFileItalic?: string;
  FontFileRegular?: string;
  FontOpacity?: number;
  FontResolution?: number;
  FontScript?: FontScript;
  FontSize?: number;
  HexFontColor?: string;
  OutlineColor?: BurninSubtitleOutlineColor;
  OutlineSize?: number;
  RemoveRubyReserveAttributes?: RemoveRubyReserveAttributes;
  ShadowColor?: BurninSubtitleShadowColor;
  ShadowOpacity?: number;
  ShadowXOffset?: number;
  ShadowYOffset?: number;
  StylePassthrough?: BurnInSubtitleStylePassthrough;
  TeletextSpacing?: BurninSubtitleTeletextSpacing;
  XPosition?: number;
  YPosition?: number;
}
export const BurninDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Alignment: S.optional(BurninSubtitleAlignment),
    ApplyFontColor: S.optional(BurninSubtitleApplyFontColor),
    BackgroundColor: S.optional(BurninSubtitleBackgroundColor),
    BackgroundOpacity: S.optional(S.Number),
    FallbackFont: S.optional(BurninSubtitleFallbackFont),
    FontColor: S.optional(BurninSubtitleFontColor),
    FontFileBold: S.optional(S.String),
    FontFileBoldItalic: S.optional(S.String),
    FontFileItalic: S.optional(S.String),
    FontFileRegular: S.optional(S.String),
    FontOpacity: S.optional(S.Number),
    FontResolution: S.optional(S.Number),
    FontScript: S.optional(FontScript),
    FontSize: S.optional(S.Number),
    HexFontColor: S.optional(S.String),
    OutlineColor: S.optional(BurninSubtitleOutlineColor),
    OutlineSize: S.optional(S.Number),
    RemoveRubyReserveAttributes: S.optional(RemoveRubyReserveAttributes),
    ShadowColor: S.optional(BurninSubtitleShadowColor),
    ShadowOpacity: S.optional(S.Number),
    ShadowXOffset: S.optional(S.Number),
    ShadowYOffset: S.optional(S.Number),
    StylePassthrough: S.optional(BurnInSubtitleStylePassthrough),
    TeletextSpacing: S.optional(BurninSubtitleTeletextSpacing),
    XPosition: S.optional(S.Number),
    YPosition: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Alignment: "alignment",
      ApplyFontColor: "applyFontColor",
      BackgroundColor: "backgroundColor",
      BackgroundOpacity: "backgroundOpacity",
      FallbackFont: "fallbackFont",
      FontColor: "fontColor",
      FontFileBold: "fontFileBold",
      FontFileBoldItalic: "fontFileBoldItalic",
      FontFileItalic: "fontFileItalic",
      FontFileRegular: "fontFileRegular",
      FontOpacity: "fontOpacity",
      FontResolution: "fontResolution",
      FontScript: "fontScript",
      FontSize: "fontSize",
      HexFontColor: "hexFontColor",
      OutlineColor: "outlineColor",
      OutlineSize: "outlineSize",
      RemoveRubyReserveAttributes: "removeRubyReserveAttributes",
      ShadowColor: "shadowColor",
      ShadowOpacity: "shadowOpacity",
      ShadowXOffset: "shadowXOffset",
      ShadowYOffset: "shadowYOffset",
      StylePassthrough: "stylePassthrough",
      TeletextSpacing: "teletextSpacing",
      XPosition: "xPosition",
      YPosition: "yPosition",
    }),
  ),
).annotate({
  identifier: "BurninDestinationSettings",
}) as any as S.Schema<BurninDestinationSettings>;
export type CaptionDestinationType =
  | "BURN_IN"
  | "DVB_SUB"
  | "EMBEDDED"
  | "EMBEDDED_PLUS_SCTE20"
  | "IMSC"
  | "SCTE20_PLUS_EMBEDDED"
  | "SCC"
  | "SRT"
  | "SMI"
  | "TELETEXT"
  | "TTML"
  | "WEBVTT"
  | (string & {});
export const CaptionDestinationType = S.String;

export type DvbSubtitleAlignment = "CENTERED" | "LEFT" | "AUTO" | (string & {});
export const DvbSubtitleAlignment = S.String;

export type DvbSubtitleApplyFontColor =
  | "WHITE_TEXT_ONLY"
  | "ALL_TEXT"
  | (string & {});
export const DvbSubtitleApplyFontColor = S.String;

export type DvbSubtitleBackgroundColor =
  | "NONE"
  | "BLACK"
  | "WHITE"
  | "AUTO"
  | (string & {});
export const DvbSubtitleBackgroundColor = S.String;

export type DvbddsHandling =
  | "NONE"
  | "SPECIFIED"
  | "NO_DISPLAY_WINDOW"
  | "SPECIFIED_OPTIMAL"
  | (string & {});
export const DvbddsHandling = S.String;

export type DvbSubSubtitleFallbackFont =
  | "BEST_MATCH"
  | "MONOSPACED_SANSSERIF"
  | "MONOSPACED_SERIF"
  | "PROPORTIONAL_SANSSERIF"
  | "PROPORTIONAL_SERIF"
  | (string & {});
export const DvbSubSubtitleFallbackFont = S.String;

export type DvbSubtitleFontColor =
  | "WHITE"
  | "BLACK"
  | "YELLOW"
  | "RED"
  | "GREEN"
  | "BLUE"
  | "HEX"
  | "AUTO"
  | (string & {});
export const DvbSubtitleFontColor = S.String;

export type DvbSubtitleOutlineColor =
  | "BLACK"
  | "WHITE"
  | "YELLOW"
  | "RED"
  | "GREEN"
  | "BLUE"
  | "AUTO"
  | (string & {});
export const DvbSubtitleOutlineColor = S.String;

export type DvbSubtitleShadowColor =
  | "NONE"
  | "BLACK"
  | "WHITE"
  | "AUTO"
  | (string & {});
export const DvbSubtitleShadowColor = S.String;

export type DvbSubtitleStylePassthrough =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const DvbSubtitleStylePassthrough = S.String;

export type DvbSubtitlingType = "HEARING_IMPAIRED" | "STANDARD" | (string & {});
export const DvbSubtitlingType = S.String;

export type DvbSubtitleTeletextSpacing =
  | "FIXED_GRID"
  | "PROPORTIONAL"
  | "AUTO"
  | (string & {});
export const DvbSubtitleTeletextSpacing = S.String;

export interface DvbSubDestinationSettings {
  Alignment?: DvbSubtitleAlignment;
  ApplyFontColor?: DvbSubtitleApplyFontColor;
  BackgroundColor?: DvbSubtitleBackgroundColor;
  BackgroundOpacity?: number;
  DdsHandling?: DvbddsHandling;
  DdsXCoordinate?: number;
  DdsYCoordinate?: number;
  FallbackFont?: DvbSubSubtitleFallbackFont;
  FontColor?: DvbSubtitleFontColor;
  FontFileBold?: string;
  FontFileBoldItalic?: string;
  FontFileItalic?: string;
  FontFileRegular?: string;
  FontOpacity?: number;
  FontResolution?: number;
  FontScript?: FontScript;
  FontSize?: number;
  Height?: number;
  HexFontColor?: string;
  OutlineColor?: DvbSubtitleOutlineColor;
  OutlineSize?: number;
  ShadowColor?: DvbSubtitleShadowColor;
  ShadowOpacity?: number;
  ShadowXOffset?: number;
  ShadowYOffset?: number;
  StylePassthrough?: DvbSubtitleStylePassthrough;
  SubtitlingType?: DvbSubtitlingType;
  TeletextSpacing?: DvbSubtitleTeletextSpacing;
  Width?: number;
  XPosition?: number;
  YPosition?: number;
}
export const DvbSubDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Alignment: S.optional(DvbSubtitleAlignment),
    ApplyFontColor: S.optional(DvbSubtitleApplyFontColor),
    BackgroundColor: S.optional(DvbSubtitleBackgroundColor),
    BackgroundOpacity: S.optional(S.Number),
    DdsHandling: S.optional(DvbddsHandling),
    DdsXCoordinate: S.optional(S.Number),
    DdsYCoordinate: S.optional(S.Number),
    FallbackFont: S.optional(DvbSubSubtitleFallbackFont),
    FontColor: S.optional(DvbSubtitleFontColor),
    FontFileBold: S.optional(S.String),
    FontFileBoldItalic: S.optional(S.String),
    FontFileItalic: S.optional(S.String),
    FontFileRegular: S.optional(S.String),
    FontOpacity: S.optional(S.Number),
    FontResolution: S.optional(S.Number),
    FontScript: S.optional(FontScript),
    FontSize: S.optional(S.Number),
    Height: S.optional(S.Number),
    HexFontColor: S.optional(S.String),
    OutlineColor: S.optional(DvbSubtitleOutlineColor),
    OutlineSize: S.optional(S.Number),
    ShadowColor: S.optional(DvbSubtitleShadowColor),
    ShadowOpacity: S.optional(S.Number),
    ShadowXOffset: S.optional(S.Number),
    ShadowYOffset: S.optional(S.Number),
    StylePassthrough: S.optional(DvbSubtitleStylePassthrough),
    SubtitlingType: S.optional(DvbSubtitlingType),
    TeletextSpacing: S.optional(DvbSubtitleTeletextSpacing),
    Width: S.optional(S.Number),
    XPosition: S.optional(S.Number),
    YPosition: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Alignment: "alignment",
      ApplyFontColor: "applyFontColor",
      BackgroundColor: "backgroundColor",
      BackgroundOpacity: "backgroundOpacity",
      DdsHandling: "ddsHandling",
      DdsXCoordinate: "ddsXCoordinate",
      DdsYCoordinate: "ddsYCoordinate",
      FallbackFont: "fallbackFont",
      FontColor: "fontColor",
      FontFileBold: "fontFileBold",
      FontFileBoldItalic: "fontFileBoldItalic",
      FontFileItalic: "fontFileItalic",
      FontFileRegular: "fontFileRegular",
      FontOpacity: "fontOpacity",
      FontResolution: "fontResolution",
      FontScript: "fontScript",
      FontSize: "fontSize",
      Height: "height",
      HexFontColor: "hexFontColor",
      OutlineColor: "outlineColor",
      OutlineSize: "outlineSize",
      ShadowColor: "shadowColor",
      ShadowOpacity: "shadowOpacity",
      ShadowXOffset: "shadowXOffset",
      ShadowYOffset: "shadowYOffset",
      StylePassthrough: "stylePassthrough",
      SubtitlingType: "subtitlingType",
      TeletextSpacing: "teletextSpacing",
      Width: "width",
      XPosition: "xPosition",
      YPosition: "yPosition",
    }),
  ),
).annotate({
  identifier: "DvbSubDestinationSettings",
}) as any as S.Schema<DvbSubDestinationSettings>;
export type __integerMin1Max6 = number;
export interface EmbeddedDestinationSettings {
  Destination608ChannelNumber?: number;
  Destination708ServiceNumber?: number;
}
export const EmbeddedDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Destination608ChannelNumber: S.optional(S.Number),
    Destination708ServiceNumber: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Destination608ChannelNumber: "destination608ChannelNumber",
      Destination708ServiceNumber: "destination708ServiceNumber",
    }),
  ),
).annotate({
  identifier: "EmbeddedDestinationSettings",
}) as any as S.Schema<EmbeddedDestinationSettings>;
export type ImscAccessibilitySubs = "DISABLED" | "ENABLED" | (string & {});
export const ImscAccessibilitySubs = S.String;

export type ImscStylePassthrough = "ENABLED" | "DISABLED" | (string & {});
export const ImscStylePassthrough = S.String;

export interface ImscDestinationSettings {
  Accessibility?: ImscAccessibilitySubs;
  StylePassthrough?: ImscStylePassthrough;
}
export const ImscDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accessibility: S.optional(ImscAccessibilitySubs),
    StylePassthrough: S.optional(ImscStylePassthrough),
  }).pipe(
    S.encodeKeys({
      Accessibility: "accessibility",
      StylePassthrough: "stylePassthrough",
    }),
  ),
).annotate({
  identifier: "ImscDestinationSettings",
}) as any as S.Schema<ImscDestinationSettings>;
export type SccDestinationFramerate =
  | "FRAMERATE_23_97"
  | "FRAMERATE_24"
  | "FRAMERATE_25"
  | "FRAMERATE_29_97_DROPFRAME"
  | "FRAMERATE_29_97_NON_DROPFRAME"
  | (string & {});
export const SccDestinationFramerate = S.String;

export interface SccDestinationSettings {
  Framerate?: SccDestinationFramerate;
}
export const SccDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Framerate: S.optional(SccDestinationFramerate) }).pipe(
    S.encodeKeys({ Framerate: "framerate" }),
  ),
).annotate({
  identifier: "SccDestinationSettings",
}) as any as S.Schema<SccDestinationSettings>;
export type SrtStylePassthrough = "ENABLED" | "DISABLED" | (string & {});
export const SrtStylePassthrough = S.String;

export interface SrtDestinationSettings {
  StylePassthrough?: SrtStylePassthrough;
}
export const SrtDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StylePassthrough: S.optional(SrtStylePassthrough) }).pipe(
    S.encodeKeys({ StylePassthrough: "stylePassthrough" }),
  ),
).annotate({
  identifier: "SrtDestinationSettings",
}) as any as S.Schema<SrtDestinationSettings>;
export type TeletextPageType =
  | "PAGE_TYPE_INITIAL"
  | "PAGE_TYPE_SUBTITLE"
  | "PAGE_TYPE_ADDL_INFO"
  | "PAGE_TYPE_PROGRAM_SCHEDULE"
  | "PAGE_TYPE_HEARING_IMPAIRED_SUBTITLE"
  | (string & {});
export const TeletextPageType = S.String;

export type __listOfTeletextPageType = TeletextPageType[];
export const __listOfTeletextPageType = /*@__PURE__*/ S.Array(TeletextPageType);
export interface TeletextDestinationSettings {
  PageNumber?: string;
  PageTypes?: TeletextPageType[];
}
export const TeletextDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PageNumber: S.optional(S.String),
    PageTypes: S.optional(__listOfTeletextPageType),
  }).pipe(S.encodeKeys({ PageNumber: "pageNumber", PageTypes: "pageTypes" })),
).annotate({
  identifier: "TeletextDestinationSettings",
}) as any as S.Schema<TeletextDestinationSettings>;
export type TtmlStylePassthrough = "ENABLED" | "DISABLED" | (string & {});
export const TtmlStylePassthrough = S.String;

export interface TtmlDestinationSettings {
  StylePassthrough?: TtmlStylePassthrough;
}
export const TtmlDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ StylePassthrough: S.optional(TtmlStylePassthrough) }).pipe(
    S.encodeKeys({ StylePassthrough: "stylePassthrough" }),
  ),
).annotate({
  identifier: "TtmlDestinationSettings",
}) as any as S.Schema<TtmlDestinationSettings>;
export type WebvttAccessibilitySubs = "DISABLED" | "ENABLED" | (string & {});
export const WebvttAccessibilitySubs = S.String;

export type WebvttStylePassthrough =
  | "ENABLED"
  | "DISABLED"
  | "STRICT"
  | "MERGE"
  | (string & {});
export const WebvttStylePassthrough = S.String;

export interface WebvttDestinationSettings {
  Accessibility?: WebvttAccessibilitySubs;
  StylePassthrough?: WebvttStylePassthrough;
}
export const WebvttDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Accessibility: S.optional(WebvttAccessibilitySubs),
    StylePassthrough: S.optional(WebvttStylePassthrough),
  }).pipe(
    S.encodeKeys({
      Accessibility: "accessibility",
      StylePassthrough: "stylePassthrough",
    }),
  ),
).annotate({
  identifier: "WebvttDestinationSettings",
}) as any as S.Schema<WebvttDestinationSettings>;
export interface CaptionDestinationSettings {
  BurninDestinationSettings?: BurninDestinationSettings;
  DestinationType?: CaptionDestinationType;
  DvbSubDestinationSettings?: DvbSubDestinationSettings;
  EmbeddedDestinationSettings?: EmbeddedDestinationSettings;
  ImscDestinationSettings?: ImscDestinationSettings;
  SccDestinationSettings?: SccDestinationSettings;
  SrtDestinationSettings?: SrtDestinationSettings;
  TeletextDestinationSettings?: TeletextDestinationSettings;
  TtmlDestinationSettings?: TtmlDestinationSettings;
  WebvttDestinationSettings?: WebvttDestinationSettings;
}
export const CaptionDestinationSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BurninDestinationSettings: S.optional(BurninDestinationSettings),
    DestinationType: S.optional(CaptionDestinationType),
    DvbSubDestinationSettings: S.optional(DvbSubDestinationSettings),
    EmbeddedDestinationSettings: S.optional(EmbeddedDestinationSettings),
    ImscDestinationSettings: S.optional(ImscDestinationSettings),
    SccDestinationSettings: S.optional(SccDestinationSettings),
    SrtDestinationSettings: S.optional(SrtDestinationSettings),
    TeletextDestinationSettings: S.optional(TeletextDestinationSettings),
    TtmlDestinationSettings: S.optional(TtmlDestinationSettings),
    WebvttDestinationSettings: S.optional(WebvttDestinationSettings),
  }).pipe(
    S.encodeKeys({
      BurninDestinationSettings: "burninDestinationSettings",
      DestinationType: "destinationType",
      DvbSubDestinationSettings: "dvbSubDestinationSettings",
      EmbeddedDestinationSettings: "embeddedDestinationSettings",
      ImscDestinationSettings: "imscDestinationSettings",
      SccDestinationSettings: "sccDestinationSettings",
      SrtDestinationSettings: "srtDestinationSettings",
      TeletextDestinationSettings: "teletextDestinationSettings",
      TtmlDestinationSettings: "ttmlDestinationSettings",
      WebvttDestinationSettings: "webvttDestinationSettings",
    }),
  ),
).annotate({
  identifier: "CaptionDestinationSettings",
}) as any as S.Schema<CaptionDestinationSettings>;
export interface CaptionDescription {
  CaptionSelectorName?: string;
  CustomLanguageCode?: string;
  DestinationSettings?: CaptionDestinationSettings;
  LanguageCode?: LanguageCode;
  LanguageDescription?: string;
}
export const CaptionDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CaptionSelectorName: S.optional(S.String),
    CustomLanguageCode: S.optional(S.String),
    DestinationSettings: S.optional(CaptionDestinationSettings),
    LanguageCode: S.optional(LanguageCode),
    LanguageDescription: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CaptionSelectorName: "captionSelectorName",
      CustomLanguageCode: "customLanguageCode",
      DestinationSettings: "destinationSettings",
      LanguageCode: "languageCode",
      LanguageDescription: "languageDescription",
    }),
  ),
).annotate({
  identifier: "CaptionDescription",
}) as any as S.Schema<CaptionDescription>;
export type __listOfCaptionDescription = CaptionDescription[];
export const __listOfCaptionDescription =
  /*@__PURE__*/ S.Array(CaptionDescription);
export type CmfcAudioDuration =
  | "DEFAULT_CODEC_DURATION"
  | "MATCH_VIDEO_DURATION"
  | (string & {});
export const CmfcAudioDuration = S.String;

export type CmfcAudioTrackType =
  | "ALTERNATE_AUDIO_AUTO_SELECT_DEFAULT"
  | "ALTERNATE_AUDIO_AUTO_SELECT"
  | "ALTERNATE_AUDIO_NOT_AUTO_SELECT"
  | "AUDIO_ONLY_VARIANT_STREAM"
  | (string & {});
export const CmfcAudioTrackType = S.String;

export type CmfcC2paManifest = "INCLUDE" | "EXCLUDE" | (string & {});
export const CmfcC2paManifest = S.String;

export type CmfcDescriptiveVideoServiceFlag =
  | "DONT_FLAG"
  | "FLAG"
  | (string & {});
export const CmfcDescriptiveVideoServiceFlag = S.String;

export type CmfcIFrameOnlyManifest = "INCLUDE" | "EXCLUDE" | (string & {});
export const CmfcIFrameOnlyManifest = S.String;

export type CmfcKlvMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export const CmfcKlvMetadata = S.String;

export type CmfcManifestMetadataSignaling =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const CmfcManifestMetadataSignaling = S.String;

export type CmfcScte35Esam = "INSERT" | "NONE" | (string & {});
export const CmfcScte35Esam = S.String;

export type CmfcScte35Source = "PASSTHROUGH" | "NONE" | (string & {});
export const CmfcScte35Source = S.String;

export type __stringMin1PatternArnAwsUsGovCnKmsAZ26EastWestCentralNorthSouthEastWest1912D12KeyAFAF098AFAF094AFAF094AFAF094AFAF0912MrkAFAF0932 =
  string;
export type CmfcTimedMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export const CmfcTimedMetadata = S.String;

export type CmfcTimedMetadataBoxVersion =
  | "VERSION_0"
  | "VERSION_1"
  | (string & {});
export const CmfcTimedMetadataBoxVersion = S.String;

export type __stringMax1000 = string;
export interface CmfcSettings {
  AudioDuration?: CmfcAudioDuration;
  AudioGroupId?: string;
  AudioRenditionSets?: string;
  AudioTrackType?: CmfcAudioTrackType;
  C2paManifest?: CmfcC2paManifest;
  CertificateSecret?: string;
  DescriptiveVideoServiceFlag?: CmfcDescriptiveVideoServiceFlag;
  IFrameOnlyManifest?: CmfcIFrameOnlyManifest;
  KlvMetadata?: CmfcKlvMetadata;
  ManifestMetadataSignaling?: CmfcManifestMetadataSignaling;
  Scte35Esam?: CmfcScte35Esam;
  Scte35Source?: CmfcScte35Source;
  SigningKmsKey?: string;
  TimedMetadata?: CmfcTimedMetadata;
  TimedMetadataBoxVersion?: CmfcTimedMetadataBoxVersion;
  TimedMetadataSchemeIdUri?: string;
  TimedMetadataValue?: string;
}
export const CmfcSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDuration: S.optional(CmfcAudioDuration),
    AudioGroupId: S.optional(S.String),
    AudioRenditionSets: S.optional(S.String),
    AudioTrackType: S.optional(CmfcAudioTrackType),
    C2paManifest: S.optional(CmfcC2paManifest),
    CertificateSecret: S.optional(S.String),
    DescriptiveVideoServiceFlag: S.optional(CmfcDescriptiveVideoServiceFlag),
    IFrameOnlyManifest: S.optional(CmfcIFrameOnlyManifest),
    KlvMetadata: S.optional(CmfcKlvMetadata),
    ManifestMetadataSignaling: S.optional(CmfcManifestMetadataSignaling),
    Scte35Esam: S.optional(CmfcScte35Esam),
    Scte35Source: S.optional(CmfcScte35Source),
    SigningKmsKey: S.optional(S.String),
    TimedMetadata: S.optional(CmfcTimedMetadata),
    TimedMetadataBoxVersion: S.optional(CmfcTimedMetadataBoxVersion),
    TimedMetadataSchemeIdUri: S.optional(S.String),
    TimedMetadataValue: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AudioDuration: "audioDuration",
      AudioGroupId: "audioGroupId",
      AudioRenditionSets: "audioRenditionSets",
      AudioTrackType: "audioTrackType",
      C2paManifest: "c2paManifest",
      CertificateSecret: "certificateSecret",
      DescriptiveVideoServiceFlag: "descriptiveVideoServiceFlag",
      IFrameOnlyManifest: "iFrameOnlyManifest",
      KlvMetadata: "klvMetadata",
      ManifestMetadataSignaling: "manifestMetadataSignaling",
      Scte35Esam: "scte35Esam",
      Scte35Source: "scte35Source",
      SigningKmsKey: "signingKmsKey",
      TimedMetadata: "timedMetadata",
      TimedMetadataBoxVersion: "timedMetadataBoxVersion",
      TimedMetadataSchemeIdUri: "timedMetadataSchemeIdUri",
      TimedMetadataValue: "timedMetadataValue",
    }),
  ),
).annotate({ identifier: "CmfcSettings" }) as any as S.Schema<CmfcSettings>;
export type ContainerType =
  | "F4V"
  | "GIF"
  | "ISMV"
  | "M2TS"
  | "M3U8"
  | "CMFC"
  | "MOV"
  | "MP4"
  | "MPD"
  | "MXF"
  | "OGG"
  | "WEBM"
  | "RAW"
  | "Y4M"
  | (string & {});
export const ContainerType = S.String;

export type F4vMoovPlacement =
  | "PROGRESSIVE_DOWNLOAD"
  | "NORMAL"
  | (string & {});
export const F4vMoovPlacement = S.String;

export interface F4vSettings {
  MoovPlacement?: F4vMoovPlacement;
}
export const F4vSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ MoovPlacement: S.optional(F4vMoovPlacement) }).pipe(
    S.encodeKeys({ MoovPlacement: "moovPlacement" }),
  ),
).annotate({ identifier: "F4vSettings" }) as any as S.Schema<F4vSettings>;
export type M2tsAudioBufferModel = "DVB" | "ATSC" | (string & {});
export const M2tsAudioBufferModel = S.String;

export type M2tsAudioDuration =
  | "DEFAULT_CODEC_DURATION"
  | "MATCH_VIDEO_DURATION"
  | (string & {});
export const M2tsAudioDuration = S.String;

export type __integerMin32Max8182 = number;
export type __listOf__integerMin32Max8182 = number[];
export const __listOf__integerMin32Max8182 = /*@__PURE__*/ S.Array(S.Number);
export type __integerMinNegative10000Max10000 = number;
export type M2tsBufferModel = "MULTIPLEX" | "NONE" | (string & {});
export const M2tsBufferModel = S.String;

export type M2tsDataPtsControl = "AUTO" | "ALIGN_TO_VIDEO" | (string & {});
export const M2tsDataPtsControl = S.String;

export type __integerMin25Max10000 = number;
export interface DvbNitSettings {
  NetworkId?: number;
  NetworkName?: string;
  NitInterval?: number;
}
export const DvbNitSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NetworkId: S.optional(S.Number),
    NetworkName: S.optional(S.String),
    NitInterval: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      NetworkId: "networkId",
      NetworkName: "networkName",
      NitInterval: "nitInterval",
    }),
  ),
).annotate({ identifier: "DvbNitSettings" }) as any as S.Schema<DvbNitSettings>;
export type OutputSdt =
  | "SDT_FOLLOW"
  | "SDT_FOLLOW_IF_PRESENT"
  | "SDT_MANUAL"
  | "SDT_NONE"
  | (string & {});
export const OutputSdt = S.String;

export type __integerMin25Max2000 = number;
export interface DvbSdtSettings {
  OutputSdt?: OutputSdt;
  SdtInterval?: number;
  ServiceName?: string;
  ServiceProviderName?: string;
}
export const DvbSdtSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    OutputSdt: S.optional(OutputSdt),
    SdtInterval: S.optional(S.Number),
    ServiceName: S.optional(S.String),
    ServiceProviderName: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      OutputSdt: "outputSdt",
      SdtInterval: "sdtInterval",
      ServiceName: "serviceName",
      ServiceProviderName: "serviceProviderName",
    }),
  ),
).annotate({ identifier: "DvbSdtSettings" }) as any as S.Schema<DvbSdtSettings>;
export type __integerMin1000Max30000 = number;
export interface DvbTdtSettings {
  TdtInterval?: number;
}
export const DvbTdtSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ TdtInterval: S.optional(S.Number) }).pipe(
    S.encodeKeys({ TdtInterval: "tdtInterval" }),
  ),
).annotate({ identifier: "DvbTdtSettings" }) as any as S.Schema<DvbTdtSettings>;
export type M2tsEbpAudioInterval =
  | "VIDEO_AND_FIXED_INTERVALS"
  | "VIDEO_INTERVAL"
  | (string & {});
export const M2tsEbpAudioInterval = S.String;

export type M2tsEbpPlacement =
  | "VIDEO_AND_AUDIO_PIDS"
  | "VIDEO_PID"
  | (string & {});
export const M2tsEbpPlacement = S.String;

export type M2tsEsRateInPes = "INCLUDE" | "EXCLUDE" | (string & {});
export const M2tsEsRateInPes = S.String;

export type M2tsForceTsVideoEbpOrder = "FORCE" | "DEFAULT" | (string & {});
export const M2tsForceTsVideoEbpOrder = S.String;

export type M2tsKlvMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export const M2tsKlvMetadata = S.String;

export type __integerMin0Max500 = number;
export type __integerMin0Max10000 = number;
export type M2tsNielsenId3 = "INSERT" | "NONE" | (string & {});
export const M2tsNielsenId3 = S.String;

export type __integerMin0Max1000 = number;
export type M2tsPcrControl =
  | "PCR_EVERY_PES_PACKET"
  | "CONFIGURED_PCR_PERIOD"
  | (string & {});
export const M2tsPcrControl = S.String;

export type M2tsPreventBufferUnderflow = "DISABLED" | "ENABLED" | (string & {});
export const M2tsPreventBufferUnderflow = S.String;

export type TsPtsOffset = "AUTO" | "SECONDS" | "MILLISECONDS" | (string & {});
export const TsPtsOffset = S.String;

export type M2tsRateMode = "VBR" | "CBR" | (string & {});
export const M2tsRateMode = S.String;

export interface M2tsScte35Esam {
  Scte35EsamPid?: number;
}
export const M2tsScte35Esam = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Scte35EsamPid: S.optional(S.Number) }).pipe(
    S.encodeKeys({ Scte35EsamPid: "scte35EsamPid" }),
  ),
).annotate({ identifier: "M2tsScte35Esam" }) as any as S.Schema<M2tsScte35Esam>;
export type M2tsScte35Source = "PASSTHROUGH" | "NONE" | (string & {});
export const M2tsScte35Source = S.String;

export type M2tsSegmentationMarkers =
  | "NONE"
  | "RAI_SEGSTART"
  | "RAI_ADAPT"
  | "PSI_SEGSTART"
  | "EBP"
  | "EBP_LEGACY"
  | (string & {});
export const M2tsSegmentationMarkers = S.String;

export type M2tsSegmentationStyle =
  | "MAINTAIN_CADENCE"
  | "RESET_CADENCE"
  | (string & {});
export const M2tsSegmentationStyle = S.String;

export interface M2tsSettings {
  AudioBufferModel?: M2tsAudioBufferModel;
  AudioDuration?: M2tsAudioDuration;
  AudioFramesPerPes?: number;
  AudioPids?: number[];
  AudioPtsOffsetDelta?: number;
  Bitrate?: number;
  BufferModel?: M2tsBufferModel;
  DataPTSControl?: M2tsDataPtsControl;
  DvbNitSettings?: DvbNitSettings;
  DvbSdtSettings?: DvbSdtSettings;
  DvbSubPids?: number[];
  DvbTdtSettings?: DvbTdtSettings;
  DvbTeletextPid?: number;
  EbpAudioInterval?: M2tsEbpAudioInterval;
  EbpPlacement?: M2tsEbpPlacement;
  EsRateInPes?: M2tsEsRateInPes;
  ForceTsVideoEbpOrder?: M2tsForceTsVideoEbpOrder;
  FragmentTime?: number;
  KlvMetadata?: M2tsKlvMetadata;
  MaxPcrInterval?: number;
  MinEbpInterval?: number;
  NielsenId3?: M2tsNielsenId3;
  NullPacketBitrate?: number;
  PatInterval?: number;
  PcrControl?: M2tsPcrControl;
  PcrPid?: number;
  PmtInterval?: number;
  PmtPid?: number;
  PreventBufferUnderflow?: M2tsPreventBufferUnderflow;
  PrivateMetadataPid?: number;
  ProgramNumber?: number;
  PtsOffset?: number;
  PtsOffsetMode?: TsPtsOffset;
  RateMode?: M2tsRateMode;
  Scte35Esam?: M2tsScte35Esam;
  Scte35Pid?: number;
  Scte35Source?: M2tsScte35Source;
  SegmentationMarkers?: M2tsSegmentationMarkers;
  SegmentationStyle?: M2tsSegmentationStyle;
  SegmentationTime?: number;
  TimedMetadataPid?: number;
  TransportStreamId?: number;
  VideoPid?: number;
}
export const M2tsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioBufferModel: S.optional(M2tsAudioBufferModel),
    AudioDuration: S.optional(M2tsAudioDuration),
    AudioFramesPerPes: S.optional(S.Number),
    AudioPids: S.optional(__listOf__integerMin32Max8182),
    AudioPtsOffsetDelta: S.optional(S.Number),
    Bitrate: S.optional(S.Number),
    BufferModel: S.optional(M2tsBufferModel),
    DataPTSControl: S.optional(M2tsDataPtsControl),
    DvbNitSettings: S.optional(DvbNitSettings),
    DvbSdtSettings: S.optional(DvbSdtSettings),
    DvbSubPids: S.optional(__listOf__integerMin32Max8182),
    DvbTdtSettings: S.optional(DvbTdtSettings),
    DvbTeletextPid: S.optional(S.Number),
    EbpAudioInterval: S.optional(M2tsEbpAudioInterval),
    EbpPlacement: S.optional(M2tsEbpPlacement),
    EsRateInPes: S.optional(M2tsEsRateInPes),
    ForceTsVideoEbpOrder: S.optional(M2tsForceTsVideoEbpOrder),
    FragmentTime: S.optional(S.Number),
    KlvMetadata: S.optional(M2tsKlvMetadata),
    MaxPcrInterval: S.optional(S.Number),
    MinEbpInterval: S.optional(S.Number),
    NielsenId3: S.optional(M2tsNielsenId3),
    NullPacketBitrate: S.optional(S.Number),
    PatInterval: S.optional(S.Number),
    PcrControl: S.optional(M2tsPcrControl),
    PcrPid: S.optional(S.Number),
    PmtInterval: S.optional(S.Number),
    PmtPid: S.optional(S.Number),
    PreventBufferUnderflow: S.optional(M2tsPreventBufferUnderflow),
    PrivateMetadataPid: S.optional(S.Number),
    ProgramNumber: S.optional(S.Number),
    PtsOffset: S.optional(S.Number),
    PtsOffsetMode: S.optional(TsPtsOffset),
    RateMode: S.optional(M2tsRateMode),
    Scte35Esam: S.optional(M2tsScte35Esam),
    Scte35Pid: S.optional(S.Number),
    Scte35Source: S.optional(M2tsScte35Source),
    SegmentationMarkers: S.optional(M2tsSegmentationMarkers),
    SegmentationStyle: S.optional(M2tsSegmentationStyle),
    SegmentationTime: S.optional(S.Number),
    TimedMetadataPid: S.optional(S.Number),
    TransportStreamId: S.optional(S.Number),
    VideoPid: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AudioBufferModel: "audioBufferModel",
      AudioDuration: "audioDuration",
      AudioFramesPerPes: "audioFramesPerPes",
      AudioPids: "audioPids",
      AudioPtsOffsetDelta: "audioPtsOffsetDelta",
      Bitrate: "bitrate",
      BufferModel: "bufferModel",
      DataPTSControl: "dataPTSControl",
      DvbNitSettings: "dvbNitSettings",
      DvbSdtSettings: "dvbSdtSettings",
      DvbSubPids: "dvbSubPids",
      DvbTdtSettings: "dvbTdtSettings",
      DvbTeletextPid: "dvbTeletextPid",
      EbpAudioInterval: "ebpAudioInterval",
      EbpPlacement: "ebpPlacement",
      EsRateInPes: "esRateInPes",
      ForceTsVideoEbpOrder: "forceTsVideoEbpOrder",
      FragmentTime: "fragmentTime",
      KlvMetadata: "klvMetadata",
      MaxPcrInterval: "maxPcrInterval",
      MinEbpInterval: "minEbpInterval",
      NielsenId3: "nielsenId3",
      NullPacketBitrate: "nullPacketBitrate",
      PatInterval: "patInterval",
      PcrControl: "pcrControl",
      PcrPid: "pcrPid",
      PmtInterval: "pmtInterval",
      PmtPid: "pmtPid",
      PreventBufferUnderflow: "preventBufferUnderflow",
      PrivateMetadataPid: "privateMetadataPid",
      ProgramNumber: "programNumber",
      PtsOffset: "ptsOffset",
      PtsOffsetMode: "ptsOffsetMode",
      RateMode: "rateMode",
      Scte35Esam: "scte35Esam",
      Scte35Pid: "scte35Pid",
      Scte35Source: "scte35Source",
      SegmentationMarkers: "segmentationMarkers",
      SegmentationStyle: "segmentationStyle",
      SegmentationTime: "segmentationTime",
      TimedMetadataPid: "timedMetadataPid",
      TransportStreamId: "transportStreamId",
      VideoPid: "videoPid",
    }),
  ),
).annotate({ identifier: "M2tsSettings" }) as any as S.Schema<M2tsSettings>;
export type M3u8AudioDuration =
  | "DEFAULT_CODEC_DURATION"
  | "MATCH_VIDEO_DURATION"
  | (string & {});
export const M3u8AudioDuration = S.String;

export type M3u8DataPtsControl = "AUTO" | "ALIGN_TO_VIDEO" | (string & {});
export const M3u8DataPtsControl = S.String;

export type M3u8NielsenId3 = "INSERT" | "NONE" | (string & {});
export const M3u8NielsenId3 = S.String;

export type M3u8PcrControl =
  | "PCR_EVERY_PES_PACKET"
  | "CONFIGURED_PCR_PERIOD"
  | (string & {});
export const M3u8PcrControl = S.String;

export type M3u8Scte35Source = "PASSTHROUGH" | "NONE" | (string & {});
export const M3u8Scte35Source = S.String;

export type TimedMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export const TimedMetadata = S.String;

export interface M3u8Settings {
  AudioDuration?: M3u8AudioDuration;
  AudioFramesPerPes?: number;
  AudioPids?: number[];
  AudioPtsOffsetDelta?: number;
  DataPTSControl?: M3u8DataPtsControl;
  MaxPcrInterval?: number;
  NielsenId3?: M3u8NielsenId3;
  PatInterval?: number;
  PcrControl?: M3u8PcrControl;
  PcrPid?: number;
  PmtInterval?: number;
  PmtPid?: number;
  PrivateMetadataPid?: number;
  ProgramNumber?: number;
  PtsOffset?: number;
  PtsOffsetMode?: TsPtsOffset;
  Scte35Pid?: number;
  Scte35Source?: M3u8Scte35Source;
  TimedMetadata?: TimedMetadata;
  TimedMetadataPid?: number;
  TransportStreamId?: number;
  VideoPid?: number;
}
export const M3u8Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDuration: S.optional(M3u8AudioDuration),
    AudioFramesPerPes: S.optional(S.Number),
    AudioPids: S.optional(__listOf__integerMin32Max8182),
    AudioPtsOffsetDelta: S.optional(S.Number),
    DataPTSControl: S.optional(M3u8DataPtsControl),
    MaxPcrInterval: S.optional(S.Number),
    NielsenId3: S.optional(M3u8NielsenId3),
    PatInterval: S.optional(S.Number),
    PcrControl: S.optional(M3u8PcrControl),
    PcrPid: S.optional(S.Number),
    PmtInterval: S.optional(S.Number),
    PmtPid: S.optional(S.Number),
    PrivateMetadataPid: S.optional(S.Number),
    ProgramNumber: S.optional(S.Number),
    PtsOffset: S.optional(S.Number),
    PtsOffsetMode: S.optional(TsPtsOffset),
    Scte35Pid: S.optional(S.Number),
    Scte35Source: S.optional(M3u8Scte35Source),
    TimedMetadata: S.optional(TimedMetadata),
    TimedMetadataPid: S.optional(S.Number),
    TransportStreamId: S.optional(S.Number),
    VideoPid: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AudioDuration: "audioDuration",
      AudioFramesPerPes: "audioFramesPerPes",
      AudioPids: "audioPids",
      AudioPtsOffsetDelta: "audioPtsOffsetDelta",
      DataPTSControl: "dataPTSControl",
      MaxPcrInterval: "maxPcrInterval",
      NielsenId3: "nielsenId3",
      PatInterval: "patInterval",
      PcrControl: "pcrControl",
      PcrPid: "pcrPid",
      PmtInterval: "pmtInterval",
      PmtPid: "pmtPid",
      PrivateMetadataPid: "privateMetadataPid",
      ProgramNumber: "programNumber",
      PtsOffset: "ptsOffset",
      PtsOffsetMode: "ptsOffsetMode",
      Scte35Pid: "scte35Pid",
      Scte35Source: "scte35Source",
      TimedMetadata: "timedMetadata",
      TimedMetadataPid: "timedMetadataPid",
      TransportStreamId: "transportStreamId",
      VideoPid: "videoPid",
    }),
  ),
).annotate({ identifier: "M3u8Settings" }) as any as S.Schema<M3u8Settings>;
export type MovClapAtom = "INCLUDE" | "EXCLUDE" | (string & {});
export const MovClapAtom = S.String;

export type MovCslgAtom = "INCLUDE" | "EXCLUDE" | (string & {});
export const MovCslgAtom = S.String;

export type MovMpeg2FourCCControl = "XDCAM" | "MPEG" | (string & {});
export const MovMpeg2FourCCControl = S.String;

export type MovPaddingControl = "OMNEON" | "NONE" | (string & {});
export const MovPaddingControl = S.String;

export type MovReference = "SELF_CONTAINED" | "EXTERNAL" | (string & {});
export const MovReference = S.String;

export interface MovSettings {
  AudioDuration?: CmfcAudioDuration;
  ClapAtom?: MovClapAtom;
  CslgAtom?: MovCslgAtom;
  Mpeg2FourCCControl?: MovMpeg2FourCCControl;
  PaddingControl?: MovPaddingControl;
  Reference?: MovReference;
}
export const MovSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDuration: S.optional(CmfcAudioDuration),
    ClapAtom: S.optional(MovClapAtom),
    CslgAtom: S.optional(MovCslgAtom),
    Mpeg2FourCCControl: S.optional(MovMpeg2FourCCControl),
    PaddingControl: S.optional(MovPaddingControl),
    Reference: S.optional(MovReference),
  }).pipe(
    S.encodeKeys({
      AudioDuration: "audioDuration",
      ClapAtom: "clapAtom",
      CslgAtom: "cslgAtom",
      Mpeg2FourCCControl: "mpeg2FourCCControl",
      PaddingControl: "paddingControl",
      Reference: "reference",
    }),
  ),
).annotate({ identifier: "MovSettings" }) as any as S.Schema<MovSettings>;
export type Mp4C2paManifest = "INCLUDE" | "EXCLUDE" | (string & {});
export const Mp4C2paManifest = S.String;

export type Mp4CslgAtom = "INCLUDE" | "EXCLUDE" | (string & {});
export const Mp4CslgAtom = S.String;

export type __integerMin0Max1 = number;
export type Mp4FreeSpaceBox = "INCLUDE" | "EXCLUDE" | (string & {});
export const Mp4FreeSpaceBox = S.String;

export type Mp4MoovPlacement =
  | "PROGRESSIVE_DOWNLOAD"
  | "NORMAL"
  | (string & {});
export const Mp4MoovPlacement = S.String;

export interface Mp4Settings {
  AudioDuration?: CmfcAudioDuration;
  C2paManifest?: Mp4C2paManifest;
  CertificateSecret?: string;
  CslgAtom?: Mp4CslgAtom;
  CttsVersion?: number;
  FreeSpaceBox?: Mp4FreeSpaceBox;
  MoovPlacement?: Mp4MoovPlacement;
  Mp4MajorBrand?: string;
  SigningKmsKey?: string;
}
export const Mp4Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDuration: S.optional(CmfcAudioDuration),
    C2paManifest: S.optional(Mp4C2paManifest),
    CertificateSecret: S.optional(S.String),
    CslgAtom: S.optional(Mp4CslgAtom),
    CttsVersion: S.optional(S.Number),
    FreeSpaceBox: S.optional(Mp4FreeSpaceBox),
    MoovPlacement: S.optional(Mp4MoovPlacement),
    Mp4MajorBrand: S.optional(S.String),
    SigningKmsKey: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AudioDuration: "audioDuration",
      C2paManifest: "c2paManifest",
      CertificateSecret: "certificateSecret",
      CslgAtom: "cslgAtom",
      CttsVersion: "cttsVersion",
      FreeSpaceBox: "freeSpaceBox",
      MoovPlacement: "moovPlacement",
      Mp4MajorBrand: "mp4MajorBrand",
      SigningKmsKey: "signingKmsKey",
    }),
  ),
).annotate({ identifier: "Mp4Settings" }) as any as S.Schema<Mp4Settings>;
export type MpdAccessibilityCaptionHints =
  | "INCLUDE"
  | "EXCLUDE"
  | (string & {});
export const MpdAccessibilityCaptionHints = S.String;

export type MpdAudioDuration =
  | "DEFAULT_CODEC_DURATION"
  | "MATCH_VIDEO_DURATION"
  | (string & {});
export const MpdAudioDuration = S.String;

export type MpdC2paManifest = "INCLUDE" | "EXCLUDE" | (string & {});
export const MpdC2paManifest = S.String;

export type MpdCaptionContainerType = "RAW" | "FRAGMENTED_MP4" | (string & {});
export const MpdCaptionContainerType = S.String;

export type MpdKlvMetadata = "NONE" | "PASSTHROUGH" | (string & {});
export const MpdKlvMetadata = S.String;

export type MpdManifestMetadataSignaling =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const MpdManifestMetadataSignaling = S.String;

export type MpdScte35Esam = "INSERT" | "NONE" | (string & {});
export const MpdScte35Esam = S.String;

export type MpdScte35Source = "PASSTHROUGH" | "NONE" | (string & {});
export const MpdScte35Source = S.String;

export type MpdTimedMetadata = "PASSTHROUGH" | "NONE" | (string & {});
export const MpdTimedMetadata = S.String;

export type MpdTimedMetadataBoxVersion =
  | "VERSION_0"
  | "VERSION_1"
  | (string & {});
export const MpdTimedMetadataBoxVersion = S.String;

export interface MpdSettings {
  AccessibilityCaptionHints?: MpdAccessibilityCaptionHints;
  AudioDuration?: MpdAudioDuration;
  C2paManifest?: MpdC2paManifest;
  CaptionContainerType?: MpdCaptionContainerType;
  CertificateSecret?: string;
  KlvMetadata?: MpdKlvMetadata;
  ManifestMetadataSignaling?: MpdManifestMetadataSignaling;
  Scte35Esam?: MpdScte35Esam;
  Scte35Source?: MpdScte35Source;
  SigningKmsKey?: string;
  TimedMetadata?: MpdTimedMetadata;
  TimedMetadataBoxVersion?: MpdTimedMetadataBoxVersion;
  TimedMetadataSchemeIdUri?: string;
  TimedMetadataValue?: string;
}
export const MpdSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccessibilityCaptionHints: S.optional(MpdAccessibilityCaptionHints),
    AudioDuration: S.optional(MpdAudioDuration),
    C2paManifest: S.optional(MpdC2paManifest),
    CaptionContainerType: S.optional(MpdCaptionContainerType),
    CertificateSecret: S.optional(S.String),
    KlvMetadata: S.optional(MpdKlvMetadata),
    ManifestMetadataSignaling: S.optional(MpdManifestMetadataSignaling),
    Scte35Esam: S.optional(MpdScte35Esam),
    Scte35Source: S.optional(MpdScte35Source),
    SigningKmsKey: S.optional(S.String),
    TimedMetadata: S.optional(MpdTimedMetadata),
    TimedMetadataBoxVersion: S.optional(MpdTimedMetadataBoxVersion),
    TimedMetadataSchemeIdUri: S.optional(S.String),
    TimedMetadataValue: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AccessibilityCaptionHints: "accessibilityCaptionHints",
      AudioDuration: "audioDuration",
      C2paManifest: "c2paManifest",
      CaptionContainerType: "captionContainerType",
      CertificateSecret: "certificateSecret",
      KlvMetadata: "klvMetadata",
      ManifestMetadataSignaling: "manifestMetadataSignaling",
      Scte35Esam: "scte35Esam",
      Scte35Source: "scte35Source",
      SigningKmsKey: "signingKmsKey",
      TimedMetadata: "timedMetadata",
      TimedMetadataBoxVersion: "timedMetadataBoxVersion",
      TimedMetadataSchemeIdUri: "timedMetadataSchemeIdUri",
      TimedMetadataValue: "timedMetadataValue",
    }),
  ),
).annotate({ identifier: "MpdSettings" }) as any as S.Schema<MpdSettings>;
export type MxfAfdSignaling = "NO_COPY" | "COPY_FROM_VIDEO" | (string & {});
export const MxfAfdSignaling = S.String;

export type MxfProfile =
  | "D_10"
  | "XDCAM"
  | "OP1A"
  | "XAVC"
  | "XDCAM_RDD9"
  | (string & {});
export const MxfProfile = S.String;

export type MxfUncompressedAudioWrapping = "AUTO" | "AES3" | (string & {});
export const MxfUncompressedAudioWrapping = S.String;

export type MxfXavcDurationMode =
  | "ALLOW_ANY_DURATION"
  | "DROP_FRAMES_FOR_COMPLIANCE"
  | (string & {});
export const MxfXavcDurationMode = S.String;

export interface MxfXavcProfileSettings {
  DurationMode?: MxfXavcDurationMode;
  MaxAncDataSize?: number;
}
export const MxfXavcProfileSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DurationMode: S.optional(MxfXavcDurationMode),
    MaxAncDataSize: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      DurationMode: "durationMode",
      MaxAncDataSize: "maxAncDataSize",
    }),
  ),
).annotate({
  identifier: "MxfXavcProfileSettings",
}) as any as S.Schema<MxfXavcProfileSettings>;
export interface MxfSettings {
  AfdSignaling?: MxfAfdSignaling;
  Profile?: MxfProfile;
  UncompressedAudioWrapping?: MxfUncompressedAudioWrapping;
  XavcProfileSettings?: MxfXavcProfileSettings;
}
export const MxfSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AfdSignaling: S.optional(MxfAfdSignaling),
    Profile: S.optional(MxfProfile),
    UncompressedAudioWrapping: S.optional(MxfUncompressedAudioWrapping),
    XavcProfileSettings: S.optional(MxfXavcProfileSettings),
  }).pipe(
    S.encodeKeys({
      AfdSignaling: "afdSignaling",
      Profile: "profile",
      UncompressedAudioWrapping: "uncompressedAudioWrapping",
      XavcProfileSettings: "xavcProfileSettings",
    }),
  ),
).annotate({ identifier: "MxfSettings" }) as any as S.Schema<MxfSettings>;
export interface ContainerSettings {
  CmfcSettings?: CmfcSettings;
  Container?: ContainerType;
  F4vSettings?: F4vSettings;
  M2tsSettings?: M2tsSettings;
  M3u8Settings?: M3u8Settings;
  MovSettings?: MovSettings;
  Mp4Settings?: Mp4Settings;
  MpdSettings?: MpdSettings;
  MxfSettings?: MxfSettings;
}
export const ContainerSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CmfcSettings: S.optional(CmfcSettings),
    Container: S.optional(ContainerType),
    F4vSettings: S.optional(F4vSettings),
    M2tsSettings: S.optional(M2tsSettings),
    M3u8Settings: S.optional(M3u8Settings),
    MovSettings: S.optional(MovSettings),
    Mp4Settings: S.optional(Mp4Settings),
    MpdSettings: S.optional(MpdSettings),
    MxfSettings: S.optional(MxfSettings),
  }).pipe(
    S.encodeKeys({
      CmfcSettings: "cmfcSettings",
      Container: "container",
      F4vSettings: "f4vSettings",
      M2tsSettings: "m2tsSettings",
      M3u8Settings: "m3u8Settings",
      MovSettings: "movSettings",
      Mp4Settings: "mp4Settings",
      MpdSettings: "mpdSettings",
      MxfSettings: "mxfSettings",
    }),
  ),
).annotate({
  identifier: "ContainerSettings",
}) as any as S.Schema<ContainerSettings>;
export type __stringMax256 = string;
export type HlsAudioOnlyContainer = "AUTOMATIC" | "M2TS" | (string & {});
export const HlsAudioOnlyContainer = S.String;

export type HlsAudioTrackType =
  | "ALTERNATE_AUDIO_AUTO_SELECT_DEFAULT"
  | "ALTERNATE_AUDIO_AUTO_SELECT"
  | "ALTERNATE_AUDIO_NOT_AUTO_SELECT"
  | "AUDIO_ONLY_VARIANT_STREAM"
  | (string & {});
export const HlsAudioTrackType = S.String;

export type HlsDescriptiveVideoServiceFlag =
  | "DONT_FLAG"
  | "FLAG"
  | (string & {});
export const HlsDescriptiveVideoServiceFlag = S.String;

export type HlsIFrameOnlyManifest =
  | "INCLUDE"
  | "INCLUDE_AS_TS"
  | "EXCLUDE"
  | (string & {});
export const HlsIFrameOnlyManifest = S.String;

export interface HlsSettings {
  AudioGroupId?: string;
  AudioOnlyContainer?: HlsAudioOnlyContainer;
  AudioRenditionSets?: string;
  AudioTrackType?: HlsAudioTrackType;
  DescriptiveVideoServiceFlag?: HlsDescriptiveVideoServiceFlag;
  IFrameOnlyManifest?: HlsIFrameOnlyManifest;
  SegmentModifier?: string;
}
export const HlsSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioGroupId: S.optional(S.String),
    AudioOnlyContainer: S.optional(HlsAudioOnlyContainer),
    AudioRenditionSets: S.optional(S.String),
    AudioTrackType: S.optional(HlsAudioTrackType),
    DescriptiveVideoServiceFlag: S.optional(HlsDescriptiveVideoServiceFlag),
    IFrameOnlyManifest: S.optional(HlsIFrameOnlyManifest),
    SegmentModifier: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      AudioGroupId: "audioGroupId",
      AudioOnlyContainer: "audioOnlyContainer",
      AudioRenditionSets: "audioRenditionSets",
      AudioTrackType: "audioTrackType",
      DescriptiveVideoServiceFlag: "descriptiveVideoServiceFlag",
      IFrameOnlyManifest: "iFrameOnlyManifest",
      SegmentModifier: "segmentModifier",
    }),
  ),
).annotate({ identifier: "HlsSettings" }) as any as S.Schema<HlsSettings>;
export interface OutputSettings {
  HlsSettings?: HlsSettings;
}
export const OutputSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ HlsSettings: S.optional(HlsSettings) }).pipe(
    S.encodeKeys({ HlsSettings: "hlsSettings" }),
  ),
).annotate({ identifier: "OutputSettings" }) as any as S.Schema<OutputSettings>;
export type __stringMin0 = string;
export type AfdSignaling = "NONE" | "AUTO" | "FIXED" | (string & {});
export const AfdSignaling = S.String;

export type AntiAlias = "DISABLED" | "ENABLED" | (string & {});
export const AntiAlias = S.String;

export type ChromaPositionMode =
  | "AUTO"
  | "FORCE_CENTER"
  | "FORCE_TOP_LEFT"
  | (string & {});
export const ChromaPositionMode = S.String;

export type Av1AdaptiveQuantization =
  | "OFF"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "HIGHER"
  | "MAX"
  | (string & {});
export const Av1AdaptiveQuantization = S.String;

export type Av1BitDepth = "BIT_8" | "BIT_10" | (string & {});
export const Av1BitDepth = S.String;

export type Av1FilmGrainSynthesis = "DISABLED" | "ENABLED" | (string & {});
export const Av1FilmGrainSynthesis = S.String;

export type Av1FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const Av1FramerateControl = S.String;

export type Av1FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export const Av1FramerateConversionAlgorithm = S.String;

export type __integerMin1000Max1152000000 = number;
export type __integerMin0Max15 = number;
export type __integerMin1Max10 = number;
export type __doubleMin0Max1 = number;
export interface Av1QvbrSettings {
  QvbrQualityLevel?: number;
  QvbrQualityLevelFineTune?: number;
}
export const Av1QvbrSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QvbrQualityLevel: S.optional(S.Number),
    QvbrQualityLevelFineTune: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      QvbrQualityLevel: "qvbrQualityLevel",
      QvbrQualityLevelFineTune: "qvbrQualityLevelFineTune",
    }),
  ),
).annotate({
  identifier: "Av1QvbrSettings",
}) as any as S.Schema<Av1QvbrSettings>;
export type Av1RateControlMode = "QVBR" | (string & {});
export const Av1RateControlMode = S.String;

export type Av1SpatialAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const Av1SpatialAdaptiveQuantization = S.String;

export interface Av1Settings {
  AdaptiveQuantization?: Av1AdaptiveQuantization;
  BitDepth?: Av1BitDepth;
  FilmGrainSynthesis?: Av1FilmGrainSynthesis;
  FramerateControl?: Av1FramerateControl;
  FramerateConversionAlgorithm?: Av1FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopSize?: number;
  MaxBitrate?: number;
  NumberBFramesBetweenReferenceFrames?: number;
  PerFrameMetrics?: FrameMetricType[];
  QvbrSettings?: Av1QvbrSettings;
  RateControlMode?: Av1RateControlMode;
  Slices?: number;
  SpatialAdaptiveQuantization?: Av1SpatialAdaptiveQuantization;
}
export const Av1Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdaptiveQuantization: S.optional(Av1AdaptiveQuantization),
    BitDepth: S.optional(Av1BitDepth),
    FilmGrainSynthesis: S.optional(Av1FilmGrainSynthesis),
    FramerateControl: S.optional(Av1FramerateControl),
    FramerateConversionAlgorithm: S.optional(Av1FramerateConversionAlgorithm),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    GopSize: S.optional(S.Number),
    MaxBitrate: S.optional(S.Number),
    NumberBFramesBetweenReferenceFrames: S.optional(S.Number),
    PerFrameMetrics: S.optional(__listOfFrameMetricType),
    QvbrSettings: S.optional(Av1QvbrSettings),
    RateControlMode: S.optional(Av1RateControlMode),
    Slices: S.optional(S.Number),
    SpatialAdaptiveQuantization: S.optional(Av1SpatialAdaptiveQuantization),
  }).pipe(
    S.encodeKeys({
      AdaptiveQuantization: "adaptiveQuantization",
      BitDepth: "bitDepth",
      FilmGrainSynthesis: "filmGrainSynthesis",
      FramerateControl: "framerateControl",
      FramerateConversionAlgorithm: "framerateConversionAlgorithm",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      GopSize: "gopSize",
      MaxBitrate: "maxBitrate",
      NumberBFramesBetweenReferenceFrames:
        "numberBFramesBetweenReferenceFrames",
      PerFrameMetrics: "perFrameMetrics",
      QvbrSettings: "qvbrSettings",
      RateControlMode: "rateControlMode",
      Slices: "slices",
      SpatialAdaptiveQuantization: "spatialAdaptiveQuantization",
    }),
  ),
).annotate({ identifier: "Av1Settings" }) as any as S.Schema<Av1Settings>;
export type AvcIntraClass =
  | "CLASS_50"
  | "CLASS_100"
  | "CLASS_200"
  | "CLASS_4K_2K"
  | (string & {});
export const AvcIntraClass = S.String;

export type AvcIntraUhdQualityTuningLevel =
  | "SINGLE_PASS"
  | "MULTI_PASS"
  | (string & {});
export const AvcIntraUhdQualityTuningLevel = S.String;

export interface AvcIntraUhdSettings {
  QualityTuningLevel?: AvcIntraUhdQualityTuningLevel;
}
export const AvcIntraUhdSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    QualityTuningLevel: S.optional(AvcIntraUhdQualityTuningLevel),
  }).pipe(S.encodeKeys({ QualityTuningLevel: "qualityTuningLevel" })),
).annotate({
  identifier: "AvcIntraUhdSettings",
}) as any as S.Schema<AvcIntraUhdSettings>;
export type AvcIntraFramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const AvcIntraFramerateControl = S.String;

export type AvcIntraFramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export const AvcIntraFramerateConversionAlgorithm = S.String;

export type __integerMin24Max60000 = number;
export type AvcIntraInterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export const AvcIntraInterlaceMode = S.String;

export type AvcIntraScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export const AvcIntraScanTypeConversionMode = S.String;

export type AvcIntraSlowPal = "DISABLED" | "ENABLED" | (string & {});
export const AvcIntraSlowPal = S.String;

export type AvcIntraTelecine = "NONE" | "HARD" | (string & {});
export const AvcIntraTelecine = S.String;

export interface AvcIntraSettings {
  AvcIntraClass?: AvcIntraClass;
  AvcIntraUhdSettings?: AvcIntraUhdSettings;
  FramerateControl?: AvcIntraFramerateControl;
  FramerateConversionAlgorithm?: AvcIntraFramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  InterlaceMode?: AvcIntraInterlaceMode;
  PerFrameMetrics?: FrameMetricType[];
  ScanTypeConversionMode?: AvcIntraScanTypeConversionMode;
  SlowPal?: AvcIntraSlowPal;
  Telecine?: AvcIntraTelecine;
}
export const AvcIntraSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AvcIntraClass: S.optional(AvcIntraClass),
    AvcIntraUhdSettings: S.optional(AvcIntraUhdSettings),
    FramerateControl: S.optional(AvcIntraFramerateControl),
    FramerateConversionAlgorithm: S.optional(
      AvcIntraFramerateConversionAlgorithm,
    ),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    InterlaceMode: S.optional(AvcIntraInterlaceMode),
    PerFrameMetrics: S.optional(__listOfFrameMetricType),
    ScanTypeConversionMode: S.optional(AvcIntraScanTypeConversionMode),
    SlowPal: S.optional(AvcIntraSlowPal),
    Telecine: S.optional(AvcIntraTelecine),
  }).pipe(
    S.encodeKeys({
      AvcIntraClass: "avcIntraClass",
      AvcIntraUhdSettings: "avcIntraUhdSettings",
      FramerateControl: "framerateControl",
      FramerateConversionAlgorithm: "framerateConversionAlgorithm",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      InterlaceMode: "interlaceMode",
      PerFrameMetrics: "perFrameMetrics",
      ScanTypeConversionMode: "scanTypeConversionMode",
      SlowPal: "slowPal",
      Telecine: "telecine",
    }),
  ),
).annotate({
  identifier: "AvcIntraSettings",
}) as any as S.Schema<AvcIntraSettings>;
export type VideoCodec =
  | "AV1"
  | "AVC_INTRA"
  | "FRAME_CAPTURE"
  | "GIF"
  | "H_264"
  | "H_265"
  | "MPEG2"
  | "PASSTHROUGH"
  | "PRORES"
  | "UNCOMPRESSED"
  | "VC3"
  | "VP8"
  | "VP9"
  | "XAVC"
  | (string & {});
export const VideoCodec = S.String;

export type __integerMin1Max10000000 = number;
export type __integerMin1Max100 = number;
export interface FrameCaptureSettings {
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  MaxCaptures?: number;
  Quality?: number;
}
export const FrameCaptureSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    MaxCaptures: S.optional(S.Number),
    Quality: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      MaxCaptures: "maxCaptures",
      Quality: "quality",
    }),
  ),
).annotate({
  identifier: "FrameCaptureSettings",
}) as any as S.Schema<FrameCaptureSettings>;
export type GifFramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const GifFramerateControl = S.String;

export type GifFramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | (string & {});
export const GifFramerateConversionAlgorithm = S.String;

export interface GifSettings {
  FramerateControl?: GifFramerateControl;
  FramerateConversionAlgorithm?: GifFramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
}
export const GifSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FramerateControl: S.optional(GifFramerateControl),
    FramerateConversionAlgorithm: S.optional(GifFramerateConversionAlgorithm),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      FramerateControl: "framerateControl",
      FramerateConversionAlgorithm: "framerateConversionAlgorithm",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
    }),
  ),
).annotate({ identifier: "GifSettings" }) as any as S.Schema<GifSettings>;
export type H264AdaptiveQuantization =
  | "OFF"
  | "AUTO"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "HIGHER"
  | "MAX"
  | (string & {});
export const H264AdaptiveQuantization = S.String;

export type BandwidthReductionFilterSharpening =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "OFF"
  | (string & {});
export const BandwidthReductionFilterSharpening = S.String;

export type BandwidthReductionFilterStrength =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "AUTO"
  | "OFF"
  | (string & {});
export const BandwidthReductionFilterStrength = S.String;

export interface BandwidthReductionFilter {
  Sharpening?: BandwidthReductionFilterSharpening;
  Strength?: BandwidthReductionFilterStrength;
}
export const BandwidthReductionFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Sharpening: S.optional(BandwidthReductionFilterSharpening),
    Strength: S.optional(BandwidthReductionFilterStrength),
  }).pipe(S.encodeKeys({ Sharpening: "sharpening", Strength: "strength" })),
).annotate({
  identifier: "BandwidthReductionFilter",
}) as any as S.Schema<BandwidthReductionFilter>;
export type H264CodecLevel =
  | "AUTO"
  | "LEVEL_1"
  | "LEVEL_1_1"
  | "LEVEL_1_2"
  | "LEVEL_1_3"
  | "LEVEL_2"
  | "LEVEL_2_1"
  | "LEVEL_2_2"
  | "LEVEL_3"
  | "LEVEL_3_1"
  | "LEVEL_3_2"
  | "LEVEL_4"
  | "LEVEL_4_1"
  | "LEVEL_4_2"
  | "LEVEL_5"
  | "LEVEL_5_1"
  | "LEVEL_5_2"
  | (string & {});
export const H264CodecLevel = S.String;

export type H264CodecProfile =
  | "BASELINE"
  | "HIGH"
  | "HIGH_10BIT"
  | "HIGH_422"
  | "HIGH_422_10BIT"
  | "MAIN"
  | (string & {});
export const H264CodecProfile = S.String;

export type H264DynamicSubGop = "ADAPTIVE" | "STATIC" | (string & {});
export const H264DynamicSubGop = S.String;

export type H264EndOfStreamMarkers = "INCLUDE" | "SUPPRESS" | (string & {});
export const H264EndOfStreamMarkers = S.String;

export type H264EntropyEncoding = "CABAC" | "CAVLC" | (string & {});
export const H264EntropyEncoding = S.String;

export type H264ExplicitWeightedPrediction =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const H264ExplicitWeightedPrediction = S.String;

export type H264FieldEncoding =
  | "PAFF"
  | "FORCE_FIELD"
  | "MBAFF"
  | (string & {});
export const H264FieldEncoding = S.String;

export type H264FlickerAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const H264FlickerAdaptiveQuantization = S.String;

export type H264FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const H264FramerateControl = S.String;

export type H264FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export const H264FramerateConversionAlgorithm = S.String;

export type H264GopBReference = "DISABLED" | "ENABLED" | (string & {});
export const H264GopBReference = S.String;

export type H264GopSizeUnits = "FRAMES" | "SECONDS" | "AUTO" | (string & {});
export const H264GopSizeUnits = S.String;

export type __integerMin0Max1152000000 = number;
export type H264InterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export const H264InterlaceMode = S.String;

export type __integerMin0Max30 = number;
export type __integerMin0Max7 = number;
export type H264ParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const H264ParControl = S.String;

export type H264QualityTuningLevel =
  | "SINGLE_PASS"
  | "SINGLE_PASS_HQ"
  | "MULTI_PASS_HQ"
  | (string & {});
export const H264QualityTuningLevel = S.String;

export interface H264QvbrSettings {
  MaxAverageBitrate?: number;
  QvbrQualityLevel?: number;
  QvbrQualityLevelFineTune?: number;
}
export const H264QvbrSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxAverageBitrate: S.optional(S.Number),
    QvbrQualityLevel: S.optional(S.Number),
    QvbrQualityLevelFineTune: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      MaxAverageBitrate: "maxAverageBitrate",
      QvbrQualityLevel: "qvbrQualityLevel",
      QvbrQualityLevelFineTune: "qvbrQualityLevelFineTune",
    }),
  ),
).annotate({
  identifier: "H264QvbrSettings",
}) as any as S.Schema<H264QvbrSettings>;
export type H264RateControlMode = "VBR" | "CBR" | "QVBR" | (string & {});
export const H264RateControlMode = S.String;

export type H264RepeatPps = "DISABLED" | "ENABLED" | (string & {});
export const H264RepeatPps = S.String;

export type H264SaliencyAwareEncoding =
  | "DISABLED"
  | "PREFERRED"
  | (string & {});
export const H264SaliencyAwareEncoding = S.String;

export type H264ScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export const H264ScanTypeConversionMode = S.String;

export type H264SceneChangeDetect =
  | "DISABLED"
  | "ENABLED"
  | "TRANSITION_DETECTION"
  | (string & {});
export const H264SceneChangeDetect = S.String;

export type H264SlowPal = "DISABLED" | "ENABLED" | (string & {});
export const H264SlowPal = S.String;

export type __integerMin0Max128 = number;
export type H264SpatialAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const H264SpatialAdaptiveQuantization = S.String;

export type H264Syntax = "DEFAULT" | "RP2027" | (string & {});
export const H264Syntax = S.String;

export type H264Telecine = "NONE" | "SOFT" | "HARD" | (string & {});
export const H264Telecine = S.String;

export type H264TemporalAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const H264TemporalAdaptiveQuantization = S.String;

export type H264UnregisteredSeiTimecode =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const H264UnregisteredSeiTimecode = S.String;

export type H264WriteMp4PackagingType = "AVC1" | "AVC3" | (string & {});
export const H264WriteMp4PackagingType = S.String;

export interface H264Settings {
  AdaptiveQuantization?: H264AdaptiveQuantization;
  BandwidthReductionFilter?: BandwidthReductionFilter;
  Bitrate?: number;
  CodecLevel?: H264CodecLevel;
  CodecProfile?: H264CodecProfile;
  DynamicSubGop?: H264DynamicSubGop;
  EndOfStreamMarkers?: H264EndOfStreamMarkers;
  EntropyEncoding?: H264EntropyEncoding;
  ExplicitWeightedPrediction?: H264ExplicitWeightedPrediction;
  FieldEncoding?: H264FieldEncoding;
  FlickerAdaptiveQuantization?: H264FlickerAdaptiveQuantization;
  FramerateControl?: H264FramerateControl;
  FramerateConversionAlgorithm?: H264FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopBReference?: H264GopBReference;
  GopClosedCadence?: number;
  GopSize?: number;
  GopSizeUnits?: H264GopSizeUnits;
  HrdBufferFinalFillPercentage?: number;
  HrdBufferInitialFillPercentage?: number;
  HrdBufferSize?: number;
  InterlaceMode?: H264InterlaceMode;
  MaxBitrate?: number;
  MinIInterval?: number;
  NumberBFramesBetweenReferenceFrames?: number;
  NumberReferenceFrames?: number;
  ParControl?: H264ParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  PerFrameMetrics?: FrameMetricType[];
  QualityTuningLevel?: H264QualityTuningLevel;
  QvbrSettings?: H264QvbrSettings;
  RateControlMode?: H264RateControlMode;
  RepeatPps?: H264RepeatPps;
  SaliencyAwareEncoding?: H264SaliencyAwareEncoding;
  ScanTypeConversionMode?: H264ScanTypeConversionMode;
  SceneChangeDetect?: H264SceneChangeDetect;
  Slices?: number;
  SlowPal?: H264SlowPal;
  Softness?: number;
  SpatialAdaptiveQuantization?: H264SpatialAdaptiveQuantization;
  Syntax?: H264Syntax;
  Telecine?: H264Telecine;
  TemporalAdaptiveQuantization?: H264TemporalAdaptiveQuantization;
  UnregisteredSeiTimecode?: H264UnregisteredSeiTimecode;
  WriteMp4PackagingType?: H264WriteMp4PackagingType;
}
export const H264Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdaptiveQuantization: S.optional(H264AdaptiveQuantization),
    BandwidthReductionFilter: S.optional(BandwidthReductionFilter),
    Bitrate: S.optional(S.Number),
    CodecLevel: S.optional(H264CodecLevel),
    CodecProfile: S.optional(H264CodecProfile),
    DynamicSubGop: S.optional(H264DynamicSubGop),
    EndOfStreamMarkers: S.optional(H264EndOfStreamMarkers),
    EntropyEncoding: S.optional(H264EntropyEncoding),
    ExplicitWeightedPrediction: S.optional(H264ExplicitWeightedPrediction),
    FieldEncoding: S.optional(H264FieldEncoding),
    FlickerAdaptiveQuantization: S.optional(H264FlickerAdaptiveQuantization),
    FramerateControl: S.optional(H264FramerateControl),
    FramerateConversionAlgorithm: S.optional(H264FramerateConversionAlgorithm),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    GopBReference: S.optional(H264GopBReference),
    GopClosedCadence: S.optional(S.Number),
    GopSize: S.optional(S.Number),
    GopSizeUnits: S.optional(H264GopSizeUnits),
    HrdBufferFinalFillPercentage: S.optional(S.Number),
    HrdBufferInitialFillPercentage: S.optional(S.Number),
    HrdBufferSize: S.optional(S.Number),
    InterlaceMode: S.optional(H264InterlaceMode),
    MaxBitrate: S.optional(S.Number),
    MinIInterval: S.optional(S.Number),
    NumberBFramesBetweenReferenceFrames: S.optional(S.Number),
    NumberReferenceFrames: S.optional(S.Number),
    ParControl: S.optional(H264ParControl),
    ParDenominator: S.optional(S.Number),
    ParNumerator: S.optional(S.Number),
    PerFrameMetrics: S.optional(__listOfFrameMetricType),
    QualityTuningLevel: S.optional(H264QualityTuningLevel),
    QvbrSettings: S.optional(H264QvbrSettings),
    RateControlMode: S.optional(H264RateControlMode),
    RepeatPps: S.optional(H264RepeatPps),
    SaliencyAwareEncoding: S.optional(H264SaliencyAwareEncoding),
    ScanTypeConversionMode: S.optional(H264ScanTypeConversionMode),
    SceneChangeDetect: S.optional(H264SceneChangeDetect),
    Slices: S.optional(S.Number),
    SlowPal: S.optional(H264SlowPal),
    Softness: S.optional(S.Number),
    SpatialAdaptiveQuantization: S.optional(H264SpatialAdaptiveQuantization),
    Syntax: S.optional(H264Syntax),
    Telecine: S.optional(H264Telecine),
    TemporalAdaptiveQuantization: S.optional(H264TemporalAdaptiveQuantization),
    UnregisteredSeiTimecode: S.optional(H264UnregisteredSeiTimecode),
    WriteMp4PackagingType: S.optional(H264WriteMp4PackagingType),
  }).pipe(
    S.encodeKeys({
      AdaptiveQuantization: "adaptiveQuantization",
      BandwidthReductionFilter: "bandwidthReductionFilter",
      Bitrate: "bitrate",
      CodecLevel: "codecLevel",
      CodecProfile: "codecProfile",
      DynamicSubGop: "dynamicSubGop",
      EndOfStreamMarkers: "endOfStreamMarkers",
      EntropyEncoding: "entropyEncoding",
      ExplicitWeightedPrediction: "explicitWeightedPrediction",
      FieldEncoding: "fieldEncoding",
      FlickerAdaptiveQuantization: "flickerAdaptiveQuantization",
      FramerateControl: "framerateControl",
      FramerateConversionAlgorithm: "framerateConversionAlgorithm",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      GopBReference: "gopBReference",
      GopClosedCadence: "gopClosedCadence",
      GopSize: "gopSize",
      GopSizeUnits: "gopSizeUnits",
      HrdBufferFinalFillPercentage: "hrdBufferFinalFillPercentage",
      HrdBufferInitialFillPercentage: "hrdBufferInitialFillPercentage",
      HrdBufferSize: "hrdBufferSize",
      InterlaceMode: "interlaceMode",
      MaxBitrate: "maxBitrate",
      MinIInterval: "minIInterval",
      NumberBFramesBetweenReferenceFrames:
        "numberBFramesBetweenReferenceFrames",
      NumberReferenceFrames: "numberReferenceFrames",
      ParControl: "parControl",
      ParDenominator: "parDenominator",
      ParNumerator: "parNumerator",
      PerFrameMetrics: "perFrameMetrics",
      QualityTuningLevel: "qualityTuningLevel",
      QvbrSettings: "qvbrSettings",
      RateControlMode: "rateControlMode",
      RepeatPps: "repeatPps",
      SaliencyAwareEncoding: "saliencyAwareEncoding",
      ScanTypeConversionMode: "scanTypeConversionMode",
      SceneChangeDetect: "sceneChangeDetect",
      Slices: "slices",
      SlowPal: "slowPal",
      Softness: "softness",
      SpatialAdaptiveQuantization: "spatialAdaptiveQuantization",
      Syntax: "syntax",
      Telecine: "telecine",
      TemporalAdaptiveQuantization: "temporalAdaptiveQuantization",
      UnregisteredSeiTimecode: "unregisteredSeiTimecode",
      WriteMp4PackagingType: "writeMp4PackagingType",
    }),
  ),
).annotate({ identifier: "H264Settings" }) as any as S.Schema<H264Settings>;
export type H265AdaptiveQuantization =
  | "OFF"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "HIGHER"
  | "MAX"
  | "AUTO"
  | (string & {});
export const H265AdaptiveQuantization = S.String;

export type H265AlternateTransferFunctionSei =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const H265AlternateTransferFunctionSei = S.String;

export type __integerMin1000Max1466400000 = number;
export type H265CodecLevel =
  | "AUTO"
  | "LEVEL_1"
  | "LEVEL_2"
  | "LEVEL_2_1"
  | "LEVEL_3"
  | "LEVEL_3_1"
  | "LEVEL_4"
  | "LEVEL_4_1"
  | "LEVEL_5"
  | "LEVEL_5_1"
  | "LEVEL_5_2"
  | "LEVEL_6"
  | "LEVEL_6_1"
  | "LEVEL_6_2"
  | (string & {});
export const H265CodecLevel = S.String;

export type H265CodecProfile =
  | "MAIN_MAIN"
  | "MAIN_HIGH"
  | "MAIN10_MAIN"
  | "MAIN10_HIGH"
  | "MAIN_422_8BIT_MAIN"
  | "MAIN_422_8BIT_HIGH"
  | "MAIN_422_10BIT_MAIN"
  | "MAIN_422_10BIT_HIGH"
  | (string & {});
export const H265CodecProfile = S.String;

export type H265Deblocking = "ENABLED" | "DISABLED" | (string & {});
export const H265Deblocking = S.String;

export type H265DynamicSubGop = "ADAPTIVE" | "STATIC" | (string & {});
export const H265DynamicSubGop = S.String;

export type H265EndOfStreamMarkers = "INCLUDE" | "SUPPRESS" | (string & {});
export const H265EndOfStreamMarkers = S.String;

export type H265FlickerAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const H265FlickerAdaptiveQuantization = S.String;

export type H265FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const H265FramerateControl = S.String;

export type H265FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export const H265FramerateConversionAlgorithm = S.String;

export type H265GopBReference = "DISABLED" | "ENABLED" | (string & {});
export const H265GopBReference = S.String;

export type H265GopSizeUnits = "FRAMES" | "SECONDS" | "AUTO" | (string & {});
export const H265GopSizeUnits = S.String;

export type __integerMin0Max1466400000 = number;
export type H265InterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export const H265InterlaceMode = S.String;

export type H265MvOverPictureBoundaries =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export const H265MvOverPictureBoundaries = S.String;

export type H265MvTemporalPredictor = "ENABLED" | "DISABLED" | (string & {});
export const H265MvTemporalPredictor = S.String;

export type H265ParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const H265ParControl = S.String;

export type H265QualityTuningLevel =
  | "SINGLE_PASS"
  | "SINGLE_PASS_HQ"
  | "MULTI_PASS_HQ"
  | (string & {});
export const H265QualityTuningLevel = S.String;

export interface H265QvbrSettings {
  MaxAverageBitrate?: number;
  QvbrQualityLevel?: number;
  QvbrQualityLevelFineTune?: number;
}
export const H265QvbrSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxAverageBitrate: S.optional(S.Number),
    QvbrQualityLevel: S.optional(S.Number),
    QvbrQualityLevelFineTune: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      MaxAverageBitrate: "maxAverageBitrate",
      QvbrQualityLevel: "qvbrQualityLevel",
      QvbrQualityLevelFineTune: "qvbrQualityLevelFineTune",
    }),
  ),
).annotate({
  identifier: "H265QvbrSettings",
}) as any as S.Schema<H265QvbrSettings>;
export type H265RateControlMode = "VBR" | "CBR" | "QVBR" | (string & {});
export const H265RateControlMode = S.String;

export type H265SampleAdaptiveOffsetFilterMode =
  | "DEFAULT"
  | "ADAPTIVE"
  | "OFF"
  | (string & {});
export const H265SampleAdaptiveOffsetFilterMode = S.String;

export type H265ScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export const H265ScanTypeConversionMode = S.String;

export type H265SceneChangeDetect =
  | "DISABLED"
  | "ENABLED"
  | "TRANSITION_DETECTION"
  | (string & {});
export const H265SceneChangeDetect = S.String;

export type H265SlowPal = "DISABLED" | "ENABLED" | (string & {});
export const H265SlowPal = S.String;

export type H265SpatialAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const H265SpatialAdaptiveQuantization = S.String;

export type H265Telecine = "NONE" | "SOFT" | "HARD" | (string & {});
export const H265Telecine = S.String;

export type H265TemporalAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const H265TemporalAdaptiveQuantization = S.String;

export type H265TemporalIds = "DISABLED" | "ENABLED" | (string & {});
export const H265TemporalIds = S.String;

export type __integerMin64Max2160 = number;
export type H265TilePadding = "NONE" | "PADDED" | (string & {});
export const H265TilePadding = S.String;

export type __integerMin256Max3840 = number;
export type H265Tiles = "DISABLED" | "ENABLED" | (string & {});
export const H265Tiles = S.String;

export type H265TreeBlockSize = "AUTO" | "TREE_SIZE_32X32" | (string & {});
export const H265TreeBlockSize = S.String;

export type H265UnregisteredSeiTimecode =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const H265UnregisteredSeiTimecode = S.String;

export type H265WriteMp4PackagingType = "HVC1" | "HEV1" | (string & {});
export const H265WriteMp4PackagingType = S.String;

export interface H265Settings {
  AdaptiveQuantization?: H265AdaptiveQuantization;
  AlternateTransferFunctionSei?: H265AlternateTransferFunctionSei;
  BandwidthReductionFilter?: BandwidthReductionFilter;
  Bitrate?: number;
  CodecLevel?: H265CodecLevel;
  CodecProfile?: H265CodecProfile;
  Deblocking?: H265Deblocking;
  DynamicSubGop?: H265DynamicSubGop;
  EndOfStreamMarkers?: H265EndOfStreamMarkers;
  FlickerAdaptiveQuantization?: H265FlickerAdaptiveQuantization;
  FramerateControl?: H265FramerateControl;
  FramerateConversionAlgorithm?: H265FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopBReference?: H265GopBReference;
  GopClosedCadence?: number;
  GopSize?: number;
  GopSizeUnits?: H265GopSizeUnits;
  HrdBufferFinalFillPercentage?: number;
  HrdBufferInitialFillPercentage?: number;
  HrdBufferSize?: number;
  InterlaceMode?: H265InterlaceMode;
  MaxBitrate?: number;
  MinIInterval?: number;
  MvOverPictureBoundaries?: H265MvOverPictureBoundaries;
  MvTemporalPredictor?: H265MvTemporalPredictor;
  NumberBFramesBetweenReferenceFrames?: number;
  NumberReferenceFrames?: number;
  ParControl?: H265ParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  PerFrameMetrics?: FrameMetricType[];
  QualityTuningLevel?: H265QualityTuningLevel;
  QvbrSettings?: H265QvbrSettings;
  RateControlMode?: H265RateControlMode;
  SampleAdaptiveOffsetFilterMode?: H265SampleAdaptiveOffsetFilterMode;
  ScanTypeConversionMode?: H265ScanTypeConversionMode;
  SceneChangeDetect?: H265SceneChangeDetect;
  Slices?: number;
  SlowPal?: H265SlowPal;
  SpatialAdaptiveQuantization?: H265SpatialAdaptiveQuantization;
  Telecine?: H265Telecine;
  TemporalAdaptiveQuantization?: H265TemporalAdaptiveQuantization;
  TemporalIds?: H265TemporalIds;
  TileHeight?: number;
  TilePadding?: H265TilePadding;
  TileWidth?: number;
  Tiles?: H265Tiles;
  TreeBlockSize?: H265TreeBlockSize;
  UnregisteredSeiTimecode?: H265UnregisteredSeiTimecode;
  WriteMp4PackagingType?: H265WriteMp4PackagingType;
}
export const H265Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdaptiveQuantization: S.optional(H265AdaptiveQuantization),
    AlternateTransferFunctionSei: S.optional(H265AlternateTransferFunctionSei),
    BandwidthReductionFilter: S.optional(BandwidthReductionFilter),
    Bitrate: S.optional(S.Number),
    CodecLevel: S.optional(H265CodecLevel),
    CodecProfile: S.optional(H265CodecProfile),
    Deblocking: S.optional(H265Deblocking),
    DynamicSubGop: S.optional(H265DynamicSubGop),
    EndOfStreamMarkers: S.optional(H265EndOfStreamMarkers),
    FlickerAdaptiveQuantization: S.optional(H265FlickerAdaptiveQuantization),
    FramerateControl: S.optional(H265FramerateControl),
    FramerateConversionAlgorithm: S.optional(H265FramerateConversionAlgorithm),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    GopBReference: S.optional(H265GopBReference),
    GopClosedCadence: S.optional(S.Number),
    GopSize: S.optional(S.Number),
    GopSizeUnits: S.optional(H265GopSizeUnits),
    HrdBufferFinalFillPercentage: S.optional(S.Number),
    HrdBufferInitialFillPercentage: S.optional(S.Number),
    HrdBufferSize: S.optional(S.Number),
    InterlaceMode: S.optional(H265InterlaceMode),
    MaxBitrate: S.optional(S.Number),
    MinIInterval: S.optional(S.Number),
    MvOverPictureBoundaries: S.optional(H265MvOverPictureBoundaries),
    MvTemporalPredictor: S.optional(H265MvTemporalPredictor),
    NumberBFramesBetweenReferenceFrames: S.optional(S.Number),
    NumberReferenceFrames: S.optional(S.Number),
    ParControl: S.optional(H265ParControl),
    ParDenominator: S.optional(S.Number),
    ParNumerator: S.optional(S.Number),
    PerFrameMetrics: S.optional(__listOfFrameMetricType),
    QualityTuningLevel: S.optional(H265QualityTuningLevel),
    QvbrSettings: S.optional(H265QvbrSettings),
    RateControlMode: S.optional(H265RateControlMode),
    SampleAdaptiveOffsetFilterMode: S.optional(
      H265SampleAdaptiveOffsetFilterMode,
    ),
    ScanTypeConversionMode: S.optional(H265ScanTypeConversionMode),
    SceneChangeDetect: S.optional(H265SceneChangeDetect),
    Slices: S.optional(S.Number),
    SlowPal: S.optional(H265SlowPal),
    SpatialAdaptiveQuantization: S.optional(H265SpatialAdaptiveQuantization),
    Telecine: S.optional(H265Telecine),
    TemporalAdaptiveQuantization: S.optional(H265TemporalAdaptiveQuantization),
    TemporalIds: S.optional(H265TemporalIds),
    TileHeight: S.optional(S.Number),
    TilePadding: S.optional(H265TilePadding),
    TileWidth: S.optional(S.Number),
    Tiles: S.optional(H265Tiles),
    TreeBlockSize: S.optional(H265TreeBlockSize),
    UnregisteredSeiTimecode: S.optional(H265UnregisteredSeiTimecode),
    WriteMp4PackagingType: S.optional(H265WriteMp4PackagingType),
  }).pipe(
    S.encodeKeys({
      AdaptiveQuantization: "adaptiveQuantization",
      AlternateTransferFunctionSei: "alternateTransferFunctionSei",
      BandwidthReductionFilter: "bandwidthReductionFilter",
      Bitrate: "bitrate",
      CodecLevel: "codecLevel",
      CodecProfile: "codecProfile",
      Deblocking: "deblocking",
      DynamicSubGop: "dynamicSubGop",
      EndOfStreamMarkers: "endOfStreamMarkers",
      FlickerAdaptiveQuantization: "flickerAdaptiveQuantization",
      FramerateControl: "framerateControl",
      FramerateConversionAlgorithm: "framerateConversionAlgorithm",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      GopBReference: "gopBReference",
      GopClosedCadence: "gopClosedCadence",
      GopSize: "gopSize",
      GopSizeUnits: "gopSizeUnits",
      HrdBufferFinalFillPercentage: "hrdBufferFinalFillPercentage",
      HrdBufferInitialFillPercentage: "hrdBufferInitialFillPercentage",
      HrdBufferSize: "hrdBufferSize",
      InterlaceMode: "interlaceMode",
      MaxBitrate: "maxBitrate",
      MinIInterval: "minIInterval",
      MvOverPictureBoundaries: "mvOverPictureBoundaries",
      MvTemporalPredictor: "mvTemporalPredictor",
      NumberBFramesBetweenReferenceFrames:
        "numberBFramesBetweenReferenceFrames",
      NumberReferenceFrames: "numberReferenceFrames",
      ParControl: "parControl",
      ParDenominator: "parDenominator",
      ParNumerator: "parNumerator",
      PerFrameMetrics: "perFrameMetrics",
      QualityTuningLevel: "qualityTuningLevel",
      QvbrSettings: "qvbrSettings",
      RateControlMode: "rateControlMode",
      SampleAdaptiveOffsetFilterMode: "sampleAdaptiveOffsetFilterMode",
      ScanTypeConversionMode: "scanTypeConversionMode",
      SceneChangeDetect: "sceneChangeDetect",
      Slices: "slices",
      SlowPal: "slowPal",
      SpatialAdaptiveQuantization: "spatialAdaptiveQuantization",
      Telecine: "telecine",
      TemporalAdaptiveQuantization: "temporalAdaptiveQuantization",
      TemporalIds: "temporalIds",
      TileHeight: "tileHeight",
      TilePadding: "tilePadding",
      TileWidth: "tileWidth",
      Tiles: "tiles",
      TreeBlockSize: "treeBlockSize",
      UnregisteredSeiTimecode: "unregisteredSeiTimecode",
      WriteMp4PackagingType: "writeMp4PackagingType",
    }),
  ),
).annotate({ identifier: "H265Settings" }) as any as S.Schema<H265Settings>;
export type Mpeg2AdaptiveQuantization =
  | "OFF"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export const Mpeg2AdaptiveQuantization = S.String;

export type __integerMin1000Max288000000 = number;
export type Mpeg2CodecLevel =
  | "AUTO"
  | "LOW"
  | "MAIN"
  | "HIGH1440"
  | "HIGH"
  | (string & {});
export const Mpeg2CodecLevel = S.String;

export type Mpeg2CodecProfile = "MAIN" | "PROFILE_422" | (string & {});
export const Mpeg2CodecProfile = S.String;

export type Mpeg2DynamicSubGop = "ADAPTIVE" | "STATIC" | (string & {});
export const Mpeg2DynamicSubGop = S.String;

export type Mpeg2FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const Mpeg2FramerateControl = S.String;

export type Mpeg2FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export const Mpeg2FramerateConversionAlgorithm = S.String;

export type Mpeg2GopSizeUnits = "FRAMES" | "SECONDS" | (string & {});
export const Mpeg2GopSizeUnits = S.String;

export type __integerMin0Max47185920 = number;
export type Mpeg2InterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export const Mpeg2InterlaceMode = S.String;

export type Mpeg2IntraDcPrecision =
  | "AUTO"
  | "INTRA_DC_PRECISION_8"
  | "INTRA_DC_PRECISION_9"
  | "INTRA_DC_PRECISION_10"
  | "INTRA_DC_PRECISION_11"
  | (string & {});
export const Mpeg2IntraDcPrecision = S.String;

export type __integerMin1000Max300000000 = number;
export type Mpeg2ParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const Mpeg2ParControl = S.String;

export type Mpeg2QualityTuningLevel =
  | "SINGLE_PASS"
  | "MULTI_PASS"
  | (string & {});
export const Mpeg2QualityTuningLevel = S.String;

export type Mpeg2RateControlMode = "VBR" | "CBR" | (string & {});
export const Mpeg2RateControlMode = S.String;

export type Mpeg2ScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export const Mpeg2ScanTypeConversionMode = S.String;

export type Mpeg2SceneChangeDetect = "DISABLED" | "ENABLED" | (string & {});
export const Mpeg2SceneChangeDetect = S.String;

export type Mpeg2SlowPal = "DISABLED" | "ENABLED" | (string & {});
export const Mpeg2SlowPal = S.String;

export type Mpeg2SpatialAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const Mpeg2SpatialAdaptiveQuantization = S.String;

export type Mpeg2Syntax = "DEFAULT" | "D_10" | (string & {});
export const Mpeg2Syntax = S.String;

export type Mpeg2Telecine = "NONE" | "SOFT" | "HARD" | (string & {});
export const Mpeg2Telecine = S.String;

export type Mpeg2TemporalAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const Mpeg2TemporalAdaptiveQuantization = S.String;

export interface Mpeg2Settings {
  AdaptiveQuantization?: Mpeg2AdaptiveQuantization;
  Bitrate?: number;
  CodecLevel?: Mpeg2CodecLevel;
  CodecProfile?: Mpeg2CodecProfile;
  DynamicSubGop?: Mpeg2DynamicSubGop;
  FramerateControl?: Mpeg2FramerateControl;
  FramerateConversionAlgorithm?: Mpeg2FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopClosedCadence?: number;
  GopSize?: number;
  GopSizeUnits?: Mpeg2GopSizeUnits;
  HrdBufferFinalFillPercentage?: number;
  HrdBufferInitialFillPercentage?: number;
  HrdBufferSize?: number;
  InterlaceMode?: Mpeg2InterlaceMode;
  IntraDcPrecision?: Mpeg2IntraDcPrecision;
  MaxBitrate?: number;
  MinIInterval?: number;
  NumberBFramesBetweenReferenceFrames?: number;
  ParControl?: Mpeg2ParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  PerFrameMetrics?: FrameMetricType[];
  QualityTuningLevel?: Mpeg2QualityTuningLevel;
  RateControlMode?: Mpeg2RateControlMode;
  ScanTypeConversionMode?: Mpeg2ScanTypeConversionMode;
  SceneChangeDetect?: Mpeg2SceneChangeDetect;
  SlowPal?: Mpeg2SlowPal;
  Softness?: number;
  SpatialAdaptiveQuantization?: Mpeg2SpatialAdaptiveQuantization;
  Syntax?: Mpeg2Syntax;
  Telecine?: Mpeg2Telecine;
  TemporalAdaptiveQuantization?: Mpeg2TemporalAdaptiveQuantization;
}
export const Mpeg2Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdaptiveQuantization: S.optional(Mpeg2AdaptiveQuantization),
    Bitrate: S.optional(S.Number),
    CodecLevel: S.optional(Mpeg2CodecLevel),
    CodecProfile: S.optional(Mpeg2CodecProfile),
    DynamicSubGop: S.optional(Mpeg2DynamicSubGop),
    FramerateControl: S.optional(Mpeg2FramerateControl),
    FramerateConversionAlgorithm: S.optional(Mpeg2FramerateConversionAlgorithm),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    GopClosedCadence: S.optional(S.Number),
    GopSize: S.optional(S.Number),
    GopSizeUnits: S.optional(Mpeg2GopSizeUnits),
    HrdBufferFinalFillPercentage: S.optional(S.Number),
    HrdBufferInitialFillPercentage: S.optional(S.Number),
    HrdBufferSize: S.optional(S.Number),
    InterlaceMode: S.optional(Mpeg2InterlaceMode),
    IntraDcPrecision: S.optional(Mpeg2IntraDcPrecision),
    MaxBitrate: S.optional(S.Number),
    MinIInterval: S.optional(S.Number),
    NumberBFramesBetweenReferenceFrames: S.optional(S.Number),
    ParControl: S.optional(Mpeg2ParControl),
    ParDenominator: S.optional(S.Number),
    ParNumerator: S.optional(S.Number),
    PerFrameMetrics: S.optional(__listOfFrameMetricType),
    QualityTuningLevel: S.optional(Mpeg2QualityTuningLevel),
    RateControlMode: S.optional(Mpeg2RateControlMode),
    ScanTypeConversionMode: S.optional(Mpeg2ScanTypeConversionMode),
    SceneChangeDetect: S.optional(Mpeg2SceneChangeDetect),
    SlowPal: S.optional(Mpeg2SlowPal),
    Softness: S.optional(S.Number),
    SpatialAdaptiveQuantization: S.optional(Mpeg2SpatialAdaptiveQuantization),
    Syntax: S.optional(Mpeg2Syntax),
    Telecine: S.optional(Mpeg2Telecine),
    TemporalAdaptiveQuantization: S.optional(Mpeg2TemporalAdaptiveQuantization),
  }).pipe(
    S.encodeKeys({
      AdaptiveQuantization: "adaptiveQuantization",
      Bitrate: "bitrate",
      CodecLevel: "codecLevel",
      CodecProfile: "codecProfile",
      DynamicSubGop: "dynamicSubGop",
      FramerateControl: "framerateControl",
      FramerateConversionAlgorithm: "framerateConversionAlgorithm",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      GopClosedCadence: "gopClosedCadence",
      GopSize: "gopSize",
      GopSizeUnits: "gopSizeUnits",
      HrdBufferFinalFillPercentage: "hrdBufferFinalFillPercentage",
      HrdBufferInitialFillPercentage: "hrdBufferInitialFillPercentage",
      HrdBufferSize: "hrdBufferSize",
      InterlaceMode: "interlaceMode",
      IntraDcPrecision: "intraDcPrecision",
      MaxBitrate: "maxBitrate",
      MinIInterval: "minIInterval",
      NumberBFramesBetweenReferenceFrames:
        "numberBFramesBetweenReferenceFrames",
      ParControl: "parControl",
      ParDenominator: "parDenominator",
      ParNumerator: "parNumerator",
      PerFrameMetrics: "perFrameMetrics",
      QualityTuningLevel: "qualityTuningLevel",
      RateControlMode: "rateControlMode",
      ScanTypeConversionMode: "scanTypeConversionMode",
      SceneChangeDetect: "sceneChangeDetect",
      SlowPal: "slowPal",
      Softness: "softness",
      SpatialAdaptiveQuantization: "spatialAdaptiveQuantization",
      Syntax: "syntax",
      Telecine: "telecine",
      TemporalAdaptiveQuantization: "temporalAdaptiveQuantization",
    }),
  ),
).annotate({ identifier: "Mpeg2Settings" }) as any as S.Schema<Mpeg2Settings>;
export type FrameControl =
  | "NEAREST_IDRFRAME"
  | "NEAREST_IFRAME"
  | (string & {});
export const FrameControl = S.String;

export type VideoSelectorMode = "AUTO" | "REMUX_ALL" | (string & {});
export const VideoSelectorMode = S.String;

export interface PassthroughSettings {
  FrameControl?: FrameControl;
  VideoSelectorMode?: VideoSelectorMode;
}
export const PassthroughSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FrameControl: S.optional(FrameControl),
    VideoSelectorMode: S.optional(VideoSelectorMode),
  }).pipe(
    S.encodeKeys({
      FrameControl: "frameControl",
      VideoSelectorMode: "videoSelectorMode",
    }),
  ),
).annotate({
  identifier: "PassthroughSettings",
}) as any as S.Schema<PassthroughSettings>;
export type ProresChromaSampling =
  | "PRESERVE_444_SAMPLING"
  | "SUBSAMPLE_TO_422"
  | (string & {});
export const ProresChromaSampling = S.String;

export type ProresCodecProfile =
  | "APPLE_PRORES_422"
  | "APPLE_PRORES_422_HQ"
  | "APPLE_PRORES_422_LT"
  | "APPLE_PRORES_422_PROXY"
  | "APPLE_PRORES_4444"
  | "APPLE_PRORES_4444_XQ"
  | (string & {});
export const ProresCodecProfile = S.String;

export type ProresFramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const ProresFramerateControl = S.String;

export type ProresFramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export const ProresFramerateConversionAlgorithm = S.String;

export type ProresInterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export const ProresInterlaceMode = S.String;

export type ProresParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const ProresParControl = S.String;

export type ProresScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export const ProresScanTypeConversionMode = S.String;

export type ProresSlowPal = "DISABLED" | "ENABLED" | (string & {});
export const ProresSlowPal = S.String;

export type ProresTelecine = "NONE" | "HARD" | (string & {});
export const ProresTelecine = S.String;

export interface ProresSettings {
  ChromaSampling?: ProresChromaSampling;
  CodecProfile?: ProresCodecProfile;
  FramerateControl?: ProresFramerateControl;
  FramerateConversionAlgorithm?: ProresFramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  InterlaceMode?: ProresInterlaceMode;
  ParControl?: ProresParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  PerFrameMetrics?: FrameMetricType[];
  ScanTypeConversionMode?: ProresScanTypeConversionMode;
  SlowPal?: ProresSlowPal;
  Telecine?: ProresTelecine;
}
export const ProresSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ChromaSampling: S.optional(ProresChromaSampling),
    CodecProfile: S.optional(ProresCodecProfile),
    FramerateControl: S.optional(ProresFramerateControl),
    FramerateConversionAlgorithm: S.optional(
      ProresFramerateConversionAlgorithm,
    ),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    InterlaceMode: S.optional(ProresInterlaceMode),
    ParControl: S.optional(ProresParControl),
    ParDenominator: S.optional(S.Number),
    ParNumerator: S.optional(S.Number),
    PerFrameMetrics: S.optional(__listOfFrameMetricType),
    ScanTypeConversionMode: S.optional(ProresScanTypeConversionMode),
    SlowPal: S.optional(ProresSlowPal),
    Telecine: S.optional(ProresTelecine),
  }).pipe(
    S.encodeKeys({
      ChromaSampling: "chromaSampling",
      CodecProfile: "codecProfile",
      FramerateControl: "framerateControl",
      FramerateConversionAlgorithm: "framerateConversionAlgorithm",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      InterlaceMode: "interlaceMode",
      ParControl: "parControl",
      ParDenominator: "parDenominator",
      ParNumerator: "parNumerator",
      PerFrameMetrics: "perFrameMetrics",
      ScanTypeConversionMode: "scanTypeConversionMode",
      SlowPal: "slowPal",
      Telecine: "telecine",
    }),
  ),
).annotate({ identifier: "ProresSettings" }) as any as S.Schema<ProresSettings>;
export type UncompressedFourcc = "I420" | "I422" | "I444" | (string & {});
export const UncompressedFourcc = S.String;

export type UncompressedFramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const UncompressedFramerateControl = S.String;

export type UncompressedFramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export const UncompressedFramerateConversionAlgorithm = S.String;

export type UncompressedInterlaceMode =
  | "INTERLACED"
  | "PROGRESSIVE"
  | (string & {});
export const UncompressedInterlaceMode = S.String;

export type UncompressedScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export const UncompressedScanTypeConversionMode = S.String;

export type UncompressedSlowPal = "DISABLED" | "ENABLED" | (string & {});
export const UncompressedSlowPal = S.String;

export type UncompressedTelecine = "NONE" | "HARD" | (string & {});
export const UncompressedTelecine = S.String;

export interface UncompressedSettings {
  Fourcc?: UncompressedFourcc;
  FramerateControl?: UncompressedFramerateControl;
  FramerateConversionAlgorithm?: UncompressedFramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  InterlaceMode?: UncompressedInterlaceMode;
  ScanTypeConversionMode?: UncompressedScanTypeConversionMode;
  SlowPal?: UncompressedSlowPal;
  Telecine?: UncompressedTelecine;
}
export const UncompressedSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Fourcc: S.optional(UncompressedFourcc),
    FramerateControl: S.optional(UncompressedFramerateControl),
    FramerateConversionAlgorithm: S.optional(
      UncompressedFramerateConversionAlgorithm,
    ),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    InterlaceMode: S.optional(UncompressedInterlaceMode),
    ScanTypeConversionMode: S.optional(UncompressedScanTypeConversionMode),
    SlowPal: S.optional(UncompressedSlowPal),
    Telecine: S.optional(UncompressedTelecine),
  }).pipe(
    S.encodeKeys({
      Fourcc: "fourcc",
      FramerateControl: "framerateControl",
      FramerateConversionAlgorithm: "framerateConversionAlgorithm",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      InterlaceMode: "interlaceMode",
      ScanTypeConversionMode: "scanTypeConversionMode",
      SlowPal: "slowPal",
      Telecine: "telecine",
    }),
  ),
).annotate({
  identifier: "UncompressedSettings",
}) as any as S.Schema<UncompressedSettings>;
export type Vc3FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const Vc3FramerateControl = S.String;

export type Vc3FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export const Vc3FramerateConversionAlgorithm = S.String;

export type Vc3InterlaceMode = "INTERLACED" | "PROGRESSIVE" | (string & {});
export const Vc3InterlaceMode = S.String;

export type Vc3ScanTypeConversionMode =
  | "INTERLACED"
  | "INTERLACED_OPTIMIZE"
  | (string & {});
export const Vc3ScanTypeConversionMode = S.String;

export type Vc3SlowPal = "DISABLED" | "ENABLED" | (string & {});
export const Vc3SlowPal = S.String;

export type Vc3Telecine = "NONE" | "HARD" | (string & {});
export const Vc3Telecine = S.String;

export type Vc3Class =
  | "CLASS_145_8BIT"
  | "CLASS_220_8BIT"
  | "CLASS_220_10BIT"
  | (string & {});
export const Vc3Class = S.String;

export interface Vc3Settings {
  FramerateControl?: Vc3FramerateControl;
  FramerateConversionAlgorithm?: Vc3FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  InterlaceMode?: Vc3InterlaceMode;
  ScanTypeConversionMode?: Vc3ScanTypeConversionMode;
  SlowPal?: Vc3SlowPal;
  Telecine?: Vc3Telecine;
  Vc3Class?: Vc3Class;
}
export const Vc3Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FramerateControl: S.optional(Vc3FramerateControl),
    FramerateConversionAlgorithm: S.optional(Vc3FramerateConversionAlgorithm),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    InterlaceMode: S.optional(Vc3InterlaceMode),
    ScanTypeConversionMode: S.optional(Vc3ScanTypeConversionMode),
    SlowPal: S.optional(Vc3SlowPal),
    Telecine: S.optional(Vc3Telecine),
    Vc3Class: S.optional(Vc3Class),
  }).pipe(
    S.encodeKeys({
      FramerateControl: "framerateControl",
      FramerateConversionAlgorithm: "framerateConversionAlgorithm",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      InterlaceMode: "interlaceMode",
      ScanTypeConversionMode: "scanTypeConversionMode",
      SlowPal: "slowPal",
      Telecine: "telecine",
      Vc3Class: "vc3Class",
    }),
  ),
).annotate({ identifier: "Vc3Settings" }) as any as S.Schema<Vc3Settings>;
export type Vp8FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const Vp8FramerateControl = S.String;

export type Vp8FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export const Vp8FramerateConversionAlgorithm = S.String;

export type Vp8ParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const Vp8ParControl = S.String;

export type Vp8QualityTuningLevel =
  | "MULTI_PASS"
  | "MULTI_PASS_HQ"
  | (string & {});
export const Vp8QualityTuningLevel = S.String;

export type Vp8RateControlMode = "VBR" | (string & {});
export const Vp8RateControlMode = S.String;

export interface Vp8Settings {
  Bitrate?: number;
  FramerateControl?: Vp8FramerateControl;
  FramerateConversionAlgorithm?: Vp8FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopSize?: number;
  HrdBufferSize?: number;
  MaxBitrate?: number;
  ParControl?: Vp8ParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  QualityTuningLevel?: Vp8QualityTuningLevel;
  RateControlMode?: Vp8RateControlMode;
}
export const Vp8Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bitrate: S.optional(S.Number),
    FramerateControl: S.optional(Vp8FramerateControl),
    FramerateConversionAlgorithm: S.optional(Vp8FramerateConversionAlgorithm),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    GopSize: S.optional(S.Number),
    HrdBufferSize: S.optional(S.Number),
    MaxBitrate: S.optional(S.Number),
    ParControl: S.optional(Vp8ParControl),
    ParDenominator: S.optional(S.Number),
    ParNumerator: S.optional(S.Number),
    QualityTuningLevel: S.optional(Vp8QualityTuningLevel),
    RateControlMode: S.optional(Vp8RateControlMode),
  }).pipe(
    S.encodeKeys({
      Bitrate: "bitrate",
      FramerateControl: "framerateControl",
      FramerateConversionAlgorithm: "framerateConversionAlgorithm",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      GopSize: "gopSize",
      HrdBufferSize: "hrdBufferSize",
      MaxBitrate: "maxBitrate",
      ParControl: "parControl",
      ParDenominator: "parDenominator",
      ParNumerator: "parNumerator",
      QualityTuningLevel: "qualityTuningLevel",
      RateControlMode: "rateControlMode",
    }),
  ),
).annotate({ identifier: "Vp8Settings" }) as any as S.Schema<Vp8Settings>;
export type __integerMin1000Max480000000 = number;
export type Vp9FramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const Vp9FramerateControl = S.String;

export type Vp9FramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export const Vp9FramerateConversionAlgorithm = S.String;

export type Vp9ParControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const Vp9ParControl = S.String;

export type Vp9QualityTuningLevel =
  | "MULTI_PASS"
  | "MULTI_PASS_HQ"
  | (string & {});
export const Vp9QualityTuningLevel = S.String;

export type Vp9RateControlMode = "VBR" | (string & {});
export const Vp9RateControlMode = S.String;

export interface Vp9Settings {
  Bitrate?: number;
  FramerateControl?: Vp9FramerateControl;
  FramerateConversionAlgorithm?: Vp9FramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  GopSize?: number;
  HrdBufferSize?: number;
  MaxBitrate?: number;
  ParControl?: Vp9ParControl;
  ParDenominator?: number;
  ParNumerator?: number;
  QualityTuningLevel?: Vp9QualityTuningLevel;
  RateControlMode?: Vp9RateControlMode;
}
export const Vp9Settings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Bitrate: S.optional(S.Number),
    FramerateControl: S.optional(Vp9FramerateControl),
    FramerateConversionAlgorithm: S.optional(Vp9FramerateConversionAlgorithm),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    GopSize: S.optional(S.Number),
    HrdBufferSize: S.optional(S.Number),
    MaxBitrate: S.optional(S.Number),
    ParControl: S.optional(Vp9ParControl),
    ParDenominator: S.optional(S.Number),
    ParNumerator: S.optional(S.Number),
    QualityTuningLevel: S.optional(Vp9QualityTuningLevel),
    RateControlMode: S.optional(Vp9RateControlMode),
  }).pipe(
    S.encodeKeys({
      Bitrate: "bitrate",
      FramerateControl: "framerateControl",
      FramerateConversionAlgorithm: "framerateConversionAlgorithm",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      GopSize: "gopSize",
      HrdBufferSize: "hrdBufferSize",
      MaxBitrate: "maxBitrate",
      ParControl: "parControl",
      ParDenominator: "parDenominator",
      ParNumerator: "parNumerator",
      QualityTuningLevel: "qualityTuningLevel",
      RateControlMode: "rateControlMode",
    }),
  ),
).annotate({ identifier: "Vp9Settings" }) as any as S.Schema<Vp9Settings>;
export type XavcAdaptiveQuantization =
  | "OFF"
  | "AUTO"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "HIGHER"
  | "MAX"
  | (string & {});
export const XavcAdaptiveQuantization = S.String;

export type XavcEntropyEncoding = "AUTO" | "CABAC" | "CAVLC" | (string & {});
export const XavcEntropyEncoding = S.String;

export type XavcFramerateControl =
  | "INITIALIZE_FROM_SOURCE"
  | "SPECIFIED"
  | (string & {});
export const XavcFramerateControl = S.String;

export type XavcFramerateConversionAlgorithm =
  | "DUPLICATE_DROP"
  | "INTERPOLATE"
  | "FRAMEFORMER"
  | "MAINTAIN_FRAME_COUNT"
  | (string & {});
export const XavcFramerateConversionAlgorithm = S.String;

export type XavcProfile =
  | "XAVC_HD_INTRA_CBG"
  | "XAVC_4K_INTRA_CBG"
  | "XAVC_4K_INTRA_VBR"
  | "XAVC_HD"
  | "XAVC_4K"
  | (string & {});
export const XavcProfile = S.String;

export type XavcSlowPal = "DISABLED" | "ENABLED" | (string & {});
export const XavcSlowPal = S.String;

export type XavcSpatialAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const XavcSpatialAdaptiveQuantization = S.String;

export type XavcTemporalAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const XavcTemporalAdaptiveQuantization = S.String;

export type Xavc4kIntraCbgProfileClass =
  | "CLASS_100"
  | "CLASS_300"
  | "CLASS_480"
  | (string & {});
export const Xavc4kIntraCbgProfileClass = S.String;

export interface Xavc4kIntraCbgProfileSettings {
  XavcClass?: Xavc4kIntraCbgProfileClass;
}
export const Xavc4kIntraCbgProfileSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ XavcClass: S.optional(Xavc4kIntraCbgProfileClass) }).pipe(
    S.encodeKeys({ XavcClass: "xavcClass" }),
  ),
).annotate({
  identifier: "Xavc4kIntraCbgProfileSettings",
}) as any as S.Schema<Xavc4kIntraCbgProfileSettings>;
export type Xavc4kIntraVbrProfileClass =
  | "CLASS_100"
  | "CLASS_300"
  | "CLASS_480"
  | (string & {});
export const Xavc4kIntraVbrProfileClass = S.String;

export interface Xavc4kIntraVbrProfileSettings {
  XavcClass?: Xavc4kIntraVbrProfileClass;
}
export const Xavc4kIntraVbrProfileSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ XavcClass: S.optional(Xavc4kIntraVbrProfileClass) }).pipe(
    S.encodeKeys({ XavcClass: "xavcClass" }),
  ),
).annotate({
  identifier: "Xavc4kIntraVbrProfileSettings",
}) as any as S.Schema<Xavc4kIntraVbrProfileSettings>;
export type Xavc4kProfileBitrateClass =
  | "BITRATE_CLASS_100"
  | "BITRATE_CLASS_140"
  | "BITRATE_CLASS_200"
  | (string & {});
export const Xavc4kProfileBitrateClass = S.String;

export type Xavc4kProfileCodecProfile = "HIGH" | "HIGH_422" | (string & {});
export const Xavc4kProfileCodecProfile = S.String;

export type XavcFlickerAdaptiveQuantization =
  | "DISABLED"
  | "ENABLED"
  | (string & {});
export const XavcFlickerAdaptiveQuantization = S.String;

export type XavcGopBReference = "DISABLED" | "ENABLED" | (string & {});
export const XavcGopBReference = S.String;

export type Xavc4kProfileQualityTuningLevel =
  | "SINGLE_PASS"
  | "SINGLE_PASS_HQ"
  | "MULTI_PASS_HQ"
  | (string & {});
export const Xavc4kProfileQualityTuningLevel = S.String;

export type __integerMin8Max12 = number;
export interface Xavc4kProfileSettings {
  BitrateClass?: Xavc4kProfileBitrateClass;
  CodecProfile?: Xavc4kProfileCodecProfile;
  FlickerAdaptiveQuantization?: XavcFlickerAdaptiveQuantization;
  GopBReference?: XavcGopBReference;
  GopClosedCadence?: number;
  HrdBufferSize?: number;
  QualityTuningLevel?: Xavc4kProfileQualityTuningLevel;
  Slices?: number;
}
export const Xavc4kProfileSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BitrateClass: S.optional(Xavc4kProfileBitrateClass),
    CodecProfile: S.optional(Xavc4kProfileCodecProfile),
    FlickerAdaptiveQuantization: S.optional(XavcFlickerAdaptiveQuantization),
    GopBReference: S.optional(XavcGopBReference),
    GopClosedCadence: S.optional(S.Number),
    HrdBufferSize: S.optional(S.Number),
    QualityTuningLevel: S.optional(Xavc4kProfileQualityTuningLevel),
    Slices: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BitrateClass: "bitrateClass",
      CodecProfile: "codecProfile",
      FlickerAdaptiveQuantization: "flickerAdaptiveQuantization",
      GopBReference: "gopBReference",
      GopClosedCadence: "gopClosedCadence",
      HrdBufferSize: "hrdBufferSize",
      QualityTuningLevel: "qualityTuningLevel",
      Slices: "slices",
    }),
  ),
).annotate({
  identifier: "Xavc4kProfileSettings",
}) as any as S.Schema<Xavc4kProfileSettings>;
export type XavcHdIntraCbgProfileClass =
  | "CLASS_50"
  | "CLASS_100"
  | "CLASS_200"
  | (string & {});
export const XavcHdIntraCbgProfileClass = S.String;

export interface XavcHdIntraCbgProfileSettings {
  XavcClass?: XavcHdIntraCbgProfileClass;
}
export const XavcHdIntraCbgProfileSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ XavcClass: S.optional(XavcHdIntraCbgProfileClass) }).pipe(
    S.encodeKeys({ XavcClass: "xavcClass" }),
  ),
).annotate({
  identifier: "XavcHdIntraCbgProfileSettings",
}) as any as S.Schema<XavcHdIntraCbgProfileSettings>;
export type XavcHdProfileBitrateClass =
  | "BITRATE_CLASS_25"
  | "BITRATE_CLASS_35"
  | "BITRATE_CLASS_50"
  | (string & {});
export const XavcHdProfileBitrateClass = S.String;

export type XavcInterlaceMode =
  | "PROGRESSIVE"
  | "TOP_FIELD"
  | "BOTTOM_FIELD"
  | "FOLLOW_TOP_FIELD"
  | "FOLLOW_BOTTOM_FIELD"
  | (string & {});
export const XavcInterlaceMode = S.String;

export type XavcHdProfileQualityTuningLevel =
  | "SINGLE_PASS"
  | "SINGLE_PASS_HQ"
  | "MULTI_PASS_HQ"
  | (string & {});
export const XavcHdProfileQualityTuningLevel = S.String;

export type __integerMin4Max12 = number;
export type XavcHdProfileTelecine = "NONE" | "HARD" | (string & {});
export const XavcHdProfileTelecine = S.String;

export interface XavcHdProfileSettings {
  BitrateClass?: XavcHdProfileBitrateClass;
  FlickerAdaptiveQuantization?: XavcFlickerAdaptiveQuantization;
  GopBReference?: XavcGopBReference;
  GopClosedCadence?: number;
  HrdBufferSize?: number;
  InterlaceMode?: XavcInterlaceMode;
  QualityTuningLevel?: XavcHdProfileQualityTuningLevel;
  Slices?: number;
  Telecine?: XavcHdProfileTelecine;
}
export const XavcHdProfileSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BitrateClass: S.optional(XavcHdProfileBitrateClass),
    FlickerAdaptiveQuantization: S.optional(XavcFlickerAdaptiveQuantization),
    GopBReference: S.optional(XavcGopBReference),
    GopClosedCadence: S.optional(S.Number),
    HrdBufferSize: S.optional(S.Number),
    InterlaceMode: S.optional(XavcInterlaceMode),
    QualityTuningLevel: S.optional(XavcHdProfileQualityTuningLevel),
    Slices: S.optional(S.Number),
    Telecine: S.optional(XavcHdProfileTelecine),
  }).pipe(
    S.encodeKeys({
      BitrateClass: "bitrateClass",
      FlickerAdaptiveQuantization: "flickerAdaptiveQuantization",
      GopBReference: "gopBReference",
      GopClosedCadence: "gopClosedCadence",
      HrdBufferSize: "hrdBufferSize",
      InterlaceMode: "interlaceMode",
      QualityTuningLevel: "qualityTuningLevel",
      Slices: "slices",
      Telecine: "telecine",
    }),
  ),
).annotate({
  identifier: "XavcHdProfileSettings",
}) as any as S.Schema<XavcHdProfileSettings>;
export interface XavcSettings {
  AdaptiveQuantization?: XavcAdaptiveQuantization;
  EntropyEncoding?: XavcEntropyEncoding;
  FramerateControl?: XavcFramerateControl;
  FramerateConversionAlgorithm?: XavcFramerateConversionAlgorithm;
  FramerateDenominator?: number;
  FramerateNumerator?: number;
  PerFrameMetrics?: FrameMetricType[];
  Profile?: XavcProfile;
  SlowPal?: XavcSlowPal;
  Softness?: number;
  SpatialAdaptiveQuantization?: XavcSpatialAdaptiveQuantization;
  TemporalAdaptiveQuantization?: XavcTemporalAdaptiveQuantization;
  Xavc4kIntraCbgProfileSettings?: Xavc4kIntraCbgProfileSettings;
  Xavc4kIntraVbrProfileSettings?: Xavc4kIntraVbrProfileSettings;
  Xavc4kProfileSettings?: Xavc4kProfileSettings;
  XavcHdIntraCbgProfileSettings?: XavcHdIntraCbgProfileSettings;
  XavcHdProfileSettings?: XavcHdProfileSettings;
}
export const XavcSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdaptiveQuantization: S.optional(XavcAdaptiveQuantization),
    EntropyEncoding: S.optional(XavcEntropyEncoding),
    FramerateControl: S.optional(XavcFramerateControl),
    FramerateConversionAlgorithm: S.optional(XavcFramerateConversionAlgorithm),
    FramerateDenominator: S.optional(S.Number),
    FramerateNumerator: S.optional(S.Number),
    PerFrameMetrics: S.optional(__listOfFrameMetricType),
    Profile: S.optional(XavcProfile),
    SlowPal: S.optional(XavcSlowPal),
    Softness: S.optional(S.Number),
    SpatialAdaptiveQuantization: S.optional(XavcSpatialAdaptiveQuantization),
    TemporalAdaptiveQuantization: S.optional(XavcTemporalAdaptiveQuantization),
    Xavc4kIntraCbgProfileSettings: S.optional(Xavc4kIntraCbgProfileSettings),
    Xavc4kIntraVbrProfileSettings: S.optional(Xavc4kIntraVbrProfileSettings),
    Xavc4kProfileSettings: S.optional(Xavc4kProfileSettings),
    XavcHdIntraCbgProfileSettings: S.optional(XavcHdIntraCbgProfileSettings),
    XavcHdProfileSettings: S.optional(XavcHdProfileSettings),
  }).pipe(
    S.encodeKeys({
      AdaptiveQuantization: "adaptiveQuantization",
      EntropyEncoding: "entropyEncoding",
      FramerateControl: "framerateControl",
      FramerateConversionAlgorithm: "framerateConversionAlgorithm",
      FramerateDenominator: "framerateDenominator",
      FramerateNumerator: "framerateNumerator",
      PerFrameMetrics: "perFrameMetrics",
      Profile: "profile",
      SlowPal: "slowPal",
      Softness: "softness",
      SpatialAdaptiveQuantization: "spatialAdaptiveQuantization",
      TemporalAdaptiveQuantization: "temporalAdaptiveQuantization",
      Xavc4kIntraCbgProfileSettings: "xavc4kIntraCbgProfileSettings",
      Xavc4kIntraVbrProfileSettings: "xavc4kIntraVbrProfileSettings",
      Xavc4kProfileSettings: "xavc4kProfileSettings",
      XavcHdIntraCbgProfileSettings: "xavcHdIntraCbgProfileSettings",
      XavcHdProfileSettings: "xavcHdProfileSettings",
    }),
  ),
).annotate({ identifier: "XavcSettings" }) as any as S.Schema<XavcSettings>;
export interface VideoCodecSettings {
  Av1Settings?: Av1Settings;
  AvcIntraSettings?: AvcIntraSettings;
  Codec?: VideoCodec;
  FrameCaptureSettings?: FrameCaptureSettings;
  GifSettings?: GifSettings;
  H264Settings?: H264Settings;
  H265Settings?: H265Settings;
  Mpeg2Settings?: Mpeg2Settings;
  PassthroughSettings?: PassthroughSettings;
  ProresSettings?: ProresSettings;
  UncompressedSettings?: UncompressedSettings;
  Vc3Settings?: Vc3Settings;
  Vp8Settings?: Vp8Settings;
  Vp9Settings?: Vp9Settings;
  XavcSettings?: XavcSettings;
}
export const VideoCodecSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Av1Settings: S.optional(Av1Settings),
    AvcIntraSettings: S.optional(AvcIntraSettings),
    Codec: S.optional(VideoCodec),
    FrameCaptureSettings: S.optional(FrameCaptureSettings),
    GifSettings: S.optional(GifSettings),
    H264Settings: S.optional(H264Settings),
    H265Settings: S.optional(H265Settings),
    Mpeg2Settings: S.optional(Mpeg2Settings),
    PassthroughSettings: S.optional(PassthroughSettings),
    ProresSettings: S.optional(ProresSettings),
    UncompressedSettings: S.optional(UncompressedSettings),
    Vc3Settings: S.optional(Vc3Settings),
    Vp8Settings: S.optional(Vp8Settings),
    Vp9Settings: S.optional(Vp9Settings),
    XavcSettings: S.optional(XavcSettings),
  }).pipe(
    S.encodeKeys({
      Av1Settings: "av1Settings",
      AvcIntraSettings: "avcIntraSettings",
      Codec: "codec",
      FrameCaptureSettings: "frameCaptureSettings",
      GifSettings: "gifSettings",
      H264Settings: "h264Settings",
      H265Settings: "h265Settings",
      Mpeg2Settings: "mpeg2Settings",
      PassthroughSettings: "passthroughSettings",
      ProresSettings: "proresSettings",
      UncompressedSettings: "uncompressedSettings",
      Vc3Settings: "vc3Settings",
      Vp8Settings: "vp8Settings",
      Vp9Settings: "vp9Settings",
      XavcSettings: "xavcSettings",
    }),
  ),
).annotate({
  identifier: "VideoCodecSettings",
}) as any as S.Schema<VideoCodecSettings>;
export type ColorMetadata = "IGNORE" | "INSERT" | (string & {});
export const ColorMetadata = S.String;

export type DropFrameTimecode = "DISABLED" | "ENABLED" | (string & {});
export const DropFrameTimecode = S.String;

export type RespondToAfd = "NONE" | "RESPOND" | "PASSTHROUGH" | (string & {});
export const RespondToAfd = S.String;

export type ScalingBehavior =
  | "DEFAULT"
  | "STRETCH_TO_OUTPUT"
  | "FIT"
  | "FIT_NO_UPSCALE"
  | "FILL"
  | "SMART_CROP"
  | (string & {});
export const ScalingBehavior = S.String;

export type VideoTimecodeInsertion =
  | "DISABLED"
  | "PIC_TIMING_SEI"
  | (string & {});
export const VideoTimecodeInsertion = S.String;

export type TimecodeTrack = "DISABLED" | "ENABLED" | (string & {});
export const TimecodeTrack = S.String;

export type __integerMin90Max105 = number;
export type __integerMin920Max1023 = number;
export type __integerMinNegative5Max10 = number;
export interface ClipLimits {
  MaximumRGBTolerance?: number;
  MaximumYUV?: number;
  MinimumRGBTolerance?: number;
  MinimumYUV?: number;
}
export const ClipLimits = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaximumRGBTolerance: S.optional(S.Number),
    MaximumYUV: S.optional(S.Number),
    MinimumRGBTolerance: S.optional(S.Number),
    MinimumYUV: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      MaximumRGBTolerance: "maximumRGBTolerance",
      MaximumYUV: "maximumYUV",
      MinimumRGBTolerance: "minimumRGBTolerance",
      MinimumYUV: "minimumYUV",
    }),
  ),
).annotate({ identifier: "ClipLimits" }) as any as S.Schema<ClipLimits>;
export type ColorSpaceConversion =
  | "NONE"
  | "FORCE_601"
  | "FORCE_709"
  | "FORCE_HDR10"
  | "FORCE_HLG_2020"
  | "FORCE_P3DCI"
  | "FORCE_P3D65_SDR"
  | "FORCE_P3D65_HDR"
  | (string & {});
export const ColorSpaceConversion = S.String;

export type HDRToSDRToneMapper = "PRESERVE_DETAILS" | "VIBRANT" | (string & {});
export const HDRToSDRToneMapper = S.String;

export type __integerMinNegative180Max180 = number;
export type SampleRangeConversion =
  | "LIMITED_RANGE_SQUEEZE"
  | "NONE"
  | "LIMITED_RANGE_CLIP"
  | (string & {});
export const SampleRangeConversion = S.String;

export interface ColorCorrector {
  Brightness?: number;
  ClipLimits?: ClipLimits;
  ColorSpaceConversion?: ColorSpaceConversion;
  Contrast?: number;
  Hdr10Metadata?: Hdr10Metadata;
  HdrToSdrToneMapper?: HDRToSDRToneMapper;
  Hue?: number;
  MaxLuminance?: number;
  SampleRangeConversion?: SampleRangeConversion;
  Saturation?: number;
  SdrReferenceWhiteLevel?: number;
}
export const ColorCorrector = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Brightness: S.optional(S.Number),
    ClipLimits: S.optional(ClipLimits),
    ColorSpaceConversion: S.optional(ColorSpaceConversion),
    Contrast: S.optional(S.Number),
    Hdr10Metadata: S.optional(Hdr10Metadata),
    HdrToSdrToneMapper: S.optional(HDRToSDRToneMapper),
    Hue: S.optional(S.Number),
    MaxLuminance: S.optional(S.Number),
    SampleRangeConversion: S.optional(SampleRangeConversion),
    Saturation: S.optional(S.Number),
    SdrReferenceWhiteLevel: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Brightness: "brightness",
      ClipLimits: "clipLimits",
      ColorSpaceConversion: "colorSpaceConversion",
      Contrast: "contrast",
      Hdr10Metadata: "hdr10Metadata",
      HdrToSdrToneMapper: "hdrToSdrToneMapper",
      Hue: "hue",
      MaxLuminance: "maxLuminance",
      SampleRangeConversion: "sampleRangeConversion",
      Saturation: "saturation",
      SdrReferenceWhiteLevel: "sdrReferenceWhiteLevel",
    }),
  ),
).annotate({ identifier: "ColorCorrector" }) as any as S.Schema<ColorCorrector>;
export type DeinterlaceAlgorithm =
  | "INTERPOLATE"
  | "INTERPOLATE_TICKER"
  | "BLEND"
  | "BLEND_TICKER"
  | "LINEAR_INTERPOLATION"
  | (string & {});
export const DeinterlaceAlgorithm = S.String;

export type DeinterlacerControl = "FORCE_ALL_FRAMES" | "NORMAL" | (string & {});
export const DeinterlacerControl = S.String;

export type DeinterlacerMode =
  | "DEINTERLACE"
  | "INVERSE_TELECINE"
  | "ADAPTIVE"
  | (string & {});
export const DeinterlacerMode = S.String;

export interface Deinterlacer {
  Algorithm?: DeinterlaceAlgorithm;
  Control?: DeinterlacerControl;
  Mode?: DeinterlacerMode;
}
export const Deinterlacer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Algorithm: S.optional(DeinterlaceAlgorithm),
    Control: S.optional(DeinterlacerControl),
    Mode: S.optional(DeinterlacerMode),
  }).pipe(
    S.encodeKeys({ Algorithm: "algorithm", Control: "control", Mode: "mode" }),
  ),
).annotate({ identifier: "Deinterlacer" }) as any as S.Schema<Deinterlacer>;
export type DolbyVisionCompatibility =
  | "DUPLICATE_STREAM"
  | "SUPPLEMENTAL_CODECS"
  | (string & {});
export const DolbyVisionCompatibility = S.String;

export interface DolbyVisionLevel6Metadata {
  MaxCll?: number;
  MaxFall?: number;
}
export const DolbyVisionLevel6Metadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxCll: S.optional(S.Number),
    MaxFall: S.optional(S.Number),
  }).pipe(S.encodeKeys({ MaxCll: "maxCll", MaxFall: "maxFall" })),
).annotate({
  identifier: "DolbyVisionLevel6Metadata",
}) as any as S.Schema<DolbyVisionLevel6Metadata>;
export type DolbyVisionLevel6Mode =
  | "PASSTHROUGH"
  | "RECALCULATE"
  | "SPECIFY"
  | (string & {});
export const DolbyVisionLevel6Mode = S.String;

export type DolbyVisionMapping = "HDR10_NOMAP" | "HDR10_1000" | (string & {});
export const DolbyVisionMapping = S.String;

export type DolbyVisionProfile = "PROFILE_5" | "PROFILE_8_1" | (string & {});
export const DolbyVisionProfile = S.String;

export interface DolbyVision {
  Compatibility?: DolbyVisionCompatibility;
  L6Metadata?: DolbyVisionLevel6Metadata;
  L6Mode?: DolbyVisionLevel6Mode;
  Mapping?: DolbyVisionMapping;
  Profile?: DolbyVisionProfile;
}
export const DolbyVision = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Compatibility: S.optional(DolbyVisionCompatibility),
    L6Metadata: S.optional(DolbyVisionLevel6Metadata),
    L6Mode: S.optional(DolbyVisionLevel6Mode),
    Mapping: S.optional(DolbyVisionMapping),
    Profile: S.optional(DolbyVisionProfile),
  }).pipe(
    S.encodeKeys({
      Compatibility: "compatibility",
      L6Metadata: "l6Metadata",
      L6Mode: "l6Mode",
      Mapping: "mapping",
      Profile: "profile",
    }),
  ),
).annotate({ identifier: "DolbyVision" }) as any as S.Schema<DolbyVision>;
export interface DurationControl {
  IntegerDurationMaximumCompressionDenominator?: number;
  IntegerDurationMaximumCompressionNumerator?: number;
  IntegerDurationTrimThresholdMilliseconds?: number;
}
export const DurationControl = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    IntegerDurationMaximumCompressionDenominator: S.optional(S.Number),
    IntegerDurationMaximumCompressionNumerator: S.optional(S.Number),
    IntegerDurationTrimThresholdMilliseconds: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      IntegerDurationMaximumCompressionDenominator:
        "integerDurationMaximumCompressionDenominator",
      IntegerDurationMaximumCompressionNumerator:
        "integerDurationMaximumCompressionNumerator",
      IntegerDurationTrimThresholdMilliseconds:
        "integerDurationTrimThresholdMilliseconds",
    }),
  ),
).annotate({
  identifier: "DurationControl",
}) as any as S.Schema<DurationControl>;
export type __integerMin0Max4000 = number;
export interface Hdr10Plus {
  MasteringMonitorNits?: number;
  TargetMonitorNits?: number;
}
export const Hdr10Plus = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MasteringMonitorNits: S.optional(S.Number),
    TargetMonitorNits: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      MasteringMonitorNits: "masteringMonitorNits",
      TargetMonitorNits: "targetMonitorNits",
    }),
  ),
).annotate({ identifier: "Hdr10Plus" }) as any as S.Schema<Hdr10Plus>;
export type NoiseReducerFilter =
  | "BILATERAL"
  | "MEAN"
  | "GAUSSIAN"
  | "LANCZOS"
  | "SHARPEN"
  | "CONSERVE"
  | "SPATIAL"
  | "TEMPORAL"
  | (string & {});
export const NoiseReducerFilter = S.String;

export type __integerMin0Max3 = number;
export interface NoiseReducerFilterSettings {
  Strength?: number;
}
export const NoiseReducerFilterSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Strength: S.optional(S.Number) }).pipe(
    S.encodeKeys({ Strength: "strength" }),
  ),
).annotate({
  identifier: "NoiseReducerFilterSettings",
}) as any as S.Schema<NoiseReducerFilterSettings>;
export type __integerMinNegative2Max3 = number;
export type __integerMin0Max16 = number;
export interface NoiseReducerSpatialFilterSettings {
  PostFilterSharpenStrength?: number;
  Speed?: number;
  Strength?: number;
}
export const NoiseReducerSpatialFilterSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    PostFilterSharpenStrength: S.optional(S.Number),
    Speed: S.optional(S.Number),
    Strength: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      PostFilterSharpenStrength: "postFilterSharpenStrength",
      Speed: "speed",
      Strength: "strength",
    }),
  ),
).annotate({
  identifier: "NoiseReducerSpatialFilterSettings",
}) as any as S.Schema<NoiseReducerSpatialFilterSettings>;
export type __integerMin0Max4 = number;
export type NoiseFilterPostTemporalSharpening =
  | "DISABLED"
  | "ENABLED"
  | "AUTO"
  | (string & {});
export const NoiseFilterPostTemporalSharpening = S.String;

export type NoiseFilterPostTemporalSharpeningStrength =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export const NoiseFilterPostTemporalSharpeningStrength = S.String;

export type __integerMinNegative1Max3 = number;
export interface NoiseReducerTemporalFilterSettings {
  AggressiveMode?: number;
  PostTemporalSharpening?: NoiseFilterPostTemporalSharpening;
  PostTemporalSharpeningStrength?: NoiseFilterPostTemporalSharpeningStrength;
  Speed?: number;
  Strength?: number;
}
export const NoiseReducerTemporalFilterSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AggressiveMode: S.optional(S.Number),
    PostTemporalSharpening: S.optional(NoiseFilterPostTemporalSharpening),
    PostTemporalSharpeningStrength: S.optional(
      NoiseFilterPostTemporalSharpeningStrength,
    ),
    Speed: S.optional(S.Number),
    Strength: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AggressiveMode: "aggressiveMode",
      PostTemporalSharpening: "postTemporalSharpening",
      PostTemporalSharpeningStrength: "postTemporalSharpeningStrength",
      Speed: "speed",
      Strength: "strength",
    }),
  ),
).annotate({
  identifier: "NoiseReducerTemporalFilterSettings",
}) as any as S.Schema<NoiseReducerTemporalFilterSettings>;
export interface NoiseReducer {
  Filter?: NoiseReducerFilter;
  FilterSettings?: NoiseReducerFilterSettings;
  SpatialFilterSettings?: NoiseReducerSpatialFilterSettings;
  TemporalFilterSettings?: NoiseReducerTemporalFilterSettings;
}
export const NoiseReducer = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Filter: S.optional(NoiseReducerFilter),
    FilterSettings: S.optional(NoiseReducerFilterSettings),
    SpatialFilterSettings: S.optional(NoiseReducerSpatialFilterSettings),
    TemporalFilterSettings: S.optional(NoiseReducerTemporalFilterSettings),
  }).pipe(
    S.encodeKeys({
      Filter: "filter",
      FilterSettings: "filterSettings",
      SpatialFilterSettings: "spatialFilterSettings",
      TemporalFilterSettings: "temporalFilterSettings",
    }),
  ),
).annotate({ identifier: "NoiseReducer" }) as any as S.Schema<NoiseReducer>;
export type __stringMin1Max100000 = string;
export type __integerMin0Max4194303 = number;
export type WatermarkingStrength =
  | "LIGHTEST"
  | "LIGHTER"
  | "DEFAULT"
  | "STRONGER"
  | "STRONGEST"
  | (string & {});
export const WatermarkingStrength = S.String;

export interface NexGuardFileMarkerSettings {
  License?: string;
  Payload?: number;
  Preset?: string;
  Strength?: WatermarkingStrength;
}
export const NexGuardFileMarkerSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    License: S.optional(S.String),
    Payload: S.optional(S.Number),
    Preset: S.optional(S.String),
    Strength: S.optional(WatermarkingStrength),
  }).pipe(
    S.encodeKeys({
      License: "license",
      Payload: "payload",
      Preset: "preset",
      Strength: "strength",
    }),
  ),
).annotate({
  identifier: "NexGuardFileMarkerSettings",
}) as any as S.Schema<NexGuardFileMarkerSettings>;
export interface PartnerWatermarking {
  NexguardFileMarkerSettings?: NexGuardFileMarkerSettings;
}
export const PartnerWatermarking = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NexguardFileMarkerSettings: S.optional(NexGuardFileMarkerSettings),
  }).pipe(
    S.encodeKeys({ NexguardFileMarkerSettings: "nexguardFileMarkerSettings" }),
  ),
).annotate({
  identifier: "PartnerWatermarking",
}) as any as S.Schema<PartnerWatermarking>;
export type __integerMin10Max48 = number;
export type TimecodeBurninPosition =
  | "TOP_CENTER"
  | "TOP_LEFT"
  | "TOP_RIGHT"
  | "MIDDLE_LEFT"
  | "MIDDLE_CENTER"
  | "MIDDLE_RIGHT"
  | "BOTTOM_LEFT"
  | "BOTTOM_CENTER"
  | "BOTTOM_RIGHT"
  | (string & {});
export const TimecodeBurninPosition = S.String;

export type __stringPattern = string;
export interface TimecodeBurnin {
  FontSize?: number;
  Position?: TimecodeBurninPosition;
  Prefix?: string;
}
export const TimecodeBurnin = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FontSize: S.optional(S.Number),
    Position: S.optional(TimecodeBurninPosition),
    Prefix: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      FontSize: "fontSize",
      Position: "position",
      Prefix: "prefix",
    }),
  ),
).annotate({ identifier: "TimecodeBurnin" }) as any as S.Schema<TimecodeBurnin>;
export interface VideoPreprocessor {
  ColorCorrector?: ColorCorrector;
  Deinterlacer?: Deinterlacer;
  DolbyVision?: DolbyVision;
  DurationControl?: DurationControl;
  Hdr10Plus?: Hdr10Plus;
  ImageInserter?: ImageInserter;
  NoiseReducer?: NoiseReducer;
  PartnerWatermarking?: PartnerWatermarking;
  TimecodeBurnin?: TimecodeBurnin;
}
export const VideoPreprocessor = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ColorCorrector: S.optional(ColorCorrector),
    Deinterlacer: S.optional(Deinterlacer),
    DolbyVision: S.optional(DolbyVision),
    DurationControl: S.optional(DurationControl),
    Hdr10Plus: S.optional(Hdr10Plus),
    ImageInserter: S.optional(ImageInserter),
    NoiseReducer: S.optional(NoiseReducer),
    PartnerWatermarking: S.optional(PartnerWatermarking),
    TimecodeBurnin: S.optional(TimecodeBurnin),
  }).pipe(
    S.encodeKeys({
      ColorCorrector: "colorCorrector",
      Deinterlacer: "deinterlacer",
      DolbyVision: "dolbyVision",
      DurationControl: "durationControl",
      Hdr10Plus: "hdr10Plus",
      ImageInserter: "imageInserter",
      NoiseReducer: "noiseReducer",
      PartnerWatermarking: "partnerWatermarking",
      TimecodeBurnin: "timecodeBurnin",
    }),
  ),
).annotate({
  identifier: "VideoPreprocessor",
}) as any as S.Schema<VideoPreprocessor>;
export interface VideoDescription {
  AfdSignaling?: AfdSignaling;
  AntiAlias?: AntiAlias;
  ChromaPositionMode?: ChromaPositionMode;
  CodecSettings?: VideoCodecSettings;
  ColorMetadata?: ColorMetadata;
  Crop?: Rectangle;
  DropFrameTimecode?: DropFrameTimecode;
  FixedAfd?: number;
  Height?: number;
  Position?: Rectangle;
  RespondToAfd?: RespondToAfd;
  ScalingBehavior?: ScalingBehavior;
  Sharpness?: number;
  TimecodeInsertion?: VideoTimecodeInsertion;
  TimecodeTrack?: TimecodeTrack;
  VideoPreprocessors?: VideoPreprocessor;
  Width?: number;
}
export const VideoDescription = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AfdSignaling: S.optional(AfdSignaling),
    AntiAlias: S.optional(AntiAlias),
    ChromaPositionMode: S.optional(ChromaPositionMode),
    CodecSettings: S.optional(VideoCodecSettings),
    ColorMetadata: S.optional(ColorMetadata),
    Crop: S.optional(Rectangle),
    DropFrameTimecode: S.optional(DropFrameTimecode),
    FixedAfd: S.optional(S.Number),
    Height: S.optional(S.Number),
    Position: S.optional(Rectangle),
    RespondToAfd: S.optional(RespondToAfd),
    ScalingBehavior: S.optional(ScalingBehavior),
    Sharpness: S.optional(S.Number),
    TimecodeInsertion: S.optional(VideoTimecodeInsertion),
    TimecodeTrack: S.optional(TimecodeTrack),
    VideoPreprocessors: S.optional(VideoPreprocessor),
    Width: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      AfdSignaling: "afdSignaling",
      AntiAlias: "antiAlias",
      ChromaPositionMode: "chromaPositionMode",
      CodecSettings: "codecSettings",
      ColorMetadata: "colorMetadata",
      Crop: "crop",
      DropFrameTimecode: "dropFrameTimecode",
      FixedAfd: "fixedAfd",
      Height: "height",
      Position: "position",
      RespondToAfd: "respondToAfd",
      ScalingBehavior: "scalingBehavior",
      Sharpness: "sharpness",
      TimecodeInsertion: "timecodeInsertion",
      TimecodeTrack: "timecodeTrack",
      VideoPreprocessors: "videoPreprocessors",
      Width: "width",
    }),
  ),
).annotate({
  identifier: "VideoDescription",
}) as any as S.Schema<VideoDescription>;
export interface Output {
  AudioDescriptions?: AudioDescription[];
  CaptionDescriptions?: CaptionDescription[];
  ContainerSettings?: ContainerSettings;
  Extension?: string;
  NameModifier?: string;
  OutputSettings?: OutputSettings;
  Preset?: string;
  VideoDescription?: VideoDescription;
}
export const Output = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDescriptions: S.optional(__listOfAudioDescription),
    CaptionDescriptions: S.optional(__listOfCaptionDescription),
    ContainerSettings: S.optional(ContainerSettings),
    Extension: S.optional(S.String),
    NameModifier: S.optional(S.String),
    OutputSettings: S.optional(OutputSettings),
    Preset: S.optional(S.String),
    VideoDescription: S.optional(VideoDescription),
  }).pipe(
    S.encodeKeys({
      AudioDescriptions: "audioDescriptions",
      CaptionDescriptions: "captionDescriptions",
      ContainerSettings: "containerSettings",
      Extension: "extension",
      NameModifier: "nameModifier",
      OutputSettings: "outputSettings",
      Preset: "preset",
      VideoDescription: "videoDescription",
    }),
  ),
).annotate({ identifier: "Output" }) as any as S.Schema<Output>;
export type __listOfOutput = Output[];
export const __listOfOutput = /*@__PURE__*/ S.Array(Output);
export interface OutputGroup {
  AutomatedEncodingSettings?: AutomatedEncodingSettings;
  CustomName?: string;
  Name?: string;
  OutputGroupSettings?: OutputGroupSettings;
  Outputs?: Output[];
}
export const OutputGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AutomatedEncodingSettings: S.optional(AutomatedEncodingSettings),
    CustomName: S.optional(S.String),
    Name: S.optional(S.String),
    OutputGroupSettings: S.optional(OutputGroupSettings),
    Outputs: S.optional(__listOfOutput),
  }).pipe(
    S.encodeKeys({
      AutomatedEncodingSettings: "automatedEncodingSettings",
      CustomName: "customName",
      Name: "name",
      OutputGroupSettings: "outputGroupSettings",
      Outputs: "outputs",
    }),
  ),
).annotate({ identifier: "OutputGroup" }) as any as S.Schema<OutputGroup>;
export type __listOfOutputGroup = OutputGroup[];
export const __listOfOutputGroup = /*@__PURE__*/ S.Array(OutputGroup);
export type TimecodeSource =
  | "EMBEDDED"
  | "ZEROBASED"
  | "SPECIFIEDSTART"
  | (string & {});
export const TimecodeSource = S.String;

export type __stringPattern0940191020191209301 = string;
export interface TimecodeConfig {
  Anchor?: string;
  Source?: TimecodeSource;
  Start?: string;
  TimestampOffset?: string;
}
export const TimecodeConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Anchor: S.optional(S.String),
    Source: S.optional(TimecodeSource),
    Start: S.optional(S.String),
    TimestampOffset: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Anchor: "anchor",
      Source: "source",
      Start: "start",
      TimestampOffset: "timestampOffset",
    }),
  ),
).annotate({ identifier: "TimecodeConfig" }) as any as S.Schema<TimecodeConfig>;
export interface Id3Insertion {
  Id3?: string;
  Timecode?: string;
}
export const Id3Insertion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id3: S.optional(S.String), Timecode: S.optional(S.String) }).pipe(
    S.encodeKeys({ Id3: "id3", Timecode: "timecode" }),
  ),
).annotate({ identifier: "Id3Insertion" }) as any as S.Schema<Id3Insertion>;
export type __listOfId3Insertion = Id3Insertion[];
export const __listOfId3Insertion = /*@__PURE__*/ S.Array(Id3Insertion);
export interface TimedMetadataInsertion {
  Id3Insertions?: Id3Insertion[];
}
export const TimedMetadataInsertion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id3Insertions: S.optional(__listOfId3Insertion) }).pipe(
    S.encodeKeys({ Id3Insertions: "id3Insertions" }),
  ),
).annotate({
  identifier: "TimedMetadataInsertion",
}) as any as S.Schema<TimedMetadataInsertion>;
export interface JobSettings {
  AdAvailOffset?: number;
  AvailBlanking?: AvailBlanking;
  ColorConversion3DLUTSettings?: ColorConversion3DLUTSetting[];
  Esam?: EsamSettings;
  ExtendedDataServices?: ExtendedDataServices;
  FollowSource?: number;
  Inputs?: Input[];
  KantarWatermark?: KantarWatermarkSettings;
  MotionImageInserter?: MotionImageInserter;
  NielsenConfiguration?: NielsenConfiguration;
  NielsenNonLinearWatermark?: NielsenNonLinearWatermarkSettings;
  OutputGroups?: OutputGroup[];
  TimecodeConfig?: TimecodeConfig;
  TimedMetadataInsertion?: TimedMetadataInsertion;
}
export const JobSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdAvailOffset: S.optional(S.Number),
    AvailBlanking: S.optional(AvailBlanking),
    ColorConversion3DLUTSettings: S.optional(
      __listOfColorConversion3DLUTSetting,
    ),
    Esam: S.optional(EsamSettings),
    ExtendedDataServices: S.optional(ExtendedDataServices),
    FollowSource: S.optional(S.Number),
    Inputs: S.optional(__listOfInput),
    KantarWatermark: S.optional(KantarWatermarkSettings),
    MotionImageInserter: S.optional(MotionImageInserter),
    NielsenConfiguration: S.optional(NielsenConfiguration),
    NielsenNonLinearWatermark: S.optional(NielsenNonLinearWatermarkSettings),
    OutputGroups: S.optional(__listOfOutputGroup),
    TimecodeConfig: S.optional(TimecodeConfig),
    TimedMetadataInsertion: S.optional(TimedMetadataInsertion),
  }).pipe(
    S.encodeKeys({
      AdAvailOffset: "adAvailOffset",
      AvailBlanking: "availBlanking",
      ColorConversion3DLUTSettings: "colorConversion3DLUTSettings",
      Esam: "esam",
      ExtendedDataServices: "extendedDataServices",
      FollowSource: "followSource",
      Inputs: "inputs",
      KantarWatermark: "kantarWatermark",
      MotionImageInserter: "motionImageInserter",
      NielsenConfiguration: "nielsenConfiguration",
      NielsenNonLinearWatermark: "nielsenNonLinearWatermark",
      OutputGroups: "outputGroups",
      TimecodeConfig: "timecodeConfig",
      TimedMetadataInsertion: "timedMetadataInsertion",
    }),
  ),
).annotate({ identifier: "JobSettings" }) as any as S.Schema<JobSettings>;
export type SimulateReservedQueue = "DISABLED" | "ENABLED" | (string & {});
export const SimulateReservedQueue = S.String;

export type StatusUpdateInterval =
  | "SECONDS_10"
  | "SECONDS_12"
  | "SECONDS_15"
  | "SECONDS_20"
  | "SECONDS_30"
  | "SECONDS_60"
  | "SECONDS_120"
  | "SECONDS_180"
  | "SECONDS_240"
  | "SECONDS_300"
  | "SECONDS_360"
  | "SECONDS_420"
  | "SECONDS_480"
  | "SECONDS_540"
  | "SECONDS_600"
  | (string & {});
export const StatusUpdateInterval = S.String;

export type __mapOf__string = { [key: string]: string | undefined };
export const __mapOf__string = /*@__PURE__*/ S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface CreateJobRequest {
  AccelerationSettings?: AccelerationSettings;
  BillingTagsSource?: BillingTagsSource;
  ClientRequestToken?: string;
  HopDestinations?: HopDestination[];
  JobEngineVersion?: string;
  JobTemplate?: string;
  Priority?: number;
  Queue?: string;
  Role?: string;
  Settings?: JobSettings;
  SimulateReservedQueue?: SimulateReservedQueue;
  StatusUpdateInterval?: StatusUpdateInterval;
  Tags?: { [key: string]: string | undefined };
  UserMetadata?: { [key: string]: string | undefined };
}
export const CreateJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccelerationSettings: S.optional(AccelerationSettings),
    BillingTagsSource: S.optional(BillingTagsSource),
    ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    HopDestinations: S.optional(__listOfHopDestination),
    JobEngineVersion: S.optional(S.String),
    JobTemplate: S.optional(S.String),
    Priority: S.optional(S.Number),
    Queue: S.optional(S.String),
    Role: S.optional(S.String),
    Settings: S.optional(JobSettings),
    SimulateReservedQueue: S.optional(SimulateReservedQueue),
    StatusUpdateInterval: S.optional(StatusUpdateInterval),
    Tags: S.optional(__mapOf__string),
    UserMetadata: S.optional(__mapOf__string),
  })
    .pipe(
      S.encodeKeys({
        AccelerationSettings: "accelerationSettings",
        BillingTagsSource: "billingTagsSource",
        ClientRequestToken: "clientRequestToken",
        HopDestinations: "hopDestinations",
        JobEngineVersion: "jobEngineVersion",
        JobTemplate: "jobTemplate",
        Priority: "priority",
        Queue: "queue",
        Role: "role",
        Settings: "settings",
        SimulateReservedQueue: "simulateReservedQueue",
        StatusUpdateInterval: "statusUpdateInterval",
        Tags: "tags",
        UserMetadata: "userMetadata",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/2017-08-29/jobs" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateJobRequest",
}) as any as S.Schema<CreateJobRequest>;
export type AccelerationStatus =
  | "NOT_APPLICABLE"
  | "IN_PROGRESS"
  | "ACCELERATED"
  | "NOT_ACCELERATED"
  | (string & {});
export const AccelerationStatus = S.String;

export type __timestampUnix = Date;
export type JobPhase = "PROBING" | "TRANSCODING" | "UPLOADING" | (string & {});
export const JobPhase = S.String;

export type ElementalInferenceFeature = "SMART_CROP" | (string & {});
export const ElementalInferenceFeature = S.String;

export type __listOfElementalInferenceFeature = ElementalInferenceFeature[];
export const __listOfElementalInferenceFeature = /*@__PURE__*/ S.Array(
  ElementalInferenceFeature,
);
export type ElementalInferenceFeedManagementState =
  | "CREATED"
  | "ASSOCIATED"
  | "PENDING_DELETION"
  | "DELETED"
  | (string & {});
export const ElementalInferenceFeedManagementState = S.String;

export interface ElementalInferenceFeed {
  Arn?: string;
  FeedManagementState?: ElementalInferenceFeedManagementState;
}
export const ElementalInferenceFeed = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    FeedManagementState: S.optional(ElementalInferenceFeedManagementState),
  }).pipe(
    S.encodeKeys({ Arn: "arn", FeedManagementState: "feedManagementState" }),
  ),
).annotate({
  identifier: "ElementalInferenceFeed",
}) as any as S.Schema<ElementalInferenceFeed>;
export type __listOfElementalInferenceFeed = ElementalInferenceFeed[];
export const __listOfElementalInferenceFeed = /*@__PURE__*/ S.Array(
  ElementalInferenceFeed,
);
export interface ElementalInferenceConfiguration {
  Features?: ElementalInferenceFeature[];
  Feeds?: ElementalInferenceFeed[];
}
export const ElementalInferenceConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Features: S.optional(__listOfElementalInferenceFeature),
    Feeds: S.optional(__listOfElementalInferenceFeed),
  }).pipe(S.encodeKeys({ Features: "features", Feeds: "feeds" })),
).annotate({
  identifier: "ElementalInferenceConfiguration",
}) as any as S.Schema<ElementalInferenceConfiguration>;
export type __listOf__string = string[];
export const __listOf__string = /*@__PURE__*/ S.Array(S.String);
export interface JobMessages {
  Info?: string[];
  Warning?: string[];
}
export const JobMessages = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Info: S.optional(__listOf__string),
    Warning: S.optional(__listOf__string),
  }).pipe(S.encodeKeys({ Info: "info", Warning: "warning" })),
).annotate({ identifier: "JobMessages" }) as any as S.Schema<JobMessages>;
export interface VideoDetail {
  HeightInPx?: number;
  WidthInPx?: number;
}
export const VideoDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HeightInPx: S.optional(S.Number),
    WidthInPx: S.optional(S.Number),
  }).pipe(S.encodeKeys({ HeightInPx: "heightInPx", WidthInPx: "widthInPx" })),
).annotate({ identifier: "VideoDetail" }) as any as S.Schema<VideoDetail>;
export interface OutputDetail {
  DurationInMs?: number;
  VideoDetails?: VideoDetail;
}
export const OutputDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DurationInMs: S.optional(S.Number),
    VideoDetails: S.optional(VideoDetail),
  }).pipe(
    S.encodeKeys({
      DurationInMs: "durationInMs",
      VideoDetails: "videoDetails",
    }),
  ),
).annotate({ identifier: "OutputDetail" }) as any as S.Schema<OutputDetail>;
export type __listOfOutputDetail = OutputDetail[];
export const __listOfOutputDetail = /*@__PURE__*/ S.Array(OutputDetail);
export interface OutputGroupDetail {
  OutputDetails?: OutputDetail[];
}
export const OutputGroupDetail = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ OutputDetails: S.optional(__listOfOutputDetail) }).pipe(
    S.encodeKeys({ OutputDetails: "outputDetails" }),
  ),
).annotate({
  identifier: "OutputGroupDetail",
}) as any as S.Schema<OutputGroupDetail>;
export type __listOfOutputGroupDetail = OutputGroupDetail[];
export const __listOfOutputGroupDetail =
  /*@__PURE__*/ S.Array(OutputGroupDetail);
export interface QueueTransition {
  DestinationQueue?: string;
  SourceQueue?: string;
  Timestamp?: Date;
}
export const QueueTransition = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    DestinationQueue: S.optional(S.String),
    SourceQueue: S.optional(S.String),
    Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    S.encodeKeys({
      DestinationQueue: "destinationQueue",
      SourceQueue: "sourceQueue",
      Timestamp: "timestamp",
    }),
  ),
).annotate({
  identifier: "QueueTransition",
}) as any as S.Schema<QueueTransition>;
export type __listOfQueueTransition = QueueTransition[];
export const __listOfQueueTransition = /*@__PURE__*/ S.Array(QueueTransition);
export type ShareStatus = "NOT_SHARED" | "INITIATED" | "SHARED" | (string & {});
export const ShareStatus = S.String;

export type JobStatus =
  | "SUBMITTED"
  | "PROGRESSING"
  | "COMPLETE"
  | "CANCELED"
  | "ERROR"
  | (string & {});
export const JobStatus = S.String;

export interface Timing {
  FinishTime?: Date;
  StartTime?: Date;
  SubmitTime?: Date;
}
export const Timing = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FinishTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    SubmitTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }).pipe(
    S.encodeKeys({
      FinishTime: "finishTime",
      StartTime: "startTime",
      SubmitTime: "submitTime",
    }),
  ),
).annotate({ identifier: "Timing" }) as any as S.Schema<Timing>;
export interface WarningGroup {
  Code?: number;
  Count?: number;
}
export const WarningGroup = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Code: S.optional(S.Number), Count: S.optional(S.Number) }).pipe(
    S.encodeKeys({ Code: "code", Count: "count" }),
  ),
).annotate({ identifier: "WarningGroup" }) as any as S.Schema<WarningGroup>;
export type __listOfWarningGroup = WarningGroup[];
export const __listOfWarningGroup = /*@__PURE__*/ S.Array(WarningGroup);
export interface Job {
  AccelerationSettings?: AccelerationSettings;
  AccelerationStatus?: AccelerationStatus;
  Arn?: string;
  BillingTagsSource?: BillingTagsSource;
  ClientRequestToken?: string;
  CreatedAt?: Date;
  CurrentPhase?: JobPhase;
  ElementalInferenceConfiguration?: ElementalInferenceConfiguration;
  ErrorCode?: number;
  ErrorMessage?: string;
  HopDestinations?: HopDestination[];
  Id?: string;
  JobEngineVersionRequested?: string;
  JobEngineVersionUsed?: string;
  JobPercentComplete?: number;
  JobTemplate?: string;
  LastShareDetails?: string;
  Messages?: JobMessages;
  OutputGroupDetails?: OutputGroupDetail[];
  Priority?: number;
  Queue?: string;
  QueueTransitions?: QueueTransition[];
  RetryCount?: number;
  Role?: string;
  Settings?: JobSettings;
  ShareStatus?: ShareStatus;
  SimulateReservedQueue?: SimulateReservedQueue;
  Status?: JobStatus;
  StatusUpdateInterval?: StatusUpdateInterval;
  Timing?: Timing;
  UserMetadata?: { [key: string]: string | undefined };
  Warnings?: WarningGroup[];
}
export const Job = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccelerationSettings: S.optional(AccelerationSettings),
    AccelerationStatus: S.optional(AccelerationStatus),
    Arn: S.optional(S.String),
    BillingTagsSource: S.optional(BillingTagsSource),
    ClientRequestToken: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    CurrentPhase: S.optional(JobPhase),
    ElementalInferenceConfiguration: S.optional(
      ElementalInferenceConfiguration,
    ),
    ErrorCode: S.optional(S.Number),
    ErrorMessage: S.optional(S.String),
    HopDestinations: S.optional(__listOfHopDestination),
    Id: S.optional(S.String),
    JobEngineVersionRequested: S.optional(S.String),
    JobEngineVersionUsed: S.optional(S.String),
    JobPercentComplete: S.optional(S.Number),
    JobTemplate: S.optional(S.String),
    LastShareDetails: S.optional(S.String),
    Messages: S.optional(JobMessages),
    OutputGroupDetails: S.optional(__listOfOutputGroupDetail),
    Priority: S.optional(S.Number),
    Queue: S.optional(S.String),
    QueueTransitions: S.optional(__listOfQueueTransition),
    RetryCount: S.optional(S.Number),
    Role: S.optional(S.String),
    Settings: S.optional(JobSettings),
    ShareStatus: S.optional(ShareStatus),
    SimulateReservedQueue: S.optional(SimulateReservedQueue),
    Status: S.optional(JobStatus),
    StatusUpdateInterval: S.optional(StatusUpdateInterval),
    Timing: S.optional(Timing),
    UserMetadata: S.optional(__mapOf__string),
    Warnings: S.optional(__listOfWarningGroup),
  }).pipe(
    S.encodeKeys({
      AccelerationSettings: "accelerationSettings",
      AccelerationStatus: "accelerationStatus",
      Arn: "arn",
      BillingTagsSource: "billingTagsSource",
      ClientRequestToken: "clientRequestToken",
      CreatedAt: "createdAt",
      CurrentPhase: "currentPhase",
      ElementalInferenceConfiguration: "elementalInferenceConfiguration",
      ErrorCode: "errorCode",
      ErrorMessage: "errorMessage",
      HopDestinations: "hopDestinations",
      Id: "id",
      JobEngineVersionRequested: "jobEngineVersionRequested",
      JobEngineVersionUsed: "jobEngineVersionUsed",
      JobPercentComplete: "jobPercentComplete",
      JobTemplate: "jobTemplate",
      LastShareDetails: "lastShareDetails",
      Messages: "messages",
      OutputGroupDetails: "outputGroupDetails",
      Priority: "priority",
      Queue: "queue",
      QueueTransitions: "queueTransitions",
      RetryCount: "retryCount",
      Role: "role",
      Settings: "settings",
      ShareStatus: "shareStatus",
      SimulateReservedQueue: "simulateReservedQueue",
      Status: "status",
      StatusUpdateInterval: "statusUpdateInterval",
      Timing: "timing",
      UserMetadata: "userMetadata",
      Warnings: "warnings",
    }),
  ),
).annotate({ identifier: "Job" }) as any as S.Schema<Job>;
export interface CreateJobResponse {
  Job?: Job & {
    Role: string;
    Settings: JobSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
    Warnings: (WarningGroup & { Code: number; Count: number })[];
  };
}
export const CreateJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Job: S.optional(Job) }).pipe(S.encodeKeys({ Job: "job" })),
).annotate({
  identifier: "CreateJobResponse",
}) as any as S.Schema<CreateJobResponse>;
export interface InputTemplate {
  AdvancedInputFilter?: AdvancedInputFilter;
  AdvancedInputFilterSettings?: AdvancedInputFilterSettings;
  AudioSelectorGroups?: { [key: string]: AudioSelectorGroup | undefined };
  AudioSelectors?: { [key: string]: AudioSelector | undefined };
  CaptionSelectors?: { [key: string]: CaptionSelector | undefined };
  Crop?: Rectangle;
  DeblockFilter?: InputDeblockFilter;
  DenoiseFilter?: InputDenoiseFilter;
  DolbyVisionMetadataXml?: string;
  DynamicAudioSelectors?: { [key: string]: DynamicAudioSelector | undefined };
  FilterEnable?: InputFilterEnable;
  FilterStrength?: number;
  ImageInserter?: ImageInserter;
  InputClippings?: InputClipping[];
  InputScanType?: InputScanType;
  MultiViewSettings?: MultiViewSettings[];
  Position?: Rectangle;
  ProgramNumber?: number;
  PsiControl?: InputPsiControl;
  TimecodeSource?: InputTimecodeSource;
  TimecodeStart?: string;
  VideoOverlays?: VideoOverlay[];
  VideoSelector?: VideoSelector;
}
export const InputTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdvancedInputFilter: S.optional(AdvancedInputFilter),
    AdvancedInputFilterSettings: S.optional(AdvancedInputFilterSettings),
    AudioSelectorGroups: S.optional(__mapOfAudioSelectorGroup),
    AudioSelectors: S.optional(__mapOfAudioSelector),
    CaptionSelectors: S.optional(__mapOfCaptionSelector),
    Crop: S.optional(Rectangle),
    DeblockFilter: S.optional(InputDeblockFilter),
    DenoiseFilter: S.optional(InputDenoiseFilter),
    DolbyVisionMetadataXml: S.optional(S.String),
    DynamicAudioSelectors: S.optional(__mapOfDynamicAudioSelector),
    FilterEnable: S.optional(InputFilterEnable),
    FilterStrength: S.optional(S.Number),
    ImageInserter: S.optional(ImageInserter),
    InputClippings: S.optional(__listOfInputClipping),
    InputScanType: S.optional(InputScanType),
    MultiViewSettings: S.optional(__listOfMultiViewSettings),
    Position: S.optional(Rectangle),
    ProgramNumber: S.optional(S.Number),
    PsiControl: S.optional(InputPsiControl),
    TimecodeSource: S.optional(InputTimecodeSource),
    TimecodeStart: S.optional(S.String),
    VideoOverlays: S.optional(__listOfVideoOverlay),
    VideoSelector: S.optional(VideoSelector),
  }).pipe(
    S.encodeKeys({
      AdvancedInputFilter: "advancedInputFilter",
      AdvancedInputFilterSettings: "advancedInputFilterSettings",
      AudioSelectorGroups: "audioSelectorGroups",
      AudioSelectors: "audioSelectors",
      CaptionSelectors: "captionSelectors",
      Crop: "crop",
      DeblockFilter: "deblockFilter",
      DenoiseFilter: "denoiseFilter",
      DolbyVisionMetadataXml: "dolbyVisionMetadataXml",
      DynamicAudioSelectors: "dynamicAudioSelectors",
      FilterEnable: "filterEnable",
      FilterStrength: "filterStrength",
      ImageInserter: "imageInserter",
      InputClippings: "inputClippings",
      InputScanType: "inputScanType",
      MultiViewSettings: "multiViewSettings",
      Position: "position",
      ProgramNumber: "programNumber",
      PsiControl: "psiControl",
      TimecodeSource: "timecodeSource",
      TimecodeStart: "timecodeStart",
      VideoOverlays: "videoOverlays",
      VideoSelector: "videoSelector",
    }),
  ),
).annotate({ identifier: "InputTemplate" }) as any as S.Schema<InputTemplate>;
export type __listOfInputTemplate = InputTemplate[];
export const __listOfInputTemplate = /*@__PURE__*/ S.Array(InputTemplate);
export interface JobTemplateSettings {
  AdAvailOffset?: number;
  AvailBlanking?: AvailBlanking;
  ColorConversion3DLUTSettings?: ColorConversion3DLUTSetting[];
  Esam?: EsamSettings;
  ExtendedDataServices?: ExtendedDataServices;
  FollowSource?: number;
  Inputs?: InputTemplate[];
  KantarWatermark?: KantarWatermarkSettings;
  MotionImageInserter?: MotionImageInserter;
  NielsenConfiguration?: NielsenConfiguration;
  NielsenNonLinearWatermark?: NielsenNonLinearWatermarkSettings;
  OutputGroups?: OutputGroup[];
  TimecodeConfig?: TimecodeConfig;
  TimedMetadataInsertion?: TimedMetadataInsertion;
}
export const JobTemplateSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AdAvailOffset: S.optional(S.Number),
    AvailBlanking: S.optional(AvailBlanking),
    ColorConversion3DLUTSettings: S.optional(
      __listOfColorConversion3DLUTSetting,
    ),
    Esam: S.optional(EsamSettings),
    ExtendedDataServices: S.optional(ExtendedDataServices),
    FollowSource: S.optional(S.Number),
    Inputs: S.optional(__listOfInputTemplate),
    KantarWatermark: S.optional(KantarWatermarkSettings),
    MotionImageInserter: S.optional(MotionImageInserter),
    NielsenConfiguration: S.optional(NielsenConfiguration),
    NielsenNonLinearWatermark: S.optional(NielsenNonLinearWatermarkSettings),
    OutputGroups: S.optional(__listOfOutputGroup),
    TimecodeConfig: S.optional(TimecodeConfig),
    TimedMetadataInsertion: S.optional(TimedMetadataInsertion),
  }).pipe(
    S.encodeKeys({
      AdAvailOffset: "adAvailOffset",
      AvailBlanking: "availBlanking",
      ColorConversion3DLUTSettings: "colorConversion3DLUTSettings",
      Esam: "esam",
      ExtendedDataServices: "extendedDataServices",
      FollowSource: "followSource",
      Inputs: "inputs",
      KantarWatermark: "kantarWatermark",
      MotionImageInserter: "motionImageInserter",
      NielsenConfiguration: "nielsenConfiguration",
      NielsenNonLinearWatermark: "nielsenNonLinearWatermark",
      OutputGroups: "outputGroups",
      TimecodeConfig: "timecodeConfig",
      TimedMetadataInsertion: "timedMetadataInsertion",
    }),
  ),
).annotate({
  identifier: "JobTemplateSettings",
}) as any as S.Schema<JobTemplateSettings>;
export interface CreateJobTemplateRequest {
  AccelerationSettings?: AccelerationSettings;
  Category?: string;
  Description?: string;
  HopDestinations?: HopDestination[];
  Name?: string;
  Priority?: number;
  Queue?: string;
  Settings?: JobTemplateSettings;
  StatusUpdateInterval?: StatusUpdateInterval;
  Tags?: { [key: string]: string | undefined };
}
export const CreateJobTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccelerationSettings: S.optional(AccelerationSettings),
    Category: S.optional(S.String),
    Description: S.optional(S.String),
    HopDestinations: S.optional(__listOfHopDestination),
    Name: S.optional(S.String),
    Priority: S.optional(S.Number),
    Queue: S.optional(S.String),
    Settings: S.optional(JobTemplateSettings),
    StatusUpdateInterval: S.optional(StatusUpdateInterval),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(
      S.encodeKeys({
        AccelerationSettings: "accelerationSettings",
        Category: "category",
        Description: "description",
        HopDestinations: "hopDestinations",
        Name: "name",
        Priority: "priority",
        Queue: "queue",
        Settings: "settings",
        StatusUpdateInterval: "statusUpdateInterval",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/2017-08-29/jobTemplates" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateJobTemplateRequest",
}) as any as S.Schema<CreateJobTemplateRequest>;
export type Type = "SYSTEM" | "CUSTOM" | (string & {});
export const Type = S.String;

export interface JobTemplate {
  AccelerationSettings?: AccelerationSettings;
  Arn?: string;
  Category?: string;
  CreatedAt?: Date;
  Description?: string;
  HopDestinations?: HopDestination[];
  LastUpdated?: Date;
  Name?: string;
  Priority?: number;
  Queue?: string;
  Settings?: JobTemplateSettings;
  StatusUpdateInterval?: StatusUpdateInterval;
  Type?: Type;
}
export const JobTemplate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccelerationSettings: S.optional(AccelerationSettings),
    Arn: S.optional(S.String),
    Category: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    HopDestinations: S.optional(__listOfHopDestination),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.optional(S.String),
    Priority: S.optional(S.Number),
    Queue: S.optional(S.String),
    Settings: S.optional(JobTemplateSettings),
    StatusUpdateInterval: S.optional(StatusUpdateInterval),
    Type: S.optional(Type),
  }).pipe(
    S.encodeKeys({
      AccelerationSettings: "accelerationSettings",
      Arn: "arn",
      Category: "category",
      CreatedAt: "createdAt",
      Description: "description",
      HopDestinations: "hopDestinations",
      LastUpdated: "lastUpdated",
      Name: "name",
      Priority: "priority",
      Queue: "queue",
      Settings: "settings",
      StatusUpdateInterval: "statusUpdateInterval",
      Type: "type",
    }),
  ),
).annotate({ identifier: "JobTemplate" }) as any as S.Schema<JobTemplate>;
export interface CreateJobTemplateResponse {
  JobTemplate?: JobTemplate & {
    Name: string;
    Settings: JobTemplateSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
  };
}
export const CreateJobTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobTemplate: S.optional(JobTemplate) }).pipe(
    S.encodeKeys({ JobTemplate: "jobTemplate" }),
  ),
).annotate({
  identifier: "CreateJobTemplateResponse",
}) as any as S.Schema<CreateJobTemplateResponse>;
export interface CaptionDescriptionPreset {
  CustomLanguageCode?: string;
  DestinationSettings?: CaptionDestinationSettings;
  LanguageCode?: LanguageCode;
  LanguageDescription?: string;
}
export const CaptionDescriptionPreset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    CustomLanguageCode: S.optional(S.String),
    DestinationSettings: S.optional(CaptionDestinationSettings),
    LanguageCode: S.optional(LanguageCode),
    LanguageDescription: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      CustomLanguageCode: "customLanguageCode",
      DestinationSettings: "destinationSettings",
      LanguageCode: "languageCode",
      LanguageDescription: "languageDescription",
    }),
  ),
).annotate({
  identifier: "CaptionDescriptionPreset",
}) as any as S.Schema<CaptionDescriptionPreset>;
export type __listOfCaptionDescriptionPreset = CaptionDescriptionPreset[];
export const __listOfCaptionDescriptionPreset = /*@__PURE__*/ S.Array(
  CaptionDescriptionPreset,
);
export interface PresetSettings {
  AudioDescriptions?: AudioDescription[];
  CaptionDescriptions?: CaptionDescriptionPreset[];
  ContainerSettings?: ContainerSettings;
  VideoDescription?: VideoDescription;
}
export const PresetSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioDescriptions: S.optional(__listOfAudioDescription),
    CaptionDescriptions: S.optional(__listOfCaptionDescriptionPreset),
    ContainerSettings: S.optional(ContainerSettings),
    VideoDescription: S.optional(VideoDescription),
  }).pipe(
    S.encodeKeys({
      AudioDescriptions: "audioDescriptions",
      CaptionDescriptions: "captionDescriptions",
      ContainerSettings: "containerSettings",
      VideoDescription: "videoDescription",
    }),
  ),
).annotate({ identifier: "PresetSettings" }) as any as S.Schema<PresetSettings>;
export interface CreatePresetRequest {
  Category?: string;
  Description?: string;
  Name?: string;
  Settings?: PresetSettings;
  Tags?: { [key: string]: string | undefined };
}
export const CreatePresetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Category: S.optional(S.String),
    Description: S.optional(S.String),
    Name: S.optional(S.String),
    Settings: S.optional(PresetSettings),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(
      S.encodeKeys({
        Category: "category",
        Description: "description",
        Name: "name",
        Settings: "settings",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/2017-08-29/presets" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreatePresetRequest",
}) as any as S.Schema<CreatePresetRequest>;
export interface Preset {
  Arn?: string;
  Category?: string;
  CreatedAt?: Date;
  Description?: string;
  LastUpdated?: Date;
  Name?: string;
  Settings?: PresetSettings;
  Type?: Type;
}
export const Preset = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Category: S.optional(S.String),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Name: S.optional(S.String),
    Settings: S.optional(PresetSettings),
    Type: S.optional(Type),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      Category: "category",
      CreatedAt: "createdAt",
      Description: "description",
      LastUpdated: "lastUpdated",
      Name: "name",
      Settings: "settings",
      Type: "type",
    }),
  ),
).annotate({ identifier: "Preset" }) as any as S.Schema<Preset>;
export interface CreatePresetResponse {
  Preset?: Preset & { Name: string; Settings: PresetSettings };
}
export const CreatePresetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Preset: S.optional(Preset) }).pipe(
    S.encodeKeys({ Preset: "preset" }),
  ),
).annotate({
  identifier: "CreatePresetResponse",
}) as any as S.Schema<CreatePresetResponse>;
export type __integerMin0 = number;
export type PricingPlan = "ON_DEMAND" | "RESERVED" | (string & {});
export const PricingPlan = S.String;

export type Commitment = "ONE_YEAR" | (string & {});
export const Commitment = S.String;

export type RenewalType = "AUTO_RENEW" | "EXPIRE" | (string & {});
export const RenewalType = S.String;

export interface ReservationPlanSettings {
  Commitment?: Commitment;
  RenewalType?: RenewalType;
  ReservedSlots?: number;
}
export const ReservationPlanSettings = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Commitment: S.optional(Commitment),
    RenewalType: S.optional(RenewalType),
    ReservedSlots: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      Commitment: "commitment",
      RenewalType: "renewalType",
      ReservedSlots: "reservedSlots",
    }),
  ),
).annotate({
  identifier: "ReservationPlanSettings",
}) as any as S.Schema<ReservationPlanSettings>;
export type QueueStatus = "ACTIVE" | "PAUSED" | (string & {});
export const QueueStatus = S.String;

export interface CreateQueueRequest {
  ConcurrentJobs?: number;
  Description?: string;
  MaximumConcurrentFeeds?: number;
  Name?: string;
  PricingPlan?: PricingPlan;
  ReservationPlanSettings?: ReservationPlanSettings;
  Status?: QueueStatus;
  Tags?: { [key: string]: string | undefined };
}
export const CreateQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConcurrentJobs: S.optional(S.Number),
    Description: S.optional(S.String),
    MaximumConcurrentFeeds: S.optional(S.Number),
    Name: S.optional(S.String),
    PricingPlan: S.optional(PricingPlan),
    ReservationPlanSettings: S.optional(ReservationPlanSettings),
    Status: S.optional(QueueStatus),
    Tags: S.optional(__mapOf__string),
  })
    .pipe(
      S.encodeKeys({
        ConcurrentJobs: "concurrentJobs",
        Description: "description",
        MaximumConcurrentFeeds: "maximumConcurrentFeeds",
        Name: "name",
        PricingPlan: "pricingPlan",
        ReservationPlanSettings: "reservationPlanSettings",
        Status: "status",
        Tags: "tags",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/2017-08-29/queues" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateQueueRequest",
}) as any as S.Schema<CreateQueueRequest>;
export type ReservationPlanStatus = "ACTIVE" | "EXPIRED" | (string & {});
export const ReservationPlanStatus = S.String;

export interface ReservationPlan {
  Commitment?: Commitment;
  ExpiresAt?: Date;
  PurchasedAt?: Date;
  RenewalType?: RenewalType;
  ReservedSlots?: number;
  Status?: ReservationPlanStatus;
}
export const ReservationPlan = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Commitment: S.optional(Commitment),
    ExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    PurchasedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    RenewalType: S.optional(RenewalType),
    ReservedSlots: S.optional(S.Number),
    Status: S.optional(ReservationPlanStatus),
  }).pipe(
    S.encodeKeys({
      Commitment: "commitment",
      ExpiresAt: "expiresAt",
      PurchasedAt: "purchasedAt",
      RenewalType: "renewalType",
      ReservedSlots: "reservedSlots",
      Status: "status",
    }),
  ),
).annotate({
  identifier: "ReservationPlan",
}) as any as S.Schema<ReservationPlan>;
export interface ServiceOverride {
  Message?: string;
  Name?: string;
  OverrideValue?: string;
  Value?: string;
}
export const ServiceOverride = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Message: S.optional(S.String),
    Name: S.optional(S.String),
    OverrideValue: S.optional(S.String),
    Value: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      Message: "message",
      Name: "name",
      OverrideValue: "overrideValue",
      Value: "value",
    }),
  ),
).annotate({
  identifier: "ServiceOverride",
}) as any as S.Schema<ServiceOverride>;
export type __listOfServiceOverride = ServiceOverride[];
export const __listOfServiceOverride = /*@__PURE__*/ S.Array(ServiceOverride);
export interface Queue {
  Arn?: string;
  ConcurrentJobs?: number;
  CreatedAt?: Date;
  Description?: string;
  LastUpdated?: Date;
  MaximumConcurrentFeeds?: number;
  Name?: string;
  PricingPlan?: PricingPlan;
  ProgressingJobsCount?: number;
  ReservationPlan?: ReservationPlan;
  ServiceOverrides?: ServiceOverride[];
  Status?: QueueStatus;
  SubmittedJobsCount?: number;
  Type?: Type;
}
export const Queue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    ConcurrentJobs: S.optional(S.Number),
    CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Description: S.optional(S.String),
    LastUpdated: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MaximumConcurrentFeeds: S.optional(S.Number),
    Name: S.optional(S.String),
    PricingPlan: S.optional(PricingPlan),
    ProgressingJobsCount: S.optional(S.Number),
    ReservationPlan: S.optional(ReservationPlan),
    ServiceOverrides: S.optional(__listOfServiceOverride),
    Status: S.optional(QueueStatus),
    SubmittedJobsCount: S.optional(S.Number),
    Type: S.optional(Type),
  }).pipe(
    S.encodeKeys({
      Arn: "arn",
      ConcurrentJobs: "concurrentJobs",
      CreatedAt: "createdAt",
      Description: "description",
      LastUpdated: "lastUpdated",
      MaximumConcurrentFeeds: "maximumConcurrentFeeds",
      Name: "name",
      PricingPlan: "pricingPlan",
      ProgressingJobsCount: "progressingJobsCount",
      ReservationPlan: "reservationPlan",
      ServiceOverrides: "serviceOverrides",
      Status: "status",
      SubmittedJobsCount: "submittedJobsCount",
      Type: "type",
    }),
  ),
).annotate({ identifier: "Queue" }) as any as S.Schema<Queue>;
export interface CreateQueueResponse {
  Queue?: Queue & { Name: string };
}
export const CreateQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Queue: S.optional(Queue) }).pipe(S.encodeKeys({ Queue: "queue" })),
).annotate({
  identifier: "CreateQueueResponse",
}) as any as S.Schema<CreateQueueResponse>;
export interface CreateResourceShareRequest {
  JobId?: string;
  SupportCaseId?: string;
}
export const CreateResourceShareRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobId: S.optional(S.String), SupportCaseId: S.optional(S.String) })
    .pipe(S.encodeKeys({ JobId: "jobId", SupportCaseId: "supportCaseId" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/2017-08-29/resourceShares" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "CreateResourceShareRequest",
}) as any as S.Schema<CreateResourceShareRequest>;
export interface CreateResourceShareResponse {}
export const CreateResourceShareResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "CreateResourceShareResponse",
}) as any as S.Schema<CreateResourceShareResponse>;
export interface DeleteJobTemplateRequest {
  Name: string;
}
export const DeleteJobTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/2017-08-29/jobTemplates/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteJobTemplateRequest",
}) as any as S.Schema<DeleteJobTemplateRequest>;
export interface DeleteJobTemplateResponse {}
export const DeleteJobTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteJobTemplateResponse",
}) as any as S.Schema<DeleteJobTemplateResponse>;
export interface DeletePolicyRequest {}
export const DeletePolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/2017-08-29/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePolicyRequest",
}) as any as S.Schema<DeletePolicyRequest>;
export interface DeletePolicyResponse {}
export const DeletePolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePolicyResponse",
}) as any as S.Schema<DeletePolicyResponse>;
export interface DeletePresetRequest {
  Name: string;
}
export const DeletePresetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/2017-08-29/presets/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeletePresetRequest",
}) as any as S.Schema<DeletePresetRequest>;
export interface DeletePresetResponse {}
export const DeletePresetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeletePresetResponse",
}) as any as S.Schema<DeletePresetResponse>;
export interface DeleteQueueRequest {
  Name: string;
}
export const DeleteQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/2017-08-29/queues/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteQueueRequest",
}) as any as S.Schema<DeleteQueueRequest>;
export interface DeleteQueueResponse {}
export const DeleteQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DeleteQueueResponse",
}) as any as S.Schema<DeleteQueueResponse>;
export type DescribeEndpointsMode = "DEFAULT" | "GET_ONLY" | (string & {});
export const DescribeEndpointsMode = S.String;

export interface DescribeEndpointsRequest {
  MaxResults?: number;
  Mode?: DescribeEndpointsMode;
  NextToken?: string;
}
export const DescribeEndpointsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    Mode: S.optional(DescribeEndpointsMode),
    NextToken: S.optional(S.String),
  })
    .pipe(
      S.encodeKeys({
        MaxResults: "maxResults",
        Mode: "mode",
        NextToken: "nextToken",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/2017-08-29/endpoints" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "DescribeEndpointsRequest",
}) as any as S.Schema<DescribeEndpointsRequest>;
export interface Endpoint {
  Url?: string;
}
export const Endpoint = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Url: S.optional(S.String) }).pipe(S.encodeKeys({ Url: "url" })),
).annotate({ identifier: "Endpoint" }) as any as S.Schema<Endpoint>;
export type __listOfEndpoint = Endpoint[];
export const __listOfEndpoint = /*@__PURE__*/ S.Array(Endpoint);
export interface DescribeEndpointsResponse {
  Endpoints?: Endpoint[];
  NextToken?: string;
}
export const DescribeEndpointsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Endpoints: S.optional(__listOfEndpoint),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Endpoints: "endpoints", NextToken: "nextToken" })),
).annotate({
  identifier: "DescribeEndpointsResponse",
}) as any as S.Schema<DescribeEndpointsResponse>;
export interface DisassociateCertificateRequest {
  Arn: string;
}
export const DisassociateCertificateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/2017-08-29/certificates/{Arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DisassociateCertificateRequest",
}) as any as S.Schema<DisassociateCertificateRequest>;
export interface DisassociateCertificateResponse {}
export const DisassociateCertificateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}),
).annotate({
  identifier: "DisassociateCertificateResponse",
}) as any as S.Schema<DisassociateCertificateResponse>;
export interface GetJobRequest {
  Id: string;
}
export const GetJobRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/jobs/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetJobRequest" }) as any as S.Schema<GetJobRequest>;
export interface GetJobResponse {
  Job?: Job & {
    Role: string;
    Settings: JobSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
    Warnings: (WarningGroup & { Code: number; Count: number })[];
  };
}
export const GetJobResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Job: S.optional(Job) }).pipe(S.encodeKeys({ Job: "job" })),
).annotate({ identifier: "GetJobResponse" }) as any as S.Schema<GetJobResponse>;
export interface GetJobsQueryResultsRequest {
  Id: string;
}
export const GetJobsQueryResultsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.String.pipe(T.HttpLabel("Id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/jobsQueries/{Id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetJobsQueryResultsRequest",
}) as any as S.Schema<GetJobsQueryResultsRequest>;
export type __listOfJob = Job[];
export const __listOfJob = /*@__PURE__*/ S.Array(Job);
export type JobsQueryStatus =
  | "SUBMITTED"
  | "PROGRESSING"
  | "COMPLETE"
  | "ERROR"
  | (string & {});
export const JobsQueryStatus = S.String;

export interface GetJobsQueryResultsResponse {
  Jobs?: (Job & {
    Role: string;
    Settings: JobSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
    Warnings: (WarningGroup & { Code: number; Count: number })[];
  })[];
  NextToken?: string;
  Status?: JobsQueryStatus;
}
export const GetJobsQueryResultsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Jobs: S.optional(__listOfJob),
    NextToken: S.optional(S.String),
    Status: S.optional(JobsQueryStatus),
  }).pipe(
    S.encodeKeys({ Jobs: "jobs", NextToken: "nextToken", Status: "status" }),
  ),
).annotate({
  identifier: "GetJobsQueryResultsResponse",
}) as any as S.Schema<GetJobsQueryResultsResponse>;
export interface GetJobTemplateRequest {
  Name: string;
}
export const GetJobTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/jobTemplates/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetJobTemplateRequest",
}) as any as S.Schema<GetJobTemplateRequest>;
export interface GetJobTemplateResponse {
  JobTemplate?: JobTemplate & {
    Name: string;
    Settings: JobTemplateSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
  };
}
export const GetJobTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobTemplate: S.optional(JobTemplate) }).pipe(
    S.encodeKeys({ JobTemplate: "jobTemplate" }),
  ),
).annotate({
  identifier: "GetJobTemplateResponse",
}) as any as S.Schema<GetJobTemplateResponse>;
export interface GetPolicyRequest {}
export const GetPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({}).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/policy" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPolicyRequest",
}) as any as S.Schema<GetPolicyRequest>;
export type InputPolicy = "ALLOWED" | "DISALLOWED" | (string & {});
export const InputPolicy = S.String;

export interface Policy {
  HttpInputs?: InputPolicy;
  HttpsInputs?: InputPolicy;
  S3Inputs?: InputPolicy;
}
export const Policy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    HttpInputs: S.optional(InputPolicy),
    HttpsInputs: S.optional(InputPolicy),
    S3Inputs: S.optional(InputPolicy),
  }).pipe(
    S.encodeKeys({
      HttpInputs: "httpInputs",
      HttpsInputs: "httpsInputs",
      S3Inputs: "s3Inputs",
    }),
  ),
).annotate({ identifier: "Policy" }) as any as S.Schema<Policy>;
export interface GetPolicyResponse {
  Policy?: Policy;
}
export const GetPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(Policy) }).pipe(
    S.encodeKeys({ Policy: "policy" }),
  ),
).annotate({
  identifier: "GetPolicyResponse",
}) as any as S.Schema<GetPolicyResponse>;
export interface GetPresetRequest {
  Name: string;
}
export const GetPresetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/presets/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetPresetRequest",
}) as any as S.Schema<GetPresetRequest>;
export interface GetPresetResponse {
  Preset?: Preset & { Name: string; Settings: PresetSettings };
}
export const GetPresetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Preset: S.optional(Preset) }).pipe(
    S.encodeKeys({ Preset: "preset" }),
  ),
).annotate({
  identifier: "GetPresetResponse",
}) as any as S.Schema<GetPresetResponse>;
export interface GetQueueRequest {
  Name: string;
}
export const GetQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/queues/{Name}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "GetQueueRequest",
}) as any as S.Schema<GetQueueRequest>;
export interface GetQueueResponse {
  Queue?: Queue & { Name: string };
}
export const GetQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Queue: S.optional(Queue) }).pipe(S.encodeKeys({ Queue: "queue" })),
).annotate({
  identifier: "GetQueueResponse",
}) as any as S.Schema<GetQueueResponse>;
export type __integerMin1Max20 = number;
export type Order = "ASCENDING" | "DESCENDING" | (string & {});
export const Order = S.String;

export interface ListJobsRequest {
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
  Queue?: string;
  Status?: JobStatus;
}
export const ListJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Order: S.optional(Order).pipe(T.HttpQuery("order")),
    Queue: S.optional(S.String).pipe(T.HttpQuery("queue")),
    Status: S.optional(JobStatus).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/jobs" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobsRequest",
}) as any as S.Schema<ListJobsRequest>;
export interface ListJobsResponse {
  Jobs?: (Job & {
    Role: string;
    Settings: JobSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
    Warnings: (WarningGroup & { Code: number; Count: number })[];
  })[];
  NextToken?: string;
}
export const ListJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Jobs: S.optional(__listOfJob),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Jobs: "jobs", NextToken: "nextToken" })),
).annotate({
  identifier: "ListJobsResponse",
}) as any as S.Schema<ListJobsResponse>;
export type JobTemplateListBy =
  | "NAME"
  | "CREATION_DATE"
  | "SYSTEM"
  | (string & {});
export const JobTemplateListBy = S.String;

export interface ListJobTemplatesRequest {
  Category?: string;
  ListBy?: JobTemplateListBy;
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
}
export const ListJobTemplatesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Category: S.optional(S.String).pipe(T.HttpQuery("category")),
    ListBy: S.optional(JobTemplateListBy).pipe(T.HttpQuery("listBy")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Order: S.optional(Order).pipe(T.HttpQuery("order")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/jobTemplates" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListJobTemplatesRequest",
}) as any as S.Schema<ListJobTemplatesRequest>;
export type __listOfJobTemplate = JobTemplate[];
export const __listOfJobTemplate = /*@__PURE__*/ S.Array(JobTemplate);
export interface ListJobTemplatesResponse {
  JobTemplates?: (JobTemplate & {
    Name: string;
    Settings: JobTemplateSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
  })[];
  NextToken?: string;
}
export const ListJobTemplatesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    JobTemplates: S.optional(__listOfJobTemplate),
    NextToken: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ JobTemplates: "jobTemplates", NextToken: "nextToken" }),
  ),
).annotate({
  identifier: "ListJobTemplatesResponse",
}) as any as S.Schema<ListJobTemplatesResponse>;
export type PresetListBy = "NAME" | "CREATION_DATE" | "SYSTEM" | (string & {});
export const PresetListBy = S.String;

export interface ListPresetsRequest {
  Category?: string;
  ListBy?: PresetListBy;
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
}
export const ListPresetsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Category: S.optional(S.String).pipe(T.HttpQuery("category")),
    ListBy: S.optional(PresetListBy).pipe(T.HttpQuery("listBy")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Order: S.optional(Order).pipe(T.HttpQuery("order")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/presets" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListPresetsRequest",
}) as any as S.Schema<ListPresetsRequest>;
export type __listOfPreset = Preset[];
export const __listOfPreset = /*@__PURE__*/ S.Array(Preset);
export interface ListPresetsResponse {
  NextToken?: string;
  Presets?: (Preset & { Name: string; Settings: PresetSettings })[];
}
export const ListPresetsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Presets: S.optional(__listOfPreset),
  }).pipe(S.encodeKeys({ NextToken: "nextToken", Presets: "presets" })),
).annotate({
  identifier: "ListPresetsResponse",
}) as any as S.Schema<ListPresetsResponse>;
export type QueueListBy = "NAME" | "CREATION_DATE" | (string & {});
export const QueueListBy = S.String;

export interface ListQueuesRequest {
  ListBy?: QueueListBy;
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
}
export const ListQueuesRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ListBy: S.optional(QueueListBy).pipe(T.HttpQuery("listBy")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Order: S.optional(Order).pipe(T.HttpQuery("order")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/queues" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListQueuesRequest",
}) as any as S.Schema<ListQueuesRequest>;
export type __listOfQueue = Queue[];
export const __listOfQueue = /*@__PURE__*/ S.Array(Queue);
export interface ListQueuesResponse {
  NextToken?: string;
  Queues?: (Queue & { Name: string })[];
  TotalConcurrentJobs?: number;
  UnallocatedConcurrentJobs?: number;
}
export const ListQueuesResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Queues: S.optional(__listOfQueue),
    TotalConcurrentJobs: S.optional(S.Number),
    UnallocatedConcurrentJobs: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      NextToken: "nextToken",
      Queues: "queues",
      TotalConcurrentJobs: "totalConcurrentJobs",
      UnallocatedConcurrentJobs: "unallocatedConcurrentJobs",
    }),
  ),
).annotate({
  identifier: "ListQueuesResponse",
}) as any as S.Schema<ListQueuesResponse>;
export interface ListTagsForResourceRequest {
  Arn: string;
}
export const ListTagsForResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/tags/{Arn}" }),
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
export interface ResourceTags {
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const ResourceTags = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    Tags: S.optional(__mapOf__string),
  }).pipe(S.encodeKeys({ Arn: "arn", Tags: "tags" })),
).annotate({ identifier: "ResourceTags" }) as any as S.Schema<ResourceTags>;
export interface ListTagsForResourceResponse {
  ResourceTags?: ResourceTags;
}
export const ListTagsForResourceResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ResourceTags: S.optional(ResourceTags) }).pipe(
    S.encodeKeys({ ResourceTags: "resourceTags" }),
  ),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface ListVersionsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListVersionsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/versions" }),
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
export interface JobEngineVersion {
  ExpirationDate?: Date;
  Version?: string;
}
export const JobEngineVersion = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ExpirationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    Version: S.optional(S.String),
  }).pipe(
    S.encodeKeys({ ExpirationDate: "expirationDate", Version: "version" }),
  ),
).annotate({
  identifier: "JobEngineVersion",
}) as any as S.Schema<JobEngineVersion>;
export type __listOfJobEngineVersion = JobEngineVersion[];
export const __listOfJobEngineVersion = /*@__PURE__*/ S.Array(JobEngineVersion);
export interface ListVersionsResponse {
  NextToken?: string;
  Versions?: JobEngineVersion[];
}
export const ListVersionsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Versions: S.optional(__listOfJobEngineVersion),
  }).pipe(S.encodeKeys({ NextToken: "nextToken", Versions: "versions" })),
).annotate({
  identifier: "ListVersionsResponse",
}) as any as S.Schema<ListVersionsResponse>;
export interface ProbeInputFile {
  FileUrl?: string;
}
export const ProbeInputFile = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ FileUrl: S.optional(S.String) }).pipe(
    S.encodeKeys({ FileUrl: "fileUrl" }),
  ),
).annotate({ identifier: "ProbeInputFile" }) as any as S.Schema<ProbeInputFile>;
export type __listOfProbeInputFile = ProbeInputFile[];
export const __listOfProbeInputFile = /*@__PURE__*/ S.Array(ProbeInputFile);
export interface ProbeRequest {
  InputFiles?: ProbeInputFile[];
}
export const ProbeRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ InputFiles: S.optional(__listOfProbeInputFile) })
    .pipe(S.encodeKeys({ InputFiles: "inputFiles" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/2017-08-29/probe" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({ identifier: "ProbeRequest" }) as any as S.Schema<ProbeRequest>;
export type Format =
  | "mp4"
  | "quicktime"
  | "matroska"
  | "webm"
  | "mxf"
  | "wave"
  | "avi"
  | "mpegts"
  | "mpegps"
  | "mp3"
  | (string & {});
export const Format = S.String;

export interface FrameRate {
  Denominator?: number;
  Numerator?: number;
}
export const FrameRate = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Denominator: S.optional(S.Number),
    Numerator: S.optional(S.Number),
  }).pipe(S.encodeKeys({ Denominator: "denominator", Numerator: "numerator" })),
).annotate({ identifier: "FrameRate" }) as any as S.Schema<FrameRate>;
export interface AudioProperties {
  BitDepth?: number;
  BitRate?: number;
  Channels?: number;
  FrameRate?: FrameRate;
  LanguageCode?: string;
  ObjectCount?: number;
  SampleRate?: number;
}
export const AudioProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BitDepth: S.optional(S.Number),
    BitRate: S.optional(S.Number),
    Channels: S.optional(S.Number),
    FrameRate: S.optional(FrameRate),
    LanguageCode: S.optional(S.String),
    ObjectCount: S.optional(S.Number),
    SampleRate: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BitDepth: "bitDepth",
      BitRate: "bitRate",
      Channels: "channels",
      FrameRate: "frameRate",
      LanguageCode: "languageCode",
      ObjectCount: "objectCount",
      SampleRate: "sampleRate",
    }),
  ),
).annotate({
  identifier: "AudioProperties",
}) as any as S.Schema<AudioProperties>;
export type Codec =
  | "UNKNOWN"
  | "AAC"
  | "AC3"
  | "EAC3"
  | "FLAC"
  | "MP2"
  | "MP3"
  | "OPUS"
  | "PCM"
  | "VORBIS"
  | "AV1"
  | "AVC"
  | "HEVC"
  | "JPEG2000"
  | "MJPEG"
  | "MPEG1"
  | "MP4V"
  | "MPEG2"
  | "PRORES"
  | "QTRLE"
  | "THEORA"
  | "UNCOMPRESSED"
  | "VFW"
  | "VP8"
  | "VP9"
  | "C608"
  | "C708"
  | "WEBVTT"
  | (string & {});
export const Codec = S.String;

export interface DataProperties {
  LanguageCode?: string;
}
export const DataProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ LanguageCode: S.optional(S.String) }).pipe(
    S.encodeKeys({ LanguageCode: "languageCode" }),
  ),
).annotate({ identifier: "DataProperties" }) as any as S.Schema<DataProperties>;
export type TrackType = "video" | "audio" | "data" | (string & {});
export const TrackType = S.String;

export type ColorPrimaries =
  | "ITU_709"
  | "UNSPECIFIED"
  | "RESERVED"
  | "ITU_470M"
  | "ITU_470BG"
  | "SMPTE_170M"
  | "SMPTE_240M"
  | "GENERIC_FILM"
  | "ITU_2020"
  | "SMPTE_428_1"
  | "SMPTE_431_2"
  | "SMPTE_EG_432_1"
  | "IPT"
  | "SMPTE_2067XYZ"
  | "EBU_3213_E"
  | "LAST"
  | (string & {});
export const ColorPrimaries = S.String;

export interface ContentLightLevel {
  MaxContentLightLevel?: number;
  MaxFrameAverageLightLevel?: number;
}
export const ContentLightLevel = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    MaxContentLightLevel: S.optional(S.Number),
    MaxFrameAverageLightLevel: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      MaxContentLightLevel: "maxContentLightLevel",
      MaxFrameAverageLightLevel: "maxFrameAverageLightLevel",
    }),
  ),
).annotate({
  identifier: "ContentLightLevel",
}) as any as S.Schema<ContentLightLevel>;
export type MatrixCoefficients =
  | "RGB"
  | "ITU_709"
  | "UNSPECIFIED"
  | "RESERVED"
  | "FCC"
  | "ITU_470BG"
  | "SMPTE_170M"
  | "SMPTE_240M"
  | "YCgCo"
  | "ITU_2020_NCL"
  | "ITU_2020_CL"
  | "SMPTE_2085"
  | "CD_NCL"
  | "CD_CL"
  | "ITU_2100ICtCp"
  | "IPT"
  | "EBU3213"
  | "LAST"
  | (string & {});
export const MatrixCoefficients = S.String;

export type TransferCharacteristics =
  | "ITU_709"
  | "UNSPECIFIED"
  | "RESERVED"
  | "ITU_470M"
  | "ITU_470BG"
  | "SMPTE_170M"
  | "SMPTE_240M"
  | "LINEAR"
  | "LOG10_2"
  | "LOC10_2_5"
  | "IEC_61966_2_4"
  | "ITU_1361"
  | "IEC_61966_2_1"
  | "ITU_2020_10bit"
  | "ITU_2020_12bit"
  | "SMPTE_2084"
  | "SMPTE_428_1"
  | "ARIB_B67"
  | "LAST"
  | (string & {});
export const TransferCharacteristics = S.String;

export interface CodecMetadata {
  BitDepth?: number;
  ChromaSubsampling?: string;
  CodedFrameRate?: FrameRate;
  ColorPrimaries?: ColorPrimaries;
  ContentLightLevel?: ContentLightLevel;
  FieldOrder?: string;
  Height?: number;
  Level?: string;
  MatrixCoefficients?: MatrixCoefficients;
  Profile?: string;
  Rotation?: number;
  ScanType?: string;
  TransferCharacteristics?: TransferCharacteristics;
  Width?: number;
}
export const CodecMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BitDepth: S.optional(S.Number),
    ChromaSubsampling: S.optional(S.String),
    CodedFrameRate: S.optional(FrameRate),
    ColorPrimaries: S.optional(ColorPrimaries),
    ContentLightLevel: S.optional(ContentLightLevel),
    FieldOrder: S.optional(S.String),
    Height: S.optional(S.Number),
    Level: S.optional(S.String),
    MatrixCoefficients: S.optional(MatrixCoefficients),
    Profile: S.optional(S.String),
    Rotation: S.optional(S.Number),
    ScanType: S.optional(S.String),
    TransferCharacteristics: S.optional(TransferCharacteristics),
    Width: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BitDepth: "bitDepth",
      ChromaSubsampling: "chromaSubsampling",
      CodedFrameRate: "codedFrameRate",
      ColorPrimaries: "colorPrimaries",
      ContentLightLevel: "contentLightLevel",
      FieldOrder: "fieldOrder",
      Height: "height",
      Level: "level",
      MatrixCoefficients: "matrixCoefficients",
      Profile: "profile",
      Rotation: "rotation",
      ScanType: "scanType",
      TransferCharacteristics: "transferCharacteristics",
      Width: "width",
    }),
  ),
).annotate({ identifier: "CodecMetadata" }) as any as S.Schema<CodecMetadata>;
export interface MasteringDisplayColorVolume {
  BluePrimaryX?: number;
  BluePrimaryY?: number;
  GreenPrimaryX?: number;
  GreenPrimaryY?: number;
  MaxLuminance?: number;
  MinLuminance?: number;
  RedPrimaryX?: number;
  RedPrimaryY?: number;
  WhitePointX?: number;
  WhitePointY?: number;
}
export const MasteringDisplayColorVolume = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BluePrimaryX: S.optional(S.Number),
    BluePrimaryY: S.optional(S.Number),
    GreenPrimaryX: S.optional(S.Number),
    GreenPrimaryY: S.optional(S.Number),
    MaxLuminance: S.optional(S.Number),
    MinLuminance: S.optional(S.Number),
    RedPrimaryX: S.optional(S.Number),
    RedPrimaryY: S.optional(S.Number),
    WhitePointX: S.optional(S.Number),
    WhitePointY: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BluePrimaryX: "bluePrimaryX",
      BluePrimaryY: "bluePrimaryY",
      GreenPrimaryX: "greenPrimaryX",
      GreenPrimaryY: "greenPrimaryY",
      MaxLuminance: "maxLuminance",
      MinLuminance: "minLuminance",
      RedPrimaryX: "redPrimaryX",
      RedPrimaryY: "redPrimaryY",
      WhitePointX: "whitePointX",
      WhitePointY: "whitePointY",
    }),
  ),
).annotate({
  identifier: "MasteringDisplayColorVolume",
}) as any as S.Schema<MasteringDisplayColorVolume>;
export interface HdrMetadata {
  ContentLightLevel?: ContentLightLevel;
  MasteringDisplayColorVolume?: MasteringDisplayColorVolume;
}
export const HdrMetadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ContentLightLevel: S.optional(ContentLightLevel),
    MasteringDisplayColorVolume: S.optional(MasteringDisplayColorVolume),
  }).pipe(
    S.encodeKeys({
      ContentLightLevel: "contentLightLevel",
      MasteringDisplayColorVolume: "masteringDisplayColorVolume",
    }),
  ),
).annotate({ identifier: "HdrMetadata" }) as any as S.Schema<HdrMetadata>;
export interface VideoProperties {
  BitDepth?: number;
  BitRate?: number;
  CodecMetadata?: CodecMetadata;
  ColorPrimaries?: ColorPrimaries;
  FrameRate?: FrameRate;
  HdrMetadata?: HdrMetadata;
  Height?: number;
  MatrixCoefficients?: MatrixCoefficients;
  Rotation?: number;
  TransferCharacteristics?: TransferCharacteristics;
  Width?: number;
}
export const VideoProperties = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BitDepth: S.optional(S.Number),
    BitRate: S.optional(S.Number),
    CodecMetadata: S.optional(CodecMetadata),
    ColorPrimaries: S.optional(ColorPrimaries),
    FrameRate: S.optional(FrameRate),
    HdrMetadata: S.optional(HdrMetadata),
    Height: S.optional(S.Number),
    MatrixCoefficients: S.optional(MatrixCoefficients),
    Rotation: S.optional(S.Number),
    TransferCharacteristics: S.optional(TransferCharacteristics),
    Width: S.optional(S.Number),
  }).pipe(
    S.encodeKeys({
      BitDepth: "bitDepth",
      BitRate: "bitRate",
      CodecMetadata: "codecMetadata",
      ColorPrimaries: "colorPrimaries",
      FrameRate: "frameRate",
      HdrMetadata: "hdrMetadata",
      Height: "height",
      MatrixCoefficients: "matrixCoefficients",
      Rotation: "rotation",
      TransferCharacteristics: "transferCharacteristics",
      Width: "width",
    }),
  ),
).annotate({
  identifier: "VideoProperties",
}) as any as S.Schema<VideoProperties>;
export interface Track {
  AudioProperties?: AudioProperties;
  Codec?: Codec;
  DataProperties?: DataProperties;
  Duration?: number;
  Index?: number;
  TrackType?: TrackType;
  VideoProperties?: VideoProperties;
}
export const Track = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioProperties: S.optional(AudioProperties),
    Codec: S.optional(Codec),
    DataProperties: S.optional(DataProperties),
    Duration: S.optional(S.Number),
    Index: S.optional(S.Number),
    TrackType: S.optional(TrackType),
    VideoProperties: S.optional(VideoProperties),
  }).pipe(
    S.encodeKeys({
      AudioProperties: "audioProperties",
      Codec: "codec",
      DataProperties: "dataProperties",
      Duration: "duration",
      Index: "index",
      TrackType: "trackType",
      VideoProperties: "videoProperties",
    }),
  ),
).annotate({ identifier: "Track" }) as any as S.Schema<Track>;
export type __listOfTrack = Track[];
export const __listOfTrack = /*@__PURE__*/ S.Array(Track);
export interface Container {
  BitRate?: number;
  Duration?: number;
  Format?: Format;
  StartTimecode?: string;
  Tracks?: Track[];
}
export const Container = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    BitRate: S.optional(S.Number),
    Duration: S.optional(S.Number),
    Format: S.optional(Format),
    StartTimecode: S.optional(S.String),
    Tracks: S.optional(__listOfTrack),
  }).pipe(
    S.encodeKeys({
      BitRate: "bitRate",
      Duration: "duration",
      Format: "format",
      StartTimecode: "startTimecode",
      Tracks: "tracks",
    }),
  ),
).annotate({ identifier: "Container" }) as any as S.Schema<Container>;
export interface Metadata {
  ETag?: string;
  FileSize?: number;
  LastModified?: Date;
  MimeType?: string;
}
export const Metadata = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ETag: S.optional(S.String),
    FileSize: S.optional(S.Number),
    LastModified: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    MimeType: S.optional(S.String),
  }).pipe(
    S.encodeKeys({
      ETag: "eTag",
      FileSize: "fileSize",
      LastModified: "lastModified",
      MimeType: "mimeType",
    }),
  ),
).annotate({ identifier: "Metadata" }) as any as S.Schema<Metadata>;
export type __listOf__integer = number[];
export const __listOf__integer = /*@__PURE__*/ S.Array(S.Number);
export interface TrackMapping {
  AudioTrackIndexes?: number[];
  DataTrackIndexes?: number[];
  VideoTrackIndexes?: number[];
}
export const TrackMapping = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AudioTrackIndexes: S.optional(__listOf__integer),
    DataTrackIndexes: S.optional(__listOf__integer),
    VideoTrackIndexes: S.optional(__listOf__integer),
  }).pipe(
    S.encodeKeys({
      AudioTrackIndexes: "audioTrackIndexes",
      DataTrackIndexes: "dataTrackIndexes",
      VideoTrackIndexes: "videoTrackIndexes",
    }),
  ),
).annotate({ identifier: "TrackMapping" }) as any as S.Schema<TrackMapping>;
export type __listOfTrackMapping = TrackMapping[];
export const __listOfTrackMapping = /*@__PURE__*/ S.Array(TrackMapping);
export interface ProbeResult {
  Container?: Container;
  Metadata?: Metadata;
  TrackMappings?: TrackMapping[];
}
export const ProbeResult = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Container: S.optional(Container),
    Metadata: S.optional(Metadata),
    TrackMappings: S.optional(__listOfTrackMapping),
  }).pipe(
    S.encodeKeys({
      Container: "container",
      Metadata: "metadata",
      TrackMappings: "trackMappings",
    }),
  ),
).annotate({ identifier: "ProbeResult" }) as any as S.Schema<ProbeResult>;
export type __listOfProbeResult = ProbeResult[];
export const __listOfProbeResult = /*@__PURE__*/ S.Array(ProbeResult);
export interface ProbeResponse {
  ProbeResults?: ProbeResult[];
}
export const ProbeResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ProbeResults: S.optional(__listOfProbeResult) }).pipe(
    S.encodeKeys({ ProbeResults: "probeResults" }),
  ),
).annotate({ identifier: "ProbeResponse" }) as any as S.Schema<ProbeResponse>;
export interface PutPolicyRequest {
  Policy?: Policy;
}
export const PutPolicyRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(Policy) })
    .pipe(S.encodeKeys({ Policy: "policy" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/2017-08-29/policy" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "PutPolicyRequest",
}) as any as S.Schema<PutPolicyRequest>;
export interface PutPolicyResponse {
  Policy?: Policy;
}
export const PutPolicyResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Policy: S.optional(Policy) }).pipe(
    S.encodeKeys({ Policy: "policy" }),
  ),
).annotate({
  identifier: "PutPolicyResponse",
}) as any as S.Schema<PutPolicyResponse>;
export interface SearchJobsRequest {
  InputFile?: string;
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
  Queue?: string;
  Status?: JobStatus;
}
export const SearchJobsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    InputFile: S.optional(S.String).pipe(T.HttpQuery("inputFile")),
    MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    Order: S.optional(Order).pipe(T.HttpQuery("order")),
    Queue: S.optional(S.String).pipe(T.HttpQuery("queue")),
    Status: S.optional(JobStatus).pipe(T.HttpQuery("status")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/2017-08-29/search" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "SearchJobsRequest",
}) as any as S.Schema<SearchJobsRequest>;
export interface SearchJobsResponse {
  Jobs?: (Job & {
    Role: string;
    Settings: JobSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
    Warnings: (WarningGroup & { Code: number; Count: number })[];
  })[];
  NextToken?: string;
}
export const SearchJobsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Jobs: S.optional(__listOfJob),
    NextToken: S.optional(S.String),
  }).pipe(S.encodeKeys({ Jobs: "jobs", NextToken: "nextToken" })),
).annotate({
  identifier: "SearchJobsResponse",
}) as any as S.Schema<SearchJobsResponse>;
export type JobsQueryFilterKey =
  | "queue"
  | "status"
  | "fileInput"
  | "jobEngineVersionRequested"
  | "jobEngineVersionUsed"
  | "audioCodec"
  | "videoCodec"
  | (string & {});
export const JobsQueryFilterKey = S.String;

export type __stringMax100 = string;
export type __listOf__stringMax100 = string[];
export const __listOf__stringMax100 = /*@__PURE__*/ S.Array(S.String);
export interface JobsQueryFilter {
  Key?: JobsQueryFilterKey;
  Values?: string[];
}
export const JobsQueryFilter = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Key: S.optional(JobsQueryFilterKey),
    Values: S.optional(__listOf__stringMax100),
  }).pipe(S.encodeKeys({ Key: "key", Values: "values" })),
).annotate({
  identifier: "JobsQueryFilter",
}) as any as S.Schema<JobsQueryFilter>;
export type __listOfJobsQueryFilter = JobsQueryFilter[];
export const __listOfJobsQueryFilter = /*@__PURE__*/ S.Array(JobsQueryFilter);
export interface StartJobsQueryRequest {
  FilterList?: JobsQueryFilter[];
  MaxResults?: number;
  NextToken?: string;
  Order?: Order;
}
export const StartJobsQueryRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    FilterList: S.optional(__listOfJobsQueryFilter),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Order: S.optional(Order),
  })
    .pipe(
      S.encodeKeys({
        FilterList: "filterList",
        MaxResults: "maxResults",
        NextToken: "nextToken",
        Order: "order",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/2017-08-29/jobsQueries" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "StartJobsQueryRequest",
}) as any as S.Schema<StartJobsQueryRequest>;
export interface StartJobsQueryResponse {
  Id?: string;
}
export const StartJobsQueryResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Id: S.optional(S.String) }).pipe(S.encodeKeys({ Id: "id" })),
).annotate({
  identifier: "StartJobsQueryResponse",
}) as any as S.Schema<StartJobsQueryResponse>;
export interface TagResourceRequest {
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
}
export const TagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Arn: S.optional(S.String), Tags: S.optional(__mapOf__string) })
    .pipe(S.encodeKeys({ Arn: "arn", Tags: "tags" }))
    .pipe(
      T.all(
        T.Http({ method: "POST", uri: "/2017-08-29/tags" }),
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
  Arn: string;
  TagKeys?: string[];
}
export const UntagResourceRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Arn: S.String.pipe(T.HttpLabel("Arn")),
    TagKeys: S.optional(__listOf__string),
  })
    .pipe(S.encodeKeys({ TagKeys: "tagKeys" }))
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/2017-08-29/tags/{Arn}" }),
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
export interface UpdateJobTemplateRequest {
  AccelerationSettings?: AccelerationSettings;
  Category?: string;
  Description?: string;
  HopDestinations?: HopDestination[];
  Name: string;
  Priority?: number;
  Queue?: string;
  Settings?: JobTemplateSettings;
  StatusUpdateInterval?: StatusUpdateInterval;
}
export const UpdateJobTemplateRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    AccelerationSettings: S.optional(AccelerationSettings),
    Category: S.optional(S.String),
    Description: S.optional(S.String),
    HopDestinations: S.optional(__listOfHopDestination),
    Name: S.String.pipe(T.HttpLabel("Name")),
    Priority: S.optional(S.Number),
    Queue: S.optional(S.String),
    Settings: S.optional(JobTemplateSettings),
    StatusUpdateInterval: S.optional(StatusUpdateInterval),
  })
    .pipe(
      S.encodeKeys({
        AccelerationSettings: "accelerationSettings",
        Category: "category",
        Description: "description",
        HopDestinations: "hopDestinations",
        Priority: "priority",
        Queue: "queue",
        Settings: "settings",
        StatusUpdateInterval: "statusUpdateInterval",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/2017-08-29/jobTemplates/{Name}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateJobTemplateRequest",
}) as any as S.Schema<UpdateJobTemplateRequest>;
export interface UpdateJobTemplateResponse {
  JobTemplate?: JobTemplate & {
    Name: string;
    Settings: JobTemplateSettings;
    AccelerationSettings: AccelerationSettings & { Mode: AccelerationMode };
  };
}
export const UpdateJobTemplateResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ JobTemplate: S.optional(JobTemplate) }).pipe(
    S.encodeKeys({ JobTemplate: "jobTemplate" }),
  ),
).annotate({
  identifier: "UpdateJobTemplateResponse",
}) as any as S.Schema<UpdateJobTemplateResponse>;
export interface UpdatePresetRequest {
  Category?: string;
  Description?: string;
  Name: string;
  Settings?: PresetSettings;
}
export const UpdatePresetRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    Category: S.optional(S.String),
    Description: S.optional(S.String),
    Name: S.String.pipe(T.HttpLabel("Name")),
    Settings: S.optional(PresetSettings),
  })
    .pipe(
      S.encodeKeys({
        Category: "category",
        Description: "description",
        Settings: "settings",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/2017-08-29/presets/{Name}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdatePresetRequest",
}) as any as S.Schema<UpdatePresetRequest>;
export interface UpdatePresetResponse {
  Preset?: Preset & { Name: string; Settings: PresetSettings };
}
export const UpdatePresetResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Preset: S.optional(Preset) }).pipe(
    S.encodeKeys({ Preset: "preset" }),
  ),
).annotate({
  identifier: "UpdatePresetResponse",
}) as any as S.Schema<UpdatePresetResponse>;
export interface UpdateQueueRequest {
  ConcurrentJobs?: number;
  Description?: string;
  MaximumConcurrentFeeds?: number;
  Name: string;
  ReservationPlanSettings?: ReservationPlanSettings;
  Status?: QueueStatus;
}
export const UpdateQueueRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ConcurrentJobs: S.optional(S.Number),
    Description: S.optional(S.String),
    MaximumConcurrentFeeds: S.optional(S.Number),
    Name: S.String.pipe(T.HttpLabel("Name")),
    ReservationPlanSettings: S.optional(ReservationPlanSettings),
    Status: S.optional(QueueStatus),
  })
    .pipe(
      S.encodeKeys({
        ConcurrentJobs: "concurrentJobs",
        Description: "description",
        MaximumConcurrentFeeds: "maximumConcurrentFeeds",
        ReservationPlanSettings: "reservationPlanSettings",
        Status: "status",
      }),
    )
    .pipe(
      T.all(
        T.Http({ method: "PUT", uri: "/2017-08-29/queues/{Name}" }),
        svc,
        auth,
        proto,
        ver,
        rules,
      ),
    ),
).annotate({
  identifier: "UpdateQueueRequest",
}) as any as S.Schema<UpdateQueueRequest>;
export interface UpdateQueueResponse {
  Queue?: Queue & { Name: string };
}
export const UpdateQueueResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ Queue: S.optional(Queue) }).pipe(S.encodeKeys({ Queue: "queue" })),
).annotate({
  identifier: "UpdateQueueResponse",
}) as any as S.Schema<UpdateQueueResponse>;
export type AssociateCertificateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Associates an AWS Certificate Manager (ACM) Amazon Resource Name (ARN) with AWS Elemental MediaConvert.
 */
export const associateCertificate: API.OperationMethod<
  AssociateCertificateRequest,
  AssociateCertificateResponse,
  AssociateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: AssociateCertificateRequest,
  output: AssociateCertificateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateCertificate",
}));

export type CancelJobError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Permanently cancel a job. Once you have canceled a job, you can't start it again.
 */
export const cancelJob: API.OperationMethod<
  CancelJobRequest,
  CancelJobResponse,
  CancelJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CancelJobRequest,
  output: CancelJobResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelJob",
}));

export type CreateJobError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new transcoding job. For information about jobs and job settings, see the User Guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResponse,
  CreateJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJobRequest,
  output: CreateJobResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
}));

export type CreateJobTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new job template. For information about job templates see the User Guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
 */
export const createJobTemplate: API.OperationMethod<
  CreateJobTemplateRequest,
  CreateJobTemplateResponse,
  CreateJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateJobTemplateRequest,
  output: CreateJobTemplateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJobTemplate",
}));

export type CreatePresetError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new preset. For information about job templates see the User Guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
 */
export const createPreset: API.OperationMethod<
  CreatePresetRequest,
  CreatePresetResponse,
  CreatePresetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreatePresetRequest,
  output: CreatePresetResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePreset",
}));

export type CreateQueueError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new transcoding queue. For information about queues, see Working With Queues in the User Guide at https://docs.aws.amazon.com/mediaconvert/latest/ug/working-with-queues.html
 */
export const createQueue: API.OperationMethod<
  CreateQueueRequest,
  CreateQueueResponse,
  CreateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateQueueRequest,
  output: CreateQueueResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueue",
}));

export type CreateResourceShareError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create a new resource share request for MediaConvert resources with AWS Support.
 */
export const createResourceShare: API.OperationMethod<
  CreateResourceShareRequest,
  CreateResourceShareResponse,
  CreateResourceShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: CreateResourceShareRequest,
  output: CreateResourceShareResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResourceShare",
}));

export type DeleteJobTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Permanently delete a job template you have created.
 */
export const deleteJobTemplate: API.OperationMethod<
  DeleteJobTemplateRequest,
  DeleteJobTemplateResponse,
  DeleteJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteJobTemplateRequest,
  output: DeleteJobTemplateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobTemplate",
}));

export type DeletePolicyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Permanently delete a policy that you created.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePolicyRequest,
  output: DeletePolicyResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
}));

export type DeletePresetError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Permanently delete a preset you have created.
 */
export const deletePreset: API.OperationMethod<
  DeletePresetRequest,
  DeletePresetResponse,
  DeletePresetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeletePresetRequest,
  output: DeletePresetResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePreset",
}));

export type DeleteQueueError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Permanently delete a queue you have created.
 */
export const deleteQueue: API.OperationMethod<
  DeleteQueueRequest,
  DeleteQueueResponse,
  DeleteQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DeleteQueueRequest,
  output: DeleteQueueResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueue",
}));

export type DescribeEndpointsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Send a request with an empty body to the regional API endpoint to get your account API endpoint. Note that DescribeEndpoints is no longer required. We recommend that you send your requests directly to the regional endpoint instead.
 */
export const describeEndpoints: API.PaginatedOperationMethod<
  DescribeEndpointsRequest,
  DescribeEndpointsResponse,
  DescribeEndpointsError,
  Credentials | HttpClient.HttpClient,
  Endpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: DescribeEndpointsRequest,
  output: DescribeEndpointsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Endpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type DisassociateCertificateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes an association between the Amazon Resource Name (ARN) of an AWS Certificate Manager (ACM) certificate and an AWS Elemental MediaConvert resource.
 */
export const disassociateCertificate: API.OperationMethod<
  DisassociateCertificateRequest,
  DisassociateCertificateResponse,
  DisassociateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: DisassociateCertificateRequest,
  output: DisassociateCertificateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateCertificate",
}));

export type GetJobError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the JSON for a specific transcoding job.
 */
export const getJob: API.OperationMethod<
  GetJobRequest,
  GetJobResponse,
  GetJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobRequest,
  output: GetJobResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJob",
}));

export type GetJobsQueryResultsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array of up to twenty of your most recent jobs matched by a jobs query.
 */
export const getJobsQueryResults: API.OperationMethod<
  GetJobsQueryResultsRequest,
  GetJobsQueryResultsResponse,
  GetJobsQueryResultsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobsQueryResultsRequest,
  output: GetJobsQueryResultsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobsQueryResults",
}));

export type GetJobTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the JSON for a specific job template.
 */
export const getJobTemplate: API.OperationMethod<
  GetJobTemplateRequest,
  GetJobTemplateResponse,
  GetJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetJobTemplateRequest,
  output: GetJobTemplateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobTemplate",
}));

export type GetPolicyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the JSON for your policy.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPolicyRequest,
  output: GetPolicyResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetPresetError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the JSON for a specific preset.
 */
export const getPreset: API.OperationMethod<
  GetPresetRequest,
  GetPresetResponse,
  GetPresetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetPresetRequest,
  output: GetPresetResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPreset",
}));

export type GetQueueError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the JSON for a specific queue.
 */
export const getQueue: API.OperationMethod<
  GetQueueRequest,
  GetQueueResponse,
  GetQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: GetQueueRequest,
  output: GetQueueResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQueue",
}));

export type ListJobsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array of up to twenty of your most recently created jobs. This array includes in-process, completed, and errored jobs. This will return the jobs themselves, not just a list of the jobs. To retrieve the twenty next most recent jobs, use the nextToken string returned with the array.
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResponse,
  ListJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobsRequest,
  output: ListJobsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Jobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobTemplatesError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array of up to twenty of your job templates. This will return the templates themselves, not just a list of them. To retrieve the next twenty templates, use the nextToken string returned with the array
 */
export const listJobTemplates: API.PaginatedOperationMethod<
  ListJobTemplatesRequest,
  ListJobTemplatesResponse,
  ListJobTemplatesError,
  Credentials | HttpClient.HttpClient,
  JobTemplate
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListJobTemplatesRequest,
  output: ListJobTemplatesResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "JobTemplates",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPresetsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array of up to twenty of your presets. This will return the presets themselves, not just a list of them. To retrieve the next twenty presets, use the nextToken string returned with the array.
 */
export const listPresets: API.PaginatedOperationMethod<
  ListPresetsRequest,
  ListPresetsResponse,
  ListPresetsError,
  Credentials | HttpClient.HttpClient,
  Preset
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListPresetsRequest,
  output: ListPresetsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPresets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Presets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListQueuesError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array of up to twenty of your queues. This will return the queues themselves, not just a list of them. To retrieve the next twenty queues, use the nextToken string returned with the array.
 */
export const listQueues: API.PaginatedOperationMethod<
  ListQueuesRequest,
  ListQueuesResponse,
  ListQueuesError,
  Credentials | HttpClient.HttpClient,
  Queue
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListQueuesRequest,
  output: ListQueuesResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQueues",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Queues",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve the tags for a MediaConvert resource.
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
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListVersionsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array of all available Job engine versions and the date they expire.
 */
export const listVersions: API.PaginatedOperationMethod<
  ListVersionsRequest,
  ListVersionsResponse,
  ListVersionsError,
  Credentials | HttpClient.HttpClient,
  JobEngineVersion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: ListVersionsRequest,
  output: ListVersionsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVersions",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Versions",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ProbeError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Use Probe to obtain detailed information about your input media files. Probe returns a JSON that includes container, codec, frame rate, resolution, track count, audio layout, captions, and more. You can use this information to learn more about your media files, or to help make decisions while automating your transcoding workflow.
 */
export const probe: API.OperationMethod<
  ProbeRequest,
  ProbeResponse,
  ProbeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: ProbeRequest,
  output: ProbeResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Probe",
}));

export type PutPolicyError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Create or change your policy. For more information about policies, see the user guide at http://docs.aws.amazon.com/mediaconvert/latest/ug/what-is.html
 */
export const putPolicy: API.OperationMethod<
  PutPolicyRequest,
  PutPolicyResponse,
  PutPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: PutPolicyRequest,
  output: PutPolicyResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPolicy",
}));

export type SearchJobsError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieve a JSON array that includes job details for up to twenty of your most recent jobs. Optionally filter results further according to input file, queue, or status. To retrieve the twenty next most recent jobs, use the nextToken string returned with the array.
 */
export const searchJobs: API.PaginatedOperationMethod<
  SearchJobsRequest,
  SearchJobsResponse,
  SearchJobsError,
  Credentials | HttpClient.HttpClient,
  Job
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: SearchJobsRequest,
  output: SearchJobsResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchJobs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Jobs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartJobsQueryError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Start an asynchronous jobs query using the provided filters. To receive the list of jobs that match your query, call the GetJobsQueryResults API using the query ID returned by this API.
 */
export const startJobsQuery: API.OperationMethod<
  StartJobsQueryRequest,
  StartJobsQueryResponse,
  StartJobsQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: StartJobsQueryRequest,
  output: StartJobsQueryResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartJobsQuery",
}));

export type TagResourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Add tags to a MediaConvert queue, preset, job, or job template. For information about tagging, see the User Guide at https://docs.aws.amazon.com/mediaconvert/latest/ug/tagging-mediaconvert-resources.html.
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
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Remove tags from a MediaConvert queue, preset, job, or job template. For information about tagging, see the User Guide at https://docs.aws.amazon.com/mediaconvert/latest/ug/tagging-mediaconvert-resources.html.
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
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateJobTemplateError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modify one of your existing job templates.
 */
export const updateJobTemplate: API.OperationMethod<
  UpdateJobTemplateRequest,
  UpdateJobTemplateResponse,
  UpdateJobTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateJobTemplateRequest,
  output: UpdateJobTemplateResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobTemplate",
}));

export type UpdatePresetError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modify one of your existing presets.
 */
export const updatePreset: API.OperationMethod<
  UpdatePresetRequest,
  UpdatePresetResponse,
  UpdatePresetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdatePresetRequest,
  output: UpdatePresetResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePreset",
}));

export type UpdateQueueError =
  | BadRequestException
  | ConflictException
  | ForbiddenException
  | InternalServerErrorException
  | NotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Modify one of your existing queues.
 */
export const updateQueue: API.OperationMethod<
  UpdateQueueRequest,
  UpdateQueueResponse,
  UpdateQueueError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: UpdateQueueRequest,
  output: UpdateQueueResponse,
  errors: [
    BadRequestException,
    ConflictException,
    ForbiddenException,
    InternalServerErrorException,
    NotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueue",
}));
